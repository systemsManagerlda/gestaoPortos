/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Types baseados no schema
interface Carga {
  _id: string;
  codigo: string;
  tipoCarga: string;
  descricao: string;
  naturezaCarga: string;
  categoriaSeguro: string;
  abrangenciaSeguro: string;
  tipoPercurso: string;
  destinoFrete: string;
  pesoBruto: number;
  valorMercadoria: number;
  origem: {
    cidade: string;
    local: string;
  };
  destino: {
    cidade: string;
    local: string;
  };
  status: string;
  prioridade: string;
  cliente: string;
  clienteId: string;
  
  dataColeta?: string;
  dataEntregaPrevista?: string;
  valorFrete?: number;
  comissaoCalculada?: number;
  seguro?: {
    premioFinal?: number;
    statusSeguro?: string;
  };
  veiculo?: {
    matricula?: string;
    modelo?: string;
  };
  motorista?: {
    nome?: string;
    telefone?: string;
  };
  dataCriacao: string;
  createdAt: string;
}

interface CargaStats {
  totalCargas: number;
  cargasEntregues: number;
  cargasTransito: number;
  cargasAtrasadas: number;
  valorTotalFretes: number;
  valorTotalSeguros: number;
  comissaoTotal: number;
  pesoTotalTransportado: number;
  statsPorPercurso: Array<{
    _id: string;
    count: number;
    valorTotalFrete: number;
    comissaoTotal: number;
  }>;
  statsPorSeguro: Array<{
    _id: string;
    count: number;
    valorMedioMercadoria: number;
    premioMedio: number;
  }>;
}

// Adicione esta propriedade à interface CargaDetalhada
// Interface completa e corrigida
interface CargaDetalhada {
  _id: string;
  codigo: string;
  tipoCarga: string;
  descricao: string;
  naturezaCarga: string;
  categoriaSeguro: string;
  abrangenciaSeguro: string;
  tipoPercurso: string;
  destinoFrete: string;
  pesoBruto: number;
  valorMercadoria: number;
  origem: {
    cidade: string;
    local: string;
    pais?: string;
  };
  destino: {
    cidade: string;
    local: string;
    pais?: string;
  };
  status: string;
  prioridade: string;

  // Cliente
  cliente: string;
  clienteId: string;
  contatoCliente?: string;
  exportador?: string;
  importador?: string;
  consignatario?: string;

  // Transporte - Veículo
  veiculo?: {
    id?: number;
    matricula?: string;
    modelo?: string;
    ano?: number;
    quilometragemInicial?: number;
    quilometragemFinal?: number;
    proximaRevisaoKM?: number;
    estadoVeiculoAntes?: string;
    estadoVeiculoDepois?: string;
    seguroVeiculo?: {
      tipo?: string;
      valorVeiculo?: number;
      valorPremio?: number;
      apolice?: string;
      dataVencimento?: string;
    };
    [key: string]: any;
  };

  // Transporte - Motorista
  motorista?: {
    id?: number;
    nome?: string;
    empresaMotorista?: string;
    empresaMotoristaId?: number;
    cartaConducaoNumero?: string;
    cartaConducaoCategoria?: string;
    validadeCartaConducao?: string;
    telefone?: string;
    nacionalidade?: string;
    avaliacao?: number;
    certificados?: string[];
    documentos?: Array<any>;
    [key: string]: any;
  };

  // Contentor
  contentor?: {
    numero?: string;
    tipo?: string;
    tara?: number;
    capacidadeMaxima?: number;
    anoFabricacao?: number;
    estadoAtual?: string;
    lacreOrigem?: string;
    lacreDestino?: string;
    [key: string]: any;
  };

  // Características da Carga
  volume?: number;
  embalagem?: string;
  quantidadeVolumes?: number;
  dimensoes?: {
    largura?: number;
    altura?: number;
    comprimento?: number;
  };
  pesoLiquido?: number;
  subtipo?: string;
  umidadeAtual?: number;
  umidadePermitidaPercentual?: number;

  // Financeiro
  valorFrete?: number;
  freteIda?: number;
  freteVolta?: number;
  comissaoCalculada?: number;
  percentualLogistica?: number;
  taxasPortuarias?: number;
  despesasOperacionais?: number;
  custoCarga?: number;
  valorTotal?: number;
  margemLucro?: number;
  distanciaKm?: number;
  contentorVazio?: number;
  moedaComissao?: string;

  // Custos Extras
  custosExtras?: Array<{
    tipo?: string;
    descricao?: string;
    valor?: number;
    data?: string;
    [key: string]: any;
  }>;

  // Seguro
  seguro?: {
    apolice?: string;
    seguradora?: string;
    valorSegurado?: number;
    taxaPercentual?: number;
    taxaBaseMZN?: number;
    premioCalculado?: number;
    premioFinal?: number;
    dataInicio?: string;
    dataFim?: string;
    cobertura?: string[];
    statusSeguro?: string;
    sinistros?: Array<{
      data?: string;
      descricao?: string;
      valorSinistro?: number;
      status?: string;
      [key: string]: any;
    }>;
    [key: string]: any;
  };

  // Sensores IoT
  sensoresIOT?: {
    temperatura?: number;
    umidade?: number;
    aberturaPorta: boolean;
    movimentoBruscoDetectado: boolean;
    tombamentoDetectado: boolean;
    historicoEventos?: Array<{
      tipo?: string;
      descricao?: string;
      data?: string;
      [key: string]: any;
    }>;
    [key: string]: any;
  };

