// src/models/contasReceberTypes.ts

// Enums
export enum ActiveTab {
  DASHBOARD = 'dashboard',
  FATURAS = 'faturas',
  RECEBIMENTOS = 'recebimentos',
  GRAFICOS = 'graficos',
  RELATORIOS = 'relatorios'
}

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
  MBIZ = 'mbiz'
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

// Interfaces principais
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

export interface FaturaDetalhada {
  faturaId: string;
  numeroFatura: string;
  clienteId: string;
  cliente: ClienteDetalhado;
  valorTotal: number;
  valorPendente: number;
  dataEmissao: string;
  dataVencimento: string;
  descricaoServico: string;
  status: StatusFatura;
  observacoes?: string;
  recebimentos: RecebimentoDetalhado[];
  createdAt: string;
  updatedAt: string;
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

export interface FormRecebimento {
  faturaId: string;
  valor: string;
  dataRecebimento: string;
  formaPagamento: FormaPagamento;
  comprovante: string;
  observacoes: string;
}

export interface NovaFaturaData {
  numeroFatura: string;
  clienteId: string;
  cliente: {
    nome: string;
    email: string;
    telefone: string;
  };
  valorTotal: number;
  dataVencimento: string;
  descricaoServico: string;
  observacoes?: string;
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

// Utilitários
export interface StatusInfo {
  texto: string;
  cor: string;
}

// Valores padrão
export const dashboardDataDefault: DashboardData = {
  estatisticas: {
    valorPendente: 0,
    faturasPendentes: 0,
    valorVencido: 0,
    faturasVencidas: 0,
    valorAReceber7Dias: 0,
    totalRecebidoMes: 0
  },
  faturasVencidas: [],
  proximosVencimentos: [],
  clientesPrincipais: [],
  distribuicaoStatus: [],
  recebimentosMes: {
    totalRecebido: 0,
    countRecebimentos: 0,
    recebimentosDiarios: []
  }
};

export const filtrosFaturasDefault: FaturaFiltros = {
  curPage: 1,
  pageSize: 10,
  status: undefined,
  clienteId: '',
  dataInicio: '',
  dataFim: ''
};

export const formRecebimentoDefault: FormRecebimento = {
  faturaId: '',
  valor: '',
  dataRecebimento: new Date().toISOString().split('T')[0],
  formaPagamento: '' as FormaPagamento,
  comprovante: '',
  observacoes: ''
};