import { useState, useEffect } from "react";
import {
  FiInfo,
  FiSave,
  FiX,
  FiAlertCircle,
  FiRefreshCw,
} from "react-icons/fi";

const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

interface Transportadora {
  transportadoraId: number;
  nomeEmpresa: string;
  nif: string;
  email: string;
  website?: string;
  contactos: {
    telefonePrincipal: string;
    telefoneAlternativo?: string;
    emailComercial?: string;
  };
  endereco: {
    provincia: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero?: string;
  };
  capacidadeTotal: {
    totalCamioes: number;
    totalMotoristas: number;
    tonelagemMaxima?: number;
  };
  qualificadaTransito?: boolean;
  servicosPermitidos?: string[];
  status?: string;
  avaliacaoGeral?: number;
  documentos?: {
    alvara?: {
      numero?: string;
      dataEmissao?: string;
      dataValidade?: string;
    };
    registoComercial?: {
      numero?: string;
      dataRegisto?: string;
    };
    certificadoRegisto?: {
      numero?: string;
      dataEmissao?: string;
    };
  };
  observacoes?: string;
}

interface FormData {
  nomeEmpresa: string;
  email: string;
  nif: string;
  website: string;
  telefonePrincipal: string;
  telefoneAlternativo: string;
  emailComercial: string;
  totalCamioes: number;
  totalMotoristas: number;
  provincia: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  tonelagemMaxima: number;
  observacoes: string;
}

interface ValidationErrors {
  [key: string]: string;
}

