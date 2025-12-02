/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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

// Interface para dados Flespi
interface FlespiPacket {
  id: number;
  ident: string;
  device_id: number;
  server_time: number;
  position: {
    latitude: number;
    longitude: number;
    altitude: number;
    speed: number;
    direction: number;
    satellites: number;
    hdop: number;
  };
  params: {
    [key: string]: any;
  };
  parsed: {
    [key: string]: any;
  };
  data?: string; // Campo para dados codificados em Base64
  decodedData?: string; // Dados decodificados da base64
  parsedData?: any; // Dados convertidos
  timestamp?: any; // Timestamp convertido
}

interface VeiculoFlespi {
  id: string;
  ident: string;
  deviceId: number;
  latitude: number;
  longitude: number;
  velocidade: number;
  direcao: number;
  altitude: number;
  satelites: number;
  hdop: number;
  serverTime: Date;
  params: { [key: string]: any };
  parsed: { [key: string]: any };
  veiculo: string;
  placa: string;
  motorista: string;
  status: string;
  ignicao: boolean;
  ultimaAtualizacao: string;
  data: string;
  horario: string;
  evento?: string;
  bateria?: number;
}

// Interface para dados decodificados do protocolo GPS
interface DecodedGpsData {
  protocolo: string;
  imei: string;
  versao: string;
  dataHora: string;
  validade: string;
  latitude: number;
  hemisferioLat: string;
  longitude: number;
  hemisferioLon: string;
  velocidade: number;
  direcao: number;
  dataGps: string;
  statusHex: string;
  odometro?: number;
  sinalGsm?: number;
  altitude?: number;
  outroParametro?: number;
  checksum?: string;
  summary?: any;
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
  API: {
    BASE_URL: "https://desktop-api-4f850b3f9733.herokuapp.com",
    ENDPOINTS: {
      FLESPI_PACKETS: "/flespi/packets",
      GET_EVENT_LIST: "/getEventList",
    },
    HEADERS: {
      accessKeyId: "jUWlSv683sewVRdd",
      accessSecret: "n08Qylt2I6pfItyxc6qm6hHhdviwvDJ2",
    },
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
      excesso_velocidade:
        "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
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

  static formatarDataFlespi(timestamp: number): {
    data: string;
    horario: string;
  } {
    try {
      if (!timestamp || typeof timestamp !== 'number' || isNaN(timestamp)) {
        console.warn("Timestamp inválido:", timestamp);
        return { 
          data: "Data inválida", 
          horario: "--:--:--" 
        };
      }

      const date = new Date(timestamp * 1000);
      
      if (isNaN(date.getTime())) {
        console.warn("Data criada é inválida:", timestamp, date);
        return { 
          data: "Data inválida", 
          horario: "--:--:--" 
        };
      }

      const now = Date.now();
      const minDate = new Date('2000-01-01').getTime();
      const maxDate = new Date('2100-01-01').getTime();
      const dateTime = date.getTime();
      
      if (dateTime < minDate || dateTime > maxDate) {
        console.warn("Data fora do range aceitável:", timestamp, date);
        return { 
          data: "Data fora do range", 
          horario: "--:--:--" 
        };
      }

      const data = date.toISOString().split("T")[0];
      const horario = date.toLocaleTimeString("pt-BR");
      
      return { data, horario };
      
    } catch (error) {
      console.error("Erro ao formatar data Flespi:", error, timestamp);
      return { 
        data: "Erro na data", 
        horario: "--:--:--" 
      };
    }
  }

  static traduzirEvento(eventName: string): string {
    const traducoes: { [key: string]: string } = {
      刷卡施封成功事件: "Selagem com Cartão Concluída",
      锁杆打开事件: "Tranca Aberta",
      ignition_on: "Ignição Ligada",
      ignition_off: "Ignição Desligada",
      movement: "Em Movimento",
      stop: "Parado",
      overspeed: "Excesso de Velocidade",
      sos_alarm: "Alarma SOS",
      power_off: "Desligamento",
      vibration_alarm: "Alarme de Vibração",
      fence_in: "Dentro da Área",
      fence_out: "Fora da Área",
      posicao_gps: "Posição GPS",
      status_update: "Atualização de Status",
      alarme: "Alarme",
      ignicao_on: "Ignição Ligada",
      ignicao_off: "Ignição Desligada",
      movimento: "Em Movimento",
      parado: "Parado",
      excesso_velocidade: "Excesso de Velocidade",
      ignicao: "Ignição",
      selagem: "Selagem",
      outro: "Outro Evento",
    };

    return traducoes[eventName] || eventName;
  }

  static decodeBase64(str: string): string {
    try {
      return atob(str);
    } catch (e) {
      return Buffer.from(str, 'base64').toString('utf-8');
    }
  }

  static decodeGpsData(base64Data: string): DecodedGpsData | null {
    try {
      const decodedString = this.decodeBase64(base64Data);
      const cleanString = decodedString.replace(/^\*\*|\#$/, '');
      const parts = cleanString.split(',');

      if (parts.length < 12) {
        console.error("❌ Formato inválido: número insuficiente de partes");
        return null;
      }

      const protocolo = parts[0] || 'HQ';
      const imei = parts[1] || '';
      const versao = parts[2] || '';
      
      const horaGps = parts[3] || '';
      const horaFormatada = horaGps.length >= 6 
        ? `${horaGps.slice(0, 2)}:${horaGps.slice(2, 4)}:${horaGps.slice(4, 6)}`
        : '00:00:00';

      const validade = parts[4] || '';
      
      const latStr = parts[5] || '0';
      const latDeg = parseInt(latStr.slice(0, 2));
      const latMin = parseFloat(latStr.slice(2));
      const latitude = latDeg + (latMin / 60);
      const hemisferioLat = parts[6] || 'N';
      
      const lonStr = parts[7] || '0';
      const lonDeg = parseInt(lonStr.slice(0, 3));
      const lonMin = parseFloat(lonStr.slice(3));
      const longitude = lonDeg + (lonMin / 60);
      const hemisferioLon = parts[8] || 'E';
      
      const velocidadeKnots = parseFloat(parts[9] || '0');
      const velocidade = Math.round(velocidadeKnots * 1.852);
      
      const direcao = parseInt(parts[10] || '0');
      
      const dataGps = parts[11] || '';
      const dataFormatada = dataGps.length >= 6
        ? `${dataGps.slice(0, 2)}/${dataGps.slice(2, 4)}/${dataGps.slice(4, 6)}`
        : '01/01/25';
      
      const statusHex = parts[12] || '';

      const odometro = parts[13] ? parseInt(parts[13]) : undefined;
      const sinalGsm = parts[14] ? parseInt(parts[14]) : undefined;
      const altitude = parts[15] ? parseInt(parts[15]) : undefined;
      const outroParametro = parts[16] ? parseInt(parts[16]) : undefined;
      const checksum = parts[17] || '';

      const dataCompleta = dataFormatada.split('/');
      const horaCompleta = horaFormatada.split(':');
      const dataHora = new Date(
        2000 + parseInt(dataCompleta[2]),
        parseInt(dataCompleta[1]) - 1,
        parseInt(dataCompleta[0]),
        parseInt(horaCompleta[0]),
        parseInt(horaCompleta[1]),
        parseInt(horaCompleta[2])
      );

      return {
        protocolo,
        imei,
        versao,
        dataHora: dataHora.toISOString(),
        validade,
        latitude: hemisferioLat === 'S' ? -latitude : latitude,
        hemisferioLat,
        longitude: hemisferioLon === 'W' ? -longitude : longitude,
        hemisferioLon,
        velocidade,
        direcao,
        dataGps: dataFormatada,
        statusHex,
        odometro,
        sinalGsm,
        altitude,
        outroParametro,
        checksum
      };

    } catch (error) {
      console.error("💥 Erro ao decodificar dados GPS:", error);
      return null;
    }
  }

  static interpretarStatusHex(statusHex: string): {
    ignicao: boolean;
    alarme: boolean;
    movimento: boolean;
    gpsFixo: boolean;
    bateria: number;
  } {
    try {
      const hexString = statusHex.toLowerCase().replace(/[^0-9a-f]/g, '');
      if (!hexString) {
        return { ignicao: false, alarme: false, movimento: false, gpsFixo: false, bateria: 100 };
      }

      const lastBits = hexString.slice(-4);
      const binary = parseInt(lastBits, 16).toString(2).padStart(16, '0');
      
      const ignicao = binary[binary.length - 1] === '1';
      const alarme = binary[binary.length - 2] === '1';
      const movimento = binary[binary.length - 3] === '1';
      const gpsFixo = binary[binary.length - 4] === '1';
      const batteryValue = parseInt(hexString.slice(0, 2), 16) || 100;
      const bateria = Math.min(100, Math.max(0, batteryValue));

      return { ignicao, alarme, movimento, gpsFixo, bateria };
    } catch (error) {
      console.error("Erro ao interpretar status hex:", error);
      return { ignicao: false, alarme: false, movimento: false, gpsFixo: false, bateria: 100 };
    }
  }
}

// Serviço da API atualizado para usar sua nova rota
class ApiService {
  static async getFlespiPacket(channelId: string, identId: string) {
    try {
      console.log(`🔍 Buscando último pacote Flespi - Channel: ${channelId}, Ident: ${identId}`);

      const response = await fetch(
        `${CONFIG.API.BASE_URL}${CONFIG.API.ENDPOINTS.FLESPI_PACKETS}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accessKeyId: CONFIG.API.HEADERS.accessKeyId,
            accessSecret: CONFIG.API.HEADERS.accessSecret,
          },
          body: JSON.stringify({ channelId, identId }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ API Error ${response.status}:`, errorText);
        
        if (response.status === 401) {
          throw new Error("API Key inválida ou expirada");
        } else if (response.status === 404) {
          throw new Error(`Recurso não encontrado (Channel ${channelId}, Ident ${identId})`);
        } else if (response.status === 429) {
          throw new Error("Limite de requisições excedido");
        } else {
          throw new Error(`API retornou status: ${response.status} - ${errorText}`);
        }
      }

      const data = await response.json();
      console.log("✅ Último pacote Flespi recebido:", data);
      
      return data;
    } catch (error) {
      console.error("💥 Erro ao buscar último pacote Flespi:", error);
      throw error;
    }
  }

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
        `${CONFIG.API.BASE_URL}${CONFIG.API.ENDPOINTS.GET_EVENT_LIST}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accessKeyId: CONFIG.API.HEADERS.accessKeyId,
            accessSecret: CONFIG.API.HEADERS.accessSecret,
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

// Conversor de dados atualizado para usar sua nova rota
class GpsDataConverter {
  // Converter dados da sua nova rota para VeiculoFlespi
  static converterFlespiPacketParaVeiculo(packetData: any): VeiculoFlespi | null {
    try {
      if (!packetData || !packetData.lastPacket) {
        console.warn("❌ Nenhum pacote disponível na resposta");
        return null;
      }

      const packet = packetData.lastPacket;
      
      // Extrair dados básicos
      const ident = packet.ident || packet.device_id?.toString() || "unknown";
      const deviceId = packet.device_id || 0;
      
      // Usar dados convertidos se disponíveis
      let latitude = 0;
      let longitude = 0;
      let velocidade = 0;
      let direcao = 0;
      let altitude = 0;
      let satelites = 0;
      let hdop = 0;
      let dataFormatada = "Data inválida";
      let horarioFormatado = "--:--:--";
      let serverTimeDate = new Date();
      let ignicao = false;
      let bateria = 100;
      let status = "parado";
      let evento = "posicao_gps";
      
      // Se tivermos dados parsed do seu endpoint
      if (packet.parsed) {
        const parsed = packet.parsed;
        
        // Coordenadas
        if (parsed.coordinates?.latitude && parsed.coordinates?.longitude) {
          latitude = parsed.coordinates.latitude;
          longitude = parsed.coordinates.longitude;
        } else if (parsed.coordinates?.formatted) {
          // Tentar extrair das coordenadas formatadas
          const coords = this.extrairCoordenadasFormatadas(parsed.coordinates.formatted);
          if (coords) {
            latitude = coords.latitude;
            longitude = coords.longitude;
          }
        }
        
        // Velocidade
        if (parsed.speed?.kmh) {
          velocidade = parsed.speed.kmh;
          status = velocidade > 0 ? "movimento" : "parado";
        }
        
        // Direção
        if (parsed.course?.degrees) {
          direcao = parsed.course.degrees;
        }
        
        // Satélites
        if (parsed.gpsInfo?.satellites) {
          satelites = parsed.gpsInfo.satellites;
        }
        
        // Bateria
        if (parsed.battery?.percentage) {
          bateria = parsed.battery.percentage;
        }
        
        // Ignição
        if (parsed.digitalIO_parsed?.ignition !== undefined) {
          ignicao = parsed.digitalIO_parsed.ignition;
        }
        
        // Evento
        if (parsed.eventDescription) {
          evento = parsed.eventDescription;
        }
        
        // Data/Hora
        if (parsed.datetime?.iso) {
          serverTimeDate = new Date(parsed.datetime.iso);
          const formatted = GpsUtils.formatarData(serverTimeDate.getTime());
          dataFormatada = formatted.data;
          horarioFormatado = formatted.horario;
        }
      } else if (packet.position) {
        // Fallback para dados originais do Flespi
        latitude = packet.position.latitude || 0;
        longitude = packet.position.longitude || 0;
        velocidade = packet.position.speed ? Math.round(packet.position.speed * 3.6) : 0;
        direcao = packet.position.direction || 0;
        altitude = packet.position.altitude || 0;
        satelites = packet.position.satellites || 0;
        hdop = packet.position.hdop || 0;
        status = velocidade > 0 ? "movimento" : "parado";
        
        // Timestamp
        if (packet.server_time) {
          serverTimeDate = new Date(packet.server_time * 1000);
          const formatted = GpsUtils.formatarDataFlespi(packet.server_time);
          dataFormatada = formatted.data;
          horarioFormatado = formatted.horario;
        }
        
        // Verificar ignição nos parâmetros
        ignicao = packet.params?.ignition === 1 || packet.params?.ignition === true;
        
        // Verificar bateria
        if (packet.params?.battery) {
          bateria = packet.params.battery;
        }
      }

      // Extrair placa e nome do veículo
      const placa = this.extrairPlacaFlespi(ident, packet.params || {});
      const veiculoNome = this.extrairNomeVeiculo(ident, packet.params || {});

      const veiculo: VeiculoFlespi = {
        id: `flespi-${packet.id || Date.now()}`,
        ident,
        deviceId,
        latitude,
        longitude,
        velocidade,
        direcao,
        altitude,
        satelites,
        hdop,
        serverTime: serverTimeDate,
        params: packet.params || {},
        parsed: packet.parsed || {},
        veiculo: veiculoNome,
        placa,
        motorista: "Motorista não identificado",
        status,
        ignicao,
        ultimaAtualizacao: GpsUtils.formatarUltimaAtualizacao(serverTimeDate.getTime()),
        data: dataFormatada,
        horario: horarioFormatado,
        evento,
        bateria,
      };

      console.log("✅ Veículo convertido:", veiculo);
      return veiculo;
      
    } catch (error) {
      console.error("💥 Erro ao converter pacote Flespi:", error, packetData);
      return null;
    }
  }

  private static extrairCoordenadasFormatadas(formatted: string): { latitude: number; longitude: number } | null {
    try {
      // Formato esperado: "22°52.3241'S, 43°12.9876'W"
      const regex = /(\d+)°(\d+\.\d+)'([NS]),\s*(\d+)°(\d+\.\d+)'([EW])/;
      const match = formatted.match(regex);
      
      if (match) {
        const latDeg = parseInt(match[1]);
        const latMin = parseFloat(match[2]);
        const latDir = match[3];
        const lonDeg = parseInt(match[4]);
        const lonMin = parseFloat(match[5]);
        const lonDir = match[6];
        
        const latitude = latDeg + (latMin / 60);
        const longitude = lonDeg + (lonMin / 60);
        
        const latFinal = latDir === 'S' ? -latitude : latitude;
        const lonFinal = lonDir === 'W' ? -longitude : longitude;
        
        return { latitude: latFinal, longitude: lonFinal };
      }
    } catch (error) {
      console.error("Erro ao extrair coordenadas formatadas:", error);
    }
    return null;
  }

  private static extrairPlacaFlespi(ident: string, params: any): string {
    if (params?.license_plate) return params.license_plate;
    if (params?.plate) return params.plate;

    const placaRegex = /[A-Z]{3}\s?\d{4}\s?[A-Z]{0,2}/;
    const match = ident.match(placaRegex);
    if (match) return match[0].replace(/\s/g, "");

    return ident.substring(0, 8);
  }

  private static extrairNomeVeiculo(ident: string, params: any): string {
    if (params?.vehicle_name) return params.vehicle_name;
    if (params?.name) return params.name;
    
    // Tentar extrair do summary se disponível
    if (params?.summary?.imei) {
      return `Veículo ${params.summary.imei.slice(-6)}`;
    }
    
    return `Veículo ${ident.substring(0, 6)}`;
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

  static converterFlespiParaPontosMapa(veiculos: VeiculoFlespi[]): PontoMapa[] {
    return veiculos.map((veiculo) => ({
      id: veiculo.id,
      latitude: veiculo.latitude,
      longitude: veiculo.longitude,
      dispositivo: veiculo.ident,
      veiculo: veiculo.veiculo,
      placa: veiculo.placa,
      motorista: veiculo.motorista,
      status: veiculo.status,
      cor: GpsUtils.getStatusConfig(veiculo.status).cor,
      velocidade: veiculo.velocidade,
      endereco: `Altitude: ${veiculo.altitude.toFixed(0)}m`,
      ultimaAtualizacao: veiculo.ultimaAtualizacao,
      ignicao: veiculo.ignicao,
      satelites: veiculo.satelites.toString(),
      precisaoHdop: veiculo.hdop.toFixed(1),
      data: veiculo.data,
      horario: veiculo.horario,
      evento: veiculo.evento || "posicao_gps",
      bateria: veiculo.bateria,
    }));
  }

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
        velocidade: 0,
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

  private static mapearEventoParaStatus(
    eventName: string
  ): "movimento" | "parado" | "sem_sinal" | "selagem" {
    if (!eventName) return "parado";

    if (eventName === "刷卡施封成功事件") return "selagem";
    if (eventName === "锁杆打开事件") return "parado";

    return "parado";
  }

  private static extrairPlacaDoDeviceName(deviceName: string): string {
    if (!deviceName) return "";
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

// Componente do Mapa (mantido igual)
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
      console.log("✅ Google Maps carregado com sucesso");
      setMap(map);
      setIsLoaded(true);
      setLoadError(null);

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

            if (pontosMapa.length === 1) {
              setTimeout(() => {
                if (map) map.setZoom(15);
              }, 500);
            }
          }
        } else if (pontosMapa.length === 0 && map) {
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
    console.error("❌ Erro ao carregar Google Maps:", error);
    setLoadError("Falha ao carregar o Google Maps");
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

  const loadingElement = (
    <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center border border-gray-300">
      <div className="text-center text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
        <p>Carregando Google Maps...</p>
      </div>
    </div>
  );

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
                    <span className="text-gray-600">Velocidade:</span>
                    <span
                      className={`font-medium ${GpsUtils.getVelocidadeColor(
                        pontoSelecionado.velocidade
                      )}`}
                    >
                      {pontoSelecionado.velocidade} km/h
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
                  {pontoSelecionado.satelites && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Satélites:</span>
                      <span className="font-medium text-gray-900">
                        {pontoSelecionado.satelites}
                      </span>
                    </div>
                  )}
                  {pontoSelecionado.precisaoHdop && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Precisão HDOP:</span>
                      <span className="font-medium text-gray-900">
                        {pontoSelecionado.precisaoHdop}
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

// COMPONENTE PRINCIPAL COM ABAS
export const MainPanel = () => {
  const [activeTab, setActiveTab] = useState<'default' | 'flespi'>('default');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
                🚚
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Sistema de Monitoramento GPS
                </h1>
                <p className="text-sm text-gray-600">
                  Rastreamento em tempo real de frota
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Status:</span>
                <span className="ml-2 text-green-600">● Online</span>
              </div>
              <div className="text-sm text-gray-600">
                {new Date().toLocaleDateString('pt-BR')}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('default')}
              className={`
                py-4 px-1 text-sm font-medium border-b-2 flex items-center
                ${activeTab === 'default'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <span className="mr-2">🏠</span>
              Painel Principal
            </button>
            <button
              onClick={() => setActiveTab('flespi')}
              className={`
                py-4 px-1 text-sm font-medium border-b-2 flex items-center
                ${activeTab === 'flespi'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <span className="mr-2">📡</span>
              Painel Flespi
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'default' ? <DefaultPanel /> : <FlespiPanel />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Sistema de Monitoramento GPS. Todos os direitos reservados.</p>
            <p className="mt-1">Versão 2.0 | Desenvolvido para rastreamento de frota</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// NOVA Aba: Painel Flespi usando sua nova rota
const FlespiPanel = () => {
  const [pontosMapa, setPontosMapa] = useState<PontoMapa[]>([]);
  const [pontoSelecionado, setPontoSelecionado] = useState<PontoMapa | null>(
    null
  );
  const [useCustomIcons, setUseCustomIcons] = useState(true);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [veiculosFlespi, setVeiculosFlespi] = useState<VeiculoFlespi[]>([]);
  const [channelId, setChannelId] = useState<string>("1328585");
  const [identId, setIdentId] = useState<string>("7026159070");
  const [estatisticas, setEstatisticas] = useState({
    totalVeiculos: 0,
    emMovimento: 0,
    parados: 0,
    semSinal: 0,
    nivelSinalMedio: 0,
    ultimaAtualizacao: "",
  });

  const [detalhesPacote, setDetalhesPacote] = useState<any>(null);

  // Função para buscar dados da sua nova rota
  const fetchFlespiData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Usar sua nova rota que retorna apenas o último pacote
      const data = await ApiService.getFlespiPacket(channelId, identId);

      if (data && data.success) {
        // Converter o último pacote para veículo
        const veiculo = GpsDataConverter.converterFlespiPacketParaVeiculo(data);
        
        if (veiculo) {
          // Salvar detalhes do pacote para exibição
          if (data.lastPacket) {
            setDetalhesPacote(data.lastPacket);
          }
          
          // Atualizar lista de veículos com apenas o último
          setVeiculosFlespi([veiculo]);
          
          // Converter para pontos do mapa
          const pontos = GpsDataConverter.converterFlespiParaPontosMapa([veiculo]);
          setPontosMapa(pontos);

          // Atualizar estatísticas
          const emMovimento = veiculo.status === "movimento" ? 1 : 0;
          const parados = veiculo.status === "parado" ? 1 : 0;

          setEstatisticas({
            totalVeiculos: 1,
            emMovimento,
            parados,
            semSinal: 0,
            nivelSinalMedio: veiculo.satelites || 0,
            ultimaAtualizacao: new Date().toLocaleTimeString("pt-BR"),
          });

          setError(null);
        } else {
          throw new Error("Não foi possível converter o pacote");
        }
      } else {
        throw new Error(data?.error || "Erro ao buscar dados");
      }
    } catch (err) {
      console.error("💥 Erro ao buscar dados Flespi:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Erro de conexão com a API";
      setError(errorMessage);

      // Fallback para dados mock
      const pontos = GpsDataConverter.converterParaPontosMapa(dadosMock);
      setPontosMapa(pontos);
      setVeiculosFlespi([]);
    } finally {
      setLoading(false);
    }
  }, [channelId, identId]);

  // Buscar dados inicialmente
  useEffect(() => {
    fetchFlespiData();
  }, [fetchFlespiData]);

  // Atualização automática
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchFlespiData();
    }, CONFIG.MAP.refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, fetchFlespiData]);

  const handleAtualizarMapa = () => {
    fetchFlespiData();
  };

  const handleChannelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChannelId(e.target.value);
  };

  const handleIdentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentId(e.target.value);
  };

  const handleBuscarDados = () => {
    fetchFlespiData();
  };

  // Renderizar detalhes do pacote decodificado
  const renderDetalhesPacote = () => {
    if (!detalhesPacote) return null;

    return (
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 text-sm mb-3 flex items-center">
          <span className="mr-2">🔍</span>
          Detalhes do Último Pacote GPS
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          {detalhesPacote.parsed?.summary && (
            <>
              <div>
                <span className="text-blue-700">IMEI:</span>
                <p className="font-medium text-gray-900">{detalhesPacote.parsed.summary.imei}</p>
              </div>
              <div>
                <span className="text-blue-700">Posição:</span>
                <p className="font-medium text-gray-900">{detalhesPacote.parsed.summary.position}</p>
              </div>
              <div>
                <span className="text-blue-700">Velocidade:</span>
                <p className="font-medium text-gray-900">{detalhesPacote.parsed.summary.speed}</p>
              </div>
              <div>
                <span className="text-blue-700">Direção:</span>
                <p className="font-medium text-gray-900">{detalhesPacote.parsed.summary.direction}</p>
              </div>
              <div>
                <span className="text-blue-700">Ignição:</span>
                <p className="font-medium text-gray-900">{detalhesPacote.parsed.summary.ignition}</p>
              </div>
              <div>
                <span className="text-blue-700">Bateria:</span>
                <p className="font-medium text-gray-900">{detalhesPacote.parsed.summary.battery}</p>
              </div>
              <div className="col-span-2 md:col-span-3">
                <span className="text-blue-700">Status:</span>
                <p className="font-medium text-gray-900">{detalhesPacote.parsed.summary.status}</p>
              </div>
            </>
          )}
          
          {detalhesPacote.timestamp && (
            <div className="col-span-2 md:col-span-3">
              <span className="text-blue-700">Timestamp:</span>
              <p className="font-medium text-gray-900">
                {detalhesPacote.timestamp.local || detalhesPacote.timestamp.iso}
              </p>
            </div>
          )}
          
          {detalhesPacote.decodedData && (
            <div className="col-span-2 md:col-span-3">
              <span className="text-blue-700">Dados Brutos:</span>
              <p className="font-mono text-xs bg-gray-100 p-2 rounded mt-1 overflow-x-auto">
                {detalhesPacote.decodedData.substring(0, 100)}...
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header do Painel Flespi */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-2 rounded-lg mr-3">
            📡
          </span>
          Painel Flespi - Último Pacote GPS
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Monitoramento em tempo real do último pacote GPS processado
          {loading && (
            <span className="ml-2 text-blue-500">(Atualizando...)</span>
          )}
        </p>

        {error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">
              ⚠️ {error} - Verifique a conexão com a API
            </p>
          </div>
        )}

        {/* Exibir detalhes do pacote */}
        {renderDetalhesPacote()}
      </div>

      {/* Controles da API */}
      <div className="p-4 bg-gray-50 border-b border-gray-200 text-gray-950">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Channel ID
            </label>
            <input
              type="text"
              value={channelId}
              onChange={handleChannelChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite o Channel ID"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ident ID
            </label>
            <input
              type="text"
              value={identId}
              onChange={handleIdentChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite o Ident ID"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBuscarDados}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center disabled:opacity-50"
            >
              <span className="mr-2">🔍</span>
              {loading ? "Buscando..." : "Buscar Último Pacote"}
            </button>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="mr-2 h-4 w-4 text-blue-600"
                id="auto-refresh"
              />
              <label htmlFor="auto-refresh" className="text-sm text-gray-700">
                Atualização Automática
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* Mapa GPS */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900 flex items-center">
                <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-2">
                  🌍
                </span>
                Última Posição GPS
              </h3>
              <div className="flex gap-2">
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

            {/* Informações do veículo selecionado */}
            {pontoSelecionado && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 text-sm mb-2">
                  Veículo Monitorado
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
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
                  <div>
                    <span className="text-blue-700">Status:</span>
                    <p className="font-medium">
                      {GpsUtils.getStatusConfig(pontoSelecionado.status).texto}
                    </p>
                  </div>
                  <div>
                    <span className="text-blue-700">Velocidade:</span>
                    <p
                      className={`font-medium ${GpsUtils.getVelocidadeColor(
                        pontoSelecionado.velocidade
                      )}`}
                    >
                      {pontoSelecionado.velocidade} km/h
                    </p>
                  </div>
                  {pontoSelecionado.satelites && (
                    <div>
                      <span className="text-blue-700">Satélites:</span>
                      <p className="font-medium">
                        {pontoSelecionado.satelites}
                      </p>
                    </div>
                  )}
                  {pontoSelecionado.bateria && (
                    <div>
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

          {/* Painel de Controle e Estatísticas */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg mr-2">
                📊
              </span>
              Informações do Pacote
            </h3>

            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {estatisticas.emMovimento > 0 ? "EM MOVIMENTO" : "PARADO"}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">🚛</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Velocidade</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {veiculosFlespi[0]?.velocidade || 0} km/h
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <span className="text-green-600 text-xl">🟢</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Satélites</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {estatisticas.nivelSinalMedio}
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <span className="text-yellow-600 text-xl">🟡</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Bateria</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {veiculosFlespi[0]?.bateria || 0}%
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <span className="text-purple-600 text-xl">🔋</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Informações da Conexão */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-3 text-sm">
                Informações da Conexão
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Channel ID:</span>
                    <p className="font-medium text-gray-900">{channelId}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Ident ID:</span>
                    <p className="font-medium text-gray-900">{identId}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Última Atualização:</span>
                    <p className="font-medium text-gray-900">
                      {estatisticas.ultimaAtualizacao}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Status API:</span>
                    <p
                      className={`font-medium ${
                        error ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {error ? "❌ Offline" : "✅ Online"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detalhes do Veículo */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-3 text-sm">
                Detalhes do Veículo
              </h4>
              {veiculosFlespi.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-3"
                        style={{
                          backgroundColor: GpsUtils.getStatusConfig(
                            veiculosFlespi[0].status
                          ).cor,
                        }}
                      ></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {veiculosFlespi[0].placa}
                        </div>
                        <div className="text-xs text-gray-500">
                          {veiculosFlespi[0].ident}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">
                        {veiculosFlespi[0].velocidade} km/h
                      </div>
                      <div className="text-xs text-gray-500">
                        {veiculosFlespi[0].ultimaAtualizacao}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {veiculosFlespi[0].satelites} satélites
                      </div>
                      {veiculosFlespi[0].bateria && (
                        <div className="text-xs">
                          <span className={`font-medium ${
                            veiculosFlespi[0].bateria > 50 ? 'text-green-600' : 
                            veiculosFlespi[0].bateria > 20 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            🔋 {veiculosFlespi[0].bateria}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Informações adicionais */}
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">Latitude:</span>
                        <p className="font-medium">{veiculosFlespi[0].latitude.toFixed(6)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Longitude:</span>
                        <p className="font-medium">{veiculosFlespi[0].longitude.toFixed(6)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Direção:</span>
                        <p className="font-medium">{veiculosFlespi[0].direcao}°</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Altitude:</span>
                        <p className="font-medium">{veiculosFlespi[0].altitude}m</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  {loading ? "Carregando..." : "Nenhum veículo monitorado"}
                </div>
              )}
            </div>

            {/* Detalhes Técnicos */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-700 mb-3 text-sm">
                Detalhes Técnicos
              </h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                <div className="mb-2">
                  <span className="text-green-400">Endpoint:</span>
                  <span className="ml-2">/flespi/packets (Último pacote)</span>
                </div>
                <div className="mb-2">
                  <span className="text-blue-400">Modo:</span>
                  <span className="ml-2">Apenas último pacote</span>
                </div>
                <div className="mb-2">
                  <span className="text-yellow-400">Última Atualização:</span>
                  <span className="ml-2">
                    {new Date().toISOString().split("T")[1].split(".")[0]}
                  </span>
                </div>
                <div>
                  <span className="text-purple-400">Status:</span>
                  <span className="ml-2 text-green-400">● Ativo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente Principal DefaultPanel (mantido igual)
const DefaultPanel = () => {
  const [pontosMapa, setPontosMapa] = useState<PontoMapa[]>([]);
  const [pontoSelecionado, setPontoSelecionado] = useState<PontoMapa | null>(
    null
  );
  const [useCustomIcons, setUseCustomIcons] = useState(true);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("🔍 Estado atual:", {
    pontosMapa: pontosMapa.length,
    loading,
    error,
    hasGoogleMaps: typeof google !== "undefined",
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
              <h4 className="font-semibold text-gray-700 mb-3 text-sm">
                Eventos Recentes
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {Object.entries(estatisticasEventos)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 4)
                  .map(([evento, count]) => (
                    <div
                      key={evento}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
                    >
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
                  ))}
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
                      <div className="text-xs text-gray-500">
                        {ponto.ultimaAtualizacao}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {ponto.evento}
                      </div>
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

// Exportação principal
export default MainPanel;