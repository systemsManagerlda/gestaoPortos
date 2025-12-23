import React from 'react'

function PoliticaPrivacidadeProtecaoDados() {
  return (
    <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-sm text-gray-900">
      {/* Cabeçalho */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-green-50">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-2 rounded-lg mr-3">🛡️</span>
          Política de Privacidade e Proteção de Dados
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Princípios, práticas e procedimentos para tratamento seguro e transparente de dados pessoais
        </p>
      </div>

      {/* Conteúdo com scroll */}
      <div className="flex-1 overflow-y-auto max-h-[900px]">
        <div className="p-6 space-y-8">
          {/* Introdução */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-blue-600 text-lg">📜</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1. Princípios e Compromissos</h3>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                Nossa organização adota princípios sólidos para garantir que o tratamento de dados pessoais seja seguro, 
                transparente e em conformidade com a legislação vigente.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded border border-blue-100">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                    Nossa Missão
                  </h4>
                  <p className="text-sm text-gray-700">
                    Proteger os dados pessoais de todos os envolvidos nas operações de transporte rodoviário
                  </p>
                </div>
                <div className="bg-white p-4 rounded border border-green-100">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                    Nossa Visão
                  </h4>
                  <p className="text-sm text-gray-700">
                    Ser referência em proteção de dados no sector de transportes e logística
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 1.1. Princípios Fundamentais */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-green-600 text-lg">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.1. Princípios Fundamentais</h3>
            </div>

            <div className="mb-4 p-3 bg-green-50 rounded border border-green-200">
              <p className="text-sm text-gray-700 text-center">
                Sete princípios fundamentais orientam todas as nossas operações de tratamento de dados
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-200">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">⚖️</span>
                  </div>
                  <h5 className="font-bold text-gray-800">Legalidade</h5>
                </div>
                <p className="text-sm text-gray-700">
                  Todos os dados coletados são processados apenas para finalidades legítimas e específicas, 
                  em conformidade com as leis aplicáveis.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-200">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">📏</span>
                  </div>
                  <h5 className="font-bold text-gray-800">Minimização</h5>
                </div>
                <p className="text-sm text-gray-700">
                  Coletamos apenas os dados essenciais para cumprir nossas finalidades, evitando a coleta excessiva 
                  ou desnecessária.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-lg border border-purple-200">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">🔍</span>
                  </div>
                  <h5 className="font-bold text-gray-800">Transparência</h5>
                </div>
                <p className="text-sm text-gray-700">
                  Garantimos que todos os titulares de dados recebam informações claras sobre quais dados são coletados, 
                  como são utilizados e por quanto tempo são armazenados.
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-white p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">🎯</span>
                  </div>
                  <h5 className="font-bold text-gray-800">Finalidade</h5>
                </div>
                <p className="text-sm text-gray-700">
                  Os dados coletados são utilizados exclusivamente para os fins previamente informados, como fiscalização, 
                  gestão de transporte ou cumprimento de obrigações legais.
                </p>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-white p-4 rounded-lg border border-red-200">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <h5 className="font-bold text-gray-800">Exatidão</h5>
                </div>
                <p className="text-sm text-gray-700">
                  Mantemos os dados atualizados e precisos, permitindo que os titulares solicitem correções sempre que necessário.
                </p>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-white p-4 rounded-lg border border-indigo-200">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">📦</span>
                  </div>
                  <h5 className="font-bold text-gray-800">Armazenamento Limitado</h5>
                </div>
                <p className="text-sm text-gray-700">
                  Os dados são mantidos apenas pelo tempo necessário para cumprir a finalidade da coleta ou para atender 
                  obrigações legais.
                </p>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-white p-4 rounded-lg border border-teal-200 md:col-span-2">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">🔒</span>
                  </div>
                  <h5 className="font-bold text-gray-800">Integridade e Confidencialidade</h5>
                </div>
                <p className="text-sm text-gray-700">
                  Implementamos medidas técnicas e organizacionais adequadas para proteger os dados contra acesso não autorizado, 
                  perda, alteração ou divulgação indevida.
                </p>
              </div>
            </div>
          </section>

          {/* 1.2. Categorias de Dados Coletados */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-orange-600 text-lg">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.2. Categorias de Dados Coletados</h3>
            </div>

            <div className="mb-6 bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-200">
              <p className="text-gray-700 leading-relaxed text-center">
                Coletamos dados de forma específica e justificada, categorizados conforme suas finalidades e necessidades operacionais
              </p>
            </div>

            {/* 1.2.1. Dados Pessoais de Motoristas */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.2.1
                </span>
                Dados Pessoais de Motoristas
              </h4>
              
              <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-200 mb-4">
                <h5 className="font-bold text-gray-800 mb-3 flex items-center">
                  <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                  Justificativa
                </h5>
                <p className="text-sm text-gray-700">
                  Esses dados são necessários para validar a identidade e aptidão do motorista, garantir conformidade 
                  com normas legais e facilitar comunicação e pagamento seguro.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">👤</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Identificação</h4>
                      <p className="text-xs text-gray-600">Dados Pessoais</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Nome completo, data de nascimento, nacionalidade
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Número de BI/Passaporte e validade
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Número de carta de condução e categorias
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Fotografias
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">📞</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Contactos e Dados</h4>
                      <p className="text-xs text-gray-600">Informações Adicionais</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Contactos (telefone, email)
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Endereço residencial
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Dados bancários para pagamentos
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Dados de saúde (tipo sanguíneo, restrições médicas)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 1.2.2. Dados de Veículos */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.2.2
                </span>
                Dados de Veículos
              </h4>
              
              <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-200 mb-4">
                <h5 className="font-bold text-gray-800 mb-3 flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                  Justificativa
                </h5>
                <p className="text-sm text-gray-700">
                  Essas informações permitem validar a conformidade técnica do veículo, monitorar sua operação e manter 
                  padrões de segurança rodoviária.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">🚗</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Identificação Técnica</h4>
                      <p className="text-xs text-gray-600">Dados do Veículo</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Matrícula, marca, modelo
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Especificações técnicas do veículo
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Categoria de inspeção obrigatória
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">📋</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Manutenção e Monitoramento</h4>
                      <p className="text-xs text-gray-600">Histórico e Localização</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      Histórico de manutenção e inspeções
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      Dados de localização via GPS
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      Registros de conformidade técnica
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 1.2.3. Dados de Cargas */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.2.3
                </span>
                Dados de Cargas
              </h4>
              
              <div className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-lg border border-purple-200 mb-4">
                <h5 className="font-bold text-gray-800 mb-3 flex items-center">
                  <span className="w-4 h-4 bg-purple-500 rounded-full mr-2"></span>
                  Justificativa
                </h5>
                <p className="text-sm text-gray-700">
                  Esses dados são necessários para controle aduaneiro, planejamento logístico e monitoramento seguro 
                  das operações de transporte.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">📦</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Descrição da Carga</h4>
                      <p className="text-xs text-gray-600">Detalhes da Mercadoria</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      Descrição e características da carga
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      Valor da mercadoria
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      Informações do cliente/embaraçador
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">📍</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Logística</h4>
                      <p className="text-xs text-gray-600">Roteamento e Destino</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Origem e destino da carga
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Datas de coleta e entrega
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Rota planejada e alternativa
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 1.3. Finalidades do Processamento */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-purple-600 text-lg">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.3. Finalidades do Processamento</h3>
            </div>

            <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-gray-700 text-center">
                Os dados coletados são utilizados para diversas finalidades operacionais e legais
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">📄</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Validação</h4>
                    <p className="text-xs text-gray-600">Documentos</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Validação de documentos para fiscalização e conformidade legal
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">💰</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Cálculos</h4>
                    <p className="text-xs text-gray-600">Financeiros</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Cálculo de fretes, seguros, remunerações e outros valores
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-white p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🚦</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Monitoramento</h4>
                    <p className="text-xs text-gray-600">Segurança</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Monitoramento da segurança rodoviária e cumprimento de normas de trânsito
                </p>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-white p-4 rounded-lg border border-red-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">📋</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Conformidade</h4>
                    <p className="text-xs text-gray-600">Regulamentação</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Garantia de conformidade com regulamentações NB1/NB2 e outras normas
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-lg border border-purple-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🏢</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Gestão</h4>
                    <p className="text-xs text-gray-600">Operacional</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Gestão operacional das transportadoras e parceiros logísticos
                </p>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-white p-4 rounded-lg border border-teal-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">📈</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Estatísticas</h4>
                    <p className="text-xs text-gray-600">Planejamento</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Elaboração de estatísticas para planejamento setorial e melhoria de processos
                </p>
              </div>
            </div>
          </section>

          {/* 1.4. Compartilhamento de Dados */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-yellow-600 text-lg">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.4. Compartilhamento de Dados</h3>
            </div>

            {/* 1.4.1. Entidades Autorizadas */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-yellow-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.4.1
                </span>
                Entidades Autorizadas
              </h4>
              
              <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
                <p className="text-sm text-gray-700 text-center">
                  Os dados podem ser compartilhados com autoridades públicas apenas quando necessário, 
                  respeitando o princípio da necessidade
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">🚓</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Polícias de Trânsito</h4>
                      <p className="text-xs text-gray-600">Fiscalização Rodoviária</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Acesso restrito a dados relevantes para fiscalização de trânsito e segurança rodoviária
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">🏛️</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Alfândegas</h4>
                      <p className="text-xs text-gray-600">Controle Aduaneiro</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Acesso limitado a informações necessárias para controle aduaneiro e fiscalização de mercadorias
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">📊</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Fiscais</h4>
                      <p className="text-xs text-gray-600">Fiscalização Tributária</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Acesso restrito a dados para fiscalização tributária e cumprimento de obrigações legais
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">🏙️</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Municípios</h4>
                      <p className="text-xs text-gray-600">Licenciamento Municipal</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Acesso a informações relevantes para licenciamento e regulamentação municipal
                  </p>
                </div>
              </div>
            </div>

            {/* 1.4.2. Princípios de Compartilhamento */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-yellow-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.4.2
                </span>
                Princípios de Compartilhamento
              </h4>
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">⚖️</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Necessidade</h4>
                        <p className="text-xs text-gray-600">Princípio Fundamental</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">
                      Compartilhamos apenas os dados estritamente necessários para a finalidade específica
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">📏</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Proporcionalidade</h4>
                        <p className="text-xs text-gray-600">Balanço Adequado</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">
                      Garantimos que os dados compartilhados sejam proporcionais ao objetivo da solicitação
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">🔒</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Segurança</h4>
                        <p className="text-xs text-gray-600">Transmissão Segura</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">
                      Todos os dados são transmitidos por canais seguros, protegendo contra acesso não autorizado
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">📋</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Registro</h4>
                        <p className="text-xs text-gray-600">Auditoria e Conformidade</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">
                      Mantemos registro detalhado de todas as transferências de dados para auditoria e conformidade
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 1.5. Direitos dos Titulares */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-red-600 text-lg">👤</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.5. Direitos dos Titulares</h3>
            </div>

            <div className="mb-6 bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-gray-700 text-center">
                Os titulares de dados têm direitos garantidos por lei, que podem ser exercidos mediante solicitação
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🔍</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Direito de Acesso</h4>
                    <p className="text-xs text-gray-600">Informação Completa</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Solicitar acesso completo aos seus dados pessoais armazenados
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-green-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">✏️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Direito de Retificação</h4>
                    <p className="text-xs text-gray-600">Correção de Dados</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Corrigir dados incorretos ou desatualizados em nossos registros
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-red-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🗑️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Direito de Eliminação</h4>
                    <p className="text-xs text-gray-600">Exclusão de Dados</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Solicitar a exclusão de dados quando aplicável por lei
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🚫</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Direito de Oposição</h4>
                    <p className="text-xs text-gray-600">Controle de Processamento</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Opor-se ao tratamento de dados em determinadas circunstâncias legais
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">📤</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Direito à Portabilidade</h4>
                    <p className="text-xs text-gray-600">Transferência de Dados</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Receber seus dados em formato estruturado e reutilizável
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-teal-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">⏸️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Direito de Limitação</h4>
                    <p className="text-xs text-gray-600">Restrição Temporária</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Limitar temporariamente o tratamento de seus dados em situações específicas
                </p>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-bold text-gray-800 mb-3 text-center">COMO EXERCER SEUS DIREITOS</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-white text-sm">1</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-1">Solicitação Formal</h5>
                    <p className="text-sm text-gray-700">
                      Envie solicitação por escrito para nosso Encarregado de Proteção de Dados (DPO)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-white text-sm">2</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-1">Identificação</h5>
                    <p className="text-sm text-gray-700">
                      Forneça documentos que comprovem sua identidade para segurança do processo
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-white text-sm">3</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-1">Resposta</h5>
                    <p className="text-sm text-gray-700">
                      Responderemos dentro de 30 dias úteis, conforme exigido por lei
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 1.6. Bases Legais para Processamento */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-indigo-600 text-lg">⚖️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.6. Bases Legais para Processamento</h3>
            </div>

            <div className="mb-6 bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <p className="text-gray-700 text-center">
                O tratamento de dados é fundamentado em bases legais reconhecidas e específicas
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2 text-left w-1/3">Base Legal</th>
                    <th className="border border-gray-300 px-3 py-2 text-left w-2/3">Aplicação e Exemplos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold bg-blue-50">
                      Consentimento
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      Para dados adicionais que não sejam estritamente necessários para a prestação do serviço, 
                      obtido de forma explícita e informada
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2 font-semibold bg-green-50">
                      Execução de Contrato
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      Para dados essenciais à prestação de serviços de transporte, logística e operações relacionadas
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold bg-purple-50">
                      Obrigação Legal
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      Para dados exigidos por leis ou regulamentos aplicáveis, como registros obrigatórios de transporte, 
                      fiscalização e segurança
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2 font-semibold bg-yellow-50">
                      Interesse Público
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      Para dados processados por autoridades públicas em cumprimento de suas funções de fiscalização, 
                      segurança pública e regulamentação
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold bg-red-50">
                      Interesses Legítimos
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      Para dados necessários à segurança rodoviária, operação logística segura, prevenção de fraudes 
                      e melhoria contínua dos serviços
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-lg">📋</span>
                </div>
                <h5 className="font-bold text-gray-800">Documentação</h5>
                <p className="text-sm text-gray-700">
                  Cada base legal é documentada e auditável
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-lg">⚖️</span>
                </div>
                <h5 className="font-bold text-gray-800">Conformidade</h5>
                <p className="text-sm text-gray-700">
                  Total conformidade com legislação nacional e internacional
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-lg">🔄</span>
                </div>
                <h5 className="font-bold text-gray-800">Revisão</h5>
                <p className="text-sm text-gray-700">
                  Bases legais revisadas periodicamente
                </p>
              </div>
            </div>
          </section>

          {/* Resumo e Contatos */}
          <section className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-lg">📞</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Informações de Contato e Resumo</h3>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-2">NOSSO COMPROMISSO COM A PRIVACIDADE</h4>
                <p className="text-gray-700">
                  Protegemos seus dados com transparência, segurança e respeito aos seus direitos
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-xl">👤</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Encarregado de Dados (DPO)</h5>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>Responsável pela proteção de dados</li>
                    <li>Contato principal para direitos</li>
                    <li>Supervisão de conformidade</li>
                    <li>dpo@transporte.gov.mz</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-xl">🛡️</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Segurança da Informação</h5>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>Medidas técnicas avançadas</li>
                    <li>Criptografia de ponta a ponta</li>
                    <li>Monitoramento contínuo</li>
                    <li>seguranca@transporte.gov.mz</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-xl">📞</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Canal de Atendimento</h5>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>Suporte a titulares de dados</li>
                    <li>Orientação sobre direitos</li>
                    <li>Resolução de dúvidas</li>
                    <li>privacidade@transporte.gov.mz</li>
                  </ul>
                </div>
              </div>

              {/* Resumo de Direitos */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-bold text-gray-800 mb-3 text-center">RESUMO DOS SEUS DIREITOS</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="text-xl font-bold text-blue-600">6</p>
                    <p className="text-sm text-gray-700">Direitos Garantidos</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="text-xl font-bold text-green-600">5</p>
                    <p className="text-sm text-gray-700">Bases Legais</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="text-xl font-bold text-purple-600">7</p>
                    <p className="text-sm text-gray-700">Princípios Fundamentais</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="text-xl font-bold text-red-600">30</p>
                    <p className="text-sm text-gray-700">Dias para Resposta</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-700 mb-4">
                  <strong>Esta política está em conformidade com a legislação de proteção de dados vigente</strong>
                </p>
                <div className="flex justify-center space-x-4">
                  <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded">Legalidade</span>
                  <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded">Transparência</span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded">Segurança</span>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded">Confidencialidade</span>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-center">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Política de Privacidade e Proteção de Dados</strong>
              </p>
              <p className="text-xs text-gray-600">
                Documento versão 1.0 | Última atualização: {new Date().toLocaleDateString('pt-MZ')} | 
                Próxima revisão: {new Date(new Date().setMonth(new Date().getMonth() + 6)).toLocaleDateString('pt-MZ')}
              </p>
              <div className="mt-4 flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-8">
                <div className="text-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-sm">🔐</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Criptografia AES-256</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-sm">✅</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Conformidade RGPD</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-sm">📋</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Certificação ISO 27001</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PoliticaPrivacidadeProtecaoDados