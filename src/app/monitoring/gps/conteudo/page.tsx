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

interface ConteudoGPS {
  id: number;
  dispositivo: string;
  veiculo: string;
  data: string;
  horario: string;
  latitude: number;
  longitude: number;
  velocidade: number;
  endereco: string;
  ignicao: "ligada" | "desligada";
  evento: "movimento" | "parado" | "excesso_velocidade" | "ignicao" | "outro";
}

interface PontoMapa {
  id: number;
  latitude: number;
  longitude: number;
  dispositivo: string;
  veiculo: string;
  evento: string;
  cor: string;
  velocidade: number;
  endereco: string;
  horario: string;
}

// Configuração do mapa
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: -9.5,
  lng: 13.5,
};

// Função para codificar SVG para base64 corretamente
const encodeSvg = (svgString: string): string => {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
};

// Funções auxiliares
const getEventoColor = (evento: string, apenasCor: boolean = false) => {
  const cores = {
    movimento: {
      bg: "bg-blue-500/20",
      text: "text-blue-400",
      border: "border-blue-500/30",
      cor: "#3b82f6",
    },
    parado: {
      bg: "bg-gray-500/20",
      text: "text-gray-400",
      border: "border-gray-500/30",
      cor: "#6b7280",
    },
    excesso_velocidade: {
      bg: "bg-red-500/20",
      text: "text-red-400",
      border: "border-red-500/30",
      cor: "#ef4444",
    },
    ignicao: {
      bg: "bg-green-500/20",
      text: "text-green-400",
      border: "border-green-500/30",
      cor: "#22c55e",
    },
    outro: {
      bg: "bg-purple-500/20",
      text: "text-purple-400",
      border: "border-purple-500/30",
      cor: "#a855f7",
    },
  };

  const config = cores[evento as keyof typeof cores] || cores.outro;
  return apenasCor
    ? config.cor
    : `${config.bg} ${config.text} ${config.border}`;
};

const getEventoText = (evento: string) => {
  const textos = {
    movimento: "🚗 Em Movimento",
    parado: "⏸️ Parado",
    excesso_velocidade: "🚨 Excesso Velocidade",
    ignicao: "🔑 Ignição",
    outro: "📌 Outro Evento",
  };
  return textos[evento as keyof typeof textos] || textos.outro;
};

const getVelocidadeColor = (velocidade: number) => {
  if (velocidade === 0) return "text-gray-400";
  if (velocidade <= 60) return "text-green-400";
  if (velocidade <= 80) return "text-yellow-400";
  return "text-red-400";
};

const getIgnicaoColor = (ignicao: string) => {
  return ignicao === "ligada"
    ? "bg-green-500/20 text-green-400 border border-green-500/30"
    : "bg-red-500/20 text-red-400 border border-red-500/30";
};

// Função para criar ícones SVG
const createMarkerIcon = (cor: string, tipo: string) => {
  let symbol = "";

  switch (tipo) {
    case "movimento":
      symbol = "M16,12 L20,16 L16,20 L12,16 Z"; // Diamante
      break;
    case "parado":
      symbol = "M12,12 L20,12 L20,20 L12,20 Z"; // Quadrado
      break;
    case "excesso_velocidade":
      symbol = "M16,8 L20,18 L16,16 L12,18 Z"; // Triângulo
      break;
    case "ignicao":
      symbol =
        "M16,10 C13,10 11,12 11,15 C11,18 13,20 16,20 C19,20 21,18 21,15 C21,12 19,10 16,10 Z"; // Círculo
      break;
    default:
      symbol =
        "M16,10 C13,10 11,12 11,15 C11,18 13,20 16,20 C19,20 21,18 21,15 C21,12 19,10 16,10 Z";
  }

  const svgString = `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="${cor}" stroke="white" stroke-width="2"/>
      <path d="${symbol}" fill="white" stroke="white" stroke-width="1"/>
    </svg>
  `;

  return encodeSvg(svgString);
};

// Ícones padrão do Google Maps
const getDefaultIcon = (evento: string) => {
  const icons = {
    movimento: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    parado: "http://maps.google.com/mapfiles/ms/icons/gray-dot.png",
    excesso_velocidade: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
    ignicao: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
    outro: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
  };
  return icons[evento as keyof typeof icons] || icons.outro;
};

