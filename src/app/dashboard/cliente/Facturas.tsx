/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  FiDownload,
  FiPrinter,
  FiFileText,
  FiCreditCard,
  FiSearch,
  FiCheck,
  FiX,
  FiDollarSign,
  FiCalendar,
  FiClock,
  FiTrendingUp,
  FiUsers,
  FiPackage,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import {
  gerarPDFFaturaCompleta,
  gerarPDFCotacaoCompleta,
  gerarReciboCompleto,
} from "../../../context/pdfGenerator";

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface FaturaParaPDF {
  faturaId: string;
  numeroFatura: string;
  cliente: {
    nome: string;
    nif?: string;
    email?: string;
    telefone?: string;
    endereco?: string;
  };
  tipoServico: string;
  descricaoServico: string;
  valorTotal: number;
  valorPendente: number;
  status: string;
  dataEmissao: string;
  dataVencimento: string;
  dataRecebimento?: string;
  recebimentos?: Array<{
    data: string;
    valor: number;
    formaPagamento: string;
    status: string;
  }>;
  notas?: string;
  itensFatura?: Array<{
    id: number;
    descricao: string;
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
  }>;
  subtotal?: number;
  iva?: any;
}

interface CotacaoParaPDF {
  quotationId: string;
  numeroCotacao: string;
  dataEmissao: string;
  dataValidade: string;
  cliente: {
    nome: string;
    nif?: string;
    email?: string;
    telefone?: string;
    endereco?: string;
  };
  status: string;
  valorTotal: number;
  subtotal?: number;
  iva?: any;
  itensCotacao?: Array<{
    id: number;
    descricao: string;
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
    observacoes?: string;
  }>;
  observacoes?: string;
  tipoServico?: string;
  referencia?: string;
}

// Tipos baseados nos seus schemas
interface Fatura {
  faturaId: string;
  numeroFatura: string;
  clienteId: string;
  cliente: {
    nome: string;
    nif?: string;
    email?: string;
    telefone?: string;
    endereco?: string;
  };
  tipoServico: "transporte" | "armazenagem" | "logistica" | "outro";
  descricaoServico: string;
  valorTotal: number;
  valorPendente: number;
  status: "pendente" | "vencida" | "paga" | "parcial" | "cancelada";
  dataEmissao: string | Date;
  dataVencimento: string | Date;
  dataRecebimento?: string | Date;
  recebimentos: Array<{
    data: string | Date;
    valor: number;
    formaPagamento: string;
    status: "confirmado" | "pendente" | "estornado";
  }>;
  percentualPago: number;
  diasAteVencimento: number;
  vencida: boolean;
  itensFatura: Array<{
    descricao: string;
    valorTotal: number;
    tipo: string;
  }>;
}

interface Cotacao {
  quotationId: string;
  numeroQuotation: string;
  versao: number;
  clienteId: string;
  cliente: {
    nome: string;
    email: string;
    telefone: string;
    empresa?: string;
  };
  tipoServico:
    | "transporte"
    | "armazenagem"
    | "logistica"
    | "seguro"
    | "frete"
    | "outro";
  status:
    | "rascunho"
    | "enviado"
    | "revisao"
    | "aprovado"
    | "rejeitado"
    | "expirado"
    | "convertido"
    | "pendente";
  valorTotal: number;
  dataEmissao: string | Date;
  dataValidade: string | Date;
  diasAteExpiracao: number;
  expirado: boolean;
  probabilidadeFechamento: number;
  detalhesCarga: {
    descricao: string;
    tipoCarga?: string;
    pesoBruto?: number;
  };
  origem: {
    cidade: string;
    pais: string;
  };
  destino: {
    cidade: string;
    pais: string;
  };
  itens: Array<{
    descricao: string;
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
  }>;
  conversao?: {
    faturaId?: string;
    dataConversao?: string | Date;
  };
}

interface DashboardStats {
  // Faturas
  totalFaturas: number;
  valorTotalFaturas: number;
  valorPendenteTotal: number;
  faturasPendentes: number;
  faturasVencidas: number;
  faturasPagas: number;

  // Cotações
  totalCotações: number;
  cotacoesAprovadas: number;
  cotacoesPendentes: number;
  cotacoesExpiradas: number;
  cotacoesConvertidas: number;
  taxaConversao: number;

  // Clientes
  clientesAtivos: number;
  valorRecebidoMes: number;
}

interface FaturasDashboardProps {
  empresaId?: string;
  periodo?: number; // meses para o dashboard
}

