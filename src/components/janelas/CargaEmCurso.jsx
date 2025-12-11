import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { LoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

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

// Componente de debug para verificar a API Key
const ApiKeyDebug = () => {
  const [showKey, setShowKey] = useState(false);
  
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-yellow-100 border border-yellow-300 rounded-lg p-4 shadow-lg max-w-xs">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-yellow-800">Debug API Key</span>
        <button 
          onClick={() => setShowKey(!showKey)}
          className="text-yellow-600 hover:text-yellow-800"
        >
          {showKey ? '👁️' : '👁️‍🗨️'}
        </button>
      </div>
      <div className="text-xs">
        <p className="text-yellow-700">API Key presente: {GOOGLE_MAPS_API_KEY ? '✅ Sim' : '❌ Não'}</p>
        {showKey && (
          <p className="mt-2 break-all bg-yellow-50 p-2 rounded">
            {GOOGLE_MAPS_API_KEY || 'Não configurada'}
          </p>
        )}
        <p className="mt-2 text-yellow-700">
          Tamanho: {GOOGLE_MAPS_API_KEY ? GOOGLE_MAPS_API_KEY.length : 0} caracteres
        </p>
      </div>
    </div>
  );
};


// Utilitários para o mapa
class GpsUtils {
  static determinarStatus(velocidade, satelites = '0') {
    const numSatelites = parseInt(satelites) || 0;
    
    if (numSatelites === 0) return 'sem_sinal';
    if (velocidade > 0) return 'movimento';
    return 'parado';
  }

  static getStatusConfig(status) {
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
      atraso_critico: {
        bg: 'bg-red-500/20',
        text: 'text-red-400',
        border: 'border-red-500/30',
        cor: '#ef4444',
        texto: '🚨 Atraso Crítico',
        icon: '🚨'
      },
      atrasado: {
        bg: 'bg-orange-500/20',
        text: 'text-orange-400',
        border: 'border-orange-500/30',
        cor: '#f97316',
        texto: '🟠 Atrasado',
        icon: '🟠'
      },
      no_prazo: {
        bg: 'bg-green-500/20',
        text: 'text-green-400',
        border: 'border-green-500/30',
        cor: '#10b981',
        texto: '🟢 No Prazo',
        icon: '🟢'
      }
    };

