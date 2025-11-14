"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Link,
  Divider,
  Image,
  Select,
  SelectItem,
  Checkbox
} from "@nextui-org/react";
import { FiUser, FiMail, FiLock, FiArrowRight, FiTruck, FiPackage, FiMapPin, FiPhone, FiGlobe, FiFileText, FiHome, FiArrowLeft } from "react-icons/fi";

type UserType = "transportadora" | "cliente";

// Tipos específicos para Moçambicana
type FormDataBase = {
  nomeCompleto: string;
  email: string;
  password: string;
  telefone: string;
  endereco: string;
  cidade: string;
  provincia: string;
};

type TransportadoraData = FormDataBase & {
  nuit: string;
  nomeEmpresa: string;
  licencaOperacional: string;
  website?: string;
  numeroViaturas: string;
  tiposServico: string[];
  areasAtuacao: string[];
  classeTransportadora: string;
  capacidadeCarga: string;
  documentacaoRegular: boolean;
};

type ClienteData = FormDataBase & {
  tipoCliente: "individual" | "empresa";
  nuit?: string;
  nomeEmpresa?: string;
  tipoNegocio: string;
  tiposCarga: string[];
  volumeMensal: string;
  frequenciaTransporte: string;
  rotasPreferenciais: string[];
};

// Tipo união para o formulário
type FormData = (TransportadoraData | ClienteData) & {
  userType: UserType;
};

