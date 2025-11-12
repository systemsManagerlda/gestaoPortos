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
  FiMail,
  FiLock,
  FiLogIn,
  FiEye,
  FiEyeOff,
  FiTruck,
} from "react-icons/fi";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<LoginFormInputs>();

  const { user, login, status, error, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (!authLoading && user && !isRedirecting) {
      setIsRedirecting(true);
      console.log("Usuário autenticado, redirecionando...");
      router.push("/dashboard");
    }
  }, [user, authLoading, router, isRedirecting]);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
      const timer = setTimeout(() => setShowAlert(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const success = await login(data.email, data.password);
    if (success) {
      // O redirecionamento será feito pelo useEffect acima
      console.log("Login bem-sucedido, aguardando redirecionamento...");
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Mostrar loading enquanto verifica autenticação
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Se já estiver autenticado, mostrar loading de redirecionamento
  if (user && !isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">
            Redirecionando para o dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Credenciais de demonstração
  const demoCredentials = [
    { email: "admin@mega.co.mz", password: "123456", role: "Administrador" },
    { email: "cliente@empresa.co.mz", password: "123456", role: "Cliente" },
    {
      email: "transportador@empresa.co.mz",
      password: "123456",
      role: "Transportador",
    },
  ];

  const fillDemoCredentials = (email: string, password: string) => {
    // Implementação para preencher credenciais...
    const emailInput = document.querySelector(
      'input[type="email"]'
    ) as HTMLInputElement;
    const passwordInput = document.querySelector(
      'input[type="password"]'
    ) as HTMLInputElement;

    if (emailInput) emailInput.value = email;
    if (passwordInput) passwordInput.value = password;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 px-4 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-20 dark:opacity-10"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-200 rounded-full filter blur-3xl opacity-20 dark:opacity-10"></div>

      <Card className="w-full max-w-md border border-gray-200/70 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/60 backdrop-blur-xl shadow-2xl z-10">
        <CardHeader className="flex flex-col items-center pt-12 px-10 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <FiTruck className="text-4xl text-blue-600 dark:text-blue-400" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Mega Logística
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Porto da Beira
              </p>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center">
            Acesso à Plataforma
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            Entre com suas credenciais para continuar
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
              <span className="text-sm">{error}</span>
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
              // label="Email"
              placeholder="seu@email.com"
              labelPlacement="outside"
              startContent={
                <FiMail className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
              }
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
              // label="Senha"
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
                href="/esqueci-senha"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors"
              >
                Esqueceu a senha?
              </Link>
              <Link
                href="/suporte"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Precisa de ajuda?
              </Link>
            </div>

            <Button
              type="submit"
              color="primary"
              size="lg"
              fullWidth
              radius="md"
              isLoading={status === "loading"}
              spinner={<Spinner size="sm" color="white" />}
              className="mt-4 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-200 font-semibold"
            >
              {status === "loading" ? (
                "Entrando..."
              ) : (
                <div className="flex items-center gap-2">
                  <FiLogIn className="text-lg" />
                  Entrar na Plataforma
                </div>
              )}
            </Button>
          </form>

          <Divider className="my-8" />

          {/* Credenciais de demonstração */}
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Credenciais de Demonstração
            </p>
            <div className="grid grid-cols-1 gap-2">
              {demoCredentials.map((cred, index) => (
                <Button
                  key={index}
                  variant="flat"
                  size="sm"
                  onPress={() => fillDemoCredentials(cred.email, cred.password)}
                  className="justify-start text-xs h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <div className="text-left">
                    <div className="font-medium">{cred.role}</div>
                    <div className="text-gray-500">{cred.email}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </CardBody>

        <CardFooter className="flex justify-center pb-10 pt-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-b-lg">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Não tem conta corporativa?
            </p>
            <Button
              as={Link}
              href="/register"
              variant="flat"
              className="text-blue-600 dark:text-blue-400 border-2 border-blue-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700/50 font-medium"
              size="sm"
            >
              Solicitar Cadastro
            </Button>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
              © {new Date().getFullYear()} Mega Centro de Logística
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
