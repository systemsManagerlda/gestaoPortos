/* eslint-disable @typescript-eslint/no-unused-vars */
// Crie um novo arquivo chamado CamiaoDetailsModal.tsx
import { useState, useCallback } from "react";
import { UploadFotosCamiao } from "./UploadFotosCamiao";
import {
  FiX,
  FiTruck,
  FiCalendar,
  FiMapPin,
  FiBarChart2,
  FiShield,
  FiCamera,
  FiWifi,
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiPrinter,
  FiDownload,
  FiUser,
  FiNavigation,
  FiSettings,
  FiFileText,
  FiImage,
  FiVideo,
  FiEye,
} from "react-icons/fi";
import {
  Camiao,
  StatusCamiao,
  TipoCamiao,
  CategoriaInspecao,
  TipoGPS,
  StatusGPS,
} from "./camioes";

interface CamiaoDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  camiao: Camiao | null;
  onEdit?: (camiao: Camiao) => void;
  onAssociateMotorista?: (camiaoId: number) => void;
  onUpdateStatus?: (camiaoId: number, status: StatusCamiao) => void;
  onUpdateGPS?: (camiaoId: number) => void;
}

interface FotoCamiao {
  url: string;
  tipo: "camião" | "gps_instalacao";
  descricao?: string;
  dataUpload: Date;
  nomeArquivo: string;
}

