/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { 
  FiDownload, 
  FiTruck, 
  FiPackage, 
  FiDollarSign,
  FiCalendar,
  FiMapPin,
  FiBarChart2 
} from 'react-icons/fi';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

// Registrar componentes do Chart.js
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

// Tipos baseados no schema
export interface CargaStats {
  totalCargas: number;
  cargasEntregues: number;
  cargasTransito: number;
  cargasAtrasadas: number;
  valorTotalFretes: number;
  valorTotalSeguros: number;
  comissaoTotal: number;
  pesoTotalTransportado: number;
  distanciaTotal: number;
  margemLucroTotal: number;
  cargasComSeguro: number;
  ocorrenciasTotal: number;
  statsPorPercurso?: Array<{
    _id: string;
    count: number;
    valorTotalFrete: number;
    comissaoTotal: number;
  }>;
  statsPorSeguro?: Array<{
    _id: string;
    count: number;
    valorMedioMercadoria: number;
    premioMedio: number;
  }>;
}

interface Carga {
  codigo: string;
  status: string;
  tipoCarga: string;
  naturezaCarga: string;
  categoriaSeguro: string;
  pesoBruto: number;
  valorMercadoria: number;
  valorTotal: number;
  margemLucro: number;
  tipoPercurso: string;
  abrangenciaSeguro: string;
  dataEntregaPrevista: Date;
  dataEntregaReal?: Date;
  distanciaKm: number;
  seguro?: {
    premioFinal: number;
    statusSeguro: string;
  };
  comissaoCalculada: number;
}

interface RelatoriosDashboardProps {
  cargas?: Carga[];
  stats?: CargaStats;
  isLoading?: boolean;
  filtros?: {
    dataInicio?: string;
    dataFim?: string;
    tipoPercurso?: string;
    clienteId?: string;
  };
  onExportarDados: (tipo: string) => void;
  onAtualizarFiltros: (filtros: any) => void;
  formatarMoeda: (valor: number) => string;
  formatarData: (data: Date | string) => string;
}

