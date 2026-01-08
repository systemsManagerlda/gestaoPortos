export interface DashboardModule {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  category: "superior" | "lateral";
}

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
      title: "Vistoria",
      description: "Vistorias de veículos e cargas",
      icon: "🔍",
      href: "/vistorias",
      color: "bg-pink-500 hover:bg-pink-600",
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
      title: "Carga Disponível NLT",
      description: "Cargas disponíveis para transporte",
      icon: "📋",
      href: "/cargas/disponiveis",
      color: "bg-cyan-500 hover:bg-cyan-600",
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
      title: "Combustível e Expediente",
      description: "Controle de combustível e expedientes",
      icon: "⛽",
      href: "/combustivel-expediente",
      color: "bg-yellow-500 hover:bg-yellow-600",
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
      title: "Carga Carregada",
      description: "Controle de cargas carregadas",
      icon: "🚚",
      href: "/cargas/carregadas",
      color: "bg-lime-500 hover:bg-lime-600",
      category: "superior",
    },
    {
      title: "Carga em Movimento",
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
      href: "/memoria-descritiva",
      color: "bg-sky-500 hover:bg-sky-600",
      category: "lateral",
    },
    {
      title: "Mapa de Controle",
      description: "Visualização e acompanhamento das operações",
      icon: "🗺️",
      href: "/mapa-controle",
      color: "bg-blue-500 hover:bg-blue-600",
      category: "lateral",
    },
    {
      title: "Logística",
      description: "Gestão logística completa",
      icon: "📦",
      href: "/logistica",
      color: "bg-green-500 hover:bg-green-600",
      category: "lateral",
    },
    {
      title: "Despachantes Aduaneiros",
      description: "Gestão de processos e documentação aduaneira",
      icon: "📄",
      href: "/despachantes-aduaneiros",
      color: "bg-indigo-500 hover:bg-indigo-600",
      category: "lateral",
    },
    {
      title: "QR Code Carga",
      description: "Controle e rastreamento de cargas através de QR codes",
      icon: "📦",
      href: "/qr-code-carga",
      color: "bg-teal-500 hover:bg-teal-600",
      category: "lateral",
    },
    {
      title: "Cidade da Beira",
      description: "Administração municipal e serviços urbanos",
      icon: "🏛️",
      href: "/beira",
      color: "bg-cyan-500 hover:bg-cyan-600",
      category: "lateral",
    },
    // {
    //   title: "Política de Acesso e Controle de Permissões",
    //   description:
    //     "Gestão de acessos, níveis de permissão e controle de privilégios",
    //   icon: "🔐",
    //   href: "/politicas/acesso-permissoes",
    //   color: "bg-blue-500 hover:bg-blue-600",
    //   category: "lateral",
    // },

    // {
    //   title: "Política de Privacidade e Proteção de Dados",
    //   description: "Conformidade com LGPD e proteção de dados pessoais",
    //   icon: "🛡️",
    //   href: "/politicas/privacidade-dados",
    //   color: "bg-purple-500 hover:bg-purple-600",
    //   category: "lateral",
    // },

    // {
    //   title: "Política de Resposta a Incidentes",
    //   description: "Procedimentos para tratamento de incidentes de segurança",
    //   icon: "🚨",
    //   href: "/politicas/resposta-incidentes",
    //   color: "bg-red-500 hover:bg-red-600",
    //   category: "lateral",
    // },

    // {
    //   title: "Política de Retenção e Eliminação de Dados",
    //   description: "Gestão do ciclo de vida de dados e documentos",
    //   icon: "🗑️",
    //   href: "/politicas/retencao-dados",
    //   color: "bg-gray-500 hover:bg-gray-600",
    //   category: "lateral",
    // },

    // {
    //   title: "Política de Segurança da Informação",
    //   description: "Framework completo de segurança da informação",
    //   icon: "🏢",
    //   href: "/politicas/seguranca-informacao",
    //   color: "bg-green-500 hover:bg-green-600",
    //   category: "lateral",
    // },

    // {
    //   title: "Política de Uso Aceitável",
    //   description: "Diretrizes de uso responsável de recursos de TI",
    //   icon: "📋",
    //   href: "/politicas/uso-aceitavel",
    //   color: "bg-orange-500 hover:bg-orange-600",
    //   category: "lateral",
    // },
    {
      title: "Notícias",
      description: "Atualizações, avisos e comunicados",
      icon: "📰",
      href: "/noticias",
      color: "bg-orange-500 hover:bg-orange-600",
      category: "lateral",
    },
  ];


// Funções auxiliares
export function getModulesByCategory(category: "superior" | "lateral"): DashboardModule[] {
  return modules.filter(module => module.category === category);
}

export function getAllSuperiorModules(): DashboardModule[] {
  return getModulesByCategory("superior");
}

export function getAllLateralModules(): DashboardModule[] {
  return getModulesByCategory("lateral");
}

export function getModuleByHref(href: string): DashboardModule | undefined {
  return modules.find(module => module.href === href);
}

export function getModuleByTitle(title: string): DashboardModule | undefined {
  return modules.find(module => module.title === title);
}

export function searchModules(searchTerm: string): DashboardModule[] {
  const term = searchTerm.toLowerCase();
  return modules.filter(module =>
    module.title.toLowerCase().includes(term) ||
    module.description.toLowerCase().includes(term)
  );
}

export default modules;