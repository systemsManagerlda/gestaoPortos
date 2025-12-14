import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

// Constantes para opções
const TIPOS_TABELA = [
  { value: "padrao", label: "Padrão" },
  { value: "corporativa", label: "Corporativa" },
  { value: "promocional", label: "Promocional" },
  { value: "especial", label: "Especial" },
  { value: "cliente", label: "Por Cliente" }
];

const TIPOS_VEICULO = [
  { 
    tipoVeiculo: "bau", 
    descricao: "Caminhão Baú", 
    capacidadeMaxima: 15,
    precoPorKm: 12.80,
    precoMinimo: 850,
    fatoresAdicionais: {
      cargaPerigosa: 1.15,
      cargaFragil: 1.15,
      cargaRefrigerada: 1.20,
      cargaSuperpesada: 1.30
    }
  },
  { 
    tipoVeiculo: "cacamba", 
    descricao: "Caminhão Caçamba", 
    capacidadeMaxima: 20,
    precoPorKm: 14.20,
    precoMinimo: 950,
    fatoresAdicionais: {
      cargaPerigosa: 1.15,
      cargaFragil: 1.15,
      cargaRefrigerada: 1.20,
      cargaSuperpesada: 1.30
    }
  },
  { 
    tipoVeiculo: "truck_3_eixos", 
    descricao: "Truck 3 Eixos", 
    capacidadeMaxima: 30,
    precoPorKm: 18.50,
    precoMinimo: 1200,
    fatoresAdicionais: {
      cargaPerigosa: 1.15,
      cargaFragil: 1.15,
      cargaRefrigerada: 1.20,
      cargaSuperpesada: 1.30
    }
  }
];

const TIPOS_CARGA = [
  { tipoCarga: "graos_cereais", descricao: "Grãos e Cereais", multiplicador: 1.0 },
  { tipoCarga: "cimento_materiais", descricao: "Cimento e Materiais", multiplicador: 1.1 },
  { tipoCarga: "produtos_alimentares", descricao: "Produtos Alimentares", multiplicador: 1.2 },
  { tipoCarga: "combustiveis", descricao: "Combustíveis", multiplicador: 1.3 }
];

const SERVICOS_ADICIONAIS = [
  { servicoId: 1, nomeServico: "Carregamento", tipo: "carregamento", unidade: "valor_fixo", preco: 250 },
  { servicoId: 2, nomeServico: "Descarregamento", tipo: "descarregamento", unidade: "valor_fixo", preco: 250 },
  { servicoId: 3, nomeServico: "Ajudante de Carga", tipo: "assistencia", unidade: "dia", preco: 150 },
  { servicoId: 4, nomeServico: "Seguro de Carga", tipo: "seguraca", unidade: "percentual", preco: 1.5 }
];

// Mapeamento de cidades para províncias
const CIDADES_MOZAMBIQUE = [
  { cidade: "Maputo", provincia: "Maputo Cidade" },
  { cidade: "Matola", provincia: "Maputo" },
  { cidade: "Xai-Xai", provincia: "Gaza" },
  { cidade: "Inhambane", provincia: "Inhambane" },
  { cidade: "Beira", provincia: "Sofala" },
  { cidade: "Chimoio", provincia: "Manica" },
  { cidade: "Tete", provincia: "Tete" },
  { cidade: "Quelimane", provincia: "Zambézia" },
  { cidade: "Nampula", provincia: "Nampula" },
  { cidade: "Pemba", provincia: "Cabo Delgado" },
  { cidade: "Lichinga", provincia: "Niassa" },
  { cidade: "Maxixe", provincia: "Inhambane" }
];

const PROVINCIAS = [
  "Maputo Cidade", "Maputo", "Gaza", "Inhambane", "Sofala", "Manica",
  "Tete", "Zambézia", "Nampula", "Cabo Delgado", "Niassa"
];

