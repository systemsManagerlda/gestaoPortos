/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// Tipos para as configurações
export interface ConfiguracoesUsuario {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  pais: string;
  cidade: string;
  endereco: string;
  idioma: string;
  fusoHorario: string;
  notificacoes: {
    email: boolean;
    sms: boolean;
    push: boolean;
    alertasCarga: boolean;
    atualizacoesStatus: boolean;
    notificacoesFinanceiras: boolean;
  };
  preferencias: {
    tema: string;
    itensPorPagina: number;
    relatoriosAutomaticos: boolean;
  };
}


export interface IntegracaoAPI {
  id: string;
  nome: string;
  descricao: string;
  ativa: boolean;
  chave: string;
  dataCriacao: string;
  ultimoUso?: string;
}

export interface FormSenha {
  senhaAtual: string;
  novaSenha: string;
  confirmarSenha: string;
}

// Cache para reduzir chamadas à API
let cacheConfiguracoes: {
  data: { configuracoes: ConfiguracoesUsuario; integracaoAPI: IntegracaoAPI[] } | null;
  timestamp: number;
} = { data: null, timestamp: 0 };

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

// Função auxiliar para fazer requisições
const fetchAPI = async (endpoint: string, body: any, method: string = 'POST') => {
  try {
    // Obter token do localStorage
    const token = localStorage.getItem('authToken') || '';
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify(body)
    });

    // Verificar se o token expirou
    if (response.status === 401) {
      throw new Error('Sessão expirada. Faça login novamente.');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.returnCode !== 200) {
      throw new Error(data.returnMsg || 'Erro na requisição');
    }

    return data;
  } catch (error: any) {
    // Propagação de erros específicos
    if (error.message.includes('Sessão expirada')) {
      throw error;
    }
    throw new Error(error.message || 'Erro de conexão com o servidor');
  }
};

// Função principal para obter configurações do usuário
export const getConfiguracoesUsuario = async (codigoUsuario: string, forceRefresh = false): Promise<{
  configuracoes: ConfiguracoesUsuario;
  integracaoAPI: IntegracaoAPI[];
}> => {
  try {
    // Verificar cache
    const now = Date.now();
    if (!forceRefresh && cacheConfiguracoes.data && (now - cacheConfiguracoes.timestamp) < CACHE_DURATION) {
      return cacheConfiguracoes.data;
    }

    // Buscar dados do usuário usando a rota existente
    const data = await fetchAPI('/getClienteDetail', { codigo: codigoUsuario });
    const usuario = data.data;
    
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    // Encontrar contato principal
    const contatoPrincipal = usuario.contatos?.find((c: any) => c.principal) || usuario.contatos?.[0] || {};

    // Mapear dados para configurações
    const configuracoes: ConfiguracoesUsuario = {
      nome: usuario.nome || contatoPrincipal.nome || '',
      email: contatoPrincipal?.email || usuario.email || '',
      telefone: contatoPrincipal?.telefone || '',
      empresa: usuario.nomeEmpresa || 'Mega Centro e Logistica',
      pais: usuario.enderecoCobranca?.pais || 'Moçambique',
      cidade: usuario.enderecoCobranca?.cidade || '',
      endereco: usuario.enderecoCobranca?.rua || '',
      idioma: usuario.idioma || 'pt',
      fusoHorario: usuario.fusoHorario || 'Africa/Maputo',
      notificacoes: {
        email: usuario.notificacoes?.email ?? true,
        sms: usuario.notificacoes?.sms ?? true,
        push: usuario.notificacoes?.whatsapp ?? true,
        alertasCarga: usuario.notificacoes?.alertasStatus ?? true,
        atualizacoesStatus: usuario.notificacoes?.alertasStatus ?? true,
        notificacoesFinanceiras: false
      },
      preferencias: {
        tema: (usuario.preferencias?.find((p: any) => p.tipo === 'tema')?.descricao) || 'claro',
        itensPorPagina: parseInt(usuario.preferencias?.find((p: any) => p.tipo === 'itensPorPagina')?.descricao) || 10,
        relatoriosAutomaticos: usuario.notificacoes?.relatoriosMensais || false
      }
    };

    // Buscar integrações API (simuladas)
    const integracaoAPI: IntegracaoAPI[] = await getIntegracoesAPI(codigoUsuario);

    const result = { configuracoes, integracaoAPI };
    
    // Atualizar cache
    cacheConfiguracoes = {
      data: result,
      timestamp: now
    };

    return result;

  } catch (error: any) {
    console.error('Erro ao carregar configurações:', error);
    
    // Retornar configurações padrão em caso de erro
    const defaultConfig: ConfiguracoesUsuario = {
      nome: '',
      email: '',
      telefone: '',
      empresa: 'Mega Centro e Logistica',
      pais: 'Moçambique',
      cidade: '',
      endereco: '',
      idioma: 'pt',
      fusoHorario: 'Africa/Maputo',
      notificacoes: {
        email: true,
        sms: true,
        push: true,
        alertasCarga: true,
        atualizacoesStatus: true,
        notificacoesFinanceiras: false
      },
      preferencias: {
        tema: 'claro',
        itensPorPagina: 10,
        relatoriosAutomaticos: false
      }
    };

    const defaultIntegracoes: IntegracaoAPI[] = [
      {
        id: '1',
        nome: 'API de Fretes',
        descricao: 'Integração para consulta de fretes e cotações',
        ativa: true,
        chave: `mgl-${codigoUsuario}-${Date.now().toString(36)}`,
        dataCriacao: new Date().toISOString()
      }
    ];

    return {
      configuracoes: defaultConfig,
      integracaoAPI: defaultIntegracoes
    };
  }
};


