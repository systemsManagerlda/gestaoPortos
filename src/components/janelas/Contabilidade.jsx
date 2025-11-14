import React, { useState } from 'react';

const Contabilidade = () => {
  const [activeContabilidade, setActiveContabilidade] = useState("dashboard");

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            📊
          </span>
          Contabilidade - Gestão Contábil Completa
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Gestão contábil integrada, balanços, demonstrações e conformidade
          fiscal
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveContabilidade("dashboard")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContabilidade === "dashboard"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveContabilidade("lancamentos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContabilidade === "lancamentos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📝 Lançamentos
          </button>
          <button
            onClick={() => setActiveContabilidade("balancete")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContabilidade === "balancete"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ⚖️ Balancete
          </button>
          <button
            onClick={() => setActiveContabilidade("demonstracoes")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContabilidade === "demonstracoes"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Demonstrações
          </button>
          <button
            onClick={() => setActiveContabilidade("fiscal")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContabilidade === "fiscal"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🏛️ Fiscal
          </button>
        </div>

        {/* Dashboard Contábil */}
        {activeContabilidade === "dashboard" && (
          <div className="space-y-6">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Activo Total
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      8.250.000 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">💰</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    +8% vs último mês
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Passivo Total
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      3.150.000 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">📤</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    38% do Ativo
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Patrimônio Líquido
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      5.100.000 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">📈</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    +12% este ano
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Resultado Líquido
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      450.000 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">🎯</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    Meta: 500.000 MT
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Balanço Patrimonial Resumido */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900">
                    ⚖️ Balanço Patrimonial
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Activo
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            Circulante
                          </span>
                          <span className="font-medium text-gray-600">
                            2.850.000 MT
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            Não Circulante
                          </span>
                          <span className="font-medium text-gray-600">
                            5.400.000 MT
                          </span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-semibold text-gray-600">
                          <span>Total do Activo</span>
                          <span>8.250.000 MT</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Passivo
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            Circulante
                          </span>
                          <span className="font-medium text-gray-600">
                            1.750.000 MT
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            Não Circulante
                          </span>
                          <span className="font-medium text-gray-600">
                            1.400.000 MT
                          </span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-semibold text-gray-600">
                          <span>Total do Passivo</span>
                          <span>3.150.000 MT</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-gray-600">
                      <div className="flex justify-between font-semibold">
                        <span>Patrimônio Líquido</span>
                        <span className="text-green-700">5.100.000 MT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* DRE Resumida */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-green-50">
                  <h3 className="font-semibold text-gray-900">
                    📈 DRE - Janeiro 2024
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3 text-gray-600">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Receita Bruta
                      </span>
                      <span className="font-medium">1.850.000 MT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        (-) Impostos
                      </span>
                      <span className="font-medium text-red-600">
                        -185.000 MT
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-sm font-medium">
                        Receita Líquida
                      </span>
                      <span className="font-semibold">1.665.000 MT</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">CMV</span>
                      <span className="font-medium text-red-600">
                        -850.000 MT
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Despesas Operacionais
                      </span>
                      <span className="font-medium text-red-600">
                        -320.000 MT
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-sm font-medium">
                        Resultado Operacional
                      </span>
                      <span className="font-semibold">495.000 MT</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">IRPS</span>
                      <span className="font-medium text-red-600">
                        -45.000 MT
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold bg-blue-50 p-2 rounded">
                      <span>Resultado Líquido</span>
                      <span className="text-blue-700">450.000 MT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Indicadores Financeiros */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-purple-50">
                <h3 className="font-semibold text-gray-900">
                  📊 Indicadores Financeiros
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      24.3%
                    </p>
                    <p className="text-sm text-gray-600">Margem Líquida</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">1.62</p>
                    <p className="text-sm text-gray-600">
                      Liquidez Corrente
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">0.38</p>
                    <p className="text-sm text-gray-600">Endividamento</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">8.7%</p>
                    <p className="text-sm text-gray-600">ROI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lançamentos Contábeis */}
        {activeContabilidade === "lancamentos" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-indigo-50">
                <h3 className="font-semibold text-gray-900">
                  📝 Lançamentos Contábeis
                </h3>
              </div>
              <div className="p-6">
                {/* Filtros */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Todos os Lançamentos</option>
                    <option>Receitas</option>
                    <option>Despesas</option>
                    <option>Ativo</option>
                    <option>Passivo</option>
                  </select>
                  <input
                    type="date"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    placeholder="De"
                  />
                  <input
                    type="date"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    placeholder="Até"
                  />
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Status: Todos</option>
                    <option>Pendente</option>
                    <option>Conferido</option>
                    <option>Conciliado</option>
                  </select>
                </div>

                {/* Lista de Lançamentos */}
                <div className="space-y-3">
                  {/* Lançamento 1 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-12 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900">
                          LC-2024-0158
                        </p>
                        <p className="text-sm text-gray-600">
                          Receita Transporte - Cimentos MZ
                        </p>
                        <p className="text-xs text-gray-500">
                          15/01/2024 • Conta: 4.1.1.01
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Débito</p>
                      <p className="font-bold text-gray-900">350.000 MT</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Crédito</p>
                      <p className="font-bold text-gray-900">350.000 MT</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Status</p>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Conciliado
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Editar
                      </button>
                      <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                        Excluir
                      </button>
                    </div>
                  </div>

                  {/* Lançamento 2 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-12 bg-red-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900">
                          LC-2024-0162
                        </p>
                        <p className="text-sm text-gray-600">
                          Despesa Combustível - GALP
                        </p>
                        <p className="text-xs text-gray-500">
                          16/01/2024 • Conta: 6.2.1.01
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Débito</p>
                      <p className="font-bold text-gray-900">280.000 MT</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Crédito</p>
                      <p className="font-bold text-gray-900">280.000 MT</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Status</p>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Pendente
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Editar
                      </button>
                      <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                        Conciliar
                      </button>
                    </div>
                  </div>

                  {/* Lançamento 3 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-12 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900">
                          LC-2024-0165
                        </p>
                        <p className="text-sm text-gray-600">
                          Aquisição Veículo - Activo Fixo
                        </p>
                        <p className="text-xs text-gray-500">
                          17/01/2024 • Conta: 2.1.1.01
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Débito</p>
                      <p className="font-bold text-gray-900">
                        1.200.000 MT
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Crédito</p>
                      <p className="font-bold text-gray-900">
                        1.200.000 MT
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Status</p>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Conferido
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Editar
                      </button>
                      <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                        Conciliar
                      </button>
                    </div>
                  </div>
                </div>

                {/* Botão Novo Lançamento */}
                <div className="mt-6 flex justify-end">
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium flex items-center">
                    <span className="mr-2">+</span>
                    Novo Lançamento
                  </button>
                </div>
              </div>
            </div>

            {/* Formulário de Lançamento (oculto por padrão) */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  ➕ Novo Lançamento Contábil
                </h3>
              </div>
              <div className="p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data do Lançamento *
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Lançamento *
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                        <option value="">Selecione</option>
                        <option value="receita">Receita</option>
                        <option value="despesa">Despesa</option>
                        <option value="ativo">Ativo</option>
                        <option value="passivo">Passivo</option>
                        <option value="pl">Patrimônio Líquido</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Conta Débito *
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                        <option value="">Selecione a conta</option>
                        <option value="1.1.1.01">1.1.1.01 - Caixa</option>
                        <option value="1.1.2.01">1.1.2.01 - Bancos</option>
                        <option value="4.1.1.01">
                          4.1.1.01 - Receita de Transporte
                        </option>
                        <option value="6.2.1.01">
                          6.2.1.01 - Combustível
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Conta Crédito *
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                        <option value="">Selecione a conta</option>
                        <option value="1.1.1.01">1.1.1.01 - Caixa</option>
                        <option value="1.1.2.01">1.1.2.01 - Bancos</option>
                        <option value="2.1.1.01">
                          2.1.1.01 - Veículos
                        </option>
                        <option value="3.1.1.01">
                          3.1.1.01 - Fornecedores
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição do Lançamento *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                      placeholder="Descrição detalhada do lançamento..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Valor (MT) *
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        placeholder="0,00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Documento de Apoio
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        placeholder="Nº do documento"
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
                      Registrar Lançamento
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Balancete */}
        {activeContabilidade === "balancete" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  ⚖️ Balancete de Verificação - Janeiro 2024
                </h3>
              </div>
              <div className="p-6">
                {/* Filtros */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Janeiro 2024</option>
                    <option>Dezembro 2023</option>
                    <option>Novembro 2023</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Todas as Contas</option>
                    <option>Contas de Resultado</option>
                    <option>Contas Patrimoniais</option>
                  </select>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                    Exportar Excel
                  </button>
                </div>

                {/* Tabela do Balancete */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-3">Conta</th>
                        <th className="px-4 py-3">Descrição</th>
                        <th className="px-4 py-3 text-right">
                          Débito (MT)
                        </th>
                        <th className="px-4 py-3 text-right">
                          Crédito (MT)
                        </th>
                        <th className="px-4 py-3 text-right">Saldo (MT)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          1.1.1.01
                        </td>
                        <td className="px-4 py-3">Caixa</td>
                        <td className="px-4 py-3 text-right">850.000</td>
                        <td className="px-4 py-3 text-right">420.000</td>
                        <td className="px-4 py-3 text-right font-semibold text-blue-600">
                          430.000
                        </td>
                      </tr>
                      <tr className="bg-gray-50 border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          1.1.2.01
                        </td>
                        <td className="px-4 py-3">Bancos</td>
                        <td className="px-4 py-3 text-right">1.250.000</td>
                        <td className="px-4 py-3 text-right">680.000</td>
                        <td className="px-4 py-3 text-right font-semibold text-blue-600">
                          570.000
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          4.1.1.01
                        </td>
                        <td className="px-4 py-3">Receita Transporte</td>
                        <td className="px-4 py-3 text-right">-</td>
                        <td className="px-4 py-3 text-right">1.850.000</td>
                        <td className="px-4 py-3 text-right font-semibold text-green-600">
                          1.850.000
                        </td>
                      </tr>
                      <tr className="bg-gray-50 border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          6.2.1.01
                        </td>
                        <td className="px-4 py-3">Combustível</td>
                        <td className="px-4 py-3 text-right">480.000</td>
                        <td className="px-4 py-3 text-right">-</td>
                        <td className="px-4 py-3 text-right font-semibold text-red-600">
                          480.000
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          6.3.1.01
                        </td>
                        <td className="px-4 py-3">Salários</td>
                        <td className="px-4 py-3 text-right">420.000</td>
                        <td className="px-4 py-3 text-right">-</td>
                        <td className="px-4 py-3 text-right font-semibold text-red-600">
                          420.000
                        </td>
                      </tr>
                    </tbody>
                    <tfoot className="bg-gray-100 font-semibold">
                      <tr>
                        <td className="px-4 py-3" colSpan={2}>
                          TOTAIS
                        </td>
                        <td className="px-4 py-3 text-right">3.000.000</td>
                        <td className="px-4 py-3 text-right">3.000.000</td>
                        <td className="px-4 py-3 text-right text-green-600">
                          0
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Demonstrações Financeiras */}
        {activeContabilidade === "demonstracoes" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100">
                <div className="text-blue-600 text-lg mb-2">📊</div>
                <p className="font-medium text-gray-900">DRE Completa</p>
                <p className="text-sm text-gray-600">
                  Demonstração Resultado
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100">
                <div className="text-green-600 text-lg mb-2">⚖️</div>
                <p className="font-medium text-gray-900">
                  Balanço Patrimonial
                </p>
                <p className="text-sm text-gray-600">Ativo, Passivo e PL</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 cursor-pointer hover:bg-purple-100">
                <div className="text-purple-600 text-lg mb-2">💸</div>
                <p className="font-medium text-gray-900">Fluxo de Caixa</p>
                <p className="text-sm text-gray-600">
                  Operacional, Investimento
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 cursor-pointer hover:bg-orange-100">
                <div className="text-orange-600 text-lg mb-2">📈</div>
                <p className="font-medium text-gray-900">DLPA</p>
                <p className="text-sm text-gray-600">Demonstração Lucros</p>
              </div>
            </div>

            {/* DRE Detalhada */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  📈 Demonstração do Resultado do Exercício
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="font-medium text-gray-900">
                      Descrição
                    </div>
                    <div className="font-medium text-gray-900 text-right">
                      Valor (MT)
                    </div>
                    <div className="font-medium text-gray-900 text-right">
                      % Receita
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
                      <div>Receita Bruta de Transporte</div>
                      <div className="text-right font-semibold">
                        1.850.000
                      </div>
                      <div className="text-right text-gray-600">100.0%</div>
                    </div>
                  </div>

                  <div className="border-t pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
                      <div>(-) Impostos sobre Vendas</div>
                      <div className="text-right">-185.000</div>
                      <div className="text-right">-10.0%</div>
                    </div>
                  </div>

                  <div className="border-y py-2 bg-blue-50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-semibold text-gray-700">
                      <div>Receita Líquida</div>
                      <div className="text-right text-blue-700">
                        1.665.000
                      </div>
                      <div className="text-right text-blue-700">90.0%</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
                      <div>(-) Custo dos Serviços Prestados</div>
                      <div className="text-right">-850.000</div>
                      <div className="text-right">-45.9%</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
                      <div>(-) Despesas Operacionais</div>
                      <div className="text-right">-320.000</div>
                      <div className="text-right">-17.3%</div>
                    </div>
                  </div>

                  <div className="border-y py-2 bg-blue-50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-semibold text-gray-700">
                      <div>Resultado Operacional</div>
                      <div className="text-right text-blue-700">
                        495.000
                      </div>
                      <div className="text-right text-blue-700">26.8%</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
                    <div>(-) Imposto sobre o Rendimento (IRPS)</div>
                    <div className="text-right">-45.000</div>
                    <div className="text-right">-2.4%</div>
                  </div>

                  <div className="border-t pt-4 bg-blue-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-bold text-lg text-gray-700">
                      <div>RESULTADO LÍQUIDO DO EXERCÍCIO</div>
                      <div className="text-right text-blue-700">
                        450.000
                      </div>
                      <div className="text-right text-blue-700">24.3%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gestão Fiscal */}
        {activeContabilidade === "fiscal" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      IVA a Recolher
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      125.000 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">🏛️</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    Vence: 20/02/2024
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      IRPS
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      45.000 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">📋</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    Vence: 15/02/2024
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      INSS
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      68.000 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">👥</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    Vence: 10/02/2024
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Situação Fiscal
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      Regular
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">✅</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    Atualizado
                  </span>
                </div>
              </div>
            </div>

            {/* Obrigações Fiscais */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  📅 Calendário Fiscal - 2024
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="font-medium text-gray-900">
                        Declaração IVA - Trimestre 1
                      </p>
                      <p className="text-sm text-gray-600">
                        Período: Jan-Mar 2024
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">125.000 MT</p>
                      <p className="text-sm text-blue-600">
                        Vence: 20/04/2024
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="font-medium text-gray-900">
                        IRPS - 1º Trimestre
                      </p>
                      <p className="text-sm text-gray-600">
                        Apuramento trimestral
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">45.000 MT</p>
                      <p className="text-sm text-blue-600">
                        Vence: 15/04/2024
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="font-medium text-gray-900">
                        INSS - Março 2024
                      </p>
                      <p className="text-sm text-gray-600">
                        Contribuições sociais
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">68.000 MT</p>
                      <p className="text-sm text-blue-600">
                        Vence: 10/04/2024
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="font-medium text-gray-900">
                        Declaração Anual
                      </p>
                      <p className="text-sm text-gray-600">
                        Modelo 22 - Exercício 2023
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-blue-600">
                        Entregue: 15/03/2024
                      </p>
                      <p className="text-xs text-gray-600">
                        Situação: Regular
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Informações Fiscais da Empresa */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900">
                  🏢 Dados Fiscais da Empresa
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        NUIT
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                        value="123456789"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Regime IVA
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                        value="Regime Geral"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Actividade Principal
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                        value="Transporte Rodoviário de Cargas"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CAE
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                        value="4941 - Transporte rodoviário de mercadorias"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Conservatória
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                        value="Conservatória do Registo Comercial de Maputo"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nº de Contribuinte
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                        value="123456789"
                        readOnly
                      />
                    </div>
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

export default Contabilidade;