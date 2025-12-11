// models/componentTypes.ts

import { ClientePrincipal, DashboardData, EstatisticasDashboard, FaturaDetalhada, FaturaFiltros, FaturaResumo, FormRecebimento, RecebimentoDetalhado } from "./apiTypes";

// Estado principal do componente
export interface ContasReceberState {
  activeContasReceber: ActiveTab;
  loading: boolean;
  error: string | null;
  
  // Dashboard
  dashboardData: DashboardData;
  
  // Faturas
  faturas: FaturaDetalhada[];
  filtrosFaturas: FaturaFiltros;
  
  // Recebimentos
  formRecebimento: FormRecebimento;
  faturaSelecionada: FaturaDetalhada | null;
  historicoRecebimentos: RecebimentoDetalhado[];
}

// Tabs de navegação
export enum ActiveTab {
  DASHBOARD = 'dashboard',
  FATURAS = 'faturas',
  RECEBIMENTOS = 'recebimentos',
  GRAFICOS = 'graficos',
  RELATORIOS = 'relatorios'
}

// Props para componentes internos
export interface DashboardMetricsProps {
  estatisticas: EstatisticasDashboard;
  faturasVencidas: FaturaResumo[];
  proximosVencimentos: FaturaResumo[];
  clientesPrincipais: ClientePrincipal[];
  formatarMoeda: (valor: number) => string;
  calcularDiasVencimento: (dataVencimento: string) => number;
}

export interface FaturaCardProps {
  fatura: FaturaDetalhada;
  formatarMoeda: (valor: number) => string;
  obterStatusFatura: (fatura: FaturaDetalhada) => StatusInfo;
  onReceberClick: (faturaId: string) => void;
  onDetalhesClick: (faturaId: string) => void;
}

export interface RecebimentoFormProps {
  formData: FormRecebimento;
  faturas: FaturaDetalhada[];
  faturaSelecionada: FaturaDetalhada | null;
  loading: boolean;
  onFaturaChange: (faturaId: string) => void;
  onFormChange: (field: keyof FormRecebimento, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

// Utilitários
export interface StatusInfo {
  texto: string;
  cor: string;
}

// Tipos para funções utilitárias
export type MoedaFormatter = (valor: number) => string;
export type DiasVencimentoCalculator = (dataVencimento: string) => number;
export type StatusFaturaGetter = (fatura: FaturaDetalhada | FaturaResumo) => StatusInfo;