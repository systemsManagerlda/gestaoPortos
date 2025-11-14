import React, { useState } from 'react';

const FluxoFinanceiro = () => {
  const [activeFluxoFinanceiro, setActiveFluxoFinanceiro] = useState("dashboard");

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            💸
          </span>
          Fluxo Financeiro - Gestão de Caixa e Tesouraria
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Monitorização em tempo real do fluxo de caixa, projeções e análise
          financeira
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveFluxoFinanceiro("dashboard")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeFluxoFinanceiro === "dashboard"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveFluxoFinanceiro("fluxo-caixa")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeFluxoFinanceiro === "fluxo-caixa"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            💰 Fluxo de Caixa
          </button>
          <button
            onClick={() => setActiveFluxoFinanceiro("projecoes")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeFluxoFinanceiro === "projecoes"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Projeções
          </button>
          <button
            onClick={() => setActiveFluxoFinanceiro("bancos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeFluxoFinanceiro === "bancos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🏦 Contas Bancárias
          </button>
          <button
            onClick={() => setActiveFluxoFinanceiro("graficos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeFluxoFinanceiro === "graficos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Gráficos
          </button>
          <button
            onClick={() => setActiveFluxoFinanceiro("relatorios")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeFluxoFinanceiro === "relatorios"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📋 Relatórios
          </button>
        </div>

        {/* Dashboard Financeiro */}
        {activeFluxoFinanceiro === "dashboard" && (
          <div className="space-y-6">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Saldo Disponível
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      1.285.000 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">💰</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    +8% vs mês passado
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Entradas do Mês
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      2.850.000 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">📥</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    +12% vs previsto
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Saídas do Mês
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
                    -5% vs previsto
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
                      +1.000.000 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">📈</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    +35% vs mês passado
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Fluxo de Caixa Diário */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-cyan-50">
                  <h3 className="font-semibold text-gray-900">
                    📊 Fluxo de Caixa - Últimos 7 Dias
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="bg-blue-500 text-white p-2 rounded-lg">
                          📥
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">Hoje</p>
                          <p className="text-sm text-gray-600">
                            15/01/2024
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600">
                          +285.000 MT
                        </p>
                        <p className="text-sm text-gray-600">
                          Entradas: 350.000 MT
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <span className="bg-blue-500 text-white p-2 rounded-lg">
                          📥
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">Ontem</p>
                          <p className="text-sm text-gray-600">
                            14/01/2024
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600">
                          +192.000 MT
                        </p>
                        <p className="text-sm text-gray-600">
                          Entradas: 280.000 MT
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <span className="bg-orange-500 text-white p-2 rounded-lg">
                          📤
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">
                            13/01/2024
                          </p>
                          <p className="text-sm text-gray-600">Sábado</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600">
                          -45.000 MT
                        </p>
                        <p className="text-sm text-gray-600">
                          Saídas: 120.000 MT
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <span className="bg-green-500 text-white p-2 rounded-lg">
                          📥
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">
                            12/01/2024
                          </p>
                          <p className="text-sm text-gray-600">
                            Sexta-feira
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600">
                          +315.000 MT
                        </p>
                        <p className="text-sm text-gray-600">
                          Entradas: 420.000 MT
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Próximas Movimentações */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900">
                    📅 Próximas Movimentações
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          Recebimento - Cimentos MZ
                        </p>
                        <p className="text-sm text-gray-600">
                          FT-2024-0158 • 350.000 MT
                        </p>
                        <p className="text-xs text-blue-600">
                          Previsão: Amanhã, 16/01
                        </p>
                      </div>
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                        Entrada
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          Pagamento - GALP Combustível
                        </p>
                        <p className="text-sm text-gray-600">
                          Combustível mensal • 280.000 MT
                        </p>
                        <p className="text-xs text-blue-600">
                          Vencimento: 18/01
                        </p>
                      </div>
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                        Saída
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          Recebimento - Mozal
                        </p>
                        <p className="text-sm text-gray-600">
                          FT-2024-0162 • 220.000 MT
                        </p>
                        <p className="text-xs text-blue-600">
                          Previsão: 19/01
                        </p>
                      </div>
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                        Entrada
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          Salários - Janeiro
                        </p>
                        <p className="text-sm text-gray-600">
                          Equipe motoristas • 420.000 MT
                        </p>
                        <p className="text-xs text-blue-600">
                          Vencimento: 25/01
                        </p>
                      </div>
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                        Saída
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alertas Financeiros */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-yellow-50">
                <h3 className="font-semibold text-gray-900">
                  ⚠️ Alertas Financeiros
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-3">
                      <span className="bg-red-500 text-white p-2 rounded-lg">
                        💸
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          Saldo Crítico
                        </p>
                        <p className="text-sm text-gray-600">
                          Conta BCI abaixo do mínimo
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-3">
                      <span className="bg-orange-500 text-white p-2 rounded-lg">
                        📆
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          Vencimentos Próximos
                        </p>
                        <p className="text-sm text-gray-600">
                          5 pagamentos esta semana
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-500 text-white p-2 rounded-lg">
                        📊
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          Meta de Receita
                        </p>
                        <p className="text-sm text-gray-600">
                          85% da meta mensal atingida
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fluxo de Caixa Detalhado */}
        {activeFluxoFinanceiro === "fluxo-caixa" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-cyan-50">
                <h3 className="font-semibold text-gray-900">
                  💰 Fluxo de Caixa Detalhado - Janeiro 2024
                </h3>
              </div>
              <div className="p-6">
                {/* Filtros */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Janeiro 2024</option>
                    <option>Dezembro 2023</option>
                    <option>Novembro 2023</option>
                    <option>Personalizado</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Todas as Categorias</option>
                    <option>Receitas</option>
                    <option>Despesas Operacionais</option>
                    <option>Investimentos</option>
                    <option>Financiamentos</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Todas as Contas</option>
                    <option>BCI</option>
                    <option>Standard Bank</option>
                    <option>Millennium BIM</option>
                    <option>Caixa</option>
                  </select>
                  <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 font-medium">
                    Exportar Excel
                  </button>
                </div>

                {/* Tabela de Fluxo de Caixa */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-3">Data</th>
                        <th className="px-4 py-3">Descrição</th>
                        <th className="px-4 py-3">Categoria</th>
                        <th className="px-4 py-3">Conta</th>
                        <th className="px-4 py-3 text-right">
                          Entradas (MT)
                        </th>
                        <th className="px-4 py-3 text-right">
                          Saídas (MT)
                        </th>
                        <th className="px-4 py-3 text-right">Saldo (MT)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b">
                        <td className="px-4 py-3">15/01/2024</td>
                        <td className="px-4 py-3 font-medium text-gray-900">
                          Recebimento - Cimentos MZ
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Receita
                          </span>
                        </td>
                        <td className="px-4 py-3">BCI</td>
                        <td className="px-4 py-3 text-right font-semibold text-green-600">
                          350.000
                        </td>
                        <td className="px-4 py-3 text-right">-</td>
                        <td className="px-4 py-3 text-right font-semibold">
                          1.285.000
                        </td>
                      </tr>
                      <tr className="bg-gray-50 border-b">
                        <td className="px-4 py-3">14/01/2024</td>
                        <td className="px-4 py-3 font-medium text-gray-900">
                          Pagamento - Combustível GALP
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Despesa
                          </span>
                        </td>
                        <td className="px-4 py-3">Standard Bank</td>
                        <td className="px-4 py-3 text-right">-</td>
                        <td className="px-4 py-3 text-right font-semibold text-red-600">
                          280.000
                        </td>
                        <td className="px-4 py-3 text-right font-semibold">
                          935.000
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-4 py-3">13/01/2024</td>
                        <td className="px-4 py-3 font-medium text-gray-900">
                          Recebimento - Grupo JF
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Receita
                          </span>
                        </td>
                        <td className="px-4 py-3">Millennium BIM</td>
                        <td className="px-4 py-3 text-right font-semibold text-green-600">
                          420.000
                        </td>
                        <td className="px-4 py-3 text-right">-</td>
                        <td className="px-4 py-3 text-right font-semibold">
                          1.215.000
                        </td>
                      </tr>
                      <tr className="bg-gray-50 border-b">
                        <td className="px-4 py-3">12/01/2024</td>
                        <td className="px-4 py-3 font-medium text-gray-900">
                          Manutenção Veículos
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Despesa
                          </span>
                        </td>
                        <td className="px-4 py-3">BCI</td>
                        <td className="px-4 py-3 text-right">-</td>
                        <td className="px-4 py-3 text-right font-semibold text-red-600">
                          150.000
                        </td>
                        <td className="px-4 py-3 text-right font-semibold">
                          795.000
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-4 py-3">11/01/2024</td>
                        <td className="px-4 py-3 font-medium text-gray-900">
                          Recebimento - Mozal
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Receita
                          </span>
                        </td>
                        <td className="px-4 py-3">Standard Bank</td>
                        <td className="px-4 py-3 text-right font-semibold text-green-600">
                          320.000
                        </td>
                        <td className="px-4 py-3 text-right">-</td>
                        <td className="px-4 py-3 text-right font-semibold">
                          945.000
                        </td>
                      </tr>
                    </tbody>
                    <tfoot className="bg-gray-100 font-semibold">
                      <tr>
                        <td className="px-4 py-3" colSpan={4}>
                          TOTAIS DO MÊS
                        </td>
                        <td className="px-4 py-3 text-right text-green-600">
                          2.850.000
                        </td>
                        <td className="px-4 py-3 text-right text-red-600">
                          1.850.000
                        </td>
                        <td className="px-4 py-3 text-right text-cyan-600">
                          +1.000.000
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* Resumo por Categoria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900">
                    📥 Entradas por Categoria
                  </h3>
                </div>
                <div className="p-6 text-gray-950">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Transporte de Cargas
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                        <span className="font-medium">2.425.000 MT</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Serviços Adicionais
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-400 h-2 rounded-full"
                            style={{ width: "12%" }}
                          ></div>
                        </div>
                        <span className="font-medium">342.000 MT</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Outras Receitas
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-300 h-2 rounded-full"
                            style={{ width: "3%" }}
                          ></div>
                        </div>
                        <span className="font-medium">83.000 MT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900">
                    📤 Saídas por Categoria
                  </h3>
                </div>
                <div className="p-6 text-gray-950">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Combustível
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "45%" }}
                          ></div>
                        </div>
                        <span className="font-medium">832.000 MT</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Salários
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-400 h-2 rounded-full"
                            style={{ width: "23%" }}
                          ></div>
                        </div>
                        <span className="font-medium">420.000 MT</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Manutenção
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-300 h-2 rounded-full"
                            style={{ width: "15%" }}
                          ></div>
                        </div>
                        <span className="font-medium">278.000 MT</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Outras Despesas
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-200 h-2 rounded-full"
                            style={{ width: "17%" }}
                          ></div>
                        </div>
                        <span className="font-medium">320.000 MT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projeções Financeiras */}
        {activeFluxoFinanceiro === "projecoes" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    📈 Próxima Semana
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Positivo
                  </span>
                </div>
                <div className="space-y-2 text-gray-950">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Entradas Previstas:
                    </span>
                    <span className="font-medium text-green-600">
                      1.250.000 MT
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Saídas Previstas:
                    </span>
                    <span className="font-medium text-red-600">
                      980.000 MT
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-medium">Resultado:</span>
                    <span className="font-bold text-cyan-600">
                      +270.000 MT
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-gray-950">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    📊 Próximo Mês
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Estável
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Entradas Previstas:
                    </span>
                    <span className="font-medium text-green-600">
                      3.200.000 MT
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Saídas Previstas:
                    </span>
                    <span className="font-medium text-red-600">
                      2.800.000 MT
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-medium">Resultado:</span>
                    <span className="font-bold text-cyan-600">
                      +400.000 MT
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-gray-950">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    🎯 Trimestre
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Atenção
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Entradas Previstas:
                    </span>
                    <span className="font-medium text-green-600">
                      8.500.000 MT
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Saídas Previstas:
                    </span>
                    <span className="font-medium text-red-600">
                      7.200.000 MT
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-medium">Resultado:</span>
                    <span className="font-bold text-cyan-600">
                      +1.300.000 MT
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Projeção Detalhada */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-cyan-50">
                <h3 className="font-semibold text-gray-900">
                  📋 Projeção de Fluxo - Próximos 30 Dias
                </h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-3">Semana</th>
                        <th className="px-4 py-3">Entradas Previstas</th>
                        <th className="px-4 py-3">Saídas Previstas</th>
                        <th className="px-4 py-3">Saldo Projetado</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          16-22 Jan
                        </td>
                        <td className="px-4 py-3 text-green-600">
                          1.250.000 MT
                        </td>
                        <td className="px-4 py-3 text-red-600">
                          980.000 MT
                        </td>
                        <td className="px-4 py-3 font-semibold text-cyan-600">
                          +270.000 MT
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Positivo
                          </span>
                        </td>
                      </tr>
                      <tr className="bg-gray-50 border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          23-29 Jan
                        </td>
                        <td className="px-4 py-3 text-green-600">
                          950.000 MT
                        </td>
                        <td className="px-4 py-3 text-red-600">
                          1.100.000 MT
                        </td>
                        <td className="px-4 py-3 font-semibold text-red-600">
                          -150.000 MT
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Negativo
                          </span>
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          30 Jan-5 Fev
                        </td>
                        <td className="px-4 py-3 text-green-600">
                          1.000.000 MT
                        </td>
                        <td className="px-4 py-3 text-red-600">
                          720.000 MT
                        </td>
                        <td className="px-4 py-3 font-semibold text-cyan-600">
                          +280.000 MT
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Positivo
                          </span>
                        </td>
                      </tr>
                      <tr className="bg-gray-50 border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          6-12 Fev
                        </td>
                        <td className="px-4 py-3 text-green-600">
                          1.100.000 MT
                        </td>
                        <td className="px-4 py-3 text-red-600">
                          850.000 MT
                        </td>
                        <td className="px-4 py-3 font-semibold text-cyan-600">
                          +250.000 MT
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Positivo
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

        {/* Contas Bancárias */}
        {activeFluxoFinanceiro === "bancos" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                      BCI
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">BCI</p>
                      <p className="text-sm text-gray-600">
                        Conta Corrente
                      </p>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Ativa
                  </span>
                </div>
                <div className="space-y-2 text-gray-950">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Saldo Disponível:
                    </span>
                    <span className="font-bold text-gray-900">
                      785.000 MT
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Agência:</span>
                    <span className="font-medium">Maputo Centro</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Nº Conta:</span>
                    <span className="font-medium">123456789012</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                      SB
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Standard Bank
                      </p>
                      <p className="text-sm text-gray-600">
                        Conta Corrente
                      </p>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Ativa
                  </span>
                </div>
                <div className="space-y-2 text-gray-950">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Saldo Disponível:
                    </span>
                    <span className="font-bold text-gray-900">
                      320.000 MT
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Agência:</span>
                    <span className="font-medium">Matola</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Nº Conta:</span>
                    <span className="font-medium">987654321098</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                      MB
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Millennium BIM
                      </p>
                      <p className="text-sm text-gray-600">
                        Conta Poupança
                      </p>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Ativa
                  </span>
                </div>
                <div className="space-y-2 text-gray-950">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Saldo Disponível:
                    </span>
                    <span className="font-bold text-gray-900">
                      180.000 MT
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Agência:</span>
                    <span className="font-medium">Maputo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Nº Conta:</span>
                    <span className="font-medium">456789123456</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Saldo Consolidado */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  🏦 Saldo Consolidado
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      1.285.000 MT
                    </p>
                    <p className="text-sm text-gray-600">Saldo Total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      785.000 MT
                    </p>
                    <p className="text-sm text-gray-600">BCI (61%)</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      320.000 MT
                    </p>
                    <p className="text-sm text-gray-600">
                      Standard Bank (25%)
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      180.000 MT
                    </p>
                    <p className="text-sm text-gray-600">
                      Millennium BIM (14%)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gráficos Financeiros */}
        {activeFluxoFinanceiro === "graficos" && (
          <div className="space-y-6 text-gray-950">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                    📊
                  </span>
                  Dashboard Financeiro - Fluxo de Caixa e Tesouraria
                </h3>
              </div>
              <div className="p-6">
                {/* Grid de Gráficos Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Evolução do Saldo */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-green-500 mr-2">💰</span>
                      Evolução do Saldo (Últimos 30 Dias)
                    </h4>

                    <div className="h-64 flex items-end justify-between space-x-1">
                      {[
                        { dia: "1", saldo: 850000, cor: "bg-blue-400" },
                        { dia: "5", saldo: 920000, cor: "bg-blue-500" },
                        { dia: "10", saldo: 780000, cor: "bg-blue-400" },
                        { dia: "15", saldo: 1100000, cor: "bg-green-500" },
                        { dia: "20", saldo: 950000, cor: "bg-blue-500" },
                        { dia: "25", saldo: 1050000, cor: "bg-green-400" },
                        { dia: "30", saldo: 1285000, cor: "bg-green-500" },
                      ].map((item, index) => {
                        const maxSaldo = 1500000;
                        return (
                          <div
                            key={index}
                            className="flex flex-col items-center flex-1 h-full"
                          >
                            <div className="flex flex-col justify-end h-full w-3/4 rounded-t-lg overflow-hidden">
                              <div
                                className={`w-full ${item.cor} transition-all hover:opacity-80`}
                                style={{
                                  height: `${(item.saldo / maxSaldo) * 100}%`,
                                }}
                                title={`Dia ${item.dia}: ${(item.saldo / 1000).toFixed(0)}K MT`}
                              ></div>
                            </div>
                            <span className="text-xs mt-2 font-medium text-center">
                              Dia {item.dia}
                            </span>
                            <span className="text-xs text-gray-500">
                              {(item.saldo / 1000).toFixed(0)}K MT
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="text-center mt-4 text-sm text-gray-600">
                      Saldo atual: 1.285.000 MT • +51% desde início do mês
                    </div>
                  </div>

                  {/* Gráfico de Distribuição do Saldo por Banco */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-blue-500 mr-2">🏦</span>
                      Distribuição do Saldo por Banco
                    </h4>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center w-full">
                        <div className="flex justify-center mb-4">
                          <div className="relative w-32 h-32">
                            <div
                              className="w-full h-full rounded-full"
                              style={{
                                background:
                                  "conic-gradient(#3b82f6 0% 61%, #1d4ed8 61% 86%, #8b5cf6 86% 100%)",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                            <span>BCI (61%) - 785K MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-blue-700 rounded mr-2"></div>
                            <span>Standard Bank (25%) - 320K MT</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                            <span>Millennium BIM (14%) - 180K MT</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Segunda Linha de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {/* Gráfico de Entradas por Categoria */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-green-500 mr-2">📥</span>
                      Entradas por Categoria (Este Mês)
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            categoria: "Transporte de Cargas",
                            valor: 2425000,
                            cor: "bg-blue-500",
                            porcentagem: 85,
                            icon: "🚚",
                          },
                          {
                            categoria: "Serviços Adicionais",
                            valor: 342000,
                            cor: "bg-green-500",
                            porcentagem: 12,
                            icon: "🔧",
                          },
                          {
                            categoria: "Outras Receitas",
                            valor: 83000,
                            cor: "bg-cyan-500",
                            porcentagem: 3,
                            icon: "💰",
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
                                {item.porcentagem}% do total de entradas
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
                            categoria: "Outras Despesas",
                            valor: 320000,
                            cor: "bg-gray-500",
                            porcentagem: 17,
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
                                {item.porcentagem}% do total de saídas
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Projeção de Fluxo */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-amber-500 mr-2">📈</span>
                      Projeção de Fluxo (Próximas 4 Semanas)
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            semana: "16-22 Jan",
                            entradas: 1250000,
                            saidas: 980000,
                            resultado: 270000,
                            cor: "bg-green-500",
                            icon: "📅",
                          },
                          {
                            semana: "23-29 Jan",
                            entradas: 950000,
                            saidas: 1100000,
                            resultado: -150000,
                            cor: "bg-red-500",
                            icon: "📅",
                          },
                          {
                            semana: "30-05 Fev",
                            entradas: 1000000,
                            saidas: 720000,
                            resultado: 280000,
                            cor: "bg-green-500",
                            icon: "📅",
                          },
                          {
                            semana: "06-12 Fev",
                            entradas: 1100000,
                            saidas: 850000,
                            resultado: 250000,
                            cor: "bg-green-500",
                            icon: "📅",
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
                                  {item.semana}
                                </span>
                                <span
                                  className={`text-sm font-bold ${
                                    item.resultado >= 0
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {item.resultado >= 0 ? "+" : ""}
                                  {(item.resultado / 1000).toFixed(0)}K
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${item.cor} transition-all duration-500`}
                                  style={{
                                    width: `${Math.min(
                                      (Math.abs(item.resultado) / 1500) * 100,
                                      100
                                    )}%`,
                                  }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1 flex justify-between">
                                <span>
                                  📥 {(item.entradas / 1000).toFixed(0)}K
                                </span>
                                <span>
                                  📤 {(item.saidas / 1000).toFixed(0)}K
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
                      Saldo Disponível
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      1.285K MT
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      +8% vs mês passado
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">
                      Entradas Mês
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      2.850K MT
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      +12% vs previsto
                    </p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-sm text-red-600 font-medium">
                      Saídas Mês
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      1.850K MT
                    </p>
                    <p className="text-xs text-red-600 mt-1">
                      -5% vs previsto
                    </p>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                    <p className="text-sm text-cyan-600 font-medium">
                      Resultado Líquido
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      +1.000K MT
                    </p>
                    <p className="text-xs text-cyan-600 mt-1">
                      +35% vs mês passado
                    </p>
                  </div>
                </div>

                {/* Terceira Linha de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Comparação Mensal */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-indigo-500 mr-2">📊</span>
                      Comparação Mensal - Últimos 3 Meses
                    </h4>

                    <div className="h-64 flex items-end justify-between space-x-3">
                      {[
                        {
                          mes: "Nov",
                          entradas: 2150000,
                          saidas: 1650000,
                          saldo: 500000,
                        },
                        {
                          mes: "Dez",
                          entradas: 2550000,
                          saidas: 1950000,
                          saldo: 600000,
                        },
                        {
                          mes: "Jan",
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
                              {/* Saídas */}
                              <div
                                className="w-full bg-red-400 transition-all hover:opacity-80"
                                style={{
                                  height: `${(item.saidas / maxValor) * 100}%`,
                                }}
                                title={`Saídas: ${(item.saidas / 1000).toFixed(0)}K MT`}
                              ></div>

                              {/* Entradas */}
                              <div
                                className="w-full bg-green-500 transition-all hover:opacity-80"
                                style={{
                                  height: `${(item.entradas / maxValor) * 100}%`,
                                }}
                                title={`Entradas: ${(item.entradas / 1000).toFixed(0)}K MT`}
                              ></div>
                            </div>

                            <span className="text-xs mt-2 font-medium text-center">
                              {item.mes}
                            </span>
                            <span className="text-xs text-gray-500">
                              +{(item.saldo / 1000).toFixed(0)}K MT
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Legenda */}
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
                      Crescimento médio: +
                      {((2150000 + 2550000 + 2850000) / 3 / 1000000).toFixed(1)}
                      M MT • Saldo positivo crescente 📈
                    </div>
                  </div>

                  {/* Gráfico de Indicadores de Liquidez */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-amber-500 mr-2">⚡</span>
                      Indicadores de Liquidez
                    </h4>
                    <div className="h-64 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            indicador: "Rácio de Liquidez Corrente",
                            valor: 2.3,
                            meta: 1.5,
                            cor: "bg-green-500",
                            status: "Excelente",
                            icon: "📊",
                          },
                          {
                            indicador: "Margem de Fluxo de Caixa",
                            valor: 35,
                            meta: 25,
                            cor: "bg-green-500",
                            status: "Boa",
                            icon: "💰",
                          },
                          {
                            indicador: "Dias de Caixa Disponível",
                            valor: 21,
                            meta: 15,
                            cor: "bg-blue-500",
                            status: "Adequado",
                            icon: "⏱️",
                          },
                          {
                            indicador: "Cobertura de Despesas",
                            valor: 2.8,
                            meta: 2.0,
                            cor: "bg-green-500",
                            status: "Excelente",
                            icon: "✅",
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
                                  {item.indicador}
                                </span>
                                <div className="flex items-center space-x-1 text-sm font-bold text-gray-700 flex-shrink-0">
                                  <span>
                                    {typeof item.valor === "number"
                                      ? item.valor.toFixed(1)
                                      : item.valor}
                                    {typeof item.valor === "number" &&
                                    item.valor > 10
                                      ? "%"
                                      : ""}
                                  </span>
                                  <span
                                    className={`text-xs ${
                                      item.valor >= item.meta
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {item.status}
                                  </span>
                                </div>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${item.cor} transition-all duration-500`}
                                  style={{
                                    width: `${Math.min(
                                      (item.valor / (item.meta * 1.5)) * 100,
                                      100
                                    )}%`,
                                  }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1 flex justify-between">
                                <span>
                                  Meta: {item.meta}
                                  {typeof item.valor === "number" &&
                                  item.valor > 10
                                    ? "%"
                                    : ""}
                                </span>
                                <span
                                  className={`font-medium ${
                                    item.valor >= item.meta
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {item.valor >= item.meta ? "✓" : "✗"}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
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
                        Tipo de Análise
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Fluxo de Caixa</option>
                        <option>Projeções</option>
                        <option>Indicadores</option>
                        <option>Comparativo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Conta Bancária
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todas as Contas</option>
                        <option>BCI</option>
                        <option>Standard Bank</option>
                        <option>Millennium BIM</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categoria
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todas as Categorias</option>
                        <option>Receitas</option>
                        <option>Despesas Operacionais</option>
                        <option>Investimentos</option>
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

        {/* Relatórios Financeiros */}
        {activeFluxoFinanceiro === "relatorios" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100">
                <div className="text-blue-600 text-lg mb-2">📊</div>
                <p className="font-medium text-gray-900">Fluxo Diário</p>
                <p className="text-sm text-gray-600">
                  Movimentações do dia
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100">
                <div className="text-green-600 text-lg mb-2">💰</div>
                <p className="font-medium text-gray-900">Fluxo Mensal</p>
                <p className="text-sm text-gray-600">Análise mensal</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 cursor-pointer hover:bg-purple-100">
                <div className="text-purple-600 text-lg mb-2">🏢</div>
                <p className="font-medium text-gray-900">Por Conta</p>
                <p className="text-sm text-gray-600">
                  Movimentações por banco
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 cursor-pointer hover:bg-orange-100">
                <div className="text-orange-600 text-lg mb-2">📈</div>
                <p className="font-medium text-gray-900">Projeções</p>
                <p className="text-sm text-gray-600">
                  Relatório de projeções
                </p>
              </div>
            </div>

            {/* Relatório Personalizado */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900">
                  📋 Gerar Relatório Personalizado
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Relatório
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                      <option>Fluxo de Caixa Detalhado</option>
                      <option>Análise por Categoria</option>
                      <option>Projeções Financeiras</option>
                      <option>Saldo por Conta Bancária</option>
                      <option>Relatório Executivo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Período Inicial
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Período Final
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
      </div>
    </div>
  );
};

export default FluxoFinanceiro;