import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiPlus,
  FiPrinter,
  FiShare2,
  FiUser,
  FiCalendar,
  FiEye,
  FiCheckCircle,
  FiMessageSquare,
  FiTruck,
  FiStar,
  FiAward,
  FiFileText,
  FiAlertTriangle,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { CreateMotoristaData, NovoMotoristaModal } from "./modelNovoMotorista";
import { useState, useEffect } from "react";
import { criarNovoMotorista } from "./criarNovoMotorista";
import { MotoristaDetailsModal } from "./MotoristaDetailsModal";
import { Veiculo, VeiculoDetailsModal } from "./VeiculoDetailsModal";

// Interfaces para Motoristas
export type StatusMotorista =
  | "disponivel"
  | "em_viagem"
  | "ferias"
  | "licenca"
  | "indisponivel";
export type StatusContratual =
  | "ativo"
  | "inativo"
  | "ferias"
  | "licenca"
  | "suspenso";
export type CategoriaCarta = "CE" | "C" | "D" | "E";
export type CategoriaInspecao = "A" | "B" | "C";

export interface VeiculoHabilitado {
  tipo: string;
  marca: string;
  modelo: string;
  pesoMaximo: number;
  matricula: string;
  nivelInspecao: {
    categoria: CategoriaInspecao;
    descricao: string;
    dataUltimaInspecao: string;
    dataProximaInspecao?: string;
    resultadoUltimaInspecao:
      | "aprovado"
      | "aprovado_com_ressalvas"
      | "reprovado";
    centroInspecao?: string;
  };
  viabilidade: {
    podeChante: boolean;
    podeNacional: boolean;
    podeTransito: boolean;
  };
}

export interface InfoTransportador {
  totalCamioes: number;
  qualificadoTransito: boolean;
  restricoes: {
    motivo?: string;
    dataVerificacao?: string;
    podeFazerNacional: boolean;
    podeFazerTransito: boolean;
  };
}

export interface Motorista {
  _id?: string;
  motoristaId: number;
  nomeCompleto: string;
  dataNascimento?: string;
  nacionalidade?: string;

  // Empresa e vínculo
  empresaMotorista: string;
  empresaMotoristaId: number;
  cargo?: string;
  dataAdmissao?: string;
  statusContratual: StatusContratual;

  // Documentação pessoal
  numeroBI: string;
  validadeBI: string;
  nuit?: string;
  numeroSegurancaSocial?: string;

  // Habilitação
  cartaConducao: {
    numero: string;
    categoria: CategoriaCarta;
    dataEmissao?: string;
    validade: string;
    localEmissao?: string;
  };

  licencaProfissional?: {
    numero: string;
    validade?: string;
    categoria?: string;
  };

  // Certificações
  certificados?: Array<{
    tipo: string;
    numero?: string;
    validade?: string;
    instituicao?: string;
  }>;

  especializacoes?: string[];

  // Contatos
  contactos: {
    telefonePrincipal: string;
    telefoneAlternativo?: string;
    email?: string;
    emergencia?: {
      nome?: string;
      parentesco?: string;
      telefone?: string;
    };
  };

  endereco?: {
    provincia?: string;
    cidade?: string;
    bairro?: string;
    rua?: string;
    numeroCasa?: string;
  };

  // Avaliação e desempenho
  avaliacaoGeral?: number;
  avaliacaoDetalhada?: {
    seguranca?: number;
    cumprimentoRota?: number;
    pontualidade?: number;
    comunicacao?: number;
    economiaCombustivel?: number;
    cuidadoVeiculo?: number;
    documentacao?: number;
  };

  historicoAvaliacoes?: Array<{
    data: string;
    avaliacao?: number;
    avaliador?: string;
    viagemId?: number;
    observacoes?: string;
    metricas?: {
      seguranca?: number;
      cumprimentoRota?: number;
      pontualidade?: number;
      comunicacao?: number;
      economiaCombustivel?: number;
    };
  }>;

  totalViagensRealizadas: number;
  totalKmPercorridos: number;
  indiceAcidentes: number;
  indiceMultas: number;

  // Veículos habilitados
  veiculosHabilitados: VeiculoHabilitado[];

  // Informação do transportador
  infoTransportador: InfoTransportador;

