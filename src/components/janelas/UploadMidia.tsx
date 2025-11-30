// components/UploadMidia.tsx
import React, { useCallback, useState } from 'react';
import { ArquivoMidia } from '@/types/noticia';

interface UploadMidiaProps {
  arquivos: File[];
  onArquivosChange: (arquivos: File[]) => void;
  midiasExistentes?: ArquivoMidia[];
  onRemoverMidia?: (midiaId: string) => void;
  noticiaId?: string; // Novo prop para identificar a notícia
  onAdicionarArquivos?: (arquivos: File[]) => Promise<boolean>; // Novo prop para adicionar arquivos
}

export const UploadMidia: React.FC<UploadMidiaProps> = ({
  arquivos,
  onArquivosChange,
  midiasExistentes = [],
  onRemoverMidia,
  noticiaId,
  onAdicionarArquivos
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const novosArquivos = Array.from(e.dataTransfer.files);
      adicionarArquivos(novosArquivos);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const novosArquivos = Array.from(e.target.files);
      adicionarArquivos(novosArquivos);
      // Reset input para permitir selecionar o mesmo arquivo novamente
      e.target.value = '';
    }
  };

  const adicionarArquivos = async (novosArquivos: File[]) => {
    // Validar tipos de arquivo
    const arquivosValidos = novosArquivos.filter(arquivo => {
      const tipo = arquivo.type;
      const tamanhoMaximo = 50 * 1024 * 1024; // 50MB

      if (arquivo.size > tamanhoMaximo) {
        alert(`Arquivo ${arquivo.name} é muito grande. Tamanho máximo: 50MB`);
        return false;
      }

      if (!tipo.startsWith('image/') && !tipo.startsWith('video/') && tipo !== 'application/pdf') {
        alert(`Tipo de arquivo não suportado: ${arquivo.name}. Use imagens, vídeos ou PDFs.`);
        return false;
      }

      return true;
    });

    // Se estamos editando uma notícia existente e temos a função de adicionar arquivos
    if (noticiaId && onAdicionarArquivos && arquivosValidos.length > 0) {
      setUploading(true);
      try {
        const success = await onAdicionarArquivos(arquivosValidos);
        if (success) {
          console.log('✅ Arquivos adicionados com sucesso à notícia existente');
        }
      } catch (error) {
        console.error('❌ Erro ao adicionar arquivos:', error);
      } finally {
        setUploading(false);
      }
    } else {
      // Caso contrário, apenas adiciona aos arquivos selecionados
      onArquivosChange([...arquivos, ...arquivosValidos]);
    }
  };

  const removerArquivo = (index: number) => {
    const novosArquivos = arquivos.filter((_, i) => i !== index);
    onArquivosChange(novosArquivos);
  };

  const formatarTamanho = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getIconePorTipo = (tipo: string) => {
    if (tipo.startsWith('image/')) return '🖼️';
    if (tipo.startsWith('video/')) return '🎥';
    if (tipo === 'application/pdf') return '📄';
    return '📎';
  };

  return (
    <div className="space-y-4">
      {/* Área de Upload */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400'
        } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*,video/*,.pdf"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
        
        <div className="space-y-2">
          <div className="text-4xl">📁</div>
          <div>
            <p className="font-medium text-gray-900">
              {uploading ? 'Enviando arquivos...' : 'Arraste arquivos aqui ou clique para selecionar'}
            </p>
            <p className="text-sm text-gray-500">
              Imagens, vídeos e PDFs até 50MB
            </p>
            {noticiaId && (
              <p className="text-sm text-blue-600 mt-1">
                ⚡ Os arquivos serão salvos automaticamente
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Loading durante upload */}
      {uploading && (
        <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
          <span className="text-blue-700">Enviando arquivos...</span>
        </div>
      )}

      {/* Arquivos Selecionados (apenas para nova notícia) */}
      {!noticiaId && arquivos.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900">Arquivos selecionados ({arquivos.length})</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {arquivos.map((arquivo, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <span className="text-xl">
                    {getIconePorTipo(arquivo.type)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {arquivo.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatarTamanho(arquivo.size)} • {arquivo.type}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removerArquivo(index)}
                  className="ml-4 p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                  disabled={uploading}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mídias Existentes */}
      {midiasExistentes.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900">
            Arquivos {noticiaId ? 'existentes' : 'anexados'} ({midiasExistentes.length})
          </h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {midiasExistentes.map((midia) => (
              <div
                key={midia.id}
                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <span className="text-xl">
                    {midia.tipo === 'imagem' ? '🖼️' : midia.tipo === 'video' ? '🎥' : '📄'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {midia.nome}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatarTamanho(midia.tamanho)} • {midia.tipo}
                    </p>
                    {midia.legenda && (
                      <p className="text-sm text-gray-600 truncate">
                        {midia.legenda}
                      </p>
                    )}
                  </div>
                </div>
                {onRemoverMidia && (
                  <button
                    type="button"
                    onClick={() => onRemoverMidia(midia.id!)}
                    className="ml-4 p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                    disabled={uploading}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};