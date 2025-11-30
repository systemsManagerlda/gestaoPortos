// types/noticia.ts
export interface Imagem {
  url: string;
  legenda?: string;
  ordem: number;
}

export interface Video {
  url: string;
  titulo?: string;
  duracao?: string;
}

export interface Documento {
  tipo: 'pdf' | 'doc' | 'xls' | 'ppt' | 'outro';
  nome: string;
  url: string;
  tamanho: number;
}

export interface ArquivoMidia {
  id?: string;
  url: string;
  nome: string;
  tipo: 'imagem' | 'pdf' | 'video';
  legenda?: string;
  ordem: number;
  tamanho: number;
  formato: string;
  dataUpload: string;
}

export interface Noticia {
  _id?: string;
  codigo: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  entidade: string;
  setor: string;
  autor: {
    nome: string;
    departamento?: string;
    cargo?: string;
  };
  fonte: string;
  status: 'rascunho' | 'revisao' | 'publicado' | 'arquivado' | 'cancelado';
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
  visibilidade: 'publico' | 'interno' | 'restrito';
  dataPublicacao: string;
  dataExpiracao?: string;
  tags: string[];
  
  // CAMPOS DO SCHEMA REAL DO MONGODB
  imagens: Imagem[];
  videos: Video[];
  documentos: Documento[];
  tipoConteudo: 'texto' | 'multimidia' | 'documento' | 'anuncio';
  
  // Campo unificado para o frontend (opcional)
  midia?: ArquivoMidia[];
  
  estatisticas: {
    visualizacoes: number;
    compartilhamentos: number;
    downloads: number;
    tempoMedioLeitura?: number;
  };
  
  dataCriacao: string;
  dataAtualizacao: string;
  criadoPor: string;
  atualizadoPor?: string;
  
  // Campos opcionais adicionais
  versao?: number;
  historicoAlteracoes?: Array<{
    versao: number;
    dataAlteracao: string;
    usuario: string;
    alteracoes: string;
    comentarios: string;
  }>;
  aprovacoes?: Array<{
    aprovador: string;
    dataAprovacao: string;
    comentarios: string;
    status: string;
  }>;
  notificacao?: {
    enviarNotificacao: boolean;
    tipoNotificacao: string;
    gruposDestino: string[];
  };
  contatos?: Array<{
    tipo: string;
    valor: string;
    descricao: string;
  }>;
  linksRelacionados?: Array<{
    titulo: string;
    url: string;
    tipo: string;
  }>;
  areaAtuacao?: string[];
  localizacao?: {
    provincia?: string;
    cidade?: string;
    distrito?: string;
    endereco?: string;
    coordenadas?: {
      lat: number;
      lng: number;
    };
  };
  observacoes?: string;
  palavrasChave?: string[];
  subcategoria?: string;
  dataEvento?: string;
}

export interface NoticiaFormData {
  titulo: string;
  resumo: string;
  conteudo: string;
  entidade: string;
  setor: string;
  autor: {
    nome: string;
    departamento: string;
    cargo: string;
  };
  fonte: string;
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
  visibilidade: 'publico' | 'interno' | 'restrito';
  dataPublicacao: string;
  dataExpiracao: string;
  tags: string;
  arquivos?: File[];
}

export interface ApiResponse<T> {
  returnCode: number;
  returnMsg: string;
  data: T;
}