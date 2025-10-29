"use client";
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';


interface DispositivoGPS {
  id: number;
  codigo: string;
  veiculo: string;
  placa: string;
  modelo: string;
  numeroSerie: string;
  dataInstalacao: string;
  status: 'ativo' | 'inativo' | 'manutencao';
  ultimaComunicacao: string;
  bateria: number;
  sinal: number;
}

export default function GPSSimples() {
  const [dispositivos, setDispositivos] = useState<DispositivoGPS[]>([
    {
      id: 1,
      codigo: 'GPS-001',
      veiculo: 'Caminhão Truck',
      placa: 'AB123CD',
      modelo: 'TKSTAR 101',
      numeroSerie: 'TS20240001',
      dataInstalacao: '2024-01-10',
      status: 'ativo',
      ultimaComunicacao: '2024-01-17 14:30',
      bateria: 85,
      sinal: 90
    },
    {
      id: 2,
      codigo: 'GPS-002',
      veiculo: 'Caminhão Carreta',
      placa: 'EF456GH',
      modelo: 'TKSTAR 102',
      numeroSerie: 'TS20240002',
      dataInstalacao: '2024-01-12',
      status: 'ativo',
      ultimaComunicacao: '2024-01-17 13:15',
      bateria: 92,
      sinal: 85
    },
    {
      id: 3,
      codigo: 'GPS-003',
      veiculo: 'Caminhão Baú',
      placa: 'IJ789KL',
      modelo: 'CONCOX GT06',
      numeroSerie: 'CX20240001',
      dataInstalacao: '2024-01-15',
      status: 'manutencao',
      ultimaComunicacao: '2024-01-16 18:45',
      bateria: 45,
      sinal: 60
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    veiculo: '',
    placa: '',
    modelo: '',
    numeroSerie: '',
    dataInstalacao: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const novoDispositivo: DispositivoGPS = {
      id: dispositivos.length + 1,
      codigo: `GPS-${(dispositivos.length + 1).toString().padStart(3, '0')}`,
      veiculo: formData.veiculo,
      placa: formData.placa,
      modelo: formData.modelo,
      numeroSerie: formData.numeroSerie,
      dataInstalacao: formData.dataInstalacao,
      status: 'ativo',
      ultimaComunicacao: new Date().toISOString().split('T')[0] + ' ' + 
        new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      bateria: 100,
      sinal: 95
    };

    setDispositivos([...dispositivos, novoDispositivo]);
    setShowModal(false);
    setFormData({
      veiculo: '',
      placa: '',
      modelo: '',
      numeroSerie: '',
      dataInstalacao: ''
    });
    
    alert('Dispositivo GPS cadastrado com sucesso!');
  };

  const toggleStatus = (id: number, novoStatus: 'ativo' | 'inativo') => {
    setDispositivos(dispositivos.map(dispositivo => 
      dispositivo.id === id 
        ? { ...dispositivo, status: novoStatus }
        : dispositivo
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'inativo': return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'manutencao': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ativo': return '✅ Ativo';
      case 'inativo': return '⏸️ Inativo';
      case 'manutencao': return '🔧 Manutenção';
      default: return status;
    }
  };

  const getBateriaColor = (nivel: number) => {
    if (nivel >= 70) return 'text-green-400';
    if (nivel >= 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getBateriaBgColor = (nivel: number) => {
    if (nivel >= 70) return 'bg-green-500';
    if (nivel >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getSinalColor = (nivel: number) => {
    if (nivel >= 80) return 'text-green-400';
    if (nivel >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <Layout>
       <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-white truncate">📡 GPS Simples</h1>
              <p className="text-gray-400 truncate">Controle de dispositivos GPS básicos</p>
            </div>
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
                    <span className="text-2xl text-blue-400">📡</span>
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className="text-sm font-medium text-gray-400 truncate">Total Dispositivos</p>
                    <p className="text-2xl font-bold text-white truncate">{dispositivos.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-green-500/20 min-w-0">
                <div className="flex items-center">
                  <div className="p-3 bg-green-500/20 rounded-lg shadow-sm flex-shrink-0">
                    <span className="text-2xl text-green-400">✅</span>
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className="text-sm font-medium text-gray-400 truncate">Ativos</p>
                    <p className="text-2xl font-bold text-white truncate">
                      {dispositivos.filter(d => d.status === 'ativo').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-yellow-500/20 min-w-0">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-500/20 rounded-lg shadow-sm flex-shrink-0">
                    <span className="text-2xl text-yellow-400">🔧</span>
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className="text-sm font-medium text-gray-400 truncate">Em Manutenção</p>
                    <p className="text-2xl font-bold text-white truncate">
                      {dispositivos.filter(d => d.status === 'manutencao').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-red-500/20 min-w-0">
                <div className="flex items-center">
                  <div className="p-3 bg-red-500/20 rounded-lg shadow-sm flex-shrink-0">
                    <span className="text-2xl text-red-400">⏸️</span>
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className="text-sm font-medium text-gray-400 truncate">Inativos</p>
                    <p className="text-2xl font-bold text-white truncate">
                      {dispositivos.filter(d => d.status === 'inativo').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de Dispositivos */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <h3 className="text-lg font-semibold text-white min-w-0">📋 Dispositivos GPS</h3>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30 whitespace-nowrap flex-shrink-0">
                    {dispositivos.filter(d => d.status === 'ativo').length} ativos
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">Dispositivo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">Veículo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">Modelo/Serial</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">Instalação</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">Última Com.</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">Bateria</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">Sinal</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-0">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {dispositivos.map((dispositivo) => (
                      <tr key={dispositivo.id} className="hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap min-w-0">
                          <div className="flex items-center">
                            <div className="h-8 w-8 bg-blue-500/20 rounded flex items-center justify-center shadow-sm flex-shrink-0">
                              <span className="text-blue-400">📡</span>
                            </div>
                            <div className="ml-4 min-w-0">
                              <div className="text-sm font-medium text-white truncate">{dispositivo.codigo}</div>
                              <div className="text-sm text-gray-400 truncate">{dispositivo.placa}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white min-w-0 truncate">{dispositivo.veiculo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm min-w-0">
                          <div className="text-white truncate">{dispositivo.modelo}</div>
                          <div className="text-gray-400 text-xs truncate">{dispositivo.numeroSerie}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white min-w-0">
                          {new Date(dispositivo.dataInstalacao).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white min-w-0 truncate">{dispositivo.ultimaComunicacao}</td>
                        <td className="px-6 py-4 whitespace-nowrap min-w-0">
                          <div className="flex items-center">
                            <span className={`text-sm font-medium ${getBateriaColor(dispositivo.bateria)} whitespace-nowrap`}>
                              {dispositivo.bateria}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap min-w-0">
                          <div className="flex items-center">
                            <span className={`text-sm font-medium ${getSinalColor(dispositivo.sinal)} whitespace-nowrap`}>
                              {dispositivo.sinal}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap min-w-0">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(dispositivo.status)} whitespace-nowrap`}>
                            {getStatusText(dispositivo.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium min-w-0">
                          <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-1 sm:space-y-0">
                            {dispositivo.status === 'ativo' ? (
                              <button
                                onClick={() => toggleStatus(dispositivo.id, 'inativo')}
                                className="text-red-400 hover:text-red-300 transition-colors text-xs whitespace-nowrap"
                              >
                                ⏸️ Desativar
                              </button>
                            ) : (
                              <button
                                onClick={() => toggleStatus(dispositivo.id, 'ativo')}
                                className="text-green-400 hover:text-green-300 transition-colors text-xs whitespace-nowrap"
                              >
                                ✅ Ativar
                              </button>
                            )}
                            <button className="text-blue-400 hover:text-blue-300 transition-colors text-xs whitespace-nowrap">
                              ⚙️ Configurar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Status dos Dispositivos e Ações Rápidas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 min-w-0">
                <h3 className="text-lg font-semibold text-white mb-4">🔋 Status de Bateria</h3>
                <div className="space-y-3">
                  {dispositivos.map((dispositivo) => (
                    <div key={dispositivo.id} className="flex items-center justify-between min-w-0">
                      <span className="text-sm text-gray-300 truncate flex-1 mr-4">{dispositivo.codigo}</span>
                      <div className="flex items-center flex-shrink-0">
                        <div className="w-24 bg-gray-700 rounded-full h-2 mr-3 flex-shrink-0">
                          <div 
                            className={`h-2 rounded-full ${getBateriaBgColor(dispositivo.bateria)}`}
                            style={{ width: `${dispositivo.bateria}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-medium ${getBateriaColor(dispositivo.bateria)} whitespace-nowrap`}>
                          {dispositivo.bateria}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 min-w-0">
                <h3 className="text-lg font-semibold text-white mb-4">⚡ Ações Rápidas</h3>
                <div className="space-y-3">
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 text-sm transition-all shadow-sm flex items-center justify-center">
                    <span className="mr-2">✅</span>
                    Ativar Todos os Dispositivos
                  </button>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm transition-all shadow-sm flex items-center justify-center">
                    <span className="mr-2">🔄</span>
                    Verificar Status em Tempo Real
                  </button>
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 text-sm transition-all shadow-sm flex items-center justify-center">
                    <span className="mr-2">📊</span>
                    Gerar Relatório de Dispositivos
                  </button>
                  <button className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 text-sm transition-all shadow-sm flex items-center justify-center">
                    <span className="mr-2">⚙️</span>
                    Configurações do Sistema
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Painel Lateral */}
          <div className="lg:col-span-1 space-y-6">
            {/* Status dos Dispositivos */}
            <div className="bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white truncate">📊 Status</h2>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                  <span className="text-green-400 truncate">Ativos</span>
                  <span className="text-green-400 font-bold whitespace-nowrap">
                    {dispositivos.filter(d => d.status === 'ativo').length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg">
                  <span className="text-yellow-400 truncate">Manutenção</span>
                  <span className="text-yellow-400 font-bold whitespace-nowrap">
                    {dispositivos.filter(d => d.status === 'manutencao').length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg">
                  <span className="text-red-400 truncate">Inativos</span>
                  <span className="text-red-400 font-bold whitespace-nowrap">
                    {dispositivos.filter(d => d.status === 'inativo').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Modelos de GPS */}
            <div className="bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white truncate">📱 Modelos</h2>
              </div>
              <div className="p-4 space-y-3">
                {Array.from(new Set(dispositivos.map(d => d.modelo))).map((modelo, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span className="text-gray-300 truncate">{modelo}</span>
                    <span className="text-white font-bold whitespace-nowrap">
                      {dispositivos.filter(d => d.modelo === modelo).length}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Informações do Sistema */}
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <h3 className="text-lg font-semibold text-blue-400 mb-2 truncate">💡 Informações</h3>
              <ul className="text-blue-300 text-sm space-y-1">
                <li className="truncate">• Bateria baixa: abaixo de 30%</li>
                <li className="truncate">• Sinal fraco: abaixo de 50%</li>
                <li className="truncate">• Verifique status regularmente</li>
                <li className="truncate">• Mantenha dispositivos atualizados</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Novo Dispositivo */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl border border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white flex items-center">
                <span className="mr-2">➕</span>
                Cadastrar Novo Dispositivo GPS
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
                    <option value="Caminhão Truck">Caminhão Truck</option>
                    <option value="Caminhão Carreta">Caminhão Carreta</option>
                    <option value="Caminhão Baú">Caminhão Baú</option>
                    <option value="Caminhão Aberto">Caminhão Aberto</option>
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
                    placeholder="Ex: AB123CD"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Modelo do GPS *</label>
                  <input
                    type="text"
                    value={formData.modelo}
                    onChange={(e) => setFormData({...formData, modelo: e.target.value})}
                    required
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: TKSTAR 101"
                  />
                </div>
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Número de Série *</label>
                  <input
                    type="text"
                    value={formData.numeroSerie}
                    onChange={(e) => setFormData({...formData, numeroSerie: e.target.value})}
                    required
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: TS20240001"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <label className="block text-sm font-medium text-gray-300 mb-2">Data de Instalação *</label>
                <input
                  type="date"
                  value={formData.dataInstalacao}
                  onChange={(e) => setFormData({...formData, dataInstalacao: e.target.value})}
                  required
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
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
                  Cadastrar Dispositivo
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