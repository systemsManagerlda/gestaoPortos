// models/apiTypes.ts

// Tipo base para respostas da API
export interface ApiResponse<T> {
  returnCode: number;
  returnMsg?: string;
  data: T;
}

// Dashboard
export interface DashboardData {
  estatisticas: EstatisticasDashboard;
  faturasVencidas: FaturaResumo[];
  proximosVencimentos: FaturaResumo[];
  clientesPrincipais: ClientePrincipal[];
  distribuicaoStatus: DistribuicaoStatus[];
  recebimentosMes: RecebimentosMes;
}

export interface EstatisticasDashboard {
  valorPendente: number;
  faturasPendentes: number;
  valorVencido: number;
  faturasVencidas: number;
  valorAReceber7Dias: number;
  totalRecebidoMes: number;
}

export interface FaturaResumo {
  faturaId: string;
  numeroFatura: string;
  cliente: ClienteInfo;
  valorTotal: number;
  valorPendente: number;
  dataVencimento: string;
  status: StatusFatura;
  recebimentos?: RecebimentoResumo[];
}

export interface ClienteInfo {
  id?: string;
  nome: string;
  email?: string;
  telefone?: string;
}

export interface ClientePrincipal {
  clienteId: string;
  nomeCliente: string;
  totalValor: number;
  faturasPendentes: number;
}

export interface DistribuicaoStatus {
  status: StatusFatura;
  valor: number;
  porcentagem: number;
  quantidade: number;
}

export interface RecebimentosMes {
  totalRecebido: number;
  countRecebimentos: number;
  recebimentosDiarios: RecebimentoDia[];
}

export interface RecebimentoDia {
  data: string;
  valor: number;
  quantidade: number;
}

