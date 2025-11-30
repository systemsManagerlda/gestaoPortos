/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// services/noticiaService.ts
import {
  Noticia,
  NoticiaFormData,
  ApiResponse,
  ArquivoMidia,
} from "@/types/noticia";

const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

class NoticiaService {
  private async fetchAPI(endpoint: string, options: RequestInit = {}) {
    try {
      console.log(
        `📡 Fazendo requisição para: ${API_BASE_URL}${endpoint}`,
        options
      );

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      console.log(
        `📨 Resposta recebida:`,
        response.status,
        response.statusText
      );

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;

        // Tentar obter mais detalhes do erro
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.returnMsg || errorData.message || errorMessage;
          console.error("📝 Detalhes do erro:", errorData);
        } catch (e) {
          // Se não conseguir parsear JSON, usar texto simples
          console.log(e);

          const text = await response.text();
          errorMessage = text || errorMessage;
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log(`✅ Resposta bem-sucedida:`, data);
      return data;
    } catch (error) {
      console.error(`❌ Erro na requisição ${endpoint}:`, error);
      throw error;
    }
  }

  // Método para upload de arquivos REAL
  async uploadArquivos(arquivos: File[]): Promise<ArquivoMidia[]> {
    const midias: ArquivoMidia[] = [];

    for (const arquivo of arquivos) {
      try {
        console.log(`📤 Iniciando upload real do arquivo: ${arquivo.name}`);

        const tipo = this.determinarTipoArquivo(arquivo.type, arquivo.name);
        const url = await this.fazerUploadReal(arquivo);

        const midia: ArquivoMidia = {
          url,
          nome: arquivo.name,
          tipo,
          legenda: "",
          ordem: midias.length,
          tamanho: arquivo.size,
          formato: arquivo.type,
          dataUpload: new Date().toISOString(),
        };

        midias.push(midia);
        console.log(`✅ Arquivo ${arquivo.name} enviado com sucesso: ${url}`);
      } catch (error) {
        console.error(
          `❌ Erro ao fazer upload do arquivo ${arquivo.name}:`,
          error
        );
        throw error;
      }
    }

    return midias;
  }

