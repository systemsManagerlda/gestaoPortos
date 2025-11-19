/* eslint-disable @typescript-eslint/no-unused-vars */
// app/dashboard/transportador/page.tsx
"use client";

import {
  useAuth,
  useUserType,
  TransportadoraUser,
} from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FiTruck,
  FiPackage,
  FiDollarSign,
  FiMapPin,
  FiBarChart2,
  FiSettings,
  FiCheckCircle,
  FiPlus,
  FiClock,
  FiBell,
  FiInfo,
  FiAlertTriangle,
  FiFileText,
  FiUsers,
} from "react-icons/fi";
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

// Importando os componentes necessários
import { TransportadoraSettings } from "./configuracoes";
import { FinanceiroDashboard } from "./financeiro";
import { MetricsDashboard } from "./desempenho";
import { CargasDisponiveis } from "./disponiveis";
import { FiltrosCargas } from "./viagens";
import {
  FiltrosAvancadosCamioes,
  FiltrosCamioes,
  MetricsCamioes,
} from "./camioes";
import {
  FiltrosAvancadosMotoristas,
  FiltrosMotoristas,
  MetricsMotoristas,
} from "./motoristas";

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

// Tipos baseados no schema da Transportadora
type Transportadora = {
  transportadoraId: number;
  nomeEmpresa: string;
  nif: string;
  email: string;
  website?: string;
  contactos: {
    telefonePrincipal: string;
    telefoneAlternativo?: string;
    emailComercial?: string;
  };
  endereco: {
    provincia: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero?: string;
  };
  tipoServicos: ("chante" | "nacional" | "transito")[];
  capacidadeTotal: {
    totalCamioes: number;
    totalMotoristas: number;
    tonelagemMaxima?: number;
  };
  avaliacaoGeral: number;
  status: "ativa" | "inativa" | "suspensa" | "pendente";
  qualificadaTransito: boolean;
  servicosPermitidos: string[];
};

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
  tempoEstimado?: number;
};

