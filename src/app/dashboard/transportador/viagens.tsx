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
  FiPackage,
  FiDollarSign
} from "react-icons/fi";

// Interfaces adaptadas para Cargas
export type StatusCarga = "planeada" | "aguardando_coleta" | "coletada" | "em_transito" | "em_fronteira" | "aguardando_desembaraco" | "em_entrega" | "entregue" | "encerrada" | "armazenada";
export type PrioridadeCarga = "baixa" | "média" | "alta" | "urgente";
export type TipoCarga = "Contentorizada" | "Solta" | "Granel" | "Frigorífica" | "Perigosa";

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
    empresaMotorista?: string; // ← ADICIONADO
    id?: number; // ← ADICIONADO
  };
  veiculo?: {
    matricula: string;
    modelo: string;
  };
  dataCriacao: string;
  dataAtualizacao: string;
  // Campos adicionais do schema
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
  nomeEmpresa?: string; // ← ADICIONADO do schema
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
  naturezaCarga: string;
  motoristaEmpresa: boolean; // ← NOVO CAMPO
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
  { value: "encerrada", label: "Encerrada" }
] as const;

const TIPO_CARGA_OPTIONS = [
  { value: "todos", label: "Todos os Tipos" },
  { value: "Contentorizada", label: "Contentorizada" },
  { value: "Solta", label: "Solta" },
  { value: "Granel", label: "Granel" },
  { value: "Frigorífica", label: "Frigorífica" },
  { value: "Perigosa", label: "Perigosa" }
] as const;

const NATUREZA_CARGA_OPTIONS = [
  { value: "todos", label: "Todas as Naturezas" },
  { value: "perigosa", label: "Perigosa" },
  { value: "não perigosa", label: "Não Perigosa" },
  { value: "sensível", label: "Sensível" },
  { value: "fragil", label: "Frágil" }
] as const;