// Hook personalizado para verificar se o Google Maps está carregado
const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkGoogleMaps = () => {
      if (
        typeof window !== "undefined" &&
        window.google &&
        window.google.maps
      ) {
        setIsLoaded(true);
      }
    };

    // Verificar imediatamente
    checkGoogleMaps();

    // Verificar periodicamente
    const interval = setInterval(checkGoogleMaps, 100);

    // Limpar intervalo
    return () => clearInterval(interval);
  }, []);

  return isLoaded;
};

// Componente do Mapa simplificado
const MapaComponent: React.FC<{
  pontosMapa: PontoMapa[];
  pontoSelecionado: PontoMapa | null;
  setPontoSelecionado: (ponto: PontoMapa | null) => void;
  useCustomIcons: boolean;
}> = ({
  pontosMapa,
  pontoSelecionado,
  setPontoSelecionado,
  useCustomIcons,
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const isGoogleMapsLoaded = useGoogleMaps();

  const onMapLoad = useCallback(
    (map: google.maps.Map) => {
      setMap(map);

      // Centralizar mapa nos marcadores após um breve delay
      setTimeout(() => {
        if (pontosMapa.length > 0) {
          const bounds = new google.maps.LatLngBounds();
          pontosMapa.forEach((ponto) => {
            bounds.extend(
              new google.maps.LatLng(ponto.latitude, ponto.longitude)
            );
          });
          map.fitBounds(bounds);

          if (pontosMapa.length === 1) {
            setTimeout(() => map.setZoom(15), 500);
          }
        }
      }, 500);
    },
    [pontosMapa]
  );

  const centralizarMapa = useCallback(() => {
    if (map && pontosMapa.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      pontosMapa.forEach((ponto) => {
        bounds.extend(new google.maps.LatLng(ponto.latitude, ponto.longitude));
      });
      map.fitBounds(bounds);
    }
  }, [map, pontosMapa]);

  // Configuração segura do ícone do marcador
  const getMarkerIcon = (ponto: PontoMapa) => {
    if (useCustomIcons) {
      return {
        url: createMarkerIcon(ponto.cor, ponto.evento),
        scaledSize: new google.maps.Size(32, 32),
        anchor: new google.maps.Point(16, 16),
      };
    } else {
      return {
        url: getDefaultIcon(ponto.evento),
        scaledSize: new google.maps.Size(32, 32),
      };
    }
  };

  // Se o Google Maps não estiver carregado, mostrar loading
  if (!isGoogleMapsLoaded) {
    return (
      <div className="bg-gray-700/50 rounded-lg h-96 flex items-center justify-center border border-gray-600">
        <div className="text-center text-gray-400">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Carregando Google Maps...</p>
        </div>
      </div>
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={"AIzaSyB5Y1PUBVawvwuSUZEipJVLrEX9lV6Yn_0"}
      loadingElement={<div>Carregando...</div>}
    >
      <div className="relative">
        <div className="absolute top-2 right-2 z-10">
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
          zoom={8}
          onLoad={onMapLoad}
          options={{
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true,
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
                lng: pontoSelecionado.longitude,
              }}
              onCloseClick={() => setPontoSelecionado(null)}
            >
              <div className="bg-gray-900 text-white p-4 rounded-lg max-w-xs border border-gray-600">
                <div className="flex items-center mb-2">
                  <div
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: pontoSelecionado.cor }}
                  ></div>
                  <h3 className="font-bold text-lg">
                    {pontoSelecionado.dispositivo}
                  </h3>
                </div>
                <p className="text-sm mb-1 font-medium">
                  {pontoSelecionado.veiculo}
                </p>
                <p className="text-xs text-gray-300 mb-3">
                  {pontoSelecionado.endereco}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="flex flex-col">
                    <span className="text-gray-400">Velocidade</span>
                    <span
                      className={`font-medium ${getVelocidadeColor(
                        pontoSelecionado.velocidade
                      )}`}
                    >
                      {pontoSelecionado.velocidade} km/h
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400">Evento</span>
                    <span className="font-medium">
                      {getEventoText(pontoSelecionado.evento)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400">Horário</span>
                    <span className="font-medium">
                      {pontoSelecionado.horario}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400">Coordenadas</span>
                    <span className="font-medium text-xs">
                      {pontoSelecionado.latitude.toFixed(4)}
                    </span>
                    <span className="font-medium text-xs">
                      {pontoSelecionado.longitude.toFixed(4)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs transition-colors"
                    onClick={() => {
                      const elemento = document.getElementById(
                        `registro-${pontoSelecionado.id}`
                      );
                      if (elemento) {
                        elemento.scrollIntoView({ behavior: "smooth" });
                        elemento.classList.add("bg-blue-500/20");
                        setTimeout(
                          () => elemento.classList.remove("bg-blue-500/20"),
                          2000
                        );
                      }
                      setPontoSelecionado(null);
                    }}
                  >
                    👁️ Ver na tabela
                  </button>
                  <button
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-1 px-2 rounded text-xs transition-colors"
                    onClick={() => setPontoSelecionado(null)}
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default function ConteudoGPS() {

  // Estado melhorado com mais dados de exemplo
  const [conteudos, setConteudos] = useState<ConteudoGPS[]>([
    {
      id: 1,
      dispositivo: "GPS-001",
      veiculo: "Caminhão Truck - AB123CD",
      data: "2024-01-17",
      horario: "14:30:25",
      latitude: -8.838333,
      longitude: 13.234444,
      velocidade: 65,
      endereco: "Avenida 4 de Fevereiro, Luanda",
      ignicao: "ligada",
      evento: "movimento",
    },
    {
      id: 2,
      dispositivo: "GPS-002",
      veiculo: "Caminhão Carreta - EF456GH",
      data: "2024-01-17",
      horario: "13:15:42",
      latitude: -12.35,
      longitude: 13.416667,
      velocidade: 0,
      endereco: "Porto do Lobito, Benguela",
      ignicao: "desligada",
      evento: "parado",
    },
    {
      id: 3,
      dispositivo: "GPS-001",
      veiculo: "Caminhão Truck - AB123CD",
      data: "2024-01-17",
      horario: "12:45:18",
      latitude: -8.916667,
      longitude: 13.5,
      velocidade: 85,
      endereco: "Estrada Nacional, Cacuaco",
      ignicao: "ligada",
      evento: "excesso_velocidade",
    },
  ]);

  const [filtroDispositivo, setFiltroDispositivo] = useState("todos");
  const [filtroEvento, setFiltroEvento] = useState("todos");
  const [filtroData, setFiltroData] = useState("");
  const [pontoSelecionado, setPontoSelecionado] = useState<PontoMapa | null>(
    null
  );
  const [mostrarMapa, setMostrarMapa] = useState(true);
  const [useCustomIcons, setUseCustomIcons] = useState(true);

  // Filtros otimizados com useMemo
  const conteudosFiltrados = useMemo(() => {
    return conteudos.filter((conteudo) => {
      if (
        filtroDispositivo !== "todos" &&
        conteudo.dispositivo !== filtroDispositivo
      )
        return false;
      if (filtroEvento !== "todos" && conteudo.evento !== filtroEvento)
        return false;
      if (filtroData && conteudo.data !== filtroData) return false;
      return true;
    });
  }, [conteudos, filtroDispositivo, filtroEvento, filtroData]);

  // Estatísticas otimizadas
  const estatisticas = useMemo(() => {
    const total = conteudos.length;
    const emMovimento = conteudos.filter(
      (c) => c.evento === "movimento"
    ).length;
    const parados = conteudos.filter((c) => c.evento === "parado").length;
    const excessoVelocidade = conteudos.filter(
      (c) => c.evento === "excesso_velocidade"
    ).length;
    const ignicao = conteudos.filter((c) => c.evento === "ignicao").length;

    return { total, emMovimento, parados, excessoVelocidade, ignicao };
  }, [conteudos]);

  // Pontos para o mapa
  const pontosMapa = useMemo((): PontoMapa[] => {
    return conteudosFiltrados.map((conteudo) => ({
      id: conteudo.id,
      latitude: conteudo.latitude,
      longitude: conteudo.longitude,
      dispositivo: conteudo.dispositivo,
      veiculo: conteudo.veiculo,
      evento: conteudo.evento,
      cor: getEventoColor(conteudo.evento, true) as string,
      velocidade: conteudo.velocidade,
      endereco: conteudo.endereco,
      horario: conteudo.horario,
    }));
  }, [conteudosFiltrados]);

  const dispositivosUnicos = useMemo(
    () => Array.from(new Set(conteudos.map((c) => c.dispositivo))),
    [conteudos]
  );

  // Função para simular atualização de dados
  const atualizarDados = useCallback(() => {
    const novoConteudo: ConteudoGPS = {
      id: Date.now(),
      dispositivo:
        dispositivosUnicos[
          Math.floor(Math.random() * dispositivosUnicos.length)
        ],
      veiculo: `Veículo - ${Math.random()
        .toString(36)
        .substr(2, 6)
        .toUpperCase()}`,
      data: new Date().toISOString().split("T")[0],
      horario: new Date().toLocaleTimeString("pt-BR"),
      latitude: -8.8 + (Math.random() - 0.5) * 2,
      longitude: 13.2 + (Math.random() - 0.5) * 2,
      velocidade: Math.floor(Math.random() * 120),
      endereco: "Localização atualizada",
      ignicao: Math.random() > 0.5 ? "ligada" : "desligada",
      evento: ["movimento", "parado", "excesso_velocidade"][
        Math.floor(Math.random() * 3)
      ] as never,
    };

    setConteudos((prev) => [novoConteudo, ...prev.slice(0, 9)]);
  }, [dispositivosUnicos]);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900">
        <Head>
          <title>Conteúdo GPS - Sistema de Rastreamento</title>
          <meta
            name="description"
            content="Sistema de monitoramento GPS em tempo real"
          />
        </Head>

        <header className="bg-gray-800 shadow-lg sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-white truncate">
                  📍 Conteúdo GPS
                </h1>
                <p className="text-gray-400 truncate">
                  Monitoramento em tempo real - {conteudos.length} registros
                </p>
              </div>
              <button
                onClick={atualizarDados}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-sm flex items-center"
              >
                <span className="mr-2">🔄</span>
                Atualizar
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Conteúdo Principal */}
            <div className="lg:col-span-3 space-y-6">
              {/* Filtros */}
              <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <span className="mr-2">🔍</span>
                  Filtrar Conteúdo
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Dispositivo
                    </label>
                    <select
                      value={filtroDispositivo}
                      onChange={(e) => setFiltroDispositivo(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="todos">Todos os dispositivos</option>
                      {dispositivosUnicos.map((dispositivo) => (
                        <option key={dispositivo} value={dispositivo}>
                          {dispositivo}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tipo de Evento
                    </label>
                    <select
                      value={filtroEvento}
                      onChange={(e) => setFiltroEvento(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="todos">Todos os eventos</option>
                      <option value="movimento">Em Movimento</option>
                      <option value="parado">Parado</option>
                      <option value="excesso_velocidade">
                        Excesso Velocidade
                      </option>
                      <option value="ignicao">Ignição</option>
                      <option value="outro">Outros</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Data
                    </label>
                    <input
                      type="date"
                      value={filtroData}
                      onChange={(e) => setFiltroData(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-400 text-sm">
                    {conteudosFiltrados.length} de {conteudos.length} registros
                  </span>
                  <button
                    onClick={() => {
                      setFiltroDispositivo("todos");
                      setFiltroEvento("todos");
                      setFiltroData("");
                    }}
                    className="text-gray-400 hover:text-gray-300 text-sm transition-colors"
                  >
                    Limpar filtros
                  </button>
                </div>
              </div>

              {/* Estatísticas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: "Total Registros",
                    value: estatisticas.total,
                    icon: "📊",
                    color: "gray",
                  },
                  {
                    label: "Em Movimento",
                    value: estatisticas.emMovimento,
                    icon: "🚗",
                    color: "blue",
                  },
                  {
                    label: "Parados",
                    value: estatisticas.parados,
                    icon: "⏸️",
                    color: "gray",
                  },
                  {
                    label: "Excesso Veloc.",
                    value: estatisticas.excessoVelocidade,
                    icon: "🚨",
                    color: "red",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={`bg-gray-800 p-4 rounded-xl shadow-lg border border-${stat.color}-500/20 min-w-0 hover:scale-105 transition-transform duration-200`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`p-3 bg-${stat.color}-500/20 rounded-lg shadow-sm flex-shrink-0`}
                      >
                        <span className="text-2xl">{stat.icon}</span>
                      </div>
                      <div className="ml-4 min-w-0">
                        <p className="text-sm font-medium text-gray-400 truncate">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-bold text-white truncate">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mapa Google */}
              {mostrarMapa && (
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                    <h3 className="text-lg font-semibold text-white min-w-0 flex items-center">
                      <span className="mr-2">🗺️</span>
                      Mapa de Localizações - Google Maps
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={atualizarDados}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all shadow-sm text-sm flex items-center"
                      >
                        <span className="mr-2">🔄</span>
                        Atualizar
                      </button>
                      <button
                        onClick={() => setUseCustomIcons(!useCustomIcons)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all shadow-sm text-sm flex items-center"
                      >
                        <span className="mr-2">
                          {useCustomIcons ? "⚫" : "🎨"}
                        </span>
                        {useCustomIcons ? "Ícones Padrão" : "Ícones Custom"}
                      </button>
                      <button
                        onClick={() => setMostrarMapa(false)}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all shadow-sm text-sm"
                      >
                        Ocultar
                      </button>
                    </div>
                  </div>

                  <div className="rounded-lg overflow-hidden border border-gray-600">
                    <MapaComponent
                      pontosMapa={pontosMapa}
                      pontoSelecionado={pontoSelecionado}
                      setPontoSelecionado={setPontoSelecionado}
                      useCustomIcons={useCustomIcons}
                    />
                  </div>

                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-400">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span>Em Movimento</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                      <span>Parado</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span>Excesso Velocidade</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span>Ignição</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Lista de Conteúdos GPS */}
              <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                <div className="p-6 border-b border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <h3 className="text-lg font-semibold text-white min-w-0 flex items-center">
                      <span className="mr-2">📋</span>
                      Registros de Localização
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30 whitespace-nowrap">
                        {conteudosFiltrados.length} registros
                      </span>
                      {!mostrarMapa && (
                        <button
                          onClick={() => setMostrarMapa(true)}
                          className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-all text-sm"
                        >
                          Mostrar Mapa
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-700/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">
                          Dispositivo/Veículo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">
                          Data/Hora
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">
                          Localização
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">
                          Velocidade
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">
                          Ignição
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">
                          Evento
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {conteudosFiltrados.map((conteudo) => (
                        <tr
                          key={conteudo.id}
                          id={`registro-${conteudo.id}`}
                          className="hover:bg-gray-700/50 transition-colors group"
                        >
                          <td className="px-6 py-4 whitespace-nowrap min-w-0">
                            <div className="flex items-center">
                              <div className="h-8 w-8 bg-purple-500/20 rounded flex items-center justify-center shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform">
                                <span className="text-purple-400">📍</span>
                              </div>
                              <div className="ml-4 min-w-0">
                                <div className="text-sm font-medium text-white truncate">
                                  {conteudo.dispositivo}
                                </div>
                                <div className="text-sm text-gray-400 truncate">
                                  {conteudo.veiculo}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm min-w-0">
                            <div className="text-white">
                              {new Date(conteudo.data).toLocaleDateString(
                                "pt-BR"
                              )}
                            </div>
                            <div className="text-gray-400 text-xs">
                              {conteudo.horario}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm min-w-0">
                            <div className="text-white text-xs">
                              Lat: {conteudo.latitude.toFixed(6)}
                            </div>
                            <div className="text-gray-400 text-xs">
                              Lon: {conteudo.longitude.toFixed(6)}
                            </div>
                            <div
                              className="text-gray-500 text-xs truncate max-w-[120px]"
                              title={conteudo.endereco}
                            >
                              {conteudo.endereco}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap min-w-0">
                            <span
                              className={`text-sm font-medium ${getVelocidadeColor(
                                conteudo.velocidade
                              )} whitespace-nowrap`}
                            >
                              {conteudo.velocidade} km/h
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap min-w-0">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${getIgnicaoColor(
                                conteudo.ignicao
                              )} whitespace-nowrap`}
                            >
                              {conteudo.ignicao === "ligada"
                                ? "🔑 Ligada"
                                : "🔒 Desligada"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap min-w-0">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${getEventoColor(
                                conteudo.evento
                              )} whitespace-nowrap`}
                            >
                              {getEventoText(conteudo.evento)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium min-w-0">
                            <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-1 sm:space-y-0 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() =>
                                  setPontoSelecionado({
                                    id: conteudo.id,
                                    latitude: conteudo.latitude,
                                    longitude: conteudo.longitude,
                                    dispositivo: conteudo.dispositivo,
                                    veiculo: conteudo.veiculo,
                                    evento: conteudo.evento,
                                    cor: getEventoColor(
                                      conteudo.evento,
                                      true
                                    ) as string,
                                    velocidade: conteudo.velocidade,
                                    endereco: conteudo.endereco,
                                    horario: conteudo.horario,
                                  })
                                }
                                className="text-blue-400 hover:text-blue-300 transition-colors text-xs whitespace-nowrap flex items-center"
                              >
                                <span className="mr-1">🗺️</span>
                                Mapa
                              </button>
                              <button className="text-gray-400 hover:text-green-300 transition-colors text-xs whitespace-nowrap flex items-center">
                                <span className="mr-1">👁️</span>
                                Detalhes
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {conteudosFiltrados.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Nenhum registro encontrado com os filtros atuais
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Painel Lateral */}
            <div className="lg:col-span-1 space-y-6">
              {/* Status dos Eventos */}
              <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-lg font-semibold text-white truncate flex items-center">
                    <span className="mr-2">📈</span>
                    Estatísticas de Eventos
                  </h2>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    {
                      evento: "movimento",
                      label: "Em Movimento",
                      count: estatisticas.emMovimento,
                    },
                    {
                      evento: "parado",
                      label: "Parados",
                      count: estatisticas.parados,
                    },
                    {
                      evento: "excesso_velocidade",
                      label: "Excesso Veloc.",
                      count: estatisticas.excessoVelocidade,
                    },
                    {
                      evento: "ignicao",
                      label: "Ignição",
                      count: estatisticas.ignicao,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center p-3 rounded-lg ${getEventoColor(
                        item.evento
                      )}`}
                    >
                      <span className="truncate">{item.label}</span>
                      <span className="font-bold whitespace-nowrap ml-2">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dispositivos Ativos */}
              <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-lg font-semibold text-white truncate flex items-center">
                    <span className="mr-2">📡</span>
                    Dispositivos Ativos
                  </h2>
                </div>
                <div className="p-4 space-y-3">
                  {dispositivosUnicos.map((dispositivo, index) => {
                    const count = conteudos.filter(
                      (c) => c.dispositivo === dispositivo
                    ).length;
                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <span className="text-gray-300 truncate">
                          {dispositivo}
                        </span>
                        <span className="text-white font-bold whitespace-nowrap bg-blue-500/20 px-2 py-1 rounded text-xs">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Ações Rápidas */}
              <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-lg font-semibold text-white truncate flex items-center">
                    <span className="mr-2">⚡</span>
                    Ações Rápidas
                  </h2>
                </div>
                <div className="p-4 space-y-3">
                  <button
                    onClick={atualizarDados}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm flex items-center justify-center transition-all hover:scale-105"
                  >
                    <span className="mr-2">🔄</span>
                    <span className="truncate">Atualizar Dados</span>
                  </button>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 text-sm flex items-center justify-center transition-all hover:scale-105">
                    <span className="mr-2">📱</span>
                    <span className="truncate">App Mobile</span>
                  </button>
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 text-sm flex items-center justify-center transition-all hover:scale-105">
                    <span className="mr-2">⚙️</span>
                    <span className="truncate">Configurações</span>
                  </button>
                </div>
              </div>

              {/* Informações Úteis */}
              <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                <h3 className="text-lg font-semibold text-blue-400 mb-2 truncate flex items-center">
                  <span className="mr-2">💡</span>
                  Informações do Mapa
                </h3>
                <ul className="text-blue-300 text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Clique nos marcadores para detalhes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Use o botão Centralizar para ajustar a visualização
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Arraste e zoom para navegar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Cores indicam tipo de evento</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
