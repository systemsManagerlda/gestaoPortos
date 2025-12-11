/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
// Interface para Contentor
interface Contentor {
  id: string;
  codigo: string;
  numero: string;
  tipo: string;
  status: string;
  localizacao: string;
  latitude?: number;
  longitude?: number;
  cliente: string;
  pesoBruto?: number;
  valorMercadoria?: number;
  motorista?: {
    id?: number;
    nome?: string;
    empresaMotorista?: string;
  };
  origem?: {
    cidade?: string;
    coordenadas?: {
      lat: number;
      lng: number;
    };
  };
  destino?: {
    cidade?: string;
  };
  pontoAtual?: {
    lat: number;
    lng: number;
  };
  proprietario: string;
  ultimaAtualizacao: string;
  sensorTemperatura: boolean;
  temperatura?: number;
}

// Interface para as props do MapaContentores
interface MapaContentoresProps {
  contentores: Contentor[];
  contentorSelecionado: Contentor | null;
  setContentorSelecionado: (contentor: Contentor | null) => void;
}

// Função para obter texto do status (agora disponível globalmente)
const getStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    planeada: "Planejada",
    aguardando_coleta: "Aguardando Coleta",
    coletada: "Coletada",
    em_transito: "Em Trânsito",
    em_fronteira: "Em Fronteira",
    aguardando_desembaraco: "Aguardando Desembaraço",
    em_entrega: "Em Entrega",
    entregue: "Entregue",
    encerrada: "Encerrada",
    armazenada: "Armazenada",
  };
  return statusMap[status] || status;
};

