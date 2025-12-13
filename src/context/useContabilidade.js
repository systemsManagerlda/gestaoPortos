import { useState, useCallback } from 'react';

export const useContabilidade = () => {
  const [data, setData] = useState({
    dashboard: null,
    lancamentos: [],
    balancete: null,
    loading: false
  });

  const fetchData = useCallback(async (endpoint, body) => {
    try {
      const response = await fetch(`https://desktop-api-4f850b3f9733.herokuapp.com/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      return await response.json();
    } catch (error) {
      console.error(`Erro ao buscar ${endpoint}:`, error);
      return null;
    }
  }, []);

  const loadDashboard = useCallback(async () => {
    setData(prev => ({ ...prev, loading: true }));
    const result = await fetchData('getContabilidadeDashboard', { periodoMeses: 12 });
    if (result?.returnCode === 200) {
      setData(prev => ({ ...prev, dashboard: result.data, loading: false }));
    }
  }, [fetchData]);

  const loadLancamentos = useCallback(async (filtros = {}) => {
    setData(prev => ({ ...prev, loading: true }));
    const result = await fetchData('getLancamentosList', {
      curPage: 1,
      pageSize: 50,
      ...filtros
    });
    if (result?.returnCode === 200) {
      setData(prev => ({ ...prev, lancamentos: result.data?.list || [], loading: false }));
    }
  }, [fetchData]);

  const loadBalancete = useCallback(async (ano, mes) => {
    setData(prev => ({ ...prev, loading: true }));
    const result = await fetchData('gerarBalancete', { ano, mes, detalhado: true });
    if (result?.returnCode === 200) {
      setData(prev => ({ ...prev, balancete: result.data, loading: false }));
    }
  }, [fetchData]);

  const createLancamento = useCallback(async (lancamentoData) => {
    setData(prev => ({ ...prev, loading: true }));
    const result = await fetchData('createLancamento', lancamentoData);
    if (result?.returnCode === 201) {
      await Promise.all([loadDashboard(), loadLancamentos()]);
    }
    setData(prev => ({ ...prev, loading: false }));
    return result;
  }, [fetchData, loadDashboard, loadLancamentos]);

  return {
    ...data,
    loadDashboard,
    loadLancamentos,
    loadBalancete,
    createLancamento,
    fetchData
  };
};