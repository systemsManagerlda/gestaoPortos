/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from "react";
import {
  FiPackage,
  FiMapPin,
  FiAlertTriangle,
  FiAlertCircle,
  FiX,
  FiUser,
  FiTruck,
  FiDollarSign,
  FiFlag,
  FiBox,
  FiNavigation,
  FiFileText,
  FiArchive,
  FiLayers,
  FiTrendingUp,
  FiPhone,
  FiShield,
  FiWifi,
  FiThermometer,
  FiDroplet,
  FiClock,
  FiBarChart2,
  FiCalendar,
  FiGlobe,
  FiTag,
  FiFile,
  FiExternalLink,
  FiDownload,
  FiEye,
  FiImage,
  FiFileText as FiFileTextIcon,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import {
  formatarData,
  formatarMoeda as originalFormatarMoeda,
  getPrioridadeColor,
  getStatusColor,
  getStatusText,
} from "./cargaUtils";
import { Carga } from "./cargaService";
const getFileType = (url: string): "pdf" | "image" | "doc" | "unknown" => {
  const ext = url.split(".").pop()?.toLowerCase() || "";
  if (ext === "pdf") return "pdf";
  if (["jpg", "jpeg", "png", "gif", "webp", "bmp"].includes(ext))
    return "image";
  if (["doc", "docx", "xls", "xlsx", "csv", "txt"].includes(ext)) return "doc";
  return "unknown";
};

const getFileInfo = (url: string) => {
  const fileName = url.split("/").pop() || "documento";
  const fileType = getFileType(url);
  return { fileName, fileType };
};
const formatarMoeda = (
  valor: number | undefined | null,
  padrao: string = "N/A"
): string => {
  if (valor == null || isNaN(valor)) return padrao;
  return originalFormatarMoeda(valor);
};

interface VisualizarCargaModalProps {
  show: boolean;
  onClose: () => void;
  carga: Carga | null;
}

interface DocumentCardProps {
  title: string;
  url?: string;
  type?: "pdf" | "image" | "doc" | "unknown";
  description?: string;
  isRequired?: boolean;
}

// Componentes auxiliares melhorados
interface InfoItemProps {
  label: string;
  value: React.ReactNode;
  icon?: React.ElementType;
  monospace?: boolean;
  capitalize?: boolean;
  className?: string;
}
const DocumentCard: React.FC<DocumentCardProps> = ({
  title,
  url,
  type = "unknown",
  description,
  isRequired = false,
}) => {
  const hasDocument = !!url && url.trim() !== "";

  const getTypeIcon = () => {
    switch (type) {
      case "pdf":
        return <FiFileTextIcon className="w-6 h-6 text-red-500" />;
      case "image":
        return <FiImage className="w-6 h-6 text-green-500" />;
      case "doc":
        return <FiFileTextIcon className="w-6 h-6 text-blue-500" />;
      default:
        return <FiFile className="w-6 h-6 text-gray-400" />;
    }
  };

  const getFileType = (url: string): "pdf" | "image" | "doc" | "unknown" => {
    const ext = url.split(".").pop()?.toLowerCase();
    if (ext === "pdf") return "pdf";
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext || ""))
      return "image";
    if (["doc", "docx", "xls", "xlsx"].includes(ext || "")) return "doc";
    return "unknown";
  };

  const getFileInfo = (url: string) => {
    const fileName = url.split("/").pop() || "documento";
    const fileType = getFileType(url);
    return { fileName, fileType };
  };

  const handleView = () => {
    if (url) window.open(url, "_blank");
  };

  const handleDownload = () => {
    if (url) {
      const { fileName } = getFileInfo(url);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div
      className={`relative p-4 rounded-lg border transition-all duration-200 ${
        hasDocument
          ? "bg-white dark:bg-gray-800 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/10"
          : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
      }`}
    >
      {isRequired && !hasDocument && (
        <span className="absolute -top-2 -right-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
          Obrigatório
        </span>
      )}

      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div
            className={`p-2 rounded-lg ${
              hasDocument
                ? "bg-green-100 dark:bg-green-900/30"
                : "bg-gray-100 dark:bg-gray-600"
            }`}
          >
            {hasDocument ? (
              getTypeIcon()
            ) : (
              <FiFile className="w-6 h-6 text-gray-400" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 dark:text-white truncate">
              {title}
            </h4>

            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}

            {hasDocument && url && (
              <div className="mt-2">
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {getFileInfo(url).fileName}
                </p>
                <div className="flex items-center mt-1 space-x-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {getFileInfo(url).fileType.toUpperCase()}
                  </span>
                  <span className="inline-flex items-center text-green-600 dark:text-green-400 text-xs">
                    <FiCheckCircle className="w-3 h-3 mr-1" />
                    Disponível
                  </span>
                </div>
              </div>
            )}

            {!hasDocument && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Documento não enviado
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-1">
          {hasDocument && url ? (
            <>
              <button
                onClick={handleView}
                className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                title="Visualizar"
              >
                <FiEye className="w-4 h-4" />
              </button>
              <button
                onClick={handleDownload}
                className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                title="Download"
              >
                <FiDownload className="w-4 h-4" />
              </button>
            </>
          ) : (
            <FiXCircle className="w-5 h-5 text-gray-300 dark:text-gray-600" />
          )}
        </div>
      </div>
    </div>
  );
};

const InfoItem: React.FC<InfoItemProps> = ({
  label,
  value,
  icon: Icon,
  monospace = false,
  capitalize = false,
  className = "",
}) => {
  if (value == null || value === "") return null;

  const valueClasses = [
    "text-sm",
    monospace && "font-mono",
    capitalize && "capitalize",
    "text-gray-900 dark:text-white",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex justify-between items-center py-1.5">
      <span className="flex items-center text-sm text-gray-500">
        {Icon && <Icon className="w-4 h-4 mr-2" />}
        {label}:
      </span>
      <span className={valueClasses}>{value}</span>
    </div>
  );
};

interface MetricCardProps {
  label: string;
  value: React.ReactNode;
  icon: React.ElementType;
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
  description?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon: Icon,
  variant = "default",
  size = "md",
  description,
}) => {
  if (value == null) return null;

  const variantClasses = {
    default: "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
    success:
      "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400",
    warning:
      "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400",
    error: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400",
    info: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
  };

  const sizeClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-5",
  };

  const iconSize = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-lg ${variantClasses[variant]}`}
    >
      <div className="flex items-center justify-center mb-2">
        <Icon
          className={`${iconSize[size]} ${
            variantClasses[variant].split(" ")[2]
          }`}
        />
      </div>
      <h4 className="text-center font-medium text-gray-900 dark:text-white mb-1">
        {label}
      </h4>
      <div className="text-center">
        <p className={`font-semibold ${size === "lg" ? "text-xl" : "text-lg"}`}>
          {value}
        </p>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

const Section: React.FC<SectionProps> = ({
  title,
  icon: Icon,
  children,
  columns = 1,
  className = "",
}) => {
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center">
        <Icon className="w-5 h-5 text-gray-400 mr-2" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <div className={`grid ${gridClasses[columns]} gap-4`}>{children}</div>
    </div>
  );
};

// Componente Modal principal
export const VisualizarCargaModal: React.FC<VisualizarCargaModalProps> = ({
  show,
  onClose,
  carga,
}) => {
  const documentosPrincipais = useMemo(() => {
    if (!carga?.documentos) return [];

    return [
      {
        title: "Conhecimento de Embarque",
        url: carga.documentos.conhecimentoEmbarque,
        description: "Documento principal de transporte",
        isRequired: true,
        key: "conhecimentoEmbarque" as const,
      },
      {
        title: "Invoice (Fatura Comercial)",
        url: carga.documentos.invoice,
        description: "Fatura da mercadoria",
        isRequired: true,
        key: "invoice" as const,
      },
      {
        title: "Packing List",
        url: carga.documentos.packingList,
        description: "Lista de embalagem",
        isRequired: false,
        key: "packingList" as const,
      },
      {
        title: "Certificado de Origem",
        url: carga.documentos.certificadoOrigem,
        description: "Certificado de origem da mercadoria",
        isRequired: true,
        key: "certificadoOrigem" as const,
      },
      {
        title: "Contrato de Transporte",
        url: carga.documentos.contratoTransporte,
        description: "Contrato de serviço de transporte",
        isRequired: true,
        key: "contratoTransporte" as const,
      },
      {
        title: "Número de Cotação",
        url: carga.documentos.numeroCotacao,
        description: "Referência da cotação",
        isRequired: false,
        key: "numeroCotacao" as const,
      },
      {
        title: "Recibo",
        url: carga.documentos.numeroRecibo,
        description: "Comprovante de pagamento",
        isRequired: false,
        key: "numeroRecibo" as const,
      },
      {
        title: "Nota de Débito",
        url: carga.documentos.notaDebito,
        description: "Documento de débito",
        isRequired: false,
        key: "notaDebito" as const,
      },
      {
        title: "Manifesto",
        url: carga.documentos.manifest,
        description: "Manifesto de carga",
        isRequired: false,
        key: "manifest" as const,
      },
    ];
  }, [carga?.documentos]);

  const temDocumentosPrincipais = useMemo(() => {
    return documentosPrincipais.some((doc) => doc.url && doc.url.trim() !== "");
  }, [documentosPrincipais]);

  const temOutrosDocumentos = useMemo(() => {
    return carga?.documentos?.outros && carga.documentos.outros.length > 0;
  }, [carga?.documentos?.outros]);

  const documentosDisponiveis = useMemo(() => {
    if (!carga?.documentos) return 0;

    let count = 0;
    documentosPrincipais.forEach((doc) => {
      if (doc.url && doc.url.trim() !== "") count++;
    });

    if (carga.documentos.outros) {
      count += carga.documentos.outros.filter(
        (url) => url.trim() !== ""
      ).length;
    }

    return count;
  }, [carga?.documentos, documentosPrincipais]);

  // Dados computados
  const detalhesFinanceiros = useMemo(() => {
    if (!carga) return [];

    return [
      { label: "Valor do Frete", valor: carga.valorFrete, icon: FiTruck },
      {
        label: "Taxas Portuárias",
        valor: carga.taxasPortuarias,
        icon: FiArchive,
      },
      {
        label: "Despesas Operacionais",
        valor: carga.despesasOperacionais,
        icon: FiDollarSign,
      },
      { label: "Custo da Carga", valor: carga.custoCarga, icon: FiPackage },
      { label: "Contentor Vazio", valor: carga.contentorVazio, icon: FiBox },
    ].filter((item) => item.valor != null);
  }, [carga]);

  const temDadosSensores = useMemo(() => {
    return (
      carga?.sensoresIOT &&
      (carga.sensoresIOT.temperatura != null ||
        carga.sensoresIOT.umidade != null ||
        carga.sensoresIOT.aberturaPorta ||
        carga.sensoresIOT.movimentoBruscoDetectado ||
        carga.sensoresIOT.tombamentoDetectado)
    );
  }, [carga?.sensoresIOT]);

  const temSeguroVeiculo = useMemo(() => {
    return (
      carga?.veiculo?.seguroVeiculo &&
      Object.keys(carga.veiculo.seguroVeiculo).length > 0
    );
  }, [carga?.veiculo?.seguroVeiculo]);

  const temPartesEnvolvidas = useMemo(() => {
    return carga?.exportador || carga?.importador || carga?.consignatario;
  }, [carga?.exportador, carga?.importador, carga?.consignatario]);
  // Funções auxiliares
  const getSensorStatus = (
    value: boolean | number | undefined,
    type: string
  ): {
    text: string;
    variant: "default" | "success" | "warning" | "error" | "info";
    icon?: React.ElementType;
  } => {
    if (typeof value === "boolean") {
      return {
        text: value ? "Sim" : "Não",
        variant: value ? "error" : "success",
        icon: value ? FiAlertCircle : undefined,
      };
    }

    if (typeof value === "number") {
      if (type === "temperatura") {
        const isCritical = value > 30 || value < 5;
        return {
          text: `${value}°C`,
          variant: isCritical ? "error" : "success",
          icon: isCritical ? FiAlertCircle : undefined,
        };
      }
      if (type === "umidade") {
        const isCritical = value > 80 || value < 30;
        return {
          text: `${value}%`,
          variant: isCritical ? "error" : "success",
          icon: isCritical ? FiAlertCircle : undefined,
        };
      }
    }

    return {
      text: "N/A",
      variant: "default",
      icon: undefined,
    };
  };

  const formatarCoordenadas = (coordenadas?: {
    lat?: number;
    lng?: number;
  }) => {
    if (!coordenadas?.lat || !coordenadas?.lng) return null;
    return `${coordenadas.lat.toFixed(6)}, ${coordenadas.lng.toFixed(6)}`;
  };

  const getGPSStatus = (
    gps?: Carga["gps"]
  ): {
    batteryVariant: "default" | "success" | "warning" | "error";
    satelliteVariant: "default" | "success" | "warning" | "error";
  } => {
    const defaultStatus = {
      batteryVariant: "default" as const,
      satelliteVariant: "default" as const,
    };

    if (!gps) return defaultStatus;

    const batteryVariant =
      gps.bateriaPercentual != null
        ? gps.bateriaPercentual < 20
          ? ("error" as const)
          : gps.bateriaPercentual < 50
          ? ("warning" as const)
          : ("success" as const)
        : ("default" as const);

    const satelliteVariant =
      gps.satelites != null
        ? gps.satelites < 3
          ? ("error" as const)
          : gps.satelites < 5
          ? ("warning" as const)
          : ("success" as const)
        : ("default" as const);

    return { batteryVariant, satelliteVariant };
  };

  // Renderização condicional
  if (!show || !carga) return null;

  const gpsStatus = getGPSStatus(carga.gps);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  carga.status
                )}`}
              >
                {getStatusText(carga.status)}
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${getPrioridadeColor(
                  carga.prioridade
                )}`}
              >
                {carga.prioridade?.charAt(0).toUpperCase() +
                  carga.prioridade?.slice(1)}
              </div>
              {carga.atrasada && (
                <div className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  <FiAlertTriangle className="inline w-3 h-3 mr-1" />
                  Atrasada
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
              {carga.codigo} - {carga.descricao}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Cliente: {carga.cliente} • Criada em{" "}
              {formatarData(carga.dataCriacao)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Fechar"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Conteúdo com scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Seção 1: Informações Principais */}
          <Section title="Informações Principais" icon={FiFileText} columns={3}>
            <div className="space-y-3">
              <InfoItem
                label="Código"
                value={carga.codigo}
                icon={FiTag}
                monospace
              />
              <InfoItem label="Cliente" value={carga.cliente} icon={FiUser} />
              <InfoItem label="Tipo de Carga" value={carga.tipoCarga} />
              <InfoItem
                label="Natureza"
                value={carga.naturezaCarga}
                capitalize
              />
            </div>

            <div className="space-y-3">
              <InfoItem
                label="Categoria Seguro"
                value={carga.categoriaSeguro}
                icon={FiShield}
              />
              <InfoItem
                label="Abrangência"
                value={carga.abrangenciaSeguro}
                icon={FiGlobe}
              />
              <InfoItem label="Tipo Percurso" value={carga.tipoPercurso} />
              <InfoItem label="Destino Frete" value={carga.destinoFrete} />
            </div>

            <div className="space-y-3">
              <InfoItem
                label="Data Coleta"
                value={formatarData(carga.dataColeta)}
                icon={FiCalendar}
              />
              <InfoItem
                label="Previsão Entrega"
                value={formatarData(carga.dataEntregaPrevista)}
                icon={FiCalendar}
              />
              <InfoItem
                label="Data Entrega Real"
                value={formatarData(carga.dataEntregaReal)}
                icon={FiCalendar}
              />
              {carga.distanciaKm && (
                <InfoItem
                  label="Distância"
                  value={`${carga.distanciaKm} km`}
                  icon={FiNavigation}
                />
              )}
            </div>
          </Section>

          {/* Seção 2: Especificações Técnicas */}
          <Section title="Especificações Técnicas" icon={FiBox} columns={4}>
            <MetricCard
              label="Peso Bruto"
              value={`${carga.pesoBruto} kg`}
              icon={FiPackage}
              variant="info"
            />
            <MetricCard
              label="Peso Líquido"
              value={carga.pesoLiquido ? `${carga.pesoLiquido} kg` : "N/A"}
              icon={FiPackage}
              variant="default"
            />
            <MetricCard
              label="Volume"
              value={carga.volume ? `${carga.volume} m³` : "N/A"}
              icon={FiBox}
              variant="info"
            />
            <MetricCard
              label="Volumes"
              value={carga.quantidadeVolumes || "N/A"}
              icon={FiArchive}
              variant="default"
            />
          </Section>

          {/* Seção 3: Localização */}
          <Section title="Localização" icon={FiMapPin} columns={2}>
            <div className="space-y-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center mb-2">
                <FiMapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Origem
                </h4>
              </div>
              <InfoItem label="Local" value={carga.origem.local} />
              <InfoItem label="Cidade" value={carga.origem.cidade} />
              <InfoItem label="País" value={carga.origem.pais} />
              {carga.origem.coordenadas && (
                <InfoItem
                  label="Coordenadas"
                  value={formatarCoordenadas(carga.origem.coordenadas)}
                  monospace
                />
              )}
            </div>

            <div className="space-y-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center mb-2">
                <FiMapPin className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Destino
                </h4>
              </div>
              <InfoItem label="Local" value={carga.destino.local} />
              <InfoItem label="Cidade" value={carga.destino.cidade} />
              <InfoItem label="País" value={carga.destino.pais} />
              {carga.destino.coordenadas && (
                <InfoItem
                  label="Coordenadas"
                  value={formatarCoordenadas(carga.destino.coordenadas)}
                  monospace
                />
              )}
            </div>
          </Section>

          {/* Seção 4: Contentor */}
          {carga.contentor && (
            <Section title="Contentor" icon={FiArchive} columns={4}>
              <MetricCard
                label="Número"
                value={carga.contentor.numero || "N/A"}
                icon={FiArchive}
                variant="info"
              />
              <MetricCard
                label="Tipo"
                value={carga.contentor.tipo || "N/A"}
                icon={FiArchive}
                variant="default"
              />
              <MetricCard
                label="Tara"
                value={
                  carga.contentor.tara ? `${carga.contentor.tara} kg` : "N/A"
                }
                icon={FiBox}
                variant="info"
              />
              <MetricCard
                label="Capacidade"
                value={
                  carga.contentor.capacidadeMaxima
                    ? `${carga.contentor.capacidadeMaxima} kg`
                    : "N/A"
                }
                icon={FiArchive}
                variant="default"
              />
            </Section>
          )}

          {/* Seção 4.1: Lacres */}
          {(carga.contentor?.lacreOrigem || carga.contentor?.lacreDestino) && (
            <Section title="Controle de Lacres" icon={FiTag} columns={2}>
              {carga.contentor.lacreOrigem && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Lacre de Origem
                  </h4>
                  <p className="text-lg font-mono text-blue-700 dark:text-blue-400">
                    {carga.contentor.lacreOrigem}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Aplicado na origem
                  </p>
                </div>
              )}

              {carga.contentor.lacreDestino && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Lacre de Destino
                  </h4>
                  <p className="text-lg font-mono text-green-700 dark:text-green-400">
                    {carga.contentor.lacreDestino}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Verificado no destino
                  </p>
                </div>
              )}
            </Section>
          )}

          {/* Seção 5: Financeiro */}
          <Section title="Informações Financeiras" icon={FiDollarSign}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <MetricCard
                label="Valor Total"
                value={formatarMoeda(carga.valorTotal)}
                icon={FiDollarSign}
                variant="success"
                size="lg"
              />

              <MetricCard
                label="Valor Mercadoria"
                value={formatarMoeda(carga.valorMercadoria)}
                icon={FiPackage}
                variant="info"
              />

              <MetricCard
                label="Margem de Lucro"
                value={formatarMoeda(carga.margemLucro)}
                icon={FiTrendingUp}
                variant="success"
              />

              <MetricCard
                label="Comissão"
                value={formatarMoeda(carga.comissaoCalculada)}
                icon={FiTrendingUp}
                variant="warning"
              />

              <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Detalhes
                </h4>
                {detalhesFinanceiros.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-1"
                  >
                    <span className="text-sm text-gray-500">{item.label}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatarMoeda(item.valor!)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Seção 6: Seguro */}
          {carga.seguro && (
            <Section title="Seguro" icon={FiShield} columns={4}>
              <MetricCard
                label="Valor Segurado"
                value={formatarMoeda(carga.seguro.valorSegurado)}
                icon={FiShield}
                variant="info"
              />

              <MetricCard
                label="Prêmio Final"
                value={formatarMoeda(carga.seguro.premioFinal)}
                icon={FiDollarSign}
                variant="success"
              />

              <MetricCard
                label="Taxa"
                value={
                  carga.seguro.taxaPercentual
                    ? `${carga.seguro.taxaPercentual}%`
                    : "N/A"
                }
                icon={FiTrendingUp}
                variant="warning"
              />

              <MetricCard
                label="Status"
                value={carga.seguro.statusSeguro}
                icon={FiShield}
                variant={
                  carga.seguro.statusSeguro === "ativo" ? "success" : "warning"
                }
              />
            </Section>
          )}

          {/* Seção 7: Dispositivos */}
          {(carga.gps || temDadosSensores) && (
            <Section title="Dispositivos e Sensores" icon={FiWifi}>
              {carga.gps && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <MetricCard
                    label="Código GPS"
                    value={carga.gps.codigo || "N/A"}
                    icon={FiWifi}
                    variant="info"
                  />

                  <MetricCard
                    label="Bateria"
                    value={
                      carga.gps.bateriaPercentual
                        ? `${carga.gps.bateriaPercentual}%`
                        : "N/A"
                    }
                    icon={FiWifi}
                    variant={gpsStatus?.batteryVariant || "default"}
                  />

                  <MetricCard
                    label="Satélites"
                    value={carga.gps.satelites?.toString() || "N/A"}
                    icon={FiWifi}
                    variant={gpsStatus?.satelliteVariant || "default"}
                  />

                  <MetricCard
                    label="Última Com."
                    value={
                      carga.gps.ultimaComunicacao
                        ? formatarData(carga.gps.ultimaComunicacao)
                        : "N/A"
                    }
                    icon={FiClock}
                    variant="default"
                  />
                </div>
              )}

              {temDadosSensores && carga.sensoresIOT && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {carga.sensoresIOT.temperatura != null && (
                    <MetricCard
                      label="Temperatura"
                      value={`${carga.sensoresIOT.temperatura}°C`}
                      icon={FiThermometer}
                      variant={
                        getSensorStatus(
                          carga.sensoresIOT.temperatura,
                          "temperatura"
                        ).variant
                      }
                    />
                  )}

                  {carga.sensoresIOT.umidade != null && (
                    <MetricCard
                      label="Umidade"
                      value={`${carga.sensoresIOT.umidade}%`}
                      icon={FiDroplet}
                      variant={
                        getSensorStatus(carga.sensoresIOT.umidade, "umidade")
                          .variant
                      }
                    />
                  )}

                  <MetricCard
                    label="Porta"
                    value={
                      carga.sensoresIOT.aberturaPorta ? "Aberta" : "Fechada"
                    }
                    icon={FiAlertCircle}
                    variant={
                      getSensorStatus(
                        carga.sensoresIOT.aberturaPorta,
                        "boolean"
                      ).variant
                    }
                  />

                  <MetricCard
                    label="Movimento"
                    value={
                      carga.sensoresIOT.movimentoBruscoDetectado
                        ? "Detectado"
                        : "Normal"
                    }
                    icon={FiAlertCircle}
                    variant={
                      getSensorStatus(
                        carga.sensoresIOT.movimentoBruscoDetectado,
                        "boolean"
                      ).variant
                    }
                  />

                  <MetricCard
                    label="Tombamento"
                    value={
                      carga.sensoresIOT.tombamentoDetectado
                        ? "Detectado"
                        : "Normal"
                    }
                    icon={FiAlertCircle}
                    variant={
                      getSensorStatus(
                        carga.sensoresIOT.tombamentoDetectado,
                        "boolean"
                      ).variant
                    }
                  />
                </div>
              )}
            </Section>
          )}

          {/* Seção 8: Transporte */}
          {(carga.motorista || carga.veiculo) && (
            <Section title="Transporte" icon={FiTruck} columns={2}>
              {carga.motorista && (
                <div className="space-y-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center mb-3">
                    <FiUser className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Motorista
                    </h4>
                  </div>
                  <InfoItem label="Nome" value={carga.motorista.nome} />
                  <InfoItem
                    label="Empresa"
                    value={carga.motorista.empresaMotorista}
                  />
                  <InfoItem label="Telefone" value={carga.motorista.telefone} />
                  {carga.motorista.avaliacao && (
                    <InfoItem
                      label="Avaliação"
                      value={`${carga.motorista.avaliacao}/5`}
                    />
                  )}
                </div>
              )}

              {carga.veiculo && (
                <div className="space-y-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center mb-3">
                    <FiTruck className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Veículo
                    </h4>
                  </div>
                  <InfoItem label="Matrícula" value={carga.veiculo.matricula} />
                  <InfoItem label="Modelo" value={carga.veiculo.modelo} />
                  <InfoItem label="Ano" value={carga.veiculo.ano} />

                  {temSeguroVeiculo && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h5 className="text-sm font-medium text-gray-500 mb-2">
                        Seguro do Veículo
                      </h5>
                      <InfoItem
                        label="Tipo"
                        value={carga.veiculo.seguroVeiculo?.tipo}
                      />
                      <InfoItem
                        label="Valor"
                        value={formatarMoeda(
                          carga.veiculo.seguroVeiculo?.valorVeiculo
                        )}
                      />
                      <InfoItem
                        label="Prêmio"
                        value={formatarMoeda(
                          carga.veiculo.seguroVeiculo?.valorPremio
                        )}
                      />
                    </div>
                  )}
                </div>
              )}
            </Section>
          )}

          <Section title="Documentação" icon={FiFileTextIcon}>
            <div className="space-y-4">
              {/* Resumo dos Documentos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <MetricCard
                  label="Documentos Disponíveis"
                  value={documentosDisponiveis}
                  icon={FiFileTextIcon}
                  variant="info"
                  description={`Total de ${documentosPrincipais.length} tipos principais`}
                />

                <MetricCard
                  label="Documentos Obrigatórios"
                  value={
                    documentosPrincipais.filter((d) => d.isRequired).length
                  }
                  icon={FiCheckCircle}
                  variant="success"
                  description="Documentos essenciais"
                />

                <MetricCard
                  label="Outros Documentos"
                  value={
                    carga?.documentos?.outros?.filter(
                      (url) => url.trim() !== ""
                    ).length || 0
                  }
                  icon={FiFile}
                  variant="default"
                  description="Documentos adicionais"
                />
              </div>

              {/* Documentos Principais */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Documentos Principais
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {documentosPrincipais.map((doc, index) => (
                    <DocumentCard
                      key={index}
                      title={doc.title}
                      url={doc.url}
                      description={doc.description}
                      isRequired={doc.isRequired}
                      type={doc.url ? getFileType(doc.url) : "unknown"}
                    />
                  ))}
                </div>
              </div>

              {/* Outros Documentos */}
              {temOutrosDocumentos && carga?.documentos?.outros && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                    Outros Documentos (
                    {
                      carga.documentos.outros.filter((url) => url.trim() !== "")
                        .length
                    }
                    )
                  </h4>
                  <div className="space-y-2">
                    {carga.documentos.outros
                      .filter((url) => url.trim() !== "")
                      .map((url, index) => {
                        const { fileName, fileType } = getFileInfo(url);

                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <FiFile className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-xs">
                                  {fileName}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Documento adicional {index + 1}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded">
                                {fileType.toUpperCase()}
                              </span>
                              <button
                                onClick={() => window.open(url, "_blank")}
                                className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                                title="Visualizar"
                              >
                                <FiExternalLink className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Mensagem quando não há documentos */}
              {!temDocumentosPrincipais && !temOutrosDocumentos && (
                <div className="text-center py-10">
                  <FiFileTextIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Nenhum documento disponível
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    Esta carga ainda não possui documentos anexados. Os
                    documentos podem ser adicionados através da função de
                    edição.
                  </p>
                </div>
              )}
            </div>
          </Section>
          {/* Seção 9: Partes Envolvidas */}
          {temPartesEnvolvidas && (
            <Section title="Partes Envolvidas" icon={FiUser} columns={3}>
              {carga.exportador && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Exportador
                  </h4>
                  <p className="text-gray-900 dark:text-white">
                    {carga.exportador}
                  </p>
                </div>
              )}

              {carga.importador && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Importador
                  </h4>
                  <p className="text-gray-900 dark:text-white">
                    {carga.importador}
                  </p>
                </div>
              )}

              {carga.consignatario && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Consignatário
                  </h4>
                  <p className="text-gray-900 dark:text-white">
                    {carga.consignatario}
                  </p>
                </div>
              )}
            </Section>
          )}

          {/* Seção 10: Informações Adicionais */}
          {(carga.contatoCliente ||
            carga.instrucaoEspecial ||
            carga.observacoes) && (
            <Section
              title="Informações Adicionais"
              icon={FiFileText}
              columns={3}
            >
              {carga.contatoCliente && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FiPhone className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Contato do Cliente
                    </h4>
                  </div>
                  <p className="text-gray-900 dark:text-white">
                    {carga.contatoCliente}
                  </p>
                </div>
              )}

              {carga.instrucaoEspecial && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FiAlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mr-2" />
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Instruções Especiais
                    </h4>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {carga.instrucaoEspecial}
                  </p>
                </div>
              )}

              {carga.observacoes && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Observações
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {carga.observacoes}
                  </p>
                </div>
              )}
            </Section>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
