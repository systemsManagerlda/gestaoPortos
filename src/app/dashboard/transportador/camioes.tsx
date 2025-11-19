import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiPlus,
  FiPrinter,
  FiShare2,
  FiTruck,
  FiCalendar,
  FiEye,
  FiCheckCircle,
  FiMessageSquare,
  FiMapPin,
  FiUser,
  FiSettings,
  FiAlertTriangle,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiCamera,
  FiShield,
} from "react-icons/fi";
import { CreateCamiaoData, NovoCamiaoModal } from "./modelNovoCamiao";
import { criarNovoCamiao } from "./criarNovoCamiao";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { CamiaoDetailsModal } from "./CamiaoDetailsModal";
import {
  MotoristaAssociado,
  MotoristaAssociadoDetailsModal,
} from "./MotoristaAssociadoDetailsModal";
import { ManutencaoDetailsModal } from "./ManutencaoDetailsModal";

// Interfaces para Camiões
export type StatusCamiao =
  | "disponivel"
  | "em_viagem"
  | "manutencao"
  | "inativo"
  | "reservado";
export type TipoCamiao =
  | "rigido"
  | "articulado"
  | "reboque"
  | "tanque"
  | "frigorifico";
export type CategoriaInspecao = "A" | "B" | "C";
export type ResultadoInspecao =
  | "aprovado"
  | "aprovado_com_ressalvas"
  | "reprovado";
export type TipoGPS = "normal" | "vip";
export type StatusGPS = "ativo" | "inativo" | "pendente" | "expirado";

export interface Camiao {
  _id?: string;
  camiaoId: number;
  matricula: string;
  marca: string;
  modelo: string;
  anoFabricacao: number;
  cor?: string;

  // Associações
  transportadoraId: number;
  motoristaId: number;
  codigoGPS: string;

  // Tipo de GPS e Registro
  tipoGPS: {
    tipo: TipoGPS;
    descricao: string;
    valorRegistro: number;
    dataAtivacao: string;
    dataExpiracao?: string;
    status: StatusGPS;
  };

  // Especificações GPS VIP
  gpsVip?: {
    camera: {
      possui: boolean;
      modelo?: string;
      resolucao?: string;
      dataInstalacao?: string;
      status: "operacional" | "manutencao" | "defeito";
    };
    controleMotorista: {
      possui: boolean;
      tipoControle?: "biometrico" | "rfid" | "app" | "codigo";
      dataInstalacao?: string;
      ultimaAtualizacao?: string;
    };
    recursosAdicionais: {
      monitoramentoTempoReal: boolean;
      alertasVelocidade: boolean;
      relatoriosDesempenho: boolean;
      geofencing: boolean;
      comunicacaoAudio: boolean;
    };
  };

  // Especificações técnicas
  especificacoes: {
    tipo: TipoCamiao;
    pesoBruto: number;
    tara: number;
    cargaUtil: number;
    comprimento?: number;
    largura?: number;
    altura?: number;
    volumeUtil?: number;
    numEixos: number;
  };

  // Documentação
  documentacao: {
    registroComercial?: string;
    seguro: {
      numeroApolice: string;
      seguradora: string;
      dataEmissao: string;
      dataValidade: string;
      cobertura?: string;
    };
    licencaOperacao?: {
      numero: string;
      dataEmissao: string;
      dataValidade: string;
      categoria: string;
    };
    certificadoGPS?: {
      numero: string;
      dataEmissao: string;
      dataValidade: string;
      tipo: TipoGPS;
    };
  };

  // Inspeção
  nivelInspecao: {
    categoria: CategoriaInspecao;
    descricao: string;
    dataUltimaInspecao: string;
    dataProximaInspecao?: string;
    resultadoUltimaInspecao: ResultadoInspecao;
    centroInspecao?: string;
    observacoes?: string;
  };

  // Viabilidade
  viabilidade: {
    podeChante: boolean;
    podeNacional: boolean;
    podeTransito: boolean;
    podeGPSVip: boolean;
    motivos: string[];
  };

  // Manutenção e estado
  manutencao?: {
    proximaManutencao?: string;
    ultimaManutencao?: string;
    kmUltimaManutencao?: number;
    periodicidadeManutencao?: number;
    manutencaoGPS?: {
      ultimaManutencao?: string;
      proximaManutencao?: string;
      observacoes?: string;
    };
  };

  estado: {
    tipo: "novo" | "seminovo" | "usado" | "recondicionado";
    observacoes?: string;
    dataAvaliacao?: string;
  };

  // Histórico
  historicoUtilizacao?: {
    totalKmPercorridos: number;
    totalViagens: number;
    dataPrimeiraUtilizacao?: string;
    dataUltimaUtilizacao?: string;
    consumoMedio?: number;
    viagensComGPSVip?: number;
    totalHorasMonitoradas?: number;
  };

