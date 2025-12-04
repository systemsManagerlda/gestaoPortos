/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import {
  FiX,
  FiPackage,
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiClock,
  FiShield,
  FiAlertCircle,
  FiTruck,
  FiBox,
  FiLayers,
  FiFileText,
  FiUser,
  FiGlobe,
  FiUpload,
  FiFile,
  FiTrash2,
  FiEye,
  FiDownload,
  FiLock,
} from "react-icons/fi";
import { Carga, cargaService, cargaUtils } from "./cargaService";

// Tipos baseados no schema
interface OrigemDestino {
  pais: string;
  cidade: string;
  local: string;
  coordenadas?: {
    lat: number;
    lng: number;
  };
}

interface Motorista {
  id?: number;
  nome?: string;
  empresaMotorista?: string;
  empresaMotoristaId?: number;
  cartaConducaoNumero?: string;
  cartaConducaoCategoria?: string;
  validadeCartaConducao?: string;
  documentos?: any[];
  certificados?: string[];
  avaliacao?: number;
  telefone?: string;
  nacionalidade?: string;
}

interface Veiculo {
  id?: number;
  matricula?: string;
  modelo?: string;
  ano?: number;
  quilometragemInicial?: number;
  quilometragemFinal?: number;
  proximaRevisaoKM?: number;
  estadoVeiculoAntes?: string;
  estadoVeiculoDepois?: string;
  seguroVeiculo?: {
    tipo?: string;
    valorVeiculo?: number;
    valorPremio?: number;
    apolice?: string;
    dataVencimento?: string;
  };
}

interface Seguro {
  apolice?: string;
  seguradora?: string;
  valorSegurado: number;
  taxaPercentual?: number;
  taxaBaseMZN?: number;
  premioCalculado?: number;
  premioFinal?: number;
  dataInicio?: string;
  dataFim?: string;
  cobertura?: string[];
  statusSeguro: string;
  sinistros?: any[];
}

interface Dimensoes {
  largura?: number;
  altura?: number;
  comprimento?: number;
}

interface Contentor {
  numero?: string;
  tipo?: string;
  tara?: number;
  capacidadeMaxima?: number;
  anoFabricacao?: number;
  estadoAtual?: string;
  lacreOrigem?: string;
  lacreDestino?: string;
}

interface GPS {
  codigo?: string;
  modelo?: string;
  bateriaPercentual?: number;
  ultimaComunicacao?: string;
  satelites?: number;
  imei?: string;
  trackingId?: string;
  vinculoMotoristaId?: number;
  vinculoViagemId?: number;
}

interface SensoresIOT {
  temperatura?: number;
  umidade?: number;
  aberturaPorta?: boolean;
  movimentoBruscoDetectado?: boolean;
  tombamentoDetectado?: boolean;
  historicoEventos?: any[];
}

interface Documentos {
  conhecimentoEmbarque?: string;
  invoice?: string;
  packingList?: string;
  certificadoOrigem?: string;
  contratoTransporte?: string;
  numeroCotacao?: string;
  numeroRecibo?: string;
  notaDebito?: string;
  manifest?: string;
  outros?: string[];
}

interface ChecklistItem {
  item: string;
  status: string;
  observacao?: string;
}

interface Checklist {
  coleta?: ChecklistItem[];
  entrega?: ChecklistItem[];
}

interface CustosExtras {
  tipo: string;
  descricao: string;
  valor: number;
  data?: string;
}

interface Ocorrencia {
  id: number;
  tipo: string;
  descricao: string;
  severidade: string;
  dataRegistro: string;
  status: string;
  acaoTomada?: string;
  custo?: number;
  evidencias?: string[];
  afetaSeguro?: boolean;
  sinistroRelacionado?: string;
}

interface Auditoria {
  id: number;
  data: string;
  auditor: string;
  observacao: string;
  resultado: string;
}

interface DocumentoFile {
  id: string;
  nome: string;
  tipo: string;
  tamanho: number;
  url: string;
  dataUpload: string;
  descricao?: string;
}

interface EditarCargaModalProps {
  show: boolean;
  onClose: () => void;
  carga: Carga | null;
  onSave: (carga: Carga) => Promise<void>;
  isSubmitting?: boolean;
}

