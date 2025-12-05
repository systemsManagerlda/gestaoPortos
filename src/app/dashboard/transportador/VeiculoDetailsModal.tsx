// Crie um novo arquivo chamado VeiculoDetailsModal.tsx
import { useState } from "react";
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
  FiFileText,
} from "react-icons/fi";

export interface Veiculo {
  camiaoId: number;
  matricula: string;
  marca: string;
  modelo: string;
  anoFabricacao: number;
  cor?: string;
  transportadoraId: number;
  motoristaId: number;
  codigoGPS: string;
  tipoGPS: {
    tipo: "normal" | "vip";
    descricao: string;
    valorRegistro: number;
    dataAtivacao: string;
    dataExpiracao?: string;
    status: "ativo" | "inativo" | "pendente" | "expirado";
  };
  gpsVip?: {
    camera: {
      possui: boolean;
      modelo?: string;
      resolucao?: string;
      dataInstalacao?: string;
      status: "operacional" | "manutencao" | "defeito";
    };
    controleMotorista: {
      possui: boolean;
      tipoControle?: "biometrico" | "rfid" | "app" | "codigo";
      dataInstalacao?: string;
      ultimaAtualizacao?: string;
    };
    recursosAdicionais: {
      monitoramentoTempoReal: boolean;
      alertasVelocidade: boolean;
      relatoriosDesempenho: boolean;
      geofencing: boolean;
      comunicacaoAudio: boolean;
    };
  };
  especificacoes: {
    tipo: "rigido" | "articulado" | "reboque" | "tanque" | "frigorifico";
    pesoBruto: number;
    tara: number;
    cargaUtil: number;
    comprimento?: number;
    largura?: number;
    altura?: number;
    volumeUtil?: number;
    numEixos: number;
  };
  documentacao: {
    registroComercial?: string;
    seguro: {
      numeroApolice: string;
      seguradora: string;
      dataEmissao: string;
      dataValidade: string;
      cobertura?: string;
    };
    licencaOperacao?: {
      numero: string;
      dataEmissao: string;
      dataValidade: string;
      categoria: string;
    };
    certificadoGPS?: {
      numero: string;
      dataEmissao: string;
      dataValidade: string;
      tipo: "normal" | "vip";
    };
  };
  nivelInspecao: {
    categoria: "A" | "B" | "C";
    descricao: string;
    dataUltimaInspecao: string;
    dataProximaInspecao?: string;
    resultadoUltimaInspecao:
      | "aprovado"
      | "aprovado_com_ressalvas"
      | "reprovado";
    centroInspecao?: string;
    observacoes?: string;
  };
  viabilidade: {
    podeChante: boolean;
    podeNacional: boolean;
    podeTransito: boolean;
    podeGPSVip: boolean;
    motivos: string[];
  };
  manutencao: {
    proximaManutencao?: string;
    ultimaManutencao?: string;
    kmUltimaManutencao?: number;
    periodicidadeManutencao: number;
    manutencaoGPS?: {
      ultimaManutencao?: string;
      proximaManutencao?: string;
      observacoes?: string;
    };
  };
  estado: {
    tipo: "novo" | "seminovo" | "usado" | "recondicionado";
    observacoes?: string;
    dataAvaliacao: string;
  };
  historicoUtilizacao: {
    totalKmPercorridos: number;
    totalViagens: number;
    dataPrimeiraUtilizacao?: string;
    dataUltimaUtilizacao?: string;
    consumoMedio?: number;
    viagensComGPSVip: number;
    totalHorasMonitoradas: number;
  };
  status: "disponivel" | "em_viagem" | "manutencao" | "inativo" | "reservado";
  disponibilidade: {
    tipoServico: string[];
    regioes: string[];
    observacoes?: string;
  };
  dataCriacao: string;
  dataAtualizacao: string;
  observacoes?: string;
  fotos?: string[];
  fotosGPS?: string[];
  // Campos virtuais
  idade?: number;
  inspecaoValida?: boolean;
  gpsVipAtivo?: boolean;
  diasExpiracaoGPS?: number;
}

interface VeiculoDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  veiculo: Veiculo | null;
  onEdit?: (veiculo: Veiculo) => void;
  onAssociateMotorista?: (veiculoId: number) => void;
  onUpdateGPS?: (veiculoId: number) => void;
}

