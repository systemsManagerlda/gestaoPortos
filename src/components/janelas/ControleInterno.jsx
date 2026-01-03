import React, { useState, useEffect } from 'react';

// Componente de Velocímetro em Semicírculo
const SpeedometerSemi = ({ title, currentValue, targetValue, color = '#3B82F6', unit = 'MT' }) => {
  const percentage = Math.min((currentValue / targetValue) * 100, 100);
  const radius = 100;
  const circumference = Math.PI * radius; // Circunferência para semicírculo
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const getStatusColor = (percentage) => {
    if (percentage >= 100) return '#10B981'; // Verde
    if (percentage >= 75) return '#3B82F6'; // Azul
    if (percentage >= 50) return '#F59E0B'; // Amarelo
    if (percentage >= 25) return '#F97316'; // Laranja
    return '#EF4444'; // Vermelho
  };
  
  const statusColor = getStatusColor(percentage);
  const angle = (percentage / 100) * 180; // 0-180 graus para semicírculo

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-4">
          <span className="text-2xl mr-2">{getIcon(title)}</span>
          <h3 className="font-semibold text-gray-900 text-center">{title}</h3>
        </div>
        
        <div className="relative w-full h-48 flex justify-center">
          <svg className="w-64 h-48" viewBox="0 0 200 100">
            {/* Fundo do semicírculo */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              stroke="#E5E7EB"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
            />
            
            {/* Progresso do semicírculo */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              stroke={statusColor}
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
            
            {/* Marcas do velocímetro */}
            {[0, 25, 50, 75, 100].map((mark) => {
              const markAngle = (mark / 100) * 180;
              const x = 100 + 80 * Math.cos(markAngle * Math.PI / 180);
              const y = 100 - 80 * Math.sin(markAngle * Math.PI / 180);
              
              return (
                <g key={mark}>
                  {/* Marcação */}
                  <line
                    x1={x}
                    y1={y}
                    x2={100 + 90 * Math.cos(markAngle * Math.PI / 180)}
                    y2={100 - 90 * Math.sin(markAngle * Math.PI / 180)}
                    stroke="#6B7280"
                    strokeWidth="2"
                  />
                  
                  {/* Texto da porcentagem */}
                  <text
                    x={100 + 105 * Math.cos(markAngle * Math.PI / 180)}
                    y={100 - 105 * Math.sin(markAngle * Math.PI / 180)}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    className="text-xs font-medium fill-gray-600"
                  >
                    {mark}%
                  </text>
                </g>
              );
            })}
            
            {/* Linhas verticais de referência */}
            <line x1="20" y1="100" x2="20" y2="85" stroke="#6B7280" strokeWidth="2" />
            <line x1="180" y1="100" x2="180" y2="85" stroke="#6B7280" strokeWidth="2" />
            <line x1="100" y1="100" x2="100" y2="90" stroke="#6B7280" strokeWidth="2" />
            
            {/* Ponteiro */}
            <line
              x1="100"
              y1="100"
              x2={100 + 70 * Math.cos(angle * Math.PI / 180)}
              y2={100 - 70 * Math.sin(angle * Math.PI / 180)}
              stroke="#1F2937"
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            {/* Centro do ponteiro */}
            <circle
              cx="100"
              cy="100"
              r="8"
              fill="#1F2937"
            />
          </svg>
          
          {/* Valores no centro inferior */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {currentValue.toLocaleString()}
                <span className="text-sm text-gray-600 ml-1">{unit}</span>
              </div>
              <div className="text-sm text-gray-600">
                Meta: {targetValue.toLocaleString()} {unit}
              </div>
            </div>
          </div>
          
          {/* Percentual no centro superior */}
          <div className="absolute top-12 left-0 right-0 text-center">
            <div 
              className={`text-3xl font-bold inline-block`}
              style={{ color: statusColor }}
            >
              {percentage.toFixed(1)}%
            </div>
          </div>
        </div>
        
        {/* Status e barra de progresso */}
        <div className="w-full mt-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: statusColor }}
              ></div>
              <span className="text-sm font-medium text-gray-700">
                {getStatusText(percentage)}
              </span>
            </div>
            <span className="text-sm text-gray-600">
              {currentValue.toLocaleString()} / {targetValue.toLocaleString()} {unit}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="rounded-full h-2 transition-all duration-300"
              style={{ 
                width: `${Math.min(percentage, 100)}%`, 
                backgroundColor: statusColor 
              }}
            ></div>
          </div>
          
          {/* Marcadores na barra */}
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Função auxiliar para obter ícones
const getIcon = (serviceName) => {
  const icons = {
    'Carga Local': '🚚',
    'Carga Nacional': '🇲🇿',
    'Carga Transito': '🔄',
    'Abastecimento': '⛽',
    'Seguro de Carga': '🛡️',
    'Área Despacho': '📦',
    'Trabalho Factura': '🧾',
    'Carga de Retorno': '↩️',
    'GPS de Cargas': '📍',
    'Trabalho Terceirizados': '👥'
  };
  return icons[serviceName] || '📊';
};

// Função auxiliar para texto de status
const getStatusText = (percentage) => {
  if (percentage >= 100) return 'Meta Atingida! 🎉';
  if (percentage >= 90) return 'Quase lá!';
  if (percentage >= 75) return 'Bom progresso';
  if (percentage >= 50) return 'No caminho';
  if (percentage >= 25) return 'Avançando';
  return 'Iniciando';
};

// Componente Dashboard de Metas
const DashboardMetas = () => {
  const [services, setServices] = useState([
    { id: 1, name: 'Carga Local', current: 185000, target: 250000, color: '#3B82F6' },
    { id: 2, name: 'Carga Nacional', current: 220000, target: 250000, color: '#8B5CF6' },
    { id: 3, name: 'Carga Transito', current: 150000, target: 250000, color: '#10B981' },
    { id: 4, name: 'Abastecimento', current: 250000, target: 250000, color: '#F59E0B' },
    { id: 5, name: 'Seguro de Carga', current: 195000, target: 250000, color: '#EF4444' },
    { id: 6, name: 'Área Despacho', current: 210000, target: 250000, color: '#06B6D4' },
    { id: 7, name: 'Trabalho Factura', current: 175000, target: 250000, color: '#F97316' },
    { id: 8, name: 'Carga de Retorno', current: 160000, target: 250000, color: '#EC4899' },
    { id: 9, name: 'GPS de Cargas', current: 240000, target: 250000, color: '#6366F1' },
    { id: 10, name: 'Trabalho Terceirizados', current: 130000, target: 250000, color: '#14B8A6' },
  ]);

  const [totalMeta, setTotalMeta] = useState(2500000);
  const [totalAtual, setTotalAtual] = useState(0);
  const [metaGlobal, setMetaGlobal] = useState(250000);
  const [progressoTotal, setProgressoTotal] = useState(0);

  // Calcular totais
  useEffect(() => {
    const somaAtual = services.reduce((acc, service) => acc + service.current, 0);
    setTotalAtual(somaAtual);
    setProgressoTotal((somaAtual / totalMeta) * 100);
  }, [services, totalMeta]);

  // Função para ajustar valor de um serviço
  const ajustarValor = (id, novoValor) => {
    if (novoValor < 0) return;
    
    setServices(services.map(service => 
      service.id === id 
        ? { ...service, current: Math.min(novoValor, service.target * 1.5) }
        : service
    ));
  };

  // Função para aumentar meta
  const aumentarMeta = () => {
    const novaMeta = metaGlobal + 50000;
    setMetaGlobal(novaMeta);
    
    setServices(services.map(service => ({
      ...service,
      target: novaMeta
    })));
    
    setTotalMeta(novaMeta * 10);
  };

  // Função para resetar metas
  const resetarMetas = () => {
    const novaMeta = 250000;
    setMetaGlobal(novaMeta);
    setServices(services.map(service => ({
      ...service,
      current: Math.min(service.current, novaMeta),
      target: novaMeta
    })));
    setTotalMeta(novaMeta * 10);
  };

  return (
    <div className="p-6">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg mr-3">
            📊
          </span>
          Dashboard de Metas - Velocímetros
        </h1>
        <p className="text-gray-600 mt-2">
          Acompanhamento visual do progresso dos serviços com velocímetros em semicírculo
        </p>
      </div>

      {/* Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Arrecadado</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalAtual.toLocaleString()} MT
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full shadow">
              <span className="text-white text-xl">💰</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Meta Total</span>
              <span>{progressoTotal.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-blue-100 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full h-3 transition-all duration-500 shadow-inner"
                style={{ width: `${Math.min(progressoTotal, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Meta por Serviço</p>
              <p className="text-2xl font-bold text-gray-900">
                {metaGlobal.toLocaleString()} MT
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-full shadow">
              <span className="text-white text-xl">🎯</span>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-green-600 text-sm font-medium">
              Meta mensal atual
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Serviços em Meta</p>
              <p className="text-2xl font-bold text-gray-900">
                {services.filter(s => (s.current / s.target) * 100 >= 100).length}/10
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-full shadow">
              <span className="text-white text-xl">✅</span>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-purple-600 text-sm font-medium">
              {((services.filter(s => (s.current / s.target) * 100 >= 100).length / 10) * 100).toFixed(0)}% atingiram
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Média Geral</p>
              <p className="text-2xl font-bold text-gray-900">
                {(services.reduce((acc, s) => acc + (s.current / s.target) * 100, 0) / 10).toFixed(1)}%
              </p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-full shadow">
              <span className="text-white text-xl">📈</span>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-orange-600 text-sm font-medium">
              Progresso médio
            </span>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">Controle de Metas</h3>
            <p className="text-sm text-gray-600">Ajuste valores e gerencie metas dos serviços</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={aumentarMeta}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 font-medium flex items-center shadow hover:shadow-md transition-all"
            >
              <span className="mr-2">⬆️</span>
              Aumentar Meta (+50K)
            </button>
            <button
              onClick={resetarMetas}
              className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 font-medium flex items-center shadow hover:shadow-md transition-all"
            >
              <span className="mr-2">🔄</span>
              Resetar Metas
            </button>
            <button
              onClick={() => {
                const novasMetas = services.map(s => ({
                  ...s,
                  current: Math.min(s.current + 10000, s.target * 1.5)
                }));
                setServices(novasMetas);
              }}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 font-medium flex items-center shadow hover:shadow-md transition-all"
            >
              <span className="mr-2">💰</span>
              +10K em Todos
            </button>
          </div>
        </div>

        {/* Ajustes rápidos por serviço */}
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-4">Ajustes Rápidos por Serviço</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-3">
            {services.map(service => (
              <div key={service.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center">
                  <span className="text-xl mb-1">{getIcon(service.name)}</span>
                  <span className="text-xs font-medium text-gray-900 text-center truncate w-full">{service.name}</span>
                  <div className="flex space-x-1 mt-2">
                    <button
                      onClick={() => ajustarValor(service.id, service.current - 10000)}
                      className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200"
                      disabled={service.current <= 0}
                    >
                      -10K
                    </button>
                    <button
                      onClick={() => ajustarValor(service.id, service.current + 10000)}
                      className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200"
                    >
                      +10K
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid de Velocímetros em Semicírculo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {services.map(service => (
          <SpeedometerSemi
            key={service.id}
            title={service.name}
            currentValue={service.current}
            targetValue={service.target}
            color={service.color}
            unit="MT"
          />
        ))}
      </div>

      {/* Ranking de Performance */}
      <div className="mt-8 bg-white rounded-xl border-2 border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="font-semibold text-gray-900 flex items-center text-lg">
            <span className="mr-2">🏆</span>
            Ranking de Performance - Mês Atual
          </h3>
          <p className="text-sm text-gray-600 mt-1">Ordenado pelo percentual de conclusão</p>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Posição</th>
                  <th className="px-4 py-3">Serviço</th>
                  <th className="px-4 py-3">Valor Atual</th>
                  <th className="px-4 py-3">Meta</th>
                  <th className="px-4 py-3">Progresso</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {services
                  .sort((a, b) => (b.current / b.target) - (a.current / a.target))
                  .map((service, index) => {
                    const percentage = (service.current / service.target) * 100;
                    
                    return (
                      <tr key={service.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          <div className="flex items-center">
                            {index === 0 && <span className="text-yellow-500 text-lg mr-2">🥇</span>}
                            {index === 1 && <span className="text-gray-400 text-lg mr-2">🥈</span>}
                            {index === 2 && <span className="text-orange-500 text-lg mr-2">🥉</span>}
                            {index > 2 && <span className="font-bold mr-2">#{index + 1}</span>}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <span className="text-xl mr-3">{getIcon(service.name)}</span>
                            <span className="font-medium text-gray-900">{service.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-semibold text-gray-900">
                            {service.current.toLocaleString()} MT
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-gray-700">
                            {service.target.toLocaleString()} MT
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                              <div 
                                className="h-2 rounded-full"
                                style={{ 
                                  width: `${Math.min(percentage, 100)}%`,
                                  background: percentage >= 100 
                                    ? 'linear-gradient(to right, #10B981, #34D399)' 
                                    : percentage >= 75 
                                    ? 'linear-gradient(to right, #3B82F6, #60A5FA)'
                                    : percentage >= 50
                                    ? 'linear-gradient(to right, #F59E0B, #FBBF24)'
                                    : percentage >= 25
                                    ? 'linear-gradient(to right, #F97316, #FB923C)'
                                    : 'linear-gradient(to right, #EF4444, #F87171)'
                                }}
                              ></div>
                            </div>
                            <span className="font-bold" style={{ 
                              color: percentage >= 100 ? '#10B981' : 
                                     percentage >= 75 ? '#3B82F6' :
                                     percentage >= 50 ? '#F59E0B' :
                                     percentage >= 25 ? '#F97316' : '#EF4444'
                            }}>
                              {percentage.toFixed(1)}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                            percentage >= 100 
                              ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300' 
                              : percentage >= 75 
                              ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300'
                              : percentage >= 50
                              ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300'
                              : percentage >= 25
                              ? 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300'
                              : 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300'
                          }`}>
                            {getStatusText(percentage).replace(' 🎉', '')}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Legenda */}
      <div className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">📋</span>
          Legenda do Sistema de Velocímetros
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 mr-3"></div>
              <span className="font-medium text-gray-900">Meta Atingida</span>
            </div>
            <p className="text-sm text-gray-600">100% ou mais da meta alcançada</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 mr-3"></div>
              <span className="font-medium text-gray-900">Bom Progresso</span>
            </div>
            <p className="text-sm text-gray-600">75% a 99% da meta alcançada</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 mr-3"></div>
              <span className="font-medium text-gray-900">No Caminho</span>
            </div>
            <p className="text-sm text-gray-600">50% a 74% da meta alcançada</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 mr-3"></div>
              <span className="font-medium text-gray-900">Atenção</span>
            </div>
            <p className="text-sm text-gray-600">Abaixo de 50% da meta</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente principal ControleInterno atualizado
const ControleInterno = () => {
  const [activeControleInterno, setActiveControleInterno] = useState("metas"); // Inicia no dashboard de metas

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg mr-3">
            📊
          </span>
          Sistema de Gestão de Metas
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Dashboard interativo com velocímetros para acompanhamento de metas por serviço
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação Atualizado */}
        <div className="flex flex-wrap space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveControleInterno("metas")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 mb-2 ${
              activeControleInterno === "metas"
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🎯 Dashboard de Metas
          </button>
          <button
            onClick={() => setActiveControleInterno("dashboard")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 mb-2 ${
              activeControleInterno === "dashboard"
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Controle Interno
          </button>
        </div>

        {/* Dashboard de Metas (agora principal) */}
        {activeControleInterno === "metas" && <DashboardMetas />}

        {/* Dashboard de Controle Interno (opcional) */}
        {activeControleInterno === "dashboard" && (
          <div className="space-y-6">
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Controle Interno</h3>
              <p className="text-gray-600">Módulo de auditoria e conformidade</p>
              <button 
                onClick={() => setActiveControleInterno("metas")}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 font-medium"
              >
                Voltar para Dashboard de Metas
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControleInterno;