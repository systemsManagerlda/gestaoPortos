"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import Head from "next/head";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Layout from "@/components/layout/Layout";

// Interfaces baseadas no segundo código
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
  status: 'movimento' | 'parado' | 'sem_sinal';
  ultimaAtualizacao: string;
  ignicao: boolean;
  direcao: number;
  hodometro: number;
  satelites?: string;
  precisaoHdop?: string;
  ipDispositivo?: string;
  data: string;
  horario: string;
  evento: 'movimento' | 'parado' | 'excesso_velocidade' | 'ignicao' | 'outro';
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
}

// Constantes de configuração
const CONFIG = {
  API_BASE_URL: 'https://desktop-api-4f850b3f9733.herokuapp.com',
  GOOGLE_MAPS_API_KEY: 'AIzaSyB5Y1PUBVawvwuSUZEipJVLrEX9lV6Yn_0',
  MAP: {
    containerStyle: {
      width: "100%",
      height: "500px",
    },
    defaultCenter: {
      lat: -8.838333,
      lng: 13.234444,
    },
    refreshInterval: 10000, // 10 segundos
  },
} as const;

// Serviços de API
class GpsApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetchRegistrosGps(): Promise<GpsTrackingData[]> {
    const response = await fetch(`${this.baseUrl}/registrosGps`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar dados GPS');
    }
    
    return response.json();
  }
}

// Utilitários
class GpsUtils {
  static determinarStatus(velocidade: number, satelites: string = '0'): 'movimento' | 'parado' | 'sem_sinal' {
    const numSatelites = parseInt(satelites) || 0;
    
    if (numSatelites === 0) return 'sem_sinal';
    if (velocidade > 0) return 'movimento';
    return 'parado';
  }

  static getStatusConfig(status: string) {
    const configs = {
      movimento: { 
        bg: 'bg-green-500/20', 
        text: 'text-green-400', 
        border: 'border-green-500/30', 
        cor: '#10b981',
        texto: '🟢 Em Movimento',
        icon: '🟢'
      },
      parado: { 
        bg: 'bg-yellow-500/20', 
        text: 'text-yellow-400', 
        border: 'border-yellow-500/30', 
        cor: '#f59e0b',
        texto: '🟡 Parado',
        icon: '🟡'
      },
      sem_sinal: { 
        bg: 'bg-red-500/20', 
        text: 'text-red-400', 
        border: 'border-red-500/30', 
        cor: '#ef4444',
        texto: '🔴 Sem Sinal',
        icon: '🔴'
      },
      excesso_velocidade: {
        bg: 'bg-red-500/20',
        text: 'text-red-400',
        border: 'border-red-500/30',
        cor: '#ef4444',
        texto: '🚨 Excesso Velocidade',
        icon: '🚨'
      },
      ignicao: {
        bg: 'bg-blue-500/20',
        text: 'text-blue-400',
        border: 'border-blue-500/30',
        cor: '#3b82f6',
        texto: '🔑 Ignição',
        icon: '🔑'
      },
      outro: {
        bg: 'bg-purple-500/20',
        text: 'text-purple-400',
        border: 'border-purple-500/30',
        cor: '#a855f7',
        texto: '📌 Outro Evento',
        icon: '📌'
      }
    };

    return configs[status as keyof typeof configs] || configs.outro;
  }

  static getVelocidadeColor(velocidade: number): string {
    if (velocidade === 0) return 'text-gray-400';
    if (velocidade <= 60) return 'text-green-400';
    if (velocidade <= 80) return 'text-yellow-400';
    return 'text-red-400';
  }

  static formatarUltimaAtualizacao(data: Date): string {
    const agora = new Date();
    const diferenca = agora.getTime() - new Date(data).getTime();
    const minutos = Math.floor(diferenca / (1000 * 60));
    
    if (minutos < 1) return 'agora mesmo';
    if (minutos === 1) return 'há 1 minuto';
    if (minutos < 60) return `há ${minutos} minutos`;
    
    const horas = Math.floor(minutos / 60);
    if (horas === 1) return 'há 1 hora';
    if (horas < 24) return `há ${horas} horas`;
    
    const dias = Math.floor(horas / 24);
    if (dias === 1) return 'há 1 dia';
    return `há ${dias} dias`;
  }

  static createMarkerIcon(cor: string, status: string): google.maps.Icon | undefined {
    if (typeof window === 'undefined' || !window.google) {
      return undefined;
    }

    let symbol = '';
    
    switch (status) {
      case 'movimento':
        symbol = 'M16,8 L20,12 L16,16 L12,12 Z';
        break;
      case 'parado':
        symbol = 'M12,12 L20,12 L20,20 L12,20 Z';
        break;
      case 'sem_sinal':
        symbol = 'M16,8 L20,16 L16,14 L12,16 Z';
        break;
      case 'excesso_velocidade':
        symbol = 'M16,8 L20,18 L16,16 L12,18 Z';
        break;
      case 'ignicao':
        symbol = 'M16,10 C13,10 11,12 11,15 C11,18 13,20 16,20 C19,20 21,18 21,15 C21,12 19,10 16,10 Z';
        break;
      default:
        symbol = 'M16,10 C13,10 11,12 11,15 C11,18 13,20 16,20 C19,20 21,18 21,15 C21,12 19,10 16,10 Z';
    }

    const svgString = `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" fill="${cor}" stroke="white" stroke-width="2"/>
        <path d="${symbol}" fill="white" stroke="white" stroke-width="1"/>
      </svg>
    `;

    return {
      url: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`,
      scaledSize: new window.google.maps.Size(32, 32),
      anchor: new window.google.maps.Point(16, 16)
    };
  }

  static getDefaultIcon(status: string): string {
    const icons = {
      movimento: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      parado: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      sem_sinal: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      excesso_velocidade: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      ignicao: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      outro: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
    };
    return icons[status as keyof typeof icons] || 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
  }

  static getIgnicaoStatus(ignicao: string): boolean {
    return ignicao === 'ligada';
  }
}

// Conversor de dados
class GpsDataConverter {
  private static veiculos = ['Caminhão Truck', 'Caminhão Carreta', 'Caminhão Baú', 'Van de Entrega', 'Pickup'];
  private static placas = ['AB123CD', 'EF456GH', 'IJ789KL', 'MN012OP', 'QR345ST'];
  private static motoristas = ['João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Oliveira', 'Carlos Fernandes'];

  static converterParaVeiculos(gpsData: GpsTrackingData[]): VeiculoMonitorado[] {
    return gpsData.map((registro, index) => {
      const velocidade = parseFloat(registro.velocidade) || 0;
      const status = GpsUtils.determinarStatus(velocidade, registro.satelites);
      
      return {
        id: registro._id || `gps-${index}`,
        dispositivo: registro.nomeDispositivo,
        veiculo: this.veiculos[index % this.veiculos.length] || `Veículo ${index + 1}`,
        placa: this.placas[index % this.placas.length] || 'SEMPLACA',
        motorista: this.motoristas[index % this.motoristas.length] || 'Motorista Não Identificado',
        latitude: parseFloat(registro.latitude) || 0,
        longitude: parseFloat(registro.longitude) || 0,
        velocidade: velocidade,
        endereco: 'Endereço em atualização...',
        status: status,
        ultimaAtualizacao: GpsUtils.formatarUltimaAtualizacao(registro.updatedAt || registro.createdAt),
        ignicao: velocidade > 0,
        direcao: 0,
        hodometro: 0,
        satelites: registro.satelites,
        precisaoHdop: registro.precisaoHdop,
        ipDispositivo: registro.ipDispositivo,
        data: registro.data,
        horario: registro.hora,
        evento: status === 'movimento' ? 'movimento' : 
                status === 'parado' ? 'parado' : 'outro'
      };
    });
  }

  static converterParaPontosMapa(veiculos: VeiculoMonitorado[]): PontoMapa[] {
    return veiculos.map(veiculo => ({
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
      satelites: veiculo.satelites,
      precisaoHdop: veiculo.precisaoHdop,
      ipDispositivo: veiculo.ipDispositivo,
      data: veiculo.data,
      horario: veiculo.horario,
      evento: veiculo.evento
    }));
  }
}

// Hooks personalizados
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useGpsData = (autoRefresh: boolean) => {
  const [gpsData, setGpsData] = useState<GpsTrackingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiService = useMemo(() => new GpsApiService(CONFIG.API_BASE_URL), []);

  const fetchGpsData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiService.fetchRegistrosGps();
      setGpsData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      console.error('Erro ao buscar dados GPS:', err);
    } finally {
      setLoading(false);
    }
  }, [apiService]);

  useEffect(() => {
    fetchGpsData();

    if (autoRefresh) {
      const interval = setInterval(fetchGpsData, CONFIG.MAP.refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, fetchGpsData]);

  return { gpsData, loading, error, refetch: fetchGpsData };
};

// Componente do Mapa Google Maps
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
  useCustomIcons 
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    setIsLoaded(true);
    
    // Ajustar zoom para mostrar todos os marcadores
    setTimeout(() => {
      if (pontosMapa.length > 0 && map) {
        const bounds = new window.google.maps.LatLngBounds();
        pontosMapa.forEach(ponto => {
          if (ponto.latitude && ponto.longitude) {
            bounds.extend(new window.google.maps.LatLng(ponto.latitude, ponto.longitude));
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
      }
    }, 1000);
  }, [pontosMapa]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const centralizarMapa = useCallback(() => {
    if (map && pontosMapa.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      pontosMapa.forEach(ponto => {
        if (ponto.latitude && ponto.longitude) {
          bounds.extend(new window.google.maps.LatLng(ponto.latitude, ponto.longitude));
        }
      });
      
      if (!bounds.isEmpty()) {
        map.fitBounds(bounds);
      }
    } else if (map) {
      // Se não há pontos, centralizar na localização padrão
      map.setCenter(CONFIG.MAP.defaultCenter);
      map.setZoom(10);
    }
  }, [map, pontosMapa]);

  const getMarkerIcon = useCallback((ponto: PontoMapa) => {
    if (!isLoaded) return undefined;
    
    if (useCustomIcons) {
      return GpsUtils.createMarkerIcon(ponto.cor, ponto.status);
    } else {
      return {
        url: GpsUtils.getDefaultIcon(ponto.status),
        scaledSize: new window.google.maps.Size(32, 32)
      };
    }
  }, [useCustomIcons, isLoaded]);

  return (
    <LoadScript 
      googleMapsApiKey={CONFIG.GOOGLE_MAPS_API_KEY}
      loadingElement={
        <div className="bg-gray-700 rounded-lg h-96 flex items-center justify-center border border-gray-600">
          <div className="text-center text-gray-400">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>Carregando Google Maps...</p>
          </div>
        </div>
      }
    >
      <div className="relative">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button 
            onClick={centralizarMapa}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-lg flex items-center text-sm font-medium"
            title="Centralizar mapa em todos os veículos"
          >
            <span className="mr-2">🎯</span>
            Centralizar Mapa
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
                "elementType": "geometry",
                "stylers": [{ "color": "#242f3e" }]
              },
              {
                "elementType": "labels.text.stroke",
                "stylers": [{ "color": "#242f3e" }]
              },
              {
                "elementType": "labels.text.fill",
                "stylers": [{ "color": "#746855" }]
              },
              {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [{ "color": "#d59563" }]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{ "color": "#d59563" }]
              },
              {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{ "color": "#263c3f" }]
              },
              {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [{ "color": "#6b9a76" }]
              },
              {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{ "color": "#38414e" }]
              },
              {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [{ "color": "#212a37" }]
              },
              {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [{ "color": "#9ca5b3" }]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{ "color": "#746855" }]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{ "color": "#1f2835" }]
              },
              {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [{ "color": "#f3d19c" }]
              },
              {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{ "color": "#17263c" }]
              },
              {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{ "color": "#515c6d" }]
              },
              {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [{ "color": "#17263c" }]
              }
            ]
          }}
        >
          {isLoaded && pontosMapa.map((ponto) => (
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
                lng: pontoSelecionado.longitude
              }}
              onCloseClick={() => setPontoSelecionado(null)}
            >
              <div className="bg-gray-900 text-white p-4 rounded-lg max-w-xs border border-gray-600 shadow-xl">
                <div className="flex items-center mb-3">
                  <div 
                    className="w-4 h-4 rounded-full mr-3 animate-pulse"
                    style={{ backgroundColor: pontoSelecionado.cor }}
                  ></div>
                  <h3 className="font-bold text-lg text-white">{pontoSelecionado.veiculo}</h3>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Placa:</span>
                    <span className="font-medium text-white">{pontoSelecionado.placa}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dispositivo:</span>
                    <span className="text-blue-400">{pontoSelecionado.dispositivo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Motorista:</span>
                    <span className="text-white">{pontoSelecionado.motorista}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="font-medium">{GpsUtils.getStatusConfig(pontoSelecionado.status).texto}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Velocidade:</span>
                    <span className={`font-medium ${GpsUtils.getVelocidadeColor(pontoSelecionado.velocidade)}`}>
                      {pontoSelecionado.velocidade} km/h
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Ignição:</span>
                    <span className={`font-medium ${pontoSelecionado.ignicao ? 'text-green-400' : 'text-red-400'}`}>
                      {pontoSelecionado.ignicao ? 'Ligada' : 'Desligada'}
                    </span>
                  </div>
                  {pontoSelecionado.satelites && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Satélites:</span>
                      <span className="text-white">{pontoSelecionado.satelites}</span>
                    </div>
                  )}
                  {pontoSelecionado.precisaoHdop && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Precisão HDOP:</span>
                      <span className="text-white">{pontoSelecionado.precisaoHdop}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400">Data/Hora:</span>
                    <span className="text-white text-xs">{pontoSelecionado.data} {pontoSelecionado.horario}</span>
                  </div>
                  <div className="border-t border-gray-600 pt-2 mt-2">
                    <div className="text-xs text-gray-400">Coordenadas:</div>
                    <div className="text-xs text-white font-mono">
                      {pontoSelecionado.latitude.toFixed(6)}, {pontoSelecionado.longitude.toFixed(6)}
                    </div>
                  </div>
                </div>
                
                <button 
                  className="mt-3 w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
                  onClick={() => {
                    window.open(
                      `https://www.google.com/maps?q=${pontoSelecionado.latitude},${pontoSelecionado.longitude}`,
                      '_blank'
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

interface VeiculoCardProps {
  veiculo: VeiculoMonitorado;
  onClick: (veiculo: VeiculoMonitorado) => void;
}

const VeiculoCard: React.FC<VeiculoCardProps> = ({ veiculo, onClick }) => {
  const statusConfig = GpsUtils.getStatusConfig(veiculo.status);

  return (
    <div 
      className="p-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer transition-colors"
      onClick={() => onClick(veiculo)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className="text-lg mr-2">{statusConfig.icon}</span>
            <div>
              <h3 className="font-semibold text-white">{veiculo.veiculo}</h3>
              <p className="text-sm text-gray-400">{veiculo.placa} • {veiculo.dispositivo}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-400">Motorista:</span>
              <p className="text-white">{veiculo.motorista}</p>
            </div>
            <div>
              <span className="text-gray-400">Velocidade:</span>
              <p className={`font-medium ${GpsUtils.getVelocidadeColor(veiculo.velocidade)}`}>
                {veiculo.velocidade} km/h
              </p>
            </div>
          </div>

          <div className="mt-2">
            <p className="text-xs text-gray-400 truncate">{veiculo.endereco}</p>
            <p className="text-xs text-gray-500">Atualizado: {veiculo.ultimaAtualizacao}</p>
            <p className="text-xs text-gray-500">{veiculo.data} {veiculo.horario}</p>
            {veiculo.satelites && (
              <p className="text-xs text-gray-500">Satélites: {veiculo.satelites}</p>
            )}
          </div>
        </div>

        <div className="text-right">
          <span className={`px-2 py-1 text-xs rounded-full ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
            {veiculo.status === 'movimento' ? 'Movimento' : 
             veiculo.status === 'parado' ? 'Parado' : 'Sem Sinal'}
          </span>
          <div className="mt-2">
            <span className={`text-xs px-2 py-1 rounded ${
              veiculo.ignicao 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              {veiculo.ignicao ? 'Ignição ON' : 'Ignição OFF'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatusPanelProps {
  veiculos: VeiculoMonitorado[];
}

const StatusPanel: React.FC<StatusPanelProps> = ({ veiculos }) => {
  const veiculosEmMovimento = veiculos.filter(v => v.status === 'movimento').length;
  const veiculosParados = veiculos.filter(v => v.status === 'parado').length;
  const veiculosSemSinal = veiculos.filter(v => v.status === 'sem_sinal').length;
  const totalVeiculos = veiculos.length;

  const panels = [
    { 
      status: 'movimento', 
      count: veiculosEmMovimento, 
      label: 'Em Movimento',
      icon: '🟢',
      border: 'border-green-500/20'
    },
    { 
      status: 'parado', 
      count: veiculosParados, 
      label: 'Parados',
      icon: '🟡',
      border: 'border-yellow-500/20'
    },
    { 
      status: 'sem_sinal', 
      count: veiculosSemSinal, 
      label: 'Sem Sinal',
      icon: '🔴',
      border: 'border-red-500/20'
    },
    { 
      status: 'total', 
      count: totalVeiculos, 
      label: 'Total Monitorados',
      icon: '📡',
      border: 'border-blue-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {panels.map((panel) => (
        <div key={panel.status} className={`bg-gray-800 p-4 rounded-lg shadow ${panel.border}`}>
          <div className="flex items-center">
            <div className={`p-3 ${GpsUtils.getStatusConfig(panel.status).bg} rounded-lg`}>
              <span className="text-2xl">{panel.icon}</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">{panel.label}</p>
              <p className={`text-2xl font-bold ${GpsUtils.getStatusConfig(panel.status).text}`}>
                {panel.count}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Dados mock para demonstração
const dadosMock: VeiculoMonitorado[] = [
  {
    id: '1',
    dispositivo: 'GPS-MZ-001',
    veiculo: 'Caminhão Truck - ADM456MP',
    placa: 'ADM 456 MP',
    motorista: 'Fernando Matola',
    data: '2025-01-17',
    horario: '14:30:25',
    latitude: -25.965277,   // Maputo
    longitude: 32.589169,
    velocidade: 68,
    endereco: 'Avenida Julius Nyerere, Maputo',
    ignicao: true,
    status: 'movimento',
    evento: 'movimento',
    ultimaAtualizacao: 'há 5 minutos',
    direcao: 0,
    hodometro: 0
  },
  {
    id: '2',
    dispositivo: 'GPS-MZ-002',
    veiculo: 'Caminhão Carreta - ACL234BG',
    placa: 'ACL 234 BG',
    motorista: 'Lúcia Nhampoca',
    data: '2025-01-17',
    horario: '13:15:42',
    latitude: -19.819444,   // Beira
    longitude: 34.850000,
    velocidade: 0,
    endereco: 'Porto da Beira, Sofala',
    ignicao: false,
    status: 'parado',
    evento: 'parado',
    ultimaAtualizacao: 'há 15 minutos',
    direcao: 0,
    hodometro: 0
  },
  {
    id: '3',
    dispositivo: 'GPS-MZ-003',
    veiculo: 'Caminhão Baú - AMN678TT',
    placa: 'AMN 678 TT',
    motorista: 'Carlos Zandamela',
    data: '2025-01-17',
    horario: '12:45:18',
    latitude: -14.542778,   // Nampula
    longitude: 40.672778,
    velocidade: 82,
    endereco: 'Estrada Nacional N1, arredores de Nampula',
    ignicao: true,
    status: 'movimento',
    evento: 'excesso_velocidade',
    ultimaAtualizacao: 'há 30 minutos',
    direcao: 0,
    hodometro: 0
  }
];

// Componente principal
export default function ConteudoGPS() {
  
  const [filtroStatus, setFiltroStatus] = useState<'todos' | VeiculoMonitorado['status']>('todos');
  const [filtroDispositivo, setFiltroDispositivo] = useState('todos');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [pontoSelecionado, setPontoSelecionado] = useState<PontoMapa | null>(null);
  const [useCustomIcons, setUseCustomIcons] = useState(true);

  // Usando dados mock para demonstração
  const [veiculos, setVeiculos] = useState<VeiculoMonitorado[]>(dadosMock);
  const [loading, setLoading] = useState(false);

  const dispositivosUnicos = useMemo(() => 
    Array.from(new Set(veiculos.map(v => v.dispositivo))), 
    [veiculos]
  );

  const veiculosFiltrados = useMemo(() => {
    let filtrados = veiculos;
    
    if (filtroStatus !== 'todos') {
      filtrados = filtrados.filter(v => v.status === filtroStatus);
    }
    
    if (filtroDispositivo !== 'todos') {
      filtrados = filtrados.filter(v => v.dispositivo === filtroDispositivo);
    }
    
    return filtrados;
  }, [veiculos, filtroStatus, filtroDispositivo]);

  const pontosMapa = useMemo(() => 
    GpsDataConverter.converterParaPontosMapa(veiculosFiltrados),
    [veiculosFiltrados]
  );

  const handleVeiculoClick = useCallback((veiculo: VeiculoMonitorado) => {
    setPontoSelecionado(GpsDataConverter.converterParaPontosMapa([veiculo])[0]);
  }, []);

  const atualizarDados = useCallback(() => {
    setLoading(true);
    // Simulando atualização de dados
    setTimeout(() => {
      const novoVeiculo: VeiculoMonitorado = {
        ...dadosMock[Math.floor(Math.random() * dadosMock.length)],
        id: Date.now().toString(),
        latitude: -8.8 + (Math.random() - 0.5) * 2,
        longitude: 13.2 + (Math.random() - 0.5) * 2,
        velocidade: Math.floor(Math.random() * 120),
        ultimaAtualizacao: 'agora mesmo'
      };
      
      setVeiculos(prev => [novoVeiculo, ...prev.slice(0, 4)]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading && veiculos.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-white text-lg">Carregando dados GPS...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900">
        <Head>
          <title>Conteúdo GPS - Sistema de Rastreamento</title>
          <meta name="description" content="Sistema de monitoramento GPS em tempo real" />
        </Head>

        <header className="bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Conteúdo GPS - Monitoramento em Tempo Real</h1>
                <p className="text-gray-400">Sistema de rastreamento de veículos</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="mr-2 h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-300">Atualização Automática</span>
                </div>
                <button 
                  onClick={atualizarDados}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center disabled:opacity-50"
                >
                  <span className="mr-2">🔄</span>
                  {loading ? 'Atualizando...' : 'Atualizar Agora'}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <StatusPanel veiculos={veiculos} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de Veículos */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg shadow">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-white">Dispositivos GPS</h2>
                    <div className="flex gap-2">
                      <select
                        value={filtroDispositivo}
                        onChange={(e) => setFiltroDispositivo(e.target.value)}
                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg px-3 py-1"
                      >
                        <option value="todos">Todos</option>
                        {dispositivosUnicos.map(dispositivo => (
                          <option key={dispositivo} value={dispositivo}>{dispositivo}</option>
                        ))}
                      </select>
                      <select
                        value={filtroStatus}
                        onChange={(e) => setFiltroStatus(e.target.value as never)}
                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg px-3 py-1"
                      >
                        <option value="todos">Todos</option>
                        <option value="movimento">Em Movimento</option>
                        <option value="parado">Parados</option>
                        <option value="sem_sinal">Sem Sinal</option>
                      </select>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {veiculosFiltrados.length} de {veiculos.length} veículos
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {veiculosFiltrados.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                      <p>Nenhum dispositivo encontrado</p>
                      <p className="text-sm mt-2">Verifique os filtros aplicados</p>
                    </div>
                  ) : (
                    veiculosFiltrados.map((veiculo) => (
                      <VeiculoCard
                        key={veiculo.id}
                        veiculo={veiculo}
                        onClick={handleVeiculoClick}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Controles Rápidos */}
              <div className="mt-4 bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-white mb-3">Controles Rápidos</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setUseCustomIcons(!useCustomIcons)}
                    className="bg-purple-600 text-white py-2 px-3 rounded text-sm hover:bg-purple-700 flex items-center justify-center"
                  >
                    <span className="mr-1">{useCustomIcons ? '⚫' : '🎨'}</span>
                    {useCustomIcons ? 'Ícones Padrão' : 'Ícones Custom'}
                  </button>
                  <button className="bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700">
                    📊 Relatório
                  </button>
                  <button className="bg-orange-600 text-white py-2 px-3 rounded text-sm hover:bg-orange-700">
                    🚨 Alertas
                  </button>
                  <button className="bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700">
                    📧 Notificar
                  </button>
                </div>
              </div>

              {/* Estatísticas de Eventos */}
              <div className="mt-4 bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-white mb-3">Estatísticas de Eventos</h3>
                <div className="space-y-2">
                  {[
                    { evento: 'movimento', label: 'Em Movimento', count: veiculos.filter(v => v.evento === 'movimento').length },
                    { evento: 'parado', label: 'Parados', count: veiculos.filter(v => v.evento === 'parado').length },
                    { evento: 'excesso_velocidade', label: 'Excesso Veloc.', count: veiculos.filter(v => v.evento === 'excesso_velocidade').length },
                    { evento: 'ignicao', label: 'Ignição', count: veiculos.filter(v => v.evento === 'ignicao').length }
                  ].map((item, index) => {
                    const config = GpsUtils.getStatusConfig(item.evento);
                    return (
                      <div key={index} className={`flex justify-between items-center p-2 rounded ${config.bg} ${config.border}`}>
                        <span className={`text-sm ${config.text}`}>{item.label}</span>
                        <span className="font-bold text-white">{item.count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mapa Google Maps */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-lg shadow h-full">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-white">
                      Mapa em Tempo Real - Google Maps
                    </h2>
                    <div className="text-sm text-gray-400">
                      {pontosMapa.length} veículos no mapa
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="rounded-lg overflow-hidden border border-gray-600">
                    <MapaMonitoramento
                      pontosMapa={pontosMapa}
                      pontoSelecionado={pontoSelecionado}
                      setPontoSelecionado={setPontoSelecionado}
                      useCustomIcons={useCustomIcons}
                    />
                  </div>

                  {/* Legenda */}
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-gray-300">Em Movimento</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      <span className="text-gray-300">Parado</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-gray-300">Sem Sinal</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-gray-300">Selecionado</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informações Detalhadas */}
              {pontoSelecionado && (
                <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-white mb-3">Informações do Dispositivo Selecionado</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Velocidade:</span>
                      <p className={`font-medium ${GpsUtils.getVelocidadeColor(pontoSelecionado.velocidade)}`}>
                        {pontoSelecionado.velocidade} km/h
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Status:</span>
                      <p className="text-white font-medium">{GpsUtils.getStatusConfig(pontoSelecionado.status).texto}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Motorista:</span>
                      <p className="text-white">{pontoSelecionado.motorista}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Data/Hora:</span>
                      <p className="text-white">{pontoSelecionado.data} {pontoSelecionado.horario}</p>
                    </div>
                    {pontoSelecionado.satelites && (
                      <div>
                        <span className="text-gray-400">Satélites:</span>
                        <p className="text-white">{pontoSelecionado.satelites}</p>
                      </div>
                    )}
                    {pontoSelecionado.precisaoHdop && (
                      <div>
                        <span className="text-gray-400">Precisão HDOP:</span>
                        <p className="text-white">{pontoSelecionado.precisaoHdop}</p>
                      </div>
                    )}
                    {pontoSelecionado.ipDispositivo && (
                      <div>
                        <span className="text-gray-400">IP Dispositivo:</span>
                        <p className="text-white">{pontoSelecionado.ipDispositivo}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-400">Coordenadas:</span>
                      <p className="text-white text-xs">
                        {pontoSelecionado.latitude.toFixed(6)}, {pontoSelecionado.longitude.toFixed(6)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}