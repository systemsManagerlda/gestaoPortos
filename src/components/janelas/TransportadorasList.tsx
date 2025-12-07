/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// TransportadorasList.tsx
import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Truck,
  Edit,
  Eye,
  Trash2,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Shield,
  MapPin,
  Phone,
  Mail,
  X,
  Save,
  Loader2,
  User,
  CreditCard,
  FileText,
  Tag,
  Building,
  Award,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  Star,
  BarChart3,
  Activity,
  Printer,
  CalendarDays,
  Package,
  History,
} from "lucide-react";

interface Transportadora {
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
  documentos?: {
    alvara?: {
      numero?: string;
      dataEmissao?: string;
      dataValidade?: string;
    };
    registoComercial?: {
      numero?: string;
      dataRegisto?: string;
    };
    certificadoRegisto?: {
      numero?: string;
      dataEmissao?: string;
    };
  };
  tipoServicos: string[];
  capacidadeTotal: {
    totalCamioes: number;
    totalMotoristas: number;
    tonelagemMaxima?: number;
  };
  avaliacaoGeral: number;
  status: "ativa" | "inativa" | "suspensa" | "pendente";
  dataCriacao: string;
  dataAtualizacao: string;
  qualificadaTransito?: boolean;
  servicosPermitidos?: string[];
  observacoes?: string;
}