  // Saúde e segurança
  examesMedicos?: Array<{
    tipo?: string;
    dataRealizacao?: string;
    dataValidade?: string;
    resultado?: string;
    instituicao?: string;
  }>;

  restricoesMedicas?: string[];
  alergias?: string[];
  tipoSanguineo?: string;

  // Status operacional
  status: StatusMotorista;

  // Metadados
  dataCriacao: string;
  dataAtualizacao: string;
  criadoPor?: string;
  atualizadoPor?: string;
  observacoes?: string;
  foto?: string;
}

export interface MetricsMotoristas {
  totalMotoristas: number;
  motoristasAtivos: number;
  motoristasEmViagem: number;
  mediaAvaliacao: number;
  totalKmPercorridos: number;
  totalViagens: number;
  transportadoresQualificadosTransito: number;
  totalCamioesTransportadores: number;
}

export interface FiltrosAvancadosMotoristas {
  status: string;
  statusContratual: string;
  categoriaCarta: string;
  nivelInspecao: string;
  empresaMotorista: string;
  qualificadoTransito: string;
  avaliacaoMin: string;
  avaliacaoMax: string;
}

interface FiltrosMotoristasProps {
  // Estados
  searchTerm: string;
  idTransportadora: number;
  nameTransportadora: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  showNovoMotoristaModal: boolean;
  showMotoristaDetailsModal: boolean; // ✅ já está
  setStatusFilter: (value: string) => void;
  statusContratualFilter: string;
  setStatusContratualFilter: (value: string) => void;
  filtrosAvancados: FiltrosAvancadosMotoristas;
  setFiltrosAvancados: React.Dispatch<
    React.SetStateAction<FiltrosAvancadosMotoristas>
  >;

  // Dados
  filteredMotoristas: Motorista[];
  metrics: MetricsMotoristas;
  isDataLoading: boolean;

  // Funções
  exportarDados: (tipo: string) => void;
  setShowNovoMotoristaModal: (show: boolean) => void;
  setShowMotoristaDetailsModal: React.Dispatch<React.SetStateAction<boolean>>; // ✅ adicionar
  visualizarMotorista: (motorista: Motorista) => void;
  adicionarVeiculo: (motoristaId: number) => void;
  atualizarStatus: (motoristaId: number, status: StatusMotorista) => void;

  // Componente Spinner
  Spinner: React.ComponentType<{ size?: string }>;
}

// Constantes para os filtros
const STATUS_OPTIONS = [
  { value: "todos", label: "Todos os Status" },
  { value: "disponivel", label: "Disponível" },
  { value: "em_viagem", label: "Em Viagem" },
  { value: "ferias", label: "Férias" },
  { value: "licenca", label: "Licença" },
  { value: "indisponivel", label: "Indisponível" },
] as const;

const STATUS_CONTRATUAL_OPTIONS = [
  { value: "todos", label: "Todos os Status" },
  { value: "ativo", label: "Ativo" },
  { value: "inativo", label: "Inativo" },
  { value: "ferias", label: "Férias" },
  { value: "licenca", label: "Licença" },
  { value: "suspenso", label: "Suspenso" },
] as const;

