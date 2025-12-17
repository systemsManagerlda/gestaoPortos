import React, { useState, useEffect } from "react";
import axios from "axios";
import { gerarPDFDespachoAduaneiroCompleto } from "../../context/pdfGenerator";

// Configuração da API
const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

const DespachoAduaneiro = () => {
  const [activeAduanaProcess, setActiveAduanaProcess] = useState("importacao");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [despachos, setDespachos] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingDespacho, setEditingDespacho] = useState(null);
  const [editFormData, setEditFormData] = useState(null);

  // NOVO ESTADO: Lista de despachantes
  const [despachantes, setDespachantes] = useState([]);
  const [loadingDespachantes, setLoadingDespachantes] = useState(false);

  // Estado para empresa padrão
  const [empresaInfo] = useState({
    empresaId: 1,
    empresaCodigo: "MCL001",
    nomeEmpresa: "Mega Centro e Logistica",
  });

  const [filtros, setFiltros] = useState({
    curPage: 1,
    pageSize: 10,
    tipoProcesso: "",
    status: "",
    clienteNome: "",
    clienteNuit: "",
    dataInicio: "",
    dataFim: "",
    numeroProcesso: "",
  });

  // Função para criar objeto de formulário base com valores corretos para enum
  const criarFormDataBase = () => ({
    // Identificação Básica
    empresaId: 1,
    empresaCodigo: "MCL001",
    nomeEmpresa: "Mega Centro e Logistica",
    tipoProcesso: "importacao",
    subTipoProcesso: "consumo",

    // Numeração (gerado pelo servidor)
    numeroSequencial: Math.floor(Math.random() * 10000) + 1,
    anoFiscal: new Date().getFullYear(),

    // Datas
    datas: {
      dataCriacao: new Date().toISOString().split("T")[0],
    },

    // Status do Processo
    status: "rascunho",
    prioridade: "normal",

    // Cliente/Importador/Exportador
    cliente: {
      clienteId: null,
      codigoCliente: "",
      nomeCliente: "",
      nuit: "",
      tipoCliente: "importador",
      categoriaCliente: "normal",
      regimeTributario: "geral",
      contato: {
        nome: "",
        email: "",
        telefone: "",
        telefoneAlternativo: "",
        cargo: "",
      },
      endereco: {
        cidade: "Maputo",
        provincia: "Maputo",
        pais: "Moçambique",
        endereco: "",
        codigoPostal: "",
        bairro: "",
      },
    },

    // Fornecedor/Remetente
    fornecedor: {
      nome: "",
      pais: "",
      endereco: "",
      contato: {
        nome: "",
        email: "",
        telefone: "",
      },
      incoterm: "FOB",
      moedaPagamento: "USD",
    },

    // Dados da Mercadoria
    mercadoria: {
      descricao: "",
      descricaoComercial: "",
      codigoNCM: "",
      codigoHS: "",
      nomenclaturaNCM: "",
      quantidade: 0,
      unidadeMedida: "kg",
      quantidadeUnidadeTributavel: 0,
      unidadeTributavel: "",
      pesoBruto: 0,
      pesoLiquido: 0,
      cubagem: 0,
      volume: 0,
      valorMercadoria: 0,
      valorFrete: 0,
      valorSeguro: 0,
      valorOutrosAcrescimos: 0,
      moeda: "USD",
      tipoCarga: "geral",
      marca: "",
      modelo: "",
      serialNumber: "",
      lote: "",
      dataFabricacao: "",
      dataValidade: "",
      origemMercadoria: "",
      certificadoOrigem: {
        tipo: "geral",
        numero: "",
        dataEmissao: "",
      },
    },

    // Itens da Mercadoria
    itens: [],

    // Dados do Transporte
    transporte: {
      meioTransporte: "maritimo",
      tipoNavio: "container",
      tipoContainer: "dry",
      numeroContainer: "",
      seloContainer: "",
      quantidadeContainers: 1,
      tamanhoContainer: "20",
      portoOrigem: "",
      portoDestino: "Maputo",
      aeroportoOrigem: "",
      aeroportoDestino: "",
      numeroConhecimento: "",
      numeroBL: "",
      navioVoo: "",
      companhiaTransporte: "",
      agenciaMaritima: "",
      despachanteTransporte: "",
      rota: {
        origem: {
          cidade: "",
          provincia: "",
          pais: "",
        },
        destino: {
          cidade: "",
          provincia: "",
          pais: "",
        },
        distanciaKm: 0,
        tempoEstimadoDias: 0,
      },
      dataPrevistaEmbarque: "",
      dataPrevistaChegada: "",
    },

    // Dados do Regime Aduaneiro
    regimeAduaneiro: {
      tipoRegime: "definitivo",
      destinoAduaneiro: "consumo",
      prazoValidade: "",
      numeroLicencaImportacao: "",
      numeroAutorizacaoEspecial: "",
      tipoDeclaracao: "normal",
    },

    // Tributação e Impostos - CORRIGIDO: campos enum com valores válidos ou undefined
    tributacao: {
      valorAduaneiro: 0,
      moedaAduaneira: "USD",
      taxaCambio: 1,
      dataCambio: new Date().toISOString().split("T")[0],
      baseCalculo: 0,
      impostos: {
        direitosAduaneiros: {
          percentual: 0,
          valor: 0,
          codigoTributo: "",
        },
        iva: {
          percentual: 16,
          valor: 0,
          codigoTributo: "",
        },
        impostoEspecifico: {
          percentual: 0,
          valor: 0,
          unidade: "",
          codigoTributo: "",
        },
        taxaAdicional: {
          percentual: 0,
          valor: 0,
          codigoTributo: "",
        },
        outrasTaxas: [],
        totalImpostos: 0,
        totalLiquido: 0,
      },
      isencao: {
        isento: false,
        motivo: "",
        numeroAutorizacao: "",
        percentualIsencao: 0,
      },
      regimeTributarioEspecial: undefined, // CORRIGIDO: enviar como undefined se não for preenchido
    },

    // Garantias (para trânsito)
    garantias: {
      tipoGarantia: "seguro",
      valorGarantia: 0,
      moedaGarantia: "USD",
      seguradora: "",
      numeroApolice: "",
      banco: "",
      numeroFianca: "",
      dataEmissao: "",
      dataValidade: "",
      statusGarantia: "ativa",
      observacoes: "",
    },

    // Documentação Necessária
    documentacao: {
      documentos: [],
      documentacaoCompleta: false,
      percentualCompleto: 0,
      observacoesDocumentacao: "",
      dataVerificacaoDocumental: "",
      verificadorDocumental: "",
    },

    // Informações de Pagamento
    pagamento: {
      valorTotal: 0,
      moeda: "USD",
      statusPagamento: "pendente",
      meioPagamento: "transferencia",
      tipoPagamento: "avista",
      dataVencimento: "",
      dataPagamento: "",
      valorPago: 0,
      referenciaPagamento: "",
      numeroRecibo: "",
      contaBancaria: {
        banco: "",
        nib: "",
        iban: "",
        conta: "",
      },
      parcelas: [],
      historicoPagamentos: [],
    },

    // Anexos
    anexos: [],

    // Consultoria (específico para consultoria)
    consultoria: {
      tipoConsulta: "tributaria",
      descricaoConsulta: "",
      prioridade: "normal",
      consultorResponsavel: "",
      dataSolicitacao: new Date().toISOString().split("T")[0],
      dataLimiteResposta: "",
      dataResposta: "",
      resposta: "",
      statusConsulta: "aguardando",
      valorConsulta: 0,
      formaPagamentoConsulta: "pre_pago",
      anexosConsulta: [],
    },

    // Rastreio
    rastreio: {
      localizacaoAtual: "",
      statusRastreio: "aguardando_embarque",
      historicoLocalizacao: [],
      estimativaEntrega: "",
      dataRealEntrega: "",
      codigoRastreio: "",
      urlRastreio: "",
      temperatura: {
        valor: null,
        unidade: "C",
        dataLeitura: "",
      },
      umidade: {
        valor: null,
        unidade: "%",
        dataLeitura: "",
      },
    },

    // Incidentes
    incidentes: [],

    // Alfândega
    alfandega: {
      portoAlfandegado: "",
      codigoAlfandega: "",
      numeroRegistro: "",
      fiscalResponsavel: "",
      dataInspecao: "",
      tipoInspecao: "documental",
      resultadoInspecao: "",
      observacoesAlfandega: "",
      orgaosEnvolvidos: [],
      canalVerde: false,
      numeroCanal: "amarelo",
      dataLiberacao: "",
      liberadoPor: "",
    },

    // Histórico
    historicoAlteracoes: [],

    // Aprovações
    aprovacoes: [],

    // Notificações
    notificacoes: [],

    // Custos
    custos: {
      custosServicos: [],
      totalCustos: 0,
      margemLucro: {
        percentual: 0,
        valor: 0,
      },
      valorFaturamento: 0,
      numeroFatura: "",
      dataFaturamento: "",
      statusFaturamento: "nao_faturado",
    },

    // Informações Adicionais
    observacoes: "",
    observacoesInternas: "",
    tags: [],
    classificacaoRisco: "medio",
    motivoPrioridade: "",
    canaisAtendimento: {
      canal: "web",
      atendente: "",
      dataPrimeiroContato: "",
    },

    // Configurações
    configuracoes: {
      notificacoes: {
        email: true,
        sms: false,
        whatsapp: false,
        push: false,
      },
      alertas: {
        diasAntesVencimento: 7,
        notificarAtraso: true,
        notificarStatus: true,
      },
      idioma: "pt",
      moedaApresentacao: "USD",
      fusoHorario: "Africa/Maputo",
      formatoData: "DD/MM/YYYY",
      permissoesEspeciais: {
        edicaoRestrita: false,
        visualizacaoRestrita: false,
        usuariosAutorizados: [],
      },
    },

    // Relacionamentos
    relacionamentos: {
      processosRelacionados: [],
      contratosAssociados: [],
    },

    // Metadata
    metadata: {
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
      criadoPor: "usuario_sistema",
      atualizadoPor: "usuario_sistema",
      usuarioSubmissao: "",
      terminalSubmissao: "",
      ipSubmissao: "",
      versao: 1,
      hashIntegridade: "",
      origemDados: "manual",
      batchId: "",
    },
  });

  const sincronizarRotaComTransporte = (dados) => {
    const novosDados = { ...dados };

    // Se temos informações de transporte, preencher a rota
    if (
      novosDados.transporte.portoOrigem ||
      novosDados.transporte.aeroportoOrigem
    ) {
      novosDados.transporte.rota = {
        ...novosDados.transporte.rota,
        origem: {
          cidade:
            novosDados.transporte.portoOrigem ||
            novosDados.transporte.aeroportoOrigem ||
            "",
          provincia: "",
          pais: "",
        },
        destino: {
          cidade:
            novosDados.transporte.portoDestino ||
            novosDados.transporte.aeroportoDestino ||
            "",
          provincia: "",
          pais: "",
        },
      };
    }

    return novosDados;
  };

  // Inicializar formData com o objeto base
  const [formData, setFormData] = useState(criarFormDataBase());

  // Estados para busca
  const [totalPages, setTotalPages] = useState(0);
  const [selectedDespacho, setSelectedDespacho] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Mercadoria");

  // Estados para dashboard
  const [statistics, setStatistics] = useState({
    totalDespachos: 0,
    importacoes: 0,
    exportacoes: 0,
    transitos: 0,
    despachosAtrasados: 0,
    valorTotal: 0,
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
      minimumFractionDigits: 2,
    }).format(value || 0);
  };

  const formatDate = (dateString) => {
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

  // Função para limpar campos enum vazios antes de enviar
  const limparCamposEnumVazios = (obj) => {
    const newObj = { ...obj };

    // Remover campos enum que estão como string vazia
    const camposEnumParaVerificar = [
      "tributacao.regimeTributarioEspecial.tipo",
      "mercadoria.certificadoOrigem.tipo",
      "transporte.meioTransporte",
      "transporte.tipoNavio",
      "transporte.tipoContainer",
      "transporte.tamanhoContainer",
      "regimeAduaneiro.tipoRegime",
      "regimeAduaneiro.destinoAduaneiro",
      "regimeAduaneiro.tipoDeclaracao",
      "garantias.tipoGarantia",
      "pagamento.meioPagamento",
      "pagamento.tipoPagamento",
      "consultoria.tipoConsulta",
      "consultoria.formaPagamentoConsulta",
      "rastreio.statusRastreio",
      "alfandega.tipoInspecao",
      "alfandega.numeroCanal",
      "configuracoes.idioma",
      "cliente.tipoCliente",
      "cliente.categoriaCliente",
      "cliente.regimeTributario",
      "mercadoria.unidadeMedida",
      "mercadoria.tipoCarga",
      "fornecedor.incoterm",
    ];

    // Função recursiva para limpar campos
    const limparCampo = (obj, path) => {
      const keys = path.split(".");
      let current = obj;

      for (let i = 0; i < keys.length - 1; i++) {
        if (current[keys[i]] === undefined || current[keys[i]] === null) {
          return;
        }
        current = current[keys[i]];
      }

      const lastKey = keys[keys.length - 1];
      if (current[lastKey] === "") {
        delete current[lastKey];
      }
    };

    camposEnumParaVerificar.forEach((campo) => {
      limparCampo(newObj, campo);
    });

    return newObj;
  };

  // Função para buscar despachantes disponíveis
  // Função para buscar despachantes disponíveis
const fetchDespachantes = async () => {
  try {
    setLoadingDespachantes(true);
    
    console.log("Buscando despachantes...");

    // Primeiro, tentar buscar todos os despachantes ativos
    const response = await axios.post(
      `${API_BASE_URL}/getDespachanteList`,
      {
        curPage: 1,
        pageSize: 100, // Buscar muitos registros
        statusAtual: "ativo", // Filtrar apenas ativos
      }
    );

    console.log("Resposta da API:", response.data);

    if (response.data.returnCode === 200) {
      const despachantesList = response.data.data.list || [];
      console.log(`Encontrados ${despachantesList.length} despachantes`);
      
      // Se a lista estiver vazia, tentar a rota de disponíveis
      if (despachantesList.length === 0) {
        console.log("Lista vazia, tentando rota de disponíveis...");
        
        const responseDisponiveis = await axios.post(
          `${API_BASE_URL}/getDespachantesDisponiveis`,
          {
            limit: 100,
          }
        );

        if (responseDisponiveis.data.returnCode === 200) {
          setDespachantes(responseDisponiveis.data.data.despachantes || []);
          console.log(`Encontrados ${responseDisponiveis.data.data.despachantes?.length || 0} despachantes disponíveis`);
        } else {
          console.warn("Erro na rota de disponíveis:", responseDisponiveis.data);
          setDespachantes([]);
        }
      } else {
        setDespachantes(despachantesList);
      }
    } else {
      console.warn("Erro na resposta principal:", response.data);
      
      // Tentar rota alternativa
      try {
        const responseAlternativa = await axios.post(
          `${API_BASE_URL}/getDespachantesPorDepartamento`,
          {
            departamento: "despacho",
            limit: 50
          }
        );
        
        if (responseAlternativa.data.returnCode === 200) {
          setDespachantes(responseAlternativa.data.data.despachantes || []);
        } else {
          setDespachantes([]);
        }
      } catch (altError) {
        console.error("Erro na rota alternativa:", altError);
        setDespachantes([]);
      }
    }
  } catch (error) {
    console.error("Erro detalhado ao buscar despachantes:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url
    });
    
  } finally {
    setLoadingDespachantes(false);
  }
};

  // Função para buscar despachantes com filtros avançados
  const searchDespachantes = async (searchQuery) => {
    try {
      setLoadingDespachantes(true);

      const response = await axios.post(`${API_BASE_URL}/searchDespachantes`, {
        query: searchQuery,
        campos: [
          "codigoDespachante",
          "dadosPessoais.nomeCompleto",
          "matriculaAlfandega",
          "contatos.emailPrincipal",
        ],
        pageSize: 20,
      });

      if (response.data.returnCode === 200) {
        return response.data.data.list || [];
      }
      return [];
    } catch (error) {
      console.error("Erro ao pesquisar despachantes:", error);
      return [];
    } finally {
      setLoadingDespachantes(false);
    }
  };

  // Função para buscar despachantes por departamento
  const fetchDespachantesPorDepartamento = async (departamento) => {
    try {
      setLoadingDespachantes(true);

      const response = await axios.post(
        `${API_BASE_URL}/getDespachantesPorDepartamento`,
        {
          departamento: departamento,
          limit: 30,
        }
      );

      if (response.data.returnCode === 200) {
        setDespachantes(response.data.data.despachantes || []);
      }
    } catch (error) {
      console.error("Erro ao buscar despachantes por departamento:", error);
    } finally {
      setLoadingDespachantes(false);
    }
  };

  // Modificar o useEffect inicial para buscar despachantes
  useEffect(() => {
    fetchDespachos();
    fetchDespachantes(); // Buscar despachantes quando o componente montar
  }, []);

  // Efeito para atualizar despachantes quando o tipo de processo mudar
  useEffect(() => {
    if (
      [
        "importacao",
        "exportacao",
        "transito",
        "despacho",
        "consultoria",
      ].includes(activeAduanaProcess)
    ) {
      fetchDespachantes();
    }
  }, [activeAduanaProcess]);

  // Função para formatar dados antes de enviar
  const formatarDadosParaEnvio = (dados) => {
    // Clonar os dados
    let dadosParaEnvio = JSON.parse(JSON.stringify(dados));

    // Limpar campos enum vazios
    dadosParaEnvio = limparCamposEnumVazios(dadosParaEnvio);

    // Remover campos que são arrays vazios (exceto os obrigatórios)
    const camposParaLimparSeVazios = [
      "itens",
      "anexos",
      "incidentes",
      "historicoAlteracoes",
      "aprovacoes",
      "notificacoes",
      "custos.custosServicos",
      "pagamento.parcelas",
      "pagamento.historicoPagamentos",
      "tributacao.impostos.outrasTaxas",
      "documentacao.documentos",
      "rastreio.historicoLocalizacao",
      "relacionamentos.processosRelacionados",
      "relacionamentos.contratosAssociados",
      "alfandega.orgaosEnvolvidos",
      "tags",
      "configuracoes.permissoesEspeciais.usuariosAutorizados",
    ];

    // Função para remover array vazio
    const removerArrayVazio = (obj, path) => {
      const keys = path.split(".");
      let current = obj;

      for (let i = 0; i < keys.length - 1; i++) {
        if (current[keys[i]] === undefined || current[keys[i]] === null) {
          return;
        }
        current = current[keys[i]];
      }

      const lastKey = keys[keys.length - 1];
      if (Array.isArray(current[lastKey]) && current[lastKey].length === 0) {
        delete current[lastKey];
      }
    };

    camposParaLimparSeVazios.forEach((campo) => {
      removerArrayVazio(dadosParaEnvio, campo);
    });

    // Remover campos completamente vazios ou null
    const removerCamposVazios = (obj) => {
      Object.keys(obj).forEach((key) => {
        if (obj[key] === null || obj[key] === undefined) {
          delete obj[key];
        } else if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
          removerCamposVazios(obj[key]);
          if (Object.keys(obj[key]).length === 0) {
            delete obj[key];
          }
        } else if (Array.isArray(obj[key]) && obj[key].length === 0) {
          delete obj[key];
        } else if (obj[key] === "") {
          delete obj[key];
        }
      });
      return obj;
    };

    // Aplicar apenas a objetos aninhados, não ao objeto raiz
    const limparObjetosAninhados = (obj) => {
      Object.keys(obj).forEach((key) => {
        if (
          typeof obj[key] === "object" &&
          obj[key] !== null &&
          !Array.isArray(obj[key])
        ) {
          obj[key] = removerCamposVazios(obj[key]);
        }
      });
      return obj;
    };

    dadosParaEnvio = limparObjetosAninhados(dadosParaEnvio);

    // Garantir que os campos obrigatórios do schema estejam presentes
    if (!dadosParaEnvio.numeroSequencial) {
      dadosParaEnvio.numeroSequencial = Math.floor(Math.random() * 10000) + 1;
    }

    if (!dadosParaEnvio.anoFiscal) {
      dadosParaEnvio.anoFiscal = new Date().getFullYear();
    }

    // Configurar metadata corretamente
    dadosParaEnvio.metadata = {
      dataCriacao: new Date(),
      dataAtualizacao: new Date(),
      criadoPor: "usuario_sistema",
      atualizadoPor: "usuario_sistema",
      origemDados: "manual",
      versao: 1,
      ...dadosParaEnvio.metadata,
    };

    // Remover campos que não devem ser enviados ou que o servidor gera automaticamente
    delete dadosParaEnvio.numeroProcesso; // Será gerado pelo servidor
    delete dadosParaEnvio._id;
    delete dadosParaEnvio.__v;
    delete dadosParaEnvio.id;

    return dadosParaEnvio;
  };

  // Função para atualizar campos aninhados
  const updateFormData = (path, value) => {
    const keys = path.split(".");
    setFormData((prev) => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]] || typeof current[keys[i]] !== "object") {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  // Buscar despachos
  const fetchDespachos = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/getDespachosAduaneirosList`,
        filtros
      );

      if (response.data.returnCode === 200) {
        setDespachos(response.data.data.list);
        setTotalPages(response.data.data.totalPage);
      }
    } catch (error) {
      console.error("Erro ao buscar despachos:", error);
      setError("Erro ao buscar despachos. Usando dados de exemplo.");
      // Dados de exemplo para desenvolvimento
      setDespachos([
        {
          _id: "1",
          numeroProcesso: "IMP-2024-00155",
          tipoProcesso: "importacao",
          status: "em_analise",
          cliente: {
            nomeCliente: "Cimentos de Moçambique",
            nuit: "123456789",
          },
          mercadoria: {
            descricao: "Cimento Portland",
            valorMercadoria: 25000,
          },
          datas: {
            dataCriacao: new Date(),
          },
          pagamento: {
            valorTotal: 28500,
            valorPago: 15000,
            statusPagamento: "parcial",
          },
        },
        {
          _id: "2",
          numeroProcesso: "EXP-2024-00156",
          tipoProcesso: "exportacao",
          status: "concluido",
          cliente: {
            nomeCliente: "Mozal",
            nuit: "987654321",
          },
          mercadoria: {
            descricao: "Alumínio",
            valorMercadoria: 18500,
          },
          datas: {
            dataCriacao: new Date(),
          },
          pagamento: {
            valorTotal: 20500,
            valorPago: 20500,
            statusPagamento: "pago",
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Criar despacho aduaneiro
  const criarDespachoAduaneiro = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      // Sincronizar dados de rota antes da validação
      const dadosSincronizados = sincronizarRotaComTransporte(formData);

      // Validar campos obrigatórios baseados no schema
      const validacoes = {
        importacao: () => {
          if (!formData.cliente.nomeCliente || !formData.cliente.nuit) {
            throw new Error("Nome do cliente e NUIT são obrigatórios");
          }
          if (!formData.mercadoria.descricao) {
            throw new Error("Descrição da mercadoria é obrigatória");
          }
          // Validar NUIT
          if (!/^\d{9}$/.test(formData.cliente.nuit)) {
            throw new Error("NUIT inválido. Deve conter 9 dígitos.");
          }
          // Validar NCM se fornecido
          if (
            formData.mercadoria.codigoNCM &&
            !/^\d{8}$/.test(formData.mercadoria.codigoNCM)
          ) {
            throw new Error("Código NCM inválido. Deve conter 8 dígitos.");
          }
        },
        exportacao: () => {
          if (!formData.cliente.nomeCliente || !formData.cliente.nuit) {
            throw new Error("Nome do cliente e NUIT são obrigatórios");
          }
          if (!formData.mercadoria.descricao) {
            throw new Error("Descrição da mercadoria é obrigatória");
          }
          if (!/^\d{9}$/.test(formData.cliente.nuit)) {
            throw new Error("NUIT inválido. Deve conter 9 dígitos.");
          }
        },
        transito: () => {
          if (
            !dadosSincronizados.cliente.nomeCliente ||
            !dadosSincronizados.cliente.nuit
          ) {
            throw new Error("Nome do cliente e NUIT são obrigatórios");
          }
          if (!dadosSincronizados.mercadoria.descricao) {
            throw new Error("Descrição da mercadoria é obrigatória");
          }
          if (
            !dadosSincronizados.transporte.rota.origem.cidade ||
            !dadosSincronizados.transporte.rota.destino.cidade
          ) {
            throw new Error("Origem e destino são obrigatórios");
          }
          if (!/^\d{9}$/.test(dadosSincronizados.cliente.nuit)) {
            throw new Error("NUIT inválido. Deve conter 9 dígitos.");
          }
        },
        despacho: () => {
          if (!formData.cliente.nomeCliente || !formData.cliente.nuit) {
            throw new Error("Nome do cliente e NUIT são obrigatórios");
          }
          if (!formData.mercadoria.descricao) {
            throw new Error("Descrição da mercadoria é obrigatória");
          }
          if (!/^\d{9}$/.test(formData.cliente.nuit)) {
            throw new Error("NUIT inválido. Deve conter 9 dígitos.");
          }
          if (
            formData.mercadoria.codigoNCM &&
            !/^\d{8}$/.test(formData.mercadoria.codigoNCM)
          ) {
            throw new Error("Código NCM inválido. Deve conter 8 dígitos.");
          }
        },
        consultoria: () => {
          if (!formData.cliente.nomeCliente || !formData.cliente.nuit) {
            throw new Error("Nome do cliente e NUIT são obrigatórios");
          }
          if (!formData.consultoria.descricaoConsulta) {
            throw new Error("Descrição da consultoria é obrigatória");
          }
          if (!/^\d{9}$/.test(formData.cliente.nuit)) {
            throw new Error("NUIT inválido. Deve conter 9 dígitos.");
          }
        },
      };

      // Executar validações específicas
      if (validacoes[formData.tipoProcesso]) {
        validacoes[formData.tipoProcesso]();
      }

      // Preparar dados para envio
      const dadosParaEnvio = formatarDadosParaEnvio(formData);

      // Ajustes específicos por tipo de processo
      if (formData.tipoProcesso === "consultoria") {
        dadosParaEnvio.pagamento.valorTotal =
          formData.consultoria.valorConsulta || 0;
      }

      console.log("Enviando dados:", dadosParaEnvio);

      const response = await axios.post(
        `${API_BASE_URL}/createDespachoAduaneiro`,
        dadosParaEnvio
      );

      if (response.data.returnCode === 201) {
        setSuccess(
          `${
            formData.tipoProcesso.charAt(0).toUpperCase() +
            formData.tipoProcesso.slice(1)
          } criado com sucesso! Número: ${response.data.data.numeroProcesso}`
        );
        resetForm();
        fetchDespachos();
      } else {
        throw new Error(response.data.returnMsg || "Erro desconhecido");
      }
    } catch (error) {
      console.error("Erro detalhado:", error.response?.data || error.message);
      setError(
        `Erro ao criar ${formData.tipoProcesso}: ${
          error.response?.data?.returnMsg || error.message
        }`
      );

      // Simular sucesso para desenvolvimento
      if (process.env.NODE_ENV === "development") {
        const prefixos = {
          importacao: "IMP",
          exportacao: "EXP",
          transito: "TRA",
          despacho: "DAU",
          consultoria: "CON",
        };
        const prefixo = prefixos[formData.tipoProcesso] || "PRO";
        const ano = new Date().getFullYear();
        const numero = Math.floor(Math.random() * 1000) + 100;

        setSuccess(
          `${
            formData.tipoProcesso.charAt(0).toUpperCase() +
            formData.tipoProcesso.slice(1)
          } criado com sucesso (simulado)! Número: ${prefixo}-${ano}-${numero}`
        );
        resetForm();
        fetchDespachos();
      }
    } finally {
      setLoading(false);
    }
  };

  // Resetar formulário
  const resetForm = () => {
    setFormData(criarFormDataBase());

    // Atualizar tipo de processo baseado na aba ativa
    updateFormData("tipoProcesso", activeAduanaProcess);
    updateFormData(
      "cliente.tipoCliente",
      activeAduanaProcess === "exportacao"
        ? "exportador"
        : activeAduanaProcess === "transito"
        ? "transitario"
        : activeAduanaProcess === "consultoria"
        ? "outro"
        : "importador"
    );
  };

  // Calcular tributos automaticamente
  const calcularTributos = () => {
    const valorAduaneiro = formData.tributacao.valorAduaneiro || 0;
    const direitosPercentual =
      formData.tributacao.impostos.direitosAduaneiros.percentual || 0;
    const ivaPercentual = formData.tributacao.impostos.iva.percentual || 16;

    const direitosValor = valorAduaneiro * (direitosPercentual / 100);
    const baseCalculoIVA = valorAduaneiro + direitosValor;
    const ivaValor = baseCalculoIVA * (ivaPercentual / 100);
    const totalImpostos = direitosValor + ivaValor;
    const totalLiquido = valorAduaneiro + totalImpostos;

    updateFormData(
      "tributacao.impostos.direitosAduaneiros.valor",
      direitosValor
    );
    updateFormData("tributacao.impostos.iva.valor", ivaValor);
    updateFormData("tributacao.impostos.totalImpostos", totalImpostos);
    updateFormData("tributacao.impostos.totalLiquido", totalLiquido);
    updateFormData("pagamento.valorTotal", totalLiquido);

    setSuccess("Tributos calculados automaticamente!");
  };

  // Efeito inicial
  useEffect(() => {
    fetchDespachos();
  }, []);

  // Efeito para atualizar tipo de processo quando mudar a aba
  useEffect(() => {
    updateFormData("tipoProcesso", activeAduanaProcess);
    updateFormData(
      "cliente.tipoCliente",
      activeAduanaProcess === "exportacao"
        ? "exportador"
        : activeAduanaProcess === "transito"
        ? "transitario"
        : activeAduanaProcess === "consultoria"
        ? "outro"
        : "importador"
    );
  }, [activeAduanaProcess]);

  // Funções auxiliares para renderização
  const renderStatusBadge = (status) => {
    const statusConfig = {
      rascunho: { color: "bg-gray-100 text-gray-800", text: "Rascunho" },
      submetido: { color: "bg-blue-100 text-blue-800", text: "Submetido" },
      em_analise: {
        color: "bg-yellow-100 text-yellow-800",
        text: "Em Análise",
      },
      liberado: { color: "bg-green-100 text-green-800", text: "Liberado" },
      concluido: { color: "bg-green-500 text-white", text: "Concluído" },
      cancelado: { color: "bg-red-100 text-red-800", text: "Cancelado" },
      atrasado: { color: "bg-red-500 text-white", text: "Atrasado" },
      em_transito: {
        color: "bg-purple-100 text-purple-800",
        text: "Em Trânsito",
      },
      aguardando: {
        color: "bg-orange-100 text-orange-800",
        text: "Aguardando",
      },
    };

    const config = statusConfig[status] || {
      color: "bg-gray-100 text-gray-800",
      text: status,
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  const prepararDadosParaAtualizacao = (dados) => {
    // Criar uma cópia dos dados
    const dadosParaEnvio = JSON.parse(JSON.stringify(dados));

    // Remover campos que não devem ser enviados
    delete dadosParaEnvio._id;
    delete dadosParaEnvio.__v;
    delete dadosParaEnvio.id;
    delete dadosParaEnvio.numeroProcesso; // Não pode ser alterado
    delete dadosParaEnvio.numeroSequencial; // Não pode ser alterado
    delete dadosParaEnvio.anoFiscal; // Não pode ser alterado
    delete dadosParaEnvio.metadata; // O servidor atualiza automaticamente

    // Garantir que campos obrigatórios estejam presentes
    if (!dadosParaEnvio.empresaId) {
      dadosParaEnvio.empresaId = empresaInfo.empresaId;
    }

    if (!dadosParaEnvio.empresaCodigo) {
      dadosParaEnvio.empresaCodigo = empresaInfo.empresaCodigo;
    }

    if (!dadosParaEnvio.nomeEmpresa) {
      dadosParaEnvio.nomeEmpresa = empresaInfo.nomeEmpresa;
    }

    // Garantir que os arrays estejam presentes mesmo se vazios
    const arraysParaGarantir = [
      "itens",
      "anexos",
      "incidentes",
      "historicoAlteracoes",
      "aprovacoes",
      "notificacoes",
      "tags",
      "custos.custosServicos",
      "pagamento.parcelas",
      "pagamento.historicoPagamentos",
      "tributacao.impostos.outrasTaxas",
      "documentacao.documentos",
      "rastreio.historicoLocalizacao",
      "relacionamentos.processosRelacionados",
      "relacionamentos.contratosAssociados",
      "alfandega.orgaosEnvolvidos",
    ];

    // Função para garantir que arrays existam
    const garantirArray = (obj, path) => {
      const keys = path.split(".");
      let current = obj;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]] || typeof current[keys[i]] !== "object") {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      const lastKey = keys[keys.length - 1];
      if (!Array.isArray(current[lastKey])) {
        current[lastKey] = [];
      }
    };

    arraysParaGarantir.forEach((path) => {
      garantirArray(dadosParaEnvio, path);
    });

    // Converter strings de data para objetos Date
    const converterDatas = (obj) => {
      Object.keys(obj).forEach((key) => {
        if (
          obj[key] &&
          typeof obj[key] === "object" &&
          !Array.isArray(obj[key])
        ) {
          converterDatas(obj[key]);
        } else if (
          typeof obj[key] === "string" &&
          obj[key].match(/^\d{4}-\d{2}-\d{2}/)
        ) {
          // É uma data no formato YYYY-MM-DD
          try {
            obj[key] = new Date(obj[key]).toISOString();
          } catch (e) {
            // Manter como está se não for uma data válida
          }
        }
      });
    };

    converterDatas(dadosParaEnvio);

    return dadosParaEnvio;
  };

  const renderTipoBadge = (tipo) => {
    const tipoConfig = {
      importacao: {
        color: "bg-blue-500 text-white",
        text: "IMP",
        full: "Importação",
      },
      exportacao: {
        color: "bg-green-500 text-white",
        text: "EXP",
        full: "Exportação",
      },
      transito: {
        color: "bg-purple-500 text-white",
        text: "TRA",
        full: "Trânsito",
      },
      consultoria: {
        color: "bg-indigo-500 text-white",
        text: "CON",
        full: "Consultoria",
      },
      despacho: {
        color: "bg-orange-500 text-white",
        text: "DAU",
        full: "Despacho",
      },
    };

    const config = tipoConfig[tipo] || {
      color: "bg-gray-500 text-white",
      text: "OUT",
      full: tipo,
    };
    return (
      <div className="flex items-center space-x-2">
        <span className={`px-2 py-1 rounded text-xs font-bold ${config.color}`}>
          {config.text}
        </span>
        <span className="text-sm text-gray-600">{config.full}</span>
      </div>
    );
  };

  // Funções auxiliares para filtros
  const handleFilterChange = (key, value) => {
    setFiltros((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = async () => {
    await fetchDespachos();
  };

  const clearFilters = () => {
    setFiltros({
      curPage: 1,
      pageSize: 10,
      tipoProcesso: "",
      status: "",
      clienteNome: "",
      clienteNuit: "",
      dataInicio: "",
      dataFim: "",
      numeroProcesso: "",
    });
  };

  // Submeter à alfândega
  const submeterAlfandega = async (numeroProcesso) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/submeterAlfandega`, {
        numeroProcesso,
        usuario: "usuario_sistema",
        ip: "127.0.0.1",
        userAgent: navigator.userAgent,
      });

      if (response.data.returnCode === 200) {
        setSuccess("Processo submetido à alfândega com sucesso!");
        fetchDespachos();
      }
    } catch (error) {
      setError(
        "Erro ao submeter à alfândega. Em ambiente de desenvolvimento, esta funcionalidade está simulada."
      );
      setSuccess(
        `Processo ${numeroProcesso} submetido à alfândega (simulado)!`
      );
      fetchDespachos();
    } finally {
      setLoading(false);
    }
  };

  // Renderizar campos específicos por tipo de processo
  const renderCamposEspecificos = () => {
    switch (activeAduanaProcess) {
      case "despacho":
      case "transito":
      case "importacao":
      case "exportacao":
        return (
          <>
            {/* Dados da Mercadoria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição da Mercadoria *
                </label>
                <input
                  type="text"
                  value={formData.mercadoria.descricao}
                  onChange={(e) =>
                    updateFormData("mercadoria.descricao", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Descrição detalhada"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NCM/HS Code (8 dígitos)
                </label>
                <input
                  type="text"
                  value={formData.mercadoria.codigoNCM}
                  onChange={(e) =>
                    updateFormData("mercadoria.codigoNCM", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="12345678"
                  pattern="\d{8}"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor (USD)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.mercadoria.valorMercadoria}
                  onChange={(e) =>
                    updateFormData(
                      "mercadoria.valorMercadoria",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="0,00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantidade
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.mercadoria.quantidade}
                  onChange={(e) =>
                    updateFormData(
                      "mercadoria.quantidade",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unidade
                </label>
                <select
                  value={formData.mercadoria.unidadeMedida}
                  onChange={(e) =>
                    updateFormData("mercadoria.unidadeMedida", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="kg">Quilogramas</option>
                  <option value="un">Unidades</option>
                  <option value="ton">Toneladas</option>
                  <option value="m3">Metros Cúbicos</option>
                </select>
              </div>
            </div>
          </>
        );

      case "consultoria":
        return (
          <>
            {/* Dados da Consultoria */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Consultoria *
              </label>
              <select
                value={formData.consultoria.tipoConsulta}
                onChange={(e) =>
                  updateFormData("consultoria.tipoConsulta", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="tributaria">Tributária</option>
                <option value="classificacao_fiscal">
                  Classificação Fiscal
                </option>
                <option value="legislacao_aduaneria">
                  Legislação Aduaneira
                </option>
                <option value="otimizacao_processos">
                  Otimização de Processos
                </option>
                <option value="consultoria_incoterms">
                  Consultoria INCOTERMS
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição Detalhada *
              </label>
              <textarea
                rows={4}
                value={formData.consultoria.descricaoConsulta}
                onChange={(e) =>
                  updateFormData(
                    "consultoria.descricaoConsulta",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Descreva em detalhes a sua consulta..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição da Mercadoria *
                </label>
                <input
                  type="text"
                  value={formData.mercadoria.descricao}
                  onChange={(e) =>
                    updateFormData("mercadoria.descricao", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Descrição detalhada"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NCM/HS Code (8 dígitos)
                </label>
                <input
                  type="text"
                  value={formData.mercadoria.codigoNCM}
                  onChange={(e) =>
                    updateFormData("mercadoria.codigoNCM", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="12345678"
                  pattern="\d{8}"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor da Consultoria (USD)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.consultoria.valorConsulta}
                  onChange={(e) =>
                    updateFormData(
                      "consultoria.valorConsulta",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="0,00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Limite Resposta
                </label>
                <input
                  type="date"
                  value={formData.consultoria.dataLimiteResposta}
                  onChange={(e) =>
                    updateFormData(
                      "consultoria.dataLimiteResposta",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const renderModal = () => {
    if (!selectedDespacho || !showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header do Modal */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div>
              <h3 className="text-xl font-bold">
                📋 Detalhes do Processo:{" "}
                {selectedDespacho.numeroProcesso || "SEM-NÚMERO"}
              </h3>
              <p className="text-blue-100 text-sm">
                {selectedDespacho.cliente?.nomeCliente} • NUIT:{" "}
                {selectedDespacho.cliente?.nuit}
              </p>
            </div>
            <button
              onClick={() => {
                setShowModal(false);
                setSelectedDespacho(null);
              }}
              className="text-white hover:text-gray-200 text-2xl"
            >
              ✕
            </button>
          </div>

          {/* Conteúdo do Modal */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  📊 Informações Básicas
                </h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-gray-600">Tipo:</span>{" "}
                    {renderTipoBadge(selectedDespacho.tipoProcesso)}
                  </p>
                  <p>
                    <span className="text-gray-600">Status:</span>{" "}
                    {renderStatusBadge(selectedDespacho.status)}
                  </p>
                  <p>
                    <span className="text-gray-600">Prioridade:</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded text-xs ${
                        selectedDespacho.prioridade === "alta"
                          ? "bg-red-100 text-red-800"
                          : selectedDespacho.prioridade === "urgente"
                          ? "bg-red-500 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {selectedDespacho.prioridade || "normal"}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-600">Criação:</span>{" "}
                    {formatDate(selectedDespacho.datas?.dataCriacao)}
                  </p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  💰 Informações Financeiras
                </h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-gray-600">Valor Total:</span>{" "}
                    {formatCurrency(selectedDespacho.pagamento?.valorTotal)}
                  </p>
                  <p>
                    <span className="text-gray-600">Valor Pago:</span>{" "}
                    {formatCurrency(selectedDespacho.pagamento?.valorPago)}
                  </p>
                  <p>
                    <span className="text-gray-600">Pendente:</span>
                    <span
                      className={`ml-2 font-bold ${
                        selectedDespacho.pagamento?.valorTotal -
                          (selectedDespacho.pagamento?.valorPago || 0) >
                        0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {formatCurrency(
                        selectedDespacho.pagamento?.valorTotal -
                          (selectedDespacho.pagamento?.valorPago || 0)
                      )}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-600">Status Pagamento:</span>{" "}
                    {renderStatusBadge(
                      selectedDespacho.pagamento?.statusPagamento
                    )}
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  👤 Informações do Cliente
                </h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-gray-600">Nome:</span>{" "}
                    {selectedDespacho.cliente?.nomeCliente || "Não informado"}
                  </p>
                  <p>
                    <span className="text-gray-600">NUIT:</span>{" "}
                    {selectedDespacho.cliente?.nuit || "Não informado"}
                  </p>
                  <p>
                    <span className="text-gray-600">Email:</span>{" "}
                    {selectedDespacho.cliente?.contato?.email ||
                      "Não informado"}
                  </p>
                  <p>
                    <span className="text-gray-600">Telefone:</span>{" "}
                    {selectedDespacho.cliente?.contato?.telefone ||
                      "Não informado"}
                  </p>
                </div>
              </div>
            </div>

            {/* Abas de Detalhes */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex space-x-2 overflow-x-auto">
                {[
                  "Mercadoria",
                  "Transporte",
                  "Documentação",
                  "Tributação",
                  "Rastreio",
                  "Histórico",
                ].map((aba) => (
                  <button
                    key={aba}
                    onClick={() => setActiveTab(aba)}
                    className={`px-4 py-2 font-medium whitespace-nowrap ${
                      activeTab === aba
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {aba}
                  </button>
                ))}
              </div>
            </div>

            {/* Conteúdo das Abas */}
            <div className="space-y-6">
              {activeTab === "Mercadoria" && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    📦 Detalhes da Mercadoria
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600">
                        Descrição
                      </label>
                      <p className="font-medium">
                        {selectedDespacho.mercadoria?.descricao ||
                          "Não informada"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">
                        Código NCM
                      </label>
                      <p className="font-medium">
                        {selectedDespacho.mercadoria?.codigoNCM ||
                          "Não informado"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">
                        Quantidade
                      </label>
                      <p className="font-medium">
                        {selectedDespacho.mercadoria?.quantidade || 0}{" "}
                        {selectedDespacho.mercadoria?.unidadeMedida}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">
                        Valor Mercadoria
                      </label>
                      <p className="font-medium">
                        {formatCurrency(
                          selectedDespacho.mercadoria?.valorMercadoria
                        )}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">
                        Peso Bruto
                      </label>
                      <p className="font-medium">
                        {selectedDespacho.mercadoria?.pesoBruto || 0} kg
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">
                        Peso Líquido
                      </label>
                      <p className="font-medium">
                        {selectedDespacho.mercadoria?.pesoLiquido || 0} kg
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Transporte" && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    🚢 Detalhes do Transporte
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600">
                        Meio de Transporte
                      </label>
                      <p className="font-medium">
                        {selectedDespacho.transporte?.meioTransporte ||
                          "Não informado"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">
                        Porto Origem
                      </label>
                      <p className="font-medium">
                        {selectedDespacho.transporte?.portoOrigem ||
                          "Não informado"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">
                        Porto Destino
                      </label>
                      <p className="font-medium">
                        {selectedDespacho.transporte?.portoDestino ||
                          "Não informado"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">
                        Número BL/Conhecimento
                      </label>
                      <p className="font-medium">
                        {selectedDespacho.transporte?.numeroBL ||
                          selectedDespacho.transporte?.numeroConhecimento ||
                          "Não informado"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">
                        Companhia Transporte
                      </label>
                      <p className="font-medium">
                        {selectedDespacho.transporte?.companhiaTransporte ||
                          "Não informado"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">
                        Navio/Voo
                      </label>
                      <p className="font-medium">
                        {selectedDespacho.transporte?.navioVoo ||
                          "Não informado"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Documentação" && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    📄 Documentação
                  </h4>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        Status da Documentação
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedDespacho.documentacao?.documentacaoCompleta
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {selectedDespacho.documentacao?.documentacaoCompleta
                          ? "Completa"
                          : "Incompleta"}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: `${
                            selectedDespacho.documentacao?.percentualCompleto ||
                            0
                          }%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {selectedDespacho.documentacao?.percentualCompleto || 0}%
                      completo
                    </p>
                  </div>

                  {selectedDespacho.documentacao?.documentos &&
                  selectedDespacho.documentacao.documentos.length > 0 ? (
                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-900">Documentos:</h5>
                      {selectedDespacho.documentacao.documentos.map(
                        (doc, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded"
                          >
                            <div>
                              <p className="font-medium">{doc.nomeDocumento}</p>
                              <p className="text-sm text-gray-600">
                                {doc.numeroDocumento}
                              </p>
                            </div>
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                doc.recebido
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {doc.recebido ? "Recebido" : "Pendente"}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-4">
                      Nenhum documento registrado
                    </p>
                  )}
                </div>
              )}

              {activeTab === "Tributação" && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    🧮 Tributação
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm text-gray-600">
                        Valor Aduaneiro
                      </label>
                      <p className="font-medium text-lg">
                        {formatCurrency(
                          selectedDespacho.tributacao?.valorAduaneiro
                        )}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">
                        Moeda
                      </label>
                      <p className="font-medium">
                        {selectedDespacho.tributacao?.moedaAduaneira || "USD"}
                      </p>
                    </div>
                  </div>

                  {selectedDespacho.tributacao?.impostos && (
                    <div className="space-y-4">
                      <h5 className="font-medium text-gray-900">
                        Detalhamento dos Impostos:
                      </h5>
                      <div className="space-y-3">
                        {selectedDespacho.tributacao.impostos.direitosAduaneiros
                          ?.percentual > 0 && (
                          <div className="flex justify-between items-center">
                            <span>
                              Direitos Aduaneiros (
                              {
                                selectedDespacho.tributacao.impostos
                                  .direitosAduaneiros.percentual
                              }
                              %)
                            </span>
                            <span className="font-medium">
                              {formatCurrency(
                                selectedDespacho.tributacao.impostos
                                  .direitosAduaneiros.valor
                              )}
                            </span>
                          </div>
                        )}
                        {selectedDespacho.tributacao.impostos.iva?.percentual >
                          0 && (
                          <div className="flex justify-between items-center">
                            <span>
                              IVA (
                              {
                                selectedDespacho.tributacao.impostos.iva
                                  .percentual
                              }
                              %)
                            </span>
                            <span className="font-medium">
                              {formatCurrency(
                                selectedDespacho.tributacao.impostos.iva.valor
                              )}
                            </span>
                          </div>
                        )}
                        <div className="border-t pt-3">
                          <div className="flex justify-between items-center font-bold">
                            <span>Total Impostos</span>
                            <span className="text-blue-600">
                              {formatCurrency(
                                selectedDespacho.tributacao.impostos
                                  .totalImpostos
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between items-center font-bold text-lg mt-2">
                            <span>Total Líquido</span>
                            <span className="text-green-600">
                              {formatCurrency(
                                selectedDespacho.tributacao.impostos
                                  .totalLiquido
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "Rastreio" && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    🔍 Rastreio
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm text-gray-600">
                        Status Atual
                      </label>
                      <p className="font-medium">
                        {selectedDespacho.rastreio?.statusRastreio ||
                          "Não informado"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">
                        Localização Atual
                      </label>
                      <p className="font-medium">
                        {selectedDespacho.rastreio?.localizacaoAtual ||
                          "Não informada"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">
                        Código de Rastreio
                      </label>
                      <p className="font-medium">
                        {selectedDespacho.rastreio?.codigoRastreio ||
                          "Não informado"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">
                        Estimativa de Entrega
                      </label>
                      <p className="font-medium">
                        {formatDate(
                          selectedDespacho.rastreio?.estimativaEntrega
                        )}
                      </p>
                    </div>
                  </div>

                  {selectedDespacho.rastreio?.historicoLocalizacao &&
                  selectedDespacho.rastreio.historicoLocalizacao.length > 0 ? (
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-900">
                        Histórico de Localização:
                      </h5>
                      <div className="space-y-2">
                        {selectedDespacho.rastreio.historicoLocalizacao.map(
                          (hist, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-3 p-3 bg-gray-50 rounded"
                            >
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                              <div className="flex-1">
                                <p className="font-medium">{hist.local}</p>
                                <p className="text-sm text-gray-600">
                                  {hist.status}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {formatDate(hist.data)}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-4">
                      Nenhum histórico de rastreio disponível
                    </p>
                  )}
                </div>
              )}

              {activeTab === "Histórico" && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    📝 Histórico de Alterações
                  </h4>
                  {selectedDespacho.historicoAlteracoes &&
                  selectedDespacho.historicoAlteracoes.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDespacho.historicoAlteracoes.map(
                        (hist, index) => (
                          <div
                            key={index}
                            className="border-l-2 border-blue-500 pl-4 py-2"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{hist.acao}</p>
                                <p className="text-sm text-gray-600">
                                  {hist.motivo}
                                </p>
                              </div>
                              <span className="text-xs text-gray-500">
                                {formatDate(hist.dataAlteracao)}
                              </span>
                            </div>
                            <p className="text-sm mt-1">
                              <span className="text-gray-600">Por:</span>{" "}
                              {hist.usuario}
                            </p>
                            {hist.campoAlterado && (
                              <div className="mt-2 text-sm bg-gray-50 p-2 rounded">
                                <span className="text-gray-600">Campo:</span>{" "}
                                {hist.campoAlterado}
                                <div className="grid grid-cols-2 gap-2 mt-1">
                                  <div className="text-red-600">
                                    <span className="text-xs">Anterior:</span>
                                    <p className="truncate">
                                      {JSON.stringify(hist.valorAnterior)}
                                    </p>
                                  </div>
                                  <div className="text-green-600">
                                    <span className="text-xs">Novo:</span>
                                    <p className="truncate">
                                      {JSON.stringify(hist.valorNovo)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-4">
                      Nenhum histórico de alterações
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer do Modal */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Última atualização:{" "}
                {formatDate(selectedDespacho.metadata?.dataAtualizacao)}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedDespacho(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Fechar
                </button>
                <button
                  onClick={() => {
                    // Função para exportar ou imprimir
                    console.log(
                      "Exportar despacho:",
                      selectedDespacho.numeroProcesso
                    );
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  📥 Exportar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleEditDespacho = async (despacho) => {
    try {
      setLoading(true);

      // Buscar detalhes completos do despacho
      const response = await axios.post(
        `${API_BASE_URL}/getDespachoAduaneiroDetail`,
        {
          numeroProcesso: despacho.numeroProcesso,
        }
      );

      if (response.data.returnCode === 200) {
        setEditingDespacho(despacho);
        setEditFormData(response.data.data);
        setShowEditModal(true);
      } else {
        throw new Error(response.data.returnMsg || "Erro ao buscar detalhes");
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes do despacho:", error);
      setError("Erro ao carregar dados para edição");
      // Em ambiente de desenvolvimento, usar dados locais
      if (process.env.NODE_ENV === "development") {
        setEditingDespacho(despacho);
        setEditFormData(despacho);
        setShowEditModal(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderEditModal = () => {
    if (!showEditModal || !editFormData) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header do Modal de Edição */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div>
              <h3 className="text-xl font-bold">
                ✏️ Editar Processo: {editingDespacho.numeroProcesso}
              </h3>
              <p className="text-blue-100 text-sm">
                {editFormData.cliente?.nomeCliente} • NUIT:{" "}
                {editFormData.cliente?.nuit}
              </p>
            </div>
            <button
              onClick={() => {
                setShowEditModal(false);
                setEditingDespacho(null);
                setEditFormData(null);
              }}
              className="text-white hover:text-gray-200 text-2xl"
            >
              ✕
            </button>
          </div>

          {/* Conteúdo do Modal de Edição */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Abas de Edição */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex space-x-2 overflow-x-auto">
                {[
                  "Informações Básicas",
                  "Cliente",
                  "Mercadoria",
                  "Transporte",
                  "Tributação",
                  "Documentação",
                  "Pagamento",
                  "Observações",
                ].map((aba) => (
                  <button
                    key={aba}
                    onClick={() => setActiveTab(aba)}
                    className={`px-4 py-2 font-medium whitespace-nowrap ${
                      activeTab === aba
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {aba}
                  </button>
                ))}
              </div>
            </div>

            {/* Formulário de Edição */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {activeTab === "Informações Básicas" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Processo
                      </label>
                      <select
                        value={editFormData.tipoProcesso || ""}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            tipoProcesso: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        disabled
                      >
                        <option value="importacao">Importação</option>
                        <option value="exportacao">Exportação</option>
                        <option value="transito">Trânsito</option>
                        <option value="despacho">Despacho</option>
                        <option value="consultoria">Consultoria</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={editFormData.status || ""}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            status: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="rascunho">Rascunho</option>
                        <option value="submetido">Submetido</option>
                        <option value="em_analise">Em Análise</option>
                        <option value="liberado">Liberado</option>
                        <option value="concluido">Concluído</option>
                        <option value="cancelado">Cancelado</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prioridade
                      </label>
                      <select
                        value={editFormData.prioridade || "normal"}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            prioridade: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="baixa">Baixa</option>
                        <option value="normal">Normal</option>
                        <option value="alta">Alta</option>
                        <option value="urgente">Urgente</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Classificação de Risco
                      </label>
                      <select
                        value={editFormData.classificacaoRisco || "medio"}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            classificacaoRisco: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="baixo">Baixo</option>
                        <option value="medio">Médio</option>
                        <option value="alto">Alto</option>
                        <option value="critico">Crítico</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Motivo da Prioridade (se aplicável)
                    </label>
                    <input
                      type="text"
                      value={editFormData.motivoPrioridade || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          motivoPrioridade: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Descreva o motivo da prioridade"
                    />
                  </div>
                </div>
              )}

              {activeTab === "Cliente" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome do Cliente *
                      </label>
                      <input
                        type="text"
                        value={editFormData.cliente?.nomeCliente || ""}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            cliente: {
                              ...editFormData.cliente,
                              nomeCliente: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        NUIT * (9 dígitos)
                      </label>
                      <input
                        type="text"
                        value={editFormData.cliente?.nuit || ""}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            cliente: {
                              ...editFormData.cliente,
                              nuit: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        pattern="\d{9}"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editFormData.cliente?.contato?.email || ""}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            cliente: {
                              ...editFormData.cliente,
                              contato: {
                                ...editFormData.cliente?.contato,
                                email: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        value={editFormData.cliente?.contato?.telefone || ""}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            cliente: {
                              ...editFormData.cliente,
                              contato: {
                                ...editFormData.cliente?.contato,
                                telefone: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Endereço
                    </label>
                    <input
                      type="text"
                      value={editFormData.cliente?.endereco?.endereco || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          cliente: {
                            ...editFormData.cliente,
                            endereco: {
                              ...editFormData.cliente?.endereco,
                              endereco: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              )}

              {activeTab === "Mercadoria" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição da Mercadoria *
                    </label>
                    <input
                      type="text"
                      value={editFormData.mercadoria?.descricao || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          mercadoria: {
                            ...editFormData.mercadoria,
                            descricao: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Código NCM (8 dígitos)
                      </label>
                      <input
                        type="text"
                        value={editFormData.mercadoria?.codigoNCM || ""}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            mercadoria: {
                              ...editFormData.mercadoria,
                              codigoNCM: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        pattern="\d{8}"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantidade
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={editFormData.mercadoria?.quantidade || 0}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            mercadoria: {
                              ...editFormData.mercadoria,
                              quantidade: parseFloat(e.target.value) || 0,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Valor da Mercadoria (USD)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={editFormData.mercadoria?.valorMercadoria || 0}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            mercadoria: {
                              ...editFormData.mercadoria,
                              valorMercadoria: parseFloat(e.target.value) || 0,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Unidade de Medida
                      </label>
                      <select
                        value={editFormData.mercadoria?.unidadeMedida || "kg"}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            mercadoria: {
                              ...editFormData.mercadoria,
                              unidadeMedida: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="kg">Quilogramas</option>
                        <option value="un">Unidades</option>
                        <option value="ton">Toneladas</option>
                        <option value="m3">Metros Cúbicos</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Peso Bruto (kg)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={editFormData.mercadoria?.pesoBruto || 0}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            mercadoria: {
                              ...editFormData.mercadoria,
                              pesoBruto: parseFloat(e.target.value) || 0,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Peso Líquido (kg)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={editFormData.mercadoria?.pesoLiquido || 0}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            mercadoria: {
                              ...editFormData.mercadoria,
                              pesoLiquido: parseFloat(e.target.value) || 0,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Transporte" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meio de Transporte
                      </label>
                      <select
                        value={
                          editFormData.transporte?.meioTransporte || "maritimo"
                        }
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            transporte: {
                              ...editFormData.transporte,
                              meioTransporte: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="maritimo">Marítimo</option>
                        <option value="aereo">Aéreo</option>
                        <option value="terrestre">Terrestre</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Porto de Origem
                      </label>
                      <input
                        type="text"
                        value={editFormData.transporte?.portoOrigem || ""}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            transporte: {
                              ...editFormData.transporte,
                              portoOrigem: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Porto de Destino
                      </label>
                      <input
                        type="text"
                        value={editFormData.transporte?.portoDestino || ""}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            transporte: {
                              ...editFormData.transporte,
                              portoDestino: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número do Conhecimento/BL
                      </label>
                      <input
                        type="text"
                        value={
                          editFormData.transporte?.numeroConhecimento ||
                          editFormData.transporte?.numeroBL ||
                          ""
                        }
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            transporte: {
                              ...editFormData.transporte,
                              numeroConhecimento: e.target.value,
                              numeroBL: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Navio/Voo
                      </label>
                      <input
                        type="text"
                        value={editFormData.transporte?.navioVoo || ""}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            transporte: {
                              ...editFormData.transporte,
                              navioVoo: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Companhia de Transporte
                      </label>
                      <input
                        type="text"
                        value={
                          editFormData.transporte?.companhiaTransporte || ""
                        }
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            transporte: {
                              ...editFormData.transporte,
                              companhiaTransporte: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  {/* NOVO CAMPO: Despachante Responsável */}
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-3">
                      👨‍💼 Despachante Aduaneiro Responsável
                    </h5>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Despachante
                        </label>
                        <select
                          value={editFormData.transporte?.despachanteTransporte || ""}
                          onChange={(e) => {
                            const selectedCodigo = e.target.value;
                            setEditFormData({
                              ...editFormData,
                              transporte: {
                                ...editFormData.transporte,
                                despachanteTransporte: selectedCodigo
                              }
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="">Selecione um despachante...</option>
                          {despachantes.map((despachante) => (
                            <option 
                              key={despachante.codigoDespachante} 
                              value={despachante.codigoDespachante}
                            >
                              {despachante.dadosPessoais.nomeCompleto} - {despachante.codigoDespachante}
                            </option>
                          ))}
                          <option value="outro">Outro</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nome do Despachante
                        </label>
                        <input
                          type="text"
                          value={editFormData.transporte?.despachanteNome || ""}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              transporte: {
                                ...editFormData.transporte,
                                despachanteNome: e.target.value
                              }
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Nome do despachante"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Tributação" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Valor Aduaneiro (USD)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={editFormData.tributacao?.valorAduaneiro || 0}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            tributacao: {
                              ...editFormData.tributacao,
                              valorAduaneiro: parseFloat(e.target.value) || 0,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Moeda Aduaneira
                      </label>
                      <select
                        value={editFormData.tributacao?.moedaAduaneira || "USD"}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            tributacao: {
                              ...editFormData.tributacao,
                              moedaAduaneira: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="USD">USD - Dólar Americano</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="MZN">MZN - Metical</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        % Direitos Aduaneiros
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={
                          editFormData.tributacao?.impostos?.direitosAduaneiros
                            ?.percentual || 0
                        }
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            tributacao: {
                              ...editFormData.tributacao,
                              impostos: {
                                ...editFormData.tributacao?.impostos,
                                direitosAduaneiros: {
                                  ...editFormData.tributacao?.impostos
                                    ?.direitosAduaneiros,
                                  percentual: parseFloat(e.target.value) || 0,
                                },
                              },
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        % IVA
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={
                          editFormData.tributacao?.impostos?.iva?.percentual ||
                          16
                        }
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            tributacao: {
                              ...editFormData.tributacao,
                              impostos: {
                                ...editFormData.tributacao?.impostos,
                                iva: {
                                  ...editFormData.tributacao?.impostos?.iva,
                                  percentual: parseFloat(e.target.value) || 16,
                                },
                              },
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      // Função para recalcular tributos
                      const valorAduaneiro =
                        editFormData.tributacao?.valorAduaneiro || 0;
                      const direitosPercentual =
                        editFormData.tributacao?.impostos?.direitosAduaneiros
                          ?.percentual || 0;
                      const ivaPercentual =
                        editFormData.tributacao?.impostos?.iva?.percentual ||
                        16;

                      const direitosValor =
                        valorAduaneiro * (direitosPercentual / 100);
                      const baseCalculoIVA = valorAduaneiro + direitosValor;
                      const ivaValor = baseCalculoIVA * (ivaPercentual / 100);
                      const totalImpostos = direitosValor + ivaValor;
                      const totalLiquido = valorAduaneiro + totalImpostos;

                      setEditFormData({
                        ...editFormData,
                        tributacao: {
                          ...editFormData.tributacao,
                          impostos: {
                            ...editFormData.tributacao?.impostos,
                            direitosAduaneiros: {
                              ...editFormData.tributacao?.impostos
                                ?.direitosAduaneiros,
                              valor: direitosValor,
                            },
                            iva: {
                              ...editFormData.tributacao?.impostos?.iva,
                              valor: ivaValor,
                            },
                            totalImpostos: totalImpostos,
                            totalLiquido: totalLiquido,
                          },
                        },
                        pagamento: {
                          ...editFormData.pagamento,
                          valorTotal: totalLiquido,
                        },
                      });

                      setSuccess("Tributos recalculados!");
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
                  >
                    🧮 Recalcular Tributos
                  </button>
                </div>
              )}

              {activeTab === "Pagamento" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Valor Total (USD)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={editFormData.pagamento?.valorTotal || 0}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            pagamento: {
                              ...editFormData.pagamento,
                              valorTotal: parseFloat(e.target.value) || 0,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Valor Pago (USD)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={editFormData.pagamento?.valorPago || 0}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            pagamento: {
                              ...editFormData.pagamento,
                              valorPago: parseFloat(e.target.value) || 0,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status do Pagamento
                      </label>
                      <select
                        value={
                          editFormData.pagamento?.statusPagamento || "pendente"
                        }
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            pagamento: {
                              ...editFormData.pagamento,
                              statusPagamento: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="pendente">Pendente</option>
                        <option value="parcial">Parcial</option>
                        <option value="pago">Pago</option>
                        <option value="atrasado">Atrasado</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data de Vencimento
                      </label>
                      <input
                        type="date"
                        value={
                          editFormData.pagamento?.dataVencimento
                            ? new Date(editFormData.pagamento.dataVencimento)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            pagamento: {
                              ...editFormData.pagamento,
                              dataVencimento: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Referência de Pagamento
                    </label>
                    <input
                      type="text"
                      value={editFormData.pagamento?.referenciaPagamento || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          pagamento: {
                            ...editFormData.pagamento,
                            referenciaPagamento: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              )}

              {activeTab === "Observações" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Observações Gerais
                    </label>
                    <textarea
                      rows={4}
                      value={editFormData.observacoes || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          observacoes: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Observações adicionais sobre o processo..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Observações Internas
                    </label>
                    <textarea
                      rows={4}
                      value={editFormData.observacoesInternas || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          observacoesInternas: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Observações internas para a equipe..."
                    />
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Footer do Modal de Edição */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Última atualização:{" "}
                {formatDate(editFormData.metadata?.dataAtualizacao)}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingDespacho(null);
                    setEditFormData(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={async () => {
                    try {
                      setLoading(true);
                      setError(null);

                      // Validar dados obrigatórios antes de enviar
                      if (
                        !editFormData.cliente?.nomeCliente ||
                        !editFormData.cliente?.nuit
                      ) {
                        throw new Error(
                          "Nome do cliente e NUIT são obrigatórios"
                        );
                      }

                      if (!editFormData.mercadoria?.descricao) {
                        throw new Error(
                          "Descrição da mercadoria é obrigatória"
                        );
                      }

                      // Validar NUIT
                      if (!/^\d{9}$/.test(editFormData.cliente.nuit)) {
                        throw new Error(
                          "NUIT inválido. Deve conter 9 dígitos."
                        );
                      }

                      // Preparar dados para atualização
                      const dadosAtualizados =
                        prepararDadosParaAtualizacao(editFormData);

                      console.log("Dados para atualização:", dadosAtualizados);

                      const response = await axios.post(
                        `${API_BASE_URL}/updateDespachoAduaneiro`,
                        {
                          numeroProcesso: editingDespacho.numeroProcesso,
                          ...dadosAtualizados,
                        },
                        {
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      );

                      if (response.data.returnCode === 200) {
                        setSuccess("Despacho atualizado com sucesso!");
                        setShowEditModal(false);
                        setEditingDespacho(null);
                        setEditFormData(null);
                        fetchDespachos(); // Atualizar lista

                        // Atualizar estatísticas do dashboard se estiver na aba de gráficos
                        if (activeAduanaProcess === "graficos") {
                          // Recarregar dados do dashboard
                          fetchDespachos();
                        }
                      } else {
                        throw new Error(
                          response.data.returnMsg ||
                            "Erro ao atualizar despacho"
                        );
                      }
                    } catch (error) {
                      console.error(
                        "Erro detalhado ao atualizar:",
                        error.response?.data || error.message
                      );

                      let errorMessage = `Erro ao atualizar: ${error.message}`;

                      if (error.response?.data) {
                        if (error.response.data.returnMsg) {
                          errorMessage = `Erro: ${error.response.data.returnMsg}`;
                        } else if (error.response.data.message) {
                          errorMessage = `Erro: ${error.response.data.message}`;
                        }
                      }

                      setError(errorMessage);

                      // Simular sucesso para desenvolvimento
                      if (process.env.NODE_ENV === "development") {
                        console.log(
                          "Simulando atualização para desenvolvimento"
                        );
                        setTimeout(() => {
                          setSuccess(
                            "Despacho atualizado (simulado para desenvolvimento)!"
                          );
                          setShowEditModal(false);
                          setEditingDespacho(null);
                          setEditFormData(null);
                          fetchDespachos();
                        }, 1000);
                      }
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Salvando...
                    </span>
                  ) : (
                    "Salvar Alterações"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const gerarPDFDespacho = async (despacho) => {
    try {
      setLoading(true);

      // Preparar dados no formato esperado
      const dadosDespacho = {
        numeroProcesso: despacho.numeroProcesso,
        tipoProcesso: despacho.tipoProcesso,
        status: despacho.status,
        prioridade: despacho.prioridade || "normal",
        datas: {
          dataCriacao: despacho.datas?.dataCriacao || new Date().toISOString(),
          dataSubmissao: despacho.datas?.dataSubmissao,
          dataRegistroAlfandega: despacho.datas?.dataRegistroAlfandega,
          dataPrevistaLiberacao: despacho.datas?.dataPrevistaLiberacao,
          dataPrazoLimite: despacho.datas?.dataPrazoLimite,
        },
        cliente: {
          nomeCliente: despacho.cliente?.nomeCliente || "Não informado",
          nuit: despacho.cliente?.nuit || "Não informado",
          tipoCliente: despacho.cliente?.tipoCliente || "importador",
          contato: {
            email: despacho.cliente?.contato?.email,
            telefone: despacho.cliente?.contato?.telefone,
          },
          endereco: despacho.cliente?.endereco,
        },
        fornecedor: despacho.fornecedor,
        mercadoria: {
          descricao: despacho.mercadoria?.descricao || "Não informada",
          codigoNCM: despacho.mercadoria?.codigoNCM,
          quantidade: despacho.mercadoria?.quantidade || 0,
          unidadeMedida: despacho.mercadoria?.unidadeMedida || "kg",
          valorMercadoria: despacho.mercadoria?.valorMercadoria || 0,
          pesoBruto: despacho.mercadoria?.pesoBruto,
          pesoLiquido: despacho.mercadoria?.pesoLiquido,
          origemMercadoria: despacho.mercadoria?.origemMercadoria,
          certificadoOrigem: despacho.mercadoria?.certificadoOrigem,
        },
        transporte: despacho.transporte,
        regimeAduaneiro: despacho.regimeAduaneiro,
        tributacao: despacho.tributacao,
        garantias: despacho.garantias,
        documentacao: {
          documentacaoCompleta:
            despacho.documentacao?.documentacaoCompleta || false,
          percentualCompleto: despacho.documentacao?.percentualCompleto || 0,
          documentos: despacho.documentacao?.documentos || [],
        },
        pagamento: despacho.pagamento,
        alfandega: despacho.alfandega,
        rastreio: despacho.rastreio,
        observacoes: despacho.observacoes,
        observacoesInternas: despacho.observacoesInternas,
        classificacaoRisco: despacho.classificacaoRisco || "medio",
      };

      await gerarPDFDespachoAduaneiroCompleto(dadosDespacho);
      setSuccess(`PDF gerado: ${despacho.numeroProcesso}`);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      setError("Erro ao gerar PDF. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col text-gray-900">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">🚢</span>
          Serviços de Despacho Aduaneiro
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Gestão completa de processos aduaneiros seguindo o schema oficial
        </p>
      </div>

      {/* Menu de Tipos de Processos */}
      <div className="flex space-x-2 p-4 border-b border-gray-200 bg-white overflow-x-auto">
        {[
          "importacao",
          "exportacao",
          "transito",
          "despacho",
          "consultoria",
          "rastreio",
          "graficos",
        ].map((tipo) => (
          <button
            key={tipo}
            onClick={() => setActiveAduanaProcess(tipo)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
              activeAduanaProcess === tipo
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tipo === "importacao" && "📥 Importação"}
            {tipo === "exportacao" && "📤 Exportação"}
            {tipo === "transito" && "🚛 Trânsito"}
            {tipo === "despacho" && "📋 Despacho"}
            {tipo === "consultoria" && "💼 Consultoria"}
            {tipo === "rastreio" && "🔍 Rastreio"}
            {tipo === "graficos" && "📊 Gráficos"}
          </button>
        ))}
      </div>

      {/* Mensagens de Status */}
      {loading && (
        <div className="m-4 p-4 bg-blue-50 text-blue-700 rounded-lg">
          Carregando...
        </div>
      )}

      {error && (
        <div className="m-4 p-4 bg-red-50 text-red-700 rounded-lg flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-2 text-red-900">
            ✕
          </button>
        </div>
      )}

      {success && (
        <div className="m-4 p-4 bg-green-50 text-green-700 rounded-lg flex justify-between items-center">
          <span>{success}</span>
          <button
            onClick={() => setSuccess(null)}
            className="ml-2 text-green-900"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex-1 p-6 overflow-auto">
        {/* Formulário Principal */}
        {[
          "importacao",
          "exportacao",
          "transito",
          "despacho",
          "consultoria",
        ].includes(activeAduanaProcess) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900">
                    {activeAduanaProcess === "importacao" &&
                      "📥 Novo Processo de Importação"}
                    {activeAduanaProcess === "exportacao" &&
                      "📤 Novo Processo de Exportação"}
                    {activeAduanaProcess === "transito" &&
                      "🚛 Novo Processo de Trânsito"}
                    {activeAduanaProcess === "despacho" &&
                      "📋 Processo de Despacho Aduaneiro"}
                    {activeAduanaProcess === "consultoria" &&
                      "💼 Nova Consultoria Aduaneira"}
                  </h3>
                </div>
                <div className="p-6">
                  <form
                    className="space-y-6"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    {/* Dados do Cliente */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        👤 Dados do Cliente
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {activeAduanaProcess === "importacao"
                              ? "Importador *"
                              : activeAduanaProcess === "exportacao"
                              ? "Exportador *"
                              : activeAduanaProcess === "transito"
                              ? "Transitário *"
                              : activeAduanaProcess === "consultoria"
                              ? "Empresa/Cliente *"
                              : "Cliente *"}
                          </label>
                          <input
                            type="text"
                            value={formData.cliente.nomeCliente}
                            onChange={(e) =>
                              updateFormData(
                                "cliente.nomeCliente",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nome completo"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            NUIT * (9 dígitos)
                          </label>
                          <input
                            type="text"
                            value={formData.cliente.nuit}
                            onChange={(e) =>
                              updateFormData("cliente.nuit", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="123456789"
                            pattern="\d{9}"
                            required
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            9 dígitos numéricos
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={formData.cliente.contato.email}
                            onChange={(e) =>
                              updateFormData(
                                "cliente.contato.email",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="email@exemplo.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Telefone
                          </label>
                          <input
                            type="tel"
                            value={formData.cliente.contato.telefone}
                            onChange={(e) =>
                              updateFormData(
                                "cliente.contato.telefone",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="+258 84 123 4567"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Dados do Fornecedor/Remetente (para importação/exportação) */}
                    {["importacao", "exportacao"].includes(
                      activeAduanaProcess
                    ) && (
                      <div className="border-b border-gray-200 pb-6">
                        <h4 className="font-semibold text-gray-900 mb-4">
                          {activeAduanaProcess === "importacao"
                            ? "🏭 Fornecedor"
                            : "🏭 Remetente"}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Nome
                            </label>
                            <input
                              type="text"
                              value={formData.fornecedor.nome}
                              onChange={(e) =>
                                updateFormData(
                                  "fornecedor.nome",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              placeholder="Nome do fornecedor"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              País
                            </label>
                            <input
                              type="text"
                              value={formData.fornecedor.pais}
                              onChange={(e) =>
                                updateFormData(
                                  "fornecedor.pais",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              placeholder="País de origem"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Campos específicos por tipo de processo */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        {activeAduanaProcess === "importacao" &&
                          "📦 Dados da Importação"}
                        {activeAduanaProcess === "exportacao" &&
                          "📦 Dados da Exportação"}
                        {activeAduanaProcess === "transito" &&
                          "🗺️ Dados do Trânsito"}
                        {activeAduanaProcess === "despacho" &&
                          "🧮 Dados do Despacho"}
                        {activeAduanaProcess === "consultoria" &&
                          "📝 Dados da Consultoria"}
                      </h4>
                      {renderCamposEspecificos()}
                    </div>

                    {/* DETALHES DO TRANSPORTE (seção expandida) */}
                    {[
                      "importacao",
                      "exportacao",
                      "transito",
                      "despacho",
                    ].includes(activeAduanaProcess) && (
                      <div className="border-b border-gray-200 pb-6">
                        <h4 className="font-semibold text-gray-900 mb-4">
                          🚢 Dados do Transporte
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Meio de Transporte
                            </label>
                            <select
                              value={formData.transporte.meioTransporte}
                              onChange={(e) =>
                                updateFormData(
                                  "transporte.meioTransporte",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                              <option value="maritimo">Marítimo</option>
                              <option value="aereo">Aéreo</option>
                              <option value="terrestre">Terrestre</option>
                              <option value="ferroviario">Ferroviário</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Porto/Aeroporto de Origem *
                            </label>
                            <input
                              type="text"
                              value={
                                formData.transporte.portoOrigem ||
                                formData.transporte.aeroportoOrigem
                              }
                              onChange={(e) => {
                                if (
                                  formData.transporte.meioTransporte === "aereo"
                                ) {
                                  updateFormData(
                                    "transporte.aeroportoOrigem",
                                    e.target.value
                                  );
                                } else {
                                  updateFormData(
                                    "transporte.portoOrigem",
                                    e.target.value
                                  );
                                }
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              placeholder={
                                formData.transporte.meioTransporte === "aereo"
                                  ? "Ex: Aeroporto Internacional de Maputo"
                                  : "Ex: Porto de Durban"
                              }
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Porto/Aeroporto de Destino *
                            </label>
                            <input
                              type="text"
                              value={
                                formData.transporte.portoDestino ||
                                formData.transporte.aeroportoDestino
                              }
                              onChange={(e) => {
                                if (
                                  formData.transporte.meioTransporte === "aereo"
                                ) {
                                  updateFormData(
                                    "transporte.aeroportoDestino",
                                    e.target.value
                                  );
                                } else {
                                  updateFormData(
                                    "transporte.portoDestino",
                                    e.target.value
                                  );
                                }
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              placeholder={
                                formData.transporte.meioTransporte === "aereo"
                                  ? "Ex: Aeroporto de Joanesburgo"
                                  : "Ex: Porto de Maputo"
                              }
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Navio/Voo *
                            </label>
                            <input
                              type="text"
                              value={formData.transporte.navioVoo}
                              onChange={(e) =>
                                updateFormData(
                                  "transporte.navioVoo",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              placeholder={
                                formData.transporte.meioTransporte === "aereo"
                                  ? "Ex: TAAG 500"
                                  : "Ex: MSC Giovanna"
                              }
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Número do Conhecimento/BL *
                            </label>
                            <input
                              type="text"
                              value={
                                formData.transporte.numeroConhecimento ||
                                formData.transporte.numeroBL
                              }
                              onChange={(e) => {
                                updateFormData(
                                  "transporte.numeroConhecimento",
                                  e.target.value
                                );
                                updateFormData(
                                  "transporte.numeroBL",
                                  e.target.value
                                );
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              placeholder="Número do documento de transporte"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Companhia de Transporte *
                            </label>
                            <input
                              type="text"
                              value={formData.transporte.companhiaTransporte}
                              onChange={(e) =>
                                updateFormData(
                                  "transporte.companhiaTransporte",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              placeholder="Ex: MSC, Maersk, TAAG, etc."
                              required
                            />
                          </div>
                        </div>

                        {/* NOVO CAMPO: Despachante Responsável */}
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-3">
                            👨‍💼 Despachante Aduaneiro Responsável
                          </h5>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Selecionar Despachante *
                              </label>
                              <div className="flex space-x-2">
                                <select
                                  value={
                                    formData.transporte.despachanteTransporte ||
                                    ""
                                  }
                                  onChange={(e) => {
                                    const selectedCodigo = e.target.value;
                                    updateFormData(
                                      "transporte.despachanteTransporte",
                                      selectedCodigo
                                    );

                                    // Se "outro" for selecionado, limpar o campo de nome
                                    if (selectedCodigo === "outro") {
                                      updateFormData(
                                        "transporte.despachanteNome",
                                        ""
                                      );
                                    } else {
                                      // Encontrar o despachante selecionado e preencher o nome
                                      const selectedDespachante =
                                        despachantes.find(
                                          (d) =>
                                            d.codigoDespachante ===
                                            selectedCodigo
                                        );
                                      if (selectedDespachante) {
                                        updateFormData(
                                          "transporte.despachanteNome",
                                          selectedDespachante.dadosPessoais
                                            .nomeApresentacao ||
                                            selectedDespachante.dadosPessoais
                                              .nomeCompleto
                                        );
                                      }
                                    }
                                  }}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                                  required
                                >
                                  <option value="">
                                    Selecione um despachante...
                                  </option>
                                  {despachantes
                                    .filter(
                                      (d) => d.status?.disponivel === true
                                    )
                                    .map((despachante) => (
                                      <option
                                        key={despachante.codigoDespachante}
                                        value={despachante.codigoDespachante}
                                      >
                                        {despachante.dadosPessoais
                                          .nomeApresentacao ||
                                          despachante.dadosPessoais
                                            .nomeCompleto}{" "}
                                        -{despachante.codigoDespachante}
                                        {despachante.status?.online
                                          ? " 🟢 Online"
                                          : " 🔴 Offline"}{" "}
                                        -
                                        {despachante.desempenho?.taxaSucesso ||
                                          0}
                                        % sucesso
                                      </option>
                                    ))}
                                  <option value="outro">
                                    Outro (especificar abaixo)
                                  </option>
                                </select>

                                <button
                                  type="button"
                                  onClick={fetchDespachantes}
                                  disabled={loadingDespachantes}
                                  className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50"
                                  title="Recarregar lista de despachantes"
                                >
                                  {loadingDespachantes ? "🔄" : "↻"}
                                </button>
                              </div>

                              {/* Mostrar informações do despachante selecionado */}
                              {formData.transporte.despachanteTransporte &&
                                formData.transporte.despachanteTransporte !==
                                  "outro" && (
                                  <div className="mt-2 p-2 bg-white rounded border">
                                    {(() => {
                                      const selected = despachantes.find(
                                        (d) =>
                                          d.codigoDespachante ===
                                          formData.transporte
                                            .despachanteTransporte
                                      );
                                      return selected ? (
                                        <div className="text-sm">
                                          <p className="font-medium">
                                            📋{" "}
                                            {
                                              selected.dadosPessoais
                                                .nomeCompleto
                                            }
                                          </p>
                                          <p className="text-gray-600">
                                            Código: {selected.codigoDespachante}
                                          </p>
                                          <p className="text-gray-600">
                                            Cargo:{" "}
                                            {selected.carreira?.cargoAtual ||
                                              "Não informado"}
                                          </p>
                                          <p className="text-gray-600">
                                            Status:{" "}
                                            {selected.status?.online
                                              ? "🟢 Online"
                                              : "🔴 Offline"}{" "}
                                            |
                                            {selected.status?.disponivel
                                              ? " ✅ Disponível"
                                              : " ❌ Indisponível"}
                                          </p>
                                          <p className="text-gray-600">
                                            Desempenho:{" "}
                                            {selected.desempenho?.taxaSucesso ||
                                              0}
                                            % sucesso | Avaliação: ⭐{" "}
                                            {selected.desempenho?.avaliacaoMedia?.toFixed(
                                              1
                                            ) || "N/A"}
                                          </p>
                                        </div>
                                      ) : null;
                                    })()}
                                  </div>
                                )}
                            </div>

                            {/* Campo para nome do despachante (se "outro" for selecionado) */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nome do Despachante *
                              </label>
                              <input
                                type="text"
                                value={
                                  formData.transporte.despachanteNome || ""
                                }
                                onChange={(e) =>
                                  updateFormData(
                                    "transporte.despachanteNome",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="Nome completo do despachante"
                                required={
                                  formData.transporte.despachanteTransporte ===
                                    "outro" ||
                                  !formData.transporte.despachanteTransporte
                                }
                                disabled={
                                  formData.transporte.despachanteTransporte &&
                                  formData.transporte.despachanteTransporte !==
                                    "outro"
                                }
                              />
                              {formData.transporte.despachanteTransporte ===
                                "outro" && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Informe o nome do despachante externo
                                  responsável
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Botões para busca avançada */}
                          <div className="mt-4 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                fetchDespachantesPorDepartamento("importacao")
                              }
                              className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                            >
                              Despachantes de Importação
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                fetchDespachantesPorDepartamento("exportacao")
                              }
                              className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                            >
                              Despachantes de Exportação
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                fetchDespachantesPorDepartamento("transito")
                              }
                              className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                            >
                              Despachantes de Trânsito
                            </button>
                            <button
                              type="button"
                              onClick={async () => {
                                const searchTerm = prompt(
                                  "Digite o nome ou código do despachante:"
                                );
                                if (searchTerm) {
                                  const resultados = await searchDespachantes(
                                    searchTerm
                                  );
                                  if (resultados.length > 0) {
                                    setDespachantes(resultados);
                                    setSuccess(
                                      `${resultados.length} despachante(s) encontrado(s)`
                                    );
                                  } else {
                                    setError(
                                      "Nenhum despachante encontrado com essa busca"
                                    );
                                  }
                                }
                              }}
                              className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                            >
                              🔍 Buscar Despachante
                            </button>
                          </div>

                          {/* Informações sobre os despachantes disponíveis */}
                          <div className="mt-3 text-xs text-gray-600">
                            <p>
                              {
                                despachantes.filter(
                                  (d) => d.status?.disponivel === true
                                ).length
                              }{" "}
                              de {despachantes.length} despachantes disponíveis
                              |
                              {
                                despachantes.filter(
                                  (d) => d.status?.online === true
                                ).length
                              }{" "}
                              online
                            </p>
                            {despachantes.length === 0 &&
                              !loadingDespachantes && (
                                <p className="text-red-500">
                                  ⚠️ Nenhum despachante disponível. Verifique se
                                  há despachantes cadastrados no sistema.
                                </p>
                              )}
                          </div>
                        </div>

                        {/* Datas de transporte */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Data Prevista de Embarque
                            </label>
                            <input
                              type="date"
                              value={formData.transporte.dataPrevistaEmbarque}
                              onChange={(e) =>
                                updateFormData(
                                  "transporte.dataPrevistaEmbarque",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Data Prevista de Chegada
                            </label>
                            <input
                              type="date"
                              value={formData.transporte.dataPrevistaChegada}
                              onChange={(e) =>
                                updateFormData(
                                  "transporte.dataPrevistaChegada",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                          </div>
                        </div>

                        {/* Container details for maritime transport */}
                        {formData.transporte.meioTransporte === "maritimo" && (
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <h5 className="font-medium text-gray-900 mb-3">
                              📦 Detalhes do Container
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Número do Container
                                </label>
                                <input
                                  type="text"
                                  value={formData.transporte.numeroContainer}
                                  onChange={(e) =>
                                    updateFormData(
                                      "transporte.numeroContainer",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                  placeholder="Ex: MSCU1234567"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Selo do Container
                                </label>
                                <input
                                  type="text"
                                  value={formData.transporte.seloContainer}
                                  onChange={(e) =>
                                    updateFormData(
                                      "transporte.seloContainer",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                  placeholder="Número do selo"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Tamanho do Container
                                </label>
                                <select
                                  value={formData.transporte.tamanhoContainer}
                                  onChange={(e) =>
                                    updateFormData(
                                      "transporte.tamanhoContainer",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                >
                                  <option value="20">20'</option>
                                  <option value="40">40'</option>
                                  <option value="45">45'</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* TRIBUTAÇÃO E IMPOSTOS (seção crítica) */}
                    {["importacao", "despacho"].includes(
                      activeAduanaProcess
                    ) && (
                      <div className="border-b border-gray-200 pb-6">
                        <h4 className="font-semibold text-gray-900 mb-4">
                          🧮 Tributação e Impostos
                        </h4>

                        {/* Valor Aduaneiro */}
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-3">
                            💰 Valor Aduaneiro
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Valor Aduaneiro (USD) *
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.tributacao.valorAduaneiro}
                                onChange={(e) => {
                                  const valor = parseFloat(e.target.value) || 0;
                                  updateFormData(
                                    "tributacao.valorAduaneiro",
                                    valor
                                  );
                                  // Auto-calcular base de cálculo
                                  updateFormData(
                                    "tributacao.baseCalculo",
                                    valor
                                  );
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="0,00"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Moeda Aduaneira
                              </label>
                              <select
                                value={formData.tributacao.moedaAduaneira}
                                onChange={(e) =>
                                  updateFormData(
                                    "tributacao.moedaAduaneira",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              >
                                <option value="USD">
                                  USD - Dólar Americano
                                </option>
                                <option value="EUR">EUR - Euro</option>
                                <option value="MZN">MZN - Metical</option>
                              </select>
                            </div>
                          </div>
                          <div className="mt-3">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Taxa de Câmbio
                            </label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="number"
                                step="0.0001"
                                min="0"
                                value={formData.tributacao.taxaCambio}
                                onChange={(e) =>
                                  updateFormData(
                                    "tributacao.taxaCambio",
                                    parseFloat(e.target.value) || 1
                                  )
                                }
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="Ex: 1.0"
                              />
                              <span className="text-sm text-gray-600">
                                1 USD = {formData.tributacao.taxaCambio}{" "}
                                {formData.tributacao.moedaAduaneira}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Impostos */}
                        <div className="mb-6">
                          <h5 className="font-medium text-gray-900 mb-3">
                            📊 Impostos Aplicáveis
                          </h5>

                          {/* Direitos Aduaneiros */}
                          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-gray-900">
                                Direitos Aduaneiros
                              </span>
                              <span className="text-sm text-gray-600">
                                Valor: $
                                {(
                                  (formData.tributacao.valorAduaneiro *
                                    (formData.tributacao.impostos
                                      .direitosAduaneiros.percentual || 0)) /
                                  100
                                ).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="flex-1">
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  step="0.5"
                                  value={
                                    formData.tributacao.impostos
                                      .direitosAduaneiros.percentual || 0
                                  }
                                  onChange={(e) => {
                                    const percentual = parseFloat(
                                      e.target.value
                                    );
                                    updateFormData(
                                      "tributacao.impostos.direitosAduaneiros.percentual",
                                      percentual
                                    );
                                    const valor =
                                      formData.tributacao.valorAduaneiro *
                                      (percentual / 100);
                                    updateFormData(
                                      "tributacao.impostos.direitosAduaneiros.valor",
                                      valor
                                    );
                                  }}
                                  className="w-full"
                                />
                              </div>
                              <div className="w-24">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  step="0.5"
                                  value={
                                    formData.tributacao.impostos
                                      .direitosAduaneiros.percentual || 0
                                  }
                                  onChange={(e) => {
                                    const percentual =
                                      parseFloat(e.target.value) || 0;
                                    updateFormData(
                                      "tributacao.impostos.direitosAduaneiros.percentual",
                                      percentual
                                    );
                                    const valor =
                                      formData.tributacao.valorAduaneiro *
                                      (percentual / 100);
                                    updateFormData(
                                      "tributacao.impostos.direitosAduaneiros.valor",
                                      valor
                                    );
                                  }}
                                  className="w-full px-3 py-1 border border-gray-300 rounded text-center"
                                />
                              </div>
                              <span className="text-sm font-medium">%</span>
                            </div>
                          </div>

                          {/* IVA */}
                          <div className="mb-4 p-3 bg-green-50 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-gray-900">
                                IVA (Imposto sobre o Valor Acrescentado)
                              </span>
                              <span className="text-sm text-gray-600">
                                Valor: $
                                {(
                                  ((formData.tributacao.valorAduaneiro +
                                    (formData.tributacao.impostos
                                      .direitosAduaneiros.valor || 0)) *
                                    (formData.tributacao.impostos.iva
                                      .percentual || 0)) /
                                  100
                                ).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="flex-1">
                                <input
                                  type="range"
                                  min="0"
                                  max="30"
                                  step="1"
                                  value={
                                    formData.tributacao.impostos.iva
                                      .percentual || 16
                                  }
                                  onChange={(e) => {
                                    const percentual = parseFloat(
                                      e.target.value
                                    );
                                    updateFormData(
                                      "tributacao.impostos.iva.percentual",
                                      percentual
                                    );
                                    const baseCalculoIVA =
                                      formData.tributacao.valorAduaneiro +
                                      (formData.tributacao.impostos
                                        .direitosAduaneiros.valor || 0);
                                    const valor =
                                      baseCalculoIVA * (percentual / 100);
                                    updateFormData(
                                      "tributacao.impostos.iva.valor",
                                      valor
                                    );
                                  }}
                                  className="w-full"
                                />
                              </div>
                              <div className="w-24">
                                <input
                                  type="number"
                                  min="0"
                                  max="30"
                                  step="1"
                                  value={
                                    formData.tributacao.impostos.iva
                                      .percentual || 16
                                  }
                                  onChange={(e) => {
                                    const percentual =
                                      parseFloat(e.target.value) || 16;
                                    updateFormData(
                                      "tributacao.impostos.iva.percentual",
                                      percentual
                                    );
                                    const baseCalculoIVA =
                                      formData.tributacao.valorAduaneiro +
                                      (formData.tributacao.impostos
                                        .direitosAduaneiros.valor || 0);
                                    const valor =
                                      baseCalculoIVA * (percentual / 100);
                                    updateFormData(
                                      "tributacao.impostos.iva.valor",
                                      valor
                                    );
                                  }}
                                  className="w-full px-3 py-1 border border-gray-300 rounded text-center"
                                />
                              </div>
                              <span className="text-sm font-medium">%</span>
                            </div>
                          </div>

                          {/* Botão para calcular automaticamente */}
                          <button
                            type="button"
                            onClick={() => {
                              // Calcular total de impostos
                              const direitosValor =
                                formData.tributacao.impostos.direitosAduaneiros
                                  .valor || 0;
                              const ivaValor =
                                formData.tributacao.impostos.iva.valor || 0;
                              const totalImpostos = direitosValor + ivaValor;
                              const totalLiquido =
                                formData.tributacao.valorAduaneiro +
                                totalImpostos;

                              updateFormData(
                                "tributacao.impostos.totalImpostos",
                                totalImpostos
                              );
                              updateFormData(
                                "tributacao.impostos.totalLiquido",
                                totalLiquido
                              );
                              updateFormData(
                                "pagamento.valorTotal",
                                totalLiquido
                              );

                              setSuccess(
                                "Tributos calculados automaticamente!"
                              );
                            }}
                            className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium flex items-center justify-center"
                          >
                            <span className="mr-2">🧮</span>
                            Calcular Tributos Automaticamente
                          </button>
                        </div>

                        {/* Resumo dos Tributos */}
                        {(formData.tributacao.impostos.totalImpostos || 0) >
                          0 && (
                          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h5 className="font-medium text-gray-900 mb-3">
                              📋 Resumo dos Tributos
                            </h5>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  Valor Aduaneiro:
                                </span>
                                <span className="font-medium">
                                  $
                                  {formData.tributacao.valorAduaneiro?.toLocaleString(
                                    "pt-MZ",
                                    { minimumFractionDigits: 2 }
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  Direitos Aduaneiros (
                                  {formData.tributacao.impostos
                                    .direitosAduaneiros.percentual || 0}
                                  %):
                                </span>
                                <span className="font-medium text-red-600">
                                  $
                                  {formData.tributacao.impostos.direitosAduaneiros.valor?.toLocaleString(
                                    "pt-MZ",
                                    { minimumFractionDigits: 2 }
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  IVA (
                                  {formData.tributacao.impostos.iva
                                    .percentual || 16}
                                  %):
                                </span>
                                <span className="font-medium text-red-600">
                                  $
                                  {formData.tributacao.impostos.iva.valor?.toLocaleString(
                                    "pt-MZ",
                                    { minimumFractionDigits: 2 }
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-between border-t pt-2">
                                <span className="font-bold text-gray-900">
                                  Total Impostos:
                                </span>
                                <span className="font-bold text-red-600">
                                  $
                                  {formData.tributacao.impostos.totalImpostos?.toLocaleString(
                                    "pt-MZ",
                                    { minimumFractionDigits: 2 }
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-bold text-gray-900">
                                  Total Líquido a Pagar:
                                </span>
                                <span className="font-bold text-green-600">
                                  $
                                  {formData.tributacao.impostos.totalLiquido?.toLocaleString(
                                    "pt-MZ",
                                    { minimumFractionDigits: 2 }
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* DOCUMENTAÇÃO (seção expandida) */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        📄 Documentação Necessária
                      </h4>

                      <div className="space-y-4">
                        {/* Documentos obrigatórios checklist */}
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-3">
                            ✅ Documentos Obrigatórios
                          </h5>
                          <div className="space-y-2">
                            {[
                              {
                                id: "fatura_comercial",
                                label: "Fatura Comercial",
                                value: "factura_comercial",
                              },
                              {
                                id: "conhecimento_embarque",
                                label: "Conhecimento de Embarque",
                                value: "conhecimento_embarque",
                              },
                              {
                                id: "certificado_origem",
                                label: "Certificado de Origem",
                                value: "certificado_origem",
                              },
                              {
                                id: "lista_embalagem",
                                label: "Lista de Embalagem",
                                value: "lista_embalagem",
                              },
                              {
                                id: "documentos_transporte",
                                label: "Documentos de Transporte",
                                value: "documentos_transporte",
                              },
                            ].map((doc) => (
                              <div key={doc.id} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={doc.id}
                                  checked={
                                    formData.documentacao.documentos?.some(
                                      (d) => d.tipo === doc.value && d.recebido
                                    ) || false
                                  }
                                  onChange={(e) => {
                                    const documentos = [
                                      ...(formData.documentacao.documentos ||
                                        []),
                                    ];
                                    const index = documentos.findIndex(
                                      (d) => d.tipo === doc.value
                                    );

                                    if (e.target.checked) {
                                      if (index === -1) {
                                        documentos.push({
                                          tipo: doc.value,
                                          nomeDocumento: doc.label,
                                          obrigatorio: true,
                                          recebido: true,
                                          dataRecebimento: new Date()
                                            .toISOString()
                                            .split("T")[0],
                                        });
                                      } else {
                                        documentos[index].recebido = true;
                                        documentos[index].dataRecebimento =
                                          new Date()
                                            .toISOString()
                                            .split("T")[0];
                                      }
                                    } else if (index !== -1) {
                                      documentos[index].recebido = false;
                                      documentos[index].dataRecebimento = "";
                                    }

                                    updateFormData(
                                      "documentacao.documentos",
                                      documentos
                                    );

                                    // Atualizar percentual de documentação completa
                                    const recebidos = documentos.filter(
                                      (d) => d.obrigatorio && d.recebido
                                    ).length;
                                    const obrigatorios = documentos.filter(
                                      (d) => d.obrigatorio
                                    ).length;
                                    const percentual =
                                      obrigatorios > 0
                                        ? (recebidos / obrigatorios) * 100
                                        : 100;
                                    updateFormData(
                                      "documentacao.percentualCompleto",
                                      percentual
                                    );
                                    updateFormData(
                                      "documentacao.documentacaoCompleta",
                                      percentual === 100
                                    );
                                  }}
                                  className="h-4 w-4 text-blue-600 rounded"
                                />
                                <label
                                  htmlFor={doc.id}
                                  className="ml-2 text-sm text-gray-700"
                                >
                                  {doc.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Documentos adicionais */}
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-3">
                            📝 Documentos Adicionais
                          </h5>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Licença de Importação/Exportação
                              </label>
                              <input
                                type="text"
                                value={
                                  formData.regimeAduaneiro
                                    .numeroLicencaImportacao || ""
                                }
                                onChange={(e) =>
                                  updateFormData(
                                    "regimeAduaneiro.numeroLicencaImportacao",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="Número da licença"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Certificado de Origem (se aplicável)
                              </label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <select
                                    value={
                                      formData.mercadoria.certificadoOrigem
                                        .tipo || ""
                                    }
                                    onChange={(e) =>
                                      updateFormData(
                                        "mercadoria.certificadoOrigem.tipo",
                                        e.target.value
                                      )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                  >
                                    <option value="">Selecione o tipo</option>
                                    <option value="form_a">
                                      Form A (Países em desenvolvimento)
                                    </option>
                                    <option value="form_d">
                                      Form D (COMESA)
                                    </option>
                                    <option value="form_e">
                                      Form E (ASEAN)
                                    </option>
                                    <option value="geral">
                                      Certificado Geral
                                    </option>
                                  </select>
                                </div>
                                <div>
                                  <input
                                    type="text"
                                    value={
                                      formData.mercadoria.certificadoOrigem
                                        .numero || ""
                                    }
                                    onChange={(e) =>
                                      updateFormData(
                                        "mercadoria.certificadoOrigem.numero",
                                        e.target.value
                                      )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Número do certificado"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Status da documentação */}
                        <div className="p-4 bg-green-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-900">
                              Status da Documentação
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                formData.documentacao.documentacaoCompleta
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {formData.documentacao.documentacaoCompleta
                                ? "Completa"
                                : "Incompleta"}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-green-600 h-2.5 rounded-full"
                              style={{
                                width: `${
                                  formData.documentacao.percentualCompleto || 0
                                }%`,
                              }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-500">0%</span>
                            <span className="text-xs font-medium text-gray-700">
                              {formData.documentacao.percentualCompleto || 0}%
                              completo
                            </span>
                            <span className="text-xs text-gray-500">100%</span>
                          </div>
                        </div>

                        {/* Observações sobre documentação */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Observações sobre Documentação
                          </label>
                          <textarea
                            rows={3}
                            value={
                              formData.documentacao.observacoesDocumentacao ||
                              ""
                            }
                            onChange={(e) =>
                              updateFormData(
                                "documentacao.observacoesDocumentacao",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="Observações adicionais sobre a documentação..."
                          />
                        </div>
                      </div>
                    </div>

                    {/* INFORMAÇÕES DE PAGAMENTO */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        💰 Informações de Pagamento
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Valor Total (USD)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={
                              formData.pagamento.valorTotal ||
                              formData.tributacao.impostos.totalLiquido ||
                              0
                            }
                            onChange={(e) =>
                              updateFormData(
                                "pagamento.valorTotal",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="0,00"
                            readOnly={["importacao", "despacho"].includes(
                              activeAduanaProcess
                            )}
                          />
                          {["importacao", "despacho"].includes(
                            activeAduanaProcess
                          ) && (
                            <p className="text-xs text-gray-500 mt-1">
                              Calculado automaticamente dos tributos
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Moeda de Pagamento
                          </label>
                          <select
                            value={formData.pagamento.moeda}
                            onChange={(e) =>
                              updateFormData("pagamento.moeda", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          >
                            <option value="USD">USD - Dólar Americano</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="MZN">MZN - Metical</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Meio de Pagamento
                          </label>
                          <select
                            value={formData.pagamento.meioPagamento}
                            onChange={(e) =>
                              updateFormData(
                                "pagamento.meioPagamento",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          >
                            <option value="transferencia">
                              Transferência Bancária
                            </option>
                            <option value="dinheiro">Dinheiro</option>
                            <option value="cheque">Cheque</option>
                            <option value="credito">Cartão de Crédito</option>
                            <option value="multicaixa">Multicaixa</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Data de Vencimento
                          </label>
                          <input
                            type="date"
                            value={formData.pagamento.dataVencimento || ""}
                            onChange={(e) =>
                              updateFormData(
                                "pagamento.dataVencimento",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Referência de Pagamento
                        </label>
                        <input
                          type="text"
                          value={formData.pagamento.referenciaPagamento || ""}
                          onChange={(e) =>
                            updateFormData(
                              "pagamento.referenciaPagamento",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Número de referência do pagamento"
                        />
                      </div>
                    </div>

                    {/* OBSERVAÇÕES GERAIS */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        📝 Observações Gerais
                      </h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Observações
                        </label>
                        <textarea
                          rows={4}
                          value={formData.observacoes || ""}
                          onChange={(e) =>
                            updateFormData("observacoes", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Observações adicionais sobre o processo..."
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                      >
                        Limpar
                      </button>
                      <button
                        type="button"
                        onClick={criarDespachoAduaneiro}
                        disabled={loading}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50"
                      >
                        {loading
                          ? "Processando..."
                          : activeAduanaProcess === "importacao"
                          ? "Iniciar Importação"
                          : activeAduanaProcess === "exportacao"
                          ? "Iniciar Exportação"
                          : activeAduanaProcess === "transito"
                          ? "Criar Trânsito"
                          : activeAduanaProcess === "despacho"
                          ? "Criar Despacho"
                          : "Solicitar Consultoria"}
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
                  📋 Pré-visualização
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-medium text-gray-900">
                      {activeAduanaProcess === "importacao" &&
                        "PROCESSO DE IMPORTAÇÃO"}
                      {activeAduanaProcess === "exportacao" &&
                        "PROCESSO DE EXPORTAÇÃO"}
                      {activeAduanaProcess === "transito" &&
                        "PROCESSO DE TRÂNSITO"}
                      {activeAduanaProcess === "despacho" &&
                        "DESPACHO ADUANEIRO"}
                      {activeAduanaProcess === "consultoria" &&
                        "CONSULTORIA ADUANEIRA"}
                    </p>
                    <p className="text-xs text-gray-600">
                      Status: <span className="text-orange-600">Rascunho</span>
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      {activeAduanaProcess === "importacao"
                        ? "Importador:"
                        : activeAduanaProcess === "exportacao"
                        ? "Exportador:"
                        : activeAduanaProcess === "transito"
                        ? "Transitário:"
                        : activeAduanaProcess === "consultoria"
                        ? "Cliente:"
                        : "Cliente:"}
                    </span>
                    <p className="font-medium text-gray-900">
                      {formData.cliente.nomeCliente || "-"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">NUIT:</span>
                    <p className="font-medium text-gray-900">
                      {formData.cliente.nuit || "-"}
                    </p>
                  </div>
                  {formData.mercadoria.descricao && (
                    <div>
                      <span className="text-gray-600">Mercadoria:</span>
                      <p className="font-medium text-gray-900">
                        {formData.mercadoria.descricao}
                      </p>
                    </div>
                  )}
                  {formData.mercadoria.valorMercadoria > 0 && (
                    <div>
                      <span className="text-gray-600">Valor:</span>
                      <p className="font-medium text-gray-900">
                        ${formData.mercadoria.valorMercadoria?.toLocaleString()}
                      </p>
                    </div>
                  )}
                  {formData.consultoria.valorConsulta > 0 && (
                    <div>
                      <span className="text-gray-600">Valor Consultoria:</span>
                      <p className="font-medium text-gray-900">
                        ${formData.consultoria.valorConsulta?.toLocaleString()}
                      </p>
                    </div>
                  )}
                  {formData.tributacao.impostos.totalLiquido > 0 && (
                    <div>
                      <span className="text-gray-600">Total Estimado:</span>
                      <p className="font-medium text-blue-600">
                        $
                        {formData.tributacao.impostos.totalLiquido?.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  ℹ️ Informações
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  {activeAduanaProcess === "importacao" && (
                    <>
                      <p>• Processo leva 3-5 dias úteis</p>
                      <p>• Documentação completa obrigatória</p>
                      <p>• Taxas alfandegárias calculadas automaticamente</p>
                    </>
                  )}
                  {activeAduanaProcess === "exportacao" && (
                    <>
                      <p>• Processo leva 2-4 dias úteis</p>
                      <p>• Licenças específicas podem ser necessárias</p>
                      <p>• Verificar restrições do país de destino</p>
                    </>
                  )}
                  {activeAduanaProcess === "transito" && (
                    <>
                      <p>• Prazo máximo de trânsito: 90 dias</p>
                      <p>
                        • Garantia obrigatória para valores superiores a $1000
                      </p>
                      <p>• Documentação de origem e destino necessária</p>
                    </>
                  )}
                  {activeAduanaProcess === "despacho" && (
                    <>
                      <p>• DAU deve ser submetido em 48h</p>
                      <p>• Tributos calculados automaticamente</p>
                      <p>• Pagamento obrigatório para liberação</p>
                    </>
                  )}
                  {activeAduanaProcess === "consultoria" && (
                    <>
                      <p>• Resposta em 24-48 horas úteis</p>
                      <p>• Consultores especializados disponíveis</p>
                      <p>• Análise personalizada para cada caso</p>
                    </>
                  )}
                  <p>• Acompanhamento em tempo real</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rastreio de Processos */}
        {activeAduanaProcess === "rastreio" && (
          <div className="space-y-6">
            {/* Filtros de Pesquisa */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                🔍 Rastreio de Processos Aduaneiros
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  value={filtros.numeroProcesso}
                  onChange={(e) =>
                    handleFilterChange("numeroProcesso", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Número do Processo"
                />
                <select
                  value={filtros.tipoProcesso}
                  onChange={(e) =>
                    handleFilterChange("tipoProcesso", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Todos os Tipos</option>
                  <option value="importacao">Importação</option>
                  <option value="exportacao">Exportação</option>
                  <option value="transito">Trânsito</option>
                  <option value="consultoria">Consultoria</option>
                  <option value="despacho">Despacho</option>
                </select>
                <select
                  value={filtros.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Todos os Status</option>
                  <option value="rascunho">Rascunho</option>
                  <option value="submetido">Submetido</option>
                  <option value="em_analise">Em Análise</option>
                  <option value="liberado">Liberado</option>
                  <option value="concluido">Concluído</option>
                  <option value="em_transito">Em Trânsito</option>
                </select>
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50"
                >
                  {loading ? "Pesquisando..." : "Pesquisar"}
                </button>
              </div>
              <button
                onClick={clearFilters}
                className="mt-3 text-sm text-blue-600 hover:text-blue-800"
              >
                Limpar filtros
              </button>
            </div>

            {/* Lista de Processos */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">
                    📋 Processos Aduaneiros
                  </h3>
                  <span className="text-sm text-gray-600">
                    {despachos.length} processos encontrados
                  </span>
                </div>
              </div>
              <div className="p-6">
                {despachos.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Nenhum processo encontrado
                  </p>
                ) : (
                  <div className="space-y-4">
                    {despachos.map((despacho) => (
                      <div
                        key={despacho._id}
                        className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold ${
                              despacho.tipoProcesso === "importacao"
                                ? "bg-blue-500"
                                : despacho.tipoProcesso === "exportacao"
                                ? "bg-green-500"
                                : despacho.tipoProcesso === "transito"
                                ? "bg-purple-500"
                                : despacho.tipoProcesso === "consultoria"
                                ? "bg-indigo-500"
                                : despacho.tipoProcesso === "despacho"
                                ? "bg-orange-500"
                                : "bg-gray-500"
                            }`}
                          >
                            {despacho.tipoProcesso === "importacao"
                              ? "IMP"
                              : despacho.tipoProcesso === "exportacao"
                              ? "EXP"
                              : despacho.tipoProcesso === "transito"
                              ? "TRA"
                              : despacho.tipoProcesso === "consultoria"
                              ? "CON"
                              : despacho.tipoProcesso === "despacho"
                              ? "DAU"
                              : "OUT"}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {despacho.numeroProcesso || "SEM-NÚMERO"}
                            </p>
                            <p className="text-sm text-gray-600">
                              {despacho.cliente?.nomeCliente || "Sem nome"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {despacho.datas?.dataCriacao
                                ? new Date(
                                    despacho.datas.dataCriacao
                                  ).toLocaleDateString()
                                : "Data não informada"}
                            </p>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Status</p>
                          {renderStatusBadge(despacho.status || "rascunho")}
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Valor</p>
                          <p className="font-bold text-gray-900">
                            $
                            {despacho.pagamento?.valorTotal?.toLocaleString() ||
                              "0"}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedDespacho(despacho);
                              setShowModal(true);
                              setActiveTab("Mercadoria");
                            }}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                          >
                            Detalhes
                          </button>
                          <button
                            onClick={() => handleEditDespacho(despacho)}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => gerarPDFDespacho(despacho)}
                            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 flex items-center"
                            title="Gerar PDF"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            PDF
                          </button>
                          {(despacho.status === "rascunho" ||
                            !despacho.status) && (
                            <button
                              onClick={() =>
                                submeterAlfandega(despacho.numeroProcesso)
                              }
                              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                            >
                              Submeter
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Dashboard/Gráficos */}
        {activeAduanaProcess === "graficos" && (
          <div className="space-y-6">
            {/* Estatísticas Gerais */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  title: "Processos Totais",
                  value: despachos.length,
                  icon: "📊",
                  color: "blue",
                },
                {
                  title: "Importações",
                  value: despachos.filter(
                    (d) => d.tipoProcesso === "importacao"
                  ).length,
                  icon: "📥",
                  color: "green",
                },
                {
                  title: "Exportações",
                  value: despachos.filter(
                    (d) => d.tipoProcesso === "exportacao"
                  ).length,
                  icon: "📤",
                  color: "orange",
                },
                {
                  title: "Em Análise",
                  value: despachos.filter((d) => d.status === "em_analise")
                    .length,
                  icon: "⏳",
                  color: "yellow",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        stat.color === "blue"
                          ? "bg-blue-100"
                          : stat.color === "green"
                          ? "bg-green-100"
                          : stat.color === "orange"
                          ? "bg-orange-100"
                          : "bg-yellow-100"
                      }`}
                    >
                      <span
                        className={`${
                          stat.color === "blue"
                            ? "text-blue-600"
                            : stat.color === "green"
                            ? "text-green-600"
                            : stat.color === "orange"
                            ? "text-orange-600"
                            : "text-yellow-600"
                        } text-xl`}
                      >
                        {stat.icon}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gráfico de Processos por Tipo */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h4 className="font-semibold text-gray-900 mb-4">
                📊 Distribuição por Tipo de Processo
              </h4>
              <div className="h-64 flex items-end justify-between space-x-2">
                {[
                  {
                    tipo: "Importação",
                    quantidade: despachos.filter(
                      (d) => d.tipoProcesso === "importacao"
                    ).length,
                    cor: "bg-blue-500",
                  },
                  {
                    tipo: "Exportação",
                    quantidade: despachos.filter(
                      (d) => d.tipoProcesso === "exportacao"
                    ).length,
                    cor: "bg-green-500",
                  },
                  {
                    tipo: "Trânsito",
                    quantidade: despachos.filter(
                      (d) => d.tipoProcesso === "transito"
                    ).length,
                    cor: "bg-purple-500",
                  },
                  {
                    tipo: "Consultoria",
                    quantidade: despachos.filter(
                      (d) => d.tipoProcesso === "consultoria"
                    ).length,
                    cor: "bg-indigo-500",
                  },
                  {
                    tipo: "Despacho",
                    quantidade: despachos.filter(
                      (d) => d.tipoProcesso === "despacho"
                    ).length,
                    cor: "bg-orange-500",
                  },
                ].map((item, index) => {
                  const maxQuantidade = Math.max(
                    ...[
                      despachos.filter((d) => d.tipoProcesso === "importacao")
                        .length,
                      despachos.filter((d) => d.tipoProcesso === "exportacao")
                        .length,
                      despachos.filter((d) => d.tipoProcesso === "transito")
                        .length,
                      despachos.filter((d) => d.tipoProcesso === "consultoria")
                        .length,
                      despachos.filter((d) => d.tipoProcesso === "despacho")
                        .length,
                    ],
                    1
                  );
                  const percentual = (item.quantidade / maxQuantidade) * 100;

                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-1"
                    >
                      <div className="w-3/4">
                        <div
                          className={`${item.cor} rounded-t-lg transition-all hover:opacity-80`}
                          style={{
                            height: `${percentual}%`,
                            minHeight: "20px",
                          }}
                          title={`${item.tipo}: ${item.quantidade}`}
                        ></div>
                      </div>
                      <div className="mt-2 text-center">
                        <p className="text-sm font-medium">{item.tipo}</p>
                        <p className="text-lg font-bold">{item.quantidade}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Processos Recentes */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h4 className="font-semibold text-gray-900 mb-4">
                🕒 Processos Recentes
              </h4>
              <div className="space-y-4">
                {despachos.slice(0, 5).map((despacho, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {renderTipoBadge(despacho.tipoProcesso)}
                      <div>
                        <p className="font-medium text-gray-900">
                          {despacho.numeroProcesso || "SEM-NÚMERO"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {despacho.cliente?.nomeCliente}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {renderStatusBadge(despacho.status || "rascunho")}
                      <p className="text-sm text-gray-600 mt-1">
                        {despacho.datas?.dataCriacao
                          ? new Date(
                              despacho.datas.dataCriacao
                            ).toLocaleDateString()
                          : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {renderModal()}
      {renderEditModal()}
    </div>
  );
};

export default DespachoAduaneiro;