export function CamiaoDetailsModal({
  isOpen,
  onClose,
  camiao,
  onEdit,
  onAssociateMotorista,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onUpdateStatus,
  onUpdateGPS,
}: CamiaoDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("geral");

  if (!isOpen || !camiao) return null;

  // Funções auxiliares para formatação e estilos
  const getStatusColor = (status: StatusCamiao) => {
    const statusColors: Record<StatusCamiao, string> = {
      disponivel: "bg-green-100 text-green-800 border-green-200",
      em_viagem: "bg-blue-100 text-blue-800 border-blue-200",
      manutencao: "bg-yellow-100 text-yellow-800 border-yellow-200",
      inativo: "bg-gray-100 text-gray-800 border-gray-200",
      reservado: "bg-purple-100 text-purple-800 border-purple-200",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusText = (status: StatusCamiao) => {
    const statusMap: Record<StatusCamiao, string> = {
      disponivel: "Disponível",
      em_viagem: "Em Viagem",
      manutencao: "Em Manutenção",
      inativo: "Inativo",
      reservado: "Reservado",
    };
    return statusMap[status];
  };

  const getCategoriaColor = (categoria: CategoriaInspecao) => {
    const categoriaColors: Record<CategoriaInspecao, string> = {
      A: "bg-red-100 text-red-800 border-red-200",
      B: "bg-orange-100 text-orange-800 border-orange-200",
      C: "bg-green-100 text-green-800 border-green-200",
    };
    return (
      categoriaColors[categoria] || "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  const getCategoriaText = (categoria: CategoriaInspecao) => {
    const categoriaMap: Record<CategoriaInspecao, string> = {
      A: "Chanté",
      B: "Nacional",
      C: "Trânsito",
    };
    return categoriaMap[categoria];
  };

  const getTipoCamiaoText = (tipo: TipoCamiao) => {
    const tipoMap: Record<TipoCamiao, string> = {
      rigido: "Rígido",
      articulado: "Articulado",
      reboque: "Reboque",
      tanque: "Tanque",
      frigorifico: "Frigorífico",
    };
    return tipoMap[tipo];
  };

  const getTipoGPSText = (tipo: TipoGPS) => {
    const tipoMap: Record<TipoGPS, string> = {
      normal: "GPS Normal",
      vip: "GPS VIP",
    };
    return tipoMap[tipo];
  };

  const getTipoGPSColor = (tipo: TipoGPS) => {
    const tipoColors: Record<TipoGPS, string> = {
      normal: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      vip: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    };
    return (
      tipoColors[tipo] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    );
  };

  const getGPSStatusColor = (status: StatusGPS) => {
    const statusColors: Record<StatusGPS, string> = {
      ativo:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      inativo: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
      pendente:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      expirado: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return (
      statusColors[status] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    );
  };

  const getEstadoColor = (estado: string) => {
    const estadoColors: Record<string, string> = {
      novo: "bg-green-100 text-green-800",
      seminovo: "bg-blue-100 text-blue-800",
      usado: "bg-yellow-100 text-yellow-800",
      recondicionado: "bg-purple-100 text-purple-800",
    };
    return estadoColors[estado] || "bg-gray-100 text-gray-800";
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-MZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatarNumero = (numero: number) => {
    return new Intl.NumberFormat("pt-MZ").format(numero);
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
    }).format(valor);
  };

  const formatarPeso = (peso: number) => {
    if (peso >= 1000) {
      return `${(peso / 1000).toFixed(1)} ton`;
    }
    return `${peso} kg`;
  };

  const isDocumentoVencido = (validade: string) => {
    return new Date(validade) < new Date();
  };

  const isDocumentoProximoVencimento = (validade: string) => {
    const hoje = new Date();
    const validadeDate = new Date(validade);
    const diffTime = validadeDate.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  // Calcular idade do camião
  const calcularIdade = () => {
    const hoje = new Date();
    return hoje.getFullYear() - camiao.anoFabricacao;
  };

  // Verificar se inspeção está próxima
  const isInspecaoProxima = () => {
    if (!camiao.nivelInspecao.dataProximaInspecao) return false;
    const hoje = new Date();
    const proximaInspecao = new Date(camiao.nivelInspecao.dataProximaInspecao);
    const diffTime = proximaInspecao.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  // Renderizar conteúdo baseado na aba ativa
  const renderTabContent = () => {
    switch (activeTab) {
      case "geral":
        return <GeralTab camiao={camiao} />;
      case "gps":
        return <GPSTab camiao={camiao} />;
      case "especificacoes":
        return <EspecificacoesTab camiao={camiao} />;
      case "documentos":
        return <DocumentosTab camiao={camiao} />;
      case "manutencao":
        return <ManutencaoTab camiao={camiao} />;
      case "historico":
        return <HistoricoTab camiao={camiao} />;
      case "fotos":
        return <FotosTab camiao={camiao} />;
      default:
        return <GeralTab camiao={camiao} />;
    }
  };

  // Componentes das abas
  const GeralTab = ({ camiao }: { camiao: Camiao }) => (
    <div className="space-y-6">
      {/* Informações Básicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <FiTruck className="w-5 h-5 mr-2 text-blue-600" />
            Informações do Camião
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Matrícula:
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {camiao.matricula}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Marca/Modelo:
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {camiao.marca} {camiao.modelo}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Ano:
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {camiao.anoFabricacao} ({calcularIdade()} anos)
              </span>
            </div>

            {camiao.cor && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Cor:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {camiao.cor}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Estado:
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(
                  camiao.estado.tipo
                )}`}
              >
                {camiao.estado.tipo.charAt(0).toUpperCase() +
                  camiao.estado.tipo.slice(1)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Código GPS:
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {camiao.codigoGPS}
              </span>
            </div>
          </div>
        </div>

        {/* Status e Categoria */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <FiShield className="w-5 h-5 mr-2 text-green-600" />
            Status e Categoria
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Status:
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                  camiao.status
                )}`}
              >
                {getStatusText(camiao.status)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Categoria:
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoriaColor(
                  camiao.nivelInspecao.categoria
                )}`}
              >
                {getCategoriaText(camiao.nivelInspecao.categoria)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Tipo GPS:
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTipoGPSColor(
                  camiao.tipoGPS.tipo
                )}`}
              >
                {getTipoGPSText(camiao.tipoGPS.tipo)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Status GPS:
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGPSStatusColor(
                  camiao.tipoGPS.status
                )}`}
              >
                {camiao.tipoGPS.status.charAt(0).toUpperCase() +
                  camiao.tipoGPS.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Viabilidade Operacional */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiNavigation className="w-5 h-5 mr-2 text-purple-600" />
          Viabilidade Operacional
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
                camiao.viabilidade.podeChante
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <FiTruck className="w-6 h-6" />
            </div>
            <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              Chanté
            </div>
            <div
              className={`text-xs ${
                camiao.viabilidade.podeChante
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {camiao.viabilidade.podeChante ? "Permitido" : "Não Permitido"}
            </div>
          </div>

          <div className="text-center">
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
                camiao.viabilidade.podeNacional
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <FiMapPin className="w-6 h-6" />
            </div>
            <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              Nacional
            </div>
            <div
              className={`text-xs ${
                camiao.viabilidade.podeNacional
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {camiao.viabilidade.podeNacional ? "Permitido" : "Não Permitido"}
            </div>
          </div>

          <div className="text-center">
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
                camiao.viabilidade.podeTransito
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <FiNavigation className="w-6 h-6" />
            </div>
            <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              Trânsito
            </div>
            <div
              className={`text-xs ${
                camiao.viabilidade.podeTransito
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {camiao.viabilidade.podeTransito ? "Permitido" : "Não Permitido"}
            </div>
          </div>

          <div className="text-center">
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
                camiao.viabilidade.podeGPSVip
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <FiWifi className="w-6 h-6" />
            </div>
            <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              GPS VIP
            </div>
            <div
              className={`text-xs ${
                camiao.viabilidade.podeGPSVip
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {camiao.viabilidade.podeGPSVip ? "Elegível" : "Não Elegível"}
            </div>
          </div>
        </div>

        {camiao.viabilidade.motivos.length > 0 && (
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
              Observações:
            </h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              {camiao.viabilidade.motivos.map((motivo, index) => (
                <li key={index}>• {motivo}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Disponibilidade */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiMapPin className="w-5 h-5 mr-2 text-blue-600" />
          Disponibilidade
        </h3>

        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Tipos de Serviço:
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {camiao.disponibilidade.tipoServico.map((servico, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800"
                >
                  {servico}
                </span>
              ))}
            </div>
          </div>

          {camiao.disponibilidade.regioes.length > 0 && (
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Regiões:
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {camiao.disponibilidade.regioes.map((regiao, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-green-100 text-green-800"
                  >
                    {regiao}
                  </span>
                ))}
              </div>
            </div>
          )}

          {camiao.disponibilidade.observacoes && (
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Observações:
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {camiao.disponibilidade.observacoes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const GPSTab = ({ camiao }: { camiao: Camiao }) => (
    <div className="space-y-6">
      {/* Informações do GPS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <FiWifi className="w-5 h-5 mr-2 text-blue-600" />
            Informações do GPS
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Código GPS:
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {camiao.codigoGPS}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Tipo:
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTipoGPSColor(
                  camiao.tipoGPS.tipo
                )}`}
              >
                {getTipoGPSText(camiao.tipoGPS.tipo)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Status:
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGPSStatusColor(
                  camiao.tipoGPS.status
                )}`}
              >
                {camiao.tipoGPS.status.charAt(0).toUpperCase() +
                  camiao.tipoGPS.status.slice(1)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Valor Registro:
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {formatarMoeda(camiao.tipoGPS.valorRegistro)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Data Ativação:
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {formatarData(camiao.tipoGPS.dataAtivacao)}
              </span>
            </div>

            {camiao.tipoGPS.dataExpiracao && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Data Expiração:
                </span>
                <span
                  className={`text-sm font-medium flex items-center ${
                    isDocumentoVencido(camiao.tipoGPS.dataExpiracao)
                      ? "text-red-600"
                      : isDocumentoProximoVencimento(
                          camiao.tipoGPS.dataExpiracao
                        )
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {formatarData(camiao.tipoGPS.dataExpiracao)}
                  {(isDocumentoVencido(camiao.tipoGPS.dataExpiracao) ||
                    isDocumentoProximoVencimento(
                      camiao.tipoGPS.dataExpiracao
                    )) && <FiAlertTriangle className="w-4 h-4 ml-1" />}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Recursos VIP */}
        {camiao.tipoGPS.tipo === "vip" && camiao.gpsVip && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <FiCamera className="w-5 h-5 mr-2 text-purple-600" />
              Recursos VIP
            </h3>

            <div className="space-y-3">
              {/* Câmera */}
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                  <FiCamera className="w-4 h-4 mr-2" />
                  Câmera
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Possui:
                    </span>
                    <span
                      className={
                        camiao.gpsVip.camera.possui
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {camiao.gpsVip.camera.possui ? "Sim" : "Não"}
                    </span>
                  </div>
                  {camiao.gpsVip.camera.modelo && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Modelo:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {camiao.gpsVip.camera.modelo}
                      </span>
                    </div>
                  )}
                  {camiao.gpsVip.camera.resolucao && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Resolução:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {camiao.gpsVip.camera.resolucao}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Status:
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                        camiao.gpsVip.camera.status === "operacional"
                          ? "bg-green-100 text-green-800"
                          : camiao.gpsVip.camera.status === "manutencao"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {camiao.gpsVip.camera.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Controle Motorista */}
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                  <FiUser className="w-4 h-4 mr-2" />
                  Controle Motorista
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Possui:
                    </span>
                    <span
                      className={
                        camiao.gpsVip.controleMotorista.possui
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {camiao.gpsVip.controleMotorista.possui ? "Sim" : "Não"}
                    </span>
                  </div>
                  {camiao.gpsVip.controleMotorista.tipoControle && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Tipo:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {camiao.gpsVip.controleMotorista.tipoControle}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recursos Adicionais */}
      {camiao.tipoGPS.tipo === "vip" && camiao.gpsVip && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <FiBarChart2 className="w-5 h-5 mr-2 text-green-600" />
            Recursos Adicionais
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(camiao.gpsVip.recursosAdicionais).map(
              ([recurso, ativo]) => (
                <div key={recurso} className="flex items-center space-x-2">
                  {ativo ? (
                    <FiCheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  )}
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                    {recurso.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );

  const EspecificacoesTab = ({ camiao }: { camiao: Camiao }) => (
    <div className="space-y-6">
      {/* Especificações Técnicas */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiTruck className="w-5 h-5 mr-2 text-blue-600" />
          Especificações Técnicas
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
              <FiTruck className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {getTipoCamiaoText(camiao.especificacoes.tipo)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Tipo</div>
          </div>

          <div className="text-center">
            <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-green-600">
                {camiao.especificacoes.numEixos}
              </span>
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {camiao.especificacoes.numEixos} Eixos
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Número de Eixos
            </div>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-lg font-bold text-purple-600">
                {formatarNumero(camiao.especificacoes.pesoBruto / 1000)}
              </span>
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {formatarPeso(camiao.especificacoes.pesoBruto)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Peso Bruto
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">
              Tara (Peso Vazio):
            </span>
            <div className="font-medium text-gray-900 dark:text-white">
              {formatarPeso(camiao.especificacoes.tara)}
            </div>
          </div>

          <div>
            <span className="text-gray-600 dark:text-gray-400">
              Carga Útil:
            </span>
            <div className="font-medium text-gray-900 dark:text-white">
              {formatarPeso(camiao.especificacoes.cargaUtil)}
            </div>
          </div>

          {camiao.especificacoes.comprimento && (
            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Comprimento:
              </span>
              <div className="font-medium text-gray-900 dark:text-white">
                {camiao.especificacoes.comprimento} m
              </div>
            </div>
          )}

          {camiao.especificacoes.largura && (
            <div>
              <span className="text-gray-600 dark:text-gray-400">Largura:</span>
              <div className="font-medium text-gray-900 dark:text-white">
                {camiao.especificacoes.largura} m
              </div>
            </div>
          )}

          {camiao.especificacoes.altura && (
            <div>
              <span className="text-gray-600 dark:text-gray-400">Altura:</span>
              <div className="font-medium text-gray-900 dark:text-white">
                {camiao.especificacoes.altura} m
              </div>
            </div>
          )}

          {camiao.especificacoes.volumeUtil && (
            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Volume Útil:
              </span>
              <div className="font-medium text-gray-900 dark:text-white">
                {formatarNumero(camiao.especificacoes.volumeUtil)} m³
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const DocumentosTab = ({ camiao }: { camiao: Camiao }) => (
    <div className="space-y-6">
      {/* Seguro */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiShield className="w-5 h-5 mr-2 text-blue-600" />
          Seguro
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">
              Número Apólice:
            </span>
            <div className="font-medium text-gray-900 dark:text-white">
              {camiao.documentacao.seguro.numeroApolice}
            </div>
          </div>

          <div>
            <span className="text-gray-600 dark:text-gray-400">
              Seguradora:
            </span>
            <div className="font-medium text-gray-900 dark:text-white">
              {camiao.documentacao.seguro.seguradora}
            </div>
          </div>

          <div>
            <span className="text-gray-600 dark:text-gray-400">
              Data Emissão:
            </span>
            <div className="font-medium text-gray-900 dark:text-white">
              {formatarData(camiao.documentacao.seguro.dataEmissao)}
            </div>
          </div>

          <div>
            <span className="text-gray-600 dark:text-gray-400">
              Data Validade:
            </span>
            <div
              className={`font-medium flex items-center ${
                isDocumentoVencido(camiao.documentacao.seguro.dataValidade)
                  ? "text-red-600"
                  : isDocumentoProximoVencimento(
                      camiao.documentacao.seguro.dataValidade
                    )
                  ? "text-orange-600"
                  : "text-green-600"
              }`}
            >
              {formatarData(camiao.documentacao.seguro.dataValidade)}
              {(isDocumentoVencido(camiao.documentacao.seguro.dataValidade) ||
                isDocumentoProximoVencimento(
                  camiao.documentacao.seguro.dataValidade
                )) && <FiAlertTriangle className="w-4 h-4 ml-1" />}
            </div>
          </div>

          {camiao.documentacao.seguro.cobertura && (
            <div className="md:col-span-2">
              <span className="text-gray-600 dark:text-gray-400">
                Cobertura:
              </span>
              <div className="font-medium text-gray-900 dark:text-white">
                {camiao.documentacao.seguro.cobertura}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Licença de Operação */}
      {camiao.documentacao.licencaOperacao && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <FiFileText className="w-5 h-5 mr-2 text-green-600" />
            Licença de Operação
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Número:</span>
              <div className="font-medium text-gray-900 dark:text-white">
                {camiao.documentacao.licencaOperacao.numero}
              </div>
            </div>

            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Categoria:
              </span>
              <div className="font-medium text-gray-900 dark:text-white">
                {camiao.documentacao.licencaOperacao.categoria}
              </div>
            </div>

            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Data Emissão:
              </span>
              <div className="font-medium text-gray-900 dark:text-white">
                {formatarData(camiao.documentacao.licencaOperacao.dataEmissao)}
              </div>
            </div>

            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Data Validade:
              </span>
              <div
                className={`font-medium flex items-center ${
                  isDocumentoVencido(
                    camiao.documentacao.licencaOperacao.dataValidade
                  )
                    ? "text-red-600"
                    : isDocumentoProximoVencimento(
                        camiao.documentacao.licencaOperacao.dataValidade
                      )
                    ? "text-orange-600"
                    : "text-green-600"
                }`}
              >
                {formatarData(camiao.documentacao.licencaOperacao.dataValidade)}
                {(isDocumentoVencido(
                  camiao.documentacao.licencaOperacao.dataValidade
                ) ||
                  isDocumentoProximoVencimento(
                    camiao.documentacao.licencaOperacao.dataValidade
                  )) && <FiAlertTriangle className="w-4 h-4 ml-1" />}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certificado GPS */}
      {camiao.documentacao.certificadoGPS && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <FiWifi className="w-5 h-5 mr-2 text-purple-600" />
            Certificado GPS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Número:</span>
              <div className="font-medium text-gray-900 dark:text-white">
                {camiao.documentacao.certificadoGPS.numero}
              </div>
            </div>

            <div>
              <span className="text-gray-600 dark:text-gray-400">Tipo:</span>
              <div className="font-medium text-gray-900 dark:text-white">
                {camiao.documentacao.certificadoGPS.tipo.toUpperCase()}
              </div>
            </div>

            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Data Emissão:
              </span>
              <div className="font-medium text-gray-900 dark:text-white">
                {formatarData(camiao.documentacao.certificadoGPS.dataEmissao)}
              </div>
            </div>

            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Data Validade:
              </span>
              <div
                className={`font-medium flex items-center ${
                  isDocumentoVencido(
                    camiao.documentacao.certificadoGPS.dataValidade
                  )
                    ? "text-red-600"
                    : isDocumentoProximoVencimento(
                        camiao.documentacao.certificadoGPS.dataValidade
                      )
                    ? "text-orange-600"
                    : "text-green-600"
                }`}
              >
                {formatarData(camiao.documentacao.certificadoGPS.dataValidade)}
                {(isDocumentoVencido(
                  camiao.documentacao.certificadoGPS.dataValidade
                ) ||
                  isDocumentoProximoVencimento(
                    camiao.documentacao.certificadoGPS.dataValidade
                  )) && <FiAlertTriangle className="w-4 h-4 ml-1" />}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const ManutencaoTab = ({ camiao }: { camiao: Camiao }) => (
    <div className="space-y-6">
      {/* Manutenção do Veículo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <FiSettings className="w-5 h-5 mr-2 text-blue-600" />
            Manutenção do Veículo
          </h3>

          <div className="space-y-2">
            {camiao.manutencao?.ultimaManutencao && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Última Manutenção:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatarData(camiao.manutencao.ultimaManutencao)}
                </span>
              </div>
            )}

            {camiao.manutencao?.kmUltimaManutencao && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  KM Última Manutenção:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatarNumero(camiao.manutencao.kmUltimaManutencao)} km
                </span>
              </div>
            )}

            {camiao.manutencao?.proximaManutencao && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Próxima Manutenção:
                </span>
                <span
                  className={`text-sm font-medium flex items-center ${
                    isDocumentoVencido(camiao.manutencao.proximaManutencao)
                      ? "text-red-600"
                      : isDocumentoProximoVencimento(
                          camiao.manutencao.proximaManutencao
                        )
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {formatarData(camiao.manutencao.proximaManutencao)}
                  {(isDocumentoVencido(camiao.manutencao.proximaManutencao) ||
                    isDocumentoProximoVencimento(
                      camiao.manutencao.proximaManutencao
                    )) && <FiAlertTriangle className="w-4 h-4 ml-1" />}
                </span>
              </div>
            )}

            {camiao.manutencao?.periodicidadeManutencao && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Periodicidade:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  A cada{" "}
                  {formatarNumero(camiao.manutencao.periodicidadeManutencao)} km
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Manutenção do GPS */}
        {camiao.manutencao?.manutencaoGPS && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <FiWifi className="w-5 h-5 mr-2 text-green-600" />
              Manutenção do GPS
            </h3>

            <div className="space-y-2">
              {camiao.manutencao.manutencaoGPS.ultimaManutencao && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Última Manutenção:
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatarData(
                      camiao.manutencao.manutencaoGPS.ultimaManutencao
                    )}
                  </span>
                </div>
              )}

              {camiao.manutencao.manutencaoGPS.proximaManutencao && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Próxima Manutenção:
                  </span>
                  <span
                    className={`text-sm font-medium flex items-center ${
                      isDocumentoVencido(
                        camiao.manutencao.manutencaoGPS.proximaManutencao
                      )
                        ? "text-red-600"
                        : isDocumentoProximoVencimento(
                            camiao.manutencao.manutencaoGPS.proximaManutencao
                          )
                        ? "text-orange-600"
                        : "text-green-600"
                    }`}
                  >
                    {formatarData(
                      camiao.manutencao.manutencaoGPS.proximaManutencao
                    )}
                    {(isDocumentoVencido(
                      camiao.manutencao.manutencaoGPS.proximaManutencao
                    ) ||
                      isDocumentoProximoVencimento(
                        camiao.manutencao.manutencaoGPS.proximaManutencao
                      )) && <FiAlertTriangle className="w-4 h-4 ml-1" />}
                  </span>
                </div>
              )}

              {camiao.manutencao.manutencaoGPS.observacoes && (
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Observações:
                  </span>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {camiao.manutencao.manutencaoGPS.observacoes}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Inspeção */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiShield className="w-5 h-5 mr-2 text-orange-600" />
          Inspeção
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Categoria:</span>
            <div className="font-medium text-gray-900 dark:text-white">
              {getCategoriaText(camiao.nivelInspecao.categoria)}
            </div>
          </div>

          <div>
            <span className="text-gray-600 dark:text-gray-400">
              Resultado Última Inspeção:
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                camiao.nivelInspecao.resultadoUltimaInspecao === "aprovado"
                  ? "bg-green-100 text-green-800"
                  : camiao.nivelInspecao.resultadoUltimaInspecao ===
                    "aprovado_com_ressalvas"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {camiao.nivelInspecao.resultadoUltimaInspecao.replace("_", " ")}
            </span>
          </div>

          <div>
            <span className="text-gray-600 dark:text-gray-400">
              Última Inspeção:
            </span>
            <div className="font-medium text-gray-900 dark:text-white">
              {formatarData(camiao.nivelInspecao.dataUltimaInspecao)}
            </div>
          </div>

          {camiao.nivelInspecao.dataProximaInspecao && (
            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Próxima Inspeção:
              </span>
              <div
                className={`font-medium flex items-center ${
                  isInspecaoProxima() ? "text-orange-600" : "text-green-600"
                }`}
              >
                {formatarData(camiao.nivelInspecao.dataProximaInspecao)}
                {isInspecaoProxima() && (
                  <FiAlertTriangle className="w-4 h-4 ml-1" />
                )}
              </div>
            </div>
          )}

          {camiao.nivelInspecao.centroInspecao && (
            <div className="md:col-span-2">
              <span className="text-gray-600 dark:text-gray-400">
                Centro de Inspeção:
              </span>
              <div className="font-medium text-gray-900 dark:text-white">
                {camiao.nivelInspecao.centroInspecao}
              </div>
            </div>
          )}

          {camiao.nivelInspecao.observacoes && (
            <div className="md:col-span-2">
              <span className="text-gray-600 dark:text-gray-400">
                Observações:
              </span>
              <div className="font-medium text-gray-900 dark:text-white">
                {camiao.nivelInspecao.observacoes}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const HistoricoTab = ({ camiao }: { camiao: Camiao }) => (
    <div className="space-y-6">
      {/* Estatísticas de Utilização */}
      {camiao.historicoUtilizacao && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
              <FiMapPin className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatarNumero(camiao.historicoUtilizacao.totalKmPercorridos)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total KM
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
              <FiTruck className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatarNumero(camiao.historicoUtilizacao.totalViagens)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Viagens
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
              <FiWifi className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatarNumero(
                  camiao.historicoUtilizacao.viagensComGPSVip || 0
                )}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Viagens VIP
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
              <FiClock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatarNumero(
                  camiao.historicoUtilizacao.totalHorasMonitoradas || 0
                )}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Horas Monitoradas
              </div>
            </div>
          </div>

          {/* Consumo */}
          {camiao.historicoUtilizacao.consumoMedio && (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FiBarChart2 className="w-5 h-5 mr-2 text-green-600" />
                Desempenho
              </h3>

              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {camiao.historicoUtilizacao.consumoMedio.toFixed(1)} km/l
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Consumo Médio
                </div>
              </div>
            </div>
          )}

          {/* Datas Importantes */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FiCalendar className="w-5 h-5 mr-2 text-blue-600" />
              Datas Importantes
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {camiao.historicoUtilizacao.dataPrimeiraUtilizacao && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400">
                    Primeira Utilização:
                  </span>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {formatarData(
                      camiao.historicoUtilizacao.dataPrimeiraUtilizacao
                    )}
                  </div>
                </div>
              )}

              {camiao.historicoUtilizacao.dataUltimaUtilizacao && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400">
                    Última Utilização:
                  </span>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {formatarData(
                      camiao.historicoUtilizacao.dataUltimaUtilizacao
                    )}
                  </div>
                </div>
              )}

              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  Data Criação:
                </span>
                <div className="font-medium text-gray-900 dark:text-white">
                  {formatarData(camiao.dataCriacao)}
                </div>
              </div>

              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  Última Atualização:
                </span>
                <div className="font-medium text-gray-900 dark:text-white">
                  {formatarData(camiao.dataAtualizacao)}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
  const FotosTab = ({ camiao }: { camiao: Camiao }) => {
    const limparUrlFoto = (url: string): string => {
      if (!url) return "";

      // Remove aspas duplas do início e fim
      let urlLimpa = url.replace(/^"+|"+$/g, "");

      // Remove espaços em branco
      urlLimpa = urlLimpa.trim();

      // Corrige possível erro de barra dupla após https:
      urlLimpa = urlLimpa.replace("https:/", "https://");

      return urlLimpa;
    };
    const [fotos, setFotos] = useState<string[]>(() =>
      (camiao.fotos || []).map((url) => limparUrlFoto(url))
    );
    const [fotosGPS, setFotosGPS] = useState<string[]>(() =>
      (camiao.fotosGPS || []).map((url) => limparUrlFoto(url))
    );

    // Função para limpar URLs (remove aspas e espaços)
    

    const handleUploadComplete = useCallback((novasFotos: FotoCamiao[]) => {
      const novasFotosCamiao = novasFotos
        .filter((f) => f.tipo === "camião")
        .map((f) => limparUrlFoto(f.url));

      const novasFotosGPS = novasFotos
        .filter((f) => f.tipo === "gps_instalacao")
        .map((f) => limparUrlFoto(f.url));

      setFotos((prev) => [...prev, ...novasFotosCamiao]);
      setFotosGPS((prev) => [...prev, ...novasFotosGPS]);

      console.log("Fotos atualizadas:", { novasFotosCamiao, novasFotosGPS });
    }, []);

    // Função para verificar se a URL é válida
    const urlValida = (url: string): boolean => {
      if (!url) return false;

      try {
        const urlLimpa = limparUrlFoto(url);
        return urlLimpa.startsWith("http") && urlLimpa.includes(".");
      } catch {
        return false;
      }
    };

    // Função para obter URL segura para exibição
    const getUrlSegura = (url: string): string => {
      const urlLimpa = limparUrlFoto(url);

      // Se não for uma URL válida, retorna uma imagem placeholder
      if (!urlValida(urlLimpa)) {
        return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTVlNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjNlbSIgZmlsbD0iIzk5OSI+U2VtIEZvdG88L3RleHQ+PC9zdmc+";
      }

      return urlLimpa;
    };

    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Gestão de Fotos do Camião
          </h3>

          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <FiCamera className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="font-medium text-gray-900 dark:text-white">
                  Fotos do Camião
                </span>
              </div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {fotos.filter((url) => urlValida(url)).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Exterior, interior, motor, etc.
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <FiVideo className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="font-medium text-gray-900 dark:text-white">
                  Fotos GPS
                </span>
              </div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {fotosGPS.filter((url) => urlValida(url)).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Instalação e manutenção
              </div>
            </div>
          </div>

          <UploadFotosCamiao
            camiaoId={camiao.camiaoId}
            matricula={camiao.matricula}
            onUploadComplete={handleUploadComplete}
            fotosExistentes={fotos}
            fotosGPSExistentes={fotosGPS}
          />
        </div>

        {(fotos.length > 0 || fotosGPS.length > 0) && (
          <div className="space-y-6">
            {fotos.filter((url) => urlValida(url)).length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FiCamera className="w-4 h-4 mr-2 text-blue-600" />
                  Fotos Existentes do Camião (
                  {fotos.filter((url) => urlValida(url)).length})
                </h4>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {fotos.map((url, index) => {
                    if (!urlValida(url)) return null;

                    const urlSegura = getUrlSegura(url);

                    return (
                      <div key={index} className="relative group">
                        <img
                          src={urlSegura}
                          alt={`Foto do camião ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                          onError={(e) => {
                            // Fallback em caso de erro no carregamento
                            e.currentTarget.src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTVlNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjNlbSIgZmlsbD0iIzk5OSI+RnRvIEVycm88L3RleHQ+PC9zdmc+";
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => {
                              const urlLimpa = limparUrlFoto(url);
                              if (urlValida(urlLimpa)) {
                                window.open(urlLimpa, "_blank");
                              }
                            }}
                            className="p-1 bg-white rounded-full hover:bg-gray-100 transition-colors"
                            title="Visualizar"
                          >
                            <FiEye className="w-4 h-4 text-gray-700" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {fotosGPS.filter((url) => urlValida(url)).length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FiVideo className="w-4 h-4 mr-2 text-purple-600" />
                  Fotos Existentes da Instalação GPS (
                  {fotosGPS.filter((url) => urlValida(url)).length})
                </h4>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {fotosGPS.map((url, index) => {
                    if (!urlValida(url)) return null;

                    const urlSegura = getUrlSegura(url);

                    return (
                      <div key={index} className="relative group">
                        <img
                          src={urlSegura}
                          alt={`Foto GPS ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTVlNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjNlbSIgZmlsbD0iIzk5OSI+RnRvIEVycm88L3RleHQ+PC9zdmc+";
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => {
                              const urlLimpa = limparUrlFoto(url);
                              if (urlValida(urlLimpa)) {
                                window.open(urlLimpa, "_blank");
                              }
                            }}
                            className="p-1 bg-white rounded-full hover:bg-gray-100 transition-colors"
                            title="Visualizar"
                          >
                            <FiEye className="w-4 h-4 text-gray-700" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Modal */}
        <div className="relative inline-block w-full max-w-6xl my-8 overflow-hidden text-left align-middle bg-white dark:bg-gray-800 rounded-2xl shadow-xl transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <FiTruck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {camiao.marca} {camiao.modelo}
                </h2>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {camiao.matricula}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      camiao.status
                    )}`}
                  >
                    {getStatusText(camiao.status)}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoriaColor(
                      camiao.nivelInspecao.categoria
                    )}`}
                  >
                    {getCategoriaText(camiao.nivelInspecao.categoria)}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ID: {camiao.camiaoId}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(camiao)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiTruck className="w-4 h-4" />
                  <span>Editar</span>
                </button>
              )}

              {onAssociateMotorista && camiao.status === "disponivel" && (
                <button
                  onClick={() => onAssociateMotorista(camiao.camiaoId)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FiUser className="w-4 h-4" />
                  <span>Motorista</span>
                </button>
              )}

              {onUpdateGPS && (
                <button
                  onClick={() => onUpdateGPS(camiao.camiaoId)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <FiWifi className="w-4 h-4" />
                  <span>GPS</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "geral", label: "Geral", icon: FiTruck },
                { id: "gps", label: "GPS", icon: FiWifi },
                {
                  id: "especificacoes",
                  label: "Especificações",
                  icon: FiSettings,
                },
                { id: "documentos", label: "Documentos", icon: FiFileText },
                { id: "manutencao", label: "Manutenção", icon: FiSettings },
                { id: "historico", label: "Histórico", icon: FiCalendar },
                { id: "fotos", label: "Fotos", icon: FiImage },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {renderTabContent()}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Criado em {formatarData(camiao.dataCriacao)} • Atualizado em{" "}
              {formatarData(camiao.dataAtualizacao)}
            </div>

            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <FiPrinter className="w-4 h-4" />
                <span>Imprimir</span>
              </button>

              <button className="flex items-center space-x-2 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <FiDownload className="w-4 h-4" />
                <span>Exportar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
