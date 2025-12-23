import React from 'react'

function CidadeBeira() {
  return (
    <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-sm text-gray-900">
      {/* Cabeçalho */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-green-50">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-2 rounded-lg mr-3">🤝</span>
          Proposta de Parceria Estratégica para a Modernização da Gestão de Transportes Rodoviários na Cidade da Beira
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Parceria entre a Mega Centro de Logística e o Município da Beira para um sistema integrado de gestão de transportes
        </p>
      </div>

      {/* Conteúdo com scroll */}
      <div className="flex-1 overflow-y-auto max-h-[900px]">
        <div className="p-6 space-y-8">
          {/* 1. Introdução e Contexto Estratégico */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-blue-600 text-lg">🏙️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1. Introdução e Contexto Estratégico</h3>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                A cidade da Beira, enquanto epicentro do <strong>Corredor da Beira</strong> e ponto de entrada do 
                <strong> segundo maior porto de Moçambique</strong>, desempenha um papel central no comércio regional e internacional.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded border border-blue-100">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                    Importância Econômica
                  </h4>
                  <p className="text-sm text-gray-700">
                    Tráfego intenso de camiões de diferentes tipos e capacidades, fundamental para a economia regional
                  </p>
                </div>
                <div className="bg-white p-4 rounded border border-green-100">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                    Desafios Atuais
                  </h4>
                  <p className="text-sm text-gray-700">
                    Gestão urbana, fiscalização rodoviária e arrecadação municipal enfrentam desafios significativos
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-100 to-green-100 p-4 rounded border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-2 text-center">PROPOSTA DA MEGA CENTRO DE LOGÍSTICA</h4>
                <p className="text-gray-700 text-center">
                  Empresa moçambicana com operações consolidadas no Porto da Beira propõe-se como parceira do município para 
                  criar um <strong>sistema integrado e eficiente</strong> para o registo, gestão e recolha de taxas de todos os 
                  camiões de carga que operam na região.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Vantagens da Parceria */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-green-600 text-lg">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">2. Vantagens da Parceria com a Mega Centro de Logística</h3>
            </div>

            <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
              <p className="text-sm text-gray-700 text-center">
                Uma parceria com a nossa empresa representa uma oportunidade para o município modernizar a sua 
                administração do sector de transportes, com <strong>benefícios claros e mensuráveis</strong>.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2 text-left w-1/3">Vantagem para o Município</th>
                    <th className="border border-gray-300 px-3 py-2 text-left w-2/3">Explicação Técnica e Operacional</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold bg-green-50">
                      Aumento da Arrecadação e Redução de Sonegação
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      Sistema centralizado e obrigatório de registo de todos os camiões que acedem ao Porto da Beira – 
                      ponto de passagem obrigatório para o transporte internacional – garantindo uma base fiscal abrangente e actualizada.
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2 font-semibold bg-blue-50">
                      Maior Eficiência e Transparência
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      Digitalização do processo de cobrança e repasse, com relatórios detalhados e auditáveis por tipo de veículo, 
                      eliminando processos manuais e aumentando a previsibilidade das receitas.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold bg-purple-50">
                      Melhoria do Planeamento Urbano e Logístico
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      A criação de um cadastro municipal de veículos pesados fornecerá dados valiosos (rotas, tipos de carga, 
                      frequência) para o planeamento de infra-estruturas, tráfego e políticas públicas.
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2 font-semibold bg-red-50">
                      Reforço da Segurança Rodoviária
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      O registo na base de dados permite a verificação da conformidade dos veículos com os limites legais de 
                      peso e dimensão estabelecidos pelo Decreto 14/2008, promovendo a segurança das vias.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold bg-yellow-50">
                      Vantagem Competitiva para a Beira
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      A criação de um ecossistema logístico moderno e bem regulado atrai mais investimentos e operadores, 
                      reforçando a posição da Beira como o hub logístico primário para os países do interior 
                      (Zimbabué, Zâmbia, Malawi, RDC).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. Benefícios para Operadores de Transporte */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-orange-600 text-lg">🚚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">3. Benefícios Directos para os Operadores de Transporte (Transportadores)</h3>
            </div>

            <div className="mb-6">
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-200">
                <p className="text-gray-700 leading-relaxed">
                  Esta parceria não visa apenas melhorar a administração municipal, mas também valorizar e profissionalizar o 
                  sector de transporte rodoviário. Para isso, propõe-se a criação de um 
                  <strong> Regime de Benefícios Fiscais</strong> que torna o registo na Mega Centro de Logística 
                  altamente vantajoso para os transportadores.
                </p>
              </div>
            </div>

            {/* 3.1 Isenções e Benefícios Propostos */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  3.1
                </span>
                Isenções e Benefícios Propostos
              </h4>
              
              <div className="mb-4 p-3 bg-green-50 rounded border border-green-200">
                <p className="text-sm text-gray-700 text-center">
                  <strong>Condição:</strong> Operadores que efectuarem o seu registo e mantiverem a sua situação regularizada 
                  na base de dados da Mega Centro de Logística
                </p>
              </div>

              <div className="overflow-x-auto max-h-[500px]">
                <table className="min-w-full bg-white border border-gray-300 text-sm">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2 text-left w-2/5">Benefício para o Transportador</th>
                      <th className="border border-gray-300 px-3 py-2 text-left w-3/5">Condição e Explicação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-blue-50">
                        Isenção da Taxa de Circulação Municipal
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        Isenção total da taxa anual de circulação para veículos pesados, desde que em situação regular.
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-green-50">
                        Isenção de Taxas de Estacionamento
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        Acesso gratuito ou a custo reduzido às zonas de estacionamento regulamentadas para operações logísticas.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-purple-50">
                        Desconto em Impostos Municipais
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        Dedução de até 15% no valor da contribuição autárquica devida pela empresa transportadora.
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-orange-50">
                        Agilização em Processos Licenciamento
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        Via prioritária e simplificada para obtenção de licenças de operação e alvarás junto dos serviços municipais.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-red-50">
                        Certificado de Operador Logístico Regular
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        Emissão de um certificado digital que atesta a regularidade fiscal e operacional, facilitando contractos 
                        com clientes e acesso a crédito.
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-yellow-50">
                        Prioridade em Fiscalizações e Postos de Controlo
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        Atendimento prioritário e redução de tempos de espera em operações de fiscalização municipal, 
                        desde que o operador esteja devidamente registado.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-blue-50">
                        Acesso Preferencial a Projectos Municipais
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        Preferência na contratação para serviços de transporte e logística em projectos, obras e campanhas 
                        promovidas pelo Município da Beira.
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-green-50">
                        Acesso a Zonas de Circulação Condicionada
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        Autorização especial para circulação em zonas urbanas de acesso restrito, em horários definidos 
                        para operações de carga e descarga.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-purple-50">
                        Participação em Programas de Capacitação
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        Acesso gratuito ou com desconto a formações em segurança rodoviária, logística urbana e boas práticas ambientais.
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-orange-50">
                        Apoio na Regularização Documental
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        Assistência técnica e orientação para regularização de licenças, inspecções e documentação dos veículos e motoristas.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3.2 Mecanismo de Atribuição */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  3.2
                </span>
                Mecanismo de Atribuição
              </h4>
              
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Registo e Pagamento</h5>
                      <p className="text-sm text-gray-700">
                        Após o registo e pagamento da Taxa de Registo e Operação Logística, o sistema emitirá automaticamente um 
                        <strong> Certificado Digital de Operador Regular</strong>.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Chave de Acesso</h5>
                      <p className="text-sm text-gray-700">
                        Este certificado, com um <strong>código de validação único</strong>, será a chave para o transportador 
                        aceder aos benefícios listados.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Reconhecimento Municipal</h5>
                      <p className="text-sm text-gray-700">
                        O município compromete-se a reconhecer este certificado como prova de regularidade, 
                        dispensando o pagamento das taxas municipais correspondentes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                  <p className="text-sm text-gray-700 text-center">
                    <strong>Objectivo Final:</strong> Criar um ciclo virtuoso onde a formalização traz benefícios tangíveis, 
                    incentivando a adesão massiva ao sistema, o que, por sua vez, maximiza a arrecadação da taxa principal 
                    e a qualidade dos dados para o município.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Classificação Técnica e Taxas */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-purple-600 text-lg">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">4. Classificação Técnica dos Camiões e Proposta de Taxas</h3>
            </div>

            <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-gray-700 text-center">
                Para que a cobrança seja justa e técnica, propomos um modelo baseado na classificação dos veículos, 
                considerando o seu impacto nas infra-estruturas (capacidade de carga) e a sua complexidade operacional 
                (tipo de carroçaria e carga).
              </p>
            </div>

            {/* Proposta de Tabela de Taxas Anuais */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 text-center bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded">
                Proposta de Tabela de Taxas para Camiões Registados (Taxa Anual - MZN)
              </h4>

              {/* Camiões Rígidos */}
              <div className="mb-4">
                <h5 className="font-bold text-gray-800 mb-2 text-lg border-b pb-2">Camiões Rígidos</h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 px-3 py-2 text-left">Tipo de Camião</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Capacidade/Característica-Chave</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Taxa Anual (MZN)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Camião Baú / Furgão</td>
                        <td className="border border-gray-300 px-3 py-2">Até 3.5t (Ligeiro)</td>
                        <td className="border border-gray-300 px-3 py-2 text-green-600 font-bold">2,500</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Camião Baú / Furgão</td>
                        <td className="border border-gray-300 px-3 py-2">3.5t – 16t (Médio)</td>
                        <td className="border border-gray-300 px-3 py-2 text-green-600 font-bold">5,000</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Camião Basculante</td>
                        <td className="border border-gray-300 px-3 py-2">Construção e inertes</td>
                        <td className="border border-gray-300 px-3 py-2 text-green-600 font-bold">5,500</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Camião Frigorífico</td>
                        <td className="border border-gray-300 px-3 py-2">Sistema de refrigeração</td>
                        <td className="border border-gray-300 px-3 py-2 text-green-600 font-bold">6,500</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Camião-Tanque</td>
                        <td className="border border-gray-300 px-3 py-2">Líquidos/combustíveis</td>
                        <td className="border border-gray-300 px-3 py-2 text-green-600 font-bold">7,000</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Camião Graneleiro</td>
                        <td className="border border-gray-300 px-3 py-2">Grãos e sólidos a granel</td>
                        <td className="border border-gray-300 px-3 py-2 text-green-600 font-bold">5,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Camiões Articulados */}
              <div className="mb-4">
                <h5 className="font-bold text-gray-800 mb-2 text-lg border-b pb-2">Camiões Articulados (Cavalo + Semi-Reboque)</h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 px-3 py-2 text-left">Tipo de Camião</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Característica-Chave</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Taxa Anual (MZN)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Porta-Contentores</td>
                        <td className="border border-gray-300 px-3 py-2">Contentores 20&apos;/40&apos;</td>
                        <td className="border border-gray-300 px-3 py-2 text-green-600 font-bold">8,500</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Camião Sider</td>
                        <td className="border border-gray-300 px-3 py-2">Acesso lateral total</td>
                        <td className="border border-gray-300 px-3 py-2 text-green-600 font-bold">7,500</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Camião Plataforma</td>
                        <td className="border border-gray-300 px-3 py-2">Cargas indivisíveis</td>
                        <td className="border border-gray-300 px-3 py-2 text-green-600 font-bold">8,000</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Camião Autoportante</td>
                        <td className="border border-gray-300 px-3 py-2">Transporte de veículos</td>
                        <td className="border border-gray-300 px-3 py-2 text-green-600 font-bold">8,500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Camiões Especializados */}
              <div className="mb-4">
                <h5 className="font-bold text-gray-800 mb-2 text-lg border-b pb-2">Camiões Especializados</h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 px-3 py-2 text-left">Tipo de Camião</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Característica-Chave</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Taxa Anual (MZN)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Camião Munck</td>
                        <td className="border border-gray-300 px-3 py-2">Movimentação de cargas</td>
                        <td className="border border-gray-300 px-3 py-2 text-green-600 font-bold">9,000</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Carga Perigosa</td>
                        <td className="border border-gray-300 px-3 py-2">Exige certificação específica</td>
                        <td className="border border-gray-300 px-3 py-2 text-red-600 font-bold">+2,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                <p className="text-sm text-gray-700 text-center">
                  <strong>Nota:</strong> Os valores acima são uma proposta inicial para discussão. A estrutura permite 
                  ajustes finos com base em análises de custos municipais e políticas de desenvolvimento sectorial.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Tabela de Taxa por Carga */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-red-600 text-lg">📦</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">6. Proposta de Tabela de Taxa por Carga para Camiões</h3>
            </div>

            <div className="mb-6 bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-gray-700 text-center">
                Para garantir uma cobrança proporcional ao uso das infra-estruturas e à complexidade operacional de cada 
                operação logística, propõe-se um modelo baseado na categoria do veículo e no tipo de carga.
              </p>
            </div>

            {/* Tabela de Taxa por Carga */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 text-center bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded">
                Tabela de Taxa por Carga (MZN por viagem/carga)
              </h4>

              {/* Camiões Rígidos */}
              <div className="mb-4">
                <h5 className="font-bold text-gray-800 mb-2 text-lg border-b pb-2">Camiões Rígidos</h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 px-3 py-2 text-left">Tipo de Camião</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Capacidade</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Taxa por Carga (MZN)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Camião Baú / Furgão</td>
                        <td className="border border-gray-300 px-3 py-2">Carga geral até 3.5t</td>
                        <td className="border border-gray-300 px-3 py-2 text-blue-600 font-bold">150</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Camião Baú / Furgão</td>
                        <td className="border border-gray-300 px-3 py-2">Carga geral 3.5t – 16t</td>
                        <td className="border border-gray-300 px-3 py-2 text-blue-600 font-bold">300</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Camião Basculante</td>
                        <td className="border border-gray-300 px-3 py-2">Inertes, areia, pedra, materiais de construção</td>
                        <td className="border border-gray-300 px-3 py-2 text-blue-600 font-bold">350</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Camião Frigorífico</td>
                        <td className="border border-gray-300 px-3 py-2">Produtos refrigerados ou congelados</td>
                        <td className="border border-gray-300 px-3 py-2 text-blue-600 font-bold">400</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Camião-Tanque</td>
                        <td className="border border-gray-300 px-3 py-2">Líquidos alimentares, água, produtos não perigosos</td>
                        <td className="border border-gray-300 px-3 py-2 text-blue-600 font-bold">450</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Camião Graneleiro</td>
                        <td className="border border-gray-300 px-3 py-2">Grãos, cimento, sólidos a granel</td>
                        <td className="border border-gray-300 px-3 py-2 text-blue-600 font-bold">300</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Camiões Articulados */}
              <div className="mb-4">
                <h5 className="font-bold text-gray-800 mb-2 text-lg border-b pb-2">Camiões Articulados</h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 px-3 py-2 text-left">Tipo de Camião</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Capacidade</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Taxa por Carga (MZN)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Porta-Contentores</td>
                        <td className="border border-gray-300 px-3 py-2">Contentor 20&apos; / 40&apos; (seco)</td>
                        <td className="border border-gray-300 px-3 py-2 text-blue-600 font-bold">600</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Camião Sider</td>
                        <td className="border border-gray-300 px-3 py-2">Carga com acesso lateral total</td>
                        <td className="border border-gray-300 px-3 py-2 text-blue-600 font-bold">550</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Camião Plataforma</td>
                        <td className="border border-gray-300 px-3 py-2">Cargas longas, equipamentos, estruturas</td>
                        <td className="border border-gray-300 px-3 py-2 text-blue-600 font-bold">600</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Camião Autoportante</td>
                        <td className="border border-gray-300 px-3 py-2">Veículos ligeiros (até 8 unidades)</td>
                        <td className="border border-gray-300 px-3 py-2 text-blue-600 font-bold">650</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Camiões Especializados */}
              <div className="mb-4">
                <h5 className="font-bold text-gray-800 mb-2 text-lg border-b pb-2">Camiões Especializados</h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 px-3 py-2 text-left">Tipo de Camião</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Capacidade</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Taxa por Carga (MZN)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Camião Munck / Guindaste</td>
                        <td className="border border-gray-300 px-3 py-2">Cargas pesadas com movimentação especial</td>
                        <td className="border border-gray-300 px-3 py-2 text-red-600 font-bold">800</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Camião-Tanque (Produtos Químicos)</td>
                        <td className="border border-gray-300 px-3 py-2">Líquidos perigosos (combustível, químicos)</td>
                        <td className="border border-gray-300 px-3 py-2 text-red-600 font-bold">700 + 250*</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Transporte de Carga Excepcional</td>
                        <td className="border border-gray-300 px-3 py-2">Dimensões ou peso acima dos limites legais</td>
                        <td className="border border-gray-300 px-3 py-2 text-red-600 font-bold">1.000 + sob taxa**</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Notas:</strong>
                </p>
                <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                  <li>Acréscimo de 250 MZN para cargas perigosas (requer certificação ADR ou equivalente)</li>
                  <li>Cargas excepcionais sujeitas a análise prévia e taxa variável conforme necessidade de escolta, 
                      autorizações especiais e impacto na infra-estrutura</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 7. Mecanismo Operacional */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-yellow-600 text-lg">⚙️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">7. Mecanismo Operacional da Parceria</h3>
            </div>

            <div className="mb-6 bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border border-blue-200">
              <p className="text-gray-700 text-center mb-4">
                <strong>O sistema funcionará de forma integrada e sem custos operacionais para o município:</strong>
              </p>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">1</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Registo Obrigatório e Beneficiário</h4>
                      <p className="text-xs text-gray-600">Primeira Etapa do Processo</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Todos os operadores registam-se na base de dados da Mega Centro de Logística. Após o pagamento da taxa única, 
                    recebem o <strong>Certificado Digital de Operador Regular</strong> que concede acesso aos benefícios fiscais municipais.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">2</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Emissão e Cobrança</h4>
                      <p className="text-xs text-gray-600">Responsabilidade da Mega Centro</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    A Mega Centro emite o certificado e cobra a <strong>Taxa Anual de Registo e Operação Logística</strong>. 
                    Processo totalmente digitalizado e automatizado.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">3</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Repasse e Fiscalização</h4>
                      <p className="text-xs text-gray-600">Parceria com o Município</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Os valores arrecadados são repassados <strong>integral e mensalmente</strong> ao município, acompanhados de 
                    relatório detalhado. O município fiscaliza a validade do certificado digital como prova de que o transportador 
                    está em dia com o sistema e, portanto, isento de outras taxas.
                  </p>
                </div>
              </div>
            </div>

            {/* Fluxograma Simplificado */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3 text-center">Fluxograma da Parceria</h4>
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-xl">🚚</span>
                  </div>
                  <p className="text-sm font-semibold mt-2">Transportador</p>
                  <p className="text-xs text-gray-600">Registo no sistema</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-gray-400">→</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-xl">💳</span>
                  </div>
                  <p className="text-sm font-semibold mt-2">Pagamento Taxa</p>
                  <p className="text-xs text-gray-600">Taxa anual/carga</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-gray-400">→</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-xl">📄</span>
                  </div>
                  <p className="text-sm font-semibold mt-2">Certificado Digital</p>
                  <p className="text-xs text-gray-600">Emissão automática</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-gray-400">→</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-xl">🏛️</span>
                  </div>
                  <p className="text-sm font-semibold mt-2">Município</p>
                  <p className="text-xs text-gray-600">Repasse + Benefícios</p>
                </div>
              </div>
            </div>
          </section>

          {/* 8. Conclusão */}
          <section className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-lg">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">8. Conclusão e Próximos Passos</h3>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-2">PARCERIA GANHA-GANHA-GANHA</h4>
                <p className="text-gray-700">
                  Esta proposta cria benefícios mútuos para todas as partes envolvidas
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Para o Município */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-xl">🏛️</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Para o Município</h5>
                  </div>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    <li>Receita garantida e previsível</li>
                    <li>Controle efectivo do sector</li>
                    <li>Dados precisos para planeamento</li>
                    <li>Redução de custos operacionais</li>
                    <li>Modernização administrativa</li>
                  </ul>
                </div>

                {/* Para os Transportadores */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-xl">🚚</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Para os Transportadores</h5>
                  </div>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    <li>Redução da carga fiscal total</li>
                    <li>Agilização burocrática</li>
                    <li>Valorização profissional</li>
                    <li>Acesso a benefícios específicos</li>
                    <li>Certificação digital reconhecida</li>
                  </ul>
                </div>

                {/* Para a Economia da Beira */}
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-xl">📈</span>
                    </div>
                    <h5 className="font-bold text-gray-800">Para a Economia da Beira</h5>
                  </div>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    <li>Sector de transportes organizado</li>
                    <li>Eficiência logística aumentada</li>
                    <li>Atractividade para investimentos</li>
                    <li>Posição competitiva reforçada</li>
                    <li>Desenvolvimento económico sustentável</li>
                  </ul>
                </div>
              </div>

              {/* Próximos Passos */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-bold text-gray-800 mb-3 text-center">PRÓXIMOS PASSOS RECOMENDADOS</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">1</span>
                      <span className="font-semibold">Análise Técnica Detalhada</span>
                    </div>
                    <p className="text-xs text-gray-700">Revisão da proposta por equipas técnicas municipais</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">2</span>
                      <span className="font-semibold">Negociação de Acordo</span>
                    </div>
                    <p className="text-xs text-gray-700">Definição de termos específicos da parceria</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">3</span>
                      <span className="font-semibold">Aprovação Legal</span>
                    </div>
                    <p className="text-xs text-gray-700">Validação jurídica e aprovação pelas instâncias competentes</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">4</span>
                      <span className="font-semibold">Implementação Piloto</span>
                    </div>
                    <p className="text-xs text-gray-700">Fase inicial de testes e ajustes operacionais</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Resumo de Benefícios */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">RESUMO DE BENEFÍCIOS ESPERADOS</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-2xl font-bold text-green-600">100%</p>
                <p className="text-sm text-gray-700">Cobertura do sector</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-2xl font-bold text-blue-600">0</p>
                <p className="text-sm text-gray-700">Custo para o município</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <p className="text-2xl font-bold text-purple-600">10+</p>
                <p className="text-sm text-gray-700">Benefícios para transportadores</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <p className="text-2xl font-bold text-orange-600">24/7</p>
                <p className="text-sm text-gray-700">Sistema operacional</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-700">
                <strong>Parceria estratégica para a modernização da gestão de transportes rodoviários na Cidade da Beira</strong>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CidadeBeira