// Componente Modal de Visualização
const VisualizarTransportadoraModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  transportadoraId: number | null;
}> = ({ isOpen, onClose, transportadoraId }) => {
  const [transportadora, setTransportadora] = useState<Transportadora | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("geral");

  useEffect(() => {
    if (isOpen && transportadoraId) {
      fetchTransportadoraDetails();
    } else {
      setTransportadora(null);
    }
  }, [isOpen, transportadoraId]);

  const fetchTransportadoraDetails = async () => {
    if (!transportadoraId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getTransportadoraDetail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transportadoraId }),
        }
      );

      const data = await response.json();

      if (data.returnCode === 200) {
        setTransportadora(data.data);
      } else {
        setError("Erro ao carregar detalhes da transportadora");
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
      setError("Erro ao carregar dados da transportadora");
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativa":
        return "bg-green-100 text-green-800";
      case "inativa":
        return "bg-gray-100 text-gray-800";
      case "suspensa":
        return "bg-yellow-100 text-yellow-800";
      case "pendente":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTipoServicoColor = (servico: string) => {
    switch (servico) {
      case "chante":
        return "bg-purple-100 text-purple-800";
      case "nacional":
        return "bg-blue-100 text-blue-800";
      case "transito":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatarMoeda = (valor?: number) => {
    if (!valor) return "MZN 0,00";
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
    }).format(valor);
  };

  const renderizarEstrelas = (avaliacao: number) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-5 h-5 ${
          star <= Math.round(avaliacao)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">

        {/* Modal Container */}
        <div className="inline-block w-full max-w-6xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-xl shadow-2xl">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {transportadora?.nomeEmpresa || "Carregando..."}
                  </h3>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      #{transportadora?.transportadoraId}
                    </span>
                    {transportadora && (
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          transportadora.status
                        )}`}
                      >
                        {transportadora.status.charAt(0).toUpperCase() +
                          transportadora.status.slice(1)}
                      </span>
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
                onClick={() => setActiveTab("contato")}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "contato"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Phone className="inline-block w-4 h-4 mr-2" />
                Contato
              </button>
              <button
                onClick={() => setActiveTab("operacional")}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "operacional"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Activity className="inline-block w-4 h-4 mr-2" />
                Operacional
              </button>
              <button
                onClick={() => setActiveTab("documentos")}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "documentos"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FileText className="inline-block w-4 h-4 mr-2" />
                Documentos
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            {loading ? (
              <div className="py-12 text-center">
                <Loader2 className="inline-block w-8 h-8 text-blue-600 animate-spin" />
                <p className="mt-2 text-gray-600">
                  Carregando detalhes da transportadora...
                </p>
              </div>
            ) : error ? (
              <div className="py-8 text-center">
                <AlertCircle className="inline-block w-12 h-12 text-red-400" />
                <p className="mt-2 text-gray-700">{error}</p>
                <button
                  onClick={fetchTransportadoraDetails}
                  className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  Tentar novamente
                </button>
              </div>
            ) : !transportadora ? (
              <div className="py-8 text-center">
                <Truck className="inline-block w-12 h-12 text-gray-400" />
                <p className="mt-2 text-gray-600">Transportadora não encontrada</p>
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
                            <Building className="w-5 h-5 mr-2 text-blue-600" />
                            Informações da Empresa
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Nome da Empresa
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {transportadora.nomeEmpresa}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                NUIT
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {transportadora.nif}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Email Principal
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {transportadora.email}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Website
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {transportadora.website || "Não informado"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Localização */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <MapPin className="w-5 h-5 mr-2 text-green-600" />
                            Localização
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Endereço
                              </p>
                              <p className="text-gray-900">
                                {transportadora.endereco.rua}, {transportadora.endereco.numero}
                              </p>
                              <p className="text-sm text-gray-600">
                                {transportadora.endereco.bairro}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Cidade / Província
                              </p>
                              <p className="text-gray-900">
                                {transportadora.endereco.cidade}, {transportadora.endereco.provincia}
                              </p>
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
                                Avaliação Geral
                              </p>
                              <div className="flex items-center mt-1">
                                <div className="flex">
                                  {renderizarEstrelas(transportadora.avaliacaoGeral)}
                                </div>
                                <span className="ml-2 text-sm font-semibold text-gray-900">
                                  {transportadora.avaliacaoGeral.toFixed(1)}
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Qualificada para Trânsito
                              </p>
                              <div className="flex items-center mt-1">
                                {transportadora.qualificadaTransito ? (
                                  <>
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="ml-2 text-green-700 font-medium">
                                      Sim
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <AlertCircle className="w-5 h-5 text-gray-400" />
                                    <span className="ml-2 text-gray-600">
                                      Não
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Data de Cadastro
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {formatarData(transportadora.dataCriacao)}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Última Atualização
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {formatarData(transportadora.dataAtualizacao)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Contato */}
                {activeTab === "contato" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Informações de Contato
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Phone className="w-5 h-5 mr-2 text-blue-600" />
                          Contatos Telefônicos
                        </h5>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Telefone Principal
                            </p>
                            <p className="text-gray-900">
                              {transportadora.contactos.telefonePrincipal}
                            </p>
                          </div>
                          {transportadora.contactos.telefoneAlternativo && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Telefone Alternativo
                              </p>
                              <p className="text-gray-900">
                                {transportadora.contactos.telefoneAlternativo}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Mail className="w-5 h-5 mr-2 text-green-600" />
                          Contatos Eletrônicos
                        </h5>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Email Principal
                            </p>
                            <a
                              href={`mailto:${transportadora.email}`}
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {transportadora.email}
                            </a>
                          </div>
                          {transportadora.contactos.emailComercial && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Email Comercial
                              </p>
                              <a
                                href={`mailto:${transportadora.contactos.emailComercial}`}
                                className="text-blue-600 hover:text-blue-800 hover:underline"
                              >
                                {transportadora.contactos.emailComercial}
                              </a>
                            </div>
                          )}
                          {transportadora.website && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Website
                              </p>
                              <a
                                href={transportadora.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 hover:underline"
                              >
                                {transportadora.website}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Operacional */}
                {activeTab === "operacional" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Informações Operacionais
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Capacidade */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Truck className="w-5 h-5 mr-2 text-blue-600" />
                          Capacidade
                        </h5>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Total de Camiões
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              {transportadora.capacidadeTotal.totalCamioes}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Total de Motoristas
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              {transportadora.capacidadeTotal.totalMotoristas}
                            </p>
                          </div>
                          {transportadora.capacidadeTotal.tonelagemMaxima && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Tonelagem Máxima
                              </p>
                              <p className="text-lg font-bold text-gray-900">
                                {transportadora.capacidadeTotal.tonelagemMaxima} ton
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Serviços */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Package className="w-5 h-5 mr-2 text-green-600" />
                          Serviços Oferecidos
                        </h5>
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-2">
                            {transportadora.tipoServicos.map((servico) => (
                              <span
                                key={servico}
                                className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getTipoServicoColor(
                                  servico
                                )}`}
                              >
                                {servico.charAt(0).toUpperCase() + servico.slice(1)}
                              </span>
                            ))}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Serviços Permitidos
                            </p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {transportadora.servicosPermitidos?.map((servico) => (
                                <span
                                  key={servico}
                                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded"
                                >
                                  {servico}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Status e Qualificação */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Award className="w-5 h-5 mr-2 text-yellow-600" />
                          Status e Qualificação
                        </h5>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Status
                            </p>
                            <span
                              className={`mt-1 inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                                transportadora.status
                              )}`}
                            >
                              {transportadora.status.charAt(0).toUpperCase() +
                                transportadora.status.slice(1)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Qualificada para Trânsito
                            </p>
                            <div className="flex items-center mt-1">
                              {transportadora.qualificadaTransito ? (
                                <>
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                  <span className="ml-2 text-green-700 font-medium">
                                    Sim (Mínimo 3 camiões)
                                  </span>
                                </>
                              ) : (
                                <>
                                  <AlertCircle className="w-5 h-5 text-gray-400" />
                                  <span className="ml-2 text-gray-600">
                                    Não (Requer 3+ camiões)
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Documentos */}
                {activeTab === "documentos" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Documentação Legal
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Alvará */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <FileText className="w-5 h-5 mr-2 text-blue-600" />
                          Alvará
                        </h5>
                        {transportadora.documentos?.alvara ? (
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Número
                              </p>
                              <p className="text-gray-900">
                                {transportadora.documentos.alvara.numero}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Data de Emissão
                              </p>
                              <p className="text-gray-900">
                                {formatarData(transportadora.documentos.alvara.dataEmissao)}
                              </p>
                            </div>
                            {transportadora.documentos.alvara.dataValidade && (
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Data de Validade
                                </p>
                                <p className="text-gray-900">
                                  {formatarData(transportadora.documentos.alvara.dataValidade)}
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">Não registrado</p>
                        )}
                      </div>

                      {/* Registo Comercial */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Building className="w-5 h-5 mr-2 text-green-600" />
                          Registo Comercial
                        </h5>
                        {transportadora.documentos?.registoComercial ? (
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Número
                              </p>
                              <p className="text-gray-900">
                                {transportadora.documentos.registoComercial.numero}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Data de Registo
                              </p>
                              <p className="text-gray-900">
                                {formatarData(transportadora.documentos.registoComercial.dataRegisto)}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">Não registrado</p>
                        )}
                      </div>

                      {/* Certificado de Registo */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Award className="w-5 h-5 mr-2 text-yellow-600" />
                          Certificado de Registo
                        </h5>
                        {transportadora.documentos?.certificadoRegisto ? (
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Número
                              </p>
                              <p className="text-gray-900">
                                {transportadora.documentos.certificadoRegisto.numero}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Data de Emissão
                              </p>
                              <p className="text-gray-900">
                                {formatarData(transportadora.documentos.certificadoRegisto.dataEmissao)}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">Não registrado</p>
                        )}
                      </div>
                    </div>

                    {/* Observações */}
                    {transportadora.observacoes && (
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <FileText className="w-5 h-5 mr-2 text-gray-600" />
                          Observações
                        </h5>
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {transportadora.observacoes}
                        </p>
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
                {transportadora && (
                  <span>
                    Última atualização:{" "}
                    {formatarData(transportadora.dataAtualizacao)}
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
const EditarTransportadoraModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  transportadora: Transportadora | null;
  onSuccess: () => void;
}> = ({ isOpen, onClose, transportadora, onSuccess }) => {
  const [formData, setFormData] = useState<Partial<Transportadora>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("basico");

  useEffect(() => {
    if (transportadora && isOpen) {
      fetchTransportadoraDetails();
    }
  }, [transportadora, isOpen]);

  const fetchTransportadoraDetails = async () => {
    if (!transportadora?.transportadoraId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getTransportadoraDetail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transportadoraId: transportadora.transportadoraId }),
        }
      );

      const data = await response.json();

      if (data.returnCode === 200) {
        setFormData(data.data);
      } else {
        setError("Erro ao carregar detalhes da transportadora");
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
      setError("Erro ao carregar dados da transportadora");
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

  const handleContactoChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      contactos: {
        ...prev.contactos,
        [field]: value,
      } as Transportadora["contactos"],
    }));
  };

  const handleEnderecoChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        [field]: value,
      } as Transportadora["endereco"],
    }));
  };

  const handleCapacidadeChange = (field: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      capacidadeTotal: {
        ...prev.capacidadeTotal,
        [field]: value,
      } as Transportadora["capacidadeTotal"],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transportadora?.nif) return;

    setSaving(true);
    setError(null);

    try {
      const updateData = {
        nif: transportadora.nif,
        ...formData,
        dataAtualizacao: new Date().toISOString(),
      };

      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/updateTransportadora",
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
        setError(data.returnMsg || "Erro ao atualizar transportadora");
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      setError("Erro ao atualizar transportadora");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">

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
                    Editar Transportadora
                  </h3>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      #{transportadora?.transportadoraId}
                    </span>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm text-gray-600">
                      {transportadora?.nomeEmpresa}
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
                <Building className="inline-block w-4 h-4 mr-2" />
                Informações Básicas
              </button>
              <button
                onClick={() => setActiveTab("contato")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "contato"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Phone className="inline-block w-4 h-4 mr-2" />
                Contato
              </button>
              <button
                onClick={() => setActiveTab("capacidade")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "capacidade"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Truck className="inline-block w-4 h-4 mr-2" />
                Capacidade
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
                  Carregando dados da transportadora...
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
                          Nome da Empresa *
                        </label>
                        <input
                          type="text"
                          value={formData.nomeEmpresa || ""}
                          onChange={(e) =>
                            handleInputChange("nomeEmpresa", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={formData.email || ""}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Website
                        </label>
                        <input
                          type="text"
                          value={formData.website || ""}
                          onChange={(e) =>
                            handleInputChange("website", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="https://www.exemplo.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Status *
                        </label>
                        <select
                          value={formData.status || ""}
                          onChange={(e) =>
                            handleInputChange("status", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        >
                          <option value="">Selecione...</option>
                          <option value="ativa">Ativa</option>
                          <option value="inativa">Inativa</option>
                          <option value="suspensa">Suspensa</option>
                          <option value="pendente">Pendente</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Tipos de Serviços *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {["chante", "nacional", "transito"].map((servico) => (
                          <label
                            key={servico}
                            className="inline-flex items-center"
                          >
                            <input
                              type="checkbox"
                              checked={formData.tipoServicos?.includes(servico) || false}
                              onChange={(e) => {
                                const current = formData.tipoServicos || [];
                                const newServicos = e.target.checked
                                  ? [...current, servico]
                                  : current.filter((s) => s !== servico);
                                handleInputChange("tipoServicos", newServicos);
                              }}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              {servico.charAt(0).toUpperCase() + servico.slice(1)}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Contato */}
                {activeTab === "contato" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Informações de Contato
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Telefone Principal *
                        </label>
                        <input
                          type="tel"
                          value={formData.contactos?.telefonePrincipal || ""}
                          onChange={(e) =>
                            handleContactoChange("telefonePrincipal", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          placeholder="+258 XX XXX XXXX"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Telefone Alternativo
                        </label>
                        <input
                          type="tel"
                          value={formData.contactos?.telefoneAlternativo || ""}
                          onChange={(e) =>
                            handleContactoChange("telefoneAlternativo", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="+258 XX XXX XXXX"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Comercial
                        </label>
                        <input
                          type="email"
                          value={formData.contactos?.emailComercial || ""}
                          onChange={(e) =>
                            handleContactoChange("emailComercial", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="comercial@empresa.com"
                        />
                      </div>
                    </div>

                    <div>
                      <h5 className="text-md font-semibold text-gray-900 mb-3">
                        Endereço
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Província *
                          </label>
                          <input
                            type="text"
                            value={formData.endereco?.provincia || ""}
                            onChange={(e) =>
                              handleEnderecoChange("provincia", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cidade *
                          </label>
                          <input
                            type="text"
                            value={formData.endereco?.cidade || ""}
                            onChange={(e) =>
                              handleEnderecoChange("cidade", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bairro *
                          </label>
                          <input
                            type="text"
                            value={formData.endereco?.bairro || ""}
                            onChange={(e) =>
                              handleEnderecoChange("bairro", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rua *
                          </label>
                          <input
                            type="text"
                            value={formData.endereco?.rua || ""}
                            onChange={(e) =>
                              handleEnderecoChange("rua", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Número
                          </label>
                          <input
                            type="text"
                            value={formData.endereco?.numero || ""}
                            onChange={(e) =>
                              handleEnderecoChange("numero", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Capacidade */}
                {activeTab === "capacidade" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Capacidade Operacional
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Total de Camiões *
                        </label>
                        <input
                          type="number"
                          value={formData.capacidadeTotal?.totalCamioes || 0}
                          onChange={(e) =>
                            handleCapacidadeChange("totalCamioes", parseInt(e.target.value))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Total de Motoristas *
                        </label>
                        <input
                          type="number"
                          value={formData.capacidadeTotal?.totalMotoristas || 0}
                          onChange={(e) =>
                            handleCapacidadeChange("totalMotoristas", parseInt(e.target.value))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tonelagem Máxima (ton)
                        </label>
                        <input
                          type="number"
                          value={formData.capacidadeTotal?.tonelagemMaxima || ""}
                          onChange={(e) =>
                            handleCapacidadeChange("tonelagemMaxima", parseFloat(e.target.value))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Avaliação Geral
                      </label>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleInputChange("avaliacaoGeral", star)}
                            className={`text-2xl ${
                              star <= (formData.avaliacaoGeral || 0)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            } hover:text-yellow-400 transition-colors`}
                          >
                            ★
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {formData.avaliacaoGeral || 0}/5
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Outros */}
                {activeTab === "outros" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Observações
                      </label>
                      <textarea
                        value={formData.observacoes || ""}
                        onChange={(e) =>
                          handleInputChange("observacoes", e.target.value)
                        }
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Observações importantes sobre a transportadora..."
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
                {transportadora?.dataCriacao && (
                  <span>
                    Cadastrada em:{" "}
                    {new Date(transportadora.dataCriacao).toLocaleDateString("pt-MZ")}
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

const TransportadorasList = () => {
  const [transportadoras, setTransportadoras] = useState<Transportadora[]>([]);
  const [filtros, setFiltros] = useState({
    nomeEmpresa: "",
    transportadoraId: "",
    nif: "",
    status: "",
    provincia: "",
    email: "",
  });
  const [paginacao, setPaginacao] = useState({
    curPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPage: 0,
  });
  const [carregando, setCarregando] = useState(false);
  
  // Estados para os modais
  const [modalAberto, setModalAberto] = useState(false);
  const [transportadoraEditando, setTransportadoraEditando] = useState<Transportadora | null>(null);
  const [modalVisualizarAberto, setModalVisualizarAberto] = useState(false);
  const [transportadoraVisualizando, setTransportadoraVisualizando] = useState<number | null>(null);

  const carregarTransportadoras = async (pagina = 1) => {
    setCarregando(true);
    try {
      const response = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/getTransportadoraList", {
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
        setTransportadoras(data.data.list || []);
        setPaginacao((prev) => ({
          ...prev,
          curPage: pagina,
          totalCount: data.data.totalCount,
          totalPage: data.data.totalPage,
        }));
      }
    } catch (error) {
      console.error("Erro ao carregar transportadoras:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarTransportadoras();
  }, [filtros.status]);

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleLimparFiltros = () => {
    setFiltros({
      nomeEmpresa: "",
      transportadoraId: "",
      nif: "",
      status: "",
      provincia: "",
      email: "",
    });
  };

  const handleExcluirTransportadora = async (transportadoraId: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta transportadora?")) {
      try {
        const response = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/deleteTransportadora", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transportadoraId }),
        });

        const data = await response.json();
        if (data.returnCode === 200) {
          carregarTransportadoras(paginacao.curPage);
        }
      } catch (error) {
        console.error("Erro ao excluir transportadora:", error);
      }
    }
  };

  // Funções para o modal de edição
  const abrirModalEdicao = (transportadora: Transportadora) => {
    setTransportadoraEditando(transportadora);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setTransportadoraEditando(null);
  };

  const handleEdicaoSucesso = () => {
    carregarTransportadoras(paginacao.curPage);
  };

  // Funções para o modal de visualização
  const abrirModalVisualizacao = (transportadoraId: number) => {
    setTransportadoraVisualizando(transportadoraId);
    setModalVisualizarAberto(true);
  };

  const fecharModalVisualizacao = () => {
    setModalVisualizarAberto(false);
    setTransportadoraVisualizando(null);
  };

  const statusCores: Record<string, string> = {
    ativa: "bg-green-100 text-green-800",
    inativa: "bg-gray-100 text-gray-800",
    suspensa: "bg-yellow-100 text-yellow-800",
    pendente: "bg-blue-100 text-blue-800",
  };

  const tipoServicoCores: Record<string, string> = {
    chante: "bg-purple-100 text-purple-800",
    nacional: "bg-blue-100 text-blue-800",
    transito: "bg-orange-100 text-orange-800",
  };

  const formatarData = (dataString: string) => {
    return new Date(dataString).toLocaleDateString("pt-MZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const renderizarEstrelas = (avaliacao: number) => {
    return [1, 2, 3, 4, 5].map((i) => (
      <span
        key={i}
        className={`text-lg ${i <= Math.round(avaliacao) ? "text-yellow-400" : "text-gray-300"}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gestão de Transportadoras
              </h1>
              <p className="text-gray-600 mt-2">
                Gerencie transportadoras cadastradas no sistema
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
                  <p className="text-sm text-gray-600">Total Transportadoras</p>
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
                  <p className="text-sm text-gray-600">Ativas</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {transportadoras.filter((t) => t.status === "ativa").length}
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
                  <p className="text-sm text-gray-600">Qualificadas Trânsito</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {transportadoras.filter((t) => t.capacidadeTotal.totalCamioes >= 3).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Províncias Únicas</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Array.from(new Set(transportadoras.map((t) => t.endereco.provincia))).length}
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
                  Nome da Empresa
                </label>
                <input
                  type="text"
                  value={filtros.nomeEmpresa}
                  onChange={(e) => handleFiltroChange("nomeEmpresa", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Buscar por nome..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NUIT
                </label>
                <input
                  type="text"
                  value={filtros.nif}
                  onChange={(e) => handleFiltroChange("nif", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Número do NUIT"
                />
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
                  <option value="ativa">Ativa</option>
                  <option value="inativa">Inativa</option>
                  <option value="suspensa">Suspensa</option>
                  <option value="pendente">Pendente</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Transportadora
                </label>
                <input
                  type="text"
                  value={filtros.transportadoraId}
                  onChange={(e) => handleFiltroChange("transportadoraId", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ID da transportadora"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Província
                </label>
                <input
                  type="text"
                  value={filtros.provincia}
                  onChange={(e) => handleFiltroChange("provincia", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Província"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={filtros.email}
                  onChange={(e) => handleFiltroChange("email", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => carregarTransportadoras(1)}
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
              Lista de Transportadoras ({paginacao.totalCount})
            </h2>
            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </button>
          </div>

          {carregando ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Carregando transportadoras...</p>
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
                        Empresa
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Localização
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Serviços
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Capacidade
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avaliação
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
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
                    {transportadoras.map((transportadora) => (
                      <tr key={transportadora.transportadoraId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-blue-600">
                            #{transportadora.transportadoraId}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {transportadora.nomeEmpresa}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {transportadora.email}
                            </div>
                            <div className="text-sm text-gray-500">
                              NUIT: {transportadora.nif}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {transportadora.endereco.provincia}
                          </div>
                          <div className="text-sm text-gray-500">
                            {transportadora.endereco.cidade}, {transportadora.endereco.bairro}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {transportadora.tipoServicos.map((servico) => (
                              <span
                                key={servico}
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  tipoServicoCores[servico] || "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {servico}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">
                              {transportadora.capacidadeTotal.totalCamioes} camiões
                            </div>
                            <div className="text-gray-500">
                              {transportadora.capacidadeTotal.totalMotoristas} motoristas
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex mr-2">
                              {renderizarEstrelas(transportadora.avaliacaoGeral)}
                            </div>
                            <span className="text-sm text-gray-700">
                              ({transportadora.avaliacaoGeral.toFixed(1)})
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              statusCores[transportadora.status]
                            }`}
                          >
                            {transportadora.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatarData(transportadora.dataCriacao)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex flex-col items-center space-y-2">
                            <button
                              onClick={() => abrirModalVisualizacao(transportadora.transportadoraId)}
                              className="text-blue-600 hover:text-blue-900 p-1 transition-colors"
                              title="Visualizar"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => abrirModalEdicao(transportadora)}
                              className="text-green-600 hover:text-green-900 p-1 transition-colors"
                              title="Editar"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleExcluirTransportadora(transportadora.transportadoraId)}
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
                    Mostrando {transportadoras.length} de {paginacao.totalCount} transportadoras
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => carregarTransportadoras(paginacao.curPage - 1)}
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
                            onClick={() => carregarTransportadoras(pageNum)}
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
                      onClick={() => carregarTransportadoras(paginacao.curPage + 1)}
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
            </>
          )}
        </div>

        {/* Modais */}
        <EditarTransportadoraModal
          isOpen={modalAberto}
          onClose={fecharModal}
          transportadora={transportadoraEditando}
          onSuccess={handleEdicaoSucesso}
        />
        
        <VisualizarTransportadoraModal
          isOpen={modalVisualizarAberto}
          onClose={fecharModalVisualizacao}
          transportadoraId={transportadoraVisualizando}
        />
      </div>
    </div>
  );
};

export default TransportadorasList;