// Constantes de configuração do mapa (reutilizadas)
const CONFIG = {
  GOOGLE_MAPS_API_KEY: "AIzaSyB5Y1PUBVawvwuSUZEipJVLrEX9lV6Yn_0",
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

// Estilos do mapa modo escuro
const mapStyles = [
  {
    elementType: "geometry",
    stylers: [{ color: "#242f3e" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#242f3e" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

// Componente de Mapa para Contentores
const MapaContentores: React.FC<MapaContentoresProps> = ({
  contentores,
  contentorSelecionado,
  setContentorSelecionado,
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  // Função para obter cor baseada no status
  const getStatusColor = useCallback((status: string): string => {
    switch (status) {
      case "em_transito":
        return "green";
      case "coletada":
        return "blue";
      case "entregue":
        return "purple";
      case "planeada":
        return "yellow";
      default:
        return "red";
    }
  }, []);

  const onLoad = useCallback(
    (mapInstance: google.maps.Map) => {
      setMapInstance(mapInstance);
      setMap(mapInstance);
      setIsLoaded(true);

      // Ajustar zoom para mostrar todos os contentores
      if (contentores.length > 0) {
        setTimeout(() => {
          if (mapInstance) {
            const bounds = new google.maps.LatLngBounds();
            let hasValidCoordinates = false;

            contentores.forEach((contentor) => {
              const lat =
                contentor.pontoAtual?.lat || contentor.origem?.coordenadas?.lat;
              const lng =
                contentor.pontoAtual?.lng || contentor.origem?.coordenadas?.lng;

              if (lat && lng) {
                bounds.extend(new google.maps.LatLng(lat, lng));
                hasValidCoordinates = true;
              }
            });

            if (hasValidCoordinates && !bounds.isEmpty()) {
              mapInstance.fitBounds(bounds);

              if (contentores.length === 1) {
                setTimeout(() => {
                  if (mapInstance) mapInstance.setZoom(15);
                }, 500);
              }
            }
          }
        }, 1000);
      }
    },
    [contentores]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
    setMapInstance(null);
  }, []);

  const centralizarMapa = useCallback(() => {
    if (mapInstance && contentores.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      let hasValidCoordinates = false;

      contentores.forEach((contentor) => {
        const lat =
          contentor.pontoAtual?.lat || contentor.origem?.coordenadas?.lat;
        const lng =
          contentor.pontoAtual?.lng || contentor.origem?.coordenadas?.lng;

        if (lat && lng) {
          bounds.extend(new google.maps.LatLng(lat, lng));
          hasValidCoordinates = true;
        }
      });

      if (hasValidCoordinates && !bounds.isEmpty()) {
        mapInstance.fitBounds(bounds);
      }
    } else if (mapInstance) {
      mapInstance.setCenter(CONFIG.MAP.defaultCenter);
      mapInstance.setZoom(CONFIG.MAP.defaultZoom);
    }
  }, [mapInstance, contentores]);

  const handleLoadError = useCallback((error: Error) => {
    console.error("Erro ao carregar Google Maps:", error);
    setLoadError(
      "Falha ao carregar o Google Maps. Verifique sua conexão ou a chave da API."
    );
  }, []);

  // Verificar se há coordenadas válidas
  const hasValidContentores = contentores.some((contentor) => {
    const lat = contentor.pontoAtual?.lat || contentor.origem?.coordenadas?.lat;
    const lng = contentor.pontoAtual?.lng || contentor.origem?.coordenadas?.lng;
    return lat && lng;
  });

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={centralizarMapa}
          className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-all shadow-lg flex items-center text-sm font-medium"
          title="Centralizar mapa"
        >
          <span className="mr-2">🎯</span>
          Centralizar Mapa
        </button>
      </div>

      <LoadScript
        googleMapsApiKey={CONFIG.GOOGLE_MAPS_API_KEY}
        loadingElement={
          <div className="bg-gray-700 rounded-lg h-96 flex items-center justify-center border border-gray-600">
            <div className="text-center text-gray-400">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p>Carregando Google Maps...</p>
              <p className="text-xs mt-2">Verificando chave da API...</p>
            </div>
          </div>
        }
        onError={handleLoadError}
      >
        {loadError ? (
          <div className="bg-gray-700 rounded-lg h-96 flex items-center justify-center border border-gray-600">
            <div className="text-center text-red-400 p-4">
              <div className="text-4xl mb-4">❌</div>
              <p className="font-medium">{loadError}</p>
              <p className="text-sm mt-2">
                Chave da API: {CONFIG.GOOGLE_MAPS_API_KEY.substring(0, 10)}...
              </p>
            </div>
          </div>
        ) : !hasValidContentores ? (
          <div className="bg-gray-700 rounded-lg h-96 flex items-center justify-center border border-gray-600">
            <div className="text-center text-yellow-400 p-4">
              <div className="text-4xl mb-4">📍</div>
              <p className="font-medium">Nenhuma localização disponível</p>
              <p className="text-sm mt-2">
                Os contentores não possuem coordenadas GPS
              </p>
            </div>
          </div>
        ) : (
          <GoogleMap
            mapContainerStyle={CONFIG.MAP.containerStyle}
            center={CONFIG.MAP.defaultCenter}
            zoom={CONFIG.MAP.defaultZoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              mapTypeControl: true,
              streetViewControl: true,
              fullscreenControl: true,
              zoomControl: true,
              styles: mapStyles,
              disableDefaultUI: false,
              clickableIcons: true,
              maxZoom: 18,
              minZoom: 3,
            }}
          >
            {isLoaded &&
              contentores.map((contentor) => {
                const lat =
                  contentor.pontoAtual?.lat ||
                  contentor.origem?.coordenadas?.lat;
                const lng =
                  contentor.pontoAtual?.lng ||
                  contentor.origem?.coordenadas?.lng;

                if (!lat || !lng) return null;

                const statusColor = getStatusColor(contentor.status);
                const iconUrls: Record<string, string> = {
                  green:
                    "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                  blue: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                  yellow:
                    "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
                  purple:
                    "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
                  red: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                };

                return (
                  <Marker
                    key={contentor.codigo}
                    position={{ lat, lng }}
                    onClick={() => setContentorSelecionado(contentor)}
                    icon={{
                      url:
                        iconUrls[statusColor] ||
                        "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                      scaledSize: new google.maps.Size(32, 32),
                    }}
                    title={`${contentor.numero} - ${contentor.cliente}`}
                  />
                );
              })}

            {isLoaded && contentorSelecionado && (
              <InfoWindow
                position={{
                  lat:
                    contentorSelecionado.pontoAtual?.lat ||
                    contentorSelecionado.origem?.coordenadas?.lat ||
                    CONFIG.MAP.defaultCenter.lat,
                  lng:
                    contentorSelecionado.pontoAtual?.lng ||
                    contentorSelecionado.origem?.coordenadas?.lng ||
                    CONFIG.MAP.defaultCenter.lng,
                }}
                onCloseClick={() => setContentorSelecionado(null)}
              >
                <div className="bg-gray-900 text-white p-4 rounded-lg max-w-xs border border-gray-600 shadow-xl">
                  <div className="flex items-center mb-3">
                    <div
                      className={`w-4 h-4 rounded-full mr-3 ${
                        contentorSelecionado.status === "em_transito"
                          ? "animate-pulse bg-green-500"
                          : contentorSelecionado.status === "entregue"
                          ? "bg-purple-500"
                          : contentorSelecionado.status === "coletada"
                          ? "bg-blue-500"
                          : "bg-gray-500"
                      }`}
                    ></div>
                    <h3 className="font-bold text-lg text-white">
                      {contentorSelecionado.codigo}
                    </h3>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tipo:</span>
                      <span className="font-medium text-white">
                        {contentorSelecionado.tipo}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span
                        className={`font-medium ${
                          contentorSelecionado.status === "em_transito"
                            ? "text-green-400"
                            : contentorSelecionado.status === "entregue"
                            ? "text-purple-400"
                            : contentorSelecionado.status === "coletada"
                            ? "text-blue-400"
                            : "text-gray-400"
                        }`}
                      >
                        {getStatusText(contentorSelecionado.status)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cliente:</span>
                      <span className="text-white">
                        {contentorSelecionado.cliente}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Peso Bruto:</span>
                      <span className="text-white">
                        {contentorSelecionado.pesoBruto || 0} kg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Valor:</span>
                      <span className="text-cyan-400">
                        {contentorSelecionado.valorMercadoria?.toLocaleString(
                          "pt-BR",
                          {
                            style: "currency",
                            currency: "MZN",
                          }
                        ) || "MZN 0"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Motorista:</span>
                      <span className="text-white">
                        {contentorSelecionado.motorista?.nome || "N/A"}
                      </span>
                    </div>
                    <div className="border-t border-gray-600 pt-2 mt-2">
                      <div className="text-xs text-gray-400">Coordenadas:</div>
                      <div className="text-xs text-white font-mono">
                        {contentorSelecionado.pontoAtual?.lat?.toFixed(6) ||
                          contentorSelecionado.origem?.coordenadas?.lat?.toFixed(
                            6
                          ) ||
                          "0.000000"}
                        ,
                        {contentorSelecionado.pontoAtual?.lng?.toFixed(6) ||
                          contentorSelecionado.origem?.coordenadas?.lng?.toFixed(
                            6
                          ) ||
                          "0.000000"}
                      </div>
                    </div>
                  </div>

                  <button
                    className="mt-3 w-full bg-cyan-600 text-white py-2 px-3 rounded text-sm hover:bg-cyan-700 transition-colors"
                    onClick={() => {
                      const lat =
                        contentorSelecionado.pontoAtual?.lat ||
                        contentorSelecionado.origem?.coordenadas?.lat;
                      const lng =
                        contentorSelecionado.pontoAtual?.lng ||
                        contentorSelecionado.origem?.coordenadas?.lng;
                      if (lat && lng) {
                        window.open(
                          `https://www.google.com/maps?q=${lat},${lng}`,
                          "_blank"
                        );
                      }
                    }}
                  >
                    📍 Abrir no Google Maps
                  </button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </LoadScript>
    </div>
  );
};

// Interface para filtros
interface Filtros {
  status: string;
  tipoCarga: string;
  naturezaCarga: string;
}

const GPSContentor: React.FC = () => {
  const [activeContentorForm, setActiveContentorForm] =
    useState<string>("rastreamento");
  const [deviceCode, setDeviceCode] = useState<string>("755078869333");
  const [dynamicPassword, setDynamicPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingContentores, setLoadingContentores] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

  // Estados para o mapa
  const [contentorSelecionado, setContentorSelecionado] =
    useState<Contentor | null>(null);
  const [contentores, setContentores] = useState<Contentor[]>([]);
  const [filtros, setFiltros] = useState<Filtros>({
    status: "todos",
    tipoCarga: "todos",
    naturezaCarga: "todos",
  });

  // Função para obter a senha dinâmica
  const getDynamicPassword = async (): Promise<void> => {
    if (!deviceCode) {
      setError("Device Code é obrigatório");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/getDynamicPassword?deviceCode=${deviceCode}`
      );
      const data = await response.json();

      if (data.returnCode === "200") {
        setDynamicPassword(data.data);
        setError("");
      } else {
        setError(data.returnMsg || "Erro ao obter senha dinâmica");
      }
    } catch (err) {
      setError("Erro de conexão com a API");
      console.error("Erro:", err);
    } finally {
      setLoading(false);
    }
  };

  // Função para carregar contentores (cargas) da API
  const carregarContentores = async (): Promise<void> => {
    setLoadingContentores(true);
    try {
      const response = await fetch(`${API_BASE_URL}/getCargaList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          curPage: 1,
          pageSize: 100,
          tipoCarga:
            filtros.tipoCarga !== "todos" ? filtros.tipoCarga : undefined,
          naturezaCarga:
            filtros.naturezaCarga !== "todos"
              ? filtros.naturezaCarga
              : undefined,
          status: filtros.status !== "todos" ? filtros.status : undefined,
        }),
      });

      const data = await response.json();

      if (data.returnCode === 200) {
        // Filtrar cargas com contentores (que têm contentor.numero)
        const cargasComContentor = data.data.list.filter(
          (carga: any) => carga.contentor?.numero
        );

        // Mapear para o formato esperado pelo componente
        const contentoresFormatados: Contentor[] = cargasComContentor.map(
          (carga: any) => ({
            id: carga.codigo,
            codigo: carga.codigo,
            numero:
              carga.contentor?.numero || `CONT-${carga.codigo.substring(0, 8)}`,
            tipo: carga.tipoCarga,
            status: carga.status,
            localizacao: `${carga.origem?.cidade} → ${carga.destino?.cidade}`,
            latitude: carga.pontoAtual?.lat || carga.origem?.coordenadas?.lat,
            longitude: carga.pontoAtual?.lng || carga.origem?.coordenadas?.lng,
            cliente: carga.cliente,
            pesoBruto: carga.pesoBruto,
            valorMercadoria: carga.valorMercadoria,
            motorista: carga.motorista,
            origem: carga.origem,
            destino: carga.destino,
            pontoAtual: carga.pontoAtual,
            proprietario: "Mega Centro e Logistica",
            ultimaAtualizacao: new Date(
              carga.dataAtualizacao
            ).toLocaleDateString("pt-BR"),
            sensorTemperatura: !!carga.sensoresIOT?.temperatura,
            temperatura: carga.sensoresIOT?.temperatura,
          })
        );

        setContentores(contentoresFormatados);
      } else {
        setError("Erro ao carregar contentores: " + data.returnMsg);
      }
    } catch (err) {
      console.error("Erro ao carregar contentores:", err);
      setError("Erro de conexão com a API");
    } finally {
      setLoadingContentores(false);
    }
  };

  // Carregar contentores e senha dinâmica ao iniciar
  useEffect(() => {
    getDynamicPassword();
    carregarContentores();
  }, []);

  // Recarregar contentores quando filtros mudam
  useEffect(() => {
    carregarContentores();
  }, [filtros]);

  // Função para buscar detalhes de uma carga
  const buscarDetalhesCarga = async (codigo: string): Promise<any> => {
    try {
      const response = await fetch(`${API_BASE_URL}/getCargaDetail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigo }),
      });

      const data = await response.json();
      if (data.returnCode === 200) {
        return data.data;
      }
      return null;
    } catch (err) {
      console.error("Erro ao buscar detalhes:", err);
      return null;
    }
  };

  // Função para adicionar ocorrência
  // const adicionarOcorrencia = async (codigo, ocorrenciaData) => {
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/addOcorrenciaCarga`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         codigo,
  //         ocorrenciaData: {
  //           ...ocorrenciaData,
  //           dataRegistro: new Date().toISOString()
  //         }
  //       })
  //     });

  //     const data = await response.json();
  //     return data.returnCode === 200;
  //   } catch (err) {
  //     console.error("Erro ao adicionar ocorrência:", err);
  //     return false;
  //   }
  // };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-cyan-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-cyan-500 text-white p-2 rounded-lg mr-3">📦</span>
          GPS Contentor - Rastreamento de Contentores
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Monitoramento em tempo real, localização e gestão de contentores
        </p>

        {/* Seção da Chave do Cadeado */}
        <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="bg-green-500 text-white p-2 rounded-lg">🔑</span>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Chave do Cadeado - Contentor {deviceCode}
                </h3>
                <p className="text-sm text-gray-600">
                  Senha dinâmica para abertura do contentor
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Display da Senha */}
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 bg-gray-100 px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 min-w-[120px]">
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-500"></div>
                    </div>
                  ) : dynamicPassword ? (
                    dynamicPassword
                  ) : (
                    "----"
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Senha Dinâmica</p>
              </div>

              {/* Botão para atualizar */}
              <button
                onClick={getDynamicPassword}
                disabled={loading}
                className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Carregando...</span>
                  </>
                ) : (
                  <>
                    <span>🔄</span>
                    <span>Atualizar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Mensagem de Erro */}
          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-red-500">❌</span>
                <span className="text-sm text-red-700">{error}</span>
              </div>
            </div>
          )}

          {/* Informações Adicionais */}
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="flex items-center space-x-2 text-gray-600">
              <span>📱</span>
              <span>Device: {deviceCode}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <span>🕐</span>
              <span>Atualização: Manual</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <span>🔒</span>
              <span>Segurança: Dinâmica</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação entre Formulários */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveContentorForm("rastreamento")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContentorForm === "rastreamento"
                ? "bg-cyan-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🗺️ Rastreamento
          </button>
          <button
            onClick={() => setActiveContentorForm("contentores")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContentorForm === "contentores"
                ? "bg-cyan-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📋 Contentores
          </button>
          <button
            onClick={() => setActiveContentorForm("movimentacao")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContentorForm === "movimentacao"
                ? "bg-cyan-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🚢 Movimentação
          </button>
          <button
            onClick={() => setActiveContentorForm("graficos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContentorForm === "graficos"
                ? "bg-cyan-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Gráficos
          </button>
          <button
            onClick={() => setActiveContentorForm("relatorios")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContentorForm === "relatorios"
                ? "bg-cyan-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Relatórios
          </button>
        </div>

        {/* Rastreamento em Tempo Real com Mapa */}
        {activeContentorForm === "rastreamento" && (
          <div className="space-y-6">
            {/* Painel de Filtros */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-cyan-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-cyan-500 text-white p-2 rounded-lg mr-2">
                    🔍
                  </span>
                  Filtros de Rastreamento
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-950"
                      value={filtros.status}
                      onChange={(e) =>
                        setFiltros({ ...filtros, status: e.target.value })
                      }
                    >
                      <option value="todos">Todos os Status</option>
                      <option value="planeada">Planejada</option>
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
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Carga
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-950"
                      value={filtros.tipoCarga}
                      onChange={(e) =>
                        setFiltros({ ...filtros, tipoCarga: e.target.value })
                      }
                    >
                      <option value="todos">Todos os Tipos</option>
                      <option value="Contentorizada">Contentorizada</option>
                      <option value="Solta">Solta</option>
                      <option value="Granel">Granel</option>
                      <option value="Frigorífica">Frigorífica</option>
                      <option value="Perigosa">Perigosa</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Natureza da Carga
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-950"
                      value={filtros.naturezaCarga}
                      onChange={(e) =>
                        setFiltros({
                          ...filtros,
                          naturezaCarga: e.target.value,
                        })
                      }
                    >
                      <option value="todos">Todas as Naturezas</option>
                      <option value="perigosa">Perigosa</option>
                      <option value="não perigosa">Não Perigosa</option>
                      <option value="sensível">Sensível</option>
                      <option value="fragil">Frágil</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={carregarContentores}
                      disabled={loadingContentores}
                      className="w-full px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 font-medium disabled:opacity-50"
                    >
                      {loadingContentores ? "Carregando..." : "Aplicar Filtros"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa Google Maps */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm text-gray-900">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                      🗺️
                    </span>
                    Mapa de Rastreamento - {contentores.length} Contentores
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                      <span className="text-xs">Em Trânsito</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                      <span className="text-xs">Coletada</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
                      <span className="text-xs">Entregue</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                {loadingContentores ? (
                  <div className="h-96 flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                      <p className="text-gray-600">Carregando contentores...</p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg overflow-hidden border border-gray-300">
                    <MapaContentores
                      contentores={contentores}
                      contentorSelecionado={contentorSelecionado}
                      setContentorSelecionado={setContentorSelecionado}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Painel de Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Status dos Contentores
                </h4>
                <div className="space-y-3">
                  {["em_transito", "coletada", "entregue", "planeada"].map(
                    (status) => {
                      const count = contentores.filter(
                        (c) => c.status === status
                      ).length;
                      const colors: Record<string, string> = {
                        em_transito: "bg-green-500 text-white",
                        coletada: "bg-blue-500 text-white",
                        entregue: "bg-purple-500 text-white",
                        planeada: "bg-gray-500 text-white",
                      };

                      const textos: Record<string, string> = {
                        em_transito: "Em Trânsito",
                        coletada: "Coletada",
                        entregue: "Entregue",
                        planeada: "Planejada",
                      };

                      return (
                        <div
                          key={status}
                          className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200 text-gray-950"
                        >
                          <span className="text-sm font-medium">
                            {textos[status]}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-sm font-bold ${colors[status]}`}
                          >
                            {count}
                          </span>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="md:col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Contentores em Tempo Real
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Número
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tipo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Localização
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Peso (kg)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {contentores.slice(0, 10).map((contentor) => (
                        <tr key={contentor.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">
                              {contentor.numero}
                            </div>
                            <div className="text-xs text-gray-500">
                              {contentor.codigo}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {contentor.tipo}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                contentor.status === "em_transito"
                                  ? "bg-green-100 text-green-800"
                                  : contentor.status === "coletada"
                                  ? "bg-blue-100 text-blue-800"
                                  : contentor.status === "entregue"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {getStatusText(contentor.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {contentor.localizacao}
                            </div>
                            <div className="text-xs text-gray-500">
                              {contentor.ultimaAtualizacao}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">
                              {contentor.pesoBruto?.toLocaleString() || "0"} kg
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => setContentorSelecionado(contentor)}
                              className="text-cyan-600 hover:text-cyan-900 mr-3"
                            >
                              Ver no Mapa
                            </button>
                            <button
                              className="text-blue-600 hover:text-blue-900"
                              onClick={async () => {
                                const detalhes = await buscarDetalhesCarga(
                                  contentor.codigo
                                );
                                if (detalhes) {
                                  console.log("Detalhes da carga:", detalhes);
                                  alert(
                                    `Detalhes carregados para ${contentor.codigo}`
                                  );
                                }
                              }}
                            >
                              Detalhes
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {contentores.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Nenhum contentor encontrado com os filtros atuais.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gestão de Contentores */}
        {activeContentorForm === "contentores" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                      📋
                    </span>
                    Cadastro e Gestão de Cargas/Contentores
                  </h3>
                </div>
                <div className="p-6">
                  <form
                    className="space-y-6"
                    onSubmit={async (e) => {
                      e.preventDefault();

                      // Coletar dados do formulário de forma tipada
                      const formData = new FormData(e.currentTarget);
                      const formObject: Record<string, string> = {};

                      // Converter FormData para objeto, convertendo valores para string
                      for (const [key, value] of formData.entries()) {
                        formObject[key] = value.toString();
                      }

                      // Preparar dados para a API conforme o schema
                      const cargaData = {
                        // Identificação da Carga
                        tipoCarga: formObject.tipoCarga,
                        subtipo: formObject.subtipo || "",
                        descricao: formObject.descricao,
                        naturezaCarga: "não perigosa", // Default, pode ser ajustado

                        // Cálculo de seguro
                        categoriaSeguro: formObject.categoriaSeguro,
                        abrangenciaSeguro: formObject.abrangenciaSeguro,

                        // Cálculo de frete e comissão
                        tipoPercurso: formObject.tipoPercurso,
                        destinoFrete: formObject.destino,

                        // Informações básicas
                        pesoBruto: parseFloat(formObject.pesoBruto),
                        valorMercadoria: parseFloat(formObject.valorMercadoria),

                        // Cliente
                        clienteId: `CLI-${Date.now()}`,
                        cliente: formObject.cliente,

                        // Localização
                        origem: {
                          pais: "Moçambique",
                          cidade: formObject.origem,
                          local: formObject.origem,
                        },
                        destino: {
                          pais: "Moçambique",
                          cidade: formObject.destino,
                          local: formObject.destino,
                        },

                        // Contentor (se fornecido)
                        ...(formObject.numeroContentor && {
                          contentor: {
                            numero: formObject.numeroContentor,
                            tipo: formObject.tipoContentor || "",
                          },
                        }),

                        // Status inicial
                        status: "planeada",

                        // Documentação
                        documentos: {
                          numeroCotacao: `COT-${Date.now()}`,
                        },

                        // Financeiro (será calculado automaticamente pelo middleware)
                        taxasPortuarias: 0,
                        despesasOperacionais: 0,
                        custoCarga: 0,

                        // Prioridade
                        prioridade: "média",
                      };

                      try {
                        // Validações básicas
                        if (
                          !formObject.tipoCarga ||
                          !formObject.descricao ||
                          !formObject.pesoBruto ||
                          !formObject.valorMercadoria ||
                          !formObject.cliente ||
                          !formObject.origem ||
                          !formObject.destino ||
                          !formObject.categoriaSeguro ||
                          !formObject.abrangenciaSeguro ||
                          !formObject.tipoPercurso
                        ) {
                          alert(
                            "Por favor, preencha todos os campos obrigatórios (*)"
                          );
                          return;
                        }

                        if (
                          isNaN(parseFloat(formObject.pesoBruto)) ||
                          parseFloat(formObject.pesoBruto) <= 0
                        ) {
                          alert("Peso bruto deve ser um número positivo");
                          return;
                        }

                        if (
                          isNaN(parseFloat(formObject.valorMercadoria)) ||
                          parseFloat(formObject.valorMercadoria) <= 0
                        ) {
                          alert(
                            "Valor da mercadoria deve ser um número positivo"
                          );
                          return;
                        }

                        console.log("Enviando dados:", cargaData);

                        // Enviar para a API
                        const response = await fetch(
                          `${API_BASE_URL}/createCarga`,
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(cargaData),
                          }
                        );

                        const data = await response.json();

                        if (data.returnCode === 201) {
                          alert("Carga criada com sucesso!");
                          console.log("Carga criada:", data.data);

                          // Recarregar a lista de contentores
                          await carregarContentores();

                          // Limpar formulário
                          e.currentTarget.reset();
                        } else {
                          alert(`Erro ao criar carga: ${data.returnMsg}`);
                        }
                      } catch (error: any) {
                        console.error("Erro:", error);
                        alert(
                          `Erro ao criar carga: ${
                            error.message ||
                            "Verifique o console para mais detalhes."
                          }`
                        );
                      }
                    }}
                  >
                    {/* Campos do formulário permanecem iguais */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Carga *
                        </label>
                        <select
                          name="tipoCarga"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          required
                        >
                          <option value="">Selecione</option>
                          <option value="Contentorizada">Contentorizada</option>
                          <option value="Solta">Solta</option>
                          <option value="Granel">Granel</option>
                          <option value="Frigorífica">Frigorífica</option>
                          <option value="Perigosa">Perigosa</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subtipo
                        </label>
                        <input
                          name="subtipo"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="Ex: Container Dry, Granel Líquido"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Número do Contentor (opcional)
                        </label>
                        <input
                          name="numeroContentor"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="CONT-001"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo do Contentor
                        </label>
                        <select
                          name="tipoContentor"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        >
                          <option value="">Selecione</option>
                          <option value="20ft">20ft Standard</option>
                          <option value="40ft">40ft Standard</option>
                          <option value="40hc">40ft High Cube</option>
                          <option value="reefer">Reefer</option>
                          <option value="tanque">Tanque</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Peso Bruto (kg) *
                        </label>
                        <input
                          name="pesoBruto"
                          type="number"
                          step="0.01"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="10000"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Valor da Mercadoria (MZN) *
                        </label>
                        <input
                          name="valorMercadoria"
                          type="number"
                          step="0.01"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="500000"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cliente *
                        </label>
                        <input
                          name="cliente"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="Nome do Cliente"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Categoria de Seguro *
                        </label>
                        <select
                          name="categoriaSeguro"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          required
                        >
                          <option value="">Selecione</option>
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Abrangência do Seguro *
                        </label>
                        <select
                          name="abrangenciaSeguro"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          required
                        >
                          <option value="">Selecione</option>
                          <option value="Nacional">Nacional</option>
                          <option value="Regional SADC">Regional SADC</option>
                          <option value="Internacional">Internacional</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Percurso *
                        </label>
                        <select
                          name="tipoPercurso"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          required
                        >
                          <option value="">Selecione</option>
                          <option value="Beira-Interland">
                            Beira-Interland
                          </option>
                          <option value="Local">Local</option>
                          <option value="Nacional">Nacional</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Origem (Cidade) *
                        </label>
                        <input
                          name="origem"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="Cidade de Origem"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Destino (Cidade) *
                        </label>
                        <input
                          name="destino"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="Cidade de Destino"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição da Carga *
                      </label>
                      <textarea
                        name="descricao"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        placeholder="Descreva a carga, mercadoria, instruções especiais..."
                        required
                      />
                    </div>

                    {/* Campo para natureza da carga */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Natureza da Carga *
                      </label>
                      <select
                        name="naturezaCarga"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        required
                      >
                        <option value="não perigosa">Não Perigosa</option>
                        <option value="perigosa">Perigosa</option>
                        <option value="sensível">Sensível</option>
                        <option value="fragil">Frágil</option>
                      </select>
                    </div>

                    {/* Seção para associar camião e GPS (opcional) */}
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="bg-blue-500 text-white p-1 rounded-lg mr-2 text-sm">
                          🚚
                        </span>
                        Associar a Veículo (Opcional)
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Camião (ID)
                          </label>
                          <input
                            name="camiaoId"
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                            placeholder="ID do camião"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Código GPS
                          </label>
                          <input
                            name="codigoGPS"
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                            placeholder="Código do GPS"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                        onClick={(e) => {
                          e.preventDefault();
                          // Limpar formulário
                          const form = e.currentTarget.closest("form");
                          if (form) form.reset();
                        }}
                      >
                        Limpar
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium flex items-center"
                      >
                        <span className="mr-2">💾</span>
                        Salvar Carga
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Painel de Contentores */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Contentores Recentes
                </h4>
                <div className="space-y-3">
                  {contentores.slice(0, 3).map((contentor) => (
                    <div
                      key={contentor.id}
                      className="p-3 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <p className="text-sm font-medium text-gray-950">
                        {contentor.numero}
                      </p>
                      <p className="text-xs text-gray-600">
                        {contentor.tipo} • {getStatusText(contentor.status)}
                      </p>
                      <p className="text-xs text-blue-600 font-medium">
                        {contentor.localizacao}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Estatísticas
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Cargas:</span>
                    <span className="font-semibold text-gray-950">
                      {contentores.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Em Trânsito:</span>
                    <span className="font-semibold text-gray-950">
                      {
                        contentores.filter((c) => c.status === "em_transito")
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Entregues:</span>
                    <span className="font-semibold text-gray-950">
                      {
                        contentores.filter((c) => c.status === "entregue")
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Com Contentor:</span>
                    <span className="font-semibold text-gray-950">
                      {
                        contentores.filter((c) => c.numero?.includes("CONT-"))
                          .length
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Card de Informações sobre Cálculos Automáticos */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-green-500 mr-2">💰</span>
                  Cálculos Automáticos
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="p-2 bg-green-50 rounded border border-green-200">
                    <p className="font-medium text-green-700">
                      Frete e Comissão
                    </p>
                    <p className="text-xs text-gray-600">
                      Calculados automaticamente baseados no tipo de percurso e
                      destino
                    </p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded border border-blue-200">
                    <p className="font-medium text-blue-700">Seguro</p>
                    <p className="text-xs text-gray-600">
                      Prêmio calculado com base na categoria, abrangência e
                      valor da mercadoria
                    </p>
                  </div>
                  <div className="p-2 bg-purple-50 rounded border border-purple-200">
                    <p className="font-medium text-purple-700">Valor Total</p>
                    <p className="text-xs text-gray-600">
                      Soma automática de fretes, taxas, seguro e comissões
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Movimentação de Contentores */}
        {activeContentorForm === "movimentacao" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-green-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-green-500 text-white p-2 rounded-lg mr-2">
                  🚢
                </span>
                Movimentação e Histórico de Contentores
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contentor
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950">
                    <option value="">Selecione o contentor</option>
                    {contentores.map((contentor) => (
                      <option key={contentor.id} value={contentor.codigo}>
                        {contentor.numero} - {contentor.codigo}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Período
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950">
                    <option value="7dias">Últimos 7 dias</option>
                    <option value="30dias">Últimos 30 dias</option>
                    <option value="3meses">Últimos 3 meses</option>
                    <option value="personalizado">Personalizado</option>
                  </select>
                </div>
              </div>

              {/* Histórico de Movimentação */}
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-500 text-white p-2 rounded-lg">
                        📦
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          Carga Coletada
                        </p>
                        <p className="text-sm text-gray-600">
                          Origem: Porto Maputo • Hoje 08:30
                        </p>
                      </div>
                    </div>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                      Concluído
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-500 text-white p-2 rounded-lg">
                        🚛
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">Em Trânsito</p>
                        <p className="text-sm text-gray-600">
                          EN1 - Aproximando de Xai-Xai • Hoje 11:45
                        </p>
                      </div>
                    </div>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                      Em Andamento
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-500 text-white p-2 rounded-lg">
                        ⏸️
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          Parada Programada
                        </p>
                        <p className="text-sm text-gray-600">
                          Posto Combustível - Xai-Xai • Hoje 12:15
                        </p>
                      </div>
                    </div>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                      Parado
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-500 text-white p-2 rounded-lg">
                        🏭
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          Descarga no Cliente
                        </p>
                        <p className="text-sm text-gray-600">
                          Empresa A - Matola • Ontem 16:20
                        </p>
                      </div>
                    </div>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                      Concluído
                    </span>
                  </div>
                </div>
              </div>

              {/* Nova Movimentação */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Registrar Nova Movimentação
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Movimentação
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                      <option value="">Selecione</option>
                      <option value="carregamento">Carregamento</option>
                      <option value="descarga">Descarga</option>
                      <option value="transferencia">Transferência</option>
                      <option value="inspecao">Inspeção</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Local
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                      placeholder="Local da movimentação"
                    />
                  </div>
                </div>
                <button className="mt-4 px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-green-600 font-medium">
                  Registrar Movimentação
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Gráficos e Estatísticas */}
        {activeContentorForm === "graficos" && (
          <div className="space-y-6 text-gray-950">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-cyan-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-cyan-500 text-white p-2 rounded-lg mr-2">
                    📈
                  </span>
                  Dashboard de Contentores - Métricas e Estatísticas
                </h3>
              </div>
              <div className="p-6">
                {/* Métricas Rápidas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                    <p className="text-sm text-cyan-600 font-medium">
                      Contentores Ativos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {contentores.length}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">
                      Em Trânsito
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {
                        contentores.filter((c) => c.status === "em_transito")
                          .length
                      }
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600 font-medium">
                      Entregues
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {
                        contentores.filter((c) => c.status === "entregue")
                          .length
                      }
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-600 font-medium">
                      Peso Total (kg)
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {contentores
                        .reduce((sum, c) => sum + (c.pesoBruto || 0), 0)
                        .toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Gráfico de Status */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-cyan-500 mr-2">📊</span>
                      Status dos Contentores
                    </h4>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center w-full">
                        {/* Gráfico simples de pizza */}
                        <div className="flex justify-center mb-4">
                          <div className="relative w-32 h-32">
                            {/* Implementação de gráfico simplificada */}
                            <div className="w-full h-full rounded-full border-8 border-gray-300 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-2xl font-bold">
                                  {contentores.length}
                                </div>
                                <div className="text-sm text-gray-600">
                                  Total
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {Object.entries({
                            em_transito: "Em Trânsito",
                            coletada: "Coletada",
                            entregue: "Entregue",
                            planeada: "Planejada",
                          }).map(([status, label]) => {
                            const count = contentores.filter(
                              (c) => c.status === status
                            ).length;
                            const percentage =
                              contentores.length > 0
                                ? Math.round((count / contentores.length) * 100)
                                : 0;

                            return (
                              <div key={status} className="flex items-center">
                                <div
                                  className={`w-3 h-3 rounded mr-2 ${
                                    status === "em_transito"
                                      ? "bg-green-500"
                                      : status === "coletada"
                                      ? "bg-blue-500"
                                      : status === "entregue"
                                      ? "bg-purple-500"
                                      : "bg-gray-500"
                                  }`}
                                ></div>
                                <span>
                                  {label} ({percentage}%)
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-blue-500 mr-2">🚢</span>
                      Tipos de Carga
                    </h4>
                    <div className="h-64 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {Array.from(
                          new Set(contentores.map((c) => c.tipo))
                        ).map((tipo) => {
                          const count = contentores.filter(
                            (c) => c.tipo === tipo
                          ).length;
                          const percentage =
                            contentores.length > 0
                              ? Math.round((count / contentores.length) * 100)
                              : 0;

                          return (
                            <div
                              key={tipo}
                              className="flex items-start space-x-3"
                            >
                              <div className="w-3 h-3 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                  <span className="text-sm font-medium text-gray-900 break-words">
                                    {tipo}
                                  </span>
                                  <span className="text-sm text-gray-600 ml-2 whitespace-nowrap flex-shrink-0">
                                    {count}
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {percentage}%
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Relatórios */}
        {activeContentorForm === "relatorios" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-purple-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-purple-500 text-white p-2 rounded-lg mr-2">
                  📊
                </span>
                Relatórios de Contentores
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-blue-600 text-lg mb-2">📦</div>
                  <p className="font-medium text-gray-900">Inventário</p>
                  <p className="text-sm text-gray-600">Contentores activos</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-green-600 text-lg mb-2">🚢</div>
                  <p className="font-medium text-gray-900">Movimentação</p>
                  <p className="text-sm text-gray-600">Histórico de viagens</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-yellow-600 text-lg mb-2">⏱️</div>
                  <p className="font-medium text-gray-900">Tempos</p>
                  <p className="text-sm text-gray-600">Estatísticas de uso</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-red-600 text-lg mb-2">⚠️</div>
                  <p className="font-medium text-gray-900">Alertas</p>
                  <p className="text-sm text-gray-600">
                    Notificações do sistema
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-4">
                  Gerar Relatório Personalizado
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Relatório
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                      <option>Relatório de Utilização</option>
                      <option>Contentores por Status</option>
                      <option>Movimentação por Período</option>
                      <option>Alertas e Incidentes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Inicial
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Final
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    />
                  </div>
                </div>
                <button className="mt-4 px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-purple-600 font-medium">
                  Gerar Relatório
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GPSContentor;
