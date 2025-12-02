import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { FiDownload, FiPrinter, FiFileText, FiCreditCard, FiSearch, FiCheck, FiX } from 'react-icons/fi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Tipos
interface Cargo {
  id: string;
  numero: string;
}

interface Fatura {
  id: string;
  numero: string;
  dataEmissao: Date | string;
  dataVencimento: Date | string;
  dataPagamento?: Date | string;
  valor: number;
  status: 'paga' | 'pendente' | 'atrasada';
  cargos: string[];
}

interface Cotacao {
  id: string;
  numero: string;
  data: Date | string;
  fornecedor: string;
  valor: number;
  status: 'pendente' | 'aprovada' | 'rejeitada' | 'expirada';
  itens: Array<{
    descricao: string;
    quantidade: number;
    valorUnitario: number;
  }>;
}

interface Metrics {
  valorPendente: number;
  totalCotacoes?: number;
  cotacoesPendentes?: number;
}

interface FaturaChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
  }>;
}

interface FaturasDashboardProps {
  faturas: Fatura[];
  cotacoes?: Cotacao[]; // Nova prop para cotações
  cargos: Cargo[];
  metrics: Metrics;
  faturaChartData: FaturaChartData;
  isDataLoading: boolean;
  formatarMoeda: (valor: number) => string;
  formatarData: (data: Date | string) => string;
  getFaturaStatusColor: (status: string) => string;
  getCotacaoStatusColor?: (status: string) => string; // Nova função
  exportarDados: (tipo: string) => void;
  downloadFatura: (id: string) => void;
  pagarFatura: (id: string) => void;
  aprovarCotacao?: (id: string) => void; // Nova função
  rejeitarCotacao?: (id: string) => void; // Nova função
  exportarCotacoes?: () => void; // Nova função
}

