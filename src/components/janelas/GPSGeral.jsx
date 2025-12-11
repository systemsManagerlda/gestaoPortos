import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

const GPSGeral = () => {
  const [activeGPSGeralForm, setActiveGPSGeralForm] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    totalVeiculos: 0,
    contentoresAtivos: 0,
    emOperacao: 0,
    alertasAtivos: 0,
    statusFrota: [],
    distribuicaoTipo: [],
    alertasCriticos: [],
    atividadeRecente: []
  });
  const [alertasData, setAlertasData] = useState([]);
  const [relatoriosData, setRelatoriosData] = useState(null);

  // Função para buscar dados do dashboard
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar dados de caminhões
      const camioesResponse = await axios.post(`${API_BASE_URL}/getCamiaoList`, {
        curPage: 1,
        pageSize: 1000
      });

      // Buscar dados de cargas (para contentores)
      const cargasResponse = await axios.post(`${API_BASE_URL}/getCargaList`, {
        curPage: 1,
        pageSize: 1000
      });

      // Buscar dados de motoristas
      const motoristasResponse = await axios.post(`${API_BASE_URL}/getMotoristaList`, {
        curPage: 1,
        pageSize: 1000
      });

      const camioes = camioesResponse.data.data.list || [];
      const cargas = cargasResponse.data.data.list || [];
      const motoristas = motoristasResponse.data.data.list || [];

      // Calcular métricas
      const totalVeiculos = camioes.length;
      
      // Contentores ativos (cargas com contentor)
      const contentoresAtivos = cargas.filter(carga => 
        carga.contentor && carga.contentor.numero
      ).length;
      
      // Veículos em operação
      const emOperacao = camioes.filter(camiao => 
        camiao.status === 'em_viagem' || camiao.status === 'disponivel'
      ).length;

      // Status da frota
      const statusCounts = camioes.reduce((acc, camiao) => {
        acc[camiao.status] = (acc[camiao.status] || 0) + 1;
        return acc;
      }, {});

      const statusFrota = Object.entries(statusCounts).map(([status, count]) => ({
        status: status.charAt(0).toUpperCase() + status.slice(1),
        count
      }));

      // Distribuição por tipo (baseado nas especificações)
      const distribuicaoTipo = camioes.reduce((acc, camiao) => {
        const tipo = camiao.especificacoes?.tipo || 'outro';
        acc[tipo] = (acc[tipo] || 0) + 1;
        return acc;
      }, {});

      const distribuicaoTipoArray = Object.entries(distribuicaoTipo).map(([tipo, count]) => ({
        tipo,
        count
      }));

      // Gerar atividade recente (últimos 5 veículos atualizados)
      const atividadeRecente = camioes
        .sort((a, b) => new Date(b.dataAtualizacao) - new Date(a.dataAtualizacao))
        .slice(0, 5)
        .map(camiao => ({
          id: camiao.camiaoId,
          matricula: camiao.matricula,
          tipo: 'Caminhão',
          status: camiao.status,
          ultimaAtualizacao: camiao.dataAtualizacao
        }));

      // Verificar alertas (exemplo: GPS próximo de expirar, manutenção atrasada)
      const hoje = new Date();
      const alertas = [];

      // Verificar GPS próximo de expirar
      camioes.forEach(camiao => {
        if (camiao.tipoGPS?.dataExpiracao) {
          const dataExpiracao = new Date(camiao.tipoGPS.dataExpiracao);
          const diasRestantes = Math.ceil((dataExpiracao - hoje) / (1000 * 60 * 60 * 24));
          
          if (diasRestantes <= 7 && diasRestantes > 0) {
            alertas.push({
              tipo: 'GPS próximo de expirar',
              severidade: diasRestantes <= 3 ? 'crítico' : 'alto',
              descricao: `GPS do camião ${camiao.matricula} expira em ${diasRestantes} dias`,
              data: camiao.tipoGPS.dataExpiracao,
              ativo: camiao.matricula
            });
          }
        }

        // Verificar manutenção atrasada
        if (camiao.manutencao?.proximaManutencao) {
          const proximaManutencao = new Date(camiao.manutencao.proximaManutencao);
          if (proximaManutencao < hoje) {
            alertas.push({
              tipo: 'Manutenção atrasada',
              severidade: 'alto',
              descricao: `Manutenção do camião ${camiao.matricula} está atrasada`,
              data: camiao.manutencao.proximaManutencao,
              ativo: camiao.matricula
            });
          }
        }
      });

      // Verificar cargas com problemas
      cargas.forEach(carga => {
        if (carga.ocorrencias && carga.ocorrencias.length > 0) {
          const ultimaOcorrencia = carga.ocorrencias[carga.ocorrencias.length - 1];
          if (ultimaOcorrencia.status !== 'resolvido') {
            alertas.push({
              tipo: 'Ocorrência na carga',
              severidade: ultimaOcorrencia.severidade || 'médio',
              descricao: `${ultimaOcorrencia.descricao} - Carga ${carga.codigo}`,
              data: ultimaOcorrencia.dataRegistro,
              ativo: carga.codigo
            });
          }
        }

        // Verificar entregas atrasadas
        if (carga.dataEntregaPrevista && carga.status !== 'entregue') {
          const dataEntrega = new Date(carga.dataEntregaPrevista);
          if (dataEntrega < hoje) {
            alertas.push({
              tipo: 'Entrega atrasada',
              severidade: 'alto',
              descricao: `Carga ${carga.codigo} está atrasada para entrega`,
              data: carga.dataEntregaPrevista,
              ativo: carga.codigo
            });
          }
        }
      });

      setDashboardData({
        totalVeiculos,
        contentoresAtivos,
        emOperacao,
        alertasAtivos: alertas.length,
        statusFrota,
        distribuicaoTipo: distribuicaoTipoArray,
        alertasCriticos: alertas.slice(0, 5),
        atividadeRecente
      });

    } catch (err) {
      console.error('Erro ao buscar dados do dashboard:', err);
      setError('Erro ao carregar dados do dashboard. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar alertas detalhados
  const fetchAlertasData = async () => {
    try {
      setLoading(true);
      
      // Buscar todas as cargas com ocorrências
      const cargasResponse = await axios.post(`${API_BASE_URL}/getCargaList`, {
        curPage: 1,
        pageSize: 1000
      });

      // Buscar todos os caminhões
      const camioesResponse = await axios.post(`${API_BASE_URL}/getCamiaoList`, {
        curPage: 1,
        pageSize: 1000
      });

      const cargas = cargasResponse.data.data.list || [];
      const camioes = camioesResponse.data.data.list || [];
      const hoje = new Date();
      const todosAlertas = [];

      // Processar alertas de cargas
      cargas.forEach(carga => {
        if (carga.ocorrencias && carga.ocorrencias.length > 0) {
          carga.ocorrencias.forEach(ocorrencia => {
            if (ocorrencia.status !== 'resolvido') {
              todosAlertas.push({
                id: ocorrencia.id,
                tipo: ocorrencia.tipo,
                descricao: ocorrencia.descricao,
                severidade: ocorrencia.severidade || 'médio',
                data: ocorrencia.dataRegistro,
                ativo: `Carga: ${carga.codigo}`,
                status: ocorrencia.status,
                tipoAtivo: 'carga'
              });
            }
          });
        }

        // Verificar atrasos de entrega
        if (carga.dataEntregaPrevista && carga.status !== 'entregue') {
          const dataEntrega = new Date(carga.dataEntregaPrevista);
          if (dataEntrega < hoje) {
            todosAlertas.push({
              id: `atraso-${carga.codigo}`,
              tipo: 'Entrega atrasada',
              descricao: `Carga atrasada para entrega. Prevista: ${new Date(carga.dataEntregaPrevista).toLocaleDateString()}`,
              severidade: 'alto',
              data: carga.dataEntregaPrevista,
              ativo: `Carga: ${carga.codigo}`,
              status: 'pendente',
              tipoAtivo: 'carga'
            });
          }
        }
      });

      // Processar alertas de caminhões
      camioes.forEach(camiao => {
        // GPS próximo de expirar
        if (camiao.tipoGPS?.dataExpiracao) {
          const dataExpiracao = new Date(camiao.tipoGPS.dataExpiracao);
          const diasRestantes = Math.ceil((dataExpiracao - hoje) / (1000 * 60 * 60 * 24));
          
          if (diasRestantes <= 30) {
            let severidade = 'baixo';
            if (diasRestantes <= 7) severidade = 'alto';
            if (diasRestantes <= 3) severidade = 'crítico';
            
            todosAlertas.push({
              id: `gps-${camiao.camiaoId}`,
              tipo: 'GPS próximo de expirar',
              descricao: `GPS expira em ${diasRestantes} dias (${dataExpiracao.toLocaleDateString()})`,
              severidade,
              data: camiao.tipoGPS.dataExpiracao,
              ativo: `Caminhão: ${camiao.matricula}`,
              status: diasRestantes > 0 ? 'pendente' : 'expirado',
              tipoAtivo: 'caminhao'
            });
          }
        }

        // Manutenção atrasada
        if (camiao.manutencao?.proximaManutencao) {
          const proximaManutencao = new Date(camiao.manutencao.proximaManutencao);
          if (proximaManutencao < hoje) {
            const diasAtraso = Math.ceil((hoje - proximaManutencao) / (1000 * 60 * 60 * 24));
            todosAlertas.push({
              id: `manutencao-${camiao.camiaoId}`,
              tipo: 'Manutenção atrasada',
              descricao: `Manutenção atrasada há ${diasAtraso} dias`,
              severidade: diasAtraso > 7 ? 'crítico' : 'alto',
              data: camiao.manutencao.proximaManutencao,
              ativo: `Caminhão: ${camiao.matricula}`,
              status: 'pendente',
              tipoAtivo: 'caminhao'
            });
          }
        }

        // Inspeção vencida
        if (camiao.nivelInspecao?.dataProximaInspecao) {
          const dataInspecao = new Date(camiao.nivelInspecao.dataProximaInspecao);
          if (dataInspecao < hoje) {
            const diasAtraso = Math.ceil((hoje - dataInspecao) / (1000 * 60 * 60 * 24));
            todosAlertas.push({
              id: `inspecao-${camiao.camiaoId}`,
              tipo: 'Inspeção vencida',
              descricao: `Inspeção vencida há ${diasAtraso} dias`,
              severidade: 'crítico',
              data: camiao.nivelInspecao.dataProximaInspecao,
              ativo: `Caminhão: ${camiao.matricula}`,
              status: 'pendente',
              tipoAtivo: 'caminhao'
            });
          }
        }
      });

      // Ordenar por severidade e data
      const severidadeOrdem = { 'crítico': 0, 'alto': 1, 'médio': 2, 'baixo': 3 };
      todosAlertas.sort((a, b) => {
        if (severidadeOrdem[a.severidade] !== severidadeOrdem[b.severidade]) {
          return severidadeOrdem[a.severidade] - severidadeOrdem[b.severidade];
        }
        return new Date(b.data) - new Date(a.data);
      });

      setAlertasData(todosAlertas);

    } catch (err) {
      console.error('Erro ao buscar alertas:', err);
      setError('Erro ao carregar alertas. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Função para gerar relatório
  const gerarRelatorio = async (tipoRelatorio, dataInicio, dataFim) => {
    try {
      setLoading(true);
      
      let relatorio = {
        tipo: tipoRelatorio,
        periodo: `${dataInicio} a ${dataFim}`,
        dataGeracao: new Date().toISOString(),
        metricas: {},
        detalhes: []
      };

      if (tipoRelatorio === 'Relatório Consolidado') {
        // Buscar dados para o período
        const cargasResponse = await axios.post(`${API_BASE_URL}/getCargaList`, {
          curPage: 1,
          pageSize: 1000,
          dataInicio,
          dataFim
        });

        const camioesResponse = await axios.post(`${API_BASE_URL}/getCamiaoList`, {
          curPage: 1,
          pageSize: 1000
        });

        const cargas = cargasResponse.data.data.list || [];
        const camioes = camioesResponse.data.data.list || [];

        // Calcular métricas
        const cargasNoPeriodo = cargas.filter(carga => {
          const dataCriacao = new Date(carga.dataCriacao);
          return dataCriacao >= new Date(dataInicio) && dataCriacao <= new Date(dataFim);
        });

        relatorio.metricas = {
          totalCargas: cargasNoPeriodo.length,
          cargasEntregues: cargasNoPeriodo.filter(c => c.status === 'entregue').length,
          cargasEmTransito: cargasNoPeriodo.filter(c => c.status === 'em_transito').length,
          valorTotalFretes: cargasNoPeriodo.reduce((sum, c) => sum + (c.valorFrete || 0), 0),
          valorTotalSeguros: cargasNoPeriodo.reduce((sum, c) => sum + (c.seguro?.premioFinal || 0), 0),
          totalCamioesAtivos: camioes.filter(c => c.status === 'em_viagem' || c.status === 'disponivel').length,
          totalContentores: cargasNoPeriodo.filter(c => c.contentor).length
        };

        // Detalhes por tipo de percurso
        const porPercurso = cargasNoPeriodo.reduce((acc, carga) => {
          const percurso = carga.tipoPercurso || 'Não especificado';
          acc[percurso] = (acc[percurso] || 0) + 1;
          return acc;
        }, {});

        relatorio.detalhes.push({
          titulo: 'Distribuição por Tipo de Percurso',
          dados: porPercurso
        });

      } else if (tipoRelatorio === 'Desempenho por Tipo') {
        // Lógica para relatório de desempenho por tipo
        const camioesResponse = await axios.post(`${API_BASE_URL}/getCamiaoList`, {
          curPage: 1,
          pageSize: 1000
        });

        const camioes = camioesResponse.data.data.list || [];
        
        // Agrupar por tipo de veículo
        const porTipo = camioes.reduce((acc, camiao) => {
          const tipo = camiao.especificacoes?.tipo || 'outro';
          if (!acc[tipo]) {
            acc[tipo] = {
              total: 0,
              emOperacao: 0,
              emManutencao: 0
            };
          }
          acc[tipo].total++;
          if (camiao.status === 'em_viagem' || camiao.status === 'disponivel') {
            acc[tipo].emOperacao++;
          } else if (camiao.status === 'manutencao') {
            acc[tipo].emManutencao++;
          }
          return acc;
        }, {});

        relatorio.detalhes.push({
          titulo: 'Desempenho por Tipo de Veículo',
          dados: porTipo
        });

      }

      setRelatoriosData(relatorio);

    } catch (err) {
      console.error('Erro ao gerar relatório:', err);
      setError('Erro ao gerar relatório. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Carregar dados quando o componente montar ou quando mudar de aba
  useEffect(() => {
    if (activeGPSGeralForm === 'dashboard') {
      fetchDashboardData();
    } else if (activeGPSGeralForm === 'alertas') {
      fetchAlertasData();
    }
  }, [activeGPSGeralForm]);

  // Funções para manipular alertas
  const resolverAlerta = (id) => {
    // Implementar lógica para marcar alerta como resolvido
    setAlertasData(prev => prev.filter(alerta => alerta.id !== id));
  };

  const ignorarAlerta = (id) => {
    // Implementar lógica para ignorar alerta
    setAlertasData(prev => prev.filter(alerta => alerta.id !== id));
  };

  // Renderizar loading
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dados...</p>
        </div>
      </div>
    );
  }

  // Renderizar erro
  if (error && activeGPSGeralForm === 'dashboard') {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-red-600 font-medium mb-2">Erro ao carregar dados</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-violet-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-violet-500 text-white p-2 rounded-lg mr-3">
            🌐
          </span>
          GPS Geral - Monitoramento Geral da Frota
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Visão consolidada de caminhões, contentores e ativos da frota
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveGPSGeralForm("dashboard")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeGPSGeralForm === "dashboard"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveGPSGeralForm("alertas")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeGPSGeralForm === "alertas"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ⚠️ Alertas ({alertasData.length})
          </button>
          <button
            onClick={() => setActiveGPSGeralForm("graficos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeGPSGeralForm === "graficos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Gráficos
          </button>
          <button
            onClick={() => setActiveGPSGeralForm("relatorios")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeGPSGeralForm === "relatorios"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📋 Relatórios
          </button>
        </div>

        {/* Dashboard Geral */}
        {activeGPSGeralForm === "dashboard" && (
          <div className="space-y-6">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total de Veículos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardData.totalVeiculos}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">🚛</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Contentores Ativos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardData.contentoresAtivos}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">📦</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Em Operação
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardData.emOperacao}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">🛣️</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    {dashboardData.totalVeiculos > 0 
                      ? `${Math.round((dashboardData.emOperacao / dashboardData.totalVeiculos) * 100)}% da frota`
                      : '0% da frota'
                    }
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Alertas Ativos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardData.alertasAtivos}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">⚠️</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    {dashboardData.alertasCriticos.filter(a => a.severidade === 'crítico').length} críticos
                  </span>
                </div>
              </div>
            </div>

            {/* Grid de Informações */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Status da Frota */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Status da Frota
                </h3>
                <div className="space-y-3">
                  {dashboardData.statusFrota.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">
                        {item.status}
                      </span>
                      <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Distribuição por Tipo */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Distribuição por Tipo
                </h3>
                <div className="space-y-3">
                  {dashboardData.distribuicaoTipo.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {item.tipo}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alertas Críticos */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Alertas Críticos
                </h3>
                <div className="space-y-2">
                  {dashboardData.alertasCriticos.slice(0, 3).map((alerta, index) => (
                    <div key={index} className="flex items-start space-x-2 p-2 bg-blue-50 rounded-lg">
                      <span className={`mt-0.5 ${
                        alerta.severidade === 'crítico' ? 'text-red-500' :
                        alerta.severidade === 'alto' ? 'text-orange-500' :
                        'text-yellow-500'
                      }`}>
                        {alerta.severidade === 'crítico' ? '🔴' :
                         alerta.severidade === 'alto' ? '🟠' : '🟡'}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {alerta.tipo}
                        </p>
                        <p className="text-xs text-gray-600">
                          {alerta.ativo}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Atividade Recente */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900">
                  Atividade Recente
                </h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 text-sm font-medium text-gray-700">
                          Ativo
                        </th>
                        <th className="text-left py-3 text-sm font-medium text-gray-700">
                          Tipo
                        </th>
                        <th className="text-left py-3 text-sm font-medium text-gray-700">
                          Status
                        </th>
                        <th className="text-left py-3 text-sm font-medium text-gray-700">
                          Última Atualização
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.atividadeRecente.map((item, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 text-sm font-medium text-gray-900">
                            {item.matricula}
                          </td>
                          <td className="py-3 text-sm text-gray-600">
                            {item.tipo}
                          </td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              item.status === 'em_viagem' ? 'bg-green-100 text-green-600' :
                              item.status === 'disponivel' ? 'bg-blue-100 text-blue-600' :
                              item.status === 'manutencao' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 text-sm text-gray-600">
                            {new Date(item.ultimaAtualizacao).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alertas Consolidados */}
        {activeGPSGeralForm === "alertas" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-orange-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-orange-500 text-white p-2 rounded-lg mr-2">
                  ⚠️
                </span>
                Centro de Alertas e Notificações ({alertasData.length})
              </h3>
            </div>
            <div className="p-6">
              {/* Filtros */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Severidade
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                    onChange={(e) => {
                      // Implementar filtro por severidade
                    }}
                  >
                    <option value="todos">Todas</option>
                    <option value="critico">Crítico</option>
                    <option value="alto">Alto</option>
                    <option value="medio">Médio</option>
                    <option value="baixo">Baixo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Ativo
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                    onChange={(e) => {
                      // Implementar filtro por tipo de ativo
                    }}
                  >
                    <option value="todos">Todos</option>
                    <option value="caminhao">Caminhões</option>
                    <option value="contentor">Contentores</option>
                    <option value="carga">Cargas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                    onChange={(e) => {
                      // Implementar filtro por status
                    }}
                  >
                    <option value="ativos">Ativos</option>
                    <option value="resolvidos">Resolvidos</option>
                    <option value="todos">Todos</option>
                  </select>
                </div>
              </div>

              {/* Lista de Alertas */}
              <div className="space-y-4">
                {alertasData.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-green-500 text-4xl mb-4">✅</div>
                    <p className="text-gray-600">Nenhum alerta encontrado</p>
                  </div>
                ) : (
                  alertasData.map((alerta, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border ${
                        alerta.severidade === 'crítico' ? 'bg-red-50 border-red-200' :
                        alerta.severidade === 'alto' ? 'bg-orange-50 border-orange-200' :
                        alerta.severidade === 'médio' ? 'bg-yellow-50 border-yellow-200' :
                        'bg-blue-50 border-blue-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className={`p-2 rounded-lg ${
                            alerta.severidade === 'crítico' ? 'bg-red-500 text-white' :
                            alerta.severidade === 'alto' ? 'bg-orange-500 text-white' :
                            alerta.severidade === 'médio' ? 'bg-yellow-500 text-white' :
                            'bg-blue-500 text-white'
                          }`}>
                            {alerta.severidade === 'crítico' ? '🔴' :
                             alerta.severidade === 'alto' ? '🟠' :
                             alerta.severidade === 'médio' ? '🟡' : '🔵'}
                          </span>
                          <div>
                            <p className="font-medium text-gray-900">
                              {alerta.tipo}
                            </p>
                            <p className="text-sm text-gray-600">
                              {alerta.ativo} • {alerta.descricao}
                            </p>
                            <p className={`text-xs font-medium ${
                              alerta.severidade === 'crítico' ? 'text-red-600' :
                              alerta.severidade === 'alto' ? 'text-orange-600' :
                              alerta.severidade === 'médio' ? 'text-yellow-600' :
                              'text-blue-600'
                            }`}>
                              {alerta.severidade.charAt(0).toUpperCase() + alerta.severidade.slice(1)} • {new Date(alerta.data).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => resolverAlerta(alerta.id)}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                          >
                            Resolver
                          </button>
                          <button 
                            onClick={() => ignorarAlerta(alerta.id)}
                            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                          >
                            Ignorar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Gráficos */}
        {activeGPSGeralForm === "graficos" && (
          <div className="space-y-6 text-gray-950">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-violet-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-violet-500 text-white p-2 rounded-lg mr-2">
                    📈
                  </span>
                  Dashboard Geral - Métricas Consolidadas da Frota
                </h3>
              </div>
              <div className="p-6">
                {/* Grid de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Distribuição */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-violet-500 mr-2">📊</span>
                      Distribuição por Tipo de Ativo
                    </h4>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center w-full">
                        <div className="flex justify-center mb-4">
                          <div className="relative w-32 h-32">
                            <div
                              className="w-full h-full rounded-full"
                              style={{
                                background:
                                  "conic-gradient(#3b82f6 0% 67%, #06b6d4 67% 89%, #10b981 89% 96%, #f59e0b 96% 100%)",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                            <span>Caminhões (67%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-cyan-500 rounded mr-2"></div>
                            <span>Contentores (22%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                            <span>Veículos (7%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                            <span>Equipamentos (4%)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Status */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-blue-500 mr-2">🔄</span>
                      Status Operacional
                    </h4>
                    <div className="h-64 flex items-end justify-between space-x-2">
                      {dashboardData.statusFrota.map((item, index) => {
                        const total = dashboardData.totalVeiculos;
                        const percentage = total > 0 ? (item.count / total) * 100 : 0;
                        return (
                          <div
                            key={index}
                            className="flex flex-col items-center flex-1 h-full"
                          >
                            <div className="flex flex-col justify-end h-full w-3/4 rounded-t-lg overflow-hidden">
                              <div
                                className="bg-blue-500 w-full transition-all hover:opacity-80"
                                style={{ height: `${percentage}%` }}
                                title={`${item.status}: ${item.count} (${Math.round(percentage)}%)`}
                              ></div>
                            </div>
                            <span className="text-xs mt-2 font-medium">
                              {item.status.substring(0, 3)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Métricas Rápidas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
                    <p className="text-sm text-violet-600 font-medium">
                      Ativos Monitorados
                    </p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardData.totalVeiculos + dashboardData.contentoresAtivos}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">
                      Taxa Disponibilidade
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardData.totalVeiculos > 0 
                        ? `${Math.round((dashboardData.emOperacao / dashboardData.totalVeiculos) * 100)}%`
                        : '0%'
                      }
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600 font-medium">
                      Alertas/Mês
                    </p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardData.alertasAtivos}</p>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                    <p className="text-sm text-cyan-600 font-medium">
                      Contentores Ativos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardData.contentoresAtivos}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Relatórios */}
        {activeGPSGeralForm === "relatorios" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-indigo-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-indigo-500 text-white p-2 rounded-lg mr-2">
                  📋
                </span>
                Relatórios Consolidados da Frota
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-blue-600 text-lg mb-2">📊</div>
                  <p className="font-medium text-gray-900">
                    Desempenho Geral
                  </p>
                  <p className="text-sm text-gray-600">
                    Métricas consolidadas
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-green-600 text-lg mb-2">🚛</div>
                  <p className="font-medium text-gray-900">
                    Frota de Caminhões
                  </p>
                  <p className="text-sm text-gray-600">
                    Relatório específico
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-orange-600 text-lg mb-2">📦</div>
                  <p className="font-medium text-gray-900">Contentores</p>
                  <p className="text-sm text-gray-600">
                    Utilização e status
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-red-600 text-lg mb-2">⚠️</div>
                  <p className="font-medium text-gray-900">Alertas</p>
                  <p className="text-sm text-gray-600">
                    Histórico e análise
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-4">
                  Gerar Relatório Personalizado
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Relatório
                    </label>
                    <select 
                      id="tipoRelatorio"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    >
                      <option>Relatório Consolidado</option>
                      <option>Desempenho por Tipo</option>
                      <option>Alertas por Período</option>
                      <option>Eficiência Operacional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Inicial
                    </label>
                    <input
                      id="dataInicio"
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Final
                    </label>
                    <input
                      id="dataFim"
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    />
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const tipoRelatorio = document.getElementById('tipoRelatorio').value;
                    const dataInicio = document.getElementById('dataInicio').value;
                    const dataFim = document.getElementById('dataFim').value;
                    gerarRelatorio(tipoRelatorio, dataInicio, dataFim);
                  }}
                  className="mt-4 px-6 py-2 bg-violet-500 text-white rounded-lg hover:bg-indigo-600 font-medium"
                >
                  Gerar Relatório
                </button>
              </div>

              {/* Exibir relatório gerado */}
              {relatoriosData && (
                <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">
                    Relatório Gerado
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Tipo: {relatoriosData.tipo}</p>
                      <p className="text-sm text-gray-600">Período: {relatoriosData.periodo}</p>
                      <p className="text-sm text-gray-600">Gerado em: {new Date(relatoriosData.dataGeracao).toLocaleString()}</p>
                    </div>
                    
                    {Object.keys(relatoriosData.metricas).length > 0 && (
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Métricas:</h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {Object.entries(relatoriosData.metricas).map(([key, value], index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded">
                              <p className="text-sm text-gray-600">{key}</p>
                              <p className="text-lg font-bold">{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end space-x-2">
                      <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
                        Exportar PDF
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
                        Exportar Excel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GPSGeral;