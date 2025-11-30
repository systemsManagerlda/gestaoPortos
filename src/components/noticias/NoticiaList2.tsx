/* eslint-disable @typescript-eslint/no-unused-vars */
// components/NoticiaList.tsx
import React, { useState } from "react";
import { Noticia } from "@/types/noticia";
import Image from "next/image";

interface NoticiaListProps {
  noticias: Noticia[];
  onEdit: (noticia: Noticia) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onApprove?: (id: string) => void;
  onArchive?: (id: string) => void;
  loading?: boolean;
}

interface MediaPreviewProps {
  noticia: Noticia;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "publicado":
      return "bg-green-100 text-green-800";
    case "rascunho":
      return "bg-yellow-100 text-yellow-800";
    case "revisao":
      return "bg-blue-100 text-blue-800";
    case "arquivado":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPriorityColor = (prioridade: string) => {
  switch (prioridade) {
    case "urgente":
      return "bg-red-100 text-red-800";
    case "alta":
      return "bg-orange-100 text-orange-800";
    case "media":
      return "bg-yellow-100 text-yellow-800";
    case "baixa":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const MediaPreview: React.FC<MediaPreviewProps> = ({ noticia }) => {
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<{ type: string; url: string; name?: string } | null>(null);

  const openMediaModal = (type: string, url: string, name?: string) => {
    setSelectedMedia({ type, url, name });
    setShowMediaModal(true);
  };

  const closeMediaModal = () => {
    setShowMediaModal(false);
    setSelectedMedia(null);
  };

  const primeiraImagem = noticia.imagens.length > 0 ? noticia.imagens[0] : null;
  const primeiroVideo = noticia.videos.length > 0 ? noticia.videos[0] : null;
  const primeiroDocumento = noticia.documentos.length > 0 ? noticia.documentos[0] : null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Destaque para Imagens */}
        {primeiraImagem && (
          <div 
            className="relative group cursor-pointer transform hover:scale-[1.02] transition-all duration-200"
            onClick={() => openMediaModal('image', primeiraImagem.url, primeiraImagem.legenda)}
          >
            <div className="relative h-48 rounded-lg overflow-hidden border-2 border-green-200 shadow-md">
              <Image
                src={primeiraImagem.url}
                alt={primeiraImagem.legenda || "Imagem da notícia"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              
              {/* Badge de imagem */}
              <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                🖼️ Imagem
              </div>
              
              {/* Contador de imagens */}
              {noticia.imagens.length > 1 && (
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                  +{noticia.imagens.length - 1}
                </div>
              )}
              
              {/* Overlay com informações */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                <p className="text-sm font-medium truncate">
                  {primeiraImagem.legenda || "Imagem da notícia"}
                </p>
                <div className="flex items-center justify-between mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-xs">Clique para expandir</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">📸</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Destaque para Vídeos */}
        {primeiroVideo && (
          <div 
            className="relative group cursor-pointer transform hover:scale-[1.02] transition-all duration-200"
            onClick={() => openMediaModal('video', primeiroVideo.url, primeiroVideo.titulo)}
          >
            <div className="relative h-48 rounded-lg overflow-hidden border-2 border-purple-200 shadow-md bg-gradient-to-br from-purple-500 to-pink-500">
              {/* Thumbnail do vídeo ou placeholder */}
              {primeiroVideo.url ? (
                <Image
                  src={primeiroVideo.url}
                  alt={primeiroVideo.titulo || "Vídeo da notícia"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-2">🎥</div>
                    <p className="text-sm font-medium">Vídeo</p>
                  </div>
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Badge de vídeo */}
              <div className="absolute top-3 left-3 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                🎬 Vídeo
              </div>
              
              {/* Ícone de play */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-200">
                  <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                </div>
              </div>
              
              {/* Contador de vídeos */}
              {noticia.videos.length > 1 && (
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                  +{noticia.videos.length - 1}
                </div>
              )}
              
              {/* Informações do vídeo */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <p className="text-sm font-medium truncate">
                  {primeiroVideo.titulo || "Vídeo da notícia"}
                </p>
                <div className="flex items-center justify-between mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-xs">Clique para assistir</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">▶️</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Destaque para Documentos */}
        {primeiroDocumento && (
          <div 
            className="relative group cursor-pointer transform hover:scale-[1.02] transition-all duration-200"
            onClick={() => openMediaModal('document', primeiroDocumento.url, primeiroDocumento.nome)}
          >
            <div className="relative h-48 rounded-lg overflow-hidden border-2 border-blue-200 shadow-md bg-gradient-to-br from-blue-500 to-cyan-500">
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="text-center text-white">
                  <div className="text-4xl mb-3">📄</div>
                  <p className="text-sm font-medium mb-2 line-clamp-2">
                    {primeiroDocumento.nome || "Documento"}
                  </p>
                  <p className="text-xs opacity-80">
                    {primeiroDocumento.tipo || "PDF"}
                  </p>
                </div>
              </div>
              
              {/* Badge de documento */}
              <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                📋 Documento
              </div>
              
              {/* Contador de documentos */}
              {noticia.documentos.length > 1 && (
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                  +{noticia.documentos.length - 1}
                </div>
              )}
              
              {/* Overlay hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-200 text-white text-center">
                  <div className="text-2xl mb-1">👆</div>
                  <p className="text-xs font-medium">Abrir documento</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal para visualização de mídia */}
      {showMediaModal && selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-6xl max-h-[95vh] w-full overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-gray-50 to-white">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedMedia.name || `Visualização de ${selectedMedia.type === 'image' ? 'Imagem' : selectedMedia.type === 'video' ? 'Vídeo' : 'Documento'}`}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedMedia.type === 'image' ? 'Imagem' : selectedMedia.type === 'video' ? 'Vídeo' : 'Documento'} • {noticia.titulo}
                </p>
              </div>
              <button
                onClick={closeMediaModal}
                className="text-gray-500 hover:text-gray-700 text-3xl p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="p-8 max-h-[70vh] overflow-auto flex items-center justify-center bg-gray-900">
              {selectedMedia.type === 'image' && (
                <div className="flex justify-center">
                  <Image
                    src={selectedMedia.url}
                    alt={selectedMedia.name || "Imagem"}
                    width={1200}
                    height={800}
                    className="max-w-full h-auto rounded-lg shadow-2xl"
                    style={{ maxHeight: '60vh' }}
                  />
                </div>
              )}
              
              {selectedMedia.type === 'video' && (
                <div className="w-full max-w-4xl">
                  <video 
                    controls 
                    autoPlay
                    className="w-full h-auto rounded-lg shadow-2xl"
                    src={selectedMedia.url}
                  >
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                </div>
              )}
              
              {selectedMedia.type === 'document' && (
                <div className="w-full h-96 bg-white">
                  <iframe
                    src={selectedMedia.url}
                    className="w-full h-full border-0 rounded-lg shadow-2xl"
                    title={selectedMedia.name || "Documento"}
                  />
                </div>
              )}
            </div>
            
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-600 block">
                    {selectedMedia.name || "Sem nome"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {selectedMedia.type === 'image' ? 'Imagem' : selectedMedia.type === 'video' ? 'Vídeo' : 'Documento'}
                  </span>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={closeMediaModal}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Fechar
                  </button>
                  <a
                    href={selectedMedia.url}
                    download={selectedMedia.name}
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
      )}
    </>
  );
};

export const NoticiaList: React.FC<NoticiaListProps> = ({
  noticias,
  onEdit,
  onDelete,
  onView,
  onApprove,
  onArchive,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (noticias.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhuma notícia encontrada.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {noticias.map((noticia) => (
        <div
          key={noticia._id}
          className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          <div className="p-6">
            {/* Cabeçalho com título e status */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 mr-4">
                <h3 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight">
                  {noticia.titulo}
                </h3>
                <p className="text-gray-600 mt-2 line-clamp-2">
                  {noticia.resumo}
                </p>
              </div>
              <div className="flex space-x-2 flex-shrink-0">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    noticia.status
                  )}`}
                >
                  {noticia.status}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                    noticia.prioridade
                  )}`}
                >
                  {noticia.prioridade}
                </span>
              </div>
            </div>

            {/* Seção de preview de mídia em destaque */}
            {(noticia.imagens.length > 0 || noticia.videos.length > 0 || noticia.documentos.length > 0) && (
              <MediaPreview noticia={noticia} />
            )}

            {/* Metadados e estatísticas */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <span className="font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                  {noticia.entidade}
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {noticia.autor.nome}
                </span>
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                  {noticia.fonte}
                </span>
                <span className="text-gray-500">
                  {new Date(noticia.dataPublicacao).toLocaleDateString("pt-BR")}
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Contadores de mídia com destaque */}
                {noticia.imagens.length > 0 && (
                  <span className="inline-flex items-center text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200">
                    <span className="mr-2">🖼️</span>
                    {noticia.imagens.length} imagem{noticia.imagens.length > 1 ? 'ns' : ''}
                  </span>
                )}
                {noticia.videos.length > 0 && (
                  <span className="inline-flex items-center text-sm bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-200">
                    <span className="mr-2">🎥</span>
                    {noticia.videos.length} vídeo{noticia.videos.length > 1 ? 's' : ''}
                  </span>
                )}
                {noticia.documentos.length > 0 && (
                  <span className="inline-flex items-center text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                    <span className="mr-2">📄</span>
                    {noticia.documentos.length} doc{noticia.documentos.length > 1 ? 's' : ''}
                  </span>
                )}
                <span className="inline-flex items-center bg-gray-50 text-gray-700 px-3 py-1 rounded-full border border-gray-200">
                  <span className="mr-2">👁️</span>
                  {noticia.estatisticas.visualizacoes}
                </span>
              </div>
            </div>

            {/* Tags e ações */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {noticia.tags.slice(0, 4).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border border-gray-200"
                  >
                    #{tag}
                  </span>
                ))}
                {noticia.tags.length > 4 && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-500">
                    +{noticia.tags.length - 4}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onView(noticia._id!)}
                  className="px-4 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium flex items-center space-x-2"
                >
                  <span>👁️</span>
                  <span>Ver</span>
                </button>

                {noticia.status === "rascunho" && onApprove && (
                  <button
                    onClick={() => onApprove(noticia._id!)}
                    className="px-4 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium flex items-center space-x-2"
                  >
                    <span>✅</span>
                    <span>Aprovar</span>
                  </button>
                )}

                {noticia.status === "publicado" && onArchive && (
                  <button
                    onClick={() => onArchive(noticia._id!)}
                    className="px-4 py-2 text-sm bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors font-medium flex items-center space-x-2"
                  >
                    <span>📦</span>
                    <span>Arquivar</span>
                  </button>
                )}

                {/* <button
                  onClick={() => onEdit(noticia)}
                  className="px-4 py-2 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center space-x-2"
                >
                  <span>✏️</span>
                  <span>Editar</span>
                </button> */}

                {/* <button
                  onClick={() => onDelete(noticia._id!)}
                  className="px-4 py-2 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium flex items-center space-x-2"
                >
                  <span>🗑️</span>
                  <span>Excluir</span>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};