/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useNoticias.ts
import { useState, useEffect } from "react";
import { Noticia, NoticiaFormData } from "@/types/noticia";
import { noticiaService } from "./noticiaService";

interface UseNoticiasReturn {
  noticias: Noticia[];
  noticia: Noticia | null;
  loading: boolean;
  error: string | null;
  estatisticas: any;
  criarNoticia: (
    data: NoticiaFormData
  ) => Promise<{ success: boolean; error?: string }>;
  atualizarNoticia: (
    id: string,
    data: Partial<NoticiaFormData>,
    atualizadoPor: string
  ) => Promise<{ success: boolean; error?: string }>;
  deletarNoticia: (id: string) => Promise<{ success: boolean; error?: string }>;
  buscarNoticia: (id: string) => Promise<{ success: boolean; error?: string }>;
  buscarNoticias: (
    filtros: any
  ) => Promise<{ success: boolean; error?: string }>;
  buscarNoticiasUrgentes: () => Promise<{ success: boolean; error?: string }>;
  aprovarNoticia: (
    id: string,
    aprovador: string
  ) => Promise<{ success: boolean; error?: string }>;
  arquivarNoticia: (
    id: string
  ) => Promise<{ success: boolean; error?: string }>;
  carregarEstatisticas: () => Promise<void>;
  clearError: () => void;
  adicionarArquivosNoticia: (
    noticiaId: string,
    arquivos: File[]
  ) => Promise<{ success: boolean; error?: string }>;
  removerArquivoNoticia: (
    noticiaId: string,
    arquivoId: string
  ) => Promise<{ success: boolean; error?: string }>;
}

export const useNoticias = (): UseNoticiasReturn => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [estatisticas, setEstatisticas] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const handleError = (
    err: any,
    operation: string
  ): { success: false; error: string } => {
    const errorMessage = err.message || `Erro ao ${operation}`;
    console.error(`❌ Erro no ${operation}:`, err);
    setError(errorMessage);
    return { success: false, error: errorMessage };
  };

  const criarNoticia = async (
    data: NoticiaFormData
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    setError(null);

    console.log("🔄 Iniciando criação de notícia:", data);

    try {
      const response = await noticiaService.criarNoticia(data);
      setNoticias((prev) => [response.data, ...prev]);
      console.log("✅ Notícia criada com sucesso:", response.data);
      return { success: true };
    } catch (err: any) {
      return handleError(err, "criar notícia");
    } finally {
      setLoading(false);
    }
  };

  const atualizarNoticia = async (
    id: string,
    data: Partial<NoticiaFormData>,
    atualizadoPor: string
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    setError(null);

    try {
      const response = await noticiaService.atualizarNoticia(
        id,
        data,
        atualizadoPor
      );
      setNoticias((prev) =>
        prev.map((n) => (n._id === id ? response.data : n))
      );
      setNoticia(response.data);
      return { success: true };
    } catch (err: any) {
      return handleError(err, "atualizar notícia");
    } finally {
      setLoading(false);
    }
  };

  const deletarNoticia = async (
    id: string
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    setError(null);

    try {
      await noticiaService.deletarNoticia(id);
      setNoticias((prev) => prev.filter((n) => n._id !== id));
      if (noticia?._id === id) setNoticia(null);
      return { success: true };
    } catch (err: any) {
      return handleError(err, "deletar notícia");
    } finally {
      setLoading(false);
    }
  };

  const buscarNoticia = async (
    id: string
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    setError(null);

    try {
      const response = await noticiaService.buscarNoticia(id);
      setNoticia(response.data);
      return { success: true };
    } catch (err: any) {
      const errorResult = handleError(err, "buscar notícia");
      return errorResult;
    } finally {
      setLoading(false);
    }
  };

  const buscarNoticias = async (
    filtros: any
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    setError(null);

    try {
      const response = await noticiaService.buscarNoticias(filtros);
      setNoticias(response.data.noticias);
      return { success: true };
    } catch (err: any) {
      return handleError(err, "buscar notícias");
    } finally {
      setLoading(false);
    }
  };

  const buscarNoticiasUrgentes = async (): Promise<{
    success: boolean;
    error?: string;
  }> => {
    setLoading(true);
    setError(null);

    try {
      const response = await noticiaService.buscarNoticiasUrgentes();
      setNoticias(response.data);
      return { success: true };
    } catch (err: any) {
      return handleError(err, "buscar notícias urgentes");
    } finally {
      setLoading(false);
    }
  };

  const aprovarNoticia = async (
    id: string,
    aprovador: string
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    setError(null);

    try {
      const response = await noticiaService.aprovarNoticia(id, aprovador);
      setNoticias((prev) =>
        prev.map((n) => (n._id === id ? response.data : n))
      );
      setNoticia(response.data);
      return { success: true };
    } catch (err: any) {
      return handleError(err, "aprovar notícia");
    } finally {
      setLoading(false);
    }
  };

  const adicionarArquivosNoticia = async (
    noticiaId: string,
    arquivos: File[]
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    setError(null);

    try {
      const response = await noticiaService.adicionarArquivosNoticia(
        noticiaId,
        arquivos
      );
      setNoticias((prev) =>
        prev.map((n) => (n._id === noticiaId ? response.data : n))
      );
      if (noticia?._id === noticiaId) setNoticia(response.data);
      return { success: true };
    } catch (err: any) {
      return handleError(err, "adicionar arquivos à notícia");
    } finally {
      setLoading(false);
    }
  };

  const removerArquivoNoticia = async (
    noticiaId: string,
    arquivoId: string
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    setError(null);

    try {
      const response = await noticiaService.removerArquivoNoticia(
        noticiaId,
        arquivoId
      );
      setNoticias((prev) =>
        prev.map((n) => (n._id === noticiaId ? response.data : n))
      );
      if (noticia?._id === noticiaId) setNoticia(response.data);
      return { success: true };
    } catch (err: any) {
      return handleError(err, "remover arquivo da notícia");
    } finally {
      setLoading(false);
    }
  };

  const arquivarNoticia = async (
    id: string
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    setError(null);

    try {
      const response = await noticiaService.arquivarNoticia(id);
      setNoticias((prev) =>
        prev.map((n) => (n._id === id ? response.data : n))
      );
      setNoticia(response.data);
      return { success: true };
    } catch (err: any) {
      return handleError(err, "arquivar notícia");
    } finally {
      setLoading(false);
    }
  };

  const carregarEstatisticas = async (): Promise<void> => {
    try {
      const response = await noticiaService.obterEstatisticas();
      setEstatisticas(response.data);
    } catch (err) {
      console.error("Erro ao carregar estatísticas:", err);
    }
  };

  // Verificar saúde da API ao inicializar
  useEffect(() => {
    const checkAPIHealth = async () => {
      try {
        const isHealthy = await noticiaService.healthCheck();
        if (!isHealthy) {
          console.warn("⚠️ API pode estar indisponível");
        }
      } catch (error) {
        console.error("❌ Falha ao verificar saúde da API:", error);
      }
    };

    checkAPIHealth();
  }, []);

  return {
    noticias,
    noticia,
    loading,
    error,
    estatisticas,
    criarNoticia,
    atualizarNoticia,
    deletarNoticia,
    buscarNoticia,
    buscarNoticias,
    buscarNoticiasUrgentes,
    aprovarNoticia,
    arquivarNoticia,
    carregarEstatisticas,
    clearError,
    adicionarArquivosNoticia,
    removerArquivoNoticia,
  };
};
