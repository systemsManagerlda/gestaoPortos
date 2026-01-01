import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
  Polyline,
} from "@react-google-maps/api";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";
const GOOGLE_MAPS_API_KEY = "AIzaSyB5Y1PUBVawvwuSUZEipJVLrEX9lV6Yn_0";

// Configurações do Google Maps
const CONFIG = {
  GOOGLE_MAPS_API_KEY: GOOGLE_MAPS_API_KEY,
  MAP: {
    containerStyle: {
      width: "100%",
      height: "500px",
    },
    defaultCenter: {
      lat: -25.965277,
      lng: 32.589169,
    },
    defaultZoom: 10,
  },
};

// Cores para gráficos
const CHART_COLORS = {
  primary: "#3b82f6",
  secondary: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#06b6d4",
  purple: "#8b5cf6",
};

const obterCoordenadasCidadeMocambique = (cidade) => {
  const cidadesMocambique = [
    { nome: "Maputo", lat: -25.965277, lng: 32.589169 },
    { nome: "Matola", lat: -25.966667, lng: 32.466667 },
    { nome: "Beira", lat: -19.833333, lng: 34.85 },
    { nome: "Nampula", lat: -15.116667, lng: 39.266667 },
    { nome: "Chimoio", lat: -19.116667, lng: 33.483333 },
    { nome: "Nacala", lat: -14.5425, lng: 40.672778 },
    { nome: "Quelimane", lat: -17.876389, lng: 36.887222 },
    { nome: "Tete", lat: -16.156389, lng: 33.586667 },
    { nome: "Xai-Xai", lat: -25.05, lng: 33.65 },
    { nome: "Gurué", lat: -15.466667, lng: 36.983333 },
    { nome: "Maxixe", lat: -23.866667, lng: 35.35 },
    { nome: "Lichinga", lat: -13.312778, lng: 35.240556 },
    { nome: "Pemba", lat: -12.966667, lng: 40.516667 },
    { nome: "Inhambane", lat: -23.865, lng: 35.383333 },
    { nome: "Cuamba", lat: -14.803889, lng: 36.537222 },
    { nome: "Mocuba", lat: -16.85, lng: 38.25 },
    { nome: "Montepuez", lat: -13.116667, lng: 39.0 },
    { nome: "Manica", lat: -18.933333, lng: 32.883333 },
  ];

  // Normalizar nome da cidade (remover acentos, converter para minúsculas)
  const normalizarNome = (nome) => {
    return nome
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const cidadeNormalizada = normalizarNome(cidade);
  const cidadeEncontrada = cidadesMocambique.find((c) =>
    normalizarNome(c.nome).includes(cidadeNormalizada) ||
    cidadeNormalizada.includes(normalizarNome(c.nome))
  );

  return cidadeEncontrada || { lat: -25.965277, lng: 32.589169 }; // Default para Maputo
};

// Novo: Componente de Dashboard com métricas avançadas
const DashboardMetrics = ({ cargas, stats }) => {
  const calculateMetrics = useMemo(() => {
    if (!cargas || cargas.length === 0) {
      return {
        emTransito: 0,
        emEntrega: 0,
        emFronteira: 0,
        mediaTempoTransito: '0',
        pesoTotal: '0',
        distanciaMedia: '0',
        cargasComGPS: 0,
        cargasComSensores: 0
      };
    }

    const emTransito = cargas.filter((c) => c.status === "em_transito").length;
    const emEntrega = cargas.filter((c) => c.status === "em_entrega").length;
    const emFronteira = cargas.filter(
      (c) => c.status === "em_fronteira"
    ).length;

    // Calcular média de tempo de trânsito
    const temposTransito = cargas
      .filter((c) => c.tempoTransitoHoras)
      .map((c) => c.tempoTransitoHoras);
    const mediaTempoTransito =
      temposTransito.length > 0
        ? (
            temposTransito.reduce((a, b) => a + b, 0) / temposTransito.length
          ).toFixed(1)
        : "0";

    // Calcular peso total em movimento
    const pesoTotal = cargas
      .filter((c) => c.pesoBruto)
      .reduce((total, c) => total + c.pesoBruto, 0);

    // Calcular distância média
    const distancias = cargas
      .filter((c) => c.distanciaKm)
      .map((c) => c.distanciaKm);
    const distanciaMedia =
      distancias.length > 0
        ? (distancias.reduce((a, b) => a + b, 0) / distancias.length).toFixed(0)
        : "0";

    return {
      emTransito,
      emEntrega,
      emFronteira,
      mediaTempoTransito,
      pesoTotal: (pesoTotal / 1000).toFixed(1),
      distanciaMedia,
      cargasComGPS: cargas.filter((c) => c.gps?.codigo).length,
      cargasComSensores: cargas.filter(
        (c) => c.sensoresIOT?.temperatura !== undefined
      ).length,
    };
  }, [cargas]);

  if (!calculateMetrics) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-100">Em Trânsito</p>
            <p className="text-2xl font-bold mt-2">
              {calculateMetrics.emTransito}
            </p>
          </div>
          <div className="bg-blue-400/20 p-3 rounded-full">
            <span className="text-2xl">🚚</span>
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-blue-200">
            {calculateMetrics.pesoTotal} ton em movimento
          </span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-green-100">Em Entrega</p>
            <p className="text-2xl font-bold mt-2">
              {calculateMetrics.emEntrega}
            </p>
          </div>
          <div className="bg-green-400/20 p-3 rounded-full">
            <span className="text-2xl">📦</span>
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-green-200">
            {calculateMetrics.distanciaMedia} km média
          </span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-purple-100">Tempo Médio</p>
            <p className="text-2xl font-bold mt-2">
              {calculateMetrics.mediaTempoTransito}h
            </p>
          </div>
          <div className="bg-purple-400/20 p-3 rounded-full">
            <span className="text-2xl">⏱️</span>
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-purple-200">Por carga</span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-cyan-100">Monitoradas</p>
            <p className="text-2xl font-bold mt-2">
              {calculateMetrics.cargasComGPS}
            </p>
          </div>
          <div className="bg-cyan-400/20 p-3 rounded-full">
            <span className="text-2xl">📡</span>
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-cyan-200">
            {calculateMetrics.cargasComSensores} com sensores
          </span>
        </div>
      </div>
    </div>
  );
};