export default function RegisterPage() {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [step, setStep] = useState<"type" | "form">("type");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>();

  const router = useRouter();

  const onSubmit = (data: FormData) => {
    console.log("Dados do formulário:", data);
    alert(`Registro demo não implementado. Tipo: ${userType}, Email: ${data.email}`);
    router.push("/login");
  };

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setValue("userType", type);
    setStep("form");
  };

  const handleBackToTypeSelection = () => {
    setUserType(null);
    setStep("type");
  };

  // Opções baseadas na memória descritiva
  const tiposServico = [
    "Agenciamento de Cargas",
    "Despacho Aduaneiro",
    "Carga Local",
    "Carga Nacional",
    "Carga em Trânsito",
    "Carga de Retorno",
    "Serviços de GPS",
    "Abastecimento (Diesel)",
    "Serviços Terceirizados"
  ];

  const areasAtuacao = [
    "Cidade da Beira",
    "Província de Sofala",
    "Interland (Zimbabwe, Malawi, Zâmbia, RDC)",
    "Nacional",
    "Porto da Beira"
  ];

  const tiposCarga = [
    "Carga a granel (seca e líquida)",
    "Carga geral",
    "Carga contentorizada",
    "Carga refrigerada",
    "Carga rebaixada",
    "Carga em trânsito",
    "Carga líquida",
    "Carga especial",
    "Carga frágil",
    "Carga perigosa",
    "Carga anormal",
    "Carga específica",
    "Carga viva",
    "Carga salina",
    "Carga mineral"
  ];

  const rotasPreferenciais = [
    "Beira - Maputo",
    "Beira - Tete",
    "Beira - Nampula",
    "Beira - Quelimane",
    "Beira - Chimoio",
    "Beira - Zimbabwe",
    "Beira - Malawi",
    "Beira - Zâmbia",
    "Beira - RDC",
    "Porto da Beira - Fábricas",
    "Porto da Beira - Armazéns"
  ];

  const classesTransportadora = [
    { key: "1", label: "Classe 1: 1-3 camiões (até 120 km)" },
    { key: "2", label: "Classe 2: 4-10 camiões (Nacional + 1 país Interland)" },
    { key: "3", label: "Classe 3: 11+ camiões (Nacional + 2 países Interland)" }
  ];

  // Função auxiliar para verificar erros de forma segura
  const getError = (field: string) => {
    return errors[field as keyof typeof errors]?.message;
  };

  // Renderizar seleção de tipo de usuário
  if (step === "type") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 px-3 py-6 sm:p-4">
        <Card className="w-full max-w-md border-none bg-background/60 dark:bg-default-100/50 backdrop-blur-sm shadow-xl mx-2 sm:mx-4">
          <CardHeader className="flex flex-col items-center pt-6 sm:pt-10 px-4 sm:px-10 pb-0">
            <Image
              src="/image/megaCentroLogistica.png"
              alt="Logotipo"
              width={56}
              height={56}
              className="mb-3"
              classNames={{
                wrapper: "w-14 h-14 sm:w-16 sm:h-16"
              }}
            />
            <h1 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Criar Conta
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 text-center px-2">
              Selecione o tipo de conta que deseja criar
            </p>
          </CardHeader>

          <CardBody className="px-4 sm:px-10 py-4 sm:py-6">
            <div className="space-y-3 sm:space-y-4">
              <Button
                onClick={() => handleUserTypeSelect("transportadora")}
                color="primary"
                variant="bordered"
                size="lg"
                fullWidth
                className="h-14 sm:h-16 border-2 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all py-2"
                startContent={<FiTruck className="text-lg sm:text-xl" />}
              >
                <div className="text-left flex-1">
                  <div className="font-semibold text-sm sm:text-base">Empresa Transportadora</div>
                  <div className="text-xs text-gray-500 leading-tight mt-0.5">Oferecer serviços de transporte</div>
                </div>
              </Button>

              <Button
                onClick={() => handleUserTypeSelect("cliente")}
                color="secondary"
                variant="bordered"
                size="lg"
                fullWidth
                className="h-14 sm:h-16 border-2 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 transition-all py-2"
                startContent={<FiPackage className="text-lg sm:text-xl" />}
              >
                <div className="text-left flex-1">
                  <div className="font-semibold text-sm sm:text-base">Cliente</div>
                  <div className="text-xs text-gray-500 leading-tight mt-0.5">Contratar serviços de transporte</div>
                </div>
              </Button>
            </div>

            <Divider className="my-4 sm:my-6 bg-gray-200 dark:bg-gray-700" />

            <div className="flex justify-center">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
                Já possui uma conta?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-xs sm:text-sm"
                >
                  Faça login
                </Link>
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  // Renderizar formulário específico baseado no tipo de usuário
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 px-3 py-6 sm:p-4">
      <Card className="w-full max-w-2xl lg:max-w-4xl border-none bg-background/60 dark:bg-default-100/50 backdrop-blur-sm shadow-xl mx-2 sm:mx-4">
        <CardHeader className="flex flex-col items-center pt-6 sm:pt-10 px-4 sm:px-10 pb-0">
          <Image
            src="/image/megaCentroLogistica.png"
            alt="Logotipo"
            width={56}
            height={56}
            className="mb-3"
            classNames={{
              wrapper: "w-14 h-14 sm:w-16 sm:h-16"
            }}
          />
          <div className="flex items-center gap-2 sm:gap-3 mb-2 w-full max-w-md lg:max-w-none">
            <Button
              variant="light"
              size="sm"
              onClick={handleBackToTypeSelection}
              className="min-w-8 sm:min-w-10 h-8 sm:h-10 px-2"
              startContent={<FiArrowLeft className="text-sm sm:text-base" />}
            >
              <span className="sr-only sm:not-sr-only sm:inline">Voltar</span>
            </Button>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent flex-1">
              {userType === "transportadora" ? "Empresa Transportadora" : "Cliente"}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center px-2">
            {userType === "transportadora" 
              ? "Cadastre sua empresa transportadora" 
              : "Cadastre-se para contratar serviços de transporte"}
          </p>
        </CardHeader>

        <CardBody className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            <input type="hidden" {...register("userType")} />

            {/* Campos comuns para ambos os tipos */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <Input
                {...register("nomeCompleto", {
                  required: "Nome completo é obrigatório",
                  minLength: {
                    value: 3,
                    message: "Nome deve ter pelo menos 3 caracteres",
                  },
                })}
                type="text"
                label="Nome Completo"
                labelPlacement="outside-left"
                startContent={
                  <div className="flex items-center pointer-events-none">
                    <FiUser className="text-lg text-default-400" />
                  </div>
                }
                isInvalid={!!getError("nomeCompleto")}
                errorMessage={getError("nomeCompleto")}
                variant="bordered"
                classNames={{
                  mainWrapper: "w-full",
                  input: "text-base pl-2",
                  label: "text-sm font-medium text-foreground mb-1",
                  inputWrapper: "h-12"
                }}
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
                label="Email"
                labelPlacement="outside-left"
                startContent={
                  <div className="flex items-center pointer-events-none">
                    <FiMail className="text-lg text-default-400" />
                  </div>
                }
                isInvalid={!!getError("email")}
                errorMessage={getError("email")}
                variant="bordered"
                classNames={{
                  mainWrapper: "w-full",
                  input: "text-base pl-2",
                  label: "text-sm font-medium text-foreground mb-1",
                  inputWrapper: "h-12"
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <Input
                {...register("telefone", {
                  required: "Telefone é obrigatório",
                })}
                type="tel"
                label="Telefone"
                labelPlacement="outside-left"
                startContent={
                  <div className="flex items-center pointer-events-none">
                    <FiPhone className="text-lg text-default-400" />
                  </div>
                }
                isInvalid={!!getError("telefone")}
                errorMessage={getError("telefone")}
                variant="bordered"
                classNames={{
                  mainWrapper: "w-full",
                  input: "text-base pl-2",
                  label: "text-sm font-medium text-foreground mb-1",
                  inputWrapper: "h-12"
                }}
              />

              <Input
                {...register("password", {
                  required: "Senha é obrigatória",
                  minLength: {
                    value: 8,
                    message: "Senha deve ter no mínimo 8 caracteres",
                  },
                })}
                type="password"
                label="Senha"
                labelPlacement="outside-left"
                startContent={
                  <div className="flex items-center pointer-events-none">
                    <FiLock className="text-lg text-default-400" />
                  </div>
                }
                isInvalid={!!getError("password")}
                errorMessage={getError("password")}
                variant="bordered"
                classNames={{
                  mainWrapper: "w-full",
                  input: "text-base pl-2",
                  label: "text-sm font-medium text-foreground mb-1",
                  inputWrapper: "h-12"
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Input
                {...register("endereco", {
                  required: "Endereço é obrigatório",
                })}
                type="text"
                label="Endereço"
                labelPlacement="outside-left"
                startContent={
                  <div className="flex items-center pointer-events-none">
                    <FiMapPin className="text-lg text-default-400" />
                  </div>
                }
                isInvalid={!!getError("endereco")}
                errorMessage={getError("endereco")}
                variant="bordered"
                classNames={{
                  mainWrapper: "w-full",
                  input: "text-base pl-2",
                  label: "text-sm font-medium text-foreground mb-1",
                  inputWrapper: "h-12"
                }}
              />

              <Input
                {...register("cidade", {
                  required: "Cidade é obrigatória",
                })}
                type="text"
                label="Cidade"
                labelPlacement="outside-left"
                defaultValue="Beira"
                isInvalid={!!getError("cidade")}
                errorMessage={getError("cidade")}
                variant="bordered"
                classNames={{
                  mainWrapper: "w-full",
                  input: "text-base pl-2",
                  label: "text-sm font-medium text-foreground mb-1",
                  inputWrapper: "h-12"
                }}
              />

              <Input
                {...register("provincia", {
                  required: "Província é obrigatória",
                })}
                type="text"
                label="Província"
                labelPlacement="outside-left"
                defaultValue="Sofala"
                isInvalid={!!getError("provincia")}
                errorMessage={getError("provincia")}
                variant="bordered"
                classNames={{
                  mainWrapper: "w-full",
                  input: "text-base pl-2",
                  label: "text-sm font-medium text-foreground mb-1",
                  inputWrapper: "h-12"
                }}
              />
            </div>

            {/* Campos específicos para Transportadora */}
            {userType === "transportadora" && (
              <>
                <Divider className="my-4 sm:my-6" />
                <h3 className="text-lg sm:text-xl font-semibold text-blue-600 mb-4">Dados da Empresa Transportadora</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <Input
                    {...register("nuit", {
                      required: "NUIT é obrigatório",
                      pattern: {
                        value: /^\d{9}$/,
                        message: "NUIT deve ter 9 dígitos",
                      },
                    })}
                    type="text"
                    label="NUIT"
                    labelPlacement="outside-left"
                    startContent={
                      <div className="flex items-center pointer-events-none">
                        <FiFileText className="text-lg text-default-400" />
                      </div>
                    }
                    isInvalid={!!getError("nuit")}
                    errorMessage={getError("nuit")}
                    variant="bordered"
                    classNames={{
                      mainWrapper: "w-full",
                      input: "text-base pl-2",
                      label: "text-sm font-medium text-foreground mb-1",
                      inputWrapper: "h-12"
                    }}
                  />

                  <Input
                    {...register("nomeEmpresa", {
                      required: "Nome da empresa é obrigatório",
                    })}
                    type="text"
                    label="Nome da Empresa"
                    labelPlacement="outside-left"
                    startContent={
                      <div className="flex items-center pointer-events-none">
                        <FiHome className="text-lg text-default-400" />
                      </div>
                    }
                    isInvalid={!!getError("nomeEmpresa")}
                    errorMessage={getError("nomeEmpresa")}
                    variant="bordered"
                    classNames={{
                      mainWrapper: "w-full",
                      input: "text-base pl-2",
                      label: "text-sm font-medium text-foreground mb-1",
                      inputWrapper: "h-12"
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <Input
                    {...register("licencaOperacional", {
                      required: "Licença operacional é obrigatória",
                    })}
                    type="text"
                    label="Licença Operacional"
                    labelPlacement="outside-left"
                    startContent={
                      <div className="flex items-center pointer-events-none">
                        <FiFileText className="text-lg text-default-400" />
                      </div>
                    }
                    isInvalid={!!getError("licencaOperacional")}
                    errorMessage={getError("licencaOperacional")}
                    variant="bordered"
                    classNames={{
                      mainWrapper: "w-full",
                      input: "text-base pl-2",
                      label: "text-sm font-medium text-foreground mb-1",
                      inputWrapper: "h-12"
                    }}
                  />

                  <Select
                    {...register("classeTransportadora", {
                      required: "Classe da transportadora é obrigatória",
                    })}
                    label="Classe da Transportadora"
                    labelPlacement="outside-left"
                    placeholder="Selecione a classe"
                    isInvalid={!!getError("classeTransportadora")}
                    errorMessage={getError("classeTransportadora")}
                    variant="bordered"
                    classNames={{
                      trigger: "h-12 min-h-12",
                      value: "text-base",
                      label: "text-sm font-medium text-foreground mb-1",
                      mainWrapper: "w-full"
                    }}
                  >
                    {classesTransportadora.map((classe) => (
                      <SelectItem key={classe.key} value={classe.key} textValue={classe.label} className="bg-blue-950">
                        <div className="text-base">{classe.label}</div>
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <Input
                    {...register("numeroViaturas", {
                      required: "Número de viaturas é obrigatório",
                    })}
                    type="number"
                    label="Número de Viaturas"
                    labelPlacement="outside-left"
                    startContent={
                      <div className="flex items-center pointer-events-none">
                        <FiTruck className="text-lg text-default-400" />
                      </div>
                    }
                    isInvalid={!!getError("numeroViaturas")}
                    errorMessage={getError("numeroViaturas")}
                    variant="bordered"
                    classNames={{
                      mainWrapper: "w-full",
                      input: "text-base pl-2",
                      label: "text-sm font-medium text-foreground mb-1",
                      inputWrapper: "h-12"
                    }}
                  />

                  <Input
                    {...register("capacidadeCarga", {
                      required: "Capacidade de carga é obrigatória",
                    })}
                    type="text"
                    label="Capacidade de Carga"
                    labelPlacement="outside-left"
                    startContent={
                      <div className="flex items-center pointer-events-none">
                        <FiPackage className="text-lg text-default-400" />
                      </div>
                    }
                    isInvalid={!!getError("capacidadeCarga")}
                    errorMessage={getError("capacidadeCarga")}
                    variant="bordered"
                    classNames={{
                      mainWrapper: "w-full",
                      input: "text-base pl-2",
                      label: "text-sm font-medium text-foreground mb-1",
                      inputWrapper: "h-12"
                    }}
                  />
                </div>

                <Select
                  {...register("tiposServico", {
                    required: "Pelo menos um tipo de serviço é obrigatório",
                  })}
                  label="Tipos de Serviço Oferecidos"
                  labelPlacement="outside-left"
                  selectionMode="multiple"
                  placeholder="Selecione os serviços"
                  isInvalid={!!getError("tiposServico")}
                  errorMessage={getError("tiposServico")}
                  variant="bordered"
                  classNames={{
                    trigger: "min-h-12",
                    value: "text-base",
                    label: "text-sm font-medium text-foreground mb-1",
                    mainWrapper: "w-full"
                  }}
                >
                  {tiposServico.map((servico) => (
                    <SelectItem key={servico} value={servico} textValue={servico} className="bg-blue-950">
                      <div className="text-base">{servico}</div>
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  {...register("areasAtuacao", {
                    required: "Pelo menos uma área de atuação é obrigatória",
                  })}
                  label="Áreas de Actuação"
                  labelPlacement="outside-left"
                  selectionMode="multiple"
                  placeholder="Selecione as áreas de atuação"
                  isInvalid={!!getError("areasAtuacao")}
                  errorMessage={getError("areasAtuacao")}
                  variant="bordered"
                  classNames={{
                    trigger: "min-h-12",
                    value: "text-base",
                    label: "text-sm font-medium text-foreground mb-1",
                    mainWrapper: "w-full"
                  }}
                >
                  {areasAtuacao.map((area) => (
                    <SelectItem key={area} value={area} textValue={area} className="bg-blue-950">
                      <div className="text-base">{area}</div>
                    </SelectItem>
                  ))}
                </Select>

                <Input
                  {...register("website")}
                  type="url"
                  label="Website (Opcional)"
                  labelPlacement="outside-left"
                  startContent={
                    <div className="flex items-center pointer-events-none">
                      <FiGlobe className="text-lg text-default-400" />
                    </div>
                  }
                  isInvalid={!!getError("website")}
                  errorMessage={getError("website")}
                  variant="bordered"
                  classNames={{
                    mainWrapper: "w-full",
                    input: "text-base pl-2",
                    label: "text-sm font-medium text-foreground mb-1",
                    inputWrapper: "h-12"
                  }}
                />

                <Checkbox
                  {...register("documentacaoRegular")}
                  defaultSelected
                  classNames={{
                    label: "text-base"
                  }}
                >
                  Documentação regularizada com as autoridades
                </Checkbox>
              </>
            )}

            {/* Campos específicos para Cliente */}
            {userType === "cliente" && (
              <>
                <Divider className="my-4 sm:my-6" />
                <h3 className="text-lg sm:text-xl font-semibold text-cyan-600 mb-4">Dados do Cliente</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <Select
                    {...register("tipoCliente", {
                      required: "Tipo de cliente é obrigatório",
                    })}
                    label="Tipo de Cliente"
                    labelPlacement="outside-left"
                    placeholder="Selecione o tipo"
                    isInvalid={!!getError("tipoCliente")}
                    errorMessage={getError("tipoCliente")}
                    variant="bordered"
                    classNames={{
                      trigger: "h-12 min-h-12",
                      value: "text-base",
                      label: "text-sm font-medium text-foreground mb-1",
                      mainWrapper: "w-full"
                    }}
                    
                  >
                    <SelectItem key="individual" value="individual" textValue="Individual" className="bg-blue-950">
                      <div className="text-base">Individual</div>
                    </SelectItem>
                    <SelectItem key="empresa" value="empresa" textValue="Empresa" className="bg-blue-950">
                      <div className="text-base">Empresa</div>
                    </SelectItem>
                  </Select>

                  <Input
                    {...register("nuit")}
                    type="text"
                    label="NUIT (Opcional para individuais)"
                    labelPlacement="outside-left"
                    startContent={
                      <div className="flex items-center pointer-events-none">
                        <FiFileText className="text-lg text-default-400" />
                      </div>
                    }
                    isInvalid={!!getError("nuit")}
                    errorMessage={getError("nuit")}
                    variant="bordered"
                    classNames={{
                      mainWrapper: "w-full",
                      input: "text-base pl-2",
                      label: "text-sm font-medium text-foreground mb-1",
                      inputWrapper: "h-12"
                    }}
                  />
                </div>

                {watch("tipoCliente") === "empresa" && (
                  <Input
                    {...register("nomeEmpresa", {
                      required: watch("tipoCliente") === "empresa" ? "Nome da empresa é obrigatório" : false,
                    })}
                    type="text"
                    label="Nome da Empresa"
                    labelPlacement="outside-left"
                    startContent={
                      <div className="flex items-center pointer-events-none">
                        <FiHome className="text-lg text-default-400" />
                      </div>
                    }
                    isInvalid={!!getError("nomeEmpresa")}
                    errorMessage={getError("nomeEmpresa")}
                    variant="bordered"
                    classNames={{
                      mainWrapper: "w-full",
                      input: "text-base pl-2",
                      label: "text-sm font-medium text-foreground mb-1",
                      inputWrapper: "h-12"
                    }}
                  />
                )}

                <Input
                  {...register("tipoNegocio", {
                    required: "Tipo de negócio é obrigatório",
                  })}
                  type="text"
                  label="Tipo de Negócio"
                  labelPlacement="outside-left"
                  startContent={
                    <div className="flex items-center pointer-events-none">
                      <FiHome className="text-lg text-default-400" />
                    </div>
                  }
                  isInvalid={!!getError("tipoNegocio")}
                  errorMessage={getError("tipoNegocio")}
                  variant="bordered"
                  classNames={{
                    mainWrapper: "w-full",
                    input: "text-base pl-2",
                    label: "text-sm font-medium text-foreground mb-1",
                    inputWrapper: "h-12"
                  }}
                />

                <Select
                  {...register("tiposCarga", {
                    required: "Pelo menos um tipo de carga é obrigatório",
                  })}
                  label="Tipos de Carga que Transporta"
                  labelPlacement="outside-left"
                  selectionMode="multiple"
                  placeholder="Selecione os tipos de carga"
                  isInvalid={!!getError("tiposCarga")}
                  errorMessage={getError("tiposCarga")}
                  variant="bordered"
                  classNames={{
                    trigger: "min-h-12",
                    value: "text-base",
                    label: "text-sm font-medium text-foreground mb-1",
                    mainWrapper: "w-full"
                  }}
                >
                  {tiposCarga.map((carga) => (
                    <SelectItem key={carga} value={carga} textValue={carga} className="bg-blue-950">
                      <div className="text-base">{carga}</div>
                    </SelectItem>
                  ))}
                </Select>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <Input
                    {...register("volumeMensal", {
                      required: "Volume mensal é obrigatório",
                    })}
                    type="text"
                    label="Volume Mensal Estimado"
                    labelPlacement="outside-left"
                    startContent={
                      <div className="flex items-center pointer-events-none">
                        <FiPackage className="text-lg text-default-400" />
                      </div>
                    }
                    isInvalid={!!getError("volumeMensal")}
                    errorMessage={getError("volumeMensal")}
                    variant="bordered"
                    classNames={{
                      mainWrapper: "w-full",
                      input: "text-base pl-2",
                      label: "text-sm font-medium text-foreground mb-1",
                      inputWrapper: "h-12"
                    }}
                  />

                  <Input
                    {...register("frequenciaTransporte", {
                      required: "Frequência de transporte é obrigatória",
                    })}
                    type="text"
                    label="Frequência de Transporte"
                    labelPlacement="outside-left"
                    startContent={
                      <div className="flex items-center pointer-events-none">
                        <FiTruck className="text-lg text-default-400" />
                      </div>
                    }
                    isInvalid={!!getError("frequenciaTransporte")}
                    errorMessage={getError("frequenciaTransporte")}
                    variant="bordered"
                    classNames={{
                      mainWrapper: "w-full",
                      input: "text-base pl-2",
                      label: "text-sm font-medium text-foreground mb-1",
                      inputWrapper: "h-12"
                    }}
                  />
                </div>

                <Select
                  {...register("rotasPreferenciais")}
                  label="Rotas Preferenciais (Opcional)"
                  labelPlacement="outside-left"
                  selectionMode="multiple"
                  placeholder="Selecione as rotas preferenciais"
                  isInvalid={!!getError("rotasPreferenciais")}
                  errorMessage={getError("rotasPreferenciais")}
                  variant="bordered"
                  classNames={{
                    trigger: "min-h-12",
                    value: "text-base",
                    label: "text-sm font-medium text-foreground mb-1",
                    mainWrapper: "w-full"
                  }}
                >
                  {rotasPreferenciais.map((rota) => (
                    <SelectItem key={rota} value={rota} textValue={rota} className="bg-blue-950">
                      <div className="text-base">{rota}</div>
                    </SelectItem>
                  ))}
                </Select>
              </>
            )}

            <Button
              type="submit"
              color="primary"
              size="lg"
              radius="sm"
              fullWidth
              className="mt-6 sm:mt-8 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              endContent={<FiArrowRight className="text-white" />}
            >
              <span className="text-base font-medium">
                {userType === "transportadora" ? "Cadastrar Transportadora" : "Cadastrar Cliente"}
              </span>
            </Button>
          </form>

          <Divider className="my-6 sm:my-8 bg-gray-200 dark:bg-gray-700" />

          <div className="flex justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Já possui uma conta?{" "}
              <Link
                href="/login"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm"
              >
                Faça login
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}