  // Status operacional
  status: StatusCamiao;
  disponibilidade: {
    tipoServico: string[];
    regioes: string[];
    observacoes?: string;
  };

  // Metadados
  dataCriacao: string;
  dataAtualizacao: string;
  criadoPor?: string;
  atualizadoPor?: string;
  observacoes?: string;
  fotos?: string[];
  fotosGPS?: string[];
}

export interface MetricsCamioes {
  totalCamioes: number;
  disponiveis: number;
  emViagem: number;
  emManutencao: number;
  totalKmPercorridos: number;
  camioesCategoriaA: number;
  camioesCategoriaB: number;
  camioesCategoriaC: number;
  totalGPSNormal: number;
  totalGPSVip: number;
  totalValorRegistroGPS: number;
}

export interface FiltrosAvancadosCamioes {
  status: string;
  categoriaInspecao: string;
  tipoCamiao: string;
  marca: string;
  anoMin: string;
  anoMax: string;
  transportadoraId: string;
  motoristaId: string;
  idTransportadora: number;
  tipoGPS: string;
  gpsStatus: string;
}

interface FiltrosCamioesProps {
  // Estados
  searchTerm: string;
  idTransportadora: number;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  categoriaFilter: string;
  setCategoriaFilter: (value: string) => void;
  filtrosAvancados: FiltrosAvancadosCamioes;
  setFiltrosAvancados: React.Dispatch<
    React.SetStateAction<FiltrosAvancadosCamioes>
  >;

  // Dados
  filteredCamioes: Camiao[];
  metrics: MetricsCamioes;
  isDataLoading: boolean;
  showNovoCamiaoModal: boolean;

  // Funções
  exportarDados: (tipo: string) => void;
  setShowNovoCamiaoModal: (show: boolean) => void;
  visualizarCamiao: (camiao: Camiao) => void;
  associarMotorista: (camiaoId: number) => void;
  atualizarStatus: (camiaoId: number, status: StatusCamiao) => void;

  // Componente Spinner
  Spinner: React.ComponentType<{ size?: string }>;
}

// Constantes para os filtros
const STATUS_OPTIONS = [
  { value: "todos", label: "Todos os Status" },
  { value: "disponivel", label: "Disponível" },
  { value: "em_viagem", label: "Em Viagem" },
  { value: "manutencao", label: "Em Manutenção" },
  { value: "inativo", label: "Inativo" },
  { value: "reservado", label: "Reservado" },
] as const;

const CATEGORIA_OPTIONS = [
  { value: "todos", label: "Todas as Categorias" },
  { value: "A", label: "A - Chanté" },
  { value: "B", label: "B - Nacional" },
  { value: "C", label: "C - Trânsito" },
] as const;

const TIPO_CAMIAO_OPTIONS = [
  { value: "todos", label: "Todos os Tipos" },
  { value: "rigido", label: "Rígido" },
  { value: "articulado", label: "Articulado" },
  { value: "reboque", label: "Reboque" },
  { value: "tanque", label: "Tanque" },
  { value: "frigorifico", label: "Frigorífico" },
] as const;

const TIPO_GPS_OPTIONS = [
  { value: "todos", label: "Todos os GPS" },
  { value: "normal", label: "GPS Normal" },
  { value: "vip", label: "GPS VIP" },
] as const;

const STATUS_GPS_OPTIONS = [
  { value: "todos", label: "Todos Status GPS" },
  { value: "ativo", label: "Ativo" },
  { value: "inativo", label: "Inativo" },
  { value: "pendente", label: "Pendente" },
  { value: "expirado", label: "Expirado" },
] as const;

const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

