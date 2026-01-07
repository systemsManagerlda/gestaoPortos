// services/cargaService.ts

const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

// Tipos principais
export type TipoCarga =
  | "Contentorizada"
  | "Solta"
  | "Granel"
  | "Frigorífica"
  | "Perigosa";
export type NaturezaCarga = "perigosa" | "não perigosa" | "sensível" | "fragil";
export type CategoriaSeguro =
  | "Produtos Alimentares"
  | "Eletrónicos"
  | "Materiais Perigosos"
  | "Carga Geral"
  | "Carga Consolidada";
export type AbrangenciaSeguro = "Nacional" | "Regional SADC" | "Internacional";
export type TipoPercurso = "Beira-Interland" | "Local" | "Nacional";
export type StatusCarga =
  | "planeada"
  | "aguardando_coleta"
  | "coletada"
  | "em_transito"
  | "em_fronteira"
  | "aguardando_desembaraco"
  | "em_entrega"
  | "entregue"
  | "encerrada"
  | "armazenada";
export type Prioridade = "baixa" | "média" | "alta" | "urgente";
export type StatusSeguro =
  | "pendente"
  | "ativo"
  | "vencido"
  | "cancelado"
  | "sinistrado";

// Interfaces base
export interface Coordenadas {
  lat: number;
  lng: number;
}

export interface Localizacao {
  pais: string;
  cidade: string;
  local: string;
  coordenadas?: Coordenadas;
}

export interface Dimensoes {
  largura?: number;
  altura?: number;
  comprimento?: number;
}

export interface Contentor {
  numero?: string;
  tipo?: string;
  tara?: number;
  capacidadeMaxima?: number;
  anoFabricacao?: number;
  estadoAtual?: "excelente" | "bom" | "regular" | "ruim" | "péssimo";
  lacreOrigem?: string;
  lacreDestino?: string;
}
export interface DocumentoFile {
  id: string;
  nome: string;
  tipo: string;
  tamanho: number;
  url: string;
  dataUpload: string;
  descricao?: string;
}

export interface UploadDocumentoRequest {
  file: File;
  nomeEmpresa: string;
  descricao?: string;
}

export interface UploadDocumentoResponse {
  success: boolean;
  url: string;
  filename: string;
  message?: string;
  descricao?: string;
}

export interface DeleteDocumentoRequest {
  filename: string;
  nomeEmpresa: string;
}
export interface GPS {
  codigo?: string;
  modelo?: string;
  bateriaPercentual?: number;
  ultimaComunicacao?: string;
  satelites?: number;
  imei?: string;
  trackingId?: string;
  vinculoMotoristaId?: number;
  vinculoViagemId?: number;
}

export interface SensorIOT {
  temperatura?: number;
  umidade?: number;
  aberturaPorta: boolean;
  movimentoBruscoDetectado: boolean;
  tombamentoDetectado: boolean;
  historicoEventos?: Array<{
    tipo: string;
    descricao: string;
    data: string;
  }>;
}

export interface Motorista {
  id?: number;
  nome?: string;
  empresaMotorista: string;
  empresaMotoristaId?: number;
  cartaConducaoNumero?: string;
  cartaConducaoCategoria?: string;
  validadeCartaConducao?: string;
  documentos?: Array<{
    tipo: string;
    numero: string;
    validade: string;
  }>;
  certificados?: string[];
  avaliacao?: number;
  telefone?: string;
  nacionalidade?: string;
}

export interface Veiculo {
  id: number;
  matricula: string;
  modelo: string;
  ano?: number;
  quilometragemInicial?: number;
  quilometragemFinal?: number;
  proximaRevisaoKM?: number;
  estadoVeiculoAntes?: "excelente" | "bom" | "regular" | "ruim" | "péssimo";
  estadoVeiculoDepois?: "excelente" | "bom" | "regular" | "ruim" | "péssimo";
  seguroVeiculo?: {
    tipo:
      | "Terceiros"
      | "Contra todos os riscos"
      | "Roubo + Furto"
      | "Danos Próprios"
      | "Responsabilidade Civil";
    valorVeiculo?: number;
    valorPremio?: number;
    apolice?: string;
    dataVencimento?: string;
  };
}

export interface Seguro {
  apolice?: string;
  seguradora?: string;
  valorSegurado: number;
  taxaPercentual?: number;
  taxaBaseMZN?: number;
  premioCalculado?: number;
  premioFinal?: number;
  dataInicio?: string;
  dataFim?: string;
  cobertura?: string[];
  statusSeguro: StatusSeguro;
  sinistros?: Array<{
    data: string;
    descricao: string;
    valorSinistro: number;
    status: "reportado" | "em_analise" | "indeminizado" | "recusado";
  }>;
}

