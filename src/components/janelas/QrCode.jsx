import React from 'react'

function QrCodePage() {
  return (
    <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-sm text-gray-900">
      {/* Cabeçalho */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-green-500 text-white p-2 rounded-lg mr-3">📱</span>
          Sistema de Monitoramento Digital de Transportes de Carga com QR Code
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Solução integrada para digitalização, validação e rastreamento de transportes rodoviários
        </p>
      </div>

      {/* Conteúdo com scroll */}
      <div className="flex-1 overflow-y-auto max-h-[800px]">
        <div className="p-6 space-y-8">
          {/* VISÃO GERAL DO SISTEMA */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-blue-600 text-lg">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">1. VISÃO GERAL DO SISTEMA</h3>
            </div>

            {/* 1.1 Objectivo Principal */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.1
                </span>
                Objectivo Principal
              </h4>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-gray-700 leading-relaxed">
                  O sistema representa uma evolução significativa no sector de transportes, migrando de processos manuais 
                  e documentos físicos para uma solução digital integrada. O QR Code funciona como uma <strong>"identidade digital"</strong> 
                  do veículo, proporcionando acesso instantâneo a todas as informações relevantes. A solução não apenas digitaliza 
                  documentos, mas estabelece um <strong>ecossistema de validação e monitoramento em tempo real</strong> que beneficia 
                  todas as partes envolvidas no transporte de cargas.
                </p>
              </div>
            </div>

            {/* 1.2 Contexto Operacional */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1.2
                </span>
                Contexto Operacional
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h5 className="font-semibold text-gray-800 mb-2">Categorização de Veículos</h5>
                  <p className="text-sm text-gray-700">
                    Diferenciação clara entre veículos aptos para serviços chanté (locais), nacionais e trânsito internacional
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h5 className="font-semibold text-gray-800 mb-2">Qualificação de Transportadores</h5>
                  <p className="text-sm text-gray-700">
                    Implementação das normas NB1 e NB2 que regulamentam quem pode operar em cada modalidade
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h5 className="font-semibold text-gray-800 mb-2">Diversidade de Percursos</h5>
                  <p className="text-sm text-gray-700">
                    Adaptação às diferentes tabelas de fretes para Beira-Interland (internacional), locais e nacionais
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h5 className="font-semibold text-gray-800 mb-2">Tecnologia de Rastreamento</h5>
                  <p className="text-sm text-gray-700">
                    Distinção entre GPS normal e VIP com funcionalidades diferenciadas
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* OBJETIVOS DO SISTEMA */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-green-600 text-lg">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">2. OBJETIVOS ESPECÍFICOS DO SISTEMA</h3>
            </div>

            {/* 2.1 Objectivos Operacionais */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  2.1
                </span>
                Objectivos Operacionais
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-2">
                    <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">
                      ✓
                    </span>
                    <h5 className="font-semibold text-gray-800">Validação Automática</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Verifica documentos e qualificações sem intervenção humana
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-2">
                    <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">
                      ✓
                    </span>
                    <h5 className="font-semibold text-gray-800">Cálculos Precisos</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Elimina erros matemáticos nos cálculos de fretes e seguros
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-2">
                    <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">
                      ✓
                    </span>
                    <h5 className="font-semibold text-gray-800">Monitoramento Proactivo</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Detecta problemas antes que se tornem críticos
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-2">
                    <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">
                      ✓
                    </span>
                    <h5 className="font-semibold text-gray-800">Integração de Dados</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Conecta informações de motoristas, veículos e cargas em uma visão unificada
                  </p>
                </div>
              </div>
            </div>

            {/* 2.2 Objectivos de Fiscalização */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  2.2
                </span>
                Objectivos de Fiscalização
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2 text-left">Benefício</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Descrição</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Impacto</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold">Eficiência</td>
                      <td className="border border-gray-300 px-3 py-2">Reduz o tempo de verificação de 15-30 minutos para 2-3 minutos</td>
                      <td className="border border-gray-300 px-3 py-2 text-green-600 font-semibold">+500%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-semibold">Consistência</td>
                      <td className="border border-gray-300 px-3 py-2">Aplica as mesmas regras para todos os transportadores</td>
                      <td className="border border-gray-300 px-3 py-2 text-blue-600 font-semibold">100%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold">Transparência</td>
                      <td className="border border-gray-300 px-3 py-2">Fornece histórico completo e auditável de todas as operações</td>
                      <td className="border border-gray-300 px-3 py-2 text-purple-600 font-semibold">Total</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-semibold">Prevenção</td>
                      <td className="border border-gray-300 px-3 py-2">Identifica padrões suspeitos que poderiam passar despercebidos</td>
                      <td className="border border-gray-300 px-3 py-2 text-red-600 font-semibold">Proativo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2.3 Objectivos de Segurança */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  2.3
                </span>
                Objectivos de Segurança
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h5 className="font-semibold text-gray-800 mb-2">Prevenção de Fraudes</h5>
                  <p className="text-sm text-gray-700">
                    QR Codes dinâmicos e validação em tempo real dificultam falsificações
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h5 className="font-semibold text-gray-800 mb-2">Saúde dos Motoristas</h5>
                  <p className="text-sm text-gray-700">
                    Controle rigoroso de jornada previne acidentes por fadiga
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h5 className="font-semibold text-gray-800 mb-2">Proteção de Dados</h5>
                  <p className="text-sm text-gray-700">
                    Informações sensíveis são acessíveis apenas a autoridades autorizadas
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h5 className="font-semibold text-gray-800 mb-2">Rastreabilidade</h5>
                  <p className="text-sm text-gray-700">
                    Todas as ações são registradas para responsabilização
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* USUÁRIOS DO SISTEMA */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-purple-600 text-lg">👥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">3. USUÁRIOS DO SISTEMA E SUAS NECESSIDADES ESPECÍFICAS</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Polícias de Trânsito */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-xl">👮</span>
                  </div>
                  <h4 className="font-bold text-gray-800">Polícias de Trânsito</h4>
                </div>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                  <li>Verificações rápidas durante operações de rotina</li>
                  <li>Validade imediata de motorista e veículo</li>
                  <li>Histórico de infracções</li>
                  <li>Controle de jornada do motorista</li>
                </ul>
                <div className="mt-3 p-2 bg-white rounded border border-blue-100">
                  <p className="text-xs text-gray-700">
                    <strong>Benefício:</strong> Redução de 90% no tempo de verificação
                  </p>
                </div>
              </div>

              {/* Alfândegas */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-xl">🏛️</span>
                  </div>
                  <h4 className="font-bold text-gray-800">Alfândegas</h4>
                </div>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                  <li>Otimização do desembaraço aduaneiro</li>
                  <li>Acesso instantâneo a toda documentação</li>
                  <li>Validação de cargas controladas</li>
                  <li>Rastreamento de contentores</li>
                </ul>
                <div className="mt-3 p-2 bg-white rounded border border-green-100">
                  <p className="text-xs text-gray-700">
                    <strong>Benefício:</strong> Agilidade em fronteiras
                  </p>
                </div>
              </div>

              {/* Fiscais */}
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-xl">📋</span>
                  </div>
                  <h4 className="font-bold text-gray-800">Fiscais</h4>
                </div>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                  <li>Conformidade fiscal e regulatória</li>
                  <li>Qualificação NB2 automática</li>
                  <li>Regularidade fiscal verificada</li>
                  <li>Histórico operacional completo</li>
                </ul>
                <div className="mt-3 p-2 bg-white rounded border border-orange-100">
                  <p className="text-xs text-gray-700">
                    <strong>Benefício:</strong> Prevenção de evasão fiscal
                  </p>
                </div>
              </div>

              {/* Municípios */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-xl">🏙️</span>
                  </div>
                  <h4 className="font-bold text-gray-800">Municípios</h4>
                </div>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                  <li>Verificação de licenças locais</li>
                  <li>Controle de restrições zonais</li>
                  <li>Histórico de infrações municipais</li>
                  <li>Autorizações especiais</li>
                </ul>
                <div className="mt-3 p-2 bg-white rounded border border-purple-100">
                  <p className="text-xs text-gray-700">
                    <strong>Benefício:</strong> Gestão urbana eficiente
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FUNCIONALIDADES PRINCIPAIS */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-red-600 text-lg">⚙️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">4. FUNCIONALIDADES PRINCIPAIS DO SISTEMA</h3>
            </div>

            {/* 4.1 Sistema de QR Code Dinâmico */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  4.1
                </span>
                Sistema de QR Code Dinâmico
              </h4>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-lg border border-gray-300 inline-block">
                      <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center mx-auto">
                        <span className="text-gray-500 text-sm">QR Code Dinâmico</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">Interface de acesso ao sistema</p>
                    </div>
                  </div>
                  <div>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                      <li><strong>Único por contexto:</strong> Cada veículo/viagem tem QR Code específico</li>
                      <li><strong>Validação em tempo real:</strong> Autenticidade verificada em cada leitura</li>
                      <li><strong>Registro completo:</strong> Data, hora, local e autoridade registrados</li>
                      <li><strong>Camadas de informação:</strong> Níveis de detalhe conforme autoridade</li>
                      <li><strong>Expiração automática:</strong> QR Codes têm validade temporal</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 4.2 Módulo de Gestão de Motoristas */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  4.2
                </span>
                Módulo de Gestão de Motoristas
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2 text-left">Funcionalidade</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Descrição</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Benefício</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold">Identificação Robusta</td>
                      <td className="border border-gray-300 px-3 py-2">Combinação de BI, passaporte e outros documentos</td>
                      <td className="border border-gray-300 px-3 py-2">Verificação cruzada confiável</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-semibold">Documentação Digital</td>
                      <td className="border border-gray-300 px-3 py-2">Licenças e certificados armazenados digitalmente</td>
                      <td className="border border-gray-300 px-3 py-2">Acesso instantâneo e seguro</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold">Sistema de Avaliação</td>
                      <td className="border border-gray-300 px-3 py-2">Métricas objetivas de desempenho</td>
                      <td className="border border-gray-300 px-3 py-2">Gestão de recursos humanos eficiente</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-semibold">Controle de Jornada</td>
                      <td className="border border-gray-300 px-3 py-2">Monitoramento rigoroso de horas de condução</td>
                      <td className="border border-gray-300 px-3 py-2 text-red-600 font-semibold">Previne acidentes por fadiga</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold">Saúde e Segurança</td>
                      <td className="border border-gray-300 px-3 py-2">Exames médicos e restrições registradas</td>
                      <td className="border border-gray-300 px-3 py-2">Aptidão para condução verificada</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4.5 Sistema de Regras de Negócio */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  4.5
                </span>
                Sistema de Regras de Negócio (Business Rules)
              </h4>

              {/* Norma NB1 */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                <h5 className="font-bold text-gray-800 mb-3 flex items-center">
                  <span className="bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center mr-2 text-xs">
                    1
                  </span>
                  Norma NB1 - Categorias de Veículos
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-xs">A</span>
                      </div>
                      <h6 className="font-semibold text-gray-800">Categoria A (Chanté)</h6>
                    </div>
                    <ul className="text-xs space-y-1 text-gray-700">
                      <li>• Inspeção: 6 meses</li>
                      <li>• Operação: Serviços locais</li>
                      <li>• Condição: Limitada</li>
                      <li className="font-semibold text-red-600">Restrição: Local apenas</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-xs">B</span>
                      </div>
                      <h6 className="font-semibold text-gray-800">Categoria B (Nacional)</h6>
                    </div>
                    <ul className="text-xs space-y-1 text-gray-700">
                      <li>• Inspeção: Anual</li>
                      <li>• Operação: Nacionais</li>
                      <li>• Condição: Regular</li>
                      <li className="font-semibold text-yellow-600">Apto: Nacionais</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-xs">C</span>
                      </div>
                      <h6 className="font-semibold text-gray-800">Categoria C (Trânsito)</h6>
                    </div>
                    <ul className="text-xs space-y-1 text-gray-700">
                      <li>• Inspeção: Bienal</li>
                      <li>• Operação: Internacional</li>
                      <li>• Condição: Excelente</li>
                      <li className="font-semibold text-green-600">Apto: Internacional</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Norma NB2 */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                <h5 className="font-bold text-gray-800 mb-3 flex items-center">
                  <span className="bg-green-500 text-white w-5 h-5 rounded-full flex items-center justify-center mr-2 text-xs">
                    2
                  </span>
                  Norma NB2 - Qualificação de Transportadores
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">🚛</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">Transportadores Pequenos</h6>
                        <p className="text-xs text-gray-600">Menos de 3 camiões</p>
                      </div>
                    </div>
                    <ul className="text-xs space-y-1 text-gray-700 list-disc pl-4">
                      <li>Limitados a serviços chanté</li>
                      <li>Operação local</li>
                      <li className="font-semibold text-red-600">Restrição: Sem operação nacional/internacional</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">🚚</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">Transportadores Médios/Grandes</h6>
                        <p className="text-xs text-gray-600">3 ou mais camiões</p>
                      </div>
                    </div>
                    <ul className="text-xs space-y-1 text-gray-700 list-disc pl-4">
                      <li>Qualificados para serviços nacionais</li>
                      <li>Aptos para trânsito internacional</li>
                      <li className="font-semibold text-green-600">Apto: Todas as modalidades</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cálculos Automáticos */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h5 className="font-bold text-gray-800 mb-3 flex items-center">
                  <span className="bg-purple-500 text-white w-5 h-5 rounded-full flex items-center justify-center mr-2 text-xs">
                    3
                  </span>
                  Cálculos Automáticos Integrados
                </h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 px-3 py-2 text-left">Tipo de Cálculo</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Base de Cálculo</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Moeda</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Automático</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Tabelas de Fretes</td>
                        <td className="border border-gray-300 px-3 py-2">Beira-Interland, Locais, Nacionais</td>
                        <td className="border border-gray-300 px-3 py-2">USD / MZN</td>
                        <td className="border border-gray-300 px-3 py-2 text-green-600 font-semibold">✓</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Cálculo de Seguros</td>
                        <td className="border border-gray-300 px-3 py-2">Categoria de carga e abrangência</td>
                        <td className="border border-gray-300 px-3 py-2">MZN</td>
                        <td className="border border-gray-300 px-3 py-2 text-green-600 font-semibold">✓</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Comissões Automáticas</td>
                        <td className="border border-gray-300 px-3 py-2">Percentuais pré-definidos sobre fretes</td>
                        <td className="border border-gray-300 px-3 py-2">MZN</td>
                        <td className="border border-gray-300 px-3 py-2 text-green-600 font-semibold">✓</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 font-semibold">Consolidação de Custos</td>
                        <td className="border border-gray-300 px-3 py-2">Soma de todos os componentes</td>
                        <td className="border border-gray-300 px-3 py-2">MZN</td>
                        <td className="border border-gray-300 px-3 py-2 text-green-600 font-semibold">✓</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* FLUXO DE OPERAÇÃO */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-yellow-600 text-lg">🔄</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">5. FLUXO DE OPERAÇÃO DO SISTEMA</h3>
            </div>

            {/* 5.1 Fluxo de Verificação via QR Code */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  5.1
                </span>
                Fluxo de Verificação via QR Code
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                  {[
                    { step: 1, icon: "📱", title: "Escaneamento", desc: "Fiscal usa smartphone para escanear QR Code" },
                    { step: 2, icon: "✅", title: "Validação", desc: "Sistema verifica autenticidade e validade" },
                    { step: 3, icon: "👤", title: "Contextualização", desc: "Identifica tipo de autoridade fiscalizadora" },
                    { step: 4, icon: "📊", title: "Recuperação", desc: "Busca informações relevantes para o contexto" },
                    { step: 5, icon: "📄", title: "Apresentação", desc: "Mostra interface otimizada" },
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-white border-2 border-blue-500 rounded-full flex flex-col items-center justify-center mx-auto">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-xs font-bold mt-1">{item.step}</span>
                      </div>
                      <p className="text-xs font-semibold mt-2">{item.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-700">
                    <strong>Tempo total:</strong> 2-3 minutos (vs 15-30 minutos manualmente)
                  </p>
                </div>
              </div>
            </div>

            {/* 5.2 Fluxo de Validação de Documentos */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  5.2
                </span>
                Fluxo de Validação de Documentos
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">
                      1
                    </span>
                    Validação em Camadas
                  </h5>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    <li><strong>Motorista:</strong> Carta condução, documentos, saúde</li>
                    <li><strong>Veículo:</strong> Inspeção, seguro, documentação</li>
                    <li><strong>Transportador:</strong> Qualificação NB2</li>
                    <li><strong>Viabilidade:</strong> Categoria NB1 adequada</li>
                    <li><strong>Carga:</strong> Documentação específica</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">
                      2
                    </span>
                    Status Consolidado
                  </h5>
                  <div className="text-center py-4">
                    <div className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600">
                      <span className="text-white text-lg font-bold">APT</span>
                      <p className="text-white text-xs mt-1">Veículo Regularizado</p>
                    </div>
                    <div className="mt-4 inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600">
                      <span className="text-white text-lg font-bold">COM IRREGULARIDADES</span>
                      <p className="text-white text-xs mt-1">Verificar Documentação</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BENEFÍCIOS */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-green-600 text-lg">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">6. BENEFÍCIOS ESPECÍFICOS POR TIPO DE USUÁRIO</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Para Autoridades Fiscalizadoras */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-xl">👮</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Autoridades Fiscalizadoras</h4>
                    <p className="text-xs text-gray-600">Polícia, Alfândega, Fiscais, Municípios</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-sm text-gray-700">Eficiência radical: +500% de veículos fiscalizados</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-sm text-gray-700">Consistência regulatória: Regras aplicadas uniformemente</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-sm text-gray-700">Transparência total: Histórico completo auditável</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-sm text-gray-700">Prevenção avançada: Padrões suspeitos detectados proativamente</span>
                  </div>
                </div>
              </div>

              {/* Para Transportadoras */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-xl">🚚</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Transportadoras</h4>
                    <p className="text-xs text-gray-600">Empresas de transporte de carga</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-sm text-gray-700">Otimização financeira: Cálculos automáticos eliminam erros</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-sm text-gray-700">Gestão eficiente: Controle centralizado da frota</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-sm text-gray-700">Manutenção preventiva: Alertas reduzem avarias</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-sm text-gray-700">Qualificação transparente: Sistema claro para melhoria</span>
                  </div>
                </div>
              </div>

              {/* Para Motoristas */}
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-xl">👨‍✈️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Motoristas</h4>
                    <p className="text-xs text-gray-600">Condutores profissionais</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-sm text-gray-700">Processos simplificados: Verificações rápidas</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-sm text-gray-700">Transparência laboral: Controle claro de horas trabalhadas</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-sm text-gray-700">Documentação digital: Evita perda de documentos físicos</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-sm text-gray-700">Segurança aumentada: Sistema previne excesso de jornada</span>
                  </div>
                </div>
              </div>

              {/* Para Clientes */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-xl">🏢</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Clientes (Embaraçadores)</h4>
                    <p className="text-xs text-gray-600">Empresas que enviam cargas</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-sm text-gray-700">Rastreabilidade completa: Carga monitorada em tempo real</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-sm text-gray-700">Transparência de custos: Entendimento claro de preços</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-sm text-gray-700">Comunicação proativa: Alertas sobre ocorrências</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-sm text-gray-700">Confiança aumentada: Conformidade garantida</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SEGURANÇA E PRIVACIDADE */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-red-600 text-lg">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">7. SEGURANÇA E PRIVACIDADE</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 7.1 Controle de Acesso */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                  <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">
                    7.1
                  </span>
                  Controle de Acesso
                </h4>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                  <li><strong>Autenticação forte:</strong> Múltiplos fatores de verificação</li>
                  <li><strong>Privilégios específicos:</strong> Informações por função</li>
                  <li><strong>Auditoria completa:</strong> Registro de acesso detalhado</li>
                  <li><strong>QR Codes com expiração:</strong> Impedem reutilização</li>
                  <li><strong>Criptografia avançada:</strong> Dados protegidos</li>
                </ul>
              </div>

              {/* 7.2 Proteção de Dados */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                  <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">
                    7.2
                  </span>
                  Proteção de Dados
                </h4>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                  <li><strong>Segmentação inteligente:</strong> Informações pessoais protegidas</li>
                  <li><strong>Anonimização:</strong> Dados estatísticos anonimizados</li>
                  <li><strong>Backups regulares:</strong> Garantia contra perda de dados</li>
                  <li><strong>Conformidade legal:</strong> Leis moçambicanas respeitadas</li>
                  <li><strong>Acordos de confidencialidade:</strong> Compromissos específicos</li>
                </ul>
              </div>

              {/* 7.3 Resiliência do Sistema */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                  <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-2 text-white text-sm">
                    7.3
                  </span>
                  Resiliência do Sistema
                </h4>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                  <li><strong>Infraestrutura redundante:</strong> Servidores múltiplos</li>
                  <li><strong>Backups automáticos:</strong> Cópias regulares em locais seguros</li>
                  <li><strong>Monitoramento contínuo:</strong> Equipe técnica 24/7</li>
                  <li><strong>Plano de recuperação:</strong> Procedimentos para desastres</li>
                  <li><strong>Atualizações de segurança:</strong> Patchs regulares aplicados</li>
                </ul>
              </div>
            </div>

            {/* Níveis de Segurança */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3 text-center">NÍVEIS DE SEGURANÇA IMPLEMENTADOS</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-red-600 text-2xl">🔐</span>
                  </div>
                  <p className="text-sm font-semibold mt-2">Criptografia</p>
                  <p className="text-xs text-gray-600">AES-256</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-blue-600 text-2xl">👁️</span>
                  </div>
                  <p className="text-sm font-semibold mt-2">Auditoria</p>
                  <p className="text-xs text-gray-600">Logs detalhados</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-green-600 text-2xl">🔄</span>
                  </div>
                  <p className="text-sm font-semibold mt-2">Backup</p>
                  <p className="text-xs text-gray-600">Diário + Incremental</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-purple-600 text-2xl">🛡️</span>
                  </div>
                  <p className="text-sm font-semibold mt-2">Firewall</p>
                  <p className="text-xs text-gray-600">Multi-camadas</p>
                </div>
              </div>
            </div>
          </section>

          {/* CONCLUSÃO */}
          <section className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-lg">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">8. CONCLUSÃO</h3>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                O <strong>Sistema de Monitoramento Digital de Transportes de Carga com QR Code</strong> representa uma 
                transformação fundamental no sector de transportes em Moçambique. Ao digitalizar e integrar processos que 
                tradicionalmente são manuais, fragmentados e propensos a erros, o sistema cria valor para todas as partes 
                envolvidas.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <h5 className="font-semibold text-gray-800 mb-2">Para as Autoridades</h5>
                  <p className="text-sm text-gray-700">
                    Maior eficiência, transparência e capacidade de prevenção
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <h5 className="font-semibold text-gray-800 mb-2">Para Transportadoras</h5>
                  <p className="text-sm text-gray-700">
                    Processos simplificados, otimização de custos e melhoria na qualificação
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-orange-50 p-3 rounded border border-orange-200">
                  <h5 className="font-semibold text-gray-800 mb-2">Para a Sociedade</h5>
                  <p className="text-sm text-gray-700">
                    Maior segurança, confiabilidade e transparência no transporte de cargas
                  </p>
                </div>
                <div className="bg-purple-50 p-3 rounded border border-purple-200">
                  <h5 className="font-semibold text-gray-800 mb-2">Posicionamento Estratégico</h5>
                  <p className="text-sm text-gray-700">
                    Moçambique na vanguarda da digitalização do sector de transportes
                  </p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <div className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                  <p className="text-white font-bold text-lg">TRANSFORMAÇÃO DIGITAL COMPLETA</p>
                  <p className="text-white text-sm mt-1">Do manual ao digital, do fragmentado ao integrado</p>
                </div>
              </div>
            </div>
          </section>

          {/* RESUMO DE IMPACTO */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">RESUMO DE IMPACTO DO SISTEMA</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-3xl font-bold text-green-600">90%</p>
                <p className="text-sm text-gray-700">Redução tempo verificação</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-3xl font-bold text-blue-600">100%</p>
                <p className="text-sm text-gray-700">Conformidade automatizada</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <p className="text-3xl font-bold text-purple-600">24/7</p>
                <p className="text-sm text-gray-700">Monitoramento em tempo real</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <p className="text-3xl font-bold text-orange-600">0</p>
                <p className="text-sm text-gray-700">Erros de cálculo</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default QrCodePage