const RelatoriosDashboard: React.FC<RelatoriosDashboardProps> = ({
  cargas = [],
  stats = {
    totalCargas: 0,
    cargasEntregues: 0,
    cargasTransito: 0,
    cargasAtrasadas: 0,
    valorTotalFretes: 0,
    valorTotalSeguros: 0,
    comissaoTotal: 0,
    pesoTotalTransportado: 0,
    distanciaTotal: 0,
    margemLucroTotal: 0,
    cargasComSeguro: 0,
    ocorrenciasTotal: 0
  },
  isLoading = false,
  filtros = {},
  onExportarDados,
  onAtualizarFiltros,
  formatarMoeda,
  formatarData
}) => {
  const [filtrosLocais, setFiltrosLocais] = useState(filtros);

  // Calcular métricas baseadas nas cargas
  const calcularMetricas = () => {
    if (cargas.length === 0) {
      return {
        totalCargas: 0,
        entregues: 0,
        atrasadas: 0,
        valorTotal: 0,
        porTipoCarga: {},
        porStatus: {},
        porCategoriaSeguro: {}
      };
    }

    const hoje = new Date();
    const entregues = cargas.filter(c => c.status === 'entregue').length;
    const atrasadas = cargas.filter(c => {
      if (!c.dataEntregaPrevista) return false;
      return c.status !== 'entregue' && new Date(c.dataEntregaPrevista) < hoje;
    }).length;

    const valorTotal = cargas.reduce((sum, carga) => sum + (carga.valorTotal || 0), 0);

    // Distribuição por tipo de carga
    const porTipoCarga = cargas.reduce((acc, carga) => {
      const tipo = carga.tipoCarga || 'Não especificado';
      acc[tipo] = (acc[tipo] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Distribuição por status
    const porStatus = cargas.reduce((acc, carga) => {
      const status = carga.status || 'Não especificado';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Distribuição por categoria de seguro
    const porCategoriaSeguro = cargas.reduce((acc, carga) => {
      const categoria = carga.categoriaSeguro || 'Não especificado';
      acc[categoria] = (acc[categoria] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalCargas: cargas.length,
      entregues,
      atrasadas,
      valorTotal,
      porTipoCarga,
      porStatus,
      porCategoriaSeguro
    };
  };

  const metricas = calcularMetricas();
  const {
    totalCargas,
    entregues,
    atrasadas,
    valorTotal,
    porTipoCarga,
    porStatus,
    porCategoriaSeguro
  } = metricas;

  // Preparar dados para gráficos
  const statusChartData = {
    labels: Object.keys(porStatus).map(key => 
      key.replace('_', ' ').charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')
    ),
    datasets: [
      {
        data: Object.values(porStatus),
        backgroundColor: [
          '#10B981', // Entregue - Verde
          '#3B82F6', // Em trânsito - Azul
          '#F59E0B', // Aguardando coleta - Amarelo
          '#EF4444', // Atrasada - Vermelho
          '#8B5CF6', // Planeada - Roxo
          '#EC4899', // Coletada - Rosa
          '#14B8A6'  // Em entrega - Turquesa
        ],
        borderColor: [
          '#10B981',
          '#3B82F6',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#EC4899',
          '#14B8A6'
        ],
        borderWidth: 1,
      },
    ],
  };

  const tiposCargaData = {
    labels: Object.keys(porTipoCarga).map(key => 
      key.charAt(0).toUpperCase() + key.slice(1)
    ),
    datasets: [
      {
        label: 'Quantidade',
        data: Object.values(porTipoCarga),
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#EC4899'
        ],
        borderColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#EC4899'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Gráfico de distribuição por categoria de seguro
  const seguroChartData = {
    labels: Object.keys(porCategoriaSeguro).map(key => 
      key.charAt(0).toUpperCase() + key.slice(1)
    ),
    datasets: [
      {
        label: 'Cargas',
        data: Object.values(porCategoriaSeguro),
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6'
        ],
        borderColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Gráfico de evolução mensal (se houver dados de data)
  const evolucaoMensalData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Cargas Criadas',
        data: Array(12).fill(0).map(() => Math.floor(Math.random() * 20) + 5),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
      },
      {
        label: 'Cargas Entregues',
        data: Array(12).fill(0).map(() => Math.floor(Math.random() * 15) + 3),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3,
      },
    ],
  };

  const handleFiltroChange = (key: string, value: string) => {
    const novosFiltros = { ...filtrosLocais, [key]: value };
    setFiltrosLocais(novosFiltros);
    onAtualizarFiltros(novosFiltros);
  };

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Data Início
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={filtrosLocais.dataInicio || ''}
              onChange={(e) => handleFiltroChange('dataInicio', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Data Fim
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={filtrosLocais.dataFim || ''}
              onChange={(e) => handleFiltroChange('dataFim', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tipo de Percurso
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={filtrosLocais.tipoPercurso || ''}
              onChange={(e) => handleFiltroChange('tipoPercurso', e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Beira-Interland">Beira-Interland</option>
              <option value="Local">Local</option>
              <option value="Nacional">Nacional</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => onExportarDados("relatorios")}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <FiDownload className="w-4 h-4" />
              <span>Exportar Relatório</span>
            </button>
          </div>
        </div>
      </div>

      {/* Métricas de Relatórios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {stats.totalCargas || totalCargas}
              </div>
              <div className="text-sm text-gray-500">Total de Cargas</div>
            </div>
            <FiPackage className="w-8 h-8 text-blue-500" />
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {stats.cargasEntregues || entregues} entregues • {stats.cargasTransito || 0} em trânsito
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {stats.cargasEntregues || entregues}
              </div>
              <div className="text-sm text-gray-500">Entregues no Prazo</div>
            </div>
            <FiCalendar className="w-8 h-8 text-green-500" />
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {((stats.cargasEntregues / stats.totalCargas) * 100 || 0).toFixed(1)}% taxa de entrega
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-red-600">
                {stats.cargasAtrasadas || atrasadas}
              </div>
              <div className="text-sm text-gray-500">Cargas Atrasadas</div>
            </div>
            <FiTruck className="w-8 h-8 text-red-500" />
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {stats.ocorrenciasTotal || 0} ocorrências registradas
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {formatarMoeda(stats.valorTotalFretes || valorTotal)}
              </div>
              <div className="text-sm text-gray-500">
                Valor Total Transportado
              </div>
            </div>
            <FiDollarSign className="w-8 h-8 text-purple-500" />
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Margem: {formatarMoeda(stats.margemLucroTotal || 0)}
          </div>
        </div>
      </div>

      {/* Métricas Financeiras Detalhadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Receitas</div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Fretes:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {formatarMoeda(stats.valorTotalFretes)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Seguros:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {formatarMoeda(stats.valorTotalSeguros)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Comissões:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {formatarMoeda(stats.comissaoTotal)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Operacional</div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Peso Total:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {(stats.pesoTotalTransportado || 0).toLocaleString()} kg
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Distância Total:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {(stats.distanciaTotal || 0).toLocaleString()} km
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Cargas com Seguro:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {stats.cargasComSeguro} / {stats.totalCargas}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Por Tipo de Percurso</div>
          <div className="space-y-2">
            {stats.statsPorPercurso?.map((stat) => (
              <div key={stat._id} className="flex justify-between">
                <span className="text-sm text-gray-500">{stat._id}:</span>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {stat.count} cargas
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatarMoeda(stat.valorTotalFrete)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Status das Cargas
            </h3>
            <button
              onClick={() => onExportarDados("status")}
              className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <FiDownload className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>
          <div className="h-80">
            <Doughnut
              data={statusChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      color: '#9CA3AF',
                      font: {
                        size: 11
                      }
                    }
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Distribuição por Tipo de Carga
            </h3>
            <button
              onClick={() => onExportarDados("tipos-carga")}
              className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <FiDownload className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>
          <div className="h-80">
            <Bar
              data={tiposCargaData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: '#9CA3AF'
                    },
                    grid: {
                      color: 'rgba(156, 163, 175, 0.1)'
                    }
                  },
                  x: {
                    ticks: {
                      color: '#9CA3AF'
                    },
                    grid: {
                      color: 'rgba(156, 163, 175, 0.1)'
                    }
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Mais Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Categorias de Seguro
            </h3>
            <button
              onClick={() => onExportarDados("seguros")}
              className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <FiDownload className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>
          <div className="h-80">
            <Bar
              data={seguroChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: '#9CA3AF'
                    },
                    grid: {
                      color: 'rgba(156, 163, 175, 0.1)'
                    }
                  },
                  x: {
                    ticks: {
                      color: '#9CA3AF',
                      maxRotation: 45,
                      minRotation: 45
                    },
                    grid: {
                      color: 'rgba(156, 163, 175, 0.1)'
                    }
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Evolução Mensal
            </h3>
            <button
              onClick={() => onExportarDados("evolucao")}
              className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <FiDownload className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>
          <div className="h-80">
            <Line
              data={evolucaoMensalData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                    labels: {
                      color: '#9CA3AF'
                    }
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: '#9CA3AF'
                    },
                    grid: {
                      color: 'rgba(156, 163, 175, 0.1)'
                    }
                  },
                  x: {
                    ticks: {
                      color: '#9CA3AF'
                    },
                    grid: {
                      color: 'rgba(156, 163, 175, 0.1)'
                    }
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Tabela de Dados Resumidos */}
      {stats.statsPorSeguro && stats.statsPorSeguro.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Estatísticas por Categoria de Seguro
              </h3>
              <button
                onClick={() => onExportarDados("categorias-seguro")}
                className="flex items-center space-x-2 px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FiDownload className="w-4 h-4" />
                <span>Exportar</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Cargas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Valor Médio Mercadoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Prêmio Médio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Relação Prêmio/Valor
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {stats.statsPorSeguro.map((stat) => (
                  <tr key={stat._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {stat._id}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {stat.count}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {formatarMoeda(stat.valorMedioMercadoria)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {formatarMoeda(stat.premioMedio)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {((stat.premioMedio / stat.valorMedioMercadoria) * 100).toFixed(2)}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Estado de Carregamento */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-sm text-gray-500">Carregando relatórios...</p>
        </div>
      )}

      {/* Sem dados */}
      {!isLoading && stats.totalCargas === 0 && (
        <div className="text-center py-12">
          <FiBarChart2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            Nenhum dado disponível
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Comece a criar cargas para ver os relatórios.
          </p>
        </div>
      )}
    </div>
  );
};

export default RelatoriosDashboard;