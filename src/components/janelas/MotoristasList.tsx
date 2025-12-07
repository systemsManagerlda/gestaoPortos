/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// MotoristasList.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Filter,
  UserPlus,
  Edit,
  Eye,
  Trash2,
  Download,
  MoreVertical,
  Users,
  Truck,
  Shield,
  Car,
  Phone,
  Mail,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Save,
  Loader2,
  FileText,
  CreditCard,
  MapPin,
  Building,
  Award,
  CheckCircle,
  Clock,
  CalendarDays,
  Star,
  History,
  Check,
  XCircle,
  AlertTriangle,
  Printer,
  Camera,
  Gauge,
  Package,
  Settings,
  Zap,
  Award as AwardIcon,
  Battery,
  Wifi,
  Activity,
  BarChart3,
  Tag,
  BatteryCharging,
} from "lucide-react";

interface Passaporte {
  numero?: string;
  paisEmissor?: string;
  dataEmissao?: string;
  validade?: string;
  localEmissao?: string;
}

interface Motorista {
  motoristaId: number;
  nomeCompleto: string;
  dataNascimento?: string;
  nacionalidade: string;
  empresaMotorista: string;
  empresaMotoristaId: number;
  cargo: string;
  statusContratual: "ativo" | "inativo" | "ferias" | "licenca" | "suspenso";
  numeroBI: string;
  validadeBI: string;
  passaporte?: Passaporte;
  cartaConducao: {
    numero: string;
    categoria: string;
    dataEmissao?: string;
    validade: string;
    localEmissao?: string;
  };
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
  avaliacaoGeral: number;
  status: "disponivel" | "em_viagem" | "ferias" | "licenca" | "indisponivel";
  veiculosHabilitados: Array<{
    tipo: string;
    marca: string;
    modelo: string;
    matricula: string;
    nivelInspecao: {
      categoria: "A" | "B" | "C";
      descricao: string;
      dataUltimaInspecao: string;
      dataProximaInspecao: string;
      resultadoUltimaInspecao: "aprovado" | "aprovado_com_ressalvas" | "reprovado";
    };
    viabilidade: {
      podeChante: boolean;
      podeNacional: boolean;
      podeTransito: boolean;
      motivos: string[];
    };
  }>;
  infoTransportador: {
    totalCamioes: number;
    qualificadoTransito: boolean;
    restricoes?: {
      podeFazerNacional: boolean;
      podeFazerTransito: boolean;
      motivo?: string;
      dataVerificacao?: string;
    };
  };
  totalViagensRealizadas: number;
  totalKmPercorridos: number;
  indiceAcidentes: number;
  indiceMultas: number;
  dataCriacao: string;
  dataAtualizacao: string;
  criadoPor?: string;
  atualizadoPor?: string;
  observacoes?: string;
  foto?: string;
  fotos?: string[];
  endereco?: {
    provincia: string;
    cidade: string;
    bairro: string;
    rua: string;
    numeroCasa: string;
  };
  nuit?: string;
  dataAdmissao?: string;
  examesMedicos?: Array<{
    tipo: string;
    dataRealizacao: string;
    dataValidade: string;
    resultado: string;
    instituicao: string;
  }>;
  treinamentos?: Array<{
    nome: string;
    tipo: string;
    dataRealizacao: string;
    dataValidade: string;
    instituicao: string;
    certificado: string;
  }>;
  historicoAvaliacoes?: Array<{
    data: string;
    avaliacao: number;
    avaliador: string;
    viagemId: number;
    observacoes: string;
  }>;
  
  // Campos virtuais calculados
  idade?: number;
  cartaValida?: boolean;
  passaporteValido?: boolean;
  veiculosAptos?: Array<any>;
  horasConduzidasMes?: number;
}

