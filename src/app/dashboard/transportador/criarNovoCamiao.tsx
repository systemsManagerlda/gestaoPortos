/* eslint-disable @typescript-eslint/no-explicit-any */
const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

// Novos tipos para GPS
export type TipoGPS = "normal" | "vip";
export type StatusGPS = "ativo" | "inativo" | "pendente" | "expirado";

interface CreateCamiaoData {
  // Identificação básica
  matricula: string;
  marca: string;
  modelo: string;
  anoFabricacao: number;
  cor?: string;
  
  // Associações
  transportadoraId: number;
  motoristaId: number;
  codigoGPS: string;
  
  // Novo: Tipo de GPS
  tipoGPS?: {
    tipo: TipoGPS;
    dataExpiracao?: string;
  };

  // Novo: Especificações GPS VIP
  gpsVip?: {
    camera: {
      possui: boolean;
      modelo?: string;
      resolucao?: string;
      dataInstalacao?: string;
      status?: "operacional" | "manutencao" | "defeito";
    };
    controleMotorista: {
      possui: boolean;
      tipoControle?: "biometrico" | "rfid" | "app" | "codigo";
      dataInstalacao?: string;
      ultimaAtualizacao?: string;
    };
    recursosAdicionais: {
      monitoramentoTempoReal: boolean;
      alertasVelocidade: boolean;
      relatoriosDesempenho: boolean;
      geofencing: boolean;
      comunicacaoAudio: boolean;
    };
  };
  
  // Especificações técnicas
  especificacoes: {
    tipo: TipoCamiao;
    pesoBruto: number;
    tara: number;
    cargaUtil: number;
    comprimento?: number;
    largura?: number;
    altura?: number;
    volumeUtil?: number;
    numEixos: number;
  };
  
  // Documentação
  documentacao: {
    registroComercial?: string;
    seguro: {
      numeroApolice: string;
      seguradora: string;
      dataEmissao: string;
      dataValidade: string;
      cobertura?: string;
    };
    licencaOperacao?: {
      numero: string;
      dataEmissao: string;
      dataValidade: string;
      categoria: string;
    };
    certificadoGPS?: {
      numero: string;
      dataEmissao: string;
      dataValidade: string;
      tipo: TipoGPS;
    };
  };
  
  // Inspeção
  nivelInspecao: {
    categoria: CategoriaInspecao;
    dataUltimaInspecao: string;
    resultadoUltimaInspecao: ResultadoInspecao;
    centroInspecao?: string;
    observacoes?: string;
  };
  
  // Manutenção e estado
  estado: {
    tipo: "novo" | "seminovo" | "usado" | "recondicionado";
    observacoes?: string;
    dataAvaliacao?: string;
  };
  
  // Status operacional
  status?: "disponivel" | "em_viagem" | "manutencao" | "inativo" | "reservado";
  disponibilidade?: {
    tipoServico: string[];
    regioes: string[];
    observacoes?: string;
  };
  
  // Metadados
  criadoPor?: string;
  observacoes?: string;
  fotos?: string[];
  fotosGPS?: string[];
}

interface CreateCamiaoResponse {
  returnCode: number;
  returnMsg: string;
  data?: Camiao;
}

interface ErrorResponse {
  returnCode: number;
  returnMsg: string;
}

// Função para calcular o valor do registro baseado no tipo de GPS
const calcularValorRegistro = (tipoGPS?: TipoGPS): number => {
  return tipoGPS === 'vip' ? 13000 : 4000;
};

// Função para gerar descrição automática do tipo de GPS
const gerarDescricaoGPS = (tipoGPS?: TipoGPS): string => {
  const descricoes = {
    "normal": "Normal - GPS simples",
    "vip": "VIP - GPS com câmera e controle de motorista"
  };
  return descricoes[tipoGPS || 'normal'];
};

// Função para calcular a próxima data de inspeção baseada na categoria
const calcularProximaInspecao = (categoria: CategoriaInspecao, dataUltimaInspecao: string): string => {
  const ultimaInspecao = new Date(dataUltimaInspecao);
  let meses = 0;

  switch (categoria) {
    case 'A': // Chanté - 6 meses
      meses = 6;
      break;
    case 'B': // Nacional - 1 ano
      meses = 12;
      break;
    case 'C': // Transito - 2 anos
      meses = 24;
      break;
    default:
      meses = 12;
  }

  const proximaInspecao = new Date(ultimaInspecao);
  proximaInspecao.setMonth(proximaInspecao.getMonth() + meses);
  return proximaInspecao.toISOString().split('T')[0];
};

