import React, { useState, useEffect, useCallback } from "react";
import EmailModal from "./EmailModal";
import { sendEmail } from "./emailService";

interface CommunicationTool {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  description: string;
  action?: () => void;
  badge?: string;
}

interface FooterProps {
  companyName?: string;
  clientLine?: string;
  showStatus?: boolean;
  onToolClick?: (toolId: string) => void;
}

const defaultCommunicationTools: CommunicationTool[] = [
  {
    id: "email",
    name: "E-mail",
    icon: "📧",
    gradient: "from-blue-500 to-blue-600",
    description: "Enviar e-mail interno",
    badge: "24/7",
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    icon: "💬",
    gradient: "from-green-500 to-green-600",
    description: "Chat com suporte",
  },
  {
    id: "camera",
    name: "Câmera",
    icon: "📷",
    gradient: "from-purple-500 to-purple-600",
    description: "Acessar câmeras de segurança",
    badge: "LIVE",
  },
  {
    id: "phone",
    name: "Telefonia",
    icon: "📞",
    gradient: "from-red-500 to-red-600",
    description: "Ligações internas",
  },
  {
    id: "chat",
    name: "Chat Interno",
    icon: "💭",
    gradient: "from-indigo-500 to-indigo-600",
    description: "Mensagens internas",
  },
];

