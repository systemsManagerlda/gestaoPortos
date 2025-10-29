"use client";
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';

interface Abastecimento {
  id: number;
  veiculo: string;
  placa: string;
  motorista: string;
  data: string;
  horario: string;
  litros: number;
  valor: number;
  posto: string;
  hodometro: number;
  tipoCombustivel: 'diesel' | 'gasolina' | 'petroleo';
  status: 'pendente' | 'confirmado' | 'rejeitado';
  comprovante?: string;
}

export default function ControloDiesel() {
  const [abastecimentos, setAbastecimentos] = useState<Abastecimento[]>([
    {
      id: 1,
      veiculo: 'Camião Truck',
      placa: 'AB-123-CD',
      motorista: 'João Silva',
      data: '2024-01-15',
      horario: '14:30',
      litros: 150,
      valor: 15750,
      posto: 'Posto Petromoc - Maputo',
      hodometro: 12500,
      tipoCombustivel: 'diesel',
      status: 'confirmado',
      comprovante: 'comprovante_001.pdf'
    },
    {
      id: 2,
      veiculo: 'Camião Carreta',
      placa: 'EF-456-GH',
      motorista: 'Maria Santos',
      data: '2024-01-16',
      horario: '09:15',
      litros: 200,
      valor: 21000,
      posto: 'Posto Total - Matola',
      hodometro: 18750,
      tipoCombustivel: 'diesel',
      status: 'pendente'
    },
    {
      id: 3,
      veiculo: 'Camião Baú',
      placa: 'IJ-789-KL',
      motorista: 'Pedro Costa',
      data: '2024-01-17',
      horario: '16:45',
      litros: 120,
      valor: 12600,
      posto: 'Posto Puma - Beira',
      hodometro: 8920,
      tipoCombustivel: 'diesel',
      status: 'pendente'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    veiculo: '',
    placa: '',
    motorista: '',
    data: '',
    horario: '',
    litros: '',
    valor: '',
    posto: '',
    hodometro: '',
    tipoCombustivel: 'diesel' as 'diesel' | 'gasolina' | 'petroleo'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const novoAbastecimento: Abastecimento = {
      id: abastecimentos.length + 1,
      veiculo: formData.veiculo,
      placa: formData.placa,
      motorista: formData.motorista,
      data: formData.data,
      horario: formData.horario,
      litros: parseFloat(formData.litros),
      valor: parseFloat(formData.valor),
      posto: formData.posto,
      hodometro: parseInt(formData.hodometro),
      tipoCombustivel: formData.tipoCombustivel,
      status: 'pendente'
    };

    setAbastecimentos([...abastecimentos, novoAbastecimento]);
    setShowModal(false);
    setFormData({
      veiculo: '',
      placa: '',
      motorista: '',
      data: '',
      horario: '',
      litros: '',
      valor: '',
      posto: '',
      hodometro: '',
      tipoCombustivel: 'diesel'
    });
    
    alert('Abastecimento registrado com sucesso!');
  };

  const confirmarAbastecimento = (id: number) => {
    setAbastecimentos(abastecimentos.map(abastecimento => 
      abastecimento.id === id 
        ? { ...abastecimento, status: 'confirmado' as const }
        : abastecimento
    ));
    alert('Abastecimento confirmado!');
  };

  const rejeitarAbastecimento = (id: number) => {
    setAbastecimentos(abastecimentos.map(abastecimento => 
      abastecimento.id === id 
        ? { ...abastecimento, status: 'rejeitado' as const }
        : abastecimento
    ));
    alert('Abastecimento rejeitado!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'rejeitado': return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'pendente': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmado': return '✅ Confirmado';
      case 'rejeitado': return '❌ Rejeitado';
      case 'pendente': return '⏱️ Pendente';
      default: return status;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN'
    }).format(value);
  };

  const consumoMedio = abastecimentos.reduce((total, abast) => total + abast.litros, 0) / 
    (abastecimentos.length || 1);
  const valorTotal = abastecimentos.reduce((total, abast) => total + abast.valor, 0);

  // Dados específicos de Moçambique
  const postosMoçambique = [
    'Posto Petromoc - Maputo',
    'Posto Total - Matola',
    'Posto Puma - Beira',
    'Posto BP - Nampula',
    'Posto Shell - Quelimane',
    'Posto Gaz - Tete',
    'Posto Coral - Pemba',
    'Posto Sonangol - Xai-Xai',
    'Posto Engen - Inhambane',
    'Posto Movitel - Lichinga'
  ];

  const veiculosMoçambique = [
    'Camião Truck',
    'Camião Carreta',
    'Camião Baú',
    'Camião Aberto',
    'Hiace',
    'Land Cruiser',
    'Hilux',
    'Prado',
    'Mitsubishi L200',
    'Toyota Dyna'
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-white truncate">⛽ Controlo de Combustível</h1>
              <p className="text-gray-400 truncate">Sistema de gestão de combustível - Moçambique</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-sm flex items-center whitespace-nowrap flex-shrink-0 ml-4"
            >
              <span className="mr-2">➕</span>
              Novo Abastecimento
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-3 space-y-6">
            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 min-w-0">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-500/20 rounded-lg shadow-sm flex-shrink-0">
                    <span className="text-2xl text-blue-400">⛽</span>
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className="text-sm font-medium text-gray-400 truncate">Total Abastecimentos</p>
                    <p className="text-2xl font-bold text-white truncate">{abastecimentos.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-green-500/20 min-w-0">
                <div className="flex items-center">
                  <div className="p-3 bg-green-500/20 rounded-lg shadow-sm flex-shrink-0">
                    <span className="text-2xl text-green-400">🛢️</span>
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className="text-sm font-medium text-gray-400 truncate">Litros Consumidos</p>
                    <p className="text-2xl font-bold text-white truncate">
                      {abastecimentos.reduce((total, abast) => total + abast.litros, 0)}L
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-purple-500/20 min-w-0">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-500/20 rounded-lg shadow-sm flex-shrink-0">
                    <span className="text-2xl text-purple-400">💰</span>
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className="text-sm font-medium text-gray-400 truncate">Valor Total</p>
                    <p className="text-2xl font-bold text-white truncate">
                      {formatCurrency(valorTotal)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-orange-500/20 min-w-0">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-500/20 rounded-lg shadow-sm flex-shrink-0">
                    <span className="text-2xl text-orange-400">📊</span>
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className="text-sm font-medium text-gray-400 truncate">Consumo Médio</p>
                    <p className="text-2xl font-bold text-white truncate">
                      {consumoMedio.toFixed(1)}L/veículo
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabela de Abastecimentos */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <h3 className="text-lg font-semibold text-white min-w-0">📋 Histórico de Abastecimentos</h3>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30 whitespace-nowrap flex-shrink-0">
                    {abastecimentos.filter(a => a.status === 'pendente').length} pendentes
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">Veículo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">Motorista</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">Data/Hora</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">Posto</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">Litros</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">Valor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">Hodômetro</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {abastecimentos.map((abastecimento) => (
                      <tr key={abastecimento.id} className="hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap min-w-0">
                          <div className="flex items-center">
                            <div className="h-8 w-8 bg-orange-500/20 rounded flex items-center justify-center shadow-sm flex-shrink-0">
                              <span className="text-orange-400">⛽</span>
                            </div>
                            <div className="ml-4 min-w-0">
                              <div className="text-sm font-medium text-white truncate">{abastecimento.veiculo}</div>
                              <div className="text-sm text-gray-400 truncate">{abastecimento.placa}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white min-w-0 truncate">{abastecimento.motorista}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white min-w-0">
                          <div className="truncate">
                            {new Date(abastecimento.data).toLocaleDateString('pt-MZ')}
                          </div>
                          <div className="text-gray-400 text-xs truncate">{abastecimento.horario}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white min-w-0 truncate">{abastecimento.posto}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white min-w-0">{abastecimento.litros}L</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 min-w-0">
                          {formatCurrency(abastecimento.valor)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white min-w-0">{abastecimento.hodometro} km</td>
                        <td className="px-6 py-4 whitespace-nowrap min-w-0">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(abastecimento.status)} whitespace-nowrap`}>
                            {getStatusText(abastecimento.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium min-w-0">
                          <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-1 sm:space-y-0">
                            {abastecimento.status === 'pendente' && (
                              <>
                                <button
                                  onClick={() => confirmarAbastecimento(abastecimento.id)}
                                  className="text-green-400 hover:text-green-300 transition-colors text-xs whitespace-nowrap"
                                >
                                  ✅ Confirmar
                                </button>
                                <button
                                  onClick={() => rejeitarAbastecimento(abastecimento.id)}
                                  className="text-red-400 hover:text-red-300 transition-colors text-xs whitespace-nowrap"
                                >
                                  ❌ Rejeitar
                                </button>
                              </>
                            )}
                            <button className="text-blue-400 hover:text-blue-300 transition-colors text-xs whitespace-nowrap">
                              👁️ Detalhes
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Gráfico de Consumo e Resumo */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 min-w-0">
                <h3 className="text-lg font-semibold text-white mb-4">📈 Consumo por Veículo</h3>
                <div className="space-y-3">
                  {abastecimentos.reduce((acc, abast) => {
                    const existing = acc.find(item => item.veiculo === abast.veiculo);
                    if (existing) {
                      existing.litros += abast.litros;
                    } else {
                      acc.push({ veiculo: abast.veiculo, litros: abast.litros });
                    }
                    return acc;
                  }, [] as { veiculo: string; litros: number }[]).map((item, index) => (
                    <div key={index} className="flex items-center justify-between min-w-0">
                      <span className="text-sm text-gray-300 truncate flex-1 mr-4">{item.veiculo}</span>
                      <div className="flex items-center flex-shrink-0">
                        <div className="w-24 bg-gray-700 rounded-full h-2 mr-3 flex-shrink-0">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${Math.min((item.litros / 500) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-white whitespace-nowrap">{item.litros}L</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 min-w-0">
                <h3 className="text-lg font-semibold text-white mb-4">💰 Resumo Financeiro</h3>
                <div className="space-y-3">
                  <div className="flex justify-between min-w-0">
                    <span className="text-gray-300 truncate">Total Gasto:</span>
                    <span className="font-semibold text-white whitespace-nowrap">{formatCurrency(valorTotal)}</span>
                  </div>
                  <div className="flex justify-between min-w-0">
                    <span className="text-gray-300 truncate">Média por Abastecimento:</span>
                    <span className="font-semibold text-white whitespace-nowrap">
                      {formatCurrency(valorTotal / (abastecimentos.length || 1))}
                    </span>
                  </div>
                  <div className="flex justify-between min-w-0">
                    <span className="text-gray-300 truncate">Preço Médio por Litro:</span>
                    <span className="font-semibold text-white whitespace-nowrap">
                      {formatCurrency(valorTotal / (abastecimentos.reduce((total, abast) => total + abast.litros, 0) || 1))}/L
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Painel Lateral */}
          <div className="lg:col-span-1 space-y-6">
            {/* Status dos Abastecimentos */}
            <div className="bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white truncate">📊 Status</h2>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                  <span className="text-green-400 truncate">Confirmados</span>
                  <span className="text-green-400 font-bold whitespace-nowrap">
                    {abastecimentos.filter(a => a.status === 'confirmado').length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg">
                  <span className="text-yellow-400 truncate">Pendentes</span>
                  <span className="text-yellow-400 font-bold whitespace-nowrap">
                    {abastecimentos.filter(a => a.status === 'pendente').length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg">
                  <span className="text-red-400 truncate">Rejeitados</span>
                  <span className="text-red-400 font-bold whitespace-nowrap">
                    {abastecimentos.filter(a => a.status === 'rejeitado').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Veículos */}
            <div className="bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white truncate">🚛 Veículos</h2>
              </div>
              <div className="p-4 space-y-3">
                {Array.from(new Set(abastecimentos.map(a => a.veiculo))).map((veiculo, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span className="text-gray-300 truncate">{veiculo}</span>
                    <span className="text-white font-bold whitespace-nowrap">
                      {abastecimentos.filter(a => a.veiculo === veiculo).length}
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
                  <span className="mr-2">📊</span>
                  <span className="truncate">Relatório Mensal</span>
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 text-sm flex items-center justify-center transition-all">
                  <span className="mr-2">📧</span>
                  <span className="truncate">Exportar Dados</span>
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 text-sm flex items-center justify-center transition-all">
                  <span className="mr-2">🔔</span>
                  <span className="truncate">Alertas</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Novo Abastecimento */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl border border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white flex items-center">
                <span className="mr-2">➕</span>
                Registrar Novo Abastecimento
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Veículo *</label>
                  <select
                    value={formData.veiculo}
                    onChange={(e) => setFormData({...formData, veiculo: e.target.value})}
                    required
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Selecione o veículo</option>
                    {veiculosMoçambique.map((veiculo, index) => (
                      <option key={index} value={veiculo}>{veiculo}</option>
                    ))}
                  </select>
                </div>
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Placa *</label>
                  <input
                    type="text"
                    value={formData.placa}
                    onChange={(e) => setFormData({...formData, placa: e.target.value})}
                    required
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: AB-123-CD"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Motorista *</label>
                  <input
                    type="text"
                    value={formData.motorista}
                    onChange={(e) => setFormData({...formData, motorista: e.target.value})}
                    required
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tipo Combustível</label>
                  <select
                    value={formData.tipoCombustivel}
                    onChange={(e) => setFormData({...formData, tipoCombustivel: e.target.value as never})}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="diesel">Diesel</option>
                    <option value="gasolina">Gasolina</option>
                    <option value="petroleo">Petróleo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Data *</label>
                  <input
                    type="date"
                    value={formData.data}
                    onChange={(e) => setFormData({...formData, data: e.target.value})}
                    required
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Horário *</label>
                  <input
                    type="time"
                    value={formData.horario}
                    onChange={(e) => setFormData({...formData, horario: e.target.value})}
                    required
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Litros *</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.litros}
                    onChange={(e) => setFormData({...formData, litros: e.target.value})}
                    required
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Valor (MT) *</label>
                  <input
                    type="number"
                    value={formData.valor}
                    onChange={(e) => setFormData({...formData, valor: e.target.value})}
                    required
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Hodômetro *</label>
                  <input
                    type="number"
                    value={formData.hodometro}
                    onChange={(e) => setFormData({...formData, hodometro: e.target.value})}
                    required
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <label className="block text-sm font-medium text-gray-300 mb-2">Posto *</label>
                <select
                  value={formData.posto}
                  onChange={(e) => setFormData({...formData, posto: e.target.value})}
                  required
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecione o posto</option>
                  {postosMoçambique.map((posto, index) => (
                    <option key={index} value={posto}>{posto}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all shadow-sm"
                >
                  Registrar Abastecimento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </Layout>
    
  );
}