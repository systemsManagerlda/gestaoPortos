/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { Suspense, useState, useEffect, useCallback, useMemo } from "react";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import BuildIcon from "@mui/icons-material/Build";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PeopleIcon from "@mui/icons-material/People";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PublicIcon from "@mui/icons-material/Public";
import Link from "@mui/material/Link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { SvgIconProps } from "@mui/material/SvgIcon";
import {
  Container,
  Paper,
  Typography,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Grid,
  Card,
  CardContent,
  Avatar,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  LinearProgress,
  Alert,
  CircularProgress,
  TextField,
  InputAdornment,
  AlertColor,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItemIcon,
  Tooltip,
  CardActionArea,
  Stack,
} from "@mui/material";

import {
  Business as BusinessIcon,
  LocalShipping as TransportIcon,
  Inventory as CargoIcon,
  Person as DriverIcon,
  Person as ClientIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Refresh as RefreshIcon,
  AccessTime as TimeIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  MonetizationOn as MoneyIcon,
  Description as DocumentIcon,
  Security as SecurityIcon,
  Map as MapIcon,
  Error as ErrorIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  QrCode as QrCodeIcon,
  Input as InputIcon,
  Visibility as ViewIcon,
  ArrowForward as ArrowIcon,
  EventAvailable as DateIcon,
  Scale as WeightIcon,
  AttachMoney as MoneyIcon2,
  PersonPin as PersonIcon,
  CorporateFare as CorporateIcon,
  DirectionsCar as TruckIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Info as InfoIcon,
  MoreVert as MoreIcon,
  Link as LinkIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Print as PrintIcon,
  Close as CloseIcon,
  Check as CheckCircleIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

// API base URL - ajuste conforme sua configuração
const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

interface GrupoCargas {
  motoristaId: string;
  motoristaNome: string;
  cargas: CargaData[];
  totalCargas: number;
  totalPeso: number;
  totalValor: number;
}

type CargasAgrupadas = Record<string, GrupoCargas>;

// ==================== INTERFACE CargaData COMPLETA ====================
interface CargaData {
  codigo?: string;
  descricao?: string;
  tipoCarga?: string;
  tipo?: string;
  subtipo?: string;
  naturezaCarga?: string;
  categoriaSeguro?: string;
  abrangenciaSeguro?: string;
  tipoPercurso?: string;
  destinoFrete?: string;
  pesoBruto?: number;
  pesoLiquido?: number;
  volume?: number;
  embalagem?: string;
  quantidadeVolumes?: number;
  dimensoes?: {
    largura?: number;
    altura?: number;
    comprimento?: number;
  };
  contentor?: {
    numero?: string;
    tipo?: string;
    tara?: number;
    capacidadeMaxima?: number;
    anoFabricacao?: number;
    estadoAtual?: string;
    lacreOrigem?: string;
    lacreDestino?: string;
  };
  gps?: {
    codigo?: string;
    modelo?: string;
    bateriaPercentual?: number;
    ultimaComunicacao?: string | Date;
    satelites?: number;
    imei?: string;
    trackingId?: string;
    vinculoMotoristaId?: number;
    vinculoViagemId?: number;
  };
  sensoresIOT?: {
    temperatura?: number;
    umidade?: number;
    aberturaPorta?: boolean;
    movimentoBruscoDetectado?: boolean;
    tombamentoDetectado?: boolean;
    historicoEventos?: Array<{
      tipo?: string;
      descricao?: string;
      data?: string | Date;
    }>;
  };
  clienteId?: string;
  cliente?: string;
  exportador?: string;
  importador?: string;
  contatoCliente?: string;
  instrucaoEspecial?: string;
  prioridade?: string;
  origem?:
    | {
        pais?: string;
        cidade?: string;
        local?: string;
        coordenadas?: {
          lat?: number;
          lng?: number;
        };
      }
    | string;
  destino?:
    | {
        pais?: string;
        cidade?: string;
        local?: string;
        coordenadas?: {
          lat?: number;
          lng?: number;
        };
      }
    | string;
  pontoAtual?: {
    descricao?: string;
    lat?: number;
    lng?: number;
    data?: string | Date;
  };
  status?: string;
  fluxoStatus?: string[];
  checkpointHistorico?: Array<{
    status?: string;
    data?: string | Date;
    local?: string;
    observacao?: string;
  }>;
  documentos?: {
    conhecimentoEmbarque?: string;
    invoice?: string;
    packingList?: string;
    certificadoOrigem?: string;
    contratoTransporte?: string;
    numeroCotacao?: string;
    numeroRecibo?: string;
    notaDebito?: string;
    manifest?: string;
    outros?: string[];
  };
  motorista?: {
    id?: number;
    nome?: string;
    empresaMotorista?: string;
    empresaMotoristaId?: number;
    cartaConducaoNumero?: string;
    cartaConducaoCategoria?: string;
    validadeCartaConducao?: string | Date;
    telefone?: string;
    nacionalidade?: string;
    avaliacao?: number;
  };
  motoristaId?: string;
  veiculo?: {
    id?: number;
    matricula?: string;
    modelo?: string;
    ano?: number;
    quilometragemInicial?: number;
    quilometragemFinal?: number;
    proximaRevisaoKM?: number;
    estadoVeiculoAntes?: string;
    estadoVeiculoDepois?: string;
    seguroVeiculo?: {
      tipo?: string;
      valorVeiculo?: number;
      valorPremio?: number;
      apolice?: string;
      dataVencimento?: string | Date;
    };
  };
  dataColeta?: string | Date;
  dataEntregaPrevista?: string | Date;
  dataEntregaReal?: string | Date;
  tempoArmazenagemHoras?: number;
  tempoTransitoHoras?: number;
  distanciaKm?: number;
  freteIda?: number;
  freteVolta?: number;
  percentualLogistica?: number;
  contentorVazio?: number;
  valorFrete?: number;
  taxasPortuarias?: number;
  despesasOperacionais?: number;
  custoCarga?: number;
  valorMercadoria?: number;
  comissaoCalculada?: number;
  moedaComissao?: string;
  custosExtras?: Array<{
    tipo?: string;
    descricao?: string;
    valor?: number;
    data?: string | Date;
  }>;
  valorTotal?: number;
  margemLucro?: number;
  seguro?: {
    apolice?: string;
    seguradora?: string;
    valorSegurado?: number;
    taxaPercentual?: number;
    taxaBaseMZN?: number;
    premioCalculado?: number;
    premioFinal?: number;
    dataInicio?: string | Date;
    dataFim?: string | Date;
    cobertura?: string[];
    statusSeguro?: string;
    sinistros?: Array<{
      data?: string | Date;
      descricao?: string;
      valorSinistro?: number;
      status?: string;
    }>;
  };
  ocorrencias?: Array<{
    id?: number;
    tipo?: string;
    descricao?: string;
    severidade?: string;
    dataRegistro?: string | Date;
    status?: string;
    acaoTomada?: string;
    custo?: number;
    evidencias?: string[];
    afetaSeguro?: boolean;
    sinistroRelacionado?: string;
  }>;
  auditorias?: Array<{
    id?: number;
    data?: string | Date;
    auditor?: string;
    observacao?: string;
    resultado?: string;
  }>;
  checklist?: {
    coleta?: Array<{
      item?: string;
      status?: string;
      observacao?: string;
    }>;
    entrega?: Array<{
      item?: string;
      status?: string;
      observacao?: string;
    }>;
  };
  viagemId?: number;
  observacoes?: string;
  dataCriacao?: string | Date;
  dataAtualizacao?: string | Date;
  criadoPor?: string;
  atualizadoPor?: string;
  // Campos virtuais
  calculos?: {
    comissao?: number;
    fretes?: {
      freteIda?: number;
      freteVolta?: number;
      distancia?: number;
      percentual?: number;
    };
    premioSeguro?: number;
    premioVeiculo?: number;
    valorTotal?: number;
    margemLucro?: number;
    tempoTotalHoras?: number;
    atrasada?: boolean;
  };
}

// ==================== TIPOS E INTERFACES ADICIONAIS ====================
interface ContatoCompleto {
  nome: string;
  cargo?: string;
  telefone?: string;
  email?: string;
  principal?: boolean;
}

// ==================== TIPOS E INTERFACES ====================
interface VeiculoHabilitado {
  tipo: string;
  marca: string;
  modelo: string;
  matricula: string;
  nivelInspecao: {
    categoria: string;
    descricao: string;
    dataUltimaInspecao: string;
    dataProximaInspecao: string;
    resultadoUltimaInspecao: string;
    centroInspecao: string;
  };
  viabilidade: {
    podeChante: boolean;
    podeNacional: boolean;
    podeTransito: boolean;
  };
}

interface MotoristaData {
  nome?: string;
  nomeCompleto?: string;
  motoristaId?: string | number;
  cartaConducao?: CartaConducao | string;
  categoria?: string;
  empresa?: string;
  empresaMotorista?: string;
  avaliacaoGeral?: number;
  avaliacao?: number;
  status?: string;
  empresaMotoristaId?: string;
  statusContratual?: string;
  totalViagensRealizadas?: number;
  totalViagens?: number;
  totalKmPercorridos?: number;
  contactos?: {
    telefonePrincipal?: string;
    telefoneAlternativo?: string;
    email?: string;
    emergencia?: {
      nome?: string;
      parentesco?: string;
      telefone?: string;
    };
  };
  telefone?: string;
  passaporte?: Passaporte;
  empresaId?: string;
  transportadoraId?: string;
  dataNascimento?: string;
  nacionalidade?: string;
  cargo?: string;
  dataAdmissao?: string;
  numeroBI?: string;
  validadeBI?: string;
  nuit?: string;
  cartaConducaoDetalhes?: {
    numero?: string;
    categoria?: string;
    dataEmissao?: string;
    validade?: string;
    localEmissao?: string;
  };
  licencaProfissional?: {
    numero?: string;
    validade?: string;
    categoria?: string;
  };
  endereco?: {
    provincia?: string;
    cidade?: string;
    bairro?: string;
    rua?: string;
    numeroCasa?: string;
  };
  avaliacaoDetalhada?: {
    seguranca?: number;
    cumprimentoRota?: number;
    pontualidade?: number;
    comunicacao?: number;
    economiaCombustivel?: number;
    cuidadoVeiculo?: number;
    documentacao?: number;
  };
  indiceAcidentes?: number;
  indiceMultas?: number;
  limitesJornada?: {
    horasMaxDia?: number;
    horasMaxSemana?: number;
    horasMaxMensal?: number;
  };
  veiculosHabilitados?: VeiculoHabilitado[];
  infoTransportador?: {
    totalCamioes?: number;
    qualificadoTransito?: boolean;
    restricoes?: {
      motivo?: string;
      podeFazerNacional?: boolean;
      podeFazerTransito?: boolean;
    };
  };
  foto?: string;
  fotos?: string[];
  observacoes?: string;
  dataCriacao?: string;
}
interface Contact {
  _id?: string;
  id?: string;
  nome?: string;
  cargo?: string;
  telefone?: string;
  email?: string;
  principal?: boolean;
  departamento?: string;
}

interface Endereco {
  cidade?: string;
  rua?: string;
  bairro?: string;
  provincia?: string;
}

interface Seguro {
  premioFinal?: number;
  valorSegurado?: number;
  statusSeguro?: string;
}

interface Passaporte {
  numero?: string;
  validade?: string;
}

interface CartaConducao {
  numero?: string;
  categoria?: string;
  validade?: string;
}

interface Fretes {
  freteIda?: number;
  freteVolta?: number;
  distancia?: number;
  percentual?: number;
}

interface ViagemData {
  fretes?: Fretes;
  comissao?: number;
  seguroCarga?: number;
  seguroVeiculo?: number;
  valorTotal?: number;
  margemLucro?: number;
}

interface EmpresaData {
  nome?: string;
  categoria?: string;
  nomeEmpresa?: string;
  codigo?: string;
  nuit?: string;
  segmento?: string;
  status?: string;
  classificacao?: string;
  dataCadastro?: string;
  contatoPrincipal?: Contact;
  telefone?: string;
  email?: string;
  endereco?: string | Endereco;
  contatos?: Contact[];
  enderecoCobranca?: string | Endereco;
  motoristasIds?: string[];
}

interface TransportadoraData {
  transportadoraId?: string;
  nome?: string;
  nomeEmpresa?: string;
  telefone?: string;
  totalCamioes?: number;
  nif?: string;
  email?: string;
  avaliacao?: number;
  website?: string;
  contactos?: {
    telefonePrincipal?: string;
    telefoneAlternativo?: string;
    emailComercial?: string;
  };
  endereco?: {
    provincia?: string;
    cidade?: string;
    bairro?: string;
    rua?: string;
    numero?: string;
  };
  tipoServicos?: string[];
  capacidadeTotal?: {
    totalCamioes?: number;
    totalMotoristas?: number;
    tonelagemMaxima?: number;
  };
  avaliacaoGeral?: number;
  status?: string;
  dataCriacao?: string;
  observacoes?: string;
  motoristasIds?: (string | number)[];
  qualificadaTransito?: boolean;
}

interface ClienteData {
  nome?: string;
  nomeEmpresa?: string;
  categoria?: string;
  segmento?: string;
  codigo?: string;
  tipoPessoa?: string;
  dataCadastro?: string;
  empresaMotorista?: string;
  tipo?: string;
  nuit?: string;
  classificacao?: string;
  contatos?: Contact[];
  contatoPrincipal?: string;
  telefone?: string;
  email?: string;
  status?: string;
  motoristasIds?: string[];
}

interface ApiResponse {
  returnCode: number;
  returnMsg?: string;
  data?: any;
  list?: any[];
}

interface TransportData {
  empresa: EmpresaData | null;
  transportadora: TransportadoraData | null;
  carga: CargaData | null;
  motorista: MotoristaData | null;
  cliente: ClienteData | null;
  viagem: ViagemData | null;
}

export interface TabItem {
  label: string;
  icon: React.ReactElement<SvgIconProps>;
  disabled?: boolean;
}

type StatusColor = "success" | "warning" | "info" | "error" | "default";

// ==================== INTERFACE PARA CAMIÃO ====================
interface CamiaoData {
  camiaoId: number;
  matricula: string;
  marca: string;
  modelo: string;
  anoFabricacao: number;
  cor?: string;
  transportadoraId: number;
  motoristaId: number;
  codigoGPS: string;
  tipoGPS: {
    tipo: "normal" | "vip";
    descricao: string;
    valorRegistro: number;
    dataAtivacao: Date;
    dataExpiracao?: Date;
    status: "ativo" | "inativo" | "pendente" | "expirado";
  };
  nivelInspecao: {
    categoria: "A" | "B" | "C";
    descricao: string;
    dataUltimaInspecao: Date;
    dataProximaInspecao: Date;
    resultadoUltimaInspecao:
      | "aprovado"
      | "aprovado_com_ressalvas"
      | "reprovado";
    centroInspecao?: string;
  };
  especificacoes: {
    tipo: string;
    pesoBruto: number;
    tara: number;
    cargaUtil: number;
    numEixos: number;
  };
  status: "disponivel" | "em_viagem" | "manutencao" | "inativo" | "reservado";
  idade?: number;
  inspecaoValida?: boolean;
  gpsVipAtivo?: boolean;
  diasExpiracaoGPS?: number;
  fotos?: string[];
}

// ==================== CONSTANTES E UTILITÁRIOS ====================
const STATUS_MAP: Record<string, string> = {
  ativo: "Ativo",
  ativa: "Ativa",
  inativo: "Inativo",
  inativa: "Inativa",
  em_transito: "Em Trânsito",
  em_viagem: "Em Viagem",
  entregue: "Entregue",
  planeada: "Planejada",
  coletada: "Coletada",
  disponivel: "Disponível",
  cancelada: "Cancelada",
  suspenso: "Suspenso",
};

const formatCurrency = (value?: number) => {
  if (!value) return "MZN 0";
  return new Intl.NumberFormat("pt-MZ", {
    style: "currency",
    currency: "MZN",
    minimumFractionDigits: 0,
  }).format(value);
};

const STATUS_COLOR_MAP: Record<string, StatusColor> = {
  ativo: "success",
  ativa: "success",
  entregue: "success",
  disponivel: "success",
  em_transito: "warning",
  em_viagem: "warning",
  coletada: "info",
  planeada: "info",
  inativo: "error",
  inativa: "error",
  cancelada: "error",
  suspenso: "error",
};

// REMOVIDAS AS ABAS CLIENTES E FINANCEIRO
const TABS: TabItem[] = [
  { label: "Visão Geral", icon: <BusinessIcon /> },
  { label: "Motorista", icon: <DriverIcon /> },
  { label: "Camioes", icon: <TruckIcon /> },
  { label: "Empresas", icon: <BusinessIcon /> },
  { label: "Transportadoras", icon: <TransportIcon /> },
  { label: "Cargas", icon: <CargoIcon /> },
  // REMOVIDO: { label: "Clientes", icon: <ClientIcon /> },
  // REMOVIDO: { label: "Financeiro", icon: <MoneyIcon /> },
];

// ==================== COMPONENTE CargaDetalhes ====================
interface CargaDetalhesProps {
  carga?: CargaData | null;
  onRefresh?: () => void;
  onClose?: () => void;
  loading?: boolean;
  onCalculate?: () => void;
}

const CargaDetalhes: React.FC<CargaDetalhesProps> = ({
  carga,
  onRefresh,
  onClose,
  loading = false,
  onCalculate,
}) => {
  if (!carga) return null;

  const formatCurrency = (value?: number) => {
    if (!value) return "MZN 0";
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (date?: string | Date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("pt-MZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPriorityColor = (prioridade?: string) => {
    switch (prioridade?.toLowerCase()) {
      case "urgente":
        return "error";
      case "alta":
        return "warning";
      case "média":
        return "info";
      case "baixa":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          {onClose && (
            <IconButton onClick={onClose} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <CargoIcon
            sx={{ mr: 2, color: "info.main", fontSize: { xs: 24, sm: 32 } }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h5"
              sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
            >
              Carga {carga.codigo}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              {carga.tipoCarga} • {carga.naturezaCarga}
            </Typography>
          </Box>
          {onRefresh && (
            <IconButton onClick={onRefresh} disabled={loading} size="small">
              <RefreshIcon />
            </IconButton>
          )}
        </Box>

        <Grid container spacing={{ xs: 1.5, sm: 3 }}>
          {/* Informações Básicas */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                  Informações Básicas
                </Typography>
                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Código
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {carga.codigo}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Status
                    </Typography>
                    <StatusChip status={carga.status} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Tipo
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {carga.tipoCarga}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Natureza
                    </Typography>
                    <Chip
                      label={carga.naturezaCarga || "N/A"}
                      color={
                        carga.naturezaCarga === "perigosa" ? "error" : "success"
                      }
                      size="small"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Prioridade
                    </Typography>
                    <Chip
                      label={carga.prioridade || "N/A"}
                      color={getPriorityColor(carga.prioridade)}
                      size="small"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Peso Bruto
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {carga.pesoBruto?.toLocaleString()} kg
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Descrição
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {carga.descricao}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Cliente e Motorista */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                  Cliente e Motorista
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    Cliente
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    {carga.cliente}
                  </Typography>
                  {carga.contatoCliente && (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Contato: {carga.contatoCliente}
                    </Typography>
                  )}
                </Box>

                {carga.motorista && (
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Motorista
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        sx={{
                          width: { xs: 32, sm: 40 },
                          height: { xs: 32, sm: 40 },
                          mr: 2,
                          bgcolor: "success.main",
                        }}
                      >
                        {carga.motorista.nome?.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                        >
                          {carga.motorista.nome}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                        >
                          Carta: {carga.motorista.cartaConducaoNumero} •{" "}
                          {carga.motorista.cartaConducaoCategoria}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )}

                {/* Veículo */}
                {carga.veiculo && (
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Veículo
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <TruckIcon
                        sx={{
                          mr: 2,
                          color: "primary.main",
                          fontSize: { xs: 20, sm: 24 },
                        }}
                      />
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                        >
                          {carga.veiculo.matricula} • {carga.veiculo.modelo}
                        </Typography>
                        {carga.veiculo.ano && (
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                          >
                            Ano: {carga.veiculo.ano}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Rota */}
          <Grid size={{ xs: 12 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                  Rota
                </Typography>
                <Grid container spacing={{ xs: 1.5, sm: 3 }}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <LocationIcon
                        sx={{
                          mr: 2,
                          color: "success.main",
                          fontSize: { xs: 20, sm: 24 },
                        }}
                      />
                      <Box>
                        <Typography
                          variant="subtitle2"
                          color="textSecondary"
                          sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                        >
                          Origem
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                        >
                          {typeof carga.origem === "string"
                            ? carga.origem
                            : `${carga.origem?.cidade}, ${carga.origem?.local}`}
                        </Typography>
                      </Box>
                    </Box>
                    {carga.dataColeta && (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        Coleta: {formatDate(carga.dataColeta)}
                      </Typography>
                    )}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <LocationIcon
                        sx={{
                          mr: 2,
                          color: "error.main",
                          fontSize: { xs: 20, sm: 24 },
                        }}
                      />
                      <Box>
                        <Typography
                          variant="subtitle2"
                          color="textSecondary"
                          sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                        >
                          Destino
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                        >
                          {typeof carga.destino === "string"
                            ? carga.destino
                            : `${carga.destino?.cidade}, ${carga.destino?.local}`}
                        </Typography>
                      </Box>
                    </Box>
                    {carga.dataEntregaPrevista && (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        Entrega Prevista:{" "}
                        {formatDate(carga.dataEntregaPrevista)}
                      </Typography>
                    )}
                    {carga.dataEntregaReal && (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        Entrega Real: {formatDate(carga.dataEntregaReal)}
                      </Typography>
                    )}
                  </Grid>
                  {carga.distanciaKm && (
                    <Grid size={{ xs: 12 }}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        Distância: {carga.distanciaKm.toLocaleString()} km
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Informações Financeiras */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                  >
                    Informações Financeiras
                  </Typography>
                  {onCalculate && (
                    <Button
                      size="small"
                      startIcon={<MoneyIcon />}
                      onClick={onCalculate}
                      disabled={loading}
                    >
                      Recalcular
                    </Button>
                  )}
                </Box>

                <List dense>
                  <ListItem sx={{ px: { xs: 0, sm: 2 } }}>
                    <ListItemText
                      primary="Valor da Mercadoria"
                      secondary={formatCurrency(carga.valorMercadoria)}
                      primaryTypographyProps={{
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                      }}
                      secondaryTypographyProps={{
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                      }}
                    />
                  </ListItem>

                  {carga.freteIda && (
                    <ListItem sx={{ px: { xs: 0, sm: 2 } }}>
                      <ListItemText
                        primary="Frete de Ida"
                        secondary={formatCurrency(carga.freteIda)}
                        primaryTypographyProps={{
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                        secondaryTypographyProps={{
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                      />
                    </ListItem>
                  )}

                  {carga.freteVolta && (
                    <ListItem sx={{ px: { xs: 0, sm: 2 } }}>
                      <ListItemText
                        primary="Frete de Volta"
                        secondary={formatCurrency(carga.freteVolta)}
                        primaryTypographyProps={{
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                        secondaryTypographyProps={{
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                      />
                    </ListItem>
                  )}

                  {carga.comissaoCalculada && (
                    <ListItem sx={{ px: { xs: 0, sm: 2 } }}>
                      <ListItemText
                        primary="Comissão"
                        secondary={formatCurrency(carga.comissaoCalculada)}
                        primaryTypographyProps={{
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                        secondaryTypographyProps={{
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                      />
                    </ListItem>
                  )}

                  {carga.seguro?.premioFinal && (
                    <ListItem sx={{ px: { xs: 0, sm: 2 } }}>
                      <ListItemText
                        primary="Seguro da Carga"
                        secondary={formatCurrency(carga.seguro.premioFinal)}
                        primaryTypographyProps={{
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                        secondaryTypographyProps={{
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                      />
                    </ListItem>
                  )}

                  {carga.valorTotal && (
                    <ListItem sx={{ px: { xs: 0, sm: 2 } }}>
                      <ListItemText
                        primary="Valor Total"
                        secondary={formatCurrency(carga.valorTotal)}
                        primaryTypographyProps={{
                          fontWeight: "bold",
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                        secondaryTypographyProps={{
                          fontWeight: "bold",
                          color: "primary.main",
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                      />
                    </ListItem>
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Seguro */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                  Seguro
                </Typography>

                {carga.seguro ? (
                  <Grid container spacing={1.5}>
                    <Grid size={{ xs: 12 }}>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        Status do Seguro
                      </Typography>
                      <Chip
                        label={carga.seguro.statusSeguro || "N/A"}
                        color={
                          carga.seguro.statusSeguro === "ativo"
                            ? "success"
                            : "error"
                        }
                        size="small"
                      />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        Categoria
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                      >
                        {carga.categoriaSeguro}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        Abrangência
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                      >
                        {carga.abrangenciaSeguro}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        Valor Segurado
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                      >
                        {formatCurrency(carga.seguro.valorSegurado)}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        Prêmio
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                      >
                        {formatCurrency(carga.seguro.premioFinal)}
                      </Typography>
                    </Grid>
                    {carga.seguro.apolice && (
                      <Grid size={{ xs: 12 }}>
                        <Typography
                          variant="subtitle2"
                          color="textSecondary"
                          sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                        >
                          Apólice
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                        >
                          {carga.seguro.apolice}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                ) : (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    Seguro não configurado
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Conteiner */}
          {carga.contentor && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                  >
                    Contentor
                  </Typography>
                  <Grid container spacing={1.5}>
                    <Grid size={{ xs: 6 }}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        Número
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                      >
                        {carga.contentor.numero}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        Tipo
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                      >
                        {carga.contentor.tipo}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        Tara
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                      >
                        {carga.contentor.tara?.toLocaleString()} kg
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        Capacidade
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                      >
                        {carga.contentor.capacidadeMaxima?.toLocaleString()} kg
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Dimensões */}
          {carga.dimensoes && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                  >
                    Dimensões
                  </Typography>
                  <Grid container spacing={1.5}>
                    <Grid size={{ xs: 4 }}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        Comprimento
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                      >
                        {carga.dimensoes.comprimento} m
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        Largura
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                      >
                        {carga.dimensoes.largura} m
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        Altura
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                      >
                        {carga.dimensoes.altura} m
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Ocorrências */}
          {carga.ocorrencias && carga.ocorrencias.length > 0 && (
            <Grid size={{ xs: 12 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                  >
                    Ocorrências ({carga.ocorrencias.length})
                  </Typography>
                  <List dense>
                    {carga.ocorrencias.map((ocorrencia, index) => (
                      <ListItem key={index} sx={{ px: { xs: 0, sm: 2 } }}>
                        <ListItemIcon sx={{ minWidth: { xs: 36, sm: 40 } }}>
                          {ocorrencia.severidade === "alta" ||
                          ocorrencia.severidade === "crítica" ? (
                            <WarningIcon color="error" fontSize="small" />
                          ) : (
                            <InfoIcon color="warning" fontSize="small" />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={ocorrencia.descricao}
                          secondary={
                            <React.Fragment>
                              <Typography
                                variant="caption"
                                display="block"
                                sx={{
                                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                                }}
                              >
                                Tipo: {ocorrencia.tipo} • Severidade:{" "}
                                {ocorrencia.severidade}
                              </Typography>
                              {ocorrencia.dataRegistro && (
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontSize: { xs: "0.7rem", sm: "0.75rem" },
                                  }}
                                >
                                  Data: {formatDate(ocorrencia.dataRegistro)}
                                </Typography>
                              )}
                            </React.Fragment>
                          }
                          primaryTypographyProps={{
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

// ==================== COMPONENTE CargasLista ====================
interface CargasListaProps {
  cargas: CargaData[];
  onSelectCarga: (carga: CargaData) => void;
  loading?: boolean;
}

const CargasLista: React.FC<CargasListaProps> = ({
  cargas,
  onSelectCarga,
  loading = false,
}) => {
  if (cargas.length === 0) {
    return (
      <Alert severity="info">
        Nenhuma carga encontrada para este motorista.
      </Alert>
    );
  }

  return (
    <Grid container spacing={{ xs: 1.5, sm: 2 }}>
      {cargas.map((carga, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 6 }} key={index}>
          <Card
            sx={{
              height: "100%",
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 3,
              },
            }}
            onClick={() => onSelectCarga(carga)}
          >
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              {/* Cabeçalho */}
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  sx={{
                    bgcolor: "info.main",
                    mr: 2,
                    width: { xs: 36, sm: 40 },
                    height: { xs: 36, sm: 40 },
                  }}
                >
                  <CargoIcon fontSize="small" />
                </Avatar>
                <Box sx={{ overflow: "hidden" }}>
                  <Typography
                    variant="h6"
                    noWrap
                    sx={{ fontSize: { xs: "1rem", sm: "1.125rem" } }}
                  >
                    {carga.codigo}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    {carga.tipoCarga} • {carga.naturezaCarga}
                  </Typography>
                </Box>
              </Box>

              {/* Status e Prioridade */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <StatusChip status={carga.status} />
                {carga.prioridade && (
                  <Chip
                    label={carga.prioridade}
                    color={
                      carga.prioridade.toLowerCase() === "urgente"
                        ? "error"
                        : carga.prioridade.toLowerCase() === "alta"
                        ? "warning"
                        : carga.prioridade.toLowerCase() === "média"
                        ? "info"
                        : "success"
                    }
                    size="small"
                  />
                )}
              </Box>

              <Divider sx={{ my: 1 }} />

              {/* Informações da carga */}
              <Grid container spacing={1}>
                <Grid size={{ xs: 6 }}>
                  <Box display="flex" flexDirection="column">
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                    >
                      Peso
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {carga.pesoBruto?.toLocaleString()} kg
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Box display="flex" flexDirection="column">
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                    >
                      Valor
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {carga.valorMercadoria?.toLocaleString()} MZN
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Box display="flex" flexDirection="column" mt={1}>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                    >
                      Rota
                    </Typography>
                    <Box display="flex" alignItems="center" flexWrap="wrap">
                      <LocationIcon
                        fontSize="small"
                        sx={{
                          mr: 0.5,
                          color: "success.main",
                          fontSize: { xs: 14, sm: 16 },
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          mr: 1,
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        }}
                      >
                        {typeof carga.origem === "string"
                          ? carga.origem
                          : carga.origem?.cidade}
                      </Typography>
                      <ArrowIcon
                        fontSize="small"
                        sx={{
                          mr: 0.5,
                          color: "text.secondary",
                          fontSize: { xs: 14, sm: 16 },
                        }}
                      />
                      <LocationIcon
                        fontSize="small"
                        sx={{
                          mr: 0.5,
                          color: "error.main",
                          fontSize: { xs: 14, sm: 16 },
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        {typeof carga.destino === "string"
                          ? carga.destino
                          : carga.destino?.cidade}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {/* Informações adicionais */}
              {carga.motorista && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    display="block"
                    sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                  >
                    Motorista:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    {carga.motorista.nome}
                  </Typography>
                </Box>
              )}

              {carga.veiculo && (
                <Box sx={{ mt: 1 }}>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    display="block"
                    sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                  >
                    Veículo:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    {carga.veiculo.matricula}
                  </Typography>
                </Box>
              )}

              {/* Botão de ação */}
              <Box sx={{ mt: 2, textAlign: "right" }}>
                <Button size="small" endIcon={<ArrowIcon />}>
                  Ver detalhes
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

// ==================== COMPONENTES DE CAMIÕES ====================

// Componente de Lista de Camioes
interface CamioesListaProps {
  camioes: CamiaoData[];
  onSelectCamiao: (camiao: CamiaoData) => void;
  loading?: boolean;
}

const CamioesLista: React.FC<CamioesListaProps> = ({
  camioes,
  onSelectCamiao,
  loading = false,
}) => {
  const getGPSColor = (tipo: string) => {
    switch (tipo) {
      case "vip":
        return "warning";
      case "normal":
        return "info";
      default:
        return "default";
    }
  };

  const getGPSIcon = (tipo: string): React.ReactElement => {
    const iconProps = { fontSize: "small" as const };

    switch (tipo) {
      case "vip":
        return <StarIcon {...iconProps} />;
      case "normal":
      default:
        return <LocationIcon {...iconProps} />;
    }
  };

  if (camioes.length === 0) {
    return (
      <Alert severity="info">
        Nenhum camião encontrado para este motorista.
      </Alert>
    );
  }

  return (
    <Grid container spacing={{ xs: 1.5, sm: 2 }}>
      {camioes.map((camiao, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 6 }} key={index}>
          <Card
            sx={{
              height: "100%",
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 3,
              },
            }}
            onClick={() => onSelectCamiao(camiao)}
          >
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              {/* Foto do camião */}
              {camiao.fotos && camiao.fotos.length > 0 ? (
                <Box sx={{ position: "relative", mb: 2 }}>
                  <img
                    src={camiao.fotos[0]}
                    alt={camiao.matricula}
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <Chip
                    label={camiao.matricula}
                    color="primary"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      fontWeight: "bold",
                    }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "120px",
                    bgcolor: "grey.200",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    mb: 2,
                  }}
                >
                  <TruckIcon sx={{ fontSize: 40, color: "grey.500" }} />
                </Box>
              )}

              {/* Informações principais */}
              <Box>
                <Typography
                  variant="h6"
                  noWrap
                  gutterBottom
                  sx={{ fontSize: { xs: "1rem", sm: "1.125rem" } }}
                >
                  {camiao.marca} {camiao.modelo}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  gutterBottom
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  {camiao.anoFabricacao} • {camiao.cor || "Sem cor definida"}
                </Typography>
              </Box>

              {/* Status e GPS */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
                flexWrap="wrap"
                gap={1}
              >
                <StatusChip status={camiao.status} />
                <Chip
                  icon={getGPSIcon(camiao.tipoGPS.tipo)}
                  label={camiao.tipoGPS.tipo.toUpperCase()}
                  color={getGPSColor(camiao.tipoGPS.tipo)}
                  size="small"
                />
              </Box>

              <Divider sx={{ my: 1 }} />

              {/* Especificações */}
              <Grid container spacing={1}>
                <Grid size={{ xs: 6 }}>
                  <Box display="flex" flexDirection="column">
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                    >
                      Peso Bruto
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {camiao.especificacoes.pesoBruto.toLocaleString()} kg
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Box display="flex" flexDirection="column">
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                    >
                      Carga Útil
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {camiao.especificacoes.cargaUtil.toLocaleString()} kg
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Box display="flex" flexDirection="column">
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                    >
                      Eixos
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {camiao.especificacoes.numEixos}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Box display="flex" flexDirection="column">
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                    >
                      Categoria
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {camiao.nivelInspecao.categoria}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Validações */}
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={1}>
                  <Grid size={{ xs: 6 }}>
                    <Chip
                      label={
                        camiao.inspecaoValida
                          ? "Inspeção OK"
                          : "Inspeção Vencida"
                      }
                      color={camiao.inspecaoValida ? "success" : "error"}
                      size="small"
                      icon={
                        camiao.inspecaoValida ? <CheckIcon /> : <WarningIcon />
                      }
                      variant="outlined"
                    />
                  </Grid>
                  {camiao.tipoGPS.tipo === "vip" && (
                    <Grid size={{ xs: 6 }}>
                      <Chip
                        label={camiao.gpsVipAtivo ? "VIP Ativo" : "VIP Inativo"}
                        color={camiao.gpsVipAtivo ? "warning" : "default"}
                        size="small"
                        icon={<StarBorderIcon />}
                        variant="outlined"
                      />
                    </Grid>
                  )}
                </Grid>
              </Box>

              <Box sx={{ mt: 2, textAlign: "right" }}>
                <Button size="small" endIcon={<ArrowIcon />}>
                  Ver detalhes
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

// Componente de Detalhes do Camiao
interface CamiaoDetalhesProps {
  camiao?: CamiaoData | null;
  onRefresh?: () => void;
  onClose?: () => void;
  loading?: boolean;
}

const CamiaoDetalhes: React.FC<CamiaoDetalhesProps> = ({
  camiao,
  onRefresh,
  onClose,
  loading = false,
}) => {
  if (!camiao) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          {onClose && (
            <IconButton onClick={onClose} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <TruckIcon
            sx={{ mr: 2, color: "primary.main", fontSize: { xs: 24, sm: 32 } }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h5"
              sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
            >
              {camiao.marca} {camiao.modelo}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              Matrícula: <strong>{camiao.matricula}</strong>
            </Typography>
          </Box>
          {onRefresh && (
            <IconButton onClick={onRefresh} disabled={loading} size="small">
              <RefreshIcon />
            </IconButton>
          )}
        </Box>

        <Grid container spacing={{ xs: 1.5, sm: 3 }}>
          {/* Fotos do camião */}
          {camiao.fotos && camiao.fotos.length > 0 && (
            <Grid size={{ xs: 12 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
              >
                Fotos do Camião
              </Typography>
              <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 2 }}>
                {camiao.fotos.map((foto, index) => (
                  <img
                    key={index}
                    src={foto}
                    alt={`Foto ${index + 1}`}
                    style={{
                      width: "150px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ))}
              </Box>
            </Grid>
          )}

          {/* Informações básicas */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                  Informações Básicas
                </Typography>
                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 6 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Matrícula
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {camiao.matricula}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Ano
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {camiao.anoFabricacao} ({camiao.idade} anos)
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Cor
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {camiao.cor || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Status
                    </Typography>
                    <StatusChip status={camiao.status} />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Código GPS
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {camiao.codigoGPS}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* GPS */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                  Sistema GPS
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  mb={2}
                  flexWrap="wrap"
                  gap={1}
                >
                  <Chip
                    label={camiao.tipoGPS.tipo.toUpperCase()}
                    color={camiao.tipoGPS.tipo === "vip" ? "warning" : "info"}
                    icon={
                      camiao.tipoGPS.tipo === "vip" ? (
                        <StarIcon />
                      ) : (
                        <LocationIcon />
                      )
                    }
                    size="small"
                  />
                  <Chip
                    label={camiao.tipoGPS.status}
                    color={
                      camiao.tipoGPS.status === "ativo" ? "success" : "error"
                    }
                    size="small"
                  />
                </Box>

                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 6 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Valor do Registro
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {formatCurrency(camiao.tipoGPS.valorRegistro)}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Data Ativação
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {new Date(camiao.tipoGPS.dataAtivacao).toLocaleDateString(
                        "pt-MZ"
                      )}
                    </Typography>
                  </Grid>
                  {camiao.tipoGPS.dataExpiracao && (
                    <Grid size={{ xs: 12 }}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        Expiração do GPS
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                      >
                        {new Date(
                          camiao.tipoGPS.dataExpiracao
                        ).toLocaleDateString("pt-MZ")}
                        {camiao.diasExpiracaoGPS && (
                          <span>
                            {" "}
                            ({camiao.diasExpiracaoGPS} dias restantes)
                          </span>
                        )}
                      </Typography>
                    </Grid>
                  )}
                  {camiao.tipoGPS.tipo === "vip" && (
                    <Grid size={{ xs: 12 }}>
                      <Alert
                        severity={camiao.gpsVipAtivo ? "success" : "warning"}
                      >
                        GPS VIP {camiao.gpsVipAtivo ? "Ativo" : "Inativo"}
                      </Alert>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Especificações */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                  Especificações Técnicas
                </Typography>
                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 6 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Tipo
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {camiao.especificacoes.tipo}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Eixos
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {camiao.especificacoes.numEixos}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Peso Bruto
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {camiao.especificacoes.pesoBruto.toLocaleString()} kg
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Tara
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {camiao.especificacoes.tara.toLocaleString()} kg
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Carga Útil
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {camiao.especificacoes.cargaUtil.toLocaleString()} kg
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Inspeção */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                  Inspeção Técnica
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  mb={2}
                  flexWrap="wrap"
                  gap={1}
                >
                  <Chip
                    label={`Categoria ${camiao.nivelInspecao.categoria}`}
                    color="primary"
                    size="small"
                  />
                  <Chip
                    label={camiao.inspecaoValida ? "Válida" : "Vencida"}
                    color={camiao.inspecaoValida ? "success" : "error"}
                    icon={
                      camiao.inspecaoValida ? <CheckIcon /> : <WarningIcon />
                    }
                    size="small"
                  />
                </Box>

                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 6 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Última Inspeção
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {new Date(
                        camiao.nivelInspecao.dataUltimaInspecao
                      ).toLocaleDateString("pt-MZ")}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Próxima Inspeção
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {new Date(
                        camiao.nivelInspecao.dataProximaInspecao
                      ).toLocaleDateString("pt-MZ")}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Resultado
                    </Typography>
                    <Chip
                      label={camiao.nivelInspecao.resultadoUltimaInspecao}
                      color={
                        camiao.nivelInspecao.resultadoUltimaInspecao ===
                        "aprovado"
                          ? "success"
                          : "error"
                      }
                      size="small"
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Centro
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {camiao.nivelInspecao.centroInspecao || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Descrição
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {camiao.nivelInspecao.descricao}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

// Componente de Resumo de Camioes para a aba do Motorista
interface CamioesResumoProps {
  camioes: CamiaoData[];
  onViewAll?: () => void;
}

const CamioesResumo: React.FC<CamioesResumoProps> = ({
  camioes,
  onViewAll,
}) => {
  if (camioes.length === 0) return null;

  const camioesDisponiveis = camioes.filter(
    (c) => c.status === "disponivel"
  ).length;
  const camioesVIP = camioes.filter((c) => c.tipoGPS.tipo === "vip").length;

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: { xs: "1rem", sm: "1.25rem" },
          }}
        >
          <LocalShippingIcon sx={{ mr: 1, fontSize: { xs: 20, sm: 24 } }} />
          Frota de Camiões
        </Typography>

        <Grid container spacing={1.5}>
          <Grid size={{ xs: 4 }}>
            <Box textAlign="center">
              <Typography
                variant="h4"
                color="primary.main"
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
              >
                {camioes.length}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                Total
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Box textAlign="center">
              <Typography
                variant="h4"
                color="success.main"
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
              >
                {camioesDisponiveis}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                Disponíveis
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Box textAlign="center">
              <Typography
                variant="h4"
                color="warning.main"
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
              >
                {camioesVIP}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                Com GPS VIP
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {onViewAll && (
          <Box sx={{ mt: 2 }}>
            <Button size="small" endIcon={<ArrowIcon />} onClick={onViewAll}>
              Ver todos os camiões
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

// ==================== COMPONENTES AUXILIARES ====================
// ==================== COMPONENTE DE DETALHES DA TRANSPORTADORA ====================
interface TransportadoraDetalhesProps {
  transportadora?: TransportadoraData | null;
  onRefresh?: () => void;
  onMotoristaClick?: (motoristaId: string) => void;
  loading?: boolean;
  motoristaAtual?: MotoristaData | null;
  onVincularMotorista?: (motoristaId: string) => void;
}

const TransportadoraDetalhes: React.FC<TransportadoraDetalhesProps> = ({
  transportadora,
  onRefresh,
  onMotoristaClick,
  loading = false,
  motoristaAtual,
  onVincularMotorista,
}) => {
  const [mostrarFormVinculo, setMostrarFormVinculo] = useState(false);
  const [motoristaParaVincular, setMotoristaParaVincular] = useState("");
  const [vinculando, setVinculando] = useState(false);

  const handleVincularMotorista = async () => {
    if (!motoristaParaVincular.trim() || !transportadora?.transportadoraId) {
      toast.error("Por favor, insira um ID de motorista válido");
      return;
    }

    try {
      setVinculando(true);
      if (onVincularMotorista) {
        await onVincularMotorista(motoristaParaVincular);
        setMostrarFormVinculo(false);
        setMotoristaParaVincular("");
      }
    } catch (error) {
      console.error("Erro ao vincular motorista:", error);
    } finally {
      setVinculando(false);
    }
  };
  if (!transportadora) return null;

  return (
    <InfoCard
      title="Detalhes da Transportadora"
      icon={<BusinessIcon sx={{ color: "primary.main" }} />}
      onRefresh={onRefresh}
      refreshDisabled={loading}
    >
      <Grid container spacing={{ xs: 1.5, sm: 3 }}>
        {/* Cabeçalho com informações principais */}
        <Grid size={{ xs: 12 }}>
          <Box
            display="flex"
            alignItems="center"
            mb={3}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <Avatar
              sx={{
                width: { xs: 60, sm: 80 },
                height: { xs: 60, sm: 80 },
                bgcolor: "primary.main",
                mr: { xs: 0, sm: 3 },
                mb: { xs: 2, sm: 0 },
                fontSize: { xs: 20, sm: 24 },
              }}
            >
              {transportadora.nomeEmpresa?.charAt(0) || "T"}
            </Avatar>
            <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem" } }}
              >
                {transportadora.nomeEmpresa || transportadora.nome}
              </Typography>
              <Box
                display="flex"
                gap={1}
                flexWrap="wrap"
                justifyContent={{ xs: "center", sm: "flex-start" }}
              >
                <Chip
                  label={`ID: ${transportadora.transportadoraId}`}
                  variant="outlined"
                  size="small"
                />
                {transportadora.nif && (
                  <Chip
                    label={`NUIT: ${transportadora.nif}`}
                    variant="outlined"
                    size="small"
                  />
                )}
                <StatusChip status={transportadora.status} />
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Seção 1: Informações de Contato */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                <PhoneIcon sx={{ mr: 1, fontSize: { xs: 18, sm: 20 } }} />{" "}
                Contatos
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  Telefone Principal
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  {transportadora.contactos?.telefonePrincipal || "N/A"}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  Email Comercial
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  {transportadora.contactos?.emailComercial ||
                    transportadora.email ||
                    "N/A"}
                </Typography>
              </Box>

              {transportadora.website && (
                <Box>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    Website
                  </Typography>
                  <Link
                    href={transportadora.website}
                    target="_blank"
                    rel="noopener"
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "primary.main",
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                      }}
                    >
                      {transportadora.website}
                    </Typography>
                  </Link>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Seção 2: Endereço */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                <LocationIcon sx={{ mr: 1, fontSize: { xs: 18, sm: 20 } }} />{" "}
                Endereço
              </Typography>

              {transportadora.endereco ? (
                <>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    <strong>Província:</strong>{" "}
                    {transportadora.endereco.provincia}
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    <strong>Cidade:</strong> {transportadora.endereco.cidade}
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    <strong>Bairro:</strong> {transportadora.endereco.bairro}
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    <strong>Rua:</strong> {transportadora.endereco.rua},{" "}
                    {transportadora.endereco.numero}
                  </Typography>
                </>
              ) : (
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  Endereço não disponível
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Seção 3: Capacidade e Serviços */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                <TruckIcon sx={{ mr: 1, fontSize: { xs: 18, sm: 20 } }} />{" "}
                Capacidade
              </Typography>

              {transportadora.capacidadeTotal ? (
                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 6 }}>
                    <Box textAlign="center">
                      <Typography
                        variant="h3"
                        color="primary.main"
                        sx={{ fontSize: { xs: "1.75rem", sm: "2.5rem" } }}
                      >
                        {transportadora.capacidadeTotal.totalCamioes}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        Camiões
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Box textAlign="center">
                      <Typography
                        variant="h3"
                        color="secondary.main"
                        sx={{ fontSize: { xs: "1.75rem", sm: "2.5rem" } }}
                      >
                        {transportadora.capacidadeTotal.totalMotoristas}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        Motoristas
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Divider sx={{ my: 1 }} />
                    <Box textAlign="center">
                      <Typography
                        variant="h4"
                        color="success.main"
                        sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                      >
                        {transportadora.capacidadeTotal.tonelagemMaxima?.toLocaleString()}{" "}
                        t
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        Tonelagem Máxima
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  Capacidade não disponível
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Seção 4: Serviços Oferecidos */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                <CheckCircleIcon sx={{ mr: 1, fontSize: { xs: 18, sm: 20 } }} />{" "}
                Serviços Oferecidos
              </Typography>

              {transportadora.tipoServicos &&
              transportadora.tipoServicos.length > 0 ? (
                <Stack spacing={1}>
                  {transportadora.tipoServicos.map((servico, index) => {
                    let color: "success" | "warning" | "info" | "primary" =
                      "primary";
                    let icon: React.ReactNode;

                    switch (servico.toLowerCase()) {
                      case "chante":
                        color = "success";
                        icon = <LocalShippingIcon />;
                        break;
                      case "nacional":
                        color = "warning";
                        icon = <MapIcon />;
                        break;
                      case "transito":
                        color = "info";
                        icon = <PublicIcon />;
                        break;
                      default:
                        icon = <CheckIcon />;
                    }

                    return (
                      <Chip
                        key={index}
                        label={
                          servico.charAt(0).toUpperCase() + servico.slice(1)
                        }
                        color={color}
                        icon={icon}
                        variant="outlined"
                        size="small"
                      />
                    );
                  })}
                </Stack>
              ) : (
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  Nenhum serviço especificado
                </Typography>
              )}

              {/* Avaliação */}
              {transportadora.avaliacaoGeral !== undefined && (
                <Box sx={{ mt: 3 }}>
                  <Divider sx={{ mb: 2 }} />
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    gutterBottom
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    Avaliação Geral
                  </Typography>
                  <RatingDisplay rating={transportadora.avaliacaoGeral} />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Seção 5: Informações Adicionais */}
        <Grid size={{ xs: 12 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
              >
                Informações Adicionais
              </Typography>

              <Grid container spacing={{ xs: 1.5, sm: 3 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    Data de Criação
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    {transportadora.dataCriacao
                      ? new Date(transportadora.dataCriacao).toLocaleDateString(
                          "pt-MZ"
                        )
                      : "N/A"}
                  </Typography>
                </Grid>

                {transportadora.qualificadaTransito !== undefined && (
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Qualificada para Trânsito
                    </Typography>
                    <Chip
                      label={transportadora.qualificadaTransito ? "Sim" : "Não"}
                      color={
                        transportadora.qualificadaTransito ? "success" : "error"
                      }
                      icon={
                        transportadora.qualificadaTransito ? (
                          <CheckIcon />
                        ) : (
                          <CloseIcon />
                        )
                      }
                      size="small"
                    />
                  </Grid>
                )}

                {transportadora.observacoes && (
                  <Grid size={{ xs: 12 }}>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Observações
                    </Typography>
                    <Paper
                      variant="outlined"
                      sx={{ p: 2, mt: 1, bgcolor: "background.default" }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                      >
                        {transportadora.observacoes}
                      </Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Mostrar aviso se for a transportadora do motorista atual */}
        {motoristaAtual?.empresaMotorista === transportadora?.nomeEmpresa && (
          <Grid size={{ xs: 12 }}>
            <Alert severity="success" sx={{ mb: 2 }}>
              <Box display="flex" alignItems="center">
                <CheckIcon sx={{ mr: 1 }} />
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  Esta é a transportadora vinculada ao motorista atual:{" "}
                  <strong>{motoristaAtual?.nomeCompleto}</strong>
                </Typography>
              </Box>
            </Alert>
          </Grid>
        )}

        {/* Seção 6: Motoristas Associados */}
        {transportadora.motoristasIds &&
          transportadora.motoristasIds.length > 0 && (
            <Grid size={{ xs: 12 }}>
              <Card>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                    }}
                  >
                    <PeopleIcon sx={{ mr: 1, fontSize: { xs: 18, sm: 20 } }} />{" "}
                    Motoristas Associados
                  </Typography>

                  <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    Total de motoristas:{" "}
                    <strong>{transportadora.motoristasIds.length}</strong>
                  </Typography>

                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}
                  >
                    {transportadora.motoristasIds
                      .slice(0, 15)
                      .map((id, index) => (
                        <Chip
                          key={index}
                          label={`ID: ${String(id)}`}
                          size="small"
                          variant="outlined"
                          onClick={() =>
                            onMotoristaClick && onMotoristaClick(String(id))
                          }
                          sx={{
                            cursor: onMotoristaClick ? "pointer" : "default",
                          }}
                        />
                      ))}
                    {transportadora.motoristasIds.length > 15 && (
                      <Chip
                        label={`+${
                          transportadora.motoristasIds.length - 15
                        } mais`}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
      </Grid>
    </InfoCard>
  );
};

// ==================== COMPONENTE DE LISTA DE TRANSPORTADORAS ====================
interface TransportadorasListaProps {
  transportadoras: TransportadoraData[];
  onSelectTransportadora: (transportadora: TransportadoraData) => void;
  loading?: boolean;
}

const TransportadorasLista: React.FC<TransportadorasListaProps> = ({
  transportadoras,
  onSelectTransportadora,
  loading = false,
}) => {
  if (transportadoras.length === 0) {
    return <Alert severity="info">Nenhuma transportadora encontrada.</Alert>;
  }

  return (
    <Grid container spacing={{ xs: 1.5, sm: 2 }}>
      {transportadoras.map((transportadora, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 6 }} key={index}>
          <Card
            sx={{
              height: "100%",
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 3,
              },
            }}
            onClick={() => onSelectTransportadora(transportadora)}
          >
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  sx={{
                    bgcolor: "secondary.main",
                    mr: 2,
                    width: { xs: 36, sm: 40 },
                    height: { xs: 36, sm: 40 },
                  }}
                >
                  <TruckIcon fontSize="small" />
                </Avatar>
                <Box sx={{ overflow: "hidden" }}>
                  <Typography
                    variant="h6"
                    noWrap
                    sx={{ fontSize: { xs: "1rem", sm: "1.125rem" } }}
                  >
                    {transportadora.nomeEmpresa}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    ID: {transportadora.transportadoraId}
                  </Typography>
                </Box>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                mb={2}
                flexWrap="wrap"
                gap={1}
              >
                <StatusChip status={transportadora.status} />
                <Box sx={{ ml: { xs: "auto", sm: "auto" } }}>
                  <RatingDisplay rating={transportadora.avaliacaoGeral} />
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={1}>
                <Grid size={{ xs: 6 }}>
                  <Box display="flex" alignItems="center">
                    <TruckIcon
                      fontSize="small"
                      sx={{
                        mr: 1,
                        color: "text.secondary",
                        fontSize: { xs: 14, sm: 16 },
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      {transportadora.capacidadeTotal?.totalCamioes || 0}{" "}
                      camiões
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Box display="flex" alignItems="center">
                    <PeopleIcon
                      fontSize="small"
                      sx={{
                        mr: 1,
                        color: "text.secondary",
                        fontSize: { xs: 14, sm: 16 },
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      {transportadora.capacidadeTotal?.totalMotoristas || 0}{" "}
                      motoristas
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {transportadora.tipoServicos &&
                transportadora.tipoServicos.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      display="block"
                      sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                    >
                      Serviços:
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        mt: 0.5,
                      }}
                    >
                      {transportadora.tipoServicos
                        .slice(0, 2)
                        .map((servico, idx) => (
                          <Chip
                            key={idx}
                            label={servico}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      {transportadora.tipoServicos.length > 2 && (
                        <Chip
                          label={`+${transportadora.tipoServicos.length - 2}`}
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </Box>
                )}

              <Box sx={{ mt: 2, textAlign: "right" }}>
                <Button size="small" endIcon={<ArrowIcon />}>
                  Ver detalhes
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

// ==================== COMPONENTE DO CAMIÃO ====================
interface CamiaoInfoProps {
  veiculo?: VeiculoHabilitado;
  onRefresh?: () => void;
  loading?: boolean;
}

const CamiaoInfo: React.FC<CamiaoInfoProps> = ({
  veiculo,
  onRefresh,
  loading = false,
}) => {
  if (!veiculo) return null;

  const getViabilidadeColor = (pode: boolean) => (pode ? "success" : "error");
  const getViabilidadeIcon = (pode: boolean) =>
    pode ? <CheckIcon /> : <CloseIcon />;

  return (
    <InfoCard
      title="Camião Vinculado"
      icon={
        <TruckIcon sx={{ color: "info.main", fontSize: { xs: 20, sm: 24 } }} />
      }
      onRefresh={onRefresh}
      refreshDisabled={loading}
    >
      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <TruckIcon
              sx={{
                mr: 2,
                color: "primary.main",
                fontSize: { xs: 30, sm: 40 },
              }}
            />
            <Box>
              <Typography
                variant="h6"
                sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
              >
                {veiculo.marca} {veiculo.modelo}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              >
                Matrícula: <strong>{veiculo.matricula}</strong>
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            Tipo
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {veiculo.tipo}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            Categoria de Inspeção
          </Typography>
          <Chip
            label={veiculo.nivelInspecao.categoria}
            color="primary"
            size="small"
            sx={{ mt: 0.5 }}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            Status de Viabilidade
          </Typography>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box display="flex" alignItems="center">
                <Chip
                  icon={getViabilidadeIcon(veiculo.viabilidade.podeChante)}
                  label="Chanté"
                  color={getViabilidadeColor(veiculo.viabilidade.podeChante)}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box display="flex" alignItems="center">
                <Chip
                  icon={getViabilidadeIcon(veiculo.viabilidade.podeNacional)}
                  label="Nacional"
                  color={getViabilidadeColor(veiculo.viabilidade.podeNacional)}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box display="flex" alignItems="center">
                <Chip
                  icon={getViabilidadeIcon(veiculo.viabilidade.podeTransito)}
                  label="Trânsito"
                  color={getViabilidadeColor(veiculo.viabilidade.podeTransito)}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            Inspeção Técnica
          </Typography>
          <Card variant="outlined" sx={{ mt: 1 }}>
            <CardContent>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    Última Inspeção
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    {new Date(
                      veiculo.nivelInspecao.dataUltimaInspecao
                    ).toLocaleDateString("pt-MZ")}
                  </Typography>
                  <Chip
                    label={veiculo.nivelInspecao.resultadoUltimaInspecao}
                    color={
                      veiculo.nivelInspecao.resultadoUltimaInspecao ===
                      "aprovado"
                        ? "success"
                        : "error"
                    }
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    Próxima Inspeção
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    {new Date(
                      veiculo.nivelInspecao.dataProximaInspecao
                    ).toLocaleDateString("pt-MZ")}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                  >
                    Centro: {veiculo.nivelInspecao.centroInspecao}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            Descrição da Inspeção
          </Typography>
          <Typography
            variant="body2"
            sx={{ mt: 1, fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {veiculo.nivelInspecao.descricao}
          </Typography>
        </Grid>
      </Grid>
    </InfoCard>
  );
};

// ==================== COMPONENTE DE AVALIAÇÃO DETALHADA ====================
interface AvaliacaoDetalhadaProps {
  avaliacoes?: {
    seguranca?: number;
    cumprimentoRota?: number;
    pontualidade?: number;
    comunicacao?: number;
    economiaCombustivel?: number;
    cuidadoVeiculo?: number;
    documentacao?: number;
  };
}

const AvaliacaoDetalhada: React.FC<AvaliacaoDetalhadaProps> = ({
  avaliacoes,
}) => {
  if (!avaliacoes) return null;

  const avaliacoesArray = [
    {
      label: "Segurança",
      valor: avaliacoes.seguranca || 0,
      icon: <SecurityIcon />,
    },
    {
      label: "Cumprimento de Rota",
      valor: avaliacoes.cumprimentoRota || 0,
      icon: <MapIcon />,
    },
    {
      label: "Pontualidade",
      valor: avaliacoes.pontualidade || 0,
      icon: <TimeIcon />,
    },
    {
      label: "Comunicação",
      valor: avaliacoes.comunicacao || 0,
      icon: <PhoneIcon />,
    },
    {
      label: "Economia de Combustível",
      valor: avaliacoes.economiaCombustivel || 0,
      icon: <LocalGasStationIcon />,
    },
    {
      label: "Cuidado com Veículo",
      valor: avaliacoes.cuidadoVeiculo || 0,
      icon: <BuildIcon />,
    },
    {
      label: "Documentação",
      valor: avaliacoes.documentacao || 0,
      icon: <DocumentIcon />,
    },
  ];

  const media =
    avaliacoesArray.reduce((acc, item) => acc + item.valor, 0) /
    avaliacoesArray.length;

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
        >
          Avaliação Detalhada
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          gutterBottom
          sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
        >
          Média geral: <strong>{media.toFixed(1)}/5</strong>
        </Typography>

        <Grid container spacing={1.5}>
          {avaliacoesArray.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <Box display="flex" alignItems="center" mb={1}>
                <Box
                  sx={{
                    mr: 1,
                    color: "primary.main",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  variant="body2"
                  sx={{ flexGrow: 1, fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight="medium"
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  {item.valor.toFixed(1)}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(item.valor / 5) * 100}
                sx={{
                  height: 6,
                  borderRadius: 4,
                  backgroundColor: "grey.200",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor:
                      item.valor >= 4
                        ? "success.main"
                        : item.valor >= 2.5
                        ? "warning.main"
                        : "error.main",
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

// ==================== COMPONENTE DE LIMITES DE JORNADA ====================
interface LimitesJornadaProps {
  limites?: {
    horasMaxDia?: number;
    horasMaxSemana?: number;
    horasMaxMensal?: number;
  };
}

const LimitesJornada: React.FC<LimitesJornadaProps> = ({ limites }) => {
  if (!limites) return null;

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
        >
          Limites de Jornada
        </Typography>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box textAlign="center">
              <Typography
                variant="h4"
                color="primary.main"
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
              >
                {limites.horasMaxDia}h
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                Máximo por Dia
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box textAlign="center">
              <Typography
                variant="h4"
                color="primary.main"
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
              >
                {limites.horasMaxSemana}h
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                Máximo por Semana
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box textAlign="center">
              <Typography
                variant="h4"
                color="primary.main"
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
              >
                {limites.horasMaxMensal}h
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                Máximo por Mês
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography
            variant="body2"
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            Estes limites estão de acordo com a legislação de Moçambique para
            motoristas profissionais.
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
};

// ==================== COMPONENTE DE CONTATO DE EMERGÊNCIA ====================
interface ContatoEmergenciaProps {
  emergencia?: {
    nome?: string;
    parentesco?: string;
    telefone?: string;
  };
}

const ContatoEmergencia: React.FC<ContatoEmergenciaProps> = ({
  emergencia,
}) => {
  if (!emergencia) return null;

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
        >
          Contato de Emergência
        </Typography>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box display="flex" alignItems="center">
              <PersonIcon
                sx={{
                  mr: 1,
                  color: "error.main",
                  fontSize: { xs: 18, sm: 20 },
                }}
              />
              <Box>
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  {emergencia.nome}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  {emergencia.parentesco}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box display="flex" alignItems="center">
              <PhoneIcon
                sx={{
                  mr: 1,
                  color: "error.main",
                  fontSize: { xs: 18, sm: 20 },
                }}
              />
              <Typography
                variant="body1"
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              >
                {emergencia.telefone}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

interface InfoCardProps {
  title: string;
  icon: React.ReactElement;
  children: React.ReactNode;
  onRefresh?: () => void;
  refreshDisabled?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  icon,
  children,
  onRefresh,
  refreshDisabled = false,
}) => (
  <Card sx={{ mb: 3 }}>
    <CardContent>
      <Box display="flex" alignItems="center" mb={2}>
        <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>{icon}</Box>
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
        >
          {title}
        </Typography>
        {onRefresh && (
          <IconButton
            sx={{ ml: "auto" }}
            onClick={onRefresh}
            disabled={refreshDisabled}
            aria-label={`Atualizar ${title}`}
            size="small"
          >
            <RefreshIcon />
          </IconButton>
        )}
      </Box>
      {children}
    </CardContent>
  </Card>
);
const StatusChip: React.FC<{ status?: string }> = ({ status }) => {
  const statusText = STATUS_MAP[status || ""] || status || "";
  const color = STATUS_COLOR_MAP[status || ""] || "default";

  return status ? <Chip label={statusText} color={color} size="small" /> : null;
};

const RatingDisplay: React.FC<{ rating?: number }> = ({ rating }) => {
  if (!rating) return null;

  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <Box display="flex" alignItems="center">
      <Typography
        variant="body1"
        sx={{ mr: 1, fontSize: { xs: "0.875rem", sm: "1rem" } }}
      >
        {rating.toFixed(1)}
      </Typography>
      <Box sx={{ color: "warning.main" }}>
        {"★".repeat(fullStars)}
        {"☆".repeat(emptyStars)}
      </Box>
    </Box>
  );
};

// ==================== COMPONENTES ADICIONAIS ====================

// Componente de Card de Empresa para listagem
const EmpresaCard: React.FC<{
  empresa: EmpresaData;
  onSelect: (codigo: string) => void;
}> = ({ empresa, onSelect }) => {
  const contatoPrincipal = empresa.contatoPrincipal || empresa.contatos?.[0];

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardActionArea
        onClick={() => empresa.codigo && onSelect(empresa.codigo)}
      >
        <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
          <Grid container spacing={1.5} alignItems="center">
            <Grid size={{ xs: 3, sm: 2 }}>
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: { xs: 32, sm: 40 },
                  height: { xs: 32, sm: 40 },
                }}
              >
                <BusinessIcon fontSize="small" />
              </Avatar>
            </Grid>
            <Grid size={{ xs: 9, sm: 7 }}>
              <Typography
                variant="subtitle1"
                fontWeight="medium"
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              >
                {empresa.nome || empresa.nomeEmpresa}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                Código: {empresa.codigo} | Segmento: {empresa.segmento}
              </Typography>
              {contatoPrincipal && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  Contato: {contatoPrincipal.nome} • {contatoPrincipal.telefone}
                </Typography>
              )}
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }} sx={{ mt: { xs: 1, sm: 0 } }}>
              <Box
                display="flex"
                justifyContent={{ xs: "flex-start", sm: "flex-end" }}
              >
                <StatusChip status={empresa.status} />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

// Componente de Card de Transportadora para listagem
const TransportadoraCard: React.FC<{
  transportadora: TransportadoraData;
  onSelect: (transportadoraId: string) => void;
}> = ({ transportadora, onSelect }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardActionArea
        onClick={() =>
          transportadora.transportadoraId &&
          onSelect(transportadora.transportadoraId)
        }
      >
        <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
          <Grid container spacing={1.5} alignItems="center">
            <Grid size={{ xs: 3, sm: 2 }}>
              <Avatar
                sx={{
                  bgcolor: "secondary.main",
                  width: { xs: 32, sm: 40 },
                  height: { xs: 32, sm: 40 },
                }}
              >
                <TruckIcon fontSize="small" />
              </Avatar>
            </Grid>
            <Grid size={{ xs: 9, sm: 7 }}>
              <Typography
                variant="subtitle1"
                fontWeight="medium"
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              >
                {transportadora.nome || transportadora.nomeEmpresa}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                NIF: {transportadora.nif} | Telefone: {transportadora.telefone}
              </Typography>
              <Box display="flex" alignItems="center" mt={0.5}>
                <StarIcon
                  fontSize="small"
                  sx={{
                    color: "warning.main",
                    mr: 0.5,
                    fontSize: { xs: 14, sm: 16 },
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  {transportadora.avaliacao?.toFixed(1) || "N/A"} •{" "}
                  {transportadora.totalCamioes || 0} camiões
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }} sx={{ mt: { xs: 1, sm: 0 } }}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems={{ xs: "flex-start", sm: "flex-end" }}
              >
                <StatusChip status={transportadora.status} />
                {transportadora.qualificadaTransito && (
                  <Chip
                    label="Qualificada"
                    color="success"
                    size="small"
                    sx={{ mt: 1 }}
                    icon={<CheckCircleIcon fontSize="small" />}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

// Componente de Card de Carga para listagem
const CargaCard: React.FC<{
  carga: CargaData;
  onSelect: (codigo: string) => void;
  onCalculate?: (codigo: string) => void;
}> = ({ carga, onSelect, onCalculate }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 10 }}>
            <Typography
              variant="subtitle1"
              fontWeight="medium"
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              {carga.codigo} - {carga.descricao?.substring(0, 40)}...
            </Typography>
            <Grid container spacing={1.5} sx={{ mt: 1 }}>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box display="flex" alignItems="center">
                  <LocationIcon
                    fontSize="small"
                    sx={{
                      mr: 1,
                      color: "text.secondary",
                      fontSize: { xs: 14, sm: 16 },
                    }}
                  />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    {typeof carga.origem === "string"
                      ? carga.origem
                      : carga.origem?.cidade}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box display="flex" alignItems="center">
                  <ArrowIcon
                    fontSize="small"
                    sx={{
                      mr: 1,
                      color: "text.secondary",
                      fontSize: { xs: 14, sm: 16 },
                    }}
                  />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    {typeof carga.destino === "string"
                      ? carga.destino
                      : carga.destino?.cidade}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box display="flex" alignItems="center">
                  <WeightIcon
                    fontSize="small"
                    sx={{
                      mr: 1,
                      color: "text.secondary",
                      fontSize: { xs: 14, sm: 16 },
                    }}
                  />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    {carga.pesoBruto?.toLocaleString()} kg
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box display="flex" alignItems="center">
                  <MoneyIcon2
                    fontSize="small"
                    sx={{
                      mr: 1,
                      color: "text.secondary",
                      fontSize: { xs: 14, sm: 16 },
                    }}
                  />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    ${carga.valorMercadoria?.toLocaleString()}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems={{ xs: "flex-start", sm: "flex-end" }}
              height="100%"
            >
              <StatusChip status={carga.status} />
              <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Button
                  size="small"
                  startIcon={<ViewIcon />}
                  onClick={() => carga.codigo && onSelect(carga.codigo)}
                >
                  Ver
                </Button>
                {onCalculate && carga.codigo && (
                  <Button
                    size="small"
                    startIcon={<MoneyIcon />}
                    onClick={() => onCalculate(carga.codigo!)}
                    variant="outlined"
                  >
                    Calcular
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

// Modal de Detalhes Completo
const DetalhesCompletosModal: React.FC<{
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ open, onClose, title, children }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
          >
            {title}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions sx={{ px: 2, py: 1 }}>
        <Button onClick={onClose} startIcon={<CloseIcon />} size="small">
          Fechar
        </Button>
        <Button variant="contained" startIcon={<PrintIcon />} size="small">
          Imprimir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ==================== HOOKS PERSONALIZADOS ====================
const useApi = () => {
  const apiCall = useCallback(
    async <T = any,>(
      endpoint: string,
      method: string = "POST",
      data: any = {}
    ): Promise<T> => {
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: method !== "GET" ? JSON.stringify(data) : null,
        });

        const result: ApiResponse = await response.json();

        // Se houver erro, loga mas não lança exceção
        if (result.returnCode >= 400) {
          console.warn(`API Error (${endpoint}):`, result.returnMsg);
          // Retorna o resultado mesmo com erro para tratamento no componente
          return result as T;
        }

        return result.data || result;
      } catch (err: any) {
        console.error(`API Fetch Error (${endpoint}):`, err);
        // Retorna objeto de erro estruturado
        return {
          returnCode: 500,
          returnMsg: err.message || "Erro de conexão",
          data: null,
        } as T;
      }
    },
    []
  );

  return { apiCall };
};

// Hook normal - use APENAS no VerificacaoContent
const useMotoristaId = () => {
  const searchParams = useSearchParams(); // ✅ Ok aqui dentro do Client Component
  
  return useMemo(() => {
    // Primeiro, tentar da query string
    const queryId = searchParams?.get("motoristaId") || searchParams?.get("id");
    if (queryId) return queryId;

    // Fallback: tentar extrair do pathname
    if (typeof window === "undefined") return null;

    const pathname = window.location.pathname;
    const pathParts = pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];

    if (
      lastPart &&
      /^[a-zA-Z0-9-_]+$/.test(lastPart) &&
      !lastPart.includes(".")
    ) {
      const commonRoutes = [
        "verificacao",
        "dashboard",
        "login",
        "register",
        "home",
      ];
      if (!commonRoutes.includes(lastPart.toLowerCase())) {
        return lastPart;
      }
    }

    return null;
  }, [searchParams]);
};

// Modifique o StatusVinculacao para lidar com transportadoras vazias:
const StatusVinculacao: React.FC<{
  motorista: MotoristaData | null;
  transportadoras: TransportadoraData[];
  onNavigate?: (tab: number) => void;
}> = ({ motorista, transportadoras, onNavigate }) => {
  // Adicione uma verificação adicional
  if (!transportadoras || transportadoras.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
        >
          Carregando informações de transportadoras...
        </Typography>
      </Alert>
    );
  }

  if (!motorista?.empresaMotorista) {
    return (
      <Alert severity="warning" sx={{ mt: 2 }}>
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
        >
          Este motorista não está vinculado a nenhuma transportadora.
          {onNavigate && (
            <Button size="small" sx={{ ml: 1 }} onClick={() => onNavigate(3)}>
              Vincular agora
            </Button>
          )}
        </Typography>
      </Alert>
    );
  }

  const transportadoraVinculada = transportadoras.find(
    (t) =>
      t.nomeEmpresa?.toLowerCase() === motorista.empresaMotorista?.toLowerCase()
  );

  return (
    <Alert
      severity={transportadoraVinculada ? "success" : "warning"}
      sx={{ mt: 2 }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
        >
          <strong>Transportadora vinculada:</strong>{" "}
          {motorista.empresaMotorista}
          {!transportadoraVinculada && " (Não encontrada no sistema)"}
        </Typography>
        {transportadoraVinculada && (
          <Chip
            label="Vinculado"
            color="success"
            size="small"
            icon={<CheckIcon />}
            sx={{ mt: { xs: 1, sm: 0 } }}
          />
        )}
      </Box>
    </Alert>
  );
};

// ==================== COMPONENTES DE INFORMAÇÃO ====================
interface EmpresaInfoProps {
  empresa?: EmpresaData | null;
  onRefresh?: () => void;
  loading?: boolean;
  onMotoristaClick?: (motoristaId: string) => void;
}

const EmpresaInfo: React.FC<EmpresaInfoProps> = ({
  empresa,
  onRefresh,
  loading = false,
  onMotoristaClick, // NOVA PROP
}) => {
  if (!empresa) return null;

  const contatoPrincipal = empresa.contatoPrincipal || empresa.contatos?.[0];

  return (
    <InfoCard
      title={`${empresa.categoria || "Empresa"} - ${empresa.nome}`}
      icon={
        empresa.categoria === "Gestor" ? (
          <CorporateIcon
            sx={{ color: "primary.main", fontSize: { xs: 20, sm: 24 } }}
          />
        ) : (
          <BusinessIcon
            sx={{ color: "primary.main", fontSize: { xs: 20, sm: 24 } }}
          />
        )
      }
      onRefresh={onRefresh}
      refreshDisabled={loading}
    >
      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            Nome
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {empresa.nome}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            Código
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {empresa.codigo}
          </Typography>
        </Grid>

        {empresa.categoria && (
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            >
              Categoria
            </Typography>
            <Chip
              label={empresa.categoria}
              color={
                empresa.categoria === "Gestor"
                  ? "primary"
                  : empresa.categoria === "Cliente"
                  ? "success"
                  : "default"
              }
              size="small"
            />
          </Grid>
        )}

        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            NUIT
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {empresa.nuit}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            Segmento
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {empresa.segmento}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            Status
          </Typography>
          <StatusChip status={empresa.status} />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            Classificação
          </Typography>
          <Chip label={empresa.classificacao} color="primary" size="small" />
        </Grid>

        {contatoPrincipal && (
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            >
              Contato Principal
            </Typography>
            <Box>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              >
                <strong>Nome:</strong> {contatoPrincipal.nome}
              </Typography>
              {contatoPrincipal.cargo && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  gutterBottom
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  <strong>Cargo:</strong> {contatoPrincipal.cargo}
                </Typography>
              )}
              {contatoPrincipal.telefone && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  gutterBottom
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  <strong>Telefone:</strong> {contatoPrincipal.telefone}
                </Typography>
              )}
              {contatoPrincipal.email && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  <strong>Email:</strong> {contatoPrincipal.email}
                </Typography>
              )}
            </Box>
          </Grid>
        )}

        {empresa.motoristasIds && empresa.motoristasIds.length > 0 && (
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            >
              Motoristas Associados ({empresa.motoristasIds.length})
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {empresa.motoristasIds.slice(0, 5).map((id, index) => (
                <Chip
                  key={index}
                  label={`ID: ${String(id)}`}
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    const motoristaId = String(id);
                    if (onMotoristaClick) {
                      onMotoristaClick(motoristaId); // Usar a função passada via prop
                    }
                  }}
                  sx={{ cursor: onMotoristaClick ? "pointer" : "default" }}
                />
              ))}
              {empresa.motoristasIds.length > 5 && (
                <Chip
                  label={`+${empresa.motoristasIds.length - 5} mais`}
                  size="small"
                  variant="outlined"
                />
              )}
            </Box>
          </Grid>
        )}
      </Grid>
    </InfoCard>
  );
};

interface TransportadoraInfoProps {
  transportadora?: TransportadoraData | null;
  onRefresh?: () => void;
  loading?: boolean;
}

const TransportadoraInfo: React.FC<TransportadoraInfoProps> = ({
  transportadora,
  onRefresh,
  loading = false,
}) => {
  if (!transportadora) return null;

  return (
    <InfoCard
      title="Informações da Transportadora"
      icon={
        <TransportIcon
          sx={{ color: "secondary.main", fontSize: { xs: 20, sm: 24 } }}
        />
      }
      onRefresh={onRefresh}
      refreshDisabled={loading}
    >
      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            Nome
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {transportadora.nome}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            NIF
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {transportadora.nif}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Box display="flex" alignItems="center">
            <PhoneIcon
              fontSize="small"
              sx={{
                mr: 1,
                color: "text.secondary",
                fontSize: { xs: 14, sm: 16 },
              }}
            />
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              {transportadora.telefone}
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Box display="flex" alignItems="center">
            <EmailIcon
              fontSize="small"
              sx={{
                mr: 1,
                color: "text.secondary",
                fontSize: { xs: 14, sm: 16 },
              }}
            />
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              {transportadora.email}
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            Status
          </Typography>
          <StatusChip status={transportadora.status} />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            Avaliação
          </Typography>
          <RatingDisplay rating={transportadora.avaliacao} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            Frota de Camiões
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {transportadora.totalCamioes} camiões
          </Typography>
        </Grid>
      </Grid>
    </InfoCard>
  );
};

interface CargaInfoProps {
  carga?: CargaData | null;
  onRefresh?: () => void;
  onCalculate?: () => void;
  loading?: boolean;
}

const CargaInfo: React.FC<CargaInfoProps> = ({
  carga,
  onRefresh,
  onCalculate,
  loading = false,
}) => {
  if (!carga) return null;

  return (
    <InfoCard
      title="Informações da Carga"
      icon={
        <CargoIcon sx={{ color: "info.main", fontSize: { xs: 20, sm: 24 } }} />
      }
      onRefresh={onRefresh}
      refreshDisabled={loading}
    >
      <Box sx={{ mb: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={1}
        >
          {onCalculate && (
            <Button
              startIcon={<MoneyIcon />}
              onClick={onCalculate}
              disabled={loading}
              variant="outlined"
              size="small"
            >
              Calcular Custos
            </Button>
          )}
        </Box>
      </Box>

      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            Código
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {carga.codigo}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            Status
          </Typography>
          <StatusChip status={carga.status} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            Descrição
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {carga.descricao}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            Peso
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {carga.pesoBruto?.toLocaleString()} kg
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            Valor
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            ${carga.valorMercadoria?.toLocaleString()}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Box display="flex" alignItems="center">
            <LocationIcon
              fontSize="small"
              sx={{
                mr: 1,
                color: "text.secondary",
                fontSize: { xs: 14, sm: 16 },
              }}
            />
            <Box>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                Origem
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              >
                {typeof carga.origem === "string"
                  ? carga.origem
                  : carga.origem?.cidade}
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Box display="flex" alignItems="center">
            <LocationIcon
              fontSize="small"
              sx={{
                mr: 1,
                color: "text.secondary",
                fontSize: { xs: 14, sm: 16 },
              }}
            />
            <Box>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                Destino
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              >
                {typeof carga.destino === "string"
                  ? carga.destino
                  : carga.destino?.cidade}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {carga.cliente && (
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            >
              Cliente
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              {carga.cliente}
            </Typography>
          </Grid>
        )}

        {carga.categoriaSeguro && (
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            >
              Categoria de Seguro
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              {carga.categoriaSeguro}
            </Typography>
          </Grid>
        )}

        {carga.abrangenciaSeguro && (
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            >
              Abrangência
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              {carga.abrangenciaSeguro}
            </Typography>
          </Grid>
        )}
      </Grid>
    </InfoCard>
  );
};

interface MotoristaInfoProps {
  motorista?: MotoristaData | null;
  onRefresh?: () => void;
  loading?: boolean;
  filteredTransportadoras?: TransportadoraData[];
  onViewTransportadora?: () => void;
  camioes?: CamiaoData[];
  onViewCamioes?: () => void;
}

const MotoristaInfo: React.FC<MotoristaInfoProps> = ({
  motorista,
  onRefresh,
  loading = false,
  filteredTransportadoras = [],
  onViewTransportadora,
  camioes = [],
  onViewCamioes,
}) => {
  if (!motorista) return null;

  const cartaConducao =
    typeof motorista.cartaConducao === "string"
      ? { numero: motorista.cartaConducao }
      : motorista.cartaConducaoDetalhes || motorista.cartaConducao;

  const idade = motorista.dataNascimento
    ? new Date().getFullYear() -
      new Date(motorista.dataNascimento).getFullYear()
    : null;

  const tempoEmpresa = motorista.dataAdmissao
    ? Math.floor(
        (new Date().getTime() - new Date(motorista.dataAdmissao).getTime()) /
          (1000 * 60 * 60 * 24 * 365)
      )
    : null;

  return (
    <>
      <InfoCard
        title="Perfil do Motorista"
        icon={
          <DriverIcon
            sx={{ color: "success.main", fontSize: { xs: 20, sm: 24 } }}
          />
        }
        onRefresh={onRefresh}
        refreshDisabled={loading}
      >
        <Grid container spacing={{ xs: 1.5, sm: 3 }}>
          {/* Foto e Informações Básicas */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                src={motorista.foto}
                sx={{
                  width: { xs: 100, sm: 120, md: 150 },
                  height: { xs: 100, sm: 120, md: 150 },
                  border: "4px solid",
                  borderColor: "success.light",
                  mb: 2,
                  bgcolor: motorista.foto ? "transparent" : "success.main",
                }}
              >
                {!motorista.foto && motorista.nomeCompleto?.charAt(0)}
              </Avatar>

              <Typography
                variant="h5"
                align="center"
                gutterBottom
                sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
              >
                {motorista.nomeCompleto}
              </Typography>

              <Typography
                variant="body1"
                color="textSecondary"
                align="center"
                gutterBottom
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              >
                {motorista.cargo}
              </Typography>

              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt={2}
              >
                <RatingDisplay rating={motorista.avaliacao} />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  {motorista.totalViagensRealizadas || 0} viagens realizadas
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Informações Detalhadas */}
          <Grid size={{ xs: 12, sm: 8 }}>
            <Grid container spacing={1.5}>
              {/* Linha 1: Informações Pessoais */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  ID do Motorista
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  {motorista.motoristaId}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  Status Contratual
                </Typography>
                <StatusChip
                  status={motorista.statusContratual || motorista.status}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  Data de Nascimento
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  {motorista.dataNascimento
                    ? `${new Date(motorista.dataNascimento).toLocaleDateString(
                        "pt-MZ"
                      )} (${idade} anos)`
                    : "N/A"}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  Nacionalidade
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  {motorista.nacionalidade || "N/A"}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  Número do BI
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  {motorista.numeroBI || "N/A"}
                  {motorista.validadeBI && (
                    <Typography
                      variant="caption"
                      display="block"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                    >
                      Válido até:{" "}
                      {new Date(motorista.validadeBI).toLocaleDateString(
                        "pt-MZ"
                      )}
                    </Typography>
                  )}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  NUIT
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  {motorista.nuit || "N/A"}
                </Typography>
              </Grid>

              {/* Linha 2: Contatos */}
              <Grid size={{ xs: 12 }}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  Contatos
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
                  {motorista.contactos?.telefonePrincipal && (
                    <Box display="flex" alignItems="center">
                      <PhoneIcon
                        fontSize="small"
                        sx={{
                          mr: 1,
                          color: "text.secondary",
                          fontSize: { xs: 14, sm: 16 },
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                      >
                        {motorista.contactos.telefonePrincipal}
                      </Typography>
                    </Box>
                  )}
                  {motorista.contactos?.email && (
                    <Box display="flex" alignItems="center">
                      <EmailIcon
                        fontSize="small"
                        sx={{
                          mr: 1,
                          color: "text.secondary",
                          fontSize: { xs: 14, sm: 16 },
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                      >
                        {motorista.contactos.email}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>

              {/* Linha 3: Empresa */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  Empresa
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  {motorista.empresaMotorista}
                  {tempoEmpresa !== null && tempoEmpresa > 0 && (
                    <Typography
                      variant="caption"
                      display="block"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                    >
                      {tempoEmpresa} ano(s) na empresa
                    </Typography>
                  )}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  Data de Admissão
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  {motorista.dataAdmissao
                    ? new Date(motorista.dataAdmissao).toLocaleDateString(
                        "pt-MZ"
                      )
                    : "N/A"}
                </Typography>
              </Grid>

              {/* Linha 4: Carta de Condução */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  Carta de Condução
                </Typography>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    {cartaConducao?.numero}
                  </Typography>
                  {cartaConducao?.categoria && (
                    <Chip
                      label={cartaConducao.categoria}
                      color="success"
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                  )}
                  {cartaConducao?.validade && (
                    <Typography
                      variant="caption"
                      display="block"
                      color="textSecondary"
                      sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                    >
                      Válida até:{" "}
                      {new Date(cartaConducao.validade).toLocaleDateString(
                        "pt-MZ"
                      )}
                    </Typography>
                  )}
                </Box>
              </Grid>

              {/* Linha 5: Licença Profissional */}
              {motorista.licencaProfissional && (
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    Licença Profissional
                  </Typography>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {motorista.licencaProfissional.numero}
                    </Typography>
                    <Chip
                      label={motorista.licencaProfissional.categoria}
                      color="primary"
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                    {motorista.licencaProfissional.validade && (
                      <Typography
                        variant="caption"
                        display="block"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                      >
                        Válida até:{" "}
                        {new Date(
                          motorista.licencaProfissional.validade
                        ).toLocaleDateString("pt-MZ")}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              )}

              {/* Linha 6: Endereço */}
              {motorista.endereco && (
                <Grid size={{ xs: 12 }}>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    Endereço
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    {motorista.endereco.rua}, {motorista.endereco.numeroCasa}
                    <br />
                    {motorista.endereco.bairro}, {motorista.endereco.cidade}
                    <br />
                    {motorista.endereco.provincia}
                  </Typography>
                </Grid>
              )}

              {/* Linha 7: Estatísticas */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  Total KM Percorridos
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  {motorista.totalKmPercorridos?.toLocaleString() || 0} km
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  Índice de Acidentes
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  {motorista.indiceAcidentes || 0}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  Índice de Multas
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  {motorista.indiceMultas || 0}
                </Typography>
              </Grid>

              {/* Linha 8: Observações */}
              {motorista.observacoes && (
                <Grid size={{ xs: 12 }}>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    Observações
                  </Typography>
                  <Card variant="outlined" sx={{ mt: 1, p: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {motorista.observacoes}
                    </Typography>
                  </Card>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </InfoCard>

      {/* Componentes Adicionais */}
      {motorista.veiculosHabilitados &&
        motorista.veiculosHabilitados.length > 0 && (
          <CamiaoInfo
            veiculo={motorista.veiculosHabilitados[0]}
            onRefresh={onRefresh}
            loading={loading}
          />
        )}

      {camioes.length > 0 && (
        <CamioesResumo camioes={camioes} onViewAll={onViewCamioes} />
      )}

      {motorista.avaliacaoDetalhada && (
        <AvaliacaoDetalhada avaliacoes={motorista.avaliacaoDetalhada} />
      )}

      {motorista.limitesJornada && (
        <LimitesJornada limites={motorista.limitesJornada} />
      )}

      {motorista.contactos?.emergencia && (
        <ContatoEmergencia emergencia={motorista.contactos.emergencia} />
      )}

      {/* Informações do Transportador */}
      {motorista.infoTransportador && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              Informações do Transportador
            </Typography>
            <Grid container spacing={1.5}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  Total de Camiões
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  {motorista.infoTransportador.totalCamioes || 0}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  Qualificado para Trânsito
                </Typography>
                <Chip
                  label={
                    motorista.infoTransportador.qualificadoTransito
                      ? "Sim"
                      : "Não"
                  }
                  color={
                    motorista.infoTransportador.qualificadoTransito
                      ? "success"
                      : "error"
                  }
                  size="small"
                />
              </Grid>
              {motorista.infoTransportador.restricoes && (
                <Grid size={{ xs: 12 }}>
                  <Alert severity="warning" sx={{ mt: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {motorista.infoTransportador.restricoes.motivo}
                    </Typography>
                  </Alert>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      )}
      <StatusVinculacao
        motorista={motorista}
        transportadoras={filteredTransportadoras}
        onNavigate={(tab) => {
          // Esta função será passada do componente principal
          if (typeof window !== "undefined") {
            window.dispatchEvent(
              new CustomEvent("navigateToTab", {
                detail: { tab },
              })
            );
          }
        }}
      />

      {motorista?.empresaMotorista &&
        filteredTransportadoras &&
        filteredTransportadoras.length > 0 && (
          <Grid size={{ xs: 12 }}>
            <Alert
              severity="success"
              sx={{ mt: 2 }}
              action={
                onViewTransportadora && (
                  <Button
                    size="small"
                    color="inherit"
                    onClick={onViewTransportadora}
                  >
                    Ver Transportadora
                  </Button>
                )
              }
            >
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              >
                <strong>Vinculado à transportadora:</strong>{" "}
                {motorista.empresaMotorista}
                {motorista.empresaMotoristaId && (
                  <span> (ID: {motorista.empresaMotoristaId})</span>
                )}
              </Typography>
            </Alert>
          </Grid>
        )}
    </>
  );
};

interface FinanceiroInfoProps {
  viagem?: ViagemData | null;
}

const FinanceiroInfo: React.FC<FinanceiroInfoProps> = ({ viagem }) => {
  if (!viagem) return null;

  return (
    <InfoCard
      title="Informações Financeiras"
      icon={
        <MoneyIcon sx={{ color: "error.main", fontSize: { xs: 20, sm: 24 } }} />
      }
    >
      <List>
        {viagem.fretes && (
          <>
            <ListItem sx={{ px: { xs: 0, sm: 2 } }}>
              <ListItemText
                primary="Frete de Ida"
                secondary={`$${viagem.fretes.freteIda?.toLocaleString()}`}
                primaryTypographyProps={{
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
                secondaryTypographyProps={{
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              />
            </ListItem>
            <Divider />
            <ListItem sx={{ px: { xs: 0, sm: 2 } }}>
              <ListItemText
                primary="Frete de Volta"
                secondary={`$${viagem.fretes.freteVolta?.toLocaleString()}`}
                primaryTypographyProps={{
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
                secondaryTypographyProps={{
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              />
            </ListItem>
            <Divider />
          </>
        )}

        {viagem.comissao && (
          <>
            <ListItem sx={{ px: { xs: 0, sm: 2 } }}>
              <ListItemText
                primary="Comissão"
                secondary={`$${viagem.comissao?.toLocaleString()}`}
                primaryTypographyProps={{
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
                secondaryTypographyProps={{
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              />
            </ListItem>
            <Divider />
          </>
        )}

        {viagem.seguroCarga && (
          <ListItem sx={{ px: { xs: 0, sm: 2 } }}>
            <ListItemText
              primary="Seguro da Carga"
              secondary={`$${viagem.seguroCarga?.toLocaleString()}`}
              primaryTypographyProps={{
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
              secondaryTypographyProps={{
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            />
          </ListItem>
        )}

        {viagem.valorTotal && (
          <ListItem sx={{ px: { xs: 0, sm: 2 } }}>
            <ListItemText
              primary="Valor Total"
              secondary={`$${viagem.valorTotal?.toLocaleString()}`}
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
              secondaryTypographyProps={{
                fontWeight: "bold",
                color: "primary.main",
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            />
          </ListItem>
        )}
      </List>
    </InfoCard>
  );
};

interface ManualIdInputProps {
  motoristaId: string;
  setMotoristaId: (id: string) => void;
  onSearch: () => void;
  loading: boolean;
}

const ManualIdInput: React.FC<ManualIdInputProps> = ({
  motoristaId,
  setMotoristaId,
  onSearch,
  loading,
}) => (
  <Card sx={{ mb: 3 }}>
    <CardContent>
      <Box display="flex" alignItems="center" mb={2}>
        <InputIcon sx={{ mr: 2, color: "primary.main" }} />
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
        >
          Buscar Dados por ID do Motorista
        </Typography>
      </Box>

      <Grid container spacing={1.5} alignItems="center">
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            fullWidth
            label="ID do Motorista"
            value={motoristaId}
            onChange={(e) => setMotoristaId(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSearch()}
            placeholder="Digite o ID do motorista..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <QrCodeIcon />
                </InputAdornment>
              ),
            }}
            helperText="Exemplo: MTR12345, DRV67890 ou qualquer identificador único"
            size="small"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={onSearch}
            disabled={!motoristaId.trim() || loading}
            startIcon={<SearchIcon />}
            size="small"
          >
            Buscar Dados
          </Button>
        </Grid>
      </Grid>

      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ mt: 2, fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
      >
        <strong>Formato da URL esperado:</strong>{" "}
        sua-url.com/verificacao?motoristaId=SEU_ID
        <br />
        <strong>Exemplo:</strong>{" "}
        https://seusite.com/verificacao?motoristaId=MTR12345
      </Typography>
    </CardContent>
  </Card>
);

// ==================== COMPONENTE PRINCIPAL ====================
function VerificacaoContent() {
  const motoristaIdFromUrl = useMotoristaId();

  const [activeTab, setActiveTab] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [manualMotoristaId, setManualMotoristaId] = useState<string>("");
  // Na função VerificacaoContent, adicionar estados para modais e detalhes
  const [detalhesCompletosOpen, setDetalhesCompletosOpen] = useState(false);
  const [detalhesTitulo, setDetalhesTitulo] = useState("");
  const [detalhesConteudo, setDetalhesConteudo] =
    useState<React.ReactNode>(null);
  const [selectedEmpresa, setSelectedEmpresa] = useState<EmpresaData | null>(
    null
  );
  const [filteredTransportadoras, setFilteredTransportadoras] = useState<
    TransportadoraData[]
  >([]);
  const [selectedTransportadora, setSelectedTransportadora] =
    useState<TransportadoraData | null>(null);
  const [selectedCarga, setSelectedCarga] = useState<CargaData | null>(null);
  const [selectedCliente, setSelectedCliente] = useState<ClienteData | null>(
    null
  );

  // Estados para camiões
  const [camioesList, setCamioesList] = useState<CamiaoData[]>([]);
  const [selectedCamiao, setSelectedCamiao] = useState<CamiaoData | null>(null);
  const [showCamiaoDetalhes, setShowCamiaoDetalhes] = useState(false);
  const [estatisticasCargas, setEstatisticasCargas] = useState<{
    totalCargas?: number;
    porStatus?: Record<string, number>;
    valorTotalCargas?: number;
    pesoTotal?: number;
    atrasadas?: number;
    motoristaInfo?: any;
  }>({});
  const [transportData, setTransportData] = useState<TransportData>({
    empresa: null,
    transportadora: null,
    carga: null,
    motorista: null,
    cliente: null,
    viagem: null,
  });
  const currentMotoristaId = motoristaIdFromUrl || manualMotoristaId;

  const [empresasList, setEmpresasList] = useState<EmpresaData[]>([]);
  const [transportadorasList, setTransportadorasList] = useState<
    TransportadoraData[]
  >([]);
  const [cargasList, setCargasList] = useState<CargaData[]>([]);
  const [motoristasList, setMotoristasList] = useState<MotoristaData[]>([]);
  const [clientesList, setClientesList] = useState<ClienteData[]>([]);
  const [showCargaDetalhes, setShowCargaDetalhes] = useState(false);

  const [cargasAgrupadas, setCargasAgrupadas] = useState<CargasAgrupadas>({});
  const [mostrarAgrupadas, setMostrarAgrupadas] = useState(false);
  const [motoristaFiltro, setMotoristaFiltro] = useState<string>("");

  // Estados para dados filtrados
  const [filteredEmpresas, setFilteredEmpresas] = useState<EmpresaData[]>([]);
  const [filteredCargas, setFilteredCargas] = useState<CargaData[]>([]);
  const [filteredClientes, setFilteredClientes] = useState<ClienteData[]>([]);
  const [showTransportadoraList, setShowTransportadoraList] =
    useState<boolean>(true);

  const { apiCall } = useApi();
  const formatarNomeGrupo = (chave: string) => {
    const [id, ...nomeParts] = chave.split("_");
    const nome = nomeParts.join("_");
    return {
      id,
      nome: nome === "sem_motorista" ? "Sem Motorista Atribuído" : nome,
    };
  };
  // Função para buscar camiões por motorista
  const buscarCamioesPorMotorista = useCallback(
    async (motoristaId: string): Promise<void> => {
      try {
        // Primeiro tenta buscar da API
        const result = await apiCall<{
          data?: { camioes?: CamiaoData[]; total?: number };
        }>("/getCamioesPorMotorista", "POST", {
          motoristaId: parseInt(motoristaId),
        });

        // Se não encontrar camiões na API, busca do motorista
        if (result?.data?.camioes && result.data.camioes.length > 0) {
          setCamioesList(result.data.camioes);
        } else if (transportData.motorista?.veiculosHabilitados) {
          // Converte veiculosHabilitados para CamiaoData
          const camioesDoMotorista =
            transportData.motorista.veiculosHabilitados.map((veiculo) => ({
              camiaoId: 0, // ID temporário
              matricula: veiculo.matricula,
              marca: veiculo.marca,
              modelo: veiculo.modelo,
              anoFabricacao: 0, // Não disponível
              transportadoraId: 0,
              motoristaId: parseInt(motoristaId),
              codigoGPS: "N/A",
              tipoGPS: {
                tipo: "normal" as const,
                descricao: "Normal - GPS simples",
                valorRegistro: 4000,
                dataAtivacao: new Date(),
                status: "ativo" as const,
              },
              nivelInspecao: {
                categoria: veiculo.nivelInspecao.categoria as "A" | "B" | "C",
                descricao: veiculo.nivelInspecao.descricao,
                dataUltimaInspecao: new Date(
                  veiculo.nivelInspecao.dataUltimaInspecao
                ),
                dataProximaInspecao: new Date(
                  veiculo.nivelInspecao.dataProximaInspecao
                ),
                resultadoUltimaInspecao: veiculo.nivelInspecao
                  .resultadoUltimaInspecao as
                  | "aprovado"
                  | "aprovado_com_ressalvas"
                  | "reprovado",
                centroInspecao: veiculo.nivelInspecao.centroInspecao || "N/A",
              },
              especificacoes: {
                tipo: veiculo.tipo,
                pesoBruto: 0,
                tara: 0,
                cargaUtil: 0,
                numEixos: 0,
              },
              status: "disponivel" as const,
            }));

          setCamioesList(camioesDoMotorista);
        } else {
          setCamioesList([]);
        }

        if (camioesList.length > 0 && !selectedCamiao) {
          setSelectedCamiao(camioesList[0]);
        }
      } catch (error) {
        console.error("Erro ao buscar camiões:", error);

        // Fallback: verifica se há veiculosHabilitados no motorista
        if (transportData.motorista?.veiculosHabilitados) {
          const camioesDoMotorista =
            transportData.motorista.veiculosHabilitados.map((veiculo) => ({
              camiaoId: 0,
              matricula: veiculo.matricula,
              marca: veiculo.marca,
              modelo: veiculo.modelo,
              anoFabricacao: 0,
              transportadoraId: 0,
              motoristaId: parseInt(motoristaId),
              codigoGPS: "N/A",
              tipoGPS: {
                tipo: "normal" as const,
                descricao: "Normal - GPS simples",
                valorRegistro: 4000,
                dataAtivacao: new Date(),
                status: "ativo" as const,
              },
              nivelInspecao: {
                categoria: veiculo.nivelInspecao.categoria as "A" | "B" | "C",
                descricao: veiculo.nivelInspecao.descricao,
                dataUltimaInspecao: new Date(
                  veiculo.nivelInspecao.dataUltimaInspecao
                ),
                dataProximaInspecao: new Date(
                  veiculo.nivelInspecao.dataProximaInspecao
                ),
                resultadoUltimaInspecao: veiculo.nivelInspecao
                  .resultadoUltimaInspecao as
                  | "aprovado"
                  | "aprovado_com_ressalvas"
                  | "reprovado",
                centroInspecao: veiculo.nivelInspecao.centroInspecao || "N/A",
              },
              especificacoes: {
                tipo: veiculo.tipo,
                pesoBruto: 0,
                tara: 0,
                cargaUtil: 0,
                numEixos: 0,
              },
              status: "disponivel" as const,
            }));

          setCamioesList(camioesDoMotorista);
        } else {
          setCamioesList([]);
        }
      }
    },
    [apiCall, transportData.motorista, camioesList]
  );

  // Buscar todos os dados relacionados ao motorista
  const buscarDadosPorMotorista = useCallback(
    async (id: string): Promise<void> => {
      try {
        setLoading(true);
        setInitialLoad(true);

        // Buscar listas para filtrar
        await Promise.all([
          buscarDetalhesMotorista(id),
          buscarMotoristasParaFiltrar(), // Buscar lista de motoristas
          buscarEmpresasParaFiltrar(),
          buscarTransportadorasParaFiltrar(),
          buscarCargasParaFiltrar(),
          buscarClientesParaFiltrar(),
          buscarCamioesPorMotorista(id), // Buscar camiões do motorista
        ]);

        // Filtrar dados com base no motorista
        filtrarDadosPorMotorista(id);

        toast.success(`Dados carregados para o motorista ID: ${id}`);
      } catch (err: any) {
        toast.error("Erro ao carregar dados: " + err.message);
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    },
    [buscarCamioesPorMotorista]
  );

  const handleMotoristaClick = useCallback(
    (motoristaId: string) => {
      setManualMotoristaId(motoristaId);
      buscarDadosPorMotorista(motoristaId);
      setActiveTab(1); // Vai para a aba do motorista
    },
    [buscarDadosPorMotorista]
  );

  const handleSelectTransportadora = useCallback(
    (transportadora: TransportadoraData) => {
      setSelectedTransportadora(transportadora);
      setShowTransportadoraList(false);

      // Verificar se esta é a transportadora do motorista atual
      if (
        transportData.motorista?.empresaMotorista === transportadora.nomeEmpresa
      ) {
      }
    },
    [transportData.motorista?.empresaMotorista]
  );

  const buscarCargasPorMotoristaApi = useCallback(
    async (motoristaId?: string | number): Promise<CargaData[]> => {
      try {
        const result = await apiCall<{ list?: CargaData[] }>(
          "/getCargasByMotorista",
          "POST",
          {
            motoristaId: motoristaId || currentMotoristaId,
          }
        );
        return result?.list || [];
      } catch (error) {
        console.error("Erro ao buscar cargas por motorista:", error);
        return [];
      }
    },
    [apiCall, currentMotoristaId]
  );
  // ==================== FUNÇÃO PARA BUSCAR CARGAS POR MOTORISTA ====================
  const buscarCargasPorMotorista = useCallback(
    async (motoristaId?: string | number): Promise<any> => {
      try {
        const result = await apiCall<{
          list?: CargaData[];
          agrupadas?: Record<string, CargaData[]>;
          totalCargas?: number;
          motoristaInfo?: any;
          estatisticas?: any;
          returnCode?: number;
          returnMsg?: string;
        }>("/getCargasByMotorista", "POST", {
          motoristaId: motoristaId || currentMotoristaId,
        });

        // Se houver erro na API
        if (result?.returnCode && result.returnCode >= 400) {
          console.warn("API retornou erro:", result.returnMsg);
          // Retorna estrutura vazia em vez de lançar erro
          return {
            list: [],
            agrupadas: {},
            totalCargas: 0,
          };
        }

        // Retorna o resultado ou estrutura vazia
        return (
          result || {
            list: [],
            agrupadas: {},
            totalCargas: 0,
          }
        );
      } catch (error) {
        console.error("Erro ao buscar cargas por motorista:", error);

        // Retorna estrutura vazia em vez de propagar erro
        return {
          list: [],
          agrupadas: {},
          totalCargas: 0,
          estatisticas: {},
        };
      }
    },
    [apiCall, currentMotoristaId]
  );

  const agruparCargasPorMotorista = useCallback(
    (cargas: CargaData[]): CargasAgrupadas => {
      const agrupadas: CargasAgrupadas = {};

      cargas.forEach((carga) => {
        const motoristaId = carga.motorista?.id
          ? String(carga.motorista.id)
          : carga.motoristaId
          ? String(carga.motoristaId)
          : "sem_motorista";

        const motoristaNome = carga.motorista?.nome || "Motorista Desconhecido";

        const chave = `${motoristaId}_${motoristaNome}`;

        if (!agrupadas[chave]) {
          agrupadas[chave] = {
            motoristaId,
            motoristaNome,
            cargas: [],
            totalCargas: 0,
            totalPeso: 0,
            totalValor: 0,
          };
        }

        agrupadas[chave].cargas.push(carga);
        agrupadas[chave].totalCargas++;
        agrupadas[chave].totalPeso += carga.pesoBruto || 0;
        agrupadas[chave].totalValor += carga.valorMercadoria || 0;
      });

      return agrupadas;
    },
    []
  );

  const buscarCargasAgrupadas = useCallback(async () => {
    try {
      setLoading(true);
      const resultado = await buscarCargasPorMotorista();

      if (resultado && typeof resultado === "object" && resultado.agrupadas) {
        // Converter o formato da API para nosso formato
        const agrupadasConvertidas: CargasAgrupadas = {};

        Object.entries(resultado.agrupadas).forEach(([chave, cargasArray]) => {
          if (Array.isArray(cargasArray)) {
            const cargas = cargasArray as CargaData[];
            // Processar a chave para extrair ID e nome do motorista
            const [motoristaId, ...nomeParts] = chave.split("_");
            const motoristaNome =
              nomeParts.join("_") || "Motorista Desconhecido";

            // Calcular totais
            const totalPeso = cargas.reduce(
              (sum, c) => sum + (c.pesoBruto || 0),
              0
            );
            const totalValor = cargas.reduce(
              (sum, c) => sum + (c.valorMercadoria || 0),
              0
            );

            agrupadasConvertidas[chave] = {
              motoristaId:
                motoristaId === "sem_motorista" ? "sem_motorista" : motoristaId,
              motoristaNome:
                motoristaNome === "sem_motorista"
                  ? "Sem Motorista Atribuído"
                  : motoristaNome,
              cargas,
              totalCargas: cargas.length,
              totalPeso,
              totalValor,
            };
          }
        });

        setCargasAgrupadas(agrupadasConvertidas);

        // Atualizar lista de cargas filtradas também
        if (resultado.list && Array.isArray(resultado.list)) {
          setFilteredCargas(resultado.list);
        }

        // Atualizar estatísticas se vierem da API
        if (resultado.estatisticas) {
          setEstatisticasCargas(resultado.estatisticas);
        }
      } else if (Array.isArray(resultado)) {
        // Se for apenas array, agrupa localmente
        const agrupadas = agruparCargasPorMotorista(resultado);
        setCargasAgrupadas(agrupadas);
        setFilteredCargas(resultado);
      }
    } catch (error) {
      console.error("Erro ao buscar cargas agrupadas:", error);
      toast.error("Erro ao carregar cargas agrupadas");
    } finally {
      setLoading(false);
    }
  }, [buscarCargasPorMotorista, agruparCargasPorMotorista]);

  // Funções para abrir modais de detalhes
  const openDetalhesEmpresa = (empresa: EmpresaData) => {
    setSelectedEmpresa(empresa);
    setDetalhesTitulo(`Detalhes da Empresa - ${empresa.nome}`);
    setDetalhesConteudo(
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" gutterBottom>
            Informações Gerais
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Nome Comercial
              </Typography>
              <Typography variant="body1">{empresa.nome}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Código
              </Typography>
              <Typography variant="body1">{empresa.codigo}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2" color="textSecondary">
                NUIT
              </Typography>
              <Typography variant="body1">{empresa.nuit}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Segmento
              </Typography>
              <Typography variant="body1">{empresa.segmento}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Status
              </Typography>
              <StatusChip status={empresa.status} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Classificação
              </Typography>
              <Typography variant="body1">{empresa.classificacao}</Typography>
            </Grid>
            {empresa.dataCadastro && (
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Data de Cadastro
                </Typography>
                <Typography variant="body1">
                  {new Date(empresa.dataCadastro).toLocaleDateString("pt-MZ")}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>

        {empresa.contatos && empresa.contatos.length > 0 && (
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom>
              Contatos
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Cargo</TableCell>
                    <TableCell>Telefone</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Departamento</TableCell>
                    <TableCell>Principal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {empresa.contatos.map((contato, index) => (
                    <TableRow key={index}>
                      <TableCell>{contato.nome}</TableCell>
                      <TableCell>{contato.cargo || "-"}</TableCell>
                      <TableCell>{contato.telefone || "-"}</TableCell>
                      <TableCell>{contato.email || "-"}</TableCell>
                      <TableCell>{contato.departamento || "-"}</TableCell>
                      <TableCell>
                        {contato.principal ? (
                          <CheckIcon color="success" fontSize="small" />
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}

        {empresa.endereco && (
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom>
              Endereço
            </Typography>
            {typeof empresa.endereco === "string" ? (
              <Typography variant="body1">{empresa.endereco}</Typography>
            ) : (
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Rua
                  </Typography>
                  <Typography variant="body1">
                    {empresa.endereco.rua}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Bairro
                  </Typography>
                  <Typography variant="body1">
                    {empresa.endereco.bairro}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Cidade
                  </Typography>
                  <Typography variant="body1">
                    {empresa.endereco.cidade}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Província
                  </Typography>
                  <Typography variant="body1">
                    {empresa.endereco.provincia}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
        )}

        {empresa.motoristasIds && empresa.motoristasIds.length > 0 && (
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom>
              Motoristas Associados ({empresa.motoristasIds.length})
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {empresa.motoristasIds.slice(0, 5).map((id, index) => (
                <Chip
                  key={index}
                  label={String(id)}
                  size="small"
                  variant="outlined"
                  onClick={() => handleMotoristaClick(String(id))}
                  sx={{ cursor: "pointer" }}
                />
              ))}
              {empresa.motoristasIds.length > 5 && (
                <Chip
                  label={`+${empresa.motoristasIds.length - 5} mais`}
                  size="small"
                  variant="outlined"
                />
              )}
            </Box>
          </Grid>
        )}
      </Grid>
    );
    setDetalhesCompletosOpen(true);
  };

  const openDetalhesTransportadora = (transportadora: TransportadoraData) => {
    setSelectedTransportadora(transportadora);
    setDetalhesTitulo(`Detalhes da Transportadora - ${transportadora.nome}`);
    setDetalhesConteudo(
      <TransportadoraDetalhes
        transportadora={transportadora}
        onMotoristaClick={handleMotoristaClick}
      />
    );
    setDetalhesCompletosOpen(true);
  };

  const openDetalhesCarga = (carga: CargaData) => {
    setSelectedCarga(carga);
    setDetalhesTitulo(`Detalhes da Carga - ${carga.codigo}`);
    setDetalhesConteudo(
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" gutterBottom>
            Informações da Carga
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Código
              </Typography>
              <Typography variant="body1">{carga.codigo}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Status
              </Typography>
              <StatusChip status={carga.status} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Descrição
              </Typography>
              <Typography variant="body1">{carga.descricao}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Tipo de Carga
              </Typography>
              <Typography variant="body1">
                {carga.tipoCarga || carga.tipo}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Peso Bruto
              </Typography>
              <Typography variant="body1">
                {carga.pesoBruto?.toLocaleString()} kg
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Valor da Mercadoria
              </Typography>
              <Typography variant="body1">
                ${carga.valorMercadoria?.toLocaleString()}
              </Typography>
            </Grid>
            {carga.destinoFrete && (
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Destino do Frete
                </Typography>
                <Typography variant="body1">{carga.destinoFrete}</Typography>
              </Grid>
            )}
            {carga.tipoPercurso && (
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Tipo de Percurso
                </Typography>
                <Typography variant="body1">{carga.tipoPercurso}</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" gutterBottom>
            Origem
          </Typography>
          {typeof carga.origem === "string" ? (
            <Typography variant="body1">{carga.origem}</Typography>
          ) : (
            <Box>
              <Typography variant="body1">{carga.origem?.cidade}</Typography>
            </Box>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" gutterBottom>
            Destino
          </Typography>
          {typeof carga.destino === "string" ? (
            <Typography variant="body1">{carga.destino}</Typography>
          ) : (
            <Box>
              <Typography variant="body1">{carga.destino?.cidade}</Typography>
            </Box>
          )}
        </Grid>

        {carga.seguro && (
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom>
              Informações do Seguro
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Valor Segurado
                </Typography>
                <Typography variant="body1">
                  ${carga.seguro.valorSegurado?.toLocaleString()}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Prêmio Final
                </Typography>
                <Typography variant="body1">
                  ${carga.seguro.premioFinal?.toLocaleString()}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Status do Seguro
                </Typography>
                <Typography variant="body1">
                  {carga.seguro.statusSeguro}
                </Typography>
              </Grid>
              {carga.categoriaSeguro && (
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Categoria
                  </Typography>
                  <Typography variant="body1">
                    {carga.categoriaSeguro}
                  </Typography>
                </Grid>
              )}
              {carga.abrangenciaSeguro && (
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Abrangência
                  </Typography>
                  <Typography variant="body1">
                    {carga.abrangenciaSeguro}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        )}

        {carga.cliente && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              Cliente
            </Typography>
            <Typography variant="body1">{carga.cliente}</Typography>
          </Grid>
        )}

        {carga.motorista && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              Motorista
            </Typography>
            <Box display="flex" alignItems="center">
              <Avatar
                sx={{ width: 40, height: 40, mr: 2, bgcolor: "success.main" }}
              >
                {carga.motorista.nome?.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="body1">{carga.motorista.nome}</Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {carga.motorista.id}
                </Typography>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
    );
    setDetalhesCompletosOpen(true);
  };

  // Filtrar todos os dados com base no ID do motorista
  const filtrarDadosPorMotorista = useCallback(
    (motoristaId: string): void => {
      // Encontrar motorista específico
      const motoristaAtual = motoristasList.find(
        (m) => String(m.motoristaId) === motoristaId
      );

      const nomeEmpresaMotorista = motoristaAtual?.empresaMotorista || "";

      // 1. FILTRAR "EMPRESAS" (clientes que podem ser empresas)
      // Procurar clientes que tenham este motorista na lista
      const empresasFiltradas = empresasList.filter((empresa) => {
        // Verifica se a empresa tem o motorista na lista
        const temMotorista = empresa.motoristasIds?.some(
          (id) => String(id) === motoristaId
        );

        // Verifica se o nome da empresa corresponde ao empresaMotorista
        const nomeCorresponde =
          empresa.nomeEmpresa?.toLowerCase() ===
            nomeEmpresaMotorista.toLowerCase() ||
          empresa.nome?.toLowerCase() === nomeEmpresaMotorista.toLowerCase();

        return temMotorista || nomeCorresponde;
      });

      setFilteredEmpresas(empresasFiltradas);

      // 2. FILTRAR TRANSPORTADORAS
      const transportadorasFiltradas = transportadorasList.filter((transp) => {
        // Verifica se a transportadora tem o motorista
        const temMotorista = transp.motoristasIds?.some(
          (id) => String(id) === motoristaId
        );

        // Verifica se o nome da transportadora corresponde
        const nomeCorresponde =
          transp.nomeEmpresa?.toLowerCase() ===
          nomeEmpresaMotorista.toLowerCase();

        return temMotorista || nomeCorresponde;
      });

      setFilteredTransportadoras(transportadorasFiltradas);

      // 3. FILTRAR CARGAS
      const cargasFiltradas = cargasList.filter((carga) => {
        const motoristaIdNumero = parseInt(motoristaId);

        // Verifica de várias formas:
        const motoristaIdCarga = carga.motorista?.id;
        const motoristaIdDireto = carga.motoristaId;

        return (
          motoristaIdCarga === motoristaIdNumero ||
          motoristaIdDireto === motoristaId ||
          String(motoristaIdCarga) === motoristaId ||
          String(carga.motoristaId) === motoristaId
        );
      });

      setFilteredCargas(cargasFiltradas);

      // 4. FILTRAR CLIENTES
      const clientesFiltradas = clientesList.filter((cliente) => {
        // Clientes podem ter motoristas associados
        const temMotorista = cliente.motoristasIds?.some(
          (id) => String(id) === motoristaId
        );

        // Ou o motorista pode trabalhar para este cliente
        const nomeCorresponde =
          cliente.nomeEmpresa?.toLowerCase() ===
          nomeEmpresaMotorista.toLowerCase();

        return temMotorista || nomeCorresponde;
      });

      setFilteredClientes(clientesFiltradas);

      // Buscar detalhes se houver dados
      if (empresasFiltradas.length > 0 && empresasFiltradas[0].codigo) {
        buscarDetalhesEmpresa(empresasFiltradas[0].codigo);
      } else {
        setTransportData((prev) => ({ ...prev, empresa: null }));
      }

      // Buscar detalhes da transportadora
      if (transportadorasFiltradas.length > 0) {
        const transportadoraDoMotorista = transportadorasFiltradas.find(
          (transp) =>
            transp.nomeEmpresa?.toLowerCase() ===
            nomeEmpresaMotorista.toLowerCase()
        );

        if (transportadoraDoMotorista?.transportadoraId) {
          buscarDetalhesTransportadora(
            transportadoraDoMotorista.transportadoraId
          );
        } else if (transportadorasFiltradas[0].transportadoraId) {
          buscarDetalhesTransportadora(
            transportadorasFiltradas[0].transportadoraId
          );
        }
      }

      // Buscar detalhes da primeira carga
      if (cargasFiltradas.length > 0 && cargasFiltradas[0].codigo) {
        buscarDetalhesCarga(cargasFiltradas[0].codigo);
      }

      // Buscar detalhes do primeiro cliente
      if (clientesFiltradas.length > 0 && clientesFiltradas[0].codigo) {
        buscarDetalhesCliente(clientesFiltradas[0].codigo);
      }
    },
    [
      empresasList,
      transportadorasList,
      cargasList,
      clientesList,
      motoristasList,
    ]
  );

  // Função para ver todas as cargas
  const mostrarTodasCargas = useCallback(async () => {
    try {
      setLoading(true);

      // Quando clicar em "Ver todas", buscar sem motoristaId para ver todas agrupadas
      const resultado = await apiCall<{
        list?: CargaData[];
        agrupadas?: Record<string, CargaData[]>;
        totalCargas?: number;
        estatisticas?: any;
      }>("/getCargasByMotorista", "POST", {
        // Vazio para retornar todas cargas agrupadas
      });

      if (resultado?.agrupadas) {
        // Converter o formato da API para nosso formato CargasAgrupadas
        const agrupadasConvertidas: CargasAgrupadas = {};

        Object.entries(resultado.agrupadas).forEach(([chave, cargasArray]) => {
          if (Array.isArray(cargasArray)) {
            const cargas = cargasArray as CargaData[];
            const [motoristaId, ...nomeParts] = chave.split("_");
            const motoristaNome =
              nomeParts.join("_") || "Motorista Desconhecido";

            // Calcular totais
            const totalPeso = cargas.reduce(
              (sum, c) => sum + (c.pesoBruto || 0),
              0
            );
            const totalValor = cargas.reduce(
              (sum, c) => sum + (c.valorMercadoria || 0),
              0
            );

            agrupadasConvertidas[chave] = {
              motoristaId:
                motoristaId === "sem_motorista" ? "sem_motorista" : motoristaId,
              motoristaNome:
                motoristaNome === "sem_motorista"
                  ? "Sem Motorista Atribuído"
                  : motoristaNome,
              cargas,
              totalCargas: cargas.length,
              totalPeso,
              totalValor,
            };
          }
        });

        // Usar o formato convertido
        setCargasAgrupadas(agrupadasConvertidas);
        setFilteredCargas(resultado.list || []);

        if (resultado.estatisticas) {
          setEstatisticasCargas(resultado.estatisticas);
        }

        // Mostrar visualização agrupada
        setMostrarAgrupadas(true);
        toast.success(
          `Carregadas ${
            resultado.totalCargas || 0
          } cargas agrupadas por motorista`
        );
      }
    } catch (error) {
      console.error("Erro ao buscar todas as cargas:", error);
      toast.error("Erro ao carregar todas as cargas");
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  useEffect(() => {
    if (
      transportData.motorista?.empresaMotorista &&
      filteredTransportadoras.length > 0
    ) {
      // Verificar se a transportadora do motorista está na lista
      const transportadoraDoMotorista = filteredTransportadoras.find(
        (t) =>
          t.nomeEmpresa?.toLowerCase() ===
          transportData.motorista?.empresaMotorista?.toLowerCase()
      );

      if (transportadoraDoMotorista && !transportData.transportadora) {
        // Buscar detalhes da transportadora automaticamente
        buscarDetalhesTransportadora(
          transportadoraDoMotorista.transportadoraId!
        );
      }
    }
  }, [
    transportData.motorista?.empresaMotorista,
    filteredTransportadoras,
    transportData.transportadora,
  ]);
  // Adicionar função para buscar motoristas
  const buscarMotoristasParaFiltrar = useCallback(async (): Promise<void> => {
    try {
      const result = await apiCall<{ list?: MotoristaData[] }>(
        "/getMotoristaList",
        "POST",
        {
          curPage: 1,
          pageSize: 100,
        }
      );
      setMotoristasList(result?.list || []);
    } catch (error) {
      console.error("Erro ao buscar motoristas:", error);
      setMotoristasList([]);
    }
  }, [apiCall]);

  const vincularMotoristaTransportadora = useCallback(
    async (
      motoristaId: string,
      transportadoraId: string | number
    ): Promise<{
      returnCode: number;
      returnMsg: string;
      data: any;
    }> => {
      try {
        const result = await apiCall(
          "/vincularMotoristaTransportadora",
          "POST",
          {
            motoristaId: parseInt(motoristaId),
            transportadoraId: parseInt(String(transportadoraId)),
          }
        );
        return result;
      } catch (error) {
        console.error("Erro ao vincular motorista:", error);
        throw error;
      }
    },
    [apiCall]
  );

  const buscarTransportadorasComMotoristas = useCallback(async (): Promise<
    TransportadoraData[]
  > => {
    try {
      const result = await apiCall<{ list?: TransportadoraData[] }>(
        "/getTransportadorasDisponiveis",
        "POST",
        {
          status: "ativa",
        }
      );
      return result?.list || [];
    } catch (error) {
      console.error("Erro ao buscar transportadoras:", error);
      return [];
    }
  }, [apiCall]);

  const buscarMotoristasPorTransportadora = useCallback(
    async (transportadoraId: string | number): Promise<MotoristaData[]> => {
      try {
        const result = await apiCall<{
          data?: { motoristas?: MotoristaData[] };
        }>("/getMotoristasByTransportadora", "POST", {
          transportadoraId: parseInt(String(transportadoraId)),
        });
        return result?.data?.motoristas || [];
      } catch (error) {
        console.error("Erro ao buscar motoristas por transportadora:", error);
        return [];
      }
    },
    [apiCall]
  );

  useEffect(() => {
    if (motoristaIdFromUrl) {
      buscarDadosPorMotorista(motoristaIdFromUrl);
    } else {
      setLoading(false);
      setInitialLoad(false);
    }
  }, [motoristaIdFromUrl]);
  // BUSCAR DADOS PARA FILTRAGEM
  const buscarEmpresasParaFiltrar = useCallback(async (): Promise<void> => {
    try {
      // NÃO EXISTE ENDPOINT PARA EMPRESAS - usar clientes com categoria específica

      const result = await apiCall<{ list?: ClienteData[] }>(
        "/getClienteList",
        "POST",
        {
          curPage: 1,
          pageSize: 50,
          // Filtrar por categoria 'Gestor' ou 'Cliente' que podem ser considerados empresas
          categoria: "Cliente", // Ou filtrar múltiplas categorias
        }
      );

      if (result && result.list) {
        // Converter clientes para formato de empresa
        const empresasConvertidas: EmpresaData[] = result.list.map(
          (cliente) => ({
            nome: cliente.nome || cliente.nomeEmpresa,
            nomeEmpresa: cliente.nomeEmpresa || cliente.nome,
            codigo: cliente.codigo,
            nuit: cliente.nuit,
            segmento: cliente.segmento || "Não especificado",
            status: cliente.status,
            classificacao: cliente.classificacao,
            dataCadastro: cliente.dataCadastro,
            contatoPrincipal: cliente.contatos?.[0],
            telefone: cliente.telefone || cliente.contatos?.[0]?.telefone,
            email: cliente.email || cliente.contatos?.[0]?.email,
            contatos: cliente.contatos || [],
            motoristasIds: cliente.motoristasIds || [],
            categoria: cliente.categoria, // Incluir a categoria para referência
          })
        );

        setEmpresasList(empresasConvertidas);
      } else {
        setEmpresasList([]);
      }
    } catch (error) {
      console.error("Erro ao buscar empresas:", error);

      // Tentar fallback: buscar todos os clientes
      try {
        const fallbackResult = await apiCall<{ list?: ClienteData[] }>(
          "/getClienteList",
          "POST",
          {
            curPage: 1,
            pageSize: 30,
          }
        );

        const empresasConvertidas: EmpresaData[] = (
          fallbackResult?.list || []
        ).map((cliente) => ({
          nome: cliente.nome || cliente.nomeEmpresa,
          nomeEmpresa: cliente.nomeEmpresa || cliente.nome,
          codigo: cliente.codigo,
          nuit: cliente.nuit,
          segmento: cliente.segmento || "Não especificado",
          status: cliente.status,
          classificacao: cliente.classificacao,
          contatoPrincipal: cliente.contatos?.[0],
          telefone: cliente.telefone || cliente.contatos?.[0]?.telefone,
          email: cliente.email || cliente.contatos?.[0]?.email,
          contatos: cliente.contatos || [],
          motoristasIds: cliente.motoristasIds || [],
        }));

        setEmpresasList(empresasConvertidas);
      } catch (fallbackError) {
        console.error("Fallback também falhou:", fallbackError);
        setEmpresasList([]);
      }
    }
  }, [apiCall]);
  const buscarTransportadorasParaFiltrar =
    useCallback(async (): Promise<void> => {
      try {
        const result = await apiCall<{ list?: TransportadoraData[] }>(
          "/getTransportadoraList",
          "POST",
          {
            curPage: 1,
            pageSize: 100,
          }
        );
        setTransportadorasList(result?.list || []);

        // Também atualize filteredTransportadoras se houver um motoristaId
        const motoristaId = motoristaIdFromUrl || manualMotoristaId;
        if (motoristaId) {
          const motoristaAtual = motoristasList.find(
            (m) => String(m.motoristaId) === motoristaId
          );
          const nomeEmpresaMotorista = motoristaAtual?.empresaMotorista || "";

          const transportadorasFiltradas = (result?.list || []).filter(
            (transp) =>
              transp.motoristasIds?.includes(motoristaId) ||
              transp.nomeEmpresa?.toLowerCase() ===
                nomeEmpresaMotorista.toLowerCase()
          );
          setFilteredTransportadoras(transportadorasFiltradas);
        } else {
          // Se não houver motoristaId, mostra todas
          setFilteredTransportadoras(result?.list || []);
        }
      } catch (error) {
        console.error("Erro ao buscar transportadoras:", error);
        setTransportadorasList([]);
        setFilteredTransportadoras([]);
      }
    }, [apiCall, motoristaIdFromUrl, manualMotoristaId, motoristasList]);

  const buscarCargasParaFiltrar = useCallback(async (): Promise<void> => {
    try {
      // Primeiro tenta buscar da API geral
      const result = await apiCall<{ list?: CargaData[] }>(
        "/getCargaList",
        "POST",
        {
          curPage: 1,
          pageSize: 50, // Reduzi para 50 para teste
        }
      );

      // Se a API geral funcionou
      if (result?.list && Array.isArray(result.list)) {
        setCargasList(result.list);

        // Se houver motoristaId específico, busca cargas desse motorista
        if (currentMotoristaId) {
          const cargasPorMotorista = await buscarCargasPorMotorista(
            currentMotoristaId
          );

          // Se encontrou cargas específicas, usa elas
          if (cargasPorMotorista?.list && cargasPorMotorista.list.length > 0) {
            setFilteredCargas(cargasPorMotorista.list);
          } else {
            setFilteredCargas(result.list);
          }
        } else {
          // Se não tem motoristaId, usa a lista geral
          setFilteredCargas(result.list);
        }
      } else {
        // Se a API geral falhou, usa array vazio
        console.warn("API geral de cargas retornou vazio");
        setCargasList([]);
        setFilteredCargas([]);
      }
    } catch (error) {
      console.error("Erro ao buscar cargas para filtragem:", error);

      // Em caso de erro, usa arrays vazios
      setCargasList([]);
      setFilteredCargas([]);

      // Mostra alerta informativo
      toast.warning(
        "Não foi possível carregar as cargas. Verifique a conexão."
      );
    }
  }, [apiCall, currentMotoristaId, buscarCargasPorMotorista]);

  const buscarClientesParaFiltrar = useCallback(async (): Promise<void> => {
    try {
      const result = await apiCall<{ list?: ClienteData[] }>(
        "/getClienteList",
        "POST",
        {
          curPage: 1,
          pageSize: 100,
        }
      );
      setClientesList(result?.list || []);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      setClientesList([]);
    }
  }, [apiCall]);

  // BUSCAR DETALHES ESPECÍFICOS
  const buscarDetalhesEmpresa = useCallback(
    async (codigo: string): Promise<void> => {
      try {
        const result = await apiCall<EmpresaData>("/getClienteDetail", "POST", {
          codigo,
        });

        if (result) {
          setTransportData((prev) => ({
            ...prev,
            empresa: {
              nome: result.nome || result.nomeEmpresa,
              codigo: result.codigo,
              nuit: result.nuit,
              segmento: result.segmento,
              status: result.status,
              classificacao: result.classificacao,
              dataCadastro: result.dataCadastro,
              contatoPrincipal: result.contatoPrincipal,
              telefone: result.contatos?.[0]?.telefone,
              email: result.contatos?.[0]?.email,
              endereco: result.enderecoCobranca,
              motoristasIds: result.motoristasIds || [],
            },
          }));
          toast.success("Dados da empresa carregados!");
        }
      } catch (error) {
        toast.error("Erro ao carregar dados da empresa");
        console.error("Erro detalhes empresa:", error);
      }
    },
    [apiCall]
  );

  const buscarDetalhesTransportadora = useCallback(
    async (transportadoraId: string | number): Promise<void> => {
      try {
        const result = await apiCall<TransportadoraData>(
          "/getTransportadoraDetail",
          "POST",
          {
            transportadoraId: String(transportadoraId),
          }
        );

        if (result) {
          setTransportData((prev) => ({
            ...prev,
            transportadora: {
              nome: result.nomeEmpresa,
              nomeEmpresa: result.nomeEmpresa,
              transportadoraId: result.transportadoraId,
              nif: result.nif,
              telefone: result.contactos?.telefonePrincipal,
              email: result.email,
              website: result.website,
              contactos: result.contactos,
              endereco: result.endereco,
              tipoServicos: result.tipoServicos,
              capacidadeTotal: result.capacidadeTotal,
              status: result.status,
              avaliacao: result.avaliacaoGeral,
              avaliacaoGeral: result.avaliacaoGeral,
              totalCamioes: result.capacidadeTotal?.totalCamioes,
              dataCriacao: result.dataCriacao,
              observacoes: result.observacoes,
              qualificadaTransito: result.qualificadaTransito,
              motoristasIds: result.motoristasIds || [],
            },
          }));
          toast.success("Dados da transportadora carregados!");
        }
      } catch (error) {
        toast.error("Erro ao carregar dados da transportadora");
        console.error("Erro detalhes transportadora:", error);
      }
    },
    [apiCall]
  );

  const buscarDetalhesCarga = useCallback(
    async (codigo: string): Promise<void> => {
      try {
        const result = await apiCall<CargaData>("/getCargaDetail", "POST", {
          codigo,
        });

        if (result) {
          setTransportData((prev) => ({
            ...prev,
            carga: {
              codigo: result.codigo,
              descricao: result.descricao,
              tipo: result.tipoCarga,
              pesoBruto: result.pesoBruto,
              origem:
                typeof result.origem === "string"
                  ? result.origem
                  : result.origem?.cidade,
              destino:
                typeof result.destino === "string"
                  ? result.destino
                  : result.destino?.cidade,
              status: result.status,
              valorMercadoria: result.valorMercadoria,
              seguro: result.seguro,
              cliente: result.cliente,
              motorista: result.motorista
                ? { nome: result.motorista.nome, id: result.motorista.id }
                : undefined,
              categoriaSeguro: result.categoriaSeguro,
              abrangenciaSeguro: result.abrangenciaSeguro,
              tipoPercurso: result.tipoPercurso,
              destinoFrete: result.destinoFrete,
            },
          }));

          // Calcular custos automaticamente
          if (result.codigo) {
            await calcularCustosCarga(result.codigo);
          }

          toast.success("Dados da carga carregados!");
        }
      } catch (error) {
        toast.error("Erro ao carregar dados da carga");
        console.error("Erro detalhes carga:", error);
      }
    },
    [apiCall]
  );

  const buscarDetalhesMotorista = useCallback(
    async (motoristaId: string): Promise<void> => {
      try {
        const result = await apiCall<MotoristaData>(
          "/getMotoristaDetail",
          "POST",
          {
            motoristaId,
          }
        );

        if (result) {
          setTransportData((prev) => ({
            ...prev,
            motorista: {
              nome: result.nomeCompleto,
              nomeCompleto: result.nomeCompleto,
              motoristaId: result.motoristaId,
              cartaConducao: result.cartaConducao,
              cartaConducaoDetalhes:
                result.cartaConducaoDetalhes ||
                (typeof result.cartaConducao === "object"
                  ? result.cartaConducao
                  : undefined),
              categoria:
                result.categoria ||
                (typeof result.cartaConducao === "object"
                  ? result.cartaConducao?.categoria
                  : undefined),
              empresa: result.empresaMotorista,
              empresaMotorista: result.empresaMotorista,
              empresaId: result.empresaId,
              transportadoraId: result.transportadoraId,
              avaliacao: result.avaliacaoGeral,
              avaliacaoDetalhada: result.avaliacaoDetalhada,
              status: result.status,
              statusContratual: result.statusContratual,
              totalViagens: result.totalViagensRealizadas,
              totalViagensRealizadas: result.totalViagensRealizadas,
              totalKmPercorridos: result.totalKmPercorridos,
              telefone: result.contactos?.telefonePrincipal,
              contactos: result.contactos,
              passaporte: result.passaporte,
              dataNascimento: result.dataNascimento,
              nacionalidade: result.nacionalidade,
              cargo: result.cargo,
              dataAdmissao: result.dataAdmissao,
              numeroBI: result.numeroBI,
              validadeBI: result.validadeBI,
              nuit: result.nuit,
              licencaProfissional: result.licencaProfissional,
              endereco: result.endereco,
              indiceAcidentes: result.indiceAcidentes,
              indiceMultas: result.indiceMultas,
              limitesJornada: result.limitesJornada,
              veiculosHabilitados: result.veiculosHabilitados,
              infoTransportador: result.infoTransportador,
              foto: result.foto,
              fotos: result.fotos,
              observacoes: result.observacoes,
              dataCriacao: result.dataCriacao,
            },
          }));

          toast.success("Dados do motorista carregados!");
        }
      } catch (error) {
        toast.error("Erro ao carregar dados do motorista");
        console.error("Erro detalhes motorista:", error);
      }
    },
    [apiCall]
  );

  const buscarDetalhesCliente = useCallback(
    async (codigo: string): Promise<void> => {
      try {
        const result = await apiCall<ClienteData>("/getClienteDetail", "POST", {
          codigo,
        });

        if (result) {
          setTransportData((prev) => ({
            ...prev,
            cliente: {
              nome: result.nome,
              tipo: result.tipoPessoa,
              codigo: result.codigo,
              nuit: result.nuit,
              classificacao: result.classificacao,
              contatoPrincipal: result.contatos?.find(
                (c: Contact) => c.principal
              )?.nome,
              telefone: result.contatos?.find((c: Contact) => c.principal)
                ?.telefone,
              email: result.contatos?.find((c: Contact) => c.principal)?.email,
              status: result.status,
              motoristasIds: result.motoristasIds || [],
            },
          }));
          toast.success("Dados do cliente carregados!");
        }
      } catch (error) {
        toast.error("Erro ao carregar dados do cliente");
        console.error("Erro detalhes cliente:", error);
      }
    },
    [apiCall]
  );

  // CALCULAR CUSTOS DA CARGA
  const calcularCustosCarga = useCallback(
    async (codigoCarga: string): Promise<void> => {
      try {
        setLoading(true);
        const result = await apiCall<ViagemData>(
          "/calcularCustosCarga",
          "POST",
          {
            codigo: codigoCarga,
          }
        );

        if (result) {
          setTransportData((prev) => ({
            ...prev,
            viagem: {
              ...prev.viagem,
              fretes: result.fretes,
              comissao: result.comissao,
              seguroCarga: result.seguroCarga,
              seguroVeiculo: result.seguroVeiculo,
              valorTotal: result.valorTotal,
              margemLucro: result.margemLucro,
            },
          }));
          toast.success("Cálculos financeiros realizados!");
        }
      } catch (err: any) {
        toast.error("Erro ao calcular custos: " + err.message);
      } finally {
        setLoading(false);
      }
    },
    [apiCall]
  );

  // Função para buscar dados manualmente com ID
  const handleBuscarManual = useCallback((): void => {
    if (manualMotoristaId.trim()) {
      const newUrl = `${window.location.pathname}?motoristaId=${manualMotoristaId}`;
      window.history.pushState({}, "", newUrl);

      buscarDadosPorMotorista(manualMotoristaId);

      window.dispatchEvent(new PopStateEvent("popstate"));
    } else {
      toast.warning("Por favor, insira um ID válido");
    }
  }, [manualMotoristaId, buscarDadosPorMotorista]);

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: number): void => {
      setActiveTab(newValue);
    },
    []
  );

  const handleVincularMotorista = useCallback(
    async (motoristaId: string) => {
      if (!selectedTransportadora?.transportadoraId) {
        toast.error("Selecione uma transportadora primeiro");
        return;
      }

      try {
        setLoading(true);
        const result = await apiCall(
          "/vincularMotoristaTransportadora",
          "POST",
          {
            motoristaId: parseInt(motoristaId),
            transportadoraId: parseInt(
              String(selectedTransportadora.transportadoraId)
            ),
          }
        );

        if (result.returnCode === 200) {
          toast.success("Motorista vinculado com sucesso!");

          // Atualizar os dados do motorista atual se for o mesmo
          if (motoristaId === currentMotoristaId) {
            await buscarDetalhesMotorista(motoristaId);
          }

          // Atualizar detalhes da transportadora
          if (selectedTransportadora.transportadoraId) {
            await buscarDetalhesTransportadora(
              selectedTransportadora.transportadoraId
            );
          }

          // Atualizar lista de transportadoras
          await buscarTransportadorasParaFiltrar();
        } else {
          toast.error(result.returnMsg || "Erro ao vincular motorista");
        }
      } catch (error: any) {
        toast.error("Erro ao vincular motorista: " + error.message);
      } finally {
        setLoading(false);
      }
    },
    [
      selectedTransportadora,
      currentMotoristaId,
      apiCall,
      buscarDetalhesMotorista,
      buscarDetalhesTransportadora,
      buscarTransportadorasParaFiltrar,
    ]
  );

  // RENDERIZAÇÃO DAS TABS
  const renderTabContent = useMemo(() => {
    // Se ainda estiver carregando inicialmente
    const motoristaId = motoristaIdFromUrl || manualMotoristaId;

    // Se não houver motoristaId
    if (!motoristaId) {
      return (
        <>
          <ManualIdInput
            motoristaId={manualMotoristaId}
            setMotoristaId={setManualMotoristaId}
            onSearch={handleBuscarManual}
            loading={loading}
          />
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              Como usar este sistema
            </Typography>
            <Typography
              variant="body2"
              paragraph
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              Este sistema filtra automaticamente todos os dados com base no ID
              do motorista extraído da URL.
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              <strong>Opção 1:</strong> Acesse a página com o parâmetro na URL:
              <br />
              <code style={{ fontSize: "0.75rem" }}>
                https://seusite.com/verificacao?motoristaId=SEU_ID_AQUI
              </code>
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 1, fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              <strong>Opção 2:</strong> Use o campo acima para inserir
              manualmente o ID do motorista
            </Typography>
          </Alert>
        </>
      );
    }

    switch (activeTab) {
      case 0: // Visão Geral
        return (
          <>
            <MotoristaInfo
              motorista={transportData.motorista}
              onRefresh={() =>
                transportData.motorista?.motoristaId &&
                buscarDetalhesMotorista(
                  String(transportData.motorista.motoristaId)
                )
              }
              loading={loading}
              filteredTransportadoras={filteredTransportadoras}
              onViewTransportadora={() => {
                setActiveTab(4);
                if (
                  transportData.motorista?.empresaMotorista &&
                  filteredTransportadoras.length > 0
                ) {
                  const transportadoraVinculada = filteredTransportadoras.find(
                    (t) =>
                      t.nomeEmpresa?.toLowerCase() ===
                      transportData.motorista?.empresaMotorista?.toLowerCase()
                  );
                  if (transportadoraVinculada) {
                    setSelectedTransportadora(transportadoraVinculada);
                    setShowTransportadoraList(false);
                  }
                }
              }}
              camioes={camioesList}
              onViewCamioes={() => {
                setActiveTab(2);
              }}
            />

            <CargaInfo
              carga={transportData.carga}
              onRefresh={() =>
                transportData.carga?.codigo &&
                buscarDetalhesCarga(transportData.carga.codigo)
              }
              onCalculate={() =>
                transportData.carga?.codigo &&
                calcularCustosCarga(transportData.carga.codigo)
              }
              loading={loading}
            />
            <EmpresaInfo
              empresa={transportData.empresa}
              onRefresh={() =>
                transportData.empresa?.codigo &&
                buscarDetalhesEmpresa(transportData.empresa.codigo)
              }
              loading={loading}
              onMotoristaClick={handleMotoristaClick}
            />
            <TransportadoraInfo
              transportadora={transportData.transportadora}
              onRefresh={() =>
                transportData.transportadora?.transportadoraId &&
                buscarDetalhesTransportadora(
                  transportData.transportadora.transportadoraId
                )
              }
              loading={loading}
            />
            <FinanceiroInfo viagem={transportData.viagem} />
          </>
        );
      case 1: // Motorista
        return (
          <>
            <MotoristaInfo
              motorista={transportData.motorista}
              onRefresh={() =>
                transportData.motorista?.motoristaId &&
                buscarDetalhesMotorista(
                  String(transportData.motorista.motoristaId)
                )
              }
              loading={loading}
              filteredTransportadoras={filteredTransportadoras}
              onViewTransportadora={() => {
                // Função para navegar para a transportadora vinculada
                setActiveTab(4);
                if (
                  transportData.motorista?.empresaMotorista &&
                  filteredTransportadoras.length > 0
                ) {
                  const transportadoraVinculada = filteredTransportadoras.find(
                    (t) =>
                      t.nomeEmpresa?.toLowerCase() ===
                      transportData.motorista?.empresaMotorista?.toLowerCase()
                  );
                  if (transportadoraVinculada) {
                    setSelectedTransportadora(transportadoraVinculada);
                    setShowTransportadoraList(false);
                  }
                }
              }}
              camioes={camioesList}
              onViewCamioes={() => {
                setActiveTab(2);
              }}
            />
            <Box sx={{ mt: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
              >
                Resumo das Viagens
              </Typography>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Card>
                    <CardContent>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        Total de Viagens
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                      >
                        {transportData.motorista?.totalViagens || 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Card>
                    <CardContent>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        Cargas Ativas
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                      >
                        {
                          filteredCargas.filter(
                            (c) =>
                              c.status === "em_transito" ||
                              c.status === "planeada"
                          ).length
                        }
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Card>
                    <CardContent>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        Avaliação
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                      >
                        {transportData.motorista?.avaliacao?.toFixed(1) ||
                          "N/A"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </>
        );
      case 2: // Camioes
        return (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
              >
                Camiões do Motorista
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                paragraph
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              >
                {camioesList.length} camião(ões) encontrado(s) para o motorista{" "}
                {currentMotoristaId}
              </Typography>
            </Box>

            {/* Botões de navegação */}
            {!showCamiaoDetalhes && selectedCamiao && (
              <Box sx={{ mb: 3 }}>
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => {
                    setShowCamiaoDetalhes(true);
                  }}
                  sx={{ mr: 2 }}
                  size="small"
                >
                  Ver detalhes do camião
                </Button>
              </Box>
            )}

            {showCamiaoDetalhes && selectedCamiao && (
              <Box sx={{ mb: 3 }}>
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => {
                    setShowCamiaoDetalhes(false);
                  }}
                  sx={{ mr: 2 }}
                  size="small"
                >
                  Voltar para lista
                </Button>
              </Box>
            )}

            {/* Conteúdo principal */}
            {showCamiaoDetalhes ? (
              <CamiaoDetalhes
                camiao={selectedCamiao}
                onRefresh={() =>
                  currentMotoristaId &&
                  buscarCamioesPorMotorista(currentMotoristaId)
                }
                onClose={() => setShowCamiaoDetalhes(false)}
                loading={loading}
              />
            ) : (
              <>
                <CamioesLista
                  camioes={camioesList}
                  onSelectCamiao={(camiao) => {
                    setSelectedCamiao(camiao);
                    setShowCamiaoDetalhes(true);
                  }}
                  loading={loading}
                />

                {/* Estatísticas */}
                {camioesList.length > 0 && (
                  <Box sx={{ mt: 4 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                    >
                      Estatísticas da Frota
                    </Typography>
                    <Grid container spacing={1.5}>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <Card>
                          <CardContent>
                            <Typography
                              color="textSecondary"
                              gutterBottom
                              sx={{
                                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                              }}
                            >
                              Total de Camiões
                            </Typography>
                            <Typography
                              variant="h4"
                              sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                            >
                              {camioesList.length}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <Card>
                          <CardContent>
                            <Typography
                              color="textSecondary"
                              gutterBottom
                              sx={{
                                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                              }}
                            >
                              Camiões VIP
                            </Typography>
                            <Typography
                              variant="h4"
                              sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                            >
                              {
                                camioesList.filter(
                                  (c) => c.tipoGPS.tipo === "vip"
                                ).length
                              }
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <Card>
                          <CardContent>
                            <Typography
                              color="textSecondary"
                              gutterBottom
                              sx={{
                                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                              }}
                            >
                              Camiões Disponíveis
                            </Typography>
                            <Typography
                              variant="h4"
                              sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                            >
                              {
                                camioesList.filter(
                                  (c) => c.status === "disponivel"
                                ).length
                              }
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <Card>
                          <CardContent>
                            <Typography
                              color="textSecondary"
                              gutterBottom
                              sx={{
                                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                              }}
                            >
                              Inspeções Válidas
                            </Typography>
                            <Typography
                              variant="h4"
                              sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                            >
                              {
                                camioesList.filter((c) => c.inspecaoValida)
                                  .length
                              }
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {/* Botões de ação */}
                <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={() =>
                      currentMotoristaId &&
                      buscarCamioesPorMotorista(currentMotoristaId)
                    }
                    disabled={loading || !currentMotoristaId}
                    size="small"
                  >
                    Atualizar Lista
                  </Button>
                  {transportData.transportadora?.transportadoraId && (
                    <Button
                      variant="contained"
                      startIcon={<LocalShippingIcon />}
                      onClick={() => {
                        // Abrir modal para criar novo camião
                        toast.info(
                          "Funcionalidade para criar novo camião em desenvolvimento"
                        );
                      }}
                      size="small"
                    >
                      Novo Camião
                    </Button>
                  )}
                </Box>
              </>
            )}
          </>
        );
      case 3: // Empresas
        return (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
              >
                Entidades Relacionadas ao Motorista
              </Typography>

              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  Em nosso sistema, as &quot;empresas&quot; são registradas como{" "}
                  <strong>Clientes</strong> com categorias específicas.
                </Typography>
              </Alert>

              <Typography
                variant="body2"
                color="textSecondary"
                paragraph
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              >
                {filteredEmpresas.length} entidade(s) encontrada(s) relacionadas
                ao motorista {currentMotoristaId}
                {transportData.motorista?.empresaMotorista && (
                  <span>
                    <br />
                    Motorista trabalha para:{" "}
                    <strong>{transportData.motorista.empresaMotorista}</strong>
                  </span>
                )}
              </Typography>
            </Box>

            {filteredEmpresas.length === 0 ? (
              <Card sx={{ p: 3, textAlign: "center" }}>
                <BusinessIcon
                  sx={{
                    fontSize: { xs: 40, sm: 60 },
                    color: "text.secondary",
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                  Nenhuma entidade encontrada
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  paragraph
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  Não foram encontradas entidades (clientes) diretamente
                  relacionadas ao motorista {currentMotoristaId}
                </Typography>

                <Box sx={{ mt: 3 }}>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    O que isso significa?
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <InfoIcon color="info" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary="O motorista pode estar vinculado apenas a uma transportadora"
                        secondary={
                          <Button
                            size="small"
                            onClick={() => setActiveTab(4)}
                            startIcon={<TruckIcon />}
                          >
                            Ver Transportadoras
                          </Button>
                        }
                        primaryTypographyProps={{
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                        secondaryTypographyProps={{
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <InfoIcon color="info" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary="A empresa pode estar registrada como 'Cliente' no sistema"
                        secondary="Verifique se o nome da empresa existe na aba Clientes"
                        primaryTypographyProps={{
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                        secondaryTypographyProps={{
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <InfoIcon color="info" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary="O motorista pode ser independente"
                        secondary="Alguns motoristas trabalham como autônomos"
                        primaryTypographyProps={{
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                        secondaryTypographyProps={{
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        }}
                      />
                    </ListItem>
                  </List>
                </Box>
              </Card>
            ) : (
              <>
                <Grid container spacing={{ xs: 1.5, sm: 3 }} sx={{ mb: 3 }}>
                  {filteredEmpresas.slice(0, 3).map((empresa, index) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={index}>
                      <Card sx={{ height: "100%" }}>
                        <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                          <Box display="flex" alignItems="center" mb={2}>
                            <Avatar
                              sx={{
                                bgcolor: "primary.main",
                                mr: 2,
                                width: { xs: 40, sm: 48 },
                                height: { xs: 40, sm: 48 },
                              }}
                            >
                              {empresa.categoria === "Gestor" ? (
                                <CorporateIcon fontSize="small" />
                              ) : (
                                <BusinessIcon fontSize="small" />
                              )}
                            </Avatar>
                            <Box sx={{ overflow: "hidden" }}>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontSize: { xs: "1rem", sm: "1.125rem" },
                                }}
                              >
                                {empresa.nome}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{
                                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                }}
                              >
                                {empresa.codigo} • {empresa.categoria}
                              </Typography>
                            </Box>
                          </Box>

                          <Typography
                            variant="body2"
                            paragraph
                            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                          >
                            <strong>Segmento:</strong> {empresa.segmento}
                          </Typography>

                          <Typography
                            variant="body2"
                            paragraph
                            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                          >
                            <strong>Classificação:</strong>{" "}
                            {empresa.classificacao}
                          </Typography>

                          {empresa.contatoPrincipal && (
                            <Box sx={{ mb: 2 }}>
                              <Typography
                                variant="caption"
                                color="textSecondary"
                                sx={{
                                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                                }}
                              >
                                Contato principal:
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: { xs: "0.875rem", sm: "1rem" },
                                }}
                              >
                                {empresa.contatoPrincipal.nome} •{" "}
                                {empresa.contatoPrincipal.telefone}
                              </Typography>
                            </Box>
                          )}

                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mt={2}
                            flexWrap="wrap"
                            gap={1}
                          >
                            <StatusChip status={empresa.status} />
                            <Button
                              size="small"
                              endIcon={<ArrowIcon />}
                              onClick={() => {
                                // Abrir detalhes como empresa
                                openDetalhesEmpresa(empresa);
                              }}
                            >
                              Detalhes
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ mt: 3 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                  >
                    Todas as Entidades Relacionadas ({filteredEmpresas.length})
                  </Typography>
                  <List>
                    {filteredEmpresas.map((empresa, index) => (
                      <EmpresaCard
                        key={index}
                        empresa={empresa}
                        onSelect={(codigo) => {
                          const empresa = filteredEmpresas.find(
                            (e) => e.codigo === codigo
                          );
                          if (empresa) openDetalhesEmpresa(empresa);
                        }}
                      />
                    ))}
                  </List>
                </Box>

                <Box
                  sx={{
                    mt: 4,
                    p: 2,
                    bgcolor: "background.default",
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    Distribuição por Categoria:
                  </Typography>
                  <Grid container spacing={1.5}>
                    {(() => {
                      const categorias = filteredEmpresas.reduce(
                        (acc, empresa) => {
                          const cat = empresa.categoria || "Não especificada";
                          acc[cat] = (acc[cat] || 0) + 1;
                          return acc;
                        },
                        {} as Record<string, number>
                      );

                      return Object.entries(categorias).map(
                        ([categoria, count]) => (
                          <Grid size={{ xs: 12, sm: 6 }} key={categoria}>
                            <Paper sx={{ p: 2, textAlign: "center" }}>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                                }}
                              >
                                {count}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="textSecondary"
                                sx={{
                                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                                }}
                              >
                                {categoria}
                              </Typography>
                            </Paper>
                          </Grid>
                        )
                      );
                    })()}
                  </Grid>
                </Box>
              </>
            )}

            <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={buscarEmpresasParaFiltrar}
                disabled={loading}
                size="small"
              >
                Atualizar Lista
              </Button>

              <Button
                variant="text"
                startIcon={<BusinessIcon />}
                onClick={() => {
                  // Link para criar nova empresa (cliente)
                  toast.info(
                    "Para criar uma nova empresa, utilize o módulo de Clientes"
                  );
                }}
                sx={{ ml: 2 }}
                size="small"
              >
                Criar Nova Empresa
              </Button>
            </Box>
          </>
        );
      case 4: // Transportadoras
        return (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
              >
                Transportadoras
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  paragraph
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  {filteredTransportadoras.length} transportadora(s)
                  encontrada(s)
                </Typography>
              </Box>
            </Box>

            {/* Botões de navegação */}
            {!showTransportadoraList && selectedTransportadora && (
              <Box sx={{ mb: 3 }}>
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => {
                    setShowTransportadoraList(true);
                    setSelectedTransportadora(null);
                  }}
                  sx={{ mr: 2 }}
                  size="small"
                >
                  Voltar para lista
                </Button>
                <Button
                  variant="contained"
                  startIcon={<RefreshIcon />}
                  onClick={() =>
                    selectedTransportadora.transportadoraId &&
                    buscarDetalhesTransportadora(
                      selectedTransportadora.transportadoraId
                    )
                  }
                  disabled={loading}
                  size="small"
                >
                  Atualizar dados
                </Button>
              </Box>
            )}

            {/* Conteúdo principal */}
            {showTransportadoraList ? (
              <>
                <TransportadorasLista
                  transportadoras={filteredTransportadoras}
                  onSelectTransportadora={handleSelectTransportadora}
                  loading={loading}
                />
              </>
            ) : (
              <TransportadoraDetalhes
                transportadora={selectedTransportadora}
                onRefresh={() =>
                  selectedTransportadora?.transportadoraId &&
                  buscarDetalhesTransportadora(
                    selectedTransportadora.transportadoraId
                  )
                }
                onMotoristaClick={handleMotoristaClick}
                motoristaAtual={transportData.motorista}
                onVincularMotorista={handleVincularMotorista}
                loading={loading}
              />
            )}

            {/* Botões de ação */}
            <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={buscarTransportadorasParaFiltrar}
                disabled={loading}
                size="small"
              >
                Atualizar Lista
              </Button>
              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={() => {
                  // Lógica de filtro pode ser adicionada aqui
                }}
                size="small"
              >
                Filtrar
              </Button>
              {currentMotoristaId &&
                !transportData.motorista?.empresaMotorista && (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<LinkIcon />}
                    onClick={() => {
                      toast.info(
                        "Selecione uma transportadora para vincular o motorista atual"
                      );
                      setActiveTab(4); // Vai para a aba de transportadoras
                    }}
                    size="small"
                  >
                    Vincular Motorista Atual
                  </Button>
                )}
            </Box>
          </>
        );
      case 5: // Cargas
        return (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
              >
                Cargas do Motorista {currentMotoristaId}
              </Typography>

              {/* REMOVER ou MODIFICAR o botão de ver todas as cargas */}
              {currentMotoristaId && filteredCargas.length > 0 && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    Mostrando apenas as cargas do motorista ID:{" "}
                    <strong>{currentMotoristaId}</strong>
                    {transportData.motorista?.nome &&
                      ` - ${transportData.motorista.nome}`}
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<PeopleIcon />}
                    onClick={mostrarTodasCargas}
                    disabled={loading}
                    sx={{ mt: 1 }}
                  >
                    Ver todas as cargas do sistema
                  </Button>
                </Alert>
              )}

              {/* Controles de filtro e agrupamento */}
              <Grid container spacing={1.5} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Button
                      variant={mostrarAgrupadas ? "contained" : "outlined"}
                      onClick={() => {
                        if (!mostrarAgrupadas) {
                          // Agrupa as cargas quando ativa o modo agrupado
                          setCargasAgrupadas(
                            agruparCargasPorMotorista(filteredCargas)
                          );
                        }
                        setMostrarAgrupadas(!mostrarAgrupadas);
                      }}
                      startIcon={<PeopleIcon />}
                      size="small"
                    >
                      {mostrarAgrupadas
                        ? "Mostrar Lista"
                        : "Agrupar por Motorista"}
                    </Button>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    {mostrarAgrupadas
                      ? `${
                          Object.keys(cargasAgrupadas).length
                        } motorista(s) encontrado(s)`
                      : `${filteredCargas.length} carga(s) do motorista`}
                  </Typography>
                </Grid>
              </Grid>

              {/* Informação sobre o filtro atual */}
              {currentMotoristaId && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    Filtrado pelo motorista ID:{" "}
                    <strong>{currentMotoristaId}</strong>
                    {transportData.motorista?.nome &&
                      ` (${transportData.motorista.nome})`}
                  </Typography>
                </Alert>
              )}
            </Box>

            {/* Estatísticas quando mostrarAgrupadas estiver ativo */}
            {mostrarAgrupadas && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                  Estatísticas das Cargas do Motorista
                </Typography>
                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 12, sm: 3 }}>
                    <Paper sx={{ p: 2 }}>
                      <Typography
                        variant="h5"
                        color="primary"
                        sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                      >
                        {Object.values(cargasAgrupadas).reduce(
                          (acc, grupo) => acc + grupo.totalCargas,
                          0
                        )}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                      >
                        Total de Cargas
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 3 }}>
                    <Paper sx={{ p: 2 }}>
                      <Typography
                        variant="h5"
                        color="warning.main"
                        sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                      >
                        {
                          Object.values(cargasAgrupadas)
                            .flatMap((grupo) => grupo.cargas)
                            .filter((c) => {
                              const status = c.status;
                              return (
                                status === "atrasada" ||
                                (c.dataEntregaPrevista &&
                                  new Date(c.dataEntregaPrevista) <
                                    new Date() &&
                                  status !== "entregue")
                              );
                            }).length
                        }
                      </Typography>
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                      >
                        Cargas Atrasadas
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 3 }}>
                    <Paper sx={{ p: 2 }}>
                      <Typography
                        variant="h5"
                        color="success.main"
                        sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                      >
                        {formatCurrency(
                          Object.values(cargasAgrupadas).reduce(
                            (acc, grupo) => acc + grupo.totalValor,
                            0
                          )
                        )}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                      >
                        Valor Total
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 3 }}>
                    <Paper sx={{ p: 2 }}>
                      <Typography
                        variant="h5"
                        color="info.main"
                        sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                      >
                        {Object.values(cargasAgrupadas)
                          .reduce((acc, grupo) => acc + grupo.totalPeso, 0)
                          .toLocaleString()}{" "}
                        kg
                      </Typography>
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                      >
                        Peso Total
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Botões de navegação */}
            {!showCargaDetalhes && selectedCarga && (
              <Box sx={{ mb: 3 }}>
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => {
                    setShowCargaDetalhes(true);
                  }}
                  sx={{ mr: 2 }}
                  size="small"
                >
                  Ver detalhes da carga
                </Button>
              </Box>
            )}

            {showCargaDetalhes && selectedCarga && (
              <Box sx={{ mb: 3 }}>
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => {
                    setShowCargaDetalhes(false);
                  }}
                  sx={{ mr: 2 }}
                  size="small"
                >
                  Voltar para lista
                </Button>
              </Box>
            )}

            {/* Conteúdo principal */}
            {showCargaDetalhes ? (
              <CargaDetalhes
                carga={selectedCarga}
                onRefresh={() =>
                  selectedCarga?.codigo &&
                  buscarDetalhesCarga(selectedCarga.codigo)
                }
                onClose={() => setShowCargaDetalhes(false)}
                onCalculate={() =>
                  selectedCarga?.codigo &&
                  calcularCustosCarga(selectedCarga.codigo)
                }
                loading={loading}
              />
            ) : mostrarAgrupadas ? (
              // VISUALIZAÇÃO AGRUPADA POR MOTORISTA - APENAS O MOTORISTA DA URL
              <Box>
                {Object.entries(cargasAgrupadas)
                  .filter(([chave]) => {
                    // Filtra apenas o motorista atual (da URL)
                    const { id } = formatarNomeGrupo(chave);
                    return (
                      id === currentMotoristaId ||
                      id === String(currentMotoristaId)
                    );
                  })
                  .map(([chave, grupo]) => {
                    const { id, nome } = formatarNomeGrupo(chave);

                    return (
                      <Card key={chave} sx={{ mb: 3 }}>
                        <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                          {/* Cabeçalho do motorista */}
                          <Box display="flex" alignItems="center" mb={2}>
                            <Avatar
                              sx={{
                                bgcolor: "success.main",
                                mr: 2,
                                width: { xs: 36, sm: 40 },
                                height: { xs: 36, sm: 40 },
                              }}
                            >
                              {nome.charAt(0)}
                            </Avatar>
                            <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontSize: { xs: "1rem", sm: "1.125rem" },
                                }}
                              >
                                {nome}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{
                                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                }}
                              >
                                ID: {id} • {grupo.totalCargas} carga(s)
                              </Typography>
                            </Box>
                            <Chip
                              label={`${grupo.totalCargas} cargas`}
                              color="primary"
                              size="small"
                            />
                          </Box>

                          <Divider sx={{ my: 2 }} />

                          {/* Lista de cargas do motorista */}
                          {grupo.cargas.length > 0 ? (
                            <Grid container spacing={1.5}>
                              {grupo.cargas.map((carga, index) => (
                                <Grid size={{ xs: 12, sm: 6 }} key={index}>
                                  <Card
                                    variant="outlined"
                                    sx={{
                                      height: "100%",
                                      cursor: "pointer",
                                      "&:hover": {
                                        boxShadow: 2,
                                      },
                                    }}
                                    onClick={() => {
                                      setSelectedCarga(carga);
                                      setShowCargaDetalhes(true);
                                    }}
                                  >
                                    <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                                      <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                        sx={{
                                          fontSize: {
                                            xs: "0.875rem",
                                            sm: "1rem",
                                          },
                                        }}
                                      >
                                        {carga.codigo}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        paragraph
                                        sx={{
                                          fontSize: {
                                            xs: "0.75rem",
                                            sm: "0.875rem",
                                          },
                                        }}
                                      >
                                        {carga.descricao?.substring(0, 60)}...
                                      </Typography>

                                      <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                      >
                                        <StatusChip status={carga.status} />
                                        <Button
                                          size="small"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedCarga(carga);
                                            setShowCargaDetalhes(true);
                                          }}
                                          startIcon={<VisibilityIcon />}
                                        >
                                          Ver
                                        </Button>
                                      </Box>

                                      {/* Informações rápidas */}
                                      <Box sx={{ mt: 2 }}>
                                        <Grid container spacing={1}>
                                          <Grid size={{ xs: 6 }}>
                                            <Typography
                                              variant="caption"
                                              color="textSecondary"
                                              sx={{
                                                fontSize: {
                                                  xs: "0.7rem",
                                                  sm: "0.75rem",
                                                },
                                              }}
                                            >
                                              Peso
                                            </Typography>
                                            <Typography
                                              variant="body2"
                                              sx={{
                                                fontSize: {
                                                  xs: "0.875rem",
                                                  sm: "1rem",
                                                },
                                              }}
                                            >
                                              {(
                                                carga.pesoBruto || 0
                                              ).toLocaleString()}{" "}
                                              kg
                                            </Typography>
                                          </Grid>
                                          <Grid size={{ xs: 6 }}>
                                            <Typography
                                              variant="caption"
                                              color="textSecondary"
                                              sx={{
                                                fontSize: {
                                                  xs: "0.7rem",
                                                  sm: "0.75rem",
                                                },
                                              }}
                                            >
                                              Valor
                                            </Typography>
                                            <Typography
                                              variant="body2"
                                              sx={{
                                                fontSize: {
                                                  xs: "0.875rem",
                                                  sm: "1rem",
                                                },
                                              }}
                                            >
                                              {formatCurrency(
                                                carga.valorMercadoria || 0
                                              )}
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                      </Box>
                                    </CardContent>
                                  </Card>
                                </Grid>
                              ))}
                            </Grid>
                          ) : (
                            <Alert severity="info">
                              Este motorista não tem cargas atribuídas.
                            </Alert>
                          )}

                          {/* Resumo das cargas deste motorista */}
                          {grupo.cargas.length > 0 && (
                            <Box
                              sx={{
                                mt: 3,
                                p: 2,
                                bgcolor: "grey.50",
                                borderRadius: 1,
                              }}
                            >
                              <Grid container spacing={1.5}>
                                <Grid size={{ xs: 6, sm: 3 }}>
                                  <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    sx={{
                                      fontSize: { xs: "0.7rem", sm: "0.75rem" },
                                    }}
                                  >
                                    Peso Total
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      fontSize: { xs: "0.875rem", sm: "1rem" },
                                    }}
                                  >
                                    {grupo.totalPeso.toLocaleString()} kg
                                  </Typography>
                                </Grid>
                                <Grid size={{ xs: 6, sm: 3 }}>
                                  <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    sx={{
                                      fontSize: { xs: "0.7rem", sm: "0.75rem" },
                                    }}
                                  >
                                    Valor Total
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      fontSize: { xs: "0.875rem", sm: "1rem" },
                                    }}
                                  >
                                    {formatCurrency(grupo.totalValor)}
                                  </Typography>
                                </Grid>
                                <Grid size={{ xs: 6, sm: 3 }}>
                                  <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    sx={{
                                      fontSize: { xs: "0.7rem", sm: "0.75rem" },
                                    }}
                                  >
                                    Em Trânsito
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      fontSize: { xs: "0.875rem", sm: "1rem" },
                                    }}
                                  >
                                    {
                                      grupo.cargas.filter(
                                        (c) =>
                                          c.status === "em_transito" ||
                                          c.status === "em_viagem"
                                      ).length
                                    }
                                  </Typography>
                                </Grid>
                                <Grid size={{ xs: 6, sm: 3 }}>
                                  <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    sx={{
                                      fontSize: { xs: "0.7rem", sm: "0.75rem" },
                                    }}
                                  >
                                    Entregues
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      fontSize: { xs: "0.875rem", sm: "1rem" },
                                    }}
                                  >
                                    {
                                      grupo.cargas.filter(
                                        (c) => c.status === "entregue"
                                      ).length
                                    }
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}

                {Object.entries(cargasAgrupadas).filter(([chave]) => {
                  const { id } = formatarNomeGrupo(chave);
                  return (
                    id === currentMotoristaId ||
                    id === String(currentMotoristaId)
                  );
                }).length === 0 && (
                  <Alert severity="info">
                    Nenhuma carga encontrada para o motorista ID:{" "}
                    {currentMotoristaId}
                  </Alert>
                )}
              </Box>
            ) : (
              // VISUALIZAÇÃO NORMAL EM LISTA - APENAS CARGAS DO MOTORISTA
              <>
                {filteredCargas.length > 0 ? (
                  <>
                    <CargasLista
                      cargas={filteredCargas}
                      onSelectCarga={(carga) => {
                        setSelectedCarga(carga);
                        setShowCargaDetalhes(true);
                      }}
                      loading={loading}
                    />

                    {/* Estatísticas */}
                    <Box sx={{ mt: 4 }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                      >
                        Estatísticas das Cargas
                      </Typography>
                      <Grid container spacing={1.5}>
                        <Grid size={{ xs: 12, sm: 3 }}>
                          <Card>
                            <CardContent>
                              <Typography
                                color="textSecondary"
                                gutterBottom
                                sx={{
                                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                }}
                              >
                                Total de Cargas
                              </Typography>
                              <Typography
                                variant="h4"
                                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                              >
                                {filteredCargas.length}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 3 }}>
                          <Card>
                            <CardContent>
                              <Typography
                                color="textSecondary"
                                gutterBottom
                                sx={{
                                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                }}
                              >
                                Em Trânsito
                              </Typography>
                              <Typography
                                variant="h4"
                                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                              >
                                {
                                  filteredCargas.filter(
                                    (c) =>
                                      c.status === "em_transito" ||
                                      c.status === "em_viagem"
                                  ).length
                                }
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 3 }}>
                          <Card>
                            <CardContent>
                              <Typography
                                color="textSecondary"
                                gutterBottom
                                sx={{
                                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                }}
                              >
                                Valor Total
                              </Typography>
                              <Typography
                                variant="h4"
                                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                              >
                                {formatCurrency(
                                  filteredCargas.reduce(
                                    (acc, c) => acc + (c.valorMercadoria || 0),
                                    0
                                  )
                                )}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 3 }}>
                          <Card>
                            <CardContent>
                              <Typography
                                color="textSecondary"
                                gutterBottom
                                sx={{
                                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                }}
                              >
                                Peso Total
                              </Typography>
                              <Typography
                                variant="h4"
                                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                              >
                                {filteredCargas
                                  .reduce(
                                    (acc, c) => acc + (c.pesoBruto || 0),
                                    0
                                  )
                                  .toLocaleString()}{" "}
                                kg
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                    </Box>
                  </>
                ) : (
                  <Alert severity="info">
                    Nenhuma carga encontrada para o motorista ID:{" "}
                    {currentMotoristaId}
                  </Alert>
                )}

                {/* Botões de ação */}
                <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={buscarCargasParaFiltrar}
                    disabled={loading}
                    size="small"
                  >
                    Atualizar Lista
                  </Button>
                  {filteredCargas.length > 0 && transportData.carga?.codigo && (
                    <Button
                      variant="contained"
                      startIcon={<MoneyIcon />}
                      onClick={() =>
                        calcularCustosCarga(transportData.carga!.codigo!)
                      }
                      disabled={loading}
                      size="small"
                    >
                      Calcular Custos da Carga Atual
                    </Button>
                  )}
                </Box>
              </>
            )}
          </>
        );

      default:
        return (
          <Alert severity="info">Conteúdo da aba em desenvolvimento</Alert>
        );
    }
  }, [
    activeTab,
    transportData,
    filteredCargas,
    motoristaIdFromUrl,
    manualMotoristaId,
    initialLoad,
    loading,
    handleBuscarManual,
    buscarDetalhesMotorista,
    buscarDetalhesCarga,
    calcularCustosCarga,
    buscarDetalhesEmpresa,
    buscarDetalhesTransportadora,
    buscarDetalhesCliente,
    camioesList,
    selectedCamiao,
    showCamiaoDetalhes,
    buscarCamioesPorMotorista,
    filteredTransportadoras,
    filteredEmpresas,
    filteredClientes,
  ]);

  return (
    <Container maxWidth={false} sx={{ 
      mt: { xs: 1, sm: 2, md: 4 }, 
      mb: { xs: 2, sm: 3, md: 4 },
      px: { xs: 1, sm: 2, md: 3 }
    }}>
      {/* Loading Indicator */}
      {loading && !initialLoad && <LinearProgress sx={{ mb: 2 }} />}

      <Paper sx={{ 
        p: { xs: 1.5, sm: 2, md: 3 }, 
        position: "relative",
        overflow: 'hidden'
      }}>
        {/* Header */}
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          mb={3}
          gap={{ xs: 2, sm: 0 }}
        >
          <Box>
            <Typography variant="h4" sx={{ 
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' },
              fontWeight: 600
            }}>
              Sistema de Verificação
            </Typography>
            {currentMotoristaId ? (
              <Typography variant="subtitle1" color="textSecondary" sx={{
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}>
                Motorista: <strong>{currentMotoristaId}</strong>
                {transportData.motorista?.nome &&
                  ` - ${transportData.motorista.nome}`}
              </Typography>
            ) : (
              <Typography variant="subtitle1" color="textSecondary">
                Insira o ID do motorista para filtrar os dados
              </Typography>
            )}
          </Box>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={() =>
              currentMotoristaId && buscarDadosPorMotorista(currentMotoristaId)
            }
            disabled={loading || !currentMotoristaId}
            sx={{ 
              width: { xs: '100%', sm: 'auto' },
              mt: { xs: 1, sm: 0 }
            }}
          >
            Atualizar
          </Button>
        </Box>

        {/* Manual Input para mobile */}
        {!currentMotoristaId && (
          <Box sx={{ mb: 3, display: { xs: 'block', md: 'none' } }}>
            <ManualIdInput
              motoristaId={manualMotoristaId}
              setMotoristaId={setManualMotoristaId}
              onSearch={handleBuscarManual}
              loading={loading}
            />
          </Box>
        )}

        {/* Tabs - Otimizadas para mobile */}
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: "divider", 
          mb: 3,
          overflowX: 'auto',
          '& .MuiTabs-scroller': {
            overflow: 'auto !important'
          }
        }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              minHeight: { xs: 48, sm: 64 },
              '& .MuiTab-root': {
                minHeight: { xs: 48, sm: 64 },
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                padding: { xs: '8px 12px', sm: '12px 16px' }
              }
            }}
          >
            {TABS.map((tab, index) => (
              <Tab
                key={index}
                label={<span style={{ whiteSpace: 'nowrap' }}>{tab.label}</span>}
                icon={React.cloneElement(tab.icon, { 
                  sx: { fontSize: { xs: 16, sm: 20 } } 
                })}
                iconPosition="start"
                disabled={loading || !currentMotoristaId}
              />
            ))}
          </Tabs>
        </Box>

        {/* Content */}
        <Box sx={{ 
          maxWidth: '100%',
          overflow: 'hidden'
        }}>
          {renderTabContent}
        </Box>
      </Paper>

      <DetalhesCompletosModal
        open={detalhesCompletosOpen}
        onClose={() => setDetalhesCompletosOpen(false)}
        title={detalhesTitulo}
      >
        {detalhesConteudo}
      </DetalhesCompletosModal>
    </Container>
  );
}

function Verificacao() {
  return (
    <Suspense fallback={
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Carregando...</Typography>
      </Container>
    }>
      <VerificacaoContent />
    </Suspense>
  );
}

export default Verificacao;
