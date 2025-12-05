// Crie um novo arquivo chamado MotoristaAssociadoDetailsModal.tsx
import { useState } from "react";
import {
  FiX,
  FiUser,
  FiFileText,
  FiTruck,
  FiStar,
  FiAward,
  FiMapPin,
  FiPhone,
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiBarChart2,
  FiShield,
  FiPrinter,
  FiDownload,
  FiNavigation,
} from "react-icons/fi";
import Image from "next/image";

export interface MotoristaAssociado {
  motoristaId: number;
  nomeCompleto: string;
  dataNascimento?: string;
  nacionalidade?: string;
  empresaMotorista: string;
  empresaMotoristaId: number;
  cargo?: string;
  dataAdmissao?: string;
  statusContratual: "ativo" | "inativo" | "ferias" | "licenca" | "suspenso";
  numeroBI: string;
  validadeBI: string;
  nuit?: string;
  cartaConducao: {
    numero: string;
    categoria: "CE" | "C" | "D" | "E";
    dataEmissao?: string;
    validade: string;
    localEmissao?: string;
  };
  licencaProfissional?: {
    numero: string;
    validade?: string;
    categoria?: string;
  };
  contactos: {
    telefonePrincipal: string;
    telefoneAlternativo?: string;
    email?: string;
    emergencia?: {
      nome?: string;
      parentesco?: string;
      telefone?: string;
    };
  };
  endereco?: {
    provincia?: string;
    cidade?: string;
    bairro?: string;
    rua?: string;
    numeroCasa?: string;
  };
  avaliacaoGeral?: number;
  avaliacaoDetalhada?: {
    seguranca?: number;
    cumprimentoRota?: number;
    pontualidade?: number;
    comunicacao?: number;
    economiaCombustivel?: number;
    cuidadoVeiculo?: number;
    documentacao?: number;
  };
  totalViagensRealizadas: number;
  totalKmPercorridos: number;
  indiceAcidentes: number;
  indiceMultas: number;
  veiculosHabilitados: Array<{
    tipo: string;
    marca: string;
    modelo: string;
    pesoMaximo: number;
    matricula: string;
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
    };
    viabilidade: {
      podeChante: boolean;
      podeNacional: boolean;
      podeTransito: boolean;
    };
  }>;
  infoTransportador: {
    totalCamioes: number;
    qualificadoTransito: boolean;
    restricoes: {
      motivo?: string;
      dataVerificacao?: string;
      podeFazerNacional: boolean;
      podeFazerTransito: boolean;
    };
  };
  status: "disponivel" | "em_viagem" | "ferias" | "licenca" | "indisponivel";
  dataCriacao: string;
  dataAtualizacao: string;
  observacoes?: string;
  foto?: string;
}

interface MotoristaAssociadoDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  motorista: MotoristaAssociado | null;
  camiaoInfo?: {
    matricula: string;
    marca: string;
    modelo: string;
  };
  onEdit?: (motorista: MotoristaAssociado) => void;
  onDesassociar?: (motoristaId: number, camiaoId: number) => void;
  onContactar?: (motorista: MotoristaAssociado) => void;
}

