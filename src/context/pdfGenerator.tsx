/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// Importações organizadas por tipo
import getBase64ImageFromURL from "./imageConverter";
import listaEmpresas from "./listaEmpresas";
import {
  FaturaDetalhada,
  RecebimentoDetalhado,
  ClienteDetalhado,
} from "@/types/apiTypes";

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

interface EmpresaImagem {
  nome: string;
  srcImage?: string;
}

interface ItemFatura {
  id: number;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  tipo?: string;
  categoriaSeguro?: string;
}

interface DadosEmpresa {
  nomeEmpresaLocal: string;
  enderecoLocal: string;
  nuitLocal: string;
  emailLocal: string;
  contactosLocal: string;
  dadosBancarios?: DadosBancarios;
}

interface DadosBancarios {
  banco: string;
  nib: string;
  iban: string;
}

interface DadosFaturaPDF {
  fatura: FaturaDetalhada;
  empresa: DadosEmpresa;
}

interface DadosReciboPDF {
  fatura: FaturaDetalhada;
  recebimento: RecebimentoDetalhado;
  empresa: DadosEmpresa;
}

interface DadosCotacaoPDF {
  cotacao: CotacaoDetalhada;
  empresa: DadosEmpresa;
}

interface CotacaoDetalhada {
  numeroCotacao: string;
  dataEmissao: string;
  dataValidade: string;
  // Use um tipo mais simples para o cliente na cotação
  cliente: {
    nome: string;
    nif?: string;
    email?: string;
    telefone?: string;
    endereco?: string;
  };
  itensCotacao: ItemCotacao[];
  subtotal: number;
  iva?: number | any;
  valorTotal: number;
  observacoes?: string;
  status: string;
  tipoServico?: string;
  referencia?: string;
}


interface ItemCotacao {
  id: number;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  observacoes?: string;
}

interface RecebimentoFormatado {
  data: string;
  valor: string;
  forma: string;
  comprovante: string;
  observacoes: string;
}

interface ValoresFinanceiros {
  subtotal: number;
  valorIVA: number;
  totalComIVA: number;
  valorPendente: number;
  valorRecebido: number;
}

interface PdfMakeContent {
  [key: string]: any;
}

// ============================================================================
// CONSTANTES E CONFIGURAÇÕES
// ============================================================================

const empresasLista: EmpresaImagem[] = listaEmpresas as EmpresaImagem[];

const EMPRESA_PADRAO: DadosEmpresa = {
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
};

const STATUS_MAP: Record<string, string> = {
  pendente: "Pendente",
  paga: "Paga",
  vencida: "Vencida",
  parcial: "Parcialmente Paga",
  cancelada: "Cancelada",
};

const STATUS_COTACAO_MAP: Record<string, string> = {
  pendente: "Pendente",
  aprovada: "Aprovada",
  recusada: "Recusada",
  expirada: "Expirada",
  convertida: "Convertida em Fatura",
};

const TIPOS_SERVICO: Record<string, string> = {
  transporte: "Transporte",
  armazenagem: "Armazenagem",
  logistica: "Logística",
  outro: "Outro",
};

// Configurações de layout
const LAYOUT_CONFIG = {
  colors: {
    primary: "#1a365d",
    secondary: "#2d3748",
    success: "#38a169",
    error: "#e53e3e",
    warning: "#d69e2e",
    info: "#3182ce",
    lightGray: "#f7fafc",
    gray: "#e2e8f0",
    darkGray: "#4a5568",
    text: "#2d3748",
    muted: "#718096",
  },
  fonts: {
    sizes: {
      xs: 7,
      sm: 8,
      md: 9,
      lg: 10,
      xl: 12,
      xxl: 14,
    },
    families: {
      primary: "Helvetica",
    },
  },
  spacing: {
    xs: 5,
    sm: 10,
    md: 20,
    lg: 30,
    xl: 40,
  },
  table: {
    headerBg: "#f7fafc",
    rowPadding: 2,
    borderWidth: 0.5,
    borderColor: "#cccccc",
  },
  page: {
    width: 595, // A4 width in points
    height: 842, // A4 height in points
    margins: {
      left: 40,
      right: 40,
      top: 60, // Aumentado para acomodar o cabeçalho no corpo
      bottom: 40,
    },
  },
} as const;

// ============================================================================
// TIPOS PARA DESPACHO ADUANEIRO
// ============================================================================

interface DespachoAduaneiroDetalhado {
  numeroProcesso: string;
  tipoProcesso: string;
  status: string;
  prioridade: string;
  datas: {
    dataCriacao: string;
    dataSubmissao?: string;
    dataRegistroAlfandega?: string;
    dataPrevistaLiberacao?: string;
    dataPrazoLimite?: string;
  };
  cliente: {
    nomeCliente: string;
    nuit: string;
    tipoCliente: string;
    contato?: {
      email?: string;
      telefone?: string;
    };
    endereco?: {
      cidade?: string;
      provincia?: string;
      pais?: string;
      endereco?: string;
    };
  };
  fornecedor?: {
    nome?: string;
    pais?: string;
    incoterm?: string;
  };
  mercadoria: {
    descricao: string;
    codigoNCM?: string;
    quantidade: number;
    unidadeMedida: string;
    valorMercadoria: number;
    pesoBruto?: number;
    pesoLiquido?: number;
    origemMercadoria?: string;
    certificadoOrigem?: {
      tipo?: string;
      numero?: string;
    };
  };
  transporte?: {
    meioTransporte?: string;
    portoOrigem?: string;
    portoDestino?: string;
    numeroConhecimento?: string;
    numeroBL?: string;
    navioVoo?: string;
    companhiaTransporte?: string;
    dataPrevistaEmbarque?: string;
    dataPrevistaChegada?: string;
  };
  regimeAduaneiro?: {
    tipoRegime?: string;
    destinoAduaneiro?: string;
    numeroLicencaImportacao?: string;
  };
  tributacao?: {
    valorAduaneiro: number;
    moedaAduaneira: string;
    taxaCambio?: number;
    impostos: {
      direitosAduaneiros?: {
        percentual?: number;
        valor?: number;
      };
      iva?: {
        percentual?: number;
        valor?: number;
      };
      totalImpostos?: number;
      totalLiquido?: number;
    };
  };
  garantias?: {
    tipoGarantia?: string;
    valorGarantia?: number;
  };
  documentacao?: {
    documentacaoCompleta: boolean;
    percentualCompleto: number;
    documentos?: Array<{
      tipo: string;
      nomeDocumento: string;
      recebido: boolean;
    }>;
  };
  pagamento?: {
    valorTotal: number;
    valorPago: number;
    statusPagamento: string;
    moeda: string;
    dataVencimento?: string;
  };
  alfandega?: {
    portoAlfandegado?: string;
    codigoAlfandega?: string;
    fiscalResponsavel?: string;
    tipoInspecao?: string;
    canalVerde?: boolean;
    dataLiberacao?: string;
  };
  rastreio?: {
    statusRastreio?: string;
    localizacaoAtual?: string;
    estimativaEntrega?: string;
  };
  observacoes?: string;
  observacoesInternas?: string;
  classificacaoRisco?: string;
}

interface DadosDespachoPDF {
  despacho: DespachoAduaneiroDetalhado;
  empresa: DadosEmpresa;
}

// ============================================================================
// CONSTANTES PARA DESPACHO ADUANEIRO
// ============================================================================

const TIPO_PROCESSO_MAP: Record<string, string> = {
  importacao: "Importação",
  exportacao: "Exportação",
  transito: "Trânsito",
  despacho: "Despacho Aduaneiro",
  consultoria: "Consultoria",
  rastreio: "Rastreio",
  re_exportacao: "Re-exportação",
  admissao_temporaria: "Admissão Temporária",
  perfeicoamento: "Aperfeiçoamento",
};

const STATUS_DESPACHO_MAP: Record<string, string> = {
  rascunho: "Rascunho",
  submetido: "Submetido",
  registrado_alfandega: "Registrado na Alfândega",
  em_analise: "Em Análise",
  analise_documental: "Análise Documental",
  analise_fiscal: "Análise Fiscal",
  analise_tecnica: "Análise Técnica",
  aguardando_liquidacao: "Aguardando Liquidação",
  em_liquidacao: "Em Liquidação",
  aguardando_pagamento: "Aguardando Pagamento",
  aguardando_documentacao: "Aguardando Documentação",
  aguardando_inspecao: "Aguardando Inspeção",
  em_inspecao: "Em Inspeção",
  aguardando_liberacao: "Aguardando Liberação",
  em_transito: "Em Trânsito",
  liberado: "Liberado",
  concluido: "Concluído",
  cancelado: "Cancelado",
  suspenso: "Suspenso",
  atrasado: "Atrasado",
  arquivado: "Arquivado",
};

const TIPO_CLIENTE_MAP: Record<string, string> = {
  importador: "Importador",
  exportador: "Exportador",
  transitario: "Transitário",
  agente: "Agente",
  representante: "Representante",
  outro: "Outro",
};

const MEIO_TRANSPORTE_MAP: Record<string, string> = {
  maritimo: "Marítimo",
  aereo: "Aéreo",
  terrestre: "Terrestre",
  ferroviario: "Ferroviário",
  multimodal: "Multimodal",
  postal: "Postal",
};

const TIPO_REGIME_MAP: Record<string, string> = {
  definitivo: "Definitivo",
  temporario: "Temporário",
  admissao_temporaria: "Admissão Temporária",
  perfeicoamento_ativo: "Aperfeiçoamento Ativo",
  perfeicoamento_passivo: "Aperfeiçoamento Passivo",
  transito: "Trânsito",
  re_exportacao: "Re-exportação",
  reimportacao: "Reimportação",
  entreposto_aduanero: "Entreposto Aduaneiro",
  deposito_alfandegado: "Depósito Alfandegado",
};

const DESTINO_ADUANEIRO_MAP: Record<string, string> = {
  consumo: "Consumo",
  armazem: "Armazém",
  industria: "Indústria",
  reexportacao: "Reexportação",
  transito: "Trânsito",
  deposito: "Depósito",
};

// ============================================================================
// FUNÇÕES UTILITÁRIAS PARA DESPACHO ADUANEIRO
// ============================================================================

/**
 * Traduz tipo de processo para português
 */
const obterTipoProcessoTexto = (tipo: string = "importacao"): string => {
  return TIPO_PROCESSO_MAP[tipo] || tipo;
};

/**
 * Traduz status do despacho para português
 */
const obterStatusDespachoTexto = (status: string = "rascunho"): string => {
  return STATUS_DESPACHO_MAP[status] || status;
};

/**
 * Traduz tipo de cliente para português
 */
const obterTipoClienteTexto = (tipo: string = "importador"): string => {
  return TIPO_CLIENTE_MAP[tipo] || tipo;
};

/**
 * Traduz meio de transporte para português
 */
const obterMeioTransporteTexto = (meio?: string): string => {
  if (!meio) return "Não especificado";
  return MEIO_TRANSPORTE_MAP[meio] || meio;
};

/**
 * Traduz tipo de regime para português
 */
const obterTipoRegimeTexto = (tipo?: string): string => {
  if (!tipo) return "Não especificado";
  return TIPO_REGIME_MAP[tipo] || tipo;
};

/**
 * Traduz destino aduaneiro para português
 */
const obterDestinoAduaneiroTexto = (destino?: string): string => {
  if (!destino) return "Não especificado";
  return DESTINO_ADUANEIRO_MAP[destino] || destino;
};

/**
 * Obtém a cor do status do despacho
 */
const getStatusDespachoColor = (status: string): string => {
  switch (status) {
    case "concluido":
    case "liberado":
      return LAYOUT_CONFIG.colors.success;
    case "submetido":
    case "em_analise":
    case "aguardando_liberacao":
      return LAYOUT_CONFIG.colors.warning;
    case "cancelado":
    case "atrasado":
    case "suspenso":
      return LAYOUT_CONFIG.colors.error;
    case "rascunho":
      return LAYOUT_CONFIG.colors.info;
    default:
      return LAYOUT_CONFIG.colors.text;
  }
};

/**
 * Formata dados de documentos para exibição
 */
const prepararDocumentosTabela = (documentos?: Array<any>): any[][] => {
  if (!documentos || documentos.length === 0) {
    return [[]];
  }

  return documentos.map((doc, index) => [
    {
      text: (index + 1).toString(),
      style: "tableBody",
      alignment: "center",
    },
    {
      text: doc.nomeDocumento || doc.tipo || "Documento",
      style: "tableDescriptionBody",
    },
    {
      text: doc.tipo || "Não especificado",
      style: "tableBody",
      alignment: "center",
    },
    {
      text: doc.recebido ? "✅ Recebido" : "⏳ Pendente",
      style: "tableBody",
      alignment: "center",
      color: doc.recebido ? LAYOUT_CONFIG.colors.success : LAYOUT_CONFIG.colors.warning,
    },
  ]);
};

// ============================================================================
// FUNÇÕES UTILITÁRIAS
// ============================================================================

/**
 * Formata valores monetários no padrão MZN
 */
const formatarMoeda = (valor: number = 0): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
};

/**
 * Traduz status para português
 */
const obterStatusTexto = (status: string = "pendente"): string => {
  return STATUS_MAP[status] || status;
};

/**
 * Traduz status da cotação para português
 */
const obterStatusCotacaoTexto = (status: string = "pendente"): string => {
  return STATUS_COTACAO_MAP[status] || status;
};

/**
 * Traduz tipo de serviço para português
 */
const obterTipoServicoTexto = (tipo?: string): string => {
  if (!tipo) return "Não especificado";
  return TIPOS_SERVICO[tipo] || tipo;
};

/**
 * Formata data para o padrão português (Moçambique)
 */
