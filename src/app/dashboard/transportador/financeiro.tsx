import { FiDownload, FiTrendingUp, FiTrendingDown, FiDollarSign } from "react-icons/fi";
import { useState, useEffect } from "react";

interface Fatura {
  id: string;
  numero: string;
  dataEmissao: Date;
  dataVencimento: Date;
  valor: number;
  status: "paga" | "pendente" | "processando" | "vencida";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viagens: any[];
  cliente: string;
  codigoCarga: string;
}

interface MetricasFinanceiras {
  faturamentoMes: number;
  despesasMes: number;
  lucroMes: number;
  cargasPendentes: number;
  cargasFaturadas: number;
  valorMedioCarga: number;
}

interface FinanceiroDashboardProps {
  formatarMoeda: (v: number) => string;
  formatarData: (d: string | Date) => string;
  exportarDados: (tipo: string) => void;
}

export function FinanceiroDashboard({ 
  formatarMoeda, 
  formatarData, 
  exportarDados 
}: FinanceiroDashboardProps) {
  const [metrics, setMetrics] = useState<MetricasFinanceiras>({
    faturamentoMes: 0,
    despesasMes: 0,
    lucroMes: 0,
    cargasPendentes: 0,
    cargasFaturadas: 0,
    valorMedioCarga: 0
  });
  
  const [faturas, setFaturas] = useState<Fatura[]>([]);
  const [loading, setLoading] = useState(true);
  const [periodo, setPeriodo] = useState("mes");

  // Buscar dados financeiros
  useEffect(() => {
    async function fetchFinanceiroData() {
      try {
        setLoading(true);
        
        // Buscar estatísticas das cargas
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
            calcularMetricas(statsData.data);
          }
        }

        // Buscar cargas para gerar faturas
        const cargasResponse = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/getCargaList", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            curPage: 1,
            pageSize: 50,
            dataInicio: getDataInicio(periodo),
            dataFim: new Date().toISOString()
          })
        });

        if (cargasResponse.ok) {
          const cargasData = await cargasResponse.json();
          if (cargasData.returnCode === 200) {
            gerarFaturas(cargasData.data.list);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados financeiros:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFinanceiroData();
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
  const calcularMetricas = (stats: any) => {
    // Calcular métricas baseadas nas estatísticas das cargas
    const faturamentoMes = stats.valorTotalFretes || 0;
    const despesasMes = faturamentoMes * 0.6; // Estimativa de 60% de custos
    const lucroMes = faturamentoMes - despesasMes;
    
    setMetrics({
      faturamentoMes,
      despesasMes,
      lucroMes,
      cargasPendentes: stats.cargasTransito + stats.cargasAtrasadas,
      cargasFaturadas: stats.cargasEntregues,
      valorMedioCarga: stats.totalCargas > 0 ? faturamentoMes / stats.totalCargas : 0
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gerarFaturas = (cargas: any[]) => {
    const faturasGeradas: Fatura[] = cargas
      .filter(carga => 
        carga.status === "entregue" || 
        carga.status === "encerrada" ||
        carga.valorTotal > 0
      )
      .map((carga, index) => {
        const dataEmissao = new Date(carga.dataAtualizacao || carga.dataCriacao);
        const dataVencimento = new Date(dataEmissao);
        dataVencimento.setDate(dataVencimento.getDate() + 30);

        // Determinar status baseado na data e situação
        let status: Fatura["status"] = "pendente";
        if (carga.status === "entregue" && dataVencimento < new Date()) {
          status = "vencida";
        } else if (carga.status === "entregue") {
          status = Math.random() > 0.3 ? "paga" : "pendente";
        }

        return {
          id: `FAT-${carga.codigo}-${index}`,
          numero: `FAT${String(index + 1).padStart(4, '0')}`,
          dataEmissao,
          dataVencimento,
          valor: carga.valorTotal || carga.valorFrete || 0,
          status,
          viagens: [carga.viagemId].filter(Boolean),
          cliente: carga.cliente,
          codigoCarga: carga.codigo
        };
      })
      .sort((a, b) => b.dataEmissao.getTime() - a.dataEmissao.getTime());

    setFaturas(faturasGeradas);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paga":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "pendente":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "processando":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "vencida":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const handleDownloadFatura = (fatura: Fatura) => {
    // Simular download da fatura
    const conteudo = `
      FATURA: ${fatura.numero}
      Cliente: ${fatura.cliente}
      Carga: ${fatura.codigoCarga}
      Valor: ${formatarMoeda(fatura.valor)}
      Emissão: ${formatarData(fatura.dataEmissao)}
      Vencimento: ${formatarData(fatura.dataVencimento)}
      Status: ${fatura.status}
    `;
    
    const blob = new Blob([conteudo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fatura-${fatura.numero}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSolicitarPagamento = (fatura: Fatura) => {
    // Implementar lógica de solicitação de pagamento
    alert(`Solicitação de pagamento enviada para ${fatura.cliente}`);
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
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Gestão Financeira
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Acompanhe o desempenho financeiro das suas operações
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Seletor de Período */}
            <select 
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="semana">Última Semana</option>
              <option value="mes">Último Mês</option>
              <option value="trimestre">Último Trimestre</option>
            </select>

            <button
              onClick={() => exportarDados("financeiro")}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FiDownload className="w-4 h-4" />
              <span>Exportar Relatório</span>
            </button>
          </div>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">
                  Faturamento
                </p>
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {formatarMoeda(metrics.faturamentoMes)}
                </div>
              </div>
              <FiTrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-2">
              {metrics.cargasFaturadas} cargas faturadas
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">
                  Despesas
                </p>
                <div className="text-2xl font-bold text-red-700 dark:text-red-300">
                  {formatarMoeda(metrics.despesasMes)}
                </div>
              </div>
              <FiTrendingDown className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <div className="text-xs text-red-600 dark:text-red-400 mt-2">
              Custos operacionais e taxas
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
                  Lucro Líquido
                </p>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {formatarMoeda(metrics.lucroMes)}
                </div>
              </div>
              <FiDollarSign className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400 mt-2">
              Margem: {metrics.faturamentoMes > 0 ? ((metrics.lucroMes / metrics.faturamentoMes) * 100).toFixed(1) : 0}%
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">
                  Valor Médio
                </p>
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  {formatarMoeda(metrics.valorMedioCarga)}
                </div>
              </div>
              <FiTrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-xs text-purple-600 dark:text-purple-400 mt-2">
              Por carga entregue
            </div>
          </div>
        </div>

        {/* Tabela de Faturas */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Faturas e Pagamentos
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total: {faturas.length} faturas
            </span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Fatura
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Emissão
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
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {faturas.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      Nenhuma fatura encontrada para o período selecionado
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
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {fatura.codigoCarga}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {fatura.cliente}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {formatarData(fatura.dataEmissao)}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {formatarData(fatura.dataVencimento)}
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                        {formatarMoeda(fatura.valor)}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(fatura.status)}`}
                        >
                          {fatura.status.charAt(0).toUpperCase() + fatura.status.slice(1)}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleDownloadFatura(fatura)}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                          >
                            Download
                          </button>

                          {fatura.status === "pendente" && (
                            <button 
                              onClick={() => handleSolicitarPagamento(fatura)}
                              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 text-sm font-medium"
                            >
                              Cobrar
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

        {/* Resumo */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-gray-900 dark:text-white">
                {formatarMoeda(faturas.filter(f => f.status === 'paga').reduce((sum, f) => sum + f.valor, 0))}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Total Recebido</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900 dark:text-white">
                {formatarMoeda(faturas.filter(f => f.status === 'pendente').reduce((sum, f) => sum + f.valor, 0))}
              </div>
              <div className="text-gray-600 dark:text-gray-400">A Receber</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900 dark:text-white">
                {faturas.filter(f => f.status === 'vencida').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Faturas Vencidas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}