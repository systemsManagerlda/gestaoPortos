import React, { useState } from 'react';

const FluxoCaixa = () => {
  const [activeFluxoCaixa, setActiveFluxoCaixa] = useState("diario");

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            💰
          </span>
          Fluxo de Caixa - Controle Diário
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Controle detalhado do fluxo de caixa diário, entradas, saídas e
          saldos
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveFluxoCaixa("diario")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeFluxoCaixa === "diario"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📅 Diário
          </button>
          <button
            onClick={() => setActiveFluxoCaixa("registro")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeFluxoCaixa === "registro"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ✨ Novo Registro
          </button>
          <button
            onClick={() => setActiveFluxoCaixa("conciliacao")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeFluxoCaixa === "conciliacao"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🔄 Conciliação
          </button>
          <button
            onClick={() => setActiveFluxoCaixa("graficos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeFluxoCaixa === "graficos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Gráficos
          </button>
          <button
            onClick={() => setActiveFluxoCaixa("relatorios")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeFluxoCaixa === "relatorios"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Relatórios
          </button>
        </div>

        {/* Fluxo de Caixa Diário */}
        {activeFluxoCaixa === "diario" && (
          <div className="space-y-6">
            {/* Cartões de Resumo do Dia */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Saldo Anterior
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      850.000 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">💰</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    Fechamento ontem
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Entradas Hoje
                    </p>
                    <p className="text-2xl font-bold text-gray-600">
                      285.000 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">📥</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    3 recebimentos
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Saídas Hoje
                    </p>
                    <p className="text-2xl font-bold text-gray-600">
                      120.000 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">📤</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    5 pagamentos
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Saldo Atual
                    </p>
                    <p className="text-2xl font-bold text-gray-600">
                      1.015.000 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">📈</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    +165.000 MT
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Movimentações do Dia */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900">
                    📊 Movimentações de Hoje - 15/01/2024
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {/* Entradas */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 flex items-center">
                        <span className="text-blue-500 mr-2">📥</span>
                        Entradas do Dia
                      </h4>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                            FT
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Cimentos de Moçambique
                            </p>
                            <p className="text-sm text-gray-600">
                              FT-2024-0158 • Transferência
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">
                            150.000 MT
                          </p>
                          <p className="text-xs text-gray-600">09:30</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                            FT
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Mozal
                            </p>
                            <p className="text-sm text-gray-600">
                              FT-2024-0160 • Multicaixa
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">
                            85.000 MT
                          </p>
                          <p className="text-xs text-gray-600">11:45</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                            FT
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Grupo João Ferreira
                            </p>
                            <p className="text-sm text-gray-600">
                              FT-2024-0161 • Dinheiro
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">
                            50.000 MT
                          </p>
                          <p className="text-xs text-gray-600">14:20</p>
                        </div>
                      </div>
                    </div>

                    {/* Saídas */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 flex items-center">
                        <span className="text-red-500 mr-2">📤</span>
                        Saídas do Dia
                      </h4>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                            PG
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Combustível - GALP
                            </p>
                            <p className="text-sm text-gray-600">
                              Abastecimento frota
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">
                            45.000 MT
                          </p>
                          <p className="text-xs text-gray-600">08:15</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                            PG
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Manutenção - Oficina
                            </p>
                            <p className="text-sm text-gray-600">
                              Reparação camião AB-123-MP
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">
                            35.000 MT
                          </p>
                          <p className="text-xs text-gray-600">10:30</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                            PG
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Despesas Administrativas
                            </p>
                            <p className="text-sm text-gray-600">
                              Material escritório
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">
                            25.000 MT
                          </p>
                          <p className="text-xs text-gray-600">16:45</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                            PG
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Portagens - ENAPOR
                            </p>
                            <p className="text-sm text-gray-600">
                              Portagens acumuladas
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">
                            15.000 MT
                          </p>
                          <p className="text-xs text-gray-600">17:20</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resumo e Ações */}
              <div className="space-y-6">
                {/* Resumo do Dia */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    📈 Resumo do Dia
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm text-gray-600">
                        Saldo Anterior:
                      </span>
                      <span className="font-bold text-gray-900">
                        850.000 MT
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm text-gray-600">
                        Total Entradas:
                      </span>
                      <span className="font-bold text-gray-900">
                        285.000 MT
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-sm text-gray-600">
                        Total Saídas:
                      </span>
                      <span className="font-bold text-gray-900">
                        120.000 MT
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                      <span className="text-sm font-medium text-gray-700">
                        Saldo do Dia:
                      </span>
                      <span className="font-bold text-gray-900">
                        +165.000 MT
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">
                        Saldo Final:
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        1.015.000 MT
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ações Rápidas */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    ⚡ Ações Rápidas
                  </h4>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm flex items-center justify-center">
                      <span className="mr-2">📥</span>
                      Registrar Entrada
                    </button>
                    <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm flex items-center justify-center">
                      <span className="mr-2">📤</span>
                      Registrar Saída
                    </button>
                    <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm flex items-center justify-center">
                      <span className="mr-2">🔒</span>
                      Fechar Caixa
                    </button>
                    <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm flex items-center justify-center">
                      <span className="mr-2">📄</span>
                      Extrato do Dia
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Registro de Movimentação */}
        {activeFluxoCaixa === "registro" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Formulário de Registro */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900">
                    ✨ Nova Movimentação de Caixa
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    {/* Tipo de Movimentação */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Tipo de Movimentação *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="relative flex cursor-pointer">
                          <input
                            type="radio"
                            name="tipo"
                            value="entrada"
                            className="sr-only"
                          />
                          <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg w-full hover:border-blue-300">
                            <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                              <div className="w-3 h-3 rounded-full bg-blue-500 hidden"></div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-blue-500 text-xl">
                                📥
                              </span>
                              <div>
                                <p className="font-medium text-gray-900">
                                  Entrada
                                </p>
                                <p className="text-sm text-gray-600">
                                  Recebimento, venda, etc.
                                </p>
                              </div>
                            </div>
                          </div>
                        </label>

                        <label className="relative flex cursor-pointer">
                          <input
                            type="radio"
                            name="tipo"
                            value="saida"
                            className="sr-only"
                          />
                          <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg w-full hover:border-gray-300">
                            <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                              <div className="w-3 h-3 rounded-full bg-gray-500 hidden"></div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-500 text-xl">
                                📤
                              </span>
                              <div>
                                <p className="font-medium text-gray-900">
                                  Saída
                                </p>
                                <p className="text-sm text-gray-600">
                                  Pagamento, despesa, etc.
                                </p>
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data *
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-950"
                          defaultValue="2024-01-15"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Valor (MT) *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-950"
                          placeholder="0,00"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição *
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-950"
                        placeholder="Descrição da movimentação..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Categoria *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-950">
                          <option value="">Selecione a categoria</option>
                          <option value="venda">Venda de Serviços</option>
                          <option value="recebimento">
                            Recebimento de Cliente
                          </option>
                          <option value="emprestimo">Empréstimo</option>
                          <option value="investimento">Investimento</option>
                          <option value="outras_entradas">
                            Outras Entradas
                          </option>
                          <option value="fornecedor">
                            Pagamento a Fornecedor
                          </option>
                          <option value="salario">Salários</option>
                          <option value="aluguel">Aluguel</option>
                          <option value="utilidades">Utilidades</option>
                          <option value="manutencao">Manutenção</option>
                          <option value="combustivel">Combustível</option>
                          <option value="outras_saidas">
                            Outras Saídas
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Forma de Pagamento *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-950">
                          <option value="">Selecione</option>
                          <option value="dinheiro">Dinheiro</option>
                          <option value="multicaixa">
                            Multicaixa Express
                          </option>
                          <option value="transferencia">
                            Transferência Bancária
                          </option>
                          <option value="cheque">Cheque</option>
                          <option value="mbiz">M-Biz</option>
                          <option value="emola">e-Mola</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Conta/Caixa *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-950">
                          <option value="">Selecione</option>
                          <option value="caixa_principal">
                            Caixa Principal
                          </option>
                          <option value="bci">BCI - Conta Corrente</option>
                          <option value="standard_bank">
                            Standard Bank
                          </option>
                          <option value="millennium">Millennium BIM</option>
                          <option value="caixa_pequeno">
                            Caixa Pequeno
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Comprovante/Nº Doc
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-950"
                          placeholder="Número do comprovante"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Observações
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-950"
                        placeholder="Observações adicionais..."
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
                        Registrar Movimentação
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Informações do Dia */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  💡 Informações do Dia
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-gray-900">
                      Saldo Inicial do Dia
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      850.000 MT
                    </p>
                  </div>

                  <div>
                    <span className="text-gray-600">Data:</span>
                    <p className="font-medium text-gray-950">15/01/2024</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Responsável:</span>
                    <p className="font-medium text-gray-950">Maria Silva</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Status do Caixa:</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      Aberto
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  📋 Últimas Movimentações
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Combustível GALP
                      </p>
                      <p className="text-xs text-gray-600">08:15 • Saída</p>
                    </div>
                    <span className="text-gray-600 font-bold">
                      -45.000 MT
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Cimentos MZ
                      </p>
                      <p className="text-xs text-gray-600">
                        09:30 • Entrada
                      </p>
                    </div>
                    <span className="text-gray-600 font-bold">
                      +150.000 MT
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Manutenção
                      </p>
                      <p className="text-xs text-gray-600">10:30 • Saída</p>
                    </div>
                    <span className="text-gray-600 font-bold">
                      -35.000 MT
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Conciliação Bancária */}
        {activeFluxoCaixa === "conciliacao" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  🔄 Conciliação Bancária
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-900">
                      Saldo no Sistema
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      1.015.000 MT
                    </p>
                    <p className="text-sm text-gray-600">
                      Segundo nosso controle
                    </p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-900">
                      Saldo no Banco
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      1.010.000 MT
                    </p>
                    <p className="text-sm text-gray-600">
                      Extrato bancário
                    </p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-900">Diferença</p>
                    <p className="text-2xl font-bold text-gray-600">
                      -5.000 MT
                    </p>
                    <p className="text-sm text-gray-600">A conciliar</p>
                  </div>
                </div>

                {/* Itens a Conciliar */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">
                    📋 Itens Pendentes de Conciliação
                  </h4>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="w-4 h-4" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Tarifa Bancária - BCI
                        </p>
                        <p className="text-sm text-gray-600">
                          Tarifa mensal de manutenção
                        </p>
                        <p className="text-xs text-blue-600">
                          Não registrada no sistema
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-600">-5.000 MT</p>
                      <p className="text-sm text-gray-600">15/01/2024</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="w-4 h-4" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Juros de Conta
                        </p>
                        <p className="text-sm text-gray-600">
                          Juros sobre saldo
                        </p>
                        <p className="text-xs text-blue-600">
                          Não registrado no sistema
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">+350 MT</p>
                      <p className="text-sm text-gray-600">14/01/2024</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                    Cancelar
                  </button>
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                    Concluir Conciliação
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Relatórios de Caixa */}
        {activeFluxoCaixa === "relatorios" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100">
                <div className="text-blue-600 text-lg mb-2">📅</div>
                <p className="font-medium text-gray-900">
                  Relatório Diário
                </p>
                <p className="text-sm text-gray-600">
                  Movimentações do dia
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100">
                <div className="text-green-600 text-lg mb-2">📊</div>
                <p className="font-medium text-gray-900">
                  Relatório Semanal
                </p>
                <p className="text-sm text-gray-600">Resumo da semana</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 cursor-pointer hover:bg-purple-100">
                <div className="text-purple-600 text-lg mb-2">💰</div>
                <p className="font-medium text-gray-900">
                  Relatório Mensal
                </p>
                <p className="text-sm text-gray-600">Análise mensal</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 cursor-pointer hover:bg-orange-100">
                <div className="text-orange-600 text-lg mb-2">🏦</div>
                <p className="font-medium text-gray-900">Conciliação</p>
                <p className="text-sm text-gray-600">
                  Relatório de conciliação
                </p>
              </div>
            </div>

            {/* Relatório Personalizado */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900">
                  📈 Relatório Personalizado
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Relatório
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                      <option>Fluxo de Caixa Diário</option>
                      <option>Movimentações por Categoria</option>
                      <option>Relatório de Conciliação</option>
                      <option>Extrato por Conta</option>
                      <option>Análise de Tendências</option>
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

                <div className="flex space-x-3">
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                    Gerar Relatório
                  </button>
                  <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                    Exportar PDF
                  </button>
                  <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                    Exportar Excel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Gráficos */}
        {activeFluxoCaixa === "graficos" && (
          <div className="space-y-6 text-gray-950">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                    📊
                  </span>
                  Dashboard de Fluxo de Caixa - Análise em Tempo Real
                </h3>
              </div>
              <div className="p-6">
                {/* Grid de Gráficos Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Evolução Diária do Saldo */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-green-500 mr-2">💰</span>
                      Evolução do Saldo - Últimos 7 Dias
                    </h4>

                    <div className="h-64 flex items-end justify-between space-x-2">
                      {[
                        {
                          dia: "Seg",
                          entradas: 185000,
                          saidas: 120000,
                          saldo: 65000,
                        },
                        {
                          dia: "Ter",
                          entradas: 220000,
                          saidas: 145000,
                          saldo: 75000,
                        },
                        {
                          dia: "Qua",
                          entradas: 150000,
                          saidas: 210000,
                          saldo: -60000,
                        },
                        {
                          dia: "Qui",
                          entradas: 280000,
                          saidas: 150000,
                          saldo: 130000,
                        },
                        {
                          dia: "Sex",
                          entradas: 195000,
                          saidas: 235000,
                          saldo: -40000,
                        },
                        {
                          dia: "Sáb",
                          entradas: 240000,
                          saidas: 170000,
                          saldo: 70000,
                        },
                        {
                          dia: "Dom",
                          entradas: 285000,
                          saidas: 120000,
                          saldo: 165000,
                        },
                      ].map((item, index) => {
                        const maxValor = 300000;
                        return (
                          <div
                            key={index}
                            className="flex flex-col items-center flex-1 h-full"
                          >
                            <div className="flex flex-col justify-end h-full w-3/4 rounded-t-lg overflow-hidden">
                              <div
                                className="w-full bg-red-400 transition-all hover:opacity-80"
                                style={{
                                  height: `${(item.saidas / maxValor) * 100}%`,
                                }}
                                title={`Saídas: ${(item.saidas / 1000).toFixed(0)}K MT`}
                              ></div>
                              <div
                                className="w-full bg-green-500 transition-all hover:opacity-80"
                                style={{
                                  height: `${(item.entradas / maxValor) * 100}%`,
                                }}
                                title={`Entradas: ${(item.entradas / 1000).toFixed(0)}K MT`}
                              ></div>
                            </div>
                            <span className="text-xs mt-2 font-medium text-center">
                              {item.dia}
                            </span>
                            <span
                              className={`text-xs ${
                                item.saldo >= 0
                                  ? "text-green-600"
                                  : "text-red-500"
                              }`}
                            >
                              {item.saldo >= 0 ? "+" : ""}
                              {(item.saldo / 1000).toFixed(0)}K MT
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-center space-x-6 mt-4 text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
                        <span>Entradas</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-400 rounded mr-1"></div>
                        <span>Saídas</span>
                      </div>
                    </div>

                    <div className="text-center mt-4 text-sm text-gray-600">
                      Saldo atual:{" "}
                      <span className="font-semibold text-green-600">
                        1.015.000 MT
                      </span>{" "}
                      •
                      <span className="text-green-500 ml-1">
                        +29% na semana 📈
                      </span>
                    </div>
                  </div>

                  {/* Gráfico de Distribuição por Categoria */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-blue-500 mr-2">📊</span>
                      Distribuição por Categoria (Este Mês)
                    </h4>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center w-full">
                        <div className="flex justify-center mb-4">
                          <div className="relative w-32 h-32">
                            <div
                              className="w-full h-full rounded-full"
                              style={{
                                background:
                                  "conic-gradient(#3b82f6 0% 45%, #10b981 45% 70%, #f59e0b 70% 85%, #ef4444 85% 95%, #8b5cf6 95% 100%)",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                            <span>Transporte (45%) - 1.28M MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                            <span>Serviços (25%) - 712K MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                            <span>Manutenção (15%) - 427K MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                            <span>Combustível (10%) - 285K MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                            <span>Outros (5%) - 142K MT</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Segunda Linha de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {/* Gráfico de Entradas por Tipo */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-green-500 mr-2">📥</span>
                      Entradas por Tipo (Últimos 30 Dias)
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            tipo: "Cimentos de Moçambique",
                            valor: 485000,
                            cor: "bg-blue-500",
                            porcentagem: 32,
                            icon: "🏭",
                          },
                          {
                            tipo: "Mozal",
                            valor: 420000,
                            cor: "bg-green-500",
                            porcentagem: 28,
                            icon: "🏢",
                          },
                          {
                            tipo: "Grupo João Ferreira",
                            valor: 320000,
                            cor: "bg-cyan-500",
                            porcentagem: 21,
                            icon: "👥",
                          },
                          {
                            tipo: "Cervejas de Moçambique",
                            valor: 185000,
                            cor: "bg-purple-500",
                            porcentagem: 12,
                            icon: "🍺",
                          },
                          {
                            tipo: "Outros Clientes",
                            valor: 90000,
                            cor: "bg-gray-500",
                            porcentagem: 6,
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
                                  {item.tipo}
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
                              <div className="text-xs text-gray-500 mt-1">
                                {item.porcentagem}% do total
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Saídas por Categoria */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-red-500 mr-2">📤</span>
                      Saídas por Categoria (Este Mês)
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            categoria: "Combustível",
                            valor: 832000,
                            cor: "bg-orange-500",
                            porcentagem: 45,
                            icon: "⛽",
                          },
                          {
                            categoria: "Salários",
                            valor: 420000,
                            cor: "bg-blue-500",
                            porcentagem: 23,
                            icon: "👥",
                          },
                          {
                            categoria: "Manutenção",
                            valor: 278000,
                            cor: "bg-yellow-500",
                            porcentagem: 15,
                            icon: "🔧",
                          },
                          {
                            categoria: "Fornecedores",
                            valor: 185000,
                            cor: "bg-green-500",
                            porcentagem: 10,
                            icon: "🏢",
                          },
                          {
                            categoria: "Despesas Adm.",
                            valor: 135000,
                            cor: "bg-gray-500",
                            porcentagem: 7,
                            icon: "📋",
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
                              <div className="text-xs text-gray-500 mt-1">
                                {item.porcentagem}% das saídas
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
                      <span className="text-amber-500 mr-2">💳</span>
                      Formas de Pagamento Utilizadas
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            metodo: "Transferência Bancária",
                            quantidade: 45,
                            valor: 1285000,
                            cor: "bg-blue-500",
                            porcentagem: 52,
                            tendencia: "+5%",
                            icon: "🏦",
                          },
                          {
                            metodo: "Multicaixa",
                            quantidade: 28,
                            valor: 685000,
                            cor: "bg-green-500",
                            porcentagem: 28,
                            tendencia: "+3%",
                            icon: "💳",
                          },
                          {
                            metodo: "Dinheiro",
                            quantidade: 18,
                            valor: 325000,
                            cor: "bg-yellow-500",
                            porcentagem: 13,
                            tendencia: "-2%",
                            icon: "💵",
                          },
                          {
                            metodo: "M-Pesa / e-Mola",
                            quantidade: 12,
                            valor: 185000,
                            cor: "bg-purple-500",
                            porcentagem: 7,
                            tendencia: "+8%",
                            icon: "📱",
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
                                <div className="flex items-center space-x-2 text-sm font-bold text-gray-700 flex-shrink-0">
                                  <span>
                                    {(item.valor / 1000).toFixed(0)}K MT
                                  </span>
                                  <span
                                    className={`text-xs ${
                                      item.tendencia.startsWith("+")
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {item.tendencia}
                                  </span>
                                </div>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${item.cor} transition-all duration-500`}
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
                </div>

                {/* Métricas Rápidas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600 font-medium">
                      Saldo Atual
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      1.015K MT
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      +165K hoje
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">
                      Entradas Hoje
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      285K MT
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      3 transações
                    </p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-sm text-red-600 font-medium">
                      Saídas Hoje
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      120K MT
                    </p>
                    <p className="text-xs text-red-600 mt-1">
                      5 transações
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-600 font-medium">
                      Saldo Médio Dia
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      845K MT
                    </p>
                    <p className="text-xs text-purple-600 mt-1">
                      +20% vs mês passado
                    </p>
                  </div>
                </div>

                {/* Terceira Linha de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Comparação Semanal */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-indigo-500 mr-2">📅</span>
                      Comparação Semanal - Entradas vs Saídas
                    </h4>

                    <div className="h-64 flex items-end justify-between space-x-3">
                      {[
                        {
                          semana: "Sem 1",
                          entradas: 1850000,
                          saidas: 1450000,
                          saldo: 400000,
                        },
                        {
                          semana: "Sem 2",
                          entradas: 2200000,
                          saidas: 1950000,
                          saldo: 250000,
                        },
                        {
                          semana: "Sem 3",
                          entradas: 1980000,
                          saidas: 1820000,
                          saldo: 160000,
                        },
                        {
                          semana: "Sem 4",
                          entradas: 2850000,
                          saidas: 1850000,
                          saldo: 1000000,
                        },
                      ].map((item, index) => {
                        const maxValor = 3000000;
                        return (
                          <div
                            key={index}
                            className="flex flex-col items-center flex-1 h-full"
                          >
                            <div className="flex flex-col justify-end h-full w-3/4 rounded-t-lg overflow-hidden">
                              <div
                                className="w-full bg-red-400 transition-all hover:opacity-80"
                                style={{
                                  height: `${(item.saidas / maxValor) * 100}%`,
                                }}
                                title={`Saídas: ${(item.saidas / 1000).toFixed(0)}K MT`}
                              ></div>
                              <div
                                className="w-full bg-green-500 transition-all hover:opacity-80"
                                style={{
                                  height: `${(item.entradas / maxValor) * 100}%`,
                                }}
                                title={`Entradas: ${(item.entradas / 1000).toFixed(0)}K MT`}
                              ></div>
                            </div>
                            <span className="text-xs mt-2 font-medium text-center">
                              {item.semana}
                            </span>
                            <span
                              className={`text-xs ${
                                item.saldo >= 0
                                  ? "text-green-600"
                                  : "text-red-500"
                              }`}
                            >
                              {item.saldo >= 0 ? "+" : ""}
                              {(item.saldo / 1000).toFixed(0)}K MT
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-center space-x-6 mt-4 text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
                        <span>Entradas</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-400 rounded mr-1"></div>
                        <span>Saídas</span>
                      </div>
                    </div>

                    <div className="text-center mt-4 text-sm text-gray-600">
                      Crescimento semanal médio: +
                      {((400000 + 250000 + 160000 + 1000000) / 4 / 1000).toFixed(0)}
                      K MT • Semana mais lucrativa:{" "}
                      <span className="font-semibold text-green-600">
                        Sem 4
                      </span>{" "}
                      📈
                    </div>
                  </div>

                  {/* Gráfico de Performance por Hora */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-amber-500 mr-2">⏰</span>
                      Movimentações por Horário (Hoje)
                    </h4>

                    <div className="h-64 flex items-end justify-between space-x-3">
                      {[
                        { hora: "08-10", entradas: 45000, saidas: 120000 },
                        { hora: "10-12", entradas: 185000, saidas: 35000 },
                        { hora: "12-14", entradas: 25000, saidas: 0 },
                        { hora: "14-16", entradas: 30000, saidas: 25000 },
                        { hora: "16-18", entradas: 0, saidas: 40000 },
                      ].map((item, index) => {
                        const maxValor = 200000;
                        const pico =
                          item.entradas > item.saidas
                            ? "entradas"
                            : item.saidas > item.entradas
                            ? "saídas"
                            : "neutro";

                        return (
                          <div
                            key={index}
                            className="flex flex-col items-center flex-1 h-full"
                          >
                            <div className="flex flex-col justify-end h-full w-3/4 rounded-t-lg overflow-hidden">
                              <div
                                className="w-full bg-red-400 transition-all hover:opacity-80"
                                style={{
                                  height: `${(item.saidas / maxValor) * 100}%`,
                                }}
                                title={`${item.hora}: Saídas ${(item.saidas / 1000).toFixed(0)}K MT`}
                              ></div>
                              <div
                                className="w-full bg-green-500 transition-all hover:opacity-80"
                                style={{
                                  height: `${(item.entradas / maxValor) * 100}%`,
                                }}
                                title={`${item.hora}: Entradas ${(item.entradas / 1000).toFixed(0)}K MT`}
                              ></div>
                            </div>
                            <span className="text-xs mt-2 font-medium text-center">
                              {item.hora}
                            </span>
                            <span
                              className={`text-xs ${
                                pico === "entradas"
                                  ? "text-green-600"
                                  : pico === "saídas"
                                  ? "text-red-500"
                                  : "text-gray-500"
                              }`}
                            >
                              {pico === "neutro"
                                ? "—"
                                : pico === "entradas"
                                ? "↑ Entradas"
                                : "↓ Saídas"}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-center space-x-6 mt-4 text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
                        <span>Entradas</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-400 rounded mr-1"></div>
                        <span>Saídas</span>
                      </div>
                    </div>

                    <div className="text-center mt-4 text-sm text-gray-600">
                      Pico de{" "}
                      <span className="font-semibold text-green-600">
                        entradas
                      </span>
                      : 10h–12h • Pico de{" "}
                      <span className="font-semibold text-red-500">
                        saídas
                      </span>
                      : 8h–10h
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
                        <option>Hoje</option>
                        <option>Últimos 7 Dias</option>
                        <option>Este Mês</option>
                        <option>Últimos 30 Dias</option>
                        <option>Personalizado</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos</option>
                        <option>Apenas Entradas</option>
                        <option>Apenas Saídas</option>
                        <option>Saldo Líquido</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categoria
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todas as Categorias</option>
                        <option>Transporte</option>
                        <option>Serviços</option>
                        <option>Combustível</option>
                        <option>Manutenção</option>
                        <option>Salários</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Conta/Caixa
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todas as Contas</option>
                        <option>Caixa Principal</option>
                        <option>BCI</option>
                        <option>Standard Bank</option>
                        <option>Millennium BIM</option>
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

export default FluxoCaixa;