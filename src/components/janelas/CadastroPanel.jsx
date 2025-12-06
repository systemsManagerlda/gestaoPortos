import ClientesList from "./ClientesList";
import TransportadorasList from "./TransportadorasList";
import MotoristasList from "./MotoristasList";
import CamioesList from "./CamioesList";

export const CadastroPanel = ({ activeForm, setActiveForm }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            📋
          </span>
          Cadastro - Gestão de Registros
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Gerenciamento de clientes, camiões, transportadoras e
          motoristas
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação entre Formulários */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveForm("clientes")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeForm === "clientes"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            👥 Clientes
          </button>
          <button
            onClick={() => setActiveForm("camioes")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeForm === "camioes"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🚚 Camiões
          </button>
          <button
            onClick={() => setActiveForm("transportadoras")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeForm === "transportadoras"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🚚 Transportadoras
          </button>
          <button
            onClick={() => setActiveForm("motoristas")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeForm === "motoristas"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            👨‍💼 Motoristas
          </button>
        </div> 

        {/* Formulário de Clientes */}
        {activeForm === "clientes" && (
          <ClientesList />
        )}

        {/* Formulário de Despachantes */}
        {activeForm === "camioes" && (
         <CamioesList />
        )}

        {/* Formulário de Transportadoras */}
        {activeForm === "transportadoras" && (
          <TransportadorasList />
        )}

        {/* Formulário de Motoristas */}
        {activeForm === "motoristas" && (
          <MotoristasList />
        )}
      </div>
    </div>
  );
};