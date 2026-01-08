// ClientesList.tsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Search,
  Filter,
  Edit,
  Eye,
  Trash2,
  Download,
  Users,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Loader2,
  RefreshCw
} from "lucide-react";
import VisualizarClienteModal from "../models/VisualizarClienteModal";
import EditarClienteModal from "../models/EditarClienteModal";

// Interfaces organizadas em arquivos separados ou módulos
interface Contato {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  principal: boolean;
  departamento?: string;
  observacoes?: string;
}

interface Endereco {
  rua: string;
  cidade: string;
  pais: string;
  codigoPostal?: string;
  provincia?: string;
  bairro?: string;
  pontoReferencia?: string;
  observacoes?: string;
  coordenadas?: {
    lat: number;
    lng: number;
  };
}

interface DocumentoFiscal {
  tipo: string;
  numero: string;
  validade: string;
  arquivo: string;
}

interface Viagem {
  viagemId: number;
  numeroViagem: string;
  cargaDescricao: string;
  status: string;
  dataPartida: string;
  dataEntrega: string;
  valorFrete: number;
  origem: string;
  destino: string;
  motorista: string;
}

interface Motorista {
  id: number;
  nome: string;
  telefone: string;
  empresaMotorista: string;
  cartaConducaoNumero: string;
  cartaConducaoCategoria: string;
  validadeCartaConducao: string;
  avaliacao: number;
}

interface Reclamacao {
  viagemId: number;
  descricao: string;
  data: string;
  tipo: string;
  severidade: string;
  status: string;
}

interface Feedback {
  data: string;
  pontuacao: number;
  observacao: string;
  avaliador: string;
}

interface Interacao {
  data: string;
  tipo: string;
  descricao: string;
  responsavel: string;
  resultado: string;
}

interface Cliente {
  codigo: string;
  nome: string;
  nomeEmpresa: string;
  categoria: string;
  nuit: string;
  tipoPessoa: string;
  classificacao: string;
  status: string;
  segmento: string;
  subsegmento?: string;
  dataCadastro: string;
  dataUltimaAtualizacao?: string;
  dataUltimaCompra?: string;
  dataProximoContato?: string;
  contatos: Contato[];
  enderecoCobranca?: Endereco;
  enderecoEntregaPadrao?: Endereco;
  enderecoColetaPadrao?: Endereco;
  limiteCredito?: number;
  formaPagamento?: string;
  prazoPagamento?: number;
  moeda?: string;
  documentosFiscais?: DocumentoFiscal[];
  instrucaoEspecial?: string;
  prioridadeAtendimento?: string;
  observacoes?: string;
  preferencias?: Array<{ tipo: string; descricao: string }>;
  historicoViagens?: Viagem[];
  motoristasAssociados?: Motorista[];
  comportamento?: {
    pontualidadePagamentos: number;
    cumprimentoInstrucoes: number;
    frequenciaReclamacoes: number;
    historicoReclamacoes: Reclamacao[];
    dataUltimaReclamacao?: string;
  };
  metricas?: {
    totalViagens: number;
    viagensConcluidas: number;
    viagensPendentes: number;
    valorTotalFretes: number;
    mediaMensalFretes: number;
    indiceSatisfacao: number;
    ultimaViagemData?: string;
  };
  avaliacao?: number;
  feedbackHistorico?: Feedback[];
  vendedorResponsavel?: string;
  canalCaptacao?: string;
  potencialMensal?: number;
  tags?: string[];
  setor?: string;
  notificacoes?: {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
    alertasStatus: boolean;
    relatoriosMensais: boolean;
  };
  historicoInteracoes?: Interacao[];
  contratoNumero?: string;
  contratoValidade?: string;
  tipoContrato?: string;
}

interface Filtros {
  nome: string;
  codigo: string;
  nuit: string;
  categoria: string;
  tipoPessoa: string;
  classificacao: string;
  status: string;
  segmento: string;
}

interface Paginacao {
  curPage: number;
  pageSize: number;
  totalCount: number;
  totalPage: number;
}

interface ApiResponse {
  returnCode: number;
  data: {
    list: Cliente[];
    totalCount: number;
    totalPage: number;
  };
}

// Constantes para reutilização
const CATEGORIAS = ["Gestor", "Cliente", "Motorista"] as const;
const STATUS = ["ativo", "inativo", "suspenso", "potencial"] as const;
const CLASSIFICACOES = ["VIP", "A", "B", "C", "Novo"] as const;

const ITENS_POR_PAGINA = [10, 25, 50] as const;

// Hook personalizado para debounce
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const ClientesList: React.FC = () => {
  // Estados
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtros, setFiltros] = useState<Filtros>({
    nome: "",
    codigo: "",
    nuit: "",
    categoria: "",
    tipoPessoa: "",
    classificacao: "",
    status: "",
    segmento: "",
  });
  
  const [paginacao, setPaginacao] = useState<Paginacao>({
    curPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPage: 0,
  });
  
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  
  // Estados para modais
  const [modalAberto, setModalAberto] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [modalVisualizarAberto, setModalVisualizarAberto] = useState(false);
  const [clienteVisualizando, setClienteVisualizando] = useState<string | null>(null);

  // Debounce para filtros (evita múltiplas requisições)
  const filtrosDebounced = useDebounce(filtros, 500);

  // Estatísticas calculadas
  const estatisticas = useMemo(() => ({
    total: clientes.length,
    ativos: clientes.filter(c => c.status === "ativo").length,
    vip: clientes.filter(c => c.classificacao === "VIP").length,
    inativos: clientes.filter(c => c.status === "inativo").length,
  }), [clientes]);

  // Função principal para carregar clientes
  const carregarClientes = useCallback(async (pagina = 1, tamanhoPagina = paginacao.pageSize) => {
    setCarregando(true);
    setErro(null);

    try {
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getClienteList",
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
          },
          body: JSON.stringify({
            curPage: pagina,
            pageSize: tamanhoPagina,
            ...filtrosDebounced,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (data.returnCode === 200) {
        setClientes(data.data.list || []);
        setPaginacao(prev => ({
          ...prev,
          curPage: pagina,
          pageSize: tamanhoPagina,
          totalCount: data.data.totalCount,
          totalPage: data.data.totalPage,
        }));
      } else {
        throw new Error("Erro na resposta da API");
      }
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
      setErro("Não foi possível carregar os clientes. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }, [filtrosDebounced, paginacao.pageSize]);

  // Carregar clientes quando filtros mudarem
  useEffect(() => {
    carregarClientes(1);
  }, [carregarClientes]);

  // Handlers
  const handleFiltroChange = useCallback((campo: keyof Filtros, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const handleLimparFiltros = useCallback(() => {
    setFiltros({
      nome: "",
      codigo: "",
      nuit: "",
      categoria: "",
      tipoPessoa: "",
      classificacao: "",
      status: "",
      segmento: "",
    });
  }, []);

  const handleExcluirCliente = useCallback(async (codigo: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este cliente?")) {
      return;
    }

    try {
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/deleteCliente",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ codigo }),
        }
      );

      const data = await response.json();
      if (data.returnCode === 200) {
        carregarClientes(paginacao.curPage);
      } else {
        alert("Erro ao excluir cliente");
      }
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      alert("Erro ao excluir cliente. Tente novamente.");
    }
  }, [carregarClientes, paginacao.curPage]);

  // Funções para modais
  const abrirModalEdicao = useCallback((cliente: Cliente) => {
    setClienteEditando(cliente);
    setModalAberto(true);
  }, []);

  const fecharModal = useCallback(() => {
    setModalAberto(false);
    setClienteEditando(null);
  }, []);

  const handleEdicaoSucesso = useCallback(() => {
    carregarClientes(paginacao.curPage);
  }, [carregarClientes, paginacao.curPage]);

  const abrirModalVisualizacao = useCallback((codigo: string) => {
    setClienteVisualizando(codigo);
    setModalVisualizarAberto(true);
  }, []);

  const fecharModalVisualizacao = useCallback(() => {
    setModalVisualizarAberto(false);
    setClienteVisualizando(null);
  }, []);

  // Mapeamento de cores (pode ser movido para um arquivo de constantes)
  const classificacaoCores: Record<string, string> = {
    VIP: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    A: "bg-green-100 text-green-800 border border-green-200",
    B: "bg-blue-100 text-blue-800 border border-blue-200",
    C: "bg-purple-100 text-purple-800 border border-purple-200",
    Novo: "bg-gray-100 text-gray-800 border border-gray-200",
  };

  const statusCores: Record<string, string> = {
    ativo: "bg-green-100 text-green-800 border border-green-200",
    inativo: "bg-gray-100 text-gray-800 border border-gray-200",
    suspenso: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    potencial: "bg-blue-100 text-blue-800 border border-blue-200",
  };

  const categoriaCores: Record<string, string> = {
    Gestor: "bg-blue-100 text-blue-800 border border-blue-200",
    Cliente: "bg-green-100 text-green-800 border border-green-200",
    Motorista: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  };

  // Geração de páginas para paginação
  const paginas = useMemo(() => {
    const totalPages = paginacao.totalPage;
    const currentPage = paginacao.curPage;
    const pages = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + 4);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }, [paginacao.curPage, paginacao.totalPage]);

  // Formatação de data
  const formatarData = useCallback((dataString: string) => {
    try {
      return new Date(dataString).toLocaleDateString("pt-MZ", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return "Data inválida";
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 text-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Gestão de Clientes
              </h1>
              <p className="text-gray-600 mt-1 md:mt-2">
                Gerencie clientes, gestores e motoristas do sistema
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button
                onClick={() => carregarClientes(paginacao.curPage)}
                disabled={carregando}
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${carregando ? 'animate-spin' : ''}`} />
                Atualizar
              </button>
              <a
                href="/clientes/novo"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Novo Cadastro
              </a>
            </div>
          </div>

          {/* Cards Resumo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="bg-blue-50 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Clientes</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {estatisticas.total}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="bg-green-50 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {estatisticas.ativos}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="bg-purple-50 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">VIP</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {estatisticas.vip}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="bg-gray-50 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Inativos</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {estatisticas.inativos}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filtros
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 hidden md:inline">
                  {carregando ? "Aplicando filtros..." : "Pressione Enter para buscar"}
                </span>
                <button
                  onClick={handleLimparFiltros}
                  className="text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-1 rounded-md transition-colors"
                >
                  Limpar filtros
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome / Empresa
                </label>
                <input
                  type="text"
                  value={filtros.nome}
                  onChange={(e) => handleFiltroChange("nome", e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && carregarClientes(1)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Buscar por nome..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <select
                  value={filtros.categoria}
                  onChange={(e) => handleFiltroChange("categoria", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
                >
                  <option value="">Todas as categorias</option>
                  {CATEGORIAS.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={filtros.status}
                  onChange={(e) => handleFiltroChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
                >
                  <option value="">Todos os status</option>
                  {STATUS.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Classificação
                </label>
                <select
                  value={filtros.classificacao}
                  onChange={(e) => handleFiltroChange("classificacao", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
                >
                  <option value="">Todas as classificações</option>
                  {CLASSIFICACOES.map(classif => (
                    <option key={classif} value={classif}>{classif}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NUIT
                </label>
                <input
                  type="text"
                  value={filtros.nuit}
                  onChange={(e) => handleFiltroChange("nuit", e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && carregarClientes(1)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Número do NUIT"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código
                </label>
                <input
                  type="text"
                  value={filtros.codigo}
                  onChange={(e) => handleFiltroChange("codigo", e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && carregarClientes(1)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Código do cliente"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Segmento
                </label>
                <input
                  type="text"
                  value={filtros.segmento}
                  onChange={(e) => handleFiltroChange("segmento", e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && carregarClientes(1)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Segmento de atuação"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => carregarClientes(1)}
                  disabled={carregando}
                  className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Search className="h-4 w-4 mr-2" />
                  {carregando ? "Buscando..." : "Buscar"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mensagem de erro */}
        {erro && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center">
              <div className="text-red-600 font-medium">{erro}</div>
              <button
                onClick={() => setErro(null)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Tabela */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Lista de Clientes
              </h2>
              <p className="text-sm text-gray-600">
                {paginacao.totalCount} clientes encontrados
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={paginacao.pageSize}
                onChange={(e) => carregarClientes(1, Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              >
                {ITENS_POR_PAGINA.map(item => (
                  <option key={item} value={item}>{item} itens</option>
                ))}
              </select>
              <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </button>
            </div>
          </div>

          {carregando ? (
            <div className="p-12 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
              <p className="mt-3 text-gray-600">Carregando clientes...</p>
            </div>
          ) : clientes.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {Object.values(filtros).some(f => f) 
                  ? "Nenhum cliente encontrado com os filtros aplicados." 
                  : "Nenhum cliente cadastrado."}
              </p>
              {Object.values(filtros).some(f => f) && (
                <button
                  onClick={handleLimparFiltros}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Código
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nome / Empresa
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Classificação
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contato
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cadastro
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {clientes.map((cliente) => (
                      <tr 
                        key={cliente.codigo} 
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-blue-600 font-mono">
                            {cliente.codigo}
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                              {cliente.nome}
                            </div>
                            <div className="text-xs text-gray-500">
                              {cliente.nomeEmpresa}
                            </div>
                            <div className="text-xs text-gray-400 font-mono">
                              NUIT: {cliente.nuit}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                              categoriaCores[cliente.categoria] ||
                              "bg-gray-100 text-gray-800 border border-gray-200"
                            }`}
                          >
                            {cliente.categoria}
                          </span>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                              classificacaoCores[cliente.classificacao]
                            }`}
                          >
                            {cliente.classificacao}
                          </span>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                              statusCores[cliente.status]
                            }`}
                          >
                            {cliente.status}
                          </span>
                        </td>
                        <td className="px-4 md:px-6 py-4">
                          <div className="text-sm text-gray-900 truncate max-w-[150px]">
                            {cliente.contatos?.[0]?.email || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {cliente.contatos?.[0]?.telefone || "N/A"}
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatarData(cliente.dataCadastro)}
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => abrirModalVisualizacao(cliente.codigo)}
                              className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                              title="Visualizar detalhes"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => abrirModalEdicao(cliente)}
                              className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors"
                              title="Editar cliente"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleExcluirCliente(cliente.codigo)}
                              className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                              title="Excluir cliente"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginação */}
              <div className="px-4 md:px-6 py-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-gray-700">
                    Mostrando <span className="font-medium">{clientes.length}</span> de{" "}
                    <span className="font-medium">{paginacao.totalCount}</span> clientes
                    {paginacao.totalPage > 1 && (
                      <span className="ml-2">
                        (Página {paginacao.curPage} de {paginacao.totalPage})
                      </span>
                    )}
                  </div>
                  
                  {paginacao.totalPage > 1 && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => carregarClientes(paginacao.curPage - 1)}
                        disabled={paginacao.curPage === 1}
                        className={`p-2 rounded-lg transition-colors ${
                          paginacao.curPage === 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>

                      {paginas.map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => carregarClientes(pageNum)}
                          className={`min-w-[40px] h-10 rounded-lg font-medium transition-colors ${
                            paginacao.curPage === pageNum
                              ? "bg-blue-600 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}

                      <button
                        onClick={() => carregarClientes(paginacao.curPage + 1)}
                        disabled={paginacao.curPage === paginacao.totalPage}
                        className={`p-2 rounded-lg transition-colors ${
                          paginacao.curPage === paginacao.totalPage
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modais */}
      <EditarClienteModal
        isOpen={modalAberto}
        onClose={fecharModal}
        cliente={clienteEditando}
        onSuccess={handleEdicaoSucesso}
      />
      <VisualizarClienteModal
        isOpen={modalVisualizarAberto}
        onClose={fecharModalVisualizacao}
        clienteCodigo={clienteVisualizando}
      />
    </div>
  );
};

export default ClientesList;