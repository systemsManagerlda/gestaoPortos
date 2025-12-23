import React from 'react'

function PoliticaSegurancaInformacao() {
  return (
    <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-sm text-gray-900">
      {/* Cabeçalho */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-2 rounded-lg mr-3">🛡️</span>
          Política de Segurança da Informação
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Princípios, controles e procedimentos para proteção de dados, sistemas e infraestrutura de informação
        </p>
      </div>

      {/* Conteúdo com scroll */}
      <div className="flex-1 overflow-y-auto max-h-[900px]">
        <div className="p-6 space-y-8">
          {/* Introdução */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-indigo-600 text-lg">🏛️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Compromisso Organizacional</h3>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                Nossa organização adota princípios sólidos de segurança da informação para garantir a proteção de dados 
                e a confiança de todos os envolvidos nas operações de transporte e logística.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded border border-indigo-100">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="w-4 h-4 bg-indigo-500 rounded-full mr-2"></span>
                    Objetivo Principal
                  </h4>
                  <p className="text-sm text-gray-700">
                    Proteger informações sensíveis contra ameaças internas e externas
                  </p>
                </div>
                <div className="bg-white p-4 rounded border border-purple-100">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="w-4 h-4 bg-purple-500 rounded-full mr-2"></span>
                    Alinhamento Normativo
                  </h4>
                  <p className="text-sm text-gray-700">
                    Conformidade com ISO 27001, GDPR e regulamentos setoriais
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 1.1. Princípios de Segurança */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-blue-600 text-lg">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.1. Princípios de Segurança</h3>
            </div>

            <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
              <p className="text-sm text-gray-700 text-center">
                Cinco princípios fundamentais orientam todas as nossas práticas de segurança da informação
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🔒</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Confidencialidade</h4>
                    <p className="text-xs text-gray-600">Acesso Controlado</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Garantimos que apenas pessoas autorizadas tenham acesso às informações sensíveis, 
                  protegendo dados contra divulgação não autorizada.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Integridade</h4>
                    <p className="text-xs text-gray-600">Precisão e Confiabilidade</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Os dados são protegidos contra alterações não autorizadas ou acidentais, assegurando que as 
                  informações permaneçam precisas e confiáveis.
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-white p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Disponibilidade</h4>
                    <p className="text-xs text-gray-600">Acesso Garantido</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  As informações estão disponíveis quando necessário para usuários autorizados, garantindo 
                  continuidade das operações e serviços.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-lg border border-purple-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🔍</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Autenticidade</h4>
                    <p className="text-xs text-gray-600">Origem Confiável</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Asseguramos que os dados e comunicações sejam genuínos e provenientes de fontes confiáveis 
                  e verificadas.
                </p>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-white p-4 rounded-lg border border-red-200 md:col-span-2 lg:col-span-3">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">📝</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Não Repúdio</h4>
                    <p className="text-xs text-gray-600">Rastreabilidade e Responsabilidade</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Implementamos mecanismos que impedem que usuários neguem ações realizadas, como transações ou 
                  alterações de dados, garantindo rastreabilidade e responsabilidade através de logs, assinaturas 
                  digitais e certificados.
                </p>
              </div>
            </div>
          </section>

          {/* 1.2. Classificação de Dados */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-green-600 text-lg">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.2. Classificação de Dados</h3>
            </div>

            <div className="mb-6 bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-gray-700 text-center">
                Os dados são classificados de acordo com o nível de sensibilidade, para aplicar controles de 
                segurança adequados
              </p>
            </div>

            {/* Níveis de Classificação */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Nível 3 - Confidencial */}
              <div className="bg-gradient-to-r from-red-50 to-white p-4 rounded-lg border border-red-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">3</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Confidencial</h4>
                      <p className="text-xs text-gray-600">Acesso Muito Restrito</p>
                    </div>
                  </div>
                  <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">ALTA</span>
                </div>
                
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800 mb-2">Exemplos:</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      Dados pessoais sensíveis (saúde, biometria)
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      Dados bancários e financeiros
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      Chaves criptográficas e segredos de sistema
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      Credenciais de acesso a sistemas críticos
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-3 rounded border border-red-100">
                  <h5 className="font-semibold text-gray-800 mb-2">Tratamento:</h5>
                  <p className="text-xs text-gray-700">
                    Criptografia de ponta a ponta, acesso restrito apenas a pessoas autorizadas, 
                    auditoria contínua e registro detalhado de acessos.
                  </p>
                </div>
              </div>

              {/* Nível 2 - Interno */}
              <div className="bg-gradient-to-r from-yellow-50 to-white p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">2</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Interno</h4>
                      <p className="text-xs text-gray-600">Acesso Controlado</p>
                    </div>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">MÉDIA</span>
                </div>
                
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800 mb-2">Exemplos:</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-start">
                      <span className="text-yellow-500 mr-2">•</span>
                      Dados de motoristas (exceto dados sensíveis)
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-500 mr-2">•</span>
                      Dados de veículos e frotas
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-500 mr-2">•</span>
                      Informações operacionais (rotas, horários)
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-500 mr-2">•</span>
                      Histórico de viagens
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-3 rounded border border-yellow-100">
                  <h5 className="font-semibold text-gray-800 mb-2">Tratamento:</h5>
                  <p className="text-xs text-gray-700">
                    Criptografia em repouso, controle de acesso baseado em funções (RBAC), e revisão 
                    periódica de privilégios de acesso.
                  </p>
                </div>
              </div>

              {/* Nível 1 - Público */}
              <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">1</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Público</h4>
                      <p className="text-xs text-gray-600">Acesso Aberto</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">BAIXA</span>
                </div>
                
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800 mb-2">Exemplos:</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Informações básicas de QR Code
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Status genérico de viagem
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Dados não identificáveis de motoristas
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Dados estatísticos agregados
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-3 rounded border border-green-100">
                  <h5 className="font-semibold text-gray-800 mb-2">Tratamento:</h5>
                  <p className="text-xs text-gray-700">
                    Disponíveis para consulta pública, sem necessidade de autenticação, mas garantindo 
                    integridade e validação por assinatura digital quando aplicável.
                  </p>
                </div>
              </div>
            </div>

            {/* Matriz de Classificação */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3 text-center">MATRIZ DE CLASSIFICAÇÃO DE DADOS</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2 text-left">Critério</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Confidencial (N3)</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Interno (N2)</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Público (N1)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold">Impacto de Vazamento</td>
                      <td className="border border-gray-300 px-3 py-2 bg-red-50 text-center">Alto</td>
                      <td className="border border-gray-300 px-3 py-2 bg-yellow-50 text-center">Médio</td>
                      <td className="border border-gray-300 px-3 py-2 bg-green-50 text-center">Baixo</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-semibold">Requisito Legal</td>
                      <td className="border border-gray-300 px-3 py-2 bg-red-50 text-center">Obrigatório</td>
                      <td className="border border-gray-300 px-3 py-2 bg-yellow-50 text-center">Recomendado</td>
                      <td className="border border-gray-300 px-3 py-2 bg-green-50 text-center">Opcional</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold">Criptografia</td>
                      <td className="border border-gray-300 px-3 py-2 bg-red-50 text-center">Ponta a Ponta</td>
                      <td className="border border-gray-300 px-3 py-2 bg-yellow-50 text-center">Em Repouso</td>
                      <td className="border border-gray-300 px-3 py-2 bg-green-50 text-center">Assinatura</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-semibold">Auditoria de Acesso</td>
                      <td className="border border-gray-300 px-3 py-2 bg-red-50 text-center">Contínua</td>
                      <td className="border border-gray-300 px-3 py-2 bg-yellow-50 text-center">Periódica</td>
                      <td className="border border-gray-300 px-3 py-2 bg-green-50 text-center">Opcional</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 2.3. Controles de Acesso Físico */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-orange-600 text-lg">🏢</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">2.3. Controles de Acesso Físico</h3>
            </div>

            <div className="mb-6 bg-orange-50 p-4 rounded-lg border border-orange-200">
              <p className="text-gray-700 text-center">
                Medidas para proteção física de instalações e equipamentos críticos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🏛️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Data Centers</h4>
                    <p className="text-xs text-gray-600">Infraestrutura Crítica</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Acesso restrito com autenticação biométrica
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Vigilância 24/7 com câmeras e monitoramento
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Sistemas de alarme e detecção de intrusão
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🏢</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Escritórios</h4>
                    <p className="text-xs text-gray-600">Ambientes Corporativos</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Controle de entrada por cartão de acesso
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Registro completo de visitantes
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Áreas restritas com controle adicional
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">💻</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Equipamentos</h4>
                    <p className="text-xs text-gray-600">Recursos Técnicos</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Servidores com travas físicas
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Ambientes controlados (temperatura, umidade)
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Proteção contra surtos elétricos
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">👥</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Visitantes</h4>
                    <p className="text-xs text-gray-600">Controle de Terceiros</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    Acompanhamento obrigatório
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    Registro detalhado de entrada e saída
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    Controle de crachás identificadores
                  </li>
                </ul>
              </div>
            </div>

            {/* Zonas de Segurança */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-bold text-gray-800 mb-3 text-center">ZONAS DE SEGURANÇA FÍSICA</h4>
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-lg">🟢</span>
                  </div>
                  <p className="text-sm font-semibold mt-2">Zona Pública</p>
                  <p className="text-xs text-gray-600">Recepção e áreas comuns</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-gray-400">→</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-lg">🟡</span>
                  </div>
                  <p className="text-sm font-semibold mt-2">Zona Controlada</p>
                  <p className="text-xs text-gray-600">Escritórios e áreas operacionais</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-gray-400">→</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-lg">🟠</span>
                  </div>
                  <p className="text-sm font-semibold mt-2">Zona Restrita</p>
                  <p className="text-xs text-gray-600">Salas de servidores</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-gray-400">→</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-lg">🔴</span>
                  </div>
                  <p className="text-sm font-semibold mt-2">Zona Crítica</p>
                  <p className="text-xs text-gray-600">Racks e equipamentos</p>
                </div>
              </div>
            </div>
          </section>

          {/* 2.4. Controles de Acesso Lógico */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-purple-600 text-lg">🔐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">2.4. Controles de Acesso Lógico</h3>
            </div>

            <div className="mb-6 bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-gray-700 text-center">
                Mecanismos para garantir que apenas usuários autorizados acessem sistemas e dados
              </p>
            </div>

            {/* 2.4.1. Autenticação */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  2.4.1
                </span>
                Autenticação
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">🔑</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Senhas Fortes</h4>
                      <p className="text-xs text-gray-600">Primeira Linha de Defesa</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Mínimo de 8 caracteres
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Complexidade obrigatória (maiúsculas, minúsculas, números, símbolos)
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Proibição de reutilização das últimas 5 senhas
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Troca obrigatória a cada 90 dias
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">🔢</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Autenticação Multifator</h4>
                      <p className="text-xs text-gray-600">Defesa em Camadas</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Obrigatória para contas administrativas
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Aplicativos de autenticação (Google Authenticator)
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Tokens de hardware para acesso crítico
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      SMS ou e-mail como segundo fator
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-white p-4 rounded-lg border border-red-200 md:col-span-2">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">🚫</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Proteção Contra Ataques</h4>
                      <p className="text-xs text-gray-600">Prevenção de Intrusão</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2">Bloqueio Automático</h5>
                      <p className="text-sm text-gray-700">
                        Bloqueio automático de contas após 5 tentativas de acesso falhadas
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2">Tempo de Sessão</h5>
                      <p className="text-sm text-gray-700">
                        Tempo limite de sessão de 30 minutos para usuários administrativos
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2.4.2. Autorização */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  2.4.2
                </span>
                Autorização
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-yellow-50 to-white p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">📋</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Princípio do Menor Privilégio</h4>
                      <p className="text-xs text-gray-600">Acesso Mínimo Necessário</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    Garantimos acesso mínimo necessário para que cada usuário execute suas funções, 
                    reduzindo o risco de acesso indevido ou malicioso.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-yellow-500 mr-2">✓</span>
                      Acesso concedido apenas às funcionalidades necessárias
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-500 mr-2">✓</span>
                      Permissões baseadas em funções específicas
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-500 mr-2">✓</span>
                      Sem privilégios administrativos por padrão
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-white p-4 rounded-lg border border-indigo-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">👥</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Controle Baseado em Funções</h4>
                      <p className="text-xs text-gray-600">RBAC - Role-Based Access Control</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    Sistema de autorização onde as permissões são atribuídas com base em funções organizacionais.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white p-2 rounded border border-gray-200 text-center">
                      <p className="text-xs font-semibold">Administrador</p>
                      <p className="text-xs text-gray-600">Acesso total</p>
                    </div>
                    <div className="bg-white p-2 rounded border border-gray-200 text-center">
                      <p className="text-xs font-semibold">Fiscal</p>
                      <p className="text-xs text-gray-600">Acesso limitado</p>
                    </div>
                    <div className="bg-white p-2 rounded border border-gray-200 text-center">
                      <p className="text-xs font-semibold">Operador</p>
                      <p className="text-xs text-gray-600">Acesso operacional</p>
                    </div>
                    <div className="bg-white p-2 rounded border border-gray-200 text-center">
                      <p className="text-xs font-semibold">Motorista</p>
                      <p className="text-xs text-gray-600">Acesso pessoal</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Revisão de Privilégios */}
              <div className="mt-4 bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">📅</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Revisão Periódica de Privilégios</h4>
                    <p className="text-xs text-gray-600">Governança Contínua</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">📋</span>
                      <span className="font-semibold">Revisão Trimestral</span>
                    </div>
                    <p className="text-xs text-gray-700">
                      Todas as permissões são revisadas a cada 3 meses
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">✅</span>
                      <span className="font-semibold">Aprovação Formal</span>
                    </div>
                    <p className="text-xs text-gray-700">
                      Todas as alterações de privilégios requerem aprovação formal
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">📝</span>
                      <span className="font-semibold">Auditoria Completa</span>
                    </div>
                    <p className="text-xs text-gray-700">
                      Registro completo de todas as mudanças de permissões
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2.5. Criptografia */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-blue-600 text-lg">🔐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">2.5. Criptografia</h3>
            </div>

            <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-gray-700 text-center">
                Proteção de dados através de algoritmos criptográficos modernos e seguros
              </p>
            </div>

            {/* 2.5.1. Dados em Trânsito */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  2.5.1
                </span>
                Dados em Trânsito
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">🌐</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Protocolos Seguros</h4>
                      <p className="text-xs text-gray-600">Comunicação Protegida</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Uso mínimo de TLS 1.2 em todas as comunicações
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Certificados SSL válidos e atualizados
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Proibição de protocolos inseguros (SSLv2, SSLv3)
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">🔢</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Algoritmos Fortes</h4>
                      <p className="text-xs text-gray-600">Proteção Criptográfica</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      AES-256 para criptografia simétrica
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      RSA-2048 ou superior para chaves assimétricas
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      SHA-256 para hash e integridade
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2.5.2. Dados em Repouso */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  2.5.2
                </span>
                Dados em Repouso
              </h4>
              
              <div className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-lg border border-purple-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-bold text-gray-800 mb-3">Proteção de Armazenamento</h5>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        Criptografia de bancos de dados no nível de tabela ou coluna
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        Criptografia de backups em mídia física e digital
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        Criptografia de disco completo para servidores críticos
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-gray-800 mb-3">Gestão de Chaves</h5>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        Sistema centralizado de gestão de chaves criptográficas
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        Rotação periódica de chaves (a cada 90 dias)
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        Armazenamento seguro de chaves em HSMs (Hardware Security Modules)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 2.5.3. QR Codes */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  2.5.3
                </span>
                QR Codes
              </h4>
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">✍️</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Assinatura Digital</h4>
                        <p className="text-xs text-gray-600">Validação de Autenticidade</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">
                      Cada QR Code contém assinatura digital que valida sua origem e integridade
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">⏰</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Validade Temporal</h4>
                        <p className="text-xs text-gray-600">Redução de Riscos</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">
                      Validade limitada (24 horas) para reduzir risco de uso indevido ou replay attacks
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">🔒</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Criptografia Embarcada</h4>
                        <p className="text-xs text-gray-600">Proteção de Dados</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">
                      Dados sensíveis no QR Code são criptografados para proteção contra leitura indevida
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2.6. Proteção de Endpoints */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-red-600 text-lg">💻</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">2.6. Proteção de Endpoints</h3>
            </div>

            <div className="mb-6 bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-gray-700 text-center">
                Todos os dispositivos que acessam nossos sistemas são protegidos por medidas de segurança abrangentes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🛡️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Antivírus e Antimalware</h4>
                    <p className="text-xs text-gray-600">Proteção Contra Malware</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Software antivírus atualizado diariamente
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Monitoramento contínuo de atividades suspeitas
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Varreduras automáticas agendadas
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🔥</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Firewalls Pessoais</h4>
                    <p className="text-xs text-gray-600">Controle de Rede</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Firewalls ativados em todos os dispositivos
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Políticas restritivas para tráfego de entrada
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Monitoramento de conexões de rede suspeitas
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border border-green-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🔄</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Atualizações de Segurança</h4>
                    <p className="text-xs text-gray-600">Manutenção Contínua</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Atualizações automáticas de sistemas operacionais
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Patches de segurança aplicados em até 7 dias
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Verificação automática de vulnerabilidades
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">💾</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Dispositivos Removíveis</h4>
                    <p className="text-xs text-gray-600">Controle de Mídia</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    Controle estrito de uso de USB e mídias externas
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    Varredura automática de dispositivos conectados
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    Criptografia obrigatória para mídias removíveis
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">📊</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Monitoramento de Atividades</h4>
                    <p className="text-xs text-gray-600">Detecção Proativa</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    Monitoramento de comportamentos suspeitos
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    Registro completo de incidentes de segurança
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    Alertas automáticos para atividades anômalas
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border border-indigo-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">📱</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Gestão de Dispositivos</h4>
                    <p className="text-xs text-gray-600">MDM - Mobile Device Management</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    Gestão centralizada de dispositivos móveis
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    Remoção remota de dados em caso de perda
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    Políticas de segurança aplicadas remotamente
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2.7. Monitoramento e Detecção */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-gray-600 text-lg">👁️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">2.7. Monitoramento e Detecção</h3>
            </div>

            <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-700 text-center">
                Sistema abrangente para garantir a segurança contínua da informação através de monitoramento proativo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">📊</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">SIEM</h4>
                    <p className="text-xs text-gray-600">Centralização e Análise</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Security Information and Event Management para centralização de logs e alertas:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Coleta centralizada de logs de todos os sistemas
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Correlação automática de eventos de segurança
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Dashboard unificado para monitoramento
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Retenção de logs por 1 ano para análise forense
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">⏰</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Monitoramento 24/7</h4>
                    <p className="text-xs text-gray-600">Vigilância Contínua</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Operação contínua para detecção imediata de ameaças:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Equipes de segurança em turnos 24 horas
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Monitoramento de atividades e eventos suspeitos
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Análise em tempo real de padrões anômalos
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Resposta imediata a incidentes críticos
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-white p-4 rounded-lg border border-red-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🚨</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Alertas Automáticos</h4>
                    <p className="text-xs text-gray-600">Detecção Proativa</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Sistema de alertas para comportamento anômalo ou tentativas de acesso não autorizado:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <p className="text-xs font-semibold">Tentativas de Acesso</p>
                    <p className="text-xs text-gray-600">Múltiplas falhas</p>
                  </div>
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <p className="text-xs font-semibold">Acesso Fora Horário</p>
                    <p className="text-xs text-gray-600">Atividades anômalas</p>
                  </div>
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <p className="text-xs font-semibold">Dados Sensíveis</p>
                    <p className="text-xs text-gray-600">Acessos não autorizados</p>
                  </div>
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <p className="text-xs font-semibold">Comportamento Anômalo</p>
                    <p className="text-xs text-gray-600">Detecção de padrões</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-lg border border-purple-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🔍</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Análise e Correlação</h4>
                    <p className="text-xs text-gray-600">Inteligência de Segurança</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Análise e correlação de eventos de segurança para rápida detecção de incidentes:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    Correlação entre eventos de diferentes sistemas
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    Análise de comportamento de usuários e sistemas
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    Identificação de padrões de ataque conhecidos
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    Geração de relatórios de inteligência de ameaças
                  </li>
                </ul>
              </div>
            </div>

            {/* Dashboard de Monitoramento */}
            <div className="mt-6 bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3 text-center">DASHBOARD DE SEGURANÇA</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white p-3 rounded border border-gray-200">
                  <p className="text-2xl font-bold text-green-600">99.9%</p>
                  <p className="text-sm text-gray-700">Uptime Sistemas</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <p className="text-2xl font-bold text-blue-600">24/7</p>
                  <p className="text-sm text-gray-700">Monitoramento</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <p className="text-2xl font-bold text-yellow-600">menor que 5min</p>
                  <p className="text-sm text-gray-700">Tempo Detecção</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <p className="text-2xl font-bold text-red-600">0</p>
                  <p className="text-sm text-gray-700">Violações Graves</p>
                </div>
              </div>
            </div>
          </section>

          {/* Resumo e Conformidade */}
          <section className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-lg">✅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Resumo e Conformidade</h3>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-2">ARQUITETURA DE SEGURANÇA COMPLETA</h4>
                <p className="text-gray-700">
                  Múltiplas camadas de proteção para garantir a segurança da informação
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-xl">🔒</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Prevenção</h5>
                  </div>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    <li>Controles de acesso físico e lógico</li>
                    <li>Criptografia de dados em trânsito e repouso</li>
                    <li>Proteção de endpoints e dispositivos</li>
                    <li>Políticas de segurança rigorosas</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-xl">👁️</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Detecção</h5>
                  </div>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    <li>Monitoramento 24/7 com SIEM</li>
                    <li>Alertas automáticos para atividades suspeitas</li>
                    <li>Análise de comportamento e padrões</li>
                    <li>Correlação de eventos de segurança</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-xl">🔄</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Resposta</h5>
                  </div>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    <li>Plano de resposta a incidentes</li>
                    <li>Equipe dedicada de segurança</li>
                    <li>Processos de contenção e recuperação</li>
                    <li>Análise pós-incidente e melhoria</li>
                  </ul>
                </div>
              </div>

              {/* Normas e Padrões */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-bold text-gray-800 mb-3 text-center">NORMAS E PADRÕES IMPLEMENTADOS</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-3 rounded border border-gray-200 text-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white text-sm">ISO</span>
                    </div>
                    <p className="text-sm font-semibold">ISO 27001</p>
                    <p className="text-xs text-gray-600">Sistema de Gestão</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200 text-center">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white text-sm">NIST</span>
                    </div>
                    <p className="text-sm font-semibold">NIST CSF</p>
                    <p className="text-xs text-gray-600">Framework de Segurança</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200 text-center">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white text-sm">GDPR</span>
                    </div>
                    <p className="text-sm font-semibold">GDPR</p>
                    <p className="text-xs text-gray-600">Proteção de Dados</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200 text-center">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white text-sm">PCI</span>
                    </div>
                    <p className="text-sm font-semibold">PCI DSS</p>
                    <p className="text-xs text-gray-600">Segurança de Dados</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-700 mb-4">
                  <strong>Esta política está integrada com todos os processos organizacionais e é revisada anualmente</strong>
                </p>
                <div className="flex justify-center space-x-4">
                  <span className="text-xs bg-indigo-100 text-indigo-800 px-3 py-1 rounded">ISO 27001 Certified</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded">GDPR Compliant</span>
                  <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded">Continuous Monitoring</span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded">Annual Audit</span>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-center">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Política de Segurança da Informação</strong>
              </p>
              <p className="text-xs text-gray-600">
                Documento versão 1.0 | Última atualização: {new Date().toLocaleDateString('pt-MZ')} | 
                Próxima auditoria: {new Date(new Date().setMonth(new Date().getMonth() + 6)).toLocaleDateString('pt-MZ')}
              </p>
              <div className="mt-4 flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-8">
                <div className="text-center">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-sm">🔒</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Criptografia AES-256</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-sm">👁️</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Monitoramento 24/7</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-sm">✅</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">ISO 27001 Certified</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PoliticaSegurancaInformacao