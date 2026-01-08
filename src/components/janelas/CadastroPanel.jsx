import React from 'react';
import ClientesList from "./ClientesList";
import TransportadorasList from "./TransportadorasList";
import MotoristasList from "./MotoristasList";
import CamioesList from "./CamioesList";

// Configuração centralizada dos botões de navegação
const NAV_ITEMS = [
  { id: "clientes", label: "👥 Clientes", component: ClientesList },
  { id: "camioes", label: "🚚 Camiões", component: CamioesList },
  { id: "transportadoras", label: "🏢 Transportadoras", component: TransportadorasList },
  { id: "motoristas", label: "👨‍💼 Motoristas", component: MotoristasList },
];

export const CadastroPanel = ({ activeForm, setActiveForm }) => {
  const ActiveComponent = NAV_ITEMS.find(item => item.id === activeForm)?.component;

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Cabeçalho */}
      <header className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white shadow-sm">
        <div className="flex items-center">
          <div className="bg-blue-500 text-white p-3 rounded-xl mr-4 shadow-md">
            <span className="text-xl">📋</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Cadastro - Gestão de Registros
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Gerenciamento de clientes, camiões, transportadoras e motoristas
            </p>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col">
        {/* Navegação */}
        <nav className="p-6 pb-0" aria-label="Menu de cadastros">
          <div className="flex flex-wrap gap-3 border-b border-gray-200 pb-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveForm(item.id)}
                className={`
                  px-5 py-3 rounded-lg font-medium transition-all duration-200
                  flex items-center gap-2 min-w-[140px] justify-center
                  focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2
                  ${activeForm === item.id
                    ? "bg-blue-500 text-white shadow-lg transform scale-[1.02]"
                    : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md border border-gray-200"
                  }
                `}
                aria-current={activeForm === item.id ? "page" : undefined}
              >
                <span className="text-lg">{item.label.split(' ')[0]}</span>
                <span>{item.label.split(' ').slice(1).join(' ')}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Área de Conteúdo */}
        <section className="flex-1 p-6 overflow-auto" aria-live="polite">
          {ActiveComponent ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fadeIn">
              <ActiveComponent />
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-700">
                Selecione uma categoria para começar
              </h3>
              <p className="text-gray-500 mt-2">
                Escolha uma das opções acima para visualizar e gerenciar os registros
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

// Estilos CSS para a animação (pode ser movido para um arquivo CSS global)
const styles = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
`;

// Adiciona os estilos ao documento
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}