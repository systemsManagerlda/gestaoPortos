export const VistoriaPanel = ({ activeVistoriaForm, setActiveVistoriaForm }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-amber-500 text-white p-2 rounded-lg mr-3">
            🔍
          </span>
          Vistoria - Vistorias de Veículos e Cargas
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Agendamento, execução e relatórios de vistorias técnicas
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação entre Formulários */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveVistoriaForm("agendamento")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeVistoriaForm === "agendamento"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📅 Agendamento
          </button>
          <button
            onClick={() => setActiveVistoriaForm("execucao")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeVistoriaForm === "execucao"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🔧 Execução
          </button>
          <button
            onClick={() => setActiveVistoriaForm("relatorios")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeVistoriaForm === "relatorios"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📋 Relatórios
          </button>
          <button
            onClick={() => setActiveVistoriaForm("historico")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeVistoriaForm === "historico"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Histórico
          </button>
          <button
            onClick={() => setActiveVistoriaForm("graficos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeVistoriaForm === "graficos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Gráficos
          </button>
        </div>

        {/* Formulário de Agendamento */}
        {activeVistoriaForm === "agendamento" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-amber-50">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-amber-500 text-white p-2 rounded-lg mr-2">
                      📅
                    </span>
                    Agendamento de Vistoria
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Vistoria *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950">
                          <option value="">Selecione</option>
                          <option value="veicular">
                            Vistoria Veicular
                          </option>
                          <option value="carga">Vistoria de Carga</option>
                          <option value="preventiva">Preventiva</option>
                          <option value="corretiva">Corretiva</option>
                          <option value="seguro">Para Seguro</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Veículo/Carga *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950">
                          <option value="">Selecione</option>
                          <option value="1">Camião MB-1234-AB</option>
                          <option value="2">Camião MB-5678-CD</option>
                          <option value="3">Carga #CARGA-001</option>
                          <option value="4">Carga #CARGA-002</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data da Vistoria *
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hora *
                        </label>
                        <input
                          type="time"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Local da Vistoria *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950">
                          <option value="">Selecione</option>
                          <option value="ponto_a">Ponto A - Maputo</option>
                          <option value="ponto_b">Ponto B - Matola</option>
                          <option value="ponto_c">
                            Ponto C - Marracuene
                          </option>
                          <option value="local_cliente">
                            No Local do Cliente
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Vistoriador Responsável *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950">
                          <option value="">Selecione</option>
                          <option value="1">Carlos Silva - VTR001</option>
                          <option value="2">Maria Santos - VTR002</option>
                          <option value="3">João Fernandes - VTR003</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Motivo da Vistoria
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                        placeholder="Descreva o motivo da vistoria..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cliente Solicitante
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950">
                          <option value="">Selecione</option>
                          <option value="1">Empresa A Lda</option>
                          <option value="2">Empresa B Lda</option>
                          <option value="3">Empresa C Lda</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Prioridade
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950">
                          <option value="baixa">Baixa</option>
                          <option value="media">Média</option>
                          <option value="alta">Alta</option>
                          <option value="urgente">Urgente</option>
                        </select>
                      </div>
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
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-amber-600 font-medium"
                      >
                        Agendar Vistoria
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Painel de Agendamentos */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Próximas Vistorias
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-gray-950">
                      Camião MB-1234-AB
                    </p>
                    <p className="text-xs text-gray-600">
                      Preventiva • Hoje 14:00
                    </p>
                    <p className="text-xs text-blue-600 font-medium">
                      Carlos Silva
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-gray-950">
                      Carga #CARGA-001
                    </p>
                    <p className="text-xs text-gray-600">
                      Seguro • Amanhã 09:30
                    </p>
                    <p className="text-xs text-blue-600 font-medium">
                      Maria Santos
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-gray-950">
                      Camião MB-5678-CD
                    </p>
                    <p className="text-xs text-gray-600">
                      Corretiva • 18/01 10:00
                    </p>
                    <p className="text-xs text-blue-600 font-medium">
                      João Fernandes
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Estatísticas do Mês
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Vistorias Realizadas:
                    </span>
                    <span className="font-semibold text-gray-950">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Agendadas:</span>
                    <span className="font-semibold text-gray-950">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Taxa de Aprovação:
                    </span>
                    <span className="font-semibold text-gray-950">92%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Formulário de Execução */}
        {activeVistoriaForm === "execucao" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                      🔧
                    </span>
                    Execução de Vistoria
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Vistoria Agendada *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                          <option value="">Selecione a vistoria</option>
                          <option value="1">
                            VST-001 - Camião MB-1234-AB
                          </option>
                          <option value="2">
                            VST-002 - Carga #CARGA-001
                          </option>
                          <option value="3">
                            VST-003 - Camião MB-5678-CD
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status da Vistoria *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                          <option value="em_andamento">Em Andamento</option>
                          <option value="concluida">Concluída</option>
                          <option value="cancelada">Cancelada</option>
                          <option value="reagendada">Reagendada</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Checklist de Vistoria
                      </h4>

                      {/* Veículo */}
                      <div className="mb-6">
                        <h5 className="font-medium text-gray-700 mb-3">
                          Estado do Veículo
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <input type="checkbox" className="mr-3" />
                            <label className="text-sm text-gray-700">
                              Pneus em bom estado
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="mr-3" />
                            <label className="text-sm text-gray-700">
                              Sistema de freios OK
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="mr-3" />
                            <label className="text-sm text-gray-700">
                              Luzes funcionando
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="mr-3" />
                            <label className="text-sm text-gray-700">
                              Documentação em dia
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="mr-3" />
                            <label className="text-sm text-gray-700">
                              Nível de óleo
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="mr-3" />
                            <label className="text-sm text-gray-700">
                              Sistema elétrico
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Carga */}
                      <div className="mb-6">
                        <h5 className="font-medium text-gray-700 mb-3">
                          Estado da Carga
                        </h5>
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
                              Documentação OK
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fotos da Vistoria
                        </label>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Resultado Final
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                          <option value="aprovado">Aprovado</option>
                          <option value="aprovado_com_ressalvas">
                            Aprovado com Ressalvas
                          </option>
                          <option value="reprovado">Reprovado</option>
                          <option value="pendente">Pendente</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Observações e Recomendações
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        placeholder="Descreva as observações da vistoria e recomendações necessárias..."
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
                        Finalizar Vistoria
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
                  Informações da Vistoria
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Tipo:</span>
                    <p className="font-medium text-gray-950">
                      Preventiva Veicular
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Data/Hora:</span>
                    <p className="font-medium text-gray-950">
                      15/01/2024 - 14:00
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Local:</span>
                    <p className="font-medium text-gray-950">
                      Ponto A - Maputo
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Vistoriador:</span>
                    <p className="font-medium text-gray-950">
                      Carlos Silva
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Ações Rápidas
                </h4>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950">
                    ✅ Gerar Certificado de Aprovação
                  </button>
                  <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950">
                    ⚠️ Registrar Não Conformidade
                  </button>
                  <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 text-sm text-gray-950">
                    🚨 Reportar Problema Grave
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Formulário de Relatórios */}
        {activeVistoriaForm === "relatorios" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-green-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-green-500 text-white p-2 rounded-lg mr-2">
                  📋
                </span>
                Relatórios de Vistoria
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-blue-600 text-lg mb-2">📊</div>
                  <p className="font-medium text-gray-900">
                    Relatório Diário
                  </p>
                  <p className="text-sm text-gray-600">Vistorias do dia</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-green-600 text-lg mb-2">📈</div>
                  <p className="font-medium text-gray-900">
                    Relatório Mensal
                  </p>
                  <p className="text-sm text-gray-600">
                    Estatísticas do mês
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-orange-600 text-lg mb-2">⚠️</div>
                  <p className="font-medium text-gray-900">
                    Não Conformidades
                  </p>
                  <p className="text-sm text-gray-600">
                    Problemas identificados
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-purple-600 text-lg mb-2">✅</div>
                  <p className="font-medium text-gray-900">Certificados</p>
                  <p className="text-sm text-gray-600">
                    Documentos de aprovação
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-gray-900 mb-4">
                  Gerar Relatório Personalizado
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Relatório
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                      <option>Relatório Completo</option>
                      <option>Vistorias por Vistoriador</option>
                      <option>Taxa de Aprovação</option>
                      <option>Não Conformidades</option>
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
                <button className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-green-600 font-medium">
                  Gerar Relatório
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Histórico de Vistorias */}
        {activeVistoriaForm === "historico" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-purple-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-purple-500 text-white p-2 rounded-lg mr-2">
                  📊
                </span>
                Histórico de Vistorias
              </h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        ID
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Veículo/Carga
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Tipo
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Data
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Vistoriador
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Resultado
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 text-gray-950">
                      <td className="py-3 text-sm">VST-001</td>
                      <td className="py-3 text-sm">Camião MB-1234-AB</td>
                      <td className="py-3 text-sm">Preventiva</td>
                      <td className="py-3 text-sm">15/01/2024</td>
                      <td className="py-3 text-sm">Carlos Silva</td>
                      <td className="py-3">
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium">
                          Aprovado
                        </span>
                      </td>
                      <td className="py-3">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 text-gray-950">
                      <td className="py-3 text-sm">VST-002</td>
                      <td className="py-3 text-sm">Carga #CARGA-001</td>
                      <td className="py-3 text-sm">Seguro</td>
                      <td className="py-3 text-sm">14/01/2024</td>
                      <td className="py-3 text-sm">Maria Santos</td>
                      <td className="py-3">
                        <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs font-medium">
                          Com Ressalvas
                        </span>
                      </td>
                      <td className="py-3">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 text-gray-950">
                      <td className="py-3 text-sm">VST-003</td>
                      <td className="py-3 text-sm">Camião MB-5678-CD</td>
                      <td className="py-3 text-sm">Corretiva</td>
                      <td className="py-3 text-sm">13/01/2024</td>
                      <td className="py-3 text-sm">João Fernandes</td>
                      <td className="py-3">
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
                          Reprovado
                        </span>
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

        {/* Gráficos */}
        {activeVistoriaForm === "graficos" && (
          <div className="space-y-6 text-gray-950">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-amber-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-amber-500 text-white p-2 rounded-lg mr-2">
                    📈
                  </span>
                  Dashboard de Vistorias - Métricas e Estatísticas
                </h3>
              </div>
              <div className="p-6">
                {/* Grid de Gráficos Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Resultados de Vistorias */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-amber-500 mr-2">📊</span>
                      Resultados das Vistorias (Últimos 30 Dias)
                    </h4>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center w-full">
                        <div className="flex justify-center mb-4">
                          <div className="relative w-32 h-32">
                            <div
                              className="w-full h-full rounded-full"
                              style={{
                                background:
                                  "conic-gradient(#10b981 0% 65%, #f59e0b 65% 85%, #ef4444 85% 100%)",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                            <span>Aprovadas (65%)</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                            <span>Com Ressalvas (20%)</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                            <span>Reprovadas (15%)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Vistorias por Tipo - Barras Empilhadas */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-blue-500 mr-2">🔧</span>
                      Vistorias por Tipo (Últimos 6 Meses)
                    </h4>
                    <div className="h-64 flex items-end justify-between space-x-2">
                      {[
                        {
                          month: "Jan",
                          preventiva: 18,
                          corretiva: 8,
                          seguro: 6,
                        },
                        {
                          month: "Fev",
                          preventiva: 15,
                          corretiva: 10,
                          seguro: 5,
                        },
                        {
                          month: "Mar",
                          preventiva: 22,
                          corretiva: 12,
                          seguro: 8,
                        },
                        {
                          month: "Abr",
                          preventiva: 20,
                          corretiva: 15,
                          seguro: 10,
                        },
                        {
                          month: "Mai",
                          preventiva: 25,
                          corretiva: 18,
                          seguro: 12,
                        },
                        {
                          month: "Jun",
                          preventiva: 28,
                          corretiva: 20,
                          seguro: 15,
                        },
                      ].map((item, index) => {
                        const total =
                          item.preventiva + item.corretiva + item.seguro;
                        return (
                          <div
                            key={index}
                            className="flex flex-col items-center flex-1 h-full"
                          >
                            <div className="flex flex-col justify-end h-full w-3/4 rounded-t-lg overflow-hidden">
                              {/* Empilhando Preventiva, Corretiva e Seguro */}
                              <div
                                className="bg-blue-500 w-full transition-all hover:opacity-80"
                                style={{
                                  height: `${(item.preventiva / total) * 100}%`,
                                }}
                                title={`Preventiva: ${item.preventiva}`}
                              ></div>
                              <div
                                className="bg-green-500 w-full transition-all hover:opacity-80"
                                style={{
                                  height: `${(item.corretiva / total) * 100}%`,
                                }}
                                title={`Corretiva: ${item.corretiva}`}
                              ></div>
                              <div
                                className="bg-amber-500 w-full transition-all hover:opacity-80"
                                style={{
                                  height: `${(item.seguro / total) * 100}%`,
                                }}
                                title={`Seguro: ${item.seguro}`}
                              ></div>
                            </div>
                            <span className="text-xs mt-2 font-medium">
                              {item.month}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Legenda */}
                    <div className="flex justify-center space-x-4 mt-4 text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
                        <span>Preventiva</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
                        <span>Corretiva</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-amber-500 rounded mr-1"></div>
                        <span>Seguro</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Segunda Linha de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {/* Gráfico de Desempenho por Vistoriador */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-purple-500 mr-2">⭐</span>
                      Desempenho por Vistoriador
                    </h4>
                    <div className="h-48 space-y-3">
                      {[
                        {
                          vistoriador: "Carlos Silva",
                          aprovadas: 45,
                          total: 50,
                          color: "bg-green-500",
                          percentage: 90,
                        },
                        {
                          vistoriador: "Maria Santos",
                          aprovadas: 38,
                          total: 45,
                          color: "bg-blue-500",
                          percentage: 84,
                        },
                        {
                          vistoriador: "João Fernandes",
                          aprovadas: 42,
                          total: 48,
                          color: "bg-purple-500",
                          percentage: 88,
                        },
                        {
                          vistoriador: "Ana Costa",
                          aprovadas: 35,
                          total: 40,
                          color: "bg-amber-500",
                          percentage: 88,
                        },
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">
                              {item.vistoriador}
                            </span>
                            <span className="text-gray-600">
                              {item.aprovadas}/{item.total}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full ${item.color}`}
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gráfico de Não Conformidades */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-red-500 mr-2">⚠️</span>
                      Principais Não Conformidades
                    </h4>
                    <div className="h-48 space-y-3">
                      {[
                        {
                          problema: "Pneus Gastos",
                          ocorrencias: 28,
                          color: "bg-red-500",
                          percentage: 35,
                        },
                        {
                          problema: "Sistema de Freios",
                          ocorrencias: 22,
                          color: "bg-orange-500",
                          percentage: 28,
                        },
                        {
                          problema: "Documentação",
                          ocorrencias: 18,
                          color: "bg-yellow-500",
                          percentage: 23,
                        },
                        {
                          problema: "Luzes/Sinalização",
                          ocorrencias: 12,
                          color: "bg-blue-500",
                          percentage: 15,
                        },
                      ].map((item, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{item.problema}</span>
                            <span className="font-medium">
                              {item.ocorrencias}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${item.color}`}
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gráfico de Tempo Médio por Vistoria */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-cyan-500 mr-2">⏱️</span>
                      Tempo Médio por Tipo (minutos)
                    </h4>
                    <div className="h-48 space-y-4">
                      {[
                        {
                          tipo: "Preventiva",
                          tempo: 45,
                          color: "bg-blue-500",
                        },
                        {
                          tipo: "Corretiva",
                          tempo: 75,
                          color: "bg-green-500",
                        },
                        {
                          tipo: "Seguro",
                          tempo: 60,
                          color: "bg-amber-500",
                        },
                        {
                          tipo: "Carga",
                          tempo: 30,
                          color: "bg-purple-500",
                        },
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{item.tipo}</span>
                            <span className="font-medium">
                              {item.tempo} min
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full ${item.color}`}
                              style={{
                                width: `${(item.tempo / 80) * 100}%`,
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
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <p className="text-sm text-amber-600 font-medium">
                      Vistorias/Mês
                    </p>
                    <p className="text-2xl font-bold text-gray-900">156</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600 font-medium">
                      Taxa Aprovação
                    </p>
                    <p className="text-2xl font-bold text-gray-900">87%</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">
                      Não Conform.
                    </p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-600 font-medium">
                      Tempo Médio
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      52 min
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
                        <option>Últimos 30 dias</option>
                        <option>Este Mês</option>
                        <option>Últimos 3 Meses</option>
                        <option>Este Ano</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Vistoria
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos</option>
                        <option>Preventiva</option>
                        <option>Corretiva</option>
                        <option>Seguro</option>
                        <option>Carga</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vistoriador
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos</option>
                        <option>Carlos Silva</option>
                        <option>Maria Santos</option>
                        <option>João Fernandes</option>
                        <option>Ana Costa</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Resultado
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos</option>
                        <option>Aprovado</option>
                        <option>Com Ressalvas</option>
                        <option>Reprovado</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-4">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                      Limpar Filtros
                    </button>
                    <button className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium">
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