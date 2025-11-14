export const CombustivelExpedientePanel = ({ activeCombustivelForm, setActiveCombustivelForm }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-orange-500 text-white p-2 rounded-lg mr-3">
            ⛽
          </span>
          Combustível e Expediente - Gestão Operacional
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Controle de abastecimento, consumo de combustível e gestão de
          expedientes da frota
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveCombustivelForm("abastecimento")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCombustivelForm === "abastecimento"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ⛽ Abastecimento
          </button>
          <button
            onClick={() => setActiveCombustivelForm("controle_consumo")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCombustivelForm === "controle_consumo"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Controle de Consumo
          </button>
          <button
            onClick={() => setActiveCombustivelForm("despesas")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCombustivelForm === "despesas"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🚚 Expedientes
          </button>
          <button
            onClick={() => setActiveCombustivelForm("graficos")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCombustivelForm === "graficos"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Gráficos
          </button>
          <button
            onClick={() => setActiveCombustivelForm("relatorios")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCombustivelForm === "relatorios"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📈 Relatórios
          </button>
        </div>

        {/* Formulário de Abastecimento */}
        {activeCombustivelForm === "abastecimento" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-orange-50">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-orange-500 text-white p-2 rounded-lg mr-2">
                      ⛽
                    </span>
                    Registro de Abastecimento
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Veículo/Camião *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950">
                          <option value="">Selecione o veículo</option>
                          <option value="1">Camião MB-1234-AB</option>
                          <option value="2">Camião MB-5678-CD</option>
                          <option value="3">Camião MB-9012-EF</option>
                          <option value="4">
                            Viatura Ligeira MB-3456-GH
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Motorista *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950">
                          <option value="">Selecione o motorista</option>
                          <option value="1">João Maputo</option>
                          <option value="2">Carlos Beira</option>
                          <option value="3">António Nampula</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Posto de Combustível *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950">
                          <option value="">Selecione o posto</option>
                          <option value="galp_av24">
                            Galp - Av. 24 de Julho
                          </option>
                          <option value="total_matola">
                            Total - Matola
                          </option>
                          <option value="puma_marracuene">
                            Puma - Marracuene
                          </option>
                          <option value="bp_baixa">BP - Baixa</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Combustível *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950">
                          <option value="">Selecione</option>
                          <option value="diesel">Diesel</option>
                          <option value="gasolina">Gasolina</option>
                          <option value="diesel_premium">
                            Diesel Premium
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quantidade (Litros) *
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                          placeholder="0"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preço por Litro (MT) *
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                          placeholder="0.00"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Valor Total (MT)
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                          placeholder="Calculado automaticamente"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data do Abastecimento *
                        </label>
                        <input
                          type="datetime-local"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quilometragem Atual *
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Observações
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-950"
                        placeholder="Observações sobre o abastecimento..."
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
                        Registar Abastecimento
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Painel de Estatísticas */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Consumo do Mês
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg text-gray-950">
                    <span className="text-sm font-medium">
                      Diesel Consumido
                    </span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                      2.450 L
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg text-gray-950">
                    <span className="text-sm font-medium">Custo Total</span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                      MT 245.000
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg text-gray-950">
                    <span className="text-sm font-medium">
                      Média por Veículo
                    </span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                      350 L
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Preços Actuais
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Diesel:</span>
                    <span className="font-semibold text-gray-950">
                      MT 95,50/L
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gasolina:</span>
                    <span className="font-semibold text-gray-950">
                      MT 98,75/L
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Diesel Premium:</span>
                    <span className="font-semibold text-gray-950">
                      MT 102,30/L
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Formulário de Controle de Consumo */}
        {activeCombustivelForm === "controle_consumo" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-blue-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                  📊
                </span>
                Controle de Consumo - Análise de Desempenho
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Período de Análise
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                    <option value="este_mes">Este Mês</option>
                    <option value="mes_passado">Mês Passado</option>
                    <option value="ultimos_3_meses">Últimos 3 Meses</option>
                    <option value="personalizado">Personalizado</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Veículo/Frota
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950">
                    <option value="todos">Toda a Frota</option>
                    <option value="1">Camião MB-1234-AB</option>
                    <option value="2">Camião MB-5678-CD</option>
                    <option value="3">Camião MB-9012-EF</option>
                  </select>
                </div>
              </div>

              {/* Métricas de Consumo */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600">Consumo Médio</p>
                  <p className="text-2xl font-bold text-blue-600">
                    3,8 km/L
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600">Custo por Km</p>
                  <p className="text-2xl font-bold text-blue-600">
                    MT 25,15
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600">Total Percorrido</p>
                  <p className="text-2xl font-bold text-blue-600">
                    9.245 km
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600">Economia/Mês</p>
                  <p className="text-2xl font-bold text-blue-600">
                    MT 12.500
                  </p>
                </div>
              </div>

              {/* Tabela de Consumo por Veículo */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Veículo
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Km Percorridos
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Litros
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Consumo (km/L)
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Custo Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 text-gray-950">
                      <td className="py-3 text-sm">MB-1234-AB</td>
                      <td className="py-3 text-sm">2.845 km</td>
                      <td className="py-3 text-sm">745 L</td>
                      <td className="py-3 text-sm">
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium">
                          3,82 km/L
                        </span>
                      </td>
                      <td className="py-3 text-sm font-medium">
                        MT 71.177
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 text-gray-950">
                      <td className="py-3 text-sm">MB-5678-CD</td>
                      <td className="py-3 text-sm">3.120 km</td>
                      <td className="py-3 text-sm">890 L</td>
                      <td className="py-3 text-sm">
                        <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs font-medium">
                          3,51 km/L
                        </span>
                      </td>
                      <td className="py-3 text-sm font-medium">
                        MT 85.055
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 text-gray-950">
                      <td className="py-3 text-sm">MB-9012-EF</td>
                      <td className="py-3 text-sm">2.560 km</td>
                      <td className="py-3 text-sm">620 L</td>
                      <td className="py-3 text-sm">
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium">
                          4,13 km/L
                        </span>
                      </td>
                      <td className="py-3 text-sm font-medium">
                        MT 59.210
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Formulário de Expedientes */}
        {activeCombustivelForm === "despesas" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-amber-50">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-amber-600 text-white p-2 rounded-lg mr-2">
                      💰
                    </span>
                    Gestão de Despesas de Viagem
                  </h3>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Veículo/Camião *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950">
                          <option value="">Selecione o veículo</option>
                          <option value="1">Camião MB-1234-AB</option>
                          <option value="2">Camião MB-5678-CD</option>
                          <option value="3">Camião MB-9012-EF</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Motorista *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950">
                          <option value="">Selecione o motorista</option>
                          <option value="1">João Maputo</option>
                          <option value="2">Carlos Beira</option>
                          <option value="3">António Nampula</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Despesa *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950">
                          <option value="">Selecione</option>
                          <option value="alimentacao">Alimentação</option>
                          <option value="portagem">Portagens</option>
                          <option value="manutencao">Manutenção</option>
                          <option value="alojamento">Alojamento</option>
                          <option value="outros">Outros</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Valor (MT) *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data da Despesa *
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Local da Despesa
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                          placeholder="Ex: Inhambane, Beira, etc."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Comprovativo / Recibo
                      </label>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Pode anexar uma foto ou PDF do recibo.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Observações
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                        placeholder="Ex: Despesa feita durante o trajeto Maputo → Beira"
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
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-amber-700 font-medium"
                      >
                        Registrar Despesa
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Painel lateral de Despesas recentes */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Despesas Recentes
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-gray-950">
                      João Maputo
                    </p>
                    <p className="text-xs text-gray-600">
                      Alimentação — 450 MT
                    </p>
                    <p className="text-xs text-blue-600 font-medium">
                      Hoje • Inhambane
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-gray-950">
                      Carlos Beira
                    </p>
                    <p className="text-xs text-gray-600">
                      Portagem — 300 MT
                    </p>
                    <p className="text-xs text-blue-600 font-medium">
                      Ontem • Xai-Xai
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-gray-950">
                      António Nampula
                    </p>
                    <p className="text-xs text-gray-600">
                      Manutenção — 1.200 MT
                    </p>
                    <p className="text-xs text-blue-600 font-medium">
                      03/11 • Beira
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Resumo Semanal
                </h4>
                <div className="text-sm text-gray-800 space-y-2">
                  <div className="flex justify-between">
                    <span>Total de Despesas</span>
                    <span className="font-medium text-amber-700">
                      2.450 MT
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Motoristas Ativos</span>
                    <span className="font-medium text-amber-700">3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gráficos */}
        {activeCombustivelForm === "graficos" && (
          <div className="space-y-6 text-gray-950">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-orange-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-orange-500 text-white p-2 rounded-lg mr-2">
                    📈
                  </span>
                  Dashboard de Combustível e Expedientes - Métricas
                  Operacionais
                </h3>
              </div>
              <div className="p-6">
                {/* Grid de Gráficos Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Consumo por Veículo */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-orange-500 mr-2">🚛</span>
                      Consumo por Veículo (km/L)
                    </h4>
                    <div className="h-64">
                      <div className="space-y-4">
                        {[
                          {
                            vehicle: "MB-1234-AB",
                            consumption: 3.8,
                            color: "bg-blue-500",
                            width: "95%",
                          },
                          {
                            vehicle: "MB-5678-CD",
                            consumption: 3.2,
                            color: "bg-green-500",
                            width: "80%",
                          },
                          {
                            vehicle: "MB-9012-EF",
                            consumption: 4.1,
                            color: "bg-orange-500",
                            width: "100%",
                          },
                          {
                            vehicle: "VL-3456-GH",
                            consumption: 2.9,
                            color: "bg-purple-500",
                            width: "72%",
                          },
                        ].map((item, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">
                                {item.vehicle}
                              </span>
                              <span className="text-gray-600">
                                {item.consumption} km/L
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className={`h-3 rounded-full ${item.color}`}
                                style={{ width: item.width }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Custos Mensais */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-green-500 mr-2">💰</span>
                      Custos de Combustível (Últimos 6 Meses)
                    </h4>
                    <div className="h-64 flex items-end justify-between space-x-2">
                      {[
                        { month: "Jan", cost: 185, color: "bg-blue-400" },
                        { month: "Fev", cost: 220, color: "bg-green-400" },
                        { month: "Mar", cost: 195, color: "bg-purple-400" },
                        { month: "Abr", cost: 245, color: "bg-orange-400" },
                        { month: "Mai", cost: 280, color: "bg-pink-400" },
                        { month: "Jun", cost: 265, color: "bg-teal-400" },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center flex-1 h-full"
                        >
                          <div className="flex flex-col justify-end h-full w-3/4">
                            <div
                              className={`${item.color} rounded-t-lg transition-all hover:opacity-80 w-full`}
                              style={{
                                height: `${(item.cost / 300) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-xs mt-2 font-medium">
                            {item.month}
                          </span>
                          <span className="text-xs text-gray-600">
                            {item.cost} mil MT
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Segunda Linha de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {/* Gráfico de Tipo de Combustível */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-blue-500 mr-2">⛽</span>
                      Distribuição por Tipo
                    </h4>
                    <div className="h-48 flex items-center justify-center">
                      <div className="text-center w-full">
                        <div className="flex justify-center mb-4">
                          <div className="relative w-32 h-32">
                            <div
                              className="w-full h-full rounded-full"
                              style={{
                                background:
                                  "conic-gradient(#3b82f6 0% 65%, #22c55e 65% 85%, #eab308 85% 100%)",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-sm text-gray-950">
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                            <span>Diesel (65%)</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                            <span>Gasolina (20%)</span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                            <span>Diesel Premium (15%)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Despesas por Categoria */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-gray-950">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-purple-500 mr-2">📊</span>
                      Despesas de Expediente
                    </h4>
                    <div className="h-48 space-y-3">
                      {[
                        {
                          category: "Alimentação",
                          amount: 12500,
                          color: "bg-blue-500",
                          percentage: 45,
                        },
                        {
                          category: "Portagens",
                          amount: 8200,
                          color: "bg-green-500",
                          percentage: 30,
                        },
                        {
                          category: "Manutenção",
                          amount: 4500,
                          color: "bg-orange-500",
                          percentage: 16,
                        },
                        {
                          category: "Alojamento",
                          amount: 2800,
                          color: "bg-purple-500",
                          percentage: 9,
                        },
                      ].map((item, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{item.category}</span>
                            <span className="font-medium">
                              {item.amount.toLocaleString()} MT
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

                  {/* Gráfico de Eficiência por Motorista */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-gray-950">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-green-500 mr-2">⭐</span>
                      Eficiência por Motorista
                    </h4>
                    <div className="h-48 space-y-3">
                      {[
                        {
                          driver: "João Maputo",
                          efficiency: 94,
                          color: "bg-green-500",
                        },
                        {
                          driver: "Carlos Beira",
                          efficiency: 87,
                          color: "bg-green-400",
                        },
                        {
                          driver: "António Nampula",
                          efficiency: 82,
                          color: "bg-yellow-500",
                        },
                        {
                          driver: "Miguel Pemba",
                          efficiency: 76,
                          color: "bg-orange-500",
                        },
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{item.driver}</span>
                            <span className="font-medium">
                              {item.efficiency}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${item.color}`}
                              style={{ width: `${item.efficiency}%` }}
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
                      Consumo Médio
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      3,5 km/L
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600 font-medium">
                      Custo Mensal
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      265.000 MT
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <p className="text-sm text-orange-600 font-medium">
                      Despesas Exped.
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      28.000 MT
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-600 font-medium">
                      Economia/Mês
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      15.500 MT
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
                        Veículo
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Toda a Frota</option>
                        <option>MB-1234-AB</option>
                        <option>MB-5678-CD</option>
                        <option>MB-9012-EF</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Motorista
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos</option>
                        <option>João Maputo</option>
                        <option>Carlos Beira</option>
                        <option>António Nampula</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Combustível
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950">
                        <option>Todos</option>
                        <option>Diesel</option>
                        <option>Gasolina</option>
                        <option>Diesel Premium</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-4">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                      Limpar Filtros
                    </button>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">
                      Aplicar Filtros
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Relatórios */}
        {activeCombustivelForm === "relatorios" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            {/* Cabeçalho */}
            <div className="p-4 border-b border-gray-200 bg-rose-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-rose-500 text-white p-2 rounded-lg mr-2">
                  💸
                </span>
                Relatórios - Combustível e Expedientes
              </h3>
            </div>

            {/* Conteúdo */}
            <div className="p-6">
              {/* Botões de Atalhos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <button className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                  <div className="text-blue-600 text-lg mb-2">🧾</div>
                  <p className="font-medium text-gray-900">
                    Relatório de Despesas
                  </p>
                  <p className="text-sm text-gray-600">
                    Detalhado por período
                  </p>
                </button>

                <button className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                  <div className="text-blue-600 text-lg mb-2">📊</div>
                  <p className="font-medium text-gray-900">
                    Análise Financeira
                  </p>
                  <p className="text-sm text-gray-600">
                    Por categoria e centro de custo
                  </p>
                </button>

                <button className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                  <div className="text-blue-600 text-lg mb-2">🏷️</div>
                  <p className="font-medium text-gray-900">
                    Despesas Fixas
                  </p>
                  <p className="text-sm text-gray-600">
                    Pagamentos recorrentes
                  </p>
                </button>

                <button className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                  <div className="text-blue-600 text-lg mb-2">💰</div>
                  <p className="font-medium text-gray-900">
                    Custos Operacionais
                  </p>
                  <p className="text-sm text-gray-600">
                    Resumo geral de gastos
                  </p>
                </button>
              </div>

              {/* Filtros de Relatório */}
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
                      <option>Despesas Gerais</option>
                      <option>Custos Operacionais</option>
                      <option>Despesas Fixas</option>
                      <option>Financeiro por Categoria</option>
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

                <button className="mt-4 px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 font-medium">
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