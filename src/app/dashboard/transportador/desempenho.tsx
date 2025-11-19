import { FiDownload, FiTrendingUp, FiTrendingDown, FiPackage, FiCheckCircle } from "react-icons/fi";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useState, useEffect } from "react";

// Registrando os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface MetricsData {
  pontuacaoMedia: number;
  totalViagens: number;
  concluidas: number;
  taxaEntrega: number;
  faturamentoTotal: number;
  cargasEmTransito: number;
}

interface MetricsProps {
  exportarDados: (tipo: string) => void;
}

// Dados padrão para os gráficos
const defaultDesempenhoChartData = {
  labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
  datasets: [
    {
      label: "Pontuação de Desempenho",
      data: [0, 0, 0, 0, 0, 0, 0],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      yAxisID: "y",
      tension: 0.4,
      fill: true,
    },
    {
      label: "Viagens por Dia",
      data: [0, 0, 0, 0, 0, 0, 0],
      borderColor: "rgb(16, 185, 129)",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      yAxisID: "y1",
      tension: 0.4,
      fill: true,
    },
  ],
};

const defaultTiposCargaData = {
  labels: ['Sem dados'],
  datasets: [
    {
      data: [1],
      backgroundColor: ["rgba(156, 163, 175, 0.8)"],
      borderColor: ["rgba(156, 163, 175, 1)"],
      borderWidth: 2,
    },
  ],
};

const defaultFaturamentoChartData = {
  labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
  datasets: [
    {
      label: "Faturamento",
      data: [0, 0, 0, 0, 0, 0, 0],
      backgroundColor: "rgba(34, 197, 94, 0.7)",
      borderColor: "rgb(34, 197, 94)",
      borderWidth: 2,
    },
    {
      label: "Despesas",
      data: [0, 0, 0, 0, 0, 0, 0],
      backgroundColor: "rgba(239, 68, 68, 0.7)",
      borderColor: "rgb(239, 68, 68)",
      borderWidth: 2,
    },
    {
      label: "Lucro Líquido",
      data: [0, 0, 0, 0, 0, 0, 0],
      backgroundColor: "rgba(59, 130, 246, 0.7)",
      borderColor: "rgb(59, 130, 246)",
      borderWidth: 2,
    },
  ],
};

