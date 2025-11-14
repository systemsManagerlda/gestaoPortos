import React, { useState } from 'react';

const OrganizacaoArquivos = () => {
  const [activeOrganizacaoArquivos, setActiveOrganizacaoArquivos] = useState("dashboard");

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            📁
          </span>
          Organização de Arquivos - Gestão Documental
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Sistema completo de gestão, organização e controle de documentos
          da empresa
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveOrganizacaoArquivos("dashboard")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeOrganizacaoArquivos === "dashboard"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveOrganizacaoArquivos("documentos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeOrganizacaoArquivos === "documentos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📄 Documentos
          </button>
          <button
            onClick={() => setActiveOrganizacaoArquivos("categorias")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeOrganizacaoArquivos === "categorias"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🗂️ Categorias
          </button>
          <button
            onClick={() => setActiveOrganizacaoArquivos("upload")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeOrganizacaoArquivos === "upload"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📤 Upload
          </button>
          <button
            onClick={() => setActiveOrganizacaoArquivos("backup")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeOrganizacaoArquivos === "backup"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            💾 Backup
          </button>
        </div>

        {/* Dashboard Documental */}
        {activeOrganizacaoArquivos === "dashboard" && (
          <div className="space-y-6">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total de Documentos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      1.248
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">📁</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    +45 este mês
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Espaço Utilizado
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      2.8 GB
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">💾</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    35% da capacidade
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Documentos Vencidos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">18</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">⚠️</span>
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
                      Backup Automático
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      Ativo
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">✅</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    Último: Hoje 02:00
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Documentos Recentes */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-slate-50">
                  <h3 className="font-semibold text-gray-900">
                    🆕 Documentos Recentes
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                          📄
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            FAT-2024-0158.pdf
                          </p>
                          <p className="text-sm text-gray-600">
                            Fatura • Cimentos MZ • 15/01/2024
                          </p>
                          <p className="text-xs text-blue-600">
                            Fiscal • 2.1 MB
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          Ativo
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                          🚚
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            GT-2024-0162.pdf
                          </p>
                          <p className="text-sm text-gray-600">
                            Guia Transporte • Mozal • 15/01/2024
                          </p>
                          <p className="text-xs text-blue-600">
                            Operacional • 1.8 MB
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          Ativo
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                          📋
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            Contrato_GrupoJF_2024.pdf
                          </p>
                          <p className="text-sm text-gray-600">
                            Contrato • Grupo JF • 14/01/2024
                          </p>
                          <p className="text-xs text-blue-600">
                            Jurídico • 5.2 MB
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          Ativo
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                          🏛️
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            Declaracao_IVA_Trimestre.pdf
                          </p>
                          <p className="text-sm text-gray-600">
                            Declaração • IVA • 13/01/2024
                          </p>
                          <p className="text-xs text-blue-600">
                            Fiscal • 3.5 MB
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          Ativo
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estatísticas por Categoria */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-slate-50">
                  <h3 className="font-semibold text-gray-900">
                    📊 Documentos por Categoria
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                        <span className="text-sm font-medium text-gray-700">
                          Fiscal
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "35%" }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          245 docs
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                        <span className="text-sm font-medium text-gray-700">
                          Operacional
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "28%" }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          196 docs
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                        <span className="text-sm font-medium text-gray-700">
                          Jurídico
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "15%" }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          105 docs
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                        <span className="text-sm font-medium text-gray-700">
                          Recursos Humanos
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "12%" }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          84 docs
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                        <span className="text-sm font-medium text-gray-700">
                          Outros
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "10%" }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          70 docs
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alertas e Vencimentos */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-yellow-50">
                <h3 className="font-semibold text-gray-900">
                  ⚠️ Alertas e Vencimentos
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-3">
                      <span className="bg-red-500 text-white p-2 rounded-lg">
                        📅
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          Documentos Vencidos
                        </p>
                        <p className="text-sm text-gray-600">
                          18 documentos expirados
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-3">
                      <span className="bg-orange-500 text-white p-2 rounded-lg">
                        ⏳
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          A Vencer (7 dias)
                        </p>
                        <p className="text-sm text-gray-600">
                          12 documentos próximos
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-500 text-white p-2 rounded-lg">
                        📝
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          Revisão Pendente
                        </p>
                        <p className="text-sm text-gray-600">
                          8 documentos para revisar
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gestão de Documentos */}
        {activeOrganizacaoArquivos === "documentos" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  📄 Gestão de Documentos
                </h3>
              </div>
              <div className="p-6">
                {/* Filtros e Busca */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <input
                    type="text"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    placeholder="Pesquisar documentos..."
                  />
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Todas as Categorias</option>
                    <option>Fiscal</option>
                    <option>Operacional</option>
                    <option>Jurídico</option>
                    <option>Recursos Humanos</option>
                    <option>Financeiro</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                    <option>Todos os Status</option>
                    <option>Ativo</option>
                    <option>Arquivado</option>
                    <option>Vencido</option>
                    <option>Pendente</option>
                  </select>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                    🔍 Filtrar
                  </button>
                </div>

                {/* Lista de Documentos */}
                <div className="space-y-3">
                  {/* Documento 1 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-xl">📄</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          FAT-2024-0158.pdf
                        </p>
                        <p className="text-sm text-gray-600">
                          Fatura • Cimentos de Moçambique
                        </p>
                        <div className="flex space-x-2 mt-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Fiscal
                          </span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Ativo
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                            2.1 MB
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Criado: 15/01/2024
                      </p>
                      <p className="text-sm text-gray-600">
                        Vence: 15/02/2024
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Visualizar
                        </button>
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Download
                        </button>
                        <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Documento 2 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-xl">🚚</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          GT-2024-0162.pdf
                        </p>
                        <p className="text-sm text-gray-600">
                          Guia de Transporte • Mozal
                        </p>
                        <div className="flex space-x-2 mt-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Operacional
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Ativo
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                            1.8 MB
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Criado: 15/01/2024
                      </p>
                      <p className="text-sm text-gray-600">
                        Vence: 15/07/2024
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Visualizar
                        </button>
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Download
                        </button>
                        <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Documento 3 - Vencido */}
                  <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <span className="text-red-600 text-xl">🏛️</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Licenca_Operacional_2023.pdf
                        </p>
                        <p className="text-sm text-gray-600">
                          Licença Operacional • INAV
                        </p>
                        <div className="flex space-x-2 mt-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Jurídico
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Vencido
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                            4.2 MB
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Criado: 15/01/2023
                      </p>
                      <p className="text-sm text-red-600">
                        Venceu: 31/12/2023
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Visualizar
                        </button>
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Renovar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Documento 4 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 text-xl">📋</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Contrato_GrupoJF_2024.pdf
                        </p>
                        <p className="text-sm text-gray-600">
                          Contrato Prestação Serviços
                        </p>
                        <div className="flex space-x-2 mt-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Jurídico
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Ativo
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                            5.2 MB
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Criado: 14/01/2024
                      </p>
                      <p className="text-sm text-gray-600">
                        Vence: 14/01/2025
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Visualizar
                        </button>
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Download
                        </button>
                        <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gestão de Categorias */}
        {activeOrganizacaoArquivos === "categorias" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Categoria Fiscal */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-gray-950">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                      🏛️
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Fiscal
                      </h3>
                      <p className="text-sm text-gray-600">
                        245 documentos
                      </p>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Ativa
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Espaço usado:</span>
                    <span className="font-medium">850 MB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Última atualização:
                    </span>
                    <span className="font-medium">15/01/2024</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Documentos vencidos:
                    </span>
                    <span className="font-medium text-red-600">8</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                    Ver Documentos
                  </button>
                  <button className="px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                    ⋮
                  </button>
                </div>
              </div>

              {/* Categoria Operacional */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-gray-950">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                      🚚
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Operacional
                      </h3>
                      <p className="text-sm text-gray-600">
                        196 documentos
                      </p>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Ativa
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Espaço usado:</span>
                    <span className="font-medium">720 MB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Última atualização:
                    </span>
                    <span className="font-medium">15/01/2024</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Documentos vencidos:
                    </span>
                    <span className="font-medium text-red-600">3</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                    Ver Documentos
                  </button>
                  <button className="px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                    ⋮
                  </button>
                </div>
              </div>

              {/* Categoria Jurídico */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-gray-950">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                      ⚖️
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Jurídico
                      </h3>
                      <p className="text-sm text-gray-600">
                        105 documentos
                      </p>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Ativa
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Espaço usado:</span>
                    <span className="font-medium">650 MB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Última atualização:
                    </span>
                    <span className="font-medium">14/01/2024</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Documentos vencidos:
                    </span>
                    <span className="font-medium text-red-600">5</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                    Ver Documentos
                  </button>
                  <button className="px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                    ⋮
                  </button>
                </div>
              </div>
            </div>

            {/* Nova Categoria */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-green-50">
                <h3 className="font-semibold text-gray-900">
                  ➕ Nova Categoria
                </h3>
              </div>
              <div className="p-6">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome da Categoria *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-gray-950"
                      placeholder="Ex: Recursos Humanos"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cor de Identificação
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-gray-950">
                      <option value="blue">Azul</option>
                      <option value="green">Verde</option>
                      <option value="purple">Roxo</option>
                      <option value="orange">Laranja</option>
                      <option value="red">Vermelho</option>
                      <option value="yellow">Amarelo</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-gray-950"
                      placeholder="Descrição da categoria..."
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                    >
                      Criar Categoria
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Upload de Documentos */}
        {activeOrganizacaoArquivos === "upload" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Área de Upload */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-slate-50">
                <h3 className="font-semibold text-gray-900">
                  📤 Upload de Documentos
                </h3>
              </div>
              <div className="p-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors">
                  <div className="text-4xl mb-4">📁</div>
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Arraste e solte seus arquivos aqui
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    ou clique para selecionar os arquivos
                  </p>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="px-6 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 font-medium cursor-pointer"
                  >
                    Selecionar Arquivos
                  </label>
                  <p className="text-xs text-gray-500 mt-4">
                    Formatos suportados: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
                    <br />
                    Tamanho máximo: 50MB por arquivo
                  </p>
                </div>

                {/* Configurações do Upload */}
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoria *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-gray-950">
                      <option value="">Selecione uma categoria</option>
                      <option value="fiscal">Fiscal</option>
                      <option value="operacional">Operacional</option>
                      <option value="juridico">Jurídico</option>
                      <option value="rh">Recursos Humanos</option>
                      <option value="financeiro">Financeiro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data de Vencimento (Opcional)
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-gray-950"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (Opcional)
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-gray-950"
                      placeholder="Ex: fatura, contrato, licença"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição (Opcional)
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-gray-950"
                      placeholder="Descrição do documento..."
                    />
                  </div>

                  <button className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-lg">
                    📤 Iniciar Upload
                  </button>
                </div>
              </div>
            </div>

            {/* Uploads Recentes */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  📋 Uploads Recentes
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3">
                      <span className="text-green-500">✅</span>
                      <div>
                        <p className="font-medium text-gray-900">
                          FAT-2024-0158.pdf
                        </p>
                        <p className="text-sm text-gray-600">
                          Concluído • 2.1 MB
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">15:30</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3">
                      <span className="text-green-500">✅</span>
                      <div>
                        <p className="font-medium text-gray-900">
                          GT-2024-0162.pdf
                        </p>
                        <p className="text-sm text-gray-600">
                          Concluído • 1.8 MB
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">14:45</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <span className="text-blue-500">⏳</span>
                      <div>
                        <p className="font-medium text-gray-900">
                          Contrato_GrupoJF.pdf
                        </p>
                        <p className="text-sm text-gray-600">
                          Processando • 5.2 MB
                        </p>
                      </div>
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-3">
                      <span className="text-red-500">❌</span>
                      <div>
                        <p className="font-medium text-gray-900">
                          Relatorio_Anual.xlsx
                        </p>
                        <p className="text-sm text-gray-600">
                          Falhou • 8.5 MB
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-600 text-sm hover:underline">
                      Tentar novamente
                    </button>
                  </div>
                </div>
              </div>

              {/* Estatísticas de Upload */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  📊 Estatísticas de Upload
                </h4>
                <div className="space-y-4 text-gray-950">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Uploads este mês:
                    </span>
                    <span className="font-medium">45 documentos</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Espaço usado este mês:
                    </span>
                    <span className="font-medium">156 MB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Taxa de sucesso:
                    </span>
                    <span className="font-medium text-green-600">94%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Média de tamanho:
                    </span>
                    <span className="font-medium">3.2 MB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Backup e Segurança */}
        {activeOrganizacaoArquivos === "backup" && (
          <div className="space-y-6 text-gray-950">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    💾 Backup Automático
                  </h3>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    Ativo
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Frequência:</span>
                    <span className="font-medium">Diário</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Próximo backup:</span>
                    <span className="font-medium">Hoje 02:00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Último backup:</span>
                    <span className="font-medium">Ontem 02:00</span>
                  </div>
                  <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    Executar Agora
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    🔒 Segurança
                  </h3>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    Protegido
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Criptografia:</span>
                    <span className="font-medium">AES-256</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Acesso por:</span>
                    <span className="font-medium">3 usuários</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Log de atividades:
                    </span>
                    <span className="font-medium">Ativo</span>
                  </div>
                  <button className="w-full mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium text-sm">
                    Configurar
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    📈 Armazenamento
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    35% usado
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total disponível:</span>
                    <span className="font-medium">8.0 GB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Usado:</span>
                    <span className="font-medium">2.8 GB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Livre:</span>
                    <span className="font-medium">5.2 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "35%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Histórico de Backup */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-slate-50">
                <h3 className="font-semibold text-gray-900">
                  📋 Histórico de Backup
                </h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-3">Data/Hora</th>
                        <th className="px-4 py-3">Tipo</th>
                        <th className="px-4 py-3">Tamanho</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          14/01/2024 02:00
                        </td>
                        <td className="px-4 py-3">Automático</td>
                        <td className="px-4 py-3">2.8 GB</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Concluído
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-blue-600 hover:underline text-sm">
                            Restaurar
                          </button>
                        </td>
                      </tr>
                      <tr className="bg-gray-50 border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          13/01/2024 02:00
                        </td>
                        <td className="px-4 py-3">Automático</td>
                        <td className="px-4 py-3">2.7 GB</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Concluído
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-blue-600 hover:underline text-sm">
                            Restaurar
                          </button>
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          12/01/2024 14:30
                        </td>
                        <td className="px-4 py-3">Manual</td>
                        <td className="px-4 py-3">2.6 GB</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Concluído
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-blue-600 hover:underline text-sm">
                            Restaurar
                          </button>
                        </td>
                      </tr>
                      <tr className="bg-gray-50 border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          11/01/2024 02:00
                        </td>
                        <td className="px-4 py-3">Automático</td>
                        <td className="px-4 py-3">2.5 GB</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            Falhou
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-blue-600 hover:underline text-sm">
                            Tentar Novamente
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
      </div>
    </div>
  );
};

export default OrganizacaoArquivos;