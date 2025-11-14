import React, { useState } from 'react';

const CargaEmCurso = () => {
  const [activeCursoForm, setActiveCursoForm] = useState("monitoramento");

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            🚚
          </span>
          Carga em Curso - Monitoramento de Cargas em Andamento
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Acompanhamento em tempo real de cargas em trânsito e em processo
          de entrega
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação entre Formulários */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveCursoForm("monitoramento")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCursoForm === "monitoramento"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📍 Monitoramento
          </button>
          <button
            onClick={() => setActiveCursoForm("alertas")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCursoForm === "alertas"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ⚠️ Alertas
          </button>
          <button
            onClick={() => setActiveCursoForm("rotas")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCursoForm === "rotas"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🛣️ Rotas
          </button>
          <button
            onClick={() => setActiveCursoForm("graficos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCursoForm === "graficos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Gráficos
          </button>
          <button
            onClick={() => setActiveCursoForm("relatorios")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCursoForm === "relatorios"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Relatórios
          </button>
        </div>

        {/* Monitoramento em Tempo Real */}
        {activeCursoForm === "monitoramento" && (
          <div className="space-y-6">
            {/* Métricas Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    72% no prazo
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Em Entrega
                    </p>
                    <p className="text-2xl font-bold text-gray-900">6</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">📦</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    4 locais
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Atrasados
                    </p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">⚠️</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    Necessitam acção
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Entregues Hoje
                    </p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">✅</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    100% satisfação
                  </span>
                </div>
              </div>
            </div>

            {/* Grid Principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Mapa e Lista de Cargas */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4 border-b border-gray-200 bg-sky-50">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <span className="bg-sky-500 text-white p-2 rounded-lg mr-2">
                        🗺️
                      </span>
                      Mapa de Monitoramento - Cargas em Curso
                    </h3>
                  </div>
                  <div className="p-6">
                    {/* Mapa Simulado */}
                    <div className="bg-gray-100 rounded-xl h-80 flex items-center justify-center border-2 border-dashed border-gray-300 relative mb-6">
                      <div className="text-center">
                        <div className="text-6xl mb-4 text-gray-400">
                          🗺️
                        </div>
                        <span className="text-gray-500 font-medium text-lg">
                          Mapa de Cargas em Curso
                        </span>
                        <p className="text-sm text-gray-400 mt-2">
                          24 cargas em andamento • 18 em trânsito
                        </p>
                      </div>

                      {/* Marcadores no Mapa */}
                      <div className="absolute top-1/4 left-1/4">
                        <div className="bg-blue-500 text-white p-2 rounded-lg shadow-lg flex items-center">
                          <span className="text-sm">🚛 CRG-001</span>
                        </div>
                      </div>
                      <div className="absolute top-1/3 right-1/3">
                        <div className="bg-blue-500 text-white p-2 rounded-lg shadow-lg flex items-center">
                          <span className="text-sm">🚛 CRG-015</span>
                        </div>
                      </div>
                      <div className="absolute bottom-1/4 left-1/3">
                        <div className="bg-blue-500 text-white p-2 rounded-lg shadow-lg flex items-center">
                          <span className="text-sm">🚛 CRG-028</span>
                        </div>
                      </div>
                    </div>

                    {/* Lista de Cargas em Curso */}
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
                                NO PRAZO
                              </span>
                              <span className="text-sm text-gray-600">
                                65% concluído
                              </span>
                            </div>
                            <p className="font-medium text-gray-900">
                              MB-1234-AB • Maputo → Nampula
                            </p>
                            <p className="text-sm text-gray-600">
                              Cimento • 25 ton • João Maputo
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span>📍 EN1 - Xai-Xai</span>
                              <span>⏰ Previsão: Hoje 18:00</span>
                              <span>📞 +258 84 123 4567</span>
                              <span>🚛 68 km/h</span>
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
                                CRG-028
                              </span>
                              <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                                PEQUENO ATRASO
                              </span>
                              <span className="text-sm text-gray-600">
                                45% concluído
                              </span>
                            </div>
                            <p className="font-medium text-gray-900">
                              MB-9012-EF • Beira → Chimoio
                            </p>
                            <p className="text-sm text-gray-600">
                              Material Construção • 18 ton • António Nampula
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span>📍 EN6 - Inchope</span>
                              <span>⏰ Previsão: +2 horas</span>
                              <span>📞 +258 84 345 6789</span>
                              <span>🚛 55 km/h</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-blue-600">
                              +2 horas
                            </p>
                            <button className="mt-2 px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-sky-600">
                              Detalhes
                            </button>
                          </div>
                        </div>
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
                      🟢 No Prazo
                    </button>
                    <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950">
                      🟡 Pequeno Atraso
                    </button>
                    <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950">
                      🔴 Atrasados Críticos
                    </button>
                    <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950">
                      🔵 Próximos do Destino
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Estatísticas em Tempo Real
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Velocidade Média:
                      </span>
                      <span className="font-semibold text-gray-950">
                        62 km/h
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Distância Total:
                      </span>
                      <span className="font-semibold text-gray-950">
                        1.845 km
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tempo Médio:</span>
                      <span className="font-semibold text-gray-950">
                        8h 24min
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Combustível Médio:
                      </span>
                      <span className="font-semibold text-gray-950">
                        3.1 km/L
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Ações Imediatas
                  </h4>
                  <div className="space-y-2">
                    <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950">
                      🚨 Reportar Problema
                    </button>
                    <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950">
                      📞 Contactar Motorista
                    </button>
                    <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950">
                      📋 Atualizar Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alertas e Incidentes */}
        {activeCursoForm === "alertas" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-blue-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                  ⚠️
                </span>
                Alertas e Incidentes - Cargas em Curso
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nível de Alerta
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                    <option value="todos">Todos os Alertas</option>
                    <option value="critico">Crítico</option>
                    <option value="alto">Alto</option>
                    <option value="medio">Médio</option>
                    <option value="baixo">Baixo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Incidente
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                    <option value="todos">Todos os Tipos</option>
                    <option value="atraso">Atraso</option>
                    <option value="veiculo">Problema no Veículo</option>
                    <option value="carga">Problema na Carga</option>
                    <option value="rota">Desvio de Rota</option>
                    <option value="motorista">
                      Problema com Motorista
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
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
                          ATRASO CRÍTICO - +4 horas
                        </p>
                        <p className="text-sm text-gray-600">
                          CRG-028 • MB-9012-EF • Beira → Chimoio
                        </p>
                        <p className="text-xs text-blue-600 font-medium">
                          Problema mecânico • Necessita assistência
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                        Resolver
                      </button>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Detalhes
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
                          DESVIO DE ROTA NÃO AUTORIZADO
                        </p>
                        <p className="text-sm text-gray-600">
                          CRG-042 • MB-3456-GH • Maputo → Marracuene
                        </p>
                        <p className="text-xs text-blue-600 font-medium">
                          Fora da rota planeada • Contactar motorista
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                        Resolver
                      </button>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Detalhes
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
                          TEMPERATURA FORA DOS LIMITES
                        </p>
                        <p className="text-sm text-gray-600">
                          CRG-015 • MB-5678-CD • Produtos Perecíveis
                        </p>
                        <p className="text-xs text-blue-600 font-medium">
                          +2°C acima do limite • Verificar sistema de
                          refrigeração
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                        Resolver
                      </button>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Detalhes
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Novo Incidente */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Reportar Novo Incidente
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Carga Afetada
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                      <option value="">Selecione a carga</option>
                      <option value="CRG-001">CRG-001 - MB-1234-AB</option>
                      <option value="CRG-015">CRG-015 - MB-5678-CD</option>
                      <option value="CRG-028">CRG-028 - MB-9012-EF</option>
                      <option value="CRG-042">CRG-042 - MB-3456-GH</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Incidente
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                      <option value="atraso">Atraso</option>
                      <option value="veiculo">Problema no Veículo</option>
                      <option value="carga">Problema na Carga</option>
                      <option value="rota">Desvio de Rota</option>
                      <option value="motorista">
                        Problema com Motorista
                      </option>
                    </select>
                  </div>
                </div>
                <button className="mt-4 px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-orange-600 font-medium">
                  Reportar Incidente
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Gestão de Rotas */}
        {activeCursoForm === "rotas" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                      🛣️
                    </span>
                    Gestão de Rotas - Cargas em Curso
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Carga em Curso *
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
                          Tipo de Ajuste
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                          <option value="otimizacao">Otimização</option>
                          <option value="desvio">Desvio Emergencial</option>
                          <option value="parada">Parada Adicional</option>
                          <option value="cancelamento">
                            Cancelar Parada
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ponto de Origem
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="Local atual"
                          value="EN1 - Xai-Xai"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ponto de Destino
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="Destino final"
                          value="Nampula"
                          readOnly
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nova Rota Sugerida
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        placeholder="Descreva a nova rota ou ajustes..."
                        defaultValue="Manter EN1 até Inchope, depois EN7 até Nampula. Evitar EN6 devido a obras."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tempo Estimado (horas)
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="0"
                          defaultValue="10"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Distância Estimada (km)
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="0"
                          defaultValue="245"
                        />
                      </div>
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
                        Aplicar Ajuste de Rota
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Painel de Informações da Rota */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Status da Rota Atual
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Progresso:</span>
                    <p className="font-medium text-gray-950">
                      65% concluído
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Tempo Decorrido:</span>
                    <p className="font-medium text-gray-950">6h 30min</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Tempo Restante:</span>
                    <p className="font-medium text-gray-950">3h 30min</p>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      Distância Percorrida:
                    </span>
                    <p className="font-medium text-gray-950">158 km</p>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      Distância Restante:
                    </span>
                    <p className="font-medium text-gray-950">87 km</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Próximos Pontos
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded">
                    <span className="text-blue-500">✅</span>
                    <span className="text-sm text-gray-950">
                      Maputo (Início)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded">
                    <span className="text-blue-500">📍</span>
                    <span className="text-sm text-gray-950">
                      Xai-Xai (Atual)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded">
                    <span className="text-blue-500">⏭️</span>
                    <span className="text-sm text-gray-950">
                      Inchope (Próximo)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded">
                    <span className="text-blue-500">⏭️</span>
                    <span className="text-sm text-gray-950">
                      Nampula (Destino)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gráficos */}
        {activeCursoForm === "graficos" && (
          <div className="space-y-6 text-gray-950">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                    📊
                  </span>
                  Dashboard de Cargas em Curso - Métricas e Estatísticas
                </h3>
              </div>
              <div className="p-6">
                {/* Grid de Gráficos Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Status das Cargas em Curso */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-blue-500 mr-2">🚚</span>
                      Status das Cargas em Curso
                    </h4>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center w-full">
                        <div className="flex justify-center mb-4">
                          <div className="relative w-32 h-32">
                            <div
                              className="w-full h-full rounded-full"
                              style={{
                                background:
                                  "conic-gradient(#10b981 0% 65%, #3b82f6 65% 85%, #f59e0b 85% 95%, #ef4444 95% 100%)",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                            <span>No Prazo (65%) - 15 cargas</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                            <span>Em Trânsito (20%) - 5 cargas</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                            <span>Pequeno Atraso (10%) - 2 cargas</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                            <span>Atrasado (5%) - 1 carga</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Progresso por Rota - Barras Empilhadas */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-red-500 mr-2">🛣️</span>
                      Progresso por Rota (Últimas 24h)
                    </h4>

                    <div className="h-64 flex items-end justify-between space-x-2">
                      {[
                        {
                          rota: "Maputo→Nampula",
                          progresso: 65,
                          restante: 35,
                          tempo: "6h30m",
                          color: "bg-blue-500",
                        },
                        {
                          rota: "Beira→Chimoio",
                          progresso: 45,
                          restante: 55,
                          tempo: "4h15m",
                          color: "bg-green-500",
                        },
                        {
                          rota: "Matola→Marracuene",
                          progresso: 80,
                          restante: 20,
                          tempo: "1h45m",
                          color: "bg-purple-500",
                        },
                        {
                          rota: "Maputo→Xai-Xai",
                          progresso: 30,
                          restante: 70,
                          tempo: "2h20m",
                          color: "bg-orange-500",
                        },
                        {
                          rota: "Nampula→Pemba",
                          progresso: 55,
                          restante: 45,
                          tempo: "5h10m",
                          color: "bg-cyan-500",
                        },
                      ].map((item, index) => {
                        const total = item.progresso + item.restante;
                        return (
                          <div
                            key={index}
                            className="flex flex-col items-center flex-1 h-full"
                          >
                            <div className="flex flex-col justify-end h-full w-3/4 rounded-t-lg overflow-hidden">
                              {/* Progresso */}
                              <div
                                className={`${item.color} w-full transition-all hover:opacity-80`}
                                style={{
                                  height: `${
                                    (item.progresso / total) * 100
                                  }%`,
                                }}
                                title={`Progresso: ${item.progresso}%`}
                              ></div>
                              {/* Restante */}
                              <div
                                className="bg-gray-200 w-full transition-all hover:opacity-80"
                                style={{
                                  height: `${
                                    (item.restante / total) * 100
                                  }%`,
                                }}
                                title={`Restante: ${item.restante}%`}
                              ></div>
                            </div>
                            <span className="text-xs mt-2 font-medium text-center">
                              {item.rota}
                            </span>
                            <span className="text-xs text-gray-500">
                              {item.progresso}%
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Legenda */}
                    <div className="flex justify-center space-x-4 mt-4 text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
                        <span>Progresso</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-gray-200 rounded mr-1"></div>
                        <span>Restante</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Segunda Linha de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {/* Gráfico de Velocidade Média por Rota */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-purple-500 mr-2">🚀</span>
                      Velocidade Média por Rota (km/h)
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            rota: "Maputo → Nampula",
                            velocidade: 68,
                            meta: 70,
                            color: "bg-blue-500",
                            icon: "🛣️",
                          },
                          {
                            rota: "Beira → Chimoio",
                            velocidade: 55,
                            meta: 60,
                            color: "bg-green-500",
                            icon: "🏔️",
                          },
                          {
                            rota: "Matola → Marracuene",
                            velocidade: 45,
                            meta: 50,
                            color: "bg-purple-500",
                            icon: "🏙️",
                          },
                          {
                            rota: "Maputo → Xai-Xai",
                            velocidade: 72,
                            meta: 75,
                            color: "bg-orange-500",
                            icon: "🌊",
                          },
                          {
                            rota: "Nampula → Pemba",
                            velocidade: 60,
                            meta: 65,
                            color: "bg-cyan-500",
                            icon: "🌴",
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
                                  {item.rota}
                                </span>
                                <span className="text-sm font-bold text-gray-700 ml-2 whitespace-nowrap flex-shrink-0">
                                  {item.velocidade} km/h
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${item.color}`}
                                  style={{
                                    width: `${
                                      (item.velocidade / 80) * 100
                                    }%`,
                                  }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1 flex justify-between">
                                <span>Meta: {item.meta} km/h</span>
                                <span
                                  className={`font-medium ${
                                    item.velocidade >= item.meta
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {item.velocidade >= item.meta ? "✓" : "✗"}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Combustível por Veículo */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-green-500 mr-2">⛽</span>
                      Eficiência de Combustível (km/L)
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            veiculo: "MB-1234-AB",
                            eficiencia: 3.2,
                            meta: 3.0,
                            cor: "bg-blue-500",
                            motorista: "João Maputo",
                          },
                          {
                            veiculo: "MB-5678-CD",
                            eficiencia: 2.8,
                            meta: 3.0,
                            cor: "bg-green-500",
                            motorista: "Carlos Beira",
                          },
                          {
                            veiculo: "MB-9012-EF",
                            eficiencia: 3.5,
                            meta: 3.0,
                            cor: "bg-cyan-500",
                            motorista: "António Nampula",
                          },
                          {
                            veiculo: "MB-3456-GH",
                            eficiencia: 2.9,
                            meta: 3.0,
                            cor: "bg-purple-500",
                            motorista: "Miguel Matola",
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <div
                              className={`w-3 h-3 rounded-full ${item.cor} mt-1.5 flex-shrink-0`}
                            ></div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-1">
                                <span className="text-sm font-medium text-gray-900 break-words">
                                  {item.veiculo}
                                </span>
                                <span className="text-sm font-bold text-gray-700 ml-2 whitespace-nowrap flex-shrink-0">
                                  {item.eficiencia} km/L
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${item.cor}`}
                                  style={{
                                    width: `${
                                      (item.eficiencia / 4) * 100
                                    }%`,
                                  }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1 flex justify-between">
                                <span>{item.motorista}</span>
                                <span
                                  className={`font-medium ${
                                    item.eficiencia >= item.meta
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {item.eficiencia >= item.meta ? "✓" : "✗"}{" "}
                                  Meta: {item.meta} km/L
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Incidentes por Tipo */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-amber-500 mr-2">⚠️</span>
                      Incidentes por Tipo (Últimos 7 Dias)
                    </h4>
                    <div className="h-48 space-y-4">
                      {[
                        {
                          tipo: "Atrasos",
                          quantidade: 12,
                          cor: "bg-yellow-500",
                          tendencia: "+2",
                        },
                        {
                          tipo: "Problemas Mecânicos",
                          quantidade: 8,
                          cor: "bg-orange-500",
                          tendencia: "-1",
                        },
                        {
                          tipo: "Desvios de Rota",
                          quantidade: 5,
                          cor: "bg-red-500",
                          tendencia: "+3",
                        },
                        {
                          tipo: "Problemas com Carga",
                          quantidade: 3,
                          cor: "bg-purple-500",
                          tendencia: "0",
                        },
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-medium">{item.tipo}</span>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-gray-700">
                                {item.quantidade}
                              </span>
                              <span
                                className={`text-xs ${
                                  item.tendencia === "0"
                                    ? "text-gray-600"
                                    : item.tendencia.startsWith("+")
                                    ? "text-red-600"
                                    : "text-green-600"
                                }`}
                              >
                                {item.tendencia !== "0" && item.tendencia}
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full ${item.cor} transition-all duration-500`}
                              style={{
                                width: `${(item.quantidade / 15) * 100}%`,
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
                      Cargas em Andamento
                    </p>
                    <p className="text-2xl font-bold text-gray-900">23</p>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                    <p className="text-sm text-cyan-600 font-medium">
                      Velocidade Média
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      62 km/h
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600 font-medium">
                      No Prazo
                    </p>
                    <p className="text-2xl font-bold text-gray-900">78%</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <p className="text-sm text-amber-600 font-medium">
                      Combustível Médio
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      3.1 km/L
                    </p>
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
                        <option>Últimas 24 horas</option>
                        <option>Últimos 7 dias</option>
                        <option>Este Mês</option>
                        <option>Personalizado</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos</option>
                        <option>No Prazo</option>
                        <option>Em Trânsito</option>
                        <option>Pequeno Atraso</option>
                        <option>Atrasado</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rota
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todas</option>
                        <option>Maputo → Nampula</option>
                        <option>Beira → Chimoio</option>
                        <option>Matola → Marracuene</option>
                        <option>Maputo → Xai-Xai</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Motorista
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos</option>
                        <option>João Maputo</option>
                        <option>Carlos Beira</option>
                        <option>António Nampula</option>
                        <option>Miguel Matola</option>
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

        {/* Relatórios de Performance */}
        {activeCursoForm === "relatorios" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-blue-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                  📈
                </span>
                Relatórios de Performance - Cargas em Curso
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-blue-600 text-lg mb-2">⏱️</div>
                  <p className="font-medium text-gray-900">Tempos</p>
                  <p className="text-sm text-gray-600">
                    Eficiência de viagem
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-green-600 text-lg mb-2">🚛</div>
                  <p className="font-medium text-gray-900">Desempenho</p>
                  <p className="text-sm text-gray-600">
                    Por veículo/motorista
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-orange-600 text-lg mb-2">⚠️</div>
                  <p className="font-medium text-gray-900">Incidentes</p>
                  <p className="text-sm text-gray-600">
                    Alertas e problemas
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-red-600 text-lg mb-2">📊</div>
                  <p className="font-medium text-gray-900">Consolidado</p>
                  <p className="text-sm text-gray-600">Visão geral</p>
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
                      <option>Performance por Motorista</option>
                      <option>Análise de Atrasos</option>
                      <option>Consumo de Combustível</option>
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
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
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

export default CargaEmCurso;