const formatarData = (dataString: string): string => {
  try {
    const date = new Date(dataString);
    if (isNaN(date.getTime())) return dataString;
    return date.toLocaleDateString("pt-MZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return dataString;
  }
};

// ============================================================================
// CABEÇALHO PARA DESPACHO ADUANEIRO
// ============================================================================

/**
 * Cria o cabeçalho do despacho aduaneiro para o corpo do documento
 */
const criarCabecalhoDespachoParaCorpo = (
  empresa: DadosEmpresa,
  despacho: DespachoAduaneiroDetalhado,
  imagemEmpresa: string,
  dataCriacao: string,
  dataPrazoLimite: string,
  statusTexto: string,
  tipoProcessoTexto: string
) => {
  const availableWidth =
    LAYOUT_CONFIG.page.width -
    LAYOUT_CONFIG.page.margins.left -
    LAYOUT_CONFIG.page.margins.right;

  return {
    stack: [
      // Linha principal: Logo + informações + despacho
      {
        columns: [
          // Coluna da logo e informações da empresa
          {
            width: "65%",
            columns: [
              // Logo
              {
                width: "20%",
                stack: [
                  {
                    image: imagemEmpresa,
                    width: 60,
                    height: 60,
                    alignment: "left",
                    margin: [0, 0, 0, 5],
                  },
                ],
              },

              // Informações da empresa ao lado do logo
              {
                width: "80%",
                stack: [
                  // Nome da empresa (ao lado do logo)
                  {
                    text: empresa.nomeEmpresaLocal,
                    style: "companyName",
                    margin: [10, 5, 0, 8],
                  },

                  // Informações da empresa em VERTICAL
                  {
                    stack: [
                      // Endereço
                      {
                        columns: [
                          {
                            text: "Endereço:",
                            style: "companyLabel",
                            width: "auto",
                            margin: [10, 0, 3, 0],
                          },
                          {
                            text: empresa.enderecoLocal,
                            style: "companyValue",
                            margin: [0, 0, 0, 0],
                          },
                        ],
                        margin: [0, 0, 0, 1],
                      },

                      // NUIT
                      {
                        columns: [
                          {
                            text: "NUIT:",
                            style: "companyLabel",
                            width: "auto",
                            margin: [10, 0, 3, 0],
                          },
                          {
                            text: empresa.nuitLocal,
                            style: "companyValue",
                            margin: [0, 0, 0, 0],
                          },
                        ],
                        margin: [0, 0, 0, 1],
                      },

                      // Email
                      {
                        columns: [
                          {
                            text: "Email:",
                            style: "companyLabel",
                            width: "auto",
                            margin: [10, 0, 3, 0],
                          },
                          {
                            text: empresa.emailLocal,
                            style: "companyValue",
                            margin: [0, 0, 0, 0],
                          },
                        ],
                        margin: [0, 0, 0, 1],
                      },

                      // Contactos
                      {
                        columns: [
                          {
                            text: "Contactos:",
                            style: "companyLabel",
                            width: "auto",
                            margin: [10, 0, 3, 0],
                          },
                          {
                            text: empresa.contactosLocal,
                            style: "companyValue",
                            margin: [0, 0, 0, 0],
                          },
                        ],
                        margin: [0, 0, 0, 0],
                      },
                    ],
                  },
                ],
              },
            ],
          },

          // Coluna do documento (despacho)
          {
            width: "35%",
            stack: [
              // DESPACHO ADUANEIRO em destaque
              {
                text: "DESPACHO ADUANEIRO",
                style: "documentTitleMain",
                alignment: "right",
                margin: [0, 2, 0, 0],
              },
              // ORIGINAL por baixo do título
              {
                text: "ORIGINAL",
                style: {
                  fontSize: 12,
                  bold: true,
                  color: LAYOUT_CONFIG.colors.success,
                  alignment: "right",
                  margin: [0, 0, 0, 3],
                },
              },
              // Informações totalmente alinhadas à direita
              {
                stack: [
                  {
                    text: `Nº: ${despacho.numeroProcesso}`,
                    style: "documentValue",
                    alignment: "right",
                    margin: [0, 0, 0, 1],
                  },
                  {
                    text: `Tipo: ${tipoProcessoTexto}`,
                    style: "documentValue",
                    alignment: "right",
                    margin: [0, 0, 0, 1],
                  },
                  {
                    text: `Data: ${dataCriacao}`,
                    style: "documentValue",
                    alignment: "right",
                    margin: [0, 0, 0, 1],
                  },
                  {
                    text: `Status: ${statusTexto}`,
                    style: "statusText",
                    color: getStatusDespachoColor(despacho.status),
                    alignment: "right",
                    margin: [0, 0, 0, 0],
                  },
                ],
                margin: [0, 0, 0, 0],
              },
            ],
          },
        ],
        margin: [0, 0, 0, 10],
      },

      // Linha divisória
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 0,
            x2: availableWidth,
            y2: 0,
            lineWidth: 1,
            lineColor: LAYOUT_CONFIG.colors.gray,
          },
        ],
        margin: [0, 0, 0, 10],
      },

      // Informações do processo
      {
        columns: [
          {
            width: "60%",
            stack: [
              {
                text: "INFORMAÇÕES DO CLIENTE",
                style: "sectionTitleSmall",
                margin: [0, 0, 0, 5],
              },
              {
                stack: [
                  {
                    text: `Nome: ${despacho.cliente.nomeCliente}`,
                    style: "infoTextSmall",
                  },
                  {
                    text: `NUIT: ${despacho.cliente.nuit}`,
                    style: "infoTextSmall",
                  },
                  {
                    text: `Tipo: ${obterTipoClienteTexto(despacho.cliente.tipoCliente)}`,
                    style: "infoTextSmall",
                  },
                  ...(despacho.cliente.contato?.email ? [
                    {
                      text: `Email: ${despacho.cliente.contato.email}`,
                      style: "infoTextSmall",
                    },
                  ] : []),
                  ...(despacho.cliente.contato?.telefone ? [
                    {
                      text: `Telefone: ${despacho.cliente.contato.telefone}`,
                      style: "infoTextSmall",
                    },
                  ] : []),
                ],
              },
            ],
          },
          {
            width: "40%",
            stack: [
              {
                text: "DETALHES DO PROCESSO",
                style: "sectionTitleSmall",
                margin: [0, 0, 0, 5],
              },
              {
                stack: [
                  {
                    text: `Prioridade: ${despacho.prioridade || 'normal'}`,
                    style: "infoTextSmall",
                  },
                  {
                    text: `Classificação Risco: ${despacho.classificacaoRisco || 'médio'}`,
                    style: "infoTextSmall",
                  },
                  ...(dataPrazoLimite ? [
                    {
                      text: `Prazo Limite: ${dataPrazoLimite}`,
                      style: "infoTextSmall",
                    },
                  ] : []),
                  {
                    text: `Documentação: ${despacho.documentacao?.percentualCompleto || 0}% completa`,
                    style: "infoTextSmall",
                  },
                ],
              },
            ],
          },
        ],
        margin: [0, 0, 0, 20],
      },
    ],
  };
};
const tituloPorTipo: Record<string, string> = {
  Importação: "IMPORTAÇÃO",
  Exportação: "EXPORTAÇÃO",
  Trânsito: "TRÂNSITO",
  Consultoria: "CONSULTORIA",
};

/**
 * Formata data e hora
 */
