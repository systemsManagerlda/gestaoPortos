import React, { useState } from 'react';

const ControleInterno = () => {
  const [activeControleInterno, setActiveControleInterno] = useState("dashboard");

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            🔍
          </span>
          Controle Interno - Auditoria e Conformidade
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Sistema de controles internos, auditoria, compliance e gestão de
          riscos
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveControleInterno("dashboard")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeControleInterno === "dashboard"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveControleInterno("controles")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeControleInterno === "controles"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ⚙️ Controles
          </button>
          <button
            onClick={() => setActiveControleInterno("auditoria")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeControleInterno === "auditoria"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📋 Auditoria
          </button>
          <button
            onClick={() => setActiveControleInterno("riscos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeControleInterno === "riscos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ⚠️ Gestão de Riscos
          </button>
          <button
            onClick={() => setActiveControleInterno("compliance")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeControleInterno === "compliance"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ✅ Compliance
          </button>
        </div>

        {/* Dashboard de Controle Interno */}
        {activeControleInterno === "dashboard" && (
          <div className="space-y-6">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Controles Ativos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">156</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">✅</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    94% operacionais
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Riscos Identificados
                    </p>
                    <p className="text-2xl font-bold text-gray-900">28</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">⚠️</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    5 de alto impacto
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Auditorias Pendentes
                    </p>
                    <p className="text-2xl font-bold text-gray-900">6</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">📋</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    2 esta semana
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Conformidade Geral
                    </p>
                    <p className="text-2xl font-bold text-gray-900">92%</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">📊</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    +3% vs último trimestre
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Alertas Críticos */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900">
                    🚨 Alertas Críticos
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                          ⚠️
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            Divergência de Caixa
                          </p>
                          <p className="text-sm text-gray-600">
                            Diferença identificada no fechamento diário
                          </p>
                          <p className="text-xs text-blue-600">
                            Crítico • Detectado: 15/01/2024
                          </p>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Investigar
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                          📝
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            Documentação Fiscal Incompleta
                          </p>
                          <p className="text-sm text-gray-600">
                            Faltam comprovantes de despesas
                          </p>
                          <p className="text-xs text-blue-600">
                            Alto • Vence: 20/01/2024
                          </p>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Corrigir
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                          🔒
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            Acesso Não Autorizado
                          </p>
                          <p className="text-sm text-gray-600">
                            Tentativa de acesso ao módulo financeiro
                          </p>
                          <p className="text-xs text-blue-600">
                            Médio • Detectado: 14/01/2024
                          </p>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Verificar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Próximas Auditorias */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900">
                    📅 Próximas Auditorias
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          Auditoria Financeira Trimestral
                        </p>
                        <p className="text-sm text-gray-600">
                          Revisão de processos financeiros
                        </p>
                        <p className="text-xs text-blue-600">
                          Agendada: 22/01/2024 • Responsável: Carlos Santos
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          Planejada
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          Auditoria de Estoques
                        </p>
                        <p className="text-sm text-gray-600">
                          Controle de peças e materiais
                        </p>
                        <p className="text-xs text-blue-600">
                          Agendada: 25/01/2024 • Responsável: Maria Silva
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          Confirmada
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          Auditoria de TI
                        </p>
                        <p className="text-sm text-gray-600">
                          Segurança e controles de sistema
                        </p>
                        <p className="text-xs text-blue-600">
                          Agendada: 30/01/2024 • Responsável: Tech Solutions
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          Externa
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          Auditoria de Compliance Fiscal
                        </p>
                        <p className="text-sm text-gray-600">
                          Conformidade com legislação
                        </p>
                        <p className="text-xs text-blue-600">
                          Agendada: 05/02/2024 • Responsável: Consultoria Fiscal
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          Pendente
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Indicadores de Conformidade */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-violet-50">
                <h3 className="font-semibold text-gray-900">
                  📊 Indicadores de Conformidade por Área
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 text-2xl">💰</span>
                    </div>
                    <p className="font-bold text-gray-900">95%</p>
                    <p className="text-sm text-gray-600">Financeiro</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "95%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 text-2xl">🚚</span>
                    </div>
                    <p className="font-bold text-gray-900">88%</p>
                    <p className="text-sm text-gray-600">Operacional</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "88%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 text-2xl">🏛️</span>
                    </div>
                    <p className="font-bold text-gray-900">92%</p>
                    <p className="text-sm text-gray-600">Fiscal</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "92%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 text-2xl">👥</span>
                    </div>
                    <p className="font-bold text-gray-900">85%</p>
                    <p className="text-sm text-gray-600">
                      Recursos Humanos
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gestão de Controles Internos */}
        {activeControleInterno === "controles" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-violet-50">
                <h3 className="font-semibold text-gray-900">
                  ⚙️ Controles Internos - Matriz de Controles
                </h3>
              </div>
              <div className="p-6">
                {/* Filtros */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Todas as Áreas</option>
                    <option>Financeiro</option>
                    <option>Operacional</option>
                    <option>Fiscal</option>
                    <option>Recursos Humanos</option>
                    <option>Tecnologia</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Todos os Status</option>
                    <option>Ativo</option>
                    <option>Inativo</option>
                    <option>Em Implementação</option>
                    <option>Necessita Melhoria</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Todos os Riscos</option>
                    <option>Alto</option>
                    <option>Médio</option>
                    <option>Baixo</option>
                  </select>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                    🔍 Filtrar
                  </button>
                </div>

                {/* Matriz de Controles */}
                <div className="space-y-4">
                  {/* Controle 1 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-xl">💰</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Conciliação Bancária Diária
                        </p>
                        <p className="text-sm text-gray-600">
                          Conciliação automática entre sistema e extrato
                          bancário
                        </p>
                        <div className="flex space-x-2 mt-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Financeiro
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Ativo
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                            Alto Risco
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Frequência: Diária
                      </p>
                      <p className="text-sm text-gray-600">
                        Responsável: Maria Silva
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Detalhes
                        </button>
                        <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                          Testar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Controle 2 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-xl">📝</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Aprovação de Despesas
                        </p>
                        <p className="text-sm text-gray-600">
                          Dupla assinatura para despesas acima de 50.000 MT
                        </p>
                        <div className="flex space-x-2 mt-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Financeiro
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Ativo
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Médio Risco
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Frequência: Sob demanda
                      </p>
                      <p className="text-sm text-gray-600">
                        Responsável: Gestor + Diretor
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Detalhes
                        </button>
                        <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                          Testar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Controle 3 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-xl">🏛️</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Emissão de Documentos Fiscais
                        </p>
                        <p className="text-sm text-gray-600">
                          Validação automática de NUIT e dados fiscais
                        </p>
                        <div className="flex space-x-2 mt-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Fiscal
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Ativo
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                            Alto Risco
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Frequência: Por transação
                      </p>
                      <p className="text-sm text-gray-600">
                        Responsável: Sistema
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Detalhes
                        </button>
                        <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                          Testar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Controle 4 - Necessita Melhoria */}
                  <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-xl">🔒</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Controle de Acesso ao Sistema
                        </p>
                        <p className="text-sm text-gray-600">
                          Gestão de perfis e permissões de usuário
                        </p>
                        <div className="flex space-x-2 mt-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            TI
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Melhoria Necessária
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Alto Risco
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Frequência: Contínuo
                      </p>
                      <p className="text-sm text-gray-600">
                        Responsável: Admin TI
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Detalhes
                        </button>
                        <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                          Melhorar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botão Novo Controle */}
                <div className="mt-6 flex justify-end">
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium flex items-center">
                    <span className="mr-2">+</span>
                    Novo Controle
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Módulo de Auditoria */}
        {activeControleInterno === "auditoria" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card Auditoria 1 */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                      💰
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Auditoria Financeira
                      </h3>
                      <p className="text-sm text-gray-600">Trimestral</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    Concluída
                  </span>
                </div>
                <div className="space-y-2 text-gray-900">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Última:</span>
                    <span className="font-medium">15/12/2023</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Próxima:</span>
                    <span className="font-medium">22/01/2024</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Conformidade:</span>
                    <span className="font-medium text-green-600">95%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Achados:</span>
                    <span className="font-medium">3 menores</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                    Relatório
                  </button>
                  <button className="px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                    Agendar
                  </button>
                </div>
              </div>

              {/* Card Auditoria 2 */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-gray-900">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                      🏛️
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Auditoria Fiscal
                      </h3>
                      <p className="text-sm text-gray-600">Anual</p>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Em Andamento
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Início:</span>
                    <span className="font-medium">08/01/2024</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Previsão:</span>
                    <span className="font-medium">31/01/2024</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progresso:</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Achados:</span>
                    <span className="font-medium">2 em análise</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                    Acompanhar
                  </button>
                  <button className="px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                    Detalhes
                  </button>
                </div>
              </div>

              {/* Card Auditoria 3 */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-gray-900">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                      🔒
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Auditoria de TI
                      </h3>
                      <p className="text-sm text-gray-600">Semestral</p>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Planejada
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Última:</span>
                    <span className="font-medium">15/07/2023</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Próxima:</span>
                    <span className="font-medium">30/01/2024</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Conformidade:</span>
                    <span className="font-medium text-gay-600">85%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Achados:</span>
                    <span className="font-medium">5 pendentes</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                    Preparar
                  </button>
                  <button className="px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                    Agendar
                  </button>
                </div>
              </div>
            </div>

            {/* Achados de Auditoria */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  📋 Achados de Auditoria - Pendentes de Tratamento
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                        H
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Falta de Segregação de Funções
                        </p>
                        <p className="text-sm text-gray-600">
                          Mesmo usuário aprova e executa pagamentos
                        </p>
                        <p className="text-xs text-blue-600">
                          Alta criticidade • Prazo: 31/01/2024
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Crítico
                      </span>
                      <button className="block w-full mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Tratar
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                        M
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Documentação Fiscal Incompleta
                        </p>
                        <p className="text-sm text-gray-600">
                          Faltam comprovantes de despesas dedutíveis
                        </p>
                        <p className="text-xs text-blue-600">
                          Média criticidade • Prazo: 15/02/2024
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Médio
                      </span>
                      <button className="block w-full mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Tratar
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                        L
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Backup Não Testado
                        </p>
                        <p className="text-sm text-gray-600">
                          Procedimento de restore não validado
                        </p>
                        <p className="text-xs text-blue-600">
                          Baixa criticidade • Prazo: 28/02/2024
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Baixo
                      </span>
                      <button className="block w-full mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Tratar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gestão de Riscos */}
        {activeControleInterno === "riscos" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-violet-50">
                <h3 className="font-semibold text-gray-900">
                  ⚠️ Matriz de Riscos - Avaliação e Tratamento
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
                        <th className="px-4 py-3">Impacto</th>
                        <th className="px-4 py-3">Nível</th>
                        <th className="px-4 py-3">Controles</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          Fraude em Pagamentos
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Financeiro
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                            Média
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Alto
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Alto
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            3 ativos
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                            Monitorar
                          </span>
                        </td>
                      </tr>
                      <tr className="bg-gray-50 border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          Não Conformidade Fiscal
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                            Fiscal
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Alta
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Alto
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Alto
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            5 ativos
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Controlado
                          </span>
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          Perda de Dados
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                            TI
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                            Média
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Alto
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                            Médio
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                            2 ativos
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                            Atenção
                          </span>
                        </td>
                      </tr>
                      <tr className="bg-gray-50 border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          Acidentes Operacionais
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Operacional
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Baixa
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Alto
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                            Médio
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            4 ativos
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Controlado
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Plano de Ação para Riscos */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-green-50">
                <h3 className="font-semibold text-gray-900">
                  🎯 Planos de Ação - Riscos Críticos
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="font-medium text-gray-900">
                        Implementar Segregação de Funções
                      </p>
                      <p className="text-sm text-gray-600">
                        Risco: Fraude em Pagamentos
                      </p>
                      <p className="text-xs text-blue-600">
                        Prazo: 31/01/2024 • Responsável: Diretor Financeiro
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        25% Concluído
                      </span>
                      <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "25%" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="font-medium text-gray-900">
                        Revisão de Processos Fiscais
                      </p>
                      <p className="text-sm text-gray-600">
                        Risco: Não Conformidade Fiscal
                      </p>
                      <p className="text-xs text-blue-600">
                        Prazo: 15/02/2024 • Responsável: Consultor Fiscal
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        60% Concluído
                      </span>
                      <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="font-medium text-gray-900">
                        Teste de Procedimento de Backup
                      </p>
                      <p className="text-sm text-gray-600">
                        Risco: Perda de Dados
                      </p>
                      <p className="text-xs text-blue-600">
                        Prazo: 28/02/2024 • Responsável: Admin TI
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        10% Concluído
                      </span>
                      <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "10%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Compliance e Conformidade */}
        {activeControleInterno === "compliance" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    🏛️ Compliance Fiscal
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    92%
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">IVA:</span>
                    <span className="font-medium text-blue-600">
                      Em dia
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">IRPS:</span>
                    <span className="font-medium text-blue-600">
                      Em dia
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">INSS:</span>
                    <span className="font-medium text-blue-600">
                      Em dia
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Declarações:</span>
                    <span className="font-medium text-blue-600">
                      Atualizadas
                    </span>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                  Ver Detalhes
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    👥 Compliance Trabalhista
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    88%
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Carteiras:</span>
                    <span className="font-medium text-blue-600">
                      Regularizadas
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">FGSS:</span>
                    <span className="font-medium text-blue-600">
                      Pendente
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Horas Extras:</span>
                    <span className="font-medium text-blue-600">
                      Conforme
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">EPIs:</span>
                    <span className="font-medium text-blue-600">
                      Fornecidos
                    </span>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                  Corrigir Itens
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    🌿 Compliance Ambiental
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    85%
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Licenças:</span>
                    <span className="font-medium text-blue-600">
                      Válidas
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Resíduos:</span>
                    <span className="font-medium text-blue-600">
                      Controlados
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Emissões:</span>
                    <span className="font-medium text-blue-600">
                      Monitorar
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Documentação:</span>
                    <span className="font-medium text-blue-600">
                      Completa
                    </span>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                  Ver Relatório
                </button>
              </div>
            </div>

            {/* Calendário de Obrigações */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-violet-50">
                <h3 className="font-semibold text-gray-900">
                  📅 Calendário de Obrigações Legais
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="font-medium text-gray-900">
                        Declaração IVA - 1º Trimestre 2024
                      </p>
                      <p className="text-sm text-gray-600">
                        Autoridade Tributária
                      </p>
                      <p className="text-xs text-blue-600">
                        Vence em 15 dias • 30/01/2024
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                      Preparar
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="font-medium text-gray-900">
                        Relatório Anual de Atividades
                      </p>
                      <p className="text-sm text-gray-600">
                        INAV - Instituto de Viação
                      </p>
                      <p className="text-xs text-blue-600">
                        Vence em 30 dias • 15/02/2024
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                      Iniciar
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="font-medium text-gray-900">
                        Renovação de Licenças Operacionais
                      </p>
                      <p className="text-sm text-gray-600">
                        Conservatória do Registo Comercial
                      </p>
                      <p className="text-xs text-blue-600">
                        Vence em 45 dias • 01/03/2024
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                      Agendar
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="font-medium text-gray-900">
                        Declaração de IRPS - Janeiro 2024
                      </p>
                      <p className="text-sm text-gray-600">
                        Autoridade Tributária
                      </p>
                      <p className="text-xs text-blue-600">
                        Concluída • 15/01/2024
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      Concluído
                    </span>
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

export default ControleInterno;