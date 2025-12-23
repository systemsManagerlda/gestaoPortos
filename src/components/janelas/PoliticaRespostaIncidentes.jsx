import React from 'react'

function PoliticaRespostaIncidentes() {
  return (
    <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-sm text-gray-900">
      {/* Cabeçalho */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-orange-50">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-2 rounded-lg mr-3">🚨</span>
          Política de Resposta a Incidentes
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Diretrizes, responsabilidades e procedimentos para identificação, resposta, contenção e tratamento de incidentes
        </p>
      </div>

      {/* Conteúdo com scroll */}
      <div className="flex-1 overflow-y-auto max-h-[900px]">
        <div className="p-6 space-y-8">
          {/* Introdução */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-red-600 text-lg">📋</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Introdução e Objetivo</h3>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                Esta Política estabelece diretrizes, responsabilidades e procedimentos para identificação, resposta, 
                contenção, comunicação e tratamento de incidentes de segurança, operacionais e de conformidade.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white p-4 rounded border border-red-100">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="w-4 h-4 bg-red-500 rounded-full mr-2"></span>
                    Continuidade dos Serviços
                  </h4>
                  <p className="text-sm text-gray-700">
                    Garantir a continuidade operacional do sistema durante e após incidentes
                  </p>
                </div>
                <div className="bg-white p-4 rounded border border-orange-100">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="w-4 h-4 bg-orange-500 rounded-full mr-2"></span>
                    Proteção de Dados
                  </h4>
                  <p className="text-sm text-gray-700">
                    Assegurar a proteção dos dados pessoais e sensíveis do sistema
                  </p>
                </div>
                <div className="bg-white p-4 rounded border border-yellow-100">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></span>
                    Cumprimento Legal
                  </h4>
                  <p className="text-sm text-gray-700">
                    Cumprir as obrigações legais e regulatórias aplicáveis
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 1.1. Definição de Incidentes */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-orange-600 text-lg">⚠️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.1. Definição de Incidentes</h3>
            </div>

            <div className="mb-4 p-3 bg-orange-50 rounded border border-orange-200">
              <p className="text-sm text-gray-700 text-center">
                Considera-se incidente qualquer evento real ou potencial que comprometa a confidencialidade, 
                integridade, disponibilidade ou conformidade do sistema.
              </p>
            </div>

            {/* 1.1.1. Incidentes de Segurança */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.1.1
                </span>
                Incidentes de Segurança
              </h4>
              
              <div className="bg-gradient-to-r from-red-50 to-white p-4 rounded-lg border border-red-200">
                <p className="text-sm text-gray-700 mb-3">
                  Incluem eventos que afetam diretamente a proteção das informações:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span className="text-sm text-gray-700">Acesso não autorizado a dados pessoais ou sensíveis</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span className="text-sm text-gray-700">Perda, roubo ou extravio de dispositivos contendo dados</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span className="text-sm text-gray-700">Ataques de malware, ransomware ou outras ameaças cibernéticas</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span className="text-sm text-gray-700">Violação das políticas de segurança da informação</span>
                  </div>
                  <div className="flex items-start md:col-span-2">
                    <span className="text-red-500 mr-2">•</span>
                    <span className="text-sm text-gray-700">Vazamento ou exposição indevida de dados confidenciais</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 1.1.2. Incidentes Operacionais */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.1.2
                </span>
                Incidentes Operacionais
              </h4>
              
              <div className="bg-gradient-to-r from-yellow-50 to-white p-4 rounded-lg border border-yellow-200">
                <p className="text-sm text-gray-700 mb-3">
                  Relacionados à disponibilidade e funcionamento correto do sistema:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span className="text-sm text-gray-700">Indisponibilidade do sistema superior a 1 hora</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span className="text-sm text-gray-700">Corrupção ou perda de dados críticos</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span className="text-sm text-gray-700">Erros sistemáticos de cálculo ou processamento</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span className="text-sm text-gray-700">Falhas na geração ou validação de QR Codes</span>
                  </div>
                  <div className="flex items-start md:col-span-2">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span className="text-sm text-gray-700">Perda ou interrupção do rastreamento de cargas</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 1.1.3. Incidentes de Conformidade */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.1.3
                </span>
                Incidentes de Conformidade
              </h4>
              
              <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700 mb-3">
                  Envolvem descumprimento de requisitos legais ou regulatórios:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-sm text-gray-700">Violação de regulamentações NB1/NB2</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-sm text-gray-700">Processamento incorreto ou indevido de dados pessoais</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-sm text-gray-700">Falha em notificar autoridades dentro dos prazos legais</span>
                  </div>
                  <div className="flex items-start md:col-span-2">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-sm text-gray-700">Não conformidade com obrigações contratuais ou regulatórias</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 1.2. Níveis de Gravidade */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-red-600 text-lg">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.2. Níveis de Gravidade</h3>
            </div>

            <div className="mb-6 bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-gray-700 text-center">
                Os incidentes são classificados conforme impacto, alcance e urgência de resposta
              </p>
            </div>

            {/* Tabela de Níveis de Gravidade */}
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2 text-left w-1/6">Nível</th>
                    <th className="border border-gray-300 px-3 py-2 text-left w-2/6">Características</th>
                    <th className="border border-gray-300 px-3 py-2 text-left w-2/6">Exemplos</th>
                    <th className="border border-gray-300 px-3 py-2 text-left w-1/6">Prazo Resposta</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Crítico */}
                  <tr className="bg-red-50">
                    <td className="border border-gray-300 px-3 py-2">
                      <span className="inline-block w-6 h-6 bg-red-600 rounded-full text-white text-center font-bold">1</span>
                      <span className="ml-2 font-bold text-red-600">Crítico</span>
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      Impacto severo, risco institucional, violação legal significativa
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      • Vazamento de dados sensíveis<br/>
                      • Ataque que compromete o controle do sistema<br/>
                      • Indisponibilidade superior a 24 horas
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                      ≤ 1 hora
                    </td>
                  </tr>
                  {/* Alto */}
                  <tr className="bg-orange-50">
                    <td className="border border-gray-300 px-3 py-2">
                      <span className="inline-block w-6 h-6 bg-orange-500 rounded-full text-white text-center font-bold">2</span>
                      <span className="ml-2 font-bold text-orange-600">Alto</span>
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      Impacto considerável, múltiplos usuários afetados, violação grave
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      • Acesso não autorizado sem evidência de vazamento<br/>
                      • Indisponibilidade entre 4 e 24 horas<br/>
                      • Erros que afetam múltiplas operações
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                      ≤ 4 horas
                    </td>
                  </tr>
                  {/* Médio */}
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 px-3 py-2">
                      <span className="inline-block w-6 h-6 bg-yellow-500 rounded-full text-white text-center font-bold">3</span>
                      <span className="ml-2 font-bold text-yellow-600">Médio</span>
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      Impacto limitado, degradação de serviço, violações menores
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      • Degradação de performance<br/>
                      • Erros isolados ou localizados<br/>
                      • Violações menores de política
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                      ≤ 24 horas
                    </td>
                  </tr>
                  {/* Baixo */}
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 px-3 py-2">
                      <span className="inline-block w-6 h-6 bg-green-500 rounded-full text-white text-center font-bold">4</span>
                      <span className="ml-2 font-bold text-green-600">Baixo</span>
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      Impacto mínimo, questões cosméticas, melhorias sugeridas
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      • Problemas de interface<br/>
                      • Solicitações de melhoria<br/>
                      • Incidentes não recorrentes
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      Planejado
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Indicadores de Gravidade */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
                <p className="text-2xl font-bold text-red-600">1</p>
                <p className="text-sm font-semibold text-gray-800">Crítico</p>
                <p className="text-xs text-gray-600">Resposta imediata</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 text-center">
                <p className="text-2xl font-bold text-orange-600">2</p>
                <p className="text-sm font-semibold text-gray-800">Alto</p>
                <p className="text-xs text-gray-600">Resposta urgente</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center">
                <p className="text-2xl font-bold text-yellow-600">3</p>
                <p className="text-sm font-semibold text-gray-800">Médio</p>
                <p className="text-xs text-gray-600">Resposta prioritária</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <p className="text-2xl font-bold text-green-600">4</p>
                <p className="text-sm font-semibold text-gray-800">Baixo</p>
                <p className="text-xs text-gray-600">Resposta planejada</p>
              </div>
            </div>
          </section>

          {/* 1.3. Equipe de Resposta a Incidentes */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-blue-600 text-lg">👥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.3. Equipe de Resposta a Incidentes (CSIRT)</h3>
            </div>

            {/* 1.3.1. Composição */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.3.1
                </span>
                Composição da Equipe
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">👑</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Líder do Incidente</h4>
                      <p className="text-xs text-gray-600">Coordenação Geral</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Responsável por decisões estratégicas e coordenação geral da resposta
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">💻</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Especialista Técnico</h4>
                      <p className="text-xs text-gray-600">Análise Técnica</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Analisa causas técnicas e executa ações corretivas
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">⚖️</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Especialista Legal</h4>
                      <p className="text-xs text-gray-600">Implicações Legais</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Avalia implicações legais e regulatórias do incidente
                  </p>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-white p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">📢</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Comunicador</h4>
                      <p className="text-xs text-gray-600">Gestão de Comunicações</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Gerencia comunicações internas e externas durante o incidente
                  </p>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-white p-4 rounded-lg border border-red-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">📝</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Documentador</h4>
                      <p className="text-xs text-gray-600">Registro e Evidências</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Registra cronologia, decisões e evidências do incidente
                  </p>
                </div>

                <div className="bg-gradient-to-r from-teal-50 to-white p-4 rounded-lg border border-teal-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">🔄</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Suporte de Operações</h4>
                      <p className="text-xs text-gray-600">Continuidade</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Garante continuidade das operações durante o incidente
                  </p>
                </div>
              </div>
            </div>

            {/* 1.3.2. Ativação da Equipe */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.3.2
                </span>
                Ativação da Equipe
              </h4>
              
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700 mb-4 text-center">
                  A ativação do CSIRT segue um processo estruturado:
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Detecção e Notificação</h5>
                      <p className="text-sm text-gray-700">
                        Detecção automática ou notificação manual do incidente
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Classificação Preliminar</h5>
                      <p className="text-sm text-gray-700">
                        Classificação preliminar da gravidade do incidente
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Ativação do Nível Adequado</h5>
                      <p className="text-sm text-gray-700">
                        Ativação do nível adequado da equipe conforme a gravidade
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Reunião Inicial</h5>
                      <p className="text-sm text-gray-700">
                        Reunião inicial de avaliação e alinhamento da equipe
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-sm font-bold">5</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Atribuição de Responsabilidades</h5>
                      <p className="text-sm text-gray-700">
                        Atribuição formal de responsabilidades e tarefas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 1.4. Processo de Resposta */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-purple-600 text-lg">🔄</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.4. Processo de Resposta a Incidentes</h3>
            </div>

            <div className="mb-6 bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-gray-700 text-center">
                Processo estruturado em 5 fases para garantir resposta eficaz e recuperação completa
              </p>
            </div>

            {/* Fluxo do Processo */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-xl">📋</span>
                  </div>
                  <p className="text-sm font-semibold mt-2">Preparação</p>
                  <p className="text-xs text-gray-600">Fase 1</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-gray-400">→</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-xl">🔍</span>
                  </div>
                  <p className="text-sm font-semibold mt-2">Detecção</p>
                  <p className="text-xs text-gray-600">Fase 2</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-gray-400">→</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-xl">🛡️</span>
                  </div>
                  <p className="text-sm font-semibold mt-2">Contenção</p>
                  <p className="text-xs text-gray-600">Fase 3</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-gray-400">→</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-xl">🔄</span>
                  </div>
                  <p className="text-sm font-semibold mt-2">Recuperação</p>
                  <p className="text-xs text-gray-600">Fase 4</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-gray-400">→</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-xl">📚</span>
                  </div>
                  <p className="text-sm font-semibold mt-2">Lições</p>
                  <p className="text-xs text-gray-600">Fase 5</p>
                </div>
              </div>
            </div>

            {/* Fases Detalhadas */}
            <div className="space-y-4">
              {/* Fase 1 */}
              <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Fase 1: Preparação</h4>
                    <p className="text-xs text-gray-600">Prevenção e Prontidão</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Inventário atualizado de ativos e sistemas
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Plano de resposta documentado e aprovado
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Equipe treinada e exercícios periódicos realizados
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Ferramentas de resposta disponíveis e testadas
                  </li>
                </ul>
              </div>

              {/* Fase 2 */}
              <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Fase 2: Detecção e Análise</h4>
                    <p className="text-xs text-gray-600">Identificação e Avaliação</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Monitoramento contínuo de eventos e alertas
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Análise detalhada de logs e indicadores
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Determinação do escopo, impacto e sistemas afetados
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Classificação definitiva da gravidade
                  </li>
                </ul>
              </div>

              {/* Fase 3 */}
              <div className="bg-gradient-to-r from-red-50 to-white p-4 rounded-lg border border-red-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Fase 3: Contenção e Erradicação</h4>
                    <p className="text-xs text-gray-600">Controlo e Eliminação</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Isolamento imediato de sistemas afetados
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Coleta e preservação de evidências forenses
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Identificação e eliminação da causa raiz
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Aplicação de correções temporárias ou emergenciais
                  </li>
                </ul>
              </div>

              {/* Fase 4 */}
              <div className="bg-gradient-to-r from-yellow-50 to-white p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">4</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Fase 4: Recuperação</h4>
                    <p className="text-xs text-gray-600">Restauração e Normalização</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    Restauração dos sistemas a partir de backups confiáveis
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    Verificação da integridade e consistência dos dados
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    Monitoramento intensivo pós-recuperação
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    Retorno gradual às operações normais
                  </li>
                </ul>
              </div>

              {/* Fase 5 */}
              <div className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-lg border border-purple-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">5</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Fase 5: Lições Aprendidas</h4>
                    <p className="text-xs text-gray-600">Análise e Melhoria</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    Análise pós-incidente detalhada
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    Identificação de falhas processuais ou técnicas
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    Atualização de políticas, controles e procedimentos
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    Elaboração do relatório final do incidente
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 1.5. Comunicação durante Incidentes */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-teal-600 text-lg">📢</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.5. Comunicação durante Incidentes</h3>
            </div>

            {/* 1.5.1. Comunicação Interna */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-teal-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.5.1
                </span>
                Comunicação Interna
              </h4>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2 text-left w-1/4">Tempo</th>
                      <th className="border border-gray-300 px-3 py-2 text-left w-2/4">Destinatários</th>
                      <th className="border border-gray-300 px-3 py-2 text-left w-1/4">Conteúdo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-blue-50">Hora 0</td>
                      <td className="border border-gray-300 px-3 py-2">Equipe CSIRT</td>
                      <td className="border border-gray-300 px-3 py-2">Notificação imediata do incidente</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-green-50">Hora +1</td>
                      <td className="border border-gray-300 px-3 py-2">Gestores executivos</td>
                      <td className="border border-gray-300 px-3 py-2">Atualização inicial e gravidade</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-yellow-50">Hora +4</td>
                      <td className="border border-gray-300 px-3 py-2">Equipes afetadas</td>
                      <td className="border border-gray-300 px-3 py-2">Comunicado interno detalhado</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-purple-50">Diariamente</td>
                      <td className="border border-gray-300 px-3 py-2">Todas as partes interessadas</td>
                      <td className="border border-gray-300 px-3 py-2">Atualizações de status</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold bg-red-50">Após resolução</td>
                      <td className="border border-gray-300 px-3 py-2">Toda a organização</td>
                      <td className="border border-gray-300 px-3 py-2">Relatório completo do incidente</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 1.5.2. Comunicação Externa */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-teal-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.5.2
                </span>
                Comunicação Externa
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">🏛️</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Autoridades Reguladoras</h4>
                      <p className="text-xs text-gray-600">Conformidade Legal</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Notificação conforme exigido por lei, respeitando prazos regulatórios
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">👥</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Clientes Afetados</h4>
                      <p className="text-xs text-gray-600">Comunicação Direta</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Comunicação direta e personalizada com informações relevantes
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">📱</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Usuários em Geral</h4>
                      <p className="text-xs text-gray-600">Comunicação Aberta</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Aviso através do sistema ou canais oficiais da organização
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">🤝</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Parceiros e Fornecedores</h4>
                      <p className="text-xs text-gray-600">Notificação Contratual</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Notificação conforme contratos e acordos de nível de serviço
                  </p>
                </div>
              </div>
            </div>

            {/* 1.5.3. Notificação de Violação de Dados */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-teal-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.5.3
                </span>
                Notificação de Violação de Dados
              </h4>
              
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border border-red-200">
                <div className="mb-4">
                  <h5 className="font-bold text-gray-800 mb-2">Prazos Legais Obrigatórios:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <div className="flex items-center mb-2">
                        <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">⏰</span>
                        <span className="font-semibold">Até 72 horas</span>
                      </div>
                      <p className="text-xs text-gray-700">
                        Notificação à autoridade de proteção de dados
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <div className="flex items-center mb-2">
                        <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">🚨</span>
                        <span className="font-semibold">Sem demora injustificada</span>
                      </div>
                      <p className="text-xs text-gray-700">
                        Comunicação aos titulares de dados afetados
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-bold text-gray-800 mb-2">Conteúdo Mínimo da Notificação:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span className="text-sm text-gray-700">Natureza da violação</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span className="text-sm text-gray-700">Categorias e volume de dados afetados</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span className="text-sm text-gray-700">Prováveis consequências</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span className="text-sm text-gray-700">Medidas adotadas ou planejadas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 1.6. Preservação de Evidências */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-indigo-600 text-lg">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.6. Preservação de Evidências</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1.6.1. Coleta de Evidências */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-indigo-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                    1.6.1
                  </span>
                  Coleta de Evidências
                </h4>
                
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      Imagens forenses de sistemas afetados
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      Logs completos do período relevante
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      Registros de rede, autenticação e acesso
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      Cópias de arquivos alterados ou comprometidos
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      Relatos de usuários ou operadores afetados
                    </li>
                  </ul>
                </div>
              </div>

              {/* 1.6.2. Cadeia de Custódia */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-indigo-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                    1.6.2
                  </span>
                  Cadeia de Custódia
                </h4>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      Registro formal de todas as transferências de evidências
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      Assinatura e validação em cada etapa
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      Armazenamento seguro e segregado
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      Controle rigoroso de acesso às evidências
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      Garantia contínua da integridade das evidências
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 1.7. Relatórios e Documentação */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-gray-600 text-lg">📄</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1.7. Relatórios e Documentação</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Relatório Inicial */}
              <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-200">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🚨</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Relatório Inicial</h4>
                    <p className="text-xs text-gray-600">Primeiras 2 horas</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Data e hora da detecção
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Descrição objetiva do incidente
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Nível de gravidade atribuído
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Ações imediatas executadas
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Próximos passos definidos
                  </li>
                </ul>
              </div>

              {/* Relatório de Status */}
              <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-200">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">📊</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Relatório de Status</h4>
                    <p className="text-xs text-gray-600">Contínuo</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Atualizações a cada 4 horas para incidentes críticos
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Progresso das investigações
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Novas descobertas relevantes
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Ajustes no plano de resposta
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Estimativas atualizadas de resolução
                  </li>
                </ul>
              </div>

              {/* Relatório Final */}
              <div className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-lg border border-purple-200">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">✅</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Relatório Final</h4>
                    <p className="text-xs text-gray-600">30 dias após resolução</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    Análise completa da causa raiz
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    Cronologia detalhada dos eventos
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    Avaliação do impacto total
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    Lições aprendidas
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    Recomendações de melhoria
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Resumo e Métricas */}
          <section className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-lg">📈</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Métricas e Indicadores de Eficácia</h3>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-2">INDICADORES-CHAVE DE DESEMPENHO</h4>
                <p className="text-gray-700">
                  Métricas para avaliar a eficácia da resposta a incidentes
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
                  <p className="text-2xl font-bold text-blue-600">MTTD</p>
                  <p className="text-sm font-semibold text-gray-800">Tempo Médio de Detecção</p>
                  <p className="text-xs text-gray-600">Alvo: menor que 1 hora</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                  <p className="text-2xl font-bold text-green-600">MTTR</p>
                  <p className="text-sm font-semibold text-gray-800">Tempo Médio de Resolução</p>
                  <p className="text-xs text-gray-600">Alvo: menor que 4 horas</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center">
                  <p className="text-2xl font-bold text-yellow-600">99.9%</p>
                  <p className="text-sm font-semibold text-gray-800">Disponibilidade</p>
                  <p className="text-xs text-gray-600">SLA de Serviço</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
                  <p className="text-2xl font-bold text-red-600">100%</p>
                  <p className="text-sm font-semibold text-gray-800">Conformidade Legal</p>
                  <p className="text-xs text-gray-600">Notificações no prazo</p>
                </div>
              </div>

              {/* Níveis de Prontidão */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-bold text-gray-800 mb-3 text-center">NÍVEIS DE PRONTIDÃO DA EQUIPE</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">🟢</span>
                      <span className="font-semibold">Nível Verde</span>
                    </div>
                    <p className="text-xs text-gray-700">Monitoramento normal, todos os recursos disponíveis</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">🟡</span>
                      <span className="font-semibold">Nível Amarelo</span>
                    </div>
                    <p className="text-xs text-gray-700">Monitoramento reforçado, equipe em alerta</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">🟠</span>
                      <span className="font-semibold">Nível Laranja</span>
                    </div>
                    <p className="text-xs text-gray-700">Incidente confirmado, ativação parcial do CSIRT</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center mb-2">
                      <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">🔴</span>
                      <span className="font-semibold">Nível Vermelho</span>
                    </div>
                    <p className="text-xs text-gray-700">Incidente crítico, ativação total do CSIRT</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-700 mb-4">
                  <strong>Esta política está integrada com o Sistema de Gestão de Segurança da Informação</strong>
                </p>
                <div className="flex justify-center space-x-4">
                  <span className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded">ISO 27001</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded">NIST CSF</span>
                  <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded">GDPR</span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded">COBIT</span>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-center">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Política de Resposta a Incidentes</strong>
              </p>
              <p className="text-xs text-gray-600">
                Documento versão 1.0 | Última atualização: {new Date().toLocaleDateString('pt-MZ')} | 
                Próximo exercício de simulação: {new Date(new Date().setMonth(new Date().getMonth() + 3)).toLocaleDateString('pt-MZ')}
              </p>
              <div className="mt-4 flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-8">
                <div className="text-center">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-sm">📞</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Emergência 24/7</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-sm">📋</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Checklists de Resposta</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-sm">🔄</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Exercícios Trimestrais</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PoliticaRespostaIncidentes