// Função para gerar descrição automática da categoria
const gerarDescricaoCategoria = (categoria: CategoriaInspecao): string => {
  const descricoes = {
    "A": "Chanté - Inspeção a cada 6 meses - Não em boas condições",
    "B": "Nacional - Inspeção a cada 1 ano - Condições médias",
    "C": "Transito - Inspeção a cada 2 anos - Camião novo"
  };
  return descricoes[categoria];
};

// Função para verificar viabilidade do GPS VIP
const verificarViabilidadeGPSVip = (
  categoria: CategoriaInspecao, 
  estado: "novo" | "seminovo" | "usado" | "recondicionado"
): { podeGPSVip: boolean; motivos: string[] } => {
  const motivos: string[] = [];
  let podeGPSVip = true;

  if (categoria !== 'C') {
    podeGPSVip = false;
    motivos.push('GPS VIP só está disponível para camiões categoria C');
  }

  if (estado === 'usado') {
    podeGPSVip = false;
    motivos.push('GPS VIP não está disponível para camiões usados');
  }

  if (podeGPSVip) {
    motivos.push('Elegível para GPS VIP - Categoria C e bom estado');
  }

  return { podeGPSVip, motivos };
};

// Função para validar os dados antes do envio
const validarDadosCamiao = (dados: CreateCamiaoData): { valido: boolean; erros: string[] } => {
  const erros: string[] = [];
  
  // Validações básicas
  if (!dados.matricula || dados.matricula.trim() === '') {
    erros.push('Matrícula é obrigatória');
  }

  if (!dados.marca || dados.marca.trim() === '') {
    erros.push('Marca é obrigatória');
  }

  if (!dados.modelo || dados.modelo.trim() === '') {
    erros.push('Modelo é obrigatório');
  }

  if (!dados.anoFabricacao || dados.anoFabricacao < 1950 || dados.anoFabricacao > new Date().getFullYear() + 1) {
    erros.push('Ano de fabricação inválido');
  }

  if (!dados.transportadoraId || dados.transportadoraId <= 0) {
    erros.push('ID da transportadora é obrigatório');
  }

  if (!dados.motoristaId || dados.motoristaId <= 0) {
    erros.push('ID do motorista é obrigatório');
  }

  if (!dados.codigoGPS || dados.codigoGPS.trim() === '') {
    erros.push('Código GPS é obrigatório');
  }

  // Validações das especificações
  if (!dados.especificacoes.pesoBruto || dados.especificacoes.pesoBruto <= 0) {
    erros.push('Peso bruto deve ser maior que zero');
  }

  if (!dados.especificacoes.tara || dados.especificacoes.tara <= 0) {
    erros.push('Tara deve ser maior que zero');
  }

  if (!dados.especificacoes.cargaUtil || dados.especificacoes.cargaUtil <= 0) {
    erros.push('Carga útil deve ser maior que zero');
  }

  if (!dados.especificacoes.numEixos || dados.especificacoes.numEixos <= 0) {
    erros.push('Número de eixos deve ser maior que zero');
  }

  // Validações do seguro
  if (!dados.documentacao.seguro.numeroApolice || dados.documentacao.seguro.numeroApolice.trim() === '') {
    erros.push('Número da apólice do seguro é obrigatório');
  }

  if (!dados.documentacao.seguro.seguradora || dados.documentacao.seguro.seguradora.trim() === '') {
    erros.push('Seguradora é obrigatória');
  }

  if (!dados.documentacao.seguro.dataEmissao) {
    erros.push('Data de emissão do seguro é obrigatória');
  }

  if (!dados.documentacao.seguro.dataValidade) {
    erros.push('Data de validade do seguro é obrigatória');
  }

  // Validações da inspeção
  if (!dados.nivelInspecao.dataUltimaInspecao) {
    erros.push('Data da última inspeção é obrigatória');
  }

  // Validações específicas para GPS VIP
  if (dados.tipoGPS?.tipo === 'vip') {
    const viabilidade = verificarViabilidadeGPSVip(
      dados.nivelInspecao.categoria,
      dados.estado.tipo
    );
    
    if (!viabilidade.podeGPSVip) {
      erros.push(...viabilidade.motivos.filter(motivo => !motivo.includes('Elegível')));
    }
  }

  return {
    valido: erros.length === 0,
    erros
  };
};

