/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// CamioesList.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Filter,
  Edit,
  Eye,
  Trash2,
  Download,
  Truck,
  ChevronLeft,
  ChevronRight,
  X,
  Save,
  Loader2,
  MapPin,
  CreditCard,
  FileText,
  Tag,
  Building,
  Award,
  CheckCircle,
  AlertCircle,
  Clock,
  CalendarDays,
  BarChart3,
  Activity,
  Printer,
  Camera,
  Wifi,
  Shield,
  Battery,
  Zap,
  Gauge,
  Package,
  Settings,
  Star,
  History,
  AlertTriangle,
  Check,
  XCircle,
} from "lucide-react";

// Interfaces baseadas no schema
interface Passaporte {
  numero: string;
  paisEmissor?: string;
  dataEmissao?: string;
  validade?: string;
  localEmissao?: string;
}
interface Documento {
  numero: string;
  numeroApolice: string;
  dataEmissao: string;
  dataValidade: string;
  seguradora?: string;
  categoria?: string;
  tipo?: string;
  cobertura?: string;
}

interface GPSVip {
  camera: {
    possui: boolean;
    modelo?: string;
    resolucao?: string;
    dataInstalacao?: string;
    status: string;
  };
  controleMotorista: {
    possui: boolean;
    tipoControle?: string;
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
}

interface Especificacoes {
  tipo: string;
  pesoBruto: number;
  tara: number;
  cargaUtil: number;
  comprimento?: number;
  largura?: number;
  altura?: number;
  volumeUtil?: number;
  numEixos: number;
}

interface NivelInspecao {
  categoria: string;
  descricao: string;
  dataUltimaInspecao: string;
  dataProximaInspecao?: string;
  resultadoUltimaInspecao: string;
  centroInspecao?: string;
  observacoes?: string;
}

interface Viabilidade {
  podeChante: boolean;
  podeNacional: boolean;
  podeTransito: boolean;
  podeGPSVip: boolean;
  motivos: string[];
}

interface Manutencao {
  proximaManutencao?: string;
  ultimaManutencao?: string;
  kmUltimaManutencao?: number;
  periodicidadeManutencao: number;
  manutencaoGPS?: {
    ultimaManutencao?: string;
    proximaManutencao?: string;
    observacoes?: string;
  };
}

interface Estado {
  tipo: string;
  observacoes?: string;
  dataAvaliacao?: string;
}

interface HistoricoUtilizacao {
  totalKmPercorridos: number;
  totalViagens: number;
  dataPrimeiraUtilizacao?: string;
  dataUltimaUtilizacao?: string;
  consumoMedio?: number;
  viagensComGPSVip: number;
  totalHorasMonitoradas: number;
}

interface Disponibilidade {
  tipoServico: string[];
  regioes: string[];
  observacoes?: string;
}

interface TipoGPS {
  tipo: string;
  descricao: string;
  valorRegistro: number;
  dataAtivacao: string;
  dataExpiracao?: string;
  status: string;
}

interface Camiao {
  camiaoId: number;
  matricula: string;
  nomeCompleto: string;
  marca: string;
  modelo: string;
  anoFabricacao: number;
  cor?: string;

  transportadoraId: number;
  motoristaId: number;
  codigoGPS: string;

  tipoGPS: TipoGPS;
  gpsVip?: GPSVip;

  especificacoes: Especificacoes;
  documentacao?: {
    registroComercial?: string;
    seguro?: Documento;
    licencaOperacao?: Documento;
    certificadoGPS?: Documento;
  };

  nivelInspecao: NivelInspecao;
  viabilidade: Viabilidade;
  manutencao: Manutencao;
  estado: Estado;

  historicoUtilizacao: HistoricoUtilizacao;

  status: string;
  disponibilidade: Disponibilidade;

  dataCriacao: string;
  dataAtualizacao: string;
  criadoPor?: string;
  atualizadoPor?: string;
  observacoes?: string;
  fotos?: string[];
  fotosGPS?: string[];

