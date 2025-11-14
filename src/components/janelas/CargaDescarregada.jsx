import React, { useState } from 'react';

const CargaDescarregada = () => {
  const [activeDescarregadaForm, setActiveDescarregadaForm] = useState("registro");

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            📦
          </span>
          Carga Descarregada - Registro de Cargas Descarregadas
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Registro, confirmação e gestão de cargas finalizadas e
          descarregadas
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação entre Formulários */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveDescarregadaForm("registro")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeDescarregadaForm === "registro"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ✅ Registro
          </button>
          <button
            onClick={() => setActiveDescarregadaForm("conferencia")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeDescarregadaForm === "conferencia"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🔍 Conferência
          </button>
          <button
            onClick={() => setActiveDescarregadaForm("documentos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeDescarregadaForm === "documentos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📑 Documentos
          </button>
          <button
            onClick={() => setActiveDescarregadaForm("graficos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeDescarregadaForm === "graficos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Gráficos
          </button>
          <button
            onClick={() => setActiveDescarregadaForm("relatorios")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeDescarregadaForm === "relatorios"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Relatórios
          </button>
        </div>

        {/* Registro de Descarregamento */}
        {activeDescarregadaForm === "registro" && (
          <div className="space-y-6">
            {/* Métricas Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Descarregadas Hoje
                    </p>
                    <p className="text-2xl font-bold text-gray-900">15</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">✅</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    +3 vs ontem
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Aguardando Conferência
                    </p>
                    <p className="text-2xl font-bold text-gray-900">4</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">⏳</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    Necessitam ação
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Com Divergências
                    </p>
                    <p className="text-2xl font-bold text-gray-900">2</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">⚠️</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    Resolução pendente
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Taxa de Sucesso
                    </p>
                    <p className="text-2xl font-bold text-gray-900">92%</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-blue-600 text-xl">📊</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm font-medium">
                    Acima da meta
                  </span>
                </div>
              </div>
            </div>

            {/* Grid Principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Formulário de Registro */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4 border-b border-gray-200 bg-lime-50">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <span className="bg-lime-500 text-white p-2 rounded-lg mr-2">
                        ✅
                      </span>
                      Registro de Descarregamento
                    </h3>
                  </div>
                  <div className="p-6">
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Carga a Descarregar *
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 text-gray-950">
                            <option value="">Selecione a carga</option>
                            <option value="CRG-001">
                              CRG-001 - Maputo → Nampula
                            </option>
                            <option value="CRG-015">
                              CRG-015 - Porto → Matola
                            </option>
                            <option value="CRG-028">
                              CRG-028 - Beira → Chimoio
                            </option>
                            <option value="CRG-042">
                              CRG-042 - Maputo → Marracuene
                            </option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Local de Descarregamento *
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 text-gray-950"
                            placeholder="Endereço completo"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Data/Hora Início *
                          </label>
                          <input
                            type="datetime-local"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 text-gray-950"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Data/Hora Término *
                          </label>
                          <input
                            type="datetime-local"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 text-gray-950"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tempo Total (min)
                          </label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 text-gray-950"
                            placeholder="0"
                          />
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <h4 className="font-semibold text-gray-900 mb-4">
                          Condições da Carga no Descarregamento
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <input type="checkbox" className="mr-3" />
                            <label className="text-sm text-gray-700">
                              Embalagem íntegra
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="mr-3" />
                            <label className="text-sm text-gray-700">
                              Lacres intactos
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="mr-3" />
                            <label className="text-sm text-gray-700">
                              Peso conforme
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="mr-3" />
                            <label className="text-sm text-gray-700">
                              Quantidade correta
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="mr-3" />
                            <label className="text-sm text-gray-700">
                              Temperatura adequada
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="mr-3" />
                            <label className="text-sm text-gray-700">
                              Sem avarias
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Responsável pelo Recebimento
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 text-gray-950"
                            placeholder="Nome do responsável"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Documento do Responsável
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 text-gray-950"
                            placeholder="BI ou outro documento"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Observações do Descarregamento
                        </label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 text-gray-950"
                          placeholder="Observações sobre o descarregamento..."
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
                          Finalizar Descarregamento
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Painel de Informações */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Informações da Carga
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-600">Código:</span>
                      <p className="font-medium text-gray-950">CRG-001</p>
                    </div>
                    <div>
                      <span className="text-gray-600">
                        Origem → Destino:
                      </span>
                      <p className="font-medium text-gray-950">
                        Maputo → Nampula
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Tipo de Carga:</span>
                      <p className="font-medium text-gray-950">
                        Cimento • 25 ton
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Cliente:</span>
                      <p className="font-medium text-gray-950">
                        Construma Lda
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Motorista:</span>
                      <p className="font-medium text-gray-950">
                        João Maputo
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Próximos Descarregamentos
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm font-medium text-gray-950">
                        CRG-015
                      </p>
                      <p className="text-xs text-gray-600">
                        Chegada: 14:30 • Matola
                      </p>
                      <p className="text-xs text-blue-600 font-medium">
                        Produtos Alimentares
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm font-medium text-gray-950">
                        CRG-028
                      </p>
                      <p className="text-xs text-gray-600">
                        Chegada: 16:00 • Chimoio
                      </p>
                      <p className="text-xs text-blue-600 font-medium">
                        Material Construção
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Conferência de Carga */}
        {activeDescarregadaForm === "conferencia" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-blue-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                  🔍
                </span>
                Conferência de Carga Descarregada
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Carga Descarregada
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                    <option value="">Selecione a carga</option>
                    <option value="CRG-001">
                      CRG-001 - Descarregada Hoje 09:45
                    </option>
                    <option value="CRG-042">
                      CRG-042 - Descarregada Hoje 08:30
                    </option>
                    <option value="CRG-056">
                      CRG-056 - Descarregada Ontem 16:20
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Conferente Responsável
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                    placeholder="Nome do conferente"
                  />
                </div>
              </div>

              {/* Checklist de Conferência */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Conferência de Quantidades
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantidade Prevista
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                        value="100"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantidade Recebida
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Diferença
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                        value="0"
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Conferência de Qualidade
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <label className="text-sm text-gray-700">
                        Embalagem intacta
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <label className="text-sm text-gray-700">
                        Produto em bom estado
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <label className="text-sm text-gray-700">
                        Data de validade OK
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <label className="text-sm text-gray-700">
                        Lote correto
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <label className="text-sm text-gray-700">
                        Temperatura adequada
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <label className="text-sm text-gray-700">
                        Documentação completa
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Divergências Identificadas
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <label className="text-sm text-gray-700">
                        Quantidade divergente
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <label className="text-sm text-gray-700">
                        Produto avariado
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <label className="text-sm text-gray-700">
                        Embalagem danificada
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <label className="text-sm text-gray-700">
                        Lote incorreto
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <label className="text-sm text-gray-700">
                        Data de validade vencida
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observações da Conferência
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                    placeholder="Descreva as observações da conferência..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                    Reprovar Conferência
                  </button>
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                    Aprovar Conferência
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Documentos do Descarregamento */}
        {activeDescarregadaForm === "documentos" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-green-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-green-500 text-white p-2 rounded-lg mr-2">
                  📑
                </span>
                Documentos do Descarregamento
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Carga Descarregada
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                    <option value="">Selecione a carga</option>
                    <option value="CRG-001">
                      CRG-001 - Descarregada Hoje
                    </option>
                    <option value="CRG-042">
                      CRG-042 - Descarregada Hoje
                    </option>
                    <option value="CRG-056">
                      CRG-056 - Descarregada Ontem
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Documento
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                    <option value="todos">Todos os Documentos</option>
                    <option value="comprovante">
                      Comprovante de Entrega
                    </option>
                    <option value="conferencia">
                      Relatório de Conferência
                    </option>
                    <option value="fotos">Fotos do Descarregamento</option>
                    <option value="avaria">Relatório de Avarias</option>
                  </select>
                </div>
              </div>

              {/* Lista de Documentos */}
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-500 text-white p-2 rounded-lg">
                        📄
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          Comprovante de Entrega - CRG-001
                        </p>
                        <p className="text-sm text-gray-600">
                          Assinado: Maria Silva • Emitido: 15/01/2024 09:50
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-lime-600">
                        Visualizar
                      </button>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Download
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-500 text-white p-2 rounded-lg">
                        ✅
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          Relatório de Conferência - CRG-001
                        </p>
                        <p className="text-sm text-gray-600">
                          Aprovado • Conferente: Carlos Santos
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                        Visualizar
                      </button>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Download
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-500 text-white p-2 rounded-lg">
                        📷
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          Fotos do Descarregamento - CRG-001
                        </p>
                        <p className="text-sm text-gray-600">
                          12 fotos • Tiradas: 15/01/2024 09:45
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                        Visualizar
                      </button>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload de Novos Documentos */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Adicionar Novo Documento
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Documento
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                      <option>Comprovante de Entrega</option>
                      <option>Relatório de Conferência</option>
                      <option>Fotos</option>
                      <option>Relatório de Avarias</option>
                      <option>Outro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Arquivo
                    </label>
                    <input
                      type="file"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    />
                  </div>
                </div>
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                  Upload Documento
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Gráficos */}
        {activeDescarregadaForm === "graficos" && (
          <div className="space-y-6 text-gray-950">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                    📊
                  </span>
                  Dashboard de Cargas Descarregadas - Métricas e
                  Estatísticas
                </h3>
              </div>
              <div className="p-6">
                {/* Grid de Gráficos Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Status das Cargas Descarregadas */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-green-500 mr-2">✅</span>
                      Status das Cargas Descarregadas
                    </h4>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center w-full">
                        <div className="flex justify-center mb-4">
                          <div className="relative w-32 h-32">
                            <div
                              className="w-full h-full rounded-full"
                              style={{
                                background:
                                  "conic-gradient(#10b981 0% 75%, #3b82f6 75% 90%, #f59e0b 90% 95%, #ef4444 95% 100%)",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                            <span>
                              Conferência Aprovada (75%) - 45 cargas
                            </span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                            <span>
                              Aguardando Conferência (15%) - 9 cargas
                            </span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                            <span>Com Divergências (5%) - 3 cargas</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                            <span>Rejeitadas (5%) - 3 cargas</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Descarregamentos por Dia da Semana - Barras Empilhadas */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-purple-500 mr-2">📅</span>
                      Descarregamentos por Dia (Últimas 4 Semanas)
                    </h4>

                    <div className="h-64 flex items-end justify-between space-x-2">
                      {[
                        {
                          day: "Seg",
                          semana1: 8,
                          semana2: 12,
                          semana3: 10,
                          semana4: 14,
                        },
                        {
                          day: "Ter",
                          semana1: 10,
                          semana2: 8,
                          semana3: 12,
                          semana4: 11,
                        },
                        {
                          day: "Qua",
                          semana1: 12,
                          semana2: 15,
                          semana3: 14,
                          semana4: 13,
                        },
                        {
                          day: "Qui",
                          semana1: 15,
                          semana2: 18,
                          semana3: 16,
                          semana4: 17,
                        },
                        {
                          day: "Sex",
                          semana1: 20,
                          semana2: 22,
                          semana3: 18,
                          semana4: 21,
                        },
                        {
                          day: "Sáb",
                          semana1: 5,
                          semana2: 8,
                          semana3: 6,
                          semana4: 7,
                        },
                        {
                          day: "Dom",
                          semana1: 2,
                          semana2: 3,
                          semana3: 4,
                          semana4: 3,
                        },
                      ].map((item, index) => {
                        const total =
                          item.semana1 +
                          item.semana2 +
                          item.semana3 +
                          item.semana4;
                        return (
                          <div
                            key={index}
                            className="flex flex-col items-center flex-1 h-full"
                          >
                            <div className="flex flex-col justify-end h-full w-3/4 rounded-t-lg overflow-hidden">
                              {/* Semana 4 */}
                              <div
                                className="bg-purple-500 w-full transition-all hover:opacity-80"
                                style={{
                                  height: `${
                                    (item.semana4 / total) * 100
                                  }%`,
                                }}
                                title={`Semana 4: ${item.semana4} descarregamentos`}
                              ></div>
                              {/* Semana 3 */}
                              <div
                                className="bg-green-500 w-full transition-all hover:opacity-80"
                                style={{
                                  height: `${
                                    (item.semana3 / total) * 100
                                  }%`,
                                }}
                                title={`Semana 3: ${item.semana3} descarregamentos`}
                              ></div>
                              {/* Semana 2 */}
                              <div
                                className="bg-blue-500 w-full transition-all hover:opacity-80"
                                style={{
                                  height: `${
                                    (item.semana2 / total) * 100
                                  }%`,
                                }}
                                title={`Semana 2: ${item.semana2} descarregamentos`}
                              ></div>
                              {/* Semana 1 */}
                              <div
                                className="bg-blue-400 w-full transition-all hover:opacity-80"
                                style={{
                                  height: `${
                                    (item.semana1 / total) * 100
                                  }%`,
                                }}
                                title={`Semana 1: ${item.semana1} descarregamentos`}
                              ></div>
                            </div>
                            <span className="text-xs mt-2 font-medium">
                              {item.day}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Legenda */}
                    <div className="flex justify-center space-x-4 mt-4 text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded mr-1"></div>
                        <span>Esta Semana</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
                        <span>Semana 3</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
                        <span>Semana 2</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-400 rounded mr-1"></div>
                        <span>Semana 1</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Segunda Linha de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {/* Gráfico de Tempos de Descarregamento */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-orange-500 mr-2">⏱️</span>
                      Tempo Médio de Descarregamento (minutos)
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            tipo: "Contentor 40ft",
                            tempo: 45,
                            meta: 40,
                            cor: "bg-blue-500",
                            icon: "📦",
                            porcentagem: 37.5,
                          },
                          {
                            tipo: "Carga Fracionada",
                            tempo: 25,
                            meta: 30,
                            cor: "bg-green-500",
                            icon: "📋",
                            porcentagem: 20.8,
                          },
                          {
                            tipo: "Perecível (Reefer)",
                            tempo: 35,
                            meta: 35,
                            cor: "bg-cyan-500",
                            icon: "❄️",
                            porcentagem: 29.2,
                          },
                          {
                            tipo: "Material Construção",
                            tempo: 60,
                            meta: 55,
                            cor: "bg-orange-500",
                            icon: "🏗️",
                            porcentagem: 50.0,
                          },
                          {
                            tipo: "Granel",
                            tempo: 90,
                            meta: 85,
                            cor: "bg-gray-500",
                            icon: "⚫",
                            porcentagem: 75.0,
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
                                  {item.tempo} min
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${item.cor}`}
                                  style={{ width: `${item.porcentagem}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1 flex justify-between">
                                <span>Meta: {item.meta} min</span>
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

                  {/* Gráfico de Divergências por Cliente */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-red-500 mr-2">⚠️</span>
                      Taxa de Divergências por Cliente
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            cliente: "Construma Lda",
                            total: 28,
                            divergencias: 2,
                            cor: "bg-blue-500",
                            taxa: 7.1,
                          },
                          {
                            cliente: "Supermercados Nosso",
                            total: 45,
                            divergencias: 1,
                            cor: "bg-green-500",
                            taxa: 2.2,
                          },
                          {
                            cliente: "Indústrias Moçambique",
                            total: 32,
                            divergencias: 5,
                            cor: "bg-cyan-500",
                            taxa: 15.6,
                          },
                          {
                            cliente: "Distribuidora Norte",
                            total: 18,
                            divergencias: 3,
                            cor: "bg-purple-500",
                            taxa: 16.7,
                          },
                          {
                            cliente: "Comércio Geral",
                            total: 25,
                            divergencias: 0,
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
                                  {item.divergencias} de {item.total} cargas
                                </span>
                                <span
                                  className={`font-medium ${
                                    item.taxa <= 5
                                      ? "text-green-600"
                                      : item.taxa <= 10
                                      ? "text-yellow-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {item.taxa <= 5
                                    ? "Excelente"
                                    : item.taxa <= 10
                                    ? "Aceitável"
                                    : "Crítico"}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Avaliação de Satisfação */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-amber-500 mr-2">⭐</span>
                      Avaliação de Satisfação
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            nota: "⭐️⭐️⭐️⭐️⭐️",
                            quantidade: 42,
                            porcentagem: 70,
                            cor: "bg-green-500",
                            tendencia: "+5%",
                          },
                          {
                            nota: "⭐️⭐️⭐️⭐️",
                            quantidade: 12,
                            porcentagem: 20,
                            cor: "bg-blue-500",
                            tendencia: "-2%",
                          },
                          {
                            nota: "⭐️⭐️⭐️",
                            quantidade: 4,
                            porcentagem: 7,
                            cor: "bg-yellow-500",
                            tendencia: "+1%",
                          },
                          {
                            nota: "⭐️⭐️",
                            quantidade: 1,
                            porcentagem: 2,
                            cor: "bg-orange-500",
                            tendencia: "-1%",
                          },
                          {
                            nota: "⭐️",
                            quantidade: 1,
                            porcentagem: 2,
                            cor: "bg-red-500",
                            tendencia: "0%",
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
                                  {item.nota}
                                </span>
                                <span className="text-sm font-bold text-gray-700 ml-2 whitespace-nowrap flex-shrink-0">
                                  {item.porcentagem}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${item.cor}`}
                                  style={{ width: `${item.porcentagem}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1 flex justify-between">
                                <span>{item.quantidade} avaliações</span>
                                <span
                                  className={`font-medium ${
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
                      Total Descarregado
                    </p>
                    <p className="text-2xl font-bold text-gray-900">156</p>
                    <p className="text-xs text-green-600 mt-1">
                      +12% este mês
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">
                      Tempo Médio
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      38 min
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      -5 min vs meta
                    </p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <p className="text-sm text-amber-600 font-medium">
                      Taxa Sucesso
                    </p>
                    <p className="text-2xl font-bold text-gray-900">94%</p>
                    <p className="text-xs text-amber-600 mt-1">
                      +2% acima da meta
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-600 font-medium">
                      Satisfação
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      4.7/5
                    </p>
                    <p className="text-xs text-purple-600 mt-1">
                      70% 5 estrelas
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
                        <option>Este Mês</option>
                        <option>Trimestre Atual</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status Conferência
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos</option>
                        <option>Aprovado</option>
                        <option>Aguardando Conferência</option>
                        <option>Com Divergências</option>
                        <option>Rejeitado</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cliente
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos os Clientes</option>
                        <option>Construma Lda</option>
                        <option>Supermercados Nosso</option>
                        <option>Indústrias Moçambique</option>
                        <option>Distribuidora Norte</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Carga
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos os Tipos</option>
                        <option>Contentor</option>
                        <option>Fracionada</option>
                        <option>Perecível</option>
                        <option>Material Construção</option>
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

        {/* Relatórios de Descarregamento */}
        {activeDescarregadaForm === "relatorios" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-purple-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-purple-500 text-white p-2 rounded-lg mr-2">
                  📈
                </span>
                Relatórios de Descarregamento
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-blue-600 text-lg mb-2">📊</div>
                  <p className="font-medium text-gray-900">
                    Relatório Diário
                  </p>
                  <p className="text-sm text-gray-600">
                    Descarregamentos do dia
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-green-600 text-lg mb-2">✅</div>
                  <p className="font-medium text-gray-900">Conferências</p>
                  <p className="text-sm text-gray-600">
                    Resultados das conferências
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-orange-600 text-lg mb-2">⏱️</div>
                  <p className="font-medium text-gray-900">Tempos</p>
                  <p className="text-sm text-gray-600">
                    Eficiência do descarregamento
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-red-600 text-lg mb-2">⚠️</div>
                  <p className="font-medium text-gray-900">Divergências</p>
                  <p className="text-sm text-gray-600">
                    Relatório de problemas
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
                      <option>Relatório de Eficiência</option>
                      <option>Descarregamentos por Cliente</option>
                      <option>Tempos Médios de Descarregamento</option>
                      <option>Divergências e Avarias</option>
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
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
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

export default CargaDescarregada;