// Função para obter integrações API (simulada)
const getIntegracoesAPI = async (codigoUsuario: string): Promise<IntegracaoAPI[]> => {
  try {
    // Em produção, você teria uma rota específica
    return [
      {
        id: '1',
        nome: 'API de Fretes',
        descricao: 'Integração para consulta de fretes e cotações',
        ativa: true,
        chave: `mgl-${codigoUsuario}-${Date.now().toString(36).slice(-8)}`,
        dataCriacao: new Date().toISOString(),
        ultimoUso: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        nome: 'API de Rastreamento',
        descricao: 'Integração para rastreamento de cargas em tempo real',
        ativa: false,
        chave: `track-${codigoUsuario}-${Date.now().toString(36).slice(-8)}`,
        dataCriacao: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  } catch (error) {
    console.error('Erro ao carregar integrações API:', error);
    return [];
  }
};


// Função para salvar configurações
export const salvarConfiguracoesUsuario = async (
  codigoUsuario: string, 
  configuracoes: ConfiguracoesUsuario
): Promise<{ success: boolean; message: string; data?: any }> => {
  try {
    // Buscar usuário atual
    const usuarioResponse = await fetchAPI('/getClienteDetail', { codigo: codigoUsuario });
    const usuario = usuarioResponse.data;

    // Preparar dados para atualização
    const updateData: any = {
      codigo: codigoUsuario,
      nome: configuracoes.nome || usuario.nome,
      nomeEmpresa: configuracoes.empresa || usuario.nomeEmpresa,
      idioma: configuracoes.idioma || usuario.idioma,
      fusoHorario: configuracoes.fusoHorario || usuario.fusoHorario,
      enderecoCobranca: {
        ...usuario.enderecoCobranca,
        pais: configuracoes.pais || usuario.enderecoCobranca?.pais,
        cidade: configuracoes.cidade || usuario.enderecoCobranca?.cidade,
        rua: configuracoes.endereco || usuario.enderecoCobranca?.rua
      },
      notificacoes: {
        ...usuario.notificacoes,
        email: configuracoes.notificacoes.email,
        sms: configuracoes.notificacoes.sms,
        whatsapp: configuracoes.notificacoes.push,
        alertasStatus: configuracoes.notificacoes.alertasCarga,
        relatoriosMensais: configuracoes.preferencias.relatoriosAutomaticos
      }
    };

    // Preparar preferências
    const preferenciasAtualizadas = [...(usuario.preferencias || [])];
    
    // Atualizar tema
    const temaIndex = preferenciasAtualizadas.findIndex((p: any) => p.tipo === 'tema');
    if (temaIndex !== -1) {
      preferenciasAtualizadas[temaIndex].descricao = configuracoes.preferencias.tema;
    } else {
      preferenciasAtualizadas.push({ tipo: 'tema', descricao: configuracoes.preferencias.tema });
    }
    
    // Atualizar itens por página
    const itensIndex = preferenciasAtualizadas.findIndex((p: any) => p.tipo === 'itensPorPagina');
    if (itensIndex !== -1) {
      preferenciasAtualizadas[itensIndex].descricao = configuracoes.preferencias.itensPorPagina.toString();
    } else {
      preferenciasAtualizadas.push({ tipo: 'itensPorPagina', descricao: configuracoes.preferencias.itensPorPagina.toString() });
    }
    
    updateData.preferencias = preferenciasAtualizadas;

    // Atualizar contatos
    if (usuario.contatos && usuario.contatos.length > 0) {
      const contatosAtualizados = [...usuario.contatos];
      const contatoPrincipalIndex = contatosAtualizados.findIndex((c: any) => c.principal);
      
      if (contatoPrincipalIndex !== -1) {
        contatosAtualizados[contatoPrincipalIndex] = {
          ...contatosAtualizados[contatoPrincipalIndex],
          nome: configuracoes.nome || contatosAtualizados[contatoPrincipalIndex].nome,
          email: configuracoes.email || contatosAtualizados[contatoPrincipalIndex].email,
          telefone: configuracoes.telefone || contatosAtualizados[contatoPrincipalIndex].telefone
        };
      }
      updateData.contatos = contatosAtualizados;
    }

    // Chamar API de atualização
    const response = await fetchAPI('/updateCliente', updateData);

    // Invalidar cache
    cacheConfiguracoes = { data: null, timestamp: 0 };

    return {
      success: true,
      message: 'Configurações salvas com sucesso!',
      data: response.data
    };

  } catch (error: any) {
    console.error('Erro ao salvar configurações:', error);
    
    return {
      success: false,
      message: error.message || 'Erro ao salvar configurações'
    };
  }
};

// Função para alterar senha
export const alterarSenhaUsuario = async (
  codigoUsuario: string, 
  formSenha: FormSenha
): Promise<{ success: boolean; message: string; error?: any }> => {
  try {
    // Para alterar senha, usamos a rota /updateCliente existente
    // A senha será hasheada pelo middleware do mongoose
    
    const updateData = {
      codigo: codigoUsuario,
      senha: formSenha.novaSenha
    };

    await fetchAPI('/updateCliente', updateData);

    return {
      success: true,
      message: 'Senha alterada com sucesso!'
    };

  } catch (error: any) {
    console.error('Erro ao alterar senha:', error);
    
    return {
      success: false,
      message: error.message || 'Erro ao alterar senha',
      error: error
    };
  }
};

// Função para gerenciar integrações API
export const gerenciarIntegracaoAPI = async (
  codigoUsuario: string,
  integracaoId: string,
  acao: 'toggle' | 'gerarChave' | 'desativar'
): Promise<{ success: boolean; message: string; data?: any }> => {
  try {
    // Simular operações com API
    switch (acao) {
      case 'toggle':
        // Implementação simulada - em produção, chamaria API real
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
          success: true,
          message: 'Status da integração alterado com sucesso!'
        };

      case 'gerarChave':
        // Gerar nova chave
        const novaChave = `mgl-${codigoUsuario}-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`;
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return {
          success: true,
          message: 'Nova chave gerada com sucesso!',
          data: { novaChave }
        };

      case 'desativar':
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
          success: true,
          message: 'Integração desativada com sucesso!'
        };

      default:
        throw new Error('Ação não reconhecida');
    }

  } catch (error: any) {
    console.error('Erro ao gerenciar integração API:', error);
    
    return {
      success: false,
      message: error.message || 'Erro ao gerenciar integração'
    };
  }
};

