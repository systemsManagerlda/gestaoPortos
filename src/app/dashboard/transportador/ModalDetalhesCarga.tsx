import {
  FiX,
  FiPackage,
  FiTruck,
  FiMapPin,
  FiCalendar,
  FiUser,
  FiNavigation,
  FiFileText,
  FiAlertCircle,
} from "react-icons/fi";// Ajuste o import conforme necessário
import { Carga, StatusCarga } from "../cliente/cargaService";
import { PrioridadeCarga } from "./viagens";

interface ModalDetalhesCargaProps {
  carga: Carga | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ModalDetalhesCarga({
  carga,
  isOpen,
  onClose,
}: ModalDetalhesCargaProps) {
  if (!isOpen || !carga) return null;

  // Funções auxiliares
  const getStatusColor = (status: StatusCarga) => {
    const statusColors = {
      planeada: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
      aguardando_coleta:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      coletada:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      em_transito:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      em_fronteira:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      aguardando_desembaraco:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
      em_entrega:
        "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      entregue:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      encerrada:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      armazenada:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    };
    return (
      statusColors[status] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    );
  };

  const getPrioridadeColor = (prioridade: PrioridadeCarga) => {
    switch (prioridade) {
      case "urgente":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "alta":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "média":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "baixa":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
    }).format(valor);
  };

  const formatarData = (data?: string) => {
    if (!data) return "Não definida";
    return new Date(data).toLocaleDateString("pt-MZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatarPeso = (peso: number) => {
    if (peso >= 1000) {
      return `${(peso / 1000).toFixed(1)} ton`;
    }
    return `${peso} kg`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}

        {/* Modal */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FiPackage className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Detalhes da Carga: {carga.codigo}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-2 flex items-center space-x-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  carga.status
                )}`}
              >
                {carga.status.replace("_", " ").toUpperCase()}
              </span>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPrioridadeColor(
                  carga.prioridade
                )}`}
              >
                {carga.prioridade.toUpperCase()}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Criada em: {formatarData(carga.dataCriacao)}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Coluna 1: Informações básicas */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <FiPackage className="mr-2" /> Informações da Carga
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Código
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
                      {carga.codigo}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Tipo de Carga
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {carga.tipoCarga}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Natureza
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {carga.naturezaCarga}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Descrição
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {carga.descricao}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Peso Bruto
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {formatarPeso(carga.pesoBruto)}
                    </p>
                  </div>

                  {carga.volume && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                        Volume
                      </label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {carga.volume} m³
                      </p>
                    </div>
                  )}

                  {carga.embalagem && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                        Embalagem
                      </label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {carga.embalagem}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Coluna 2: Cliente e Valores */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <FiUser className="mr-2" /> Cliente e Valores
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Cliente
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
                      {carga.cliente}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      ID: {carga.clienteId}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Valor Total
                    </label>
                    <p className="mt-1 text-lg font-semibold text-green-600">
                      {formatarMoeda(carga.valorTotal)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                        Data Coleta
                      </label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {formatarData(carga.dataColeta)}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                        Entrega Prevista
                      </label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {formatarData(carga.dataEntregaPrevista)}
                      </p>
                    </div>

                    {carga.dataEntregaReal && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                          Entrega Real
                        </label>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {formatarData(carga.dataEntregaReal)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Coluna 3: Rota */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <FiMapPin className="mr-2" /> Rota
                </h4>

                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <FiMapPin className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        Origem
                      </span>
                    </div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {carga.origem.cidade}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {carga.origem.local}
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <FiNavigation className="h-6 w-6 text-gray-400 transform rotate-90" />
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <FiMapPin className="h-5 w-5 text-red-600" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        Destino
                      </span>
                    </div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {carga.destino.cidade}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {carga.destino.local}
                    </p>
                  </div>

                  {carga.pontoAtual && (
                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-center space-x-2 mb-1">
                        <FiNavigation className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Posição Atual
                        </span>
                      </div>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {carga.pontoAtual.descricao}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Coord: {carga.pontoAtual.lat.toFixed(4)},{" "}
                        {carga.pontoAtual.lng.toFixed(4)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Coluna 4: Motorista e Veículo */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <FiTruck className="mr-2" /> Transporte
                </h4>

                <div className="space-y-4">
                  {carga.motorista ? (
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <FiUser className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          Motorista
                        </span>
                      </div>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {carga.motorista.nome}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Telefone: {carga.motorista.telefone}
                      </p>
                      {carga.motorista.empresaMotorista && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Empresa: {carga.motorista.empresaMotorista}
                        </p>
                      )}
                      {carga.motorista.empresaMotorista ===
                        carga.nomeEmpresa && (
                        <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Motorista da Empresa
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Nenhum motorista atribuído
                      </p>
                    </div>
                  )}

                  {carga.veiculo ? (
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <FiTruck className="h-5 w-5 text-purple-600" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          Veículo
                        </span>
                      </div>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {carga.veiculo.modelo}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Matrícula: {carga.veiculo.matricula}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Nenhum veículo atribuído
                      </p>
                    </div>
                  )}

                  {/* Documentos */}
                  {carga.documentos && (
                    <div className="mt-4">
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                        <FiFileText className="mr-2" /> Documentos
                      </h5>
                      <div className="space-y-1">
                        {carga.documentos.conhecimentoEmbarque && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Conhecimento:{" "}
                            {carga.documentos.conhecimentoEmbarque}
                          </p>
                        )}
                        {carga.documentos.invoice && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Invoice: {carga.documentos.invoice}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Ocorrências */}
                  {carga.ocorrencias && carga.ocorrencias.length > 0 && (
                    <div className="mt-4">
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                        <FiAlertCircle className="mr-2" /> Ocorrências (
                        {carga.ocorrencias.length})
                      </h5>
                      <div className="space-y-2">
                        {carga.ocorrencias
                          .slice(0, 3)
                          .map((ocorrencia, index) => (
                            <div
                              key={index}
                              className="text-xs bg-red-50 dark:bg-red-900/20 p-2 rounded"
                            >
                              <p className="font-medium text-red-800 dark:text-red-200">
                                {ocorrencia.tipo}
                              </p>
                              <p className="text-red-600 dark:text-red-300">
                                {ocorrencia.descricao}
                              </p>
                            </div>
                          ))}
                        {carga.ocorrencias.length > 3 && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            +{carga.ocorrencias.length - 3} mais ocorrências...
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Timeline do Status */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                <FiCalendar className="mr-2" /> Histórico de Status
              </h4>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                <div className="space-y-4">
                  {[
                    { status: "planeada", descricao: "Carga planeada" },
                    {
                      status: "aguardando_coleta",
                      descricao: "Aguardando coleta",
                    },
                    { status: "coletada", descricao: "Carga coletada" },
                    { status: "em_transito", descricao: "Em trânsito" },
                    { status: "entregue", descricao: "Carga entregue" },
                  ].map((item, index) => {
                    const isCompleted =
                      carga.status === item.status ||
                      (item.status === "entregue" &&
                        carga.status === "encerrada");
                    const isCurrent = carga.status === item.status;

                    return (
                      <div key={index} className="relative flex items-center">
                        <div
                          className={`z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                            isCompleted
                              ? "bg-green-500 text-white"
                              : isCurrent
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="ml-4">
                          <p
                            className={`font-medium ${
                              isCompleted
                                ? "text-green-600 dark:text-green-400"
                                : isCurrent
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {item.descricao}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
            >
              Fechar
            </button>
            <button
              onClick={() => {
                // Aqui você pode implementar impressão ou outras ações
                window.print();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors"
            >
              Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
