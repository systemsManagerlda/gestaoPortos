// components/CombustivelExpedientePanel.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

export const CombustivelExpedientePanel = ({
  activeCombustivelForm,
  setActiveCombustivelForm,
}) => {
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [camioes, setCamioes] = useState([]);
  const [motoristas, setMotoristas] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [abastecimentosLista, setAbastecimentosLista] = useState([]);
  const [despesasLista, setDespesasLista] = useState([]);
  const [consumoLista, setConsumoLista] = useState([]);
  const [selectedImages, setSelectedImages] = useState({
    fotoFactura: null,
    fotoRecibo: null,
    comprovativo: null,
    comprovativoPagamento: null,
  });
 // Estado para o modal de detalhes
  const [selectedDetalhes, setSelectedDetalhes] = useState(null);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "abastecimento" ou "despesa"

  const fileInputRef = useRef({
    fotoFactura: null,
    fotoRecibo: null,
    comprovativo: null,
    comprovativoPagamento: null,
  });

  // Form states
  const [abastecimentoForm, setAbastecimentoForm] = useState({
    camiaoId: "",
    motoristaId: "",
    tipoCombustivel: "diesel",
    quantidadeLitros: "",
    precoPorLitro: "",
    postoCombustivel: { nome: "", fornecedor: "" },
    quilometragemAtual: "",
    numeroFactura: "",
    dataAbastecimento: new Date().toISOString().slice(0, 16),
    observacoes: "",
    fotoFactura: "", // URL da foto
    comprovativo: "", // Outro comprovativo
  });

  const [despesaForm, setDespesaForm] = useState({
    camiaoId: "",
    motoristaId: "",
    tipoDespesa: "alimentacao",
    descricao: "",
    valor: "",
    localDespesa: { cidade: "", provincia: "" },
    numeroRecibo: "",
    dataDespesa: new Date().toISOString().slice(0, 10),
    metodoPagamento: "dinheiro",
    observacoes: "",
    categoria: "operacional",
    fotoRecibo: "", // URL da foto
    comprovativoPagamento: "", // Outro comprovativo
  });

  const [consumoForm, setConsumoForm] = useState({
    camiaoId: "",
    periodo: new Date().toISOString().slice(0, 7), // YYYY-MM
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);

      // Carregar lista de camiões
      const camioesResponse = await axios.post(
        `${API_BASE_URL}/getCamiaoList`,
        {
          curPage: 1,
          pageSize: 100,
        }
      );

      if (camioesResponse.data.returnCode === 200) {
        setCamioes(camioesResponse.data.data.list);
      }

      // Carregar lista de motoristas
      const motoristasResponse = await axios.post(
        `${API_BASE_URL}/getMotoristaList`,
        {
          curPage: 1,
          pageSize: 100,
        }
      );

      if (motoristasResponse.data.returnCode === 200) {
        setMotoristas(motoristasResponse.data.data.list);
      }

      // Carregar dashboard
      await loadDashboardData();
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dashboardData) {
      console.log("Dashboard atualizado:", {
        totalDespesas: dashboardData.estatisticasDespesas?.totalDespesas,
        pendentes: dashboardData.estatisticasDespesas?.totalDespesasPendentes,
      });
    }
  }, [dashboardData]);

  const loadDashboardData = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/getDashboardCombustivel`,
        {
          dataInicio: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
          )
            .toISOString()
            .split("T")[0],
          dataFim: new Date().toISOString().split("T")[0],
        }
      );

      if (response.data.returnCode === 200) {
        console.log("Dashboard data loaded:", response.data.data);
        setDashboardData(response.data.data);
      } else {
        console.error("Error loading dashboard:", response.data.returnMsg);
      }
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    }
  };

  const loadAbastecimentos = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/getAbastecimentos`, {
        curPage: 1,
        pageSize: 10,
        dataInicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          .toISOString()
          .split("T")[0],
        dataFim: new Date().toISOString().split("T")[0],
      });

      if (response.data.returnCode === 200) {
        setAbastecimentosLista(response.data.data.list || []);
      }
    } catch (error) {
      console.error("Erro ao carregar abastecimentos:", error);
    }
  };

  const loadDespesas = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/getDespesasExpediente`,
        {
          curPage: 1,
          pageSize: 10,
          dataInicio: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
          )
            .toISOString()
            .split("T")[0],
          dataFim: new Date().toISOString().split("T")[0],
        }
      );

      if (response.data.returnCode === 200) {
        setDespesasLista(response.data.data.list || []);
      }
    } catch (error) {
      console.error("Erro ao carregar despesas:", error);
    }
  };

  const loadConsumoHistorico = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/getHistoricoConsumo`, {
        periodoInicio: new Date(new Date().getFullYear(), 0, 1)
          .toISOString()
          .slice(0, 7),
        periodoFim: new Date().toISOString().slice(0, 7),
      });

      if (response.data.returnCode === 200) {
        setConsumoLista(response.data.data || []);
      }
    } catch (error) {
      console.error("Erro ao carregar histórico de consumo:", error);
    }
  };
 // Função para abrir modal de detalhes
  const openDetalhesModal = (item, type) => {
    setSelectedDetalhes(item);
    setModalType(type);
    setShowDetalhesModal(true);
  };

  // Função para fechar modal
  const closeDetalhesModal = () => {
    setShowDetalhesModal(false);
    setSelectedDetalhes(null);
    setModalType("");
  };

  const handleRegistrarAbastecimento = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Preparar dados para enviar - INCLUINDO AS URLs DAS IMAGENS
      const dadosAbastecimento = {
        camiaoId: parseInt(abastecimentoForm.camiaoId),
        motoristaId: parseInt(abastecimentoForm.motoristaId),
        tipoCombustivel: abastecimentoForm.tipoCombustivel,
        quantidadeLitros: parseFloat(abastecimentoForm.quantidadeLitros),
        precoPorLitro: parseFloat(abastecimentoForm.precoPorLitro),
        quilometragemAtual: parseInt(abastecimentoForm.quilometragemAtual),
        numeroFactura: abastecimentoForm.numeroFactura || undefined,
        dataAbastecimento: abastecimentoForm.dataAbastecimento,
        observacoes: abastecimentoForm.observacoes || undefined,
        postoCombustivel: abastecimentoForm.postoCombustivel,
        fotoFactura: abastecimentoForm.fotoFactura || undefined, // URL do S3
        comprovativo: abastecimentoForm.comprovativo || undefined, // URL do S3
      };

      console.log("Enviando abastecimento com imagens:", dadosAbastecimento);

      const response = await axios.post(
        `${API_BASE_URL}/registrarAbastecimento`,
        dadosAbastecimento
      );

      if (response.data.returnCode === 201) {
        alert("Abastecimento registrado com sucesso!");
        // Resetar formulário e imagens
        setAbastecimentoForm({
          camiaoId: "",
          motoristaId: "",
          tipoCombustivel: "diesel",
          quantidadeLitros: "",
          precoPorLitro: "",
          postoCombustivel: { nome: "", fornecedor: "" },
          quilometragemAtual: "",
          numeroFactura: "",
          dataAbastecimento: new Date().toISOString().slice(0, 16),
          observacoes: "",
          fotoFactura: "",
          comprovativo: "",
        });
        setSelectedImages((prev) => ({
          ...prev,
          fotoFactura: null,
          comprovativo: null,
        }));

        // Atualizar dados
        await Promise.all([loadDashboardData(), loadAbastecimentos()]);
      } else {
        alert(`Erro: ${response.data.returnMsg}`);
      }
    } catch (error) {
      console.error("Erro ao registrar abastecimento:", error);
      if (error.response?.data?.returnMsg) {
        alert(`Erro: ${error.response.data.returnMsg}`);
      } else {
        alert("Erro ao registrar abastecimento. Verifique os dados.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    // Verificar tamanho máximo (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("A imagem é muito grande. Tamanho máximo: 5MB");
      return;
    }

    // Verificar tipo de arquivo
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
      "image/webp",
    ];
    if (!validTypes.includes(file.type)) {
      alert(
        "Tipo de arquivo inválido. Use apenas imagens (JPEG, PNG, GIF, WebP)"
      );
      return;
    }

    // Pré-visualização local
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImages((prev) => ({
        ...prev,
        [type]: e.target.result,
      }));
    };
    reader.readAsDataURL(file);

    try {
      // Fazer upload para o S3 usando sua rota
      const imageUrl = await handleImageUpload(file, type);

      if (imageUrl) {
        console.log(`Imagem ${type} enviada com sucesso:`, imageUrl);

        // Atualizar o formulário com a URL da imagem do S3
        if (type === "fotoFactura" || type === "comprovativo") {
          setAbastecimentoForm((prev) => ({
            ...prev,
            [type]: imageUrl,
          }));
        } else if (type === "fotoRecibo" || type === "comprovativoPagamento") {
          setDespesaForm((prev) => ({
            ...prev,
            [type]: imageUrl,
          }));
        }
      } else {
        // Se o upload falhar, remover a pré-visualização
        setSelectedImages((prev) => ({
          ...prev,
          [type]: null,
        }));
        alert("Falha ao fazer upload da imagem. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      setSelectedImages((prev) => ({
        ...prev,
        [type]: null,
      }));
      alert("Erro ao processar a imagem.");
    }
  };

  const handleRemoveImage = (type) => {
    setSelectedImages((prev) => ({
      ...prev,
      [type]: null,
    }));

    if (type === "fotoFactura" || type === "comprovativo") {
      setAbastecimentoForm((prev) => ({
        ...prev,
        [type]: "",
      }));
    } else if (type === "fotoRecibo" || type === "comprovativoPagamento") {
      setDespesaForm((prev) => ({
        ...prev,
        [type]: "",
      }));
    }

    // Limpar input de arquivo
    if (fileInputRef.current[type]) {
      fileInputRef.current[type].value = "";
    }
  };

  const calcularDespesasLocalmente = () => {
    if (!despesasLista || despesasLista.length === 0) {
      return { totalDespesas: 0, totalDespesasPendentes: 0 };
    }

    const totalDespesas = despesasLista
      .filter((d) => d.status === "pago" || d.status === "reembolsado")
      .reduce((sum, d) => sum + (d.valor || 0), 0);

    const totalDespesasPendentes = despesasLista
      .filter((d) => d.status === "pendente")
      .reduce((sum, d) => sum + (d.valor || 0), 0);

    return { totalDespesas, totalDespesasPendentes };
  };
  // No render, use esta função:
  const despesasCalculadas = calcularDespesasLocalmente();
  const handleRegistrarDespesa = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dadosDespesa = {
        camiaoId: parseInt(despesaForm.camiaoId),
        motoristaId: parseInt(despesaForm.motoristaId),
        tipoDespesa: despesaForm.tipoDespesa,
        descricao: despesaForm.descricao,
        valor: parseFloat(despesaForm.valor),
        localDespesa: despesaForm.localDespesa,
        numeroRecibo: despesaForm.numeroRecibo || undefined,
        dataDespesa: despesaForm.dataDespesa,
        metodoPagamento: despesaForm.metodoPagamento,
        observacoes: despesaForm.observacoes || undefined,
        categoria: despesaForm.categoria,
        fotoRecibo: despesaForm.fotoRecibo || undefined, // URL do S3
        comprovativoPagamento: despesaForm.comprovativoPagamento || undefined, // URL do S3
      };

      console.log("Enviando despesa com imagens:", dadosDespesa);

      const response = await axios.post(
        `${API_BASE_URL}/registrarDespesaExpediente`,
        dadosDespesa
      );

      if (response.data.returnCode === 201) {
        alert("Despesa registrada com sucesso!");
        // Resetar formulário e imagens
        setDespesaForm({
          camiaoId: "",
          motoristaId: "",
          tipoDespesa: "alimentacao",
          descricao: "",
          valor: "",
          localDespesa: { cidade: "", provincia: "" },
          numeroRecibo: "",
          dataDespesa: new Date().toISOString().slice(0, 10),
          metodoPagamento: "dinheiro",
          observacoes: "",
          categoria: "operacional",
          fotoRecibo: "",
          comprovativoPagamento: "",
        });
        setSelectedImages((prev) => ({
          ...prev,
          fotoRecibo: null,
          comprovativoPagamento: null,
        }));

        await Promise.all([loadDashboardData(), loadDespesas()]);
      } else {
        alert(`Erro: ${response.data.returnMsg}`);
      }
    } catch (error) {
      console.error("Erro ao registrar despesa:", error);
      if (error.response?.data?.returnMsg) {
        alert(`Erro: ${error.response.data.returnMsg}`);
      } else {
        alert("Erro ao registrar despesa. Verifique os dados.");
      }
    } finally {
      setLoading(false);
    }
  };

  const ImageUploader = ({ type, label, currentImage, onRemove }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {currentImage ? (
        <div className="relative">
          <img
            src={currentImage}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-gray-300"
          />
          <button
            type="button"
            onClick={() => onRemove(type)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            title="Remover imagem"
            disabled={uploadingImage}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer ${
            uploadingImage
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-500"
          }`}
          onClick={() => !uploadingImage && fileInputRef.current[type]?.click()}
        >
          {uploadingImage ? (
            <>
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-sm text-blue-600">Enviando imagem...</p>
            </>
          ) : (
            <>
              <svg
                className="w-12 h-12 mx-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                Clique para adicionar imagem
              </p>
              <p className="text-xs text-gray-500">
                JPEG, PNG, GIF, WebP (max. 5MB)
              </p>
            </>
          )}
        </div>
      )}

      <input
        type="file"
        ref={(el) => (fileInputRef.current[type] = el)}
        onChange={(e) => handleImageSelect(e, type)}
        accept="image/*"
        className="hidden"
        disabled={uploadingImage}
      />
    </div>
  );

  const handleCalcularConsumoMensal = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/calcularConsumoMensal`,
        {
          camiaoId: parseInt(consumoForm.camiaoId),
          periodo: consumoForm.periodo,
        }
      );

      if (response.data.returnCode === 201) {
        alert("Consumo mensal calculado com sucesso!");
        setConsumoForm({
          camiaoId: "",
          periodo: new Date().toISOString().slice(0, 7),
        });
        await loadConsumoHistorico();
      } else {
        alert(`Erro: ${response.data.returnMsg}`);
      }
    } catch (error) {
      console.error("Erro ao calcular consumo:", error);
      if (error.response?.data?.returnMsg) {
        alert(`Erro: ${error.response.data.returnMsg}`);
      } else {
        alert("Erro ao calcular consumo mensal.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGerarRelatorio = async () => {
    try {
      const dataInicio = prompt(
        "Data início (YYYY-MM-DD):",
        new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          .toISOString()
          .split("T")[0]
      );

      const dataFim = prompt(
        "Data fim (YYYY-MM-DD):",
        new Date().toISOString().split("T")[0]
      );

      if (!dataInicio || !dataFim) return;

      const response = await axios.post(
        `${API_BASE_URL}/gerarRelatorioCombustivel`,
        {
          dataInicio,
          dataFim,
          formato: "json",
        }
      );

      if (response.data.returnCode === 200) {
        console.log("Relatório gerado:", response.data.data);
        alert("Relatório gerado com sucesso! Verifique o console.");
      }
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      alert("Erro ao gerar relatório.");
    }
  };

  const handleImageUpload = async (file, type) => {
    if (!file) return null;

    try {
      setUploadingImage(true);

      // Criar FormData para upload usando sua rota
      const formData = new FormData();
      formData.append("file", file);
      // Adicione outros parâmetros necessários
      formData.append("nomeEmpresa", "transportadora"); // Ajuste conforme necessário

      // Usar sua rota docUpload
      const response = await axios.post(`${API_BASE_URL}/docUpload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        // Sua rota retorna apenas o link
        return response.data; // Retorna a URL do S3
      }

      return null;
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      alert("Erro ao fazer upload da imagem. Tente novamente.");
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAprovarDespesa = async (despesaId, acao) => {
    if (!confirm(`Deseja ${acao} esta despesa?`)) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/aprovarDespesa`, {
        despesaId: parseInt(despesaId),
        acao,
      });

      if (response.data.returnCode === 200) {
        alert(`Despesa ${acao}da com sucesso!`);

        // Atualizar dados
        await Promise.all([
          loadDashboardData(), // Atualiza estatísticas do dashboard
          loadDespesas(), // Atualiza lista de despesas
        ]);
      } else {
        alert(`Erro: ${response.data.returnMsg}`);
      }
    } catch (error) {
      console.error("Erro ao aprovar despesa:", error);
      alert("Erro ao processar despesa.");
    }
  };

  useEffect(() => {
    if (activeCombustivelForm === "abastecimento") {
      loadAbastecimentos();
    } else if (activeCombustivelForm === "despesas") {
      loadDespesas();
    } else if (activeCombustivelForm === "controle_consumo") {
      loadConsumoHistorico();
    }
  }, [activeCombustivelForm]);

  const getTipoDespesaTexto = (tipo) => {
    const tipos = {
      alimentacao: "Alimentação",
      portagem: "Portagem",
      manutencao: "Manutenção",
      alojamento: "Alojamento",
      parqueamento: "Parqueamento",
      lavagem: "Lavagem",
      outros: "Outros",
    };
    return tipos[tipo] || tipo;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "pago":
      case "confirmado":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelado":
      case "rejeitado":
        return "bg-red-100 text-red-800 border-red-200";
      case "reembolsado":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
const getTipoCombustivelTexto = (tipo) => {
    const tipos = {
      diesel: "Diesel",
      gasolina: "Gasolina",
      diesel_premium: "Diesel Premium",
      gasoleo: "Gasóleo",
    };
    return tipos[tipo] || tipo;
  };
  const formatCurrency = (value) => {
    return `MT ${parseFloat(value).toFixed(2)}`;
  };
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading && !dashboardData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  // Componente Modal de Detalhes
  const DetalhesModal = () => {
    if (!showDetalhesModal || !selectedDetalhes) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
          <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              {modalType === "abastecimento" ? "📋 Detalhes do Abastecimento" : "💰 Detalhes da Despesa"}
            </h3>
            <button
              onClick={closeDetalhesModal}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6">
            {modalType === "abastecimento" ? (
              // Modal de Detalhes do Abastecimento
              <div className="space-y-6">
                {/* Cabeçalho com informações principais */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Código</p>
                    <p className="font-semibold">{selectedDetalhes.codigoAbastecimento}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Data</p>
                    <p className="font-semibold">{formatDate(selectedDetalhes.dataAbastecimento)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedDetalhes.status)}`}>
                      {selectedDetalhes.status}
                    </span>
                  </div>
                </div>

                {/* Informações do Veículo e Motorista */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">🚛 Informações do Veículo</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Matrícula:</span>
                        <span className="font-medium">{selectedDetalhes.camiaoInfo?.matricula || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Marca/Modelo:</span>
                        <span className="font-medium">
                          {selectedDetalhes.camiaoInfo?.marca || ""} {selectedDetalhes.camiaoInfo?.modelo || ""}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Quilometragem:</span>
                        <span className="font-medium">{selectedDetalhes.quilometragemAtual?.toLocaleString()} km</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">👤 Informações do Motorista</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Nome:</span>
                        <span className="font-medium">{selectedDetalhes.motoristaInfo?.nomeCompleto || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">ID Motorista:</span>
                        <span className="font-medium">{selectedDetalhes.motoristaId}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detalhes do Abastecimento */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">⛽ Detalhes do Abastecimento</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Tipo de Combustível</p>
                      <p className="font-semibold">{getTipoCombustivelTexto(selectedDetalhes.tipoCombustivel)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Quantidade</p>
                      <p className="font-semibold">{selectedDetalhes.quantidadeLitros?.toFixed(0)} Litros</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Preço por Litro</p>
                      <p className="font-semibold">{formatCurrency(selectedDetalhes.precoPorLitro)}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Valor Total</p>
                      <p className="text-xl font-bold text-blue-600">{formatCurrency(selectedDetalhes.valorTotal)}</p>
                    </div>
                    {selectedDetalhes.consumoMedio && (
                      <div>
                        <p className="text-sm text-gray-600">Consumo Médio</p>
                        <p className="text-xl font-bold text-green-600">
                          {selectedDetalhes.consumoMedio?.toFixed(2)} km/L
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Local do Abastecimento */}
                {selectedDetalhes.postoCombustivel && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">📍 Local do Abastecimento</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Posto:</span>
                        <span className="font-medium">{selectedDetalhes.postoCombustivel.nome}</span>
                      </div>
                      {selectedDetalhes.postoCombustivel.fornecedor && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Fornecedor:</span>
                          <span className="font-medium">{selectedDetalhes.postoCombustivel.fornecedor}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Documentação */}
                {(selectedDetalhes.fotoFactura || selectedDetalhes.comprovativo) && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">📄 Documentação</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedDetalhes.fotoFactura && (
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Factura</p>
                          <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <img
                              src={selectedDetalhes.fotoFactura}
                              alt="Factura"
                              className="w-full h-48 object-contain cursor-pointer hover:opacity-90"
                              onClick={() => window.open(selectedDetalhes.fotoFactura, '_blank')}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/400x300?text=Imagem+Não+Disponível";
                              }}
                            />
                            <div className="p-2 bg-gray-100">
                              <button
                                onClick={() => window.open(selectedDetalhes.fotoFactura, '_blank')}
                                className="text-sm text-blue-600 hover:text-blue-800 w-full text-center"
                              >
                                Abrir imagem
                              </button>
                            </div>
                          </div>
                          {selectedDetalhes.numeroFactura && (
                            <p className="text-xs text-gray-500 mt-1">Nº: {selectedDetalhes.numeroFactura}</p>
                          )}
                        </div>
                      )}
                      
                      {selectedDetalhes.comprovativo && (
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Outro Comprovativo</p>
                          <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <img
                              src={selectedDetalhes.comprovativo}
                              alt="Comprovativo"
                              className="w-full h-48 object-contain cursor-pointer hover:opacity-90"
                              onClick={() => window.open(selectedDetalhes.comprovativo, '_blank')}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/400x300?text=Imagem+Não+Disponível";
                              }}
                            />
                            <div className="p-2 bg-gray-100">
                              <button
                                onClick={() => window.open(selectedDetalhes.comprovativo, '_blank')}
                                className="text-sm text-blue-600 hover:text-blue-800 w-full text-center"
                              >
                                Abrir imagem
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Observações */}
                {selectedDetalhes.observacoes && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">📝 Observações</h4>
                    <p className="text-gray-700">{selectedDetalhes.observacoes}</p>
                  </div>
                )}

                {/* Informações de Registro */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">🕒 Informações de Registro</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Registrado por:</p>
                      <p className="font-medium">{selectedDetalhes.registradoPor || "Sistema"}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Data de registro:</p>
                      <p className="font-medium">
                        {selectedDetalhes.dataRegistro ? formatDate(selectedDetalhes.dataRegistro) : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Modal de Detalhes da Despesa
              <div className="space-y-6">
                {/* Cabeçalho com informações principais */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-amber-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Código</p>
                    <p className="font-semibold">{selectedDetalhes.codigoDespesa}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Data</p>
                    <p className="font-semibold">{formatDate(selectedDetalhes.dataDespesa)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedDetalhes.status)}`}>
                      {selectedDetalhes.status}
                    </span>
                  </div>
                </div>

                {/* Informações Básicas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">💰 Informações da Despesa</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Tipo</p>
                        <p className="font-semibold">{getTipoDespesaTexto(selectedDetalhes.tipoDespesa)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Categoria</p>
                        <p className="font-medium">{selectedDetalhes.categoria}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Valor</p>
                        <p className="text-xl font-bold text-amber-600">{formatCurrency(selectedDetalhes.valor)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">📍 Localização</h4>
                    <div className="space-y-2">
                      {selectedDetalhes.localDespesa?.cidade && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Cidade:</span>
                          <span className="font-medium">{selectedDetalhes.localDespesa.cidade}</span>
                        </div>
                      )}
                      {selectedDetalhes.localDespesa?.provincia && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Província:</span>
                          <span className="font-medium">{selectedDetalhes.localDespesa.provincia}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Descrição */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">📋 Descrição</h4>
                  <p className="text-gray-700">{selectedDetalhes.descricao}</p>
                </div>

                {/* Método de Pagamento e Centro de Custo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">💳 Método de Pagamento</h4>
                    <div className="space-y-2">
                      <p className="font-medium">{selectedDetalhes.metodoPagamento}</p>
                      {selectedDetalhes.numeroRecibo && (
                        <div>
                          <p className="text-sm text-gray-600">Número do Recibo</p>
                          <p className="font-medium">{selectedDetalhes.numeroRecibo}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedDetalhes.centroCusto && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">🏷️ Centro de Custo</h4>
                      <p className="font-medium">{selectedDetalhes.centroCusto}</p>
                    </div>
                  )}
                </div>

                {/* Documentação */}
                {(selectedDetalhes.fotoRecibo || selectedDetalhes.comprovativoPagamento) && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">📄 Comprovativos</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedDetalhes.fotoRecibo && (
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Recibo</p>
                          <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <img
                              src={selectedDetalhes.fotoRecibo}
                              alt="Recibo"
                              className="w-full h-48 object-contain cursor-pointer hover:opacity-90"
                              onClick={() => window.open(selectedDetalhes.fotoRecibo, '_blank')}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/400x300?text=Imagem+Não+Disponível";
                              }}
                            />
                            <div className="p-2 bg-gray-100">
                              <button
                                onClick={() => window.open(selectedDetalhes.fotoRecibo, '_blank')}
                                className="text-sm text-blue-600 hover:text-blue-800 w-full text-center"
                              >
                                Abrir imagem
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {selectedDetalhes.comprovativoPagamento && (
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Outro Comprovativo</p>
                          <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <img
                              src={selectedDetalhes.comprovativoPagamento}
                              alt="Comprovativo de Pagamento"
                              className="w-full h-48 object-contain cursor-pointer hover:opacity-90"
                              onClick={() => window.open(selectedDetalhes.comprovativoPagamento, '_blank')}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/400x300?text=Imagem+Não+Disponível";
                              }}
                            />
                            <div className="p-2 bg-gray-100">
                              <button
                                onClick={() => window.open(selectedDetalhes.comprovativoPagamento, '_blank')}
                                className="text-sm text-blue-600 hover:text-blue-800 w-full text-center"
                              >
                                Abrir imagem
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Informações Adicionais */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedDetalhes.observacoes && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">📝 Observações</h4>
                      <p className="text-gray-700">{selectedDetalhes.observacoes}</p>
                    </div>
                  )}

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">🕒 Informações de Registro</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-gray-600">Registrado por:</p>
                        <p className="font-medium">{selectedDetalhes.registradoPor || "Sistema"}</p>
                      </div>
                      {selectedDetalhes.dataRegistro && (
                        <div>
                          <p className="text-gray-600">Data de registro:</p>
                          <p className="font-medium">{formatDate(selectedDetalhes.dataRegistro)}</p>
                        </div>
                      )}
                      {selectedDetalhes.dataPagamento && (
                        <div>
                          <p className="text-gray-600">Data de pagamento:</p>
                          <p className="font-medium">{formatDate(selectedDetalhes.dataPagamento)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
            <button
              onClick={closeDetalhesModal}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 text-gray-900">
      <DetalhesModal />
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-orange-500 text-white p-2 rounded-lg mr-3">
            ⛽
          </span>
          Combustível e Expediente - Gestão Operacional
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Controle de abastecimento, consumo de combustível e gestão de
          expedientes da frota
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveCombustivelForm("abastecimento")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
              activeCombustivelForm === "abastecimento"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ⛽ Abastecimento
          </button>
          <button
            onClick={() => setActiveCombustivelForm("despesas")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
              activeCombustivelForm === "despesas"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            💰 Despesas de Expediente
          </button>
          <button
            onClick={() => setActiveCombustivelForm("controle_consumo")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
              activeCombustivelForm === "controle_consumo"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Controle de Consumo
          </button>
          <button
            onClick={() => setActiveCombustivelForm("dashboard")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
              activeCombustivelForm === "dashboard"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Dashboard
          </button>
          <button
            onClick={() => setActiveCombustivelForm("relatorios")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
              activeCombustivelForm === "relatorios"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📄 Relatórios
          </button>
        </div>

        {/* Formulário de Abastecimento */}
        {activeCombustivelForm === "abastecimento" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-orange-50">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-orange-500 text-white p-2 rounded-lg mr-2">
                      ⛽
                    </span>
                    Registro de Abastecimento
                  </h3>
                </div>
                <div className="p-6">
                  <form
                    onSubmit={handleRegistrarAbastecimento}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Veículo/Camião *
                        </label>
                        <select
                          value={abastecimentoForm.camiaoId}
                          onChange={(e) =>
                            setAbastecimentoForm({
                              ...abastecimentoForm,
                              camiaoId: e.target.value,
                            })
                          }
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                        >
                          <option value="">Selecione o veículo</option>
                          {camioes.map((camiao) => (
                            <option
                              key={camiao.camiaoId}
                              value={camiao.camiaoId}
                            >
                              {camiao.matricula} - {camiao.marca}{" "}
                              {camiao.modelo}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Motorista *
                        </label>
                        <select
                          value={abastecimentoForm.motoristaId}
                          onChange={(e) =>
                            setAbastecimentoForm({
                              ...abastecimentoForm,
                              motoristaId: e.target.value,
                            })
                          }
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                        >
                          <option value="">Selecione o motorista</option>
                          {motoristas.map((motorista) => (
                            <option
                              key={motorista.motoristaId}
                              value={motorista.motoristaId}
                            >
                              {motorista.nomeCompleto} ({motorista.motoristaId})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Combustível *
                        </label>
                        <select
                          value={abastecimentoForm.tipoCombustivel}
                          onChange={(e) =>
                            setAbastecimentoForm({
                              ...abastecimentoForm,
                              tipoCombustivel: e.target.value,
                            })
                          }
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                        >
                          <option value="diesel">Diesel</option>
                          <option value="gasolina">Gasolina</option>
                          <option value="diesel_premium">Diesel Premium</option>
                          <option value="gasoleo">Gasóleo</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quilometragem Atual *
                        </label>
                        <input
                          type="number"
                          value={abastecimentoForm.quilometragemAtual}
                          onChange={(e) =>
                            setAbastecimentoForm({
                              ...abastecimentoForm,
                              quilometragemAtual: e.target.value,
                            })
                          }
                          required
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                          placeholder="Ex: 125000"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quantidade (Litros) *
                        </label>
                        <input
                          type="number"
                          value={abastecimentoForm.quantidadeLitros}
                          onChange={(e) =>
                            setAbastecimentoForm({
                              ...abastecimentoForm,
                              quantidadeLitros: e.target.value,
                            })
                          }
                          required
                          step="0.01"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preço por Litro (MT) *
                        </label>
                        <input
                          type="number"
                          value={abastecimentoForm.precoPorLitro}
                          onChange={(e) =>
                            setAbastecimentoForm({
                              ...abastecimentoForm,
                              precoPorLitro: e.target.value,
                            })
                          }
                          required
                          step="0.01"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Valor Total (MT)
                        </label>
                        <input
                          type="text"
                          value={(
                            parseFloat(
                              abastecimentoForm.quantidadeLitros || 0
                            ) * parseFloat(abastecimentoForm.precoPorLitro || 0)
                          ).toFixed(2)}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-950"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data e Hora do Abastecimento *
                        </label>
                        <input
                          type="datetime-local"
                          value={abastecimentoForm.dataAbastecimento}
                          onChange={(e) =>
                            setAbastecimentoForm({
                              ...abastecimentoForm,
                              dataAbastecimento: e.target.value,
                            })
                          }
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Posto de Combustível
                        </label>
                        <input
                          type="text"
                          value={abastecimentoForm.postoCombustivel.nome}
                          onChange={(e) =>
                            setAbastecimentoForm({
                              ...abastecimentoForm,
                              postoCombustivel: {
                                ...abastecimentoForm.postoCombustivel,
                                nome: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                          placeholder="Ex: Galp - Av. 24 de Julho"
                        />
                      </div>
                    </div>

                    {/* Seção de Upload de Imagens para Abastecimento */}
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="text-blue-500 mr-2">📸</span>
                        Documentação do Abastecimento
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <ImageUploader
                          type="fotoFactura"
                          label="Foto da Factura"
                          currentImage={selectedImages.fotoFactura}
                          onRemove={handleRemoveImage}
                        />
                        
                        <ImageUploader
                          type="comprovativo"
                          label="Outro Comprovativo"
                          currentImage={selectedImages.comprovativo}
                          onRemove={handleRemoveImage}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Número da Factura
                        </label>
                        <input
                          type="text"
                          value={abastecimentoForm.numeroFactura}
                          onChange={(e) =>
                            setAbastecimentoForm({
                              ...abastecimentoForm,
                              numeroFactura: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                          placeholder="Número do documento"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fornecedor
                        </label>
                        <select
                          value={abastecimentoForm.postoCombustivel.fornecedor}
                          onChange={(e) =>
                            setAbastecimentoForm({
                              ...abastecimentoForm,
                              postoCombustivel: {
                                ...abastecimentoForm.postoCombustivel,
                                fornecedor: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                        >
                          <option value="">Selecione</option>
                          <option value="galp">Galp</option>
                          <option value="total">Total</option>
                          <option value="puma">Puma</option>
                          <option value="bp">BP</option>
                          <option value="outro">Outro</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Observações
                      </label>
                      <textarea
                        rows={3}
                        value={abastecimentoForm.observacoes}
                        onChange={(e) =>
                          setAbastecimentoForm({
                            ...abastecimentoForm,
                            observacoes: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                        placeholder="Observações sobre o abastecimento..."
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => {
                          setAbastecimentoForm({
                            camiaoId: "",
                            motoristaId: "",
                            tipoCombustivel: "diesel",
                            quantidadeLitros: "",
                            precoPorLitro: "",
                            postoCombustivel: { nome: "", fornecedor: "" },
                            quilometragemAtual: "",
                            numeroFactura: "",
                            dataAbastecimento: new Date()
                              .toISOString()
                              .slice(0, 16),
                            observacoes: "",
                            fotoFactura: "",
                            comprovativo: "",
                          });
                          setSelectedImages({
                            fotoFactura: null,
                            comprovativo: null,
                          });
                        }}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                        disabled={loading}
                      >
                        Limpar
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium disabled:opacity-50"
                      >
                        {loading ? "Processando..." : "Registrar Abastecimento"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

               {/* Lista de Abastecimentos Recentes - ATUALIZADA */}
              <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="font-semibold text-gray-900">
                    Últimos Abastecimentos
                  </h3>
                </div>
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Data
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Veículo
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Litros
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Valor
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {abastecimentosLista.map((abastecimento, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm">
                              {new Date(
                                abastecimento.dataAbastecimento
                              ).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {abastecimento.camiaoInfo?.matricula || "N/A"}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {abastecimento.quantidadeLitros.toFixed(0)} L
                            </td>
                            <td className="px-4 py-3 text-sm font-medium">
                              MT {abastecimento.valorTotal.toFixed(2)}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                                  abastecimento.status
                                )}`}
                              >
                                {abastecimento.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => openDetalhesModal(abastecimento, "abastecimento")}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Detalhes
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Painel de Estatísticas */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Consumo do Mês
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg text-gray-950">
                    <span className="text-sm font-medium">
                      Litros Consumidos
                    </span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                      {dashboardData?.estatisticasCombustivel?.totalLitros
                        ? `${dashboardData.estatisticasCombustivel.totalLitros.toFixed(
                            0
                          )} L`
                        : "0 L"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg text-gray-950">
                    <span className="text-sm font-medium">Custo Total</span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                      {dashboardData?.estatisticasCombustivel?.totalCusto
                        ? `MT ${dashboardData.estatisticasCombustivel.totalCusto.toFixed(
                            0
                          )}`
                        : "MT 0"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg text-gray-950">
                    <span className="text-sm font-medium">Consumo Médio</span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                      {dashboardData?.estatisticasCombustivel?.mediaConsumo
                        ? `${dashboardData.estatisticasCombustivel.mediaConsumo.toFixed(
                            2
                          )} km/L`
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Preços de Referência
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Diesel:</span>
                    <span className="font-semibold text-gray-950">
                      MT 95,50/L
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gasolina:</span>
                    <span className="font-semibold text-gray-950">
                      MT 98,75/L
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Diesel Premium:</span>
                    <span className="font-semibold text-gray-950">
                      MT 102,30/L
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Formulário de Despesas de Expediente */}
        {activeCombustivelForm === "despesas" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-amber-50">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-amber-600 text-white p-2 rounded-lg mr-2">
                      💰
                    </span>
                    Gestão de Despesas de Viagem
                  </h3>
                </div>
                <div className="p-6">
                  <form onSubmit={handleRegistrarDespesa} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Veículo/Camião *
                        </label>
                        <select
                          value={despesaForm.camiaoId}
                          onChange={(e) =>
                            setDespesaForm({
                              ...despesaForm,
                              camiaoId: e.target.value,
                            })
                          }
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                        >
                          <option value="">Selecione o veículo</option>
                          {camioes.map((camiao) => (
                            <option
                              key={camiao.camiaoId}
                              value={camiao.camiaoId}
                            >
                              {camiao.matricula} - {camiao.marca}{" "}
                              {camiao.modelo}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Motorista *
                        </label>
                        <select
                          value={despesaForm.motoristaId}
                          onChange={(e) =>
                            setDespesaForm({
                              ...despesaForm,
                              motoristaId: e.target.value,
                            })
                          }
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                        >
                          <option value="">Selecione o motorista</option>
                          {motoristas.map((motorista) => (
                            <option
                              key={motorista.motoristaId}
                              value={motorista.motoristaId}
                            >
                              {motorista.nomeCompleto} ({motorista.motoristaId})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Despesa *
                        </label>
                        <select
                          value={despesaForm.tipoDespesa}
                          onChange={(e) =>
                            setDespesaForm({
                              ...despesaForm,
                              tipoDespesa: e.target.value,
                            })
                          }
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                        >
                          <option value="alimentacao">Alimentação</option>
                          <option value="portagem">Portagens</option>
                          <option value="manutencao">Manutenção</option>
                          <option value="alojamento">Alojamento</option>
                          <option value="parqueamento">Parqueamento</option>
                          <option value="lavagem">Lavagem</option>
                          <option value="outros">Outros</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Categoria
                        </label>
                        <select
                          value={despesaForm.categoria}
                          onChange={(e) =>
                            setDespesaForm({
                              ...despesaForm,
                              categoria: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                        >
                          <option value="operacional">Operacional</option>
                          <option value="manutencao">Manutenção</option>
                          <option value="administrativo">Administrativo</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Valor (MT) *
                        </label>
                        <input
                          type="number"
                          value={despesaForm.valor}
                          onChange={(e) =>
                            setDespesaForm({
                              ...despesaForm,
                              valor: e.target.value,
                            })
                          }
                          required
                          step="0.01"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data da Despesa *
                        </label>
                        <input
                          type="date"
                          value={despesaForm.dataDespesa}
                          onChange={(e) =>
                            setDespesaForm({
                              ...despesaForm,
                              dataDespesa: e.target.value,
                            })
                          }
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição *
                      </label>
                      <input
                        type="text"
                        value={despesaForm.descricao}
                        onChange={(e) =>
                          setDespesaForm({
                            ...despesaForm,
                            descricao: e.target.value,
                          })
                        }
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                        placeholder="Ex: Almoço durante viagem Maputo → Beira"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cidade
                        </label>
                        <input
                          type="text"
                          value={despesaForm.localDespesa.cidade}
                          onChange={(e) =>
                            setDespesaForm({
                              ...despesaForm,
                              localDespesa: {
                                ...despesaForm.localDespesa,
                                cidade: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                          placeholder="Ex: Inhambane"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Método de Pagamento
                        </label>
                        <select
                          value={despesaForm.metodoPagamento}
                          onChange={(e) =>
                            setDespesaForm({
                              ...despesaForm,
                              metodoPagamento: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                        >
                          <option value="dinheiro">Dinheiro</option>
                          <option value="multicaixa">Multicaixa</option>
                          <option value="transferencia">Transferência</option>
                          <option value="cartao">Cartão</option>
                          <option value="outro">Outro</option>
                        </select>
                      </div>
                    </div>

                    {/* Seção de Upload de Imagens para Despesas */}
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="text-blue-500 mr-2">📸</span>
                        Comprovativos da Despesa
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <ImageUploader
                          type="fotoRecibo"
                          label="Foto do Recibo"
                          currentImage={selectedImages.fotoRecibo}
                          onRemove={handleRemoveImage}
                        />
                        
                        <ImageUploader
                          type="comprovativoPagamento"
                          label="Outro Comprovativo"
                          currentImage={selectedImages.comprovativoPagamento}
                          onRemove={handleRemoveImage}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Número do Recibo
                          </label>
                          <input
                            type="text"
                            value={despesaForm.numeroRecibo}
                            onChange={(e) =>
                              setDespesaForm({
                                ...despesaForm,
                                numeroRecibo: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                            placeholder="Número do documento"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Província
                          </label>
                          <input
                            type="text"
                            value={despesaForm.localDespesa.provincia}
                            onChange={(e) =>
                              setDespesaForm({
                                ...despesaForm,
                                localDespesa: {
                                  ...despesaForm.localDespesa,
                                  provincia: e.target.value,
                                },
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                            placeholder="Ex: Inhambane"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Observações
                      </label>
                      <textarea
                        rows={3}
                        value={despesaForm.observacoes}
                        onChange={(e) =>
                          setDespesaForm({
                            ...despesaForm,
                            observacoes: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                        placeholder="Observações adicionais..."
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => {
                          setDespesaForm({
                            camiaoId: "",
                            motoristaId: "",
                            tipoDespesa: "alimentacao",
                            descricao: "",
                            valor: "",
                            localDespesa: { cidade: "", provincia: "" },
                            numeroRecibo: "",
                            dataDespesa: new Date().toISOString().slice(0, 10),
                            metodoPagamento: "dinheiro",
                            observacoes: "",
                            categoria: "operacional",
                            fotoRecibo: "",
                            comprovativoPagamento: "",
                          });
                          setSelectedImages({
                            fotoRecibo: null,
                            comprovativoPagamento: null,
                          });
                        }}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                        disabled={loading}
                      >
                        Limpar
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium disabled:opacity-50"
                      >
                        {loading ? "Processando..." : "Registrar Despesa"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Lista de Despesas - ATUALIZADA */}
              <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="font-semibold text-gray-900">
                    Despesas Recentes
                  </h3>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    {despesasLista.map((despesa, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(despesa.status)}`}>
                                {despesa.status}
                              </span>
                              <span className="text-sm font-medium text-gray-950">
                                {getTipoDespesaTexto(despesa.tipoDespesa)}
                              </span>
                              <span className="text-sm font-bold text-amber-700">
                                MT {despesa.valor.toFixed(2)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{despesa.descricao}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>{new Date(despesa.dataDespesa).toLocaleDateString()}</span>
                              <span>{despesa.localDespesa?.cidade}</span>
                              {despesa.numeroRecibo && (
                                <span>Recibo: {despesa.numeroRecibo}</span>
                              )}
                            </div>
                            
                            {/* Visualização de Imagens */}
                            {(despesa.fotoRecibo || despesa.comprovativoPagamento) && (
                              <div className="mt-3 pt-3 border-t border-gray-100">
                                <p className="text-sm font-medium text-gray-700 mb-2">
                                  Comprovativos:
                                </p>
                                <div className="flex space-x-3">
                                  {despesa.fotoRecibo && (
                                    <div className="relative group">
                                      <img
                                        src={despesa.fotoRecibo}
                                        alt="Recibo"
                                        className="w-20 h-20 object-cover rounded-lg border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => window.open(despesa.fotoRecibo, '_blank')}
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src = "https://via.placeholder.com/80x80?text=Imagem+Não+Disponível";
                                        }}
                                      />
                                      <span className="absolute bottom-1 left-1 text-xs bg-black bg-opacity-50 text-white px-1 py-0.5 rounded">
                                        📄
                                      </span>
                                    </div>
                                  )}
                                  {despesa.comprovativoPagamento && (
                                    <div className="relative group">
                                      <img
                                        src={despesa.comprovativoPagamento}
                                        alt="Comprovativo"
                                        className="w-20 h-20 object-cover rounded-lg border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => window.open(despesa.comprovativoPagamento, '_blank')}
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src = "https://via.placeholder.com/80x80?text=Imagem+Não+Disponível";
                                        }}
                                      />
                                      <span className="absolute bottom-1 left-1 text-xs bg-black bg-opacity-50 text-white px-1 py-0.5 rounded">
                                        📋
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex flex-col space-y-2">
                            {/* Botão de detalhes */}
                            <button
                              onClick={() => openDetalhesModal(despesa, "despesa")}
                              className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                            >
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Detalhes
                            </button>
                            
                            {/* Botões de ação para despesas pendentes */}
                            {despesa.status === "pendente" && (
                              <>
                                <button
                                  onClick={() => handleAprovarDespesa(despesa.despesaId, "aprovar")}
                                  className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                  Pagar
                                </button>
                                <button
                                  onClick={() => handleAprovarDespesa(despesa.despesaId, "rejeitar")}
                                  className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                  Rejeitar
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>


            {/* Painel lateral de Despesas recentes */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-900">
                    Despesas do Mês
                  </h4>
                  <button
                    onClick={loadDashboardData}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                    title="Atualizar dados"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Atualizar
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-gray-950">
                      Total de Despesas
                    </p>
                    <p className="text-xl font-bold text-amber-700">
                      MT {despesasCalculadas.totalDespesas.toFixed(0)}
                    </p>
                    <p
                      className={`text-xs font-medium ${
                        despesasCalculadas.totalDespesasPendentes > 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {despesasCalculadas.totalDespesasPendentes > 0
                        ? `${despesasCalculadas.totalDespesasPendentes.toFixed(
                            0
                          )} MT pendentes`
                        : "Tudo pago"}
                    </p>
                  </div>
                  {dashboardData?.despesasPorCategoria
                    ?.slice(0, 3)
                    .map((categoria, index) => (
                      <div
                        key={index}
                        className="p-3 bg-blue-50 rounded-lg border border-blue-200"
                      >
                        <p className="text-sm font-medium text-gray-950">
                          {categoria._id}
                        </p>
                        <p className="text-xs text-gray-600">
                          {categoria.count} registros
                        </p>
                        <p className="text-xs text-blue-600 font-medium">
                          MT {categoria.total.toFixed(0)}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Despesas Pendentes
                </h4>
                <div className="space-y-2">
                  {despesasLista
                    .filter((d) => d.status === "pendente")
                    .slice(0, 3)
                    .map((despesa, index) => (
                      <div
                        key={index}
                        className="p-2 border border-yellow-200 rounded bg-yellow-50 hover:bg-yellow-100 cursor-pointer"
                        onClick={() => openDetalhesModal(despesa, "despesa")}
                      >
                        <p className="text-xs font-medium">
                          {getTipoDespesaTexto(despesa.tipoDespesa)}
                        </p>
                        <p className="text-xs">MT {despesa.valor.toFixed(2)}</p>
                        {despesa.fotoRecibo && (
                          <p className="text-xs text-blue-600 mt-1">
                            📸 Tem foto do recibo
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Controle de Consumo */}
        {activeCombustivelForm === "controle_consumo" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-green-50">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-green-600 text-white p-2 rounded-lg mr-2">
                      📊
                    </span>
                    Controle de Consumo Mensal
                  </h3>
                </div>
                <div className="p-6">
                  <form
                    onSubmit={handleCalcularConsumoMensal}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Veículo/Camião *
                        </label>
                        <select
                          value={consumoForm.camiaoId}
                          onChange={(e) =>
                            setConsumoForm({
                              ...consumoForm,
                              camiaoId: e.target.value,
                            })
                          }
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                        >
                          <option value="">Selecione o veículo</option>
                          {camioes.map((camiao) => (
                            <option
                              key={camiao.camiaoId}
                              value={camiao.camiaoId}
                            >
                              {camiao.matricula} - {camiao.marca}{" "}
                              {camiao.modelo}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Período (YYYY-MM) *
                        </label>
                        <input
                          type="month"
                          value={consumoForm.periodo}
                          onChange={(e) =>
                            setConsumoForm({
                              ...consumoForm,
                              periodo: e.target.value,
                            })
                          }
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50"
                      >
                        {loading ? "Calculando..." : "Calcular Consumo Mensal"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Histórico de Consumo */}
              <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="font-semibold text-gray-900">
                    Histórico de Consumo
                  </h3>
                </div>
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Período
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Veículo
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Km Percorridos
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Consumo (L)
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Custo
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Média (km/L)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {consumoLista.map((consumo, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 text-sm font-medium">
                              {consumo.periodo}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {consumo.camiaoInfo?.matricula || "N/A"}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {consumo.totalKmPercorridos.toFixed(0)}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {consumo.totalLitrosConsumidos.toFixed(0)} L
                            </td>
                            <td className="px-4 py-3 text-sm font-medium">
                              MT {consumo.totalCustoCombustivel.toFixed(0)}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  consumo.consumoMedioKmPorL >= 3
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {consumo.consumoMedioKmPorL
                                  ? consumo.consumoMedioKmPorL.toFixed(2)
                                  : "N/A"}{" "}
                                km/L
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Painel de Estatísticas de Consumo */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Estatísticas de Consumo
                </h4>
                <div className="space-y-3">
                  {consumoLista.slice(0, 3).map((consumo, index) => (
                    <div
                      key={index}
                      className="p-3 bg-green-50 rounded-lg border border-green-200"
                    >
                      <p className="text-sm font-medium text-gray-950">
                        {consumo.periodo} -{" "}
                        {consumo.camiaoInfo?.matricula || "N/A"}
                      </p>
                      <p className="text-xs text-gray-600">
                        {consumo.totalKmPercorridos.toFixed(0)} km
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs font-medium">Consumo:</span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            consumo.consumoMedioKmPorL >= 3
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {consumo.consumoMedioKmPorL
                            ? consumo.consumoMedioKmPorL.toFixed(2)
                            : "N/A"}{" "}
                          km/L
                        </span>
                      </div>
                      <p className="text-xs text-green-600 font-medium mt-1">
                        MT {consumo.custoMedioPorKm?.toFixed(2) || "0.00"}/km
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Meta de Consumo
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Meta Ideal:</span>
                    <span className="font-semibold text-gray-950">
                      3.5 km/L
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Média Real:</span>
                    <span className="font-semibold text-gray-950">
                      {consumoLista.length > 0
                        ? (
                            consumoLista.reduce(
                              (sum, c) => sum + (c.consumoMedioKmPorL || 0),
                              0
                            ) / consumoLista.length
                          ).toFixed(2)
                        : "0.00"}{" "}
                      km/L
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Desvio:</span>
                    <span
                      className={`font-semibold ${
                        consumoLista.length > 0 &&
                        consumoLista.reduce(
                          (sum, c) => sum + (c.consumoMedioKmPorL || 0),
                          0
                        ) /
                          consumoLista.length >=
                          3
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {consumoLista.length > 0
                        ? (
                            ((consumoLista.reduce(
                              (sum, c) => sum + (c.consumoMedioKmPorL || 0),
                              0
                            ) /
                              consumoLista.length -
                              3.5) /
                              3.5) *
                            100
                          ).toFixed(1)
                        : "0.0"}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard */}
        {activeCombustivelForm === "dashboard" && dashboardData && (
          <div className="space-y-6 text-gray-950">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-orange-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-orange-500 text-white p-2 rounded-lg mr-2">
                    📈
                  </span>
                  Dashboard de Combustível e Despesas
                </h3>
              </div>
              <div className="p-6">
                {/* Métricas Rápidas */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">
                      Total Combustível
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardData.estatisticasCombustivel?.totalLitros
                        ? `${dashboardData.estatisticasCombustivel.totalLitros.toFixed(
                            0
                          )} L`
                        : "0 L"}
                    </p>
                    <p className="text-xs text-gray-600">
                      {dashboardData.estatisticasCombustivel
                        ?.totalAbastecimentos || 0}{" "}
                      abastecimentos
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600 font-medium">
                      Custo Combustível
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      MT{" "}
                      {dashboardData.estatisticasCombustivel?.totalCusto
                        ? dashboardData.estatisticasCombustivel.totalCusto.toFixed(
                            0
                          )
                        : "0"}
                    </p>
                    <p className="text-xs text-gray-600">
                      {dashboardData.estatisticasCombustivel?.mediaConsumo
                        ? `${dashboardData.estatisticasCombustivel.mediaConsumo.toFixed(
                            2
                          )} km/L`
                        : "N/A"}
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <p className="text-sm text-orange-600 font-medium">
                      Despesas Operacionais
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      MT{" "}
                      {dashboardData.estatisticasDespesas?.totalDespesas
                        ? dashboardData.estatisticasDespesas.totalDespesas.toFixed(
                            0
                          )
                        : "0"}
                    </p>
                    <p className="text-xs text-gray-600">
                      {dashboardData.estatisticasDespesas
                        ?.totalDespesasPendentes > 0
                        ? `${dashboardData.estatisticasDespesas.totalDespesasPendentes.toFixed(
                            0
                          )} MT pendentes`
                        : "Tudo pago"}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-600 font-medium">
                      Custo Total
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      MT{" "}
                      {(
                        (dashboardData.estatisticasCombustivel?.totalCusto ||
                          0) +
                        (dashboardData.estatisticasDespesas?.totalDespesas || 0)
                      ).toFixed(0)}
                    </p>
                    <p className="text-xs text-gray-600">Operações do mês</p>
                  </div>
                </div>

                {/* Top 5 Veículos com Maior Consumo */}
                {dashboardData.consumoPorVeiculo && (
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-orange-500 mr-2">🚛</span>
                      Top 5 Veículos - Maior Consumo
                    </h4>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="space-y-4">
                        {dashboardData.consumoPorVeiculo.map((item, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">
                                {item.camiaoInfo?.matricula ||
                                  `Veículo #${item._id}`}
                              </span>
                              <span className="text-gray-600">
                                {item.totalLitros.toFixed(0)} L
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className={`h-3 rounded-full ${
                                  index === 0
                                    ? "bg-red-500"
                                    : index === 1
                                    ? "bg-orange-500"
                                    : index === 2
                                    ? "bg-yellow-500"
                                    : "bg-blue-500"
                                }`}
                                style={{
                                  width: `${
                                    (item.totalLitros /
                                      dashboardData.consumoPorVeiculo[0]
                                        .totalLitros) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-600">
                              <span>MT {item.totalCusto.toFixed(0)}</span>
                              <span>
                                {item.mediaConsumo
                                  ? item.mediaConsumo.toFixed(2)
                                  : "N/A"}{" "}
                                km/L
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Distribuição de Despesas */}
                {dashboardData.despesasPorCategoria && (
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-purple-500 mr-2">📊</span>
                      Distribuição de Despesas por Categoria
                    </h4>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="h-48 space-y-3">
                        {dashboardData.despesasPorCategoria.map(
                          (item, index) => {
                            const totalDespesas =
                              dashboardData.despesasPorCategoria.reduce(
                                (sum, d) => sum + d.total,
                                0
                              );
                            const percentage =
                              totalDespesas > 0
                                ? (item.total / totalDespesas) * 100
                                : 0;

                            return (
                              <div key={index} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>{item._id}</span>
                                  <span className="font-medium">
                                    MT {item.total.toFixed(0)}
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      index === 0
                                        ? "bg-blue-500"
                                        : index === 1
                                        ? "bg-green-500"
                                        : index === 2
                                        ? "bg-orange-500"
                                        : "bg-purple-500"
                                    }`}
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-600">
                                  <span>{item.count} registros</span>
                                  <span>{percentage.toFixed(1)}%</span>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Evolução Mensal */}
                {dashboardData.evolucaoMensal && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-green-500 mr-2">📅</span>
                      Evolução do Custo de Combustível (Últimos 6 Meses)
                    </h4>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="h-64 flex items-end justify-between space-x-2">
                        {dashboardData.evolucaoMensal.map((item, index) => {
                          const maxCusto = Math.max(
                            ...dashboardData.evolucaoMensal.map(
                              (i) => i.totalCusto
                            )
                          );
                          const height =
                            maxCusto > 0
                              ? (item.totalCusto / maxCusto) * 100
                              : 0;

                          return (
                            <div
                              key={index}
                              className="flex flex-col items-center flex-1 h-full"
                            >
                              <div className="flex flex-col justify-end h-full w-3/4">
                                <div
                                  className="bg-blue-400 rounded-t-lg transition-all hover:opacity-80 w-full"
                                  style={{ height: `${height}%` }}
                                  title={`MT ${item.totalCusto.toFixed(0)}`}
                                ></div>
                              </div>
                              <span className="text-xs mt-2 font-medium">
                                {item.periodo.split("-")[1]}
                              </span>
                              <span className="text-xs text-gray-600">
                                {item.totalLitros.toFixed(0)} L
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Relatórios */}
        {activeCombustivelForm === "relatorios" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-rose-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-rose-500 text-white p-2 rounded-lg mr-2">
                  📄
                </span>
                Relatórios - Combustível e Expedientes
              </h3>
            </div>
            <div className="p-6">
              {/* Botões de Atalhos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <button
                  onClick={handleGerarRelatorio}
                  className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors text-left"
                >
                  <div className="text-blue-600 text-lg mb-2">🧾</div>
                  <p className="font-medium text-gray-900">
                    Relatório Completo
                  </p>
                  <p className="text-sm text-gray-600">Período personalizado</p>
                </button>

                <button className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors text-left">
                  <div className="text-blue-600 text-lg mb-2">📊</div>
                  <p className="font-medium text-gray-900">
                    Análise de Consumo
                  </p>
                  <p className="text-sm text-gray-600">
                    Por veículo e motorista
                  </p>
                </button>

                <button className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors text-left">
                  <div className="text-blue-600 text-lg mb-2">🏷️</div>
                  <p className="font-medium text-gray-900">
                    Despesas Detalhadas
                  </p>
                  <p className="text-sm text-gray-600">
                    Por categoria e centro de custo
                  </p>
                </button>

                <button className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors text-left">
                  <div className="text-blue-600 text-lg mb-2">💰</div>
                  <p className="font-medium text-gray-900">
                    Análise Financeira
                  </p>
                  <p className="text-sm text-gray-600">Custos vs Orçamento</p>
                </button>
              </div>

              {/* Opções de Exportação */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-gray-900 mb-4">
                  Opções de Exportação
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Formato
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                      <option>JSON (Visualização)</option>
                      <option>PDF (Download)</option>
                      <option>Excel (Download)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Inicial
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                      defaultValue={
                        new Date(
                          new Date().getFullYear(),
                          new Date().getMonth(),
                          1
                        )
                          .toISOString()
                          .split("T")[0]
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Final
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={handleGerarRelatorio}
                    className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 font-medium"
                  >
                    Gerar Relatório
                  </button>
                  <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                    Limpar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
