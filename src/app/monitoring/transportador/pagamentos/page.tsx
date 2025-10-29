"use client";
import Layout from '@/components/layout/Layout';
import React, { useState } from 'react';
interface Pagamento {
  id: number;
  referencia: string;
  dataVencimento: string;
  dataPagamento: string | null;
  valor: number;
  status: 'pago' | 'pendente' | 'atrasado';
  cargas: string[];
  formaPagamento: string;
  banco?: string;
  numeroRecibo?: string;
}

export default function VisualizarPagamentos() {
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [filtroPeriodo, setFiltroPeriodo] = useState<string>('2024');

  // Dados moçambicanos realistas
  const pagamentos: Pagamento[] = [
    {
      id: 1,
      referencia: 'JAN-2024',
      dataVencimento: '2024-02-05',
      dataPagamento: '2024-02-03',
      valor: 285000,
      status: 'pago',
      cargas: ['CT-001-MPM', 'CT-002-BEIRA', 'CT-003-NAMPULA'],
      formaPagamento: 'Transferência Bancária',
      banco: 'BCI',
      numeroRecibo: 'REC-2024-001-MZ'
    },
    {
      id: 2,
      referencia: 'FEV-2024',
      dataVencimento: '2024-03-05',
      dataPagamento: null,
      valor: 320000,
      status: 'pendente',
      cargas: ['CT-004-TETE', 'CT-005-QUELIMANE'],
      formaPagamento: 'Standard Bank',
      banco: 'Standard Bank',
      numeroRecibo: 'PEND-2024-002-MZ'
    },
    {
      id: 3,
      referencia: 'DEZ-2023',
      dataVencimento: '2024-01-05',
      dataPagamento: '2024-01-12',
      valor: 265000,
      status: 'atrasado',
      cargas: ['CT-045-MATOLA', 'CT-046-INHAMBANE'],
      formaPagamento: 'Depósito Bancário',
      banco: 'Millennium BIM',
      numeroRecibo: 'REC-2023-045-MZ'
    },
    {
      id: 4,
      referencia: 'NOV-2023',
      dataVencimento: '2023-12-05',
      dataPagamento: '2023-12-04',
      valor: 240000,
      status: 'pago',
      cargas: ['CT-042-CHIMOIO', 'CT-043-LICHINGA'],
      formaPagamento: 'Transferência Bancária',
      banco: 'Absa Bank',
      numeroRecibo: 'REC-2023-044-MZ'
    },
    {
      id: 5,
      referencia: 'OUT-2023',
      dataVencimento: '2023-11-05',
      dataPagamento: '2023-11-03',
      valor: 218000,
      status: 'pago',
      cargas: ['CT-039-XAI-XAI', 'CT-040-PEMBA'],
      formaPagamento: 'Depósito Bancário',
      banco: 'BCI',
      numeroRecibo: 'REC-2023-040-MZ'
    }
  ];

  const pagamentosFiltrados = filtroStatus === 'todos' 
    ? pagamentos 
    : pagamentos.filter(p => p.status === filtroStatus);

  // Formatação para Moçambique
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-MZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'pendente': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      case 'atrasado': return 'bg-red-500/20 text-red-400 border border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pago': return '✅ Pago';
      case 'pendente': return '⏱️ Pendente';
      case 'atrasado': return '⚠️ Atrasado';
      default: return status;
    }
  };

  // Cálculos para estatísticas
  const totalRecebido = pagamentos
    .filter(p => p.status === 'pago')
    .reduce((sum, p) => sum + p.valor, 0);

  const totalPendente = pagamentos
    .filter(p => p.status === 'pendente')
    .reduce((sum, p) => sum + p.valor, 0);

  // const totalAtrasado = pagamentos
  //   .filter(p => p.status === 'atrasado')
  //   .reduce((sum, p) => sum + p.valor, 0);

  const proximoPagamento = pagamentos.find(p => p.status === 'pendente');

  // Bancos moçambicanos
  const bancosMocambicanos = [
    'BCI', 'Millennium BIM', 'Standard Bank', 'Absa Bank', 
    'Ecobank', 'UBA Mozambique', 'Moza Banco'
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900">

      <header className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-white truncate">💰 Pagamentos e Salários</h1>
              <p className="text-gray-400 truncate">Consulte seus pagamentos e salários em Meticais (MZN)</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-3 space-y-6">
            {/* Resumo Financeiro */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 min-w-0">
                <div className="flex items-center">
                  <div className="p-3 bg-green-500/20 rounded-lg shadow-sm flex-shrink-0">
                    <span className="text-2xl text-green-400">💰</span>
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className="text-sm font-medium text-gray-400 truncate">Total Recebido</p>
                    <p className="text-2xl font-bold text-white truncate">
                      {formatCurrency(totalRecebido)}
                    </p>
                    <p className="text-xs text-gray-500 truncate">Em Meticais</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-yellow-500/20 min-w-0">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-500/20 rounded-lg shadow-sm flex-shrink-0">
                    <span className="text-2xl text-yellow-400">⏱️</span>
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className="text-sm font-medium text-gray-400 truncate">A Receber</p>
                    <p className="text-2xl font-bold text-white truncate">
                      {formatCurrency(totalPendente)}
                    </p>
                    <p className="text-xs text-gray-500 truncate">Pagamentos pendentes</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-blue-500/20 min-w-0">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-500/20 rounded-lg shadow-sm flex-shrink-0">
                    <span className="text-2xl text-blue-400">📅</span>
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className="text-sm font-medium text-gray-400 truncate">Próximo Pagamento</p>
                    <p className="text-2xl font-bold text-white truncate">
                      {proximoPagamento ? formatCurrency(proximoPagamento.valor) : formatCurrency(0)}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {proximoPagamento ? `Vence em ${formatDate(proximoPagamento.dataVencimento)}` : 'Sem pagamentos pendentes'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filtros */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h3 className="text-lg font-semibold text-white min-w-0">
                  <span className="mr-2">📋</span>
                  Histórico de Pagamentos - Moçambique
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-2 min-w-0">
                  <select
                    value={filtroPeriodo}
                    onChange={(e) => setFiltroPeriodo(e.target.value)}
                    className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm min-w-0"
                  >
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="todos">Todos os Anos</option>
                  </select>
                  
                  <select
                    value={filtroStatus}
                    onChange={(e) => setFiltroStatus(e.target.value)}
                    className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm min-w-0"
                  >
                    <option value="todos">Todos os Status</option>
                    <option value="pago">Pagos</option>
                    <option value="pendente">Pendentes</option>
                    <option value="atrasado">Atrasados</option>
                  </select>
                  
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition-all shadow-sm flex items-center justify-center whitespace-nowrap">
                    <span className="mr-2">📤</span>
                    Exportar Excel
                  </button>
                </div>
              </div>
            </div>

            {/* Lista de Pagamentos */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <div className="p-6">
                <div className="space-y-4">
                  {pagamentosFiltrados.map((pagamento) => (
                    <div key={pagamento.id} className="border border-gray-600 rounded-xl p-6 bg-gray-700/50 hover:bg-gray-700/70 transition-all">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                            <div className="flex items-center min-w-0">
                              <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                                <span className="text-white text-lg">💰</span>
                              </div>
                              <div className="ml-4 min-w-0">
                                <h4 className="font-semibold text-white truncate">
                                  Pagamento - {pagamento.referencia}
                                </h4>
                                <p className="text-sm text-gray-400 truncate">
                                  Vencimento: {formatDate(pagamento.dataVencimento)}
                                  {pagamento.dataPagamento && (
                                    <span className="ml-2">
                                      • Pago em: {formatDate(pagamento.dataPagamento)}
                                    </span>
                                  )}
                                </p>
                                {pagamento.numeroRecibo && (
                                  <p className="text-xs text-gray-500 truncate">
                                    Recibo: {pagamento.numeroRecibo}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(pagamento.status)} whitespace-nowrap`}>
                                {getStatusText(pagamento.status)}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div className="bg-gray-600/30 p-3 rounded-lg min-w-0">
                              <p className="text-sm text-gray-400 truncate">Valor (MZN)</p>
                              <p className="font-semibold text-lg text-green-400 truncate">
                                {formatCurrency(pagamento.valor)}
                              </p>
                            </div>
                            <div className="bg-gray-600/30 p-3 rounded-lg min-w-0">
                              <p className="text-sm text-gray-400 truncate">Forma de Pagamento</p>
                              <p className="font-medium text-white truncate">{pagamento.formaPagamento}</p>
                              {pagamento.banco && (
                                <p className="text-xs text-gray-400 truncate">{pagamento.banco}</p>
                              )}
                            </div>
                            <div className="bg-gray-600/30 p-3 rounded-lg min-w-0">
                              <p className="text-sm text-gray-400 truncate">Cargas Incluídas</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {pagamento.cargas.map((carga, index) => (
                                  <span key={index} className="bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs border border-gray-500 truncate max-w-[120px]">
                                    {carga}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="bg-gray-600/30 p-3 rounded-lg min-w-0">
                              <p className="text-sm text-gray-400 truncate">Dias</p>
                              <p className="font-medium text-white truncate">
                                {pagamento.dataPagamento ? 
                                  `Pago em ${Math.ceil((new Date(pagamento.dataPagamento).getTime() - new Date(pagamento.dataVencimento).getTime()) / (1000 * 3600 * 24))} dias` :
                                  `${Math.ceil((new Date().getTime() - new Date(pagamento.dataVencimento).getTime()) / (1000 * 3600 * 24))} dias decorridos`
                                }
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="lg:ml-4 lg:pl-4 lg:border-l lg:border-gray-600 flex-shrink-0">
                          <div className="space-y-2 min-w-[140px]">
                            <button className="w-full bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 font-medium transition-all shadow-sm flex items-center justify-center text-sm">
                              <span className="mr-2">📄</span>
                              Comprovante
                            </button>
                            {pagamento.status === 'pendente' && (
                              <button className="w-full border border-green-500 text-green-400 py-2 px-3 rounded-lg hover:bg-green-500/10 font-medium transition-all shadow-sm flex items-center justify-center text-sm">
                                <span className="mr-2">✓</span>
                                Confirmar Recebimento
                              </button>
                            )}
                            {pagamento.status === 'atrasado' && (
                              <button className="w-full border border-red-500 text-red-400 py-2 px-3 rounded-lg hover:bg-red-500/10 font-medium transition-all shadow-sm flex items-center justify-center text-sm">
                                <span className="mr-2">📞</span>
                                Reportar Atraso
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mensagem quando não há pagamentos */}
                {pagamentosFiltrados.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">💸</div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Nenhum pagamento encontrado
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Não há pagamentos que correspondam aos filtros selecionados.
                    </p>
                    <button 
                      onClick={() => {
                        setFiltroStatus('todos');
                        setFiltroPeriodo('2024');
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Limpar Filtros
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Painel Lateral */}
          <div className="lg:col-span-1 space-y-6">
            {/* Resumo por Status */}
            <div className="bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white truncate">📊 Estatísticas</h2>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                  <span className="text-green-400 truncate">Pagos</span>
                  <span className="text-green-400 font-bold whitespace-nowrap">
                    {pagamentos.filter(p => p.status === 'pago').length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg">
                  <span className="text-yellow-400 truncate">Pendentes</span>
                  <span className="text-yellow-400 font-bold whitespace-nowrap">
                    {pagamentos.filter(p => p.status === 'pendente').length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg">
                  <span className="text-red-400 truncate">Atrasados</span>
                  <span className="text-red-400 font-bold whitespace-nowrap">
                    {pagamentos.filter(p => p.status === 'atrasado').length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg">
                  <span className="text-blue-400 truncate">Total Cargas</span>
                  <span className="text-blue-400 font-bold whitespace-nowrap">
                    {pagamentos.reduce((sum, p) => sum + p.cargas.length, 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Bancos Moçambicanos */}
            <div className="bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white truncate">🏦 Bancos Parceiros</h2>
              </div>
              <div className="p-4 space-y-3">
                {bancosMocambicanos.map((banco, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span className="text-gray-300 truncate text-sm">{banco}</span>
                    <span className="text-white font-bold whitespace-nowrap text-sm">
                      {pagamentos.filter(p => p.banco === banco).length}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white truncate">⚡ Ações Rápidas</h2>
              </div>
              <div className="p-4 space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm flex items-center justify-center transition-all">
                  <span className="mr-2">📧</span>
                  <span className="truncate">Falar com Financeiro</span>
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 text-sm flex items-center justify-center transition-all">
                  <span className="mr-2">📋</span>
                  <span className="truncate">Extrato Mensal</span>
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 text-sm flex items-center justify-center transition-all">
                  <span className="mr-2">🔔</span>
                  <span className="truncate">Alertas de Pagamento</span>
                </button>
                <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 text-sm flex items-center justify-center transition-all">
                  <span className="mr-2">🏦</span>
                  <span className="truncate">Dados Bancários</span>
                </button>
              </div>
            </div>

            {/* Informações Úteis - Moçambique */}
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <h3 className="text-lg font-semibold text-blue-400 mb-2 truncate">💡 Informações - MZ</h3>
              <ul className="text-blue-300 text-sm space-y-1">
                <li className="truncate">• Pagamentos até o 5º dia útil</li>
                <li className="truncate">• Metical (MZN) - Moeda oficial</li>
                <li className="truncate">• Comprovantes disponíveis por 12 meses</li>
                <li className="truncate">• Contacte +258 84 123 4567 para urgências</li>
                <li className="truncate">• Horário: Seg-Sex (8h00-15h30)</li>
              </ul>
            </div>

            {/* Taxa de Câmbio */}
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <h3 className="text-lg font-semibold text-green-400 mb-2 truncate">💱 Câmbio Atual</h3>
              <div className="text-green-300 text-sm space-y-1">
                <div className="flex justify-between">
                  <span>USD → MZN:</span>
                  <span className="font-bold">63.50</span>
                </div>
                <div className="flex justify-between">
                  <span>EUR → MZN:</span>
                  <span className="font-bold">68.20</span>
                </div>
                <div className="flex justify-between">
                  <span>ZAR → MZN:</span>
                  <span className="font-bold">3.45</span>
                </div>
                <p className="text-xs text-green-400 mt-2">Atualizado: 15/02/2024</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    </Layout>
    
  );
}