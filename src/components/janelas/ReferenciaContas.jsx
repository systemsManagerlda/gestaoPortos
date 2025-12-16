import React, { useState } from 'react';

const ReferenciaContas = () => {
  const [activeReferenciaContas, setActiveReferenciaContas] = useState("plano-contas");

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            📊
          </span>
          Referência de Contas - Plano Contábil Moçambicano 
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Sistema de referência contábil baseado no Plano de Contas de
          Moçambique e normas internacionais
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveReferenciaContas("plano-contas")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeReferenciaContas === "plano-contas"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📋 Plano de Contas
          </button>
          <button
            onClick={() => setActiveReferenciaContas("classes-contabeis")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeReferenciaContas === "classes-contabeis"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🏛️ Classes Contábeis
          </button>
          <button
            onClick={() => setActiveReferenciaContas("lancamentos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeReferenciaContas === "lancamentos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ✍️ Lançamentos
          </button>
          <button
            onClick={() => setActiveReferenciaContas("relatorios")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeReferenciaContas === "relatorios"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Relatórios
          </button>
          <button
            onClick={() => setActiveReferenciaContas("normas")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeReferenciaContas === "normas"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📚 Normas
          </button>
        </div>

        {/* Plano de Contas */}
        {activeReferenciaContas === "plano-contas" && (
          <div className="space-y-6">
            {/* Filtros e Busca */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                <option>Todas as Classes</option>
                <option>Classe 1 - Financiamento Próprio</option>
                <option>Classe 2 - Activo Não Corrente</option>
                <option>Classe 3 - Inventários</option>
                <option>Classe 4 - Terceiros</option>
                <option>Classe 5 - Activo Corrente</option>
                <option>Classe 6 - Custos e Gastos</option>
                <option>Classe 7 - Proveitos e Rendimentos</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                <option>Todas as Naturezas</option>
                <option>Devedora</option>
                <option>Credora</option>
              </select>
              <input
                type="text"
                placeholder="Pesquisar conta..."
                className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                🔍 Filtrar
              </button>
            </div>

            {/* Estrutura do Plano de Contas */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  📋 Estrutura do Plano de Contas - SNC em Moçambique
                </h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-3">Conta</th>
                        <th className="px-4 py-3">Designação</th>
                        <th className="px-4 py-3">Classe</th>
                        <th className="px-4 py-3">Natureza</th>
                        <th className="px-4 py-3">Nível</th>
                        <th className="px-4 py-3">Movimento</th>
                        <th className="px-4 py-3">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Classe 1 - Financiamento Próprio */}
                      <tr className="bg-blue-50 border-b">
                        <td className="px-4 py-3 font-bold text-blue-900">
                          1
                        </td>
                        <td className="px-4 py-3 font-bold text-blue-900">
                          FINANCIAMENTO PRÓPRIO
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Classe 1
                          </span>
                        </td>
                        <td className="px-4 py-3">-</td>
                        <td className="px-4 py-3">Classe</td>
                        <td className="px-4 py-3">-</td>
                        <td className="px-4 py-3">
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                            Expandir
                          </button>
                        </td>
                      </tr>

                      <tr className="bg-white border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          11
                        </td>
                        <td className="px-4 py-3">Capital Próprio</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Classe 1
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Credora
                          </span>
                        </td>
                        <td className="px-4 py-3">Grupo</td>
                        <td className="px-4 py-3">Permitido</td>
                        <td className="px-4 py-3">
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                            Detalhes
                          </button>
                        </td>
                      </tr>

                      <tr className="bg-gray-50 border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          111
                        </td>
                        <td className="px-4 py-3">Capital Social</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Classe 1
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Credora
                          </span>
                        </td>
                        <td className="px-4 py-3">Subgrupo</td>
                        <td className="px-4 py-3">Permitido</td>
                        <td className="px-4 py-3">
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                            Detalhes
                          </button>
                        </td>
                      </tr>

                      {/* Classe 2 - Activo Não Corrente */}
                      <tr className="bg-blue-50 border-b">
                        <td className="px-4 py-3 font-bold text-blue-900">
                          2
                        </td>
                        <td className="px-4 py-3 font-bold text-blue-900">
                          ACTIVO NÃO CORRENTE
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Classe 2
                          </span>
                        </td>
                        <td className="px-4 py-3">-</td>
                        <td className="px-4 py-3">Classe</td>
                        <td className="px-4 py-3">-</td>
                        <td className="px-4 py-3">
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                            Expandir
                          </button>
                        </td>
                      </tr>

                      <tr className="bg-white border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          22
                        </td>
                        <td className="px-4 py-3">Imobilizado Corpóreo</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Classe 2
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Devedora
                          </span>
                        </td>
                        <td className="px-4 py-3">Grupo</td>
                        <td className="px-4 py-3">Permitido</td>
                        <td className="px-4 py-3">
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                            Detalhes
                          </button>
                        </td>
                      </tr>

                      <tr className="bg-gray-50 border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          221
                        </td>
                        <td className="px-4 py-3">
                          Terrenos e Recursos Naturais
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Classe 2
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Devedora
                          </span>
                        </td>
                        <td className="px-4 py-3">Subgrupo</td>
                        <td className="px-4 py-3">Permitido</td>
                        <td className="px-4 py-3">
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                            Detalhes
                          </button>
                        </td>
                      </tr>

                      {/* Classe 6 - Custos e Gastos */}
                      <tr className="bg-red-50 border-b">
                        <td className="px-4 py-3 font-bold text-red-900">
                          6
                        </td>
                        <td className="px-4 py-3 font-bold text-red-900">
                          CUSTOS E GASTOS
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Classe 6
                          </span>
                        </td>
                        <td className="px-4 py-3">-</td>
                        <td className="px-4 py-3">Classe</td>
                        <td className="px-4 py-3">-</td>
                        <td className="px-4 py-3">
                          <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                            Expandir
                          </button>
                        </td>
                      </tr>

                      <tr className="bg-white border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          62
                        </td>
                        <td className="px-4 py-3">
                          Fornecimentos e Serviços Externos
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Classe 6
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Devedora
                          </span>
                        </td>
                        <td className="px-4 py-3">Grupo</td>
                        <td className="px-4 py-3">Permitido</td>
                        <td className="px-4 py-3">
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                            Detalhes
                          </button>
                        </td>
                      </tr>

                      <tr className="bg-gray-50 border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          621
                        </td>
                        <td className="px-4 py-3">
                          Matérias-primas, Subsidiárias e Consumíveis
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Classe 6
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Devedora
                          </span>
                        </td>
                        <td className="px-4 py-3">Subgrupo</td>
                        <td className="px-4 py-3">Permitido</td>
                        <td className="px-4 py-3">
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                            Detalhes
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Botão Nova Conta */}
                <div className="mt-6 flex justify-end">
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium flex items-center">
                    <span className="mr-2">+</span>
                    Nova Conta
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Classes Contábeis */}
        {activeReferenciaContas === "classes-contabeis" && (
          <div className="space-y-6 text-gray-950">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Classe 1 */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl">
                    1
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Credora
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Financiamento Próprio
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Capital, reservas e resultados transitados
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Contas:</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Movimento:</span>
                    <span className="font-medium text-blue-600">Ativa</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Saldo:</span>
                    <span className="font-medium">15.8M MT</span>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                  Ver Contas
                </button>
              </div>

              {/* Classe 2 */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl">
                    2
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Devedora
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Activo Não Corrente
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Imobilizações, investimentos financeiros
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Contas:</span>
                    <span className="font-medium">38</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Movimento:</span>
                    <span className="font-medium text-blue-600">Ativa</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Saldo:</span>
                    <span className="font-medium">12.3M MT</span>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                  Ver Contas
                </button>
              </div>

              {/* Classe 6 */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl">
                    6
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Devedora
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Custos e Gastos
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Fornecimentos, pessoal, impostos
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Contas:</span>
                    <span className="font-medium">67</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Movimento:</span>
                    <span className="font-medium text-blue-600">Ativa</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Saldo:</span>
                    <span className="font-medium">8.5M MT</span>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                  Ver Contas
                </button>
              </div>

              {/* Classe 7 */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl">
                    7
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Credora
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Proveitos e Rendimentos
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Vendas, prestação de serviços, outros rendimentos
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Contas:</span>
                    <span className="font-medium">42</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Movimento:</span>
                    <span className="font-medium text-blue-600">Ativa</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Saldo:</span>
                    <span className="font-medium">14.2M MT</span>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                  Ver Contas
                </button>
              </div>
            </div>

            {/* Resumo das Classes */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900">
                  📊 Resumo por Classe Contábil
                </h3>
              </div>
              <div className="p-6 text-gray-950">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-3">Classe</th>
                        <th className="px-4 py-3">Designação</th>
                        <th className="px-4 py-3">Natureza</th>
                        <th className="px-4 py-3">Nº Contas</th>
                        <th className="px-4 py-3">Saldo Total</th>
                        <th className="px-4 py-3">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b">
                        <td className="px-4 py-3 font-bold text-blue-900">
                          1
                        </td>
                        <td className="px-4 py-3">Financiamento Próprio</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Credora
                          </span>
                        </td>
                        <td className="px-4 py-3">24</td>
                        <td className="px-4 py-3 font-medium">
                          15.847.320 MT
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Ativa
                          </span>
                        </td>
                      </tr>
                      <tr className="bg-gray-50 border-b">
                        <td className="px-4 py-3 font-bold text-green-900">
                          2
                        </td>
                        <td className="px-4 py-3">Activo Não Corrente</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Devedora
                          </span>
                        </td>
                        <td className="px-4 py-3">38</td>
                        <td className="px-4 py-3 font-medium">
                          12.325.150 MT
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Ativa
                          </span>
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-4 py-3 font-bold text-gray-900">
                          3
                        </td>
                        <td className="px-4 py-3">Inventários</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Devedora
                          </span>
                        </td>
                        <td className="px-4 py-3">15</td>
                        <td className="px-4 py-3 font-medium">
                          3.245.670 MT
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Ativa
                          </span>
                        </td>
                      </tr>
                      <tr className="bg-gray-50 border-b">
                        <td className="px-4 py-3 font-bold text-orange-900">
                          6
                        </td>
                        <td className="px-4 py-3">Custos e Gastos</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Devedora
                          </span>
                        </td>
                        <td className="px-4 py-3">67</td>
                        <td className="px-4 py-3 font-medium">
                          8.521.890 MT
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Ativa
                          </span>
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-4 py-3 font-bold text-purple-900">
                          7
                        </td>
                        <td className="px-4 py-3">
                          Proveitos e Rendimentos
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Credora
                          </span>
                        </td>
                        <td className="px-4 py-3">42</td>
                        <td className="px-4 py-3 font-medium">
                          14.236.540 MT
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Ativa
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lançamentos Contábeis */}
        {activeReferenciaContas === "lancamentos" && (
          <div className="space-y-6 text-gray-950">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  ✍️ Modelos de Lançamentos Contábeis
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Compra de Mercadorias */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      📦 Compra de Mercadorias
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Débito:</span>
                        <span className="font-medium">
                          321 - Compras de mercadorias
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Crédito:</span>
                        <span className="font-medium">
                          41111 - Fornecedores nacionais
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">IVA:</span>
                        <span className="font-medium">
                          24311 - IVA débito
                        </span>
                      </div>
                    </div>
                    <button className="w-full mt-3 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                      Usar Modelo
                    </button>
                  </div>

                  {/* Venda de Serviços */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      💼 Venda de Serviços
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Débito:</span>
                        <span className="font-medium">
                          21111 - Clientes nacionais
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Crédito:</span>
                        <span className="font-medium">
                          721 - Prestação de serviços
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">IVA:</span>
                        <span className="font-medium">
                          24321 - IVA crédito
                        </span>
                      </div>
                    </div>
                    <button className="w-full mt-3 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                      Usar Modelo
                    </button>
                  </div>

                  {/* Pagamento de Salários */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      👥 Pagamento de Salários
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Débito:</span>
                        <span className="font-medium">
                          631 - Remunerações
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Crédito:</span>
                        <span className="font-medium">
                          24331 - Retenção na fonte
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Crédito:</span>
                        <span className="font-medium">12 - Bancos</span>
                      </div>
                    </div>
                    <button className="w-full mt-3 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                      Usar Modelo
                    </button>
                  </div>

                  {/* Depreciações */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      🏢 Depreciações do Imobilizado
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Débito:</span>
                        <span className="font-medium">
                          642 - Depreciações do imobilizado
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Crédito:</span>
                        <span className="font-medium">
                          282 - Depreciações acumuladas
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tipo:</span>
                        <span className="font-medium">
                          Anual/Trimestral
                        </span>
                      </div>
                    </div>
                    <button className="w-full mt-3 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                      Usar Modelo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Relatórios */}
        {activeReferenciaContas === "relatorios" && (
          <div className="space-y-6 text-gray-950">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    📄 Balancete
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Mensal
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Relação de saldos por conta
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Último:</span>
                    <span className="font-medium">31/12/2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contas:</span>
                    <span className="font-medium">186</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estado:</span>
                    <span className="font-medium text-blue-600">
                      Conferido
                    </span>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                  Gerar Relatório
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    📊 Balanço
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Trimestral
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Demonstração da situação patrimonial
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Último:</span>
                    <span className="font-medium">31/12/2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Activo Total:</span>
                    <span className="font-medium">18.5M MT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estado:</span>
                    <span className="font-medium text-blue-600">
                      Auditado
                    </span>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                  Gerar Relatório
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    📈 Demonstração de Resultados
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Mensal
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Apuramento de resultados do período
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Último:</span>
                    <span className="font-medium">31/12/2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Resultado:</span>
                    <span className="font-medium text-green-600">
                      2.1M MT
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estado:</span>
                    <span className="font-medium text-green-600">
                      Concluído
                    </span>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                  Gerar Relatório
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Normas Contábeis */}
        {activeReferenciaContas === "normas" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  📚 Normas Contábeis Aplicáveis em Moçambique
                </h3>
              </div>
              <div className="p-6 text-gray-950">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="font-medium text-gray-900">
                        SNC - Sistema de Normalização Contabilística
                      </p>
                      <p className="text-sm text-gray-600">
                        Normas contábeis nacionais baseadas nas IAS/IFRS
                      </p>
                      <p className="text-xs text-blue-600">
                        Aplicável a todas as empresas • Versão 2023
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                      Consultar
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="font-medium text-gray-900">
                        IAS 1 - Apresentação de Demonstrações Financeiras
                      </p>
                      <p className="text-sm text-gray-600">
                        Estrutura e conteúdo das demonstrações financeiras
                      </p>
                      <p className="text-xs text-blue-600">
                        Obrigatório • Implementado
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                      Detalhes
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="font-medium text-gray-900">
                        IAS 2 - Inventários
                      </p>
                      <p className="text-sm text-gray-600">
                        Reconhecimento e mensuração de inventários
                      </p>
                      <p className="text-xs text-blue-600">
                        Obrigatório • Implementado
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                      Detalhes
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="font-medium text-gray-900">
                        IAS 16 - Imobilizado Corpóreo
                      </p>
                      <p className="text-sm text-gray-600">
                        Reconhecimento, mensuração e depreciação
                      </p>
                      <p className="text-xs text-blue-600">
                        Obrigatório • Implementado
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                      Detalhes
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="font-medium text-gray-900">
                        IAS 12 - Impostos sobre o Rendimento
                      </p>
                      <p className="text-sm text-gray-600">
                        Tratamento contabilístico de impostos diferidos
                      </p>
                      <p className="text-xs text-blue-600">
                        Obrigatório • Em implementação
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                      Implementar
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

export default ReferenciaContas;