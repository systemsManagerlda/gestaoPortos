import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

const CargaCarregada = () => {
  const [activeCarregadaForm, setActiveCarregadaForm] = useState("controle");
  const [cargas, setCargas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [selectedCarga, setSelectedCarga] = useState(null);
  const [carregamentoData, setCarregamentoData] = useState({
    caminhao: "",
    motorista: "",
    cargaId: "",
    localCarregamento: "",
    dataInicio: "",
    dataTermino: "",
    status: "agendado",
    observacoes: "",
  });

  // Estados para filtros
  const [filters, setFilters] = useState({
    curPage: 1,
    pageSize: 10,
    status: "",
    cliente: "",
    codigo: "",
    tipoPercurso: "",
  });

  useEffect(() => {
    fetchCargasCarregadas();
    fetchStats();
  }, [filters.curPage, filters.status]);

  const fetchCargasCarregadas = async () => {
    try {
      setLoading(true);

      // Ajustar filtro para buscar cargas com status de carregadas/em trânsito
      const filterData = {
        curPage: filters.curPage,
        pageSize: filters.pageSize,
        status: filters.status || undefined,
        cliente: filters.cliente || undefined,
        codigo: filters.codigo || undefined,
        tipoPercurso: filters.tipoPercurso || undefined,
      };

      const response = await axios.post(
        `${API_BASE_URL}/getCargaList`,
        filterData
      );

      if (response.data.returnCode === 200) {
        // Filtrar cargas que estão carregadas ou em trânsito
        const cargasCarregadas = response.data.data.list.filter((carga) =>
          ["coletada", "em_transito", "em_entrega"].includes(carga.status)
        );
        setCargas(cargasCarregadas);
      }
    } catch (error) {
      console.error("Erro ao buscar cargas carregadas:", error);
      // Em caso de erro, mostrar dados mock para demonstração
      setCargas(getMockCargas());
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/getCargaStats`, {
        dataInicio: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        dataFim: new Date().toISOString().split("T")[0],
      });

      if (response.data.returnCode === 200) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
      // Dados mock para demonstração
      setStats(getMockStats());
    }
  };

  const getMockCargas = () => {
    return [
      {
        codigo: "CARGA-001",
        status: "em_transito",
        dataColeta: "2024-01-15T08:30:00Z",
        dataEntregaPrevista: "2024-01-18T18:00:00Z",
        tipoCarga: "Contentorizada",
        descricao: "Cimento 25 ton",
        pesoBruto: 25000,
        origem: { cidade: "Maputo", local: "Porto de Maputo" },
        destino: { cidade: "Nampula", local: "Depósito Central" },
        cliente: "Construma Lda",
        veiculo: { matricula: "MB-1234-AB", modelo: "Volvo FH16" },
        motorista: { nome: "João Maputo", telefone: "+258 84 123 4567" },
      },
      {
        codigo: "CARGA-002",
        status: "coletada",
        dataColeta: "2024-01-15T10:15:00Z",
        tipoCarga: "Frigorífica",
        descricao: "Produtos Alimentares 8 ton",
        pesoBruto: 8000,
        origem: { cidade: "Maputo", local: "Porto de Maputo" },
        destino: { cidade: "Matola", local: "Centro Distribuição" },
        cliente: "Supermercados Moçambique",
        veiculo: { matricula: "MB-5678-CD", modelo: "Mercedes Actros" },
        motorista: { nome: "Carlos Beira", telefone: "+258 84 234 5678" },
      },
      {
        codigo: "CARGA-003",
        status: "em_transito",
        dataColeta: "2024-01-14T16:00:00Z",
        dataEntregaPrevista: "2024-01-15T14:00:00Z",
        tipoCarga: "Carga Geral",
        descricao: "Material Construção 18 ton",
        pesoBruto: 18000,
        origem: { cidade: "Beira", local: "Porto da Beira" },
        destino: { cidade: "Chimoio", local: "Obra Centro" },
        cliente: "Construções Moçambique",
        veiculo: { matricula: "MB-9012-EF", modelo: "Scania R500" },
        motorista: { nome: "António Nampula", telefone: "+258 84 345 6789" },
      },
    ];
  };

  const getMockStats = () => {
    return {
      totalCargas: 24,
      cargasEntregues: 18,
      cargasTransito: 4,
      cargasAtrasadas: 2,
      valorTotalFretes: 1200000,
      pesoTotalTransportado: 240000,
      distanciaTotal: 4800,
    };
  };

  const handleUpdateStatus = async (codigo, novoStatus) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/updateCargaStatus`, {
        codigo,
        status: novoStatus,
        observacao: "Status atualizado via interface",
        local: "Base de Controle",
      });

      if (response.data.returnCode === 200) {
        fetchCargasCarregadas();
        alert("Status atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Erro ao atualizar status");
    }
  };

  const handleCarregamentoSubmit = async (e) => {
    e.preventDefault();
    try {
      // Primeiro, atualizar a carga para status de coletada
      const statusResponse = await axios.post(
        `${API_BASE_URL}/updateCargaStatus`,
        {
          codigo: carregamentoData.cargaId,
          status: "coletada",
          observacao: `Carregamento realizado em ${carregamentoData.localCarregamento}`,
          local: carregamentoData.localCarregamento,
        }
      );

      if (statusResponse.data.returnCode === 200) {
        // Depois, atualizar os dados do veículo e motorista
        const updateResponse = await axios.post(`${API_BASE_URL}/updateCarga`, {
          codigo: carregamentoData.cargaId,
          veiculo: {
            matricula: carregamentoData.caminhao,
            modelo: carregamentoData.caminhao,
          },
          motorista: {
            nome: carregamentoData.motorista,
          },
          dataColeta: carregamentoData.dataInicio,
        });

        if (updateResponse.data.returnCode === 200) {
          alert("Carregamento registrado com sucesso!");
          setCarregamentoData({
            caminhao: "",
            motorista: "",
            cargaId: "",
            localCarregamento: "",
            dataInicio: "",
            dataTermino: "",
            status: "agendado",
            observacoes: "",
          });
          fetchCargasCarregadas();
        }
      }
    } catch (error) {
      console.error("Erro ao registrar carregamento:", error);
      alert("Erro ao registrar carregamento");
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      planeada: { color: "bg-gray-500", text: "Planeada", label: "PLANEADA" },
      aguardando_coleta: {
        color: "bg-yellow-500",
        text: "Aguardando",
        label: "AGUARDANDO",
      },
      coletada: { color: "bg-blue-500", text: "Coletada", label: "COLETADA" },
      em_transito: {
        color: "bg-green-500",
        text: "Em Trânsito",
        label: "EM TRÂNSITO",
      },
      em_entrega: {
        color: "bg-purple-500",
        text: "Em Entrega",
        label: "EM ENTREGA",
      },
      entregue: { color: "bg-teal-500", text: "Entregue", label: "ENTREGUE" },
      atrasado: { color: "bg-red-500", text: "Atrasado", label: "ATRASADO" },
    };

    const config = statusMap[status] || {
      color: "bg-gray-500",
      text: "Desconhecido",
      label: "DESCONHECIDO",
    };

    return (
      <span
        className={`${config.color} text-white px-2 py-1 rounded text-sm font-medium`}
      >
        {config.label}
      </span>
    );
  };

  const getStatusText = (status) => {
    const statusText = {
      planeada: "Planeada",
      aguardando_coleta: "Aguardando Coleta",
      coletada: "Carregando",
      em_transito: "Em Trânsito",
      em_entrega: "Em Entrega",
      entregue: "Entregue",
      encerrada: "Encerrada",
      armazenada: "Armazenada",
    };
    return statusText[status] || status;
  };

  const calculateDeliveryStatus = (carga) => {
    if (!carga.dataEntregaPrevista) return "no-prazo";

    const entregaPrevista = new Date(carga.dataEntregaPrevista);
    const agora = new Date();

    if (carga.status === "entregue") return "entregue";
    if (entregaPrevista < agora) return "atrasado";
    if ((entregaPrevista - agora) / (1000 * 60 * 60) < 24) return "proximo";
    return "no-prazo";
  };

  const getDeliveryStatusText = (status) => {
    const statusMap = {
      "no-prazo": { text: "No prazo", color: "text-green-600" },
      proximo: { text: "Próximo do prazo", color: "text-yellow-600" },
      atrasado: { text: "Atrasado", color: "text-red-600" },
      entregue: { text: "Entregue", color: "text-teal-600" },
    };
    return statusMap[status] || statusMap["no-prazo"];
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">🚛</span>
          Carga Carregada - Controle de Cargas Carregadas
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Gestão e acompanhamento de cargas já carregadas nos caminhões
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação entre Formulários */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveCarregadaForm("controle")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCarregadaForm === "controle"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Controle
          </button>
          <button
            onClick={() => setActiveCarregadaForm("carregamento")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCarregadaForm === "carregamento"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ⬆️ Carregamento
          </button>
          <button
            onClick={() => setActiveCarregadaForm("graficos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCarregadaForm === "graficos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Gráficos
          </button>
        </div>

        {/* Controle de Cargas Carregadas */}
        {activeCarregadaForm === "controle" && (
          <div className="space-y-6">
            {/* Métricas Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Carregadas
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? "..." : cargas.length}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">🚛</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    {stats
                      ? `${stats.cargasTransito} em trânsito`
                      : "Carregando..."}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Em Trânsito
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading
                        ? "..."
                        : cargas.filter((c) => c.status === "em_transito")
                            .length}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">🛣️</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    {stats
                      ? `${Math.round(
                          (stats.cargasTransito / stats.totalCargas) * 100
                        )}% da frota`
                      : "..."}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Para Carregar
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading
                        ? "..."
                        : cargas.filter((c) => c.status === "aguardando_coleta")
                            .length}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">⏳</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    {cargas.filter((c) => c.prioridade === "urgente").length}{" "}
                    urgentes
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Atrasados
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading
                        ? "..."
                        : cargas.filter(
                            (c) => calculateDeliveryStatus(c) === "atrasado"
                          ).length}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">⚠️</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    Necessita ação
                  </span>
                </div>
              </div>
            </div>

            {/* Grid Principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-gray-900">
              {/* Lista de Cargas Carregadas */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4 border-b border-gray-200 bg-blue-50 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                        📊
                      </span>
                      Cargas Carregadas - Controle em Tempo Real
                    </h3>
                    <div className="flex space-x-2">
                      <select
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                        value={filters.status}
                        onChange={(e) =>
                          setFilters({ ...filters, status: e.target.value })
                        }
                      >
                        <option value="">Todos Status</option>
                        <option value="coletada">Carregando</option>
                        <option value="em_transito">Em Trânsito</option>
                        <option value="em_entrega">Em Entrega</option>
                        <option value="entregue">Entregue</option>
                      </select>
                      <button
                        onClick={fetchCargasCarregadas}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                      >
                        Atualizar
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    {loading ? (
                      <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <p className="text-gray-600 mt-2">
                          Carregando cargas...
                        </p>
                      </div>
                    ) : cargas.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-600">
                          Nenhuma carga carregada encontrada
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cargas.map((carga, index) => (
                          <div
                            key={index}
                            className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                                    {carga.codigo}
                                  </span>
                                  {getStatusBadge(carga.status)}
                                  <span className="text-sm text-gray-600">
                                    🕒{" "}
                                    {carga.dataColeta
                                      ? new Date(
                                          carga.dataColeta
                                        ).toLocaleString("pt-PT")
                                      : "Sem data"}
                                  </span>
                                </div>
                                <p className="font-medium text-gray-900">
                                  {carga.veiculo?.matricula || "Sem veículo"} •{" "}
                                  {carga.origem?.cidade} →{" "}
                                  {carga.destino?.cidade}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {carga.tipoCarga} •{" "}
                                  {carga.pesoBruto
                                    ? `${(carga.pesoBruto / 1000).toFixed(
                                        1
                                      )} ton`
                                    : "Peso não informado"}{" "}
                                  • {carga.descricao}
                                </p>
                                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                  <span>
                                    👨‍💼{" "}
                                    {carga.motorista?.nome ||
                                      "Motorista não definido"}
                                  </span>
                                  <span>
                                    📞{" "}
                                    {carga.motorista?.telefone ||
                                      "Sem telefone"}
                                  </span>
                                  {carga.dataEntregaPrevista && (
                                    <span>
                                      ⏰ Previsão:{" "}
                                      {new Date(
                                        carga.dataEntregaPrevista
                                      ).toLocaleDateString("pt-PT")}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <p
                                  className={`text-sm font-medium ${
                                    calculateDeliveryStatus(carga) ===
                                    "atrasado"
                                      ? "text-red-600"
                                      : calculateDeliveryStatus(carga) ===
                                        "entregue"
                                      ? "text-teal-600"
                                      : "text-green-600"
                                  }`}
                                >
                                  {
                                    getDeliveryStatusText(
                                      calculateDeliveryStatus(carga)
                                    ).text
                                  }
                                </p>
                                <div className="flex space-x-2 mt-2">
                                  <button
                                    onClick={() => setSelectedCarga(carga)}
                                    className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                                  >
                                    Detalhes
                                  </button>
                                  {carga.status === "coletada" && (
                                    <button
                                      onClick={() =>
                                        handleUpdateStatus(
                                          carga.codigo,
                                          "em_transito"
                                        )
                                      }
                                      className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                                    >
                                      Iniciar Viagem
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Painel de Status e Ações */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Filtros Rápidos
                  </h4>
                  <div className="space-y-3">
                    <button
                      onClick={() =>
                        setFilters({ ...filters, status: "em_transito" })
                      }
                      className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950"
                    >
                      🟢 Em Trânsito
                    </button>
                    <button
                      onClick={() =>
                        setFilters({ ...filters, status: "coletada" })
                      }
                      className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950"
                    >
                      🟡 Carregando
                    </button>
                    <button
                      onClick={() => {
                        const cargasAtrasadas = cargas.filter(
                          (c) => calculateDeliveryStatus(c) === "atrasado"
                        );
                        // Aqui você pode implementar uma visualização específica
                      }}
                      className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950"
                    >
                      🔴 Atrasados
                    </button>
                    <button
                      onClick={() =>
                        setFilters({ ...filters, status: "entregue" })
                      }
                      className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950"
                    >
                      🔵 Entregues Hoje
                    </button>
                  </div>
                </div>

                {selectedCarga && (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Detalhes da Carga
                    </h4>
                    <div className="space-y-3 text-gray-900">
                      <div>
                        <p className="text-sm text-gray-600">Código:</p>
                        <p className="font-medium">{selectedCarga.codigo}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status:</p>
                        <p className="font-medium">
                          {getStatusText(selectedCarga.status)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Cliente:</p>
                        <p className="font-medium">{selectedCarga.cliente}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Rota:</p>
                        <p className="font-medium">
                          {selectedCarga.origem?.cidade} →{" "}
                          {selectedCarga.destino?.cidade}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Motorista:</p>
                        <p className="font-medium">
                          {selectedCarga.motorista?.nome || "Não definido"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Registro de Carregamento */}
        {activeCarregadaForm === "carregamento" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                      ⬆️
                    </span>
                    Registro de Carregamento
                  </h3>
                </div>
                <div className="p-6">
                  <form
                    onSubmit={handleCarregamentoSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Caminhão *
                        </label>
                        <select
                          required
                          value={carregamentoData.caminhao}
                          onChange={(e) =>
                            setCarregamentoData({
                              ...carregamentoData,
                              caminhao: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        >
                          <option value="">Selecione o caminhão</option>
                          <option value="MB-1234-AB">MB-1234-AB</option>
                          <option value="MB-5678-CD">MB-5678-CD</option>
                          <option value="MB-9012-EF">MB-9012-EF</option>
                          <option value="MB-3456-GH">MB-3456-GH</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Motorista *
                        </label>
                        <select
                          required
                          value={carregamentoData.motorista}
                          onChange={(e) =>
                            setCarregamentoData({
                              ...carregamentoData,
                              motorista: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        >
                          <option value="">Selecione o motorista</option>
                          <option value="João Maputo">João Maputo</option>
                          <option value="Carlos Beira">Carlos Beira</option>
                          <option value="António Nampula">
                            António Nampula
                          </option>
                          <option value="Pedro Matola">Pedro Matola</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Carga a Ser Carregada *
                        </label>
                        <select
                          required
                          value={carregamentoData.cargaId}
                          onChange={(e) => {
                            const carga = cargas.find(
                              (c) => c.codigo === e.target.value
                            );
                            setCarregamentoData({
                              ...carregamentoData,
                              cargaId: e.target.value,
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        >
                          <option value="">Selecione a carga</option>
                          {cargas
                            .filter(
                              (carga) =>
                                carga.status === "aguardando_coleta" ||
                                !carga.status
                            )
                            .map((carga) => (
                              <option key={carga.codigo} value={carga.codigo}>
                                {carga.codigo} - {carga.origem?.cidade} →{" "}
                                {carga.destino?.cidade}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Local de Carregamento *
                        </label>
                        <input
                          type="text"
                          required
                          value={carregamentoData.localCarregamento}
                          onChange={(e) =>
                            setCarregamentoData({
                              ...carregamentoData,
                              localCarregamento: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="Ex: Porto Maputo - Cais 3"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data/Hora Início *
                        </label>
                        <input
                          type="datetime-local"
                          required
                          value={carregamentoData.dataInicio}
                          onChange={(e) =>
                            setCarregamentoData({
                              ...carregamentoData,
                              dataInicio: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data/Hora Término
                        </label>
                        <input
                          type="datetime-local"
                          value={carregamentoData.dataTermino}
                          onChange={(e) =>
                            setCarregamentoData({
                              ...carregamentoData,
                              dataTermino: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status do Carregamento
                        </label>
                        <select
                          value={carregamentoData.status}
                          onChange={(e) =>
                            setCarregamentoData({
                              ...carregamentoData,
                              status: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        >
                          <option value="agendado">Agendado</option>
                          <option value="em_andamento">Em Andamento</option>
                          <option value="concluido">Concluído</option>
                          <option value="suspenso">Suspenso</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Observações do Carregamento
                      </label>
                      <textarea
                        rows={3}
                        value={carregamentoData.observacoes}
                        onChange={(e) =>
                          setCarregamentoData({
                            ...carregamentoData,
                            observacoes: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        placeholder="Observações sobre o carregamento..."
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() =>
                          setCarregamentoData({
                            caminhao: "",
                            motorista: "",
                            cargaId: "",
                            localCarregamento: "",
                            dataInicio: "",
                            dataTermino: "",
                            status: "agendado",
                            observacoes: "",
                          })
                        }
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                      >
                        Registrar Carregamento
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Painel de Informações */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Próximos Carregamentos
                </h4>
                <div className="space-y-3">
                  {cargas
                    .filter((carga) => carga.status === "aguardando_coleta")
                    .slice(0, 3)
                    .map((carga, index) => (
                      <div
                        key={index}
                        className="p-3 bg-blue-50 rounded-lg border border-blue-200"
                      >
                        <p className="text-sm font-medium text-gray-950">
                          {carga.codigo}
                        </p>
                        <p className="text-xs text-gray-600">
                          {carga.origem?.cidade} → {carga.destino?.cidade}
                        </p>
                        <p className="text-xs text-blue-600 font-medium">
                          {carga.tipoCarga} •{" "}
                          {carga.pesoBruto
                            ? `${(carga.pesoBruto / 1000).toFixed(1)} ton`
                            : ""}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gráficos */}
        {activeCarregadaForm === "graficos" && (
          <div className="space-y-6 text-gray-950">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                    📈
                  </span>
                  Dashboard de Cargas Carregadas - Métricas e Estatísticas
                </h3>
              </div>
              <div className="p-6">
                {/* Grid de Gráficos Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Status das Cargas Carregadas */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-blue-500 mr-2">📊</span>
                      Status das Cargas Carregadas
                    </h4>
                    <div className="h-64 flex items-center justify-center">
                      {stats ? (
                        <div className="text-center w-full">
                          <div className="flex justify-center mb-4">
                            <div className="relative w-32 h-32">
                              <div
                                className="w-full h-full rounded-full"
                                style={{
                                  background:
                                    "conic-gradient(#10b981 0% 75%, #3b82f6 75% 88%, #f59e0b 88% 92%, #ef4444 92% 100%)",
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                              <span>
                                Em Trânsito (
                                {Math.round(
                                  (stats.cargasTransito / stats.totalCargas) *
                                    100
                                )}
                                %)
                              </span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                              <span>
                                Para Carregar (
                                {Math.round(
                                  (cargas.filter(
                                    (c) => c.status === "aguardando_coleta"
                                  ).length /
                                    cargas.length) *
                                    100
                                )}
                                %)
                              </span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                              <span>
                                Entregues (
                                {Math.round(
                                  (stats.cargasEntregues / stats.totalCargas) *
                                    100
                                )}
                                %)
                              </span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                              <span>
                                Atrasados (
                                {Math.round(
                                  (stats.cargasAtrasadas / stats.totalCargas) *
                                    100
                                )}
                                %)
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                          <p className="text-gray-600 mt-2">
                            Carregando estatísticas...
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Métricas Rápidas */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-600 font-medium">
                        Peso Total Transportado
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats
                          ? `${(stats.pesoTotalTransportado / 1000).toFixed(
                              0
                            )} ton`
                          : "..."}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="text-sm text-green-600 font-medium">
                        Distância Total
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats ? `${stats.distanciaTotal} km` : "..."}
                      </p>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <p className="text-sm text-amber-600 font-medium">
                        Valor Total Fretes
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats
                          ? `MT ${stats.valorTotalFretes.toLocaleString()}`
                          : "..."}
                      </p>
                    </div>
                    <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                      <p className="text-sm text-cyan-600 font-medium">
                        Taxa de Entrega
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats
                          ? `${Math.round(
                              (stats.cargasEntregues / stats.totalCargas) * 100
                            )}%`
                          : "..."}
                      </p>
                    </div>
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

export default CargaCarregada;