const formatarDataHora = (dataString: string): string => {
  try {
    const date = new Date(dataString);
    if (isNaN(date.getTime())) return dataString;

    return date.toLocaleString("pt-MZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dataString;
  }
};

/**
 * Carrega imagem da empresa em base64
 */
const carregarImagemEmpresa = async (nomeEmpresa: string): Promise<string> => {
  try {
    const empresaInfo = empresasLista.find(
      (emp: EmpresaImagem) => emp.nome === nomeEmpresa
    );

    if (empresaInfo?.srcImage) {
      const srcImage = empresaInfo.srcImage;
      if (typeof srcImage === "string" && srcImage.trim() !== "") {
        return await getBase64ImageFromURL(srcImage);
      }
    }

    return await getBase64ImageFromURL("/image/megaCentroLogistica.png");
  } catch (error) {
    console.error("Erro ao carregar imagem da empresa:", error);
    return await getBase64ImageFromURL("/image/megaCentroLogistica.png");
  }
};

/**
 * Prepara itens da fatura para exibição na tabela
 */
const prepararItensTabela = (itensFatura?: ItemFatura[]): any[][] => {
  if (!itensFatura || itensFatura.length === 0) {
    return [[]];
  }

  return itensFatura.map((item, index) => [
    {
      text: (index + 1).toString(),
      style: "tableBody",
      alignment: "center",
    },
    {
      text: item.descricao || "Item não especificado",
      style: "tableDescriptionBody",
    },
    {
      text: item.quantidade?.toString() || "1",
      style: "tableBody",
      alignment: "center",
    },
    {
      text: formatarMoeda(item.valorUnitario || 0),
      style: "tableBody",
      alignment: "right",
    },
    {
      text: formatarMoeda(item.valorTotal || 0),
      style: "tableBody",
      alignment: "right",
    },
  ]);
};

/**
 * Prepara itens da cotação para exibição na tabela
 */
const prepararItensCotacaoTabela = (itensCotacao?: ItemCotacao[]): any[][] => {
  if (!itensCotacao || itensCotacao.length === 0) {
    return [[]];
  }

  return itensCotacao.map((item, index) => [
    {
      text: (index + 1).toString(),
      style: "tableBody",
      alignment: "center",
    },
    {
      text: item.descricao || "Item não especificado",
      style: "tableDescriptionBody",
    },
    {
      text: item.quantidade?.toString() || "1",
      style: "tableBody",
      alignment: "center",
    },
    {
      text: formatarMoeda(item.valorUnitario || 0),
      style: "tableBody",
      alignment: "right",
    },
    {
      text: item.observacoes || "-",
      style: "tableBody",
      alignment: "left",
    },
    {
      text: formatarMoeda(item.valorTotal || 0),
      style: "tableBody",
      alignment: "right",
    },
  ]);
};

/**
 * Prepara recebimentos confirmados para exibição
 */
const prepararRecebimentos = (
  recebimentos?: RecebimentoDetalhado[]
): RecebimentoFormatado[] => {
  if (!recebimentos) return [];

  return recebimentos
    .filter((r) => r.status === "confirmado")
    .map((r) => ({
      data: formatarData(r.data),
      valor: formatarMoeda(r.valor),
      forma: r.formaPagamento || "",
      comprovante: r.comprovante || "",
      observacoes: r.observacoes || "",
    }));
};

/**
 * Calcula valores financeiros da fatura
 */
const calcularValoresFinanceiros = (
  fatura: FaturaDetalhada
): ValoresFinanceiros => {
  const subtotal = fatura.subtotal || fatura.valorTotal || 0;

  let valorIVA = 0;
  if (fatura.iva) {
    if (typeof fatura.iva === "number") {
      valorIVA = fatura.iva;
    } else if (fatura.iva && typeof fatura.iva === "object") {
      valorIVA = (fatura.iva as any).valor || 0;
    }
  }

  const totalComIVA = fatura.valorTotal || 0;
  let valorPendente = 0;

  if (fatura.valorPendente !== undefined) {
    valorPendente = fatura.valorPendente;
  } else {
    valorPendente = fatura.status === "paga" ? 0 : totalComIVA;
  }

  const valorRecebido = Math.max(0, totalComIVA - valorPendente);

  return {
    subtotal,
    valorIVA,
    totalComIVA,
    valorPendente,
    valorRecebido,
  };
};

/**
 * Calcula valores financeiros da cotação
 */
const calcularValoresCotacao = (cotacao: CotacaoDetalhada): ValoresFinanceiros => {
  const subtotal = cotacao.subtotal || cotacao.valorTotal || 0;

  let valorIVA = 0;
  if (cotacao.iva) {
    if (typeof cotacao.iva === "number") {
      valorIVA = cotacao.iva;
    } else if (cotacao.iva && typeof cotacao.iva === "object") {
      valorIVA = (cotacao.iva as any).valor || 0;
    }
  }

  const totalComIVA = cotacao.valorTotal || 0;

  return {
    subtotal,
    valorIVA,
    totalComIVA,
    valorPendente: 0, // Cotações não têm valor pendente
    valorRecebido: 0, // Cotações não têm valor recebido
  };
};

// ============================================================================
// FUNÇÕES DE FORMATAÇÃO DE TEXTO (VALOR POR EXTENSO)
// ============================================================================

/**
 * Converte um número parcial para extenso
 */
const valorPorExtensoParcial = (numero: number): string => {
  if (numero === 0) return "";
  if (numero === 100) return "cem";

  const unidades = [
    "",
    "um",
    "dois",
    "três",
    "quatro",
    "cinco",
    "seis",
    "sete",
    "oito",
    "nove",
  ];

  const especiais = [
    "dez",
    "onze",
    "doze",
    "treze",
    "catorze",
    "quinze",
    "dezasseis",
    "dezassete",
    "dezoito",
    "dezanove",
  ];

  const dezenas = [
    "",
    "dez",
    "vinte",
    "trinta",
    "quarenta",
    "cinquenta",
    "sessenta",
    "setenta",
    "oitenta",
    "noventa",
  ];

  const centenas = [
    "",
    "cento",
    "duzentos",
    "trezentos",
    "quatrocentos",
    "quinhentos",
    "seiscentos",
    "setecentos",
    "oitocentos",
    "novecentos",
  ];

  let texto = "";
  let resto = numero;

  // Centenas
  if (resto >= 100) {
    const centena = Math.floor(resto / 100);
    texto += centenas[centena] + " ";
    resto %= 100;

    if (resto > 0) {
      texto += "e ";
    }
  }

  // Dezenas especiais (10-19)
  if (resto >= 10 && resto < 20) {
    texto += especiais[resto - 10];
    return texto.trim();
  }

  // Dezenas normais (20-99)
  if (resto >= 20) {
    const dezena = Math.floor(resto / 10);
    texto += dezenas[dezena];
    resto %= 10;

    if (resto > 0) {
      texto += "e ";
    }
  }

  // Unidades (1-9)
  if (resto > 0) {
    texto += unidades[resto];
  }

  return texto.trim();
};

/**
 * Converte valor monetário para extenso
 */
const valorPorExtenso = (valor: number): string => {
  if (valor === 0) return "zero meticais";
  if (valor < 0) return `menos ${valorPorExtenso(Math.abs(valor))}`;

  const inteiro = Math.floor(valor);
  const decimal = Math.round((valor - inteiro) * 100);

  let texto = "";
  let resto = inteiro;

  // Milhões
  if (resto >= 1000000) {
    const milhoes = Math.floor(resto / 1000000);
    texto +=
      milhoes === 1
        ? "um milhão "
        : `${valorPorExtensoParcial(milhoes)} milhões `;
    resto %= 1000000;
  }

  // Milhares
  if (resto >= 1000) {
    const mil = Math.floor(resto / 1000);
    if (mil === 1) {
      texto += "mil ";
    } else {
      texto += `${valorPorExtensoParcial(mil)} mil `;
    }
    resto %= 1000;
  }

  // Centenas, dezenas e unidades
  if (resto > 0) {
    texto += valorPorExtensoParcial(resto) + " ";
  }

  texto += "meticais";

  // Centavos
  if (decimal > 0) {
    texto += ` e ${valorPorExtensoParcial(decimal)} centavo${
      decimal !== 1 ? "s" : ""
    }`;
  }

  return texto.trim();
};

// ============================================================================
// CONFIGURAÇÃO PDFMAKE
// ============================================================================

/**
 * Configura e inicializa o pdfmake
 */
const configurarPdfMake = async () => {
  try {
    const pdfMakeModule = await import("pdfmake/build/pdfmake");
    const pdfFontsModule = await import("pdfmake/build/vfs_fonts");

    const pdfMake = pdfMakeModule.default;
    const pdfFonts = pdfFontsModule.default || pdfFontsModule;

    if (pdfFonts?.pdfMake?.vfs) {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
    } else if (pdfFonts?.vfs) {
      pdfMake.vfs = pdfFonts.vfs;
    }

    return pdfMake;
  } catch (error) {
    console.error("Erro ao configurar pdfmake:", error);
    throw error;
  }
};

// ============================================================================
// DEFINIÇÕES DE ESTILOS PDF
// ============================================================================

const getPdfStyles = () => ({
  // Estilos para cabeçalho
  companyName: {
    fontSize: 16,
    bold: true,
    color: LAYOUT_CONFIG.colors.primary,
  },
  companyLabel: {
    fontSize: 8,
    color: LAYOUT_CONFIG.colors.darkGray,
    bold: true,
  },
  companyValue: {
    fontSize: 9,
    color: LAYOUT_CONFIG.colors.text,
  },
  documentTitleMain: {
    fontSize: 20,
    bold: true,
    color: LAYOUT_CONFIG.colors.primary,
  },
  bankInfo: {
    fontSize: LAYOUT_CONFIG.fonts.sizes.sm,
    color: LAYOUT_CONFIG.colors.text,
    margin: [0, 1, 0, 1],
  },
  bankNote: {
    fontSize: LAYOUT_CONFIG.fonts.sizes.sm,
    color: LAYOUT_CONFIG.colors.muted,
    fontStyle: "italic",
  },
  documentLabel: {
    fontSize: 9,
    color: LAYOUT_CONFIG.colors.darkGray,
  },
  documentValue: {
    fontSize: 9,
    color: LAYOUT_CONFIG.colors.text,
    bold: true,
  },
  originalTag: {
    fontSize: 12,
    bold: true,
    color: LAYOUT_CONFIG.colors.success,
  },
  documentTag: {
    fontSize: 8,
    bold: true,
    color: LAYOUT_CONFIG.colors.success,
  },
  statusText: {
    fontSize: 9,
    bold: true,
  },
  sectionTitleSmall: {
    fontSize: 10,
    bold: true,
    color: LAYOUT_CONFIG.colors.secondary,
  },
  infoTextSmall: {
    fontSize: 8,
    color: LAYOUT_CONFIG.colors.text,
    margin: [0, 1, 0, 1],
  },

  // Estilos para conteúdo principal
  documentTitle: {
    fontSize: LAYOUT_CONFIG.fonts.sizes.xxl,
    bold: true,
    color: LAYOUT_CONFIG.colors.secondary,
  },
  documentNumber: {
    fontSize: LAYOUT_CONFIG.fonts.sizes.lg,
    bold: true,
    color: LAYOUT_CONFIG.colors.info,
  },
  documentDate: {
    fontSize: LAYOUT_CONFIG.fonts.sizes.sm,
    color: LAYOUT_CONFIG.colors.muted,
  },

  // Seções
  sectionTitle: {
    fontSize: LAYOUT_CONFIG.fonts.sizes.lg,
    bold: true,
    color: LAYOUT_CONFIG.colors.secondary,
    margin: [0, 0, 0, LAYOUT_CONFIG.spacing.xs],
    decoration: "underline",
  },

  // Texto informativo
  infoText: {
    fontSize: LAYOUT_CONFIG.fonts.sizes.md,
    margin: [0, 2, 0, 2],
    color: LAYOUT_CONFIG.colors.text,
  },
  infoLabel: {
    fontSize: LAYOUT_CONFIG.fonts.sizes.md,
    color: LAYOUT_CONFIG.colors.darkGray,
    bold: true,
  },
  infoValue: {
    fontSize: LAYOUT_CONFIG.fonts.sizes.md,
    color: LAYOUT_CONFIG.colors.text,
  },

  // Tabelas
  tableHeader: {
    bold: true,
    fontSize: LAYOUT_CONFIG.fonts.sizes.sm,
    color: LAYOUT_CONFIG.colors.text,
    fillColor: LAYOUT_CONFIG.table.headerBg,
  },
  tableBody: {
    fontSize: LAYOUT_CONFIG.fonts.sizes.sm,
    color: LAYOUT_CONFIG.colors.text,
  },
  tableDescriptionBody: {
    fontSize: LAYOUT_CONFIG.fonts.sizes.sm,
    color: LAYOUT_CONFIG.colors.text,
  },

  // Resumo financeiro
  summaryTitle: {
    fontSize: LAYOUT_CONFIG.fonts.sizes.md,
    bold: true,
    color: LAYOUT_CONFIG.colors.secondary,
    margin: [0, 0, 0, LAYOUT_CONFIG.spacing.xs],
  },
  summaryLabel: {
    fontSize: LAYOUT_CONFIG.fonts.sizes.sm,
    color: LAYOUT_CONFIG.colors.darkGray,
  },
  summaryValue: {
    fontSize: LAYOUT_CONFIG.fonts.sizes.sm,
    bold: true,
    color: LAYOUT_CONFIG.colors.success,
  },
  summaryValuePending: {
    fontSize: LAYOUT_CONFIG.fonts.sizes.sm,
    bold: true,
    color: LAYOUT_CONFIG.colors.error,
  },
  summaryTotalLabel: {
    fontSize: LAYOUT_CONFIG.fonts.sizes.md,
    bold: true,
    color: LAYOUT_CONFIG.colors.secondary,
    margin: [LAYOUT_CONFIG.spacing.xs, 0, 0, 0],
  },
  summaryTotalValue: {
    fontSize: LAYOUT_CONFIG.fonts.sizes.md,
    bold: true,
    color: LAYOUT_CONFIG.colors.info,
  },

  // QR Code
  qrText: {
    fontSize: LAYOUT_CONFIG.fonts.sizes.xs,
    color: LAYOUT_CONFIG.colors.muted,
    margin: [0, 2, 0, 0],
  },

  // Observações
  notesText: {
    fontSize: LAYOUT_CONFIG.fonts.sizes.sm,
    color: LAYOUT_CONFIG.colors.darkGray,
    alignment: "justify",
  },

  // Rodapé
  footer: {
    fontSize: LAYOUT_CONFIG.fonts.sizes.xs,
    color: LAYOUT_CONFIG.colors.muted,
  },

  // Recibo
  reciboTitle: {
    fontSize: 16,
    bold: true,
    color: LAYOUT_CONFIG.colors.secondary,
  },
  valorExtenso: {
    fontSize: LAYOUT_CONFIG.fonts.sizes.md,
    italic: true,
    color: LAYOUT_CONFIG.colors.muted,
  },
  assinatura: {
    fontSize: LAYOUT_CONFIG.fonts.sizes.lg,
    color: LAYOUT_CONFIG.colors.darkGray,
  },
  assinaturaLabel: {
    fontSize: LAYOUT_CONFIG.fonts.sizes.xs,
    color: LAYOUT_CONFIG.colors.muted,
  },

  // Cotação
  cotacaoTitleMain: {
    fontSize: 20,
    bold: true,
    color: LAYOUT_CONFIG.colors.info,
  },
  cotacaoTitle: {
    fontSize: 14,
    bold: true,
    color: LAYOUT_CONFIG.colors.info,
    margin: [0, 0, 0, 5],
  },
});

// ============================================================================
// FUNÇÕES AUXILIARES PARA CABEÇALHO
// ============================================================================

/**
 * Obtém a cor do status
 */
const getStatusColor = (status: string): string => {
  switch (status) {
    case "paga":
      return LAYOUT_CONFIG.colors.success;
    case "pendente":
      return LAYOUT_CONFIG.colors.warning;
    case "vencida":
      return LAYOUT_CONFIG.colors.error;
    default:
      return LAYOUT_CONFIG.colors.text;
  }
};

/**
 * Obtém a cor do status da cotação
 */
const getStatusCotacaoColor = (status: string): string => {
  switch (status) {
    case "aprovada":
      return LAYOUT_CONFIG.colors.success;
    case "pendente":
      return LAYOUT_CONFIG.colors.warning;
    case "expirada":
      return LAYOUT_CONFIG.colors.error;
    case "convertida":
      return LAYOUT_CONFIG.colors.info;
    default:
      return LAYOUT_CONFIG.colors.text;
  }
};

/**
 * Cria o cabeçalho da fatura para o corpo do documento
 */
const criarCabecalhoFaturaParaCorpo = (
  empresa: DadosEmpresa,
  fatura: FaturaDetalhada,
  imagemEmpresa: string,
  dataEmissao: string,
  dataVencimento: string,
  statusTexto: string,
  tipoServicoTexto: string
) => {
  const availableWidth =
    LAYOUT_CONFIG.page.width -
    LAYOUT_CONFIG.page.margins.left -
    LAYOUT_CONFIG.page.margins.right;

  return {
    stack: [
      // Linha principal: Logo + informações + fatura
      {
        columns: [
          // Coluna da logo e informações da empresa
          {
            width: "65%",
            columns: [
              // Logo
              {
                width: "20%",
                stack: [
                  {
                    image: imagemEmpresa,
                    width: 60,
                    height: 60,
                    alignment: "left",
                    margin: [0, 0, 0, 5],
                  },
                ],
              },

              // Informações da empresa ao lado do logo
              {
                width: "80%",
                stack: [
                  // Nome da empresa (ao lado do logo)
                  {
                    text: empresa.nomeEmpresaLocal,
                    style: "companyName",
                    margin: [10, 5, 0, 8],
                  },

                  // Informações da empresa em VERTICAL
                  {
                    stack: [
                      // Endereço
                      {
                        columns: [
                          {
                            text: "Endereço:",
                            style: "companyLabel",
                            width: "auto",
                            margin: [10, 0, 3, 0],
                          },
                          {
                            text: empresa.enderecoLocal,
                            style: "companyValue",
                            margin: [0, 0, 0, 0],
                          },
                        ],
                        margin: [0, 0, 0, 1],
                      },

                      // NUIT
                      {
                        columns: [
                          {
                            text: "NUIT:",
                            style: "companyLabel",
                            width: "auto",
                            margin: [10, 0, 3, 0],
                          },
                          {
                            text: empresa.nuitLocal,
                            style: "companyValue",
                            margin: [0, 0, 0, 0],
                          },
                        ],
                        margin: [0, 0, 0, 1],
                      },

                      // Email
                      {
                        columns: [
                          {
                            text: "Email:",
                            style: "companyLabel",
                            width: "auto",
                            margin: [10, 0, 3, 0],
                          },
                          {
                            text: empresa.emailLocal,
                            style: "companyValue",
                            margin: [0, 0, 0, 0],
                          },
                        ],
                        margin: [0, 0, 0, 1],
                      },

                      // Contactos
                      {
                        columns: [
                          {
                            text: "Contactos:",
                            style: "companyLabel",
                            width: "auto",
                            margin: [10, 0, 3, 0],
                          },
                          {
                            text: empresa.contactosLocal,
                            style: "companyValue",
                            margin: [0, 0, 0, 0],
                          },
                        ],
                        margin: [0, 0, 0, 0],
                      },
                    ],
                  },
                ],
              },
            ],
          },

          // Coluna do documento (fatura)
          {
            width: "35%",
            stack: [
              // FATURA em destaque
              {
                text: "FATURA",
                style: "documentTitleMain",
                alignment: "right",
                margin: [0, 2, 0, 0],
              },
              // ORIGINAL por baixo da FATURA
              {
                text: "ORIGINAL",
                style: {
                  fontSize: 12,
                  bold: true,
                  color: LAYOUT_CONFIG.colors.success,
                  alignment: "right",
                  margin: [0, 0, 0, 3],
                },
              },
              // Informações totalmente alinhadas à direita
              {
                stack: [
                  {
                    text: `Nº: ${fatura.numeroFatura}`,
                    style: "documentValue",
                    alignment: "right",
                    margin: [0, 0, 0, 1],
                  },
                  {
                    text: `Data: ${dataEmissao}`,
                    style: "documentValue",
                    alignment: "right",
                    margin: [0, 0, 0, 1],
                  },
                  {
                    text: `Vencimento: ${dataVencimento}`,
                    style: "documentValue",
                    alignment: "right",
                    margin: [0, 0, 0, 1],
                  },
                  {
                    text: `Status: ${statusTexto}`,
                    style: "statusText",
                    color: getStatusColor(fatura.status),
                    alignment: "right",
                    margin: [0, 0, 0, 0],
                  },
                ],
                margin: [0, 0, 0, 0],
              },
            ],
          },
        ],
        margin: [0, 0, 0, 10],
      },

      // Linha divisória
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 0,
            x2: availableWidth,
            y2: 0,
            lineWidth: 1,
            lineColor: LAYOUT_CONFIG.colors.gray,
          },
        ],
        margin: [0, 0, 0, 10],
      },

      // Informações do cliente
      {
        columns: [
          {
            width: "60%",
            stack: [
              {
                text: "CLIENTE",
                style: "sectionTitleSmall",
                margin: [0, 0, 0, 5],
              },
              {
                stack: [
                  {
                    text: `Nome: ${fatura.cliente?.nome || "Não especificado"}`,
                    style: "infoTextSmall",
                  },
                  {
                    text: `Endereço: ${
                      fatura.cliente?.endereco || "Não especificado"
                    }`,
                    style: "infoTextSmall",
                  },
                  {
                    text: `NUIT/NIF: ${
                      fatura.cliente?.nif || "Não especificado"
                    }`,
                    style: "infoTextSmall",
                  },
                  {
                    text: `Contacto: ${
                      fatura.cliente?.telefone || "Não especificado"
                    }`,
                    style: "infoTextSmall",
                  },
                  {
                    text: `Email: ${
                      fatura.cliente?.email || "Não especificado"
                    }`,
                    style: "infoTextSmall",
                  },
                ],
              },
            ],
          },
          {
            width: "40%",
            stack: [
              {
                text: "INFORMAÇÕES ADICIONAIS",
                style: "sectionTitleSmall",
                margin: [0, 0, 0, 5],
              },
              {
                stack: [
                  {
                    text: `Tipo de Serviço: ${tipoServicoTexto}`,
                    style: "infoTextSmall",
                  },
                  {
                    text: `Referência: ${fatura.referencia || "Nenhuma"}`,
                    style: "infoTextSmall",
                  },
                  {
                    text: `Itens: ${fatura.itensFatura?.length || 0}`,
                    style: "infoTextSmall",
                  },
                  {
                    text: `Moeda: MZN`,
                    style: "infoTextSmall",
                  },
                ],
              },
            ],
          },
        ],
        margin: [0, 0, 0, 20],
      },
    ],
  };
};

