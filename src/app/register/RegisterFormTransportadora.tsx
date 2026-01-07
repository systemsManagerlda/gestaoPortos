"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  Input,
  Button,
  Divider,
  Link,
  Spinner,
  Select,
  SelectItem,
  Textarea,
  Checkbox,
} from "@nextui-org/react";
import {
  FiMail,
  FiPhone,
  FiBriefcase,
  FiHome,
  FiGlobe,
  FiFileText,
  FiTruck,
  FiLock,
} from "react-icons/fi";

// URL base da API
const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

interface RegisterTransportadoraFormInputs {
  // Identificação Básica
  nomeEmpresa: string;
  nif: string;
  email: string;
  website?: string;
  senha: string;
  confirmarSenha: string;

  // Contatos
  telefonePrincipal: string;
  telefoneAlternativo?: string;
  emailComercial?: string;

  // Endereço
  provincia: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero?: string;

  // Documentação Legal
  alvaraNumero?: string;
  alvaraDataEmissao?: string;
  alvaraDataValidade?: string;
  registoComercialNumero?: string;
  registoComercialData?: string;
  certificadoRegistoNumero?: string;
  certificadoRegistoData?: string;

  // Informações Operacionais
  tipoServicos: ("chante" | "nacional" | "transito")[];
  totalCamioes: number;
  totalMotoristas: number;
  tonelagemMaxima?: number;

  // Status
  status: "ativa" | "inativa" | "suspensa" | "pendente";

  // Observações
  observacoes?: string;
}

interface RegisterTransportadoraFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  showLoginLink?: boolean;
  compact?: boolean;
  redirectToLogin?: boolean;
}

