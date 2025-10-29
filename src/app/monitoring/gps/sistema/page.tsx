"use client";
import Layout from '@/components/layout/Layout';
import React, { useState } from 'react';

interface ConfiguracaoSistema {
  id: number;
  nome: string;
  valor: string;
  tipo: 'texto' | 'numero' | 'booleano' | 'lista';
  categoria: 'geral' | 'monitoramento' | 'alertas' | 'integracao';
  descricao: string;
  valorPadrao: string;
}

interface AlertaConfig {
  id: number;
  tipo: 'velocidade' | 'ignicao' | 'sinal' | 'bateria' | 'zona';
  descricao: string;
  ativo: boolean;
  limite: number;
  acao: 'notificacao' | 'email' | 'sms' | 'todas';
}

export default function SistemaGPS() {
  const [configuracoes, setConfiguracoes] = useState<ConfiguracaoSistema[]>([
    {
      id: 1,
      nome: 'intervalo_atualizacao',
      valor: '30',
      tipo: 'numero',
      categoria: 'monitoramento',
      descricao: 'Intervalo de atualização em segundos',
      valorPadrao: '30'
    },
    {
      id: 2,
      nome: 'limite_velocidade',
      valor: '80',
      tipo: 'numero',
      categoria: 'alertas',
      descricao: 'Limite de velocidade para alertas (km/h)',
      valorPadrao: '80'
    },
    {
      id: 3,
      nome: 'notificacoes_email',
      valor: 'true',
      tipo: 'booleano',
      categoria: 'alertas',
      descricao: 'Enviar notificações por email',
      valorPadrao: 'true'
    },
    {
      id: 4,
      nome: 'timezone',
      valor: 'Africa/Luanda',
      tipo: 'lista',
      categoria: 'geral',
      descricao: 'Fuso horário do sistema',
      valorPadrao: 'Africa/Luanda'
    }
  ]);

  const [alertas, setAlertas] = useState<AlertaConfig[]>([
    {
      id: 1,
      tipo: 'velocidade',
      descricao: 'Excesso de velocidade',
      ativo: true,
      limite: 80,
      acao: 'todas'
    },
    {
      id: 2,
      tipo: 'ignicao',
      descricao: 'Ignição ligada fora de horário',
      ativo: true,
      limite: 0,
      acao: 'email'
    },
    {
      id: 3,
      tipo: 'bateria',
      descricao: 'Bateria do dispositivo baixa',
      ativo: false,
      limite: 20,
      acao: 'notificacao'
    },
    {
      id: 4,
      tipo: 'sinal',
      descricao: 'Perda de sinal do GPS',
      ativo: true,
      limite: 10,
      acao: 'sms'
    }
  ]);

  const [categoriaAtiva, setCategoriaAtiva] = useState<'geral' | 'monitoramento' | 'alertas' | 'integracao'>('geral');
  const [showModalAlerta, setShowModalAlerta] = useState(false);

  const configuracoesFiltradas = configuracoes.filter(config => config.categoria === categoriaAtiva);

  const handleSalvarConfiguracao = (id: number, novoValor: string) => {
    setConfiguracoes(configuracoes.map(config => 
      config.id === id ? { ...config, valor: novoValor } : config
    ));
    alert('Configuração salva com sucesso!');
  };

  const toggleAlerta = (id: number) => {
    setAlertas(alertas.map(alerta => 
      alerta.id === id ? { ...alerta, ativo: !alerta.ativo } : alerta
    ));
  };

  const getTipoAlertaColor = (tipo: string) => {
    switch (tipo) {
      case 'velocidade': return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'ignicao': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      case 'bateria': return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
      case 'sinal': return 'bg-purple-500/20 text-purple-400 border border-purple-500/30';
      case 'zona': return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  const getAcaoAlertaText = (acao: string) => {
    switch (acao) {
      case 'notificacao': return '🔔 Notificação';
      case 'email': return '📧 Email';
      case 'sms': return '📱 SMS';
      case 'todas': return '📢 Todas';
      default: return acao;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'Instável': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      case 'Offline': return 'bg-red-500/20 text-red-400 border border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  const estatisticasSistema = {
    dispositivosAtivos: 12,
    dispositivosTotal: 15,
    alertasHoje: 8,
    uptime: '99.8%',
    storageUsado: '2.3GB',
    storageTotal: '10GB'
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-white truncate">⚙️ Sistema GPS</h1>
              <p className="text-gray-400 truncate">Gestão do sistema de monitoramento</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-3 space-y-6">
            {/* Estatísticas do Sistema */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 min-w-0">
                <div className="flex items-center">
                  <div className="p-3 bg-green-500/20 rounded-lg shadow-sm flex-shrink-0">
                    <span className="text-2xl text-green-400">📱</span>
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className="text-sm font-medium text-gray-400 truncate">Dispositivos Ativos</p>
                    <p className="text-2xl font-bold text-white truncate">
                      {estatisticasSistema.dispositivosAtivos}/{estatisticasSistema.dispositivosTotal}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-blue-500/20 min-w-0">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-500/20 rounded-lg shadow-sm flex-shrink-0">
                    <span className="text-2xl text-blue-400">⏱️</span>
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className="text-sm font-medium text-gray-400 truncate">Uptime</p>
                    <p className="text-2xl font-bold text-white truncate">{estatisticasSistema.uptime}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-yellow-500/20 min-w-0">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-500/20 rounded-lg shadow-sm flex-shrink-0">
                    <span className="text-2xl text-yellow-400">🚨</span>
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className="text-sm font-medium text-gray-400 truncate">Alertas Hoje</p>
                    <p className="text-2xl font-bold text-white truncate">{estatisticasSistema.alertasHoje}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-green-500/20 min-w-0">
                <div className="flex items-center">
                  <div className="p-3 bg-green-500/20 rounded-lg shadow-sm flex-shrink-0">
                    <span className="text-2xl text-green-400">👥</span>
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className="text-sm font-medium text-gray-400 truncate">Usuários Online</p>
                    <p className="text-2xl font-bold text-white truncate">3</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-500/20 min-w-0">
                <div className="flex items-center">
                  <div className="p-3 bg-gray-500/20 rounded-lg shadow-sm flex-shrink-0">
                    <span className="text-2xl text-gray-400">🔧</span>
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className="text-sm font-medium text-gray-400 truncate">Versão</p>
                    <p className="text-2xl font-bold text-white truncate">v2.1.4</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Configurações do Sistema */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {(['geral', 'monitoramento', 'alertas', 'integracao'] as const).map(categoria => (
                    <button
                      key={categoria}
                      onClick={() => setCategoriaAtiva(categoria)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                        categoriaAtiva === categoria
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                      }`}
                    >
                      {categoria === 'geral' ? '⚙️ Geral' :
                       categoria === 'monitoramento' ? '📊 Monitoramento' :
                       categoria === 'alertas' ? '🚨 Alertas' : '🔗 Integração'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {categoriaAtiva === 'geral' ? '⚙️ Configurações Gerais' :
                   categoriaAtiva === 'monitoramento' ? '📊 Configurações de Monitoramento' :
                   categoriaAtiva === 'alertas' ? '🚨 Configurações de Alertas' : '🔗 Configurações de Integração'}
                </h3>
                
                <div className="space-y-4">
                  {configuracoesFiltradas.map((config) => (
                    <div key={config.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-700/50 backdrop-blur-sm min-w-0">
                      <div className="flex-1 mb-3 sm:mb-0 sm:mr-4 min-w-0">
                        <h4 className="font-medium text-white truncate">{config.nome}</h4>
                        <p className="text-sm text-gray-400 truncate">{config.descricao}</p>
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          Valor padrão: {config.valorPadrao}
                        </p>
                      </div>
                      
                      <div className="flex-shrink-0 min-w-0">
                        {config.tipo === 'booleano' ? (
                          <select
                            value={config.valor}
                            onChange={(e) => handleSalvarConfiguracao(config.id, e.target.value)}
                            className="bg-gray-600 border border-gray-500 text-white rounded px-3 py-1 text-sm min-w-[120px]"
                          >
                            <option value="true">✅ Ativo</option>
                            <option value="false">❌ Inativo</option>
                          </select>
                        ) : config.tipo === 'lista' ? (
                          <select
                            value={config.valor}
                            onChange={(e) => handleSalvarConfiguracao(config.id, e.target.value)}
                            className="bg-gray-600 border border-gray-500 text-white rounded px-3 py-1 text-sm min-w-[140px]"
                          >
                            <option value="Africa/Luanda">Africa/Luanda</option>
                            <option value="UTC">UTC</option>
                            <option value="Europe/Lisbon">Europe/Lisbon</option>
                          </select>
                        ) : (
                          <input
                            type={config.tipo === 'numero' ? 'number' : 'text'}
                            value={config.valor}
                            onChange={(e) => handleSalvarConfiguracao(config.id, e.target.value)}
                            className="bg-gray-600 border border-gray-500 text-white rounded px-3 py-1 text-sm w-32"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {configuracoesFiltradas.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    Nenhuma configuração encontrada para esta categoria.
                  </div>
                )}
              </div>
            </div>

            {/* Ações do Sistema */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">⚡ Ações do Sistema</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button className="bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-all shadow-sm flex items-center justify-center">
                  <span className="mr-2">💾</span>
                  Backup
                </button>
                <button className="bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 transition-all shadow-sm flex items-center justify-center">
                  <span className="mr-2">🔄</span>
                  Restaurar
                </button>
                <button className="bg-yellow-600 text-white py-2 px-3 rounded text-sm hover:bg-yellow-700 transition-all shadow-sm flex items-center justify-center">
                  <span className="mr-2">📋</span>
                  Logs
                </button>
                <button className="bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700 transition-all shadow-sm flex items-center justify-center">
                  <span className="mr-2">🔄</span>
                  Reiniciar
                </button>
              </div>
            </div>
          </div>

          {/* Painel Lateral */}
          <div className="lg:col-span-1 space-y-6">
            {/* Configurações de Alertas */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white truncate">🚨 Alertas Configurados</h3>
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-3">
                  {alertas.map((alerta) => (
                    <div key={alerta.id} className="p-3 border border-gray-600 rounded-lg bg-gray-700/50 hover:bg-gray-700/70 transition-all min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getTipoAlertaColor(alerta.tipo)} whitespace-nowrap truncate`}>
                          {alerta.descricao}
                        </span>
                        <div className="flex items-center flex-shrink-0 ml-2">
                          <input
                            type="checkbox"
                            checked={alerta.ativo}
                            onChange={() => toggleAlerta(alerta.id)}
                            className="mr-2 h-4 w-4 text-blue-600 bg-gray-600 border-gray-500 rounded"
                          />
                          <span className="text-sm text-gray-300 whitespace-nowrap">
                            {alerta.ativo ? '✅' : '❌'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-400 truncate">
                        {alerta.tipo === 'velocidade' && `Limite: ${alerta.limite} km/h`}
                        {alerta.tipo === 'bateria' && `Limite: ${alerta.limite}%`}
                        {alerta.tipo === 'sinal' && `Timeout: ${alerta.limite} min`}
                      </div>
                      
                      <div className="text-xs text-gray-500 mt-1 truncate">
                        {getAcaoAlertaText(alerta.acao)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status do Serviço */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">📊 Status do Serviço</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center min-w-0">
                  <span className="text-sm text-gray-300 truncate">Servidor GPS</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor('Online')} whitespace-nowrap flex-shrink-0 ml-2`}>
                    Online
                  </span>
                </div>
                <div className="flex justify-between items-center min-w-0">
                  <span className="text-sm text-gray-300 truncate">Banco de Dados</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor('Online')} whitespace-nowrap flex-shrink-0 ml-2`}>
                    Online
                  </span>
                </div>
                <div className="flex justify-between items-center min-w-0">
                  <span className="text-sm text-gray-300 truncate">Serviço de Email</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor('Instável')} whitespace-nowrap flex-shrink-0 ml-2`}>
                    Instável
                  </span>
                </div>
                <div className="flex justify-between items-center min-w-0">
                  <span className="text-sm text-gray-300 truncate">API Externa</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor('Online')} whitespace-nowrap flex-shrink-0 ml-2`}>
                    Online
                  </span>
                </div>
              </div>
            </div>

            {/* Informações Técnicas */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">ℹ️ Informações Técnicas</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between min-w-0">
                  <span className="text-gray-400 truncate">Versão do Software:</span>
                  <span className="text-white whitespace-nowrap flex-shrink-0 ml-2">v2.1.4</span>
                </div>
                <div className="flex justify-between min-w-0">
                  <span className="text-gray-400 truncate">Última Atualização:</span>
                  <span className="text-white whitespace-nowrap flex-shrink-0 ml-2">15/01/2024</span>
                </div>
                <div className="flex justify-between min-w-0">
                  <span className="text-gray-400 truncate">Próxima Manutenção:</span>
                  <span className="text-white whitespace-nowrap flex-shrink-0 ml-2">01/02/2024</span>
                </div>
                <div className="flex justify-between min-w-0">
                  <span className="text-gray-400 truncate">Suporte Técnico:</span>
                  <span className="text-blue-400 whitespace-nowrap flex-shrink-0 ml-2 text-xs">suporte@empresa.co.ao</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Novo Alerta */}
      {showModalAlerta && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white flex items-center">
                <span className="mr-2">➕</span>
                Configurar Novo Alerta
              </h3>
              <button
                onClick={() => setShowModalAlerta(false)}
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>
            <div className="space-y-4">
              <div className="min-w-0">
                <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Alerta</label>
                <select className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="velocidade">🚗 Excesso de Velocidade</option>
                  <option value="ignicao">🔑 Ignição Fora de Horário</option>
                  <option value="bateria">🔋 Bateria Baixa</option>
                  <option value="sinal">📡 Perda de Sinal</option>
                  <option value="zona">📍 Saída de Zona</option>
                </select>
              </div>
              <div className="min-w-0">
                <label className="block text-sm font-medium text-gray-300 mb-2">Limite/Configuração</label>
                <input
                  type="number"
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: 80 para velocidade"
                />
              </div>
              <div className="min-w-0">
                <label className="block text-sm font-medium text-gray-300 mb-2">Ação</label>
                <select className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="notificacao">🔔 Apenas Notificação</option>
                  <option value="email">📧 Enviar Email</option>
                  <option value="sms">📱 Enviar SMS</option>
                  <option value="todas">📢 Todas as Ações</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                <button
                  onClick={() => setShowModalAlerta(false)}
                  className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all shadow-sm">
                  Salvar Alerta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </Layout>
    
  );
}