"use client"
import React, { useState } from 'react';
import MenuSuperior from '../../components/MenuSuperior/page';

function PoliticasPrivacidade() {
  const [politicaAtiva, setPoliticaAtiva] = useState('privacidade-dados');

  // Função para renderizar o conteúdo baseado na política ativa
  const renderConteudo = () => {
    switch(politicaAtiva) {
      case 'privacidade-dados':
        return renderPrivacidadeDados();
      case 'acesso-permissoes':
        return renderAcessoPermissoes();
      case 'resposta-incidentes':
        return renderRespostaIncidentes();
      case 'retencao-eliminacao':
        return renderRetencaoEliminacao();
      case 'seguranca-informacao':
        return renderSegurancaInformacao();
      case 'uso-aceitavel':
        return renderUsoAceitavel();
      default:
        return renderPrivacidadeDados();
    }
  };

  const renderPrivacidadeDados = () => (
    <>
      <header className="politicas-header">
        <h1>POLÍTICA DE PRIVACIDADE E PROTEÇÃO DE DADOS</h1>
        <p className="data-atualizacao">Última atualização: {new Date().toLocaleDateString('pt-PT')}</p>
      </header>

      <main className="politicas-conteudo">
        <section className="secao">
          <h2>1.1. Princípios Fundamentais</h2>
          <p>Nossa organização adopta princípios sólidos para garantir que o tratamento de dados pessoais seja seguro, transparente e em conformidade com a legislação vigente:</p>
          
          <div className="lista-principios">
            <div className="principio-item">
              <h3>• Legalidade</h3>
              <p>Todos os dados colectados são processados apenas para finalidades legítimas e específicas, em conformidade com as leis aplicáveis, como a protecção de dados pessoais e regulamentos de transporte.</p>
            </div>
            
            <div className="principio-item">
              <h3>• Minimização</h3>
              <p>Colectamos apenas os dados essenciais para cumprir nossas finalidades, evitando a colecta excessiva ou desnecessária.</p>
            </div>
            
            <div className="principio-item">
              <h3>• Transparência</h3>
              <p>Garantimos que todos os titulares de dados recebam informações claras sobre quais dados são colectados, como são utilizados, por quanto tempo são armazenados e com quem podem ser compartilhados.</p>
            </div>
            
            <div className="principio-item">
              <h3>• Finalidade</h3>
              <p>Os dados colectados são utilizados exclusivamente para os fins previamente informados, como fiscalização, gestão de transporte ou cumprimento de obrigações legais.</p>
            </div>
            
            <div className="principio-item">
              <h3>• Exactidão</h3>
              <p>Mantemos os dados actualizados e precisos, permitindo que os titulares solicitem correcções sempre que necessário.</p>
            </div>
            
            <div className="principio-item">
              <h3>• Armazenamento limitado</h3>
              <p>Os dados são mantidos apenas pelo tempo necessário para cumprir a finalidade da colecta ou para atender obrigações legais.</p>
            </div>
            
            <div className="principio-item">
              <h3>• Integridade e confidencialidade</h3>
              <p>Implementamos medidas técnicas e organizacionais adequadas para proteger os dados contra acesso não autorizado, perda, alteração ou divulgação indevida.</p>
            </div>
          </div>
        </section>

        <section className="secao">
          <h2>1.2. Categorias de Dados Colectados</h2>
          
          <div className="categoria-dados">
            <h3>1.2.1. Dados Pessoais de Motoristas</h3>
            <p>Colectamos informações essenciais para identificar, verificar a aptidão e garantir a segurança dos motoristas:</p>
            <ul className="lista-dados">
              <li>Nome completo, data de nascimento, nacionalidade</li>
              <li>Número de BI/Passaporte e validade</li>
              <li>Número de carta de condução e categorias</li>
              <li>Contactos (telefone, email)</li>
              <li>Endereço residencial</li>
              <li>Dados bancários para pagamentos</li>
              <li>Fotografias</li>
              <li>Dados de saúde (tipo sanguíneo, restrições médicas)</li>
            </ul>
            <div className="justificativa">
              <strong>Justificativa:</strong> Esses dados são necessários para validar a identidade e aptidão do motorista, garantir conformidade com normas legais e facilitar comunicação e pagamento seguro.
            </div>
          </div>
          
          <div className="categoria-dados">
            <h3>1.2.2. Dados de Veículos</h3>
            <p>Colectamos informações sobre os veículos utilizados para transporte de cargas, garantindo conformidade técnica e segurança:</p>
            <ul className="lista-dados">
              <li>Matrícula, marca, modelo</li>
              <li>Especificações técnicas do veículo</li>
              <li>Histórico de manutenção e inspecções</li>
              <li>Categoria de inspecção obrigatória</li>
              <li>Dados de localização via GPS</li>
            </ul>
            <div className="justificativa">
              <strong>Justificativa:</strong> Essas informações permitem validar a conformidade técnica do veículo, monitorar sua operação e manter padrões de segurança rodoviária.
            </div>
          </div>
          
          <div className="categoria-dados">
            <h3>1.2.3. Dados de Cargas</h3>
            <p>Registramos informações detalhadas sobre cada carga para fiscalização e logística:</p>
            <ul className="lista-dados">
              <li>Descrição e características da carga</li>
              <li>Valor da mercadoria</li>
              <li>Origem e destino da carga</li>
              <li>Informações do cliente/embaraçador</li>
            </ul>
            <div className="justificativa">
              <strong>Justificativa:</strong> Esses dados são necessários para controle aduaneiro, planeamento logístico e monitoramento seguro das operações de transporte.
            </div>
          </div>
        </section>

        <section className="secao">
          <h2>1.3. Finalidades do Processamento</h2>
          <p>Os dados colectados são utilizados para diversas finalidades operacionais e legais, incluindo:</p>
          <ul className="lista-finalidades">
            <li>Validação de documentos para fiscalização</li>
            <li>Cálculo de fretes, seguros e remunerações</li>
            <li>Monitoramento da segurança rodoviária e cumprimento de normas de trânsito</li>
            <li>Garantia de conformidade com regulamentações NB1/NB2</li>
            <li>Gestão operacional das transportadoras</li>
            <li>Elaboração de estatísticas para planeamento sectorial e melhoria de processos</li>
          </ul>
        </section>

        <section className="secao">
          <h2>1.4. Compartilhamento de Dados</h2>
          
          <div className="compartilhamento">
            <h3>1.4.1. Entidades Autorizadas</h3>
            <p>Os dados podem ser compartilhados com autoridades públicas apenas quando necessário, respeitando o princípio da necessidade:</p>
            <ul className="lista-entidades">
              <li><strong>Polícias de Trânsito:</strong> Acesso restrito a dados relevantes para fiscalização de trânsito e segurança rodoviária</li>
              <li><strong>Alfândegas:</strong> Acesso limitado a informações necessárias para controle aduaneiro e fiscalização de mercadorias</li>
              <li><strong>Fiscais:</strong> Acesso restrito a dados para fiscalização tributária e cumprimento de obrigações legais</li>
              <li><strong>Municípios:</strong> Acesso a informações relevantes para licenciamento e regulamentação municipal</li>
            </ul>
          </div>
          
          <div className="compartilhamento">
            <h3>1.4.2. Princípios de Compartilhamento</h3>
            <ul className="lista-principios-compartilhamento">
              <li>
                <strong>• Necessidade:</strong> Compartilhamos apenas os dados estritamente necessários para a finalidade específica
              </li>
              <li>
                <strong>• Proporcionalidade:</strong> Garantimos que os dados compartilhados sejam proporcionais ao objectivo da solicitação
              </li>
              <li>
                <strong>• Segurança:</strong> Todos os dados são transmitidos por canais seguros, protegendo contra acesso não autorizado
              </li>
              <li>
                <strong>• Registro:</strong> Mantemos registro detalhado de todas as transferências de dados para auditoria e conformidade
              </li>
            </ul>
          </div>
        </section>

        <section className="secao">
          <h2>1.5. Direitos dos Titulares</h2>
          <p>Os titulares de dados têm direitos garantidos por lei, que podem ser exercidos mediante solicitação:</p>
          <div className="grid-direitos">
            <div className="direito-card">
              <h3>• Direito de acesso</h3>
              <p>Solicitar acesso completo aos seus dados pessoais</p>
            </div>
            <div className="direito-card">
              <h3>• Direito de rectificação</h3>
              <p>Corrigir dados incorrectos ou desactualizados</p>
            </div>
            <div className="direito-card">
              <h3>• Direito de eliminação</h3>
              <p>Solicitar a exclusão de dados quando aplicável</p>
            </div>
            <div className="direito-card">
              <h3>• Direito de oposição</h3>
              <p>Opor-se ao tratamento de dados em determinadas circunstâncias</p>
            </div>
            <div className="direito-card">
              <h3>• Direito à portabilidade</h3>
              <p>Receber seus dados em formato estruturado e reutilizável</p>
            </div>
            <div className="direito-card">
              <h3>• Direito de limitação</h3>
              <p>Limitar temporariamente o tratamento de seus dados em situações específicas</p>
            </div>
          </div>
        </section>

        <section className="secao">
          <h2>1.6. Bases Legais para Processamento</h2>
          <p>O tratamento de dados é fundamentado em bases legais reconhecidas:</p>
          <ul className="lista-bases-legais">
            <li>
              <strong>• Consentimento:</strong> Para dados adicionais que não sejam estritamente necessários
            </li>
            <li>
              <strong>• Execução de contracto:</strong> Para dados essenciais à prestação de serviços de transporte
            </li>
            <li>
              <strong>• Obrigação legal:</strong> Para dados exigidos por leis ou regulamentos aplicáveis
            </li>
            <li>
              <strong>• Interesse público:</strong> Para dados processados por autoridades públicas em cumprimento de suas funções
            </li>
            <li>
              <strong>• Interesses legítimos:</strong> Para dados necessários à segurança rodoviária e operação logística segura
            </li>
          </ul>
        </section>
      </main>
    </>
  );

  const renderAcessoPermissoes = () => (
    <>
      <header className="politicas-header">
        <h1>POLÍTICA DE ACESSO E CONTROLE DE PERMISSÕES</h1>
        <p className="data-atualizacao">Última atualização: {new Date().toLocaleDateString('pt-PT')}</p>
      </header>

      <main className="politicas-conteudo">
        <section className="secao">
          <h2>1. Objetivo</h2>
          <p>Estabelecer diretrizes para controle de acesso aos sistemas, aplicações e dados da empresa, garantindo que apenas pessoas autorizadas tenham acesso adequado conforme suas responsabilidades.</p>
        </section>

        <section className="secao">
          <h2>2. Princípios Fundamentais</h2>
          <div className="lista-principios">
            <div className="principio-item">
              <h3>• Princípio do Menor Privilégio</h3>
              <p>Os usuários recebem apenas os acessos necessários para realizar suas funções específicas.</p>
            </div>
            <div className="principio-item">
              <h3>• Segregação de Funções</h3>
              <p>Separação de responsabilidades para prevenir conflitos de interesse e fraudes.</p>
            </div>
            <div className="principio-item">
              <h3>• Responsabilidade Individual</h3>
              <p>Cada usuário é responsável pelo uso adequado de suas credenciais e acessos.</p>
            </div>
            <div className="principio-item">
              <h3>• Revisão Periódica</h3>
              <p>Os acessos são revisados regularmente para garantir sua adequação.</p>
            </div>
          </div>
        </section>

        <section className="secao">
          <h2>3. Procedimentos de Controle de Acesso</h2>
          <ul className="lista-finalidades">
            <li>Solicitação formal de acesso via sistema de tickets</li>
            <li>Aprovação pelo gestor imediato e administrador de sistemas</li>
            <li>Autenticação com credenciais únicas por usuário</li>
            <li>Alteração de senhas a cada 90 dias</li>
            <li>Bloqueio automático após múltiplas tentativas falhas</li>
            <li>Revogação imediata em caso de desligamento</li>
          </ul>
        </section>
      </main>
    </>
  );

  const renderRespostaIncidentes = () => (
    <>
      <header className="politicas-header">
        <h1>POLÍTICA DE RESPOSTA A INCIDENTES</h1>
        <p className="data-atualizacao">Última atualização: {new Date().toLocaleDateString('pt-PT')}</p>
      </header>

      <main className="politicas-conteudo">
        <section className="secao">
          <h2>1. Objetivo</h2>
          <p>Estabelecer procedimentos para identificação, análise, contenção, erradicação e recuperação de incidentes de segurança da informação.</p>
        </section>

        <section className="secao">
          <h2>2. Classificação de Incidentes</h2>
          <div className="categoria-dados">
            <h3>2.1. Crítico</h3>
            <ul className="lista-dados">
              <li>Vazamento de dados sensíveis</li>
              <li>Ataque de ransomware</li>
              <li>Incapacidade total do sistema</li>
            </ul>
          </div>
          <div className="categoria-dados">
            <h3>2.2. Alto</h3>
            <ul className="lista-dados">
              <li>Acesso não autorizado</li>
              <li>Falha parcial do sistema</li>
              <li>Tentativa de phishing bem-sucedida</li>
            </ul>
          </div>
        </section>

        <section className="secao">
          <h2>3. Procedimentos de Resposta</h2>
          <ol className="lista-finalidades" style={{counterReset: 'item'}}>
            <li><strong>Identificação:</strong> Detecção e registro do incidente</li>
            <li><strong>Contenção:</strong> Isolamento do sistema afetado</li>
            <li><strong>Erradicação:</strong> Remoção da causa do incidente</li>
            <li><strong>Recuperação:</strong> Restauração dos sistemas afetados</li>
            <li><strong>Lições aprendidas:</strong> Análise pós-incidente e melhorias</li>
          </ol>
        </section>
      </main>
    </>
  );

  const renderRetencaoEliminacao = () => (
    <>
      <header className="politicas-header">
        <h1>POLÍTICA DE RETENÇÃO E ELIMINAÇÃO DE DADOS</h1>
        <p className="data-atualizacao">Última atualização: {new Date().toLocaleDateString('pt-PT')}</p>
      </header>

      <main className="politicas-conteudo">
        <section className="secao">
          <h2>1. Prazos de Retenção</h2>
          <div className="categoria-dados">
            <h3>1.1. Dados Contábeis e Fiscais</h3>
            <ul className="lista-dados">
              <li>Período: 10 anos</li>
              <li>Base legal: Legislação fiscal</li>
              <li>Exemplos: Notas fiscais, recibos, declarações</li>
            </ul>
          </div>
          <div className="categoria-dados">
            <h3>1.2. Dados de Recursos Humanos</h3>
            <ul className="lista-dados">
              <li>Período: 5 anos após desligamento</li>
              <li>Base legal: CLT e legislação trabalhista</li>
              <li>Exemplos: Contratos, folhas de pagamento, férias</li>
            </ul>
          </div>
        </section>

        <section className="secao">
          <h2>2. Métodos de Eliminação</h2>
          <div className="lista-principios">
            <div className="principio-item">
              <h3>• Exclusão Segura</h3>
              <p>Sobrescrição múltipla de dados em mídias magnéticas.</p>
            </div>
            <div className="principio-item">
              <h3>• Degaussing</h3>
              <p>Desmagnetização de mídias magnéticas.</p>
            </div>
            <div className="principio-item">
              <h3>• Destruição Física</h3>
              <p>Trituração, incineração ou desintegração de mídias físicas.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );

  const renderSegurancaInformacao = () => (
    <>
      <header className="politicas-header">
        <h1>POLÍTICA DE SEGURANÇA DA INFORMAÇÃO</h1>
        <p className="data-atualizacao">Última atualização: {new Date().toLocaleDateString('pt-PT')}</p>
      </header>

      <main className="politicas-conteudo">
        <section className="secao">
          <h2>1. Princípios da Segurança da Informação</h2>
          <div className="lista-principios">
            <div className="principio-item">
              <h3>• Confidencialidade</h3>
              <p>Garantir que a informação seja acessível apenas a pessoas autorizadas.</p>
            </div>
            <div className="principio-item">
              <h3>• Integridade</h3>
              <p>Manter a exatidão e completude da informação e dos métodos de processamento.</p>
            </div>
            <div className="principio-item">
              <h3>• Disponibilidade</h3>
              <p>Garantir que os usuários autorizados tenham acesso à informação quando necessário.</p>
            </div>
            <div className="principio-item">
              <h3>• Autenticidade</h3>
              <p>Verificação da origem e identidade da informação.</p>
            </div>
          </div>
        </section>

        <section className="secao">
          <h2>2. Controles de Segurança</h2>
          <div className="categoria-dados">
            <h3>2.1. Controles Físicos</h3>
            <ul className="lista-dados">
              <li>Controle de acesso biométrico</li>
              <li>Câmeras de vigilância</li>
              <li>Alarmes e sensores</li>
              <li>Proteção contra incêndio</li>
            </ul>
          </div>
          <div className="categoria-dados">
            <h3>2.2. Controles Lógicos</h3>
            <ul className="lista-dados">
              <li>Firewalls e sistemas de detecção de intrusão</li>
              <li>Antivírus e antimalware</li>
              <li>Criptografia de dados</li>
              <li>Controle de acesso baseado em papéis</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );

  const renderUsoAceitavel = () => (
    <>
      <header className="politicas-header">
        <h1>POLÍTICA DE USO ACEITÁVEL</h1>
        <p className="data-atualizacao">Última atualização: {new Date().toLocaleDateString('pt-PT')}</p>
      </header>

      <main className="politicas-conteudo">
        <section className="secao">
          <h2>1. Uso Adequado dos Recursos</h2>
          <p>Os recursos de tecnologia da empresa devem ser utilizados exclusivamente para fins profissionais e em conformidade com as leis aplicáveis.</p>
        </section>

        <section className="secao">
          <h2>2. Condutas Permitidas</h2>
          <ul className="lista-finalidades">
            <li>Comunicação profissional via email corporativo</li>
            <li>Pesquisa relacionada às atividades profissionais</li>
            <li>Acesso a sistemas necessários para execução do trabalho</li>
            <li>Uso de software licenciado e autorizado</li>
          </ul>
        </section>

        <section className="secao">
          <h2>3. Condutas Proibidas</h2>
          <ul className="lista-finalidades">
            <li>Acesso a conteúdo inadequado ou ilegal</li>
            <li>Instalação de software não autorizado</li>
            <li>Divulgação de informações confidenciais</li>
            <li>Uso para atividades comerciais pessoais</li>
            <li>Realização de ataques cibernéticos</li>
            <li>Violar direitos autorais ou propriedade intelectual</li>
          </ul>
        </section>

        <section className="secao">
          <h2>4. Monitoramento e Consequências</h2>
          <p>A empresa monitora o uso dos recursos tecnológicos para garantir conformidade. Violações desta política podem resultar em medidas disciplinares, incluindo advertência, suspensão ou rescisão contratual.</p>
        </section>
      </main>
    </>
  );

  return (
    <div className="politicas-container">
      <MenuSuperior 
        politicaAtiva={politicaAtiva} 
        setPoliticaAtiva={setPoliticaAtiva} 
      />
      
      {renderConteudo()}

      <footer className="politicas-footer">
        <p>Para exercer seus direitos ou esclarecer dúvidas sobre estas políticas, entre em contacto através dos nossos canais oficiais.</p>
        <p className="contato-email">Email: info@megacentrodelogistica.co.mz</p>
        <p className="contato-telefone">Telefone: +258 84 123 4567</p>
      </footer>
    </div>
  );
}

export default PoliticasPrivacidade;