// Componente Modal de Visualização
const VisualizarMotoristaModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  motoristaId: number | null;
}> = ({ isOpen, onClose, motoristaId }) => {
  const [motorista, setMotorista] = useState<Motorista | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("geral");

  useEffect(() => {
    if (isOpen && motoristaId) {
      fetchMotoristaDetails();
    } else {
      setMotorista(null);
    }
  }, [isOpen, motoristaId]);

  const fetchMotoristaDetails = async () => {
    if (!motoristaId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getMotoristaDetail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ motoristaId }),
        }
      );

      const data = await response.json();
      console.log("Resposta do motorista detalhe:", data);

      if (data.returnCode === 200 && data.data) {
        setMotorista(data.data);
      } else {
        setError(data.returnMsg || "Erro ao carregar detalhes do motorista");
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
      setError("Erro ao carregar dados do motorista");
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

  const getStatusContratualColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800";
      case "inativo":
        return "bg-gray-100 text-gray-800";
      case "ferias":
        return "bg-blue-100 text-blue-800";
      case "licenca":
        return "bg-yellow-100 text-yellow-800";
      case "suspenso":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "disponivel":
        return "bg-green-100 text-green-800";
      case "em_viagem":
        return "bg-blue-100 text-blue-800";
      case "ferias":
        return "bg-purple-100 text-purple-800";
      case "licenca":
        return "bg-yellow-100 text-yellow-800";
      case "indisponivel":
        return "bg-red-100 text-red-800";
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

  const getDocumentoStatusColor = (validade?: string) => {
    if (!validade) return "bg-gray-100 text-gray-800";
    const hoje = new Date();
    const dataValidade = new Date(validade);
    const diasRestantes = Math.ceil((dataValidade.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));

    if (diasRestantes < 0) return "bg-red-100 text-red-800";
    if (diasRestantes <= 30) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  const renderizarEstrelas = (avaliacao: number) => {
    const estrelas = [];
    for (let i = 1; i <= 5; i++) {
      estrelas.push(
        <span
          key={i}
          className={`text-lg ${
            i <= Math.round(avaliacao) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      );
    }
    return estrelas;
  };

  const calcularIdade = (dataNascimento?: string) => {
    if (!dataNascimento) return null;
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const verificarDocumentosVencidos = (motorista: Motorista) => {
    const hoje = new Date();
    const vencidos: string[] = [];

    if (motorista.validadeBI && new Date(motorista.validadeBI) < hoje) {
      vencidos.push("BI");
    }

    if (motorista.cartaConducao.validade && new Date(motorista.cartaConducao.validade) < hoje) {
      vencidos.push("Carta Condução");
    }

    if (motorista.passaporte?.validade && new Date(motorista.passaporte.validade) < hoje) {
      vencidos.push("Passaporte");
    }

    if (motorista.licencaProfissional?.validade && new Date(motorista.licencaProfissional.validade) < hoje) {
      vencidos.push("Licença Profissional");
    }

    // Verificar exames médicos
    motorista.examesMedicos?.forEach(exame => {
      if (exame.dataValidade && new Date(exame.dataValidade) < hoje) {
        vencidos.push(`Exame Médico (${exame.tipo})`);
      }
    });

    // Verificar treinamentos
    motorista.treinamentos?.forEach(treinamento => {
      if (treinamento.dataValidade && new Date(treinamento.dataValidade) < hoje) {
        vencidos.push(`Treinamento (${treinamento.nome})`);
      }
    });

    return vencidos;
  };

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
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {motorista?.nomeCompleto}
                    </h3>
                    {motorista && (
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusContratualColor(
                          motorista.statusContratual
                        )}`}
                      >
                        {motorista.statusContratual.charAt(0).toUpperCase() +
                          motorista.statusContratual.slice(1)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-1 space-x-3">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      ID: {motorista?.motoristaId}
                    </span>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm text-gray-600">
                      BI: {motorista?.numeroBI}
                    </span>
                    {motorista?.passaporte?.numero && (
                      <>
                        <span className="text-sm text-gray-600">•</span>
                        <span className="text-sm text-gray-600">
                          Passaporte: {motorista.passaporte.numero}
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
                <Users className="inline-block w-4 h-4 mr-2" />
                Visão Geral
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
                onClick={() => setActiveTab("veiculos")}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "veiculos"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Truck className="inline-block w-4 h-4 mr-2" />
                Veículos
              </button>
              <button
                onClick={() => setActiveTab("desempenho")}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "desempenho"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <BarChart3 className="inline-block w-4 h-4 mr-2" />
                Desempenho
              </button>
              <button
                onClick={() => setActiveTab("treinamentos")}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "treinamentos"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <AwardIcon className="inline-block w-4 h-4 mr-2" />
                Treinamentos
              </button>
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
            </nav>
          </div>

          {/* Content */}
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            {loading ? (
              <div className="py-12 text-center">
                <Loader2 className="inline-block w-8 h-8 text-blue-600 animate-spin" />
                <p className="mt-2 text-gray-600">
                  Carregando detalhes do motorista...
                </p>
              </div>
            ) : error ? (
              <div className="py-8 text-center">
                <AlertCircle className="inline-block w-12 h-12 text-red-400" />
                <p className="mt-2 text-gray-700">{error}</p>
                <button
                  onClick={fetchMotoristaDetails}
                  className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  Tentar novamente
                </button>
              </div>
            ) : !motorista ? (
              <div className="py-8 text-center">
                <Users className="inline-block w-12 h-12 text-gray-400" />
                <p className="mt-2 text-gray-600">Motorista não encontrado</p>
              </div>
            ) : (
              <>
                {/* Tab: Visão Geral */}
                {activeTab === "geral" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Informações Básicas */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Users className="w-5 h-5 mr-2 text-blue-600" />
                            Informações Pessoais
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Nome Completo
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {motorista.nomeCompleto}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Data de Nascimento
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {motorista.dataNascimento ? formatarData(motorista.dataNascimento) : "Não informado"}
                                {motorista.idade && ` (${motorista.idade} anos)`}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Nacionalidade
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {motorista.nacionalidade}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                NUIT
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {motorista.nuit || "Não informado"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Cargo
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {motorista.cargo}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Data de Admissão
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {motorista.dataAdmissao ? formatarData(motorista.dataAdmissao) : "Não informado"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Contatos e Endereço */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <Phone className="w-5 h-5 mr-2 text-green-600" />
                              Contatos
                            </h4>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Telefone Principal
                                </p>
                                <p className="text-base font-semibold text-gray-900">
                                  {motorista.contactos.telefonePrincipal}
                                </p>
                              </div>
                              {motorista.contactos.telefoneAlternativo && (
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    Telefone Alternativo
                                  </p>
                                  <p className="text-base font-semibold text-gray-900">
                                    {motorista.contactos.telefoneAlternativo}
                                  </p>
                                </div>
                              )}
                              {motorista.contactos.email && (
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    Email
                                  </p>
                                  <p className="text-base font-semibold text-gray-900">
                                    {motorista.contactos.email}
                                  </p>
                                </div>
                              )}
                              {motorista.contactos.emergencia && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                  <p className="text-sm font-medium text-gray-500 mb-2">
                                    Contato de Emergência
                                  </p>
                                  <div className="space-y-1">
                                    <p className="text-sm text-gray-900">
                                      {motorista.contactos.emergencia.nome} ({motorista.contactos.emergencia.parentesco})
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {motorista.contactos.emergencia.telefone}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {motorista.endereco && (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                                Endereço
                              </h4>
                              <div className="space-y-2">
                                <p className="text-sm text-gray-900">
                                  {motorista.endereco.rua}, {motorista.endereco.numeroCasa}
                                </p>
                                <p className="text-sm text-gray-900">
                                  {motorista.endereco.bairro}
                                </p>
                                <p className="text-sm text-gray-900">
                                  {motorista.endereco.cidade} - {motorista.endereco.provincia}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card de Resumo */}
                      <div className="space-y-6">
                        {/* Status */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">
                            Status e Empresa
                          </h4>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Empresa
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {motorista.empresaMotorista}
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                ID: {motorista.empresaMotoristaId}
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Status Contratual
                                </p>
                                <span
                                  className={`mt-1 inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusContratualColor(
                                    motorista.statusContratual
                                  )}`}
                                >
                                  {motorista.statusContratual.charAt(0).toUpperCase() +
                                    motorista.statusContratual.slice(1)}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Status Operacional
                                </p>
                                <span
                                  className={`mt-1 inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                    motorista.status
                                  )}`}
                                >
                                  {motorista.status.charAt(0).toUpperCase() +
                                    motorista.status.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Transportador */}
                        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">
                            Informações do Transportador
                          </h4>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Total de Camiões
                              </p>
                              <p className="text-xl font-bold text-gray-900">
                                {motorista.infoTransportador?.totalCamioes || 0}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Qualificado para Trânsito
                              </p>
                              <div className="flex items-center mt-1">
                                {motorista.infoTransportador?.qualificadoTransito ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    <span className="text-sm font-semibold text-green-700">
                                      Sim
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="w-4 h-4 text-red-500 mr-2" />
                                    <span className="text-sm font-semibold text-red-700">
                                      Não
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                            {motorista.infoTransportador?.restricoes && (
                              <div className="mt-2">
                                <p className="text-sm font-medium text-gray-500">
                                  Restrições
                                </p>
                                <p className="text-xs text-gray-700 mt-1">
                                  {motorista.infoTransportador.restricoes.motivo || "Nenhuma restrição"}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Documentos Vencidos */}
                        {verificarDocumentosVencidos(motorista).length > 0 && (
                          <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-6">
                            <div className="flex items-center mb-3">
                              <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                              <h4 className="text-lg font-semibold text-gray-900">
                                Documentos Vencidos
                              </h4>
                            </div>
                            <div className="space-y-1">
                              {verificarDocumentosVencidos(motorista).map((doc, index) => (
                                <div key={index} className="flex items-center">
                                  <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                                  <span className="text-sm text-gray-700">{doc}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Documentação */}
                {activeTab === "documentacao" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Documentação do Motorista
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* BI */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                          Bilhete de Identidade
                        </h5>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Número
                            </p>
                            <p className="text-base font-semibold text-gray-900">
                              {motorista.numeroBI}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Validade
                            </p>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-900">
                                {formatarData(motorista.validadeBI)}
                              </p>
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded-full ${getDocumentoStatusColor(
                                  motorista.validadeBI
                                )}`}
                              >
                                {new Date(motorista.validadeBI) > new Date() ? "Válido" : "Vencido"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Carta Condução */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <FileText className="w-5 h-5 mr-2 text-green-600" />
                          Carta de Condução
                        </h5>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Número
                            </p>
                            <p className="text-base font-semibold text-gray-900">
                              {motorista.cartaConducao.numero}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Categoria
                            </p>
                            <p className="text-base font-semibold text-gray-900">
                              {motorista.cartaConducao.categoria}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Validade
                            </p>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-900">
                                {formatarData(motorista.cartaConducao.validade)}
                              </p>
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded-full ${getDocumentoStatusColor(
                                  motorista.cartaConducao.validade
                                )}`}
                              >
                                {new Date(motorista.cartaConducao.validade) > new Date() ? "Válido" : "Vencido"}
                              </span>
                            </div>
                          </div>
                          {motorista.cartaConducao.localEmissao && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Local de Emissão
                              </p>
                              <p className="text-sm text-gray-900">
                                {motorista.cartaConducao.localEmissao}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Passaporte */}
                      {motorista.passaporte?.numero && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <AwardIcon className="w-5 h-5 mr-2 text-purple-600" />
                            Passaporte
                          </h5>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Número
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {motorista.passaporte.numero}
                              </p>
                            </div>
                            {motorista.passaporte.paisEmissor && (
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  País Emissor
                                </p>
                                <p className="text-sm text-gray-900">
                                  {motorista.passaporte.paisEmissor}
                                </p>
                              </div>
                            )}
                            {motorista.passaporte.validade && (
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Validade
                                </p>
                                <div className="flex items-center justify-between">
                                  <p className="text-sm text-gray-900">
                                    {formatarData(motorista.passaporte.validade)}
                                  </p>
                                  <span
                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getDocumentoStatusColor(
                                      motorista.passaporte.validade
                                    )}`}
                                  >
                                    {new Date(motorista.passaporte.validade) > new Date() ? "Válido" : "Vencido"}
                                  </span>
                                </div>
                              </div>
                            )}
                            {motorista.passaporte.localEmissao && (
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Local de Emissão
                                </p>
                                <p className="text-sm text-gray-900">
                                  {motorista.passaporte.localEmissao}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Licença Profissional */}
                      {motorista.licencaProfissional?.numero && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <AwardIcon className="w-5 h-5 mr-2 text-yellow-600" />
                            Licença Profissional
                          </h5>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Número
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {motorista.licencaProfissional.numero}
                              </p>
                            </div>
                            {motorista.licencaProfissional.categoria && (
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Categoria
                                </p>
                                <p className="text-base font-semibold text-gray-900">
                                  {motorista.licencaProfissional.categoria}
                                </p>
                              </div>
                            )}
                            {motorista.licencaProfissional.validade && (
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Validade
                                </p>
                                <div className="flex items-center justify-between">
                                  <p className="text-sm text-gray-900">
                                    {formatarData(motorista.licencaProfissional.validade)}
                                  </p>
                                  <span
                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getDocumentoStatusColor(
                                      motorista.licencaProfissional.validade
                                    )}`}
                                  >
                                    {new Date(motorista.licencaProfissional.validade) > new Date() ? "Válido" : "Vencido"}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tab: Veículos */}
                {activeTab === "veiculos" && (
  <div className="space-y-6">
    <div className="flex items-center justify-between mb-6">
      <h4 className="text-lg font-semibold text-gray-900">
        Veículos Habilitados ({motorista.veiculosHabilitados?.length || 0})
      </h4>
      <span className="text-sm text-gray-600">
        {motorista.veiculosAptos?.length || 0} apto(s) para serviço
      </span>
    </div>

    {motorista.veiculosHabilitados && motorista.veiculosHabilitados.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {motorista.veiculosHabilitados.map((veiculo, index) => {
          // Adicionar verificações de segurança
          if (!veiculo || !veiculo.nivelInspecao) return null;
          
          const hoje = new Date();
          const proximaInspecao = veiculo.nivelInspecao.dataProximaInspecao 
            ? new Date(veiculo.nivelInspecao.dataProximaInspecao)
            : null;
          
          const diasParaInspecao = proximaInspecao 
            ? Math.ceil((proximaInspecao.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24))
            : null;

          // Verificar viabilidade com fallback
          const viabilidade = veiculo.viabilidade || {
            podeChante: false,
            podeNacional: false,
            podeTransito: false,
            motivos: []
          };
          
          return (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h5 className="font-semibold text-gray-900">
                    {veiculo.marca || "Sem marca"} {veiculo.modelo || "Sem modelo"}
                  </h5>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {veiculo.matricula || "Sem matrícula"}
                    </span>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm text-gray-600 capitalize">
                      {veiculo.tipo || "Não especificado"}
                    </span>
                  </div>
                </div>
                {veiculo.nivelInspecao.categoria && (
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoriaColor(
                      veiculo.nivelInspecao.categoria
                    )}`}
                  >
                    Categoria {veiculo.nivelInspecao.categoria}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {/* Inspeção */}
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">
                    Inspeção Técnica
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Última Inspeção</p>
                      <p className="text-sm font-medium text-gray-900">
                        {veiculo.nivelInspecao.dataUltimaInspecao 
                          ? formatarData(veiculo.nivelInspecao.dataUltimaInspecao)
                          : "Não informada"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Próxima Inspeção</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {veiculo.nivelInspecao.dataProximaInspecao
                            ? formatarData(veiculo.nivelInspecao.dataProximaInspecao)
                            : "Não agendada"}
                        </p>
                        {diasParaInspecao !== null && (
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              diasParaInspecao < 0
                                ? "bg-red-100 text-red-800"
                                : diasParaInspecao <= 30
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {diasParaInspecao < 0 
                              ? `${Math.abs(diasParaInspecao)} dias atrasado` 
                              : `${diasParaInspecao} dias`}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {veiculo.nivelInspecao.resultadoUltimaInspecao && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">Resultado</p>
                      <span
                        className={`mt-1 inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          veiculo.nivelInspecao.resultadoUltimaInspecao === "aprovado"
                            ? "bg-green-100 text-green-800"
                            : veiculo.nivelInspecao.resultadoUltimaInspecao === "aprovado_com_ressalvas"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {veiculo.nivelInspecao.resultadoUltimaInspecao
                          .replace("_", " ")
                          .charAt(0)
                          .toUpperCase() +
                          veiculo.nivelInspecao.resultadoUltimaInspecao.replace("_", " ").slice(1)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Viabilidade - CORREÇÃO AQUI */}
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">
                    Serviços Permitidos
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className={`text-center p-2 rounded-lg ${
                      viabilidade.podeChante
                        ? "bg-green-50 border border-green-200"
                        : "bg-gray-50 border border-gray-200 opacity-50"
                    }`}>
                      <p className={`text-xs font-medium ${
                        viabilidade.podeChante ? "text-green-700" : "text-gray-500"
                      }`}>
                        Chanté
                      </p>
                    </div>
                    <div className={`text-center p-2 rounded-lg ${
                      viabilidade.podeNacional
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-gray-50 border border-gray-200 opacity-50"
                    }`}>
                      <p className={`text-xs font-medium ${
                        viabilidade.podeNacional ? "text-blue-700" : "text-gray-500"
                      }`}>
                        Nacional
                      </p>
                    </div>
                    <div className={`text-center p-2 rounded-lg ${
                      viabilidade.podeTransito
                        ? "bg-purple-50 border border-purple-200"
                        : "bg-gray-50 border border-gray-200 opacity-50"
                    }`}>
                      <p className={`text-xs font-medium ${
                        viabilidade.podeTransito ? "text-purple-700" : "text-gray-500"
                      }`}>
                        Trânsito
                      </p>
                    </div>
                  </div>
                  {viabilidade.motivos && viabilidade.motivos.length > 0 && (
                    <p className="text-xs text-gray-600 mt-2">
                      {viabilidade.motivos[0]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-12 text-center">
        <Truck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nenhum veículo habilitado
        </h3>
        <p className="text-gray-600">
          Este motorista ainda não tem veículos associados.
        </p>
      </div>
    )}
  </div>
)}

                {/* Tab: Desempenho */}
                {activeTab === "desempenho" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Desempenho e Estatísticas
                    </h4>

                    {/* Métricas Principais */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-500">
                          Avaliação Geral
                        </p>
                        <div className="flex items-center mt-2">
                          {renderizarEstrelas(motorista.avaliacaoGeral)}
                          <span className="ml-2 text-lg font-bold text-gray-900">
                            {motorista.avaliacaoGeral.toFixed(1)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Baseado em {motorista.historicoAvaliacoes?.length || 0} avaliações
                        </p>
                      </div>

                      <div className="bg-white border border-green-200 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-500">
                          Viagens Realizadas
                        </p>
                        <p className="text-2xl font-bold text-green-600 mt-1">
                          {motorista.totalViagensRealizadas}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Total de km: {motorista.totalKmPercorridos.toLocaleString()} km
                        </p>
                      </div>

                      <div className="bg-white border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-500">
                          Índice de Acidentes
                        </p>
                        <p className={`text-2xl font-bold mt-1 ${
                          motorista.indiceAcidentes === 0
                            ? "text-green-600"
                            : motorista.indiceAcidentes <= 5
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}>
                          {motorista.indiceAcidentes}%
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Porcentagem de viagens com acidentes
                        </p>
                      </div>

                      <div className="bg-white border border-blue-200 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-500">
                          Índice de Multas
                        </p>
                        <p className={`text-2xl font-bold mt-1 ${
                          motorista.indiceMultas === 0
                            ? "text-green-600"
                            : motorista.indiceMultas <= 3
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}>
                          {motorista.indiceMultas}%
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Porcentagem de viagens com multas
                        </p>
                      </div>
                    </div>

                    {/* Histórico de Avaliações */}
                    {motorista.historicoAvaliacoes && motorista.historicoAvaliacoes.length > 0 && (
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4">
                          Histórico de Avaliações
                        </h5>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                              <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                  Data
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                  Avaliação
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                  Avaliador
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                  Observações
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {motorista.historicoAvaliacoes
                                .slice()
                                .reverse()
                                .slice(0, 5)
                                .map((avaliacao, index) => (
                                  <tr key={index}>
                                    <td className="px-3 py-2 text-sm text-gray-900 whitespace-nowrap">
                                      {formatarData(avaliacao.data)}
                                    </td>
                                    <td className="px-3 py-2">
                                      <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                          <Star
                                            key={i}
                                            className={`w-4 h-4 ${
                                              i < Math.floor(avaliacao.avaliacao)
                                                ? "text-yellow-400 fill-yellow-400"
                                                : "text-gray-300"
                                            }`}
                                          />
                                        ))}
                                        <span className="ml-1 text-sm font-medium">
                                          {avaliacao.avaliacao.toFixed(1)}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="px-3 py-2 text-sm text-gray-900">
                                      {avaliacao.avaliador}
                                    </td>
                                    <td className="px-3 py-2 text-sm text-gray-700">
                                      {avaliacao.observacoes || "Sem observações"}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Treinamentos */}
                {activeTab === "treinamentos" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Treinamentos e Certificações
                    </h4>

                    {/* Exames Médicos */}
                    {motorista.examesMedicos && motorista.examesMedicos.length > 0 && (
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Shield className="w-5 h-5 mr-2 text-green-600" />
                          Exames Médicos
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {motorista.examesMedicos.map((exame, index) => {
                            const hoje = new Date();
                            const dataValidade = new Date(exame.dataValidade);
                            const diasRestantes = Math.ceil((dataValidade.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
                            
                            return (
                              <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <h6 className="font-medium text-gray-900">{exame.tipo}</h6>
                                  <span
                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                      diasRestantes < 0
                                        ? "bg-red-100 text-red-800"
                                        : diasRestantes <= 30
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-green-100 text-green-800"
                                    }`}
                                  >
                                    {diasRestantes < 0 ? "Vencido" : `${diasRestantes} dias`}
                                  </span>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-xs text-gray-600">
                                    <span className="font-medium">Instituição:</span> {exame.instituicao}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    <span className="font-medium">Realização:</span> {formatarData(exame.dataRealizacao)}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    <span className="font-medium">Validade:</span> {formatarData(exame.dataValidade)}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    <span className="font-medium">Resultado:</span> {exame.resultado}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Treinamentos */}
                    {motorista.treinamentos && motorista.treinamentos.length > 0 && (
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <AwardIcon className="w-5 h-5 mr-2 text-blue-600" />
                          Treinamentos e Capacitações
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {motorista.treinamentos.map((treinamento, index) => {
                            const hoje = new Date();
                            const dataValidade = new Date(treinamento.dataValidade);
                            const diasRestantes = Math.ceil((dataValidade.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
                            
                            return (
                              <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <h6 className="font-medium text-gray-900">{treinamento.nome}</h6>
                                  <span
                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                      diasRestantes < 0
                                        ? "bg-red-100 text-red-800"
                                        : diasRestantes <= 30
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-green-100 text-green-800"
                                    }`}
                                  >
                                    {diasRestantes < 0 ? "Vencido" : `${diasRestantes} dias`}
                                  </span>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-xs text-gray-600">
                                    <span className="font-medium">Tipo:</span> {treinamento.tipo}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    <span className="font-medium">Instituição:</span> {treinamento.instituicao}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    <span className="font-medium">Realização:</span> {formatarData(treinamento.dataRealizacao)}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    <span className="font-medium">Validade:</span> {formatarData(treinamento.dataValidade)}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    <span className="font-medium">Certificado:</span> {treinamento.certificado}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Fotos */}
                {activeTab === "fotos" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Galeria de Fotos do Motorista
                      </h4>
                      {motorista.fotos && motorista.fotos.length > 0 && (
                        <span className="text-sm text-gray-500">
                          Clique para ampliar
                        </span>
                      )}
                    </div>

                    {/* Foto Principal */}
                    <div className="mb-8">
                      <h5 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                        <Camera className="w-5 h-5 mr-2 text-blue-600" />
                        Foto Principal
                      </h5>
                      {motorista.foto ? (
                        <div
                          className="relative w-64 h-64 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 cursor-pointer"
                          onClick={() => window.open(motorista.foto, "_blank")}
                        >
                          <Image
                            src={motorista.foto}
                            alt={`Foto de ${motorista.nomeCompleto}`}
                            fill
                            className="object-cover object-center hover:scale-105 transition-transform duration-200"
                            onError={(e) => {
                              const element = e.target as HTMLImageElement;
                              element.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='%23f3f4f6'/%3E%3Cpath d='M128,80 a48,48 0 1,0 0,96 a48,48 0 1,0 0,-96' fill='%239ca3af'/%3E%3Cpath d='M128,40 a88,88 0 1,0 0,176 a88,88 0 1,0 0,-176' fill='none' stroke='%239ca3af' stroke-width='8'/%3E%3C/svg%3E";
                            }}
                            sizes="256px"
                          />
                        </div>
                      ) : (
                        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-12 text-center max-w-md">
                          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Nenhuma foto principal
                          </h3>
                          <p className="text-gray-600">
                            Adicione uma foto principal do motorista.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Fotos Adicionais */}
                    <div className="space-y-4">
                      <h5 className="text-md font-semibold text-gray-900 flex items-center">
                        <Camera className="w-5 h-5 mr-2 text-purple-600" />
                        Fotos Adicionais ({motorista.fotos?.length || 0})
                      </h5>

                      {motorista.fotos && motorista.fotos.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {motorista.fotos.map((foto, index) => (
                            <div
                              key={index}
                              className="relative group cursor-pointer"
                              onClick={() => window.open(foto, "_blank")}
                            >
                              <div className="aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-100 hover:border-blue-300 transition-all duration-200">
                                <Image
                                  src={foto}
                                  alt={`Foto ${index + 1} de ${motorista.nomeCompleto}`}
                                  fill
                                  className="object-cover object-center group-hover:scale-105 transition-transform duration-200"
                                  onError={(e) => {
                                    const element = e.target as HTMLImageElement;
                                    element.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Cpath d='M30,40 L70,40 L70,60 L30,60 Z' fill='%239ca3af'/%3E%3Ccircle cx='50' cy='30' r='10' fill='%239ca3af'/%3E%3C/svg%3E";
                                  }}
                                  sizes="100%"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center">
                          <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">
                            Nenhuma foto adicional disponível.
                          </p>
                        </div>
                      )}
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
                {motorista && (
                  <span>
                    Última atualização: {formatarData(motorista.dataAtualizacao)}
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
const EditarMotoristaModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  motorista: Motorista | null;
  onSuccess: () => void;
}> = ({ isOpen, onClose, motorista, onSuccess }) => {
  const [formData, setFormData] = useState<Partial<Motorista>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("basico");

  useEffect(() => {
    if (motorista && isOpen) {
      fetchMotoristaDetails();
    }
  }, [motorista, isOpen]);

  const fetchMotoristaDetails = async () => {
    if (!motorista?.motoristaId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getMotoristaDetail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ motoristaId: motorista.motoristaId }),
        }
      );

      const data = await response.json();
      console.log("Resposta para edição:", data);

      if (data.returnCode === 200 && data.data) {
        setFormData(data.data);
      } else {
        setError(data.returnMsg || "Erro ao carregar detalhes do motorista");
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
      setError("Erro ao carregar dados do motorista");
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

  const handleContactosChange = (field: keyof Motorista['contactos'], value: string) => {
  setFormData((prev) => {
    const currentContactos = prev.contactos || {
      telefonePrincipal: '',
      telefoneAlternativo: '',
      email: '',
    };
    
    return {
      ...prev,
      contactos: {
        ...currentContactos,
        [field]: value,
      },
    };
  });
};

  const handleCartaConducaoChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      cartaConducao: {
        ...prev.cartaConducao,
        [field]: value,
      } as any,
    }));
  };

  const handlePassaporteChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      passaporte: {
        ...prev.passaporte,
        [field]: value,
      } as Passaporte,
    }));
  };

  const handleEnderecoChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        [field]: value,
      } as any,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!motorista?.motoristaId) return;

    setSaving(true);
    setError(null);

    try {
      // Validar campos obrigatórios
      if (!formData.nomeCompleto || !formData.numeroBI || !formData.empresaMotorista) {
        throw new Error("Nome completo, BI e empresa são obrigatórios");
      }

      // Validar carta de condução
      if (!formData.cartaConducao?.numero || !formData.cartaConducao?.categoria || !formData.cartaConducao?.validade) {
        throw new Error("Carta de condução incompleta");
      }

      const updateData = {
        motoristaId: motorista.motoristaId,
        ...formData,
        dataAtualizacao: new Date().toISOString(),
      };

      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/updateMotorista",
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
        setError(data.returnMsg || "Erro ao atualizar motorista");
      }
    } catch (error: any) {
      console.error("Erro ao atualizar:", error);
      setError(error.message || "Erro ao atualizar motorista");
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
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Editar Motorista
                  </h3>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {motorista?.nomeCompleto}
                    </span>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm text-gray-600">
                      ID: {motorista?.motoristaId}
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
                <Users className="inline-block w-4 h-4 mr-2" />
                Informações Básicas
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
                onClick={() => setActiveTab("empresa")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "empresa"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Building className="inline-block w-4 h-4 mr-2" />
                Empresa
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            {loading ? (
              <div className="py-12 text-center">
                <Loader2 className="inline-block w-8 h-8 text-blue-600 animate-spin" />
                <p className="mt-2 text-gray-600">
                  Carregando dados do motorista...
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
                          value={formData.nomeCompleto || ""}
                          onChange={(e) =>
                            handleInputChange("nomeCompleto", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Data de Nascimento
                        </label>
                        <input
                          type="date"
                          value={
                            formData.dataNascimento
                              ? new Date(formData.dataNascimento).toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            handleInputChange("dataNascimento", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Nacionalidade
                        </label>
                        <input
                          type="text"
                          value={formData.nacionalidade || ""}
                          onChange={(e) =>
                            handleInputChange("nacionalidade", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          NUIT
                        </label>
                        <input
                          type="text"
                          value={formData.nuit || ""}
                          onChange={(e) => handleInputChange("nuit", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Cargo
                        </label>
                        <input
                          type="text"
                          value={formData.cargo || ""}
                          onChange={(e) => handleInputChange("cargo", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Data de Admissão
                        </label>
                        <input
                          type="date"
                          value={
                            formData.dataAdmissao
                              ? new Date(formData.dataAdmissao).toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            handleInputChange("dataAdmissao", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Status Contratual
                        </label>
                        <select
                          value={formData.statusContratual || ""}
                          onChange={(e) =>
                            handleInputChange("statusContratual", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          <option value="ativo">Ativo</option>
                          <option value="inativo">Inativo</option>
                          <option value="ferias">Férias</option>
                          <option value="licenca">Licença</option>
                          <option value="suspenso">Suspenso</option>
                        </select>
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
                          <option value="ferias">Férias</option>
                          <option value="licenca">Licença</option>
                          <option value="indisponivel">Indisponível</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Documentação */}
                {activeTab === "documentacao" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Documentação Pessoal
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Número do BI *
                        </label>
                        <input
                          type="text"
                          value={formData.numeroBI || ""}
                          onChange={(e) =>
                            handleInputChange("numeroBI", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Validade do BI *
                        </label>
                        <input
                          type="date"
                          value={
                            formData.validadeBI
                              ? new Date(formData.validadeBI).toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            handleInputChange("validadeBI", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Carta Condução - Número *
                        </label>
                        <input
                          type="text"
                          value={formData.cartaConducao?.numero || ""}
                          onChange={(e) =>
                            handleCartaConducaoChange("numero", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Carta Condução - Categoria *
                        </label>
                        <input
                          type="text"
                          value={formData.cartaConducao?.categoria || ""}
                          onChange={(e) =>
                            handleCartaConducaoChange("categoria", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Carta Condução - Validade *
                        </label>
                        <input
                          type="date"
                          value={
                            formData.cartaConducao?.validade
                              ? new Date(formData.cartaConducao.validade).toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            handleCartaConducaoChange("validade", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Carta Condução - Local de Emissão
                        </label>
                        <input
                          type="text"
                          value={formData.cartaConducao?.localEmissao || ""}
                          onChange={(e) =>
                            handleCartaConducaoChange("localEmissao", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    <h4 className="text-lg font-semibold text-gray-900 mt-6">
                      Passaporte (Opcional)
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Número do Passaporte
                        </label>
                        <input
                          type="text"
                          value={formData.passaporte?.numero || ""}
                          onChange={(e) =>
                            handlePassaporteChange("numero", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          País Emissor
                        </label>
                        <input
                          type="text"
                          value={formData.passaporte?.paisEmissor || ""}
                          onChange={(e) =>
                            handlePassaporteChange("paisEmissor", e.target.value)
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
                            formData.passaporte?.validade
                              ? new Date(formData.passaporte.validade).toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            handlePassaporteChange("validade", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Local de Emissão
                        </label>
                        <input
                          type="text"
                          value={formData.passaporte?.localEmissao || ""}
                          onChange={(e) =>
                            handlePassaporteChange("localEmissao", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Licença Profissional */}
                    <h4 className="text-lg font-semibold text-gray-900 mt-6">
                      Licença Profissional (Opcional)
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Número da Licença
                        </label>
                        <input
                          type="text"
                          value={formData.licencaProfissional?.numero || ""}
                          onChange={(e) =>
                            handleInputChange("licencaProfissional", {
                              ...formData.licencaProfissional,
                              numero: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Categoria
                        </label>
                        <input
                          type="text"
                          value={formData.licencaProfissional?.categoria || ""}
                          onChange={(e) =>
                            handleInputChange("licencaProfissional", {
                              ...formData.licencaProfissional,
                              categoria: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Validade
                        </label>
                        <input
                          type="date"
                          value={
                            formData.licencaProfissional?.validade
                              ? new Date(formData.licencaProfissional.validade).toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            handleInputChange("licencaProfissional", {
                              ...formData.licencaProfissional,
                              validade: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Contatos */}
                {activeTab === "contatos" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Informações de Contato
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Telefone Principal *
                        </label>
                        <input
                          type="text"
                          value={formData.contactos?.telefonePrincipal || ""}
                          onChange={(e) =>
                            handleContactosChange("telefonePrincipal", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Telefone Alternativo
                        </label>
                        <input
                          type="text"
                          value={formData.contactos?.telefoneAlternativo || ""}
                          onChange={(e) =>
                            handleContactosChange("telefoneAlternativo", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.contactos?.email || ""}
                          onChange={(e) =>
                            handleContactosChange("email", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    <h4 className="text-lg font-semibold text-gray-900 mt-6">
                      Contato de Emergência
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Nome
                        </label>
                        <input
                          type="text"
                          value={formData.contactos?.emergencia?.nome || ""}
                          onChange={(e) =>
                            handleInputChange("contactos", {
                              ...formData.contactos,
                              emergencia: {
                                ...formData.contactos?.emergencia,
                                nome: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Parentesco
                        </label>
                        <input
                          type="text"
                          value={formData.contactos?.emergencia?.parentesco || ""}
                          onChange={(e) =>
                            handleInputChange("contactos", {
                              ...formData.contactos,
                              emergencia: {
                                ...formData.contactos?.emergencia,
                                parentesco: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Telefone
                        </label>
                        <input
                          type="text"
                          value={formData.contactos?.emergencia?.telefone || ""}
                          onChange={(e) =>
                            handleInputChange("contactos", {
                              ...formData.contactos,
                              emergencia: {
                                ...formData.contactos?.emergencia,
                                telefone: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    <h4 className="text-lg font-semibold text-gray-900 mt-6">
                      Endereço
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Província
                        </label>
                        <input
                          type="text"
                          value={formData.endereco?.provincia || ""}
                          onChange={(e) =>
                            handleEnderecoChange("provincia", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Cidade
                        </label>
                        <input
                          type="text"
                          value={formData.endereco?.cidade || ""}
                          onChange={(e) =>
                            handleEnderecoChange("cidade", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Bairro
                        </label>
                        <input
                          type="text"
                          value={formData.endereco?.bairro || ""}
                          onChange={(e) =>
                            handleEnderecoChange("bairro", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Rua
                        </label>
                        <input
                          type="text"
                          value={formData.endereco?.rua || ""}
                          onChange={(e) =>
                            handleEnderecoChange("rua", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Número da Casa
                        </label>
                        <input
                          type="text"
                          value={formData.endereco?.numeroCasa || ""}
                          onChange={(e) =>
                            handleEnderecoChange("numeroCasa", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Empresa */}
                {activeTab === "empresa" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Empresa *
                        </label>
                        <input
                          type="text"
                          value={formData.empresaMotorista || ""}
                          onChange={(e) =>
                            handleInputChange("empresaMotorista", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          ID da Empresa *
                        </label>
                        <input
                          type="number"
                          value={formData.empresaMotoristaId || ""}
                          onChange={(e) =>
                            handleInputChange("empresaMotoristaId", parseInt(e.target.value))
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Total de Camiões (Transportador)
                        </label>
                        <input
                          type="number"
                          value={formData.infoTransportador?.totalCamioes || 0}
                          onChange={(e) =>
                            handleInputChange("infoTransportador", {
                              ...formData.infoTransportador,
                              totalCamioes: parseInt(e.target.value),
                            })
                          }
                          min="0"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Qualificado para Trânsito
                        </label>
                        <select
                          value={formData.infoTransportador?.qualificadoTransito ? "true" : "false"}
                          onChange={(e) =>
                            handleInputChange("infoTransportador", {
                              ...formData.infoTransportador,
                              qualificadoTransito: e.target.value === "true",
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          <option value="true">Sim</option>
                          <option value="false">Não</option>
                        </select>
                      </div>
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
                        placeholder="Observações importantes sobre o motorista..."
                      />
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
                {motorista?.dataCriacao && (
                  <span>
                    Cadastrado em:{" "}
                    {new Date(motorista.dataCriacao).toLocaleDateString("pt-MZ")}
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
const MotoristasList = () => {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [filtros, setFiltros] = useState({
    nomeCompleto: "",
    motoristaId: "",
    numeroBI: "",
    passaporte: "",
    empresaMotorista: "",
    status: "",
    statusContratual: "",
    nivelInspecao: "",
    qualificadoTransito: "",
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
  const [motoristaEditando, setMotoristaEditando] = useState<Motorista | null>(null);
  const [modalVisualizarAberto, setModalVisualizarAberto] = useState(false);
  const [motoristaVisualizando, setMotoristaVisualizando] = useState<number | null>(null);

  const carregarMotoristas = async (pagina = 1) => {
    setCarregando(true);
    try {
      const response = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/getMotoristaList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          curPage: pagina,
          pageSize: paginacao.pageSize,
          ...filtros,
        }),
      });

      const data = await response.json();

      if (data.returnCode === 200) {
        setMotoristas(data.data.list || []);
        setPaginacao((prev) => ({
          ...prev,
          curPage: pagina,
          totalCount: data.data.totalCount,
          totalPage: data.data.totalPage,
        }));
      }
    } catch (error) {
      console.error("Erro ao carregar motoristas:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarMotoristas();
  }, [filtros.status, filtros.statusContratual]);

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleLimparFiltros = () => {
    setFiltros({
      nomeCompleto: "",
      motoristaId: "",
      numeroBI: "",
      passaporte: "",
      empresaMotorista: "",
      status: "",
      statusContratual: "",
      nivelInspecao: "",
      qualificadoTransito: "",
    });
  };

  const handleExcluirMotorista = async (motoristaId: number) => {
    if (window.confirm("Tem certeza que deseja excluir este motorista?")) {
      try {
        const response = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/deleteMotorista", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ motoristaId }),
        });

        const data = await response.json();
        if (data.returnCode === 200) {
          carregarMotoristas(paginacao.curPage);
        }
      } catch (error) {
        console.error("Erro ao excluir motorista:", error);
      }
    }
  };

  // Funções para o modal
  const abrirModalEdicao = (motorista: Motorista) => {
    setMotoristaEditando(motorista);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setMotoristaEditando(null);
  };

  const handleEdicaoSucesso = () => {
    carregarMotoristas(paginacao.curPage);
  };

  // Funções para o modal de visualização
  const abrirModalVisualizacao = (motoristaId: number) => {
    setMotoristaVisualizando(motoristaId);
    setModalVisualizarAberto(true);
  };

  const fecharModalVisualizacao = () => {
    setModalVisualizarAberto(false);
    setMotoristaVisualizando(null);
  };

  const statusContratualCores: Record<string, string> = {
    ativo: "bg-green-100 text-green-800",
    inativo: "bg-gray-100 text-gray-800",
    ferias: "bg-blue-100 text-blue-800",
    licenca: "bg-yellow-100 text-yellow-800",
    suspenso: "bg-red-100 text-red-800",
  };

  const statusCores: Record<string, string> = {
    disponivel: "bg-green-100 text-green-800",
    em_viagem: "bg-blue-100 text-blue-800",
    ferias: "bg-purple-100 text-purple-800",
    licenca: "bg-yellow-100 text-yellow-800",
    indisponivel: "bg-red-100 text-red-800",
  };

  const nivelInspecaoCores: Record<string, string> = {
    A: "bg-yellow-100 text-yellow-800",
    B: "bg-blue-100 text-blue-800",
    C: "bg-green-100 text-green-800",
  };

  const formatarData = (dataString: string) => {
    return new Date(dataString).toLocaleDateString("pt-MZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const calcularIdade = (dataNascimento?: string) => {
    if (!dataNascimento) return null;
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const verificarDocumentosVencidos = (motorista: Motorista) => {
    const hoje = new Date();
    const vencidos = [];

    // Verificar BI
    if (motorista.validadeBI && new Date(motorista.validadeBI) < hoje) {
      vencidos.push("BI");
    }

    // Verificar carta condução
    if (motorista.cartaConducao.validade && new Date(motorista.cartaConducao.validade) < hoje) {
      vencidos.push("Carta Condução");
    }

    // Verificar passaporte
    if (motorista.passaporte?.validade && new Date(motorista.passaporte.validade) < hoje) {
      vencidos.push("Passaporte");
    }

    return vencidos;
  };

  const renderizarEstrelas = (avaliacao: number) => {
    const estrelas = [];
    for (let i = 1; i <= 5; i++) {
      estrelas.push(
        <span
          key={i}
          className={`text-sm ${
            i <= Math.round(avaliacao) ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      );
    }
    return estrelas;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gestão de Motoristas
              </h1>
              <p className="text-gray-600 mt-2">
                Gerencie motoristas profissionais e suas qualificações
              </p>
            </div>
          </div>

          {/* Cards Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Motoristas</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {paginacao.totalCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {motoristas.filter((m) => m.statusContratual === "ativo").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <Truck className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Qualificados Trânsito</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {motoristas.filter((m) => m.infoTransportador?.qualificadoTransito).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-red-100 p-3 rounded-lg mr-4">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Documentos Vencidos</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {motoristas.filter((m) => verificarDocumentosVencidos(m).length > 0).length}
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={filtros.nomeCompleto}
                  onChange={(e) => handleFiltroChange("nomeCompleto", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Buscar por nome..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número BI
                </label>
                <input
                  type="text"
                  value={filtros.numeroBI}
                  onChange={(e) => handleFiltroChange("numeroBI", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Número do BI"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passaporte
                </label>
                <input
                  type="text"
                  value={filtros.passaporte}
                  onChange={(e) => handleFiltroChange("passaporte", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Número do passaporte"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status Contratual
                </label>
                <select
                  value={filtros.statusContratual}
                  onChange={(e) => handleFiltroChange("statusContratual", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todos</option>
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                  <option value="ferias">Férias</option>
                  <option value="licenca">Licença</option>
                  <option value="suspenso">Suspenso</option>
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
                  <option value="disponivel">Disponível</option>
                  <option value="em_viagem">Em Viagem</option>
                  <option value="ferias">Férias</option>
                  <option value="licenca">Licença</option>
                  <option value="indisponivel">Indisponível</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  value={filtros.empresaMotorista}
                  onChange={(e) => handleFiltroChange("empresaMotorista", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Empresa do motorista"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nível Inspeção Veículo
                </label>
                <select
                  value={filtros.nivelInspecao}
                  onChange={(e) => handleFiltroChange("nivelInspecao", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todos</option>
                  <option value="A">A - Chanté</option>
                  <option value="B">B - Nacional</option>
                  <option value="C">C - Trânsito</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qualificado Trânsito
                </label>
                <select
                  value={filtros.qualificadoTransito}
                  onChange={(e) => handleFiltroChange("qualificadoTransito", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todos</option>
                  <option value="true">Sim</option>
                  <option value="false">Não</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Motorista
                </label>
                <input
                  type="text"
                  value={filtros.motoristaId}
                  onChange={(e) => handleFiltroChange("motoristaId", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ID do motorista"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => carregarMotoristas(1)}
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
              Lista de Motoristas ({paginacao.totalCount})
            </h2>
            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </button>
          </div>

          {carregando ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Carregando motoristas...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Motorista
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Documentos
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Empresa & Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Veículos & Inspeção
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avaliação
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estatísticas
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {motoristas.map((motorista) => {
                      const documentosVencidos = verificarDocumentosVencidos(motorista);
                      const idade = calcularIdade(motorista.dataNascimento);
                      
                      return (
                        <tr key={motorista.motoristaId} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-blue-600">
                              #{motorista.motoristaId}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {motorista.nomeCompleto}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                {motorista.contactos.telefonePrincipal}
                              </div>
                              <div className="text-sm text-gray-500">
                                BI: {motorista.numeroBI}
                                {motorista.passaporte?.numero && (
                                  <span className="ml-2">| Pass: {motorista.passaporte.numero}</span>
                                )}
                              </div>
                              {idade && (
                                <div className="text-xs text-gray-500">
                                  {idade} anos | {motorista.nacionalidade}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="text-sm">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  new Date(motorista.cartaConducao.validade) > new Date()
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}>
                                  Carta: {motorista.cartaConducao.categoria}
                                </span>
                              </div>
                              <div className="text-xs text-gray-600">
                                Válido até: {formatarData(motorista.cartaConducao.validade)}
                              </div>
                              {documentosVencidos.length > 0 && (
                                <div className="flex items-center text-xs text-red-600">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  {documentosVencidos.length} vencido(s)
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <div className="text-sm font-medium text-gray-900">
                                {motorista.empresaMotorista}
                              </div>
                              <div className="flex flex-wrap gap-1">
                                <span
                                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    statusContratualCores[motorista.statusContratual]
                                  }`}
                                >
                                  {motorista.statusContratual}
                                </span>
                                <span
                                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    statusCores[motorista.status]
                                  }`}
                                >
                                  {motorista.status}
                                </span>
                              </div>
                              {motorista.infoTransportador?.qualificadoTransito && (
                                <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                                  <Truck className="h-3 w-3 mr-1" />
                                  Qualificado Trânsito
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="text-sm font-medium text-gray-900">
                                {motorista.veiculosHabilitados?.length || 0} veículo(s)
                              </div>
                              {motorista.veiculosHabilitados?.[0] && (
                                <>
                                  <div className="text-xs text-gray-600">
                                    {motorista.veiculosHabilitados[0].matricula}
                                  </div>
                                  <span
                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                      nivelInspecaoCores[motorista.veiculosHabilitados[0].nivelInspecao?.categoria] || "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {motorista.veiculosHabilitados[0].nivelInspecao?.categoria}
                                  </span>
                                  <div className="text-xs text-gray-500">
                                    Próx. inspeção: {formatarData(motorista.veiculosHabilitados[0].nivelInspecao.dataProximaInspecao)}
                                  </div>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center">
                                {renderizarEstrelas(motorista.avaliacaoGeral)}
                                <span className="ml-2 text-sm text-gray-700">
                                  ({motorista.avaliacaoGeral.toFixed(1)})
                                </span>
                              </div>
                              <div className="text-xs text-gray-600">
                                {motorista.totalViagensRealizadas} viagens
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="text-sm">
                                <div className="font-medium text-gray-900">
                                  {motorista.totalKmPercorridos.toLocaleString()} km
                                </div>
                                <div className="text-xs text-gray-500">
                                  Acidentes: {motorista.indiceAcidentes}% | Multas: {motorista.indiceMultas}%
                                </div>
                              </div>
                              {motorista.infoTransportador && (
                                <div className="text-xs text-gray-600">
                                  Camionista: {motorista.infoTransportador.totalCamioes} camiões
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex flex-col space-y-2">
                              <button
                                onClick={() => abrirModalVisualizacao(motorista.motoristaId)}
                                className="flex items-center justify-center text-blue-600 hover:text-blue-900 p-1 transition-colors"
                                title="Visualizar"
                              >
                                <Eye className="h-4 w-4" />
                                <span className="ml-1 text-xs">Visualizar</span>
                              </button>
                              <button
                                onClick={() => abrirModalEdicao(motorista)}
                                className="flex items-center justify-center text-green-600 hover:text-green-900 p-1 transition-colors"
                                title="Editar"
                              >
                                <Edit className="h-4 w-4" />
                                <span className="ml-1 text-xs">Editar</span>
                              </button>
                              <button
                                onClick={() => handleExcluirMotorista(motorista.motoristaId)}
                                className="flex items-center justify-center text-red-600 hover:text-red-900 p-1"
                                title="Excluir"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="ml-1 text-xs">Excluir</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Paginação */}
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Mostrando {motoristas.length} de {paginacao.totalCount} motoristas
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => carregarMotoristas(paginacao.curPage - 1)}
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
                            onClick={() => carregarMotoristas(pageNum)}
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
                      onClick={() => carregarMotoristas(paginacao.curPage + 1)}
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
              <EditarMotoristaModal
                isOpen={modalAberto}
                onClose={fecharModal}
                motorista={motoristaEditando}
                onSuccess={handleEdicaoSucesso}
              />
              <VisualizarMotoristaModal
                isOpen={modalVisualizarAberto}
                onClose={fecharModalVisualizacao}
                motoristaId={motoristaVisualizando}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MotoristasList;