export interface Ocorrencia {
  id: number;
  tipo: "avaria" | "atraso" | "extraviou" | "roubo" | "acidente" | "outro";
  descricao: string;
  severidade: "baixa" | "média" | "alta" | "crítica";
  dataRegistro: string;
  status: "pendente" | "em_resolucao" | "resolvido" | "cancelado";
  acaoTomada?: string;
  custo?: number;
  evidencias?: string[];
  afetaSeguro: boolean;
  sinistroRelacionado?: string;
}

export interface CustoExtra {
  tipo: string;
  descricao: string;
  valor: number;
  data: string;
}

// Interface principal da Carga
export interface Carga {
  // Identificação
  _id?: string; // Para MongoDB
  id?: string | number; // Para uso geral
  tempoRestante: string;
  transportadora?: string;
  requisitos?: string[]; 
  codigo: string;
  atrasada: string;
  nomeEmpresa: string;
  clienteId: string;
  cliente: string;
  tipoCarga: TipoCarga;
  subtipo?: string;
  descricao: string;
  naturezaCarga: NaturezaCarga;
  categoriaSeguro: CategoriaSeguro;
  abrangenciaSeguro: AbrangenciaSeguro;
  tipoPercurso: TipoPercurso;
  destinoFrete: string;

  // Especificações
  pesoBruto: number;
  pesoLiquido?: number;
  volume?: number;
  embalagem?: string;
  quantidadeVolumes?: number;
  dimensoes?: Dimensoes;
  umidadeAtual?: number;
  umidadePermitidaPercentual?: number;

  // Equipamentos
  contentor?: Contentor;
  gps?: GPS;
  sensoresIOT?: SensorIOT;

  // Partes envolvidas
  exportador?: string;
  importador?: string;
  consignatario?: string;
  contatoCliente?: string;
  instrucaoEspecial?: string;

  // Localização
  origem: Localizacao;
  destino: Localizacao;
  pontoAtual?: {
    descricao: string;
    lat: number;
    lng: number;
    data: string;
  };
  rotaPlanejada?: Coordenadas[];
  rotaRealizada?: Array<Coordenadas & { data: string }>;
  desvioRotaPercentual?: number;

  // Status
  status: StatusCarga;
  prioridade: Prioridade;
  fluxoStatus?: string[];
  checkpointHistorico?: Array<{
    status: string;
    data: string;
    local?: string;
    observacao?: string;
  }>;

  // Documentação
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
    documentosCarregados?: DocumentoFile[];
    dataAtualizacaoDocumentos?: string;
  };

  // Recursos
  motorista?: Motorista;
  veiculo?: Veiculo;
  

  // Datas
  dataCriacao: string;
  dataColeta?: string;
  dataEntregaPrevista: string;
  dataEntregaReal?: string;
  dataAtualizacao?: string;
  tempoArmazenagemHoras?: number;
  tempoTransitoHoras?: number;

  // Financeiro
  distanciaKm?: number;
  freteIda?: number;
  freteVolta?: number;
  percentualLogistica?: number;
  contentorVazio?: number;
  valorFrete: number;
  taxasPortuarias?: number;
  despesasOperacionais?: number;
  custoCarga?: number;
  valorMercadoria: number;
  comissaoCalculada?: number;
  moedaComissao?: "USD" | "MZN";
  custosExtras?: CustoExtra[];
  valorTotal: number;
  margemLucro?: number;

  // Seguro
  seguro?: Seguro;

  // Ocorrências
  ocorrencias?: Ocorrencia[];
  auditorias?: Array<{
    id: number;
    data: string;
    auditor: string;
    observacao: string;
    resultado: "aprovado" | "aprovado_com_ressalvas" | "reprovado";
  }>;

  checklist?: {
    coleta?: Array<{
      item: string;
      status: "pendente" | "ok" | "nok" | "nao_aplicavel";
      observacao?: string;
    }>;
    entrega?: Array<{
      item: string;
      status: "pendente" | "ok" | "nok" | "nao_aplicavel";
      observacao?: string;
    }>;
  };

  // Relacionamentos
  viagemId?: number;

  // Metadados
  observacoes?: string;
  criadoPor?: string;
  atualizadoPor?: string;
}

// Interfaces para requests e responses
export interface FiltrosCarga {
  searchTerm?: string;
  statusFilter?: string;
  tipoFilter?: string;
  naturezaFilter?: string;
  prioridade?: string;
  valorMin?: string;
  valorMax?: string;
  dataInicio?: string;
  dataFim?: string;
  clienteId?: string;
  motoristaId?: string;
  viagemId?: string;
  statusSeguro?: string;
  categoriaSeguro?: string;
  abrangenciaSeguro?: string;
  tipoPercurso?: string;
  destinoFrete?: string;
}

