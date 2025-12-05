/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import {
  FiX,
  FiSave,
  FiUser,
  FiFileText,
  FiPhone,
  FiMapPin,
  FiAlertCircle,
  FiTruck,
  FiGlobe,
} from "react-icons/fi";

// Interfaces e tipos (mantenha os mesmos do NovoMotoristaModal)
export type StatusMotorista =
  | "disponivel"
  | "em_viagem"
  | "ferias"
  | "licenca"
  | "indisponivel";
export type StatusContratual =
  | "ativo"
  | "inativo"
  | "ferias"
  | "licenca"
  | "suspenso";
export type CategoriaCarta = "CE" | "C" | "D" | "E";

// Reuse a interface do seu motorista
import { Motorista } from "./motoristas";

interface EditarMotoristaModalProps {
  isOpen: boolean;
  onClose: () => void;
  motorista: Motorista | null;
  onSave: (dados: Motorista) => Promise<void>;
  isLoading?: boolean;
}

// Constantes para os selects (mantenha as mesmas do NovoMotoristaModal)
const STATUS_CONTRATUAL_OPTIONS = [
  { value: "ativo", label: "Ativo" },
  { value: "inativo", label: "Inativo" },
  { value: "ferias", label: "Férias" },
  { value: "licenca", label: "Licença" },
  { value: "suspenso", label: "Suspenso" },
] as const;

const STATUS_MOTORISTA_OPTIONS = [
  { value: "disponivel", label: "Disponível" },
  { value: "em_viagem", label: "Em Viagem" },
  { value: "ferias", label: "Férias" },
  { value: "licenca", label: "Licença" },
  { value: "indisponivel", label: "Indisponível" },
] as const;

