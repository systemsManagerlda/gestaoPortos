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
// FUNÇÕES UTILITÁRIAS
// ============================================================================

/**
 * Formata valores monetários no padrão MZN
 */
const formatarMoeda = (valor: number = 0): string => {
  return new Intl.NumberFormat("pt-MZ", {
    style: "currency",
    currency: "MZN",
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
                            margin: [10, 0, 3, 0], // Reduzi de 5 para 3
                          },
                          {
                            text: empresa.enderecoLocal,
                            style: "companyValue",
                            margin: [0, 0, 0, 0], // Reduzi de 2 para 0
                          },
                        ],
                        margin: [0, 0, 0, 1], // Reduzi de 2 para 1
                      },

                      // NUIT
                      {
                        columns: [
                          {
                            text: "NUIT:",
                            style: "companyLabel",
                            width: "auto",
                            margin: [10, 0, 3, 0], // Reduzi de 5 para 3
                          },
                          {
                            text: empresa.nuitLocal,
                            style: "companyValue",
                            margin: [0, 0, 0, 0], // Reduzi de 2 para 0
                          },
                        ],
                        margin: [0, 0, 0, 1], // Reduzi de 2 para 1
                      },

                      // Email
                      {
                        columns: [
                          {
                            text: "Email:",
                            style: "companyLabel",
                            width: "auto",
                            margin: [10, 0, 3, 0], // Reduzi de 5 para 3
                          },
                          {
                            text: empresa.emailLocal,
                            style: "companyValue",
                            margin: [0, 0, 0, 0], // Reduzi de 2 para 0
                          },
                        ],
                        margin: [0, 0, 0, 1], // Reduzi de 2 para 1
                      },

                      // Contactos
                      {
                        columns: [
                          {
                            text: "Contactos:",
                            style: "companyLabel",
                            width: "auto",
                            margin: [10, 0, 3, 0], // Reduzi de 5 para 3
                          },
                          {
                            text: empresa.contactosLocal,
                            style: "companyValue",
                            margin: [0, 0, 0, 0], // Reduzi de 2 para 0
                          },
                        ],
                        margin: [0, 0, 0, 0], // Mantive 0
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
                        margin: [10, 0, 3, 0], // Reduzi de 5 para 3
                      },
                      {
                        text: empresa.enderecoLocal,
                        style: "companyValue",
                        margin: [0, 0, 0, 0], // Reduzi de 2 para 0
                      },
                    ],
                    margin: [0, 0, 0, 1], // Reduzi de 2 para 1
                  },

                  // NUIT
                  {
                    columns: [
                      {
                        text: "NUIT:",
                        style: "companyLabel",
                        width: "auto",
                        margin: [10, 0, 3, 0], // Reduzi de 5 para 3
                      },
                      {
                        text: empresa.nuitLocal,
                        style: "companyValue",
                        margin: [0, 0, 0, 0], // Reduzi de 2 para 0
                      },
                    ],
                    margin: [0, 0, 0, 1], // Reduzi de 2 para 1
                  },

                  // Email
                  {
                    columns: [
                      {
                        text: "Email:",
                        style: "companyLabel",
                        width: "auto",
                        margin: [10, 0, 3, 0], // Reduzi de 5 para 3
                      },
                      {
                        text: empresa.emailLocal,
                        style: "companyValue",
                        margin: [0, 0, 0, 0], // Reduzi de 2 para 0
                      },
                    ],
                    margin: [0, 0, 0, 1], // Reduzi de 2 para 1
                  },

                  // Contactos
                  {
                    columns: [
                      {
                        text: "Contactos:",
                        style: "companyLabel",
                        width: "auto",
                        margin: [10, 0, 3, 0], // Reduzi de 5 para 3
                      },
                      {
                        text: empresa.contactosLocal,
                        style: "companyValue",
                        margin: [0, 0, 0, 0], // Reduzi de 2 para 0
                      },
                    ],
                    margin: [0, 0, 0, 0], // Mantive 0
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

// ============================================================================
// GERADOR DE FATURA
// ============================================================================

/**
 * Gera PDF da fatura
 */
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
              width: "40%",
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
              width: "60%",
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
                ], // Reduzi de lg para md e md para sm
              },
              {
                text: "DADOS BANCÁRIOS PARA PAGAMENTO",
                style: "sectionTitle",
                margin: [0, 0, 0, LAYOUT_CONFIG.spacing.xs], // Adicionei margem inferior
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
                  paddingTop: () => 1, // Reduzi de 2 para 1
                  paddingBottom: () => 1, // Reduzi de 2 para 1
                },
                margin: [0, 0, 0, LAYOUT_CONFIG.spacing.sm], // Reduzi de lg para sm
              },
              {
                text: "Por favor, utilize os dados acima para efetuar transferências bancárias.",
                style: "bankNote",
                margin: [0, 0, 0, LAYOUT_CONFIG.spacing.sm], // Reduzi de lg para sm
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