export function VeiculoDetailsModal({
  isOpen,
  onClose,
  veiculo,
  onEdit,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onAssociateMotorista,
  onUpdateGPS,
}: VeiculoDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("geral");

  if (!isOpen || !veiculo) return null;

  // Funções auxiliares para formatação e estilos
  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      disponivel: "bg-green-100 text-green-800 border-green-200",
      em_viagem: "bg-blue-100 text-blue-800 border-blue-200",
      manutencao: "bg-yellow-100 text-yellow-800 border-yellow-200",
      inativo: "bg-gray-100 text-gray-800 border-gray-200",
      reservado: "bg-purple-100 text-purple-800 border-purple-200",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      disponivel: "Disponível",
      em_viagem: "Em Viagem",
      manutencao: "Em Manutenção",
      inativo: "Inativo",
      reservado: "Reservado",
    };
    return statusMap[status] || status;
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "A":
        return "bg-red-100 text-red-800 border-red-200";
      case "B":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "C":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoriaText = (categoria: string) => {
    const categoriaMap: Record<string, string> = {
      A: "Chanté",
      B: "Nacional",
      C: "Trânsito",
    };
    return categoriaMap[categoria] || categoria;
  };

  const getTipoVeiculoText = (tipo: string) => {
    const tipoMap: Record<string, string> = {
      rigido: "Rígido",
      articulado: "Articulado",
      reboque: "Reboque",
      tanque: "Tanque",
      frigorifico: "Frigorífico",
    };
    return tipoMap[tipo] || tipo;
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "novo":
        return "bg-green-100 text-green-800";
      case "seminovo":
        return "bg-blue-100 text-blue-800";
      case "usado":
        return "bg-yellow-100 text-yellow-800";
      case "recondicionado":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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

  // Renderizar conteúdo baseado na aba ativa
  const renderTabContent = () => {
    switch (activeTab) {
      case "geral":
        return <GeralTab veiculo={veiculo} />;
      case "gps":
        return <GPSTab veiculo={veiculo} />;
      case "documentos":
        return <DocumentosTab veiculo={veiculo} />;
      case "especificacoes":
        return <EspecificacoesTab veiculo={veiculo} />;
      case "manutencao":
        return <ManutencaoTab veiculo={veiculo} />;
      case "historico":
        return <HistoricoTab veiculo={veiculo} />;
      default:
        return <GeralTab veiculo={veiculo} />;
    }
  };

  // Componentes das abas
  const GeralTab = ({ veiculo }: { veiculo: Veiculo }) => (
    <div className="space-y-6">
      {/* Informações Básicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <FiTruck className="w-5 h-5 mr-2 text-blue-600" />
            Informações do Veículo
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Matrícula:
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {veiculo.matricula}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Marca/Modelo:
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {veiculo.marca} {veiculo.modelo}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Ano:
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {veiculo.anoFabricacao} ({veiculo.idade} anos)
              </span>
            </div>

            {veiculo.cor && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Cor:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {veiculo.cor}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Estado:
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(
                  veiculo.estado.tipo
                )}`}
              >
                {veiculo.estado.tipo.charAt(0).toUpperCase() +
                  veiculo.estado.tipo.slice(1)}
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
                  veiculo.status
                )}`}
              >
                {getStatusText(veiculo.status)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Categoria:
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoriaColor(
                  veiculo.nivelInspecao.categoria
                )}`}
              >
                {getCategoriaText(veiculo.nivelInspecao.categoria)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Inspeção Válida:
              </span>
              <span
                className={`inline-flex items-center text-sm font-medium ${
                  veiculo.inspecaoValida ? "text-green-600" : "text-red-600"
                }`}
              >
                {veiculo.inspecaoValida ? (
                  <>
                    <FiCheckCircle className="w-4 h-4 mr-1" />
                    Sim
                  </>
                ) : (
                  <>
                    <FiAlertTriangle className="w-4 h-4 mr-1" />
                    Não
                  </>
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Próxima Inspeção:
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {veiculo.nivelInspecao.dataProximaInspecao
                  ? formatarData(veiculo.nivelInspecao.dataProximaInspecao)
                  : "N/A"}
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
                veiculo.viabilidade.podeChante
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
                veiculo.viabilidade.podeChante
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {veiculo.viabilidade.podeChante ? "Permitido" : "Não Permitido"}
            </div>
          </div>

          <div className="text-center">
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
                veiculo.viabilidade.podeNacional
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
                veiculo.viabilidade.podeNacional
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {veiculo.viabilidade.podeNacional ? "Permitido" : "Não Permitido"}
            </div>
          </div>

          <div className="text-center">
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
                veiculo.viabilidade.podeTransito
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
                veiculo.viabilidade.podeTransito
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {veiculo.viabilidade.podeTransito ? "Permitido" : "Não Permitido"}
            </div>
          </div>

          <div className="text-center">
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
                veiculo.viabilidade.podeGPSVip
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
                veiculo.viabilidade.podeGPSVip
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {veiculo.viabilidade.podeGPSVip ? "Elegível" : "Não Elegível"}
            </div>
          </div>
        </div>

        {veiculo.viabilidade.motivos.length > 0 && (
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
              Observações:
            </h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              {veiculo.viabilidade.motivos.map((motivo, index) => (
                <li key={index}>• {motivo}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  const GPSTab = ({ veiculo }: { veiculo: Veiculo }) => (
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
                {veiculo.codigoGPS}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Tipo:
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  veiculo.tipoGPS.tipo === "vip"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {veiculo.tipoGPS.tipo.toUpperCase()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Status:
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  veiculo.tipoGPS.status === "ativo"
                    ? "bg-green-100 text-green-800"
                    : veiculo.tipoGPS.status === "expirado"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {veiculo.tipoGPS.status.charAt(0).toUpperCase() +
                  veiculo.tipoGPS.status.slice(1)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Valor Registro:
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {formatarMoeda(veiculo.tipoGPS.valorRegistro)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Data Ativação:
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {formatarData(veiculo.tipoGPS.dataAtivacao)}
              </span>
            </div>

            {veiculo.tipoGPS.dataExpiracao && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Data Expiração:
                </span>
                <span
                  className={`text-sm font-medium flex items-center ${
                    isDocumentoVencido(veiculo.tipoGPS.dataExpiracao)
                      ? "text-red-600"
                      : isDocumentoProximoVencimento(
                          veiculo.tipoGPS.dataExpiracao
                        )
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {formatarData(veiculo.tipoGPS.dataExpiracao)}
                  {(isDocumentoVencido(veiculo.tipoGPS.dataExpiracao) ||
                    isDocumentoProximoVencimento(
                      veiculo.tipoGPS.dataExpiracao
                    )) && <FiAlertTriangle className="w-4 h-4 ml-1" />}
                </span>
              </div>
            )}

            {veiculo.diasExpiracaoGPS !== undefined && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Dias para Expirar:
                </span>
                <span
                  className={`text-sm font-medium ${
                    veiculo.diasExpiracaoGPS <= 0
                      ? "text-red-600"
                      : veiculo.diasExpiracaoGPS <= 30
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {veiculo.diasExpiracaoGPS} dias
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Recursos VIP */}
        {veiculo.tipoGPS.tipo === "vip" && veiculo.gpsVip && (
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
                        veiculo.gpsVip.camera.possui
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {veiculo.gpsVip.camera.possui ? "Sim" : "Não"}
                    </span>
                  </div>
                  {veiculo.gpsVip.camera.modelo && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Modelo:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {veiculo.gpsVip.camera.modelo}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Status:
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                        veiculo.gpsVip.camera.status === "operacional"
                          ? "bg-green-100 text-green-800"
                          : veiculo.gpsVip.camera.status === "manutencao"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {veiculo.gpsVip.camera.status}
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
                        veiculo.gpsVip.controleMotorista.possui
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {veiculo.gpsVip.controleMotorista.possui ? "Sim" : "Não"}
                    </span>
                  </div>
                  {veiculo.gpsVip.controleMotorista.tipoControle && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Tipo:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {veiculo.gpsVip.controleMotorista.tipoControle}
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
      {veiculo.tipoGPS.tipo === "vip" && veiculo.gpsVip && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <FiBarChart2 className="w-5 h-5 mr-2 text-green-600" />
            Recursos Adicionais
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(veiculo.gpsVip.recursosAdicionais).map(
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

  const DocumentosTab = ({ veiculo }: { veiculo: Veiculo }) => (
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
              {veiculo.documentacao.seguro.numeroApolice}
            </div>
          </div>

          <div>
            <span className="text-gray-600 dark:text-gray-400">
              Seguradora:
            </span>
            <div className="font-medium text-gray-900 dark:text-white">
              {veiculo.documentacao.seguro.seguradora}
            </div>
          </div>

          <div>
            <span className="text-gray-600 dark:text-gray-400">
              Data Emissão:
            </span>
            <div className="font-medium text-gray-900 dark:text-white">
              {formatarData(veiculo.documentacao.seguro.dataEmissao)}
            </div>
          </div>

          <div>
            <span className="text-gray-600 dark:text-gray-400">
              Data Validade:
            </span>
            <div
              className={`font-medium flex items-center ${
                isDocumentoVencido(veiculo.documentacao.seguro.dataValidade)
                  ? "text-red-600"
                  : isDocumentoProximoVencimento(
                      veiculo.documentacao.seguro.dataValidade
                    )
                  ? "text-orange-600"
                  : "text-green-600"
              }`}
            >
              {formatarData(veiculo.documentacao.seguro.dataValidade)}
              {(isDocumentoVencido(veiculo.documentacao.seguro.dataValidade) ||
                isDocumentoProximoVencimento(
                  veiculo.documentacao.seguro.dataValidade
                )) && <FiAlertTriangle className="w-4 h-4 ml-1" />}
            </div>
          </div>

          {veiculo.documentacao.seguro.cobertura && (
            <div className="md:col-span-2">
              <span className="text-gray-600 dark:text-gray-400">
                Cobertura:
              </span>
              <div className="font-medium text-gray-900 dark:text-white">
                {veiculo.documentacao.seguro.cobertura}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Licença de Operação */}
      {veiculo.documentacao.licencaOperacao && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <FiFileText className="w-5 h-5 mr-2 text-green-600" />
            Licença de Operação
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Número:</span>
              <div className="font-medium text-gray-900 dark:text-white">
                {veiculo.documentacao.licencaOperacao.numero}
              </div>
            </div>

            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Categoria:
              </span>
              <div className="font-medium text-gray-900 dark:text-white">
                {veiculo.documentacao.licencaOperacao.categoria}
              </div>
            </div>

            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Data Emissão:
              </span>
              <div className="font-medium text-gray-900 dark:text-white">
                {formatarData(veiculo.documentacao.licencaOperacao.dataEmissao)}
              </div>
            </div>

            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Data Validade:
              </span>
              <div
                className={`font-medium flex items-center ${
                  isDocumentoVencido(
                    veiculo.documentacao.licencaOperacao.dataValidade
                  )
                    ? "text-red-600"
                    : isDocumentoProximoVencimento(
                        veiculo.documentacao.licencaOperacao.dataValidade
                      )
                    ? "text-orange-600"
                    : "text-green-600"
                }`}
              >
                {formatarData(
                  veiculo.documentacao.licencaOperacao.dataValidade
                )}
                {(isDocumentoVencido(
                  veiculo.documentacao.licencaOperacao.dataValidade
                ) ||
                  isDocumentoProximoVencimento(
                    veiculo.documentacao.licencaOperacao.dataValidade
                  )) && <FiAlertTriangle className="w-4 h-4 ml-1" />}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certificado GPS */}
      {veiculo.documentacao.certificadoGPS && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <FiWifi className="w-5 h-5 mr-2 text-purple-600" />
            Certificado GPS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Número:</span>
              <div className="font-medium text-gray-900 dark:text-white">
                {veiculo.documentacao.certificadoGPS.numero}
              </div>
            </div>

            <div>
              <span className="text-gray-600 dark:text-gray-400">Tipo:</span>
              <div className="font-medium text-gray-900 dark:text-white">
                {veiculo.documentacao.certificadoGPS.tipo.toUpperCase()}
              </div>
            </div>

            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Data Emissão:
              </span>
              <div className="font-medium text-gray-900 dark:text-white">
                {formatarData(veiculo.documentacao.certificadoGPS.dataEmissao)}
              </div>
            </div>

            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Data Validade:
              </span>
              <div
                className={`font-medium flex items-center ${
                  isDocumentoVencido(
                    veiculo.documentacao.certificadoGPS.dataValidade
                  )
                    ? "text-red-600"
                    : isDocumentoProximoVencimento(
                        veiculo.documentacao.certificadoGPS.dataValidade
                      )
                    ? "text-orange-600"
                    : "text-green-600"
                }`}
              >
                {formatarData(veiculo.documentacao.certificadoGPS.dataValidade)}
                {(isDocumentoVencido(
                  veiculo.documentacao.certificadoGPS.dataValidade
                ) ||
                  isDocumentoProximoVencimento(
                    veiculo.documentacao.certificadoGPS.dataValidade
                  )) && <FiAlertTriangle className="w-4 h-4 ml-1" />}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const EspecificacoesTab = ({ veiculo }: { veiculo: Veiculo }) => (
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
              {getTipoVeiculoText(veiculo.especificacoes.tipo)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Tipo</div>
          </div>

          <div className="text-center">
            <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-green-600">
                {veiculo.especificacoes.numEixos}
              </span>
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {veiculo.especificacoes.numEixos} Eixos
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Número de Eixos
            </div>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-lg font-bold text-purple-600">
                {formatarNumero(veiculo.especificacoes.pesoBruto / 1000)}
              </span>
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {formatarNumero(veiculo.especificacoes.pesoBruto)} kg
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
              {formatarNumero(veiculo.especificacoes.tara)} kg
            </div>
          </div>

          <div>
            <span className="text-gray-600 dark:text-gray-400">
              Carga Útil:
            </span>
            <div className="font-medium text-gray-900 dark:text-white">
              {formatarNumero(veiculo.especificacoes.cargaUtil)} kg
            </div>
          </div>

          {veiculo.especificacoes.comprimento && (
            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Comprimento:
              </span>
              <div className="font-medium text-gray-900 dark:text-white">
                {veiculo.especificacoes.comprimento} m
              </div>
            </div>
          )}

          {veiculo.especificacoes.largura && (
            <div>
              <span className="text-gray-600 dark:text-gray-400">Largura:</span>
              <div className="font-medium text-gray-900 dark:text-white">
                {veiculo.especificacoes.largura} m
              </div>
            </div>
          )}

          {veiculo.especificacoes.altura && (
            <div>
              <span className="text-gray-600 dark:text-gray-400">Altura:</span>
              <div className="font-medium text-gray-900 dark:text-white">
                {veiculo.especificacoes.altura} m
              </div>
            </div>
          )}

          {veiculo.especificacoes.volumeUtil && (
            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Volume Útil:
              </span>
              <div className="font-medium text-gray-900 dark:text-white">
                {formatarNumero(veiculo.especificacoes.volumeUtil)} m³
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const ManutencaoTab = ({ veiculo }: { veiculo: Veiculo }) => (
    <div className="space-y-6">
      {/* Manutenção do Veículo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <FiClock className="w-5 h-5 mr-2 text-blue-600" />
            Manutenção do Veículo
          </h3>

          <div className="space-y-2">
            {veiculo.manutencao.ultimaManutencao && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Última Manutenção:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatarData(veiculo.manutencao.ultimaManutencao)}
                </span>
              </div>
            )}

            {veiculo.manutencao.kmUltimaManutencao && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  KM Última Manutenção:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatarNumero(veiculo.manutencao.kmUltimaManutencao)} km
                </span>
              </div>
            )}

            {veiculo.manutencao.proximaManutencao && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Próxima Manutenção:
                </span>
                <span
                  className={`text-sm font-medium flex items-center ${
                    isDocumentoVencido(veiculo.manutencao.proximaManutencao)
                      ? "text-red-600"
                      : isDocumentoProximoVencimento(
                          veiculo.manutencao.proximaManutencao
                        )
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {formatarData(veiculo.manutencao.proximaManutencao)}
                  {(isDocumentoVencido(veiculo.manutencao.proximaManutencao) ||
                    isDocumentoProximoVencimento(
                      veiculo.manutencao.proximaManutencao
                    )) && <FiAlertTriangle className="w-4 h-4 ml-1" />}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Periodicidade:
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                A cada{" "}
                {formatarNumero(veiculo.manutencao.periodicidadeManutencao)} km
              </span>
            </div>
          </div>
        </div>

        {/* Manutenção do GPS */}
        {veiculo.manutencao.manutencaoGPS && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <FiWifi className="w-5 h-5 mr-2 text-green-600" />
              Manutenção do GPS
            </h3>

            <div className="space-y-2">
              {veiculo.manutencao.manutencaoGPS.ultimaManutencao && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Última Manutenção:
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatarData(
                      veiculo.manutencao.manutencaoGPS.ultimaManutencao
                    )}
                  </span>
                </div>
              )}

              {veiculo.manutencao.manutencaoGPS.proximaManutencao && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Próxima Manutenção:
                  </span>
                  <span
                    className={`text-sm font-medium flex items-center ${
                      isDocumentoVencido(
                        veiculo.manutencao.manutencaoGPS.proximaManutencao
                      )
                        ? "text-red-600"
                        : isDocumentoProximoVencimento(
                            veiculo.manutencao.manutencaoGPS.proximaManutencao
                          )
                        ? "text-orange-600"
                        : "text-green-600"
                    }`}
                  >
                    {formatarData(
                      veiculo.manutencao.manutencaoGPS.proximaManutencao
                    )}
                    {(isDocumentoVencido(
                      veiculo.manutencao.manutencaoGPS.proximaManutencao
                    ) ||
                      isDocumentoProximoVencimento(
                        veiculo.manutencao.manutencaoGPS.proximaManutencao
                      )) && <FiAlertTriangle className="w-4 h-4 ml-1" />}
                  </span>
                </div>
              )}

              {veiculo.manutencao.manutencaoGPS.observacoes && (
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Observações:
                  </span>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {veiculo.manutencao.manutencaoGPS.observacoes}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const HistoricoTab = ({ veiculo }: { veiculo: Veiculo }) => (
    <div className="space-y-6">
      {/* Estatísticas de Utilização */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <FiMapPin className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatarNumero(veiculo.historicoUtilizacao.totalKmPercorridos)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total KM
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <FiTruck className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatarNumero(veiculo.historicoUtilizacao.totalViagens)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Viagens
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <FiWifi className="h-8 w-8 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatarNumero(veiculo.historicoUtilizacao.viagensComGPSVip)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Viagens VIP
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <FiClock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatarNumero(veiculo.historicoUtilizacao.totalHorasMonitoradas)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Horas Monitoradas
          </div>
        </div>
      </div>

      {/* Datas Importantes */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiCalendar className="w-5 h-5 mr-2 text-blue-600" />
          Datas Importantes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {veiculo.historicoUtilizacao.dataPrimeiraUtilizacao && (
            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Primeira Utilização:
              </span>
              <div className="font-medium text-gray-900 dark:text-white">
                {formatarData(
                  veiculo.historicoUtilizacao.dataPrimeiraUtilizacao
                )}
              </div>
            </div>
          )}

          {veiculo.historicoUtilizacao.dataUltimaUtilizacao && (
            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Última Utilização:
              </span>
              <div className="font-medium text-gray-900 dark:text-white">
                {formatarData(veiculo.historicoUtilizacao.dataUltimaUtilizacao)}
              </div>
            </div>
          )}

          <div>
            <span className="text-gray-600 dark:text-gray-400">
              Data Criação:
            </span>
            <div className="font-medium text-gray-900 dark:text-white">
              {formatarData(veiculo.dataCriacao)}
            </div>
          </div>

          <div>
            <span className="text-gray-600 dark:text-gray-400">
              Última Atualização:
            </span>
            <div className="font-medium text-gray-900 dark:text-white">
              {formatarData(veiculo.dataAtualizacao)}
            </div>
          </div>
        </div>
      </div>

      {/* Consumo */}
      {veiculo.historicoUtilizacao.consumoMedio && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <FiBarChart2 className="w-5 h-5 mr-2 text-green-600" />
            Desempenho
          </h3>

          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {veiculo.historicoUtilizacao.consumoMedio.toFixed(1)} km/l
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Consumo Médio
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

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
                  {veiculo.marca} {veiculo.modelo}
                </h2>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {veiculo.matricula}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      veiculo.status
                    )}`}
                  >
                    {getStatusText(veiculo.status)}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoriaColor(
                      veiculo.nivelInspecao.categoria
                    )}`}
                  >
                    {getCategoriaText(veiculo.nivelInspecao.categoria)}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ID: {veiculo.camiaoId}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(veiculo)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiTruck className="w-4 h-4" />
                  <span>Editar</span>
                </button>
              )}

              {onUpdateGPS && (
                <button
                  onClick={() => onUpdateGPS(veiculo.camiaoId)}
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
                { id: "documentos", label: "Documentos", icon: FiFileText },
                {
                  id: "especificacoes",
                  label: "Especificações",
                  icon: FiBarChart2,
                },
                { id: "manutencao", label: "Manutenção", icon: FiClock },
                { id: "historico", label: "Histórico", icon: FiCalendar },
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
              Criado em {formatarData(veiculo.dataCriacao)} • Atualizado em{" "}
              {formatarData(veiculo.dataAtualizacao)}
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
