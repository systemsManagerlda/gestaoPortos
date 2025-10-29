"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';

interface Relatorio {
  id: number;
  periodo: string;
  cargasTransportadas: number;
  distanciaTotal: number;
  faturamento: number;
  status: 'gerado' | 'pendente';
  dataGeracao: string;
}

export default function VisualizarRelatorios() {
  const [periodo, setPeriodo] = useState({
    inicio: '',
    fim: ''
  });

  // Dados moçambicanos
  const relatorios: Relatorio[] = [
    {
      id: 1,
      periodo: 'Dezembro 2023',
      cargasTransportadas: 15,
      distanciaTotal: 2850,
      faturamento: 425000,
      status: 'gerado',
      dataGeracao: '2024-01-05'
    },
    {
      id: 2,
      periodo: 'Novembro 2023',
      cargasTransportadas: 12,
      distanciaTotal: 2180,
      faturamento: 342000,
      status: 'gerado',
      dataGeracao: '2023-12-03'
    },
    {
      id: 3,
      periodo: 'Outubro 2023',
      cargasTransportadas: 14,
      distanciaTotal: 2650,
      faturamento: 398000,
      status: 'gerado',
      dataGeracao: '2023-11-02'
    },
    {
      id: 4,
      periodo: 'Setembro 2023',
      cargasTransportadas: 10,
      distanciaTotal: 1850,
      faturamento: 278000,
      status: 'gerado',
      dataGeracao: '2023-10-02'
    }
  ];

  const handleGerarRelatorio = () => {
    if (!periodo.inicio || !periodo.fim) {
      alert('Selecione o período para gerar o relatório.');
      return;
    }
    alert(`Relatório solicitado para o período ${periodo.inicio} a ${periodo.fim}`);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN'
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'gerado': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'pendente': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  // Cálculos para estatísticas
  const totalCargas = relatorios.reduce((sum, r) => sum + r.cargasTransportadas, 0);
  const totalDistancia = relatorios.reduce((sum, r) => sum + r.distanciaTotal, 0);
  const totalFaturamento = relatorios.reduce((sum, r) => sum + r.faturamento, 0);
  const mediaMensalCargas = Math.round(totalCargas / relatorios.length);
  const mediaMensalDistancia = Math.round(totalDistancia / relatorios.length);
  const mediaMensalFaturamento = Math.round(totalFaturamento / relatorios.length);
  const mediaPorCarga = Math.round(totalFaturamento / totalCargas);

  return (
    <Layout>
       <div className="min-h-screen bg-gray-900">
      <Head>
        <title>Relatórios - Sistema Moçambique</title>
      </Head>

      <header className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-white truncate">📊 Relatórios</h1>
              <p className="text-gray-400 truncate">Acesse relatórios de transportes - Moçambique</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filtros e Gerar Relatório */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="mr-2">📈</span>
                Gerar Novo Relatório
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Data Início</label>
                  <input
                    type="date"
                    value={periodo.inicio}
                    onChange={(e) => setPeriodo({...periodo, inicio: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Data Fim</label>
                  <input
                    type="date"
                    value={periodo.fim}
                    onChange={(e) => setPeriodo({...periodo, fim: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex items-end min-w-0">
                  <button
                    onClick={handleGerarRelatorio}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium transition-all flex items-center justify-center"
                  >
                    <span className="mr-2">📄</span>
                    Gerar Relatório
                  </button>
                </div>
              </div>
            </div>

            {/* Estatísticas Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 min-w-0">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-500/20 rounded-lg shadow-sm flex-shrink-0">
                    <span className="text-2xl text-blue-400">📦</span>
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className="text-sm font-medium text-gray-400 truncate">Total Cargas</p>
                    <p className="text-2xl font-bold text-white truncate">{totalCargas}</p>
                    <p className="text-xs text-gray-500 truncate">Últimos {relatorios.length} meses</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-green-500/20 min-w-0">
                <div className="flex items-center">
                  <div className="p-3 bg-green-500/20 rounded-lg shadow-sm flex-shrink-0">
                    <span className="text-2xl text-green-400">🛣️</span>
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className="text-sm font-medium text-gray-400 truncate">Distância Total</p>
                    <p className="text-2xl font-bold text-white truncate">{totalDistancia.toLocaleString()} km</p>
                    <p className="text-xs text-gray-500 truncate">Últimos {relatorios.length} meses</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-purple-500/20 min-w-0">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-500/20 rounded-lg shadow-sm flex-shrink-0">
                    <span className="text-2xl text-purple-400">💰</span>
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className="text-sm font-medium text-gray-400 truncate">Faturamento Total</p>
                    <p className="text-2xl font-bold text-white truncate">{formatCurrency(totalFaturamento)}</p>
                    <p className="text-xs text-gray-500 truncate">Últimos {relatorios.length} meses</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-orange-500/20 min-w-0">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-500/20 rounded-lg shadow-sm flex-shrink-0">
                    <span className="text-2xl text-orange-400">📊</span>
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className="text-sm font-medium text-gray-400 truncate">Média por Carga</p>
                    <p className="text-2xl font-bold text-white truncate">{formatCurrency(mediaPorCarga)}</p>
                    <p className="text-xs text-gray-500 truncate">Valor médio</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de Relatórios */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate">📋 Relatórios Gerados</h3>
                    <p className="text-gray-400 text-sm truncate">Histórico de relatórios mensais</p>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition-all flex items-center justify-center flex-shrink-0">
                    <span className="mr-2">📤</span>
                    Exportar Todos
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {relatorios.map((relatorio) => (
                    <div key={relatorio.id} className="border border-gray-600 rounded-xl p-6 bg-gray-700/50 hover:bg-gray-700/70 transition-all">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex items-center min-w-0 flex-1">
                          <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                            <span className="text-white text-lg">📊</span>
                          </div>
                          <div className="ml-4 min-w-0">
                            <h4 className="font-semibold text-white truncate">{relatorio.periodo}</h4>
                            <p className="text-sm text-gray-400 truncate">
                              Gerado em {new Date(relatorio.dataGeracao).toLocaleDateString('pt-MZ')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between lg:justify-end gap-4 flex-shrink-0">
                          <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(relatorio.status)} whitespace-nowrap`}>
                            {relatorio.status === 'gerado' ? '✅ Disponível' : '🟡 Pendente'}
                          </span>
                          <button className="text-blue-400 hover:text-blue-300 font-medium transition-all flex items-center whitespace-nowrap">
                            <span className="mr-1">📥</span>
                            Baixar
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-600/30 p-3 rounded-lg text-center min-w-0">
                          <p className="text-gray-400 text-sm truncate">Cargas Transportadas</p>
                          <p className="font-semibold text-lg text-white truncate">{relatorio.cargasTransportadas}</p>
                        </div>
                        <div className="bg-gray-600/30 p-3 rounded-lg text-center min-w-0">
                          <p className="text-gray-400 text-sm truncate">Distância Total</p>
                          <p className="font-semibold text-lg text-orange-400 truncate">{relatorio.distanciaTotal.toLocaleString()} km</p>
                        </div>
                        <div className="bg-gray-600/30 p-3 rounded-lg text-center min-w-0">
                          <p className="text-gray-400 text-sm truncate">Faturamento</p>
                          <p className="font-semibold text-lg text-green-400 truncate">
                            {formatCurrency(relatorio.faturamento)}
                          </p>
                        </div>
                      </div>

                      {/* Métricas Adicionais */}
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-400">
                        <div className="text-center">
                          <span>Média por carga: </span>
                          <span className="text-green-400 font-medium">
                            {formatCurrency(relatorio.faturamento / relatorio.cargasTransportadas)}
                          </span>
                        </div>
                        <div className="text-center">
                          <span>Média por km: </span>
                          <span className="text-blue-400 font-medium">
                            {formatCurrency(relatorio.faturamento / relatorio.distanciaTotal)}/km
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mensagem quando não há relatórios */}
                {relatorios.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📊</div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Nenhum relatório encontrado
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Gere seu primeiro relatório para visualizar as estatísticas.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Painel Lateral */}
          <div className="lg:col-span-1 space-y-6">
            {/* Estatísticas Mensais */}
            <div className="bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white truncate">📅 Estatísticas Mensais</h2>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg">
                  <span className="text-blue-400 truncate">Cargas/Mês</span>
                  <span className="text-blue-400 font-bold whitespace-nowrap">{mediaMensalCargas}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                  <span className="text-green-400 truncate">Distância/Mês</span>
                  <span className="text-green-400 font-bold whitespace-nowrap">{mediaMensalDistancia} km</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg">
                  <span className="text-purple-400 truncate">Faturamento/Mês</span>
                  <span className="text-purple-400 font-bold whitespace-nowrap">{formatCurrency(mediaMensalFaturamento)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg">
                  <span className="text-orange-400 truncate">Rendimento/km</span>
                  <span className="text-orange-400 font-bold whitespace-nowrap">
                    {formatCurrency(mediaMensalFaturamento / mediaMensalDistancia)}
                  </span>
                </div>
              </div>
            </div>

            {/* Tipos de Relatório */}
            <div className="bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white truncate">📋 Tipos de Relatório</h2>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                  <span className="text-gray-300 truncate">Mensal</span>
                  <span className="text-white font-bold whitespace-nowrap">{relatorios.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                  <span className="text-gray-300 truncate">Trimestral</span>
                  <span className="text-white font-bold whitespace-nowrap">1</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                  <span className="text-gray-300 truncate">Anual</span>
                  <span className="text-white font-bold whitespace-nowrap">0</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                  <span className="text-gray-300 truncate">Personalizado</span>
                  <span className="text-white font-bold whitespace-nowrap">0</span>
                </div>
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white truncate">⚡ Ações Rápidas</h2>
              </div>
              <div className="p-4 space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm flex items-center justify-center transition-all">
                  <span className="mr-2">📊</span>
                  <span className="truncate">Relatório Mensal</span>
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 text-sm flex items-center justify-center transition-all">
                  <span className="mr-2">💰</span>
                  <span className="truncate">Análise Financeira</span>
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 text-sm flex items-center justify-center transition-all">
                  <span className="mr-2">🚛</span>
                  <span className="truncate">Desempenho Rotas</span>
                </button>
                <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 text-sm flex items-center justify-center transition-all">
                  <span className="mr-2">📈</span>
                  <span className="truncate">Métricas Chave</span>
                </button>
              </div>
            </div>

            {/* Dicas */}
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <h3 className="text-lg font-semibold text-blue-400 mb-2 truncate">💡 Dicas</h3>
              <ul className="text-blue-300 text-sm space-y-1">
                <li className="truncate">• Relatórios gerados automaticamente</li>
                <li className="truncate">• Períodos personalizados disponíveis</li>
                <li className="truncate">• Use para análise de desempenho</li>
                <li className="truncate">• Download em PDF disponível</li>
                <li className="truncate">• Compare com meses anteriores</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
    </Layout>
   
  );
}