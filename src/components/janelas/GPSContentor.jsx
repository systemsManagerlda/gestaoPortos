import React, { useState } from 'react';

const GPSContentor = () => {
  const [activeContentorForm, setActiveContentorForm] = useState("rastreamento");

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-cyan-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-cyan-500 text-white p-2 rounded-lg mr-3">
            📦
          </span>
          GPS Contentor - Rastreamento de Contentores
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Monitoramento em tempo real, localização e gestão de contentores
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação entre Formulários */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveContentorForm("rastreamento")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContentorForm === "rastreamento"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🗺️ Rastreamento
          </button>
          <button
            onClick={() => setActiveContentorForm("contentores")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContentorForm === "contentores"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📋 Contentores
          </button>
          <button
            onClick={() => setActiveContentorForm("movimentacao")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContentorForm === "movimentacao"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🚢 Movimentação
          </button>
          <button
            onClick={() => setActiveContentorForm("graficos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContentorForm === "graficos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Gráficos
          </button>

          <button
            onClick={() => setActiveContentorForm("relatorios")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContentorForm === "relatorios"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Relatórios
          </button>
        </div>

        {/* Rastreamento em Tempo Real */}
        {activeContentorForm === "rastreamento" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-cyan-50">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-cyan-500 text-white p-2 rounded-lg mr-2">
                      🗺️
                    </span>
                    Mapa de Rastreamento - Contentores
                  </h3>
                </div>
                <div className="p-6">
                  {/* Mapa Simulado */}
                  <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center border-2 border-dashed border-gray-300 relative">
                    <div className="text-center">
                      <div className="text-6xl mb-4 text-gray-400">🗺️</div>
                      <span className="text-gray-500 font-medium text-lg">
                        Mapa de Rastreamento - Contentores
                      </span>
                      <p className="text-sm text-gray-400 mt-2">
                        45 contentores ativos • 12 em trânsito
                      </p>
                    </div>

                    {/* Marcadores de Contentores no Mapa */}
                    <div className="absolute top-1/4 left-1/4">
                      <div className="bg-blue-500 text-white p-2 rounded-lg shadow-lg flex items-center">
                        <span className="text-sm">📦 CONT-001</span>
                      </div>
                    </div>
                    <div className="absolute top-1/3 right-1/3">
                      <div className="bg-blue-500 text-white p-2 rounded-lg shadow-lg flex items-center">
                        <span className="text-sm">📦 CONT-015</span>
                      </div>
                    </div>
                    <div className="absolute bottom-1/4 left-1/3">
                      <div className="bg-blue-500 text-white p-2 rounded-lg shadow-lg flex items-center">
                        <span className="text-sm">📦 CONT-028</span>
                      </div>
                    </div>
                    <div className="absolute top-1/2 right-1/4">
                      <div className="bg-blue-500 text-white p-2 rounded-lg shadow-lg flex items-center">
                        <span className="text-sm">📦 CONT-042</span>
                      </div>
                    </div>
                  </div>

                  {/* Controles do Mapa */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Filtrar por Status
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-950">
                        <option value="todos">Todos os Contentores</option>
                        <option value="porto">No Porto</option>
                        <option value="transito">Em Trânsito</option>
                        <option value="cliente">No Cliente</option>
                        <option value="vazio">Vazios</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Filtrar por Tipo
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-950">
                        <option value="todos">Todos os Tipos</option>
                        <option value="20ft">20ft</option>
                        <option value="40ft">40ft</option>
                        <option value="reefer">Reefer</option>
                        <option value="tanque">Tanque</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Atualização
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-950">
                        <option value="tempo_real">Tempo Real</option>
                        <option value="30s">30 Segundos</option>
                        <option value="1min">1 Minuto</option>
                        <option value="5min">5 Minutos</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Painel de Status */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Status dos Contentores
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200 text-gray-950">
                    <span className="text-sm font-medium">Em Trânsito</span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                      12
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200 text-gray-950">
                    <span className="text-sm font-medium">No Porto</span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                      18
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200 text-gray-950">
                    <span className="text-sm font-medium">No Cliente</span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                      10
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-950">
                    <span className="text-sm font-medium">Vazios</span>
                    <span className="bg-gray-500 text-white px-2 py-1 rounded text-sm font-bold">
                      5
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Alertas Ativos
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2 p-2 bg-red-50 rounded-lg">
                    <span className="text-red-600 mt-0.5">🔴</span>
                    <div>
                      <p className="text-sm font-medium text-gray-950">
                        Temperatura Crítica
                      </p>
                      <p className="text-xs text-gray-600">
                        CONT-028 • -5°C
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-2 bg-yellow-50 rounded-lg">
                    <span className="text-yellow-600 mt-0.5">⚠️</span>
                    <div>
                      <p className="text-sm font-medium text-gray-950">
                        Porta Aberta
                      </p>
                      <p className="text-xs text-gray-600">
                        CONT-015 • Porto Maputo
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-2 bg-blue-50 rounded-lg">
                    <span className="text-blue-600 mt-0.5">ℹ️</span>
                    <div>
                      <p className="text-sm font-medium text-gray-950">
                        Atraso na Entrega
                      </p>
                      <p className="text-xs text-gray-600">
                        CONT-042 • 2 horas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gestão de Contentores */}
        {activeContentorForm === "contentores" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                      📋
                    </span>
                    Cadastro e Gestão de Contentores
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Número do Contentor *
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="CONT-001"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                          <option value="">Selecione</option>
                          <option value="20ft">20ft Standard</option>
                          <option value="40ft">40ft Standard</option>
                          <option value="40hc">40ft High Cube</option>
                          <option value="reefer">Reefer</option>
                          <option value="tanque">Tanque</option>
                          <option value="open_top">Open Top</option>
                          <option value="flat_rack">Flat Rack</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tara (kg)
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="2200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Capacidade Máxima (kg)
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="28480"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Proprietário
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                          <option value="">Selecione</option>
                          <option value="maersk">Maersk</option>
                          <option value="msc">MSC</option>
                          <option value="cmacgm">CMA CGM</option>
                          <option value="cosco">COSCO</option>
                          <option value="empresa">Nossa Empresa</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Estado do Contentor
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                          <option value="disponivel">Disponível</option>
                          <option value="ocupado">Ocupado</option>
                          <option value="manutencao">Em Manutenção</option>
                          <option value="danificado">Danificado</option>
                          <option value="inspecao">Em Inspeção</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data da Última Inspeção
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Próxima Inspeção
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Características Especiais
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <label className="text-sm text-gray-700">
                            GPS Ativo
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <label className="text-sm text-gray-700">
                            Sensor Temp.
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <label className="text-sm text-gray-700">
                            Sensor Porta
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <label className="text-sm text-gray-700">
                            Ventilação
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Observações
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        placeholder="Observações sobre o contentor..."
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                      >
                        Salvar Contentor
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Painel de Contentores */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Contentores Recentes
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-gray-950">
                      CONT-001
                    </p>
                    <p className="text-xs text-gray-600">
                      40ft • Em trânsito
                    </p>
                    <p className="text-xs text-blue-600 font-medium">
                      Maputo → Beira
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-gray-950">
                      CONT-015
                    </p>
                    <p className="text-xs text-gray-600">
                      Reefer • No porto
                    </p>
                    <p className="text-xs text-blue-600 font-medium">
                      Porto Maputo
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-gray-950">
                      CONT-028
                    </p>
                    <p className="text-xs text-gray-600">
                      20ft • No cliente
                    </p>
                    <p className="text-xs text-blue-600 font-medium">
                      Matola
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Estatísticas
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Total Contentores:
                    </span>
                    <span className="font-semibold text-gray-950">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Disponíveis:</span>
                    <span className="font-semibold text-gray-950">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Em Uso:</span>
                    <span className="font-semibold text-gray-950">28</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Manutenção:</span>
                    <span className="font-semibold text-gray-950">5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Movimentação de Contentores */}
        {activeContentorForm === "movimentacao" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-green-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-green-500 text-white p-2 rounded-lg mr-2">
                  🚢
                </span>
                Movimentação e Histórico de Contentores
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contentor
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950">
                    <option value="">Selecione o contentor</option>
                    <option value="CONT-001">CONT-001</option>
                    <option value="CONT-015">CONT-015</option>
                    <option value="CONT-028">CONT-028</option>
                    <option value="CONT-042">CONT-042</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Período
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950">
                    <option value="7dias">Últimos 7 dias</option>
                    <option value="30dias">Últimos 30 dias</option>
                    <option value="3meses">Últimos 3 meses</option>
                    <option value="personalizado">Personalizado</option>
                  </select>
                </div>
              </div>

              {/* Histórico de Movimentação */}
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-500 text-white p-2 rounded-lg">
                        📦
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          CONT-001 - Carregado no Camião
                        </p>
                        <p className="text-sm text-gray-600">
                          Porto Maputo → MB-1234-AB • Hoje 08:30
                        </p>
                      </div>
                    </div>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                      Concluído
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-500 text-white p-2 rounded-lg">
                        🚛
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          CONT-001 - Em Trânsito
                        </p>
                        <p className="text-sm text-gray-600">
                          EN1 - Aproximando de Xai-Xai • Hoje 11:45
                        </p>
                      </div>
                    </div>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                      Em Andamento
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-500 text-white p-2 rounded-lg">
                        ⏸️
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          CONT-001 - Parada Programada
                        </p>
                        <p className="text-sm text-gray-600">
                          Posto Combustível - Xai-Xai • Hoje 12:15
                        </p>
                      </div>
                    </div>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                      Parado
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-500 text-white p-2 rounded-lg">
                        🏭
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          CONT-015 - Descarga no Cliente
                        </p>
                        <p className="text-sm text-gray-600">
                          Empresa A - Matola • Ontem 16:20
                        </p>
                      </div>
                    </div>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                      Concluído
                    </span>
                  </div>
                </div>
              </div>

              {/* Nova Movimentação */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Registrar Nova Movimentação
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Movimentação
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                      <option value="">Selecione</option>
                      <option value="carregamento">Carregamento</option>
                      <option value="descarga">Descarga</option>
                      <option value="transferencia">Transferência</option>
                      <option value="inspecao">Inspeção</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Local
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                      placeholder="Local da movimentação"
                    />
                  </div>
                </div>
                <button className="mt-4 px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-green-600 font-medium">
                  Registrar Movimentação
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Gráficos */}
        {activeContentorForm === "graficos" && (
          <div className="space-y-6 text-gray-950">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-cyan-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-cyan-500 text-white p-2 rounded-lg mr-2">
                    📈
                  </span>
                  Dashboard de Contentores - Métricas e Estatísticas
                </h3>
              </div>
              <div className="p-6">
                {/* Grid de Gráficos Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Status dos Contentores */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-cyan-500 mr-2">📊</span>
                      Status dos Contentores
                    </h4>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center w-full">
                        <div className="flex justify-center mb-4">
                          <div className="relative w-32 h-32">
                            <div
                              className="w-full h-full rounded-full"
                              style={{
                                background:
                                  "conic-gradient(#3b82f6 0% 27%, #10b981 27% 60%, #f59e0b 60% 87%, #6b7280 87% 100%)",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                            <span>Em Trânsito (27%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                            <span>No Porto (33%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                            <span>No Cliente (27%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-gray-500 rounded mr-2"></div>
                            <span>Vazios (13%)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Movimentação Mensal - Barras Empilhadas */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-blue-500 mr-2">🚢</span>
                      Movimentação Mensal (Últimos 6 Meses)
                    </h4>
                    <div className="h-64 flex items-end justify-between space-x-2">
                      {[
                        { month: "Jan", carregamentos: 45, descargas: 38 },
                        { month: "Fev", carregamentos: 52, descargas: 45 },
                        { month: "Mar", carregamentos: 48, descargas: 42 },
                        { month: "Abr", carregamentos: 65, descargas: 58 },
                        { month: "Mai", carregamentos: 58, descargas: 52 },
                        { month: "Jun", carregamentos: 72, descargas: 65 },
                      ].map((item, index) => {
                        const total = item.carregamentos + item.descargas;
                        return (
                          <div
                            key={index}
                            className="flex flex-col items-center flex-1 h-full"
                          >
                            <div className="flex flex-col justify-end h-full w-3/4 rounded-t-lg overflow-hidden">
                              {/* Carregamentos */}
                              <div
                                className="bg-blue-500 w-full transition-all hover:opacity-80"
                                style={{
                                  height: `${
                                    (item.carregamentos / total) * 100
                                  }%`,
                                }}
                                title={`Carregamentos: ${item.carregamentos}`}
                              ></div>
                              {/* Descargas */}
                              <div
                                className="bg-cyan-500 w-full transition-all hover:opacity-80"
                                style={{
                                  height: `${
                                    (item.descargas / total) * 100
                                  }%`,
                                }}
                                title={`Descargas: ${item.descargas}`}
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
                        <span>Carregamentos</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-cyan-500 rounded mr-1"></div>
                        <span>Descargas</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Segunda Linha de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {/* Gráfico de Distribuição por Tipo */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-purple-500 mr-2">📦</span>
                      Contentores por Tipo
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            tipo: "40ft Standard",
                            quantidade: 18,
                            color: "bg-blue-500",
                            percentage: 40,
                          },
                          {
                            tipo: "20ft Standard",
                            quantidade: 12,
                            color: "bg-green-500",
                            percentage: 27,
                          },
                          {
                            tipo: "Reefer",
                            quantidade: 8,
                            color: "bg-cyan-500",
                            percentage: 18,
                          },
                          {
                            tipo: "40ft High Cube",
                            quantidade: 5,
                            color: "bg-purple-500",
                            percentage: 11,
                          },
                          {
                            tipo: "Outros",
                            quantidade: 2,
                            color: "bg-gray-500",
                            percentage: 4,
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
                                  {item.tipo}
                                </span>
                                <span className="text-sm text-gray-600 ml-2 whitespace-nowrap flex-shrink-0">
                                  {item.quantidade}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${item.color} transition-all duration-300`}
                                  style={{ width: `${item.percentage}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {item.percentage}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Alertas por Tipo */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-red-500 mr-2">⚠️</span>
                      Alertas do Mês
                    </h4>
                    <div className="h-48">
                      <div className="space-y-3">
                        {[
                          {
                            tipo: "Temperatura",
                            ocorrencias: 15,
                            color: "bg-red-500",
                            percentage: 38,
                          },
                          {
                            tipo: "Porta Aberta",
                            ocorrencias: 12,
                            color: "bg-yellow-500",
                            percentage: 30,
                          },
                          {
                            tipo: "Atraso Entrega",
                            ocorrencias: 8,
                            color: "bg-orange-500",
                            percentage: 20,
                          },
                          {
                            tipo: "GPS Offline",
                            ocorrencias: 5,
                            color: "bg-gray-500",
                            percentage: 12,
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2 flex-1 min-w-0">
                              <div
                                className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0`}
                              ></div>
                              <span className="text-sm font-medium truncate">
                                {item.tipo}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3 flex-shrink-0">
                              <span className="text-sm text-gray-600">
                                {item.ocorrencias}
                              </span>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${item.color}`}
                                  style={{ width: `${item.percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500 w-8 text-right">
                                {item.percentage}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Eficiência de Utilização */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-green-500 mr-2">📈</span>
                      Taxa de Utilização
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            categoria: "Contentores Ativos",
                            taxa: 87,
                            color: "bg-green-500",
                          },
                          {
                            categoria: "Tempo em Movimento",
                            taxa: 65,
                            color: "bg-blue-500",
                          },
                          {
                            categoria: "Capacidade Ocupada",
                            taxa: 78,
                            color: "bg-cyan-500",
                          },
                          {
                            categoria: "Rotatividade",
                            taxa: 42,
                            color: "bg-purple-500",
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
                                  {item.categoria}
                                </span>
                                <span className="text-sm font-bold text-gray-700 ml-2 whitespace-nowrap flex-shrink-0">
                                  {item.taxa}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                  className={`h-3 rounded-full ${item.color} transition-all duration-500 ease-out`}
                                  style={{ width: `${item.taxa}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {item.taxa >= 80
                                  ? "Excelente"
                                  : item.taxa >= 60
                                  ? "Bom"
                                  : item.taxa >= 40
                                  ? "Regular"
                                  : "Baixo"}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Métricas Rápidas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                    <p className="text-sm text-cyan-600 font-medium">
                      Contentores Ativos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">45</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">
                      Em Trânsito
                    </p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600 font-medium">
                      Taxa Utilização
                    </p>
                    <p className="text-2xl font-bold text-gray-900">87%</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-600 font-medium">
                      Alertas/Mês
                    </p>
                    <p className="text-2xl font-bold text-gray-900">40</p>
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
                        Tipo de Contentor
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos</option>
                        <option>20ft Standard</option>
                        <option>40ft Standard</option>
                        <option>40ft High Cube</option>
                        <option>Reefer</option>
                        <option>Tanque</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos</option>
                        <option>Em Trânsito</option>
                        <option>No Porto</option>
                        <option>No Cliente</option>
                        <option>Vazio</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Proprietário
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos</option>
                        <option>Maersk</option>
                        <option>MSC</option>
                        <option>CMA CGM</option>
                        <option>COSCO</option>
                        <option>Nossa Empresa</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-4">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                      Limpar Filtros
                    </button>
                    <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 font-medium">
                      Aplicar Filtros
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Relatórios */}
        {activeContentorForm === "relatorios" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-purple-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-purple-500 text-white p-2 rounded-lg mr-2">
                  📊
                </span>
                Relatórios de Contentores
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-blue-600 text-lg mb-2">📦</div>
                  <p className="font-medium text-gray-900">Inventário</p>
                  <p className="text-sm text-gray-600">
                    Contentores activos
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-green-600 text-lg mb-2">🚢</div>
                  <p className="font-medium text-gray-900">Movimentação</p>
                  <p className="text-sm text-gray-600">
                    Histórico de viagens
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-yellow-600 text-lg mb-2">⏱️</div>
                  <p className="font-medium text-gray-900">Tempos</p>
                  <p className="text-sm text-gray-600">
                    Estatísticas de uso
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-red-600 text-lg mb-2">⚠️</div>
                  <p className="font-medium text-gray-900">Alertas</p>
                  <p className="text-sm text-gray-600">
                    Notificações do sistema
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
                      <option>Relatório de Utilização</option>
                      <option>Contentores por Status</option>
                      <option>Movimentação por Período</option>
                      <option>Alertas e Incidentes</option>
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
                <button className="mt-4 px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-purple-600 font-medium">
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

export default GPSContentor;