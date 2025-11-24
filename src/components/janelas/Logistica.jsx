import React from "react";

const AreaLogisticaMunhava = () => {
  return (
    <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Cabeçalho */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">📋</span>
          Área Logística - Escritório Munhava
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Plano de implementação e estruturação do escritório logístico na
          Munhava
        </p>
      </div>

      {/* Conteúdo com scroll */}
      <div className="flex-1 overflow-y-auto max-h-[700px]">
        <div className="p-6 space-y-6">
          {/* Informações do Projeto */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              IMPLEMENTAÇÃO DO ESCRITÓRIO LOGÍSTICO - MUNHAVA
            </h3>

            <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>Localização:</strong> Munhava - Beira, Moçambique
                <br />
                <strong>Empresa:</strong> Mega Centro de Logística, Limitada
                <br />
                <strong>Status:</strong> Fase de Implementação
              </p>
            </div>

            {/* Cronograma de Implementação */}
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-green-500 text-white p-1 rounded mr-2 text-sm">
                    1
                  </span>
                  Abertura da Empresa - Cotação Comboio Jurídico
                </h4>

                {/* Informações da Empresa de Serviços Jurídicos */}
                <div className="bg-yellow-50 p-4 rounded-lg mb-4 border border-yellow-200">
                  <h5 className="font-semibold text-gray-800 mb-2">
                    COMBOIO JURIDICO, E.I
                  </h5>
                  <p className="text-sm text-gray-700">
                    <strong>Endereço:</strong> Av. Francisco O. Magumbwe 135
                    Maputo
                    <br />
                    <strong>Contactos:</strong> 848100430 / 878100530
                    <br />
                    <strong>Email:</strong> comboiojuridico@gmail.com |
                    ribeirocomboio@gmail.com
                    <br />
                    <strong>NUIT:</strong> 107041583
                  </p>
                </div>

                {/* Tabela de Cotação */}
                <div className="mb-4 text-gray-950">
                  <h5 className="font-semibold text-gray-800 mb-2">
                    COTAÇÃO #00042 - Validade: 26/06/2025
                  </h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Item
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Descrição
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Preço (MZN)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Contrato de sociedade – Registo da empresa – Emissão
                            de certidões – NUIT
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            9.000,00
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">
                            2
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Publicação no BR
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            12.000,00
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">
                            3
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Alvará – Prestação de serviços – Logística
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            10.000,00
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">
                            4
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Registo de patente
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            32.500,00
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">
                            5
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Alvará – Transportes e instalações de estacionamento
                            (futuramente)
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            45.000,00
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">
                            6
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Honorários
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            15.000,00
                          </td>
                        </tr>
                        <tr className="bg-green-50 font-semibold">
                          <td
                            className="border border-gray-300 px-3 py-2"
                            colSpan="2"
                          >
                            TOTAL ACTUAL
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            78.500,00 MZN
                          </td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td
                            className="border border-gray-300 px-3 py-2"
                            colSpan="2"
                          >
                            TOTAL COMPLETO (futuro)
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            123.500,00 MZN
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Dados Bancários */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-gray-950">
                  <h5 className="font-semibold text-gray-800 mb-2">
                    Dados Bancários para Pagamento
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p>
                        <strong>Titular:</strong> Ribeiro Comboio
                      </p>
                      <p>
                        <strong>Banco:</strong> BCI
                      </p>
                      <p>
                        <strong>Conta:</strong> 2498370910001
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>NIB:</strong> 0008 0000 2498370910180
                      </p>
                      <p>
                        <strong>M-PESA:</strong> 848100430
                      </p>
                      <p>
                        <strong>E-MOLA:</strong> 878100530
                      </p>
                    </div>
                  </div>
                </div>

                {/* Processos Adicionais */}
                <div className="mt-4">
                  <h5 className="font-semibold text-gray-800 mb-2">
                    Processos de Abertura Completa:
                  </h5>
                  <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-2">
                    <li>
                      Registro comercial na Conservatória do Registo de Empresas
                    </li>
                    <li>
                      Obtenção do NUIT (Número de Identificação Único de
                      Contribuinte)
                    </li>
                    <li>
                      Licença de funcionamento junto da Câmara Municipal da
                      Beira
                    </li>
                    <li>Registro na Segurança Social</li>
                    <li>Abertura de conta bancária corporativa</li>
                    <li>Publicação no Boletim da República</li>
                    <li>Registro de patente da marca</li>
                    <li>Alvará específico para serviços logísticos</li>
                  </ul>
                </div>

                {/* Observações */}
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Observação:</strong> O alvará para transportes e
                    instalações de estacionamento (item 5 - 45.000,00 MZN) pode
                    ser feito futuramente quando a empresa estiver para começar
                    a operar.
                  </p>
                </div>
              </div>

              {/* Ponto 2 - Criação de Sistema ATUALIZADO */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-blue-500 text-white p-1 rounded mr-2 text-sm">
                    2
                  </span>
                  Criação de Sistema - Cotação Systems Manager
                </h4>

                {/* Informações da Empresa de Desenvolvimento */}
                <div className="bg-purple-50 p-4 rounded-lg mb-4 border border-purple-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2">
                        FORNECEDOR
                      </h5>
                      <p className="text-sm text-gray-700">
                        <strong>Systems Manager, Lda</strong>
                        <br />
                        <strong>Endereço:</strong> Av. Dom Alexandre, Nr. 318
                        <br />
                        <strong>NUIT:</strong> 401394313
                        <br />
                        <strong>Email:</strong> info@systemsmanager.co.mz
                        <br />
                        <strong>Telefone:</strong> (+258) 82 803 3081 | 86 228
                        8823
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2">
                        CLIENTE
                      </h5>
                      <p className="text-sm text-gray-700">
                        <strong>MEGA CENTRO DE LOGÍSTICA, LDA</strong>
                        <br />
                        <strong>Endereço:</strong> Rua General Vieira da Costa,
                        Edifício do Supermercado SPAR – VIP, 1º Andar – Beira
                        <br />
                        <strong>NUIT:</strong> 400720740
                        <br />
                        <strong>Email:</strong> megacentrodelogistica@gmail.com
                        <br />
                        <strong>Telefone:</strong> (+258) 87 242 4567
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detalhes da Cotação */}
                <div className="bg-white p-4 rounded-lg mb-4 border border-gray-200 text-gray-950">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <strong>Nº Cotação:</strong> 00099
                    </div>
                    <div>
                      <strong>Data:</strong> 23/11/2025
                    </div>
                    <div>
                      <strong>Vencimento:</strong> 30/11/2025
                    </div>
                    <div>
                      <strong>Moeda:</strong> MZN
                    </div>
                  </div>
                </div>

                {/* Tabela de Itens da Cotação */}
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800 mb-2">
                    ESPECIFICAÇÕES TÉCNICAS DO SISTEMA
                  </h5>
                  <div className="overflow-x-auto text-gray-950">
                    <table className="min-w-full bg-white border border-gray-300 text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Descrição
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Código
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Quantidade
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Preço (MZN)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">
                            Desenvolvimento Página Web
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            GPW
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            15.000,00
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">
                            Desenvolvimento Desktop
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            DD
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            20.000,00
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">
                            Domínio (Anual)
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Dm
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            2.600,00
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">
                            Hospedagem (Anual)
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Host
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            9.763,31
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">
                            E-mails Corporativos
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            EC
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            0,00
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">
                            Desenvolvimento de API
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            API
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            8.000,00
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">
                            Desenvolvimento de Bases de Dados
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            DB
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            17.000,00
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">
                            Desenvolvimento Mobile
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            DM
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            22.000,00
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">
                            Manutenções Progressivas
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            MTP
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            15.000,00
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">
                            Manutenções Corretivas
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            MTC
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            5.000,00
                          </td>
                        </tr>
                        <tr className="bg-green-50 font-semibold">
                          <td
                            className="border border-gray-300 px-3 py-2"
                            colSpan="3"
                          >
                            TOTAL DO SISTEMA
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            114.363,31 MZN
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Descrição dos Módulos do Sistema */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-gray-950">
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <h6 className="font-semibold text-sm mb-2">
                      Módulos Principais
                    </h6>
                    <ul className="text-xs space-y-1">
                      <li>✓ Plataforma web responsiva</li>
                      <li>✓ Aplicação desktop interna</li>
                      <li>✓ API para integrações</li>
                      <li>✓ Base de dados centralizada</li>
                      <li>✓ Aplicação móvel</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <h6 className="font-semibold text-sm mb-2">
                      Serviços Incluídos
                    </h6>
                    <ul className="text-xs space-y-1">
                      <li>✓ Domínio corporativo anual</li>
                      <li>✓ Hospedagem premium anual</li>
                      <li>✓ E-mails corporativos gratuitos</li>
                      <li>✓ Manutenção progressiva</li>
                      <li>✓ Suporte corretivo</li>
                    </ul>
                  </div>
                </div>

                {/* Funcionalidades do Sistema */}
                <div className="mt-4">
                  <h5 className="font-semibold text-gray-800 mb-2">
                    Funcionalidades do Sistema Logístico:
                  </h5>
                  <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-2">
                    <li>Gestão completa de frotas e motoristas</li>
                    <li>Sistema de rastreamento GPS integrado</li>
                    <li>
                      Portal do cliente para acompanhamento de cargas em tempo
                      real
                    </li>
                    <li>Módulo de faturação e pagamentos eletrónicos</li>
                    <li>Integração com sistemas aduaneiros</li>
                    <li>Gestão de contratos e documentação</li>
                    <li>Relatórios analíticos e dashboard</li>
                    <li>Sistema de pontuação de motoristas</li>
                    <li>
                      Gestão de cadastros (clientes, transportadoras,
                      motoristas)
                    </li>
                  </ul>
                </div>
              </div>

              {/* Ponto 3 - Elaboração de Contratos MELHORADO */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-gray-950">
                <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-purple-500 text-white p-1 rounded mr-2 text-sm">
                    3
                  </span>
                  Elaboração de Contratos - Estrutura Jurídica Completa
                </h4>

                {/* Introdução */}
                <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Framework jurídico abrangente</strong> para regular
                    todas as relações comerciais e operacionais da empresa,
                    garantindo conformidade legal e proteção de interesses.
                  </p>
                </div>

                {/* Tipos de Contratos */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    PORTFÓLIO DE DOCUMENTOS JURÍDICOS
                  </h5>

                  {/* Contrato Padrão para Clientes */}
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">📄</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          Contrato Padrão para Clientes
                        </h6>
                        <p className="text-xs text-gray-600">
                          Documento Principal de Prestação de Serviços
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2">
                          Cláusulas Essenciais:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Definição de serviços logísticos</li>
                          <li>Prazos de entrega e execução</li>
                          <li>Tabela de preços e condições de pagamento</li>
                          <li>Responsabilidades e obrigações das partes</li>
                          <li>Política de cancelamento e rescisão</li>
                          <li>Garantias e limites de responsabilidade</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Anexos Incluídos:</p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Tabela de fretes e comissões</li>
                          <li>Condições gerais de transporte</li>
                          <li>Política de seguro de cargas</li>
                          <li>Procedimentos de reclamação</li>
                          <li>Termo de confidencialidade</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Contratos com Transportadoras Parceiras */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">🚛</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          Contratos com Transportadoras Parceiras
                        </h6>
                        <p className="text-xs text-gray-600">
                          Acordos de Cooperação Operacional
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2">Elementos Chave:</p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Critérios de qualificação e classificação</li>
                          <li>Exclusividade por rotas específicas</li>
                          <li>Sistema de comissionamento</li>
                          <li>Padrões de qualidade e segurança</li>
                          <li>Obrigações de manutenção da frota</li>
                          <li>Protocolos de comunicação</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">
                          Modelos por Classe:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Classe 1: Percursos até 120km</li>
                          <li>Classe 2: Operações nacionais</li>
                          <li>Classe 3: Internacional Interland</li>
                          <li>Contrato para serviços especiais</li>
                          <li>Acordo de confidencialidade</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Acordos com Motoristas Independentes */}
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">👨‍💼</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          Acordos com Motoristas Independentes
                        </h6>
                        <p className="text-xs text-gray-600">
                          Regulamentação de Prestadores Individuais
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2">
                          Condições Contractuais:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Sistema de pontuação e avaliação</li>
                          <li>Remuneração por serviço prestado</li>
                          <li>Obrigações de conduta profissional</li>
                          <li>Utilização do sistema de GPS</li>
                          <li>Protocolos de segurança rodoviária</li>
                          <li>Direitos e deveres recíprocos</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">
                          Documentação Exigida:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Carta de Condução válida</li>
                          <li>Registo criminal atualizado</li>
                          <li>Comprovativo de seguros</li>
                          <li>Documentos do veículo</li>
                          <li>Certificado de formação profissional</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Contratos de Prestação de Serviços Terceirizados */}
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">🤝</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          Contratos de Prestação de Serviços Terceirizados
                        </h6>
                        <p className="text-xs text-gray-600">
                          Parcerias com Fornecedores Especializados
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2">
                          Serviços Abrangidos:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Serviços de estiva e manuseamento</li>
                          <li>Segurança privada e vigilância</li>
                          <li>Seguros e coberturas de risco</li>
                          <li>Serviços de vistoria técnica</li>
                          <li>Manutenção de viaturas e equipamentos</li>
                          <li>Serviços de comercialização</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">
                          Cláusulas Específicas:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Níveis de serviço acordados (SLA)</li>
                          <li>Prazos de resposta e execução</li>
                          <li>Mecanismos de resolução de disputas</li>
                          <li>Política de preços e reajustes</li>
                          <li>Condições de renovação automática</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Acordos de Confidencialidade e Proteção de Dados */}
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">🔒</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          Acordos de Confidencialidade e Proteção de Dados
                        </h6>
                        <p className="text-xs text-gray-600">
                          Conformidade com a Lei de Proteção de Dados
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2">
                          Proteções Incluídas:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Dados pessoais de clientes e parceiros</li>
                          <li>Informações comerciais sensíveis</li>
                          <li>Estratégias de negócio e planos de expansão</li>
                          <li>Listas de clientes e fornecedores</li>
                          <li>Dados de localização e rotas</li>
                          <li>Informações financeiras e contratuais</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">
                          Conformidade Legal:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Lei de Proteção de Dados Pessoais</li>
                          <li>Regulamentações setoriais específicas</li>
                          <li>Normas internacionais de privacidade</li>
                          <li>Políticas de retenção de dados</li>
                          <li>Procedimentos de violação de dados</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Termos de Uso da Plataforma Digital */}
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">💻</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          Termos de Uso da Plataforma Digital
                        </h6>
                        <p className="text-xs text-gray-600">
                          Regulamento do Ambiente Virtual
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2">
                          Disposições Principais:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Condições de acesso e registo</li>
                          <li>Direitos de propriedade intelectual</li>
                          <li>Limitações de uso e responsabilidade</li>
                          <li>Política de cookies e rastreamento</li>
                          <li>Modificações e atualizações do serviço</li>
                          <li>Rescisão de contas de utilizador</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">
                          Anexos e Políticas:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Política de Privacidade</li>
                          <li>Política de Cookies</li>
                          <li>Condições de Venda Online</li>
                          <li>Acordo de Nível de Serviço (SLA)</li>
                          <li>Guia do Utilizador</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fluxo de Aprovação e Gestão */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <h6 className="font-semibold text-gray-800 mb-3">
                      Fluxo de Aprovação de Contratos
                    </h6>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs">1</span>
                        </div>
                        <span>Elaboração pelo Departamento Jurídico</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs">2</span>
                        </div>
                        <span>Revisão pela Direção Comercial</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs">3</span>
                        </div>
                        <span>Aprovação pela Direção Geral</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs">4</span>
                        </div>
                        <span>Assinatura pelas partes envolvidas</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs">5</span>
                        </div>
                        <span>Arquivamento digital e físico</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded border border-green-200">
                    <h6 className="font-semibold text-gray-800 mb-3">
                      Gestão e Monitoramento
                    </h6>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Prazo Médio de Elaboração:</span>
                        <span className="font-semibold">3-5 dias úteis</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revisão Periódica:</span>
                        <span className="font-semibold">Anual</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Armazenamento:</span>
                        <span className="font-semibold">Digital + Físico</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Acesso Autorizado:</span>
                        <span className="font-semibold">
                          Direção + Jurídico
                        </span>
                      </div>
                      <div className="mt-3 p-2 bg-white rounded border border-green-100">
                        <p className="text-xs text-gray-700">
                          <strong>Backup:</strong> Cópias seguras em nuvem e
                          servidor local
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefícios da Estrutura Contractual */}
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    VANTAGENS DA ESTRUTURA CONTRACTUAL
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-blue-600">
                        Segurança Jurídica
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• Proteção contra litígios e disputas</li>
                        <li>• Clareza nas obrigações das partes</li>
                        <li>• Definição de limites de responsabilidade</li>
                        <li>• Conformidade com a legislação vigente</li>
                        <li>• Mecanismos de resolução de conflitos</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-green-600">
                        Eficiência Operacional
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• Processos padronizados e ágeis</li>
                        <li>• Redução de ambiguidades operacionais</li>
                        <li>• Comunicação clara com parceiros</li>
                        <li>• Gestão centralizada de documentos</li>
                        <li>• Renovação automática controlada</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-purple-600">
                        Proteção de Dados
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• Conformidade com leis de privacidade</li>
                        <li>• Proteção de informações sensíveis</li>
                        <li>• Segurança de dados de clientes</li>
                        <li>• Prevenção de violações de dados</li>
                        <li>• Transparência no tratamento de informações</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-orange-600">
                        Vantagens Competitivas
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• Diferenciação no mercado</li>
                        <li>• Confiança reforçada com clientes</li>
                        <li>• Atração de parceiros qualificados</li>
                        <li>• Redução de riscos comerciais</li>
                        <li>• Base sólida para expansão</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Resumo do Portfolio */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
                  <h5 className="font-semibold text-gray-800 mb-2">
                    RESUMO DO PORTFÓLIO CONTRACTUAL
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">6</p>
                      <p className="text-xs">Tipos de Contratos</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">20+</p>
                      <p className="text-xs">Modelos Disponíveis</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">100%</p>
                      <p className="text-xs">Conformidade Legal</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">24h</p>
                      <p className="text-xs">Suporte Jurídico</p>
                    </div>
                  </div>
                </div>

                {/* Observações */}
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Nota:</strong> A estrutura contratual completa
                    abrange todas as relações comerciais e operacionais da Mega
                    Centro de Logística, garantindo segurança jurídica e
                    conformidade com a legislação moçambicana. Os contratos são
                    elaborados em português com cláusulas específicas para o
                    setor logístico, incluindo disposições para resolução de
                    litígios através de mediação e arbitragem. Todos os
                    documentos são revisados anualmente para incorporar mudanças
                    legislativas e melhorias operacionais.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-gray-950">
                <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-yellow-500 text-white p-1 rounded mr-2 text-sm">
                    4
                  </span>
                  Contrato de Arrendamento e Reabilitação do Espaço -
                  Infraestrutura Física
                </h4>

                {/* Introdução */}
                <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>
                      Preparação completa da infraestrutura física
                    </strong>{" "}
                    para instalação do escritório logístico em Munhava,
                    garantindo condições adequadas para operação eficiente e
                    conformidade com normas de segurança.
                  </p>
                </div>

                {/* Detalhamento do Contrato de Arrendamento */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    CONTRATO DE ARRENDAMENTO COMERCIAL
                  </h5>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">🏢</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          Condições do Arrendamento
                        </h6>
                        <p className="text-xs text-gray-600">
                          Acordo Comercial de Longo Prazo
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2">Termos Principais:</p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>
                            Duração: 36 meses (3 anos) com opção de renovação
                          </li>
                          <li>Área útil: 60m² (contentor + área exterior)</li>
                          <li>
                            Localização: Munhava, Beira - Zona estratégica
                            portuária
                          </li>
                          <li>Renda mensal: 25.000 MZN (fixa por 24 meses)</li>
                          <li>
                            Depósito de garantia: 2 meses de renda (50.000 MZN)
                          </li>
                          <li>Reajuste anual baseado no índice de inflação</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">
                          Direitos e Obrigações:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>
                            Permissão para instalação de contentor pré-fabricado
                          </li>
                          <li>Direito de realizar melhorias e adaptações</li>
                          <li>Responsabilidade por despesas de condomínio</li>
                          <li>Manutenção preventiva das instalações</li>
                          <li>Seguro contra incêndio e danos materiais</li>
                          <li>
                            Cláusula de rescisão antecipada por mútuo acordo
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Plano de Reabilitação */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    PLANO DE REABILITAÇÃO E ADAPTAÇÃO
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Reabilitação Completa */}
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm">🛠️</span>
                        </div>
                        <h6 className="font-semibold text-gray-800">
                          Reabilitação do Espaço
                        </h6>
                      </div>
                      <ul className="list-disc pl-4 space-y-2 text-xs">
                        <li>Preparação do terreno e nivelamento</li>
                        <li>Instalação de base de betão para contentor</li>
                        <li>Pavimentação da área de estacionamento</li>
                        <li>Construção de rampa de acesso</li>
                        <li>Instalação de drenagem pluvial</li>
                        <li>Pintura e acabamentos exteriores</li>
                        <li>Paisagismo e sinalização</li>
                      </ul>
                      <div className="mt-3 p-2 bg-white rounded border border-orange-100">
                        <p className="text-xs text-gray-700">
                          <strong>Prazo:</strong> 15 dias úteis |{" "}
                          <strong>Orçamento:</strong> 150.000 MZN
                        </p>
                      </div>
                    </div>

                    {/* Instalações Elétricas e Rede */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm">⚡</span>
                        </div>
                        <h6 className="font-semibold text-gray-800">
                          Instalações Elétricas e Rede
                        </h6>
                      </div>
                      <ul className="list-disc pl-4 space-y-2 text-xs">
                        <li>Quadro elétrico principal com disjuntores</li>
                        <li>
                          Rede elétrica trifásica (380V) para equipamentos
                        </li>
                        <li>Tomadas industriais e pontos de força</li>
                        <li>Sistema de aterramento e proteção</li>
                        <li>Rede estruturada de dados (CAT6)</li>
                        <li>Pontos de rede em todas as estações</li>
                        <li>Instalação de nobreak e estabilizadores</li>
                      </ul>
                      <div className="mt-3 p-2 bg-white rounded border border-blue-100">
                        <p className="text-xs text-gray-700">
                          <strong>Certificação:</strong> Conformidade com normas
                          EDM
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {/* Sistema de Climatização */}
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm">❄️</span>
                        </div>
                        <h6 className="font-semibold text-gray-800">
                          Sistema de Climatização
                        </h6>
                      </div>
                      <ul className="list-disc pl-4 space-y-2 text-xs">
                        <li>3 unidades split de 24.000 BTU cada</li>
                        <li>Distribuição estratégica por zonas</li>
                        <li>Sistema de ventilação auxiliar</li>
                        <li>Controlo individual de temperatura</li>
                        <li>Manutenção preventiva programada</li>
                        <li>Eficiência energética A++</li>
                        <li>Garantia de 2 anos nos equipamentos</li>
                      </ul>
                      <div className="mt-3 p-2 bg-white rounded border border-green-100">
                        <p className="text-xs text-gray-700">
                          <strong>Capacidade:</strong> Cobertura total de 60m²
                        </p>
                      </div>
                    </div>

                    {/* Acessibilidade e Segurança */}
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm">♿</span>
                        </div>
                        <h6 className="font-semibold text-gray-800">
                          Acessibilidade e Segurança
                        </h6>
                      </div>
                      <ul className="list-disc pl-4 space-y-2 text-xs">
                        <li>Rampa de acesso com inclinação regulamentar</li>
                        <li>Portas com largura mínima de 90cm</li>
                        <li>
                          Sanitários adaptados para pessoas com deficiência
                        </li>
                        <li>Sinalização tátil e visual</li>
                        <li>Corrimãos e barras de apoio</li>
                        <li>Iluminação de emergência</li>
                        <li>Rota de evacuação sinalizada</li>
                      </ul>
                      <div className="mt-3 p-2 bg-white rounded border border-purple-100">
                        <p className="text-xs text-gray-700">
                          <strong>Norma:</strong> Conformidade com decreto de
                          acessibilidade
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sistema de Segurança */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    SISTEMA INTEGRADO DE SEGURANÇA
                  </h5>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">🚨</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          Infraestrutura de Segurança
                        </h6>
                        <p className="text-xs text-gray-600">
                          Proteção Física e Eletrónica
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2">
                          Segurança Eletrónica:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Sistema de CCTV com 8 câmaras HD</li>
                          <li>Gravação contínua 24/7 (30 dias de retenção)</li>
                          <li>Alarme perimetral com sensores de movimento</li>
                          <li>Controlo de acesso por cartão RFID</li>
                          <li>Sistema de intercomunicador vídeo</li>
                          <li>Monitoramento remoto via aplicação móvel</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Segurança Física:</p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Portas de segurança reforçadas</li>
                          <li>Grades de proteção nas janelas</li>
                          <li>Iluminação noturna com sensores</li>
                          <li>Cofre embutido para documentos</li>
                          <li>Extintores distribuídos estrategicamente</li>
                          <li>Sinalização de emergência</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cronograma e Orçamento */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <h6 className="font-semibold text-gray-800 mb-3">
                      Cronograma de Implementação
                    </h6>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Negociação do Contrato:</span>
                        <span className="font-semibold">1 semana</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Preparação do Terreno:</span>
                        <span className="font-semibold">1 semana</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Instalações Elétricas e Rede:</span>
                        <span className="font-semibold">1 semana</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Montagem do Contentor:</span>
                        <span className="font-semibold">1 semana</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Acabamentos e Segurança:</span>
                        <span className="font-semibold">1 semana</span>
                      </div>
                      <div className="mt-3 p-2 bg-white rounded border">
                        <p className="text-xs text-gray-700">
                          <strong>Total:</strong> 5 semanas para conclusão
                          completa
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                    <h6 className="font-semibold text-gray-800 mb-3">
                      Orçamento da Reabilitação
                    </h6>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Preparação do Terreno:</span>
                        <span className="font-semibold">150.000 MZN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Instalações Elétricas:</span>
                        <span className="font-semibold">85.000 MZN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sistema de Climatização:</span>
                        <span className="font-semibold">106.500 MZN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Acessibilidade:</span>
                        <span className="font-semibold">45.000 MZN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sistema de Segurança:</span>
                        <span className="font-semibold">75.000 MZN</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Total Reabilitação:</span>
                        <span>461.500 MZN</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefícios da Localização */}
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    VANTAGENS DA LOCALIZAÇÃO EM MUNHAVA
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-blue-600">
                        Acesso Estratégico
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• Proximidade com o Porto da Beira (5km)</li>
                        <li>• Acesso à estrada nacional EN6</li>
                        <li>• Facilidade de logística inversa</li>
                        <li>• Rotas de transporte otimizadas</li>
                        <li>• Zona de crescimento económico</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-green-600">
                        Infraestrutura
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• Rede elétrica estável e confiável</li>
                        <li>• Água canalizada e sistema de esgotos</li>
                        <li>• Boa cobertura de telecomunicações</li>
                        <li>• Vias de acesso pavimentadas</li>
                        <li>• Serviços públicos próximos</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Observações */}
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Nota:</strong> O espaço em Munhava oferece uma
                    localização estratégica para operações logísticas, com
                    excelente acesso ao Porto da Beira e principais rotas de
                    transporte. A reabilitação completa garante um ambiente de
                    trabalho profissional, seguro e confortável para a equipa,
                    com infraestrutura adequada para suportar as operações 24/7
                    da empresa de logística. O investimento total em
                    reabilitação é de 461.500 MZN, com retorno garantido através
                    da eficiência operacional e imagem corporativa.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-gray-950">
                <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-red-500 text-white p-1 rounded mr-2 text-sm">
                    5
                  </span>
                  Compra de Contentor Pré-fabricado Escritório - Solução Modular
                </h4>

                {/* Introdução */}
                <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Solução modular inovadora</strong> utilizando
                    contentor marítimo adaptado para criar um escritório
                    funcional, sustentável e de rápida implementação, ideal para
                    operações logísticas em crescimento.
                  </p>
                </div>

                {/* Especificações do Contentor */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    ESPECIFICAÇÕES TÉCNICAS DO CONTENTOR
                  </h5>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">📦</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          Contentor Marítimo 40 pés High Cube
                        </h6>
                        <p className="text-xs text-gray-600">
                          Estrutura Principal do Escritório
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2">
                          Dimensões e Capacidade:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Comprimento: 12,192 metros (40 pés)</li>
                          <li>Largura: 2,438 metros (8 pés)</li>
                          <li>Altura: 2,896 metros (9,5 pés - High Cube)</li>
                          <li>Área útil: 29,7 m² (320 pés²)</li>
                          <li>Peso bruto: 3.800 kg</li>
                          <li>Capacidade cúbica: 67,7 m³</li>
                          <li>Portas duplas na extremidade</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">
                          Características Estruturais:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Estrutura em aço corten (anti-corrosão)</li>
                          <li>Piso em madeira marinha tratada</li>
                          <li>
                            Certificação CSC para transporte internacional
                          </li>
                          <li>Resistência a intempéries e humidade</li>
                          <li>Vida útil estimada: 25+ anos</li>
                          <li>Mobilidade para relocalização futura</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Adaptações e Acabamentos */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    ADAPTAÇÕES E ACRÉSCIMOS
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Isolamento e Conforto */}
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm">🌡️</span>
                        </div>
                        <h6 className="font-semibold text-gray-800">
                          Isolamento Térmico e Acústico
                        </h6>
                      </div>
                      <ul className="list-disc pl-4 space-y-2 text-xs">
                        <li>Isolamento em lã de rocha (100mm paredes)</li>
                        <li>Barreira de vapor integrada</li>
                        <li>Isolamento acústico de 45 dB</li>
                        <li>Poliuretano expandido no teto (80mm)</li>
                        <li>Vedantes especiais para portas e janelas</li>
                        <li>Refletor térmico no teto externo</li>
                        <li>Testado para temperaturas -10°C a +50°C</li>
                      </ul>
                      <div className="mt-3 p-2 bg-white rounded border border-orange-100">
                        <p className="text-xs text-gray-700">
                          <strong>Eficiência:</strong> Redução de 60% no consumo
                          de energia para climatização
                        </p>
                      </div>
                    </div>

                    {/* Janelas e Portas */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm">🪟</span>
                        </div>
                        <h6 className="font-semibold text-gray-800">
                          Janelas e Portas de Segurança
                        </h6>
                      </div>
                      <ul className="list-disc pl-4 space-y-2 text-xs">
                        <li>4 janelas de alumínio com vidro duplo</li>
                        <li>Porta principal de segurança reforçada</li>
                        <li>Fechaduras multiponto com controle de acesso</li>
                        <li>Vidros laminados de 8mm de espessura</li>
                        <li>Persianas exteriores de alumínio</li>
                        <li>Ventilação natural controlada</li>
                        <li>Proteção contra intrusão nível 2</li>
                      </ul>
                      <div className="mt-3 p-2 bg-white rounded border border-blue-100">
                        <p className="text-xs text-gray-700">
                          <strong>Segurança:</strong> Certificação RC2 para
                          resistência a arrombamento
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {/* Instalações Elétricas */}
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm">⚡</span>
                        </div>
                        <h6 className="font-semibold text-gray-800">
                          Instalações Elétricas e Rede
                        </h6>
                      </div>
                      <ul className="list-disc pl-4 space-y-2 text-xs">
                        <li>Quadro elétrico com 12 circuitos independentes</li>
                        <li>
                          16 tomadas elétricas distribuídas estrategicamente
                        </li>
                        <li>8 pontos de rede CAT6 para dados</li>
                        <li>Iluminação LED embutida no teto</li>
                        <li>Sistema de aterramento e proteção contra surtos</li>
                        <li>Entrada para gerador de emergência</li>
                        <li>Cablagem organizada em canaletas</li>
                      </ul>
                      <div className="mt-3 p-2 bg-white rounded border border-green-100">
                        <p className="text-xs text-gray-700">
                          <strong>Conformidade:</strong> Normas NFC 15-100 / IEC
                          60364
                        </p>
                      </div>
                    </div>

                    {/* Acabamentos e Pintura */}
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm">🎨</span>
                        </div>
                        <h6 className="font-semibold text-gray-800">
                          Acabamentos e Pintura
                        </h6>
                      </div>
                      <ul className="list-disc pl-4 space-y-2 text-xs">
                        <li>Pintura exterior epóxi anticorrosiva</li>
                        <li>Revestimento interior em pladur ignífugo</li>
                        <li>Piso flutuante em PVC comercial</li>
                        <li>Forro do teto em PVC lavável</li>
                        <li>Rodapés em PVC de alta resistência</li>
                        <li>Pintura interior em tinta lavável</li>
                        <li>Acabamentos em alumínio anodizado</li>
                      </ul>
                      <div className="mt-3 p-2 bg-white rounded border border-purple-100">
                        <p className="text-xs text-gray-700">
                          <strong>Durabilidade:</strong> Garantia de 5 anos na
                          pintura exterior
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layout Interno e Divisórias */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    LAYOUT INTERNO E CONFIGURAÇÃO
                  </h5>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">📐</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          Distribuição de Espaços
                        </h6>
                        <p className="text-xs text-gray-600">
                          Otimização da Área Útil de 29,7m²
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2">Zonas Funcionais:</p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Recepção e atendimento (8m²)</li>
                          <li>Área de trabalho aberta (12m²) - 6 estações</li>
                          <li>Sala de reuniões (4m²)</li>
                          <li>Armazenamento e arquivo (3m²)</li>
                          <li>Área técnica e servidores (2,7m²)</li>
                          <li>Circulação e espaços comuns</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">
                          Divisórias e Mobiliário:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Divisórias modulares em pladur</li>
                          <li>Portas interiores de correr</li>
                          <li>Balcão de atendimento em fórmica</li>
                          <li>Prateleiras e armários embutidos</li>
                          <li>Suportes para cablagem organizada</li>
                          <li>Preparação para instalação de ar condicionado</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certificações e Garantias */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <h6 className="font-semibold text-gray-800 mb-3">
                      Certificações e Conformidade
                    </h6>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>Certificação de segurança estrutural</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>Conformidade com normas de construção</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>Certificado de isolamento térmico</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>Laudo de resistência ao fogo</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>Certificado de estanqueidade</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 p-4 rounded border border-red-200">
                    <h6 className="font-semibold text-gray-800 mb-3">
                      Garantias e Manutenção
                    </h6>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Estrutura metálica:</span>
                        <span className="font-semibold">10 anos</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Isolamento térmico:</span>
                        <span className="font-semibold">5 anos</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Janelas e portas:</span>
                        <span className="font-semibold">3 anos</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Instalações elétricas:</span>
                        <span className="font-semibold">2 anos</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pintura exterior:</span>
                        <span className="font-semibold">5 anos</span>
                      </div>
                      <div className="mt-3 p-2 bg-white rounded border border-red-100">
                        <p className="text-xs text-gray-700">
                          <strong>Manutenção:</strong> Preventiva anual
                          recomendada
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Orçamento e Prazo */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
                  <h5 className="font-semibold text-gray-800 mb-2">
                    INVESTIMENTO E PRAZOS
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        350.000
                      </p>
                      <p className="text-xs">Meticais</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">4</p>
                      <p className="text-xs">Semanas</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">
                        29,7m²
                      </p>
                      <p className="text-xs">Área Útil</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">25+</p>
                      <p className="text-xs">Anos Vida Útil</p>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm text-gray-700">
                      <strong>Detalhe do Investimento:</strong> Contentor
                      (120.000 MZN) + Adaptações (230.000 MZN)
                    </p>
                  </div>
                </div>

                {/* Vantagens da Solução */}
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    VANTAGENS DA SOLUÇÃO EM CONTENTOR
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-blue-600">
                        Sustentabilidade
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• Reutilização de contentor marítimo</li>
                        <li>• Redução de resíduos de construção</li>
                        <li>• Eficiência energética otimizada</li>
                        <li>• Materiais recicláveis</li>
                        <li>• Baixo impacto ambiental</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-green-600">
                        Flexibilidade
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• Mobilidade para relocalização</li>
                        <li>• Expansão modular possível</li>
                        <li>• Adaptação a diferentes terrenos</li>
                        <li>• Configuração interior personalizável</li>
                        <li>• Rápida implementação</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-purple-600">
                        Custo-benefício
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• 40% mais económico que construção tradicional</li>
                        <li>• Manutenção reduzida</li>
                        <li>• Valorização do ativo</li>
                        <li>• Retorno rápido do investimento</li>
                        <li>• Custos operacionais otimizados</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-orange-600">
                        Durabilidade
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• Resistência a condições climáticas</li>
                        <li>• Estrutura anti-corrosiva</li>
                        <li>• Baixa depreciação do valor</li>
                        <li>• Longa vida útil</li>
                        <li>• Performance comprovada</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Observações */}
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Nota:</strong> A solução em contentor marítimo
                    adaptado oferece uma alternativa moderna, sustentável e
                    económica para o escritório logístico. Com investimento
                    total de 350.000 MZN e prazo de implementação de 4 semanas,
                    proporciona um espaço profissional totalmente equipado e
                    personalizado para as necessidades específicas da Mega
                    Centro de Logística. A mobilidade da estrutura permite
                    futuras expansões ou relocalização conforme o crescimento do
                    negócio.
                  </p>
                </div>
              </div>

              {/* Ponto 6 - Compra de Mobiliário de Escritório ATUALIZADO */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-gray-950">
                <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-indigo-500 text-white p-1 rounded mr-2 text-sm">
                    6
                  </span>
                  Compra de Mobiliário de Escritório - Factura Proforma
                  Homecenter
                </h4>

                {/* Informações do Fornecedor */}
                <div className="bg-orange-50 p-4 rounded-lg mb-4 border border-orange-200">
                  <h5 className="font-semibold text-gray-800 mb-2">
                    HOMECENTER
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p>
                        <strong>Endereço:</strong> Av. de Angola, Nº 2356
                      </p>
                      <p>
                        <strong>Telefone:</strong> 21466510 / 2181523 /
                        82-3201560
                      </p>
                      <p>
                        <strong>IBALA MALL:</strong> 843101318
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Email:</strong> info@homecentermz.co.mz
                      </p>
                      <p>
                        <strong>NUIT:</strong> 400101337
                      </p>
                      <p>
                        <strong>Factura Proforma:</strong> 659466 / 1
                      </p>
                      <p>
                        <strong>Data:</strong> 22/11/2025
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detalhes da Venda */}
                <div className="bg-white p-3 rounded-lg mb-4 border border-gray-200">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <strong>Vendedor:</strong> Isaura Massinga
                    </div>
                    <div>
                      <strong>Caixa:</strong> 4 (900228)
                    </div>
                    <div>
                      <strong>Tipo:</strong> Cash Sale
                    </div>
                  </div>
                </div>

                {/* Tabela de Mobiliário */}
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800 mb-2">
                    MOBILIÁRIO SELECIONADO PARA ESCRITÓRIO
                  </h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Quant.
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Descrição
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Preço Unitário (MZN)
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Total (MZN)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Mesa de Recepção LINHA HC 1400 - TEAK/BEGE
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            15.590,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            15.590,00
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">
                            4
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Mesa para Escritório S-1480 - TEAK/BEGE CLARO
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            8.790,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            35.160,00
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">
                            2
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Mesa Executiva 1800 com Auxiliar BG-506
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            30.690,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            61.380,00
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Mesa Executiva com Paiol 02/PTA 03GAV BG-105
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            33.990,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            33.990,00
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Mesa de Trabalho 4 Lugares D0504-2800
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            57.390,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            57.390,00
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">
                            10
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Cadeira Executiva Mesh Encosto Alto CH-523A-HS
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            15.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            150.000,00
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">
                            6
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Cadeira Visitante Mesh CH-193C-HS
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            6.990,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            41.940,00
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">
                            2
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Mesa Metal Pastas Suspensas 4 Gavetas DZX-044
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            12.900,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            25.800,00
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">
                            2
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Armário Metal Alto 4 Portas + 2 Gavetas CINZA
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            17.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            34.000,00
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">
                            2
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Armário Metal Alto 4 Portas + 2 Gavetas BRANCO
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            15.690,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            31.380,00
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">
                            2
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Mesa de Reunião Redonda S-R1000 BRANCO
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            8.290,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            16.580,00
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Cadeira Executiva Giratória com Braços CH-113A
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            22.900,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            22.900,00
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">
                            2
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Armário Baixo Multiuso S-960 BRANCO
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            11.390,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            22.780,00
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">
                            2
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Cadeira de Jogo de Espera 5 Lugares
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            10.500,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            21.000,00
                          </td>
                        </tr>
                        <tr className="bg-green-50 font-semibold">
                          <td
                            className="border border-gray-300 px-3 py-2"
                            colSpan="3"
                          >
                            TOTAL CALCULADO
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            601.420,00 MZN
                          </td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td
                            className="border border-gray-300 px-3 py-2"
                            colSpan="3"
                          >
                            TOTAL FACTURA (com IVA incluído)
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            572.130,00 MZN
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Resumo por Categoria */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <h6 className="font-semibold text-sm mb-2">Mesas</h6>
                    <p className="text-xs">11 unidades</p>
                    <p className="text-sm font-semibold">~224.490 MZN</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <h6 className="font-semibold text-sm mb-2">Cadeiras</h6>
                    <p className="text-xs">21 unidades</p>
                    <p className="text-sm font-semibold">~235.840 MZN</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded border border-purple-200">
                    <h6 className="font-semibold text-sm mb-2">Armários</h6>
                    <p className="text-xs">6 unidades</p>
                    <p className="text-sm font-semibold">~88.160 MZN</p>
                  </div>
                </div>

                {/* Dados Bancários para Pagamento */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h5 className="font-semibold text-gray-800 mb-2">
                    Dados Bancários Homecenter
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p>
                        <strong>BIM</strong>
                      </p>
                      <p>Conta: 106725512</p>
                      <p>NIB: 00010000000672551257</p>
                    </div>
                    <div>
                      <p>
                        <strong>BCI</strong>
                      </p>
                      <p>Conta: 35249811000</p>
                      <p>NIB: 000800000352498110180</p>
                      <p className="text-xs">Titular: Chamile Lorenco</p>
                    </div>
                    <div>
                      <p>
                        <strong>NEDBANK</strong>
                      </p>
                      <p>Conta: 10013808</p>
                      <p>NIB: 0043000001001380874</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p>
                      <strong>ECOBANK</strong>
                    </p>
                    <p className="text-xs">Conta: 557500015986</p>
                    <p className="text-xs">
                      NIB: 00230001550001598678872255507
                    </p>
                  </div>
                </div>

                {/* Observações */}
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Nota:</strong> O mobiliário selecionado inclui todos
                    os itens necessários para equipar completamente o escritório
                    da Munhava, incluindo áreas de recepção, trabalho, reuniões
                    e armazenamento.
                  </p>
                </div>
              </div>

              {/* Ponto 7 - Compra de Material Informático ATUALIZADO */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-gray-950">
                <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-teal-500 text-white p-1 rounded mr-2 text-sm">
                    7
                  </span>
                  Compra de Material Informático e Equipamentos - Especificação
                  Completa
                </h4>

                {/* Introdução */}
                <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Equipamento tecnológico completo</strong> para
                    operação eficiente do escritório, incluindo computadores,
                    periféricos, sistemas de comunicação e segurança.
                  </p>
                </div>

                {/* Tabela de Equipamentos Informáticos */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    ESPECIFICAÇÃO DOS EQUIPAMENTOS INFORMÁTICOS
                  </h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Equipamento
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Quantidade
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Preço Unitário (MZN)
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Subtotal (MZN)
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Aplicação
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Computador Desktop
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            6 unidades
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            42.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            252.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Estações de trabalho para equipa operacional
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Computador Laptop
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            2 unidades
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            35.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            70.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Mobilidade para reuniões e trabalho remoto
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Tablet Samsung A10
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            2 unidades
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            16.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            32.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Verificação de documentos e apresentações
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            H.D. Externo 21.8
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1 unidade
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            5.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            5.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Backup de dados e arquivos importantes
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            MacBook Air
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1 unidade
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            80.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            80.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Gestão executiva e apresentações corporativas
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Extensão Tripla de Tomada
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            6 unidades
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1.500,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            9.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Distribuição de energia para equipamentos
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Impressora Multifunções
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1 unidade
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            28.500,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            28.500,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Impressão, digitalização e fotocópias
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Impressora G. Formato Principal
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            2 unidades
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            50.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            100.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Documentos de grande formato e contratos
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Ar Condicionado Splite
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            3 unidades
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            35.500,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            106.500,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Climatização do escritório para conforto térmico
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Sistema de Câmeras CCTV
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1 unidade
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            40.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            40.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Segurança e monitoramento das instalações
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Rádio de Comunicação (RF)
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            2 unidades
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            3.500,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            7.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Comunicação interna e coordenação operacional
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Internet Star-Link
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            2 unidades
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            25.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            50.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Conexão de alta velocidade e redundância
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Router Wi-Fi
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1 unidade
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            5.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            5.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Rede wireless para todos os dispositivos
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Cofre de Segurança Médio
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1 unidade
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            30.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            30.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Armazenamento seguro de documentos importantes
                          </td>
                        </tr>
                        <tr className="bg-green-50 font-semibold">
                          <td
                            className="border border-gray-300 px-3 py-2"
                            colSpan="3"
                          >
                            INVESTIMENTO TOTAL EM EQUIPAMENTOS
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            866.000,00 MZN
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            31 equipamentos
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Categorias de Equipamentos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 p-4 rounded border border-blue-200">
                    <h6 className="font-semibold text-gray-800 mb-3">
                      Distribuição por Categoria
                    </h6>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Computadores e Tablets:</span>
                          <span className="font-semibold">
                            439.000 MZN (50,7%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "50.7%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Impressoras e Periféricos:</span>
                          <span className="font-semibold">
                            128.500 MZN (14,8%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: "14.8%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Climatização e Energia:</span>
                          <span className="font-semibold">
                            115.500 MZN (13,3%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: "13.3%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Segurança e Comunicação:</span>
                          <span className="font-semibold">
                            183.000 MZN (21,1%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: "21.1%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded border border-green-200">
                    <h6 className="font-semibold text-gray-800 mb-3">
                      Resumo por Tipo
                    </h6>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-white p-2 rounded border">
                        <p className="font-semibold">11</p>
                        <p className="text-xs">Dispositivos Computação</p>
                      </div>
                      <div className="bg-white p-2 rounded border">
                        <p className="font-semibold">3</p>
                        <p className="text-xs">Impressoras</p>
                      </div>
                      <div className="bg-white p-2 rounded border">
                        <p className="font-semibold">3</p>
                        <p className="text-xs">Ar Condicionado</p>
                      </div>
                      <div className="bg-white p-2 rounded border">
                        <p className="font-semibold">6</p>
                        <p className="text-xs">Extensões</p>
                      </div>
                      <div className="bg-white p-2 rounded border">
                        <p className="font-semibold">2</p>
                        <p className="text-xs">Rádios</p>
                      </div>
                      <div className="bg-white p-2 rounded border">
                        <p className="font-semibold">2</p>
                        <p className="text-xs">Internet</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefícios dos Equipamentos */}
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    VANTAGENS DA INFRAESTRUTURA TECNOLÓGICA
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-blue-600">
                        Produtividade
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• 6 estações de trabalho desktop</li>
                        <li>• 2 laptops para mobilidade</li>
                        <li>• Tablets para verificações em campo</li>
                        <li>• MacBook para gestão executiva</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-green-600">
                        Conectividade
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• Internet Star-Link redundante</li>
                        <li>• Router Wi-Fi de alta performance</li>
                        <li>• Rádios para comunicação interna</li>
                        <li>• Backup em HD externo</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-purple-600">
                        Segurança
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• Sistema CCTV completo</li>
                        <li>• Cofre para documentos</li>
                        <li>• Backup de dados seguro</li>
                        <li>• Rede protegida</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-orange-600">
                        Conforto
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• 3 unidades de ar condicionado</li>
                        <li>• Sistema de energia organizado</li>
                        <li>• Impressoras de alta capacidade</li>
                        <li>• Equipamentos modernos</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Resumo do Investimento */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h5 className="font-semibold text-gray-800 mb-2">
                    INVESTIMENTO EM TECNOLOGIA
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">31</p>
                      <p className="text-xs">Equipamentos</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        866.000
                      </p>
                      <p className="text-xs">Meticais Investidos</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">6</p>
                      <p className="text-xs">Categorias</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">100%</p>
                      <p className="text-xs">Cobertura Tecnológica</p>
                    </div>
                  </div>
                </div>

                {/* Observações */}
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Nota:</strong> O investimento em equipamentos
                    informáticos e de infraestrutura garante uma operação
                    eficiente e profissional do escritório da Munhava. A
                    infraestrutura tecnológica foi dimensionada para atender
                    todas as necessidades operacionais da empresa de logística,
                    desde a gestão administrativa até o monitoramento das
                    operações.
                  </p>
                </div>
              </div>

              {/* Ponto 8 - Avaliação de Consumíveis ATUALIZADO */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-gray-950">
                <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-orange-500 text-white p-1 rounded mr-2 text-sm">
                    8
                  </span>
                  Avaliação de Consumíveis de Escritório, Limpeza, Incêndio
                </h4>

                {/* Introdução */}
                <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Investimento em consumíveis essenciais</strong> para
                    garantir o funcionamento adequado do escritório, incluindo
                    materiais de escritório, produtos de limpeza e equipamentos
                    de segurança contra incêndio.
                  </p>
                </div>

                {/* Tabela de Consumíveis */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    ESPECIFICAÇÃO DOS CONSUMÍVEIS
                  </h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Categoria
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Descrição
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Valor (MZN)
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Percentagem
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Produtos de Escritório
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Material de escritório essencial para operação
                            diária
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            25.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            55,6%
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Produtos de Limpeza
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Materiais de higiene e limpeza para manutenção do
                            espaço
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            10.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            22,2%
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Produtos de Incêndio
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Equipamentos de segurança e combate a incêndios
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            10.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            22,2%
                          </td>
                        </tr>
                        <tr className="bg-green-50 font-semibold">
                          <td
                            className="border border-gray-300 px-3 py-2"
                            colSpan="2"
                          >
                            TOTAL EM CONSUMÍVEIS
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            45.000,00 MZN
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            100%
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Detalhamento por Categoria */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {/* Produtos de Escritório */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">📝</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          Produtos de Escritório
                        </h6>
                        <p className="text-xs text-gray-600">25.000 MZN</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Papel A4 (10 resmas):</span>
                        <span className="font-semibold">5.000 MZN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Canetas e material escritório:</span>
                        <span className="font-semibold">3.000 MZN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Toners e tinteiros:</span>
                        <span className="font-semibold">8.000 MZN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pastas e arquivo:</span>
                        <span className="font-semibold">4.000 MZN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Material diverso:</span>
                        <span className="font-semibold">5.000 MZN</span>
                      </div>
                      <div className="mt-3 p-2 bg-white rounded border border-blue-100">
                        <p className="text-xs text-gray-700">
                          <strong>Cobertura estimada:</strong> 3-4 meses de
                          operação
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Produtos de Limpeza */}
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">🧹</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          Produtos de Limpeza
                        </h6>
                        <p className="text-xs text-gray-600">10.000 MZN</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Detergentes e desinfetantes:</span>
                        <span className="font-semibold">3.000 MZN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Material de limpeza:</span>
                        <span className="font-semibold">2.500 MZN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Produtos higiene banheiros:</span>
                        <span className="font-semibold">2.000 MZN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sacos de lixo e acessórios:</span>
                        <span className="font-semibold">1.500 MZN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Outros consumíveis:</span>
                        <span className="font-semibold">1.000 MZN</span>
                      </div>
                      <div className="mt-3 p-2 bg-white rounded border border-green-100">
                        <p className="text-xs text-gray-700">
                          <strong>Cobertura estimada:</strong> 2-3 meses de
                          operação
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Produtos de Incêndio */}
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">🔥</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          Produtos de Incêndio
                        </h6>
                        <p className="text-xs text-gray-600">10.000 MZN</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Extintores (6 unidades):</span>
                        <span className="font-semibold">6.000 MZN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sinalização de segurança:</span>
                        <span className="font-semibold">1.500 MZN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Kit primeiros socorros:</span>
                        <span className="font-semibold">1.000 MZN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Detetores de fumo:</span>
                        <span className="font-semibold">1.000 MZN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Manutenção e inspeção:</span>
                        <span className="font-semibold">500 MZN</span>
                      </div>
                      <div className="mt-3 p-2 bg-white rounded border border-red-100">
                        <p className="text-xs text-gray-700">
                          <strong>Cobertura estimada:</strong> 12 meses (anual)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Distribuição Gráfica */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <h6 className="font-semibold text-gray-800 mb-3">
                      Distribuição do Investimento
                    </h6>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Produtos de Escritório:</span>
                          <span className="font-semibold">55,6%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "55.6%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Produtos de Limpeza:</span>
                          <span className="font-semibold">22,2%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: "22.2%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Produtos de Incêndio:</span>
                          <span className="font-semibold">22,2%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: "22.2%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded border border-green-200">
                    <h6 className="font-semibold text-gray-800 mb-3">
                      Cobertura Temporal
                    </h6>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                          <span>Escritório:</span>
                        </div>
                        <span className="font-semibold">3-4 meses</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                          <span>Limpeza:</span>
                        </div>
                        <span className="font-semibold">2-3 meses</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                          <span>Incêndio:</span>
                        </div>
                        <span className="font-semibold">12 meses</span>
                      </div>
                      <div className="mt-3 p-2 bg-white rounded border">
                        <p className="text-xs text-gray-700">
                          <strong>Reposição:</strong> Mensal para escritório e
                          limpeza, anual para segurança
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Especificações Técnicas */}
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    ESPECIFICAÇÕES TÉCNICAS E NORMAIS
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-blue-600">
                        Normas de Segurança
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• Extintores classe ABC (6 unidades)</li>
                        <li>• Sinalização conforme normas INEFOP</li>
                        <li>• Kit primeiros socorros completo</li>
                        <li>• Detetores de fumo certificados</li>
                        <li>• Inspeção trimestral obrigatória</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-green-600">
                        Padrões de Qualidade
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• Material de escritório de qualidade</li>
                        <li>• Produtos de limpeza eficientes</li>
                        <li>• Equipamentos com certificação</li>
                        <li>• Fornecedores credenciados</li>
                        <li>• Controlo de stock mensal</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Resumo do Investimento */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
                  <h5 className="font-semibold text-gray-800 mb-2">
                    INVESTIMENTO EM CONSUMÍVEIS
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">45.000</p>
                      <p className="text-xs">Meticais</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">3</p>
                      <p className="text-xs">Categorias</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">3-4</p>
                      <p className="text-xs">Meses Cobertura</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">100%</p>
                      <p className="text-xs">Conformidade</p>
                    </div>
                  </div>
                </div>

                {/* Observações */}
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Nota:</strong> O investimento total de 45.000 MZN em
                    consumíveis garante o funcionamento adequado do escritório
                    por 3-4 meses, com ênfase na qualidade dos materiais de
                    escritório (55,6% do total) e na conformidade com as normas
                    de segurança exigidas por lei. Os produtos de incêndio têm
                    cobertura anual, enquanto os de escritório e limpeza
                    necessitam de reposição trimestral para manter a operação
                    eficiente.
                  </p>
                </div>
              </div>

              {/* Ponto 9 - Avaliação de Pagamentos Mensais ATUALIZADO */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-gray-950">
                <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-pink-500 text-white p-1 rounded mr-2 text-sm">
                    9
                  </span>
                  Avaliação de Pagamentos Mensais - Custos Operacionais
                  Recorrentes
                </h4>

                {/* Introdução */}
                <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Projeção de custos operacionais mensais</strong>{" "}
                    para manutenção das operações do escritório logístico,
                    incluindo pessoal, serviços essenciais e despesas
                    administrativas.
                  </p>
                </div>

                {/* Tabela de Pagamentos Mensais */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    CUSTOS OPERACIONAIS MENSIAIS
                  </h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Item
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Descrição
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Custo Mensal (MZN)
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Percentagem
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Salário Geral
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            11 funcionários (Director, Supervisor, 6
                            atendimentos, 2 agentes campo, limpeza, segurança)
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            245.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            54,4%
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Renda do Espaço
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Aluguel do espaço comercial em Munhava (contentor +
                            área exterior)
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            25.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            5,6%
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Internet Star-Link
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            2 unidades de internet satélital para redundância
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            50.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            11,1%
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Energia Mensal
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Consumo de 3 ar condicionados, equipamentos e
                            iluminação
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            18.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            4,0%
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Empresa de Segurança
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Serviço de vigilância 24h + sistema de alarme
                            monitorado
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            12.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            2,7%
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Recargas de Celular
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Comunicação da equipa (11 números corporativos)
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            11.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            2,4%
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Recargas Cartões SIM GPS
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Manutenção da conectividade dos 150 dispositivos GPS
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            45.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            10,0%
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Combustível Transportes
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Carrinha Mahindra e 2 motos para operações
                            logísticas
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            35.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            7,8%
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Consumíveis Escritório
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Papel, toner, material de escritório e limpeza
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            8.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1,8%
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Pagamento Advogado
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Assessoria jurídica mensal para contratos e
                            conformidade
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            15.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            3,3%
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Pagamento de Impostos
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            IRPS, IVA e outras obrigações fiscais estimadas
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            25.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            5,6%
                          </td>
                        </tr>
                        <tr className="bg-green-50 font-semibold">
                          <td
                            className="border border-gray-300 px-3 py-2"
                            colSpan="2"
                          >
                            TOTAL DE CUSTOS MENSIAIS
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            450.000,00 MZN
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            100%
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Detalhamento dos Salários */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    DETALHAMENTO DA FOLHA SALARIAL - 11 FUNCIONÁRIOS
                  </h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Cargo
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Quantidade
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Salário Mensal (MZN)
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Subtotal (MZN)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">
                            Director
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            70.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            70.000,00
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">
                            Supervisor
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            45.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            45.000,00
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">
                            Técnico Sistema e GPS
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            35.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            35.000,00
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">
                            Atendimento Carga Nacional
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            25.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            25.000,00
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">
                            Atendimento Carga Trânsito
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            25.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            25.000,00
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">
                            Atendimento Público E-Mola
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            18.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            18.000,00
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">
                            Atendimento Público Impressão
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            18.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            18.000,00
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">
                            Agente de Campo
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            2
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            15.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            30.000,00
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">
                            Secretária de Limpeza
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            10.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            10.000,00
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">
                            Segurança
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            12.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            12.000,00
                          </td>
                        </tr>
                        <tr className="bg-green-50 font-semibold">
                          <td
                            className="border border-gray-300 px-3 py-2"
                            colSpan="3"
                          >
                            TOTAL FOLHA SALARIAL
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            245.000,00 MZN
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Distribuição Gráfica dos Custos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <h6 className="font-semibold text-gray-800 mb-3">
                      Distribuição dos Custos Mensais
                    </h6>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Salários:</span>
                          <span className="font-semibold">54,4%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "54.4%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Tecnologia (Internet + GPS):</span>
                          <span className="font-semibold">21,1%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: "21.1%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Operações (Combustível + Transporte):</span>
                          <span className="font-semibold">7,8%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: "7.8%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Infraestrutura (Renda + Energia):</span>
                          <span className="font-semibold">9,6%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: "9.6%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Outros (Impostos + Advogado + Segurança):</span>
                          <span className="font-semibold">7,1%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: "7.1%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded border border-green-200">
                    <h6 className="font-semibold text-gray-800 mb-3">
                      Estrutura Organizacional
                    </h6>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Gestão/Direção:</span>
                        <span className="font-semibold">2 funcionários</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Atendimento ao Público:</span>
                        <span className="font-semibold">4 funcionários</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Operações Técnicas:</span>
                        <span className="font-semibold">3 funcionários</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Serviços Gerais:</span>
                        <span className="font-semibold">2 funcionários</span>
                      </div>
                      <div className="mt-3 p-2 bg-blue-50 rounded">
                        <p className="text-xs text-gray-700">
                          <strong>Total:</strong> 11 funcionários organizados em
                          4 áreas funcionais
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Projeção de Receitas vs Custos */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
                  <h5 className="font-semibold text-gray-800 mb-2">
                    ANÁLISE DE VIABILIDADE FINANCEIRA
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        450.000
                      </p>
                      <p className="text-xs">Custos Mensais</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        700.000
                      </p>
                      <p className="text-xs">Receita Mínima Esperada</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">
                        250.000
                      </p>
                      <p className="text-xs">Lucro Mensal Estimado</p>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm text-gray-700">
                      <strong>Ponto de Equilíbrio:</strong> 64% da capacidade
                      operacional
                    </p>
                  </div>
                </div>

                {/* Observações */}
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Nota:</strong> Com a nova estrutura de 11
                    funcionários, os custos mensais totais aumentaram para
                    450.000 MZN, sendo a folha salarial a maior parcela (54,4%).
                    A estrutura organizacional inclui funções especializadas em
                    atendimento ao público para serviços de E-Mola e impressão,
                    além de agentes de campo para operações externas. A projeção
                    mantém viabilidade com margem de lucro estimada em 35,7%
                    sobre as receitas mínimas esperadas.
                  </p>
                </div>
              </div>

              {/* Ponto 10 - Avaliação de Meios de Transporte ATUALIZADO */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-gray-950">
                <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-cyan-500 text-white p-1 rounded mr-2 text-sm">
                    10
                  </span>
                  Avaliação de Meios de Transporte - Frota Operacional
                </h4>

                {/* Introdução */}
                <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Frota de veículos para operações logísticas</strong>{" "}
                    incluindo viatura para transporte de documentos, pequenas
                    cargas e deslocações administrativas, além de motociclos
                    para agilidade em deslocações urbanas.
                  </p>
                </div>

                {/* Tabela de Veículos */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    ESPECIFICAÇÃO DA FROTA DE TRANSPORTE
                  </h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Tipo de Veículo
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Modelo
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Quantidade
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Preço Unitário (MZN)
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Subtotal (MZN)
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Aplicação
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Carrinha Fechada com Canopi
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Mahindra
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1 unidade
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1.350.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1.350.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Transporte de documentos, pequenas cargas e
                            deslocações executivas
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Mota Lifon Camelo
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            Lifon Camelo
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            2 unidades
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            72.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            144.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Deslocações rápidas na cidade, entregas urgentes e
                            mensageiro
                          </td>
                        </tr>
                        <tr className="bg-green-50 font-semibold">
                          <td
                            className="border border-gray-300 px-3 py-2"
                            colSpan="4"
                          >
                            INVESTIMENTO TOTAL EM FROTA
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1.494.000,00 MZN
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            3 veículos
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Detalhes dos Veículos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Carrinha Mahindra */}
                  <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">🚐</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          Carrinha Mahindra
                        </h6>
                        <p className="text-xs text-gray-600">
                          Fechada com Canopi
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Investimento:</span>
                        <span className="font-semibold">1.350.000 MZN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Capacidade:</span>
                        <span className="font-semibold">Média carga</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Utilização:</span>
                        <span className="font-semibold">
                          Executiva/Operacional
                        </span>
                      </div>
                      <div className="mt-3 p-2 bg-blue-50 rounded">
                        <p className="text-xs text-gray-700">
                          <strong>Vantagens:</strong> Versátil para múltiplas
                          funções, espaço para carga segura, ideal para
                          transporte de documentos importantes e pequenas
                          mercadorias.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Motas Lifon Camelo */}
                  <div className="bg-white p-4 rounded-lg border border-green-200 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">🏍️</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          Mota Lifon Camelo
                        </h6>
                        <p className="text-xs text-gray-600">2 unidades</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Investimento:</span>
                        <span className="font-semibold">144.000 MZN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Capacidade:</span>
                        <span className="font-semibold">Leve</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Utilização:</span>
                        <span className="font-semibold">
                          Urgências/Entregas
                        </span>
                      </div>
                      <div className="mt-3 p-2 bg-green-50 rounded">
                        <p className="text-xs text-gray-700">
                          <strong>Vantagens:</strong> Alta mobilidade no
                          trânsito, baixo consumo de combustível, ideal para
                          deslocações rápidas na cidade e entregas de documentos
                          urgentes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Distribuição de Custos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <h6 className="font-semibold text-gray-800 mb-3">
                      Distribuição do Investimento
                    </h6>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Carrinha Mahindra:</span>
                          <span className="font-semibold">90,4%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "90.4%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Motas Lifon Camelo:</span>
                          <span className="font-semibold">9,6%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: "9.6%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <h6 className="font-semibold text-gray-800 mb-3">
                      Cobertura Operacional
                    </h6>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        <span>1 viatura para transporte executivo</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span>2 motos para serviço de mensageiro</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        <span>Cobertura total área urbana</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                        <span>Suporte a operações portuárias</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Custos Operacionais Estimados */}
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    CUSTOS OPERACIONAIS MENSIAIS ESTIMADOS
                  </h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Item
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Carrinha Mahindra
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Mota Lifon Camelo (cada)
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Total Mensal
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">
                            Combustível
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            15.000 MZN
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            3.000 MZN
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            21.000 MZN
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">
                            Manutenção
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            5.000 MZN
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1.000 MZN
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            7.000 MZN
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">
                            Seguro
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            8.000 MZN
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1.500 MZN
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            11.000 MZN
                          </td>
                        </tr>
                        <tr className="bg-gray-50 font-semibold">
                          <td className="border border-gray-300 px-3 py-2">
                            TOTAL MENSAL
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            28.000 MZN
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            5.500 MZN
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            39.000 MZN
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Resumo do Investimento */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h5 className="font-semibold text-gray-800 mb-2">
                    INVESTIMENTO EM FROTA OPERACIONAL
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">3</p>
                      <p className="text-xs">Veículos</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        1.494.000
                      </p>
                      <p className="text-xs">Meticais Investidos</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">2</p>
                      <p className="text-xs">Tipos de Veículos</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">
                        39.000
                      </p>
                      <p className="text-xs">Custo Mensal</p>
                    </div>
                  </div>
                </div>

                {/* Observações */}
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Nota:</strong> A frota operacional foi dimensionada
                    para atender às necessidades iniciais do escritório da
                    Munhava, proporcionando mobilidade para a equipa operacional
                    e capacidade de transporte para documentos e pequenas
                    cargas. A carrinha Mahindra oferece versatilidade para
                    múltiplas funções, enquanto as motos garantem agilidade nas
                    deslocações urbanas.
                  </p>
                </div>
              </div>

              {/* Ponto 11 - Avaliação de Compra de GPS ATUALIZADO */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-gray-950">
                <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-lime-500 text-white p-1 rounded mr-2 text-sm">
                    11
                  </span>
                  Avaliação de Compra de GPS - Sistema de Rastreamento
                </h4>

                {/* Introdução */}
                <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Sistema completo de rastreamento GPS</strong> para
                    monitoramento em tempo real de viaturas, contentores e
                    cargas, garantindo segurança e controle total das operações
                    logísticas.
                  </p>
                </div>

                {/* Tabela de Aparelhos GPS */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    ESPECIFICAÇÃO DOS EQUIPAMENTOS GPS
                  </h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Tipo de GPS
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Quantidade
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Preço Unitário (MZN)
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Subtotal (MZN)
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Aplicação
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            GPS Simples Camião
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            100 unidades
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            3.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            300.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Rastreamento básico de viaturas, ideal para frota
                            principal
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            GPS Cadeado Contentor
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            20 unidades
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            23.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            460.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Dispositivo de segurança com sensor de abertura para
                            contentores
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            GPS Carga Geral
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            20 unidades
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            5.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            100.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Para cargas soltas e mercadorias de alto valor
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            GPS Controle Estrada
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            10 unidades
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            12.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            120.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Monitoramento avançado com sensores adicionais
                          </td>
                        </tr>
                        <tr className="bg-green-50 font-semibold">
                          <td
                            className="border border-gray-300 px-3 py-2"
                            colSpan="3"
                          >
                            INVESTIMENTO TOTAL EM GPS
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            980.000,00 MZN
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            150 dispositivos
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Resumo por Tipo de Equipamento */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded border border-blue-200">
                    <h6 className="font-semibold text-gray-800 mb-3">
                      Distribuição por Tipo
                    </h6>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>GPS Simples Camião:</span>
                        <span className="font-semibold">
                          300.000 MZN (30,6%)
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>GPS Cadeado Contentor:</span>
                        <span className="font-semibold">
                          460.000 MZN (46,9%)
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>GPS Carga Geral:</span>
                        <span className="font-semibold">
                          100.000 MZN (10,2%)
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>GPS Controle Estrada:</span>
                        <span className="font-semibold">
                          120.000 MZN (12,2%)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded border border-green-200">
                    <h6 className="font-semibold text-gray-800 mb-3">
                      Cobertura Operacional
                    </h6>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        <span>100 viaturas com rastreamento básico</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        <span>20 contentores com segurança reforçada</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                        <span>20 cargas especiais monitoradas</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        <span>10 viaturas com controle avançado</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Benefícios do Sistema GPS */}
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    VANTAGENS DO SISTEMA DE RASTREAMENTO
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-blue-600">
                        Segurança
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• Monitoramento em tempo real 24/7</li>
                        <li>• Alertas de desvio de rota</li>
                        <li>• Sensores de abertura não autorizada</li>
                        <li>• Localização precisa em caso de roubo</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-green-600">
                        Eficiência
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• Otimização de rotas</li>
                        <li>• Redução de custos com combustível</li>
                        <li>• Melhor planeamento de entregas</li>
                        <li>• Controle de tempos de paragem</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-purple-600">
                        Transparência
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• Relatórios detalhados de percursos</li>
                        <li>• Prova de entrega para clientes</li>
                        <li>• Histórico completo de viagens</li>
                        <li>• Dados para análise de desempenho</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-orange-600">
                        Conformidade
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• Cumprimento de prazos de entrega</li>
                        <li>• Monitoramento de velocidade</li>
                        <li>• Controlo de horários de trabalho</li>
                        <li>• Documentação automática</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Custo Total do Sistema */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h5 className="font-semibold text-gray-800 mb-2">
                    INVESTIMENTO EM TECNOLOGIA DE RASTREAMENTO
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">150</p>
                      <p className="text-xs">Dispositivos GPS</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        980.000
                      </p>
                      <p className="text-xs">Meticais Investidos</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">4</p>
                      <p className="text-xs">Tipos de Dispositivos</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">100%</p>
                      <p className="text-xs">Cobertura da Frota</p>
                    </div>
                  </div>
                </div>

                {/* Observações */}
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Nota:</strong> O investimento em sistema GPS é
                    fundamental para garantir a segurança das cargas, eficiência
                    operacional e transparência para os clientes. Os
                    dispositivos serão integrados com a plataforma digital
                    desenvolvida pela Systems Manager.
                  </p>
                </div>
              </div>

              {/* Ponto 12 - Avaliação Valor de Caixa e Combustível ATUALIZADO */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-gray-950">
                <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-amber-500 text-white p-1 rounded mr-2 text-sm">
                    12
                  </span>
                  Avaliação Valor de Caixa e Combustível - Empresas Parceiras e
                  Capital Operacional
                </h4>

                {/* Introdução */}
                <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>
                      Parcerias estratégicas e capital operacional
                    </strong>{" "}
                    para garantir o funcionamento contínuo das operações
                    logísticas, incluindo seguros, combustível e fundo de caixa
                    para despesas imediatas.
                  </p>
                </div>

                {/* Empresas Parceiras - Seguros */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    EMPRESAS PARCEIRAS - SEGUROS
                  </h5>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">🛡️</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          Imperial Seguros
                        </h6>
                        <p className="text-xs text-gray-600">
                          Parceiro Oficial de Seguros
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2">
                          Coberturas Principais:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Seguro de Cargas (Roubo, Acidentes, Danos)</li>
                          <li>Seguro de Veículos (Frota Operacional)</li>
                          <li>Seguro de Responsabilidade Civil</li>
                          <li>Seguro de Transporte Internacional</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">
                          Benefícios da Parceria:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Taxas preferenciais para volumes altos</li>
                          <li>Processos de sinistros ágeis</li>
                          <li>Cobertura em toda região da SADC</li>
                          <li>Assistência 24 horas</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Empresas Parceiras - Combustível */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    EMPRESAS PARCEIRAS - COMBUSTÍVEL
                  </h5>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">⛽</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          Parcerias com Bombas de Combustível
                        </h6>
                        <p className="text-xs text-gray-600">
                          Rede de Abastecimento Estratégica
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h6 className="font-semibold text-gray-800 mb-2">
                          Investimento em Combustível
                        </h6>
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Valor do Depósito:</span>
                              <span className="font-semibold">
                                3.000.000 MZN
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Quantidade de Diesel:</span>
                              <span className="font-semibold">
                                37.556 Litros
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Preço por Litro (médio):</span>
                              <span className="font-semibold">79,90 MZN/L</span>
                            </div>
                            <div className="mt-2 p-2 bg-yellow-50 rounded">
                              <p className="text-xs text-gray-700">
                                <strong>Nota:</strong> Depósito equivalente a
                                aproximadamente 3 milhões de meticais para
                                garantir abastecimento contínuo da frota
                                operacional.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h6 className="font-semibold text-gray-800 mb-2">
                          Bombas Parceiras
                        </h6>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center p-2 bg-white rounded border">
                            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center mr-2">
                              <span className="text-white text-xs">T</span>
                            </div>
                            <span>Total Mozambique</span>
                          </div>
                          <div className="flex items-center p-2 bg-white rounded border">
                            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center mr-2">
                              <span className="text-white text-xs">G</span>
                            </div>
                            <span>Galp Mozambique</span>
                          </div>
                          <div className="flex items-center p-2 bg-white rounded border">
                            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center mr-2">
                              <span className="text-white text-xs">P</span>
                            </div>
                            <span>Puma Energy</span>
                          </div>
                          <div className="flex items-center p-2 bg-white rounded border">
                            <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center mr-2">
                              <span className="text-white text-xs">S</span>
                            </div>
                            <span>Shell Mozambique</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cálculo de Autonomia */}
                    <div className="mt-4 bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-gray-800 mb-2">
                        Autonomia Estimada
                      </h6>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
                        <div>
                          <p className="text-lg font-bold text-blue-600">150</p>
                          <p className="text-xs">Dias</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-green-600">
                            37.556L
                          </p>
                          <p className="text-xs">Litros Diesel</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-purple-600">
                            250L/dia
                          </p>
                          <p className="text-xs">Consumo Médio</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-orange-600">
                            5 meses
                          </p>
                          <p className="text-xs">Cobertura</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Capital de Caixa */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    CAPITAL DE CAIXA OPERACIONAL
                  </h5>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">💰</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          Fundo de Caixa para Despesas Imediatas
                        </h6>
                        <p className="text-xs text-gray-600">
                          Capital de Giro para Operações do Dia-a-Dia
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h6 className="font-semibold text-gray-800 mb-2">
                          Valor do Fundo de Caixa
                        </h6>
                        <div className="bg-white p-4 rounded border border-gray-200 text-center">
                          <p className="text-3xl font-bold text-purple-600">
                            1.500.000
                          </p>
                          <p className="text-sm text-gray-600">Meticais</p>
                        </div>
                      </div>

                      <div>
                        <h6 className="font-semibold text-gray-800 mb-2">
                          Destinação dos Recursos
                        </h6>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Expedientes Urgentes:</span>
                            <span className="font-semibold">500.000 MZN</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Abastecimento Camiões:</span>
                            <span className="font-semibold">600.000 MZN</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Manutenções Emergentes:</span>
                            <span className="font-semibold">250.000 MZN</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Despesas Diversas:</span>
                            <span className="font-semibold">150.000 MZN</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Fluxo de Caixa */}
                    <div className="mt-4 bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-gray-800 mb-2">
                        Gestão do Fluxo de Caixa
                      </h6>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <p className="text-lg font-bold text-green-600">
                            Semanal
                          </p>
                          <p className="text-xs">Reabastecimento</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-blue-600">
                            Mensal
                          </p>
                          <p className="text-xs">Revisão do Fundo</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-orange-600">
                            Trimestral
                          </p>
                          <p className="text-xs">Ajuste Estratégico</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resumo do Investimento em Capital Operacional */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    RESUMO DO INVESTIMENTO OPERACIONAL
                  </h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Item
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Descrição
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Valor (MZN)
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Percentagem
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Depósito Combustível
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            37.556 litros de diesel para frota operacional
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            3.000.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            66,7%
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Fundo de Caixa
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Capital de giro para despesas imediatas e
                            operacionais
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            1.500.000,00
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            33,3%
                          </td>
                        </tr>
                        <tr className="bg-green-50 font-semibold">
                          <td
                            className="border border-gray-300 px-3 py-2"
                            colSpan="2"
                          >
                            TOTAL CAPITAL OPERACIONAL
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            4.500.000,00 MZN
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            100%
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Benefícios das Parcerias */}
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    VANTAGENS DAS PARCERIAS ESTRATÉGICAS
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-blue-600">
                        Segurança Operacional
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• Cobertura completa de riscos</li>
                        <li>• Proteção patrimonial</li>
                        <li>• Conformidade legal</li>
                        <li>• Tranquilidade para clientes</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-green-600">
                        Eficiência Logística
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• Abastecimento garantido</li>
                        <li>• Preços preferenciais</li>
                        <li>• Rede nacional de apoio</li>
                        <li>• Redução de custos operacionais</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-purple-600">
                        Flexibilidade Financeira
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• Capital para emergências</li>
                        <li>• Agilidade nas operações</li>
                        <li>• Negociação com fornecedores</li>
                        <li>• Oportunidades de negócio</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-orange-600">
                        Vantagens Competitivas
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• Diferenciação no mercado</li>
                        <li>• Confiança dos clientes</li>
                        <li>• Capacidade de resposta</li>
                        <li>• Crescimento sustentável</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Observações */}
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Nota:</strong> O capital operacional total de
                    4.500.000 MZN garante a sustentabilidade das operações
                    logísticas, com foco em três pilares fundamentais: segurança
                    através da Imperial Seguros, combustível através de
                    parcerias com bombas estratégicas, e flexibilidade
                    financeira através do fundo de caixa para despesas
                    imediatas. Esta estrutura permite à Mega Centro de Logística
                    operar com eficiência e responder rapidamente às demandas do
                    mercado.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-gray-950">
                <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-violet-500 text-white p-1 rounded mr-2 text-sm">
                    13
                  </span>
                  Contratação de Pessoal e Equipamento de Serviço - Estrutura
                  Organizacional
                </h4>

                {/* Introdução */}
                <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Estruturação completa da equipa operacional</strong>{" "}
                    com profissionais qualificados e equipamentos necessários
                    para garantir o funcionamento eficiente do escritório
                    logístico em Munhava.
                  </p>
                </div>

                {/* Estrutura Organizacional Detalhada */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    ESTRUTURA ORGANIZACIONAL - 11 COLABORADORES
                  </h5>

                  {/* Direção e Gestão */}
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">👨‍💼</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          Direção e Gestão (2 colaboradores)
                        </h6>
                        <p className="text-xs text-gray-600">
                          Liderança e Supervisão Estratégica
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2">Director Geral</p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>
                            <strong>Salário:</strong> 70.000 MZN/mês
                          </li>
                          <li>
                            <strong>Formação:</strong> Gestão/Logística
                            (Licenciatura)
                          </li>
                          <li>
                            <strong>Experiência:</strong> 5+ anos em logística
                          </li>
                          <li>
                            <strong>Responsabilidades:</strong> Estratégia, P&L,
                            Parcerias
                          </li>
                          <li>
                            <strong>Competências:</strong> Liderança,
                            Negociação, Visão
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">
                          Supervisor Operacional
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>
                            <strong>Salário:</strong> 45.000 MZN/mês
                          </li>
                          <li>
                            <strong>Formação:</strong> Logística/Transportes
                          </li>
                          <li>
                            <strong>Experiência:</strong> 3+ anos em supervisão
                          </li>
                          <li>
                            <strong>Responsabilidades:</strong> Equipa,
                            Operações, KPIs
                          </li>
                          <li>
                            <strong>Competências:</strong> Gestão, Resolução
                            problemas
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Área Técnica e Operações */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">🔧</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          Área Técnica e Operações (3 colaboradores)
                        </h6>
                        <p className="text-xs text-gray-600">
                          Suporte Técnico e Operações Externas
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2">
                          Técnico Sistema e GPS
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>
                            <strong>Salário:</strong> 35.000 MZN/mês
                          </li>
                          <li>
                            <strong>Formação:</strong> TI/Redes/Electrónica
                          </li>
                          <li>
                            <strong>Experiência:</strong> 2+ anos em suporte
                            técnico
                          </li>
                          <li>
                            <strong>Responsabilidades:</strong> GPS, Sistema,
                            Redes
                          </li>
                          <li>
                            <strong>Competências:</strong> Troubleshooting,
                            Manutenção
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">
                          Agente de Campo (2)
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>
                            <strong>Salário:</strong> 15.000 MZN/mês cada
                          </li>
                          <li>
                            <strong>Formação:</strong> Secundário completo
                          </li>
                          <li>
                            <strong>Experiência:</strong> 1+ ano em campo
                          </li>
                          <li>
                            <strong>Responsabilidades:</strong> Operações
                            externas
                          </li>
                          <li>
                            <strong>Competências:</strong> Condução, Comunicação
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Atendimento ao Público */}
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">💁</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          Atendimento ao Público (4 colaboradores)
                        </h6>
                        <p className="text-xs text-gray-600">
                          Serviço ao Cliente e Operações Internas
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2">
                          Atendimento Carga Nacional
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>
                            <strong>Salário:</strong> 25.000 MZN/mês
                          </li>
                          <li>
                            <strong>Formação:</strong> Comercial/Atendimento
                          </li>
                          <li>
                            <strong>Experiência:</strong> 2+ anos em atendimento
                          </li>
                          <li>
                            <strong>Responsabilidades:</strong> Clientes
                            nacionais
                          </li>
                          <li>
                            <strong>Competências:</strong> Vendas, Negociação
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">
                          Atendimento Carga Trânsito
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>
                            <strong>Salário:</strong> 25.000 MZN/mês
                          </li>
                          <li>
                            <strong>Formação:</strong> Comercial/Internacional
                          </li>
                          <li>
                            <strong>Experiência:</strong> 2+ anos em comércio
                            internacional
                          </li>
                          <li>
                            <strong>Responsabilidades:</strong> Clientes
                            internacionais
                          </li>
                          <li>
                            <strong>Competências:</strong> Inglês, Documentação
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">
                          Atendimento Público E-Mola
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>
                            <strong>Salário:</strong> 18.000 MZN/mês
                          </li>
                          <li>
                            <strong>Formação:</strong> Atendimento/Caixa
                          </li>
                          <li>
                            <strong>Experiência:</strong> 1+ ano em caixa
                          </li>
                          <li>
                            <strong>Responsabilidades:</strong> Pagamentos
                            E-Mola
                          </li>
                          <li>
                            <strong>Competências:</strong> Caixa, Atendimento
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">
                          Atendimento Público Impressão
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>
                            <strong>Salário:</strong> 18.000 MZN/mês
                          </li>
                          <li>
                            <strong>Formação:</strong> Atendimento/Reprografia
                          </li>
                          <li>
                            <strong>Experiência:</strong> 1+ ano em reprografia
                          </li>
                          <li>
                            <strong>Responsabilidades:</strong> Serviços de
                            impressão
                          </li>
                          <li>
                            <strong>Competências:</strong> Equipamentos,
                            Atendimento
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Serviços Gerais */}
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">🧹</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          Serviços Gerais (2 colaboradores)
                        </h6>
                        <p className="text-xs text-gray-600">
                          Apoio e Manutenção das Instalações
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2">
                          Secretária de Limpeza
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>
                            <strong>Salário:</strong> 10.000 MZN/mês
                          </li>
                          <li>
                            <strong>Formação:</strong> Básica completa
                          </li>
                          <li>
                            <strong>Experiência:</strong> Limpeza comercial
                          </li>
                          <li>
                            <strong>Responsabilidades:</strong> Limpeza,
                            Organização
                          </li>
                          <li>
                            <strong>Competências:</strong> Organização, Higiene
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Segurança</p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>
                            <strong>Salário:</strong> 12.000 MZN/mês
                          </li>
                          <li>
                            <strong>Formação:</strong> Curso de segurança
                          </li>
                          <li>
                            <strong>Experiência:</strong> 1+ ano em segurança
                          </li>
                          <li>
                            <strong>Responsabilidades:</strong> Vigilância,
                            Controlo acesso
                          </li>
                          <li>
                            <strong>Competências:</strong> Vigilância, Primeiros
                            socorros
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Equipamento de Serviço Detalhado */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    EQUIPAMENTO DE SERVIÇO E UNIFORMES
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Uniformes Corporativos */}
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm">👔</span>
                        </div>
                        <h6 className="font-semibold text-gray-800">
                          Uniformes Corporativos
                        </h6>
                      </div>
                      <ul className="list-disc pl-4 space-y-2 text-xs">
                        <li>
                          <strong>Camisas polo:</strong> 3 unidades por
                          colaborador (azul corporativo)
                        </li>
                        <li>
                          <strong>Calças/ Saias:</strong> 2 unidades pretas
                        </li>
                        <li>
                          <strong>Casacos:</strong> 1 unidade com logo bordado
                        </li>
                        <li>
                          <strong>Coletes de identificação:</strong> 1 unidade
                          refletiva
                        </li>
                        <li>
                          <strong>Calçado de segurança:</strong> 1 par fechado
                        </li>
                        <li>
                          <strong>Crachás identificação:</strong> Com foto e
                          função
                        </li>
                        <li>
                          <strong>Orçamento total:</strong> 55.000 MZN
                        </li>
                      </ul>
                    </div>

                    {/* Equipamento de Proteção Individual */}
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm">🛡️</span>
                        </div>
                        <h6 className="font-semibold text-gray-800">
                          Equipamento de Proteção Individual
                        </h6>
                      </div>
                      <ul className="list-disc pl-4 space-y-2 text-xs">
                        <li>
                          <strong>Coletes refletivos:</strong> Para agentes de
                          campo
                        </li>
                        <li>
                          <strong>Luvas de proteção:</strong> Para
                          carga/descarga
                        </li>
                        <li>
                          <strong>Óculos de segurança:</strong> Para áreas
                          técnicas
                        </li>
                        <li>
                          <strong>Protetores auriculares:</strong> Para ambiente
                          ruidoso
                        </li>
                        <li>
                          <strong>Máscaras descartáveis:</strong> Stock mensal
                        </li>
                        <li>
                          <strong>Kits primeiros socorros:</strong> Por
                          departamento
                        </li>
                        <li>
                          <strong>Orçamento total:</strong> 25.000 MZN
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {/* Dispositivos de Comunicação */}
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm">📱</span>
                        </div>
                        <h6 className="font-semibold text-gray-800">
                          Dispositivos de Comunicação
                        </h6>
                      </div>
                      <ul className="list-disc pl-4 space-y-2 text-xs">
                        <li>
                          <strong>Smartphones corporativos:</strong> 6 unidades
                          (Directoria e campo)
                        </li>
                        <li>
                          <strong>Rádios comunicadores:</strong> 4 unidades VHF
                        </li>
                        <li>
                          <strong>Headsets:</strong> Para atendimento telefónico
                        </li>
                        <li>
                          <strong>Tablets operacionais:</strong> 2 unidades para
                          agentes
                        </li>
                        <li>
                          <strong>Cartões SIM corporativos:</strong> 11 unidades
                        </li>
                        <li>
                          <strong>Carregadores e acessórios:</strong> Stock de
                          reserva
                        </li>
                        <li>
                          <strong>Orçamento total:</strong> 120.000 MZN
                        </li>
                      </ul>
                    </div>

                    {/* Material de Escritório Pessoal */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm">📎</span>
                        </div>
                        <h6 className="font-semibold text-gray-800">
                          Material de Escritório Pessoal
                        </h6>
                      </div>
                      <ul className="list-disc pl-4 space-y-2 text-xs">
                        <li>
                          <strong>Kits individuais:</strong> Canetas, blocos,
                          agrafador
                        </li>
                        <li>
                          <strong>Pastas organizadoras:</strong> Por colaborador
                        </li>
                        <li>
                          <strong>Calculadoras:</strong> Para atendimento
                          comercial
                        </li>
                        <li>
                          <strong>Porta-documentos:</strong> Executivos para
                          direção
                        </li>
                        <li>
                          <strong>Material específico:</strong> Por
                          função/departamento
                        </li>
                        <li>
                          <strong>Reposição trimestral:</strong> Sistema de
                          controlo
                        </li>
                        <li>
                          <strong>Orçamento total:</strong> 15.000 MZN
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Processo de Contratação */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <h6 className="font-semibold text-gray-800 mb-3">
                      Processo de Contratação
                    </h6>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs">1</span>
                        </div>
                        <span>Publicação de anúncios (2 semanas)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs">2</span>
                        </div>
                        <span>Seleção de currículos (1 semana)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs">3</span>
                        </div>
                        <span>Entrevistas e testes (2 semanas)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs">4</span>
                        </div>
                        <span>Contratação e documentação (1 semana)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs">5</span>
                        </div>
                        <span>Integração e formação (4 semanas)</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded border border-green-200">
                    <h6 className="font-semibold text-gray-800 mb-3">
                      Custos de Contratação
                    </h6>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Folha salarial mensal:</span>
                        <span className="font-semibold">245.000 MZN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Encargos sociais (23%):</span>
                        <span className="font-semibold">56.350 MZN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Equipamento inicial:</span>
                        <span className="font-semibold">215.000 MZN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Custos recrutamento:</span>
                        <span className="font-semibold">25.000 MZN</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Investimento total inicial:</span>
                        <span>541.350 MZN</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefícios e Vantagens */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
                  <h5 className="font-semibold text-gray-800 mb-2">
                    RESUMO DA ESTRUTURA DE PESSOAS
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">11</p>
                      <p className="text-xs">Colaboradores</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">4</p>
                      <p className="text-xs">Departamentos</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">245K</p>
                      <p className="text-xs">Folha Salarial</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">10</p>
                      <p className="text-xs">Semanas Processo</p>
                    </div>
                  </div>
                </div>

                {/* Observações */}
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Nota:</strong> A estrutura organizacional de 11
                    colaboradores foi desenhada para otimizar a operação
                    logística com foco em eficiência e atendimento ao cliente. O
                    investimento total inicial em pessoal e equipamentos é de
                    541.350 MZN, incluindo folha salarial mensal de 245.000 MZN
                    mais encargos sociais. O processo completo de recrutamento e
                    integração tem duração de 10 semanas, garantindo a seleção
                    de profissionais qualificados e alinhados com a cultura
                    organizacional da empresa.
                  </p>
                </div>
              </div>

              {/* Ponto 14 - Tempo de Formação ao Sistema MELHORADO */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-gray-950">
                <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-rose-500 text-white p-1 rounded mr-2 text-sm">
                    14
                  </span>
                  Tempo de Formação ao Sistema - Plano de Capacitação Completo
                </h4>

                {/* Introdução */}
                <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Programa estruturado de capacitação</strong> para
                    garantir a adoção eficiente da plataforma logística por toda
                    a equipa, desde conceitos básicos até operações avançadas.
                  </p>
                </div>

                {/* Cronograma de Formação */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    CRONOGRAMA DETALHADO DE FORMAÇÃO
                  </h5>

                  {/* Fase 1 */}
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          FASE 1: FORMAÇÃO BÁSICA DO SISTEMA
                        </h6>
                        <p className="text-xs text-gray-600">
                          Duração: 1 Semana (5 Dias Úteis)
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2">
                          Conteúdos Principais:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Introdução à plataforma logística</li>
                          <li>Navegação e interface do usuário</li>
                          <li>Gestão de perfil e configurações</li>
                          <li>Módulo básico de clientes</li>
                          <li>Sistema de autenticação e segurança</li>
                          <li>Primeiros passos na criação de serviços</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Metodologia:</p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Aulas teóricas presenciais</li>
                          <li>Demonstrações práticas</li>
                          <li>Exercícios guiados</li>
                          <li>Material de apoio digital</li>
                          <li>Avaliação de compreensão básica</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-3 p-2 bg-white rounded border border-green-100">
                      <p className="text-xs text-gray-700">
                        <strong>Objetivo:</strong> Garantir que todos os
                        utilizadores compreendam a estrutura básica do sistema e
                        sejam capazes de realizar operações simples.
                      </p>
                    </div>
                  </div>

                  {/* Fase 2 */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          FASE 2: FORMAÇÃO AVANÇADA E CASOS PRÁTICOS
                        </h6>
                        <p className="text-xs text-gray-600">
                          Duração: 2 Semanas (10 Dias Úteis)
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2">Módulos Avançados:</p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Gestão completa de cargas e fretes</li>
                          <li>Sistema de rastreamento GPS integrado</li>
                          <li>Módulo financeiro e faturação</li>
                          <li>Gestão de contratos e documentação</li>
                          <li>Relatórios analíticos e dashboard</li>
                          <li>Integração com sistemas terceiros</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">
                          Casos Práticos por Departamento:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Atendimento: Gestão de clientes e serviços</li>
                          <li>Operações: Rastreamento e monitoramento</li>
                          <li>Administrativo: Faturação e relatórios</li>
                          <li>Gestão: Análise de dados e KPIs</li>
                          <li>Simulações de cenários reais</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-3 p-2 bg-white rounded border border-blue-100">
                      <p className="text-xs text-gray-700">
                        <strong>Objetivo:</strong> Desenvolver competências
                        avançadas para operação eficiente do sistema em cenários
                        reais de trabalho.
                      </p>
                    </div>
                  </div>

                  {/* Fase 3 */}
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">3</span>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800">
                          FASE 3: SIMULAÇÕES E TESTES
                        </h6>
                        <p className="text-xs text-gray-600">
                          Duração: 1 Semana (5 Dias Úteis)
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2">
                          Atividades Práticas:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Simulação de operações completas</li>
                          <li>Testes de stress do sistema</li>
                          <li>Resolução de problemas comuns</li>
                          <li>Exercícios de contingência</li>
                          <li>Validação de processos críticos</li>
                          <li>Testes de usabilidade</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Avaliação Final:</p>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Teste teórico de conhecimentos</li>
                          <li>Prova prática de competências</li>
                          <li>Avaliação de desempenho individual</li>
                          <li>Feedback personalizado</li>
                          <li>Certificação de conclusão</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-3 p-2 bg-white rounded border border-purple-100">
                      <p className="text-xs text-gray-700">
                        <strong>Objetivo:</strong> Garantir que toda a equipa
                        está preparada para operar o sistema com confiança e
                        eficiência em ambiente real.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Resumo da Formação */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <h6 className="font-semibold text-gray-800 mb-3">
                      Resumo da Formação Intensiva
                    </h6>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Duração Total:</span>
                        <span className="font-semibold">4 Semanas</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dias de Formação:</span>
                        <span className="font-semibold">20 Dias Úteis</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Horas Totais:</span>
                        <span className="font-semibold">160 Horas</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Equipa Formada:</span>
                        <span className="font-semibold">11 Funcionários</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Horário Diário:</span>
                        <span className="font-semibold">8:00 - 17:00</span>
                      </div>
                      <div className="mt-3 p-2 bg-white rounded border">
                        <p className="text-xs text-gray-700">
                          <strong>Metodologia:</strong> 40% Teórica | 60%
                          Prática
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded border border-green-200">
                    <h6 className="font-semibold text-gray-800 mb-3">
                      Formação Contínua e Suporte
                    </h6>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                          <span>Formação Mensal:</span>
                        </div>
                        <span className="font-semibold">4 horas/mês</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                          <span>Suporte Técnico:</span>
                        </div>
                        <span className="font-semibold">24/7</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                          <span>Atualizações do Sistema:</span>
                        </div>
                        <span className="font-semibold">Trimestral</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
                          <span>Refresher Training:</span>
                        </div>
                        <span className="font-semibold">Semestral</span>
                      </div>
                      <div className="mt-3 p-2 bg-white rounded border border-green-100">
                        <p className="text-xs text-gray-700">
                          <strong>Recursos:</strong> Manual do usuário,
                          vídeo-aulas, helpdesk dedicado
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Plano de Formação por Cargo */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    PLANO DE FORMAÇÃO ESPECÍFICO POR CARGO
                  </h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Cargo
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Foco Principal
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Módulos Específicos
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left">
                            Nível Esperado
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Director
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Gestão e Análise
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Dashboard, Relatórios, KPIs
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Avançado
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Supervisor
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Supervisão Operacional
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Monitoramento, Alertas, Controlo
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Avançado
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Técnico Sistema/GPS
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Técnico e Suporte
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            GPS, API, Troubleshooting
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Especialista
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Atendimento
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Operações Diárias
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Clientes, Serviços, Faturação
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Intermediário
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Agentes Campo
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Operações Externas
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            App Mobile, GPS, Check-ins
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Básico
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            Serviços Gerais
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Acesso Limitado
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Sistema Básico, Relatórios Simples
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-xs">
                            Básico
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recursos de Apoio */}
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    RECURSOS DE APOIO À FORMAÇÃO
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-blue-600">
                        Material Didático
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• Manual do Usuário Completo (PDF)</li>
                        <li>• Vídeo-aulas por módulo</li>
                        <li>• Checklists de procedimentos</li>
                        <li>• Guias de resolução de problemas</li>
                        <li>• Apresentações em PowerPoint</li>
                        <li>• Exercícios práticos</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-green-600">
                        Infraestrutura
                      </h6>
                      <ul className="text-xs space-y-1">
                        <li>• Sala de formação equipada</li>
                        <li>• Computadores para todos os formandos</li>
                        <li>• Ambiente de testes (sandbox)</li>
                        <li>• Acesso à internet de alta velocidade</li>
                        <li>• Projetor e equipamento audiovisual</li>
                        <li>• Material de escritório</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Métricas de Sucesso */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
                  <h5 className="font-semibold text-gray-800 mb-2">
                    MÉTRICAS DE SUCESSO DA FORMAÇÃO
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">95%</p>
                      <p className="text-xs">Taxa de Aprovação</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">100%</p>
                      <p className="text-xs">Cobertura da Equipa</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">4</p>
                      <p className="text-xs">Semanas</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">24/7</p>
                      <p className="text-xs">Suporte Pós-Formação</p>
                    </div>
                  </div>
                </div>

                {/* Observações */}
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Nota:</strong> O programa de formação de 4 semanas
                    foi desenhado para garantir a adoção eficiente do sistema
                    por todos os 11 funcionários, com enfoque em metodologias
                    práticas (60% do tempo). A formação contínua mensal e o
                    suporte técnico permanente garantem a manutenção das
                    competências e a rápida resolução de quaisquer problemas
                    operacionais. Cada cargo recebe formação específica conforme
                    suas responsabilidades, otimizando o tempo e garantindo
                    competências relevantes.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm bg-gradient-to-r from-green-50 to-blue-50">
                <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-green-600 text-white p-1 rounded mr-2 text-sm">
                    15
                  </span>
                  Data de Início do Projeto - Cronograma Estratégico
                </h4>

                {/* Data Principal */}
                <div className="text-center py-4 mb-4">
                  <p className="text-2xl font-bold text-green-700 mb-2">
                    01 de Março de 2025
                  </p>
                  <p className="text-lg text-gray-600">
                    Previsão de operação plena: 01 de Julho de 2025
                  </p>
                </div>

                {/* Justificativa da Data */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3 text-center">
                    JUSTIFICATIVA ESTRATÉGICA DA DATA DE INÍCIO
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-3 rounded-lg border border-green-200">
                      <h6 className="font-semibold text-sm mb-2 text-blue-600 flex items-center">
                        <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                        Análise de Mercado
                      </h6>
                      <ul className="text-xs space-y-1 text-gray-950">
                        <li>
                          • Período pós-epoca festiva - retomada económica
                        </li>
                        <li>
                          • Ciclo agrícola da região - pico de exportações
                        </li>
                        <li>• Temporada de comércio internacional favorável</li>
                        <li>• Concorrência em fase de planeamento anual</li>
                        <li>• Clima favorável para obras e instalações</li>
                      </ul>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-blue-200">
                      <h6 className="font-semibold text-sm mb-2 text-green-600 flex items-center">
                        <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                        Condições Operacionais
                      </h6>
                      <ul className="text-xs space-y-1 text-gray-950">
                        <li>• Conclusão da época chuvosa na Beira</li>
                        <li>• Condições logísticas otimizadas no porto</li>
                        <li>• Disponibilidade de mão-de-obra qualificada</li>
                        <li>• Melhor acesso a fornecedores e serviços</li>
                        <li>
                          • Infraestruturas públicas em pleno funcionamento
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Cronograma Detalhado */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3 text-center">
                    CRONOGRAMA DETALHADO DE IMPLEMENTAÇÃO
                  </h5>

                  <div className="space-y-3">
                    {/* Fase 1 */}
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <span className="text-white text-xs font-bold">1</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-gray-200 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h6 className="font-semibold text-gray-800">
                              Fase 1: Implementação Inicial
                            </h6>
                            <p className="text-xs text-gray-600">
                              01 Março - 30 Abril 2025 (8 semanas)
                            </p>
                          </div>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            Crítica
                          </span>
                        </div>
                        <ul className="text-xs space-y-1 mt-2 list-disc pl-4 text-gray-950">
                          <li>
                            Contratação de pessoal chave (Diretor, Supervisor)
                          </li>
                          <li>Aquisição e adaptação do contentor escritório</li>
                          <li>Instalações elétricas e de infraestrutura</li>
                          <li>Desenvolvimento do sistema logístico</li>
                          <li>Legalização completa da empresa</li>
                        </ul>
                      </div>
                    </div>

                    {/* Fase 2 */}
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <span className="text-white text-xs font-bold">2</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-gray-200 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h6 className="font-semibold text-gray-800">
                              Fase 2: Estruturação Operacional
                            </h6>
                            <p className="text-xs text-gray-600">
                              01 Maio - 15 Junho 2025 (6 semanas)
                            </p>
                          </div>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            Implementação
                          </span>
                        </div>
                        <ul className="text-xs space-y-1 mt-2 list-disc pl-4 text-gray-950">
                          <li>
                            Contratação da equipa completa (11 colaboradores)
                          </li>
                          <li>Instalação de equipamentos e mobiliário</li>
                          <li>Formação intensiva do sistema (4 semanas)</li>
                          <li>Estabelecimento de parcerias estratégicas</li>
                          <li>Testes operacionais e ajustes finais</li>
                        </ul>
                      </div>
                    </div>

                    {/* Fase 3 */}
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <span className="text-white text-xs font-bold">3</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-gray-200 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h6 className="font-semibold text-gray-800">
                              Fase 3: Operação Plena
                            </h6>
                            <p className="text-xs text-gray-600">
                              01 Julho 2025 em diante
                            </p>
                          </div>
                          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                            Operacional
                          </span>
                        </div>
                        <ul className="text-xs space-y-1 mt-2 list-disc pl-4 text-gray-950">
                          <li>Início das operações comerciais em escala</li>
                          <li>Monitoramento contínuo de performance</li>
                          <li>Otimização de processos operacionais</li>
                          <li>Expansão gradual da carteira de clientes</li>
                          <li>Consolidação no mercado logístico</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Marcos Principais */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3 text-center">
                    MARCOSTRANSFORMAIS DO PROJETO
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                    <div className="bg-white p-3 rounded-lg border border-green-200">
                      <p className="text-lg font-bold text-green-600">15/03</p>
                      <p className="text-xs text-gray-600">
                        Legalização Concluída
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-blue-200">
                      <p className="text-lg font-bold text-blue-600">15/04</p>
                      <p className="text-xs text-gray-600">
                        Infraestrutura Pronta
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-purple-200">
                      <p className="text-lg font-bold text-purple-600">15/05</p>
                      <p className="text-xs text-gray-600">Equipa Completa</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-orange-200">
                      <p className="text-lg font-bold text-orange-600">30/06</p>
                      <p className="text-xs text-gray-600">
                        Sistema Operacional
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fatores de Sucesso */}
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800 mb-3 text-center">
                    FATORES CRÍTICOS DE SUCESSO
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-green-600">
                        ✅ Vantagens Competitivas
                      </h6>
                      <ul className="text-xs space-y-1 text-gray-950">
                        <li>• Entrada no mercado no período de alta demanda</li>
                        <li>
                          • Infraestrutura preparada para picos operacionais
                        </li>
                        <li>• Equipa formada antes da temporada principal</li>
                        <li>• Posicionamento estratégico consolidado</li>
                        <li>• Parcerias estabelecidas no timing ideal</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <h6 className="font-semibold text-sm mb-2 text-blue-600">
                        📊 Projeção Financeira
                      </h6>
                      <ul className="text-xs space-y-1 text-gray-950">
                        <li>• Break-even previsto para Outubro 2025</li>
                        <li>• Retorno do investimento em 18 meses</li>
                        <li>• Crescimento orgânico sustentável</li>
                        <li>• Margens operacionais competitivas</li>
                        <li>• Expansão planeada para 2026</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Resumo de Investimento */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
                  <h5 className="font-semibold text-gray-800 mb-2 text-center">
                    INVESTIMENTO E RETORNO ESPERADO
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-xl font-bold text-blue-600">9.045M</p>
                      <p className="text-xs text-gray-950">Investimento Total</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-green-600">
                        4 meses
                      </p>
                      <p className="text-xs text-gray-950">Implementação</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-purple-600">
                        7 meses
                      </p>
                      <p className="text-xs text-gray-950">Break-even</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-orange-600">
                        18 meses
                      </p>
                      <p className="text-xs text-gray-950">ROI Completo</p>
                    </div>
                  </div>
                </div>

                {/* Observações Finais */}
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm text-gray-700 text-center">
                    <strong>Conclusão Estratégica:</strong> A data de 01 de
                    Março de 2025 foi meticulosamente selecionada para maximizar
                    o sucesso do projeto, alinhando condições de mercado
                    favoráveis, fatores climáticos ideais e timing operacional
                    estratégico. Esta programação permite à Mega Centro de
                    Logística posicionar-se competitivamente no mercado com
                    infraestrutura completa e equipa formada antes do pico da
                    temporada logística, garantindo um início sólido e
                    crescimento sustentável.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Resumo do Investimento */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              RESUMO DO INVESTIMENTO INICIAL
            </h3>
            <div className="overflow-x-auto text-gray-950">
              <table className="min-w-full bg-white border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2 text-left">
                      Item
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left">
                      Custo Estimado (MZN)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">
                      Serviços jurídicos e abertura da empresa
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      78.500 MZN
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">
                      Desenvolvimento do sistema logístico
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      114.363 MZN
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">
                      Elaboração de contratos e documentos jurídicos
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      45.000 MZN
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">
                      Contentor pré-fabricado e adaptação
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      350.000 MZN
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">
                      Mobiliário de escritório (Homecenter)
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      572.130 MZN
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">
                      Equipamento informático
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      866.000 MZN
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">
                      Consumíveis (escritório, limpeza, incêndio)
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      45.000 MZN
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">
                      Sistema GPS e monitoramento
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      980.000 MZN
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">
                      Meios de transporte
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      1.494.000 MZN
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">
                      Capital operacional (combustível + caixa)
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      4.500.000 MZN
                    </td>
                  </tr>
                  <tr className="bg-gray-50 font-semibold">
                    <td className="border border-gray-300 px-3 py-2">
                      TOTAL DO INVESTIMENTO INICIAL
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      9.044.993 MZN
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AreaLogisticaMunhava;
