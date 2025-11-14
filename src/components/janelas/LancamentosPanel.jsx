export const LancamentosPanel = ({ activeLancamentoForm, setActiveLancamentoForm }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-green-500 text-white p-2 rounded-lg mr-3">
            📥
          </span>
          Lançamentos - Operações Portuárias
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Registro de operações, movimentações de carga e processos
          logísticos
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveLancamentoForm("nova_carga")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeLancamentoForm === "nova_carga"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📦 Nova Carga
          </button>
          <button
            onClick={() => setActiveLancamentoForm("movimentacao")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeLancamentoForm === "movimentacao"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🚛 Movimentação
          </button>
          <button
            onClick={() => setActiveLancamentoForm("despacho")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeLancamentoForm === "despacho"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📋 Despacho
          </button>
          <button
            onClick={() => setActiveLancamentoForm("historico")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeLancamentoForm === "historico"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Histórico
          </button>
        </div>

        {/* Formulário de Nova Carga */}
        {activeLancamentoForm === "nova_carga" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-green-50">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-green-500 text-white p-2 rounded-lg mr-2">
                      📦
                    </span>
                    Registro de Nova Carga
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Número do BL/Conhecimento *
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                          placeholder="BL000001"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Carga *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950 text-gray-950">
                          <option value="">Selecione</option>
                          <option value="container">Contentor</option>
                          <option value="granel">Granel</option>
                          <option value="geral">Carga Geral</option>
                          <option value="perigosa">Carga Perigosa</option>
                          <option value="refrigerada">Refrigerada</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cliente *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950 text-gray-950">
                          <option value="">Selecione o cliente</option>
                          <option value="1">Empresa A Lda</option>
                          <option value="2">Empresa B Lda</option>
                          <option value="3">Empresa C Lda</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Transportadora
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950 text-gray-950">
                          <option value="">Selecione</option>
                          <option value="1">Transportadora Maputo</option>
                          <option value="2">Transportadora Beira</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Peso (kg) *
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Volume (m³)
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quantidade
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Porto de Origem
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950 text-gray-950">
                          <option value="">Selecione</option>
                          <option value="maputo">Porto de Maputo</option>
                          <option value="beira">Porto da Beira</option>
                          <option value="nacala">Porto de Nacala</option>
                          <option value="durban">
                            Durban (África do Sul)
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Porto de Destino
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950 text-gray-950">
                          <option value="">Selecione</option>
                          <option value="maputo">Porto de Maputo</option>
                          <option value="beira">Porto da Beira</option>
                          <option value="nacala">Porto de Nacala</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição da Mercadoria
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
                        placeholder="Descreva a mercadoria..."
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
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-600 font-medium"
                      >
                        Registar Carga
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Painel de Status */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Status da Carga
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg text-gray-950">
                    <span className="text-sm font-medium">
                      Cargas Pendentes
                    </span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                      12
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg text-gray-950">
                    <span className="text-sm font-medium">Em Trânsito</span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                      8
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg text-gray-950">
                    <span className="text-sm font-medium">
                      Para Despacho
                    </span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                      5
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Alertas Recentes
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2 p-2 bg-yellow-50 rounded-lg">
                    <span className="text-yellow-600 mt-0.5">⚠️</span>
                    <div>
                      <p className="text-sm font-medium text-gray-950">
                        Carga #024 atrasada
                      </p>
                      <p className="text-xs text-gray-600">
                        Prevista para 15/01
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-2 bg-red-50 rounded-lg">
                    <span className="text-red-600 mt-0.5">🔴</span>
                    <div>
                      <p className="text-sm font-medium text-gray-950">
                        Documentação pendente
                      </p>
                      <p className="text-xs text-gray-600">Carga #018</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Formulário de Movimentação */}
        {activeLancamentoForm === "movimentacao" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-blue-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                  🚛
                </span>
                Movimentação de Carga
              </h3>
            </div>
            <div className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número da Carga *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                      <option value="">Selecione a carga</option>
                      <option value="001">CARGA-001</option>
                      <option value="002">CARGA-002</option>
                      <option value="003">CARGA-003</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Movimentação *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                      <option value="">Selecione</option>
                      <option value="entrada">Entrada no Porto</option>
                      <option value="saida">Saída do Porto</option>
                      <option value="transferencia">
                        Transferência Interna
                      </option>
                      <option value="inspecao">Inspeção</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Local de Origem
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                      placeholder="Pátio A, Armazém 1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Local de Destino
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                      placeholder="Pátio B, Armazém 3"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data/Hora da Movimentação *
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Responsável *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                      placeholder="Nome do operador"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observações
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                    placeholder="Observações sobre a movimentação..."
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
                    Registar Movimentação
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Formulário de Despacho Aduaneiro */}
        {activeLancamentoForm === "despacho" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-orange-50">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-orange-500 text-white p-2 rounded-lg mr-2">
                      📋
                    </span>
                    Processo de Despacho Aduaneiro
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Número da Carga *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950">
                          <option value="">Selecione a carga</option>
                          <option value="001">CARGA-001</option>
                          <option value="002">CARGA-002</option>
                          <option value="003">CARGA-003</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Despachante Responsável *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950">
                          <option value="">Selecione o despachante</option>
                          <option value="1">João Silva - Reg: 12345</option>
                          <option value="2">
                            Maria Santos - Reg: 12346
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Número DUE *
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                          placeholder="Número da Declaração Única de Exportação"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data do Despacho *
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                        />
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Documentação
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <label className="text-sm text-gray-700">
                            Factura Comercial
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <label className="text-sm text-gray-700">
                            BL/Conhecimento
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <label className="text-sm text-gray-700">
                            Certificado de Origem
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <label className="text-sm text-gray-700">
                            Lista de Embalagem
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <label className="text-sm text-gray-700">
                            Certificado Fitossanitário
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <label className="text-sm text-gray-700">
                            Licenças de Importação/Exportação
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Tributação
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Valor Aduaneiro (MT)
                          </label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="0.00"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Imposto de Importação (MT)
                          </label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="0.00"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            IVA (MT)
                          </label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Observações do Despacho
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Observações sobre o processo de despacho..."
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
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-orange-600 font-medium"
                      >
                        Concluir Despacho
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Status do Despacho */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Status do Despacho
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-950">
                      Documentação Completa
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                    <span className="text-sm text-gray-950">
                      Análise Aduaneira
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-950">
                      Pagamento de Taxas
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-950">
                      Liberação Final
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Próximos Passos
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Verificar documentação completa</p>
                  <p>• Aguardar análise aduaneira</p>
                  <p>• Efectuar pagamento de taxas</p>
                  <p>• Receber liberação da AT</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Histórico de Lançamentos */}
        {activeLancamentoForm === "historico" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-purple-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-purple-500 text-white p-2 rounded-lg mr-2">
                  📊
                </span>
                Histórico de Lançamentos
              </h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Carga
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Cliente
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Tipo
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Status
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Data
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 text-gray-950">
                      <td className="py-3 text-sm">CARGA-001</td>
                      <td className="py-3 text-sm">Empresa A Lda</td>
                      <td className="py-3 text-sm">Contentor</td>
                      <td className="py-3">
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium">
                          Em Trânsito
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        15/01/2024
                      </td>
                      <td className="py-3">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 text-gray-950">
                      <td className="py-3 text-sm">CARGA-002</td>
                      <td className="py-3 text-sm">Empresa B Lda</td>
                      <td className="py-3 text-sm">Granel</td>
                      <td className="py-3">
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                          No Porto
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        14/01/2024
                      </td>
                      <td className="py-3">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 text-gray-950">
                      <td className="py-3 text-sm">CARGA-003</td>
                      <td className="py-3 text-sm">Empresa C Lda</td>
                      <td className="py-3 text-sm">Carga Geral</td>
                      <td className="py-3">
                        <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-medium">
                          Pendente
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        13/01/2024
                      </td>
                      <td className="py-3">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};