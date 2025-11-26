// utils/cargaUtils.ts
// Formatar data
export const formatarData = (data: string | Date | undefined | null): string => {
  if (!data) return '-';
  
  const dataObj = typeof data === 'string' ? new Date(data) : data;
  
  if (isNaN(dataObj.getTime())) return '-';
  
  return dataObj.toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};
// Formatar moeda
export const formatarMoeda = (valor: number): string => {
  return new Intl.NumberFormat('pt-MZ', {
    style: 'currency',
    currency: 'MZN'
  }).format(valor || 0);
};

// Cores para status
export const getStatusColor = (status: string): string => {
  const colors: { [key: string]: string } = {
    planeada: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    aguardando_coleta: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    coletada: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    em_transito: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    em_fronteira: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    aguardando_desembaraco: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    em_entrega: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
    entregue: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    encerrada: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    armazenada: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  };
  return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
};

// Texto para status
export const getStatusText = (status: string): string => {
  const texts: { [key: string]: string } = {
    planeada: 'Planeada',
    aguardando_coleta: 'Aguardando Coleta',
    coletada: 'Coletada',
    em_transito: 'Em Trânsito',
    em_fronteira: 'Em Fronteira',
    aguardando_desembaraco: 'Aguardando Desembaraço',
    em_entrega: 'Em Entrega',
    entregue: 'Entregue',
    encerrada: 'Encerrada',
    armazenada: 'Armazenada'
  };
  return texts[status] || status;
};

// Cores para prioridade
export const getPrioridadeColor = (prioridade: string): string => {
  const colors: { [key: string]: string } = {
    baixa: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    media: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    alta: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    urgente: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  };
  return colors[prioridade] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
};

// Exportar para CSV
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exportToCSV = (cargas: any[], filename: string = `cargas_${new Date().toISOString().split('T')[0]}.csv`): void => {
  const headers = ['Código', 'Cliente', 'Tipo', 'Status', 'Origem', 'Destino', 'Valor Total', 'Prioridade'];
  const csvData = cargas.map(carga => [
    carga.codigo,
    carga.cliente,
    carga.tipoCarga,
    getStatusText(carga.status),
    `${carga.origem.cidade}, ${carga.origem.pais}`,
    `${carga.destino.cidade}, ${carga.destino.pais}`,
    formatarMoeda(carga.valorTotal),
    carga.prioridade
  ]);

  const csvContent = [
    headers.join(','),
    ...csvData.map(row => row.map(field => `"${field}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
};

// Dados iniciais para nova carga
// utils/cargaUtils.ts

export const getInitialCargaData = () => {
  return {
    // Identificação da Carga
    tipoCarga: '',
    subtipo: '',
    descricao: '',
    naturezaCarga: '',
    
    // Campos de seguro obrigatórios
    categoriaSeguro: '',
    abrangenciaSeguro: 'Nacional',
    tipoPercurso: '',
    destinoFrete: '',
    
    // Pesos e dimensões
    pesoBruto: '',
    pesoLiquido: '',
    volume: '',
    embalagem: '',
    quantidadeVolumes: '',
    dimensoes: {
      largura: '',
      altura: '',
      comprimento: ''
    },
    umidadeAtual: '',
    umidadePermitidaPercentual: '',

    // Contentor
    contentor: {
      numero: '',
      tipo: '',
      tara: '',
      capacidadeMaxima: '',
      anoFabricacao: '',
      estadoAtual: '',
      lacreOrigem: '',
      lacreDestino: ''
    },

    // Cliente
    clienteId: '',
    cliente: '',
    exportador: '',
    importador: '',
    consignatario: '',
    contatoCliente: '',
    instrucaoEspecial: '',

    // Localização
    origem: {
      pais: '',
      cidade: '',
      local: '',
      coordenadas: {
        lat: '',
        lng: ''
      }
    },
    destino: {
      pais: '',
      cidade: '',
      local: '',
      coordenadas: {
        lat: '',
        lng: ''
      }
    },

    // Status
    status: 'planeada',
    prioridade: 'media',
    fluxoStatus: [] as string[],

    // Datas
    dataColeta: '',
    dataEntregaPrevista: '',
    dataEntregaReal: '',

    // Financeiro
    valorFrete: '',
    taxasPortuarias: '',
    despesasOperacionais: '',
    custoCarga: '',
    valorMercadoria: '',
    custosExtras: [] as Array<{
      tipo: string;
      descricao: string;
      valor: number;
      data: string;
    }>,

    // Seguro
    contratarSeguro: true,
    seguro: {
      apolice: '',
      seguradora: '',
      valorSegurado: 0,
      taxaPercentual: 0,
      taxaBaseMZN: 0,
      premioCalculado: 0,
      premioFinal: 0,
      dataInicio: '',
      dataFim: '',
      cobertura: [] as string[],
      statusSeguro: 'pendente' as 'pendente' | 'ativo' | 'vencido' | 'cancelado' | 'sinistrado',
      sinistros: [] as Array<{
        data: string;
        descricao: string;
        valorSinistro: number;
        status: 'reportado' | 'em_analise' | 'indeminizado' | 'recusado';
      }>
    },

    // Documentação
    documentos: {
      conhecimentoEmbarque: '',
      invoice: '',
      packingList: '',
      certificadoOrigem: '',
      contratoTransporte: '',
      numeroCotacao: '',
      numeroRecibo: '',
      notaDebito: '',
      manifest: '',
      outros: [] as string[]
    },

    // Metadados
    observacoes: '',
    criadoPor: '',
    atualizadoPor: ''
  };
};