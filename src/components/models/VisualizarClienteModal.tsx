// components/VisualizarClienteModal.tsx
import React, { useState, useEffect } from 'react';

// Tipos
interface Contato {
  nome?: string;
  cargo?: string;
  email?: string;
  telefone?: string;
  departamento?: string;
  observacoes?: string;
  principal?: boolean;
}

interface Endereco {
  rua?: string;
  bairro?: string;
  cidade?: string;
  provincia?: string;
  codigoPostal?: string;
  pais?: string;
  pontoReferencia?: string;
}

interface Viagem {
  viagemId: string;
  numeroViagem: string;
  cargaDescricao: string;
  origem: string;
  destino: string;
  status: string;
  dataPartida: string;
  dataEntrega?: string;
  valorFrete: number;
  motorista: string;
}

interface Motorista {
  nome: string;
  empresaMotorista: string;
  avaliacao?: number;
}

interface Reclamacao {
  data: string;
  tipo: string;
  descricao: string;
  severidade: string;
  status: string;
  viagemId: string;
}

interface Comportamento {
  pontualidadePagamentos?: number;
  cumprimentoInstrucoes?: number;
  frequenciaReclamacoes?: number;
  dataUltimaReclamacao?: string;
  historicoReclamacoes?: Reclamacao[];
}

interface Interacao {
  data: string;
  tipo: string;
  descricao: string;
  responsavel: string;
  resultado?: string;
}

interface Feedback {
  data: string;
  pontuacao: number;
  observacao: string;
  avaliador: string;
}

interface Metricas {
  totalViagens?: number;
  viagensConcluidas?: number;
  viagensPendentes?: number;
  valorTotalFretes?: number;
  mediaMensalFretes?: number;
  indiceSatisfacao?: number;
  ultimaViagemData?: string;
}

interface Cliente {
  codigo: string;
  nome: string;
  nomeEmpresa?: string;
  nuit: string;
  tipoPessoa: string;
  dataCadastro: string;
  segmento?: string;
  subsegmento?: string;
  classificacao: string;
  avaliacao?: number;
  status: string;
  prioridadeAtendimento?: string;
  categoria: string;
  vendedorResponsavel?: string;
  canalCaptacao?: string;
  dataUltimaCompra?: string;
  dataProximoContato?: string;
  tags?: string[];
  observacoes?: string;
  contatos?: Contato[];
  enderecoCobranca?: Endereco;
  enderecoEntregaPadrao?: Endereco;
  limiteCredito?: number;
  formaPagamento?: string;
  prazoPagamento?: number;
  contratoNumero?: string;
  tipoContrato?: string;
  contratoValidade?: string;
  moeda?: string;
  instrucaoEspecial?: string;
  historicoViagens?: Viagem[];
  motoristasAssociados?: Motorista[];
  comportamento?: Comportamento;
  historicoInteracoes?: Interacao[];
  feedbackHistorico?: Feedback[];
  metricas?: Metricas;
  dataUltimaAtualizacao?: string;
}

// Ícones (Você pode substituir por sua biblioteca de ícones)
const User = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const Printer = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
  </svg>
);

const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 1.196a9 9 0 00-18 0" />
  </svg>
);

const MapPin = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CreditCard = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const Truck = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
);

const Activity = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const BarChart3 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const History = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Award = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const Star = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const Tag = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

const Mail = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const Phone = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const Building = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const CreditCardIcon = ({ className }: { className?: string }) => CreditCard({ className });

const PackageIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const DollarSign = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CalendarDays = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AlertCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

// Componente Principal
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
      setActiveTab("geral");
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

        {/* Modal Container */}
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

export default VisualizarClienteModal;