const CATEGORIA_CARTA_OPTIONS = [
  { value: "todos", label: "Todas as Categorias" },
  { value: "CE", label: "CE" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
  { value: "E", label: "E" },
] as const;

const CATEGORIA_INSPECAO_OPTIONS = [
  { value: "todos", label: "Todas as Categorias" },
  { value: "A", label: "A - Chanté" },
  { value: "B", label: "B - Nacional" },
  { value: "C", label: "C - Trânsito" },
] as const;

const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

// Hook personalizado para buscar e filtrar motoristas
function useMotoristasFiltrados(
  empresaMotoristaId: number,
  nameTransportadora: string,
  searchTerm: string,
  statusFilter: string,
  statusContratualFilter: string,
  filtrosAvancados: FiltrosAvancadosMotoristas
) {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [filteredMotoristas, setFilteredMotoristas] = useState<Motorista[]>([]);
  const [metrics, setMetrics] = useState<MetricsMotoristas>({
    totalMotoristas: 0,
    motoristasAtivos: 0,
    motoristasEmViagem: 0,
    mediaAvaliacao: 0,
    totalKmPercorridos: 0,
    totalViagens: 0,
    transportadoresQualificadosTransito: 0,
    totalCamioesTransportadores: 0,
  });

  const [isDataLoading, setIsDataLoading] = useState(false);

  // Buscar dados da API
  // No fetchMotoristas, dentro do useMotoristasFiltrados
  const fetchMotoristas = async () => {
    setIsDataLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/getMotoristaList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          curPage: 1,
          pageSize: 100,
          nomeCompleto: searchTerm || undefined,
          empresaMotorista: nameTransportadora, // FORÇAR o filtro por transportadora
          empresaMotoristaId: empresaMotoristaId, // FORÇAR o filtro por ID
          status: statusFilter !== "todos" ? statusFilter : undefined,
          statusContratual:
            statusContratualFilter !== "todos"
              ? statusContratualFilter
              : undefined,
          nivelInspecao:
            filtrosAvancados.nivelInspecao !== "todos"
              ? filtrosAvancados.nivelInspecao
              : undefined,
          qualificadoTransito:
            filtrosAvancados.qualificadoTransito !== "todos"
              ? filtrosAvancados.qualificadoTransito === "sim"
              : undefined,
        }),
      });

      const data = await response.json();

      if (data.returnCode === 200) {
        console.log("Motoristas retornados da API:", data.data.list.length); // Debug
        console.log(
          "Motoristas retornados:",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.data.list.map((m: any) => ({
            id: m.motoristaId,
            nome: m.nomeCompleto,
            empresa: m.empresaMotorista,
            empresaId: m.empresaMotoristaId,
          }))
        ); // Debug

        setMotoristas(data.data.list);
        aplicarFiltrosLocais(data.data.list);
      } else {
        console.error("Erro ao buscar motoristas:", data.returnMsg);
        setMotoristas([]);
        setFilteredMotoristas([]);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setMotoristas([]);
      setFilteredMotoristas([]);
    } finally {
      setIsDataLoading(false);
    }
  };

  // Buscar métricas
  const fetchMetrics = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getMotoristaStats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          empresaMotoristaId: empresaMotoristaId,
        }),
      });

      const data = await response.json();

      if (data.returnCode === 200) {
        setMetrics(data.data);
      }
    } catch (error) {
      console.error("Erro ao buscar métricas:", error);
    }
  };

  const aplicarFiltrosLocais = (motoristasList: Motorista[]) => {
    // PRIMEIRO: Filtrar apenas motoristas da transportadora atual
    let filtered = motoristasList.filter(
      (motorista) =>
        motorista.empresaMotoristaId === empresaMotoristaId &&
        motorista.empresaMotorista === nameTransportadora
    );

    console.log(`Motoristas da transportadora atual: ${filtered.length}`); // Debug

    // DEPOIS: Aplicar os filtros avançados
    // Filtro por categoria de carta
    if (filtrosAvancados.categoriaCarta !== "todos") {
      filtered = filtered.filter(
        (motorista) =>
          motorista.cartaConducao.categoria === filtrosAvancados.categoriaCarta
      );
      console.log(`Após filtro categoria: ${filtered.length}`); // Debug
    }

    // Filtro por empresa (provavelmente pode remover este, já que estamos filtrando por transportadora)
    if (filtrosAvancados.empresaMotorista) {
      filtered = filtered.filter((motorista) =>
        motorista.empresaMotorista
          .toLowerCase()
          .includes(filtrosAvancados.empresaMotorista.toLowerCase())
      );
      console.log(`Após filtro empresa: ${filtered.length}`); // Debug
    }

    // Filtro por avaliação mínima
    if (filtrosAvancados.avaliacaoMin) {
      const min = parseFloat(filtrosAvancados.avaliacaoMin);
      filtered = filtered.filter(
        (motorista) =>
          motorista.avaliacaoGeral && motorista.avaliacaoGeral >= min
      );
      console.log(`Após filtro avaliação min: ${filtered.length}`); // Debug
    }

    // Filtro por avaliação máxima
    if (filtrosAvancados.avaliacaoMax) {
      const max = parseFloat(filtrosAvancados.avaliacaoMax);
      filtered = filtered.filter(
        (motorista) =>
          motorista.avaliacaoGeral && motorista.avaliacaoGeral <= max
      );
      console.log(`Após filtro avaliação max: ${filtered.length}`); // Debug
    }

    // Filtro por status operacional
    if (filtrosAvancados.status !== "todos") {
      filtered = filtered.filter(
        (motorista) => motorista.status === filtrosAvancados.status
      );
      console.log(`Após filtro status: ${filtered.length}`); // Debug
    }

    // Filtro por status contratual
    if (filtrosAvancados.statusContratual !== "todos") {
      filtered = filtered.filter(
        (motorista) =>
          motorista.statusContratual === filtrosAvancados.statusContratual
      );
      console.log(`Após filtro status contratual: ${filtered.length}`); // Debug
    }

    setFilteredMotoristas(filtered);
  };
  // Efeito para buscar dados iniciais
  useEffect(() => {
    fetchMotoristas();
    fetchMetrics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empresaMotoristaId]);

  // Efeito para aplicar filtros quando os dados ou filtros mudarem
  useEffect(() => {
    if (motoristas.length > 0) {
      aplicarFiltrosLocais(motoristas);
    }
  }, [motoristas, filtrosAvancados]);

  // Efeito para buscar dados quando filtros principais mudarem
  useEffect(() => {
    fetchMotoristas();
  }, [searchTerm, statusFilter, statusContratualFilter]);

  return {
    motoristas,
    filteredMotoristas,
    metrics,
    isDataLoading,
    refetch: fetchMotoristas,
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

export function FiltrosMotoristas({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  statusContratualFilter,
  setStatusContratualFilter,
  filtrosAvancados,
  setFiltrosAvancados,
  exportarDados,
  setShowNovoMotoristaModal,
  showNovoMotoristaModal,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  atualizarStatus,
  Spinner,
  idTransportadora,
  nameTransportadora,
  showMotoristaDetailsModal,
  setShowMotoristaDetailsModal,
}: FiltrosMotoristasProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedMotorista, setSelectedMotorista] = useState<Motorista | null>(
    null
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedVeiculo, setSelectedVeiculo] = useState<Veiculo | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showVeiculoDetailsModal, setShowVeiculoDetailsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const visualizarMotorista = (motorista: Motorista) => {
    setSelectedMotorista(motorista);
    setShowMotoristaDetailsModal(true);
  };
  // Função para lidar com a visualização do veículo
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleVisualizarVeiculo = async (motoristaId: number) => {
    try {
      // Buscar informações do veículo/camião associado ao motorista
      const response = await fetch(`${API_BASE_URL}/getCamioesPorMotorista`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          motoristaId: motoristaId,
        }),
      });

      const data = await response.json();

      if (data.returnCode === 200 && data.data.camioes.length > 0) {
        setSelectedVeiculo(data.data.camioes[0]);
        setShowVeiculoDetailsModal(true);
      } else {
        alert("Nenhum veículo encontrado para este motorista");
      }
    } catch (error) {
      console.error("Erro ao buscar veículo:", error);
      alert("Erro ao carregar informações do veículo");
    }
  };

  // Usar o hook personalizado para gerenciar os dados
  const { filteredMotoristas, metrics, isDataLoading, refetch } =
    useMotoristasFiltrados(
      idTransportadora,
      nameTransportadora,
      searchTerm,
      statusFilter,
      statusContratualFilter,
      filtrosAvancados
    );

  const empresaMotorista = nameTransportadora;
  const empresaMotoristaId = idTransportadora;

  // Calcular dados paginados
  const totalItems = filteredMotoristas.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredMotoristas.slice(startIndex, endIndex);

  // Resetar para a primeira página quando os filtros mudarem
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, statusContratualFilter, filtrosAvancados]);

  // Funções auxiliares
  const getStatusColor = (status: StatusMotorista) => {
    const statusColors = {
      disponivel:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      em_viagem:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      ferias:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      licenca:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      indisponivel: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return (
      statusColors[status] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    );
  };

  const getStatusText = (status: StatusMotorista) => {
    const statusMap: Record<StatusMotorista, string> = {
      disponivel: "Disponível",
      em_viagem: "Em Viagem",
      ferias: "Férias",
      licenca: "Licença",
      indisponivel: "Indisponível",
    };
    return statusMap[status];
  };

  const getStatusContratualColor = (status: StatusContratual) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "inativo":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      case "ferias":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "licenca":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "suspenso":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusContratualText = (status: StatusContratual) => {
    const statusMap: Record<StatusContratual, string> = {
      ativo: "Ativo",
      inativo: "Inativo",
      ferias: "Férias",
      licenca: "Licença",
      suspenso: "Suspenso",
    };
    return statusMap[status];
  };

  const getCategoriaCartaText = (categoria: CategoriaCarta) => {
    const categoriaMap: Record<CategoriaCarta, string> = {
      CE: "CE",
      C: "C",
      D: "D",
      E: "E",
    };
    return categoriaMap[categoria];
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getCategoriaInspecaoColor = (categoria: CategoriaInspecao) => {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getCategoriaInspecaoText = (categoria: CategoriaInspecao) => {
    const categoriaMap: Record<CategoriaInspecao, string> = {
      A: "Chanté",
      B: "Nacional",
      C: "Trânsito",
    };
    return categoriaMap[categoria];
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-MZ");
  };

  const formatarNumero = (numero: number) => {
    return new Intl.NumberFormat("pt-MZ").format(numero);
  };

  const formatarAvaliacao = (avaliacao: number) => {
    return avaliacao.toFixed(1);
  };

  // Função para verificar se a carta está próxima do vencimento
  const isCartaProximaVencimento = (validade: string) => {
    const hoje = new Date();
    const validadeDate = new Date(validade);
    const diffTime = validadeDate.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30; // Próxima em 30 dias ou menos
  };

  // Função para verificar se a carta está vencida
  const isCartaVencida = (validade: string) => {
    return new Date(validade) < new Date();
  };

  // Função para contar veículos por categoria
  const contarVeiculosPorCategoria = (motorista: Motorista) => {
    const categorias = { A: 0, B: 0, C: 0 };
    motorista.veiculosHabilitados.forEach((veiculo) => {
      if (veiculo.nivelInspecao?.categoria in categorias) {
        categorias[
          veiculo.nivelInspecao.categoria as keyof typeof categorias
        ]++;
      }
    });
    return categorias;
  };

  // Função para limpar filtros
  const limparFiltros = () => {
    setSearchTerm("");
    setStatusFilter("todos");
    setStatusContratualFilter("todos");
    setFiltrosAvancados({
      status: "todos",
      statusContratual: "todos",
      categoriaCarta: "todos",
      nivelInspecao: "todos",
      empresaMotorista: "",
      qualificadoTransito: "todos",
      avaliacaoMin: "",
      avaliacaoMax: "",
    });
  };

  // Função para verificar se há filtros ativos
  const hasActiveFilters = () => {
    return (
      searchTerm !== "" ||
      statusFilter !== "todos" ||
      statusContratualFilter !== "todos" ||
      filtrosAvancados.status !== "todos" ||
      filtrosAvancados.statusContratual !== "todos" ||
      filtrosAvancados.categoriaCarta !== "todos" ||
      filtrosAvancados.nivelInspecao !== "todos" ||
      filtrosAvancados.empresaMotorista !== "" ||
      filtrosAvancados.qualificadoTransito !== "todos" ||
      filtrosAvancados.avaliacaoMin !== "" ||
      filtrosAvancados.avaliacaoMax !== ""
    );
  };

  const handleSaveMotorista = async (dados: CreateMotoristaData) => {
    setLoading(true);
    try {
      const resultado = await criarNovoMotorista(dados);

      if (resultado.returnCode === 201) {
        setShowNovoMotoristaModal(false);
        refetch(); // Recarregar dados
        alert("Motorista adicionado com sucesso!");
      } else {
        throw new Error(resultado.returnMsg);
      }
    } catch (error) {
      console.error("Erro ao salvar motorista:", error);
      alert(`Erro: ${error}`);
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
                placeholder="Buscar por nome, BI, carta condução..."
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
                value={statusContratualFilter}
                onChange={(e) => setStatusContratualFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {STATUS_CONTRATUAL_OPTIONS.map((option) => (
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
              onClick={() => exportarDados("motoristas")}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FiDownload className="w-4 h-4" />
              <span>Exportar</span>
            </button>

            <button
              onClick={() => setShowNovoMotoristaModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="w-4 h-4" />
              <span>Novo Motorista</span>
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
                Status Operacional
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
                Status Contratual
              </label>
              <select
                value={filtrosAvancados.statusContratual}
                onChange={(e) =>
                  setFiltrosAvancados((prev) => ({
                    ...prev,
                    statusContratual: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {STATUS_CONTRATUAL_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Categoria Carta
              </label>
              <select
                value={filtrosAvancados.categoriaCarta}
                onChange={(e) =>
                  setFiltrosAvancados((prev) => ({
                    ...prev,
                    categoriaCarta: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {CATEGORIA_CARTA_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nível Inspeção Veículos
              </label>
              <select
                value={filtrosAvancados.nivelInspecao}
                onChange={(e) =>
                  setFiltrosAvancados((prev) => ({
                    ...prev,
                    nivelInspecao: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {CATEGORIA_INSPECAO_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Qualificado Trânsito
              </label>
              <select
                value={filtrosAvancados.qualificadoTransito}
                onChange={(e) =>
                  setFiltrosAvancados((prev) => ({
                    ...prev,
                    qualificadoTransito: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="todos">Todos</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Avaliação Min
                </label>
                <input
                  type="number"
                  placeholder="0"
                  min="0"
                  max="5"
                  step="0.1"
                  value={filtrosAvancados.avaliacaoMin}
                  onChange={(e) =>
                    setFiltrosAvancados((prev) => ({
                      ...prev,
                      avaliacaoMin: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Avaliação Max
                </label>
                <input
                  type="number"
                  placeholder="5"
                  min="0"
                  max="5"
                  step="0.1"
                  value={filtrosAvancados.avaliacaoMax}
                  onChange={(e) =>
                    setFiltrosAvancados((prev) => ({
                      ...prev,
                      avaliacaoMax: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Motoristas
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics.totalMotoristas}
              </p>
            </div>
            <FiUser className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Ativos
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics.motoristasAtivos}
              </p>
            </div>
            <FiCheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Em Viagem
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics.motoristasEmViagem}
              </p>
            </div>
            <FiTruck className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Avaliação Média
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatarAvaliacao(metrics.mediaAvaliacao)}
              </p>
            </div>
            <FiStar className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Tabela de Motoristas */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Meus Motoristas ({totalItems})
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
                  Motorista
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Documentação
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Veículos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Transportador
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Desempenho
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
                      Carregando motoristas...
                    </p>
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <FiUser className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Nenhum motorista encontrado
                    </p>
                  </td>
                </tr>
              ) : (
                currentItems.map((motorista) => {
                  const veiculosPorCategoria =
                    contarVeiculosPorCategoria(motorista);
                  const cartaVencida = isCartaVencida(
                    motorista.cartaConducao.validade
                  );
                  const cartaProxima = isCartaProximaVencimento(
                    motorista.cartaConducao.validade
                  );

                  return (
                    <tr
                      key={motorista.motoristaId}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                            <FiUser className="w-4 h-4 text-blue-600" />
                            <span>{motorista.nomeCompleto}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {motorista.empresaMotorista}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {motorista.motoristaId}
                          </div>
                          <div className="text-xs text-gray-500">
                            BI: {motorista.numeroBI}
                          </div>
                          {motorista.contactos.telefonePrincipal && (
                            <div className="text-xs text-gray-500">
                              {motorista.contactos.telefonePrincipal}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          <div className="text-sm text-gray-900 dark:text-white flex items-center space-x-1">
                            <FiFileText className="w-3 h-3" />
                            <span>Carta: {motorista.cartaConducao.numero}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Categoria:{" "}
                            {getCategoriaCartaText(
                              motorista.cartaConducao.categoria
                            )}
                          </div>
                          <div
                            className={`text-xs flex items-center space-x-1 ${
                              cartaVencida
                                ? "text-red-600"
                                : cartaProxima
                                ? "text-orange-600"
                                : "text-gray-500"
                            }`}
                          >
                            <FiCalendar className="w-3 h-3" />
                            <span>
                              Validade:{" "}
                              {formatarData(motorista.cartaConducao.validade)}
                            </span>
                            {(cartaVencida || cartaProxima) && (
                              <FiAlertTriangle className="w-3 h-3" />
                            )}
                          </div>
                          {motorista.licencaProfissional && (
                            <div className="text-xs text-gray-500">
                              Licença: {motorista.licencaProfissional.numero}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {motorista.veiculosHabilitados.length} veículos
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {veiculosPorCategoria.A > 0 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-800">
                                A: {veiculosPorCategoria.A}
                              </span>
                            )}
                            {veiculosPorCategoria.B > 0 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-orange-100 text-orange-800">
                                B: {veiculosPorCategoria.B}
                              </span>
                            )}
                            {veiculosPorCategoria.C > 0 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                                C: {veiculosPorCategoria.C}
                              </span>
                            )}
                          </div>
                          {motorista.veiculosHabilitados.length > 0 && (
                            <div className="text-xs text-gray-500">
                              {motorista.veiculosHabilitados[0].marca}{" "}
                              {motorista.veiculosHabilitados[0].modelo}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              motorista.status
                            )}`}
                          >
                            {getStatusText(motorista.status)}
                          </span>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusContratualColor(
                              motorista.statusContratual
                            )}`}
                          >
                            {getStatusContratualText(
                              motorista.statusContratual
                            )}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {motorista.infoTransportador.totalCamioes} camiões
                          </div>
                          {motorista.infoTransportador.qualificadoTransito ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                              <FiAward className="w-3 h-3 mr-1" />
                              Qualificado Trânsito
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800">
                              Nacional Apenas
                            </span>
                          )}
                          {motorista.infoTransportador.restricoes.motivo && (
                            <div className="text-xs text-gray-500">
                              {motorista.infoTransportador.restricoes.motivo}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center space-x-1">
                            <FiStar className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {motorista.avaliacaoGeral
                                ? formatarAvaliacao(motorista.avaliacaoGeral)
                                : "N/A"}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatarNumero(motorista.totalViagensRealizadas)}{" "}
                            viagens
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatarNumero(motorista.totalKmPercorridos)} km
                          </div>
                          {motorista.indiceAcidentes > 0 && (
                            <div className="text-xs text-red-500">
                              {motorista.indiceAcidentes.toFixed(1)}% acidentes
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => visualizarMotorista(motorista)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-colors"
                          >
                            <FiEye className="w-4 h-4 mr-1" />
                            Detalhes
                          </button>

                          {motorista.status === "disponivel" && (
                            <button
                              onClick={() =>
                               handleVisualizarVeiculo(motorista.motoristaId)
                              }
                              className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center transition-colors"
                            >
                              <FiTruck className="w-4 h-4 mr-1" />
                              Veículo
                            </button>
                          )}

                          <button className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center transition-colors">
                            <FiMessageSquare className="w-4 h-4 mr-1" />
                            Avaliar
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
      <MotoristaDetailsModal
        isOpen={showMotoristaDetailsModal}
        onClose={() => setShowMotoristaDetailsModal(false)}
        motorista={selectedMotorista}
        onEdit={(motorista) => {
          // Implementar edição do motorista
          console.log("Editar motorista:", motorista);
        }}
        onAddVehicle={(motoristaId) => {
          // Implementar adição de veículo
          console.log("Adicionar veículo para motorista:", motoristaId);
        }}
      />
      <NovoMotoristaModal
        isOpen={showNovoMotoristaModal}
        onClose={() => setShowNovoMotoristaModal(false)}
        onSave={handleSaveMotorista}
        isLoading={loading}
        empresaMotorista={empresaMotorista}
        empresaMotoristaId={empresaMotoristaId}
      />
      <VeiculoDetailsModal
        isOpen={showVeiculoDetailsModal}
        onClose={() => setShowVeiculoDetailsModal(false)}
        veiculo={selectedVeiculo}
        onEdit={(veiculo) => {
          // Implementar edição do veículo
          console.log("Editar veículo:", veiculo);
          setShowVeiculoDetailsModal(false);
        }}
        onUpdateGPS={(veiculoId) => {
          // Implementar atualização do GPS
          console.log("Atualizar GPS do veículo:", veiculoId);
          setShowVeiculoDetailsModal(false);
        }}
      />
    </div>
  );
}