  // Campos virtuais
  idade?: number;
  inspecaoValida?: boolean;
  gpsVipAtivo?: boolean;
  diasExpiracaoGPS?: number;
  transportadoraNome?: string;
  motoristaNome?: string;
  motoristaDetalhes?: Motorista;
}

interface Motorista {
  motoristaId: number;
  nomeCompleto: string;
  numeroBI: string;
  validadeBI?: string;
  cartaConducao: {
    numero: string;
    categoria: string;
    validade: string;
    dataEmissao?: string;
    localEmissao?: string;
  };
  passaporte?: Passaporte;
  licencaProfissional?: {
    numero: string;
    validade?: string;
    categoria?: string;
  };
  contactos: {
    telefonePrincipal: string;
    telefoneAlternativo?: string;
    email?: string;
    emergencia?: {
      nome: string;
      parentesco: string;
      telefone: string;
    };
  };
  status: string;
  statusContratual: string;
  empresaMotorista: string;
  empresaMotoristaId: number;
  nacionalidade?: string;
  nuit?: string;
  avaliacaoGeral?: number;
  totalViagensRealizadas: number;
  totalKmPercorridos: number;
  indiceAcidentes: number;
  indiceMultas: number;
  dataNascimento?: string;
  dataAdmissao?: string;
  cargo?: string;
  endereco?: {
    provincia: string;
    cidade: string;
    bairro: string;
    rua: string;
    numeroCasa: string;
  };
  // Adicione outros campos conforme necessário do schema
}

// Componente Modal de Visualização
const VisualizarCamiaoModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  camiaoId: number | null;
}> = ({ isOpen, onClose, camiaoId }) => {
  const [camiao, setCamiao] = useState<Camiao | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("geral");

  useEffect(() => {
    if (isOpen && camiaoId) {
      fetchCamiaoDetails();
    } else {
      setCamiao(null);
    }
  }, [isOpen, camiaoId]);

  const fetchCamiaoDetails = async () => {
    if (!camiaoId) return;

    setLoading(true);
    setError(null);

    try {
      // Buscar detalhes do camião
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getCamiaoDetail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            camiaoId: camiaoId,
          }),
        }
      );

      const data = await response.json();
      console.log("Resposta do camião detalhe:", data);

      if (data.returnCode === 200 && data.data) {
        const camiaoData = data.data;

        // SE o camião tem motoristaId, buscar detalhes do motorista
        if (camiaoData.motoristaId) {
          const motoristaResponse = await fetch(
            "https://desktop-api-4f850b3f9733.herokuapp.com/getMotoristaDetail",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                motoristaId: camiaoData.motoristaId,
              }),
            }
          );

          const motoristaData = await motoristaResponse.json();

          if (motoristaData.returnCode === 200 && motoristaData.data) {
            // Adicionar detalhes do motorista ao objeto camiao
            camiaoData.motoristaDetalhes = motoristaData.data;
          }
        }

        setCamiao(camiaoData);
      } else {
        setError(data.returnMsg || "Erro ao carregar detalhes do camião");
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
      setError("Erro ao carregar dados do camião");
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
      case "disponivel":
        return "bg-green-100 text-green-800";
      case "em_viagem":
        return "bg-blue-100 text-blue-800";
      case "manutencao":
        return "bg-yellow-100 text-yellow-800";
      case "inativo":
        return "bg-gray-100 text-gray-800";
      case "reservado":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "C":
        return "bg-green-100 text-green-800";
      case "B":
        return "bg-blue-100 text-blue-800";
      case "A":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTipoCaminhaoColor = (tipo: string) => {
    switch (tipo) {
      case "rigido":
        return "bg-blue-100 text-blue-800";
      case "articulado":
        return "bg-green-100 text-green-800";
      case "reboque":
        return "bg-purple-100 text-purple-800";
      case "tanque":
        return "bg-red-100 text-red-800";
      case "frigorifico":
        return "bg-cyan-100 text-cyan-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "novo":
        return "bg-green-100 text-green-800";
      case "seminovo":
        return "bg-blue-100 text-blue-800";
      case "usado":
        return "bg-yellow-100 text-yellow-800";
      case "recondicionado":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getGPSStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800";
      case "inativo":
        return "bg-gray-100 text-gray-800";
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      case "expirado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInspecaoResultadoColor = (resultado: string) => {
    switch (resultado) {
      case "aprovado":
        return "bg-green-100 text-green-800";
      case "aprovado_com_ressalvas":
        return "bg-yellow-100 text-yellow-800";
      case "reprovado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const md = camiao?.motoristaDetalhes;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>

        {/* Modal Container - Tamanho maior */}
        <div className="inline-block w-full max-w-6xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-xl shadow-2xl">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                    camiao?.nivelInspecao?.categoria === "C"
                      ? "bg-green-100"
                      : camiao?.nivelInspecao?.categoria === "B"
                      ? "bg-blue-100"
                      : camiao?.nivelInspecao?.categoria === "A"
                      ? "bg-yellow-100"
                      : "bg-gray-100"
                  }`}
                >
                  <Truck className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {camiao?.marca} {camiao?.modelo} {camiao?.anoFabricacao}
                    </h3>
                    {camiao && (
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          camiao.status
                        )}`}
                      >
                        {camiao.status
                          .replace("_", " ")
                          .charAt(0)
                          .toUpperCase() +
                          camiao.status.replace("_", " ").slice(1)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-1 space-x-3">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {camiao?.matricula}
                    </span>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm text-gray-600">
                      ID: {camiao?.camiaoId}
                    </span>
                    {camiao?.codigoGPS && (
                      <>
                        <span className="text-sm text-gray-600">•</span>
                        <span className="text-sm text-gray-600">
                          GPS: {camiao.codigoGPS}
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
                <Truck className="inline-block w-4 h-4 mr-2" />
                Visão Geral
              </button>
              <button
                onClick={() => setActiveTab("especificacoes")}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "especificacoes"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Settings className="inline-block w-4 h-4 mr-2" />
                Especificações
              </button>
              <button
                onClick={() => setActiveTab("gps")}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "gps"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Wifi className="inline-block w-4 h-4 mr-2" />
                GPS e Monitoramento
              </button>
              <button
                onClick={() => setActiveTab("documentacao")}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "documentacao"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FileText className="inline-block w-4 h-4 mr-2" />
                Documentação
              </button>
              <button
                onClick={() => setActiveTab("inspecao")}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "inspecao"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Shield className="inline-block w-4 h-4 mr-2" />
                Inspeção
              </button>
              <button
                onClick={() => setActiveTab("manutencao")}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "manutencao"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Settings className="inline-block w-4 h-4 mr-2" />
                Manutenção
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
              {/* NOVA TAB: FOTOS */}
              <button
                onClick={() => setActiveTab("fotos")}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "fotos"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Camera className="inline-block w-4 h-4 mr-2" />
                Fotos
              </button>
              <button
                onClick={() => setActiveTab("associacoes")}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "associacoes"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Building className="inline-block w-4 h-4 mr-2" />
                Associações
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            {loading ? (
              <div className="py-12 text-center">
                <Loader2 className="inline-block w-8 h-8 text-blue-600 animate-spin" />
                <p className="mt-2 text-gray-600">
                  Carregando detalhes do camião...
                </p>
              </div>
            ) : error ? (
              <div className="py-8 text-center">
                <AlertCircle className="inline-block w-12 h-12 text-red-400" />
                <p className="mt-2 text-gray-700">{error}</p>
                <button
                  onClick={fetchCamiaoDetails}
                  className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  Tentar novamente
                </button>
              </div>
            ) : !camiao ? (
              <div className="py-8 text-center">
                <Truck className="inline-block w-12 h-12 text-gray-400" />
                <p className="mt-2 text-gray-600">Camião não encontrado</p>
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
                            <Truck className="w-5 h-5 mr-2 text-blue-600" />
                            Informações Básicas
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Matrícula
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {camiao.matricula}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Código do Camião
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                #{camiao.camiaoId}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Marca
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {camiao.marca}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Modelo
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {camiao.modelo}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Ano de Fabricação
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {camiao.anoFabricacao}
                                {camiao.idade && ` (${camiao.idade} anos)`}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Cor
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {camiao.cor || "Não especificada"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Status e Categoria */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <Award className="w-5 h-5 mr-2 text-yellow-600" />
                              Categoria e Estado
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">
                                  Categoria de Inspeção
                                </span>
                                <span
                                  className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoriaColor(
                                    camiao.nivelInspecao.categoria
                                  )}`}
                                >
                                  {camiao.nivelInspecao.categoria}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">
                                  Estado do Veículo
                                </span>
                                <span
                                  className={`px-3 py-1 text-xs font-semibold rounded-full ${getEstadoColor(
                                    camiao.estado.tipo
                                  )}`}
                                >
                                  {camiao.estado.tipo.charAt(0).toUpperCase() +
                                    camiao.estado.tipo.slice(1)}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">
                                  Status Operacional
                                </span>
                                <span
                                  className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                    camiao.status
                                  )}`}
                                >
                                  {camiao.status
                                    .replace("_", " ")
                                    .charAt(0)
                                    .toUpperCase() +
                                    camiao.status.replace("_", " ").slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <Zap className="w-5 h-5 mr-2 text-green-600" />
                              Viabilidade Operacional
                            </h4>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                {camiao.viabilidade.podeChante ? (
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-red-500 mr-2" />
                                )}
                                <span className="text-sm">Serviço Chanté</span>
                              </div>
                              <div className="flex items-center">
                                {camiao.viabilidade.podeNacional ? (
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-red-500 mr-2" />
                                )}
                                <span className="text-sm">
                                  Serviço Nacional
                                </span>
                              </div>
                              <div className="flex items-center">
                                {camiao.viabilidade.podeTransito ? (
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-red-500 mr-2" />
                                )}
                                <span className="text-sm">
                                  Serviço Transito
                                </span>
                              </div>
                              <div className="flex items-center">
                                {camiao.viabilidade.podeGPSVip ? (
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-red-500 mr-2" />
                                )}
                                <span className="text-sm">
                                  Elegível para GPS VIP
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
                            Resumo Técnico
                          </h4>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Tipo de Camião
                              </p>
                              <span
                                className={`mt-1 inline-block px-3 py-1 text-sm font-semibold rounded-full ${getTipoCaminhaoColor(
                                  camiao.especificacoes.tipo
                                )}`}
                              >
                                {camiao.especificacoes.tipo
                                  .charAt(0)
                                  .toUpperCase() +
                                  camiao.especificacoes.tipo.slice(1)}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Número de Eixos
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {camiao.especificacoes.numEixos}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Peso Bruto Total (PBT)
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {camiao.especificacoes.pesoBruto} kg
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Carga Útil
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {camiao.especificacoes.cargaUtil} kg
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* GPS Info */}
                        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">
                            Sistema GPS
                          </h4>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Tipo de GPS
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {camiao.tipoGPS.tipo.toUpperCase()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Status GPS
                              </p>
                              <span
                                className={`mt-1 inline-block px-2 py-1 text-xs font-semibold rounded-full ${getGPSStatusColor(
                                  camiao.tipoGPS.status
                                )}`}
                              >
                                {camiao.tipoGPS.status.charAt(0).toUpperCase() +
                                  camiao.tipoGPS.status.slice(1)}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Código GPS
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {camiao.codigoGPS}
                              </p>
                            </div>
                            {camiao.diasExpiracaoGPS && (
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Dias até Expiração
                                </p>
                                <p
                                  className={`text-base font-semibold ${
                                    camiao.diasExpiracaoGPS <= 30
                                      ? "text-red-600"
                                      : camiao.diasExpiracaoGPS <= 60
                                      ? "text-yellow-600"
                                      : "text-green-600"
                                  }`}
                                >
                                  {camiao.diasExpiracaoGPS} dias
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Especificações */}
                {activeTab === "especificacoes" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Especificações Técnicas
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Peso */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Package className="w-5 h-5 mr-2 text-blue-600" />
                          Capacidade de Carga
                        </h5>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Peso Bruto Total (PBT)
                            </p>
                            <p className="text-lg font-bold text-gray-900">
                              {camiao.especificacoes.pesoBruto.toLocaleString()}{" "}
                              kg
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Tara (Peso Vazio)
                            </p>
                            <p className="text-lg font-semibold text-gray-900">
                              {camiao.especificacoes.tara.toLocaleString()} kg
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Carga Útil
                            </p>
                            <p className="text-xl font-bold text-green-600">
                              {camiao.especificacoes.cargaUtil.toLocaleString()}{" "}
                              kg
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Dimensões */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Settings className="w-5 h-5 mr-2 text-purple-600" />
                          Dimensões
                        </h5>
                        <div className="space-y-3">
                          {camiao.especificacoes.comprimento && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Comprimento
                              </p>
                              <p className="text-lg font-semibold text-gray-900">
                                {camiao.especificacoes.comprimento} m
                              </p>
                            </div>
                          )}
                          {camiao.especificacoes.largura && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Largura
                              </p>
                              <p className="text-lg font-semibold text-gray-900">
                                {camiao.especificacoes.largura} m
                              </p>
                            </div>
                          )}
                          {camiao.especificacoes.altura && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Altura
                              </p>
                              <p className="text-lg font-semibold text-gray-900">
                                {camiao.especificacoes.altura} m
                              </p>
                            </div>
                          )}
                          {camiao.especificacoes.volumeUtil && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Volume Útil
                              </p>
                              <p className="text-lg font-bold text-blue-600">
                                {camiao.especificacoes.volumeUtil} m³
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Configuração */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Truck className="w-5 h-5 mr-2 text-gray-600" />
                          Configuração
                        </h5>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Tipo
                            </p>
                            <span
                              className={`mt-1 inline-block px-2 py-1 text-xs font-semibold rounded-full ${getTipoCaminhaoColor(
                                camiao.especificacoes.tipo
                              )}`}
                            >
                              {camiao.especificacoes.tipo
                                .charAt(0)
                                .toUpperCase() +
                                camiao.especificacoes.tipo.slice(1)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Número de Eixos
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              {camiao.especificacoes.numEixos}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Ano de Fabricação
                            </p>
                            <p className="text-lg font-semibold text-gray-900">
                              {camiao.anoFabricacao}
                              {camiao.idade && ` (${camiao.idade} anos)`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: GPS */}
                {activeTab === "gps" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Sistema de GPS e Monitoramento
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Informações do GPS */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Wifi className="w-5 h-5 mr-2 text-blue-600" />
                          Informações do Sistema GPS
                        </h5>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Código do GPS
                            </p>
                            <p className="text-lg font-bold text-gray-900">
                              {camiao.codigoGPS}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Tipo
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {camiao.tipoGPS.tipo.toUpperCase()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Status
                              </p>
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded-full ${getGPSStatusColor(
                                  camiao.tipoGPS.status
                                )}`}
                              >
                                {camiao.tipoGPS.status.charAt(0).toUpperCase() +
                                  camiao.tipoGPS.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Data de Ativação
                              </p>
                              <p className="text-sm text-gray-900">
                                {formatarData(camiao.tipoGPS.dataAtivacao)}
                              </p>
                            </div>
                            {camiao.tipoGPS.dataExpiracao && (
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Data de Expiração
                                </p>
                                <p
                                  className={`text-sm font-semibold ${
                                    camiao.diasExpiracaoGPS &&
                                    camiao.diasExpiracaoGPS <= 30
                                      ? "text-red-600"
                                      : camiao.diasExpiracaoGPS &&
                                        camiao.diasExpiracaoGPS <= 60
                                      ? "text-yellow-600"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {formatarData(camiao.tipoGPS.dataExpiracao)}
                                </p>
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Valor do Registro
                            </p>
                            <p className="text-lg font-bold text-green-600">
                              {formatarMoeda(camiao.tipoGPS.valorRegistro)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Descrição
                            </p>
                            <p className="text-sm text-gray-700">
                              {camiao.tipoGPS.descricao}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Recursos do GPS VIP */}
                      {camiao.tipoGPS.tipo === "vip" && camiao.gpsVip && (
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
                          <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <Shield className="w-5 h-5 mr-2 text-purple-600" />
                            Recursos VIP
                          </h5>
                          <div className="space-y-4">
                            {/* Câmera */}
                            {camiao.gpsVip.camera.possui && (
                              <div className="bg-white rounded-lg p-4">
                                <div className="flex items-center mb-2">
                                  <Camera className="w-5 h-5 mr-2 text-blue-600" />
                                  <h6 className="font-semibold text-gray-900">
                                    Sistema de Câmera
                                  </h6>
                                </div>
                                <div className="space-y-2">
                                  {camiao.gpsVip.camera.modelo && (
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-500">
                                        Modelo:
                                      </span>
                                      <span className="text-sm font-medium">
                                        {camiao.gpsVip.camera.modelo}
                                      </span>
                                    </div>
                                  )}
                                  {camiao.gpsVip.camera.resolucao && (
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-500">
                                        Resolução:
                                      </span>
                                      <span className="text-sm font-medium">
                                        {camiao.gpsVip.camera.resolucao}
                                      </span>
                                    </div>
                                  )}
                                  {camiao.gpsVip.camera.dataInstalacao && (
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-500">
                                        Instalação:
                                      </span>
                                      <span className="text-sm font-medium">
                                        {formatarData(
                                          camiao.gpsVip.camera.dataInstalacao
                                        )}
                                      </span>
                                    </div>
                                  )}
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">
                                      Status:
                                    </span>
                                    <span
                                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                        camiao.gpsVip.camera.status ===
                                        "operacional"
                                          ? "bg-green-100 text-green-800"
                                          : camiao.gpsVip.camera.status ===
                                            "manutencao"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-red-100 text-red-800"
                                      }`}
                                    >
                                      {camiao.gpsVip.camera.status
                                        .charAt(0)
                                        .toUpperCase() +
                                        camiao.gpsVip.camera.status.slice(1)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Controle Motorista */}
                            {camiao.gpsVip.controleMotorista.possui && (
                              <div className="bg-white rounded-lg p-4">
                                <div className="flex items-center mb-2">
                                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                                  <h6 className="font-semibold text-gray-900">
                                    Controle de Motorista
                                  </h6>
                                </div>
                                <div className="space-y-2">
                                  {camiao.gpsVip.controleMotorista
                                    .tipoControle && (
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-500">
                                        Tipo:
                                      </span>
                                      <span className="text-sm font-medium">
                                        {
                                          camiao.gpsVip.controleMotorista
                                            .tipoControle
                                        }
                                      </span>
                                    </div>
                                  )}
                                  {camiao.gpsVip.controleMotorista
                                    .dataInstalacao && (
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-500">
                                        Instalação:
                                      </span>
                                      <span className="text-sm font-medium">
                                        {formatarData(
                                          camiao.gpsVip.controleMotorista
                                            .dataInstalacao
                                        )}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Recursos Adicionais */}
                            <div className="bg-white rounded-lg p-4">
                              <h6 className="font-semibold text-gray-900 mb-2">
                                Recursos Adicionais
                              </h6>
                              <div className="grid grid-cols-2 gap-2">
                                {Object.entries(
                                  camiao.gpsVip.recursosAdicionais
                                ).map(([recurso, ativo]) => (
                                  <div
                                    key={recurso}
                                    className="flex items-center"
                                  >
                                    {ativo ? (
                                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    ) : (
                                      <XCircle className="w-4 h-4 text-gray-400 mr-2" />
                                    )}
                                    <span className="text-sm capitalize">
                                      {recurso
                                        .replace(/([A-Z])/g, " $1")
                                        .trim()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tab: Documentação */}
                {activeTab === "documentacao" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Documentação do Camião
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Seguro */}
                      {camiao.documentacao?.seguro && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <Shield className="w-5 h-5 mr-2 text-green-600" />
                            Seguro
                          </h5>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Número da Apólice
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {camiao.documentacao.seguro.numero}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Seguradora
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {camiao.documentacao.seguro.seguradora}
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Emissão
                                </p>
                                <p className="text-sm text-gray-900">
                                  {formatarData(
                                    camiao.documentacao.seguro.dataEmissao
                                  )}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Validade
                                </p>
                                <p
                                  className={`text-sm font-semibold ${
                                    new Date(
                                      camiao.documentacao.seguro.dataValidade
                                    ) < new Date()
                                      ? "text-red-600"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {formatarData(
                                    camiao.documentacao.seguro.dataValidade
                                  )}
                                </p>
                              </div>
                            </div>
                            {camiao.documentacao.seguro.cobertura && (
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Cobertura
                                </p>
                                <p className="text-sm text-gray-700">
                                  {camiao.documentacao.seguro.cobertura}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Licença de Operação */}
                      {camiao.documentacao?.licencaOperacao && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <FileText className="w-5 h-5 mr-2 text-blue-600" />
                            Licença de Operação
                          </h5>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Número
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {camiao.documentacao.licencaOperacao.numero}
                              </p>
                            </div>
                            {camiao.documentacao.licencaOperacao.categoria && (
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Categoria
                                </p>
                                <p className="text-base font-semibold text-gray-900">
                                  {
                                    camiao.documentacao.licencaOperacao
                                      .categoria
                                  }
                                </p>
                              </div>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Emissão
                                </p>
                                <p className="text-sm text-gray-900">
                                  {formatarData(
                                    camiao.documentacao.licencaOperacao
                                      .dataEmissao
                                  )}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Validade
                                </p>
                                <p className="text-sm text-gray-900">
                                  {formatarData(
                                    camiao.documentacao.licencaOperacao
                                      .dataValidade
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Certificado GPS */}
                      {camiao.documentacao?.certificadoGPS && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <Wifi className="w-5 h-5 mr-2 text-purple-600" />
                            Certificado GPS
                          </h5>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Número
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {camiao.documentacao.certificadoGPS.numero}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Tipo
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {camiao.documentacao.certificadoGPS.tipo?.toUpperCase()}
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Emissão
                                </p>
                                <p className="text-sm text-gray-900">
                                  {formatarData(
                                    camiao.documentacao.certificadoGPS
                                      .dataEmissao
                                  )}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Validade
                                </p>
                                <p className="text-sm text-gray-900">
                                  {formatarData(
                                    camiao.documentacao.certificadoGPS
                                      .dataValidade
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Registro Comercial */}
                      {camiao.documentacao?.registroComercial && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <Building className="w-5 h-5 mr-2 text-gray-600" />
                            Registro Comercial
                          </h5>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Número
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {camiao.documentacao.registroComercial}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tab: Inspeção */}
                {activeTab === "inspecao" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Informações de Inspeção
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Status de Inspeção */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Shield className="w-5 h-5 mr-2 text-blue-600" />
                          Status de Inspeção
                        </h5>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">
                              Categoria
                            </span>
                            <span
                              className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoriaColor(
                                camiao.nivelInspecao.categoria
                              )}`}
                            >
                              {camiao.nivelInspecao.categoria} -{" "}
                              {camiao.nivelInspecao.descricao?.split(" - ")[0]}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Resultado da Última Inspeção
                            </p>
                            <span
                              className={`mt-1 inline-block px-3 py-1 text-sm font-semibold rounded-full ${getInspecaoResultadoColor(
                                camiao.nivelInspecao.resultadoUltimaInspecao
                              )}`}
                            >
                              {camiao.nivelInspecao.resultadoUltimaInspecao
                                .replace("_", " ")
                                .charAt(0)
                                .toUpperCase() +
                                camiao.nivelInspecao.resultadoUltimaInspecao
                                  .replace("_", " ")
                                  .slice(1)}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Última Inspeção
                              </p>
                              <p className="text-sm text-gray-900">
                                {formatarData(
                                  camiao.nivelInspecao.dataUltimaInspecao
                                )}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Próxima Inspeção
                              </p>
                              <p
                                className={`text-sm font-semibold ${
                                  camiao.nivelInspecao.dataProximaInspecao &&
                                  new Date(
                                    camiao.nivelInspecao.dataProximaInspecao
                                  ) < new Date()
                                    ? "text-red-600"
                                    : "text-gray-900"
                                }`}
                              >
                                {camiao.nivelInspecao.dataProximaInspecao
                                  ? formatarData(
                                      camiao.nivelInspecao.dataProximaInspecao
                                    )
                                  : "Não agendada"}
                              </p>
                            </div>
                          </div>
                          {camiao.nivelInspecao.centroInspecao && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Centro de Inspeção
                              </p>
                              <p className="text-sm text-gray-900">
                                {camiao.nivelInspecao.centroInspecao}
                              </p>
                            </div>
                          )}
                          {camiao.nivelInspecao.observacoes && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Observações
                              </p>
                              <p className="text-sm text-gray-700">
                                {camiao.nivelInspecao.observacoes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Validade da Inspeção */}
                      <div
                        className={`border rounded-lg p-6 ${
                          camiao.inspecaoValida
                            ? "bg-green-50 border-green-200"
                            : "bg-red-50 border-red-200"
                        }`}
                      >
                        <div className="flex items-center mb-4">
                          {camiao.inspecaoValida ? (
                            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                          ) : (
                            <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                          )}
                          <div>
                            <h5 className="font-semibold text-gray-900">
                              Validade da Inspeção
                            </h5>
                            <p
                              className={`text-sm font-semibold mt-1 ${
                                camiao.inspecaoValida
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {camiao.inspecaoValida ? "VÁLIDA" : "VENCIDA"}
                            </p>
                          </div>
                        </div>
                        {camiao.nivelInspecao.dataProximaInspecao && (
                          <div className="mt-4">
                            <p className="text-sm text-gray-600">
                              {camiao.inspecaoValida
                                ? `Próxima inspeção em ${formatarData(
                                    camiao.nivelInspecao.dataProximaInspecao
                                  )}`
                                : `Inspeção vencida desde ${formatarData(
                                    camiao.nivelInspecao.dataProximaInspecao
                                  )}`}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Manutenção */}
                {activeTab === "manutencao" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Histórico de Manutenção
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Manutenção Geral */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Settings className="w-5 h-5 mr-2 text-blue-600" />
                          Manutenção do Veículo
                        </h5>
                        <div className="space-y-4">
                          {camiao.manutencao.ultimaManutencao && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Última Manutenção
                              </p>
                              <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-900">
                                  {formatarData(
                                    camiao.manutencao.ultimaManutencao
                                  )}
                                </p>
                                {camiao.manutencao.kmUltimaManutencao && (
                                  <span className="text-sm text-gray-500">
                                    {camiao.manutencao.kmUltimaManutencao.toLocaleString()}{" "}
                                    km
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                          {camiao.manutencao.proximaManutencao && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Próxima Manutenção
                              </p>
                              <p
                                className={`text-sm font-semibold ${
                                  new Date(
                                    camiao.manutencao.proximaManutencao
                                  ) < new Date()
                                    ? "text-red-600"
                                    : "text-gray-900"
                                }`}
                              >
                                {formatarData(
                                  camiao.manutencao.proximaManutencao
                                )}
                              </p>
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Periodicidade
                            </p>
                            <p className="text-sm text-gray-900">
                              A cada{" "}
                              {camiao.manutencao.periodicidadeManutencao.toLocaleString()}{" "}
                              km
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Manutenção GPS */}
                      {camiao.manutencao.manutencaoGPS && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <Wifi className="w-5 h-5 mr-2 text-purple-600" />
                            Manutenção do GPS
                          </h5>
                          <div className="space-y-4">
                            {camiao.manutencao.manutencaoGPS
                              .ultimaManutencao && (
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Última Manutenção GPS
                                </p>
                                <p className="text-sm text-gray-900">
                                  {formatarData(
                                    camiao.manutencao.manutencaoGPS
                                      .ultimaManutencao
                                  )}
                                </p>
                              </div>
                            )}
                            {camiao.manutencao.manutencaoGPS
                              .proximaManutencao && (
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Próxima Manutenção GPS
                                </p>
                                <p
                                  className={`text-sm font-semibold ${
                                    new Date(
                                      camiao.manutencao.manutencaoGPS.proximaManutencao
                                    ) < new Date()
                                      ? "text-red-600"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {formatarData(
                                    camiao.manutencao.manutencaoGPS
                                      .proximaManutencao
                                  )}
                                </p>
                              </div>
                            )}
                            {camiao.manutencao.manutencaoGPS.observacoes && (
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Observações
                                </p>
                                <p className="text-sm text-gray-700">
                                  {camiao.manutencao.manutencaoGPS.observacoes}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tab: Histórico */}
                {activeTab === "historico" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Histórico de Utilização
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-500">
                          Total de Km Percorridos
                        </p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          {camiao.historicoUtilizacao.totalKmPercorridos.toLocaleString()}{" "}
                          km
                        </p>
                      </div>
                      <div className="bg-white border border-green-200 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-500">
                          Total de Viagens
                        </p>
                        <p className="text-2xl font-bold text-green-600 mt-1">
                          {camiao.historicoUtilizacao.totalViagens}
                        </p>
                      </div>
                      <div className="bg-white border border-blue-200 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-500">
                          Viagens com GPS VIP
                        </p>
                        <p className="text-2xl font-bold text-blue-600 mt-1">
                          {camiao.historicoUtilizacao.viagensComGPSVip}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Consumo */}
                      {camiao.historicoUtilizacao.consumoMedio && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <h5 className="font-semibold text-gray-900 mb-4">
                            Consumo de Combustível
                          </h5>
                          <div className="flex items-center">
                            <Gauge className="w-8 h-8 text-blue-600 mr-4" />
                            <div>
                              <p className="text-3xl font-bold text-gray-900">
                                {camiao.historicoUtilizacao.consumoMedio.toFixed(
                                  1
                                )}
                              </p>
                              <p className="text-sm text-gray-500">km/litro</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Monitoramento */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4">
                          Monitoramento
                        </h5>
                        <div className="flex items-center">
                          <Clock className="w-8 h-8 text-purple-600 mr-4" />
                          <div>
                            <p className="text-3xl font-bold text-gray-900">
                              {camiao.historicoUtilizacao.totalHorasMonitoradas}
                            </p>
                            <p className="text-sm text-gray-500">
                              horas monitoradas
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Datas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {camiao.historicoUtilizacao.dataPrimeiraUtilizacao && (
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
                          <h5 className="font-semibold text-gray-900 mb-2">
                            Primeira Utilização
                          </h5>
                          <p className="text-gray-700">
                            {formatarData(
                              camiao.historicoUtilizacao.dataPrimeiraUtilizacao
                            )}
                          </p>
                        </div>
                      )}
                      {camiao.historicoUtilizacao.dataUltimaUtilizacao && (
                        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
                          <h5 className="font-semibold text-gray-900 mb-2">
                            Última Utilização
                          </h5>
                          <p className="text-gray-700">
                            {formatarData(
                              camiao.historicoUtilizacao.dataUltimaUtilizacao
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tab: Associações */}
                {activeTab === "associacoes" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Associações e Dados Relacionais
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Transportadora */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Building className="w-5 h-5 mr-2 text-blue-600" />
                          Transportadora
                        </h5>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              ID da Transportadora
                            </p>
                            <p className="text-base font-semibold text-gray-900">
                              {camiao.transportadoraId}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Nome da Transportadora
                            </p>
                            <p className="text-base font-semibold text-gray-900">
                              {camiao.motoristaDetalhes?.empresaMotorista ??
                                "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Motorista */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Truck className="w-5 h-5 mr-2 text-green-600" />
                          Motorista
                        </h5>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              ID do Motorista
                            </p>
                            <p className="text-base font-semibold text-gray-900">
                              {camiao.motoristaId}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Nome do Motorista
                            </p>
                            <p className="text-base font-semibold text-gray-900">
                              {camiao.motoristaDetalhes?.nomeCompleto ?? "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Informações detalhadas do motorista */}
                    {camiao.motoristaDetalhes && (
                      <>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h6 className="text-sm font-semibold text-gray-700 mb-2">
                            Informações Detalhadas do Motorista
                          </h6>

                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Dados Básicos */}
                              <div className="space-y-3">
                                <div>
                                  <p className="text-xs font-medium text-gray-500">
                                    Nome Completo
                                  </p>
                                  <p className="text-sm font-semibold text-gray-900">
                                    {camiao.motoristaDetalhes.nomeCompleto ||
                                      "N/A"}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-gray-500">
                                    BI / Número de Identificação
                                  </p>
                                  <p className="text-sm text-gray-900">
                                    {camiao.motoristaDetalhes.numeroBI || "N/A"}
                                    {camiao.motoristaDetalhes.validadeBI && (
                                      <span
                                        className={`ml-2 text-xs ${
                                          new Date(
                                            camiao.motoristaDetalhes.validadeBI
                                          ) > new Date()
                                            ? "text-green-600"
                                            : "text-red-600"
                                        }`}
                                      >
                                        (Válido até{" "}
                                        {formatarData(
                                          camiao.motoristaDetalhes.validadeBI
                                        )}
                                        )
                                      </span>
                                    )}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-gray-500">
                                    NUIT
                                  </p>
                                  <p className="text-sm text-gray-900">
                                    {camiao.motoristaDetalhes.nuit || "N/A"}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-gray-500">
                                    Nacionalidade
                                  </p>
                                  <p className="text-sm text-gray-900">
                                    {camiao.motoristaDetalhes.nacionalidade ||
                                      "N/A"}
                                  </p>
                                </div>
                              </div>

                              {/* Contatos e Status */}
                              <div className="space-y-3">
                                <div>
                                  <p className="text-xs font-medium text-gray-500">
                                    Telefone
                                  </p>
                                  <div className="space-y-1">
                                    <p className="text-sm text-gray-900">
                                      {camiao.motoristaDetalhes.contactos
                                        ?.telefonePrincipal || "N/A"}
                                    </p>
                                    {camiao.motoristaDetalhes.contactos
                                      ?.telefoneAlternativo && (
                                      <p className="text-xs text-gray-500">
                                        Alternativo:{" "}
                                        {
                                          camiao.motoristaDetalhes.contactos
                                            .telefoneAlternativo
                                        }
                                      </p>
                                    )}
                                    {camiao.motoristaDetalhes.contactos
                                      ?.email && (
                                      <p className="text-xs text-gray-500">
                                        Email:{" "}
                                        {
                                          camiao.motoristaDetalhes.contactos
                                            .email
                                        }
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <p className="text-xs font-medium text-gray-500">
                                      Status
                                    </p>
                                    <span
                                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                        camiao.motoristaDetalhes.status ===
                                        "disponivel"
                                          ? "bg-green-100 text-green-800"
                                          : camiao.motoristaDetalhes.status ===
                                            "em_viagem"
                                          ? "bg-blue-100 text-blue-800"
                                          : camiao.motoristaDetalhes.status ===
                                            "ferias"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-gray-100 text-gray-800"
                                      }`}
                                    >
                                      {camiao.motoristaDetalhes.status
                                        ?.charAt(0)
                                        .toUpperCase() +
                                        camiao.motoristaDetalhes.status?.slice(
                                          1
                                        ) || "N/A"}
                                    </span>
                                  </div>
                                  <div>
                                    <p className="text-xs font-medium text-gray-500">
                                      Contratual
                                    </p>
                                    <span
                                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                        camiao.motoristaDetalhes
                                          .statusContratual === "ativo"
                                          ? "bg-green-100 text-green-800"
                                          : "bg-gray-100 text-gray-800"
                                      }`}
                                    >
                                      {camiao.motoristaDetalhes.statusContratual
                                        ?.charAt(0)
                                        .toUpperCase() +
                                        camiao.motoristaDetalhes.statusContratual?.slice(
                                          1
                                        ) || "N/A"}
                                    </span>
                                  </div>
                                </div>

                                <div>
                                  <p className="text-xs font-medium text-gray-500">
                                    Empresa
                                  </p>
                                  <p className="text-sm text-gray-900">
                                    {camiao.motoristaDetalhes
                                      .empresaMotorista || "N/A"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Documentação */}
                          <div className="mb-4">
                            <h6 className="text-sm font-semibold text-gray-700 mb-3">
                              Documentação
                            </h6>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Carta de Condução */}
                              {camiao.motoristaDetalhes.cartaConducao && (
                                <div className="bg-blue-50 rounded-lg p-3">
                                  <div className="flex items-center mb-2">
                                    <FileText className="w-4 h-4 text-blue-600 mr-2" />
                                    <p className="text-sm font-semibold text-gray-900">
                                      Carta de Condução
                                    </p>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex justify-between">
                                      <span className="text-xs text-gray-600">
                                        Número:
                                      </span>
                                      <span className="text-xs font-medium">
                                        {
                                          camiao.motoristaDetalhes.cartaConducao
                                            .numero
                                        }
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-xs text-gray-600">
                                        Categoria:
                                      </span>
                                      <span className="text-xs font-medium">
                                        {
                                          camiao.motoristaDetalhes.cartaConducao
                                            .categoria
                                        }
                                      </span>
                                    </div>
                                    {camiao.motoristaDetalhes.cartaConducao
                                      .validade && (
                                      <div className="flex justify-between">
                                        <span className="text-xs text-gray-600">
                                          Validade:
                                        </span>
                                        <span
                                          className={`text-xs font-medium ${
                                            new Date(
                                              camiao.motoristaDetalhes.cartaConducao.validade
                                            ) > new Date()
                                              ? "text-green-600"
                                              : "text-red-600"
                                          }`}
                                        >
                                          {formatarData(
                                            camiao.motoristaDetalhes
                                              .cartaConducao.validade
                                          )}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Passaporte */}
                              {camiao.motoristaDetalhes.passaporte?.numero && (
                                <div className="bg-purple-50 rounded-lg p-3">
                                  <div className="flex items-center mb-2">
                                    <CreditCard className="w-4 h-4 text-purple-600 mr-2" />
                                    <p className="text-sm font-semibold text-gray-900">
                                      Passaporte
                                    </p>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex justify-between">
                                      <span className="text-xs text-gray-600">
                                        Número:
                                      </span>
                                      <span className="text-xs font-medium">
                                        {
                                          camiao.motoristaDetalhes.passaporte
                                            .numero
                                        }
                                      </span>
                                    </div>
                                    {camiao.motoristaDetalhes.passaporte
                                      .paisEmissor && (
                                      <div className="flex justify-between">
                                        <span className="text-xs text-gray-600">
                                          País:
                                        </span>
                                        <span className="text-xs font-medium">
                                          {
                                            camiao.motoristaDetalhes.passaporte
                                              .paisEmissor
                                          }
                                        </span>
                                      </div>
                                    )}
                                    {camiao.motoristaDetalhes.passaporte
                                      .validade && (
                                      <div className="flex justify-between">
                                        <span className="text-xs text-gray-600">
                                          Validade:
                                        </span>
                                        <span
                                          className={`text-xs font-medium ${
                                            new Date(
                                              camiao.motoristaDetalhes.passaporte.validade
                                            ) > new Date()
                                              ? "text-green-600"
                                              : "text-red-600"
                                          }`}
                                        >
                                          {formatarData(
                                            camiao.motoristaDetalhes.passaporte
                                              .validade
                                          )}
                                        </span>
                                      </div>
                                    )}
                                    {camiao.motoristaDetalhes.passaporte
                                      .dataEmissao && (
                                      <div className="flex justify-between">
                                        <span className="text-xs text-gray-600">
                                          Emissão:
                                        </span>
                                        <span className="text-xs font-medium">
                                          {formatarData(
                                            camiao.motoristaDetalhes.passaporte
                                              .dataEmissao
                                          )}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Licença Profissional */}
                              {camiao.motoristaDetalhes.licencaProfissional
                                ?.numero && (
                                <div className="bg-green-50 rounded-lg p-3">
                                  <div className="flex items-center mb-2">
                                    <Award className="w-4 h-4 text-green-600 mr-2" />
                                    <p className="text-sm font-semibold text-gray-900">
                                      Licença Profissional
                                    </p>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex justify-between">
                                      <span className="text-xs text-gray-600">
                                        Número:
                                      </span>
                                      <span className="text-xs font-medium">
                                        {
                                          camiao.motoristaDetalhes
                                            .licencaProfissional.numero
                                        }
                                      </span>
                                    </div>
                                    {camiao.motoristaDetalhes
                                      .licencaProfissional.categoria && (
                                      <div className="flex justify-between">
                                        <span className="text-xs text-gray-600">
                                          Categoria:
                                        </span>
                                        <span className="text-xs font-medium">
                                          {
                                            camiao.motoristaDetalhes
                                              .licencaProfissional.categoria
                                          }
                                        </span>
                                      </div>
                                    )}
                                    {camiao.motoristaDetalhes
                                      .licencaProfissional.validade && (
                                      <div className="flex justify-between">
                                        <span className="text-xs text-gray-600">
                                          Validade:
                                        </span>
                                        <span
                                          className={`text-xs font-medium ${
                                            new Date(
                                              camiao.motoristaDetalhes.licencaProfissional.validade
                                            ) > new Date()
                                              ? "text-green-600"
                                              : "text-red-600"
                                          }`}
                                        >
                                          {formatarData(
                                            camiao.motoristaDetalhes
                                              .licencaProfissional.validade
                                          )}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Estatísticas do Motorista */}
                          {md &&
                            ((md.totalViagensRealizadas ?? 0) > 0 ||
                              (md.totalKmPercorridos ?? 0) > 0 ||
                              (md.avaliacaoGeral ?? 0) > 0) && (
                              <div className="mb-4">
                                <h6 className="text-sm font-semibold text-gray-700 mb-3">
                                  Estatísticas de Desempenho
                                </h6>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                  {(md.totalViagensRealizadas ?? 0) > 0 && (
                                    <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                                      <p className="text-xs text-gray-500">
                                        Viagens
                                      </p>
                                      <p className="text-lg font-bold text-gray-900">
                                        {md.totalViagensRealizadas}
                                      </p>
                                    </div>
                                  )}

                                  {(md.totalKmPercorridos ?? 0) > 0 && (
                                    <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                                      <p className="text-xs text-gray-500">
                                        Km Percorridos
                                      </p>
                                      <p className="text-lg font-bold text-gray-900">
                                        {md.totalKmPercorridos?.toLocaleString()}
                                      </p>
                                    </div>
                                  )}

                                  {(md.avaliacaoGeral ?? 0) > 0 && (
                                    <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                                      <p className="text-xs text-gray-500">
                                        Avaliação
                                      </p>
                                      <div className="flex items-center justify-center">
                                        {[...Array(5)].map((_, index) => (
                                          <Star
                                            key={index}
                                            className={`w-4 h-4 ${
                                              index <
                                              Math.floor(md.avaliacaoGeral ?? 0)
                                                ? "text-yellow-400 fill-yellow-400"
                                                : "text-gray-300"
                                            }`}
                                          />
                                        ))}
                                        <span className="ml-1 text-sm font-bold text-gray-900">
                                          {(md.avaliacaoGeral ?? 0).toFixed(1)}
                                        </span>
                                      </div>
                                    </div>
                                  )}

                                  {(md.indiceAcidentes ?? -1) >= 0 && (
                                    <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                                      <p className="text-xs text-gray-500">
                                        Índice Acidentes
                                      </p>
                                      <p
                                        className={`text-lg font-bold ${
                                          md.indiceAcidentes === 0
                                            ? "text-green-600"
                                            : (md.indiceAcidentes ?? 0) <= 5
                                            ? "text-yellow-600"
                                            : "text-red-600"
                                        }`}
                                      >
                                        {md.indiceAcidentes}%
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                        </div>

                        {/* Botão para ver detalhes completos do motorista */}
                        <div className="mt-4">
                          <button
                            onClick={() => {
                              // Aqui você pode redirecionar para a página do motorista
                              // ou abrir um modal com detalhes completos
                              console.log(
                                "Abrir modal de detalhes do motorista:",
                                camiao.motoristaDetalhes
                              );

                              // Exemplo: abrir nova janela ou rota
                              // window.open(`/motoristas/detalhes/${camiao.motoristaDetalhes.motoristaId}`, '_blank');
                            }}
                            className="w-full px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Ver perfil completo do motorista
                          </button>
                        </div>
                      </>
                    )}
                    {/* Disponibilidade */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                        Disponibilidade e Regiões
                      </h5>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-2">
                            Tipos de Serviço Disponíveis
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {camiao.disponibilidade.tipoServico.map(
                              (servico, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                                >
                                  {servico.charAt(0).toUpperCase() +
                                    servico.slice(1)}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                        {camiao.disponibilidade.regioes.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-gray-500 mb-2">
                              Regiões de Atuação
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {camiao.disponibilidade.regioes.map(
                                (regiao, index) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full"
                                  >
                                    {regiao}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}
                        {camiao.disponibilidade.observacoes && (
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Observações de Disponibilidade
                            </p>
                            <p className="text-sm text-gray-700 mt-1">
                              {camiao.disponibilidade.observacoes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {/* Tab: Fotos */}
                {activeTab === "fotos" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Galeria de Fotos do Camião
                      </h4>
                    </div>

                    {/* Fotos do Camião */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h5 className="text-md font-semibold text-gray-900 flex items-center">
                          <Camera className="w-5 h-5 mr-2 text-blue-600" />
                          Fotos do Camião ({camiao.fotos?.length || 0})
                        </h5>
                        {camiao.fotos && camiao.fotos.length > 0 && (
                          <span className="text-sm text-gray-500">
                            Clique para ampliar
                          </span>
                        )}
                      </div>

                      {camiao.fotos && camiao.fotos.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {camiao.fotos.map((foto, index) => (
                            <div
                              key={index}
                              className="relative group cursor-pointer"
                              onClick={() => {
                                // Abrir foto em modal/tela cheia
                                window.open(foto, "_blank");
                              }}
                            >
                              <div className="aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-100 hover:border-blue-300 transition-all duration-200">
                                <Image
                                  src={foto}
                                  alt={`Foto ${index + 1} do camião ${
                                    camiao.matricula
                                  }`}
                                  fill
                                  className="object-cover object-center group-hover:scale-105 transition-transform duration-200"
                                  onError={(e) => {
                                    const element =
                                      e.target as HTMLImageElement;
                                    element.src =
                                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Cpath d='M30,40 L70,40 L70,60 L30,60 Z' fill='%239ca3af'/%3E%3Ccircle cx='50' cy='30' r='10' fill='%239ca3af'/%3E%3C/svg%3E";
                                  }}
                                  sizes="100%"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-12 text-center">
                          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Nenhuma foto do camião
                          </h3>
                          <p className="text-gray-600 mb-6">
                            Adicione fotos do camião para ter um registro visual
                            completo.
                          </p>
                          <button
                            onClick={() => {
                              // Função para upload de fotos
                              console.log("Iniciar upload de fotos do camião");
                            }}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <Camera className="w-4 h-4 mr-2" />
                            Adicionar Primeira Foto
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Fotos do GPS */}
                    <div className="space-y-4 pt-8 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <h5 className="text-md font-semibold text-gray-900 flex items-center">
                          <Wifi className="w-5 h-5 mr-2 text-purple-600" />
                          Fotos do Sistema GPS ({camiao.fotosGPS?.length || 0})
                        </h5>
                        {camiao.fotosGPS && camiao.fotosGPS.length > 0 && (
                          <span className="text-sm text-gray-500">
                            Clique para ampliar
                          </span>
                        )}
                      </div>

                      {camiao.fotosGPS && camiao.fotosGPS.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {camiao.fotosGPS.map((foto, index) => (
                            <div
                              key={index}
                              className="relative group cursor-pointer"
                              onClick={() => {
                                // Abrir foto em modal/tela cheia
                                window.open(foto, "_blank");
                              }}
                            >
                              <div className="aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-100 hover:border-purple-300 transition-all duration-200">
                                <div className="relative h-full w-full">
                                  <Image
                                    src={foto}
                                    alt={`Foto ${index + 1} do GPS ${
                                      camiao.codigoGPS
                                    }`}
                                    fill
                                    className="object-cover object-center group-hover:scale-105 transition-transform duration-200"
                                    sizes="100%"
                                    onError={(e) => {
                                      const element =
                                        e.target as HTMLImageElement;
                                      element.src =
                                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Cpath d='M50,30 A20,20 0 1,0 50,70 A20,20 0 1,0 50,30' fill='%239ca3af'/%3E%3Cpath d='M50,40 L70,60 M50,40 L30,60' stroke='%239ca3af' stroke-width='2'/%3E%3C/svg%3E";
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-purple-50 border border-dashed border-purple-200 rounded-lg p-12 text-center">
                          <Wifi className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Nenhuma foto do GPS
                          </h3>
                          <p className="text-gray-600 mb-6">
                            Adicione fotos da instalação do sistema GPS para
                            documentação.
                          </p>
                          <button
                            onClick={() => {
                              // Função para upload de fotos do GPS
                              console.log("Iniciar upload de fotos do GPS");
                            }}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            <Wifi className="w-4 h-4 mr-2" />
                            Adicionar Fotos do GPS
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Informações sobre as fotos */}
                    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <Camera className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <h6 className="text-sm font-semibold text-gray-900">
                            Importância das Fotos
                          </h6>
                          <ul className="mt-2 text-sm text-gray-700 space-y-1">
                            <li className="flex items-start">
                              <Check className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span>
                                Documentação visual do estado do veículo
                              </span>
                            </li>
                            <li className="flex items-start">
                              <Check className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span>Registro da instalação do sistema GPS</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span>
                                Suporte para processos de inspeção e manutenção
                              </span>
                            </li>
                            <li className="flex items-start">
                              <Check className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span>Referência para avaliação de danos</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {camiao && (
                  <span>
                    Última atualização: {formatarData(camiao.dataAtualizacao)}
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

// Componente Modal de Edição
const EditarCamiaoModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  camiao: Camiao | null;
  onSuccess: () => void;
}> = ({ isOpen, onClose, camiao, onSuccess }) => {
  const [formData, setFormData] = useState<Partial<Camiao>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("basico");

  useEffect(() => {
    if (camiao && isOpen) {
      fetchCamiaoDetails();
    }
  }, [camiao, isOpen]);

  const fetchCamiaoDetails = async () => {
    if (!camiao?.camiaoId) return;

    setLoading(true);
    setError(null);

    try {
      // Usar o novo endpoint getCamiaoDetail
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getCamiaoDetail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            camiaoId: camiao.camiaoId,
          }),
        }
      );

      const data = await response.json();
      console.log("Resposta para edição:", data); // Debug

      if (data.returnCode === 200 && data.data) {
        setFormData(data.data);
      } else {
        setError(data.returnMsg || "Erro ao carregar detalhes do camião");
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
      setError("Erro ao carregar dados do camião");
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

  const handleNestedInputChange = (path: string, value: any) => {
    const parts = path.split(".");
    setFormData((prev) => {
      const newData = { ...prev };
      let current: any = newData;

      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) {
          current[parts[i]] = {};
        }
        current = current[parts[i]];
      }

      current[parts[parts.length - 1]] = value;
      return newData;
    });
  };

  const handleEspecificacoesChange = (
    field: string,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      especificacoes: {
        ...prev.especificacoes,
        [field]: value,
      } as Especificacoes,
    }));
  };

  const handleNivelInspecaoChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      nivelInspecao: {
        ...prev.nivelInspecao,
        [field]: value,
      } as NivelInspecao,
    }));
  };

  const handleTipoGPSChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      tipoGPS: {
        ...prev.tipoGPS,
        [field]: value,
      } as TipoGPS,
    }));
  };

  const handleDocumentacaoChange = (
    tipo: string,
    field: string,
    value: string
  ) => {
    setFormData((prev) => {
      // Inicializar documentacao se não existir
      const currentDoc = prev.documentacao || {};

      // Criar uma cópia segura usando type assertion
      const documentacao = { ...currentDoc } as any;

      if (tipo === "seguro") {
        documentacao.seguro = {
          ...documentacao.seguro,
          [field]: value,
        };
      } else if (tipo === "licencaOperacao") {
        documentacao.licencaOperacao = {
          ...documentacao.licencaOperacao,
          [field]: value,
        };
      } else if (tipo === "certificadoGPS") {
        documentacao.certificadoGPS = {
          ...documentacao.certificadoGPS,
          [field]: value,
        };
      } else if (tipo === "registroComercial") {
        documentacao.registroComercial = value;
      }

      return {
        ...prev,
        documentacao,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!camiao?.camiaoId) return;

    setSaving(true);
    setError(null);

    try {
      // Validar campos obrigatórios
      if (!formData.matricula || !formData.marca || !formData.modelo) {
        throw new Error("Matrícula, marca e modelo são obrigatórios");
      }

      // Validar tipo de GPS
      if (formData.tipoGPS?.tipo === "vip") {
        const categoria = formData.nivelInspecao?.categoria;
        if (categoria !== "C") {
          throw new Error(
            "GPS VIP só está disponível para camiões categoria C"
          );
        }
      }

      const updateData = {
        camiaoId: camiao.camiaoId,
        ...formData,
        dataAtualizacao: new Date().toISOString(),
      };

      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/updateCamiao",
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
        setError(data.returnMsg || "Erro ao atualizar camião");
      }
    } catch (error: any) {
      console.error("Erro ao atualizar:", error);
      setError(error.message || "Erro ao atualizar camião");
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
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Editar Camião
                  </h3>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {camiao?.matricula}
                    </span>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm text-gray-600">
                      ID: {camiao?.camiaoId}
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
                <Truck className="inline-block w-4 h-4 mr-2" />
                Informações Básicas
              </button>
              <button
                onClick={() => setActiveTab("especificacoes")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "especificacoes"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Settings className="inline-block w-4 h-4 mr-2" />
                Especificações
              </button>
              <button
                onClick={() => setActiveTab("gps")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "gps"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Wifi className="inline-block w-4 h-4 mr-2" />
                GPS
              </button>
              <button
                onClick={() => setActiveTab("inspecao")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "inspecao"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Shield className="inline-block w-4 h-4 mr-2" />
                Inspeção
              </button>
              <button
                onClick={() => setActiveTab("documentacao")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "documentacao"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FileText className="inline-block w-4 h-4 mr-2" />
                Documentação
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            {loading ? (
              <div className="py-12 text-center">
                <Loader2 className="inline-block w-8 h-8 text-blue-600 animate-spin" />
                <p className="mt-2 text-gray-600">
                  Carregando dados do camião...
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
                          Matrícula *
                        </label>
                        <input
                          type="text"
                          value={formData.matricula || ""}
                          onChange={(e) =>
                            handleInputChange("matricula", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Código GPS *
                        </label>
                        <input
                          type="text"
                          value={formData.codigoGPS || ""}
                          onChange={(e) =>
                            handleInputChange("codigoGPS", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Marca *
                        </label>
                        <input
                          type="text"
                          value={formData.marca || ""}
                          onChange={(e) =>
                            handleInputChange("marca", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Modelo *
                        </label>
                        <input
                          type="text"
                          value={formData.modelo || ""}
                          onChange={(e) =>
                            handleInputChange("modelo", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Ano de Fabricação *
                        </label>
                        <input
                          type="number"
                          value={formData.anoFabricacao || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "anoFabricacao",
                              parseInt(e.target.value)
                            )
                          }
                          min="1900"
                          max={new Date().getFullYear() + 1}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Cor
                        </label>
                        <input
                          type="text"
                          value={formData.cor || ""}
                          onChange={(e) =>
                            handleInputChange("cor", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Status Operacional
                        </label>
                        <select
                          value={formData.status || ""}
                          onChange={(e) =>
                            handleInputChange("status", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          <option value="disponivel">Disponível</option>
                          <option value="em_viagem">Em Viagem</option>
                          <option value="manutencao">Manutenção</option>
                          <option value="inativo">Inativo</option>
                          <option value="reservado">Reservado</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Estado do Veículo
                        </label>
                        <select
                          value={formData.estado?.tipo || ""}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "estado.tipo",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          <option value="novo">Novo</option>
                          <option value="seminovo">Seminovo</option>
                          <option value="usado">Usado</option>
                          <option value="recondicionado">Recondicionado</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Especificações */}
                {activeTab === "especificacoes" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Tipo de Camião *
                        </label>
                        <select
                          value={formData.especificacoes?.tipo || ""}
                          onChange={(e) =>
                            handleEspecificacoesChange("tipo", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        >
                          <option value="">Selecione</option>
                          <option value="rigido">Rígido</option>
                          <option value="articulado">Articulado</option>
                          <option value="reboque">Reboque</option>
                          <option value="tanque">Tanque</option>
                          <option value="frigorifico">Frigorífico</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Número de Eixos *
                        </label>
                        <input
                          type="number"
                          value={formData.especificacoes?.numEixos || ""}
                          onChange={(e) =>
                            handleEspecificacoesChange(
                              "numEixos",
                              parseInt(e.target.value)
                            )
                          }
                          min="2"
                          max="10"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Peso Bruto Total (PBT) em kg *
                        </label>
                        <input
                          type="number"
                          value={formData.especificacoes?.pesoBruto || ""}
                          onChange={(e) =>
                            handleEspecificacoesChange(
                              "pesoBruto",
                              parseInt(e.target.value)
                            )
                          }
                          min="0"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Tara (Peso Vazio) em kg *
                        </label>
                        <input
                          type="number"
                          value={formData.especificacoes?.tara || ""}
                          onChange={(e) =>
                            handleEspecificacoesChange(
                              "tara",
                              parseInt(e.target.value)
                            )
                          }
                          min="0"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Carga Útil em kg *
                        </label>
                        <input
                          type="number"
                          value={formData.especificacoes?.cargaUtil || ""}
                          onChange={(e) =>
                            handleEspecificacoesChange(
                              "cargaUtil",
                              parseInt(e.target.value)
                            )
                          }
                          min="0"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Comprimento (m)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.especificacoes?.comprimento || ""}
                          onChange={(e) =>
                            handleEspecificacoesChange(
                              "comprimento",
                              parseFloat(e.target.value)
                            )
                          }
                          min="0"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Largura (m)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.especificacoes?.largura || ""}
                          onChange={(e) =>
                            handleEspecificacoesChange(
                              "largura",
                              parseFloat(e.target.value)
                            )
                          }
                          min="0"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Altura (m)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.especificacoes?.altura || ""}
                          onChange={(e) =>
                            handleEspecificacoesChange(
                              "altura",
                              parseFloat(e.target.value)
                            )
                          }
                          min="0"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: GPS */}
                {activeTab === "gps" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Tipo de GPS *
                        </label>
                        <select
                          value={formData.tipoGPS?.tipo || ""}
                          onChange={(e) => {
                            handleTipoGPSChange("tipo", e.target.value);
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          <option value="normal">Normal</option>
                          <option value="vip">VIP</option>
                        </select>
                        <p className="mt-1 text-sm text-gray-500">
                          GPS VIP só disponível para camiões categoria C
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Status do GPS
                        </label>
                        <select
                          value={formData.tipoGPS?.status || ""}
                          onChange={(e) =>
                            handleTipoGPSChange("status", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          <option value="ativo">Ativo</option>
                          <option value="inativo">Inativo</option>
                          <option value="pendente">Pendente</option>
                          <option value="expirado">Expirado</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Data de Ativação
                        </label>
                        <input
                          type="date"
                          value={
                            formData.tipoGPS?.dataAtivacao
                              ? new Date(formData.tipoGPS.dataAtivacao)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            handleTipoGPSChange("dataAtivacao", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Data de Expiração
                        </label>
                        <input
                          type="date"
                          value={
                            formData.tipoGPS?.dataExpiracao
                              ? new Date(formData.tipoGPS.dataExpiracao)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            handleTipoGPSChange("dataExpiracao", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Valor do Registro (MZN)
                        </label>
                        <input
                          type="number"
                          value={formData.tipoGPS?.valorRegistro || ""}
                          onChange={(e) =>
                            handleTipoGPSChange(
                              "valorRegistro",
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Inspeção */}
                {activeTab === "inspecao" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Categoria de Inspeção *
                        </label>
                        <select
                          value={formData.nivelInspecao?.categoria || ""}
                          onChange={(e) => {
                            handleNivelInspecaoChange(
                              "categoria",
                              e.target.value
                            );
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        >
                          <option value="">Selecione</option>
                          <option value="A">A - Chanté (6 meses)</option>
                          <option value="B">B - Nacional (1 ano)</option>
                          <option value="C">C - Transito (2 anos)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Resultado da Última Inspeção *
                        </label>
                        <select
                          value={
                            formData.nivelInspecao?.resultadoUltimaInspecao ||
                            ""
                          }
                          onChange={(e) =>
                            handleNivelInspecaoChange(
                              "resultadoUltimaInspecao",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        >
                          <option value="aprovado">Aprovado</option>
                          <option value="aprovado_com_ressalvas">
                            Aprovado com Ressalvas
                          </option>
                          <option value="reprovado">Reprovado</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Data da Última Inspeção *
                        </label>
                        <input
                          type="date"
                          value={
                            formData.nivelInspecao?.dataUltimaInspecao
                              ? new Date(
                                  formData.nivelInspecao.dataUltimaInspecao
                                )
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            handleNivelInspecaoChange(
                              "dataUltimaInspecao",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Data da Próxima Inspeção
                        </label>
                        <input
                          type="date"
                          value={
                            formData.nivelInspecao?.dataProximaInspecao
                              ? new Date(
                                  formData.nivelInspecao.dataProximaInspecao
                                )
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            handleNivelInspecaoChange(
                              "dataProximaInspecao",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Centro de Inspeção
                        </label>
                        <input
                          type="text"
                          value={formData.nivelInspecao?.centroInspecao || ""}
                          onChange={(e) =>
                            handleNivelInspecaoChange(
                              "centroInspecao",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Observações da Inspeção
                        </label>
                        <textarea
                          value={formData.nivelInspecao?.observacoes || ""}
                          onChange={(e) =>
                            handleNivelInspecaoChange(
                              "observacoes",
                              e.target.value
                            )
                          }
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Documentação */}
                {activeTab === "documentacao" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Documentação do Seguro
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Número da Apólice
                        </label>
                        <input
                          type="text"
                          value={
                            formData.documentacao?.seguro?.numeroApolice || ""
                          }
                          onChange={(e) =>
                            handleDocumentacaoChange(
                              "seguro",
                              "numero",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Seguradora
                        </label>
                        <input
                          type="text"
                          value={
                            formData.documentacao?.seguro?.seguradora || ""
                          }
                          onChange={(e) =>
                            handleDocumentacaoChange(
                              "seguro",
                              "seguradora",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Data de Emissão
                        </label>
                        <input
                          type="date"
                          value={
                            formData.documentacao?.seguro?.dataEmissao
                              ? new Date(
                                  formData.documentacao.seguro.dataEmissao
                                )
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            handleDocumentacaoChange(
                              "seguro",
                              "dataEmissao",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Data de Validade
                        </label>
                        <input
                          type="date"
                          value={
                            formData.documentacao?.seguro?.dataValidade
                              ? new Date(
                                  formData.documentacao.seguro.dataValidade
                                )
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            handleDocumentacaoChange(
                              "seguro",
                              "dataValidade",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Cobertura
                        </label>
                        <textarea
                          value={formData.documentacao?.seguro?.cobertura || ""}
                          onChange={(e) =>
                            handleDocumentacaoChange(
                              "seguro",
                              "cobertura",
                              e.target.value
                            )
                          }
                          rows={2}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    <h4 className="text-lg font-semibold text-gray-900 mt-6">
                      Outra Documentação
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Registro Comercial
                        </label>
                        <input
                          type="text"
                          value={formData.documentacao?.registroComercial || ""}
                          onChange={(e) =>
                            handleInputChange("documentacao", {
                              ...formData.documentacao,
                              registroComercial: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Observações Gerais
                        </label>
                        <textarea
                          value={formData.observacoes || ""}
                          onChange={(e) =>
                            handleInputChange("observacoes", e.target.value)
                          }
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Observações importantes sobre o camião..."
                        />
                      </div>
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
                {camiao?.dataCriacao && (
                  <span>
                    Cadastrado em:{" "}
                    {new Date(camiao.dataCriacao).toLocaleDateString("pt-MZ")}
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

// Componente Principal
const CamioesList = () => {
  const [camioes, setCamioes] = useState<Camiao[]>([]);
  const [filtros, setFiltros] = useState({
    matricula: "",
    camiaoId: "",
    transportadoraId: "",
    motoristaId: "",
    status: "",
    categoriaInspecao: "",
    tipoGPS: "",
    gpsStatus: "",
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
  const [camiaoEditando, setCamiaoEditando] = useState<Camiao | null>(null);
  const [modalVisualizarAberto, setModalVisualizarAberto] = useState(false);
  const [camiaoVisualizando, setCamiaoVisualizando] = useState<number | null>(
    null
  );

  const carregarCamioes = async (pagina = 1) => {
    setCarregando(true);
    try {
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getCamiaoList",
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
        setCamioes(data.data.list || []);
        setPaginacao((prev) => ({
          ...prev,
          curPage: pagina,
          totalCount: data.data.totalCount,
          totalPage: data.data.totalPage,
        }));
      }
    } catch (error) {
      console.error("Erro ao carregar camiões:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarCamioes();
  }, [filtros.status, filtros.categoriaInspecao, filtros.tipoGPS]);

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleLimparFiltros = () => {
    setFiltros({
      matricula: "",
      camiaoId: "",
      transportadoraId: "",
      motoristaId: "",
      status: "",
      categoriaInspecao: "",
      tipoGPS: "",
      gpsStatus: "",
    });
  };

  const handleExcluirCamiao = async (camiaoId: number) => {
    if (window.confirm("Tem certeza que deseja excluir este camião?")) {
      try {
        const response = await fetch(
          "https://desktop-api-4f850b3f9733.herokuapp.com/deleteCamiao",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ camiaoId }),
          }
        );

        const data = await response.json();
        if (data.returnCode === 200) {
          carregarCamioes(paginacao.curPage);
        }
      } catch (error) {
        console.error("Erro ao excluir camião:", error);
      }
    }
  };

  // Funções para o modal
  const abrirModalEdicao = (camiao: Camiao) => {
    setCamiaoEditando(camiao);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setCamiaoEditando(null);
  };

  const handleEdicaoSucesso = () => {
    carregarCamioes(paginacao.curPage);
  };

  // Funções para o modal de visualização
  const abrirModalVisualizacao = (camiaoId: number) => {
    setCamiaoVisualizando(camiaoId);
    setModalVisualizarAberto(true);
  };

  const fecharModalVisualizacao = () => {
    setModalVisualizarAberto(false);
    setCamiaoVisualizando(null);
  };

  const categoriaCores: Record<string, string> = {
    C: "bg-green-100 text-green-800",
    B: "bg-blue-100 text-blue-800",
    A: "bg-yellow-100 text-yellow-800",
  };

  const statusCores: Record<string, string> = {
    disponivel: "bg-green-100 text-green-800",
    em_viagem: "bg-blue-100 text-blue-800",
    manutencao: "bg-yellow-100 text-yellow-800",
    inativo: "bg-gray-100 text-gray-800",
    reservado: "bg-purple-100 text-purple-800",
  };

  const tipoGPSCores: Record<string, string> = {
    vip: "bg-purple-100 text-purple-800",
    normal: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gestão de Camiões
              </h1>
              <p className="text-gray-600 mt-2">
                Gerencie a frota de camiões do sistema
              </p>
            </div>
          </div>

          {/* Cards Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Camiões</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {paginacao.totalCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Truck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Disponíveis</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {camioes.filter((c) => c.status === "disponivel").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Wifi className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">GPS VIP</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {camioes.filter((c) => c.tipoGPS?.tipo === "vip").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                  <Shield className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Categoria C</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      camioes.filter((c) => c.nivelInspecao?.categoria === "C")
                        .length
                    }
                  </p>
                </div>
              </div>
            </div>
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
                  Matrícula
                </label>
                <input
                  type="text"
                  value={filtros.matricula}
                  onChange={(e) =>
                    handleFiltroChange("matricula", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Buscar por matrícula..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria de Inspeção
                </label>
                <select
                  value={filtros.categoriaInspecao}
                  onChange={(e) =>
                    handleFiltroChange("categoriaInspecao", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todas</option>
                  <option value="A">A - Chanté</option>
                  <option value="B">B - Nacional</option>
                  <option value="C">C - Transito</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status Operacional
                </label>
                <select
                  value={filtros.status}
                  onChange={(e) => handleFiltroChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todos</option>
                  <option value="disponivel">Disponível</option>
                  <option value="em_viagem">Em Viagem</option>
                  <option value="manutencao">Manutenção</option>
                  <option value="inativo">Inativo</option>
                  <option value="reservado">Reservado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de GPS
                </label>
                <select
                  value={filtros.tipoGPS}
                  onChange={(e) =>
                    handleFiltroChange("tipoGPS", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todos</option>
                  <option value="vip">VIP</option>
                  <option value="normal">Normal</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID do Camião
                </label>
                <input
                  type="text"
                  value={filtros.camiaoId}
                  onChange={(e) =>
                    handleFiltroChange("camiaoId", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ID do camião"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status do GPS
                </label>
                <select
                  value={filtros.gpsStatus}
                  onChange={(e) =>
                    handleFiltroChange("gpsStatus", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todos</option>
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                  <option value="pendente">Pendente</option>
                  <option value="expirado">Expirado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID da Transportadora
                </label>
                <input
                  type="text"
                  value={filtros.transportadoraId}
                  onChange={(e) =>
                    handleFiltroChange("transportadoraId", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ID da transportadora"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => carregarCamioes(1)}
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
              Lista de Camiões ({paginacao.totalCount})
            </h2>
            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </button>
          </div>

          {carregando ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Carregando camiões...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Matrícula
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Marca / Modelo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        GPS
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Carga Útil
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
                    {camioes.map((camiao) => (
                      <tr key={camiao.camiaoId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-blue-600">
                            {camiao.matricula}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {camiao.camiaoId}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {camiao.marca} {camiao.modelo}
                            </div>
                            <div className="text-sm text-gray-500">
                              {camiao.anoFabricacao} • {camiao.cor}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              categoriaCores[camiao.nivelInspecao?.categoria] ||
                              "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {camiao.nivelInspecao?.categoria || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              statusCores[camiao.status]
                            }`}
                          >
                            {camiao.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                tipoGPSCores[camiao.tipoGPS?.tipo || "normal"]
                              }`}
                            >
                              {camiao.tipoGPS?.tipo?.toUpperCase() || "NORMAL"}
                            </span>
                            <div className="text-xs text-gray-500">
                              {camiao.codigoGPS}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {camiao.especificacoes?.cargaUtil?.toLocaleString()}{" "}
                            kg
                          </div>
                          <div className="text-sm text-gray-500">
                            {camiao.especificacoes?.numEixos} eixos
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(camiao.dataCriacao).toLocaleDateString(
                            "pt-MZ"
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex flex-col items-center space-x-2">
                            <button
                              onClick={() =>
                                abrirModalVisualizacao(camiao.camiaoId)
                              }
                              className="text-blue-600 hover:text-blue-900 p-1 transition-colors"
                              title="Visualizar"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => abrirModalEdicao(camiao)}
                              className="text-green-600 hover:text-green-900 p-1 transition-colors"
                              title="Editar"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleExcluirCamiao(camiao.camiaoId)
                              }
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Excluir"
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
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Mostrando {camioes.length} de {paginacao.totalCount} camiões
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => carregarCamioes(paginacao.curPage - 1)}
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
                            onClick={() => carregarCamioes(pageNum)}
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
                      onClick={() => carregarCamioes(paginacao.curPage + 1)}
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

              {/* Modais */}
              <EditarCamiaoModal
                isOpen={modalAberto}
                onClose={fecharModal}
                camiao={camiaoEditando}
                onSuccess={handleEdicaoSucesso}
              />
              <VisualizarCamiaoModal
                isOpen={modalVisualizarAberto}
                onClose={fecharModalVisualizacao}
                camiaoId={camiaoVisualizando}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CamioesList;