export interface PaginationData {
  curPage: number;
  pageSize: number;
  totalCount: number;
  totalPage: number;
}

export interface CargaListResponse {
  list: Carga[];
  pagination: PaginationData;
}

export interface ApiResponse<T> {
  returnCode: number;
  returnMsg: string;
  data?: T;
  errorCode?: string;
}

export interface CalculoCustosResponse {
  fretes: {
    freteIda: number;
    freteVolta: number;
    distancia: number;
    percentual: number;
  };
  comissao: number;
  seguroCarga: number;
  seguroVeiculo: number;
  valorTotal: number;
  margemLucro: number;
  detalhes?: {
    tipoPercurso: string;
    destinoFrete: string;
    peso: string;
    valorMercadoria: string;
    categoriaSeguro: string;
    abrangenciaSeguro: string;
  };
}

export interface ViabilidadeCarga {
  viavel: boolean;
  problemas: string[];
  alertas: string[];
  recomendacoes: string[];
}

// Classe de erro personalizada
export class CargaServiceError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "CargaServiceError";
  }
}

// Serviços da API
export const cargaService = {
  /**
   * Buscar lista de cargas com filtros
   */
  async fetchCargas(
    page: number = 1,
    pageSize: number = 10,
    filtros: FiltrosCarga = {},
    clienteId?: string
  ): Promise<CargaListResponse> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const body: any = {
        curPage: page,
        pageSize: pageSize,
        codigo: filtros.searchTerm || undefined,
        tipoCarga:
          filtros.tipoFilter !== "todos" ? filtros.tipoFilter : undefined,
        naturezaCarga:
          filtros.naturezaFilter !== "todos"
            ? filtros.naturezaFilter
            : undefined,
        status:
          filtros.statusFilter !== "todos" ? filtros.statusFilter : undefined,
        // prioridade: filtros.prioridade || undefined,
        cliente: clienteId || filtros.clienteId || undefined,
        motoristaId: filtros.motoristaId || undefined,
        viagemId: filtros.viagemId || undefined,
        statusSeguro: filtros.statusSeguro || undefined,
        // categoriaSeguro: filtros.categoriaSeguro || undefined,
        // abrangenciaSeguro: filtros.abrangenciaSeguro || undefined,
        // tipoPercurso: filtros.tipoPercurso || undefined,
        destinoFrete: filtros.destinoFrete || undefined,
      };

      // Filtros de data
      if (filtros.dataInicio || filtros.dataFim) {
        body.dataInicio = filtros.dataInicio;
        body.dataFim = filtros.dataFim;
      }

      const response = await fetch(`${API_BASE_URL}/getCargaList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ [DEBUG] Erro HTTP:", {
          status: response.status,
          statusText: response.statusText,
          errorText: errorText,
        });
        throw new CargaServiceError(
          `HTTP error! status: ${response.status}, details: ${errorText}`,
          "HTTP_ERROR",
          response.status
        );
      }

      const responseData = await response.json();

      if (responseData.returnCode === 200) {
        console.log(
          "✅ [DEBUG] Cargas encontradas:",
          responseData.data?.list?.length || 0
        );

        const result = {
          list: responseData.data?.list || [],
          pagination: {
            curPage: responseData.data?.curPage || page,
            pageSize: responseData.data?.pageSize || pageSize,
            totalCount: responseData.data?.totalCount || 0,
            totalPage: responseData.data?.totalPage || 0,
          },
        };

        return result;
      } else {
        console.error("❌ [DEBUG] Erro no returnCode:", {
          returnCode: responseData.returnCode,
          returnMsg: responseData.returnMsg,
        });
        throw new CargaServiceError(
          responseData.returnMsg,
          responseData.errorCode,
          responseData.returnCode
        );
      }
    } catch (error) {
      console.error("💥 [DEBUG] Erro completo ao buscar cargas:", error);
      if (error instanceof CargaServiceError) {
        throw error;
      }
      throw new CargaServiceError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao buscar cargas"
      );
    }
  },

  /**
   * Criar nova carga
   */
  // services/cargaService.ts - Atualize a função criarCarga

  async criarCarga(dadosCarga: Partial<Carga>): Promise<Carga> {
    try {
      // Validações básicas
      if (!dadosCarga.clienteId || !dadosCarga.cliente) {
        throw new CargaServiceError(
          "Cliente ID e Nome são obrigatórios",
          "MISSING_CLIENT_DATA"
        );
      }

      const response = await fetch(`${API_BASE_URL}/createCarga`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...dadosCarga,
          dataCriacao: new Date().toISOString(),
          dataAtualizacao: new Date().toISOString(),
        }),
      });

      const responseText = await response.text();

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Erro ao parsear resposta JSON:", parseError);
        throw new CargaServiceError(
          `Resposta do servidor inválida: ${responseText}`,
          "INVALID_JSON_RESPONSE",
          response.status
        );
      }

      if (!response.ok) {
        console.error("Detalhes do erro do servidor:", data);
        throw new CargaServiceError(
          data.returnMsg || `HTTP error! status: ${response.status}`,
          data.errorCode || "HTTP_ERROR",
          response.status
        );
      }

      if (data.returnCode === 201) {
        return data.data!;
      } else {
        throw new CargaServiceError(
          data.returnMsg,
          data.errorCode,
          data.returnCode
        );
      }
    } catch (error) {
      console.error("Erro completo ao criar carga:", error);
      if (error instanceof CargaServiceError) {
        throw error;
      }
      throw new CargaServiceError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao criar carga"
      );
    }
  },

  /**
   * Buscar detalhes de uma carga
   */
  async fetchCargaDetail(codigo: string): Promise<Carga> {
    try {
      const response = await fetch(`${API_BASE_URL}/getCargaDetail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigo }),
      });

      if (!response.ok) {
        throw new CargaServiceError(
          `HTTP error! status: ${response.status}`,
          "HTTP_ERROR",
          response.status
        );
      }

      const data: ApiResponse<Carga> = await response.json();

      if (data.returnCode === 200) {
        return data.data!;
      } else {
        throw new CargaServiceError(
          data.returnMsg,
          data.errorCode,
          data.returnCode
        );
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes da carga:", error);
      if (error instanceof CargaServiceError) {
        throw error;
      }
      throw new CargaServiceError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao buscar carga"
      );
    }
  },

  /**
   * Atualizar carga existente
   */
  async atualizarCarga(
    codigo: string,
    dadosAtualizacao: Partial<Carga>
  ): Promise<Carga> {
    try {
      const response = await fetch(`${API_BASE_URL}/updateCarga`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigo,
          ...dadosAtualizacao,
          dataAtualizacao: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new CargaServiceError(
          `HTTP error! status: ${response.status}`,
          "HTTP_ERROR",
          response.status
        );
      }

      const data: ApiResponse<Carga> = await response.json();

      if (data.returnCode === 200) {
        return data.data!;
      } else {
        throw new CargaServiceError(
          data.returnMsg,
          data.errorCode,
          data.returnCode
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar carga:", error);
      if (error instanceof CargaServiceError) {
        throw error;
      }
      throw new CargaServiceError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao atualizar carga"
      );
    }
  },

  /**
   * Calcular custos da carga
   */
  async calcularCustosCarga(dados: {
    codigo?: string;
    tipoPercurso?: TipoPercurso;
    destinoFrete?: string;
    pesoBruto?: number;
    valorMercadoria?: number;
    categoriaSeguro?: CategoriaSeguro;
    abrangenciaSeguro?: AbrangenciaSeguro;
    valorVeiculo?: number;
    tipoSeguroVeiculo?: string;
  }): Promise<CalculoCustosResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/calcularCustosCarga`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      if (!response.ok) {
        throw new CargaServiceError(
          `HTTP error! status: ${response.status}`,
          "HTTP_ERROR",
          response.status
        );
      }

      const data: ApiResponse<CalculoCustosResponse> = await response.json();

      if (data.returnCode === 200) {
        return data.data!;
      } else {
        throw new CargaServiceError(
          data.returnMsg,
          data.errorCode,
          data.returnCode
        );
      }
    } catch (error) {
      console.error("Erro ao calcular custos:", error);
      if (error instanceof CargaServiceError) {
        throw error;
      }
      throw new CargaServiceError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao calcular custos"
      );
    }
  },

  /**
   * Associar carga a caminhão
   */
  async associarCargaCamiao(
    codigoCarga: string,
    camiaoId: string,
    motoristaId?: string
  ): Promise<Carga> {
    try {
      const response = await fetch(`${API_BASE_URL}/associarCargaCamiao`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigoCarga,
          camiaoId,
          motoristaId,
        }),
      });

      if (!response.ok) {
        throw new CargaServiceError(
          `HTTP error! status: ${response.status}`,
          "HTTP_ERROR",
          response.status
        );
      }

      const data: ApiResponse<Carga> = await response.json();

      if (data.returnCode === 200) {
        return data.data!;
      } else {
        throw new CargaServiceError(
          data.returnMsg,
          data.errorCode,
          data.returnCode
        );
      }
    } catch (error) {
      console.error("Erro ao associar carga a caminhão:", error);
      if (error instanceof CargaServiceError) {
        throw error;
      }
      throw new CargaServiceError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao associar carga"
      );
    }
  },

  /**
   * Associar carga a GPS
   */
  async associarCargaGPS(
    codigoCarga: string,
    codigoGPS: string
  ): Promise<Carga> {
    try {
      const response = await fetch(`${API_BASE_URL}/associarCargaGPS`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigoCarga,
          codigoGPS,
        }),
      });

      if (!response.ok) {
        throw new CargaServiceError(
          `HTTP error! status: ${response.status}`,
          "HTTP_ERROR",
          response.status
        );
      }

      const data: ApiResponse<Carga> = await response.json();

      if (data.returnCode === 200) {
        return data.data!;
      } else {
        throw new CargaServiceError(
          data.returnMsg,
          data.errorCode,
          data.returnCode
        );
      }
    } catch (error) {
      console.error("Erro ao associar carga a GPS:", error);
      if (error instanceof CargaServiceError) {
        throw error;
      }
      throw new CargaServiceError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao associar GPS"
      );
    }
  },

  /**
   * Verificar viabilidade da carga com caminhão
   */
  async verificarViabilidadeCargaCamiao(
    codigoCarga: string,
    camiaoId: string
  ): Promise<ViabilidadeCarga> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/verificarViabilidadeCargaCamiao`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codigoCarga,
            camiaoId,
          }),
        }
      );

      if (!response.ok) {
        throw new CargaServiceError(
          `HTTP error! status: ${response.status}`,
          "HTTP_ERROR",
          response.status
        );
      }

      const data: ApiResponse<ViabilidadeCarga> = await response.json();

      if (data.returnCode === 200) {
        return data.data!;
      } else {
        throw new CargaServiceError(
          data.returnMsg,
          data.errorCode,
          data.returnCode
        );
      }
    } catch (error) {
      console.error("Erro ao verificar viabilidade:", error);
      if (error instanceof CargaServiceError) {
        throw error;
      }
      throw new CargaServiceError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao verificar viabilidade"
      );
    }
  },

  /**
   * Atualizar status da carga
   */
  async atualizarStatusCarga(
    codigo: string,
    status: StatusCarga,
    observacao?: string,
    local?: string
  ): Promise<Carga> {
    try {
      const response = await fetch(`${API_BASE_URL}/updateCargaStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigo,
          status,
          observacao,
          local,
        }),
      });

      if (!response.ok) {
        throw new CargaServiceError(
          `HTTP error! status: ${response.status}`,
          "HTTP_ERROR",
          response.status
        );
      }

      const data: ApiResponse<Carga> = await response.json();

      if (data.returnCode === 200) {
        return data.data!;
      } else {
        throw new CargaServiceError(
          data.returnMsg,
          data.errorCode,
          data.returnCode
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      if (error instanceof CargaServiceError) {
        throw error;
      }
      throw new CargaServiceError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao atualizar status"
      );
    }
  },

  /**
   * Adicionar ocorrência à carga
   */
  async adicionarOcorrencia(
    codigo: string,
    ocorrenciaData: Omit<Ocorrencia, "id" | "dataRegistro" | "afetaSeguro">
  ): Promise<Carga> {
    try {
      const response = await fetch(`${API_BASE_URL}/addOcorrenciaCarga`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigo,
          ocorrenciaData,
        }),
      });

      if (!response.ok) {
        throw new CargaServiceError(
          `HTTP error! status: ${response.status}`,
          "HTTP_ERROR",
          response.status
        );
      }

      const data: ApiResponse<Carga> = await response.json();

      if (data.returnCode === 200) {
        return data.data!;
      } else {
        throw new CargaServiceError(
          data.returnMsg,
          data.errorCode,
          data.returnCode
        );
      }
    } catch (error) {
      console.error("Erro ao adicionar ocorrência:", error);
      if (error instanceof CargaServiceError) {
        throw error;
      }
      throw new CargaServiceError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao adicionar ocorrência"
      );
    }
  },

  /**
   * Buscar estatísticas de cargas
   */
  async fetchEstatisticas(
    filtros: {
      clienteId?: string;
      dataInicio?: string;
      dataFim?: string;
      tipoPercurso?: string;
    } = {}
  ) {
    try {
      const response = await fetch(`${API_BASE_URL}/getCargaStats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filtros),
      });

      if (!response.ok) {
        throw new CargaServiceError(
          `HTTP error! status: ${response.status}`,
          "HTTP_ERROR",
          response.status
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: ApiResponse<any> = await response.json();

      if (data.returnCode === 200) {
        return data.data!;
      } else {
        throw new CargaServiceError(
          data.returnMsg,
          data.errorCode,
          data.returnCode
        );
      }
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
      if (error instanceof CargaServiceError) {
        throw error;
      }
      throw new CargaServiceError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao buscar estatísticas"
      );
    }
  },

  /**
   * Buscar tabelas de fretes
   */
  async fetchTabelasFretes(tipoPercurso?: TipoPercurso) {
    try {
      const response = await fetch(`${API_BASE_URL}/getTabelasFretes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tipoPercurso }),
      });

      if (!response.ok) {
        throw new CargaServiceError(
          `HTTP error! status: ${response.status}`,
          "HTTP_ERROR",
          response.status
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: ApiResponse<any> = await response.json();

      if (data.returnCode === 200) {
        return data.data!;
      } else {
        throw new CargaServiceError(
          data.returnMsg,
          data.errorCode,
          data.returnCode
        );
      }
    } catch (error) {
      console.error("Erro ao buscar tabelas de fretes:", error);
      if (error instanceof CargaServiceError) {
        throw error;
      }
      throw new CargaServiceError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao buscar tabelas"
      );
    }
  },

  /**
   * Buscar camiões disponíveis
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async fetchCamioesDisponiveis(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/getCamioesDisponiveis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "disponivel",
          curPage: 1,
          pageSize: 100,
        }),
      });

      if (!response.ok) {
        throw new CargaServiceError(
          `HTTP error! status: ${response.status}`,
          "HTTP_ERROR",
          response.status
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: ApiResponse<{ list: any[] }> = await response.json();

      if (data.returnCode === 200) {
        return data.data?.list || [];
      } else {
        throw new CargaServiceError(
          data.returnMsg,
          data.errorCode,
          data.returnCode
        );
      }
    } catch (error) {
      console.error("Erro ao buscar camiões:", error);
      if (error instanceof CargaServiceError) {
        throw error;
      }
      throw new CargaServiceError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao buscar camiões"
      );
    }
  },
  /**
   * Buscar GPS disponíveis
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async fetchGpsDisponiveis(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/getGpsDisponiveis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "disponivel",
          curPage: 1,
          pageSize: 100,
        }),
      });

      if (!response.ok) {
        throw new CargaServiceError(
          `HTTP error! status: ${response.status}`,
          "HTTP_ERROR",
          response.status
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: ApiResponse<{ list: any[] }> = await response.json();

      if (data.returnCode === 200) {
        return data.data?.list || [];
      } else {
        throw new CargaServiceError(
          data.returnMsg,
          data.errorCode,
          data.returnCode
        );
      }
    } catch (error) {
      console.error("Erro ao buscar GPS:", error);
      if (error instanceof CargaServiceError) {
        throw error;
      }
      throw new CargaServiceError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao buscar GPS"
      );
    }
  },
  /**
   * Buscar clientes por categoria
   */
  async fetchClientesByCategoria(
    categoria: string = "Cliente",
    status: string = "ativo"
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/getClientesByCategoria`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          curPage: 1,
          pageSize: 1000,
          categoria: categoria,
          status: status,
        }),
      });

      if (!response.ok) {
        throw new CargaServiceError(
          `HTTP error! status: ${response.status}`,
          "HTTP_ERROR",
          response.status
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: ApiResponse<{ list: any[] }> = await response.json();

      if (data.returnCode === 200) {
        return data.data?.list || [];
      } else {
        throw new CargaServiceError(
          data.returnMsg,
          data.errorCode,
          data.returnCode
        );
      }
    } catch (error) {
      console.error("Erro ao buscar clientes por categoria:", error);
      if (error instanceof CargaServiceError) {
        throw error;
      }
      throw new CargaServiceError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao buscar clientes"
      );
    }
  },
  /**
   * Exportar dados de cargas
   */
  async exportarCargas(filtros: FiltrosCarga = {}): Promise<Carga[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/getCargaList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          curPage: 1,
          pageSize: 10000,
          codigo: filtros.searchTerm || undefined,
          tipoCarga:
            filtros.tipoFilter !== "todos" ? filtros.tipoFilter : undefined,
          naturezaCarga:
            filtros.naturezaFilter !== "todos"
              ? filtros.naturezaFilter
              : undefined,
          status:
            filtros.statusFilter !== "todos" ? filtros.statusFilter : undefined,
          clienteId: filtros.clienteId || undefined,
        }),
      });

      if (!response.ok) {
        throw new CargaServiceError(
          `HTTP error! status: ${response.status}`,
          "HTTP_ERROR",
          response.status
        );
      }

      const data: ApiResponse<{ list: Carga[] }> = await response.json();

      if (data.returnCode === 200) {
        return data.data?.list || [];
      } else {
        throw new CargaServiceError(
          data.returnMsg,
          data.errorCode,
          data.returnCode
        );
      }
    } catch (error) {
      console.error("Erro ao exportar dados:", error);
      if (error instanceof CargaServiceError) {
        throw error;
      }
      throw new CargaServiceError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao exportar dados"
      );
    }
  },
  /**
   * Upload de documento para a carga
   */
  async uploadDocumento(
    request: UploadDocumentoRequest
  ): Promise<UploadDocumentoResponse> {
    try {
      const formData = new FormData();
      formData.append("file", request.file);
      formData.append("nomeEmpresa", request.nomeEmpresa);
      if (request.descricao) {
        formData.append("descricao", request.descricao);
      }

      const response = await fetch(`${API_BASE_URL}/docUpload`, {
        method: "POST",
        body: formData,
        // Note: Não definir Content-Type manualmente para FormData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new CargaServiceError(
          `HTTP error! status: ${response.status}, details: ${errorText}`,
          "HTTP_ERROR",
          response.status
        );
      }

      const url = await response.json();

      return {
        success: true,
        url: url,
        filename: request.file.name,
      };
    } catch (error) {
      console.error("Erro ao fazer upload do documento:", error);
      if (error instanceof CargaServiceError) {
        throw error;
      }
      throw new CargaServiceError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao fazer upload do documento"
      );
    }
  },
  /**
   * Deletar documento
   */
  async deleteDocumento(
    request: DeleteDocumentoRequest
  ): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/deleteDoc`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new CargaServiceError(
          `HTTP error! status: ${response.status}, details: ${errorText}`,
          "HTTP_ERROR",
          response.status
        );
      }

      const data: ApiResponse<void> = await response.json();

      if (data.returnCode === 200) {
        return data;
      } else {
        throw new CargaServiceError(
          data.returnMsg,
          data.errorCode,
          data.returnCode
        );
      }
    } catch (error) {
      console.error("Erro ao deletar documento:", error);
      if (error instanceof CargaServiceError) {
        throw error;
      }
      throw new CargaServiceError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao deletar documento"
      );
    }
  },

  /**
   * Atualizar documentos da carga
   */
  async atualizarDocumentosCarga(
    codigo: string,
    documentos: {
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
    }
  ): Promise<Carga> {
    try {
      const response = await fetch(`${API_BASE_URL}/updateCargaDocumentos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigo,
          documentos,
        }),
      });

      if (!response.ok) {
        throw new CargaServiceError(
          `HTTP error! status: ${response.status}`,
          "HTTP_ERROR",
          response.status
        );
      }

      const data: ApiResponse<Carga> = await response.json();

      if (data.returnCode === 200) {
        return data.data!;
      } else {
        throw new CargaServiceError(
          data.returnMsg,
          data.errorCode,
          data.returnCode
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar documentos da carga:", error);
      if (error instanceof CargaServiceError) {
        throw error;
      }
      throw new CargaServiceError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao atualizar documentos"
      );
    }
  },

  /**
   * Obter URLs assinadas para documentos privados (se necessário)
   */
  async obterUrlAssinada(filename: string): Promise<string> {
    try {
      const response = await fetch(`${API_BASE_URL}/getSignedUrl`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename }),
      });

      if (!response.ok) {
        throw new CargaServiceError(
          `HTTP error! status: ${response.status}`,
          "HTTP_ERROR",
          response.status
        );
      }

      const data: ApiResponse<{ url: string }> = await response.json();

      if (data.returnCode === 200) {
        return data.data!.url;
      } else {
        throw new CargaServiceError(
          data.returnMsg,
          data.errorCode,
          data.returnCode
        );
      }
    } catch (error) {
      console.error("Erro ao obter URL assinada:", error);
      if (error instanceof CargaServiceError) {
        throw error;
      }
      throw new CargaServiceError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao obter URL assinada"
      );
    }
  },
};