export const camiaoService = {
  async update(camiaoId: number, dadosAtualizados: Partial<Camiao>): Promise<Camiao> {
    const response = await fetch(`${API_BASE_URL}/updateCamiao`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        camiaoId,
        ...dadosAtualizados,
        dataAtualizacao: new Date().toISOString(),
      }),
    });

    const data = await response.json();

    if (data.returnCode === 200) {
      return data.data;
    } else {
      throw new Error(data.returnMsg || "Erro ao atualizar camião");
    }
  },

  async create(dadosNovoCamiao: CreateCamiaoData): Promise<Camiao> {
    const response = await fetch(`${API_BASE_URL}/createCamiao`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosNovoCamiao),
    });

    const data = await response.json();

    if (data.returnCode === 201) {
      return data.data;
    } else {
      throw new Error(data.returnMsg || "Erro ao criar camião");
    }
  },

  async list(filtros: any): Promise<{ list: Camiao[]; total: number }> {
    const response = await fetch(`${API_BASE_URL}/getCamiaoList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filtros),
    });

    const data = await response.json();

    if (data.returnCode === 200) {
      return data.data;
    } else {
      throw new Error(data.returnMsg || "Erro ao listar camiões");
    }
  },
};

// Função para preparar dados do GPS para envio
const prepararDadosGPS = (dados: CreateCamiaoData) => {
  const tipoGPS = dados.tipoGPS?.tipo || 'normal';
  const valorRegistro = calcularValorRegistro(tipoGPS);
  const hoje = new Date().toISOString().split('T')[0];

  const dadosGPS = {
    tipo: tipoGPS,
    descricao: gerarDescricaoGPS(tipoGPS),
    valorRegistro: valorRegistro,
    dataAtivacao: hoje,
    status: 'ativo' as StatusGPS,
    ...(dados.tipoGPS?.dataExpiracao && { dataExpiracao: dados.tipoGPS.dataExpiracao })
  };

  // Preparar dados GPS VIP se aplicável
  let gpsVipData = undefined;
  if (tipoGPS === 'vip' && dados.gpsVip) {
    gpsVipData = {
      camera: {
        possui: dados.gpsVip.camera.possui,
        modelo: dados.gpsVip.camera.modelo || 'Câmera GPS VIP',
        resolucao: dados.gpsVip.camera.resolucao || '1080p',
        dataInstalacao: dados.gpsVip.camera.dataInstalacao || hoje,
        status: dados.gpsVip.camera.status || 'operacional'
      },
      controleMotorista: {
        possui: dados.gpsVip.controleMotorista.possui,
        tipoControle: dados.gpsVip.controleMotorista.tipoControle || 'biometrico',
        dataInstalacao: dados.gpsVip.controleMotorista.dataInstalacao || hoje,
        ultimaAtualizacao: dados.gpsVip.controleMotorista.ultimaAtualizacao || hoje
      },
      recursosAdicionais: {
        monitoramentoTempoReal: dados.gpsVip.recursosAdicionais.monitoramentoTempoReal ?? true,
        alertasVelocidade: dados.gpsVip.recursosAdicionais.alertasVelocidade ?? true,
        relatoriosDesempenho: dados.gpsVip.recursosAdicionais.relatoriosDesempenho ?? true,
        geofencing: dados.gpsVip.recursosAdicionais.geofencing ?? true,
        comunicacaoAudio: dados.gpsVip.recursosAdicionais.comunicacaoAudio ?? true
      }
    };
  }

  return { dadosGPS, gpsVipData };
};

// Função principal para criar um novo camião
export async function criarNovoCamiao(dados: CreateCamiaoData): Promise<CreateCamiaoResponse> {
  try {
    // Validar dados antes do envio
    const validacao = validarDadosCamiao(dados);
    if (!validacao.valido) {
      return {
        returnCode: 400,
        returnMsg: `Dados inválidos: ${validacao.erros.join(', ')}`
      };
    }

    // Preparar dados do GPS
    const { dadosGPS, gpsVipData } = prepararDadosGPS(dados);

    // Verificar viabilidade operacional
    const viabilidade = {
      podeChante: true, // Todos os camiões podem fazer chanté por padrão
      podeNacional: dados.nivelInspecao.categoria === 'B' || dados.nivelInspecao.categoria === 'C',
      podeTransito: dados.nivelInspecao.categoria === 'C',
      podeGPSVip: verificarViabilidadeGPSVip(dados.nivelInspecao.categoria, dados.estado.tipo).podeGPSVip,
      motivos: verificarViabilidadeGPSVip(dados.nivelInspecao.categoria, dados.estado.tipo).motivos
    };

    // Preparar dados completos
    const dadosCompletos = {
      ...dados,
      tipoGPS: dadosGPS,
      ...(gpsVipData && { gpsVip: gpsVipData }),
      nivelInspecao: {
        ...dados.nivelInspecao,
        descricao: gerarDescricaoCategoria(dados.nivelInspecao.categoria),
        dataProximaInspecao: calcularProximaInspecao(
          dados.nivelInspecao.categoria,
          dados.nivelInspecao.dataUltimaInspecao
        )
      },
      viabilidade: viabilidade,
      status: dados.status || 'disponivel',
      disponibilidade: dados.disponibilidade || {
        tipoServico: [],
        regioes: [],
        observacoes: ''
      },
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString()
    };

    // Fazer a requisição para a API
    const response = await fetch(`${API_BASE_URL}/createCamiao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosCompletos),
    });

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.returnMsg || `Erro HTTP: ${response.status}`);
    }

    const result: CreateCamiaoResponse = await response.json();
    
    return result;

  } catch (error) {
    console.error('Erro ao criar camião:', error);
    
    return {
      returnCode: 500,
      returnMsg: error instanceof Error ? error.message : 'Erro desconhecido ao criar camião'
    };
  }
}

