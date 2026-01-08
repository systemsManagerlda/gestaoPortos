/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import RastreamentoContentores from "../models/RastreamentoContentores";
import GestaoContentores from "../models/GestaoContentores";
import MovimentacaoContentores from "../models/MovimentacaoContentores";
import GraficosEstatisticas from "../models/GraficosEstatisticas";
import RelatoriosContentores from "../models/RelatoriosContentores";
// Interface para Contentor
export interface Contentor {
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
          <RastreamentoContentores
            filtros={filtros}
            setFiltros={setFiltros}
            carregarContentores={carregarContentores}
            loadingContentores={loadingContentores}
            contentores={contentores}
            contentorSelecionado={contentorSelecionado}
            setContentorSelecionado={setContentorSelecionado}
            buscarDetalhesCarga={buscarDetalhesCarga}
          />
        )}

        {/* Gestão de Contentores */}
        {activeContentorForm === "contentores" && (
          <GestaoContentores
            contentores={contentores}
            carregarContentores={carregarContentores}
            API_BASE_URL={API_BASE_URL}
          />
        )}
        {/* Movimentação de Contentores */}
        {activeContentorForm === "movimentacao" && (
          <MovimentacaoContentores contentores={contentores} />
        )}

        {/* Gráficos e Estatísticas */}
        {activeContentorForm === "graficos" && (
          <GraficosEstatisticas contentores={contentores} />
        )}

        {/* Relatórios */}
        {activeContentorForm === "relatorios" && <RelatoriosContentores />}
      </div>
    </div>
  );
};

export default GPSContentor;
