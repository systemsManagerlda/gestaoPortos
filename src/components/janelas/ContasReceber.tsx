/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DashboardData,
  FaturaDetalhada,
  FaturaFiltros,
  FormaPagamento,
  RecebimentoDetalhado,
  RelatorioData,
  StatusFatura,
  StatusRecebimento,
  TipoRelatorio,
  FormRecebimento,
} from "@/types/apiTypes";
import { ActiveTab, StatusInfo } from "@/types/componentTypes";
import React, { useState, useEffect } from "react";
import {
  gerarPDFFaturaCompleta,
  gerarReciboCompleto,
  gerarPDFCotacaoCompleta, // Novo import
  CotacaoDetalhada // Importe o tipo
} from "@/context/pdfGenerator";

// Constante da URL da API
const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

// Interface para o cliente
interface Cliente {
  _id: string;
  codigo: string;
  nome: string;
  nuit: string;
  email: string;
  telefone: string;
  categoria: "Gestor" | "Cliente" | "Motorista";
  contatos?: Array<{
    nome: string;
    email: string;
    telefone: string;
    principal?: boolean;
  }>;
}

// Interface para item da fatura baseado na carga
interface ItemFatura {
  id: number;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  tipo: string;
  categoriaSeguro?: string;
}

// Interface para nova fatura baseada no schema de carga
interface NovaFaturaData {
  faturaId: string;
  numeroFatura: string;
  clienteId: string;
  cliente: {
    nome: string;
    nif?: string;
    email: string;
    telefone: string;
    endereco?: string;
  };
  valorTotal: number;
  dataVencimento: string;
  descricaoServico: string;
  tipoServico: "transporte" | "armazenagem" | "logistica" | "outro";
  status?: "pendente" | "vencida" | "paga" | "parcial" | "cancelada";
  moeda?: "MZN" | "USD" | "EUR";
  dataEmissao?: string;
  referencia?: string;
  itensFatura: ItemFatura[];
  iva?: {
    tipo?: "incluso" | "exento" | "nao_aplicavel";
    percentual?: number;
    valor?: number;
    baseCalculo?: number;
  };
  subtotal?: number;
  totalComIVA?: number;
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
}

// Interface para formulário de nova cotação
interface NovaCotacaoData {
  clienteId: string;
  cliente: {
    nome: string;
    nif?: string;
    email: string;
    telefone: string;
    endereco?: string;
    contacto?: string;
    empresa?: string;
  };
  tipoServico: "transporte" | "armazenagem" | "logistica" | "seguro" | "frete" | "outro";
  subtipoServico?: "rodoviario" | "maritimo" | "aereo" | "multimodal" | "armazenagem_temporaria" | "distribuicao" | "outro";
  detalhesCarga: {
    tipoCarga?: "geral" | "perigosa" | "refrigerada" | "fragil" | "sobredimensionada" | "granel" | "container";
    naturezaCarga?: string;
    pesoBruto?: number;
    pesoLiquido?: number;
    volume?: number;
    quantidade?: number;
    unidadeMedida?: string;
    descricao: string;
  };
  origem: {
    cidade: string;
    pais: string;
    endereco?: string;
    contactoOrigem?: string;
  };
  destino: {
    cidade: string;
    pais: string;
    endereco?: string;
    contactoDestino?: string;
  };
  itens: {
    id: number;
    descricao: string;
    tipo: "frete" | "taxa" | "seguro" | "armazenagem" | "manuseio" | "comissao" | "despesa" | "outro";
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
    unidade?: string;
    observacoes?: string;
    categoria?: string;
    temIVA?: boolean; // NOVO
  }[];
  // NOVA SEÇÃO: IVA
  iva?: {
    tipo?: "incluso" | "exento" | "nao_aplicavel";
    percentual?: number;
    valor?: number;
    baseCalculo?: number;
  };
  subtotal?: number;
  valorTotal: number;
  totalComIVA?: number;
  moeda: "MZN" | "USD" | "EUR";
  dataValidade: string;
  prazoEntrega?: {
    tipo: "horas" | "dias" | "semanas";
    valor?: number;
    estimativa?: string;
  };
  status: "rascunho" | "enviado" | "revisao" | "aprovado" | "rejeitado" | "expirado" | "convertido";
  etapaAprovacao: "comercial" | "gerencia" | "financeiro" | "cliente" | "concluido";
  condicoesPagamento?: {
    tipo: "a_vista" | "parcelado" | "30_dias" | "60_dias" | "90_dias" | "personalizado";
    entrada?: number;
    parcelas?: Array<{
      numero: number;
      valor: number;
      vencimento: string;
    }>;
    observacoes?: string;
  };
  termosCondicoes?: string;
  observacoesGerais?: string;
  prioridade: "baixa" | "media" | "alta" | "urgente";
  probabilidadeFechamento: number;
  tags?: string[];
}
// Interface para filtros de cotação
interface CotacaoFiltros {
  curPage: number;
  pageSize: number;
  status?: string;
  clienteId?: string;
  clienteNome?: string;
  tipoServico?: string;
  responsavelComercial?: string;
  dataInicio?: string;
  dataFim?: string;
  dataValidadeInicio?: string;
  dataValidadeFim?: string;
  prioridade?: string;
  valorMin?: number;
  valorMax?: number;
}

// Adicione estas interfaces logo após as importações e antes das constantes

// Interface para cotação baseada no schema
interface Cotacao {
  quotationId: string;
  numeroQuotation: string;
  versao: number;
  clienteId: string;
  cliente: {
    nome: string;
    nif?: string;
    email: string;
    telefone: string;
    endereco?: string;
    contacto?: string;
    empresa?: string;
  };
  tipoServico: "transporte" | "armazenagem" | "logistica" | "seguro" | "frete" | "outro";
  subtipoServico?: "rodoviario" | "maritimo" | "aereo" | "multimodal" | "armazenagem_temporaria" | "distribuicao" | "outro";
  detalhesCarga: {
    tipoCarga?: "geral" | "perigosa" | "refrigerada" | "fragil" | "sobredimensionada" | "granel" | "container";
    naturezaCarga?: string;
    pesoBruto?: number;
    pesoLiquido?: number;
    volume?: number;
    quantidade?: number;
    unidadeMedida?: string;
    descricao: string;
  };
  origem: {
    cidade: string;
    pais: string;
    endereco?: string;
    contactoOrigem?: string;
  };
  destino: {
    cidade: string;
    pais: string;
    endereco?: string;
    contactoDestino?: string;
  };
  itens: {
    id: number;
    descricao: string;
    tipo: "frete" | "taxa" | "seguro" | "armazenagem" | "manuseio" | "comissao" | "despesa" | "outro";
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
    unidade?: string;
    observacoes?: string;
    categoria?: string;
    temIVA?: boolean;
  }[];
  iva?: {
    tipo?: "incluso" | "exento" | "nao_aplicavel";
    percentual?: number;
    valor?: number;
    baseCalculo?: number;
  };
  subtotal: number;
  valorTotal: number;
  totalComIVA?: number;
  moeda: "MZN" | "USD" | "EUR";
  tipoCambio?: {
    rate?: number;
    dataCambio?: Date;
  };
  dataEmissao: string;
  dataValidade: string;
  prazoEntrega?: {
    tipo: "horas" | "dias" | "semanas";
    valor?: number;
    estimativa?: string;
  };
  status: "rascunho" | "enviado" | "revisao" | "aprovado" | "rejeitado" | "expirado" | "convertido";
  etapaAprovacao: "comercial" | "gerencia" | "financeiro" | "cliente" | "concluido";
  dataAprovacao?: string;
  aprovadoPor?: string;
  motivoRejeicao?: string;
  condicoesPagamento?: {
    tipo: "a_vista" | "parcelado" | "30_dias" | "60_dias" | "90_dias" | "personalizado";
    entrada?: number;
    parcelas?: Array<{
      numero: number;
      valor: number;
      vencimento: string;
    }>;
    observacoes?: string;
  };
  termosCondicoes?: string;
  observacoesGerais?: string;
  seguro?: {
    tipo?: string;
    valorMercadoria?: number;
    premio?: number;
    cobertura?: string;
    seguradora?: string;
    apolice?: string;
  };
  transporte?: {
    modalidade?: string;
    veiculoTipo?: string;
    containerTipo?: string;
    temperatura?: string;
    rastreamento?: boolean;
  };
  documentacao?: Array<{
    tipo: string;
    descricao?: string;
    obrigatorio: boolean;
    status: "pendente" | "recebido" | "validado" | "nao_aplicavel";
  }>;
  conversao?: {
    faturaId?: string;
    ordemServicoId?: string;
    dataConversao?: string;
    convertidoPor?: string;
    valorConvertido?: number;
  };
  historicoStatus?: Array<{
    status: string;
    etapaAprovacao?: string;
    data: string;
    usuario?: string;
    observacoes?: string;
  }>;
  historicoAlteracoes?: Array<{
    campo: string;
    valorAntigo: any;
    valorNovo: any;
    data: string;
    usuario?: string;
    motivo?: string;
  }>;
  anexos?: Array<{
    nome: string;
    tipo?: string;
    url: string;
    tamanho?: number;
    dataUpload: string;
    uploadPor?: string;
  }>;
  comunicacoes?: Array<{
    tipo: "email" | "telefone" | "reuniao" | "whatsapp" | "outro";
    data: string;
    assunto?: string;
    descricao: string;
    usuario?: string;
    proximoFollowUp?: string;
    statusFollowUp: "pendente" | "realizado" | "adiado" | "cancelado";
  }>;
  criadoPor: string;
  atualizadoPor?: string;
  responsavelComercial?: string;
  prioridade: "baixa" | "media" | "alta" | "urgente";
  fonteLead?: "site" | "indicacao" | "telefone" | "email" | "evento" | "outro";
  probabilidadeFechamento: number;
  tags?: string[];
  dataCriacao: string;
  dataAtualizacao: string;
  dataEnvioCliente?: string;
  dataRespostaCliente?: string;
  dataExpiracao?: string;
  // Campos calculados
  diasAteExpiracao?: number;
  expirado?: boolean;
  diasDesdeEmissao?: number;
  valorMedioItem?: number;
}

// Interface para filtros de cotação
interface CotacaoFiltros {
  curPage: number;
  pageSize: number;
  status?: string;
  clienteId?: string;
  clienteNome?: string;
  tipoServico?: string;
  responsavelComercial?: string;
  dataInicio?: string;
  dataFim?: string;
  dataValidadeInicio?: string;
  dataValidadeFim?: string;
  prioridade?: string;
  valorMin?: number;
  valorMax?: number;
}

// Interface para formulário de nova cotação
interface NovaCotacaoData {
  clienteId: string;
  cliente: {
    nome: string;
    nif?: string;
    email: string;
    telefone: string;
    endereco?: string;
    contacto?: string;
    empresa?: string;
  };
  tipoServico: "transporte" | "armazenagem" | "logistica" | "seguro" | "frete" | "outro";
  subtipoServico?: "rodoviario" | "maritimo" | "aereo" | "multimodal" | "armazenagem_temporaria" | "distribuicao" | "outro";
  detalhesCarga: {
    tipoCarga?: "geral" | "perigosa" | "refrigerada" | "fragil" | "sobredimensionada" | "granel" | "container";
    naturezaCarga?: string;
    pesoBruto?: number;
    pesoLiquido?: number;
    volume?: number;
    quantidade?: number;
    unidadeMedida?: string;
    descricao: string;
  };
  origem: {
    cidade: string;
    pais: string;
    endereco?: string;
    contactoOrigem?: string;
  };
  destino: {
    cidade: string;
    pais: string;
    endereco?: string;
    contactoDestino?: string;
  };
  // CORRETO: Inclui temIVA
  itens: {
    id: number;
    descricao: string;
    tipo: "frete" | "taxa" | "seguro" | "armazenagem" | "manuseio" | "comissao" | "despesa" | "outro";
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
    unidade?: string;
    observacoes?: string;
    categoria?: string;
    temIVA?: boolean; // ← ESTE É O CAMPO QUE ESTÁ FALTANDO
  }[];
  iva?: {
    tipo?: "incluso" | "exento" | "nao_aplicavel";
    percentual?: number;
    valor?: number;
    baseCalculo?: number;
  };
  subtotal?: number;
  valorTotal: number;
  totalComIVA?: number;
  moeda: "MZN" | "USD" | "EUR";
  dataValidade: string;
  prazoEntrega?: {
    tipo: "horas" | "dias" | "semanas";
    valor?: number;
    estimativa?: string;
  };
  status: "rascunho" | "enviado" | "revisao" | "aprovado" | "rejeitado" | "expirado" | "convertido";
  etapaAprovacao: "comercial" | "gerencia" | "financeiro" | "cliente" | "concluido";
  condicoesPagamento?: {
    tipo: "a_vista" | "parcelado" | "30_dias" | "60_dias" | "90_dias" | "personalizado";
    entrada?: number;
    parcelas?: Array<{
      numero: number;
      valor: number;
      vencimento: string;
    }>;
    observacoes?: string;
  };
  termosCondicoes?: string;
  observacoesGerais?: string;
  prioridade: "baixa" | "media" | "alta" | "urgente";
  probabilidadeFechamento: number;
  tags?: string[];
}

// Interface para formulário de nova cotação
// Interface para formulário de nova cotação - ÚNICA VERSÃO
interface NovaCotacaoData {
  clienteId: string;
  cliente: {
    nome: string;
    nif?: string;
    email: string;
    telefone: string;
    endereco?: string;
    contacto?: string;
    empresa?: string;
  };
  tipoServico: "transporte" | "armazenagem" | "logistica" | "seguro" | "frete" | "outro";
  subtipoServico?: "rodoviario" | "maritimo" | "aereo" | "multimodal" | "armazenagem_temporaria" | "distribuicao" | "outro";
  detalhesCarga: {
    tipoCarga?: "geral" | "perigosa" | "refrigerada" | "fragil" | "sobredimensionada" | "granel" | "container";
    naturezaCarga?: string;
    pesoBruto?: number;
    pesoLiquido?: number;
    volume?: number;
    quantidade?: number;
    unidadeMedida?: string;
    descricao: string;
  };
  origem: {
    cidade: string;
    pais: string;
    endereco?: string;
    contactoOrigem?: string;
  };
  destino: {
    cidade: string;
    pais: string;
    endereco?: string;
    contactoDestino?: string;
  };
  // CORRETO: Inclui temIVA
  itens: {
    id: number;
    descricao: string;
    tipo: "frete" | "taxa" | "seguro" | "armazenagem" | "manuseio" | "comissao" | "despesa" | "outro";
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
    unidade?: string;
    observacoes?: string;
    categoria?: string;
    temIVA?: boolean; // ← ESTE É O CAMPO QUE ESTÁ FALTANDO
  }[];
  iva?: {
    tipo?: "incluso" | "exento" | "nao_aplicavel";
    percentual?: number;
    valor?: number;
    baseCalculo?: number;
  };
  subtotal?: number;
  valorTotal: number;
  totalComIVA?: number;
  moeda: "MZN" | "USD" | "EUR";
  dataValidade: string;
  prazoEntrega?: {
    tipo: "horas" | "dias" | "semanas";
    valor?: number;
    estimativa?: string;
  };
  status: "rascunho" | "enviado" | "revisao" | "aprovado" | "rejeitado" | "expirado" | "convertido";
  etapaAprovacao: "comercial" | "gerencia" | "financeiro" | "cliente" | "concluido";
  condicoesPagamento?: {
    tipo: "a_vista" | "parcelado" | "30_dias" | "60_dias" | "90_dias" | "personalizado";
    entrada?: number;
    parcelas?: Array<{
      numero: number;
      valor: number;
      vencimento: string;
    }>;
    observacoes?: string;
  };
  termosCondicoes?: string;
  observacoesGerais?: string;
  prioridade: "baixa" | "media" | "alta" | "urgente";
  probabilidadeFechamento: number;
  tags?: string[];
}
// Valores padrão para os estados
const defaultDashboardData: DashboardData = {
  estatisticas: {
    valorPendente: 0,
    faturasPendentes: 0,
    valorVencido: 0,
    faturasVencidas: 0,
    valorAReceber7Dias: 0,
    totalRecebidoMes: 0,
  },
  faturasVencidas: [],
  proximosVencimentos: [],
  clientesPrincipais: [],
  distribuicaoStatus: [],
  recebimentosMes: {
    totalRecebido: 0,
    countRecebimentos: 0,
    recebimentosDiarios: [],
  },
};

const defaultFaturaFiltros: FaturaFiltros = {
  curPage: 1,
  pageSize: 10,
  status: undefined,
  clienteId: "",
  dataInicio: "",
  dataFim: "",
};

const defaultFormRecebimento: FormRecebimento = {
  faturaId: "",
  valor: "",
  dataRecebimento: new Date().toISOString().split("T")[0],
  formaPagamento: "" as FormaPagamento,
  comprovante: "",
  observacoes: "",
};

// Valores padrão para cotações
const defaultCotacaoFiltros: CotacaoFiltros = {
  curPage: 1,
  pageSize: 10,
};

const defaultNovaCotacao: NovaCotacaoData = {
  clienteId: "",
  cliente: {
    nome: "",
    email: "",
    telefone: "",
  },
  tipoServico: "transporte",
  detalhesCarga: {
    descricao: "",
  },
  origem: {
    cidade: "",
    pais: "Moçambique",
  },
  destino: {
    cidade: "",
    pais: "Moçambique",
  },
  itens: [],
  // NOVO: Configuração padrão do IVA
  iva: {
    tipo: "incluso",
    percentual: 16,
    valor: 0,
    baseCalculo: 0,
  },
  subtotal: 0,
  valorTotal: 0,
  totalComIVA: 0,
  moeda: "MZN",
  dataValidade: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  status: "rascunho",
  etapaAprovacao: "comercial",
  prioridade: "media",
  probabilidadeFechamento: 50,
};
// Função para calcular IVA (16%)
const calcularIVA = (subtotal: number, percentual: number = 16): number => {
  const valor = subtotal * (percentual / 100);
  return Math.round(valor * 100) / 100;
};

