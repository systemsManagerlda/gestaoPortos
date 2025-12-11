import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";

// Importando componentes do Google Maps
import { LoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

// Constantes de configuração
const CONFIG = {
  GOOGLE_MAPS_API_KEY: 'AIzaSyB5Y1PUBVawvwuSUZEipJVLrEX9lV6Yn_0',
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

// Utilitários do mapa original
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

    return configs[status] || configs.outro;
  }

  static getVelocidadeColor(velocidade) {
    if (velocidade === 0) return 'text-gray-400';
    if (velocidade <= 60) return 'text-green-400';
    if (velocidade <= 80) return 'text-yellow-400';
    return 'text-red-400';
  }

  static formatarUltimaAtualizacao(data) {
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

  static getDefaultIcon(status) {
    const icons = {
      movimento: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      parado: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      sem_sinal: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      excesso_velocidade: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      ignicao: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      outro: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
    };
    return icons[status] || 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
  }
}

// Componente do Mapa Google Maps reutilizado
const MapaMonitoramento = ({ 
  pontosMapa, 
  pontoSelecionado, 
  setPontoSelecionado
}) => {
  const [map, setMap] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = useCallback((map) => {
    setMap(map);
    setIsLoaded(true);
    
    // Ajustar zoom para mostrar todos os marcadores se houver pontos
    if (pontosMapa.length > 0) {
      setTimeout(() => {
        if (map) {
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
    }
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
          {isLoaded && pontosMapa.map((ponto) => (
            <Marker
              key={ponto.id}
              position={{ lat: ponto.latitude, lng: ponto.longitude }}
              onClick={() => setPontoSelecionado(ponto)}
              icon={{
                url: GpsUtils.getDefaultIcon(ponto.status),
                scaledSize: new window.google.maps.Size(32, 32)
              }}
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

// Componente simplificado para mostrar dados
const MapaVazio = () => {
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
      <div className="relative h-96">
        <GoogleMap
          mapContainerStyle={CONFIG.MAP.containerStyle}
          center={CONFIG.MAP.defaultCenter}
          zoom={CONFIG.MAP.defaultZoom}
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
            ]
          }}
        >
          {/* Nenhum marcador - mapa vazio */}
        </GoogleMap>
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-md">
            <div className="text-4xl mb-4">🗺️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum veículo para mostrar</h3>
            <p className="text-gray-600 mb-4">
              Não há caminhões disponíveis com os filtros aplicados.
              Tente ajustar os filtros ou aguarde novos dados.
            </p>
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => window.location.reload()}
            >
              Atualizar Dados
            </button>
          </div>
        </div>
      </div>
    </LoadScript>
  );
};

// Componente principal atualizado com mapa
export const GPSCaminhoesPanel = ({ activeGPSForm, setActiveGPSForm }) => {
  // Estados para dados dinâmicos
  const [caminhoes, setCaminhoes] = useState([]);
  const [caminhoesFiltrados, setCaminhoesFiltrados] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [estatisticas, setEstatisticas] = useState({
    total: 0,
    emMovimento: 0,
    parados: 0,
    offline: 0,
    manutencao: 0,
    gpsVip: 0,
    gpsNormal: 0,
    camioesComGPSExpirado: 0,
    camioesComInspecaoInvalida: 0,
    porCategoria: {
      A: 0,
      B: 0,
      C: 0
    },
    porTransportadora: {}
  });

  // Estados para filtros
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [filtroTipoGPS, setFiltroTipoGPS] = useState("todos");
  const [filtroTransportadora, setFiltroTransportadora] = useState("todos");
  const [transportadoras, setTransportadoras] = useState([]);
  const [motoristas, setMotoristas] = useState([]);

  // Estados para o mapa
  const [pontoSelecionado, setPontoSelecionado] = useState(null);
  const [pontosMapa, setPontosMapa] = useState([]);

  // Estado para dados mock (se API falhar)
  const [usandoDadosMock, setUsandoDadosMock] = useState(false);

  // Dados mock para demonstração
  const dadosMock = [
    {
      camiaoId: 1,
      matricula: "ADM 456 MP",
      marca: "Mercedes",
      modelo: "Actros",
      transportadoraId: 1,
      motoristaId: 1,
      status: "em_viagem",
      tipoGPS: { tipo: "vip" },
      gpsVipAtivo: true,
      diasExpiracaoGPS: 45,
      nivelInspecao: { categoria: "A" },
      inspecaoValida: true
    },
    {
      camiaoId: 2,
      matricula: "ACL 234 BG",
      marca: "Volvo",
      modelo: "FH16",
      transportadoraId: 2,
      motoristaId: 2,
      status: "disponivel",
      tipoGPS: { tipo: "normal" },
      gpsVipAtivo: false,
      diasExpiracaoGPS: 15,
      nivelInspecao: { categoria: "B" },
      inspecaoValida: true
    },
    {
      camiaoId: 3,
      matricula: "AMN 678 TT",
      marca: "Scania",
      modelo: "R500",
      transportadoraId: 1,
      motoristaId: 3,
      status: "inativo",
      tipoGPS: { tipo: "vip" },
      gpsVipAtivo: true,
      diasExpiracaoGPS: -5,
      nivelInspecao: { categoria: "C" },
      inspecaoValida: false
    },
    {
      camiaoId: 4,
      matricula: "BTR 789 KL",
      marca: "MAN",
      modelo: "TGX",
      transportadoraId: 3,
      motoristaId: 4,
      status: "manutencao",
      tipoGPS: { tipo: "normal" },
      gpsVipAtivo: false,
      diasExpiracaoGPS: 120,
      nivelInspecao: { categoria: "A" },
      inspecaoValida: true
    },
    {
      camiaoId: 5,
      matricula: "CDR 123 FG",
      marca: "Iveco",
      modelo: "Stralis",
      transportadoraId: 2,
      motoristaId: 5,
      status: "em_viagem",
      tipoGPS: { tipo: "normal" },
      gpsVipAtivo: false,
      diasExpiracaoGPS: 30,
      nivelInspecao: { categoria: "B" },
      inspecaoValida: true
    }
  ];

  const transportadorasMock = [
    { transportadoraId: 1, nome: "Transportes Moçambique" },
    { transportadoraId: 2, nome: "Logística África" },
    { transportadoraId: 3, nome: "Cargas Express" }
  ];

  const motoristasMock = [
    { motoristaId: 1, nomeCompleto: "Fernando Matola" },
    { motoristaId: 2, nomeCompleto: "Lúcia Nhampoca" },
    { motoristaId: 3, nomeCompleto: "Carlos Zandamela" },
    { motoristaId: 4, nomeCompleto: "Ana Silva" },
    { motoristaId: 5, nomeCompleto: "Pedro Costa" }
  ];

  // Converter caminhões para pontos do mapa
  const converterParaPontosMapa = useCallback((caminhoesLista) => {
    if (!caminhoesLista || caminhoesLista.length === 0) return [];
    
    return caminhoesLista.map((camiao, index) => {
      // Gerar coordenadas baseadas no índice para consistência
      const baseLat = -25.965277 + (index * 0.1);
      const baseLng = 32.589169 + (index * 0.1);
      
      const velocidade = camiao.status === "em_viagem" ? 
        Math.floor(Math.random() * 100) + 30 : 
        Math.floor(Math.random() * 20);
      
      const status = camiao.status === "em_viagem" ? 'movimento' : 
                    camiao.status === "disponivel" ? 'parado' : 
                    'sem_sinal';
      
      const statusConfig = GpsUtils.getStatusConfig(status);
      
      // Encontrar nome do motorista
      const motorista = motoristas.find(m => m.motoristaId === camiao.motoristaId)?.nomeCompleto || "Não atribuído";
      
      return {
        id: camiao.camiaoId?.toString() || `mock-${index}`,
        latitude: baseLat,
        longitude: baseLng,
        dispositivo: `GPS-${camiao.matricula}`,
        veiculo: `${camiao.marca} ${camiao.modelo}`,
        placa: camiao.matricula,
        motorista: motorista,
        status: status,
        cor: statusConfig.cor,
        velocidade: velocidade,
        endereco: 'Localização em tempo real...',
        ultimaAtualizacao: 'há alguns minutos',
        ignicao: camiao.status === "em_viagem",
        data: new Date().toISOString().split('T')[0],
        horario: new Date().toLocaleTimeString('pt-PT', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        evento: status
      };
    });
  }, [motoristas]);

  // Atualizar pontos do mapa quando os dados mudarem
  useEffect(() => {
    const pontos = converterParaPontosMapa(caminhoesFiltrados);
    setPontosMapa(pontos);
  }, [caminhoesFiltrados, converterParaPontosMapa]);

  // Buscar dados da API
  useEffect(() => {
    carregarDadosCompletos();
  }, []);

  const carregarDadosCompletos = async () => {
    try {
      setLoading(true);
      
      // Usar dados mock diretamente para evitar problemas de API
      console.log("Carregando dados mock...");
      
      // Simular delay de carregamento
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCaminhoes(dadosMock);
      setCaminhoesFiltrados(dadosMock);
      setTransportadoras(transportadorasMock);
      setMotoristas(motoristasMock);
      
      calcularEstatisticas(dadosMock);
      carregarAlertasReais(dadosMock);
      setUsandoDadosMock(true);
      
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      // Em caso de erro, usar dados mock
      setCaminhoes(dadosMock);
      setCaminhoesFiltrados(dadosMock);
      setTransportadoras(transportadorasMock);
      setMotoristas(motoristasMock);
      
      calcularEstatisticas(dadosMock);
      carregarAlertasReais(dadosMock);
      setUsandoDadosMock(true);
    } finally {
      setLoading(false);
    }
  };

  const carregarAlertasReais = (camioes) => {
    try {
      const alertasReais = [];
      const hoje = new Date();

      camioes.forEach((camiao) => {
        if (
          camiao.diasExpiracaoGPS !== null &&
          camiao.diasExpiracaoGPS < 30 &&
          camiao.diasExpiracaoGPS > 0
        ) {
          alertasReais.push({
            id: `${camiao.camiaoId}_gps`,
            tipo: "gps_expiracao",
            titulo: "GPS Próximo de Expirar",
            descricao: `${camiao.matricula} • ${camiao.diasExpiracaoGPS} dias restantes`,
            severidade: "media",
            timestamp: hoje.toLocaleTimeString("pt-PT", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            camiaoId: camiao.camiaoId,
            matricula: camiao.matricula,
          });
        }

        if (camiao.diasExpiracaoGPS !== null && camiao.diasExpiracaoGPS < 0) {
          alertasReais.push({
            id: `${camiao.camiaoId}_gps_expirado`,
            tipo: "gps_expirado",
            titulo: "GPS Expirado",
            descricao: `${camiao.matricula} • GPS expirado há ${Math.abs(
              camiao.diasExpiracaoGPS
            )} dias`,
            severidade: "alta",
            timestamp: hoje.toLocaleTimeString("pt-PT", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            camiaoId: camiao.camiaoId,
            matricula: camiao.matricula,
          });
        }

        if (!camiao.inspecaoValida) {
          alertasReais.push({
            id: `${camiao.camiaoId}_inspecao`,
            tipo: "inspecao_invalida",
            titulo: "Inspeção Vencida",
            descricao: `${camiao.matricula} • Categoria ${
              camiao.nivelInspecao?.categoria || "N/A"
            }`,
            severidade: "alta",
            timestamp: hoje.toLocaleTimeString("pt-PT", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            camiaoId: camiao.camiaoId,
            matricula: camiao.matricula,
          });
        }

        if (camiao.tipoGPS?.tipo === "vip" && !camiao.gpsVipAtivo) {
          alertasReais.push({
            id: `${camiao.camiaoId}_vip_inativo`,
            tipo: "vip_inativo",
            titulo: "GPS VIP Inativo",
            descricao: `${camiao.matricula} • GPS VIP não está ativo`,
            severidade: "media",
            timestamp: hoje.toLocaleTimeString("pt-PT", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            camiaoId: camiao.camiaoId,
            matricula: camiao.matricula,
          });
        }
      });

      setAlertas(alertasReais.slice(0, 10));
    } catch (error) {
      console.error("Erro ao carregar alertas:", error);
      setAlertas([]);
    }
  };

  const calcularEstatisticas = (camioes) => {
    if (!camioes || camioes.length === 0) {
      setEstatisticas({
        total: 0,
        emMovimento: 0,
        parados: 0,
        offline: 0,
        manutencao: 0,
        gpsVip: 0,
        gpsNormal: 0,
        camioesComGPSExpirado: 0,
        camioesComInspecaoInvalida: 0,
        porCategoria: { A: 0, B: 0, C: 0 },
        porTransportadora: {}
      });
      return;
    }

    const estatisticasCalculadas = {
      total: camioes.length,
      emMovimento: camioes.filter((c) => c.status === "em_viagem").length,
      parados: camioes.filter(
        (c) => c.status === "disponivel" || c.status === "reservado"
      ).length,
      offline: camioes.filter((c) => c.status === "inativo").length,
      manutencao: camioes.filter((c) => c.status === "manutencao").length,
      gpsVip: camioes.filter((c) => c.tipoGPS?.tipo === "vip" && c.gpsVipAtivo)
        .length,
      gpsNormal: camioes.filter((c) => c.tipoGPS?.tipo === "normal").length,
      camioesComGPSExpirado: camioes.filter(
        (c) => c.diasExpiracaoGPS !== null && c.diasExpiracaoGPS < 0
      ).length,
      camioesComInspecaoInvalida: camioes.filter((c) => !c.inspecaoValida)
        .length,
      porCategoria: {
        A: camioes.filter((c) => c.nivelInspecao?.categoria === "A").length,
        B: camioes.filter((c) => c.nivelInspecao?.categoria === "B").length,
        C: camioes.filter((c) => c.nivelInspecao?.categoria === "C").length,
      },
      porTransportadora: {},
    };

    camioes.forEach((camiao) => {
      if (camiao.transportadoraId) {
        const transportadoraId = camiao.transportadoraId.toString();
        if (
          !estatisticasCalculadas.porTransportadora[transportadoraId]
        ) {
          estatisticasCalculadas.porTransportadora[transportadoraId] = 0;
        }
        estatisticasCalculadas.porTransportadora[transportadoraId]++;
      }
    });

    setEstatisticas(estatisticasCalculadas);
  };

  const aplicarFiltros = () => {
    let filtrados = [...caminhoes];

    if (filtroStatus !== "todos") {
      filtrados = filtrados.filter((c) => {
        switch (filtroStatus) {
          case "em_movimento":
            return c.status === "em_viagem";
          case "parado":
            return c.status === "disponivel" || c.status === "reservado";
          case "offline":
            return c.status === "inativo";
          case "manutencao":
            return c.status === "manutencao";
          default:
            return true;
        }
      });
    }

    if (filtroCategoria !== "todos") {
      filtrados = filtrados.filter(
        (c) => c.nivelInspecao?.categoria === filtroCategoria
      );
    }

    if (filtroTipoGPS !== "todos") {
      filtrados = filtrados.filter((c) => {
        if (filtroTipoGPS === "vip") {
          return c.tipoGPS?.tipo === "vip" && c.gpsVipAtivo;
        } else if (filtroTipoGPS === "normal") {
          return c.tipoGPS?.tipo === "normal";
        } else if (filtroTipoGPS === "expirado") {
          return c.diasExpiracaoGPS !== null && c.diasExpiracaoGPS < 0;
        } else if (filtroTipoGPS === "ativo") {
          return c.diasExpiracaoGPS === null || c.diasExpiracaoGPS > 0;
        }
        return true;
      });
    }

    if (filtroTransportadora !== "todos") {
      filtrados = filtrados.filter(
        (c) => c.transportadoraId === parseInt(filtroTransportadora)
      );
    }

    setCaminhoesFiltrados(filtrados);
  };

  useEffect(() => {
    aplicarFiltros();
  }, [
    filtroStatus,
    filtroCategoria,
    filtroTipoGPS,
    filtroTransportadora,
    caminhoes,
  ]);

  const handleAtualizarGPS = async (camiaoId, tipoGPS) => {
    try {
      // Simular atualização
      setCaminhoes(prev => prev.map(camiao => 
        camiao.camiaoId === camiaoId 
          ? { 
              ...camiao, 
              tipoGPS: { tipo: tipoGPS },
              gpsVipAtivo: tipoGPS === "vip" 
            } 
          : camiao
      ));
      
      alert("GPS atualizado com sucesso!");
      carregarDadosCompletos();
    } catch (error) {
      console.error("Erro ao atualizar GPS:", error);
      alert("Erro ao atualizar GPS: " + error.message);
    }
  };

  const handleAssociarMotorista = async (camiaoId, motoristaId) => {
    try {
      // Simular associação
      setCaminhoes(prev => prev.map(camiao => 
        camiao.camiaoId === camiaoId 
          ? { ...camiao, motoristaId: parseInt(motoristaId) } 
          : camiao
      ));
      
      alert("Motorista associado com sucesso!");
      carregarDadosCompletos();
    } catch (error) {
      console.error("Erro ao associar motorista:", error);
      alert("Erro ao associar motorista: " + error.message);
    }
  };

  const handleResolverAlerta = async (alertaId, camiaoId) => {
    try {
      setAlertas((prev) => prev.filter((a) => a.id !== alertaId));
      alert(`Alerta ${alertaId} resolvido para o camião ${camiaoId}`);
    } catch (error) {
      console.error("Erro ao resolver alerta:", error);
    }
  };

  // Renderização condicional baseada no loading
  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
        <p className="mt-4 text-gray-600">Carregando dados dos camiões...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col text-gray-950">
      {/* Cabeçalho */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="bg-red-500 text-white p-2 rounded-lg mr-3">
                🚛
              </span>
              GPS Camiões - Monitoramento da Frota
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Total: {estatisticas.total} camiões • VIP: {estatisticas.gpsVip} •
              Em Movimento: {estatisticas.emMovimento} • Alertas:{" "}
              {alertas.length}
              {usandoDadosMock && " • Usando dados de demonstração"}
            </p>
          </div>
          <button
            onClick={carregarDadosCompletos}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center"
          >
            🔄 Atualizar Dados
          </button>
        </div>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          {[
            "monitoramento",
            "gerenciamento",
            "alertas",
            "graficos",
            "relatorios",
          ].map((form) => (
            <button
              key={form}
              onClick={() => setActiveGPSForm(form)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeGPSForm === form
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {form === "monitoramento" && "🗺️ Monitoramento"}
              {form === "gerenciamento" && "⚙️ Gerenciamento"}
              {form === "alertas" && `⚠️ Alertas (${alertas.length})`}
              {form === "graficos" && "📈 Gráficos"}
              {form === "relatorios" && "📊 Relatórios"}
            </button>
          ))}
        </div>

        {/* Conteúdo Dinâmico */}
        {activeGPSForm === "monitoramento" && (
          <div className="space-y-6">
            {/* Painel de Filtros */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-red-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-red-500 text-white p-2 rounded-lg mr-2">
                    🔍
                  </span>
                  Filtros e Controles
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={filtroStatus}
                      onChange={(e) => setFiltroStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                    >
                      <option value="todos">Todos os Status</option>
                      <option value="em_movimento">Em Movimento</option>
                      <option value="parado">Disponíveis/Parados</option>
                      <option value="offline">Offline</option>
                      <option value="manutencao">Manutenção</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoria
                    </label>
                    <select
                      value={filtroCategoria}
                      onChange={(e) => setFiltroCategoria(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                    >
                      <option value="todos">Todas Categorias</option>
                      <option value="A">A - Chanté</option>
                      <option value="B">B - Nacional</option>
                      <option value="C">C - Trânsito</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de GPS
                    </label>
                    <select
                      value={filtroTipoGPS}
                      onChange={(e) => setFiltroTipoGPS(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                    >
                      <option value="todos">Todos os GPS</option>
                      <option value="vip">VIP Ativo</option>
                      <option value="normal">Normal</option>
                      <option value="expirado">Expirado</option>
                      <option value="ativo">Ativo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transportadora
                    </label>
                    <select
                      value={filtroTransportadora}
                      onChange={(e) =>
                        setFiltroTransportadora(e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                    >
                      <option value="todos">Todas Transportadoras</option>
                      {transportadoras.map((t) => (
                        <option
                          key={t.transportadoraId}
                          value={t.transportadoraId}
                        >
                          {t.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={carregarDadosCompletos}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Atualizar Dados
                  </button>
                  <span className="text-sm text-gray-600">
                    {caminhoesFiltrados.length} camiões encontrados
                  </span>
                </div>
              </div>
            </div>

            {/* Mapa Google Maps */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                      🗺️
                    </span>
                    Mapa em Tempo Real - {pontosMapa.length} Veículos
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
              </div>
              <div className="p-4">
                <div className="rounded-lg overflow-hidden border border-gray-300">
                  {pontosMapa.length > 0 ? (
                    <MapaMonitoramento
                      pontosMapa={pontosMapa}
                      pontoSelecionado={pontoSelecionado}
                      setPontoSelecionado={setPontoSelecionado}
                    />
                  ) : (
                    <MapaVazio />
                  )}
                </div>
              </div>
            </div>

            {/* Lista de Camiões */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900">
                  Lista de Camiões ({caminhoesFiltrados.length})
                </h3>
              </div>
              <div className="p-6">
                {caminhoesFiltrados.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Matrícula
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Marca/Modelo
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Categoria
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            GPS
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {caminhoesFiltrados.slice(0, 10).map((camiao) => (
                          <tr
                            key={camiao.camiaoId}
                            className="hover:bg-gray-50"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-900">
                                {camiao.matricula}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {camiao.marca} {camiao.modelo}
                              </div>
                              <div className="text-xs text-gray-500">
                                ID: {camiao.camiaoId}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  camiao.status === "em_viagem"
                                    ? "bg-green-100 text-green-800"
                                    : camiao.status === "disponivel"
                                    ? "bg-blue-100 text-blue-800"
                                    : camiao.status === "manutencao"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {camiao.status === "em_viagem"
                                  ? "Em Viagem"
                                  : camiao.status === "disponivel"
                                  ? "Disponível"
                                  : camiao.status === "manutencao"
                                  ? "Manutenção"
                                  : "Inativo"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  camiao.nivelInspecao?.categoria === "C"
                                    ? "bg-green-100 text-green-800"
                                    : camiao.nivelInspecao?.categoria === "B"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {camiao.nivelInspecao?.categoria || "N/A"} -{" "}
                                {camiao.nivelInspecao?.categoria === "C"
                                  ? "Trânsito"
                                  : camiao.nivelInspecao?.categoria === "B"
                                  ? "Nacional"
                                  : "Chanté"}
                              </span>
                              {!camiao.inspecaoValida && (
                                <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  Inspeção Vencida
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    camiao.tipoGPS?.tipo === "vip"
                                      ? "bg-purple-100 text-purple-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {camiao.tipoGPS?.tipo === "vip"
                                    ? "VIP"
                                    : "Normal"}
                                  {camiao.gpsVipAtivo && " ⭐"}
                                </span>
                                {camiao.diasExpiracaoGPS !== null &&
                                  camiao.diasExpiracaoGPS < 30 && (
                                    <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                      {camiao.diasExpiracaoGPS > 0
                                        ? `${camiao.diasExpiracaoGPS}d restantes`
                                        : "Expirado"}
                                    </span>
                                  )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() =>
                                  handleAtualizarGPS(
                                    camiao.camiaoId,
                                    camiao.tipoGPS?.tipo === "vip"
                                      ? "normal"
                                      : "vip"
                                  )
                                }
                                className="text-blue-600 hover:text-blue-900 mr-3"
                              >
                                {camiao.tipoGPS?.tipo === "vip"
                                  ? "Remover VIP"
                                  : "Tornar VIP"}
                              </button>
                              <button 
                                onClick={() => {
                                  const ponto = pontosMapa.find(p => p.id === camiao.camiaoId.toString());
                                  if (ponto) setPontoSelecionado(ponto);
                                }}
                                className="text-green-600 hover:text-green-900"
                              >
                                Ver no Mapa
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🚫</div>
                    <p className="text-gray-600">Nenhum caminhão encontrado com os filtros aplicados</p>
                    <button 
                      onClick={() => {
                        setFiltroStatus("todos");
                        setFiltroCategoria("todos");
                        setFiltroTipoGPS("todos");
                        setFiltroTransportadora("todos");
                      }}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Limpar Filtros
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Outros componentes mantidos... */}
        {/* Gerenciamento de GPS */}
        {activeGPSForm === "gerenciamento" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                    ⚙️
                  </span>
                  Gerenciamento de GPS
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Atualizar Tipo de GPS
                    </h4>
                    <div className="space-y-4">
                      {caminhoes.slice(0, 5).map((camiao) => (
                        <div
                          key={camiao.camiaoId}
                          className="p-4 bg-gray-50 rounded-lg border"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{camiao.matricula}</p>
                              <p className="text-sm text-gray-600">
                                {camiao.tipoGPS?.tipo === "vip"
                                  ? "VIP"
                                  : "Normal"}{" "}
                                •
                                {camiao.diasExpiracaoGPS !== null
                                  ? ` ${camiao.diasExpiracaoGPS}d restantes`
                                  : " Sem expiração"}
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                handleAtualizarGPS(
                                  camiao.camiaoId,
                                  camiao.tipoGPS?.tipo === "vip"
                                    ? "normal"
                                    : "vip"
                                )
                              }
                              className={`px-4 py-2 rounded-lg ${
                                camiao.tipoGPS?.tipo === "vip"
                                  ? "bg-red-500 text-white hover:bg-red-600"
                                  : "bg-green-500 text-white hover:bg-green-600"
                              }`}
                            >
                              {camiao.tipoGPS?.tipo === "vip"
                                ? "Remover VIP"
                                : "Tornar VIP"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Associar Motorista
                    </h4>
                    <div className="space-y-4 text-black">
                      {caminhoes.slice(0, 5).map((camiao) => (
                        <div
                          key={camiao.camiaoId}
                          className="p-4 bg-gray-50 rounded-lg border"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{camiao.matricula}</p>
                              <p className="text-sm">
                                Motorista:{" "}
                                {motoristas.find(m => m.motoristaId === camiao.motoristaId)?.nomeCompleto || "Não associado"}
                              </p>
                            </div>

                            <select
                              className="px-3 py-2 border border-gray-300 rounded-lg text-black"
                              onChange={(e) =>
                                handleAssociarMotorista(
                                  camiao.camiaoId,
                                  e.target.value
                                )
                              }
                              defaultValue={camiao.motoristaId || ""}
                            >
                              <option value="">Selecionar Motorista</option>
                              {motoristas.map((m) => (
                                <option
                                  key={m.motoristaId}
                                  value={m.motoristaId}
                                  className="text-black"
                                >
                                  {m.nomeCompleto}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gestão de Alertas */}
        {activeGPSForm === "alertas" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-yellow-50">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-yellow-500 text-white p-2 rounded-lg mr-2">
                    ⚠️
                  </span>
                  Gestão de Alertas ({alertas.length})
                </h3>
                <button
                  onClick={carregarDadosCompletos}
                  className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
                >
                  Verificar Novos Alertas
                </button>
              </div>
            </div>
            <div className="p-6">
              {alertas.length > 0 ? (
                <div className="space-y-4">
                  {alertas.map((alerta) => (
                    <div
                      key={alerta.id}
                      className={`p-4 rounded-lg border ${
                        alerta.severidade === "alta"
                          ? "bg-red-50 border-red-200"
                          : alerta.severidade === "media"
                          ? "bg-yellow-50 border-yellow-200"
                          : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span
                            className={`text-lg ${
                              alerta.severidade === "alta"
                                ? "text-red-600"
                                : alerta.severidade === "media"
                                ? "text-yellow-600"
                                : "text-blue-600"
                            }`}
                          >
                            {alerta.severidade === "alta"
                              ? "🔴"
                              : alerta.severidade === "media"
                              ? "🟡"
                              : "🔵"}
                          </span>
                          <div>
                            <p className="font-medium text-gray-900">
                              {alerta.titulo}
                            </p>
                            <p className="text-sm text-gray-600">
                              {alerta.descricao}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Camião: {alerta.matricula} • {alerta.timestamp}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              handleResolverAlerta(alerta.id, alerta.camiaoId)
                            }
                            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                          >
                            Resolver
                          </button>
                          <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                            Ignorar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4 text-green-500">✅</div>
                  <p className="text-gray-500">
                    Nenhum alerta ativo no momento
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Todos os camiões estão operando normalmente
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Gráficos e Estatísticas */}
        {activeGPSForm === "graficos" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-green-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-green-500 text-white p-2 rounded-lg mr-2">
                    📈
                  </span>
                  Dashboard de Estatísticas
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Distribuição por Categoria
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(estatisticas.porCategoria).map(
                        ([categoria, quantidade]) => (
                          <div
                            key={categoria}
                            className="flex justify-between items-center"
                          >
                            <span className="text-sm text-gray-700">
                              Categoria {categoria} -{" "}
                              {categoria === "C"
                                ? "Trânsito"
                                : categoria === "B"
                                ? "Nacional"
                                : "Chanté"}
                            </span>
                            <span className="font-semibold">{quantidade}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Status de GPS
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">
                          GPS VIP Ativo
                        </span>
                        <span className="font-semibold text-purple-600">
                          {estatisticas.gpsVip}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">
                          GPS Normal
                        </span>
                        <span className="font-semibold text-gray-600">
                          {estatisticas.gpsNormal}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">
                          GPS Expirados
                        </span>
                        <span className="font-semibold text-red-600">
                          {estatisticas.camioesComGPSExpirado}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Status Operacional
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">
                          Inspeções Válidas
                        </span>
                        <span className="font-semibold text-green-600">
                          {estatisticas.total -
                            estatisticas.camioesComInspecaoInvalida}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">
                          Inspeções Vencidas
                        </span>
                        <span className="font-semibold text-red-600">
                          {estatisticas.camioesComInspecaoInvalida}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">
                          Taxa de Conformidade
                        </span>
                        <span className="font-semibold">
                          {estatisticas.total > 0
                            ? `${Math.round(
                                ((estatisticas.total -
                                  estatisticas.camioesComInspecaoInvalida) /
                                  estatisticas.total) *
                                  100
                              )}%`
                            : "0%"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Relatórios */}
        {activeGPSForm === "relatorios" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-purple-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-purple-500 text-white p-2 rounded-lg mr-2">
                  📊
                </span>
                Relatórios e Exportação
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 hover:shadow-md cursor-pointer transition-shadow">
                  <div className="text-blue-600 text-2xl mb-3">🚛</div>
                  <p className="font-medium text-gray-900">
                    Relatório Completo da Frota
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Exportar todos os dados dos camiões
                  </p>
                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
                    Gerar PDF
                  </button>
                </div>

                <div className="p-6 bg-red-50 rounded-lg border border-red-200 hover:shadow-md cursor-pointer transition-shadow">
                  <div className="text-red-600 text-2xl mb-3">⚠️</div>
                  <p className="font-medium text-gray-900">
                    Relatório de Alertas
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {alertas.length} alertas ativos
                  </p>
                  <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">
                    Gerar Relatório
                  </button>
                </div>

                <div className="p-6 bg-green-50 rounded-lg border border-green-200 hover:shadow-md cursor-pointer transition-shadow">
                  <div className="text-green-600 text-2xl mb-3">📅</div>
                  <p className="font-medium text-gray-900">
                    Relatório de Inspeções
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {estatisticas.camioesComInspecaoInvalida} inspeções vencidas
                  </p>
                  <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm">
                    Gerar PDF
                  </button>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-4">
                  Exportação Personalizada
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Inicial
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Final
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Formato
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>PDF</option>
                      <option>Excel</option>
                      <option>CSV</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-4">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                    Visualizar
                  </button>
                  <button className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium">
                    Exportar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};