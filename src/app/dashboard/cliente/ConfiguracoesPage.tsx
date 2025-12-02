/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from 'react';
import { FiUser, FiBell, FiSettings, FiShield, FiGlobe, FiSave, FiDownload, FiTrash2, FiKey, FiEye, FiEyeOff, FiFileText, FiRefreshCw } from 'react-icons/fi';
import { 
  getConfiguracoesUsuario, 
  salvarConfiguracoesUsuario,
  alterarSenhaUsuario,
  gerenciarIntegracaoAPI,
  exportarDadosUsuario,
  copiarParaAreaTransferencia,
  formatarData,
  type ConfiguracoesUsuario,
  type IntegracaoAPI,
  type FormSenha
} from './configuracoes';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';

// Componente Spinner
const Spinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-blue-600`} />
  );
};

// Componente principal
const ConfiguracoesPage: React.FC = () => {
  // Usar contexto de autenticação
  const { user, logout } = useAuth();
  
  // Estados principais
  const [configuracoes, setConfiguracoes] = useState<ConfiguracoesUsuario>({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
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
  });

  const [integracaoAPI, setIntegracaoAPI] = useState<IntegracaoAPI[]>([]);
  const [formSenha, setFormSenha] = useState<FormSenha>({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  });

  // Estados de UI
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSenhaAtual, setShowSenhaAtual] = useState(false);
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  const [confirmacaoExclusao, setConfirmacaoExclusao] = useState('');

  // Verificar se usuário está autenticado
  useEffect(() => {
    if (!user) {
      toast.error('Usuário não autenticado. Faça login novamente.');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    }
  }, [user]);

  // Carregar configurações iniciais
  useEffect(() => {
    if (user?.codigo) {
      carregarConfiguracoes();
    }
  }, [user]);

  // Função para carregar configurações
  const carregarConfiguracoes = async () => {
    try {
      if (!user?.codigo) {
        throw new Error('Usuário não autenticado');
      }

      setIsDataLoading(true);
      
      const { configuracoes: config, integracaoAPI: apiIntegracoes } = 
        await getConfiguracoesUsuario(user.codigo);
      
      setConfiguracoes(config);
      setIntegracaoAPI(apiIntegracoes);
      
      toast.success('Configurações carregadas com sucesso!');
    } catch (error: any) {
      console.error('Erro ao carregar configurações:', error);
      
      if (error.message.includes('Usuário não autenticado')) {
        toast.error('Sessão expirada. Faça login novamente.');
        logout();
      } else {
        toast.error(error.message || 'Erro ao carregar configurações');
      }
    } finally {
      setIsDataLoading(false);
    }
  };

  // Handlers para configurações
  const handleConfigChange = (campo: keyof ConfiguracoesUsuario, valor: any) => {
    setConfiguracoes(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const handleNotificacaoChange = useCallback((chave: string, valor: boolean) => {
    setConfiguracoes(prev => ({
      ...prev,
      notificacoes: {
        ...prev.notificacoes,
        [chave]: valor
      }
    }));
  }, []);

  const handlePreferenciaChange = useCallback((campo: keyof ConfiguracoesUsuario['preferencias'], valor: any) => {
    setConfiguracoes(prev => ({
      ...prev,
      preferencias: {
        ...prev.preferencias,
        [campo]: valor
      }
    }));
  }, []);

  // Salvar configurações
  const salvarConfiguracoes = async () => {
    try {
      if (!user?.codigo) {
        throw new Error('Usuário não autenticado');
      }

      setIsSaving(true);
      
      const resultado = await salvarConfiguracoesUsuario(user.codigo, configuracoes);
      
      if (resultado.success) {
        toast.success(resultado.message);
        
        // Recarregar para garantir sincronização
        setTimeout(() => carregarConfiguracoes(), 1000);
      } else {
        throw new Error(resultado.message);
      }
    } catch (error: any) {
      console.error('Erro ao salvar configurações:', error);
      
      if (error.message.includes('Sessão expirada') || error.message.includes('Não autorizado')) {
        toast.error('Sessão expirada. Faça login novamente.');
        logout();
      } else {
        toast.error(error.message || 'Erro ao salvar configurações');
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Alterar senha
  const alterarSenha = async () => {
    try {
      if (!user?.codigo) {
        throw new Error('Usuário não autenticado');
      }

      setIsDataLoading(true);
      
      // Validações básicas
      if (!formSenha.senhaAtual) {
        throw new Error('Digite a senha atual');
      }
      
      if (!formSenha.novaSenha) {
        throw new Error('Digite a nova senha');
      }
      
      if (formSenha.novaSenha.length < 6) {
        throw new Error('A nova senha deve ter pelo menos 6 caracteres');
      }
      
      if (formSenha.novaSenha !== formSenha.confirmarSenha) {
        throw new Error('As senhas não coincidem');
      }

      const resultado = await alterarSenhaUsuario(user.codigo, formSenha);
      
      if (resultado.success) {
        toast.success(resultado.message);
        
        // Limpar formulário
        setFormSenha({
          senhaAtual: '',
          novaSenha: '',
          confirmarSenha: ''
        });
        
        // Mostrar mensagem de sucesso
        toast.info('Recomendamos fazer login novamente com a nova senha.');
      } else {
        throw new Error(resultado.message);
      }
    } catch (error: any) {
      console.error('Erro ao alterar senha:', error);
      
      if (error.message.includes('Sessão expirada') || error.message.includes('Não autorizado')) {
        toast.error('Sessão expirada. Faça login novamente.');
        logout();
      } else {
        toast.error(error.message || 'Erro ao alterar senha');
      }
    } finally {
      setIsDataLoading(false);
    }
  };

  // Toggle integração API
  const toggleIntegracaoAPI = async (id: string) => {
    try {
      if (!user?.codigo) {
        throw new Error('Usuário não autenticado');
      }

      // Atualizar estado local imediatamente para feedback visual
      setIntegracaoAPI(prev => 
        prev.map(api => 
          api.id === id ? { ...api, ativa: !api.ativa } : api
        )
      );

      const resultado = await gerenciarIntegracaoAPI(user.codigo, id, 'toggle');
      
      if (!resultado.success) {
        // Reverter se falhar
        setIntegracaoAPI(prev => 
          prev.map(api => 
            api.id === id ? { ...api, ativa: !api.ativa } : api
          )
        );
        throw new Error(resultado.message);
      }

      toast.success(resultado.message);
    } catch (error: any) {
      console.error('Erro ao alterar integração:', error);
      toast.error(error.message || 'Erro ao alterar integração');
    }
  };

  // Gerar nova chave API
  const gerarNovaChaveAPI = async (id: string) => {
    try {
      if (!user?.codigo) {
        throw new Error('Usuário não autenticado');
      }

      const resultado = await gerenciarIntegracaoAPI(user.codigo, id, 'gerarChave');
      
      if (resultado.success && resultado.data?.novaChave) {
        // Atualizar estado local
        setIntegracaoAPI(prev => 
          prev.map(api => 
            api.id === id ? { 
              ...api, 
              chave: resultado.data.novaChave,
              dataCriacao: new Date().toISOString()
            } : api
          )
        );

        toast.success('Nova chave gerada com sucesso!');
      } else {
        throw new Error(resultado.message);
      }
    } catch (error: any) {
      console.error('Erro ao gerar chave:', error);
      toast.error(error.message || 'Erro ao gerar chave');
    }
  };

  // Exportar dados
  const exportarDados = async () => {
    try {
      if (!user?.codigo) {
        throw new Error('Usuário não autenticado');
      }

      setIsDataLoading(true);
      
      const resultado = await exportarDadosUsuario(user.codigo);
      
      if (resultado.success) {
        toast.success(resultado.message);
      } else {
        throw new Error(resultado.message);
      }
    } catch (error: any) {
      console.error('Erro ao exportar dados:', error);
      
      if (error.message.includes('Sessão expirada') || error.message.includes('Não autorizado')) {
        toast.error('Sessão expirada. Faça login novamente.');
        logout();
      } else {
        toast.error(error.message || 'Erro ao exportar dados');
      }
    } finally {
      setIsDataLoading(false);
    }
  };

  // Copiar chave API
  const copiarChaveAPI = async (chave: string) => {
    const sucesso = await copiarParaAreaTransferencia(chave);
    
    if (sucesso) {
      toast.success('Chave copiada para a área de transferência!');
    } else {
      toast.error('Erro ao copiar chave');
    }
  };

  // Handler para exclusão de conta
  const handleExcluirConta = () => {
    if (confirmacaoExclusao === 'CONFIRMAR EXCLUSÃO') {
      if (window.confirm('⚠️ ATENÇÃO: Esta ação é irreversível!\n\nTem certeza que deseja excluir sua conta? Todos os seus dados serão permanentemente removidos.')) {
        // Em produção, você chamaria uma API para excluir a conta
        toast.info('Funcionalidade de exclusão de conta será implementada em breve.');
        setConfirmacaoExclusao('');
      }
    } else {
      toast.error('Digite "CONFIRMAR EXCLUSÃO" para confirmar');
    }
  };

  // Determinar nome de exibição baseado no tipo de usuário
  const getDisplayName = () => {
    if (!user) return '';
    
    if (user.tipo === 'usuario') {
      return user.nome;
    } else if (user.tipo === 'transportadora') {
      return user.nomeEmpresa;
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      {/* Cabeçalho com informações do usuário */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Configurações
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Gerencie suas preferências e configurações de conta
            </p>
          </div>
          
          {user && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <FiUser className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {getDisplayName()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user.email} • {user.categoria}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="space-y-6">
        {/* Perfil do Usuário */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <FiUser className="w-5 h-5 mr-2" />
              Perfil do Usuário
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={configuracoes.nome}
                  onChange={(e) => handleConfigChange("nome", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={isDataLoading}
                  placeholder={getDisplayName()}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={configuracoes.email}
                  onChange={(e) => handleConfigChange("email", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={isDataLoading}
                  placeholder={user?.email}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={configuracoes.telefone}
                  onChange={(e) => handleConfigChange("telefone", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={isDataLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  value={configuracoes.empresa}
                  onChange={(e) => handleConfigChange("empresa", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={isDataLoading}
                  placeholder={user?.tipo === 'transportadora' ? user.nomeEmpresa : 'Mega Centro e Logistica'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  País
                </label>
                <select
                  value={configuracoes.pais}
                  onChange={(e) => handleConfigChange("pais", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={isDataLoading}
                >
                  <option value="Moçambique">Moçambique</option>
                  <option value="Angola">Angola</option>
                  <option value="Brasil">Brasil</option>
                  <option value="Portugal">Portugal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cidade
                </label>
                <input
                  type="text"
                  value={configuracoes.cidade}
                  onChange={(e) => handleConfigChange("cidade", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={isDataLoading}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  value={configuracoes.endereco}
                  onChange={(e) => handleConfigChange("endereco", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={isDataLoading}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preferências de Notificação */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <FiBell className="w-5 h-5 mr-2" />
              Preferências de Notificação
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Canais de Notificação
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      key: "email",
                      label: "Email",
                      description: "Receber notificações por email"
                    },
                    {
                      key: "sms",
                      label: "SMS",
                      description: "Receber notificações por SMS"
                    },
                    {
                      key: "push",
                      label: "Notificações Push",
                      description: "Receber notificações no navegador"
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.label}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleNotificacaoChange(
                            item.key,
                            !configuracoes.notificacoes[item.key as keyof typeof configuracoes.notificacoes]
                          )
                        }
                        disabled={isDataLoading}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          configuracoes.notificacoes[item.key as keyof typeof configuracoes.notificacoes]
                            ? "bg-blue-600"
                            : "bg-gray-200"
                        } ${isDataLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            configuracoes.notificacoes[item.key as keyof typeof configuracoes.notificacoes]
                              ? "translate-x-5"
                              : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Tipos de Notificação
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      key: "alertasCarga",
                      label: "Alertas de Carga",
                      description: "Notificações sobre status de cargas"
                    },
                    {
                      key: "atualizacoesStatus",
                      label: "Atualizações de Status",
                      description: "Mudanças no status das cargas"
                    },
                    {
                      key: "notificacoesFinanceiras",
                      label: "Notificações Financeiras",
                      description: "Faturas e pagamentos"
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.label}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleNotificacaoChange(
                            item.key,
                            !configuracoes.notificacoes[item.key as keyof typeof configuracoes.notificacoes]
                          )
                        }
                        disabled={isDataLoading}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          configuracoes.notificacoes[item.key as keyof typeof configuracoes.notificacoes]
                            ? "bg-blue-600"
                            : "bg-gray-200"
                        } ${isDataLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            configuracoes.notificacoes[item.key as keyof typeof configuracoes.notificacoes]
                              ? "translate-x-5"
                              : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preferências do Sistema */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <FiSettings className="w-5 h-5 mr-2" />
              Preferências do Sistema
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tema
                </label>
                <select
                  value={configuracoes.preferencias.tema}
                  onChange={(e) =>
                    handlePreferenciaChange("tema", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={isDataLoading}
                >
                  <option value="claro">Claro</option>
                  <option value="escuro">Escuro</option>
                  <option value="auto">Automático</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Itens por Página
                </label>
                <select
                  value={configuracoes.preferencias.itensPorPagina}
                  onChange={(e) =>
                    handlePreferenciaChange(
                      "itensPorPagina",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={isDataLoading}
                >
                  <option value={10}>10 itens</option>
                  <option value={25}>25 itens</option>
                  <option value={50}>50 itens</option>
                  <option value={100}>100 itens</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Idioma
                </label>
                <select
                  value={configuracoes.idioma}
                  onChange={(e) =>
                    handleConfigChange("idioma", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={isDataLoading}
                >
                  <option value="pt">Português</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fuso Horário
                </label>
                <select
                  value={configuracoes.fusoHorario}
                  onChange={(e) =>
                    handleConfigChange("fusoHorario", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={isDataLoading}
                >
                  <option value="Africa/Maputo">Maputo (UTC+2)</option>
                  <option value="Africa/Johannesburg">
                    Johannesburg (UTC+2)
                  </option>
                  <option value="Europe/Lisbon">Lisboa (UTC+0)</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Relatórios Automáticos
                    </p>
                    <p className="text-sm text-gray-500">
                      Receber relatórios semanais automaticamente
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handlePreferenciaChange(
                        "relatoriosAutomaticos",
                        !configuracoes.preferencias.relatoriosAutomaticos
                      )
                    }
                    disabled={isDataLoading}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      configuracoes.preferencias.relatoriosAutomaticos
                        ? "bg-blue-600"
                        : "bg-gray-200"
                    } ${isDataLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        configuracoes.preferencias.relatoriosAutomaticos
                          ? "translate-x-5"
                          : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Segurança */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <FiShield className="w-5 h-5 mr-2" />
              Segurança
            </h2>
          </div>
          <div className="p-6">
            <div className="max-w-md space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Senha Atual
                </label>
                <div className="relative">
                  <input
                    type={showSenhaAtual ? "text" : "password"}
                    value={formSenha.senhaAtual}
                    onChange={(e) =>
                      setFormSenha((prev) => ({
                        ...prev,
                        senhaAtual: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-10"
                    disabled={isDataLoading}
                    placeholder="Digite sua senha atual"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSenhaAtual(!showSenhaAtual)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    disabled={isDataLoading}
                  >
                    {showSenhaAtual ? (
                      <FiEyeOff className="w-5 h-5" />
                    ) : (
                      <FiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nova Senha
                </label>
                <div className="relative">
                  <input
                    type={showNovaSenha ? "text" : "password"}
                    value={formSenha.novaSenha}
                    onChange={(e) =>
                      setFormSenha((prev) => ({
                        ...prev,
                        novaSenha: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-10"
                    disabled={isDataLoading}
                    placeholder="Mínimo 6 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNovaSenha(!showNovaSenha)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    disabled={isDataLoading}
                  >
                    {showNovaSenha ? (
                      <FiEyeOff className="w-5 h-5" />
                    ) : (
                      <FiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirmar Nova Senha
                </label>
                <div className="relative">
                  <input
                    type={showConfirmarSenha ? "text" : "password"}
                    value={formSenha.confirmarSenha}
                    onChange={(e) =>
                      setFormSenha((prev) => ({
                        ...prev,
                        confirmarSenha: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-10"
                    disabled={isDataLoading}
                    placeholder="Digite a nova senha novamente"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmarSenha(!showConfirmarSenha)
                    }
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    disabled={isDataLoading}
                  >
                    {showConfirmarSenha ? (
                      <FiEyeOff className="w-5 h-5" />
                    ) : (
                      <FiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <button
                onClick={alterarSenha}
                disabled={isDataLoading || !formSenha.senhaAtual || !formSenha.novaSenha || !formSenha.confirmarSenha}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 w-full md:w-auto"
              >
                {isDataLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <FiKey className="w-4 h-4" />
                )}
                <span>
                  {isDataLoading ? "Alterando..." : "Alterar Senha"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Integrações API */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <FiGlobe className="w-5 h-5 mr-2" />
              Integrações API
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {integracaoAPI.length > 0 ? (
                integracaoAPI.map((api) => (
                  <div
                    key={api.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {api.nome}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {api.descricao}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleIntegracaoAPI(api.id)}
                        disabled={isDataLoading}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          api.ativa ? "bg-green-600" : "bg-gray-200"
                        } ${isDataLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            api.ativa ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Chave API:</span>
                        <div className="flex items-center space-x-2 mt-1">
                          <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs font-mono truncate max-w-xs">
                            {api.chave}
                          </code>
                          <button
                            onClick={() => copiarChaveAPI(api.chave)}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-xs whitespace-nowrap"
                            disabled={isDataLoading}
                          >
                            Copiar
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Criada em:</span>
                          <span>{formatarData(api.dataCriacao)}</span>
                        </div>
                        {api.ultimoUso && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Último uso:</span>
                            <span>{formatarData(api.ultimoUso)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => gerarNovaChaveAPI(api.id)}
                        disabled={isDataLoading}
                        className="px-3 py-1 text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
                      >
                        <FiKey className="w-3 h-3" />
                        <span>Gerar Nova Chave</span>
                      </button>
                      <button
                        disabled={isDataLoading}
                        className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
                      >
                        <FiFileText className="w-3 h-3" />
                        <span>Documentação</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Nenhuma integração API disponível no momento.</p>
                  <p className="text-sm mt-1">Entre em contato com o suporte para mais informações.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Ações
            </h2>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row flex-wrap gap-4">
              <button
                onClick={salvarConfiguracoes}
                disabled={isSaving || isDataLoading || !user}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {isSaving ? (
                  <Spinner size="sm" />
                ) : (
                  <FiSave className="w-4 h-4" />
                )}
                <span>
                  {isSaving ? "Salvando..." : "Salvar Configurações"}
                </span>
              </button>
              
              <button
                onClick={exportarDados}
                disabled={isDataLoading || !user}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                <FiDownload className="w-4 h-4" />
                <span>Exportar Dados</span>
              </button>
              
              <button
                onClick={carregarConfiguracoes}
                disabled={isDataLoading || !user}
                className="px-4 py-2 border border-blue-300 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                <FiRefreshCw className="w-4 h-4" />
                <span>Recarregar</span>
              </button>
              
              <div className="flex-1 min-w-full md:min-w-0 md:mt-0">
                <div className="space-y-2">
                  <input
                    type="text"
                    value={confirmacaoExclusao}
                    onChange={(e) => setConfirmacaoExclusao(e.target.value)}
                    placeholder='Digite "CONFIRMAR EXCLUSÃO"'
                    className="w-full px-3 py-2 border border-red-300 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    disabled={isDataLoading || !user}
                  />
                  <button
                    onClick={handleExcluirConta}
                    disabled={confirmacaoExclusao !== 'CONFIRMAR EXCLUSÃO' || !user}
                    className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 w-full"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    <span>Excluir Conta</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botão de recarregar flutuante */}
      <div className="fixed bottom-4 right-4 z-10">
        <button
          onClick={carregarConfiguracoes}
          disabled={isDataLoading || !user}
          className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          title="Recarregar configurações"
        >
          {isDataLoading ? (
            <Spinner size="sm" />
          ) : (
            <FiRefreshCw className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mensagem para usuário não autenticado */}
      {!user && !isDataLoading && (
        <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiUser className="w-8 h-8 text-red-600 dark:text-red-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Acesso não autorizado
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Você precisa estar autenticado para acessar esta página.
            </p>
            <button
              onClick={() => window.location.href = '/login'}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full"
            >
              Ir para Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfiguracoesPage;