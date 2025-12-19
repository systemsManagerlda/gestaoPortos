/* eslint-disable @typescript-eslint/no-explicit-any */
import { SvgIconProps } from "@mui/material/SvgIcon";

// API base URL
export const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

export interface GrupoCargas {
  motoristaId: string;
  motoristaNome: string;
  cargas: CargaData[];
  totalCargas: number;
  totalPeso: number;
  totalValor: number;
}

export type CargasAgrupadas = Record<string, GrupoCargas>;

// Interface CargaData completa
export interface CargaData {
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

export interface ContatoCompleto {
  nome: string;
  cargo?: string;
  telefone?: string;
  email?: string;
  principal?: boolean;
}

export interface VeiculoHabilitado {
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

export interface MotoristaData {
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

export interface Contact {
  _id?: string;
  id?: string;
  nome?: string;
  cargo?: string;
  telefone?: string;
  email?: string;
  principal?: boolean;
  departamento?: string;
}

export interface Endereco {
  cidade?: string;
  rua?: string;
  bairro?: string;
  provincia?: string;
}

export interface Seguro {
  premioFinal?: number;
  valorSegurado?: number;
  statusSeguro?: string;
}

export interface Passaporte {
  numero?: string;
  validade?: string;
}

export interface CartaConducao {
  numero?: string;
  categoria?: string;
  validade?: string;
}

export interface Fretes {
  freteIda?: number;
  freteVolta?: number;
  distancia?: number;
  percentual?: number;
}

export interface ViagemData {
  fretes?: Fretes;
  comissao?: number;
  seguroCarga?: number;
  seguroVeiculo?: number;
  valorTotal?: number;
  margemLucro?: number;
}

export interface EmpresaData {
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

export interface TransportadoraData {
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

export interface ClienteData {
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

export interface ApiResponse {
  returnCode: number;
  returnMsg?: string;
  data?: any;
  list?: any[];
}

export interface TransportData {
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

export type StatusColor = "success" | "warning" | "info" | "error" | "default";

export interface CamiaoData {
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

export interface ManualIdInputProps {
  motoristaId: string;
  setMotoristaId: (id: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export interface InfoCardProps {
  title: string;
  icon: React.ReactElement;
  children: React.ReactNode;
  onRefresh?: () => void;
  refreshDisabled?: boolean;
}

export interface StatusVinculacaoProps {
  motorista: MotoristaData | null;
  transportadoras: TransportadoraData[];
  onNavigate?: (tab: number) => void;
}

export interface DetalhesCompletosModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}