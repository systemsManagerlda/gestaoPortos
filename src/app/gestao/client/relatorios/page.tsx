"use client";
import Layout from '@/components/layout/Layout';
import React, { useState } from 'react';

interface Relatorio {
  id: number;
  codigoCarga: string;
  tipo: 'final' | 'parcial' | 'incidente' | 'customizado';
  dataGeracao: string;
  periodo: string;
  status: 'disponivel' | 'processando' | 'pendente';
  downloadUrl?: string;
  transportador: string;
  provinciaOrigem: string;
  provinciaDestino: string;
  tipoCarga: string;
  valor: number;
  formato: 'pdf' | 'excel' | 'ambos';
}

export default function RelatoriosFinais() {
  const [relatorios] = useState<Relatorio[]>([
    {
      id: 1,
      codigoCarga: 'CARGA-MZ-2024001',
      tipo: 'final',
      dataGeracao: '2024-02-20',
      periodo: '15/02/2024 - 20/02/2024',
      status: 'disponivel',
      downloadUrl: '#',
      transportador: 'Transportes Moçambique SARL',
      provinciaOrigem: 'Maputo',
      provinciaDestino: 'Nampula',
      tipoCarga: 'Cimento',
      valor: 285000,
      formato: 'pdf'
    },
    {
      id: 2,
      codigoCarga: 'CARGA-MZ-2024002',
      tipo: 'final',
      dataGeracao: '2024-02-19',
      periodo: '16/02/2024 - 19/02/2024',
      status: 'disponivel',
      downloadUrl: '#',
      transportador: 'Logística Norte Ltda',
      provinciaOrigem: 'Sofala',
      provinciaDestino: 'Manica',
      tipoCarga: 'Bebidas',
      valor: 145000,
      formato: 'ambos'
    },
    {
      id: 3,
      codigoCarga: 'CARGA-MZ-2024003',
      tipo: 'parcial',
      dataGeracao: '2024-02-18',
      periodo: '17/02/2024 - 18/02/2024',
      status: 'disponivel',
      downloadUrl: '#',
      transportador: 'Expresso Zambézia',
      provinciaOrigem: 'Nampula',
      provinciaDestino: 'Cabo Delgado',
      tipoCarga: 'Produtos Alimentares',
      valor: 220000,
      formato: 'excel'
    },
    {
      id: 4,
      codigoCarga: 'CARGA-MZ-2024004',
      tipo: 'incidente',
      dataGeracao: '2024-02-17',
      periodo: '17/02/2024',
      status: 'processando',
      transportador: 'Transportes do Sul',
      provinciaOrigem: 'Inhambane',
      provinciaDestino: 'Maputo',
      tipoCarga: 'Produtos do Mar',
      valor: 175000,
      formato: 'pdf'
    },
    {
      id: 5,
      codigoCarga: 'CARGA-MZ-2024005',
      tipo: 'customizado',
      dataGeracao: '2024-02-16',
      periodo: '10/02/2024 - 16/02/2024',
      status: 'disponivel',
      downloadUrl: '#',
      transportador: 'Carga Pesada MZ',
      provinciaOrigem: 'Tete',
      provinciaDestino: 'Sofala',
      tipoCarga: 'Materiais Construção',
      valor: 320000,
      formato: 'ambos'
    }
  ]);

  const [filtroTipo, setFiltroTipo] = useState<'todos' | Relatorio['tipo']>('todos');
  const [filtroStatus, setFiltroStatus] = useState<'todos' | Relatorio['status']>('todos');
  const [filtroFormato, setFiltroFormato] = useState<'todos' | Relatorio['formato']>('todos');
  const [periodo, setPeriodo] = useState({
    inicio: '',
    fim: ''
  });

  const relatoriosFiltrados = relatorios.filter(relatorio => {
    if (filtroTipo !== 'todos' && relatorio.tipo !== filtroTipo) return false;
    if (filtroStatus !== 'todos' && relatorio.status !== filtroStatus) return false;
    if (filtroFormato !== 'todos' && relatorio.formato !== filtroFormato) return false;
    
    if (periodo.inicio && periodo.fim) {
      const dataRelatorio = new Date(relatorio.dataGeracao);
      const dataInicio = new Date(periodo.inicio);
      const dataFim = new Date(periodo.fim);
      return dataRelatorio >= dataInicio && dataRelatorio <= dataFim;
    }
    
    return true;
  });

  const getTipoText = (tipo: string) => {
    switch (tipo) {
      case 'final': return 'Relatório Final';
      case 'parcial': return 'Relatório Parcial';
      case 'incidente': return 'Relatório de Incidente';
      case 'customizado': return 'Relatório Customizado';
      default: return tipo;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'final': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'parcial': return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      case 'incidente': return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'customizado': return 'bg-purple-500/20 text-purple-400 border border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'final': return '📋';
      case 'parcial': return '📊';
      case 'incidente': return '⚠️';
      case 'customizado': return '🎯';
      default: return '📄';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disponivel': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'processando': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      case 'pendente': return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'disponivel': return '📥';
      case 'processando': return '⏳';
      case 'pendente': return '🕒';
      default: return '📄';
    }
  };

  const getFormatoIcon = (formato: string) => {
    switch (formato) {
      case 'pdf': return '📄';
      case 'excel': return '📊';
      case 'ambos': return '📁';
      default: return '📎';
    }
  };

  const getTipoCargaIcon = (tipo: string) => {
    switch (tipo) {
      case 'Cimento': return '🏗️';
      case 'Bebidas': return '🍺';
      case 'Produtos Alimentares': return '🍎';
      case 'Têxteis': return '👕';
      case 'Produtos do Mar': return '🐟';
      case 'Minérios': return '⛏️';
      case 'Combustível': return '⛽';
      case 'Materiais Construção': return '🏠';
      case 'Produtos Químicos': return '🧪';
      case 'Veículos': return '🚗';
      default: return '📦';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN',
      minimumFractionDigits: 2
    }).format(value);
  };

  const handleDownload = (relatorio: Relatorio) => {
    alert(`Iniciando download do relatório: ${relatorio.codigoCarga}`);
    console.log('Download do relatório:', relatorio);
  };

  const handleSolicitarRelatorio = () => {
    alert('Solicitação de novo relatório enviada! Será processado em até 24h.');
  };

  const handleVisualizar = (relatorio: Relatorio) => {
    alert(`Visualizando relatório: ${relatorio.codigoCarga}`);
  };

  const handleExportarTodos = () => {
    alert('Exportando todos os relatórios disponíveis...');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-white truncate">📊 Relatórios Finais</h1>
              <p className="text-gray-400 truncate">Consulte relatórios finais das cargas em Moçambique</p>
            </div>
            <button
              onClick={handleSolicitarRelatorio}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm flex items-center"
            >
              <span className="mr-2">➕</span>
              Solicitar Relatório
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            {/* Filtros */}
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="mr-2">🔍</span>
                Filtrar Relatórios - Moçambique
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Filtro por Tipo */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tipo de Relatório
                  </label>
                  <select
                    value={filtroTipo}
                    onChange={(e) => setFiltroTipo(e.target.value as never)}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  >
                    <option value="todos">Todos os tipos</option>
                    <option value="final">Relatórios Finais</option>
                    <option value="parcial">Relatórios Parciais</option>
                    <option value="incidente">Relatórios de Incidente</option>
                    <option value="customizado">Relatórios Customizados</option>
                  </select>
                </div>

                {/* Filtro por Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={filtroStatus}
                    onChange={(e) => setFiltroStatus(e.target.value as never)}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  >
                    <option value="todos">Todos os status</option>
                    <option value="disponivel">Disponíveis</option>
                    <option value="processando">Processando</option>
                    <option value="pendente">Pendentes</option>
                  </select>
                </div>

                {/* Filtro por Formato */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Formato
                  </label>
                  <select
                    value={filtroFormato}
                    onChange={(e) => setFiltroFormato(e.target.value as never)}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  >
                    <option value="todos">Todos os formatos</option>
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="ambos">Ambos</option>
                  </select>
                </div>

                {/* Filtro por Período - Início */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Data Início
                  </label>
                  <input
                    type="date"
                    value={periodo.inicio}
                    onChange={(e) => setPeriodo({...periodo, inicio: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {/* Filtro por Período - Fim */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Data Fim
                  </label>
                  <input
                    type="date"
                    value={periodo.fim}
                    onChange={(e) => setPeriodo({...periodo, fim: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                <p className="text-sm text-gray-400">Total Relatórios</p>
                <p className="text-2xl font-bold text-white">{relatorios.length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-green-500/20">
                <p className="text-sm text-gray-400">Relatórios Finais</p>
                <p className="text-2xl font-bold text-green-400">
                  {relatorios.filter(r => r.tipo === 'final').length}
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-500/20">
                <p className="text-sm text-gray-400">Disponíveis</p>
                <p className="text-2xl font-bold text-blue-400">
                  {relatorios.filter(r => r.status === 'disponivel').length}
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-purple-500/20">
                <p className="text-sm text-gray-400">Customizados</p>
                <p className="text-2xl font-bold text-purple-400">
                  {relatorios.filter(r => r.tipo === 'customizado').length}
                </p>
              </div>
            </div>

            {/* Lista de Relatórios */}
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <span className="mr-2">📋</span>
                  Relatórios ({relatoriosFiltrados.length})
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Carga
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Tipo/Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Transportador
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Rota
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Valor
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {relatoriosFiltrados.map((relatorio) => (
                      <tr key={relatorio.id} className="hover:bg-gray-700/50 transition-all">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className="text-lg mr-3">
                              {getTipoCargaIcon(relatorio.tipoCarga)}
                            </span>
                            <div>
                              <div className="text-sm font-medium text-white">
                                {relatorio.codigoCarga}
                              </div>
                              <div className="text-xs text-gray-400">
                                {relatorio.periodo}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <span className={`px-3 py-1 text-xs rounded-full ${getTipoColor(relatorio.tipo)}`}>
                              <span className="mr-1">{getTipoIcon(relatorio.tipo)}</span>
                              {getTipoText(relatorio.tipo)}
                            </span>
                            <div>
                              <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(relatorio.status)}`}>
                                <span className="mr-1">{getStatusIcon(relatorio.status)}</span>
                                {relatorio.status === 'disponivel' ? 'Disponível' : 
                                 relatorio.status === 'processando' ? 'Processando' : 'Pendente'}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-300">
                            {relatorio.transportador}
                          </div>
                          <div className="text-xs text-gray-500">
                            {getFormatoIcon(relatorio.formato)} {relatorio.formato.toUpperCase()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-300">
                            {relatorio.provinciaOrigem} → {relatorio.provinciaDestino}
                          </div>
                          <div className="text-xs text-gray-500">
                            {relatorio.dataGeracao}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-green-400">
                            {formatCurrency(relatorio.valor)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            {relatorio.status === 'disponivel' ? (
                              <button
                                onClick={() => handleDownload(relatorio)}
                                className="text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-2 rounded-lg transition-all shadow-sm text-sm font-medium"
                              >
                                <span className="mr-1">📥</span>
                                Download
                              </button>
                            ) : (
                              <span className="text-gray-500 px-3 py-2 text-sm">⏳ Aguarde...</span>
                            )}
                            <button 
                              onClick={() => handleVisualizar(relatorio)}
                              className="text-green-400 hover:text-green-300 bg-green-500/10 hover:bg-green-500/20 px-3 py-2 rounded-lg transition-all shadow-sm text-sm font-medium"
                            >
                              <span className="mr-1">👁️</span>
                              Visualizar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mensagem quando não há relatórios */}
            {relatoriosFiltrados.length === 0 && (
              <div className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700 mt-6">
                <div className="text-gray-400 text-6xl mb-4">📊</div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Nenhum relatório encontrado
                </h3>
                <p className="text-gray-400 mb-6">
                  {filtroTipo === 'todos' && !periodo.inicio && !periodo.fim
                    ? 'Você ainda não possui relatórios gerados.'
                    : 'Nenhum relatório corresponde aos filtros aplicados.'
                  }
                </p>
                <div className="space-x-4">
                  <button
                    onClick={() => {
                      setFiltroTipo('todos');
                      setFiltroStatus('todos');
                      setFiltroFormato('todos');
                      setPeriodo({ inicio: '', fim: '' });
                    }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm"
                  >
                    Limpar Filtros
                  </button>
                  <button
                    onClick={handleSolicitarRelatorio}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all font-medium shadow-sm"
                  >
                    Solicitar Relatório
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Painel Lateral */}
          <div className="lg:col-span-1 space-y-6">
            {/* Tipos de Relatório */}
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">📄 Tipos de Relatório</h2>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <span className="text-lg mr-3">📋</span>
                  <div>
                    <p className="text-white text-sm">Relatório Final</p>
                    <p className="text-gray-400 text-xs">Conclusão completa da entrega</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <span className="text-lg mr-3">📊</span>
                  <div>
                    <p className="text-white text-sm">Relatório Parcial</p>
                    <p className="text-gray-400 text-xs">Andamento do transporte</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <span className="text-lg mr-3">⚠️</span>
                  <div>
                    <p className="text-white text-sm">Relatório de Incidente</p>
                    <p className="text-gray-400 text-xs">Ocorrências durante transporte</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <span className="text-lg mr-3">🎯</span>
                  <div>
                    <p className="text-white text-sm">Relatório Customizado</p>
                    <p className="text-gray-400 text-xs">Dados específicos por período</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">⚡ Ações Rápidas</h2>
              </div>
              <div className="p-4 space-y-3">
                <button 
                  onClick={handleExportarTodos}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium transition-all shadow-sm flex items-center justify-center"
                >
                  <span className="mr-2">📥</span>
                  <span className="truncate">Exportar Todos</span>
                </button>
                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium transition-all shadow-sm flex items-center justify-center">
                  <span className="mr-2">📧</span>
                  <span className="truncate">Enviar por Email</span>
                </button>
                <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 font-medium transition-all shadow-sm flex items-center justify-center">
                  <span className="mr-2">📊</span>
                  <span className="truncate">Gerar Dashboard</span>
                </button>
                <button className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 font-medium transition-all shadow-sm flex items-center justify-center">
                  <span className="mr-2">🔄</span>
                  <span className="truncate">Atualizar</span>
                </button>
              </div>
            </div>

            {/* Informações do Sistema */}
            <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">💡 Informações - MZ</h3>
              <ul className="text-blue-300 text-sm space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Relatórios disponíveis por 2 anos</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Formatos: PDF, Excel e customizados</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Solicitações processadas em 24h</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Contacte: +258 84 500 900</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Email: relatorios@transmz.co.mz</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
    </Layout>
    
  );
}