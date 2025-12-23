import React from 'react'

function PoliticaAcessoControle() {
  return (
    <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-sm text-gray-900">
      {/* Cabeçalho */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-lg mr-3">🔐</span>
          Política de Acesso e Controle de Permissões
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Critérios, modelos e procedimentos para concessão, manutenção, revisão e revogação de acessos ao sistema
        </p>
      </div>

      {/* Conteúdo com scroll */}
      <div className="flex-1 overflow-y-auto max-h-[900px]">
        <div className="p-6 space-y-8">
          {/* Introdução */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-blue-600 text-lg">📋</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Introdução</h3>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                Esta política define os critérios, modelos e procedimentos para concessão, manutenção, revisão e revogação de 
                acessos ao sistema, garantindo que cada usuário tenha acesso apenas às informações estritamente necessárias ao 
                desempenho de suas funções.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded border border-blue-100">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                    Princípios Fundamentais
                  </h4>
                  <p className="text-sm text-gray-700">
                    Controle de acesso baseado em funções (RBAC) e atributos (ABAC) para máxima segurança
                  </p>
                </div>
                <div className="bg-white p-4 rounded border border-purple-100">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="w-4 h-4 bg-purple-500 rounded-full mr-2"></span>
                    Conformidade
                  </h4>
                  <p className="text-sm text-gray-700">
                    Em conformidade com os princípios de segurança da informação e proteção de dados
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-2 text-center">OBJETIVO DA POLÍTICA</h4>
                <p className="text-gray-700 text-center">
                  Reduzir riscos de acesso indevido, facilitar auditorias e garantir o princípio do 
                  <strong> &quot;menor privilégio necessário&quot;</strong> para todas as funções do sistema.
                </p>
              </div>
            </div>
          </section>

          {/* 1.1. Modelo RBAC */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-green-600 text-lg">👥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.1. Modelo RBAC (Role-Based Access Control)</h3>
            </div>

            <div className="mb-4 p-3 bg-green-50 rounded border border-green-200">
              <p className="text-sm text-gray-700 text-center">
                O sistema adota o modelo de Controle de Acesso Baseado em Funções (RBAC), no qual as permissões são atribuídas 
                de acordo com o papel exercido pelo usuário.
              </p>
            </div>

            {/* 1.1.1. Funções do Sistema */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.1.1
                </span>
                Funções do Sistema
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">👑</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Administrador do Sistema</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Acesso completo a todas as funcionalidades, dados e configurações, incluindo gestão de usuários e permissões.
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">🔍</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Auditor de Segurança</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Acesso exclusivo a logs, relatórios de auditoria e ferramentas de monitoramento, sem permissão para alterar dados operacionais.
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">🛠️</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Operador de Suporte</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Acesso limitado para resolução de problemas técnicos, sem acesso a dados sensíveis.
                  </p>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">🚦</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Fiscal de Trânsito</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Acesso a informações relacionadas à fiscalização rodoviária e conformidade de trânsito.
                  </p>
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">📦</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Fiscal Aduaneiro</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Acesso a dados necessários para controle aduaneiro e fiscalização de cargas.
                  </p>
                </div>

                <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">🏛️</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Fiscal Municipal</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Acesso restrito a informações relacionadas a licenciamento e regulamentação municipal.
                  </p>
                </div>

                <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">🚚</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Gestor de Transportadora</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Acesso aos dados operacionais exclusivamente da sua própria empresa.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">👨‍✈️</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Motorista</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Acesso restrito apenas aos seus dados pessoais, profissionais e de viagens.
                  </p>
                </div>
              </div>
            </div>

            {/* 1.1.2. Matriz de Permissões */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.1.2
                </span>
                Matriz de Permissões
              </h4>
              
              <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
                <p className="text-sm text-gray-700 text-center">
                  A matriz de permissões define claramente o nível de acesso por função
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2 text-left font-bold bg-gray-200">Função</th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-bold bg-blue-100">Motorista</th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-bold bg-green-100">Veículo</th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-bold bg-purple-100">Carga</th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-bold bg-yellow-100">Logs</th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-bold bg-red-100">Configurações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-gray-50">Administrador</td>
                      <td className="border border-gray-300 px-3 py-2 bg-blue-50 text-center font-bold text-green-600">Leitura / Escrita</td>
                      <td className="border border-gray-300 px-3 py-2 bg-green-50 text-center font-bold text-green-600">Leitura / Escrita</td>
                      <td className="border border-gray-300 px-3 py-2 bg-purple-50 text-center font-bold text-green-600">Leitura / Escrita</td>
                      <td className="border border-gray-300 px-3 py-2 bg-yellow-50 text-center font-bold text-green-600">Leitura / Escrita</td>
                      <td className="border border-gray-300 px-3 py-2 bg-red-50 text-center font-bold text-green-600">Leitura / Escrita</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-semibold">Fiscal de Trânsito</td>
                      <td className="border border-gray-300 px-3 py-2 bg-blue-50 text-center font-bold text-blue-600">Leitura Limitada</td>
                      <td className="border border-gray-300 px-3 py-2 bg-green-50 text-center font-bold text-green-600">Leitura Completa</td>
                      <td className="border border-gray-300 px-3 py-2 bg-purple-50 text-center font-bold text-blue-600">Leitura Básica</td>
                      <td className="border border-gray-300 px-3 py-2 bg-yellow-50 text-center text-gray-500">Nenhum</td>
                      <td className="border border-gray-300 px-3 py-2 bg-red-50 text-center text-gray-500">Nenhum</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold">Fiscal Aduaneiro</td>
                      <td className="border border-gray-300 px-3 py-2 bg-blue-50 text-center font-bold text-blue-600">Leitura Básica</td>
                      <td className="border border-gray-300 px-3 py-2 bg-green-50 text-center font-bold text-blue-600">Leitura Básica</td>
                      <td className="border border-gray-300 px-3 py-2 bg-purple-50 text-center font-bold text-green-600">Leitura Completa</td>
                      <td className="border border-gray-300 px-3 py-2 bg-yellow-50 text-center text-gray-500">Nenhum</td>
                      <td className="border border-gray-300 px-3 py-2 bg-red-50 text-center text-gray-500">Nenhum</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-semibold">Gestor Transportes</td>
                      <td className="border border-gray-300 px-3 py-2 bg-blue-50 text-center font-bold text-green-600">Leitura / Escrita</td>
                      <td className="border border-gray-300 px-3 py-2 bg-green-50 text-center font-bold text-green-600">Leitura / Escrita</td>
                      <td className="border border-gray-300 px-3 py-2 bg-purple-50 text-center font-bold text-green-600">Leitura / Escrita</td>
                      <td className="border border-gray-300 px-3 py-2 bg-yellow-50 text-center font-bold text-blue-600">Leitura Limitada</td>
                      <td className="border border-gray-300 px-3 py-2 bg-red-50 text-center text-gray-500">Nenhum</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </section>

          {/* 1.2. Processo de Provisionamento */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-orange-600 text-lg">🔄</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.2. Processo de Provisionamento</h3>
            </div>

            <div className="mb-6">
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-200">
                <p className="text-gray-700 leading-relaxed">
                  O ciclo de vida dos acessos é rigorosamente controlado para evitar permissões excessivas ou obsoletas.
                </p>
              </div>
            </div>

            {/* 1.2.1. Novo Acesso */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.2.1
                </span>
                Novo Acesso
              </h4>
              
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700 mb-4 text-center">
                  A concessão de novos acessos segue um processo formal e auditável:
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Solicitação Formal</h5>
                      <p className="text-sm text-gray-700">
                        Realizada por superior hierárquico ou autoridade competente
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Avaliação de Necessidade</h5>
                      <p className="text-sm text-gray-700">
                        Pelo Security Officer (Responsável pela Segurança)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Aprovação DPO</h5>
                      <p className="text-sm text-gray-700">
                        Pelo Data Protection Officer (Responsável pela Proteção de Dados)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Atribuição Mínima</h5>
                      <p className="text-sm text-gray-700">
                        Apenas das permissões mínimas necessárias para a função
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-sm font-bold">5</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Treinamento Obrigatório</h5>
                      <p className="text-sm text-gray-700">
                        Sobre políticas de uso aceitável e segurança
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-sm font-bold">6</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Assinatura de Termo</h5>
                      <p className="text-sm text-gray-700">
                        Termo de responsabilidade e confidencialidade
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 1.2.2. Alteração de Acessos */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.2.2
                </span>
                Alteração de Acessos
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-green-200 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">📅</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Revisão Periódica</h4>
                      <p className="text-xs text-gray-600">Controle Contínuo</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Revisão trimestral obrigatória de privilégios
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Solicitação formal documentada para qualquer alteração
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">✅</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Aprovações</h4>
                      <p className="text-xs text-gray-600">Controle Duplo</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Aprovação de pelo menos dois gestores responsáveis
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Registro detalhado de todas as alterações realizadas
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Notificação formal ao usuário sobre mudanças aplicadas
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 1.2.3. Desaprovisionamento */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.2.3
                </span>
                Desaprovisionamento
              </h4>
              
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border border-red-200">
                <div className="text-center mb-4">
                  <h4 className="font-bold text-gray-800 text-lg">REVOGAÇÃO IMEDIATA</h4>
                  <p className="text-sm text-gray-700">A revogação de acessos ocorre de forma imediata e segura</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">!</span>
                      <span className="font-semibold">Desativação Imediata</span>
                    </div>
                    <p className="text-xs text-gray-700">
                      Em caso de desligamento, transferência ou término de vínculo
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">💾</span>
                      <span className="font-semibold">Preservação de Logs</span>
                    </div>
                    <p className="text-xs text-gray-700">
                      Backup dos logs de atividades do usuário
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">🔑</span>
                      <span className="font-semibold">Eliminação de Credenciais</span>
                    </div>
                    <p className="text-xs text-gray-700">
                      Revogação de credenciais, tokens e certificados
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">✓</span>
                      <span className="font-semibold">Confirmação Formal</span>
                    </div>
                    <p className="text-xs text-gray-700">
                      Confirmação formal da desativação
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 1.3. Controle de Acesso para QR Codes */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-purple-600 text-lg">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.3. Controle de Acesso para QR Codes</h3>
            </div>

            {/* 1.3.1. Hierarquia de Informações */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.3.1
                </span>
                Hierarquia de Informações
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">1</span>
                    </div>
                  </div>
                  <h5 className="font-bold text-gray-800 text-center mb-2">Nível 1 (Público)</h5>
                  <p className="text-sm text-gray-700 text-center">
                    Status básico da viagem e matrícula do veículo
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">2</span>
                    </div>
                  </div>
                  <h5 className="font-bold text-gray-800 text-center mb-2">Nível 2 (Fiscais)</h5>
                  <p className="text-sm text-gray-700 text-center">
                    Dados completos do veículo
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">3</span>
                    </div>
                  </div>
                  <h5 className="font-bold text-gray-800 text-center mb-2">Nível 3 (Autoridades)</h5>
                  <p className="text-sm text-gray-700 text-center">
                    Informações do motorista e da carga
                  </p>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">4</span>
                    </div>
                  </div>
                  <h5 className="font-bold text-gray-800 text-center mb-2">Nível 4 (Administrativo)</h5>
                  <p className="text-sm text-gray-700 text-center">
                    Acesso integral a todos os dados
                  </p>
                </div>
              </div>
            </div>

            {/* 1.3.2. Validação de Contexto */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.3.2
                </span>
                Validação de Contexto
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">📍</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Localização</h4>
                      <p className="text-xs text-gray-600">Contexto Geográfico</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Determina quais autoridades podem acessar determinados dados com base na localização geográfica
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">🕒</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Horário</h4>
                      <p className="text-xs text-gray-600">Controle Temporal</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Restringe o acesso a dados sensíveis fora de horários autorizados e programados
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">🚨</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Emergência</h4>
                      <p className="text-xs text-gray-600">Situações Críticas</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Permite ampliação temporária de acesso em situações críticas e de emergência
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">🔓</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Autorização Especial</h4>
                      <p className="text-xs text-gray-600">Acessos Temporários</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Concedida para investigações ou auditorias específicas com tempo limitado
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 1.4. Gestão de Credenciais */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-yellow-600 text-lg">🔑</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.4. Gestão de Credenciais</h3>
            </div>

            {/* 1.4.1. Senhas */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-yellow-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.4.1
                </span>
                Senhas
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h5 className="font-bold text-gray-800 mb-2 flex items-center">
                    <span className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></span>
                    Requisitos de Complexidade
                  </h5>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-yellow-500 mr-2">•</span>
                      Mínimo de 9 caracteres para contas administrativas
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-500 mr-2">•</span>
                      Exigência de complexidade (maiúsculas, minúsculas, números e símbolos)
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-500 mr-2">•</span>
                      Proibição de reutilização das últimas 5 senhas
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h5 className="font-bold text-gray-800 mb-2 flex items-center">
                    <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                    Armazenamento Seguro
                  </h5>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Técnicas de hash e salt para proteção
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Armazenamento criptografado em repouso
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Transmissão segura via protocolos TLS/SSL
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 1.4.2. Tokens e Certificados */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-yellow-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.4.2
                </span>
                Tokens e Certificados
              </h4>
              
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">📄</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Certificados Digitais</h4>
                        <p className="text-xs text-gray-600">Para Autoridades</p>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        Uso obrigatório para autoridades fiscalizadoras
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        Emissão por Autoridade Certificadora reconhecida
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">⏱️</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Tokens de Acesso</h4>
                        <p className="text-xs text-gray-600">Tempo Limitado</p>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        Tempo de vida limitado (máximo 24h)
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        Revogação imediata em caso de suspeita
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        Renovação periódica obrigatória
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 1.5. Controle de Acesso Baseado em Atributos */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-teal-600 text-lg">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.5. Controle de Acesso Baseado em Atributos (ABAC)</h3>
            </div>

            <div className="mb-6 bg-teal-50 p-4 rounded-lg border border-teal-200">
              <p className="text-gray-700 text-center">
                Além do RBAC, o sistema adota ABAC (Attribute-Based Access Control) para decisões mais dinâmicas e contextuais
              </p>
            </div>

            {/* 1.5.1. Atributos Considerados */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-teal-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.5.1
                </span>
                Atributos Considerados
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">👤</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Papel do Usuário</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Função e nível hierárquico no sistema
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">📍</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Localização Geográfica</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Localização do acesso e área de jurisdição
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">🕒</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Horário do Acesso</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Tempo e período da solicitação de acesso
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">📱</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Tipo de Dispositivo</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Nível de segurança e tipo do dispositivo utilizado
                  </p>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">🎯</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Contexto da Operação</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Finalidade declarada e contexto operacional
                  </p>
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">🔒</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Nível de Segurança</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Classificação de segurança dos dados acessados
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 1.6. Monitoramento de Acessos */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-red-600 text-lg">👁️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.6. Monitoramento de Acessos</h3>
            </div>

            {/* 1.6.1. Logs Obrigatórios */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.6.1
                </span>
                Logs Obrigatórios
              </h4>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-gray-700 mb-4 text-center">
                  Todos os acessos e ações são registrados com as seguintes informações:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <h5 className="font-semibold text-gray-800 mb-2">Identificação</h5>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Identificação do usuário</li>
                      <li>• Endereço IP do acesso</li>
                      <li>• Tipo de dispositivo utilizado</li>
                    </ul>
                  </div>

                  <div className="bg-white p-3 rounded border border-gray-200">
                    <h5 className="font-semibold text-gray-800 mb-2">Operação</h5>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Data e hora do acesso</li>
                      <li>• Tipo de ação realizada</li>
                      <li>• Dados acessados ou modificados</li>
                    </ul>
                  </div>

                  <div className="bg-white p-3 rounded border border-gray-200">
                    <h5 className="font-semibold text-gray-800 mb-2">Resultado</h5>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Resultado da ação (sucesso ou falha)</li>
                      <li>• Código de status da operação</li>
                      <li>• Mensagens de erro (se aplicável)</li>
                    </ul>
                  </div>

                  <div className="bg-white p-3 rounded border border-gray-200">
                    <h5 className="font-semibold text-gray-800 mb-2">Contexto</h5>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Localização geográfica</li>
                      <li>• Nível de autorização utilizado</li>
                      <li>• Session ID e token utilizado</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 1.6.2. Alertas Automáticos */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.6.2
                </span>
                Alertas Automáticos
              </h4>
              
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-gray-700 mb-4 text-center font-semibold">
                  O sistema gera alertas automáticos para situações de risco:
                </p>

                <div className="space-y-3">
                  <div className="flex items-start bg-white p-3 rounded border border-yellow-200">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white text-sm">⚠️</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Múltiplas Falhas de Autenticação</h5>
                      <p className="text-sm text-gray-700">
                        Alerta após 3 tentativas consecutivas com falha
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start bg-white p-3 rounded border border-yellow-200">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white text-sm">🌙</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Acessos Fora do Horário Habitual</h5>
                      <p className="text-sm text-gray-700">
                        Alerta para acessos em horários atípicos para o perfil do usuário
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start bg-white p-3 rounded border border-yellow-200">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white text-sm">📍</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Acessos Simultâneos Distintos</h5>
                      <p className="text-sm text-gray-700">
                        Alerta para acessos do mesmo usuário de localizações geográficas distintas
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start bg-white p-3 rounded border border-yellow-200">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white text-sm">🔍</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Padrões de Acesso Suspeitos</h5>
                      <p className="text-sm text-gray-700">
                        Alerta para comportamentos anômalos baseados em análise de padrões
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start bg-white p-3 rounded border border-yellow-200">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white text-sm">🚫</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Tentativas de Acesso Restrito</h5>
                      <p className="text-sm text-gray-700">
                        Alerta para tentativas de acesso a dados fora do escopo de permissões
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Resumo e Conclusão */}
          <section className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-lg">✅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Resumo da Política</h3>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-2">GARANTIAS DE SEGURANÇA</h4>
                <p className="text-gray-700">
                  Controle de acesso rigoroso baseado no princípio do menor privilégio necessário
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-xl">👥</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Controle Baseado em Funções</h5>
                  </div>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    <li>RBAC para permissões estruturadas</li>
                    <li>Matriz de permissões claramente definida</li>
                    <li>8 funções principais com escopos específicos</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-xl">🎯</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Controle Baseado em Atributos</h5>
                  </div>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    <li>ABAC para decisões contextuais</li>
                    <li>6 atributos principais considerados</li>
                    <li>Validação dinâmica em tempo real</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-xl">👁️</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Monitoramento Completo</h5>
                  </div>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    <li>Logs detalhados de todas as ações</li>
                    <li>Alertas automáticos para situações de risco</li>
                    <li>Auditoria completa e rastreável</li>
                  </ul>
                </div>
              </div>

              {/* Indicadores de Conformidade */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-bold text-gray-800 mb-3 text-center">INDICADORES DE CONFORMIDADE</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-3 rounded border border-gray-200 text-center">
                    <p className="text-2xl font-bold text-green-600">100%</p>
                    <p className="text-sm text-gray-700">Logs de acesso</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200 text-center">
                    <p className="text-2xl font-bold text-blue-600">8</p>
                    <p className="text-sm text-gray-700">Funções RBAC</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200 text-center">
                    <p className="text-2xl font-bold text-purple-600">6</p>
                    <p className="text-sm text-gray-700">Atributos ABAC</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200 text-center">
                    <p className="text-2xl font-bold text-red-600">24/7</p>
                    <p className="text-sm text-gray-700">Monitoramento</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-center">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Política de Acesso e Controle de Permissões</strong>
              </p>
              <p className="text-xs text-gray-600">
                Documento versão 1.0 | Última atualização: {new Date().toLocaleDateString('pt-MZ')}
              </p>
              <div className="mt-4 flex justify-center space-x-4">
                <div className="text-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-sm">👑</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Security Officer</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-sm">🔒</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Data Protection Officer</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-sm">📋</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Compliance Officer</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PoliticaAcessoControle