import React, { useState } from 'react';

const ContasReceber = () => {
  const [activeContasReceber, setActiveContasReceber] = useState("dashboard");

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            💰
          </span>
          Contas a Receber - Gestão de Recebíveis
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Controle e acompanhamento de recebíveis, faturas e fluxo de caixa
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveContasReceber("dashboard")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContasReceber === "dashboard"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveContasReceber("faturas")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContasReceber === "faturas"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📄 Faturas
          </button>
          <button
            onClick={() => setActiveContasReceber("recebimentos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContasReceber === "recebimentos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            💸 Recebimentos
          </button>
          <button
            onClick={() => setActiveContasReceber("graficos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContasReceber === "graficos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Gráficos
          </button>
          <button
            onClick={() => setActiveContasReceber("relatorios")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeContasReceber === "relatorios"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Relatórios
          </button>
        </div>

        {/* Dashboard */}
        {activeContasReceber === "dashboard" && (
          <div className="space-y-6">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total a Receber
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      2.850.000 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">💰</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    +15% vs mês passado
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
                      450.000 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">⚠️</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    3 faturas atrasadas
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
                      1.200.000 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">⏳</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    8 faturas
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Recebido Mês
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      1.750.000 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">✅</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    85% da meta
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Próximos Vencimentos */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-green-50">
                  <h3 className="font-semibold text-gray-900">
                    📅 Próximos Vencimentos
                  </h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          FT-2024-0158
                        </p>
                        <p className="text-sm text-gray-600">
                          Cimentos de Moçambique
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          350.000 MT
                        </p>
                        <p className="text-sm text-blue-600">
                          Vence amanhã
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          FT-2024-0162
                        </p>
                        <p className="text-sm text-gray-600">
                          Matola Iron & Steel
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          280.000 MT
                        </p>
                        <p className="text-sm text-blue-600">
                          2 dias úteis
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          FT-2024-0165
                        </p>
                        <p className="text-sm text-gray-600">
                          Grupo João Ferreira
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

              {/* Faturas Vencidas */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-red-50">
                  <h3 className="font-semibold text-gray-900">
                    ⚠️ Faturas Vencidas
                  </h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          FT-2024-0145
                        </p>
                        <p className="text-sm text-gray-600">
                          ConstruMa Lda - Maputo
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          150.000 MT
                        </p>
                        <p className="text-sm text-blue-600">
                          5 dias atrasado
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          FT-2024-0150
                        </p>
                        <p className="text-sm text-gray-600">
                          Mozal - Matola
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          220.000 MT
                        </p>
                        <p className="text-sm text-blue-600">
                          3 dias atrasado
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          FT-2024-0152
                        </p>
                        <p className="text-sm text-gray-600">
                          Cervejas de Moçambique
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">80.000 MT</p>
                        <p className="text-sm text-blue-600">
                          1 dia atrasado
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Clientes Principais */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  🏢 Principais Clientes
                </h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-900">
                      Cimentos de Moçambique
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      850.000 MT
                    </p>
                    <p className="text-sm text-gray-600">
                      2 faturas pendentes
                    </p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-900">Mozal</p>
                    <p className="text-2xl font-bold text-gray-900">
                      620.000 MT
                    </p>
                    <p className="text-sm text-gray-600">
                      1 fatura atrasada
                    </p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-900">
                      Grupo João Ferreira
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      420.000 MT
                    </p>
                    <p className="text-sm text-gray-600">
                      1 fatura a vencer
                    </p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-900">
                      Matola Iron & Steel
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      280.000 MT
                    </p>
                    <p className="text-sm text-gray-600">Próxima semana</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gestão de Faturas */}
        {activeContasReceber === "faturas" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-green-50">
                <h3 className="font-semibold text-gray-900">
                  📄 Gestão de Facturas
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
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Cliente: Todos</option>
                    <option>Cimentos de Moçambique</option>
                    <option>Mozal</option>
                    <option>Grupo João Ferreira</option>
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

                {/* Lista de Faturas */}
                <div className="space-y-3">
                  {/* Fatura 1 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-12 bg-red-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900">
                          FT-2024-0145
                        </p>
                        <p className="text-sm text-gray-600">
                          ConstruMa Lda - Maputo
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Valor</p>
                      <p className="font-bold text-gray-900">150.000 MT</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Vencimento</p>
                      <p className="text-gray-900 font-medium">
                        10/01/2024
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Status</p>
                      <span className="px-2 py-1 bg-gray-100 text-gray-900 rounded-full text-xs">
                        Vencida
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                        Receber
                      </button>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Detalhes
                      </button>
                    </div>
                  </div>

                  {/* Fatura 2 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-12 bg-yellow-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900">
                          FT-2024-0158
                        </p>
                        <p className="text-sm text-gray-600">
                          Cimentos de Moçambique
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Valor</p>
                      <p className="font-bold text-gray-900">350.000 MT</p>
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
                        Receber
                      </button>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Detalhes
                      </button>
                    </div>
                  </div>

                  {/* Fatura 3 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-12 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900">
                          FT-2024-0135
                        </p>
                        <p className="text-sm text-gray-600">
                          Cervejas de Moçambique
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Valor</p>
                      <p className="font-bold text-gray-900">180.000 MT</p>
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
              </div>
            </div>
          </div>
        )}

        {/* Registro de Recebimentos */}
        {activeContasReceber === "recebimentos" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Formulário de Recebimento */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-green-50">
                  <h3 className="font-semibold text-gray-900">
                    💸 Registro de Recebimento
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Factura *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950">
                          <option value="">Selecione a factura</option>
                          <option value="FT-2024-0145">
                            FT-2024-0145 - ConstruMa (150.000 MT)
                          </option>
                          <option value="FT-2024-0158">
                            FT-2024-0158 - Cimentos MZ (350.000 MT)
                          </option>
                          <option value="FT-2024-0162">
                            FT-2024-0162 - Matola Steel (280.000 MT)
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Valor Recebido (MT) *
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                          placeholder="0,00"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data do Recebimento *
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Forma de Pagamento *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950">
                          <option value="">Selecione</option>
                          <option value="transferencia">
                            Transferência Bancária
                          </option>
                          <option value="multicaixa">
                            Multicaixa Express
                          </option>
                          <option value="dinheiro">Dinheiro</option>
                          <option value="cheque">Cheque</option>
                          <option value="mbiz">M-Pesa/e-Mola</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Comprovante/Referência
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                        placeholder="Nº do comprovante ou referência"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Observações
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                        placeholder="Observações sobre o recebimento..."
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
                        Registrar Recebimento
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Informações da Fatura */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Informações da Factura
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Nº Factura:</span>
                    <p className="font-medium text-gray-950">
                      FT-2024-0158
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Cliente:</span>
                    <p className="font-medium text-gray-950">
                      Cimentos de Moçambique
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Valor Total:</span>
                    <p className="font-medium text-gray-950">350.000 MT</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Vencimento:</span>
                    <p className="font-medium text-gray-950">18/01/2024</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Serviço:</span>
                    <p className="font-medium text-gray-950">
                      Transporte Maputo-Nampula
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
                      FT-2024-0135
                    </p>
                    <p className="text-xs text-gray-600">
                      Cervejas de Moçambique • 180.000 MT
                    </p>
                    <p className="text-xs text-blue-600 font-medium">
                      Pago via Transferência
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-gray-950">
                      FT-2024-0132
                    </p>
                    <p className="text-xs text-gray-600">
                      Mozal • 320.000 MT
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

        {/* Gráficos */}
        {activeContasReceber === "graficos" && (
          <div className="space-y-6 text-gray-950">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                    📊
                  </span>
                  Dashboard Financeiro - Contas a Receber
                </h3>
              </div>
              <div className="p-6">
                {/* Grid de Gráficos Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Distribuição por Status */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-green-500 mr-2">💰</span>
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
                            <span>Recebido (45%) - 1.750.000 MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                            <span>A Vencer (30%) - 1.200.000 MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                            <span>Vencendo (10%) - 450.000 MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                            <span>Vencido (15%) - 450.000 MT</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Despesas por Categoria */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-red-500 mr-2">💸</span>
                      Despesas por Categoria
                    </h4>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center w-full">
                        {/* Gráfico Circular */}
                        <div className="flex justify-center mb-4">
                          <div className="relative w-32 h-32">
                            <div
                              className="w-full h-full rounded-full"
                              style={{
                                background:
                                  "conic-gradient(#f59e0b 0% 35%, #3b82f6 35% 60%, #10b981 60% 72%, #a855f7 72% 80%, #ef4444 80% 100%)",
                              }}
                            ></div>
                          </div>
                        </div>
                        {/* Legenda */}
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                            <span>Combustível (35%) - 450.000 MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                            <span>Manutenção (25%) - 320.000 MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                            <span>Alimentação (12%) - 150.000 MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                            <span>Estacionamento (8%) - 90.000 MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                            <span>Outros (20%) - 260.000 MT</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Segunda Linha de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {/* Gráfico de Inadimplência por Cliente */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-red-500 mr-2">⚠️</span>
                      Inadimplência por Cliente
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            cliente: "Mozal",
                            total: 620000,
                            vencido: 220000,
                            cor: "bg-blue-500",
                            taxa: 35.5,
                          },
                          {
                            cliente: "ConstruMa Lda",
                            total: 450000,
                            vencido: 150000,
                            cor: "bg-green-500",
                            taxa: 33.3,
                          },
                          {
                            cliente: "Cervejas de MZ",
                            total: 260000,
                            vencido: 80000,
                            cor: "bg-cyan-500",
                            taxa: 30.8,
                          },
                          {
                            cliente: "Distribuidora Norte",
                            total: 180000,
                            vencido: 0,
                            cor: "bg-purple-500",
                            taxa: 0.0,
                          },
                          {
                            cliente: "Comércio Geral",
                            total: 120000,
                            vencido: 0,
                            cor: "bg-gray-500",
                            taxa: 0.0,
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
                                  {item.cliente}
                                </span>
                                <span className="text-sm font-bold text-gray-700 ml-2 whitespace-nowrap flex-shrink-0">
                                  {item.taxa}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${item.cor}`}
                                  style={{ width: `${item.taxa}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1 flex justify-between">
                                <span>
                                  {(item.vencido / 1000).toFixed(0)}K de{" "}
                                  {(item.total / 1000).toFixed(0)}K MT
                                </span>
                                <span
                                  className={`font-medium ${
                                    item.taxa === 0
                                      ? "text-green-600"
                                      : item.taxa <= 20
                                      ? "text-yellow-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {item.taxa === 0
                                    ? "Em dia"
                                    : item.taxa <= 20
                                    ? "Atenção"
                                    : "Crítico"}
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
                      Formas de Pagamento Mais Utilizadas
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            metodo: "Transferência Bancária",
                            quantidade: 28,
                            valor: 1250000,
                            cor: "bg-blue-500",
                            porcentagem: 45,
                            icon: "🏦",
                          },
                          {
                            metodo: "Multicaixa Express",
                            quantidade: 15,
                            valor: 680000,
                            cor: "bg-green-500",
                            porcentagem: 25,
                            icon: "💳",
                          },
                          {
                            metodo: "M-Pesa/e-Mola",
                            quantidade: 12,
                            valor: 320000,
                            cor: "bg-cyan-500",
                            porcentagem: 12,
                            icon: "📱",
                          },
                          {
                            metodo: "Dinheiro",
                            quantidade: 8,
                            valor: 180000,
                            cor: "bg-orange-500",
                            porcentagem: 7,
                            icon: "💵",
                          },
                          {
                            metodo: "Cheque",
                            quantidade: 5,
                            valor: 120000,
                            cor: "bg-purple-500",
                            porcentagem: 5,
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

                  {/* Gráfico de Performance de Cobrança */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-amber-500 mr-2">📊</span>
                      Performance de Cobrança
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            periodo: "0-7 dias",
                            taxa: 92,
                            meta: 90,
                            cor: "bg-green-500",
                            tendencia: "+2%",
                            icon: "⚡",
                          },
                          {
                            periodo: "8-15 dias",
                            taxa: 85,
                            meta: 85,
                            cor: "bg-blue-500",
                            tendencia: "0%",
                            icon: "⏳",
                          },
                          {
                            periodo: "16-30 dias",
                            taxa: 78,
                            meta: 80,
                            cor: "bg-yellow-500",
                            tendencia: "-2%",
                            icon: "🔔",
                          },
                          {
                            periodo: "+30 dias",
                            taxa: 65,
                            meta: 70,
                            cor: "bg-orange-500",
                            tendencia: "-5%",
                            icon: "⚠️",
                          },
                          {
                            periodo: "+60 dias",
                            taxa: 45,
                            meta: 50,
                            cor: "bg-red-500",
                            tendencia: "-5%",
                            icon: "❌",
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
                                  {item.periodo}
                                </span>
                                <div className="text-sm font-bold text-gray-700 ml-2 flex-shrink-0">
                                  {item.taxa}%{" "}
                                  <span
                                    className={`ml-1 text-xs ${
                                      item.tendencia.startsWith("+")
                                        ? "text-green-600"
                                        : item.tendencia.startsWith("-")
                                        ? "text-red-600"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    {item.tendencia}
                                  </span>
                                </div>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                  className={`h-3 rounded-full ${item.cor} transition-all duration-500`}
                                  style={{ width: `${item.taxa}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1 flex justify-between">
                                <span>Meta: {item.meta}%</span>
                                <span
                                  className={`font-medium ${
                                    item.taxa >= item.meta
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {item.taxa >= item.meta ? "✓" : "✗"}
                                </span>
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
                      Recebido Este Mês
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      1.750K MT
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      85% da meta
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">
                      A Vencer (7 dias)
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      1.200K MT
                    </p>
                    <p className="text-xs text-blue-600 mt-1">8 faturas</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-sm text-red-600 font-medium">
                      Inadimplência
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      450K MT
                    </p>
                    <p className="text-xs text-red-600 mt-1">
                      15.8% do total
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-600 font-medium">
                      Ticket Médio
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      285K MT
                    </p>
                    <p className="text-xs text-purple-600 mt-1">
                      +12% vs mês passado
                    </p>
                  </div>
                </div>

                {/* Terceira Linha de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Projeção de Recebimentos - Barras Empilhadas */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-indigo-500 mr-2">🔮</span>
                      Projeção de Recebimentos (Próximos 30 Dias)
                    </h4>

                    <div className="h-64 flex items-end justify-between space-x-1">
                      {[
                        {
                          semana: "Esta Sem",
                          valor: 420000,
                          tipo: "confirmado",
                          cor: "bg-green-500",
                        },
                        {
                          semana: "Próx Sem",
                          valor: 380000,
                          tipo: "previsto",
                          cor: "bg-blue-500",
                        },
                        {
                          semana: "Sem 3",
                          valor: 350000,
                          tipo: "previsto",
                          cor: "bg-blue-400",
                        },
                        {
                          semana: "Sem 4",
                          valor: 320000,
                          tipo: "previsto",
                          cor: "bg-blue-300",
                        },
                        {
                          semana: "Sem 5",
                          valor: 280000,
                          tipo: "potencial",
                          cor: "bg-purple-300",
                        },
                      ].map((item, index) => {
                        const total = 500000; // base máxima para proporcionalidade
                        return (
                          <div
                            key={index}
                            className="flex flex-col items-center flex-1 h-full"
                          >
                            <div className="flex flex-col justify-end h-full w-3/4 rounded-t-lg overflow-hidden">
                              <div
                                className={`w-full ${item.cor} transition-all hover:opacity-80`}
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
                        <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
                        <span>Confirmado</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
                        <span>Previsto</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-300 rounded mr-1"></div>
                        <span>Potencial</span>
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Concentração de Clientes */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-amber-500 mr-2">🏢</span>
                      Concentração por Cliente (% da Carteira)
                    </h4>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center w-full">
                        <div className="flex justify-center mb-4">
                          <div className="relative w-32 h-32">
                            <div
                              className="w-full h-full rounded-full"
                              style={{
                                background:
                                  "conic-gradient(#3b82f6 0% 30%, #10b981 30% 55%, #f59e0b 55% 75%, #8b5cf6 75% 90%, #ef4444 90% 100%)",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                            <span>Cimentos MZ (30%) - 850K MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                            <span>Mozal (25%) - 620K MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                            <span>Grupo JF (20%) - 420K MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                            <span>Outros (15%) - 380K MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                            <span>Matola Steel (10%) - 280K MT</span>
                          </div>
                        </div>
                      </div>
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
                        <option>Recebido</option>
                        <option>A Vencer</option>
                        <option>Vencido</option>
                        <option>Vencendo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cliente
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos os Clientes</option>
                        <option>Cimentos de Moçambique</option>
                        <option>Mozal</option>
                        <option>Grupo João Ferreira</option>
                        <option>Matola Iron & Steel</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Valor Mínimo
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Qualquer valor</option>
                        <option>Acima de 100.000 MT</option>
                        <option>Acima de 250.000 MT</option>
                        <option>Acima de 500.000 MT</option>
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
        {activeContasReceber === "relatorios" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-purple-50">
              <h3 className="font-semibold text-gray-900">
                📈 Relatórios Financeiros
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100">
                  <div className="text-blue-600 text-lg mb-2">💰</div>
                  <p className="font-medium text-gray-900">
                    Fluxo de Caixa
                  </p>
                  <p className="text-sm text-gray-600">Entradas e saídas</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100">
                  <div className="text-green-600 text-lg mb-2">📊</div>
                  <p className="font-medium text-gray-900">Inadimplência</p>
                  <p className="text-sm text-gray-600">
                    Clientes em atraso
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 cursor-pointer hover:bg-orange-100">
                  <div className="text-orange-600 text-lg mb-2">🏢</div>
                  <p className="font-medium text-gray-900">Por Cliente</p>
                  <p className="text-sm text-gray-600">
                    Performance por cliente
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
                      <option>Fluxo de Caixa Detalhado</option>
                      <option>Relatório de Inadimplência</option>
                      <option>Recebimentos por Cliente</option>
                      <option>Faturas Pendentes</option>
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

export default ContasReceber;