export const EditarCargaModal: React.FC<EditarCargaModalProps> = ({
  show,
  onClose,
  carga,
  onSave,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState<Partial<Carga>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<string>("basico");
  const [documentos, setDocumentos] = useState<DocumentoFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);

  // Inicializar formData quando carga muda
  useEffect(() => {
    if (carga) {
      setFormData({
        ...carga,
        // Formatar datas para inputs
        dataEntregaPrevista: carga.dataEntregaPrevista
          ? new Date(carga.dataEntregaPrevista).toISOString().split("T")[0]
          : "",
        dataColeta: carga.dataColeta
          ? new Date(carga.dataColeta).toISOString().split("T")[0]
          : "",
      });

      // Inicializar documentos se existirem
      if (carga.documentos) {
        const docs: DocumentoFile[] = [];

        // Converter documentos existentes para o formato de arquivo
        Object.entries(carga.documentos).forEach(([key, value]) => {
          if (value && typeof value === "string") {
            docs.push({
              id: Math.random().toString(36).substr(2, 9),
              nome: `${key}.pdf`,
              tipo: "application/pdf",
              tamanho: 1024,
              url: value,
              dataUpload: new Date().toISOString(),
              descricao: key,
            });
          }
        });

        setDocumentos(docs);
      }
    }
  }, [carga]);

  if (!show || !carga) return null;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validações básicas
    if (!formData.descricao || formData.descricao.trim() === "") {
      newErrors.descricao = "Descrição é obrigatória";
    }

    if (!formData.pesoBruto || formData.pesoBruto <= 0) {
      newErrors.pesoBruto = "Peso bruto deve ser maior que zero";
    }

    if (!formData.valorMercadoria || formData.valorMercadoria <= 0) {
      newErrors.valorMercadoria = "Valor da mercadoria deve ser maior que zero";
    }

    // Validação da origem
    if (!formData.origem?.pais || formData.origem.pais.trim() === "") {
      newErrors.origem = "País de origem é obrigatório";
    }
    if (!formData.origem?.cidade || formData.origem.cidade.trim() === "") {
      newErrors.origem = "Cidade de origem é obrigatória";
    }
    if (!formData.origem?.local || formData.origem.local.trim() === "") {
      newErrors.origem = "Local de origem é obrigatório";
    }

    // Validação do destino
    if (!formData.destino?.pais || formData.destino.pais.trim() === "") {
      newErrors.destino = "País de destino é obrigatório";
    }
    if (!formData.destino?.cidade || formData.destino.cidade.trim() === "") {
      newErrors.destino = "Cidade de destino é obrigatória";
    }
    if (!formData.destino?.local || formData.destino.local.trim() === "") {
      newErrors.destino = "Local de destino é obrigatório";
    }

    // Validação para cálculo de fretes
    if (!formData.destinoFrete) {
      newErrors.destinoFrete = "Destino para cálculo de frete é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Converter documentos para o formato do schema
      const documentosSchema: Documentos = {
        conhecimentoEmbarque:
          documentos.find((d) => d.descricao === "conhecimentoEmbarque")?.url ||
          "",
        invoice: documentos.find((d) => d.descricao === "invoice")?.url || "",
        packingList:
          documentos.find((d) => d.descricao === "packingList")?.url || "",
        certificadoOrigem:
          documentos.find((d) => d.descricao === "certificadoOrigem")?.url ||
          "",
        contratoTransporte:
          documentos.find((d) => d.descricao === "contratoTransporte")?.url ||
          "",
        numeroCotacao:
          documentos.find((d) => d.descricao === "numeroCotacao")?.url || "",
        numeroRecibo:
          documentos.find((d) => d.descricao === "numeroRecibo")?.url || "",
        notaDebito:
          documentos.find((d) => d.descricao === "notaDebito")?.url || "",
        manifest: documentos.find((d) => d.descricao === "manifest")?.url || "",
        outros: documentos
          .filter(
            (d) =>
              !d.descricao ||
              [
                "conhecimentoEmbarque",
                "invoice",
                "packingList",
                "certificadoOrigem",
                "contratoTransporte",
                "numeroCotacao",
                "numeroRecibo",
                "notaDebito",
                "manifest",
              ].includes(d.descricao)
          )
          .map((d) => d.url),
      };

      // Garantir que origem tem estrutura completa
      const origemCompleta = {
        pais: formData.origem?.pais || carga.origem?.pais || "",
        cidade: formData.origem?.cidade || carga.origem?.cidade || "",
        local: formData.origem?.local || carga.origem?.local || "",
        coordenadas: {
          lat:
            formData.origem?.coordenadas?.lat ||
            carga.origem?.coordenadas?.lat ||
            0,
          lng:
            formData.origem?.coordenadas?.lng ||
            carga.origem?.coordenadas?.lng ||
            0,
        },
      };

      // Garantir que destino tem estrutura completa
      const destinoCompleto = {
        pais: formData.destino?.pais || carga.destino?.pais || "",
        cidade: formData.destino?.cidade || carga.destino?.cidade || "",
        local: formData.destino?.local || carga.destino?.local || "",
        coordenadas: {
          lat:
            formData.destino?.coordenadas?.lat ||
            carga.destino?.coordenadas?.lat ||
            0,
          lng:
            formData.destino?.coordenadas?.lng ||
            carga.destino?.coordenadas?.lng ||
            0,
        },
      };

      // Garantir contentor com lacres
      const contentorCompleto = {
        ...carga.contentor,
        ...formData.contentor,
        lacreOrigem:
          formData.contentor?.lacreOrigem || carga.contentor?.lacreOrigem || "",
        lacreDestino:
          formData.contentor?.lacreDestino ||
          carga.contentor?.lacreDestino ||
          "",
      };

      const cargaAtualizada = {
        ...carga,
        ...formData,
        // Campos de localização
        origem: origemCompleta,
        destino: destinoCompleto,
        // Campos de parte envolvida
        exportador: formData.exportador || carga.exportador || "",
        importador: formData.importador || carga.importador || "",
        consignatario: formData.consignatario || carga.consignatario || "",
        // Campos de contentor
        contentor:
          Object.keys(contentorCompleto).length > 0
            ? contentorCompleto
            : undefined,
        // Campos financeiros
        taxasPortuarias: formData.taxasPortuarias || carga.taxasPortuarias || 0,
        despesasOperacionais:
          formData.despesasOperacionais || carga.despesasOperacionais || 0,
        // Documentos
        documentos: documentosSchema,
        // Metadados
        dataAtualizacao: new Date().toISOString(),
        atualizadoPor: "usuário_atual", // Você pode obter do contexto de autenticação
      };

      // Remover campos undefined para não sobrescrever valores existentes
      const cargaFinal = Object.fromEntries(
        Object.entries(cargaAtualizada).filter(([_, v]) => v !== undefined)
      );

      await onSave(cargaFinal as unknown as Carga);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar carga:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "Erro ao salvar carga. Tente novamente.",
      }));
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleOrigemChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      origem: {
        ...prev.origem!,
        [field]: value,
      },
    }));
  };

  const handleLacreChange = (tipo: "origem" | "destino", value: string) => {
    setFormData((prev) => ({
      ...prev,
      contentor: {
        ...prev.contentor,
        [`lacre${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`]: value,
      },
    }));
  };

  const handleDestinoCoordenadasChange = (
    coordType: "lat" | "lng",
    value: string
  ) => {
    const numValue = parseFloat(value);

    setFormData((prev) => {
      const prevDestino = prev.destino || { pais: "", cidade: "", local: "" };
      const prevCoords = prevDestino.coordenadas || { lat: 0, lng: 0 };

      return {
        ...prev,
        destino: {
          ...prevDestino,
          coordenadas: {
            ...prevCoords,
            [coordType]: isNaN(numValue) ? 0 : numValue,
          },
        },
      };
    });
  };

  const handleOrigemCoordenadasChange = (
    coordType: "lat" | "lng",
    value: string
  ) => {
    const numValue = parseFloat(value);

    setFormData((prev) => {
      const prevOrigem = prev.origem || { pais: "", cidade: "", local: "" };
      const prevCoords = prevOrigem.coordenadas || { lat: 0, lng: 0 };

      return {
        ...prev,
        origem: {
          ...prevOrigem,
          coordenadas: {
            ...prevCoords,
            [coordType]: isNaN(numValue) ? 0 : numValue,
          },
        },
      };
    });
  };

  const handleDestinoChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      destino: {
        ...prev.destino!,
        [field]: value,
      },
    }));
  };

  const handleNumberChange = (field: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      handleInputChange(field, numValue);
    } else if (value === "") {
      handleInputChange(field, undefined);
    }
  };

  const handleSeguroChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      seguro: { ...prev.seguro!, [field]: value },
    }));
  };

  const handleVeiculoChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      veiculo: { ...prev.veiculo!, [field]: value },
    }));
  };

  // Funções para gerenciar documentos
  // Funções para gerenciar documentos
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const newDocuments: DocumentoFile[] = [];
      const tiposDocumentoValidos = [
        "conhecimentoEmbarque",
        "invoice",
        "packingList",
        "certificadoOrigem",
        "contratoTransporte",
        "numeroCotacao",
        "numeroRecibo",
        "notaDebito",
        "manifest",
        "outros",
      ];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = file.name.toLowerCase();
        const descricaoDocumento = obterDescricaoDocumento(file.name);

        // 1. Validar se o nome do arquivo contém um dos tipos válidos
        const tipoEncontrado = tiposDocumentoValidos.find((tipo) =>
          fileName.includes(tipo.toLowerCase())
        );

        if (!tipoEncontrado) {
          const tiposFormatados = tiposDocumentoValidos
            .map((tipo) => `"${tipo}"`)
            .join(", ");

          alert(
            `O arquivo "${file.name}" não contém um tipo de documento válido no nome.\n\n` +
              `Tipos válidos: ${tiposFormatados}\n\n` +
              `Exemplos de nomes válidos:\n` +
              `- conhecimentoEmbarque_fatura123.pdf\n` +
              `- invoice_compra_001.pdf\n` +
              `- packing_list_produtos.docx\n` +
              `- manifest_carga456.pdf`
          );
          continue;
        }

        // 2. Usar a validação do cargaUtils
        const validacao = cargaUtils.validarArquivoUpload(file);
        if (!validacao.valido) {
          alert(validacao.erro);
          continue;
        }

        // 3. Verificar se a descrição obtida é válida
        const descricaoValida =
          tiposDocumentoValidos.includes(descricaoDocumento);
        if (!descricaoValida) {
          alert(
            `Não foi possível identificar o tipo de documento a partir do nome: "${file.name}"\n\n` +
              `Certifique-se de que o nome inclua um dos tipos válidos: ${tiposDocumentoValidos.join(
                ", "
              )}`
          );
          continue;
        }

        // 4. Fazer upload real usando o cargaService
        const response = await cargaService.uploadDocumento({
          file: file,
          nomeEmpresa: carga?.nomeEmpresa || "Mega Centro e Logistica",
          descricao: descricaoDocumento,
        });

        if (response.success) {
          const newDoc: DocumentoFile = {
            id: Math.random().toString(36).substr(2, 9),
            nome: file.name,
            tipo: file.type,
            tamanho: file.size,
            url: response.url, // URL REAL do S3 retornada pela API
            dataUpload: new Date().toISOString(),
            descricao: descricaoDocumento,
          };

          newDocuments.push(newDoc);
        } else {
          alert(`Erro ao fazer upload de ${file.name}: ${response.message}`);
        }
      }

      if (newDocuments.length > 0) {
        setDocumentos((prev) => [...prev, ...newDocuments]);
      }

      // Limpar o input de arquivo
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Erro ao fazer upload de arquivos:", error);
      const errorMsg =
        error instanceof Error ? error.message : "Erro desconhecido";
      setUploadErrors((prev) => [...prev, errorMsg]);
    } finally {
      setUploading(false);
    }
  };

  const obterDescricaoDocumento = (fileName: string): string => {
    const fileNameLower = fileName.toLowerCase();

    // Mapeamento de padrões para tipos de documento
    const padroesDocumentos = [
      {
        tipo: "conhecimentoEmbarque",
        padroes: ["conhecimento", "embarque", "bl", "billoflading"],
      },
      { tipo: "invoice", padroes: ["invoice", "fatura", "notafiscal"] },
      {
        tipo: "packingList",
        padroes: ["packing", "listaempacotamento", "empacotamento"],
      },
      { tipo: "certificadoOrigem", padroes: ["certificado", "origem", "coo"] },
      {
        tipo: "contratoTransporte",
        padroes: ["contrato", "transporte", "frete"],
      },
      { tipo: "numeroCotacao", padroes: ["cotacao", "quote", "quotation"] },
      { tipo: "numeroRecibo", padroes: ["recibo", "receipt", "comprovante"] },
      { tipo: "notaDebito", padroes: ["debito", "debit", "notadebito"] },
      { tipo: "manifest", padroes: ["manifest", "manifesto", "cargamanifest"] },
      { tipo: "outros", padroes: [] }, // Fallback padrão
    ];

    // Procurar pelo tipo correspondente
    for (const doc of padroesDocumentos) {
      if (
        doc.padroes.some((padrao) =>
          fileNameLower.includes(padrao.toLowerCase())
        )
      ) {
        return doc.tipo;
      }
    }

    // Verificar se o nome contém exatamente um dos tipos válidos
    const tiposValidos = [
      "conhecimentoEmbarque",
      "invoice",
      "packingList",
      "certificadoOrigem",
      "contratoTransporte",
      "numeroCotacao",
      "numeroRecibo",
      "notaDebito",
      "manifest",
    ];

    const tipoDireto = tiposValidos.find((tipo) =>
      fileNameLower.includes(tipo.toLowerCase())
    );

    return tipoDireto || "outros";
  };

  const handleRemoveDocument = (id: string) => {
    setDocumentos((prev) => prev.filter((doc) => doc.id !== id));
  };

  const handleViewDocument = async (url: string) => {
    try {
      // Se a URL for uma URL do S3, pode precisar de uma URL assinada
      if (url.includes("amazonaws.com") || url.includes("s3.")) {
        const filename = url.split("/").pop();
        if (filename) {
          const signedUrl = await cargaService.obterUrlAssinada(filename);
          window.open(signedUrl, "_blank");
          return;
        }
      }

      // Para URLs públicas ou outras
      window.open(url, "_blank");
    } catch (error) {
      console.error("Erro ao visualizar documento:", error);
      alert("Erro ao visualizar documento. Tente novamente.");
    }
  };

  const handleDownloadDocument = async (doc: DocumentoFile) => {
    try {
      let downloadUrl = doc.url;

      // Se for URL do S3, obter URL assinada
      if (doc.url.includes("amazonaws.com") || doc.url.includes("s3.")) {
        const filename = doc.url.split("/").pop();
        if (filename) {
          downloadUrl = await cargaService.obterUrlAssinada(filename);
        }
      }

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = doc.nome;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao baixar documento:", error);
      alert("Erro ao baixar documento. Tente novamente.");
    }
  };

  const formatFileSize = cargaUtils.formatarTamanhoArquivo;

  const getDocumentIcon = (tipo: string) => {
    if (tipo.includes("pdf")) return "📄";
    if (tipo.includes("image")) return "🖼️";
    if (tipo.includes("word") || tipo.includes("document")) return "📝";
    if (tipo.includes("excel") || tipo.includes("spreadsheet")) return "📊";
    return "📎";
  };

  // Renderizar aba básica
  const renderAbaBasica = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Informações da Carga */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
          <FiPackage className="w-5 h-5 mr-2" />
          Informações da Carga
        </h4>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Código
          </label>
          <input
            type="text"
            value={formData.codigo || ""}
            disabled
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Descrição *
          </label>
          <textarea
            value={formData.descricao || ""}
            onChange={(e) => handleInputChange("descricao", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.descricao
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700`}
            rows={2}
          />
          {errors.descricao && (
            <p className="mt-1 text-sm text-red-500">{errors.descricao}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tipo de Carga *
          </label>
          <select
            value={formData.tipoCarga || ""}
            onChange={(e) => handleInputChange("tipoCarga", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
          >
            <option value="">Selecione...</option>
            <option value="Contentorizada">Contentorizada</option>
            <option value="Solta">Solta</option>
            <option value="Granel">Granel</option>
            <option value="Frigorífica">Frigorífica</option>
            <option value="Perigosa">Perigosa</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Natureza da Carga *
          </label>
          <select
            value={formData.naturezaCarga || ""}
            onChange={(e) => handleInputChange("naturezaCarga", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
          >
            <option value="">Selecione...</option>
            <option value="perigosa">Perigosa</option>
            <option value="não perigosa">Não Perigosa</option>
            <option value="sensível">Sensível</option>
            <option value="fragil">Frágil</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Categoria para Seguro *
          </label>
          <select
            value={formData.categoriaSeguro || ""}
            onChange={(e) =>
              handleInputChange("categoriaSeguro", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
          >
            <option value="">Selecione...</option>
            <option value="Produtos Alimentares">Produtos Alimentares</option>
            <option value="Eletrónicos">Eletrónicos</option>
            <option value="Materiais Perigosos">Materiais Perigosos</option>
            <option value="Carga Geral">Carga Geral</option>
            <option value="Carga Consolidada">Carga Consolidada</option>
          </select>
        </div>
      </div>

      {/* Características Físicas */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
          <FiBox className="w-5 h-5 mr-2" />
          Características Físicas
        </h4>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Peso Bruto (kg) *
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.pesoBruto || ""}
            onChange={(e) => handleNumberChange("pesoBruto", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.pesoBruto
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700`}
          />
          {errors.pesoBruto && (
            <p className="mt-1 text-sm text-red-500">{errors.pesoBruto}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Peso Líquido (kg)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.pesoLiquido || ""}
            onChange={(e) => handleNumberChange("pesoLiquido", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Volume (m³)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.volume || ""}
            onChange={(e) => handleNumberChange("volume", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Quantidade de Volumes
          </label>
          <input
            type="number"
            value={formData.quantidadeVolumes || ""}
            onChange={(e) =>
              handleNumberChange("quantidadeVolumes", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Embalagem
          </label>
          <input
            type="text"
            value={formData.embalagem || ""}
            onChange={(e) => handleInputChange("embalagem", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
          />
        </div>
      </div>
    </div>
  );

  // Renderizar aba localização
  const renderAbaLocalizacao = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Origem */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
          <FiMapPin className="w-5 h-5 mr-2" />
          Origem *
        </h4>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            País *
          </label>
          <input
            type="text"
            value={formData.origem?.pais || ""}
            onChange={(e) => handleOrigemChange("pais", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.origem?.includes("país")
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Cidade *
          </label>
          <input
            type="text"
            value={formData.origem?.cidade || ""}
            onChange={(e) => handleOrigemChange("cidade", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.origem?.includes("cidade")
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Local (endereço) *
          </label>
          <input
            type="text"
            value={formData.origem?.local || ""}
            onChange={(e) => handleOrigemChange("local", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.origem?.includes("local")
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700`}
          />
        </div>

        {/* Coordenadas da Origem */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Latitude
            </label>
            <input
              type="number"
              step="0.000001"
              value={formData.origem?.coordenadas?.lat || ""}
              onChange={(e) =>
                handleOrigemCoordenadasChange("lat", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
              placeholder="-19.8333"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Longitude
            </label>
            <input
              type="number"
              step="0.000001"
              value={formData.origem?.coordenadas?.lng || ""}
              onChange={(e) =>
                handleOrigemCoordenadasChange("lng", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
              placeholder="34.8500"
            />
          </div>
        </div>
      </div>

      {/* Destino */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
          <FiMapPin className="w-5 h-5 mr-2" />
          Destino *
        </h4>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            País *
          </label>
          <input
            type="text"
            value={formData.destino?.pais || ""}
            onChange={(e) => handleDestinoChange("pais", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.destino?.includes("país")
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Cidade *
          </label>
          <input
            type="text"
            value={formData.destino?.cidade || ""}
            onChange={(e) => handleDestinoChange("cidade", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.destino?.includes("cidade")
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Local (endereço) *
          </label>
          <input
            type="text"
            value={formData.destino?.local || ""}
            onChange={(e) => handleDestinoChange("local", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.destino?.includes("local")
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700`}
          />
        </div>

        {/* Coordenadas do Destino */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Latitude
            </label>
            <input
              type="number"
              step="0.000001"
              value={formData.destino?.coordenadas?.lat || ""}
              onChange={(e) =>
                handleDestinoCoordenadasChange("lat", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
              placeholder="-25.9667"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Longitude
            </label>
            <input
              type="number"
              step="0.000001"
              value={formData.destino?.coordenadas?.lng || ""}
              onChange={(e) =>
                handleDestinoCoordenadasChange("lng", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
              placeholder="32.5833"
            />
          </div>
        </div>
      </div>
      {/* Importador e Exportador */}
      <div className="md:col-span-2 space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
          <FiUser className="w-5 h-5 mr-2" />
          Parte Envolvida
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Exportador
            </label>
            <input
              type="text"
              value={formData.exportador || ""}
              onChange={(e) => handleInputChange("exportador", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
              placeholder="Nome ou empresa exportadora"
            />
            <p className="mt-1 text-xs text-gray-500">
              Empresa responsável pela exportação
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Importador
            </label>
            <input
              type="text"
              value={formData.importador || ""}
              onChange={(e) => handleInputChange("importador", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
              placeholder="Nome ou empresa importadora"
            />
            <p className="mt-1 text-xs text-gray-500">
              Empresa responsável pela importação
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Consignatário
          </label>
          <input
            type="text"
            value={formData.consignatario || ""}
            onChange={(e) => handleInputChange("consignatario", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
            placeholder="Pessoa/empresa a quem a mercadoria é consignada"
          />
          <p className="mt-1 text-xs text-gray-500">
            Destinatário final da mercadoria
          </p>
        </div>
      </div>
      {/* Lacres - Adicionar na aba Localização ou Detalhes */}
      <div className="md:col-span-2 space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
          <FiLock className="w-5 h-5 mr-2" />
          Controle de Lacres
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Lacre de Origem
            </label>
            <input
              type="text"
              value={formData.contentor?.lacreOrigem || ""}
              onChange={(e) => handleLacreChange("origem", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
              placeholder="Número do lacre aplicado na origem"
            />
            <p className="mt-1 text-xs text-gray-500">
              Aplicado no momento da coleta
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Lacre de Destino
            </label>
            <input
              type="text"
              value={formData.contentor?.lacreDestino || ""}
              onChange={(e) => handleLacreChange("destino", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
              placeholder="Número do lacre verificado no destino"
            />
            <p className="mt-1 text-xs text-gray-500">
              Verificado no momento da entrega
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Renderizar aba financeiro
  const renderAbaFinanceiro = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Valores Financeiros */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
          <FiDollarSign className="w-5 h-5 mr-2" />
          Valores Financeiros
        </h4>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Valor da Mercadoria (MZN) *
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.valorMercadoria || ""}
            onChange={(e) =>
              handleNumberChange("valorMercadoria", e.target.value)
            }
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.valorMercadoria
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700`}
          />
          {errors.valorMercadoria && (
            <p className="mt-1 text-sm text-red-500">
              {errors.valorMercadoria}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Taxas Portuárias (MZN)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.taxasPortuarias || ""}
            onChange={(e) =>
              handleNumberChange("taxasPortuarias", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
          />
          <p className="mt-1 text-xs text-gray-500">
            Taxas cobradas por serviços portuários
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Despesas Operacionais (MZN)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.despesasOperacionais || ""}
            onChange={(e) =>
              handleNumberChange("despesasOperacionais", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
          />
          <p className="mt-1 text-xs text-gray-500">
            Despesas com alimentação, hospedagem, combustível, etc.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Custo da Carga (MZN)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.custoCarga || ""}
            onChange={(e) => handleNumberChange("custoCarga", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Valor Total (MZN)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.valorTotal || ""}
            onChange={(e) => handleNumberChange("valorTotal", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
            disabled
          />
          <p className="mt-1 text-xs text-gray-500">
            Calculado automaticamente: Frete + Taxas + Despesas + Seguros
          </p>
        </div>
      </div>

      {/* Configurações - Manter os existentes */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
          <FiLayers className="w-5 h-5 mr-2" />
          Configurações
        </h4>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Prioridade
          </label>
          <select
            value={formData.prioridade || ""}
            onChange={(e) => handleInputChange("prioridade", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
          >
            <option value="baixa">Baixa</option>
            <option value="média">Média</option>
            <option value="alta">Alta</option>
            <option value="urgente">Urgente</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <select
            value={formData.status || ""}
            onChange={(e) => handleInputChange("status", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
          >
            <option value="planeada">Planeada</option>
            <option value="aguardando_coleta">Aguardando Coleta</option>
            <option value="coletada">Coletada</option>
            <option value="em_transito">Em Trânsito</option>
            <option value="em_fronteira">Em Fronteira</option>
            <option value="aguardando_desembaraco">
              Aguardando Desembaraço
            </option>
            <option value="em_entrega">Em Entrega</option>
            <option value="entregue">Entregue</option>
            <option value="encerrada">Encerrada</option>
            <option value="armazenada">Armazenada</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Cliente
          </label>
          <input
            type="text"
            value={formData.cliente || ""}
            disabled
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
          />
          <p className="mt-1 text-xs text-gray-500">
            Para alterar o cliente, entre em contato com o administrador
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            ID do Cliente
          </label>
          <input
            type="text"
            value={formData.clienteId || ""}
            disabled
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
          />
        </div>
      </div>

      {/* Datas - Manter os existentes */}
      <div className="md:col-span-2 space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
          <FiCalendar className="w-5 h-5 mr-2" />
          Datas
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Data de Coleta
            </label>
            <input
              type="date"
              value={formData.dataColeta || ""}
              onChange={(e) => handleInputChange("dataColeta", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Data de Entrega Prevista
            </label>
            <input
              type="date"
              value={formData.dataEntregaPrevista || ""}
              onChange={(e) =>
                handleInputChange("dataEntregaPrevista", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
  // Renderizar aba detalhes
  const renderAbaDetalhes = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Contentor */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
          <FiBox className="w-5 h-5 mr-2" />
          Contentor
        </h4>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Número do Contentor
          </label>
          <input
            type="text"
            value={formData.contentor?.numero || ""}
            onChange={(e) =>
              handleInputChange("contentor", {
                ...formData.contentor,
                numero: e.target.value,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tipo
          </label>
          <input
            type="text"
            value={formData.contentor?.tipo || ""}
            onChange={(e) =>
              handleInputChange("contentor", {
                ...formData.contentor,
                tipo: e.target.value,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tara (kg)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.contentor?.tara || ""}
            onChange={(e) =>
              handleInputChange("contentor", {
                ...formData.contentor,
                tara: parseFloat(e.target.value),
              })
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
          />
        </div>
      </div>

      {/* Veículo e Motorista - DESABILITADO */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white flex items-center opacity-50">
          <FiTruck className="w-5 h-5 mr-2" />
          Veículo (Informações somente leitura)
        </h4>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Matrícula
          </label>
          <input
            type="text"
            value={formData.veiculo?.matricula || ""}
            disabled
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
          />
          <p className="mt-1 text-xs text-gray-500">
            Para alterar o veículo, use a função específica de associação
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Modelo
          </label>
          <input
            type="text"
            value={formData.veiculo?.modelo || ""}
            disabled
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            ID do Motorista
          </label>
          <input
            type="number"
            value={formData.motorista?.id || ""}
            disabled
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nome do Motorista
          </label>
          <input
            type="text"
            value={formData.motorista?.nome || ""}
            disabled
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
          />
          <p className="mt-1 text-xs text-gray-500">
            Para alterar o motorista, use a função específica de associação
          </p>
        </div>
      </div>

      {/* Observações */}
      <div className="md:col-span-2 space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
          <FiFileText className="w-5 h-5 mr-2" />
          Observações e Instruções
        </h4>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Observações
          </label>
          <textarea
            value={formData.observacoes || ""}
            onChange={(e) => handleInputChange("observacoes", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
            placeholder="Adicione observações importantes sobre a carga..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Instruções Especiais
          </label>
          <textarea
            value={formData.instrucaoEspecial || ""}
            onChange={(e) =>
              handleInputChange("instrucaoEspecial", e.target.value)
            }
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
            placeholder="Instruções especiais para manuseio ou transporte..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Contato do Cliente
          </label>
          <input
            type="text"
            value={formData.contatoCliente || ""}
            onChange={(e) =>
              handleInputChange("contatoCliente", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
          />
        </div>
      </div>
    </div>
  );

  // Renderizar aba documentos
  const renderAbaDocumentos = () => (
    <div className="space-y-6">
      {/* Área de Upload */}
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
        <FiUpload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          Arraste e solte arquivos aqui ou
        </p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          multiple
          accept=".jpg,.jpeg,.png,.gif,.webp,.pdf"
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent inline-block mr-2"></div>
              Enviando...
            </>
          ) : (
            <>
              <FiUpload className="inline w-4 h-4 mr-2" />
              Selecionar Arquivos
            </>
          )}
        </button>
        <p className="text-xs text-gray-500 mt-2">
          Formatos suportados: JPG, JPEG, PNG, GIF, WEBP, PDF
        </p>
        <p className="text-xs text-gray-500">
          Tamanho máximo: 10MB por arquivo
        </p>
      </div>

      {/* Lista de Documentos */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-4">
          Documentos da Carga ({documentos.length})
        </h4>

        {documentos.length === 0 ? (
          <div className="text-center py-8">
            <FiFile className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Nenhum documento carregado</p>
            <p className="text-sm text-gray-400 mt-1">
              Faça upload dos documentos relacionados à carga
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {documentos.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getDocumentIcon(doc.tipo)}</div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {doc.nome}
                    </div>
                    <div className="text-xs text-gray-500">
                      {doc.descricao && (
                        <span className="mr-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded">
                          {doc.descricao}
                        </span>
                      )}
                      {formatFileSize(doc.tamanho)} •{" "}
                      {new Date(doc.dataUpload).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleViewDocument(doc.url)}
                    className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                    title="Visualizar"
                    disabled={uploading} // Desabilitar durante upload
                  >
                    <FiEye className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadDocument(doc)}
                    className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg"
                    title="Download"
                    disabled={uploading}
                  >
                    <FiDownload className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveDocument(doc.id)}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                    title="Remover"
                    disabled={uploading}
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tipos de Documentos Necessários */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h5 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
          Tipos de Documentos Recomendados:
        </h5>
        <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
          <li>• Conhecimento de Embarque (Bill of Lading)</li>
          <li>• Invoice (Fatura Comercial)</li>
          <li>• Packing List (Lista de Embalagem)</li>
          <li>• Certificado de Origem</li>
          <li>• Contrato de Transporte</li>
          <li>• Número de Cotação</li>
          <li>• Recibo de Pagamento</li>
          <li>• Nota de Débito</li>
          <li>• Manifesto de Carga</li>
          <li>• Outros documentos relevantes</li>
        </ul>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case "basico":
        return renderAbaBasica();
      case "localizacao":
        return renderAbaLocalizacao();
      case "financeiro":
        return renderAbaFinanceiro();
      case "detalhes":
        return renderAbaDetalhes();
      case "documentos":
        return renderAbaDocumentos();
      default:
        return renderAbaBasica();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {uploadErrors.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <h5 className="font-medium text-red-800 dark:text-red-300 mb-2">
            Erros durante upload:
          </h5>
          <ul className="text-sm text-red-700 dark:text-red-400 space-y-1">
            {uploadErrors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setUploadErrors([])}
            className="mt-2 text-xs text-red-600 hover:text-red-800"
          >
            Limpar erros
          </button>
        </div>
      )}
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Editar Carga: {carga.codigo}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Cliente: {carga.cliente} • Status: {carga.status}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Tabs - Adicionada aba Documentos */}
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-4 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("basico")}
                  className={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === "basico"
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <FiPackage className="inline w-4 h-4 mr-2" />
                  Básico
                </button>
                <button
                  onClick={() => setActiveTab("localizacao")}
                  className={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === "localizacao"
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <FiMapPin className="inline w-4 h-4 mr-2" />
                  Localização
                </button>
                <button
                  onClick={() => setActiveTab("financeiro")}
                  className={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === "financeiro"
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <FiDollarSign className="inline w-4 h-4 mr-2" />
                  Financeiro
                </button>
                <button
                  onClick={() => setActiveTab("detalhes")}
                  className={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === "detalhes"
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <FiFileText className="inline w-4 h-4 mr-2" />
                  Detalhes
                </button>
                <button
                  onClick={() => setActiveTab("documentos")}
                  className={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === "documentos"
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <FiFile className="inline w-4 h-4 mr-2" />
                  Documentos
                </button>
              </nav>
            </div>

            {/* Conteúdo rolável para a aba de documentos */}
            <div
              className={
                activeTab === "documentos" ? "max-h-[60vh] overflow-y-auto" : ""
              }
            >
              <form onSubmit={handleSubmit}>
                {renderActiveTab()}

                {/* Erro geral */}
                {errors.submit && (
                  <div className="mt-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errors.submit}
                    </p>
                  </div>
                )}

                {/* Botões de ação */}
                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Salvando...
                      </>
                    ) : (
                      "Salvar Alterações"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