// Função para gerar itens da fatura baseados na carga
const gerarItensFatura = (cargaData: any): ItemFatura[] => {
  const itens: ItemFatura[] = [];
  let itemId = 1;

  // Item 1: Frete de Transporte
  if (cargaData.valorFrete || cargaData.freteIda) {
    const valorFrete = cargaData.valorFrete || cargaData.freteIda;
    itens.push({
      id: itemId++,
      descricao: `Frete de transporte - ${
        cargaData.tipoPercurso || "Nacional"
      } para ${cargaData.destinoFrete || "Destino não especificado"}`,
      quantidade: 1,
      valorUnitario: valorFrete,
      valorTotal: valorFrete,
      tipo: "frete",
      categoriaSeguro: cargaData.categoriaSeguro,
    });
  }

  // Item 2: Taxas Portuárias
  if (cargaData.taxasPortuarias && cargaData.taxasPortuarias > 0) {
    itens.push({
      id: itemId++,
      descricao: "Taxas portuárias e alfandegárias",
      quantidade: 1,
      valorUnitario: cargaData.taxasPortuarias,
      valorTotal: cargaData.taxasPortuarias,
      tipo: "taxa",
      categoriaSeguro: "Carga Geral",
    });
  }

  // Item 3: Seguro da Carga
  if (cargaData.seguro?.premioFinal || cargaData.seguro?.valorPremio) {
    const premioSeguro =
      cargaData.seguro.premioFinal || cargaData.seguro.valorPremio;
    itens.push({
      id: itemId++,
      descricao: `Seguro de carga - ${
        cargaData.categoriaSeguro || "Carga Geral"
      } (${cargaData.abrangenciaSeguro || "Nacional"})`,
      quantidade: 1,
      valorUnitario: premioSeguro,
      valorTotal: premioSeguro,
      tipo: "seguro",
      categoriaSeguro: cargaData.categoriaSeguro,
    });
  }

  // Item 4: Comissão/Logística
  if (cargaData.comissaoCalculada || cargaData.percentualLogistica) {
    const comissao =
      cargaData.comissaoCalculada ||
      ((cargaData.freteIda || 0) * (cargaData.percentualLogistica || 5)) / 100;
    itens.push({
      id: itemId++,
      descricao: `Comissão de logística e gestão (${
        cargaData.percentualLogistica || 5
      }%)`,
      quantidade: 1,
      valorUnitario: comissao,
      valorTotal: comissao,
      tipo: "comissao",
      categoriaSeguro: "Serviços",
    });
  }

  // Item 5: Despesas Operacionais
  if (cargaData.despesasOperacionais && cargaData.despesasOperacionais > 0) {
    itens.push({
      id: itemId++,
      descricao: "Despesas operacionais e administrativas",
      quantidade: 1,
      valorUnitario: cargaData.despesasOperacionais,
      valorTotal: cargaData.despesasOperacionais,
      tipo: "despesa",
      categoriaSeguro: "Operacional",
    });
  }

  // Item 6: Custos Extras (se houver)
  if (cargaData.custosExtras && cargaData.custosExtras.length > 0) {
    cargaData.custosExtras.forEach((custo: any) => {
      itens.push({
        id: itemId++,
        descricao: custo.descricao || custo.tipo,
        quantidade: 1,
        valorUnitario: custo.valor,
        valorTotal: custo.valor,
        tipo: custo.tipo || "extra",
        categoriaSeguro: "Diversos",
      });
    });
  }

  // Se não houver itens, adiciona um item básico
  if (itens.length === 0 && cargaData.valorMercadoria) {
    itens.push({
      id: 1,
      descricao: `Transporte de carga ${cargaData.tipoCarga || "geral"} - ${
        cargaData.descricao || "Serviço de transporte"
      }`,
      quantidade: 1,
      valorUnitario: cargaData.valorMercadoria * 0.1,
      valorTotal: cargaData.valorMercadoria * 0.1,
      tipo: "frete",
      categoriaSeguro: cargaData.categoriaSeguro || "Carga Geral",
    });
  }

  return itens;
};

const defaultNovaFatura: NovaFaturaData = {
  faturaId: "",
  numeroFatura: "",
  clienteId: "",
  cliente: {
    nome: "",
    email: "",
    telefone: "",
  },
  valorTotal: 0,
  dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  descricaoServico: "",
  tipoServico: "transporte",
  status: "pendente",
  moeda: "MZN",
  dataEmissao: new Date().toISOString().split("T")[0],
  itensFatura: [],
  iva: {
    tipo: "incluso",
    percentual: 16,
    valor: 0,
    baseCalculo: 0,
  },
  subtotal: 0,
  totalComIVA: 0,
};

// Extender ActiveTab para incluir cotações
enum ExtendedActiveTab {
  DASHBOARD = "DASHBOARD",
  FATURAS = "FATURAS",
  RECEBIMENTOS = "RECEBIMENTOS",
  GRAFICOS = "GRAFICOS",
  RELATORIOS = "RELATORIOS",
  COTACOES = "COTACOES"
}

