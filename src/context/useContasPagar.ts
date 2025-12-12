/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react';
import axios from 'axios';
import {
  CreateContaPagarModel,
  FilterContasPagarModel,
  RegistrarPagamentoModel,
  ContaPagarListResponse,
  ApiResponse,
  DashboardResponse
} from './ContasPagarModels';

const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

export const useContasPagar = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const corrigirStatusContas = useCallback(async (data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/corrigirStatusContas`, data);
    if (response.data.returnCode === 200) {
      return response.data.data;
    }
    throw new Error(response.data.returnMsg);
  } catch (error) {
    throw error;
  }
}, []);

  // Criar conta
  const createContaPagar = async (data: CreateContaPagarModel) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<ApiResponse>(`${API_BASE_URL}/createContaPagar`, data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.returnMsg || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Listar contas
  const getContasPagarList = async (filters: FilterContasPagarModel) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<ApiResponse<ContaPagarListResponse>>(
        `${API_BASE_URL}/getContasPagarList`,
        filters
      );
      return response.data.data!;
    } catch (err: any) {
      setError(err.response?.data?.returnMsg || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Obter detalhes
  const getContaPagarDetail = async (contaId?: string, numeroConta?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<ApiResponse>(`${API_BASE_URL}/getContaPagarDetail`, {
        contaId,
        numeroConta
      });
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.returnMsg || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Registrar pagamento
  const registrarPagamento = async (data: RegistrarPagamentoModel) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<ApiResponse>(`${API_BASE_URL}/registrarPagamento`, data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.returnMsg || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Dashboard
  const getDashboard = async (periodoMeses?: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<ApiResponse<DashboardResponse>>(
        `${API_BASE_URL}/getContasPagarDashboard`,
        { periodoMeses }
      );
      return response.data.data!;
    } catch (err: any) {
      setError(err.response?.data?.returnMsg || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Atualizar conta
  const updateContaPagar = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<ApiResponse>(`${API_BASE_URL}/updateContaPagar`, data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.returnMsg || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Aprovar conta
  const aprovarContaPagar = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<ApiResponse>(`${API_BASE_URL}/aprovarContaPagar`, data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.returnMsg || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cancelar conta
  const cancelarContaPagar = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<ApiResponse>(`${API_BASE_URL}/cancelarContaPagar`, data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.returnMsg || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Exportar contas
  const exportContasPagar = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<ApiResponse>(`${API_BASE_URL}/exportContasPagar`, data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.returnMsg || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createContaPagar,
    getContasPagarList,
    getContaPagarDetail,
    registrarPagamento,
    getDashboard,
    updateContaPagar,
    aprovarContaPagar,
    cancelarContaPagar,
    exportContasPagar,
    corrigirStatusContas
  };
};