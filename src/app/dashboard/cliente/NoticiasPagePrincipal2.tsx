// app/noticias/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Noticia, NoticiaFormData } from "@/types/noticia";
import { useNoticias } from "@/types/useNoticias";
import { NoticiaDashboard } from "@/components/janelas/NoticiasDashboard2";
import { NoticiaList } from "@/components/noticias/NoticiaList2";
import { NoticiaForm } from "@/components/noticias/NoticiaForm";
import { NoticiaDetail } from "@/components/noticias/NoticiaDetail2";

type ViewMode = "dashboard" | "list" | "form" | "detail";

export default function NoticiasPage() {
  const {
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
    removerArquivoNoticia
  } = useNoticias();

  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");
  const [editingNoticia, setEditingNoticia] = useState<Noticia | null>(null);
  const [viewingNoticia, setViewingNoticia] = useState<Noticia | null>(null);
  const [filtros, setFiltros] = useState({
    query: "",
    entidade: "",
    setor: "",
    status: "",
  });

  // Carregar dados iniciais
  useEffect(() => {
    if (viewMode === "dashboard") {
      buscarNoticiasUrgentes();
      carregarEstatisticas();
    } else if (viewMode === "list") {
      buscarNoticias(filtros);
    }
  }, [viewMode, filtros]);

  const handleCreate = async (data: NoticiaFormData) => {
    const result = await criarNoticia(data);
    if (result.success) {
      setViewMode("list");
      await buscarNoticias(filtros);
      await carregarEstatisticas();
    }
  };

  const handleUpdate = async (data: NoticiaFormData) => {
    if (editingNoticia?._id) {
      const result = await atualizarNoticia(
        editingNoticia._id,
        data,
        data.autor.nome
      );
      if (result.success) {
        setEditingNoticia(null);
        setViewMode("list");
        await buscarNoticias(filtros);
        await carregarEstatisticas();
      }
    }
  };

  const handleEdit = (noticia: Noticia) => {
    setEditingNoticia(noticia);
    setViewMode("form");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta notícia?")) {
      const result = await deletarNoticia(id);
      if (result.success) {
        // Se estava visualizando a notícia deletada, voltar para a lista
        if (viewingNoticia?._id === id) {
          setViewMode("list");
          setViewingNoticia(null);
        }
        await buscarNoticias(filtros);
        await carregarEstatisticas();
      }
    }
  };

  const handleViewNoticia = async (id: string) => {
    console.log("👀 Visualizando notícia:", id);
    const result = await buscarNoticia(id);
    if (result.success && noticia) {
      setViewingNoticia(noticia);
      setViewMode("detail");
    } else {
      console.error("❌ Erro ao carregar notícia para visualização");
    }
  };

  const handleApprove = async (id: string) => {
    const result = await aprovarNoticia(id, "Usuário Atual");
    if (result.success) {
      await buscarNoticias(filtros);
      await carregarEstatisticas();
    }
  };

  const handleArchive = async (id: string) => {
    const result = await arquivarNoticia(id);
    if (result.success) {
      await buscarNoticias(filtros);
      await carregarEstatisticas();
    }
  };

  const handleBackFromDetail = () => {
    setViewMode("list");
    setViewingNoticia(null);
  };

  const handleBackFromForm = () => {
    setViewMode("list");
    setEditingNoticia(null);
  };

  const noticiasUrgentes = noticias.filter(
    (n) => n.prioridade === "urgente" && n.status === "publicado"
  );
  const noticiasRecentes = noticias
    .filter((n) => n.status === "publicado")
    .sort(
      (a, b) =>
        new Date(b.dataPublicacao).getTime() -
        new Date(a.dataPublicacao).getTime()
    )
    .slice(0, 5);

  return (
    <div className="min-h-screen py-8 text-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        {viewMode !== "detail" && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">
              Notícias
            </h1>
            <p className="mt-2 text-gray-600">
              Gerencie notícias das entidades governamentais
            </p>
          </div>
        )}

        {/* Mensagem de Erro */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-red-800 font-medium">Erro: {error}</p>
                <p className="text-red-600 text-sm mt-1">
                  Verifique se todos os campos obrigatórios foram preenchidos
                  corretamente.
                </p>
              </div>
              <button
                onClick={clearError}
                className="text-red-600 hover:text-red-800"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Navegação - Não mostrar no modo detail */}
        {viewMode !== "detail" && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <div className="flex space-x-4">
              <button
                onClick={() => setViewMode("dashboard")}
                className={`px-4 py-2 rounded-md ${
                  viewMode === "dashboard"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-md ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Lista de Notícias
              </button>
              {/* <button
                onClick={() => {
                  setEditingNoticia(null);
                  setViewMode("form");
                }}
                className={`px-4 py-2 rounded-md ${
                  viewMode === "form"
                    ? "bg-blue-600 text-white"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                Nova Notícia
              </button> */}
            </div>
          </div>
        )}

        {/* Conteúdo Baseado na View */}
        {viewMode === "dashboard" && (
          <NoticiaDashboard
            estatisticas={estatisticas}
            noticiasUrgentes={noticiasUrgentes}
            noticiasRecentes={noticiasRecentes}
            onViewNoticia={handleViewNoticia}
            onCreateNoticia={() => setViewMode("form")}
          />
        )}

        {viewMode === "list" && (
          <>
            {/* Filtros */}
            <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Buscar notícias..."
                  value={filtros.query}
                  onChange={(e) =>
                    setFiltros((prev) => ({ ...prev, query: e.target.value }))
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={filtros.entidade}
                  onChange={(e) =>
                    setFiltros((prev) => ({
                      ...prev,
                      entidade: e.target.value,
                    }))
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todas as entidades</option>
                  <option value="Cornelder">Cornelder</option>
                  <option value="CFM">CFM</option>
                  <option value="Polícia P.T">Polícia P.T</option>
                  <option value="Astro">Astro</option>
                  <option value="INGD">INGD</option>
                  <option value="Município">Município</option>
                  <option value="Governador">Governador</option>
                  <option value="Ministério de Transporte">
                    Ministério de Transporte
                  </option>
                  <option value="Imigração">Imigração</option>
                </select>
                <select
                  value={filtros.setor}
                  onChange={(e) =>
                    setFiltros((prev) => ({ ...prev, setor: e.target.value }))
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos os setores</option>
                  <option value="transportes">Transportes</option>
                  <option value="logistica">Logística</option>
                  <option value="portuario">Portuário</option>
                  <option value="ferroviario">Ferroviário</option>
                  <option value="seguranca">Segurança</option>
                  <option value="imigracao">Imigração</option>
                  <option value="governacao">Governação</option>
                  <option value="emergencia">Emergência</option>
                  <option value="infraestrutura">Infraestrutura</option>
                </select>
                <select
                  value={filtros.status}
                  onChange={(e) =>
                    setFiltros((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos os status</option>
                  <option value="rascunho">Rascunho</option>
                  <option value="revisao">Revisão</option>
                  <option value="publicado">Publicado</option>
                  <option value="arquivado">Arquivado</option>
                </select>
              </div>
            </div>

            <NoticiaList
              noticias={noticias}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleViewNoticia}
              onApprove={handleApprove}
              onArchive={handleArchive}
              loading={loading}
            />
          </>
        )}

        {viewMode === "form" && (
          <NoticiaForm
            noticia={editingNoticia || undefined}
            onSubmit={editingNoticia ? handleUpdate : handleCreate}
            onCancel={handleBackFromForm}
            loading={loading}
            error={error}
            // PASSE AS NOVAS FUNÇÕES:
            onAdicionarArquivos={adicionarArquivosNoticia}
            onRemoverArquivo={removerArquivoNoticia}
          />
        )}

        {viewMode === "detail" && viewingNoticia && (
          <NoticiaDetail
            noticia={viewingNoticia}
            onBack={handleBackFromDetail}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
