import React, { useState } from 'react';

const GPSGeral = () => {
  const [activeGPSGeralForm, setActiveGPSGeralForm] = useState("dashboard");

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-violet-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-violet-500 text-white p-2 rounded-lg mr-3">
            🌐
          </span>
          GPS Geral - Monitoramento Geral da Frota
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Visão consolidada de caminhões, contentores e ativos da frota
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação entre Formulários */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveGPSGeralForm("dashboard")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeGPSGeralForm === "dashboard"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveGPSGeralForm("monitoramento")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeGPSGeralForm === "monitoramento"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🗺️ Monitoramento
          </button>
          <button
            onClick={() => setActiveGPSGeralForm("alertas")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeGPSGeralForm === "alertas"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ⚠️ Alertas
          </button>
          <button
            onClick={() => setActiveGPSGeralForm("graficos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeGPSGeralForm === "graficos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Gráficos
          </button>
          <button
            onClick={() => setActiveGPSGeralForm("relatorios")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeGPSGeralForm === "relatorios"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Relatórios
          </button>
        </div>

        {/* Dashboard Geral */}
        {activeGPSGeralForm === "dashboard" && (
          <div className="space-y-6">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total de Veículos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">48</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">🚛</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    +5% vs mês anterior
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Contentores Ativos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">124</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">📦</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    +12% vs mês anterior
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Em Operação
                    </p>
                    <p className="text-2xl font-bold text-gray-900">38</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">🛣️</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    82% da frota
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Alertas Ativos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">7</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">⚠️</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    3 críticos
                  </span>
                </div>
              </div>
            </div>

            {/* Grid de Informações */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Status da Frota */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Status da Frota
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">
                      Em Movimento
                    </span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                      28
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">
                      Parados
                    </span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                      12
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">
                      Manutenção
                    </span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                      5
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">
                      Offline
                    </span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                      3
                    </span>
                  </div>
                </div>
              </div>

              {/* Distribuição por Tipo */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Distribuição por Tipo
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Caminhões</span>
                    <span className="text-sm font-medium text-gray-900">
                      32
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Contentores
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      124
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Veículos Leves
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      8
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Equipamentos
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      4
                    </span>
                  </div>
                </div>
              </div>

              {/* Alertas Críticos */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Alertas Críticos
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2 p-2 bg-blue-50 rounded-lg">
                    <span className="text-blue-600 mt-0.5">🔴</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Excesso de Velocidade
                      </p>
                      <p className="text-xs text-gray-600">
                        MB-1234 • 120km/h
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-2 bg-blue-50 rounded-lg">
                    <span className="text-blue-600 mt-0.5">🔴</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Temperatura Crítica
                      </p>
                      <p className="text-xs text-gray-600">
                        CONT-028 • -5°C
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-2 bg-blue-50 rounded-lg">
                    <span className="text-blue-600 mt-0.5">⚠️</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Motorista Inativo
                      </p>
                      <p className="text-xs text-gray-600">
                        MB-5678 • 45min
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Atividade Recente */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900">
                  Atividade Recente
                </h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 text-sm font-medium text-gray-700">
                          Ativo
                        </th>
                        <th className="text-left py-3 text-sm font-medium text-gray-700">
                          Tipo
                        </th>
                        <th className="text-left py-3 text-sm font-medium text-gray-700">
                          Status
                        </th>
                        <th className="text-left py-3 text-sm font-medium text-gray-700">
                          Localização
                        </th>
                        <th className="text-left py-3 text-sm font-medium text-gray-700">
                          Última Atualização
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 text-sm font-medium text-gray-900">
                          MB-1234-AB
                        </td>
                        <td className="py-3 text-sm text-gray-600">
                          Caminhão
                        </td>
                        <td className="py-3">
                          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                            Em Movimento
                          </span>
                        </td>
                        <td className="py-3 text-sm text-gray-600">
                          EN1 - Xai-Xai
                        </td>
                        <td className="py-3 text-sm text-gray-600">
                          2 min atrás
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 text-sm font-medium text-gray-900">
                          CONT-001
                        </td>
                        <td className="py-3 text-sm text-gray-600">
                          Contentor
                        </td>
                        <td className="py-3">
                          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                            No Porto
                          </span>
                        </td>
                        <td className="py-3 text-sm text-gray-600">
                          Porto Maputo
                        </td>
                        <td className="py-3 text-sm text-gray-600">
                          5 min atrás
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 text-sm font-medium text-gray-900">
                          MB-5678-CD
                        </td>
                        <td className="py-3 text-sm text-gray-600">
                          Caminhão
                        </td>
                        <td className="py-3">
                          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                            Manutenção
                          </span>
                        </td>
                        <td className="py-3 text-sm text-gray-600">
                          Oficina Matola
                        </td>
                        <td className="py-3 text-sm text-gray-600">
                          1 hora atrás
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 text-sm font-medium text-gray-900">
                          CONT-028
                        </td>
                        <td className="py-3 text-sm text-gray-600">
                          Contentor Reefer
                        </td>
                        <td className="py-3">
                          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                            Em Trânsito
                          </span>
                        </td>
                        <td className="py-3 text-sm text-gray-600">
                          EN6 - Beira
                        </td>
                        <td className="py-3 text-sm text-gray-600">
                          15 min atrás
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Monitoramento Geral */}
        {activeGPSGeralForm === "monitoramento" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-violet-50">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-violet-500 text-white p-2 rounded-lg mr-2">
                      🗺️
                    </span>
                    Mapa Geral de Monitoramento
                  </h3>
                </div>
                <div className="p-6">
                  {/* Mapa Simulado */}
                  <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center border-2 border-dashed border-gray-300 relative">
                    <div className="text-center">
                      <div className="text-6xl mb-4 text-gray-400">🗺️</div>
                      <span className="text-gray-500 font-medium text-lg">
                        Mapa de Monitoramento Geral
                      </span>
                      <p className="text-sm text-gray-400 mt-2">
                        172 ativos monitorados • 86 em operação
                      </p>
                    </div>

                    {/* Marcadores no Mapa */}
                    <div className="absolute top-1/4 left-1/4">
                      <div className="bg-blue-500 text-white p-2 rounded-lg shadow-lg flex items-center">
                        <span className="text-sm">🚛 MB-1234</span>
                      </div>
                    </div>
                    <div className="absolute top-1/3 right-1/3">
                      <div className="bg-blue-500 text-white p-2 rounded-lg shadow-lg flex items-center">
                        <span className="text-sm">📦 CONT-001</span>
                      </div>
                    </div>
                    <div className="absolute bottom-1/4 left-1/3">
                      <div className="bg-blue-500 text-white p-2 rounded-lg shadow-lg flex items-center">
                        <span className="text-sm">🚛 MB-5678</span>
                      </div>
                    </div>
                    <div className="absolute top-1/2 right-1/4">
                      <div className="bg-blue-500 text-white p-2 rounded-lg shadow-lg flex items-center">
                        <span className="text-sm">🚨 ALERTA</span>
                      </div>
                    </div>
                  </div>

                  {/* Controles do Mapa */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Ativo
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-gray-950">
                        <option value="todos">Todos os Ativos</option>
                        <option value="caminhoes">Caminhões</option>
                        <option value="contentores">Contentores</option>
                        <option value="veiculos_leves">
                          Veículos Leves
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-gray-950">
                        <option value="todos">Todos</option>
                        <option value="movimento">Em Movimento</option>
                        <option value="parado">Parados</option>
                        <option value="alerta">Com Alertas</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Região
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-gray-950">
                        <option value="todos">Todas as Regiões</option>
                        <option value="maputo">Maputo</option>
                        <option value="sul">Sul</option>
                        <option value="centro">Centro</option>
                        <option value="norte">Norte</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Atualização
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-gray-950">
                        <option value="tempo_real">Tempo Real</option>
                        <option value="30s">30 Segundos</option>
                        <option value="1min">1 Minuto</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Painel de Controle */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Filtros Rápidos
                </h4>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950">
                    ✅ Apenas em Operação
                  </button>
                  <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950">
                    🚨 Com Alertas Ativos
                  </button>
                  <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950">
                    ⚠️ Em Manutenção
                  </button>
                  <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950">
                    📍 Próximos do Destino
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Estatísticas em Tempo Real
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ativos Online:</span>
                    <span className="font-semibold text-gray-950">165</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Velocidade Média:</span>
                    <span className="font-semibold text-gray-950">
                      68 km/h
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      KM Percorridos (hoje):
                    </span>
                    <span className="font-semibold text-gray-950">
                      8.245 km
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Consumo Médio:</span>
                    <span className="font-semibold text-gray-950">
                      3.2 km/L
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alertas Consolidados */}
        {activeGPSGeralForm === "alertas" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-orange-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-orange-500 text-white p-2 rounded-lg mr-2">
                  ⚠️
                </span>
                Centro de Alertas e Notificações
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Severidade
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950">
                    <option value="todos">Todas</option>
                    <option value="critico">Crítico</option>
                    <option value="alto">Alto</option>
                    <option value="medio">Médio</option>
                    <option value="baixo">Baixo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Ativo
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950">
                    <option value="todos">Todos</option>
                    <option value="caminhao">Caminhões</option>
                    <option value="contentor">Contentores</option>
                    <option value="veiculo">Veículos Leves</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950">
                    <option value="ativos">Ativos</option>
                    <option value="resolvidos">Resolvidos</option>
                    <option value="todos">Todos</option>
                  </select>
                </div>
              </div>

              {/* Lista de Alertas */}
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-500 text-white p-2 rounded-lg">
                        🔴
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          Excesso de Velocidade - 120km/h
                        </p>
                        <p className="text-sm text-gray-600">
                          MB-1234-AB • Caminhão • EN1 - Maputo
                        </p>
                        <p className="text-xs text-blue-600 font-medium">
                          Crítico • Hoje 14:23
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Resolver
                      </button>
                      <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                        Ignorar
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-500 text-white p-2 rounded-lg">
                        🔴
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          Temperatura Crítica - -5°C
                        </p>
                        <p className="text-sm text-gray-600">
                          CONT-028 • Contentor Reefer • EN6 - Beira
                        </p>
                        <p className="text-xs text-blue-600 font-medium">
                          Crítico • Hoje 13:45
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Resolver
                      </button>
                      <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                        Ignorar
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-500 text-white p-2 rounded-lg">
                        ⚠️
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          Motorista Inativo - 45 minutos
                        </p>
                        <p className="text-sm text-gray-600">
                          MB-5678-CD • Caminhão • Beira
                        </p>
                        <p className="text-xs text-blue-600 font-medium">
                          Alto • Hoje 12:30
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Resolver
                      </button>
                      <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                        Ignorar
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-500 text-white p-2 rounded-lg">
                        ℹ️
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          Rota Alterada Sem Autorização
                        </p>
                        <p className="text-sm text-gray-600">
                          MB-9012-EF • Caminhão • Nampula
                        </p>
                        <p className="text-xs text-blue-600 font-medium">
                          Médio • Hoje 11:15
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Resolver
                      </button>
                      <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                        Ignorar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gráficos */}
        {activeGPSGeralForm === "graficos" && (
          <div className="space-y-6 text-gray-950">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-violet-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-violet-500 text-white p-2 rounded-lg mr-2">
                    📈
                  </span>
                  Dashboard Geral - Métricas Consolidadas da Frota
                </h3>
              </div>
              <div className="p-6">
                {/* Grid de Gráficos Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Distribuição por Tipo de Ativo */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-violet-500 mr-2">📊</span>
                      Distribuição por Tipo de Ativo
                    </h4>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center w-full">
                        <div className="flex justify-center mb-4">
                          <div className="relative w-32 h-32">
                            <div
                              className="w-full h-full rounded-full"
                              style={{
                                background:
                                  "conic-gradient(#3b82f6 0% 67%, #06b6d4 67% 89%, #10b981 89% 96%, #f59e0b 96% 100%)",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                            <span>Caminhões (67%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-cyan-500 rounded mr-2"></div>
                            <span>Contentores (22%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                            <span>Veículos (7%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                            <span>Equipamentos (4%)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Status Operacional - Barras Empilhadas */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-blue-500 mr-2">🔄</span>
                      Status Operacional (Últimos 6 Meses)
                    </h4>
                    <div className="h-64 flex items-end justify-between space-x-2">
                      {[
                        {
                          month: "Jan",
                          operacao: 72,
                          manutencao: 15,
                          offline: 8,
                        },
                        {
                          month: "Fev",
                          operacao: 68,
                          manutencao: 18,
                          offline: 9,
                        },
                        {
                          month: "Mar",
                          operacao: 75,
                          manutencao: 12,
                          offline: 6,
                        },
                        {
                          month: "Abr",
                          operacao: 78,
                          manutencao: 10,
                          offline: 5,
                        },
                        {
                          month: "Mai",
                          operacao: 82,
                          manutencao: 8,
                          offline: 4,
                        },
                        {
                          month: "Jun",
                          operacao: 85,
                          manutencao: 7,
                          offline: 3,
                        },
                      ].map((item, index) => {
                        const total =
                          item.operacao + item.manutencao + item.offline;
                        return (
                          <div
                            key={index}
                            className="flex flex-col items-center flex-1 h-full"
                          >
                            <div className="flex flex-col justify-end h-full w-3/4 rounded-t-lg overflow-hidden">
                              {/* Em Operação */}
                              <div
                                className="bg-blue-500 w-full transition-all hover:opacity-80"
                                style={{
                                  height: `${
                                    (item.operacao / total) * 100
                                  }%`,
                                }}
                                title={`Em Operação: ${item.operacao}%`}
                              ></div>
                              {/* Manutenção */}
                              <div
                                className="bg-yellow-500 w-full transition-all hover:opacity-80"
                                style={{
                                  height: `${
                                    (item.manutencao / total) * 100
                                  }%`,
                                }}
                                title={`Manutenção: ${item.manutencao}%`}
                              ></div>
                              {/* Offline */}
                              <div
                                className="bg-red-500 w-full transition-all hover:opacity-80"
                                style={{
                                  height: `${
                                    (item.offline / total) * 100
                                  }%`,
                                }}
                                title={`Offline: ${item.offline}%`}
                              ></div>
                            </div>
                            <span className="text-xs mt-2 font-medium">
                              {item.month}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Legenda */}
                    <div className="flex justify-center space-x-4 mt-4 text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
                        <span>Em Operação</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded mr-1"></div>
                        <span>Manutenção</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
                        <span>Offline</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Segunda Linha de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {/* Gráfico de Eficiência por Região */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-green-500 mr-2">🏆</span>
                      Eficiência por Região
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            regiao: "Maputo",
                            eficiencia: 92,
                            ativos: 45,
                            color: "bg-green-500",
                            percentage: 92,
                          },
                          {
                            regiao: "Sul",
                            eficiencia: 85,
                            ativos: 28,
                            color: "bg-blue-500",
                            percentage: 85,
                          },
                          {
                            regiao: "Centro",
                            eficiencia: 78,
                            ativos: 35,
                            color: "bg-cyan-500",
                            percentage: 78,
                          },
                          {
                            regiao: "Norte",
                            eficiencia: 82,
                            ativos: 22,
                            color: "bg-purple-500",
                            percentage: 82,
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <div
                              className={`w-3 h-3 rounded-full ${item.color} mt-1.5 flex-shrink-0`}
                            ></div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-1">
                                <span className="text-sm font-medium text-gray-900 break-words">
                                  {item.regiao}
                                </span>
                                <span className="text-sm font-bold text-gray-700 ml-2 whitespace-nowrap flex-shrink-0">
                                  {item.eficiencia}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${item.color} transition-all duration-300`}
                                  style={{ width: `${item.percentage}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1 flex justify-between">
                                <span>{item.ativos} ativos</span>
                                <span
                                  className={
                                    item.eficiencia >= 90
                                      ? "text-green-600"
                                      : item.eficiencia >= 80
                                      ? "text-blue-600"
                                      : "text-yellow-600"
                                  }
                                >
                                  {item.eficiencia >= 90
                                    ? "Excelente"
                                    : item.eficiencia >= 80
                                    ? "Bom"
                                    : "Regular"}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Alertas por Severidade */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-red-500 mr-2">⚠️</span>
                      Alertas por Severidade
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            severidade: "Crítico",
                            ocorrencias: 12,
                            color: "bg-red-500",
                            percentage: 35,
                            icon: "🔴",
                          },
                          {
                            severidade: "Alto",
                            ocorrencias: 18,
                            color: "bg-orange-500",
                            percentage: 53,
                            icon: "🟠",
                          },
                          {
                            severidade: "Médio",
                            ocorrencias: 8,
                            color: "bg-yellow-500",
                            percentage: 24,
                            icon: "🟡",
                          },
                          {
                            severidade: "Baixo",
                            ocorrencias: 2,
                            color: "bg-blue-500",
                            percentage: 6,
                            icon: "🔵",
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <span className="text-lg mt-0.5 flex-shrink-0">
                              {item.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-1">
                                <span className="text-sm font-medium text-gray-900 break-words">
                                  {item.severidade}
                                </span>
                                <span className="text-sm text-gray-600 ml-2 whitespace-nowrap flex-shrink-0">
                                  {item.ocorrencias}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${item.color}`}
                                  style={{ width: `${item.percentage}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {item.percentage}% do total
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Performance Mensal */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-cyan-500 mr-2">📈</span>
                      Performance Mensal
                    </h4>
                    <div className="h-48 space-y-4">
                      {[
                        {
                          metrica: "Disponibilidade",
                          valor: 94,
                          color: "bg-green-500",
                          meta: 95,
                        },
                        {
                          metrica: "Eficiência",
                          valor: 87,
                          color: "bg-blue-500",
                          meta: 90,
                        },
                        {
                          metrica: "Pontualidade",
                          valor: 92,
                          color: "bg-cyan-500",
                          meta: 95,
                        },
                        {
                          metrica: "Utilização",
                          valor: 78,
                          color: "bg-purple-500",
                          meta: 85,
                        },
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-medium">
                              {item.metrica}
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-gray-700">
                                {item.valor}%
                              </span>
                              <span
                                className={`text-xs ${
                                  item.valor >= item.meta
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {item.valor >= item.meta ? "✓" : "✗"} Meta:{" "}
                                {item.meta}%
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full ${item.color} transition-all duration-500`}
                              style={{ width: `${item.valor}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Métricas Rápidas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
                    <p className="text-sm text-violet-600 font-medium">
                      Ativos Monitorados
                    </p>
                    <p className="text-2xl font-bold text-gray-900">172</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">
                      Taxa Disponibilidade
                    </p>
                    <p className="text-2xl font-bold text-gray-900">94%</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600 font-medium">
                      Alertas/Mês
                    </p>
                    <p className="text-2xl font-bold text-gray-900">40</p>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                    <p className="text-sm text-cyan-600 font-medium">
                      KM Percorridos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">245K</p>
                  </div>
                </div>

                {/* Filtros */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">
                    Filtros do Dashboard
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Período
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Últimos 30 dias</option>
                        <option>Este Mês</option>
                        <option>Últimos 3 Meses</option>
                        <option>Este Ano</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Ativo
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos</option>
                        <option>Caminhões</option>
                        <option>Contentores</option>
                        <option>Veículos Leves</option>
                        <option>Equipamentos</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Região
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todas</option>
                        <option>Maputo</option>
                        <option>Sul</option>
                        <option>Centro</option>
                        <option>Norte</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos</option>
                        <option>Em Operação</option>
                        <option>Manutenção</option>
                        <option>Offline</option>
                        <option>Com Alertas</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-4">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                      Limpar Filtros
                    </button>
                    <button className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 font-medium">
                      Aplicar Filtros
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Relatórios Consolidados */}
        {activeGPSGeralForm === "relatorios" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-indigo-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-indigo-500 text-white p-2 rounded-lg mr-2">
                  📈
                </span>
                Relatórios Consolidados da Frota
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-blue-600 text-lg mb-2">📊</div>
                  <p className="font-medium text-gray-900">
                    Desempenho Geral
                  </p>
                  <p className="text-sm text-gray-600">
                    Métricas consolidadas
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-green-600 text-lg mb-2">🚛</div>
                  <p className="font-medium text-gray-900">
                    Frota de Caminhões
                  </p>
                  <p className="text-sm text-gray-600">
                    Relatório específico
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-orange-600 text-lg mb-2">📦</div>
                  <p className="font-medium text-gray-900">Contentores</p>
                  <p className="text-sm text-gray-600">
                    Utilização e status
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-red-600 text-lg mb-2">⚠️</div>
                  <p className="font-medium text-gray-900">Alertas</p>
                  <p className="text-sm text-gray-600">
                    Histórico e análise
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-4">
                  Gerar Relatório Personalizado
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Relatório
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                      <option>Relatório Consolidado</option>
                      <option>Desempenho por Tipo</option>
                      <option>Alertas por Período</option>
                      <option>Eficiência Operacional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Inicial
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Final
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    />
                  </div>
                </div>
                <button className="mt-4 px-6 py-2 bg-violet-500 text-white rounded-lg hover:bg-indigo-600 font-medium">
                  Gerar Relatório
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GPSGeral;