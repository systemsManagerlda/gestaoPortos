/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useCargaHook.ts
import { useState, useEffect, useCallback } from 'react';
import { cargaService, Carga, FiltrosCarga, PaginationData, CargaServiceError } from './cargaService';
import { exportToCSV, getInitialCargaData } from './cargaUtils';
import { useAuth } from '@/context/AuthContext';

const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

// Interfaces tipadas
export interface ContatoCliente {
  nome: string;
  email: string;
  telefone: string;
  principal: boolean;
}

export interface Cliente {
  _id: string;
  codigo: string;
  nome: string;
  nuit?: string;
  contatos?: ContatoCliente[];
}

export interface FiltrosAvancados {
  prioridade: string;
  valorMin: string;
  valorMax: string;
  dataInicio: string;
  dataFim: string;
  categoriaSeguro: string;
  abrangenciaSeguro: string;
  tipoPercurso: string;
}

// hooks/useCargaHook.ts

export interface CargaHookReturn {
  // Estados
  cargas: Carga[];
  filteredCargas: Carga[]; // Adicione esta linha
  isDataLoading: boolean;
  pagination: PaginationData;
  searchTerm: string;
  statusFilter: string;
  tipoFilter: string;
  naturezaFilter: string;
  filtrosAvancados: FiltrosAvancados;
  showNovaCargaModal: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  novaCarga: any;
  camioesDisponiveis: any[];
  gpsDisponiveis: any[];
  isSubmitting: boolean;
  clientes: Cliente[];
  isLoadingClientes: boolean;
  user: any;
  error: string | null;

  // Setters
  setSearchTerm: (term: string) => void;
  setStatusFilter: (filter: string) => void;
  setTipoFilter: (filter: string) => void;
  setNaturezaFilter: (filter: string) => void;
  setFiltrosAvancados: (filtros: FiltrosAvancados) => void;
  setShowNovaCargaModal: (show: boolean) => void;
  setNovaCarga: (carga: any) => void;
  setFilteredCargas: (cargas: Carga[]) => void; // Adicione esta linha
  setError: (error: string | null) => void;

  // Funções
  fetchCargas: (page?: number, pageSize?: number) => Promise<void>;
  criarNovaCarga: () => Promise<boolean>;
  resetFormNovaCarga: () => void;
  exportarDados: () => Promise<void>;
  selecionarCliente: (clienteId: string) => void;
  fetchClientes: () => Promise<void>;
  calcularCustosCarga: (dados: any) => Promise<any>;
  verificarViabilidade: (codigoCarga: string, camiaoId: string) => Promise<any>;
}

export const useCargaHook = (): CargaHookReturn => {
  // Estados para dados
  const [cargas, setCargas] = useState<Carga[]>([]);
  const [filteredCargas, setFilteredCargas] = useState<Carga[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoadingClientes, setIsLoadingClientes] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pagination, setPagination] = useState<PaginationData>({
    curPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPage: 0
  });

  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [tipoFilter, setTipoFilter] = useState("todos");
  const [naturezaFilter, setNaturezaFilter] = useState("todos");
  const [filtrosAvancados, setFiltrosAvancados] = useState<FiltrosAvancados>({
    prioridade: "todos",
    valorMin: "",
    valorMax: "",
    dataInicio: "",
    dataFim: "",
    categoriaSeguro: "todos",
    abrangenciaSeguro: "todos",
    tipoPercurso: "todos",
  });

  // Estados para nova carga
  const [showNovaCargaModal, setShowNovaCargaModal] = useState(false);
  const [novaCarga, setNovaCarga] = useState(getInitialCargaData());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [camioesDisponiveis, setCamioesDisponiveis] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [gpsDisponiveis, setGpsDisponiveis] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = useAuth();

  // Buscar cargas com useCallback para evitar recriações desnecessárias
  const fetchCargas = useCallback(async (page: number = 1, pageSize: number = 10) => {
    setIsDataLoading(true);
    setError(null);
    
    try {
      const filtros: FiltrosCarga = {
        searchTerm: searchTerm || undefined,
        statusFilter: statusFilter !== "todos" ? statusFilter : undefined,
        tipoFilter: tipoFilter !== "todos" ? tipoFilter : undefined,
        naturezaFilter: naturezaFilter !== "todos" ? naturezaFilter : undefined,
        ...filtrosAvancados
      };

      const result = await cargaService.fetchCargas(page, pageSize, filtros, user?.nome ?? "");
      setCargas(result.list);
      setFilteredCargas(result.list);
      setPagination(result.pagination);
    } catch (err) {
      const errorMessage = err instanceof CargaServiceError 
        ? err.message 
        : 'Erro ao buscar cargas';
      setError(errorMessage);
      console.error('Erro ao buscar cargas:', err);
    } finally {
      setIsDataLoading(false);
    }
  }, [searchTerm, statusFilter, tipoFilter, naturezaFilter, filtrosAvancados, user]);

  // Buscar clientes - função otimizada
  const fetchClientes = useCallback(async () => {
    setIsLoadingClientes(true);
    setError(null);
    
    try {
      // Se o usuário logado for um Cliente, buscar suas próprias informações
      if (user && user.categoria === 'Cliente' && user.tipo === 'usuario') {
        const response = await fetch(`${API_BASE_URL}/getClienteDetail`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ codigo: user.codigo })
        });

        const data = await response.json();
        
        if (data.returnCode === 200 && data.data) {
          const clienteCompleto: Cliente = {
            _id: data.data._id,
            codigo: data.data.codigo,
            nome: data.data.nome,
            nuit: data.data.nuit,
            contatos: data.data.contatos
          };
          
          setClientes([clienteCompleto]);
          
          // Preencher automaticamente os campos do formulário
          setNovaCarga(prev => ({
            ...prev,
            clienteId: data.data._id,
            cliente: data.data.nome
          }));
        }
        return;
      }

      // Para Gestor ou Transportadora, buscar todos os clientes
      const response = await fetch(`${API_BASE_URL}/getClientesByCategoria`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          curPage: 1,
          pageSize: 1000,
          categoria: 'Cliente',
          status: 'ativo'
        })
      });

      const data = await response.json();
      
      if (data.returnCode === 200) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const clientesComIds: Cliente[] = (data.data.list || []).map((cliente: any) => ({
          _id: cliente._id,
          codigo: cliente.codigo,
          nome: cliente.nome,
          nuit: cliente.nuit,
          contatos: cliente.contatos
        }));
        
        setClientes(clientesComIds);
        
        // Preencher automaticamente se houver apenas um cliente
        if (clientesComIds.length === 1 && user?.categoria === 'Gestor') {
          const unicoCliente = clientesComIds[0];
          setNovaCarga(prev => ({
            ...prev,
            clienteId: unicoCliente._id,
            cliente: unicoCliente.nome
          }));
        }
      } else {
        throw new CargaServiceError(data.returnMsg, data.errorCode);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar clientes';
      setError(errorMessage);
      console.error('Erro ao buscar clientes:', err);
    } finally {
      setIsLoadingClientes(false);
    }
  }, [user]);

  // Função para selecionar cliente
  const selecionarCliente = useCallback((clienteId: string) => {
    const clienteEncontrado = clientes.find(cliente => cliente._id === clienteId);
    if (clienteEncontrado) {
      setNovaCarga(prev => ({
        ...prev,
        clienteId: clienteEncontrado._id,
        cliente: clienteEncontrado.nome
      }));
    }
  }, [clientes]);

  // Validar campos obrigatórios
 // Corrigindo a função validarCamposObrigatorios no useCargaHook.ts

