import React from 'react';

const MemoriaDescritiva = () => {
  return (
    <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Cabeçalho */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-amber-500 text-white p-2 rounded-lg mr-3">
            🏗️
          </span>
          Memória Descritiva - Mega Centro de Logística
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Documento técnico e descritivo do projeto "Mega Centro de
          Logística", apresentando características gerais, funcionais e
          estruturais do empreendimento.
        </p>
      </div>

      {/* Conteúdo com scroll */}
      <div className="flex-1 overflow-y-auto max-h-[700px]">
        <div className="p-6 space-y-6">
          {/* Informações da Empresa */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              MEGA CENTRO DE LOGISTICA, LIMITADA
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>Endereço:</strong> Rua General Vieira da Costa,
                Edifício do Supermercado SPAR – VIP, 1° andar
                <br />
                <strong>Localização:</strong> Beira – Moçambique
                (Pioneiros)
                <br />
                <strong>Telefone:</strong> +258 872424567
                <br />
                <strong>E-mail:</strong> Megacentrodelogistica@gmail.com
              </p>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Sumário Executivo
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              A Mega Centro de Logística é uma empresa moçambicana com
              foco principal nas operações do Porto da Beira, o segundo
              maior porto do país, estrategicamente localizado na cidade
              da Beira, província de Sofala. Este porto desempenha um
              papel fundamental no comércio regional e internacional,
              integrando o Corredor da Beira e servindo como importante
              via de escoamento para países como o Zimbabwe, Malawi,
              Zâmbia e a República Democrática do Congo.
            </p>

            <p className="text-gray-700 text-sm leading-relaxed mt-4">
              O Porto da Beira conta com 12 cais de profundidades entre 8
              e 10 metros, permitindo a atracação de navios de grande
              porte. Trata-se de um dos portos mais eficientes da África
              Austral, especialmente nas exportações de minerais e
              produtos agrícolas. No primeiro semestre de 2024, o porto
              registou uma movimentação significativa:
            </p>

            <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-2 mt-4">
              <li>
                <strong>Terminal de carga geral:</strong> 1,4 milhões de
                toneladas semestral (uma média de 233.333 toneladas por
                mês, o que equivale a aproximadamente 300 camiões por dia)
              </li>
              <li>
                <strong>Terminal de contentores:</strong> 161 mil
                contentores semestral (cerca de 26.833 por mês,
                representando 894 movimentações diárias)
              </li>
            </ul>

            <p className="text-gray-700 text-sm leading-relaxed mt-4">
              No total, o porto processa cerca de 1.194 movimentações de
              cargas por dia.
            </p>

            <p className="text-gray-700 text-sm leading-relaxed mt-4">
              Diante desse cenário promissor, a Mega Centro de Logística
              tem como meta conquistar 5% do volume de movimentações
              diárias, o que representa cerca de 60 carregamentos por dia
              e 1.800 por mês, garantindo assim uma operação estável e
              sustentável.
            </p>

            <p className="text-gray-700 text-sm leading-relaxed mt-4">
              Para atingir esse objetivo, a empresa está a desenvolver uma
              estrutura de serviços logísticos integrados, incluindo:
            </p>

            <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-2 mt-4">
              <li>Escritórios partilhados para gestão de operações</li>
              <li>Salas de reuniões corporativas</li>
              <li>
                Infraestruturas tecnológicas para rastreio de cargas,
                despacho aduaneiro, gestão de transportes e serviços
                terceirizados
              </li>
            </ul>

            <p className="text-gray-700 text-sm leading-relaxed mt-4">
              Além disso, a Mega Centro de Logística está a implementar um
              sistema eficaz de gestão de relacionamento com clientes, com
              foco na centralização de dados e histórico de interações.
              Este sistema permitirá armazenar e utilizar informações
              estratégicas como contactos, e-mails, endereços e histórico
              de contentores, contribuindo para decisões mais precisas em
              marketing, vendas e atendimento personalizado.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="text-md font-semibold text-gray-800 mb-2">
                  Missão
                </h4>
                <p className="text-gray-700 text-sm">
                  Prestar serviços logísticos eficientes, seguros e
                  integrados na Cidade da Beira.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="text-md font-semibold text-gray-800 mb-2">
                  Visão
                </h4>
                <p className="text-gray-700 text-sm">
                  Ser uma das maiores empresas logísticas de Moçambique.
                </p>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="text-md font-semibold text-gray-800 mb-2">
                  Valores
                </h4>
                <p className="text-gray-700 text-sm">
                  Compromisso, Eficiência, Inovação e Transparência.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              DESCRIÇÃO DO FUNCIONAMENTO DA EMPRESA
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-2">
                  1. Tipo de Empresa
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  A Mega Centro de Logística é uma empresa moçambicana
                  voltada para a inovação no setor logístico, oferecendo
                  serviços integrados de despacho aduaneiro, transporte de
                  carga, abastecimento, estiva, agenciamento, seguros e
                  monitoramento via GPS. Seu diferencial está na
                  centralização de serviços em uma única plataforma
                  digital, proporcionando maior confiança, rapidez e
                  eficácia.
                </p>
              </div>

              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-2">
                  2. Aplicativo de Informação
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Trata-se de um programa simples e de fácil utilização,
                  desenvolvido para facilitar a experiência dos clientes,
                  reunindo diversos tipos de serviços logísticos em uma
                  única plataforma. Esta solução representa um novo e
                  moderno sistema de gestão logística, que integra
                  eficiência, praticidade e inovação, centralizando tudo o
                  que o cliente precisa em uma única empresa.
                </p>
              </div>

              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-2">
                  3. Objectivos
                </h4>
                <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-2">
                  <li>
                    Proporcionar um sistema moderno e acessível para
                    gestão de serviços logísticos
                  </li>
                  <li>
                    Atender clientes nacionais e internacionais,
                    permitindo solicitações remotas
                  </li>
                  <li>
                    Oferecer serviços a preços competitivos com acesso
                    online 24h
                  </li>
                  <li>
                    Expandir para várias cidades portuárias, mantendo a
                    uniformidade de serviços
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-4">
                  4. Serviços Disponíveis
                </h4>

                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      4.1. Agenciamento de Cargas
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      O agenciamento de cargas é um serviço prestado por
                      empresas ou profissionais especializados na
                      organização, coordenação e intermediação do
                      transporte de mercadorias entre o remetente e o
                      destinatário.
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed mt-2">
                      O objetivo principal é otimizar custos, prazos e
                      garantir a entrega segura da carga. As
                      responsabilidades do agente de cargas incluem:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-1 mt-2">
                      <li>Melhoria contínua dos processos logísticos</li>
                      <li>Gestão simplificada do transporte</li>
                      <li>Redução de custos operacionais</li>
                      <li>Otimização da logística em geral</li>
                      <li>
                        Atuação especializada no setor de transporte e
                        comércio
                      </li>
                      <li>
                        Acompanhamento completo do processo até a entrega
                        final
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      4.2. Despacho Aduaneiro
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      O despachante aduaneiro é o profissional ou empresa
                      responsável por realizar o desembaraço aduaneiro de
                      mercadorias importadas ou exportadas, atuando como
                      representante legal do importador ou exportador
                      perante a Autoridade Tributária de Moçambique.
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed mt-2">
                      As suas funções incluem:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-1 mt-2">
                      <li>
                        Elaboração e submissão de declarações aduaneiras
                        no sistema da Janela Única Eletrónica
                      </li>
                      <li>
                        Classificação correta das mercadorias de acordo
                        com o Código da Pauta Aduaneira
                      </li>
                      <li>
                        Cálculo e pagamento de impostos e taxas, incluindo
                        direitos aduaneiros, IVA e outras imposições
                      </li>
                      <li>
                        Garantia do cumprimento da legislação aduaneira e
                        comercial vigente
                      </li>
                      <li>
                        Acompanhamento de inspeções e resposta a
                        notificações das autoridades aduaneiras
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      4.3. Serviços de Carga Local
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      O termo carga local refere-se ao transporte de
                      mercadorias dentro da mesma cidade ou região, sem
                      deslocamento provincial ou internacional.
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed mt-2">
                      Características principais deste tipo de serviço:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-1 mt-2">
                      <li>
                        Distâncias curtas, reduzindo o tempo de
                        deslocamento
                      </li>
                      <li>Entregas rápidas, com maior eficiência</li>
                      <li>Menores custos logísticos</li>
                      <li>Redução do desgaste dos veículos</li>
                      <li>
                        Facturamento ágil e ideal para operações de curta
                        duração
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      4.4. Serviço de Carga Nacional
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      O serviço de carga nacional refere-se ao transporte
                      de mercadorias dentro do território de um mesmo
                      país, sem cruzar fronteiras internacionais.
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed mt-2">
                      Principais vantagens:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-1 mt-2">
                      <li>Menor complexidade aduaneira</li>
                      <li>Agilidade no processo de entrega</li>
                      <li>Suporte técnico mais rápido e acessível</li>
                      <li>
                        Facilidade no rastreamento e controle das cargas
                      </li>
                      <li>Redução dos custos operacionais</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      4.5. Serviço de Cargas em Trânsito
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      A carga em trânsito diz respeito a mercadorias que
                      já saíram do ponto de origem, mas ainda não chegaram
                      ao destino final. Essas cargas circulam entre
                      fronteiras ou estão em deslocamento entre diferentes
                      regiões.
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed mt-2">
                      Características e observações:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-1 mt-2">
                      <li>Cargas em deslocamento contínuo</li>
                      <li>Exigem acompanhamento logístico ativo</li>
                      <li>
                        Necessitam de documentação fiscal apropriada
                      </li>
                      <li>Geralmente são cargas seguradas</li>
                      <li>
                        Estão sujeitas a riscos como desvios, roubos e
                        acidentes
                      </li>
                    </ul>
                    <p className="text-gray-700 text-sm leading-relaxed mt-2">
                      <strong>Destinos mais comuns:</strong> Zimbabwe,
                      Malawi, Zâmbia e República Democrática do Congo
                      (RDC).
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      4.6. Serviço de Carga de Retorno
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      O serviço de carga de retorno ocorre quando um
                      camião que completou sua entrega deseja regressar ao
                      ponto de origem transportando outra carga, a fim de
                      evitar o retorno vazio.
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed mt-2">
                      Vantagens do serviço:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-1 mt-2">
                      <li>
                        Redução dos custos operacionais da viagem de
                        retorno
                      </li>
                      <li>Aumento da rentabilidade por viagem</li>
                      <li>
                        Diminuição do consumo de combustível sem carga
                      </li>
                      <li>Redução do tempo e custos com pessoal</li>
                      <li>Redução de custos logísticos</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      4.7. Serviço de Carga com Pagamento em 30 Dias
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Este tipo de serviço refere-se a contratos em que o
                      pagamento é efetuado após 30 dias da emissão da
                      fatura ou da conclusão da entrega do serviço ou
                      produto. É uma prática comum em relações comerciais
                      com empresas de grande porte ou com contratos de
                      longo prazo.
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed mt-2">
                      Principais benefícios:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-1 mt-2">
                      <li>
                        Aceitação por grandes empresas e instituições
                      </li>
                      <li>Trabalho contínuo e estável</li>
                      <li>
                        Aumento da credibilidade e confiança no mercado
                      </li>
                      <li>Melhor planeamento financeiro</li>
                      <li>
                        Menor concorrência devido aos critérios exigentes
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      4.8. Serviços de GPS
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Os serviços de GPS consistem num conjunto de
                      tecnologias que permitem localizar com precisão
                      qualquer objeto em tempo real, sendo essenciais no
                      setor de logística para rastreamento de viaturas e
                      cargas.
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed mt-2">
                      Aplicações e benefícios:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-1 mt-2">
                      <li>Precisão na localização geográfica</li>
                      <li>
                        Atendimento a emergências e segurança da carga
                      </li>
                      <li>
                        Facilidade de navegação e planejamento de rotas
                      </li>
                      <li>Maior eficiência nas operações logísticas</li>
                      <li>Redução de desvios e roubos</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      4.9. Serviços de Abastecimento (Diesel)
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Os serviços de abastecimento envolvem acordos
                      diretos com postos de combustível, permitindo o
                      abastecimento via pagamento à vista (cash) ou a
                      crédito, com a possibilidade de obter ganhos por
                      litro abastecido.
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed mt-2">
                      Vantagens:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-1 mt-2">
                      <li>
                        Confiança e fidelização dos clientes no
                        abastecimento
                      </li>
                      <li>
                        Geração de receita contínua através da margem por
                        litro
                      </li>
                      <li>
                        Parcerias estratégicas com postos de combustível
                      </li>
                      <li>
                        Controle de preços e previsibilidade de custos
                      </li>
                      <li>
                        Eficiência e agilidade nas operações logísticas
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      4.10. Serviços Terceirizados
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Os serviços terceirizados são integrados para suprir
                      necessidades específicas dos clientes que não são
                      diretamente fornecidas pela empresa de logística.
                      Esses serviços complementares são essenciais para
                      garantir a eficiência e a totalidade da cadeia
                      logística.
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed mt-2">
                      Serviços disponíveis por meio de parcerias:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-1">
                        <li>Serviços de estiva</li>
                        <li>Serviços de segurança</li>
                        <li>Serviços de seguro</li>
                        <li>Serviços de vistoria</li>
                        <li>Serviços de comercialização</li>
                        <li>Serviços de manuseamento</li>
                      </ul>
                      <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-1">
                        <li>Venda de produtos líquidos</li>
                        <li>Materiais de construção civil</li>
                        <li>Aluguel de equipamentos</li>
                        <li>Áreas de parqueamento</li>
                        <li>Contentores frigoríficos</li>
                        <li>Balances certificadas</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      5. Serviço Digital
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Inovação no mercado moçambicano, permitindo gestão
                      total de serviços logísticos em uma plataforma
                      digital intuitiva e eficiente.
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      6. Visitas aos Clientes
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      São essenciais para estreitar relações, apresentar
                      serviços, entender necessidades e negociar
                      diretamente.
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      7. Inspeção das Empresas (Clientes)
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Para avalia o funcionamento logístico, formas de
                      pagamento e problemas recorrentes, garantindo
                      soluções preventivas.
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      8. Cadastro de Empresas
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Empresas parceiras deverão fornecer informações
                      operacionais, assinar contratos e indicar
                      representantes para garantir a conformidade e
                      padronização dos serviços.
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      9. Cadastro de Transportadoras
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      O cadastro de empresa de transporte terá um grande
                      avanço na qualidade de serviço de transporte, onde
                      será feita uma visita e inspeção aos parques e
                      documentação, avaliando viaturas para serviços:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-1">
                        <li>Chante;</li>
                        <li>Nacional;</li>
                        <li>Em trânsito.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      10. Cadastro de Motoristas
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      É um novo começo para os motoristas, será criada uma
                      plataforma de cadastro onde cada motorista será
                      avaliado com base no seu desempenho. O objetivo é
                      garantir maior qualidade nos serviços de transporte.
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Cada motorista terá um sistema de pontuação
                      individual, que refletirá o seu desempenho. A
                      pontuação poderá diminuir em caso de má conduta ou
                      falhas no serviço. Quando a pontuação atingir o
                      limite mínimo, o motorista deixará de se beneficiar
                      das vantagens oferecidas pela empresa de logística
                      por um período que poderá variar entre um à dois
                      anos.
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      11. Modelo de Pagamento
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      O Pagamento será feito apenas transferência
                      bancária, assegurando pagamentos diretos e evitando
                      erros e comissionamentos indevidos.
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      12. Celebração de Contrato
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      A celebração de contratado será obrigatória para
                      qualquer serviço prestado, garantindo segurança e
                      prevenção de prejuízos.
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      13. Divisão de Classe dos Transportadores
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      A divisão das transportadoras tem como objetivo
                      identificar a quantidade de camiões disponíveis em
                      cada empresa e avaliar o seu estado operacional,
                      organizando-as nas seguintes classes:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-2 mt-4">
                      <li>
                        <strong>Classe 1:</strong> de 1 a 3 camiões –
                        aptos para percursos até 120 km;
                      </li>
                      <li>
                        <strong>Classe 2:</strong> de 4 a 10 camiões –
                        aptos para operações nacionais e para 1 país da
                        região Interland;
                      </li>
                      <li>
                        <strong>Classe 3:</strong> Classe 3: acima de 11
                        camiões – aptos para operações nacionais e até 2
                        países da região Interland.
                      </li>
                    </ul>
                    <br />
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      Benefícios:
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-1">
                        <li>
                          Cumprimento rigoroso dos prazos de entrega;
                        </li>
                        <li>
                          Maior satisfação e fidelização dos clientes;
                        </li>
                        <li>
                          Reforço da segurança em todas as etapas da
                          operação;
                        </li>
                        <li>
                          Otimização de tempo e redução de custos
                          operacionais;
                        </li>
                        <li>
                          Aumento da produtividade e eficiência logística;
                        </li>
                        <li>
                          Fortalecimento da confiança nos serviços
                          prestados;
                        </li>
                        <li>
                          Garantia da plena satisfação do cliente final.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      14. Disponibilidade de Carga
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      A disponibilidade de carga no sistema abrange os
                      serviços de chante, transporte nacional e em
                      trânsito. Trata-se de cargas previamente
                      selecionadas e seguras. O cliente é responsável por
                      fornecer todas as informações sobre o estado da
                      carga e a documentação necessária, assegurando que
                      não haja riscos ou problemas para o transportador.
                      Após a validação, a carga será disponibilizada na
                      plataforma, ficando acessível para qualquer
                      transportadora cadastrada na empresa de logística.
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      15. Viatura Selecionada para Cada Serviço
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Atribuição automática de camião apropriado ao tipo
                      de carga, com viatura previamente inspecionada. Isso
                      significa que os riscos de avarias, roubos e atrasos
                      na entrega são minimizados, garantindo a eficiência
                      do serviço logístico.
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      16. Cargas Monitoradas (GPS)
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      A Carga Monitorada é um serviço disponibilizado ao
                      cliente para garantir maior controlo e segurança no
                      transporte das suas mercadorias. Através deste
                      serviço, o cliente poderá acompanhar em tempo real o
                      trajeto do veículo que transporta a sua carga.
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Além do rastreamento, o sistema também disponibiliza
                      cadeado de segurança (GPS), emitindo alertas
                      imediatos em caso de tentativa de arrombamento,
                      oferecendo assim uma camada adicional de proteção.
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      17. Pontuação de Motoristas
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Cada infração cometida pelo motorista reduzirá os
                      seus pontos, as infrações incluem:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-1">
                        <li>
                          Má apresentação ao cliente – A imagem do
                          motorista deve refletir profissionalismo e
                          respeito ao cliente e as apresentações
                          inadequadas poderão impactar negativamente sua
                          pontuação.
                        </li>
                        <li>
                          Acidentes e má condução – Condução imprudente ou
                          envolvimento em acidentes compromete a segurança
                          da carga e será penalizado no sistema de
                          pontuação.
                        </li>
                        <li>
                          Consumo de álcool ou substâncias ilícitas – É
                          expressamente proibido conduzir sob o efeito de
                          álcool ou drogas e as violações destas regras
                          resultam em penalizações severas ou desligamento
                          imediato.
                        </li>
                        <li>
                          Transporte de passageiros não autorizados – É
                          proibido transportar passageiros durante o
                          serviço, salvo autorização expressa da empresa.{" "}
                        </li>
                        <li>
                          Roubo ou desvio de combustível (diesel) –
                          Qualquer indício de roubo de combustível será
                          tratado como falta grave, sujeito a sanções
                          legais e exclusão do serviço.
                        </li>
                      </ul>
                      <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-1">
                        <li>
                          Atrasos na entrega da carga – Atrasos sem
                          justificativa válida afetam a confiança do
                          cliente e serão refletidos negativamente na
                          pontuação do motorista.
                        </li>
                        <li>
                          Paragens excessivas sem motivo justificável –
                          Paragens frequentes e não autorizadas indicam má
                          gestão do tempo e podem comprometer a segurança
                          da carga.{" "}
                        </li>
                        <li>
                          Informação incorreta sobre o serviço –
                          Relatórios ou comunicações com dados incorretos
                          prejudicam o controlo da operação e serão
                          penalizados.
                        </li>
                        <li>
                          Falta de comunicação sobre o serviço – O
                          motorista deve manter a empresa sempre informada
                          sobre o andamento do serviço e as omissões
                          destas informações serão tratadas como falhas de
                          desempenho.
                        </li>
                        <li>
                          Roubo de carga – Em caso de roubo de carga com
                          indícios de negligência ou cumplicidade, o
                          motorista será imediatamente desligado e não
                          prestará mais serviços à empresa.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      18. Falta de Cumprimento
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Cada infração cometida pelo motorista reduzirá os
                      seus pontos, as infrações incluem:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-1">
                        <li>
                          Incumprimento de Acordos Contratuais – No caso
                          de qualquer cliente ou parceiro descumprir os
                          termos acordados em contrato, a empresa
                          responsável deverá assumir integralmente os
                          prejuízos causados à outra parte envolvida.
                        </li>
                        <li>
                          Falhas no Carregamento – Em situações de não
                          cumprimento no processo de carregamento, o
                          transportador será responsabilizado pelos danos
                          ou prejuízos causados à empresa contratante.
                          Além disso, poderá ser aplicada uma multa
                          administrativa, lançada no sistema, cujo valor
                          será determinado conforme a gravidade da
                          infração.
                        </li>
                      </ul>
                      <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-1">
                        <li>
                          Alterações ou Cancelamentos – Caso haja qualquer
                          alteração ou impossibilidade de realizar o
                          carregamento, o transportador deve reportar
                          previamente, por e-mail, o motivo da alteração.
                          Isso é essencial para evitar penalizações por
                          atrasos ou cobranças indevidas relacionadas a
                          demoras.{" "}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      19. Benefícios Exclusivos da Plataforma de Logística
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      A empresa de logística oferece uma série de
                      benefícios aos transportadores cadastrados,
                      promovendo igualdade, segurança e eficiência nas
                      operações. Entre os principais destacam-se:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-1">
                        <li>
                          Distribuição equilibrada de cargas – As
                          oportunidades de transporte serão distribuídas
                          de forma justa entre os transportadores.
                        </li>
                        <li>
                          Cargas seguras e rastreáveis – Todas as cargas
                          são monitoradas em tempo real, garantindo
                          segurança e visibilidade total ao longo do
                          trajeto.{" "}
                        </li>
                        <li>
                          Cargas de retorno conforme preferência – O
                          transportador poderá escolher as cargas de
                          retorno de acordo com sua rota ou conveniência.{" "}
                        </li>
                      </ul>
                      <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed space-y-1">
                        <li>
                          Rapidez no serviço – A empresa assegura
                          agilidade no processo de carregamento e entrega,
                          proporcionando maior produtividade.{" "}
                        </li>
                        <li>
                          Pagamentos diversificados – Serão
                          disponibilizadas diferentes modalidades de
                          pagamento, facilitando a gestão financeira do
                          transportador.
                        </li>
                        <li>
                          Abastecimento com condições especiais – No
                          futuro, haverá parcerias para garantir
                          combustível imediato, contribuindo para a saída
                          rápida dos camiões e redução de custos
                          operacionais.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
           {/* Tabelas de Fretes */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              TABELAS DE FRETES E COMISSÕES
            </h3>

            {/* Tabela 1: Percurso Beira - Interland */}
            <div className="mb-8">
              <h4 className="text-md font-semibold text-gray-800 mb-3 bg-gray-100 p-3 rounded-lg">
                Percurso: Beira – Interland (Ida ou Retorno) - (Frete de Ida + Frete de Volta) × % da Logística
              </h4>
              <h5 className="text-sm font-semibold text-gray-700 mb-2 ml-2">
                a) Pagamento a pronto (cash)
              </h5>
              <div className="overflow-x-auto text-gray-700">
                <table className="min-w-full bg-white border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2 text-left">Declino</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Distância (Km)</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Tipo de pagamento</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Frete de Ida</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Frete de Volta</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">% da logística</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Cálculo da comissão</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Malawi - Lidongwe</td>
                      <td className="border border-gray-300 px-3 py-2">1033 Km</td>
                      <td className="border border-gray-300 px-3 py-2">Cash</td>
                      <td className="border border-gray-300 px-3 py-2">2 600 USD</td>
                      <td className="border border-gray-300 px-3 py-2">300 USD</td>
                      <td className="border border-gray-300 px-3 py-2">5%</td>
                      <td className="border border-gray-300 px-3 py-2">145 USD</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">Malawi - Zalewa</td>
                      <td className="border border-gray-300 px-3 py-2">778 Km</td>
                      <td className="border border-gray-300 px-3 py-2">Cash</td>
                      <td className="border border-gray-300 px-3 py-2">2 400 USD</td>
                      <td className="border border-gray-300 px-3 py-2">300 USD</td>
                      <td className="border border-gray-300 px-3 py-2">5%</td>
                      <td className="border border-gray-300 px-3 py-2">135 USD</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Malawi - Biontyre</td>
                      <td className="border border-gray-300 px-3 py-2">830 Km</td>
                      <td className="border border-gray-300 px-3 py-2">Cash</td>
                      <td className="border border-gray-300 px-3 py-2">2 400 USD</td>
                      <td className="border border-gray-300 px-3 py-2">300 USD</td>
                      <td className="border border-gray-300 px-3 py-2">5%</td>
                      <td className="border border-gray-300 px-3 py-2">135 USD</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">Zimbabwe - Haare</td>
                      <td className="border border-gray-300 px-3 py-2">556 Km</td>
                      <td className="border border-gray-300 px-3 py-2">Cash</td>
                      <td className="border border-gray-300 px-3 py-2">1 900 USD</td>
                      <td className="border border-gray-300 px-3 py-2">300 USD</td>
                      <td className="border border-gray-300 px-3 py-2">5%</td>
                      <td className="border border-gray-300 px-3 py-2">110 USD</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Zimbabwe - Mutare</td>
                      <td className="border border-gray-300 px-3 py-2">293 Km</td>
                      <td className="border border-gray-300 px-3 py-2">Cash</td>
                      <td className="border border-gray-300 px-3 py-2">1 300 USD</td>
                      <td className="border border-gray-300 px-3 py-2">300 USD</td>
                      <td className="border border-gray-300 px-3 py-2">5%</td>
                      <td className="border border-gray-300 px-3 py-2">80 USD</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">Zambia - Lusaka</td>
                      <td className="border border-gray-300 px-3 py-2">1417 Km</td>
                      <td className="border border-gray-300 px-3 py-2">Cash</td>
                      <td className="border border-gray-300 px-3 py-2">3 900 USD</td>
                      <td className="border border-gray-300 px-3 py-2">300 USD</td>
                      <td className="border border-gray-300 px-3 py-2">5%</td>
                      <td className="border border-gray-300 px-3 py-2">210 USD</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Zambia - Kitwe</td>
                      <td className="border border-gray-300 px-3 py-2">1771 Km</td>
                      <td className="border border-gray-300 px-3 py-2">Cash</td>
                      <td className="border border-gray-300 px-3 py-2">4 700 USD</td>
                      <td className="border border-gray-300 px-3 py-2">400 USD</td>
                      <td className="border border-gray-300 px-3 py-2">5%</td>
                      <td className="border border-gray-300 px-3 py-2">255 USD</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">Zambia - Chipoto</td>
                      <td className="border border-gray-300 px-3 py-2">980 Km</td>
                      <td className="border border-gray-300 px-3 py-2">Cash</td>
                      <td className="border border-gray-300 px-3 py-2">2 700 USD</td>
                      <td className="border border-gray-300 px-3 py-2">300 USD</td>
                      <td className="border border-gray-300 px-3 py-2">5%</td>
                      <td className="border border-gray-300 px-3 py-2">150 USD</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Zambia - Ndala</td>
                      <td className="border border-gray-300 px-3 py-2">1562 Km</td>
                      <td className="border border-gray-300 px-3 py-2">Cash</td>
                      <td className="border border-gray-300 px-3 py-2">4 300 USD</td>
                      <td className="border border-gray-300 px-3 py-2">4 000 USD</td>
                      <td className="border border-gray-300 px-3 py-2">5%</td>
                      <td className="border border-gray-300 px-3 py-2">235 USD</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">RDC - Linbuboche</td>
                      <td className="border border-gray-300 px-3 py-2">1938 Km</td>
                      <td className="border border-gray-300 px-3 py-2">Cash</td>
                      <td className="border border-gray-300 px-3 py-2">12 000 USD</td>
                      <td className="border border-gray-300 px-3 py-2">1 000 USD</td>
                      <td className="border border-gray-300 px-3 py-2">5%</td>
                      <td className="border border-gray-300 px-3 py-2">550 USD</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">RDC - Likosi</td>
                      <td className="border border-gray-300 px-3 py-2">2138 Km</td>
                      <td className="border border-gray-300 px-3 py-2">Cash</td>
                      <td className="border border-gray-300 px-3 py-2">13 000 USD</td>
                      <td className="border border-gray-300 px-3 py-2">1 000 USD</td>
                      <td className="border border-gray-300 px-3 py-2">5%</td>
                      <td className="border border-gray-300 px-3 py-2">700 USD</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tabela 2: Cargas Locais */}
            <div className="mb-8">
              <h4 className="text-md font-semibold text-gray-800 mb-3 bg-gray-100 p-3 rounded-lg">
                Tabela de Fretes Locais (Moeda: MZN) - Fórmula: (Frete de Ida + Frete de Volta) × % da Logística
              </h4>
              <div className="overflow-x-auto text-gray-700">
                <table className="min-w-full bg-white border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2 text-left">Destino</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Distância (Km)</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Frete de Ida</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Frete de Volta</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Contentor Vazio</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">% da Logística</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Cálculo da Comissão</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Manhava</td>
                      <td className="border border-gray-300 px-3 py-2">5 km</td>
                      <td className="border border-gray-300 px-3 py-2">12 000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">2 000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">7 500 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">10%</td>
                      <td className="border border-gray-300 px-3 py-2">1 400 MZN</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">Baixa</td>
                      <td className="border border-gray-300 px-3 py-2">10 km</td>
                      <td className="border border-gray-300 px-3 py-2">15 000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">2 000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">9 000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">10%</td>
                      <td className="border border-gray-300 px-3 py-2">1 700 MZN</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Manga</td>
                      <td className="border border-gray-300 px-3 py-2">10 km</td>
                      <td className="border border-gray-300 px-3 py-2">15 000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">2 000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">9 000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">10%</td>
                      <td className="border border-gray-300 px-3 py-2">1 700 MZN</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">Dondo</td>
                      <td className="border border-gray-300 px-3 py-2">40 km</td>
                      <td className="border border-gray-300 px-3 py-2">20 000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">3 000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">12 000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">10%</td>
                      <td className="border border-gray-300 px-3 py-2">2 300 MZN</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Niarmatanda</td>
                      <td className="border border-gray-300 px-3 py-2">80 km</td>
                      <td className="border border-gray-300 px-3 py-2">25 000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">5 000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">18 000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">10%</td>
                      <td className="border border-gray-300 px-3 py-2">3 000 MZN</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">Inchope</td>
                      <td className="border border-gray-300 px-3 py-2">120 km</td>
                      <td className="border border-gray-300 px-3 py-2">30 000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">5 000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">25 000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">10%</td>
                      <td className="border border-gray-300 px-3 py-2">3 500 MZN</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tabela 3: Nacional */}
            <div className="mb-8">
              <h4 className="text-md font-semibold text-gray-800 mb-3 bg-gray-100 p-3 rounded-lg">
                Percurso: Nacional - Fórmula: (Frete de Ida + Frete de Volta) × % da Logística = Comissão
              </h4>
              <h5 className="text-sm font-semibold text-gray-700 mb-2 ml-2">
                a) Pagamento a pronto (cash)
              </h5>
              <div className="overflow-x-auto text-gray-700">
                <table className="min-w-full bg-white border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2 text-left">Destino</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Distância (Km)</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Tipo de Pagamento</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Frete de Ida</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Frete de Volta</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">% da Logística</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Cálculo da Comissão</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Maputo</td>
                      <td className="border border-gray-300 px-3 py-2">1,200 Km</td>
                      <td className="border border-gray-300 px-3 py-2">Cash</td>
                      <td className="border border-gray-300 px-3 py-2">45,000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">15,000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">10%</td>
                      <td className="border border-gray-300 px-3 py-2">6,000 MZN</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">Beira</td>
                      <td className="border border-gray-300 px-3 py-2">600 Km</td>
                      <td className="border border-gray-300 px-3 py-2">Cash</td>
                      <td className="border border-gray-300 px-3 py-2">120,000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">30.000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">10%</td>
                      <td className="border border-gray-300 px-3 py-2">15.000 MZN</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Nampula</td>
                      <td className="border border-gray-300 px-3 py-2">1,800 Km</td>
                      <td className="border border-gray-300 px-3 py-2">Cash</td>
                      <td className="border border-gray-300 px-3 py-2">60,000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">20,000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">10%</td>
                      <td className="border border-gray-300 px-3 py-2">8,000 MZN</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">Tete</td>
                      <td className="border border-gray-300 px-3 py-2">600 Km</td>
                      <td className="border border-gray-300 px-3 py-2">Cash</td>
                      <td className="border border-gray-300 px-3 py-2">120,000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">30.000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">10%</td>
                      <td className="border border-gray-300 px-3 py-2">15.000 MZN</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Quelimane</td>
                      <td className="border border-gray-300 px-3 py-2">1,000 Km</td>
                      <td className="border border-gray-300 px-3 py-2">Cash</td>
                      <td className="border border-gray-300 px-3 py-2">35,000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">12,000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">10%</td>
                      <td className="border border-gray-300 px-3 py-2">4,700 MZN</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">Lichinga</td>
                      <td className="border border-gray-300 px-3 py-2">2,100 Km</td>
                      <td className="border border-gray-300 px-3 py-2">Cash</td>
                      <td className="border border-gray-300 px-3 py-2">75,000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">25,000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">10%</td>
                      <td className="border border-gray-300 px-3 py-2">10,000 MZN</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Pemba</td>
                      <td className="border border-gray-300 px-3 py-2">2,300 Km</td>
                      <td className="border border-gray-300 px-3 py-2">Cash</td>
                      <td className="border border-gray-300 px-3 py-2">80,000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">28,000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">10%</td>
                      <td className="border border-gray-300 px-3 py-2">10,800 MZN</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">Chimoio</td>
                      <td className="border border-gray-300 px-3 py-2">200 Km</td>
                      <td className="border border-gray-300 px-3 py-2">Cash</td>
                      <td className="border border-gray-300 px-3 py-2">15,000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">5,000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">10%</td>
                      <td className="border border-gray-300 px-3 py-2">2,000 MZN</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Inhambane</td>
                      <td className="border border-gray-300 px-3 py-2">500 Km</td>
                      <td className="border border-gray-300 px-3 py-2">Cash</td>
                      <td className="border border-gray-300 px-3 py-2">22,000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">7,000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">10%</td>
                      <td className="border border-gray-300 px-3 py-2">2,900 MZN</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">Xai-Xai</td>
                      <td className="border border-gray-300 px-3 py-2">800 Km</td>
                      <td className="border border-gray-300 px-3 py-2">Cash</td>
                      <td className="border border-gray-300 px-3 py-2">30,000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">10,000 MZN</td>
                      <td className="border border-gray-300 px-3 py-2">10%</td>
                      <td className="border border-gray-300 px-3 py-2">4,000 MZN</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Continuação do conteúdo... */}
          {/* (O restante do conteúdo foi mantido igual ao código fornecido) */}
        </div>
      </div>
    </div>
  );
};

export default MemoriaDescritiva;