export const GPSCaminhoesPanel = ({ activeGPSForm, setActiveGPSForm }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-red-500 text-white p-2 rounded-lg mr-3">
            🚛
          </span>
          GPS Camiões - Monitoramento de Caminhões
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Rastreamento em tempo real, rotas, alertas e gestão da frota
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação entre Formulários */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveGPSForm("monitoramento")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeGPSForm === "monitoramento"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🗺️ Monitoramento
          </button>
          <button
            onClick={() => setActiveGPSForm("rotas")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeGPSForm === "rotas"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🛣️ Rotas
          </button>
          <button
            onClick={() => setActiveGPSForm("alertas")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeGPSForm === "alertas"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ⚠️ Alertas
          </button>
          <button
            onClick={() => setActiveGPSForm("graficos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeGPSForm === "graficos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Gráficos
          </button>
          <button
            onClick={() => setActiveGPSForm("relatorios")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeGPSForm === "relatorios"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Relatórios
          </button>
        </div>

        {/* Monitoramento em Tempo Real */}
        {activeGPSForm === "monitoramento" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-red-50">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-red-500 text-white p-2 rounded-lg mr-2">
                      🗺️
                    </span>
                    Mapa de Monitoramento - Tempo Real
                  </h3>
                </div>
                <div className="p-6">
                  {/* Mapa Simulado */}
                  <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center border-2 border-dashed border-gray-300 relative">
                    <div className="text-center">
                      <div className="text-6xl mb-4 text-gray-400">🗺️</div>
                      <span className="text-gray-500 font-medium text-lg">
                        Mapa de Rastreamento - Caminhões
                      </span>
                      <p className="text-sm text-gray-400 mt-2">
                        12 caminhões em operação • 8 em trânsito
                      </p>
                    </div>

                    {/* Marcadores de Caminhões no Mapa */}
                    <div className="absolute top-1/4 left-1/4">
                      <div className="bg-blue-500 text-white p-2 rounded-lg shadow-lg flex items-center">
                        <span className="text-sm">🚛 MB-1234</span>
                      </div>
                    </div>
                    <div className="absolute top-1/3 right-1/3">
                      <div className="bg-blue-500 text-white p-2 rounded-lg shadow-lg flex items-center">
                        <span className="text-sm">🚛 MB-5678</span>
                      </div>
                    </div>
                    <div className="absolute bottom-1/4 left-1/3">
                      <div className="bg-blue-500 text-white p-2 rounded-lg shadow-lg flex items-center">
                        <span className="text-sm">🚛 MB-9012</span>
                      </div>
                    </div>
                  </div>

                  {/* Controles do Mapa */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Filtrar por Status
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950">
                        <option value="todos">Todos os Caminhões</option>
                        <option value="em_movimento">Em Movimento</option>
                        <option value="parado">Parados</option>
                        <option value="offline">Offline</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Filtrar por Região
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950">
                        <option value="todos">Todas as Regiões</option>
                        <option value="maputo">Maputo</option>
                        <option value="sul">Sul do País</option>
                        <option value="centro">Centro</option>
                        <option value="norte">Norte</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Atualização
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950">
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
                  Status da Frota
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200 text-gray-950">
                    <span className="text-sm font-medium">
                      Em Movimento
                    </span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                      8
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200 text-gray-950">
                    <span className="text-sm font-medium">Parados</span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                      3
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200 text-gray-950">
                    <span className="text-sm font-medium">Offline</span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                      1
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-950">
                    <span className="text-sm font-medium">Manutenção</span>
                    <span className="bg-gray-500 text-white px-2 py-1 rounded text-sm font-bold">
                      2
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Alertas Activos
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2 p-2 bg-yellow-50 rounded-lg">
                    <span className="text-yellow-600 mt-0.5">⚠️</span>
                    <div>
                      <p className="text-sm font-medium text-gray-950">
                        Excesso de Velocidade
                      </p>
                      <p className="text-xs text-gray-600">
                        MB-1234 • Maputo
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-2 bg-red-50 rounded-lg">
                    <span className="text-red-600 mt-0.5">🔴</span>
                    <div>
                      <p className="text-sm font-medium text-gray-950">
                        Motorista Inativo
                      </p>
                      <p className="text-xs text-gray-600">
                        MB-5678 • 45 minutos
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-2 bg-blue-50 rounded-lg">
                    <span className="text-blue-600 mt-0.5">ℹ️</span>
                    <div>
                      <p className="text-sm font-medium text-gray-950">
                        Rota Alterada
                      </p>
                      <p className="text-xs text-gray-600">
                        MB-9012 • Beira
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gestão de Rotas */}
        {activeGPSForm === "rotas" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                      🛣️
                    </span>
                    Planejamento e Gestão de Rotas
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
                          <option value="1">MB-1234-AB</option>
                          <option value="2">MB-5678-CD</option>
                          <option value="3">MB-9012-EF</option>
                          <option value="4">MB-3456-GH</option>
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
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Origem *
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="Local de partida"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Destino *
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="Local de destino"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data de Partida *
                        </label>
                        <input
                          type="datetime-local"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data Prevista de Chegada
                        </label>
                        <input
                          type="datetime-local"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
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
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pontos de Parada
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        placeholder="Liste os pontos de parada planejados..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Rota
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                          <option value="mais_rapida">Mais Rápida</option>
                          <option value="mais_economica">
                            Mais Econômica
                          </option>
                          <option value="evitar_pedagio">
                            Evitar Pedágio
                          </option>
                          <option value="caminhoes">
                            Rota para Caminhões
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status da Rota
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                          <option value="planejada">Planejada</option>
                          <option value="em_andamento">Em Andamento</option>
                          <option value="concluida">Concluída</option>
                          <option value="cancelada">Cancelada</option>
                        </select>
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
                        Salvar Rota
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Painel de Rotas Ativas */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Rotas em Andamento
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-gray-950">
                      MB-1234-AB
                    </p>
                    <p className="text-xs text-gray-600">
                      Maputo → Beira • 65% concluído
                    </p>
                    <p className="text-xs text-blue-600 font-medium">
                      No prazo
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-gray-950">
                      MB-5678-CD
                    </p>
                    <p className="text-xs text-gray-600">
                      Nampula → Pemba • 45% concluído
                    </p>
                    <p className="text-xs text-blue-600 font-medium">
                      Pequeno atraso
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-gray-950">
                      MB-9012-EF
                    </p>
                    <p className="text-xs text-gray-600">
                      Beira → Chimoio • 20% concluído
                    </p>
                    <p className="text-xs text-blue-600 font-medium">
                      Iniciada
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Estatísticas de Rotas
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rotas Hoje:</span>
                    <span className="font-semibold text-gray-950">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">No Prazo:</span>
                    <span className="font-semibold text-gray-950">6</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Atrasadas:</span>
                    <span className="font-semibold text-gray-950">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">KM Percorridos:</span>
                    <span className="font-semibold text-gray-950">
                      2.845 km
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gestão de Alertas */}
        {activeGPSForm === "alertas" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-yellow-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-yellow-500 text-white p-2 rounded-lg mr-2">
                  ⚠️
                </span>
                Gestão de Alertas e Notificações
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Alerta
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-950">
                    <option value="todos">Todos os Alertas</option>
                    <option value="excesso_velocidade">
                      Excesso de Velocidade
                    </option>
                    <option value="motorista_inativo">
                      Motorista Inativo
                    </option>
                    <option value="rota_alterada">Rota Alterada</option>
                    <option value="ignicao_ligada">
                      Ignição Ligada Parado
                    </option>
                    <option value="panico">Botão Pânico</option>
                    <option value="bateria_baixa">Bateria Baixa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-950">
                    <option value="todos">Todos</option>
                    <option value="ativos">Ativos</option>
                    <option value="resolvidos">Resolvidos</option>
                    <option value="falsos_alarmes">Falsos Alarmes</option>
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
                          MB-1234-AB • EN1 - Maputo • Hoje 14:23
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
                          MB-5678-CD • Beira • Hoje 13:45
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
                          MB-9012-EF • Nampula • Hoje 12:30
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

              {/* Configuração de Alertas */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Configuração de Alertas
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Limite de Velocidade (km/h)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-950"
                      placeholder="80"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tempo Máximo Parado (min)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-950"
                      placeholder="30"
                    />
                  </div>
                </div>
                <button className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-yellow-600 font-medium">
                  Salvar Configurações
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Gráficos */}
        {activeGPSForm === "graficos" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-green-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-green-500 text-white p-2 rounded-lg mr-2">
                    📈
                  </span>
                  Dashboard de Gráficos - Métricas da Frota
                </h3>
              </div>
              <div className="p-6">
                {/* Grid de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Status da Frota */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-blue-500 mr-2">📊</span>
                      Status da Frota - Distribuição
                    </h4>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center w-full">
                        <div className="flex justify-center mb-4">
                          <div
                            className="relative w-40 h-40 rounded-full overflow-hidden"
                            style={{
                              background:
                                "conic-gradient(blue 0% 67%, green 67% 92%, yellow 92% 97%, red 97% 100%)",
                            }}
                          ></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-950">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                            <span>Em Movimento (67%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                            <span>Parados (25%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                            <span>Manutenção (5%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                            <span>Offline (3%)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Desempenho por Região */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-gray-950">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-green-500 mr-2">🚚</span>
                      Caminhões por Região
                    </h4>
                    <div className="h-64">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Maputo
                          </span>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-blue-500 h-3 rounded-full"
                                style={{ width: "70%" }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">7</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Sul</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-green-500 h-3 rounded-full"
                                style={{ width: "50%" }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">5</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Centro
                          </span>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-yellow-500 h-3 rounded-full"
                                style={{ width: "30%" }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">3</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Norte</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-red-500 h-3 rounded-full"
                                style={{ width: "20%" }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">2</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Segunda Linha de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-gray-950">
                  {/* Gráfico de Alertas por Tipo */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-red-500 mr-2">⚠️</span>
                      Alertas por Tipo
                    </h4>
                    <div className="h-48 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Excesso Velocidade</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-red-500 h-2 rounded-full"
                              style={{ width: "80%" }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">12</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Motorista Inativo</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-500 h-2 rounded-full"
                              style={{ width: "60%" }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">8</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Rota Alterada</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: "40%" }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">5</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Bateria Baixa</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-500 h-2 rounded-full"
                              style={{ width: "25%" }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">3</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de KM Percorridos */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-purple-500 mr-2">🛣️</span>
                      KM Percorridos (Semanal)
                    </h4>
                    <div className="h-48 flex items-end justify-between space-x-2">
                      {[
                        { day: "Seg", km: 450, color: "bg-purple-400" },
                        { day: "Ter", km: 620, color: "bg-purple-500" },
                        { day: "Qua", km: 380, color: "bg-purple-400" },
                        { day: "Qui", km: 720, color: "bg-purple-600" },
                        { day: "Sex", km: 580, color: "bg-purple-500" },
                        { day: "Sáb", km: 320, color: "bg-purple-400" },
                        { day: "Dom", km: 180, color: "bg-purple-300" },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center flex-1 h-full"
                        >
                          <div className="flex flex-col justify-end h-full w-3/4">
                            <div
                              className={`${item.color} rounded-t-lg transition-all hover:opacity-80 w-full`}
                              style={{
                                height: `${(item.km / 800) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-xs mt-2 font-medium">
                            {item.day}
                          </span>
                          <span className="text-xs text-gray-600">
                            {item.km}km
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gráfico de Eficiência */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-green-500 mr-2">⭐</span>
                      Eficiência por Motorista
                    </h4>
                    <div className="h-48 space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>João Maputo</span>
                          <span className="font-medium">94%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: "94%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Carlos Beira</span>
                          <span className="font-medium">87%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-400 h-2 rounded-full"
                            style={{ width: "87%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>António Nampula</span>
                          <span className="font-medium">76%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: "76%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Miguel Pemba</span>
                          <span className="font-medium">68%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: "68%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filtros e Controles */}
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
                        <option>Últimos 30 dias</option>
                        <option>Este Mês</option>
                        <option>Mês Anterior</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Região
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todas as Regiões</option>
                        <option>Maputo</option>
                        <option>Sul</option>
                        <option>Centro</option>
                        <option>Norte</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Caminhão
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos os Tipos</option>
                        <option>Camião Aberto</option>
                        <option>Baú</option>
                        <option>Tanque</option>
                        <option>Reboque</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Motorista
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos os Motoristas</option>
                        <option>João Maputo</option>
                        <option>Carlos Beira</option>
                        <option>António Nampula</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-4">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                      Limpar Filtros
                    </button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium">
                      Aplicar Filtros
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Relatórios */}
        {activeGPSForm === "relatorios" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-purple-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-purple-500 text-white p-2 rounded-lg mr-2">
                  📊
                </span>
                Relatórios de Monitoramento
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-blue-600 text-lg mb-2">🚛</div>
                  <p className="font-medium text-gray-900">
                    Relatório de Frota
                  </p>
                  <p className="text-sm text-gray-600">Status e posições</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-green-600 text-lg mb-2">📈</div>
                  <p className="font-medium text-gray-900">Desempenho</p>
                  <p className="text-sm text-gray-600">
                    Velocidade e rotas
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-red-600 text-lg mb-2">⚠️</div>
                  <p className="font-medium text-gray-900">Alertas</p>
                  <p className="text-sm text-gray-600">
                    Histórico de notificações
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-purple-600 text-lg mb-2">🛣️</div>
                  <p className="font-medium text-gray-900">Rotas</p>
                  <p className="text-sm text-gray-600">Trajetos e tempos</p>
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
                      <option>Relatório Completo</option>
                      <option>Desempenho por Motorista</option>
                      <option>Alertas por Período</option>
                      <option>Rotas Concluídas</option>
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
                <button className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-purple-600 font-medium">
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