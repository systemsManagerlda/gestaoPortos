/* eslint-disable @typescript-eslint/no-unused-vars */
// Crie um novo arquivo chamado MotoristaDetailsModal.tsx
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
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
  FiHeart,
  FiPrinter,
  FiDownload,
  FiCamera,
  FiGlobe,
  FiCalendar
} from "react-icons/fi";
import { Motorista, StatusContratual } from "./motoristas";
import { StatusMotorista } from "./modelNovoMotorista";
import { UploadFotosMotorista } from "./UploadFotosMotorista";

interface MotoristaDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  motorista: Motorista | null;
  onEdit?: (motorista: Motorista) => void;
  onAddVehicle?: (motoristaId: number) => void;
}

interface FotoMotorista {
  url: string;
  tipo: "principal" | "documento" | "uniforme" | "outro";
  descricao?: string;
  dataUpload: Date;
  nomeArquivo: string;
}

export function MotoristaDetailsModal({
  isOpen,
  onClose,
  motorista,
  onEdit,
  onAddVehicle,
}: MotoristaDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("geral");

  if (!isOpen || !motorista) return null;

  // Funções auxiliares para formatação e estilos
  const getStatusColor = (status: StatusMotorista) => {
    const statusColors = {
      disponivel: "bg-green-100 text-green-800 border-green-200",
      em_viagem: "bg-blue-100 text-blue-800 border-blue-200",
      ferias: "bg-yellow-100 text-yellow-800 border-yellow-200",
      licenca: "bg-purple-100 text-purple-800 border-purple-200",
      indisponivel: "bg-red-100 text-red-800 border-red-200",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusContratualColor = (status: StatusContratual) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800 border-green-200";
      case "inativo":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "ferias":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "licenca":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "suspenso":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: StatusMotorista) => {
    const statusMap: Record<StatusMotorista, string> = {
      disponivel: "Disponível",
      em_viagem: "Em Viagem",
      ferias: "Férias",
      licenca: "Licença",
      indisponivel: "Indisponível",
    };
    return statusMap[status];
  };

  const getStatusContratualText = (status: StatusContratual) => {
    const statusMap: Record<StatusContratual, string> = {
      ativo: "Ativo",
      inativo: "Inativo",
      ferias: "Férias",
      licenca: "Licença",
      suspenso: "Suspenso",
    };
    return statusMap[status];
  };

  const formatarData = (data: string | Date) => {
    const dataObj = typeof data === 'string' ? new Date(data) : data;
    return dataObj.toLocaleDateString("pt-MZ", {
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

  const isDocumentoVencido = (validade: string | Date) => {
    const validadeDate = typeof validade === 'string' ? new Date(validade) : validade;
    return validadeDate < new Date();
  };

  const isDocumentoProximoVencimento = (validade: string | Date) => {
    const hoje = new Date();
    const validadeDate = typeof validade === 'string' ? new Date(validade) : validade;
    const diffTime = validadeDate.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  // NOVA FUNÇÃO: Verificar status do passaporte
  const getPassaporteStatus = () => {
    if (!motorista.passaporte || !motorista.passaporte.numero) {
      return { status: 'nao_possui', texto: 'Não possui passaporte', cor: 'gray' };
    }
    
    if (!motorista.passaporte.validade) {
      return { status: 'sem_validade', texto: 'Passaporte (sem validade)', cor: 'yellow' };
    }
    
    const validade = new Date(motorista.passaporte.validade);
    if (isDocumentoVencido(validade)) {
      return { status: 'vencido', texto: 'Passaporte vencido', cor: 'red' };
    }
    
    if (isDocumentoProximoVencimento(validade)) {
      return { status: 'proximo_vencimento', texto: 'Passaporte próximo vencimento', cor: 'orange' };
    }
    
    return { status: 'valido', texto: 'Passaporte válido', cor: 'green' };
  };

  // Renderizar conteúdo baseado na aba ativa
  const renderTabContent = () => {
    switch (activeTab) {
      case "geral":
        return <GeralTab motorista={motorista} />;
      case "documentos":
        return <DocumentosTab motorista={motorista} />;
      case "passaporte":
        return <PassaporteTab motorista={motorista} />;
      case "veiculos":
        return <VeiculosTab motorista={motorista} />;
      case "desempenho":
        return <DesempenhoTab motorista={motorista} />;
      case "saude":
        return <SaudeTab motorista={motorista} />;
      case "fotos":
        return <FotosTab motorista={motorista} />;
      default:
        return <GeralTab motorista={motorista} />;
    }
  };

  // Componentes das abas
  const GeralTab = ({ motorista }: { motorista: Motorista }) => (
    <div className="space-y-6">
      {/* Status do Passaporte (NOVO) */}
      {motorista.passaporte && motorista.passaporte.numero && (
        <div className={`p-3 rounded-lg border ${
          getPassaporteStatus().status === 'vencido' ? 'bg-red-50 border-red-200' :
          getPassaporteStatus().status === 'proximo_vencimento' ? 'bg-orange-50 border-orange-200' :
          'bg-green-50 border-green-200'
        }`}>
          <div className="flex items-center">
            <FiGlobe className={`w-5 h-5 mr-2 ${
              getPassaporteStatus().status === 'vencido' ? 'text-red-600' :
              getPassaporteStatus().status === 'proximo_vencimento' ? 'text-orange-600' :
              'text-green-600'
            }`} />
            <span className="font-medium">
              {getPassaporteStatus().texto} • {motorista.passaporte.numero}
            </span>
          </div>
        </div>
      )}

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

      {/* Endereço */}
      {motorista.endereco && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <FiMapPin className="w-5 h-5 mr-2 text-red-600" />
            Endereço
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {motorista.endereco.provincia && (
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  Província:
                </span>
                <div className="font-medium text-gray-900 dark:text-white">
                  {motorista.endereco.provincia}
                </div>
              </div>
            )}

            {motorista.endereco.cidade && (
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  Cidade:
                </span>
                <div className="font-medium text-gray-900 dark:text-white">
                  {motorista.endereco.cidade}
                </div>
              </div>
            )}

            {motorista.endereco.bairro && (
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  Bairro:
                </span>
                <div className="font-medium text-gray-900 dark:text-white">
                  {motorista.endereco.bairro}
                </div>
              </div>
            )}

            {motorista.endereco.rua && (
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  Rua/Número:
                </span>
                <div className="font-medium text-gray-900 dark:text-white">
                  {motorista.endereco.rua} {motorista.endereco.numeroCasa}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Informações da Empresa */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
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
    </div>
  );

  const DocumentosTab = ({ motorista }: { motorista: Motorista }) => (
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
              {motorista.cartaConducao.categoria}
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
      {motorista.licencaProfissional && motorista.licencaProfissional.numero && (
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

      {/* Outros Documentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {motorista.nuit && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              NUIT
            </h4>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {motorista.nuit}
            </div>
          </div>
        )}

        {motorista.numeroSegurancaSocial && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Segurança Social
            </h4>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {motorista.numeroSegurancaSocial}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // NOVA ABA: Passaporte
  const PassaporteTab = ({ motorista }: { motorista: Motorista }) => {
    const passaporteStatus = getPassaporteStatus();
    
    return (
      <div className="space-y-6">
        {!motorista.passaporte || !motorista.passaporte.numero ? (
          <div className="text-center py-8">
            <FiGlobe className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sem Passaporte Registrado
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Este motorista não possui passaporte registrado no sistema.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Nota: O passaporte é necessário para serviços internacionais/trânsito.
            </p>
          </div>
        ) : (
          <>
            {/* Status do Passaporte */}
            <div className={`p-4 rounded-lg border ${
              passaporteStatus.status === 'vencido' ? 'bg-red-50 border-red-200' :
              passaporteStatus.status === 'proximo_vencimento' ? 'bg-orange-50 border-orange-200' :
              'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiGlobe className={`w-6 h-6 mr-3 ${
                    passaporteStatus.status === 'vencido' ? 'text-red-600' :
                    passaporteStatus.status === 'proximo_vencimento' ? 'text-orange-600' :
                    'text-green-600'
                  }`} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {passaporteStatus.texto}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Número: {motorista.passaporte.numero}
                    </p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  passaporteStatus.status === 'vencido' ? 'bg-red-100 text-red-800' :
                  passaporteStatus.status === 'proximo_vencimento' ? 'bg-orange-100 text-orange-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {passaporteStatus.status === 'valido' ? 'Válido' :
                   passaporteStatus.status === 'proximo_vencimento' ? 'Prestes a vencer' :
                   passaporteStatus.status === 'vencido' ? 'Vencido' : 'Não informado'}
                </div>
              </div>
            </div>

            {/* Detalhes do Passaporte */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FiFileText className="w-5 h-5 mr-2 text-blue-600" />
                Detalhes do Passaporte
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">
                    Número:
                  </span>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {motorista.passaporte.numero}
                  </div>
                </div>

                {motorista.passaporte.paisEmissor && (
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      País Emissor:
                    </span>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {motorista.passaporte.paisEmissor}
                    </div>
                  </div>
                )}

                {motorista.passaporte.dataEmissao && (
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Data de Emissão:
                    </span>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {formatarData(motorista.passaporte.dataEmissao)}
                    </div>
                  </div>
                )}

                {motorista.passaporte.validade && (
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Validade:
                    </span>
                    <div
                      className={`font-medium flex items-center ${
                        isDocumentoVencido(motorista.passaporte.validade)
                          ? "text-red-600"
                          : isDocumentoProximoVencimento(motorista.passaporte.validade)
                          ? "text-orange-600"
                          : "text-green-600"
                      }`}
                    >
                      {formatarData(motorista.passaporte.validade)}
                      {(isDocumentoVencido(motorista.passaporte.validade) ||
                        isDocumentoProximoVencimento(motorista.passaporte.validade)) && (
                        <FiAlertTriangle className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </div>
                )}

                {motorista.passaporte.localEmissao && (
                  <div className="md:col-span-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Local de Emissão:
                    </span>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {motorista.passaporte.localEmissao}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Viabilidade para Serviços Internacionais */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FiCheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Viabilidade para Serviços Internacionais
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Serviço Trânsito:
                  </span>
                  <div className="flex items-center">
                    {motorista.passaporteValido ? (
                      <>
                        <FiCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <span className="text-green-600 font-medium">Habilitado</span>
                      </>
                    ) : (
                      <>
                        <FiAlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                        <span className="text-red-600 font-medium">Não habilitado</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p>O motorista precisa de passaporte válido para realizar:</p>
                  <ul className="list-disc pl-5 mt-1">
                    <li>Serviços de trânsito internacional</li>
                    <li>Viagens que cruzam fronteiras</li>
                    <li>Transporte de cargas entre países</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const VeiculosTab = ({ motorista }: { motorista: Motorista }) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <FiTruck className="w-5 h-5 mr-2 text-blue-600" />
          Veículos Habilitados ({motorista.veiculosHabilitados?.length || 0})
        </h3>

        {onAddVehicle && (
          <button
            onClick={() => onAddVehicle(motorista.motoristaId)}
            className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            <FiTruck className="w-4 h-4" />
            <span>Adicionar Veículo</span>
          </button>
        )}
      </div>

      {!motorista.veiculosHabilitados || motorista.veiculosHabilitados.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <FiTruck className="mx-auto h-12 w-12 mb-4 opacity-50" />
          <p>Nenhum veículo habilitado</p>
        </div>
      ) : (
        <div className="space-y-4">
          {motorista.veiculosHabilitados.map((veiculo, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {veiculo.marca} {veiculo.modelo}
                </h4>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    veiculo.nivelInspecao?.categoria === "A"
                      ? "bg-red-100 text-red-800"
                      : veiculo.nivelInspecao?.categoria === "B"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  Categoria {veiculo.nivelInspecao?.categoria || "N/A"}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">
                    Matrícula:
                  </span>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {veiculo.matricula}
                  </div>
                </div>

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
                    {formatarNumero(veiculo.pesoMaximo || 0)} kg
                  </div>
                </div>

                <div>
                  <span className="text-gray-600 dark:text-gray-400">
                    Última Inspeção:
                  </span>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {veiculo.nivelInspecao?.dataUltimaInspecao 
                      ? formatarData(veiculo.nivelInspecao.dataUltimaInspecao)
                      : "N/A"}
                  </div>
                </div>
              </div>

              {/* Viabilidade */}
              {veiculo.viabilidade && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Viabilidade
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {veiculo.viabilidade.podeChante && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        <FiCheckCircle className="w-3 h-3 mr-1" />
                        Chanté
                      </span>
                    )}
                    {veiculo.viabilidade.podeNacional && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        <FiCheckCircle className="w-3 h-3 mr-1" />
                        Nacional
                      </span>
                    )}
                    {veiculo.viabilidade.podeTransito && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                        <FiCheckCircle className="w-3 h-3 mr-1" />
                        Trânsito
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

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
              {motorista.infoTransportador?.totalCamioes || 0}
            </div>
          </div>

          <div>
            <span className="text-gray-600 dark:text-gray-400">
              Qualificado Trânsito:
            </span>
            <div className="font-medium text-gray-900 dark:text-white">
              {motorista.infoTransportador?.qualificadoTransito ? (
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
              {motorista.infoTransportador?.restricoes?.podeFazerNacional ? (
                <span className="text-green-600">Sim</span>
              ) : (
                <span className="text-red-600">Não</span>
              )}
            </div>
          </div>
        </div>

        {motorista.infoTransportador?.restricoes?.motivo && (
          <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Restrições:</strong>{" "}
              {motorista.infoTransportador.restricoes.motivo}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const DesempenhoTab = ({ motorista }: { motorista: Motorista }) => (
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
            {formatarNumero(motorista.totalViagensRealizadas || 0)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Viagens
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <FiMapPin className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatarNumero(motorista.totalKmPercorridos || 0)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            KM Percorridos
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <FiShield className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {(motorista.indiceAcidentes || 0).toFixed(1)}%
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
              ([key, value]) => (
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

      {/* Histórico de Avaliações */}
      {motorista.historicoAvaliacoes &&
        motorista.historicoAvaliacoes.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FiClock className="w-5 h-5 mr-2 text-orange-600" />
              Últimas Avaliações
            </h3>

            <div className="space-y-3">
              {motorista.historicoAvaliacoes
                .slice(-5)
                .map((avaliacao, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {formatarAvaliacao(avaliacao.avaliacao || 0)} ⭐
                      </div>
                      {avaliacao.avaliador && (
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Por: {avaliacao.avaliador}
                        </div>
                      )}
                      {avaliacao.observacoes && (
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {avaliacao.observacoes}
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 text-right">
                      {formatarData(avaliacao.data)}
                      {avaliacao.viagemId && (
                        <div>Viagem #{avaliacao.viagemId}</div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
    </div>
  );

  const SaudeTab = ({ motorista }: { motorista: Motorista }) => (
    <div className="space-y-6">
      {/* Informações Médicas Básicas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {motorista.tipoSanguineo && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
            <FiHeart className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {motorista.tipoSanguineo}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Tipo Sanguíneo
            </div>
          </div>
        )}

        {motorista.restricoesMedicas &&
          motorista.restricoesMedicas.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
              <FiAlertTriangle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {motorista.restricoesMedicas.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Restrições Médicas
              </div>
            </div>
          )}

        {motorista.alergias && motorista.alergias.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
            <FiAlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {motorista.alergias.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Alergias
              </div>
            </div>
          )}
        </div>

        {/* Exames Médicos */}
        {motorista.examesMedicos && motorista.examesMedicos.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FiHeart className="w-5 h-5 mr-2 text-red-600" />
              Exames Médicos
            </h3>

            <div className="space-y-3">
              {motorista.examesMedicos.map((exame, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {exame.tipo}
                    </div>
                    {exame.instituicao && (
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {exame.instituicao}
                      </div>
                    )}
                    {exame.resultado && (
                      <div
                        className={`text-sm ${
                          exame.resultado.toLowerCase().includes("aprovado")
                            ? "text-green-600"
                            : exame.resultado.toLowerCase().includes("reprovado")
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {exame.resultado}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 text-right">
                    <div>
                      Realizado:{" "}
                      {exame.dataRealizacao
                        ? formatarData(exame.dataRealizacao)
                        : "N/A"}
                    </div>
                    {exame.dataValidade && (
                      <div
                        className={
                          isDocumentoVencido(exame.dataValidade)
                            ? "text-red-600"
                            : isDocumentoProximoVencimento(exame.dataValidade)
                            ? "text-orange-600"
                            : "text-green-600"
                        }
                      >
                        Validade: {formatarData(exame.dataValidade)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Restrições Médicas */}
        {motorista.restricoesMedicas &&
          motorista.restricoesMedicas.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FiAlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                Restrições Médicas
              </h3>

              <div className="flex flex-wrap gap-2">
                {motorista.restricoesMedicas.map((restricao, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800"
                  >
                    {restricao}
                  </span>
                ))}
              </div>
            </div>
          )}

        {/* Alergias */}
        {motorista.alergias && motorista.alergias.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FiAlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
              Alergias
            </h3>

            <div className="flex flex-wrap gap-2">
              {motorista.alergias.map((alergia, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800"
                >
                  {alergia}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );

    const FotosTab = ({ motorista }: { motorista: Motorista }) => {
      const [fotos, setFotos] = useState<FotoMotorista[]>([]);

      // Inicializar fotos
      useEffect(() => {
        const fotosIniciais: FotoMotorista[] = [];

        // Adicionar foto principal se existir
        if (motorista.foto) {
          fotosIniciais.push({
            url: motorista.foto,
            tipo: "principal",
            dataUpload: new Date(),
            nomeArquivo: "foto-principal.jpg",
          });
        }

        // Adicionar fotos adicionais se existirem
        if (motorista.fotos && motorista.fotos.length > 0) {
          motorista.fotos.forEach((url, index) => {
            fotosIniciais.push({
              url,
              tipo: "outro",
              dataUpload: new Date(),
              nomeArquivo: `foto-${index + 1}.jpg`,
            });
          });
        }

        setFotos(fotosIniciais);
      }, [motorista.foto, motorista.fotos]);

      const handleUploadComplete = useCallback((novasFotos: FotoMotorista[]) => {
        setFotos(novasFotos);
      }, []);

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Gestão de Fotos do Motorista
            </h3>

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              <p>Adicione fotos para documentação completa do motorista.</p>
              <p className="mt-1">
                Recomendado: Foto principal 3x4, documentos, uniforme.
              </p>
            </div>

            <UploadFotosMotorista
              motoristaId={motorista.motoristaId}
              nomeMotorista={motorista.nomeCompleto}
              onUploadComplete={handleUploadComplete}
              fotoPrincipalExistentes={motorista.foto || ""}
              fotosAdicionaisExistentes={motorista.fotos || []}
            />
          </div>
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
                  {motorista.foto ? (
                    <Image
                      className="h-12 w-12 rounded-full object-cover"
                      src={motorista.foto}
                      alt={motorista.nomeCompleto}
                      width={48}
                      height={48}
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
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onEdit?.(motorista)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiUser className="w-4 h-4" />
                  <span>Editar</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Tabs - NOVO: Adicionado tab Passaporte */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: "geral", label: "Geral", icon: FiUser },
                  { id: "documentos", label: "Documentos", icon: FiFileText },
                  { id: "passaporte", label: "Passaporte", icon: FiGlobe },
                  { id: "veiculos", label: "Veículos", icon: FiTruck },
                  { id: "desempenho", label: "Desempenho", icon: FiBarChart2 },
                  { id: "saude", label: "Saúde", icon: FiHeart },
                  { id: "fotos", label: "Fotos", icon: FiCamera },
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}