const validarCamposObrigatorios = useCallback((): string[] => {
  const erros: string[] = [];

  const camposObrigatorios = [
    { campo: novaCarga.tipoCarga, nome: 'Tipo de Carga' },
    { campo: novaCarga.naturezaCarga, nome: 'Natureza da Carga' },
    { campo: novaCarga.descricao, nome: 'Descrição' },
    { campo: novaCarga.pesoBruto, nome: 'Peso Bruto' },
    { campo: novaCarga.clienteId, nome: 'ID do Cliente' },
    { campo: novaCarga.cliente, nome: 'Nome do Cliente' },
    { campo: novaCarga.origem?.pais, nome: 'País de Origem' },
    { campo: novaCarga.origem?.cidade, nome: 'Cidade de Origem' },
    { campo: novaCarga.origem?.local, nome: 'Local de Origem' },
    { campo: novaCarga.destino?.pais, nome: 'País de Destino' },
    { campo: novaCarga.destino?.cidade, nome: 'Cidade de Destino' },
    { campo: novaCarga.destino?.local, nome: 'Local de Destino' },
    { campo: novaCarga.valorMercadoria, nome: 'Valor da Mercadoria' },
    { campo: novaCarga.categoriaSeguro, nome: 'Categoria do Seguro' },
    { campo: novaCarga.abrangenciaSeguro, nome: 'Abrangência do Seguro' },
    { campo: novaCarga.tipoPercurso, nome: 'Tipo de Percurso' },
    { campo: novaCarga.destinoFrete, nome: 'Destino do Frete' }
  ];

  camposObrigatorios.forEach(({ campo, nome }) => {
    // Verificação segura para string e number
    if (campo === undefined || campo === null) {
      erros.push(nome);
    } else if (typeof campo === 'string' && campo.trim() === '') {
      erros.push(nome);
    } else if (typeof campo === 'number' && campo <= 0) {
      erros.push(nome);
    }
  });

  return erros;
}, [novaCarga]);

  // Preparar dados para envio
  const prepararDadosEnvio = useCallback(async () => {
    let clienteIdFinal = novaCarga.clienteId;
    
    // Se for usuário Cliente, buscar _id do MongoDB
    if (user && user.categoria === 'Cliente' && user.tipo === 'usuario') {
      try {
        const userResponse = await fetch(`${API_BASE_URL}/getClienteDetail`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ codigo: user.codigo })
        });

        const userData = await userResponse.json();
        if (userData.returnCode === 200 && userData.data) {
          clienteIdFinal = userData.data._id;
        }
      } catch (error) {
        console.error('Erro ao buscar _id do usuário:', error);
        throw new CargaServiceError('Não foi possível obter o ID do cliente', 'CLIENT_ID_ERROR');
      }
    }

    // Preparar dados formatados
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dadosParaEnvio: any = {
      ...novaCarga,
      clienteId: clienteIdFinal,
      cliente: novaCarga.cliente,
      // Converter números
      pesoBruto: Number(novaCarga.pesoBruto) || undefined,
      pesoLiquido: Number(novaCarga.pesoLiquido) || undefined,
      volume: Number(novaCarga.volume) || undefined,
      quantidadeVolumes: Number(novaCarga.quantidadeVolumes) || undefined,
      valorFrete: Number(novaCarga.valorFrete) || undefined,
      taxasPortuarias: Number(novaCarga.taxasPortuarias) || undefined,
      despesasOperacionais: Number(novaCarga.despesasOperacionais) || undefined,
      valorMercadoria: Number(novaCarga.valorMercadoria) || undefined,
      // Dimensões
      dimensoes: {
        largura: Number(novaCarga.dimensoes?.largura) || undefined,
        altura: Number(novaCarga.dimensoes?.altura) || undefined,
        comprimento: Number(novaCarga.dimensoes?.comprimento) || undefined
      },
      // Contentor
      contentor: {
        ...novaCarga.contentor,
        tara: Number(novaCarga.contentor?.tara) || undefined,
        capacidadeMaxima: Number(novaCarga.contentor?.capacidadeMaxima) || undefined
      },
      // Status e datas
      status: "planeada",
      dataColeta: novaCarga.dataColeta ? new Date(novaCarga.dataColeta) : undefined,
      dataEntregaPrevista: novaCarga.dataEntregaPrevista ? new Date(novaCarga.dataEntregaPrevista) : undefined,
      // Seguro
      seguro: novaCarga.contratarSeguro ? {
        ...novaCarga.seguro,
        statusSeguro: 'ativo',
        valorSegurado: Number(novaCarga.valorMercadoria) || 0
      } : undefined
    };

    // Remover campos vazios
    Object.keys(dadosParaEnvio).forEach(key => {
      if (key !== 'clienteId' && (dadosParaEnvio[key] === '' || dadosParaEnvio[key] === null || dadosParaEnvio[key] === undefined)) {
        delete dadosParaEnvio[key];
      }
    });

    return dadosParaEnvio;
  }, [novaCarga, user]);

  // Criar nova carga - função principal
  const criarNovaCarga = useCallback(async (): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Validar campos obrigatórios
      const camposFaltantes = validarCamposObrigatorios();
      if (camposFaltantes.length > 0) {
        throw new CargaServiceError(
          `Campos obrigatórios não preenchidos: ${camposFaltantes.join(', ')}`,
          'MISSING_REQUIRED_FIELDS'
        );
      }

      // Preparar dados
      const dadosParaEnvio = await prepararDadosEnvio();

      console.log('Dados para envio da carga:', dadosParaEnvio);

      // Criar carga
      const resultado = await cargaService.criarCarga(dadosParaEnvio);
      
      if (resultado) {
        // Sucesso
        setShowNovaCargaModal(false);
        resetFormNovaCarga();
        await fetchCargas(1, pagination.pageSize);
        
        console.log('Carga criada com sucesso!', resultado);
        return true;
      }
      
      return false;
      
    } catch (err) {
      const errorMessage = err instanceof CargaServiceError 
        ? err.message 
        : 'Erro ao criar carga';
      setError(errorMessage);
      console.error('Erro ao criar carga:', err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [validarCamposObrigatorios, prepararDadosEnvio, fetchCargas, pagination.pageSize]);

  // Resetar formulário
  const resetFormNovaCarga = useCallback(() => {
    setNovaCarga(getInitialCargaData());
    setError(null);
  }, []);

  // Buscar dados auxiliares
  const fetchDadosAuxiliares = useCallback(async () => {
    try {
      const [camioes, gps] = await Promise.all([
        cargaService.fetchCamioesDisponiveis(),
        cargaService.fetchGpsDisponiveis()
      ]);
      setCamioesDisponiveis(camioes);
      setGpsDisponiveis(gps);
    } catch (err) {
      console.error('Erro ao buscar dados auxiliares:', err);
    }
  }, []);

  // Exportar dados
  const exportarDados = useCallback(async () => {
    try {
      setError(null);
      const filtros: FiltrosCarga = {
        searchTerm: searchTerm || undefined,
        statusFilter: statusFilter !== "todos" ? statusFilter : undefined,
        tipoFilter: tipoFilter !== "todos" ? tipoFilter : undefined,
        naturezaFilter: naturezaFilter !== "todos" ? naturezaFilter : undefined
      };
      
      const cargasParaExportar = await cargaService.exportarCargas(filtros);
      exportToCSV(cargasParaExportar);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao exportar dados';
      setError(errorMessage);
      console.error('Erro ao exportar dados:', err);
      throw err;
    }
  }, [searchTerm, statusFilter, tipoFilter, naturezaFilter]);

  // Funções adicionais do serviço
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calcularCustosCarga = useCallback(async (dados: any) => {
    try {
      return await cargaService.calcularCustosCarga(dados);
    } catch (err) {
      console.error('Erro ao calcular custos:', err);
      throw err;
    }
  }, []);

  const verificarViabilidade = useCallback(async (codigoCarga: string, camiaoId: string) => {
    try {
      return await cargaService.verificarViabilidadeCargaCamiao(codigoCarga, camiaoId);
    } catch (err) {
      console.error('Erro ao verificar viabilidade:', err);
      throw err;
    }
  }, []);

  // Efeitos
  useEffect(() => {
    fetchCargas(1, 10);
  }, [fetchCargas]);

  useEffect(() => {
    fetchCargas(1, pagination.pageSize);
  }, [searchTerm, statusFilter, tipoFilter, naturezaFilter, filtrosAvancados, fetchCargas, pagination.pageSize]);

  useEffect(() => {
    if (showNovaCargaModal) {
      fetchClientes();
      fetchDadosAuxiliares();
    }
  }, [showNovaCargaModal, fetchClientes, fetchDadosAuxiliares]);

  useEffect(() => {
    if (user && showNovaCargaModal) {
      if (user.categoria === 'Cliente' && user.tipo === 'usuario') {
        setNovaCarga(prev => ({
          ...prev,
          clienteId: user.codigo,
          cliente: user.nome
        }));
      }
    }
  }, [user, showNovaCargaModal]);

  return {
    // Estados
    cargas,
    filteredCargas,
    isDataLoading,
    pagination,
    searchTerm,
    statusFilter,
    tipoFilter,
    naturezaFilter,
    filtrosAvancados,
    showNovaCargaModal,
    novaCarga,
    camioesDisponiveis,
    gpsDisponiveis,
    isSubmitting,
    clientes,
    isLoadingClientes,
    user,
    error,

    // Setters
    setSearchTerm,
    setStatusFilter,
    setTipoFilter,
    setNaturezaFilter,
    setFiltrosAvancados,
    setShowNovaCargaModal,
    setNovaCarga,
    setFilteredCargas,
    setError,

    // Funções
    fetchCargas,
    criarNovaCarga,
    resetFormNovaCarga,
    exportarDados,
    selecionarCliente,
    fetchClientes,
    calcularCustosCarga,
    verificarViabilidade
  };
};