import React from 'react'

function PoliticaRetencaoEliminacaoDados() {
  return (
    <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-sm text-gray-900">
      {/* Cabeçalho */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-2 rounded-lg mr-3">🗄️</span>
          Política de Retenção e Eliminação de Dados
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Critérios, prazos, métodos e responsabilidades para retenção, arquivamento e eliminação segura de dados
        </p>
      </div>

      {/* Conteúdo com scroll */}
      <div className="flex-1 overflow-y-auto max-h-[900px]">
        <div className="p-6 space-y-8">
          {/* Introdução */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-indigo-600 text-lg">📋</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Introdução e Princípios</h3>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                Esta Política estabelece os critérios, prazos, métodos e responsabilidades relacionados à retenção, 
                arquivamento e eliminação de dados tratados pelo sistema.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white p-4 rounded border border-indigo-100">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="w-4 h-4 bg-indigo-500 rounded-full mr-2"></span>
                    Conformidade Legal
                  </h4>
                  <p className="text-sm text-gray-700">
                    Garantir conformidade com legislação de proteção de dados e regulamentações setoriais
                  </p>
                </div>
                <div className="bg-white p-4 rounded border border-blue-100">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                    Proteção de Dados
                  </h4>
                  <p className="text-sm text-gray-700">
                    Aplicar princípio de minimização e limitação de armazenamento de dados pessoais
                  </p>
                </div>
                <div className="bg-white p-4 rounded border border-purple-100">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="w-4 h-4 bg-purple-500 rounded-full mr-2"></span>
                    Preservação Histórica
                  </h4>
                  <p className="text-sm text-gray-700">
                    Manter informações relevantes para fins históricos, estatísticos e regulatórios
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 1.1. Períodos de Retenção */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-blue-600 text-lg">⏱️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.1. Períodos de Retenção</h3>
            </div>

            <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
              <p className="text-sm text-gray-700 text-center">
                Os dados são mantidos apenas pelo tempo necessário para cumprir suas finalidades operacionais, 
                legais ou estatísticas, respeitando o princípio da limitação de armazenamento.
              </p>
            </div>

            {/* 1.1.1. Dados Operacionais Ativos */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.1.1
                </span>
                Dados Operacionais Ativos
              </h4>
              
              <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-200 mb-4">
                <p className="text-sm text-gray-700">
                  Incluem dados necessários para a operação regular do sistema:
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2 text-left w-2/5">Categoria de Dados</th>
                      <th className="border border-gray-300 px-3 py-2 text-left w-2/5">Descrição</th>
                      <th className="border border-gray-300 px-3 py-2 text-left w-1/5">Período de Retenção</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-blue-50">
                        Dados de motoristas ativos
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        Informações de identificação e qualificação de motoristas
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-bold">
                          5 anos após término
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-green-50">
                        Dados de veículos ativos
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        Informações técnicas e operacionais de veículos
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-bold">
                          7 anos após desativação
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-yellow-50">
                        Dados de cargas em trânsito
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        Informações sobre cargas durante transporte
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm font-bold">
                          3 anos após conclusão
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-purple-50">
                        Histórico de viagens
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        Registros completos de todas as viagens realizadas
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded text-sm font-bold">
                          7 anos
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-red-50">
                        Logs de fiscalização
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        Registros de operações de fiscalização e controle
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded text-sm font-bold">
                          10 anos
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 1.1.2. Dados para Conformidade Legal */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.1.2
                </span>
                Dados para Conformidade Legal
              </h4>
              
              <div className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-lg border border-purple-200 mb-4">
                <p className="text-sm text-gray-700">
                  Incluem dados cuja retenção é exigida por legislação ou regulamentos aplicáveis:
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2 text-left w-2/5">Categoria de Dados</th>
                      <th className="border border-gray-300 px-3 py-2 text-left w-2/5">Base Legal/Regulatória</th>
                      <th className="border border-gray-300 px-3 py-2 text-left w-1/5">Período de Retenção</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-blue-50">
                        Registros fiscais
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        Legislação tributária vigente
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-bold">
                          10 anos
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-red-50">
                        Dados de acidentes
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        Relevância legal, histórica e segurança pública
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded text-sm font-bold">
                          Permanente
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-yellow-50">
                        Histórico de multas
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        Fins legais e administrativos
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm font-bold">
                          10 anos
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-green-50">
                        Documentos de seguro
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        Exigências contratuais e legais
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-bold">
                          10 anos após expiração
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 1.1.3. Dados para Pesquisa e Estatística */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.1.3
                </span>
                Dados para Pesquisa e Estatística
              </h4>
              
              <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-200 mb-4">
                <p className="text-sm text-gray-700">
                  Dados utilizados para análise de longo prazo e planejamento setorial:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">👤</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Dados Anonimizados</h4>
                      <p className="text-xs text-gray-600">Proteção de Identidade</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    Podem ser mantidos indefinidamente, desde que não permitam reidentificação.
                  </p>
                  <div className="text-center mt-3">
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-bold">
                      Indefinido
                    </span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">📊</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Estatísticas Agregadas</h4>
                      <p className="text-xs text-gray-600">Análise Histórica</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    Retidas por 20 anos, para análise histórica e planejamento estratégico.
                  </p>
                  <div className="text-center mt-3">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-bold">
                      20 anos
                    </span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">📈</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Tendências Setoriais</h4>
                      <p className="text-xs text-gray-600">Planejamento Estratégico</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    Mantidas por 15 anos, apoiando políticas públicas e decisões estratégicas.
                  </p>
                  <div className="text-center mt-3">
                    <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded text-sm font-bold">
                      15 anos
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 1.2. Classificação por Criticidade */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-orange-600 text-lg">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.2. Classificação por Criticidade</h3>
            </div>

            <div className="mb-6 bg-orange-50 p-4 rounded-lg border border-orange-200">
              <p className="text-gray-700 text-center">
                A retenção dos dados considera seu nível de criticidade e impacto
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Dados Críticos */}
              <div className="bg-gradient-to-r from-red-50 to-white p-4 rounded-lg border border-red-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🔥</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Dados Críticos</h4>
                    <p className="text-xs text-gray-600">Retenção Longa</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Dados de alta relevância legal e institucional:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Registros de acidentes com vítimas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Histórico de fraudes comprovadas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Decisões judiciais relacionadas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Relatórios de auditorias de conformidade</span>
                  </li>
                </ul>
                <div className="mt-4 text-center">
                  <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded text-sm font-bold">
                    10+ anos
                  </span>
                </div>
              </div>

              {/* Dados Operacionais */}
              <div className="bg-gradient-to-r from-yellow-50 to-white p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">⚙️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Dados Operacionais</h4>
                    <p className="text-xs text-gray-600">Retenção Média</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Dados essenciais para operação e avaliação do sistema:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Histórico de viagens</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Dados de manutenção de veículos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Registros de carga</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Avaliações de desempenho operacional</span>
                  </li>
                </ul>
                <div className="mt-4 text-center">
                  <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm font-bold">
                    5-10 anos
                  </span>
                </div>
              </div>

              {/* Dados Temporários */}
              <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">⏳</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Dados Temporários</h4>
                    <p className="text-xs text-gray-600">Retenção Curta</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Dados de suporte técnico e funcionamento do sistema:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Logs de sistema (exceto segurança)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Caches operacionais</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Dados de sessão de usuários</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Backups intermediários e temporários</span>
                  </li>
                </ul>
                <div className="mt-4 text-center">
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-bold">
                    ≤ 1 ano
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* 1.3. Processo de Eliminação */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-red-600 text-lg">🗑️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.3. Processo de Eliminação</h3>
            </div>

            <div className="mb-6 bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-gray-700 text-center">
                A eliminação de dados ocorre de forma controlada, auditável e segura
              </p>
            </div>

            {/* 1.3.1. Eliminação Programada */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.3.1
                </span>
                Eliminação Programada
              </h4>
              
              <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700 mb-4 text-center">
                  Eliminação automática após o término do período de retenção
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Identificação</h5>
                      <p className="text-sm text-gray-700">
                        Identificação de dados com retenção expirada por sistemas automatizados
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Notificação</h5>
                      <p className="text-sm text-gray-700">
                        Notificação ao responsável pelos dados sobre eliminação programada
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Período de Contestação</h5>
                      <p className="text-sm text-gray-700">
                        Período de 30 dias para contestação ou solicitação de retenção adicional
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Backup para Arquivo Morto</h5>
                      <p className="text-sm text-gray-700">
                        Backup final para arquivo morto, quando aplicável e autorizado
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-sm font-bold">5</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Eliminação Segura</h5>
                      <p className="text-sm text-gray-700">
                        Eliminação segura dos dados ativos utilizando métodos aprovados
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-sm font-bold">6</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Confirmação e Registro</h5>
                      <p className="text-sm text-gray-700">
                        Confirmação formal e registro detalhado da eliminação realizada
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 1.3.2. Eliminação por Solicitação */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.3.2
                </span>
                Eliminação por Solicitação
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">📝</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Processo Inicial</h4>
                      <p className="text-xs text-gray-600">Solicitação e Validação</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Recebimento de solicitação formal do titular
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Verificação de elegibilidade para eliminação
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Análise de obrigações legais que impeçam eliminação
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">✅</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Processo Final</h4>
                      <p className="text-xs text-gray-600">Execução e Confirmação</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Anonimização quando eliminação total não for possível
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Eliminação dos dados elegíveis com métodos seguros
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Confirmação formal ao solicitante dentro de 30 dias
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 1.3.3. Eliminação por Descontinuação */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.3.3
                </span>
                Eliminação por Descontinuação
              </h4>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                <div className="text-center mb-4">
                  <h4 className="font-bold text-gray-800 text-lg">ENGAJAMENTO COM USUÁRIOS</h4>
                  <p className="text-sm text-gray-700">Aplicável em caso de encerramento do sistema ou serviço</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start bg-white p-3 rounded border border-purple-200">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white text-sm">📢</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Notificação Prévia</h5>
                      <p className="text-sm text-gray-700">
                        Notificação com 180 dias de antecedência aos usuários afetados
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start bg-white p-3 rounded border border-purple-200">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white text-sm">💾</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Período de Exportação</h5>
                      <p className="text-sm text-gray-700">
                        Período de 90 dias para exportação de dados pelos usuários
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start bg-white p-3 rounded border border-purple-200">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white text-sm">📦</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Backup Final</h5>
                      <p className="text-sm text-gray-700">
                        Backup final completo dos sistemas para arquivo histórico
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start bg-white p-3 rounded border border-purple-200">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white text-sm">🔄</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Eliminação Gradual</h5>
                      <p className="text-sm text-gray-700">
                        Eliminação gradual por categorias de dados, iniciando pelos menos críticos
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 1.4. Métodos de Eliminação Segura */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-gray-600 text-lg">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.4. Métodos de Eliminação Segura</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1.4.1. Dados Digitais */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-gray-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                    1.4.1
                  </span>
                  Dados Digitais
                </h4>
                
                <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700 mb-3">
                    A eliminação digital segue padrões reconhecidos de segurança:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-white text-sm">🔄</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Sobrescrita Múltipla</h5>
                        <p className="text-sm text-gray-700">
                          Mínimo de 3 ciclos de sobrescrita com padrões aleatórios
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-white text-sm">🧲</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Desmagnetização</h5>
                        <p className="text-sm text-gray-700">
                          Para mídias magnéticas usando equipamentos certificados
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-white text-sm">⚙️</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Trituração Física</h5>
                        <p className="text-sm text-gray-700">
                          Trituração física de HDs e SSDs com certificação de destruição
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-white text-sm">🔑</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Eliminação Criptográfica</h5>
                        <p className="text-sm text-gray-700">
                          Destruição das chaves de criptografia para dados criptografados
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 1.4.2. Documentação Física */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-gray-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                    1.4.2
                  </span>
                  Documentação Física
                </h4>
                
                <div className="bg-gradient-to-r from-orange-50 to-white p-4 rounded-lg border border-orange-200">
                  <p className="text-sm text-gray-700 mb-3">
                    Para documentos em papel ou mídia física:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-white text-sm">✂️</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Fragmentação Cruzada</h5>
                        <p className="text-sm text-gray-700">
                          Fragmentação com partículas de até 2mm de tamanho
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-white text-sm">🔥</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Incineração Controlada</h5>
                        <p className="text-sm text-gray-700">
                          Incineração em instalações autorizadas e controladas
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-white text-sm">📄</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Certificação de Destruição</h5>
                        <p className="text-sm text-gray-700">
                          Processamento com emissão de certificado oficial de destruição
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-white text-sm">📸</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Registro Documental</h5>
                        <p className="text-sm text-gray-700">
                          Registro fotográfico e documental completo da destruição
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Padrões de Conformidade */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-bold text-gray-800 mb-3 text-center">PADRÕES DE CONFORMIDADE APLICADOS</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="font-bold text-gray-800">DoD 5220.22-M</p>
                  <p className="text-xs text-gray-600">Padrão Militar EUA</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="font-bold text-gray-800">NIST 800-88</p>
                  <p className="text-xs text-gray-600">Padrão Governamental</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="font-bold text-gray-800">ISO 27001</p>
                  <p className="text-xs text-gray-600">Segurança da Informação</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="font-bold text-gray-800">GDPR Art. 17</p>
                  <p className="text-xs text-gray-600">Direito ao Esquecimento</p>
                </div>
              </div>
            </div>
          </section>

          {/* 1.5. Arquivo Morto Digital */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-purple-600 text-lg">📦</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.5. Arquivo Morto Digital</h3>
            </div>

            {/* 1.5.1. Critérios para Arquivamento */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.5.1
                </span>
                Critérios para Arquivamento
              </h4>
              
              <div className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-lg border border-purple-200">
                <p className="text-sm text-gray-700 mb-3">
                  Dados podem ser transferidos para arquivo morto quando:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border border-purple-100">
                    <div className="flex items-center mb-2">
                      <span className="w-4 h-4 bg-purple-500 rounded-full mr-2"></span>
                      <span className="font-semibold">Retenção Legal Expirada</span>
                    </div>
                    <p className="text-xs text-gray-700">
                      Período de retenção legal ativa já foi cumprido
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border border-purple-100">
                    <div className="flex items-center mb-2">
                      <span className="w-4 h-4 bg-purple-500 rounded-full mr-2"></span>
                      <span className="font-semibold">Valor Histórico</span>
                    </div>
                    <p className="text-xs text-gray-700">
                      Dados possuem valor histórico ou estatístico comprovado
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border border-purple-100">
                    <div className="flex items-center mb-2">
                      <span className="w-4 h-4 bg-purple-500 rounded-full mr-2"></span>
                      <span className="font-semibold">Backups Descontinuados</span>
                    </div>
                    <p className="text-xs text-gray-700">
                      Backups de sistemas ou versões que foram descontinuados
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border border-purple-100">
                    <div className="flex items-center mb-2">
                      <span className="w-4 h-4 bg-purple-500 rounded-full mr-2"></span>
                      <span className="font-semibold">Documentação de Versões</span>
                    </div>
                    <p className="text-xs text-gray-700">
                      Documentação técnica de versões antigas do sistema
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 1.5.2. Características do Arquivo Morto */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.5.2
                </span>
                Características do Arquivo Morto
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">🔒</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Segurança e Isolamento</h4>
                      <p className="text-xs text-gray-600">Proteção Avançada</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Armazenamento offline ou em ambiente isolado
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Criptografia forte AES-256 dos dados armazenados
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Controle de acesso extremamente restrito
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">🔄</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Manutenção e Preservação</h4>
                      <p className="text-xs text-gray-600">Gestão Contínua</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Verificação periódica de integridade dos dados
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Plano de migração para novas tecnologias
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Monitoramento ambiental (temperatura, umidade)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 1.6. Exceções à Política */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-yellow-600 text-lg">⚠️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.6. Exceções à Política de Retenção</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1.6.1. Suspensão de Eliminação */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-yellow-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                    1.6.1
                  </span>
                  Suspensão de Eliminação
                </h4>
                
                <div className="bg-gradient-to-r from-yellow-50 to-white p-4 rounded-lg border border-yellow-200">
                  <p className="text-sm text-gray-700 mb-3">
                    A eliminação poderá ser suspensa quando houver:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-white text-xs">⚖️</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Investigação Criminal</h5>
                        <p className="text-sm text-gray-700">
                          Investigação criminal em curso envolvendo os dados
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-white text-xs">🏛️</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Processo Judicial Ativo</h5>
                        <p className="text-sm text-gray-700">
                          Processo judicial ativo que requeira preservação de evidências
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-white text-xs">🔍</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Auditoria Regulatória</h5>
                        <p className="text-sm text-gray-700">
                          Auditoria regulatória ou fiscal em andamento
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 1.6.2. Extensão de Retenção */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-yellow-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                    1.6.2
                  </span>
                  Extensão de Retenção
                </h4>
                
                <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-700 mb-3">
                    A retenção poderá ser estendida quando houver:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-white text-xs">⚔️</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Dados em Litígios</h5>
                        <p className="text-sm text-gray-700">
                          Dados envolvidos em litígios ou disputas legais
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-white text-xs">📋</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Determinação Judicial</h5>
                        <p className="text-sm text-gray-700">
                          Determinação judicial ou administrativa específica
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-white text-xs">🎓</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Relevância Histórica</h5>
                        <p className="text-sm text-gray-700">
                          Relevância histórica devidamente comprovada e documentada
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-blue-50 to-red-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-bold text-gray-800 mb-3 text-center">PROCESSO PARA EXCEÇÕES</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-blue-500 rounded-full mr-3"></span>
                  <span>Todas as exceções requerem aprovação formal do Data Protection Officer (DPO)</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                  <span>Exceções são registradas com justificativa detalhada e prazo definido</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-red-500 rounded-full mr-3"></span>
                  <span>Exceções são revisadas trimestralmente e canceladas quando não mais aplicáveis</span>
                </div>
              </div>
            </div>
          </section>

          {/* 1.7. Responsabilidades */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-indigo-600 text-lg">👥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.7. Responsabilidades</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Data Protection Officer */}
              <div className="bg-gradient-to-r from-indigo-50 to-white p-4 rounded-lg border border-indigo-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">👑</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Data Protection Officer (DPO)</h4>
                    <p className="text-xs text-gray-600">Supervisão Estratégica</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    Definir e revisar períodos de retenção
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    Aprovar exceções à política
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    Supervisionar processos de eliminação
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    Manter registros oficiais de retenção
                  </li>
                </ul>
              </div>

              {/* Administradores do Sistema */}
              <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">💻</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Administradores do Sistema</h4>
                    <p className="text-xs text-gray-600">Implementação Técnica</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Implementar controles técnicos de retenção
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Executar eliminações programadas
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Manter logs e evidências de eliminação
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Reportar inconformidades e incidentes
                  </li>
                </ul>
              </div>

              {/* Gestores de Dados */}
              <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">📊</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Gestores de Dados</h4>
                    <p className="text-xs text-gray-600">Gestão Operacional</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Classificar os dados sob sua responsabilidade
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Solicitar eliminações quando apropriado
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Responder às solicitações dos titulares
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Manter inventário de dados atualizado
                  </li>
                </ul>
              </div>
            </div>

            {/* Matriz de Responsabilidade */}
            <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-bold text-gray-800 mb-3 text-center">MATRIZ RACI</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 text-xs">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-2 py-1 text-left">Atividade</th>
                      <th className="border border-gray-300 px-2 py-1 text-left">DPO</th>
                      <th className="border border-gray-300 px-2 py-1 text-left">Admin Sistema</th>
                      <th className="border border-gray-300 px-2 py-1 text-left">Gestor Dados</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-2 py-1">Definir períodos retenção</td>
                      <td className="border border-gray-300 px-2 py-1 text-center font-bold text-indigo-600">R</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">C</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">I</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-2 py-1">Executar eliminação</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">A</td>
                      <td className="border border-gray-300 px-2 py-1 text-center font-bold text-blue-600">R</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">I</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-2 py-1">Classificar dados</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">A</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">C</td>
                      <td className="border border-gray-300 px-2 py-1 text-center font-bold text-green-600">R</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-2 py-1">Aprovar exceções</td>
                      <td className="border border-gray-300 px-2 py-1 text-center font-bold text-indigo-600">R</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">I</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">I</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-3 text-xs text-gray-600 flex justify-center space-x-4">
                <span>R = Responsável</span>
                <span>A = Aprovador</span>
                <span>C = Consultado</span>
                <span>I = Informado</span>
              </div>
            </div>
          </section>

          {/* Resumo e Métricas */}
          <section className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-lg">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Resumo e Métricas de Conformidade</h3>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-2">CONTROLE DE CICLO DE VIDA DE DADOS</h4>
                <p className="text-gray-700">
                  Gestão completa do ciclo de vida dos dados desde coleta até eliminação segura
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 text-center">
                  <p className="text-2xl font-bold text-indigo-600">3</p>
                  <p className="text-sm font-semibold text-gray-800">Categorias de Dados</p>
                  <p className="text-xs text-gray-600">Operacionais, Legais, Estatísticos</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
                  <p className="text-2xl font-bold text-blue-600">3</p>
                  <p className="text-sm font-semibold text-gray-800">Níveis de Criticidade</p>
                  <p className="text-xs text-gray-600">Crítico, Operacional, Temporário</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                  <p className="text-2xl font-bold text-green-600">4</p>
                  <p className="text-sm font-semibold text-gray-800">Métodos Eliminação</p>
                  <p className="text-xs text-gray-600">Sobrescrita, Desmagnetização, etc.</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 text-center">
                  <p className="text-2xl font-bold text-purple-600">100%</p>
                  <p className="text-sm font-semibold text-gray-800">Auditoria de Eliminação</p>
                  <p className="text-xs text-gray-600">Todas as eliminações são auditadas</p>
                </div>
              </div>

              {/* Fluxo do Ciclo de Vida */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-bold text-gray-800 mb-3 text-center">CICLO DE VIDA DOS DADOS</h4>
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white text-lg">📝</span>
                    </div>
                    <p className="text-sm font-semibold mt-2">Coleta</p>
                    <p className="text-xs text-gray-600">Aquisição de dados</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-gray-400">→</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white text-lg">💾</span>
                    </div>
                    <p className="text-sm font-semibold mt-2">Armazenamento</p>
                    <p className="text-xs text-gray-600">Retenção ativa</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-gray-400">→</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white text-lg">📦</span>
                    </div>
                    <p className="text-sm font-semibold mt-2">Arquivamento</p>
                    <p className="text-xs text-gray-600">Arquivo morto</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-gray-400">→</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white text-lg">🗑️</span>
                    </div>
                    <p className="text-sm font-semibold mt-2">Eliminação</p>
                    <p className="text-xs text-gray-600">Destruição segura</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-700 mb-4">
                  <strong>Esta política garante conformidade com legislação de proteção de dados e boas práticas internacionais</strong>
                </p>
                <div className="flex justify-center space-x-4">
                  <span className="text-xs bg-indigo-100 text-indigo-800 px-3 py-1 rounded">GDPR Compliance</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded">ISO 27001</span>
                  <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded">LGPD Brasil</span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded">NIST 800-88</span>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-center">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Política de Retenção e Eliminação de Dados</strong>
              </p>
              <p className="text-xs text-gray-600">
                Documento versão 1.0 | Última atualização: {new Date().toLocaleDateString('pt-MZ')} | 
                Próxima revisão: {new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('pt-MZ')}
              </p>
              <div className="mt-4 flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-8">
                <div className="text-center">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-sm">📋</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Retenção Legal</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-sm">🔒</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Eliminação Segura</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-sm">📊</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Auditoria Completa</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PoliticaRetencaoEliminacaoDados