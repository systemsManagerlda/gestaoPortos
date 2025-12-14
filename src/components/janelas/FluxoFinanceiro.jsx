import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FluxoFinanceiro = () => {
  const [activeFluxoFinanceiro, setActiveFluxoFinanceiro] = useState("dashboard");
  const [showNovaMovimentacao, setShowNovaMovimentacao] = useState(false);
  const [dadosDashboard, setDadosDashboard] = useState(null);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [projecoes, setProjecoes] = useState([]);
  const [saldosContas, setSaldosContas] = useState([]);
  const [loading, setLoading] = useState({
    dashboard: false,
    movimentacoes: false,
    projecoes: false,
    saldos: false
  });
  const [erro, setErro] = useState(null);
  const [filtros, setFiltros] = useState({
    dataInicio: new Date().toISOString().split('T')[0],
    dataFim: new Date().toISOString().split('T')[0],
    tipoMovimentacao: '',
    contaBanco: '',
    categoria: ''
  });

  // Configuração do axios
  const api = axios.create({
    baseURL: "https://desktop-api-4f850b3f9733.herokuapp.com",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  // Buscar dados do dashboard
  const buscarDashboard = async () => {
    setLoading(prev => ({ ...prev, dashboard: true }));
    setErro(null);
    
    try {
      const response = await api.post('/getDashboardFluxoFinanceiro', {});
      if (response.data.returnCode === 200) {
        setDadosDashboard(response.data.data);
      } else {
        throw new Error(response.data.returnMsg);
      }
    } catch (error) {
      console.error('Erro ao buscar dashboard:', error);
      setErro('Erro ao carregar dados do dashboard: ' + error.message);
    } finally {
      setLoading(prev => ({ ...prev, dashboard: false }));
    }
  };

  // Buscar movimentações financeiras
  const buscarMovimentacoes = async (pagina = 1, tamanhoPagina = 10) => {
    setLoading(prev => ({ ...prev, movimentacoes: true }));
    setErro(null);
    
    try {
      const response = await api.post('/getMovimentacoesFinanceirasList', {
        curPage: pagina,
        pageSize: tamanhoPagina,
        dataInicio: filtros.dataInicio,
        dataFim: filtros.dataFim,
        tipoMovimentacao: filtros.tipoMovimentacao || undefined,
        contaBanco: filtros.contaBanco || undefined,
        categoria: filtros.categoria || undefined
      });
      
      if (response.data.returnCode === 200) {
        setMovimentacoes(response.data.data.list);
      } else {
        throw new Error(response.data.returnMsg);
      }
    } catch (error) {
      console.error('Erro ao buscar movimentações:', error);
      setErro('Erro ao carregar movimentações: ' + error.message);
    } finally {
      setLoading(prev => ({ ...prev, movimentacoes: false }));
    }
  };

  // Buscar projeções futuras
  const buscarProjecoes = async () => {
    setLoading(prev => ({ ...prev, projecoes: true }));
    setErro(null);
    
    try {
      const response = await api.post('/getProjecoesFuturas', {
        dataInicio: new Date().toISOString().split('T')[0],
        meses: 3
      });
      
      if (response.data.returnCode === 200) {
        setProjecoes(response.data.data);
      } else {
        throw new Error(response.data.returnMsg);
      }
    } catch (error) {
      console.error('Erro ao buscar projeções:', error);
      setErro('Erro ao carregar projeções: ' + error.message);
    } finally {
      setLoading(prev => ({ ...prev, projecoes: false }));
    }
  };

  // Buscar saldos por conta
  const buscarSaldosContas = async () => {
    setLoading(prev => ({ ...prev, saldos: true }));
    setErro(null);
    
    try {
      const response = await api.post('/getSaldosPorConta', {});
      
      if (response.data.returnCode === 200) {
        setSaldosContas(response.data.data);
      } else {
        throw new Error(response.data.returnMsg);
      }
    } catch (error) {
      console.error('Erro ao buscar saldos:', error);
      setErro('Erro ao carregar saldos: ' + error.message);
    } finally {
      setLoading(prev => ({ ...prev, saldos: false }));
    }
  };

  // Buscar relatório financeiro
  const buscarRelatorio = async () => {
    setErro(null);
    
    try {
      const response = await api.post('/getRelatorioFluxoFinanceiro', {
        dataInicio: filtros.dataInicio,
        dataFim: filtros.dataFim,
        grupoPor: 'dia'
      });
      
      if (response.data.returnCode === 200) {
        return response.data.data;
      } else {
        throw new Error(response.data.returnMsg);
      }
    } catch (error) {
      console.error('Erro ao buscar relatório:', error);
      setErro('Erro ao gerar relatório: ' + error.message);
    }
  };

  // Criar nova movimentação
  const criarMovimentacao = async (dadosMovimentacao) => {
    setErro(null);
    
    try {
      const response = await api.post('/createMovimentacaoFinanceira', dadosMovimentacao);
      
      if (response.data.returnCode === 201) {
        // Atualizar lista de movimentações
        buscarMovimentacoes();
        return response.data.data;
      } else {
        throw new Error(response.data.returnMsg);
      }
    } catch (error) {
      console.error('Erro ao criar movimentação:', error);
      setErro('Erro ao criar movimentação: ' + error.message);
      throw error;
    }
  };

  // Atualizar movimentação
  const atualizarMovimentacao = async (movimentacaoId, dadosAtualizacao) => {
    setErro(null);
    
    try {
      const response = await api.post('/updateMovimentacaoFinanceira', {
        movimentacaoId,
        ...dadosAtualizacao
      });
      
      if (response.data.returnCode === 200) {
        // Atualizar lista de movimentações
        buscarMovimentacoes();
        return response.data.data;
      } else {
        throw new Error(response.data.returnMsg);
      }
    } catch (error) {
      console.error('Erro ao atualizar movimentação:', error);
      setErro('Erro ao atualizar movimentação: ' + error.message);
      throw error;
    }
  };

  // Conciliar movimentação
  const conciliarMovimentacao = async (movimentacaoId, dadosConciliacao) => {
    setErro(null);
    
    try {
      const response = await api.post('/conciliarMovimentacao', {
        movimentacaoId,
        dadosConciliacao
      });
      
      if (response.data.returnCode === 200) {
        // Atualizar lista de movimentações
        buscarMovimentacoes();
        return response.data.data;
      } else {
        throw new Error(response.data.returnMsg);
      }
    } catch (error) {
      console.error('Erro ao conciliar movimentação:', error);
      setErro('Erro ao conciliar movimentação: ' + error.message);
      throw error;
    }
  };

  // Cancelar movimentação
  const cancelarMovimentacao = async (movimentacaoId, motivo) => {
    setErro(null);
    
    try {
      const response = await api.post('/cancelarMovimentacaoFinanceira', {
        movimentacaoId,
        motivo,
        usuario: localStorage.getItem('username') || 'system'
      });
      
      if (response.data.returnCode === 200) {
        // Atualizar lista de movimentações
        buscarMovimentacoes();
        return response.data.data;
      } else {
        throw new Error(response.data.returnMsg);
      }
    } catch (error) {
      console.error('Erro ao cancelar movimentação:', error);
      setErro('Erro ao cancelar movimentação: ' + error.message);
      throw error;
    }
  };

  // Agendar movimentação
  const agendarMovimentacao = async (movimentacaoId, dadosAgendamento) => {
    setErro(null);
    
    try {
      const response = await api.post('/agendarMovimentacao', {
        movimentacaoId,
        dadosAgendamento
      });
      
      if (response.data.returnCode === 200) {
        // Atualizar lista de movimentações
        buscarMovimentacoes();
        return response.data.data;
      } else {
        throw new Error(response.data.returnMsg);
      }
    } catch (error) {
      console.error('Erro ao agendar movimentação:', error);
      setErro('Erro ao agendar movimentação: ' + error.message);
      throw error;
    }
  };

  // Realizar transferência
  const realizarTransferencia = async (transferenciaData) => {
    setErro(null);
    
    try {
      const response = await api.post('/realizarTransferencia', {
        transferenciaData
      });
      
      if (response.data.returnCode === 200) {
        // Atualizar dashboard e saldos
        buscarDashboard();
        buscarSaldosContas();
        return response.data.data;
      } else {
        throw new Error(response.data.returnMsg);
      }
    } catch (error) {
      console.error('Erro ao realizar transferência:', error);
      setErro('Erro ao realizar transferência: ' + error.message);
      throw error;
    }
  };

  // Buscar saldo consolidado
  const buscarSaldoConsolidado = async () => {
    try {
      const response = await api.post('/getSaldoConsolidado', {
        dataReferencia: new Date().toISOString().split('T')[0]
      });
      
      if (response.data.returnCode === 200) {
        return response.data.data;
      } else {
        throw new Error(response.data.returnMsg);
      }
    } catch (error) {
      console.error('Erro ao buscar saldo consolidado:', error);
      return null;
    }
  };

  // Buscar fluxo por período
  const buscarFluxoPeriodo = async (dataInicio, dataFim, agrupamento = 'diario') => {
    try {
      const response = await api.post('/getFluxoPorPeriodo', {
        dataInicio,
        dataFim,
        agrupamento
      });
      
      if (response.data.returnCode === 200) {
        return response.data.data;
      } else {
        throw new Error(response.data.returnMsg);
      }
    } catch (error) {
      console.error('Erro ao buscar fluxo por período:', error);
      return [];
    }
  };

  // Exportar movimentação
  const exportarMovimentacao = async (movimentacaoId, formato = 'json') => {
    try {
      const response = await api.post('/exportarMovimentacaoFinanceira', {
        movimentacaoId,
        formato
      });
      
      if (response.data.returnCode === 200) {
        return response.data.data;
      } else {
        throw new Error(response.data.returnMsg);
      }
    } catch (error) {
      console.error('Erro ao exportar movimentação:', error);
      setErro('Erro ao exportar movimentação: ' + error.message);
      throw error;
    }
  };

  // Buscar movimentações por período
  const buscarMovimentacoesPeriodo = async (dataInicio, dataFim) => {
    try {
      const response = await api.post('/buscarMovimentacoesPeriodo', {
        dataInicio,
        dataFim
      });
      
      if (response.data.returnCode === 200) {
        return response.data.data;
      } else {
        throw new Error(response.data.returnMsg);
      }
    } catch (error) {
      console.error('Erro ao buscar movimentações por período:', error);
      return { movimentacoes: [], totais: {} };
    }
  };

  // Buscar movimentações pendentes
  const buscarMovimentacoesPendentes = async () => {
    try {
      const response = await api.post('/getMovimentacoesPendentes', {
        tipoPendencia: 'todos'
      });
      
      if (response.data.returnCode === 200) {
        return response.data.data.list;
      } else {
        throw new Error(response.data.returnMsg);
      }
    } catch (error) {
      console.error('Erro ao buscar movimentações pendentes:', error);
      return [];
    }
  };

  // Efeito para carregar dados iniciais
  useEffect(() => {
    buscarDashboard();
    buscarMovimentacoes();
    buscarProjecoes();
    buscarSaldosContas();
  }, []);

  // Efeito para atualizar quando os filtros mudam
  useEffect(() => {
    if (activeFluxoFinanceiro === 'fluxo-caixa') {
      buscarMovimentacoes();
    }
  }, [filtros]);

  // Handler para mudança de filtros
  const handleFiltroChange = (nome, valor) => {
    setFiltros(prev => ({
      ...prev,
      [nome]: valor
    }));
  };

  // Formatar valor monetário
  const formatarValor = (valor) => {
    if (!valor && valor !== 0) return '-';
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(valor);
  };

  // Formatar data
  const formatarData = (dataString) => {
    if (!dataString) return '-';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-MZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Componente de Loading
  const LoadingSpinner = ({ mensagem }) => (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-gray-600">{mensagem || 'Carregando...'}</p>
    </div>
  );

  // Componente de Erro
  const ErrorMessage = ({ mensagem, onRetry }) => (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <div className="flex items-center">
        <span className="text-red-600 mr-2">⚠️</span>
        <p className="text-red-800">{mensagem}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
        >
          Tentar Novamente
        </button>
      )}
    </div>
  );

  // Componente para criar nova movimentação
  const NovaMovimentacaoModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      tipoMovimentacao: 'entrada',
      valor: '',
      descricao: '',
      categoria: 'receita_transporte',
      contaOrigem: {
        banco: 'bci',
        numeroConta: ''
      },
      contaDestino: {}
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await criarMovimentacao(formData);
        onClose();
        // Resetar formulário
        setFormData({
          tipoMovimentacao: 'entrada',
          valor: '',
          descricao: '',
          categoria: 'receita_transporte',
          contaOrigem: {
            banco: 'bci',
            numeroConta: ''
          },
          contaDestino: {}
        });
      } catch (error) {
        // Erro já tratado na função criarMovimentacao
      }
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 text-gray-950">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Nova Movimentação</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Movimentação *
                  </label>
                  <select
                    name="tipoMovimentacao"
                    value={formData.tipoMovimentacao}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="entrada">Entrada</option>
                    <option value="saida">Saída</option>
                    <option value="transferencia">Transferência</option>
                    <option value="ajuste">Ajuste</option>
                    <option value="investimento">Investimento</option>
                    <option value="financiamento">Financiamento</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor (MT) *
                  </label>
                  <input
                    type="number"
                    name="valor"
                    value={formData.valor}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição *
                  </label>
                  <input
                    type="text"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Descrição da movimentação"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria *
                  </label>
                  <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="receita_transporte">Receita - Transporte</option>
                    <option value="receita_servicos">Receita - Serviços</option>
                    <option value="receita_outros">Receita - Outros</option>
                    <option value="despesa_combustivel">Despesa - Combustível</option>
                    <option value="despesa_salarios">Despesa - Salários</option>
                    <option value="despesa_manutencao">Despesa - Manutenção</option>
                    <option value="despesa_operacional">Despesa - Operacional</option>
                    <option value="despesa_administrativa">Despesa - Administrativa</option>
                    <option value="despesa_impostos">Despesa - Impostos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Banco
                  </label>
                  <select
                    name="banco"
                    value={formData.contaOrigem.banco}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      contaOrigem: { ...prev.contaOrigem, banco: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="bci">BCI</option>
                    <option value="standard_bank">Standard Bank</option>
                    <option value="millennium_bim">Millennium BIM</option>
                    <option value="absa">Absa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número da Conta
                  </label>
                  <input
                    type="text"
                    value={formData.contaOrigem.numeroConta}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      contaOrigem: { ...prev.contaOrigem, numeroConta: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Número da conta"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data da Movimentação
                  </label>
                  <input
                    type="datetime-local"
                    name="dataMovimentacao"
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      dataMovimentacao: e.target.value
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                >
                  Criar Movimentação
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col text-gray-900">
      {/* Cabeçalho */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
                💸
              </span>
              Fluxo Financeiro - Gestão de Caixa e Tesouraria
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              {dadosDashboard ? 
                `Última atualização: ${new Date().toLocaleTimeString('pt-MZ')}` : 
                'Monitorização em tempo real do fluxo de caixa, projeções e análise financeira'
              }
            </p>
          </div>
          <button
            onClick={() => setShowNovaMovimentacao(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center transition-colors"
          >
            <span className="mr-2">+</span>
            Nova Movimentação
          </button>
        </div>
      </div>

      {/* Menu de Navegação */}
      <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4 px-6 overflow-x-auto">
        {['dashboard', 'fluxo-caixa', 'projecoes', 'bancos', 'graficos', 'relatorios'].map((item) => (
          <button
            key={item}
            onClick={() => setActiveFluxoFinanceiro(item)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
              activeFluxoFinanceiro === item
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {item === 'dashboard' && '📊 Dashboard'}
            {item === 'fluxo-caixa' && '💰 Fluxo de Caixa'}
            {item === 'projecoes' && '📈 Projeções'}
            {item === 'bancos' && '🏦 Contas Bancárias'}
            {item === 'graficos' && '📊 Gráficos'}
            {item === 'relatorios' && '📋 Relatórios'}
          </button>
        ))}
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 p-6">
        {/* Mensagem de Erro */}
        {erro && <ErrorMessage mensagem={erro} onRetry={() => {
          if (activeFluxoFinanceiro === 'dashboard') buscarDashboard();
          if (activeFluxoFinanceiro === 'fluxo-caixa') buscarMovimentacoes();
          if (activeFluxoFinanceiro === 'projecoes') buscarProjecoes();
          if (activeFluxoFinanceiro === 'bancos') buscarSaldosContas();
        }} />}

        {/* Loading Geral */}
        {loading[activeFluxoFinanceiro] && <LoadingSpinner mensagem={`Carregando ${activeFluxoFinanceiro}...`} />}

        {/* Dashboard Financeiro */}
        {activeFluxoFinanceiro === "dashboard" && dadosDashboard && !loading.dashboard && (
          <div className="space-y-6">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Saldo Disponível
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatarValor(dadosDashboard.estatisticasMes?.saldoMes)}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">💰</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Entradas do Mês
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatarValor(dadosDashboard.estatisticasMes?.totalEntradas)}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <span className="text-green-600 text-xl">📥</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Saídas do Mês
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatarValor(dadosDashboard.estatisticasMes?.totalSaidas)}
                    </p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-lg">
                    <span className="text-red-600 text-xl">📤</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Resultado Líquido
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatarValor(
                        (dadosDashboard.estatisticasMes?.totalEntradas || 0) - 
                        (dadosDashboard.estatisticasMes?.totalSaidas || 0)
                      )}
                    </p>
                  </div>
                  <div className="bg-cyan-100 p-3 rounded-lg">
                    <span className="text-cyan-600 text-xl">📈</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Movimentações Recentes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-cyan-50">
                  <h3 className="font-semibold text-gray-900">
                    📊 Últimas Movimentações
                  </h3>
                </div>
                <div className="p-6">
                  {dadosDashboard.movimentacoesRecentes?.length > 0 ? (
                    <div className="space-y-4">
                      {dadosDashboard.movimentacoesRecentes.map((mov, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center space-x-3">
                            <span className={`${
                              mov.tipoMovimentacao === 'entrada' ? 'bg-green-500' : 'bg-red-500'
                            } text-white p-2 rounded-lg`}>
                              {mov.tipoMovimentacao === 'entrada' ? '📥' : '📤'}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 truncate">{mov.descricao}</p>
                              <p className="text-sm text-gray-600">
                                {formatarData(mov.dataMovimentacao)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold ${
                              mov.tipoMovimentacao === 'entrada' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {mov.tipoMovimentacao === 'entrada' ? '+' : '-'}
                              {formatarValor(mov.valor)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">Nenhuma movimentação recente</p>
                  )}
                </div>
              </div>

              {/* Próximas Movimentações */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900">
                    📅 Próximas Movimentações
                  </h3>
                </div>
                <div className="p-6">
                  {dadosDashboard.projecoesFuturas?.length > 0 ? (
                    <div className="space-y-4">
                      {dadosDashboard.projecoesFuturas.slice(0, 4).map((proj, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">
                              {proj.descricao || 'Movimentação agendada'}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatarData(proj.dataMovimentacao)} • {formatarValor(proj.valor)}
                            </p>
                            <p className="text-xs text-blue-600 mt-1">
                              {proj.status === 'agendado' ? 'Agendado' : 'Previsto'}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                            proj.tipoMovimentacao === 'entrada' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {proj.tipoMovimentacao === 'entrada' ? 'Entrada' : 'Saída'}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">Nenhuma movimentação futura agendada</p>
                  )}
                </div>
              </div>
            </div>

            {/* Estatísticas por Categoria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-green-50">
                  <h3 className="font-semibold text-gray-900">
                    📥 Entradas por Categoria
                  </h3>
                </div>
                <div className="p-6">
                  {dadosDashboard.valoresPorCategoria?.filter(cat => cat.tipo === 'entrada').length > 0 ? (
                    <div className="space-y-4">
                      {dadosDashboard.valoresPorCategoria
                        .filter(cat => cat.tipo === 'entrada')
                        .slice(0, 3)
                        .map((categoria, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              {categoria._id || 'Sem categoria'}
                            </span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-green-500 h-2 rounded-full"
                                  style={{ 
                                    width: `${Math.min((categoria.totalValor / (dadosDashboard.estatisticasMes?.totalEntradas || 1)) * 100, 100)}%` 
                                  }}
                                ></div>
                              </div>
                              <span className="font-medium">{formatarValor(categoria.totalValor)}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">Nenhuma entrada por categoria</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-red-50">
                  <h3 className="font-semibold text-gray-900">
                    📤 Saídas por Categoria
                  </h3>
                </div>
                <div className="p-6">
                  {dadosDashboard.valoresPorCategoria?.filter(cat => cat.tipo !== 'entrada').length > 0 ? (
                    <div className="space-y-4">
                      {dadosDashboard.valoresPorCategoria
                        .filter(cat => cat.tipo !== 'entrada')
                        .slice(0, 3)
                        .map((categoria, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              {categoria._id || 'Sem categoria'}
                            </span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-red-500 h-2 rounded-full"
                                  style={{ 
                                    width: `${Math.min((categoria.totalValor / (dadosDashboard.estatisticasMes?.totalSaidas || 1)) * 100, 100)}%` 
                                  }}
                                ></div>
                              </div>
                              <span className="font-medium">{formatarValor(categoria.totalValor)}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">Nenhuma saída por categoria</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fluxo de Caixa Detalhado */}
        {activeFluxoFinanceiro === "fluxo-caixa" && !loading.movimentacoes && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-cyan-50">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">
                    💰 Fluxo de Caixa Detalhado
                  </h3>
                  <span className="text-sm text-gray-600">
                    {movimentacoes.length} movimentações encontradas
                  </span>
                </div>
              </div>
              <div className="p-6">
                {/* Filtros */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Início
                    </label>
                    <input
                      type="date"
                      value={filtros.dataInicio}
                      onChange={(e) => handleFiltroChange('dataInicio', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Fim
                    </label>
                    <input
                      type="date"
                      value={filtros.dataFim}
                      onChange={(e) => handleFiltroChange('dataFim', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo Movimentação
                    </label>
                    <select
                      value={filtros.tipoMovimentacao}
                      onChange={(e) => handleFiltroChange('tipoMovimentacao', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Todos</option>
                      <option value="entrada">Entrada</option>
                      <option value="saida">Saída</option>
                      <option value="transferencia">Transferência</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoria
                    </label>
                    <select
                      value={filtros.categoria}
                      onChange={(e) => handleFiltroChange('categoria', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Todas</option>
                      <option value="receita_transporte">Receita Transporte</option>
                      <option value="receita_servicos">Receita Serviços</option>
                      <option value="despesa_combustivel">Despesa Combustível</option>
                      <option value="despesa_salarios">Despesa Salários</option>
                      <option value="despesa_manutencao">Despesa Manutenção</option>
                    </select>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex space-x-3 mb-6">
                  <button
                    onClick={() => buscarMovimentacoes()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition-colors"
                    disabled={loading.movimentacoes}
                  >
                    {loading.movimentacoes ? (
                      <span className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Carregando...
                      </span>
                    ) : 'Aplicar Filtros'}
                  </button>
                  <button
                    onClick={() => {
                      const hoje = new Date().toISOString().split('T')[0];
                      setFiltros({
                        dataInicio: hoje,
                        dataFim: hoje,
                        tipoMovimentacao: '',
                        categoria: '',
                        contaBanco: ''
                      });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                  >
                    Limpar Filtros
                  </button>
                  <button
                    onClick={() => buscarRelatorio().then(data => {
                      // Aqui você pode implementar a exportação do relatório
                      console.log('Relatório gerado:', data);
                    })}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium transition-colors"
                  >
                    Gerar Relatório
                  </button>
                </div>

                {/* Tabela de Movimentações */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-3">Data</th>
                        <th className="px-4 py-3">Descrição</th>
                        <th className="px-4 py-3">Tipo</th>
                        <th className="px-4 py-3">Categoria</th>
                        <th className="px-4 py-3 text-right">Valor</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {movimentacoes.length > 0 ? (
                        movimentacoes.map((mov) => (
                          <tr key={mov._id || mov.movimentacaoId} className="bg-white border-b hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 whitespace-nowrap">
                              {formatarData(mov.dataMovimentacao)}
                            </td>
                            <td className="px-4 py-3">
                              <div className="max-w-xs">
                                <p className="font-medium text-gray-900 truncate" title={mov.descricao}>
                                  {mov.descricao}
                                </p>
                                {mov.movimentacaoId && (
                                  <p className="text-xs text-gray-500">ID: {mov.movimentacaoId}</p>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                mov.tipoMovimentacao === 'entrada' 
                                  ? 'bg-green-100 text-green-800'
                                  : mov.tipoMovimentacao === 'saida'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {mov.tipoMovimentacao}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="text-gray-700" title={mov.categoria}>
                                {mov.categoriaDetalhada || mov.categoria}
                              </span>
                            </td>
                            <td className={`px-4 py-3 text-right font-semibold whitespace-nowrap ${
                              mov.tipoMovimentacao === 'entrada' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {mov.tipoMovimentacao === 'entrada' ? '+' : '-'}
                              {formatarValor(mov.valor)}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                mov.status === 'conciliado' ? 'bg-green-100 text-green-800' :
                                mov.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
                                mov.status === 'cancelado' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {mov.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => exportarMovimentacao(mov.movimentacaoId)}
                                  className="text-blue-600 hover:text-blue-800 transition-colors"
                                  title="Exportar"
                                >
                                  📥
                                </button>
                                {mov.status === 'confirmado' && !mov.conciliado && (
                                  <button
                                    onClick={() => conciliarMovimentacao(mov.movimentacaoId, {
                                      tipoConciliacao: 'manual',
                                      usuario: localStorage.getItem('username') || 'admin',
                                      observacoes: 'Conciliado via sistema'
                                    })}
                                    className="text-green-600 hover:text-green-800 transition-colors"
                                    title="Conciliar"
                                  >
                                    ✓
                                  </button>
                                )}
                                {mov.status !== 'cancelado' && (
                                  <button
                                    onClick={() => {
                                      const motivo = prompt('Motivo do cancelamento:');
                                      if (motivo) {
                                        cancelarMovimentacao(mov.movimentacaoId, motivo);
                                      }
                                    }}
                                    className="text-red-600 hover:text-red-800 transition-colors"
                                    title="Cancelar"
                                  >
                                    ✗
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                            {loading.movimentacoes ? 'Carregando...' : 'Nenhuma movimentação encontrada com os filtros atuais'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Totais */}
                {movimentacoes.length > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Total Entradas</p>
                        <p className="text-xl font-bold text-green-600">
                          {formatarValor(
                            movimentacoes
                              .filter(m => m.tipoMovimentacao === 'entrada')
                              .reduce((sum, m) => sum + (m.valor || 0), 0)
                          )}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Total Saídas</p>
                        <p className="text-xl font-bold text-red-600">
                          {formatarValor(
                            movimentacoes
                              .filter(m => m.tipoMovimentacao === 'saida')
                              .reduce((sum, m) => sum + (m.valor || 0), 0)
                          )}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Saldo do Período</p>
                        <p className={`text-xl font-bold ${
                          movimentacoes.reduce((sum, m) => 
                            sum + (m.tipoMovimentacao === 'entrada' ? m.valor : -m.valor), 0
                          ) >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formatarValor(
                            movimentacoes.reduce((sum, m) => 
                              sum + (m.tipoMovimentacao === 'entrada' ? m.valor : -m.valor), 0
                            )
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Projeções Financeiras */}
        {activeFluxoFinanceiro === "projecoes" && !loading.projecoes && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Cards de projeções dinâmicos */}
              {projecoes.length > 0 ? (
                projecoes.map((proj, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">
                        {proj.mes ? `Mês ${proj.mes}` : 'Projeção'}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        proj.saldoProjetado >= 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {proj.saldoProjetado >= 0 ? 'Positivo' : 'Negativo'}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Entradas Previstas:</span>
                        <span className="font-medium text-green-600">
                          {formatarValor(proj.totalEntradas)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Saídas Previstas:</span>
                        <span className="font-medium text-red-600">
                          {formatarValor(proj.totalSaidas)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-2">
                        <span className="text-sm font-medium">Resultado:</span>
                        <span className={`font-bold ${
                          proj.saldoProjetado >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {proj.saldoProjetado >= 0 ? '+' : ''}
                          {formatarValor(proj.saldoProjetado)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full">
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
                    <p className="text-gray-500">Nenhuma projeção disponível</p>
                    <button
                      onClick={buscarProjecoes}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Carregar Projeções
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contas Bancárias */}
        {activeFluxoFinanceiro === "bancos" && !loading.saldos && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {saldosContas.length > 0 ? (
                saldosContas.map((conta, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {conta.banco?.substring(0, 2).toUpperCase() || '??'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {conta.banco || 'Conta Bancária'}
                          </p>
                          <p className="text-sm text-gray-600 truncate max-w-[120px]">
                            {conta.numeroConta || 'Número não informado'}
                          </p>
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        Ativa
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Saldo:</span>
                        <span className={`font-bold ${
                          conta.saldo >= 0 ? 'text-gray-900' : 'text-red-600'
                        }`}>
                          {formatarValor(conta.saldo)}
                        </span>
                      </div>
                      {conta.totalEntradas > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Entradas:</span>
                          <span className="font-medium text-green-600">
                            {formatarValor(conta.totalEntradas)}
                          </span>
                        </div>
                      )}
                      {conta.totalSaidas > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Saídas:</span>
                          <span className="font-medium text-red-600">
                            {formatarValor(conta.totalSaidas)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full">
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
                    <p className="text-gray-500">Nenhuma conta bancária encontrada</p>
                    <button
                      onClick={buscarSaldosContas}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Carregar Contas
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Saldo Consolidado */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  🏦 Saldo Consolidado
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {formatarValor(
                        saldosContas.reduce((total, conta) => total + (conta.saldo || 0), 0)
                      )}
                    </p>
                    <p className="text-sm text-gray-600">Saldo Total</p>
                  </div>
                  {saldosContas.slice(0, 3).map((conta, index) => (
                    <div key={index} className="text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        {formatarValor(conta.saldo)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {conta.banco || `Conta ${index + 1}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gráficos Financeiros */}
        {activeFluxoFinanceiro === "graficos" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="text-center py-8">
                <p className="text-gray-500">Gráficos em desenvolvimento...</p>
                <p className="text-sm text-gray-400 mt-2">
                  Esta seção exibirá gráficos interativos do fluxo financeiro
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Relatórios Financeiros */}
        {activeFluxoFinanceiro === "relatorios" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900">
                  📋 Gerar Relatório Personalizado
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Relatório
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Fluxo de Caixa Detalhado</option>
                      <option>Análise por Categoria</option>
                      <option>Projeções Financeiras</option>
                      <option>Saldo por Conta Bancária</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Período Inicial
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      defaultValue={filtros.dataInicio}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Período Final
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      defaultValue={filtros.dataFim}
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={async () => {
                      const relatorio = await buscarRelatorio();
                      if (relatorio) {
                        // Implementar download do relatório
                        alert('Relatório gerado com sucesso!');
                      }
                    }}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                  >
                    Gerar Relatório
                  </button>
                  <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                    Exportar PDF
                  </button>
                  <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                    Exportar Excel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal para Nova Movimentação */}
      <NovaMovimentacaoModal
        isOpen={showNovaMovimentacao}
        onClose={() => setShowNovaMovimentacao(false)}
        onSubmit={criarMovimentacao}
      />
    </div>
  );
};

export default FluxoFinanceiro;