const ContasReceber: React.FC = () => {
  // Estados tipados
  const [activeContasReceber, setActiveContasReceber] = useState<ExtendedActiveTab>(
    ExtendedActiveTab.DASHBOARD
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Estado para dados do dashboard
  const [dashboardData, setDashboardData] =
    useState<DashboardData>(defaultDashboardData);

  // Estado para faturas
  const [faturas, setFaturas] = useState<FaturaDetalhada[]>([]);
  const [filtrosFaturas, setFiltrosFaturas] =
    useState<FaturaFiltros>(defaultFaturaFiltros);

  // Estado para formulário de recebimento
  const [formRecebimento, setFormRecebimento] = useState<FormRecebimento>(
    defaultFormRecebimento
  );

  // Estado para fatura selecionada
  const [faturaSelecionada, setFaturaSelecionada] =
    useState<FaturaDetalhada | null>(null);

  // Estado para histórico de recebimentos
  const [historicoRecebimentos, setHistoricoRecebimentos] = useState<
    RecebimentoDetalhado[]
  >([]);

  // Estado para modal de nova fatura
  const [showModalNovaFatura, setShowModalNovaFatura] = useState(false);
  const [novaFaturaData, setNovaFaturaData] =
    useState<NovaFaturaData>(defaultNovaFatura);
  const [modalLoading, setModalLoading] = useState(false);

  // Estado para lista de clientes
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clientesLoading, setClientesLoading] = useState(false);
  const [buscaCliente, setBuscaCliente] = useState("");
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(
    null
  );

  // Estado para buscar cargas do cliente
  const [cargasCliente, setCargasCliente] = useState<any[]>([]);
  const [cargaSelecionada, setCargaSelecionada] = useState<any>(null);
  const [buscandoCargas, setBuscandoCargas] = useState(false);
  const [showDetalhesFatura, setShowDetalhesFatura] = useState(false);
  const [detalhesFatura, setDetalhesFatura] = useState<FaturaDetalhada | null>(
    null
  );
  const [detalhesLoading, setDetalhesLoading] = useState(false);

  // Estados para cotações
  const [cotacoes, setCotacoes] = useState<Cotacao[]>([]);
  const [filtrosCotacoes, setFiltrosCotacoes] = useState<CotacaoFiltros>(defaultCotacaoFiltros);
  const [showModalNovaCotacao, setShowModalNovaCotacao] = useState(false);
  const [novaCotacaoData, setNovaCotacaoData] = useState<NovaCotacaoData>(defaultNovaCotacao);
  const [cotacaoSelecionada, setCotacaoSelecionada] = useState<Cotacao | null>(null);
  const [showDetalhesCotacao, setShowDetalhesCotacao] = useState(false);
  const [detalhesCotacao, setDetalhesCotacao] = useState<Cotacao | null>(null);
  const [showModalConvertCotacao, setShowModalConvertCotacao] = useState(false);
  const [cargasClienteCotacao, setCargasClienteCotacao] = useState<any[]>([]);
  const [cargaSelecionadaCotacao, setCargaSelecionadaCotacao] = useState<any>(null);
  const [buscandoCargasCotacao, setBuscandoCargasCotacao] = useState(false);

  const obterTipoServicoTexto = (tipo?: string): string => {
    if (!tipo) return "Não especificado";

    const tipos: Record<string, string> = {
      transporte: "Transporte",
      armazenagem: "Armazenagem",
      logistica: "Logística",
      seguro: "Seguro",
      frete: "Frete",
      outro: "Outro",
    };

    return tipos[tipo] || tipo;
  };
  
  const obterInformacoesCarga = (fatura: FaturaDetalhada) => {
    if (!fatura.origem || fatura.origem !== "CARGA") return null;

    return {
      codigoCarga: fatura.codigoCarga,
      tipoCarga: fatura.tipoCarga,
      naturezaCarga: fatura.naturezaCarga,
      destinoFrete: fatura.destinoFrete,
      pesoBruto: fatura.pesoBruto,
      valorMercadoria: fatura.valorMercadoria,
    };
  };

  // Função para gerar PDF da fatura
  const handleGerarPDFFatura = async (fatura: FaturaDetalhada): Promise<void> => {
    try {
      setLoading(true);
      await gerarPDFFaturaCompleta(fatura);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      setError("Não foi possível gerar o PDF da fatura");
    } finally {
      setLoading(false);
    }
  };

  // Função para gerar PDF de recibo
  const handleGerarPDFRecibo = async (fatura: FaturaDetalhada, recebimento: RecebimentoDetalhado): Promise<void> => {
    try {
      setLoading(true);
      await gerarReciboCompleto(fatura, recebimento);
    } catch (error) {
      console.error("Erro ao gerar recibo:", error);
      setError("Não foi possível gerar o recibo");
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar dados do dashboard
  const fetchDashboardData = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_BASE_URL}/getDashboardContasReceber`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ periodoMeses: 6 }),
        }
      );

      const data = await response.json();

      if (data.returnCode === 200) {
        setDashboardData(data.data as DashboardData);
      } else {
        setError(data.returnMsg || "Erro ao carregar dados do dashboard");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };
  // Adicione esta função após as outras funções de geração de PDF (após handleGerarPDFRecibo):
  const handleGerarPDFCotacao = async (cotacao: Cotacao): Promise<void> => {
  try {
    setLoading(true);
    
    // Criar objeto cliente SIMPLIFICADO como o tipo espera
    const clienteParaPDF = {
      nome: cotacao.cliente?.nome || "Cliente não especificado",
      nif: cotacao.cliente?.nif,
      email: cotacao.cliente?.email,
      telefone: cotacao.cliente?.telefone,
      endereco: cotacao.cliente?.endereco,
    };
    
    // Criar objeto cotação para PDF usando o tipo correto
    // (sem propriedade 'id' no cliente)
    const cotacaoParaPDF = {
      cotacao: {
        numeroCotacao: cotacao.numeroQuotation,
        dataEmissao: cotacao.dataEmissao,
        dataValidade: cotacao.dataValidade,
        cliente: clienteParaPDF, // Apenas nome, nif, email, telefone, endereco
        itensCotacao: cotacao.itens.map((item, index) => ({
          id: item.id || index + 1,
          descricao: item.descricao,
          quantidade: item.quantidade,
          valorUnitario: item.valorUnitario,
          valorTotal: item.valorTotal,
          observacoes: item.observacoes || "",
        })),
        subtotal: cotacao.subtotal || 0,
        iva: cotacao.iva,
        valorTotal: cotacao.valorTotal,
        observacoes: cotacao.observacoesGerais,
        status: cotacao.status,
        tipoServico: cotacao.tipoServico,
        referencia: `Q-${cotacao.numeroQuotation}`,
      },
      empresa: {
        nomeEmpresaLocal: "Mega Centro e Logistica",
        enderecoLocal: "Maputo, Moçambique",
        nuitLocal: "401234567",
        emailLocal: "info@megacentrodelogistica.co.mz",
        contactosLocal: "+258 84 123 4567",
        dadosBancarios: {
          banco: "Banco Comercial de Investimentos (BCI)",
          nib: "000100000123456789123",
          iban: "MZ59000100000123456789123",
        },
      }
    };

    // Importar e usar diretamente a função gerarPDFCotacao
    const { gerarPDFCotacao } = await import("@/context/pdfGenerator");
    await gerarPDFCotacao(cotacaoParaPDF);
    
  } catch (error) {
    console.error("Erro ao gerar PDF da cotação:", error);
    setError("Não foi possível gerar o PDF da cotação");
  } finally {
    setLoading(false);
  }
};
  // Função para buscar lista de faturas
  const fetchFaturas = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/getFaturaList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filtrosFaturas),
      });

      const data = await response.json();

      if (data.returnCode === 200) {
        setFaturas(data.data.list as FaturaDetalhada[]);
      } else {
        setError(data.returnMsg || "Erro ao carregar faturas");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Error fetching faturas:", err);
    } finally {
      setLoading(false);
    }
  };

    // Função para buscar cargas do cliente específico para cotação
  const fetchCargasClienteParaCotacao = async (clienteId: string): Promise<void> => {
    try {
      setBuscandoCargasCotacao(true);
      const response = await fetch(`${API_BASE_URL}/getCargaList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          curPage: 1,
          pageSize: 50,
          clienteId: clienteId,
          status: ["planeada", "em_transito", "pendente", "confirmada"],
        }),
      });

      const data = await response.json();

      if (data.returnCode === 200) {
        setCargasClienteCotacao(data.data.list || []);
      } else {
        console.error("Erro ao buscar cargas para cotação:", data.returnMsg);
        setCargasClienteCotacao([]);
      }
    } catch (err) {
      console.error("Error fetching cargas for cotacao:", err);
      setCargasClienteCotacao([]);
    } finally {
      setBuscandoCargasCotacao(false);
    }
  };

  // Função para buscar lista de cotações
  const fetchCotacoes = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/getQuotationList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filtrosCotacoes),
      });

      const data = await response.json();

      if (data.returnCode === 200) {
        setCotacoes(data.data.list as Cotacao[]);
      } else {
        setError(data.returnMsg || "Erro ao carregar cotações");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Error fetching cotacoes:", err);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar detalhes da cotação
  const fetchCotacaoDetail = async (quotationId: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/getQuotationDetail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quotationId }),
      });

      const data = await response.json();

      if (data.returnCode === 200) {
        setDetalhesCotacao(data.data as Cotacao);
        setShowDetalhesCotacao(true);
      } else {
        setError(data.returnMsg || "Erro ao carregar detalhes da cotação");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Error fetching quotation detail:", err);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar cargas do cliente
  const fetchCargasCliente = async (clienteId: string): Promise<void> => {
    try {
      setBuscandoCargas(true);
      const response = await fetch(`${API_BASE_URL}/getCargaList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          curPage: 1,
          pageSize: 50,
          clienteId: clienteId,
          status: ["planeada", "em_transito", "pendente", "confirmada"],
        }),
      });

      const data = await response.json();

      if (data.returnCode === 200) {
        setCargasCliente(data.data.list || []);
      } else {
        console.error("Erro ao buscar cargas:", data.returnMsg);
        setCargasCliente([]);
      }
    } catch (err) {
      console.error("Error fetching cargas:", err);
      setCargasCliente([]);
    } finally {
      setBuscandoCargas(false);
    }
  };

  // Função para buscar detalhes da carga
  const fetchCargaDetail = async (codigo: string): Promise<any> => {
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
      } else {
        console.error("Erro ao buscar detalhes da carga:", data.returnMsg);
        return null;
      }
    } catch (err) {
      console.error("Error fetching carga detail:", err);
      return null;
    }
  };

  // Função para buscar lista de clientes
  const fetchClientes = async (nome?: string): Promise<void> => {
    try {
      setClientesLoading(true);

      const response = await fetch(`${API_BASE_URL}/getClienteList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          curPage: 1,
          pageSize: 50,
          nome: nome || "",
          status: "ativo",
        }),
      });

      const data = await response.json();

      if (data.returnCode === 200) {
        const clientesData = data.data.list.map((cliente: any) => ({
          _id: cliente._id,
          codigo: cliente.codigo,
          nome: cliente.nome,
          nuit: cliente.nuit,
          email:
            cliente.contatos?.find((c: any) => c.principal)?.email ||
            cliente.contatos?.[0]?.email ||
            "",
          telefone:
            cliente.contatos?.find((c: any) => c.principal)?.telefone ||
            cliente.contatos?.[0]?.telefone ||
            "",
          categoria: cliente.categoria,
          contatos: cliente.contatos,
        }));
        setClientes(clientesData);
      } else {
        console.error("Erro ao buscar clientes:", data.returnMsg);
      }
    } catch (err) {
      console.error("Error fetching clientes:", err);
    } finally {
      setClientesLoading(false);
    }
  };

  // Função para buscar detalhes do cliente
  const fetchClienteDetail = async (
    codigo: string
  ): Promise<Cliente | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/getClienteDetail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigo }),
      });

      const data = await response.json();

      if (data.returnCode === 200) {
        const cliente = data.data;
        return {
          _id: cliente._id,
          codigo: cliente.codigo,
          nome: cliente.nome,
          nuit: cliente.nuit,
          email:
            cliente.contatos?.find((c: any) => c.principal)?.email ||
            cliente.contatos?.[0]?.email ||
            "",
          telefone:
            cliente.contatos?.find((c: any) => c.principal)?.telefone ||
            cliente.contatos?.[0]?.telefone ||
            "",
          categoria: cliente.categoria,
          contatos: cliente.contatos,
        };
      }
      return null;
    } catch (err) {
      console.error("Error fetching cliente detail:", err);
      return null;
    }
  };

  // Função para registrar recebimento
  const registrarRecebimento = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (
      !formRecebimento.faturaId ||
      !formRecebimento.valor ||
      !formRecebimento.formaPagamento
    ) {
      setError("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const recebimentoData = {
        valor: parseFloat(formRecebimento.valor),
        formaPagamento: formRecebimento.formaPagamento,
        comprovante: formRecebimento.comprovante || "",
        observacoes: formRecebimento.observacoes || "",
      };

      const response = await fetch(`${API_BASE_URL}/registrarRecebimento`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          faturaId: formRecebimento.faturaId,
          recebimentoData: recebimentoData,
        }),
      });

      const data = await response.json();

      if (data.returnCode === 200) {
        // Limpar formulário
        setFormRecebimento({
          ...defaultFormRecebimento,
          dataRecebimento: new Date().toISOString().split("T")[0],
        });

        // Atualizar dados
        fetchDashboardData();
        fetchFaturas();

        alert("Recebimento registrado com sucesso!");
      } else {
        setError(data.returnMsg || "Erro ao registrar recebimento");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Error registering payment:", err);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar detalhes da fatura
  const fetchFaturaDetail = async (faturaId: string): Promise<void> => {
    try {
      setDetalhesLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/getFaturaDetail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ faturaId }),
      });

      const data = await response.json();

      if (data.returnCode === 200) {
        setDetalhesFatura(data.data as FaturaDetalhada);
        setShowDetalhesFatura(true);
      } else {
        setError(data.returnMsg || "Erro ao carregar detalhes da fatura");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Error fetching fatura detail:", err);
    } finally {
      setDetalhesLoading(false);
    }
  };

  // Função para criar nova fatura
  const criarNovaFatura = async (
    faturaData: NovaFaturaData
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      // Calcular valores totais
      const subtotal = faturaData.itensFatura.reduce(
        (total, item) => total + item.valorTotal,
        0
      );
      const valorIVA =
        faturaData.iva?.tipo === "incluso" && faturaData.iva?.percentual
          ? calcularIVA(subtotal, faturaData.iva.percentual)
          : 0;
      const totalComIVA = subtotal + valorIVA;

      // Preparar dados completos da fatura
      const dadosCompletos = {
        ...faturaData,
        valorTotal: totalComIVA,
        subtotal: subtotal,
        totalComIVA: totalComIVA,
        iva: {
          ...faturaData.iva,
          valor: valorIVA,
          baseCalculo: subtotal,
        },
        dataEmissao: new Date().toISOString(),
        valorPendente: totalComIVA,
        nomeEmpresa: "Mega Centro e Logistica",
        moeda: "MZN",
        recebimentos: [],
        historicoStatus: [
          {
            status: "pendente",
            data: new Date(),
            observacoes: "Fatura criada",
          },
        ],
        notificacoes: {
          avisoVencimento: true,
          diasAntes: 3,
          avisosEnviados: [],
        },
        categoria: "transporte",
        origem: faturaData.codigoCarga ? "CARGA" : "MANUAL",
      };

      const response = await fetch(`${API_BASE_URL}/createFatura`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosCompletos),
      });

      const data = await response.json();

      if (data.returnCode === 201) {
        fetchFaturas();
        setShowModalNovaFatura(false);
        setNovaFaturaData(defaultNovaFatura);
        setClienteSelecionado(null);
        setBuscaCliente("");
        setCargasCliente([]);
        setCargaSelecionada(null);

        alert("Fatura criada com sucesso!");
        return true;
      } else {
        setError(data.returnMsg || "Erro ao criar fatura");
        return false;
      }
    } catch (err: any) {
      setError("Erro de conexão com o servidor: " + err.message);
      console.error("Error creating fatura:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Função para criar nova cotação
  const criarNovaCotacao = async (
    cotacaoData: NovaCotacaoData
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      // Calcular valor total dos itens
      const valorTotal = cotacaoData.itens.reduce(
        (total, item) => total + item.valorTotal,
        0
      );

      // Preparar dados completos da cotação
      const dadosCompletos = {
        ...cotacaoData,
        valorTotal: valorTotal,
        dataEmissao: new Date().toISOString(),
        criadoPor: "sistema", // Em produção, usar usuário autenticado
        atualizadoPor: "sistema",
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString(),
        // Gerar ID único para a cotação
        quotationId: `QT-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 6)}`,
        // Gerar número da cotação
        numeroQuotation: `Q${new Date().getFullYear()}-${Math.floor(
          Math.random() * 10000
        )
          .toString()
          .padStart(4, "0")}`,
        // Definir versão inicial
        versao: 1,
        // Status inicial
        status: "rascunho",
        // Etapa inicial
        etapaAprovacao: "comercial",
      };

      console.log("Dados enviados para criar cotação:", dadosCompletos);

      const response = await fetch(`${API_BASE_URL}/createQuotation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosCompletos),
      });

      const data = await response.json();

      if (data.returnCode === 201) {
        fetchCotacoes();
        setShowModalNovaCotacao(false);
        setNovaCotacaoData(defaultNovaCotacao);
        setClienteSelecionado(null);
        setBuscaCliente("");

        alert("Cotação criada com sucesso!");
        return true;
      } else {
        setError(data.returnMsg || "Erro ao criar cotação");
        console.error("Erro do servidor:", data);
        return false;
      }
    } catch (err: any) {
      setError("Erro de conexão com o servidor: " + err.message);
      console.error("Error creating quotation:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar status da fatura
  const atualizarStatusFatura = async (
    faturaId: string,
    status: StatusFatura
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/updateFatura`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          faturaId,
          status,
        }),
      });

      const data = await response.json();

      if (data.returnCode === 200) {
        fetchFaturas();
        return true;
      } else {
        setError(data.returnMsg || "Erro ao atualizar status");
        return false;
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Error updating fatura status:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar status da cotação
  const atualizarStatusCotacao = async (
    quotationId: string,
    status: string,
    usuario: string = "sistema"
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/updateQuotationStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quotationId,
          status,
          usuario,
        }),
      });

      const data = await response.json();

      if (data.returnCode === 200) {
        fetchCotacoes();
        return true;
      } else {
        setError(data.returnMsg || "Erro ao atualizar status da cotação");
        return false;
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Error updating quotation status:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Função para converter cotação em fatura
  const converterCotacaoParaFatura = async (
    quotationId: string,
    faturaData: any
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/convertToFatura`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quotationId,
          faturaData,
          usuario: "sistema", // Em produção, usar usuário autenticado
        }),
      });

      const data = await response.json();

      if (data.returnCode === 200) {
        // Criar a fatura usando os dados gerados
        if (data.data.faturaGerada) {
          const faturaCriada = await criarNovaFatura({
            ...data.data.faturaGerada,
            faturaId: `FAT-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
            numeroFatura: data.data.faturaGerada.numeroFatura,
          });

          if (faturaCriada) {
            fetchCotacoes();
            setShowModalConvertCotacao(false);
            alert("Cotação convertida para fatura com sucesso!");
            return true;
          }
        }
        return false;
      } else {
        setError(data.returnMsg || "Erro ao converter cotação");
        return false;
      }
    } catch (err: any) {
      setError("Erro de conexão com o servidor: " + err.message);
      console.error("Error converting quotation:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Função para gerar relatório
  const gerarRelatorio = async (
    tipoRelatorio: TipoRelatorio,
    dataInicio: string,
    dataFim: string
  ): Promise<RelatorioData | null> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_BASE_URL}/gerarRelatorioContasReceber`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tipoRelatorio,
            dataInicio,
            dataFim,
          }),
        }
      );

      const data = await response.json();

      if (data.returnCode === 200) {
        return data.data as RelatorioData;
      } else {
        setError(data.returnMsg || "Erro ao gerar relatório");
        return null;
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Error generating report:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Handler para abrir modal de nova fatura
  const handleAbrirModalNovaFatura = (): void => {
    const numeroFatura = `FT-${new Date().getFullYear()}-${Math.floor(
      Math.random() * 10000
    )
      .toString()
      .padStart(4, "0")}`;

    const faturaId = `FAT-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 6)}`;

    setNovaFaturaData({
      ...defaultNovaFatura,
      faturaId,
      numeroFatura,
      dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      dataEmissao: new Date().toISOString().split("T")[0],
    });

    fetchClientes();
    setShowModalNovaFatura(true);
  };

  // Handler para abrir modal de nova cotação
  const handleAbrirModalNovaCotacao = (): void => {
    setNovaCotacaoData({
      ...defaultNovaCotacao,
      dataValidade: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    });

    fetchClientes();
    setShowModalNovaCotacao(true);
  };

  // Handler para selecionar carga
  const handleSelecionarCarga = async (carga: any): Promise<void> => {
    setCargaSelecionada(carga);

    const cargaDetail = await fetchCargaDetail(carga.codigo);

    if (cargaDetail) {
      const itensFatura = gerarItensFatura(cargaDetail);
      const subtotal = itensFatura.reduce(
        (total, item) => total + item.valorTotal,
        0
      );

      let valorIVA = 0;
      if (novaFaturaData.iva?.tipo === "incluso") {
        valorIVA = calcularIVA(subtotal, novaFaturaData.iva.percentual || 16);
      }

      setNovaFaturaData((prev) => ({
        ...prev,
        codigoCarga: carga.codigo,
        tipoCarga: carga.tipoCarga,
        naturezaCarga: carga.naturezaCarga,
        categoriaSeguro: carga.categoriaSeguro,
        abrangenciaSeguro: carga.abrangenciaSeguro,
        tipoPercurso: carga.tipoPercurso,
        destinoFrete: carga.destinoFrete,
        pesoBruto: carga.pesoBruto,
        valorMercadoria: carga.valorMercadoria,
        descricaoServico: `Transporte de carga ${carga.tipoCarga} - ${carga.descricao}`,
        itensFatura: itensFatura,
        subtotal: subtotal,
        iva: {
          ...prev.iva,
          baseCalculo: subtotal,
          valor: valorIVA,
        },
        totalComIVA: subtotal + valorIVA,
        valorTotal: subtotal + valorIVA,
      }));
    }
  };

  // Handler para mudança nos itens da fatura
  const handleItemFaturaChange = (
    id: number,
    field: keyof ItemFatura,
    value: any
  ): void => {
    setNovaFaturaData((prev) => {
      const novosItens = prev.itensFatura.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      );

      if (field === "quantidade" || field === "valorUnitario") {
        const itemIndex = novosItens.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
          novosItens[itemIndex].valorTotal =
            novosItens[itemIndex].quantidade *
            novosItens[itemIndex].valorUnitario;
        }
      }

      const subtotal = novosItens.reduce(
        (total, item) => total + item.valorTotal,
        0
      );

      let valorIVA = 0;
      const baseCalculoIVA = subtotal;

      if (prev.iva?.tipo === "incluso" && prev.iva?.percentual) {
        valorIVA = calcularIVA(subtotal, prev.iva.percentual);
      } else if (prev.iva?.tipo === "exento") {
        valorIVA = 0;
      } else if (prev.iva?.tipo === "nao_aplicavel") {
        valorIVA = 0;
      }

      const totalComIVA = subtotal + valorIVA;

      return {
        ...prev,
        itensFatura: novosItens,
        subtotal: subtotal,
        iva: {
          ...prev.iva,
          valor: valorIVA,
          baseCalculo: baseCalculoIVA,
        },
        totalComIVA: totalComIVA,
        valorTotal: totalComIVA,
      };
    });
  };

  // Handler para mudança nos itens da cotação
  const handleItemCotacaoChange = (
    id: number,
    field: keyof NovaCotacaoData["itens"][0],
    value: any
  ): void => {
    setNovaCotacaoData((prev) => {
      const novosItens = prev.itens.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      );

      // Recalcular valorTotal se quantidade ou valorUnitario mudar
      if (field === "quantidade" || field === "valorUnitario") {
        const itemIndex = novosItens.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
          novosItens[itemIndex].valorTotal =
            novosItens[itemIndex].quantidade *
            novosItens[itemIndex].valorUnitario;
        }
      }

      // Recalcular todos os totais
      const calculos = recalcularTotaisCotacao(novosItens, prev.iva);
      
      return {
        ...prev,
        itens: novosItens,
        subtotal: calculos.subtotal,
        valorTotal: calculos.totalComIVA,
        totalComIVA: calculos.totalComIVA,
        iva: {
          ...prev.iva,
          valor: calculos.valorIVA,
          baseCalculo: calculos.baseCalculoIVA,
        },
      };
    });
  };

  // Handler para adicionar novo item manualmente
  const handleAdicionarItem = (): void => {
    const novoId =
      novaFaturaData.itensFatura.length > 0
        ? Math.max(...novaFaturaData.itensFatura.map((item) => item.id)) + 1
        : 1;

    const novoItem: ItemFatura = {
      id: novoId,
      descricao: "Novo item",
      quantidade: 1,
      valorUnitario: 0,
      valorTotal: 0,
      tipo: "outro",
      categoriaSeguro: "Diversos",
    };

    setNovaFaturaData((prev) => ({
      ...prev,
      itensFatura: [...prev.itensFatura, novoItem],
    }));
  };

  // Handler para adicionar novo item na cotação
  const handleAdicionarItemCotacao = (): void => {
    const novoId =
      novaCotacaoData.itens.length > 0
        ? Math.max(...novaCotacaoData.itens.map((item) => item.id)) + 1
        : 1;

    const novoItem: NovaCotacaoData["itens"][0] = {
      id: novoId,
      descricao: "Novo item",
      tipo: "outro",
      quantidade: 1,
      valorUnitario: 0,
      valorTotal: 0,
      temIVA: true, // ← ADICIONE ESTE CAMPO
    };

    setNovaCotacaoData((prev) => {
      const novosItens = [...prev.itens, novoItem];
      const calculos = recalcularTotaisCotacao(novosItens, prev.iva);
      
      return {
        ...prev,
        itens: novosItens,
        subtotal: calculos.subtotal,
        valorTotal: calculos.totalComIVA,
        totalComIVA: calculos.totalComIVA,
        iva: {
          ...prev.iva,
          valor: calculos.valorIVA,
          baseCalculo: calculos.baseCalculoIVA,
        },
      };
    });
  };

  // Handler para remover item
  const handleRemoverItem = (id: number): void => {
    setNovaFaturaData((prev) => {
      const novosItens = prev.itensFatura.filter((item) => item.id !== id);
      const subtotal = novosItens.reduce(
        (total, item) => total + item.valorTotal,
        0
      );
      const valorIVA =
        prev.iva?.tipo === "incluso" && prev.iva?.percentual
          ? calcularIVA(subtotal, prev.iva.percentual)
          : 0;

      return {
        ...prev,
        itensFatura: novosItens,
        subtotal: subtotal,
        iva: {
          ...prev.iva,
          baseCalculo: subtotal,
          valor: valorIVA,
        },
        totalComIVA: subtotal + valorIVA,
        valorTotal: subtotal + valorIVA,
      };
    });
  };

  // Handler para remover item da cotação
  const handleRemoverItemCotacao = (id: number): void => {
    setNovaCotacaoData((prev) => {
      const novosItens = prev.itens.filter((item) => item.id !== id);
      const calculos = recalcularTotaisCotacao(novosItens, prev.iva);
      
      return {
        ...prev,
        itens: novosItens,
        subtotal: calculos.subtotal,
        valorTotal: calculos.totalComIVA,
        totalComIVA: calculos.totalComIVA,
        iva: {
          ...prev.iva,
          valor: calculos.valorIVA,
          baseCalculo: calculos.baseCalculoIVA,
        },
      };
    });
  };

  // Handler para fechar modal
  const handleFecharModalNovaFatura = (): void => {
    setShowModalNovaFatura(false);
    setNovaFaturaData(defaultNovaFatura);
    setClienteSelecionado(null);
    setBuscaCliente("");
    setCargasCliente([]);
    setCargaSelecionada(null);
  };

  // Handler para fechar modal de cotação
  const handleFecharModalNovaCotacao = (): void => {
  setShowModalNovaCotacao(false);
  setNovaCotacaoData(defaultNovaCotacao);
  setClienteSelecionado(null);
  setBuscaCliente("");
  setCargasClienteCotacao([]);
  setCargaSelecionadaCotacao(null);
};

  // Handler para mudança nos campos do modal
  const handleModalChange = (field: keyof NovaFaturaData, value: any): void => {
    setNovaFaturaData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handler para mudança nos campos do modal de cotação
  const handleModalCotacaoChange = (field: keyof NovaCotacaoData, value: any): void => {
    setNovaCotacaoData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handler para mudança nos dados do cliente
  const handleClienteChange = (
    field: keyof NovaFaturaData["cliente"],
    value: string
  ): void => {
    setNovaFaturaData({
      ...novaFaturaData,
      cliente: {
        ...novaFaturaData.cliente,
        [field]: value,
      },
    });
  };

  // Handler para mudança nos dados do cliente na cotação
  const handleClienteChangeCotacao = (
    field: keyof NovaCotacaoData["cliente"],
    value: string
  ): void => {
    setNovaCotacaoData({
      ...novaCotacaoData,
      cliente: {
        ...novaCotacaoData.cliente,
        [field]: value,
      },
    });
  };

  // Função para recalcular totais quando itens mudam
  const recalcularTotaisCotacao = (itens: NovaCotacaoData["itens"], ivaConfig: NovaCotacaoData["iva"]) => {
    const subtotal = itens.reduce((total, item) => total + item.valorTotal, 0);
    
    // Calcular base de cálculo do IVA (somente itens com temIVA !== false)
    const baseCalculoIVA = itens
      .filter(item => item.temIVA !== false)
      .reduce((total, item) => total + item.valorTotal, 0);
    
    // Calcular valor do IVA
    let valorIVA = 0;
    
    if (ivaConfig?.tipo === "incluso") {
      valorIVA = baseCalculoIVA * ((ivaConfig.percentual || 16) / 100);
    }
    
    const totalComIVA = subtotal + valorIVA;
    
    return {
      subtotal,
      baseCalculoIVA,
      valorIVA,
      totalComIVA
    };
  };

  // Handler para selecionar carga na cotação
    const handleSelecionarCargaCotacao = async (carga: any): Promise<void> => {
      setCargaSelecionadaCotacao(carga);

      // Carregar detalhes da carga
      const cargaDetail = await fetchCargaDetail(carga.codigo);

      if (cargaDetail) {
        // Gerar todos os itens da cotação baseados na carga
        const itensCotacao: NovaCotacaoData["itens"][0][] = [];
        let itemId = 1;

        // Item 1: Frete de Transporte
        if (cargaDetail.valorFrete || cargaDetail.freteIda) {
          const valorFrete = cargaDetail.valorFrete || cargaDetail.freteIda;
          itensCotacao.push({
            id: itemId++,
            descricao: `Frete de transporte - ${cargaDetail.tipoPercurso || "Nacional"} para ${cargaDetail.destinoFrete || "Destino não especificado"}`,
            tipo: "frete",
            quantidade: 1,
            valorUnitario: valorFrete,
            valorTotal: valorFrete,
            temIVA: true, // ← ADICIONE ESTE CAMPO
          });
        }

        // Item 2: Taxas Portuárias
        if (cargaDetail.taxasPortuarias && cargaDetail.taxasPortuarias > 0) {
          itensCotacao.push({
            id: itemId++,
            descricao: "Taxas portuárias e alfandegárias",
            tipo: "taxa",
            quantidade: 1,
            valorUnitario: cargaDetail.taxasPortuarias,
            valorTotal: cargaDetail.taxasPortuarias,
            temIVA: true, // ← ADICIONE ESTE CAMPO
          });
        }

        // Item 3: Seguro da Carga
        if (cargaDetail.seguro?.premioFinal || cargaDetail.seguro?.valorPremio || cargaDetail.seguro?.premioCalculado) {
          const premioSeguro = cargaDetail.seguro?.premioFinal || 
                              cargaDetail.seguro?.valorPremio || 
                              cargaDetail.seguro?.premioCalculado;
          itensCotacao.push({
            id: itemId++,
            descricao: `Seguro de carga - ${cargaDetail.categoriaSeguro || "Carga Geral"} (${cargaDetail.abrangenciaSeguro || "Nacional"})`,
            tipo: "seguro",
            quantidade: 1,
            valorUnitario: premioSeguro,
            valorTotal: premioSeguro,
            temIVA: false, // Seguro geralmente não tem IVA
          });
        }

        // Item 4: Comissão/Logística
        if (cargaDetail.comissaoCalculada || cargaDetail.percentualLogistica) {
          const comissao = cargaDetail.comissaoCalculada ||
                          ((cargaDetail.freteIda || 0) * (cargaDetail.percentualLogistica || 5)) / 100;
          itensCotacao.push({
            id: itemId++,
            descricao: `Comissão de logística e gestão (${cargaDetail.percentualLogistica || 5}%)`,
            tipo: "comissao",
            quantidade: 1,
            valorUnitario: comissao,
            valorTotal: comissao,
            temIVA: true,
          });
        }

        // Item 5: Despesas Operacionais
        if (cargaDetail.despesasOperacionais && cargaDetail.despesasOperacionais > 0) {
          itensCotacao.push({
            id: itemId++,
            descricao: "Despesas operacionais e administrativas",
            tipo: "despesa",
            quantidade: 1,
            valorUnitario: cargaDetail.despesasOperacionais,
            valorTotal: cargaDetail.despesasOperacionais,
            temIVA: true,
          });
        }

        // Item 6: Custos Extras (se houver)
        if (cargaDetail.custosExtras && cargaDetail.custosExtras.length > 0) {
          cargaDetail.custosExtras.forEach((custo: any) => {
            itensCotacao.push({
              id: itemId++,
              descricao: custo.descricao || custo.tipo || "Custo extra",
              tipo: custo.tipo || "outro",
              quantidade: 1,
              valorUnitario: custo.valor,
              valorTotal: custo.valor,
              temIVA: custo.tipo !== "seguro", // Custos extras geralmente têm IVA, exceto seguros
            });
          });
        }

        // Item 7: Frete de Volta (se aplicável)
        if (cargaDetail.freteVolta && cargaDetail.freteVolta > 0) {
          itensCotacao.push({
            id: itemId++,
            descricao: `Frete de volta - ${cargaDetail.tipoPercurso || "Nacional"}`,
            tipo: "frete",
            quantidade: 1,
            valorUnitario: cargaDetail.freteVolta,
            valorTotal: cargaDetail.freteVolta,
            temIVA: true,
          });
        }

        // Item 8: Seguro do Veículo (se aplicável)
        if (cargaDetail.veiculo?.seguroVeiculo?.valorPremio) {
          itensCotacao.push({
            id: itemId++,
            descricao: `Seguro do veículo - ${cargaDetail.veiculo?.seguroVeiculo?.tipo || "Terceiros"}`,
            tipo: "seguro",
            quantidade: 1,
            valorUnitario: cargaDetail.veiculo.seguroVeiculo.valorPremio,
            valorTotal: cargaDetail.veiculo.seguroVeiculo.valorPremio,
            temIVA: false, // Seguro não tem IVA
          });
        }

        // Se não houver itens, adiciona um item básico
        if (itensCotacao.length === 0 && cargaDetail.valorMercadoria) {
          itensCotacao.push({
            id: 1,
            descricao: `Transporte de carga ${cargaDetail.tipoCarga || "geral"} - ${cargaDetail.descricao || "Serviço de transporte"}`,
            tipo: "frete",
            quantidade: 1,
            valorUnitario: cargaDetail.valorMercadoria * 0.1,
            valorTotal: cargaDetail.valorMercadoria * 0.1,
            temIVA: true,
          });
        }

        // Calcular valores
        const subtotal = itensCotacao.reduce((total, item) => total + item.valorTotal, 0);
        
        // Calcular base de cálculo do IVA (somente itens com temIVA !== false)
        const baseCalculoIVA = itensCotacao
          .filter(item => item.temIVA !== false)
          .reduce((total, item) => total + item.valorTotal, 0);
        
        // Calcular valor do IVA (16% padrão)
        const valorIVA = baseCalculoIVA * 0.16;
        const totalComIVA = subtotal + valorIVA;

        // Preencher automaticamente os campos da cotação com base na carga
        setNovaCotacaoData((prev) => ({
          ...prev,
          detalhesCarga: {
            tipoCarga: cargaDetail.tipoCarga,
            naturezaCarga: cargaDetail.naturezaCarga,
            pesoBruto: cargaDetail.pesoBruto,
            pesoLiquido: cargaDetail.pesoLiquido,
            volume: cargaDetail.volume,
            quantidade: cargaDetail.quantidadeVolumes,
            unidadeMedida: "unidades",
            descricao: `Cotação para transporte de carga ${cargaDetail.tipoCarga} - ${cargaDetail.descricao?.substring(0, 100)}...`,
          },
          origem: {
            cidade: cargaDetail.origem?.cidade || "",
            pais: cargaDetail.origem?.pais || "Moçambique",
            endereco: cargaDetail.origem?.local || "",
            contactoOrigem: cargaDetail.contatoCliente || "",
          },
          destino: {
            cidade: cargaDetail.destino?.cidade || "",
            pais: cargaDetail.destino?.pais || "Moçambique",
            endereco: cargaDetail.destino?.local || "",
            contactoDestino: "",
          },
          itens: itensCotacao,
          iva: {
            tipo: "incluso",
            percentual: 16,
            valor: valorIVA,
            baseCalculo: baseCalculoIVA,
          },
          subtotal: subtotal,
          valorTotal: totalComIVA,
          totalComIVA: totalComIVA,
          // Definir tipo de serviço baseado na carga
          tipoServico: cargaDetail.naturezaCarga === "perigosa" ? "seguro" : "transporte",
          subtipoServico: cargaDetail.tipoPercurso === "Beira-Interland" ? "rodoviario" : 
                        cargaDetail.tipoPercurso === "Local" ? "rodoviario" : 
                        cargaDetail.tipoPercurso === "Nacional" ? "rodoviario" : "outro",
          moeda: cargaDetail.moedaComissao === "USD" ? "USD" : "MZN",
        }));
      }
    };
  // Handler para selecionar cliente
  const handleSelecionarCliente = async (cliente: Cliente): Promise<void> => {
    setClienteSelecionado(cliente);
    setBuscaCliente(cliente.nome);

    // Buscar cargas para fatura (se modal de fatura aberto)
    if (showModalNovaFatura) {
      fetchCargasCliente(cliente._id);
    }
    
    // Buscar cargas para cotação (se modal de cotação aberto)
    if (showModalNovaCotacao) {
      fetchCargasClienteParaCotacao(cliente._id);
    }

    const clienteDetail = await fetchClienteDetail(cliente.codigo);

    if (clienteDetail) {
      // Atualizar dados da fatura
      setNovaFaturaData((prev) => ({
        ...prev,
        clienteId: cliente._id,
        cliente: {
          nome: clienteDetail.nome,
          nif: clienteDetail.nuit,
          email: clienteDetail.email,
          telefone: clienteDetail.telefone,
        },
      }));

      // Atualizar dados da cotação
      setNovaCotacaoData((prev) => ({
        ...prev,
        clienteId: cliente._id,
        cliente: {
          nome: clienteDetail.nome,
          nif: clienteDetail.nuit,
          email: clienteDetail.email,
          telefone: clienteDetail.telefone,
        },
      }));
    } else {
      // Atualizar dados da fatura
      setNovaFaturaData((prev) => ({
        ...prev,
        clienteId: cliente._id,
        cliente: {
          nome: cliente.nome,
          nif: cliente.nuit,
          email: cliente.email,
          telefone: cliente.telefone,
        },
      }));

      // Atualizar dados da cotação
      setNovaCotacaoData((prev) => ({
        ...prev,
        clienteId: cliente._id,
        cliente: {
          nome: cliente.nome,
          nif: cliente.nuit,
          email: cliente.email,
          telefone: cliente.telefone,
        },
      }));
    }
  };

  // Handler para busca de cliente
  const handleBuscarCliente = (): void => {
    fetchClientes(buscaCliente);
  };

  // Handler para submeter o formulário da nova fatura
  const handleSubmitNovaFatura = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (
      !novaFaturaData.clienteId ||
      !novaFaturaData.cliente.nome ||
      novaFaturaData.valorTotal <= 0 ||
      !novaFaturaData.dataVencimento
    ) {
      setError("Preencha todos os campos obrigatórios (*)");
      return;
    }

    if (novaFaturaData.itensFatura.length === 0) {
      setError("Adicione pelo menos um item à fatura");
      return;
    }

    const itensInvalidos = novaFaturaData.itensFatura.filter(
      (item) => item.valorTotal <= 0
    );

    if (itensInvalidos.length > 0) {
      setError("Todos os itens devem ter valor maior que zero");
      return;
    }

    setModalLoading(true);
    try {
      await criarNovaFatura(novaFaturaData);
    } finally {
      setModalLoading(false);
    }
  };

  // Handler para submeter o formulário da nova cotação
  const handleSubmitNovaCotacao = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (
      !novaCotacaoData.clienteId ||
      !novaCotacaoData.cliente.nome ||
      !novaCotacaoData.detalhesCarga.descricao ||
      !novaCotacaoData.origem.cidade ||
      !novaCotacaoData.destino.cidade ||
      !novaCotacaoData.dataValidade
    ) {
      setError("Preencha todos os campos obrigatórios (*)");
      return;
    }

    if (novaCotacaoData.itens.length === 0) {
      setError("Adicione pelo menos um item à cotação");
      return;
    }

    const itensInvalidos = novaCotacaoData.itens.filter(
      (item) => item.valorTotal <= 0
    );

    if (itensInvalidos.length > 0) {
      setError("Todos os itens devem ter valor maior que zero");
      return;
    }

    setModalLoading(true);
    try {
      await criarNovaCotacao(novaCotacaoData);
    } finally {
      setModalLoading(false);
    }
  };

  // Handler para converter cotação selecionada
  const handleConverterCotacao = async (): Promise<void> => {
    if (!cotacaoSelecionada) return;

    const numeroFatura = `FT-${new Date().getFullYear()}-${Math.floor(
      Math.random() * 10000
    )
      .toString()
      .padStart(4, "0")}`;

    const faturaData = {
      faturaId: `FAT-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 6)}`,
      numeroFatura: numeroFatura,
      dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    };

    const sucesso = await converterCotacaoParaFatura(cotacaoSelecionada.quotationId, faturaData);
    if (sucesso) {
      setCotacaoSelecionada(null);
    }
  };

  // Handler para mudança nos filtros de cotações
  const handleFiltrosCotacoesChange = (
    field: keyof CotacaoFiltros,
    value: string | number | undefined
  ): void => {
    setFiltrosCotacoes({
      ...filtrosCotacoes,
      [field]: value,
    });
  };

  // Efeito para carregar dados iniciais
  useEffect(() => {
    if (activeContasReceber === ExtendedActiveTab.DASHBOARD) {
      fetchDashboardData();
    } else if (activeContasReceber === ExtendedActiveTab.FATURAS) {
      fetchFaturas();
    } else if (activeContasReceber === ExtendedActiveTab.COTACOES) {
      fetchCotacoes();
    }
  }, [activeContasReceber, filtrosFaturas.curPage, filtrosCotacoes.curPage]);

  // Efeito para carregar detalhes da fatura quando selecionada
  useEffect(() => {
    if (formRecebimento.faturaId) {
      fetchFaturaDetail(formRecebimento.faturaId);
    }
  }, [formRecebimento.faturaId]);

  // Função para formatar valor monetário
  const formatarMoeda = (valor: number): string => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor || 0);
  };

  // Função para calcular dias até vencimento
  const calcularDiasVencimento = (dataVencimento: string): number => {
    if (!dataVencimento) return 0;
    const hoje = new Date();
    const vencimento = new Date(dataVencimento);
    const diffTime = vencimento.getTime() - hoje.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Função para obter status da fatura
  const obterStatusFatura = (
    fatura: FaturaDetalhada | { status: StatusFatura }
  ): StatusInfo => {
    switch (fatura.status) {
      case StatusFatura.PAGA:
        return { texto: "Paga", cor: "bg-green-100 text-green-800" };
      case StatusFatura.VENCIDA:
        return { texto: "Vencida", cor: "bg-red-100 text-red-800" };
      case StatusFatura.PARCIAL:
        return { texto: "Parcial", cor: "bg-yellow-100 text-yellow-800" };
      default:
        return { texto: "Pendente", cor: "bg-gray-100 text-gray-800" };
    }
  };

  // Função para obter status da cotação
  const obterStatusCotacao = (cotacao: Cotacao): StatusInfo => {
    switch (cotacao.status) {
      case "aprovado":
        return { texto: "Aprovado", cor: "bg-green-100 text-green-800" };
      case "rejeitado":
        return { texto: "Rejeitado", cor: "bg-red-100 text-red-800" };
      case "enviado":
        return { texto: "Enviado", cor: "bg-blue-100 text-blue-800" };
      case "revisao":
        return { texto: "Em Revisão", cor: "bg-yellow-100 text-yellow-800" };
      case "convertido":
        return { texto: "Convertido", cor: "bg-purple-100 text-purple-800" };
      case "expirado":
        return { texto: "Expirado", cor: "bg-gray-100 text-gray-800" };
      default:
        return { texto: "Rascunho", cor: "bg-gray-100 text-gray-800" };
    }
  };

  // Função para obter cor da prioridade
  const obterCorPrioridade = (prioridade: string): string => {
    switch (prioridade) {
      case "alta":
        return "bg-red-100 text-red-800";
      case "urgente":
        return "bg-red-200 text-red-900";
      case "media":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  // Handler para mudança no formulário de recebimento
  const handleFormRecebimentoChange = (
    field: keyof FormRecebimento,
    value: string
  ): void => {
    setFormRecebimento({
      ...formRecebimento,
      [field]: value,
    });
  };

  // Handler para mudança nos filtros de faturas
  const handleFiltrosFaturasChange = (
    field: keyof FaturaFiltros,
    value: string | number | undefined
  ): void => {
    setFiltrosFaturas({
      ...filtrosFaturas,
      [field]: value,
    });
  };

  // Handler para criar nova fatura via prompt
  const handleCriarNovaFatura = async (): Promise<void> => {
    handleAbrirModalNovaFatura();
  };

  // Handler para gerar relatório personalizado
  const handleGerarRelatorioPersonalizado = async (): Promise<void> => {
    const tipoRelatorioSelect = document.getElementById(
      "tipoRelatorio"
    ) as HTMLSelectElement;
    const dataInicioInput = document.getElementById(
      "dataInicio"
    ) as HTMLInputElement;
    const dataFimInput = document.getElementById("dataFim") as HTMLInputElement;

    const tipoRelatorio = tipoRelatorioSelect.value as TipoRelatorio;
    const dataInicio = dataInicioInput.value;
    const dataFim = dataFimInput.value;

    const relatorio = await gerarRelatorio(tipoRelatorio, dataInicio, dataFim);
    if (relatorio) {
      alert(
        `Relatório gerado com sucesso!\nTotal de faturas: ${relatorio.totais.totalFaturas}`
      );
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Cabeçalho */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">💰</span>
          Contas a Receber - Gestão de Recebíveis
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Controle e acompanhamento de recebíveis, faturas e fluxo de caixa
        </p>

        {/* Mensagem de carregamento/erro */}
        {loading && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-600 text-sm">Carregando dados...</p>
          </div>
        )}

        {error && (
          <div className="mt-3 p-3 bg-red-50 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          {Object.values(ExtendedActiveTab).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveContasReceber(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeContasReceber === tab
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab === ExtendedActiveTab.DASHBOARD && "📊 Dashboard"}
              {tab === ExtendedActiveTab.COTACOES && "📝 Cotações"}
              {tab === ExtendedActiveTab.FATURAS && "📄 Faturas"}
              {tab === ExtendedActiveTab.RECEBIMENTOS && "💸 Recebimentos"}
              {tab === ExtendedActiveTab.GRAFICOS && "📊 Gráficos"}
              {tab === ExtendedActiveTab.RELATORIOS && "📈 Relatórios"}              
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeContasReceber === ExtendedActiveTab.DASHBOARD && (
          <div className="space-y-6">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total a Receber
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatarMoeda(
                        dashboardData.estatisticas?.valorPendente || 2850000
                      )}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">💰</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    {dashboardData.estatisticas?.faturasPendentes || 0} faturas
                    pendentes
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Vencidos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatarMoeda(
                        dashboardData.estatisticas?.valorVencido || 450000
                      )}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">⚠️</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    {dashboardData.estatisticas?.faturasVencidas || 3} faturas
                    atrasadas
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      A Vencer (7 dias)
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatarMoeda(
                        dashboardData.estatisticas?.valorAReceber7Dias ||
                          1200000
                      )}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">⏳</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    {dashboardData.proximosVencimentos?.length || 8} faturas
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Recebido Mês
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatarMoeda(
                        dashboardData.recebimentosMes?.totalRecebido || 1750000
                      )}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">✅</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    {dashboardData.recebimentosMes?.countRecebimentos || 0}{" "}
                    recebimentos
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Próximos Vencimentos */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-green-50">
                  <h3 className="font-semibold text-gray-900">
                    📅 Próximos Vencimentos
                  </h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {dashboardData.proximosVencimentos
                      ?.slice(0, 3)
                      .map((fatura, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              {fatura.numeroFatura}
                            </p>
                            <p className="text-sm text-gray-600">
                              {fatura.cliente?.nome}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">
                              {formatarMoeda(
                                fatura.valorPendente || fatura.valorTotal
                              )}
                            </p>
                            <p className="text-sm text-blue-600">
                              {calcularDiasVencimento(fatura.dataVencimento) > 0
                                ? `Vence em ${calcularDiasVencimento(
                                    fatura.dataVencimento
                                  )} dias`
                                : "Vence hoje"}
                            </p>
                          </div>
                        </div>
                      ))}

                    {(!dashboardData.proximosVencimentos ||
                      dashboardData.proximosVencimentos.length === 0) && (
                      <div className="p-3 text-center text-gray-500">
                        Nenhuma fatura a vencer nos próximos dias
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Faturas Vencidas */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-red-50">
                  <h3 className="font-semibold text-gray-900">
                    ⚠️ Faturas Vencidas
                  </h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {dashboardData.faturasVencidas
                      ?.slice(0, 3)
                      .map((fatura, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              {fatura.numeroFatura}
                            </p>
                            <p className="text-sm text-gray-600">
                              {fatura.cliente?.nome}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">
                              {formatarMoeda(
                                fatura.valorPendente || fatura.valorTotal
                              )}
                            </p>
                            <p className="text-sm text-blue-600">
                              {Math.abs(
                                calcularDiasVencimento(fatura.dataVencimento)
                              )}{" "}
                              dias atrasado
                            </p>
                          </div>
                        </div>
                      ))}

                    {(!dashboardData.faturasVencidas ||
                      dashboardData.faturasVencidas.length === 0) && (
                      <div className="p-3 text-center text-green-500">
                        ✅ Nenhuma fatura vencida
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Clientes Principais */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  🏢 Principais Clientes
                </h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {dashboardData.clientesPrincipais
                    ?.slice(0, 4)
                    .map((cliente, index) => (
                      <div
                        key={index}
                        className="p-4 bg-white border border-gray-200 rounded-lg"
                      >
                        <p className="font-medium text-gray-900">
                          {cliente.nomeCliente}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatarMoeda(cliente.totalValor)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {cliente.faturasPendentes} faturas pendentes
                        </p>
                      </div>
                    ))}

                  {(!dashboardData.clientesPrincipais ||
                    dashboardData.clientesPrincipais.length === 0) && (
                    <div className="col-span-4 p-4 text-center text-gray-500">
                      Nenhum cliente com faturas pendentes
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gestão de Faturas */}
        {activeContasReceber === ExtendedActiveTab.FATURAS && (
          <div className="space-y-6 text-gray-900">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-green-50">
                <h3 className="font-semibold text-gray-900">
                  📄 Gestão de Facturas
                </h3>
                <div className="mt-2 flex space-x-4">
                  <button
                    onClick={handleCriarNovaFatura}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
                  >
                    + Nova Fatura
                  </button>
                </div>
              </div>
              <div className="p-6">
                {/* Filtros */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    value={filtrosFaturas.status || ""}
                    onChange={(e) =>
                      handleFiltrosFaturasChange(
                        "status",
                        e.target.value || undefined
                      )
                    }
                  >
                    <option value="">Status: Todos</option>
                    {Object.values(StatusFatura).map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    placeholder="ID do Cliente"
                    value={filtrosFaturas.clienteId}
                    onChange={(e) =>
                      handleFiltrosFaturasChange("clienteId", e.target.value)
                    }
                  />

                  <input
                    type="date"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    placeholder="De"
                    value={filtrosFaturas.dataInicio}
                    onChange={(e) =>
                      handleFiltrosFaturasChange("dataInicio", e.target.value)
                    }
                  />

                  <input
                    type="date"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    placeholder="Até"
                    value={filtrosFaturas.dataFim}
                    onChange={(e) =>
                      handleFiltrosFaturasChange("dataFim", e.target.value)
                    }
                  />
                </div>

                {/* Botão aplicar filtros */}
                <div className="mb-6">
                  <button
                    onClick={fetchFaturas}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Aplicar Filtros
                  </button>
                  <button
                    onClick={() => {
                      setFiltrosFaturas(defaultFaturaFiltros);
                      fetchFaturas();
                    }}
                    className="ml-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Limpar Filtros
                  </button>
                </div>

                {/* Lista de Faturas */}
                <div className="space-y-3">
                  {faturas.map((fatura, index) => {
                    const status = obterStatusFatura(fatura);
                    const diasVencimento = calcularDiasVencimento(
                      fatura.dataVencimento
                    );

                    return (
                      <div
                        key={fatura.faturaId || index}
                        className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-2 h-12 rounded-full ${
                              fatura.status === StatusFatura.VENCIDA
                                ? "bg-red-500"
                                : fatura.status === StatusFatura.PAGA
                                ? "bg-green-500"
                                : diasVencimento <= 3
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                            }`}
                          ></div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {fatura.numeroFatura}
                            </p>
                            <p className="text-sm text-gray-600">
                              {fatura.cliente?.nome ||
                                "Cliente não especificado"}
                            </p>
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-gray-600">Valor</p>
                          <p className="font-bold text-gray-900">
                            {formatarMoeda(fatura.valorTotal)}
                          </p>
                          <p className="text-xs text-gray-500">
                            Pendente:{" "}
                            {formatarMoeda(
                              fatura.valorPendente || fatura.valorTotal
                            )}
                          </p>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-gray-600">Vencimento</p>
                          <p className="text-gray-900 font-medium">
                            {new Date(fatura.dataVencimento).toLocaleDateString(
                              "pt-MZ"
                            )}
                          </p>
                          <p
                            className={`text-xs ${
                              diasVencimento <= 0
                                ? "text-red-600"
                                : "text-blue-600"
                            }`}
                          >
                            {diasVencimento > 0
                              ? `${diasVencimento} dias`
                              : `${Math.abs(diasVencimento)} dias atrasado`}
                          </p>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-gray-600">Status</p>
                          <span
                            className={`px-2 py-1 ${status.cor} rounded-full text-xs`}
                          >
                            {status.texto}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            {fatura.recebimentos?.filter(
                              (r) => r.status === StatusRecebimento.CONFIRMADO
                            ).length || 0}{" "}
                            recebimentos
                          </p>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setFormRecebimento({
                                ...formRecebimento,
                                faturaId: fatura.faturaId,
                              });
                              setActiveContasReceber(ExtendedActiveTab.RECEBIMENTOS);
                            }}
                            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                            disabled={fatura.status === StatusFatura.PAGA}
                          >
                            Receber
                          </button>
                          <button
                            onClick={() => fetchFaturaDetail(fatura.faturaId)}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                          >
                            Detalhes
                          </button>
                          {/* Botão para gerar PDF */}
                          <button
                            onClick={() => handleGerarPDFFatura(fatura)}
                            className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 flex items-center"
                            disabled={loading}
                            title="Gerar PDF da Fatura"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {faturas.length === 0 && !loading && (
                    <div className="p-8 text-center text-gray-500">
                      Nenhuma fatura encontrada com os filtros selecionados
                    </div>
                  )}
                </div>

                {/* Paginação */}
                {faturas.length > 0 && (
                  <div className="mt-6 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Mostrando {faturas.length} faturas
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          setFiltrosFaturas({
                            ...filtrosFaturas,
                            curPage: Math.max(1, filtrosFaturas.curPage - 1),
                          })
                        }
                        disabled={filtrosFaturas.curPage <= 1}
                        className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
                      >
                        Anterior
                      </button>
                      <span className="px-3 py-1">
                        Página {filtrosFaturas.curPage}
                      </span>
                      <button
                        onClick={() =>
                          setFiltrosFaturas({
                            ...filtrosFaturas,
                            curPage: filtrosFaturas.curPage + 1,
                          })
                        }
                        className="px-3 py-1 border border-gray-300 rounded"
                      >
                        Próxima
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Gestão de Cotações */}
        {activeContasReceber === ExtendedActiveTab.COTACOES && (
          <div className="space-y-6 text-gray-900">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  📝 Gestão de Cotações
                </h3>
                <div className="mt-2 flex space-x-4">
                  <button
                    onClick={handleAbrirModalNovaCotacao}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                  >
                    + Nova Cotação
                  </button>
                  <button
                    onClick={fetchCotacoes}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
                  >
                    Atualizar Lista
                  </button>
                </div>
              </div>
              <div className="p-6">
                {/* Filtros */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    value={filtrosCotacoes.status || ""}
                    onChange={(e) =>
                      handleFiltrosCotacoesChange("status", e.target.value || undefined)
                    }
                  >
                    <option value="">Status: Todos</option>
                    <option value="rascunho">Rascunho</option>
                    <option value="enviado">Enviado</option>
                    <option value="revisao">Em Revisão</option>
                    <option value="aprovado">Aprovado</option>
                    <option value="rejeitado">Rejeitado</option>
                    <option value="convertido">Convertido</option>
                    <option value="expirado">Expirado</option>
                  </select>

                  <input
                    type="text"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    placeholder="Nome do Cliente"
                    value={filtrosCotacoes.clienteNome || ""}
                    onChange={(e) =>
                      handleFiltrosCotacoesChange("clienteNome", e.target.value)
                    }
                  />

                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    value={filtrosCotacoes.tipoServico || ""}
                    onChange={(e) =>
                      handleFiltrosCotacoesChange("tipoServico", e.target.value || undefined)
                    }
                  >
                    <option value="">Tipo: Todos</option>
                    <option value="transporte">Transporte</option>
                    <option value="armazenagem">Armazenagem</option>
                    <option value="logistica">Logística</option>
                    <option value="seguro">Seguro</option>
                    <option value="frete">Frete</option>
                    <option value="outro">Outro</option>
                  </select>

                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    value={filtrosCotacoes.prioridade || ""}
                    onChange={(e) =>
                      handleFiltrosCotacoesChange("prioridade", e.target.value || undefined)
                    }
                  >
                    <option value="">Prioridade: Todas</option>
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                    <option value="urgente">Urgente</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <input
                    type="date"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    placeholder="Data Início"
                    value={filtrosCotacoes.dataInicio || ""}
                    onChange={(e) =>
                      handleFiltrosCotacoesChange("dataInicio", e.target.value)
                    }
                  />

                  <input
                    type="date"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    placeholder="Data Fim"
                    value={filtrosCotacoes.dataFim || ""}
                    onChange={(e) =>
                      handleFiltrosCotacoesChange("dataFim", e.target.value)
                    }
                  />

                  <input
                    type="number"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    placeholder="Valor Mínimo"
                    value={filtrosCotacoes.valorMin || ""}
                    onChange={(e) =>
                      handleFiltrosCotacoesChange("valorMin", e.target.value ? parseFloat(e.target.value) : undefined)
                    }
                  />
                </div>

                {/* Botão aplicar filtros */}
                <div className="mb-6">
                  <button
                    onClick={fetchCotacoes}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Aplicar Filtros
                  </button>
                  <button
                    onClick={() => {
                      setFiltrosCotacoes(defaultCotacaoFiltros);
                      fetchCotacoes();
                    }}
                    className="ml-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Limpar Filtros
                  </button>
                </div>

                {/* Lista de Cotações */}
                <div className="space-y-3">
                  {cotacoes.map((cotacao, index) => {
                    const status = obterStatusCotacao(cotacao);
                    const diasAteExpiracao = cotacao.diasAteExpiracao || 0;
                    const expirado = cotacao.expirado || false;

                    return (
                      <div
                        key={cotacao.quotationId || index}
                        className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-2 h-12 rounded-full ${
                              expirado
                                ? "bg-red-500"
                                : cotacao.status === "convertido"
                                ? "bg-purple-500"
                                : cotacao.status === "aprovado"
                                ? "bg-green-500"
                                : diasAteExpiracao <= 3
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                            }`}
                          ></div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {cotacao.numeroQuotation}
                              {cotacao.versao > 1 && ` v${cotacao.versao}`}
                            </p>
                            <p className="text-sm text-gray-600">
                              {cotacao.cliente?.nome ||
                                "Cliente não especificado"}
                            </p>
                            <div className="flex space-x-2 mt-1">
                              <span className={`px-2 py-1 ${obterCorPrioridade(cotacao.prioridade)} rounded-full text-xs`}>
                                {cotacao.prioridade}
                              </span>
                              <span className="text-xs text-gray-500">
                                Probabilidade: {cotacao.probabilidadeFechamento}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-gray-600">Valor</p>
                          <p className="font-bold text-gray-900">
                            {formatarMoeda(cotacao.valorTotal)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {cotacao.moeda}
                          </p>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-gray-600">Validade</p>
                          <p className="text-gray-900 font-medium">
                            {new Date(cotacao.dataValidade).toLocaleDateString(
                              "pt-MZ"
                            )}
                          </p>
                          <p
                            className={`text-xs ${
                              expirado
                                ? "text-red-600"
                                : diasAteExpiracao <= 3
                                ? "text-yellow-600"
                                : "text-blue-600"
                            }`}
                          >
                            {expirado
                              ? "Expirado"
                              : `${diasAteExpiracao} dias restantes`}
                          </p>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-gray-600">Status</p>
                          <span
                            className={`px-2 py-1 ${status.cor} rounded-full text-xs`}
                          >
                            {status.texto}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            {cotacao.tipoServico}
                          </p>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => fetchCotacaoDetail(cotacao.quotationId)}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                          >
                            Detalhes
                          </button>
                           <button
                            onClick={() => handleGerarPDFCotacao(cotacao)}
                            className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 flex items-center"
                            disabled={loading}
                            title="Gerar PDF da Cotação"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            PDF
                          </button>
  
                          {cotacao.status === "aprovado" && !expirado && (
                            <button
                              onClick={() => {
                                setCotacaoSelecionada(cotacao);
                                setShowModalConvertCotacao(true);
                              }}
                              className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
                            >
                              Converter
                            </button>
                          )}
                          {(cotacao.status === "rascunho" || cotacao.status === "revisao") && (
                            <button
                              onClick={() => atualizarStatusCotacao(cotacao.quotationId, "enviado")}
                              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                            >
                              Enviar
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {cotacoes.length === 0 && !loading && (
                    <div className="p-8 text-center text-gray-500">
                      Nenhuma cotação encontrada com os filtros selecionados
                    </div>
                  )}
                </div>

                {/* Paginação */}
                {cotacoes.length > 0 && (
                  <div className="mt-6 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Mostrando {cotacoes.length} cotações
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          setFiltrosCotacoes({
                            ...filtrosCotacoes,
                            curPage: Math.max(1, filtrosCotacoes.curPage - 1),
                          })
                        }
                        disabled={filtrosCotacoes.curPage <= 1}
                        className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
                      >
                        Anterior
                      </button>
                      <span className="px-3 py-1">
                        Página {filtrosCotacoes.curPage}
                      </span>
                      <button
                        onClick={() =>
                          setFiltrosCotacoes({
                            ...filtrosCotacoes,
                            curPage: filtrosCotacoes.curPage + 1,
                          })
                        }
                        className="px-3 py-1 border border-gray-300 rounded"
                      >
                        Próxima
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Registro de Recebimentos */}
        {activeContasReceber === ExtendedActiveTab.RECEBIMENTOS && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Formulário de Recebimento */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-green-50">
                  <h3 className="font-semibold text-gray-900">
                    💸 Registro de Recebimento
                  </h3>
                </div>
                <div className="p-6">
                  <form onSubmit={registrarRecebimento} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Factura *
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                          value={formRecebimento.faturaId}
                          onChange={(e) =>
                            handleFormRecebimentoChange(
                              "faturaId",
                              e.target.value
                            )
                          }
                          required
                        >
                          <option value="">Selecione a factura</option>
                          {faturas
                            .filter((f) => f.status !== StatusFatura.PAGA)
                            .map((fatura) => (
                              <option
                                key={fatura.faturaId}
                                value={fatura.faturaId}
                              >
                                {fatura.numeroFatura} - {fatura.cliente?.nome} (
                                {formatarMoeda(
                                  fatura.valorPendente || fatura.valorTotal
                                )}
                                )
                              </option>
                            ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Valor Recebido (MT) *
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                          placeholder="0,00"
                          value={formRecebimento.valor}
                          onChange={(e) =>
                            handleFormRecebimentoChange("valor", e.target.value)
                          }
                          required
                          step="0.01"
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data do Recebimento *
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                          value={formRecebimento.dataRecebimento}
                          onChange={(e) =>
                            handleFormRecebimentoChange(
                              "dataRecebimento",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Forma de Pagamento *
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                          value={formRecebimento.formaPagamento}
                          onChange={(e) =>
                            handleFormRecebimentoChange(
                              "formaPagamento",
                              e.target.value as FormaPagamento
                            )
                          }
                          required
                        >
                          <option value="">Selecione</option>
                          {Object.entries(FormaPagamento).map(
                            ([key, value]) => (
                              <option key={value} value={value}>
                                {key.charAt(0).toUpperCase() +
                                  key.slice(1).toLowerCase()}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Comprovante/Referência
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                        placeholder="Nº do comprovante ou referência"
                        value={formRecebimento.comprovante}
                        onChange={(e) =>
                          handleFormRecebimentoChange(
                            "comprovante",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Observações
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                        placeholder="Observações sobre o recebimento..."
                        value={formRecebimento.observacoes}
                        onChange={(e) =>
                          handleFormRecebimentoChange(
                            "observacoes",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => {
                          setFormRecebimento({
                            ...defaultFormRecebimento,
                            dataRecebimento: new Date()
                              .toISOString()
                              .split("T")[0],
                          });
                          setFaturaSelecionada(null);
                        }}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50"
                      >
                        {loading ? "Processando..." : "Registrar Recebimento"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Informações da Fatura */}
            <div className="space-y-6">
              {faturaSelecionada ? (
                <>
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Informações da Factura
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-600">Nº Factura:</span>
                        <p className="font-medium text-gray-950">
                          {faturaSelecionada.numeroFatura}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Cliente:</span>
                        <p className="font-medium text-gray-950">
                          {faturaSelecionada.cliente?.nome}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Valor Total:</span>
                        <p className="font-medium text-gray-950">
                          {formatarMoeda(faturaSelecionada.valorTotal)}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Valor Pendente:</span>
                        <p className="font-medium text-gray-950">
                          {formatarMoeda(
                            faturaSelecionada.valorPendente ||
                              faturaSelecionada.valorTotal
                          )}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Vencimento:</span>
                        <p className="font-medium text-gray-950">
                          {new Date(
                            faturaSelecionada.dataVencimento
                          ).toLocaleDateString("pt-MZ")}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Serviço:</span>
                        <p className="font-medium text-gray-950">
                          {faturaSelecionada.descricaoServico}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <span
                          className={`px-2 py-1 ${
                            obterStatusFatura(faturaSelecionada).cor
                          } rounded-full text-xs`}
                        >
                          {obterStatusFatura(faturaSelecionada).texto}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Histórico de Recebimentos
                    </h4>
                    <div className="space-y-3">
                      {faturaSelecionada.recebimentos
                        ?.filter(
                          (r) => r.status === StatusRecebimento.CONFIRMADO
                        )
                        .slice(0, 3)
                        .map((recebimento, index) => (
                          <div
                            key={recebimento.id || index}
                            className="p-3 bg-blue-50 rounded-lg border border-blue-200"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-sm font-medium text-gray-950">
                                  {formatarMoeda(recebimento.valor)}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {new Date(recebimento.data).toLocaleDateString(
                                    "pt-MZ"
                                  )}
                                </p>
                                <p className="text-xs text-blue-600 font-medium">
                                  Via {recebimento.formaPagamento}
                                </p>
                              </div>
                              <div className="flex flex-col items-end space-y-1">
                                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                  Confirmado
                                </span>
                                {/* Botão para gerar recibo */}
                                <button
                                  onClick={() => handleGerarPDFRecibo(faturaSelecionada, recebimento)}
                                  className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                                  title="Gerar recibo"
                                >
                                  📄 Recibo
                                </button>
                              </div>
                            </div>
                            {recebimento.comprovante && (
                              <p className="text-xs text-gray-500 mt-2">
                                Comprovante: {recebimento.comprovante}
                              </p>
                            )}
                            {recebimento.observacoes && (
                              <p className="text-xs text-gray-500 mt-1">
                                Obs: {recebimento.observacoes}
                              </p>
                            )}
                          </div>
                        ))}

                      {(!faturaSelecionada.recebimentos ||
                        faturaSelecionada.recebimentos.length === 0) && (
                        <p className="text-sm text-gray-500 text-center">
                          Nenhum recebimento registrado
                        </p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <div className="text-center text-gray-500">
                    <p>Selecione uma fatura para ver os detalhes</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Gráficos */}
        {activeContasReceber === ExtendedActiveTab.GRAFICOS && (
          <div className="space-y-6 text-gray-950">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                    📊
                  </span>
                  Dashboard Financeiro - Contas a Receber
                </h3>
              </div>
              <div className="p-6">
                {/* Grid de Gráficos Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Distribuição por Status */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-green-500 mr-2">💰</span>
                      Distribuição por Status
                    </h4>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center w-full">
                        <div className="flex justify-center mb-4">
                          <div className="relative w-32 h-32">
                            <div
                              className="w-full h-full rounded-full"
                              style={{
                                background:
                                  "conic-gradient(#10b981 0% 45%, #3b82f6 45% 75%, #f59e0b 75% 85%, #ef4444 85% 100%)",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                            <span>Recebido (45%) - 1.750.000 MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                            <span>A Vencer (30%) - 1.200.000 MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                            <span>Vencendo (10%) - 450.000 MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                            <span>Vencido (15%) - 450.000 MT</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Despesas por Categoria */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-red-500 mr-2">💸</span>
                      Despesas por Categoria
                    </h4>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center w-full">
                        <div className="flex justify-center mb-4">
                          <div className="relative w-32 h-32">
                            <div
                              className="w-full h-full rounded-full"
                              style={{
                                background:
                                  "conic-gradient(#f59e0b 0% 35%, #3b82f6 35% 60%, #10b981 60% 72%, #a855f7 72% 80%, #ef4444 80% 100%)",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                            <span>Combustível (35%) - 450.000 MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                            <span>Manutenção (25%) - 320.000 MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                            <span>Alimentação (12%) - 150.000 MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                            <span>Estacionamento (8%) - 90.000 MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                            <span>Outros (20%) - 260.000 MT</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filtros */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">
                    Filtros do Dashboard
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Período
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Últimos 30 dias</option>
                        <option>Este Mês</option>
                        <option>Trimestre Atual</option>
                        <option>Este Ano</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos</option>
                        <option>Recebido</option>
                        <option>A Vencer</option>
                        <option>Vencido</option>
                        <option>Vencendo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cliente
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos os Clientes</option>
                        <option>Cimentos de Moçambique</option>
                        <option>Mozal</option>
                        <option>Grupo João Ferreira</option>
                        <option>Matola Iron & Steel</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Valor Mínimo
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Qualquer valor</option>
                        <option>Acima de 100.000 MT</option>
                        <option>Acima de 250.000 MT</option>
                        <option>Acima de 500.000 MT</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-4">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                      Limpar Filtros
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                      Aplicar Filtros
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Relatórios */}
        {activeContasReceber === ExtendedActiveTab.RELATORIOS && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-purple-50">
              <h3 className="font-semibold text-gray-900">
                📈 Relatórios Financeiros
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div
                  className="p-4 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100"
                  onClick={() =>
                    gerarRelatorio(TipoRelatorio.FLUXO_CAIXA, "", "")
                  }
                >
                  <div className="text-blue-600 text-lg mb-2">💰</div>
                  <p className="font-medium text-gray-900">Fluxo de Caixa</p>
                  <p className="text-sm text-gray-600">Entradas e saídas</p>
                </div>

                <div
                  className="p-4 bg-green-50 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100"
                  onClick={() =>
                    gerarRelatorio(TipoRelatorio.INADIMPLENCIA, "", "")
                  }
                >
                  <div className="text-green-600 text-lg mb-2">📊</div>
                  <p className="font-medium text-gray-900">Inadimplência</p>
                  <p className="text-sm text-gray-600">Clientes em atraso</p>
                </div>

                <div
                  className="p-4 bg-orange-50 rounded-lg border border-orange-200 cursor-pointer hover:bg-orange-100"
                  onClick={() =>
                    gerarRelatorio(TipoRelatorio.POR_CLIENTE, "", "")
                  }
                >
                  <div className="text-orange-600 text-lg mb-2">🏢</div>
                  <p className="font-medium text-gray-900">Por Cliente</p>
                  <p className="text-sm text-gray-600">
                    Performance por cliente
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-4">
                  Gerar Relatório Personalizado
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Relatório
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                      id="tipoRelatorio"
                      defaultValue={TipoRelatorio.FLUXO_CAIXA}
                    >
                      {Object.entries(TipoRelatorio).map(([key, value]) => (
                        <option key={value} value={value}>
                          {key
                            .split("_")
                            .map(
                              (word) =>
                                word.charAt(0) + word.slice(1).toLowerCase()
                            )
                            .join(" ")}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Inicial
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                      id="dataInicio"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Final
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                      id="dataFim"
                    />
                  </div>
                </div>

                <button
                  onClick={handleGerarRelatorioPersonalizado}
                  className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-purple-600 font-medium"
                >
                  Gerar Relatório
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal para Nova Fatura */}
      {showModalNovaFatura && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-green-50">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  📄 Criar Nova Fatura
                </h3>
                <button
                  onClick={handleFecharModalNovaFatura}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmitNovaFatura} className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número da Fatura *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950 bg-gray-50"
                      value={novaFaturaData.numeroFatura}
                      readOnly
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Gerado automaticamente
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Serviço *
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                      value={novaFaturaData.tipoServico}
                      onChange={(e) =>
                        handleModalChange("tipoServico", e.target.value as any)
                      }
                      required
                    >
                      <option value="transporte">Transporte</option>
                      <option value="armazenagem">Armazenagem</option>
                      <option value="logistica">Logística</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data de Vencimento *
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                      value={novaFaturaData.dataVencimento}
                      onChange={(e) =>
                        handleModalChange("dataVencimento", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valor Total (MT) *
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                      placeholder="0,00"
                      value={novaFaturaData.valorTotal || ""}
                      onChange={(e) =>
                        handleModalChange(
                          "valorTotal",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      required
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>

                {/* Busca de Cliente */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buscar Cliente *
                  </label>
                  <div className="flex space-x-2 mb-4">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                      placeholder="Digite o nome do cliente..."
                      value={buscaCliente}
                      onChange={(e) => setBuscaCliente(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={handleBuscarCliente}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Buscar
                    </button>
                  </div>

                  {clientesLoading ? (
                    <div className="text-center py-4">
                      <p className="text-gray-600">Carregando clientes...</p>
                    </div>
                  ) : clientes.length > 0 ? (
                    <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
                      {clientes.map((cliente) => (
                        <div
                          key={cliente.codigo}
                          className={`p-3 border-b border-gray-100 hover:bg-blue-50 cursor-pointer ${
                            clienteSelecionado?.codigo === cliente.codigo
                              ? "bg-blue-100 border-blue-300"
                              : ""
                          }`}
                          onClick={() => handleSelecionarCliente(cliente)}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-900">
                                {cliente.nome}
                              </p>
                              <p className="text-sm text-gray-600">
                                Código: {cliente.codigo} | NUIT: {cliente.nuit}
                              </p>
                              {cliente.email && (
                                <p className="text-xs text-gray-500">
                                  Email: {cliente.email}
                                </p>
                              )}
                            </div>
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                              {cliente.categoria}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 border border-gray-200 rounded-lg">
                      <p className="text-gray-600">
                        {buscaCliente
                          ? "Nenhum cliente encontrado"
                          : "Digite um nome para buscar clientes"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Dados do Cliente Selecionado */}
                {clienteSelecionado && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Cliente Selecionado
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Nome</p>
                        <p className="font-medium text-gray-950">
                          {clienteSelecionado.nome}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Código</p>
                        <p className="font-medium text-gray-950">
                          {clienteSelecionado.codigo}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">NUIT</p>
                        <p className="font-medium text-gray-950">
                          {clienteSelecionado.nuit}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Categoria</p>
                        <p className="font-medium text-gray-950">
                          {clienteSelecionado.categoria}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Seleção de Carga (se cliente selecionado) */}
                {clienteSelecionado && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selecionar Carga do Cliente (Opcional)
                    </label>
                    {buscandoCargas ? (
                      <div className="text-center py-4">
                        <p className="text-gray-600">Buscando cargas...</p>
                      </div>
                    ) : cargasCliente.length > 0 ? (
                      <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
                        {cargasCliente.map((carga) => (
                          <div
                            key={carga.codigo}
                            className={`p-3 border-b border-gray-100 hover:bg-green-50 cursor-pointer ${
                              cargaSelecionada?.codigo === carga.codigo
                                ? "bg-green-100 border-green-300"
                                : ""
                            }`}
                            onClick={() => handleSelecionarCarga(carga)}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium text-gray-900">
                                  {carga.codigo} -{" "}
                                  {carga.descricao?.substring(0, 50)}...
                                </p>
                                <p className="text-sm text-gray-600">
                                  Tipo: {carga.tipoCarga} | Valor:{" "}
                                  {formatarMoeda(carga.valorMercadoria || 0)}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Status: {carga.status} | Percurso:{" "}
                                  {carga.tipoPercurso}
                                </p>
                              </div>
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                {carga.categoriaSeguro}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 border border-gray-200 rounded-lg">
                        <p className="text-gray-600">
                          Nenhuma carga encontrada para este cliente
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          (Apenas cargas com status &apos;planeada&apos;,
                          &apos;em_transito&apos;, &apos;pendente&apos; ou
                          &apos;confirmada&apos; aparecem aqui)
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Carga Selecionada */}
                {cargaSelecionada && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Carga Selecionada
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Código</p>
                        <p className="font-medium text-gray-950">
                          {cargaSelecionada.codigo}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tipo</p>
                        <p className="font-medium text-gray-950">
                          {cargaSelecionada.tipoCarga}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          Valor Mercadoria
                        </p>
                        <p className="font-medium text-gray-950">
                          {formatarMoeda(cargaSelecionada.valorMercadoria || 0)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          Categoria Seguro
                        </p>
                        <p className="font-medium text-gray-950">
                          {cargaSelecionada.categoriaSeguro}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Itens da Fatura */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Itens da Fatura *
                    </label>
                    <button
                      type="button"
                      onClick={handleAdicionarItem}
                      className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
                    >
                      + Adicionar Item
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Item
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Descrição
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantidade
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Valor Unitário (MT)
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Valor Total (MT)
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {novaFaturaData.itensFatura.map((item) => (
                          <tr key={item.id}>
                            <td className="px-3 py-2 whitespace-nowrap">
                              <input
                                type="text"
                                className="w-full px-2 py-1 border border-gray-300 rounded text-gray-950"
                                value={item.id}
                                readOnly
                              />
                            </td>
                            <td className="px-3 py-2">
                              <textarea
                                rows={2}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-gray-950"
                                value={item.descricao}
                                onChange={(e) =>
                                  handleItemFaturaChange(
                                    item.id,
                                    "descricao",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              <input
                                type="number"
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-gray-950"
                                value={item.quantidade}
                                onChange={(e) =>
                                  handleItemFaturaChange(
                                    item.id,
                                    "quantidade",
                                    parseInt(e.target.value) || 1
                                  )
                                }
                                min="1"
                              />
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              <input
                                type="number"
                                className="w-32 px-2 py-1 border border-gray-300 rounded text-gray-950"
                                value={item.valorUnitario}
                                onChange={(e) =>
                                  handleItemFaturaChange(
                                    item.id,
                                    "valorUnitario",
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                step="0.01"
                                min="0"
                              />
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              <input
                                type="number"
                                className="w-32 px-2 py-1 border border-gray-300 rounded text-gray-950 bg-gray-50"
                                value={item.valorTotal}
                                readOnly
                              />
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => handleRemoverItem(item.id)}
                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                              >
                                Remover
                              </button>
                            </td>
                          </tr>
                        ))}
                        {novaFaturaData.itensFatura.length === 0 && (
                          <tr>
                            <td
                              colSpan={6}
                              className="px-3 py-4 text-center text-gray-500"
                            >
                              Nenhum item adicionado. Clique em &quot;Adicionar
                              Item&quot; para começar.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Seção de Configuração do IVA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de IVA *
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                      value={novaFaturaData.iva?.tipo || "incluso"}
                      onChange={(e) => {
                        const tipo = e.target.value as
                          | "incluso"
                          | "exento"
                          | "nao_aplicavel";
                        setNovaFaturaData((prev) => {
                          const subtotal = prev.subtotal || 0;
                          let valorIVA = 0;

                          if (tipo === "incluso") {
                            valorIVA = calcularIVA(
                              subtotal,
                              prev.iva?.percentual || 16
                            );
                          }

                          return {
                            ...prev,
                            iva: {
                              ...prev.iva,
                              tipo: tipo,
                              valor: valorIVA,
                              baseCalculo: tipo === "incluso" ? subtotal : 0,
                            },
                            totalComIVA: subtotal + valorIVA,
                            valorTotal: subtotal + valorIVA,
                          };
                        });
                      }}
                    >
                      <option value="incluso">IVA Incluso (16%)</option>
                      <option value="exento">Isento de IVA</option>
                      <option value="nao_aplicavel">Não Aplicável</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Percentual de IVA
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                      placeholder="16"
                      value={novaFaturaData.iva?.percentual || 16}
                      onChange={(e) => {
                        const percentual = parseFloat(e.target.value) || 16;
                        setNovaFaturaData((prev) => {
                          const subtotal = prev.subtotal || 0;
                          let valorIVA = 0;

                          if (prev.iva?.tipo === "incluso") {
                            valorIVA = calcularIVA(subtotal, percentual);
                          }

                          return {
                            ...prev,
                            iva: {
                              ...prev.iva,
                              percentual: percentual,
                              valor: valorIVA,
                            },
                            totalComIVA: subtotal + valorIVA,
                            valorTotal: subtotal + valorIVA,
                          };
                        });
                      }}
                      disabled={novaFaturaData.iva?.tipo !== "incluso"}
                      step="0.1"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                {/* Resumo Financeiro */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Resumo Financeiro
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium text-gray-950">
                        {formatarMoeda(novaFaturaData.subtotal || 0)}
                      </span>
                    </div>

                    {/* Mostrar detalhes do IVA */}
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        IVA (
                        {novaFaturaData.iva?.tipo === "incluso"
                          ? `${novaFaturaData.iva?.percentual || 16}%`
                          : novaFaturaData.iva?.tipo}
                        ):
                      </span>
                      <span className="font-medium text-gray-950">
                        {formatarMoeda(novaFaturaData.iva?.valor || 0)}
                      </span>
                    </div>

                    {/* Mostrar base de cálculo se aplicável */}
                    {novaFaturaData.iva?.tipo === "incluso" &&
                      novaFaturaData.iva?.baseCalculo && (
                        <div className="text-xs text-gray-500 pl-4">
                          Base cálculo:{" "}
                          {formatarMoeda(novaFaturaData.iva.baseCalculo)}
                        </div>
                      )}

                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-lg font-semibold text-gray-900">
                        Total:
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        {formatarMoeda(novaFaturaData.totalComIVA || 0)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email do Cliente
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                      placeholder="cliente@exemplo.com"
                      value={novaFaturaData.cliente.email}
                      onChange={(e) =>
                        handleClienteChange("email", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone do Cliente
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                      placeholder="+258 84 000 0000"
                      value={novaFaturaData.cliente.telefone}
                      onChange={(e) =>
                        handleClienteChange("telefone", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Referência (Opcional)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                    placeholder="Número de referência do serviço..."
                    value={novaFaturaData.referencia || ""}
                    onChange={(e) =>
                      handleModalChange("referencia", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleFecharModalNovaFatura}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                  disabled={modalLoading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={
                    modalLoading ||
                    !novaFaturaData.clienteId ||
                    novaFaturaData.valorTotal <= 0 ||
                    novaFaturaData.itensFatura.length === 0
                  }
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium disabled:opacity-50 flex items-center"
                >
                  {modalLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Criando...
                    </>
                  ) : (
                    "Criar Fatura"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Nova Cotação */}
      {showModalNovaCotacao && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-blue-50">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  📝 Criar Nova Cotação
                </h3>
                <button
                  onClick={handleFecharModalNovaCotacao}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmitNovaCotacao} className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Serviço *
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                      value={novaCotacaoData.tipoServico}
                      onChange={(e) =>
                        handleModalCotacaoChange("tipoServico", e.target.value as any)
                      }
                      required
                    >
                      <option value="transporte">Transporte</option>
                      <option value="armazenagem">Armazenagem</option>
                      <option value="logistica">Logística</option>
                      <option value="seguro">Seguro</option>
                      <option value="frete">Frete</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data de Validade *
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                      value={novaCotacaoData.dataValidade}
                      onChange={(e) =>
                        handleModalCotacaoChange("dataValidade", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prioridade *
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                      value={novaCotacaoData.prioridade}
                      onChange={(e) =>
                        handleModalCotacaoChange("prioridade", e.target.value as any)
                      }
                      required
                    >
                      <option value="baixa">Baixa</option>
                      <option value="media">Média</option>
                      <option value="alta">Alta</option>
                      <option value="urgente">Urgente</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Probabilidade de Fechamento (%) *
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                      placeholder="50"
                      value={novaCotacaoData.probabilidadeFechamento}
                      onChange={(e) =>
                        handleModalCotacaoChange(
                          "probabilidadeFechamento",
                          parseInt(e.target.value) || 50
                        )
                      }
                      required
                      min="0"
                      max="100"
                      step="1"
                    />
                  </div>
                </div>

                {/* Busca de Cliente - IDÊNTICO AO MODAL DA FATURA */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buscar Cliente *
                  </label>
                  <div className="flex space-x-2 mb-4">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                      placeholder="Digite o nome do cliente..."
                      value={buscaCliente}
                      onChange={(e) => setBuscaCliente(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={handleBuscarCliente}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Buscar
                    </button>
                  </div>

                  {clientesLoading ? (
                    <div className="text-center py-4">
                      <p className="text-gray-600">Carregando clientes...</p>
                    </div>
                  ) : clientes.length > 0 ? (
                    <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
                      {clientes.map((cliente) => (
                        <div
                          key={cliente.codigo}
                          className={`p-3 border-b border-gray-100 hover:bg-blue-50 cursor-pointer ${
                            clienteSelecionado?.codigo === cliente.codigo
                              ? "bg-blue-100 border-blue-300"
                              : ""
                          }`}
                          onClick={() => handleSelecionarCliente(cliente)}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-900">
                                {cliente.nome}
                              </p>
                              <p className="text-sm text-gray-600">
                                Código: {cliente.codigo} | NUIT: {cliente.nuit}
                              </p>
                              {cliente.email && (
                                <p className="text-xs text-gray-500">
                                  Email: {cliente.email}
                                </p>
                              )}
                            </div>
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                              {cliente.categoria}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 border border-gray-200 rounded-lg">
                      <p className="text-gray-600">
                        {buscaCliente
                          ? "Nenhum cliente encontrado"
                          : "Digite um nome para buscar clientes"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Dados do Cliente Selecionado - IDÊNTICO AO MODAL DA FATURA */}
                {clienteSelecionado && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Cliente Selecionado
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Nome</p>
                        <p className="font-medium text-gray-950">
                          {clienteSelecionado.nome}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Código</p>
                        <p className="font-medium text-gray-950">
                          {clienteSelecionado.codigo}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">NUIT</p>
                        <p className="font-medium text-gray-950">
                          {clienteSelecionado.nuit}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Categoria</p>
                        <p className="font-medium text-gray-950">
                          {clienteSelecionado.categoria}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Seleção de Carga (se cliente selecionado) - IDÊNTICO AO MODAL DA FATURA */}
                {clienteSelecionado && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selecionar Carga do Cliente (Opcional)
                    </label>
                    {buscandoCargasCotacao ? (
                      <div className="text-center py-4">
                        <p className="text-gray-600">Buscando cargas...</p>
                      </div>
                    ) : cargasClienteCotacao.length > 0 ? (
                      <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
                        {cargasClienteCotacao.map((carga) => (
                          <div
                            key={carga.codigo}
                            className={`p-3 border-b border-gray-100 hover:bg-green-50 cursor-pointer ${
                              cargaSelecionadaCotacao?.codigo === carga.codigo
                                ? "bg-green-100 border-green-300"
                                : ""
                            }`}
                            onClick={() => handleSelecionarCargaCotacao(carga)}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium text-gray-900">
                                  {carga.codigo} -{" "}
                                  {carga.descricao?.substring(0, 50)}...
                                </p>
                                <p className="text-sm text-gray-600">
                                  Tipo: {carga.tipoCarga} | Valor:{" "}
                                  {formatarMoeda(carga.valorMercadoria || 0)}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Status: {carga.status} | Percurso:{" "}
                                  {carga.tipoPercurso}
                                </p>
                              </div>
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                {carga.categoriaSeguro}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 border border-gray-200 rounded-lg">
                        <p className="text-gray-600">
                          Nenhuma carga encontrada para este cliente
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          (Apenas cargas com status &apos;planeada&apos;,
                          &apos;em_transito&apos;, &apos;pendente&apos; ou
                          &apos;confirmada&apos; aparecem aqui)
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Carga Selecionada - IDÊNTICO AO MODAL DA FATURA */}
                {cargaSelecionadaCotacao && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Carga Selecionada
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Código</p>
                        <p className="font-medium text-gray-950">
                          {cargaSelecionadaCotacao.codigo}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tipo</p>
                        <p className="font-medium text-gray-950">
                          {cargaSelecionadaCotacao.tipoCarga}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Valor Mercadoria</p>
                        <p className="font-medium text-gray-950">
                          {formatarMoeda(cargaSelecionadaCotacao.valorMercadoria || 0)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Categoria Seguro</p>
                        <p className="font-medium text-gray-950">
                          {cargaSelecionadaCotacao.categoriaSeguro}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Detalhes da Carga */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Detalhes da Carga
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição da Carga *
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        placeholder="Descreva a carga ou serviço..."
                        value={novaCotacaoData.detalhesCarga.descricao}
                        onChange={(e) =>
                          handleModalCotacaoChange("detalhesCarga", {
                            ...novaCotacaoData.detalhesCarga,
                            descricao: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Carga
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        value={novaCotacaoData.detalhesCarga.tipoCarga || ""}
                        onChange={(e) =>
                          handleModalCotacaoChange("detalhesCarga", {
                            ...novaCotacaoData.detalhesCarga,
                            tipoCarga: e.target.value as any,
                          })
                        }
                      >
                        <option value="">Selecione...</option>
                        <option value="geral">Geral</option>
                        <option value="perigosa">Perigosa</option>
                        <option value="refrigerada">Refrigerada</option>
                        <option value="fragil">Frágil</option>
                        <option value="sobredimensionada">Sobredimensionada</option>
                        <option value="granel">Granel</option>
                        <option value="container">Container</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Origem e Destino */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Origem *</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cidade *
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="Cidade de origem"
                          value={novaCotacaoData.origem.cidade}
                          onChange={(e) =>
                            handleModalCotacaoChange("origem", {
                              ...novaCotacaoData.origem,
                              cidade: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          País *
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          value={novaCotacaoData.origem.pais}
                          onChange={(e) =>
                            handleModalCotacaoChange("origem", {
                              ...novaCotacaoData.origem,
                              pais: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Destino *</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cidade *
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="Cidade de destino"
                          value={novaCotacaoData.destino.cidade}
                          onChange={(e) =>
                            handleModalCotacaoChange("destino", {
                              ...novaCotacaoData.destino,
                              cidade: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          País *
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          value={novaCotacaoData.destino.pais}
                          onChange={(e) =>
                            handleModalCotacaoChange("destino", {
                              ...novaCotacaoData.destino,
                              pais: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Itens da Cotação */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Itens da Cotação *
                    </label>
                    <button
                      type="button"
                      onClick={handleAdicionarItemCotacao}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                    >
                      + Adicionar Item
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Item
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Descrição
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tipo
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantidade
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Valor Unitário (MT)
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Valor Total (MT)
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {novaCotacaoData.itens.map((item) => (
                          <tr key={item.id}>
                            <td className="px-3 py-2 whitespace-nowrap">
                              <input
                                type="text"
                                className="w-full px-2 py-1 border border-gray-300 rounded text-gray-950"
                                value={item.id}
                                readOnly
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                className="w-full px-2 py-1 border border-gray-300 rounded text-gray-950"
                                value={item.descricao}
                                onChange={(e) =>
                                  handleItemCotacaoChange(
                                    item.id,
                                    "descricao",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              <select
                                className="w-full px-2 py-1 border border-gray-300 rounded text-gray-950"
                                value={item.tipo}
                                onChange={(e) =>
                                  handleItemCotacaoChange(
                                    item.id,
                                    "tipo",
                                    e.target.value as any
                                  )
                                }
                              >
                                <option value="frete">Frete</option>
                                <option value="taxa">Taxa</option>
                                <option value="seguro">Seguro</option>
                                <option value="armazenagem">Armazenagem</option>
                                <option value="manuseio">Manuseio</option>
                                <option value="comissao">Comissão</option>
                                <option value="despesa">Despesa</option>
                                <option value="outro">Outro</option>
                              </select>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              <input
                                type="number"
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-gray-950"
                                value={item.quantidade}
                                onChange={(e) =>
                                  handleItemCotacaoChange(
                                    item.id,
                                    "quantidade",
                                    parseInt(e.target.value) || 1
                                  )
                                }
                                min="1"
                              />
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              <input
                                type="number"
                                className="w-32 px-2 py-1 border border-gray-300 rounded text-gray-950"
                                value={item.valorUnitario}
                                onChange={(e) =>
                                  handleItemCotacaoChange(
                                    item.id,
                                    "valorUnitario",
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                step="0.01"
                                min="0"
                              />
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              <input
                                type="number"
                                className="w-32 px-2 py-1 border border-gray-300 rounded text-gray-950 bg-gray-50"
                                value={item.valorTotal}
                                readOnly
                              />
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => handleRemoverItemCotacao(item.id)}
                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                              >
                                Remover
                              </button>
                            </td>
                          </tr>
                        ))}
                        {novaCotacaoData.itens.length === 0 && (
                          <tr>
                            <td
                              colSpan={7}
                              className="px-3 py-4 text-center text-gray-500"
                            >
                              Nenhum item adicionado. Clique em &quot;Adicionar
                              Item&quot; para começar.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* Seção de Configuração do IVA - IDÊNTICA AO MODAL DA FATURA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de IVA *
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                      value={novaCotacaoData.iva?.tipo || "incluso"}
                      onChange={(e) => {
                        const tipo = e.target.value as "incluso" | "exento" | "nao_aplicavel";
                        setNovaCotacaoData((prev) => {
                          // Recalcular valores baseado no novo tipo de IVA
                          const calculos = recalcularTotaisCotacao(prev.itens, {
                            ...prev.iva,
                            tipo: tipo,
                          });
                          
                          return {
                            ...prev,
                            iva: {
                              ...prev.iva,
                              tipo: tipo,
                              valor: calculos.valorIVA,
                              baseCalculo: calculos.baseCalculoIVA,
                            },
                            valorTotal: calculos.totalComIVA,
                            totalComIVA: calculos.totalComIVA,
                          };
                        });
                      }}
                    >
                      <option value="incluso">IVA Incluso (16%)</option>
                      <option value="exento">Isento de IVA</option>
                      <option value="nao_aplicavel">Não Aplicável</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Percentual de IVA
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                      placeholder="16"
                      value={novaCotacaoData.iva?.percentual || 16}
                      onChange={(e) => {
                        const percentual = parseFloat(e.target.value) || 16;
                        setNovaCotacaoData((prev) => {
                          if (prev.iva?.tipo === "incluso") {
                            const calculos = recalcularTotaisCotacao(prev.itens, {
                              ...prev.iva,
                              percentual: percentual,
                            });
                            
                            return {
                              ...prev,
                              iva: {
                                ...prev.iva,
                                percentual: percentual,
                                valor: calculos.valorIVA,
                              },
                              valorTotal: calculos.totalComIVA,
                              totalComIVA: calculos.totalComIVA,
                            };
                          }
                          
                          return {
                            ...prev,
                            iva: {
                              ...prev.iva,
                              percentual: percentual,
                            },
                          };
                        });
                      }}
                      disabled={novaCotacaoData.iva?.tipo !== "incluso"}
                      step="0.1"
                      min="0"
                      max="100"
                    />
                  </div>
                  </div>
                {/* Resumo Financeiro */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Resumo Financeiro
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium text-gray-950">
                        {formatarMoeda(novaCotacaoData.subtotal || 0)}
                      </span>
                    </div>

                    {/* Mostrar detalhes do IVA */}
                    {novaCotacaoData.iva?.tipo === "incluso" && novaCotacaoData.iva?.valor && novaCotacaoData.iva.valor > 0 && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            IVA ({novaCotacaoData.iva?.percentual || 16}%):
                          </span>
                          <span className="font-medium text-gray-950">
                            {formatarMoeda(novaCotacaoData.iva.valor || 0)}
                          </span>
                        </div>
                        
                        {/* Mostrar base de cálculo */}
                        {novaCotacaoData.iva?.baseCalculo && novaCotacaoData.iva.baseCalculo > 0 && (
                          <div className="text-xs text-gray-500 pl-4">
                            Base cálculo: {formatarMoeda(novaCotacaoData.iva.baseCalculo)}
                          </div>
                        )}
                      </>
                    )}

                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-lg font-semibold text-gray-900">
                        Total:
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        {formatarMoeda(novaCotacaoData.totalComIVA || novaCotacaoData.valorTotal || 0)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Moeda: {novaCotacaoData.moeda || "MZN"}
                    </div>
                  </div>
                </div>

                {/* Observações Gerais */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observações Gerais
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                    placeholder="Observações adicionais sobre a cotação..."
                    value={novaCotacaoData.observacoesGerais || ""}
                    onChange={(e) =>
                      handleModalCotacaoChange("observacoesGerais", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleFecharModalNovaCotacao}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                  disabled={modalLoading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={
                    modalLoading ||
                    !novaCotacaoData.clienteId ||
                    !novaCotacaoData.detalhesCarga.descricao ||
                    !novaCotacaoData.origem.cidade ||
                    !novaCotacaoData.destino.cidade ||
                    !novaCotacaoData.dataValidade ||
                    novaCotacaoData.itens.length === 0
                  }
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50 flex items-center"
                >
                  {modalLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Criando...
                    </>
                  ) : (
                    "Criar Cotação"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Detalhes da Fatura */}
      {showDetalhesFatura && detalhesFatura && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-blue-50">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    📄 Detalhes da Fatura
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {detalhesFatura.numeroFatura} •{" "}
                    {detalhesFatura.cliente?.nome}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowDetalhesFatura(false);
                    setDetalhesFatura(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {detalhesLoading ? (
              <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p className="mt-2 text-gray-600">Carregando detalhes...</p>
              </div>
            ) : (
              <div className="p-6">
                {/* Cabeçalho da Fatura */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Valor Total</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatarMoeda(detalhesFatura.valorTotal)}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Valor Pendente</p>
                    <p
                      className={`text-2xl font-bold ${
                        (detalhesFatura.valorPendente ?? 0) > 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {formatarMoeda(
                        detalhesFatura.valorPendente ??
                          detalhesFatura.valorTotal
                      )}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Status</p>
                    <span
                      className={`px-3 py-1 ${
                        obterStatusFatura(detalhesFatura).cor
                      } rounded-full text-sm font-medium mt-1 inline-block`}
                    >
                      {obterStatusFatura(detalhesFatura).texto}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Informações Principais */}
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                        Informações da Fatura
                      </h4>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Número</p>
                            <p className="font-medium text-gray-900">
                              {detalhesFatura.numeroFatura}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Emissão</p>
                            <p className="font-medium text-gray-900">
                              {new Date(
                                detalhesFatura.dataEmissao
                              ).toLocaleDateString("pt-MZ")}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Vencimento</p>
                            <p
                              className={`font-medium ${
                                calcularDiasVencimento(
                                  detalhesFatura.dataVencimento
                                ) <= 0
                                  ? "text-red-600"
                                  : "text-gray-900"
                              }`}
                            >
                              {new Date(
                                detalhesFatura.dataVencimento
                              ).toLocaleDateString("pt-MZ")}
                              {calcularDiasVencimento(
                                detalhesFatura.dataVencimento
                              ) <= 0 && (
                                <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                  Vencida
                                </span>
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Dias até vencer
                            </p>
                            <p className="font-medium text-gray-900">
                              {calcularDiasVencimento(
                                detalhesFatura.dataVencimento
                              )}{" "}
                              dias
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Tipo de Serviço
                          </p>
                          <p className="font-medium text-gray-900">
                            {obterTipoServicoTexto(detalhesFatura.tipoServico)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Descrição</p>
                          <p className="font-medium text-gray-900">
                            {detalhesFatura.descricaoServico}
                          </p>
                        </div>
                        {detalhesFatura.referencia && (
                          <div>
                            <p className="text-sm text-gray-600">Referência</p>
                            <p className="font-medium text-gray-900">
                              {detalhesFatura.referencia}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    {(() => {
                      const infoCarga = obterInformacoesCarga(detalhesFatura);
                      if (infoCarga && infoCarga.codigoCarga) {
                        return (
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h4 className="font-semibold text-gray-900 mb-3">
                              Informações da Carga
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                              {infoCarga.codigoCarga && (
                                <div>
                                  <p className="text-sm text-gray-600">
                                    Código da Carga
                                  </p>
                                  <p className="font-medium text-gray-900">
                                    {infoCarga.codigoCarga}
                                  </p>
                                </div>
                              )}
                              {infoCarga.tipoCarga && (
                                <div>
                                  <p className="text-sm text-gray-600">
                                    Tipo de Carga
                                  </p>
                                  <p className="font-medium text-gray-900">
                                    {infoCarga.tipoCarga}
                                  </p>
                                </div>
                              )}
                              {infoCarga.destinoFrete && (
                                <div>
                                  <p className="text-sm text-gray-600">
                                    Destino
                                  </p>
                                  <p className="font-medium text-gray-900">
                                    {infoCarga.destinoFrete}
                                  </p>
                                </div>
                              )}
                              {infoCarga.valorMercadoria && (
                                <div>
                                  <p className="text-sm text-gray-600">
                                    Valor Mercadoria
                                  </p>
                                  <p className="font-medium text-gray-900">
                                    {formatarMoeda(infoCarga.valorMercadoria)}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}
                    {/* Informações do Cliente */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                        Informações do Cliente
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Nome</p>
                          <p className="font-medium text-gray-900">
                            {detalhesFatura.cliente?.nome}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {detalhesFatura.cliente?.nif && (
                            <div>
                              <p className="text-sm text-gray-600">NUIT/NIF</p>
                              <p className="font-medium text-gray-900">
                                {detalhesFatura.cliente.nif}
                              </p>
                            </div>
                          )}
                          {detalhesFatura.cliente?.telefone && (
                            <div>
                              <p className="text-sm text-gray-600">Telefone</p>
                              <p className="font-medium text-gray-900">
                                {detalhesFatura.cliente.telefone}
                              </p>
                            </div>
                          )}
                        </div>
                        {detalhesFatura.cliente?.email && (
                          <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-medium text-gray-900">
                              {detalhesFatura.cliente.email}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Itens da Fatura e Recebimentos */}
                  <div className="space-y-6">
                    {/* Itens da Fatura */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                        Itens da Fatura
                      </h4>
                      <div className="space-y-3">
                        {detalhesFatura.itensFatura &&
                        detalhesFatura.itensFatura.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Descrição
                                  </th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Qtd
                                  </th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Unitário
                                  </th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {detalhesFatura.itensFatura.map(
                                  (item, index) => (
                                    <tr
                                      key={index}
                                      className="hover:bg-gray-50"
                                    >
                                      <td className="px-3 py-2">
                                        <p className="text-sm text-gray-900">
                                          {item.descricao}
                                        </p>
                                        {item.tipo && (
                                          <p className="text-xs text-gray-500">
                                            {item.tipo} •{" "}
                                            {item.categoriaSeguro ||
                                              "Sem categoria"}
                                          </p>
                                        )}
                                      </td>
                                      <td className="px-3 py-2 text-sm text-gray-900">
                                        {item.quantidade}
                                      </td>
                                      <td className="px-3 py-2 text-sm text-gray-900">
                                        {formatarMoeda(item.valorUnitario)}
                                      </td>
                                      <td className="px-3 py-2 text-sm font-medium text-gray-900">
                                        {formatarMoeda(item.valorTotal)}
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="text-center text-gray-500 py-4">
                            Nenhum item registrado
                          </p>
                        )}

                        {/* Resumo Financeiro */}
                        <div className="pt-4 border-t border-gray-200">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">
                                Subtotal:
                              </span>
                              <span className="text-sm font-medium text-gray-900">
                                {formatarMoeda(
                                  detalhesFatura.subtotal ||
                                    detalhesFatura.valorTotal
                                )}
                              </span>
                            </div>
                            {detalhesFatura.iva?.valor != null &&
                              detalhesFatura.iva.valor > 0 && (
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">
                                    IVA ({detalhesFatura.iva.percentual ?? 16}
                                    %):
                                  </span>
                                  <span className="text-sm font-medium text-gray-900">
                                    {formatarMoeda(detalhesFatura.iva.valor)}
                                  </span>
                                </div>
                              )}
                            <div className="flex justify-between pt-2 border-t border-gray-200">
                              <span className="font-semibold text-gray-900">
                                Total:
                              </span>
                              <span className="font-bold text-lg text-gray-900">
                                {formatarMoeda(detalhesFatura.valorTotal)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Histórico de Recebimentos */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                        Histórico de Recebimentos
                      </h4>
                      <div className="space-y-3">
                        {detalhesFatura.recebimentos &&
                        detalhesFatura.recebimentos.length > 0 ? (
                          detalhesFatura.recebimentos
                            .filter((r) => r.status === "confirmado")
                            .sort(
                              (a, b) =>
                                new Date(b.data).getTime() -
                                new Date(a.data).getTime()
                            )
                            .map((recebimento, index) => (
                              <div
                                key={index}
                                className="p-3 bg-green-50 rounded-lg border border-green-200"
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium text-gray-900">
                                      {formatarMoeda(recebimento.valor)}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {new Date(
                                        recebimento.data
                                      ).toLocaleDateString("pt-MZ")}
                                    </p>
                                    <p className="text-xs text-blue-600 font-medium">
                                      Via {recebimento.formaPagamento}
                                    </p>
                                  </div>
                                  <div className="flex flex-col items-end space-y-1">
                                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                      Confirmado
                                    </span>
                                    {/* Botão para gerar recibo */}
                                    <button
                                      onClick={() => handleGerarPDFRecibo(detalhesFatura, recebimento)}
                                      className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                                      title="Gerar recibo"
                                    >
                                      📄 Recibo
                                    </button>
                                  </div>
                                </div>
                                {recebimento.comprovante && (
                                  <p className="text-xs text-gray-500 mt-2">
                                    Comprovante: {recebimento.comprovante}
                                  </p>
                                )}
                                {recebimento.observacoes && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    Obs: {recebimento.observacoes}
                                  </p>
                                )}
                              </div>
                            ))
                        ) : (
                          <p className="text-center text-gray-500 py-4">
                            Nenhum recebimento registrado
                          </p>
                        )}

                        {/* Resumo de Pagamentos */}
                        {detalhesFatura.recebimentos &&
                          detalhesFatura.recebimentos.length > 0 && (
                            <div className="pt-4 border-t border-gray-200">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="text-sm text-gray-600">
                                    Total Recebido
                                  </p>
                                  <p className="text-lg font-bold text-green-600">
                                    {formatarMoeda(
                                      detalhesFatura.recebimentos
                                        .filter(
                                          (r) => r.status === "confirmado"
                                        )
                                        .reduce(
                                          (total, r) => total + r.valor,
                                          0
                                        )
                                    )}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-gray-600">
                                    Percentual Pago
                                  </p>
                                  <p className="text-lg font-bold text-blue-600">
                                    {Math.round(
                                      (detalhesFatura.recebimentos
                                        .filter(
                                          (r) => r.status === "confirmado"
                                        )
                                        .reduce(
                                          (total, r) => total + r.valor,
                                          0
                                        ) /
                                        detalhesFatura.valorTotal) *
                                        100
                                    )}
                                    %
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
                  {/* Botão para gerar PDF */}
                  <button
                    onClick={() => handleGerarPDFFatura(detalhesFatura)}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium flex items-center"
                    disabled={loading}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Gerar PDF
                  </button>
                  
                  <button
                    onClick={() => {
                      setFormRecebimento({
                        ...defaultFormRecebimento,
                        faturaId: detalhesFatura.faturaId,
                        valor:
                          detalhesFatura.valorPendente?.toString() ||
                          detalhesFatura.valorTotal.toString(),
                      });
                      setShowDetalhesFatura(false);
                      setActiveContasReceber(ExtendedActiveTab.RECEBIMENTOS);
                    }}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50"
                    disabled={detalhesFatura.status === StatusFatura.PAGA}
                  >
                    Registrar Recebimento
                  </button>
                  <button
                    onClick={() => {
                      // Lógica para enviar lembrete
                      fetch(`${API_BASE_URL}/enviarLembreteVencimento`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          faturaId: detalhesFatura.faturaId,
                          metodo: "email",
                        }),
                      })
                        .then((response) => response.json())
                        .then((data) => {
                          if (data.returnCode === 200) {
                            alert("Lembrete enviado com sucesso!");
                          } else {
                            alert("Erro ao enviar lembrete: " + data.returnMsg);
                          }
                        })
                        .catch((err) => {
                          console.error("Error sending reminder:", err);
                          alert("Erro ao enviar lembrete");
                        });
                    }}
                    className="px-6 py-2 border border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-50 font-medium"
                    disabled={
                      detalhesFatura.status === StatusFatura.PAGA ||
                      calcularDiasVencimento(detalhesFatura.dataVencimento) <= 0
                    }
                  >
                    Enviar Lembrete
                  </button>
                  <button
                    onClick={() => setShowDetalhesFatura(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Detalhes da Cotação */}
      {showDetalhesCotacao && detalhesCotacao && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-blue-50">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    📝 Detalhes da Cotação
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {detalhesCotacao.numeroQuotation} v{detalhesCotacao.versao} •{" "}
                    {detalhesCotacao.cliente?.nome}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowDetalhesCotacao(false);
                    setDetalhesCotacao(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Cabeçalho da Cotação */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Valor Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatarMoeda(detalhesCotacao.valorTotal)}
                  </p>
                  <p className="text-sm text-gray-500">{detalhesCotacao.moeda}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Data de Validade</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Date(detalhesCotacao.dataValidade).toLocaleDateString("pt-MZ")}
                  </p>
                  <p className={`text-sm ${
                    detalhesCotacao.expirado ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {detalhesCotacao.expirado ? 'Expirado' : `${detalhesCotacao.diasAteExpiracao} dias restantes`}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Status</p>
                  <span
                    className={`px-3 py-1 ${
                      obterStatusCotacao(detalhesCotacao).cor
                    } rounded-full text-sm font-medium mt-1 inline-block`}
                  >
                    {obterStatusCotacao(detalhesCotacao).texto}
                  </span>
                  <p className="text-sm text-gray-500 mt-2">
                    Etapa: {detalhesCotacao.etapaAprovacao}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Informações Principais */}
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      Informações da Cotação
                    </h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Número</p>
                          <p className="font-medium text-gray-900">
                            {detalhesCotacao.numeroQuotation} v{detalhesCotacao.versao}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Emissão</p>
                          <p className="font-medium text-gray-900">
                            {new Date(
                              detalhesCotacao.dataEmissao
                            ).toLocaleDateString("pt-MZ")}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tipo de Serviço</p>
                        <p className="font-medium text-gray-900">
                          {obterTipoServicoTexto(detalhesCotacao.tipoServico)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Prioridade</p>
                        <span className={`px-2 py-1 ${obterCorPrioridade(detalhesCotacao.prioridade)} rounded-full text-xs`}>
                          {detalhesCotacao.prioridade}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Probabilidade de Fechamento</p>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-green-600 h-2.5 rounded-full" 
                              style={{ width: `${detalhesCotacao.probabilidadeFechamento}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-medium">{detalhesCotacao.probabilidadeFechamento}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detalhes da Carga */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      Detalhes da Carga
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Descrição</p>
                        <p className="font-medium text-gray-900">
                          {detalhesCotacao.detalhesCarga.descricao}
                        </p>
                      </div>
                      {detalhesCotacao.detalhesCarga.tipoCarga && (
                        <div>
                          <p className="text-sm text-gray-600">Tipo de Carga</p>
                          <p className="font-medium text-gray-900">
                            {detalhesCotacao.detalhesCarga.tipoCarga}
                          </p>
                        </div>
                      )}
                      {detalhesCotacao.detalhesCarga.pesoBruto && (
                        <div>
                          <p className="text-sm text-gray-600">Peso Bruto</p>
                          <p className="font-medium text-gray-900">
                            {detalhesCotacao.detalhesCarga.pesoBruto} kg
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Origem e Destino */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h5 className="font-semibold text-gray-900 mb-2">Origem</h5>
                      <p className="text-sm text-gray-900">
                        {detalhesCotacao.origem.cidade}, {detalhesCotacao.origem.pais}
                      </p>
                      {detalhesCotacao.origem.endereco && (
                        <p className="text-xs text-gray-600 mt-1">
                          {detalhesCotacao.origem.endereco}
                        </p>
                      )}
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h5 className="font-semibold text-gray-900 mb-2">Destino</h5>
                      <p className="text-sm text-gray-900">
                        {detalhesCotacao.destino.cidade}, {detalhesCotacao.destino.pais}
                      </p>
                      {detalhesCotacao.destino.endereco && (
                        <p className="text-xs text-gray-600 mt-1">
                          {detalhesCotacao.destino.endereco}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Itens da Cotação */}
                <div className="space-y-6">
                  {/* Itens da Cotação */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      Itens da Cotação
                    </h4>
                    <div className="space-y-3">
                      {detalhesCotacao.itens && detalhesCotacao.itens.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Descrição
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Tipo
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Qtd
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Unitário
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Total
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {detalhesCotacao.itens.map(
                                (item, index) => (
                                  <tr
                                    key={index}
                                    className="hover:bg-gray-50"
                                  >
                                    <td className="px-3 py-2">
                                      <p className="text-sm text-gray-900">
                                        {item.descricao}
                                      </p>
                                      {item.observacoes && (
                                        <p className="text-xs text-gray-500">
                                          {item.observacoes}
                                        </p>
                                      )}
                                    </td>
                                    <td className="px-3 py-2 text-sm text-gray-900">
                                      {item.tipo}
                                    </td>
                                    <td className="px-3 py-2 text-sm text-gray-900">
                                      {item.quantidade}
                                    </td>
                                    <td className="px-3 py-2 text-sm text-gray-900">
                                      {formatarMoeda(item.valorUnitario)}
                                    </td>
                                    <td className="px-3 py-2 text-sm font-medium text-gray-900">
                                      {formatarMoeda(item.valorTotal)}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-center text-gray-500 py-4">
                          Nenhum item registrado
                        </p>
                      )}

                      {/* Resumo Financeiro */}
                      <div className="pt-4 border-t border-gray-200">
                        <div className="space-y-2">
                          <div className="flex justify-between pt-2 border-t border-gray-200">
                            <span className="font-semibold text-gray-900">
                              Total:
                            </span>
                            <span className="font-bold text-lg text-gray-900">
                              {formatarMoeda(detalhesCotacao.valorTotal)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Informações do Cliente */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      Informações do Cliente
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Nome</p>
                        <p className="font-medium text-gray-900">
                          {detalhesCotacao.cliente?.nome}
                        </p>
                      </div>
                      {detalhesCotacao.cliente?.nif && (
                        <div>
                          <p className="text-sm text-gray-600">NUIT/NIF</p>
                          <p className="font-medium text-gray-900">
                            {detalhesCotacao.cliente.nif}
                          </p>
                        </div>
                      )}
                      {detalhesCotacao.cliente?.telefone && (
                        <div>
                          <p className="text-sm text-gray-600">Telefone</p>
                          <p className="font-medium text-gray-900">
                            {detalhesCotacao.cliente.telefone}
                          </p>
                        </div>
                      )}
                      {detalhesCotacao.cliente?.email && (
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-medium text-gray-900">
                            {detalhesCotacao.cliente.email}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
                <button
                  onClick={() => handleGerarPDFCotacao(detalhesCotacao)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium flex items-center"
                  disabled={loading}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Gerar PDF
                </button>
                {detalhesCotacao.status === "aprovado" && !detalhesCotacao.expirado && (
                  <button
                    onClick={() => {
                      setCotacaoSelecionada(detalhesCotacao);
                      setShowModalConvertCotacao(true);
                      setShowDetalhesCotacao(false);
                    }}
                    className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium"
                  >
                    Converter para Fatura
                  </button>
                )}
                {(detalhesCotacao.status === "rascunho" || detalhesCotacao.status === "revisao") && (
                  <button
                    onClick={() => {
                      atualizarStatusCotacao(detalhesCotacao.quotationId, "enviado");
                      setShowDetalhesCotacao(false);
                    }}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
                  >
                    Enviar para Cliente
                  </button>
                )}
                {detalhesCotacao.status === "enviado" && (
                  <button
                    onClick={() => {
                      atualizarStatusCotacao(detalhesCotacao.quotationId, "aprovado");
                      setShowDetalhesCotacao(false);
                    }}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                  >
                    Marcar como Aprovado
                  </button>
                )}
                <button
                  onClick={() => setShowDetalhesCotacao(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Conversão de Cotação */}
      {showModalConvertCotacao && cotacaoSelecionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200 bg-purple-50">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  🔄 Converter Cotação
                </h3>
                <button
                  onClick={() => setShowModalConvertCotacao(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Cotação selecionada:</p>
                <p className="font-medium text-gray-900">
                  {cotacaoSelecionada.numeroQuotation} - {cotacaoSelecionada.cliente?.nome}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Valor: {formatarMoeda(cotacaoSelecionada.valorTotal)}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Vencimento da Fatura *
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-950"
                  value={novaFaturaData.dataVencimento}
                  onChange={(e) =>
                    handleModalChange("dataVencimento", e.target.value)
                  }
                  required
                />
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  Ao converter esta cotação, será criada uma nova fatura com base nos dados da cotação.
                  A cotação será marcada como &quot;convertida&quot; e não poderá ser editada novamente.
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowModalConvertCotacao(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConverterCotacao}
                  disabled={loading}
                  className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium disabled:opacity-50"
                >
                  {loading ? "Convertendo..." : "Confirmar Conversão"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContasReceber;