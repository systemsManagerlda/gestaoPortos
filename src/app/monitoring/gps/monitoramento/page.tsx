"use client";
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Layout from '@/components/layout/Layout';

interface VeiculoMonitorado {
  id: number;
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
}

interface PontoMapa {
  id: number;
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
}

// Configuração do mapa
const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

const defaultCenter = {
  lat: -8.838333,
  lng: 13.234444
};

// Chave da API do Google Maps
const GOOGLE_MAPS_API_KEY = 'AIzaSyB5Y1PUBVawvwuSUZEipJVLrEX9lV6Yn_0';

// Funções auxiliares
const getStatusColor = (status: string, apenasCor: boolean = false) => {
  const cores = {
    movimento: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', cor: '#10b981' },
    parado: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30', cor: '#f59e0b' },
    sem_sinal: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', cor: '#ef4444' }
  };

  const config = cores[status as keyof typeof cores] || { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/30', cor: '#6b7280' };
  return apenasCor ? config.cor : `${config.bg} ${config.text} ${config.border}`;
};

const getStatusText = (status: string) => {
  const textos = {
    movimento: '🟢 Em Movimento',
    parado: '🟡 Parado',
    sem_sinal: '🔴 Sem Sinal'
  };
  return textos[status as keyof typeof textos] || '⚫ Desconhecido';
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'movimento': return '🟢';
    case 'parado': return '🟡';
    case 'sem_sinal': return '🔴';
    default: return '⚫';
  }
};

const getVelocidadeColor = (velocidade: number) => {
  if (velocidade === 0) return 'text-gray-400';
  if (velocidade <= 60) return 'text-green-400';
  if (velocidade <= 80) return 'text-yellow-400';
  return 'text-red-400';
};

