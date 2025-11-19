import React, { useState } from 'react';

const CentralRiscos = () => {
  const [activeCentralRiscos, setActiveCentralRiscos] = useState("dashboard");

  // Dados de exemplo para clientes, transportadores e motoristas
  const [clientes] = useState([
    {
      id: 1,
      nome: "Coca-Cola Moçambique",
      nif: "123456789",
      categoria: "Grande Conta",
      risco: "Médio",
      volume: "2.5M MT",
      historico: "98% pagamentos"
    },
    {
      id: 2,
      nome: "Shoprite Maputo",
      nif: "987654321",
      categoria: "Grande Conta",
      risco: "Baixo",
      volume: "1.8M MT",
      historico: "100% pagamentos"
    },
    {
      id: 3,
      nome: "Vale Moçambique",
      nif: "456789123",
      categoria: "Grande Conta",
      risco: "Alto",
      volume: "4.2M MT",
      historico: "92% pagamentos"
    }
  ]);

  const [transportadores] = useState([
    {
      id: 1,
      nome: "Transportes TransMoz Ltda",
      licenca: "TRANS-2024-001",
      frota: 25,
      risco: "Médio",
      capacidade: "85%",
      avaliacao: "4.2/5.0"
    },
    {
      id: 2,
      nome: "Logística Norte Sul S.A.",
      licenca: "TRANS-2024-002",
      frota: 18,
      risco: "Baixo",
      capacidade: "92%",
      avaliacao: "4.5/5.0"
    },
    {
      id: 3,
      nome: "Carga Segura Lda",
      licenca: "TRANS-2024-003",
      frota: 32,
      risco: "Alto",
      capacidade: "78%",
      avaliacao: "3.8/5.0"
    }
  ]);

  const [motoristas] = useState([
    {
      id: 1,
      nome: "João Matola",
      carta: "C-123456",
      transportador: "Transportes TransMoz Ltda",
      experiencia: "8 anos",
      risco: "Baixo",
      viagens: 245,
      avaliacao: "4.5/5.0"
    },
    {
      id: 2,
      nome: "Carlos Sitoe",
      carta: "C-789012",
      transportador: "Logística Norte Sul S.A.",
      experiencia: "3 anos",
      risco: "Médio",
      viagens: 89,
      avaliacao: "4.0/5.0"
    },
    {
      id: 3,
      nome: "António Macuácua",
      carta: "C-345678",
      transportador: "Carga Segura Lda",
      experiencia: "12 anos",
      risco: "Baixo",
      viagens: 312,
      avaliacao: "4.7/5.0"
    }
  ]);

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
          riscos corporativos
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4 overflow-x-auto">
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
          <button
            onClick={() => setActiveCentralRiscos("clientes")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCentralRiscos === "clientes"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            👥 Clientes
          </button>
          <button
            onClick={() => setActiveCentralRiscos("transportadores")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCentralRiscos === "transportadores"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🚚 Transportadores
          </button>
          <button
            onClick={() => setActiveCentralRiscos("motoristas")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCentralRiscos === "motoristas"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            👨‍💼 Motoristas
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
                      Clientes em Risco
                    </p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <span className="text-orange-600 text-xl">👥</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-orange-600 text-sm font-medium">
                    3 com risco alto
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Transportadores Ativos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">15</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <span className="text-green-600 text-xl">🚚</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-green-600 text-sm font-medium">
                    12 em conformidade
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Motoristas Qualificados
                    </p>
                    <p className="text-2xl font-bold text-gray-900">42</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">👨‍💼</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    95% em dia
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
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-lg font-bold text-red-700">12</p>
                      <p className="text-sm text-red-600">Alto Impacto</p>
                      <div className="mt-2 text-xs text-red-500">
                        Fiscal • Câmbio • Segurança
                      </div>
                    </div>
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-lg font-bold text-orange-700">18</p>
                      <p className="text-sm text-orange-600">Médio Impacto</p>
                      <div className="mt-2 text-xs text-orange-500">
                        Operacional • Fornecedores
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-lg font-bold text-green-700">17</p>
                      <p className="text-sm text-green-600">Baixo Impacto</p>
                      <div className="mt-2 text-xs text-green-500">
                        Administrativo • TI
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3 text-gray-950">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                      <span className="font-medium">
                        Risco Cambial (MT/USD)
                      </span>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                        Alto
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                      <span className="font-medium">
                        Instabilidade Fiscal
                      </span>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                        Alto
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                      <span className="font-medium">
                        Segurança nas Estradas
                      </span>
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
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
                  🚨 Alertas de Riscos Críticos
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white">
                        💰
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Volatilidade Cambial (MT/USD)
                        </p>
                        <p className="text-sm text-gray-600">
                          Desvalorização do Metical frente ao Dólar
                        </p>
                        <p className="text-xs text-red-600">
                          Impacto: 5.2M MT • Probabilidade: Alta
                        </p>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                      Mitigar
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                        🏛️
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Mudanças na Legislação Fiscal
                        </p>
                        <p className="text-sm text-gray-600">
                          Novas obrigações do IVA e IRPS
                        </p>
                        <p className="text-xs text-orange-600">
                          Impacto: 1.8M MT • Probabilidade: Média
                        </p>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600">
                      Acompanhar
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                        🚚
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Segurança nas Estradas Nacionais
                        </p>
                        <p className="text-sm text-gray-600">
                          Riscos na EN1 e corredores de transporte
                        </p>
                        <p className="text-xs text-orange-600">
                          Impacto: 900K MT • Probabilidade: Média
                        </p>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600">
                      Monitorar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Seção de Clientes */}
        {activeCentralRiscos === "clientes" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  👥 Gestão de Clientes - Avaliação de Riscos
                </h3>
              </div>
              <div className="p-6">
                {/* Filtros para Clientes */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <input 
                    type="text" 
                    placeholder="Pesquisar cliente..."
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                  />
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Todos os Riscos</option>
                    <option>Alto</option>
                    <option>Médio</option>
                    <option>Baixo</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Todas as Categorias</option>
                    <option>Grande Conta</option>
                    <option>Média Empresa</option>
                    <option>Pequeno Negócio</option>
                  </select>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                    🔍 Filtrar
                  </button>
                </div>

                {/* Lista de Clientes */}
                <div className="space-y-4">
                  {clientes.map(cliente => (
                    <div key={cliente.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          cliente.risco === 'Alto' ? 'bg-red-100' : 
                          cliente.risco === 'Médio' ? 'bg-orange-100' : 'bg-green-100'
                        }`}>
                          <span className={`text-xl ${
                            cliente.risco === 'Alto' ? 'text-red-600' : 
                            cliente.risco === 'Médio' ? 'text-orange-600' : 'text-green-600'
                          }`}>
                            👥
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{cliente.nome}</p>
                          <p className="text-sm text-gray-600">NIF: {cliente.nif}</p>
                          <div className="flex space-x-2 mt-1">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {cliente.categoria}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              cliente.risco === 'Alto' ? 'bg-red-100 text-red-800' : 
                              cliente.risco === 'Médio' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                            }`}>
                              Risco {cliente.risco}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          Volume: {cliente.volume}
                        </p>
                        <p className="text-sm text-gray-600">
                          Histórico: {cliente.historico}
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
                  ))}
                </div>

                {/* Botão Novo Cliente */}
                <div className="mt-6 flex justify-end">
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium flex items-center">
                    <span className="mr-2">+</span>
                    Adicionar Novo Cliente
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Seção de Transportadores */}
        {activeCentralRiscos === "transportadores" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-green-50">
                <h3 className="font-semibold text-gray-900">
                  🚚 Gestão de Transportadores - Avaliação de Riscos
                </h3>
              </div>
              <div className="p-6">
                {/* Filtros para Transportadores */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <input 
                    type="text" 
                    placeholder="Pesquisar transportador..."
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                  />
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Todos os Riscos</option>
                    <option>Alto</option>
                    <option>Médio</option>
                    <option>Baixo</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Tamanho da Frota</option>
                    <option>1-10 veículos</option>
                    <option>11-25 veículos</option>
                    <option>+25 veículos</option>
                  </select>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                    🔍 Filtrar
                  </button>
                </div>

                {/* Lista de Transportadores */}
                <div className="space-y-4">
                  {transportadores.map(transportador => (
                    <div key={transportador.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          transportador.risco === 'Alto' ? 'bg-red-100' : 
                          transportador.risco === 'Médio' ? 'bg-orange-100' : 'bg-green-100'
                        }`}>
                          <span className={`text-xl ${
                            transportador.risco === 'Alto' ? 'text-red-600' : 
                            transportador.risco === 'Médio' ? 'text-orange-600' : 'text-green-600'
                          }`}>
                            🚚
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{transportador.nome}</p>
                          <p className="text-sm text-gray-600">Licença: {transportador.licenca}</p>
                          <div className="flex space-x-2 mt-1">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              Frota: {transportador.frota} veículos
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              transportador.risco === 'Alto' ? 'bg-red-100 text-red-800' : 
                              transportador.risco === 'Médio' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                            }`}>
                              Risco {transportador.risco}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          Capacidade: {transportador.capacidade}
                        </p>
                        <p className="text-sm text-gray-600">
                          Avaliação: {transportador.avaliacao}
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                            Detalhes
                          </button>
                          <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                            Inspecionar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botão Novo Transportador */}
                <div className="mt-6 flex justify-end">
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium flex items-center">
                    <span className="mr-2">+</span>
                    Cadastrar Transportador
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Seção de Motoristas */}
        {activeCentralRiscos === "motoristas" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-purple-50">
                <h3 className="font-semibold text-gray-900">
                  👨‍💼 Gestão de Motoristas - Avaliação de Riscos
                </h3>
              </div>
              <div className="p-6">
                {/* Filtros para Motoristas */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <input 
                    type="text" 
                    placeholder="Pesquisar motorista..."
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                  />
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Todos os Riscos</option>
                    <option>Alto</option>
                    <option>Médio</option>
                    <option>Baixo</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Todos os Transportadores</option>
                    <option>Transportes TransMoz Ltda</option>
                    <option>Logística Norte Sul S.A.</option>
                    <option>Carga Segura Lda</option>
                  </select>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                    🔍 Filtrar
                  </button>
                </div>

                {/* Lista de Motoristas */}
                <div className="space-y-4">
                  {motoristas.map(motorista => (
                    <div key={motorista.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          motorista.risco === 'Alto' ? 'bg-red-100' : 
                          motorista.risco === 'Médio' ? 'bg-orange-100' : 'bg-green-100'
                        }`}>
                          <span className={`text-xl ${
                            motorista.risco === 'Alto' ? 'text-red-600' : 
                            motorista.risco === 'Médio' ? 'text-orange-600' : 'text-green-600'
                          }`}>
                            👨‍💼
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{motorista.nome}</p>
                          <p className="text-sm text-gray-600">Carta: {motorista.carta}</p>
                          <div className="flex space-x-2 mt-1">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {motorista.transportador}
                            </span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              Exp: {motorista.experiencia}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              motorista.risco === 'Alto' ? 'bg-red-100 text-red-800' : 
                              motorista.risco === 'Médio' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                            }`}>
                              Risco {motorista.risco}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          Viagens: {motorista.viagens}
                        </p>
                        <p className="text-sm text-gray-600">
                          Avaliação: {motorista.avaliacao}
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                            Perfil
                          </button>
                          <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                            Treinar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botão Novo Motorista */}
                <div className="mt-6 flex justify-end">
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium flex items-center">
                    <span className="mr-2">+</span>
                    Cadastrar Motorista
                  </button>
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
                  🔍 Identificação de Riscos
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
                    </tbody>
                  </table>
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