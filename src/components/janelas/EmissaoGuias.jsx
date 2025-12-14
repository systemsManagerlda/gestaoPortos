import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

const EmissaoGuias = () => {
  const [activeDocumentType, setActiveDocumentType] = useState("nota-credito");
  const [activeEmissaoGuias, setActiveEmissaoGuias] = useState("nova");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

  // Estados para dados dinâmicos
  const [clientes, setClientes] = useState([]);
  const [faturas, setFaturas] = useState([]);
  const [documentosFiscais, setDocumentosFiscais] = useState([]);
  const [guiasPendentes, setGuiasPendentes] = useState([]);

  // Estados para formulários baseados nos schemas
  const [formNotaCredito, setFormNotaCredito] = useState({
    empresaId: 1,
    nomeEmpresa: "Mega Centro e Logistica",
    tipoDocumento: "nota-credito",
    cliente: {
      nomeCliente: "",
      nuit: "",
    },
    documentoOriginal: {
      numeroDocumento: "",
      tipoDocumento: "fatura",
      valorTotal: 0,
    },
    motivo: {
      tipo: "devolucao_mercadoria",
      descricao: "",
      observacoes: "",
    },
    valores: {
      valorBase: 0,
      ivaPercentual: 17,
      valorTotal: 0,
      moeda: "MT",
    },
    metadata: {
      criadoPor: "usuario_sistema",
    },
  });

  const [formNotaDebito, setFormNotaDebito] = useState({
    empresaId: 1,
    nomeEmpresa: "Mega Centro e Logistica",
    tipoDocumento: "nota-debito",
    cliente: {
      nomeCliente: "",
      nuit: "",
    },
    documentoOriginal: {
      numeroDocumento: "",
      tipoDocumento: "fatura",
      valorTotal: 0,
    },
    motivo: {
      tipo: "juros_mora",
      descricao: "",
      observacoes: "",
    },
    valores: {
      valorBase: 0,
      ivaPercentual: 17,
      valorTotal: 0,
      moeda: "MT",
    },
    metadata: {
      criadoPor: "usuario_sistema",
    },
  });

  const [formGuiaTransporte, setFormGuiaTransporte] = useState({
    empresaId: 1,
    nomeEmpresa: "Mega Centro e Logistica",
    tipoDocumento: "guia-transporte",
    cliente: {
      nomeCliente: "",
      nuit: "",
    },
    status: "rascunho",
    transporte: {
      origem: {
        cidade: "",
        provincia: "",
        pais: "Moçambique",
      },
      destino: {
        cidade: "",
        provincia: "",
        pais: "Moçambique",
      },
      distanciaKm: 0,
    },
    carga: {
      tipoCarga: "cimento",
      descricao: "",
      pesoKg: 0,
      volumeM3: 0,
      unidadeMedida: "kg",
    },
    veiculoMotorista: {
      veiculo: {
        matricula: "",
        tipoVeiculo: "bau",
      },
      motorista: {
        nome: "",
        cartaConducao: "",
      },
    },
    valores: {
      valorBase: 0,
      ivaPercentual: 17,
      valorTotal: 0,
      moeda: "MT",
    },
    metadata: {
      criadoPor: "usuario_sistema",
    },
  });

  // Estado para filtros de consulta
  const [filtrosConsulta, setFiltrosConsulta] = useState({
    curPage: 1,
    pageSize: 10,
    tipoDocumento: "guia-transporte",
    numeroDocumento: "",
    clienteNome: "",
    status: "",
    dataInicio: "",
    dataFim: "",
  });

  // Função para exibir mensagens
  const exibirMensagem = (tipo, texto) => {
    setMensagem({ tipo, texto });
    setTimeout(() => setMensagem({ tipo: "", texto: "" }), 5000);
  };

  // Carregar dados iniciais
  useEffect(() => {
    carregarDadosIniciais();
  }, [activeEmissaoGuias]);

  const carregarDadosIniciais = async () => {
    try {
      await carregarFaturas();

      if (activeEmissaoGuias === "consultar") {
        await buscarDocumentos();
      }

      if (activeEmissaoGuias === "pendentes") {
        await carregarDocumentosPendentes();
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };
  const formatarValor = (valor) => {
    if (valor === null || valor === undefined || isNaN(valor)) {
      return "0.00";
    }
    return parseFloat(valor).toFixed(2);
  };
  const carregarFaturas = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/getFaturaList`, {
        curPage: 1,
        pageSize: 50,
      });

      if (response.data.returnCode === 200) {
        setFaturas(response.data.data.list || []);
      }
    } catch (error) {
      console.error("Erro ao carregar faturas:", error);
    }
  };

  const carregarDocumentosPendentes = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/getDocumentosPendentes`,
        {
          tipoPendencia: "faturacao",
          curPage: 1,
          pageSize: 10,
        }
      );

      if (response.data.returnCode === 200) {
        setGuiasPendentes(response.data.data.list || []);
      }
    } catch (error) {
      console.error("Erro ao carregar documentos pendentes:", error);
    }
  };

  // Funções para manipulação de formulários
  const handleFormChange = (setForm, campo, valor) => {
    const campos = campo.split(".");
    setForm((prev) => {
      const novoEstado = { ...prev };
      let current = novoEstado;

      for (let i = 0; i < campos.length - 1; i++) {
        if (!current[campos[i]]) {
          current[campos[i]] = {};
        }
        current = current[campos[i]];
      }

      // Se o campo for numérico, converter para número
      if (
        campo.includes("valor") ||
        campo.includes("iva") ||
        campo.includes("pesoKg") ||
        campo.includes("distanciaKm") ||
        campo.includes("volumeM3")
      ) {
        const numValor = valor === "" ? 0 : parseFloat(valor);
        current[campos[campos.length - 1]] = isNaN(numValor) ? 0 : numValor;
      } else {
        current[campos[campos.length - 1]] = valor;
      }

      return novoEstado;
    });
  };
  // Função para buscar o próximo número sequencial
  const buscarProximoNumeroSequencial = async (tipoDocumento) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/getDocumentoFiscalList`,
        {
          tipoDocumento,
          pageSize: 1,
          curPage: 1,
        }
      );

      if (
        response.data.returnCode === 200 &&
        response.data.data.list.length > 0
      ) {
        const ultimoDoc = response.data.data.list[0];
        return ultimoDoc.numeroSequencial
          ? ultimoDoc.numeroSequencial + 1
          : 1000;
      }
      return 1000;
    } catch (error) {
      console.error("Erro ao buscar número sequencial:", error);
      return 1000;
    }
  };

  // Funções para envio de formulários
  const enviarNotaCredito = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Validar campos obrigatórios
      if (!formNotaCredito.documentoOriginal.numeroDocumento) {
        exibirMensagem("erro", "Selecione uma fatura original");
        return;
      }

      if (!formNotaCredito.motivo.descricao) {
        exibirMensagem("erro", "Digite uma descrição para o ajuste");
        return;
      }

      if (formNotaCredito.valores.valorBase <= 0) {
        exibirMensagem("erro", "Digite um valor válido para o crédito");
        return;
      }

      // Buscar fatura selecionada para obter dados do cliente
      const faturaSelecionada = faturas.find(
        (f) =>
          f.numeroFatura === formNotaCredito.documentoOriginal.numeroDocumento
      );

      if (!faturaSelecionada) {
        exibirMensagem("erro", "Fatura não encontrada");
        return;
      }

      // Buscar próximo número sequencial
      const numeroSequencial = await buscarProximoNumeroSequencial(
        "nota-credito"
      );

      // Preparar dados para envio - INCLUIR TODOS OS CAMPOS OBRIGATÓRIOS
      const dadosEnvio = {
        empresaId: 1,
        nomeEmpresa: "Mega Centro e Logistica",
        tipoDocumento: "nota-credito",
        numeroSequencial,
        cliente: {
          nomeCliente:
            faturaSelecionada.cliente?.nome || "Cliente não especificado",
          nuit: faturaSelecionada.cliente?.nif || "",
        },
        documentoOriginal: {
          numeroDocumento: formNotaCredito.documentoOriginal.numeroDocumento,
          tipoDocumento: "fatura",
          valorTotal: faturaSelecionada.valorTotal || 0,
        },
        motivo: {
          tipo: formNotaCredito.motivo.tipo,
          descricao: formNotaCredito.motivo.descricao,
        },
        carga: {
          tipoCarga: "outros",
          descricao: "Ajuste de valor - " + formNotaCredito.motivo.descricao,
          pesoKg: 0,
          volumeM3: 0,
          unidadeMedida: "unidade",
        },
        transporte: {
          origem: {
            cidade: "Maputo",
            provincia: "Maputo",
            pais: "Moçambique",
          },
          destino: {
            cidade: "Maputo",
            provincia: "Maputo",
            pais: "Moçambique",
          },
          distanciaKm: 0,
        },
        veiculoMotorista: {
          veiculo: {
            matricula: "N/A",
            tipoVeiculo: "bau", // VALOR CORRETO AQUI
          },
          motorista: {
            nome: "Sistema",
            cartaConducao: "N/A",
          },
        },
        valores: {
          valorBase: parseFloat(formNotaCredito.valores.valorBase) || 0,
          ivaPercentual:
            parseFloat(formNotaCredito.valores.ivaPercentual) || 17,
          valorTotal: parseFloat(formNotaCredito.valores.valorTotal) || 0,
          moeda: "MT",
        },
        status: "emitido",
        metadata: {
          criadoPor: "usuario_sistema",
        },
      };
      console.log("Enviando nota de crédito:", dadosEnvio);

      const response = await axios.post(
        `${API_BASE_URL}/createDocumentoFiscal`,
        dadosEnvio
      );

      if (response.data.returnCode === 201) {
        exibirMensagem("sucesso", "Nota de crédito criada com sucesso!");
        // Resetar formulário
        setFormNotaCredito({
          ...formNotaCredito,
          documentoOriginal: {
            ...formNotaCredito.documentoOriginal,
            numeroDocumento: "",
            valorTotal: 0,
          },
          motivo: { ...formNotaCredito.motivo, descricao: "" },
          valores: { ...formNotaCredito.valores, valorBase: 0, valorTotal: 0 },
        });
      } else {
        throw new Error(response.data.returnMsg || "Erro desconhecido");
      }
    } catch (error) {
      console.error("Erro detalhado:", error.response?.data || error.message);
      exibirMensagem(
        "erro",
        `Erro ao criar nota de crédito: ${
          error.response?.data?.returnMsg || error.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };
  const enviarNotaDebito = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Validar campos obrigatórios
      if (!formNotaDebito.documentoOriginal.numeroDocumento) {
        exibirMensagem("erro", "Selecione uma fatura original");
        return;
      }

      if (!formNotaDebito.motivo.descricao) {
        exibirMensagem("erro", "Digite uma descrição para o ajuste");
        return;
      }

      if (formNotaDebito.valores.valorBase <= 0) {
        exibirMensagem("erro", "Digite um valor válido para o débito");
        return;
      }

      // Buscar fatura selecionada
      const faturaSelecionada = faturas.find(
        (f) =>
          f.numeroFatura === formNotaDebito.documentoOriginal.numeroDocumento
      );

      if (!faturaSelecionada) {
        exibirMensagem("erro", "Fatura não encontrada");
        return;
      }

      const numeroSequencial = await buscarProximoNumeroSequencial(
        "nota-debito"
      );

      const dadosEnvio = {
        empresaId: 1,
        nomeEmpresa: "Mega Centro e Logistica",
        tipoDocumento: "nota-debito",
        numeroSequencial,
        cliente: {
          nomeCliente:
            faturaSelecionada.cliente?.nome || "Cliente não especificado",
          nuit: faturaSelecionada.cliente?.nif || "",
        },
        documentoOriginal: {
          numeroDocumento: formNotaDebito.documentoOriginal.numeroDocumento,
          tipoDocumento: "fatura",
          valorTotal: faturaSelecionada.valorTotal || 0,
        },
        motivo: {
          tipo: formNotaDebito.motivo.tipo,
          descricao: formNotaDebito.motivo.descricao,
        },
        // Adicionar campos obrigatórios para o schema
        carga: {
          tipoCarga: "outros",
          descricao: "Ajuste de valor - " + formNotaDebito.motivo.descricao,
          pesoKg: 0,
          volumeM3: 0,
          unidadeMedida: "unidade",
        },
        transporte: {
          origem: {
            cidade: "Maputo",
            provincia: "Maputo",
            pais: "Moçambique",
          },
          destino: {
            cidade: "Maputo",
            provincia: "Maputo",
            pais: "Moçambique",
          },
          distanciaKm: 0,
        },
        veiculoMotorista: {
          veiculo: {
            matricula: "N/A",
            tipoVeiculo: "bau",
          },
          motorista: {
            nome: "Sistema",
            cartaConducao: "N/A",
          },
        },
        valores: {
          valorBase: parseFloat(formNotaDebito.valores.valorBase) || 0,
          ivaPercentual: parseFloat(formNotaDebito.valores.ivaPercentual) || 17,
          valorTotal: parseFloat(formNotaDebito.valores.valorTotal) || 0,
          moeda: "MT",
        },
        status: "emitido",
        metadata: {
          criadoPor: "usuario_sistema",
        },
      };

      console.log("Enviando nota de débito:", dadosEnvio);

      const response = await axios.post(
        `${API_BASE_URL}/createDocumentoFiscal`,
        dadosEnvio
      );

      if (response.data.returnCode === 201) {
        exibirMensagem("sucesso", "Nota de débito criada com sucesso!");
        setFormNotaDebito({
          ...formNotaDebito,
          documentoOriginal: {
            ...formNotaDebito.documentoOriginal,
            numeroDocumento: "",
            valorTotal: 0,
          },
          motivo: { ...formNotaDebito.motivo, descricao: "" },
          valores: { ...formNotaDebito.valores, valorBase: 0, valorTotal: 0 },
        });
      } else {
        throw new Error(response.data.returnMsg || "Erro desconhecido");
      }
    } catch (error) {
      console.error("Erro detalhado:", error.response?.data || error.message);
      exibirMensagem(
        "erro",
        `Erro ao criar nota de débito: ${
          error.response?.data?.returnMsg || error.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const enviarGuiaTransporte = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Validar campos obrigatórios
      if (!formGuiaTransporte.cliente.nomeCliente) {
        exibirMensagem("erro", "Digite o nome do cliente");
        return;
      }

      if (!formGuiaTransporte.cliente.nuit) {
        exibirMensagem("erro", "Digite o NUIT do cliente");
        return;
      }

      if (!formGuiaTransporte.transporte.origem.cidade) {
        exibirMensagem("erro", "Digite a cidade de origem");
        return;
      }

      if (!formGuiaTransporte.transporte.destino.cidade) {
        exibirMensagem("erro", "Digite a cidade de destino");
        return;
      }

      if (
        !formGuiaTransporte.carga.pesoKg ||
        formGuiaTransporte.carga.pesoKg <= 0
      ) {
        exibirMensagem("erro", "Digite um peso válido");
        return;
      }

      const numeroSequencial = await buscarProximoNumeroSequencial(
        "guia-transporte"
      );

      // Calcular valor base aproximado
      const valorPorKm = 50; // MT por km
      const valorPorKg = 0.5; // MT por kg
      const valorBase =
        formGuiaTransporte.transporte.distanciaKm * valorPorKm +
        formGuiaTransporte.carga.pesoKg * valorPorKg;

      const valorTotal =
        valorBase * (1 + formGuiaTransporte.valores.ivaPercentual / 100);

      const dadosEnvio = {
        empresaId: 1,
        nomeEmpresa: "Mega Centro e Logistica",
        tipoDocumento: "guia-transporte",
        numeroSequencial,
        cliente: {
          nomeCliente: formGuiaTransporte.cliente.nomeCliente,
          nuit: formGuiaTransporte.cliente.nuit,
        },
        transporte: {
          origem: {
            cidade: formGuiaTransporte.transporte.origem.cidade,
            provincia: formGuiaTransporte.transporte.origem.provincia,
            pais: "Moçambique",
          },
          destino: {
            cidade: formGuiaTransporte.transporte.destino.cidade,
            provincia: formGuiaTransporte.transporte.destino.provincia,
            pais: "Moçambique",
          },
          distanciaKm: parseInt(formGuiaTransporte.transporte.distanciaKm) || 0,
        },
        carga: {
          tipoCarga: formGuiaTransporte.carga.tipoCarga,
          descricao: formGuiaTransporte.carga.descricao,
          pesoKg: parseInt(formGuiaTransporte.carga.pesoKg),
          volumeM3: parseFloat(formGuiaTransporte.carga.volumeM3) || 0,
          unidadeMedida: "kg",
        },
        veiculoMotorista: {
          veiculo: {
            matricula: formGuiaTransporte.veiculoMotorista.veiculo.matricula,
            tipoVeiculo:
              formGuiaTransporte.veiculoMotorista.veiculo.tipoVeiculo,
          },
          motorista: {
            nome: formGuiaTransporte.veiculoMotorista.motorista.nome,
            cartaConducao:
              formGuiaTransporte.veiculoMotorista.motorista.cartaConducao,
          },
        },
        valores: {
          valorBase: parseFloat(valorBase.toFixed(2)),
          ivaPercentual: parseFloat(formGuiaTransporte.valores.ivaPercentual),
          valorTotal: parseFloat(valorTotal.toFixed(2)),
          moeda: "MT",
        },
        status: "emitido",
        metadata: {
          criadoPor: "usuario_sistema",
        },
      };

      console.log("Enviando guia de transporte:", dadosEnvio);

      const response = await axios.post(
        `${API_BASE_URL}/createDocumentoFiscal`,
        dadosEnvio
      );

      if (response.data.returnCode === 201) {
        exibirMensagem("sucesso", "Guia de transporte criada com sucesso!");

        // Resetar formulário
        setFormGuiaTransporte({
          ...formGuiaTransporte,
          cliente: { ...formGuiaTransporte.cliente, nomeCliente: "", nuit: "" },
          transporte: {
            ...formGuiaTransporte.transporte,
            origem: { ...formGuiaTransporte.transporte.origem, cidade: "" },
            destino: { ...formGuiaTransporte.transporte.destino, cidade: "" },
            distanciaKm: 0,
          },
          carga: { ...formGuiaTransporte.carga, pesoKg: 0, descricao: "" },
          veiculoMotorista: {
            ...formGuiaTransporte.veiculoMotorista,
            veiculo: {
              ...formGuiaTransporte.veiculoMotorista.veiculo,
              matricula: "",
            },
            motorista: {
              ...formGuiaTransporte.veiculoMotorista.motorista,
              nome: "",
              cartaConducao: "",
            },
          },
          valores: {
            ...formGuiaTransporte.valores,
            valorBase: 0,
            valorTotal: 0,
          },
        });

        // Atualizar lista de guias pendentes
        await carregarDocumentosPendentes();
      } else {
        throw new Error(response.data.returnMsg || "Erro desconhecido");
      }
    } catch (error) {
      console.error("Erro detalhado:", error.response?.data || error.message);
      exibirMensagem(
        "erro",
        `Erro ao criar guia de transporte: ${
          error.response?.data?.returnMsg || error.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const buscarDocumentos = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${API_BASE_URL}/getDocumentoFiscalList`,
        filtrosConsulta
      );

      if (response.data.returnCode === 200) {
        setDocumentosFiscais(response.data.data.list || []);
      } else {
        exibirMensagem("erro", response.data.returnMsg);
      }
    } catch (error) {
      console.error("Erro ao buscar documentos:", error);
      exibirMensagem("erro", `Erro ao buscar documentos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Calcular valor total automaticamente
  useEffect(() => {
    const calcularValorTotal = (valorBase, ivaPercentual) => {
      const valorBaseNum = parseFloat(valorBase) || 0;
      const ivaPercentualNum = parseFloat(ivaPercentual) || 17;
      const iva = valorBaseNum * (ivaPercentualNum / 100);
      return valorBaseNum + iva;
    };

    // Atualizar valor total da nota de crédito
    const valorBaseNC = parseFloat(formNotaCredito.valores.valorBase) || 0;
    const valorTotalNC = calcularValorTotal(
      valorBaseNC,
      formNotaCredito.valores.ivaPercentual
    );

    if (formNotaCredito.valores.valorTotal !== valorTotalNC) {
      setFormNotaCredito((prev) => ({
        ...prev,
        valores: {
          ...prev.valores,
          valorTotal: valorTotalNC,
        },
      }));
    }

    // Atualizar valor total da nota de débito
    const valorBaseND = parseFloat(formNotaDebito.valores.valorBase) || 0;
    const valorTotalND = calcularValorTotal(
      valorBaseND,
      formNotaDebito.valores.ivaPercentual
    );

    if (formNotaDebito.valores.valorTotal !== valorTotalND) {
      setFormNotaDebito((prev) => ({
        ...prev,
        valores: {
          ...prev.valores,
          valorTotal: valorTotalND,
        },
      }));
    }
  }, [
    formNotaCredito.valores.valorBase,
    formNotaCredito.valores.ivaPercentual,
    formNotaDebito.valores.valorBase,
    formNotaDebito.valores.ivaPercentual,
  ]);

  // Renderizar o componente
  return (
    <div className="h-full flex flex-col">
      {/* Cabeçalho */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">📋</span>
          Emissão de Documentos Fiscais
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Emissão e gestão de notas de crédito, débito e guias de transporte
        </p>
      </div>

      {/* Mensagens */}
      {mensagem.texto && (
        <div
          className={`mx-6 mt-4 p-4 rounded-lg ${
            mensagem.tipo === "sucesso"
              ? "bg-green-100 text-green-800 border border-green-200"
              : mensagem.tipo === "erro"
              ? "bg-red-100 text-red-800 border border-red-200"
              : "bg-blue-100 text-blue-800 border border-blue-200"
          }`}
        >
          {mensagem.texto}
        </div>
      )}

      {/* Menu de Tipos de Documento */}
      <div className="flex space-x-2 p-4 border-b border-gray-200 bg-white overflow-x-auto">
        <button
          onClick={() => setActiveDocumentType("nota-credito")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
            activeDocumentType === "nota-credito"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          📈 Nota de Crédito
        </button>
        <button
          onClick={() => setActiveDocumentType("nota-debito")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
            activeDocumentType === "nota-debito"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          📉 Nota de Débito
        </button>
        <button
          onClick={() => setActiveDocumentType("guia-transporte")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
            activeDocumentType === "guia-transporte"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          🚚 Guia Transporte
        </button>
      </div>

      <div className="flex-1 p-6">
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-700">Processando...</p>
            </div>
          </div>
        )}

        {/* Emissão de Nota de Crédito */}
        {activeDocumentType === "nota-credito" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-green-50">
                  <h3 className="font-semibold text-gray-900">
                    📈 Nota de Crédito
                  </h3>
                </div>
                <div className="p-6">
                  <form onSubmit={enviarNotaCredito} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Factura Original *
                        </label>
                        <select
                          value={
                            formNotaCredito.documentoOriginal.numeroDocumento
                          }
                          onChange={(e) => {
                            const faturaSelecionada = faturas.find(
                              (f) => f.numeroFatura === e.target.value
                            );
                            handleFormChange(
                              setFormNotaCredito,
                              "documentoOriginal.numeroDocumento",
                              e.target.value
                            );
                            if (faturaSelecionada) {
                              handleFormChange(
                                setFormNotaCredito,
                                "documentoOriginal.valorTotal",
                                faturaSelecionada.valorTotal || 0
                              );
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                          required
                        >
                          <option value="">Selecione a factura</option>
                          {faturas.map((fatura) => (
                            <option
                              key={fatura.numeroFatura}
                              value={fatura.numeroFatura}
                            >
                              {fatura.numeroFatura} -{" "}
                              {fatura.cliente?.nome || "Cliente"} -{" "}
                              {fatura.valorTotal?.toFixed(2) || "0.00"} MT
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Motivo *
                        </label>
                        <select
                          value={formNotaCredito.motivo.tipo}
                          onChange={(e) =>
                            handleFormChange(
                              setFormNotaCredito,
                              "motivo.tipo",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                          required
                        >
                          <option value="devolucao_mercadoria">
                            Devolução de Mercadoria
                          </option>
                          <option value="desconto_esquecido">
                            Desconto Esquecido
                          </option>
                          <option value="erro_fatura">Erro na Factura</option>
                          <option value="cancelamento_parcial">
                            Cancelamento Parcial
                          </option>
                          <option value="bonificacao">Bonificação</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição do Ajuste *
                      </label>
                      <textarea
                        value={formNotaCredito.motivo.descricao}
                        onChange={(e) =>
                          handleFormChange(
                            setFormNotaCredito,
                            "motivo.descricao",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                        placeholder="Descreva o motivo da nota de crédito..."
                        required
                      />
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        💵 Valores do Ajuste
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Valor do Crédito *
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={formNotaCredito.valores.valorBase}
                            onChange={(e) =>
                              handleFormChange(
                                setFormNotaCredito,
                                "valores.valorBase",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                            placeholder="0,00"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            IVA %
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="100"
                            value={formNotaCredito.valores.ivaPercentual}
                            onChange={(e) =>
                              handleFormChange(
                                setFormNotaCredito,
                                "valores.ivaPercentual",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                            placeholder="17"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Total do Crédito
                          </label>
                          <input
                            type="text"
                            value={`${formatarValor(
                              formNotaCredito.valores.valorTotal
                            )} MT`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-950 font-medium"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() =>
                          setFormNotaCredito({
                            ...formNotaCredito,
                            documentoOriginal: {
                              ...formNotaCredito.documentoOriginal,
                              numeroDocumento: "",
                              valorTotal: 0,
                            },
                            motivo: {
                              ...formNotaCredito.motivo,
                              descricao: "",
                            },
                            valores: {
                              ...formNotaCredito.valores,
                              valorBase: 0,
                              valorTotal: 0,
                            },
                          })
                        }
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                        disabled={loading}
                      >
                        Limpar
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? "Processando..." : "Emitir Nota de Crédito"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Informações da Nota de Crédito */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  📄 Informações
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="font-medium text-gray-900">NOTA DE CRÉDITO</p>
                    <p className="text-xs text-gray-600">
                      Empresa: <strong>Mega Centro e Logistica</strong>
                    </p>
                    <p className="text-xs text-gray-600">
                      IVA Padrão:{" "}
                      <strong>{formNotaCredito.valores.ivaPercentual}%</strong>
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Factura Original:</span>
                    <p className="font-medium text-gray-950">
                      {formNotaCredito.documentoOriginal.numeroDocumento || "-"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Valor do Crédito:</span>
                    <p className="font-medium text-gray-950">
                      {formatarValor(formNotaCredito.valores.valorBase)} MT
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Total com IVA:</span>
                    <p className="font-medium text-gray-950">
                      {formatarValor(formNotaCredito.valores.valorTotal)} MT
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emissão de Nota de Débito */}
        {activeDocumentType === "nota-debito" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-orange-50">
                  <h3 className="font-semibold text-gray-900">
                    📉 Nota de Débito
                  </h3>
                </div>
                <div className="p-6">
                  <form onSubmit={enviarNotaDebito} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Factura Original *
                        </label>
                        <select
                          value={
                            formNotaDebito.documentoOriginal.numeroDocumento
                          }
                          onChange={(e) => {
                            const faturaSelecionada = faturas.find(
                              (f) => f.numeroFatura === e.target.value
                            );
                            handleFormChange(
                              setFormNotaDebito,
                              "documentoOriginal.numeroDocumento",
                              e.target.value
                            );
                            if (faturaSelecionada) {
                              handleFormChange(
                                setFormNotaDebito,
                                "documentoOriginal.valorTotal",
                                faturaSelecionada.valorTotal || 0
                              );
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                          required
                        >
                          <option value="">Selecione a factura</option>
                          {faturas.map((fatura) => (
                            <option
                              key={fatura.numeroFatura}
                              value={fatura.numeroFatura}
                            >
                              {fatura.numeroFatura} -{" "}
                              {fatura.cliente?.nome || "Cliente"} -{" "}
                              {fatura.valorTotal?.toFixed(2) || "0.00"} MT
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Motivo *
                        </label>
                        <select
                          value={formNotaDebito.motivo.tipo}
                          onChange={(e) =>
                            handleFormChange(
                              setFormNotaDebito,
                              "motivo.tipo",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                          required
                        >
                          <option value="juros_mora">Juros de Mora</option>
                          <option value="portes_envio">Portes de Envio</option>
                          <option value="servicos_adicionais">
                            Serviços Adicionais
                          </option>
                          <option value="outros_acrescimos">
                            Outros Acréscimos
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição do Acréscimo *
                      </label>
                      <textarea
                        value={formNotaDebito.motivo.descricao}
                        onChange={(e) =>
                          handleFormChange(
                            setFormNotaDebito,
                            "motivo.descricao",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                        placeholder="Descreva o motivo da nota de débito..."
                        required
                      />
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        💵 Valores do Acréscimo
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Valor do Débito *
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={formNotaDebito.valores.valorBase}
                            onChange={(e) =>
                              handleFormChange(
                                setFormNotaDebito,
                                "valores.valorBase",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                            placeholder="0,00"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            IVA %
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="100"
                            value={formNotaDebito.valores.ivaPercentual}
                            onChange={(e) =>
                              handleFormChange(
                                setFormNotaDebito,
                                "valores.ivaPercentual",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                            placeholder="17"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Total do Débito
                          </label>
                          <input
                            type="text"
                            value={`${formNotaDebito.valores.valorTotal.toFixed(
                              2
                            )} MT`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-950 font-medium"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() =>
                          setFormNotaDebito({
                            ...formNotaDebito,
                            documentoOriginal: {
                              ...formNotaDebito.documentoOriginal,
                              numeroDocumento: "",
                              valorTotal: 0,
                            },
                            motivo: { ...formNotaDebito.motivo, descricao: "" },
                            valores: {
                              ...formNotaDebito.valores,
                              valorBase: 0,
                              valorTotal: 0,
                            },
                          })
                        }
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                        disabled={loading}
                      >
                        Limpar
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? "Processando..." : "Emitir Nota de Débito"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Informações da Nota de Débito */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  📄 Informações
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="font-medium text-gray-900">NOTA DE DÉBITO</p>
                    <p className="text-xs text-gray-600">
                      Empresa: <strong>Mega Centro e Logistica</strong>
                    </p>
                    <p className="text-xs text-gray-600">
                      IVA Padrão:{" "}
                      <strong>{formNotaDebito.valores.ivaPercentual}%</strong>
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Factura Original:</span>
                    <p className="font-medium text-gray-950">
                      {formNotaDebito.documentoOriginal.numeroDocumento || "-"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Valor do Débito:</span>
                    <p className="font-medium text-gray-950">
                      {formatarValor(formNotaDebito.valores.valorBase)} MT
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Total com IVA:</span>
                    <p className="font-medium text-gray-950">
                      {formatarValor(formNotaDebito.valores.valorTotal)} MT
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emissão de Guia de Transporte */}
        {activeDocumentType === "guia-transporte" && (
          <div>
            {/* Menu de Navegação para Guias */}
            <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
              <button
                onClick={() => setActiveEmissaoGuias("nova")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeEmissaoGuias === "nova"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                ✨ Nova Guia
              </button>
              <button
                onClick={() => {
                  setActiveEmissaoGuias("consultar");
                  buscarDocumentos();
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeEmissaoGuias === "consultar"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                🔍 Consultar
              </button>
              <button
                onClick={() => {
                  setActiveEmissaoGuias("pendentes");
                  carregarDocumentosPendentes();
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeEmissaoGuias === "pendentes"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                ⏳ Pendentes
              </button>
            </div>

            {/* Nova Emissão de Guia */}
            {activeEmissaoGuias === "nova" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Formulário de Emissão */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="p-4 border-b border-gray-200 bg-red-50">
                      <h3 className="font-semibold text-gray-900">
                        ✨ Nova Guia de Transporte
                      </h3>
                    </div>
                    <div className="p-6">
                      <form
                        onSubmit={enviarGuiaTransporte}
                        className="space-y-6"
                      >
                        {/* Dados do Cliente */}
                        <div className="border-b border-gray-200 pb-6">
                          <h4 className="font-semibold text-gray-900 mb-4">
                            👤 Dados do Cliente
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nome do Cliente *
                              </label>
                              <input
                                type="text"
                                value={formGuiaTransporte.cliente.nomeCliente}
                                onChange={(e) =>
                                  handleFormChange(
                                    setFormGuiaTransporte,
                                    "cliente.nomeCliente",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                                placeholder="Nome do cliente"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                NUIT do Cliente *
                              </label>
                              <input
                                type="text"
                                value={formGuiaTransporte.cliente.nuit}
                                onChange={(e) =>
                                  handleFormChange(
                                    setFormGuiaTransporte,
                                    "cliente.nuit",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                                placeholder="Número de Identificação Tributária"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        {/* Dados do Transporte */}
                        <div className="border-b border-gray-200 pb-6">
                          <h4 className="font-semibold text-gray-900 mb-4">
                            🚚 Dados do Transporte
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Origem (Cidade) *
                              </label>
                              <input
                                type="text"
                                value={
                                  formGuiaTransporte.transporte.origem.cidade
                                }
                                onChange={(e) =>
                                  handleFormChange(
                                    setFormGuiaTransporte,
                                    "transporte.origem.cidade",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                                placeholder="Cidade de origem"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Destino (Cidade) *
                              </label>
                              <input
                                type="text"
                                value={
                                  formGuiaTransporte.transporte.destino.cidade
                                }
                                onChange={(e) =>
                                  handleFormChange(
                                    setFormGuiaTransporte,
                                    "transporte.destino.cidade",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                                placeholder="Cidade de destino"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Província de Origem
                              </label>
                              <input
                                type="text"
                                value={
                                  formGuiaTransporte.transporte.origem.provincia
                                }
                                onChange={(e) =>
                                  handleFormChange(
                                    setFormGuiaTransporte,
                                    "transporte.origem.provincia",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                                placeholder="Província"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Distância (km) *
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={
                                  formGuiaTransporte.transporte.distanciaKm
                                }
                                onChange={(e) =>
                                  handleFormChange(
                                    setFormGuiaTransporte,
                                    "transporte.distanciaKm",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                                placeholder="0"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        {/* Dados da Carga */}
                        <div className="border-b border-gray-200 pb-6">
                          <h4 className="font-semibold text-gray-900 mb-4">
                            📦 Dados da Carga
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tipo de Carga *
                              </label>
                              <select
                                value={formGuiaTransporte.carga.tipoCarga}
                                onChange={(e) =>
                                  handleFormChange(
                                    setFormGuiaTransporte,
                                    "carga.tipoCarga",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                                required
                              >
                                <option value="cimento">Cimento</option>
                                <option value="graos_cereais">
                                  Grãos e Cereais
                                </option>
                                <option value="produtos_alimentares">
                                  Produtos Alimentares
                                </option>
                                <option value="combustiveis">
                                  Combustíveis
                                </option>
                                <option value="materiais_construcao">
                                  Materiais Construção
                                </option>
                                <option value="outros">Outros</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Peso (kg) *
                              </label>
                              <input
                                type="number"
                                min="1"
                                value={formGuiaTransporte.carga.pesoKg}
                                onChange={(e) =>
                                  handleFormChange(
                                    setFormGuiaTransporte,
                                    "carga.pesoKg",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                                placeholder="0"
                                required
                              />
                            </div>
                          </div>

                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Descrição da Carga *
                            </label>
                            <textarea
                              value={formGuiaTransporte.carga.descricao}
                              onChange={(e) =>
                                handleFormChange(
                                  setFormGuiaTransporte,
                                  "carga.descricao",
                                  e.target.value
                                )
                              }
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                              placeholder="Descrição detalhada da carga..."
                              required
                            />
                          </div>
                        </div>

                        {/* Dados do Veículo */}
                        <div className="border-b border-gray-200 pb-6">
                          <h4 className="font-semibold text-gray-900 mb-4">
                            🚛 Dados do Veículo
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Matrícula do Veículo *
                              </label>
                              <input
                                type="text"
                                value={
                                  formGuiaTransporte.veiculoMotorista.veiculo
                                    .matricula
                                }
                                onChange={(e) =>
                                  handleFormChange(
                                    setFormGuiaTransporte,
                                    "veiculoMotorista.veiculo.matricula",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                                placeholder="Ex: AB-123-MP"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tipo de Veículo *
                              </label>
                              <select
                                value={
                                  formGuiaTransporte.veiculoMotorista.veiculo
                                    .tipoVeiculo
                                }
                                onChange={(e) =>
                                  handleFormChange(
                                    setFormGuiaTransporte,
                                    "veiculoMotorista.veiculo.tipoVeiculo",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                                required
                              >
                                <option value="bau">Baú</option>
                                <option value="cacamba">Caçamba</option>
                                <option value="truck_3_eixos">
                                  Truck 3 Eixos
                                </option>
                                <option value="tanque">Tanque</option>
                                <option value="refrigerado">Refrigerado</option>
                                <option value="plataforma">Plataforma</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Dados do Motorista */}
                        <div className="border-b border-gray-200 pb-6">
                          <h4 className="font-semibold text-gray-900 mb-4">
                            👨‍✈️ Dados do Motorista
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nome do Motorista *
                              </label>
                              <input
                                type="text"
                                value={
                                  formGuiaTransporte.veiculoMotorista.motorista
                                    .nome
                                }
                                onChange={(e) =>
                                  handleFormChange(
                                    setFormGuiaTransporte,
                                    "veiculoMotorista.motorista.nome",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                                placeholder="Nome completo do motorista"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Carta de Condução *
                              </label>
                              <input
                                type="text"
                                value={
                                  formGuiaTransporte.veiculoMotorista.motorista
                                    .cartaConducao
                                }
                                onChange={(e) =>
                                  handleFormChange(
                                    setFormGuiaTransporte,
                                    "veiculoMotorista.motorista.cartaConducao",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                                placeholder="Número da carta de condução"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                          <button
                            type="button"
                            onClick={() =>
                              setFormGuiaTransporte({
                                ...formGuiaTransporte,
                                cliente: {
                                  ...formGuiaTransporte.cliente,
                                  nomeCliente: "",
                                  nuit: "",
                                },
                                transporte: {
                                  ...formGuiaTransporte.transporte,
                                  origem: {
                                    ...formGuiaTransporte.transporte.origem,
                                    cidade: "",
                                    provincia: "",
                                  },
                                  destino: {
                                    ...formGuiaTransporte.transporte.destino,
                                    cidade: "",
                                    provincia: "",
                                  },
                                  distanciaKm: 0,
                                },
                                carga: {
                                  ...formGuiaTransporte.carga,
                                  pesoKg: 0,
                                  descricao: "",
                                },
                                veiculoMotorista: {
                                  ...formGuiaTransporte.veiculoMotorista,
                                  veiculo: {
                                    ...formGuiaTransporte.veiculoMotorista
                                      .veiculo,
                                    matricula: "",
                                  },
                                  motorista: {
                                    ...formGuiaTransporte.veiculoMotorista
                                      .motorista,
                                    nome: "",
                                    cartaConducao: "",
                                  },
                                },
                                valores: {
                                  ...formGuiaTransporte.valores,
                                  valorBase: 0,
                                  valorTotal: 0,
                                },
                              })
                            }
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                            disabled={loading}
                          >
                            Limpar
                          </button>
                          <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {loading
                              ? "Processando..."
                              : "Emitir Guia de Transporte"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* Pré-visualização */}
                <div className="space-y-6">
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      📄 Pré-visualização
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-gray-900">
                          Guia de Transporte
                        </p>
                        <p className="text-xs text-gray-600">
                          Empresa: <strong>Mega Centro e Logistica</strong>
                        </p>
                      </div>

                      <div>
                        <span className="text-gray-600">Cliente:</span>
                        <p className="font-medium text-gray-950">
                          {formGuiaTransporte.cliente.nomeCliente || "-"}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">NUIT:</span>
                        <p className="font-medium text-gray-950">
                          {formGuiaTransporte.cliente.nuit || "-"}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Rota:</span>
                        <p className="font-medium text-gray-950">
                          {formGuiaTransporte.transporte.origem.cidade || "-"} →{" "}
                          {formGuiaTransporte.transporte.destino.cidade || "-"}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Carga:</span>
                        <p className="font-medium text-gray-950">
                          {formGuiaTransporte.carga.tipoCarga || "-"}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Peso:</span>
                        <p className="font-medium text-gray-950">
                          {formGuiaTransporte.carga.pesoKg || 0} kg
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Distância:</span>
                        <p className="font-medium text-gray-950">
                          {formatarValor(
                            formGuiaTransporte.transporte.distanciaKm * 50 +
                              formGuiaTransporte.carga.pesoKg * 0.5
                          )}{" "}
                          MT
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Valor Estimado:</span>
                        <p className="font-medium text-gray-950">
                          {(
                            formGuiaTransporte.transporte.distanciaKm * 50 +
                            formGuiaTransporte.carga.pesoKg * 0.5
                          ).toFixed(2)}{" "}
                          MT
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Consulta de Guias */}
            {activeEmissaoGuias === "consultar" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4 border-b border-gray-200 bg-blue-50">
                    <h3 className="font-semibold text-gray-900">
                      🔍 Consulta de Guias Emitidas
                    </h3>
                  </div>
                  <div className="p-6">
                    {/* Filtros */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <input
                        type="text"
                        value={filtrosConsulta.numeroDocumento}
                        onChange={(e) =>
                          setFiltrosConsulta({
                            ...filtrosConsulta,
                            numeroDocumento: e.target.value,
                          })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                        placeholder="Nº da Guia"
                      />
                      <select
                        value={filtrosConsulta.status}
                        onChange={(e) =>
                          setFiltrosConsulta({
                            ...filtrosConsulta,
                            status: e.target.value,
                          })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                      >
                        <option value="">Status: Todos</option>
                        <option value="emitido">Emitida</option>
                        <option value="em_transporte">Em Transporte</option>
                        <option value="entregue">Entregue</option>
                        <option value="faturado">Faturado</option>
                        <option value="cancelado">Cancelado</option>
                      </select>
                      <input
                        type="date"
                        value={filtrosConsulta.dataInicio}
                        onChange={(e) =>
                          setFiltrosConsulta({
                            ...filtrosConsulta,
                            dataInicio: e.target.value,
                          })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                        placeholder="De"
                      />
                      <input
                        type="date"
                        value={filtrosConsulta.dataFim}
                        onChange={(e) =>
                          setFiltrosConsulta({
                            ...filtrosConsulta,
                            dataFim: e.target.value,
                          })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                        placeholder="Até"
                      />
                    </div>

                    <div className="flex justify-between mb-4">
                      <button
                        onClick={buscarDocumentos}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        disabled={loading}
                      >
                        🔍 Buscar
                      </button>
                    </div>

                    {/* Lista de Guias */}
                    <div className="space-y-4">
                      {documentosFiscais.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          Nenhum documento encontrado
                        </div>
                      ) : (
                        documentosFiscais.map((documento) => (
                          <div
                            key={documento._id}
                            className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                          >
                            <div className="flex items-center space-x-4">
                              <div
                                className={`w-2 h-12 rounded-full ${
                                  documento.status === "entregue"
                                    ? "bg-green-500"
                                    : documento.status === "em_transporte"
                                    ? "bg-yellow-500"
                                    : documento.status === "faturado"
                                    ? "bg-blue-500"
                                    : documento.status === "cancelado"
                                    ? "bg-red-500"
                                    : "bg-gray-500"
                                }`}
                              ></div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {documento.numeroDocumento}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {documento.cliente?.nomeCliente} •{" "}
                                  {documento.transporte?.origem?.cidade} →{" "}
                                  {documento.transporte?.destino?.cidade}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {new Date(
                                    documento.datas?.dataEmissao
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Valor</p>
                              <p className="font-bold text-gray-900">
                                {documento.valores?.valorTotal?.toFixed(2) ||
                                  "0.00"}{" "}
                                MT
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Status</p>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  documento.status === "entregue"
                                    ? "bg-green-100 text-green-800"
                                    : documento.status === "em_transporte"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : documento.status === "faturado"
                                    ? "bg-blue-100 text-blue-800"
                                    : documento.status === "cancelado"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {documento.status}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Guias Pendentes */}
            {activeEmissaoGuias === "pendentes" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4 border-b border-gray-200 bg-blue-50">
                    <h3 className="font-semibold text-gray-900">
                      ⏳ Guias Pendentes de Faturação
                    </h3>
                  </div>
                  <div className="p-6">
                    {guiasPendentes.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        Nenhuma guia pendente de faturação
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {guiasPendentes.map((guia) => (
                          <div
                            key={guia._id}
                            className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                                GT
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {guia.numeroDocumento}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {guia.cliente?.nomeCliente} •{" "}
                                  {guia.transporte?.origem?.cidade} →{" "}
                                  {guia.transporte?.destino?.cidade}
                                </p>
                                <p className="text-xs text-blue-600">
                                  Entregue:{" "}
                                  {new Date(
                                    guia.datas?.dataEmissao
                                  ).toLocaleDateString()}{" "}
                                  • Aguardando FAT
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">
                                {guia.valores?.valorTotal?.toFixed(2) || "0.00"}{" "}
                                MT
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmissaoGuias;