type ViagemTransportador = {
  id: number;
  numero: string;
  origem: string;
  destino: string;
  status:
    | "disponivel"
    | "coletando"
    | "em_viagem"
    | "entregando"
    | "concluida"
    | "cancelada";
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

type TransportadoraAuth = Partial<Transportadora> & {
  transportadoraId: number;
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

// Interfaces para o FiltrosCargas
export type StatusCarga =
  | "planeada"
  | "aguardando_coleta"
  | "coletada"
  | "em_transito"
  | "em_fronteira"
  | "aguardando_desembaraco"
  | "em_entrega"
  | "entregue"
  | "encerrada"
  | "armazenada";
export type PrioridadeCarga = "baixa" | "média" | "alta" | "urgente";
export type TipoCarga =
  | "Contentorizada"
  | "Solta"
  | "Granel"
  | "Frigorífica"
  | "Perigosa";

export interface Carga {
  _id?: string;
  codigo: string;
  tipoCarga: TipoCarga;
  descricao: string;
  naturezaCarga: string;
  pesoBruto: number;
  cliente: string;
  clienteId: number;
  origem: {
    cidade: string;
    local: string;
  };
  destino: {
    cidade: string;
    local: string;
  };
  status: StatusCarga;
  prioridade: PrioridadeCarga;
  valorTotal: number;
  dataColeta?: string;
  dataEntregaPrevista?: string;
  dataEntregaReal?: string;
  motorista?: {
    nome: string;
    telefone: string;
  };
  veiculo?: {
    matricula: string;
    modelo: string;
  };
  dataCriacao: string;
  dataAtualizacao: string;
  volume?: number;
  embalagem?: string;
  pontoAtual?: {
    descricao: string;
    lat: number;
    lng: number;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ocorrencias?: any[];
  documentos?: {
    conhecimentoEmbarque?: string;
    invoice?: string;
  };
}

export interface Metrics {
  totalCargas: number;
  cargasEntregues: number;
  cargasTransito: number;
  cargasAtrasadas: number;
  pesoTotal: number;
  valorTotalFretes: number;
}

export interface FiltrosAvancados {
  prioridade: string;
  valorMin: string;
  valorMax: string;
  dataInicio: string;
  dataFim: string;
  tipoCarga: string;
  naturezaCarga: boolean;
  motoristaEmpresa: string;
}

interface FiltrosCargasProps {
  // Estados
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  tipoFilter: string;
  setTipoFilter: (value: string) => void;
  filtrosAvancados: FiltrosAvancados;
  setFiltrosAvancados: React.Dispatch<React.SetStateAction<FiltrosAvancados>>;

  // Dados
  filteredCargas: Carga[];
  metrics: Metrics;
  isDataLoading: boolean;

  // Funções
  exportarDados: (tipo: string) => void;
  setShowNovaCargaModal: (show: boolean) => void;
  visualizarCarga: (carga: Carga) => void;
  aceitarCarga: (codigo: string) => void;
  atualizarStatus: (codigo: string, status: StatusCarga) => void;

  // Componente Spinner
  Spinner: React.ComponentType<{ size?: string }>;
  nomeEmpresa?: string;
}

// Constantes para os filtros
const STATUS_OPTIONS = [
  { value: "todos", label: "Todos os Status" },
  { value: "planeada", label: "Planeada" },
  { value: "aguardando_coleta", label: "Aguardando Coleta" },
  { value: "coletada", label: "Coletada" },
  { value: "em_transito", label: "Em Trânsito" },
  { value: "em_fronteira", label: "Em Fronteira" },
  { value: "aguardando_desembaraco", label: "Aguardando Desembaraço" },
  { value: "em_entrega", label: "Em Entrega" },
  { value: "entregue", label: "Entregue" },
  { value: "encerrada", label: "Encerrada" },
] as const;

const TIPO_CARGA_OPTIONS = [
  { value: "todos", label: "Todos os Tipos" },
  { value: "Contentorizada", label: "Contentorizada" },
  { value: "Solta", label: "Solta" },
  { value: "Granel", label: "Granel" },
  { value: "Frigorífica", label: "Frigorífica" },
  { value: "Perigosa", label: "Perigosa" },
] as const;

const NATUREZA_CARGA_OPTIONS = [
  { value: "todos", label: "Todas as Naturezas" },
  { value: "perigosa", label: "Perigosa" },
  { value: "não perigosa", label: "Não Perigosa" },
  { value: "sensível", label: "Sensível" },
  { value: "fragil", label: "Frágil" },
] as const;

export default function DashboardTransportador() {
  const { user, logout, isLoading } = useAuth();
  const { isTransportadora } = useUserType();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("viagens");
  const [showNovoCamiaoModal, setShowNovoCamiaoModal] = useState(false);
  const [viagens, setViagens] = useState<ViagemTransportador[]>([]);
  const [showNovoMotoristaModal, setShowNovoMotoristaModal] = useState(false);
  const [showMotoristaDetailsModal, setShowMotoristaDetailsModal] = useState(false);
  const [cargasDisponiveis, setCargasDisponiveis] = useState<CargaDisponivel[]>(
    []
  );
  const [notificacoes, setNotificacoes] = useState<NotificacaoTransportador[]>(
    []
  );
  const [faturas, setFaturas] = useState<FaturaTransportador[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermCamioes, setSearchTermCamioes] = useState("");
  const [searchTermMotoristas, setSearchTermMotoristas] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [statusFilterCamioes, setStatusFilterCamioes] = useState("todos");
  const [categoriaFilter, setCategoriaFilter] = useState("todos");
  const [statusFilterMotoristas, setStatusFilterMotoristas] = useState("todos");
  const [statusContratualFilter, setStatusContratualFilter] = useState("todos");
  const [tipoFilter, setTipoFilter] = useState("todos");
  const [selectedViagem, setSelectedViagem] =
    useState<ViagemTransportador | null>(null);
  const [showViagemModal, setShowViagemModal] = useState(false);
  const [showNovaDespesaModal, setShowNovaDespesaModal] = useState(false);
  const [showRelatorioModal, setShowRelatorioModal] = useState(false);
  const [showExpedienteModal, setShowExpedienteModal] = useState(false);
  const [showProblemaModal, setShowProblemaModal] = useState(false);
  const [selectedViagemId, setSelectedViagemId] = useState<number | null>(null);
  const [novoRelatorio, setNovoRelatorio] = useState({
    tipo: "incidente" as "incidente" | "atraso" | "manutencao" | "outro",
    titulo: "",
    descricao: "",
    localizacao: "",
    prioridade: "media" as "baixa" | "media" | "alta" | "critica",
  });

  const [filtrosAvancados, setFiltrosAvancados] = useState({
    prioridade: "todos",
    valorMin: "",
    valorMax: "",
    dataInicio: "",
    dataFim: "",
    tipoCarga: "todos",
    motoristaEmpresa: false,
    naturezaCarga: "todos",
  });
  const [filtrosIniciais, setFiltrosIniciais] = useState<FiltrosAvancadosMotoristas>({
  status: "todos",
  statusContratual: "todos",
  categoriaCarta: "todos",
  nivelInspecao: "todos",
  empresaMotorista: "",
  qualificadoTransito: "todos",
  avaliacaoMin: "",
  avaliacaoMax: "",
});
  // const filtrosIniciais: FiltrosAvancadosMotoristas = {
  //   status: "",
  //   statusContratual: "",
  //   categoriaCarta: "",
  //   nivelInspecao: "",
  //   empresaMotorista: "",
  //   qualificadoTransito: "",
  //   avaliacaoMin: "",
  //   avaliacaoMax: "",
  // };

  const [filtrosAvancadosCargas, setFiltrosAvancadosCargas] = useState({
    prioridade: "todos",
    valorMin: "",
    valorMax: "",
    dataInicio: "",
    dataFim: "",
    tipoCarga: "todos",
    motoristaEmpresa: false,
    naturezaCarga: "todos",
  });

  const metricsIniciais: MetricsMotoristas = {
    totalMotoristas: 0,
    motoristasAtivos: 0,
    motoristasEmViagem: 0,
    mediaAvaliacao: 0,
    totalKmPercorridos: 0,
    totalViagens: 0,
    transportadoresQualificadosTransito: 0,
    totalCamioesTransportadores: 0,
  };

  const [filtrosCamioes, setFiltrosCamioes] =
  useState<FiltrosAvancadosCamioes>({
    status: "todos",
    categoriaInspecao: "todas",
    tipoCamiao: "todos",
    marca: "todas",
    anoMin: "",
    anoMax: "",
    transportadoraId: "",
    motoristaId: "",
    idTransportadora: 0,
    tipoGPS: "todos",
    gpsStatus: "todos",
  });

  const [novoExpediente, setNovoExpediente] = useState({
    data: new Date().toISOString().split("T")[0],
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

  // Estados para dados da transportadora
  const [transportadoraInfo, setTransportadoraInfo] =
    useState<Transportadora | null>(null);
  const [isLoadingTransportadora, setIsLoadingTransportadora] = useState(true);

  // Obter transportadora do contexto
  const transportadora =
    user?.tipo === "transportadora" ? (user as TransportadoraUser) : null;

  // Componente Spinner
  const Spinner = ({ size = "md" }: { size?: string }) => (
    <div
      className={`animate-spin rounded-full border-2 border-gray-300 border-t-green-600 ${
        size === "md" ? "h-8 w-8" : "h-6 w-6"
      }`}
    ></div>
  );

  // Função exportarDados que estava faltando
  const exportarDados = (tipo: string) => {
    console.log(`Exportando dados do tipo: ${tipo}`);
    // Implementar lógica de exportação aqui
    switch (tipo) {
      case "cargas":
        // Exportar cargas
        break;
      case "financeiro":
        // Exportar dados financeiros
        break;
      default:
        console.log(`Exportando: ${tipo}`);
    }
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

  const handleExportarDados = (tipo: string) => {
    console.log(`Exportando dados de: ${tipo}`);
    // Sua lógica de exportação aqui
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
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
      minimumFractionDigits: 2,
    }).format(valor);
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

    setViagens((prevViagens) =>
      prevViagens.map((viagem) =>
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
    const horaInicio = new Date(
      `${novoExpediente.data}T${novoExpediente.horaInicio}`
    );
    const horaFim = new Date(
      `${novoExpediente.data}T${novoExpediente.horaFim}`
    );
    const horasTrabalhadas =
      (horaFim.getTime() - horaInicio.getTime()) / (1000 * 60 * 60);

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

    setViagens((prevViagens) =>
      prevViagens.map((viagem) =>
        viagem.id === viagemId
          ? { ...viagem, expedientes: [...viagem.expedientes, expediente] }
          : viagem
      )
    );

    setShowExpedienteModal(false);
    setNovoExpediente({
      data: new Date().toISOString().split("T")[0],
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

    setViagens((prevViagens) =>
      prevViagens.map((viagem) =>
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

  const atualizarStatus = (viagemId: number, novoStatus: string) => {
    setViagens(
      viagens.map((viagem) =>
        viagem.id === viagemId
          ? {
              ...viagem,
              status: novoStatus as
                | "disponivel"
                | "coletando"
                | "em_viagem"
                | "entregando"
                | "concluida"
                | "cancelada",
            }
          : viagem
      )
    );
    alert(
      `Status da viagem ${viagemId} atualizado para ${getStatusText(
        novoStatus
      )}`
    );
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

  const formatarData = (data: string | Date): string => {
    const dateObj = data instanceof Date ? data : new Date(data);

    if (isNaN(dateObj.getTime())) return "Data inválida";

    return dateObj.toLocaleDateString("pt-PT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Adaptar viagens para cargas
  const adaptarViagensParaCargas = (
    viagens: ViagemTransportador[]
  ): Carga[] => {
    return viagens.map((viagem) => ({
      codigo: viagem.numero,
      tipoCarga: viagem.tipoCarga as TipoCarga,
      descricao: viagem.descricao,
      naturezaCarga: "não perigosa",
      pesoBruto: viagem.peso,
      cliente: viagem.cliente,
      clienteId: viagem.id,
      origem: {
        cidade: viagem.origem.split(",")[0],
        local: viagem.origem,
      },
      destino: {
        cidade: viagem.destino.split(",")[0],
        local: viagem.destino,
      },
      status: adaptarStatusViagemParaCarga(viagem.status),
      prioridade: viagem.prioridade as PrioridadeCarga,
      valorTotal: viagem.valorFrete,
      dataColeta: viagem.dataColeta,
      dataEntregaPrevista: viagem.dataChegada,
      dataEntregaReal: viagem.dataEntrega,
      dataCriacao: viagem.dataPartida,
      dataAtualizacao: new Date().toISOString(),
      volume: viagem.volume,
      veiculo: {
        matricula: viagem.veiculo.split(" - ")[0],
        modelo: viagem.veiculo.split(" - ")[1] || viagem.veiculo,
      },
    }));
  };

  const adaptarStatusViagemParaCarga = (status: string): StatusCarga => {
    const statusMap: Record<string, StatusCarga> = {
      concluida: "entregue",
      em_viagem: "em_transito",
      disponivel: "planeada",
      coletando: "aguardando_coleta",
      entregando: "em_entrega",
      cancelada: "encerrada",
    };
    return statusMap[status] || "planeada";
  };

  // Filtrar cargas
  const filteredCargas = adaptarViagensParaCargas(viagens).filter((carga) => {
    const matchesSearch =
      carga.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      carga.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      carga.origem.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      carga.destino.cidade.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "todos" || carga.status === statusFilter;

    const matchesTipo =
      tipoFilter === "todos" || carga.tipoCarga === tipoFilter;

    return matchesSearch && matchesStatus && matchesTipo;
  });

  // Métricas adaptadas
  const metrics = {
    totalCargas: viagens.length,
    cargasEntregues: viagens.filter((v) => v.status === "concluida").length,
    cargasTransito: viagens.filter((v) => v.status === "em_viagem").length,
    cargasAtrasadas: 0, // Você pode calcular isso baseado nas datas
    pesoTotal: viagens.reduce((sum, v) => sum + v.peso, 0),
    valorTotalFretes: viagens.reduce((sum, v) => sum + v.valorFrete, 0),
  };
  const metricsCamioes: MetricsCamioes = {
  totalCamioes: transportadora?.totalCamioes || 0,
  disponiveis: 0,
  emViagem: 0,
  emManutencao: 0,
  totalKmPercorridos: 0,
  camioesCategoriaA: 0,
  camioesCategoriaB: 0,
  camioesCategoriaC: 0,
  totalGPSNormal: 0,
  totalGPSVip: 0,
  totalValorRegistroGPS: 0,
};

  // Funções para o FiltrosCargas
  const visualizarCarga = (carga: Carga) => {
    const viagem = viagens.find((v) => v.numero === carga.codigo);
    if (viagem) {
      setSelectedViagem(viagem);
      setShowViagemModal(true);
    }
  };

  const aceitarCarga = (codigo: string) => {
    alert(`Carga ${codigo} aceita com sucesso!`);
    // Implementar lógica de aceitação
  };

  const atualizarStatusCarga = (codigo: string, status: StatusCarga) => {
    const statusMap: Record<StatusCarga, string> = {
      planeada: "disponivel",
      aguardando_coleta: "coletando",
      coletada: "coletando",
      em_transito: "em_viagem",
      em_fronteira: "em_viagem",
      aguardando_desembaraco: "em_viagem",
      em_entrega: "entregando",
      entregue: "concluida",
      encerrada: "cancelada",
      armazenada: "concluida",
    };

    const novoStatusViagem = statusMap[status];
    if (novoStatusViagem) {
      atualizarStatus(
        viagens.findIndex((v) => v.numero === codigo) + 1,
        novoStatusViagem
      );
    }
  };

  const setShowNovaCargaModal = (show: boolean) => {
    // Implementar modal de nova carga
    console.log("Abrir modal de nova carga:", show);
  };

  // Dados mock para demonstração
  useEffect(() => {
    // Simular carregamento de dados
    const loadData = async () => {
      setIsDataLoading(true);
      try {
        // Dados mock de viagens
        const mockViagens: ViagemTransportador[] = [
          {
            id: 1,
            numero: "VG001",
            origem: "Maputo, Mozambique",
            destino: "Beira, Mozambique",
            status: "em_viagem",
            tipoCarga: "Contentorizada",
            dataPartida: "2024-01-15",
            dataChegada: "2024-01-20",
            dataColeta: "2024-01-15",
            dataEntrega: "",
            valorFrete: 25000,
            pontuacao: 4.5,
            cliente: "Empresa ABC Ltda",
            contatoCliente: "+258 84 123 4567",
            distancia: 1200,
            peso: 15000,
            volume: 68,
            prioridade: "alta",
            descricao: "Carga de equipamentos eletrônicos",
            observacoes: "Carga frágil - manusear com cuidado",
            documentos: ["Invoice_001.pdf", "Conhecimento_001.pdf"],
            veiculo: "AB-123-CD - Volvo FH16",
            combustivel: 8000,
            pedagios: 1500,
            despesas: 2000,
            relatorios: [],
            expedientes: [],
            problemas: [],
          },
          {
            id: 2,
            numero: "VG002",
            origem: "Nampula, Mozambique",
            destino: "Pemba, Mozambique",
            status: "disponivel",
            tipoCarga: "Solta",
            dataPartida: "2024-01-18",
            dataChegada: "2024-01-22",
            dataColeta: "",
            dataEntrega: "",
            valorFrete: 18000,
            pontuacao: undefined,
            cliente: "Comércio Geral XYZ",
            contatoCliente: "+258 86 987 6543",
            distancia: 800,
            peso: 8000,
            volume: 45,
            prioridade: "media",
            descricao: "Carga de materiais de construção",
            observacoes: "",
            documentos: ["Invoice_002.pdf"],
            veiculo: "EF-456-GH - Mercedes Actros",
            combustivel: 5000,
            pedagios: 800,
            despesas: 1200,
            relatorios: [],
            expedientes: [],
            problemas: [],
          },
        ];

        setViagens(mockViagens);
        setIsDataLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setIsDataLoading(false);
      }
    };

    loadData();
  }, []);

  // Verificação de autenticação
  useEffect(() => {
    if (!isLoading && (!user || !isTransportadora)) {
      router.push("/login");
    }
  }, [user, isLoading, isTransportadora, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user || !isTransportadora) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FiTruck className="h-8 w-8 text-green-600" />
              <h1 className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                Dashboard Transportador
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <FiBell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 bg-red-600 rounded-full"></span>
              </button>

              {/* Menu de usuário com dropdown para logout */}
              <div className="relative">
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {transportadora?.nomeEmpresa || "Transportadora"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Transportadora {transportadora?.transportadoraId || "ID"}
                    </p>
                  </div>
                  <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-700 transition-colors">
                    <span className="text-white text-sm font-medium">
                      {transportadora?.nomeEmpresa?.charAt(0) || "T"}
                    </span>
                  </div>
                </div>

                {/* Dropdown menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {transportadora?.nomeEmpresa}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {transportadora?.email}
                    </p>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center space-x-2"
                  >
                    <FiSettings className="w-4 h-4" />
                    <span>Sair da Conta</span>
                  </button>
                </div>
              </div>

              {/* Botão de logout simples (alternativa) */}
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FiSettings className="w-4 h-4" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navegação */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: "viagens", label: "Minhas Viagens", icon: FiTruck },
              {
                id: "disponiveis",
                label: "Cargas Disponíveis",
                icon: FiPackage,
              },
              { id: "camioes", label: "Camiões", icon: FiTruck },
              { id: "motoristas", label: "Motoristas", icon: FiUsers },
              { id: "desempenho", label: "Desempenho", icon: FiBarChart2 },
              { id: "financeiro", label: "Financeiro", icon: FiDollarSign },
              { id: "configuracoes", label: "Configurações", icon: FiSettings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-green-500 text-green-600 dark:text-green-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeTab === "viagens" && (
          <FiltrosCargas
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            tipoFilter={tipoFilter}
            setTipoFilter={setTipoFilter}
            filtrosAvancados={filtrosAvancados}
            setFiltrosAvancados={setFiltrosAvancados}
            filteredCargas={filteredCargas}
            metrics={metrics}
            isDataLoading={isDataLoading}
            exportarDados={exportarDados}
            setShowNovaCargaModal={setShowNovaCargaModal}
            visualizarCarga={visualizarCarga}
            aceitarCarga={aceitarCarga}
            atualizarStatus={atualizarStatusCarga}
            Spinner={Spinner}
            nomeEmpresa={transportadora?.nomeEmpresa}
          />
        )}

        {activeTab === "disponiveis" && (
          <CargasDisponiveis
            aceitarCarga={(id: string) => {
              console.log(`Aceitando carga: ${id}`);
              // Implementar lógica de aceitação
            }}
          />
        )}

        {activeTab === "desempenho" && (
          <MetricsDashboard exportarDados={handleExportarDados} />
        )}

        {activeTab === "financeiro" && (
          <FinanceiroDashboard
            formatarMoeda={formatarMoeda}
            formatarData={formatarData}
            exportarDados={exportarDados}
          />
        )}

        {activeTab === "camioes" && (
          <FiltrosCamioes
            searchTerm={searchTermCamioes}
            setSearchTerm={setSearchTermCamioes}
            statusFilter={statusFilterCamioes}
            setStatusFilter={setStatusFilterCamioes}
            categoriaFilter={categoriaFilter}
            setCategoriaFilter={setCategoriaFilter}
            filtrosAvancados={filtrosCamioes}
            setFiltrosAvancados={setFiltrosCamioes}
            filteredCamioes={[]}
            metrics={metricsCamioes}
            isDataLoading={false}
            exportarDados={() => {}}
            setShowNovoCamiaoModal={setShowNovoCamiaoModal}
            showNovoCamiaoModal={showNovoCamiaoModal}
            visualizarCamiao={() => {}}
            associarMotorista={() => {}}
            atualizarStatus={() => {}}
            Spinner={Spinner}
            idTransportadora={transportadora?.transportadoraId || 0}
          />
        )}

        {activeTab === "motoristas" && (
          <FiltrosMotoristas
            searchTerm={searchTermMotoristas}
            setSearchTerm={setSearchTermMotoristas}
            statusFilter={statusFilterMotoristas}
            setStatusFilter={setStatusFilterMotoristas}
            statusContratualFilter={statusContratualFilter}
            setStatusContratualFilter={setStatusContratualFilter}
            filtrosAvancados={filtrosIniciais}
            setFiltrosAvancados={setFiltrosIniciais}
            filteredMotoristas={[]}
            metrics={metricsIniciais}
            isDataLoading={false}
            exportarDados={() => {}}
            setShowNovoMotoristaModal={setShowNovoMotoristaModal}
            showNovoMotoristaModal={showNovoMotoristaModal}
            visualizarMotorista={() => {}}
            adicionarVeiculo={() => {}}
            atualizarStatus={() => {}}
            Spinner={Spinner}
            idTransportadora={transportadora?.transportadoraId || 0}
            nameTransportadora={transportadora?.nomeEmpresa || ""}
            showMotoristaDetailsModal={showMotoristaDetailsModal}
            setShowMotoristaDetailsModal={setShowMotoristaDetailsModal}
          />
        )}
        {activeTab === "configuracoes" && (
          <TransportadoraSettings
            transportadoraInfo={transportadoraInfo}
            user={user}
          />
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
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Informações da Viagem
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Status:
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          getStatusColor(selectedViagem.status).split(" ")[0]
                        }`}
                      >
                        {getStatusText(selectedViagem.status)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Prioridade:
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          getPrioridadeColor(selectedViagem.prioridade).split(
                            " "
                          )[0]
                        }`}
                      >
                        {selectedViagem.prioridade.charAt(0).toUpperCase() +
                          selectedViagem.prioridade.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Tipo de Carga:
                      </span>
                      <span className="text-sm font-medium">
                        {selectedViagem.tipoCarga}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Veículo:
                      </span>
                      <span className="text-sm font-medium">
                        {selectedViagem.veiculo}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Informações Financeiras
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Valor do Frete:
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        {formatarMoeda(selectedViagem.valorFrete)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Combustível:
                      </span>
                      <span className="text-sm font-medium text-red-600">
                        {formatarMoeda(selectedViagem.combustivel)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Pedágios:
                      </span>
                      <span className="text-sm font-medium text-red-600">
                        {formatarMoeda(selectedViagem.pedagios)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Outras Despesas:
                      </span>
                      <span className="text-sm font-medium text-red-600">
                        {formatarMoeda(selectedViagem.despesas)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Lucro Estimado:
                      </span>
                      <span className="text-sm font-medium text-blue-600">
                        {formatarMoeda(
                          selectedViagem.valorFrete -
                            selectedViagem.combustivel -
                            selectedViagem.pedagios -
                            selectedViagem.despesas
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rota e Datas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Rota
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Origem:
                      </span>
                      <p className="text-sm font-medium">
                        {selectedViagem.origem}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Destino:
                      </span>
                      <p className="text-sm font-medium">
                        {selectedViagem.destino}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Distância:
                      </span>
                      <span className="text-sm font-medium">
                        {selectedViagem.distancia} km
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Datas
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Partida:
                      </span>
                      <span className="text-sm font-medium">
                        {formatarData(selectedViagem.dataPartida)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Previsão de Chegada:
                      </span>
                      <span className="text-sm font-medium">
                        {formatarData(selectedViagem.dataChegada)}
                      </span>
                    </div>
                    {selectedViagem.dataColeta && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Coleta:
                        </span>
                        <span className="text-sm font-medium">
                          {formatarData(selectedViagem.dataColeta)}
                        </span>
                      </div>
                    )}
                    {selectedViagem.dataEntrega && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Entrega:
                        </span>
                        <span className="text-sm font-medium">
                          {formatarData(selectedViagem.dataEntrega)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Cliente e Carga */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Cliente
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Nome:
                      </span>
                      <p className="text-sm font-medium">
                        {selectedViagem.cliente}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Contato:
                      </span>
                      <p className="text-sm font-medium">
                        {selectedViagem.contatoCliente}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Carga
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Peso:
                      </span>
                      <span className="text-sm font-medium">
                        {selectedViagem.peso} kg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Volume:
                      </span>
                      <span className="text-sm font-medium">
                        {selectedViagem.volume} m³
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Descrição:
                      </span>
                      <p className="text-sm font-medium">
                        {selectedViagem.descricao}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ações Rápidas */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3">
                  Ações Rápidas
                </h4>
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

              {/* Relatórios */}
              {selectedViagem.relatorios.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Relatórios
                  </h4>
                  <div className="space-y-3">
                    {selectedViagem.relatorios.map((relatorio) => (
                      <div
                        key={relatorio.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white">
                              {relatorio.titulo}
                            </h5>
                            <div className="flex items-center space-x-2 mt-1">
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTipoRelatorioColor(
                                  relatorio.tipo
                                )}`}
                              >
                                {relatorio.tipo.charAt(0).toUpperCase() +
                                  relatorio.tipo.slice(1)}
                              </span>
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeveridadeColor(
                                  relatorio.prioridade
                                )}`}
                              >
                                {relatorio.prioridade.charAt(0).toUpperCase() +
                                  relatorio.prioridade.slice(1)}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(
                              relatorio.dataRegistro
                            ).toLocaleDateString("pt-MZ")}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {relatorio.descricao}
                        </p>
                        {relatorio.localizacao && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Local: {relatorio.localizacao}
                          </p>
                        )}
                        {relatorio.acaoTomada && (
                          <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              Ação Tomada:
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {relatorio.acaoTomada}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Problemas */}
              {selectedViagem.problemas.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Problemas Reportados
                  </h4>
                  <div className="space-y-3">
                    {selectedViagem.problemas.map((problema) => (
                      <div
                        key={problema.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white capitalize">
                              {problema.tipo} - {problema.descricao}
                            </h5>
                            <div className="flex items-center space-x-2 mt-1">
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeveridadeColor(
                                  problema.severidade
                                )}`}
                              >
                                {problema.severidade.charAt(0).toUpperCase() +
                                  problema.severidade.slice(1)}
                              </span>
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  problema.status === "resolvido"
                                    ? "bg-green-100 text-green-800"
                                    : problema.status === "em_resolucao"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {problema.status
                                  .replace("_", " ")
                                  .charAt(0)
                                  .toUpperCase() +
                                  problema.status.replace("_", " ").slice(1)}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(problema.dataRegistro).toLocaleDateString(
                              "pt-MZ"
                            )}
                          </span>
                        </div>
                        {problema.solucao && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            <strong>Solução:</strong> {problema.solucao}
                          </p>
                        )}
                        <div className="flex space-x-4 text-xs text-gray-500 dark:text-gray-400">
                          {problema.custoEstimado &&
                            problema.custoEstimado > 0 && (
                              <span>
                                Custo: {formatarMoeda(problema.custoEstimado)}
                              </span>
                            )}
                          {problema.tempoEstimado &&
                            problema.tempoEstimado > 0 && (
                              <span>Tempo: {problema.tempoEstimado}h</span>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Expedientes */}
              {selectedViagem.expedientes.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Expedientes
                  </h4>
                  <div className="space-y-3">
                    {selectedViagem.expedientes.map((expediente) => (
                      <div
                        key={expediente.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                      >
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
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                            {expediente.observacoes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Observações e Documentos */}
              {selectedViagem.observacoes && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Observações
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    {selectedViagem.observacoes}
                  </p>
                </div>
              )}

              {/* Documentos */}
              {selectedViagem.documentos.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Documentos
                  </h4>
                  <div className="space-y-2">
                    {selectedViagem.documentos.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {doc}
                        </span>
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
                  onChange={(e) =>
                    setNovoRelatorio((prev) => ({
                      ...prev,
                      tipo: e.target.value as
                        | "incidente"
                        | "atraso"
                        | "manutencao"
                        | "outro",
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                  onChange={(e) =>
                    setNovoRelatorio((prev) => ({
                      ...prev,
                      titulo: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Digite o título do relatório"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Descrição
                </label>
                <textarea
                  value={novoRelatorio.descricao}
                  onChange={(e) =>
                    setNovoRelatorio((prev) => ({
                      ...prev,
                      descricao: e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                  onChange={(e) =>
                    setNovoRelatorio((prev) => ({
                      ...prev,
                      localizacao: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Onde ocorreu?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Prioridade
                </label>
                <select
                  value={novoRelatorio.prioridade}
                  onChange={(e) =>
                    setNovoRelatorio((prev) => ({
                      ...prev,
                      prioridade: e.target.value as
                        | "baixa"
                        | "media"
                        | "alta"
                        | "critica",
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                onClick={() =>
                  selectedViagemId && adicionarRelatorio(selectedViagemId)
                }
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
                  onChange={(e) =>
                    setNovoExpediente((prev) => ({
                      ...prev,
                      data: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                    onChange={(e) =>
                      setNovoExpediente((prev) => ({
                        ...prev,
                        horaInicio: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Hora de Fim
                  </label>
                  <input
                    type="time"
                    value={novoExpediente.horaFim}
                    onChange={(e) =>
                      setNovoExpediente((prev) => ({
                        ...prev,
                        horaFim: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Observações
                </label>
                <textarea
                  value={novoExpediente.observacoes}
                  onChange={(e) =>
                    setNovoExpediente((prev) => ({
                      ...prev,
                      observacoes: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                onClick={() =>
                  selectedViagemId && adicionarExpediente(selectedViagemId)
                }
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
                  onChange={(e) =>
                    setNovoProblema((prev) => ({
                      ...prev,
                      tipo: e.target.value as
                        | "veiculo"
                        | "carga"
                        | "via"
                        | "cliente"
                        | "outro",
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                  onChange={(e) =>
                    setNovoProblema((prev) => ({
                      ...prev,
                      descricao: e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Descreva o problema em detalhes..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Severidade
                </label>
                <select
                  value={novoProblema.severidade}
                  onChange={(e) =>
                    setNovoProblema((prev) => ({
                      ...prev,
                      severidade: e.target.value as
                        | "baixa"
                        | "media"
                        | "alta"
                        | "critica",
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                    onChange={(e) =>
                      setNovoProblema((prev) => ({
                        ...prev,
                        custoEstimado: Number(e.target.value),
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                    onChange={(e) =>
                      setNovoProblema((prev) => ({
                        ...prev,
                        tempoEstimado: Number(e.target.value),
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                onClick={() =>
                  selectedViagemId && adicionarProblema(selectedViagemId)
                }
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
