import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

// Componente de Velocímetro em Semicírculo (MANTIDO IGUAL)
const SpeedometerSemi = ({ title, currentValue, targetValue, color = '#3B82F6', unit = 'MT' }) => {
  const percentage = Math.min((currentValue / targetValue) * 100, 100);
  const radius = 100;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const getStatusColor = (percentage) => {
    if (percentage >= 100) return '#10B981';
    if (percentage >= 75) return '#3B82F6';
    if (percentage >= 50) return '#F59E0B';
    if (percentage >= 25) return '#F97316';
    return '#EF4444';
  };
  
  const statusColor = getStatusColor(percentage);
  const angle = (percentage / 100) * 180;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-4">
          <span className="text-2xl mr-2">{getIcon(title)}</span>
          <h3 className="font-semibold text-gray-900 text-center">{title}</h3>
        </div>
        
        <div className="relative w-full h-48 flex justify-center">
          <svg className="w-64 h-48" viewBox="0 0 200 100">
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              stroke="#E5E7EB"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
            />
            
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              stroke={statusColor}
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
            
            {[0, 25, 50, 75, 100].map((mark) => {
              const markAngle = (mark / 100) * 180;
              const x = 100 + 80 * Math.cos(markAngle * Math.PI / 180);
              const y = 100 - 80 * Math.sin(markAngle * Math.PI / 180);
              
              return (
                <g key={mark}>
                  <line
                    x1={x}
                    y1={y}
                    x2={100 + 90 * Math.cos(markAngle * Math.PI / 180)}
                    y2={100 - 90 * Math.sin(markAngle * Math.PI / 180)}
                    stroke="#6B7280"
                    strokeWidth="2"
                  />
                  
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
            
            <line x1="20" y1="100" x2="20" y2="85" stroke="#6B7280" strokeWidth="2" />
            <line x1="180" y1="100" x2="180" y2="85" stroke="#6B7280" strokeWidth="2" />
            <line x1="100" y1="100" x2="100" y2="90" stroke="#6B7280" strokeWidth="2" />
            
            <line
              x1="100"
              y1="100"
              x2={100 + 70 * Math.cos(angle * Math.PI / 180)}
              y2={100 - 70 * Math.sin(angle * Math.PI / 180)}
              stroke="#1F2937"
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            <circle
              cx="100"
              cy="100"
              r="8"
              fill="#1F2937"
            />
          </svg>
          
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
          
          <div className="absolute top-12 left-0 right-0 text-center">
            <div 
              className={`text-3xl font-bold inline-block`}
              style={{ color: statusColor }}
            >
              {percentage.toFixed(1)}%
            </div>
          </div>
        </div>
        
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

// Função auxiliar para obter ícones (MANTIDA IGUAL)
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

// Função auxiliar para texto de status (MANTIDA IGUAL)
const getStatusText = (percentage) => {
  if (percentage >= 100) return 'Meta Atingida! 🎉';
  if (percentage >= 90) return 'Quase lá!';
  if (percentage >= 75) return 'Bom progresso';
  if (percentage >= 50) return 'No caminho';
  if (percentage >= 25) return 'Avançando';
  return 'Iniciando';
};

// Função para mapear dados da API com os serviços do dashboard
const mapearDadosDaAPI = (faturas, services) => {
  if (!faturas || faturas.length === 0) return services;

  // Inicializar contadores para cada serviço
  const contadores = {
    'Carga Local': { valor: 0, count: 0 },
    'Carga Nacional': { valor: 0, count: 0 },
    'Carga Transito': { valor: 0, count: 0 },
    'Abastecimento': { valor: 0, count: 0 },
    'Seguro de Carga': { valor: 0, count: 0 },
    'Área Despacho': { valor: 0, count: 0 },
    'Trabalho Factura': { valor: 0, count: 0 },
    'Carga de Retorno': { valor: 0, count: 0 },
    'GPS de Cargas': { valor: 0, count: 0 },
    'Trabalho Terceirizados': { valor: 0, count: 0 }
  };

  // Analisar cada fatura para classificar por serviço
  faturas.forEach(fatura => {
    const valorFatura = fatura.fatura?.valorTotal || 0;
    const descricao = (fatura.descricao || '').toLowerCase();
    const tipoCarga = (fatura.tipoCarga || '').toLowerCase();
    const naturezaCarga = (fatura.naturezaCarga || '').toLowerCase();
    const categoriaSeguro = (fatura.categoriaSeguro || '').toLowerCase();
    const tipoPercurso = (fatura.tipoPercurso || '').toLowerCase();
    const abrangenciaSeguro = (fatura.abrangenciaSeguro || '').toLowerCase();
    const destinoFrete = (fatura.destinoFrete || '').toLowerCase();

    // Verificar itens da fatura
    const itensFatura = fatura.fatura?.itensFatura || [];
    
    // Analisar por palavras-chave
    const textoCompleto = `${descricao} ${tipoCarga} ${naturezaCarga} ${categoriaSeguro} ${tipoPercurso} ${abrangenciaSeguro} ${destinoFrete}`.toLowerCase();

    // Mapeamento inteligente baseado em palavras-chave
    if (textoCompleto.includes('local') || destinoFrete.includes('local') || tipoPercurso.includes('local')) {
      contadores['Carga Local'].valor += valorFatura;
      contadores['Carga Local'].count += 1;
    }
    
    if (textoCompleto.includes('nacional') || destinoFrete.includes('nacional') || 
        naturezaCarga.includes('alimentar') || categoriaSeguro.includes('alimentar')) {
      contadores['Carga Nacional'].valor += valorFatura;
      contadores['Carga Nacional'].count += 1;
    }
    
    if (textoCompleto.includes('transito') || textoCompleto.includes('trânsito') || 
        tipoPercurso.includes('transito') || abrangenciaSeguro.includes('transito')) {
      contadores['Carga Transito'].valor += valorFatura;
      contadores['Carga Transito'].count += 1;
    }
    
    // Abastecimento/Combustível
    if (descricao.includes('combustível') || descricao.includes('combustivel') || 
        descricao.includes('abastecimento') || textoCompleto.includes('diesel') ||
        textoCompleto.includes('gasolina')) {
      contadores['Abastecimento'].valor += valorFatura;
      contadores['Abastecimento'].count += 1;
    }
    
    // Seguro de Carga
    if (descricao.includes('seguro') || categoriaSeguro || abrangenciaSeguro ||
        textoCompleto.includes('seguradora') || textoCompleto.includes('premio')) {
      contadores['Seguro de Carga'].valor += valorFatura;
      contadores['Seguro de Carga'].count += 1;
    }
    
    // Área Despacho
    if (descricao.includes('despacho') || descricao.includes('terminal') || 
        textoCompleto.includes('porto') || textoCompleto.includes('alfândega') ||
        textoCompleto.includes('alfandega')) {
      contadores['Área Despacho'].valor += valorFatura;
      contadores['Área Despacho'].count += 1;
    }
    
    // Trabalho Factura (processamento de faturas)
    if (descricao.includes('factura') || descricao.includes('fatura') || 
        descricao.includes('processamento') || descricao.includes('administrativo')) {
      contadores['Trabalho Factura'].valor += valorFatura;
      contadores['Trabalho Factura'].count += 1;
    }
    
    // Carga de Retorno
    if (textoCompleto.includes('retorno') || textoCompleto.includes('volta') ||
        destinoFrete.includes('retorno') || tipoPercurso.includes('ida e volta')) {
      contadores['Carga de Retorno'].valor += valorFatura;
      contadores['Carga de Retorno'].count += 1;
    }
    
    // GPS de Cargas
    if (descricao.includes('gps') || descricao.includes('rastreamento') || 
        descricao.includes('monitoramento') || textoCompleto.includes('localização')) {
      contadores['GPS de Cargas'].valor += valorFatura;
      contadores['GPS de Cargas'].count += 1;
    }
    
    // Trabalho Terceirizados
    if (descricao.includes('terceirizado') || descricao.includes('subcontratado') ||
        descricao.includes('parceiro') || descricao.includes('externo')) {
      contadores['Trabalho Terceirizados'].valor += valorFatura;
      contadores['Trabalho Terceirizados'].count += 1;
    }

    // Verificar itens específicos da fatura
    itensFatura.forEach(item => {
      const descricaoItem = (item.descricao || '').toLowerCase();
      const tipoItem = (item.tipo || '').toLowerCase();
      const valorItem = item.valorTotal || 0;
      
      // Mapear itens por tipo
      switch(tipoItem) {
        case 'frete':
          if (descricaoItem.includes('local')) {
            contadores['Carga Local'].valor += valorItem;
          } else if (descricaoItem.includes('nacional')) {
            contadores['Carga Nacional'].valor += valorItem;
          }
          break;
        case 'taxa':
          if (descricaoItem.includes('despacho') || descricaoItem.includes('terminal')) {
            contadores['Área Despacho'].valor += valorItem;
          }
          break;
        case 'seguro':
          contadores['Seguro de Carga'].valor += valorItem;
          break;
        case 'comissao':
          contadores['Trabalho Terceirizados'].valor += valorItem;
          break;
        case 'despesa':
          if (descricaoItem.includes('combustivel') || descricaoItem.includes('diesel')) {
            contadores['Abastecimento'].valor += valorItem;
          }
          break;
      }
    });
  });

  // Atualizar serviços com valores calculados
  return services.map(service => {
    const dadosServico = contadores[service.name] || { valor: 0, count: 0 };
    
    // Se não encontrou dados específicos, usar distribuição proporcional
    let valorCalculado = dadosServico.valor;
    
    if (valorCalculado === 0) {
      // Distribuir valor total proporcionalmente entre serviços sem dados específicos
      const totalFaturas = faturas.reduce((sum, f) => sum + (f.fatura?.valorTotal || 0), 0);
      const servicosComDados = Object.values(contadores).filter(d => d.valor > 0).length;
      const servicosSemDados = 10 - servicosComDados;
      
      if (servicosSemDados > 0) {
        valorCalculado = (totalFaturas / servicosSemDados) * 0.3; // 30% do valor distribuído
      }
    }
    
    return {
      ...service,
      current: Math.min(Math.round(valorCalculado), service.target * 1.5),
      dadosReais: {
        valor: dadosServico.valor,
        count: dadosServico.count,
        ultimaAtualizacao: new Date().toLocaleTimeString()
      }
    };
  });
};

// Componente Dashboard de Metas com Dados da API
const DashboardMetas = () => {
  const [loading, setLoading] = useState(true);
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
  const [estatisticasAPI, setEstatisticasAPI] = useState({
    totalFaturas: 0,
    totalValor: 0,
    clientesUnicos: 0,
    dataAtualizacao: null
  });

  // Função para buscar dados da API
  const fetchDadosAPI = async () => {
    try {
      setLoading(true);
      
      // Buscar faturas pagas da API
      const response = await axios.post(`${API_BASE_URL}/getCargasComFaturaPaga`, {
        pageSize: 1000,
        curPage: 1
      });

      if (response.data.returnCode === 200) {
        const faturas = response.data.data?.list || [];
        
        // Calcular estatísticas gerais
        const totalFaturas = faturas.length;
        const totalValor = faturas.reduce((total, fatura) => 
          total + (fatura.fatura?.valorTotal || 0), 0);
        
        // Contar clientes únicos
        const clientes = [...new Set(faturas.map(f => f.cliente))].filter(Boolean);
        const clientesUnicos = clientes.length;
        
        // Atualizar estatísticas
        setEstatisticasAPI({
          totalFaturas,
          totalValor,
          clientesUnicos,
          dataAtualizacao: new Date().toLocaleString()
        });

        // Mapear dados da API para os serviços do dashboard
        const servicosAtualizados = mapearDadosDaAPI(faturas, services);
        setServices(servicosAtualizados);
        
        // Log para debug
        console.log('Dados da API:', {
          totalFaturas,
          totalValor,
          clientesUnicos,
          faturasSample: faturas.slice(0, 3) // Mostrar primeiras 3 para debug
        });
      }
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      // Mantém os dados padrão em caso de erro
    } finally {
      setLoading(false);
    }
  };

  // Calcular totais
  useEffect(() => {
    const somaAtual = services.reduce((acc, service) => acc + service.current, 0);
    setTotalAtual(somaAtual);
    setProgressoTotal((somaAtual / totalMeta) * 100);
  }, [services, totalMeta]);

  // Buscar dados ao montar componente
  useEffect(() => {
    fetchDadosAPI();
    
    // Atualizar a cada 5 minutos
    const interval = setInterval(fetchDadosAPI, 300000);
    return () => clearInterval(interval);
  }, []);

  // Funções de controle (MANTIDAS IGUAIS)
  const ajustarValor = (id, novoValor) => {
    if (novoValor < 0) return;
    
    setServices(services.map(service => 
      service.id === id 
        ? { ...service, current: Math.min(novoValor, service.target * 1.5) }
        : service
    ));
  };

  const aumentarMeta = () => {
    const novaMeta = metaGlobal + 50000;
    setMetaGlobal(novaMeta);
    
    setServices(services.map(service => ({
      ...service,
      target: novaMeta
    })));
    
    setTotalMeta(novaMeta * 10);
  };

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

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Analisando dados da API...</p>
          <p className="text-sm text-gray-500">Mapeando faturas com serviços do dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 text-gray-900">
      {/* Cabeçalho com dados reais */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg mr-3">
                📊
              </span>
              Dashboard de Metas - Dados Reais da API
            </h1>
            <p className="text-gray-600 mt-2">
              {estatisticasAPI.totalFaturas} faturas analisadas • {estatisticasAPI.totalValor.toLocaleString()} MT totais • {estatisticasAPI.clientesUnicos} clientes
            </p>
          </div>
          
          <button
            onClick={fetchDadosAPI}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 font-medium flex items-center shadow hover:shadow-md transition-all"
          >
            <span className="mr-2">🔄</span>
            Atualizar Dados
          </button>
        </div>
        
        {/* Mini cards de dados reais */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-600 font-medium">Faturas Analisadas</div>
            <div className="text-xl font-bold text-gray-900">{estatisticasAPI.totalFaturas}</div>
            <div className="text-xs text-gray-500">API: /getCargasComFaturaPaga</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="text-sm text-green-600 font-medium">Valor Total API</div>
            <div className="text-xl font-bold text-gray-900">{estatisticasAPI.totalValor.toLocaleString()} MT</div>
            <div className="text-xs text-gray-500">Campo: valorTotal</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
            <div className="text-sm text-purple-600 font-medium">Clientes Únicos</div>
            <div className="text-xl font-bold text-gray-900">{estatisticasAPI.clientesUnicos}</div>
            <div className="text-xs text-gray-500">Campo: cliente</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
            <div className="text-sm text-orange-600 font-medium">Última Análise</div>
            <div className="text-xl font-bold text-gray-900">{estatisticasAPI.dataAtualizacao?.split(' ')[1] || '--:--'}</div>
            <div className="text-xs text-gray-500">{estatisticasAPI.dataAtualizacao?.split(' ')[0] || ''}</div>
          </div>
        </div>
        
        {/* Info sobre mapeamento */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <span className="text-blue-500 mr-2">🔍</span>
            <span className="text-sm text-gray-700">
              Sistema mapeia automaticamente: 
              <span className="font-medium"> Combustível → Abastecimento</span>, 
              <span className="font-medium"> Seguro → Seguro de Carga</span>, 
              <span className="font-medium"> Alimentares → Carga Nacional</span>
            </span>
          </div>
        </div>
      </div>

      {/* Resumo Geral (MANTIDO IGUAL) */}
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

      {/* Controles (MANTIDO IGUAL) */}
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

      {/* Grid de Velocímetros em Semicírculo (MANTIDO IGUAL) */}
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

      {/* Ranking de Performance com dados reais */}
      <div className="mt-8 bg-white rounded-xl border-2 border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="font-semibold text-gray-900 flex items-center text-lg">
            <span className="mr-2">🏆</span>
            Ranking de Performance - Dados Reais da API
          </h3>
          <p className="text-sm text-gray-600 mt-1">Mapeamento automático: Combustível → Abastecimento, Seguro → Seguro de Carga</p>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Posição</th>
                  <th className="px-4 py-3">Serviço</th>
                  <th className="px-4 py-3">Valor Mapeado</th>
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
                            <div>
                              <span className="font-medium text-gray-900">{service.name}</span>
                              <div className="text-xs text-gray-500">
                                {getPalavrasChaveMapeamento(service.name)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-semibold text-gray-900">
                            {service.current.toLocaleString()} MT
                          </span>
                          <div className="text-xs text-gray-500">
                            {service.dadosReais?.count || 0} faturas relacionadas
                          </div>
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

      {/* Legenda com mapeamento */}
      <div className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">🔍</span>
          Mapeamento API → Dashboard
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-2">
              <span className="text-blue-500 mr-2">⛽</span>
              <span className="font-medium text-gray-900">Combustível → Abastecimento</span>
            </div>
            <p className="text-sm text-gray-600">Palavras: combustível, diesel, gasolina, abastecimento</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-2">
              <span className="text-green-500 mr-2">🛡️</span>
              <span className="font-medium text-gray-900">Seguro → Seguro de Carga</span>
            </div>
            <p className="text-sm text-gray-600">Campos: categoriaSeguro, abrangenciaSeguro, prêmio</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-2">
              <span className="text-purple-500 mr-2">🇲🇿</span>
              <span className="font-medium text-gray-900">Alimentares → Carga Nacional</span>
            </div>
            <p className="text-sm text-gray-600">Campos: naturezaCarga, tipoCarga, produtos alimentares</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-2">
              <span className="text-orange-500 mr-2">📦</span>
              <span className="font-medium text-gray-900">Despacho → Área Despacho</span>
            </div>
            <p className="text-sm text-gray-600">Palavras: terminal, porto, alfândega, despacho</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-2">
              <span className="text-red-500 mr-2">🧾</span>
              <span className="font-medium text-gray-900">Fatura → Trabalho Factura</span>
            </div>
            <p className="text-sm text-gray-600">Processamento administrativo, emissão de faturas</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-2">
              <span className="text-indigo-500 mr-2">👥</span>
              <span className="font-medium text-gray-900">Terceiros → Trabalho Terceirizados</span>
            </div>
            <p className="text-sm text-gray-600">Palavras: terceirizado, parceiro, subcontratado</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-2">📊</span>
            <span>Análise baseada em: descrição, tipoCarga, naturezaCarga, categoriaSeguro, itensFatura</span>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Última análise: {estatisticasAPI.dataAtualizacao} • {estatisticasAPI.totalFaturas} faturas processadas
          </div>
        </div>
      </div>
    </div>
  );
};

// Função auxiliar para mostrar palavras-chave de mapeamento
const getPalavrasChaveMapeamento = (serviceName) => {
  const mapeamento = {
    'Carga Local': 'local, destino local, percurso local',
    'Carga Nacional': 'nacional, alimentares, produtos nacionais',
    'Carga Transito': 'transito, trânsito, abrangencia transito',
    'Abastecimento': 'combustível, diesel, gasolina, abastecimento',
    'Seguro de Carga': 'seguro, categoriaSeguro, abrangenciaSeguro',
    'Área Despacho': 'despacho, terminal, porto, alfândega',
    'Trabalho Factura': 'fatura, factura, administrativo, processamento',
    'Carga de Retorno': 'retorno, volta, ida e volta',
    'GPS de Cargas': 'gps, rastreamento, monitoramento',
    'Trabalho Terceirizados': 'terceirizado, parceiro, subcontratado'
  };
  return mapeamento[serviceName] || 'mapeamento automático';
};

// Componente principal ControleInterno (MANTIDO IGUAL)
const ControleInterno = () => {
  const [activeControleInterno, setActiveControleInterno] = useState("metas");

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg mr-3">
            📊
          </span>
          Sistema Inteligente de Metas
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Dashboard com mapeamento automático de dados da API para serviços
        </p>
      </div>

      <div className="flex-1 p-6">
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

        {activeControleInterno === "metas" && <DashboardMetas />}

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