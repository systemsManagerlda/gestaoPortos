import React, { useState } from 'react';

const ServicosTerceirizados = () => {
  const [activeServicosTerceirizados, setActiveServicosTerceirizados] = useState("dashboard");

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            🤝
          </span>
          Serviços Terceirizados - Controle de Serviços Externos
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Gestão completa de fornecedores, contratos e serviços
          terceirizados
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveServicosTerceirizados("dashboard")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeServicosTerceirizados === "dashboard"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveServicosTerceirizados("fornecedores")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeServicosTerceirizados === "fornecedores"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🏢 Fornecedores
          </button>
          <button
            onClick={() => setActiveServicosTerceirizados("servicos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeServicosTerceirizados === "servicos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🔧 Serviços
          </button>
          <button
            onClick={() => setActiveServicosTerceirizados("contratos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeServicosTerceirizados === "contratos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📝 Contratos
          </button>
          <button
            onClick={() => setActiveServicosTerceirizados("pagamentos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeServicosTerceirizados === "pagamentos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            💰 Pagamentos
          </button>
        </div>

        {/* Dashboard de Serviços Terceirizados */}
        {activeServicosTerceirizados === "dashboard" && (
          <div className="space-y-6">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Fornecedores Ativos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">🏢</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    +3 este mês
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Serviços Ativos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">18</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">🔧</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    5 em andamento
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Custo Mensal
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      285.000 MT
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">💰</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    -5% vs mês passado
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Contratos a Vencer
                    </p>
                    <p className="text-2xl font-bold text-gray-900">6</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">⚠️</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    Próximos 30 dias
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Serviços em Andamento */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-amber-50">
                  <h3 className="font-semibold text-gray-900">
                    🔧 Serviços em Andamento
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                          🚗
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            Manutenção Preventiva - Frota
                          </p>
                          <p className="text-sm text-gray-600">
                            Oficina Maputo • Vencimento: 25/01/2024
                          </p>
                          <p className="text-xs text-blue-600">
                            Andamento: 75% • 12.500 MT
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Em Andamento
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                          🖥️
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            Atualização de Software
                          </p>
                          <p className="text-sm text-gray-600">
                            Tech Solutions Lda • Vencimento: 20/01/2024
                          </p>
                          <p className="text-xs text-blue-600">
                            Andamento: 90% • 8.000 MT
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Quase Concluído
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                          🧹
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            Limpeza das Instalações
                          </p>
                          <p className="text-sm text-gray-600">
                            Clean Service • Vencimento: 31/01/2024
                          </p>
                          <p className="text-xs text-blue-600">
                            Andamento: 30% • 15.000 MT/mês
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Iniciado
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                          🔒
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            Segurança Patrimonial
                          </p>
                          <p className="text-sm text-gray-600">
                            Securitas Moçambique • Vencimento: 28/02/2024
                          </p>
                          <p className="text-xs text-blue-600">
                            Andamento: 100% • 45.000 MT/mês
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Contínuo
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Próximos Vencimentos */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900">
                    📅 Próximos Vencimentos
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          Contrato - Oficina Maputo
                        </p>
                        <p className="text-sm text-gray-600">
                          Manutenção veicular
                        </p>
                        <p className="text-xs text-blue-600">
                          Vence em 5 dias • 25/01/2024
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">12.500 MT</p>
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 mt-1">
                          Renovar
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          Software - Tech Solutions
                        </p>
                        <p className="text-sm text-gray-600">
                          Licenças anuais
                        </p>
                        <p className="text-xs text-blue-600">
                          Vence em 10 dias • 30/01/2024
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">8.000 MT</p>
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 mt-1">
                          Renovar
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          Limpeza - Clean Service
                        </p>
                        <p className="text-sm text-gray-600">
                          Mensalidade janeiro
                        </p>
                        <p className="text-xs text-blue-600">
                          Vence em 15 dias • 05/02/2024
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">15.000 MT</p>
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 mt-1">
                          Pagar
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          Segurança - Securitas
                        </p>
                        <p className="text-sm text-gray-600">
                          Mensalidade fevereiro
                        </p>
                        <p className="text-xs text-blue-600">
                          Vence em 30 dias • 20/02/2024
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">45.000 MT</p>
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 mt-1">
                          Programar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desempenho de Fornecedores */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  📊 Desempenho de Fornecedores
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 text-2xl">⭐</span>
                    </div>
                    <p className="font-bold text-gray-900">4.8/5.0</p>
                    <p className="text-sm text-gray-600">Oficina Maputo</p>
                    <p className="text-xs text-blue-600">Excelente</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 text-2xl">⭐</span>
                    </div>
                    <p className="font-bold text-gray-900">4.5/5.0</p>
                    <p className="text-sm text-gray-600">Tech Solutions</p>
                    <p className="text-xs text-blue-600">Bom</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 text-2xl">⭐</span>
                    </div>
                    <p className="font-bold text-gray-900">3.9/5.0</p>
                    <p className="text-sm text-gray-600">Clean Service</p>
                    <p className="text-xs text-blue-600">Regular</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 text-2xl">⭐</span>
                    </div>
                    <p className="font-bold text-gray-900">4.7/5.0</p>
                    <p className="text-sm text-gray-600">Securitas MZ</p>
                    <p className="text-xs text-blue-600">Muito Bom</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gestão de Fornecedores */}
        {activeServicosTerceirizados === "fornecedores" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  🏢 Cadastro de Fornecedores
                </h3>
              </div>
              <div className="p-6">
                {/* Filtros */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <input
                    type="text"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    placeholder="Pesquisar fornecedor..."
                  />
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Todos os Tipos</option>
                    <option>Manutenção</option>
                    <option>Tecnologia</option>
                    <option>Limpeza</option>
                    <option>Segurança</option>
                    <option>Consultoria</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Todos os Status</option>
                    <option>Ativo</option>
                    <option>Inativo</option>
                    <option>Suspenso</option>
                  </select>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                    🔍 Filtrar
                  </button>
                </div>

                {/* Lista de Fornecedores */}
                <div className="space-y-4">
                  {/* Fornecedor 1 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-xl">🚗</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Oficina Maputo
                        </p>
                        <p className="text-sm text-gray-600">
                          Manutenção e reparação veicular
                        </p>
                        <div className="flex space-x-2 mt-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Manutenção
                          </span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Ativo
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                            NUIT: 123456789
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Desde: 15/01/2023
                      </p>
                      <p className="text-sm text-gray-600">
                        Avaliação: ⭐ 4.8/5.0
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Ver
                        </button>
                        <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Fornecedor 2 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-xl">🖥️</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Tech Solutions Lda
                        </p>
                        <p className="text-sm text-gray-600">
                          Soluções em tecnologia e software
                        </p>
                        <div className="flex space-x-2 mt-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Tecnologia
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Ativo
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                            NUIT: 987654321
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Desde: 20/03/2023
                      </p>
                      <p className="text-sm text-gray-600">
                        Avaliação: ⭐ 4.5/5.0
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Ver
                        </button>
                        <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Fornecedor 3 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-xl">🧹</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Clean Service
                        </p>
                        <p className="text-sm text-gray-600">
                          Serviços de limpeza e conservação
                        </p>
                        <div className="flex space-x-2 mt-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Limpeza
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Ativo
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                            NUIT: 456789123
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Desde: 10/06/2023
                      </p>
                      <p className="text-sm text-gray-600">
                        Avaliação: ⭐ 3.9/5.0
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Ver
                        </button>
                        <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Fornecedor 4 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-xl">🔒</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Securitas Moçambique
                        </p>
                        <p className="text-sm text-gray-600">
                          Segurança patrimonial e vigilância
                        </p>
                        <div className="flex space-x-2 mt-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Segurança
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Ativo
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                            NUIT: 789123456
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Desde: 05/01/2022
                      </p>
                      <p className="text-sm text-gray-600">
                        Avaliação: ⭐ 4.7/5.0
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Ver
                        </button>
                        <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botão Novo Fornecedor */}
                <div className="mt-6 flex justify-end">
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium flex items-center">
                    <span className="mr-2">+</span>
                    Novo Fornecedor
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gestão de Serviços */}
        {activeServicosTerceirizados === "servicos" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card Serviço 1 */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-gray-950">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                      🚗
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Manutenção Veicular
                      </h3>
                      <p className="text-sm text-gray-600">
                        Oficina Maputo
                      </p>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Ativo
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tipo:</span>
                    <span className="font-medium">
                      Preventiva/Corretiva
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Frequência:</span>
                    <span className="font-medium">Sob demanda</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Custo médio:</span>
                    <span className="font-medium">12.500 MT</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Próximo venc.:</span>
                    <span className="font-medium">25/01/2024</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                    Detalhes
                  </button>
                  <button className="px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                    Editar
                  </button>
                </div>
              </div>

              {/* Card Serviço 2 */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-gray-950">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                      🖥️
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Suporte Técnico
                      </h3>
                      <p className="text-sm text-gray-600">
                        Tech Solutions
                      </p>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Ativo
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tipo:</span>
                    <span className="font-medium">Tecnologia</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Frequência:</span>
                    <span className="font-medium">24/7</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Custo médio:</span>
                    <span className="font-medium">8.000 MT/mês</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Próximo venc.:</span>
                    <span className="font-medium">30/01/2024</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                    Detalhes
                  </button>
                  <button className="px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                    Editar
                  </button>
                </div>
              </div>

              {/* Card Serviço 3 */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-gray-950">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                      🧹
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Limpeza
                      </h3>
                      <p className="text-sm text-gray-600">Clean Service</p>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Ativo
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tipo:</span>
                    <span className="font-medium">Conservação</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Frequência:</span>
                    <span className="font-medium">Diária</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Custo médio:</span>
                    <span className="font-medium">15.000 MT/mês</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Próximo venc.:</span>
                    <span className="font-medium">05/02/2024</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                    Detalhes
                  </button>
                  <button className="px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                    Editar
                  </button>
                </div>
              </div>
            </div>

            {/* Novo Serviço */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  ➕ Novo Serviço Terceirizado
                </h3>
              </div>
              <div className="p-6">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome do Serviço *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                      placeholder="Ex: Manutenção de Computadores"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fornecedor *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950">
                      <option value="">Selecione o fornecedor</option>
                      <option value="oficina">Oficina Maputo</option>
                      <option value="tech">Tech Solutions</option>
                      <option value="clean">Clean Service</option>
                      <option value="securitas">Securitas MZ</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Serviço *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950">
                      <option value="">Selecione</option>
                      <option value="manutencao">Manutenção</option>
                      <option value="tecnologia">Tecnologia</option>
                      <option value="limpeza">Limpeza</option>
                      <option value="seguranca">Segurança</option>
                      <option value="consultoria">Consultoria</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Custo Mensal (MT)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                      placeholder="0,00"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição do Serviço
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                      placeholder="Descreva o serviço terceirizado..."
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                    >
                      Cadastrar Serviço
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Gestão de Contratos */}
        {activeServicosTerceirizados === "contratos" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-amber-50">
                <h3 className="font-semibold text-gray-900">
                  📝 Contratos de Serviços
                </h3>
              </div>
              <div className="p-6">
                {/* Filtros */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Todos os Status</option>
                    <option>Ativo</option>
                    <option>Vencido</option>
                    <option>Renovação Pendente</option>
                    <option>Cancelado</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Todos os Fornecedores</option>
                    <option>Oficina Maputo</option>
                    <option>Tech Solutions</option>
                    <option>Clean Service</option>
                    <option>Securitas MZ</option>
                  </select>
                  <input
                    type="date"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    placeholder="Vencimento até"
                  />
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                    🔍 Filtrar
                  </button>
                </div>

                {/* Lista de Contratos */}
                <div className="space-y-4">
                  {/* Contrato 1 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-xl">📄</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          CT-2023-MNT-015
                        </p>
                        <p className="text-sm text-gray-600">
                          Manutenção Veicular • Oficina Maputo
                        </p>
                        <div className="flex space-x-2 mt-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Manutenção
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Ativo
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Vence: 25/01/2024
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">12.500 MT</p>
                      <p className="text-sm text-gray-600">Valor mensal</p>
                      <div className="flex space-x-2 mt-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Ver
                        </button>
                        <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                          Renovar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Contrato 2 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-xl">📄</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          CT-2023-TEC-028
                        </p>
                        <p className="text-sm text-gray-600">
                          Suporte Técnico • Tech Solutions
                        </p>
                        <div className="flex space-x-2 mt-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Tecnologia
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Ativo
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Vence: 30/01/2024
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">8.000 MT</p>
                      <p className="text-sm text-gray-600">Valor mensal</p>
                      <div className="flex space-x-2 mt-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Ver
                        </button>
                        <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                          Renovar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Contrato 3 - Vencido */}
                  <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-xl">📄</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          CT-2022-SEG-005
                        </p>
                        <p className="text-sm text-gray-600">
                          Segurança • Securitas MZ
                        </p>
                        <div className="flex space-x-2 mt-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Segurança
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Vencido
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Venceu: 31/12/2023
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">45.000 MT</p>
                      <p className="text-sm text-gray-600">Valor mensal</p>
                      <div className="flex space-x-2 mt-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Ver
                        </button>
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Urgente!
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gestão de Pagamentos */}
        {activeServicosTerceirizados === "pagamentos" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  💰 Controle de Pagamentos
                </h3>
              </div>
              <div className="p-6">
                {/* Resumo Financeiro */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-900">
                      Total Mensal
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      285.000 MT
                    </p>
                    <p className="text-sm text-gray-600">
                      Todos os serviços
                    </p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-900">
                      Pago Este Mês
                    </p>
                    <p className="text-2xl font-bold text-gray-600">
                      180.000 MT
                    </p>
                    <p className="text-sm text-gray-600">63% do total</p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-900">Pendente</p>
                    <p className="text-2xl font-bold text-gray-600">
                      105.000 MT
                    </p>
                    <p className="text-sm text-gray-600">4 serviços</p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-900">Atrasados</p>
                    <p className="text-2xl font-bold text-gray-600">
                      45.000 MT
                    </p>
                    <p className="text-sm text-gray-600">1 serviço</p>
                  </div>
                </div>

                {/* Lista de Pagamentos */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                        ✅
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Oficina Maputo
                        </p>
                        <p className="text-sm text-gray-600">
                          Manutenção preventiva dezembro
                        </p>
                        <p className="text-xs text-blue-600">
                          Pago: 05/01/2024 • Transferência
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">12.500 MT</p>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Pago
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                        ✅
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Tech Solutions
                        </p>
                        <p className="text-sm text-gray-600">
                          Licenças software janeiro
                        </p>
                        <p className="text-xs text-blue-600">
                          Pago: 10/01/2024 • Multicaixa
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">8.000 MT</p>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Pago
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                        ⏳
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Clean Service
                        </p>
                        <p className="text-sm text-gray-600">
                          Limpeza janeiro
                        </p>
                        <p className="text-xs text-blue-600">
                          Vence: 05/02/2024
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">15.000 MT</p>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Pagar
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                        ⚠️
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Securitas MZ
                        </p>
                        <p className="text-sm text-gray-600">
                          Segurança dezembro
                        </p>
                        <p className="text-xs text-blue-600">
                          Venceu: 31/12/2023
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">45.000 MT</p>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Pagar Agora
                      </button>
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

export default ServicosTerceirizados;