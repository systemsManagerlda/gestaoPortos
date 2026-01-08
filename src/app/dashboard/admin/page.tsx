"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import Head from "next/head";
import { MainPanel } from "../../../components/janelas/DefaultPanel";
import { CadastroPanel } from "../../../components/janelas/CadastroPanel";
import { LancamentosPanel } from "../../../components/janelas/LancamentosPanel";
import { CombustivelExpedientePanel } from "../../../components/janelas/CombustivelExpedientePanel";
import { SeguroCargasPanel } from "../../../components/janelas/SeguroCargasPanel";
import { VistoriaPanel } from "../../../components/janelas/VistoriaPanel";
import { GPSCaminhoesPanel } from "../../../components/janelas/GPSCaminhoesPanel";
import GPSContentor from "../../../components/janelas/GPSContentor";
import GPSGeral from "../../../components/janelas/GPSGeral";
import CargaDisponivelNLT from "../../../components/janelas/CargaDisponivelNLT";
import CargaCarregada from "../../../components/janelas/CargaCarregada";
import CargaEmCurso from "../../../components/janelas/CargaEmCurso";
import CargaDescarregada from "../../../components/janelas/CargaDescarregada";
import ContasReceber from "../../../components/janelas/ContasReceber";
import ContasPagar from "../../../components/janelas/ContasPagar";
import Contabilidade from "../../../components/janelas/Contabilidade";
import TabelaPrecos from "../../../components/janelas/TabelaPrecos";
import EmissaoGuias from "../../../components/janelas/EmissaoGuias";
import FluxoFinanceiro from "../../../components/janelas/FluxoFinanceiro";
import FluxoCaixa from "../../../components/janelas/FluxoCaixa";
import DespachoAduaneiro from "../../../components/janelas/DespachoAduaneiro";
import OrganizacaoArquivos from "../../../components/janelas/OrganizacaoArquivos";
import ServicosTerceirizados from "../../../components/janelas/ServicosTerceirizados";
import ControleInterno from "../../../components/janelas/ControleInterno";
import CentralRiscos from "../../../components/janelas/CentralRiscos";
import ReferenciaContas from "../../../components/janelas/ReferenciaContas";
import MemoriaDescritiva from "../../../components/janelas/MemoriaDescritiva";
import AreaLogisticaMunhava from "../../../components/janelas/Logistica";
import NoticiasPage from "@/components/janelas/NoticiasPagePrincipal";
import MapaControle from "@/components/janelas/MapaControle";
import DespachantesAduaneiros from "@/components/janelas/DespachantesAduaneiros";
import QrCodePage from "@/components/janelas/QrCode";
import CidadeBeira from "@/components/janelas/CidadeBeira";
import PoliticaAcessoControle from "@/components/janelas/PoliticaAcessoControle";
import PoliticaPrivacidadeProtecaoDados from "@/components/janelas/PoliticaPrivacidadeProtecaoDados";
import PoliticaRespostaIncidentes from "@/components/janelas/PoliticaRespostaIncidentes";
import PoliticaRetencaoEliminacaoDados from "@/components/janelas/PoliticaRetencaoEliminacaoDados";
import PoliticaSegurancaInformacao from "@/components/janelas/PoliticaSegurancaInformacao";
import PoliticaUsoAceitavel from "@/components/janelas/PoliticaUsoAceitavel";
import modules from "../../../components/models/dashboardModules";
import Header from "../../../components/models/header";
import Sidebar from "../../../components/models/sidebar";
import MenuSuperior from "../../../components/models/menuSuperior";
import Footer from "../../../components/models/footer";

// Componente para o conteúdo do painel central
interface PanelContentProps {
  activeModule: string;
}

