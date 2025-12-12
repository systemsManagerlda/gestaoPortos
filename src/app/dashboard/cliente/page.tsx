/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/dashboard/cliente/page.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect, SetStateAction } from "react";
import Image from "next/image";
import {
  FiPackage,
  FiTruck,
  FiMapPin,
  FiCheckCircle,
  FiAlertTriangle,
  FiDollarSign,
  FiBarChart2,
  FiFileText,
  FiSearch,
  FiPlus,
  FiDownload,
  FiUser,
  FiClock,
  FiInfo,
  FiPrinter,
  FiSettings,
  FiBell,
  FiCamera,
  FiUpload,
  FiEye as FiEyeOn,
  FiX,
  FiMap,
  FiCreditCard,
  FiShield,
  FiEyeOff,
  FiKey,
  FiGlobe,
  FiSave,
  FiTrash2,
  FiLogOut,
  FiChevronDown,
  FiMenu,
} from "react-icons/fi";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Spinner } from "@nextui-org/react";
import CargasComponent from "./minhasCargas";
import { useNoticias } from "@/types/useNoticias";
import { Noticia } from "@/types/noticia";
import NoticiasPage from "./NoticiasPagePrincipal2";
import MainPanel from "@/components/janelas/DefaultPanel";
import FaturasDashboard from "./Facturas";
import RelatoriosDashboard, { CargaStats } from "./Relatorios";
import ConfiguracoesPage from "./ConfiguracoesPage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type CargoCliente = {
  id: number;
  numero: string;
  tipo: string;
  origem: string;
  destino: string;
  status:
    | "pendente"
    | "coletado"
    | "transito"
    | "entregue"
    | "atrasado"
    | "cancelado";
  dataColeta: string;
  dataEntrega: string;
  dataEntregaPrevista: string;
  valor: number;
  motorista?: string;
  veiculo?: string;
  prioridade: "alta" | "media" | "baixa";
  peso: number;
  volume: number;
  descricao: string;
  notas: string;
  documentos: string[];
  estadoRecebimento?: EstadoRecebimento;
};

type EstadoRecebimento = {
  id: number;
  cargoId: number;
  dataReport: string;
  estado: "excelente" | "bom" | "regular" | "ruim" | "pessimo";
  observacoes: string;
  fotos: string[];
  danosIdentificados: boolean;
  descricaoDanos?: string;
  conformidade: boolean;
  assinaturaCliente: string;
};

type AlertaCliente = {
  id: number;
  tipo: "aviso" | "erro" | "info" | "sucesso";
  titulo: string;
  mensagem: string;
  data: string;
  lido: boolean;
  cargoId?: number;
};

type FaturaCliente = {
  id: number;
  numero: string;
  dataEmissao: string;
  dataVencimento: string;
  valor: number;
  status: "paga" | "pendente" | "atrasada";
  cargos: number[];
  downloadUrl: string;
  metodoPagamento?: string;
  dataPagamento?: string;
};

type LocalizacaoCarga = {
  cargoId: number;
  ultimaAtualizacao: string;
  localizacao: string;
  status: string;
  coordenadas?: {
    lat: number;
    lng: number;
  };
  observacao: string;
  velocidade?: number;
  temperatura?: number;
  umidade?: number;
};

type EventoRastreamento = {
  id: number;
  cargoId: number;
  data: string;
  localizacao: string;
  status: string;
  observacao: string;
  tipo: "coleta" | "transito" | "parada" | "inspecao" | "entrega" | "atraso";
};