const FaturasDashboard: React.FC<FaturasDashboardProps> = ({
  faturas,
  cotacoes = [],
  cargos,
  metrics,
  faturaChartData,
  isDataLoading,
  formatarMoeda,
  formatarData,
  getFaturaStatusColor,
  getCotacaoStatusColor = (status) => {
    switch(status) {
      case 'aprovada': return 'bg-green-100 text-green-800';
      case 'rejeitada': return 'bg-red-100 text-red-800';
      case 'expirada': return 'bg-gray-100 text-gray-800';
      case 'pendente':
      default: return 'bg-yellow-100 text-yellow-800';
    }
  },
  exportarDados,
  downloadFatura,
  pagarFatura,
  aprovarCotacao = () => {},
  rejeitarCotacao = () => {},
  exportarCotacoes = () => {},
}) => {
  const [abaAtiva, setAbaAtiva] = useState<'faturas' | 'cotacoes'>('faturas');

  return (
    <div className="space-y-6">
      {/* Abas de Navegação */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-4">
          <button
            onClick={() => setAbaAtiva('faturas')}
            className={`py-2 px-4 font-medium text-sm border-b-2 transition-colors ${
              abaAtiva === 'faturas'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Faturas
          </button>
          <button
            onClick={() => setAbaAtiva('cotacoes')}
            className={`py-2 px-4 font-medium text-sm border-b-2 transition-colors ${
              abaAtiva === 'cotacoes'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Cotações
          </button>
        </nav>
      </div>

      {/* Conteúdo baseado na aba ativa */}
      {abaAtiva === 'faturas' ? (
        // Conteúdo de Faturas (existente)
        <>
          {/* Métricas de Faturas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-blue-600">
                {faturas.length}
              </div>
              <div className="text-sm text-gray-500">Total de Faturas</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-green-600">
                {faturas.filter((f) => f.status === "paga").length}
              </div>
              <div className="text-sm text-gray-500">Faturas Pagas</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-yellow-600">
                {faturas.filter((f) => f.status === "pendente").length}
              </div>
              <div className="text-sm text-gray-500">Faturas Pendentes</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-red-600">
                {formatarMoeda(metrics.valorPendente)}
              </div>
              <div className="text-sm text-gray-500">Valor Pendente</div>
            </div>
          </div>

          {/* Gráfico de Faturas */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Evolução de Faturas
              </h3>
              <button
                onClick={() => exportarDados("faturas")}
                className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
              >
                <FiDownload className="w-4 h-4" />
                <span>Exportar</span>
              </button>
            </div>
            <div className="h-64">
              <Line
                data={faturaChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: function (value: number | string) {
                          if (typeof value === 'number') {
                            return "MZN " + value.toLocaleString();
                          }
                          return "MZN " + value;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Lista de Faturas */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Minhas Faturas ({faturas.length})
                </h2>
                <div className="flex gap-2">
                  <button className="flex items-center space-x-2 px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <FiPrinter className="w-4 h-4" />
                    <span>Imprimir</span>
                  </button>
                  <button
                    onClick={() => exportarDados("faturas")}
                    className="flex items-center space-x-2 px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiDownload className="w-4 h-4" />
                    <span>Exportar</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Fatura
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Data Emissão
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Vencimento
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Valor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Cargas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {isDataLoading ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center">
                        <div className="flex justify-center">
                          {/* <Spinner size="md" /> */}
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Carregando faturas...
                        </p>
                      </td>
                    </tr>
                  ) : faturas.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center">
                        <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          Nenhuma fatura encontrada
                        </p>
                      </td>
                    </tr>
                  ) : (
                    faturas.map((fatura) => (
                      <tr
                        key={fatura.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {fatura.numero}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {formatarData(fatura.dataEmissao)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {formatarData(fatura.dataVencimento)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatarMoeda(fatura.valor)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getFaturaStatusColor(
                              fatura.status
                            )}`}
                          >
                            {fatura.status === "paga"
                              ? "Paga"
                              : fatura.status === "pendente"
                              ? "Pendente"
                              : "Atrasada"}
                          </span>
                          {fatura.dataPagamento && (
                            <div className="text-xs text-gray-500 mt-1">
                              Paga em: {formatarData(fatura.dataPagamento)}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {fatura.cargos.length} carga(s)
                          </div>
                          <div className="text-xs text-gray-500">
                            {fatura.cargos
                              .map((id) => {
                                const cargo = cargos.find((c) => c.id === id);
                                return cargo?.numero || id;
                              })
                              .join(", ")}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => downloadFatura(fatura.id)}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                            >
                              <FiDownload className="w-4 h-4 mr-1" />
                              Baixar
                            </button>
                            {fatura.status !== "paga" && (
                              <button
                                onClick={() => pagarFatura(fatura.id)}
                                className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
                              >
                                <FiCreditCard className="w-4 h-4 mr-1" />
                                Pagar
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        // Conteúdo de Cotações (novo)
        <>
          {/* Métricas de Cotações */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-blue-600">
                {cotacoes.length}
              </div>
              <div className="text-sm text-gray-500">Total de Cotações</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-green-600">
                {cotacoes.filter((c) => c.status === "aprovada").length}
              </div>
              <div className="text-sm text-gray-500">Cotações Aprovadas</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-yellow-600">
                {cotacoes.filter((c) => c.status === "pendente").length}
              </div>
              <div className="text-sm text-gray-500">Cotações Pendentes</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-red-600">
                {cotacoes.filter((c) => c.status === "rejeitada").length}
              </div>
              <div className="text-sm text-gray-500">Cotações Rejeitadas</div>
            </div>
          </div>

          {/* Lista de Cotações */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Minhas Cotações ({cotacoes.length})
                </h2>
                <div className="flex gap-2">
                  <button className="flex items-center space-x-2 px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <FiSearch className="w-4 h-4" />
                    <span>Nova Cotação</span>
                  </button>
                  <button
                    onClick={exportarCotacoes}
                    className="flex items-center space-x-2 px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiDownload className="w-4 h-4" />
                    <span>Exportar</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Cotação
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Fornecedor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Valor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Itens
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {isDataLoading ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center">
                        <div className="flex justify-center">
                          {/* <Spinner size="md" /> */}
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Carregando cotações...
                        </p>
                      </td>
                    </tr>
                  ) : cotacoes.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center">
                        <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          Nenhuma cotação encontrada
                        </p>
                      </td>
                    </tr>
                  ) : (
                    cotacoes.map((cotacao) => (
                      <tr
                        key={cotacao.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {cotacao.numero}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {formatarData(cotacao.data)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {cotacao.fornecedor}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatarMoeda(cotacao.valor)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCotacaoStatusColor(
                              cotacao.status
                            )}`}
                          >
                            {cotacao.status === "aprovada"
                              ? "Aprovada"
                              : cotacao.status === "rejeitada"
                              ? "Rejeitada"
                              : cotacao.status === "expirada"
                              ? "Expirada"
                              : "Pendente"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {cotacao.itens.length} item(s)
                          </div>
                          <div className="text-xs text-gray-500 truncate max-w-xs">
                            {cotacao.itens.map(item => item.descricao).join(", ")}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => console.log(`Ver detalhes ${cotacao.id}`)}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                            >
                              <FiSearch className="w-4 h-4 mr-1" />
                              Detalhes
                            </button>
                            {cotacao.status === "pendente" && (
                              <>
                                <button
                                  onClick={() => aprovarCotacao(cotacao.id)}
                                  className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
                                >
                                  <FiCheck className="w-4 h-4 mr-1" />
                                  Aprovar
                                </button>
                                <button
                                  onClick={() => rejeitarCotacao(cotacao.id)}
                                  className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                                >
                                  <FiX className="w-4 h-4 mr-1" />
                                  Rejeitar
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FaturasDashboard;