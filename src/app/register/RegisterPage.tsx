"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
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
  FiLock,
  FiEye,
  FiEyeOff,
  FiUser,
  FiPhone,
  FiBriefcase,
  FiHome,
  FiDollarSign,
} from "react-icons/fi";

// URL base da API
const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

interface RegisterFormInputs {
  // Identificação do Cliente
  nome: string;
  nomeEmpresa: string;
  tipoPessoa: "Física" | "Jurídica";
  categoria: "Gestor" | "Cliente" | "Motorista";
  nuit: string;
  segmento: string;

  // Login
  senha: string;
  confirmarSenha: string;

  // Contato Principal
  contatoNome: string;
  contatoCargo: string;
  contatoTelefone: string;
  contatoEmail: string;
  contatoDepartamento: string;

  // Endereço
  cidade: string;
  provincia: string;
  bairro: string;
  rua: string;
  codigoPostal: string;
  pais: string;

  // Dados Fiscais/Contratos
  formaPagamento: string;
  prazoPagamento: number;

  // Preferências
  instrucaoEspecial?: string;
  observacoes?: string;

  // Notificações
  notificacoesEmail: boolean;
  notificacoesSMS: boolean;
  notificacoesWhatsapp: boolean;

  // Canal de Captação
  canalCaptacao: string;
}

interface RegisterFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  showLoginLink?: boolean;
  compact?: boolean;
}

