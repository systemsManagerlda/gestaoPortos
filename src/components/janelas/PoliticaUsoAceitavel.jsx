import React from 'react'

function PoliticaUsoAceitavel() {
  return (
    <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-sm text-gray-900">
      {/* Cabeçalho */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-green-50">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-2 rounded-lg mr-3">📋</span>
          Política de Uso Aceitável
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Regras, responsabilidades e limitações para uso correto, seguro e legal da plataforma
        </p>
      </div>

      {/* Conteúdo com scroll */}
      <div className="flex-1 overflow-y-auto max-h-[900px]">
        <div className="p-6 space-y-8">
          {/* Introdução */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-blue-600 text-lg">🏛️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Introdução e Objetivo</h3>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                Esta Política de Uso Aceitável define as regras, responsabilidades e limitações aplicáveis a todos os usuários do sistema, 
                com o objetivo de garantir o uso correto, seguro e legal da plataforma.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white p-4 rounded border border-blue-100">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                    Proteção de Dados
                  </h4>
                  <p className="text-sm text-gray-700">
                    Garantir a segurança e privacidade das informações do sistema
                  </p>
                </div>
                <div className="bg-white p-4 rounded border border-green-100">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                    Integridade do Sistema
                  </h4>
                  <p className="text-sm text-gray-700">
                    Manter a disponibilidade e confiabilidade da plataforma
                  </p>
                </div>
                <div className="bg-white p-4 rounded border border-yellow-100">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></span>
                    Conformidade Legal
                  </h4>
                  <p className="text-sm text-gray-700">
                    Cumprir legislação e regulamentos aplicáveis
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 1.1. Usuários Autorizados */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-green-600 text-lg">👥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.1. Usuários Autorizados</h3>
            </div>

            <div className="mb-4 p-3 bg-green-50 rounded border border-green-200">
              <p className="text-sm text-gray-700 text-center">
                O acesso ao sistema é restrito a perfis previamente autorizados, cada um com permissões específicas, 
                de acordo com sua função institucional ou operacional.
              </p>
            </div>

            {/* 1.1.1. Autoridades Fiscalizadoras */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.1.1
                </span>
                Autoridades Fiscalizadoras
              </h4>
              
              <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-200 mb-4">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">👮</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Entidades Oficiais</h4>
                    <p className="text-xs text-gray-600">Polícia de Trânsito, Alfândegas, Fiscais, Órgãos Municipais</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border border-blue-100">
                    <h5 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      Uso Oficial Exclusivo
                    </h5>
                    <p className="text-sm text-gray-700">
                      O uso do sistema deve ocorrer exclusivamente para fins oficiais de fiscalização, 
                      inspeção e verificação legal.
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-blue-100">
                    <h5 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      Proibição de Compartilhamento
                    </h5>
                    <p className="text-sm text-gray-700">
                      É expressamente proibido o compartilhamento de credenciais de acesso com terceiros, 
                      mesmo dentro da mesma instituição.
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-blue-100">
                    <h5 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      Rastreabilidade Garantida
                    </h5>
                    <p className="text-sm text-gray-700">
                      Todas as verificações realizadas no sistema são registradas automaticamente, 
                      garantindo rastreabilidade e auditoria.
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-blue-100">
                    <h5 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      Limites de Acesso
                    </h5>
                    <p className="text-sm text-gray-700">
                      O acesso deve respeitar rigorosamente os limites de autorização atribuídos ao perfil institucional.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 1.1.2. Transportadoras */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.1.2
                </span>
                Transportadoras
              </h4>
              
              <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-200 mb-4">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🚚</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Gestão Operacional</h4>
                    <p className="text-xs text-gray-600">Empresas de Transporte e Logística</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border border-green-100">
                    <h5 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      Escopo Limitado
                    </h5>
                    <p className="text-sm text-gray-700">
                      O uso do sistema deve limitar-se à gestão de veículos, motoristas e cargas sob sua responsabilidade.
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-green-100">
                    <h5 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      Responsabilidade pelos Dados
                    </h5>
                    <p className="text-sm text-gray-700">
                      A transportadora é inteiramente responsável pela veracidade, legalidade e atualização dos dados fornecidos.
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-green-100">
                    <h5 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      Atualização Tempestiva
                    </h5>
                    <p className="text-sm text-gray-700">
                      É obrigatória a atualização tempestiva das informações, especialmente em casos de alterações de frota, 
                      motoristas ou documentação.
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-green-100">
                    <h5 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      Proibição de Acesso Cruzado
                    </h5>
                    <p className="text-sm text-gray-700">
                      É terminantemente proibido acessar, tentar visualizar ou inferir dados de outras empresas ou transportadoras.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 1.1.3. Motoristas */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.1.3
                </span>
                Motoristas
              </h4>
              
              <div className="bg-gradient-to-r from-yellow-50 to-white p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">👨‍✈️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Acesso Individual</h4>
                    <p className="text-xs text-gray-600">Profissionais do Transporte Rodoviário</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-sm">👤</span>
                      </div>
                      <h5 className="font-bold text-gray-800">Acesso Restrito</h5>
                    </div>
                    <p className="text-sm text-gray-700">
                      O motorista pode acessar apenas os seus próprios dados pessoais, profissionais e de viagens.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-sm">📝</span>
                      </div>
                      <h5 className="font-bold text-gray-800">Responsabilidade Pessoal</h5>
                    </div>
                    <p className="text-sm text-gray-700">
                      É responsabilidade do motorista manter seus dados corretos e atualizados, incluindo documentação e contatos.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200 md:col-span-2">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-sm">🔄</span>
                      </div>
                      <h5 className="font-bold text-gray-800">Comunicação de Alterações</h5>
                    </div>
                    <p className="text-sm text-gray-700">
                      Qualquer alteração relevante, como mudança de categoria da carta de condução, dados de contato ou 
                      condição médica relevante, deve ser comunicada e atualizada no sistema.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Matriz de Permissões */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3 text-center">MATRIZ DE PERMISSÕES POR PERFIL</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2 text-left">Funcionalidade</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Autoridades</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Transportadoras</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Motoristas</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold">Consultar dados pessoais próprios</td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block w-6 h-6 bg-red-500 rounded-full text-white">❌</span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block w-6 h-6 bg-red-500 rounded-full text-white">❌</span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block w-6 h-6 bg-green-500 rounded-full text-white">✓</span>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-semibold">Consultar dados de motoristas</td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block w-6 h-6 bg-green-500 rounded-full text-white">✓</span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block w-6 h-6 bg-green-500 rounded-full text-white">✓</span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block w-6 h-6 bg-red-500 rounded-full text-white">❌</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold">Consultar dados de veículos</td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block w-6 h-6 bg-green-500 rounded-full text-white">✓</span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block w-6 h-6 bg-green-500 rounded-full text-white">✓</span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block w-6 h-6 bg-yellow-500 rounded-full text-white">⚠️</span>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-semibold">Consultar dados de outras empresas</td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block w-6 h-6 bg-red-500 rounded-full text-white">❌</span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block w-6 h-6 bg-red-500 rounded-full text-white">❌</span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block w-6 h-6 bg-red-500 rounded-full text-white">❌</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold">Emitir multas/notificações</td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block w-6 h-6 bg-green-500 rounded-full text-white">✓</span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block w-6 h-6 bg-red-500 rounded-full text-white">❌</span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className="inline-block w-6 h-6 bg-red-500 rounded-full text-white">❌</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-3 text-xs text-gray-600 flex justify-center space-x-4">
                <span className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span> Permitido</span>
                <span className="flex items-center"><span className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></span> Limitado</span>
                <span className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span> Proibido</span>
              </div>
            </div>
          </section>

          {/* 1.2. Condutas Proibidas */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-red-600 text-lg">🚫</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.2. Condutas Proibidas</h3>
            </div>

            <div className="mb-6 bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-gray-700 text-center font-semibold">
                São consideradas violações graves da política as seguintes condutas, sujeitas a sanções
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🔓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Acesso Não Autorizado</h4>
                    <p className="text-xs text-gray-600">Tentativas de Acesso Ilegítimo</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Tentativas de acessar dados, funcionalidades ou sistemas sem permissão formal e autorização prévia.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-red-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">✏️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Modificação Indevida</h4>
                    <p className="text-xs text-gray-600">Alteração Fraudulenta</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Alteração, exclusão ou inserção de dados sem autorização ou fora do escopo permitido pela função.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-red-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">📤</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Divulgação Não Autorizada</h4>
                    <p className="text-xs text-gray-600">Compartilhamento Ilegítimo</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Compartilhamento de dados confidenciais, pessoais ou institucionais com terceiros não autorizados.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-red-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">💰</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Uso Comercial Indevido</h4>
                    <p className="text-xs text-gray-600">Exploração Comercial</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Utilização do sistema ou das informações para fins comerciais, publicitários ou concorrenciais não autorizados.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-red-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🔧</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Engenharia Reversa</h4>
                    <p className="text-xs text-gray-600">Análise Não Autorizada</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Tentativas de copiar, desmontar, analisar ou reproduzir o funcionamento interno do sistema.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-red-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">⚔️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Ataques ao Sistema</h4>
                    <p className="text-xs text-gray-600">Comprometimento de Segurança</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Qualquer ação destinada a comprometer a segurança, disponibilidade ou integridade da plataforma.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-red-200 md:col-span-2">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🎭</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Falsificação</h4>
                    <p className="text-xs text-gray-600">Fraude e Adulteração</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Tentativas de criar, alterar ou utilizar QR Codes falsos, adulterados ou dados fraudulentos para burlar o sistema.
                </p>
              </div>
            </div>

            {/* Classificação de Gravidade */}
            <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-bold text-gray-800 mb-3 text-center">CLASSIFICAÇÃO DE GRAVIDADE DAS VIOLAÇÕES</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded border border-gray-200">
                  <div className="flex items-center mb-2">
                    <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">!</span>
                    <span className="font-semibold">Leve</span>
                  </div>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Uso acidental fora do escopo</li>
                    <li>• Primeira ocorrência de advertência</li>
                    <li>• Erro não intencional</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <div className="flex items-center mb-2">
                    <span className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">⚠️</span>
                    <span className="font-semibold">Moderada</span>
                  </div>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Reincidência em condutas leves</li>
                    <li>• Violação intencional de regras</li>
                    <li>• Compartilhamento não autorizado</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <div className="flex items-center mb-2">
                    <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">🚨</span>
                    <span className="font-semibold">Grave</span>
                  </div>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Ataques ao sistema</li>
                    <li>• Falsificação de dados</li>
                    <li>• Comprometimento de segurança</li>
                    <li>• Uso para atividades criminosas</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 1.3. Responsabilidades dos Usuários */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-blue-600 text-lg">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.3. Responsabilidades dos Usuários</h3>
            </div>

            <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-gray-700 text-center">
                Todos os usuários são responsáveis por utilizar o sistema de forma ética, segura e conforme as normas estabelecidas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🔐</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Confidencialidade</h4>
                    <p className="text-xs text-gray-600">Proteção de Credenciais</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Manter suas credenciais de acesso em sigilo absoluto, não compartilhando senhas, tokens ou certificados com terceiros.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-green-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🚨</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Notificação</h4>
                    <p className="text-xs text-gray-600">Comunicação Imediata</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Comunicar imediatamente qualquer perda de credenciais, suspeita de uso indevido ou incidente de segurança ao suporte.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">✅</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Conformidade</h4>
                    <p className="text-xs text-gray-600">Cumprimento de Normas</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Cumprir integralmente esta política, bem como as demais políticas de privacidade e segurança da informação.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🔄</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Cooperação</h4>
                    <p className="text-xs text-gray-600">Colaboração em Investigações</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Colaborar com investigações internas ou externas relacionadas à segurança da informação ou uso indevido do sistema.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-red-200 md:col-span-2 lg:col-span-3">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🎯</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Uso Adequado</h4>
                    <p className="text-xs text-gray-600">Finalidade Autorizada</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Utilizar o sistema exclusivamente para os fins autorizados, respeitando limites técnicos, legais e éticos, 
                  sem extrapolar as permissões concedidas ao perfil de usuário.
                </p>
              </div>
            </div>

            {/* Termo de Responsabilidade */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-bold text-gray-800 mb-3 text-center">TERMO DE RESPONSABILIDADE</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-1">Aceitação Obrigatória</h5>
                    <p className="text-sm text-gray-700">
                      Todo usuário deve aceitar formalmente esta política antes de obter acesso ao sistema
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-white text-sm">📝</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-1">Registro Digital</h5>
                    <p className="text-sm text-gray-700">
                      A aceitação é registrada digitalmente com data, hora e identificação do usuário
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-white text-sm">⚖️</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-1">Responsabilidade Civil</h5>
                    <p className="text-sm text-gray-700">
                      O usuário é civilmente responsável por danos causados por violação desta política
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3.4. Monitoramento de Uso */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-purple-600 text-lg">👁️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">3.4. Monitoramento de Uso</h3>
            </div>

            <div className="mb-6 bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-gray-700 text-center">
                Para garantir a segurança, conformidade e melhoria contínua do sistema, todas as atividades são monitoradas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">📊</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Logs Detalhados</h4>
                    <p className="text-xs text-gray-600">Registro Completo</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Todas as ações realizadas no sistema são registradas
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Acessos, consultas e alterações são monitorados
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Registro de data, hora, usuário e ação realizada
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Retenção de logs por período mínimo de 1 ano
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🔍</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Análise de Padrões</h4>
                    <p className="text-xs text-gray-600">Detecção Proativa</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Os registros são analisados para identificar comportamentos anômalos
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Detecção de padrões suspeitos de uso
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Análise de comportamento de usuários
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Identificação de acessos fora do horário normal
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🚨</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Alertas Automáticos</h4>
                    <p className="text-xs text-gray-600">Notificação em Tempo Real</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    O sistema gera notificações automáticas
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    Alertas para atividades potencialmente irregulares
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    Notificação para múltiplas tentativas de acesso
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    Alerta para acessos a dados sensíveis
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">📅</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Revisão Periódica</h4>
                    <p className="text-xs text-gray-600">Auditoria Contínua</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Os logs e relatórios são revisados regularmente
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Auditoria trimestral de conformidade
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Revisão de acessos privilegiados
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Relatórios para autoridades regulatórias
                  </li>
                </ul>
              </div>
            </div>

            {/* Dashboard de Monitoramento */}
            <div className="mt-6 bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3 text-center">DASHBOARD DE MONITORAMENTO</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white p-3 rounded border border-gray-200">
                  <p className="text-2xl font-bold text-blue-600">100%</p>
                  <p className="text-sm text-gray-700">Logs de Acesso</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <p className="text-2xl font-bold text-green-600">24/7</p>
                  <p className="text-sm text-gray-700">Monitoramento</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <p className="text-2xl font-bold text-yellow-600">menor que 5min</p>
                  <p className="text-sm text-gray-700">Tempo de Alerta</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <p className="text-2xl font-bold text-red-600">0</p>
                  <p className="text-sm text-gray-700">Violações Graves</p>
                </div>
              </div>
            </div>
          </section>

          {/* 3.5. Sanções por Violação */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-red-600 text-lg">⚖️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">3.5. Sanções por Violação</h3>
            </div>

            <div className="mb-6 bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-gray-700 text-center font-semibold">
                O descumprimento desta Política de Uso Aceitável poderá resultar nas seguintes sanções, 
                aplicadas conforme a gravidade da infração
              </p>
            </div>

            {/* Sanções em Escala */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-200">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">⚠️</span>
                  </div>
                </div>
                <h4 className="font-bold text-gray-800 text-center mb-2">Advertência</h4>
                <p className="text-sm text-gray-700 text-center">
                  Aplicável a violações leves ou primeiras ocorrências
                </p>
                <div className="mt-3 text-center">
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded text-xs font-bold">
                    Nível 1
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-white p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">⏸️</span>
                  </div>
                </div>
                <h4 className="font-bold text-gray-800 text-center mb-2">Suspensão Temporária</h4>
                <p className="text-sm text-gray-700 text-center">
                  Para violações moderadas ou reincidências (7 a 30 dias)
                </p>
                <div className="mt-3 text-center">
                  <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-xs font-bold">
                    Nível 2
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-white p-4 rounded-lg border border-orange-200">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">🔒</span>
                  </div>
                </div>
                <h4 className="font-bold text-gray-800 text-center mb-2">Banimento Temporário</h4>
                <p className="text-sm text-gray-700 text-center">
                  Para violações graves (30 a 90 dias)
                </p>
                <div className="mt-3 text-center">
                  <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded text-xs font-bold">
                    Nível 3
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-white p-4 rounded-lg border border-red-200">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">🚫</span>
                  </div>
                </div>
                <h4 className="font-bold text-gray-800 text-center mb-2">Banimento Permanente</h4>
                <p className="text-sm text-gray-700 text-center">
                  Para violações graves, intencionais ou que comprometam a segurança
                </p>
                <div className="mt-3 text-center">
                  <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded text-xs font-bold">
                    Nível 4
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-lg border border-purple-200">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">⚖️</span>
                  </div>
                </div>
                <h4 className="font-bold text-gray-800 text-center mb-2">Ação Legal</h4>
                <p className="text-sm text-gray-700 text-center">
                  Quando configurar infração civil, administrativa ou criminal
                </p>
                <div className="mt-3 text-center">
                  <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded text-xs font-bold">
                    Nível 5
                  </span>
                </div>
              </div>
            </div>

            {/* Processo de Aplicação de Sanções */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-bold text-gray-800 mb-3 text-center">PROCESSO DE APLICAÇÃO DE SANÇÕES</h4>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-1">Detecção e Análise</h5>
                    <p className="text-sm text-gray-700">
                      Sistema detecta violação e equipe de segurança analisa evidências
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-1">Classificação de Gravidade</h5>
                    <p className="text-sm text-gray-700">
                      Violação é classificada conforme nível de gravidade e intencionalidade
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-1">Notificação ao Usuário</h5>
                    <p className="text-sm text-gray-700">
                      Usuário é notificado formalmente sobre a violação e sanção proposta
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-1">Direito de Defesa</h5>
                    <p className="text-sm text-gray-700">
                      Usuário tem 5 dias úteis para apresentar defesa ou recurso
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">5</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-1">Aplicação da Sanção</h5>
                    <p className="text-sm text-gray-700">
                      Sanção é aplicada após análise da defesa e decisão final
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                <p className="text-sm text-gray-700 text-center">
                  <strong>Notificação às Autoridades:</strong> Sempre que exigido por lei ou quando houver indícios de crime, 
                  as autoridades competentes serão formalmente notificadas.
                </p>
              </div>
            </div>
          </section>

          {/* Resumo e Aceitação */}
          <section className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-lg">✅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Resumo e Aceitação da Política</h3>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-2">COMPROMISSO COM O USO CORRETO</h4>
                <p className="text-gray-700">
                  Esta política estabelece o padrão ético e legal para utilização do sistema
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-xl">👥</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Perfis Definidos</h5>
                  </div>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    <li>3 categorias de usuários</li>
                    <li>Permissões específicas por função</li>
                    <li>Limites claros de acesso</li>
                    <li>Responsabilidades definidas</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-xl">🚫</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Condutas Proibidas</h5>
                  </div>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    <li>7 categorias de violações</li>
                    <li>Classificação por gravidade</li>
                    <li>Monitoramento contínuo</li>
                    <li>Sanções proporcionais</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-xl">👁️</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Transparência</h5>
                  </div>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    <li>Monitoramento completo</li>
                    <li>Logs detalhados</li>
                    <li>Processo justo de sanções</li>
                    <li>Direito de defesa</li>
                  </ul>
                </div>
              </div>

              {/* Termo de Aceitação */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-bold text-gray-800 mb-3 text-center">TERMO DE ACEITAÇÃO</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input type="checkbox" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                    <label className="ml-2 text-sm text-gray-700">
                      Declaro que li, compreendi e aceito integralmente esta Política de Uso Aceitável
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                    <label className="ml-2 text-sm text-gray-700">
                      Comprometo-me a utilizar o sistema conforme as regras e limites estabelecidos
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                    <label className="ml-2 text-sm text-gray-700">
                      Reconheço que violações desta política podem resultar em sanções, incluindo ação legal
                    </label>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                    ACEITAR POLÍTICA
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-700 mb-4">
                  <strong>Esta política é parte integrante dos Termos de Serviço do sistema e é revisada anualmente</strong>
                </p>
                <div className="flex justify-center space-x-4">
                  <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded">Monitoramento 24/7</span>
                  <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded">Processo Justo</span>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded">Conformidade Legal</span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded">Transparência Total</span>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-center">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Política de Uso Aceitável</strong>
              </p>
              <p className="text-xs text-gray-600">
                Documento versão 1.0 | Última atualização: {new Date().toLocaleDateString('pt-MZ')} | 
                Próxima revisão: {new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('pt-MZ')}
              </p>
              <div className="mt-4 flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-8">
                <div className="text-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-sm">👁️</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Monitoramento</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-sm">⚖️</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Sanções Proporcionais</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-sm">📝</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Aceitação Obrigatória</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PoliticaUsoAceitavel