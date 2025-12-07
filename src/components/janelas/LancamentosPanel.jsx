import React, { useState, useEffect } from "react";
import axios from "axios";

export const LancamentosPanel = ({
  activeLancamentoForm,
  setActiveLancamentoForm,
}) => {
  const [clientes, setClientes] = useState([]);
  const [transportadoras, setTransportadoras] = useState([]);
  const [cargas, setCargas] = useState([]);
  const [despachantes, setDespachantes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtrosAtivos, setFiltrosAtivos] = useState({});
  const [formData, setFormData] = useState({
    // Nova Carga
    tipoCarga: "",
    subtipo: "",
    descricao: "",
    naturezaCarga: "",
    categoriaSeguro: "",
    abrangenciaSeguro: "Nacional",
    tipoPercurso: "",
    destinoFrete: "",
    pesoBruto: "",
    pesoLiquido: "",
    volume: "",
    embalagem: "",
    quantidadeVolumes: "",
    dimensoes: { largura: "", altura: "", comprimento: "" },
    clienteId: "",
    valorMercadoria: "",
    origem: { pais: "", cidade: "", local: "" },
    destino: { pais: "", cidade: "", local: "" },
    prioridade: "média",
    // Movimentação
    numeroCarga: "",
    tipoMovimentacao: "",
    localOrigem: "",
    localDestino: "",
    responsavel: "",
    dataMovimentacao: "",
    observacoes: "",
    // Despacho
    numeroDUE: "",
    dataDespacho: "",
    despachanteId: "",
    documentacao: {},
    tributacao: { valorAduaneiro: "", impostoImportacao: "", iva: "" },
  });
  // Adicione este estado para o modal
  const [modalCarga, setModalCarga] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [cargaDetalhada, setCargaDetalhada] = useState(null);

  // Função para abrir o modal com detalhes da carga
  const abrirModalCarga = async (codigoCarga) => {
    setModalLoading(true);
    setModalCarga(codigoCarga);

    try {
      const response = await axios.post(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getCargaDetail",
        {
          codigo: codigoCarga,
        }
      );

      if (response.data.returnCode === 200) {
        setCargaDetalhada(response.data.data);
      } else {
        alert("Erro ao carregar detalhes da carga: " + response.data.returnMsg);
        setModalCarga(null);
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes da carga:", error);
      alert("Erro ao carregar detalhes da carga");
      setModalCarga(null);
    } finally {
      setModalLoading(false);
    }
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setModalCarga(null);
    setCargaDetalhada(null);
  };

  // Componente Modal de Detalhes da Carga
  const ModalDetalhesCarga = ({ codigoCarga, onClose, onRefresh }) => {
    const [loading, setLoading] = useState(false);
    const [cargaDetalhada, setCargaDetalhada] = useState(null);
    const [activeTab, setActiveTab] = useState("info"); // 'info', 'financas', 'historico'

    useEffect(() => {
      if (codigoCarga) {
        carregarDetalhes();
      }
    }, [codigoCarga]);

    const carregarDetalhes = async () => {
      if (!codigoCarga) return;

      setLoading(true);
      try {
        const response = await axios.post(
          "https://desktop-api-4f850b3f9733.herokuapp.com/getCargaDetail",
          { codigo: codigoCarga }
        );

        if (response.data.returnCode === 200) {
          setCargaDetalhada(response.data.data);
        } else {
          alert("Erro ao carregar detalhes: " + response.data.returnMsg);
          onClose();
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
        alert("Erro ao carregar detalhes da carga");
        onClose();
      } finally {
        setLoading(false);
      }
    };

    if (!codigoCarga) return null;

    const formatCurrency = (value) => {
      return `MZN ${value?.toLocaleString("pt-MZ") || "0"}`;
    };

    const formatDate = (date) => {
      if (!date) return "N/A";
      return new Date(date).toLocaleDateString("pt-MZ");
    };

    const formatDateTime = (date) => {
      if (!date) return "N/A";
      return new Date(date).toLocaleString("pt-MZ");
    };

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          {/* Modal */}
          <div className="inline-block w-full max-w-6xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-gray-50 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-xl">📦</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      Detalhes da Carga: {codigoCarga}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {cargaDetalhada?.status
                        ? `Status: ${cargaDetalhada.status.replace("_", " ")}`
                        : "Carregando..."}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      if (onRefresh) onRefresh();
                    }}
                    className="text-gray-600 hover:text-gray-900"
                    title="Atualizar dados"
                  >
                    ↻
                  </button>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs de Navegação */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("info")}
                  className={`py-3 px-6 font-medium text-sm border-b-2 ${
                    activeTab === "info"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  📋 Informações
                </button>
                <button
                  onClick={() => setActiveTab("financas")}
                  className={`py-3 px-6 font-medium text-sm border-b-2 ${
                    activeTab === "financas"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  💰 Financeiro
                </button>
                <button
                  onClick={() => setActiveTab("historico")}
                  className={`py-3 px-6 font-medium text-sm border-b-2 ${
                    activeTab === "historico"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  📈 Histórico
                </button>
                <button
                  onClick={() => setActiveTab("documentos")}
                  className={`py-3 px-6 font-medium text-sm border-b-2 ${
                    activeTab === "documentos"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  📄 Documentos
                </button>
              </nav>
            </div>

            {/* Content */}
            <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : cargaDetalhada ? (
                <>
                  {/* Tab: Informações */}
                  {activeTab === "info" && (
                    <div className="space-y-6">
                      {/* Status e Datas */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600">
                            Status Atual
                          </div>
                          <div className="text-lg font-bold text-gray-900">
                            {cargaDetalhada.status?.replace("_", " ") || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Prioridade:{" "}
                            <span
                              className={`font-medium ${
                                cargaDetalhada.prioridade === "urgente"
                                  ? "text-red-600"
                                  : cargaDetalhada.prioridade === "alta"
                                  ? "text-orange-600"
                                  : cargaDetalhada.prioridade === "média"
                                  ? "text-blue-600"
                                  : "text-gray-600"
                              }`}
                            >
                              {cargaDetalhada.prioridade}
                            </span>
                          </div>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600">Datas</div>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Criação:</span>
                              <span className="font-medium">
                                {formatDate(cargaDetalhada.dataCriacao)}
                              </span>
                            </div>
                            {cargaDetalhada.dataEntregaPrevista && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  Entrega Prevista:
                                </span>
                                <span className="font-medium">
                                  {formatDate(
                                    cargaDetalhada.dataEntregaPrevista
                                  )}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600">Seguro</div>
                          <div className="text-lg font-bold text-purple-600">
                            {cargaDetalhada.seguro?.statusSeguro === "ativo"
                              ? "🛡️ ATIVO"
                              : "❌ INATIVO"}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Categoria: {cargaDetalhada.categoriaSeguro}
                          </div>
                        </div>
                      </div>

                      {/* Dados Principais */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Informações da Carga */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <h4 className="font-semibold text-gray-900 mb-4">
                            📦 Dados da Carga
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-gray-500">
                                Tipo de Carga
                              </label>
                              <p className="text-sm font-medium">
                                {cargaDetalhada.tipoCarga}
                              </p>
                            </div>
                            <div>
                              <label className="text-xs text-gray-500">
                                Natureza
                              </label>
                              <p className="text-sm font-medium">
                                {cargaDetalhada.naturezaCarga}
                              </p>
                            </div>
                            <div>
                              <label className="text-xs text-gray-500">
                                Peso Bruto
                              </label>
                              <p className="text-sm font-medium">
                                {cargaDetalhada.pesoBruto?.toLocaleString(
                                  "pt-MZ"
                                )}{" "}
                                kg
                              </p>
                            </div>
                            <div>
                              <label className="text-xs text-gray-500">
                                Peso Líquido
                              </label>
                              <p className="text-sm font-medium">
                                {cargaDetalhada.pesoLiquido?.toLocaleString(
                                  "pt-MZ"
                                )}{" "}
                                kg
                              </p>
                            </div>
                            <div>
                              <label className="text-xs text-gray-500">
                                Volume
                              </label>
                              <p className="text-sm font-medium">
                                {cargaDetalhada.volume} m³
                              </p>
                            </div>
                            <div>
                              <label className="text-xs text-gray-500">
                                Embalagem
                              </label>
                              <p className="text-sm font-medium">
                                {cargaDetalhada.embalagem || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Cliente */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <h4 className="font-semibold text-gray-900 mb-4">
                            👤 Cliente
                          </h4>
                          <div className="space-y-3">
                            <div>
                              <label className="text-xs text-gray-500">
                                Nome do Cliente
                              </label>
                              <p className="text-sm font-medium">
                                {cargaDetalhada.cliente}
                              </p>
                            </div>

                            <div>
                              <label className="text-xs text-gray-500">
                                Contato
                              </label>
                              <p className="text-sm text-gray-700">
                                {cargaDetalhada.contatoCliente ||
                                  "Não informado"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Rota */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <h4 className="font-semibold text-gray-900 mb-4">
                            📍 Rota
                          </h4>
                          <div className="space-y-3">
                            <div>
                              <label className="text-xs text-gray-500">
                                Origem
                              </label>
                              <p className="text-sm font-medium">
                                {cargaDetalhada.origem?.cidade} -{" "}
                                {cargaDetalhada.origem?.local}
                              </p>
                            </div>

                            <div>
                              <label className="text-xs text-gray-500">
                                Destino
                              </label>
                              <p className="text-sm font-medium">
                                {cargaDetalhada.destino?.cidade} -{" "}
                                {cargaDetalhada.destino?.local}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs text-gray-500">
                                  Distância
                                </label>
                                <p className="text-sm font-medium">
                                  {cargaDetalhada.distanciaKm?.toLocaleString(
                                    "pt-MZ"
                                  )}{" "}
                                  km
                                </p>
                              </div>
                              <div>
                                <label className="text-xs text-gray-500">
                                  Tipo de Percurso
                                </label>
                                <p className="text-sm font-medium">
                                  {cargaDetalhada.tipoPercurso}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Contentor */}
                        {cargaDetalhada.contentor && (
                          <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h4 className="font-semibold text-gray-900 mb-4">
                              📦 Contentor
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs text-gray-500">
                                  Número
                                </label>
                                <p className="text-sm font-medium">
                                  {cargaDetalhada.contentor.numero}
                                </p>
                              </div>
                              <div>
                                <label className="text-xs text-gray-500">
                                  Tipo
                                </label>
                                <p className="text-sm font-medium">
                                  {cargaDetalhada.contentor.tipo}
                                </p>
                              </div>
                              <div>
                                <label className="text-xs text-gray-500">
                                  Tara
                                </label>
                                <p className="text-sm font-medium">
                                  {cargaDetalhada.contentor.tara} kg
                                </p>
                              </div>
                              <div>
                                <label className="text-xs text-gray-500">
                                  Capacidade
                                </label>
                                <p className="text-sm font-medium">
                                  {cargaDetalhada.contentor.capacidadeMaxima} kg
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Tab: Financeiro */}
                  {activeTab === "financas" && (
                    <div className="space-y-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">
                          💰 Detalhes Financeiros
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Valores Principais */}
                          <div className="space-y-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <div className="text-sm text-gray-600">
                                Valor da Mercadoria
                              </div>
                              <div className="text-2xl font-bold text-blue-600">
                                {formatCurrency(cargaDetalhada.valorMercadoria)}
                              </div>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg">
                              <div className="text-sm text-gray-600">
                                Valor Total da Operação
                              </div>
                              <div className="text-2xl font-bold text-green-600">
                                {formatCurrency(cargaDetalhada.valorTotal)}
                              </div>
                            </div>
                          </div>

                          {/* Detalhamento */}
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">
                                Frete
                              </span>
                              <span className="text-sm font-medium">
                                {formatCurrency(
                                  cargaDetalhada.valorFrete ||
                                    cargaDetalhada.freteIda
                                )}
                              </span>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">
                                Seguro
                              </span>
                              <span className="text-sm font-medium">
                                {formatCurrency(
                                  cargaDetalhada.seguro?.premioFinal
                                )}
                              </span>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">
                                Taxas Portuárias
                              </span>
                              <span className="text-sm font-medium">
                                {formatCurrency(cargaDetalhada.taxasPortuarias)}
                              </span>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">
                                Despesas Operacionais
                              </span>
                              <span className="text-sm font-medium">
                                {formatCurrency(
                                  cargaDetalhada.despesasOperacionais
                                )}
                              </span>
                            </div>

                            <div className="pt-3 border-t">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700">
                                  Margem de Lucro
                                </span>
                                <span
                                  className={`text-lg font-bold ${
                                    cargaDetalhada.margemLucro > 0
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {formatCurrency(cargaDetalhada.margemLucro)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Seguro Detalhado */}
                      {cargaDetalhada.seguro && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <h4 className="font-semibold text-gray-900 mb-4">
                            🛡️ Detalhes do Seguro
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <label className="text-xs text-gray-500">
                                Apólice
                              </label>
                              <p className="text-sm font-medium">
                                {cargaDetalhada.seguro.apolice || "N/A"}
                              </p>
                            </div>
                            <div>
                              <label className="text-xs text-gray-500">
                                Seguradora
                              </label>
                              <p className="text-sm font-medium">
                                {cargaDetalhada.seguro.seguradora || "N/A"}
                              </p>
                            </div>
                            <div>
                              <label className="text-xs text-gray-500">
                                Valor Segurado
                              </label>
                              <p className="text-sm font-medium">
                                {formatCurrency(
                                  cargaDetalhada.seguro.valorSegurado
                                )}
                              </p>
                            </div>
                            <div>
                              <label className="text-xs text-gray-500">
                                Taxa
                              </label>
                              <p className="text-sm font-medium">
                                {cargaDetalhada.seguro.taxaPercentual}%
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tab: Histórico */}
                  {activeTab === "historico" && (
                    <div className="space-y-6">
                      {/* Checkpoints */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">
                          📈 Histórico de Checkpoints
                        </h4>
                        {cargaDetalhada.checkpointHistorico &&
                        cargaDetalhada.checkpointHistorico.length > 0 ? (
                          <div className="space-y-3">
                            {cargaDetalhada.checkpointHistorico
                              .sort(
                                (a, b) => new Date(b.data) - new Date(a.data)
                              )
                              .map((checkpoint, index) => (
                                <div
                                  key={index}
                                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                                >
                                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 text-sm">
                                      📍
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex justify-between">
                                      <span className="font-medium text-gray-900">
                                        {checkpoint.status?.replace("_", " ")}
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        {formatDateTime(checkpoint.data)}
                                      </span>
                                    </div>
                                    {checkpoint.observacao && (
                                      <p className="text-sm text-gray-600 mt-1">
                                        {checkpoint.observacao}
                                      </p>
                                    )}
                                    {checkpoint.local && (
                                      <p className="text-xs text-gray-500 mt-1">
                                        Local: {checkpoint.local}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-center py-4">
                            Nenhum checkpoint registrado
                          </p>
                        )}
                      </div>

                      {/* Fluxo de Status */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">
                          🔄 Fluxo de Status
                        </h4>
                        {cargaDetalhada.fluxoStatus &&
                        cargaDetalhada.fluxoStatus.length > 0 ? (
                          <div className="flex items-center space-x-4 overflow-x-auto pb-4">
                            {cargaDetalhada.fluxoStatus.map((status, index) => (
                              <div key={index} className="flex items-center">
                                <div className="flex flex-col items-center">
                                  <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                      index ===
                                      cargaDetalhada.fluxoStatus.length - 1
                                        ? "bg-green-100"
                                        : "bg-blue-100"
                                    }`}
                                  >
                                    <span
                                      className={`text-sm ${
                                        index ===
                                        cargaDetalhada.fluxoStatus.length - 1
                                          ? "text-green-600"
                                          : "text-blue-600"
                                      }`}
                                    >
                                      {index + 1}
                                    </span>
                                  </div>
                                  <span className="text-xs mt-2 text-gray-600 text-center max-w-[80px]">
                                    {status.replace("_", " ")}
                                  </span>
                                </div>
                                {index <
                                  cargaDetalhada.fluxoStatus.length - 1 && (
                                  <div className="w-8 h-1 bg-gray-300"></div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-center py-4">
                            Nenhum fluxo de status registrado
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Tab: Documentos */}
                  {activeTab === "documentos" && (
                    <div className="space-y-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">
                          📄 Documentos da Carga
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(cargaDetalhada.documentos || {}).map(
                            ([docName, docValue]) =>
                              docValue && (
                                <div
                                  key={docName}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                  <div>
                                    <span className="text-sm font-medium text-gray-900">
                                      {docName}
                                    </span>
                                    <p className="text-xs text-gray-500 truncate max-w-[200px]">
                                      {docValue}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => {
                                      // Ação para visualizar/download do documento
                                      console.log(
                                        "Abrir documento:",
                                        docName,
                                        docValue
                                      );
                                    }}
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    👁️
                                  </button>
                                </div>
                              )
                          )}
                        </div>

                        {(!cargaDetalhada.documentos ||
                          Object.keys(cargaDetalhada.documentos).length ===
                            0) && (
                          <p className="text-gray-500 text-center py-4">
                            Nenhum documento registrado
                          </p>
                        )}
                      </div>

                      {/* Ocorrências */}
                      {cargaDetalhada.ocorrencias &&
                        cargaDetalhada.ocorrencias.length > 0 && (
                          <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h4 className="font-semibold text-gray-900 mb-4">
                              ⚠️ Ocorrências
                            </h4>
                            <div className="space-y-3">
                              {cargaDetalhada.ocorrencias.map(
                                (ocorrencia, index) => (
                                  <div
                                    key={index}
                                    className="p-3 bg-red-50 rounded-lg"
                                  >
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <span className="font-medium text-gray-900">
                                          {ocorrencia.tipo}
                                        </span>
                                        <p className="text-sm text-gray-600 mt-1">
                                          {ocorrencia.descricao}
                                        </p>
                                      </div>
                                      <span className="text-xs text-gray-500">
                                        {formatDateTime(
                                          ocorrencia.dataRegistro
                                        )}
                                      </span>
                                    </div>
                                    {ocorrencia.acaoTomada && (
                                      <p className="text-sm text-green-600 mt-2">
                                        <span className="font-medium">
                                          Ação tomada:
                                        </span>{" "}
                                        {ocorrencia.acaoTomada}
                                      </p>
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">⚠️</div>
                  <p className="text-gray-500">
                    Não foi possível carregar os detalhes da carga
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Última atualização:{" "}
                  {formatDateTime(cargaDetalhada?.dataAtualizacao)}
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    Fechar
                  </button>
                  <button
                    onClick={() => {
                      // Função para imprimir ou exportar
                      console.log("Exportar detalhes:", cargaDetalhada);
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
                  >
                    Exportar PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const aplicarFiltros = (novosFiltros) => {
    setFiltrosAtivos(novosFiltros);
    fetchCargas(novosFiltros);
  };
  // Buscar dados iniciais
  useEffect(() => {
    fetchClientes();
    fetchTransportadoras();
    fetchCargas();
    fetchDespachantes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.post(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getClienteList",
        {
          curPage: 1,
          pageSize: 100,
        }
      );
      if (response.data.returnCode === 200) {
        setClientes(response.data.data.list || []);
      }
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  const fetchTransportadoras = async () => {
    try {
      const response = await axios.post(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getTransportadoraList",
        {
          curPage: 1,
          pageSize: 100,
        }
      );
      if (response.data.returnCode === 200) {
        setTransportadoras(response.data.data.list || []);
      }
    } catch (error) {
      console.error("Erro ao buscar transportadoras:", error);
    }
  };

  const fetchCargas = async (filtros = {}) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getCargaList",
        {
          curPage: 1,
          pageSize: 100,
          ...filtros,
          // REMOVA este filtro para mostrar TODAS as cargas:
          // status: ['planeada', 'coletada', 'em_transito', 'aguardando_desembaraco']
        }
      );

      if (response.data.returnCode === 200) {
        setCargas(response.data.data.list || []);
      } else {
        console.error("Erro na resposta da API:", response.data.returnMsg);
      }
    } catch (error) {
      console.error("Erro ao buscar cargas:", error);
      alert("Erro ao carregar cargas. Verifique o console para detalhes.");
    } finally {
      setLoading(false);
    }
  };
  const fetchDespachantes = async () => {
    // Implementar busca de despachantes da base de dados
    setDespachantes([
      { id: 1, nome: "João Silva", registro: "12345" },
      { id: 2, nome: "Maria Santos", registro: "12346" },
    ]);
  };

  const handleInputChange = (e, section = null) => {
    const { name, value, type, checked } = e.target;

    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmitNovaCarga = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Calcular custos antes de criar
      const custosResponse = await axios.post(
        "https://desktop-api-4f850b3f9733.herokuapp.com/calcularCustosCarga",
        {
          tipoPercurso: formData.tipoPercurso,
          destinoFrete: formData.destinoFrete,
          pesoBruto: parseFloat(formData.pesoBruto),
          valorMercadoria: parseFloat(formData.valorMercadoria),
          categoriaSeguro: formData.categoriaSeguro,
          abrangenciaSeguro: formData.abrangenciaSeguro,
        }
      );

      if (custosResponse.data.returnCode !== 200) {
        throw new Error("Erro ao calcular custos");
      }

      const custos = custosResponse.data.data;

      // Preparar dados da carga
      const cargaData = {
        tipoCarga: formData.tipoCarga,
        subtipo: formData.subtipo,
        descricao: formData.descricao,
        naturezaCarga: formData.naturezaCarga,
        categoriaSeguro: formData.categoriaSeguro,
        abrangenciaSeguro: formData.abrangenciaSeguro,
        tipoPercurso: formData.tipoPercurso,
        destinoFrete: formData.destinoFrete,
        pesoBruto: parseFloat(formData.pesoBruto),
        pesoLiquido: formData.pesoLiquido
          ? parseFloat(formData.pesoLiquido)
          : null,
        volume: formData.volume ? parseFloat(formData.volume) : null,
        embalagem: formData.embalagem,
        quantidadeVolumes: formData.quantidadeVolumes
          ? parseInt(formData.quantidadeVolumes)
          : null,
        dimensoes: {
          largura: formData.dimensoes.largura
            ? parseFloat(formData.dimensoes.largura)
            : null,
          altura: formData.dimensoes.altura
            ? parseFloat(formData.dimensoes.altura)
            : null,
          comprimento: formData.dimensoes.comprimento
            ? parseFloat(formData.dimensoes.comprimento)
            : null,
        },
        clienteId: formData.clienteId,
        cliente: clientes.find((c) => c.id === formData.clienteId)?.nome || "",
        valorMercadoria: parseFloat(formData.valorMercadoria),
        origem: formData.origem,
        destino: formData.destino,
        prioridade: formData.prioridade,
        status: "planeada",
        // Campos calculados que serão preenchidos pelo middleware
        distanciaKm: custos.fretes?.distancia,
        freteIda: custos.fretes?.freteIda,
        freteVolta: custos.fretes?.freteVolta,
        percentualLogistica: custos.fretes?.percentual,
        comissaoCalculada: custos.comissao,
        seguro: {
          valorSegurado: parseFloat(formData.valorMercadoria),
          premioFinal: custos.seguroCarga,
          statusSeguro: "pendente",
        },
      };

      const response = await axios.post(
        "https://desktop-api-4f850b3f9733.herokuapp.com/createCarga",
        cargaData
      );

      if (response.data.returnCode === 201) {
        alert("Carga criada com sucesso!");
        setFormData({
          tipoCarga: "",
          subtipo: "",
          descricao: "",
          naturezaCarga: "",
          categoriaSeguro: "",
          abrangenciaSeguro: "Nacional",
          tipoPercurso: "",
          destinoFrete: "",
          pesoBruto: "",
          pesoLiquido: "",
          volume: "",
          embalagem: "",
          quantidadeVolumes: "",
          dimensoes: { largura: "", altura: "", comprimento: "" },
          clienteId: "",
          valorMercadoria: "",
          origem: { pais: "", cidade: "", local: "" },
          destino: { pais: "", cidade: "", local: "" },
          prioridade: "média",
        });
        fetchCargas(); // Atualizar lista de cargas
      } else {
        throw new Error(response.data.returnMsg);
      }
    } catch (error) {
      console.error("Erro ao criar carga:", error);
      alert(`Erro ao criar carga: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitMovimentacao = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Atualizar status da carga
      const updateData = {
        codigo: formData.numeroCarga,
        status: getStatusByMovimentacao(formData.tipoMovimentacao),
        pontoAtual: {
          descricao: formData.localDestino,
          lat: null, // Seria obtido via GPS
          lng: null,
          data: new Date(),
        },
      };

      const response = await axios.post(
        "https://desktop-api-4f850b3f9733.herokuapp.com/updateCargaStatus",
        {
          codigo: formData.numeroCarga,
          status: getStatusByMovimentacao(formData.tipoMovimentacao),
          observacao: formData.observacoes,
          local: formData.localDestino,
        }
      );

      if (response.data.returnCode === 200) {
        alert("Movimentação registrada com sucesso!");
        setFormData((prev) => ({
          ...prev,
          numeroCarga: "",
          tipoMovimentacao: "",
          localOrigem: "",
          localDestino: "",
          responsavel: "",
          dataMovimentacao: "",
          observacoes: "",
        }));
        fetchCargas(); // Atualizar lista de cargas
      } else {
        throw new Error(response.data.returnMsg);
      }
    } catch (error) {
      console.error("Erro ao registrar movimentação:", error);
      alert(`Erro ao registrar movimentação: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitDespacho = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateData = {
        codigo: formData.numeroCarga,
        status: "aguardando_desembaraco",
        documentos: {
          numeroDUE: formData.numeroDUE,
        },
        checkpointHistorico: [
          {
            status: "aguardando_desembaraco",
            data: new Date(),
            local: "Alfândega",
            observacao: `Despacho iniciado por ${
              despachantes.find((d) => d.id === formData.despachanteId)?.nome
            }`,
          },
        ],
      };

      const response = await axios.post(
        "https://desktop-api-4f850b3f9733.herokuapp.com/updateCarga",
        updateData
      );

      if (response.data.returnCode === 200) {
        alert("Despacho registrado com sucesso!");
        setFormData((prev) => ({
          ...prev,
          numeroCarga: "",
          numeroDUE: "",
          dataDespacho: "",
          despachanteId: "",
          documentacao: {},
          tributacao: { valorAduaneiro: "", impostoImportacao: "", iva: "" },
        }));
        fetchCargas(); // Atualizar lista de cargas
      } else {
        throw new Error(response.data.returnMsg);
      }
    } catch (error) {
      console.error("Erro ao registrar despacho:", error);
      alert(`Erro ao registrar despacho: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getStatusByMovimentacao = (tipoMovimentacao) => {
    switch (tipoMovimentacao) {
      case "entrada":
        return "coletada";
      case "saida":
        return "em_transito";
      case "transferencia":
        return "armazenada";
      case "inspecao":
        return "armazenada";
      default:
        return "coletada";
    }
  };

  // Renderizar formulários baseados no schema
  return (
    <div className="h-full flex flex-col text-gray-900">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-green-500 text-white p-2 rounded-lg mr-3">
            📥
          </span>
          Lançamentos - Operações Portuárias
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Registro de operações, movimentações de carga e processos logísticos
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveLancamentoForm("nova_carga")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeLancamentoForm === "nova_carga"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📦 Nova Carga
          </button>
          <button
            onClick={() => setActiveLancamentoForm("movimentacao")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeLancamentoForm === "movimentacao"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🚛 Movimentação
          </button>
          <button
            onClick={() => setActiveLancamentoForm("despacho")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeLancamentoForm === "despacho"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📋 Despacho
          </button>
          <button
            onClick={() => setActiveLancamentoForm("historico")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeLancamentoForm === "historico"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Histórico
          </button>
        </div>

        {/* Formulário de Nova Carga */}
        {activeLancamentoForm === "nova_carga" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6">
              {/* Cabeçalho com filtros e ações */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <span className="bg-green-500 text-white p-2 rounded-lg mr-3">
                      📦
                    </span>
                    Todas as Cargas Disponíveis
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {cargas.length} cargas registradas no sistema
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={() => window.open("/nova-carga", "_blank")}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium flex items-center"
                  >
                    <span className="mr-2">+</span> Nova Carga
                  </button>
                  <button
                    onClick={fetchCargas}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium flex items-center"
                  >
                    <span className="mr-2">↻</span> Atualizar
                  </button>
                </div>
              </div>
              {loading && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                    <span className="text-sm text-blue-600">
                      Carregando cargas...
                    </span>
                  </div>
                </div>
              )}
              {/* Filtros Avançados */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                      onChange={(e) => {
                        if (e.target.value) {
                          aplicarFiltros({
                            ...filtrosAtivos,
                            status: e.target.value,
                          });
                        } else {
                          const { status, ...outrosFiltros } = filtrosAtivos;
                          aplicarFiltros(outrosFiltros);
                        }
                      }}
                    >
                      <option value="">Todos Status</option>
                      <option value="planeada">Planeada</option>
                      <option value="aguardando_coleta">
                        Aguardando Coleta
                      </option>
                      <option value="coletada">Coletada</option>
                      <option value="em_transito">Em Trânsito</option>
                      <option value="em_fronteira">Em Fronteira</option>
                      <option value="aguardando_desembaraco">
                        Aguardando Desembaraço
                      </option>
                      <option value="em_entrega">Em Entrega</option>
                      <option value="entregue">Entregue</option>
                      <option value="encerrada">Encerrada</option>
                      <option value="armazenada">Armazenada</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Tipo de Carga
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                      onChange={(e) => {
                        if (e.target.value) {
                          aplicarFiltros({
                            ...filtrosAtivos,
                            tipoCarga: e.target.value,
                          });
                        } else {
                          const { tipoCarga, ...outrosFiltros } = filtrosAtivos;
                          aplicarFiltros(outrosFiltros);
                        }
                      }}
                    >
                      <option value="">Todos Tipos</option>
                      <option value="Contentorizada">Contentorizada</option>
                      <option value="Solta">Solta</option>
                      <option value="Granel">Granel</option>
                      <option value="Frigorífica">Frigorífica</option>
                      <option value="Perigosa">Perigosa</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Tipo de Percurso
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                      onChange={(e) => {
                        if (e.target.value) {
                          aplicarFiltros({
                            ...filtrosAtivos,
                            tipoPercurso: e.target.value,
                          });
                        } else {
                          const { tipoPercurso, ...outrosFiltros } =
                            filtrosAtivos;
                          aplicarFiltros(outrosFiltros);
                        }
                      }}
                    >
                      <option value="">Todos Percurso</option>
                      <option value="Beira-Interland">Beira-Interland</option>
                      <option value="Local">Local</option>
                      <option value="Nacional">Nacional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Categoria Seguro
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                      onChange={(e) => {
                        if (e.target.value) {
                          aplicarFiltros({
                            ...filtrosAtivos,
                            categoriaSeguro: e.target.value,
                          });
                        } else {
                          const { categoriaSeguro, ...outrosFiltros } =
                            filtrosAtivos;
                          aplicarFiltros(outrosFiltros);
                        }
                      }}
                    >
                      <option value="">Todas Categorias</option>
                      <option value="Produtos Alimentares">
                        Produtos Alimentares
                      </option>
                      <option value="Eletrónicos">Eletrónicos</option>
                      <option value="Materiais Perigosos">
                        Materiais Perigosos
                      </option>
                      <option value="Carga Geral">Carga Geral</option>
                      <option value="Carga Consolidada">
                        Carga Consolidada
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Buscar por Código/Cliente
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                        placeholder="CARGA-... ou nome"
                        onChange={(e) => {
                          if (e.target.value.length >= 3) {
                            aplicarFiltros({
                              ...filtrosAtivos,
                              codigo: e.target.value,
                              cliente: e.target.value,
                            });
                          } else if (!e.target.value) {
                            const { codigo, cliente, ...outrosFiltros } =
                              filtrosAtivos;
                            aplicarFiltros(outrosFiltros);
                          }
                        }}
                      />
                      <button
                        onClick={() => aplicarFiltros({})}
                        className="px-3 py-2 bg-gray-200 border border-gray-300 rounded-r-lg hover:bg-gray-300"
                      >
                        ↻
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mostrar filtros ativos */}
                {Object.keys(filtrosAtivos).length > 0 && (
                  <div className="mt-4">
                    <div className="text-xs font-medium text-gray-700 mb-2">
                      Filtros ativos:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(filtrosAtivos).map(([key, value]) => (
                        <span
                          key={key}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {key}: {value}
                          <button
                            onClick={() => {
                              const novosFiltros = { ...filtrosAtivos };
                              delete novosFiltros[key];
                              aplicarFiltros(novosFiltros);
                            }}
                            className="ml-1 text-blue-600 hover:text-blue-900"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <button
                        onClick={() => aplicarFiltros({})}
                        className="text-xs text-red-600 hover:text-red-900 font-medium"
                      >
                        Limpar Todos
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Estatísticas Rápidas */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Em Trânsito</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {
                          cargas.filter((c) => c.status === "em_transito")
                            .length
                        }
                      </p>
                    </div>
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <span className="text-blue-600">🚛</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Entregues</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {cargas.filter((c) => c.status === "entregue").length}
                      </p>
                    </div>
                    <div className="bg-green-100 p-2 rounded-lg">
                      <span className="text-green-600">✅</span>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Aguardando</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {
                          cargas.filter(
                            (c) => c.status === "aguardando_desembaraco"
                          ).length
                        }
                      </p>
                    </div>
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <span className="text-orange-600">⏳</span>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Com Seguro</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {
                          cargas.filter(
                            (c) => c.seguro?.statusSeguro === "ativo"
                          ).length
                        }
                      </p>
                    </div>
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <span className="text-purple-600">🛡️</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabela de Cargas */}
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Código
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Cliente
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Tipo / Destino
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Datas
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Valores
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cargas.map((carga) => (
                      <tr key={carga.codigo} className="hover:bg-gray-50">
                        {/* Código */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-blue-600 font-bold">
                                📦
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {carga.codigo}
                              </div>
                              <div className="text-sm text-gray-500">
                                {carga.tipoCarga}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Cliente */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {carga.cliente?.substring(0, 20)}
                            {carga.cliente?.length > 20 ? "..." : ""}
                          </div>
                          <div className="text-sm text-gray-500">
                            Prioridade:{" "}
                            <span
                              className={`font-medium ${
                                carga.prioridade === "urgente"
                                  ? "text-red-600"
                                  : carga.prioridade === "alta"
                                  ? "text-orange-600"
                                  : carga.prioridade === "média"
                                  ? "text-blue-600"
                                  : "text-gray-600"
                              }`}
                            >
                              {carga.prioridade}
                            </span>
                          </div>
                        </td>

                        {/* Tipo e Destino */}
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <span className="font-medium">
                              {carga.tipoPercurso}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {carga.destinoFrete?.substring(0, 25)}
                            {carga.destinoFrete?.length > 25 ? "..." : ""}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {carga.origem?.cidade} → {carga.destino?.cidade}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              carga.status === "entregue"
                                ? "bg-green-100 text-green-800"
                                : carga.status === "em_transito"
                                ? "bg-blue-100 text-blue-800"
                                : carga.status === "planeada"
                                ? "bg-gray-100 text-gray-800"
                                : carga.status === "aguardando_desembaraco"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-orange-100 text-orange-800"
                            }`}
                          >
                            {carga.status?.replace("_", " ")}
                          </span>
                          <div className="mt-1 text-xs text-gray-500">
                            {carga.pesoBruto
                              ? `${carga.pesoBruto} kg`
                              : "Sem peso"}
                          </div>
                        </td>

                        {/* Datas */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>
                            <div className="font-medium">Criação:</div>
                            <div>
                              {new Date(carga.dataCriacao).toLocaleDateString()}
                            </div>
                          </div>
                          {carga.dataEntregaPrevista && (
                            <div className="mt-1">
                              <div className="font-medium">Entrega Prev.:</div>
                              <div
                                className={carga.atrasada ? "text-red-600" : ""}
                              >
                                {new Date(
                                  carga.dataEntregaPrevista
                                ).toLocaleDateString()}
                              </div>
                            </div>
                          )}
                        </td>

                        {/* Valores */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Frete:</span>
                              <span className="font-medium">
                                {carga.valorFrete
                                  ? `MZN ${carga.valorFrete.toLocaleString(
                                      "pt-MZ"
                                    )}`
                                  : carga.freteIda
                                  ? `MZN ${carga.freteIda.toLocaleString(
                                      "pt-MZ"
                                    )}`
                                  : "-"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Seguro:</span>
                              <span className="font-medium">
                                {carga.seguro?.premioFinal
                                  ? `MZN ${carga.seguro.premioFinal.toLocaleString(
                                      "pt-MZ"
                                    )}`
                                  : "-"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Mercadoria:</span>
                              <span className="font-medium">
                                {carga.valorMercadoria
                                  ? `MZN ${carga.valorMercadoria.toLocaleString(
                                      "pt-MZ"
                                    )}`
                                  : "-"}
                              </span>
                            </div>
                            <div className="flex justify-between border-t pt-1">
                              <span className="text-gray-500 font-medium">
                                Total:
                              </span>
                              <span className="font-bold text-green-600">
                                {carga.valorTotal
                                  ? `MZN ${carga.valorTotal.toLocaleString(
                                      "pt-MZ"
                                    )}`
                                  : "-"}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Ações */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => abrirModalCarga(carga.codigo)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Ver detalhes"
                            >
                              👁️
                            </button>

                            <button
                              onClick={async () => {
                                try {
                                  const response = await axios.post(
                                    "https://desktop-api-4f850b3f9733.herokuapp.com/updateCargaStatus",
                                    {
                                      codigo: carga.codigo,
                                      status:
                                        carga.status === "em_transito"
                                          ? "entregue"
                                          : "em_transito",
                                    }
                                  );
                                  if (response.data.returnCode === 200) {
                                    fetchCargas();
                                  }
                                } catch (error) {
                                  console.error(
                                    "Erro ao atualizar status:",
                                    error
                                  );
                                }
                              }}
                              className="text-purple-600 hover:text-purple-900"
                              title={
                                carga.status === "em_transito"
                                  ? "Marcar como entregue"
                                  : "Marcar como em trânsito"
                              }
                            >
                              {carga.status === "em_transito" ? "✅" : "🚛"}
                            </button>
                          </div>

                          {/* Ações Rápidas */}
                          <div className="mt-2 flex flex-wrap gap-1">
                            {!carga.motorista?.id && (
                              <button
                                onClick={() => {
                                  // Implementar associação a camião
                                }}
                                className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700"
                              >
                                + Camião
                              </button>
                            )}

                            {!carga.gps?.codigo && (
                              <button
                                onClick={() => {
                                  // Implementar associação a GPS
                                }}
                                className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700"
                              >
                                + GPS
                              </button>
                            )}

                            {carga.seguro?.statusSeguro !== "ativo" && (
                              <button
                                onClick={async () => {
                                  try {
                                    const response = await axios.post(
                                      "/api/atualizarStatusSeguro",
                                      {
                                        codigo: carga.codigo,
                                        statusSeguro: "ativo",
                                      }
                                    );
                                    if (response.data.returnCode === 200) {
                                      fetchCargas();
                                    }
                                  } catch (error) {
                                    console.error(
                                      "Erro ao ativar seguro:",
                                      error
                                    );
                                  }
                                }}
                                className="text-xs px-2 py-1 bg-blue-100 hover:bg-blue-200 rounded text-blue-700"
                              >
                                Ativar Seguro
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {cargas.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">📭</div>
                    <p className="text-gray-500">Nenhuma carga encontrada</p>
                    <button
                      onClick={() => window.open("/nova-carga", "_blank")}
                      className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
                    >
                      Criar Primeira Carga
                    </button>
                  </div>
                )}
              </div>

              {/* Paginação */}
              {cargas.length > 0 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-700">
                    Mostrando <span className="font-medium">1</span> a{" "}
                    <span className="font-medium">
                      {Math.min(10, cargas.length)}
                    </span>{" "}
                    de <span className="font-medium">{cargas.length}</span>{" "}
                    cargas
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
                      Anterior
                    </button>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                      1
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
                      Próxima
                    </button>
                  </div>
                </div>
              )}

              {/* Painel de Informações */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    📊 Resumo Financeiro
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">Total Fretes</span>
                      <span className="font-bold text-blue-600">
                        MZN{" "}
                        {cargas
                          .reduce((sum, c) => sum + (c.freteIda || 0), 0)
                          .toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Total Seguros</span>
                      <span className="font-bold text-green-600">
                        MZN{" "}
                        {cargas
                          .reduce(
                            (sum, c) => sum + (c.seguro?.premioFinal || 0),
                            0
                          )
                          .toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm font-medium">
                        Total Mercadorias
                      </span>
                      <span className="font-bold text-purple-600">
                        MZN{" "}
                        {cargas
                          .reduce((sum, c) => sum + (c.valorMercadoria || 0), 0)
                          .toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    ⚡ Ações Rápidas
                  </h4>
                  <div className="space-y-3">
                    <button
                      onClick={() =>
                        window.open("/api/calcularCustosCarga", "_blank")
                      }
                      className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg"
                    >
                      <p className="text-sm font-medium text-gray-900">
                        Calcular Custos
                      </p>
                      <p className="text-xs text-gray-600">
                        Simular frete + seguro + comissão
                      </p>
                    </button>
                    <button
                      onClick={() =>
                        window.open("/api/getTabelasFretes", "_blank")
                      }
                      className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg"
                    >
                      <p className="text-sm font-medium text-gray-900">
                        Tabelas de Fretes
                      </p>
                      <p className="text-xs text-gray-600">
                        Consultar valores de referência
                      </p>
                    </button>
                    <button
                      onClick={() =>
                        window.open("/api/associarCargaCamiao", "_blank")
                      }
                      className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg"
                    >
                      <p className="text-sm font-medium text-gray-900">
                        Associar Caminhões
                      </p>
                      <p className="text-xs text-gray-600">
                        Vincular cargas a veículos
                      </p>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    📈 Estatísticas
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Cargas por Tipo</span>
                      </div>
                      <div className="space-y-1">
                        {Object.entries(
                          cargas.reduce((acc, c) => {
                            acc[c.tipoCarga] = (acc[c.tipoCarga] || 0) + 1;
                            return acc;
                          }, {})
                        ).map(([tipo, count]) => (
                          <div
                            key={tipo}
                            className="flex justify-between text-xs"
                          >
                            <span className="text-gray-500">{tipo}</span>
                            <span className="font-medium">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">
                          Cargas por Percurso
                        </span>
                      </div>
                      <div className="space-y-1">
                        {Object.entries(
                          cargas.reduce((acc, c) => {
                            acc[c.tipoPercurso] =
                              (acc[c.tipoPercurso] || 0) + 1;
                            return acc;
                          }, {})
                        ).map(([percurso, count]) => (
                          <div
                            key={percurso}
                            className="flex justify-between text-xs"
                          >
                            <span className="text-gray-500">{percurso}</span>
                            <span className="font-medium">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Formulário de Movimentação */}
        {activeLancamentoForm === "movimentacao" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-blue-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                  🚛
                </span>
                Movimentação de Carga
              </h3>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmitMovimentacao} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número da Carga *
                    </label>
                    <select
                      name="numeroCarga"
                      value={formData.numeroCarga}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                      required
                    >
                      <option value="">Selecione a carga</option>
                      {cargas.map((carga) => (
                        <option key={carga.codigo} value={carga.codigo}>
                          {carga.codigo} - {carga.descricao?.substring(0, 30)}
                          ...
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Movimentação *
                    </label>
                    <select
                      name="tipoMovimentacao"
                      value={formData.tipoMovimentacao}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="entrada">Entrada no Porto</option>
                      <option value="saida">Saída do Porto</option>
                      <option value="transferencia">
                        Transferência Interna
                      </option>
                      <option value="inspecao">Inspeção</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Local de Origem
                    </label>
                    <input
                      type="text"
                      name="localOrigem"
                      value={formData.localOrigem}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                      placeholder="Pátio A, Armazém 1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Local de Destino
                    </label>
                    <input
                      type="text"
                      name="localDestino"
                      value={formData.localDestino}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                      placeholder="Pátio B, Armazém 3"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data/Hora da Movimentação *
                    </label>
                    <input
                      type="datetime-local"
                      name="dataMovimentacao"
                      value={formData.dataMovimentacao}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Responsável *
                    </label>
                    <input
                      type="text"
                      name="responsavel"
                      value={formData.responsavel}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                      placeholder="Nome do operador"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observações
                  </label>
                  <textarea
                    rows={3}
                    name="observacoes"
                    value={formData.observacoes}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                    placeholder="Observações sobre a movimentação..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        numeroCarga: "",
                        tipoMovimentacao: "",
                        localOrigem: "",
                        localDestino: "",
                        responsavel: "",
                        dataMovimentacao: "",
                        observacoes: "",
                      }))
                    }
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                    disabled={loading}
                  >
                    Limpar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? "Registrando..." : "Registrar Movimentação"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Formulário de Despacho Aduaneiro */}
        {activeLancamentoForm === "despacho" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-orange-50">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-orange-500 text-white p-2 rounded-lg mr-2">
                      📋
                    </span>
                    Processo de Despacho Aduaneiro
                  </h3>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSubmitDespacho} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Número da Carga *
                        </label>
                        <select
                          name="numeroCarga"
                          value={formData.numeroCarga}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                          required
                        >
                          <option value="">Selecione a carga</option>
                          {cargas
                            .filter(
                              (c) =>
                                c.status === "aguardando_desembaraco" ||
                                c.status === "em_fronteira"
                            )
                            .map((carga) => (
                              <option key={carga.codigo} value={carga.codigo}>
                                {carga.codigo} - {carga.cliente}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Despachante Responsável *
                        </label>
                        <select
                          name="despachanteId"
                          value={formData.despachanteId}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                          required
                        >
                          <option value="">Selecione o despachante</option>
                          {despachantes.map((desp) => (
                            <option key={desp.id} value={desp.id}>
                              {desp.nome} - Reg: {desp.registro}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Número DUE *
                        </label>
                        <input
                          type="text"
                          name="numeroDUE"
                          value={formData.numeroDUE}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                          placeholder="Número da Declaração Única de Exportação"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data do Despacho *
                        </label>
                        <input
                          type="date"
                          name="dataDespacho"
                          value={formData.dataDespacho}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                          required
                        />
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Documentação
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          "Factura Comercial",
                          "BL/Conhecimento",
                          "Certificado de Origem",
                          "Lista de Embalagem",
                          "Certificado Fitossanitário",
                          "Licenças de Importação/Exportação",
                        ].map((doc) => (
                          <div key={doc} className="flex items-center">
                            <input
                              type="checkbox"
                              className="mr-3"
                              name={doc}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  documentacao: {
                                    ...prev.documentacao,
                                    [doc]: e.target.checked,
                                  },
                                }))
                              }
                            />
                            <label className="text-sm text-gray-700">
                              {doc}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Tributação (MZN)
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Valor Aduaneiro
                          </label>
                          <input
                            type="number"
                            name="valorAduaneiro"
                            value={formData.tributacao.valorAduaneiro}
                            onChange={(e) => handleInputChange(e, "tributacao")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Imposto de Importação
                          </label>
                          <input
                            type="number"
                            name="impostoImportacao"
                            value={formData.tributacao.impostoImportacao}
                            onChange={(e) => handleInputChange(e, "tributacao")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            IVA
                          </label>
                          <input
                            type="number"
                            name="iva"
                            value={formData.tributacao.iva}
                            onChange={(e) => handleInputChange(e, "tributacao")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            numeroCarga: "",
                            numeroDUE: "",
                            dataDespacho: "",
                            despachanteId: "",
                            documentacao: {},
                            tributacao: {
                              valorAduaneiro: "",
                              impostoImportacao: "",
                              iva: "",
                            },
                          }))
                        }
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                        disabled={loading}
                      >
                        Limpar
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium disabled:opacity-50"
                        disabled={loading}
                      >
                        {loading ? "Registrando..." : "Concluir Despacho"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Status do Despacho */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Status do Despacho
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-950">
                      Documentação Completa
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                    <span className="text-sm text-gray-950">
                      Análise Aduaneira
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-950">
                      Pagamento de Taxas
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-950">
                      Liberação Final
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Próximos Passos
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Verificar documentação completa</p>
                  <p>• Aguardar análise aduaneira</p>
                  <p>• Efectuar pagamento de taxas</p>
                  <p>• Receber liberação da AT</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Histórico de Lançamentos */}
        {activeLancamentoForm === "historico" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-purple-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-purple-500 text-white p-2 rounded-lg mr-2">
                  📊
                </span>
                Histórico de Lançamentos
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Histórico completo de todas as operações de carga
              </p>
            </div>
            <div className="p-6">
              {/* Filtros para histórico */}
              <div className="mb-6 bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Período
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                      <option value="today">Hoje</option>
                      <option value="week">Última Semana</option>
                      <option value="month">Último Mês</option>
                      <option value="all">Todo Período</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                      <option value="">Todos Status</option>
                      <option value="entregue">Entregues</option>
                      <option value="em_transito">Em Trânsito</option>
                      <option value="encerrada">Encerradas</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Cliente
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                      <option value="">Todos Clientes</option>
                      {clientes.slice(0, 5).map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                          {cliente.nome?.substring(0, 20) ||
                            cliente.nomeCompleto?.substring(0, 20)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Tipo de Carga
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                      <option value="">Todos Tipos</option>
                      <option value="Contentorizada">Contentorizada</option>
                      <option value="Solta">Solta</option>
                      <option value="Granel">Granel</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Tabela de Histórico */}
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Código
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Cliente
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Tipo
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Data Criação
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Última Atualização
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cargas.map((carga) => (
                      <tr key={carga.codigo} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
                              <span className="text-purple-600 text-sm">
                                📦
                              </span>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">
                                {carga.codigo}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {carga.cliente?.substring(0, 25)}
                            {carga.cliente?.length > 25 ? "..." : ""}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {carga.tipoCarga}
                          </div>
                          <div className="text-xs text-gray-500">
                            {carga.tipoPercurso}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              carga.status === "entregue"
                                ? "bg-green-100 text-green-800"
                                : carga.status === "em_transito"
                                ? "bg-blue-100 text-blue-800"
                                : carga.status === "encerrada"
                                ? "bg-gray-100 text-gray-800"
                                : carga.status === "planeada"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-orange-100 text-orange-800"
                            }`}
                          >
                            {carga.status?.replace("_", " ")}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(carga.dataCriacao).toLocaleDateString(
                            "pt-MZ"
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {carga.dataAtualizacao
                            ? new Date(
                                carga.dataAtualizacao
                              ).toLocaleDateString("pt-MZ")
                            : "-"}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => abrirModalCarga(carga.codigo)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Ver detalhes completos"
                            >
                              👁️ Detalhes
                            </button>
                            <button
                              onClick={() => {
                                // Função para ver histórico de alterações
                                console.log("Ver histórico:", carga.codigo);
                              }}
                              className="text-purple-600 hover:text-purple-900"
                              title="Ver histórico de alterações"
                            >
                              📝 Histórico
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {cargas.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">📭</div>
                    <p className="text-gray-500">
                      Nenhum registro histórico encontrado
                    </p>
                  </div>
                )}
              </div>

              {/* Paginação */}
              {cargas.length > 0 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-700">
                    Mostrando <span className="font-medium">1</span> a{" "}
                    <span className="font-medium">{cargas.length}</span> de{" "}
                    <span className="font-medium">{cargas.length}</span>{" "}
                    registros
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
                      Anterior
                    </button>
                    <button className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600">
                      1
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
                      Próxima
                    </button>
                  </div>
                </div>
              )}

              {/* Estatísticas do Histórico */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    📈 Estatísticas Gerais
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Total de Cargas
                      </span>
                      <span className="font-bold text-gray-900">
                        {cargas.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Entregues</span>
                      <span className="font-bold text-green-600">
                        {cargas.filter((c) => c.status === "entregue").length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Em Trânsito</span>
                      <span className="font-bold text-blue-600">
                        {
                          cargas.filter((c) => c.status === "em_transito")
                            .length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Com Atraso</span>
                      <span className="font-bold text-red-600">
                        {
                          cargas.filter((c) => {
                            if (!c.dataEntregaPrevista) return false;
                            return (
                              c.status !== "entregue" &&
                              new Date(c.dataEntregaPrevista) < new Date()
                            );
                          }).length
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    🏆 Top Clientes
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(
                      cargas.reduce((acc, carga) => {
                        acc[carga.cliente] = (acc[carga.cliente] || 0) + 1;
                        return acc;
                      }, {})
                    )
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 5)
                      .map(([cliente, count]) => (
                        <div
                          key={cliente}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm text-gray-600 truncate max-w-[150px]">
                            {cliente}
                          </span>
                          <span className="text-sm font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded">
                            {count}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    📊 Distribuição por Tipo
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(
                      cargas.reduce((acc, carga) => {
                        acc[carga.tipoCarga] = (acc[carga.tipoCarga] || 0) + 1;
                        return acc;
                      }, {})
                    ).map(([tipo, count]) => (
                      <div key={tipo} className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-purple-600 h-2.5 rounded-full"
                            style={{
                              width: `${(count / cargas.length) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className="ml-2 text-sm">
                          <span className="text-gray-700">{tipo}: </span>
                          <span className="font-medium">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ModalDetalhesCarga
        codigoCarga={modalCarga}
        onClose={fecharModal}
        onRefresh={fetchCargas}
      />
    </div>
  );
};