const PanelContent: React.FC<PanelContentProps> = ({ activeModule }) => {
  const [activeForm, setActiveForm] = useState<string>("clientes");
  const [activeVistoriaForm, setActiveVistoriaForm] = useState("agendamento");
  const [activeSeguroForm, setActiveSeguroForm] = useState("apolices");
  const [activeGPSForm, setActiveGPSForm] = useState("monitoramento");
  const [activeLancamentoForm, setActiveLancamentoForm] =
    useState<string>("nova_carga");
  const [activeCombustivelForm, setActiveCombustivelForm] =
    useState<string>("abastecimento");

  if (!activeModule) {
    return <MainPanel />;
  }

  // Conteúdo específico para cada módulo
  const renderModuleContent = () => {
    const moduleContents: { [key: string]: JSX.Element } = {
      Cadastro: (
        <CadastroPanel activeForm={activeForm} setActiveForm={setActiveForm} />
      ),
      Lançamentos: (
        <LancamentosPanel
          activeLancamentoForm={activeLancamentoForm}
          setActiveLancamentoForm={setActiveLancamentoForm}
        />
      ),
      "Combustível e Expediente": (
        <CombustivelExpedientePanel
          activeCombustivelForm={activeCombustivelForm}
          setActiveCombustivelForm={setActiveCombustivelForm}
        />
      ),
      "Seguro de Cargas": (
        <SeguroCargasPanel
          activeSeguroForm={activeSeguroForm}
          setActiveSeguroForm={setActiveSeguroForm}
        />
      ),
      Vistoria: (
        <VistoriaPanel
          activeVistoriaForm={activeVistoriaForm}
          setActiveVistoriaForm={setActiveVistoriaForm}
        />
      ),
      "GPS Camiões": (
        <GPSCaminhoesPanel
          activeGPSForm={activeGPSForm}
          setActiveGPSForm={setActiveGPSForm}
        />
      ),
      "GPS Contentor": <GPSContentor />,
      "GPS Geral": <GPSGeral />,
      "Carga Disponível NLT": <CargaDisponivelNLT />,
      "Carga Carregada": <CargaCarregada />,
      "Carga em Movimento": <CargaEmCurso />,
      "Carga Descarregada": <CargaDescarregada />,
      "Contas a Receber": <ContasReceber />,
      "Contas a Pagar": <ContasPagar />,
      Contabilidade: <Contabilidade />,
      "Tabela de Preços": <TabelaPrecos />,
      "Emissão de Guias": <EmissaoGuias />,
      "Fluxo Financeiro": <FluxoFinanceiro />,
      "Fluxo de Caixa": <FluxoCaixa />,
      Despacho: <DespachoAduaneiro />,
      "Organização de Arquivos": <OrganizacaoArquivos />,
      "Serviços Terceirizados": <ServicosTerceirizados />,
      "Controle Interno": <ControleInterno />,
      "Central de Riscos": <CentralRiscos />,
      "Referência de Contas": <ReferenciaContas />,
      "Memória Descritiva": <MemoriaDescritiva />,
      Logística: <AreaLogisticaMunhava />,
      Notícias: <NoticiasPage />,
      "Mapa de Controle": <MapaControle />,
      "Despachantes Aduaneiros": <DespachantesAduaneiros />,
      "QR Code Carga": <QrCodePage />,
      "Cidade da Beira": <CidadeBeira />,
      "Política de Acesso e Controle de Permissões": <PoliticaAcessoControle />,
      "Política de Privacidade e Proteção de Dados": (
        <PoliticaPrivacidadeProtecaoDados />
      ),
      "Política de Resposta a Incidentes": <PoliticaRespostaIncidentes />,
      "Política de Retenção e Eliminação de Dados": (
        <PoliticaRetencaoEliminacaoDados />
      ),
      "Política de Segurança da Informação": <PoliticaSegurancaInformacao />,
      "Política de Uso Aceitável": <PoliticaUsoAceitavel />,
    };

    return (
      moduleContents[activeModule] || (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Módulo em Desenvolvimento
            </h3>
            <p className="text-gray-500">
              O conteúdo para &quot;{activeModule}&quot; está sendo preparado.
            </p>
          </div>
        </div>
      )
    );
  };

  return <div className="h-full flex flex-col">{renderModuleContent()}</div>;
};

export default function DashboardAdmin() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [activeModule, setActiveModule] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  // Módulos organizados por categoria

  const superiorModules = modules.filter(
    (module) => module.category === "superior"
  );
  const lateralModules = modules.filter(
    (module) => module.category === "lateral"
  );

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
        return;
      }
    }
  }, [user, isLoading, router]);

  const handleModuleClick = (moduleTitle: string) => {
    setActiveModule(moduleTitle);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>Área Administrativa - Mega Centro de Logística</title>
        <meta
          name="description"
          content="Sistema administrativo Mega Centro de Logística"
        />
      </Head>

      {/* Header Aprimorado */}
      <Header
        user={user ?? undefined}
        activeModule={activeModule}
        onLogout={logout}
        onSearch={(query) => console.log("Buscar:", query)}
      />

      {/* Conteúdo Principal */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar
          lateralModules={lateralModules}
          activeModule={activeModule}
          onModuleClick={handleModuleClick}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          user={user ?? undefined}
        />

        {/* Área Central */}
        <main className="flex-1 flex flex-col">
          {/* Módulos Superiores */}
          <MenuSuperior
            modules={superiorModules}
            activeModule={activeModule}
            onModuleClick={handleModuleClick}
            user={user ?? undefined}
          />

          {/* Painel Central */}
          <div className="flex-1 p-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 h-full flex flex-col overflow-hidden">
                <PanelContent activeModule={activeModule} />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer / Área de Comunicação */}
      <Footer />

      {/* Estilos CSS personalizados */}
      <style jsx global>{`
        /* Scrollbar personalizada */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #1d4ed8);
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #1e40af);
        }

        /* Animações suaves */
        .transition-all {
          transition: all 0.3s ease;
        }

        /* Animar dropdown */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .group-hover\\:visible {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>

      {/* Overlay para fechar notificações ao clicar fora */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
}