// Componente de gráficos
const AnalyticsCharts = ({ cargas }) => {
  const chartData = useMemo(() => {
    if (!cargas || cargas.length === 0) return { statusData: [], timeData: [] };

    // Dados para gráfico de status
    const statusData = [
      { name: 'Em Trânsito', value: cargas.filter(c => c.status === 'em_transito').length },
      { name: 'Em Entrega', value: cargas.filter(c => c.status === 'em_entrega').length },
      { name: 'Em Fronteira', value: cargas.filter(c => c.status === 'em_fronteira').length }
    ].filter(item => item.value > 0); // FILTRA apenas categorias com valores

    // Dados para gráfico de tempo
    const timeRanges = ['0-4h', '4-8h', '8-12h', '12h+'];
    const timeData = timeRanges.map(range => ({
      range,
      count: cargas.filter(c => {
        const hours = c.tempoTransitoHoras || 0;
        if (range === '0-4h') return hours <= 4;
        if (range === '4-8h') return hours > 4 && hours <= 8;
        if (range === '8-12h') return hours > 8 && hours <= 12;
        return hours > 12;
      }).length
    }));

    return { statusData, timeData };
  }, [cargas]);

  // ADICIONE esta verificação adicional
  if (!chartData.statusData || chartData.statusData.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Distribuição por Status</h4>
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500">Sem dados para exibir</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Tempo em Trânsito</h4>
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500">Sem dados para exibir</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Gráfico de Pizza */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Distribuição por Status</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData.statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={Object.values(CHART_COLORS)[index % 6]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de Barras */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Tempo em Trânsito</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData.timeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill={CHART_COLORS.primary} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Novo: Componente de informações detalhadas da carga
const CargaDetailPanel = ({ carga, onClose }) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [ocorrencias, setOcorrencias] = useState([]);
  const [sensoresData, setSensoresData] = useState([]);

  useEffect(() => {
    if (carga) {
      // Carregar ocorrências
      if (carga.ocorrencias) {
        setOcorrencias(carga.ocorrencias);
      }

      // Preparar dados de sensores
      if (carga.sensoresIOT) {
        const sensores = [];
        if (carga.sensoresIOT.temperatura !== undefined) {
          sensores.push({
            tipo: "Temperatura",
            valor: `${carga.sensoresIOT.temperatura}°C`,
            status: carga.sensoresIOT.temperatura > 30 ? "alto" : "normal",
            icon: "🌡️",
          });
        }
        if (carga.sensoresIOT.umidade !== undefined) {
          sensores.push({
            tipo: "Umidade",
            valor: `${carga.sensoresIOT.umidade}%`,
            status: carga.sensoresIOT.umidade > 80 ? "alto" : "normal",
            icon: "💧",
          });
        }
        setSensoresData(sensores);
      }
    }
  }, [carga]);

  if (!carga) return null;

  const calculateProgress = () => {
    if (!carga.distanciaKm || !carga.rotaRealizada) return 65;
    // Simulação de progresso
    return Math.min(95, Math.random() * 100);
  };

  const getCargaValue = () => {
    const value = carga.valorMercadoria || carga.valorTotal || 0;
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "MZN",
    }).format(value);
  };

  const progress = calculateProgress();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 text-white p-3 rounded-lg">🚛</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {carga.codigo}
              </h3>
              <p className="text-gray-600">{carga.descricao}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Header Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Valor da Carga</div>
              <div className="text-xl font-bold text-gray-900">
                {getCargaValue()}
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Progresso</div>
              <div className="flex items-center">
                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="font-bold">{Math.round(progress)}%</span>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Prioridade</div>
              <div className="text-xl font-bold text-gray-900 capitalize">
                {carga.prioridade || "Média"}
              </div>
            </div>
          </div>

          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Informações da Carga
              </h4>
              <div className="space-y-2">
                <InfoRow label="Tipo" value={carga.tipoCarga} />
                <InfoRow
                  label="Peso Bruto"
                  value={`${(carga.pesoBruto / 1000).toFixed(1)} ton`}
                />
                <InfoRow label="Natureza" value={carga.naturezaCarga} />
                <InfoRow label="Cliente" value={carga.cliente} />
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Informações da Viagem
              </h4>
              <div className="space-y-2">
                <InfoRow label="Origem" value={carga.origem?.cidade} />
                <InfoRow label="Destino" value={carga.destino?.cidade} />
                <InfoRow label="Motorista" value={carga.motorista?.nome} />
                <InfoRow label="Veículo" value={carga.veiculo?.matricula} />
              </div>
            </div>
          </div>

          {/* Sensores IOT */}
          {sensoresData.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Monitoramento IOT
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sensoresData.map((sensor, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      sensor.status === "alto"
                        ? "bg-red-50 border border-red-200"
                        : "bg-blue-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-2">{sensor.icon}</span>
                      <div>
                        <div className="text-sm text-gray-600">
                          {sensor.tipo}
                        </div>
                        <div className="font-bold">{sensor.valor}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ocorrências */}
          {ocorrencias.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Ocorrências ({ocorrencias.length})
              </h4>
              <div className="space-y-2">
                {ocorrencias.slice(0, 3).map((ocorrencia, index) => (
                  <div
                    key={index}
                    className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">
                        {ocorrencia.tipo}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          ocorrencia.severidade === "alta"
                            ? "bg-red-500 text-white"
                            : ocorrencia.severidade === "média"
                            ? "bg-yellow-500 text-white"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {ocorrencia.severidade}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {ocorrencia.descricao}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documentos */}
          {carga.documentos && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Documentos</h4>
              <div className="flex flex-wrap gap-2">
                {carga.documentos.conhecimentoEmbarque && (
                  <DocumentButton
                    label="Conhecimento"
                    url={carga.documentos.conhecimentoEmbarque}
                  />
                )}
                {carga.documentos.invoice && (
                  <DocumentButton
                    label="Invoice"
                    url={carga.documentos.invoice}
                  />
                )}
                {carga.documentos.packingList && (
                  <DocumentButton
                    label="Packing List"
                    url={carga.documentos.packingList}
                  />
                )}
              </div>
            </div>
          )}

          {/* Botões de Ação */}
          <div className="flex space-x-3 pt-4 border-t border-gray-200">
            <button className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium">
              📞 Contactar Motorista
            </button>
            <button className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 font-medium">
              📍 Atualizar Posição
            </button>
            <button className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 font-medium">
              📋 Relatório
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componentes auxiliares
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-gray-600">{label}:</span>
    <span className="font-medium text-gray-900">{value || "N/A"}</span>
  </div>
);

const DocumentButton = ({ label, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm flex items-center"
  >
    📄 {label}
  </a>
);

// Componente de debug atualizado
const ApiKeyDebug = () => {
  const [showKey, setShowKey] = useState(false);
  const [apiStatus, setApiStatus] = useState('verificando...');
  const [apisEnabled, setApisEnabled] = useState([]);

  useEffect(() => {
    const checkApiStatus = () => {
      const apiKey = CONFIG.GOOGLE_MAPS_API_KEY;
      
      // Verificar se é a chave fornecida
      if (apiKey === "AIzaSyB5Y1PUBVawvwuSUZEipJVLrEX9lV6Yn_0") {
        setApiStatus('✅ API Key configurada');
        
        // Lista de APIs que precisam estar ativadas
        const requiredApis = [
          'Maps JavaScript API',
          'Geocoding API',
          'Places API'
        ];
        
        setApisEnabled(requiredApis);
      } else if (!apiKey) {
        setApiStatus('❌ API Key não configurada');
      } else if (apiKey === "SUA_API_KEY_AQUI") {
        setApiStatus('⚠️ Configure sua API Key');
      } else {
        setApiStatus('✅ API Key personalizada');
      }
    };
    
    checkApiStatus();
  }, []);

  const handleOpenConsole = () => {
    window.open("https://console.cloud.google.com/apis/library", "_blank");
  };

  const handleOpenCredentials = () => {
    window.open("https://console.cloud.google.com/apis/credentials", "_blank");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-lg max-w-xs">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-blue-800 flex items-center">
          <span className="mr-2">🗺️</span>
          Google Maps API
        </span>
        <button
          onClick={() => setShowKey(!showKey)}
          className="text-blue-600 hover:text-blue-800"
          title={showKey ? "Ocultar chave" : "Mostrar chave"}
        >
          {showKey ? "🔒" : "🔓"}
        </button>
      </div>
      
      <div className="text-xs">
        <div className="mb-2">
          <span className="text-blue-700">Status: </span>
          <span className={`font-semibold ${
            apiStatus.includes('✅') ? 'text-green-600' : 
            apiStatus.includes('❌') ? 'text-red-600' : 'text-yellow-600'
          }`}>
            {apiStatus}
          </span>
        </div>
        
        {showKey && (
          <div className="mb-3">
            <p className="text-blue-700 mb-1">Chave API:</p>
            <div className="bg-blue-100 p-2 rounded break-all text-xs font-mono">
              {CONFIG.GOOGLE_MAPS_API_KEY}
            </div>
            <p className="text-blue-600 text-xs mt-1">
              Chave válida para: localhost e domínios configurados
            </p>
          </div>
        )}
        
        <div className="space-y-2">
          <button
            onClick={handleOpenConsole}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded text-sm flex items-center justify-center"
          >
            <span className="mr-2">🔧</span>
            Ver APIs no Console
          </button>
          
          <button
            onClick={handleOpenCredentials}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-3 rounded text-sm flex items-center justify-center"
          >
            <span className="mr-2">🔑</span>
            Ver Credenciais
          </button>
        </div>
        
        {/* Dicas de solução de problemas */}
        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-100 rounded">
          <p className="text-xs font-medium text-yellow-800 mb-1">
            Se ainda houver erro:
          </p>
          <ol className="text-xs text-yellow-700 list-decimal list-inside space-y-1">
            <li>Ative "Maps JavaScript API"</li>
            <li>Verifique restrições de domínio</li>
            <li>Adicione localhost às URLs permitidas</li>
            <li>Espere alguns minutos após ativar</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

// Utilitários para o mapa
class GpsUtils {
  static determinarStatus(velocidade, satelites = "0") {
    const numSatelites = parseInt(satelites) || 0;

    if (numSatelites === 0) return "sem_sinal";
    if (velocidade > 0) return "movimento";
    return "parado";
  }

  static getStatusConfig(status) {
    const configs = {
      movimento: {
        bg: "bg-green-500/20",
        text: "text-green-400",
        border: "border-green-500/30",
        cor: "#10b981",
        texto: "🟢 Em Movimento",
        icon: "🟢",
      },
      parado: {
        bg: "bg-yellow-500/20",
        text: "text-yellow-400",
        border: "border-yellow-500/30",
        cor: "#f59e0b",
        texto: "🟡 Parado",
        icon: "🟡",
      },
      sem_sinal: {
        bg: "bg-red-500/20",
        text: "text-red-400",
        border: "border-red-500/30",
        cor: "#ef4444",
        texto: "🔴 Sem Sinal",
        icon: "🔴",
      },
      atraso_critico: {
        bg: "bg-red-500/20",
        text: "text-red-400",
        border: "border-red-500/30",
        cor: "#ef4444",
        texto: "🚨 Atraso Crítico",
        icon: "🚨",
      },
      atrasado: {
        bg: "bg-orange-500/20",
        text: "text-orange-400",
        border: "border-orange-500/30",
        cor: "#f97316",
        texto: "🟠 Atrasado",
        icon: "🟠",
      },
      no_prazo: {
        bg: "bg-green-500/20",
        text: "text-green-400",
        border: "border-green-500/30",
        cor: "#10b981",
        texto: "🟢 No Prazo",
        icon: "🟢",
      },
    };

    return configs[status] || configs.outro;
  }

  static getDefaultIcon(status) {
    const icons = {
      movimento: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
      parado: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
      sem_sinal: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      atraso_critico: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      atrasado: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
      no_prazo: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
    };
    return (
      icons[status] || "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    );
  }
}

// Componente de Mapa Fallback (quando Google Maps não está disponível)
const MapaFallback = ({ cargas, selectedCarga, setSelectedCarga }) => {
  const [mapaErro, setMapaErro] = useState(false);

  // Função para criar pattern SVG correto
  const createGridPattern = () => {
    return `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%23333444' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`;
  };

  // Simular posições baseadas nos dados
  const pontos = useMemo(() => {
    if (!cargas || cargas.length === 0) return [];

    return cargas.map((carga, index) => {
      // Posições simuladas para demonstração (baseadas em Moçambique)
      const positions = [
        { top: "30%", left: "40%", label: "Maputo", cor: "#3b82f6" },
        { top: "50%", left: "60%", label: "Beira", cor: "#10b981" },
        { top: "40%", left: "70%", label: "Chimoio", cor: "#8b5cf6" },
        { top: "20%", left: "50%", label: "Nampula", cor: "#f59e0b" },
        { top: "60%", left: "30%", label: "Xai-Xai", cor: "#ef4444" },
        { top: "70%", left: "50%", label: "Inhambane", cor: "#06b6d4" },
        { top: "35%", left: "80%", label: "Tete", cor: "#84cc16" },
        { top: "65%", left: "20%", label: "Matola", cor: "#f97316" },
      ];

      const pos = positions[index % positions.length] || positions[0];
      const status =
        carga.status === "em_transito"
          ? "movimento"
          : carga.status === "em_entrega"
          ? "movimento"
          : "parado";
      const statusConfig = GpsUtils.getStatusConfig(status);

      return {
        id: carga.codigo,
        top: pos.top,
        left: pos.left,
        label: pos.label,
        cor: pos.cor,
        carga: carga,
        statusConfig: statusConfig,
      };
    });
  }, [cargas]);

  return (
    <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg h-[500px] border-2 border-gray-700 overflow-hidden">
      {/* Background do mapa simulado */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-green-900/30">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: createGridPattern(),
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Cidades principais marcadas */}
      <div className="absolute top-[30%] left-[40%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-blue-600/70 text-white px-3 py-1 rounded-lg text-sm border border-blue-400 backdrop-blur-sm">
          🏙️ Maputo
        </div>
      </div>

      <div className="absolute top-[50%] left-[60%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-green-600/70 text-white px-3 py-1 rounded-lg text-sm border border-green-400 backdrop-blur-sm">
          🏙️ Beira
        </div>
      </div>

      <div className="absolute top-[40%] left-[70%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-purple-600/70 text-white px-3 py-1 rounded-lg text-sm border border-purple-400 backdrop-blur-sm">
          🏙️ Chimoio
        </div>
      </div>

      <div className="absolute top-[20%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-yellow-600/70 text-white px-3 py-1 rounded-lg text-sm border border-yellow-400 backdrop-blur-sm">
          🏙️ Nampula
        </div>
      </div>

      {/* Estradas/rotas simuladas */}
      <div className="absolute top-[30%] left-[40%] w-48 h-32">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-yellow-500/30 animate-pulse"></div>
        <div
          className="absolute top-0 left-0 w-0.5 h-full bg-yellow-500/30 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="absolute top-[50%] left-[60%] w-32 h-24">
        <div
          className="absolute top-0 left-0 w-full h-0.5 bg-blue-500/30 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Marcadores das cargas */}
      {pontos.map((ponto) => (
        <div
          key={ponto.id}
          className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 z-10"
          style={{ top: ponto.top, left: ponto.left }}
          onClick={() => setSelectedCarga(ponto.carga)}
        >
          <div
            className={`${ponto.statusConfig.bg} ${ponto.statusConfig.border} text-white p-2 rounded-lg shadow-lg flex items-center space-x-1 backdrop-blur-sm min-w-[120px]`}
            style={{
              backgroundColor: `${ponto.cor}30`,
              borderColor: ponto.cor,
            }}
          >
            <span className={ponto.statusConfig.text}>
              {ponto.statusConfig.icon}
            </span>
            <span className="text-sm font-medium">{ponto.carga.codigo}</span>
          </div>

          {/* Linha de conexão para a cidade */}
          <div
            className="absolute top-full left-1/2 w-0.5 h-8 -translate-x-1/2"
            style={{
              background: `linear-gradient(to bottom, ${ponto.cor}, transparent)`,
            }}
          ></div>
        </div>
      ))}

      {/* Legenda */}
      <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 border border-gray-600 z-20">
        <div className="text-xs text-gray-400 mb-2">Legenda:</div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-1 animate-pulse"></div>
            <span className="text-xs text-white">Em Movimento</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
            <span className="text-xs text-white">Parado</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
            <span className="text-xs text-white">Cidade</span>
          </div>
        </div>
      </div>

      {/* Contador de cargas */}
      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 border border-gray-600 z-20">
        <div className="flex items-center">
          <span className="text-blue-400 mr-2">🚛</span>
          <div>
            <div className="text-sm font-medium text-white">
              {cargas.length} Cargas
            </div>
            <div className="text-xs text-gray-300">
              {cargas.filter((c) => c.status === "em_transito").length} em
              movimento
            </div>
          </div>
        </div>
      </div>

      {/* Mensagem informativa */}
      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 border border-gray-600 z-20 max-w-xs">
        <div className="flex items-center text-yellow-400">
          <span className="mr-2">🗺️</span>
          <span className="text-sm font-medium">Mapa Simulado</span>
        </div>
        <p className="text-xs text-gray-300 mt-1">
          Google Maps não está disponível. Verifique:
        </p>
        <ol className="text-xs text-gray-300 mt-1 list-decimal list-inside">
          <li>API Key configurada no .env</li>
          <li>APIs ativadas no Google Cloud Console</li>
          <li>Restrições de aplicativo corretas</li>
        </ol>
      </div>

      {/* Tooltip da carga selecionada */}
      {selectedCarga && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white p-4 rounded-lg max-w-xs border border-gray-600 shadow-xl z-30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full mr-3 animate-pulse bg-green-500"></div>
              <h3 className="font-bold text-lg text-white">
                {selectedCarga.codigo}
              </h3>
            </div>
            <button
              onClick={() => setSelectedCarga(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Veículo:</span>
              <span className="font-medium text-white">
                {selectedCarga.veiculo?.matricula || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Status:</span>
              <span
                className={`font-medium ${
                  selectedCarga.status === "em_transito"
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {selectedCarga.status === "em_transito"
                  ? "Em Movimento"
                  : selectedCarga.status === "em_entrega"
                  ? "Em Entrega"
                  : selectedCarga.status}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Motorista:</span>
              <span className="text-white">
                {selectedCarga.motorista?.nome || "Não definido"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Rota:</span>
              <span className="text-blue-400">
                {selectedCarga.origem?.cidade || "Origem"} →{" "}
                {selectedCarga.destino?.cidade || "Destino"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Cliente:</span>
              <span className="text-white">
                {selectedCarga.cliente || "N/A"}
              </span>
            </div>
            {selectedCarga.pontoAtual?.descricao && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Posição:</span>
                <span className="text-green-300">
                  {selectedCarga.pontoAtual.descricao}
                </span>
              </div>
            )}
          </div>

          <div className="flex space-x-2 mt-4">
            <button
              className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
              onClick={() => {
                // Simular abertura no Google Maps
                const origem = selectedCarga.origem?.cidade || "Maputo";
                const destino = selectedCarga.destino?.cidade || "Nampula";
                alert(
                  `Rota: ${origem} → ${destino}\n\nEsta funcionalidade requer a API do Google Maps.`
                );
              }}
            >
              <span className="mr-2">📍</span>
              Ver Rota
            </button>
            <button
              className="flex-1 bg-gray-700 text-white py-2 px-3 rounded text-sm hover:bg-gray-600 transition-colors flex items-center justify-center"
              onClick={() => {
                // Fechar tooltip
                setSelectedCarga(null);
              }}
            >
              <span className="mr-2">✕</span>
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Efeitos visuais */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Partículas flutuantes */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}

        {/* Raios de conexão entre cidades */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient
              id="route-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Rotas principais */}
          <path
            d="M40% 30% L60% 50%"
            fill="none"
            stroke="url(#route-gradient)"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <path
            d="M40% 30% L70% 40%"
            fill="none"
            stroke="url(#route-gradient)"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <path
            d="M60% 50% L50% 20%"
            fill="none"
            stroke="url(#route-gradient)"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
        </svg>
      </div>
    </div>
  );
};

// Componente do Mapa Google Maps ATUALIZADO
const MapaCargasEmCurso = ({ cargas, selectedCarga, setSelectedCarga }) => {
  const [map, setMap] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [loadScriptError, setLoadScriptError] = useState(null);

  // Verificar se a API Key está configurada
  const isGoogleMapsAvailable = useMemo(() => {
    const apiKey = CONFIG.GOOGLE_MAPS_API_KEY;
    
    // Verificação detalhada da API Key
    if (!apiKey) {
      console.error("❌ API Key não definida em CONFIG");
      return false;
    }
    
    if (apiKey === "SUA_API_KEY_AQUI") {
      console.error("❌ API Key ainda é o placeholder padrão");
      return false;
    }
    
    if (apiKey.length < 39) {
      console.warn("⚠️ API Key parece muito curta");
    }
    
    console.log(`✅ API Key detectada: ${apiKey.substring(0, 15)}...`);
    return true;
  }, []);

  // Manipulador de erro do LoadScript
  const handleLoadScriptError = useCallback((error) => {
    console.error("❌ Erro ao carregar Google Maps Script:", error);
    setLoadScriptError(error);
    setMapError(true);
    
    // Diagnosticar o erro
    if (error.message && error.message.includes("InvalidKeyMapError")) {
      console.error("🔑 Problema com a API Key");
    } else if (error.message && error.message.includes("RefererNotAllowed")) {
      console.error("🌐 Domínio não autorizado na API Key");
    }
  }, []);

  // Se não houver API Key disponível, mostrar mapa fallback imediatamente
  if (!isGoogleMapsAvailable) {
    return (
      <div className="relative">
        <MapaFallback
          cargas={cargas}
          selectedCarga={selectedCarga}
          setSelectedCarga={setSelectedCarga}
        />
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
            API Key não configurada
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <LoadScript
        googleMapsApiKey={CONFIG.GOOGLE_MAPS_API_KEY}
        loadingElement={
          <div className="bg-gradient-to-br from-blue-50 to-gray-100 rounded-lg h-[500px] flex items-center justify-center border border-gray-200">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-700 font-medium">Carregando Google Maps...</p>
              <p className="text-gray-500 text-sm mt-2">
                API Key: {CONFIG.GOOGLE_MAPS_API_KEY.substring(0, 10)}...
              </p>
            </div>
          </div>
        }
        onError={handleLoadScriptError}
        onLoad={() => {
          console.log("✅ Google Maps Script carregado com sucesso!");
          setIsLoaded(true);
        }}
      >
        {/* Resto do código do mapa permanece igual... */}
        <div className="relative">
          {/* Controles e legenda */}
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-gray-600">
              <div className="text-xs text-gray-300 mb-2">Legenda:</div>
              <div className="space-y-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs text-white">Em Movimento</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                  <span className="text-xs text-white">Origem</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                  <span className="text-xs text-white">Destino</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={() => {
                if (map) {
                  map.setCenter(CONFIG.MAP.defaultCenter);
                  map.setZoom(CONFIG.MAP.defaultZoom);
                }
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-lg flex items-center text-sm font-medium"
              title="Centralizar mapa em Maputo"
            >
              <span className="mr-2">📍</span>
              Centralizar
            </button>
          </div>

          <GoogleMap
            mapContainerStyle={CONFIG.MAP.containerStyle}
            center={CONFIG.MAP.defaultCenter}
            zoom={CONFIG.MAP.defaultZoom}
            onLoad={(mapInstance) => {
              console.log("✅ Google Maps instanciado");
              setMap(mapInstance);
            }}
            onUnmount={() => setMap(null)}
            options={{
              mapTypeControl: true,
              streetViewControl: true,
              fullscreenControl: true,
              zoomControl: true,
              styles: [
                {
                  featureType: "poi.business",
                  stylers: [{ visibility: "off" }]
                }
              ],
            }}
          >
            {/* Aqui vão os marcadores e polylines */}
            {isLoaded && cargas.length > 0 && (
              <>
                {/* Marcadores de origem */}
                {cargas.map((carga) => {
                  if (carga.origem?.coordenadas) {
                    return (
                      <Marker
                        key={`${carga.codigo}-origem`}
                        position={{
                          lat: carga.origem.coordenadas.lat,
                          lng: carga.origem.coordenadas.lng
                        }}
                        icon={{
                          url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                          scaledSize: new window.google.maps.Size(40, 40)
                        }}
                        title={`Origem: ${carga.origem.cidade}`}
                      />
                    );
                  }
                  return null;
                })}

                {/* Marcadores de destino */}
                {cargas.map((carga) => {
                  if (carga.destino?.coordenadas) {
                    return (
                      <Marker
                        key={`${carga.codigo}-destino`}
                        position={{
                          lat: carga.destino.coordenadas.lat,
                          lng: carga.destino.coordenadas.lng
                        }}
                        icon={{
                          url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                          scaledSize: new window.google.maps.Size(40, 40)
                        }}
                        title={`Destino: ${carga.destino.cidade}`}
                      />
                    );
                  }
                  return null;
                })}

                {/* Marcadores das cargas em movimento */}
                {cargas.map((carga) => {
                  const ponto = carga.pontoAtual;
                  if (ponto?.lat && ponto?.lng) {
                    const status = carga.status === "em_transito" ? "movimento" : "parado";
                    return (
                      <Marker
                        key={carga.codigo}
                        position={{ lat: ponto.lat, lng: ponto.lng }}
                        onClick={() => setSelectedCarga(carga)}
                        icon={{
                          url: GpsUtils.getDefaultIcon(status),
                          scaledSize: new window.google.maps.Size(32, 32)
                        }}
                        title={`${carga.codigo} - ${carga.descricao}`}
                      />
                    );
                  }
                  return null;
                })}

                {/* Desenhar rotas entre origem e destino */}
                {cargas.map((carga) => {
                  if (carga.origem?.coordenadas && carga.destino?.coordenadas) {
                    const path = [
                      { lat: carga.origem.coordenadas.lat, lng: carga.origem.coordenadas.lng },
                      { lat: carga.destino.coordenadas.lat, lng: carga.destino.coordenadas.lng }
                    ];

                    return (
                      <Polyline
                        key={`rota-${carga.codigo}`}
                        path={path}
                        options={{
                          strokeColor: "#3b82f6",
                          strokeOpacity: 0.6,
                          strokeWeight: 2,
                          geodesic: true,
                          icons: [
                            {
                              icon: {
                                path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                              },
                              offset: '50%',
                              repeat: '100px'
                            }
                          ],
                        }}
                      />
                    );
                  }
                  return null;
                })}
              </>
            )}
          </GoogleMap>
        </div>
      </LoadScript>

      {/* Mensagem de erro detalhada */}
      {loadScriptError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-red-600 mr-2 text-xl">❌</span>
            <h4 className="font-semibold text-red-700">Erro ao carregar Google Maps</h4>
          </div>
          <div className="mt-2 text-sm text-red-600">
            <p><strong>Detalhes:</strong> {loadScriptError.message || "Erro desconhecido"}</p>
            
            <div className="mt-3">
              <p className="font-medium">Possíveis soluções:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Verifique se a API Key está ativa no Google Cloud Console</li>
                <li>Ative a "Maps JavaScript API"</li>
                <li>Adicione localhost às restrições de HTTP referrers</li>
                <li>Espere alguns minutos após ativar a API</li>
                <li>Verifique se há cobranças habilitadas (requer cartão de crédito)</li>
              </ul>
            </div>

            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => window.open("https://console.cloud.google.com/google/maps-apis/credentials", "_blank")}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Verificar API Key
              </button>
              <button
                onClick={() => window.open("https://console.cloud.google.com/apis/library/maps-backend.googleapis.com", "_blank")}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Ativar Maps API
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
// Novo: Componente de timeline da carga
const CargaTimeline = ({ carga }) => {
  if (!carga?.checkpointHistorico) return null;

  const timelineEvents = carga.checkpointHistorico.map((checkpoint) => ({
    date: new Date(checkpoint.data),
    title: checkpoint.status,
    description: checkpoint.observacao,
    location: checkpoint.local,
  }));

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h4 className="font-semibold text-gray-900 mb-4">Histórico da Carga</h4>
      <div className="space-y-4">
        {timelineEvents.map((event, index) => (
          <div key={index} className="flex">
            <div className="flex flex-col items-center mr-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              {index < timelineEvents.length - 1 && (
                <div className="flex-1 w-0.5 bg-gray-300 my-1"></div>
              )}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">{event.title}</span>
                <span className="text-sm text-gray-500">
                  {event.date.toLocaleDateString("pt-PT")}{" "}
                  {event.date.toLocaleTimeString("pt-PT", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
              {event.location && (
                <p className="text-xs text-gray-500 mt-1">
                  📍 {event.location}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Novo: Componente de comunicação
const CommunicationPanel = ({ carga, onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && carga?.motorista?.telefone) {
      onSendMessage({
        to: carga.motorista.telefone,
        message: message,
        carga: carga.codigo,
      });
      setMessage("");
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h4 className="font-semibold text-gray-900 mb-4">
        Comunicação com Motorista
      </h4>
      {carga?.motorista ? (
        <>
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <div className="bg-blue-500 text-white p-2 rounded-full mr-3">
                👨‍✈️
              </div>
              <div>
                <div className="font-medium">{carga.motorista.nome}</div>
                <div className="text-sm text-gray-600">
                  {carga.motorista.telefone}
                </div>
              </div>
            </div>
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
            rows={3}
          />

          <div className="flex space-x-2">
            <button
              onClick={handleSend}
              className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              📤 Enviar Mensagem
            </button>
            <a
              href={`tel:${carga.motorista.telefone}`}
              className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 flex items-center justify-center"
            >
              📞 Ligar Agora
            </a>
          </div>
        </>
      ) : (
        <p className="text-gray-600">Nenhum motorista associado</p>
      )}
    </div>
  );
};

// Componente principal atualizado com mapa
const CargaEmCurso = () => {
  const [activeCursoForm, setActiveCursoForm] = useState("monitoramento");
  const [cargas, setCargas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [selectedCarga, setSelectedCarga] = useState(null);
  const [alertas, setAlertas] = useState([]);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [selectedCargaDetail, setSelectedCargaDetail] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [realTimeUpdates, setRealTimeUpdates] = useState([]);
  const [trackingData, setTrackingData] = useState({
    cargaId: "",
    lat: "",
    lng: "",
    descricao: "",
    velocidade: "",
    direcao: "",
  });
  const [apiError, setApiError] = useState(false);
  // Estados para filtros
  const [filters, setFilters] = useState({
    curPage: 1,
    pageSize: 10,
    status: "em_transito",
    codigo: "",
    cliente: "",
    tipoPercurso: "",
  });

  useEffect(() => {
    fetchCargasEmCurso();
    fetchStats();
    fetchAlertas();
  }, [filters.curPage, filters.status]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchRealTimeUpdates();
    }, 30000); // Atualizar a cada 30 segundos

    return () => clearInterval(interval);
  }, [cargas]);

  const fetchRealTimeUpdates = async () => {
    try {
      // Simular atualizações em tempo real
      if (cargas.length > 0) {
        const updates = cargas.map((carga) => ({
          cargaCodigo: carga.codigo,
          update: `Posição atualizada: ${carga.pontoAtual?.descricao || "N/A"}`,
          time: new Date().toLocaleTimeString("pt-PT"),
        }));
        setRealTimeUpdates(updates.slice(0, 5));
        setNotificationCount(updates.length);
      }
    } catch (error) {
      console.error("Erro ao buscar atualizações:", error);
    }
  };

  const handleCargaClick = (carga) => {
    setSelectedCarga(carga);
    setSelectedCargaDetail(carga);
    setShowDetailPanel(true);
  };

  const handleSendMessage = async (messageData) => {
    try {
      // Implementar envio de mensagem
      console.log("Enviando mensagem:", messageData);
      alert(`Mensagem enviada para ${messageData.to}`);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  const fetchCargasEmCurso = async () => {
    try {
      setLoading(true);
      setApiError(false);

      const filterData = {
        curPage: filters.curPage,
        pageSize: filters.pageSize,
        status: filters.status || undefined,
        cliente: filters.cliente || undefined,
        codigo: filters.codigo || undefined,
        tipoPercurso: filters.tipoPercurso || undefined,
      };

      console.log("Tentando acessar API em:", `${API_BASE_URL}/getCargaList`);
      
      // Tente a API primeiro
      try {
        const response = await axios.post(
          `${API_BASE_URL}/getCargaList`,
          filterData,
          {
            timeout: 10000, // 10 segundos timeout
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        );

        console.log("Resposta da API:", response.status, response.data);

        if (response.data.returnCode === 200) {
          // Filtrar cargas em trânsito ou em entrega
          const cargasEmCurso = response.data.data.list.filter((carga) =>
            ["em_transito", "em_entrega", "em_fronteira"].includes(carga.status)
          );
          setCargas(cargasEmCurso);
        } else {
          throw new Error(`API retornou código: ${response.data.returnCode}`);
        }
      } catch (apiError) {
        console.warn("API não disponível, usando dados mockados:", apiError.message);
        setApiError(true);
        // Usar dados mockados como fallback
        setCargas(getMockCargas());
      }

    } catch (error) {
      console.error("Erro ao buscar cargas em curso:", error);
      setApiError(true);
      setCargas(getMockCargas());
    } finally {
      setLoading(false);
    }
  };

  // NOVO: Adicione um banner de alerta quando a API estiver offline
  const ApiStatusBanner = () => {
    if (!apiError) return null;
    
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              API Offline - Modo de Demonstração
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                A conexão com a API não está disponível no momento. 
                Estamos exibindo dados de demonstração.
              </p>
              <p className="mt-1">
                URL da API: <code className="bg-yellow-100 px-1 rounded">{API_BASE_URL}</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };


  const fetchStats = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/getCargaStats`, {
        dataInicio: new Date(Date.now() - 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        dataFim: new Date().toISOString().split("T")[0],
      });

      if (response.data.returnCode === 200) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
      setStats(getMockStats());
    }
  };

  const fetchAlertas = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/getCargaList`, {
        curPage: 1,
        pageSize: 100,
        status: "em_transito",
      });

      if (response.data.returnCode === 200) {
        // Analisar cargas para identificar alertas
        const alertasDetectados = [];

        response.data.data.list.forEach((carga) => {
          // Verificar se há ocorrências
          if (carga.ocorrencias && carga.ocorrencias.length > 0) {
            carga.ocorrencias.forEach((ocorrencia) => {
              if (ocorrencia.status !== "resolvido") {
                alertasDetectados.push({
                  tipo: ocorrencia.tipo,
                  nivel: ocorrencia.severidade || "medio",
                  descricao: ocorrencia.descricao,
                  cargaCodigo: carga.codigo,
                  data: ocorrencia.dataRegistro,
                  status: ocorrencia.status,
                });
              }
            });
          }

          // Verificar atrasos
          if (carga.dataEntregaPrevista) {
            const entregaPrevista = new Date(carga.dataEntregaPrevista);
            const agora = new Date();
            const horasAtraso = (agora - entregaPrevista) / (1000 * 60 * 60);

            if (horasAtraso > 2 && carga.status !== "entregue") {
              alertasDetectados.push({
                tipo: "atraso",
                nivel: horasAtraso > 6 ? "critico" : "alto",
                descricao: `Atraso de ${Math.round(horasAtraso)} horas`,
                cargaCodigo: carga.codigo,
                data: agora,
                status: "pendente",
              });
            }
          }

          // Verificar sensores IOT
          if (carga.sensoresIOT) {
            const sensores = carga.sensoresIOT;

            if (sensores.aberturaPorta && carga.status === "em_transito") {
              alertasDetectados.push({
                tipo: "seguranca",
                nivel: "alto",
                descricao: "Porta do contentor aberta durante trânsito",
                cargaCodigo: carga.codigo,
                data: new Date(),
                status: "pendente",
              });
            }

            if (sensores.movimentoBruscoDetectado) {
              alertasDetectados.push({
                tipo: "movimento",
                nivel: "medio",
                descricao: "Movimento brusco detectado",
                cargaCodigo: carga.codigo,
                data: new Date(),
                status: "pendente",
              });
            }
          }
        });

        setAlertas(alertasDetectados);
      }
    } catch (error) {
      console.error("Erro ao buscar alertas:", error);
      setAlertas(getMockAlertas());
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
        pontoAtual: { lat: -25.9689, lng: 32.5695, descricao: "EN1 - Xai-Xai" },
        distanciaKm: 1200,
        rotaRealizada: [
          { lat: -25.9692, lng: 32.5732, data: "2024-01-15T10:00:00Z" },
        ],
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
        pontoAtual: { lat: -19.8339, lng: 34.8387, descricao: "EN6 - Inchope" },
        distanciaKm: 200,
      },
      {
        codigo: "CARGA-005",
        status: "em_transito",
        dataColeta: "2024-01-16T10:00:00Z",
        dataEntregaPrevista: "2024-01-17T16:00:00Z",
        tipoCarga: "Frigorífica",
        descricao: "Produtos Alimentares 8 ton",
        pesoBruto: 8000,
        origem: { cidade: "Maputo", local: "Centro Distribuição" },
        destino: { cidade: "Matola", local: "Supermercado Central" },
        cliente: "Supermercados Moçambique",
        veiculo: { matricula: "MB-5678-CD", modelo: "Mercedes Actros" },
        motorista: { nome: "Carlos Beira", telefone: "+258 84 234 5678" },
        pontoAtual: { lat: -25.8912, lng: 32.6051, descricao: "EN4 - Matola" },
        distanciaKm: 20,
        gps: {
          codigo: "GPS-001",
          bateriaPercentual: 85,
          ultimaComunicacao: new Date().toISOString(),
        },
      },
    ];
  };

  const getMockStats = () => {
    return {
      totalCargas: 23,
      cargasEntregues: 12,
      cargasTransito: 8,
      cargasAtrasadas: 3,
      valorTotalFretes: 850000,
      pesoTotalTransportado: 180000,
      distanciaTotal: 1845,
    };
  };

  const getMockAlertas = () => {
    return [
      {
        tipo: "atraso",
        nivel: "critico",
        descricao: "ATRASO CRÍTICO - +4 horas",
        cargaCodigo: "CARGA-003",
        data: "2024-01-15T10:30:00Z",
        status: "pendente",
      },
      {
        tipo: "seguranca",
        nivel: "alto",
        descricao: "DESVIO DE ROTA NÃO AUTORIZADO",
        cargaCodigo: "CARGA-005",
        data: "2024-01-15T09:15:00Z",
        status: "pendente",
      },
    ];
  };

  const handleUpdateTracking = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/updateCargaTracking`, {
        codigoCarga: trackingData.cargaId,
        lat: trackingData.lat,
        lng: trackingData.lng,
        descricao: trackingData.descricao,
        velocidade: trackingData.velocidade,
        direcao: trackingData.direcao,
      });

      if (response.data.returnCode === 200) {
        alert("Tracking atualizado com sucesso!");
        setTrackingData({
          cargaId: "",
          lat: "",
          lng: "",
          descricao: "",
          velocidade: "",
          direcao: "",
        });
        fetchCargasEmCurso();
      }
    } catch (error) {
      console.error("Erro ao atualizar tracking:", error);
      alert("Erro ao atualizar tracking");
    }
  };

  const handleAddOcorrencia = async (cargaCodigo, ocorrenciaData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/addOcorrenciaCarga`, {
        codigo: cargaCodigo,
        ocorrenciaData: {
          tipo: ocorrenciaData.tipo,
          descricao: ocorrenciaData.descricao,
          severidade: ocorrenciaData.severidade || "medio",
        },
      });

      if (response.data.returnCode === 200) {
        alert("Ocorrência registrada com sucesso!");
        fetchAlertas();
      }
    } catch (error) {
      console.error("Erro ao adicionar ocorrência:", error);
      alert("Erro ao registrar ocorrência");
    }
  };

  const handleUpdateStatus = async (codigo, novoStatus) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/updateCargaStatus`, {
        codigo,
        status: novoStatus,
        observacao: "Status atualizado via interface",
        local: "Monitoramento em curso",
      });

      if (response.data.returnCode === 200) {
        alert("Status atualizado com sucesso!");
        fetchCargasEmCurso();
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Erro ao atualizar status");
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      em_transito: {
        color: "bg-green-500",
        text: "Em Movimento",
        label: "EM MOVIMENTO",
      },
      em_entrega: {
        color: "bg-purple-500",
        text: "Em Entrega",
        label: "EM ENTREGA",
      },
      em_fronteira: {
        color: "bg-yellow-500",
        text: "Em Fronteira",
        label: "EM FRONTEIRA",
      },
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

  const calculateDeliveryStatus = (carga) => {
    if (!carga.dataEntregaPrevista) return "no-prazo";

    const entregaPrevista = new Date(carga.dataEntregaPrevista);
    const agora = new Date();
    const horasAtraso = (agora - entregaPrevista) / (1000 * 60 * 60);

    if (carga.status === "entregue") return "entregue";
    if (horasAtraso > 6) return "critico";
    if (horasAtraso > 2) return "atrasado";
    if (horasAtraso > 0) return "pequeno-atraso";
    return "no-prazo";
  };

  const getDeliveryStatusText = (status) => {
    const statusMap = {
      "no-prazo": {
        text: "No prazo",
        color: "text-green-600",
        badge: "bg-green-500",
      },
      "pequeno-atraso": {
        text: "Pequeno atraso",
        color: "text-yellow-600",
        badge: "bg-yellow-500",
      },
      atrasado: {
        text: "Atrasado",
        color: "text-orange-600",
        badge: "bg-orange-500",
      },
      critico: {
        text: "Atraso crítico",
        color: "text-red-600",
        badge: "bg-red-500",
      },
      entregue: {
        text: "Entregue",
        color: "text-teal-600",
        badge: "bg-teal-500",
      },
    };
    return statusMap[status] || statusMap["no-prazo"];
  };

  const getAlertaBadge = (nivel) => {
    const nivelMap = {
      critico: { color: "bg-red-500", icon: "🔴" },
      alto: { color: "bg-orange-500", icon: "🟠" },
      medio: { color: "bg-yellow-500", icon: "🟡" },
      baixo: { color: "bg-blue-500", icon: "🔵" },
    };
    return nivelMap[nivel] || { color: "bg-gray-500", icon: "⚪" };
  };

  const getAlertaText = (tipo) => {
    const tipoMap = {
      atraso: "Atraso",
      avaria: "Avaria",
      roubo: "Roubo",
      acidente: "Acidente",
      seguranca: "Segurança",
      movimento: "Movimento",
    };
    return tipoMap[tipo] || tipo;
  };

  const calculateProgress = (carga) => {
    if (!carga.distanciaKm || !carga.rotaRealizada) return 65;

    // Simulação simples de progresso baseado no tempo
    if (carga.dataColeta && carga.dataEntregaPrevista) {
      const inicio = new Date(carga.dataColeta);
      const fim = new Date(carga.dataEntregaPrevista);
      const agora = new Date();

      const total = fim - inicio;
      const decorrido = agora - inicio;

      return Math.min(95, Math.max(5, (decorrido / total) * 100));
    }

    return 65;
  };

  return (
    <div className="h-full flex flex-col text-gray-900">
      <ApiStatusBanner />
      {/* Header com notificações */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
              🚚
            </span>
            Carga em Movimento - Monitoramento em Tempo Real
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            {cargas.length} cargas ativas • {realTimeUpdates.length}{" "}
            atualizações recentes
          </p>
        </div>

        {/* Botões de ação rápida */}
        <div className="flex space-x-3">
          {notificationCount > 0 && (
            <button className="relative bg-red-500 text-white px-4 py-2 rounded-lg">
              🔔 {notificationCount}
            </button>
          )}
          <button
            onClick={fetchCargasEmCurso}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
          >
            🔄 Atualizar
          </button>
        </div>
      </div>

      <div className="flex-1 p-6">
        {/* Dashboard Metrics */}
        <DashboardMetrics cargas={cargas} stats={stats} />

        {/* Menu de Navegação melhorado */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveCursoForm("monitoramento")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
              activeCursoForm === "monitoramento"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span className="mr-2">📍</span>
            Monitoramento
          </button>
          <button
            onClick={() => setActiveCursoForm("alertas")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
              activeCursoForm === "alertas"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span className="mr-2">⚠️</span>
            Alertas
            {alertas.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {alertas.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveCursoForm("analytics")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
              activeCursoForm === "analytics"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span className="mr-2">📊</span>
            Analytics
          </button>
          <button
            onClick={() => setActiveCursoForm("tracking")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
              activeCursoForm === "tracking"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span className="mr-2">🛣️</span>
            Tracking
          </button>
        </div>

        {/* Painel de Analytics */}
        {activeCursoForm === "analytics" && cargas && cargas.length > 0 && (
          <div className="space-y-6">
            <AnalyticsCharts cargas={cargas} />

            {/* Tabela detalhada */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Detalhes das Cargas
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-3 text-left text-sm font-medium text-gray-600">
                          Código
                        </th>
                        <th className="p-3 text-left text-sm font-medium text-gray-600">
                          Status
                        </th>
                        <th className="p-3 text-left text-sm font-medium text-gray-600">
                          Tempo
                        </th>
                        <th className="p-3 text-left text-sm font-medium text-gray-600">
                          Distância
                        </th>
                        <th className="p-3 text-left text-sm font-medium text-gray-600">
                          Valor
                        </th>
                        <th className="p-3 text-left text-sm font-medium text-gray-600">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cargas.map((carga, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="p-3">
                            <div className="font-medium text-gray-900">
                              {carga.codigo}
                            </div>
                            <div className="text-sm text-gray-500">
                              {carga.tipoCarga}
                            </div>
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                carga.status === "em_transito"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {carga.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <div>{carga.tempoTransitoHoras || 0}h</div>
                          </td>
                          <td className="p-3">
                            <div>{carga.distanciaKm || 0} km</div>
                          </td>
                          <td className="p-3">
                            <div className="font-medium">
                              {new Intl.NumberFormat("pt-PT", {
                                style: "currency",
                                currency: "MZN",
                              }).format(carga.valorMercadoria || 0)}
                            </div>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => handleCargaClick(carga)}
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Ver detalhes
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
        )}

        {activeCursoForm === "analytics" && (!cargas || cargas.length === 0) && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="text-center py-8">
              <p className="text-gray-600">Nenhuma carga em curso para análise</p>
            </div>
          </div>
        )}

        {/* Monitoramento em Tempo Real */}
        {activeCursoForm === "monitoramento" && (
          <div className="space-y-6">
            {/* Métricas Rápidas */}
            <DashboardMetrics cargas={cargas} stats={stats} />
            {/* Grid Principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Mapa Google Maps */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4 border-b border-gray-200 bg-blue-50 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                        🗺️
                      </span>
                      Mapa em Tempo Real - {cargas.length} Cargas
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                        <span className="text-xs">Em Movimento</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                        <span className="text-xs">Parado</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                        <span className="text-xs">Sem Sinal</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="rounded-lg overflow-hidden border border-gray-300">
                      <MapaCargasEmCurso
                        cargas={cargas}
                        selectedCarga={selectedCarga}
                        setSelectedCarga={setSelectedCarga}
                      />
                    </div>
                  </div>
                </div>

                {/* Lista de Cargas em Curso */}
                <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">
                      Lista de Cargas em Movimento ({cargas.length})
                    </h3>
                    <div className="flex space-x-2">
                      <select
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                        value={filters.status}
                        onChange={(e) =>
                          setFilters({ ...filters, status: e.target.value })
                        }
                      >
                        <option value="em_transito">Em Movimento</option>
                        <option value="em_entrega">Em Entrega</option>
                        <option value="em_fronteira">Em Fronteira</option>
                        <option value="">Todos Status</option>
                      </select>
                      <button
                        onClick={fetchCargasEmCurso}
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
                          Nenhuma carga em curso encontrada
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cargas.map((carga, index) => {
                          const progress = calculateProgress(carga);
                          const status = calculateDeliveryStatus(carga);
                          const statusConfig = getDeliveryStatusText(status);

                          return (
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
                                    <span
                                      className={`px-2 py-1 rounded text-sm font-medium ${statusConfig.badge} text-white`}
                                    >
                                      {statusConfig.text.toUpperCase()}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                      {Math.round(progress)}% concluído
                                    </span>
                                  </div>
                                  <p className="font-medium text-gray-900">
                                    {carga.veiculo?.matricula || "Sem veículo"}{" "}
                                    • {carga.origem?.cidade} →{" "}
                                    {carga.destino?.cidade}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {carga.tipoCarga} •{" "}
                                    {carga.pesoBruto
                                      ? `${(carga.pesoBruto / 1000).toFixed(
                                          1
                                        )} ton`
                                      : ""}{" "}
                                    •{" "}
                                    {carga.motorista?.nome ||
                                      "Motorista não definido"}
                                  </p>
                                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                    <span>
                                      📍{" "}
                                      {carga.pontoAtual?.descricao ||
                                        "Posição não disponível"}
                                    </span>
                                    {carga.dataEntregaPrevista && (
                                      <span>
                                        ⏰ Previsão:{" "}
                                        {new Date(
                                          carga.dataEntregaPrevista
                                        ).toLocaleString("pt-PT", {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}
                                      </span>
                                    )}
                                    <span>
                                      📞{" "}
                                      {carga.motorista?.telefone ||
                                        "Sem telefone"}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p
                                    className={`text-sm font-medium ${statusConfig.color}`}
                                  >
                                    {statusConfig.text}
                                  </p>
                                  <div className="flex space-x-2 mt-2">
                                    <button
                                      onClick={() => setSelectedCarga(carga)}
                                      className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                                    >
                                      Detalhes
                                    </button>
                                    {carga.status === "em_transito" && (
                                      <button
                                        onClick={() =>
                                          handleUpdateStatus(
                                            carga.codigo,
                                            "em_entrega"
                                          )
                                        }
                                        className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
                                      >
                                        Iniciar Entrega
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Painel de Controle */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Filtros Rápidos
                  </h4>
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        const cargasNoPrazo = cargas.filter(
                          (c) => calculateDeliveryStatus(c) === "no-prazo"
                        );
                        // Aqui você pode implementar uma visualização específica
                      }}
                      className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950"
                    >
                      🟢 No Prazo
                    </button>
                    <button
                      onClick={() => {
                        const cargasPequenoAtraso = cargas.filter(
                          (c) => calculateDeliveryStatus(c) === "pequeno-atraso"
                        );
                      }}
                      className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950"
                    >
                      🟡 Pequeno Atraso
                    </button>
                    <button
                      onClick={() => {
                        const cargasAtrasadas = cargas.filter((c) =>
                          ["atrasado", "critico"].includes(
                            calculateDeliveryStatus(c)
                          )
                        );
                      }}
                      className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950"
                    >
                      🔴 Atrasados
                    </button>
                    <button
                      onClick={() => {
                        const cargasProximo = cargas.filter(
                          (c) => calculateProgress(c) > 90
                        );
                      }}
                      className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950"
                    >
                      🔵 Próximos do Destino
                    </button>
                  </div>
                </div>

                {selectedCarga && (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Detalhes da Carga
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-600">Código:</span>
                        <p className="font-medium">{selectedCarga.codigo}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <p className="font-medium">
                          {getStatusBadge(selectedCarga.status)}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Cliente:</span>
                        <p className="font-medium">{selectedCarga.cliente}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Rota:</span>
                        <p className="font-medium">
                          {selectedCarga.origem?.cidade} →{" "}
                          {selectedCarga.destino?.cidade}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Motorista:</span>
                        <p className="font-medium">
                          {selectedCarga.motorista?.nome || "Não definido"}
                        </p>
                      </div>
                      {selectedCarga.pontoAtual && (
                        <div>
                          <span className="text-gray-600">Posição Atual:</span>
                          <p className="font-medium">
                            {selectedCarga.pontoAtual.descricao}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Ações Imediatas
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() =>
                        handleAddOcorrencia(
                          selectedCarga?.codigo || cargas[0]?.codigo,
                          {
                            tipo: "atraso",
                            descricao: "Reportar problema na carga",
                            severidade: "medio",
                          }
                        )
                      }
                      className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950"
                    >
                      🚨 Reportar Problema
                    </button>
                    <button
                      onClick={() => {
                        if (selectedCarga?.motorista?.telefone) {
                          window.location.href = `tel:${selectedCarga.motorista.telefone}`;
                        }
                      }}
                      className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950"
                    >
                      📞 Contactar Motorista
                    </button>
                    <button
                      onClick={() => setActiveCursoForm("tracking")}
                      className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950"
                    >
                      📍 Atualizar Tracking
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alertas e Incidentes */}
        {activeCursoForm === "alertas" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-blue-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                  ⚠️
                </span>
                Alertas e Incidentes - Cargas em Curso
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nível de Alerta
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                    <option value="todos">Todos os Alertas</option>
                    <option value="critico">Crítico</option>
                    <option value="alto">Alto</option>
                    <option value="medio">Médio</option>
                    <option value="baixo">Baixo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Incidente
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                    <option value="todos">Todos os Tipos</option>
                    <option value="atraso">Atraso</option>
                    <option value="avaria">Avaria</option>
                    <option value="roubo">Roubo</option>
                    <option value="acidente">Acidente</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                    <option value="ativos">Ativos</option>
                    <option value="resolvidos">Resolvidos</option>
                    <option value="todos">Todos</option>
                  </select>
                </div>
              </div>

              {/* Lista de Alertas */}
              <div className="space-y-4">
                {alertas.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">
                      Nenhum alerta ativo no momento
                    </p>
                  </div>
                ) : (
                  alertas.map((alerta, index) => {
                    const badgeConfig = getAlertaBadge(alerta.nivel);

                    return (
                      <div
                        key={index}
                        className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span
                              className={`${badgeConfig.color} text-white p-2 rounded-lg`}
                            >
                              {badgeConfig.icon}
                            </span>
                            <div>
                              <p className="font-medium text-gray-900">
                                {getAlertaText(alerta.tipo).toUpperCase()} -{" "}
                                {alerta.nivel.toUpperCase()}
                              </p>
                              <p className="text-sm text-gray-600">
                                {alerta.cargaCodigo} •{" "}
                                {new Date(alerta.data).toLocaleString("pt-PT")}
                              </p>
                              <p className="text-xs text-blue-600 font-medium">
                                {alerta.descricao}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                // Marcar como resolvido
                                const novosAlertas = [...alertas];
                                novosAlertas.splice(index, 1);
                                setAlertas(novosAlertas);
                              }}
                              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                            >
                              Resolver
                            </button>
                            <button
                              onClick={() => {
                                // Encontrar a carga relacionada
                                const carga = cargas.find(
                                  (c) => c.codigo === alerta.cargaCodigo
                                );
                                setSelectedCarga(carga);
                              }}
                              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                            >
                              Detalhes
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Novo Incidente */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Reportar Novo Incidente
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Carga Afetada
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                      onChange={(e) => {
                        const carga = cargas.find(
                          (c) => c.codigo === e.target.value
                        );
                        if (carga) setSelectedCarga(carga);
                      }}
                    >
                      <option value="">Selecione a carga</option>
                      {cargas.map((carga) => (
                        <option key={carga.codigo} value={carga.codigo}>
                          {carga.codigo} - {carga.origem?.cidade} →{" "}
                          {carga.destino?.cidade}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Incidente
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                      <option value="atraso">Atraso</option>
                      <option value="avaria">Avaria</option>
                      <option value="roubo">Roubo</option>
                      <option value="acidente">Acidente</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const cargaSelecionada = selectedCarga || cargas[0];
                    if (cargaSelecionada) {
                      handleAddOcorrencia(cargaSelecionada.codigo, {
                        tipo: "atraso",
                        descricao: "Incidente reportado via interface",
                        severidade: "medio",
                      });
                    }
                  }}
                  className="mt-4 px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 font-medium"
                >
                  Reportar Incidente
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tracking em Tempo Real */}
        {activeCursoForm === "tracking" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                      📍
                    </span>
                    Atualização de Tracking em Tempo Real
                  </h3>
                </div>
                <div className="p-6">
                  <form onSubmit={handleUpdateTracking} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Carga *
                        </label>
                        <select
                          required
                          value={trackingData.cargaId}
                          onChange={(e) =>
                            setTrackingData({
                              ...trackingData,
                              cargaId: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        >
                          <option value="">Selecione a carga</option>
                          {cargas.map((carga) => (
                            <option key={carga.codigo} value={carga.codigo}>
                              {carga.codigo} - {carga.origem?.cidade} →{" "}
                              {carga.destino?.cidade}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Localização
                        </label>
                        <input
                          type="text"
                          value={trackingData.descricao}
                          onChange={(e) =>
                            setTrackingData({
                              ...trackingData,
                              descricao: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="Ex: EN1 - Xai-Xai"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Latitude *
                        </label>
                        <input
                          type="number"
                          step="any"
                          required
                          value={trackingData.lat}
                          onChange={(e) =>
                            setTrackingData({
                              ...trackingData,
                              lat: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="-25.9689"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Longitude *
                        </label>
                        <input
                          type="number"
                          step="any"
                          required
                          value={trackingData.lng}
                          onChange={(e) =>
                            setTrackingData({
                              ...trackingData,
                              lng: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="32.5695"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Velocidade (km/h)
                        </label>
                        <input
                          type="number"
                          value={trackingData.velocidade}
                          onChange={(e) =>
                            setTrackingData({
                              ...trackingData,
                              velocidade: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="68"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Direção
                        </label>
                        <input
                          type="text"
                          value={trackingData.direcao}
                          onChange={(e) =>
                            setTrackingData({
                              ...trackingData,
                              direcao: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="Norte"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() =>
                          setTrackingData({
                            cargaId: "",
                            lat: "",
                            lng: "",
                            descricao: "",
                            velocidade: "",
                            direcao: "",
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
                        Atualizar Tracking
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
                  Últimas Posições
                </h4>
                <div className="space-y-3">
                  {cargas.slice(0, 3).map((carga, index) => (
                    <div
                      key={index}
                      className="p-3 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <p className="text-sm font-medium text-gray-950">
                        {carga.codigo}
                      </p>
                      <p className="text-xs text-gray-600">
                        {carga.pontoAtual?.descricao ||
                          "Posição não disponível"}
                      </p>
                      {carga.pontoAtual && (
                        <p className="text-xs text-blue-600 font-medium">
                          {carga.pontoAtual.lat?.toFixed(4)},{" "}
                          {carga.pontoAtual.lng?.toFixed(4)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Estatísticas de Tracking
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cargas Monitoradas:</span>
                    <span className="font-semibold text-gray-950">
                      {cargas.filter((c) => c.gps?.codigo).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Última Atualização:</span>
                    <span className="font-semibold text-gray-950">
                      {cargas.length > 0
                        ? new Date(
                            Math.max(
                              ...cargas.map(
                                (c) => new Date(c.gps?.ultimaComunicacao || 0)
                              )
                            )
                          ).toLocaleTimeString("pt-PT")
                        : "--:--"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GPS Ativos:</span>
                    <span className="font-semibold text-gray-950">
                      {
                        cargas.filter((c) => c.gps?.bateriaPercentual > 20)
                          .length
                      }
                    </span>
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

export default CargaEmCurso;
