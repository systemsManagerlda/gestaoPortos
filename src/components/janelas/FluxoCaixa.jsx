import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiDollarSign, 
  FiFilter,
  FiRefreshCw,
  FiCalendar,
  FiPlus,
  FiChevronRight
} from 'react-icons/fi';
import { 
  MdAttachMoney, 
  MdOutlineAccountBalance,
  MdOutlinePayment
} from 'react-icons/md';

// Constantes e configurações
const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

// Tipos para melhor type safety (em TypeScript seria interface)
const TIPO_MOVIMENTACAO = {
  ENTRADA: 'entrada',
  SAIDA: 'saida',
  TRANSFERENCIA: 'transferencia'
};

// Componente de Loading
const LoadingSpinner = ({ message = "Carregando..." }) => (
  <div className="flex flex-col items-center justify-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
    <p className="text-gray-600">{message}</p>
  </div>
);

// Componente de Card de Resumo
const ResumoCard = ({ titulo, valor, icone, cor, subtitulo, tendencia }) => {
  const Icone = icone;
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm p-6 transition-transform hover:scale-[1.02]`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{titulo}</p>
          <p className={`text-2xl font-bold ${cor.text}`}>
            {valor}
          </p>
          {subtitulo && (
            <p className="text-xs text-gray-500 mt-2">{subtitulo}</p>
          )}
        </div>
        <div className={`${cor.bg} p-3 rounded-lg`}>
          <Icone className={`text-xl ${cor.icon}`} />
        </div>
      </div>
      {tendencia && (
        <div className="mt-4 flex items-center text-sm">
          <span className={`mr-1 ${tendencia.positiva ? 'text-green-500' : 'text-red-500'}`}>
            {tendencia.positiva ? '↗' : '↘'}
          </span>
          <span className={tendencia.positiva ? 'text-green-600' : 'text-red-600'}>
            {tendencia.valor}
          </span>
          <span className="text-gray-500 ml-1">vs período anterior</span>
        </div>
      )}
    </div>
  );
};

// Componente de Movimentação
const MovimentacaoItem = ({ movimentacao }) => {
  const isEntrada = movimentacao.tipoMovimentacao === TIPO_MOVIMENTACAO.ENTRADA;
  
  const getIcone = () => {
    switch(movimentacao.tipoMovimentacao) {
      case TIPO_MOVIMENTACAO.ENTRADA: return <FiTrendingUp className="text-green-500" />;
      case TIPO_MOVIMENTACAO.SAIDA: return <FiTrendingDown className="text-red-500" />;
      case TIPO_MOVIMENTACAO.TRANSFERENCIA: return <FiRefreshCw className="text-blue-500" />;
      default: return <MdAttachMoney className="text-gray-500" />;
    }
  };

  const formatarDataDetalhada = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-MZ', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md ${
      isEntrada ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'
    }`}>
      <div className="flex items-center space-x-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isEntrada ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {getIcone()}
        </div>
        <div>
          <p className="font-medium text-gray-900">{movimentacao.descricao}</p>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <span>{movimentacao.categoria || 'Sem categoria'}</span>
            <span>•</span>
            <span>{movimentacao.formaPagamento?.tipo || 'Não informado'}</span>
            <span>•</span>
            <span>{formatarDataDetalhada(movimentacao.dataMovimentacao)}</span>
          </div>
          {movimentacao.observacoes && (
            <p className="text-xs text-gray-500 mt-1">{movimentacao.observacoes}</p>
          )}
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold text-lg ${isEntrada ? 'text-green-600' : 'text-red-600'}`}>
          {isEntrada ? '+' : '-'} {formatarValor(movimentacao.valor)}
        </p>
        <p className="text-xs text-gray-500">
          ID: {movimentacao.movimentacaoId?.substring(0, 8) || 'N/A'}
        </p>
      </div>
    </div>
  );
};

// Componente de Filtros
const Filtros = ({ filtros, setFiltros, onAplicarFiltros, loading }) => {
  const [filtrosLocais, setFiltrosLocais] = useState(filtros);

  const handleChange = (campo, valor) => {
    setFiltrosLocais(prev => ({ ...prev, [campo]: valor }));
  };

  const handleAplicar = () => {
    setFiltros(filtrosLocais);
    onAplicarFiltros();
  };

  const handleLimpar = () => {
    const limpos = {
      dataInicio: new Date().toISOString().split('T')[0],
      dataFim: new Date().toISOString().split('T')[0],
      tipoMovimentacao: '',
      categoria: '',
      contaBanco: ''
    };
    setFiltrosLocais(limpos);
    setFiltros(limpos);
    onAplicarFiltros();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-900 flex items-center">
          <FiFilter className="mr-2" />
          Filtros Avançados
        </h4>
        <button
          onClick={handleLimpar}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Limpar filtros
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FiCalendar className="inline mr-1" />
            Data Inicial
          </label>
          <input
            type="date"
            value={filtrosLocais.dataInicio}
            onChange={(e) => handleChange('dataInicio', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            max={filtrosLocais.dataFim}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FiCalendar className="inline mr-1" />
            Data Final
          </label>
          <input
            type="date"
            value={filtrosLocais.dataFim}
            onChange={(e) => handleChange('dataFim', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min={filtrosLocais.dataInicio}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Movimentação
          </label>
          <select
            value={filtrosLocais.tipoMovimentacao}
            onChange={(e) => handleChange('tipoMovimentacao', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos</option>
            <option value="entrada">Entradas</option>
            <option value="saida">Saídas</option>
            <option value="transferencia">Transferências</option>
          </select>
        </div>
        
        <div className="flex items-end space-x-2">
          <button
            onClick={handleAplicar}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Aplicando...
              </>
            ) : (
              <>
                <FiFilter className="mr-2" />
                Aplicar Filtros
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const formatarValor = (valor) => {
  return new Intl.NumberFormat('pt-MZ', {
    style: 'currency',
    currency: 'MZN',
    minimumFractionDigits: 2
  }).format(valor || 0);
};

// Componente Principal
const FluxoCaixa = () => {
  const [activeFluxoCaixa, setActiveFluxoCaixa] = useState("diario");
  const [dashboardData, setDashboardData] = useState(null);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [filtros, setFiltros] = useState({
    dataInicio: new Date().toISOString().split('T')[0],
    dataFim: new Date().toISOString().split('T')[0],
    tipoMovimentacao: '',
    categoria: '',
    contaBanco: ''
  });
  const [loading, setLoading] = useState({
    dashboard: false,
    movimentacoes: false,
    geral: false
  });
  const [erro, setErro] = useState(null);
  const [statistics, setStatistics] = useState({
    totalEntradas: 0,
    totalSaidas: 0,
    saldoLiquido: 0,
    totalMovimentacoes: 0
  });

  // Memoized calculations
  const estatisticasCalculadas = useMemo(() => {
    const entradas = movimentacoes.filter(m => m.tipoMovimentacao === TIPO_MOVIMENTACAO.ENTRADA);
    const saidas = movimentacoes.filter(m => m.tipoMovimentacao === TIPO_MOVIMENTACAO.SAIDA);
    
    const totalEntradas = entradas.reduce((sum, m) => sum + (m.valor || 0), 0);
    const totalSaidas = saidas.reduce((sum, m) => sum + (m.valor || 0), 0);
    
    return {
      totalEntradas,
      totalSaidas,
      saldoLiquido: totalEntradas - totalSaidas,
      totalMovimentacoes: movimentacoes.length,
      entradasCount: entradas.length,
      saidasCount: saidas.length
    };
  }, [movimentacoes]);

  // Carregar dados do dashboard
  const carregarDashboard = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, dashboard: true }));
      setErro(null);
      
      const response = await axios.post(`${API_BASE_URL}/getDashboardFluxoFinanceiro`, {});
      
      if (response.data.returnCode === 200) {
        setDashboardData(response.data.data);
      } else {
        throw new Error(response.data.message || 'Erro ao carregar dashboard');
      }
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
      setErro('Não foi possível carregar os dados do dashboard');
    } finally {
      setLoading(prev => ({ ...prev, dashboard: false }));
    }
  }, []);

  // Carregar movimentações por período
  const carregarMovimentacoesPeriodo = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, movimentacoes: true }));
      setErro(null);
      
      const payload = {
        dataInicio: filtros.dataInicio,
        dataFim: filtros.dataFim,
        ...(filtros.tipoMovimentacao && { tipoMovimentacao: filtros.tipoMovimentacao }),
        ...(filtros.contaBanco && { contaBanco: filtros.contaBanco }),
        ...(filtros.categoria && { categoria: filtros.categoria })
      };

      const response = await axios.post(`${API_BASE_URL}/buscarMovimentacoesPeriodo`, payload);
      
      if (response.data.returnCode === 200) {
        setMovimentacoes(response.data.data.movimentacoes || []);
      } else {
        throw new Error(response.data.message || 'Erro ao carregar movimentações');
      }
    } catch (error) {
      console.error('Erro ao carregar movimentações:', error);
      setErro('Não foi possível carregar as movimentações');
    } finally {
      setLoading(prev => ({ ...prev, movimentacoes: false }));
    }
  }, [filtros]);

  // Carregar dados iniciais
  useEffect(() => {
    if (activeFluxoCaixa === 'diario') {
      const carregarDados = async () => {
        setLoading(prev => ({ ...prev, geral: true }));
        await Promise.all([carregarDashboard(), carregarMovimentacoesPeriodo()]);
        setLoading(prev => ({ ...prev, geral: false }));
      };
      carregarDados();
    }
  }, [activeFluxoCaixa, carregarDashboard, carregarMovimentacoesPeriodo]);

  // Atualizar estatísticas quando movimentações mudam
  useEffect(() => {
    setStatistics(estatisticasCalculadas);
  }, [estatisticasCalculadas]);

  // Função para recarregar todos os dados
  const recarregarDados = useCallback(async () => {
    setErro(null);
    await Promise.all([carregarDashboard(), carregarMovimentacoesPeriodo()]);
  }, [carregarDashboard, carregarMovimentacoesPeriodo]);

  // Renderizar cartões de resumo com dados melhorados
  const renderResumoCartoes = () => {
    const estatisticas = dashboardData?.estatisticasMes || {};
    const saldoAtual = estatisticas.saldoMes || 0;

    const cartoes = [
      {
        titulo: "Saldo Atual",
        valor: formatarValor(saldoAtual),
        icone: MdOutlineAccountBalance,
        cor: {
          bg: 'bg-blue-100',
          icon: 'text-blue-600',
          text: 'text-blue-900'
        },
        subtitulo: "Disponível total",
        tendencia: saldoAtual >= 0 ? {
          positiva: true,
          valor: '+5.2%'
        } : null
      },
      {
        titulo: "Entradas Hoje",
        valor: formatarValor(estatisticas.totalEntradas || 0),
        icone: FiTrendingUp,
        cor: {
          bg: 'bg-green-100',
          icon: 'text-green-600',
          text: 'text-green-900'
        },
        subtitulo: `${estatisticas.totalMovimentacoes || 0} movimentações`
      },
      {
        titulo: "Saídas Hoje",
        valor: formatarValor(estatisticas.totalSaidas || 0),
        icone: FiTrendingDown,
        cor: {
          bg: 'bg-red-100',
          icon: 'text-red-600',
          text: 'text-red-900'
        },
        subtitulo: `${estatisticas.totalMovimentacoes || 0} movimentações`
      },
      {
        titulo: "Saldo Líquido",
        valor: formatarValor(statistics.saldoLiquido),
        icone: FiDollarSign,
        cor: {
          bg: statistics.saldoLiquido >= 0 ? 'bg-green-100' : 'bg-red-100',
          icon: statistics.saldoLiquido >= 0 ? 'text-green-600' : 'text-red-600',
          text: statistics.saldoLiquido >= 0 ? 'text-green-900' : 'text-red-900'
        },
        subtitulo: "Período selecionado"
      }
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cartoes.map((cartao, index) => (
          <ResumoCard key={index} {...cartao} />
        ))}
      </div>
    );
  };

  // Renderizar movimentações agrupadas por dia
  const renderMovimentacoesAgrupadas = () => {
    if (movimentacoes.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <MdOutlinePayment className="text-4xl mx-auto" />
          </div>
          <p className="text-gray-500">Nenhuma movimentação encontrada</p>
          <p className="text-sm text-gray-400 mt-2">Tente ajustar os filtros ou datas</p>
        </div>
      );
    }

    // Agrupar movimentações por data
    const movimentacoesPorData = movimentacoes.reduce((grupos, mov) => {
      const data = mov.dataMovimentacao.split('T')[0];
      if (!grupos[data]) grupos[data] = [];
      grupos[data].push(mov);
      return grupos;
    }, {});

    return Object.entries(movimentacoesPorData)
      .sort(([dataA], [dataB]) => new Date(dataB) - new Date(dataA))
      .map(([data, movs]) => (
        <div key={data} className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900">
              {new Date(data).toLocaleDateString('pt-MZ', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </h4>
            <span className="text-sm text-gray-500">
              {movs.length} {movs.length === 1 ? 'movimentação' : 'movimentações'}
            </span>
          </div>
          <div className="space-y-3">
            {movs.map((mov, index) => (
              <MovimentacaoItem key={`${data}-${index}`} movimentacao={mov} />
            ))}
          </div>
        </div>
      ));
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-lg mr-3">
                <MdAttachMoney className="text-xl" />
              </span>
              Fluxo de Caixa
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Controle financeiro detalhado • {new Date().toLocaleDateString('pt-MZ')}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={recarregarDados}
              disabled={loading.geral}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 flex items-center"
            >
              <FiRefreshCw className={`mr-2 ${loading.geral ? 'animate-spin' : ''}`} />
              Atualizar
            </button>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveFluxoCaixa("diario")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeFluxoCaixa === "diario"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FiCalendar className="inline mr-2" />
                Diário
              </button>
              {/* Adicione mais botões de período aqui se necessário */}
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 overflow-auto p-6">
        {erro && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center">
              <div className="text-red-500 mr-3">
                <FiTrendingDown className="text-xl" />
              </div>
              <div>
                <p className="font-medium text-red-800">{erro}</p>
                <button
                  onClick={recarregarDados}
                  className="text-sm text-red-600 hover:text-red-800 mt-1"
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          </div>
        )}

        {loading.geral ? (
          <LoadingSpinner message="Carregando dados financeiros..." />
        ) : (
          <div className="space-y-6">
            {/* Filtros */}
            <Filtros
              filtros={filtros}
              setFiltros={setFiltros}
              onAplicarFiltros={carregarMovimentacoesPeriodo}
              loading={loading.movimentacoes}
            />

            {/* Cartões de Resumo */}
            {renderResumoCartoes()}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Lista de Movimentações */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <FiChevronRight className="mr-2 text-blue-500" />
                      Movimentações do Período
                      <span className="ml-2 text-sm text-gray-500">
                        ({movimentacoes.length})
                      </span>
                    </h3>
                    <span className="text-sm text-gray-500">
                      {filtros.dataInicio} à {filtros.dataFim}
                    </span>
                  </div>
                  <div className="p-4 max-h-[600px] overflow-y-auto">
                    {loading.movimentacoes ? (
                      <LoadingSpinner message="Carregando movimentações..." />
                    ) : (
                      renderMovimentacoesAgrupadas()
                    )}
                  </div>
                </div>
              </div>

              {/* Painel de Estatísticas */}
              <div className="space-y-6">
                {/* Resumo Financeiro */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <FiTrendingUp className="mr-2" />
                    Resumo Financeiro
                  </h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-blue-800">Saldo Líquido</span>
                        <span className="text-lg font-bold text-blue-900">
                          {formatarValor(statistics.saldoLiquido)}
                        </span>
                      </div>
                      <div className="mt-2 h-2 bg-blue-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${Math.min(100, Math.max(0, (statistics.saldoLiquido / (statistics.totalEntradas || 1)) * 100))}%` 
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-600">Entradas</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{formatarValor(statistics.totalEntradas)}</p>
                          <p className="text-xs text-gray-500">{statistics.entradasCount} registros</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-600">Saídas</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{formatarValor(statistics.totalSaidas)}</p>
                          <p className="text-xs text-gray-500">{statistics.saidasCount} registros</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">Total Movimentações</span>
                          <span className="font-bold text-gray-900">{statistics.totalMovimentacoes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insights Rápidos */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">📊 Insights</h4>
                  <div className="space-y-3">
                    {statistics.totalEntradas > statistics.totalSaidas ? (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm font-medium text-green-800">✅ Saldo Positivo</p>
                        <p className="text-xs text-green-600 mt-1">
                          Suas entradas estão maiores que as saídas
                        </p>
                      </div>
                    ) : (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm font-medium text-yellow-800">⚠️ Atenção</p>
                        <p className="text-xs text-yellow-600 mt-1">
                          Suas saídas estão maiores que as entradas
                        </p>
                      </div>
                    )}
                    
                    {movimentacoes.length > 0 && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">📈 Média Diária</p>
                        <p className="text-xs text-blue-600 mt-1">
                          {formatarValor(statistics.totalEntradas / 30)} por mês (projetado)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FluxoCaixa;