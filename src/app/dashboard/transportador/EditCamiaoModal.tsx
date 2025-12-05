/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// EditCamiaoModal.tsx
import { useState, useEffect } from "react";
import {
  FiTruck,
  FiX,
  FiSave,
  FiCalendar,
  FiMapPin,
  FiShield,
  FiWifi,
  FiCamera,
  FiSettings,
  FiDollarSign,
  FiAlertCircle,
} from "react-icons/fi";
import {
  Camiao,
  StatusCamiao,
  TipoCamiao,
  CategoriaInspecao,
  TipoGPS,
  StatusGPS,
} from "./camioes";
import { toast } from "react-toastify";

interface EditCamiaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  camiao: Camiao | null;
  onSave: (camiaoId: number, dadosAtualizados: Partial<Camiao>) => Promise<void>; // ← Recebe id e dados
  isLoading?: boolean;
}

const STATUS_OPTIONS: Array<{ value: StatusCamiao; label: string }> = [
  { value: "disponivel", label: "Disponível" },
  { value: "em_viagem", label: "Em Viagem" },
  { value: "manutencao", label: "Em Manutenção" },
  { value: "inativo", label: "Inativo" },
  { value: "reservado", label: "Reservado" },
];

const TIPO_CAMIAO_OPTIONS: Array<{ value: TipoCamiao; label: string }> = [
  { value: "rigido", label: "Rígido" },
  { value: "articulado", label: "Articulado" },
  { value: "reboque", label: "Reboque" },
  { value: "tanque", label: "Tanque" },
  { value: "frigorifico", label: "Frigorífico" },
];

const CATEGORIA_OPTIONS: Array<{ value: CategoriaInspecao; label: string }> = [
  { value: "A", label: "A - Chanté" },
  { value: "B", label: "B - Nacional" },
  { value: "C", label: "C - Trânsito" },
];

const TIPO_GPS_OPTIONS: Array<{ value: TipoGPS; label: string }> = [
  { value: "normal", label: "GPS Normal" },
  { value: "vip", label: "GPS VIP" },
];

const STATUS_GPS_OPTIONS: Array<{ value: StatusGPS; label: string }> = [
  { value: "ativo", label: "Ativo" },
  { value: "inativo", label: "Inativo" },
  { value: "pendente", label: "Pendente" },
  { value: "expirado", label: "Expirado" },
];

const ESTADO_OPTIONS = [
  { value: "novo", label: "Novo" },
  { value: "seminovo", label: "Seminovo" },
  { value: "usado", label: "Usado" },
  { value: "recondicionado", label: "Recondicionado" },
];

