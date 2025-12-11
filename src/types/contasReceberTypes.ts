// models/contasReceberTypes.ts

import { FaturaDetalhada, RelatorioData, StatusFatura, TipoRelatorio } from './apiTypes';
import { ActiveTab, ContasReceberState } from './componentTypes';

// Props do componente principal (pode ser expandido se necessário)
export interface ContasReceberProps {
  // Adicione props se necessário no futuro
  initialTab?: ActiveTab;
}

// Context types (se for usar Context API)
export interface ContasReceberContextType {
  state: ContasReceberState;
  actions: {
    setActiveTab: (tab: ActiveTab) => void;
    fetchDashboardData: () => Promise<void>;
    fetchFaturas: () => Promise<void>;
    registrarRecebimento: (e: React.FormEvent) => Promise<void>;
    fetchFaturaDetail: (faturaId: string) => Promise<void>;
    criarNovaFatura: (faturaData: NovaFaturaData) => Promise<FaturaDetalhada | null>;
    atualizarStatusFatura: (faturaId: string, status: StatusFatura) => Promise<boolean>;
    gerarRelatorio: (tipoRelatorio: TipoRelatorio, dataInicio: string, dataFim: string) => Promise<RelatorioData | null>;
  };
}

// Tipos para criação de nova fatura
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

// Event types
export type FormChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;