"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Divider,
  Link,
  Spinner,
  Alert,
} from "@nextui-org/react";
import {
  FiLogIn,
  FiEye,
  FiEyeOff,
  FiTruck,
  FiUser,
} from "react-icons/fi";
import { toast } from "react-toastify";

// URL base da API - mesma do registro

interface LoginTransportadoraFormInputs {
  email: string;
  password: string;
}

export default function LoginTransportadoraPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
  } = useForm<LoginTransportadoraFormInputs>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    user,
    loginTransportadora,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    status,
    error,
    isLoading: authLoading,
  } = useAuth();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (!authLoading && user && !isRedirecting) {
      setIsRedirecting(true);
      console.log("Transportadora autenticada, redirecionando...");
      router.push("/dashboard/transportador");
    }
  }, [user, authLoading, router, isRedirecting]);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
      const timer = setTimeout(() => setShowAlert(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const onSubmit: SubmitHandler<LoginTransportadoraFormInputs> = async (data) => {
  setIsSubmitting(true);

  try {
    console.log("Iniciando login da transportadora:", data.email);

    // Use apenas a função do contexto - ela já faz a chamada API corretamente
    const success = await loginTransportadora(data.email, data.password);
    
    if (success) {
      console.log("Login bem-sucedido via contexto");
      // O redirecionamento será feito pelo useEffect automaticamente
    } else {
      console.log("Login falhou no contexto");
      // O erro já foi mostrado pelo contexto, não precisa mostrar aqui
    }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Erro inesperado no login:", error);
    // Esta parte não deve ser alcançada normalmente
  } finally {
    setIsSubmitting(false);
  }
};

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Credenciais de demonstração para transportadoras
  const demoCredentials = [
    {
      email: "transportadora@exemplo.co.mz",
      password: "123456",
      role: "Transportadora",
      description: "Acesso à plataforma de transportadoras",
    },
    {
      email: "logistica@empresa.co.mz",
      password: "123456",
      role: "Transportadora Premium",
      description: "Gestão completa de frota",
    },
  ];

  const fillDemoCredentials = (email: string, password: string) => {
    setValue("email", email);
    setValue("password", password);
    toast.info(`Credenciais preenchidas: ${email}`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // Mostrar loading enquanto verifica autenticação
  if (authLoading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-orange-900">
        <div className="text-center">
          <Spinner size="lg" className="mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Verificando autenticação...
          </p>
        </div>
      </div>
    );
  }

  // Se já estiver autenticado, mostrar loading de redirecionamento
  if (user && !isRedirecting) {
    const getUserDisplayName = () => {
      if ("nomeEmpresa" in user) {
        return user.nomeEmpresa || "Transportadora";
      } else if ("nome" in user) {
        return user.nome || "Usuário";
      }
      return "Usuário";
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-orange-900">
        <div className="text-center">
          <Spinner size="lg" className="mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Redirecionando para o dashboard...
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Bem-vindo, {getUserDisplayName()}!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-orange-900 px-4 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-200 rounded-full filter blur-3xl opacity-20 dark:opacity-10"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-200 rounded-full filter blur-3xl opacity-20 dark:opacity-10"></div>

      <Card className="w-full max-w-md border border-gray-200/70 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/60 backdrop-blur-xl shadow-2xl z-10">
        <CardHeader className="flex flex-col items-center pt-12 px-10 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <FiTruck className="text-4xl text-orange-600 dark:text-orange-400" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Transportadoras
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Portal de Acesso
              </p>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center">
            Login da Transportadora
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            Acesse sua conta para gerenciar seus serviços
          </p>
        </CardHeader>

        <CardBody className="px-8 py-6">
          {/* Alert de erro */}
          {showAlert && error && (
            <Alert
              color="danger"
              variant="flat"
              className="mb-6"
              onClose={() => setShowAlert(false)}
            >
              <div className="flex items-center gap-2">
                <FiUser className="text-lg" />
                <span className="text-sm">{error}</span>
              </div>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              {...register("email", {
                required: "Email é obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Por favor, insira um email válido",
                },
              })}
              type="email"
              placeholder="sua@transportadora.com"
              labelPlacement="outside"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              variant="bordered"
              fullWidth
              size="lg"
              classNames={{
                label:
                  "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                input: "text-base",
                inputWrapper: "h-12 bg-transparent dark:bg-transparent",
              }}
              autoComplete="email"
            />

            <Input
              {...register("password", {
                required: "Senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "A senha deve ter pelo menos 6 caracteres",
                },
              })}
              type={isVisible ? "text" : "password"} 
              placeholder="••••••••"
              labelPlacement="outside"
              endContent={
                <button
                  className="focus:outline-none transition-colors hover:text-default-600"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label={isVisible ? "Ocultar senha" : "Mostrar senha"}
                >
                  {isVisible ? (
                    <FiEyeOff className="text-xl text-default-400 pointer-events-none" />
                  ) : (
                    <FiEye className="text-xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              variant="bordered"
              fullWidth
              size="lg"
              classNames={{
                label:
                  "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                input: "text-base",
                inputWrapper: "h-12 bg-transparent dark:bg-transparent",
              }}
              autoComplete="current-password"
            />

            <div className="flex justify-between items-center pt-2">
              <Link
                href="/esqueci-senha-transportadora"
                className="text-sm text-orange-600 dark:text-orange-400 hover:underline transition-colors"
              >
                Esqueceu a senha?
              </Link>
              <Link
                href="/login"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Sou Cliente
              </Link>
            </div>

            <Button
              type="submit"
              color="primary"
              size="lg"
              fullWidth
              radius="md"
              isLoading={isSubmitting}
              spinner={<Spinner size="sm" color="white" />}
              className="mt-4 h-12 bg-gradient-to-r from-orange-600 to-amber-600 shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-200 font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Entrando..."
              ) : (
                <div className="flex items-center gap-2">
                  <FiLogIn className="text-lg" />
                  Acessar Plataforma
                </div>
              )}
            </Button>
          </form>

          <Divider className="my-8" />

          {/* Credenciais de demonstração - DESCOMENTE PARA TESTAR */}
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Credenciais de Teste
            </p>
            <div className="grid grid-cols-1 gap-2">
              {demoCredentials.map((cred, index) => (
                <Button
                  key={index}
                  variant="flat"
                  size="sm"
                  onPress={() => fillDemoCredentials(cred.email, cred.password)}
                  className="justify-start h-12 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  startContent={<FiUser className="text-default-500" />}
                >
                  <div className="text-left flex-1">
                    <div className="font-medium text-sm">{cred.role}</div>
                    <div className="text-gray-500 text-xs truncate">
                      {cred.email}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
              Use para testes (senha: 123456)
            </p>
          </div>
        </CardBody>

        <CardFooter className="flex justify-center pb-10 pt-6 bg-gradient-to-r from-gray-50 to-orange-50 dark:from-gray-800 dark:to-orange-900/20 rounded-b-lg">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Não tem conta de transportadora?
            </p>
            <Button
              as={Link}
              href="/register-transportadora"
              variant="flat"
              className="text-orange-600 dark:text-orange-400 border-2 border-orange-200 dark:border-gray-600 hover:bg-orange-50 dark:hover:bg-gray-700/50 font-medium"
              size="sm"
            >
              Cadastrar Transportadora
            </Button>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
              © {new Date().getFullYear()} Portal de Transportadoras
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
