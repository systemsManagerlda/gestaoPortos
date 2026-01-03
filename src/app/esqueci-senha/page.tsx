/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Spinner,
  Alert,
  Divider,
} from "@nextui-org/react";
import { FiMail, FiArrowLeft, FiCheckCircle, FiKey, FiShield } from "react-icons/fi";
import { toast } from "react-toastify";

const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

interface ForgotPasswordFormInputs {
  email: string;
}

interface ResetPasswordFormInputs {
  code: string;
  newPassword: string;
  confirmPassword: string;
}

interface ApiResponse {
  returnCode: number;
  returnMsg: string;
  data?: any;
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "code" | "success">("email");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [userId, setUserId] = useState<string>("");
  const [alertType, setAlertType] = useState<"success" | "danger">("success");
  const [showAlert, setShowAlert] = useState(false);
  const [userName, setUserName] = useState<string>("");

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
  } = useForm<ForgotPasswordFormInputs>();

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: resetErrors },
    watch,
  } = useForm<ResetPasswordFormInputs>();

  // Função para verificar se email existe
  const verificarEmail = async (email: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/verificar-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data: ApiResponse = await response.json();
      
      if (!response.ok || data.returnCode !== 200) {
        throw new Error(data.returnMsg || "Erro ao verificar email");
      }

      return data.data;
    } catch (error) {
      console.error("Erro ao verificar email:", error);
      throw error;
    }
  };

   // Função para solicitar código de recuperação
  const solicitarCodigoRecuperacao = async (email: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/solicitar-codigo-recuperacao`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data: ApiResponse = await response.json();
      
      if (!response.ok || data.returnCode !== 200) {
        throw new Error(data.returnMsg || "Erro ao solicitar código");
      }

      return data.data;
    } catch (error) {
      console.error("Erro ao solicitar código:", error);
      throw error;
    }
  };

   // Função para verificar código
  const verificarCodigoRecuperacao = async (userId: string, codigo: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/verificar-codigo-recuperacao`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, codigo }),
      });

      const data: ApiResponse = await response.json();
      
      if (!response.ok || data.returnCode !== 200) {
        throw new Error(data.returnMsg || "Erro ao verificar código");
      }

      return data.data;
    } catch (error) {
      console.error("Erro ao verificar código:", error);
      throw error;
    }
  };


   // Função para redefinir senha
  const redefinirSenha = async (userId: string, codigo: string, novaSenha: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/redefinir-senha`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, codigo, novaSenha }),
      });

      const data: ApiResponse = await response.json();
      
      if (!response.ok || data.returnCode !== 200) {
        throw new Error(data.returnMsg || "Erro ao redefinir senha");
      }

      return data;
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      throw error;
    }
  };

   const onSubmitEmail: SubmitHandler<ForgotPasswordFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      // Primeiro verificar se o email existe
      const emailInfo = await verificarEmail(data.email);
      
      // Se chegou aqui, o email existe, agora solicitar código
      const codigoInfo = await solicitarCodigoRecuperacao(data.email);
      
      // Usar as informações retornadas
      setUserId(codigoInfo?.userId || emailInfo?.userId);
      setEmail(codigoInfo?.email || data.email);
      setUserName(codigoInfo?.nome || emailInfo?.nome);
      setStep("code");
      
      toast.success("Código de verificação enviado para seu email! Verifique sua caixa de entrada.");
    } catch (error: any) {
      console.error("Erro:", error);
      
      // Mensagens de erro mais amigáveis
      const errorMessage = error.message || "Erro ao processar sua solicitação";
      
      if (errorMessage.includes("429")) {
        toast.error("Muitas solicitações. Tente novamente mais tarde.");
      } else if (errorMessage.includes("404") || errorMessage.includes("não encontrado")) {
        toast.error("Email não encontrado no sistema. Verifique se digitou corretamente.");
      } else if (errorMessage.includes("500")) {
        toast.error("Erro no servidor. Tente novamente em alguns minutos.");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };


  const onSubmitReset: SubmitHandler<ResetPasswordFormInputs> = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    if (data.newPassword.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setIsLoading(true);
    try {
      // Verificar o código
      const codigoValido = await verificarCodigoRecuperacao(userId, data.code);
      
      if (!codigoValido || !codigoValido.valido) {
        toast.error("Código de verificação inválido ou expirado.");
        return;
      }

      // Redefinir senha
      await redefinirSenha(userId, data.code, data.newPassword);

      setStep("success");
      toast.success("Senha redefinida com sucesso!");
      
      // Redirecionar para login após 3 segundos
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error: any) {
      console.error("Erro:", error);
      
      const errorMessage = error.message || "Erro ao processar sua solicitação";
      
      if (errorMessage.includes("expirou") || errorMessage.includes("expirado")) {
        toast.error("Código expirado. Solicite um novo código.");
      } else if (errorMessage.includes("incorreto")) {
        toast.error("Código incorreto.");
      } else if (errorMessage.includes("Muitas tentativas")) {
        toast.error("Muitas tentativas incorretas. Tente novamente mais tarde.");
      } else if (errorMessage.includes("500")) {
        toast.error("Erro no servidor. Tente novamente em alguns minutos.");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };


  const handleBackToLogin = () => {
    router.push("/login");
  };

   const handleResendCode = async () => {
    if (!email) {
      toast.error("Email não encontrado. Volte para a etapa anterior.");
      return;
    }

    setIsLoading(true);
    try {
      // Solicitar novo código
      await solicitarCodigoRecuperacao(email);
      
      toast.success("Novo código enviado para seu email!");
    } catch (error: any) {
      console.error("Erro:", error);
      
      const errorMessage = error.message || "Erro ao processar sua solicitação";
      
      if (errorMessage.includes("429")) {
        toast.error("Muitas solicitações. Tente novamente mais tarde.");
      } else if (errorMessage.includes("500")) {
        toast.error("Erro no servidor. Tente novamente em alguns minutos.");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 px-4 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-20 dark:opacity-10"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-200 rounded-full filter blur-3xl opacity-20 dark:opacity-10"></div>
      
      <Card className="w-full max-w-md border border-gray-200/70 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/60 backdrop-blur-xl shadow-2xl z-10">
        <CardHeader className="flex flex-col items-center pt-10 px-8 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl">
                <FiKey className="text-2xl text-white" />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Redefinir Senha
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Mega Logística</p>
            </div>
          </div>

          {/* Indicador de progresso */}
          <div className="flex items-center justify-center w-full mb-6">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === "email" 
                  ? "bg-blue-600 text-white" 
                  : step === "code" || step === "success"
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500"
              }`}>
                1
              </div>
              <div className={`w-12 h-1 mx-2 ${
                step === "code" || step === "success" ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
              }`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === "code" 
                  ? "bg-blue-600 text-white" 
                  : step === "success"
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500"
              }`}>
                2
              </div>
              <div className={`w-12 h-1 mx-2 ${
                step === "success" ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
              }`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === "success" 
                  ? "bg-green-500 text-white" 
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500"
              }`}>
                <FiCheckCircle className="text-sm" />
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            {step === "email" && "Digite seu email para receber o código de verificação"}
            {step === "code" && userName && `Digite o código enviado para ${userName} (${email})`}
            {step === "code" && !userName && `Digite o código enviado para ${email}`}
            {step === "success" && "Senha redefinida com sucesso!"}
          </p>
        </CardHeader>

        <CardBody className="px-8 py-6">
          {/* Alert (mantido para compatibilidade) */}
          {showAlert && (
            <Alert
              color={alertType}
              variant="flat"
              className="mb-6"
              onClose={() => setShowAlert(false)}
            >
              <span className="text-sm">{alertMessage}</span>
            </Alert>
          )}

          {/* Step 1: Email */}
          {step === "email" && (
            <form onSubmit={handleSubmitEmail(onSubmitEmail)} className="space-y-6">
              <Input
                {...registerEmail("email", {
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Por favor, insira um email válido",
                  },
                })}
                type="email"
                placeholder="seu@email.com"
                labelPlacement="outside"
                startContent={
                  <FiMail className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                isInvalid={!!emailErrors.email}
                errorMessage={emailErrors.email?.message}
                variant="bordered"
                fullWidth
                size="lg"
                classNames={{
                  label: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                  input: "text-base",
                  inputWrapper: "h-12 bg-transparent dark:bg-transparent",
                }}
                autoComplete="email"
                disabled={isLoading}
              />

              <Button
                type="submit"
                color="primary"
                size="lg"
                fullWidth
                radius="md"
                isLoading={isLoading}
                spinner={<Spinner size="sm" color="white" />}
                className="h-12 bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-200 font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Enviar Código"}
              </Button>
            </form>
          )}

          {/* Step 2: Código e Nova Senha */}
          {step === "code" && (
            <form onSubmit={handleSubmitReset(onSubmitReset)} className="space-y-6">
              <Input
                {...registerReset("code", {
                  required: "Código de verificação é obrigatório",
                  minLength: {
                    value: 6,
                    message: "O código deve ter 6 dígitos",
                  },
                  maxLength: {
                    value: 6,
                    message: "O código deve ter 6 dígitos",
                  },
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Digite apenas números"
                  }
                })}
                type="text"
                placeholder="000000"
                labelPlacement="outside"
                startContent={
                  <FiShield className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                isInvalid={!!resetErrors.code}
                errorMessage={resetErrors.code?.message}
                variant="bordered"
                fullWidth
                size="lg"
                maxLength={6}
                inputMode="numeric"
                classNames={{
                  label: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                  input: "text-base text-center tracking-widest",
                  inputWrapper: "h-12 bg-transparent dark:bg-transparent",
                }}
                disabled={isLoading}
              />

              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Código válido por 15 minutos
                </p>
                <Button
                  variant="light"
                  size="sm"
                  onPress={handleResendCode}
                  isLoading={isLoading}
                  className="text-blue-600 dark:text-blue-400 text-sm"
                  disabled={isLoading}
                >
                  Reenviar código
                </Button>
              </div>

              <Input
                {...registerReset("newPassword", {
                  required: "Nova senha é obrigatória",
                  minLength: {
                    value: 6,
                    message: "A senha deve ter pelo menos 6 caracteres",
                  },
                })}
                type="password"
                placeholder="Digite sua nova senha"
                labelPlacement="outside"
                isInvalid={!!resetErrors.newPassword}
                errorMessage={resetErrors.newPassword?.message}
                variant="bordered"
                fullWidth
                size="lg"
                classNames={{
                  label: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                  input: "text-base",
                  inputWrapper: "h-12 bg-transparent dark:bg-transparent",
                }}
                disabled={isLoading}
              />

              <Input
                {...registerReset("confirmPassword", {
                  required: "Confirme sua senha",
                  validate: value => 
                    value === watch("newPassword") || "As senhas não coincidem"
                })}
                type="password"
                placeholder="Confirme sua nova senha"
                labelPlacement="outside"
                isInvalid={!!resetErrors.confirmPassword}
                errorMessage={resetErrors.confirmPassword?.message}
                variant="bordered"
                fullWidth
                size="lg"
                classNames={{
                  label: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                  input: "text-base",
                  inputWrapper: "h-12 bg-transparent dark:bg-transparent",
                }}
                disabled={isLoading}
              />

              <Button
                type="submit"
                color="primary"
                size="lg"
                fullWidth
                radius="md"
                isLoading={isLoading}
                spinner={<Spinner size="sm" color="white" />}
                className="h-12 bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-200 font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Redefinindo..." : "Redefinir Senha"}
              </Button>
            </form>
          )}

          {/* Step 3: Sucesso */}
          {step === "success" && (
            <div className="text-center space-y-6 py-4">
              <div className="flex justify-center">
                <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <FiCheckCircle className="text-4xl text-green-600 dark:text-green-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Senha Redefinida!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Sua senha foi redefinida com sucesso. Redirecionando para login...
                </p>
              </div>

              <Button
                onPress={handleBackToLogin}
                color="primary"
                size="lg"
                fullWidth
                radius="md"
                className="h-12 bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-200 font-semibold"
              >
                Voltar para o Login
              </Button>
            </div>
          )}

          <Divider className="my-6" />

          {/* Dicas de segurança */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
            <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
              <FiShield className="text-blue-600" />
              Dicas de Segurança
            </h4>
            <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
              <li>• Use uma senha forte com letras, números e símbolos</li>
              <li>• Não compartilhe sua senha com ninguém</li>
              <li>• O código de verificação é válido por apenas 15 minutos</li>
              <li>• Se não receber o email, verifique sua pasta de spam</li>
              <li>• Você tem 3 tentativas para digitar o código corretamente</li>
            </ul>
          </div>
        </CardBody>

        <CardFooter className="flex justify-center pb-8 pt-4">
          <Button
            variant="light"
            onPress={handleBackToLogin}
            startContent={<FiArrowLeft className="text-lg" />}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            disabled={isLoading}
          >
            Voltar para o Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}