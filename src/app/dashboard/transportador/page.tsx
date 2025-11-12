// app/dashboard/transportador/page.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FiTruck,
  FiPackage,
  FiDollarSign,
  FiMapPin,
  FiBarChart2,
  FiSettings,
  FiAward,
  FiNavigation,
  FiCheckCircle,
  FiEye,
  FiDownload,
  FiSearch,
  FiPlus,
  FiFilter,
  FiPrinter,
  FiShare2,
  FiMessageSquare,
  FiClock,
  FiCalendar,
  FiBell,
  FiInfo,
  FiPhone,
  FiStar,
  FiAlertTriangle,
  FiFileText,
} from "react-icons/fi";
import { Bar, Line, Doughnut } from "react-chartjs-2";
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

type RelatorioViagem = {
  id: number;
  viagemId: number;
  tipo: "incidente" | "atraso" | "manutencao" | "outro";
  titulo: string;
  descricao: string;
  localizacao?: string;
  dataOcorrencia: string;
  dataRegistro: string;
  imagens?: string[];
  acaoTomada?: string;
  status: "pendente" | "resolvido" | "em_andamento";
  prioridade: "baixa" | "media" | "alta" | "critica";
};

type Expediente = {
  id: number;
  viagemId: number;
  data: string;
  horaInicio: string;
  horaFim: string;
  horasTrabalhadas: number;
  pausas: {
    inicio: string;
    fim: string;
    motivo: string;
  }[];
  observacoes?: string;
};

type ProblemaViagem = {
  id: number;
  viagemId: number;
  tipo: "veiculo" | "carga" | "via" | "cliente" | "outro";
  descricao: string;
  severidade: "baixa" | "media" | "alta" | "critica";
  dataRegistro: string;
  status: "reportado" | "em_resolucao" | "resolvido";
  solucao?: string;
  custoEstimado?: number;
  tempoEstimado?: number; // em horas
};

type ViagemTransportador = {
  id: number;
  numero: string;
  origem: string;
  destino: string;
  status: "disponivel" | "em_viagem" | "concluida" | "cancelada" | "coletando" | "entregando";
  tipoCarga: string;
  dataPartida: string;
  dataChegada: string;
  dataColeta: string;
  dataEntrega: string;
  valorFrete: number;
  pontuacao?: number;
  cliente: string;
  contatoCliente: string;
  distancia: number;
  peso: number;
  volume: number;
  prioridade: "alta" | "media" | "baixa";
  descricao: string;
  observacoes: string;
  documentos: string[];
  veiculo: string;
  combustivel: number;
  pedagios: number;
  despesas: number;
    relatorios: RelatorioViagem[];
  expedientes: Expediente[];
  problemas: ProblemaViagem[];
};

type CargaDisponivel = {
  id: number;
  numero: string;
  origem: string;
  destino: string;
  tipoCarga: string;
  dataColeta: string;
  dataEntrega: string;
  valorFrete: number;
  cliente: string;
  distancia: number;
  peso: number;
  volume: number;
  prioridade: "alta" | "media" | "baixa";
  descricao: string;
  requisitos: string[];
  tempoRestante: string;
};

type DesempenhoMensal = {
  mes: string;
  pontuacao: number;
  viagens: number;
  faturamento: number;
  despesas: number;
  lucro: number;
};

type NotificacaoTransportador = {
  id: number;
  tipo: "info" | "alerta" | "sucesso" | "urgencia";
  titulo: string;
  mensagem: string;
  data: string;
  lido: boolean;
  viagemId?: number;
};

type FaturaTransportador = {
  id: number;
  numero: string;
  dataEmissao: string;
  dataVencimento: string;
  valor: number;
  status: "paga" | "pendente" | "atrasada" | "processando";
  viagens: number[];
  downloadUrl: string;
};

