/* eslint-disable @typescript-eslint/no-explicit-any */
export enum TipoFornecedor {
  COMBUSTIVEL = "combustivel",
  MANUTENCAO = "manutencao",
  SEGURO = "seguro",
  SERVICO = "servico",
  IMPOSTO = "imposto",
  OUTRO = "outro"
}

export enum TipoConta {
  FATURA = "fatura",
  RECIBO = "recibo",
  NOTA_CREDITO = "nota_credito",
  DEBITO = "debito",
  SALARIO = "salario",
  IMPOSTO = "imposto",
  OUTRO = "outro"
}

export enum CategoriaConta {
  COMBUSTIVEL = "combustivel",
  MANUTENCAO = "manutencao",
  SALARIOS = "salarios",
  SEGUROS = "seguros",
  IMPOSTOS = "impostos",
  PORTAGENS = "portagens",
  ALIMENTACAO = "alimentacao",
  ESTACIONAMENTO = "estacionamento",
  OPERACIONAL = "operacional",
  OUTRO = "outro"
}

export enum StatusConta {
  PENDENTE = "pendente",
  VENCIDO = "vencido",
  PAGO_PARCIAL = "pago_parcial",
  PAGO = "pago",
  CANCELADO = "cancelado",
  CONTESTADO = "contestado"
}

export enum PrioridadeConta {
  BAIXA = "baixa",
  MEDIA = "media",
  ALTA = "alta",
  URGENTE = "urgente"
}

export enum TipoIVA {
  INCLUSO = "incluso",
  EXENTO = "exento",
  NAO_APLICAVEL = "nao_aplicavel"
}

export enum FormaPagamentoTipo {
  TRANSFERENCIA = "transferencia",
  MULTICAIXA = "multicaixa",
  DINHEIRO = "dinheiro",
  CHEQUE = "cheque",
  DEBITO_DIRETO = "debito_direto",
  OUTRO = "outro"
}

export enum CentroCustoTipo {
  OPERACIONAL = "operacional",
  ADMINISTRATIVO = "administrativo",
  COMERCIAL = "comercial",
  RH = "rh",
  MANUTENCAO = "manutencao",
  OUTRO = "outro"
}

export enum StatusAprovacao {
  PENDENTE = "pendente",
  APROVADO = "aprovado",
  REJEITADO = "rejeitado",
  EM_ANALISE = "em_analise"
}

export enum NivelAprovacao {
  GERENTE = "gerente",
  FINANCEIRO = "financeiro",
  DIRETOR = "diretor",
  PROPRIETARIO = "proprietario"
}

export interface CreateContaPagarModel {
  contaId?: string;
  numeroConta?: string;
  referencia?: string;
  fornecedorId: string;
  fornecedor: {
    nome: string;
    nuit: string;
    email?: string;
    telefone?: string;
    endereco?: string;
    contacto?: string;
    empresa?: string;
    tipoFornecedor?: TipoFornecedor;
  };
  tipoConta: TipoConta;
  categoria: CategoriaConta;
  valorOriginal: number;
  valorPendente?: number;
  valorPago?: number;
  jurosMulta?: number;
  desconto?: number;
  iva?: {
    tipo?: TipoIVA;
    percentual?: number;
    valor?: number;
    baseCalculo?: number;
  };
  dataEmissao: string;
  dataVencimento: string;
  dataPagamento?: string;
  status?: StatusConta;
  prioridade?: PrioridadeConta;
  formaPagamento?: {
    tipo?: FormaPagamentoTipo;
    detalhes?: string;
    numeroComprovante?: string;
    contaBancaria?: string;
  };
  descricao: string;
  observacoes?: string;
  numeroDocumento?: string;
  serieDocumento?: string;
  parcelado?: boolean;
  parcelas?: any[];
  centroCusto?: {
    tipo?: CentroCustoTipo;
    departamento?: string;
    projeto?: string;
    veiculoId?: string;
    motoristaId?: string;
  };
  aprovacao?: {
    status?: StatusAprovacao;
    aprovadoPor?: string;
    dataAprovacao?: string;
    nivelAprovacao?: NivelAprovacao;
    observacoesAprovacao?: string;
  };
  anexos?: any[];
  historicoStatus?: any[];
  historicoAlteracoes?: any[];
  notificacoes?: any[];
  criadoPor: string;
  atualizadoPor?: string;
  responsavelPagamento?: string;
  tags?: string[];
  dataCriacao?: string;
  dataAtualizacao?: string;
  dataCancelamento?: string;
  motivoCancelamento?: string;
}

export interface FilterContasPagarModel {
  curPage?: number;
  pageSize?: number;
  numeroConta?: string;
  fornecedorId?: string;
  fornecedorNome?: string;
  fornecedorNuit?: string;
  apenasPendentes: boolean;
  status?: StatusConta;
  categoria?: CategoriaConta;
  prioridade?: PrioridadeConta;
  dataVencimentoInicio?: string;
  dataVencimentoFim?: string;
  dataEmissaoInicio?: string;
  dataEmissaoFim?: string;
  valorMin?: number;
  valorMax?: number;
  centroCusto?: string;
  exibirVencidas?: boolean;
  exibirPagas?: boolean;
}

export interface RegistrarPagamentoModel {
  contaId: string;
  valor: number;
  dataPagamento?: string;
  formaPagamento?: string;
  numeroComprovante?: string;
  observacoes?: string;
  usuario: string;
}

export interface ContaPagarListResponse {
  list: CreateContaPagarModel[];
  totalCount: number;
  totalPage: number;
  curPage: number;
  pageSize: number;
}

export interface ApiResponse<T = any> {
  returnCode: number;
  returnMsg: string;
  data?: T;
}

export interface DashboardResponse {
  estatisticas: any;
  contasVencidas: CreateContaPagarModel[];
  proximosVencimentos: CreateContaPagarModel[];
  porCategoria: any[];
  porFornecedor: any[];
  evolucaoMensal: any[];
  topFornecedoresPendente: any[];
  vencimentosEstaSemana: CreateContaPagarModel[];
  periodoMeses: number;
}