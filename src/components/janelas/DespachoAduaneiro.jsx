import React, { useState } from 'react';

const DespachoAduaneiro = () => {
  const [activeAduanaProcess, setActiveAduanaProcess] = useState("importacao");

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            🚢
          </span>
          Serviços de Despacho Aduaneiro
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Gestão completa de processos aduaneiros, declarações, liberações e
          acompanhamento de mercadorias
        </p>
      </div>

      {/* Menu de Tipos de Processos Aduaneiros */}
      <div className="flex space-x-2 p-4 border-b border-gray-200 bg-white overflow-x-auto">
        <button
          onClick={() => setActiveAduanaProcess("importacao")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
            activeAduanaProcess === "importacao"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          📥 Importação
        </button>
        <button
          onClick={() => setActiveAduanaProcess("exportacao")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
            activeAduanaProcess === "exportacao"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          📤 Exportação
        </button>
        <button
          onClick={() => setActiveAduanaProcess("transito")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
            activeAduanaProcess === "transito"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          🚛 Trânsito
        </button>
        <button
          onClick={() => setActiveAduanaProcess("despacho")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
            activeAduanaProcess === "despacho"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          📋 Despacho
        </button>
        <button
          onClick={() => setActiveAduanaProcess("consultoria")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
            activeAduanaProcess === "consultoria"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          💼 Consultoria
        </button>
        <button
          onClick={() => setActiveAduanaProcess("rastreio")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
            activeAduanaProcess === "rastreio"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          🔍 Rastreio
        </button>
        <button
          onClick={() => setActiveAduanaProcess("graficos")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
            activeAduanaProcess === "graficos"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          📊 Gráficos
        </button>
      </div>

      <div className="flex-1 p-6">
        {/* Processo de Importação */}
        {activeAduanaProcess === "importacao" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900">
                    📥 Novo Processo de Importação
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    {/* Dados do Cliente */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        👤 Dados do Importador
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Importador *
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950">
                            <option value="">Selecione o importador</option>
                            <option value="cimentos">
                              Cimentos de Moçambique
                            </option>
                            <option value="mozal">Mozal</option>
                            <option value="joao-ferreira">
                              Grupo João Ferreira
                            </option>
                            <option value="cervejas">
                              Cervejas de Moçambique
                            </option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            NUIT *
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                            placeholder="Número de Identificação Tributária"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Dados da Mercadoria */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        📦 Dados da Mercadoria
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Descrição da Mercadoria *
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                            placeholder="Descrição detalhada"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            NCM/HS Code *
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                            placeholder="Código harmonizado"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Peso Líquido (kg)
                          </label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Peso Bruto (kg)
                          </label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Valor (USD)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                            placeholder="0,00"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Dados do Transporte */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        🚢 Dados do Transporte
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Meio de Transporte *
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950">
                            <option value="">Selecione</option>
                            <option value="maritimo">Marítimo</option>
                            <option value="aereo">Aéreo</option>
                            <option value="terrestre">Terrestre</option>
                            <option value="ferroviario">Ferroviário</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Porto/Aeroporto *
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950">
                            <option value="">Selecione</option>
                            <option value="maputo">Porto de Maputo</option>
                            <option value="beira">Porto da Beira</option>
                            <option value="nacala">Porto de Nacala</option>
                            <option value="mavalane">
                              Aeroporto Mavalane
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nº do Conhecimento *
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                            placeholder="Número do documento"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Data de Embarque
                          </label>
                          <input
                            type="date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Documentação */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        📄 Documentação
                      </h4>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Factura Comercial
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Conhecimento de Embarque
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Certificado de Origem
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Lista de Embalagem
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Documentos de Transporte
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                      >
                        Iniciar Processo
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Pré-visualização e Ações */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  📋 Pré-visualização
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-medium text-gray-900">
                      PROCESSO DE IMPORTAÇÃO
                    </p>
                    <p className="text-xs text-gray-600">
                      Nº: <strong>IMP-2024-00158</strong>
                    </p>
                    <p className="text-xs text-gray-600">
                      Status:{" "}
                      <span className="text-orange-600">Pendente</span>
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Importador:</span>
                    <p className="font-medium text-gray-950">-</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Mercadoria:</span>
                    <p className="font-medium text-gray-950">-</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Porto:</span>
                    <p className="font-medium text-gray-950">-</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  ⚡ Ações Rápidas
                </h4>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    💾 Guardar Rascunho
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    📤 Submeter à Alfândega
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    📧 Enviar Documentação
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  ℹ️ Informações
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Processo leva 3-5 dias úteis</p>
                  <p>• Documentação completa obrigatória</p>
                  <p>• Taxas alfandegárias calculadas automaticamente</p>
                  <p>• Acompanhamento em tempo real</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Processo de Exportação */}
        {activeAduanaProcess === "exportacao" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900">
                    📤 Novo Processo de Exportação
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    {/* Dados do Exportador */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        👤 Dados do Exportador
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Exportador *
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                            <option value="">Selecione o exportador</option>
                            <option value="cimentos">
                              Cimentos de Moçambique
                            </option>
                            <option value="mozal">Mozal</option>
                            <option value="joao-ferreira">
                              Grupo João Ferreira
                            </option>
                            <option value="madeiras">
                              Madeiras de Moçambique
                            </option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            NUIT *
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                            placeholder="Número de Identificação Tributária"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Dados da Mercadoria */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        📦 Dados da Mercadoria
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Descrição da Mercadoria *
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                            placeholder="Descrição detalhada"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            NCM/HS Code *
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                            placeholder="Código harmonizado"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quantidade *
                          </label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Unidade de Medida *
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                            <option value="">Selecione</option>
                            <option value="kg">Quilogramas</option>
                            <option value="un">Unidades</option>
                            <option value="cx">Caixas</option>
                            <option value="ton">Toneladas</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Valor FOB (USD)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                            placeholder="0,00"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Dados do Destino */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        🎯 Dados do Destino
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            País de Destino *
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                            <option value="">Selecione o país</option>
                            <option value="zaf">África do Sul</option>
                            <option value="zwe">Zimbabwe</option>
                            <option value="bwa">Botswana</option>
                            <option value="eur">Europa</option>
                            <option value="asi">Ásia</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Porto de Embarque *
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                            <option value="">Selecione</option>
                            <option value="maputo">Porto de Maputo</option>
                            <option value="beira">Porto da Beira</option>
                            <option value="nacala">Porto de Nacala</option>
                            <option value="mavalane">
                              Aeroporto Mavalane
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Documentação */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        📄 Documentação
                      </h4>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Factura Comercial
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Romaneio de Carga
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Certificado de Origem
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Licenças de Exportação
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                      >
                        Iniciar Exportação
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Pré-visualização e Ações */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  📋 Pré-visualização
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-medium text-gray-900">
                      PROCESSO DE EXPORTAÇÃO
                    </p>
                    <p className="text-xs text-gray-600">
                      Nº: <strong>EXP-2024-00158</strong>
                    </p>
                    <p className="text-xs text-gray-600">
                      Status:{" "}
                      <span className="text-orange-600">Pendente</span>
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Exportador:</span>
                    <p className="font-medium text-gray-950">-</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Destino:</span>
                    <p className="font-medium text-gray-950">-</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Mercadoria:</span>
                    <p className="font-medium text-gray-950">-</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  ⚡ Ações Rápidas
                </h4>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    💾 Guardar Rascunho
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    📤 Submeter Declaração
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    🖨️ Imprimir Documentos
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  ℹ️ Informações
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Processo leva 2-4 dias úteis</p>
                  <p>• Licenças específicas podem ser necessárias</p>
                  <p>• Verificar restrições do país de destino</p>
                  <p>• Certificado de origem obrigatório</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Processo de Trânsito */}
        {activeAduanaProcess === "transito" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900">
                    🚛 Novo Processo de Trânsito
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    {/* Dados do Trânsito */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        🗺️ Dados do Trânsito
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Origem *
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                            <option value="">Selecione a origem</option>
                            <option value="maputo">Maputo</option>
                            <option value="beira">Beira</option>
                            <option value="nampula">Nampula</option>
                            <option value="matola">Matola</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Destino *
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                            <option value="">Selecione o destino</option>
                            <option value="zimbabwe">Zimbabwe</option>
                            <option value="south-africa">
                              África do Sul
                            </option>
                            <option value="zambia">Zâmbia</option>
                            <option value="malawi">Malawi</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tipo de Trânsito *
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                            <option value="">Selecione</option>
                            <option value="interno">
                              Trânsito Interno
                            </option>
                            <option value="internacional">
                              Trânsito Internacional
                            </option>
                            <option value="comunitario">
                              Trânsito Comunitário
                            </option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Prazo de Trânsito (dias)
                          </label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                            placeholder="30"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Dados da Mercadoria */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        📦 Mercadoria em Trânsito
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Descrição da Mercadoria *
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                            placeholder="Descrição detalhada"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Valor da Mercadoria (USD)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                            placeholder="0,00"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Garantias */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        🛡️ Garantias
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tipo de Garantia *
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                            <option value="">Selecione</option>
                            <option value="seguro">Seguro</option>
                            <option value="deposito">Depósito</option>
                            <option value="fianca">Fiança Bancária</option>
                            <option value="isento">Isento</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Valor da Garantia (USD)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                            placeholder="0,00"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                      >
                        Solicitar Trânsito
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Pré-visualização e Ações */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  📋 Pré-visualização
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-medium text-gray-900">
                      PROCESSO DE TRÂNSITO
                    </p>
                    <p className="text-xs text-gray-600">
                      Nº: <strong>TRA-2024-00158</strong>
                    </p>
                    <p className="text-xs text-gray-600">
                      Status:{" "}
                      <span className="text-orange-600">Pendente</span>
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Rota:</span>
                    <p className="font-medium text-gray-950">- → -</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Tipo:</span>
                    <p className="font-medium text-gray-950">-</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Prazo:</span>
                    <p className="font-medium text-gray-950">- dias</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  ⚡ Ações Rápidas
                </h4>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    💾 Guardar Rascunho
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    📤 Submeter Pedido
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    🛡️ Gerar Garantia
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  ℹ️ Informações
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Prazo máximo de trânsito: 90 dias</p>
                  <p>
                    • Garantia obrigatória para valores superiores a $1000
                  </p>
                  <p>• Documentação de origem e destino necessária</p>
                  <p>• Acompanhamento de rastreio disponível</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Processo de Despacho */}
        {activeAduanaProcess === "despacho" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900">
                    📋 Despacho Aduaneiro
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    {/* Dados do Despacho */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        📄 Dados do Despacho
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Número DAU *
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                            placeholder="Número do Documento Aduaneiro Único"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tipo de Declaração *
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950">
                            <option value="">Selecione</option>
                            <option value="importacao">Importação</option>
                            <option value="exportacao">Exportação</option>
                            <option value="transito">Trânsito</option>
                            <option value="reexportacao">
                              Re-exportação
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Regime Aduaneiro */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        ⚖️ Regime Aduaneiro
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Regime *
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950">
                            <option value="">Selecione o regime</option>
                            <option value="definitivo">Definitivo</option>
                            <option value="temporario">Temporário</option>
                            <option value="admissao">
                              Admissão Temporária
                            </option>
                            <option value="perfeicoamento">
                              Perfeiçoamento Ativo
                            </option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Destino Aduaneiro *
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950">
                            <option value="">Selecione</option>
                            <option value="consumo">Consumo</option>
                            <option value="armazem">Armazém</option>
                            <option value="industria">Indústria</option>
                            <option value="reexportacao">
                              Re-exportação
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Cálculo de Tributos */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        🧮 Cálculo de Tributos
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Valor Aduaneiro (USD)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                            placeholder="0,00"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Taxa Alfandegária (%)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                            placeholder="0,00"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            IVA (%)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                            placeholder="16,00"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                      >
                        Processar Despacho
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Pré-visualização e Ações */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  📋 Resumo do Despacho
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-medium text-gray-900">
                      DESPACHO ADUANEIRO
                    </p>
                    <p className="text-xs text-gray-600">
                      Nº: <strong>DAU-2024-00158</strong>
                    </p>
                    <p className="text-xs text-gray-600">
                      Status:{" "}
                      <span className="text-blue-600">
                        Em processamento
                      </span>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Valor Aduaneiro:
                      </span>
                      <span className="font-medium text-gray-950">
                        - USD
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Direitos:</span>
                      <span className="font-medium text-gray-950">
                        - MT
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">IVA:</span>
                      <span className="font-medium text-gray-950">
                        - MT
                      </span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-2">
                      <span className="text-blue-600">Total:</span>
                      <span className="text-blue-600">- MT</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  ⚡ Ações Rápidas
                </h4>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    🧮 Calcular Tributos
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    📤 Submeter DAU
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    🖨️ Imprimir Documentos
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  ℹ️ Informações
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• DAU deve ser submetido em 48h</p>
                  <p>• Tributos calculados automaticamente</p>
                  <p>• Pagamento obrigatório para liberação</p>
                  <p>• Prazo de liberação: 24-72h</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Consultoria Aduaneira */}
        {activeAduanaProcess === "consultoria" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900">
                    💼 Consultoria Aduaneira
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    {/* Dados da Consultoria */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        📝 Solicitação de Consultoria
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Empresa *
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-950">
                            <option value="">Selecione a empresa</option>
                            <option value="cimentos">
                              Cimentos de Moçambique
                            </option>
                            <option value="mozal">Mozal</option>
                            <option value="joao-ferreira">
                              Grupo João Ferreira
                            </option>
                            <option value="cervejas">
                              Cervejas de Moçambique
                            </option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tipo de Consultoria *
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-950">
                            <option value="">Selecione</option>
                            <option value="tributaria">Tributária</option>
                            <option value="classificacao">
                              Classificação Fiscal
                            </option>
                            <option value="legislacao">
                              Legislação Aduaneira
                            </option>
                            <option value="processos">
                              Otimização de Processos
                            </option>
                            <option value="outro">Outro</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Detalhes da Consultoria */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        📋 Detalhes da Consulta
                      </h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Descrição Detalhada *
                        </label>
                        <textarea
                          rows={6}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-950"
                          placeholder="Descreva em detalhes a sua consulta ou problema aduaneiro..."
                        />
                      </div>
                    </div>

                    {/* Documentos Anexos */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        📎 Documentos Anexos
                      </h4>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <div className="text-indigo-500 text-2xl mb-2">
                          📎
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Arraste documentos ou clique para fazer upload
                        </p>
                        <button
                          type="button"
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm"
                        >
                          Selecionar Arquivos
                        </button>
                        <p className="text-xs text-gray-500 mt-2">
                          PDF, DOC, XLS até 10MB cada
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                      >
                        Solicitar Consultoria
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Pré-visualização e Ações */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  📋 Resumo da Consultoria
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-medium text-gray-900">
                      CONSULTORIA ADUANEIRA
                    </p>
                    <p className="text-xs text-gray-600">
                      Nº: <strong>CON-2024-00158</strong>
                    </p>
                    <p className="text-xs text-gray-600">
                      Status:{" "}
                      <span className="text-orange-600">
                        Aguardando análise
                      </span>
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Empresa:</span>
                    <p className="font-medium text-gray-950">-</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Tipo:</span>
                    <p className="font-medium text-gray-950">-</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Prioridade:</span>
                    <p className="font-medium text-gray-950">Normal</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  ⚡ Ações Rápidas
                </h4>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    💾 Guardar Rascunho
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    📧 Enviar para Análise
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    🕒 Agendar Reunião
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  ℹ️ Informações
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Resposta em 24-48 horas úteis</p>
                  <p>• Consultores especializados disponíveis</p>
                  <p>• Análise personalizada para cada caso</p>
                  <p>• Confidencialidade garantida</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rastreio de Processos */}
        {activeAduanaProcess === "rastreio" && (
          <div className="space-y-6">
            {/* Filtros de Pesquisa */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                🔍 Rastreio de Processos Aduaneiros
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                  placeholder="Número do Processo"
                />
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                  <option value="">Todos os Tipos</option>
                  <option value="importacao">Importação</option>
                  <option value="exportacao">Exportação</option>
                  <option value="transito">Trânsito</option>
                  <option value="despacho">Despacho</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                  <option value="">Todos os Status</option>
                  <option value="pendente">Pendente</option>
                  <option value="processando">Em Processamento</option>
                  <option value="aprovado">Aprovado</option>
                  <option value="concluido">Concluído</option>
                  <option value="cancelado">Cancelado</option>
                </select>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                  Pesquisar
                </button>
              </div>
            </div>

            {/* Lista de Processos */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900">
                  📋 Processos em Andamento
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {/* Processo 1 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                        IMP
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          IMP-2024-00155
                        </p>
                        <p className="text-sm text-gray-600">
                          Cimentos de Moçambique
                        </p>
                        <p className="text-xs text-gray-500">
                          Porto de Maputo • 15/01/2024
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Status</p>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Em Despacho
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Valor</p>
                      <p className="font-bold text-gray-900">25.000 USD</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Detalhes
                      </button>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Rastrear
                      </button>
                    </div>
                  </div>

                  {/* Processo 2 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                        EXP
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          EXP-2024-00156
                        </p>
                        <p className="text-sm text-gray-600">Mozal</p>
                        <p className="text-xs text-gray-500">
                          Porto da Beira • 16/01/2024
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Status</p>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Concluído
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Valor</p>
                      <p className="font-bold text-gray-900">18.500 USD</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Detalhes
                      </button>
                      <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                        Recibo
                      </button>
                    </div>
                  </div>

                  {/* Processo 3 */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                        TRA
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          TRA-2024-00157
                        </p>
                        <p className="text-sm text-gray-600">
                          Grupo João Ferreira
                        </p>
                        <p className="text-xs text-gray-500">
                          Maputo → Zimbabwe • 17/01/2024
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Status</p>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Em Trânsito
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Valor</p>
                      <p className="font-bold text-gray-900">12.300 USD</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Detalhes
                      </button>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Rastrear
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Em Andamento
                    </p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">⏳</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Concluídos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <span className="text-green-600 text-xl">✅</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Pendentes
                    </p>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <span className="text-orange-600 text-xl">⚠️</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Valor Total
                    </p>
                    <p className="text-2xl font-bold text-gray-900">285K</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">💰</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Seção de Gráficos */}
        {activeAduanaProcess === "graficos" && (
          <div className="space-y-6 text-gray-950">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                    📊
                  </span>
                  Dashboard de Despachos Aduaneiros - Métricas e
                  Estatísticas
                </h3>
              </div>
              <div className="p-6">
                {/* Grid de Gráficos Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Status dos Processos */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-blue-500 mr-2">📋</span>
                      Status dos Processos Aduaneiros
                    </h4>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center w-full">
                        <div className="flex justify-center mb-4">
                          <div className="relative w-32 h-32">
                            <div
                              className="w-full h-full rounded-full"
                              style={{
                                background:
                                  "conic-gradient(#10b981 0% 45%, #3b82f6 45% 70%, #f59e0b 70% 85%, #ef4444 85% 100%)",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                            <span>Concluídos (45%) - 24 processos</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                            <span>Em Andamento (25%) - 8 processos</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                            <span>Pendentes (15%) - 5 processos</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                            <span>Atrasados (15%) - 5 processos</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Processos por Tipo */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-red-500 mr-2">📊</span>
                      Processos por Tipo (Últimos 30 Dias)
                    </h4>

                    <div className="h-64 flex items-end justify-between space-x-3">
                      {[
                        {
                          tipo: "Importação",
                          quantidade: 15,
                          cor: "bg-blue-500",
                        },
                        {
                          tipo: "Exportação",
                          quantidade: 12,
                          cor: "bg-green-500",
                        },
                        {
                          tipo: "Trânsito",
                          quantidade: 8,
                          cor: "bg-purple-500",
                        },
                        {
                          tipo: "Despacho",
                          quantidade: 20,
                          cor: "bg-orange-500",
                        },
                        {
                          tipo: "Consultoria",
                          quantidade: 6,
                          cor: "bg-cyan-500",
                        },
                      ].map((item, index) => {
                        const maxProcessos = 25;
                        const percentual =
                          (item.quantidade / maxProcessos) * 100;

                        const pico =
                          item.quantidade >= 20
                            ? "alto"
                            : item.quantidade >= 10
                            ? "médio"
                            : "baixo";

                        return (
                          <div
                            key={index}
                            className="flex flex-col items-center flex-1 h-full"
                          >
                            <div className="flex flex-col justify-end h-full w-3/4 rounded-t-lg overflow-hidden">
                              <div
                                className={`${item.cor} transition-all hover:opacity-80`}
                                style={{ height: `${percentual}%` }}
                                title={`${item.tipo}: ${item.quantidade} processos`}
                              ></div>
                            </div>

                            <span className="text-xs mt-2 font-medium text-center">
                              {item.tipo}
                            </span>
                            <span
                              className={`text-xs ${
                                pico === "alto"
                                  ? "text-green-600 font-semibold"
                                  : pico === "médio"
                                  ? "text-amber-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {item.quantidade}{" "}
                              {item.quantidade === 1
                                ? "proc."
                                : "processos"}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap justify-center space-x-4 mt-4 text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
                        <span>Importação</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
                        <span>Exportação</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded mr-1"></div>
                        <span>Trânsito</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-orange-500 rounded mr-1"></div>
                        <span>Despacho</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-cyan-500 rounded mr-1"></div>
                        <span>Consultoria</span>
                      </div>
                    </div>

                    <div className="text-center mt-4 text-sm text-gray-600">
                      Tipo com maior volume:{" "}
                      <span className="font-semibold text-orange-600">
                        Despacho
                      </span>{" "}
                      ({"20 processos"})
                    </div>
                  </div>
                </div>

                {/* Segunda Linha de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {/* Gráfico de Tempo Médio de Processamento */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-purple-500 mr-2">⏱️</span>
                      Tempo Médio de Processamento (dias)
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            processo: "Importação",
                            tempo: 5.2,
                            meta: 4,
                            color: "bg-blue-500",
                            icon: "📥",
                          },
                          {
                            processo: "Exportação",
                            tempo: 3.8,
                            meta: 3,
                            color: "bg-green-500",
                            icon: "📤",
                          },
                          {
                            processo: "Trânsito",
                            tempo: 2.5,
                            meta: 2,
                            color: "bg-purple-500",
                            icon: "🚛",
                          },
                          {
                            processo: "Despacho",
                            tempo: 1.8,
                            meta: 1,
                            color: "bg-orange-500",
                            icon: "📋",
                          },
                          {
                            processo: "Consultoria",
                            tempo: 2.2,
                            meta: 2,
                            color: "bg-cyan-500",
                            icon: "💼",
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
                                  {item.processo}
                                </span>
                                <span className="text-sm font-bold text-gray-700 ml-2 whitespace-nowrap flex-shrink-0">
                                  {item.tempo} dias
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${item.color}`}
                                  style={{
                                    width: `${(item.tempo / 8) * 100}%`,
                                  }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1 flex justify-between">
                                <span>Meta: {item.meta} dias</span>
                                <span
                                  className={`font-medium ${
                                    item.tempo <= item.meta
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {item.tempo <= item.meta ? "✓" : "✗"}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Valor por Tipo de Processo */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-green-500 mr-2">💰</span>
                      Valor Médio por Processo (USD)
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            tipo: "Importação",
                            valor: 28500,
                            meta: 30000,
                            cor: "bg-blue-500",
                            clientes: 15,
                          },
                          {
                            tipo: "Exportação",
                            valor: 18500,
                            meta: 20000,
                            cor: "bg-green-500",
                            clientes: 12,
                          },
                          {
                            tipo: "Trânsito",
                            valor: 12300,
                            meta: 15000,
                            cor: "bg-cyan-500",
                            clientes: 8,
                          },
                          {
                            tipo: "Despacho",
                            valor: 8500,
                            meta: 10000,
                            cor: "bg-purple-500",
                            clientes: 20,
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
                                  {item.tipo}
                                </span>
                                <span className="text-sm font-bold text-gray-700 ml-2 whitespace-nowrap flex-shrink-0">
                                  ${item.valor.toLocaleString()}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${item.cor}`}
                                  style={{
                                    width: `${(item.valor / 40000) * 100}%`,
                                  }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1 flex justify-between">
                                <span>{item.clientes} processos</span>
                                <span
                                  className={`font-medium ${
                                    item.valor >= item.meta
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {item.valor >= item.meta ? "✓" : "✗"}{" "}
                                  Meta: ${item.meta.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Incidentes por Tipo */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-amber-500 mr-2 text-lg">
                        ⚠️
                      </span>
                      Incidentes por Tipo (Últimos 7 Dias)
                    </h4>

                    <div className="h-48 space-y-4 overflow-y-auto pr-1">
                      {[
                        {
                          tipo: "Documentação Incompleta",
                          quantidade: 8,
                          cor: "bg-yellow-500",
                          tendencia: "+2",
                        },
                        {
                          tipo: "Atrasos Alfandegários",
                          quantidade: 6,
                          cor: "bg-orange-500",
                          tendencia: "-1",
                        },
                        {
                          tipo: "Problemas de Classificação",
                          quantidade: 4,
                          cor: "bg-red-500",
                          tendencia: "+1",
                        },
                        {
                          tipo: "Falta de Pagamento",
                          quantidade: 3,
                          cor: "bg-purple-500",
                          tendencia: "0",
                        },
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-medium text-gray-800">
                              {item.tipo}
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-gray-700">
                                {item.quantidade}
                              </span>
                              <span
                                className={`text-xs font-semibold ${
                                  item.tendencia === "0"
                                    ? "text-gray-500"
                                    : item.tendencia.startsWith("+")
                                    ? "text-red-600"
                                    : "text-green-600"
                                }`}
                              >
                                {item.tendencia !== "0"
                                  ? item.tendencia
                                  : "•"}
                              </span>
                            </div>
                          </div>

                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full ${item.cor} transition-all duration-500`}
                              style={{
                                width: `${(item.quantidade / 10) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Métricas Rápidas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">
                      Processos Totais
                    </p>
                    <p className="text-2xl font-bold text-gray-900">42</p>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                    <p className="text-sm text-cyan-600 font-medium">
                      Tempo Médio
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      3.1 dias
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600 font-medium">
                      Taxa de Sucesso
                    </p>
                    <p className="text-2xl font-bold text-gray-900">89%</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <p className="text-sm text-amber-600 font-medium">
                      Valor Total
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      285K USD
                    </p>
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
                        <option>Últimos 7 dias</option>
                        <option>Últimos 30 dias</option>
                        <option>Este Trimestre</option>
                        <option>Personalizado</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Processo
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos</option>
                        <option>Importação</option>
                        <option>Exportação</option>
                        <option>Trânsito</option>
                        <option>Despacho</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos</option>
                        <option>Concluído</option>
                        <option>Em Andamento</option>
                        <option>Pendente</option>
                        <option>Atrasado</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cliente
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos</option>
                        <option>Cimentos de Moçambique</option>
                        <option>Mozal</option>
                        <option>Grupo João Ferreira</option>
                        <option>Cervejas de Moçambique</option>
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

export default DespachoAduaneiro;