// Faturas
export interface FaturaListResponse {
  list: FaturaDetalhada[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface FaturaDetalhada {
  _id?: string;
  faturaId: string;
  numeroFatura: string;
  clienteId: string;
  notas?: string;
  cliente: {
    nome: string;
    nif?: string;
    email?: string;
    telefone?: string;
    endereco?: string;
  };
  
  // NOVOS CAMPOS ADICIONADOS:
  nomeEmpresa?: string;
  tipoServico?: "transporte" | "armazenagem" | "logistica" | "outro";
  descricaoServico?: string;
  referencia?: string;
  
  // Campos de valores
  valorTotal: number;
  subtotal?: number;
  totalComIVA?: number;
  moeda?: "MZN" | "USD" | "EUR";
  valorRecebido?: number;
  valorPendente?: number;
  
  // Datas
  dataEmissao: string;
  dataVencimento: string;
  dataRecebimento?: string;
  dataCriacao?: string;
  dataAtualizacao?: string;
  
  // Status e pagamento
  status: StatusFatura;
  formaPagamento?: FormaPagamento;
  
  // Itens da fatura
  itensFatura?: Array<{
    id: number;
    descricao: string;
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
    tipo?: string;
    categoriaSeguro?: string;
  }>;
  
  // Tributação
  iva?: {
    tipo?: "incluso" | "exento" | "nao_aplicavel";
    percentual?: number;
    valor?: number;
    baseCalculo?: number;
  };
  
  // Relacionamentos com carga
  origem?: "CARGA" | "MANUAL";
  codigoCarga?: string;
  tipoCarga?: string;
  naturezaCarga?: string;
  categoriaSeguro?: string;
  abrangenciaSeguro?: string;
  tipoPercurso?: string;
  destinoFrete?: string;
  pesoBruto?: number;
  valorMercadoria?: number;
  fretes?: {
    freteIda: number;
    freteVolta: number;
    distancia: number;
    percentual: number;
  };
  comissaoCalculada?: number;
  premioSeguro?: number;
  
  // Campos existentes mantidos
  viagemId?: number;
  cargaId?: string;
  transportadoraId?: number;
  
  // Recebimentos
  recebimentos: RecebimentoDetalhado[];
  
  // Histórico e notificações
  historicoStatus?: Array<{
    status: string;
    data: string;
    observacoes?: string;
  }>;
  notificacoes?: {
    avisoVencimento?: boolean;
    diasAntes?: number;
    avisosEnviados?: Array<{
      tipo?: string;
      data?: string;
      metodo?: string;
    }>;
  };
  
  // Documentação
  documentos?: {
    recibo?: string;
    contrato?: string;
    outros?: string[];
  };
  anexos?: Array<{
    nome?: string;
    tipo?: string;
    url?: string;
    dataUpload?: string;
  }>;
  
  // Metadados
  observacoes?: string;
  criadoPor?: string;
  atualizadoPor?: string;
  categoria?: "transporte" | "servico" | "produto" | "outro";
  
  // Campos virtuais/calculados
  calculos?: {
    diasAteVencimento?: number;
    vencida?: boolean;
    calcularPendente?: number;
    percentualPago?: number;
    calcularSubtotal?: number;
  };
}


export interface ClienteDetalhado {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  endereco?: string;
  nif?: string;
}

export interface RecebimentoResumo {
  id: string;
  valor: number;
  data: string;
  formaPagamento: FormaPagamento;
  status: StatusRecebimento;
}

export interface RecebimentoDetalhado {
  id: string;
  faturaId: string;
  valor: number;
  data: string;
  formaPagamento: FormaPagamento;
  comprovante: string;
  observacoes: string;
  status: StatusRecebimento;
  usuarioRegistro?: string;
  createdAt: string;
}

export interface FaturaFiltros {
  curPage: number;
  pageSize: number;
  status?: StatusFatura;
  clienteId?: string;
  dataInicio?: string;
  dataFim?: string;
  numeroFatura?: string;
}

// Recebimentos
export interface RegistroRecebimentoRequest {
  faturaId: string;
  recebimentoData: {
    valor: number;
    formaPagamento: FormaPagamento;
    comprovante?: string;
    observacoes?: string;
  };
}

export interface FormRecebimento {
  faturaId: string;
  valor: string;
  dataRecebimento: string;
  formaPagamento: FormaPagamento;
  comprovante: string;
  observacoes: string;
}

// Relatórios
export interface RelatorioRequest {
  tipoRelatorio: TipoRelatorio;
  dataInicio: string;
  dataFim: string;
}

export interface RelatorioData {
  tipoRelatorio: TipoRelatorio;
  periodo: {
    inicio: string;
    fim: string;
  };
  totais: RelatorioTotais;
  detalhes: RelatorioDetalhe[];
}

export interface RelatorioTotais {
  totalFaturas: number;
  totalValor: number;
  totalRecebido: number;
  totalPendente: number;
  mediaAtraso: number;
}

export interface RelatorioDetalhe {
  cliente: string;
  faturas: number;
  valorTotal: number;
  valorRecebido: number;
  valorPendente: number;
  diasAtrasoMedio: number;
}

// Enums
export enum StatusFatura {
  PENDENTE = 'pendente',
  VENCIDA = 'vencida',
  PARCIAL = 'parcial',
  PAGA = 'paga'
}

export enum FormaPagamento {
  TRANSFERENCIA = 'transferencia',
  MULTICAIXA = 'multicaixa',
  DINHEIRO = 'dinheiro',
  CHEQUE = 'cheque',
}

export enum StatusRecebimento {
  PENDENTE = 'pendente',
  CONFIRMADO = 'confirmado',
  CANCELADO = 'cancelado',
  ESTORNADO = 'estornado'
}

export enum TipoRelatorio {
  FLUXO_CAIXA = 'fluxo_caixa',
  INADIMPLENCIA = 'inadimplencia',
  POR_CLIENTE = 'por_cliente',
  FATURAS_PENDENTES = 'faturas_pendentes',
  RECEBIMENTOS_CLIENTE = 'recebimentos_cliente'
}