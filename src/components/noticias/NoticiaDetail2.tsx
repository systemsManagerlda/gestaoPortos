/* eslint-disable @typescript-eslint/no-unused-vars */
// components/NoticiaDetail.tsx
import React, { useState } from "react";
import Image from "next/image";
import { Noticia } from "@/types/noticia";

interface NoticiaDetailProps {
  noticia: Noticia;
  onBack: () => void;
  onEdit: (noticia: Noticia) => void;
  onDelete: (id: string) => void;
}

interface MediaModalProps {
  media: { type: string; url: string; name?: string; legenda?: string; titulo?: string };
  onClose: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "publicado":
      return "bg-green-100 text-green-800 border border-green-200";
    case "rascunho":
      return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    case "revisao":
      return "bg-blue-100 text-blue-800 border border-blue-200";
    case "arquivado":
      return "bg-gray-100 text-gray-800 border border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border border-gray-200";
  }
};

const getPriorityColor = (prioridade: string) => {
  switch (prioridade) {
    case "urgente":
      return "bg-red-100 text-red-800 border border-red-200";
    case "alta":
      return "bg-orange-100 text-orange-800 border border-orange-200";
    case "media":
      return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    case "baixa":
      return "bg-green-100 text-green-800 border border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border border-gray-200";
  }
};