const TabelaPrecos = () => {
  const [activeTabelaPrecos, setActiveTabelaPrecos] = useState("tabelas");
  const [loading, setLoading] = useState(false);
  const [tabelas, setTabelas] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [calcResult, setCalcResult] = useState(null);
  const [tabelaSelecionada, setTabelaSelecionada] = useState(null);
  
  // Formulários
  const [novaTabela, setNovaTabela] = useState({
    nomeTabela: "",
    codigoTabela: "",
    tipoTabela: "padrao",
    aplicacao: "todos_clientes",
    vigencia: {
      dataInicio: "",
      dataFim: ""
    },
    tarifaBase: {
      precoPorKm: 12.80,
      moeda: "MT",
      unidadeMedida: "km"
    },
    tarifasVeiculos: TIPOS_VEICULO.map(veiculo => ({
      ...veiculo,
      precoPorKm: veiculo.precoPorKm,
      precoMinimo: veiculo.precoMinimo
    })),
    tarifasCargas: TIPOS_CARGA,
    servicosAdicionais: SERVICOS_ADICIONAIS,
    impostos: {
      ivaPercentual: 17,
      incidencia: "sobre_total"
    },
    configuracoes: {
      arredondamento: {
        tipo: "unidade",
        casasDecimais: 2
      },
      moeda: {
        simbolo: "MT",
        nome: "Metical",
        formato: "1.234,56 MT"
      },
      calculoAutomatico: {
        aplicarIVA: true,
        aplicarDescontos: true,
        aplicarServicos: true,
        considerarDistanciaReal: true
      }
    },
    observacoes: "",
    criadoPor: "admin"
  });

  const [novaRota, setNovaRota] = useState({
    codigoRota: "",
    origem: { cidade: "", provincia: "", pais: "Moçambique" },
    destino: { cidade: "", provincia: "", pais: "Moçambique" },
    distancia: "",
    tempoEstimado: { horas: "", minutos: "" },
    tarifas: []
  });

  const [calcForm, setCalcForm] = useState({
    tabelaId: "",
    origem: "",
    destino: "",
    tipoVeiculo: "",
    tipoCarga: "",
    distancia: "",
    peso: "",
    servicosAdicionais: [],
    clienteId: ""
  });

  // Buscar dados iniciais
  useEffect(() => {
    buscarTabelas();
    buscarDashboard();
  }, []);

  const buscarTabelas = async (filtros = {}) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/getTabelaPrecoList`, {
        curPage: 1,
        pageSize: 20,
        ...filtros
      });

      if (response.data.returnCode === 200) {
        setTabelas(response.data.data.list);
      }
    } catch (error) {
      console.error("Erro ao buscar tabelas:", error);
      alert("Erro ao buscar tabelas: " + (error.response?.data?.returnMsg || error.message));
    } finally {
      setLoading(false);
    }
  };

  const buscarDashboard = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/getDashboardTabelasPrecos`, {});
      if (response.data.returnCode === 200) {
        setDashboardData(response.data.data);
      }
    } catch (error) {
      console.error("Erro ao buscar dashboard:", error);
    }
  };

  // Função para obter a província da cidade
  const getProvinciaByCidade = (cidade) => {
    const cidadeInfo = CIDADES_MOZAMBIQUE.find(c => c.cidade === cidade);
    return cidadeInfo ? cidadeInfo.provincia : "";
  };

  // Gerar tarifas para rota
  const gerarTarifasParaRota = (distancia) => {
    if (!distancia || parseFloat(distancia) <= 0) return [];
    
    return TIPOS_VEICULO.flatMap(veiculo =>
      TIPOS_CARGA.map(carga => ({
        tipoVeiculo: veiculo.tipoVeiculo,
        tipoCarga: carga.tipoCarga,
        precoPorKm: veiculo.precoPorKm * carga.multiplicador,
        precoMinimo: veiculo.precoMinimo * carga.multiplicador
      }))
    );
  };

  const criarTabela = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const dadosTabela = {
        ...novaTabela,
        vigencia: {
          ...novaTabela.vigencia,
          dataInicio: novaTabela.vigencia.dataInicio ? new Date(novaTabela.vigencia.dataInicio).toISOString() : new Date().toISOString()
        }
      };

      if (!novaTabela.vigencia.dataFim) {
        delete dadosTabela.vigencia.dataFim;
      }

      const response = await axios.post(`${API_BASE_URL}/createTabelaPreco`, dadosTabela);

      if (response.data.returnCode === 201) {
        alert("Tabela criada com sucesso!");
        resetarFormularioTabela();
        buscarTabelas();
      }
    } catch (error) {
      console.error("Erro ao criar tabela:", error);
      const errorMsg = error.response?.data?.returnMsg || error.message;
      alert("Erro ao criar tabela: " + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const resetarFormularioTabela = () => {
    setNovaTabela({
      nomeTabela: "",
      codigoTabela: "",
      tipoTabela: "padrao",
      aplicacao: "todos_clientes",
      vigencia: {
        dataInicio: "",
        dataFim: ""
      },
      tarifaBase: {
        precoPorKm: 12.80,
        moeda: "MT",
        unidadeMedida: "km"
      },
      tarifasVeiculos: TIPOS_VEICULO.map(veiculo => ({
        ...veiculo,
        precoPorKm: veiculo.precoPorKm,
        precoMinimo: veiculo.precoMinimo
      })),
      tarifasCargas: TIPOS_CARGA,
      servicosAdicionais: SERVICOS_ADICIONAIS,
      impostos: {
        ivaPercentual: 17,
        incidencia: "sobre_total"
      },
      configuracoes: {
        arredondamento: {
          tipo: "unidade",
          casasDecimais: 2
        },
        moeda: {
          simbolo: "MT",
          nome: "Metical",
          formato: "1.234,56 MT"
        },
        calculoAutomatico: {
          aplicarIVA: true,
          aplicarDescontos: true,
          aplicarServicos: true,
          considerarDistanciaReal: true
        }
      },
      observacoes: "",
      criadoPor: "admin"
    });
  };

  const adicionarRota = async () => {
    try {
      if (!tabelaSelecionada) {
        alert("Selecione uma tabela primeiro");
        return;
      }

      // Validar campos obrigatórios
      if (!novaRota.codigoRota || !novaRota.origem.cidade || !novaRota.destino.cidade || !novaRota.distancia) {
        alert("Preencha todos os campos obrigatórios da rota (Código, Cidade Origem, Cidade Destino, Distância)");
        return;
      }

      // Obter províncias das cidades selecionadas
      const provinciaOrigem = getProvinciaByCidade(novaRota.origem.cidade);
      const provinciaDestino = getProvinciaByCidade(novaRota.destino.cidade);

      if (!provinciaOrigem || !provinciaDestino) {
        alert("Cidade não encontrada no mapeamento. Verifique se selecionou cidades válidas.");
        return;
      }

      // Gerar rotaId
      const rotaId = Math.floor(Math.random() * 10000) + 1;

      const rotaData = {
        rotaId: rotaId,
        codigoRota: novaRota.codigoRota,
        origem: {
          cidade: novaRota.origem.cidade,
          provincia: provinciaOrigem,
          pais: "Moçambique",
          coordenadas: {
            lat: -25.9692, // Coordenadas aproximadas
            lng: 32.5732
          }
        },
        destino: {
          cidade: novaRota.destino.cidade,
          provincia: provinciaDestino,
          pais: "Moçambique",
          coordenadas: {
            lat: -19.8333, // Coordenadas aproximadas
            lng: 34.8619
          }
        },
        distancia: parseFloat(novaRota.distancia),
        tempoEstimado: novaRota.tempoEstimado.horas ? {
          horas: parseInt(novaRota.tempoEstimado.horas),
          minutos: parseInt(novaRota.tempoEstimado.minutos) || 0
        } : undefined,
        condicoesEspeciais: {
          dificuldade: "media",
          estradas: ["asfalto", "terra"],
          pedagios: 0,
          zonasRisco: []
        },
        tarifas: gerarTarifasParaRota(novaRota.distancia),
        ativa: true,
        dataCadastro: new Date().toISOString(),
        atualizadoPor: "admin"
      };

      console.log("Enviando rota:", rotaData);

      const response = await axios.post(`${API_BASE_URL}/adicionarRotaTabela`, {
        tabelaId: tabelaSelecionada.tabelaId,
        rotaData: rotaData
      });

      if (response.data.returnCode === 200) {
        alert("Rota adicionada com sucesso!");
        resetarFormularioRota();
        buscarTabelas();
      }
    } catch (error) {
      console.error("Erro ao adicionar rota:", error);
      const errorMsg = error.response?.data?.returnMsg || error.message;
      alert("Erro ao adicionar rota: " + errorMsg);
    }
  };

  const resetarFormularioRota = () => {
    setNovaRota({
      codigoRota: "",
      origem: { cidade: "", provincia: "", pais: "Moçambique" },
      destino: { cidade: "", provincia: "", pais: "Moçambique" },
      distancia: "",
      tempoEstimado: { horas: "", minutos: "" },
      tarifas: []
    });
  };

  const calcularPreco = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      let distanciaUsar = parseFloat(calcForm.distancia);
      let origem = calcForm.origem;
      let destino = calcForm.destino;

      if (origem && destino) {
        const dadosRota = await buscarRota(calcForm.tabelaId, origem, destino);
        if (dadosRota?.rota?.distancia) {
          distanciaUsar = dadosRota.rota.distancia;
        }
      }

      const response = await axios.post(`${API_BASE_URL}/calcularPrecoViagem`, {
        tabelaId: calcForm.tabelaId,
        dadosViagem: {
          origem: origem,
          destino: destino,
          tipoVeiculo: calcForm.tipoVeiculo,
          tipoCarga: calcForm.tipoCarga,
          distancia: distanciaUsar,
          peso: parseFloat(calcForm.peso) || 0,
          servicosAdicionais: calcForm.servicosAdicionais,
          clienteId: calcForm.clienteId || null
        }
      });

      if (response.data.returnCode === 200) {
        setCalcResult(response.data.data);
      }
    } catch (error) {
      console.error("Erro ao calcular preço:", error);
      alert("Erro ao calcular preço: " + (error.response?.data?.returnMsg || error.message));
    } finally {
      setLoading(false);
    }
  };

  const buscarRota = async (tabelaId, origem, destino) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/buscarRota`, {
        tabelaId,
        origem,
        destino
      });

      if (response.data.returnCode === 200) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error("Erro ao buscar rota:", error);
      return null;
    }
  };

  const formatarMoeda = (valor) => {
    if (!valor) return "0,00 MT";
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN',
      minimumFractionDigits: 2
    }).format(valor);
  };

  const formatarData = (data) => {
    if (!data) return "N/A";
    return format(new Date(data), "dd/MM/yyyy", { locale: ptBR });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'ativa': return 'bg-green-100 text-green-800';
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'expirada': return 'bg-red-100 text-red-800';
      case 'arquivada': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getTipoTabelaLabel = (tipo) => {
    const tipoObj = TIPOS_TABELA.find(t => t.value === tipo);
    return tipoObj ? tipoObj.label : tipo;
  };

  const getTipoVeiculoLabel = (tipo) => {
    const veiculo = TIPOS_VEICULO.find(v => v.tipoVeiculo === tipo);
    return veiculo ? veiculo.descricao : tipo;
  };

  const getTipoCargaLabel = (tipo) => {
    const carga = TIPOS_CARGA.find(c => c.tipoCarga === tipo);
    return carga ? carga.descricao : tipo;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Cabeçalho */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            💰
          </span>
          Tabela de Preços - Gestão de Tarifas e Serviços
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Configuração e gestão de tabelas de preços, tarifas e serviços de transporte
        </p>
      </div>

      {/* Menu de Navegação */}
      <div className="flex space-x-4 p-6 pb-4 border-b border-gray-200 bg-white">
        <button
          onClick={() => setActiveTabelaPrecos("tabelas")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            activeTabelaPrecos === "tabelas"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          📋 Tabelas
        </button>
        <button
          onClick={() => setActiveTabelaPrecos("rotas")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            activeTabelaPrecos === "rotas"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          🗺️ Rotas
        </button>
        <button
          onClick={() => setActiveTabelaPrecos("calculadora")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            activeTabelaPrecos === "calculadora"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          🧮 Calculadora
        </button>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 p-6 overflow-auto">
        {loading && activeTabelaPrecos !== "calculadora" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-700">Carregando...</p>
            </div>
          </div>
        )}

        {/* Gestão de Tabelas */}
        {activeTabelaPrecos === "tabelas" && (
          <div className="space-y-6">
            {/* Dashboard */}
            {dashboardData && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total de Tabelas</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardData.estatisticas?.totalTabelas || 0}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <span className="text-blue-600 text-xl">📋</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Tabelas Vigentes</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardData.estatisticas?.tabelasVigentes || 0}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <span className="text-green-600 text-xl">✅</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Preço Médio/km</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {dashboardData.precoMedioVeiculo?.[0]?.precoMedio 
                          ? formatarMoeda(dashboardData.precoMedioVeiculo[0].precoMedio)
                          : "12,50 MT"}
                      </p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <span className="text-purple-600 text-xl">💰</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Rotas Cadastradas</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {dashboardData.rotasPopulares?.reduce((acc, rota) => acc + (rota.totalTabelas || 0), 0) || 0}
                      </p>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <span className="text-orange-600 text-xl">🗺️</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Lista de Tabelas */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-purple-50 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">📋 Tabelas de Preços</h3>
                  <button
                    onClick={() => buscarTabelas()}
                    className="text-sm text-purple-600 hover:text-purple-800 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Atualizar
                  </button>
                </div>
                <div className="p-6 max-h-[500px] overflow-y-auto">
                  <div className="space-y-4">
                    {tabelas.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">Nenhuma tabela encontrada</p>
                        <button
                          onClick={() => buscarTabelas()}
                          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                        >
                          Clique para buscar tabelas
                        </button>
                      </div>
                    ) : (
                      tabelas.map((tabela) => (
                        <div 
                          key={tabela.tabelaId} 
                          className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors cursor-pointer"
                          onClick={() => {
                            setTabelaSelecionada(tabela);
                            alert(`Tabela "${tabela.nomeTabela}" selecionada para adicionar rotas`);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{tabela.nomeTabela}</p>
                              <p className="text-sm text-gray-600">{tabela.codigoTabela}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(tabela.vigencia?.statusVigencia)}`}>
                                  {tabela.vigencia?.statusVigencia || 'ativa'}
                                </span>
                                <span className="text-xs text-blue-600">
                                  {getTipoTabelaLabel(tabela.tipoTabela)}
                                </span>
                                {tabela.totalRotasAtivas > 0 && (
                                  <span className="text-xs text-green-600">
                                    {tabela.totalRotasAtivas} rotas
                                  </span>
                                )}
                              </div>
                              {tabela.vigencia?.dataInicio && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Vigência: {formatarData(tabela.vigencia.dataInicio)} 
                                  {tabela.vigencia.dataFim && ` - ${formatarData(tabela.vigencia.dataFim)}`}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">
                                {formatarMoeda(tabela.precoMedioPorKm || tabela.tarifaBase?.precoPorKm || 0)}/km
                              </p>
                              {tabela.totalClientesEspeciaisAtivos > 0 && (
                                <p className="text-sm text-gray-600">{tabela.totalClientesEspeciaisAtivos} clientes especiais</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Nova Tabela */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-green-50">
                  <h3 className="font-semibold text-gray-900">➕ Nova Tabela de Preços</h3>
                  <p className="text-sm text-gray-600 mt-1">Preços padrão já incluídos</p>
                </div>
                <div className="p-6">
                  <form onSubmit={criarTabela} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome da Tabela *
                      </label>
                      <input
                        type="text"
                        value={novaTabela.nomeTabela}
                        onChange={(e) => setNovaTabela({...novaTabela, nomeTabela: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        placeholder="Ex: Tabela Corporativa 2024"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Código da Tabela *
                        </label>
                        <input
                          type="text"
                          value={novaTabela.codigoTabela}
                          onChange={(e) => setNovaTabela({...novaTabela, codigoTabela: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="EX: TAB-2024-001"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Tabela *
                        </label>
                        <select 
                          value={novaTabela.tipoTabela}
                          onChange={(e) => setNovaTabela({...novaTabela, tipoTabela: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          required
                        >
                          {TIPOS_TABELA.map(tipo => (
                            <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data Início *
                        </label>
                        <input
                          type="date"
                          value={novaTabela.vigencia.dataInicio}
                          onChange={(e) => setNovaTabela({
                            ...novaTabela, 
                            vigencia: {...novaTabela.vigencia, dataInicio: e.target.value}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data Fim
                        </label>
                        <input
                          type="date"
                          value={novaTabela.vigencia.dataFim}
                          onChange={(e) => setNovaTabela({
                            ...novaTabela, 
                            vigencia: {...novaTabela.vigencia, dataFim: e.target.value}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preço Base por KM (MT) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={novaTabela.tarifaBase.precoPorKm}
                        onChange={(e) => setNovaTabela({
                          ...novaTabela,
                          tarifaBase: {...novaTabela.tarifaBase, precoPorKm: parseFloat(e.target.value)}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        placeholder="12.80"
                        required
                      />
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-900 mb-3">Tarifas Padrão Incluídas:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {novaTabela.tarifasVeiculos.slice(0, 3).map((veiculo, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <p className="font-medium text-sm text-gray-900">{veiculo.descricao}</p>
                            <p className="text-sm text-gray-600">
                              {formatarMoeda(veiculo.precoPorKm)}/km • Mín: {formatarMoeda(veiculo.precoMinimo)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Observações
                      </label>
                      <textarea
                        rows={3}
                        value={novaTabela.observacoes}
                        onChange={(e) => setNovaTabela({...novaTabela, observacoes: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        placeholder="Descrição da tabela de preços..."
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={resetarFormularioTabela}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                      >
                        Limpar
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? "Criando..." : "Criar Tabela"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gestão de Rotas */}
        {activeTabelaPrecos === "rotas" && (
          <div className="space-y-6">
            {/* Selecionar Tabela */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                {tabelaSelecionada ? "Tabela Selecionada" : "Selecione uma Tabela para Adicionar Rota"}
              </h3>
              
              {tabelaSelecionada ? (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{tabelaSelecionada.nomeTabela}</p>
                      <p className="text-sm text-gray-600">{tabelaSelecionada.codigoTabela}</p>
                      <p className="text-xs text-blue-600 mt-1">
                        {tabelaSelecionada.totalRotasAtivas || 0} rotas cadastradas
                      </p>
                    </div>
                    <button
                      onClick={() => setTabelaSelecionada(null)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Alterar Tabela
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tabelas.filter(t => t.vigencia?.statusVigencia === 'ativa').slice(0, 6).map(tabela => (
                    <div 
                      key={tabela.tabelaId}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
                      onClick={() => setTabelaSelecionada(tabela)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">{tabela.nomeTabela}</p>
                          <p className="text-sm text-gray-600">{tabela.codigoTabela}</p>
                          <p className="text-xs text-blue-600 mt-1">
                            {tabela.totalRotasAtivas || 0} rotas cadastradas
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(tabela.vigencia?.statusVigencia)}`}>
                          {tabela.vigencia?.statusVigencia}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {tabelas.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nenhuma tabela disponível</p>
                  <button
                    onClick={() => setActiveTabelaPrecos("tabelas")}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Crie uma tabela primeiro
                  </button>
                </div>
              )}
            </div>

            {/* Adicionar Nova Rota */}
            {tabelaSelecionada && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-green-50">
                  <h3 className="font-semibold text-gray-900">➕ Adicionar Nova Rota</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Adicionando rota à tabela: <span className="font-medium">{tabelaSelecionada.nomeTabela}</span>
                  </p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Código da Rota *
                      </label>
                      <input
                        type="text"
                        value={novaRota.codigoRota}
                        onChange={(e) => setNovaRota({...novaRota, codigoRota: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                        placeholder="EX: ROTA-MAP-BEI-001"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Distância (km) *
                      </label>
                      <input
                        type="number"
                        value={novaRota.distancia}
                        onChange={(e) => setNovaRota({...novaRota, distancia: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                        placeholder="1200"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tempo Estimado (horas)
                      </label>
                      <input
                        type="number"
                        value={novaRota.tempoEstimado.horas}
                        onChange={(e) => setNovaRota({
                          ...novaRota,
                          tempoEstimado: {...novaRota.tempoEstimado, horas: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                        placeholder="18"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cidade Origem *
                      </label>
                      <select 
                        value={novaRota.origem.cidade}
                        onChange={(e) => {
                          const cidade = e.target.value;
                          const provincia = getProvinciaByCidade(cidade);
                          setNovaRota({
                            ...novaRota, 
                            origem: {
                              ...novaRota.origem, 
                              cidade: cidade,
                              provincia: provincia
                            }
                          });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                        required
                      >
                        <option value="">Selecione</option>
                        {CIDADES_MOZAMBIQUE.map(cidade => (
                          <option key={cidade.cidade} value={cidade.cidade}>
                            {cidade.cidade} ({cidade.provincia})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cidade Destino *
                      </label>
                      <select 
                        value={novaRota.destino.cidade}
                        onChange={(e) => {
                          const cidade = e.target.value;
                          const provincia = getProvinciaByCidade(cidade);
                          setNovaRota({
                            ...novaRota, 
                            destino: {
                              ...novaRota.destino, 
                              cidade: cidade,
                              provincia: provincia
                            }
                          });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                        required
                      >
                        <option value="">Selecione</option>
                        {CIDADES_MOZAMBIQUE.map(cidade => (
                          <option key={cidade.cidade} value={cidade.cidade}>
                            {cidade.cidade} ({cidade.provincia})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">Informações da Rota</p>
                        <div className="mt-2 space-y-1">
                          {novaRota.origem.cidade && (
                            <p className="text-xs text-gray-600">
                              Origem: {novaRota.origem.cidade} ({novaRota.origem.provincia || "..."})
                            </p>
                          )}
                          {novaRota.destino.cidade && (
                            <p className="text-xs text-gray-600">
                              Destino: {novaRota.destino.cidade} ({novaRota.destino.provincia || "..."})
                            </p>
                          )}
                          {novaRota.distancia && (
                            <p className="text-xs text-gray-600">
                              Distância: {novaRota.distancia} km
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 lg:col-span-3 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={resetarFormularioRota}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                      >
                        Limpar
                      </button>
                      <button
                        type="button"
                        onClick={adicionarRota}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                      >
                        Adicionar Rota
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Lista de Rotas */}
            {tabelas.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900">🗺️ Rotas Cadastradas</h3>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th className="px-4 py-3">Tabela</th>
                          <th className="px-4 py-3">Rota</th>
                          <th className="px-4 py-3">Origem → Destino</th>
                          <th className="px-4 py-3">Distância</th>
                          <th className="px-4 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tabelas.flatMap(tabela => 
                          (tabela.rotas || []).slice(0, 10).map(rota => (
                            <tr key={`${tabela.tabelaId}-${rota.rotaId || rota.codigoRota}`} className="bg-white border-b hover:bg-gray-50">
                              <td className="px-4 py-3">
                                <div>
                                  <p className="font-medium text-gray-900">{tabela.nomeTabela}</p>
                                  <p className="text-xs text-gray-500">{tabela.codigoTabela}</p>
                                </div>
                              </td>
                              <td className="px-4 py-3 font-medium text-gray-900">
                                {rota.codigoRota}
                              </td>
                              <td className="px-4 py-3">
                                {rota.origem?.cidade} ({rota.origem?.provincia}) → {rota.destino?.cidade} ({rota.destino?.provincia})
                              </td>
                              <td className="px-4 py-3">{rota.distancia} km</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded-full text-xs ${rota.ativa ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                  {rota.ativa ? 'Ativa' : 'Inativa'}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                        {tabelas.every(t => !t.rotas || t.rotas.length === 0) && (
                          <tr>
                            <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                              Nenhuma rota cadastrada ainda
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Calculadora */}
        {activeTabelaPrecos === "calculadora" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Formulário */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-purple-50">
                <h3 className="font-semibold text-gray-900">🧮 Calculadora de Preços</h3>
                <p className="text-sm text-gray-600 mt-1">Use uma tabela ativa para calcular</p>
              </div>
              <div className="p-6">
                <form onSubmit={calcularPreco} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tabela de Preços *
                    </label>
                    <select 
                      value={calcForm.tabelaId}
                      onChange={(e) => setCalcForm({...calcForm, tabelaId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-950"
                      required
                    >
                      <option value="">Selecione uma tabela</option>
                      {tabelas.filter(t => t.vigencia?.statusVigencia === 'ativa').map(tabela => (
                        <option key={tabela.tabelaId} value={tabela.tabelaId}>
                          {tabela.nomeTabela} - {getTipoTabelaLabel(tabela.tipoTabela)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Distância (km) *
                      </label>
                      <input
                        type="number"
                        value={calcForm.distancia}
                        onChange={(e) => setCalcForm({...calcForm, distancia: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-950"
                        placeholder="1200"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Peso (ton)
                      </label>
                      <input
                        type="number"
                        value={calcForm.peso}
                        onChange={(e) => setCalcForm({...calcForm, peso: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-950"
                        placeholder="15"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Origem (opcional)
                      </label>
                      <select 
                        value={calcForm.origem}
                        onChange={(e) => setCalcForm({...calcForm, origem: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-950"
                      >
                        <option value="">Selecione</option>
                        {CIDADES_MOZAMBIQUE.map(cidade => (
                          <option key={cidade.cidade} value={cidade.cidade}>
                            {cidade.cidade}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Destino (opcional)
                      </label>
                      <select 
                        value={calcForm.destino}
                        onChange={(e) => setCalcForm({...calcForm, destino: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-950"
                      >
                        <option value="">Selecione</option>
                        {CIDADES_MOZAMBIQUE.map(cidade => (
                          <option key={cidade.cidade} value={cidade.cidade}>
                            {cidade.cidade}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Veículo *
                      </label>
                      <select 
                        value={calcForm.tipoVeiculo}
                        onChange={(e) => setCalcForm({...calcForm, tipoVeiculo: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-950"
                        required
                      >
                        <option value="">Selecione</option>
                        {TIPOS_VEICULO.map(veiculo => (
                          <option key={veiculo.tipoVeiculo} value={veiculo.tipoVeiculo}>
                            {veiculo.descricao} ({veiculo.capacidadeMaxima} ton)
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Carga *
                      </label>
                      <select 
                        value={calcForm.tipoCarga}
                        onChange={(e) => setCalcForm({...calcForm, tipoCarga: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-950"
                        required
                      >
                        <option value="">Selecione</option>
                        {TIPOS_CARGA.map(carga => (
                          <option key={carga.tipoCarga} value={carga.tipoCarga}>
                            {carga.descricao}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Serviços Adicionais
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {SERVICOS_ADICIONAIS.map(servico => (
                        <div key={servico.servicoId} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <input 
                            type="checkbox" 
                            id={`servico-${servico.servicoId}`}
                            checked={calcForm.servicosAdicionais.includes(servico.servicoId.toString())}
                            onChange={(e) => {
                              const servicoId = servico.servicoId.toString();
                              const newServicos = e.target.checked 
                                ? [...calcForm.servicosAdicionais, servicoId]
                                : calcForm.servicosAdicionais.filter(s => s !== servicoId);
                              setCalcForm({...calcForm, servicosAdicionais: newServicos});
                            }}
                            className="mr-3"
                          />
                          <label htmlFor={`servico-${servico.servicoId}`} className="flex-1">
                            <p className="text-sm text-gray-900">{servico.nomeServico}</p>
                            <p className="text-xs text-gray-600">
                              {servico.unidade === 'percentual' 
                                ? `${servico.preco}% do valor` 
                                : formatarMoeda(servico.preco)}
                            </p>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Calculando..." : "Calcular Preço"}
                  </button>
                </form>
              </div>
            </div>

            {/* Resultado */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-green-50">
                <h3 className="font-semibold text-gray-900">💰 Resultado do Cálculo</h3>
                {calcResult && (
                  <p className="text-sm text-gray-600 mt-1">
                    {calcForm.origem && calcForm.destino 
                      ? `${calcForm.origem} → ${calcForm.destino}`
                      : "Cálculo geral"}
                  </p>
                )}
              </div>
              <div className="p-6">
                {calcResult ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <span className="font-medium text-gray-700">Distância:</span>
                      <span className="font-bold text-gray-900">
                        {calcResult.detalhes?.distancia || calcForm.distancia} km
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">Preço Base:</span>
                      <span className="font-bold text-gray-900">
                        {formatarMoeda(calcResult.precoBase)}
                      </span>
                      {calcResult.detalhes?.tarifaVeiculo && (
                        <span className="text-xs text-gray-500 ml-2">
                          ({formatarMoeda(calcResult.detalhes.tarifaVeiculo)}/km)
                        </span>
                      )}
                    </div>

                    {calcResult.servicosAdicionais > 0 && (
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-700">Serviços Adicionais:</span>
                        <span className="font-bold text-gray-900">
                          {formatarMoeda(calcResult.servicosAdicionais)}
                        </span>
                      </div>
                    )}

                    {calcResult.detalhes?.tipoCargaMultiplicador && calcResult.detalhes.tipoCargaMultiplicador > 1 && (
                      <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                        <span className="font-medium text-gray-700">Ajuste tipo de carga:</span>
                        <span className="font-bold text-gray-600">
                          +{((calcResult.detalhes.tipoCargaMultiplicador - 1) * 100).toFixed(0)}%
                        </span>
                      </div>
                    )}

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                        <span className="font-medium text-gray-700">Subtotal:</span>
                        <span className="font-bold text-gray-900">
                          {formatarMoeda(calcResult.subtotal)}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                      <span className="font-medium text-gray-700">
                        IVA ({calcResult.ivaPercentual}%):
                      </span>
                      <span className="font-bold text-gray-900">
                        {formatarMoeda(calcResult.valorIVA)}
                      </span>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                        <span className="text-lg font-bold text-gray-900">TOTAL FINAL:</span>
                        <span className="text-2xl font-bold text-blue-600">
                          {formatarMoeda(calcResult.total)}
                        </span>
                      </div>
                    </div>

                    <div className="text-center text-sm text-gray-600 mt-4 space-y-2">
                      {calcForm.peso > 0 && (
                        <p>
                          Preço por ton: <strong>
                            {formatarMoeda(calcResult.total / parseFloat(calcForm.peso))}
                          </strong>
                        </p>
                      )}
                      <p>
                        Preço por km: <strong>
                          {formatarMoeda(calcResult.total / (calcResult.detalhes?.distancia || parseFloat(calcForm.distancia) || 1))}
                        </strong>
                      </p>
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>Moeda: {calcResult.moeda}</p>
                        {calcForm.tipoVeiculo && (
                          <p>Veículo: {getTipoVeiculoLabel(calcForm.tipoVeiculo)}</p>
                        )}
                        {calcForm.tipoCarga && (
                          <p>Carga: {getTipoCargaLabel(calcForm.tipoCarga)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="mb-2">Preencha o formulário e clique em "Calcular Preço"</p>
                    <p className="text-sm">Os resultados aparecerão aqui</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabelaPrecos;