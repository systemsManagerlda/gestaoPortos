import React, { useState } from 'react';

const CargaDisponivelNLT = () => {
  const [activeCargaForm, setActiveCargaForm] = useState("disponiveis");

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            🚚
          </span>
          Carga Disponível NLT - Nacional, Local, Trânsito
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Gestão de cargas disponíveis para transporte nacional, local e em
          trânsito
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação entre Formulários */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveCargaForm("disponiveis")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCargaForm === "disponiveis"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📦 Disponíveis
          </button>
          <button
            onClick={() => setActiveCargaForm("nacional")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCargaForm === "nacional"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🇲🇿 Nacional
          </button>
          <button
            onClick={() => setActiveCargaForm("local")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCargaForm === "local"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🏙️ Local
          </button>
          <button
            onClick={() => setActiveCargaForm("transito")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCargaForm === "transito"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🛣️ Trânsito
          </button>
          <button
            onClick={() => setActiveCargaForm("graficos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCargaForm === "graficos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Gráficos
          </button>
        </div>

        {/* Cargas Disponíveis - Visão Geral */}
        {activeCargaForm === "disponiveis" && (
          <div className="space-y-6">
            {/* Métricas Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Disponível
                    </p>
                    <p className="text-2xl font-bold text-gray-900">47</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">📦</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    +8% vs semana anterior
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Nacional
                    </p>
                    <p className="text-2xl font-bold text-gray-900">28</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">🇲🇿</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    12 urgentes
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Local
                    </p>
                    <p className="text-2xl font-bold text-gray-900">14</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">🏙️</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    5 hoje
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Em Trânsito
                    </p>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">🛣️</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    1 atrasado
                  </span>
                </div>
              </div>
            </div>

            {/* Grid Principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Lista de Cargas Disponíveis */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4 border-b border-gray-200 bg-emerald-50">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <span className="bg-emerald-500 text-white p-2 rounded-lg mr-2">
                        📦
                      </span>
                      Cargas Disponíveis - Todas as Categorias
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {/* Carga 1 */}
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                                NAC-001
                              </span>
                              <span className="bg-gray-500 text-white px-2 py-1 rounded text-sm font-medium">
                                URGENTE
                              </span>
                              <span className="text-sm text-gray-600">
                                🇲🇿 Nacional
                              </span>
                            </div>
                            <p className="font-medium text-gray-900">
                              Maputo → Nampula
                            </p>
                            <p className="text-sm text-gray-600">
                              Cimento • 25 ton • Contentor 40ft
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span>📅 Entrega: 18/01</span>
                              <span>💰 MT 45.000</span>
                              <span>⚡ Prioridade Alta</span>
                            </div>
                          </div>
                          <button className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium">
                            Atribuir
                          </button>
                        </div>
                      </div>

                      {/* Carga 2 */}
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                                LOC-015
                              </span>
                              <span className="text-sm text-gray-600">
                                🏙️ Local
                              </span>
                            </div>
                            <p className="font-medium text-gray-900">
                              Matola → Marracuene
                            </p>
                            <p className="text-sm text-gray-600">
                              Produtos Alimentares • 8 ton • Carga
                              Fracionada
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span>📅 Entrega: Hoje</span>
                              <span>💰 MT 12.000</span>
                              <span>⚡ Prioridade Média</span>
                            </div>
                          </div>
                          <button className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium">
                            Atribuir
                          </button>
                        </div>
                      </div>

                      {/* Carga 3 */}
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                                TRA-028
                              </span>
                              <span className="text-sm text-gray-600">
                                🛣️ Trânsito
                              </span>
                            </div>
                            <p className="font-medium text-gray-900">
                              Beira → Chimoio
                            </p>
                            <p className="text-sm text-gray-600">
                              Material de Construção • 18 ton • Carga Geral
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span>📅 Entrega: 19/01</span>
                              <span>💰 MT 28.000</span>
                              <span>⚡ Prioridade Baixa</span>
                            </div>
                          </div>
                          <button className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium">
                            Atribuir
                          </button>
                        </div>
                      </div>

                      {/* Carga 4 */}
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                                NAC-042
                              </span>
                              <span className="bg-gray-500 text-white px-2 py-1 rounded text-sm font-medium">
                                PERECÍVEL
                              </span>
                              <span className="text-sm text-gray-600">
                                🇲🇿 Nacional
                              </span>
                            </div>
                            <p className="font-medium text-gray-900">
                              Xai-Xai → Inhambane
                            </p>
                            <p className="text-sm text-gray-600">
                              Produtos Agrícolas • 12 ton • Reefer
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span>📅 Entrega: 17/01</span>
                              <span>💰 MT 32.000</span>
                              <span>⚡ Prioridade Alta</span>
                            </div>
                          </div>
                          <button className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium">
                            Atribuir
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Painel de Filtros e Ações */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Filtros
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Carga
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option value="todos">Todos os Tipos</option>
                        <option value="contentor">Contentor</option>
                        <option value="fracionada">Fracionada</option>
                        <option value="granel">Granel</option>
                        <option value="perecivel">Perecível</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prioridade
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option value="todos">Todas</option>
                        <option value="alta">Alta</option>
                        <option value="media">Média</option>
                        <option value="baixa">Baixa</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data de Entrega
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option value="todos">Qualquer Data</option>
                        <option value="hoje">Hoje</option>
                        <option value="amanha">Amanhã</option>
                        <option value="semana">Esta Semana</option>
                      </select>
                    </div>
                    <button className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium">
                      Aplicar Filtros
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Ações Rápidas
                  </h4>
                  <div className="space-y-2">
                    <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950">
                      ➕ Nova Carga Disponível
                    </button>
                    <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950">
                      📊 Relatório de Disponibilidade
                    </button>
                    <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950">
                      🔔 Configurar Alertas
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cargas Nacionais */}
        {activeCargaForm === "nacional" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                      🇲🇿
                    </span>
                    Cargas Disponíveis - Transporte Nacional
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Origem *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                          <option value="">Selecione a origem</option>
                          <option value="maputo">Maputo Cidade</option>
                          <option value="matola">Matola</option>
                          <option value="beira">Beira</option>
                          <option value="nampula">Nampula</option>
                          <option value="chimoio">Chimoio</option>
                          <option value="quelimane">Quelimane</option>
                          <option value="tete">Tete</option>
                          <option value="xai-xai">Xai-Xai</option>
                          <option value="inhambane">Inhambane</option>
                          <option value="lichinga">Lichinga</option>
                          <option value="pemba">Pemba</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Destino *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                          <option value="">Selecione o destino</option>
                          <option value="maputo">Maputo Cidade</option>
                          <option value="matola">Matola</option>
                          <option value="beira">Beira</option>
                          <option value="nampula">Nampula</option>
                          <option value="chimoio">Chimoio</option>
                          <option value="quelimane">Quelimane</option>
                          <option value="tete">Tete</option>
                          <option value="xai-xai">Xai-Xai</option>
                          <option value="inhambane">Inhambane</option>
                          <option value="lichinga">Lichinga</option>
                          <option value="pemba">Pemba</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Carga *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                          <option value="">Selecione</option>
                          <option value="contentor">Contentor</option>
                          <option value="fracionada">
                            Carga Fracionada
                          </option>
                          <option value="granel">Granel</option>
                          <option value="perecivel">Perecível</option>
                          <option value="perigosa">Perigosa</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Peso (kg) *
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Volume (m³)
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data de Coleta *
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data de Entrega *
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Valor do Frete (MT) *
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="MT 0,00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Prioridade
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                          <option value="baixa">Baixa</option>
                          <option value="media">Média</option>
                          <option value="alta">Alta</option>
                          <option value="urgente">Urgente</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição da Carga
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        placeholder="Descreva a carga em detalhes..."
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
                        Publicar Carga
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Painel de Cargas Nacionais */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Cargas Nacionais Ativas
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-gray-950">
                      NAC-001 - Urgente
                    </p>
                    <p className="text-xs text-gray-600">
                      Maputo → Nampula • 25 ton
                    </p>
                    <p className="text-xs text-blue-600 font-medium">
                      Entrega: 18/01
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-gray-950">
                      NAC-042 - Perecível
                    </p>
                    <p className="text-xs text-gray-600">
                      Xai-Xai → Inhambane • 12 ton
                    </p>
                    <p className="text-xs text-blue-600 font-medium">
                      Reefer • 17/01
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-gray-950">
                      NAC-056 - Contentor
                    </p>
                    <p className="text-xs text-gray-600">
                      Beira → Tete • 32 ton
                    </p>
                    <p className="text-xs text-blue-600 font-medium">
                      40ft • 20/01
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Estatísticas Nacionais
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cargas Ativas:</span>
                    <span className="font-semibold text-gray-950">28</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Urgentes:</span>
                    <span className="font-semibold text-gray-950">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Perecíveis:</span>
                    <span className="font-semibold text-gray-950">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valor Total:</span>
                    <span className="font-semibold text-gray-950">
                      MT 1.2M
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cargas Locais */}
        {activeCargaForm === "local" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-green-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-green-500 text-white p-2 rounded-lg mr-2">
                  🏙️
                </span>
                Cargas Disponíveis - Transporte Local
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Região Metropolitana
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950">
                    <option value="todos">Todas as Regiões</option>
                    <option value="maputo_cidade">Maputo Cidade</option>
                    <option value="matola">Matola</option>
                    <option value="marracuene">Marracuene</option>
                    <option value="boane">Boane</option>
                    <option value="matutuine">Matutuine</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Entrega
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950">
                    <option value="todos">Todos os Tipos</option>
                    <option value="expresso">Expresso (mesmo dia)</option>
                    <option value="agendada">Agendada</option>
                    <option value="multiplas">Múltiplas Paradas</option>
                  </select>
                </div>
              </div>

              {/* Lista de Cargas Locais */}
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                          LOC-015
                        </span>
                        <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                          EXPRESSO
                        </span>
                      </div>
                      <p className="font-medium text-gray-900">
                        Matola → Marracuene
                      </p>
                      <p className="text-sm text-gray-600">
                        Produtos Alimentares • 8 ton • Entrega Hoje
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>⏰ 4 horas estimadas</span>
                        <span>💰 MT 12.000</span>
                        <span>📞 Cliente: +258 84 123 4567</span>
                      </div>
                    </div>
                    <button className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-green-600 font-medium">
                      Aceitar
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                          LOC-023
                        </span>
                        <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                          MÚLTIPLAS
                        </span>
                      </div>
                      <p className="font-medium text-gray-900">
                        Maputo (3 paradas)
                      </p>
                      <p className="text-sm text-gray-600">
                        Distribuição Comercial • 5 ton • 5 paradas
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>⏰ Dia todo</span>
                        <span>💰 MT 8.500</span>
                        <span>📍 Baixa, Sommerschield, Costa do Sol</span>
                      </div>
                    </div>
                    <button className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-green-600 font-medium">
                      Aceitar
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                          LOC-031
                        </span>
                        <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                          FRÁGIL
                        </span>
                      </div>
                      <p className="font-medium text-gray-900">
                        Aeroporto → Zimpeto
                      </p>
                      <p className="text-sm text-gray-600">
                        Equipamentos Eletrónicos • 2 ton • Cuidado Especial
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>⏰ 2 horas estimadas</span>
                        <span>💰 MT 6.000</span>
                        <span>📦 Embalagem especial</span>
                      </div>
                    </div>
                    <button className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-green-600 font-medium">
                      Aceitar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cargas em Trânsito */}
        {activeCargaForm === "transito" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-orange-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-orange-500 text-white p-2 rounded-lg mr-2">
                  🛣️
                </span>
                Cargas em Trânsito - Acompanhamento
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950">
                    <option value="todos">Todos</option>
                    <option value="em_transito">Em Trânsito</option>
                    <option value="atrasado">Atrasados</option>
                    <option value="chegando">Chegando</option>
                    <option value="incidente">Com Incidentes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rota
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950">
                    <option value="todos">Todas as Rotas</option>
                    <option value="maputo_beira">Maputo → Beira</option>
                    <option value="beira_nampula">Beira → Nampula</option>
                    <option value="nampula_pemba">Nampula → Pemba</option>
                    <option value="maputo_xai-xai">Maputo → Xai-Xai</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previsão de Chegada
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950">
                    <option value="todos">Qualquer Data</option>
                    <option value="hoje">Hoje</option>
                    <option value="amanha">Amanhã</option>
                    <option value="semana">Esta Semana</option>
                  </select>
                </div>
              </div>

              {/* Lista de Cargas em Trânsito */}
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                          TRA-007
                        </span>
                        <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                          NO PRAZO
                        </span>
                      </div>
                      <p className="font-medium text-gray-900">
                        Maputo → Beira • 65% concluído
                      </p>
                      <p className="text-sm text-gray-600">
                        Material de Construção • 22 ton • Caminhão MB-1234
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>📍 EN1 - Próximo Xai-Xai</span>
                        <span>⏰ Chegada: Hoje 18:00</span>
                        <span>👨‍💼 Motorista: João Maputo</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-600">
                        No prazo
                      </p>
                      <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Detalhes
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                          TRA-028
                        </span>
                        <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                          PEQUENO ATRASO
                        </span>
                      </div>
                      <p className="font-medium text-gray-900">
                        Beira → Chimoio • 45% concluído
                      </p>
                      <p className="text-sm text-gray-600">
                        Produtos Diversos • 18 ton • Caminhão MB-5678
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>📍 EN6 - Após Inchope</span>
                        <span>⏰ Chegada: Amanhã 14:00 (+2h)</span>
                        <span>👨‍💼 Motorista: Carlos Beira</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-600">
                        +2 horas
                      </p>
                      <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Detalhes
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                          TRA-042
                        </span>
                        <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                          ATRASADO
                        </span>
                      </div>
                      <p className="font-medium text-gray-900">
                        Nampula → Pemba • 30% concluído
                      </p>
                      <p className="text-sm text-gray-600">
                        Combustível • 28 ton • Caminhão MB-9012
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>📍 EN13 - Montepuez</span>
                        <span>⏰ Chegada: 19/01 (+1 dia)</span>
                        <span>👨‍💼 Motorista: António Nampula</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-600">
                        +1 dia
                      </p>
                      <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Detalhes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gráficos */}
        {activeCargaForm === "graficos" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                    📈
                  </span>
                  Dashboard de Cargas NLT - Métricas e Estatísticas
                </h3>
              </div>
              <div className="p-6 text-gray-950">
                {/* Grid de Gráficos Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Distribuição por Categoria NLT */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-blue-500 mr-2">📊</span>
                      Distribuição por Categoria NLT
                    </h4>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center w-full">
                        <div className="flex justify-center mb-4">
                          <div className="relative w-32 h-32">
                            <div
                              className="w-full h-full rounded-full"
                              style={{
                                background:
                                  "conic-gradient(#3b82f6 0% 60%, #06b6d4 60% 85%, #10b981 85% 100%)",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                            <span>Nacional (60%) - 28 cargas</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-cyan-500 rounded mr-2"></div>
                            <span>Local (25%) - 14 cargas</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                            <span>Trânsito (15%) - 5 cargas</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Cargas por Prioridade - Barras Empilhadas */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-red-500 mr-2">🚨</span>
                      Cargas por Prioridade (Últimos 30 Dias)
                    </h4>
                    <div className="h-64 flex items-end justify-between space-x-2">
                      {[
                        {
                          week: "Sem 1",
                          urgente: 8,
                          alta: 12,
                          media: 18,
                          baixa: 10,
                        },
                        {
                          week: "Sem 2",
                          urgente: 12,
                          alta: 15,
                          media: 20,
                          baixa: 8,
                        },
                        {
                          week: "Sem 3",
                          urgente: 15,
                          alta: 18,
                          media: 22,
                          baixa: 6,
                        },
                        {
                          week: "Sem 4",
                          urgente: 10,
                          alta: 14,
                          media: 25,
                          baixa: 12,
                        },
                      ].map((item, index) => {
                        const total =
                          item.urgente +
                          item.alta +
                          item.media +
                          item.baixa;
                        return (
                          <div
                            key={index}
                            className="flex flex-col items-center flex-1 h-full"
                          >
                            <div className="flex flex-col justify-end h-full w-3/4 rounded-t-lg overflow-hidden">
                              {/* Urgente */}
                              <div
                                className="bg-red-500 w-full transition-all hover:opacity-80"
                                style={{
                                  height: `${
                                    (item.urgente / total) * 100
                                  }%`,
                                }}
                                title={`Urgente: ${item.urgente}`}
                              ></div>
                              {/* Alta */}
                              <div
                                className="bg-orange-500 w-full transition-all hover:opacity-80"
                                style={{
                                  height: `${(item.alta / total) * 100}%`,
                                }}
                                title={`Alta: ${item.alta}`}
                              ></div>
                              {/* Média */}
                              <div
                                className="bg-yellow-400 w-full transition-all hover:opacity-80"
                                style={{
                                  height: `${(item.media / total) * 100}%`,
                                }}
                                title={`Média: ${item.media}`}
                              ></div>
                              {/* Baixa */}
                              <div
                                className="bg-green-500 w-full transition-all hover:opacity-80"
                                style={{
                                  height: `${(item.baixa / total) * 100}%`,
                                }}
                                title={`Baixa: ${item.baixa}`}
                              ></div>
                            </div>
                            <span className="text-xs mt-2 font-medium">
                              {item.week}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Legenda */}
                    <div className="flex justify-center space-x-3 mt-4 text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
                        <span>Urgente</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-orange-500 rounded mr-1"></div>
                        <span>Alta</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-400 rounded mr-1"></div>
                        <span>Média</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
                        <span>Baixa</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Segunda Linha de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {/* Gráfico de Tipos de Carga */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-purple-500 mr-2">📦</span>
                      Tipos de Carga Mais Comuns
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            tipo: "Contentor 40ft",
                            quantidade: 18,
                            color: "bg-blue-500",
                            percentage: 38,
                            icon: "📦",
                          },
                          {
                            tipo: "Carga Fracionada",
                            quantidade: 15,
                            color: "bg-green-500",
                            percentage: 32,
                            icon: "📋",
                          },
                          {
                            tipo: "Perecível (Reefer)",
                            quantidade: 8,
                            color: "bg-cyan-500",
                            percentage: 17,
                            icon: "❄️",
                          },
                          {
                            tipo: "Material Construção",
                            quantidade: 5,
                            color: "bg-orange-500",
                            percentage: 11,
                            icon: "🏗️",
                          },
                          {
                            tipo: "Granel",
                            quantidade: 2,
                            color: "bg-gray-500",
                            percentage: 4,
                            icon: "⚫",
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
                                  {item.tipo}
                                </span>
                                <span className="text-sm text-gray-600 ml-2 whitespace-nowrap flex-shrink-0">
                                  {item.quantidade}
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

                  {/* Gráfico de Rotas Mais Frequentes */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-green-500 mr-2">🛣️</span>
                      Rotas Mais Frequentes
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            rota: "Maputo → Beira",
                            frequencia: 28,
                            color: "bg-blue-500",
                            percentage: 35,
                            valor: "MT 45K",
                          },
                          {
                            rota: "Matola → Marracuene",
                            frequencia: 22,
                            color: "bg-green-500",
                            percentage: 28,
                            valor: "MT 12K",
                          },
                          {
                            rota: "Beira → Chimoio",
                            frequencia: 18,
                            color: "bg-cyan-500",
                            percentage: 23,
                            valor: "MT 28K",
                          },
                          {
                            rota: "Maputo → Xai-Xai",
                            frequencia: 12,
                            color: "bg-purple-500",
                            percentage: 15,
                            valor: "MT 20K",
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
                                  {item.rota}
                                </span>
                                <span className="text-sm font-bold text-gray-700 ml-2 whitespace-nowrap flex-shrink-0">
                                  {item.frequencia}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${item.color}`}
                                  style={{ width: `${item.percentage}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1 flex justify-between">
                                <span>{item.percentage}% das rotas</span>
                                <span className="font-medium">
                                  {item.valor}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Performance de Entrega */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-amber-500 mr-2">⏱️</span>
                      Performance de Entrega
                    </h4>
                    <div className="h-48 space-y-4">
                      {[
                        {
                          metrica: "No Prazo",
                          valor: 78,
                          color: "bg-green-500",
                          meta: 85,
                        },
                        {
                          metrica: "Pequeno Atraso",
                          valor: 15,
                          color: "bg-yellow-500",
                          meta: 10,
                        },
                        {
                          metrica: "Atrasado",
                          valor: 7,
                          color: "bg-orange-500",
                          meta: 5,
                        },
                        {
                          metrica: "Muito Atrasado",
                          valor: 2,
                          color: "bg-red-500",
                          meta: 0,
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
                                  item.valor <= item.meta
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {item.valor <= item.meta ? "✓" : "✗"} Meta:{" "}
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
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">
                      Cargas Disponíveis
                    </p>
                    <p className="text-2xl font-bold text-gray-900">47</p>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                    <p className="text-sm text-cyan-600 font-medium">
                      Valor Total
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      MT 1.2M
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600 font-medium">
                      Taxa Atendimento
                    </p>
                    <p className="text-2xl font-bold text-gray-900">92%</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <p className="text-sm text-amber-600 font-medium">
                      Cargas Urgentes
                    </p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
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
                        Categoria NLT
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todas</option>
                        <option>Nacional</option>
                        <option>Local</option>
                        <option>Trânsito</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Carga
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos</option>
                        <option>Contentor</option>
                        <option>Fracionada</option>
                        <option>Perecível</option>
                        <option>Granel</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prioridade
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todas</option>
                        <option>Urgente</option>
                        <option>Alta</option>
                        <option>Média</option>
                        <option>Baixa</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-4">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                      Limpar Filtros
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                      Aplicar Filtros
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CargaDisponivelNLT;