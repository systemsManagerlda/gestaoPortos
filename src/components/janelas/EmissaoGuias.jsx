import React, { useState } from 'react';

const EmissaoGuias = () => {
  const [activeDocumentType, setActiveDocumentType] = useState("cotacao");
  const [activeEmissaoGuias, setActiveEmissaoGuias] = useState("nova");

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            📋
          </span>
          Emissão de Documentos Fiscais
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Emissão e gestão de cotações, facturas, notas de crédito e débito,
          recibos e guias de transporte
        </p>
      </div>

      {/* Menu de Tipos de Documento */}
      <div className="flex space-x-2 p-4 border-b border-gray-200 bg-white overflow-x-auto">
        <button
          onClick={() => setActiveDocumentType("cotacao")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
            activeDocumentType === "cotacao"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          💰 Cotação
        </button>
        <button
          onClick={() => setActiveDocumentType("factura")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
            activeDocumentType === "factura"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          🧾 Factura
        </button>
        <button
          onClick={() => setActiveDocumentType("nota-credito")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
            activeDocumentType === "nota-credito"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          📈 Nota de Crédito
        </button>
        <button
          onClick={() => setActiveDocumentType("nota-debito")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
            activeDocumentType === "nota-debito"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          📉 Nota de Débito
        </button>
        <button
          onClick={() => setActiveDocumentType("recibo")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
            activeDocumentType === "recibo"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          🧾 Recibo
        </button>
        <button
          onClick={() => setActiveDocumentType("guia-transporte")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
            activeDocumentType === "guia-transporte"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          🚚 Guia Transporte
        </button>
        <button
          onClick={() => setActiveDocumentType("graficos")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
            activeDocumentType === "graficos"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          📊 Gráficos
        </button>
      </div>

      <div className="flex-1 p-6">
        {/* Emissão de Cotação */}
        {activeDocumentType === "cotacao" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900">
                    💰 Nova Cotação
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cliente *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                          <option value="">Selecione o cliente</option>
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
                          Validade (dias) *
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="30"
                        />
                      </div>
                    </div>

                    {/* Itens da Cotação */}
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        📦 Itens da Cotação
                      </h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="col-span-5">
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                              placeholder="Descrição do serviço"
                            />
                          </div>
                          <div className="col-span-2">
                            <input
                              type="number"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                              placeholder="Quantidade"
                            />
                          </div>
                          <div className="col-span-2">
                            <input
                              type="number"
                              step="0.01"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                              placeholder="Preço unit."
                            />
                          </div>
                          <div className="col-span-2">
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-950"
                              placeholder="Total"
                              readOnly
                            />
                          </div>
                          <div className="col-span-1 flex items-center">
                            <button
                              type="button"
                              className="text-red-500 hover:text-red-700"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm"
                      >
                        + Adicionar Item
                      </button>
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
                        Gerar Cotação
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Pré-visualização da Cotação */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  📄 Pré-visualização
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-medium text-gray-900">COTAÇÃO</p>
                    <p className="text-xs text-gray-600">
                      Nº: <strong>COT-2024-00158</strong>
                    </p>
                    <p className="text-xs text-gray-600">Validade: 30 dias</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Cliente:</span>
                    <p className="font-medium text-gray-950">-</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Estimado:</span>
                    <p className="font-medium text-gray-950">- MT</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  ⚡ Ações Rápidas
                </h4>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    📥 Guardar Rascunho
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    🖨️ Imprimir Cotação
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    📧 Enviar por Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emissão de Factura */}
        {activeDocumentType === "factura" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900">
                    🧾 Nova Factura (FAT)
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cliente *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                          <option value="">Selecione o cliente</option>
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
                          NUIT do Cliente *
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          placeholder="Número de Identificação Tributária"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data de Emissão *
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data de Vencimento *
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        />
                      </div>
                    </div>

                    {/* Itens da Factura */}
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        📦 Itens da Factura
                      </h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="col-span-4">
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                              placeholder="Descrição do serviço"
                            />
                          </div>
                          <div className="col-span-2">
                            <input
                              type="number"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                              placeholder="Qtd"
                            />
                          </div>
                          <div className="col-span-2">
                            <input
                              type="number"
                              step="0.01"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                              placeholder="Preço"
                            />
                          </div>
                          <div className="col-span-2">
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                              <option>IVA 16%</option>
                              <option>Reduzido 5%</option>
                              <option>Isento</option>
                            </select>
                          </div>
                          <div className="col-span-2">
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-950"
                              placeholder="Total"
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm"
                      >
                        + Adicionar Item
                      </button>
                    </div>

                    {/* Totais */}
                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex justify-end">
                        <div className="w-64 space-y-2 text-gray-950">
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>0,00 MT</span>
                          </div>
                          <div className="flex justify-between">
                            <span>IVA (16%):</span>
                            <span>0,00 MT</span>
                          </div>
                          <div className="flex justify-between font-bold text-lg border-t pt-2">
                            <span>Total:</span>
                            <span>0,00 MT</span>
                          </div>
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
                        Emitir Factura
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Ações da Factura */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  📄 Factura FAT
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-medium text-gray-900">FACTURA</p>
                    <p className="text-xs text-gray-600">
                      Nº: <strong>FAT-2024-00158</strong>
                    </p>
                    <p className="text-xs text-gray-600">
                      Série: <strong>A</strong>
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Cliente:</span>
                    <p className="font-medium text-gray-950">-</p>
                  </div>
                  <div>
                    <span className="text-gray-600">NUIT:</span>
                    <p className="font-medium text-gray-950">-</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Total:</span>
                    <p className="font-medium text-gray-950">- MT</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  ⚡ Ações
                </h4>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    🖨️ Imprimir Factura
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    📧 Enviar por Email
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    💳 Registar Pagamento
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    📄 Emitir Recibo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emissão de Nota de Crédito */}
        {activeDocumentType === "nota-credito" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-green-50">
                  <h3 className="font-semibold text-gray-900">
                    📈 Nota de Crédito
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Factura Original *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950">
                          <option value="">Selecione a factura</option>
                          <option value="fat-001">
                            FAT-2024-00155 - Cimentos MZ
                          </option>
                          <option value="fat-002">
                            FAT-2024-00156 - Mozal
                          </option>
                          <option value="fat-003">
                            FAT-2024-00157 - Grupo JF
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Motivo *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950">
                          <option value="">Selecione o motivo</option>
                          <option value="devolucao">
                            Devolução de Mercadoria
                          </option>
                          <option value="desconto">
                            Desconto Esquecido
                          </option>
                          <option value="erro">Erro na Factura</option>
                          <option value="cancelamento">
                            Cancelamento Parcial
                          </option>
                          <option value="bonificacao">Bonificação</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição do Ajuste
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                        placeholder="Descreva o motivo da nota de crédito..."
                      />
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        💵 Valores do Ajuste
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Valor do Crédito *
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                            placeholder="0,00"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            IVA *
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                            placeholder="0,00"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Total do Crédito
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-950 font-medium"
                            placeholder="0,00 MT"
                            readOnly
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
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                      >
                        Emitir Nota de Crédito
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Informações da Nota de Crédito */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  📄 NC Referência
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="font-medium text-gray-900">
                      NOTA DE CRÉDITO
                    </p>
                    <p className="text-xs text-gray-600">
                      Nº: <strong>NC-2024-00045</strong>
                    </p>
                    <p className="text-xs text-gray-600">
                      Série: <strong>A</strong>
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Factura Original:</span>
                    <p className="font-medium text-gray-950">-</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Valor do Crédito:</span>
                    <p className="font-medium text-gray-950">- MT</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Motivo:</span>
                    <p className="font-medium text-gray-950">-</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  ⚡ Ações
                </h4>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    🖨️ Imprimir NC
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    📧 Enviar por Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emissão de Nota de Débito */}
        {activeDocumentType === "nota-debito" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-orange-50">
                  <h3 className="font-semibold text-gray-900">
                    📉 Nota de Débito
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Factura Original *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950">
                          <option value="">Selecione a factura</option>
                          <option value="fat-001">
                            FAT-2024-00155 - Cimentos MZ
                          </option>
                          <option value="fat-002">
                            FAT-2024-00156 - Mozal
                          </option>
                          <option value="fat-003">
                            FAT-2024-00157 - Grupo JF
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Motivo *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950">
                          <option value="">Selecione o motivo</option>
                          <option value="juros">Juros de Mora</option>
                          <option value="portes">Portes de Envio</option>
                          <option value="servicos">
                            Serviços Adicionais
                          </option>
                          <option value="erro">Erro na Factura</option>
                          <option value="outros">Outros Acréscimos</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição do Acréscimo
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                        placeholder="Descreva o motivo da nota de débito..."
                      />
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        💵 Valores do Acréscimo
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Valor do Débito *
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
                            IVA *
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
                            Total do Débito
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-950 font-medium"
                            placeholder="0,00 MT"
                            readOnly
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
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                      >
                        Emitir Nota de Débito
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Informações da Nota de Débito */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  📄 ND Referência
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-medium text-gray-900">
                      NOTA DE DÉBITO
                    </p>
                    <p className="text-xs text-gray-600">
                      Nº: <strong>ND-2024-00023</strong>
                    </p>
                    <p className="text-xs text-gray-600">
                      Série: <strong>A</strong>
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Factura Original:</span>
                    <p className="font-medium text-gray-950">-</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Valor do Débito:</span>
                    <p className="font-medium text-gray-950">- MT</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Motivo:</span>
                    <p className="font-medium text-gray-950">-</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  ⚡ Ações
                </h4>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    🖨️ Imprimir ND
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    📧 Enviar por Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emissão de Recibo */}
        {activeDocumentType === "recibo" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-purple-50">
                  <h3 className="font-semibold text-gray-900">🧾 Recibo</h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cliente *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-950">
                          <option value="">Selecione o cliente</option>
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
                          Referência da Factura
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-950">
                          <option value="">Selecione a factura</option>
                          <option value="fat-001">
                            FAT-2024-00155 - Cimentos MZ
                          </option>
                          <option value="fat-002">
                            FAT-2024-00156 - Mozal
                          </option>
                          <option value="fat-003">
                            FAT-2024-00157 - Grupo JF
                          </option>
                          <option value="none">Sem referência</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Valor Recebido *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-950"
                          placeholder="0,00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Forma de Pagamento *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-950">
                          <option value="">Selecione</option>
                          <option value="transferencia">
                            Transferência Bancária
                          </option>
                          <option value="dinheiro">Dinheiro</option>
                          <option value="cheque">Cheque</option>
                          <option value="multicaixa">Multicaixa</option>
                          <option value="mpesa">M-pesa</option>
                          <option value="emola">e-Mola</option>
                          <option value="mkesh">mkesh</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição do Recebimento
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-950"
                        placeholder="Descreva o motivo do recebimento..."
                      />
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
                        Recibo
                      </button>
                      <button
                        type="button"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                      >
                        Recibo Carregamento
                      </button>
                      <button
                        type="button"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                      >
                        Agendamento Importação
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Pré-visualização do Recibo */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  📄 Recibo
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-medium text-gray-900">RECIBO</p>
                    <p className="text-xs text-gray-600">
                      Nº: <strong>REC-2024-00345</strong>
                    </p>
                    <p className="text-xs text-gray-600">
                      Data: {new Date().toLocaleDateString("pt-MZ")}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Cliente:</span>
                    <p className="font-medium text-gray-950">-</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Valor Recebido:</span>
                    <p className="font-medium text-gray-950">- MT</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Forma de Pagamento:</span>
                    <p className="font-medium text-gray-950">-</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Referência:</span>
                    <p className="font-medium text-gray-950">-</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  ⚡ Ações
                </h4>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    🖨️ Imprimir Recibo
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    📧 Enviar por Email
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                    💾 Guardar PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emissão de Guia de Transporte */}
        {activeDocumentType === "guia-transporte" && (
          <div>
            {/* Menu de Navegação para Guias */}
            <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
              <button
                onClick={() => setActiveEmissaoGuias("nova")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeEmissaoGuias === "nova"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                ✨ Nova Guia
              </button>
              <button
                onClick={() => setActiveEmissaoGuias("consultar")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeEmissaoGuias === "consultar"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                🔍 Consultar
              </button>
              <button
                onClick={() => setActiveEmissaoGuias("pendentes")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeEmissaoGuias === "pendentes"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                ⏳ Pendentes
              </button>
              <button
                onClick={() => setActiveEmissaoGuias("relatorios")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeEmissaoGuias === "relatorios"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                📊 Relatórios
              </button>
            </div>

            {/* Nova Emissão de Guia */}
            {activeEmissaoGuias === "nova" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Formulário de Emissão */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="p-4 border-b border-gray-200 bg-red-50">
                      <h3 className="font-semibold text-gray-900">
                        ✨ Nova Guia de Transporte
                      </h3>
                    </div>
                    <div className="p-6">
                      <form className="space-y-6">
                        {/* Dados do Cliente */}
                        <div className="border-b border-gray-200 pb-6">
                          <h4 className="font-semibold text-gray-900 mb-4">
                            👤 Dados do Cliente
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cliente *
                              </label>
                              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950">
                                <option value="">Selecione o cliente</option>
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
                                <option value="construma">
                                  ConstruMa Lda
                                </option>
                                <option value="outro">Outro cliente</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                NUIT do Cliente *
                              </label>
                              <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                                placeholder="Número de Identificação Tributária"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Dados do Transporte */}
                        <div className="border-b border-gray-200 pb-6">
                          <h4 className="font-semibold text-gray-900 mb-4">
                            🚚 Dados do Transporte
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Origem *
                              </label>
                              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950">
                                <option value="">Selecione a origem</option>
                                <option value="maputo">Maputo</option>
                                <option value="matola">Matola</option>
                                <option value="beira">Beira</option>
                                <option value="nampula">Nampula</option>
                                <option value="xai-xai">Xai-Xai</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Destino *
                              </label>
                              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950">
                                <option value="">Selecione o destino</option>
                                <option value="maputo">Maputo</option>
                                <option value="matola">Matola</option>
                                <option value="beira">Beira</option>
                                <option value="nampula">Nampula</option>
                                <option value="xai-xai">Xai-Xai</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Data de Embarque *
                              </label>
                              <input
                                type="date"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Data Prevista Entrega
                              </label>
                              <input
                                type="date"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Distância (km)
                              </label>
                              <input
                                type="number"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                                placeholder="0"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Dados da Carga */}
                        <div className="border-b border-gray-200 pb-6">
                          <h4 className="font-semibold text-gray-900 mb-4">
                            📦 Dados da Carga
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tipo de Carga *
                              </label>
                              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950">
                                <option value="">Selecione</option>
                                <option value="cimento">Cimento</option>
                                <option value="graos">Grãos e Cereais</option>
                                <option value="alimentos">
                                  Produtos Alimentares
                                </option>
                                <option value="combustivel">
                                  Combustíveis
                                </option>
                                <option value="materiais">
                                  Materiais Construção
                                </option>
                                <option value="outros">Outros</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Peso (kg) *
                              </label>
                              <input
                                type="number"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                                placeholder="0"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Volume (m³)
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                                placeholder="0,00"
                              />
                            </div>
                          </div>

                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Descrição da Carga
                            </label>
                            <textarea
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                              placeholder="Descrição detalhada da carga..."
                            />
                          </div>
                        </div>

                        {/* Dados do Veículo e Motorista */}
                        <div className="border-b border-gray-200 pb-6">
                          <h4 className="font-semibold text-gray-900 mb-4">
                            🚛 Veículo e Motorista
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Matrícula do Veículo *
                              </label>
                              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950">
                                <option value="">Selecione o veículo</option>
                                <option value="AB-123-MP">
                                  AB-123-MP - Mercedes Baú
                                </option>
                                <option value="CD-456-MP">
                                  CD-456-MP - Volvo Caçamba
                                </option>
                                <option value="EF-789-MP">
                                  EF-789-MP - Scania Truck
                                </option>
                                <option value="GH-012-MP">
                                  GH-012-MP - MAN Baú
                                </option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Motorista *
                              </label>
                              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950">
                                <option value="">Selecione o motorista</option>
                                <option value="joao">João Maputo</option>
                                <option value="carlos">Carlos Santos</option>
                                <option value="mario">Mário Fernandes</option>
                                <option value="antonio">António Muchanga</option>
                              </select>
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
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                          >
                            Gerar Pré-visualização
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* Pré-visualização e Ações */}
                <div className="space-y-6">
                  {/* Pré-visualização */}
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      📄 Pré-visualização da Guia
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-gray-900">
                          Guia de Transporte
                        </p>
                        <p className="text-xs text-gray-600">
                          Nº: <strong>GT-2024-00158</strong>
                        </p>
                        <p className="text-xs text-gray-600">
                          Série: <strong>A</strong>
                        </p>
                      </div>

                      <div>
                        <span className="text-gray-600">Cliente:</span>
                        <p className="font-medium text-gray-950">-</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Rota:</span>
                        <p className="font-medium text-gray-950">- → -</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Carga:</span>
                        <p className="font-medium text-gray-950">-</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Valor Estimado:</span>
                        <p className="font-medium text-gray-950">- MT</p>
                      </div>
                    </div>
                  </div>

                  {/* Ações Rápidas */}
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      ⚡ Ações Rápidas
                    </h4>
                    <div className="space-y-3">
                      <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                        📥 Guardar Rascunho
                      </button>
                      <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm">
                        🖨️ Imprimir Guia
                      </button>
                    </div>
                  </div>

                  {/* Informações Úteis */}
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      💡 Informações Úteis
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        • Guia de Transporte é obrigatória para fiscalização
                      </p>
                      <p>• Mantenha cópia no veículo durante o transporte</p>
                      <p>• FAT deve ser emitida após confirmação de entrega</p>
                      <p>• NUIT do cliente é obrigatório para FAT</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Consulta de Guias */}
            {activeEmissaoGuias === "consultar" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4 border-b border-gray-200 bg-blue-50">
                    <h3 className="font-semibold text-gray-900">
                      🔍 Consulta de Guias Emitidas
                    </h3>
                  </div>
                  <div className="p-6">
                    {/* Filtros */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <input
                        type="text"
                        className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                        placeholder="Nº da Guia"
                      />
                      <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Status: Todos</option>
                        <option>Emitida</option>
                        <option>Em Transporte</option>
                        <option>Entregue</option>
                        <option>Cancelada</option>
                      </select>
                      <input
                        type="date"
                        className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                        placeholder="De"
                      />
                      <input
                        type="date"
                        className="px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                        placeholder="Até"
                      />
                    </div>

                    {/* Lista de Guias */}
                    <div className="space-y-4">
                      {/* Guia 1 */}
                      <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className="w-2 h-12 bg-blue-500 rounded-full"></div>
                          <div>
                            <p className="font-medium text-gray-900">
                              GT-2024-00155
                            </p>
                            <p className="text-sm text-gray-600">
                              Cimentos MZ • Maputo → Nampula
                            </p>
                            <p className="text-xs text-gray-500">
                              Emitida: 15/01/2024 09:30
                            </p>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Valor</p>
                          <p className="font-bold text-gray-900">26.880 MT</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Status</p>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Entregue
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                            Visualizar
                          </button>
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                            FAT
                          </button>
                        </div>
                      </div>

                      {/* Guia 2 */}
                      <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className="w-2 h-12 bg-blue-500 rounded-full"></div>
                          <div>
                            <p className="font-medium text-gray-900">
                              GT-2024-00156
                            </p>
                            <p className="text-sm text-gray-600">
                              Mozal • Matola → Beira
                            </p>
                            <p className="text-xs text-gray-500">
                              Emitida: 16/01/2024 14:20
                            </p>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Valor</p>
                          <p className="font-bold text-gray-900">15.360 MT</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Status</p>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Em Transporte
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                            Visualizar
                          </button>
                          <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                            Rastrear
                          </button>
                        </div>
                      </div>

                      {/* Guia 3 */}
                      <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className="w-2 h-12 bg-blue-500 rounded-full"></div>
                          <div>
                            <p className="font-medium text-gray-900">
                              GT-2024-00157
                            </p>
                            <p className="text-sm text-gray-600">
                              Grupo JF • Maputo → Xai-Xai
                            </p>
                            <p className="text-xs text-gray-500">
                              Emitida: 17/01/2024 08:15
                            </p>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Valor</p>
                          <p className="font-bold text-gray-900">2.816 MT</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Status</p>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Emitida
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                            Visualizar
                          </button>
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                            Iniciar Transporte
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Guias Pendentes */}
            {activeEmissaoGuias === "pendentes" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Aguardando FAT
                        </p>
                        <p className="text-2xl font-bold text-gray-900">8</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <span className="text-blue-600 text-xl">📄</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-blue-600 text-sm font-medium">
                        Entregues sem FAT
                      </span>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Em Transporte
                        </p>
                        <p className="text-2xl font-bold text-gray-900">12</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <span className="text-blue-600 text-xl">🚚</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-blue-600 text-sm font-medium">
                        Em curso
                      </span>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Atrasadas
                        </p>
                        <p className="text-2xl font-bold text-gray-900">3</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <span className="text-blue-600 text-xl">⚠️</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-blue-600 text-sm font-medium">
                        Fora do prazo
                      </span>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Rascunhos
                        </p>
                        <p className="text-2xl font-bold text-gray-900">5</p>
                      </div>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <span className="text-gray-600 text-xl">📝</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-gray-600 text-sm font-medium">
                        Não finalizadas
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4 border-b border-gray-200 bg-blue-50">
                    <h3 className="font-semibold text-gray-900">
                      ⏳ Guias Pendentes de Faturação
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                            GT
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              GT-2024-00152
                            </p>
                            <p className="text-sm text-gray-600">
                              Cimentos MZ • Maputo → Nampula
                            </p>
                            <p className="text-xs text-blue-600">
                              Entregue: 14/01/2024 • Aguardando FAT
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">26.880 MT</p>
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 mt-2">
                            Emitir FAT
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                            GT
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              GT-2024-00153
                            </p>
                            <p className="text-sm text-gray-600">
                              Mozal • Matola → Chimoio
                            </p>
                            <p className="text-xs text-blue-600">
                              Entregue: 13/01/2024 • Aguardando FAT
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">18.432 MT</p>
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 mt-2">
                            Emitir FAT
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                            GT
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              GT-2024-00154
                            </p>
                            <p className="text-sm text-gray-600">
                              Grupo JF • Beira → Tete
                            </p>
                            <p className="text-xs text-blue-600">
                              Entregue: 12/01/2024 • Aguardando FAT
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">22.150 MT</p>
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 mt-2">
                            Emitir FAT
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Relatórios */}
            {activeEmissaoGuias === "relatorios" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100">
                    <div className="text-blue-600 text-lg mb-2">📊</div>
                    <p className="font-medium text-gray-900">
                      Relatório Diário
                    </p>
                    <p className="text-sm text-gray-600">
                      Guias emitidas por dia
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100">
                    <div className="text-green-600 text-lg mb-2">💰</div>
                    <p className="font-medium text-gray-900">Faturação</p>
                    <p className="text-sm text-gray-600">
                      FATs emitidas e pendentes
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 cursor-pointer hover:bg-purple-100">
                    <div className="text-purple-600 text-lg mb-2">🏢</div>
                    <p className="font-medium text-gray-900">Por Cliente</p>
                    <p className="text-sm text-gray-600">
                      Volume por cliente
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 cursor-pointer hover:bg-orange-100">
                    <div className="text-orange-600 text-lg mb-2">🗺️</div>
                    <p className="font-medium text-gray-900">Por Rota</p>
                    <p className="text-sm text-gray-600">
                      Distribuição por rotas
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
                          <option>Guias por Período</option>
                          <option>Faturação por Cliente</option>
                          <option>Transportes por Rota</option>
                          <option>Performance Mensal</option>
                          <option>Documentos Pendentes</option>
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
                      <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium">
                        Gerar Relatório
                      </button>
                      <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                        Exportar Excel
                      </button>
                      <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                        Imprimir
                      </button>
                    </div>
                  </div>
                </div>

                {/* Estatísticas Rápidas */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4 border-b border-gray-200 bg-purple-50">
                    <h3 className="font-semibold text-gray-900">
                      📊 Estatísticas do Mês
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">158</p>
                        <p className="text-sm text-gray-600">Guias Emitidas</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">142</p>
                        <p className="text-sm text-gray-600">FATs Emitidas</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          1.285.600
                        </p>
                        <p className="text-sm text-gray-600">Valor Total (MT)</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          89,8%
                        </p>
                        <p className="text-sm text-gray-600">
                          Taxa de Faturação
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Gráficos */}
        {activeDocumentType === "graficos" && (
          <div className="space-y-6 text-gray-950">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                    📊
                  </span>
                  Dashboard de Documentos Fiscais - Métricas e Estatísticas
                </h3>
              </div>
              <div className="p-6">
                {/* Grid de Gráficos Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Distribuição por Tipo de Documento */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-blue-500 mr-2">📋</span>
                      Distribuição por Tipo de Documento
                    </h4>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center w-full">
                        <div className="flex justify-center mb-4">
                          <div className="relative w-32 h-32">
                            <div
                              className="w-full h-full rounded-full"
                              style={{
                                background:
                                  "conic-gradient(#3b82f6 0% 45%, #10b981 45% 70%, #f59e0b 70% 85%, #8b5cf6 85% 95%, #ef4444 95% 100%)",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                            <span>Facturas (45%) - 142 documentos</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                            <span>Guias Transporte (25%) - 78 documentos</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                            <span>Recibos (15%) - 47 documentos</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                            <span>Cotações (10%) - 31 documentos</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                            <span>Notas Crédito (5%) - 16 documentos</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Emissões por Semana - Barras Empilhadas */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-purple-500 mr-2">📈</span>
                      Emissões por Semana (Últimas 4 Semanas)
                    </h4>

                    <div className="h-64 flex items-end justify-between space-x-1">
                      {[
                        {
                          semana: "Sem 1",
                          facturas: 12,
                          guias: 8,
                          recibos: 5,
                        },
                        {
                          semana: "Sem 2",
                          facturas: 15,
                          guias: 10,
                          recibos: 6,
                        },
                        {
                          semana: "Sem 3",
                          facturas: 18,
                          guias: 12,
                          recibos: 8,
                        },
                        {
                          semana: "Sem 4",
                          facturas: 22,
                          guias: 15,
                          recibos: 10,
                        },
                      ].map((item, index) => {
                        const total = 25; // base máxima para proporcionalidade
                        return (
                          <div
                            key={index}
                            className="flex flex-col items-center flex-1 h-full"
                          >
                            <div className="flex flex-col justify-end h-full w-3/4 rounded-t-lg overflow-hidden">
                              {/* Recibos */}
                              <div
                                className="w-full bg-yellow-500 transition-all hover:opacity-80"
                                style={{
                                  height: `${(item.recibos / total) * 100}%`,
                                }}
                                title={`Recibos: ${item.recibos}`}
                              ></div>
                              {/* Guias */}
                              <div
                                className="w-full bg-green-500 transition-all hover:opacity-80"
                                style={{
                                  height: `${(item.guias / total) * 100}%`,
                                }}
                                title={`Guias: ${item.guias}`}
                              ></div>
                              {/* Facturas */}
                              <div
                                className="w-full bg-blue-500 transition-all hover:opacity-80"
                                style={{
                                  height: `${(item.facturas / total) * 100}%`,
                                }}
                                title={`Facturas: ${item.facturas}`}
                              ></div>
                            </div>
                            <span className="text-xs mt-2 font-medium text-center">
                              {item.semana}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Legenda */}
                    <div className="flex justify-center space-x-4 mt-4 text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
                        <span>Facturas</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
                        <span>Guias</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded mr-1"></div>
                        <span>Recibos</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Segunda Linha de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {/* Gráfico de Faturação por Cliente */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-red-500 mr-2">🏢</span>
                      Faturação por Cliente (Último Mês)
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            cliente: "Cimentos de Moçambique",
                            facturas: 28,
                            valor: 485000,
                            cor: "bg-blue-500",
                            porcentagem: 32,
                          },
                          {
                            cliente: "Mozal",
                            facturas: 22,
                            valor: 420000,
                            cor: "bg-green-500",
                            porcentagem: 28,
                          },
                          {
                            cliente: "Grupo João Ferreira",
                            facturas: 18,
                            valor: 320000,
                            cor: "bg-cyan-500",
                            porcentagem: 22,
                          },
                          {
                            cliente: "Cervejas de Moçambique",
                            facturas: 12,
                            valor: 185000,
                            cor: "bg-purple-500",
                            porcentagem: 12,
                          },
                          {
                            cliente: "Outros",
                            facturas: 8,
                            valor: 120000,
                            cor: "bg-gray-500",
                            porcentagem: 6,
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
                                  {(item.valor / 1000).toFixed(0)}K MT
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${item.cor}`}
                                  style={{ width: `${item.porcentagem}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1 flex justify-between">
                                <span>{item.facturas} facturas</span>
                                <span>{item.porcentagem}% do total</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Status das Guias de Transporte */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-green-500 mr-2">🚚</span>
                      Status das Guias de Transporte
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            status: "Entregues com FAT",
                            quantidade: 45,
                            cor: "bg-green-500",
                            porcentagem: 58,
                            icon: "✅",
                          },
                          {
                            status: "Entregues sem FAT",
                            quantidade: 12,
                            cor: "bg-blue-500",
                            porcentagem: 15,
                            icon: "📦",
                          },
                          {
                            status: "Em Transporte",
                            quantidade: 15,
                            cor: "bg-yellow-500",
                            porcentagem: 19,
                            icon: "🚛",
                          },
                          {
                            status: "Aguardando Embarque",
                            quantidade: 6,
                            cor: "bg-orange-500",
                            porcentagem: 8,
                            icon: "⏳",
                          },
                          {
                            status: "Canceladas",
                            quantidade: 0,
                            cor: "bg-red-500",
                            porcentagem: 0,
                            icon: "❌",
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
                                  {item.status}
                                </span>
                                <span className="text-sm font-bold text-gray-700 ml-2 whitespace-nowrap flex-shrink-0">
                                  {item.quantidade}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${item.cor}`}
                                  style={{ width: `${item.porcentagem}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {item.porcentagem}% das guias
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Performance de Emissão */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-amber-500 mr-2">📊</span>
                      Performance de Emissão
                    </h4>
                    <div className="h-48 overflow-y-auto">
                      <div className="space-y-4 pr-2">
                        {[
                          {
                            documento: "Facturas FAT",
                            taxa: 95,
                            meta: 90,
                            cor: "bg-green-500",
                            tendencia: "+3%",
                            icon: "📄",
                          },
                          {
                            documento: "Guias Transporte",
                            taxa: 88,
                            meta: 85,
                            cor: "bg-blue-500",
                            tendencia: "+2%",
                            icon: "🚚",
                          },
                          {
                            documento: "Cotações → FAT",
                            taxa: 65,
                            meta: 70,
                            cor: "bg-yellow-500",
                            tendencia: "-5%",
                            icon: "📝",
                          },
                          {
                            documento: "Tempo Médio Emissão",
                            taxa: 78,
                            meta: 80,
                            cor: "bg-orange-500",
                            tendencia: "-2%",
                            icon: "⏱️",
                          },
                          {
                            documento: "Documentos Pendentes",
                            taxa: 12,
                            meta: 10,
                            cor: "bg-red-500",
                            tendencia: "+2%",
                            icon: "⚠️",
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
                                  {item.documento}
                                </span>
                                <div className="flex items-center space-x-1 text-sm font-bold text-gray-700 flex-shrink-0">
                                  <span>{item.taxa}%</span>
                                  <span
                                    className={`${
                                      item.tendencia.startsWith("+")
                                        ? "text-green-600"
                                        : item.tendencia.startsWith("-")
                                        ? "text-red-600"
                                        : "text-gray-600"
                                    } text-xs`}
                                  >
                                    {item.tendencia}
                                  </span>
                                </div>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${item.cor} transition-all duration-500`}
                                  style={{ width: `${item.taxa}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1 flex justify-between">
                                <span>Meta: {item.meta}%</span>
                                <span
                                  className={`font-medium ${
                                    item.taxa >= item.meta
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {item.taxa >= item.meta ? "✓" : "✗"}
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
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">
                      Facturas Este Mês
                    </p>
                    <p className="text-2xl font-bold text-gray-900">142</p>
                    <p className="text-xs text-blue-600 mt-1">
                      +15% vs mês passado
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600 font-medium">
                      Guias Emitidas
                    </p>
                    <p className="text-2xl font-bold text-gray-900">78</p>
                    <p className="text-xs text-green-600 mt-1">
                      12 em transporte
                    </p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <p className="text-sm text-amber-600 font-medium">
                      Taxa Faturação
                    </p>
                    <p className="text-2xl font-bold text-gray-900">89.8%</p>
                    <p className="text-xs text-amber-600 mt-1">
                      +2.3% acima da meta
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-600 font-medium">
                      Valor Total
                    </p>
                    <p className="text-2xl font-bold text-gray-900">1.53M MT</p>
                    <p className="text-xs text-purple-600 mt-1">Mês atual</p>
                  </div>
                </div>

                {/* Terceira Linha de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Rotas Mais Frequentes */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-indigo-500 mr-2">🗺️</span>
                      Rotas Mais Frequentes (Guias de Transporte)
                    </h4>

                    <div className="h-64 flex items-end justify-between space-x-1">
                      {[
                        {
                          rota: "Maputo→Nampula",
                          quantidade: 28,
                          valor: 420000,
                          cor: "bg-blue-500",
                        },
                        {
                          rota: "Matola→Beira",
                          quantidade: 22,
                          valor: 320000,
                          cor: "bg-green-500",
                        },
                        {
                          rota: "Beira→Chimoio",
                          quantidade: 18,
                          valor: 250000,
                          cor: "bg-cyan-500",
                        },
                        {
                          rota: "Maputo→Xai-Xai",
                          quantidade: 15,
                          valor: 120000,
                          cor: "bg-purple-500",
                        },
                        {
                          rota: "Nampula→Pemba",
                          quantidade: 12,
                          valor: 180000,
                          cor: "bg-orange-500",
                        },
                      ].map((item, index) => {
                        const maxQuantidade = 30; // base máxima para proporcionalidade
                        return (
                          <div
                            key={index}
                            className="flex flex-col items-center flex-1 h-full"
                          >
                            <div className="flex flex-col justify-end h-full w-3/4 rounded-t-lg overflow-hidden">
                              <div
                                className={`w-full ${item.cor} transition-all hover:opacity-80`}
                                style={{
                                  height: `${
                                    (item.quantidade / maxQuantidade) * 100
                                  }%`,
                                }}
                                title={`${item.rota}: ${
                                  item.quantidade
                                } guias • ${(item.valor / 1000).toFixed(0)}K MT`}
                              ></div>
                            </div>
                            <span className="text-xs mt-2 font-medium text-center">
                              {item.rota}
                            </span>
                            <span className="text-xs text-gray-500">
                              {item.quantidade}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Legenda */}
                    <div className="flex justify-center space-x-4 mt-4 text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
                        <span>Maputo→Nampula</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
                        <span>Matola→Beira</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-cyan-500 rounded mr-1"></div>
                        <span>Beira→Chimoio</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded mr-1"></div>
                        <span>Maputo→Xai-Xai</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-orange-500 rounded mr-1"></div>
                        <span>Nampula→Pemba</span>
                      </div>
                    </div>

                    {/* Destaque da rota mais frequente */}
                    <div className="text-center mt-4 text-sm text-gray-600">
                      Rota mais frequente: Maputo → Nampula • 28 guias
                    </div>
                  </div>

                  {/* Gráfico de Tipos de Carga */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-amber-500 mr-2">📦</span>
                      Tipos de Carga Mais Transportados
                    </h4>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center w-full">
                        <div className="flex justify-center mb-4">
                          <div className="relative w-32 h-32">
                            <div
                              className="w-full h-full rounded-full"
                              style={{
                                background:
                                  "conic-gradient(#3b82f6 0% 35%, #10b981 35% 60%, #f59e0b 60% 80%, #8b5cf6 80% 90%, #ef4444 90% 100%)",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                            <span>Cimento (35%) - 27 cargas</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                            <span>Material Construção (25%) - 19 cargas</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                            <span>Produtos Alimentares (20%) - 16 cargas</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                            <span>Combustível (10%) - 8 cargas</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                            <span>Outros (10%) - 8 cargas</span>
                          </div>
                        </div>
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
                        Tipo de Documento
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos os Documentos</option>
                        <option>Facturas</option>
                        <option>Guias de Transporte</option>
                        <option>Recibos</option>
                        <option>Cotações</option>
                        <option>Notas de Crédito</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cliente
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos os Clientes</option>
                        <option>Cimentos de Moçambique</option>
                        <option>Mozal</option>
                        <option>Grupo João Ferreira</option>
                        <option>Cervejas de Moçambique</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos os Status</option>
                        <option>Emitido</option>
                        <option>Pendente</option>
                        <option>Cancelado</option>
                        <option>Faturado</option>
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

export default EmissaoGuias;