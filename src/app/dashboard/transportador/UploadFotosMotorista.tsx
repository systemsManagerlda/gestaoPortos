/* eslint-disable @typescript-eslint/no-unused-vars */
// UploadFotosMotorista.tsx
import React, { useState, useCallback } from 'react';
import { FiUpload, FiImage, FiX, FiTrash2, FiEye, FiUser, FiCheck, FiAlertCircle, FiCamera } from 'react-icons/fi';

interface FotoMotorista {
  url: string;
  tipo: 'principal' | 'documento' | 'uniforme' | 'outro';
  descricao?: string;
  dataUpload: Date;
  nomeArquivo: string;
}

interface UploadFotosMotoristaProps {
  motoristaId: number;
  nomeMotorista: string;
  onUploadComplete: (fotos: FotoMotorista[]) => void;
  fotoPrincipalExistentes: string; // URL da foto principal existente
  fotosAdicionaisExistentes: string[]; // URLs de fotos adicionais existentes
}

export function UploadFotosMotorista({
  motoristaId,
  nomeMotorista,
  onUploadComplete,
  fotoPrincipalExistentes = '',
  fotosAdicionaisExistentes = []
}: UploadFotosMotoristaProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [tipoUpload, setTipoUpload] = useState<'principal' | 'documento' | 'uniforme' | 'outro'>('principal');
  const [descricao, setDescricao] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [fotos, setFotos] = useState<FotoMotorista[]>(
    [
      // Foto principal
      ...(fotoPrincipalExistentes ? [{
        url: fotoPrincipalExistentes,
        tipo: 'principal' as const,
        dataUpload: new Date(),
        nomeArquivo: 'foto-principal.jpg'
      }] : []),
      
      // Fotos adicionais
      ...fotosAdicionaisExistentes.map(url => ({
        url,
        tipo: 'outro' as const,
        dataUpload: new Date(),
        nomeArquivo: url.split('/').pop() || 'foto.jpg'
      }))
    ]
  );

  // Função para fazer upload usando a rota docUpload
  const uploadParaS3 = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('nomeEmpresa', 'Mega Centro e Logistica');

    const response = await fetch('https://desktop-api-4f850b3f9733.herokuapp.com/docUpload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Erro no upload do arquivo');
    }

    const url = await response.text();
    return url;
  };

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const novasFotos: FotoMotorista[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validar tamanho do arquivo (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`Arquivo ${file.name} excede o limite de 5MB`);
        }

        // Validar tipo de arquivo
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
          throw new Error(`Tipo de arquivo não suportado: ${file.name}. Use apenas JPG, PNG ou GIF.`);
        }

        // Fazer upload para S3
        const url = await uploadParaS3(file);
        
        // Limpar URL (remover aspas)
        const urlLimpa = url.replace(/^"+|"+$/g, '').trim().replace('https:/', 'https://');
        
        // Criar objeto da foto
        const novaFoto: FotoMotorista = {
          url: urlLimpa,
          tipo: tipoUpload,
          descricao: descricao || undefined,
          dataUpload: new Date(),
          nomeArquivo: file.name
        };

        novasFotos.push(novaFoto);
        
        // Atualizar progresso
        setProgress(((i + 1) / files.length) * 100);
      }

      // Se for upload de foto principal, substituir a existente
      let todasFotos: FotoMotorista[];
      if (tipoUpload === 'principal') {
        // Remover foto principal antiga
        const fotosSemPrincipal = fotos.filter(f => f.tipo !== 'principal');
        todasFotos = [...novasFotos, ...fotosSemPrincipal];
      } else {
        todasFotos = [...fotos, ...novasFotos];
      }
      
      setFotos(todasFotos);
      
      // Resetar descrição
      setDescricao('');
      
      // Mostrar mensagem de sucesso
      setSuccess(`${novasFotos.length} foto(s) carregada(s) com sucesso!`);
      
      // Notificar componente pai
      onUploadComplete(todasFotos);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer upload das fotos');
    } finally {
      setUploading(false);
      setProgress(0);
      
      // Limpar input de arquivo
      event.target.value = '';
    }
  }, [fotos, tipoUpload, descricao, onUploadComplete]);

  const handleDeleteFoto = async (index: number) => {
    try {
      const novasFotos = fotos.filter((_, i) => i !== index);
      setFotos(novasFotos);
      onUploadComplete(novasFotos);
      
      setSuccess('Foto removida com sucesso!');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao remover foto');
    }
  };

  const atualizarMotoristaNoBackend = async (fotoPrincipal: string, fotosAdicionais: string[]) => {
    try {
      // Atualizar o motorista no backend
      const response = await fetch('https://desktop-api-4f850b3f9733.herokuapp.com/atualizarFotosMotorista', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          motoristaId,
          foto: fotoPrincipal,
          fotos: fotosAdicionais
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar fotos no sistema');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar motorista:', error);
      throw error;
    }
  };

  const handleSalvarFotos = async () => {
    try {
      setUploading(true);
      
      // Separar foto principal das demais
      const fotoPrincipal = fotos.find(f => f.tipo === 'principal')?.url || '';
      const fotosAdicionais = fotos
        .filter(f => f.tipo !== 'principal')
        .map(f => f.url);

      // Atualizar no backend
      await atualizarMotoristaNoBackend(fotoPrincipal, fotosAdicionais);
      
      setSuccess('Fotos salvas no sistema com sucesso!');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar fotos');
    } finally {
      setUploading(false);
    }
  };

  const formatarData = (data: Date) => {
    return new Date(data).toLocaleDateString('pt-MZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatarTamanhoNome = (nome: string) => {
    if (nome.length > 20) {
      return nome.substring(0, 17) + '...';
    }
    return nome;
  };

  const fotoPrincipal = fotos.find(f => f.tipo === 'principal');
  const fotosAdicionais = fotos.filter(f => f.tipo !== 'principal');

  // Função para limpar URL
  const limparUrl = (url: string) => {
    if (!url) return '';
    return url.replace(/^"+|"+$/g, '').trim().replace('https:/', 'https://');
  };

  // Verificar se URL é válida
  const urlValida = (url: string) => {
    const urlLimpa = limparUrl(url);
    return urlLimpa && urlLimpa.startsWith('http');
  };

  return (
    <div className="space-y-6">
      {/* Foto Principal Preview */}
      {fotoPrincipal && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
            <FiUser className="w-5 h-5 mr-2 text-blue-600" />
            Foto Principal do Motorista
          </h3>
          
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <img
                src={limparUrl(fotoPrincipal.url)}
                alt={`Foto de ${nomeMotorista}`}
                className="w-full h-full object-cover rounded-full border-4 border-blue-200"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTVlNSIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSI0MCIgZmlsbD0iIzk5OSIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjUwIiByPSIyMCIgZmlsbD0iIzk5OSIvPjwvc3ZnPg==';
                }}
              />
              <button
                onClick={() => handleDeleteFoto(fotos.findIndex(f => f.url === fotoPrincipal.url))}
                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                title="Remover foto principal"
              >
                <FiTrash2 className="w-3 h-3" />
              </button>
            </div>
            <button
              onClick={() => setTipoUpload('principal')}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Trocar Foto Principal
            </button>
          </div>
        </div>
      )}

      {/* Controles de Upload */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tipo de Foto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tipo de Foto
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTipoUpload('principal')}
                className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg border ${
                  tipoUpload === 'principal'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <FiUser className="w-4 h-4" />
                <span>Principal</span>
              </button>
              
              <button
                type="button"
                onClick={() => setTipoUpload('documento')}
                className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg border ${
                  tipoUpload === 'documento'
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <FiFileText className="w-4 h-4" />
                <span>Documento</span>
              </button>
              
              <button
                type="button"
                onClick={() => setTipoUpload('uniforme')}
                className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg border ${
                  tipoUpload === 'uniforme'
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <FiCamera className="w-4 h-4" />
                <span>Uniforme</span>
              </button>
              
              <button
                type="button"
                onClick={() => setTipoUpload('outro')}
                className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg border ${
                  tipoUpload === 'outro'
                    ? 'border-gray-500 bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <FiImage className="w-4 h-4" />
                <span>Outro</span>
              </button>
            </div>
          </div>

          {/* Descrição (opcional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descrição (opcional)
            </label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder={`Ex: ${tipoUpload === 'principal' ? 'Foto 3x4 oficial' : tipoUpload === 'documento' ? 'Carta condução' : 'Foto com uniforme da empresa'}`}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Botão de Upload */}
        <div className="mt-4">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
            <div className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
              uploading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
            } text-white`}>
              <FiUpload className="w-5 h-5" />
              <span>
                {uploading ? 'Enviando...' : `Upload de Fotos ${tipoUpload === 'principal' ? 'Principal' : tipoUpload}`}
              </span>
            </div>
          </label>
          
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
            Formatos: JPG, PNG, GIF (Máx. 5MB por imagem)
          </p>
        </div>

        {/* Progresso do Upload */}
        {uploading && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>Upload em progresso...</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Botão para salvar no sistema */}
        {fotos.length > 0 && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSalvarFotos}
              disabled={uploading}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiCheck className="w-4 h-4" />
              <span>{uploading ? 'Salvando...' : 'Salvar Fotos no Sistema'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Mensagens de Status */}
      {error && (
        <div className="flex items-center space-x-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <FiAlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center space-x-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <FiCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="text-sm text-green-600 dark:text-green-400">{success}</span>
        </div>
      )}

      {/* Galeria de Fotos Adicionais */}
      {fotosAdicionais.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <FiImage className="w-5 h-5 mr-2 text-purple-600" />
              Fotos Adicionais ({fotosAdicionais.length})
            </h3>
            <button
              onClick={() => setTipoUpload('outro')}
              className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
            >
              Adicionar mais
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {fotosAdicionais.map((foto, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={limparUrl(foto.url)}
                    alt={foto.descricao || `Foto adicional ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTVlNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjNlbSIgZmlsbD0iIzk5OSI+SW1hZ2VtPC90ZXh0Pjwvc3ZnPg==';
                    }}
                  />
                  
                  {/* Overlay com ações */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          const urlLimpa = limparUrl(foto.url);
                          if (urlValida(urlLimpa)) {
                            window.open(urlLimpa, '_blank');
                          }
                        }}
                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                        title="Visualizar"
                      >
                        <FiEye className="w-4 h-4 text-gray-700" />
                      </button>
                      <button
                        onClick={() => handleDeleteFoto(
                          fotos.findIndex(f => f.url === foto.url)
                        )}
                        className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors"
                        title="Remover"
                      >
                        <FiTrash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2">
                  <div className="flex items-center space-x-1 mb-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      foto.tipo === 'documento' ? 'bg-green-100 text-green-800' :
                      foto.tipo === 'uniforme' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {foto.tipo}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {foto.descricao || formatarTamanhoNome(foto.nomeArquivo)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {formatarData(foto.dataUpload)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mensagem quando não há fotos */}
      {fotos.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
          <FiImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Nenhuma foto carregada
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Adicione uma foto principal do motorista e fotos adicionais para documentação completa.
          </p>
          <button
            onClick={() => setTipoUpload('principal')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Adicionar Foto Principal
          </button>
        </div>
      )}

      {/* Estatísticas */}
      {fotos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {fotoPrincipal ? 1 : 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Foto Principal
            </div>
          </div>
          
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-xl font-bold text-green-600 dark:text-green-400">
              {fotosAdicionais.filter(f => f.tipo === 'documento').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Documentos
            </div>
          </div>
          
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
              {fotosAdicionais.filter(f => f.tipo === 'uniforme').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Uniformes
            </div>
          </div>
          
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
            <div className="text-xl font-bold text-gray-600 dark:text-gray-400">
              {fotos.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Fotos
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Adicione este import se FiFileText não estiver disponível
import { FiFileText } from 'react-icons/fi';