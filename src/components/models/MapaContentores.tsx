/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { LoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { Contentor } from '../janelas/GPSContentor';

// Interface para o contentor
interface Coordenadas {
  lat: number;
  lng: number;
}

// Props do componente
interface MapaContentoresProps {
  contentores: Contentor[];
  contentorSelecionado: Contentor | null;
  setContentorSelecionado: (contentor: Contentor | null) => void;
}

// Configurações do mapa
const CONFIG = {
  GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
  MAP: {
    containerStyle: {
      width: '100%',
      height: '400px',
      borderRadius: '0.5rem',
    },
    defaultCenter: {
      lat: -25.969248,
      lng: 32.573174,
    },
    defaultZoom: 12,
  },
};

// Estilos customizados do mapa
const mapStyles = [
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#7c93a3' }],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'all',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#2b4562' }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry.fill',
    stylers: [{ color: '#1e2d3c' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry.fill',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#7c93a3' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#1e2d3c' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{ color: '#1e2d3c' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#2b4562' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#7c93a3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#1e2d3c' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#2b4562' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry.fill',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0e1621' }],
  },
];

// Função auxiliar para obter texto do status
const getStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    em_transito: 'Em Trânsito',
    coletada: 'Coletada',
    entregue: 'Entregue',
    planeada: 'Planejada',
    atrasada: 'Atrasada',
    cancelada: 'Cancelada',
  };
  return statusMap[status] || status;
};

// Função para formatar moeda
const formatCurrency = (value?: number): string => {
  if (!value) return 'MZN 0';
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'MZN',
  });
};