interface ApiResponse {
  returnCode: number;
  returnMsg: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

interface TransportadoraSettingsProps {
  transportadoraInfo?: Transportadora | null;
  transportadoraId?: number;
  onSave?: (data: Transportadora) => void;
  onCancel?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
}

export function TransportadoraSettings({
  transportadoraInfo: externalTransportadoraInfo,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transportadoraId,
  onSave,
  onCancel,
  user,
}: TransportadoraSettingsProps) {
  const [internalTransportadoraInfo, setInternalTransportadoraInfo] =
    useState<Transportadora | null>(null);
  const [initialFormData, setInitialFormData] = useState<FormData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    nomeEmpresa: "",
    email: "",
    nif: "",
    website: "",
    telefonePrincipal: "",
    telefoneAlternativo: "",
    emailComercial: "",
    totalCamioes: 0,
    totalMotoristas: 0,
    provincia: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
    tonelagemMaxima: 0,
    observacoes: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const transportadoraInfo =
    externalTransportadoraInfo || internalTransportadoraInfo;

  // Função para buscar dados da API
  const fetchTransportadoraFromAPI =
    async (): Promise<Transportadora | null> => {
      if (!user) return null;

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userAny = user as any;
        const nif = userAny.nif;

        if (!nif) {
          console.log("❌ NIF não encontrado no user");
          return null;
        }

        console.log("🔍 Buscando transportadora com NIF:", nif);

        const response = await fetch(`${API_BASE_URL}/getTransportadoraList`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            curPage: 1,
            pageSize: 100,
            nif: nif,
          }),
        });

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        if (data?.data?.list?.length > 0) {
          const transportadoraData = data.data.list.find(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (t: any) => t.nif === nif
          );

          if (transportadoraData) {
            return transportadoraData;
          }
        }
        return null;
      } catch (error) {
        console.error(
          "💥 Erro ao buscar informações da transportadora:",
          error
        );
        return null;
      }
    };

  // Função para carregar dados da transportadora
  const loadTransportadoraData = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const apiData = await fetchTransportadoraFromAPI();
      if (apiData) {
        const transportadoraData: Transportadora = {
          transportadoraId: apiData.transportadoraId,
          nomeEmpresa: apiData.nomeEmpresa || "",
          nif: apiData.nif || "",
          email: apiData.email || "",
          website: apiData.website || "",
          contactos: {
            telefonePrincipal: apiData.contactos?.telefonePrincipal || "",
            telefoneAlternativo: apiData.contactos?.telefoneAlternativo || "",
            emailComercial: apiData.contactos?.emailComercial || "",
          },
          endereco: {
            provincia: apiData.endereco?.provincia || "",
            cidade: apiData.endereco?.cidade || "",
            bairro: apiData.endereco?.bairro || "",
            rua: apiData.endereco?.rua || "",
            numero: apiData.endereco?.numero || "",
          },
          capacidadeTotal: {
            totalCamioes: apiData.capacidadeTotal?.totalCamioes || 0,
            totalMotoristas: apiData.capacidadeTotal?.totalMotoristas || 0,
            tonelagemMaxima: apiData.capacidadeTotal?.tonelagemMaxima || 0,
          },
          documentos: apiData.documentos,
          observacoes: apiData.observacoes || "",
          avaliacaoGeral: apiData.avaliacaoGeral || 0,
          status: apiData.status || "ativa",
          qualificadaTransito: apiData.qualificadaTransito || false,
          servicosPermitidos: apiData.servicosPermitidos || [],
        };

        setInternalTransportadoraInfo(transportadoraData);
        initializeFormData(transportadoraData);
      } else {
        console.log("Nenhum dado encontrado na API");
        setMessage({ type: "error", text: "Transportadora não encontrada" });
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setMessage({
        type: "error",
        text: "Erro ao carregar dados da transportadora",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTransportadoraData();
    }, []);

  // Função para inicializar o formulário
  const initializeFormData = (data: Transportadora) => {
    
    const newFormData: FormData = {
      nomeEmpresa: data.nomeEmpresa || "",
      email: data.email || "",
      nif: data.nif || "",
      website: data.website || "",
      telefonePrincipal: data.contactos?.telefonePrincipal || "",
      telefoneAlternativo: data.contactos?.telefoneAlternativo || "",
      emailComercial: data.contactos?.emailComercial || "",
      totalCamioes: data.capacidadeTotal?.totalCamioes || 0,
      totalMotoristas: data.capacidadeTotal?.totalMotoristas || 0,
      provincia: data.endereco?.provincia || "",
      cidade: data.endereco?.cidade || "",
      bairro: data.endereco?.bairro || "",
      rua: data.endereco?.rua || "",
      numero: data.endereco?.numero || "",
      tonelagemMaxima: data.capacidadeTotal?.tonelagemMaxima || 0,
      observacoes: data.observacoes || "",
    };

    setFormData(newFormData);
    setInitialFormData(newFormData);
    setIsDirty(false);
    setErrors({});
  };

  // Função para verificar se o formulário foi modificado
  const checkIsDirty = (
    currentData: FormData,
    initialData: FormData | null
  ): boolean => {
    if (!initialData) return false;

    return Object.keys(currentData).some((key) => {
      const field = key as keyof FormData;
      return currentData[field] !== initialData[field];
    });
  };

  // Validação de campos
  const validateField = (name: string, value: string | number): string => {
    switch (name) {
      case "nomeEmpresa":
        if (!value) return "Nome da empresa é obrigatório";
        if (value.toString().length < 2) return "Nome muito curto";
        break;

      case "email":
        if (!value) return "Email é obrigatório";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.toString())) {
          return "Email inválido";
        }
        break;

      case "nif":
        if (!value) return "NIF é obrigatório";
        if (!/^\d{9}$/.test(value.toString().replace(/\s/g, ""))) {
          return "NIF deve ter 9 dígitos";
        }
        break;

      case "telefonePrincipal":
        if (!value) return "Telefone principal é obrigatório";
        if (!/^\+?[\d\s-]{9,}$/.test(value.toString())) {
          return "Telefone inválido";
        }
        break;

      case "totalCamioes":
      case "totalMotoristas":
      case "tonelagemMaxima":
        if (Number(value) < 0) return "Valor não pode ser negativo";
        if (!Number.isInteger(Number(value)) && name !== "tonelagemMaxima") {
          return "Deve ser um número inteiro";
        }
        break;

      case "provincia":
      case "cidade":
      case "bairro":
      case "rua":
        if (!value) return "Campo obrigatório";
        break;

      default:
        return "";
    }
    return "";
  };

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    // Validação em tempo real
    const error = validateField(field, value);
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));

    // Verificar se houve mudança em relação aos dados iniciais
    const dirty = checkIsDirty(newFormData, initialFormData);
    setIsDirty(dirty);
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    Object.keys(formData).forEach((key) => {
      if (
        key !== "telefoneAlternativo" &&
        key !== "emailComercial" &&
        key !== "website" &&
        key !== "numero" &&
        key !== "observacoes"
      ) {
        const error = validateField(key, formData[key as keyof FormData]);
        if (error) {
          newErrors[key] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função principal para salvar dados - ATUALIZADA para usar a rota real
  const handleSave = async (formData: FormData) => {
    if (!transportadoraInfo) return;

    setIsSaving(true);
    setMessage(null);

    try {
      // Preparar dados para atualização conforme a rota do backend
      
      const updateData = {
        nif: transportadoraInfo.nif,
        nomeEmpresa: formData.nomeEmpresa,
        email: formData.email,
        website: formData.website || undefined,
        contactos: {
          telefonePrincipal: formData.telefonePrincipal,
          telefoneAlternativo: formData.telefoneAlternativo || undefined,
          emailComercial: formData.emailComercial || undefined,
        },
        endereco: {
          provincia: formData.provincia,
          cidade: formData.cidade,
          bairro: formData.bairro,
          rua: formData.rua,
          numero: formData.numero || undefined,
        },
        capacidadeTotal: {
          totalCamioes: formData.totalCamioes,
          totalMotoristas: formData.totalMotoristas,
          tonelagemMaxima: formData.tonelagemMaxima || undefined,
        },
        observacoes: formData.observacoes || undefined,
        atualizadoPor: user?.nome || user?.email || "sistema",
      };

      console.log("📤 Enviando dados para atualização:", updateData);

      // Chamada REAL para a API
      const response = await fetch(`${API_BASE_URL}/updateTransportadora`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const result: ApiResponse = await response.json();

      if (!response.ok || result.returnCode !== 200) {
        throw new Error(result.returnMsg || `Erro ${response.status}`);
      }

      console.log("✅ Transportadora atualizada com sucesso:", result);

      // Atualizar dados locais com a resposta da API
      const updatedInfo: Transportadora = {
        ...transportadoraInfo,
        ...updateData,
        contactos: {
          telefonePrincipal: formData.telefonePrincipal,
          telefoneAlternativo: formData.telefoneAlternativo || undefined,
          emailComercial: formData.emailComercial || undefined,
        },
        endereco: {
          provincia: formData.provincia,
          cidade: formData.cidade,
          bairro: formData.bairro,
          rua: formData.rua,
          numero: formData.numero || undefined,
        },
        capacidadeTotal: {
          totalCamioes: formData.totalCamioes,
          totalMotoristas: formData.totalMotoristas,
          tonelagemMaxima: formData.tonelagemMaxima,
        },
        observacoes: formData.observacoes,
      };

      // Atualizar o estado interno se estiver usando dados internos
      if (!externalTransportadoraInfo) {
        setInternalTransportadoraInfo(updatedInfo);
      }

      // Atualizar dados iniciais para refletir as mudanças salvas
      initializeFormData(updatedInfo);

      setMessage({
        type: "success",
        text: result.returnMsg || "Dados atualizados com sucesso!",
      });

      onSave?.(updatedInfo);
    } catch (error) {
      console.error("❌ Erro ao salvar:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao salvar alterações";
      setMessage({
        type: "error",
        text: `Erro: ${errorMessage}`,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage({
        type: "error",
        text: "Por favor, corrija os erros antes de salvar",
      });
      return;
    }

    await handleSave(formData);
  };

  const handleCancel = () => {
    if (initialFormData) {
      setFormData(initialFormData);
    }
    setErrors({});
    setIsDirty(false);
    setMessage(null);
    onCancel?.();
  };

  // Componente de campo de input reutilizável
  const InputField = ({
    label,
    field,
    type = "text",
    required = false,
    disabled = false,
    placeholder = "",
    min,
    step,
  }: {
    label: string;
    field: keyof FormData;
    type?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    min?: number;
    step?: number;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          value={formData[field] as string}
          onChange={(e) => handleInputChange(field, e.target.value)}
          disabled={disabled || isLoading}
          placeholder={placeholder}
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${
            errors[field]
              ? "border-red-500 dark:border-red-400"
              : "border-gray-300 dark:border-gray-600"
          } ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        />
      ) : (
        <input
          type={type}
          value={formData[field]}
          onChange={(e) =>
            handleInputChange(
              field,
              type === "number" ? Number(e.target.value) : e.target.value
            )
          }
          disabled={disabled || isLoading}
          placeholder={placeholder}
          min={min}
          step={step}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${
            errors[field]
              ? "border-red-500 dark:border-red-400"
              : "border-gray-300 dark:border-gray-600"
          } ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        />
      )}
      {errors[field] && (
        <div className="flex items-center mt-1 text-sm text-red-600 dark:text-red-400">
          <FiAlertCircle className="w-3 h-3 mr-1" />
          {errors[field]}
        </div>
      )}
    </div>
  );

  // Efeito para carregar dados quando o componente monta
  useEffect(() => {
    if (user && !externalTransportadoraInfo) {
      loadTransportadoraData();
    } else if (externalTransportadoraInfo) {
      setInternalTransportadoraInfo(externalTransportadoraInfo);
      initializeFormData(externalTransportadoraInfo);
    }
  }, [user, externalTransportadoraInfo]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <span className="ml-2 text-gray-600 dark:text-gray-400">
          Carregando dados...
        </span>
      </div>
    );
  }

  if (!transportadoraInfo) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <FiAlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Nenhuma transportadora selecionada
          </p>
          {user && (
            <button
              onClick={loadTransportadoraData}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Tentar Novamente
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Mensagens */}
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
              : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
          }`}
        >
          <div className="flex items-center">
            <FiAlertCircle className="w-4 h-4 mr-2" />
            {message.text}
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Configurações da Transportadora
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              ID: {transportadoraInfo.transportadoraId}
            </span>
          </h2>

          <div className="flex items-center space-x-3">
            {isDirty && (
              <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full">
                Alterações não salvas
              </span>
            )}
            {!externalTransportadoraInfo && (
              <button
                onClick={loadTransportadoraData}
                disabled={isLoading}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                title="Recarregar dados"
              >
                <FiRefreshCw
                  className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                />
              </button>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informações da Empresa */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 dark:text-white">
                Informações da Empresa
              </h3>

              <div className="space-y-3">
                <InputField
                  label="Nome da Empresa"
                  field="nomeEmpresa"
                  required
                  placeholder="Nome completo da empresa"
                />

                <InputField
                  label="Email"
                  field="email"
                  type="email"
                  required
                  placeholder="email@empresa.com"
                />

                <InputField
                  label="NIF/NUIT"
                  field="nif"
                  required
                  disabled
                  placeholder="123456789"
                />

                <InputField
                  label="Website"
                  field="website"
                  type="text"
                  placeholder="https://empresa.com"
                />

                <InputField
                  label="Observações"
                  field="observacoes"
                  type="textarea"
                  placeholder="Observações adicionais..."
                />
              </div>

              <h4 className="font-medium text-gray-900 dark:text-white mt-4">
                Contactos
              </h4>

              <div className="space-y-3">
                <InputField
                  label="Telefone Principal"
                  field="telefonePrincipal"
                  required
                  placeholder="+258 XX XXX XXXX"
                />

                <InputField
                  label="Telefone Alternativo"
                  field="telefoneAlternativo"
                  placeholder="+258 XX XXX XXXX"
                />

                <InputField
                  label="Email Comercial"
                  field="emailComercial"
                  type="email"
                  placeholder="comercial@empresa.com"
                />
              </div>
            </div>

            {/* Capacidade Operacional e Localização */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Capacidade Operacional
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <InputField
                    label="Total de Camiões"
                    field="totalCamioes"
                    type="number"
                    min={0}
                    step={1}
                    placeholder="0"
                  />

                  <InputField
                    label="Total de Motoristas"
                    field="totalMotoristas"
                    type="number"
                    min={0}
                    step={1}
                    placeholder="0"
                  />

                  <div className="md:col-span-2">
                    <InputField
                      label="Tonelagem Máxima (kg)"
                      field="tonelagemMaxima"
                      type="number"
                      min={0}
                      step={1}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Localização
                </h3>

                <div className="space-y-3">
                  <InputField
                    label="Província"
                    field="provincia"
                    required
                    placeholder="Província"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <InputField
                      label="Cidade"
                      field="cidade"
                      required
                      placeholder="Cidade"
                    />

                    <InputField
                      label="Bairro"
                      field="bairro"
                      required
                      placeholder="Bairro"
                    />
                  </div>

                  <InputField
                    label="Rua"
                    field="rua"
                    required
                    placeholder="Nome da rua"
                  />

                  <InputField
                    label="Número"
                    field="numero"
                    placeholder="Número ou lote"
                  />
                </div>
              </div>

              {/* Status e Serviços */}
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-blue-700 dark:text-blue-300">
                    <FiInfo className="w-4 h-4 flex-shrink-0" />
                    <span>
                      {transportadoraInfo.qualificadaTransito
                        ? "✅ Qualificada para trânsito internacional"
                        : "❌ Não qualificada para trânsito internacional"}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                    Serviços Permitidos:
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400">
                    {transportadoraInfo.servicosPermitidos?.join(", ") ||
                      "Nenhum serviço disponível"}
                  </div>
                </div>

                {transportadoraInfo.avaliacaoGeral !== undefined && (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                      Avaliação: {transportadoraInfo.avaliacaoGeral}/5 ⭐
                    </div>
                  </div>
                )}

                <div className="p-3 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status:
                  </div>
                  <div
                    className={`text-xs font-medium ${
                      transportadoraInfo.status === "ativa"
                        ? "text-green-600 dark:text-green-400"
                        : transportadoraInfo.status === "inativa"
                        ? "text-red-600 dark:text-red-400"
                        : "text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    {transportadoraInfo.status?.toUpperCase() || "ATIVA"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              <FiX className="w-4 h-4" />
              <span>Cancelar</span>
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <FiSave className="w-4 h-4" />
              <span>{isSaving ? "Salvando..." : "Salvar Alterações"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