// Função para criar ícones SVG
const createMarkerIcon = (cor: string, status: string) => {
  let symbol = '';
  
  switch (status) {
    case 'movimento':
      symbol = 'M16,8 L20,12 L16,16 L12,12 Z'; // Diamante para movimento
      break;
    case 'parado':
      symbol = 'M12,12 L20,12 L20,20 L12,20 Z'; // Quadrado para parado
      break;
    case 'sem_sinal':
      symbol = 'M16,8 L20,16 L16,14 L12,16 Z'; // Triângulo para sem sinal
      break;
    default:
      symbol = 'M16,10 C13,10 11,12 11,15 C11,18 13,20 16,20 C19,20 21,18 21,15 C21,12 19,10 16,10 Z'; // Círculo padrão
  }

  const svgString = `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="${cor}" stroke="white" stroke-width="2"/>
      <path d="${symbol}" fill="white" stroke="white" stroke-width="1"/>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
};

// Ícones padrão do Google Maps
const getDefaultIcon = (status: string) => {
  const icons = {
    movimento: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    parado: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    sem_sinal: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
  };
  return icons[status as keyof typeof icons] || 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
};

// Hook personalizado para verificar se o Google Maps está carregado
const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkGoogleMaps = () => {
      if (typeof window !== 'undefined' && window.google && window.google.maps) {
        setIsLoaded(true);
      }
    };

    checkGoogleMaps();
    const interval = setInterval(checkGoogleMaps, 100);
    return () => clearInterval(interval);
  }, []);

  return isLoaded;
};

// Componente do Mapa
const MapaMonitoramento: React.FC<{
  pontosMapa: PontoMapa[];
  pontoSelecionado: PontoMapa | null;
  setPontoSelecionado: (ponto: PontoMapa | null) => void;
  useCustomIcons: boolean;
}> = ({ pontosMapa, pontoSelecionado, setPontoSelecionado, useCustomIcons }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const isGoogleMapsLoaded = useGoogleMaps();

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    
    // Centralizar mapa nos marcadores
    setTimeout(() => {
      if (pontosMapa.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        pontosMapa.forEach(ponto => {
          bounds.extend(new google.maps.LatLng(ponto.latitude, ponto.longitude));
        });
        map.fitBounds(bounds);
        
        if (pontosMapa.length === 1) {
          setTimeout(() => map.setZoom(15), 500);
        }
      }
    }, 500);
  }, [pontosMapa]);

  const centralizarMapa = useCallback(() => {
    if (map && pontosMapa.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      pontosMapa.forEach(ponto => {
        bounds.extend(new google.maps.LatLng(ponto.latitude, ponto.longitude));
      });
      map.fitBounds(bounds);
    }
  }, [map, pontosMapa]);

  // Configuração do ícone do marcador
  const getMarkerIcon = (ponto: PontoMapa) => {
    if (useCustomIcons) {
      return {
        url: createMarkerIcon(ponto.cor, ponto.status),
        scaledSize: new google.maps.Size(32, 32),
        anchor: new google.maps.Point(16, 16)
      };
    } else {
      return {
        url: getDefaultIcon(ponto.status),
        scaledSize: new google.maps.Size(32, 32)
      };
    }
  };

  // Se o Google Maps não estiver carregado, mostrar loading
  if (!isGoogleMapsLoaded) {
    return (
      <div className="bg-gray-700 rounded-lg h-96 flex items-center justify-center border border-gray-600">
        <div className="text-center text-gray-400">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Carregando Google Maps...</p>
        </div>
      </div>
    );
  }

  return (
    <LoadScript 
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      loadingElement={<div className="flex items-center justify-center h-96 bg-gray-700">Carregando mapa...</div>}
    >
      <div className="relative">
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          <button 
            onClick={centralizarMapa}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-sm flex items-center text-sm"
            title="Centralizar mapa"
          >
            <span className="mr-1">🎯</span>
            Centralizar
          </button>
        </div>
        
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={10}
          onLoad={onMapLoad}
          options={{
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true,
            styles: [
              {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [{"visibility": "on"}]
              }
            ]
          }}
        >
          {pontosMapa.map((ponto) => (
            <Marker
              key={ponto.id}
              position={{ lat: ponto.latitude, lng: ponto.longitude }}
              onClick={() => setPontoSelecionado(ponto)}
              icon={getMarkerIcon(ponto)}
            />
          ))}

          {pontoSelecionado && (
            <InfoWindow
              position={{
                lat: pontoSelecionado.latitude,
                lng: pontoSelecionado.longitude
              }}
              onCloseClick={() => setPontoSelecionado(null)}
            >
              <div className="bg-gray-900 text-white p-4 rounded-lg max-w-xs border border-gray-600">
                <div className="flex items-center mb-2">
                  <div 
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: pontoSelecionado.cor }}
                  ></div>
                  <h3 className="font-bold text-lg">{pontoSelecionado.veiculo}</h3>
                </div>
                <p className="text-sm mb-1 font-medium">{pontoSelecionado.placa}</p>
                <p className="text-xs text-gray-300 mb-2">{pontoSelecionado.dispositivo}</p>
                <p className="text-xs text-gray-300 mb-3">{pontoSelecionado.endereco}</p>
                
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="flex flex-col">
                    <span className="text-gray-400">Motorista</span>
                    <span className="font-medium text-white">{pontoSelecionado.motorista}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400">Status</span>
                    <span className="font-medium">{getStatusText(pontoSelecionado.status)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400">Velocidade</span>
                    <span className={`font-medium ${getVelocidadeColor(pontoSelecionado.velocidade)}`}>
                      {pontoSelecionado.velocidade} km/h
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400">Ignição</span>
                    <span className={`font-medium ${pontoSelecionado.ignicao ? 'text-green-400' : 'text-red-400'}`}>
                      {pontoSelecionado.ignicao ? 'Ligada' : 'Desligada'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400">Atualização</span>
                    <span className="font-medium text-white">{pontoSelecionado.ultimaAtualizacao}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400">Coordenadas</span>
                    <span className="font-medium text-xs text-white">
                      {pontoSelecionado.latitude.toFixed(4)}, {pontoSelecionado.longitude.toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default function MonitoramentoGPS() {
  
  const [veiculos, setVeiculos] = useState<VeiculoMonitorado[]>([
    {
      id: 1,
      dispositivo: 'GPS-001',
      veiculo: 'Caminhão Truck',
      placa: 'AB123CD',
      motorista: 'João Silva',
      latitude: -8.838333,
      longitude: 13.234444,
      velocidade: 65,
      endereco: 'Avenida 4 de Fevereiro, Luanda',
      status: 'movimento',
      ultimaAtualizacao: 'há 2 minutos',
      ignicao: true,
      direcao: 45,
      hodometro: 12500
    },
    {
      id: 2,
      dispositivo: 'GPS-002',
      veiculo: 'Caminhão Carreta',
      placa: 'EF456GH',
      motorista: 'Maria Santos',
      latitude: -12.350000,
      longitude: 13.416667,
      velocidade: 0,
      endereco: 'Porto do Lobito, Benguela',
      status: 'parado',
      ultimaAtualizacao: 'há 5 minutos',
      ignicao: false,
      direcao: 0,
      hodometro: 18750
    },
    {
      id: 3,
      dispositivo: 'GPS-003',
      veiculo: 'Caminhão Baú',
      placa: 'IJ789KL',
      motorista: 'Pedro Costa',
      latitude: -8.916667,
      longitude: 13.500000,
      velocidade: 45,
      endereco: 'Estrada Nacional, Cacuaco',
      status: 'movimento',
      ultimaAtualizacao: 'há 1 minuto',
      ignicao: true,
      direcao: 90,
      hodometro: 8920
    }
  ]);

  const [filtroStatus, setFiltroStatus] = useState<'todos' | VeiculoMonitorado['status']>('todos');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [pontoSelecionado, setPontoSelecionado] = useState<PontoMapa | null>(null);
  const [useCustomIcons, setUseCustomIcons] = useState(true);

  // Simulação de atualização em tempo real
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setVeiculos(prev => prev.map(veiculo => ({
        ...veiculo,
        ultimaAtualizacao: 'há poucos segundos',
        velocidade: veiculo.status === 'movimento' 
          ? Math.max(0, veiculo.velocidade + (Math.random() - 0.5) * 10)
          : 0,
        // Simular pequenas mudanças de posição para veículos em movimento
        ...(veiculo.status === 'movimento' && {
          latitude: veiculo.latitude + (Math.random() - 0.5) * 0.01,
          longitude: veiculo.longitude + (Math.random() - 0.5) * 0.01
        })
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const veiculosFiltrados = filtroStatus === 'todos' 
    ? veiculos 
    : veiculos.filter(v => v.status === filtroStatus);

  // Pontos para o mapa
  const pontosMapa = useMemo((): PontoMapa[] => {
    return veiculosFiltrados.map(veiculo => ({
      id: veiculo.id,
      latitude: veiculo.latitude,
      longitude: veiculo.longitude,
      dispositivo: veiculo.dispositivo,
      veiculo: veiculo.veiculo,
      placa: veiculo.placa,
      motorista: veiculo.motorista,
      status: veiculo.status,
      cor: getStatusColor(veiculo.status, true) as string,
      velocidade: veiculo.velocidade,
      endereco: veiculo.endereco,
      ultimaAtualizacao: veiculo.ultimaAtualizacao,
      ignicao: veiculo.ignicao
    }));
  }, [veiculosFiltrados]);

  const veiculosEmMovimento = veiculos.filter(v => v.status === 'movimento').length;
  const veiculosParados = veiculos.filter(v => v.status === 'parado').length;
  const veiculosSemSinal = veiculos.filter(v => v.status === 'sem_sinal').length;

  const atualizarDados = useCallback(() => {
    setVeiculos(prev => prev.map(veiculo => ({
      ...veiculo,
      ultimaAtualizacao: 'agora mesmo',
      velocidade: veiculo.status === 'movimento' 
        ? Math.max(0, veiculo.velocidade + (Math.random() - 0.5) * 5)
        : 0
    })));
  }, []);

  return (
    <Layout>
       <div className="min-h-screen bg-gray-900">

      <header className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Monitoramento GPS</h1>
              <p className="text-gray-400">Monitoramento em tempo real</p>
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
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <span className="mr-2">🔄</span>
                Atualizar Agora
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Painel de Controle */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg shadow border border-green-500/20">
            <div className="flex items-center">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <span className="text-2xl">🟢</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Em Movimento</p>
                <p className="text-2xl font-bold text-green-400">{veiculosEmMovimento}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow border border-yellow-500/20">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <span className="text-2xl">🟡</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Parados</p>
                <p className="text-2xl font-bold text-yellow-400">{veiculosParados}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow border border-red-500/20">
            <div className="flex items-center">
              <div className="p-3 bg-red-500/20 rounded-lg">
                <span className="text-2xl">🔴</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Sem Sinal</p>
                <p className="text-2xl font-bold text-red-400">{veiculosSemSinal}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow border border-blue-500/20">
            <div className="flex items-center">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <span className="text-2xl">📡</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Total Monitorados</p>
                <p className="text-2xl font-bold text-blue-400">{veiculos.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Veículos */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b border-gray-700">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-white">Veículos Monitorados</h2>
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
              <div className="max-h-96 overflow-y-auto">
                {veiculosFiltrados.map((veiculo) => (
                  <div 
                    key={veiculo.id} 
                    className="p-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer transition-colors"
                    onClick={() => setPontoSelecionado({
                      id: veiculo.id,
                      latitude: veiculo.latitude,
                      longitude: veiculo.longitude,
                      dispositivo: veiculo.dispositivo,
                      veiculo: veiculo.veiculo,
                      placa: veiculo.placa,
                      motorista: veiculo.motorista,
                      status: veiculo.status,
                      cor: getStatusColor(veiculo.status, true) as string,
                      velocidade: veiculo.velocidade,
                      endereco: veiculo.endereco,
                      ultimaAtualizacao: veiculo.ultimaAtualizacao,
                      ignicao: veiculo.ignicao
                    })}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-lg mr-2">{getStatusIcon(veiculo.status)}</span>
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
                            <p className={`font-medium ${getVelocidadeColor(veiculo.velocidade)}`}>
                              {veiculo.velocidade} km/h
                            </p>
                          </div>
                        </div>

                        <div className="mt-2">
                          <p className="text-xs text-gray-400 truncate">{veiculo.endereco}</p>
                          <p className="text-xs text-gray-500">Atualizado: {veiculo.ultimaAtualizacao}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(veiculo.status)}`}>
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
                ))}
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
                <button className="bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700">
                  Rotas do Dia
                </button>
                <button className="bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700">
                  Histórico
                </button>
                <button className="bg-orange-600 text-white py-2 px-3 rounded text-sm hover:bg-orange-700">
                  Alertas
                </button>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg shadow h-full">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">Mapa em Tempo Real - Google Maps</h2>
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
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
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
              <div className="mt-4 bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-white mb-3">Informações do Veículo Selecionado</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Velocidade:</span>
                    <p className={`font-medium ${getVelocidadeColor(pontoSelecionado.velocidade)}`}>
                      {pontoSelecionado.velocidade} km/h
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400">Status:</span>
                    <p className="text-white font-medium">{getStatusText(pontoSelecionado.status)}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Motorista:</span>
                    <p className="text-white">{pontoSelecionado.motorista}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Última Atualização:</span>
                    <p className="text-white">{pontoSelecionado.ultimaAtualizacao}</p>
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