export function MetricsDashboard({ exportarDados }: MetricsProps) {
  const [metrics, setMetrics] = useState<MetricsData>({
    pontuacaoMedia: 0,
    totalViagens: 0,
    concluidas: 0,
    taxaEntrega: 0,
    faturamentoTotal: 0,
    cargasEmTransito: 0
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [desempenhoChartData, setDesempenhoChartData] = useState<any>(defaultDesempenhoChartData);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tiposCargaData, setTiposCargaData] = useState<any>(defaultTiposCargaData);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [faturamentoChartData, setFaturamentoChartData] = useState<any>(defaultFaturamentoChartData);
  const [loading, setLoading] = useState(true);
  const [periodo, setPeriodo] = useState<"semana" | "mes" | "trimestre">("mes");
  const [error, setError] = useState<string | null>(null);

  // Buscar dados das cargas
  useEffect(() => {
    async function fetchMetricsData() {
      try {
        setLoading(true);
        setError(null);

        // Buscar lista de cargas
        const cargasResponse = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/getCargaList", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            curPage: 1,
            pageSize: 1000,
            dataInicio: getDataInicio(periodo),
            dataFim: new Date().toISOString()
          })
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let cargas: any[] = [];

        if (cargasResponse.ok) {
          const cargasData = await cargasResponse.json();
          if (cargasData.returnCode === 200 && cargasData.data?.list) {
            cargas = Array.isArray(cargasData.data.list) ? cargasData.data.list : [];
          }
        }

        // Buscar estatísticas
        try {
          const statsResponse = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/getCargaStats", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              dataInicio: getDataInicio(periodo),
              dataFim: new Date().toISOString()
            })
          });

          if (statsResponse.ok) {
            const statsData = await statsResponse.json();
            if (statsData.returnCode === 200) {
              processarMetrics(cargas, statsData.data);
            } else {
              processarMetrics(cargas);
            }
          } else {
            processarMetrics(cargas);
          }
        } catch (statsError) {
          console.error("Erro ao buscar estatísticas:", statsError);
          processarMetrics(cargas);
        }

        gerarDadosGraficos(cargas);

      } catch (error) {
        console.error("Erro ao buscar métricas:", error);
        setError("Erro ao carregar dados. Verifique a conexão.");
        // Garantir que temos dados padrão mesmo em caso de erro
        setDesempenhoChartData(defaultDesempenhoChartData);
        setTiposCargaData(defaultTiposCargaData);
        setFaturamentoChartData(defaultFaturamentoChartData);
      } finally {
        setLoading(false);
      }
    }

    fetchMetricsData();
  }, [periodo]);

  const getDataInicio = (periodo: string) => {
    const data = new Date();
    switch (periodo) {
      case "semana":
        data.setDate(data.getDate() - 7);
        break;
      case "mes":
        data.setMonth(data.getMonth() - 1);
        break;
      case "trimestre":
        data.setMonth(data.getMonth() - 3);
        break;
      default:
        data.setMonth(data.getMonth() - 1);
    }
    return data.toISOString();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processarMetrics = (cargas: any[], stats?: any) => {
    const totalCargas = Array.isArray(cargas) ? cargas.length : 0;
    const cargasConcluidas = Array.isArray(cargas) ? 
      cargas.filter(carga => 
        carga?.status === "entregue" || carga?.status === "encerrada"
      ).length : 0;
    
    const cargasEmTransito = Array.isArray(cargas) ? 
      cargas.filter(carga => 
        carga?.status === "em_transito" || carga?.status === "em_entrega"
      ).length : 0;

    const faturamentoTotal = Array.isArray(cargas) ? 
      cargas.reduce((total, carga) => 
        total + (carga?.valorTotal || carga?.valorFrete || 0), 0
      ) : 0;

    // Calcular pontuação média baseada em vários fatores
    const pontuacaoMedia = Array.isArray(cargas) ? calcularPontuacaoMedia(cargas) : 0;

    // Usar stats se disponível, senão usar cálculos próprios
    const statsConcluidas = stats?.cargasEntregues || cargasConcluidas;
    const statsTotal = stats?.totalCargas || totalCargas;

    setMetrics({
      pontuacaoMedia,
      totalViagens: totalCargas,
      concluidas: statsConcluidas,
      taxaEntrega: statsTotal > 0 ? (statsConcluidas / statsTotal) * 100 : 0,
      faturamentoTotal,
      cargasEmTransito
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calcularPontuacaoMedia = (cargas: any[]): number => {
    if (!Array.isArray(cargas) || cargas.length === 0) return 0;

    const pontuacoes = cargas.map(carga => {
      if (!carga) return 70;

      let pontuacao = 70; // Base

      // Bônus por status de entrega
      if (carga.status === "entregue") pontuacao += 20;
      if (carga.status === "em_transito") pontuacao += 10;

      // Bônus por prioridade
      if (carga.prioridade === "urgente") pontuacao += 5;
      if (carga.prioridade === "alta") pontuacao += 3;

      // Penalidade por atraso
      if (carga.dataEntregaPrevista && new Date(carga.dataEntregaPrevista) < new Date()) {
        pontuacao -= 15;
      }

      // Bônus por valor alto
      if ((carga.valorTotal || 0) > 50000) pontuacao += 5;

      return Math.min(100, Math.max(0, pontuacao));
    });

    return pontuacoes.reduce((a, b) => a + b, 0) / pontuacoes.length;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gerarDadosGraficos = (cargas: any[]) => {
    if (!Array.isArray(cargas)) {
      // Manter dados padrão se não houver cargas
      setDesempenhoChartData(defaultDesempenhoChartData);
      setTiposCargaData(defaultTiposCargaData);
      setFaturamentoChartData(defaultFaturamentoChartData);
      return;
    }

    try {
      // Dados para gráfico de desempenho
      const periodos = gerarPeriodosDesempenho();
      const desempenhoData = gerarDadosDesempenho(cargas, periodos);
      setDesempenhoChartData(desempenhoData);

      // Dados para gráfico de tipos de carga
      const tiposCargaData = gerarDadosTiposCarga(cargas);
      setTiposCargaData(tiposCargaData);

      // Dados para gráfico de faturamento
      const faturamentoData = gerarDadosFaturamento(cargas, periodos);
      setFaturamentoChartData(faturamentoData);
    } catch (error) {
      console.error("Erro ao gerar gráficos:", error);
      // Em caso de erro, usar dados padrão
      setDesempenhoChartData(defaultDesempenhoChartData);
      setTiposCargaData(defaultTiposCargaData);
      setFaturamentoChartData(defaultFaturamentoChartData);
    }
  };

  const gerarPeriodosDesempenho = (): string[] => {
    const periodos: string[] = [];
    const hoje = new Date();

    for (let i = 6; i >= 0; i--) {
      const data = new Date(hoje);
      data.setDate(hoje.getDate() - i);
      periodos.push(data.toLocaleDateString('pt-MZ', { month: 'short', day: 'numeric' }));
    }

    return periodos;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gerarDadosDesempenho = (cargas: any[], periodos: string[]) => {
    const pontuacoes: number[] = [];
    const viagensPorDia: number[] = [];

    periodos.forEach((_, index) => {
      const dataAlvo = new Date();
      dataAlvo.setDate(dataAlvo.getDate() - (6 - index));

      const cargasDoDia = cargas.filter(carga => {
        if (!carga?.dataCriacao) return false;
        const dataCarga = new Date(carga.dataCriacao);
        return dataCarga.toDateString() === dataAlvo.toDateString();
      });

      viagensPorDia.push(cargasDoDia.length);

      if (cargasDoDia.length > 0) {
        const pontuacaoDia = calcularPontuacaoMedia(cargasDoDia);
        pontuacoes.push(pontuacaoDia);
      } else {
        pontuacoes.push(0);
      }
    });

    return {
      labels: periodos,
      datasets: [
        {
          label: "Pontuação de Desempenho",
          data: pontuacoes,
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          yAxisID: "y",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Viagens por Dia",
          data: viagensPorDia,
          borderColor: "rgb(16, 185, 129)",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          yAxisID: "y1",
          tension: 0.4,
          fill: true,
        },
      ],
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gerarDadosTiposCarga = (cargas: any[]) => {
    const tiposCount: { [key: string]: number } = {};

    cargas.forEach(carga => {
      if (!carga) return;
      const tipo = carga.tipoCarga || "Outros";
      tiposCount[tipo] = (tiposCount[tipo] || 0) + 1;
    });

    const tiposArray = Object.keys(tiposCount);
    const valoresArray = Object.values(tiposCount);

    if (tiposArray.length === 0) {
      return defaultTiposCargaData;
    }

    const cores = [
      "rgba(59, 130, 246, 0.8)",
      "rgba(16, 185, 129, 0.8)",
      "rgba(245, 158, 11, 0.8)",
      "rgba(139, 92, 246, 0.8)",
      "rgba(239, 68, 68, 0.8)",
      "rgba(236, 72, 153, 0.8)",
      "rgba(8, 145, 178, 0.8)",
    ];

    return {
      labels: tiposArray,
      datasets: [
        {
          data: valoresArray,
          backgroundColor: cores.slice(0, tiposArray.length),
          borderColor: cores.slice(0, tiposArray.length).map(cor => cor.replace('0.8', '1')),
          borderWidth: 2,
        },
      ],
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gerarDadosFaturamento = (cargas: any[], periodos: string[]) => {
    const faturamento: number[] = [];
    const despesas: number[] = [];
    const lucro: number[] = [];

    periodos.forEach((_, index) => {
      const dataAlvo = new Date();
      dataAlvo.setDate(dataAlvo.getDate() - (6 - index));

      const cargasDoDia = cargas.filter(carga => {
        if (!carga?.dataCriacao) return false;
        const dataCarga = new Date(carga.dataCriacao);
        return dataCarga.toDateString() === dataAlvo.toDateString();
      });

      const faturamentoDia = cargasDoDia.reduce((total, carga) => 
        total + (carga?.valorTotal || carga?.valorFrete || 0), 0
      );

      const despesasDia = cargasDoDia.reduce((total, carga) => 
        total + (carga?.custoCarga || (carga?.valorTotal || 0) * 0.6), 0
      );

      faturamento.push(faturamentoDia);
      despesas.push(despesasDia);
      lucro.push(faturamentoDia - despesasDia);
    });

    return {
      labels: periodos,
      datasets: [
        {
          label: "Faturamento",
          data: faturamento,
          backgroundColor: "rgba(34, 197, 94, 0.7)",
          borderColor: "rgb(34, 197, 94)",
          borderWidth: 2,
        },
        {
          label: "Despesas",
          data: despesas,
          backgroundColor: "rgba(239, 68, 68, 0.7)",
          borderColor: "rgb(239, 68, 68)",
          borderWidth: 2,
        },
        {
          label: "Lucro Líquido",
          data: lucro,
          backgroundColor: "rgba(59, 130, 246, 0.7)",
          borderColor: "rgb(59, 130, 246)",
          borderWidth: 2,
        },
      ],
    };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com seletor de período */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard de Métricas
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Análise completa do desempenho das operações
          </p>
        </div>
        <select 
          value={periodo}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e) => setPeriodo(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="semana">Última Semana</option>
          <option value="mes">Último Mês</option>
          <option value="trimestre">Último Trimestre</option>
        </select>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="text-red-700 dark:text-red-300 text-sm">{error}</div>
        </div>
      )}

      {/* Métricas de Desempenho */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 shadow-sm border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">{metrics.pontuacaoMedia.toFixed(1)}</div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Pontuação Média</div>
            </div>
            <FiTrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 shadow-sm border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{metrics.totalViagens}</div>
              <div className="text-sm text-green-600 dark:text-green-400">Total de Cargas</div>
            </div>
            <FiPackage className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 shadow-sm border border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">{metrics.concluidas}</div>
              <div className="text-sm text-purple-600 dark:text-purple-400">Cargas Entregues</div>
            </div>
            <FiCheckCircle className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-6 shadow-sm border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-600">{metrics.taxaEntrega.toFixed(1)}%</div>
              <div className="text-sm text-yellow-600 dark:text-yellow-400">Taxa de Entrega</div>
            </div>
            <FiTrendingUp className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-xl p-6 shadow-sm border border-indigo-200 dark:border-indigo-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-indigo-600">{(metrics.faturamentoTotal / 1000).toFixed(0)}K</div>
              <div className="text-sm text-indigo-600 dark:text-indigo-400">Faturamento (MZN)</div>
            </div>
            <FiTrendingUp className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-6 shadow-sm border border-red-200 dark:border-red-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-red-600">{metrics.cargasEmTransito}</div>
              <div className="text-sm text-red-600 dark:text-red-400">Em Trânsito</div>
            </div>
            <FiTrendingDown className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Evolução do Desempenho */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Evolução do Desempenho
            </h3>
            <button 
              onClick={() => exportarDados('desempenho')}
              className="flex items-center space-x-2 px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FiDownload className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>
          <div className="h-80">
            <Line
              data={desempenhoChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                  mode: 'index',
                  intersect: false,
                },
                scales: {
                  y: {
                    type: "linear",
                    display: true,
                    position: "left",
                    min: 0,
                    max: 100,
                    title: {
                      display: true,
                      text: "Pontuação",
                    },
                    grid: {
                      color: "rgba(156, 163, 175, 0.2)",
                    },
                  },
                  y1: {
                    type: "linear",
                    display: true,
                    position: "right",
                    title: {
                      display: true,
                      text: "Viagens",
                    },
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                  x: {
                    grid: {
                      color: "rgba(156, 163, 175, 0.2)",
                    },
                  },
                },
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Gráfico de Tipos de Carga */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Distribuição por Tipo de Carga
            </h3>
            <button 
              onClick={() => exportarDados('cargas')}
              className="flex items-center space-x-2 px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FiDownload className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>
          <div className="h-80">
            <Doughnut
              data={tiposCargaData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      usePointStyle: true,
                      padding: 20,
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        const label = context.label || '';
                        const value = context.parsed;
                        const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                        const percentage = Math.round((value / total) * 100);
                        return `${label}: ${value} (${percentage}%)`;
                      }
                    }
                  },
                },
                cutout: '50%',
              }}
            />
          </div>
        </div>
      </div>

      {/* Gráfico de Faturamento vs Despesas */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Análise Financeira - Faturamento vs Despesas
          </h3>
          <button 
            onClick={() => exportarDados('faturamento')}
            className="flex items-center space-x-2 px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FiDownload className="w-4 h-4" />
            <span>Exportar</span>
          </button>
        </div>
        <div className="h-80">
          <Bar
            data={faturamentoChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                mode: 'index',
                intersect: false,
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: "rgba(156, 163, 175, 0.2)",
                  },
                  ticks: {
                    callback: function (value: string | number) {
                      const num = typeof value === "string" ? parseFloat(value) : value;
                      if (num >= 1000000) {
                        return `${(num / 1000000).toFixed(1)}M MZN`;
                      }
                      return `${(num / 1000).toFixed(0)}K MZN`;
                    },
                  },
                },
                x: {
                  grid: {
                    color: "rgba(156, 163, 175, 0.2)",
                  },
                },
              },
              plugins: {
                legend: {
                  position: 'top',
                },
                tooltip: {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  callbacks: {
                    label: function(context) {
                      let label = context.dataset.label || '';
                      if (label) {
                        label += ': ';
                      }
                      if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat('pt-MZ', {
                          style: 'currency',
                          currency: 'MZN'
                        }).format(context.parsed.y);
                      }
                      return label;
                    }
                  }
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}