type UsuarioConfig = {
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
    tema: "claro" | "escuro" | "auto";
    itensPorPagina: number;
    relatoriosAutomaticos: boolean;
    exportarDados: boolean;
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type IntegracaoAPI = {
  id: number;
  nome: string;
  descricao: string;
  ativa: boolean;
  chave: string;
  dataCriacao: string;
  ultimoUso?: string;
};

export default function DashboardCliente() {
  const {
    noticias,
    noticia,
    loading,
    error,
    estatisticas,
    criarNoticia,
    atualizarNoticia,
    deletarNoticia,
    buscarNoticia,
    buscarNoticias,
    buscarNoticiasUrgentes,
    aprovarNoticia,
    arquivarNoticia,
    carregarEstatisticas,
    clearError,
    adicionarArquivosNoticia,
    removerArquivoNoticia,
  } = useNoticias();
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("minhas-cargas");
  const [cargos, setCargos] = useState<CargoCliente[]>([]);
  const [viewingNoticia, setViewingNoticia] = useState<Noticia | null>(null);
  const [alertas, setAlertas] = useState<AlertaCliente[]>([]);
  const [faturas, setFaturas] = useState<FaturaCliente[]>([]);
  const [localizacoes, setLocalizacoes] = useState<LocalizacaoCarga[]>([]);
  const [eventosRastreamento, setEventosRastreamento] = useState<
    EventoRastreamento[]
  >([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [showSenhaAtual, setShowSenhaAtual] = useState(false);
  const [selectedCargo, setSelectedCargo] = useState<CargoCliente | null>(null);
  const [cargoParaRastrear, setCargoParaRastrear] =
    useState<CargoCliente | null>(null);
  const [showCargoModal, setShowCargoModal] = useState(false);
  const [showRastreamentoModal, setShowRastreamentoModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showNovaCargaModal, setShowNovaCargaModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [cargoParaReport, setCargoParaReport] = useState<CargoCliente | null>(
    null
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [notifications, setNotifications] = useState(3);
  const [valorPendete, setValorPendete] = useState(0);
  const [filtros2, setFiltros2] = useState("");
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [cargas, setCargas] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading2, setIsLoading] = useState(false);
  const [filtros, setFiltros] = useState({
    query: "",
    entidade: "",
    setor: "",
    status: "",
  });

  const [formSenha, setFormSenha] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });
  // Estado para configurações
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [configuracoes, setConfiguracoes] = useState<UsuarioConfig>({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    pais: "Moçambique",
    cidade: "",
    endereco: "",
    idioma: "pt",
    fusoHorario: "Africa/Maputo",
    notificacoes: {
      email: true,
      sms: false,
      push: true,
      alertasCarga: true,
      atualizacoesStatus: true,
      notificacoesFinanceiras: true,
    },
    preferencias: {
      tema: "auto",
      itensPorPagina: 25,
      relatoriosAutomaticos: false,
      exportarDados: true,
    },
  });

  const carregarDados = async (filtrosAtuais: any) => {
    setIsLoading(true);
    try {
      // Chamar endpoint de estatísticas
      const response = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/getCargaStats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filtrosAtuais),
      });

      const data = await response.json();
      if (data.returnCode === 200) {
        setStats(data.data);
      }

      // Chamar endpoint de listagem de cargas
      const cargasResponse = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/getCargaList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          curPage: 1,
          pageSize: 100,
          ...filtrosAtuais,
        }),
      });

      const cargasData = await cargasResponse.json();
      if (cargasData.returnCode === 200) {
        setCargas(cargasData.data.list);
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    carregarDados({});
  }, []);

  const handleExportar = (tipo: any) => {
    // Implementar exportação
    console.log(`Exportando ${tipo}`);
  };

  const handleAtualizarFiltros = (
    novosFiltros: SetStateAction<{
      query: string;
      entidade: string;
      setor: string;
      status: string;
    }>
  ) => {
    setFiltros(novosFiltros);
    carregarDados(novosFiltros);
  };

  // Estado para o formulário de report
  const [formReport, setFormReport] = useState({
    estado: "bom" as "excelente" | "bom" | "regular" | "ruim" | "pessimo",
    observacoes: "",
    danosIdentificados: false,
    descricaoDanos: "",
    conformidade: true,
    fotos: [] as File[],
    fotosPreview: [] as string[],
  });

  // Filtros avançados

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
        return;
      }

      // CORREÇÃO: Verificar categoria em vez de role
      if (user.categoria !== "Cliente") {
        router.push("/dashboard");
        return;
      }

      loadData();
    }
  }, [user, isLoading, router]);
  const loadData = async () => {
    setIsDataLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setAlertas([
      {
        id: 1,
        tipo: "aviso",
        titulo: "Carga Atrasada",
        mensagem: "Carga CAR-2024-004 está com atraso de 2 dias",
        data: "2024-01-16 14:30",
        lido: false,
        cargoId: 4,
      },
      {
        id: 2,
        tipo: "info",
        titulo: "Carga em Trânsito",
        mensagem: "Carga CAR-2024-001 está a caminho do Zimbabwe",
        data: "2024-01-16 10:15",
        lido: true,
        cargoId: 1,
      },
      {
        id: 3,
        tipo: "sucesso",
        titulo: "Entrega Concluída",
        mensagem: "Carga CAR-2024-005 foi entregue com sucesso",
        data: "2024-01-09 16:45",
        lido: true,
        cargoId: 5,
      },
    ]);

    setFaturas([
      {
        id: 1,
        numero: "FAT-2024-001",
        dataEmissao: "2024-01-01",
        dataVencimento: "2024-01-31",
        valor: 870000,
        status: "paga",
        cargos: [3, 5],
        downloadUrl: "#",
        metodoPagamento: "Transferência Bancária",
        dataPagamento: "2024-01-28",
      },
      {
        id: 2,
        numero: "FAT-2024-002",
        dataEmissao: "2024-01-15",
        dataVencimento: "2024-02-14",
        valor: 430000,
        status: "pendente",
        cargos: [1, 2],
        downloadUrl: "#",
      },
      {
        id: 3,
        numero: "FAT-2024-003",
        dataEmissao: "2024-01-20",
        dataVencimento: "2024-02-19",
        valor: 290000,
        status: "pendente",
        cargos: [4],
        downloadUrl: "#",
      },
    ]);

    const mockLocalizacoes: LocalizacaoCarga[] = [
      {
        cargoId: 1,
        ultimaAtualizacao: "2024-01-16 14:00",
        localizacao: "Fronteira de Machipanda",
        status: "Em trânsito",
        coordenadas: { lat: -19.1, lng: 33.45 },
        observacao: "Aguardando liberação aduaneira",
        velocidade: 65,
        temperatura: 28,
        umidade: 45,
      },
      {
        cargoId: 4,
        ultimaAtualizacao: "2024-01-16 12:30",
        localizacao: "Posto fiscal da Beira",
        status: "Atrasado",
        coordenadas: { lat: -19.83, lng: 34.85 },
        observacao: "Documentação em análise",
        velocidade: 0,
        temperatura: 32,
        umidade: 60,
      },
    ];

    setLocalizacoes(mockLocalizacoes);

    setEventosRastreamento([
      {
        id: 1,
        cargoId: 1,
        data: "2024-01-15 08:00",
        localizacao: "Porto da Beira",
        status: "Coletado",
        observacao: "Carga coletada com sucesso",
        tipo: "coleta",
      },
      {
        id: 2,
        cargoId: 1,
        data: "2024-01-15 14:30",
        localizacao: "EN6 - Dondo",
        status: "Em trânsito",
        observacao: "Em direção à fronteira",
        tipo: "transito",
      },
      {
        id: 3,
        cargoId: 1,
        data: "2024-01-16 09:15",
        localizacao: "EN6 - Muxúnguè",
        status: "Em trânsito",
        observacao: "Parada para abastecimento",
        tipo: "parada",
      },
      {
        id: 4,
        cargoId: 1,
        data: "2024-01-16 14:00",
        localizacao: "Fronteira de Machipanda",
        status: "Em trânsito",
        observacao: "Aguardando liberação aduaneira",
        tipo: "inspecao",
      },
    ]);

    setIsDataLoading(false);
  };

  // Métricas do cliente
  const metrics = {
    totalCargas: cargos.length,
    emTransito: cargos.filter((c) => c.status === "transito").length,
    entregues: cargos.filter((c) => c.status === "entregue").length,
    atrasadas: cargos.filter((c) => c.status === "atrasado").length,
    valorTotal: cargos.reduce((sum, cargo) => sum + cargo.valor, 0),
    alertasNaoLidos: alertas.filter((a) => !a.lido).length,
    valorPendente: faturas
      .filter((f) => f.status === "pendente")
      .reduce((sum, fatura) => sum + fatura.valor, 0),
    cargasParaReportar: cargos.filter(
      (c) => c.status === "entregue" && !c.estadoRecebimento
    ).length,
    faturasAtrasadas: faturas.filter((f) => f.status === "atrasada").length,
  };

  // Filtrar cargas

  // Funções para rastreamento
  const abrirRastreamentoModal = (cargo: CargoCliente) => {
    setCargoParaRastrear(cargo);
    setShowRastreamentoModal(true);
  };

  const fecharRastreamentoModal = () => {
    setShowRastreamentoModal(false);
    setCargoParaRastrear(null);
  };

  const getEventosCargo = (cargoId: number) => {
    return eventosRastreamento
      .filter((evento) => evento.cargoId === cargoId)
      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
  };

  const getLocalizacaoCargo = (cargoId: number) => {
    return localizacoes.find((loc) => loc.cargoId === cargoId);
  };

  const DEFAULT_FILTROS = {
    dataInicio: "",
    dataFim: "",
    tipoPercurso: "",
    clienteId: "",
  };

  // Funções para o report de estado da carga
  const abrirReportModal = (cargo: CargoCliente) => {
    setCargoParaReport(cargo);
    setFormReport({
      estado: "bom",
      observacoes: "",
      danosIdentificados: false,
      descricaoDanos: "",
      conformidade: true,
      fotos: [],
      fotosPreview: [],
    });
    setShowReportModal(true);
  };

  const fecharReportModal = () => {
    setShowReportModal(false);
    setCargoParaReport(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setFormReport((prev) => ({
      ...prev,
      fotos: [...prev.fotos, ...newFiles],
      fotosPreview: [...prev.fotosPreview, ...newPreviews],
    }));
  };

  const removerFoto = (index: number) => {
    setFormReport((prev) => ({
      ...prev,
      fotos: prev.fotos.filter((_, i) => i !== index),
      fotosPreview: prev.fotosPreview.filter((_, i) => i !== index),
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [integracaoAPI, setIntegracaoAPI] = useState<IntegracaoAPI[]>([
    {
      id: 1,
      nome: "API de Rastreamento",
      descricao:
        "Integração para receber atualizações de rastreamento em tempo real",
      ativa: true,
      chave: "sk_live_xxxxxxxxxxxxxxxx",
      dataCriacao: "2024-01-15",
      ultimoUso: "2024-01-16",
    },
    {
      id: 2,
      nome: "API de Faturas",
      descricao: "Integração para acesso programático às faturas",
      ativa: false,
      chave: "sk_test_yyyyyyyyyyyyyyyy",
      dataCriacao: "2024-01-10",
    },
  ]);

  const submitReport = async () => {
    if (!cargoParaReport) return;

    // Simular upload das fotos e criação do report
    setIsDataLoading(true);

    // Criar objeto de estado de recebimento
    const novoEstadoRecebimento: EstadoRecebimento = {
      id: Date.now(),
      cargoId: cargoParaReport.id,
      dataReport: new Date().toISOString(),
      estado: formReport.estado,
      observacoes: formReport.observacoes,
      fotos: formReport.fotos.map((f) => f.name), // Em produção, seriam URLs dos arquivos upload
      danosIdentificados: formReport.danosIdentificados,
      descricaoDanos: formReport.descricaoDanos,
      conformidade: formReport.conformidade,
      assinaturaCliente: `assinatura_${cargoParaReport.id}.pdf`,
    };

    // Atualizar o cargo com o estado de recebimento
    setCargos((prev) =>
      prev.map((cargo) =>
        cargo.id === cargoParaReport.id
          ? { ...cargo, estadoRecebimento: novoEstadoRecebimento }
          : cargo
      )
    );

    // Adicionar alerta de sucesso
    setAlertas((prev) => [
      ...prev,
      {
        id: Date.now(),
        tipo: "sucesso",
        titulo: "Report de Recebimento Enviado",
        mensagem: `Report da carga ${cargoParaReport.numero} enviado com sucesso`,
        data: new Date().toISOString(),
        lido: false,
        cargoId: cargoParaReport.id,
      },
    ]);

    setIsDataLoading(false);
    fecharReportModal();

    alert("Report de recebimento enviado com sucesso!");
  };

  // Funções para faturas
  const pagarFatura = (faturaId: number) => {
    setFaturas((prev) =>
      prev.map((fatura) =>
        fatura.id === faturaId
          ? {
              ...fatura,
              status: "paga" as const,
              dataPagamento: new Date().toISOString().split("T")[0],
              metodoPagamento: "Transferência Bancária",
            }
          : fatura
      )
    );
    alert("Fatura marcada como paga!");
  };

  const downloadFatura = (faturaId: number) => {
    const fatura = faturas.find((f) => f.id === faturaId);
    if (fatura) {
      alert(`Iniciando download da fatura ${fatura.numero}...`);
      // Em produção, aqui seria o download real do arquivo
    }
  };

  // Gráfico de status das cargas
  const statusChartData = {
    labels: ["Pendentes", "Coletados", "Em Trânsito", "Entregues", "Atrasadas"],
    datasets: [
      {
        label: "Cargas",
        data: [
          cargos.filter((c) => c.status === "pendente").length,
          cargos.filter((c) => c.status === "coletado").length,
          cargos.filter((c) => c.status === "transito").length,
          cargos.filter((c) => c.status === "entregue").length,
          cargos.filter((c) => c.status === "atrasado").length,
        ],
        backgroundColor: [
          "rgba(245, 158, 11, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderWidth: 2,
        borderColor: [
          "rgb(245, 158, 11)",
          "rgb(139, 92, 246)",
          "rgb(59, 130, 246)",
          "rgb(16, 185, 129)",
          "rgb(239, 68, 68)",
        ],
      },
    ],
  };

  // Gráfico de tipos de carga
  const tiposCargaData = {
    labels: ["Adubo", "Cereais", "Equipamentos", "Farinha", "Outros"],
    datasets: [
      {
        label: "Volume (%)",
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(107, 114, 128, 0.8)",
        ],
      },
    ],
  };

  // Gráfico de evolução de faturas
  const faturaChartData = {
    labels: ["Nov", "Dez", "Jan", "Fev", "Mar"],
    datasets: [
      {
        label: "Faturas Pagas",
        data: [1200000, 1500000, 870000, 430000, 0],
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
      },
      {
        label: "Faturas Pendentes",
        data: [300000, 450000, 720000, 430000, 290000],
        borderColor: "rgb(245, 158, 11)",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        fill: true,
      },
    ],
  };

  // Funções auxiliares
  const getStatusColor = (status: string) => {
    switch (status) {
      case "entregue":
        return "text-green-600 bg-green-50 border-green-200";
      case "transito":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "pendente":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "atrasado":
        return "text-red-600 bg-red-50 border-red-200";
      case "coletado":
        return "text-purple-600 bg-purple-50 border-purple-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "entregue":
        return "Entregue";
      case "transito":
        return "Em Trânsito";
      case "pendente":
        return "Pendente";
      case "atrasado":
        return "Atrasado";
      case "coletado":
        return "Coletado";
      default:
        return status;
    }
  };

  const getEstadoRecebimentoColor = (estado: string) => {
    switch (estado) {
      case "excelente":
        return "text-green-600 bg-green-50 border-green-200";
      case "bom":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "regular":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "ruim":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "pessimo":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getEstadoRecebimentoText = (estado: string) => {
    switch (estado) {
      case "excelente":
        return "Excelente";
      case "bom":
        return "Bom";
      case "regular":
        return "Regular";
      case "ruim":
        return "Ruim";
      case "pessimo":
        return "Péssimo";
      default:
        return estado;
    }
  };

  const getAlertaColor = (tipo: string) => {
    switch (tipo) {
      case "erro":
        return "bg-red-50 border-red-200 border-l-4 border-l-red-500";
      case "aviso":
        return "bg-yellow-50 border-yellow-200 border-l-4 border-l-yellow-500";
      case "info":
        return "bg-blue-50 border-blue-200 border-l-4 border-l-blue-500";
      case "sucesso":
        return "bg-green-50 border-green-200 border-l-4 border-l-green-500";
      default:
        return "bg-gray-50 border-gray-200 border-l-4 border-l-gray-500";
    }
  };

  const getAlertaIcon = (tipo: string) => {
    switch (tipo) {
      case "erro":
        return <FiAlertTriangle className="text-red-600" />;
      case "aviso":
        return <FiAlertTriangle className="text-yellow-600" />;
      case "info":
        return <FiInfo className="text-blue-600" />;
      case "sucesso":
        return <FiCheckCircle className="text-green-600" />;
      default:
        return <FiInfo className="text-gray-600" />;
    }
  };

  const getFaturaStatusColor = (status: string) => {
    switch (status) {
      case "paga":
        return "text-green-600 bg-green-50 border-green-200";
      case "pendente":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "atrasada":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getEventoIcon = (tipo: string) => {
    switch (tipo) {
      case "coleta":
        return <FiPackage className="text-blue-500" />;
      case "transito":
        return <FiTruck className="text-green-500" />;
      case "parada":
        return <FiClock className="text-yellow-500" />;
      case "inspecao":
        return <FiSearch className="text-purple-500" />;
      case "entrega":
        return <FiCheckCircle className="text-green-500" />;
      case "atraso":
        return <FiAlertTriangle className="text-red-500" />;
      default:
        return <FiInfo className="text-gray-500" />;
    }
  };

  const marcarAlertaComoLido = (id: number) => {
    setAlertas(
      alertas.map((alerta) =>
        alerta.id === id ? { ...alerta, lido: true } : alerta
      )
    );
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
      minimumFractionDigits: 2,
    }).format(valor);
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-MZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const DEFAULT_STATS: CargaStats = {
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
    ocorrenciasTotal: 0,
  };

  const formatarDataHora = (data: string) => {
    return new Date(data).toLocaleString("pt-MZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const visualizarCargo = (cargo: CargoCliente) => {
    setSelectedCargo(cargo);
    setShowCargoModal(true);
  };

  // Funções para configurações
  const handleConfigChange = (field: string, value: unknown) => {
    setConfiguracoes((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNotificacaoChange = (field: string, value: boolean) => {
    setConfiguracoes((prev) => ({
      ...prev,
      notificacoes: {
        ...prev.notificacoes,
        [field]: value,
      },
    }));
  };

  const salvarConfiguracoes = async () => {
    setIsDataLoading(true);
    // Simular salvamento
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsDataLoading(false);
    alert("Configurações salvas com sucesso!");
  };

  const handlePreferenciaChange = (field: string, value: unknown) => {
    setConfiguracoes((prev) => ({
      ...prev,
      preferencias: {
        ...prev.preferencias,
        [field]: value,
      },
    }));
  };

  const toggleIntegracaoAPI = (id: number) => {
    setIntegracaoAPI((prev) =>
      prev.map((api) => (api.id === id ? { ...api, ativa: !api.ativa } : api))
    );
  };

  const alterarSenha = async () => {
    if (formSenha.novaSenha !== formSenha.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    if (formSenha.novaSenha.length < 6) {
      alert("A nova senha deve ter pelo menos 6 caracteres!");
      return;
    }

    setIsDataLoading(true);
    // Simular alteração de senha
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsDataLoading(false);

    setFormSenha({
      senhaAtual: "",
      novaSenha: "",
      confirmarSenha: "",
    });

    alert("Senha alterada com sucesso!");
  };

  const gerarNovaChaveAPI = (id: number) => {
    setIntegracaoAPI((prev) =>
      prev.map((api) =>
        api.id === id
          ? {
              ...api,
              chave: `sk_live_${Math.random().toString(36).substr(2, 24)}`,
              dataCriacao: new Date().toISOString().split("T")[0],
            }
          : api
      )
    );
    alert("Nova chave API gerada com sucesso!");
  };

  const exportarDados = (tipo: "cargos" | "relatorios" | "faturas") => {
    // Simulação de exportação
    alert(`Exportando ${tipo}...`);
  };
  const handleViewNoticia = async (id: string) => {
    console.log("👀 Visualizando notícia:", id);
    const result = await buscarNoticia(id);
    if (result.success && noticia) {
      setViewingNoticia(noticia);
    } else {
      console.error("❌ Erro ao carregar notícia para visualização");
    }
  };

  const handleArchive = async (id: string) => {
    const result = await arquivarNoticia(id);
    if (result.success) {
      await buscarNoticias(filtros);
      await carregarEstatisticas();
    }
  };

  if (isLoading || !user || user.categoria !== "Cliente") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo e Identificação */}
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-sm">
                  <FiPackage className="text-white text-xl" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                    Área do Cliente
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {user.codigo} • Mega Logística
                  </p>
                </div>
              </div>
            </div>

            {/* Menu para mobile */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Menu"
              >
                <FiMenu className="w-5 h-5" />
              </button>
            </div>

            {/* Área do usuário - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Notificações */}
              <div className="relative">
                <button
                  className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  aria-label={`Notificações ${
                    notifications > 0 ? `(${notifications} não lidas)` : ""
                  }`}
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <FiBell className="w-5 h-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {notifications > 9 ? "9+" : notifications}
                    </span>
                  )}
                </button>

                {/* Dropdown de Notificações */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        Notificações ({notifications})
                      </h3>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {notifications > 0 ? (
                        // Lista de notificações
                        <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                          <FiBell className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p>Nenhuma notificação nova</p>
                        </div>
                      ) : (
                        <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                          <FiBell className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p>Nenhuma notificação</p>
                        </div>
                      )}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                      <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                        Ver todas as notificações
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Informações do usuário */}
              <div className="flex items-center space-x-3">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-32">
                    {user.nome}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Cliente • Porto da Beira
                  </p>
                </div>

                {/* Avatar do usuário */}
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-sm">
                  {user.nome.charAt(0).toUpperCase()}
                </div>

                {/* Menu do usuário */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    aria-label="Menu do usuário"
                  >
                    <FiChevronDown
                      className={`w-4 h-4 transition-transform ${
                        showUserMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown do usuário */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {user.nome}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setActiveTab("perfil");
                          setShowUserMenu(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <FiUser className="w-4 h-4 mr-2" />
                        Meu Perfil
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab("configuracoes");
                          setShowUserMenu(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <FiSettings className="w-4 h-4 mr-2" />
                        Configurações
                      </button>

                      <div className="border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={logout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <FiLogOut className="w-4 h-4 mr-2" />
                          Sair
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        {showMobileMenu && (
          <div className="lg:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2 px-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.nome}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-lg font-medium">
                  {user.nome.charAt(0).toUpperCase()}
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveTab("perfil");
                  setShowMobileMenu(false);
                }}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FiUser className="w-4 h-4 mr-2" />
                Meu Perfil
              </button>

              <button
                onClick={() => {
                  setActiveTab("configuracoes");
                  setShowMobileMenu(false);
                }}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FiSettings className="w-4 h-4 mr-2" />
                Configurações
              </button>

              <button
                onClick={() => {
                  setShowMobileMenu(false);
                  // Lógica para notificações mobile
                }}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FiBell className="w-4 h-4 mr-2" />
                Notificações
                {notifications > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications > 9 ? "9+" : notifications}
                  </span>
                )}
              </button>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                <button
                  onClick={logout}
                  className="flex items-center w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <FiLogOut className="w-4 h-4 mr-2" />
                  Sair
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Alertas */}
        {/* {alertas.filter((a) => !a.lido).length > 0 && (
          <div className="mb-6 space-y-3 text-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Alertas Recentes
            </h3>
            {alertas
              .filter((a) => !a.lido)
              .map((alerta) => (
                <div
                  key={alerta.id}
                  className={`p-4 rounded-lg ${getAlertaColor(
                    alerta.tipo
                  )} transition-all hover:shadow-md cursor-pointer flex justify-between items-center text-gray-950`}
                  onClick={() => marcarAlertaComoLido(alerta.id)}
                >
                  <div className="flex items-center space-x-3 text-gray-950">
                    {getAlertaIcon(alerta.tipo)}
                    <div>
                      <h4 className="font-medium text-gray-900 ">
                        {alerta.titulo}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {alerta.mensagem}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-950">{alerta.data}</span>
                    {alerta.cargoId && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const cargo = cargos.find(
                            (c) => c.id === alerta.cargoId
                          );
                          if (cargo) visualizarCargo(cargo);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Ver Carga
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )} */}

        {/* Métricas Rápidas */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total de Cargas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metrics.totalCargas}
                </p>
                <p className="text-xs text-green-600 mt-1">+2 este mês</p>
              </div>
              <FiPackage className="text-blue-600 text-xl" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Em Trânsito</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metrics.emTransito}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Monitoramento ativo
                </p>
              </div>
              <FiTruck className="text-yellow-600 text-xl" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Valor Pendente</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatarMoeda(metrics.valorPendente)}
                </p>
                <p className="text-xs text-orange-600 mt-1">2 faturas</p>
              </div>
              <FiDollarSign className="text-orange-600 text-xl" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Para Reportar</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metrics.cargasParaReportar}
                </p>
                <p className="text-xs text-purple-600 mt-1">Cargas entregues</p>
              </div>
              <FiCamera className="text-purple-600 text-xl" />
            </div>
          </div>
        </div> */}

        {/* Navegação */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: "minhas-cargas", label: "Minhas Cargas", icon: FiPackage },
              { id: "rastreamento", label: "Rastreamento", icon: FiMapPin },
              { id: "faturas", label: "Faturas", icon: FiFileText },
              { id: "relatorios", label: "Relatórios", icon: FiBarChart2 },
              { id: "noticias", label: "Notícias", icon: FiGlobe }, // ✅ NOVA ABA
              { id: "configuracoes", label: "Configurações", icon: FiSettings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Conteúdo das Tabs */}
        {activeTab === "minhas-cargas" && <CargasComponent />}

        {/* Tab de Rastreamento */}
        {activeTab === "rastreamento" && <MainPanel />}

        {/* Tab de Faturas */}
        {activeTab === "faturas" && (
          <FaturasDashboard  />
        )}

        {activeTab === "relatorios" && (
          <RelatoriosDashboard
            cargas={cargas}
            stats={DEFAULT_STATS}
            isLoading={isLoading2}
            filtros={DEFAULT_FILTROS}
            onExportarDados={handleExportar}
            onAtualizarFiltros={handleAtualizarFiltros}
            formatarMoeda={(valor) =>
              `MZN ${valor.toLocaleString("pt-MZ", {
                minimumFractionDigits: 2,
              })}`
            }
            formatarData={(data) => new Date(data).toLocaleDateString("pt-MZ")}
          />
        )}

        {activeTab === "noticias" && <NoticiasPage />}

        {/* Tab de Configurações */}
        {activeTab === "configuracoes" && (
         <ConfiguracoesPage />
        )}

        {/* Ações Rápidas */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setShowNovaCargaModal(true)}
            className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <FiPlus className="w-5 h-5" />
            <span>Nova Carga</span>
          </button>
          <button
            onClick={() => setActiveTab("rastreamento")}
            className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <FiMapPin className="w-5 h-5" />
            <span>Rastrear Carga</span>
          </button>
          <button
            onClick={() => exportarDados("relatorios")}
            className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
          >
            <FiFileText className="w-5 h-5" />
            <span>Relatório Mensal</span>
          </button>
        </div>
      </main>

      {/* Modal de Rastreamento */}
      {showRastreamentoModal && cargoParaRastrear && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Rastreamento - {cargoParaRastrear.numero}
                </h3>
                <button
                  onClick={fecharRastreamentoModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Informações da Carga */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Informações da Carga
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tipo:</span>
                      <span className="font-medium">
                        {cargoParaRastrear.tipo}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Origem:</span>
                      <span className="font-medium">
                        {cargoParaRastrear.origem}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Destino:</span>
                      <span className="font-medium">
                        {cargoParaRastrear.destino}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Motorista:</span>
                      <span className="font-medium">
                        {cargoParaRastrear.motorista || "Não informado"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Veículo:</span>
                      <span className="font-medium">
                        {cargoParaRastrear.veiculo || "Não informado"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Atual */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Status Atual
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-500">Status:</span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            cargoParaRastrear.status
                          )}`}
                        >
                          {getStatusText(cargoParaRastrear.status)}
                        </span>
                      </div>
                    </div>

                    {(() => {
                      const localizacao = getLocalizacaoCargo(
                        cargoParaRastrear.id
                      );
                      if (localizacao) {
                        return (
                          <>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">
                                Localização:
                              </span>
                              <span className="font-medium">
                                {localizacao.localizacao}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">
                                Última atualização:
                              </span>
                              <span className="font-medium">
                                {formatarDataHora(
                                  localizacao.ultimaAtualizacao
                                )}
                              </span>
                            </div>
                            {localizacao.velocidade !== undefined && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">
                                  Velocidade:
                                </span>
                                <span className="font-medium">
                                  {localizacao.velocidade} km/h
                                </span>
                              </div>
                            )}
                            {localizacao.temperatura !== undefined && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">
                                  Temperatura:
                                </span>
                                <span className="font-medium">
                                  {localizacao.temperatura}°C
                                </span>
                              </div>
                            )}
                          </>
                        );
                      }
                      return (
                        <div className="text-center py-4">
                          <FiClock className="w-8 h-8 text-gray-400 mx-auto" />
                          <p className="text-sm text-gray-500 mt-2">
                            Aguardando atualização de localização
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* Mapa */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Localização em Tempo Real
                </h4>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <FiMap className="w-12 h-12 text-gray-400 mx-auto" />
                    <p className="mt-2 text-gray-500">Mapa de rastreamento</p>
                    <p className="text-sm text-gray-400">
                      Mostrando rota de {cargoParaRastrear.origem} para{" "}
                      {cargoParaRastrear.destino}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline de Eventos */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Histórico de Rastreamento
                </h4>
                <div className="space-y-4">
                  {getEventosCargo(cargoParaRastrear.id).map(
                    (evento, index) => (
                      <div key={evento.id} className="flex">
                        <div className="flex flex-col items-center mr-4">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              index === 0 ? "bg-green-500" : "bg-blue-500"
                            }`}
                          ></div>
                          {index <
                            getEventosCargo(cargoParaRastrear.id).length -
                              1 && (
                            <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-600 mt-1"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-2">
                              {getEventoIcon(evento.tipo)}
                              <span className="font-medium text-gray-900 dark:text-white">
                                {evento.status}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {formatarDataHora(evento.data)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {evento.localizacao}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {evento.observacao}
                          </p>
                        </div>
                      </div>
                    )
                  )}

                  {getEventosCargo(cargoParaRastrear.id).length === 0 && (
                    <div className="text-center py-8">
                      <FiClock className="w-8 h-8 text-gray-400 mx-auto" />
                      <p className="text-sm text-gray-500 mt-2">
                        Nenhum evento de rastreamento registrado
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button
                onClick={fecharRastreamentoModal}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  // Simular notificação de atualização
                  alert("Notificações ativadas para esta carga!");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <FiBell className="w-4 h-4" />
                <span>Ativar Notificações</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Report de Estado da Carga */}
      {showReportModal && cargoParaReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Reportar Estado da Carga - {cargoParaReport.numero}
                </h3>
                <button
                  onClick={fecharReportModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Informações da Carga */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Informações da Carga
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Tipo:</span>
                    <span className="ml-2 font-medium">
                      {cargoParaReport.tipo}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Destino:</span>
                    <span className="ml-2 font-medium">
                      {cargoParaReport.destino}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Data de Entrega:</span>
                    <span className="ml-2 font-medium">
                      {formatarData(cargoParaReport.dataEntrega)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Motorista:</span>
                    <span className="ml-2 font-medium">
                      {cargoParaReport.motorista || "Não informado"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Estado da Carga */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Estado da Carga ao Receber
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {[
                    {
                      value: "excelente",
                      label: "Excelente",
                      color: "bg-green-500",
                    },
                    { value: "bom", label: "Bom", color: "bg-blue-500" },
                    {
                      value: "regular",
                      label: "Regular",
                      color: "bg-yellow-500",
                    },
                    { value: "ruim", label: "Ruim", color: "bg-orange-500" },
                    { value: "pessimo", label: "Péssimo", color: "bg-red-500" },
                  ].map((opcao) => (
                    <button
                      key={opcao.value}
                      onClick={() =>
                        setFormReport((prev) => ({
                          ...prev,
                          estado: opcao.value as never,
                        }))
                      }
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        formReport.estado === opcao.value
                          ? `border-gray-900 dark:border-white ${opcao.color} text-white`
                          : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                      }`}
                    >
                      <div className="text-sm font-medium">{opcao.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload de Fotos */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Fotos da Carga Recebida
                </h4>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fotos-carga"
                  />
                  <label
                    htmlFor="fotos-carga"
                    className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                  >
                    <FiUpload className="w-8 h-8 text-gray-400" />
                    <div>
                      <span className="text-blue-600 hover:text-blue-800 font-medium">
                        Clique para fazer upload
                      </span>
                      <span className="text-gray-500">
                        {" "}
                        ou arraste as fotos
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, JPEG até 10MB cada
                    </p>
                  </label>
                </div>

                {/* Preview das Fotos */}
                {formReport.fotosPreview.length > 0 && (
                  <div className="mt-4">
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Fotos selecionadas ({formReport.fotosPreview.length})
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {formReport.fotosPreview.map((preview, index) => (
                        <div key={index} className="relative group">
                          <div className="relative w-full h-24">
                            <Image
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <button
                            onClick={() => removerFoto(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FiX className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Observações */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Observações
                </h4>
                <textarea
                  rows={4}
                  placeholder="Descreva o estado da carga, condições de entrega, observações importantes..."
                  value={formReport.observacoes}
                  onChange={(e) =>
                    setFormReport((prev) => ({
                      ...prev,
                      observacoes: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Danos Identificados */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="danos-identificados"
                    checked={formReport.danosIdentificados}
                    onChange={(e) =>
                      setFormReport((prev) => ({
                        ...prev,
                        danosIdentificados: e.target.checked,
                        descricaoDanos: e.target.checked
                          ? prev.descricaoDanos
                          : "",
                      }))
                    }
                    className="rounded"
                  />
                  <label
                    htmlFor="danos-identificados"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Foram identificados danos na carga?
                  </label>
                </div>

                {formReport.danosIdentificados && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Descrição dos Danos
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Descreva os danos identificados, localização, gravidade..."
                      value={formReport.descricaoDanos}
                      onChange={(e) =>
                        setFormReport((prev) => ({
                          ...prev,
                          descricaoDanos: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                )}
              </div>

              {/* Conformidade */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="conformidade"
                  checked={formReport.conformidade}
                  onChange={(e) =>
                    setFormReport((prev) => ({
                      ...prev,
                      conformidade: e.target.checked,
                    }))
                  }
                  className="rounded"
                />
                <label
                  htmlFor="conformidade"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Declaro que a carga foi recebida e está conforme o esperado
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button
                onClick={fecharReportModal}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={submitReport}
                disabled={isDataLoading || !formReport.conformidade}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {isDataLoading ? (
                  <>
                    <Spinner size="sm" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <FiCamera className="w-4 h-4" />
                    <span>Enviar Report</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes da Carga (atualizado para mostrar estado de recebimento) */}
      {showCargoModal && selectedCargo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Detalhes da Carga - {selectedCargo.numero}
                </h3>
                <button
                  onClick={() => setShowCargoModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Informações Básicas */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Informações Básicas
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">
                      Tipo de Carga
                    </label>
                    <p className="text-sm font-medium">{selectedCargo.tipo}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Prioridade</label>
                    <p className="text-sm font-medium capitalize">
                      {selectedCargo.prioridade}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Peso</label>
                    <p className="text-sm font-medium">
                      {selectedCargo.peso} kg
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Volume</label>
                    <p className="text-sm font-medium">
                      {selectedCargo.volume} m³
                    </p>
                  </div>
                </div>
              </div>

              {/* Rota */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Rota
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Origem</label>
                    <p className="text-sm font-medium">
                      {selectedCargo.origem}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Destino</label>
                    <p className="text-sm font-medium">
                      {selectedCargo.destino}
                    </p>
                  </div>
                </div>
              </div>

              {/* Datas */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Datas
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">
                      Data de Coleta
                    </label>
                    <p className="text-sm font-medium">
                      {formatarData(selectedCargo.dataColeta)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Previsão de Entrega
                    </label>
                    <p className="text-sm font-medium">
                      {formatarData(selectedCargo.dataEntregaPrevista)}
                    </p>
                  </div>
                  {selectedCargo.dataEntrega && (
                    <div>
                      <label className="text-sm text-gray-500">
                        Data de Entrega
                      </label>
                      <p className="text-sm font-medium">
                        {formatarData(selectedCargo.dataEntrega)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Valor */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Valor
                </h4>
                <p className="text-2xl font-bold text-blue-600">
                  {formatarMoeda(selectedCargo.valor)}
                </p>
              </div>

              {/* Descrição e Notas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Descrição
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {selectedCargo.descricao}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Notas
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {selectedCargo.notas}
                  </p>
                </div>
              </div>

              {/* Documentos */}
              {selectedCargo.documentos.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Documentos
                  </h4>
                  <div className="space-y-2">
                    {selectedCargo.documentos.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {doc}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Estado de Recebimento */}
              {selectedCargo.estadoRecebimento && (
                <div className="border-t pt-6 mt-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Estado de Recebimento
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Estado:</span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoRecebimentoColor(
                          selectedCargo.estadoRecebimento.estado
                        )}`}
                      >
                        {getEstadoRecebimentoText(
                          selectedCargo.estadoRecebimento.estado
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Data do Report:
                      </span>
                      <span className="text-sm font-medium">
                        {formatarData(
                          selectedCargo.estadoRecebimento.dataReport
                        )}
                      </span>
                    </div>

                    {selectedCargo.estadoRecebimento.observacoes && (
                      <div>
                        <span className="text-sm text-gray-500">
                          Observações:
                        </span>
                        <p className="text-sm mt-1">
                          {selectedCargo.estadoRecebimento.observacoes}
                        </p>
                      </div>
                    )}

                    {selectedCargo.estadoRecebimento.danosIdentificados && (
                      <div>
                        <span className="text-sm text-gray-500">
                          Danos Identificados:
                        </span>
                        <p className="text-sm mt-1 text-red-600">
                          {selectedCargo.estadoRecebimento.descricaoDanos}
                        </p>
                      </div>
                    )}

                    {selectedCargo.estadoRecebimento.fotos.length > 0 && (
                      <div>
                        <span className="text-sm text-gray-500">Fotos:</span>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {selectedCargo.estadoRecebimento.fotos.map(
                            (foto, index) => (
                              <div
                                key={index}
                                className="bg-white dark:bg-gray-600 rounded p-2 text-center"
                              >
                                <FiCamera className="w-6 h-6 mx-auto text-gray-400" />
                                <p className="text-xs mt-1 truncate">{foto}</p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              {selectedCargo.status === "entregue" &&
                !selectedCargo.estadoRecebimento && (
                  <button
                    onClick={() => {
                      setShowCargoModal(false);
                      abrirReportModal(selectedCargo);
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                  >
                    <FiCamera className="w-4 h-4" />
                    <span>Reportar Estado</span>
                  </button>
                )}
              <button
                onClick={() => setShowCargoModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