// Utilitários
export const cargaUtils = {
  /**
   * Gerar código único para carga
   */
  gerarCodigoCarga(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `CARGA-${timestamp}-${random}`;
  },

  /**
   * Validar dados mínimos da carga
   */
  validarDadosCarga(dados: Partial<Carga>): string[] {
    const erros: string[] = [];

    if (!dados.clienteId) erros.push("ID do cliente é obrigatório");
    if (!dados.cliente) erros.push("Nome do cliente é obrigatório");
    if (!dados.tipoCarga) erros.push("Tipo de carga é obrigatório");
    if (!dados.descricao) erros.push("Descrição é obrigatória");
    if (!dados.naturezaCarga) erros.push("Natureza da carga é obrigatória");
    if (!dados.categoriaSeguro) erros.push("Categoria do seguro é obrigatória");
    if (!dados.abrangenciaSeguro)
      erros.push("Abrangência do seguro é obrigatória");
    if (!dados.tipoPercurso) erros.push("Tipo de percurso é obrigatório");
    if (!dados.destinoFrete) erros.push("Destino do frete é obrigatório");
    if (!dados.pesoBruto || dados.pesoBruto <= 0)
      erros.push("Peso bruto deve ser maior que zero");
    if (!dados.valorMercadoria || dados.valorMercadoria <= 0)
      erros.push("Valor da mercadoria deve ser maior que zero");
    if (!dados.origem?.pais) erros.push("País de origem é obrigatório");
    if (!dados.origem?.cidade) erros.push("Cidade de origem é obrigatória");
    if (!dados.origem?.local) erros.push("Local de origem é obrigatório");
    if (!dados.destino?.pais) erros.push("País de destino é obrigatório");
    if (!dados.destino?.cidade) erros.push("Cidade de destino é obrigatória");
    if (!dados.destino?.local) erros.push("Local de destino é obrigatório");

    return erros;
  },

  /**
   * Calcular status de prioridade baseado em dados da carga
   */
  calcularPrioridade(carga: Partial<Carga>): Prioridade {
    if (carga.prioridade) return carga.prioridade;

    const hoje = new Date();
    const entregaPrevista = carga.dataEntregaPrevista
      ? new Date(carga.dataEntregaPrevista)
      : null;

    if (
      entregaPrevista &&
      entregaPrevista.getTime() - hoje.getTime() < 24 * 60 * 60 * 1000
    ) {
      return "urgente";
    } else if (
      carga.naturezaCarga === "perigosa" ||
      carga.naturezaCarga === "sensível"
    ) {
      return "alta";
    } else if (
      entregaPrevista &&
      entregaPrevista.getTime() - hoje.getTime() < 3 * 24 * 60 * 60 * 1000
    ) {
      return "média";
    } else {
      return "baixa";
    }
  },
  /**
   * Validar arquivo para upload
   */
  validarArquivoUpload(file: File): { valido: boolean; erro?: string } {
    // Verificar se é imagem
    const isImage = file.type.startsWith("image/");
    const isPDF = file.type === "application/pdf";

    if (!isImage && !isPDF) {
      return {
        valido: false,
        erro: "Apenas imagens e PDFs são permitidos",
      };
    }

    // Verificar tamanho máximo (10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return {
        valido: false,
        erro: `O arquivo excede o tamanho máximo de 10MB (${(
          file.size /
          (1024 * 1024)
        ).toFixed(2)}MB)`,
      };
    }

    // Verificar extensões permitidas
    const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp", "pdf"];
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (!extension || !allowedExtensions.includes(extension)) {
      return {
        valido: false,
        erro: `Extensão não permitida. Use: ${allowedExtensions.join(", ")}`,
      };
    }

    return { valido: true };
  },
  /**
   * Formatar tamanho do arquivo
   */
  formatarTamanhoArquivo(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  },
  /**
   * Obter ícone baseado no tipo de arquivo
   */
  obterIconeDocumento(tipo: string): string {
    if (tipo.includes("pdf")) return "📄";
    if (tipo.includes("image")) return "🖼️";
    if (tipo.includes("word") || tipo.includes("document")) return "📝";
    if (tipo.includes("excel") || tipo.includes("spreadsheet")) return "📊";
    return "📎";
  },
  /**
   * Obter descrição do documento baseado no nome do arquivo
   */
  obterDescricaoDocumento(nomeArquivo: string): string {
    const nomeLower = nomeArquivo.toLowerCase();

    if (nomeLower.includes("conhecimento") || nomeLower.includes("embarque"))
      return "conhecimentoEmbarque";
    if (nomeLower.includes("invoice") || nomeLower.includes("fatura"))
      return "invoice";
    if (nomeLower.includes("packing") || nomeLower.includes("lista"))
      return "packingList";
    if (nomeLower.includes("certificado") || nomeLower.includes("origem"))
      return "certificadoOrigem";
    if (nomeLower.includes("contrato") || nomeLower.includes("transporte"))
      return "contratoTransporte";
    if (nomeLower.includes("cotacao")) return "numeroCotacao";
    if (nomeLower.includes("recibo")) return "numeroRecibo";
    if (nomeLower.includes("nota") || nomeLower.includes("debito"))
      return "notaDebito";
    if (nomeLower.includes("manifest")) return "manifest";
    if (
      nomeLower.includes("foto") ||
      nomeLower.includes("imagem") ||
      nomeLower.includes("photo")
    )
      return "evidencia";

    return "outro";
  },
  /**
   * Agrupar documentos por tipo
   */
  agruparDocumentosPorTipo(
    documentos: DocumentoFile[]
  ): Record<string, DocumentoFile[]> {
    return documentos.reduce((grupos, doc) => {
      const tipo = doc.descricao || "outros";
      if (!grupos[tipo]) {
        grupos[tipo] = [];
      }
      grupos[tipo].push(doc);
      return grupos;
    }, {} as Record<string, DocumentoFile[]>);
  },
};