const FaturasDashboard: React.FC<FaturasDashboardProps> = ({
  empresaId,
  periodo = 6,
}) => {
  const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

  // Estados
  const [abaAtiva, setAbaAtiva] = useState<
    "faturas" | "cotacoes" | "dashboard"
  >("dashboard");
  const [faturas, setFaturas] = useState<Fatura[]>([]);
  const [cotacoes, setCotacoes] = useState<Cotacao[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalFaturas: 0,
    valorTotalFaturas: 0,
    valorPendenteTotal: 0,
    faturasPendentes: 0,
    faturasVencidas: 0,
    faturasPagas: 0,
    totalCotações: 0,
    cotacoesAprovadas: 0,
    cotacoesPendentes: 0,
    cotacoesExpiradas: 0,
    cotacoesConvertidas: 0,
    taxaConversao: 0,
    clientesAtivos: 0,
    valorRecebidoMes: 0,
  });
  const [isLoading, setIsLoading] = useState({
    faturas: false,
    cotacoes: false,
    dashboard: false,
  });
  const [filtros, setFiltros] = useState({
    dataInicio: "",
    dataFim: "",
    status: "",
    clienteId: "",
    tipoServico: "",
  });
  // Função para gerar PDF de fatura
  const handleGerarPDFFatura = async (fatura: Fatura) => {
    try {
      setIsLoading((prev) => ({ ...prev, faturas: true }));

      // Converter a fatura para o formato esperado pelo gerador de PDF
      const faturaParaPDF: FaturaParaPDF = {
        faturaId: fatura.faturaId,
        numeroFatura: fatura.numeroFatura,
        cliente: {
          nome: fatura.cliente.nome,
          nif: fatura.cliente.nif,
          email: fatura.cliente.email,
          telefone: fatura.cliente.telefone,
          endereco: fatura.cliente.endereco,
        },
        tipoServico: fatura.tipoServico,
        descricaoServico: fatura.descricaoServico,
        valorTotal: fatura.valorTotal,
        valorPendente: fatura.valorPendente || 0,
        status: fatura.status,
        dataEmissao:
          typeof fatura.dataEmissao === "string"
            ? fatura.dataEmissao
            : fatura.dataEmissao.toISOString(),
        dataVencimento:
          typeof fatura.dataVencimento === "string"
            ? fatura.dataVencimento
            : fatura.dataVencimento.toISOString(),
        dataRecebimento: fatura.dataRecebimento
          ? typeof fatura.dataRecebimento === "string"
            ? fatura.dataRecebimento
            : fatura.dataRecebimento.toISOString()
          : undefined,
        recebimentos: fatura.recebimentos?.map((r) => ({
          data: typeof r.data === "string" ? r.data : r.data.toISOString(),
          valor: r.valor,
          formaPagamento: r.formaPagamento,
          status: r.status,
        })),
        // Adicione outros campos conforme necessário
        itensFatura: fatura.itensFatura?.map((item, index) => ({
          id: index + 1,
          descricao: item.descricao,
          quantidade: 1,
          valorUnitario: item.valorTotal,
          valorTotal: item.valorTotal,
        })),
        subtotal: fatura.valorTotal,
      };

      await gerarPDFFaturaCompleta(faturaParaPDF as any);

      // Notificação de sucesso
      alert(`PDF da fatura ${fatura.numeroFatura} gerado com sucesso!`);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Erro ao gerar PDF. Por favor, tente novamente.");
    } finally {
      setIsLoading((prev) => ({ ...prev, faturas: false }));
    }
  };

  // Função para gerar PDF de cotação
  const handleGerarPDFCotacao = async (cotacao: Cotacao) => {
    try {
      setIsLoading((prev) => ({ ...prev, cotacoes: true }));

      // Converter a cotação para o formato esperado
      const cotacaoParaPDF: CotacaoParaPDF = {
        quotationId: cotacao.quotationId,
        numeroCotacao: cotacao.numeroQuotation,
        dataEmissao:
          typeof cotacao.dataEmissao === "string"
            ? cotacao.dataEmissao
            : cotacao.dataEmissao.toISOString(),
        dataValidade:
          typeof cotacao.dataValidade === "string"
            ? cotacao.dataValidade
            : cotacao.dataValidade.toISOString(),
        cliente: {
          nome: cotacao.cliente.nome,
          email: cotacao.cliente.email,
          telefone: cotacao.cliente.telefone,
        },
        status: cotacao.status,
        valorTotal: cotacao.valorTotal,
        subtotal: cotacao.valorTotal,
        itensCotacao: cotacao.itens?.map((item, index) => ({
          id: index + 1,
          descricao: item.descricao,
          quantidade: item.quantidade,
          valorUnitario: item.valorUnitario,
          valorTotal: item.valorTotal,
        })),
        tipoServico: cotacao.tipoServico,
        referencia: cotacao.detalhesCarga?.descricao,
      };

      await gerarPDFCotacaoCompleta(cotacaoParaPDF as any);

      alert(`PDF da cotação ${cotacao.numeroQuotation} gerado com sucesso!`);
    } catch (error) {
      console.error("Erro ao gerar PDF da cotação:", error);
      alert("Erro ao gerar PDF da cotação.");
    } finally {
      setIsLoading((prev) => ({ ...prev, cotacoes: false }));
    }
  };

  // Configurações do Chart.js
  const [chartData, setChartData] = useState({
    evolucaoMensal: {
      labels: [] as string[],
      datasets: [
        {
          label: "Faturas Emitidas",
          data: [] as number[],
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
        },
        {
          label: "Valor Recebido",
          data: [] as number[],
          borderColor: "rgb(34, 197, 94)",
          backgroundColor: "rgba(34, 197, 94, 0.1)",
          tension: 0.4,
        },
      ],
    },
    distribuicaoStatus: {
      labels: ["Pendentes", "Pagas", "Vencidas", "Parciais"],
      datasets: [
        {
          label: "Faturas por Status",
          data: [0, 0, 0, 0],
          backgroundColor: [
            "rgba(234, 179, 8, 0.8)",
            "rgba(34, 197, 94, 0.8)",
            "rgba(239, 68, 68, 0.8)",
            "rgba(59, 130, 246, 0.8)",
          ],
          borderColor: [
            "rgb(234, 179, 8)",
            "rgb(34, 197, 94)",
            "rgb(239, 68, 68)",
            "rgb(59, 130, 246)",
          ],
          borderWidth: 1,
        },
      ],
    },
    cotacoesStatus: {
      labels: ["Aprovadas", "Pendentes", "Rejeitadas", "Expiradas"],
      datasets: [
        {
          label: "Cotações por Status",
          data: [0, 0, 0, 0],
          backgroundColor: [
            "rgba(34, 197, 94, 0.8)",
            "rgba(234, 179, 8, 0.8)",
            "rgba(239, 68, 68, 0.8)",
            "rgba(107, 114, 128, 0.8)",
          ],
          borderColor: [
            "rgb(34, 197, 94)",
            "rgb(234, 179, 8)",
            "rgb(239, 68, 68)",
            "rgb(107, 114, 128)",
          ],
          borderWidth: 1,
        },
      ],
    },
  });

  // Funções de formatação
  const formatarData = (data: string | Date): string => {
    if (!data) return "N/A";
    const date = new Date(data);
    return date.toLocaleDateString("pt-MZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatarMoeda = (valor: number): string => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
      minimumFractionDigits: 2,
    }).format(valor);
  };

  const formatarDataHora = (data: string | Date): string => {
    if (!data) return "N/A";
    const date = new Date(data);
    return date.toLocaleDateString("pt-MZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getFaturaStatusColor = (status: Fatura["status"]) => {
    switch (status) {
      case "paga":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pendente":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "vencida":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "parcial":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "cancelada":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const getCotacaoStatusColor = (status: Cotacao["status"]) => {
    switch (status) {
      case "aprovado":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pendente":
      case "rascunho":
      case "revisao":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "rejeitado":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "expirado":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
      case "convertido":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const getStatusTexto = (status: Fatura["status"] | Cotacao["status"]) => {
    const map: Record<string, string> = {
      pendente: "Pendente",
      vencida: "Vencida",
      paga: "Paga",
      parcial: "Parcial",
      cancelada: "Cancelada",
      rascunho: "Rascunho",
      enviado: "Enviada",
      revisao: "Em Revisão",
      aprovado: "Aprovada",
      rejeitado: "Rejeitada",
      expirado: "Expirada",
      convertido: "Convertida",
    };
    return map[status] || status;
  };

  // Funções de API
  const buscarFaturas = async () => {
    setIsLoading((prev) => ({ ...prev, faturas: true }));
    try {
      const response = await fetch(`${API_BASE_URL}/getFaturaList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          curPage: 1,
          pageSize: 50,
          ...filtros,
        }),
      });

      const data = await response.json();
      if (data.returnCode === 200 && data.data?.list) {
        setFaturas(data.data.list);
      }
    } catch (error) {
      console.error("Erro ao buscar faturas:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, faturas: false }));
    }
  };

  const buscarCotacoes = async () => {
    setIsLoading((prev) => ({ ...prev, cotacoes: true }));
    try {
      const response = await fetch(`${API_BASE_URL}/getQuotationList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          curPage: 1,
          pageSize: 50,
          exibirConvertidas: true,
          ...filtros,
        }),
      });

      const data = await response.json();
      if (data.returnCode === 200 && data.data?.list) {
        setCotacoes(data.data.list);
      }
    } catch (error) {
      console.error("Erro ao buscar cotações:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, cotacoes: false }));
    }
  };

  const buscarDashboardData = async () => {
    setIsLoading((prev) => ({ ...prev, dashboard: true }));
    try {
      // Buscar estatísticas de faturas
      const responseFaturas = await fetch(
        `${API_BASE_URL}/getDashboardContasReceber`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            periodoMeses: periodo,
            clienteId: filtros.clienteId || undefined,
          }),
        }
      );

      const dataFaturas = await responseFaturas.json();

      // Buscar estatísticas de cotações
      const responseCotacoes = await fetch(
        `${API_BASE_URL}/getQuotationDashboard`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            periodoMeses: periodo,
            responsavel: filtros.clienteId || undefined,
          }),
        }
      );

      const dataCotacoes = await responseCotacoes.json();

      if (dataFaturas.returnCode === 200 && dataCotacoes.returnCode === 200) {
        // Calcular estatísticas
        const estatisticasFaturas = dataFaturas.data?.estatisticas || {};
        const estatisticasCotacoes = dataCotacoes.data?.estatisticas || {};

        const novasStats: DashboardStats = {
          totalFaturas: estatisticasFaturas.totalFaturas || 0,
          valorTotalFaturas: estatisticasFaturas.totalValor || 0,
          valorPendenteTotal: estatisticasFaturas.valorPendente || 0,
          faturasPendentes: estatisticasFaturas.faturasPendentes || 0,
          faturasVencidas: estatisticasFaturas.faturasVencidas || 0,
          faturasPagas:
            (estatisticasFaturas.totalFaturas || 0) -
            (estatisticasFaturas.faturasPendentes || 0) -
            (estatisticasFaturas.faturasVencidas || 0),
          totalCotações: estatisticasCotacoes.totalCotações || 0,
          cotacoesAprovadas: estatisticasCotacoes.cotaçõesAprovadas || 0,
          cotacoesPendentes:
            (estatisticasCotacoes.totalCotações || 0) -
            (estatisticasCotacoes.cotaçõesAprovadas || 0) -
            (estatisticasCotacoes.cotaçõesRejeitadas || 0) -
            (estatisticasCotacoes.cotaçõesExpiradas || 0) -
            (estatisticasCotacoes.cotaçõesConvertidas || 0),
          cotacoesExpiradas: estatisticasCotacoes.cotaçõesExpiradas || 0,
          cotacoesConvertidas: estatisticasCotacoes.cotaçõesConvertidas || 0,
          taxaConversao: estatisticasCotacoes.taxaConversao || 0,
          clientesAtivos: dataFaturas.data?.clientesPrincipais?.length || 0,
          valorRecebidoMes:
            dataFaturas.data?.recebimentosMes?.totalRecebido || 0,
        };

        setStats(novasStats);

        // Atualizar gráficos
        atualizarGraficos(novasStats, dataFaturas.data, dataCotacoes.data);
      }
    } catch (error) {
      console.error("Erro ao buscar dashboard:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, dashboard: false }));
    }
  };

  const atualizarGraficos = (
    stats: DashboardStats,
    dataFaturas: any,
    dataCotacoes: any
  ) => {
    // Gráfico de distribuição de status de faturas
    setChartData((prev) => ({
      ...prev,
      distribuicaoStatus: {
        ...prev.distribuicaoStatus,
        datasets: [
          {
            ...prev.distribuicaoStatus.datasets[0],
            data: [
              stats.faturasPendentes,
              stats.faturasPagas,
              stats.faturasVencidas,
              stats.totalFaturas -
                stats.faturasPendentes -
                stats.faturasPagas -
                stats.faturasVencidas,
            ],
          },
        ],
      },
      cotacoesStatus: {
        ...prev.cotacoesStatus,
        datasets: [
          {
            ...prev.cotacoesStatus.datasets[0],
            data: [
              stats.cotacoesAprovadas,
              stats.cotacoesPendentes,
              (stats.totalCotações || 0) -
                stats.cotacoesAprovadas -
                stats.cotacoesPendentes -
                stats.cotacoesExpiradas -
                stats.cotacoesConvertidas,
              stats.cotacoesExpiradas,
            ],
          },
        ],
      },
    }));
  };

  // Funções de ação
  const exportarDados = (tipo: "faturas" | "cotacoes") => {
    const dados = tipo === "faturas" ? faturas : cotacoes;
    const cabecalho =
      tipo === "faturas"
        ? [
            "Número",
            "Cliente",
            "Data Emissão",
            "Vencimento",
            "Valor",
            "Status",
            "Valor Pendente",
          ]
        : [
            "Número",
            "Cliente",
            "Data Emissão",
            "Validade",
            "Valor",
            "Status",
            "Probabilidade",
          ];

    const linhas = dados.map((item) =>
      tipo === "faturas"
        ? [
            (item as Fatura).numeroFatura,
            (item as Fatura).cliente.nome,
            formatarData((item as Fatura).dataEmissao),
            formatarData((item as Fatura).dataVencimento),
            formatarMoeda((item as Fatura).valorTotal),
            getStatusTexto((item as Fatura).status),
            formatarMoeda((item as Fatura).valorPendente || 0),
          ]
        : [
            (item as Cotacao).numeroQuotation,
            (item as Cotacao).cliente.nome,
            formatarData((item as Cotacao).dataEmissao),
            formatarData((item as Cotacao).dataValidade),
            formatarMoeda((item as Cotacao).valorTotal),
            getStatusTexto((item as Cotacao).status),
            `${(item as Cotacao).probabilidadeFechamento || 0}%`,
          ]
    );

    const csv = [cabecalho, ...linhas]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tipo}_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const registrarRecebimento = async (
    faturaId: string,
    valor: number,
    formaPagamento: string
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/registrarRecebimento`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          faturaId,
          recebimentoData: {
            valor,
            formaPagamento,
            data: new Date().toISOString(),
            observacoes: "Recebimento via dashboard",
          },
        }),
      });

      const data = await response.json();
      if (data.returnCode === 200) {
        buscarFaturas();
        buscarDashboardData();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erro ao registrar recebimento:", error);
      return false;
    }
  };

  const atualizarStatusCotacao = async (
    quotationId: string,
    status: Cotacao["status"],
    observacoes?: string
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/updateQuotationStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quotationId,
          status,
          observacoes,
          usuario: "dashboard_user", // Isso deve vir do contexto de autenticação
        }),
      });

      const data = await response.json();
      if (data.returnCode === 200) {
        buscarCotacoes();
        buscarDashboardData();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erro ao atualizar status da cotação:", error);
      return false;
    }
  };

  const enviarLembrete = async (faturaId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/enviarLembreteVencimento`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          faturaId,
          metodo: "email",
        }),
      });

      const data = await response.json();
      if (data.returnCode === 200) {
        alert("Lembrete enviado com sucesso!");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erro ao enviar lembrete:", error);
      return false;
    }
  };

  // Efeitos
  useEffect(() => {
    if (abaAtiva === "faturas") {
      buscarFaturas();
    } else if (abaAtiva === "cotacoes") {
      buscarCotacoes();
    } else {
      buscarDashboardData();
    }
  }, [abaAtiva, filtros]);

  const handleFiltroChange = (key: keyof typeof filtros, value: string) => {
    setFiltros((prev) => ({ ...prev, [key]: value }));
  };

  // Componente de filtros
  const FiltrosComponent = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Período
          </label>
          <select
            value={periodo}
            onChange={(e) => handleFiltroChange("dataInicio", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="1">Último mês</option>
            <option value="3">Últimos 3 meses</option>
            <option value="6">Últimos 6 meses</option>
            <option value="12">Último ano</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <select
            value={filtros.status}
            onChange={(e) => handleFiltroChange("status", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Todos</option>
            {abaAtiva === "faturas" ? (
              <>
                <option value="pendente">Pendentes</option>
                <option value="paga">Pagas</option>
                <option value="vencida">Vencidas</option>
                <option value="parcial">Parciais</option>
              </>
            ) : (
              <>
                <option value="pendente">Pendentes</option>
                <option value="aprovado">Aprovadas</option>
                <option value="rejeitado">Rejeitadas</option>
                <option value="convertido">Convertidas</option>
              </>
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Data Início
          </label>
          <input
            type="date"
            value={filtros.dataInicio}
            onChange={(e) => handleFiltroChange("dataInicio", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Data Fim
          </label>
          <input
            type="date"
            value={filtros.dataFim}
            onChange={(e) => handleFiltroChange("dataFim", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Abas de Navegação */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-4">
          <button
            onClick={() => setAbaAtiva("dashboard")}
            className={`py-2 px-4 font-medium text-sm border-b-2 transition-colors ${
              abaAtiva === "dashboard"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            <FiTrendingUp className="inline mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setAbaAtiva("faturas")}
            className={`py-2 px-4 font-medium text-sm border-b-2 transition-colors ${
              abaAtiva === "faturas"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            <FiDollarSign className="inline mr-2" />
            Faturas
          </button>
          <button
            onClick={() => setAbaAtiva("cotacoes")}
            className={`py-2 px-4 font-medium text-sm border-b-2 transition-colors ${
              abaAtiva === "cotacoes"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            <FiFileText className="inline mr-2" />
            Cotações
          </button>
        </nav>
      </div>

      {/* Filtros */}
      <FiltrosComponent />

      {/* Conteúdo baseado na aba ativa */}
      {abaAtiva === "dashboard" ? (
        // Dashboard Principal
        <>
          {/* Métricas Gerais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Faturas */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
                  <FiDollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {faturas.length}
                  </div>
                  <div className="text-sm text-gray-500">Total Faturas</div>
                </div>
              </div>
              <div className="mt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Pendentes:
                  </span>
                  <span className="font-semibold">
                    {faturas.filter((f) => f.status === "pendente").length}
                  </span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-gray-600 dark:text-gray-400">
                    Vencidas:
                  </span>
                  <span className="font-semibold text-red-600">
                    {faturas.filter((f) => f.vencida).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Valor Pendente */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900">
                  <FiClock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatarMoeda(
                      faturas.reduce(
                        (total, f) => total + (f.valorPendente || 0),
                        0
                      )
                    )}
                  </div>
                  <div className="text-sm text-gray-500">Valor Pendente</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (faturas.reduce(
                          (total, f) => total + (f.valorPendente || 0),
                          0
                        ) /
                          Math.max(
                            1,
                            faturas.reduce(
                              (total, f) => total + f.valorTotal,
                              0
                            )
                          )) *
                          100
                      )}%`,
                    }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {(
                    (faturas.reduce(
                      (total, f) => total + (f.valorPendente || 0),
                      0
                    ) /
                      Math.max(
                        1,
                        faturas.reduce((total, f) => total + f.valorTotal, 0)
                      )) *
                    100
                  ).toFixed(1)}
                  % do total
                </div>
              </div>
            </div>

            {/* Cotações */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900">
                  <FiCheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {cotacoes.length}
                  </div>
                  <div className="text-sm text-gray-500">Total Cotações</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm font-semibold text-green-600">
                  Taxa de Conversão:{" "}
                  {cotacoes.length > 0
                    ? (
                        (cotacoes.filter((c) => c.status === "convertido")
                          .length /
                          cotacoes.length) *
                        100
                      ).toFixed(1)
                    : "0.0"}
                  %
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {cotacoes.filter((c) => c.status === "convertido").length}{" "}
                  convertidas em faturas
                </div>
              </div>
            </div>

            {/* Recebimentos do Mês */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900">
                  <FiCalendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatarMoeda(
                      faturas.reduce((total, f) => {
                        if (!f.recebimentos) return total;
                        const recebimentosMes = f.recebimentos
                          .filter((r) => {
                            const dataRecebimento = new Date(r.data);
                            const inicioMes = new Date();
                            inicioMes.setDate(1);
                            inicioMes.setHours(0, 0, 0, 0);
                            const fimMes = new Date();
                            fimMes.setMonth(fimMes.getMonth() + 1);
                            fimMes.setDate(0);
                            fimMes.setHours(23, 59, 59, 999);
                            return (
                              dataRecebimento >= inicioMes &&
                              dataRecebimento <= fimMes &&
                              r.status === "confirmado"
                            );
                          })
                          .reduce((sum, r) => sum + r.valor, 0);
                        return total + recebimentosMes;
                      }, 0)
                    )}
                  </div>
                  <div className="text-sm text-gray-500">Recebido este mês</div>
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                Baseado nos últimos 30 dias
              </div>
            </div>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Distribuição de Faturas */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Distribuição de Faturas por Status
              </h3>
              <div className="h-64">
                <Bar
                  data={{
                    labels: ["Pendentes", "Pagas", "Vencidas", "Parciais"],
                    datasets: [
                      {
                        label: "Faturas por Status",
                        data: [
                          faturas.filter(
                            (f) => f.status === "pendente" && !f.vencida
                          ).length,
                          faturas.filter((f) => f.status === "paga").length,
                          faturas.filter((f) => f.vencida).length,
                          faturas.filter((f) => f.status === "parcial").length,
                        ],
                        backgroundColor: [
                          "rgba(234, 179, 8, 0.8)",
                          "rgba(34, 197, 94, 0.8)",
                          "rgba(239, 68, 68, 0.8)",
                          "rgba(59, 130, 246, 0.8)",
                        ],
                        borderColor: [
                          "rgb(234, 179, 8)",
                          "rgb(34, 197, 94)",
                          "rgb(239, 68, 68)",
                          "rgb(59, 130, 246)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
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
                          stepSize: 1,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Status das Cotações */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Status das Cotações
              </h3>
              <div className="h-64">
                <Bar
                  data={{
                    labels: [
                      "Aprovadas",
                      "Pendentes",
                      "Rejeitadas",
                      "Expiradas",
                    ],
                    datasets: [
                      {
                        label: "Cotações por Status",
                        data: [
                          cotacoes.filter((c) => c.status === "aprovado")
                            .length,
                          cotacoes.filter((c) =>
                            ["rascunho", "revisao", "enviado"].includes(
                              c.status
                            )
                          ).length,
                          cotacoes.filter((c) => c.status === "rejeitado")
                            .length,
                          cotacoes.filter((c) => c.status === "expirado")
                            .length,
                        ],
                        backgroundColor: [
                          "rgba(34, 197, 94, 0.8)",
                          "rgba(234, 179, 8, 0.8)",
                          "rgba(239, 68, 68, 0.8)",
                          "rgba(107, 114, 128, 0.8)",
                        ],
                        borderColor: [
                          "rgb(34, 197, 94)",
                          "rgb(234, 179, 8)",
                          "rgb(239, 68, 68)",
                          "rgb(107, 114, 128)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
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
                          stepSize: 1,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Alertas e Lembretes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Faturas Vencidas */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-red-200 dark:border-red-800">
              <div className="flex items-center mb-4">
                <FiAlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Faturas Vencidas ({faturas.filter((f) => f.vencida).length})
                </h3>
              </div>
              {faturas
                .filter((f) => f.vencida && f.status === "pendente")
                .slice(0, 3)
                .map((fatura) => (
                  <div
                    key={fatura.faturaId}
                    className="border-b dark:border-gray-700 py-3 last:border-b-0"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {fatura.numeroFatura}
                        </div>
                        <div className="text-sm text-gray-500">
                          {fatura.cliente.nome}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-red-600">
                          {formatarMoeda(fatura.valorPendente)}
                        </div>
                        <button
                          onClick={() => enviarLembrete(fatura.faturaId)}
                          className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                        >
                          Enviar lembrete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              {faturas.filter((f) => f.vencida).length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  Nenhuma fatura vencida encontrada
                </div>
              )}
            </div>

            {/* Cotações com Validade Próxima */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center mb-4">
                <FiClock className="w-5 h-5 text-yellow-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Cotações Expirando em Breve (
                  {
                    cotacoes.filter(
                      (c) => c.diasAteExpiracao <= 7 && !c.expirado
                    ).length
                  }
                  )
                </h3>
              </div>
              {cotacoes
                .filter((c) => c.diasAteExpiracao <= 7 && !c.expirado)
                .slice(0, 3)
                .map((cotacao) => (
                  <div
                    key={cotacao.quotationId}
                    className="border-b dark:border-gray-700 py-3 last:border-b-0"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {cotacao.numeroQuotation}
                        </div>
                        <div className="text-sm text-gray-500">
                          {cotacao.cliente.nome}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-sm font-semibold ${
                            cotacao.diasAteExpiracao <= 3
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          Expira em {cotacao.diasAteExpiracao} dias
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatarData(cotacao.dataValidade)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {cotacoes.filter((c) => c.diasAteExpiracao <= 7 && !c.expirado)
                .length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  Nenhuma cotação expirando em breve
                </div>
              )}
            </div>
          </div>
        </>
      ) : abaAtiva === "faturas" ? (
        // Lista de Faturas
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
                {
                  faturas.filter((f) => f.status === "pendente" && !f.vencida)
                    .length
                }
              </div>
              <div className="text-sm text-gray-500">Faturas Pendentes</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-red-600">
                {formatarMoeda(stats.valorPendenteTotal)}
              </div>
              <div className="text-sm text-gray-500">Valor Pendente</div>
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
                  <button
                    onClick={() => exportarDados("faturas")}
                    className="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiDownload className="w-4 h-4" />
                    <span>Exportar CSV</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Número
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
                      Valor Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Pendente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {isLoading.faturas ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center">
                        <div className="flex justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Carregando faturas...
                        </p>
                      </td>
                    </tr>
                  ) : faturas.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center">
                        <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          Nenhuma fatura encontrada
                        </p>
                      </td>
                    </tr>
                  ) : (
                    faturas.map((fatura) => (
                      <tr
                        key={fatura.faturaId}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {fatura.numeroFatura}
                          </div>
                          <div className="text-xs text-gray-500">
                            {fatura.tipoServico}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {fatura.cliente.nome}
                          </div>
                          <div className="text-xs text-gray-500">
                            {fatura.cliente.email}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {formatarData(fatura.dataEmissao)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className={`text-sm ${
                              fatura.vencida
                                ? "text-red-600 font-semibold"
                                : "text-gray-900 dark:text-white"
                            }`}
                          >
                            {formatarData(fatura.dataVencimento)}
                          </div>
                          {!fatura.vencida && fatura.diasAteVencimento && (
                            <div className="text-xs text-gray-500">
                              Em {fatura.diasAteVencimento} dias
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatarMoeda(fatura.valorTotal)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatarMoeda(fatura.valorPendente || 0)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {fatura.percentualPago?.toFixed(1) || 0}% pago
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getFaturaStatusColor(
                              fatura.status
                            )}`}
                          >
                            {getStatusTexto(fatura.status)}
                            {fatura.vencida && " (Vencida)"}
                          </span>
                          {fatura.dataRecebimento && (
                            <div className="text-xs text-gray-500 mt-1">
                              Paga em: {formatarData(fatura.dataRecebimento)}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            {/* Botão para gerar PDF da fatura */}
                            <button
                              onClick={() => handleGerarPDFFatura(fatura)}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                              title="Gerar PDF da Fatura"
                            >
                              <FiDownload className="w-4 h-4 mr-1" />
                              PDF
                            </button>
                            
                            {/* Seu código existente para detalhes e lembretes */}
                            <button
                              onClick={() => exportarDados("faturas")}
                              className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center"
                              title="Ver Detalhes"
                            >
                              <FiSearch className="w-4 h-4 mr-1" />
                              Detalhes
                            </button>
                            
                            {fatura.status === 'pendente' && !fatura.vencida && (
                              <button
                                onClick={() => enviarLembrete(fatura.faturaId)}
                                className="text-yellow-600 hover:text-yellow-800 text-sm font-medium flex items-center"
                                title="Enviar Lembrete"
                              >
                                <FiClock className="w-4 h-4 mr-1" />
                                Lembrete
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
        // Lista de Cotações
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
                {cotacoes.filter((c) => c.status === "aprovado").length}
              </div>
              <div className="text-sm text-gray-500">Cotações Aprovadas</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-yellow-600">
                {
                  cotacoes.filter((c) =>
                    ["pendente", "rascunho", "revisao", "enviado"].includes(
                      c.status
                    )
                  ).length
                }
              </div>
              <div className="text-sm text-gray-500">Cotações Pendentes</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-red-600">
                {cotacoes.filter((c) => c.status === "expirado").length}
              </div>
              <div className="text-sm text-gray-500">Cotações Expiradas</div>
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
                  <button
                    onClick={() => exportarDados("cotacoes")}
                    className="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiDownload className="w-4 h-4" />
                    <span>Exportar CSV</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Número
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Emissão
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray500 dark:text-gray-300 uppercase tracking-wider">
                      Validade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Valor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Probabilidade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {isLoading.cotacoes ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center">
                        <div className="flex justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Carregando cotações...
                        </p>
                      </td>
                    </tr>
                  ) : cotacoes.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center">
                        <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          Nenhuma cotação encontrada
                        </p>
                      </td>
                    </tr>
                  ) : (
                    cotacoes.map((cotacao) => (
                      <tr
                        key={cotacao.quotationId}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {cotacao.numeroQuotation}
                          </div>
                          <div className="text-xs text-gray-500">
                            v{cotacao.versao} • {cotacao.tipoServico}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {cotacao.cliente.nome}
                          </div>
                          <div className="text-xs text-gray-500">
                            {cotacao.cliente.empresa || cotacao.cliente.email}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {formatarData(cotacao.dataEmissao)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className={`text-sm ${
                              cotacao.expirado
                                ? "text-red-600 font-semibold"
                                : "text-gray-900 dark:text-white"
                            }`}
                          >
                            {formatarData(cotacao.dataValidade)}
                          </div>
                          {!cotacao.expirado && (
                            <div className="text-xs text-gray-500">
                              {cotacao.diasAteExpiracao} dias restantes
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatarMoeda(cotacao.valorTotal)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {cotacao.itens.length} itens
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCotacaoStatusColor(
                              cotacao.status
                            )}`}
                          >
                            {getStatusTexto(cotacao.status)}
                          </span>
                          {cotacao.conversao?.faturaId && (
                            <div className="text-xs text-gray-500 mt-1">
                              Fatura: {cotacao.conversao.faturaId}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  cotacao.probabilidadeFechamento >= 70
                                    ? "bg-green-500"
                                    : cotacao.probabilidadeFechamento >= 40
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                                style={{
                                  width: `${Math.min(
                                    100,
                                    cotacao.probabilidadeFechamento
                                  )}%`,
                                }}
                              ></div>
                            </div>
                            <span className="ml-2 text-xs font-medium">
                              {cotacao.probabilidadeFechamento}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            {/* Botão para gerar PDF da cotação */}
                            <button
                              onClick={() => handleGerarPDFCotacao(cotacao)}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                              title="Gerar PDF da Cotação"
                            >
                              <FiDownload className="w-4 h-4 mr-1" />
                              PDF
                            </button>
                            
                            {/* Botão para ver detalhes */}
                            <button
                              onClick={() => exportarDados("cotacoes")}
                              className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center"
                              title="Ver Detalhes"
                            >
                              <FiSearch className="w-4 h-4 mr-1" />
                              Detalhes
                            </button>
                            
                            {/* Botões de aprovação/rejeição */}
                            {["pendente", "revisao", "enviado"].includes(cotacao.status) && (
                              <>
                                <button
                                  onClick={() => atualizarStatusCotacao(cotacao.quotationId, "aprovado")}
                                  className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
                                  title="Aprovar Cotação"
                                >
                                  <FiCheck className="w-4 h-4 mr-1" />
                                  Aprovar
                                </button>
                                <button
                                  onClick={() => atualizarStatusCotacao(cotacao.quotationId, "rejeitado")}
                                  className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                                  title="Rejeitar Cotação"
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
