import React, { useState } from 'react';

const ContasPagar = () => {
  const [activeContasPagar, setActiveContasPagar] = useState("dashboard");

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            📤
          </span>
          Contas a Pagar - Gestão de Pagamentos
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Controle e programação de pagamentos a fornecedores e despesas
          operacionais
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveContasPagar("dashboard")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContasPagar === "dashboard"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveContasPagar("faturas")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContasPagar === "faturas"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📄 Contas
          </button>
          <button
            onClick={() => setActiveContasPagar("pagamentos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContasPagar === "pagamentos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            💳 Pagamentos
          </button>
          <button
            onClick={() => setActiveContasPagar("fornecedores")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContasPagar === "fornecedores"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🏢 Fornecedores
          </button>
          <button
            onClick={() => setActiveContasPagar("graficos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContasPagar === "graficos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Gráficos
          </button>
          <button
            onClick={() => setActiveContasPagar("relatorios")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContasPagar === "relatorios"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Relatórios
          </button>
        </div>

        {/* Dashboard */}
        {activeContasPagar === "dashboard" && (
          <div className="space-y-6">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total a Pagar
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      1.850.000 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">📤</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    +12% vs mês passado
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Vencidos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      320.000 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">⚠️</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    5 contas atrasadas
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      A Vencer (7 dias)
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      850.000 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">⏳</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    12 contas
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Pago Este Mês
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      1.250.000 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">✅</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    78% do planeado
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Próximos Vencimentos */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-orange-50">
                  <h3 className="font-semibold text-gray-900">
                    📅 Próximos Vencimentos
                  </h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          Combustível - GALP
                        </p>
                        <p className="text-sm text-gray-600">
                          Abastecimento mensal
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          280.000 MT
                        </p>
                        <p className="text-sm text-blue-600">
                          Vence amanhã
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          Manutenção - Oficina Maputo
                        </p>
                        <p className="text-sm text-gray-600">
                          Reparação camião
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          150.000 MT
                        </p>
                        <p className="text-sm text-blue-600">
                          2 dias úteis
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          Salários Janeiro
                        </p>
                        <p className="text-sm text-gray-600">
                          Equipe motoristas
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          420.000 MT
                        </p>
                        <p className="text-sm text-blue-600">
                          5 dias úteis
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contas Vencidas */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-red-50">
                  <h3 className="font-semibold text-gray-900">
                    ⚠️ Contas Vencidas
                  </h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          Seguro Camiões - Hollard
                        </p>
                        <p className="text-sm text-gray-600">
                          Prémio trimestral
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          120.000 MT
                        </p>
                        <p className="text-sm text-blue-600">
                          8 dias atrasado
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          Portagens - ENAPOR
                        </p>
                        <p className="text-sm text-gray-600">
                          Portagens acumuladas
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">85.000 MT</p>
                        <p className="text-sm text-blue-600">
                          5 dias atrasado
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          Licenciamento - INAV
                        </p>
                        <p className="text-sm text-gray-600">
                          Licença operacional
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">45.000 MT</p>
                        <p className="text-sm text-blue-600">
                          3 dias atrasado
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fornecedores Principais */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  🏢 Principais Fornecedores
                </h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-900">
                      GALP Moçambique
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      480.000 MT
                    </p>
                    <p className="text-sm text-gray-600">
                      Combustível mensal
                    </p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-900">
                      Oficina Maputo
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      320.000 MT
                    </p>
                    <p className="text-sm text-gray-600">
                      Manutenção veículos
                    </p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-900">
                      Hollard Seguros
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      280.000 MT
                    </p>
                    <p className="text-sm text-gray-600">Seguros frota</p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-900">ENAPOR</p>
                    <p className="text-2xl font-bold text-gray-900">
                      150.000 MT
                    </p>
                    <p className="text-sm text-gray-600">
                      Portagens e taxas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gestão de Contas */}
        {activeContasPagar === "faturas" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  📄 Gestão de Contas a Pagar
                </h3>
              </div>
              <div className="p-6">
                {/* Filtros */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Status: Todos</option>
                    <option>Pendente</option>
                    <option>Vencido</option>
                    <option>Pago</option>
                    <option>Programado</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Fornecedor: Todos</option>
                    <option>GALP Moçambique</option>
                    <option>Oficina Maputo</option>
                    <option>Hollard Seguros</option>
                    <option>ENAPOR</option>
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
                </div>

                {/* Lista de Contas */}
                <div className="space-y-3">
                  {/* Conta 1 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-12 bg-red-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900">
                          CP-2024-0023
                        </p>
                        <p className="text-sm text-gray-600">
                          Hollard Seguros - Prémio trimestral
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Valor</p>
                      <p className="font-bold text-gray-900">120.000 MT</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Vencimento</p>
                      <p className="text-gray-900 font-medium">
                        08/01/2024
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Status</p>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                        Vencida
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                        Pagar
                      </button>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Detalhes
                      </button>
                    </div>
                  </div>

                  {/* Conta 2 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-12 bg-yellow-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900">
                          CP-2024-0028
                        </p>
                        <p className="text-sm text-gray-600">
                          GALP - Combustível Janeiro
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Valor</p>
                      <p className="font-bold text-gray-900">280.000 MT</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Vencimento</p>
                      <p className="text-gray-900 font-medium">
                        18/01/2024
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Status</p>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                        A Vencer
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                        Pagar
                      </button>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Detalhes
                      </button>
                    </div>
                  </div>

                  {/* Conta 3 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-12 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900">
                          CP-2024-0015
                        </p>
                        <p className="text-sm text-gray-600">
                          Salários Dezembro
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Valor</p>
                      <p className="font-bold text-gray-900">420.000 MT</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Vencimento</p>
                      <p className="text-gray-900 font-medium">
                        05/01/2024
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Status</p>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                        Paga
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Detalhes
                      </button>
                    </div>
                  </div>
                </div>

                {/* Botão Nova Conta */}
                <div className="mt-6 flex justify-end">
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium flex items-center">
                    <span className="mr-2">+</span>
                    Nova Conta a Pagar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Registro de Pagamentos */}
        {activeContasPagar === "pagamentos" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Formulário de Pagamento */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900">
                    💳 Registro de Pagamento
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Conta a Pagar *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                          <option value="">Selecione a conta</option>
                          <option value="CP-2024-0023">
                            CP-2024-0023 - Hollard (120.000 MT)
                          </option>
                          <option value="CP-2024-0028">
                            CP-2024-0028 - GALP (280.000 MT)
                          </option>
                          <option value="CP-2024-0030">
                            CP-2024-0030 - Oficina (150.000 MT)
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Valor Pago (MT) *
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="0,00"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data do Pagamento *
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Forma de Pagamento *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                          <option value="">Selecione</option>
                          <option value="transferencia">
                            Transferência Bancária
                          </option>
                          <option value="multicaixa">
                            Multicaixa Express
                          </option>
                          <option value="dinheiro">Dinheiro</option>
                          <option value="cheque">Cheque</option>
                          <option value="debito">Débito Directo</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nº do Comprovante
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="Nº do comprovante bancário"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Categoria de Despesa
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                          <option value="">Selecione</option>
                          <option value="combustivel">Combustível</option>
                          <option value="manutencao">Manutenção</option>
                          <option value="salarios">Salários</option>
                          <option value="seguros">Seguros</option>
                          <option value="impostos">Impostos e Taxas</option>
                          <option value="operacionais">
                            Despesas Operacionais
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Observações
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        placeholder="Observações sobre o pagamento..."
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
                        Registrar Pagamento
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Informações da Conta */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Informações da Conta
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Nº Conta:</span>
                    <p className="font-medium text-gray-950">
                      CP-2024-0028
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Fornecedor:</span>
                    <p className="font-medium text-gray-950">
                      GALP Moçambique
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Valor Total:</span>
                    <p className="font-medium text-gray-950">280.000 MT</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Vencimento:</span>
                    <p className="font-medium text-gray-950">18/01/2024</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Categoria:</span>
                    <p className="font-medium text-gray-950">Combustível</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Descrição:</span>
                    <p className="font-medium text-gray-950">
                      Abastecimento mensal frota
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Histórico Recente
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-gray-950">
                      CP-2024-0015
                    </p>
                    <p className="text-xs text-gray-600">
                      Salários • 420.000 MT
                    </p>
                    <p className="text-xs text-blue-600 font-medium">
                      Pago via Transferência
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-gray-950">
                      CP-2024-0018
                    </p>
                    <p className="text-xs text-gray-600">
                      Oficina Maputo • 95.000 MT
                    </p>
                    <p className="text-xs text-blue-600 font-medium">
                      Pago via Multicaixa
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gestão de Fornecedores */}
        {activeContasPagar === "fornecedores" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  🏢 Gestão de Fornecedores
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <p className="font-medium text-gray-900">
                      GALP Moçambique
                    </p>
                    <p className="text-sm text-gray-600">
                      Combustível e Lubrificantes
                    </p>
                    <p className="text-lg font-bold text-orange-600">
                      480.000 MT
                    </p>
                    <p className="text-xs text-gray-500">NUIT: 123456789</p>
                  </div>

                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <p className="font-medium text-gray-900">
                      Oficina Maputo
                    </p>
                    <p className="text-sm text-gray-600">
                      Manutenção Veicular
                    </p>
                    <p className="text-lg font-bold text-orange-600">
                      320.000 MT
                    </p>
                    <p className="text-xs text-gray-500">NUIT: 987654321</p>
                  </div>

                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <p className="font-medium text-gray-900">
                      Hollard Seguros
                    </p>
                    <p className="text-sm text-gray-600">
                      Seguros da Frota
                    </p>
                    <p className="text-lg font-bold text-orange-600">
                      280.000 MT
                    </p>
                    <p className="text-xs text-gray-500">NUIT: 456123789</p>
                  </div>

                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <p className="font-medium text-gray-900">ENAPOR</p>
                    <p className="text-sm text-gray-600">
                      Portagens e Taxas
                    </p>
                    <p className="text-lg font-bold text-orange-600">
                      150.000 MT
                    </p>
                    <p className="text-xs text-gray-500">Empresa Pública</p>
                  </div>
                </div>

                {/* Detalhes do Fornecedor */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">
                    Informações do Fornecedor
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome do Fornecedor
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                        placeholder="Nome completo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        NUIT
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                        placeholder="Número de Identificação"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contacto
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                        placeholder="Telefone/Email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Morada
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                        placeholder="Endereço completo"
                      />
                    </div>
                  </div>
                  <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                    Adicionar Fornecedor
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gráficos */}
        {activeContasPagar === "graficos" && (
          <div className="space-y-6 text-gray-950">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                    📊
                  </span>
                  Dashboard Financeiro - Contas a Pagar
                </h3>
              </div>
              <div className="p-6">
                {/* Grid de Gráficos Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Distribuição por Status */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-orange-500 mr-2">📤</span>
                      Distribuição por Status
                    </h4>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center w-full">
                        <div className="flex justify-center mb-4">
                          <div className="relative w-32 h-32">
                            <div
                              className="w-full h-full rounded-full"
                              style={{
                                background:
                                  "conic-gradient(#10b981 0% 45%, #3b82f6 45% 75%, #f59e0b 75% 85%, #ef4444 85% 100%)",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                            <span>Pago (45%) - 1.250K MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                            <span>A Vencer (30%) - 850K MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                            <span>Programado (10%) - 280K MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                            <span>Vencido (15%) - 320K MT</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Pagamentos por Semana */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-purple-500 mr-2">📈</span>
                      Pagamentos por Semana (Últimas 4 Semanas)
                    </h4>

                    <div className="h-64 flex items-end justify-between space-x-1">
                      {[
                        {
                          semana: "Sem 1",
                          pago: 320000,
                          previsto: 380000,
                          corPago: "bg-blue-500",
                          corPrevisto: "bg-gray-300",
                        },
                        {
                          semana: "Sem 2",
                          pago: 280000,
                          previsto: 350000,
                          corPago: "bg-blue-600",
                          corPrevisto: "bg-gray-300",
                        },
                        {
                          semana: "Sem 3",
                          pago: 350000,
                          previsto: 420000,
                          corPago: "bg-green-500",
                          corPrevisto: "bg-gray-300",
                        },
                        {
                          semana: "Sem 4",
                          pago: 300000,
                          previsto: 450000,
                          corPago: "bg-green-600",
                          corPrevisto: "bg-gray-300",
                        },
                      ].map((item, index) => {
                        const total = 500000; // base máxima para proporcionalidade
                        return (
                          <div
                            key={index}
                            className="flex flex-col items-center flex-1 h-full"
                          >
                            <div className="flex flex-col justify-end h-full w-3/4 rounded-t-lg overflow-hidden">
                              {/* Previsto */}
                              <div
                                className={`${item.corPrevisto} transition-all hover:opacity-80`}
                                style={{
                                  height: `${
                                    (item.previsto / total) * 100
                                  }%`,
                                }}
                                title={`${item.semana} - Previsto: ${(
                                  item.previsto / 1000
                                ).toFixed(0)}K MT`}
                              ></div>
                              {/* Pago */}
                              <div
                                className={`${item.corPago} transition-all hover:opacity-80`}
                                style={{
                                  height: `${(item.pago / total) * 100}%`,
                                }}
                                title={`${item.semana} - Pago: ${(
                                  item.pago / 1000
                                ).toFixed(0)}K MT`}
                              ></div>
                            </div>
                            <span className="text-xs mt-2 font-medium text-center">
                              {item.semana}
                            </span>
                            <span className="text-xs text-gray-500">
                              {(item.pago / 1000).toFixed(0)}K /{" "}
                              {(item.previsto / 1000).toFixed(0)}K
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Legenda */}
                    <div className="flex justify-center space-x-4 mt-4 text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
                        <span>Pago</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-gray-300 rounded mr-1"></div>
                        <span>Previsto</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Segunda Linha de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {/* Gráfico de Despesas por Fornecedor */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-red-500 mr-2">🏢</span>
                      Despesas por Fornecedor
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            fornecedor: "GALP Moçambique",
                            total: 480000,
                            pendente: 280000,
                            cor: "bg-orange-500",
                            porcentagem: 26,
                          },
                          {
                            fornecedor: "Oficina Maputo",
                            total: 320000,
                            pendente: 150000,
                            cor: "bg-blue-500",
                            porcentagem: 17,
                          },
                          {
                            fornecedor: "Hollard Seguros",
                            total: 280000,
                            pendente: 120000,
                            cor: "bg-green-500",
                            porcentagem: 15,
                          },
                          {
                            fornecedor: "ENAPOR",
                            total: 150000,
                            pendente: 85000,
                            cor: "bg-purple-500",
                            porcentagem: 8,
                          },
                          {
                            fornecedor: "Outros",
                            total: 620000,
                            pendente: 215000,
                            cor: "bg-gray-500",
                            porcentagem: 34,
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
                                  {item.fornecedor}
                                </span>
                                <span className="text-sm font-bold text-gray-700 ml-2 whitespace-nowrap flex-shrink-0">
                                  {item.porcentagem}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${item.cor}`}
                                  style={{ width: `${item.porcentagem}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1 flex justify-between">
                                <span>
                                  {(item.pendente / 1000).toFixed(0)}K
                                  pendente
                                </span>
                                <span className="font-medium">
                                  {(item.total / 1000).toFixed(0)}K total
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Formas de Pagamento */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-green-500 mr-2">💳</span>
                      Formas de Pagamento Utilizadas
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            metodo: "Transferência Bancária",
                            quantidade: 32,
                            valor: 980000,
                            cor: "bg-blue-500",
                            porcentagem: 52,
                            icon: "🏦",
                          },
                          {
                            metodo: "Multicaixa Express",
                            quantidade: 18,
                            valor: 420000,
                            cor: "bg-green-500",
                            porcentagem: 22,
                            icon: "💳",
                          },
                          {
                            metodo: "Débito Directo",
                            quantidade: 8,
                            valor: 280000,
                            cor: "bg-cyan-500",
                            porcentagem: 15,
                            icon: "📋",
                          },
                          {
                            metodo: "Dinheiro",
                            quantidade: 12,
                            valor: 150000,
                            cor: "bg-orange-500",
                            porcentagem: 8,
                            icon: "💵",
                          },
                          {
                            metodo: "Cheque",
                            quantidade: 5,
                            valor: 20000,
                            cor: "bg-purple-500",
                            porcentagem: 3,
                            icon: "📄",
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
                                  {item.metodo}
                                </span>
                                <span className="text-sm font-bold text-gray-700 ml-2 whitespace-nowrap flex-shrink-0">
                                  {(item.valor / 1000).toFixed(0)}K MT
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${item.cor}`}
                                  style={{ width: `${item.porcentagem}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1 flex justify-between">
                                <span>{item.quantidade} transações</span>
                                <span>{item.porcentagem}% do total</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Despesas por Categoria */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-red-500 mr-2">💸</span>
                      Despesas por Categoria
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            categoria: "Combustível",
                            quantidade: 15,
                            valor: 450000,
                            cor: "bg-yellow-500",
                            porcentagem: 35,
                            icon: "⛽",
                          },
                          {
                            categoria: "Manutenção",
                            quantidade: 10,
                            valor: 320000,
                            cor: "bg-blue-500",
                            porcentagem: 25,
                            icon: "🔧",
                          },
                          {
                            categoria: "Alimentação",
                            quantidade: 8,
                            valor: 150000,
                            cor: "bg-green-500",
                            porcentagem: 12,
                            icon: "🍽️",
                          },
                          {
                            categoria: "Estacionamento",
                            quantidade: 5,
                            valor: 90000,
                            cor: "bg-purple-500",
                            porcentagem: 8,
                            icon: "🅿️",
                          },
                          {
                            categoria: "Outros",
                            quantidade: 6,
                            valor: 260000,
                            cor: "bg-red-500",
                            porcentagem: 20,
                            icon: "📦",
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
                                  {item.categoria}
                                </span>
                                <span className="text-sm font-bold text-gray-700 ml-2 whitespace-nowrap flex-shrink-0">
                                  {(item.valor / 1000).toFixed(0)}K MT
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${item.cor}`}
                                  style={{ width: `${item.porcentagem}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1 flex justify-between">
                                <span>{item.quantidade} despesas</span>
                                <span>{item.porcentagem}% do total</span>
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
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600 font-medium">
                      Pago Este Mês
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      1.250K MT
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      78% do planeado
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">
                      A Vencer (7 dias)
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      850K MT
                    </p>
                    <p className="text-xs text-blue-600 mt-1">12 contas</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-sm text-red-600 font-medium">
                      Vencidos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      320K MT
                    </p>
                    <p className="text-xs text-red-600 mt-1">
                      17.3% do total
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-600 font-medium">
                      Ticket Médio
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      154K MT
                    </p>
                    <p className="text-xs text-purple-600 mt-1">
                      +8% vs mês passado
                    </p>
                  </div>
                </div>

                {/* Terceira Linha de Gráficos */}
                {/* Gráfico de Projeção de Pagamentos - Barras Empilhadas */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-indigo-500 mr-2">🔮</span>
                    Projeção de Pagamentos (Próximos 30 Dias)
                  </h4>

                  <div className="h-64 flex items-end justify-between space-x-1">
                    {[
                      {
                        semana: "Esta Sem",
                        valor: 280000,
                        tipo: "urgente",
                        cor: "bg-red-500",
                      },
                      {
                        semana: "Próx Sem",
                        valor: 320000,
                        tipo: "confirmado",
                        cor: "bg-orange-500",
                      },
                      {
                        semana: "Sem 3",
                        valor: 180000,
                        tipo: "previsto",
                        cor: "bg-yellow-500",
                      },
                      {
                        semana: "Sem 4",
                        valor: 150000,
                        tipo: "previsto",
                        cor: "bg-blue-400",
                      },
                      {
                        semana: "Sem 5",
                        valor: 120000,
                        tipo: "potencial",
                        cor: "bg-blue-300",
                      },
                    ].map((item, index) => {
                      const total = 400000; // base máxima para proporcionalidade
                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center flex-1 h-full"
                        >
                          <div className="flex flex-col justify-end h-full w-3/4 rounded-t-lg overflow-hidden">
                            <div
                              className={`${item.cor} w-full transition-all hover:opacity-80`}
                              style={{
                                height: `${(item.valor / total) * 100}%`,
                              }}
                              title={`${item.semana}: ${(
                                item.valor / 1000
                              ).toFixed(0)}K MT (${item.tipo})`}
                            ></div>
                          </div>
                          <span className="text-xs mt-2 font-medium text-center">
                            {item.semana}
                          </span>
                          <span className="text-xs text-gray-500">
                            {(item.valor / 1000).toFixed(0)}K
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Legenda */}
                  <div className="flex justify-center space-x-4 mt-4 text-xs">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
                      <span>Urgente</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded mr-1"></div>
                      <span>Confirmado</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded mr-1"></div>
                      <span>Previsto</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-400 rounded mr-1"></div>
                      <span>Previsto</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-300 rounded mr-1"></div>
                      <span>Potencial</span>
                    </div>
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
                        <option>Trimestre Atual</option>
                        <option>Este Ano</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos</option>
                        <option>Pago</option>
                        <option>A Vencer</option>
                        <option>Vencido</option>
                        <option>Programado</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fornecedor
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos os Fornecedores</option>
                        <option>GALP Moçambique</option>
                        <option>Oficina Maputo</option>
                        <option>Hollard Seguros</option>
                        <option>ENAPOR</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categoria
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todas as Categorias</option>
                        <option>Combustível</option>
                        <option>Manutenção</option>
                        <option>Salários</option>
                        <option>Seguros</option>
                        <option>Impostos/Taxas</option>
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

        {/* Relatórios */}
        {activeContasPagar === "relatorios" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-blue-50">
              <h3 className="font-semibold text-gray-900">
                📈 Relatórios de Pagamentos
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100">
                  <div className="text-blue-600 text-lg mb-2">💰</div>
                  <p className="font-medium text-gray-900">
                    Fluxo de Pagamentos
                  </p>
                  <p className="text-sm text-gray-600">
                    Saídas por período
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100">
                  <div className="text-green-600 text-lg mb-2">📊</div>
                  <p className="font-medium text-gray-900">
                    Por Fornecedor
                  </p>
                  <p className="text-sm text-gray-600">
                    Despesas por fornecedor
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 cursor-pointer hover:bg-orange-100">
                  <div className="text-orange-600 text-lg mb-2">🏷️</div>
                  <p className="font-medium text-gray-900">Por Categoria</p>
                  <p className="text-sm text-gray-600">
                    Despesas categorizadas
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
                      <option>Fluxo de Pagamentos Detalhado</option>
                      <option>Relatório por Fornecedor</option>
                      <option>Despesas por Categoria</option>
                      <option>Contas Vencidas</option>
                      <option>Previsão de Pagamentos</option>
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
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-purple-600 font-medium">
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

export default ContasPagar;