// Função auxiliar para criar dados padrão de um novo camião
export function criarDadosPadraoCamiao(): Partial<CreateCamiaoData> {
  const hoje = new Date();
  const proximoAno = new Date(hoje);
  proximoAno.setFullYear(proximoAno.getFullYear() + 1);

  return {
    status: 'disponivel',
    cor: 'Branco',
    tipoGPS: {
      tipo: 'normal',
      dataExpiracao: proximoAno.toISOString().split('T')[0]
    },
    especificacoes: {
      tipo: 'rigido',
      numEixos: 2,
      pesoBruto: 0,
      tara: 0,
      cargaUtil: 0
    },
    documentacao: {
      seguro: {
        numeroApolice: '',
        seguradora: '',
        dataEmissao: hoje.toISOString().split('T')[0],
        dataValidade: proximoAno.toISOString().split('T')[0],
        cobertura: 'Responsabilidade Civil'
      }
    },
    nivelInspecao: {
      categoria: 'A',
      dataUltimaInspecao: hoje.toISOString().split('T')[0],
      resultadoUltimaInspecao: 'aprovado',
      centroInspecao: ''
    },
    estado: {
      tipo: 'usado'
    },
    disponibilidade: {
      tipoServico: ['chante'],
      regioes: [],
      observacoes: ''
    }
  };
}

// Função para atualizar tipo de GPS de um camião existente
export async function atualizarTipoGPS(
  camiaoId: number, 
  tipoGPS: TipoGPS, 
  dataExpiracao?: string
): Promise<CreateCamiaoResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/atualizarTipoGPS`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        camiaoId,
        tipoGPS,
        dataExpiracao
      }),
    });

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.returnMsg || `Erro HTTP: ${response.status}`);
    }

    const result: CreateCamiaoResponse = await response.json();
    return result;

  } catch (error) {
    console.error('Erro ao atualizar tipo de GPS:', error);
    
    return {
      returnCode: 500,
      returnMsg: error instanceof Error ? error.message : 'Erro desconhecido ao atualizar tipo de GPS'
    };
  }
}

// Função para verificar elegibilidade para GPS VIP
export function verificarElegibilidadeGPSVip(
  categoria: CategoriaInspecao,
  estado: "novo" | "seminovo" | "usado" | "recondicionado"
): { elegivel: boolean; motivos: string[] } {
  const viabilidade = verificarViabilidadeGPSVip(categoria, estado);
  return {
    elegivel: viabilidade.podeGPSVip,
    motivos: viabilidade.motivos
  };
}

// Hook React para gerenciar o estado do formulário de camião
// import { useState } from 'react';
import { CategoriaInspecao, ResultadoInspecao, TipoCamiao } from './modelNovoCamiao';
import { Camiao } from './camioes';