export default function RegisterTransportadoraForm({ 
  onSuccess, 
  onCancel, 
  showLoginLink = true,
  compact = false,
  redirectToLogin = true
}: RegisterTransportadoraFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<RegisterTransportadoraFormInputs>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalCamioes = watch("totalCamioes");
  const senha = watch("senha");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const confirmarSenha = watch("confirmarSenha");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const validatePassword = (value: string) => {
    if (!value) return "Senha é obrigatória";
    if (value.length < 6) return "Senha deve ter pelo menos 6 caracteres";
    return true;
  };

  const validatePasswordMatch = (value: string) => {
    if (value !== senha) return "As senhas não coincidem";
    return true;
  };

  const onSubmit: SubmitHandler<RegisterTransportadoraFormInputs> = async (data) => {
    // Validação manual da confirmação de senha
    if (data.senha !== data.confirmarSenha) {
      setError("confirmarSenha", {
        type: "manual",
        message: "As senhas não coincidem"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar dados para a API conforme o schema
      const transportadoraData = {
        // Identificação Básica
        nomeEmpresa: data.nomeEmpresa,
        nif: data.nif,
        email: data.email,
        website: data.website,
        senha: data.senha, // Campo de senha adicionado

        // Contatos
        contactos: {
          telefonePrincipal: data.telefonePrincipal,
          telefoneAlternativo: data.telefoneAlternativo,
          emailComercial: data.emailComercial,
        },

        // Endereço
        endereco: {
          provincia: data.provincia,
          cidade: data.cidade,
          bairro: data.bairro,
          rua: data.rua,
          numero: data.numero,
        },

        // Documentação Legal
        documentos: {
          alvara: {
            numero: data.alvaraNumero,
            dataEmissao: data.alvaraDataEmissao ? new Date(data.alvaraDataEmissao) : undefined,
            dataValidade: data.alvaraDataValidade ? new Date(data.alvaraDataValidade) : undefined,
          },
          registoComercial: {
            numero: data.registoComercialNumero,
            dataRegisto: data.registoComercialData ? new Date(data.registoComercialData) : undefined,
          },
          certificadoRegisto: {
            numero: data.certificadoRegistoNumero,
            dataEmissao: data.certificadoRegistoData ? new Date(data.certificadoRegistoData) : undefined,
          },
        },

        // Informações Operacionais
        tipoServicos: data.tipoServicos,
        capacidadeTotal: {
          totalCamioes: data.totalCamioes || 0,
          totalMotoristas: data.totalMotoristas || 0,
          tonelagemMaxima: data.tonelagemMaxima,
        },

        // Status
        status: data.status || "ativa",

        // Observações
        observacoes: data.observacoes,

        // Campos automáticos
        avaliacaoGeral: 0,
        dataCriacao: new Date(),
        dataAtualizacao: new Date(),
      };

      console.log("Enviando dados para API:", { ...transportadoraData, senha: "***" });

      // Mostrar toast de carregamento
      const loadingToast = toast.loading("Registrando transportadora...");

      const response = await fetch(`${API_BASE_URL}/createTransportadora`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transportadoraData),
      });

      const result = await response.json();
      console.log("Resposta da API:", result);

      // Fechar toast de carregamento
      toast.dismiss(loadingToast);

      if (result.returnCode === 201) {
        toast.success("🚛 Transportadora registrada com sucesso!", {
          autoClose: 3000,
        });

        // Executar callback de sucesso se fornecido
        if (onSuccess) {
          onSuccess();
        }

        // Redirecionar para a página de login após 2 segundos
        if (redirectToLogin) {
          setTimeout(() => {
            router.push("/login-transportadora");
          }, 2000);
        }
      } else {
        throw new Error(result.returnMsg || "Erro ao registrar transportadora");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erro no registro:", error);
      
      if (error.message.includes("Network") || error.message.includes("Failed to fetch")) {
        toast.error("🌐 Erro de conexão. Verifique sua internet e tente novamente.", {
          autoClose: 6000,
        });
      } else if (error.message.includes("Duplicate") || error.message.includes("NIF") || error.message.includes("email")) {
        toast.error("📋 NIF ou Email já cadastrado. Verifique os dados.", {
          autoClose: 6000,
        });
      } else if (error.message.includes("Password")) {
        toast.error("🔒 Senha é obrigatória", {
          autoClose: 6000,
        });
      } else {
        toast.error(
          `❌ ${error.message || "Erro ao processar registro. Tente novamente."}`,
          { autoClose: 6000 }
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const provinciaOptions = [
    "Maputo",
    "Maputo Cidade",
    "Gaza",
    "Inhambane",
    "Sofala",
    "Manica",
    "Tete",
    "Zambézia",
    "Nampula",
    "Cabo Delgado",
    "Niassa",
  ];

  const statusOptions = [
    { label: "Ativa", value: "ativa" },
    { label: "Inativa", value: "inativa" },
    { label: "Suspensa", value: "suspensa" },
    { label: "Pendente", value: "pendente" },
  ];

  if (compact) {
    return (
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Identificação Básica */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Identificação</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...register("nomeEmpresa", {
                  required: "Nome da empresa é obrigatório",
                })}
                type="text"
                placeholder="Nome da empresa"
                label="Nome da Empresa"
                isInvalid={!!errors.nomeEmpresa}
                errorMessage={errors.nomeEmpresa?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
              <Input
                {...register("nif", {
                  required: "NUIT é obrigatório",
                })}
                type="text"
                placeholder="Número do NUIT"
                label="NUIT"
                isInvalid={!!errors.nif}
                errorMessage={errors.nif?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
              <Input
                {...register("email", {
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                })}
                type="email"
                placeholder="email@empresa.com"
                label="Email"
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>

            {/* Campos de senha para versão compacta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...register("senha", {
                  required: "Senha é obrigatória",
                  minLength: {
                    value: 6,
                    message: "Senha deve ter pelo menos 6 caracteres"
                  }
                })}
                type="password"
                placeholder="Digite sua senha"
                label="Senha"
                isInvalid={!!errors.senha}
                errorMessage={errors.senha?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
              <Input
                {...register("confirmarSenha", {
                  required: "Confirme sua senha",
                  validate: validatePasswordMatch
                })}
                type="password"
                placeholder="Confirme sua senha"
                label="Confirmar Senha"
                isInvalid={!!errors.confirmarSenha}
                errorMessage={errors.confirmarSenha?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
          </div>

          {/* Contatos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contactos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...register("telefonePrincipal", {
                  required: "Telefone principal é obrigatório",
                })}
                type="tel"
                placeholder="+258 84 123 4567"
                label="Telefone Principal"
                isInvalid={!!errors.telefonePrincipal}
                errorMessage={errors.telefonePrincipal?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
              <Input
                {...register("telefoneAlternativo")}
                type="tel"
                placeholder="Telefone alternativo"
                label="Telefone Alternativo"
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            {onCancel && (
              <Button
                type="button"
                variant="flat"
                size="lg"
                fullWidth
                onPress={onCancel}
                className="h-12 font-medium"
              >
                Cancelar
              </Button>
            )}
            <Button
              type="submit"
              color="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              spinner={<Spinner size="sm" color="white" />}
              className="h-12 font-semibold"
            >
              {isSubmitting ? "Registrando..." : "Registrar"}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Seção 1: Identificação Básica */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
            <FiBriefcase className="text-lg" />
            Identificação da Empresa
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <p className="text-sm">Nome da Empresa *</p>
              <Input
                {...register("nomeEmpresa", {
                  required: "Nome da empresa é obrigatório",
                })}
                type="text"
                placeholder="Digite o nome da empresa"
                labelPlacement="outside"
                startContent={
                  <FiBriefcase className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                isInvalid={!!errors.nomeEmpresa}
                errorMessage={errors.nomeEmpresa?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">NUIT *</p>
              <Input
                {...register("nif", {
                  required: "NUIT é obrigatório",
                })}
                type="text"
                placeholder="Número do NUIT"
                labelPlacement="outside"
                isInvalid={!!errors.nif}
                errorMessage={errors.nif?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Email *</p>
              <Input
                {...register("email", {
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                })}
                type="email"
                placeholder="email@empresa.com"
                labelPlacement="outside"
                startContent={
                  <FiMail className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Website</p>
              <Input
                {...register("website")}
                type="text"
                placeholder="https://empresa.com"
                labelPlacement="outside"
                startContent={
                  <FiGlobe className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* Seção 2: Segurança - Nova seção para senhas */}
        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-4 flex items-center gap-2">
            <FiLock className="text-lg" />
            Segurança da Conta
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <p className="text-sm">Senha *</p>
              <Input
                {...register("senha", {
                  required: "Senha é obrigatória",
                  minLength: {
                    value: 6,
                    message: "Senha deve ter pelo menos 6 caracteres"
                  }
                })}
                type="password"
                placeholder="Digite sua senha"
                labelPlacement="outside"
                startContent={
                  <FiLock className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                isInvalid={!!errors.senha}
                errorMessage={errors.senha?.message}
                variant="bordered"
                fullWidth
                size="sm"
                description="Mínimo 6 caracteres"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Confirmar Senha *</p>
              <Input
                {...register("confirmarSenha", {
                  required: "Confirme sua senha",
                  validate: validatePasswordMatch
                })}
                type="password"
                placeholder="Digite novamente sua senha"
                labelPlacement="outside"
                startContent={
                  <FiLock className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                isInvalid={!!errors.confirmarSenha}
                errorMessage={errors.confirmarSenha?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* Seção 3: Contatos */}
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
            <FiPhone className="text-lg" />
            Contactos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <p className="text-sm">Telefone Principal *</p>
              <Input
                {...register("telefonePrincipal", {
                  required: "Telefone principal é obrigatório",
                })}
                type="tel"
                placeholder="+258 84 123 4567"
                labelPlacement="outside"
                startContent={
                  <FiPhone className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                isInvalid={!!errors.telefonePrincipal}
                errorMessage={errors.telefonePrincipal?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Telefone Alternativo</p>
              <Input
                {...register("telefoneAlternativo")}
                type="tel"
                placeholder="Telefone alternativo"
                labelPlacement="outside"
                startContent={
                  <FiPhone className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Email Comercial</p>
              <Input
                {...register("emailComercial")}
                type="email"
                placeholder="comercial@empresa.com"
                labelPlacement="outside"
                startContent={
                  <FiMail className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* Seção 4: Endereço */}
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-4 flex items-center gap-2">
            <FiHome className="text-lg" />
            Endereço
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <p className="text-sm">Província *</p>
              <Select
                {...register("provincia", {
                  required: "Província é obrigatória",
                })}
                placeholder="Selecione a província"
                labelPlacement="outside"
                variant="bordered"
                fullWidth
                size="sm"
                isInvalid={!!errors.provincia}
                errorMessage={errors.provincia?.message}
              >
                {provinciaOptions.map((provincia) => (
                  <SelectItem key={provincia} value={provincia} className="bg-purple-900">
                    {provincia}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Cidade *</p>
              <Input
                {...register("cidade", {
                  required: "Cidade é obrigatória",
                })}
                type="text"
                placeholder="Nome da cidade"
                labelPlacement="outside"
                isInvalid={!!errors.cidade}
                errorMessage={errors.cidade?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Bairro *</p>
              <Input
                {...register("bairro", {
                  required: "Bairro é obrigatório",
                })}
                type="text"
                placeholder="Nome do bairro"
                labelPlacement="outside"
                isInvalid={!!errors.bairro}
                errorMessage={errors.bairro?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Rua *</p>
              <Input
                {...register("rua", {
                  required: "Rua é obrigatória",
                })}
                type="text"
                placeholder="Nome da rua ou avenida"
                labelPlacement="outside"
                isInvalid={!!errors.rua}
                errorMessage={errors.rua?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Número</p>
              <Input
                {...register("numero")}
                type="text"
                placeholder="Número do prédio"
                labelPlacement="outside"
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* Seção 5: Capacidade Operacional */}
        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-300 mb-4 flex items-center gap-2">
            <FiTruck className="text-lg" />
            Capacidade Operacional
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <p className="text-sm">Total de Camiões *</p>
              <Input
                {...register("totalCamioes", {
                  required: "Total de camiões é obrigatório",
                  min: { value: 0, message: "Valor deve ser positivo" },
                })}
                type="number"
                placeholder="0"
                labelPlacement="outside"
                isInvalid={!!errors.totalCamioes}
                errorMessage={errors.totalCamioes?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Total de Motoristas *</p>
              <Input
                {...register("totalMotoristas", {
                  required: "Total de motoristas é obrigatório",
                  min: { value: 0, message: "Valor deve ser positivo" },
                })}
                type="number"
                placeholder="0"
                labelPlacement="outside"
                isInvalid={!!errors.totalMotoristas}
                errorMessage={errors.totalMotoristas?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Tonelagem Máxima (kg)</p>
              <Input
                {...register("tonelagemMaxima", {
                  min: { value: 0, message: "Valor deve ser positivo" },
                })}
                type="number"
                placeholder="Capacidade máxima"
                labelPlacement="outside"
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-md font-medium mb-3">Tipos de Serviços *</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Checkbox 
                value="chante"
                {...register("tipoServicos", {
                  required: "Pelo menos um tipo de serviço é obrigatório",
                })}
              >
                Chante
              </Checkbox>
              <Checkbox 
                value="nacional"
                {...register("tipoServicos")}
              >
                Nacional
              </Checkbox>
              <Checkbox 
                value="transito"
                {...register("tipoServicos")}
              >
                Trânsito
              </Checkbox>
            </div>
            {errors.tipoServicos && (
              <p className="text-danger text-sm mt-1">{errors.tipoServicos.message}</p>
            )}
          </div>

          {totalCamioes >= 3 && (
            <div className="mt-3 p-3 bg-success-50 border border-success-200 rounded-lg">
              <p className="text-success-700 text-sm">
                ✅ Esta transportadora está qualificada para serviços de trânsito
              </p>
            </div>
          )}
        </div>

        {/* Seção 6: Status e Observações */}
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2">
            <FiFileText className="text-lg" />
            Status e Observações
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <p className="text-sm">Status</p>
              <Select
                {...register("status")}
                placeholder="Selecione o status"
                labelPlacement="outside"
                variant="bordered"
                fullWidth
                size="sm"
                defaultSelectedKeys={["ativa"]}
              >
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="bg-red-900">
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex flex-col">
              <p className="text-sm">Observações</p>
              <Textarea
                {...register("observacoes")}
                placeholder="Observações adicionais sobre a transportadora..."
                labelPlacement="outside"
                variant="bordered"
                fullWidth
                minRows={3}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          {onCancel && (
            <Button
              type="button"
              variant="flat"
              size="lg"
              fullWidth
              onPress={onCancel}
              className="h-12 font-medium"
            >
              Cancelar
            </Button>
          )}

          <Button
            type="submit"
            color="primary"
            size="lg"
            fullWidth
            radius="md"
            isLoading={isSubmitting}
            spinner={<Spinner size="sm" color="white" />}
            className="h-12 bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-200 font-semibold"
          >
            {isSubmitting ? "Registrando..." : "Registrar Transportadora"}
          </Button>
        </div>
      </form>

      {showLoginLink && (
        <>
          <Divider className="my-8" />
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Já tem uma conta?{" "}
              <Link
                href="/login-transportadora"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Faça login aqui
              </Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
}