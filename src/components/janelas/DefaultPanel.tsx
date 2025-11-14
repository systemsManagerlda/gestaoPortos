import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

// Interfaces e tipos necessários
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface GpsTrackingData {
  _id: string;
  nomeEmpresa: string;
  nomeDispositivo: string;
  latitude: string;
  longitude: string;
  velocidade: string;
  velocidadeUnidade: string;
  data: string;
  hora: string;
  timestampGps: Date;
  satelites: string;
  precisaoHdop: string;
  statusConexao: string;
  ipDispositivo: string;
  sinalWifi: string;
  ultimaAtualizacao: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface VeiculoMonitorado {
  id: string;
  dispositivo: string;
  veiculo: string;
  placa: string;
  motorista: string;
  latitude: number;
  longitude: number;
  velocidade: number;
  endereco: string;
  status: "movimento" | "parado" | "sem_sinal" | "selagem";
  ultimaAtualizacao: string;
  ignicao: boolean;
  direcao: number;
  hodometro: number;
  satelites?: string;
  precisaoHdop?: string;
  ipDispositivo?: string;
  data: string;
  horario: string;
  evento: string;
  bateria?: number;
  companyId?: string;
}

interface PontoMapa {
  id: string;
  latitude: number;
  longitude: number;
  dispositivo: string;
  veiculo: string;
  placa: string;
  motorista: string;
  status: string;
  cor: string;
  velocidade: number;
  endereco: string;
  ultimaAtualizacao: string;
  ignicao: boolean;
  satelites?: string;
  precisaoHdop?: string;
  ipDispositivo?: string;
  data: string;
  horario: string;
  evento: string;
  bateria?: number;
}

// Constantes de configuração
const CONFIG = {
  GOOGLE_MAPS_API_KEY: "AIzaSyB0VrZcC8WessPrcTbBW7ofTNq3qg5WwVI",
  MAP: {
    containerStyle: {
      width: "100%",
      height: "400px",
    },
    defaultCenter: {
      lat: -25.915076,
      lng: 32.598496,
    },
    refreshInterval: 30000,
  },
} as const;

// Configuração da API
const API_CONFIG = {
  BASE_URL: "https://desktop-api-4f850b3f9733.herokuapp.com",
  ENDPOINTS: {
    GET_EVENT_LIST: "/getEventList",
  },
  HEADERS: {
    accessKeyId: "jUWlSv683sewVRdd",
    accessSecret: "n08Qylt2I6pfItyxc6qm6hHhdviwvDJ2",
  },
} as const;

// Utilitários
class GpsUtils {
  static determinarStatus(
    velocidade: number,
    deviceStatus: string = ""
  ): "movimento" | "parado" | "sem_sinal" | "selagem" {
    if (!deviceStatus) return "sem_sinal";
    if (velocidade > 0) return "movimento";
    return "parado";
  }

  static getStatusConfig(status: string) {
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
      excesso_velocidade: {
        bg: "bg-red-500/20",
        text: "text-red-400",
        border: "border-red-500/30",
        cor: "#ef4444",
        texto: "🚨 Excesso Velocidade",
        icon: "🚨",
      },
      ignicao: {
        bg: "bg-blue-500/20",
        text: "text-blue-400",
        border: "border-blue-500/30",
        cor: "#3b82f6",
        texto: "🔒 Evento de Segurança",
        icon: "🔒",
      },
      selagem: {
        bg: "bg-purple-500/20",
        text: "text-purple-400",
        border: "border-purple-500/30",
        cor: "#a855f7",
        texto: "🏷️ Selagem Concluída",
        icon: "🏷️",
      },
      outro: {
        bg: "bg-gray-500/20",
        text: "text-gray-400",
        border: "border-gray-500/30",
        cor: "#6b7280",
        texto: "📌 Outro Evento",
        icon: "📌",
      },
    };

    return configs[status as keyof typeof configs] || configs.outro;
  }

  static getVelocidadeColor(velocidade: number): string {
    if (velocidade === 0) return "text-gray-400";
    if (velocidade <= 60) return "text-green-400";
    if (velocidade <= 80) return "text-yellow-400";
    return "text-red-400";
  }

  static formatarUltimaAtualizacao(timestamp: number): string {
    const agora = new Date().getTime();
    const diferenca = agora - timestamp;
    const minutos = Math.floor(diferenca / (1000 * 60));

    if (minutos < 1) return "agora mesmo";
    if (minutos === 1) return "há 1 minuto";
    if (minutos < 60) return `há ${minutos} minutos`;

    const horas = Math.floor(minutos / 60);
    if (horas === 1) return "há 1 hora";
    if (horas < 24) return `há ${horas} horas`;

    const dias = Math.floor(horas / 24);
    if (dias === 1) return "há 1 dia";
    return `há ${dias} dias`;
  }

  static getDefaultIcon(status: string): string {
    const icons = {
      movimento: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
      parado: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
      sem_sinal: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      excesso_velocidade: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      ignicao: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      selagem: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
      outro: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
    };
    return (
      icons[status as keyof typeof icons] ||
      "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    );
  }

  static formatarData(timestamp: number): { data: string; horario: string } {
    const date = new Date(timestamp);
    const data = date.toISOString().split("T")[0];
    const horario = date.toLocaleTimeString("pt-BR");
    return { data, horario };
  }

  static traduzirEvento(eventName: string): string {
    const traducoes: { [key: string]: string } = {
      // Eventos em chinês
      '刷卡施封成功事件': 'Selagem com Cartão Concluída',
      '锁杆打开事件': 'Tranca Aberta',
      
      // Eventos em inglês
      'ignition_on': 'Ignição Ligada',
      'ignition_off': 'Ignição Desligada',
      'movement': 'Em Movimento',
      'stop': 'Parado',
      'overspeed': 'Excesso de Velocidade',
      'sos_alarm': 'Alarme SOS',
      'power_off': 'Desligamento',
      'vibration_alarm': 'Alarme de Vibração',
      'fence_in': 'Dentro da Área',
      'fence_out': 'Fora da Área',
      
      // Eventos genéricos
      'movimento': 'Em Movimento',
      'parado': 'Parado',
      'excesso_velocidade': 'Excesso de Velocidade',
      'ignicao': 'Ignição',
      'selagem': 'Selagem',
      'outro': 'Outro Evento'
    };
    
    return traducoes[eventName] || eventName;
  }
}

// Serviço da API
class ApiService {
  static async getEventList(params: {
    curPage: number;
    pageSize: number;
    deviceCodes?: string[];
    startTime?: number;
    endTime?: number;
    eventName?: string;
    eventId?: string;
    eventType?: number;
    protocolTypeEncode?: string;
  }) {
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_EVENT_LIST}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accessKeyId: API_CONFIG.HEADERS.accessKeyId,
            accessSecret: API_CONFIG.HEADERS.accessSecret,
          },
          body: JSON.stringify(params),
        }
      );

      if (!response.ok) {
        throw new Error(`API retornou status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      throw error;
    }
  }
}

// Conversor de dados
class GpsDataConverter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static converterApiParaVeiculos(apiData: any[]): VeiculoMonitorado[] {
    if (!apiData || apiData.length === 0) {
      return [];
    }

    return apiData.map((item, index) => {
      const { data, horario } = GpsUtils.formatarData(
        item.gpsTime || item.upTime
      );

      const veiculo: VeiculoMonitorado = {
        id: item.deviceCode || `veiculo-${index}`,
        dispositivo: item.deviceCode || "Dispositivo Desconhecido",
        veiculo: item.deviceName || `Veículo ${item.deviceCode || index}`,
        placa:
          this.extrairPlacaDoDeviceName(item.deviceName) ||
          `PLACA-${item.deviceCode?.slice(-4) || index}`,
        motorista: "Motorista não identificado",
        latitude: parseFloat(item.lat) || 0,
        longitude: parseFloat(item.lng) || 0,
        velocidade: 0, // A API não mostrou campo de velocidade nos dados
        endereco: "Localização GPS",
        status: this.mapearEventoParaStatus(item.eventName),
        evento: item.eventName || "outro",
        ultimaAtualizacao: GpsUtils.formatarUltimaAtualizacao(
          item.gpsTime || item.upTime
        ),
        ignicao: this.verificarIgnição(item.deviceStatus),
        direcao: 0,
        hodometro: 0,
        data: data,
        horario: horario,
        bateria: item.battery,
        companyId: item.companyId,
      };

      return veiculo;
    });
  }

  private static mapearEventoParaStatus(eventName: string): "movimento" | "parado" | "sem_sinal" | "selagem" {
    if (!eventName) return "parado";

    if (eventName === "刷卡施封成功事件") 
      return "selagem";
    if (eventName === "锁杆打开事件") 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return "ignicao" as any;

    return "parado";
  }

  private static extrairPlacaDoDeviceName(deviceName: string): string {
    if (!deviceName) return "";
    // Tenta extrair placa do nome do dispositivo
    const match = deviceName.match(/[A-Z]{3}\s?\d{4}\s?[A-Z]{0,2}/);
    return match ? match[0].replace(/\s/g, "") : "";
  }

  private static verificarIgnição(deviceStatus: string): boolean {
    if (!deviceStatus) return false;
    return (
      deviceStatus.includes("status_151") ||
      deviceStatus.includes("ignition_on")
    );
  }

  static converterParaPontosMapa(veiculos: VeiculoMonitorado[]): PontoMapa[] {
    return veiculos.map((veiculo) => ({
      id: veiculo.id,
      latitude: veiculo.latitude,
      longitude: veiculo.longitude,
      dispositivo: veiculo.dispositivo,
      veiculo: veiculo.veiculo,
      placa: veiculo.placa,
      motorista: veiculo.motorista,
      status: veiculo.status,
      cor: GpsUtils.getStatusConfig(veiculo.status).cor,
      velocidade: veiculo.velocidade,
      endereco: veiculo.endereco,
      ultimaAtualizacao: veiculo.ultimaAtualizacao,
      ignicao: veiculo.ignicao,
      data: veiculo.data,
      horario: veiculo.horario,
      evento: veiculo.evento,
      bateria: veiculo.bateria,
    }));
  }
}

// Dados mock para demonstração (fallback)
const dadosMock: VeiculoMonitorado[] = [
  {
    id: "1",
    dispositivo: "GPS-MZ-001",
    veiculo: "Caminhão Truck - ADM456MP",
    placa: "ADM456MP",
    motorista: "Fernando Matola",
    data: "2025-01-17",
    horario: "14:30:25",
    latitude: -25.915076,
    longitude: 32.598496,
    velocidade: 68,
    endereco: "Maputo, Mozambique",
    ignicao: true,
    status: "movimento",
    evento: "刷卡施封成功事件",
    ultimaAtualizacao: "há 5 minutos",
    direcao: 0,
    hodometro: 0,
    bateria: 85,
  },
  {
    id: "2",
    dispositivo: "755078869333",
    veiculo: "MOZTGP508250521",
    placa: "MOZ508",
    motorista: "Motorista não identificado",
    data: "2025-01-17",
    horario: "13:15:42",
    latitude: -25.915076,
    longitude: 32.598496,
    velocidade: 0,
    endereco: "Maputo, Mozambique",
    ignicao: false,
    status: "selagem",
    evento: "锁杆打开事件",
    ultimaAtualizacao: "há 2 minutos",
    direcao: 0,
    hodometro: 0,
    bateria: 49,
  },
];

// Componente do Mapa
interface MapaMonitoramentoProps {
  pontosMapa: PontoMapa[];
  pontoSelecionado: PontoMapa | null;
  setPontoSelecionado: (ponto: PontoMapa | null) => void;
  useCustomIcons: boolean;
}

const MapaMonitoramento: React.FC<MapaMonitoramentoProps> = ({
  pontosMapa,
  pontoSelecionado,
  setPontoSelecionado,
  useCustomIcons,
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      console.log('✅ Google Maps carregado com sucesso');
      setMap(map);
      setIsLoaded(true);
      setLoadError(null);

      // Ajustar zoom para mostrar todos os marcadores
      setTimeout(() => {
        if (pontosMapa.length > 0 && map) {
          const bounds = new window.google.maps.LatLngBounds();
          pontosMapa.forEach((ponto) => {
            if (ponto.latitude && ponto.longitude) {
              bounds.extend(
                new window.google.maps.LatLng(ponto.latitude, ponto.longitude)
              );
            }
          });

          if (!bounds.isEmpty()) {
            map.fitBounds(bounds);

            // Se há apenas um ponto, dar um zoom mais próximo
            if (pontosMapa.length === 1) {
              setTimeout(() => {
                if (map) map.setZoom(15);
              }, 500);
            }
          }
        } else if (pontosMapa.length === 0 && map) {
          // Se não há pontos, centralizar na posição padrão
          map.setCenter(CONFIG.MAP.defaultCenter);
          map.setZoom(10);
        }
      }, 1000);
    },
    [pontosMapa]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
    setIsLoaded(false);
  }, []);

  const onError = useCallback((error: Error) => {
    console.error('❌ Erro ao carregar Google Maps:', error);
    setLoadError('Falha ao carregar o Google Maps');
  }, []);

  const centralizarMapa = useCallback(() => {
    if (map && pontosMapa.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      pontosMapa.forEach((ponto) => {
        if (ponto.latitude && ponto.longitude) {
          bounds.extend(
            new window.google.maps.LatLng(ponto.latitude, ponto.longitude)
          );
        }
      });

      if (!bounds.isEmpty()) {
        map.fitBounds(bounds);
      }
    } else if (map) {
      map.setCenter(CONFIG.MAP.defaultCenter);
      map.setZoom(10);
    }
  }, [map, pontosMapa]);

  const getMarkerIcon = useCallback(
    (ponto: PontoMapa) => {
      if (!useCustomIcons) {
        return {
          url: GpsUtils.getDefaultIcon(ponto.status),
          scaledSize: new window.google.maps.Size(32, 32),
        };
      }
      return undefined;
    },
    [useCustomIcons]
  );

  // Elemento de loading personalizado
  const loadingElement = (
    <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center border border-gray-300">
      <div className="text-center text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
        <p>Carregando Google Maps...</p>
      </div>
    </div>
  );

  // Elemento de erro
  if (loadError) {
    return (
      <div className="bg-red-50 rounded-xl h-64 flex items-center justify-center border border-red-200">
        <div className="text-center text-red-700">
          <div className="text-2xl mb-2">❌</div>
          <p className="font-medium">Erro ao carregar mapa</p>
          <p className="text-sm mt-1">{loadError}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-3 bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
          >
            Recarregar Página
          </button>
        </div>
      </div>
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={CONFIG.GOOGLE_MAPS_API_KEY}
      loadingElement={loadingElement}
      onError={onError}
    >
      <div className="relative">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={centralizarMapa}
            className="bg-white text-gray-700 px-3 py-2 rounded-lg shadow-md hover:bg-gray-50 transition-all flex items-center text-sm font-medium border border-gray-300"
            title="Centralizar mapa em todos os veículos"
          >
            <span className="mr-2">🎯</span>
            Centralizar
          </button>
        </div>

        <GoogleMap
          mapContainerStyle={CONFIG.MAP.containerStyle}
          center={CONFIG.MAP.defaultCenter}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true,
            styles: [
              {
                elementType: "geometry",
                stylers: [{ color: "#f5f5f5" }],
              },
              {
                elementType: "labels.text.stroke",
                stylers: [{ color: "#f5f5f5" }],
              },
              {
                elementType: "labels.text.fill",
                stylers: [{ color: "#746855" }],
              },
            ],
          }}
        >
          {isLoaded &&
            pontosMapa.map((ponto) => (
              <Marker
                key={ponto.id}
                position={{ lat: ponto.latitude, lng: ponto.longitude }}
                onClick={() => setPontoSelecionado(ponto)}
                icon={getMarkerIcon(ponto)}
              />
            ))}

          {isLoaded && pontoSelecionado && (
            <InfoWindow
              position={{
                lat: pontoSelecionado.latitude,
                lng: pontoSelecionado.longitude,
              }}
              onCloseClick={() => setPontoSelecionado(null)}
            >
              <div className="bg-white p-4 rounded-lg max-w-xs border border-gray-200 shadow-lg">
                <div className="flex items-center mb-3">
                  <div
                    className="w-4 h-4 rounded-full mr-3 animate-pulse"
                    style={{ backgroundColor: pontoSelecionado.cor }}
                  ></div>
                  <h3 className="font-bold text-gray-900">
                    {pontoSelecionado.veiculo}
                  </h3>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Placa:</span>
                    <span className="font-medium text-gray-900">
                      {pontoSelecionado.placa}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dispositivo:</span>
                    <span className="text-gray-900">
                      {pontoSelecionado.dispositivo}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium">
                      {GpsUtils.getStatusConfig(pontoSelecionado.status).texto}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Evento:</span>
                    <div className="text-right">
                      <span className="font-medium block">
                        {GpsUtils.traduzirEvento(pontoSelecionado.evento)}
                      </span>
                      <span className="text-xs text-gray-500 block">
                        {pontoSelecionado.evento}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ignição:</span>
                    <span
                      className={`font-medium ${
                        pontoSelecionado.ignicao
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {pontoSelecionado.ignicao ? "Ligada" : "Desligada"}
                    </span>
                  </div>
                  {pontoSelecionado.bateria && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bateria:</span>
                      <span
                        className={`font-medium ${
                          pontoSelecionado.bateria > 50
                            ? "text-green-600"
                            : pontoSelecionado.bateria > 20
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {pontoSelecionado.bateria}%
                      </span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="text-xs text-gray-500">Coordenadas:</div>
                    <div className="text-xs text-gray-700 font-mono">
                      {pontoSelecionado.latitude.toFixed(6)},{" "}
                      {pontoSelecionado.longitude.toFixed(6)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Atualizado: {pontoSelecionado.ultimaAtualizacao}
                    </div>
                  </div>
                </div>

                <button
                  className="mt-3 w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
                  onClick={() => {
                    window.open(
                      `https://www.google.com/maps?q=${pontoSelecionado.latitude},${pontoSelecionado.longitude}`,
                      "_blank"
                    );
                  }}
                >
                  📍 Abrir no Google Maps
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

// Componente Principal DefaultPanel
export const DefaultPanel = () => {
  const [pontosMapa, setPontosMapa] = useState<PontoMapa[]>([]);
  const [pontoSelecionado, setPontoSelecionado] = useState<PontoMapa | null>(
    null
  );
  const [useCustomIcons, setUseCustomIcons] = useState(true);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log('🔍 Estado atual:', {
    pontosMapa: pontosMapa.length,
    loading,
    error,
    hasGoogleMaps: typeof google !== 'undefined'
  });

  // Função para buscar dados da API
  const fetchDataFromApi = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        curPage: 1,
        pageSize: 100,
        deviceCodes: ["755078869333"],
      };

      console.log("🔄 Buscando dados da API...");

      const response = await ApiService.getEventList(params);

      console.log("✅ Resposta da API recebida:", response);

      if (response && response.returnCode === "200") {
        const data = response.data || [];

        if (data.length > 0) {
          console.log("📊 Dados convertidos:", data);
          const veiculos = GpsDataConverter.converterApiParaVeiculos(data);
          const pontos = GpsDataConverter.converterParaPontosMapa(veiculos);
          setPontosMapa(pontos);
          setError(null);
        } else {
          console.warn("⚠️ API retornou sucesso mas sem dados");
          setError("Nenhum dado disponível na API");
          // Usa dados mock como fallback
          const pontos = GpsDataConverter.converterParaPontosMapa(dadosMock);
          setPontosMapa(pontos);
        }
      } else {
        throw new Error(response?.returnMsg || "Erro na API");
      }
    } catch (err) {
      console.error("💥 Erro ao buscar dados:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Erro de conexão com a API";
      setError(errorMessage);

      // Fallback para dados mock
      const pontos = GpsDataConverter.converterParaPontosMapa(dadosMock);
      setPontosMapa(pontos);
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar dados inicialmente
  useEffect(() => {
    fetchDataFromApi();
  }, [fetchDataFromApi]);

  // Atualização automática
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchDataFromApi();
    }, CONFIG.MAP.refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, fetchDataFromApi]);

  const handleAtualizarMapa = () => {
    fetchDataFromApi();
  };

  const veiculosEmMovimento = useMemo(
    () => pontosMapa.filter((p) => p.status === "movimento").length,
    [pontosMapa]
  );

  const veiculosParados = useMemo(
    () => pontosMapa.filter((p) => p.status === "parado").length,
    [pontosMapa]
  );

  const veiculosSelagem = useMemo(
    () => pontosMapa.filter((p) => p.status === "selagem").length,
    [pontosMapa]
  );

  const nivelBateriaMedio = useMemo(() => {
    if (pontosMapa.length === 0) return 0;
    const total = pontosMapa.reduce(
      (sum, ponto) => sum + (ponto.bateria || 0),
      0
    );
    return Math.round(total / pontosMapa.length);
  }, [pontosMapa]);

  // Calcular estatísticas de eventos
  const estatisticasEventos = useMemo(() => {
    const eventos = pontosMapa.reduce((acc, ponto) => {
      acc[ponto.evento] = (acc[ponto.evento] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return eventos;
  }, [pontosMapa]);

  return (
    <div className="h-full flex flex-col">
      {/* Header do Painel */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-2 rounded-lg mr-3">
            🖥️
          </span>
          Painel Central - Monitoramento GPS
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Sistema de rastreamento em tempo real com {pontosMapa.length} veículos
          monitorados
          {loading && (
            <span className="ml-2 text-blue-500">(Atualizando...)</span>
          )}
        </p>

        {error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">
              ⚠️ {error} - Usando dados de demonstração
            </p>
          </div>
        )}
      </div>

      {/* Conteúdo padrão */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* Mapa GPS Ativo */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900 flex items-center">
                <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-2">
                  📍
                </span>
                Mapa de Rastreamento em Tempo Real
              </h3>
              <div className="flex gap-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="mr-2 h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-600">Auto</span>
                </div>
                <button
                  onClick={handleAtualizarMapa}
                  disabled={loading}
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 flex items-center disabled:opacity-50"
                >
                  <span className="mr-1">🔄</span>
                  {loading ? "Atualizando..." : "Atualizar"}
                </button>
                <button
                  onClick={() => setUseCustomIcons(!useCustomIcons)}
                  className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-700 flex items-center"
                >
                  <span className="mr-1">{useCustomIcons ? "⚫" : "🎨"}</span>
                  Ícones
                </button>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-gray-300 shadow-md">
              <MapaMonitoramento
                pontosMapa={pontosMapa}
                pontoSelecionado={pontoSelecionado}
                setPontoSelecionado={setPontoSelecionado}
                useCustomIcons={useCustomIcons}
              />
            </div>

            {/* Legenda do Mapa */}
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                <span className="text-gray-600">Em Movimento</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                <span className="text-gray-600">Parado</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                <span className="text-gray-600">Segurança</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-1"></div>
                <span className="text-gray-600">Selagem</span>
              </div>
            </div>

            {/* Informações do veículo selecionado */}
            {pontoSelecionado && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 text-sm mb-2">
                  Veículo Selecionado
                </h4>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div>
                    <span className="text-blue-700">Placa:</span>
                    <p className="font-medium">{pontoSelecionado.placa}</p>
                  </div>
                  <div>
                    <span className="text-blue-700">Dispositivo:</span>
                    <p className="font-medium">
                      {pontoSelecionado.dispositivo}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-blue-700">Status:</span>
                    <p className="font-medium">
                      {GpsUtils.getStatusConfig(pontoSelecionado.status).texto}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-blue-700">Evento:</span>
                    <p className="font-medium">
                      {GpsUtils.traduzirEvento(pontoSelecionado.evento)}
                    </p>
                  </div>
                  {pontoSelecionado.bateria && (
                    <div className="col-span-2">
                      <span className="text-blue-700">Bateria:</span>
                      <p
                        className={`font-medium ${
                          pontoSelecionado.bateria > 50
                            ? "text-green-600"
                            : pontoSelecionado.bateria > 20
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {pontoSelecionado.bateria}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Relatórios Rápidos */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-green-100 text-blue-600 p-2 rounded-lg mr-2">
                📊
              </span>
              Relatórios Rápidos
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <span className="text-blue-600">🚛</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Veículos Monitorados
                  </span>
                </div>
                <span className="font-bold text-blue-600 text-lg">
                  {pontosMapa.length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <span className="text-green-600">🟢</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Em Movimento
                  </span>
                </div>
                <span className="font-bold text-gray-700 text-lg">
                  {veiculosEmMovimento}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                    <span className="text-yellow-600">🟡</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Veículos Parados
                  </span>
                </div>
                <span className="font-bold text-gray-700 text-lg">
                  {veiculosParados}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <span className="text-purple-600">🏷️</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Selagens Concluídas
                  </span>
                </div>
                <span className="font-bold text-gray-700 text-lg">
                  {veiculosSelagem}
                </span>
              </div>
              {nivelBateriaMedio > 0 && (
                <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-lg mr-3">
                      <span className="text-purple-600">🔋</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      Bateria Média
                    </span>
                  </div>
                  <span
                    className={`font-bold text-lg ${
                      nivelBateriaMedio > 50
                        ? "text-green-600"
                        : nivelBateriaMedio > 20
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {nivelBateriaMedio}%
                  </span>
                </div>
              )}
            </div>

            {/* Estatísticas de Eventos */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-700 mb-3 text-sm">Eventos Recentes</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {Object.entries(estatisticasEventos)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 4)
                  .map(([evento, count]) => (
                    <div key={evento} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-xs font-medium text-gray-600">
                          {GpsUtils.traduzirEvento(evento)}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-gray-700 bg-white px-2 py-1 rounded">
                        {count}
                      </span>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Lista de Veículos */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-700 mb-3 text-sm">
                Veículos Ativos
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {pontosMapa.slice(0, 5).map((ponto) => (
                  <div
                    key={ponto.id}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => setPontoSelecionado(ponto)}
                  >
                    <div className="flex items-center">
                      <div
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: ponto.cor }}
                      ></div>
                      <div>
                        <div className="text-xs font-medium text-gray-600">
                          {ponto.placa}
                        </div>
                        <div className="text-xs text-gray-500">
                          {ponto.dispositivo}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-gray-700">
                        {GpsUtils.traduzirEvento(ponto.evento)}
                      </div>
                      <div className="text-xs text-gray-500">{ponto.ultimaAtualizacao}</div>
                      <div className="text-xs text-gray-400 mt-1">{ponto.evento}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alertas e Status */}
          <div className="lg:col-span-2 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200 p-5 shadow-sm">
            <h3 className="font-bold text-gray-700 mb-4 flex items-center">
              <span className="bg-yellow-100 text-yellow-600 p-2 rounded-lg mr-2">
                ⚠️
              </span>
              Status da Frota em Tempo Real
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-green-200 shadow-sm">
                <span className="text-green-600 text-xl">🟢</span>
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    {veiculosEmMovimento} em movimento
                  </span>
                  <p className="text-xs text-gray-500">Operação normal</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-yellow-200 shadow-sm">
                <span className="text-yellow-600 text-xl">🟡</span>
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    {veiculosParados} veículos parados
                  </span>
                  <p className="text-xs text-gray-500">Em espera ou descarga</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-purple-200 shadow-sm">
                <span className="text-purple-600 text-xl">🏷️</span>
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    {veiculosSelagem} selagens
                  </span>
                  <p className="text-xs text-gray-500">Operações concluídas</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-blue-200 shadow-sm">
                <span className="text-blue-600 text-xl">ℹ️</span>
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    Atualizado agora
                  </span>
                  <p className="text-xs text-gray-500">
                    {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};