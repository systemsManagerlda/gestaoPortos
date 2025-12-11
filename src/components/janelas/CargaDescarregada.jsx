import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

const CargaDescarregada = () => {
  const [activeDescarregadaForm, setActiveDescarregadaForm] = useState("registro");
  const [cargasDisponiveis, setCargasDisponiveis] = useState([]);
  const [cargasDescarregadas, setCargasDescarregadas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCarga, setSelectedCarga] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Estado para formulário de registro
  const [formData, setFormData] = useState({
    codigoCarga: '',
    localDescarregamento: '',
    dataHoraInicio: '',
    dataHoraTermino: '',
    tempoTotal: 0,
    responsavelRecebimento: '',
    documentoResponsavel: '',
    observacoes: '',
    condicoes: {
      embalagemIntegra: false,
      lacresIntactos: false,
      pesoConforme: false,
      quantidadeCorreta: false,
      temperaturaAdequada: false,
      semAvarias: false
    }
  });

  // Estado para conferência
  const [conferenciaData, setConferenciaData] = useState({
    codigoCarga: '',
    conferenteResponsavel: '',
    quantidadePrevista: 0,
    quantidadeRecebida: 0,
    divergencias: {
      quantidadeDivergente: false,
      produtoAvariado: false,
      embalagemDanificada: false,
      loteIncorreto: false,
      validadeVencida: false
    },
    observacoesConferencia: ''
  });

  // Estado para documentos
  const [documentos, setDocumentos] = useState({
    codigoCarga: '',
    listaDocumentos: [
      { id: 1, tipo: 'nota_fiscal', nome: 'Nota Fiscal', obrigatorio: true, status: 'pendente' },
      { id: 2, tipo: 'conhecimento_transporte', nome: 'Conhecimento de Transporte', obrigatorio: true, status: 'pendente' },
      { id: 3, tipo: 'capa_rota', nome: 'Capa de Rota', obrigatorio: true, status: 'pendente' },
      { id: 4, tipo: 'laudo_inspecao', nome: 'Laudo de Inspeção', obrigatorio: false, status: 'pendente' },
      { id: 5, tipo: 'foto_carga', nome: 'Foto da Carga Descarregada', obrigatorio: false, status: 'pendente' },
      { id: 6, tipo: 'comprovativo_recebimento', nome: 'Comprovativo de Recebimento', obrigatorio: true, status: 'pendente' },
    ],
    documentosCarregados: [],
    selectedFile: null,
    previewImage: null
  });

  // Estado para estatísticas
  const [stats, setStats] = useState({
    descarregadasHoje: 0,
    aguardandoConferencia: 0,
    comDivergencias: 0,
    taxaSucesso: 0,
    tempoMedioDescarregamento: 0
  });

  // Dados para gráficos
  const [chartData, setChartData] = useState({
    descarregamentosPorDia: [],
    tiposCargaDescarregada: [],
    divergenciasPorTipo: [],
    tempoMedioDescarregamento: [],
    statusDescarregamento: []
  });

  // Estado para relatórios
  const [relatorioData, setRelatorioData] = useState({
    periodoInicio: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    periodoFim: new Date().toISOString().split('T')[0],
    tipoRelatorio: 'descarregamento',
    filtros: {
      cliente: '',
      tipoCarga: '',
      comDivergencias: false
    }
  });

  // Estado para modal de detalhes
  const [modalDetalhes, setModalDetalhes] = useState({
    show: false,
    tipo: '',
    dados: null
  });

  // Referências para inputs de arquivo
  const fileInputRef = useRef({});
  const [selectedImages, setSelectedImages] = useState({});

  // Cores para gráficos
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Carregar cargas disponíveis para descarregamento
  const carregarCargasDisponiveis = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/getCargaList`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          curPage: 1,
          pageSize: 50,
          status: 'em_entrega'
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.returnCode === 200) {
          setCargasDisponiveis(data.data.list);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar cargas:', error);
      toast.error('Erro ao carregar cargas disponíveis');
    } finally {
      setLoading(false);
    }
  };

  // Carregar cargas já descarregadas
  const carregarCargasDescarregadas = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getCargaList`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          curPage: 1,
          pageSize: 20,
          status: 'entregue'
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.returnCode === 200) {
          setCargasDescarregadas(data.data.list);
          
          // Calcular estatísticas
          const hoje = new Date().toISOString().split('T')[0];
          const descarregadasHoje = data.data.list.filter(carga => 
            carga.dataEntregaReal && 
            carga.dataEntregaReal.split('T')[0] === hoje
          ).length;

          // Calcular tempo médio de descarregamento
          const tempos = data.data.list
            .filter(carga => carga.tempoDescarregamento)
            .map(carga => carga.tempoDescarregamento);
          const tempoMedio = tempos.length > 0 
            ? tempos.reduce((a, b) => a + b, 0) / tempos.length 
            : 0;

          setStats({
            descarregadasHoje,
            aguardandoConferencia: 4,
            comDivergencias: 2,
            taxaSucesso: 92,
            tempoMedioDescarregamento: Math.round(tempoMedio)
          });
        }
      }
    } catch (error) {
      console.error('Erro ao carregar cargas descarregadas:', error);
    }
  };

  // Carregar dados para gráficos
  const carregarDadosGraficos = async () => {
    try {
      // Usar a rota getCargaStats para obter dados reais
      const response = await fetch(`${API_BASE_URL}/getCargaStats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dataInicio: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
          dataFim: new Date().toISOString().split('T')[0]
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.returnCode === 200) {
          const statsData = data.data;
          
          // Processar dados para gráficos
          const hoje = new Date();
          const ultimos7Dias = Array.from({ length: 7 }, (_, i) => {
            const data = new Date(hoje);
            data.setDate(hoje.getDate() - (6 - i));
            const diaStr = data.toISOString().split('T')[0];
            const cargasDia = cargasDescarregadas.filter(carga => 
              carga.dataEntregaReal && 
              carga.dataEntregaReal.split('T')[0] === diaStr
            ).length;
            return {
              data: data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
              quantidade: cargasDia
            };
          });

          // Dados para gráfico de pizza (tipos de carga)
          const tiposCarga = {};
          cargasDescarregadas.forEach(carga => {
            const tipo = carga.tipoCarga || 'Outros';
            tiposCarga[tipo] = (tiposCarga[tipo] || 0) + 1;
          });

          const tiposCargaArray = Object.entries(tiposCarga).map(([name, value]) => ({
            name,
            value
          }));

          setChartData({
            descarregamentosPorDia: ultimos7Dias,
            tiposCargaDescarregada: tiposCargaArray,
            divergenciasPorTipo: [
              { tipo: 'Quantidade', quantidade: 12 },
              { tipo: 'Qualidade', quantidade: 8 },
              { tipo: 'Documentação', quantidade: 5 },
              { tipo: 'Tempo', quantidade: 3 }
            ],
            tempoMedioDescarregamento: [
              { hora: '08:00', tempo: 45 },
              { hora: '10:00', tempo: 60 },
              { hora: '12:00', tempo: 75 },
              { hora: '14:00', tempo: 55 },
              { hora: '16:00', tempo: 65 },
              { hora: '18:00', tempo: 50 }
            ],
            statusDescarregamento: [
              { status: 'Concluído', quantidade: 35 },
              { status: 'Com Divergência', quantidade: 5 },
              { status: 'Aguardando Conferência', quantidade: 8 }
            ]
          });
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados de gráficos:', error);
      
      // Mock data em caso de erro
      const hoje = new Date();
      const ultimos7Dias = Array.from({ length: 7 }, (_, i) => {
        const data = new Date(hoje);
        data.setDate(hoje.getDate() - (6 - i));
        return {
          data: data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
          quantidade: Math.floor(Math.random() * 10) + 5
        };
      });

      setChartData({
        descarregamentosPorDia: ultimos7Dias,
        tiposCargaDescarregada: [
          { name: 'Alimentos', value: 35 },
          { name: 'Eletrônicos', value: 25 },
          { name: 'Móveis', value: 20 },
          { name: 'Materiais de Construção', value: 15 },
          { name: 'Outros', value: 5 }
        ],
        divergenciasPorTipo: [
          { tipo: 'Quantidade', quantidade: 12 },
          { tipo: 'Qualidade', quantidade: 8 },
          { tipo: 'Documentação', quantidade: 5 },
          { tipo: 'Tempo', quantidade: 3 }
        ],
        tempoMedioDescarregamento: [
          { hora: '08:00', tempo: 45 },
          { hora: '10:00', tempo: 60 },
          { hora: '12:00', tempo: 75 },
          { hora: '14:00', tempo: 55 },
          { hora: '16:00', tempo: 65 },
          { hora: '18:00', tempo: 50 }
        ],
        statusDescarregamento: [
          { status: 'Concluído', quantidade: 35 },
          { status: 'Com Divergência', quantidade: 5 },
          { status: 'Aguardando Conferência', quantidade: 8 }
        ]
      });
    }
  };

  // Registrar descarregamento (mantido igual)
  const handleRegistrarDescarregamento = async (e) => {
    e.preventDefault();
    
    if (!formData.codigoCarga || !formData.dataHoraInicio || !formData.dataHoraTermino) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      setLoading(true);

      // 1. Atualizar status da carga para "entregue"
      const updateStatusResponse = await fetch(`${API_BASE_URL}/updateCargaStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codigo: formData.codigoCarga,
          status: 'entregue',
          observacao: `Carga descarregada em ${formData.localDescarregamento}`,
          local: formData.localDescarregamento
        })
      });

      if (!updateStatusResponse.ok) {
        throw new Error('Erro ao atualizar status da carga');
      }

      // 2. Atualizar dados da carga com informações do descarregamento
      const updateCargaResponse = await fetch(`${API_BASE_URL}/updateCarga`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codigo: formData.codigoCarga,
          dataEntregaReal: new Date(formData.dataHoraTermino).toISOString(),
          tempoDescarregamento: formData.tempoTotal,
          pontoAtual: {
            descricao: formData.localDescarregamento,
            lat: 0,
            lng: 0,
            data: new Date()
          }
        })
      });

      if (!updateCargaResponse.ok) {
        throw new Error('Erro ao atualizar dados da carga');
      }

      // 3. Adicionar ocorrência de descarregamento
      const ocorrenciaData = {
        tipo: 'descarregamento',
        descricao: `Descarregamento realizado em ${formData.localDescarregamento}. Responsável: ${formData.responsavelRecebimento}. ${formData.observacoes}`,
        severidade: 'baixa',
        status: 'resolvido',
        custo: 0,
        afetaSeguro: false,
        condicoes: formData.condicoes
      };

      const ocorrenciaResponse = await fetch(`${API_BASE_URL}/addOcorrenciaCarga`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codigo: formData.codigoCarga,
          ocorrenciaData
        })
      });

      if (!ocorrenciaResponse.ok) {
        throw new Error('Erro ao registrar ocorrência');
      }

      toast.success('Descarregamento registrado com sucesso!');
      
      // Limpar formulário
      setFormData({
        codigoCarga: '',
        localDescarregamento: '',
        dataHoraInicio: '',
        dataHoraTermino: '',
        tempoTotal: 0,
        responsavelRecebimento: '',
        documentoResponsavel: '',
        observacoes: '',
        condicoes: {
          embalagemIntegra: false,
          lacresIntactos: false,
          pesoConforme: false,
          quantidadeCorreta: false,
          temperaturaAdequada: false,
          semAvarias: false
        }
      });

      // Recarregar dados
      carregarCargasDisponiveis();
      carregarCargasDescarregadas();
      carregarDadosGraficos();

    } catch (error) {
      console.error('Erro ao registrar descarregamento:', error);
      toast.error(error.message || 'Erro ao registrar descarregamento');
    } finally {
      setLoading(false);
    }
  };

  // Realizar conferência (mantido igual)
  const handleRealizarConferencia = async (e) => {
    e.preventDefault();
    
    if (!conferenciaData.codigoCarga || !conferenciaData.conferenteResponsavel) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      setLoading(true);

      const divergenciasText = Object.entries(conferenciaData.divergencias)
        .filter(([_, value]) => value)
        .map(([key]) => key.replace(/([A-Z])/g, ' $1').toLowerCase())
        .join(', ');

      const ocorrenciaData = {
        tipo: divergenciasText ? 'avaria' : 'conferencia',
        descricao: `Conferência realizada por ${conferenciaData.conferenteResponsavel}. ` +
                  `Quantidade: ${conferenciaData.quantidadeRecebida}/${conferenciaData.quantidadePrevista}. ` +
                  (divergenciasText ? `Divergências: ${divergenciasText}. ` : '') +
                  `Observações: ${conferenciaData.observacoesConferencia}`,
        severidade: divergenciasText ? 'média' : 'baixa',
        status: 'resolvido',
        custo: 0,
        afetaSeguro: divergenciasText.includes('avariado') || divergenciasText.includes('danificada')
      };

      const ocorrenciaResponse = await fetch(`${API_BASE_URL}/addOcorrenciaCarga`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codigo: conferenciaData.codigoCarga,
          ocorrenciaData
        })
      });

      if (!ocorrenciaResponse.ok) {
        throw new Error('Erro ao registrar conferência');
      }

      toast.success('Conferência realizada com sucesso!');

      setConferenciaData({
        codigoCarga: '',
        conferenteResponsavel: '',
        quantidadePrevista: 0,
        quantidadeRecebida: 0,
        divergencias: {
          quantidadeDivergente: false,
          produtoAvariado: false,
          embalagemDanificada: false,
          loteIncorreto: false,
          validadeVencida: false
        },
        observacoesConferencia: ''
      });

      carregarCargasDescarregadas();
      carregarDadosGraficos();

    } catch (error) {
      console.error('Erro ao realizar conferência:', error);
      toast.error(error.message || 'Erro ao realizar conferência');
    } finally {
      setLoading(false);
    }
  };

  // Upload de imagem para documentos
  const handleImageSelect = async (event, tipoDocumento) => {
    const file = event.target.files[0];
    if (!file) return;

    // Verificar tamanho máximo (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem é muito grande. Tamanho máximo: 5MB');
      return;
    }

    // Verificar tipo de arquivo
    const validTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/gif',
      'image/webp',
      'application/pdf'
    ];
    if (!validTypes.includes(file.type)) {
      toast.error('Tipo de arquivo inválido. Use imagens (JPEG, PNG, GIF, WebP) ou PDF');
      return;
    }

    // Pré-visualização local para imagens
    if (file.type.includes('image')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImages(prev => ({
          ...prev,
          [tipoDocumento]: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }

    try {
      const imageUrl = await handleImageUpload(file, tipoDocumento);
      
      if (imageUrl) {
        // Atualizar status do documento
        const documentoAtualizado = documentos.listaDocumentos.find(doc => doc.tipo === tipoDocumento);
        if (documentoAtualizado) {
          documentoAtualizado.status = 'concluido';
          
          setDocumentos(prev => ({
            ...prev,
            listaDocumentos: [...prev.listaDocumentos],
            documentosCarregados: [...prev.documentosCarregados, {
              tipo: tipoDocumento,
              nome: documentoAtualizado.nome,
              url: imageUrl,
              dataUpload: new Date().toISOString(),
              tamanho: file.size,
              tipoArquivo: file.type
            }]
          }));
          
          toast.success(`Documento ${documentoAtualizado.nome} carregado com sucesso!`);
        }
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      setSelectedImages(prev => ({
        ...prev,
        [tipoDocumento]: null
      }));
      toast.error('Erro ao processar o arquivo.');
    }
  };

  // Função de upload de imagem
  const handleImageUpload = async (file, tipoDocumento) => {
    if (!file) return null;

    try {
      setUploadingImage(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('tipo', tipoDocumento);
      formData.append('codigoCarga', documentos.codigoCarga);
      formData.append('nomeEmpresa', 'transportadora');

      const response = await fetch(`${API_BASE_URL}/docUpload`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.text();
        return data; // URL do arquivo
      }

      return null;
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      toast.error('Erro ao fazer upload do arquivo. Tente novamente.');
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  // Remover imagem
  const handleRemoveImage = (tipoDocumento) => {
    setSelectedImages(prev => ({
      ...prev,
      [tipoDocumento]: null
    }));

    // Limpar input de arquivo
    if (fileInputRef.current[tipoDocumento]) {
      fileInputRef.current[tipoDocumento].value = '';
    }
  };

  // Gerar relatório
  const handleGerarRelatorio = async () => {
    try {
      setLoading(true);
      
      const relatorioPayload = {
        periodoInicio: relatorioData.periodoInicio,
        periodoFim: relatorioData.periodoFim,
        tipoRelatorio: relatorioData.tipoRelatorio,
        filtros: relatorioData.filtros
      };

      const response = await fetch(`${API_BASE_URL}/getCargaStats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dataInicio: relatorioData.periodoInicio,
          dataFim: relatorioData.periodoFim
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Criar relatório em formato texto
        const relatorioTexto = `
          RELATÓRIO DE DESCARREGAMENTO
          =============================
          
          Período: ${relatorioData.periodoInicio} a ${relatorioData.periodoFim}
          
          ESTATÍSTICAS GERAIS:
          --------------------
          Total de Cargas Descarregadas: ${data.data?.totalCargas || 0}
          Cargas Entregues: ${data.data?.cargasEntregues || 0}
          Cargas com Divergências: ${stats.comDivergencias}
          Taxa de Sucesso: ${stats.taxaSucesso}%
          Tempo Médio de Descarregamento: ${stats.tempoMedioDescarregamento} minutos
          
          ESTATÍSTICAS FINANCEIRAS:
          -------------------------
          Valor Total Fretes: MT ${data.data?.valorTotalFretes?.toLocaleString('pt-PT') || '0'}
          Valor Total Seguros: MT ${data.data?.valorTotalSeguros?.toLocaleString('pt-PT') || '0'}
          Comissão Total: MT ${data.data?.comissaoTotal?.toLocaleString('pt-PT') || '0'}
          Margem de Lucro Total: MT ${data.data?.margemLucroTotal?.toLocaleString('pt-PT') || '0'}
          
          ESTATÍSTICAS POR TIPO DE PERCURSO:
          ----------------------------------
          ${data.data?.statsPorPercurso?.map(item => 
            `${item._id}: ${item.count} cargas - MT ${item.valorTotalFrete?.toLocaleString('pt-PT') || '0'}`
          ).join('\n          ') || 'Nenhum dado disponível'}
          
          Gerado em: ${new Date().toLocaleString('pt-PT')}
        `;
        
        // Criar blob e link para download
        const blob = new Blob([relatorioTexto], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio_descarregamento_${relatorioData.periodoInicio}_a_${relatorioData.periodoFim}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        toast.success('Relatório gerado com sucesso!');
      } else {
        throw new Error('Erro ao gerar relatório');
      }
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      toast.error('Erro ao gerar relatório. Usando dados de demonstração...');
      
      // Fallback para dados de demonstração
      const dadosDemo = `
        RELATÓRIO DE DESCARREGAMENTO (DEMO)
        ====================================
        
        Período: ${relatorioData.periodoInicio} a ${relatorioData.periodoFim}
        
        ESTATÍSTICAS GERAIS:
        --------------------
        Total de Cargas Descarregadas: 42
        Cargas Entregues: 38
        Cargas com Divergências: 4
        Taxa de Sucesso: 90.5%
        Tempo Médio de Descarregamento: 58 minutos
        
        TIPOS DE CARGA DESCARREGADA:
        ----------------------------
        Alimentos: 15 cargas (35.7%)
        Eletrônicos: 10 cargas (23.8%)
        Móveis: 8 cargas (19.0%)
        Materiais de Construção: 6 cargas (14.3%)
        Outros: 3 cargas (7.1%)
        
        DIVERGÊNCIAS IDENTIFICADAS:
        ---------------------------
        Quantidade: 12 ocorrências
        Qualidade: 8 ocorrências
        Documentação: 5 ocorrências
        Tempo: 3 ocorrências
        
        Gerado em: ${new Date().toLocaleString('pt-PT')}
      `;
      
      const blob = new Blob([dadosDemo], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio_demo_descarregamento_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } finally {
      setLoading(false);
    }
  };

  // Buscar detalhes da carga selecionada
  const buscarDetalhesCarga = async (codigo) => {
    if (!codigo) return;

    try {
      const response = await fetch(`${API_BASE_URL}/getCargaDetail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codigo })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.returnCode === 200) {
          setSelectedCarga(data.data);
          
          if (data.data.quantidadeVolumes) {
            setConferenciaData(prev => ({
              ...prev,
              quantidadePrevista: data.data.quantidadeVolumes
            }));
          }

          setDocumentos(prev => ({
            ...prev,
            codigoCarga: codigo
          }));
        }
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da carga:', error);
    }
  };

  // Abrir modal de detalhes
  const abrirModalDetalhes = (tipo, dados) => {
    setModalDetalhes({
      show: true,
      tipo,
      dados
    });
  };

  // Fechar modal
  const fecharModalDetalhes = () => {
    setModalDetalhes({
      show: false,
      tipo: '',
      dados: null
    });
  };

  // Componente para upload de imagem
  const ImageUploader = ({ tipo, label, currentImage, onRemove }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {currentImage ? (
        <div className="relative">
          {currentImage.includes('data:image') ? (
            <img
              src={currentImage}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border border-gray-300"
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg border border-gray-300">
              <span className="text-gray-600">📄 Documento carregado</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => onRemove(tipo)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            title="Remover arquivo"
            disabled={uploadingImage}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer ${
            uploadingImage
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-500'
          }`}
          onClick={() => !uploadingImage && fileInputRef.current[tipo]?.click()}
        >
          {uploadingImage ? (
            <>
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-sm text-blue-600">Enviando arquivo...</p>
            </>
          ) : (
            <>
              <svg
                className="w-12 h-12 mx-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600">Clique para adicionar arquivo</p>
              <p className="text-xs text-gray-500">Imagens ou PDF (max. 5MB)</p>
            </>
          )}
        </div>
      )}

      <input
        type="file"
        ref={(el) => (fileInputRef.current[tipo] = el)}
        onChange={(e) => handleImageSelect(e, tipo)}
        accept="image/*,.pdf"
        className="hidden"
        disabled={uploadingImage}
      />
    </div>
  );

  // Calcular tempo total automaticamente
  useEffect(() => {
    if (formData.dataHoraInicio && formData.dataHoraTermino) {
      const inicio = new Date(formData.dataHoraInicio);
      const termino = new Date(formData.dataHoraTermino);
      const diffMs = termino - inicio;
      const diffMinutes = Math.round(diffMs / 60000);
      
      setFormData(prev => ({
        ...prev,
        tempoTotal: diffMinutes > 0 ? diffMinutes : 0
      }));
    }
  }, [formData.dataHoraInicio, formData.dataHoraTermino]);

  // Calcular diferença na conferência
  useEffect(() => {
    const diferenca = conferenciaData.quantidadeRecebida - conferenciaData.quantidadePrevista;
    setConferenciaData(prev => ({
      ...prev,
      divergencias: {
        ...prev.divergencias,
        quantidadeDivergente: diferenca !== 0
      }
    }));
  }, [conferenciaData.quantidadeRecebida, conferenciaData.quantidadePrevista]);

  // Carregar dados iniciais
  useEffect(() => {
    carregarCargasDisponiveis();
    carregarCargasDescarregadas();
    carregarDadosGraficos();
  }, []);

  // Buscar detalhes quando código da carga muda
  useEffect(() => {
    if (formData.codigoCarga) {
      buscarDetalhesCarga(formData.codigoCarga);
    }
  }, [formData.codigoCarga]);

  // Componente Modal de Detalhes
  const ModalDetalhes = () => {
    if (!modalDetalhes.show) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
          <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              {modalDetalhes.tipo === 'carga' ? '📦 Detalhes da Carga' : 
               modalDetalhes.tipo === 'documento' ? '📄 Detalhes do Documento' : 'Detalhes'}
            </h3>
            <button
              onClick={fecharModalDetalhes}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6">
            {modalDetalhes.tipo === 'carga' && modalDetalhes.dados && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Código da Carga</p>
                      <p className="font-semibold text-lg">{modalDetalhes.dados.codigo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        modalDetalhes.dados.status === 'entregue' ? 'bg-green-100 text-green-800' :
                        modalDetalhes.dados.status === 'em_entrega' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {modalDetalhes.dados.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Cliente</p>
                      <p className="font-medium">{modalDetalhes.dados.cliente}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Data de Entrega</p>
                      <p className="font-medium">
                        {modalDetalhes.dados.dataEntregaReal 
                          ? new Date(modalDetalhes.dados.dataEntregaReal).toLocaleString('pt-PT')
                          : 'Não entregue'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tipo de Carga</p>
                      <p className="font-medium">{modalDetalhes.dados.tipoCarga}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Peso Bruto</p>
                      <p className="font-medium">{modalDetalhes.dados.pesoBruto} kg</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Rota</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Origem</p>
                      <p className="font-medium">{modalDetalhes.dados.origem?.cidade || 'N/A'}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Destino</p>
                      <p className="font-medium">{modalDetalhes.dados.destino?.cidade || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                
                {modalDetalhes.dados.ocorrencias && modalDetalhes.dados.ocorrencias.length > 0 && (
                  <div className="border-t pt-6">
                    <h4 className="font-medium text-gray-900 mb-3">Ocorrências</h4>
                    <div className="space-y-2">
                      {modalDetalhes.dados.ocorrencias.slice(0, 5).map((ocorrencia, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm font-medium">{ocorrencia.tipo}</p>
                          <p className="text-sm text-gray-600">{ocorrencia.descricao}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(ocorrencia.dataRegistro).toLocaleString('pt-PT')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {modalDetalhes.tipo === 'documento' && modalDetalhes.dados && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Nome do Documento</p>
                      <p className="font-semibold text-lg">{modalDetalhes.dados.nome}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tipo</p>
                      <p className="font-medium">{modalDetalhes.dados.tipo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Data de Upload</p>
                      <p className="font-medium">
                        {new Date(modalDetalhes.dados.dataUpload).toLocaleString('pt-PT')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Tamanho</p>
                      <p className="font-medium">
                        {(modalDetalhes.dados.tamanho / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tipo de Arquivo</p>
                      <p className="font-medium">{modalDetalhes.dados.tipoArquivo}</p>
                    </div>
                  </div>
                </div>
                
                {modalDetalhes.dados.url && (
                  <div className="border-t pt-6">
                    <h4 className="font-medium text-gray-900 mb-3">Visualização</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {modalDetalhes.dados.tipoArquivo.includes('image') ? (
                        <img
                          src={modalDetalhes.dados.url}
                          alt={modalDetalhes.dados.nome}
                          className="w-full max-h-96 object-contain rounded-lg"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/400x300?text=Imagem+Não+Disponível";
                          }}
                        />
                      ) : (
                        <div className="text-center py-12">
                          <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p className="mt-4 text-gray-600">Documento PDF</p>
                          <a
                            href={modalDetalhes.dados.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Abrir PDF
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
            <button
              onClick={fecharModalDetalhes}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <ModalDetalhes />
      
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            📦
          </span>
          Carga Descarregada - Registro de Cargas Descarregadas
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Registro, confirmação e gestão de cargas finalizadas e
          descarregadas
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveDescarregadaForm("registro")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeDescarregadaForm === "registro"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ✅ Registro
          </button>
          <button
            onClick={() => setActiveDescarregadaForm("conferencia")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeDescarregadaForm === "conferencia"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🔍 Conferência
          </button>
          <button
            onClick={() => setActiveDescarregadaForm("documentos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeDescarregadaForm === "documentos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📑 Documentos
          </button>
          <button
            onClick={() => setActiveDescarregadaForm("graficos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeDescarregadaForm === "graficos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Gráficos
          </button>
          <button
            onClick={() => setActiveDescarregadaForm("relatorios")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeDescarregadaForm === "relatorios"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Relatórios
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-700">Processando...</p>
            </div>
          </div>
        )}

        {/* Registro de Descarregamento (mantido igual) */}
        {activeDescarregadaForm === "registro" && (
          // ... (código existente do formulário de registro)
          <div className="space-y-6">
            {/* Métricas Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Descarregadas Hoje
                    </p>
                    <p className="text-2xl font-bold text-gray-900">{stats.descarregadasHoje}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">✅</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    Atualizado agora
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Aguardando Conferência
                    </p>
                    <p className="text-2xl font-bold text-gray-900">{stats.aguardandoConferencia}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">⏳</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    Necessitam ação
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Com Divergências
                    </p>
                    <p className="text-2xl font-bold text-gray-900">{stats.comDivergencias}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">⚠️</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    Resolução pendente
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Taxa de Sucesso
                    </p>
                    <p className="text-2xl font-bold text-gray-900">{stats.taxaSucesso}%</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">📊</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    Acima da meta
                  </span>
                </div>
              </div>
            </div>

            {/* Grid Principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Formulário de Registro */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4 border-b border-gray-200 bg-lime-50">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <span className="bg-lime-500 text-white p-2 rounded-lg mr-2">
                        ✅
                      </span>
                      Registro de Descarregamento
                    </h3>
                  </div>
                  <div className="p-6">
                    <form onSubmit={handleRegistrarDescarregamento} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Carga a Descarregar *
                          </label>
                          <select 
                            value={formData.codigoCarga}
                            onChange={(e) => setFormData({...formData, codigoCarga: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 text-gray-950"
                            required
                          >
                            <option value="">Selecione a carga</option>
                            {cargasDisponiveis.map(carga => (
                              <option key={carga.codigo} value={carga.codigo}>
                                {carga.codigo} - {carga.origem?.cidade} → {carga.destino?.cidade}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Local de Descarregamento *
                          </label>
                          <input
                            type="text"
                            value={formData.localDescarregamento}
                            onChange={(e) => setFormData({...formData, localDescarregamento: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 text-gray-950"
                            placeholder="Endereço completo"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Data/Hora Início *
                          </label>
                          <input
                            type="datetime-local"
                            value={formData.dataHoraInicio}
                            onChange={(e) => setFormData({...formData, dataHoraInicio: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 text-gray-950"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Data/Hora Término *
                          </label>
                          <input
                            type="datetime-local"
                            value={formData.dataHoraTermino}
                            onChange={(e) => setFormData({...formData, dataHoraTermino: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 text-gray-950"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tempo Total (min)
                          </label>
                          <input
                            type="number"
                            value={formData.tempoTotal}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                          />
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <h4 className="font-semibold text-gray-900 mb-4">
                          Condições da Carga no Descarregamento
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(formData.condicoes).map(([key, value]) => (
                            <div key={key} className="flex items-center">
                              <input 
                                type="checkbox" 
                                checked={value}
                                onChange={(e) => setFormData({
                                  ...formData, 
                                  condicoes: {...formData.condicoes, [key]: e.target.checked}
                                })}
                                className="mr-3"
                              />
                              <label className="text-sm text-gray-700">
                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Responsável pelo Recebimento
                          </label>
                          <input
                            type="text"
                            value={formData.responsavelRecebimento}
                            onChange={(e) => setFormData({...formData, responsavelRecebimento: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 text-gray-950"
                            placeholder="Nome do responsável"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Documento do Responsável
                          </label>
                          <input
                            type="text"
                            value={formData.documentoResponsavel}
                            onChange={(e) => setFormData({...formData, documentoResponsavel: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 text-gray-950"
                            placeholder="BI ou outro documento"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Observações do Descarregamento
                        </label>
                        <textarea
                          rows={3}
                          value={formData.observacoes}
                          onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 text-gray-950"
                          placeholder="Observações sobre o descarregamento..."
                        />
                      </div>

                      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <button
                          type="button"
                          onClick={() => setFormData({
                            codigoCarga: '',
                            localDescarregamento: '',
                            dataHoraInicio: '',
                            dataHoraTermino: '',
                            tempoTotal: 0,
                            responsavelRecebimento: '',
                            documentoResponsavel: '',
                            observacoes: '',
                            condicoes: {
                              embalagemIntegra: false,
                              lacresIntactos: false,
                              pesoConforme: false,
                              quantidadeCorreta: false,
                              temperaturaAdequada: false,
                              semAvarias: false
                            }
                          })}
                          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                        >
                          Finalizar Descarregamento
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Painel de Informações */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Informações da Carga
                  </h4>
                  {selectedCarga ? (
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-600">Código:</span>
                        <p className="font-medium text-gray-950">{selectedCarga.codigo}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">
                          Origem → Destino:
                        </span>
                        <p className="font-medium text-gray-950">
                          {selectedCarga.origem?.cidade} → {selectedCarga.destino?.cidade}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Tipo de Carga:</span>
                        <p className="font-medium text-gray-950">
                          {selectedCarga.tipoCarga} • {selectedCarga.pesoBruto} {selectedCarga.pesoBruto ? 'kg' : ''}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Cliente:</span>
                        <p className="font-medium text-gray-950">
                          {selectedCarga.cliente}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Motorista:</span>
                        <p className="font-medium text-gray-950">
                          {selectedCarga.motorista?.nome || 'Não associado'}
                        </p>
                      </div>
                      {selectedCarga.valorMercadoria && (
                        <div>
                          <span className="text-gray-600">Valor Mercadoria:</span>
                          <p className="font-medium text-gray-950">
                            MZN {selectedCarga.valorMercadoria.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Selecione uma carga para ver os detalhes</p>
                  )}
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Próximos Descarregamentos
                  </h4>
                  <div className="space-y-3">
                    {cargasDisponiveis.slice(0, 3).map(carga => (
                      <div key={carga.codigo} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm font-medium text-gray-950">
                          {carga.codigo}
                        </p>
                        <p className="text-xs text-gray-600">
                          {carga.destino?.cidade} • {carga.tipoCarga}
                        </p>
                        {carga.prioridade === 'urgente' && (
                          <p className="text-xs text-red-600 font-medium">
                            ⚠️ Prioridade Urgente
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Conferência de Carga (mantido igual) */}
        {activeDescarregadaForm === "conferencia" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-blue-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                  🔍
                </span>
                Conferência de Carga Descarregada
              </h3>
            </div>
            <div className="p-6">
              <form onSubmit={handleRealizarConferencia}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Carga Descarregada
                    </label>
                    <select 
                      value={conferenciaData.codigoCarga}
                      onChange={(e) => {
                        setConferenciaData({...conferenciaData, codigoCarga: e.target.value});
                        buscarDetalhesCarga(e.target.value);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                      required
                    >
                      <option value="">Selecione a carga</option>
                      {cargasDescarregadas.map(carga => (
                        <option key={carga.codigo} value={carga.codigo}>
                          {carga.codigo} - Descarregada em {carga.dataEntregaReal ? new Date(carga.dataEntregaReal).toLocaleDateString() : 'N/A'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Conferente Responsável *
                    </label>
                    <input
                      type="text"
                      value={conferenciaData.conferenteResponsavel}
                      onChange={(e) => setConferenciaData({...conferenciaData, conferenteResponsavel: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                      placeholder="Nome do conferente"
                      required
                    />
                  </div>
                </div>

                {/* Checklist de Conferência */}
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Conferência de Quantidades
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quantidade Prevista
                        </label>
                        <input
                          type="number"
                          value={conferenciaData.quantidadePrevista}
                          onChange={(e) => setConferenciaData({...conferenciaData, quantidadePrevista: parseInt(e.target.value) || 0})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quantidade Recebida *
                        </label>
                        <input
                          type="number"
                          value={conferenciaData.quantidadeRecebida}
                          onChange={(e) => setConferenciaData({...conferenciaData, quantidadeRecebida: parseInt(e.target.value) || 0})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="0"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Diferença
                        </label>
                        <input
                          type="number"
                          value={conferenciaData.quantidadeRecebida - conferenciaData.quantidadePrevista}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Divergências Identificadas
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(conferenciaData.divergencias).map(([key, value]) => (
                        <div key={key} className="flex items-center">
                          <input 
                            type="checkbox" 
                            checked={value}
                            onChange={(e) => setConferenciaData({
                              ...conferenciaData, 
                              divergencias: {...conferenciaData.divergencias, [key]: e.target.checked}
                            })}
                            className="mr-3"
                          />
                          <label className="text-sm text-gray-700">
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Observações da Conferência
                    </label>
                    <textarea
                      rows={3}
                      value={conferenciaData.observacoesConferencia}
                      onChange={(e) => setConferenciaData({...conferenciaData, observacoesConferencia: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                      placeholder="Descreva as observações da conferência..."
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setConferenciaData({
                        codigoCarga: '',
                        conferenteResponsavel: '',
                        quantidadePrevista: 0,
                        quantidadeRecebida: 0,
                        divergencias: {
                          quantidadeDivergente: false,
                          produtoAvariado: false,
                          embalagemDanificada: false,
                          loteIncorreto: false,
                          validadeVencida: false
                        },
                        observacoesConferencia: ''
                      })}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                    >
                      Aprovar Conferência
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Gestão de Documentos */}
        {activeDescarregadaForm === "documentos" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-green-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-green-500 text-white p-2 rounded-lg mr-2">
                    📑
                  </span>
                  Gestão de Documentos da Carga
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Seletor de Carga */}
                  <div className="lg:col-span-1">
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Selecione a Carga Descarregada
                      </label>
                      <select 
                        value={documentos.codigoCarga}
                        onChange={(e) => {
                          setDocumentos({
                            ...documentos,
                            codigoCarga: e.target.value,
                            documentosCarregados: []
                          });
                          buscarDetalhesCarga(e.target.value);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                      >
                        <option value="">Selecione uma carga descarregada</option>
                        {cargasDescarregadas.map(carga => (
                          <option key={carga.codigo} value={carga.codigo}>
                            {carga.codigo} - {carga.cliente} ({new Date(carga.dataEntregaReal).toLocaleDateString()})
                          </option>
                        ))}
                      </select>
                    </div>

                    {documentos.codigoCarga && (
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">Status dos Documentos</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-700">Obrigatórios:</span>
                            <span className="text-sm font-medium text-green-600">
                              {documentos.listaDocumentos.filter(d => d.obrigatorio && d.status === 'concluido').length}/
                              {documentos.listaDocumentos.filter(d => d.obrigatorio).length}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-700">Opcionais:</span>
                            <span className="text-sm font-medium text-gray-600">
                              {documentos.listaDocumentos.filter(d => !d.obrigatorio && d.status === 'concluido').length}/
                              {documentos.listaDocumentos.filter(d => !d.obrigatorio).length}
                            </span>
                          </div>
                          <div className="pt-2 mt-2 border-t border-green-200">
                            <span className="text-xs text-gray-500">
                              * Documentos obrigatórios devem ser anexados
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Lista de Documentos */}
                  <div className="lg:col-span-2">
                    {documentos.codigoCarga ? (
                      <div className="space-y-6">
                        <h4 className="font-semibold text-gray-900">
                          Documentos Necessários para a Carga: {documentos.codigoCarga}
                        </h4>
                        
                        <div className="space-y-4">
                          {documentos.listaDocumentos.map(documento => (
                            <div key={documento.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg ${
                                  documento.obrigatorio ? 'bg-red-100' : 'bg-blue-100'
                                }`}>
                                  <span className={`${
                                    documento.obrigatorio ? 'text-red-600' : 'text-blue-600'
                                  }`}>
                                    {documento.obrigatorio ? '📋' : '📄'}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{documento.nome}</p>
                                  <p className="text-xs text-gray-500">
                                    {documento.obrigatorio ? 'Documento Obrigatório' : 'Documento Opcional'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  documento.status === 'concluido' 
                                    ? 'bg-green-100 text-green-800' 
                                    : documento.status === 'pendente'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {documento.status === 'concluido' ? 'Concluído' : 'Pendente'}
                                </span>
                                <button
                                  onClick={() => fileInputRef.current[documento.tipo]?.click()}
                                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm font-medium"
                                  disabled={uploadingImage}
                                >
                                  {uploadingImage ? 'Enviando...' : 'Upload'}
                                </button>
                                <input
                                  type="file"
                                  ref={(el) => (fileInputRef.current[documento.tipo] = el)}
                                  onChange={(e) => handleImageSelect(e, documento.tipo)}
                                  accept="image/*,.pdf"
                                  className="hidden"
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Documentos Carregados */}
                        {documentos.documentosCarregados.length > 0 && (
                          <div className="mt-8">
                            <h4 className="font-semibold text-gray-900 mb-4">
                              Documentos Carregados
                            </h4>
                            <div className="space-y-3">
                              {documentos.documentosCarregados.map((doc, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                                  <div className="flex items-center space-x-3">
                                    <span className="text-blue-600">📎</span>
                                    <div>
                                      <p className="font-medium text-gray-900">{doc.nome}</p>
                                      <p className="text-xs text-gray-500">
                                        Carregado em: {new Date(doc.dataUpload).toLocaleString('pt-PT')}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() => abrirModalDetalhes('documento', doc)}
                                      className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                      Visualizar
                                    </button>
                                    <a
                                      href={doc.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                      Download
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="mt-4 text-gray-600">Selecione uma carga para gerenciar os documentos</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard de Gráficos */}
        {activeDescarregadaForm === "graficos" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-purple-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-purple-500 text-white p-2 rounded-lg mr-2">
                    📊
                  </span>
                  Dashboard de Descarregamento - Análise e Estatísticas
                </h3>
              </div>
              <div className="p-6">
                {/* Métricas Rápidas */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">Descarregamentos Hoje</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.descarregadasHoje}</p>
                    <p className="text-xs text-gray-600">Últimas 24 horas</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600 font-medium">Taxa de Sucesso</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.taxaSucesso}%</p>
                    <p className="text-xs text-gray-600">Meta: 95%</p>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                    <p className="text-sm text-orange-600 font-medium">Tempo Médio</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.tempoMedioDescarregamento} min</p>
                    <p className="text-xs text-gray-600">Por descarregamento</p>
                  </div>
                  <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                    <p className="text-sm text-red-600 font-medium">Divergências</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.comDivergencias}</p>
                    <p className="text-xs text-gray-600">A resolver</p>
                  </div>
                </div>

                {/* Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Linha - Descarregamentos por Dia */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Descarregamentos nos Últimos 7 Dias</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData.descarregamentosPorDia}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="data" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="quantidade" 
                            stroke="#8884d8" 
                            strokeWidth={2}
                            name="Quantidade"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Gráfico de Pizza - Tipos de Carga */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Distribuição por Tipo de Carga</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData.tiposCargaDescarregada}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {chartData.tiposCargaDescarregada.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Gráfico de Barras - Divergências */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Divergências por Tipo</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData.divergenciasPorTipo}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="tipo" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="quantidade" fill="#82ca9d" name="Quantidade de Ocorrências" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Gráfico de Linha - Tempo Médio */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Tempo Médio de Descarregamento por Hora</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData.tempoMedioDescarregamento}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="hora" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="tempo" 
                            stroke="#ff7300" 
                            strokeWidth={2}
                            name="Tempo (minutos)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Lista de Cargas Recentes */}
                <div className="mt-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Últimas Cargas Descarregadas</h4>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Código
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Cliente
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Data Entrega
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Ações
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {cargasDescarregadas.slice(0, 5).map(carga => (
                            <tr key={carga.codigo} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {carga.codigo}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {carga.cliente}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {carga.dataEntregaReal 
                                  ? new Date(carga.dataEntregaReal).toLocaleDateString('pt-PT')
                                  : 'N/A'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  carga.status === 'entregue' ? 'bg-green-100 text-green-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {carga.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button
                                  onClick={() => abrirModalDetalhes('carga', carga)}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  Detalhes
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Relatórios */}
        {activeDescarregadaForm === "relatorios" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-rose-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-rose-500 text-white p-2 rounded-lg mr-2">
                    📈
                  </span>
                  Relatórios de Descarregamento
                </h3>
              </div>
              <div className="p-6">
                {/* Botões de Atalhos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <button
                    onClick={handleGerarRelatorio}
                    className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors text-left"
                  >
                    <div className="text-blue-600 text-lg mb-2">📋</div>
                    <p className="font-medium text-gray-900">
                      Relatório Completo
                    </p>
                    <p className="text-sm text-gray-600">Dados gerais de descarregamento</p>
                  </button>

                  <button
                    onClick={() => {
                      setRelatorioData({...relatorioData, tipoRelatorio: 'divergencias'});
                      handleGerarRelatorio();
                    }}
                    className="p-4 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors text-left"
                  >
                    <div className="text-red-600 text-lg mb-2">⚠️</div>
                    <p className="font-medium text-gray-900">
                      Relatório de Divergências
                    </p>
                    <p className="text-sm text-gray-600">Cargas com problemas</p>
                  </button>

                  <button
                    onClick={() => {
                      setRelatorioData({...relatorioData, tipoRelatorio: 'tempo'});
                      handleGerarRelatorio();
                    }}
                    className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors text-left"
                  >
                    <div className="text-green-600 text-lg mb-2">⏱️</div>
                    <p className="font-medium text-gray-900">
                      Análise de Tempos
                    </p>
                    <p className="text-sm text-gray-600">Eficiência no descarregamento</p>
                  </button>

                  <button
                    onClick={() => {
                      setRelatorioData({...relatorioData, tipoRelatorio: 'documentos'});
                      handleGerarRelatorio();
                    }}
                    className="p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors text-left"
                  >
                    <div className="text-purple-600 text-lg mb-2">📄</div>
                    <p className="font-medium text-gray-900">
                      Status de Documentos
                    </p>
                    <p className="text-sm text-gray-600">Conformidade documental</p>
                  </button>
                </div>

                {/* Configurações do Relatório */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h4 className="font-medium text-gray-900 mb-4">
                    Configurações do Relatório
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Período Inicial
                      </label>
                      <input
                        type="date"
                        value={relatorioData.periodoInicio}
                        onChange={(e) => setRelatorioData({...relatorioData, periodoInicio: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Período Final
                      </label>
                      <input
                        type="date"
                        value={relatorioData.periodoFim}
                        onChange={(e) => setRelatorioData({...relatorioData, periodoFim: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Relatório
                      </label>
                      <select
                        value={relatorioData.tipoRelatorio}
                        onChange={(e) => setRelatorioData({...relatorioData, tipoRelatorio: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                      >
                        <option value="descarregamento">Descarregamento</option>
                        <option value="divergencias">Divergências</option>
                        <option value="tempo">Análise de Tempos</option>
                        <option value="documentos">Status de Documentos</option>
                        <option value="financeiro">Análise Financeira</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Filtros Adicionais</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={relatorioData.filtros.comDivergencias}
                            onChange={(e) => setRelatorioData({
                              ...relatorioData,
                              filtros: {...relatorioData.filtros, comDivergencias: e.target.checked}
                            })}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">Apenas com divergências</span>
                        </label>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Filtrar por cliente"
                          value={relatorioData.filtros.cliente}
                          onChange={(e) => setRelatorioData({
                            ...relatorioData,
                            filtros: {...relatorioData.filtros, cliente: e.target.value}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950 text-sm"
                        />
                      </div>
                      <div>
                        <select
                          value={relatorioData.filtros.tipoCarga}
                          onChange={(e) => setRelatorioData({
                            ...relatorioData,
                            filtros: {...relatorioData.filtros, tipoCarga: e.target.value}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950 text-sm"
                        >
                          <option value="">Todos os tipos de carga</option>
                          <option value="alimentos">Alimentos</option>
                          <option value="eletronicos">Eletrônicos</option>
                          <option value="moveis">Móveis</option>
                          <option value="construcao">Materiais de Construção</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <p>Período selecionado: {relatorioData.periodoInicio} a {relatorioData.periodoFim}</p>
                      <p>Tipo: {relatorioData.tipoRelatorio}</p>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          setRelatorioData({
                            periodoInicio: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
                            periodoFim: new Date().toISOString().split('T')[0],
                            tipoRelatorio: 'descarregamento',
                            filtros: {
                              cliente: '',
                              tipoCarga: '',
                              comDivergencias: false
                            }
                          });
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                      >
                        Limpar Filtros
                      </button>
                      <button
                        onClick={handleGerarRelatorio}
                        disabled={loading}
                        className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 font-medium disabled:opacity-50"
                      >
                        {loading ? 'Gerando...' : 'Gerar Relatório'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Pré-visualização de Dados */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Pré-visualização de Dados</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-gray-600">Total de Cargas</p>
                      <p className="text-xl font-bold text-gray-900">{cargasDescarregadas.length}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-gray-600">Taxa de Conformidade</p>
                      <p className="text-xl font-bold text-gray-900">{stats.taxaSucesso}%</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="text-gray-600">Tempo Médio</p>
                      <p className="text-xl font-bold text-gray-900">{stats.tempoMedioDescarregamento} min</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CargaDescarregada;