  // GPS
  gps?: {
    codigo?: string;
    modelo?: string;
    bateriaPercentual?: number;
    ultimaComunicacao?: string;
    satelites?: number;
    imei?: string;
    trackingId?: string;
    vinculoMotoristaId?: number;
    vinculoViagemId?: number;
    [key: string]: any;
  };

  // Documentos
  documentos?: {
    conhecimentoEmbarque?: string;
    invoice?: string;
    packingList?: string;
    certificadoOrigem?: string;
    contratoTransporte?: string;
    numeroCotacao?: string;
    numeroRecibo?: string;
    notaDebito?: string;
    manifest?: string;
    outros?: string[];
    [key: string]: any;
  };

  // Checklist
  checklist?: {
    coleta?: Array<{
      item?: string;
      status?: string;
      observacao?: string;
      [key: string]: any;
    }>;
    entrega?: Array<{
      item?: string;
      status?: string;
      observacao?: string;
      [key: string]: any;
    }>;
    [key: string]: any;
  };

  // Ocorrências
  ocorrencias?: Array<{
    id?: number;
    tipo?: string;
    descricao?: string;
    severidade?: string;
    dataRegistro?: string;
    status?: string;
    acaoTomada?: string;
    custo?: number;
    evidencias?: string[];
    afetaSeguro?: boolean;
    sinistroRelacionado?: string;
    [key: string]: any;
  }>;

  // Auditorias
  auditorias?: Array<{
    id?: number;
    data?: string;
    auditor?: string;
    observacao?: string;
    resultado?: string;
    [key: string]: any;
  }>;

  // Viagem
  viagemId?: number;

  // Rota
  rotaPlanejada?: Array<{
    lat?: number;
    lng?: number;
    [key: string]: any;
  }>;
  rotaRealizada?: Array<{
    lat?: number;
    lng?: number;
    data?: string;
    [key: string]: any;
  }>;
  pontoAtual?: {
    descricao?: string;
    lat?: number;
    lng?: number;
    data?: string;
    [key: string]: any;
  };
  desvioRotaPercentual?: number;

  // Histórico
  checkpointHistorico?: Array<{
    status?: string;
    data?: string;
    local?: string;
    observacao?: string;
    _id?: string;
    [key: string]: any;
  }>;
  fluxoStatus?: string[];

  // Tempos
  tempoArmazenagemHoras?: number;
  tempoTransitoHoras?: number;

  // Instruções
  instrucaoEspecial?: string;
  observacoes?: string;

  // Datas
  dataCriacao: string;
  dataAtualizacao?: string;
  createdAt?: string;
  updatedAt?: string;
  dataColeta?: string;
  dataEntregaPrevista?: string;
  dataEntregaReal?: string;

  // Metadados
  nomeEmpresa?: string;
  criadoPor?: string;
  atualizadoPor?: string;
  __v?: number;

  // Cálculos virtuais
  calculos?: {
    valorTotal?: number;
    margemLucro?: number;
    tempoTotalHoras?: number;
    atrasada?: boolean;
    comissao?: number;
    fretes?: {
      freteIda?: number;
      freteVolta?: number;
      distancia?: number;
      percentual?: number;
    };
    premioSeguro?: number;
    premioVeiculo?: number;
  };
}

// Componente Modal de Detalhes
const DetalhesCargaModal = ({
  carga,
  onClose,
}: {
  carga: CargaDetalhada;
  onClose: () => void;
}) => {
  const [cargaDetalhada, setCargaDetalhada] = useState<CargaDetalhada | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    fetchDetalhesCarga();
  }, [carga.codigo]);

  const fetchDetalhesCarga = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/getCargaDetail", {
        codigo: carga.codigo,
      });

      if (response.data.returnCode === 200) {
        setCargaDetalhada(response.data.data);
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
      setCargaDetalhada(carga);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Não informada";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-MZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (value?: number) => {
    if (!value) return "MT 0,00";
    return `MT ${value.toLocaleString("pt-MZ", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      planeada: "bg-blue-100 text-blue-800",
      aguardando_coleta: "bg-yellow-100 text-yellow-800",
      coletada: "bg-purple-100 text-purple-800",
      em_transito: "bg-orange-100 text-orange-800",
      em_entrega: "bg-cyan-100 text-cyan-800",
      entregue: "bg-green-100 text-green-800",
      encerrada: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getPriorityColor = (prioridade: string) => {
    const colors: Record<string, string> = {
      urgente: "bg-red-500 text-white",
      alta: "bg-orange-500 text-white",
      média: "bg-yellow-500 text-white",
      baixa: "bg-green-500 text-white",
    };
    return colors[prioridade] || "bg-gray-500 text-white";
  };

  const getSeverityColor = (severidade: string) => {
    const colors: Record<string, string> = {
      crítica: "bg-red-100 text-red-800",
      alta: "bg-orange-100 text-orange-800",
      média: "bg-yellow-100 text-yellow-800",
      baixa: "bg-green-100 text-green-800",
    };
    return colors[severidade] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando detalhes da carga...</p>
        </div>
      </div>
    );
  }

  const data = cargaDetalhada || carga;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header do Modal */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <span className="bg-white text-blue-600 p-2 rounded-lg mr-3">
                  📦
                </span>
                Detalhes da Carga: {data.codigo}
              </h2>
              <p className="text-blue-100 mt-1">
                {data.descricao.substring(0, 100)}...
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 text-2xl p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Badges de Status */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span
              className={`px-3 py-1 rounded-full font-medium ${getStatusColor(
                data.status
              )}`}
            >
              {data.status.replace("_", " ").toUpperCase()}
            </span>
            {data.prioridade && (
              <span
                className={`px-3 py-1 rounded-full font-medium ${getPriorityColor(
                  data.prioridade
                )}`}
              >
                {data.prioridade.toUpperCase()}
              </span>
            )}
            {data.seguro?.statusSeguro && (
              <span className="px-3 py-1 rounded-full font-medium bg-green-100 text-green-800">
                SEGURO: {data.seguro.statusSeguro.toUpperCase()}
              </span>
            )}
            {data.calculos?.atrasada && (
              <span className="px-3 py-1 rounded-full font-medium bg-red-100 text-red-800">
                ATRASADA
              </span>
            )}
          </div>
        </div>

        {/* Tabs de Navegação */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex overflow-x-auto">
            {[
              "info",
              "transporte",
              "financeiro",
              "seguro",
              "ocorrencias",
              "documentos",
              "checklist",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "border-b-2 border-blue-500 text-blue-600 bg-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {tab === "info" && "📋 Informações"}
                {tab === "transporte" && "🚚 Transporte"}
                {tab === "financeiro" && "💰 Financeiro"}
                {tab === "seguro" && "🛡️ Seguro"}
                {tab === "ocorrencias" && "⚠️ Ocorrências"}
                {tab === "documentos" && "📄 Documentos"}
                {tab === "checklist" && "✅ Checklist"}
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo das Tabs */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
          {/* Tab: Informações Gerais */}
          {activeTab === "info" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                {/* Informações Básicas */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">📦</span> Informações da Carga
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Código:</span>
                      <span className="font-medium">{data.codigo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tipo de Carga:</span>
                      <span className="font-medium">{data.tipoCarga}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Natureza:</span>
                      <span className="font-medium">{data.naturezaCarga}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Peso Bruto:</span>
                      <span className="font-medium">
                        {data.pesoBruto?.toLocaleString("pt-MZ")} kg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Volume:</span>
                      <span className="font-medium">{data.volume || 0} m³</span>
                    </div>
                  </div>
                </div>

                {/* Origem e Destino */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">📍</span> Rota
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center text-blue-700 mb-2">
                        <span className="mr-2">🛫</span>
                        <span className="font-semibold">Origem</span>
                      </div>
                      <p className="font-medium">{data.origem.cidade}</p>
                      <p className="text-sm text-gray-600">
                        {data.origem.local}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center text-green-700 mb-2">
                        <span className="mr-2">🛬</span>
                        <span className="font-semibold">Destino</span>
                      </div>
                      <p className="font-medium">{data.destino.cidade}</p>
                      <p className="text-sm text-gray-600">
                        {data.destino.local}
                      </p>
                    </div>
                    <div className="text-center text-gray-500">
                      <div className="inline-flex items-center">
                        <span className="mr-2">📏</span>
                        Distância: {data.distanciaKm || 0} km
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Datas Importantes */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">📅</span> Cronograma
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Data Criação:</span>
                      <span className="font-medium">
                        {formatDate(data.dataCriacao)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Data Coleta:</span>
                      <span className="font-medium">
                        {formatDate(data.dataColeta)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Entrega Prevista:</span>
                      <span
                        className={`font-medium ${
                          data.calculos?.atrasada ? "text-red-600" : ""
                        }`}
                      >
                        {formatDate(data.dataEntregaPrevista)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Tempo Total Estimado:
                      </span>
                      <span className="font-medium">
                        {data.calculos?.tempoTotalHoras || 0} horas
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cliente */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">👤</span> Cliente
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nome:</span>
                      <span className="font-medium">{data.cliente}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ID:</span>
                      <span className="font-medium">{data.clienteId}</span>
                    </div>
                    {data.contatoCliente && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contato:</span>
                        <span className="font-medium">
                          {data.contatoCliente}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contentor */}
                {data.contentor && (
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">📦</span> Contentor
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Número:</span>
                        <span className="font-medium">
                          {data.contentor.numero}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tipo:</span>
                        <span className="font-medium">
                          {data.contentor.tipo}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tara:</span>
                        <span className="font-medium">
                          {data.contentor.tara} kg
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab: Transporte */}
          {activeTab === "transporte" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                {/* Veículo */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">🚚</span> Veículo
                  </h3>
                  {data.veiculo ? (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Matrícula:</span>
                        <span className="font-medium">
                          {data.veiculo.matricula}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Modelo:</span>
                        <span className="font-medium">
                          {data.veiculo.modelo}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ano:</span>
                        <span className="font-medium">{data.veiculo.ano}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      Nenhum veículo associado
                    </p>
                  )}
                </div>

                {/* Motorista */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">👨‍💼</span> Motorista
                  </h3>
                  {data.motorista ? (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nome:</span>
                        <span className="font-medium">
                          {data.motorista.nome}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Empresa:</span>
                        <span className="font-medium">
                          {data.motorista.empresaMotorista}
                        </span>
                      </div>
                      {data.motorista.telefone && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Telefone:</span>
                          <span className="font-medium">
                            {data.motorista.telefone}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      Nenhum motorista designado
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {/* Sensores IoT */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">📡</span> Sensores IoT
                  </h3>
                  {data.sensoresIOT ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg text-center">
                        <div className="text-2xl mb-2">
                          {data.sensoresIOT.temperatura ? "🌡️" : "—"}
                        </div>
                        <div className="text-sm text-gray-600">Temperatura</div>
                        <div className="font-medium">
                          {data.sensoresIOT.temperatura
                            ? `${data.sensoresIOT.temperatura}°C`
                            : "N/D"}
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center">
                        <div className="text-2xl mb-2">
                          {data.sensoresIOT.umidade ? "💧" : "—"}
                        </div>
                        <div className="text-sm text-gray-600">Umidade</div>
                        <div className="font-medium">
                          {data.sensoresIOT.umidade
                            ? `${data.sensoresIOT.umidade}%`
                            : "N/D"}
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center">
                        <div className="text-2xl mb-2">
                          {data.sensoresIOT.aberturaPorta ? "🚨" : "✅"}
                        </div>
                        <div className="text-sm text-gray-600">Porta</div>
                        <div className="font-medium">
                          {data.sensoresIOT.aberturaPorta
                            ? "Aberta"
                            : "Fechada"}
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center">
                        <div className="text-2xl mb-2">
                          {data.sensoresIOT.movimentoBruscoDetectado
                            ? "⚠️"
                            : "✅"}
                        </div>
                        <div className="text-sm text-gray-600">Movimento</div>
                        <div className="font-medium">
                          {data.sensoresIOT.movimentoBruscoDetectado
                            ? "Detectado"
                            : "Normal"}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      Nenhum sensor ativo
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Financeiro */}
          {activeTab === "financeiro" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card Valor Mercadoria */}
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                  <div className="text-center">
                    <div className="text-3xl mb-2">📦</div>
                    <div className="text-sm text-blue-600 font-medium">
                      Valor Mercadoria
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mt-2">
                      {formatCurrency(data.valorMercadoria)}
                    </div>
                  </div>
                </div>

                {/* Card Frete */}
                <div className="bg-green-50 rounded-lg p-5 border border-green-200">
                  <div className="text-center">
                    <div className="text-3xl mb-2">💰</div>
                    <div className="text-sm text-green-600 font-medium">
                      Frete
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mt-2">
                      {formatCurrency(data.valorFrete)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Ida: {formatCurrency(data.freteIda)} | Volta:{" "}
                      {formatCurrency(data.freteVolta)}
                    </div>
                  </div>
                </div>

                {/* Card Comissão */}
                <div className="bg-purple-50 rounded-lg p-5 border border-purple-200">
                  <div className="text-center">
                    <div className="text-3xl mb-2">📊</div>
                    <div className="text-sm text-purple-600 font-medium">
                      Comissão
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mt-2">
                      {formatCurrency(data.comissaoCalculada)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {data.percentualLogistica || 0}% logística
                    </div>
                  </div>
                </div>

                {/* Card Margem Lucro */}
                <div className="bg-amber-50 rounded-lg p-5 border border-amber-200">
                  <div className="text-center">
                    <div className="text-3xl mb-2">📈</div>
                    <div className="text-sm text-amber-600 font-medium">
                      Margem de Lucro
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mt-2">
                      {formatCurrency(
                        data.margemLucro || data.calculos?.margemLucro
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabela de Custos Detalhados */}
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Detalhamento de Custos
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Frete Ida</span>
                    <span className="font-medium">
                      {formatCurrency(data.freteIda)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Frete Volta</span>
                    <span className="font-medium">
                      {formatCurrency(data.freteVolta)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Taxas Portuárias</span>
                    <span className="font-medium">
                      {formatCurrency(data.taxasPortuarias)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Despesas Operacionais</span>
                    <span className="font-medium">
                      {formatCurrency(data.despesasOperacionais)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Prêmio Seguro</span>
                    <span className="font-medium">
                      {formatCurrency(data.seguro?.premioFinal)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Comissão</span>
                    <span className="font-medium">
                      {formatCurrency(data.comissaoCalculada)}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 bg-blue-50 rounded-lg px-3">
                    <span className="text-blue-600 font-semibold">TOTAL</span>
                    <span className="text-blue-600 font-bold text-lg">
                      {formatCurrency(
                        data.valorTotal || data.calculos?.valorTotal
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Seguro */}
          {activeTab === "seguro" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Informações do Seguro */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">🛡️</span> Informações do Seguro
                  </h3>
                  {data.seguro ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                        <div>
                          <div className="text-sm text-gray-600">
                            Seguradora
                          </div>
                          <div className="font-medium">
                            {data.seguro.seguradora || "Não informada"}
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full font-medium ${
                            data.seguro.statusSeguro === "ativo"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {data.seguro.statusSeguro?.toUpperCase() ||
                            "PENDENTE"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-sm text-gray-600">Apólice</div>
                          <div className="font-medium">
                            {data.seguro.apolice || "Não informada"}
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-sm text-gray-600">
                            Valor Segurado
                          </div>
                          <div className="font-medium">
                            {formatCurrency(data.seguro.valorSegurado)}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-sm text-gray-600">
                            Data Início
                          </div>
                          <div className="font-medium">
                            {formatDate(data.seguro.dataInicio)}
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-sm text-gray-600">Data Fim</div>
                          <div className="font-medium">
                            {formatDate(data.seguro.dataFim)}
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-sm text-blue-600 font-medium mb-2">
                          Prêmio do Seguro
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {formatCurrency(data.seguro.premioFinal)}
                        </div>
                        {data.seguro.taxaPercentual && (
                          <div className="text-xs text-gray-500 mt-1">
                            Taxa: {data.seguro.taxaPercentual}%
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-400 mb-3">
                        <svg
                          className="w-16 h-16 mx-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-gray-500">Seguro não configurado</p>
                    </div>
                  )}
                </div>

                {/* Categoria e Cobertura */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Categoria de Seguro
                    </h3>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">
                        Categoria
                      </div>
                      <div className="font-medium text-lg">
                        {data.categoriaSeguro}
                      </div>
                      <div className="text-sm text-gray-600 mt-2 mb-1">
                        Abrangência
                      </div>
                      <div className="font-medium">
                        {data.abrangenciaSeguro}
                      </div>
                    </div>
                  </div>

                  {/* Sinistros */}
                  {data.seguro?.sinistros &&
                    data.seguro.sinistros.length > 0 && (
                      <div className="bg-gray-50 rounded-lg p-5">
                        <h3 className="font-semibold text-gray-900 mb-4">
                          Sinistros ({data.seguro.sinistros.length})
                        </h3>
                        <div className="space-y-3">
                          {data.seguro.sinistros.map((sinistro, index) => (
                            <div
                              key={index}
                              className="bg-white p-3 rounded-lg border border-gray-200"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-medium">
                                  {sinistro.descricao?.substring(0, 50)}...
                                </span>
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    sinistro.status === "indeminizado"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {sinistro.status
                                    ?.replace("_", " ")
                                    .toUpperCase()}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm text-gray-600">
                                <span>{formatDate(sinistro.data)}</span>
                                {(sinistro.valorSinistro ?? 0) > 0 && (
                                  <span className="font-medium">
                                    {formatCurrency(
                                      sinistro.valorSinistro ?? 0
                                    )}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Ocorrências */}
          {activeTab === "ocorrencias" && (
            <div className="space-y-6">
              {data.ocorrencias && data.ocorrencias.length > 0 ? (
                <div className="space-y-4">
                  {data.ocorrencias.map((ocorrencia, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                    >
                      <div
                        className={`p-4 ${getSeverityColor(
                          ocorrencia.severidade || "desconhecido"
                        )}`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold">
                              {ocorrencia.tipo?.toUpperCase() || "OCORRÊNCIA"}
                            </h4>
                            <p className="text-sm opacity-90">
                              {ocorrencia.descricao}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full font-medium ${
                              ocorrencia.status === "resolvido"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {ocorrencia.status?.replace("_", " ").toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Severidade:</span>
                            <span
                              className={`ml-2 px-2 py-1 rounded text-xs font-medium 
  ${getSeverityColor(ocorrencia.severidade ?? "")}
`}
                            >
                              {(
                                ocorrencia.severidade ?? "Indefinido"
                              ).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Data:</span>
                            <span className="ml-2 font-medium">
                              {formatDate(ocorrencia.dataRegistro)}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Afeta Seguro:</span>
                            <span className="ml-2 font-medium">
                              {ocorrencia.afetaSeguro ? "Sim" : "Não"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-gray-500">Nenhuma ocorrência registrada</p>
                </div>
              )}

              {/* Botão para adicionar ocorrência */}
              <div className="text-center">
                <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition-colors">
                  + Adicionar Ocorrência
                </button>
              </div>
            </div>
          )}

          {/* Tab: Documentos */}
          {activeTab === "documentos" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    key: "conhecimentoEmbarque",
                    label: "Conhecimento de Embarque",
                    icon: "📜",
                  },
                  { key: "invoice", label: "Invoice", icon: "🧾" },
                  { key: "packingList", label: "Packing List", icon: "📋" },
                  {
                    key: "certificadoOrigem",
                    label: "Certificado de Origem",
                    icon: "📑",
                  },
                  {
                    key: "contratoTransporte",
                    label: "Contrato de Transporte",
                    icon: "📝",
                  },
                  {
                    key: "numeroCotacao",
                    label: "Número da Cotação",
                    icon: "💰",
                  },
                ].map((doc) => (
                  <div
                    key={doc.key}
                    className="bg-gray-50 rounded-lg p-5 text-center hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="text-4xl mb-3">{doc.icon}</div>
                    <div className="font-medium text-gray-900 mb-2">
                      {doc.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {data.documentos?.[
                        doc.key as keyof typeof data.documentos
                      ] || "Não disponível"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Checklist */}
          {activeTab === "checklist" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Checklist Coleta */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">📋</span> Checklist de Coleta
                  </h3>
                  {data.checklist?.coleta &&
                  data.checklist.coleta.length > 0 ? (
                    <div className="space-y-3">
                      {data.checklist.coleta.map((item, index) => (
                        <div
                          key={index}
                          className="bg-white p-3 rounded-lg border border-gray-200"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{item.item}</span>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                item.status === "ok"
                                  ? "bg-green-100 text-green-800"
                                  : item.status === "nok"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {item.status?.toUpperCase()}
                            </span>
                          </div>
                          {item.observacao && (
                            <p className="text-sm text-gray-600 mt-2">
                              {item.observacao}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      Checklist de coleta não configurado
                    </p>
                  )}
                </div>

                {/* Checklist Entrega */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">📋</span> Checklist de Entrega
                  </h3>
                  {data.checklist?.entrega &&
                  data.checklist.entrega.length > 0 ? (
                    <div className="space-y-3">
                      {data.checklist.entrega.map((item, index) => (
                        <div
                          key={index}
                          className="bg-white p-3 rounded-lg border border-gray-200"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{item.item}</span>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                item.status === "ok"
                                  ? "bg-green-100 text-green-800"
                                  : item.status === "nok"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {item.status?.toUpperCase()}
                            </span>
                          </div>
                          {item.observacao && (
                            <p className="text-sm text-gray-600 mt-2">
                              {item.observacao}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      Checklist de entrega não configurado
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer com Ações */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Última atualização:{" "}
              {formatDate(data.updatedAt || data.dataAtualizacao)}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
              >
                Fechar
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                Exportar PDF
              </button>
              {data.status === "aguardando_coleta" && (
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium">
                  Iniciar Coleta
                </button>
              )}
              {data.status === "em_transito" && (
                <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium">
                  Atualizar Status
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CargaDisponivelNLT = () => {
  const [activeCargaForm, setActiveCargaForm] = useState("disponiveis");
  const [cargas, setCargas] = useState<Carga[]>([]);
  const [stats, setStats] = useState<CargaStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState({
    tipoCarga: "",
    status: "",
    prioridade: "",
    tipoPercurso: "",
    categoriaSeguro: "",
    dataInicio: "",
    dataFim: "",
  });
  const [pagination, setPagination] = useState({
    curPage: 1,
    pageSize: 20,
    totalCount: 0,
    totalPage: 0,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCarga, setSelectedCarga] = useState<Carga | null>(null);
  // Buscar cargas
  useEffect(() => {
    fetchCargas();
  }, [filtros, pagination.curPage]);

  useEffect(() => {
    fetchStats();
  }, [filtros]);
  const handleOpenDetalhes = (carga: Carga) => {
    setSelectedCarga(carga);
    setModalOpen(true);
  };
  const fetchCargas = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getCargaList",
        {
          curPage: pagination.curPage,
          pageSize: pagination.pageSize,
          ...Object.keys(filtros).reduce((acc, key) => {
            const value = (filtros as any)[key];
            if (value && value !== "") {
              acc[key] = value;
            }
            return acc;
          }, {} as any),
        }
      );

      if (response.data.returnCode === 200) {
        console.log("Cargas recebidas:", response.data.data.list);
        setCargas(response.data.data.list);
        setPagination({
          curPage: response.data.data.curPage,
          pageSize: response.data.data.pageSize,
          totalCount: response.data.data.totalCount,
          totalPage: response.data.data.totalPage,
        });
      } else {
        console.error("Erro na resposta:", response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar cargas:", error);
      // Fallback: mostrar dados de exemplo para debug
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.post(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getCargaStats",
        {
          ...(filtros.dataInicio && { dataInicio: filtros.dataInicio }),
          ...(filtros.dataFim && { dataFim: filtros.dataFim }),
          ...(filtros.tipoPercurso && { tipoPercurso: filtros.tipoPercurso }),
        }
      );

      if (response.data.returnCode === 200) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
      // Fallback stats para debug
      setStats({
        totalCargas: 1,
        cargasEntregues: 0,
        cargasTransito: 0,
        cargasAtrasadas: 0,
        valorTotalFretes: 249200,
        valorTotalSeguros: 18200,
        comissaoTotal: 6000,
        pesoTotalTransportado: 12500,
        statsPorPercurso: [
          {
            _id: "Nacional",
            count: 1,
            valorTotalFrete: 249200,
            comissaoTotal: 6000,
          },
        ],
        statsPorSeguro: [
          {
            _id: "Produtos Alimentares",
            count: 1,
            valorMedioMercadoria: 5200000,
            premioMedio: 18200,
          },
        ],
      });
    }
  };

  // Função para formatar data
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-MZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Componente para exibir métricas
  const MetricCard = ({ title, value, icon, color, subtitle }: any) => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${color} p-3 rounded-lg`}>
          <span className="text-xl">{icon}</span>
        </div>
      </div>
      {subtitle && (
        <div className="mt-2">
          <span className="text-blue-600 text-sm font-medium">{subtitle}</span>
        </div>
      )}
    </div>
  );

  // Componente para exibir carga
  const CargaCard = ({ carga }: { carga: Carga }) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case "em_transito":
          return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case "entregue":
          return "bg-green-100 text-green-800 border-green-200";
        case "aguardando_coleta":
          return "bg-blue-100 text-blue-800 border-blue-200";
        case "planeada":
          return "bg-purple-100 text-purple-800 border-purple-200";
        case "em_entrega":
          return "bg-orange-100 text-orange-800 border-orange-200";
        default:
          return "bg-gray-100 text-gray-800 border-gray-200";
      }
    };

    const getPriorityColor = (prioridade: string) => {
      switch (prioridade) {
        case "urgente":
          return "bg-red-500 text-white";
        case "alta":
          return "bg-orange-500 text-white";
        case "média":
          return "bg-yellow-500 text-white";
        case "baixa":
          return "bg-green-500 text-white";
        default:
          return "bg-gray-500 text-white";
      }
    };

    const getStatusLabel = (status: string) => {
      const labels: Record<string, string> = {
        planeada: "Planeada",
        aguardando_coleta: "Aguardando Coleta",
        coletada: "Coletada",
        em_transito: "Em Trânsito",
        em_entrega: "Em Entrega",
        entregue: "Entregue",
        encerrada: "Encerrada",
      };
      return labels[status] || status;
    };

    return (
      <div className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">
                {carga.codigo}
              </span>
              <span
                className={`px-3 py-1 rounded text-sm font-medium border ${getStatusColor(
                  carga.status
                )}`}
              >
                {getStatusLabel(carga.status)}
              </span>
              {carga.prioridade && (
                <span
                  className={`px-3 py-1 rounded text-sm font-medium ${getPriorityColor(
                    carga.prioridade
                  )}`}
                >
                  {carga.prioridade.toUpperCase()}
                </span>
              )}
            </div>

            <h4 className="font-medium text-gray-900 text-lg mb-1">
              {carga.descricao.substring(0, 60)}...
            </h4>

            <div className="mb-3">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Origem:</span>{" "}
                {carga.origem.cidade} - {carga.origem.local}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Destino:</span>{" "}
                {carga.destino.cidade} - {carga.destino.local}
              </p>
            </div>
          </div>

          <div className="text-right ml-4">
            <div className="text-lg font-bold text-blue-600">
              MT {carga.valorFrete?.toLocaleString("pt-MZ") || "0"}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {formatDate(carga.dataCriacao)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-gray-600">Tipo</p>
            <p className="font-medium">{carga.tipoCarga}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-gray-600">Peso</p>
            <p className="font-medium">
              {carga.pesoBruto.toLocaleString("pt-MZ")} kg
            </p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-gray-600">Valor Mercadoria</p>
            <p className="font-medium">
              MT {carga.valorMercadoria?.toLocaleString("pt-MZ")}
            </p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-gray-600">Percurso</p>
            <p className="font-medium">{carga.tipoPercurso}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            {carga.veiculo?.matricula && (
              <span className="inline-flex items-center mr-4">
                <span className="mr-1">🚚</span>
                {carga.veiculo.matricula}
              </span>
            )}
            {carga.motorista?.nome && (
              <span className="inline-flex items-center">
                <span className="mr-1">👨‍💼</span>
                {carga.motorista.nome}
              </span>
            )}
          </div>

          <div className="flex space-x-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
              onClick={() => handleOpenDetalhes(carga)}
            >
              Detalhes
            </button>
            {carga.status === "aguardando_coleta" && (
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
                onClick={() => console.log("Atribuir:", carga.codigo)}
              >
                Atribuir
              </button>
            )}
          </div>
        </div>
        {modalOpen && selectedCarga && (
  <DetalhesCargaModal
    carga={selectedCarga}
    onClose={() => {
      setModalOpen(false);
      setSelectedCarga(null);
    }}
  />
)}
      </div>
    );
  };

  // Formulário de filtros
  const FiltrosForm = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
      <h4 className="font-semibold text-gray-900 mb-4">Filtros</h4>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Carga
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filtros.tipoCarga}
            onChange={(e) =>
              setFiltros({ ...filtros, tipoCarga: e.target.value })
            }
          >
            <option value="">Todos</option>
            <option value="Contentorizada">Contentorizada</option>
            <option value="Solta">Solta</option>
            <option value="Granel">Granel</option>
            <option value="Frigorífica">Frigorífica</option>
            <option value="Perigosa">Perigosa</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filtros.status}
            onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
          >
            <option value="">Todos</option>
            <option value="planeada">Planeada</option>
            <option value="aguardando_coleta">Aguardando Coleta</option>
            <option value="coletada">Coletada</option>
            <option value="em_transito">Em Trânsito</option>
            <option value="em_entrega">Em Entrega</option>
            <option value="entregue">Entregue</option>
            <option value="encerrada">Encerrada</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Percurso
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filtros.tipoPercurso}
            onChange={(e) =>
              setFiltros({ ...filtros, tipoPercurso: e.target.value })
            }
          >
            <option value="">Todos</option>
            <option value="Nacional">Nacional</option>
            <option value="Local">Local</option>
            <option value="Beira-Interland">Beira-Interland</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() =>
              setFiltros({
                tipoCarga: "",
                status: "",
                prioridade: "",
                tipoPercurso: "",
                categoriaSeguro: "",
                dataInicio: "",
                dataFim: "",
              })
            }
            className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data Início
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filtros.dataInicio}
            onChange={(e) =>
              setFiltros({ ...filtros, dataInicio: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data Fim
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filtros.dataFim}
            onChange={(e) =>
              setFiltros({ ...filtros, dataFim: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoria Seguro
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filtros.categoriaSeguro}
            onChange={(e) =>
              setFiltros({ ...filtros, categoriaSeguro: e.target.value })
            }
          >
            <option value="">Todos</option>
            <option value="Produtos Alimentares">Produtos Alimentares</option>
            <option value="Eletrónicos">Eletrónicos</option>
            <option value="Materiais Perigosos">Materiais Perigosos</option>
            <option value="Carga Geral">Carga Geral</option>
            <option value="Carga Consolidada">Carga Consolidada</option>
          </select>
        </div>
      </div>
    </div>
  );

  // Paginação
  const PaginationControls = () => (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-gray-600">
        Mostrando {cargas.length} de {pagination.totalCount} cargas
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() =>
            setPagination({
              ...pagination,
              curPage: Math.max(1, pagination.curPage - 1),
            })
          }
          disabled={pagination.curPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <span className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Página {pagination.curPage} de {pagination.totalPage || 1}
        </span>
        <button
          onClick={() =>
            setPagination({
              ...pagination,
              curPage: Math.min(
                pagination.totalPage || 1,
                pagination.curPage + 1
              ),
            })
          }
          disabled={pagination.curPage === (pagination.totalPage || 1)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próxima
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">🚚</span>
          Carga Disponível NLT - Nacional, Local, Trânsito
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Gestão de cargas disponíveis para transporte nacional, local e em
          trânsito
        </p>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        {/* Menu de Navegação */}
        <div className="flex flex-wrap gap-3 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveCargaForm("disponiveis")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCargaForm === "disponiveis"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📦 Disponíveis ({cargas.length})
          </button>
          {/* <button
            onClick={() => setActiveCargaForm("nacional")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCargaForm === "nacional"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🇲🇿 Nova Carga
          </button> */}
          <button
            onClick={() => setActiveCargaForm("graficos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCargaForm === "graficos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Gráficos
          </button>
        </div>

        {/* Conteúdo Principal */}
        {activeCargaForm === "disponiveis" && (
          <div className="space-y-6">
            <FiltrosForm />

            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  title="Total de Cargas"
                  value={stats.totalCargas}
                  icon="📦"
                  color="bg-blue-100"
                  subtitle={`${stats.cargasEntregues} entregues`}
                />
                <MetricCard
                  title="Em Trânsito"
                  value={stats.cargasTransito}
                  icon="🛣️"
                  color="bg-yellow-100"
                  subtitle={`${stats.cargasAtrasadas} atrasadas`}
                />
                <MetricCard
                  title="Fretes Totais"
                  value={`MT ${stats.valorTotalFretes?.toLocaleString(
                    "pt-MZ"
                  )}`}
                  icon="💰"
                  color="bg-green-100"
                />
                <MetricCard
                  title="Comissões"
                  value={`MT ${stats.comissaoTotal?.toLocaleString("pt-MZ")}`}
                  icon="📊"
                  color="bg-purple-100"
                />
              </div>
            )}

            {/* Lista de Cargas */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm text-gray-900">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900 flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                      📦
                    </span>
                    Cargas Disponíveis
                  </span>
                  {loading ? (
                    <span className="text-sm font-normal text-gray-600">
                      Carregando...
                    </span>
                  ) : (
                    <span className="text-sm font-normal text-gray-600">
                      {cargas.length} cargas encontradas
                    </span>
                  )}
                </h3>
              </div>

              <div className="p-6">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <p className="mt-2 text-gray-600">Carregando cargas...</p>
                  </div>
                ) : cargas.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg
                        className="w-16 h-16 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        ></path>
                      </svg>
                    </div>
                    <p className="text-gray-500 mb-2">
                      Nenhuma carga encontrada
                    </p>
                    <p className="text-sm text-gray-400">
                      Tente ajustar os filtros ou criar uma nova carga
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 gap-4">
                      {cargas.map((carga) => (
                        <CargaCard
                          key={carga._id || carga.codigo}
                          carga={carga}
                        />
                      ))}
                    </div>
                    <PaginationControls />
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Gráficos */}
        {activeCargaForm === "graficos" && stats && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                    📈
                  </span>
                  Dashboard de Cargas - Métricas e Estatísticas
                </h3>
              </div>

              <div className="p-6">
                {/* Métricas Rápidas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">
                      Cargas Ativas
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.totalCargas}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600 font-medium">
                      Taxa Entrega
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.totalCargas > 0
                        ? `${Math.round(
                            (stats.cargasEntregues / stats.totalCargas) * 100
                          )}%`
                        : "0%"}
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-600 font-medium">
                      Cargas Trânsito
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.cargasTransito}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-600 font-medium">
                      Peso Total
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round(stats.pesoTotalTransportado / 1000)} ton
                    </p>
                  </div>
                </div>

                {/* Grid de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Distribuição por Status */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Distribuição por Status
                    </h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              {
                                name: "Aguardando Coleta",
                                value: 1,
                                color: "#3b82f6",
                              },
                              { name: "Entregues", value: 0, color: "#10b981" },
                              {
                                name: "Em Trânsito",
                                value: 0,
                                color: "#f59e0b",
                              },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(entry) => `${entry.name}: ${entry.value}`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#3b82f6" />
                            <Cell fill="#10b981" />
                            <Cell fill="#f59e0b" />
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Gráfico de Distribuição por Percurso */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Cargas por Tipo de Percurso
                    </h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={stats.statsPorPercurso}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="_id" />
                          <YAxis />
                          <Tooltip
                            formatter={(value: number) => [
                              value.toLocaleString("pt-MZ"),
                              "Quantidade",
                            ]}
                          />
                          <Legend />
                          <Bar
                            dataKey="count"
                            name="Número de Cargas"
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Estatísticas por Categoria de Seguro */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Estatísticas por Categoria de Seguro
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                            Categoria
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                            N° Cargas
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                            Valor Médio Mercadoria
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                            Prêmio Médio Seguro
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.statsPorSeguro.map((item) => (
                          <tr
                            key={item._id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="py-3 px-4 text-sm text-gray-900">
                              {item._id}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-700">
                              {item.count}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-700">
                              MT{" "}
                              {item.valorMedioMercadoria?.toLocaleString(
                                "pt-MZ"
                              )}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-700">
                              MT {item.premioMedio?.toLocaleString("pt-MZ")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CargaDisponivelNLT;