export function MotoristaAssociadoDetailsModal({
  isOpen,
  onClose,
  motorista,
  camiaoInfo,
  onEdit,
  onDesassociar,
  onContactar,
}: MotoristaAssociadoDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("geral");

  if (!isOpen || !motorista) return null;

  // Funções auxiliares para formatação e estilos
  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      disponivel: "bg-green-100 text-green-800 border-green-200",
      em_viagem: "bg-blue-100 text-blue-800 border-blue-200",
      ferias: "bg-yellow-100 text-yellow-800 border-yellow-200",
      licenca: "bg-purple-100 text-purple-800 border-purple-200",
      indisponivel: "bg-red-100 text-red-800 border-red-200",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      disponivel: "Disponível",
      em_viagem: "Em Viagem",
      ferias: "Férias",
      licenca: "Licença",
      indisponivel: "Indisponível",
    };
    return statusMap[status] || status;
  };

  const getStatusContratualColor = (status: string) => {
    const statusColors: Record<string, string> = {
      ativo: "bg-green-100 text-green-800 border-green-200",
      inativo: "bg-gray-100 text-gray-800 border-gray-200",
      ferias: "bg-yellow-100 text-yellow-800 border-yellow-200",
      licenca: "bg-blue-100 text-blue-800 border-blue-200",
      suspenso: "bg-red-100 text-red-800 border-red-200",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusContratualText = (status: string) => {
    const statusMap: Record<string, string> = {
      ativo: "Ativo",
      inativo: "Inativo",
      ferias: "Férias",
      licenca: "Licença",
      suspenso: "Suspenso",
    };
    return statusMap[status] || status;
  };

  const getCategoriaCartaText = (categoria: string) => {
    const categoriaMap: Record<string, string> = {
      CE: "CE",
      C: "C",
      D: "D",
      E: "E",
    };
    return categoriaMap[categoria] || categoria;
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

  const formatarAvaliacao = (avaliacao: number) => {
    return avaliacao.toFixed(1);
  };

  const calcularIdade = (dataNascimento: string) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
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

  // Contar veículos por categoria
  const contarVeiculosPorCategoria = () => {
    const categorias = { A: 0, B: 0, C: 0 };
    motorista.veiculosHabilitados.forEach((veiculo) => {
      if (veiculo.nivelInspecao?.categoria in categorias) {
        categorias[
          veiculo.nivelInspecao.categoria as keyof typeof categorias
        ]++;
      }
    });
    return categorias;
  };

  // Renderizar conteúdo baseado na aba ativa
  const renderTabContent = () => {
    switch (activeTab) {
      case "geral":
        return <GeralTab motorista={motorista} />;
      case "documentos":
        return <DocumentosTab motorista={motorista} />;
      case "veiculos":
        return <VeiculosTab motorista={motorista} />;
      case "desempenho":
        return <DesempenhoTab motorista={motorista} />;
      case "transportador":
        return <TransportadorTab motorista={motorista} />;
      default:
        return <GeralTab motorista={motorista} />;
    }
  };

  // Componentes das abas
  const GeralTab = ({ motorista }: { motorista: MotoristaAssociado }) => (
    <div className="space-y-6">
      {/* Informações Pessoais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <FiUser className="w-5 h-5 mr-2 text-blue-600" />
            Informações Pessoais
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Nome Completo:
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {motorista.nomeCompleto}
              </span>
            </div>

            {motorista.dataNascimento && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Data Nascimento:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatarData(motorista.dataNascimento)} (
                  {calcularIdade(motorista.dataNascimento)} anos)
                </span>
              </div>
            )}

            {motorista.nacionalidade && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Nacionalidade:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {motorista.nacionalidade}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                BI:
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {motorista.numeroBI}
              </span>
            </div>

            {motorista.nuit && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  NUIT:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {motorista.nuit}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Informações de Contato */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <FiPhone className="w-5 h-5 mr-2 text-green-600" />
            Contatos
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Telefone:
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {motorista.contactos.telefonePrincipal}
              </span>
            </div>

            {motorista.contactos.telefoneAlternativo && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Telefone Alternativo:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {motorista.contactos.telefoneAlternativo}
                </span>
              </div>
            )}

            {motorista.contactos.email && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Email:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {motorista.contactos.email}
                </span>
              </div>
            )}
          </div>

          {/* Contato de Emergência */}
          {motorista.contactos.emergencia && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                Contato de Emergência
              </h4>
              <div className="space-y-1 text-sm">
                <div>{motorista.contactos.emergencia.nome}</div>
                <div className="text-yellow-700 dark:text-yellow-300">
                  {motorista.contactos.emergencia.parentesco}
                </div>
                <div className="font-medium">
                  {motorista.contactos.emergencia.telefone}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Informações Profissionais */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiUser className="w-5 h-5 mr-2 text-purple-600" />
          Informações Profissionais
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Empresa:</span>
            <div className="font-medium text-gray-900 dark:text-white">
              {motorista.empresaMotorista}
            </div>
          </div>

          <div>
            <span className="text-gray-600 dark:text-gray-400">Cargo:</span>
            <div className="font-medium text-gray-900 dark:text-white">
              {motorista.cargo || "Motorista Profissional"}
            </div>
          </div>

          {motorista.dataAdmissao && (
            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Data Admissão:
              </span>
              <div className="font-medium text-gray-900 dark:text-white">
                {formatarData(motorista.dataAdmissao)}
              </div>
            </div>
          )}

          <div>
            <span className="text-gray-600 dark:text-gray-400">
              ID Motorista:
            </span>
            <div className="font-medium text-gray-900 dark:text-white">
              {motorista.motoristaId}
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div
            className={`inline-flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-2 ${
              motorista.status === "disponivel"
                ? "bg-green-100 text-green-600"
                : motorista.status === "em_viagem"
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            <FiUser className="w-6 h-6" />
          </div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            Status Operacional
          </div>
          <div
            className={`text-sm font-semibold ${
              motorista.status === "disponivel"
                ? "text-green-600"
                : motorista.status === "em_viagem"
                ? "text-blue-600"
                : "text-gray-600"
            }`}
          >
            {getStatusText(motorista.status)}
          </div>
        </div>

        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div
            className={`inline-flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-2 ${
              motorista.statusContratual === "ativo"
                ? "bg-green-100 text-green-600"
                : motorista.statusContratual === "inativo"
                ? "bg-gray-100 text-gray-400"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            <FiCheckCircle className="w-6 h-6" />
          </div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            Status Contratual
          </div>
          <div
            className={`text-sm font-semibold ${
              motorista.statusContratual === "ativo"
                ? "text-green-600"
                : motorista.statusContratual === "inativo"
                ? "text-gray-600"
                : "text-yellow-600"
            }`}
          >
            {getStatusContratualText(motorista.statusContratual)}
          </div>
        </div>
      </div>
    </div>
  );

  const DocumentosTab = ({ motorista }: { motorista: MotoristaAssociado }) => (
    <div className="space-y-6">
      {/* Carta de Condução */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiFileText className="w-5 h-5 mr-2 text-blue-600" />
          Carta de Condução
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Número:</span>
            <div className="font-medium text-gray-900 dark:text-white">
              {motorista.cartaConducao.numero}
            </div>
          </div>

          <div>
            <span className="text-gray-600 dark:text-gray-400">Categoria:</span>
            <div className="font-medium text-gray-900 dark:text-white">
              {getCategoriaCartaText(motorista.cartaConducao.categoria)}
            </div>
          </div>

          {motorista.cartaConducao.dataEmissao && (
            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Data Emissão:
              </span>
              <div className="font-medium text-gray-900 dark:text-white">
                {formatarData(motorista.cartaConducao.dataEmissao)}
              </div>
            </div>
          )}

          <div>
            <span className="text-gray-600 dark:text-gray-400">Validade:</span>
            <div
              className={`font-medium flex items-center ${
                isDocumentoVencido(motorista.cartaConducao.validade)
                  ? "text-red-600"
                  : isDocumentoProximoVencimento(
                      motorista.cartaConducao.validade
                    )
                  ? "text-orange-600"
                  : "text-green-600"
              }`}
            >
              {formatarData(motorista.cartaConducao.validade)}
              {(isDocumentoVencido(motorista.cartaConducao.validade) ||
                isDocumentoProximoVencimento(
                  motorista.cartaConducao.validade
                )) && <FiAlertTriangle className="w-4 h-4 ml-1" />}
            </div>
          </div>

          {motorista.cartaConducao.localEmissao && (
            <div className="md:col-span-2">
              <span className="text-gray-600 dark:text-gray-400">
                Local Emissão:
              </span>
              <div className="font-medium text-gray-900 dark:text-white">
                {motorista.cartaConducao.localEmissao}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Licença Profissional */}
      {motorista.licencaProfissional && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <FiAward className="w-5 h-5 mr-2 text-green-600" />
            Licença Profissional
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Número:</span>
              <div className="font-medium text-gray-900 dark:text-white">
                {motorista.licencaProfissional.numero}
              </div>
            </div>

            {motorista.licencaProfissional.categoria && (
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  Categoria:
                </span>
                <div className="font-medium text-gray-900 dark:text-white">
                  {motorista.licencaProfissional.categoria}
                </div>
              </div>
            )}

            {motorista.licencaProfissional.validade && (
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  Validade:
                </span>
                <div
                  className={`font-medium flex items-center ${
                    isDocumentoVencido(motorista.licencaProfissional.validade)
                      ? "text-red-600"
                      : isDocumentoProximoVencimento(
                          motorista.licencaProfissional.validade
                        )
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {formatarData(motorista.licencaProfissional.validade)}
                  {(isDocumentoVencido(
                    motorista.licencaProfissional.validade
                  ) ||
                    isDocumentoProximoVencimento(
                      motorista.licencaProfissional.validade
                    )) && <FiAlertTriangle className="w-4 h-4 ml-1" />}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bilhete de Identidade */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiUser className="w-5 h-5 mr-2 text-purple-600" />
          Bilhete de Identidade
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Número:</span>
            <div className="font-medium text-gray-900 dark:text-white">
              {motorista.numeroBI}
            </div>
          </div>

          <div>
            <span className="text-gray-600 dark:text-gray-400">Validade:</span>
            <div
              className={`font-medium flex items-center ${
                isDocumentoVencido(motorista.validadeBI)
                  ? "text-red-600"
                  : isDocumentoProximoVencimento(motorista.validadeBI)
                  ? "text-orange-600"
                  : "text-green-600"
              }`}
            >
              {formatarData(motorista.validadeBI)}
              {(isDocumentoVencido(motorista.validadeBI) ||
                isDocumentoProximoVencimento(motorista.validadeBI)) && (
                <FiAlertTriangle className="w-4 h-4 ml-1" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const VeiculosTab = ({ motorista }: { motorista: MotoristaAssociado }) => {
    const veiculosPorCategoria = contarVeiculosPorCategoria();

    return (
      <div className="space-y-6">
        {/* Resumo de Veículos */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <FiTruck className="w-5 h-5 mr-2 text-blue-600" />
            Resumo de Veículos Habilitados
          </h3>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg font-bold text-red-600">
                  {veiculosPorCategoria.A}
                </span>
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Categoria A
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Chanté
              </div>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg font-bold text-orange-600">
                  {veiculosPorCategoria.B}
                </span>
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Categoria B
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Nacional
              </div>
            </div>

            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg font-bold text-green-600">
                  {veiculosPorCategoria.C}
                </span>
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Categoria C
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Trânsito
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {motorista.veiculosHabilitados.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total de Veículos
            </div>
          </div>
        </div>

        {/* Lista de Veículos */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <FiTruck className="w-5 h-5 mr-2 text-green-600" />
            Veículos Habilitados
          </h3>

          {motorista.veiculosHabilitados.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <FiTruck className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>Nenhum veículo habilitado</p>
            </div>
          ) : (
            <div className="space-y-3">
              {motorista.veiculosHabilitados.map((veiculo, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {veiculo.marca} {veiculo.modelo}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {veiculo.matricula}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        veiculo.nivelInspecao.categoria === "A"
                          ? "bg-red-100 text-red-800"
                          : veiculo.nivelInspecao.categoria === "B"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      Categoria {veiculo.nivelInspecao.categoria}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">
                        Tipo:
                      </span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {veiculo.tipo}
                      </div>
                    </div>

                    <div>
                      <span className="text-gray-600 dark:text-gray-400">
                        Peso Máximo:
                      </span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {formatarNumero(veiculo.pesoMaximo)} kg
                      </div>
                    </div>
                  </div>

                  {/* Viabilidade */}
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Viabilidade
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {veiculo.viabilidade.podeChante && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                          <FiCheckCircle className="w-3 h-3 mr-1" />
                          Chanté
                        </span>
                      )}
                      {veiculo.viabilidade.podeNacional && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                          <FiCheckCircle className="w-3 h-3 mr-1" />
                          Nacional
                        </span>
                      )}
                      {veiculo.viabilidade.podeTransito && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-800">
                          <FiCheckCircle className="w-3 h-3 mr-1" />
                          Trânsito
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const DesempenhoTab = ({ motorista }: { motorista: MotoristaAssociado }) => (
    <div className="space-y-6">
      {/* Métricas Principais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <FiStar className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {motorista.avaliacaoGeral
              ? formatarAvaliacao(motorista.avaliacaoGeral)
              : "N/A"}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Avaliação Geral
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <FiTruck className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatarNumero(motorista.totalViagensRealizadas)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Viagens
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <FiMapPin className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatarNumero(motorista.totalKmPercorridos)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            KM Percorridos
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <FiShield className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {motorista.indiceAcidentes.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Índice Acidentes
          </div>
        </div>
      </div>

      {/* Avaliação Detalhada */}
      {motorista.avaliacaoDetalhada && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <FiBarChart2 className="w-5 h-5 mr-2 text-purple-600" />
            Avaliação Detalhada
          </h3>

          <div className="space-y-3">
            {Object.entries(motorista.avaliacaoDetalhada).map(
              ([key, value]) =>
                value !== undefined && (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}:
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(value / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-8">
                        {formatarAvaliacao(value)}
                      </span>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      )}

      {/* Estatísticas Adicionais */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiClock className="w-5 h-5 mr-2 text-orange-600" />
          Estatísticas Adicionais
        </h3>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">
              Índice de Multas:
            </span>
            <div className="font-medium text-gray-900 dark:text-white">
              {motorista.indiceMultas.toFixed(1)}%
            </div>
          </div>

          <div>
            <span className="text-gray-600 dark:text-gray-400">
              Média KM por Viagem:
            </span>
            <div className="font-medium text-gray-900 dark:text-white">
              {motorista.totalViagensRealizadas > 0
                ? formatarNumero(
                    Math.round(
                      motorista.totalKmPercorridos /
                        motorista.totalViagensRealizadas
                    )
                  )
                : 0}{" "}
              km
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TransportadorTab = ({
    motorista,
  }: {
    motorista: MotoristaAssociado;
  }) => (
    <div className="space-y-6">
      {/* Informações do Transportador */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiAward className="w-5 h-5 mr-2 text-green-600" />
          Informações do Transportador
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">
              Total de Camiões:
            </span>
            <div className="font-medium text-gray-900 dark:text-white">
              {motorista.infoTransportador.totalCamioes}
            </div>
          </div>

          <div>
            <span className="text-gray-600 dark:text-gray-400">
              Qualificado Trânsito:
            </span>
            <div className="font-medium text-gray-900 dark:text-white">
              {motorista.infoTransportador.qualificadoTransito ? (
                <span className="text-green-600 flex items-center">
                  <FiCheckCircle className="w-4 h-4 mr-1" />
                  Sim
                </span>
              ) : (
                <span className="text-red-600">Não</span>
              )}
            </div>
          </div>

          <div>
            <span className="text-gray-600 dark:text-gray-400">
              Pode Fazer Nacional:
            </span>
            <div className="font-medium text-gray-900 dark:text-white">
              {motorista.infoTransportador.restricoes.podeFazerNacional ? (
                <span className="text-green-600">Sim</span>
              ) : (
                <span className="text-red-600">Não</span>
              )}
            </div>
          </div>
        </div>

        {motorista.infoTransportador.restricoes.motivo && (
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Restrições:</strong>{" "}
              {motorista.infoTransportador.restricoes.motivo}
            </div>
          </div>
        )}
      </div>

      {/* Viabilidade do Transportador */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiNavigation className="w-5 h-5 mr-2 text-purple-600" />
          Viabilidade do Transportador
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
                motorista.infoTransportador.restricoes.podeFazerNacional
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
                motorista.infoTransportador.restricoes.podeFazerNacional
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {motorista.infoTransportador.restricoes.podeFazerNacional
                ? "Permitido"
                : "Não Permitido"}
            </div>
          </div>

          <div className="text-center">
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
                motorista.infoTransportador.qualificadoTransito
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
                motorista.infoTransportador.qualificadoTransito
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {motorista.infoTransportador.qualificadoTransito
                ? "Qualificado"
                : "Não Qualificado"}
            </div>
          </div>
        </div>
      </div>
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
                {motorista.foto ? (
                  <Image
                    src={motorista.foto}
                    alt={motorista.nomeCompleto}
                    width={48} // equivalente ao h-12 w-12
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                    unoptimized={true} // necessário se for Electron, file:// ou domínio não configurado
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <FiUser className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {motorista.nomeCompleto}
                </h2>
                <div className="flex items-center space-x-2 mt-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      motorista.status
                    )}`}
                  >
                    {getStatusText(motorista.status)}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusContratualColor(
                      motorista.statusContratual
                    )}`}
                  >
                    {getStatusContratualText(motorista.statusContratual)}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ID: {motorista.motoristaId}
                  </span>
                </div>
                {camiaoInfo && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Associado ao camião: {camiaoInfo.matricula} -{" "}
                    {camiaoInfo.marca} {camiaoInfo.modelo}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {onContactar && (
                <button
                  onClick={() => onContactar(motorista)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FiPhone className="w-4 h-4" />
                  <span>Contactar</span>
                </button>
              )}

              {onEdit && (
                <button
                  onClick={() => onEdit(motorista)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiUser className="w-4 h-4" />
                  <span>Editar</span>
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
                { id: "geral", label: "Geral", icon: FiUser },
                { id: "documentos", label: "Documentos", icon: FiFileText },
                { id: "veiculos", label: "Veículos", icon: FiTruck },
                { id: "desempenho", label: "Desempenho", icon: FiBarChart2 },
                { id: "transportador", label: "Transportador", icon: FiAward },
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
              Criado em {formatarData(motorista.dataCriacao)} • Atualizado em{" "}
              {formatarData(motorista.dataAtualizacao)}
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

              {onDesassociar && camiaoInfo && (
                <button
                  onClick={() => onDesassociar(motorista.motoristaId, 0)} // Você precisará passar o camiaoId
                  className="flex items-center space-x-2 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <FiUser className="w-4 h-4" />
                  <span>Desassociar</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