export function EditCamiaoModal({
  isOpen,
  onClose,
  camiao,
  onSave,
  isLoading = false,
}: EditCamiaoModalProps) {
  const [formData, setFormData] = useState<Partial<Camiao>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Inicializar formData quando o camião muda
  useEffect(() => {
    if (camiao) {
      setFormData({
        ...camiao,
        // Certificar-se de que objetos aninhados estão presentes
        especificacoes: camiao.especificacoes || {
          tipo: "rigido",
          pesoBruto: 0,
          tara: 0,
          cargaUtil: 0,
          numEixos: 2,
        },
        documentacao: camiao.documentacao || {
          seguro: {
            numeroApolice: "",
            seguradora: "",
            dataEmissao: new Date().toISOString().split("T")[0],
            dataValidade: new Date().toISOString().split("T")[0],
          },
        },
        nivelInspecao: camiao.nivelInspecao || {
          categoria: "A",
          descricao: "",
          dataUltimaInspecao: new Date().toISOString().split("T")[0],
          resultadoUltimaInspecao: "aprovado",
        },
        tipoGPS: camiao.tipoGPS || {
          tipo: "normal",
          descricao: "",
          valorRegistro: 4000,
          dataAtivacao: new Date().toISOString().split("T")[0],
          status: "ativo",
        },
        estado: camiao.estado || { tipo: "usado" },
        disponibilidade: camiao.disponibilidade || {
          tipoServico: [],
          regioes: [],
        },
      });
    }
  }, [camiao]);

  if (!isOpen || !camiao) return null;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    // Para campos aninhados
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof Camiao] as any),
          [child]: type === "number" ? Number(value) : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      }));
    }

    // Limpar erro quando o usuário começa a digitar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleNestedObjectChange = (
    parent: keyof Camiao,
    field: string,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent] as any),
        [field]: value,
      },
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validações básicas
    if (!formData.matricula?.trim()) {
      newErrors.matricula = "Matrícula é obrigatória";
    }

    if (!formData.marca?.trim()) {
      newErrors.marca = "Marca é obrigatória";
    }

    if (!formData.modelo?.trim()) {
      newErrors.modelo = "Modelo é obrigatório";
    }

    if (!formData.anoFabricacao) {
      newErrors.anoFabricacao = "Ano de fabricação é obrigatório";
    } else if (
      formData.anoFabricacao < 1900 ||
      formData.anoFabricacao > new Date().getFullYear() + 1
    ) {
      newErrors.anoFabricacao = "Ano de fabricação inválido";
    }

    if (!formData.codigoGPS?.trim()) {
      newErrors.codigoGPS = "Código GPS é obrigatório";
    }

    // Validações do seguro
    if (!formData.documentacao?.seguro?.numeroApolice?.trim()) {
      newErrors["documentacao.seguro.numeroApolice"] =
        "Número da apólice é obrigatório";
    }

    if (!formData.documentacao?.seguro?.seguradora?.trim()) {
      newErrors["documentacao.seguro.seguradora"] = "Seguradora é obrigatória";
    }

    if (!formData.documentacao?.seguro?.dataValidade) {
      newErrors["documentacao.seguro.dataValidade"] =
        "Data de validade do seguro é obrigatória";
    }

    // Validações de peso
    if (
      formData.especificacoes?.pesoBruto &&
      formData.especificacoes.pesoBruto <= 0
    ) {
      newErrors["especificacoes.pesoBruto"] =
        "Peso bruto deve ser maior que zero";
    }

    if (
      formData.especificacoes?.cargaUtil &&
      formData.especificacoes.cargaUtil <= 0
    ) {
      newErrors["especificacoes.cargaUtil"] =
        "Carga útil deve ser maior que zero";
    }

    if (
      formData.especificacoes?.numEixos &&
      formData.especificacoes.numEixos <= 0
    ) {
      newErrors["especificacoes.numEixos"] =
        "Número de eixos deve ser maior que zero";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Por favor, corrija os erros no formulário");
      return;
    }

    try {
      // Aqui chamamos a função onSave passada como prop
      await onSave(camiao.camiaoId, formData);
      // O toast e fechamento do modal agora são feitos no componente pai
    } catch (error) {
      // O erro já é tratado no componente pai
      throw error; // Re-lançar para o componente pai tratar
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div className="relative inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle bg-white dark:bg-gray-800 rounded-2xl shadow-xl transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <FiTruck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Editar Camião
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {camiao.matricula} - {camiao.marca} {camiao.modelo}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Seção 1: Informações Básicas */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                    <FiTruck className="w-5 h-5 mr-2 text-blue-600" />
                    Informações Básicas
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Matrícula *
                    </label>
                    <input
                      type="text"
                      name="matricula"
                      value={formData.matricula || ""}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.matricula
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    />
                    {errors.matricula && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.matricula}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Marca *
                      </label>
                      <input
                        type="text"
                        name="marca"
                        value={formData.marca || ""}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.marca
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      />
                      {errors.marca && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.marca}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Modelo *
                      </label>
                      <input
                        type="text"
                        name="modelo"
                        value={formData.modelo || ""}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.modelo
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      />
                      {errors.modelo && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.modelo}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Ano Fabricação *
                      </label>
                      <input
                        type="number"
                        name="anoFabricacao"
                        value={formData.anoFabricacao || ""}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.anoFabricacao
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      />
                      {errors.anoFabricacao && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.anoFabricacao}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Cor
                      </label>
                      <input
                        type="text"
                        name="cor"
                        value={formData.cor || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Código GPS *
                    </label>
                    <input
                      type="text"
                      name="codigoGPS"
                      value={formData.codigoGPS || ""}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.codigoGPS
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    />
                    {errors.codigoGPS && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.codigoGPS}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Estado
                      </label>
                      <select
                        name="estado.tipo"
                        value={formData.estado?.tipo || "usado"}
                        onChange={(e) =>
                          handleNestedObjectChange(
                            "estado",
                            "tipo",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {ESTADO_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status || "disponivel"}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Seção 2: Especificações */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                    <FiSettings className="w-5 h-5 mr-2 text-green-600" />
                    Especificações Técnicas
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tipo de Camião
                    </label>
                    <select
                      name="especificacoes.tipo"
                      value={formData.especificacoes?.tipo || "rigido"}
                      onChange={(e) =>
                        handleNestedObjectChange(
                          "especificacoes",
                          "tipo",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {TIPO_CAMIAO_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Peso Bruto (kg) *
                      </label>
                      <input
                        type="number"
                        name="especificacoes.pesoBruto"
                        value={formData.especificacoes?.pesoBruto || ""}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors["especificacoes.pesoBruto"]
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      />
                      {errors["especificacoes.pesoBruto"] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors["especificacoes.pesoBruto"]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Carga Útil (kg) *
                      </label>
                      <input
                        type="number"
                        name="especificacoes.cargaUtil"
                        value={formData.especificacoes?.cargaUtil || ""}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors["especificacoes.cargaUtil"]
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      />
                      {errors["especificacoes.cargaUtil"] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors["especificacoes.cargaUtil"]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tara (kg)
                      </label>
                      <input
                        type="number"
                        name="especificacoes.tara"
                        value={formData.especificacoes?.tara || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Número de Eixos *
                      </label>
                      <input
                        type="number"
                        name="especificacoes.numEixos"
                        value={formData.especificacoes?.numEixos || ""}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors["especificacoes.numEixos"]
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      />
                      {errors["especificacoes.numEixos"] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors["especificacoes.numEixos"]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Seção 3: Documentação */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                    <FiShield className="w-5 h-5 mr-2 text-orange-600" />
                    Documentação
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Número da Apólice *
                    </label>
                    <input
                      type="text"
                      name="documentacao.seguro.numeroApolice"
                      value={formData.documentacao?.seguro?.numeroApolice || ""}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors["documentacao.seguro.numeroApolice"]
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    />
                    {errors["documentacao.seguro.numeroApolice"] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors["documentacao.seguro.numeroApolice"]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Seguradora *
                    </label>
                    <input
                      type="text"
                      name="documentacao.seguro.seguradora"
                      value={formData.documentacao?.seguro?.seguradora || ""}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors["documentacao.seguro.seguradora"]
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    />
                    {errors["documentacao.seguro.seguradora"] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors["documentacao.seguro.seguradora"]}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Data Emissão
                      </label>
                      <input
                        type="date"
                        name="documentacao.seguro.dataEmissao"
                        value={formData.documentacao?.seguro?.dataEmissao || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Data Validade *
                      </label>
                      <input
                        type="date"
                        name="documentacao.seguro.dataValidade"
                        value={
                          formData.documentacao?.seguro?.dataValidade || ""
                        }
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors["documentacao.seguro.dataValidade"]
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      />
                      {errors["documentacao.seguro.dataValidade"] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors["documentacao.seguro.dataValidade"]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Seção 4: GPS e Inspeção */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                    <FiWifi className="w-5 h-5 mr-2 text-purple-600" />
                    GPS e Inspeção
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tipo GPS
                      </label>
                      <select
                        name="tipoGPS.tipo"
                        value={formData.tipoGPS?.tipo || "normal"}
                        onChange={(e) =>
                          handleNestedObjectChange(
                            "tipoGPS",
                            "tipo",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {TIPO_GPS_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Status GPS
                      </label>
                      <select
                        name="tipoGPS.status"
                        value={formData.tipoGPS?.status || "ativo"}
                        onChange={(e) =>
                          handleNestedObjectChange(
                            "tipoGPS",
                            "status",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {STATUS_GPS_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Valor Registro
                    </label>
                    <div className="relative">
                      <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        name="tipoGPS.valorRegistro"
                        value={formData.tipoGPS?.valorRegistro || ""}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Data Ativação
                      </label>
                      <input
                        type="date"
                        name="tipoGPS.dataAtivacao"
                        value={formData.tipoGPS?.dataAtivacao || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Data Expiração
                      </label>
                      <input
                        type="date"
                        name="tipoGPS.dataExpiracao"
                        value={formData.tipoGPS?.dataExpiracao || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Categoria de Inspeção
                    </label>
                    <select
                      name="nivelInspecao.categoria"
                      value={formData.nivelInspecao?.categoria || "A"}
                      onChange={(e) =>
                        handleNestedObjectChange(
                          "nivelInspecao",
                          "categoria",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {CATEGORIA_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Última Inspeção
                      </label>
                      <input
                        type="date"
                        name="nivelInspecao.dataUltimaInspecao"
                        value={formData.nivelInspecao?.dataUltimaInspecao || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Próxima Inspeção
                      </label>
                      <input
                        type="date"
                        name="nivelInspecao.dataProximaInspecao"
                        value={
                          formData.nivelInspecao?.dataProximaInspecao || ""
                        }
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Observações */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Observações
                </label>
                <textarea
                  name="observacoes"
                  value={formData.observacoes || ""}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Observações adicionais sobre o camião..."
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <FiAlertCircle className="inline w-4 h-4 mr-1" />
                Campos marcados com * são obrigatórios
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Salvando...</span>
                    </>
                  ) : (
                    <>
                      <FiSave className="w-4 h-4" />
                      <span>Salvar Alterações</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