const CATEGORIA_CARTA_OPTIONS = [
  { value: "CE", label: "CE" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
  { value: "E", label: "E" },
] as const;

const PARENTESCO_OPTIONS = [
  { value: "pai", label: "Pai" },
  { value: "mae", label: "Mãe" },
  { value: "conjuge", label: "Cônjuge" },
  { value: "filho", label: "Filho(a)" },
  { value: "irmao", label: "Irmão(ã)" },
  { value: "outro", label: "Outro" },
] as const;

// Países para o campo de passaporte
const PAISES_OPTIONS = [
  { value: "MZ", label: "Moçambique" },
  { value: "PT", label: "Portugal" },
  { value: "BR", label: "Brasil" },
  { value: "AO", label: "Angola" },
  { value: "ZA", label: "África do Sul" },
  { value: "CN", label: "China" },
  { value: "IN", label: "Índia" },
  { value: "US", label: "Estados Unidos" },
  { value: "GB", label: "Reino Unido" },
  { value: "FR", label: "França" },
  { value: "DE", label: "Alemanha" },
  { value: "ES", label: "Espanha" },
  { value: "outro", label: "Outro" },
] as const;

export function EditarMotoristaModal({
  isOpen,
  onClose,
  motorista,
  onSave,
  isLoading = false,
}: EditarMotoristaModalProps) {
  const [formData, setFormData] = useState<Motorista | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<
    "pessoal" | "documentacao" | "passaporte" | "contactos" | "habilitacao"
  >("pessoal");
  const [showPassaporte, setShowPassaporte] = useState(false);

  // Inicializar formulário com dados do motorista
  useEffect(() => {
    if (motorista) {
      setFormData(motorista);
      setShowPassaporte(
        !!motorista.passaporte && !!motorista.passaporte.numero
      );
    }
  }, [motorista]);

  // Função para validar o formulário
  const validateForm = (): boolean => {
    if (!formData) return false;

    const newErrors: Record<string, string> = {};

    // Validações básicas
    if (!formData.nomeCompleto.trim())
      newErrors.nomeCompleto = "Nome completo é obrigatório";
    if (!formData.numeroBI.trim())
      newErrors.numeroBI = "Número do BI é obrigatório";
    if (!formData.validadeBI)
      newErrors.validadeBI = "Validade do BI é obrigatória";
    if (!formData.contactos.telefonePrincipal.trim())
      newErrors.telefonePrincipal = "Telefone principal é obrigatório";

    // Validações da carta de condução
    if (!formData.cartaConducao.numero.trim())
      newErrors.numeroCarta = "Número da carta é obrigatório";
    if (!formData.cartaConducao.validade)
      newErrors.validadeCarta = "Validade da carta é obrigatória";

    // Validação de idade
    if (formData.dataNascimento) {
      const dataNascimento = new Date(formData.dataNascimento);
      const hoje = new Date();
      let idade = hoje.getFullYear() - dataNascimento.getFullYear();
      const mesDiff = hoje.getMonth() - dataNascimento.getMonth();

      if (
        mesDiff < 0 ||
        (mesDiff === 0 && hoje.getDate() < dataNascimento.getDate())
      ) {
        idade--;
      }

      if (idade < 18) {
        newErrors.dataNascimento = "Motorista deve ter pelo menos 18 anos";
      }
    }

    // Validação do passaporte se estiver ativo
    if (showPassaporte && formData.passaporte) {
      if (!formData.passaporte.numero?.trim()) {
        newErrors.numeroPassaporte =
          "Número do passaporte é obrigatório quando fornecido";
      }
      if (formData.passaporte.validade) {
        const validadePassaporte = new Date(formData.passaporte.validade);
        if (validadePassaporte <= new Date()) {
          newErrors.validadePassaporte = "Passaporte está vencido";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função para lidar com mudanças nos campos
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (field: string, value: any) => {
    if (!formData) return;

    setFormData((prev) => {
      if (!prev) return prev;

      const keys = field.split(".");

      if (keys.length === 1) {
        return { ...prev, [field]: value };
      } else if (keys.length === 2) {
        return {
          ...prev,
          [keys[0]]: {
            ...((prev[keys[0] as keyof Motorista] as object) || {}),
            [keys[1]]: value,
          },
        };
      } else if (keys.length === 3) {
        return {
          ...prev,
          [keys[0]]: {
            ...((prev[keys[0] as keyof Motorista] as object) || {}),
            [keys[1]]: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ...((prev[keys[0] as keyof Motorista] as any)[keys[1]] || {}),
              [keys[2]]: value,
            },
          },
        };
      }

      return prev;
    });

    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Função para alternar visibilidade do passaporte
  const togglePassaporte = () => {
    setShowPassaporte(!showPassaporte);
    if (
      !showPassaporte &&
      (!formData?.passaporte || !formData.passaporte.numero)
    ) {
      // Inicializar objeto passaporte se estiver ativando
      handleChange("passaporte", {
        numero: "",
        paisEmissor: "MZ",
        dataEmissao: new Date().toISOString().split("T")[0],
        validade: new Date(new Date().setFullYear(new Date().getFullYear() + 5))
          .toISOString()
          .split("T")[0],
        localEmissao: "",
      });
    } else if (!showPassaporte && formData?.passaporte) {
      // Limpar passaporte se estiver desativando
      handleChange("passaporte", undefined);
    }
  };

  // Função para submeter o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData || !validateForm()) {
      return;
    }

    // Atualizar data de atualização
    const dadosAtualizados = {
      ...formData,
      dataAtualizacao: new Date().toISOString(),
    };

    // Limpar passaporte se não estiver ativo
    if (!showPassaporte || !dadosAtualizados.passaporte?.numero) {
      delete dadosAtualizados.passaporte;
    }

    try {
      await onSave(dadosAtualizados);
    } catch (error) {
      console.error("Erro ao atualizar motorista:", error);
    }
  };

  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <FiUser className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Editar Motorista - {formData.nomeCompleto}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs de Navegação */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: "pessoal", label: "Informações Pessoais", icon: FiUser },
              { id: "documentacao", label: "Documentação", icon: FiFileText },
              { id: "passaporte", label: "Passaporte", icon: FiGlobe },
              { id: "contactos", label: "Contactos", icon: FiPhone },
              { id: "habilitacao", label: "Habilitação", icon: FiTruck },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Formulário - REUSE A ESTRUTURA DO NovoMotoristaModal */}
        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[60vh]"
        >
          {/* Tab: Informações Pessoais */}
          {activeTab === "pessoal" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome Completo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={formData.nomeCompleto}
                    onChange={(e) =>
                      handleChange("nomeCompleto", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.nomeCompleto
                        ? "border-red-300"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Digite o nome completo"
                  />
                  {errors.nomeCompleto && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="h-4 w-4" />
                      <span>{errors.nomeCompleto}</span>
                    </p>
                  )}
                </div>

                {/* Data de Nascimento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    value={formData.dataNascimento || ""}
                    onChange={(e) =>
                      handleChange("dataNascimento", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.dataNascimento
                        ? "border-red-300"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  />
                  {errors.dataNascimento && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="h-4 w-4" />
                      <span>{errors.dataNascimento}</span>
                    </p>
                  )}
                </div>

                {/* Nacionalidade */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nacionalidade
                  </label>
                  <input
                    type="text"
                    value={formData.nacionalidade || ""}
                    onChange={(e) =>
                      handleChange("nacionalidade", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Nacionalidade"
                  />
                </div>

                {/* Cargo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cargo
                  </label>
                  <input
                    type="text"
                    value={formData.cargo || ""}
                    onChange={(e) => handleChange("cargo", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Cargo do motorista"
                  />
                </div>

                {/* Data de Admissão */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data de Admissão
                  </label>
                  <input
                    type="date"
                    value={formData.dataAdmissao || ""}
                    onChange={(e) =>
                      handleChange("dataAdmissao", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Status Contratual */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status Contratual
                  </label>
                  <select
                    value={formData.statusContratual}
                    onChange={(e) =>
                      handleChange("statusContratual", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {STATUS_CONTRATUAL_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Operacional */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status Operacional
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {STATUS_MOTORISTA_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Observações */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Observações
                </label>
                <textarea
                  value={formData.observacoes || ""}
                  onChange={(e) => handleChange("observacoes", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Observações adicionais sobre o motorista..."
                />
              </div>
            </div>
          )}

          {activeTab === "contactos" && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <FiPhone className="h-5 w-5 text-blue-600" />
                  <span>Contactos e Endereço</span>
                </h3>
              </div>

              <div className="space-y-8">
                {/* Contactos Principais */}
                <div>
                  <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Contactos Principais
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Telefone Principal */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Telefone Principal *
                      </label>
                      <input
                        type="tel"
                        value={formData.contactos.telefonePrincipal}
                        onChange={(e) =>
                          handleChange(
                            "contactos.telefonePrincipal",
                            e.target.value
                          )
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.telefonePrincipal
                            ? "border-red-300"
                            : "border-gray-300 dark:border-gray-600"
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                        placeholder="Ex: +258 84 123 4567"
                      />
                      {errors.telefonePrincipal && (
                        <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                          <FiAlertCircle className="h-4 w-4" />
                          <span>{errors.telefonePrincipal}</span>
                        </p>
                      )}
                    </div>

                    {/* Telefone Alternativo */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Telefone Alternativo
                      </label>
                      <input
                        type="tel"
                        value={formData.contactos.telefoneAlternativo || ""}
                        onChange={(e) =>
                          handleChange(
                            "contactos.telefoneAlternativo",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Ex: +258 86 987 6543"
                      />
                    </div>

                    {/* Email */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.contactos.email || ""}
                        onChange={(e) =>
                          handleChange("contactos.email", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="exemplo@email.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Contacto de Emergência */}
                <div>
                  <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Contacto de Emergência
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Nome do Contacto de Emergência */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nome
                      </label>
                      <input
                        type="text"
                        value={formData.contactos.emergencia?.nome || ""}
                        onChange={(e) =>
                          handleChange(
                            "contactos.emergencia.nome",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Nome do contacto"
                      />
                    </div>

                    {/* Parentesco */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Parentesco
                      </label>
                      <select
                        value={formData.contactos.emergencia?.parentesco || ""}
                        onChange={(e) =>
                          handleChange(
                            "contactos.emergencia.parentesco",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="">Selecionar parentesco</option>
                        {PARENTESCO_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Telefone de Emergência */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        value={formData.contactos.emergencia?.telefone || ""}
                        onChange={(e) =>
                          handleChange(
                            "contactos.emergencia.telefone",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Ex: +258 82 111 2233"
                      />
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div>
                  <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center space-x-2">
                    <FiMapPin className="h-4 w-4" />
                    <span>Endereço</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Província */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Província
                      </label>
                      <input
                        type="text"
                        value={formData.endereco?.provincia || ""}
                        onChange={(e) =>
                          handleChange("endereco.provincia", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Província"
                      />
                    </div>

                    {/* Cidade */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Cidade
                      </label>
                      <input
                        type="text"
                        value={formData.endereco?.cidade || ""}
                        onChange={(e) =>
                          handleChange("endereco.cidade", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Cidade"
                      />
                    </div>

                    {/* Bairro */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bairro
                      </label>
                      <input
                        type="text"
                        value={formData.endereco?.bairro || ""}
                        onChange={(e) =>
                          handleChange("endereco.bairro", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Bairro"
                      />
                    </div>

                    {/* Rua */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Rua
                      </label>
                      <input
                        type="text"
                        value={formData.endereco?.rua || ""}
                        onChange={(e) =>
                          handleChange("endereco.rua", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Rua"
                      />
                    </div>

                    {/* Número da Casa */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Número da Casa
                      </label>
                      <input
                        type="text"
                        value={formData.endereco?.numeroCasa || ""}
                        onChange={(e) =>
                          handleChange("endereco.numeroCasa", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Número"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Tab: Habilitação - ADICIONAR ESTA SEÇÃO */}
          {activeTab === "habilitacao" && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <FiTruck className="h-5 w-5 text-blue-600" />
                  <span>Habilitação e Licenças</span>
                </h3>
              </div>

              <div className="space-y-8">
                {/* Carta de Condução */}
                <div>
                  <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Carta de Condução
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Número da Carta */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Número da Carta *
                      </label>
                      <input
                        type="text"
                        value={formData.cartaConducao.numero}
                        onChange={(e) =>
                          handleChange("cartaConducao.numero", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.numeroCarta
                            ? "border-red-300"
                            : "border-gray-300 dark:border-gray-600"
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                        placeholder="Número da carta de condução"
                      />
                      {errors.numeroCarta && (
                        <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                          <FiAlertCircle className="h-4 w-4" />
                          <span>{errors.numeroCarta}</span>
                        </p>
                      )}
                    </div>

                    {/* Categoria */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Categoria *
                      </label>
                      <select
                        value={formData.cartaConducao.categoria}
                        onChange={(e) =>
                          handleChange(
                            "cartaConducao.categoria",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="">Selecionar categoria</option>
                        {CATEGORIA_CARTA_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Data de Emissão */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Data de Emissão
                      </label>
                      <input
                        type="date"
                        value={formData.cartaConducao.dataEmissao || ""}
                        onChange={(e) =>
                          handleChange(
                            "cartaConducao.dataEmissao",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    {/* Validade */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Validade *
                      </label>
                      <input
                        type="date"
                        value={formData.cartaConducao.validade}
                        onChange={(e) =>
                          handleChange("cartaConducao.validade", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.validadeCarta
                            ? "border-red-300"
                            : "border-gray-300 dark:border-gray-600"
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      />
                      {errors.validadeCarta && (
                        <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                          <FiAlertCircle className="h-4 w-4" />
                          <span>{errors.validadeCarta}</span>
                        </p>
                      )}
                    </div>

                    {/* Local de Emissão */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Local de Emissão
                      </label>
                      <input
                        type="text"
                        value={formData.cartaConducao.localEmissao || ""}
                        onChange={(e) =>
                          handleChange(
                            "cartaConducao.localEmissao",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Local onde a carta foi emitida"
                      />
                    </div>
                  </div>
                </div>

                {/* Licença Profissional */}
                <div>
                  <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Licença Profissional
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Número da Licença */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Número da Licença
                      </label>
                      <input
                        type="text"
                        value={formData.licencaProfissional?.numero || ""}
                        onChange={(e) =>
                          handleChange(
                            "licencaProfissional.numero",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Número da licença profissional"
                      />
                    </div>

                    {/* Categoria da Licença */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Categoria
                      </label>
                      <input
                        type="text"
                        value={formData.licencaProfissional?.categoria || ""}
                        onChange={(e) =>
                          handleChange(
                            "licencaProfissional.categoria",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Categoria da licença"
                      />
                    </div>

                    {/* Validade da Licença */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Validade
                      </label>
                      <input
                        type="date"
                        value={formData.licencaProfissional?.validade || ""}
                        onChange={(e) =>
                          handleChange(
                            "licencaProfissional.validade",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Especializações */}
                <div>
                  <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Especializações
                  </h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Especializações do Motorista
                    </label>
                    <input
                      type="text"
                      value={formData.especializacoes?.join(", ") || ""}
                      onChange={(e) => {
                        const values = e.target.value
                          .split(",")
                          .map((item) => item.trim())
                          .filter((item) => item);
                        handleChange("especializacoes", values);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Ex: ADR, Contentores, Carga Geral (separados por vírgula)"
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Digite as especializações separadas por vírgula
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* As outras tabs (documentacao, passaporte, contactos, habilitacao) */}
          {/* REUSE EXATAMENTE O MESMO CÓDIGO DO NovoMotoristaModal */}
          {/* Apenas ajuste os valores para usar formData em vez do estado inicial */}

          {/* Tab: Documentação */}
          {activeTab === "documentacao" && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <FiFileText className="h-5 w-5 text-blue-600" />
                  <span>Documentação Pessoal</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Número do BI */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Número do BI *
                  </label>
                  <input
                    type="text"
                    value={formData.numeroBI}
                    onChange={(e) => handleChange("numeroBI", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.numeroBI
                        ? "border-red-300"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Número do Bilhete de Identidade"
                  />
                  {errors.numeroBI && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="h-4 w-4" />
                      <span>{errors.numeroBI}</span>
                    </p>
                  )}
                </div>

                {/* Validade do BI */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Validade do BI *
                  </label>
                  <input
                    type="date"
                    value={formData.validadeBI}
                    onChange={(e) => handleChange("validadeBI", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.validadeBI
                        ? "border-red-300"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  />
                  {errors.validadeBI && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="h-4 w-4" />
                      <span>{errors.validadeBI}</span>
                    </p>
                  )}
                </div>

                {/* NUIT */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    NUIT
                  </label>
                  <input
                    type="text"
                    value={formData.nuit || ""}
                    onChange={(e) => handleChange("nuit", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Número de Identificação Fiscal"
                  />
                </div>

                {/* Nº Segurança Social */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nº Segurança Social
                  </label>
                  <input
                    type="text"
                    value={formData.numeroSegurancaSocial || ""}
                    onChange={(e) =>
                      handleChange("numeroSegurancaSocial", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Número da Segurança Social"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab: Passaporte */}
          {activeTab === "passaporte" && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                    <FiGlobe className="h-5 w-5 text-blue-600" />
                    <span>Informações do Passaporte</span>
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Motorista possui passaporte?
                    </span>
                    <button
                      type="button"
                      onClick={togglePassaporte}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        showPassaporte
                          ? "bg-blue-600"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          showPassaporte ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {showPassaporte && formData.passaporte && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Número do Passaporte */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Número do Passaporte *
                    </label>
                    <input
                      type="text"
                      value={formData.passaporte.numero || ""}
                      onChange={(e) =>
                        handleChange("passaporte.numero", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.numeroPassaporte
                          ? "border-red-300"
                          : "border-gray-300 dark:border-gray-600"
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="Número do passaporte"
                    />
                    {errors.numeroPassaporte && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <FiAlertCircle className="h-4 w-4" />
                        <span>{errors.numeroPassaporte}</span>
                      </p>
                    )}
                  </div>

                  {/* País Emissor */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      País Emissor
                    </label>
                    <select
                      value={formData.passaporte.paisEmissor || "MZ"}
                      onChange={(e) =>
                        handleChange("passaporte.paisEmissor", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {PAISES_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Data de Emissão */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Data de Emissão
                    </label>
                    <input
                      type="date"
                      value={formData.passaporte.dataEmissao || ""}
                      onChange={(e) =>
                        handleChange("passaporte.dataEmissao", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  {/* Validade */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Validade
                    </label>
                    <input
                      type="date"
                      value={formData.passaporte.validade || ""}
                      onChange={(e) =>
                        handleChange("passaporte.validade", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.validadePassaporte
                          ? "border-red-300"
                          : "border-gray-300 dark:border-gray-600"
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    />
                    {errors.validadePassaporte && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <FiAlertCircle className="h-4 w-4" />
                        <span>{errors.validadePassaporte}</span>
                      </p>
                    )}
                  </div>

                  {/* Local de Emissão */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Local de Emissão
                    </label>
                    <input
                      type="text"
                      value={formData.passaporte.localEmissao || ""}
                      onChange={(e) =>
                        handleChange("passaporte.localEmissao", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Local onde o passaporte foi emitido"
                    />
                  </div>
                </div>
              )}

              {!showPassaporte && (
                <div className="text-center py-8">
                  <FiGlobe className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Passaporte Não Disponível
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Este motorista não possui passaporte. Ative o interruptor
                    acima se ele tiver um passaporte válido.
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Nota: O passaporte é necessário para serviços
                    internacionais/trânsito.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* As tabs contactos e habilitacao seguem a mesma lógica */}
          {/* ... (reuse o código do NovoMotoristaModal) ... */}
        </form>

        {/* Footer com botões de ação */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Campos marcados com * são obrigatórios
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Atualizando...</span>
                </>
              ) : (
                <>
                  <FiSave className="h-4 w-4" />
                  <span>Atualizar Motorista</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