export default function DashboardTransportador() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("viagens");
  const [viagens, setViagens] = useState<ViagemTransportador[]>([]);
  const [cargasDisponiveis, setCargasDisponiveis] = useState<CargaDisponivel[]>([]);
  const [notificacoes, setNotificacoes] = useState<NotificacaoTransportador[]>([]);
  const [faturas, setFaturas] = useState<FaturaTransportador[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [tipoFilter, setTipoFilter] = useState("todos");
  const [selectedViagem, setSelectedViagem] = useState<ViagemTransportador | null>(null);
  const [showViagemModal, setShowViagemModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showNovaDespesaModal, setShowNovaDespesaModal] = useState(false);
  const [showRelatorioModal, setShowRelatorioModal] = useState(false);
  const [showExpedienteModal, setShowExpedienteModal] = useState(false);
  const [showProblemaModal, setShowProblemaModal] = useState(false);
  const [selectedViagemId, setSelectedViagemId] = useState<number | null>(null);
  const [filtrosAvancados, setFiltrosAvancados] = useState({
    prioridade: "todos",
    valorMin: "",
    valorMax: "",
    dataInicio: "",
    dataFim: "",
  });

  const [novoRelatorio, setNovoRelatorio] = useState({
    tipo: "incidente" as "incidente" | "atraso" | "manutencao" | "outro",
    titulo: "",
    descricao: "",
    localizacao: "",
    prioridade: "media" as "baixa" | "media" | "alta" | "critica",
  });

  const [novoExpediente, setNovoExpediente] = useState({
    data: new Date().toISOString().split('T')[0],
    horaInicio: "08:00",
    horaFim: "17:00",
    observacoes: "",
  });

  const [novoProblema, setNovoProblema] = useState({
    tipo: "veiculo" as "veiculo" | "carga" | "via" | "cliente" | "outro",
    descricao: "",
    severidade: "media" as "baixa" | "media" | "alta" | "critica",
    custoEstimado: 0,
    tempoEstimado: 0,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
        return;
      }

      if (user.role !== "transportador") {
        router.push("/dashboard");
        return;
      }

      loadData();
    }
  }, [user, isLoading, router]);

  const loadData = async () => {
    setIsDataLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Dados mock atualizados com os novos campos
    setViagens([
      {
        id: 1,
        numero: "VG-2024-001",
        origem: "Porto da Beira",
        destino: "Harare, Zimbabwe",
        status: "em_viagem",
        tipoCarga: "Contentores",
        dataPartida: "2024-01-15",
        dataChegada: "2024-01-18",
        dataColeta: "2024-01-15",
        dataEntrega: "",
        valorFrete: 85000,
        pontuacao: 92,
        cliente: "ETG (Adubo)",
        contatoCliente: "+258 84 123 4567",
        distancia: 650,
        peso: 25000,
        volume: 68,
        prioridade: "alta",
        descricao: "Transporte de adubo NPK para agricultura",
        observacoes: "Carga sensível à umidade, requer cobertura",
        documentos: ["contrato_001.pdf", "seguro_001.pdf"],
        veiculo: "CAM-1234 - Volvo FH16",
        combustivel: 12000,
        pedagios: 3500,
        despesas: 4500,
        relatorios: [
          {
            id: 1,
            viagemId: 1,
            tipo: "atraso",
            titulo: "Atraso na fronteira",
            descricao: "Fila na fronteira de Machipanda devido a verificação aduaneira",
            localizacao: "Fronteira Machipanda",
            dataOcorrencia: "2024-01-16T10:30:00",
            dataRegistro: "2024-01-16T11:00:00",
            status: "resolvido",
            prioridade: "media",
            acaoTomada: "Aguardado na fila e realizado procedimentos aduaneiros"
          }
        ],
        expedientes: [
          {
            id: 1,
            viagemId: 1,
            data: "2024-01-16",
            horaInicio: "06:00",
            horaFim: "18:00",
            horasTrabalhadas: 12,
            pausas: [
              {
                inicio: "12:00",
                fim: "13:00",
                motivo: "Almoço"
              }
            ],
            observacoes: "Viagem tranquila, bom estado das estradas"
          }
        ],
        problemas: [
          {
            id: 1,
            viagemId: 1,
            tipo: "veiculo",
            descricao: "Pneu furado no eixo traseiro direito",
            severidade: "alta",
            dataRegistro: "2024-01-16T14:20:00",
            status: "resolvido",
            solucao: "Troca do pneu realizado com sucesso",
            custoEstimado: 1500,
            tempoEstimado: 1
          }
        ]
      },
    ]);

    setCargasDisponiveis([
      {
        id: 6,
        numero: "CAR-2024-015",
        origem: "Porto da Beira",
        destino: "Harare, Zimbabwe",
        tipoCarga: "Contentores",
        dataColeta: "2024-01-17",
        dataEntrega: "2024-01-20",
        valorFrete: 88000,
        cliente: "Afrizian",
        distancia: 650,
        peso: 22000,
        volume: 60,
        prioridade: "alta",
        descricao: "Contentores com equipamentos agrícolas",
        requisitos: ["Caminhão baú", "Experiência internacional", "Documentação aduaneira"],
        tempoRestante: "2 dias",
      },
      {
        id: 7,
        numero: "CAR-2024-016",
        origem: "Beira",
        destino: "Tete",
        tipoCarga: "Material Construção",
        dataColeta: "2024-01-18",
        dataEntrega: "2024-01-19",
        valorFrete: 35000,
        cliente: "Som Metal",
        distancia: 450,
        peso: 12000,
        volume: 35,
        prioridade: "media",
        descricao: "Transporte de cimento e ferragens",
        requisitos: ["Caminhão aberto", "Lona de cobertura"],
        tempoRestante: "1 dia",
      },
      {
        id: 8,
        numero: "CAR-2024-017",
        origem: "Maputo",
        destino: "Beira",
        tipoCarga: "Produtos Eletrônicos",
        dataColeta: "2024-01-19",
        dataEntrega: "2024-01-21",
        valorFrete: 65000,
        cliente: "Tech Import",
        distancia: 1200,
        peso: 5000,
        volume: 25,
        prioridade: "alta",
        descricao: "Transporte de equipamentos eletrônicos de alta valor",
        requisitos: ["Caminhão blindado", "Seguro especial", "Rastreamento GPS"],
        tempoRestante: "3 dias",
      },
    ]);

    setNotificacoes([
      {
        id: 1,
        tipo: "alerta",
        titulo: "Manutenção Preventiva",
        mensagem: "Seu veículo CAM-1234 precisa de manutenção preventiva",
        data: "2024-01-16 09:30",
        lido: false,
      },
      {
        id: 2,
        tipo: "info",
        titulo: "Nova Carga Disponível",
        mensagem: "Nova carga disponível para Harare - CAR-2024-015",
        data: "2024-01-16 08:15",
        lido: true,
        viagemId: 6,
      },
      {
        id: 3,
        tipo: "sucesso",
        titulo: "Pagamento Recebido",
        mensagem: "Pagamento da viagem VG-2024-003 foi processado",
        data: "2024-01-15 16:45",
        lido: true,
        viagemId: 3,
      },
    ]);

    setFaturas([
      {
        id: 1,
        numero: "FAT-TRANS-2024-001",
        dataEmissao: "2024-01-01",
        dataVencimento: "2024-01-31",
        valor: 275000,
        status: "paga",
        viagens: [3, 4],
        downloadUrl: "#",
      },
      {
        id: 2,
        numero: "FAT-TRANS-2024-002",
        dataEmissao: "2024-01-15",
        dataVencimento: "2024-02-14",
        valor: 180000,
        status: "processando",
        viagens: [1, 5],
        downloadUrl: "#",
      },
      {
        id: 3,
        numero: "FAT-TRANS-2024-003",
        dataEmissao: "2024-01-16",
        dataVencimento: "2024-02-15",
        valor: 88000,
        status: "pendente",
        viagens: [6],
        downloadUrl: "#",
      },
    ]);

    setIsDataLoading(false);
  };

  // Funções para adicionar relatórios, expedientes e problemas
   const adicionarRelatorio = (viagemId: number) => {
    const relatorio: RelatorioViagem = {
      id: Date.now(),
      viagemId,
      tipo: novoRelatorio.tipo,
      titulo: novoRelatorio.titulo,
      descricao: novoRelatorio.descricao,
      localizacao: novoRelatorio.localizacao,
      dataOcorrencia: new Date().toISOString(),
      dataRegistro: new Date().toISOString(),
      status: "pendente",
      prioridade: novoRelatorio.prioridade,
    };

    setViagens(prevViagens =>
      prevViagens.map(viagem =>
        viagem.id === viagemId
          ? { ...viagem, relatorios: [...viagem.relatorios, relatorio] }
          : viagem
      )
    );

    setShowRelatorioModal(false);
    setNovoRelatorio({
      tipo: "incidente",
      titulo: "",
      descricao: "",
      localizacao: "",
      prioridade: "media",
    });

    alert("Relatório adicionado com sucesso!");
  };

  const adicionarExpediente = (viagemId: number) => {
    const horaInicio = new Date(`${novoExpediente.data}T${novoExpediente.horaInicio}`);
    const horaFim = new Date(`${novoExpediente.data}T${novoExpediente.horaFim}`);
    const horasTrabalhadas = (horaFim.getTime() - horaInicio.getTime()) / (1000 * 60 * 60);

    const expediente: Expediente = {
      id: Date.now(),
      viagemId,
      data: novoExpediente.data,
      horaInicio: novoExpediente.horaInicio,
      horaFim: novoExpediente.horaFim,
      horasTrabalhadas,
      pausas: [],
      observacoes: novoExpediente.observacoes,
    };

    setViagens(prevViagens =>
      prevViagens.map(viagem =>
        viagem.id === viagemId
          ? { ...viagem, expedientes: [...viagem.expedientes, expediente] }
          : viagem
      )
    );

    setShowExpedienteModal(false);
    setNovoExpediente({
      data: new Date().toISOString().split('T')[0],
      horaInicio: "08:00",
      horaFim: "17:00",
      observacoes: "",
    });

    alert("Expediente registrado com sucesso!");
  };

  const adicionarProblema = (viagemId: number) => {
    const problema: ProblemaViagem = {
      id: Date.now(),
      viagemId,
      tipo: novoProblema.tipo,
      descricao: novoProblema.descricao,
      severidade: novoProblema.severidade,
      dataRegistro: new Date().toISOString(),
      status: "reportado",
      custoEstimado: novoProblema.custoEstimado,
      tempoEstimado: novoProblema.tempoEstimado,
    };

    setViagens(prevViagens =>
      prevViagens.map(viagem =>
        viagem.id === viagemId
          ? { ...viagem, problemas: [...viagem.problemas, problema] }
          : viagem
      )
    );

    setShowProblemaModal(false);
    setNovoProblema({
      tipo: "veiculo",
      descricao: "",
      severidade: "media",
      custoEstimado: 0,
      tempoEstimado: 0,
    });

    alert("Problema reportado com sucesso!");
  };