// Função para exportar dados do usuário
export const exportarDadosUsuario = async (codigoUsuario: string): Promise<{ success: boolean; message: string }> => {
  try {
    const data = await fetchAPI('/getClienteDetail', { codigo: codigoUsuario });
    const usuario = data.data;

    // Remover senha e outros dados sensíveis
    const { senha, ...usuarioSeguro } = usuario;

    // Criar objeto de exportação
    const exportData = {
      usuario: usuarioSeguro,
      dataExportacao: new Date().toISOString(),
      versao: '1.0',
      tipo: 'exportacao_usuario'
    };

    // Converter para JSON formatado
    const jsonString = JSON.stringify(exportData, null, 2);
    
    // Criar blob para download
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    
    // Criar link para download
    const a = document.createElement('a');
    a.href = url;
    a.download = `dados-usuario-${codigoUsuario}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Limpar
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    return {
      success: true,
      message: 'Dados exportados com sucesso!'
    };

  } catch (error: any) {
    console.error('Erro ao exportar dados:', error);
    
    return {
      success: false,
      message: error.message || 'Erro ao exportar dados'
    };
  }
};

// Função para excluir conta (requer confirmação adicional)
export const excluirContaUsuario = async (
  codigoUsuario: string,
  confirmacaoTexto: string
): Promise<{ success: boolean; message: string }> => {
  try {
    // Validar confirmação
    if (confirmacaoTexto !== 'CONFIRMAR EXCLUSÃO') {
      throw new Error('Texto de confirmação incorreto');
    }

    // Chamar API de exclusão
    const response = await fetchAPI('/deleteCliente', { codigo: codigoUsuario });

    // Limpar cache e dados locais
    cacheConfiguracoes = { data: null, timestamp: 0 };
    localStorage.removeItem('token');
    localStorage.removeItem('codigoUsuario');
    localStorage.removeItem('usuario');

    return {
      success: true,
      message: 'Conta excluída com sucesso!'
    };

  } catch (error: any) {
    console.error('Erro ao excluir conta:', error);
    
    return {
      success: false,
      message: error.message || 'Erro ao excluir conta'
    };
  }
};

// Função para formatar data
export const formatarData = (dataString?: string): string => {
  if (!dataString) return 'Nunca usado';
  
  try {
    const data = new Date(dataString);
    
    // Verificar se a data é válida
    if (isNaN(data.getTime())) {
      return 'Data inválida';
    }

    // Formatar para dd/mm/aaaa
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');

    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Erro ao formatar';
  }
};

// Função para copiar texto para área de transferência
export const copiarParaAreaTransferencia = async (texto: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch (error) {
    console.error('Erro ao copiar para área de transferência:', error);
    
    // Fallback para navegadores mais antigos
    const textArea = document.createElement('textarea');
    textArea.value = texto;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      return true;
    } catch (fallbackError) {
      console.error('Fallback também falhou:', fallbackError);
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
};

// Função para validar email
export const validarEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Função para validar telefone (formato simplificado)
export const validarTelefone = (telefone: string): boolean => {
  // Remove todos os caracteres não numéricos
  const numeros = telefone.replace(/\D/g, '');
  // Verifica se tem entre 8 e 15 dígitos
  return numeros.length >= 8 && numeros.length <= 15;
};