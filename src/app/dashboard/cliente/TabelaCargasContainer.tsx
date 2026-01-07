/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCargas } from "@/types/useCargas";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { FiltrosCargas } from "../transportador/viagens";
import { Carga } from "@/app/dashboard/cliente/cargaService";

interface TabelaCargasContainerProps {
  nomeEmpresa?: string;
}

export function TabelaCargasContainer({
  nomeEmpresa,
}: TabelaCargasContainerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [tipoFilter, setTipoFilter] = useState("todos");
  const [showNovaCargaModal, setShowNovaCargaModal] = useState(false);
  const [modoVisualizacao, setModoVisualizacao] = useState<
    "todas" | "transportadora"
  >("transportadora");
  const [filtrosAvancados, setFiltrosAvancados] = useState({
    prioridade: "todos",
    valorMin: "",
    valorMax: "",
    dataInicio: "",
    dataFim: "",
    tipoCarga: "todos",
    naturezaCarga: "todos",
    motoristaEmpresa: false,
  });

  const { user } = useAuth();

  // Obter transportadora logada
  const transportadoraLogada =
    user?.tipo === "transportadora" ? (user as any) : null;

  // Usar o hook de cargas
  const {
    filteredCargas,
    isDataLoading,
    metrics,
    cargasFiltradasPorTransportadora,
    criarNovaCarga,
    atualizarStatus,
    aceitarCarga,
    visualizarCarga,
    exportarDados,
    fetchCargas,
  } = useCargas(transportadoraLogada?.nomeEmpresa || nomeEmpresa);

  // Função para filtrar cargas que pertençam à transportadora logada
  const filterCargasPorTransportadoraLogada = (cargas: Carga[]): Carga[] => {
    // Se o usuário não for uma transportadora, retorna array vazio
    if (!transportadoraLogada || !transportadoraLogada.nomeEmpresa) {
      return [];
    }

    const transportadoraNome = transportadoraLogada.nomeEmpresa;
    const transportadoraId = transportadoraLogada.transportadoraId;

    const cargasFiltradas = cargas.filter((carga) => {
      // DEBUG: Mostrar informações da carga
      const debugInfo = {
        codigo: carga.codigo,
        transportadoraCarga: carga.transportadora || carga.nomeEmpresa || "N/A",
        transportadoraId: transportadoraId,
        transportadoraNome: transportadoraNome,
      };

      // Verifica se a carga tem transportadora associada
      // 1. Campo 'transportadora' direto (comparação exata)
      const transportadoraCorrespondente =
        carga.transportadora === transportadoraNome;

      // 2. Campo 'nomeEmpresa' (backward compatibility)
      const nomeEmpresaCorrespondente =
        carga.nomeEmpresa === transportadoraNome;

      // 3. Campo 'empresaId' corresponde ao transportadoraId
      const idCorrespondente = transportadoraId;

      return (
        transportadoraCorrespondente ||
        nomeEmpresaCorrespondente ||
        idCorrespondente
      );
    });

    return cargasFiltradas;
  };

  // Função para lidar com a criação de nova carga
  const handleCriarNovaCarga = async (dadosCarga: any) => {
    // Se for transportadora, garantir que a carga seja associada à transportadora
    if (transportadoraLogada) {
      dadosCarga = {
        ...dadosCarga,
        nomeEmpresa: transportadoraLogada.nomeEmpresa,
        transportadora: transportadoraLogada.nomeEmpresa,
        empresaId: transportadoraLogada.transportadoraId,
      };
    }

    const resultado = await criarNovaCarga(dadosCarga);
    if (resultado.success) {
      alert("Carga criada com sucesso!");
      setShowNovaCargaModal(false);
      // Recarregar as cargas
      fetchCargas();
      return true;
    } else {
      alert(`Erro ao criar carga: ${resultado.error}`);
      return false;
    }
  };

  // Determinar quais cargas exibir baseado no modo de visualização
  const cargasParaExibir =
    modoVisualizacao === "transportadora"
      ? filterCargasPorTransportadoraLogada(filteredCargas || [])
      : filteredCargas || [];

  // Função para lidar com aceitação de carga
  const handleAceitarCarga = async (codigo: string) => {
    const sucesso = await aceitarCarga(codigo);
    if (sucesso) {
      alert("Carga aceita com sucesso!");
    } else {
      alert("Erro ao aceitar carga");
    }
  };

  // Função para lidar com atualização de status
  const handleAtualizarStatus = async (codigo: string, status: any) => {
    const sucesso = await atualizarStatus(codigo, status);
    if (sucesso) {
      alert("Status atualizado com sucesso!");
    } else {
      alert("Erro ao atualizar status");
    }
  };

  // Função para lidar com visualização de carga
  const handleVisualizarCarga = async (carga: any) => {
    const detalhes = await visualizarCarga(carga);
    if (detalhes) {
      // Aqui você pode abrir um modal com os detalhes
      console.log("Detalhes da carga:", detalhes);
      // Exemplo: abrir modal ou redirecionar para página de detalhes
      // setShowDetalhesModal(true);
      // setCargaSelecionada(detalhes);
    } else {
      alert("Erro ao carregar detalhes da carga");
    }
  };

  // Função para exportar dados
  const handleExportarDados = (tipo: string) => {
    exportarDados(tipo);
  };

  // Componente Spinner (exemplo)
  const MeuSpinner = ({ size = "md" }: { size?: string }) => (
    <div
      className={`flex justify-center items-center ${
        size === "md" ? "p-8" : "p-4"
      }`}
    >
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-green-500 ${
          size === "sm" ? "h-6 w-6" : size === "md" ? "h-10 w-10" : "h-16 w-16"
        }`}
      ></div>
      <span className="ml-3 text-gray-600 dark:text-gray-300">
        Carregando...
      </span>
    </div>
  );

  return (
    <>
      {/* Seletor de visualização e informação da transportadora */}
      <div className="flex justify-between items-center mb-6">
        {transportadoraLogada && (
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="hidden md:inline">Visualização: </span>
              <select
                value={modoVisualizacao}
                onChange={(e) =>
                  setModoVisualizacao(
                    e.target.value as "todas" | "transportadora"
                  )
                }
                className="ml-2 px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="transportadora">Minhas cargas</option>
                <option value="todas">Todas as cargas</option>
              </select>
            </div>
          </div>
        )}
      </div>


      {/* Mensagem se não houver cargas para a transportadora */}
      {transportadoraLogada &&
        modoVisualizacao === "transportadora" &&
        cargasParaExibir.length === 0 &&
        !isDataLoading && (
          <div className="mb-6 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-800 mb-4">
              <svg
                className="w-6 h-6 text-yellow-600 dark:text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
              Nenhuma carga encontrada para {transportadoraLogada.nomeEmpresa}
            </h3>
            <p className="text-yellow-600 dark:text-yellow-400 mb-4">
              As cargas só aparecem aqui quando a transportadora for definida
              como &quot;{transportadoraLogada.nomeEmpresa}&quot;.
            </p>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4 text-left">
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                Como criar uma carga para sua transportadora:
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span>
                    Clique em &quot;Nova Carga&quot; acima para criar uma nova
                    carga
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span>
                    A transportadora será automaticamente definida como &quot;
                    {transportadoraLogada.nomeEmpresa}&quot;
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span>
                    Verifique se as cargas existentes têm a transportadora
                    correta
                  </span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setModoVisualizacao("todas")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver todas as cargas
            </button>
          </div>
        )}

      {/* Mensagem se não for transportadora */}
      {!transportadoraLogada && user && (
        <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center">
            <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-lg mr-3">
              <svg
                className="w-6 h-6 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <p className="purple-800 dark:purple-300">
                Você está logado como{" "}
                <span className="font-semibold">{user.categoria}</span>. Esta
                visualização é otimizada para transportadoras. Para ver as
                cargas filtradas por transportadora, faça login como
                transportadora.
              </p>
            </div>
          </div>
        </div>
      )}

      <FiltrosCargas
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        tipoFilter={tipoFilter}
        setTipoFilter={setTipoFilter}
        filtrosAvancados={filtrosAvancados}
        setFiltrosAvancados={setFiltrosAvancados}
        filteredCargas={cargasParaExibir} // Usar as cargas filtradas apropriadas
        metrics={metrics}
        isDataLoading={isDataLoading}
        exportarDados={handleExportarDados}
        setShowNovaCargaModal={setShowNovaCargaModal}
        visualizarCarga={handleVisualizarCarga}
        aceitarCarga={handleAceitarCarga}
        atualizarStatus={handleAtualizarStatus}
        Spinner={MeuSpinner}
      />

      {/* Modal para Nova Carga (exemplo) */}
      {showNovaCargaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Nova Carga</h2>
            {/* Formulário para nova carga aqui */}
            <button
              onClick={() => setShowNovaCargaModal(false)}
              className="mt-4 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
