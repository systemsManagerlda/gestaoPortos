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

interface ForgotPasswordFormInputs {
  email: string;
}

interface ResetPasswordFormInputs {
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "code" | "success">("email");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "danger">("success");

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

  const showAlertMessage = (message: string, type: "success" | "danger" = "danger") => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const onSubmitEmail: SubmitHandler<ForgotPasswordFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      // Simulação de envio de email
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setEmail(data.email);
      setStep("code");
      showAlertMessage("Código de verificação enviado para seu email!", "success");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showAlertMessage("Erro ao enviar código. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitReset: SubmitHandler<ResetPasswordFormInputs> = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      showAlertMessage("As senhas não coincidem.");
      return;
    }

    setIsLoading(true);
    try {
      // Simulação de redefinição de senha
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStep("success");
      showAlertMessage("Senha redefinida com sucesso!", "success");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showAlertMessage("Erro ao redefinir senha. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      showAlertMessage("Código reenviado com sucesso!", "success");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showAlertMessage("Erro ao reenviar código.");
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
            {step === "code" && `Digite o código enviado para ${email}`}
            {step === "success" && "Senha redefinida com sucesso!"}
          </p>
        </CardHeader>

        <CardBody className="px-8 py-6">
          {/* Alert */}
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
                // label="Email cadastrado"
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
                })}
                type="text"
                // label="Código de Verificação"
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
                classNames={{
                  label: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                  input: "text-base text-center tracking-widest",
                  inputWrapper: "h-12 bg-transparent dark:bg-transparent",
                }}
              />

              <div className="flex justify-end">
                <Button
                  variant="light"
                  size="sm"
                  onPress={handleResendCode}
                  isLoading={isLoading}
                  className="text-blue-600 dark:text-blue-400 text-sm"
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
                label="Nova Senha"
                // placeholder="••••••••"
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
              />

              <Input
                {...registerReset("confirmPassword", {
                  required: "Confirme sua senha",
                  validate: value => 
                    value === watch("newPassword") || "As senhas não coincidem"
                })}
                type="password"
                // label="Confirmar Nova Senha"
                placeholder="••••••••"
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
                  Sua senha foi redefinida com sucesso. Agora você pode fazer login com sua nova senha.
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
              <li>• Use uma senha com letras, números e símbolos</li>
              <li>• Não compartilhe sua senha com ninguém</li>
              <li>• Alterne sua senha periodicamente</li>
            </ul>
          </div>
        </CardBody>

        <CardFooter className="flex justify-center pb-8 pt-4">
          <Button
            variant="light"
            onPress={handleBackToLogin}
            startContent={<FiArrowLeft className="text-lg" />}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            Voltar para o Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}