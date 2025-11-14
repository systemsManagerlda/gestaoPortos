import React, { useState } from 'react';

const CentralRiscos = () => {
  const [activeCentralRiscos, setActiveCentralRiscos] = useState("dashboard");

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            ⚠️
          </span>
          Central de Riscos - Gestão e Monitoramento
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Sistema integrado de identificação, avaliação e tratamento de
          riscos corporativos - Contexto Moçambicano
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveCentralRiscos("dashboard")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCentralRiscos === "dashboard"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveCentralRiscos("identificacao")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCentralRiscos === "identificacao"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🔍 Identificação
          </button>
          <button
            onClick={() => setActiveCentralRiscos("avaliacao")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCentralRiscos === "avaliacao"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Avaliação
          </button>
          <button
            onClick={() => setActiveCentralRiscos("tratamento")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCentralRiscos === "tratamento"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🎯 Tratamento
          </button>
          <button
            onClick={() => setActiveCentralRiscos("monitoramento")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCentralRiscos === "monitoramento"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📱 Monitoramento
          </button>
        </div>

        {/* Dashboard Central de Riscos */}
        {activeCentralRiscos === "dashboard" && (
          <div className="space-y-6">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Riscos Identificados
                    </p>
                    <p className="text-2xl font-bold text-gray-900">47</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">⚠️</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    +5 este mês
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Riscos Críticos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">🔥</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    Necessitam atenção
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Planos Ativos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">28</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">✅</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    72% em execução
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Exposição Total
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      8.2M MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">💰</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    -15% vs último mês
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mapa de Calor de Riscos */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-orange-50">
                  <h3 className="font-semibold text-gray-900">
                    🎯 Mapa de Calor de Riscos - Moçambique
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-lg font-bold text-blue-700">12</p>
                      <p className="text-sm text-blue-600">Alto Impacto</p>
                      <div className="mt-2 text-xs text-blue-500">
                        Fiscal • Câmbio • Segurança
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-lg font-bold text-gray-700">18</p>
                      <p className="text-sm text-gray-600">Médio Impacto</p>
                      <div className="mt-2 text-xs text-gray-500">
                        Operacional • Fornecedores
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-lg font-bold text-blue-700">17</p>
                      <p className="text-sm text-blue-600">Baixo Impacto</p>
                      <div className="mt-2 text-xs text-blue-500">
                        Administrativo • TI
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3 text-gray-950">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <span className="font-medium">
                        Risco Cambial (MT/USD)
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        Alto
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <span className="font-medium">
                        Instabilidade Fiscal
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        Alto
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <span className="font-medium">
                        Segurança nas Estradas
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        Médio
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Riscos por Categoria */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900">
                    📊 Distribuição por Categoria
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-700">
                          Riscos Financeiros
                        </span>
                        <span className="text-sm text-gray-600">35%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "35%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-700">
                          Riscos Operacionais
                        </span>
                        <span className="text-sm text-gray-600">28%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "28%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-700">
                          Riscos Fiscais
                        </span>
                        <span className="text-sm text-gray-600">22%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "22%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-700">
                          Riscos Estratégicos
                        </span>
                        <span className="text-sm text-gray-600">15%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "15%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alertas de Riscos Críticos */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  🚨 Alertas de Riscos Críticos - Contexto Moçambicano
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                        💰
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Volatilidade Cambial (MT/USD)
                        </p>
                        <p className="text-sm text-gray-600">
                          Desvalorização do Metical frente ao Dólar
                        </p>
                        <p className="text-xs text-blue-600">
                          Impacto: 5.2M MT • Probabilidade: Alta
                        </p>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                      Mitigar
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                        🏛️
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Mudanças na Legislação Fiscal
                        </p>
                        <p className="text-sm text-gray-600">
                          Novas obrigações do IVA e IRPS
                        </p>
                        <p className="text-xs text-blue-600">
                          Impacto: 1.8M MT • Probabilidade: Média
                        </p>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                      Acompanhar
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                        🚚
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Segurança nas Estradas Nacionais
                        </p>
                        <p className="text-sm text-gray-600">
                          Riscos na EN1 e corredores de transporte
                        </p>
                        <p className="text-xs text-blue-600">
                          Impacto: 900K MT • Probabilidade: Média
                        </p>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                      Monitorar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Identificação de Riscos */}
        {activeCentralRiscos === "identificacao" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-orange-50">
                <h3 className="font-semibold text-gray-900">
                  🔍 Identificação de Riscos - Contexto Moçambique
                </h3>
              </div>
              <div className="p-6">
                {/* Filtros */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Todas as Categorias</option>
                    <option>Financeiro</option>
                    <option>Operacional</option>
                    <option>Fiscal</option>
                    <option>Estratégico</option>
                    <option>Legal</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Todos os Impactos</option>
                    <option>Alto</option>
                    <option>Médio</option>
                    <option>Baixo</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Todas as Probabilidades</option>
                    <option>Alta</option>
                    <option>Média</option>
                    <option>Baixa</option>
                  </select>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                    🔍 Filtrar
                  </button>
                </div>

                {/* Lista de Riscos Identificados */}
                <div className="space-y-4">
                  {/* Risco 1 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-xl">💰</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Volatilidade Cambial MT/USD
                        </p>
                        <p className="text-sm text-gray-600">
                          Desvalorização do Metical impactando custos de
                          importação
                        </p>
                        <div className="flex space-x-2 mt-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Financeiro
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Alto Impacto
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Prob. Alta
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Exposição: 5.2M MT
                      </p>
                      <p className="text-sm text-gray-600">
                        Responsável: Diretor Financeiro
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Detalhes
                        </button>
                        <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                          Avaliar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Risco 2 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-xl">🏛️</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Mudanças na Legislação Fiscal
                        </p>
                        <p className="text-sm text-gray-600">
                          Novas obrigações do IVA, IRPS e taxas municipais
                        </p>
                        <div className="flex space-x-2 mt-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Fiscal
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Alto Impacto
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Prob. Média
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Exposição: 1.8M MT
                      </p>
                      <p className="text-sm text-gray-600">
                        Responsável: Consultor Fiscal
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Detalhes
                        </button>
                        <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                          Avaliar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Risco 3 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-xl">🚚</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Segurança nas Estradas Nacionais
                        </p>
                        <p className="text-sm text-gray-600">
                          Roubo de carga e acidentes nas EN1, EN6 e EN7
                        </p>
                        <div className="flex space-x-2 mt-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Operacional
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Médio Impacto
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Prob. Média
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Exposição: 900K MT
                      </p>
                      <p className="text-sm text-gray-600">
                        Responsável: Gestor Operacional
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Detalhes
                        </button>
                        <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                          Avaliar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Risco 4 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 text-xl">⚡</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Interrupções de Energia (EDM)
                        </p>
                        <p className="text-sm text-gray-600">
                          Apagões frequentes impactando operações
                        </p>
                        <div className="flex space-x-2 mt-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Operacional
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Baixo Impacto
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Prob. Alta
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Exposição: 350K MT
                      </p>
                      <p className="text-sm text-gray-600">
                        Responsável: Gestor de Facilities
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Detalhes
                        </button>
                        <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                          Avaliar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botão Novo Risco */}
                <div className="mt-6 flex justify-end">
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium flex items-center">
                    <span className="mr-2">+</span>
                    Identificar Novo Risco
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Avaliação de Riscos */}
        {activeCentralRiscos === "avaliacao" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-orange-50">
                <h3 className="font-semibold text-gray-900">
                  📈 Matriz de Avaliação de Riscos
                </h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-3">Risco</th>
                        <th className="px-4 py-3">Categoria</th>
                        <th className="px-4 py-3">Probabilidade</th>
                        <th className="px-4 py-3">Impacto Financeiro</th>
                        <th className="px-4 py-3">Nível</th>
                        <th className="px-4 py-3">Tendência</th>
                        <th className="px-4 py-3">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          Volatilidade Cambial
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Financeiro
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Alta
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-medium">5.2M MT</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Crítico
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-red-600">
                            📈 Aumentando
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                            Mitigar
                          </button>
                        </td>
                      </tr>
                      <tr className="bg-gray-50 border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          Mudanças Fiscais
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                            Fiscal
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                            Média
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-medium">1.8M MT</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                            Alto
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-orange-600">
                            ➡️ Estável
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                            Monitorar
                          </button>
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          Segurança Rodoviária
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Operacional
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                            Média
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-medium">900K MT</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                            Médio
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-orange-600">
                            ➡️ Estável
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                            Controlar
                          </button>
                        </td>
                      </tr>
                      <tr className="bg-gray-50 border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          Interrupções EDM
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Operacional
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Alta
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-medium">350K MT</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                            Baixo
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-green-600">
                            📉 Diminuindo
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                            Aceitar
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Gráfico de Avaliação */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  📊 Mapa de Calor - Probabilidade vs Impacto
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-6 bg-blue-50 border-2 border-blue-300 rounded-lg">
                    <p className="font-bold text-blue-700">Zona Crítica</p>
                    <p className="text-sm text-blue-600 mt-2">5 Riscos</p>
                    <p className="text-xs text-blue-500">
                      Necessitam ação imediata
                    </p>
                  </div>
                  <div className="p-6 bg-gray-50 border-2 border-gray-300 rounded-lg">
                    <p className="font-bold text-gray-700">
                      Zona de Atenção
                    </p>
                    <p className="text-sm text-gray-600 mt-2">12 Riscos</p>
                    <p className="text-xs text-gray-500">
                      Monitorar continuamente
                    </p>
                  </div>
                  <div className="p-6 bg-blue-50 border-2 border-blue-300 rounded-lg">
                    <p className="font-bold text-blue-700">
                      Zona Controlada
                    </p>
                    <p className="text-sm text-blue-600 mt-2">30 Riscos</p>
                    <p className="text-xs text-blue-500">
                      Rotineiramente geridos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tratamento de Riscos */}
        {activeCentralRiscos === "tratamento" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  🎯 Planos de Tratamento - Riscos Críticos
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {/* Plano 1 */}
                  <div className="border border-gray-200 rounded-lg">
                    <div className="p-4 bg-blue-50 border-b border-gray-200">
                      <h4 className="font-semibold text-gray-900">
                        Hedge Cambial - Proteção MT/USD
                      </h4>
                      <p className="text-sm text-gray-600">
                        Risco: Volatilidade Cambial • Exposição: 5.2M MT
                      </p>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Responsável
                          </p>
                          <p className="font-medium text-gray-600">
                            Diretor Financeiro
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Prazo
                          </p>
                          <p className="font-medium text-gray-600">
                            31/03/2024
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Status
                          </p>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                            Em Execução
                          </span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-600 mb-2">
                          Progresso
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "45%" }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          45% concluído
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                          Atualizar
                        </button>
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Detalhes
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Plano 2 */}
                  <div className="border border-gray-200 rounded-lg">
                    <div className="p-4 bg-blue-50 border-b border-gray-200">
                      <h4 className="font-semibold text-gray-900">
                        Revisão de Processos Fiscais
                      </h4>
                      <p className="text-sm text-gray-600">
                        Risco: Mudanças Legais • Exposição: 1.8M MT
                      </p>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Responsável
                          </p>
                          <p className="font-medium text-gray-600">
                            Consultor Fiscal
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Prazo
                          </p>
                          <p className="font-medium text-gray-600">
                            15/02/2024
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Status
                          </p>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                            Concluído 80%
                          </span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-600 mb-2">
                          Progresso
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "80%" }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          80% concluído
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                          Atualizar
                        </button>
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Detalhes
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Plano 3 */}
                  <div className="border border-gray-200 rounded-lg">
                    <div className="p-4 bg-blue-50 border-b border-gray-200">
                      <h4 className="font-semibold text-gray-900">
                        Programa de Segurança Rodoviária
                      </h4>
                      <p className="text-sm text-gray-600">
                        Risco: Segurança • Exposição: 900K MT
                      </p>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Responsável
                          </p>
                          <p className="font-medium text-gray-600">
                            Gestor Operacional
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Prazo
                          </p>
                          <p className="font-medium text-gray-600">
                            28/02/2024
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Status
                          </p>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Em Planejamento
                          </span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-600 mb-2">
                          Progresso
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "25%" }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          25% concluído
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                          Atualizar
                        </button>
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Detalhes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Monitoramento */}
        {activeCentralRiscos === "monitoramento" && (
          <div className="space-y-6 text-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Indicadores Chave */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  📊 Indicadores de Risco
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600">
                        Exposição Total
                      </span>
                      <span className="text-sm font-bold">8.2M MT</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "82%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600">
                        Risco Residual
                      </span>
                      <span className="text-sm font-bold">2.1M MT</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "21%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600">
                        Eficácia dos Controles
                      </span>
                      <span className="text-sm font-bold">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alertas Recentes */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  🚨 Alertas Recentes
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded border border-blue-200">
                    <div>
                      <p className="font-medium text-sm">
                        MT desvalorizou 2.5%
                      </p>
                      <p className="text-xs text-gray-600">15/01/2024</p>
                    </div>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                      Crítico
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded border border-blue-200">
                    <div>
                      <p className="font-medium text-sm">
                        Nova circular fiscal
                      </p>
                      <p className="text-xs text-gray-600">12/01/2024</p>
                    </div>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                      Alto
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded border border-blue-200">
                    <div>
                      <p className="font-medium text-sm">
                        Incidente EN1 - Inhambane
                      </p>
                      <p className="text-xs text-gray-600">10/01/2024</p>
                    </div>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                      Médio
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tendências */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  📈 Tendências e Evolução
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-2xl font-bold text-green-700">
                      -15%
                    </p>
                    <p className="text-sm text-green-600">
                      Exposição Total
                    </p>
                    <p className="text-xs text-green-500">vs último mês</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-2xl font-bold text-orange-700">
                      +8%
                    </p>
                    <p className="text-sm text-orange-600">
                      Eficácia Controles
                    </p>
                    <p className="text-xs text-orange-500">
                      vs último trimestre
                    </p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-2xl font-bold text-red-700">+3</p>
                    <p className="text-sm text-red-600">Novos Riscos</p>
                    <p className="text-xs text-red-500">este mês</p>
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

export default CentralRiscos;