const MapaContentores: React.FC<MapaContentoresProps> = ({
  contentores,
  contentorSelecionado,
  setContentorSelecionado,
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [forceReload, setForceReload] = useState(0); // Para forçar recarregamento
  const loadScriptRef = useRef<number>(0);

  // Função para obter cor baseada no status
  const getStatusColor = useCallback((status: string): string => {
    switch (status) {
      case 'em_transito':
        return 'green';
      case 'coletada':
        return 'blue';
      case 'entregue':
        return 'purple';
      case 'planeada':
        return 'yellow';
      case 'atrasada':
        return 'orange';
      case 'cancelada':
        return 'red';
      default:
        return 'gray';
    }
  }, []);

  // URLs dos ícones
  const iconUrls = useMemo<Record<string, string>>(
    () => ({
      green: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      blue: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      yellow: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      purple: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
      orange: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
      red: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      gray: 'http://maps.google.com/mapfiles/ms/icons/gray-dot.png',
    }),
    []
  );

  // Handler para carregamento do mapa
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

  // Handler para desmontagem do mapa
  const onUnmount = useCallback(() => {
    setMap(null);
    setMapInstance(null);
    setIsLoaded(false);
  }, []);

  // Centralizar mapa nos contentores
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

  // Função para atualizar o mapa
  const atualizarMapa = useCallback(() => {
    // Limpar estado do mapa
    setMap(null);
    setMapInstance(null);
    setIsLoaded(false);
    setLoadError(null);
    
    // Forçar recarregamento do componente LoadScript
    setForceReload(prev => prev + 1);
    
    // Incrementar a referência do LoadScript
    loadScriptRef.current += 1;
    
    console.log('Mapa recarregado');
  }, []);

  // Handler para erro no carregamento
  const handleLoadError = useCallback((error: Error) => {
    console.error('Erro ao carregar Google Maps:', error);
    setLoadError(
      'Falha ao carregar o Google Maps. Verifique sua conexão ou a chave da API.'
    );
  }, []);

  // Verificar se há coordenadas válidas
  const hasValidContentores = useMemo(
    () =>
      contentores.some((contentor) => {
        const lat = contentor.pontoAtual?.lat || contentor.origem?.coordenadas?.lat;
        const lng = contentor.pontoAtual?.lng || contentor.origem?.coordenadas?.lng;
        return lat && lng;
      }),
    [contentores]
  );

  // Obter coordenadas de um contentor
  const getContentorCoords = useCallback((contentor: Contentor): Coordenadas | null => {
    const lat = contentor.pontoAtual?.lat || contentor.origem?.coordenadas?.lat;
    const lng = contentor.pontoAtual?.lng || contentor.origem?.coordenadas?.lng;
    return lat && lng ? { lat, lng } : null;
  }, []);

  // Abrir no Google Maps
  const abrirNoGoogleMaps = useCallback((lat: number, lng: number) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  }, []);

  return (
    <div className="relative">
      {/* Botões de controle do mapa */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <button
          onClick={atualizarMapa}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-all shadow-lg flex items-center text-sm font-medium"
          title="Atualizar mapa"
        >
          <span className="mr-2">🔄</span>
          Atualizar
        </button>
        
        <button
          onClick={centralizarMapa}
          className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-all shadow-lg flex items-center text-sm font-medium"
          title="Centralizar mapa"
        >
          <span className="mr-2">🎯</span>
          Centralizar
        </button>
      </div>

      {/* Componente do Google Maps */}
      <LoadScript
        key={`load-script-${loadScriptRef.current}`}
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
              <button
                onClick={atualizarMapa}
                className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-all"
              >
                Tentar novamente
              </button>
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
              <button
                onClick={atualizarMapa}
                className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-all"
              >
                Atualizar mapa
              </button>
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
            {/* Marcadores dos contentores */}
            {isLoaded &&
              contentores.map((contentor) => {
                const coords = getContentorCoords(contentor);
                if (!coords) return null;

                const statusColor = getStatusColor(contentor.status);

                return (
                  <Marker
                    key={contentor.codigo}
                    position={coords}
                    onClick={() => setContentorSelecionado(contentor)}
                    icon={{
                      url: iconUrls[statusColor] || iconUrls.gray,
                      scaledSize: new google.maps.Size(32, 32),
                    }}
                    title={`${contentor.numero} - ${contentor.cliente}`}
                    animation={contentor.status === 'em_transito' ? google.maps.Animation.BOUNCE : undefined}
                  />
                );
              })}

            {/* InfoWindow do contentor selecionado */}
            {isLoaded && contentorSelecionado && (
              <InfoWindow
                position={getContentorCoords(contentorSelecionado) || CONFIG.MAP.defaultCenter}
                onCloseClick={() => setContentorSelecionado(null)}
              >
                <ContentorInfoWindow
                  contentor={contentorSelecionado}
                  onOpenMap={abrirNoGoogleMaps}
                />
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </LoadScript>
    </div>
  );
};

// Componente para a janela de informações
interface ContentorInfoWindowProps {
  contentor: Contentor;
  onOpenMap: (lat: number, lng: number) => void;
}

const ContentorInfoWindow: React.FC<ContentorInfoWindowProps> = ({
  contentor,
  onOpenMap,
}) => {
  const getStatusColorClass = (status: string): string => {
    switch (status) {
      case 'em_transito':
        return 'animate-pulse bg-green-500';
      case 'entregue':
        return 'bg-purple-500';
      case 'coletada':
        return 'bg-blue-500';
      case 'planeada':
        return 'bg-yellow-500';
      case 'atrasada':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusTextColor = (status: string): string => {
    switch (status) {
      case 'em_transito':
        return 'text-green-400';
      case 'entregue':
        return 'text-purple-400';
      case 'coletada':
        return 'text-blue-400';
      case 'planeada':
        return 'text-yellow-400';
      case 'atrasada':
        return 'text-orange-400';
      default:
        return 'text-gray-400';
    }
  };

  const coords = contentor.pontoAtual || contentor.origem?.coordenadas;

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg max-w-xs border border-gray-600 shadow-xl">
      <div className="flex items-center mb-3">
        <div
          className={`w-4 h-4 rounded-full mr-3 ${getStatusColorClass(contentor.status)}`}
        ></div>
        <h3 className="font-bold text-lg text-white">{contentor.codigo}</h3>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Tipo:</span>
          <span className="font-medium text-white">{contentor.tipo}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Status:</span>
          <span className={`font-medium ${getStatusTextColor(contentor.status)}`}>
            {getStatusText(contentor.status)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Cliente:</span>
          <span className="text-white">{contentor.cliente}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Peso Bruto:</span>
          <span className="text-white">{contentor.pesoBruto || 0} kg</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Valor:</span>
          <span className="text-cyan-400">{formatCurrency(contentor.valorMercadoria)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Motorista:</span>
          <span className="text-white">{contentor.motorista?.nome || 'N/A'}</span>
        </div>
        
        {coords && (
          <div className="border-t border-gray-600 pt-2 mt-2">
            <div className="text-xs text-gray-400">Coordenadas:</div>
            <div className="text-xs text-white font-mono">
              {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
            </div>
          </div>
        )}
      </div>

      {coords && (
        <button
          className="mt-3 w-full bg-cyan-600 text-white py-2 px-3 rounded text-sm hover:bg-cyan-700 transition-colors"
          onClick={() => onOpenMap(coords.lat, coords.lng)}
        >
          📍 Abrir no Google Maps
        </button>
      )}
    </div>
  );
};

export default MapaContentores;