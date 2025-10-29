"use client";


import Layout from '@/components/layout/Layout';
import React, { useState } from 'react';

interface CargaDisponivel {
  id: number;
  codigo: string;
  cliente: string;
  origem: string;
  destino: string;
  tipo: string;
  peso: number;
  volume: number;
  valorProposto: number;
  dataDisponibilidade: string;
  dataLimite: string;
  status: 'disponivel' | 'reservada' | 'atribuida';
  distancia: number;
  tipoVeiculo: string;
  requisitos: string[];
}

export default function CargasDisponiveis() {
  const [cargas, setCargas] = useState<CargaDisponivel[]>([
    {
      id: 1,
      codigo: 'CARGA-MZ-2024-015',
      cliente: 'Cimentos de Moçambique',
      origem: 'Maputo',
      destino: 'Matola',
      tipo: 'Container',
      peso: 1200,
      volume: 20,
      valorProposto: 45000,
      dataDisponibilidade: '2024-01-17',
      dataLimite: '2024-01-20',
      status: 'disponivel',
      distancia: 30,
      tipoVeiculo: 'Camião Truck',
      requisitos: ['Documentação', 'Cinto de Amarração', 'Lona', 'Certificado de Peso']
    },
    {
      id: 2,
      codigo: 'CARGA-MZ-2024-016',
      cliente: 'Shoprite Moçambique',
      origem: 'Beira',
      destino: 'Chimoio',
      tipo: 'Carga Geral',
      peso: 800,
      volume: 12,
      valorProposto: 32000,
      dataDisponibilidade: '2024-01-18',
      dataLimite: '2024-01-22',
      status: 'disponivel',
      distancia: 180,
      tipoVeiculo: 'Camião Baú',
      requisitos: ['Documentação', 'Seguro', 'Controlo de Temperatura']
    },
    {
      id: 3,
      codigo: 'CARGA-MZ-2024-017',
      cliente: 'Cervejas de Moçambique',
      origem: 'Maputo',
      destino: 'Nampula',
      tipo: 'Granel',
      peso: 1800,
      volume: 25,
      valorProposto: 85000,
      dataDisponibilidade: '2024-01-16',
      dataLimite: '2024-01-19',
      status: 'reservada',
      distancia: 2200,
      tipoVeiculo: 'Camião Carreta',
      requisitos: ['Documentação', 'EPI', 'Certificado de Origem', 'Licença Especial']
    },
    {
      id: 4,
      codigo: 'CARGA-MZ-2024-018',
      cliente: 'SUCCO Moçambique',
      origem: 'Nacala',
      destino: 'Nampula',
      tipo: 'Container',
      peso: 1500,
      volume: 22,
      valorProposto: 38000,
      dataDisponibilidade: '2024-01-19',
      dataLimite: '2024-01-21',
      status: 'disponivel',
      distancia: 180,
      tipoVeiculo: 'Camião Truck',
      requisitos: ['Documentação', 'Selos Alfandegários']
    },
    {
      id: 5,
      codigo: 'CARGA-MZ-2024-019',
      cliente: 'Mimoso Trading',
      origem: 'Maputo',
      destino: 'Xai-Xai',
      tipo: 'Carga Geral',
      peso: 600,
      volume: 8,
      valorProposto: 18000,
      dataDisponibilidade: '2024-01-20',
      dataLimite: '2024-01-23',
      status: 'disponivel',
      distancia: 220,
      tipoVeiculo: 'Camião Baú',
      requisitos: ['Documentação', 'Inventário']
    }
  ]);

  const [filtros, setFiltros] = useState({
    origem: '',
    destino: '',
    tipo: '',
    pesoMin: '',
    pesoMax: ''
  });

  const cargasFiltradas = cargas.filter(carga => {
    if (filtros.origem && !carga.origem.toLowerCase().includes(filtros.origem.toLowerCase())) return false;
    if (filtros.destino && !carga.destino.toLowerCase().includes(filtros.destino.toLowerCase())) return false;
    if (filtros.tipo && carga.tipo !== filtros.tipo) return false;
    if (filtros.pesoMin && carga.peso < parseInt(filtros.pesoMin)) return false;
    if (filtros.pesoMax && carga.peso > parseInt(filtros.pesoMax)) return false;
    return true;
  });

  const handleInteresse = (cargaId: number) => {
    setCargas(cargas.map(carga => 
      carga.id === cargaId 
        ? { ...carga, status: 'reservada' as const }
        : carga
    ));
    alert('Interesse manifestado com sucesso! Aguarde contato.');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN'
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disponivel': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'reservada': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      case 'atribuida': return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  const getTipoCargaIcon = (tipo: string) => {
    switch (tipo) {
      case 'Container': return '📦';
      case 'Carga Geral': return '📦';
      case 'Granel': return '🪨';
      case 'Perigosa': return '⚠️';
      case 'Refrigerada': return '❄️';
      default: return '📦';
    }
  };

  const getTipoVeiculoIcon = (tipo: string) => {
    switch (tipo) {
      case 'Camião Truck': return '🚛';
      case 'Camião Baú': return '🚚';
      case 'Camião Carreta': return '🚛';
      case 'Camião Aberto': return '🚛';
      default: return '🚚';
    }
  };

  const getRotaIcon = (origem: string, destino: string) => {
    const rotasPrincipais = [
      { origem: 'Maputo', destino: 'Matola', icon: '🏙️' },
      { origem: 'Beira', destino: 'Chimoio', icon: '🏔️' },
      { origem: 'Maputo', destino: 'Nampula', icon: '🛣️' },
      { origem: 'Nacala', destino: 'Nampula', icon: '🌊' },
      { origem: 'Maputo', destino: 'Xai-Xai', icon: '🏖️' }
    ];
    
    const rota = rotasPrincipais.find(r => 
      r.origem === origem && r.destino === destino
    );
    
    return rota ? rota.icon : '📍';
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">🚚 Cargas Disponíveis</h1>
              <p className="text-gray-400">Visualize cargas disponíveis para transporte - Moçambique</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            {/* Filtros */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">🔍 Filtrar Cargas</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Origem</label>
                  <input
                    type="text"
                    value={filtros.origem}
                    onChange={(e) => setFiltros({...filtros, origem: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: Maputo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Destino</label>
                  <input
                    type="text"
                    value={filtros.destino}
                    onChange={(e) => setFiltros({...filtros, destino: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: Matola"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tipo</label>
                  <select
                    value={filtros.tipo}
                    onChange={(e) => setFiltros({...filtros, tipo: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Todos</option>
                    <option value="Container">Container</option>
                    <option value="Carga Geral">Carga Geral</option>
                    <option value="Granel">Granel</option>
                    <option value="Refrigerada">Refrigerada</option>
                    <option value="Perigosa">Perigosa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Peso Mín (kg)</label>
                  <input
                    type="number"
                    value={filtros.pesoMin}
                    onChange={(e) => setFiltros({...filtros, pesoMin: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Peso Máx (kg)</label>
                  <input
                    type="number"
                    value={filtros.pesoMax}
                    onChange={(e) => setFiltros({...filtros, pesoMax: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="5000"
                  />
                </div>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
                <p className="text-sm text-gray-400">Total Cargas</p>
                <p className="text-2xl font-bold text-white">{cargas.length}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-green-500/20">
                <p className="text-sm text-gray-400">Disponíveis</p>
                <p className="text-2xl font-bold text-green-400">
                  {cargas.filter(c => c.status === 'disponivel').length}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-purple-500/20">
                <p className="text-sm text-gray-400">Valor Médio</p>
                <p className="text-2xl font-bold text-purple-400">
                  {formatCurrency(cargas.reduce((sum, carga) => sum + carga.valorProposto, 0) / cargas.length)}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-orange-500/20">
                <p className="text-sm text-gray-400">Distância Média</p>
                <p className="text-2xl font-bold text-orange-400">
                  {Math.round(cargas.reduce((sum, carga) => sum + carga.distancia, 0) / cargas.length)} km
                </p>
              </div>
            </div>

            {/* Lista de Cargas */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">
                    📦 Cargas Disponíveis ({cargasFiltradas.length})
                  </h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition-all flex items-center">
                    <span className="mr-2">🔄</span>
                    Atualizar
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {cargasFiltradas.map((carga) => (
                    <div 
                      key={carga.id} 
                      className="border border-gray-600 rounded-xl p-6 bg-gray-700/50 hover:bg-gray-700/70 transition-all"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-4">
                            <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                              <span className="text-white text-lg">
                                {getTipoCargaIcon(carga.tipo)}
                              </span>
                            </div>
                            <div className="ml-4">
                              <h3 className="text-lg font-semibold text-white">{carga.codigo}</h3>
                              <p className="text-gray-300">{carga.cliente}</p>
                            </div>
                            <div className="ml-auto flex space-x-2">
                              <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(carga.status)}`}>
                                {carga.status === 'disponivel' ? '✅ Disponível' : 
                                 carga.status === 'reservada' ? '🟡 Reservada' : '🔵 Atribuída'}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div className="bg-gray-600/30 p-3 rounded-lg">
                              <p className="text-sm text-gray-400 flex items-center">
                                <span className="mr-1">{getRotaIcon(carga.origem, carga.destino)}</span>
                                Rota
                              </p>
                              <p className="font-medium text-white">{carga.origem} → {carga.destino}</p>
                              <p className="text-sm text-gray-300">{carga.distancia} km</p>
                            </div>
                            <div className="bg-gray-600/30 p-3 rounded-lg">
                              <p className="text-sm text-gray-400">📦 Carga</p>
                              <p className="font-medium text-white">{carga.tipo}</p>
                              <p className="text-sm text-gray-300">{carga.peso}kg / {carga.volume}m³</p>
                            </div>
                            <div className="bg-gray-600/30 p-3 rounded-lg">
                              <p className="text-sm text-gray-400">💰 Valor</p>
                              <p className="font-medium text-green-400 text-lg">{formatCurrency(carga.valorProposto)}</p>
                              <p className="text-sm text-gray-300">Prazo: {new Date(carga.dataLimite).toLocaleDateString('pt-MZ')}</p>
                            </div>
                            <div className="bg-gray-600/30 p-3 rounded-lg">
                              <p className="text-sm text-gray-400">🚚 Veículo</p>
                              <p className="font-medium text-white">{carga.tipoVeiculo}</p>
                              <p className="text-sm text-gray-300">{getTipoVeiculoIcon(carga.tipoVeiculo)}</p>
                            </div>
                          </div>

                          {/* Requisitos */}
                          <div className="mb-4">
                            <p className="text-sm text-gray-400 mb-2">🎯 Requisitos:</p>
                            <div className="flex flex-wrap gap-2">
                              {carga.requisitos.map((req, index) => (
                                <span key={index} className="bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs border border-gray-500">
                                  {req}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="lg:ml-6 lg:pl-6 lg:border-l lg:border-gray-600">
                          {carga.status === 'disponivel' ? (
                            <div className="space-y-3">
                              <button
                                onClick={() => handleInteresse(carga.id)}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium transition-all shadow-sm flex items-center justify-center"
                              >
                                <span className="mr-2">👍</span>
                                Manifestar Interesse
                              </button>
                              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 font-medium transition-all shadow-sm flex items-center justify-center">
                                <span className="mr-2">💵</span>
                                Fazer Proposta
                              </button>
                              <button className="w-full border border-gray-500 text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-600 transition-all shadow-sm flex items-center justify-center">
                                <span className="mr-2">👁️</span>
                                Ver Detalhes
                              </button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <p className="text-gray-400 text-sm mb-3">
                                Carga {carga.status === 'reservada' ? 'reservada' : 'atribuída'}
                              </p>
                              <button className="w-full border border-gray-500 text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-600 transition-all shadow-sm flex items-center justify-center">
                                <span className="mr-2">📊</span>
                                Acompanhar
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mensagem quando não há cargas */}
            {cargasFiltradas.length === 0 && (
              <div className="text-center py-12 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                <div className="text-gray-400 text-6xl mb-4">📦</div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Nenhuma carga encontrada
                </h3>
                <p className="text-gray-400 mb-4">
                  Não há cargas disponíveis que correspondam aos seus filtros.
                </p>
                <button
                  onClick={() => setFiltros({ origem: '', destino: '', tipo: '', pesoMin: '', pesoMax: '' })}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-sm"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>

          {/* Painel Lateral */}
          <div className="lg:col-span-1">
            {/* Tipos de Carga */}
            <div className="bg-gray-800 rounded-lg shadow mb-6">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">📦 Tipos de Carga</h2>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg">
                  <span className="text-blue-400">Container</span>
                  <span className="text-blue-400 font-bold">
                    {cargas.filter(c => c.tipo === 'Container').length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                  <span className="text-green-400">Carga Geral</span>
                  <span className="text-green-400 font-bold">
                    {cargas.filter(c => c.tipo === 'Carga Geral').length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg">
                  <span className="text-orange-400">Granel</span>
                  <span className="text-orange-400 font-bold">
                    {cargas.filter(c => c.tipo === 'Granel').length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg">
                  <span className="text-red-400">Perigosa</span>
                  <span className="text-red-400 font-bold">
                    {cargas.filter(c => c.tipo === 'Perigosa').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Status das Cargas */}
            <div className="bg-gray-800 rounded-lg shadow mb-6">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">📊 Status</h2>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                  <span className="text-green-400">Disponíveis</span>
                  <span className="text-green-400 font-bold">
                    {cargas.filter(c => c.status === 'disponivel').length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg">
                  <span className="text-yellow-400">Reservadas</span>
                  <span className="text-yellow-400 font-bold">
                    {cargas.filter(c => c.status === 'reservada').length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg">
                  <span className="text-blue-400">Atribuídas</span>
                  <span className="text-blue-400 font-bold">
                    {cargas.filter(c => c.status === 'atribuida').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Principais Rotas */}
            <div className="bg-gray-800 rounded-lg shadow mb-6">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">📍 Principais Rotas</h2>
              </div>
              <div className="p-4 space-y-2">
                {Array.from(new Set(cargas.map(c => `${c.origem} → ${c.destino}`))).slice(0, 4).map((rota) => (
                  <div key={rota} className="flex justify-between items-center p-2 bg-gray-700 rounded text-xs">
                    <span className="text-gray-300 truncate flex-1 mr-2">{rota}</span>
                    <span className="text-blue-400 font-bold">
                      {cargas.filter(c => `${c.origem} → ${c.destino}` === rota).length}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">⚡ Ações Rápidas</h2>
              </div>
              <div className="p-4 space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm flex items-center justify-center transition-all">
                  <span className="mr-2">📋</span>
                  Minhas Propostas
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 text-sm flex items-center justify-center transition-all">
                  <span className="mr-2">🚛</span>
                  Meus Camiões
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 text-sm flex items-center justify-center transition-all">
                  <span className="mr-2">📊</span>
                  Relatório Transportes
                </button>
                <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 text-sm flex items-center justify-center transition-all">
                  <span className="mr-2">📞</span>
                  Suporte
                </button>
              </div>
            </div>

            {/* Dicas */}
            <div className="mt-6 bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">💡 Dicas</h3>
              <ul className="text-blue-300 text-sm space-y-1">
                <li>• Verifique os requisitos da carga</li>
                <li>• Considere a distância e prazo</li>
                <li>• Manifeste interesse rapidamente</li>
                <li>• Cargas reservadas aguardam confirmação</li>
                <li>• Verifique documentação necessária</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
    </Layout>
    
  );
}