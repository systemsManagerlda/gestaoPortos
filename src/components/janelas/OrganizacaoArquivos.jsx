import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

// Configuração da API
const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

// Componentes menores para melhor organização
const DashboardMetrics = ({ data, loading }) => {
  if (loading) return <div className="animate-pulse">Carregando métricas...</div>;
  if (!data) return <div>Nenhum dado disponível</div>;

  const { estatisticasGerais } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total de Documentos</p>
            <p className="text-2xl font-bold text-gray-900">
              {estatisticasGerais.totalDocumentos?.toLocaleString() || '0'}
            </p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <span className="text-blue-600 text-xl">📁</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Espaço Utilizado</p>
            <p className="text-2xl font-bold text-gray-900">
              {estatisticasGerais.totalEspacoFormatado || '0 GB'}
            </p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <span className="text-blue-600 text-xl">💾</span>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-blue-600 text-sm font-medium">
            {estatisticasGerais.documentosAtivos || 0} ativos
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Documentos Vencidos</p>
            <p className="text-2xl font-bold text-gray-900">
              {estatisticasGerais.documentosVencidos || 0}
            </p>
          </div>
          <div className="bg-red-100 p-3 rounded-lg">
            <span className="text-red-600 text-xl">⚠️</span>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-red-600 text-sm font-medium">
            Necessitam atenção
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Para Revisão</p>
            <p className="text-2xl font-bold text-gray-900">
              {estatisticasGerais.precisamRevisao || 0}
            </p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-lg">
            <span className="text-yellow-600 text-xl">📝</span>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-yellow-600 text-sm font-medium">
            Revisão pendente
          </span>
        </div>
      </div>
    </div>
  );
};