/**
 * Cria o cabeçalho do recibo para o corpo do documento
 */
const criarCabecalhoReciboParaCorpo = (
  empresa: DadosEmpresa,
  fatura: FaturaDetalhada,
  recebimento: RecebimentoDetalhado,
  imagemEmpresa: string,
  dataRecebimento: string,
  numeroRecibo: string
) => {
  const availableWidth =
    LAYOUT_CONFIG.page.width -
    LAYOUT_CONFIG.page.margins.left -
    LAYOUT_CONFIG.page.margins.right;

  return {
    stack: [
      // Linha principal: Logo + informações + recibo
      {
        columns: [
          // Coluna da logo e informações da empresa
          {
            width: "65%",
            columns: [
              // Logo
              {
                width: "20%",
                stack: [
                  {
                    image: imagemEmpresa,
                    width: 60,
                    height: 60,
                    alignment: "left",
                    margin: [0, 0, 0, 5],
                  },
                ],
              },

              // Informações da empresa ao lado do logo
              {
                stack: [
                  // Endereço
                  {
                    text: empresa.nomeEmpresaLocal,
                    style: "companyName",
                    margin: [10, 5, 0, 8],
                  },
                  {
                    columns: [
                      {
                        text: "Endereço:",
                        style: "companyLabel",
                        width: "auto",
                        margin: [10, 0, 3, 0],
                      },
                      {
                        text: empresa.enderecoLocal,
                        style: "companyValue",
                        margin: [0, 0, 0, 0],
                      },
                    ],
                    margin: [0, 0, 0, 1],
                  },

                  // NUIT
                  {
                    columns: [
                      {
                        text: "NUIT:",
                        style: "companyLabel",
                        width: "auto",
                        margin: [10, 0, 3, 0],
                      },
                      {
                        text: empresa.nuitLocal,
                        style: "companyValue",
                        margin: [0, 0, 0, 0],
                      },
                    ],
                    margin: [0, 0, 0, 1],
                  },

                  // Email
                  {
                    columns: [
                      {
                        text: "Email:",
                        style: "companyLabel",
                        width: "auto",
                        margin: [10, 0, 3, 0],
                      },
                      {
                        text: empresa.emailLocal,
                        style: "companyValue",
                        margin: [0, 0, 0, 0],
                      },
                    ],
                    margin: [0, 0, 0, 1],
                  },

                  // Contactos
                  {
                    columns: [
                      {
                        text: "Contactos:",
                        style: "companyLabel",
                        width: "auto",
                        margin: [10, 0, 3, 0],
                      },
                      {
                        text: empresa.contactosLocal,
                        style: "companyValue",
                        margin: [0, 0, 0, 0],
                      },
                    ],
                    margin: [0, 0, 0, 0],
                  },
                ],
              },
            ],
          },

          // Coluna do documento (recibo)
          {
            width: "35%",
            stack: [
              // RECIBO DE PAGAMENTO em destaque
              {
                text: "RECIBO DE PAGAMENTO",
                style: "documentTitleMain",
                alignment: "right",
                margin: [0, 2, 0, 0],
              },
              // ORIGINAL por baixo do título do recibo
              {
                text: "ORIGINAL",
                style: {
                  fontSize: 12,
                  bold: true,
                  color: LAYOUT_CONFIG.colors.success,
                  alignment: "right",
                  margin: [0, 0, 0, 3],
                },
              },
              // Informações totalmente alinhadas à direita
              {
                stack: [
                  {
                    text: `Nº: ${numeroRecibo}`,
                    style: "documentValue",
                    alignment: "right",
                    margin: [0, 0, 0, 1],
                  },
                  {
                    text: `Data: ${dataRecebimento}`,
                    style: "documentValue",
                    alignment: "right",
                    margin: [0, 0, 0, 1],
                  },
                  {
                    text: `Fatura: ${fatura.numeroFatura}`,
                    style: "documentValue",
                    alignment: "right",
                    margin: [0, 0, 0, 1],
                  },
                  {
                    text: `Status: Confirmado`,
                    style: "statusText",
                    color: LAYOUT_CONFIG.colors.success,
                    alignment: "right",
                    margin: [0, 0, 0, 0],
                  },
                ],
                margin: [0, 0, 0, 0],
              },
            ],
          },
        ],
        margin: [0, 0, 0, 10],
      },

      // Linha divisória
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 0,
            x2: availableWidth,
            y2: 0,
            lineWidth: 1,
            lineColor: LAYOUT_CONFIG.colors.gray,
          },
        ],
        margin: [0, 0, 0, 10],
      },

      // Informações do cliente
      {
        columns: [
          {
            width: "100%",
            stack: [
              {
                text: "DADOS DO CLIENTE",
                style: "sectionTitleSmall",
                margin: [0, 0, 0, 5],
              },
              {
                columns: [
                  {
                    width: "50%",
                    stack: [
                      {
                        text: `Nome: ${
                          fatura.cliente?.nome || "Não especificado"
                        }`,
                        style: "infoTextSmall",
                      },
                      {
                        text: `NUIT/NIF: ${
                          fatura.cliente?.nif || "Não especificado"
                        }`,
                        style: "infoTextSmall",
                      },
                    ],
                  },
                  {
                    width: "50%",
                    stack: [
                      {
                        text: `Telefone: ${
                          fatura.cliente?.telefone || "Não especificado"
                        }`,
                        style: "infoTextSmall",
                      },
                      {
                        text: `Email: ${
                          fatura.cliente?.email || "Não especificado"
                        }`,
                        style: "infoTextSmall",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        margin: [0, 0, 0, 20],
      },
    ],
  };
};

/**
 * Cria o cabeçalho da cotação para o corpo do documento
 */
const criarCabecalhoCotacaoParaCorpo = (
  empresa: DadosEmpresa,
  cotacao: CotacaoDetalhada,
  imagemEmpresa: string,
  dataEmissao: string,
  dataValidade: string,
  statusTexto: string,
  tipoServicoTexto: string
) => {
  const availableWidth =
    LAYOUT_CONFIG.page.width -
    LAYOUT_CONFIG.page.margins.left -
    LAYOUT_CONFIG.page.margins.right;

  return {
    stack: [
      // Linha principal: Logo + informações + cotação
      {
        columns: [
          // Coluna da logo e informações da empresa
          {
            width: "65%",
            columns: [
              // Logo
              {
                width: "20%",
                stack: [
                  {
                    image: imagemEmpresa,
                    width: 60,
                    height: 60,
                    alignment: "left",
                    margin: [0, 0, 0, 5],
                  },
                ],
              },

              // Informações da empresa ao lado do logo
              {
                width: "80%",
                stack: [
                  // Nome da empresa (ao lado do logo)
                  {
                    text: empresa.nomeEmpresaLocal,
                    style: "companyName",
                    margin: [10, 5, 0, 8],
                  },

                  // Informações da empresa em VERTICAL
                  {
                    stack: [
                      // Endereço
                      {
                        columns: [
                          {
                            text: "Endereço:",
                            style: "companyLabel",
                            width: "auto",
                            margin: [10, 0, 3, 0],
                          },
                          {
                            text: empresa.enderecoLocal,
                            style: "companyValue",
                            margin: [0, 0, 0, 0],
                          },
                        ],
                        margin: [0, 0, 0, 1],
                      },

                      // NUIT
                      {
                        columns: [
                          {
                            text: "NUIT:",
                            style: "companyLabel",
                            width: "auto",
                            margin: [10, 0, 3, 0],
                          },
                          {
                            text: empresa.nuitLocal,
                            style: "companyValue",
                            margin: [0, 0, 0, 0],
                          },
                        ],
                        margin: [0, 0, 0, 1],
                      },

                      // Email
                      {
                        columns: [
                          {
                            text: "Email:",
                            style: "companyLabel",
                            width: "auto",
                            margin: [10, 0, 3, 0],
                          },
                          {
                            text: empresa.emailLocal,
                            style: "companyValue",
                            margin: [0, 0, 0, 0],
                          },
                        ],
                        margin: [0, 0, 0, 1],
                      },

                      // Contactos
                      {
                        columns: [
                          {
                            text: "Contactos:",
                            style: "companyLabel",
                            width: "auto",
                            margin: [10, 0, 3, 0],
                          },
                          {
                            text: empresa.contactosLocal,
                            style: "companyValue",
                            margin: [0, 0, 0, 0],
                          },
                        ],
                        margin: [0, 0, 0, 0],
                      },
                    ],
                  },
                ],
              },
            ],
          },

          // Coluna do documento (cotação)
          {
            width: "35%",
            stack: [
              // COTAÇÃO em destaque
              {
                text: "COTAÇÃO",
                style: "cotacaoTitleMain",
                alignment: "right",
                margin: [0, 2, 0, 0],
              },
              // ORIGINAL por baixo da COTAÇÃO
              {
                text: "ORIGINAL",
                style: {
                  fontSize: 12,
                  bold: true,
                  color: LAYOUT_CONFIG.colors.info,
                  alignment: "right",
                  margin: [0, 0, 0, 3],
                },
              },
              // Informações totalmente alinhadas à direita
              {
                stack: [
                  {
                    text: `Nº: ${cotacao.numeroCotacao}`,
                    style: "documentValue",
                    alignment: "right",
                    margin: [0, 0, 0, 1],
                  },
                  {
                    text: `Data: ${dataEmissao}`,
                    style: "documentValue",
                    alignment: "right",
                    margin: [0, 0, 0, 1],
                  },
                  {
                    text: `Validade: ${dataValidade}`,
                    style: "documentValue",
                    alignment: "right",
                    margin: [0, 0, 0, 1],
                  },
                  {
                    text: `Status: ${statusTexto}`,
                    style: "statusText",
                    color: getStatusCotacaoColor(cotacao.status),
                    alignment: "right",
                    margin: [0, 0, 0, 0],
                  },
                ],
                margin: [0, 0, 0, 0],
              },
            ],
          },
        ],
        margin: [0, 0, 0, 10],
      },

      // Linha divisória
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 0,
            x2: availableWidth,
            y2: 0,
            lineWidth: 1,
            lineColor: LAYOUT_CONFIG.colors.gray,
          },
        ],
        margin: [0, 0, 0, 10],
      },

      // Informações do cliente
      {
        columns: [
          {
            width: "60%",
            stack: [
              {
                text: "CLIENTE",
                style: "sectionTitleSmall",
                margin: [0, 0, 0, 5],
              },
              {
                stack: [
                  {
                    text: `Nome: ${cotacao.cliente?.nome || "Não especificado"}`,
                    style: "infoTextSmall",
                  },
                  {
                    text: `Endereço: ${
                      cotacao.cliente?.endereco || "Não especificado"
                    }`,
                    style: "infoTextSmall",
                  },
                  {
                    text: `NUIT/NIF: ${
                      cotacao.cliente?.nif || "Não especificado"
                    }`,
                    style: "infoTextSmall",
                  },
                  {
                    text: `Contacto: ${
                      cotacao.cliente?.telefone || "Não especificado"
                    }`,
                    style: "infoTextSmall",
                  },
                  {
                    text: `Email: ${
                      cotacao.cliente?.email || "Não especificado"
                    }`,
                    style: "infoTextSmall",
                  },
                ],
              },
            ],
          },
          {
            width: "40%",
            stack: [
              {
                text: "INFORMAÇÕES DA COTAÇÃO",
                style: "sectionTitleSmall",
                margin: [0, 0, 0, 5],
              },
              {
                stack: [
                  {
                    text: `Tipo de Serviço: ${tipoServicoTexto}`,
                    style: "infoTextSmall",
                  },
                  {
                    text: `Referência: ${cotacao.referencia || "Nenhuma"}`,
                    style: "infoTextSmall",
                  },
                  {
                    text: `Itens: ${cotacao.itensCotacao?.length || 0}`,
                    style: "infoTextSmall",
                  },
                  {
                    text: `Moeda: MZN`,
                    style: "infoTextSmall",
                  },
                ],
              },
            ],
          },
        ],
        margin: [0, 0, 0, 20],
      },
    ],
  };
};

// ============================================================================
// GERADOR DE FATURA
// ============================================================================

/**
 * Gera PDF da fatura
 */
export async function gerarPDFFatura(dados: DadosFaturaPDF): Promise<void> {
  const { fatura, empresa } = dados;

  try {
    const pdfMake = await configurarPdfMake();
    const imagemEmpresa = await carregarImagemEmpresa(empresa.nomeEmpresaLocal);
    const styles = getPdfStyles();

    // Dados formatados
    const dataEmissao = formatarData(fatura.dataEmissao);
    const dataVencimento = formatarData(fatura.dataVencimento);
    const statusTexto = obterStatusTexto(fatura.status);
    const tipoServicoTexto = obterTipoServicoTexto(fatura.tipoServico);
    const valores = calcularValoresFinanceiros(fatura);

    // Preparar tabela
    const itensTabela = prepararItensTabela(fatura.itensFatura);
    const cabecalhoTabela = [
      [
        { text: "#", style: "tableHeader", alignment: "center" },
        { text: "Descrição", style: "tableHeader" },
        { text: "Qtd", style: "tableHeader", alignment: "center" },
        { text: "Valor Unitário", style: "tableHeader", alignment: "right" },
        { text: "Valor Total", style: "tableHeader", alignment: "right" },
      ],
    ];

    const corpoTabela =
      itensTabela.length > 0
        ? [...cabecalhoTabela, ...itensTabela]
        : cabecalhoTabela;

    // Recebimentos
    const recebimentos = prepararRecebimentos(fatura.recebimentos);

    // Criar cabeçalho para o corpo
    const cabecalhoCorpo = criarCabecalhoFaturaParaCorpo(
      empresa,
      fatura,
      imagemEmpresa,
      dataEmissao,
      dataVencimento,
      statusTexto,
      tipoServicoTexto
    );

    // Conteúdo do PDF
    const docDefinition: PdfMakeContent = {
      pageSize: "A4",
      pageMargins: [
        LAYOUT_CONFIG.page.margins.left,
        LAYOUT_CONFIG.page.margins.top,
        LAYOUT_CONFIG.page.margins.right,
        LAYOUT_CONFIG.page.margins.bottom,
      ],
      footer: function (currentPage: number, pageCount: number) {
        return {
          columns: [
            {
              text: `Processado pelo Software Systems Manager - Licença 92/DAF2/2023`,
              style: "footer",
              width: "50%",
            },
            {
              text: `Página ${currentPage} de ${pageCount}`,
              style: "footer",
              alignment: "right",
              width: "50%",
            },
          ],
          margin: [
            LAYOUT_CONFIG.page.margins.left,
            0,
            LAYOUT_CONFIG.page.margins.right,
            LAYOUT_CONFIG.spacing.sm,
          ],
        };
      },
      content: [
        // CABEÇALHO NO CORPO DO DOCUMENTO
        cabecalhoCorpo,

        // Descrição do Serviço (se existir)
        ...(fatura.descricaoServico
          ? [
              {
                text: "DESCRIÇÃO DO SERVIÇO",
                style: "sectionTitle",
              },
              {
                text: fatura.descricaoServico,
                style: "notesText",
                margin: [
                  0,
                  LAYOUT_CONFIG.spacing.xs,
                  0,
                  LAYOUT_CONFIG.spacing.md,
                ],
              },
            ]
          : []),

        // Tabela de Itens
        {
          text: "ITENS DA FATURA",
          style: "sectionTitle",
        },
        {
          table: {
            headerRows: 1,
            widths: ["auto", "*", "auto", "auto", "auto"],
            body: corpoTabela,
          },
          layout: {
            hLineWidth: (i: number) =>
              i === 0 || i === corpoTabela.length
                ? 1
                : LAYOUT_CONFIG.table.borderWidth,
            vLineWidth: () => LAYOUT_CONFIG.table.borderWidth,
            hLineColor: () => LAYOUT_CONFIG.table.borderColor,
            vLineColor: () => LAYOUT_CONFIG.table.borderColor,
            paddingTop: () => LAYOUT_CONFIG.table.rowPadding,
            paddingBottom: () => LAYOUT_CONFIG.table.rowPadding,
            paddingLeft: () => LAYOUT_CONFIG.spacing.xs,
            paddingRight: () => LAYOUT_CONFIG.spacing.xs,
          },
          margin: [0, LAYOUT_CONFIG.spacing.xs, 0, LAYOUT_CONFIG.spacing.lg],
        },

        // Resumo Financeiro com QR Code
        {
          columns: [
            // QR Code
            {
              width: "60%",
              stack: [
                {
                  qr: `Fatura: ${fatura.numeroFatura}\nCliente: ${
                    fatura.cliente?.nome
                  }\nValor: ${formatarMoeda(
                    valores.totalComIVA
                  )}\nData: ${dataEmissao}\nEmitida por: ${
                    empresa.nomeEmpresaLocal
                  }`,
                  fit: 100,
                  margin: [0, 0, 0, LAYOUT_CONFIG.spacing.sm],
                },
                {
                  text: "Processado por computador",
                  style: "qrText",
                  alignment: "center",
                },
                {
                  text: "Licença 92/DAF2/2023",
                  style: "qrText",
                  alignment: "center",
                },
              ],
            },
            // Resumo Financeiro
            {
              width: "40%",
              stack: [
                {
                  text: "RESUMO FINANCEIRO",
                  style: "summaryTitle",
                },
                {
                  table: {
                    widths: ["*", "auto"],
                    body: [
                      [
                        { text: "Subtotal:", style: "summaryLabel" },
                        {
                          text: formatarMoeda(valores.subtotal),
                          style: "summaryValue",
                          alignment: "right",
                        },
                      ],
                      ...(valores.valorIVA > 0
                        ? [
                            [
                              {
                                text: `IVA (16%):`,
                                style: "summaryLabel",
                              },
                              {
                                text: formatarMoeda(valores.valorIVA),
                                style: "summaryValue",
                                alignment: "right",
                              },
                            ],
                          ]
                        : []),
                      ...(valores.valorRecebido > 0
                        ? [
                            [
                              {
                                text: "Valor Recebido:",
                                style: "summaryLabel",
                              },
                              {
                                text: formatarMoeda(valores.valorRecebido),
                                style: "summaryValue",
                                alignment: "right",
                              },
                            ],
                          ]
                        : []),
                      ...(valores.valorPendente > 0
                        ? [
                            [
                              {
                                text: "Valor Pendente:",
                                style: "summaryLabel",
                              },
                              {
                                text: formatarMoeda(valores.valorPendente),
                                style: "summaryValuePending",
                                alignment: "right",
                              },
                            ],
                          ]
                        : []),
                      [
                        { text: "TOTAL:", style: "summaryTotalLabel" },
                        {
                          text: formatarMoeda(valores.totalComIVA),
                          style: "summaryTotalValue",
                          alignment: "right",
                          bold: true,
                        },
                      ],
                    ],
                  },
                  layout: "noBorders",
                  margin: [0, LAYOUT_CONFIG.spacing.xs, 0, 0],
                },
              ],
            },
          ],
          margin: [0, 0, 0, LAYOUT_CONFIG.spacing.lg],
        },

        // Histórico de Recebimentos (se houver)
        ...(recebimentos.length > 0
          ? [
              {
                text: "HISTÓRICO DE RECEBIMENTOS",
                style: "sectionTitle",
              },
              {
                table: {
                  headerRows: 1,
                  widths: ["*", "auto", "auto", "auto"],
                  body: [
                    [
                      { text: "Data", style: "tableHeader" },
                      {
                        text: "Valor",
                        style: "tableHeader",
                        alignment: "right",
                      },
                      { text: "Forma de Pagamento", style: "tableHeader" },
                      { text: "Comprovante", style: "tableHeader" },
                    ],
                    ...recebimentos.map((r) => [
                      { text: r.data, style: "tableBody" },
                      { text: r.valor, style: "tableBody", alignment: "right" },
                      { text: r.forma, style: "tableBody" },
                      { text: r.comprovante || "-", style: "tableBody" },
                    ]),
                  ],
                },
                layout: {
                  hLineWidth: () => LAYOUT_CONFIG.table.borderWidth,
                  vLineWidth: () => 0,
                  hLineColor: () => LAYOUT_CONFIG.table.borderColor,
                  paddingTop: () => LAYOUT_CONFIG.table.rowPadding,
                  paddingBottom: () => LAYOUT_CONFIG.table.rowPadding,
                },
                margin: [
                  0,
                  LAYOUT_CONFIG.spacing.xs,
                  0,
                  LAYOUT_CONFIG.spacing.md,
                ],
              },
            ]
          : []),

        // Observações (se houver)
        ...(fatura.notas
          ? [
              {
                text: "OBSERVAÇÕES",
                style: "sectionTitle",
              },
              {
                text: fatura.notas,
                style: "notesText",
                margin: [
                  0,
                  LAYOUT_CONFIG.spacing.xs,
                  0,
                  LAYOUT_CONFIG.spacing.sm,
                ],
              },
            ]
          : []),

        // Dados Bancários
        ...(empresa.dadosBancarios
          ? [
              {
                canvas: [
                  {
                    type: "line",
                    x1: 0,
                    y1: 0,
                    x2:
                      LAYOUT_CONFIG.page.width -
                      LAYOUT_CONFIG.page.margins.left -
                      LAYOUT_CONFIG.page.margins.right,
                    y2: 0,
                    lineWidth: 1,
                    lineColor: LAYOUT_CONFIG.colors.gray,
                  },
                ],
                margin: [
                  0,
                  LAYOUT_CONFIG.spacing.md,
                  0,
                  LAYOUT_CONFIG.spacing.sm,
                ],
              },
              {
                text: "DADOS BANCÁRIOS PARA PAGAMENTO",
                style: "sectionTitle",
                margin: [0, 0, 0, LAYOUT_CONFIG.spacing.xs],
              },
              {
                table: {
                  widths: ["*"],
                  body: [
                    [
                      {
                        text: `Banco: ${empresa.dadosBancarios.banco}`,
                        style: "bankInfo",
                      },
                    ],
                    [
                      {
                        text: `NIB: ${empresa.dadosBancarios.nib}`,
                        style: "bankInfo",
                      },
                    ],
                    [
                      {
                        text: `IBAN: ${empresa.dadosBancarios.iban}`,
                        style: "bankInfo",
                      },
                    ],
                  ],
                },
                layout: {
                  hLineWidth: () => 0,
                  vLineWidth: () => 0,
                  paddingTop: () => 1,
                  paddingBottom: () => 1,
                },
                margin: [0, 0, 0, LAYOUT_CONFIG.spacing.sm],
              },
              {
                text: "Por favor, utilize os dados acima para efetuar transferências bancárias.",
                style: "bankNote",
                margin: [0, 0, 0, LAYOUT_CONFIG.spacing.sm],
              },
            ]
          : []),
      ],
      styles: styles,
    };

    // Gerar PDF
    pdfMake
      .createPdf(docDefinition)
      .download(`Fatura-${fatura.numeroFatura.replace(/\//g, "-")}.pdf`);
  } catch (error) {
    console.error("Erro ao gerar PDF da fatura:", error);
    throw new Error("Não foi possível gerar o PDF da fatura");
  }
}

// ============================================================================
// GERADOR DE COTAÇÃO
// ============================================================================

/**
 * Gera PDF de cotação
 */
export async function gerarPDFCotacao(dados: { cotacao: CotacaoDetalhada, empresa: DadosEmpresa }): Promise<void> {
  const { cotacao, empresa } = dados;

  try {
    const pdfMake = await configurarPdfMake();
    const imagemEmpresa = await carregarImagemEmpresa(empresa.nomeEmpresaLocal);
    const styles = getPdfStyles();

    // Dados formatados
    const dataEmissao = formatarData(cotacao.dataEmissao);
    const dataValidade = formatarData(cotacao.dataValidade);
    const statusTexto = obterStatusCotacaoTexto(cotacao.status);
    const tipoServicoTexto = obterTipoServicoTexto(cotacao.tipoServico);
    const valores = calcularValoresCotacao(cotacao);

    // Preparar tabela de itens da cotação
    const itensTabela = prepararItensCotacaoTabela(cotacao.itensCotacao);
    const cabecalhoTabela = [
      [
        { text: "#", style: "tableHeader", alignment: "center" },
        { text: "Descrição", style: "tableHeader" },
        { text: "Qtd", style: "tableHeader", alignment: "center" },
        { text: "Valor Unitário", style: "tableHeader", alignment: "right" },
        { text: "Observações", style: "tableHeader" },
        { text: "Valor Total", style: "tableHeader", alignment: "right" },
      ],
    ];

    const corpoTabela =
      itensTabela.length > 0
        ? [...cabecalhoTabela, ...itensTabela]
        : cabecalhoTabela;

    // Criar cabeçalho para o corpo
    const cabecalhoCorpo = criarCabecalhoCotacaoParaCorpo(
      empresa,
      cotacao,
      imagemEmpresa,
      dataEmissao,
      dataValidade,
      statusTexto,
      tipoServicoTexto
    );

    // Conteúdo do PDF
    const docDefinition: PdfMakeContent = {
      pageSize: "A4",
      pageMargins: [
        LAYOUT_CONFIG.page.margins.left,
        LAYOUT_CONFIG.page.margins.top,
        LAYOUT_CONFIG.page.margins.right,
        LAYOUT_CONFIG.page.margins.bottom,
      ],
      footer: function (currentPage: number, pageCount: number) {
        return {
          columns: [
            {
              text: `Processado pelo Software Systems Manager - Licença 92/DAF2/2023`,
              style: "footer",
              width: "50%",
            },
            {
              text: `Página ${currentPage} de ${pageCount}`,
              style: "footer",
              alignment: "right",
              width: "50%",
            },
          ],
          margin: [
            LAYOUT_CONFIG.page.margins.left,
            0,
            LAYOUT_CONFIG.page.margins.right,
            LAYOUT_CONFIG.spacing.sm,
          ],
        };
      },
      content: [
        // CABEÇALHO NO CORPO DO DOCUMENTO
        cabecalhoCorpo,

        // Tabela de Itens da Cotação
        {
          text: "ITENS DA COTAÇÃO",
          style: "sectionTitle",
        },
        {
          table: {
            headerRows: 1,
            widths: ["auto", "*", "auto", "auto", "*", "auto"],
            body: corpoTabela,
          },
          layout: {
            hLineWidth: (i: number) =>
              i === 0 || i === corpoTabela.length
                ? 1
                : LAYOUT_CONFIG.table.borderWidth,
            vLineWidth: () => LAYOUT_CONFIG.table.borderWidth,
            hLineColor: () => LAYOUT_CONFIG.table.borderColor,
            vLineColor: () => LAYOUT_CONFIG.table.borderColor,
            paddingTop: () => LAYOUT_CONFIG.table.rowPadding,
            paddingBottom: () => LAYOUT_CONFIG.table.rowPadding,
            paddingLeft: () => LAYOUT_CONFIG.spacing.xs,
            paddingRight: () => LAYOUT_CONFIG.spacing.xs,
          },
          margin: [0, LAYOUT_CONFIG.spacing.xs, 0, LAYOUT_CONFIG.spacing.lg],
        },

        // Resumo Financeiro
        {
          columns: [
            // Informações da Cotação
            {
              width: "60%",
              stack: [
                {
                  text: "INFORMAÇÕES",
                  style: "summaryTitle",
                },
                {
                  table: {
                    widths: ["*"],
                    body: [
                      [
                        {
                          text: `Validade: ${dataValidade}`,
                          style: "summaryLabel",
                        },
                      ],
                      [
                        {
                          text: `Status: ${statusTexto}`,
                          style: "summaryLabel",
                          color: getStatusCotacaoColor(cotacao.status),
                        },
                      ],
                      [
                        {
                          text: `Referência: ${cotacao.referencia || "Nenhuma"}`,
                          style: "summaryLabel",
                        },
                      ],
                    ],
                  },
                  layout: "noBorders",
                  margin: [0, LAYOUT_CONFIG.spacing.xs, 0, 0],
                },
              ],
            },
            // Resumo Financeiro
            {
              width: "40%",
              stack: [
                {
                  text: "RESUMO FINANCEIRO",
                  style: "summaryTitle",
                },
                {
                  table: {
                    widths: ["*", "auto"],
                    body: [
                      [
                        { text: "Subtotal:", style: "summaryLabel" },
                        {
                          text: formatarMoeda(valores.subtotal),
                          style: "summaryValue",
                          alignment: "right",
                        },
                      ],
                      ...(valores.valorIVA > 0
                        ? [
                            [
                              {
                                text: `IVA (16%):`,
                                style: "summaryLabel",
                              },
                              {
                                text: formatarMoeda(valores.valorIVA),
                                style: "summaryValue",
                                alignment: "right",
                              },
                            ],
                          ]
                        : []),
                      [
                        { text: "TOTAL:", style: "summaryTotalLabel" },
                        {
                          text: formatarMoeda(valores.totalComIVA),
                          style: "summaryTotalValue",
                          alignment: "right",
                          bold: true,
                        },
                      ],
                    ],
                  },
                  layout: "noBorders",
                  margin: [0, LAYOUT_CONFIG.spacing.xs, 0, 0],
                },
              ],
            },
          ],
          margin: [0, 0, 0, LAYOUT_CONFIG.spacing.lg],
        },

        // Observações (se houver)
        ...(cotacao.observacoes
          ? [
              {
                text: "OBSERVAÇÕES",
                style: "sectionTitle",
              },
              {
                text: cotacao.observacoes,
                style: "notesText",
                margin: [
                  0,
                  LAYOUT_CONFIG.spacing.xs,
                  0,
                  LAYOUT_CONFIG.spacing.lg,
                ],
              },
            ]
          : []),

        // Termos e Condições
        {
          text: "TERMOS E CONDIÇÕES",
          style: "sectionTitle",
        },
        {
          stack: [
            {
              text: "1. Esta cotação tem validade até a data indicada acima.",
              style: "notesText",
              margin: [0, 0, 0, 2],
            },
            {
              text: "2. Os preços estão sujeitos a alteração sem aviso prévio após a data de validade.",
              style: "notesText",
              margin: [0, 0, 0, 2],
            },
            {
              text: "3. O pagamento deve ser efetuado conforme acordado na fatura subsequente.",
              style: "notesText",
              margin: [0, 0, 0, 2],
            },
            {
              text: "4. Para aceitar esta cotação, entre em contacto conosco através dos nossos contactos ou através do seu dashbord onde gerou a carga.",
              style: "notesText",
              margin: [0, 0, 0, 2],
            },
          ],
          margin: [0, LAYOUT_CONFIG.spacing.xs, 0, LAYOUT_CONFIG.spacing.lg],
        },

        // Dados Bancários (importante para cotações também)
        ...(empresa.dadosBancarios
          ? [
              {
                canvas: [
                  {
                    type: "line",
                    x1: 0,
                    y1: 0,
                    x2:
                      LAYOUT_CONFIG.page.width -
                      LAYOUT_CONFIG.page.margins.left -
                      LAYOUT_CONFIG.page.margins.right,
                    y2: 0,
                    lineWidth: 1,
                    lineColor: LAYOUT_CONFIG.colors.gray,
                  },
                ],
                margin: [
                  0,
                  LAYOUT_CONFIG.spacing.md,
                  0,
                  LAYOUT_CONFIG.spacing.sm,
                ],
              },
              {
                text: "DADOS BANCÁRIOS",
                style: "sectionTitle",
                margin: [0, 0, 0, LAYOUT_CONFIG.spacing.xs],
              },
              {
                table: {
                  widths: ["*"],
                  body: [
                    [
                      {
                        text: `Banco: ${empresa.dadosBancarios.banco}`,
                        style: "bankInfo",
                      },
                    ],
                    [
                      {
                        text: `NIB: ${empresa.dadosBancarios.nib}`,
                        style: "bankInfo",
                      },
                    ],
                    [
                      {
                        text: `IBAN: ${empresa.dadosBancarios.iban}`,
                        style: "bankInfo",
                      },
                    ],
                  ],
                },
                layout: {
                  hLineWidth: () => 0,
                  vLineWidth: () => 0,
                  paddingTop: () => 1,
                  paddingBottom: () => 1,
                },
                margin: [0, 0, 0, LAYOUT_CONFIG.spacing.sm],
              },
              {
                text: "Para efetuar pagamentos após aceitação da cotação, utilize os dados bancários acima.",
                style: "bankNote",
                margin: [0, 0, 0, LAYOUT_CONFIG.spacing.sm],
              },
            ]
          : []),
      ],
      styles: styles,
    };

    // Gerar PDF
    pdfMake
      .createPdf(docDefinition)
      .download(`Cotação-${cotacao.numeroCotacao.replace(/\//g, "-")}.pdf`);
  } catch (error) {
    console.error("Erro ao gerar PDF da cotação:", error);
    throw new Error("Não foi possível gerar o PDF da cotação");
  }
}

// ============================================================================
// GERADOR DE RECIBO
// ============================================================================

/**
 * Gera PDF de recibo
 */
export async function gerarPDFRecibo(dados: DadosReciboPDF): Promise<void> {
  const { fatura, recebimento, empresa } = dados;

  try {
    const pdfMake = await configurarPdfMake();
    const imagemEmpresa = await carregarImagemEmpresa(empresa.nomeEmpresaLocal);
    const styles = getPdfStyles();

    // Dados formatados
    const dataRecebimento = formatarDataHora(recebimento.data);
    const numeroRecibo = `RCB-${Date.now().toString().slice(-8)}`;

    // Criar cabeçalho para o corpo
    const cabecalhoCorpo = criarCabecalhoReciboParaCorpo(
      empresa,
      fatura,
      recebimento,
      imagemEmpresa,
      dataRecebimento,
      numeroRecibo
    );

    const docDefinition: PdfMakeContent = {
      pageSize: "A4",
      pageMargins: [
        LAYOUT_CONFIG.page.margins.left,
        LAYOUT_CONFIG.page.margins.top,
        LAYOUT_CONFIG.page.margins.right,
        LAYOUT_CONFIG.page.margins.bottom,
      ],
      footer: function (currentPage: number, pageCount: number) {
        return {
          columns: [
            {
              text: `Processado pelo Software Systems Manager - Licença 92/DAF2/2023`,
              style: "footer",
              width: "50%",
            },
            {
              text: `Página ${currentPage} de ${pageCount}`,
              style: "footer",
              alignment: "right",
              width: "50%",
            },
          ],
          margin: [
            LAYOUT_CONFIG.page.margins.left,
            0,
            LAYOUT_CONFIG.page.margins.right,
            LAYOUT_CONFIG.spacing.sm,
          ],
        };
      },
      content: [
        // CABEÇALHO NO CORPO DO DOCUMENTO
        cabecalhoCorpo,

        // Detalhes do Pagamento
        {
          text: "DETALHES DO PAGAMENTO",
          style: "sectionTitle",
        },
        {
          table: {
            widths: ["*", "auto"],
            body: [
              [
                { text: "Valor Recebido:", style: "tableHeader" },
                {
                  text: formatarMoeda(recebimento.valor),
                  style: "tableHeader",
                  alignment: "right",
                },
              ],
              [
                { text: "Forma de Pagamento:", style: "tableBody" },
                {
                  text: recebimento.formaPagamento || "",
                  style: "tableBody",
                  alignment: "right",
                },
              ],
              ...(recebimento.comprovante
                ? [
                    [
                      { text: "Comprovante:", style: "tableBody" },
                      {
                        text: recebimento.comprovante,
                        style: "tableBody",
                        alignment: "right",
                      },
                    ],
                  ]
                : []),
              ...(recebimento.observacoes
                ? [
                    [
                      { text: "Observações:", style: "tableBody" },
                      {
                        text: recebimento.observacoes,
                        style: "tableBody",
                        alignment: "right",
                      },
                    ],
                  ]
                : []),
            ],
          },
          layout: {
            hLineWidth: () => LAYOUT_CONFIG.table.borderWidth,
            vLineWidth: () => 0,
            hLineColor: () => LAYOUT_CONFIG.table.borderColor,
            paddingTop: () => LAYOUT_CONFIG.table.rowPadding,
            paddingBottom: () => LAYOUT_CONFIG.table.rowPadding,
            paddingLeft: () => LAYOUT_CONFIG.spacing.xs,
            paddingRight: () => LAYOUT_CONFIG.spacing.xs,
          },
          margin: [0, LAYOUT_CONFIG.spacing.xs, 0, LAYOUT_CONFIG.spacing.lg],
        },

        // Valor por Extenso
        {
          text: `Valor por Extenso: ${valorPorExtenso(recebimento.valor)}`,
          style: "valorExtenso",
          alignment: "center",
          margin: [0, 0, 0, LAYOUT_CONFIG.spacing.lg],
        },

        // Assinaturas
        {
          columns: [
            {
              width: "50%",
              stack: [
                {
                  text: "________________________",
                  style: "assinatura",
                  alignment: "center",
                },
                {
                  text: "Cliente",
                  style: "assinaturaLabel",
                  alignment: "center",
                  margin: [0, LAYOUT_CONFIG.spacing.xs, 0, 0],
                },
              ],
              alignment: "center",
            },
            {
              width: "50%",
              stack: [
                {
                  text: "________________________",
                  style: "assinatura",
                  alignment: "center",
                },
                {
                  text: "Responsável",
                  style: "assinaturaLabel",
                  alignment: "center",
                  margin: [0, LAYOUT_CONFIG.spacing.xs, 0, 0],
                },
              ],
              alignment: "center",
            },
          ],
          margin: [0, LAYOUT_CONFIG.spacing.xl, 0, LAYOUT_CONFIG.spacing.md],
        },

        // Rodapé do conteúdo
        {
          text: [
            {
              text: "Este recibo foi emitido eletronicamente pelo Software Systems Manager\n",
              style: "footer",
            },
            {
              text: "Licença 92/DAF2/2023 - Documento válido sem assinatura manuscrita",
              style: "footer",
            },
          ],
          alignment: "center",
          margin: [0, LAYOUT_CONFIG.spacing.xl, 0, 0],
        },
      ],
      styles: styles,
    };

    pdfMake
      .createPdf(docDefinition)
      .download(
        `Recibo-${fatura.numeroFatura.replace(/\//g, "-")}-${numeroRecibo}.pdf`
      );
  } catch (error) {
    console.error("Erro ao gerar recibo:", error);
    throw new Error("Não foi possível gerar o recibo");
  }
}
// ============================================================================
// GERADOR DE DESPACHO ADUANEIRO
// ============================================================================

/**
 * Gera PDF do despacho aduaneiro
 */
export async function gerarPDFDespachoAduaneiro(dados: DadosDespachoPDF): Promise<void> {
  const { despacho, empresa } = dados;

  try {
    const pdfMake = await configurarPdfMake();
    const imagemEmpresa = await carregarImagemEmpresa(empresa.nomeEmpresaLocal);
    const styles = getPdfStyles();

    // Calcular availableWidth uma vez para reutilizar
    const availableWidth =
      LAYOUT_CONFIG.page.width -
      LAYOUT_CONFIG.page.margins.left -
      LAYOUT_CONFIG.page.margins.right;

    // Dados formatados
    const dataCriacao = formatarData(despacho.datas.dataCriacao);
    const dataPrazoLimite = despacho.datas.dataPrazoLimite 
      ? formatarData(despacho.datas.dataPrazoLimite)
      : "Não definido";
    const dataSubmissao = despacho.datas.dataSubmissao 
      ? formatarData(despacho.datas.dataSubmissao)
      : "Não submetido";
    const dataRegistro = despacho.datas.dataRegistroAlfandega 
      ? formatarData(despacho.datas.dataRegistroAlfandega)
      : "Não registrado";
    const dataPrevistaLiberacao = despacho.datas.dataPrevistaLiberacao 
      ? formatarData(despacho.datas.dataPrevistaLiberacao)
      : "Não definida";

    const statusTexto = obterStatusDespachoTexto(despacho.status);
    const tipoProcessoTexto = obterTipoProcessoTexto(despacho.tipoProcesso);

    // Criar cabeçalho para o corpo (passando availableWidth como parâmetro)
    const cabecalhoCorpo = {
      stack: [
        // Linha principal: Logo + informações + despacho
        {
          columns: [
            // Coluna da logo e informações da empresa
            {
              width: "65%",
              columns: [
                // Logo
                {
                  width: "20%",
                  stack: [
                    {
                      image: imagemEmpresa,
                      width: 60,
                      height: 60,
                      alignment: "left",
                      margin: [0, 0, 0, 5],
                    },
                  ],
                },

                // Informações da empresa ao lado do logo
                {
                  width: "80%",
                  stack: [
                    // Nome da empresa (ao lado do logo)
                    {
                      text: empresa.nomeEmpresaLocal,
                      style: "companyName",
                      margin: [10, 5, 0, 8],
                    },

                    // Informações da empresa em VERTICAL
                    {
                      stack: [
                        // Endereço
                        {
                          columns: [
                            {
                              text: "Endereço:",
                              style: "companyLabel",
                              width: "auto",
                              margin: [10, 0, 3, 0],
                            },
                            {
                              text: empresa.enderecoLocal,
                              style: "companyValue",
                              margin: [0, 0, 0, 0],
                            },
                          ],
                          margin: [0, 0, 0, 1],
                        },

                        // NUIT
                        {
                          columns: [
                            {
                              text: "NUIT:",
                              style: "companyLabel",
                              width: "auto",
                              margin: [10, 0, 3, 0],
                            },
                            {
                              text: empresa.nuitLocal,
                              style: "companyValue",
                              margin: [0, 0, 0, 0],
                            },
                          ],
                          margin: [0, 0, 0, 1],
                        },

                        // Email
                        {
                          columns: [
                            {
                              text: "Email:",
                              style: "companyLabel",
                              width: "auto",
                              margin: [10, 0, 3, 0],
                            },
                            {
                              text: empresa.emailLocal,
                              style: "companyValue",
                              margin: [0, 0, 0, 0],
                            },
                          ],
                          margin: [0, 0, 0, 1],
                        },

                        // Contactos
                        {
                          columns: [
                            {
                              text: "Contactos:",
                              style: "companyLabel",
                              width: "auto",
                              margin: [10, 0, 3, 0],
                            },
                            {
                              text: empresa.contactosLocal,
                              style: "companyValue",
                              margin: [0, 0, 0, 0],
                            },
                          ],
                          margin: [0, 0, 0, 0],
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            // Coluna do documento (despacho)
            {
              width: "35%",
              stack: [
                // DESPACHO ADUANEIRO em destaque
                                {
                  text: tituloPorTipo[tipoProcessoTexto] ?? "DESPACHO ADUANEIRO",
                  style: "documentTitleMain",
                  alignment: "right",
                  margin: [0, 2, 0, 0],
                },
                // ORIGINAL por baixo do título
                {
                  text: "ORIGINAL",
                  style: {
                    fontSize: 12,
                    bold: true,
                    color: LAYOUT_CONFIG.colors.success,
                    alignment: "right",
                    margin: [0, 0, 0, 3],
                  },
                },
                // Informações totalmente alinhadas à direita
                {
                  stack: [
                    {
                      text: `Nº: ${despacho.numeroProcesso}`,
                      style: "documentValue",
                      alignment: "right",
                      margin: [0, 0, 0, 1],
                    },
                    {
                      text: `Tipo: ${tipoProcessoTexto}`,
                      style: "documentValue",
                      alignment: "right",
                      margin: [0, 0, 0, 1],
                    },
                    {
                      text: `Data: ${dataCriacao}`,
                      style: "documentValue",
                      alignment: "right",
                      margin: [0, 0, 0, 1],
                    },
                    {
                      text: `Status: ${statusTexto}`,
                      style: "statusText",
                      color: getStatusDespachoColor(despacho.status),
                      alignment: "right",
                      margin: [0, 0, 0, 0],
                    },
                  ],
                  margin: [0, 0, 0, 0],
                },
              ],
            },
          ],
          margin: [0, 0, 0, 10],
        },

        // Linha divisória
        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 0,
              x2: availableWidth,
              y2: 0,
              lineWidth: 1,
              lineColor: LAYOUT_CONFIG.colors.gray,
            },
          ],
          margin: [0, 0, 0, 10],
        },

        // Informações do processo
        {
          columns: [
            {
              width: "60%",
              stack: [
                {
                  text: "INFORMAÇÕES DO CLIENTE",
                  style: "sectionTitleSmall",
                  margin: [0, 0, 0, 5],
                },
                {
                  stack: [
                    {
                      text: `Nome: ${despacho.cliente.nomeCliente}`,
                      style: "infoTextSmall",
                    },
                    {
                      text: `NUIT: ${despacho.cliente.nuit}`,
                      style: "infoTextSmall",
                    },
                    {
                      text: `Tipo: ${obterTipoClienteTexto(despacho.cliente.tipoCliente)}`,
                      style: "infoTextSmall",
                    },
                    ...(despacho.cliente.contato?.email ? [
                      {
                        text: `Email: ${despacho.cliente.contato.email}`,
                        style: "infoTextSmall",
                      },
                    ] : []),
                    ...(despacho.cliente.contato?.telefone ? [
                      {
                        text: `Telefone: ${despacho.cliente.contato.telefone}`,
                        style: "infoTextSmall",
                      },
                    ] : []),
                  ],
                },
              ],
            },
            {
              width: "40%",
              stack: [
                {
                  text: "DETALHES DO PROCESSO",
                  style: "sectionTitleSmall",
                  margin: [0, 0, 0, 5],
                },
                {
                  stack: [
                    {
                      text: `Prioridade: ${despacho.prioridade || 'normal'}`,
                      style: "infoTextSmall",
                    },
                    {
                      text: `Classificação Risco: ${despacho.classificacaoRisco || 'médio'}`,
                      style: "infoTextSmall",
                    },
                    ...(dataPrazoLimite ? [
                      {
                        text: `Prazo Limite: ${dataPrazoLimite}`,
                        style: "infoTextSmall",
                      },
                    ] : []),
                    {
                      text: `Documentação: ${despacho.documentacao?.percentualCompleto || 0}% completa`,
                      style: "infoTextSmall",
                    },
                  ],
                },
              ],
            },
          ],
          margin: [0, 0, 0, 15],
        },
      ],
    };

    // Preparar tabela de documentos
    const documentosTabela = prepararDocumentosTabela(despacho.documentacao?.documentos);
    const cabecalhoDocumentos = [
      [
        { text: "#", style: "tableHeader", alignment: "center" },
        { text: "Documento", style: "tableHeader" },
        { text: "Tipo", style: "tableHeader", alignment: "center" },
        { text: "Status", style: "tableHeader", alignment: "center" },
      ],
    ];

    const corpoDocumentos = documentosTabela.length > 0
      ? [...cabecalhoDocumentos, ...documentosTabela]
      : cabecalhoDocumentos;

    // Conteúdo principal em uma única página (usar arrays dinâmicos)
    const conteudoPrincipal = [];

    // Seção 1: Mercadoria
    conteudoPrincipal.push(
      {
        text: "INFORMAÇÕES DA MERCADORIA",
        style: "sectionTitle",
        margin: [0, 0, 0, 5],
      },
      {
        columns: [
          {
            width: "60%",
            stack: [
              {
                text: "Descrição:",
                style: "infoLabel",
                margin: [0, 0, 0, 2],
              },
              {
                text: despacho.mercadoria.descricao,
                style: "infoValue",
                margin: [0, 0, 0, 10],
              },
              {
                columns: [
                  {
                    width: "50%",
                    stack: [
                      {
                        text: "Quantidade:",
                        style: "infoLabel",
                        margin: [0, 0, 0, 2],
                      },
                      {
                        text: `${despacho.mercadoria.quantidade} ${despacho.mercadoria.unidadeMedida}`,
                        style: "infoValue",
                        margin: [0, 0, 0, 10],
                      },
                      {
                        text: "Código NCM:",
                        style: "infoLabel",
                        margin: [0, 0, 0, 2],
                      },
                      {
                        text: despacho.mercadoria.codigoNCM || "Não informado",
                        style: "infoValue",
                        margin: [0, 0, 0, 10],
                      },
                    ],
                  },
                  {
                    width: "50%",
                    stack: [
                      {
                        text: "Valor Mercadoria:",
                        style: "infoLabel",
                        margin: [0, 0, 0, 2],
                      },
                      {
                        text: formatarMoeda(despacho.mercadoria.valorMercadoria),
                        style: "infoValue",
                        margin: [0, 0, 0, 10],
                      },
                      {
                        text: "Origem:",
                        style: "infoLabel",
                        margin: [0, 0, 0, 2],
                      },
                      {
                        text: despacho.mercadoria.origemMercadoria || "Não informada",
                        style: "infoValue",
                        margin: [0, 0, 0, 10],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            width: "40%",
            stack: [
              {
                text: "Pesos:",
                style: "infoLabel",
                margin: [0, 0, 0, 2],
              },
              {
                table: {
                  widths: ["*", "auto"],
                  body: [
                    [
                      { text: "Peso Bruto:", style: "summaryLabel" },
                      {
                        text: `${despacho.mercadoria.pesoBruto || 0} kg`,
                        style: "summaryValue",
                        alignment: "right",
                      },
                    ],
                    [
                      { text: "Peso Líquido:", style: "summaryLabel" },
                      {
                        text: `${despacho.mercadoria.pesoLiquido || 0} kg`,
                        style: "summaryValue",
                        alignment: "right",
                      },
                    ],
                  ],
                },
                layout: "noBorders",
                margin: [0, LAYOUT_CONFIG.spacing.xs, 0, 20],
              },
              ...(despacho.mercadoria.certificadoOrigem?.numero ? [
                {
                  text: "Certificado de Origem:",
                  style: "infoLabel",
                  margin: [0, 0, 0, 2],
                },
                {
                  text: `${despacho.mercadoria.certificadoOrigem.tipo || 'Certificado'} Nº ${despacho.mercadoria.certificadoOrigem.numero}`,
                  style: "infoValue",
                  margin: [0, 0, 0, 10],
                },
              ] : []),
            ],
          },
        ],
        margin: [0, 0, 0, 15],
      }
    );

    // Seção 2: Transporte e Regime Aduaneiro
    conteudoPrincipal.push(
      {
        text: "TRANSPORTE E REGIME ADUANEIRO",
        style: "sectionTitle",
        margin: [0, 5, 0, 5],
      },
      {
        columns: [
          {
            width: "50%",
            stack: [
              {
                text: "TRANSPORTE",
                style: "sectionTitleSmall",
                margin: [0, 0, 0, 5],
              },
              {
                table: {
                  widths: ["*"],
                  body: [
                    ...(despacho.transporte?.meioTransporte ? [
                      [
                        {
                          text: `Meio: ${obterMeioTransporteTexto(despacho.transporte.meioTransporte)}`,
                          style: "infoTextSmall",
                        },
                      ],
                    ] : []),
                    ...(despacho.transporte?.portoOrigem ? [
                      [
                        {
                          text: `Origem: ${despacho.transporte.portoOrigem}`,
                          style: "infoTextSmall",
                        },
                      ],
                    ] : []),
                    ...(despacho.transporte?.portoDestino ? [
                      [
                        {
                          text: `Destino: ${despacho.transporte.portoDestino}`,
                          style: "infoTextSmall",
                        },
                      ],
                    ] : []),
                    ...(despacho.transporte?.numeroConhecimento ? [
                      [
                        {
                          text: `Conhecimento: ${despacho.transporte.numeroConhecimento}`,
                          style: "infoTextSmall",
                        },
                      ],
                    ] : []),
                    ...(despacho.transporte?.navioVoo ? [
                      [
                        {
                          text: `Navio/Voo: ${despacho.transporte.navioVoo}`,
                          style: "infoTextSmall",
                        },
                      ],
                    ] : []),
                    ...(despacho.transporte?.companhiaTransporte ? [
                      [
                        {
                          text: `Companhia: ${despacho.transporte.companhiaTransporte}`,
                          style: "infoTextSmall",
                        },
                      ],
                    ] : []),
                  ],
                },
                layout: "noBorders",
                margin: [0, 0, 0, 0],
              },
            ],
          },
          {
            width: "50%",
            stack: [
              {
                text: "REGIME ADUANEIRO",
                style: "sectionTitleSmall",
                margin: [0, 0, 0, 5],
              },
              {
                table: {
                  widths: ["*"],
                  body: [
                    ...(despacho.regimeAduaneiro?.tipoRegime ? [
                      [
                        {
                          text: `Tipo: ${obterTipoRegimeTexto(despacho.regimeAduaneiro.tipoRegime)}`,
                          style: "infoTextSmall",
                        },
                      ],
                    ] : []),
                    ...(despacho.regimeAduaneiro?.destinoAduaneiro ? [
                      [
                        {
                          text: `Destino: ${obterDestinoAduaneiroTexto(despacho.regimeAduaneiro.destinoAduaneiro)}`,
                          style: "infoTextSmall",
                        },
                      ],
                    ] : []),
                    ...(despacho.regimeAduaneiro?.numeroLicencaImportacao ? [
                      [
                        {
                          text: `Licença: ${despacho.regimeAduaneiro.numeroLicencaImportacao}`,
                          style: "infoTextSmall",
                        },
                      ],
                    ] : []),
                    ...(despacho.fornecedor?.nome ? [
                      [
                        {
                          text: `Fornecedor: ${despacho.fornecedor.nome}`,
                          style: "infoTextSmall",
                        },
                      ],
                    ] : []),
                    ...(despacho.fornecedor?.incoterm ? [
                      [
                        {
                          text: `INCOTERM: ${despacho.fornecedor.incoterm}`,
                          style: "infoTextSmall",
                        },
                      ],
                    ] : []),
                  ],
                },
                layout: "noBorders",
                margin: [0, 0, 0, 0],
              },
            ],
          },
        ],
        margin: [0, 0, 0, 15],
      }
    );

    // Seção 3: Tributação (se existir)
    if (despacho.tributacao) {
      conteudoPrincipal.push(
        {
          text: "TRIBUTAÇÃO",
          style: "sectionTitle",
          margin: [0, 5, 0, 5],
        },
        {
          columns: [
            {
              width: "40%",
              stack: [
                {
                  table: {
                    widths: ["*", "auto"],
                    body: [
                      [
                        { text: "Valor Aduaneiro:", style: "summaryLabel" },
                        {
                          text: formatarMoeda(despacho.tributacao.valorAduaneiro),
                          style: "summaryValue",
                          alignment: "right",
                        },
                      ],
                      ...(despacho.tributacao.impostos.direitosAduaneiros?.percentual ? [
                        [
                          { 
                            text: `Direitos Aduaneiros (${despacho.tributacao.impostos.direitosAduaneiros.percentual}%):`, 
                            style: "summaryLabel" 
                          },
                          {
                            text: formatarMoeda(despacho.tributacao.impostos.direitosAduaneiros.valor || 0),
                            style: "summaryValue",
                            alignment: "right",
                          },
                        ],
                      ] : []),
                      ...(despacho.tributacao.impostos.iva?.percentual ? [
                        [
                          { 
                            text: `IVA (${despacho.tributacao.impostos.iva.percentual}%):`, 
                            style: "summaryLabel" 
                          },
                          {
                            text: formatarMoeda(despacho.tributacao.impostos.iva.valor || 0),
                            style: "summaryValue",
                            alignment: "right",
                          },
                        ],
                      ] : []),
                      ...(despacho.tributacao.impostos.totalImpostos ? [
                        [
                          { text: "Total Impostos:", style: "summaryTotalLabel" },
                          {
                            text: formatarMoeda(despacho.tributacao.impostos.totalImpostos),
                            style: "summaryTotalValue",
                            alignment: "right",
                            bold: true,
                          },
                        ],
                      ] : []),
                      ...(despacho.tributacao.impostos.totalLiquido ? [
                        [
                          { text: "Total Líquido:", style: "summaryTotalLabel" },
                          {
                            text: formatarMoeda(despacho.tributacao.impostos.totalLiquido),
                            style: "summaryTotalValue",
                            alignment: "right",
                            bold: true,
                          },
                        ],
                      ] : []),
                    ],
                  },
                  layout: "noBorders",
                  margin: [0, LAYOUT_CONFIG.spacing.xs, 0, 0],
                },
              ],
            },
            {
              width: "60%",
              stack: [
                {
                  text: "Informações Adicionais:",
                  style: "infoLabel",
                  margin: [80, 0, 0, 5],
                },
                {
                  table: {
                    widths: ["*"],
                    body: [
                      [
                        {
                          text: `Moeda: ${despacho.tributacao.moedaAduaneira}`,
                          style: "infoTextSmall",
                        },
                      ],
                      ...(despacho.tributacao.taxaCambio ? [
                        [
                          {
                            text: `Taxa Câmbio: ${despacho.tributacao.taxaCambio}`,
                            style: "infoTextSmall",
                          },
                        ],
                      ] : []),
                      ...(despacho.garantias?.valorGarantia ? [
                        [
                          {
                            text: `Garantia: ${formatarMoeda(despacho.garantias.valorGarantia)} (${despacho.garantias.tipoGarantia || 'Não especificada'})`,
                            style: "infoTextSmall",
                          },
                        ],
                      ] : []),
                    ],
                  },
                  layout: "noBorders",
                  margin: [80, 0, 0, 0],
                },
              ],
            },
          ],
          margin: [0, 0, 0, 15],
        }
      );
    }

    // Seção 4: Documentação
    conteudoPrincipal.push(
      {
        text: "DOCUMENTAÇÃO",
        style: "sectionTitle",
        margin: [0, 5, 0, 5],
      },
      {
        table: {
          headerRows: 1,
          widths: ["auto", "*", "auto", "auto"],
          body: corpoDocumentos,
        },
        layout: {
          hLineWidth: (i: number) =>
            i === 0 || i === corpoDocumentos.length
              ? 1
              : LAYOUT_CONFIG.table.borderWidth,
          vLineWidth: () => LAYOUT_CONFIG.table.borderWidth,
          hLineColor: () => LAYOUT_CONFIG.table.borderColor,
          vLineColor: () => LAYOUT_CONFIG.table.borderColor,
          paddingTop: () => LAYOUT_CONFIG.table.rowPadding,
          paddingBottom: () => LAYOUT_CONFIG.table.rowPadding,
          paddingLeft: () => LAYOUT_CONFIG.spacing.xs,
          paddingRight: () => LAYOUT_CONFIG.spacing.xs,
        },
        margin: [0, 0, 0, 15],
      }
    );

    // Status da Documentação e Pagamento
    conteudoPrincipal.push(
      {
        columns: [
          {
            width: "50%",
            stack: [
              {
                text: "STATUS DA DOCUMENTAÇÃO",
                style: "sectionTitleSmall",
                margin: [0, 0, 0, 5],
              },
              {
                table: {
                  widths: ["*"],
                  body: [
                    [
                      {
                        text: `Completude: ${despacho.documentacao?.percentualCompleto || 0}%`,
                        style: "infoTextSmall",
                      },
                    ],
                    [
                      {
                        text: `Status: ${despacho.documentacao?.documentacaoCompleta ? 'Completa' : 'Incompleta'}`,
                        style: "infoTextSmall",
                        color: despacho.documentacao?.documentacaoCompleta 
                          ? LAYOUT_CONFIG.colors.success 
                          : LAYOUT_CONFIG.colors.warning,
                      },
                    ],
                  ],
                },
                layout: "noBorders",
                margin: [0, 0, 0, 0],
              },
            ],
          },
          {
            width: "50%",
            stack: [
              {
                text: "PAGAMENTO",
                style: "sectionTitleSmall",
                margin: [0, 0, 0, 5],
              },
              {
                table: {
                  widths: ["*"],
                  body: [
                    ...(despacho.pagamento ? [
                      [
                        {
                          text: `Valor Total: ${formatarMoeda(despacho.pagamento.valorTotal)}`,
                          style: "infoTextSmall",
                        },
                      ],
                      [
                        {
                          text: `Valor Pago: ${formatarMoeda(despacho.pagamento.valorPago)}`,
                          style: "infoTextSmall",
                        },
                      ],
                      [
                        {
                          text: `Status: ${despacho.pagamento.statusPagamento}`,
                          style: "infoTextSmall",
                          color: despacho.pagamento.statusPagamento === 'pago' 
                            ? LAYOUT_CONFIG.colors.success 
                            : LAYOUT_CONFIG.colors.warning,
                        },
                      ],
                    ] : []),
                  ],
                },
                layout: "noBorders",
                margin: [0, 0, 0, 0],
              },
            ],
          },
        ],
        margin: [0, 150, 0, 15],
      }
    );

    // Seção 5: Alfândega e Rastreio
    conteudoPrincipal.push(
      {
        text: "ALFÂNDEGA E RASTREIO",
        style: "sectionTitle",
        margin: [0, 5, 0, 5],
      },
      {
        columns: [
          {
            width: "50%",
            stack: [
              {
                text: "ALFÂNDEGA",
                style: "sectionTitleSmall",
                margin: [0, 0, 0, 5],
              },
              {
                table: {
                  widths: ["*"],
                  body: [
                    ...(despacho.alfandega?.portoAlfandegado ? [
                      [
                        {
                          text: `Porto: ${despacho.alfandega.portoAlfandegado}`,
                          style: "infoTextSmall",
                        },
                      ],
                    ] : []),
                    ...(despacho.alfandega?.fiscalResponsavel ? [
                      [
                        {
                          text: `Fiscal: ${despacho.alfandega.fiscalResponsavel}`,
                          style: "infoTextSmall",
                        },
                      ],
                    ] : []),
                    ...(despacho.alfandega?.tipoInspecao ? [
                      [
                        {
                          text: `Inspeção: ${despacho.alfandega.tipoInspecao}`,
                          style: "infoTextSmall",
                        },
                      ],
                    ] : []),
                    ...(despacho.alfandega?.canalVerde !== undefined ? [
                      [
                        {
                          text: `Canal: ${despacho.alfandega.canalVerde ? 'Verde' : 'Não Verificado'}`,
                          style: "infoTextSmall",
                          color: despacho.alfandega.canalVerde 
                            ? LAYOUT_CONFIG.colors.success 
                            : LAYOUT_CONFIG.colors.warning,
                        },
                      ],
                    ] : []),
                    ...(despacho.alfandega?.dataLiberacao ? [
                      [
                        {
                          text: `Liberação: ${formatarData(despacho.alfandega.dataLiberacao)}`,
                          style: "infoTextSmall",
                          color: LAYOUT_CONFIG.colors.success,
                        },
                      ],
                    ] : []),
                  ],
                },
                layout: "noBorders",
                margin: [0, 0, 0, 0],
              },
            ],
          },
          {
            width: "50%",
            stack: [
              {
                text: "RASTREIO",
                style: "sectionTitleSmall",
                margin: [0, 0, 0, 5],
              },
              {
                table: {
                  widths: ["*"],
                  body: [
                    ...(despacho.rastreio?.statusRastreio ? [
                      [
                        {
                          text: `Status: ${despacho.rastreio.statusRastreio}`,
                          style: "infoTextSmall",
                        },
                      ],
                    ] : []),
                    ...(despacho.rastreio?.localizacaoAtual ? [
                      [
                        {
                          text: `Localização: ${despacho.rastreio.localizacaoAtual}`,
                          style: "infoTextSmall",
                        },
                      ],
                    ] : []),
                    ...(despacho.rastreio?.estimativaEntrega ? [
                      [
                        {
                          text: `Estimativa Entrega: ${formatarData(despacho.rastreio.estimativaEntrega)}`,
                          style: "infoTextSmall",
                        },
                      ],
                    ] : []),
                    ...(dataSubmissao !== "Não submetido" ? [
                      [
                        {
                          text: `Submissão: ${dataSubmissao}`,
                          style: "infoTextSmall",
                        },
                      ],
                    ] : []),
                    ...(dataRegistro !== "Não registrado" ? [
                      [
                        {
                          text: `Registro Alfândega: ${dataRegistro}`,
                          style: "infoTextSmall",
                        },
                      ],
                    ] : []),
                  ],
                },
                layout: "noBorders",
                margin: [0, 0, 0, 0],
              },
            ],
          },
        ],
        margin: [0, 0, 0, 15],
      }
    );

    // Seção 6: Cronograma e Observações
    conteudoPrincipal.push(
      {
        columns: [
          {
            width: "50%",
            stack: [
              {
                text: "CRONOGRAMA",
                style: "sectionTitleSmall",
                margin: [0, 0, 0, 5],
              },
              {
                table: {
                  widths: ["*"],
                  body: [
                    [
                      {
                        text: `Criação: ${dataCriacao}`,
                        style: "infoTextSmall",
                      },
                    ],
                    ...(dataSubmissao !== "Não submetido" ? [
                      [
                        {
                          text: `Submissão: ${dataSubmissao}`,
                          style: "infoTextSmall",
                        },
                      ],
                    ] : []),
                    ...(dataRegistro !== "Não registrado" ? [
                      [
                        {
                          text: `Registro: ${dataRegistro}`,
                          style: "infoTextSmall",
                        },
                      ],
                    ] : []),
                    ...(dataPrevistaLiberacao !== "Não definida" ? [
                      [
                        {
                          text: `Liberação Prevista: ${dataPrevistaLiberacao}`,
                          style: "infoTextSmall",
                        },
                      ],
                    ] : []),
                    ...(dataPrazoLimite !== "Não definido" ? [
                      [
                        {
                          text: `Prazo Limite: ${dataPrazoLimite}`,
                          style: "infoTextSmall",
                        },
                      ],
                    ] : []),
                  ],
                },
                layout: "noBorders",
                margin: [0, 0, 0, 0],
              },
            ],
          },
          {
            width: "50%",
            stack: [
              {
                text: "OBSERVAÇÕES",
                style: "sectionTitleSmall",
                margin: [0, 0, 0, 5],
              },
              ...(despacho.observacoes ? [
                {
                  text: despacho.observacoes,
                  style: "notesText",
                  margin: [0, 0, 0, 10],
                },
              ] : [
                {
                  text: "Nenhuma observação registrada.",
                  style: "notesText",
                  margin: [0, 0, 0, 10],
                  color: LAYOUT_CONFIG.colors.muted,
                },
              ]),
            ],
          },
        ],
        margin: [0, 0, 0, 15],
      }
    );

    // Rodapé Informativo
    conteudoPrincipal.push(
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 0,
            x2: availableWidth,
            y2: 0,
            lineWidth: 1,
            lineColor: LAYOUT_CONFIG.colors.gray,
          },
        ],
        margin: [0, LAYOUT_CONFIG.spacing.md, 0, LAYOUT_CONFIG.spacing.sm],
      },
      {
        text: "INFORMAÇÕES IMPORTANTES",
        style: "sectionTitle",
        margin: [0, 0, 0, LAYOUT_CONFIG.spacing.xs],
      },
      {
        stack: [
          {
            text: "• Este documento é gerado automaticamente pelo sistema Mega Centro e Logística",
            style: "bankNote",
            margin: [0, 0, 0, 2],
          },
          {
            text: "• Todas as informações estão sujeitas a verificação pela autoridade aduaneira competente",
            style: "bankNote",
            margin: [0, 0, 0, 2],
          },
          {
            text: "• Para informações atualizadas, consulte o sistema ou entre em contacto com nossa equipe",
            style: "bankNote",
            margin: [0, 0, 0, 2],
          },
          {
            text: `• Contactos: ${empresa.contactosLocal} | Email: ${empresa.emailLocal}`,
            style: "bankNote",
            margin: [0, 0, 0, 2],
          },
        ],
        margin: [0, 0, 0, LAYOUT_CONFIG.spacing.sm],
      }
    );

    // Conteúdo do PDF - TUDO em uma única página se possível
    const docDefinition: PdfMakeContent = {
      pageSize: "A4",
      pageMargins: [
        LAYOUT_CONFIG.page.margins.left,
        LAYOUT_CONFIG.page.margins.top,
        LAYOUT_CONFIG.page.margins.right,
        LAYOUT_CONFIG.page.margins.bottom,
      ],
      footer: function (currentPage: number, pageCount: number) {
        return {
          columns: [
            {
              text: `Processado pelo Software Systems Manager - Licença 92/DAF2/2023`,
              style: "footer",
              width: "50%",
            },
            {
              text: `Página ${currentPage} de ${pageCount}`,
              style: "footer",
              alignment: "right",
              width: "50%",
            },
          ],
          margin: [
            LAYOUT_CONFIG.page.margins.left,
            0,
            LAYOUT_CONFIG.page.margins.right,
            LAYOUT_CONFIG.spacing.sm,
          ],
        };
      },
      content: [
        // CABEÇALHO
        cabecalhoCorpo,
        // TODO O CONTEÚDO PRINCIPAL
        ...conteudoPrincipal,
      ],
      styles: styles,
    };

    // Gerar PDF
    pdfMake
      .createPdf(docDefinition)
      .download(`Despacho-${despacho.numeroProcesso.replace(/\//g, "-")}.pdf`);
    
  } catch (error) {
    console.error("Erro ao gerar PDF do despacho aduaneiro:", error);
    throw new Error("Não foi possível gerar o PDF do despacho aduaneiro");
  }
}

/**
 * Gera PDF do despacho aduaneiro usando dados padrão da empresa
 */
export async function gerarPDFDespachoAduaneiroCompleto(
  despacho: DespachoAduaneiroDetalhado
): Promise<void> {
  await gerarPDFDespachoAduaneiro({
    despacho,
    empresa: EMPRESA_PADRAO,
  });
}
// ============================================================================
// FUNÇÕES DE CONVENIÊNCIA
// ============================================================================

/**
 * Gera PDF da fatura usando dados padrão da empresa
 */
export async function gerarPDFFaturaCompleta(
  fatura: FaturaDetalhada
): Promise<void> {
  await gerarPDFFatura({
    fatura,
    empresa: EMPRESA_PADRAO,
  });
}

/**
 * Gera PDF de recibo usando dados padrão da empresa
 */
export async function gerarReciboCompleto(
  fatura: FaturaDetalhada,
  recebimento: RecebimentoDetalhado
): Promise<void> {
  await gerarPDFRecibo({
    fatura,
    recebimento,
    empresa: EMPRESA_PADRAO,
  });
}

/**
 * Gera PDF de cotação usando dados padrão da empresa
 */
export async function gerarPDFCotacaoCompleta(
  cotacao: CotacaoDetalhada
): Promise<void> {
  await gerarPDFCotacao({
    cotacao,
    empresa: EMPRESA_PADRAO,
  });
}

// Exporta tipos adicionais
export type { CotacaoDetalhada, ItemCotacao, DadosCotacaoPDF, DespachoAduaneiroDetalhado, DadosDespachoPDF };