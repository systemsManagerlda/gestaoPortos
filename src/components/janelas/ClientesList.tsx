/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// ClientesList.tsx
import React, { useState, useEffect } from "react";
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
  X,
  Save,
  Loader2,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  FileText,
  Tag,
  Building,
  Award,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  Truck,
  Star,
  BarChart3,
  Activity,
  Printer,
  CreditCard as CreditCardIcon,
  CalendarDays,
  Users as UsersIcon,
  Package as PackageIcon,
} from "lucide-react";

// Interfaces
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

// Componente Modal de Visualização
const VisualizarClienteModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  clienteCodigo: string | null;
}> = ({ isOpen, onClose, clienteCodigo }) => {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("geral");

  useEffect(() => {
    if (isOpen && clienteCodigo) {
      fetchClienteDetails();
    } else {
      setCliente(null);
    }
  }, [isOpen, clienteCodigo]);

  const fetchClienteDetails = async () => {
    if (!clienteCodigo) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getClienteDetail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ codigo: clienteCodigo }),
        }
      );

      const data = await response.json();

      if (data.returnCode === 200) {
        setCliente(data.data);
      } else {
        setError("Erro ao carregar detalhes do cliente");
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
      setError("Erro ao carregar dados do cliente");
    } finally {
      setLoading(false);
    }
  };

  const formatarData = (dataString?: string) => {
    if (!dataString) return "Não definido";
    return new Date(dataString).toLocaleDateString("pt-MZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatarMoeda = (valor?: number) => {
    if (!valor) return "MZN 0,00";
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
    }).format(valor);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800";
      case "inativo":
        return "bg-gray-100 text-gray-800";
      case "suspenso":
        return "bg-yellow-100 text-yellow-800";
      case "potencial":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getClassificacaoColor = (classificacao: string) => {
    switch (classificacao) {
      case "VIP":
        return "bg-yellow-100 text-yellow-800";
      case "A":
        return "bg-green-100 text-green-800";
      case "B":
        return "bg-blue-100 text-blue-800";
      case "C":
        return "bg-purple-100 text-purple-800";
      case "Novo":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "Gestor":
        return "bg-blue-100 text-blue-800";
      case "Cliente":
        return "bg-green-100 text-green-800";
      case "Motorista":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPrioridadeColor = (prioridade?: string) => {
    if (!prioridade) return "bg-gray-100 text-gray-800";

    switch (prioridade.toLowerCase()) {
      case "urgente":
        return "bg-red-100 text-red-800";
      case "alta":
        return "bg-orange-100 text-orange-800";
      case "média":
      case "media":
        return "bg-yellow-100 text-yellow-800";
      case "baixa":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSeveridadeColor = (severidade: string) => {
    switch (severidade) {
      case "alta":
        return "bg-red-100 text-red-800";
      case "média":
        return "bg-yellow-100 text-yellow-800";
      case "baixa":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getViagemStatusColor = (status: string) => {
    switch (status) {
      case "entregue":
        return "bg-green-100 text-green-800";
      case "em_transito":
        return "bg-blue-100 text-blue-800";
      case "planeada":
        return "bg-yellow-100 text-yellow-800";
      case "cancelada":
        return "bg-red-100 text-red-800";
      case "atrasada":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>

        {/* Modal Container - Tamanho maior para mais informações */}
        <div className="inline-block w-full max-w-6xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-xl shadow-2xl">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                    cliente?.categoria === "Gestor"
                      ? "bg-blue-100"
                      : cliente?.categoria === "Cliente"
                      ? "bg-green-100"
                      : cliente?.categoria === "Motorista"
                      ? "bg-yellow-100"
                      : "bg-gray-100"
                  }`}
                >
                  <User className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {cliente?.nome || "Carregando..."}
                    </h3>
                    {cliente && (
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          cliente.status
                        )}`}
                      >
                        {cliente.status.charAt(0).toUpperCase() +
                          cliente.status.slice(1)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-1 space-x-3">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {cliente?.codigo || ""}
                    </span>
                    {cliente?.nomeEmpresa && (
                      <>
                        <span className="text-sm text-gray-600">•</span>
                        <span className="text-sm text-gray-600">
                          {cliente.nomeEmpresa}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="p-2 text-gray-400 rounded-lg hover:text-gray-500 hover:bg-gray-100 transition-colors"
                  title="Imprimir"
                >
                  <Printer className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 rounded-lg hover:text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs de Navegação */}
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto -mb-px">
              <button
                onClick={() => setActiveTab("geral")}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "geral"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <User className="inline-block w-4 h-4 mr-2" />
                Visão Geral
              </button>
              <button
                onClick={() => setActiveTab("contatos")}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "contatos"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <UsersIcon className="inline-block w-4 h-4 mr-2" />
                Contatos
              </button>
              <button
                onClick={() => setActiveTab("enderecos")}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "enderecos"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <MapPin className="inline-block w-4 h-4 mr-2" />
                Endereços
              </button>
              <button
                onClick={() => setActiveTab("financeiro")}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "financeiro"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <CreditCard className="inline-block w-4 h-4 mr-2" />
                Financeiro
              </button>
              <button
                onClick={() => setActiveTab("viagens")}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "viagens"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Truck className="inline-block w-4 h-4 mr-2" />
                Viagens
              </button>
              <button
                onClick={() => setActiveTab("comportamento")}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "comportamento"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Activity className="inline-block w-4 h-4 mr-2" />
                Comportamento
              </button>
              <button
                onClick={() => setActiveTab("metricas")}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "metricas"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <BarChart3 className="inline-block w-4 h-4 mr-2" />
                Métricas
              </button>
              <button
                onClick={() => setActiveTab("historico")}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "historico"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <History className="inline-block w-4 h-4 mr-2" />
                Histórico
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            {loading ? (
              <div className="py-12 text-center">
                <Loader2 className="inline-block w-8 h-8 text-blue-600 animate-spin" />
                <p className="mt-2 text-gray-600">
                  Carregando detalhes do cliente...
                </p>
              </div>
            ) : error ? (
              <div className="py-8 text-center">
                <AlertCircle className="inline-block w-12 h-12 text-red-400" />
                <p className="mt-2 text-gray-700">{error}</p>
                <button
                  onClick={fetchClienteDetails}
                  className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  Tentar novamente
                </button>
              </div>
            ) : !cliente ? (
              <div className="py-8 text-center">
                <User className="inline-block w-12 h-12 text-gray-400" />
                <p className="mt-2 text-gray-600">Cliente não encontrado</p>
              </div>
            ) : (
              <>
                {/* Tab: Visão Geral */}
                {activeTab === "geral" && (
                  <div className="space-y-6">
                    {/* Card Principal */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Informações Básicas */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <User className="w-5 h-5 mr-2 text-blue-600" />
                            Informações Básicas
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Código
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {cliente.codigo}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                NUIT
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {cliente.nuit}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Tipo de Pessoa
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {cliente.tipoPessoa}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Data de Cadastro
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {formatarData(cliente.dataCadastro)}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Segmento
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {cliente.segmento || "Não informado"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Subsegmento
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {cliente.subsegmento || "Não informado"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Status e Classificação */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <Award className="w-5 h-5 mr-2 text-yellow-600" />
                              Classificação
                            </h4>
                            <div className="flex items-center space-x-4">
                              <span
                                className={`px-3 py-1.5 text-sm font-semibold rounded-full ${getClassificacaoColor(
                                  cliente.classificacao
                                )}`}
                              >
                                {cliente.classificacao}
                              </span>
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-5 h-5 ${
                                      star <= (cliente.avaliacao || 0)
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                                <span className="ml-2 text-sm text-gray-600">
                                  {cliente.avaliacao?.toFixed(1) || "0.0"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <Activity className="w-5 h-5 mr-2 text-green-600" />
                              Status e Prioridade
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">
                                  Status
                                </span>
                                <span
                                  className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                    cliente.status
                                  )}`}
                                >
                                  {cliente.status.charAt(0).toUpperCase() +
                                    cliente.status.slice(1)}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">
                                  Prioridade
                                </span>
                                <span
                                  className={`px-3 py-1 text-xs font-semibold rounded-full ${getPrioridadeColor(
                                    cliente.prioridadeAtendimento
                                  )}`}
                                >
                                  {cliente.prioridadeAtendimento
                                    ? cliente.prioridadeAtendimento
                                        .charAt(0)
                                        .toUpperCase() +
                                      cliente.prioridadeAtendimento.slice(1)
                                    : "Média"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card de Resumo */}
                      <div className="space-y-6">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">
                            Resumo
                          </h4>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Categoria
                              </p>
                              <span
                                className={`mt-1 inline-block px-3 py-1 text-sm font-semibold rounded-full ${getCategoriaColor(
                                  cliente.categoria
                                )}`}
                              >
                                {cliente.categoria}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Vendedor
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {cliente.vendedorResponsavel || "Não atribuído"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Canal de Captação
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {cliente.canalCaptacao
                                  ? cliente.canalCaptacao
                                      .charAt(0)
                                      .toUpperCase() +
                                    cliente.canalCaptacao.slice(1)
                                  : "Não informado"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Última Compra
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {cliente.dataUltimaCompra
                                  ? formatarData(cliente.dataUltimaCompra)
                                  : "Nenhuma compra"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Próximo Contato
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {cliente.dataProximoContato
                                  ? formatarData(cliente.dataProximoContato)
                                  : "Não agendado"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Tags */}
                        {cliente.tags && cliente.tags.length > 0 && (
                          <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <Tag className="w-5 h-5 mr-2 text-gray-600" />
                              Tags
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {cliente.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Observações */}
                    {cliente.observacoes && (
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <FileText className="w-5 h-5 mr-2 text-gray-600" />
                          Observações
                        </h4>
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {cliente.observacoes}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Contatos */}
                {activeTab === "contatos" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Contatos do Cliente
                      </h4>
                      <span className="text-sm text-gray-500">
                        {cliente.contatos?.length || 0} contato(s)
                      </span>
                    </div>

                    {!cliente.contatos || cliente.contatos.length === 0 ? (
                      <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                        <UsersIcon className="w-12 h-12 mx-auto text-gray-400" />
                        <p className="mt-2 text-gray-600">
                          Nenhum contato cadastrado
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cliente.contatos.map((contato, index) => (
                          <div
                            key={index}
                            className={`border rounded-lg p-4 ${
                              contato.principal
                                ? "border-blue-300 bg-blue-50"
                                : "border-gray-200 bg-white"
                            }`}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h5 className="font-semibold text-gray-900">
                                  {contato.nome || "Nome não informado"}
                                </h5>
                                <p className="text-sm text-gray-600">
                                  {contato.cargo || "Cargo não informado"}
                                </p>
                              </div>
                              {contato.principal && (
                                <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                                  Principal
                                </span>
                              )}
                            </div>

                            <div className="space-y-2">
                              {contato.email && (
                                <div className="flex items-center text-sm">
                                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                  <a
                                    href={`mailto:${contato.email}`}
                                    className="text-blue-600 hover:text-blue-800 hover:underline"
                                  >
                                    {contato.email}
                                  </a>
                                </div>
                              )}

                              {contato.telefone && (
                                <div className="flex items-center text-sm">
                                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                  <a
                                    href={`tel:${contato.telefone}`}
                                    className="text-gray-700 hover:text-blue-600"
                                  >
                                    {contato.telefone}
                                  </a>
                                </div>
                              )}

                              {contato.departamento && (
                                <div className="flex items-center text-sm">
                                  <Building className="w-4 h-4 mr-2 text-gray-400" />
                                  <span className="text-gray-700">
                                    {contato.departamento}
                                  </span>
                                </div>
                              )}
                            </div>

                            {contato.observacoes && (
                              <div className="mt-3 pt-3 border-t border-gray-200">
                                <p className="text-sm text-gray-600">
                                  {contato.observacoes}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Endereços */}
                {activeTab === "enderecos" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Endereços do Cliente
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Endereço de Cobrança */}
                      <div className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                          <CreditCardIcon className="w-5 h-5 mr-2 text-blue-600" />
                          <h5 className="font-semibold text-gray-900">
                            Endereço de Cobrança
                          </h5>
                        </div>

                        {cliente.enderecoCobranca ? (
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Endereço
                              </p>
                              <p className="text-gray-900">
                                {cliente.enderecoCobranca.rua}
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Bairro
                                </p>
                                <p className="text-gray-900">
                                  {cliente.enderecoCobranca.bairro}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Cidade
                                </p>
                                <p className="text-gray-900">
                                  {cliente.enderecoCobranca.cidade}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Província
                                </p>
                                <p className="text-gray-900">
                                  {cliente.enderecoCobranca.provincia}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Código Postal
                                </p>
                                <p className="text-gray-900">
                                  {cliente.enderecoCobranca.codigoPostal}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                País
                              </p>
                              <p className="text-gray-900">
                                {cliente.enderecoCobranca.pais}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">
                            Endereço de cobrança não cadastrado
                          </p>
                        )}
                      </div>

                      {/* Endereço de Entrega Padrão */}
                      <div className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                          <PackageIcon className="w-5 h-5 mr-2 text-green-600" />
                          <h5 className="font-semibold text-gray-900">
                            Endereço de Entrega
                          </h5>
                        </div>

                        {cliente.enderecoEntregaPadrao ? (
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Endereço
                              </p>
                              <p className="text-gray-900">
                                {cliente.enderecoEntregaPadrao.rua}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Cidade
                              </p>
                              <p className="text-gray-900">
                                {cliente.enderecoEntregaPadrao.cidade}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                País
                              </p>
                              <p className="text-gray-900">
                                {cliente.enderecoEntregaPadrao.pais}
                              </p>
                            </div>
                            {cliente.enderecoEntregaPadrao.pontoReferencia && (
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Ponto de Referência
                                </p>
                                <p className="text-gray-900">
                                  {
                                    cliente.enderecoEntregaPadrao
                                      .pontoReferencia
                                  }
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">
                            Endereço de entrega padrão não cadastrado
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Financeiro */}
                {activeTab === "financeiro" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Informações Financeiras
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Limite de Crédito */}
                      <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                          <CreditCard className="w-6 h-6 mr-3 text-green-600" />
                          <div>
                            <h5 className="font-semibold text-gray-900">
                              Limite de Crédito
                            </h5>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                              {formatarMoeda(cliente.limiteCredito)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Forma de Pagamento */}
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                          <DollarSign className="w-6 h-6 mr-3 text-blue-600" />
                          <div>
                            <h5 className="font-semibold text-gray-900">
                              Forma de Pagamento
                            </h5>
                            <p className="text-lg font-semibold text-gray-900 mt-1">
                              {cliente.formaPagamento || "Não definida"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Prazo de Pagamento */}
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                          <CalendarDays className="w-6 h-6 mr-3 text-purple-600" />
                          <div>
                            <h5 className="font-semibold text-gray-900">
                              Prazo de Pagamento
                            </h5>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                              {cliente.prazoPagamento || 0} dias
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Informações Adicionais */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4">
                          Contrato
                        </h5>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Número do Contrato
                            </p>
                            <p className="text-gray-900">
                              {cliente.contratoNumero || "Não contratado"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Tipo de Contrato
                            </p>
                            <p className="text-gray-900">
                              {cliente.tipoContrato || "Não definido"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Validade do Contrato
                            </p>
                            <p className="text-gray-900">
                              {cliente.contratoValidade
                                ? formatarData(cliente.contratoValidade)
                                : "Não definida"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4">
                          Moeda e Preferências
                        </h5>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Moeda
                            </p>
                            <p className="text-gray-900">
                              {cliente.moeda || "MZN"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Instruções Especiais
                            </p>
                            <p className="text-gray-900">
                              {cliente.instrucaoEspecial || "Nenhuma"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Viagens */}
                {activeTab === "viagens" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Histórico de Viagens
                      </h4>
                      <span className="text-sm text-gray-500">
                        {cliente.metricas?.totalViagens || 0} viagem(s)
                      </span>
                    </div>

                    {!cliente.historicoViagens ||
                    cliente.historicoViagens.length === 0 ? (
                      <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                        <Truck className="w-12 h-12 mx-auto text-gray-400" />
                        <p className="mt-2 text-gray-600">
                          Nenhuma viagem registrada
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Métricas Rápidas */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <p className="text-sm font-medium text-gray-500">
                              Total
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              {cliente.metricas?.totalViagens || 0}
                            </p>
                          </div>
                          <div className="bg-white border border-green-200 rounded-lg p-4">
                            <p className="text-sm font-medium text-gray-500">
                              Concluídas
                            </p>
                            <p className="text-2xl font-bold text-green-600">
                              {cliente.metricas?.viagensConcluidas || 0}
                            </p>
                          </div>
                          <div className="bg-white border border-blue-200 rounded-lg p-4">
                            <p className="text-sm font-medium text-gray-500">
                              Pendentes
                            </p>
                            <p className="text-2xl font-bold text-blue-600">
                              {cliente.metricas?.viagensPendentes || 0}
                            </p>
                          </div>
                          <div className="bg-white border border-purple-200 rounded-lg p-4">
                            <p className="text-sm font-medium text-gray-500">
                              Valor Total
                            </p>
                            <p className="text-xl font-bold text-purple-600">
                              {formatarMoeda(
                                cliente.metricas?.valorTotalFretes
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Lista de Viagens */}
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                  Viagem
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                  Carga
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                  Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                  Data
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                  Valor
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                  Motorista
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {cliente.historicoViagens.map((viagem, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="px-4 py-3">
                                    <div className="font-medium text-gray-900">
                                      {viagem.numeroViagem}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      #{viagem.viagemId}
                                    </div>
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="font-medium text-gray-900">
                                      {viagem.cargaDescricao}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {viagem.origem} → {viagem.destino}
                                    </div>
                                  </td>
                                  <td className="px-4 py-3">
                                    <span
                                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getViagemStatusColor(
                                        viagem.status
                                      )}`}
                                    >
                                      {viagem.status
                                        .replace("_", " ")
                                        .charAt(0)
                                        .toUpperCase() +
                                        viagem.status
                                          .replace("_", " ")
                                          .slice(1)}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="text-sm text-gray-900">
                                      {formatarData(viagem.dataPartida)}
                                    </div>
                                    {viagem.dataEntrega && (
                                      <div className="text-xs text-gray-500">
                                        Entrega:{" "}
                                        {formatarData(viagem.dataEntrega)}
                                      </div>
                                    )}
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="font-medium text-gray-900">
                                      {formatarMoeda(viagem.valorFrete)}
                                    </div>
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="text-sm text-gray-900">
                                      {viagem.motorista}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Tab: Comportamento */}
                {activeTab === "comportamento" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Análise de Comportamento
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Pontuações */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4">
                          Pontuações
                        </h5>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">
                                Pontualidade Pagamentos
                              </span>
                              <span className="text-sm font-semibold text-gray-900">
                                {cliente.comportamento
                                  ?.pontualidadePagamentos || 5}
                                /5
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{
                                  width: `${
                                    ((cliente.comportamento
                                      ?.pontualidadePagamentos || 5) /
                                      5) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">
                                Cumprimento Instruções
                              </span>
                              <span className="text-sm font-semibold text-gray-900">
                                {cliente.comportamento?.cumprimentoInstrucoes ||
                                  5}
                                /5
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{
                                  width: `${
                                    ((cliente.comportamento
                                      ?.cumprimentoInstrucoes || 5) /
                                      5) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">
                                Frequência Reclamações
                              </span>
                              <span className="text-sm font-semibold text-gray-900">
                                {cliente.comportamento?.frequenciaReclamacoes?.toFixed(
                                  1
                                ) || 0}
                                %
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  (cliente.comportamento
                                    ?.frequenciaReclamacoes || 0) > 30
                                    ? "bg-red-600"
                                    : (cliente.comportamento
                                        ?.frequenciaReclamacoes || 0) > 10
                                    ? "bg-yellow-600"
                                    : "bg-green-600"
                                }`}
                                style={{
                                  width: `${Math.min(
                                    cliente.comportamento
                                      ?.frequenciaReclamacoes || 0,
                                    100
                                  )}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Última Reclamação */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4">
                          Última Reclamação
                        </h5>
                        {cliente.comportamento?.dataUltimaReclamacao ? (
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Data
                              </p>
                              <p className="text-gray-900">
                                {formatarData(
                                  cliente.comportamento.dataUltimaReclamacao
                                )}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Total de Reclamações
                              </p>
                              <p className="text-gray-900">
                                {cliente.comportamento.historicoReclamacoes
                                  ?.length || 0}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <CheckCircle className="w-12 h-12 mx-auto text-green-400" />
                            <p className="mt-2 text-gray-600">
                              Nenhuma reclamação registrada
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Motoristas Preferidos */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4">
                          Motoristas Associados
                        </h5>
                        {cliente.motoristasAssociados &&
                        cliente.motoristasAssociados.length > 0 ? (
                          <div className="space-y-3">
                            {cliente.motoristasAssociados
                              .slice(0, 3)
                              .map((motorista, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                                >
                                  <div>
                                    <p className="font-medium text-gray-900">
                                      {motorista.nome}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {motorista.empresaMotorista}
                                    </p>
                                  </div>
                                  <div className="flex items-center">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    <span className="ml-1 text-sm text-gray-600">
                                      {motorista.avaliacao?.toFixed(1)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            {cliente.motoristasAssociados.length > 3 && (
                              <p className="text-sm text-gray-500 text-center">
                                + {cliente.motoristasAssociados.length - 3}{" "}
                                motorista(s)
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">
                            Nenhum motorista associado
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Histórico de Reclamações */}
                    {cliente.comportamento?.historicoReclamacoes &&
                      cliente.comportamento.historicoReclamacoes.length > 0 && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <h5 className="font-semibold text-gray-900 mb-4">
                            Histórico de Reclamações
                          </h5>
                          <div className="space-y-3">
                            {cliente.comportamento.historicoReclamacoes
                              .slice(0, 5)
                              .map((reclamacao, index) => (
                                <div
                                  key={index}
                                  className="border border-gray-200 rounded-lg p-3"
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeveridadeColor(
                                          reclamacao.severidade
                                        )}`}
                                      >
                                        {reclamacao.severidade
                                          .charAt(0)
                                          .toUpperCase() +
                                          reclamacao.severidade.slice(1)}
                                      </span>
                                      <span className="ml-2 text-sm text-gray-600">
                                        {reclamacao.tipo}
                                      </span>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                      {formatarData(reclamacao.data)}
                                    </span>
                                  </div>
                                  <p className="text-gray-700">
                                    {reclamacao.descricao}
                                  </p>
                                  <div className="flex justify-between items-center mt-2">
                                    <span className="text-sm text-gray-500">
                                      Viagem #{reclamacao.viagemId}
                                    </span>
                                    <span
                                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                        reclamacao.status === "resolvida"
                                          ? "bg-green-100 text-green-800"
                                          : reclamacao.status === "pendente"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-blue-100 text-blue-800"
                                      }`}
                                    >
                                      {reclamacao.status
                                        .replace("_", " ")
                                        .charAt(0)
                                        .toUpperCase() +
                                        reclamacao.status
                                          .replace("_", " ")
                                          .slice(1)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                  </div>
                )}

                {/* Tab: Métricas */}
                {activeTab === "metricas" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Métricas e Estatísticas
                    </h4>

                    {/* Cards de Métricas */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-500">
                          Viagens Totais
                        </p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          {cliente.metricas?.totalViagens || 0}
                        </p>
                      </div>
                      <div className="bg-white border border-green-200 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-500">
                          Taxa de Sucesso
                        </p>
                        <p className="text-2xl font-bold text-green-600 mt-1">
                          {cliente.metricas?.totalViagens
                            ? Math.round(
                                ((cliente.metricas?.viagensConcluidas || 0) /
                                  cliente.metricas.totalViagens) *
                                  100
                              )
                            : 0}
                          %
                        </p>
                      </div>
                      <div className="bg-white border border-blue-200 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-500">
                          Faturamento Total
                        </p>
                        <p className="text-xl font-bold text-blue-600 mt-1">
                          {formatarMoeda(cliente.metricas?.valorTotalFretes)}
                        </p>
                      </div>
                      <div className="bg-white border border-purple-200 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-500">
                          Faturamento Médio Mensal
                        </p>
                        <p className="text-lg font-bold text-purple-600 mt-1">
                          {formatarMoeda(cliente.metricas?.mediaMensalFretes)}
                        </p>
                      </div>
                    </div>

                    {/* Índice de Satisfação */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h5 className="font-semibold text-gray-900 mb-4">
                        Índice de Satisfação
                      </h5>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-4xl font-bold text-gray-900">
                            {cliente.metricas?.indiceSatisfacao?.toFixed(1) ||
                              "0.0"}
                          </p>
                          <p className="text-sm text-gray-500">de 5.0</p>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-6 h-6 ${
                                  star <=
                                  (cliente.metricas?.indiceSatisfacao || 0)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-yellow-400 h-3 rounded-full"
                              style={{
                                width: `${
                                  ((cliente.metricas?.indiceSatisfacao || 0) /
                                    5) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Última Viagem */}
                    {cliente.metricas?.ultimaViagemData && (
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">
                              Última Viagem
                            </h5>
                            <p className="text-gray-700">
                              {formatarData(cliente.metricas.ultimaViagemData)}
                            </p>
                          </div>
                          <Truck className="w-12 h-12 text-blue-400" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Histórico */}
                {activeTab === "historico" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Histórico de Interações
                      </h4>
                      <span className="text-sm text-gray-500">
                        {cliente.historicoInteracoes?.length || 0}{" "}
                        interação(ões)
                      </span>
                    </div>

                    {!cliente.historicoInteracoes ||
                    cliente.historicoInteracoes.length === 0 ? (
                      <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                        <Clock className="w-12 h-12 mx-auto text-gray-400" />
                        <p className="mt-2 text-gray-600">
                          Nenhuma interação registrada
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cliente.historicoInteracoes.map((interacao, index) => (
                          <div
                            key={index}
                            className="border-l-4 border-blue-500 pl-4 py-2"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center">
                                  <span
                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                      interacao.tipo === "visita"
                                        ? "bg-green-100 text-green-800"
                                        : interacao.tipo === "telefonema"
                                        ? "bg-blue-100 text-blue-800"
                                        : interacao.tipo === "email"
                                        ? "bg-purple-100 text-purple-800"
                                        : interacao.tipo === "reuniao"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {interacao.tipo.charAt(0).toUpperCase() +
                                      interacao.tipo.slice(1)}
                                  </span>
                                  <span className="ml-3 font-medium text-gray-900">
                                    {interacao.descricao}
                                  </span>
                                </div>
                                <p className="mt-1 text-sm text-gray-600">
                                  Responsável: {interacao.responsavel}
                                </p>
                                {interacao.resultado && (
                                  <p className="mt-1 text-sm text-gray-700">
                                    Resultado: {interacao.resultado}
                                  </p>
                                )}
                              </div>
                              <span className="text-sm text-gray-500">
                                {formatarData(interacao.data)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Feedback Histórico */}
                    {cliente.feedbackHistorico &&
                      cliente.feedbackHistorico.length > 0 && (
                        <div className="mt-8">
                          <h5 className="text-lg font-semibold text-gray-900 mb-4">
                            Histórico de Feedback
                          </h5>
                          <div className="space-y-4">
                            {cliente.feedbackHistorico.map(
                              (feedback, index) => (
                                <div
                                  key={index}
                                  className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center">
                                      <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <Star
                                            key={star}
                                            className={`w-4 h-4 ${
                                              star <= feedback.pontuacao
                                                ? "text-yellow-400 fill-yellow-400"
                                                : "text-gray-300"
                                            }`}
                                          />
                                        ))}
                                      </div>
                                      <span className="ml-2 text-sm font-semibold text-gray-900">
                                        {feedback.pontuacao.toFixed(1)}
                                      </span>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                      {formatarData(feedback.data)}
                                    </span>
                                  </div>
                                  <p className="text-gray-700">
                                    {feedback.observacao}
                                  </p>
                                  <p className="mt-2 text-sm text-gray-600">
                                    Avaliador: {feedback.avaliador}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {cliente && (
                  <span>
                    Última atualização:{" "}
                    {cliente.dataUltimaAtualizacao
                      ? formatarData(cliente.dataUltimaAtualizacao)
                      : formatarData(cliente.dataCadastro)}
                  </span>
                )}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente do Modal de Edição
const EditarClienteModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  cliente: Cliente | null;
  onSuccess: () => void;
}> = ({ isOpen, onClose, cliente, onSuccess }) => {
  const [formData, setFormData] = useState<Partial<Cliente>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contatos, setContatos] = useState<Cliente["contatos"]>([]);
  const [activeTab, setActiveTab] = useState("basico");

  useEffect(() => {
    if (cliente && isOpen) {
      fetchClienteDetails();
    }
  }, [cliente, isOpen]);

  const fetchClienteDetails = async () => {
    if (!cliente?.codigo) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getClienteDetail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ codigo: cliente.codigo }),
        }
      );

      const data = await response.json();

      if (data.returnCode === 200) {
        const clienteDetalhado = data.data;
        setFormData({
          nome: clienteDetalhado.nome,
          categoria: clienteDetalhado.categoria,
          nuit: clienteDetalhado.nuit,
          tipoPessoa: clienteDetalhado.tipoPessoa,
          classificacao: clienteDetalhado.classificacao,
          status: clienteDetalhado.status,
          segmento: clienteDetalhado.segmento,
          limiteCredito: clienteDetalhado.limiteCredito,
          formaPagamento: clienteDetalhado.formaPagamento,
          prazoPagamento: clienteDetalhado.prazoPagamento,
          observacoes: clienteDetalhado.observacoes,
          avaliacao: clienteDetalhado.avaliacao,
          canalCaptacao: clienteDetalhado.canalCaptacao,
          vendedorResponsavel: clienteDetalhado.vendedorResponsavel,
        });

        if (clienteDetalhado.enderecoCobranca) {
          setFormData((prev) => ({
            ...prev,
            enderecoCobranca: { ...clienteDetalhado.enderecoCobranca },
          }));
        }

        setContatos(clienteDetalhado.contatos || []);
      } else {
        setError("Erro ao carregar detalhes do cliente");
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
      setError("Erro ao carregar dados do cliente");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEnderecoChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      enderecoCobranca: {
        ...prev.enderecoCobranca,
        [field]: value,
      } as Cliente["enderecoCobranca"],
    }));
  };

  const handleContatoChange = (index: number, field: string, value: string) => {
    const updatedContatos = [...contatos];
    updatedContatos[index] = {
      ...updatedContatos[index],
      [field]: value,
    };
    setContatos(updatedContatos);
  };

  const handleAddContato = () => {
    setContatos([
      ...contatos,
      { nome: "", email: "", telefone: "", cargo: "", principal: false },
    ]);
  };

  const handleRemoveContato = (index: number) => {
    const updatedContatos = contatos.filter((_, i) => i !== index);
    setContatos(updatedContatos);
  };

  const handleSetPrincipal = (index: number) => {
    const updatedContatos = contatos.map((contato, i) => ({
      ...contato,
      principal: i === index,
    }));
    setContatos(updatedContatos);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliente?.codigo) return;

    setSaving(true);
    setError(null);

    try {
      const updateData = {
        codigo: cliente.codigo,
        ...formData,
        contatos: contatos,
        dataUltimaAtualizacao: new Date().toISOString(),
      };

      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/updateCliente",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        }
      );

      const data = await response.json();

      if (data.returnCode === 200) {
        onSuccess();
        onClose();
      } else {
        setError(data.returnMsg || "Erro ao atualizar cliente");
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      setError("Erro ao atualizar cliente");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>

        {/* Modal Container */}
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-xl shadow-2xl">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Editar Cliente
                  </h3>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {cliente?.codigo}
                    </span>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm text-gray-600">
                      {cliente?.nome}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 rounded-lg hover:text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs de Navegação */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("basico")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "basico"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <User className="inline-block w-4 h-4 mr-2" />
                Informações Básicas
              </button>
              <button
                onClick={() => setActiveTab("contatos")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "contatos"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Phone className="inline-block w-4 h-4 mr-2" />
                Contatos
              </button>
              <button
                onClick={() => setActiveTab("endereco")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "endereco"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <MapPin className="inline-block w-4 h-4 mr-2" />
                Endereço
              </button>
              <button
                onClick={() => setActiveTab("financeiro")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "financeiro"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <CreditCard className="inline-block w-4 h-4 mr-2" />
                Financeiro
              </button>
              <button
                onClick={() => setActiveTab("outros")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "outros"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FileText className="inline-block w-4 h-4 mr-2" />
                Outros
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            {loading ? (
              <div className="py-12 text-center">
                <Loader2 className="inline-block w-8 h-8 text-blue-600 animate-spin" />
                <p className="mt-2 text-gray-600">
                  Carregando dados do cliente...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <X className="w-5 h-5 text-red-400" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">Erro ao processar</p>
                        <p className="mt-1">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Informações Básicas */}
                {activeTab === "basico" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          value={formData.nome || ""}
                          onChange={(e) =>
                            handleInputChange("nome", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Categoria *
                        </label>
                        <select
                          value={formData.categoria || ""}
                          onChange={(e) =>
                            handleInputChange("categoria", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        >
                          <option value="">Selecione uma categoria</option>
                          <option value="Gestor">Gestor</option>
                          <option value="Cliente">Cliente</option>
                          <option value="Motorista">Motorista</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          NUIT *
                        </label>
                        <input
                          type="text"
                          value={formData.nuit || ""}
                          onChange={(e) =>
                            handleInputChange("nuit", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Tipo de Pessoa *
                        </label>
                        <select
                          value={formData.tipoPessoa || ""}
                          onChange={(e) =>
                            handleInputChange("tipoPessoa", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        >
                          <option value="">Selecione o tipo</option>
                          <option value="Física">Pessoa Física</option>
                          <option value="Jurídica">Pessoa Jurídica</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Classificação
                        </label>
                        <select
                          value={formData.classificacao || ""}
                          onChange={(e) =>
                            handleInputChange("classificacao", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          <option value="Novo">Novo</option>
                          <option value="VIP">VIP</option>
                          <option value="A">Classe A</option>
                          <option value="B">Classe B</option>
                          <option value="C">Classe C</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Status
                        </label>
                        <select
                          value={formData.status || ""}
                          onChange={(e) =>
                            handleInputChange("status", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          <option value="ativo">Ativo</option>
                          <option value="inativo">Inativo</option>
                          <option value="suspenso">Suspenso</option>
                          <option value="potencial">Potencial</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Segmento de Atuação
                      </label>
                      <input
                        type="text"
                        value={formData.segmento || ""}
                        onChange={(e) =>
                          handleInputChange("segmento", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Ex: Logística, Construção Civil, Comércio..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Avaliação
                      </label>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleInputChange("avaliacao", star)}
                            className={`text-2xl ${
                              star <= (formData.avaliacao || 0)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            } hover:text-yellow-400 transition-colors`}
                          >
                            ★
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {formData.avaliacao || 0}/5
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Contatos */}
                {activeTab === "contatos" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Contatos do Cliente
                      </h4>
                      <button
                        type="button"
                        onClick={handleAddContato}
                        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Adicionar Contato
                      </button>
                    </div>

                    {contatos.length === 0 ? (
                      <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                        <User className="w-12 h-12 mx-auto text-gray-400" />
                        <p className="mt-2 text-gray-600">
                          Nenhum contato cadastrado
                        </p>
                        <button
                          type="button"
                          onClick={handleAddContato}
                          className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Adicionar primeiro contato
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {contatos.map((contato, index) => (
                          <div
                            key={index}
                            className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  onClick={() => handleSetPrincipal(index)}
                                  className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 ${
                                    contato.principal
                                      ? "bg-blue-100 text-blue-600"
                                      : "bg-gray-200 text-gray-400"
                                  }`}
                                >
                                  {contato.principal ? "✓" : ""}
                                </button>
                                <span className="font-medium text-gray-900">
                                  Contato {index + 1}
                                  {contato.principal && (
                                    <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                      Principal
                                    </span>
                                  )}
                                </span>
                              </div>
                              {contatos.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveContato(index)}
                                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                                >
                                  Remover
                                </button>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Nome
                                </label>
                                <input
                                  type="text"
                                  value={contato.nome || ""}
                                  onChange={(e) =>
                                    handleContatoChange(
                                      index,
                                      "nome",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Nome completo"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Cargo
                                </label>
                                <input
                                  type="text"
                                  value={contato.cargo || ""}
                                  onChange={(e) =>
                                    handleContatoChange(
                                      index,
                                      "cargo",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Ex: Gerente, Diretor..."
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Email
                                </label>
                                <input
                                  type="email"
                                  value={contato.email || ""}
                                  onChange={(e) =>
                                    handleContatoChange(
                                      index,
                                      "email",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="email@empresa.com"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Telefone
                                </label>
                                <input
                                  type="tel"
                                  value={contato.telefone || ""}
                                  onChange={(e) =>
                                    handleContatoChange(
                                      index,
                                      "telefone",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="+258 XX XXX XXXX"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Endereço */}
                {activeTab === "endereco" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Endereço de Cobrança
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Rua/Avenida
                        </label>
                        <input
                          type="text"
                          value={formData.enderecoCobranca?.rua || ""}
                          onChange={(e) =>
                            handleEnderecoChange("rua", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Nome da rua ou avenida"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bairro
                        </label>
                        <input
                          type="text"
                          value={formData.enderecoCobranca?.bairro || ""}
                          onChange={(e) =>
                            handleEnderecoChange("bairro", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Nome do bairro"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cidade
                        </label>
                        <input
                          type="text"
                          value={formData.enderecoCobranca?.cidade || ""}
                          onChange={(e) =>
                            handleEnderecoChange("cidade", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Nome da cidade"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Província
                        </label>
                        <input
                          type="text"
                          value={formData.enderecoCobranca?.provincia || ""}
                          onChange={(e) =>
                            handleEnderecoChange("provincia", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Nome da província"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Código Postal
                        </label>
                        <input
                          type="text"
                          value={formData.enderecoCobranca?.codigoPostal || ""}
                          onChange={(e) =>
                            handleEnderecoChange("codigoPostal", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="XXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          País
                        </label>
                        <input
                          type="text"
                          value={formData.enderecoCobranca?.pais || ""}
                          onChange={(e) =>
                            handleEnderecoChange("pais", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Moçambique"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Financeiro */}
                {activeTab === "financeiro" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Informações Financeiras
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Limite de Crédito (MZN)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            MZN
                          </span>
                          <input
                            type="number"
                            value={formData.limiteCredito || ""}
                            onChange={(e) =>
                              handleInputChange(
                                "limiteCredito",
                                parseFloat(e.target.value)
                              )
                            }
                            className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0,00"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Forma de Pagamento Preferida
                        </label>
                        <input
                          type="text"
                          value={formData.formaPagamento || ""}
                          onChange={(e) =>
                            handleInputChange("formaPagamento", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Ex: Transferência bancária"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Prazo de Pagamento (dias)
                        </label>
                        <input
                          type="number"
                          value={formData.prazoPagamento || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "prazoPagamento",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="30"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Outros */}
                {activeTab === "outros" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Canal de Captação
                        </label>
                        <select
                          value={formData.canalCaptacao || ""}
                          onChange={(e) =>
                            handleInputChange("canalCaptacao", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Selecione...</option>
                          <option value="indicacao">Indicação</option>
                          <option value="site">Site/Internet</option>
                          <option value="visita">Visita Comercial</option>
                          <option value="telefone">Telefone</option>
                          <option value="outro">Outro</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Vendedor Responsável
                        </label>
                        <input
                          type="text"
                          value={formData.vendedorResponsavel || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "vendedorResponsavel",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Nome do vendedor"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Observações Gerais
                      </label>
                      <textarea
                        value={formData.observacoes || ""}
                        onChange={(e) =>
                          handleInputChange("observacoes", e.target.value)
                        }
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Observações importantes sobre o cliente..."
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Use este espaço para notas internas sobre o cliente.
                      </p>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {cliente?.dataCadastro && (
                  <span>
                    Cadastrado em:{" "}
                    {new Date(cliente.dataCadastro).toLocaleDateString("pt-MZ")}
                  </span>
                )}
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  disabled={saving}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={saving || loading}
                  className="flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Salvando Alterações...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Salvar Alterações
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// Adicione o ícone History que está faltando
const History: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ClientesList = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtros, setFiltros] = useState({
    nome: "",
    codigo: "",
    nuit: "",
    categoria: "",
    tipoPessoa: "",
    classificacao: "",
    status: "",
    segmento: "",
  });
  const [paginacao, setPaginacao] = useState({
    curPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPage: 0,
  });
  const [carregando, setCarregando] = useState(false);
  // Estados para o modal
  const [modalAberto, setModalAberto] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [modalVisualizarAberto, setModalVisualizarAberto] = useState(false);
  const [clienteVisualizando, setClienteVisualizando] = useState<string | null>(
    null
  );

  const carregarClientes = async (pagina = 1) => {
    setCarregando(true);
    try {
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getClienteList",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            curPage: pagina,
            pageSize: paginacao.pageSize,
            ...filtros,
          }),
        }
      );

      const data = await response.json();

      if (data.returnCode === 200) {
        setClientes(data.data.list || []);
        setPaginacao((prev) => ({
          ...prev,
          curPage: pagina,
          totalCount: data.data.totalCount,
          totalPage: data.data.totalPage,
        }));
      }
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarClientes();
  }, [filtros.categoria, filtros.status]);

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleLimparFiltros = () => {
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
  };

  const handleExcluirCliente = async (codigo: string) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
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
        }
      } catch (error) {
        console.error("Erro ao excluir cliente:", error);
      }
    }
  };

  // Funções para o modal
  const abrirModalEdicao = (cliente: Cliente) => {
    setClienteEditando(cliente);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setClienteEditando(null);
  };

  const handleEdicaoSucesso = () => {
    carregarClientes(paginacao.curPage);
  };

  // Funções para o modal de visualização
  const abrirModalVisualizacao = (codigo: string) => {
    setClienteVisualizando(codigo);
    setModalVisualizarAberto(true);
  };

  const fecharModalVisualizacao = () => {
    setModalVisualizarAberto(false);
    setClienteVisualizando(null);
  };

  const classificacaoCores: Record<string, string> = {
    VIP: "bg-yellow-100 text-yellow-800",
    A: "bg-green-100 text-green-800",
    B: "bg-blue-100 text-blue-800",
    C: "bg-purple-100 text-purple-800",
    Novo: "bg-gray-100 text-gray-800",
  };

  const statusCores: Record<string, string> = {
    ativo: "bg-green-100 text-green-800",
    inativo: "bg-gray-100 text-gray-800",
    suspenso: "bg-yellow-100 text-yellow-800",
    potencial: "bg-blue-100 text-blue-800",
  };

  const categoriaCores: Record<string, string> = {
    Gestor: "bg-blue-100 text-blue-800",
    Cliente: "bg-green-100 text-green-800",
    Motorista: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gestão de Clientes
              </h1>
              <p className="text-gray-600 mt-2">
                Gerencie clientes, gestores e motoristas do sistema
              </p>
            </div>
            {/* <a
              href="/clientes/novo"
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Novo Cadastro
            </a> */}
          </div>

          {/* Cards Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Clientes</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {paginacao.totalCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {clientes.filter((c) => c.status === "ativo").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">VIP</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {clientes.filter((c) => c.classificacao === "VIP").length}
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-amber-100 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Motoristas</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {clientes.filter((c) => c.categoria === "Motorista").length}
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                <Filter className="h-5 w-5 inline mr-2" />
                Filtros
              </h2>
              <button
                onClick={handleLimparFiltros}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Limpar filtros
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  value={filtros.nome}
                  onChange={(e) => handleFiltroChange("nome", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Buscar por nome..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <select
                  value={filtros.categoria}
                  onChange={(e) =>
                    handleFiltroChange("categoria", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todas</option>
                  <option value="Gestor">Gestor</option>
                  <option value="Cliente">Cliente</option>
                  <option value="Motorista">Motorista</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={filtros.status}
                  onChange={(e) => handleFiltroChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todos</option>
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                  <option value="suspenso">Suspenso</option>
                  <option value="potencial">Potencial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Classificação
                </label>
                <select
                  value={filtros.classificacao}
                  onChange={(e) =>
                    handleFiltroChange("classificacao", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todas</option>
                  <option value="VIP">VIP</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="Novo">Novo</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NUIT
                </label>
                <input
                  type="text"
                  value={filtros.nuit}
                  onChange={(e) => handleFiltroChange("nuit", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  onChange={(e) =>
                    handleFiltroChange("segmento", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Segmento de atuação"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => carregarClientes(1)}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                <Search className="h-4 w-4 mr-2" />
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Lista de Clientes ({paginacao.totalCount})
            </h2>
            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </button>
          </div>

          {carregando ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Carregando clientes...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Código
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nome / Empresa
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Classificação
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contato
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cadastro
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {clientes.map((cliente) => (
                      <tr key={cliente.codigo} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-blue-600">
                            {cliente.codigo}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {cliente.nome}
                            </div>
                            <div className="text-sm text-gray-500">
                              NUIT: {cliente.nuit}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              categoriaCores[cliente.categoria] ||
                              "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {cliente.categoria}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              classificacaoCores[cliente.classificacao]
                            }`}
                          >
                            {cliente.classificacao}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              statusCores[cliente.status]
                            }`}
                          >
                            {cliente.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {cliente.contatos?.[0]?.email || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {cliente.contatos?.[0]?.telefone || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(cliente.dataCadastro).toLocaleDateString(
                            "pt-MZ"
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex flex-col items-center space-x-2">
                            <button
                              onClick={() =>
                                abrirModalVisualizacao(cliente.codigo)
                              }
                              className="text-blue-600 hover:text-blue-900 p-1 transition-colors"
                              title="Visualizar"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => abrirModalEdicao(cliente)}
                              className="text-green-600 hover:text-green-900 p-1 transition-colors"
                              title="Editar"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleExcluirCliente(cliente.codigo)
                              }
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Excluir"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            {/* <button className="text-gray-600 hover:text-gray-900 p-1">
                              <MoreVertical className="h-4 w-4" />
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginação */}
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Mostrando {clientes.length} de {paginacao.totalCount}{" "}
                    clientes
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => carregarClientes(paginacao.curPage - 1)}
                      disabled={paginacao.curPage === 1}
                      className={`p-2 rounded-lg ${
                        paginacao.curPage === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    {[...Array(Math.min(5, paginacao.totalPage)).keys()].map(
                      (page) => {
                        const pageNum = page + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => carregarClientes(pageNum)}
                            className={`w-10 h-10 rounded-lg font-medium ${
                              paginacao.curPage === pageNum
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                    )}

                    <button
                      onClick={() => carregarClientes(paginacao.curPage + 1)}
                      disabled={paginacao.curPage === paginacao.totalPage}
                      className={`p-2 rounded-lg ${
                        paginacao.curPage === paginacao.totalPage
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              {/* Modal de Edição */}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientesList;