const Footer: React.FC<FooterProps> = ({
  companyName = "Mega Centro de Logística",
  clientLine = "+258 82 456 7890",
  showStatus = true,
  onToolClick,
}) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Atualizar horário atual
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Atualizar a cada minuto

    return () => clearInterval(interval);
  }, []);

  // Simular verificação de status do sistema
  useEffect(() => {
    const checkSystemStatus = () => {
      // Em um caso real, isso seria uma chamada API
      setIsOnline(Math.random() > 0.1); // 90% de chance de estar online
    };

    checkSystemStatus();
    const interval = setInterval(checkSystemStatus, 30000); // Verificar a cada 30s

    return () => clearInterval(interval);
  }, []);

  const handleToolClick = useCallback(
    (toolId: string) => {
      setActiveTool(toolId);

      if (toolId === "email") {
        setIsEmailModalOpen(true);
      }

      onToolClick?.(toolId);

      setTimeout(() => setActiveTool(null), 300);
    },
    [onToolClick]
  );

  const handleSendEmail = async (emailData: {
    emailTo: string;
    emailSubject: string;
    emailBody: string;
    attachments?: File[];
  }) => {
    return await sendEmail(emailData);
  };

  const formatPhoneNumber = (phone: string): string => {
    return phone.replace(/(\+\d{3})(\d{2})(\d{3})(\d{4})/, "$1 $2 $3 $4");
  };

  const getSystemStatusColor = (online: boolean) => {
    return online
      ? "from-green-500 to-emerald-500"
      : "from-red-500 to-orange-500";
  };

  const getSystemStatusText = (online: boolean) => {
    return online ? "Sistema Online" : "Sistema Offline";
  };

  return (
    <footer
      className="bg-white border-t border-gray-200 shadow-lg relative overflow-hidden"
      role="contentinfo"
      aria-label="Rodapé do sistema"
    >
      {/* Elemento decorativo de fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        {/* Cabeçalho do Rodapé */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg mr-3">
                  <span className="text-white text-xl">📡</span>
                  {/* Indicador de atividade */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg flex items-center">
                  Área de Comunicação Administrativa
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Ferramentas integradas de comunicação e suporte
                </p>
              </div>
            </div>

            {/* Status do Sistema e Horário */}
            <div className="flex flex-wrap items-center gap-3">
              {showStatus && (
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${getSystemStatusColor(
                    isOnline
                  )} text-white shadow-sm transition-all duration-300 ${
                    !isOnline ? "animate-pulse" : ""
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  <span className="font-medium text-sm">
                    {getSystemStatusText(isOnline)}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                <span className="text-gray-600 text-sm">🕒</span>
                <time
                  dateTime={new Date().toISOString()}
                  className="font-mono font-semibold text-gray-800"
                >
                  {currentTime}
                </time>
              </div>
            </div>
          </div>
        </div>

        {/* Ferramentas de Comunicação */}
        <div className="mb-6 md:mb-8">
          <h3 className="text-gray-700 text-sm font-semibold mb-4 px-1">
            Ferramentas Rápidas
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {defaultCommunicationTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool.id)}
                className={`
                  group relative flex flex-col items-center p-4 rounded-xl text-white 
                  bg-gradient-to-r ${tool.gradient} shadow-md hover:shadow-xl 
                  transition-all duration-200 transform hover:-translate-y-1 
                  active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300
                  ${
                    activeTool === tool.id
                      ? "ring-2 ring-white ring-offset-2"
                      : ""
                  }
                `}
                aria-label={`Abrir ${tool.name}: ${tool.description}`}
                title={`${tool.name}: ${tool.description}`}
              >
                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Ícone */}
                <div className="relative mb-2">
                  <span className="text-2xl">{tool.icon}</span>
                  {tool.badge && (
                    <div className="absolute -top-2 -right-2">
                      <span className="text-[10px] font-bold bg-white/90 text-gray-800 px-1.5 py-0.5 rounded-full">
                        {tool.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Nome da ferramenta */}
                <span className="font-semibold text-sm text-center leading-tight">
                  {tool.name}
                </span>

                {/* Tooltip de descrição */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
                    {tool.description}
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Informações de Contato e Copyright */}
        <div className="pt-6 border-t border-gray-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Informações de Contato */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                  <span className="text-blue-600 text-lg">📞</span>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Linha do Cliente
                  </p>
                  <a
                    href={`tel:${clientLine.replace(/\s/g, "")}`}
                    className="font-bold text-blue-700 hover:text-blue-800 transition-colors text-lg"
                    aria-label={`Ligar para ${clientLine}`}
                  >
                    {formatPhoneNumber(clientLine)}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                  <span className="text-green-600 text-lg">✉️</span>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    E-mail de Suporte
                  </p>
                  <a
                    href="mailto:info@megacentrodelogistica.co.mz"
                    className="font-bold text-green-700 hover:text-green-800 transition-colors text-lg"
                    aria-label="Enviar e-mail para suporte"
                  >
                    info@megacentrodelogistica.co.mz
                  </a>
                </div>
              </div>
            </div>

            {/* Copyright e Links */}
            <div className="flex flex-col items-start md:items-end gap-3">
              <div className="text-xs text-gray-500 bg-gray-50/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span>
                    © {new Date().getFullYear()} {companyName}. Todos os
                    direitos reservados.
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex items-center gap-3">
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-600 transition-colors hover:underline"
                      aria-label="Política de privacidade"
                    >
                      Privacidade
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-600 transition-colors hover:underline"
                      aria-label="Termos de serviço"
                    >
                      Termos
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-600 transition-colors hover:underline"
                      aria-label="Ajuda e suporte"
                    >
                      Ajuda
                    </a>
                  </div>
                </div>
              </div>

              {/* Versão do Sistema */}
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="px-2 py-1 bg-gray-100 rounded">v2.5.1</span>
                <span>•</span>
                <span>Build: {new Date().toISOString().split("T")[0]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de Progresso de Performance (opcional) */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Performance do sistema</span>
            <span>92%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: "92%" }}
              role="progressbar"
              aria-valuenow={92}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>

      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSendEmail={handleSendEmail}
        defaultRecipient="" // Pode preencher com um e-mail padrão se necessário
      />

      {/* Estilos CSS-in-JS */}
      <style jsx>{`
        @keyframes ping {
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-ping {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .hover\\:animate-float:hover {
          animation: float 2s ease-in-out infinite;
        }

        button:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
          border-radius: 0.75rem;
        }

        /* Melhorar acessibilidade para foco */
        a:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
          border-radius: 0.25rem;
        }
      `}</style>
    </footer>
  );
};

export default React.memo(Footer);