export function FiltrosCargas({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  tipoFilter,
  setTipoFilter,
  filtrosAvancados,
  setFiltrosAvancados,
  filteredCargas,
  metrics,
  isDataLoading,
  exportarDados,
  setShowNovaCargaModal,
  visualizarCarga,
  aceitarCarga,
  atualizarStatus,
  Spinner,
  nomeEmpresa
}: FiltrosCargasProps) {

  // Função para filtrar cargas com motoristas da mesma empresa
  const filterCargasByMotoristaEmpresa = (cargas: Carga[]) => {
    console.log(nomeEmpresa);
    
    return cargas.filter(carga => {
      return carga.motorista && 
             carga.motorista.empresaMotorista && 
             carga.nomeEmpresa && 
             carga.motorista.empresaMotorista === carga.nomeEmpresa;
    });
  };

  // Aplicar filtro de motorista da empresa se estiver ativo
  const cargasFinais = filtrosAvancados.motoristaEmpresa 
    ? filterCargasByMotoristaEmpresa(filteredCargas)
    : filteredCargas;

  // Funções auxiliares
  const getStatusColor = (status: StatusCarga) => {
    const statusColors = {
      planeada: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
      aguardando_coleta: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      coletada: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      em_transito: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      em_fronteira: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      aguardando_desembaraco: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      em_entrega: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      entregue: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      encerrada: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      armazenada: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const getStatusText = (status: StatusCarga) => {
    const statusMap: Record<StatusCarga, string> = {
      planeada: 'Planeada',
      aguardando_coleta: 'Aguardando Coleta',
      coletada: 'Coletada',
      em_transito: 'Em Trânsito',
      em_fronteira: 'Em Fronteira',
      aguardando_desembaraco: 'Aguardando Desembaraço',
      em_entrega: 'Em Entrega',
      entregue: 'Entregue',
      encerrada: 'Encerrada',
      armazenada: 'Armazenada'
    };
    return statusMap[status];
  };

  const getPrioridadeColor = (prioridade: PrioridadeCarga) => {
    switch (prioridade) {
      case 'urgente':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'alta':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'média':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'baixa':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN'
    }).format(valor);
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-MZ');
  };

  const formatarPeso = (peso: number) => {
    if (peso >= 1000) {
      return `${(peso / 1000).toFixed(1)} ton`;
    }
    return `${peso} kg`;
  };

  // Função para limpar filtros
  const limparFiltros = () => {
    setSearchTerm("");
    setStatusFilter("todos");
    setTipoFilter("todos");
    setFiltrosAvancados({
      prioridade: "todos",
      valorMin: "",
      valorMax: "",
      dataInicio: "",
      dataFim: "",
      tipoCarga: "todos",
      naturezaCarga: "todos",
      motoristaEmpresa: false // ← RESETADO
    });
  };

  // Função para verificar se há filtros ativos
  const hasActiveFilters = () => {
    return searchTerm !== "" || 
           statusFilter !== "todos" || 
           tipoFilter !== "todos" ||
           filtrosAvancados.prioridade !== "todos" ||
           filtrosAvancados.valorMin !== "" ||
           filtrosAvancados.valorMax !== "" ||
           filtrosAvancados.dataInicio !== "" ||
           filtrosAvancados.dataFim !== "" ||
           filtrosAvancados.tipoCarga !== "todos" ||
           filtrosAvancados.naturezaCarga !== "todos" ||
           filtrosAvancados.motoristaEmpresa; // ← ADICIONADO
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
                placeholder="Buscar por código, cliente, origem, destino..."
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
                {STATUS_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select
                value={tipoFilter}
                onChange={(e) => setTipoFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {TIPO_CARGA_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Botão para filtrar por motorista da empresa */}
              <button
                onClick={() => setFiltrosAvancados(prev => ({
                  ...prev,
                  motoristaEmpresa: !prev.motoristaEmpresa
                }))}
                className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                  filtrosAvancados.motoristaEmpresa
                    ? 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-600'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <FiTruck className="w-4 h-4" />
                <span>Motoristas da Empresa</span>
                {filtrosAvancados.motoristaEmpresa && (
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    ✓
                  </span>
                )}
              </button>

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
              onClick={() => exportarDados("cargas")}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FiDownload className="w-4 h-4" />
              <span>Exportar</span>
            </button>

            <button
              onClick={() => setShowNovaCargaModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FiPlus className="w-4 h-4" />
              <span>Nova Carga</span>
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
                Prioridade
              </label>
              <select
                value={filtrosAvancados.prioridade}
                onChange={(e) =>
                  setFiltrosAvancados((prev) => ({
                    ...prev,
                    prioridade: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="todos">Todas</option>
                <option value="urgente">Urgente</option>
                <option value="alta">Alta</option>
                <option value="média">Média</option>
                <option value="baixa">Baixa</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tipo de Carga
              </label>
              <select
                value={filtrosAvancados.tipoCarga}
                onChange={(e) =>
                  setFiltrosAvancados((prev) => ({
                    ...prev,
                    tipoCarga: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {TIPO_CARGA_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Natureza
              </label>
              <select
                value={filtrosAvancados.naturezaCarga}
                onChange={(e) =>
                  setFiltrosAvancados((prev) => ({
                    ...prev,
                    naturezaCarga: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {NATUREZA_CARGA_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Valor Min (MZN)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={filtrosAvancados.valorMin}
                  onChange={(e) =>
                    setFiltrosAvancados((prev) => ({
                      ...prev,
                      valorMin: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Valor Max (MZN)
                </label>
                <input
                  type="number"
                  placeholder="1000000"
                  value={filtrosAvancados.valorMax}
                  onChange={(e) =>
                    setFiltrosAvancados((prev) => ({
                      ...prev,
                      valorMax: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Data Início
                </label>
                <input
                  type="date"
                  value={filtrosAvancados.dataInicio}
                  onChange={(e) =>
                    setFiltrosAvancados((prev) => ({
                      ...prev,
                      dataInicio: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Data Fim
                </label>
                <input
                  type="date"
                  value={filtrosAvancados.dataFim}
                  onChange={(e) =>
                    setFiltrosAvancados((prev) => ({
                      ...prev,
                      dataFim: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Filtro de Motorista da Empresa nos Filtros Avançados */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="motoristaEmpresa"
                checked={filtrosAvancados.motoristaEmpresa}
                onChange={(e) =>
                  setFiltrosAvancados((prev) => ({
                    ...prev,
                    motoristaEmpresa: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="motoristaEmpresa" className="text-sm text-gray-700 dark:text-gray-300">
                Apenas motoristas da empresa
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Cargas</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{metrics.totalCargas}</p>
            </div>
            <FiPackage className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Em Trânsito</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{metrics.cargasTransito}</p>
            </div>
            <FiTruck className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Entregues</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{metrics.cargasEntregues}</p>
            </div>
            <FiCheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Valor Total</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatarMoeda(metrics.valorTotalFretes)}
              </p>
            </div>
            <FiDollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Tabela de Cargas */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Minhas Cargas ({cargasFinais.length})
              {filtrosAvancados.motoristaEmpresa && (
                <span className="ml-2 text-sm text-blue-600 dark:text-blue-400">
                  (Filtrado: Motoristas da Empresa)
                </span>
              )}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Peso Total:{" "}
                <span className="font-semibold text-green-600">
                  {formatarPeso(metrics.pesoTotal)}
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
                  Carga
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rota
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
                  Valor
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
                      Carregando cargas...
                    </p>
                  </td>
                </tr>
              ) : cargasFinais.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Nenhuma carga encontrada
                    </p>
                  </td>
                </tr>
              ) : (
                cargasFinais.map((carga) => (
                  <tr
                    key={carga.codigo}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {carga.codigo}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center space-x-1 mt-1">
                          <FiPackage className="w-3 h-3" />
                          <span>{carga.tipoCarga}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatarPeso(carga.pesoBruto)}
                        </div>
                        {/* Indicador de motorista da empresa */}
                        {carga.motorista && carga.motorista.empresaMotorista === carga.nomeEmpresa && (
                          <div className="inline-flex items-center px-2 py-1 mt-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            <FiCheckCircle className="w-3 h-3 mr-1" />
                            Motorista da Empresa
                          </div>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white flex items-center space-x-1">
                        <FiMapPin className="w-3 h-3 text-green-600" />
                        <span>{carga.origem.cidade}</span>
                      </div>
                      <div className="text-sm text-gray-900 dark:text-white flex items-center space-x-1">
                        <FiMapPin className="w-3 h-3 text-red-600" />
                        <span>{carga.destino.cidade}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {carga.origem.local} → {carga.destino.local}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {carga.cliente}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {carga.clienteId}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-1">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            carga.status
                          )}`}
                        >
                          {getStatusText(carga.status)}
                        </span>
                        {carga.dataEntregaPrevista && (
                          <div className="text-xs text-gray-500 flex items-center space-x-1">
                            <FiCalendar className="w-3 h-3" />
                            <span>Prev: {formatarData(carga.dataEntregaPrevista)}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPrioridadeColor(
                          carga.prioridade
                        )}`}
                      >
                        {carga.prioridade.charAt(0).toUpperCase() + carga.prioridade.slice(1)}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatarMoeda(carga.valorTotal)}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => visualizarCarga(carga)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-colors"
                        >
                          <FiEye className="w-4 h-4 mr-1" />
                          Detalhes
                        </button>

                        {carga.status === "planeada" && (
                          <button
                            onClick={() => aceitarCarga(carga.codigo)}
                            className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center transition-colors"
                          >
                            <FiCheckCircle className="w-4 h-4 mr-1" />
                            Aceitar
                          </button>
                        )}

                        {carga.status === "coletada" && (
                          <button
                            onClick={() => atualizarStatus(carga.codigo, "em_transito")}
                            className="text-orange-600 hover:text-orange-800 text-sm font-medium flex items-center transition-colors"
                          >
                            <FiTruck className="w-4 h-4 mr-1" />
                            Iniciar
                          </button>
                        )}

                        <button className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center transition-colors">
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
  );
}