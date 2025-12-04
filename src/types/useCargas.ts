/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Carga, StatusCarga } from '@/app/dashboard/cliente/cargaService';
import { Metrics } from '@/app/dashboard/transportador/viagens';

export function useCargas(nomeEmpresa?: string) {
  const [cargas, setCargas] = useState<Carga[]>([]);
  const [filteredCargas, setFilteredCargas] = useState<Carga[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [metrics, setMetrics] = useState<Metrics>({
    totalCargas: 0,
    cargasEntregues: 0,
    cargasTransito: 0,
    cargasAtrasadas: 0,
    pesoTotal: 0,
    valorTotalFretes: 0
  });

  // Função para buscar cargas da API
  const fetchCargas = useCallback(async (page = 1, pageSize = 100) => {
    try {
      setIsDataLoading(true);
      const response = await axios.post('https://desktop-api-4f850b3f9733.herokuapp.com/getCargaList', {
        curPage: page,
        pageSize: pageSize
      });

      if (response.data.returnCode === 200) {
        const cargasData = response.data.data.list;
        
        // Mapear os dados da API para o formato da interface Carga
        const cargasMapeadas = cargasData.map((cargaData: any) => ({
          _id: cargaData._id,
          codigo: cargaData.codigo,
          tipoCarga: cargaData.tipoCarga,
          descricao: cargaData.descricao,
          naturezaCarga: cargaData.naturezaCarga,
          pesoBruto: cargaData.pesoBruto,
          cliente: cargaData.cliente,
          clienteId: cargaData.clienteId,
          origem: {
            cidade: cargaData.origem?.cidade || '',
            local: cargaData.origem?.local || ''
          },
          destino: {
            cidade: cargaData.destino?.cidade || '',
            local: cargaData.destino?.local || ''
          },
          status: cargaData.status as StatusCarga,
          prioridade: cargaData.prioridade,
          valorTotal: cargaData.valorTotal || 0,
          dataColeta: cargaData.dataColeta ? new Date(cargaData.dataColeta).toISOString() : undefined,
          dataEntregaPrevista: cargaData.dataEntregaPrevista ? new Date(cargaData.dataEntregaPrevista).toISOString() : undefined,
          dataEntregaReal: cargaData.dataEntregaReal ? new Date(cargaData.dataEntregaReal).toISOString() : undefined,
          motorista: cargaData.motorista ? {
            nome: cargaData.motorista.nome || '',
            telefone: cargaData.motorista.telefone || '',
            empresaMotorista: cargaData.motorista.empresaMotorista,
            id: cargaData.motorista.id
          } : undefined,
          veiculo: cargaData.veiculo ? {
            matricula: cargaData.veiculo.matricula || '',
            modelo: cargaData.veiculo.modelo || ''
          } : undefined,
          dataCriacao: new Date(cargaData.dataCriacao).toISOString(),
          dataAtualizacao: new Date(cargaData.dataAtualizacao).toISOString(),
          volume: cargaData.volume,
          embalagem: cargaData.embalagem,
          pontoAtual: cargaData.pontoAtual,
          ocorrencias: cargaData.ocorrencias,
          documentos: cargaData.documentos,
          nomeEmpresa: cargaData.nomeEmpresa
        }));

        setCargas(cargasMapeadas);
        setFilteredCargas(cargasMapeadas);
        calcularMetricas(cargasMapeadas);
      }
    } catch (error) {
      console.error('Erro ao buscar cargas:', error);
      // Fallback para dados de exemplo se a API falhar
      setCargas([]);
      setFilteredCargas([]);
    } finally {
      setIsDataLoading(false);
    }
  }, []);

  // Função para calcular métricas
  const calcularMetricas = (cargasList: Carga[]) => {
    const totalCargas = cargasList.length;
    const cargasEntregues = cargasList.filter(c => c.status === 'entregue').length;
    const cargasTransito = cargasList.filter(c => c.status === 'em_transito').length;
    const cargasAtrasadas = cargasList.filter(c => {
      if (!c.dataEntregaPrevista) return false;
      const dataPrevista = new Date(c.dataEntregaPrevista);
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      return dataPrevista < hoje && c.status !== 'entregue' && c.status !== 'encerrada';
    }).length;
    
    const pesoTotal = cargasList.reduce((acc, carga) => acc + (carga.pesoBruto || 0), 0);
    const valorTotalFretes = cargasList.reduce((acc, carga) => acc + (carga.valorTotal || 0), 0);

    setMetrics({
      totalCargas,
      cargasEntregues,
      cargasTransito,
      cargasAtrasadas,
      pesoTotal,
      valorTotalFretes
    });
  };

  // Função para criar nova carga
  const criarNovaCarga = async (cargaData: Partial<Carga>) => {
    try {
      // Mapear dados para o formato da API
      const dadosAPI = {
        ...cargaData,
        origem: cargaData.origem ? {
          cidade: cargaData.origem.cidade,
          local: cargaData.origem.local,
          pais: 'Moçambique'
        } : undefined,
        destino: cargaData.destino ? {
          cidade: cargaData.destino.cidade,
          local: cargaData.destino.local,
          pais: 'Moçambique'
        } : undefined,
        nomeEmpresa: nomeEmpresa || "Mega Centro e Logistica"
      };

      const response = await axios.post('https://desktop-api-4f850b3f9733.herokuapp.com/createCarga', dadosAPI);
      if (response.data.returnCode === 201) {
        await fetchCargas(); // Recarregar a lista
        return { success: true, data: response.data.data };
      }
      return { success: false, error: response.data.returnMsg };
    } catch (error: any) {
      console.error('Erro ao criar carga:', error);
      return { success: false, error: error.response?.data?.returnMsg || 'Erro ao criar carga' };
    }
  };

  // Função para atualizar status da carga
  const atualizarStatus = async (codigo: string, status: StatusCarga) => {
    try {
      const response = await axios.post('https://desktop-api-4f850b3f9733.herokuapp.com/updateCargaStatus', {
        codigo,
        status,
        observacao: `Status alterado para ${status}`,
        local: 'Sistema'
      });
      
      if (response.data.returnCode === 200) {
        // Atualizar localmente
        const updatedCargas = cargas.map(c => 
          c.codigo === codigo ? { 
            ...c, 
            status, 
            dataAtualizacao: new Date().toISOString() 
          } : c
        );
        setCargas(updatedCargas);
        setFilteredCargas(updatedCargas);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      return false;
    }
  };

  // Função para aceitar carga
  const aceitarCarga = async (codigo: string) => {
    return await atualizarStatus(codigo, 'aguardando_coleta');
  };

  // Função para visualizar detalhes da carga
  const visualizarCarga = async (carga: Carga) => {
    try {
      const response = await axios.post('https://desktop-api-4f850b3f9733.herokuapp.com/getCargaDetail', {
        codigo: carga.codigo
      });
      
      if (response.data.returnCode === 200) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar detalhes da carga:', error);
      return null;
    }
  };

  // Função para exportar dados
  const exportarDados = async (tipo: string) => {
    try {
      const dataToExport = filteredCargas.map(carga => ({
        Código: carga.codigo,
        Tipo: carga.tipoCarga,
        Descrição: carga.descricao,
        Cliente: carga.cliente,
        Origem: `${carga.origem.cidade} - ${carga.origem.local}`,
        Destino: `${carga.destino.cidade} - ${carga.destino.local}`,
        Status: carga.status,
        Prioridade: carga.prioridade,
        'Peso Bruto (kg)': carga.pesoBruto,
        'Valor Total (MZN)': carga.valorTotal,
        'Data Coleta': carga.dataColeta ? new Date(carga.dataColeta).toLocaleDateString('pt-MZ') : '',
        'Entrega Prevista': carga.dataEntregaPrevista ? new Date(carga.dataEntregaPrevista).toLocaleDateString('pt-MZ') : '',
        Motorista: carga.motorista?.nome,
        Veículo: carga.veiculo?.matricula,
        'Criado em': new Date(carga.dataCriacao).toLocaleDateString('pt-MZ')
      }));

      // Criar CSV
      const headers = Object.keys(dataToExport[0] || {});
      const csvContent = [
        headers.join(','),
        ...dataToExport.map(row => 
          headers.map(header => {
            const value = row[header as keyof typeof row];
            return value ? `"${value}"` : '';
          }).join(',')
        )
      ].join('\n');

      // Criar blob e download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `cargas_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
      alert('Erro ao exportar dados. Por favor, tente novamente.');
    }
  };

  // Função para filtrar cargas localmente
  const filtrarCargasLocalmente = useCallback((filtros: {
    searchTerm: string;
    statusFilter: string;
    tipoFilter: string;
    filtrosAvancados: any;
  }) => {
    const { searchTerm, statusFilter, tipoFilter, filtrosAvancados } = filtros;
    
    let resultado = [...cargas];

    // Filtro por termo de busca
    if (searchTerm) {
      const termo = searchTerm.toLowerCase();
      resultado = resultado.filter(carga =>
        carga.codigo.toLowerCase().includes(termo) ||
        carga.cliente.toLowerCase().includes(termo) ||
        carga.origem.cidade.toLowerCase().includes(termo) ||
        carga.destino.cidade.toLowerCase().includes(termo) ||
        carga.descricao.toLowerCase().includes(termo)
      );
    }

    // Filtro por status
    if (statusFilter !== 'todos') {
      resultado = resultado.filter(carga => carga.status === statusFilter);
    }

    // Filtro por tipo
    if (tipoFilter !== 'todos') {
      resultado = resultado.filter(carga => carga.tipoCarga === tipoFilter);
    }

    // Filtros avançados
    if (filtrosAvancados.prioridade !== 'todos') {
      resultado = resultado.filter(carga => carga.prioridade === filtrosAvancados.prioridade);
    }

    if (filtrosAvancados.valorMin) {
      const valorMin = parseFloat(filtrosAvancados.valorMin);
      resultado = resultado.filter(carga => carga.valorTotal >= valorMin);
    }

    if (filtrosAvancados.valorMax) {
      const valorMax = parseFloat(filtrosAvancados.valorMax);
      resultado = resultado.filter(carga => carga.valorTotal <= valorMax);
    }

    if (filtrosAvancados.tipoCarga !== 'todos') {
      resultado = resultado.filter(carga => carga.tipoCarga === filtrosAvancados.tipoCarga);
    }

    if (filtrosAvancados.naturezaCarga !== 'todos') {
      resultado = resultado.filter(carga => carga.naturezaCarga === filtrosAvancados.naturezaCarga);
    }

    // Filtro por data
    if (filtrosAvancados.dataInicio) {
      const dataInicio = new Date(filtrosAvancados.dataInicio);
      resultado = resultado.filter(carga => 
        new Date(carga.dataCriacao) >= dataInicio
      );
    }

    if (filtrosAvancados.dataFim) {
      const dataFim = new Date(filtrosAvancados.dataFim);
      dataFim.setHours(23, 59, 59, 999);
      resultado = resultado.filter(carga => 
        new Date(carga.dataCriacao) <= dataFim
      );
    }

    // Filtro por motorista da empresa (não é mais necessário aqui, pois é feito no componente)
    // Mas mantemos para consistência
    if (filtrosAvancados.motoristaEmpresa && nomeEmpresa) {
      resultado = resultado.filter(carga => 
        carga.motorista?.empresaMotorista && 
        carga.nomeEmpresa && 
        carga.motorista.empresaMotorista === carga.nomeEmpresa
      );
    }

    setFilteredCargas(resultado);
    calcularMetricas(resultado);
  }, [cargas, nomeEmpresa]);

  // Carregar dados inicialmente
  useEffect(() => {
    fetchCargas();
  }, [fetchCargas]);

  return {
    cargas,
    filteredCargas,
    setFilteredCargas,
    isDataLoading,
    metrics,
    fetchCargas,
    filtrarCargasLocalmente,
    criarNovaCarga,
    atualizarStatus,
    aceitarCarga,
    visualizarCarga,
    exportarDados
  };
}