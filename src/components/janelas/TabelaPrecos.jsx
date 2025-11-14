import React, { useState } from 'react';

const TabelaPrecos = () => {
  const [activeTabelaPrecos, setActiveTabelaPrecos] = useState("tabelas");

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            💰
          </span>
          Tabela de Preços - Gestão de Tarifas e Serviços
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Configuração e gestão de tabelas de preços, tarifas e serviços de
          transporte
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveTabelaPrecos("tabelas")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTabelaPrecos === "tabelas"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📋 Tabelas
          </button>
          <button
            onClick={() => setActiveTabelaPrecos("rotas")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTabelaPrecos === "rotas"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🗺️ Tarifas por Rota
          </button>
          <button
            onClick={() => setActiveTabelaPrecos("servicos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTabelaPrecos === "servicos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🚚 Serviços
          </button>
          <button
            onClick={() => setActiveTabelaPrecos("clientes")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTabelaPrecos === "clientes"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            👥 Preços por Cliente
          </button>
          <button
            onClick={() => setActiveTabelaPrecos("calculadora")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTabelaPrecos === "calculadora"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🧮 Calculadora
          </button>
        </div>

        {/* Gestão de Tabelas de Preços */}
        {activeTabelaPrecos === "tabelas" && (
          <div className="space-y-6">
            {/* Métricas Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Tabelas Ativas
                    </p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">📋</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    +2 este mês
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Preço Médio/km
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      12,50 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">💰</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    +5% vs mercado
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Rotas Cadastradas
                    </p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">🗺️</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    Cobertura nacional
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Margem Média
                    </p>
                    <p className="text-2xl font-bold text-gray-900">28%</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">📈</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    Acima da meta
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Lista de Tabelas */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-purple-50">
                  <h3 className="font-semibold text-gray-900">
                    📋 Tabelas de Preços Ativas
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          Tabela Padrão 2024
                        </p>
                        <p className="text-sm text-gray-600">
                          Preços base para todos os clientes
                        </p>
                        <p className="text-xs text-blue-600">
                          Vigência: 01/01/2024 - 31/12/2024
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          12,80 MT/km
                        </p>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          Ativa
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          Corporate - Grandes Clientes
                        </p>
                        <p className="text-sm text-gray-600">
                          Preços negociados volume
                        </p>
                        <p className="text-xs text-blue-600">
                          Clientes: Cimentos MZ, Mozal, Grupo JF
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          11,20 MT/km
                        </p>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          Ativa
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          Promocional - Norte
                        </p>
                        <p className="text-sm text-gray-600">
                          Campanha rotas Nampula, Niassa
                        </p>
                        <p className="text-xs text-blue-600">
                          Vigência: 01/01/2024 - 30/06/2024
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          10,50 MT/km
                        </p>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          Promocional
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          Tabela 2023
                        </p>
                        <p className="text-sm text-gray-600">
                          Tabela anterior - arquivada
                        </p>
                        <p className="text-xs text-gray-600">
                          Vigência: 01/01/2023 - 31/12/2023
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          11,90 MT/km
                        </p>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                          Inativa
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nova Tabela de Preços */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-green-50">
                  <h3 className="font-semibold text-gray-900">
                    ➕ Nova Tabela de Preços
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome da Tabela *
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        placeholder="Ex: Tabela Corporativa 2024"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data Início *
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data Fim
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Tabela *
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                        <option value="">Selecione</option>
                        <option value="padrao">Padrão</option>
                        <option value="corporativa">Corporativa</option>
                        <option value="promocional">Promocional</option>
                        <option value="especial">Especial</option>
                        <option value="cliente">Por Cliente</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preço Base por KM (MT) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        placeholder="0,00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        placeholder="Descrição da tabela de preços..."
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
                        Criar Tabela
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tarifas por Rota */}
        {activeTabelaPrecos === "rotas" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  🗺️ Tarifas por Rota - Tabela Padrão 2024
                </h3>
              </div>
              <div className="p-6">
                {/* Filtros */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Todas as Rotas</option>
                    <option>Província de Maputo</option>
                    <option>Sul</option>
                    <option>Centro</option>
                    <option>Norte</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Todos os Tipos de Carga</option>
                    <option>Grãos e Cereais</option>
                    <option>Cimento e Materiais</option>
                    <option>Produtos Alimentares</option>
                    <option>Combustíveis</option>
                  </select>
                  <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium">
                    Exportar Tarifas
                  </button>
                </div>

                {/* Tabela de Tarifas */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-3">Rota</th>
                        <th className="px-4 py-3">Distância</th>
                        <th className="px-4 py-3">Tempo</th>
                        <th className="px-4 py-3 text-right">
                          Preço Base (MT)
                        </th>
                        <th className="px-4 py-3 text-right">Grãos (MT)</th>
                        <th className="px-4 py-3 text-right">
                          Cimento (MT)
                        </th>
                        <th className="px-4 py-3 text-right">
                          Alimentos (MT)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          Maputo → Matola
                        </td>
                        <td className="px-4 py-3">30 km</td>
                        <td className="px-4 py-3">45 min</td>
                        <td className="px-4 py-3 text-right font-semibold">
                          384 MT
                        </td>
                        <td className="px-4 py-3 text-right">384 MT</td>
                        <td className="px-4 py-3 text-right">422 MT</td>
                        <td className="px-4 py-3 text-right">461 MT</td>
                      </tr>
                      <tr className="bg-gray-50 border-b hover:bg-gray-100">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          Maputo → Xai-Xai
                        </td>
                        <td className="px-4 py-3">220 km</td>
                        <td className="px-4 py-3">3h 30min</td>
                        <td className="px-4 py-3 text-right font-semibold">
                          2.816 MT
                        </td>
                        <td className="px-4 py-3 text-right">2.816 MT</td>
                        <td className="px-4 py-3 text-right">3.098 MT</td>
                        <td className="px-4 py-3 text-right">3.379 MT</td>
                      </tr>
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          Maputo → Beira
                        </td>
                        <td className="px-4 py-3">1.200 km</td>
                        <td className="px-4 py-3">18h</td>
                        <td className="px-4 py-3 text-right font-semibold">
                          15.360 MT
                        </td>
                        <td className="px-4 py-3 text-right">15.360 MT</td>
                        <td className="px-4 py-3 text-right">16.896 MT</td>
                        <td className="px-4 py-3 text-right">18.432 MT</td>
                      </tr>
                      <tr className="bg-gray-50 border-b hover:bg-gray-100">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          Maputo → Nampula
                        </td>
                        <td className="px-4 py-3">2.100 km</td>
                        <td className="px-4 py-3">32h</td>
                        <td className="px-4 py-3 text-right font-semibold">
                          26.880 MT
                        </td>
                        <td className="px-4 py-3 text-right">26.880 MT</td>
                        <td className="px-4 py-3 text-right">29.568 MT</td>
                        <td className="px-4 py-3 text-right">32.256 MT</td>
                      </tr>
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          Beira → Chimoio
                        </td>
                        <td className="px-4 py-3">180 km</td>
                        <td className="px-4 py-3">2h 45min</td>
                        <td className="px-4 py-3 text-right font-semibold">
                          2.304 MT
                        </td>
                        <td className="px-4 py-3 text-right">2.304 MT</td>
                        <td className="px-4 py-3 text-right">2.534 MT</td>
                        <td className="px-4 py-3 text-right">2.765 MT</td>
                      </tr>
                      <tr className="bg-gray-50 border-b hover:bg-gray-100">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          Nampula → Pemba
                        </td>
                        <td className="px-4 py-3">550 km</td>
                        <td className="px-4 py-3">8h 15min</td>
                        <td className="px-4 py-3 text-right font-semibold">
                          7.040 MT
                        </td>
                        <td className="px-4 py-3 text-right">7.040 MT</td>
                        <td className="px-4 py-3 text-right">7.744 MT</td>
                        <td className="px-4 py-3 text-right">8.448 MT</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Adicionar Nova Rota */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-green-50">
                <h3 className="font-semibold text-gray-900">
                  ➕ Adicionar Nova Rota
                </h3>
              </div>
              <div className="p-6">
                <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Origem *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                      <option value="">Selecione</option>
                      <option value="maputo">Maputo</option>
                      <option value="matola">Matola</option>
                      <option value="beira">Beira</option>
                      <option value="nampula">Nampula</option>
                      <option value="xai-xai">Xai-Xai</option>
                      <option value="chimoio">Chimoio</option>
                      <option value="quelimane">Quelimane</option>
                      <option value="pemba">Pemba</option>
                      <option value="lichinga">Lichinga</option>
                      <option value="tete">Tete</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Destino *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                      <option value="">Selecione</option>
                      <option value="maputo">Maputo</option>
                      <option value="matola">Matola</option>
                      <option value="beira">Beira</option>
                      <option value="nampula">Nampula</option>
                      <option value="xai-xai">Xai-Xai</option>
                      <option value="chimoio">Chimoio</option>
                      <option value="quelimane">Quelimane</option>
                      <option value="pemba">Pemba</option>
                      <option value="lichinga">Lichinga</option>
                      <option value="tete">Tete</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Distância (km) *
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tempo Estimado
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                      placeholder="Ex: 3h 30min"
                    />
                  </div>

                  <div className="md:col-span-2 lg:col-span-4 flex justify-end space-x-3">
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
                      Adicionar Rota
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Serviços e Adicionais */}
        {activeTabelaPrecos === "servicos" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    🚛 Caminhão Baú
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Ativo
                  </span>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Capacidade:
                    </span>
                    <span className="font-medium">15 ton</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Preço base/km:
                    </span>
                    <span className="font-medium text-blue-600">
                      12,80 MT
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Preço mínimo:
                    </span>
                    <span className="font-medium">850 MT</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    🚛 Caminhão Cacamba
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Ativo
                  </span>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Capacidade:
                    </span>
                    <span className="font-medium">20 ton</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Preço base/km:
                    </span>
                    <span className="font-medium text-blue-600">
                      14,20 MT
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Preço mínimo:
                    </span>
                    <span className="font-medium">950 MT</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    🚛 Truck 3 Eixos
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Ativo
                  </span>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Capacidade:
                    </span>
                    <span className="font-medium">30 ton</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Preço base/km:
                    </span>
                    <span className="font-medium text-blue-600">
                      18,50 MT
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Preço mínimo:
                    </span>
                    <span className="font-medium">1.200 MT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Serviços Adicionais */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-orange-50">
                <h3 className="font-semibold text-gray-900">
                  ➕ Serviços Adicionais
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">
                          Carregamento
                        </p>
                        <p className="text-sm text-gray-600">
                          Serviço de carregamento
                        </p>
                      </div>
                      <span className="font-bold text-gray-900">
                        250 MT
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">
                          Descarregamento
                        </p>
                        <p className="text-sm text-gray-600">
                          Serviço de descarregamento
                        </p>
                      </div>
                      <span className="font-bold text-gray-900">
                        250 MT
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">
                          Ajudante de Carga
                        </p>
                        <p className="text-sm text-gray-600">
                          Assistência no carregamento
                        </p>
                      </div>
                      <span className="font-bold text-gray-900">
                        150 MT/dia
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">
                          Seguro de Carga
                        </p>
                        <p className="text-sm text-gray-600">
                          Seguro adicional
                        </p>
                      </div>
                      <span className="font-bold text-gray-900">
                        1,5% do valor
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Estadia</p>
                        <p className="text-sm text-gray-600">
                          Tempo de espera
                        </p>
                      </div>
                      <span className="font-bold text-gray-900">
                        120 MT/hora
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">
                          Carga Frágil
                        </p>
                        <p className="text-sm text-gray-600">
                          Manuseio especial
                        </p>
                      </div>
                      <span className="font-bold text-gray-900">+15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preços por Cliente */}
        {activeTabelaPrecos === "clientes" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  👥 Preços Especiais por Cliente
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                        CM
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Cimentos de Moçambique
                        </p>
                        <p className="text-sm text-gray-600">
                          Contrato anual • Volume: 120 viagens/mês
                        </p>
                        <p className="text-xs text-blue-600">
                          Desconto: 15% • Tabela: Corporate
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">10,88 MT/km</p>
                      <p className="text-sm text-gray-600">
                        vs 12,80 MT padrão
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                        MZ
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Mozal</p>
                        <p className="text-sm text-gray-600">
                          Contrato trimestral • Volume: 80 viagens/mês
                        </p>
                        <p className="text-xs text-blue-600">
                          Desconto: 12% • Tabela: Corporate
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">11,26 MT/km</p>
                      <p className="text-sm text-gray-600">
                        vs 12,80 MT padrão
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                        JF
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Grupo João Ferreira
                        </p>
                        <p className="text-sm text-gray-600">
                          Contrato mensal • Volume: 45 viagens/mês
                        </p>
                        <p className="text-xs text-blue-600">
                          Desconto: 10% • Tabela: Corporate
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">11,52 MT/km</p>
                      <p className="text-sm text-gray-600">
                        vs 12,80 MT padrão
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                        CDM
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Cervejas de Moçambique
                        </p>
                        <p className="text-sm text-gray-600">
                          Contrato spot • Volume: 25 viagens/mês
                        </p>
                        <p className="text-xs text-blue-600">
                          Desconto: 8% • Tabela: Promocional
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">11,78 MT/km</p>
                      <p className="text-sm text-gray-600">
                        vs 12,80 MT padrão
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Calculadora de Preços */}
        {activeTabelaPrecos === "calculadora" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Formulário de Cálculo */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-purple-50">
                <h3 className="font-semibold text-gray-900">
                  🧮 Calculadora de Preços
                </h3>
              </div>
              <div className="p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Origem *
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-950">
                        <option value="">Selecione</option>
                        <option value="maputo">Maputo</option>
                        <option value="matola">Matola</option>
                        <option value="beira">Beira</option>
                        <option value="nampula">Nampula</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Destino *
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-950">
                        <option value="">Selecione</option>
                        <option value="maputo">Maputo</option>
                        <option value="matola">Matola</option>
                        <option value="beira">Beira</option>
                        <option value="nampula">Nampula</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Veículo *
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-950">
                        <option value="">Selecione</option>
                        <option value="bau">Caminhão Baú (15 ton)</option>
                        <option value="cacamba">
                          Caminhão Caçamba (20 ton)
                        </option>
                        <option value="truck">
                          Truck 3 Eixos (30 ton)
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Carga *
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-950">
                        <option value="">Selecione</option>
                        <option value="graos">Grãos e Cereais</option>
                        <option value="cimento">Cimento e Materiais</option>
                        <option value="alimentos">
                          Produtos Alimentares
                        </option>
                        <option value="combustivel">Combustíveis</option>
                        <option value="fragil">Carga Frágil</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Peso (ton) *
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-950"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tabela de Preços
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-950">
                        <option value="padrao">Padrão 2024</option>
                        <option value="corporate">Corporate</option>
                        <option value="promocional">Promocional</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Serviços Adicionais
                      </label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <label className="text-sm text-gray-700">
                            Carregamento
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <label className="text-sm text-gray-700">
                            Descarregamento
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <label className="text-sm text-gray-700">
                            Seguro de Carga
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cliente (para desconto)
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-950">
                        <option value="">Cliente avulso</option>
                        <option value="cimentos">
                          Cimentos de Moçambique
                        </option>
                        <option value="mozal">Mozal</option>
                        <option value="joao-ferreira">
                          Grupo João Ferreira
                        </option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-lg"
                  >
                    Calcular Preço
                  </button>
                </form>
              </div>
            </div>

            {/* Resultado do Cálculo */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-green-50">
                <h3 className="font-semibold text-gray-900">
                  💰 Resultado do Cálculo
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-medium text-gray-700">
                      Distância:
                    </span>
                    <span className="font-bold text-gray-900">
                      1.200 km
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">
                      Preço Base:
                    </span>
                    <span className="font-bold text-gray-900">
                      15.360 MT
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">
                      Serviços Adicionais:
                    </span>
                    <span className="font-bold text-gray-900">500 MT</span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                    <span className="font-medium text-gray-700">
                      Desconto Cliente:
                    </span>
                    <span className="font-bold text-gray-600">
                      -2.304 MT
                    </span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <span className="font-medium text-gray-700">
                        Subtotal:
                      </span>
                      <span className="font-bold text-gray-900">
                        13.556 MT
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <span className="font-medium text-gray-700">
                      IVA (17%):
                    </span>
                    <span className="font-bold text-gray-900">
                      2.305 MT
                    </span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <span className="text-lg font-bold text-gray-900">
                        TOTAL FINAL:
                      </span>
                      <span className="text-2xl font-bold text-blue-600">
                        15.861 MT
                      </span>
                    </div>
                  </div>

                  <div className="text-center text-sm text-gray-600 mt-4">
                    <p>
                      Preço por ton: <strong>1.055 MT</strong>
                    </p>
                    <p>
                      Preço por km: <strong>13,22 MT</strong>
                    </p>
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

export default TabelaPrecos;