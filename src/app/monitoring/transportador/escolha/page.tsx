"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';

interface CargaSelecionada {
  id: number;
  codigo: string;
  cliente: string;
  origem: string;
  destino: string;
  tipo: string;
  peso: number;
  volume: number;
  valorProposto: number;
  dataLimite: string;
  distancia: number;
  tipoVeiculo: string;
  requisitos: string[];
}

interface Proposta {
  id: number;
  cargaId: number;
  valorProposta: number;
  prazoEntrega: string;
  observacoes: string;
  dataProposta: string;
  status: 'pendente' | 'aceita' | 'rejeitada';
}

export default function EscolhaCarga() {
  const router = useRouter();
  const [cargasSelecionadas] = useState<CargaSelecionada[]>([
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
      dataLimite: '2024-01-20',
      distancia: 30,
      tipoVeiculo: 'Camião Truck',
      requisitos: ['CNUC', 'Seguro Carga', 'Experiência Comprovada', 'Certificado de Peso']
    }
  ]);

  const [proposta, setProposta] = useState<Proposta>({
    id: 1,
    cargaId: 1,
    valorProposta: 45000,
    prazoEntrega: '2024-01-19',
    observacoes: '',
    dataProposta: new Date().toISOString().split('T')[0],
    status: 'pendente'
  });

  const [etapa, setEtapa] = useState<'detalhes' | 'proposta' | 'confirmacao'>('detalhes');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN'
    }).format(value);
  };

  const calcularValorPorKm = () => {
    const carga = cargasSelecionadas[0];
    return formatCurrency(carga.valorProposto / carga.distancia);
  };

  const handleEnviarProposta = () => {
    // Simulação de envio de proposta
    alert('Proposta enviada com sucesso! Aguarde a resposta do cliente.');
    setEtapa('confirmacao');
  };

  const carga = cargasSelecionadas[0];

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
              <h1 className="text-2xl font-bold text-white">🚚 Escolha da Carga</h1>
              <p className="text-gray-400">Selecione cargas para transportar</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm border ${
                etapa === 'detalhes' 
                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
                  : 'bg-gray-700 text-gray-400 border-gray-600'
              }`}>1. Detalhes</span>
              <span className="text-gray-600">→</span>
              <span className={`px-3 py-1 rounded-full text-sm border ${
                etapa === 'proposta' 
                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
                  : 'bg-gray-700 text-gray-400 border-gray-600'
              }`}>2. Proposta</span>
              <span className="text-gray-600">→</span>
              <span className={`px-3 py-1 rounded-full text-sm border ${
                etapa === 'confirmacao' 
                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
                  : 'bg-gray-700 text-gray-400 border-gray-600'
              }`}>3. Confirmação</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {etapa === 'detalhes' && (
          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">📋 Detalhes da Carga</h2>
              <p className="text-gray-400">Revise os detalhes antes de enviar sua proposta</p>
            </div>

            <div className="p-6">
              {/* Cabeçalho da Carga */}
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">
                    {getTipoCargaIcon(carga.tipo)}
                  </span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-white">{carga.codigo}</h3>
                  <p className="text-gray-300">{carga.cliente}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-2xl font-bold text-green-400">{formatCurrency(carga.valorProposto)}</p>
                  <p className="text-sm text-gray-400">Valor proposto</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Informações da Rota */}
                <div className="bg-gray-700/50 p-4 rounded-xl border border-gray-600">
                  <h4 className="font-semibold text-white mb-3 flex items-center">
                    <span className="mr-2">{getRotaIcon(carga.origem, carga.destino)}</span>
                    Informações da Rota
                  </h4>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex justify-between">
                      <span>Origem:</span>
                      <span className="font-medium text-white">{carga.origem}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Destino:</span>
                      <span className="font-medium text-white">{carga.destino}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Distância:</span>
                      <span className="font-medium text-orange-400">{carga.distancia} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Data Limite:</span>
                      <span className="font-medium text-white">{new Date(carga.dataLimite).toLocaleDateString('pt-MZ')}</span>
                    </div>
                  </div>
                </div>

                {/* Informações da Carga */}
                <div className="bg-gray-700/50 p-4 rounded-xl border border-gray-600">
                  <h4 className="font-semibold text-white mb-3 flex items-center">
                    <span className="mr-2">🚛</span>
                    Informações da Carga
                  </h4>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex justify-between">
                      <span>Tipo:</span>
                      <span className="font-medium text-white">{carga.tipo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Peso:</span>
                      <span className="font-medium text-white">{carga.peso} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Volume:</span>
                      <span className="font-medium text-white">{carga.volume} m³</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Veículo:</span>
                      <span className="font-medium text-white">{carga.tipoVeiculo}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Análise Financeira */}
              <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 mb-6">
                <h4 className="font-semibold text-blue-400 mb-3 flex items-center">
                  <span className="mr-2">💰</span>
                  Análise Financeira
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-blue-400 font-semibold">{formatCurrency(carga.valorProposto)}</p>
                    <p className="text-blue-300">Valor Total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-blue-400 font-semibold">{calcularValorPorKm()}</p>
                    <p className="text-blue-300">Por Km</p>
                  </div>
                  <div className="text-center">
                    <p className="text-blue-400 font-semibold">{carga.distancia} km</p>
                    <p className="text-blue-300">Distância</p>
                  </div>
                  <div className="text-center">
                    <p className="text-blue-400 font-semibold">
                      {Math.round(carga.distancia / 60)}-{Math.round(carga.distancia / 40)} h
                    </p>
                    <p className="text-blue-300">Tempo Estimado</p>
                  </div>
                </div>
              </div>

              {/* Requisitos */}
              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3 flex items-center">
                  <span className="mr-2">🎯</span>
                  Requisitos da Carga
                </h4>
                <div className="flex flex-wrap gap-2">
                  {carga.requisitos.map((requisito, index) => (
                    <span key={index} className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm border border-green-500/30 flex items-center">
                      <span className="mr-1">✓</span>
                      {requisito}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ações */}
              <div className="flex justify-between pt-6 border-t border-gray-700">
                <button
                  onClick={() => router.push('/monitoring/transportador/cargas')}
                  className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-all"
                >
                  Voltar para Cargas
                </button>
                <button
                  onClick={() => setEtapa('proposta')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center"
                >
                  <span className="mr-2">📝</span>
                  Fazer Proposta
                </button>
              </div>
            </div>
          </div>
        )}

        {etapa === 'proposta' && (
          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">📝 Fazer Proposta</h2>
              <p className="text-gray-400">Preencha os detalhes da sua proposta</p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Valor da Proposta (MT)
                  </label>
                  <input
                    type="number"
                    value={proposta.valorProposta}
                    onChange={(e) => setProposta({...proposta, valorProposta: parseInt(e.target.value)})}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-sm text-gray-400 mt-1">
                    Valor proposto pelo cliente: <span className="text-green-400">{formatCurrency(carga.valorProposto)}</span>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Prazo de Entrega
                  </label>
                  <input
                    type="date"
                    value={proposta.prazoEntrega}
                    onChange={(e) => setProposta({...proposta, prazoEntrega: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-sm text-gray-400 mt-1">
                    Data limite do cliente: <span className="text-orange-400">{new Date(carga.dataLimite).toLocaleDateString('pt-MZ')}</span>
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Observações (Opcional)
                </label>
                <textarea
                  value={proposta.observacoes}
                  onChange={(e) => setProposta({...proposta, observacoes: e.target.value})}
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Informações adicionais sobre sua proposta, condições especiais, disponibilidade de veículos, etc."
                />
              </div>

              {/* Resumo da Proposta */}
              <div className="bg-gray-700/50 p-4 rounded-xl border border-gray-600 mb-6">
                <h4 className="font-semibold text-white mb-3 flex items-center">
                  <span className="mr-2">📄</span>
                  Resumo da Proposta
                </h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Carga:</span>
                    <span className="font-medium text-white">{carga.codigo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cliente:</span>
                    <span className="font-medium text-white">{carga.cliente}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rota:</span>
                    <span className="font-medium text-white">{carga.origem} → {carga.destino}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valor Proposto:</span>
                    <span className="font-medium text-green-400">{formatCurrency(proposta.valorProposta)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prazo de Entrega:</span>
                    <span className="font-medium text-white">{new Date(proposta.prazoEntrega).toLocaleDateString('pt-MZ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data da Proposta:</span>
                    <span className="font-medium text-white">{new Date(proposta.dataProposta).toLocaleDateString('pt-MZ')}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6 border-t border-gray-700">
                <button
                  onClick={() => setEtapa('detalhes')}
                  className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-all"
                >
                  Voltar
                </button>
                <button
                  onClick={handleEnviarProposta}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center"
                >
                  <span className="mr-2">📤</span>
                  Enviar Proposta
                </button>
              </div>
            </div>
          </div>
        )}

        {etapa === 'confirmacao' && (
          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">✅ Proposta Enviada</h2>
              <p className="text-gray-400">Sua proposta foi enviada com sucesso</p>
            </div>

            <div className="p-6 text-center">
              <div className="text-green-500 text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-white mb-2">Proposta Enviada!</h3>
              <p className="text-gray-400 mb-6">
                Sua proposta para a carga <strong className="text-white">{carga.codigo}</strong> foi enviada com sucesso.
                Aguarde a resposta do cliente.
              </p>

              <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/20 mb-6 max-w-md mx-auto">
                <h4 className="font-semibold text-green-400 mb-2">📋 Próximos Passos</h4>
                <ul className="text-green-300 text-sm space-y-1 text-left">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Você receberá uma notificação quando o cliente responder
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Acompanhe o status na página Visualizar Relatórios
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Mantenha-se disponível para possíveis contatos
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Prepare a documentação necessária para quando for aceita
                  </li>
                </ul>
              </div>

              {/* Resumo da Proposta Enviada */}
              <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 mb-6 max-w-md mx-auto">
                <h4 className="font-semibold text-blue-400 mb-2">📄 Sua Proposta</h4>
                <div className="text-blue-300 text-sm space-y-1 text-left">
                  <div className="flex justify-between">
                    <span>Valor:</span>
                    <span className="font-medium text-blue-400">{formatCurrency(proposta.valorProposta)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prazo:</span>
                    <span className="font-medium text-blue-400">{new Date(proposta.prazoEntrega).toLocaleDateString('pt-MZ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cliente:</span>
                    <span className="font-medium text-blue-400">{carga.cliente}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => router.push('/monitoring/transportador/cargas')}
                  className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-all"
                >
                  Ver Mais Cargas
                </button>
                <button
                  onClick={() => router.push('/monitoring/transportador/relatorios')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center"
                >
                  <span className="mr-2">📊</span>
                  Acompanhar Propostas
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
    </Layout>
    
  );
}