  // Método para fazer upload real usando a rota /docUpload
  private async fazerUploadReal(arquivo: File): Promise<string> {
    try {
      console.log(
        `📤 Iniciando upload real do arquivo: ${arquivo.name} (${arquivo.size} bytes, ${arquivo.type})`
      );

      // Criar FormData para enviar o arquivo
      const formData = new FormData();
      formData.append("file", arquivo);
      formData.append("nomeEmpresa", "Sistema de Notícias");

      console.log("📦 FormData criado, enviando para /docUpload...");

      const response = await fetch(`${API_BASE_URL}/docUpload`, {
        method: "POST",
        body: formData,
        // Não definir Content-Type, o browser vai definir automaticamente com boundary
      });

      console.log(
        `📨 Resposta do upload: ${response.status} ${response.statusText}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Upload falhou:", errorText);
        throw new Error(`Upload falhou: ${response.status} - ${errorText}`);
      }

      const link = await response.json();
      console.log(`✅ Upload realizado com sucesso! Link: ${link}`);
      return link;
    } catch (error) {
      console.error(
        `❌ Erro no upload real do arquivo ${arquivo.name}:`,
        error
      );
      throw new Error(`Falha no upload do arquivo ${arquivo.name}: ${error}`);
    }
  }

  private determinarTipoArquivo(
    tipoMime: string,
    nomeArquivo: string
  ): "imagem" | "pdf" | "video" {
    if (tipoMime.startsWith("image/")) return "imagem";
    if (tipoMime === "application/pdf") return "pdf";
    if (tipoMime.startsWith("video/")) return "video";

    // Fallback baseado na extensão do arquivo
    const extensao = nomeArquivo.toLowerCase().split(".").pop();
    if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extensao || ""))
      return "imagem";
    if (["pdf"].includes(extensao || "")) return "pdf";
    if (["mp4", "avi", "mov", "wmv", "flv", "webm"].includes(extensao || ""))
      return "video";

    return "imagem"; // default
  }

  // Método auxiliar para preparar notícia com campos padrão
  // services/noticiaService.ts - Atualize o método prepararNoticia
  private prepararNoticia(noticia: any): Noticia {
    // Garantir que os arrays existam
    const noticiaProcessada = {
      ...noticia,
      // Garantir arrays vazios se não existirem
      imagens: noticia.imagens || [],
      videos: noticia.videos || [],
      documentos: noticia.documentos || [],
      tags: noticia.tags || [],
      // Garantir campos obrigatórios
      fonte: noticia.fonte || "Comunicado Oficial",
      dataCriacao:
        noticia.dataCriacao || noticia.createdAt || new Date().toISOString(),
      dataAtualizacao:
        noticia.dataAtualizacao ||
        noticia.updatedAt ||
        new Date().toISOString(),
      criadoPor: noticia.criadoPor || noticia.autor?.nome || "Sistema",
      atualizadoPor: noticia.atualizadoPor || noticia.autor?.nome || "Sistema",
      // Garantir estatísticas
      estatisticas: noticia.estatisticas || {
        visualizacoes: 0,
        compartilhamentos: 0,
        downloads: 0,
        tempoMedioLeitura: 0,
      },
      // Garantir autor completo
      autor: {
        nome: noticia.autor?.nome || "Autor Desconhecido",
        departamento: noticia.autor?.departamento || "",
        cargo: noticia.autor?.cargo || "",
      },
      // Garantir tipo de conteúdo
      tipoConteudo: noticia.tipoConteudo || "texto",
    };

    // Criar campo midia unificado para facilitar no frontend (opcional)
    const midia: ArquivoMidia[] = [];

    // Converter imagens para midia
    noticiaProcessada.imagens.forEach((img: any, index: number) => {
      midia.push({
        id: img._id || `img-${index}`,
        url: img.url,
        nome: img.legenda || `Imagem ${index + 1}`,
        tipo: "imagem" as const,
        legenda: img.legenda,
        ordem: img.ordem || index,
        tamanho: 0,
        formato: "image/jpeg",
        dataUpload: noticiaProcessada.dataCriacao,
      });
    });

    // Converter documentos para midia
    noticiaProcessada.documentos.forEach((doc: any, index: number) => {
      midia.push({
        id: doc._id || `doc-${index}`,
        url: doc.url,
        nome: doc.nome || `Documento ${index + 1}`,
        tipo: "pdf" as const,
        legenda: "",
        ordem: index + noticiaProcessada.imagens.length,
        tamanho: doc.tamanho || 0,
        formato: doc.tipo ? `application/${doc.tipo}` : "application/pdf",
        dataUpload: noticiaProcessada.dataCriacao,
      });
    });

    // Converter vídeos para midia
    noticiaProcessada.videos.forEach((video: any, index: number) => {
      midia.push({
        id: video._id || `video-${index}`,
        url: video.url,
        nome: video.titulo || `Vídeo ${index + 1}`,
        tipo: "video" as const,
        legenda: "",
        ordem:
          index +
          noticiaProcessada.imagens.length +
          noticiaProcessada.documentos.length,
        tamanho: 0,
        formato: "video/mp4",
        dataUpload: noticiaProcessada.dataCriacao,
      });
    });

    // Adicionar campo midia unificado
    noticiaProcessada.midia = midia;

    return noticiaProcessada;
  }
  // CREATE - Criar nova notícia
  async criarNoticia(data: NoticiaFormData): Promise<ApiResponse<Noticia>> {
    let imagens: any[] = [];
    let documentos: any[] = [];
    let videos: any[] = [];

    // Upload de arquivos se existirem
    if (data.arquivos && data.arquivos.length > 0) {
      console.log(`📤 Iniciando upload de ${data.arquivos.length} arquivos...`);
      try {
        const midias = await this.uploadArquivos(data.arquivos);
        console.log("✅ Upload concluído. Mídias processadas:", midias);

        // Separar por tipo conforme o schema
        imagens = midias
          .filter((m) => m.tipo === "imagem")
          .map((m, index) => ({
            url: m.url,
            legenda: m.legenda || m.nome,
            ordem: index,
          }));

        documentos = midias
          .filter((m) => m.tipo === "pdf")
          .map((m) => ({
            tipo: "pdf",
            nome: m.nome,
            url: m.url,
            tamanho: m.tamanho,
          }));

        videos = midias
          .filter((m) => m.tipo === "video")
          .map((m) => ({
            url: m.url,
            titulo: m.nome,
            duracao: "0", // Você pode calcular isso se necessário
          }));

        console.log("📊 Arquivos separados:", { imagens, documentos, videos });
      } catch (error) {
        console.error(
          "❌ Erro no upload de arquivos, continuando sem arquivos:",
          error
        );
      }
    }

    const payload = {
      ...data,
      criadoPor: data.autor.nome,
      tags: data.tags
        ? data.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : [],
      // Garantir que campos obrigatórios estejam presentes
      status: "rascunho",
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
      dataPublicacao: data.dataPublicacao
        ? new Date(data.dataPublicacao).toISOString()
        : new Date().toISOString(),
      // USAR OS CAMPOS DO SCHEMA CORRETO:
      imagens: imagens,
      documentos: documentos,
      videos: videos,
      // Campos adicionais do schema
      estatisticas: {
        visualizacoes: 0,
        compartilhamentos: 0,
        downloads: 0,
        tempoMedioLeitura: 0,
      },
      tipoConteudo:
        imagens.length > 0 || videos.length > 0 || documentos.length > 0
          ? "multimidia"
          : "texto",
      versao: 1,
      historicoAlteracoes: [],
      aprovacoes: [],
      notificacao: {
        enviarNotificacao: false,
        tipoNotificacao: "email",
        gruposDestino: [],
      },
      contatos: [],
      linksRelacionados: [],
      areaAtuacao: [],
      palavrasChave: data.tags
        ? data.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : [],
    };

    // Remover arquivos do payload antes de enviar
    const { arquivos, ...payloadSemArquivos } = payload;

    console.log(
      "📤 Payload FINAL (com schema correto):",
      JSON.stringify(payloadSemArquivos, null, 2)
    );

    const response = await this.fetchAPI("/createNoticia", {
      method: "POST",
      body: JSON.stringify(payloadSemArquivos),
    });

    console.log("📨 Resposta completa da API:", response);

    // Garantir que a notícia retornada tenha todos os campos
    if (response.data) {
      response.data = this.prepararNoticia(response.data);
      console.log("✅ Notícia processada após criação:", response.data);
    }

    return response;
  }

  // UPDATE - Atualizar notícia com suporte a novos arquivos
  // services/noticiaService.ts - Atualize o método atualizarNoticia
  async atualizarNoticia(
    id: string,
    data: Partial<NoticiaFormData>,
    atualizadoPor: string
  ): Promise<ApiResponse<Noticia>> {
    let novasImagens: any[] = [];
    let novosDocumentos: any[] = [];
    let novosVideos: any[] = [];

    // Upload de novos arquivos se existirem
    if (data.arquivos && data.arquivos.length > 0) {
      console.log(
        `📤 Iniciando upload de ${data.arquivos.length} novos arquivos...`
      );
      try {
        const novasMidias = await this.uploadArquivos(data.arquivos);

        // Separar por tipo conforme o schema
        novasImagens = novasMidias
          .filter((m) => m.tipo === "imagem")
          .map((m, index) => ({
            url: m.url,
            legenda: m.legenda || m.nome,
            ordem: index,
          }));

        novosDocumentos = novasMidias
          .filter((m) => m.tipo === "pdf")
          .map((m) => ({
            tipo: "pdf",
            nome: m.nome,
            url: m.url,
            tamanho: m.tamanho,
          }));

        novosVideos = novasMidias
          .filter((m) => m.tipo === "video")
          .map((m) => ({
            url: m.url,
            titulo: m.nome,
            duracao: "0",
          }));
      } catch (error) {
        console.error("❌ Erro no upload de novos arquivos:", error);
      }
    }

    const payload: any = {
      ...data,
      atualizadoPor,
      dataAtualizacao: new Date().toISOString(),
    };

    if (data.tags) {
      payload.tags = data.tags
        .split(",")
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag);
    }

    // Adicionar novos arquivos se existirem
    if (novasImagens.length > 0) {
      payload.$push = { imagens: { $each: novasImagens } };
    }
    if (novosDocumentos.length > 0) {
      payload.$push = { documentos: { $each: novosDocumentos } };
    }
    if (novosVideos.length > 0) {
      payload.$push = { videos: { $each: novosVideos } };
    }

    // Remover arquivos do payload antes de enviar
    const { arquivos, ...payloadSemArquivos } = payload;

    console.log("📤 Payload para atualização:", payloadSemArquivos);

    const response = await this.fetchAPI(`/updateNoticia/${id}`, {
      method: "PUT",
      body: JSON.stringify(payloadSemArquivos),
    });

    // Garantir que a notícia retornada tenha todos os campos
    if (response.data) {
      response.data = this.prepararNoticia(response.data);
    }

    return response;
  }

  // Método específico para adicionar arquivos a uma notícia existente
  async adicionarArquivosNoticia(
    noticiaId: string,
    arquivos: File[]
  ): Promise<ApiResponse<Noticia>> {
    try {
      console.log(
        `📤 Adicionando ${arquivos.length} arquivos à notícia ${noticiaId}...`
      );

      const novasMidias = await this.uploadArquivos(arquivos);

      const payload = {
        $push: { midia: { $each: novasMidias } },
        dataAtualizacao: new Date().toISOString(),
        atualizadoPor: "Sistema",
      };

      const response = await this.fetchAPI(`/updateNoticia/${noticiaId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      // Garantir que a notícia retornada tenha todos os campos
      if (response.data) {
        response.data = this.prepararNoticia(response.data);
      }

      return response;
    } catch (error) {
      console.error(`❌ Erro ao adicionar arquivos à notícia:`, error);
      throw error;
    }
  }

  // Método específico para remover arquivo de uma notícia
  async removerArquivoNoticia(
    noticiaId: string,
    arquivoId: string
  ): Promise<ApiResponse<Noticia>> {
    try {
      console.log(
        `🗑️ Removendo arquivo ${arquivoId} da notícia ${noticiaId}...`
      );

      const payload = {
        $pull: { midia: { id: arquivoId } },
        dataAtualizacao: new Date().toISOString(),
        atualizadoPor: "Sistema",
      };

      const response = await this.fetchAPI(`/updateNoticia/${noticiaId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      // Garantir que a notícia retornada tenha todos os campos
      if (response.data) {
        response.data = this.prepararNoticia(response.data);
      }

      return response;
    } catch (error) {
      console.error(`❌ Erro ao remover arquivo da notícia:`, error);
      throw error;
    }
  }

  // READ - Buscar notícia por ID
  async buscarNoticia(id: string): Promise<ApiResponse<Noticia>> {
    const response = await this.fetchAPI(`/getNoticia/${id}`);
    // Garantir que a notícia tenha todas as propriedades obrigatórias
    if (response.data) {
      response.data = this.prepararNoticia(response.data);
    }
    return response;
  }

  // READ - Buscar notícias por entidade
  async buscarNoticiasPorEntidade(
    entidade: string,
    page = 1,
    limit = 10
  ): Promise<
    ApiResponse<{
      noticias: Noticia[];
      totalPages: number;
      currentPage: number;
      total: number;
    }>
  > {
    const response = await this.fetchAPI(
      `/getNoticiasByEntidade/${entidade}?page=${page}&limit=${limit}`
    );
    // Garantir que todas as notícias tenham as propriedades obrigatórias
    if (response.data.noticias) {
      response.data.noticias = response.data.noticias.map((noticia: Noticia) =>
        this.prepararNoticia(noticia)
      );
    }
    return response;
  }

  // READ - Buscar notícias urgentes
  async buscarNoticiasUrgentes(limit = 5): Promise<ApiResponse<Noticia[]>> {
    const response = await this.fetchAPI(`/getNoticiasUrgentes?limit=${limit}`);
    // Garantir que todas as notícias tenham as propriedades obrigatórias
    if (response.data) {
      response.data = response.data.map((noticia: Noticia) =>
        this.prepararNoticia(noticia)
      );
    }
    return response;
  }

  // READ - Buscar notícias por setor
  async buscarNoticiasPorSetor(
    setor: string,
    page = 1,
    limit = 10
  ): Promise<
    ApiResponse<{
      noticias: Noticia[];
      totalPages: number;
      currentPage: number;
      total: number;
    }>
  > {
    const response = await this.fetchAPI(
      `/getNoticiasBySetor/${setor}?page=${page}&limit=${limit}`
    );
    // Garantir que todas as notícias tenham as propriedades obrigatórias
    if (response.data.noticias) {
      response.data.noticias = response.data.noticias.map((noticia: Noticia) =>
        this.prepararNoticia(noticia)
      );
    }
    return response;
  }

  // READ - Busca avançada com filtros
  async buscarNoticias(filtros: {
    query?: string;
    entidade?: string;
    setor?: string;
    status?: string;
    prioridade?: string;
    dataInicio?: string;
    dataFim?: string;
    page?: number;
    limit?: number;
  }): Promise<
    ApiResponse<{
      noticias: Noticia[];
      totalPages: number;
      currentPage: number;
      total: number;
      filters: any;
    }>
  > {
    const params = new URLSearchParams();
    Object.entries(filtros).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    const response = await this.fetchAPI(
      `/searchNoticias?${params.toString()}`
    );
    // Garantir que todas as notícias tenham as propriedades obrigatórias
    if (response.data.noticias) {
      response.data.noticias = response.data.noticias.map((noticia: Noticia) =>
        this.prepararNoticia(noticia)
      );
    }
    return response;
  }

  // UPDATE - Aprovar notícia
  async aprovarNoticia(
    id: string,
    aprovador: string,
    comentarios?: string
  ): Promise<ApiResponse<Noticia>> {
    const response = await this.fetchAPI(`/aprovarNoticia/${id}`, {
      method: "PUT",
      body: JSON.stringify({ aprovador, comentarios }),
    });

    // Garantir que a notícia retornada tenha todos os campos
    if (response.data) {
      response.data = this.prepararNoticia(response.data);
    }

    return response;
  }

  // UPDATE - Arquivar notícia
  async arquivarNoticia(id: string): Promise<ApiResponse<Noticia>> {
    const response = await this.fetchAPI(`/arquivarNoticia/${id}`, {
      method: "PUT",
    });

    // Garantir que a notícia retornada tenha todos os campos
    if (response.data) {
      response.data = this.prepararNoticia(response.data);
    }

    return response;
  }

  // DELETE - Deletar notícia
  async deletarNoticia(id: string): Promise<ApiResponse<Noticia>> {
    const response = await this.fetchAPI(`/deleteNoticia/${id}`, {
      method: "DELETE",
    });

    // Garantir que a notícia retornada tenha todos os campos
    if (response.data) {
      response.data = this.prepararNoticia(response.data);
    }

    return response;
  }

  // ESTATÍSTICAS - Obter estatísticas
  async obterEstatisticas(): Promise<ApiResponse<any>> {
    return this.fetchAPI("/estatisticasNoticias");
  }

  // HEALTH CHECK - Verificar se a API está funcionando
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: "GET",
      });
      return response.ok;
    } catch (error) {
      console.error("Health check failed:", error);
      return false;
    }
  }
}

export const noticiaService = new NoticiaService();