// Hook personalizado para buscar e filtrar camiões
function useCamioesFiltrados(
  idTransportadora: number,
  searchTerm: string,
  statusFilter: string,
  categoriaFilter: string,
  filtrosAvancados: FiltrosAvancadosCamioes
) {
  const [camioes, setCamioes] = useState<Camiao[]>([]);
  const [filteredCamioes, setFilteredCamioes] = useState<Camiao[]>([]);
  const [metrics, setMetrics] = useState<MetricsCamioes>({
    totalCamioes: 0,
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
  });
  const [isDataLoading, setIsDataLoading] = useState(false);

  // Função para calcular métricas baseadas nos camiões filtrados
  const calcularMetricsLocais = (camioesList: Camiao[]): MetricsCamioes => {
    const totalCamioes = camioesList.length;
    const disponiveis = camioesList.filter(
      (c) => c.status === "disponivel"
    ).length;
    const emViagem = camioesList.filter((c) => c.status === "em_viagem").length;
    const emManutencao = camioesList.filter(
      (c) => c.status === "manutencao"
    ).length;

    const camioesCategoriaA = camioesList.filter(
      (c) => c.nivelInspecao.categoria === "A"
    ).length;
    const camioesCategoriaB = camioesList.filter(
      (c) => c.nivelInspecao.categoria === "B"
    ).length;
    const camioesCategoriaC = camioesList.filter(
      (c) => c.nivelInspecao.categoria === "C"
    ).length;

    const totalGPSNormal = camioesList.filter(
      (c) => c.tipoGPS.tipo === "normal"
    ).length;
    const totalGPSVip = camioesList.filter(
      (c) => c.tipoGPS.tipo === "vip"
    ).length;

    const totalValorRegistroGPS = camioesList.reduce(
      (total, camiao) => total + camiao.tipoGPS.valorRegistro,
      0
    );

    const totalKmPercorridos = camioesList.reduce(
      (total, camiao) =>
        total + (camiao.historicoUtilizacao?.totalKmPercorridos || 0),
      0
    );

    return {
      totalCamioes,
      disponiveis,
      emViagem,
      emManutencao,
      totalKmPercorridos,
      camioesCategoriaA,
      camioesCategoriaB,
      camioesCategoriaC,
      totalGPSNormal,
      totalGPSVip,
      totalValorRegistroGPS,
    };
  };

  // Buscar dados da API
  const fetchCamioes = async () => {
  setIsDataLoading(true);
  try {
    // Preparar o corpo da requisição com TODOS os filtros
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requestBody: any = {
      curPage: 1,
      pageSize: 100,
      transportadoraId: idTransportadora, // FORÇAR o filtro por transportadora
    };

    // Adicionar filtros apenas se não forem vazios ou "todos"
    if (searchTerm) requestBody.matricula = searchTerm;
    if (statusFilter !== "todos") requestBody.status = statusFilter;
    if (categoriaFilter !== "todos") requestBody.categoriaInspecao = categoriaFilter;
    
    // FILTROS AVANÇADOS - incluir todos os campos
    if (filtrosAvancados.tipoCamiao !== "todos") 
      requestBody.tipoCamiao = filtrosAvancados.tipoCamiao;
    if (filtrosAvancados.marca) 
      requestBody.marca = filtrosAvancados.marca;
    if (filtrosAvancados.anoMin) 
      requestBody.anoMin = parseInt(filtrosAvancados.anoMin);
    if (filtrosAvancados.anoMax) 
      requestBody.anoMax = parseInt(filtrosAvancados.anoMax);
    if (filtrosAvancados.tipoGPS !== "todos") 
      requestBody.tipoGPS = filtrosAvancados.tipoGPS;
    if (filtrosAvancados.gpsStatus !== "todos") 
      requestBody.gpsStatus = filtrosAvancados.gpsStatus;
    if (filtrosAvancados.transportadoraId) 
      requestBody.transportadoraId = parseInt(filtrosAvancados.transportadoraId);
    if (filtrosAvancados.motoristaId) 
      requestBody.motoristaId = parseInt(filtrosAvancados.motoristaId);

    console.log("Enviando filtros para API:", requestBody);

    const response = await fetch(`${API_BASE_URL}/getCamiaoList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (data.returnCode === 200) {
      console.log("Camiões retornados da API:", data.data.list.length);
      console.log("Filtros aplicados:", requestBody);
      setCamioes(data.data.list);
      aplicarFiltrosLocais(data.data.list);
    } else {
      console.error("Erro ao buscar camiões:", data.returnMsg);
      setCamioes([]);
      setFilteredCamioes([]);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    setCamioes([]);
    setFilteredCamioes([]);
  } finally {
    setIsDataLoading(false);
  }
};
// Efeito para buscar dados quando filtros principais mudarem
useEffect(() => {
  fetchCamioes();
}, [searchTerm, statusFilter, categoriaFilter, filtrosAvancados]); // ADICIONAR filtrosAvancados aqui

  // Aplicar filtros locais - apenas validação básica
const aplicarFiltrosLocais = (camioesList: Camiao[]) => {
  // Como a API já aplicou todos os filtros, apenas atualizamos a lista
  // Isso evita duplicação de filtros e conflitos
  setFilteredCamioes(camioesList);
  console.log(`Camiões após filtros da API: ${camioesList.length}`);
};

  // Efeito para buscar dados iniciais
  useEffect(() => {
    fetchCamioes();
  }, [idTransportadora]);

  // Efeito para aplicar filtros quando os dados ou filtros mudarem
  useEffect(() => {
    if (camioes.length > 0) {
      aplicarFiltrosLocais(camioes);
    }
  }, [camioes, filtrosAvancados]);

  // Efeito para recalcular métricas quando os camiões filtrados mudarem
  useEffect(() => {
    if (filteredCamioes.length > 0) {
      const novasMetrics = calcularMetricsLocais(filteredCamioes);
      setMetrics(novasMetrics);
      console.log("Métricas atualizadas:", novasMetrics);
    } else {
      // Resetar métricas se não há camiões
      setMetrics({
        totalCamioes: 0,
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
      });
    }
  }, [filteredCamioes]);

  // Efeito para buscar dados quando filtros principais mudarem
  useEffect(() => {
    fetchCamioes();
  }, [searchTerm, statusFilter, categoriaFilter]);

  return {
    camioes,
    filteredCamioes,
    metrics,
    isDataLoading,
    refetch: fetchCamioes,
  };
}

// Componente de Paginação
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex items-center space-x-2 mb-4 sm:mb-0">
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Itens por página:
        </span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {totalItems === 0 ? "0" : (currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems}
        </span>

        <div className="flex space-x-1">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <FiChevronsLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>

          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded-md text-sm border ${
                currentPage === page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <FiChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function FiltrosCamioes({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  categoriaFilter,
  setCategoriaFilter,
  filtrosAvancados,
  setFiltrosAvancados,
  exportarDados,
  setShowNovoCamiaoModal,
  showNovoCamiaoModal,
  associarMotorista,
  atualizarStatus,
  Spinner,
  idTransportadora,
}: FiltrosCamioesProps) {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedCamiao, setSelectedCamiao] = useState<Camiao | null>(null);
  const [showCamiaoDetailsModal, setShowCamiaoDetailsModal] = useState(false);
  const [selectedCamiaoManutencao, setSelectedCamiaoManutencao] =
    useState<Camiao | null>(null);
  const [showManutencaoModal, setShowManutencaoModal] = useState(false);
  const [selectedMotoristaAssociado, setSelectedMotoristaAssociado] =
    useState<MotoristaAssociado | null>(null);
  const [showMotoristaAssociadoModal, setShowMotoristaAssociadoModal] =
    useState(false);
  const [selectedCamiaoForMotorista, setSelectedCamiaoForMotorista] =
    useState<Camiao | null>(null);

  // Usar o hook personalizado para gerenciar os dados
  const { filteredCamioes, metrics, isDataLoading, refetch } =
    useCamioesFiltrados(
      idTransportadora,
      searchTerm,
      statusFilter,
      categoriaFilter,
      filtrosAvancados
    );

  // Calcular dados paginados
  const totalItems = filteredCamioes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredCamioes.slice(startIndex, endIndex);

  // Resetar para a primeira página quando os filtros mudarem
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, categoriaFilter, filtrosAvancados]);

  const handleVisualizarCamiao = (camiao: Camiao) => {
    setSelectedCamiao(camiao);
    setShowCamiaoDetailsModal(true);
  };
  const handleAbrirManutencao = (camiao: Camiao) => {
    setSelectedCamiaoManutencao(camiao);
    setShowManutencaoModal(true);
  };

  const handleVisualizarMotoristaAssociado = async (camiao: Camiao) => {
    try {
      // Buscar informações do motorista associado ao camião
      const response = await fetch(`${API_BASE_URL}/getMotoristaDetail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          motoristaId: camiao.motoristaId,
        }),
      });

      const data = await response.json();

      if (data.returnCode === 200) {
        setSelectedMotoristaAssociado(data.data);
        setSelectedCamiaoForMotorista(camiao);
        setShowMotoristaAssociadoModal(true);
      } else {
        alert("Motorista não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar motorista:", error);
      alert("Erro ao carregar informações do motorista");
    }
  };

  // Debug para verificar métricas
  useEffect(() => {
    console.log("Métricas atuais:", metrics);
    console.log("Camiões filtrados:", filteredCamioes.length);
  }, [metrics, filteredCamioes]);

  // Funções auxiliares
  const getStatusColor = (status: StatusCamiao) => {
    const statusColors = {
      disponivel:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      em_viagem:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      manutencao:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      inativo: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
      reservado:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    };
    return (
      statusColors[status] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    );
  };

  const getStatusText = (status: StatusCamiao) => {
    const statusMap: Record<StatusCamiao, string> = {
      disponivel: "Disponível",
      em_viagem: "Em Viagem",
      manutencao: "Em Manutenção",
      inativo: "Inativo",
      reservado: "Reservado",
    };
    return statusMap[status];
  };

  const getCategoriaColor = (categoria: CategoriaInspecao) => {
    switch (categoria) {
      case "A":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "B":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "C":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getCategoriaText = (categoria: CategoriaInspecao) => {
    const categoriaMap: Record<CategoriaInspecao, string> = {
      A: "Chanté",
      B: "Nacional",
      C: "Trânsito",
    };
    return categoriaMap[categoria];
  };

  const getTipoCamiaoText = (tipo: TipoCamiao) => {
    const tipoMap: Record<TipoCamiao, string> = {
      rigido: "Rígido",
      articulado: "Articulado",
      reboque: "Reboque",
      tanque: "Tanque",
      frigorifico: "Frigorífico",
    };
    return tipoMap[tipo];
  };

  const getTipoGPSText = (tipo: TipoGPS) => {
    const tipoMap: Record<TipoGPS, string> = {
      normal: "GPS Normal",
      vip: "GPS VIP",
    };
    return tipoMap[tipo];
  };

  const getTipoGPSColor = (tipo: TipoGPS) => {
    switch (tipo) {
      case "normal":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "vip":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getGPSStatusColor = (status: StatusGPS) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "inativo":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      case "pendente":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "expirado":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-MZ");
  };

  const formatarPeso = (peso: number) => {
    if (peso >= 1000) {
      return `${(peso / 1000).toFixed(1)} ton`;
    }
    return `${peso} kg`;
  };

  const formatarNumero = (numero: number) => {
    return new Intl.NumberFormat("pt-MZ").format(numero);
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
    }).format(valor);
  };

  // Função para verificar se a inspeção está próxima do vencimento
  const isInspecaoProxima = (dataProximaInspecao: string) => {
    const hoje = new Date();
    const proximaInspecao = new Date(dataProximaInspecao);
    const diffTime = proximaInspecao.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30; // Próxima em 30 dias ou menos
  };

  // Função para verificar se o seguro está próximo do vencimento
  const isSeguroProximoVencimento = (dataValidade: string) => {
    const hoje = new Date();
    const validadeDate = new Date(dataValidade);
    const diffTime = validadeDate.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  // Função para verificar se o GPS está próximo da expiração
  const isGPSProximoExpiracao = (dataExpiracao?: string) => {
    if (!dataExpiracao) return false;
    const hoje = new Date();
    const expiracao = new Date(dataExpiracao);
    const diffTime = expiracao.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  // Função para limpar filtros
  const limparFiltros = () => {
    setSearchTerm("");
    setStatusFilter("todos");
    setCategoriaFilter("todos");
    setFiltrosAvancados({
      status: "todos",
      categoriaInspecao: "todos",
      tipoCamiao: "todos",
      marca: "",
      anoMin: "",
      anoMax: "",
      transportadoraId: "",
      motoristaId: "",
      idTransportadora: 0,
      tipoGPS: "todos",
      gpsStatus: "todos",
    });
  };

  // Função para verificar se há filtros ativos
  const hasActiveFilters = () => {
    return (
      searchTerm !== "" ||
      statusFilter !== "todos" ||
      categoriaFilter !== "todos" ||
      filtrosAvancados.status !== "todos" ||
      filtrosAvancados.categoriaInspecao !== "todos" ||
      filtrosAvancados.tipoCamiao !== "todos" ||
      filtrosAvancados.marca !== "" ||
      filtrosAvancados.anoMin !== "" ||
      filtrosAvancados.anoMax !== "" ||
      filtrosAvancados.transportadoraId !== "" ||
      filtrosAvancados.motoristaId !== "" ||
      filtrosAvancados.tipoGPS !== "todos" ||
      filtrosAvancados.gpsStatus !== "todos"
    );
  };

  const handleSaveCamiao = async (dados: CreateCamiaoData) => {
    setLoading(true);
    try {
      const resultado = await criarNovoCamiao(dados);

      if (resultado.returnCode === 201) {
        setShowNovoCamiaoModal(false);
        refetch(); // Recarregar dados
        toast.success("Camião criado com sucesso!");
      } else {
        throw new Error(resultado.returnMsg);
      }
    } catch (error) {
      console.error("Erro ao salvar camião:", error);
      toast.error(`Erro: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll para o topo da tabela
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset para a primeira página
  };

  return (
    <div className="space-y-6">
      {/* Filtros e Busca */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="flex flex-col lg:flex-row gap-4 flex-1 w-full">
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por matrícula, marca, modelo, código GPS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select
                value={categoriaFilter}
                onChange={(e) => setCategoriaFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {CATEGORIA_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {hasActiveFilters() && (
                <button
                  onClick={limparFiltros}
                  className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-700 dark:border-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
                >
                  <FiFilter className="w-4 h-4" />
                  <span>Limpar Filtros</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex gap-2 w-full lg:w-auto">
            <button
              onClick={() => exportarDados("camioes")}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FiDownload className="w-4 h-4" />
              <span>Exportar</span>
            </button>

            <button
              onClick={() => setShowNovoCamiaoModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="w-4 h-4" />
              <span>Novo Camião</span>
            </button>
          </div>
        </div>

        {/* Filtros Avançados */}
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900 dark:text-white">
              Filtros Avançados
            </h4>
            <FiFilter className="text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                value={filtrosAvancados.status}
                onChange={(e) =>
                  setFiltrosAvancados((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Categoria Inspeção
              </label>
              <select
                value={filtrosAvancados.categoriaInspecao}
                onChange={(e) =>
                  setFiltrosAvancados((prev) => ({
                    ...prev,
                    categoriaInspecao: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {CATEGORIA_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tipo de Camião
              </label>
              <select
                value={filtrosAvancados.tipoCamiao}
                onChange={(e) =>
                  setFiltrosAvancados((prev) => ({
                    ...prev,
                    tipoCamiao: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {TIPO_CAMIAO_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Marca
              </label>
              <input
                type="text"
                placeholder="Ex: Mercedes, Volvo..."
                value={filtrosAvancados.marca}
                onChange={(e) =>
                  setFiltrosAvancados((prev) => ({
                    ...prev,
                    marca: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ano Min
                </label>
                <input
                  type="number"
                  placeholder="2000"
                  value={filtrosAvancados.anoMin}
                  onChange={(e) =>
                    setFiltrosAvancados((prev) => ({
                      ...prev,
                      anoMin: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ano Max
                </label>
                <input
                  type="number"
                  placeholder="2024"
                  value={filtrosAvancados.anoMax}
                  onChange={(e) =>
                    setFiltrosAvancados((prev) => ({
                      ...prev,
                      anoMax: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tipo GPS
              </label>
              <select
                value={filtrosAvancados.tipoGPS}
                onChange={(e) =>
                  setFiltrosAvancados((prev) => ({
                    ...prev,
                    tipoGPS: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {TIPO_GPS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status GPS
              </label>
              <select
                value={filtrosAvancados.gpsStatus}
                onChange={(e) =>
                  setFiltrosAvancados((prev) => ({
                    ...prev,
                    gpsStatus: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {STATUS_GPS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ID Transportadora
              </label>
              <input
                type="number"
                placeholder="ID da transportadora"
                value={filtrosAvancados.transportadoraId}
                onChange={(e) =>
                  setFiltrosAvancados((prev) => ({
                    ...prev,
                    transportadoraId: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ID Motorista
              </label>
              <input
                type="number"
                placeholder="ID do motorista"
                value={filtrosAvancados.motoristaId}
                onChange={(e) =>
                  setFiltrosAvancados((prev) => ({
                    ...prev,
                    motoristaId: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Camiões
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics.totalCamioes}
              </p>
            </div>
            <FiTruck className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Disponíveis
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics.disponiveis}
              </p>
            </div>
            <FiCheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                GPS Normal
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics.totalGPSNormal}
              </p>
            </div>
            <FiMapPin className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                GPS VIP
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics.totalGPSVip}
              </p>
            </div>
            <FiShield className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Categoria C
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics.camioesCategoriaC}
              </p>
            </div>
            <FiStar className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Valor GPS
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {formatarMoeda(metrics.totalValorRegistroGPS)}
              </p>
            </div>
            <FiStar className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Tabela de Camiões */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Meus Camiões ({totalItems})
            </h2>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Total KM:{" "}
                <span className="font-semibold text-blue-600">
                  {formatarNumero(metrics.totalKmPercorridos)} km
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
                  Camião
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  GPS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Especificações
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Inspeção
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Viabilidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {isDataLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex justify-center">
                      <Spinner size="md" />
                    </div>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Carregando camiões...
                    </p>
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <FiTruck className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Nenhum camião encontrado
                    </p>
                  </td>
                </tr>
              ) : (
                currentItems.map((camiao) => {
                  const seguroProximo = isSeguroProximoVencimento(
                    camiao.documentacao.seguro.dataValidade
                  );
                  const inspecaoProxima = camiao.nivelInspecao
                    .dataProximaInspecao
                    ? isInspecaoProxima(
                        camiao.nivelInspecao.dataProximaInspecao
                      )
                    : false;
                  const gpsProximoExpiracao = isGPSProximoExpiracao(
                    camiao.tipoGPS.dataExpiracao
                  );

                  return (
                    <tr
                      key={camiao.camiaoId}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                            <FiTruck className="w-4 h-4 text-blue-600" />
                            <span>{camiao.matricula}</span>
                            {(seguroProximo ||
                              inspecaoProxima ||
                              gpsProximoExpiracao) && (
                              <FiAlertTriangle className="w-4 h-4 text-orange-500" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {camiao.marca} {camiao.modelo}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center space-x-1 mt-1">
                            <FiCalendar className="w-3 h-3" />
                            <span>Ano: {camiao.anoFabricacao}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {camiao.camiaoId}
                          </div>
                          {camiao.codigoGPS && (
                            <div className="text-xs text-gray-500 flex items-center space-x-1">
                              <FiMapPin className="w-3 h-3" />
                              <span>GPS: {camiao.codigoGPS}</span>
                            </div>
                          )}
                          {seguroProximo && (
                            <div className="text-xs text-orange-600 flex items-center space-x-1">
                              <FiAlertTriangle className="w-3 h-3" />
                              <span>Seguro próximo do vencimento</span>
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTipoGPSColor(
                              camiao.tipoGPS.tipo
                            )}`}
                          >
                            {getTipoGPSText(camiao.tipoGPS.tipo)}
                          </span>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${getGPSStatusColor(
                              camiao.tipoGPS.status
                            )}`}
                          >
                            {camiao.tipoGPS.status}
                          </span>
                          <div className="text-xs text-gray-500">
                            {formatarMoeda(camiao.tipoGPS.valorRegistro)}
                          </div>
                          {camiao.tipoGPS.dataExpiracao && (
                            <div
                              className={`text-xs flex items-center space-x-1 ${
                                gpsProximoExpiracao
                                  ? "text-orange-600"
                                  : "text-gray-500"
                              }`}
                            >
                              <FiCalendar className="w-3 h-3" />
                              <span>
                                Expira:{" "}
                                {formatarData(camiao.tipoGPS.dataExpiracao)}
                              </span>
                              {gpsProximoExpiracao && (
                                <FiAlertTriangle className="w-3 h-3 text-orange-500" />
                              )}
                            </div>
                          )}
                          {camiao.gpsVip?.camera?.possui && (
                            <div className="text-xs text-purple-600 flex items-center space-x-1">
                              <FiCamera className="w-3 h-3" />
                              <span>Câmera</span>
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {getTipoCamiaoText(camiao.especificacoes.tipo)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Carga: {formatarPeso(camiao.especificacoes.cargaUtil)}
                        </div>
                        <div className="text-xs text-gray-500">
                          PBT: {formatarPeso(camiao.especificacoes.pesoBruto)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {camiao.especificacoes.numEixos} eixos
                        </div>
                        {camiao.especificacoes.volumeUtil && (
                          <div className="text-xs text-gray-500">
                            {camiao.especificacoes.volumeUtil} m³
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoriaColor(
                              camiao.nivelInspecao.categoria
                            )}`}
                          >
                            {getCategoriaText(camiao.nivelInspecao.categoria)}
                          </span>
                          <div className="text-xs text-gray-500">
                            Última:{" "}
                            {formatarData(
                              camiao.nivelInspecao.dataUltimaInspecao
                            )}
                          </div>
                          {camiao.nivelInspecao.dataProximaInspecao && (
                            <div
                              className={`text-xs flex items-center space-x-1 ${
                                inspecaoProxima
                                  ? "text-orange-600"
                                  : "text-gray-500"
                              }`}
                            >
                              <FiCalendar className="w-3 h-3" />
                              <span>
                                Próxima:{" "}
                                {formatarData(
                                  camiao.nivelInspecao.dataProximaInspecao
                                )}
                              </span>
                              {inspecaoProxima && (
                                <FiAlertTriangle className="w-3 h-3 text-orange-500" />
                              )}
                            </div>
                          )}
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                              camiao.nivelInspecao.resultadoUltimaInspecao ===
                              "aprovado"
                                ? "bg-green-100 text-green-800"
                                : camiao.nivelInspecao
                                    .resultadoUltimaInspecao ===
                                  "aprovado_com_ressalvas"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {camiao.nivelInspecao.resultadoUltimaInspecao.replace(
                              "_",
                              " "
                            )}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              camiao.status
                            )}`}
                          >
                            {getStatusText(camiao.status)}
                          </span>
                          <div className="text-xs text-gray-500">
                            {camiao.estado.tipo.charAt(0).toUpperCase() +
                              camiao.estado.tipo.slice(1)}
                          </div>
                          {camiao.manutencao?.proximaManutencao && (
                            <div className="text-xs text-gray-500">
                              Manutenção:{" "}
                              {formatarData(
                                camiao.manutencao.proximaManutencao
                              )}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          {camiao.viabilidade.podeChante && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                              Chanté
                            </span>
                          )}
                          {camiao.viabilidade.podeNacional && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                              Nacional
                            </span>
                          )}
                          {camiao.viabilidade.podeTransito && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-800">
                              Trânsito
                            </span>
                          )}
                          {camiao.viabilidade.podeGPSVip && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-800">
                              Elegível VIP
                            </span>
                          )}
                          {camiao.viabilidade.motivos.length > 0 && (
                            <div className="text-xs text-gray-500">
                              {camiao.viabilidade.motivos[0]}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleVisualizarCamiao(camiao)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-colors"
                          >
                            <FiEye className="w-4 h-4 mr-1" />
                            Detalhes
                          </button>

                          {camiao.status === "disponivel" && (
                            <button
                              onClick={() =>
                                handleVisualizarMotoristaAssociado(camiao)
                              }
                              className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center transition-colors"
                            >
                              <FiUser className="w-4 h-4 mr-1" />
                              Motorista
                            </button>
                          )}

                          <button
                            onClick={() => handleAbrirManutencao(camiao)}
                            className="text-orange-600 hover:text-orange-800 text-sm font-medium flex items-center transition-colors"
                          >
                            <FiSettings className="w-4 h-4 mr-1" />
                            Manutenção
                          </button>

                          <button className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center transition-colors">
                            <FiMessageSquare className="w-4 h-4 mr-1" />
                            Info
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        {totalItems > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}
      </div>

      <NovoCamiaoModal
        isOpen={showNovoCamiaoModal}
        onClose={() => setShowNovoCamiaoModal(false)}
        onSave={handleSaveCamiao}
        isLoading={loading}
        idTransportadora={idTransportadora}
      />
      <CamiaoDetailsModal
        isOpen={showCamiaoDetailsModal}
        onClose={() => setShowCamiaoDetailsModal(false)}
        camiao={selectedCamiao}
        onEdit={(camiao) => {
          console.log("Editar camião:", camiao);
          setShowCamiaoDetailsModal(false);
        }}
        onAssociateMotorista={(camiaoId) => {
          console.log("Associar motorista ao camião:", camiaoId);
          setShowCamiaoDetailsModal(false);
          associarMotorista(camiaoId);
        }}
        onUpdateStatus={(camiaoId, status) => {
          console.log("Atualizar status do camião:", camiaoId, status);
          setShowCamiaoDetailsModal(false);
          atualizarStatus(camiaoId, status);
        }}
        onUpdateGPS={(camiaoId) => {
          console.log("Atualizar GPS do camião:", camiaoId);
          setShowCamiaoDetailsModal(false);
        }}
      />
      <MotoristaAssociadoDetailsModal
        isOpen={showMotoristaAssociadoModal}
        onClose={() => {
          setShowMotoristaAssociadoModal(false);
          setSelectedMotoristaAssociado(null);
          setSelectedCamiaoForMotorista(null);
        }}
        motorista={selectedMotoristaAssociado}
        camiaoInfo={
          selectedCamiaoForMotorista
            ? {
                matricula: selectedCamiaoForMotorista.matricula,
                marca: selectedCamiaoForMotorista.marca,
                modelo: selectedCamiaoForMotorista.modelo,
              }
            : undefined
        }
        onEdit={(motorista) => {
          console.log("Editar motorista:", motorista);
          setShowMotoristaAssociadoModal(false);
        }}
        onDesassociar={(motoristaId, camiaoId) => {
          console.log(
            "Desassociar motorista:",
            motoristaId,
            "do camião:",
            camiaoId
          );
          setShowMotoristaAssociadoModal(false);
          // Implementar lógica de desassociação
        }}
        onContactar={(motorista) => {
          console.log("Contactar motorista:", motorista);
          // Implementar lógica de contato
        }}
      />
      <ManutencaoDetailsModal
        isOpen={showManutencaoModal}
        onClose={() => {
          setShowManutencaoModal(false);
          setSelectedCamiaoManutencao(null);
        }}
        camiao={selectedCamiaoManutencao}
        onAgendarManutencao={(camiaoId) => {
          console.log("Agendar manutenção para camião:", camiaoId);
          // Implementar lógica de agendamento
        }}
        onRegistrarManutencao={(camiaoId) => {
          console.log("Registrar manutenção para camião:", camiaoId);
          // Implementar lógica de registro
        }}
        onAtualizarStatus={(camiaoId, status) => {
          console.log("Atualizar status do camião:", camiaoId, status);
          atualizarStatus(camiaoId, status as StatusCamiao);
          setShowManutencaoModal(false);
        }}
        onGerarRelatorio={(camiaoId) => {
          console.log("Gerar relatório de manutenção para camião:", camiaoId);
          // Implementar geração de relatório
        }}
      />
    </div>
  );
}