const DocumentList = ({ documentos, onView, onDownload, onEdit }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status) => {
    const colors = {
      'ativo': 'bg-green-100 text-green-800',
      'arquivado': 'bg-gray-100 text-gray-800',
      'expirado': 'bg-red-100 text-red-800',
      'pendente_revisao': 'bg-yellow-100 text-yellow-800',
      'em_analise': 'bg-blue-100 text-blue-800',
      'excluido': 'bg-red-100 text-red-800',
      'quarentena': 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    const map = {
      'ativo': 'Ativo',
      'arquivado': 'Arquivado',
      'expirado': 'Expirado',
      'pendente_revisao': 'Pendente Revisão',
      'em_analise': 'Em Análise',
      'excluido': 'Excluído',
      'quarentena': 'Quarentena'
    };
    return map[status] || status;
  };

  const getCategoriaIcon = (categoria) => {
    const icons = {
      'fiscal': '🏛️',
      'operacional': '🚚',
      'juridico': '⚖️',
      'recursos_humanos': '👥',
      'financeiro': '💰',
      'marketing': '📢',
      'ti': '💻',
      'administrativo': '📋',
      'outros': '📄'
    };
    return icons[categoria] || '📄';
  };

  return (
    <div className="space-y-3">
      {documentos.map((doc) => (
        <div key={doc._id || doc.numeroDocumento} 
             className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl">
                {getCategoriaIcon(doc.categoria?.nomeCategoria)}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {doc.nomeArquivo || doc.numeroDocumento}
              </p>
              <p className="text-sm text-gray-600">
                {doc.numeroDocumento} • {formatDate(doc.datas?.dataUpload)}
              </p>
              <div className="flex space-x-2 mt-1">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {doc.categoria?.nomeCategoria || 'Sem categoria'}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(doc.status)}`}>
                  {getStatusText(doc.status)}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                  {formatFileSize(doc.tamanho || 0)}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            {doc.datas?.dataExpiracao && (
              <p className={`text-sm ${doc.estaVencido ? 'text-red-600' : 'text-gray-600'}`}>
                {doc.estaVencido ? 'Venceu' : 'Vence'}: {formatDate(doc.datas.dataExpiracao)}
              </p>
            )}
            <div className="flex space-x-2 mt-2">
              <button 
                onClick={() => onView(doc)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
              >
                Visualizar
              </button>
              {/* <button 
                onClick={() => onDownload(doc)}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
              >
                Download
              </button>
              <button 
                onClick={() => onEdit(doc)}
                className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
              >
                Editar
              </button> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const UploadManager = ({ onUploadComplete }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadConfig, setUploadConfig] = useState({
    empresaId: 1,
    nomeEmpresa: "Mega Centro e Logistica",
    categoria: 'outros',
    classificacao: 'interno',
    dataExpiracao: '',
    tags: '',
    descricao: '',
    usuarioId: 1,
    nomeUsuario: 'Sistema'
  });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = useCallback((files) => {
    const validFiles = Array.from(files).filter(file => {
      // Validar tamanho (50MB)
      if (file.size > 50 * 1024 * 1024) {
        alert(`Arquivo ${file.name} excede 50MB`);
        return false;
      }
      
      // Validar extensão
      const ext = file.name.split('.').pop().toLowerCase();
      const extensoesPermitidas = ["pdf", "doc", "docx", "xls", "xlsx", "jpg", "png", "jpeg", "txt", "csv", "zip", "rar", "ppt", "pptx"];
      
      if (!extensoesPermitidas.includes(ext)) {
        alert(`Extensão .${ext} não é permitida para ${file.name}`);
        return false;
      }
      
      return true;
    });
    
    setSelectedFiles(prev => [...prev, ...validFiles]);
  }, []);

  const handleUpload = useCallback(async () => {
    if (selectedFiles.length === 0) {
      alert('Selecione arquivos para upload');
      return;
    }

    setIsUploading(true);
    setUploadProgress({});

    const resultados = [];

    for (const file of selectedFiles) {
      try {
        // Iniciar progresso
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));

        // Criar FormData
        const formData = new FormData();
        formData.append('file', file);
        
        // Adicionar todos os metadados
        Object.keys(uploadConfig).forEach(key => {
          if (uploadConfig[key] || key === 'empresaId' || key === 'usuarioId') {
            formData.append(key, uploadConfig[key]);
          }
        });

        // Usar a nova rota completa
        const response = await axios.post(
          `${API_BASE_URL}/uploadDocumentoCompleto`, 
          formData, 
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(prev => ({ 
                ...prev, 
                [file.name]: percentCompleted 
              }));
            }
          }
        );

        if (response.data.returnCode === 201) {
          setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
          resultados.push({
            file: file.name,
            success: true,
            data: response.data.data,
            documento: response.data.data.documento
          });
        } else {
          resultados.push({
            file: file.name,
            success: false,
            error: response.data.returnMsg
          });
          setUploadProgress(prev => ({ ...prev, [file.name]: 'error' }));
        }

      } catch (error) {
        console.error(`Erro no upload de ${file.name}:`, error);
        resultados.push({
          file: file.name,
          success: false,
          error: error.message
        });
        setUploadProgress(prev => ({ ...prev, [file.name]: 'error' }));
      }
    }

    // Notificar componente pai
    if (onUploadComplete) {
      onUploadComplete(resultados);
    }

    // Resetar estado
    setTimeout(() => {
      setSelectedFiles([]);
      setUploadProgress({});
      setIsUploading(false);
      
      // Resetar configurações, mas manter alguns valores
      setUploadConfig(prev => ({
        ...prev,
        dataExpiracao: '',
        tags: '',
        descricao: ''
      }));
    }, 2000);

  }, [selectedFiles, uploadConfig, onUploadComplete]);

  const removeFile = useCallback((fileName) => {
    setSelectedFiles(prev => prev.filter(file => file.name !== fileName));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  // Função para pré-visualizar arquivo
  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    
    if (['pdf'].includes(ext)) return '📕';
    if (['doc', 'docx'].includes(ext)) return '📝';
    if (['xls', 'xlsx'].includes(ext)) return '📊';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return '🖼️';
    if (['zip', 'rar'].includes(ext)) return '🗜️';
    if (['ppt', 'pptx'].includes(ext)) return '📽️';
    return '📄';
  };

  return (
    <div className="space-y-6">
      {/* Área de Upload */}
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-white"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="text-4xl mb-4">📁</div>
        <p className="text-lg font-medium text-gray-900 mb-2">
          Arraste e solte seus arquivos aqui
        </p>
        <p className="text-sm text-gray-600 mb-4">
          ou clique para selecionar os arquivos
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.txt,.csv,.zip,.rar,.ppt,.pptx"
        />
        <div className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium inline-block cursor-pointer">
          Selecionar Arquivos
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Formatos suportados: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, JPEG, TXT, CSV, ZIP, RAR, PPT, PPTX
          <br />
          Tamanho máximo: 50MB por arquivo
        </p>
      </div>

      {/* Lista de Arquivos Selecionados */}
      {selectedFiles.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-gray-900">
              📋 Arquivos Selecionados ({selectedFiles.length})
            </h4>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedFiles([])}
                className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Limpar todos
              </button>
            </div>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-lg">
                        {getFileIcon(file.name)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      <span>•</span>
                      <span className="capitalize">
                        {file.name.split('.').pop().toLowerCase()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {uploadProgress[file.name] !== undefined && (
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            uploadProgress[file.name] === 'error' ? 'bg-red-500' :
                            uploadProgress[file.name] === 100 ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ 
                            width: typeof uploadProgress[file.name] === 'number' 
                              ? `${uploadProgress[file.name]}%` 
                              : '100%' 
                          }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium w-12">
                        {typeof uploadProgress[file.name] === 'number' 
                          ? `${uploadProgress[file.name]}%`
                          : uploadProgress[file.name] === 'error' 
                            ? <span className="text-red-500">Erro</span>
                            : <span className="text-green-500">✓</span>
                        }
                      </span>
                    </div>
                  )}
                  
                  <button
                    onClick={() => removeFile(file.name)}
                    className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50"
                    title="Remover arquivo"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Painel de Configurações */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
          <h3 className="font-semibold text-gray-900">⚙️ Configurações do Documento</h3>
          <p className="text-sm text-gray-600 mt-1">
            Aplique estas configurações a todos os arquivos selecionados
          </p>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria <span className="text-red-500">*</span>
              </label>
              <select
                value={uploadConfig.categoria}
                onChange={(e) => setUploadConfig(prev => ({ ...prev, categoria: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                required
              >
                <option value="fiscal">Fiscal</option>
                <option value="operacional">Operacional</option>
                <option value="juridico">Jurídico</option>
                <option value="recursos_humanos">Recursos Humanos</option>
                <option value="financeiro">Financeiro</option>
                <option value="marketing">Marketing</option>
                <option value="ti">TI</option>
                <option value="administrativo">Administrativo</option>
                <option value="outros">Outros</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Classificação <span className="text-red-500">*</span>
              </label>
              <select
                value={uploadConfig.classificacao}
                onChange={(e) => setUploadConfig(prev => ({ ...prev, classificacao: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                required
              >
                <option value="publico">Público</option>
                <option value="interno">Interno</option>
                <option value="confidencial">Confidencial</option>
                <option value="secreto">Secreto</option>
                <option value="restrito">Restrito</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Vencimento
              </label>
              <input
                type="date"
                value={uploadConfig.dataExpiracao}
                onChange={(e) => setUploadConfig(prev => ({ ...prev, dataExpiracao: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                min={new Date().toISOString().split('T')[0]}
              />
              <p className="text-xs text-gray-500 mt-1">
                Deixe em branco para sem vencimento
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <input
                type="text"
                value={uploadConfig.tags}
                onChange={(e) => setUploadConfig(prev => ({ ...prev, tags: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                placeholder="fatura, contrato, importante"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separe por vírgula
              </p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              value={uploadConfig.descricao}
              onChange={(e) => setUploadConfig(prev => ({ ...prev, descricao: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              placeholder="Descreva o conteúdo destes documentos..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Esta descrição será aplicada a todos os arquivos
            </p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                ℹ
              </div>
              <h4 className="font-medium text-gray-900">Informações do Upload</h4>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-600">Total de arquivos:</div>
              <div className="font-medium">{selectedFiles.length}</div>
              
              <div className="text-gray-600">Espaço total:</div>
              <div className="font-medium">
                {(
                  selectedFiles.reduce((total, file) => total + file.size, 0) / 
                  1024 / 1024
                ).toFixed(2)} MB
              </div>
              
              <div className="text-gray-600">Categoria:</div>
              <div className="font-medium capitalize">{uploadConfig.categoria}</div>
              
              <div className="text-gray-600">Classificação:</div>
              <div className="font-medium capitalize">{uploadConfig.classificacao}</div>
            </div>
          </div>
          
          <button
            onClick={handleUpload}
            disabled={selectedFiles.length === 0 || isUploading}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processando {selectedFiles.length} arquivo(s)...</span>
              </>
            ) : (
              <>
                <span className="text-xl">📤</span>
                <span>Iniciar Upload</span>
                <span className="text-sm bg-white/20 px-2 py-1 rounded">
                  {selectedFiles.length} arquivo(s)
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente principal
const OrganizacaoArquivos = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [documentos, setDocumentos] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    curPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPage: 0
  });

  // Filtros
  const [filtros, setFiltros] = useState({
    categoria: '',
    status: '',
    search: '',
    classificacao: '',
    dataInicio: '',
    dataFim: ''
  });

  // Buscar dashboard data
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/getDashboardDocumentos`);
      if (response.data.returnCode === 200) {
        setDashboardData(response.data.data);
      }
    } catch (error) {
      console.error('Erro ao buscar dashboard:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar documentos
  const fetchDocumentos = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/getDocumentosList`, {
        curPage: page,
        pageSize: pagination.pageSize,
        ...filtros
      });
      
      if (response.data.returnCode === 200) {
        setDocumentos(response.data.data.list || []);
        setPagination({
          curPage: response.data.data.curPage,
          pageSize: response.data.data.pageSize,
          totalCount: response.data.data.totalCount,
          totalPage: response.data.data.totalPage
        });
      }
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    } finally {
      setLoading(false);
    }
  }, [filtros, pagination.pageSize]);

  // Buscar categorias
  const fetchCategorias = useCallback(async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/buscarCategorias`);
      if (response.data.returnCode === 200) {
        setCategorias(response.data.data || []);
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  }, []);

  // Download de documento
  const handleDownload = useCallback(async (documento) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/downloadDocumento`, {
        numeroDocumento: documento.numeroDocumento,
        _id: documento._id
      });
      
      if (response.data.returnCode === 200) {
        // Criar link para download
        const link = document.createElement('a');
        link.href = response.data.data.urlDownload || '#';
        link.download = documento.nomeArquivo;
        link.click();
        
        // Atualizar estatísticas
        fetchDocumentos();
      }
    } catch (error) {
      console.error('Erro ao fazer download:', error);
      alert('Erro ao fazer download: ' + error.message);
    }
  }, [fetchDocumentos]);

  // Visualizar documento
  const handleView = useCallback(async (documento) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/getDocumentoDetail`, {
        numeroDocumento: documento.numeroDocumento,
        _id: documento._id
      });
      
      if (response.data.returnCode === 200) {
        // Abrir em nova aba se tiver URL
        if (response.data.data.armazenamento?.urlAcesso) {
          window.open(response.data.data.armazenamento.urlAcesso, '_blank');
        } else {
          alert('Documento carregado com sucesso!');
          // Aqui você pode mostrar os detalhes em um modal
          console.log('Detalhes do documento:', response.data.data);
        }
      }
    } catch (error) {
      console.error('Erro ao visualizar documento:', error);
      alert('Erro ao visualizar documento: ' + error.message);
    }
  }, []);

  // Arquivar documento
  const handleArchive = useCallback(async (documento) => {
    if (!window.confirm(`Arquivar documento ${documento.numeroDocumento}?`)) {
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/arquivarDocumento`, {
        numeroDocumento: documento.numeroDocumento,
        usuario: 'Usuário Sistema', // Trocar por usuário real
        motivo: 'Arquivamento manual'
      });
      
      if (response.data.returnCode === 200) {
        alert('Documento arquivado com sucesso!');
        fetchDocumentos();
      }
    } catch (error) {
      console.error('Erro ao arquivar documento:', error);
      alert('Erro ao arquivar documento: ' + error.message);
    }
  }, [fetchDocumentos]);

  // Atualizar filtros
  const handleFilterChange = (name, value) => {
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    fetchDocumentos(1);
  };

  const resetFilters = () => {
    setFiltros({
      categoria: '',
      status: '',
      search: '',
      classificacao: '',
      dataInicio: '',
      dataFim: ''
    });
  };

  const handleUploadComplete = useCallback((resultados) => {
    const sucesso = resultados.filter(r => r.success).length;
    const falhas = resultados.filter(r => !r.success).length;
    
    // Mostrar notificação
    if (sucesso > 0) {
      alert(`✅ ${sucesso} documento(s) carregado(s) com sucesso!`);
      
      // Se houver falhas, mostrar detalhes
      if (falhas > 0) {
        const falhasDetalhes = resultados
          .filter(r => !r.success)
          .map(r => `${r.file}: ${r.error}`)
          .join('\n');
        
        alert(`⚠️ ${falhas} arquivo(s) falharam:\n${falhasDetalhes}`);
      }
      
      // Atualizar lista se estiver na aba de documentos
      if (activeTab === 'documentos') {
        fetchDocumentos();
      }
      
      // Atualizar dashboard
      if (activeTab === 'dashboard') {
        fetchDashboardData();
      }
    } else {
      alert('❌ Nenhum arquivo foi carregado com sucesso.');
    }
  }, [activeTab, fetchDocumentos, fetchDashboardData]);

  // Efeitos
  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchDashboardData();
    } else if (activeTab === 'documentos') {
      fetchDocumentos();
    } else if (activeTab === 'categorias') {
      fetchCategorias();
    }
  }, [activeTab, fetchDashboardData, fetchDocumentos, fetchCategorias]);

  // Renderização principal
  return (
    <div className="h-full flex flex-col bg-gray-50 text-gray-900">
      {/* Cabeçalho */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            📁
          </span>
          Organização de Arquivos - Gestão Documental 
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Sistema completo de gestão, organização e controle de documentos da empresa
        </p>
      </div>

      {/* Navegação */}
      <div className="flex space-x-4 p-6 border-b border-gray-200 bg-white shadow-sm">
        {['dashboard', 'documentos', 'categorias', 'upload', 'backup'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
              activeTab === tab
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>
              {tab === 'dashboard' && '📊'}
              {tab === 'documentos' && '📄'}
              {tab === 'categorias' && '🗂️'}
              {tab === 'upload' && '📤'}
              {tab === 'backup' && '💾'}
            </span>
            <span className="capitalize">
              {tab === 'dashboard' && 'Dashboard'}
              {tab === 'documentos' && 'Documentos'}
              {tab === 'categorias' && 'Categorias'}
              {tab === 'upload' && 'Upload'}
              {tab === 'backup' && 'Backup'}
            </span>
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-6 overflow-auto">
        {loading && activeTab !== 'upload' && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Dashboard */}
        {activeTab === 'dashboard' && !loading && (
          <div className="space-y-6">
            <DashboardMetrics data={dashboardData} loading={loading} />
            
            {/* Documentos Recentes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900">📋 Documentos Recentes</h3>
                </div>
                <div className="p-4">
                  {documentos.slice(0, 5).length > 0 ? (
                    <DocumentList
                      documentos={documentos.slice(0, 5)}
                      onView={handleView}
                      onDownload={handleDownload}
                      onEdit={() => {}}
                    />
                  ) : (
                    <p className="text-gray-500 text-center py-4">Nenhum documento recente</p>
                  )}
                </div>
              </div>

              {/* Documentos por Categoria */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900">📊 Distribuição por Categoria</h3>
                </div>
                <div className="p-4">
                  {dashboardData?.documentosPorCategoria?.length > 0 ? (
                    <div className="space-y-4">
                      {dashboardData.documentosPorCategoria.slice(0, 5).map((cat, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className={`w-3 h-3 rounded-full ${
                              index === 0 ? 'bg-blue-500' :
                              index === 1 ? 'bg-green-500' :
                              index === 2 ? 'bg-yellow-500' :
                              index === 3 ? 'bg-red-500' : 'bg-purple-500'
                            }`}></span>
                            <span className="text-sm font-medium text-gray-700 capitalize">
                              {cat._id || 'Sem categoria'}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  index === 0 ? 'bg-blue-500' :
                                  index === 1 ? 'bg-green-500' :
                                  index === 2 ? 'bg-yellow-500' :
                                  index === 3 ? 'bg-red-500' : 'bg-purple-500'
                                }`}
                                style={{ 
                                  width: `${Math.min((cat.count / (dashboardData.documentosPorCategoria[0]?.count || 1)) * 100, 100)}%` 
                                }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                              {cat.count} docs
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">Nenhum dado disponível</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Documentos */}
        {activeTab === 'documentos' && !loading && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">📄 Gestão de Documentos</h3>
              </div>
              
              {/* Filtros */}
              <div className="p-6 border-b border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={filtros.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  
                  <select 
                    value={filtros.categoria}
                    onChange={(e) => handleFilterChange('categoria', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Todas as Categorias</option>
                    {categorias.map((cat) => (
                      <option key={cat._id} value={cat.nome}>
                        {cat.nome}
                      </option>
                    ))}
                  </select>
                  
                  <select 
                    value={filtros.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Todos os Status</option>
                    <option value="ativo">Ativo</option>
                    <option value="arquivado">Arquivado</option>
                    <option value="expirado">Expirado</option>
                    <option value="pendente_revisao">Pendente Revisão</option>
                    <option value="em_analise">Em Análise</option>
                  </select>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={applyFilters}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium flex-1"
                    >
                      🔍 Filtrar
                    </button>
                    <button 
                      onClick={resetFilters}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium"
                    >
                      ⟲
                    </button>
                  </div>
                </div>
                
                {/* Datas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data Início
                    </label>
                    <input
                      type="date"
                      value={filtros.dataInicio}
                      onChange={(e) => handleFilterChange('dataInicio', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data Fim
                    </label>
                    <input
                      type="date"
                      value={filtros.dataFim}
                      onChange={(e) => handleFilterChange('dataFim', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* Lista de Documentos */}
              <div className="p-6">
                {documentos.length > 0 ? (
                  <DocumentList
                    documentos={documentos}
                    onView={handleView}
                    onDownload={handleDownload}
                    onEdit={() => {}}
                  />
                ) : (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">📄</div>
                    <p className="text-gray-600">Nenhum documento encontrado</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Tente ajustar os filtros ou adicionar novos documentos
                    </p>
                  </div>
                )}
                
                {/* Paginação */}
                {pagination.totalPage > 1 && (
                  <div className="flex justify-center items-center space-x-4 mt-6">
                    <button
                      onClick={() => fetchDocumentos(pagination.curPage - 1)}
                      disabled={pagination.curPage === 1}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ← Anterior
                    </button>
                    
                    <span className="text-sm text-gray-600">
                      Página {pagination.curPage} de {pagination.totalPage}
                    </span>
                    
                    <button
                      onClick={() => fetchDocumentos(pagination.curPage + 1)}
                      disabled={pagination.curPage === pagination.totalPage}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Próxima →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Upload - Usando o novo UploadManager */}
        {activeTab === 'upload' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">📤 Upload de Documentos</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Faça upload de documentos que serão armazenados no S3 e catalogados automaticamente
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      S3 + MongoDB
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <UploadManager onUploadComplete={handleUploadComplete} />
              </div>
            </div>
            
            {/* Informações do Sistema */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h4 className="font-semibold text-gray-900 mb-3">ℹ️ Como funciona</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                      1
                    </div>
                    <h5 className="font-medium text-gray-900">Upload para S3</h5>
                  </div>
                  <p className="text-sm text-gray-600">
                    O arquivo é enviado para o Amazon S3 com nome único e link gerado automaticamente
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                      2
                    </div>
                    <h5 className="font-medium text-gray-900">Catalogar no MongoDB</h5>
                  </div>
                  <p className="text-sm text-gray-600">
                    Metadados, hash, categorias e o link do S3 são salvos no banco de dados
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white">
                      3
                    </div>
                    <h5 className="font-medium text-gray-900">Disponibilizar</h5>
                  </div>
                  <p className="text-sm text-gray-600">
                    Documento fica disponível para visualização, download e gestão no sistema
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Backup (Placeholder) */}
        {activeTab === 'backup' && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">💾</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Sistema de Backup</h3>
            <p className="text-gray-600">Funcionalidade em desenvolvimento</p>
            <p className="text-sm text-gray-500 mt-2">
              Em breve você poderá gerenciar backups e restaurações aqui
            </p>
          </div>
        )}

        {/* Categorias (Placeholder) */}
        {activeTab === 'categorias' && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🗂️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Gestão de Categorias</h3>
            <p className="text-gray-600">Funcionalidade em desenvolvimento</p>
            <p className="text-sm text-gray-500 mt-2">
              Em breve você poderá criar e gerenciar categorias aqui
            </p>
          </div>
        )}
      </div>

      {/* Rodapé com estatísticas */}
      <div className="border-t border-gray-200 bg-white p-4 text-sm text-gray-600">
        <div className="flex justify-between items-center">
          <div>
            {dashboardData && (
              <>
                <span className="font-medium">{dashboardData.estatisticasGerais?.totalDocumentos || 0}</span> documentos • 
                <span className="font-medium ml-2">{dashboardData.estatisticasGerais?.documentosAtivos || 0}</span> ativos • 
                <span className="font-medium ml-2">{dashboardData.estatisticasGerais?.documentosVencidos || 0}</span> vencidos
              </>
            )}
          </div>
          <div>
            <span className="text-green-600 font-medium">Sistema Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizacaoArquivos;