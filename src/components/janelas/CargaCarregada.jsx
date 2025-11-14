import React, { useState } from 'react';

const CargaCarregada = () => {
  const [activeCarregadaForm, setActiveCarregadaForm] = useState("controle");

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            🚛
          </span>
          Carga Carregada - Controle de Cargas Carregadas
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Gestão e acompanhamento de cargas já carregadas nos caminhões
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação entre Formulários */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveCarregadaForm("controle")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCarregadaForm === "controle"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Controle
          </button>
          <button
            onClick={() => setActiveCarregadaForm("carregamento")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCarregadaForm === "carregamento"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ⬆️ Carregamento
          </button>
          <button
            onClick={() => setActiveCarregadaForm("documentos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCarregadaForm === "documentos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📑 Documentos
          </button>
          <button
            onClick={() => setActiveCarregadaForm("graficos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCarregadaForm === "graficos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Gráficos
          </button>
          <button
            onClick={() => setActiveCarregadaForm("relatorios")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCarregadaForm === "relatorios"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Relatórios
          </button>
        </div>

        {/* Controle de Cargas Carregadas */}
        {activeCarregadaForm === "controle" && (
          <div className="space-y-6">
            {/* Métricas Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Carregadas
                    </p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">🚛</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    +5 hoje
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Em Trânsito
                    </p>
                    <p className="text-2xl font-bold text-gray-900">18</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">🛣️</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    72% da frota
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Para Carregar
                    </p>
                    <p className="text-2xl font-bold text-gray-900">6</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">⏳</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    3 urgentes
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Atrasados
                    </p>
                    <p className="text-2xl font-bold text-gray-900">2</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">⚠️</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    Necessita acção
                  </span>
                </div>
              </div>
            </div>

            {/* Grid Principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Lista de Cargas Carregadas */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4 border-b border-gray-200 bg-blue-50">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                        📊
                      </span>
                      Cargas Carregadas - Controle em Tempo Real
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
                                CRG-001
                              </span>
                              <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                                EM TRÂNSITO
                              </span>
                              <span className="text-sm text-gray-600">
                                🕒 Carregado: Hoje 08:30
                              </span>
                            </div>
                            <p className="font-medium text-gray-900">
                              MB-1234-AB • Maputo → Nampula
                            </p>
                            <p className="text-sm text-gray-600">
                              Cimento • 25 ton • Contentor 40ft
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span>👨‍💼 João Maputo</span>
                              <span>📞 +258 84 123 4567</span>
                              <span>📍 EN1 - Xai-Xai</span>
                              <span>⏰ Previsão: 18/01 18:00</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-blue-600">
                              No prazo
                            </p>
                            <button className="mt-2 px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                              Detalhes
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Carga 2 */}
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                                CRG-015
                              </span>
                              <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                                CARREGANDO
                              </span>
                              <span className="text-sm text-gray-600">
                                🕒 Início: Hoje 10:15
                              </span>
                            </div>
                            <p className="font-medium text-gray-900">
                              MB-5678-CD • Porto Maputo → Matola
                            </p>
                            <p className="text-sm text-gray-600">
                              Produtos Alimentares • 8 ton • Fracionada
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span>👨‍💼 Carlos Beira</span>
                              <span>📞 +258 84 234 5678</span>
                              <span>📍 Porto Maputo - Cais 3</span>
                              <span>📦 65% carregado</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-blue-600">
                              Em andamento
                            </p>
                            <button className="mt-2 px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                              Acompanhar
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Carga 3 */}
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                                CRG-028
                              </span>
                              <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                                ATRASADO
                              </span>
                              <span className="text-sm text-gray-600">
                                🕒 Carregado: Ontem 16:00
                              </span>
                            </div>
                            <p className="font-medium text-gray-900">
                              MB-9012-EF • Beira → Chimoio
                            </p>
                            <p className="text-sm text-gray-600">
                              Material Construção • 18 ton • Carga Geral
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span>👨‍💼 António Nampula</span>
                              <span>📞 +258 84 345 6789</span>
                              <span>📍 EN6 - Inchope</span>
                              <span>⏰ +3 horas de atraso</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-blue-600">
                              Atrasado
                            </p>
                            <button className="mt-2 px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                              Resolver
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Carga 4 */}
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                                CRG-042
                              </span>
                              <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                                ENTREGUE
                              </span>
                              <span className="text-sm text-gray-600">
                                🕒 Entregue: Hoje 09:45
                              </span>
                            </div>
                            <p className="font-medium text-gray-900">
                              MB-3456-GH • Maputo → Marracuene
                            </p>
                            <p className="text-sm text-gray-600">
                              Produtos Diversos • 5 ton • Local
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span>👨‍💼 Pedro Matola</span>
                              <span>📞 +258 84 456 7890</span>
                              <span>✅ Cliente confirmou</span>
                              <span>⭐ Avaliação: 5/5</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-blue-600">
                              Concluído
                            </p>
                            <button className="mt-2 px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                              Comprovante
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Painel de Status e Ações */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Filtros Rápidos
                  </h4>
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950">
                      🟢 Em Trânsito
                    </button>
                    <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950">
                      🟡 Carregando
                    </button>
                    <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950">
                      🔴 Atrasados
                    </button>
                    <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950">
                      🔵 Entregues Hoje
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Próximas Ações
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm font-medium text-gray-900">
                        Iniciar Carregamento
                      </p>
                      <p className="text-xs text-gray-600">
                        MB-7890-IJ • 10:30
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm font-medium text-gray-900">
                        Resolver Atraso
                      </p>
                      <p className="text-xs text-gray-600">
                        CRG-028 • +3 horas
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm font-medium text-gray-900">
                        Emitir Comprovante
                      </p>
                      <p className="text-xs text-gray-600">
                        CRG-042 • Entregue
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Registro de Carregamento */}
        {activeCarregadaForm === "carregamento" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                      ⬆️
                    </span>
                    Registro de Carregamento
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Caminhão *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                          <option value="">Selecione o caminhão</option>
                          <option value="MB-1234-AB">MB-1234-AB</option>
                          <option value="MB-5678-CD">MB-5678-CD</option>
                          <option value="MB-9012-EF">MB-9012-EF</option>
                          <option value="MB-3456-GH">MB-3456-GH</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Motorista *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                          <option value="">Selecione o motorista</option>
                          <option value="1">João Maputo</option>
                          <option value="2">Carlos Beira</option>
                          <option value="3">António Nampula</option>
                          <option value="4">Pedro Matola</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Carga a Ser Carregada *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                          <option value="">Selecione a carga</option>
                          <option value="CRG-001">
                            CRG-001 - Maputo → Nampula
                          </option>
                          <option value="CRG-015">
                            CRG-015 - Porto → Matola
                          </option>
                          <option value="CRG-028">
                            CRG-028 - Beira → Chimoio
                          </option>
                          <option value="CRG-042">
                            CRG-042 - Maputo → Marracuene
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Local de Carregamento *
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="Ex: Porto Maputo - Cais 3"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data/Hora Início *
                        </label>
                        <input
                          type="datetime-local"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data/Hora Término
                        </label>
                        <input
                          type="datetime-local"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status do Carregamento
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                          <option value="agendado">Agendado</option>
                          <option value="em_andamento">Em Andamento</option>
                          <option value="concluido">Concluído</option>
                          <option value="suspenso">Suspenso</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Verificação de Carga
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <label className="text-sm text-gray-700">
                            Peso conferido
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <label className="text-sm text-gray-700">
                            Embalagem íntegra
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <label className="text-sm text-gray-700">
                            Documentação OK
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <label className="text-sm text-gray-700">
                            Lacres aplicados
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <label className="text-sm text-gray-700">
                            Amarração correta
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <label className="text-sm text-gray-700">
                            Temperatura controlada
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Observações do Carregamento
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        placeholder="Observações sobre o carregamento..."
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
                        Registrar Carregamento
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Painel de Informações */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Informações da Carga
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Origem → Destino:</span>
                    <p className="font-medium text-gray-950">
                      Maputo → Nampula
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Tipo de Carga:</span>
                    <p className="font-medium text-gray-950">
                      Cimento • 25 ton
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Embalagem:</span>
                    <p className="font-medium text-gray-950">
                      Contentor 40ft
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Cliente:</span>
                    <p className="font-medium text-gray-950">
                      Construma Lda
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Valor do Frete:</span>
                    <p className="font-medium text-gray-950">MT 45.000</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Próximos Carregamentos
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-gray-950">
                      MB-7890-IJ
                    </p>
                    <p className="text-xs text-gray-600">
                      10:30 • Porto Maputo
                    </p>
                    <p className="text-xs text-blue-600 font-medium">
                      Produtos Perecíveis
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-gray-950">
                      MB-2468-KL
                    </p>
                    <p className="text-xs text-gray-600">14:00 • Matola</p>
                    <p className="text-xs text-blue-600 font-medium">
                      Material Construção
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Documentos do Carregamento */}
        {activeCarregadaForm === "documentos" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-green-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-green-500 text-white p-2 rounded-lg mr-2">
                  📑
                </span>
                Gestão de Documentos do Carregamento
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Carga Carregada
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950">
                    <option value="">Selecione a carga</option>
                    <option value="CRG-001">CRG-001 - MB-1234-AB</option>
                    <option value="CRG-015">CRG-015 - MB-5678-CD</option>
                    <option value="CRG-028">CRG-028 - MB-9012-EF</option>
                    <option value="CRG-042">CRG-042 - MB-3456-GH</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Documento
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950">
                    <option value="todos">Todos os Documentos</option>
                    <option value="conhecimento">
                      Conhecimento de Carga
                    </option>
                    <option value="fatura">Fatura Comercial</option>
                    <option value="checklist">
                      Checklist de Carregamento
                    </option>
                    <option value="fotos">Fotos da Carga</option>
                  </select>
                </div>
              </div>

              {/* Lista de Documentos */}
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-500 text-white p-2 rounded-lg">
                        📄
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          Conhecimento de Carga - CRG-001
                        </p>
                        <p className="text-sm text-gray-600">
                          BL-2024-001 • Emitido: 15/01/2024 08:45
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Visualizar
                      </button>
                      <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                        Download
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-500 text-white p-2 rounded-lg">
                        ✅
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          Checklist de Carregamento - CRG-001
                        </p>
                        <p className="text-sm text-gray-600">
                          Completo • Assinado: João Maputo
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Visualizar
                      </button>
                      <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                        Download
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-500 text-white p-2 rounded-lg">
                        📷
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          Fotos da Carga Carregada - CRG-001
                        </p>
                        <p className="text-sm text-gray-600">
                          8 fotos • Tiradas: 15/01/2024 09:20
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Visualizar
                      </button>
                      <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload de Novos Documentos */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Adicionar Novo Documento
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Documento
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                      <option>Conhecimento de Carga</option>
                      <option>Factura Comercial</option>
                      <option>Checklist</option>
                      <option>Foto</option>
                      <option>Outro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Arquivo
                    </label>
                    <input
                      type="file"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    />
                  </div>
                </div>
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                  Upload Documento
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Gráficos */}
        {activeCarregadaForm === "graficos" && (
          <div className="space-y-6 text-gray-950">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                    📈
                  </span>
                  Dashboard de Cargas Carregadas - Métricas e Estatísticas
                </h3>
              </div>
              <div className="p-6">
                {/* Grid de Gráficos Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Status das Cargas Carregadas */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-blue-500 mr-2">📊</span>
                      Status das Cargas Carregadas
                    </h4>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center w-full">
                        <div className="flex justify-center mb-4">
                          <div className="relative w-32 h-32">
                            <div
                              className="w-full h-full rounded-full"
                              style={{
                                background:
                                  "conic-gradient(#10b981 0% 75%, #3b82f6 75% 88%, #f59e0b 88% 92%, #ef4444 92% 100%)",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                            <span>Em Trânsito (75%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                            <span>Carregando (13%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                            <span>Entregue (4%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                            <span>Atrasado (8%)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Cargas Carregadas por Dia - Barras Empilhadas */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-green-500 mr-2">📦</span>
                      Cargas Carregadas (Últimos 7 Dias)
                    </h4>

                    <div className="h-64 flex items-end justify-between space-x-2">
                      {[
                        { day: "Seg", carregadas: 12, entregues: 8 },
                        { day: "Ter", carregadas: 15, entregues: 10 },
                        { day: "Qua", carregadas: 18, entregues: 12 },
                        { day: "Qui", carregadas: 14, entregues: 9 },
                        { day: "Sex", carregadas: 20, entregues: 15 },
                        { day: "Sáb", carregadas: 8, entregues: 6 },
                        { day: "Dom", carregadas: 5, entregues: 4 },
                      ].map((item, index) => {
                        const total = item.carregadas + item.entregues;
                        return (
                          <div
                            key={index}
                            className="flex flex-col items-center flex-1 h-full"
                          >
                            <div className="flex flex-col justify-end h-full w-3/4 rounded-t-lg overflow-hidden">
                              {/* Carregadas */}
                              <div
                                className="bg-blue-400 w-full transition-all hover:opacity-80"
                                style={{
                                  height: `${
                                    (item.carregadas / total) * 100
                                  }%`,
                                }}
                                title={`Carregadas: ${item.carregadas}`}
                              ></div>
                              {/* Entregues */}
                              <div
                                className="bg-green-400 w-full transition-all hover:opacity-80"
                                style={{
                                  height: `${
                                    (item.entregues / total) * 100
                                  }%`,
                                }}
                                title={`Entregues: ${item.entregues}`}
                              ></div>
                            </div>
                            <span className="text-xs mt-2 font-medium">
                              {item.day}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Legenda */}
                    <div className="flex justify-center space-x-4 mt-4 text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-400 rounded mr-1"></div>
                        <span>Carregadas</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded mr-1"></div>
                        <span>Entregues</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Segunda Linha de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {/* Gráfico de Eficiência por Caminhão */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-purple-500 mr-2">🚛</span>
                      Eficiência por Caminhão
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            caminhao: "MB-1234-AB",
                            eficiencia: 94,
                            cargas: 8,
                            color: "bg-green-500",
                            percentage: 94,
                          },
                          {
                            caminhao: "MB-5678-CD",
                            eficiencia: 87,
                            cargas: 6,
                            color: "bg-blue-500",
                            percentage: 87,
                          },
                          {
                            caminhao: "MB-9012-EF",
                            eficiencia: 78,
                            cargas: 5,
                            color: "bg-yellow-500",
                            percentage: 78,
                          },
                          {
                            caminhao: "MB-3456-GH",
                            eficiencia: 92,
                            cargas: 7,
                            color: "bg-purple-500",
                            percentage: 92,
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
                                  {item.caminhao}
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
                                <span>{item.cargas} cargas</span>
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

                  {/* Gráfico de Tipos de Carga Carregada */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-orange-500 mr-2">📦</span>
                      Tipos de Carga Carregada
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            tipo: "Contentor 40ft",
                            quantidade: 12,
                            color: "bg-blue-500",
                            percentage: 35,
                            icon: "📦",
                          },
                          {
                            tipo: "Carga Fracionada",
                            quantidade: 10,
                            color: "bg-green-500",
                            percentage: 29,
                            icon: "📋",
                          },
                          {
                            tipo: "Material Construção",
                            quantidade: 8,
                            color: "bg-orange-500",
                            percentage: 24,
                            icon: "🏗️",
                          },
                          {
                            tipo: "Perecível",
                            quantidade: 4,
                            color: "bg-cyan-500",
                            percentage: 12,
                            icon: "❄️",
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

                  {/* Gráfico de Tempos de Carregamento */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-cyan-500 mr-2">⏱️</span>
                      Tempos Médios de Carregamento
                    </h4>
                    <div className="h-48 space-y-4">
                      {[
                        {
                          tipo: "Contentor 40ft",
                          tempo: 120,
                          meta: 90,
                          color: "bg-blue-500",
                        },
                        {
                          tipo: "Carga Fracionada",
                          tempo: 45,
                          meta: 60,
                          color: "bg-green-500",
                        },
                        {
                          tipo: "Material Construção",
                          tempo: 75,
                          meta: 80,
                          color: "bg-orange-500",
                        },
                        {
                          tipo: "Perecível",
                          tempo: 90,
                          meta: 75,
                          color: "bg-cyan-500",
                        },
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-medium">{item.tipo}</span>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-gray-700">
                                {item.tempo}min
                              </span>
                              <span
                                className={`text-xs ${
                                  item.tempo <= item.meta
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {item.tempo <= item.meta ? "✓" : "✗"} Meta:{" "}
                                {item.meta}min
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full ${item.color} transition-all duration-500`}
                              style={{
                                width: `${Math.min(
                                  (item.tempo / 150) * 100,
                                  100
                                )}%`,
                              }}
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
                      Total Carregadas
                    </p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600 font-medium">
                      Taxa Entrega
                    </p>
                    <p className="text-2xl font-bold text-gray-900">92%</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <p className="text-sm text-amber-600 font-medium">
                      Tempo Médio
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      78min
                    </p>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                    <p className="text-sm text-cyan-600 font-medium">
                      Cargas/Dia
                    </p>
                    <p className="text-2xl font-bold text-gray-900">13</p>
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
                        <option>Últimos 7 dias</option>
                        <option>Este Mês</option>
                        <option>Últimos 30 dias</option>
                        <option>Este Ano</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos</option>
                        <option>Em Trânsito</option>
                        <option>Carregando</option>
                        <option>Entregue</option>
                        <option>Atrasado</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Caminhão
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos</option>
                        <option>MB-1234-AB</option>
                        <option>MB-5678-CD</option>
                        <option>MB-9012-EF</option>
                        <option>MB-3456-GH</option>
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
                        <option>Material Construção</option>
                        <option>Perecível</option>
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

        {/* Relatórios de Carregamento */}
        {activeCarregadaForm === "relatorios" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-purple-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-purple-500 text-white p-2 rounded-lg mr-2">
                  📈
                </span>
                Relatórios de Cargas Carregadas
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-blue-600 text-lg mb-2">📊</div>
                  <p className="font-medium text-gray-900">
                    Relatório Diário
                  </p>
                  <p className="text-sm text-gray-600">
                    Carregamentos do dia
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-green-600 text-lg mb-2">🚛</div>
                  <p className="font-medium text-gray-900">Por Caminhão</p>
                  <p className="text-sm text-gray-600">
                    Desempenho por veículo
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-orange-600 text-lg mb-2">⏱️</div>
                  <p className="font-medium text-gray-900">Tempos</p>
                  <p className="text-sm text-gray-600">
                    Eficiência do carregamento
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-red-600 text-lg mb-2">⚠️</div>
                  <p className="font-medium text-gray-900">Incidentes</p>
                  <p className="text-sm text-gray-600">
                    Problemas e atrasos
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
                      <option>Relatório de Eficiência</option>
                      <option>Carregamentos por Motorista</option>
                      <option>Tempos Médios de Carregamento</option>
                      <option>Incidentes e Atrasos</option>
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
                <button className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-purple-600 font-medium">
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

export default CargaCarregada;