// Funções para abrir os modais
  const abrirModalRelatorio = (viagemId: number) => {
    setSelectedViagemId(viagemId);
    setShowRelatorioModal(true);
  };

  const abrirModalExpediente = (viagemId: number) => {
    setSelectedViagemId(viagemId);
    setShowExpedienteModal(true);
  };

  const abrirModalProblema = (viagemId: number) => {
    setSelectedViagemId(viagemId);
    setShowProblemaModal(true);
  };
  // Métricas do transportador
  const metrics = {
    totalViagens: viagens.length,
    emViagem: viagens.filter((v) => v.status === "em_viagem").length,
    disponiveis: viagens.filter((v) => v.status === "disponivel").length,
    concluidas: viagens.filter((v) => v.status === "concluida").length,
    faturamentoTotal: viagens.reduce((sum, viagem) => sum + viagem.valorFrete, 0),
    faturamentoMes: 580000, // Mock data
    despesasMes: 125000, // Mock data
    pontuacaoMedia:
      viagens
        .filter((v) => v.pontuacao)
        .reduce((sum, v) => sum + (v.pontuacao || 0), 0) /
        viagens.filter((v) => v.pontuacao).length || 0,
    cargasDisponiveis: cargasDisponiveis.length,
    notificacoesNaoLidas: notificacoes.filter((n) => !n.lido).length,
    lucroMes: 455000, // Mock data
  };

  // Dados de desempenho mensal
  const desempenhoMensal: DesempenhoMensal[] = [
    { mes: "Set", pontuacao: 85, viagens: 8, faturamento: 420000, despesas: 98000, lucro: 322000 },
    { mes: "Out", pontuacao: 88, viagens: 10, faturamento: 520000, despesas: 115000, lucro: 405000 },
    { mes: "Nov", pontuacao: 92, viagens: 12, faturamento: 680000, despesas: 135000, lucro: 545000 },
    { mes: "Dez", pontuacao: 90, viagens: 11, faturamento: 620000, despesas: 128000, lucro: 492000 },
    { mes: "Jan", pontuacao: 91, viagens: 9, faturamento: 580000, despesas: 125000, lucro: 455000 },
  ];

  // Filtrar viagens
  const filteredViagens = viagens.filter((viagem) => {
    const matchesSearch =
      viagem.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      viagem.destino.toLowerCase().includes(searchTerm.toLowerCase()) ||
      viagem.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      viagem.veiculo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "todos" || viagem.status === statusFilter;

    const matchesTipo =
      tipoFilter === "todos" || viagem.tipoCarga.toLowerCase().includes(tipoFilter);

    const matchesPrioridade =
      filtrosAvancados.prioridade === "todos" ||
      viagem.prioridade === filtrosAvancados.prioridade;

    const matchesValor =
      (!filtrosAvancados.valorMin || viagem.valorFrete >= Number(filtrosAvancados.valorMin)) &&
      (!filtrosAvancados.valorMax || viagem.valorFrete <= Number(filtrosAvancados.valorMax));

    return matchesSearch && matchesStatus && matchesTipo && matchesPrioridade && matchesValor;
  });


    // Adicionar estas funções auxiliares para os novos tipos
  const getSeveridadeColor = (severidade: string) => {
    switch (severidade) {
      case "critica":
        return "text-red-600 bg-red-50 border border-red-200";
      case "alta":
        return "text-orange-600 bg-orange-50 border border-orange-200";
      case "media":
        return "text-yellow-600 bg-yellow-50 border border-yellow-200";
      case "baixa":
        return "text-green-600 bg-green-50 border border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border border-gray-200";
    }
  };


    const getTipoRelatorioColor = (tipo: string) => {
    switch (tipo) {
      case "incidente":
        return "text-red-600 bg-red-50";
      case "atraso":
        return "text-orange-600 bg-orange-50";
      case "manutencao":
        return "text-blue-600 bg-blue-50";
      case "outro":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };


  // Gráfico de desempenho
  const desempenhoChartData = {
    labels: desempenhoMensal.map((d) => d.mes),
    datasets: [
      {
        label: "Pontuação",
        data: desempenhoMensal.map((d) => d.pontuacao),
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        yAxisID: "y",
      },
      {
        label: "Viagens",
        data: desempenhoMensal.map((d) => d.viagens),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        yAxisID: "y1",
      },
    ],
  };

  // Gráfico de tipos de carga
  const tiposCargaData = {
    labels: ["Contentores", "Carga Geral", "Granel", "Farinha", "Eletrônicos", "Outros"],
    datasets: [
      {
        label: "Viagens por Tipo",
        data: [12, 8, 6, 4, 3, 2],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(107, 114, 128, 0.8)",
        ],
      },
    ],
  };

  // Gráfico de faturamento vs despesas
  const faturamentoChartData = {
    labels: desempenhoMensal.map((d) => d.mes),
    datasets: [
      {
        label: "Faturamento (MZN)",
        data: desempenhoMensal.map((d) => d.faturamento),
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 3,
        fill: true,
      },
      {
        label: "Despesas (MZN)",
        data: desempenhoMensal.map((d) => d.despesas),
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderWidth: 3,
        fill: true,
      },
    ],
  };

  // Funções auxiliares
  const getStatusColor = (status: string) => {
    switch (status) {
      case "concluida":
        return "text-green-600 bg-green-50 border-green-200";
      case "em_viagem":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "disponivel":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "cancelada":
        return "text-red-600 bg-red-50 border-red-200";
      case "coletando":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "entregando":
        return "text-orange-600 bg-orange-50 border-orange-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "concluida":
        return "Concluída";
      case "em_viagem":
        return "Em Viagem";
      case "disponivel":
        return "Disponível";
      case "cancelada":
        return "Cancelada";
      case "coletando":
        return "Coletando";
      case "entregando":
        return "Entregando";
      default:
        return status;
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return "text-red-600 bg-red-50 border border-red-200";
      case "media":
        return "text-yellow-600 bg-yellow-50 border border-yellow-200";
      case "baixa":
        return "text-green-600 bg-green-50 border border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border border-gray-200";
    }
  };

  const getNotificacaoColor = (tipo: string) => {
    switch (tipo) {
      case "urgencia":
        return "bg-red-50 border-red-200 border-l-4 border-l-red-500";
      case "alerta":
        return "bg-yellow-50 border-yellow-200 border-l-4 border-l-yellow-500";
      case "info":
        return "bg-blue-50 border-blue-200 border-l-4 border-l-blue-500";
      case "sucesso":
        return "bg-green-50 border-green-200 border-l-4 border-l-green-500";
      default:
        return "bg-gray-50 border-gray-200 border-l-4 border-l-gray-500";
    }
  };

  const getNotificacaoIcon = (tipo: string) => {
    switch (tipo) {
      case "urgencia":
        return <FiInfo className="text-red-600" />;
      case "alerta":
        return <FiInfo className="text-yellow-600" />;
      case "info":
        return <FiInfo className="text-blue-600" />;
      case "sucesso":
        return <FiCheckCircle className="text-green-600" />;
      default:
        return <FiInfo className="text-gray-600" />;
    }
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN',
      minimumFractionDigits: 2
    }).format(valor);
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-MZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const aceitarCarga = (cargaId: number) => {
    // Lógica para aceitar carga
    const carga = cargasDisponiveis.find(c => c.id === cargaId);
    if (carga) {
      alert(`Carga ${carga.numero} aceita com sucesso!`);
      // Aqui você implementaria a lógica real de aceitação
    }
  };

  const atualizarStatus = (viagemId: number, novoStatus: string) => {
    // Lógica para atualizar status
    setViagens(viagens.map(viagem => 
      viagem.id === viagemId ? { ...viagem, status: novoStatus as never } : viagem
    ));
    alert(`Status da viagem ${viagemId} atualizado para ${getStatusText(novoStatus)}`);
  };

  const visualizarViagem = (viagem: ViagemTransportador) => {
    setSelectedViagem(viagem);
    setShowViagemModal(true);
  };

  const marcarNotificacaoComoLida = (id: number) => {
    setNotificacoes(
      notificacoes.map((notificacao) =>
        notificacao.id === id ? { ...notificacao, lido: true } : notificacao
      )
    );
  };

  const exportarDados = (tipo: 'viagens' | 'desempenho' | 'financeiro') => {
    // Simulação de exportação
    alert(`Exportando ${tipo}...`);
  };

  if (isLoading || !user || user.role !== "transportador") {
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
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-600 rounded-lg">
                  <FiTruck className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Área do Transportador
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user.company} • Mega Logística
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <FiBell className="w-5 h-5" />
                {metrics.notificacoesNaoLidas > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {metrics.notificacoesNaoLidas}
                  </span>
                )}
              </button>
              
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Transportador • Classe 2
                </p>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab("configuracoes")}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <FiSettings className="w-5 h-5" />
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Notificações */}
        {notificacoes.filter((n) => !n.lido).length > 0 && (
          <div className="mb-6 space-y-3 text-gray-950">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Notificações
            </h3>
            {notificacoes
              .filter((n) => !n.lido)
              .map((notificacao) => (
                <div
                  key={notificacao.id}
                  className={`p-4 rounded-lg ${getNotificacaoColor(
                    notificacao.tipo
                  )} transition-all hover:shadow-md cursor-pointer flex justify-between items-center`}
                  onClick={() => marcarNotificacaoComoLida(notificacao.id)}
                >
                  <div className="flex items-center space-x-3">
                    {getNotificacaoIcon(notificacao.tipo)}
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {notificacao.titulo}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {notificacao.mensagem}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{notificacao.data}</span>
                    {notificacao.viagemId && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTab("viagens");
                        }}
                        className="text-green-600 hover:text-green-800 text-sm"
                      >
                        Ver
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Métricas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Faturamento do Mês</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatarMoeda(metrics.faturamentoMes)}
                </p>
                <p className="text-xs text-green-600 mt-1">+12% este mês</p>
              </div>
              <FiDollarSign className="text-green-600 text-xl" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Viagens em Andamento</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metrics.emViagem}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Monitoramento ativo
                </p>
              </div>
              <FiNavigation className="text-blue-600 text-xl" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pontuação</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metrics.pontuacaoMedia.toFixed(0)}
                </p>
                <p className="text-xs text-green-600 mt-1">Excelente</p>
              </div>
              <FiAward className="text-purple-600 text-xl" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Lucro do Mês</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatarMoeda(metrics.lucroMes)}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  +8% vs mês passado
                </p>
              </div>
              <FiStar className="text-yellow-600 text-xl" />
            </div>
          </div>
        </div>

        {/* Navegação */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: "viagens", label: "Minhas Viagens", icon: FiTruck },
              { id: "disponiveis", label: "Cargas Disponíveis", icon: FiPackage },
              { id: "desempenho", label: "Desempenho", icon: FiBarChart2 },
              { id: "financeiro", label: "Financeiro", icon: FiDollarSign },
              { id: "configuracoes", label: "Configurações", icon: FiSettings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-green-500 text-green-600"
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
        {activeTab === "viagens" && (
          <div className="space-y-6">
            {/* Filtros e Busca */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                <div className="flex flex-col lg:flex-row gap-4 flex-1 w-full">
                  <div className="relative flex-1 max-w-md">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar por número, destino, cliente ou veículo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="todos">Todos os Status</option>
                      <option value="disponivel">Disponíveis</option>
                      <option value="coletando">Coletando</option>
                      <option value="em_viagem">Em Viagem</option>
                      <option value="entregando">Entregando</option>
                      <option value="concluida">Concluídas</option>
                      <option value="cancelada">Canceladas</option>
                    </select>

                    <select
                      value={tipoFilter}
                      onChange={(e) => setTipoFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="todos">Todos os Tipos</option>
                      <option value="contentores">Contentores</option>
                      <option value="carga geral">Carga Geral</option>
                      <option value="granel">Granel</option>
                      <option value="farinha">Farinha</option>
                      <option value="eletrônicos">Eletrônicos</option>
                    </select>

                    <button 
                      onClick={() => setFiltrosAvancados(prev => ({ ...prev, prioridade: "todos", valorMin: "", valorMax: "" }))}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <FiFilter className="w-4 h-4" />
                      <span>Limpar Filtros</span>
                    </button>
                  </div>
                </div>
                
                <div className="flex gap-2 w-full lg:w-auto">
                  <button 
                    onClick={() => exportarDados('viagens')}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiDownload className="w-4 h-4" />
                    <span>Exportar</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <FiPlus className="w-4 h-4" />
                    <span>Nova Despesa</span>
                  </button>
                </div>
              </div>

              {/* Filtros Avançados */}
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">Filtros Avançados</h4>
                  <FiFilter className="text-gray-400" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Prioridade
                    </label>
                    <select
                      value={filtrosAvancados.prioridade}
                      onChange={(e) => setFiltrosAvancados(prev => ({ ...prev, prioridade: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="todos">Todas</option>
                      <option value="alta">Alta</option>
                      <option value="media">Média</option>
                      <option value="baixa">Baixa</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Valor Mínimo (MZN)
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={filtrosAvancados.valorMin}
                      onChange={(e) => setFiltrosAvancados(prev => ({ ...prev, valorMin: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Valor Máximo (MZN)
                    </label>
                    <input
                      type="number"
                      placeholder="1000000"
                      value={filtrosAvancados.valorMax}
                      onChange={(e) => setFiltrosAvancados(prev => ({ ...prev, valorMax: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tabela de Viagens */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Minhas Viagens ({filteredViagens.length})
                  </h2>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500">
                      Pontuação Média:{" "}
                      <span className="font-semibold text-green-600">
                        {metrics.pontuacaoMedia.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <FiPrinter className="w-4 h-4" />
                        <span>Imprimir</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <FiShare2 className="w-4 h-4" />
                        <span>Compartilhar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Viagem
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Rota & Veículo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Prioridade
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Frete
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Pontuação
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {isDataLoading ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-8 text-center">
                          <div className="flex justify-center">
                            <Spinner size="md" />
                          </div>
                          <p className="mt-2 text-sm text-gray-500">
                            Carregando viagens...
                          </p>
                        </td>
                      </tr>
                    ) : filteredViagens.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-8 text-center">
                          <FiTruck className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">
                            Nenhuma viagem encontrada
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredViagens.map((viagem) => (
                        <tr
                          key={viagem.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {viagem.numero}
                              </div>
                              <div className="text-xs text-gray-500 flex items-center space-x-1">
                                <FiCalendar className="w-3 h-3" />
                                <span>{formatarData(viagem.dataPartida)}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {viagem.origem} → {viagem.destino}
                            </div>
                            <div className="text-xs text-gray-500">
                              {viagem.distancia} km • {viagem.veiculo}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 dark:text-white">{viagem.cliente}</div>
                            <div className="text-xs text-gray-500 flex items-center space-x-1">
                              <FiPhone className="w-3 h-3" />
                              <span>{viagem.contatoCliente}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col space-y-1">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                  viagem.status
                                )}`}
                              >
                                {getStatusText(viagem.status)}
                              </span>
                              {viagem.dataChegada && (
                                <div className="text-xs text-gray-500 flex items-center space-x-1">
                                  <FiClock className="w-3 h-3" />
                                  <span>Prev: {formatarData(viagem.dataChegada)}</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPrioridadeColor(
                                viagem.prioridade
                              )}`}
                            >
                              {viagem.prioridade.charAt(0).toUpperCase() + viagem.prioridade.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {formatarMoeda(viagem.valorFrete)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {viagem.pontuacao ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {viagem.pontuacao} pts
                              </span>
                            ) : (
                              <span className="text-gray-400 text-sm">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => visualizarViagem(viagem)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                              >
                                <FiEye className="w-4 h-4 mr-1" />
                                Detalhes
                              </button>
                              
                              {viagem.status === "disponivel" && (
                                <button
                                  onClick={() => aceitarCarga(viagem.id)}
                                  className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
                                >
                                  <FiCheckCircle className="w-4 h-4 mr-1" />
                                  Aceitar
                                </button>
                              )}
                              
                              {viagem.status === "em_viagem" && (
                                <button
                                  onClick={() => atualizarStatus(viagem.id, "entregando")}
                                  className="text-orange-600 hover:text-orange-800 text-sm font-medium flex items-center"
                                >
                                  <FiCheckCircle className="w-4 h-4 mr-1" />
                                  Entregar
                                </button>
                              )}
                              
                              {viagem.status === "entregando" && (
                                <button
                                  onClick={() => atualizarStatus(viagem.id, "concluida")}
                                  className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
                                >
                                  <FiCheckCircle className="w-4 h-4 mr-1" />
                                  Concluir
                                </button>
                              )}

                              <button className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center">
                                <FiMessageSquare className="w-4 h-4 mr-1" />
                                Chat
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "disponiveis" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Cargas Disponíveis ({cargasDisponiveis.length})
                </h2>
                <div className="text-sm text-gray-500">
                  Atualizado:{" "}
                  <span className="font-medium">
                    {new Date().toLocaleDateString('pt-MZ')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {cargasDisponiveis.map((carga) => (
                  <div
                    key={carga.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                          {carga.numero}
                        </h3>
                        <p className="text-sm text-gray-500">{carga.cliente}</p>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPrioridadeColor(
                          carga.prioridade
                        )}`}
                      >
                        {carga.prioridade.charAt(0).toUpperCase() + carga.prioridade.slice(1)}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Origem:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{carga.origem}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Destino:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{carga.destino}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Distância:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {carga.distancia} km
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Peso:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{carga.peso} kg</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Volume:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{carga.volume} m³</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Tipo:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{carga.tipoCarga}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Tempo Restante:</span>
                        <span className="font-medium text-orange-600">{carga.tempoRestante}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {carga.descricao}
                      </p>
                      <div className="space-y-1">
                        {carga.requisitos.map((req, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-500">
                            <FiCheckCircle className="w-3 h-3 mr-1 text-green-500" />
                            {req}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-lg font-bold text-green-600">
                        {formatarMoeda(carga.valorFrete)}
                      </div>
                      <button
                        onClick={() => aceitarCarga(carga.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Aceitar Carga
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "desempenho" && (
          <div className="space-y-6">
            {/* Métricas de Desempenho */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-green-600">{metrics.pontuacaoMedia.toFixed(1)}</div>
                <div className="text-sm text-gray-500">Pontuação Média</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-blue-600">{metrics.totalViagens}</div>
                <div className="text-sm text-gray-500">Total de Viagens</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-purple-600">{metrics.concluidas}</div>
                <div className="text-sm text-gray-500">Viagens Concluídas</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-yellow-600">94%</div>
                <div className="text-sm text-gray-500">Taxa de Entrega</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Evolução do Desempenho
                  </h3>
                  <button 
                    onClick={() => exportarDados('desempenho')}
                    className="flex items-center space-x-1 text-sm text-green-600 hover:text-green-800"
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
                      },
                    }}
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Tipos de Carga
                  </h3>
                  <button 
                    onClick={() => exportarDados('desempenho')}
                    className="flex items-center space-x-1 text-sm text-green-600 hover:text-green-800"
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
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Faturamento vs Despesas
                </h3>
                <button 
                  onClick={() => exportarDados('desempenho')}
                  className="flex items-center space-x-1 text-sm text-green-600 hover:text-green-800"
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
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: function (value: string | number) {
                            const num = typeof value === "string" ? parseFloat(value) : value;
                            return `${(num / 1000).toFixed(0)}K MZN`;
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "financeiro" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Gestão Financeira
                </h2>
                <button 
                  onClick={() => exportarDados('financeiro')}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FiDownload className="w-4 h-4" />
                  <span>Exportar Extrato</span>
                </button>
              </div>

              {/* Resumo Financeiro */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">{formatarMoeda(metrics.faturamentoMes)}</div>
                  <div className="text-sm text-green-700 dark:text-green-300">Faturamento do Mês</div>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-600">{formatarMoeda(metrics.despesasMes)}</div>
                  <div className="text-sm text-red-700 dark:text-red-300">Despesas do Mês</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">{formatarMoeda(metrics.lucroMes)}</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Lucro do Mês</div>
                </div>
              </div>

              {/* Faturas */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Minhas Faturas</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Fatura
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
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {faturas.map((fatura) => (
                        <tr key={fatura.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {fatura.numero}
                            </div>
                            <div className="text-xs text-gray-500">
                              {fatura.viagens.length} viagens
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {formatarData(fatura.dataEmissao)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {formatarData(fatura.dataVencimento)}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                            {formatarMoeda(fatura.valor)}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              fatura.status === 'paga' 
                                ? 'bg-green-100 text-green-800'
                                : fatura.status === 'pendente'
                                ? 'bg-yellow-100 text-yellow-800'
                                : fatura.status === 'processando'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {fatura.status.charAt(0).toUpperCase() + fatura.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800 text-sm">
                                Download
                              </button>
                              {fatura.status === 'pendente' && (
                                <button className="text-green-600 hover:text-green-800 text-sm">
                                  Solicitar Pagamento
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "configuracoes" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Configurações da Conta
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Informações do Perfil */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">Informações do Transportador</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Empresa
                      </label>
                      <input
                        type="text"
                        defaultValue={user.company}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Número de Registo
                      </label>
                      <input
                        type="text"
                        defaultValue="TR-2023-04567"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Veículos e Preferências */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">Veículos e Preferências</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Veículo Principal
                      </label>
                      <input
                        type="text"
                        defaultValue="CAM-1234 - Volvo FH16"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Capacidade Máxima (kg)
                      </label>
                      <input
                        type="number"
                        defaultValue="25000"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Notificações por Email
                        </label>
                        <p className="text-xs text-gray-500">Receber alertas por email</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Aceitar Viagens Internacionais
                        </label>
                        <p className="text-xs text-gray-500">Viagens para países vizinhos</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Cancelar
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ações Rápidas */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setActiveTab("disponiveis")}
            className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <FiPackage className="w-5 h-5" />
            <span>Ver Cargas Disponíveis</span>
          </button>
          <button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
            <FiMapPin className="w-5 h-5" />
            <span>Atualizar Localização</span>
          </button>
          <button 
            onClick={() => setShowNovaDespesaModal(true)}
            className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
          >
            <FiPlus className="w-5 h-5" />
            <span>Registrar Despesa</span>
          </button>
        </div>
      </main>

      {/* Modal de Detalhes da Viagem */}
      {showViagemModal && selectedViagem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Detalhes da Viagem - {selectedViagem.numero}
                </h3>
                <button 
                  onClick={() => setShowViagemModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Informações Básicas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Informações da Viagem</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Status:</span>
                      <span className={`text-sm font-medium ${getStatusColor(selectedViagem.status).split(' ')[0]}`}>
                        {getStatusText(selectedViagem.status)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Prioridade:</span>
                      <span className={`text-sm font-medium ${getPrioridadeColor(selectedViagem.prioridade).split(' ')[0]}`}>
                        {selectedViagem.prioridade.charAt(0).toUpperCase() + selectedViagem.prioridade.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Tipo de Carga:</span>
                      <span className="text-sm font-medium">{selectedViagem.tipoCarga}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Veículo:</span>
                      <span className="text-sm font-medium">{selectedViagem.veiculo}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Informações Financeiras</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Valor do Frete:</span>
                      <span className="text-sm font-medium text-green-600">{formatarMoeda(selectedViagem.valorFrete)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Combustível:</span>
                      <span className="text-sm font-medium text-red-600">{formatarMoeda(selectedViagem.combustivel)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Pedágios:</span>
                      <span className="text-sm font-medium text-red-600">{formatarMoeda(selectedViagem.pedagios)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Outras Despesas:</span>
                      <span className="text-sm font-medium text-red-600">{formatarMoeda(selectedViagem.despesas)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-sm font-medium text-gray-500">Lucro Estimado:</span>
                      <span className="text-sm font-medium text-blue-600">
                        {formatarMoeda(selectedViagem.valorFrete - selectedViagem.combustivel - selectedViagem.pedagios - selectedViagem.despesas)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Rota e Datas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Rota</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Origem:</span>
                      <p className="text-sm font-medium">{selectedViagem.origem}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Destino:</span>
                      <p className="text-sm font-medium">{selectedViagem.destino}</p>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Distância:</span>
                      <span className="text-sm font-medium">{selectedViagem.distancia} km</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Datas</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Partida:</span>
                      <span className="text-sm font-medium">{formatarData(selectedViagem.dataPartida)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Previsão de Chegada:</span>
                      <span className="text-sm font-medium">{formatarData(selectedViagem.dataChegada)}</span>
                    </div>
                    {selectedViagem.dataColeta && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Coleta:</span>
                        <span className="text-sm font-medium">{formatarData(selectedViagem.dataColeta)}</span>
                      </div>
                    )}
                    {selectedViagem.dataEntrega && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Entrega:</span>
                        <span className="text-sm font-medium">{formatarData(selectedViagem.dataEntrega)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Cliente e Carga */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Cliente</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Nome:</span>
                      <p className="text-sm font-medium">{selectedViagem.cliente}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Contato:</span>
                      <p className="text-sm font-medium">{selectedViagem.contatoCliente}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Carga</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Peso:</span>
                      <span className="text-sm font-medium">{selectedViagem.peso} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Volume:</span>
                      <span className="text-sm font-medium">{selectedViagem.volume} m³</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Descrição:</span>
                      <p className="text-sm font-medium">{selectedViagem.descricao}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3">Ações Rápidas</h4>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => abrirModalRelatorio(selectedViagem.id)}
                    className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-700 border border-blue-200 dark:border-blue-700 rounded-lg text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    <FiFileText className="w-4 h-4" />
                    <span>Adicionar Relatório</span>
                  </button>
                  <button 
                    onClick={() => abrirModalExpediente(selectedViagem.id)}
                    className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-700 border border-green-200 dark:border-green-700 rounded-lg text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
                  >
                    <FiClock className="w-4 h-4" />
                    <span>Registrar Expediente</span>
                  </button>
                  <button 
                    onClick={() => abrirModalProblema(selectedViagem.id)}
                    className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-700 border border-red-200 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                  >
                    <FiAlertTriangle className="w-4 h-4" />
                    <span>Reportar Problema</span>
                  </button>
                </div>
              </div>
              {/* Nova Seção: Relatórios */}
              {selectedViagem.relatorios.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Relatórios</h4>
                  <div className="space-y-3">
                    {selectedViagem.relatorios.map((relatorio) => (
                      <div key={relatorio.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white">{relatorio.titulo}</h5>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTipoRelatorioColor(relatorio.tipo)}`}>
                                {relatorio.tipo.charAt(0).toUpperCase() + relatorio.tipo.slice(1)}
                              </span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeveridadeColor(relatorio.prioridade)}`}>
                                {relatorio.prioridade.charAt(0).toUpperCase() + relatorio.prioridade.slice(1)}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(relatorio.dataRegistro).toLocaleDateString('pt-MZ')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{relatorio.descricao}</p>
                        {relatorio.localizacao && (
                          <p className="text-xs text-gray-500">Local: {relatorio.localizacao}</p>
                        )}
                        {relatorio.acaoTomada && (
                          <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Ação Tomada:</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{relatorio.acaoTomada}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Nova Seção: Problemas */}
              {selectedViagem.problemas.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Problemas Reportados</h4>
                  <div className="space-y-3">
                    {selectedViagem.problemas.map((problema) => (
                      <div key={problema.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white capitalize">
                              {problema.tipo} - {problema.descricao}
                            </h5>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeveridadeColor(problema.severidade)}`}>
                                {problema.severidade.charAt(0).toUpperCase() + problema.severidade.slice(1)}
                              </span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                problema.status === 'resolvido' ? 'bg-green-100 text-green-800' :
                                problema.status === 'em_resolucao' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {problema.status.replace('_', ' ').charAt(0).toUpperCase() + problema.status.replace('_', ' ').slice(1)}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(problema.dataRegistro).toLocaleDateString('pt-MZ')}
                          </span>
                        </div>
                        {problema.solucao && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            <strong>Solução:</strong> {problema.solucao}
                          </p>
                        )}
                        <div className="flex space-x-4 text-xs text-gray-500">
                          {problema.custoEstimado && problema.custoEstimado > 0 && (
                            <span>Custo: {formatarMoeda(problema.custoEstimado)}</span>
                          )}
                          {problema.tempoEstimado && problema.tempoEstimado > 0 && (
                            <span>Tempo: {problema.tempoEstimado}h</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Nova Seção: Expedientes */}
              {selectedViagem.expedientes.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Expedientes</h4>
                  <div className="space-y-3">
                    {selectedViagem.expedientes.map((expediente) => (
                      <div key={expediente.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-medium text-gray-900 dark:text-white">
                            {formatarData(expediente.data)}
                          </h5>
                          <span className="text-sm font-medium text-blue-600">
                            {expediente.horasTrabalhadas.toFixed(1)} horas
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                          <span>Início: {expediente.horaInicio}</span>
                          <span>Fim: {expediente.horaFim}</span>
                        </div>
                        {expediente.observacoes && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{expediente.observacoes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Observações e Documentos */}
              {selectedViagem.observacoes && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Observações</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    {selectedViagem.observacoes}
                  </p>
                </div>
              )}
              
              {/* Documentos */}
              {selectedViagem.documentos.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Documentos</h4>
                  <div className="space-y-2">
                    {selectedViagem.documentos.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-300">{doc}</span>
                        <button className="text-green-600 hover:text-green-800 text-sm">
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button 
                onClick={() => setShowViagemModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Fechar
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Atualizar Status
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de Adicionar Relatório */}
      {showRelatorioModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Adicionar Relatório de Viagem
                </h3>
                <button 
                  onClick={() => setShowRelatorioModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tipo de Relatório
                </label>
                <select
                  value={novoRelatorio.tipo}
                  onChange={(e) => setNovoRelatorio(prev => ({ ...prev, tipo: e.target.value as never }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700"
                >
                  <option value="incidente">Incidente</option>
                  <option value="atraso">Atraso</option>
                  <option value="manutencao">Manutenção</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  value={novoRelatorio.titulo}
                  onChange={(e) => setNovoRelatorio(prev => ({ ...prev, titulo: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700"
                  placeholder="Digite o título do relatório"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Descrição
                </label>
                <textarea
                  value={novoRelatorio.descricao}
                  onChange={(e) => setNovoRelatorio(prev => ({ ...prev, descricao: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700"
                  placeholder="Descreva o ocorrido em detalhes..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Localização
                </label>
                <input
                  type="text"
                  value={novoRelatorio.localizacao}
                  onChange={(e) => setNovoRelatorio(prev => ({ ...prev, localizacao: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700"
                  placeholder="Onde ocorreu?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Prioridade
                </label>
                <select
                  value={novoRelatorio.prioridade}
                  onChange={(e) => setNovoRelatorio(prev => ({ ...prev, prioridade: e.target.value as never }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700"
                >
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                  <option value="critica">Crítica</option>
                </select>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button 
                onClick={() => setShowRelatorioModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => selectedViagemId && adicionarRelatorio(selectedViagemId)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Adicionar Relatório
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de Adicionar Expediente */}
      {showExpedienteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Registrar Expediente
                </h3>
                <button 
                  onClick={() => setShowExpedienteModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Data
                </label>
                <input
                  type="date"
                  value={novoExpediente.data}
                  onChange={(e) => setNovoExpediente(prev => ({ ...prev, data: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Hora de Início
                  </label>
                  <input
                    type="time"
                    value={novoExpediente.horaInicio}
                    onChange={(e) => setNovoExpediente(prev => ({ ...prev, horaInicio: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Hora de Fim
                  </label>
                  <input
                    type="time"
                    value={novoExpediente.horaFim}
                    onChange={(e) => setNovoExpediente(prev => ({ ...prev, horaFim: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Observações
                </label>
                <textarea
                  value={novoExpediente.observacoes}
                  onChange={(e) => setNovoExpediente(prev => ({ ...prev, observacoes: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700"
                  placeholder="Observações sobre o expediente..."
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button 
                onClick={() => setShowExpedienteModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => selectedViagemId && adicionarExpediente(selectedViagemId)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Registrar Expediente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Adicionar Problema */}
      {showProblemaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Reportar Problema
                </h3>
                <button 
                  onClick={() => setShowProblemaModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tipo de Problema
                </label>
                <select
                  value={novoProblema.tipo}
                  onChange={(e) => setNovoProblema(prev => ({ ...prev, tipo: e.target.value as never }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700"
                >
                  <option value="veiculo">Veículo</option>
                  <option value="carga">Carga</option>
                  <option value="via">Via/Rodovia</option>
                  <option value="cliente">Cliente</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Descrição do Problema
                </label>
                <textarea
                  value={novoProblema.descricao}
                  onChange={(e) => setNovoProblema(prev => ({ ...prev, descricao: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700"
                  placeholder="Descreva o problema em detalhes..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Severidade
                </label>
                <select
                  value={novoProblema.severidade}
                  onChange={(e) => setNovoProblema(prev => ({ ...prev, severidade: e.target.value as never }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700"
                >
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                  <option value="critica">Crítica</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Custo Estimado (MZN)
                  </label>
                  <input
                    type="number"
                    value={novoProblema.custoEstimado}
                    onChange={(e) => setNovoProblema(prev => ({ ...prev, custoEstimado: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tempo Estimado (horas)
                  </label>
                  <input
                    type="number"
                    value={novoProblema.tempoEstimado}
                    onChange={(e) => setNovoProblema(prev => ({ ...prev, tempoEstimado: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button 
                onClick={() => setShowProblemaModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => selectedViagemId && adicionarProblema(selectedViagemId)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Reportar Problema
              </button>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
}