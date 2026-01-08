import React, { useState } from 'react';

interface Module {
  title: string;
  description: string;
  icon: string;
  color: string;
  category?: string;
}

interface SidebarProps {
  lateralModules: Module[];
  activeModule: string;
  onModuleClick: (moduleTitle: string) => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  user?: {
    name?: string;
    email?: string;
  };
}

function Sidebar({ 
  lateralModules, 
  activeModule, 
  onModuleClick, 
  sidebarOpen, 
  onToggleSidebar,
  user 
}: SidebarProps) {
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);

  // Contador de módulos ativos
  const activeModulesCount = lateralModules.filter(m => activeModule === m.title).length;

  // Formatar hora do último acesso
  const lastAccessTime = new Date().toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  // Obter iniciais do usuário
  const getUserInitials = () => {
    if (user?.name) {
      return user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return 'AD';
  };

  // Obter nome abreviado para sidebar fechada
  const getAbbreviatedTitle = (title: string) => {
    const words = title.split(' ');
    if (words.length === 1) return title.substring(0, 4) + '...';
    return words.map(w => w[0]).join('').toUpperCase();
  };

  return (
    <>
      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-24"
        } bg-gradient-to-b from-white via-white to-gray-50 shadow-xl border-r border-gray-300 transition-all duration-300 ease-in-out flex flex-col h-full`}
      >
        {/* Cabeçalho da Sidebar */}
        <div className="p-5 border-b border-gray-300 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white">
          {sidebarOpen ? (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-lg">📊</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Menu Administrativo</h2>
                <p className="text-xs text-gray-600">Navegação principal</p>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md mx-auto">
              <span className="text-white text-lg">📊</span>
            </div>
          )}
          
          {/* Botão de recolher/expandir */}
          <button
            onClick={onToggleSidebar}
            className={`p-2.5 rounded-xl transition-all duration-200 ${
              sidebarOpen 
                ? "hover:bg-gray-200 text-gray-700 hover:text-gray-900" 
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            } focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50`}
            aria-label={sidebarOpen ? "Recolher menu" : "Expandir menu"}
            title={sidebarOpen ? "Recolher menu" : "Expandir menu"}
          >
            <div className="relative w-5 h-5">
              <svg
                className={`w-5 h-5 transform transition-transform duration-300 ${
                  sidebarOpen ? "rotate-0" : "rotate-180"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={sidebarOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                />
              </svg>
            </div>
          </button>
        </div>

        {/* Indicador de Módulo Ativo (apenas quando sidebar fechada) */}
        {!sidebarOpen && activeModule && (
          <div className="px-3 py-2 border-b border-gray-200 bg-blue-50">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <p 
                className="text-xs font-medium text-blue-700 truncate pl-6"
                title={activeModule}
              >
                {getAbbreviatedTitle(activeModule)}
              </p>
            </div>
          </div>
        )}

        {/* Área de Módulos Laterais */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Contador de Módulos */}
          {sidebarOpen && (
            <div className="mb-4 px-2">
              <div className="flex items-center justify-between">
                <span 
                  className="text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  title="Total de módulos disponíveis"
                >
                  Módulos ({lateralModules.length})
                </span>
                {activeModulesCount > 0 && (
                  <span 
                    className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium"
                    title={`${activeModulesCount} módulo(s) ativo(s)`}
                  >
                    {activeModulesCount} ativo
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Lista de Módulos */}
          <div className="space-y-2">
            {lateralModules.map((module, index) => {
              const isActive = activeModule === module.title;
              
              return (
                <div 
                  key={index}
                  className="relative"
                  onMouseEnter={() => setHoveredModule(index)}
                  onMouseLeave={() => setHoveredModule(null)}
                >
                  <button
                    onClick={() => onModuleClick(module.title)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 border flex items-center group hover:shadow-lg ${
                      sidebarOpen ? "space-x-4" : "justify-center"
                    } ${
                      isActive
                        ? "bg-gradient-to-r from-blue-50 via-blue-50 to-white border-blue-300 shadow-md transform scale-[1.02] ring-1 ring-blue-200"
                        : "bg-white border-gray-200 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white hover:border-gray-300"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                    title={!sidebarOpen ? module.title : undefined}
                  >
                    {/* Ícone do Módulo */}
                    <div className="relative">
                      <span
                        className={`text-xl p-2.5 rounded-xl flex items-center justify-center shadow-sm ${
                          module.color
                        } text-white transition-transform duration-200 group-hover:scale-110`}
                        style={{ 
                          minWidth: '42px',
                          minHeight: '42px'
                        }}
                        aria-hidden="true"
                      >
                        {module.icon}
                      </span>
                      
                      {/* Indicador de atividade (apenas quando sidebar fechada) */}
                      {!sidebarOpen && isActive && (
                        <div 
                          className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
                          title="Módulo ativo"
                          aria-label="Módulo ativo"
                        ></div>
                      )}
                    </div>

                    {/* Conteúdo do Módulo (visível apenas quando sidebar aberta) */}
                    {sidebarOpen && (
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-gray-900 text-sm truncate group-hover:text-blue-700 transition-colors">
                            {module.title}
                          </p>
                          {isActive && (
                            <div 
                              className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                              title="Ativo"
                              aria-label="Ativo"
                            ></div>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 truncate mt-1">
                          {module.description}
                        </p>
                      </div>
                    )}
                  </button>

                  {/* Tooltip para sidebar fechada */}
                  {!sidebarOpen && hoveredModule === index && (
                    <div 
                      className="opacity-0 animate-fadeIn absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap z-50 pointer-events-none"
                      style={{ top: '50%', transform: 'translateY(-50%)' }}
                    >
                      <div className="font-semibold">{module.title}</div>
                      <div className="text-xs text-gray-300 mt-1">{module.description}</div>
                      {isActive && (
                        <div className="flex items-center mt-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-xs text-green-300">Ativo</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Espaço inferior */}
          {sidebarOpen && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="px-2">
                <p className="text-xs text-gray-500 text-center">
                  Último acesso: {lastAccessTime}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Rodapé da Sidebar */}
        <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-white">
          {sidebarOpen ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-sm font-bold">
                    {getUserInitials()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p 
                    className="text-sm font-semibold text-gray-900 truncate"
                    title={user?.name || user?.email}
                  >
                    {user?.name || user?.email?.split('@')[0]}
                  </p>
                  <p className="text-[10px] text-gray-600 truncate">v2.5.1 • Online</p>
                </div>
              </div>
              <div 
                className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                title="Sistema online"
                aria-label="Sistema online"
              ></div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-sm font-bold">
                    {getUserInitials()}
                  </span>
                </div>
                <div 
                  className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
                  title="Sistema online"
                ></div>
              </div>
            </div>
          )}
        </div>
      </aside>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-10px) translateY(-50%);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(-50%);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }

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

        /* Animações de hover */
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }

        /* Transições suaves */
        .transition-all {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  );
}

export default Sidebar;