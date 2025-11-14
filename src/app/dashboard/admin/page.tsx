"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import Head from "next/head";
import Image from "next/image";
import { DefaultPanel } from "../../../components/janelas/DefaultPanel";
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

// Tipos
interface DashboardModule {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  category: string;
}

// Componente para o conteúdo do painel central
interface PanelContentProps {
  activeModule: string;
}

const PanelContent: React.FC<PanelContentProps> = ({ activeModule }) => {
  const [activeForm, setActiveForm] = useState<string>("clientes");
  const [activeVistoriaForm, setActiveVistoriaForm] = useState("agendamento");
  const [activeSeguroForm, setActiveSeguroForm] = useState("apolices");
  const [activeGPSForm, setActiveGPSForm] = useState("monitoramento");
  const [activeLancamentoForm, setActiveLancamentoForm] = useState<string>("nova_carga");
  const [activeCombustivelForm, setActiveCombustivelForm] = useState<string>("abastecimento");

  if (!activeModule) {
    return <DefaultPanel />;
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
      "Carga em Curso": <CargaEmCurso />,
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

  // Módulos organizados por categoria
  const modules: DashboardModule[] = [
    // Módulos Superiores
    {
      title: "Cadastro",
      description: "Clientes, Despachante, Transportadora, Motorista",
      icon: "📋",
      href: "/cadastros",
      color: "bg-green-500 hover:bg-green-600",
      category: "superior",
    },
    {
      title: "Lançamentos",
      description: "Registro de operações e movimentações",
      icon: "📥",
      href: "/lancamentos",
      color: "bg-blue-500 hover:bg-blue-600",
      category: "superior",
    },
    {
      title: "Combustível e Expediente",
      description: "Controle de combustível e expedientes",
      icon: "⛽",
      href: "/combustivel-expediente",
      color: "bg-yellow-500 hover:bg-yellow-600",
      category: "superior",
    },
    {
      title: "Seguro de Cargas",
      description: "Gestão de seguros e apólices",
      icon: "🛡️",
      href: "/seguros",
      color: "bg-purple-500 hover:bg-purple-600",
      category: "superior",
    },
    {
      title: "Vistoria",
      description: "Vistorias de veículos e cargas",
      icon: "🔍",
      href: "/vistorias",
      color: "bg-pink-500 hover:bg-pink-600",
      category: "superior",
    },
    {
      title: "GPS Camiões",
      description: "Monitoramento de caminhões",
      icon: "🚛",
      href: "/gps/camioes",
      color: "bg-red-500 hover:bg-red-600",
      category: "superior",
    },
    {
      title: "GPS Contentor",
      description: "Rastreamento de contentores",
      icon: "📦",
      href: "/gps/contentor",
      color: "bg-indigo-500 hover:bg-indigo-600",
      category: "superior",
    },
    {
      title: "GPS Geral",
      description: "Monitoramento geral da frota",
      icon: "🗺️",
      href: "/gps/geral",
      color: "bg-teal-500 hover:bg-teal-600",
      category: "superior",
    },
    {
      title: "Carga Disponível NLT",
      description: "Cargas disponíveis para transporte",
      icon: "📋",
      href: "/cargas/disponiveis",
      color: "bg-cyan-500 hover:bg-cyan-600",
      category: "superior",
    },
    {
      title: "Carga Carregada",
      description: "Controle de cargas carregadas",
      icon: "🚚",
      href: "/cargas/carregadas",
      color: "bg-lime-500 hover:bg-lime-600",
      category: "superior",
    },
    {
      title: "Carga em Curso",
      description: "Monitoramento de cargas em andamento",
      icon: "🚛",
      href: "/cargas/em-curso",
      color: "bg-violet-500 hover:bg-violet-600",
      category: "superior",
    },
    {
      title: "Carga Descarregada",
      description: "Registro de cargas descarregadas",
      icon: "🏁",
      href: "/cargas/descarregadas",
      color: "bg-fuchsia-500 hover:bg-fuchsia-600",
      category: "superior",
    },

    // Menu Lateral
    {
      title: "Contas a Receber",
      description: "Gestão de recebíveis",
      icon: "💰",
      href: "/financeiro/receber",
      color: "bg-emerald-500 hover:bg-emerald-600",
      category: "lateral",
    },
    {
      title: "Contas a Pagar",
      description: "Gestão de pagamentos",
      icon: "💸",
      href: "/financeiro/pagar",
      color: "bg-rose-500 hover:bg-rose-600",
      category: "lateral",
    },
    {
      title: "Contabilidade",
      description: "Gestão contábil completa",
      icon: "📊",
      href: "/contabilidade",
      color: "bg-slate-500 hover:bg-slate-600",
      category: "lateral",
    },
    {
      title: "Tabela de Preços",
      description: "Tabelas e tarifas",
      icon: "📋",
      href: "/precos",
      color: "bg-violet-500 hover:bg-violet-600",
      category: "lateral",
    },
    {
      title: "Emissão de Guias",
      description: "Emissão de documentos fiscais",
      icon: "📄",
      href: "/guias",
      color: "bg-amber-500 hover:bg-amber-600",
      category: "lateral",
    },
    {
      title: "Fluxo Financeiro",
      description: "Fluxo de caixa e financeiro",
      icon: "💹",
      href: "/fluxo-financeiro",
      color: "bg-lime-500 hover:bg-lime-600",
      category: "lateral",
    },
    {
      title: "Fluxo de Caixa",
      description: "Controle diário de caixa",
      icon: "🏦",
      href: "/fluxo-caixa",
      color: "bg-cyan-500 hover:bg-cyan-600",
      category: "lateral",
    },
    {
      title: "Despacho",
      description: "Serviço de Despacho",
      icon: "📋",
      href: "/despacho",
      color: "bg-teal-500 hover:bg-teal-600",
      category: "lateral",
    },
    {
      title: "Organização de Arquivos",
      description: "Gestão documental",
      icon: "📁",
      href: "/arquivos",
      color: "bg-stone-500 hover:bg-stone-600",
      category: "lateral",
    },
    {
      title: "Serviços Terceirizados",
      description: "Controle de serviços externos",
      icon: "🤝",
      href: "/terceirizados",
      color: "bg-fuchsia-500 hover:bg-fuchsia-600",
      category: "lateral",
    },
    {
      title: "Controle Interno",
      description: "Controles internos e auditoria",
      icon: "🔒",
      href: "/controle-interno",
      color: "bg-neutral-500 hover:bg-neutral-600",
      category: "lateral",
    },
    {
      title: "Central de Riscos",
      description: "Gestão e monitoramento de riscos",
      icon: "⚠️",
      href: "/central-riscos",
      color: "bg-red-700 hover:bg-red-800",
      category: "lateral",
    },
    {
      title: "Referência de Contas",
      description: "Referência contábil",
      icon: "🏷️",
      href: "/referencia-contas",
      color: "bg-sky-500 hover:bg-sky-600",
      category: "lateral",
    },
    {
      title: "Memória Descritiva",
      description: "Descrição da Plataforma Mega Centro de Logística",
      icon: "🏷️",
      href: "/referencia-contas",
      color: "bg-sky-500 hover:bg-sky-600",
      category: "lateral",
    },
  ];

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
      
      if (user.role !== "admin") {
        router.push("/dashboard");
        return;
      }
    }
  }, [user, isLoading, router]);

  const handleModuleClick = (moduleTitle: string) => {
    setActiveModule(moduleTitle);
  };

  if (isLoading || !user || user.role !== "admin") {
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
        <meta name="description" content="Sistema administrativo Mega Centro de Logística" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
                <Image
                  src="/image/megaCentroLogistica.png"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">
                  Área Administrativa
                </h1>
                <p className="text-sm text-gray-500">
                  Mega Centro de Logística
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user.name.charAt(0)}
              </div>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-20"
          } bg-white shadow-lg border-r border-gray-200 transition-all duration-300 flex flex-col`}
        >
          {/* Botão para recolher/expandir sidebar */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            {sidebarOpen && (
              <h2 className="text-lg font-semibold text-gray-800">
                📋 Menu Administrativo
              </h2>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-800"
            >
              {sidebarOpen ? "◀" : "▶"}
            </button>
          </div>

          {/* Módulos Laterais */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <div className="space-y-2">
              {lateralModules.map((module, index) => (
                <button
                  key={index}
                  onClick={() => handleModuleClick(module.title)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 border flex items-center space-x-3 group hover:shadow-md ${
                    activeModule === module.title
                      ? "bg-white border-gray-300 shadow-md transform scale-105"
                      : "bg-gray-100 border-gray-200 hover:bg-white"
                  }`}
                >
                  <span
                    className={`text-lg p-2 rounded-lg ${module.color} text-white`}
                  >
                    {module.icon}
                  </span>
                  {sidebarOpen && (
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate group-hover:text-blue-600">
                        {module.title}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {module.description}
                      </p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Área Central */}
        <main className="flex-1 flex flex-col">
          {/* Módulos Superiores */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {superiorModules.map((module, index) => (
                  <button
                    key={index}
                    onClick={() => handleModuleClick(module.title)}
                    className={`p-4 rounded-xl text-gray-950 text-center transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 ${
                      module.color
                    } shadow-md hover:shadow-xl border border-transparent hover:border-white hover:border-opacity-30 ${
                      activeModule === module.title
                        ? "ring-2 ring-white ring-opacity-50"
                        : ""
                    }`}
                  >
                    <div className="text-2xl mb-2 drop-shadow-sm">
                      {module.icon}
                    </div>
                    <p className="text-sm font-semibold truncate drop-shadow-sm">
                      {module.title}
                    </p>
                    <p className="text-xs opacity-90 mt-1 truncate">
                      {module.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

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
      <footer className="bg-white border-t border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Título do Rodapé */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 text-sm flex items-center">
              <span className="bg-gray-100 p-1 rounded-lg mr-2">📡</span>
              Área de Comunicação Administrativa
            </h3>
          </div>

          {/* Ferramentas de Comunicação */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Comunicação */}
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
                <span>📧</span>
                <span>E-mail Corporativo</span>
              </button>

              <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
                <span>💬</span>
                <span>WhatsApp</span>
              </button>

              <button className="flex items-center space-x-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
                <span>📷</span>
                <span>Câmera</span>
              </button>
            </div>

            {/* Status e Informações */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-medium">
                  Sistema Online
                </span>
              </div>

              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                <span className="text-gray-700">Linha do Cliente:</span>
                <span className="font-semibold text-blue-600">
                  +258 82 456 7890
                </span>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
              © 2025 Mega Centro de Logística. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>

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
          background: #c1c1c1;
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }

        /* Animações suaves */
        .transition-all {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}