export default function RegisterForm({ 
  onSuccess, 
  onCancel, 
  showLoginLink = true,
  compact = false 
}: RegisterFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setFocus,
    watch,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    control,
  } = useForm<RegisterFormInputs>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const senha = watch("senha");

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setIsSubmitting(true);

    try {
      // Preparar dados para a API conforme o schema
      const clienteData = {
        // Identificação do Cliente
        nome: data.nome,
        nomeEmpresa: data.nomeEmpresa || "Mega Centro e Logistica",
        categoria: data.categoria,
        tipoPessoa: data.tipoPessoa,
        nuit: data.nuit,
        segmento: data.segmento,
        classificacao: "Novo",

        // Login
        senha: data.senha,

        // Contatos
        contatos: [
          {
            nome: data.contatoNome,
            cargo: data.contatoCargo,
            telefone: data.contatoTelefone,
            email: data.contatoEmail,
            departamento: data.contatoDepartamento,
            principal: true,
          },
        ],

        // Endereço
        enderecoCobranca: {
          rua: data.rua,
          cidade: data.cidade,
          pais: data.pais || "Moçambique",
          codigoPostal: data.codigoPostal,
          provincia: data.provincia,
          bairro: data.bairro,
        },

        // Dados Fiscais/Contratos
        formaPagamento: data.formaPagamento,
        prazoPagamento: data.prazoPagamento,
        moeda: "MZN",

        // Preferências
        instrucaoEspecial: data.instrucaoEspecial,
        observacoes: data.observacoes,
        prioridadeAtendimento: "média",

        // Status
        status: "potencial",

        // Notificações
        notificacoes: {
          email: data.notificacoesEmail,
          sms: data.notificacoesSMS,
          whatsapp: data.notificacoesWhatsapp,
          alertasStatus: true,
          relatoriosMensais: false,
        },

        // Canal de Captação
        canalCaptacao: data.canalCaptacao,

        // Métricas iniciais
        metricas: {
          totalViagens: 0,
          viagensConcluidas: 0,
          viagensPendentes: 0,
          valorTotalFretes: 0,
          mediaMensalFretes: 0,
          tempoMedioContrato: 0,
          indiceSatisfacao: 5,
        },

        // Comportamento inicial
        comportamento: {
          pontualidadePagamentos: 5,
          cumprimentoInstrucoes: 5,
          frequenciaReclamacoes: 0,
        },

        avaliacao: 5,
      };

      console.log("Enviando dados para API:", clienteData);

      // Mostrar toast de carregamento
      const loadingToast = toast.loading("Enviando dados de cadastro...");

      const response = await fetch(`${API_BASE_URL}/createCliente`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clienteData),
      });

      const result = await response.json();
      console.log("Resposta da API:", result);

      // Fechar toast de carregamento
      toast.dismiss(loadingToast);

      if (result.returnCode === 201) {
        toast.success("🎉 Cadastro realizado com sucesso!", {
          autoClose: 3000,
        });

        // Aguardar um momento antes de redirecionar
        setTimeout(() => {
          // Redirecionar para a página de login
          router.push("/login");
          
          // Chamar callback de sucesso se fornecido
          if (onSuccess) {
            onSuccess();
          }
        }, 1500); // 1.5 segundos de delay para o usuário ver a mensagem de sucesso
      } else {
        throw new Error(result.returnMsg || "Erro ao cadastrar");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      
      // Toast de erro detalhado
      if (error.message.includes("Network") || error.message.includes("Failed to fetch")) {
        toast.error("🌐 Erro de conexão. Verifique sua internet e tente novamente.", {
          autoClose: 6000,
        });
      } else if (error.message.includes("NUIT")) {
        toast.error("📋 NUIT inválido ou já cadastrado. Verifique os dados.", {
          autoClose: 6000,
        });
      } else if (error.message.includes("Email")) {
        toast.error("📧 Email já cadastrado. Tente recuperar sua senha.", {
          autoClose: 6000,
        });
      } else {
        toast.error(
          `❌ ${error.message || "Erro ao processar cadastro. Tente novamente."}`,
          { autoClose: 6000 }
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const tipoPessoaOptions = [
    { label: "Pessoa Física", value: "Física" },
    { label: "Pessoa Jurídica", value: "Jurídica" },
  ];

  const categoriaOptions = [
    { label: "Cliente", value: "Cliente" },
  ];

  const segmentoOptions = [
    { label: "Agricultura", value: "Agricultura" },
    { label: "Comércio", value: "Comércio" },
    { label: "Indústria", value: "Indústria" },
    { label: "Serviços", value: "Serviços" },
    { label: "Transporte", value: "Transporte" },
    { label: "Logística", value: "Logística" },
    { label: "Mineração", value: "Mineração" },
    { label: "Construção Civil", value: "Construção Civil" },
    { label: "Outros", value: "Outros" },
  ];

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

  const formaPagamentoOptions = [
    { label: "Transferência Bancária", value: "transferencia" },
    { label: "Dinheiro", value: "dinheiro" },
    { label: "Cheque", value: "cheque" },
    { label: "Cartão", value: "cartao" },
    { label: "Pré-pagamento", value: "pre_pagamento" },
    { label: "Pós-pagamento", value: "pos_pagamento" },
  ];

  const canalCaptacaoOptions = [
    { label: "Indicação", value: "indicacao" },
    { label: "Site", value: "site" },
    { label: "Visita", value: "visita" },
    { label: "Telefone", value: "telefone" },
    { label: "Email", value: "email" },
    { label: "Outro", value: "outro" },
  ];

  if (compact) {
    return (
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Seção 1: Identificação */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Identificação do Cliente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...register("nome", {
                  required: "Nome é obrigatório",
                  minLength: {
                    value: 3,
                    message: "Nome deve ter pelo menos 3 caracteres",
                  },
                })}
                type="text"
                placeholder="Nome completo"
                label="Nome Completo"
                isInvalid={!!errors.nome}
                errorMessage={errors.nome?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
              <Input
                {...register("nuit", {
                  required: "NUIT é obrigatório",
                  pattern: {
                    value: /^\d{9}$/,
                    message: "NUIT deve ter 9 dígitos",
                  },
                })}
                type="text"
                placeholder="123456789"
                label="NUIT"
                isInvalid={!!errors.nuit}
                errorMessage={errors.nuit?.message}
                variant="bordered"
                fullWidth
                size="sm"
                maxLength={9}
              />
              <Select
                {...register("tipoPessoa", {
                  required: "Tipo de pessoa é obrigatório",
                })}
                placeholder="Selecione o tipo"
                label="Tipo de Pessoa"
                variant="bordered"
                fullWidth
                size="sm"
                isInvalid={!!errors.tipoPessoa}
                errorMessage={errors.tipoPessoa?.message}
              >
                {tipoPessoaOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                {...register("segmento", {
                  required: "Segmento é obrigatório",
                })}
                placeholder="Selecione o segmento"
                label="Segmento de Actividade"
                variant="bordered"
                fullWidth
                size="sm"
                isInvalid={!!errors.segmento}
                errorMessage={errors.segmento?.message}
              >
                {segmentoOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          {/* Seção 2: Login */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dados de Login</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...register("senha", {
                  required: "Senha é obrigatória",
                  minLength: {
                    value: 6,
                    message: "Senha deve ter pelo menos 6 caracteres",
                  },
                })}
                type={isVisible ? "text" : "password"}
                placeholder="••••••••"
                label="Senha"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FiEyeOff className="text-xl text-default-400 pointer-events-none" />
                    ) : (
                      <FiEye className="text-xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                isInvalid={!!errors.senha}
                errorMessage={errors.senha?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
              <Input
                {...register("confirmarSenha", {
                  required: "Confirme a senha",
                  validate: (value) =>
                    value === senha || "As senhas não coincidem",
                })}
                type="password"
                placeholder="••••••••"
                label="Confirmar Senha"
                isInvalid={!!errors.confirmarSenha}
                errorMessage={errors.confirmarSenha?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
          </div>

          {/* Seção 3: Contato Principal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto Principal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...register("contatoNome", {
                  required: "Nome do contato é obrigatório",
                })}
                type="text"
                placeholder="Nome da pessoa de contacto"
                label="Nome do Contacto"
                isInvalid={!!errors.contatoNome}
                errorMessage={errors.contatoNome?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
              <Input
                {...register("contatoEmail", {
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                })}
                type="email"
                placeholder="contato@empresa.com"
                label="Email"
                isInvalid={!!errors.contatoEmail}
                errorMessage={errors.contatoEmail?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
              <Input
                {...register("contatoTelefone", {
                  required: "Telefone é obrigatório",
                })}
                type="tel"
                placeholder="+258 84 123 4567"
                label="Telefone"
                isInvalid={!!errors.contatoTelefone}
                errorMessage={errors.contatoTelefone?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
              <Input
                {...register("contatoCargo")}
                type="text"
                placeholder="Cargo/função"
                label="Cargo"
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
              {isSubmitting ? "Enviando..." : "Cadastrar"}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Seção 1: Identificação */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
            <FiUser className="text-lg" />
            Identificação do Cliente
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <p className="text-sm">Nome Completo</p>
              <Input
                {...register("nome", {
                  required: "Nome é obrigatório",
                  minLength: {
                    value: 3,
                    message: "Nome deve ter pelo menos 3 caracteres",
                  },
                })}
                type="text"
                placeholder="Digite seu nome completo"
                labelPlacement="outside"
                startContent={
                  <FiUser className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                isInvalid={!!errors.nome}
                errorMessage={errors.nome?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">NUIT</p>
              <Input
                {...register("nuit", {
                  required: "NUIT é obrigatório",
                  pattern: {
                    value: /^\d{9}$/,
                    message: "NUIT deve ter 9 dígitos",
                  },
                })}
                type="text"
                placeholder="123456789"
                labelPlacement="outside"
                startContent={
                  <FiBriefcase className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                isInvalid={!!errors.nuit}
                errorMessage={errors.nuit?.message}
                variant="bordered"
                fullWidth
                size="sm"
                maxLength={9}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Tipo de Pessoa</p>
              <Select
                {...register("tipoPessoa", {
                  required: "Tipo de pessoa é obrigatório",
                })}
                placeholder="Selecione o tipo"
                labelPlacement="outside"
                variant="bordered"
                fullWidth
                size="sm"
                isInvalid={!!errors.tipoPessoa}
                errorMessage={errors.tipoPessoa?.message}
              >
                {tipoPessoaOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="bg-blue-900">
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Categoria</p>
              <Select
                {...register("categoria", {
                  required: "Categoria é obrigatória",
                })}
                placeholder="Selecione a categoria"
                labelPlacement="outside"
                variant="bordered"
                fullWidth
                size="sm"
                isInvalid={!!errors.categoria}
                errorMessage={errors.categoria?.message}
              >
                {categoriaOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="bg-blue-900">
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Segmento de Actividade</p>
              <Select
                {...register("segmento", {
                  required: "Segmento é obrigatório",
                })}
                placeholder="Selecione o segmento"
                labelPlacement="outside"
                variant="bordered"
                fullWidth
                size="sm"
                isInvalid={!!errors.segmento}
                errorMessage={errors.segmento?.message}
              >
                {segmentoOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="bg-blue-900">
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
        </div>

        {/* Seção 2: Login */}
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
            <FiLock className="text-lg" />
            Dados de Login
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <p className="text-sm">Senha</p>
              <Input
                {...register("senha", {
                  required: "Senha é obrigatória",
                  minLength: {
                    value: 6,
                    message: "Senha deve ter pelo menos 6 caracteres",
                  },
                })}
                type={isVisible ? "text" : "password"}
                placeholder="••••••••"
                labelPlacement="outside"
                startContent={
                  <FiLock className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FiEyeOff className="text-xl text-default-400 pointer-events-none" />
                    ) : (
                      <FiEye className="text-xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                isInvalid={!!errors.senha}
                errorMessage={errors.senha?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Confirmar Senha</p>
              <Input
                {...register("confirmarSenha", {
                  required: "Confirme a senha",
                  validate: (value) =>
                    value === senha || "As senhas não coincidem",
                })}
                type="password"
                placeholder="••••••••"
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

        {/* Seção 3: Contato Principal */}
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-4 flex items-center gap-2">
            <FiPhone className="text-lg" />
            Contacto Principal
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <p className="text-sm">Nome do Contacto</p>
              <Input
                {...register("contatoNome", {
                  required: "Nome do contato é obrigatório",
                })}
                type="text"
                placeholder="Nome da pessoa de contacto"
                labelPlacement="outside"
                isInvalid={!!errors.contatoNome}
                errorMessage={errors.contatoNome?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Cargo</p>
              <Input
                {...register("contatoCargo")}
                type="text"
                placeholder="Cargo/função"
                labelPlacement="outside"
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Telefone</p>
              <Input
                {...register("contatoTelefone", {
                  required: "Telefone é obrigatório",
                })}
                type="tel"
                placeholder="+258 84 123 4567"
                labelPlacement="outside"
                startContent={
                  <FiPhone className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                isInvalid={!!errors.contatoTelefone}
                errorMessage={errors.contatoTelefone?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Email</p>
              <Input
                {...register("contatoEmail", {
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                })}
                type="email"
                placeholder="contato@empresa.com"
                labelPlacement="outside"
                startContent={
                  <FiMail className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                isInvalid={!!errors.contatoEmail}
                errorMessage={errors.contatoEmail?.message}
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Departamento</p>
              <Input
                {...register("contatoDepartamento")}
                type="text"
                placeholder="Departamento"
                labelPlacement="outside"
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* Seção 4: Endereço */}
        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-300 mb-4 flex items-center gap-2">
            <FiHome className="text-lg" />
            Endereço
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <p className="text-sm">Rua/Avenida</p>
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
              <p className="text-sm">Bairro</p>
              <Input
                {...register("bairro")}
                type="text"
                placeholder="Nome do bairro"
                labelPlacement="outside"
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Cidade</p>
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
              <p className="text-sm">Província</p>
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
                  <SelectItem key={provincia} value={provincia} className="bg-orange-900">
                    {provincia}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Código Postal</p>
              <Input
                {...register("codigoPostal")}
                type="text"
                placeholder="Código postal"
                labelPlacement="outside"
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">País</p>
              <Input
                {...register("pais")}
                type="text"
                placeholder="Moçambique"
                labelPlacement="outside"
                defaultValue="Moçambique"
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* Seção 5: Dados Fiscais e Preferências */}
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2">
            <FiDollarSign className="text-lg" />
            Dados Fiscais e Preferências
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <p className="text-sm">Forma de Pagamento Preferida</p>
              <Select
                {...register("formaPagamento")}
                placeholder="Selecione a forma de pagamento"
                labelPlacement="outside"
                variant="bordered"
                fullWidth
                size="sm"
              >
                {formaPagamentoOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="bg-red-900">
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Prazo de Pagamento (dias)</p>
              <Input
                {...register("prazoPagamento", {
                  min: { value: 0, message: "Prazo deve ser positivo" },
                })}
                type="number"
                placeholder="30"
                labelPlacement="outside"
                variant="bordered"
                fullWidth
                size="sm"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Como nos conheceu?</p>
              <Select
                {...register("canalCaptacao", {
                  required: "Canal de captação é obrigatório",
                })}
                placeholder="Selecione o canal"
                labelPlacement="outside"
                variant="bordered"
                fullWidth
                size="sm"
                isInvalid={!!errors.canalCaptacao}
                errorMessage={errors.canalCaptacao?.message}
              >
                {canalCaptacaoOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="bg-red-900">
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <div className="flex flex-col">
              <p className="text-sm">Instruções Especiais (Opcional)</p>
              <Textarea
                {...register("instrucaoEspecial")}
                placeholder="Instruções especiais para entregas ou coletas..."
                labelPlacement="outside"
                variant="bordered"
                fullWidth
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Observações Gerais (Opcional)</p>
              <Textarea
                {...register("observacoes")}
                placeholder="Observações adicionais..."
                labelPlacement="outside"
                variant="bordered"
                fullWidth
              />
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-md font-medium mb-3">
              Preferências de Notificação
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Checkbox {...register("notificacoesEmail")} defaultSelected>
                Email
              </Checkbox>
              <Checkbox {...register("notificacoesSMS")} defaultSelected>
                SMS
              </Checkbox>
              <Checkbox
                {...register("notificacoesWhatsapp")}
                defaultSelected
              >
                WhatsApp
              </Checkbox>
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
            {isSubmitting ? "Enviando..." : "Solicitar Cadastro"}
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
                href="/login"
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