const MediaModal: React.FC<MediaModalProps> = ({ media, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl max-h-[95vh] w-full overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-gray-50 to-white">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {media.name || media.titulo || media.legenda || `Visualização de ${media.type === 'image' ? 'Imagem' : media.type === 'video' ? 'Vídeo' : 'Documento'}`}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {media.type === 'image' ? 'Imagem' : media.type === 'video' ? 'Vídeo' : 'Documento'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            ×
          </button>
        </div>
        
        <div className="p-8 max-h-[70vh] overflow-auto flex items-center justify-center bg-gray-900">
          {media.type === 'image' && (
            <div className="flex justify-center">
              <Image
                src={media.url}
                alt={media.legenda || "Imagem"}
                width={1200}
                height={800}
                className="max-w-full h-auto rounded-lg shadow-2xl"
                style={{ maxHeight: '60vh' }}
              />
            </div>
          )}
          
          {media.type === 'video' && (
            <div className="w-full max-w-4xl">
              <video 
                controls 
                autoPlay
                className="w-full h-auto rounded-lg shadow-2xl"
                src={media.url}
              >
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </div>
          )}
          
          {media.type === 'document' && (
            <div className="w-full h-96 bg-white">
              <iframe
                src={media.url}
                className="w-full h-full border-0 rounded-lg shadow-2xl"
                title={media.name || "Documento"}
              />
            </div>
          )}
        </div>
        
        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-600 block">
                {media.name || media.titulo || media.legenda || "Sem nome"}
              </span>
              <span className="text-xs text-gray-500">
                {media.type === 'image' ? 'Imagem' : media.type === 'video' ? 'Vídeo' : 'Documento'}
              </span>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Fechar
              </button>
              <a
                href={media.url}
                download={media.name}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>📥</span>
                <span>Download</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NoticiaDetail: React.FC<NoticiaDetailProps> = ({
  noticia,
  onBack,
  onEdit,
  onDelete,
}) => {
  const [selectedMedia, setSelectedMedia] = useState<{ type: string; url: string; name?: string; legenda?: string; titulo?: string } | null>(null);

  const handleDelete = () => {
    if (confirm("Tem certeza que deseja excluir esta notícia?")) {
      onDelete(noticia._id!);
    }
  };

  const openMediaModal = (type: string, url: string, name?: string, legenda?: string, titulo?: string) => {
    setSelectedMedia({ type, url, name, legenda, titulo });
  };

  const closeMediaModal = () => {
    setSelectedMedia(null);
  };

  // Função auxiliar para formatar datas
  const formatarData = (dataString?: string) => {
    if (!dataString) return "Não disponível";
    try {
      return new Date(dataString).toLocaleString("pt-BR");
    } catch {
      return "Data inválida";
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Cabeçalho */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-200">
        <div className="flex justify-between items-start mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors group"
          >
            <svg
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Voltar para a lista
          </button>

          <div className="flex space-x-3">
            {/* <button
              onClick={() => onEdit(noticia)}
              className="px-6 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 shadow-sm"
            >
              <span>✏️</span>
              <span>Editar</span>
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 border border-transparent rounded-lg hover:from-red-600 hover:to-red-700 transition-colors flex items-center space-x-2 shadow-sm"
            >
              <span>🗑️</span>
              <span>Excluir</span>
            </button> */}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
              {noticia.titulo}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm border">
                <span className="font-medium text-gray-700 mr-2">Entidade:</span>
                <span className="text-blue-700 font-semibold">
                  {noticia.entidade}
                </span>
              </div>
              <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm border">
                <span className="font-medium text-gray-700 mr-2">Setor:</span>
                <span className="text-green-700 font-semibold">
                  {noticia.setor}
                </span>
              </div>
              <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm border">
                <span className="font-medium text-gray-700 mr-2">Fonte:</span>
                <span className="text-purple-700 font-semibold">
                  {noticia.fonte}
                </span>
              </div>
              <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm border">
                <span className="font-medium text-gray-700 mr-2">Publicação:</span>
                <span className="text-gray-600">
                  {formatarData(noticia.dataPublicacao).split(",")[0]}
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 flex-shrink-0">
            <span
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                noticia.status
              )}`}
            >
              {noticia.status}
            </span>
            <span
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getPriorityColor(
                noticia.prioridade
              )}`}
            >
              {noticia.prioridade}
            </span>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="px-8 py-8">
        {/* Autor e Metadados */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 mb-8 border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="text-center lg:text-left">
              <span className="font-semibold text-gray-700 block mb-2">👤 Autor</span>
              <p className="text-gray-900 font-medium">{noticia.autor.nome}</p>
              {noticia.autor.departamento && (
                <p className="text-gray-600 text-sm">{noticia.autor.departamento}</p>
              )}
              {noticia.autor.cargo && (
                <p className="text-gray-600 text-sm">{noticia.autor.cargo}</p>
              )}
            </div>
            <div className="text-center lg:text-left">
              <span className="font-semibold text-gray-700 block mb-2">👁️ Visibilidade</span>
              <p className="text-gray-900 font-medium capitalize">{noticia.visibilidade}</p>
            </div>
            <div className="text-center lg:text-left">
              <span className="font-semibold text-gray-700 block mb-2">📊 Visualizações</span>
              <p className="text-gray-900 font-medium text-2xl">
                {noticia.estatisticas?.visualizacoes || 0}
              </p>
            </div>
            <div className="text-center lg:text-left">
              <span className="font-semibold text-gray-700 block mb-2">📅 Criado em</span>
              <p className="text-gray-900 font-medium text-sm">
                {formatarData(noticia.dataCriacao).split(",")[0]}
              </p>
            </div>
          </div>
        </div>

        {/* Resumo */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
            Resumo
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed bg-blue-50 p-6 rounded-2xl border border-blue-100 shadow-sm">
            {noticia.resumo}
          </p>
        </div>

        {/* Conteúdo */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
            Conteúdo
          </h2>
          <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm text-lg">
              {noticia.conteudo}
            </div>
          </div>
        </div>

        {/* Mídia em Destaque */}
        {(noticia.imagens?.length > 0 || noticia.videos?.length > 0 || noticia.documentos?.length > 0) && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
              Mídia e Anexos
            </h2>

            {/* Grid de Mídia */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Imagens */}
              {noticia.imagens?.length > 0 && (
                <div className="xl:col-span-3">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">🖼️</span>
                    Galeria de Imagens ({noticia.imagens.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {noticia.imagens.map((imagem, index) => (
                      <div
                        key={index}
                        className="group cursor-pointer transform hover:scale-[1.02] transition-all duration-200"
                        onClick={() => openMediaModal('image', imagem.url, undefined, imagem.legenda)}
                      >
                        <div className="relative h-64 rounded-xl overflow-hidden border-2 border-green-200 shadow-lg">
                          <Image
                            src={imagem.url}
                            alt={imagem.legenda || `Imagem ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          
                          {/* Badge */}
                          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            🖼️ Imagem
                          </div>
                          
                          {/* Legenda */}
                          {imagem.legenda && (
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                              <p className="text-sm font-medium line-clamp-2">
                                {imagem.legenda}
                              </p>
                              <p className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1">
                                Clique para expandir
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vídeos */}
              {noticia.videos?.length > 0 && (
                <div className="xl:col-span-3">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">🎥</span>
                    Vídeos ({noticia.videos.length})
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {noticia.videos.map((video, index) => (
                      <div
                        key={index}
                        className="group cursor-pointer transform hover:scale-[1.01] transition-all duration-200"
                        onClick={() => openMediaModal('video', video.url, undefined, undefined, video.titulo)}
                      >
                        <div className="relative h-64 rounded-xl overflow-hidden border-2 border-purple-200 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500">
                          {/* Thumbnail ou placeholder */}
                          {video.url ? (
                            <Image
                              src={video.url}
                              alt={video.titulo || `Vídeo ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center text-white">
                                <div className="text-4xl mb-3">🎥</div>
                                <p className="text-lg font-semibold">Vídeo</p>
                              </div>
                            </div>
                          )}
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          
                          {/* Ícone de play */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-200">
                              <div className="w-0 h-0 border-l-[16px] border-l-white border-y-[10px] border-y-transparent ml-2"></div>
                            </div>
                          </div>
                          
                          {/* Informações */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <p className="text-lg font-semibold truncate">
                              {video.titulo || `Vídeo ${index + 1}`}
                            </p>
                            <div className="flex items-center justify-between mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <span className="text-sm">Clique para assistir</span>
                              <span className="text-sm bg-white/20 px-2 py-1 rounded">▶️ Assistir</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documentos */}
              {noticia.documentos?.length > 0 && (
                <div className="xl:col-span-3">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">📄</span>
                    Documentos ({noticia.documentos.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {noticia.documentos.map((documento, index) => (
                      <div
                        key={index}
                        className="group cursor-pointer transform hover:scale-[1.01] transition-all duration-200"
                        onClick={() => openMediaModal('document', documento.url, documento.nome)}
                      >
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center text-white text-2xl">
                                📄
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-lg font-semibold text-gray-900 truncate">
                                {documento.nome}
                              </p>
                              <div className="flex items-center space-x-3 mt-2">
                                <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                                  {documento.tipo?.toUpperCase() || 'PDF'}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {Math.round((documento.tamanho || 0) / 1024)} KB
                                </span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <a
                                href={documento.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 text-sm font-semibold text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Abrir
                              </a>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openMediaModal('document', documento.url, documento.nome);
                                }}
                                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                Visualizar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        {noticia.tags && noticia.tags.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
              Tags
            </h2>
            <div className="flex flex-wrap gap-3">
              {noticia.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border border-orange-200 font-medium shadow-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Informações de Datas */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-3 h-3 bg-gray-500 rounded-full mr-3"></span>
            Informações de Datas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <span className="font-semibold text-gray-700 block mb-2">📅 Criação</span>
              <p className="text-gray-900 font-medium">
                {formatarData(noticia.dataCriacao)}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                {noticia.criadoPor || "Sistema"}
              </p>
            </div>
            <div className="text-center">
              <span className="font-semibold text-gray-700 block mb-2">🔄 Atualização</span>
              <p className="text-gray-900 font-medium">
                {formatarData(noticia.dataAtualizacao)}
              </p>
              {noticia.atualizadoPor && (
                <p className="text-gray-600 text-sm mt-1">
                  {noticia.atualizadoPor}
                </p>
              )}
            </div>
            {noticia.dataExpiracao && (
              <div className="text-center">
                <span className="font-semibold text-gray-700 block mb-2">⏰ Expiração</span>
                <p className="text-gray-900 font-medium">
                  {formatarData(noticia.dataExpiracao).split(",")[0]}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Mídia */}
      {selectedMedia && (
        <MediaModal media={selectedMedia} onClose={closeMediaModal} />
      )}
    </div>
  );
};