    return configs[status] || configs.outro;
  }

  static getDefaultIcon(status) {
    const icons = {
      movimento: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      parado: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      sem_sinal: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      atraso_critico: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      atrasado: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
      no_prazo: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    };
    return icons[status] || 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
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
        { top: '30%', left: '40%', label: 'Maputo', cor: '#3b82f6' },
        { top: '50%', left: '60%', label: 'Beira', cor: '#10b981' },
        { top: '40%', left: '70%', label: 'Chimoio', cor: '#8b5cf6' },
        { top: '20%', left: '50%', label: 'Nampula', cor: '#f59e0b' },
        { top: '60%', left: '30%', label: 'Xai-Xai', cor: '#ef4444' },
        { top: '70%', left: '50%', label: 'Inhambane', cor: '#06b6d4' },
        { top: '35%', left: '80%', label: 'Tete', cor: '#84cc16' },
        { top: '65%', left: '20%', label: 'Matola', cor: '#f97316' }
      ];
      
      const pos = positions[index % positions.length] || positions[0];
      const status = carga.status === 'em_transito' ? 'movimento' : 
                     carga.status === 'em_entrega' ? 'movimento' : 'parado';
      const statusConfig = GpsUtils.getStatusConfig(status);
      
      return {
        id: carga.codigo,
        top: pos.top,
        left: pos.left,
        label: pos.label,
        cor: pos.cor,
        carga: carga,
        statusConfig: statusConfig
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
            backgroundSize: '40px 40px'
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
        <div className="absolute top-0 left-0 w-0.5 h-full bg-yellow-500/30 animate-pulse" 
             style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="absolute top-[50%] left-[60%] w-32 h-24">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-500/30 animate-pulse" 
             style={{ animationDelay: '1s' }}></div>
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
              borderColor: ponto.cor
            }}
          >
            <span className={ponto.statusConfig.text}>{ponto.statusConfig.icon}</span>
            <span className="text-sm font-medium">{ponto.carga.codigo}</span>
          </div>
          
          {/* Linha de conexão para a cidade */}
          <div 
            className="absolute top-full left-1/2 w-0.5 h-8 -translate-x-1/2"
            style={{ background: `linear-gradient(to bottom, ${ponto.cor}, transparent)` }}
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
            <div className="text-sm font-medium text-white">{cargas.length} Cargas</div>
            <div className="text-xs text-gray-300">
              {cargas.filter(c => c.status === 'em_transito').length} em trânsito
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
                {selectedCarga.veiculo?.matricula || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Status:</span>
              <span className={`font-medium ${selectedCarga.status === 'em_transito' ? 'text-green-400' : 'text-yellow-400'}`}>
                {selectedCarga.status === 'em_transito' ? 'Em Trânsito' : 
                 selectedCarga.status === 'em_entrega' ? 'Em Entrega' : 
                 selectedCarga.status}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Motorista:</span>
              <span className="text-white">{selectedCarga.motorista?.nome || 'Não definido'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Rota:</span>
              <span className="text-blue-400">
                {selectedCarga.origem?.cidade || 'Origem'} → {selectedCarga.destino?.cidade || 'Destino'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Cliente:</span>
              <span className="text-white">{selectedCarga.cliente || 'N/A'}</span>
            </div>
            {selectedCarga.pontoAtual?.descricao && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Posição:</span>
                <span className="text-green-300">{selectedCarga.pontoAtual.descricao}</span>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2 mt-4">
            <button 
              className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
              onClick={() => {
                // Simular abertura no Google Maps
                const origem = selectedCarga.origem?.cidade || 'Maputo';
                const destino = selectedCarga.destino?.cidade || 'Nampula';
                alert(`Rota: ${origem} → ${destino}\n\nEsta funcionalidade requer a API do Google Maps.`);
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
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
        
        {/* Raios de conexão entre cidades */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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

// Componente do Mapa Google Maps
const MapaCargasEmCurso = ({ 
  cargas, 
  selectedCarga, 
  setSelectedCarga 
}) => {
  const [map, setMap] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  // Função para obter posição de cidade em Moçambique
  const obterPosicaoCidadeAleatoria = (index) => {
    // Cidades principais de Moçambique com coordenadas
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
      { nome: "Cuamba", lat: -14.803889, lng: 36.537222 }
    ];
    
    // Usar índice para selecionar cidade (ou aleatório se índice maior que array)
    const cidadeIndex = index % cidadesMocambique.length;
    return cidadesMocambique[cidadeIndex];
  };

  // Verificar se a API Key está configurada
  const isGoogleMapsAvailable = useMemo(() => {
    return CONFIG.GOOGLE_MAPS_API_KEY && 
           CONFIG.GOOGLE_MAPS_API_KEY !== 'SUA_API_KEY_AQUI' && 
           CONFIG.GOOGLE_MAPS_API_KEY !== undefined;
  }, []);

  // Converter cargas em pontos do mapa
  const pontosMapa = useMemo(() => {
    if (!cargas || cargas.length === 0) return [];
    
    return cargas.map((carga, index) => {
      // Verificar se há coordenadas reais na API
      const temCoordenadasReais = carga.pontoAtual?.lat && carga.pontoAtual?.lng;
      
      let lat, lng, descricao;
      
      if (temCoordenadasReais) {
        // Usar coordenadas reais da API
        lat = carga.pontoAtual.lat;
        lng = carga.pontoAtual.lng;
        descricao = carga.pontoAtual.descricao || 'Em trânsito';
      } else {
        // Gerar coordenada aleatória
        const cidade = obterPosicaoCidadeAleatoria(index);
        lat = cidade.lat + (Math.random() * 0.2 - 0.1); // Adicionar pequena variação
        lng = cidade.lng + (Math.random() * 0.2 - 0.1); // Adicionar pequena variação
        descricao = `${cidade.nome} - Posição simulada`;
        
        // Atualizar o objeto carga com as coordenadas simuladas
        if (!carga.pontoAtual) {
          carga.pontoAtual = {};
        }
        carga.pontoAtual.lat = lat;
        carga.pontoAtual.lng = lng;
        carga.pontoAtual.descricao = descricao;
      }
      
      // Determinar status baseado no contexto
      let status;
      if (!temCoordenadasReais) {
        status = 'sem_sinal'; // Se não tem coordenadas reais, considerar sem sinal
      } else if (carga.status === 'em_transito' || carga.status === 'em_entrega') {
        status = carga.gps?.velocidade > 0 ? 'movimento' : 'parado';
      } else {
        status = 'parado';
      }
      
      const statusConfig = GpsUtils.getStatusConfig(status);
      
      return {
        id: carga.codigo,
        latitude: lat,
        longitude: lng,
        dispositivo: carga.gps?.codigo || 'GPS-001',
        veiculo: `${carga.veiculo?.modelo || 'Veículo'} ${carga.veiculo?.matricula || ''}`,
        placa: carga.veiculo?.matricula || 'N/A',
        motorista: carga.motorista?.nome || 'Motorista não definido',
        status: status,
        cor: statusConfig.cor,
        velocidade: carga.gps?.velocidade || 0,
        endereco: descricao,
        ultimaAtualizacao: carga.gps?.ultimaComunicacao ? 
          new Date(carga.gps.ultimaComunicacao).toLocaleTimeString('pt-PT') : 
          'há alguns minutos',
        ignicao: carga.status === 'em_transito',
        data: new Date().toISOString().split('T')[0],
        horario: new Date().toLocaleTimeString('pt-PT', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        evento: status,
        carga: carga,
        coordenadasSimuladas: !temCoordenadasReais // Flag para indicar coordenadas simuladas
      };
    });
  }, [cargas]);

   const onLoad = useCallback((map) => {
    console.log('✅ Google Maps carregado com sucesso');
    setMap(map);
    setIsLoaded(true);
    setMapError(false);
    
    if (pontosMapa.length > 0) {
      setTimeout(() => {
        if (map && window.google && window.google.maps) {
          try {
            const bounds = new window.google.maps.LatLngBounds();
            pontosMapa.forEach(ponto => {
              if (ponto.latitude && ponto.longitude) {
                bounds.extend(new window.google.maps.LatLng(ponto.latitude, ponto.longitude));
              }
            });
            
            if (!bounds.isEmpty()) {
              map.fitBounds(bounds);
              
              if (pontosMapa.length === 1) {
                setTimeout(() => {
                  if (map) map.setZoom(15);
                }, 500);
              }
            }
          } catch (error) {
            console.error("Erro ao ajustar mapa:", error);
          }
        }
      }, 1000);
    }
  }, [pontosMapa]);

  const onError = useCallback((error) => {
    console.error('❌ Erro ao carregar Google Maps:', error);
    setLoadingError(error);
    setMapError(true);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const centralizarMapa = useCallback(() => {
    if (map && pontosMapa.length > 0 && window.google && window.google.maps) {
      try {
        const bounds = new window.google.maps.LatLngBounds();
        pontosMapa.forEach(ponto => {
          if (ponto.latitude && ponto.longitude) {
            bounds.extend(new window.google.maps.LatLng(ponto.latitude, ponto.longitude));
          }
        });
        
        if (!bounds.isEmpty()) {
          map.fitBounds(bounds);
        }
      } catch (error) {
        console.error("Erro ao centralizar mapa:", error);
      }
    } else if (map) {
      map.setCenter(CONFIG.MAP.defaultCenter);
      map.setZoom(CONFIG.MAP.defaultZoom);
    }
  }, [map, pontosMapa]);


  // Estilos do mapa (modo escuro)
  const mapStyles = [
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
  ];

  // Se não houver API Key disponível, mostrar mapa fallback
  if (!isGoogleMapsAvailable) {
    return <MapaFallback cargas={cargas} selectedCarga={selectedCarga} setSelectedCarga={setSelectedCarga} />;
  }

  return (
     <>
      <LoadScript 
        googleMapsApiKey={CONFIG.GOOGLE_MAPS_API_KEY}
        loadingElement={
          <div className="bg-gray-700 rounded-lg h-[500px] flex items-center justify-center border border-gray-600">
            <div className="text-center text-gray-400">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p>Carregando Google Maps...</p>
              <p className="text-xs mt-2">API Key: {CONFIG.GOOGLE_MAPS_API_KEY.substring(0, 10)}...</p>
            </div>
          </div>
        }
        onError={onError}
      >
        <div className="relative">
          {/* Legenda atualizada */}
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-gray-600">
              <div className="text-xs text-gray-300 mb-2">Legenda:</div>
              <div className="space-y-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs text-white">Em Movimento</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-xs text-white">Parado</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-xs text-white">Sem Sinal</span>
                </div>
                <div className="flex items-center mt-2">
                  <div className="w-3 h-3 border-2 border-yellow-400 rounded-full mr-2"></div>
                  <span className="text-xs text-yellow-300">Posição Estimada</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute top-4 right-4 z-10">
            <button 
              onClick={centralizarMapa}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-lg flex items-center text-sm font-medium"
              title="Centralizar mapa"
            >
              <span className="mr-2">🎯</span>
              Centralizar Mapa
            </button>
          </div>
          
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
              styles: mapStyles
            }}
          >
            {isLoaded && !mapError && pontosMapa.map((ponto) => (
              <Marker
                key={ponto.id}
                position={{ lat: ponto.latitude, lng: ponto.longitude }}
                onClick={() => {
                  setSelectedCarga(ponto.carga);
                }}
                icon={{
                  url: GpsUtils.getDefaultIcon(ponto.status),
                  scaledSize: new window.google.maps.Size(32, 32)
                }}
              />
            ))}

            {isLoaded && !mapError && selectedCarga && pontosMapa.find(p => p.id === selectedCarga.codigo) && (
              <InfoWindow
                position={{
                  lat: pontosMapa.find(p => p.id === selectedCarga.codigo).latitude,
                  lng: pontosMapa.find(p => p.id === selectedCarga.codigo).longitude
                }}
                onCloseClick={() => setSelectedCarga(null)}
              >
                <div className="bg-gray-900 text-white p-4 rounded-lg max-w-xs border border-gray-600 shadow-xl">
                  <div className="flex items-center mb-3">
                    <div 
                      className="w-4 h-4 rounded-full mr-3 animate-pulse"
                      style={{ 
                        backgroundColor: pontosMapa.find(p => p.id === selectedCarga.codigo).cor 
                      }}
                    ></div>
                    <div>
                      <h3 className="font-bold text-lg text-white">
                        {selectedCarga.codigo}
                      </h3>
                      {pontosMapa.find(p => p.id === selectedCarga.codigo).coordenadasSimuladas && (
                        <div className="text-xs text-yellow-400 mt-1 flex items-center">
                          <span className="mr-1">⚠️</span>
                          Posição estimada
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Veículo:</span>
                      <span className="font-medium text-white">
                        {selectedCarga.veiculo?.matricula || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="font-medium text-green-400">
                        {selectedCarga.status === 'em_transito' ? 'Em Trânsito' : 
                         selectedCarga.status === 'em_entrega' ? 'Em Entrega' : 
                         selectedCarga.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Motorista:</span>
                      <span className="text-white">{selectedCarga.motorista?.nome || 'Não definido'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rota:</span>
                      <span className="text-blue-400">
                        {selectedCarga.origem?.cidade} → {selectedCarga.destino?.cidade}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cliente:</span>
                      <span className="text-white">{selectedCarga.cliente}</span>
                    </div>
                    <div className="border-t border-gray-600 pt-2 mt-2">
                      <div className="text-xs text-gray-400">Coordenadas:</div>
                      <div className="text-xs text-white font-mono">
                        {pontosMapa.find(p => p.id === selectedCarga.codigo).latitude.toFixed(6)}, 
                        {pontosMapa.find(p => p.id === selectedCarga.codigo).longitude.toFixed(6)}
                        {pontosMapa.find(p => p.id === selectedCarga.codigo).coordenadasSimuladas && (
                          <span className="text-yellow-400 ml-2">(estimado)</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="mt-3 w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      const ponto = pontosMapa.find(p => p.id === selectedCarga.codigo);
                      if (ponto) {
                        window.open(
                          `https://www.google.com/maps?q=${ponto.latitude},${ponto.longitude}`,
                          '_blank'
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
        </div>
      </LoadScript>
      
      {/* Mensagem de erro se o mapa não carregar */}
      {mapError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-red-600 mr-2">❌</span>
            <h4 className="font-semibold text-red-700">Erro ao carregar Google Maps</h4>
          </div>
          <p className="text-sm text-red-600 mt-1">
            Verifique se:
          </p>
          <ul className="text-sm text-red-600 mt-1 list-disc list-inside">
            <li>A API Key está correta</li>
            <li>A API "Maps JavaScript API" está ativada no Google Cloud Console</li>
            <li>As restrições de aplicativo estão configuradas corretamente</li>
          </ul>
          <button 
            onClick={() => window.open('https://console.cloud.google.com/google/maps-apis', '_blank')}
            className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Ir para Google Cloud Console
          </button>
        </div>
      )}
      
      <ApiKeyDebug />
    </>
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
  const [trackingData, setTrackingData] = useState({
    cargaId: '',
    lat: '',
    lng: '',
    descricao: '',
    velocidade: '',
    direcao: ''
  });
// Estados para filtros
  const [filters, setFilters] = useState({
    curPage: 1,
    pageSize: 10,
    status: 'em_transito',
    codigo: '',
    cliente: '',
    tipoPercurso: ''
  });

  useEffect(() => {
    fetchCargasEmCurso();
    fetchStats();
    fetchAlertas();
  }, [filters.curPage, filters.status]);

   const fetchCargasEmCurso = async () => {
    try {
      setLoading(true);
      
      const filterData = {
        curPage: filters.curPage,
        pageSize: filters.pageSize,
        status: filters.status || undefined,
        cliente: filters.cliente || undefined,
        codigo: filters.codigo || undefined,
        tipoPercurso: filters.tipoPercurso || undefined
      };

      const response = await axios.post(`${API_BASE_URL}/getCargaList`, filterData);
      
      if (response.data.returnCode === 200) {
        // Filtrar cargas em trânsito ou em entrega
        const cargasEmCurso = response.data.data.list.filter(carga => 
          ['em_transito', 'em_entrega', 'em_fronteira'].includes(carga.status)
        );
        setCargas(cargasEmCurso);
      }
    } catch (error) {
      console.error('Erro ao buscar cargas em curso:', error);
      setCargas(getMockCargas());
    } finally {
      setLoading(false);
    }
  };

   const fetchStats = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/getCargaStats`, {
        dataInicio: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dataFim: new Date().toISOString().split('T')[0]
      });
      
      if (response.data.returnCode === 200) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      setStats(getMockStats());
    }
  };

  const fetchAlertas = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/getCargaList`, {
        curPage: 1,
        pageSize: 100,
        status: 'em_transito'
      });
      
      if (response.data.returnCode === 200) {
        // Analisar cargas para identificar alertas
        const alertasDetectados = [];
        
        response.data.data.list.forEach(carga => {
          // Verificar se há ocorrências
          if (carga.ocorrencias && carga.ocorrencias.length > 0) {
            carga.ocorrencias.forEach(ocorrencia => {
              if (ocorrencia.status !== 'resolvido') {
                alertasDetectados.push({
                  tipo: ocorrencia.tipo,
                  nivel: ocorrencia.severidade || 'medio',
                  descricao: ocorrencia.descricao,
                  cargaCodigo: carga.codigo,
                  data: ocorrencia.dataRegistro,
                  status: ocorrencia.status
                });
              }
            });
          }
          
          // Verificar atrasos
          if (carga.dataEntregaPrevista) {
            const entregaPrevista = new Date(carga.dataEntregaPrevista);
            const agora = new Date();
            const horasAtraso = (agora - entregaPrevista) / (1000 * 60 * 60);
            
            if (horasAtraso > 2 && carga.status !== 'entregue') {
              alertasDetectados.push({
                tipo: 'atraso',
                nivel: horasAtraso > 6 ? 'critico' : 'alto',
                descricao: `Atraso de ${Math.round(horasAtraso)} horas`,
                cargaCodigo: carga.codigo,
                data: agora,
                status: 'pendente'
              });
            }
          }
          
          // Verificar sensores IOT
          if (carga.sensoresIOT) {
            const sensores = carga.sensoresIOT;
            
            if (sensores.aberturaPorta && carga.status === 'em_transito') {
              alertasDetectados.push({
                tipo: 'seguranca',
                nivel: 'alto',
                descricao: 'Porta do contentor aberta durante trânsito',
                cargaCodigo: carga.codigo,
                data: new Date(),
                status: 'pendente'
              });
            }
            
            if (sensores.movimentoBruscoDetectado) {
              alertasDetectados.push({
                tipo: 'movimento',
                nivel: 'medio',
                descricao: 'Movimento brusco detectado',
                cargaCodigo: carga.codigo,
                data: new Date(),
                status: 'pendente'
              });
            }
          }
        });
        
        setAlertas(alertasDetectados);
      }
    } catch (error) {
      console.error('Erro ao buscar alertas:', error);
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
        rotaRealizada: [{ lat: -25.9692, lng: 32.5732, data: "2024-01-15T10:00:00Z" }]
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
        distanciaKm: 200
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
        gps: { codigo: "GPS-001", bateriaPercentual: 85, ultimaComunicacao: new Date().toISOString() }
      }
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
      distanciaTotal: 1845
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
        status: "pendente"
      },
      {
        tipo: "seguranca",
        nivel: "alto",
        descricao: "DESVIO DE ROTA NÃO AUTORIZADO",
        cargaCodigo: "CARGA-005",
        data: "2024-01-15T09:15:00Z",
        status: "pendente"
      }
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
        direcao: trackingData.direcao
      });

      if (response.data.returnCode === 200) {
        alert('Tracking atualizado com sucesso!');
        setTrackingData({
          cargaId: '',
          lat: '',
          lng: '',
          descricao: '',
          velocidade: '',
          direcao: ''
        });
        fetchCargasEmCurso();
      }
    } catch (error) {
      console.error('Erro ao atualizar tracking:', error);
      alert('Erro ao atualizar tracking');
    }
  };

  const handleAddOcorrencia = async (cargaCodigo, ocorrenciaData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/addOcorrenciaCarga`, {
        codigo: cargaCodigo,
        ocorrenciaData: {
          tipo: ocorrenciaData.tipo,
          descricao: ocorrenciaData.descricao,
          severidade: ocorrenciaData.severidade || 'medio'
        }
      });

      if (response.data.returnCode === 200) {
        alert('Ocorrência registrada com sucesso!');
        fetchAlertas();
      }
    } catch (error) {
      console.error('Erro ao adicionar ocorrência:', error);
      alert('Erro ao registrar ocorrência');
    }
  };

  const handleUpdateStatus = async (codigo, novoStatus) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/updateCargaStatus`, {
        codigo,
        status: novoStatus,
        observacao: "Status atualizado via interface",
        local: "Monitoramento em curso"
      });

      if (response.data.returnCode === 200) {
        alert('Status atualizado com sucesso!');
        fetchCargasEmCurso();
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status');
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'em_transito': { color: 'bg-green-500', text: 'Em Trânsito', label: 'EM TRÂNSITO' },
      'em_entrega': { color: 'bg-purple-500', text: 'Em Entrega', label: 'EM ENTREGA' },
      'em_fronteira': { color: 'bg-yellow-500', text: 'Em Fronteira', label: 'EM FRONTEIRA' },
      'atrasado': { color: 'bg-red-500', text: 'Atrasado', label: 'ATRASADO' }
    };

    const config = statusMap[status] || { color: 'bg-gray-500', text: 'Desconhecido', label: 'DESCONHECIDO' };
    
    return (
      <span className={`${config.color} text-white px-2 py-1 rounded text-sm font-medium`}>
        {config.label}
      </span>
    );
  };

  const calculateDeliveryStatus = (carga) => {
    if (!carga.dataEntregaPrevista) return 'no-prazo';
    
    const entregaPrevista = new Date(carga.dataEntregaPrevista);
    const agora = new Date();
    const horasAtraso = (agora - entregaPrevista) / (1000 * 60 * 60);
    
    if (carga.status === 'entregue') return 'entregue';
    if (horasAtraso > 6) return 'critico';
    if (horasAtraso > 2) return 'atrasado';
    if (horasAtraso > 0) return 'pequeno-atraso';
    return 'no-prazo';
  };

  const getDeliveryStatusText = (status) => {
    const statusMap = {
      'no-prazo': { text: 'No prazo', color: 'text-green-600', badge: 'bg-green-500' },
      'pequeno-atraso': { text: 'Pequeno atraso', color: 'text-yellow-600', badge: 'bg-yellow-500' },
      'atrasado': { text: 'Atrasado', color: 'text-orange-600', badge: 'bg-orange-500' },
      'critico': { text: 'Atraso crítico', color: 'text-red-600', badge: 'bg-red-500' },
      'entregue': { text: 'Entregue', color: 'text-teal-600', badge: 'bg-teal-500' }
    };
    return statusMap[status] || statusMap['no-prazo'];
  };

  const getAlertaBadge = (nivel) => {
    const nivelMap = {
      'critico': { color: 'bg-red-500', icon: '🔴' },
      'alto': { color: 'bg-orange-500', icon: '🟠' },
      'medio': { color: 'bg-yellow-500', icon: '🟡' },
      'baixo': { color: 'bg-blue-500', icon: '🔵' }
    };
    return nivelMap[nivel] || { color: 'bg-gray-500', icon: '⚪' };
  };

  const getAlertaText = (tipo) => {
    const tipoMap = {
      'atraso': 'Atraso',
      'avaria': 'Avaria',
      'roubo': 'Roubo',
      'acidente': 'Acidente',
      'seguranca': 'Segurança',
      'movimento': 'Movimento'
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
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            🚚
          </span>
          Carga em Curso - Monitoramento de Cargas em Andamento
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Acompanhamento em tempo real de cargas em trânsito e em processo de entrega
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação entre Formulários */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveCursoForm("monitoramento")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCursoForm === "monitoramento"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📍 Monitoramento
          </button>
          <button
            onClick={() => setActiveCursoForm("alertas")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCursoForm === "alertas"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ⚠️ Alertas
          </button>
          <button
            onClick={() => setActiveCursoForm("tracking")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCursoForm === "tracking"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🛣️ Tracking
          </button>
        </div>

        {/* Monitoramento em Tempo Real */}
        {activeCursoForm === "monitoramento" && (
          <div className="space-y-6">
            {/* Métricas Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Em Trânsito
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? '...' : cargas.filter(c => c.status === 'em_transito').length}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">🛣️</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    {cargas.length > 0 ? 
                      `${Math.round((cargas.filter(c => calculateDeliveryStatus(c) === 'no-prazo').length / cargas.length) * 100)}% no prazo` : 
                      '...'}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Em Entrega
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? '...' : cargas.filter(c => c.status === 'em_entrega').length}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">📦</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    {new Set(cargas.map(c => c.destino?.cidade)).size} destinos
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Atrasados
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? '...' : cargas.filter(c => ['atrasado', 'critico'].includes(calculateDeliveryStatus(c))).length}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">⚠️</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    Necessitam ação
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Alertas Ativos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {alertas.length}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">🚨</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    {alertas.filter(a => a.nivel === 'critico').length} críticos
                  </span>
                </div>
              </div>
            </div>

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
                      Lista de Cargas em Curso ({cargas.length})
                    </h3>
                    <div className="flex space-x-2">
                      <select 
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                        value={filters.status}
                        onChange={(e) => setFilters({...filters, status: e.target.value})}
                      >
                        <option value="em_transito">Em Trânsito</option>
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
                        <p className="text-gray-600 mt-2">Carregando cargas...</p>
                      </div>
                    ) : cargas.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-600">Nenhuma carga em curso encontrada</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cargas.map((carga, index) => {
                          const progress = calculateProgress(carga);
                          const status = calculateDeliveryStatus(carga);
                          const statusConfig = getDeliveryStatusText(status);
                          
                          return (
                            <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                                      {carga.codigo}
                                    </span>
                                    {getStatusBadge(carga.status)}
                                    <span className={`px-2 py-1 rounded text-sm font-medium ${statusConfig.badge} text-white`}>
                                      {statusConfig.text.toUpperCase()}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                      {Math.round(progress)}% concluído
                                    </span>
                                  </div>
                                  <p className="font-medium text-gray-900">
                                    {carga.veiculo?.matricula || 'Sem veículo'} • {carga.origem?.cidade} → {carga.destino?.cidade}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {carga.tipoCarga} • {carga.pesoBruto ? `${(carga.pesoBruto / 1000).toFixed(1)} ton` : ''} • {carga.motorista?.nome || 'Motorista não definido'}
                                  </p>
                                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                    <span>📍 {carga.pontoAtual?.descricao || 'Posição não disponível'}</span>
                                    {carga.dataEntregaPrevista && (
                                      <span>⏰ Previsão: {new Date(carga.dataEntregaPrevista).toLocaleString('pt-PT', { hour: '2-digit', minute: '2-digit' })}</span>
                                    )}
                                    <span>📞 {carga.motorista?.telefone || 'Sem telefone'}</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className={`text-sm font-medium ${statusConfig.color}`}>
                                    {statusConfig.text}
                                  </p>
                                  <div className="flex space-x-2 mt-2">
                                    <button 
                                      onClick={() => setSelectedCarga(carga)}
                                      className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                                    >
                                      Detalhes
                                    </button>
                                    {carga.status === 'em_transito' && (
                                      <button 
                                        onClick={() => handleUpdateStatus(carga.codigo, 'em_entrega')}
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
                        const cargasNoPrazo = cargas.filter(c => calculateDeliveryStatus(c) === 'no-prazo');
                        // Aqui você pode implementar uma visualização específica
                      }}
                      className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950"
                    >
                      🟢 No Prazo
                    </button>
                    <button 
                      onClick={() => {
                        const cargasPequenoAtraso = cargas.filter(c => calculateDeliveryStatus(c) === 'pequeno-atraso');
                      }}
                      className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950"
                    >
                      🟡 Pequeno Atraso
                    </button>
                    <button 
                      onClick={() => {
                        const cargasAtrasadas = cargas.filter(c => ['atrasado', 'critico'].includes(calculateDeliveryStatus(c)));
                      }}
                      className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950"
                    >
                      🔴 Atrasados
                    </button>
                    <button 
                      onClick={() => {
                        const cargasProximo = cargas.filter(c => calculateProgress(c) > 90);
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
                        <p className="font-medium">{getStatusBadge(selectedCarga.status)}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Cliente:</span>
                        <p className="font-medium">{selectedCarga.cliente}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Rota:</span>
                        <p className="font-medium">{selectedCarga.origem?.cidade} → {selectedCarga.destino?.cidade}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Motorista:</span>
                        <p className="font-medium">{selectedCarga.motorista?.nome || 'Não definido'}</p>
                      </div>
                      {selectedCarga.pontoAtual && (
                        <div>
                          <span className="text-gray-600">Posição Atual:</span>
                          <p className="font-medium">{selectedCarga.pontoAtual.descricao}</p>
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
                      onClick={() => handleAddOcorrencia(selectedCarga?.codigo || cargas[0]?.codigo, {
                        tipo: 'atraso',
                        descricao: 'Reportar problema na carga',
                        severidade: 'medio'
                      })}
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
                      onClick={() => setActiveCursoForm('tracking')}
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
                    <p className="text-gray-600">Nenhum alerta ativo no momento</p>
                  </div>
                ) : (
                  alertas.map((alerta, index) => {
                    const badgeConfig = getAlertaBadge(alerta.nivel);
                    
                    return (
                      <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className={`${badgeConfig.color} text-white p-2 rounded-lg`}>
                              {badgeConfig.icon}
                            </span>
                            <div>
                              <p className="font-medium text-gray-900">
                                {getAlertaText(alerta.tipo).toUpperCase()} - {alerta.nivel.toUpperCase()}
                              </p>
                              <p className="text-sm text-gray-600">
                                {alerta.cargaCodigo} • {new Date(alerta.data).toLocaleString('pt-PT')}
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
                                const carga = cargas.find(c => c.codigo === alerta.cargaCodigo);
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
                        const carga = cargas.find(c => c.codigo === e.target.value);
                        if (carga) setSelectedCarga(carga);
                      }}
                    >
                      <option value="">Selecione a carga</option>
                      {cargas.map(carga => (
                        <option key={carga.codigo} value={carga.codigo}>
                          {carga.codigo} - {carga.origem?.cidade} → {carga.destino?.cidade}
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
                        tipo: 'atraso',
                        descricao: 'Incidente reportado via interface',
                        severidade: 'medio'
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
                          onChange={(e) => setTrackingData({...trackingData, cargaId: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        >
                          <option value="">Selecione a carga</option>
                          {cargas.map(carga => (
                            <option key={carga.codigo} value={carga.codigo}>
                              {carga.codigo} - {carga.origem?.cidade} → {carga.destino?.cidade}
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
                          onChange={(e) => setTrackingData({...trackingData, descricao: e.target.value})}
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
                          onChange={(e) => setTrackingData({...trackingData, lat: e.target.value})}
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
                          onChange={(e) => setTrackingData({...trackingData, lng: e.target.value})}
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
                          onChange={(e) => setTrackingData({...trackingData, velocidade: e.target.value})}
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
                          onChange={(e) => setTrackingData({...trackingData, direcao: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="Norte"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => setTrackingData({
                          cargaId: '',
                          lat: '',
                          lng: '',
                          descricao: '',
                          velocidade: '',
                          direcao: ''
                        })}
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
                    <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm font-medium text-gray-950">
                        {carga.codigo}
                      </p>
                      <p className="text-xs text-gray-600">
                        {carga.pontoAtual?.descricao || 'Posição não disponível'}
                      </p>
                      {carga.pontoAtual && (
                        <p className="text-xs text-blue-600 font-medium">
                          {carga.pontoAtual.lat?.toFixed(4)}, {carga.pontoAtual.lng?.toFixed(4)}
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
                      {cargas.filter(c => c.gps?.codigo).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Última Atualização:</span>
                    <span className="font-semibold text-gray-950">
                      {cargas.length > 0 
                        ? new Date(Math.max(...cargas.map(c => new Date(c.gps?.ultimaComunicacao || 0)))).toLocaleTimeString('pt-PT')
                        : '--:--'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GPS Ativos:</span>
                    <span className="font-semibold text-gray-950">
                      {cargas.filter(c => c.gps?.bateriaPercentual > 20).length}
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