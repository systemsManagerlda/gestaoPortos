"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
// import { FaGoogle, FaGithub } from "react-icons/fa";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const { user, login, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    login(data.email, data.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 px-4">
      <Card className="w-full max-w-md border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/50 backdrop-blur-md shadow-2xl">
        <CardHeader className="flex flex-col items-center pt-10 px-10 pb-4">
          <Image
            src="/image/megaCentroLogistica.png"
            alt="Logotipo"
            width={64}
            height={64}
            className="mb-3"
          />
          <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Bem-vindo de volta
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 text-center">
            Acesse sua conta para continuar
          </p>
        </CardHeader>

        <CardBody className="px-8 py-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              {...register("email", {
                required: "Email é obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
              type="email"
              label=""
              placeholder="seu@email.com"
              labelPlacement="outside"
              startContent={
                <FiMail className="text-xl text-white dark:text-white" />
              }
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              variant="underlined"
              fullWidth
              classNames={{
                label: "text-sm font-medium text-gray-700 dark:text-gray-300",
                input: "text-base",
                innerWrapper: "flex items-center gap-2", // garante espaçamento e alinhamento horizontal
              }}
            />
            <Input
              {...register("password", {
                required: "Senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "Mínimo de 6 caracteres",
                },
              })}
              type="password"
              label=""
              placeholder="••••••••"
              labelPlacement="outside"
              startContent={
                <FiLock className="text-xl text-white dark:text-white" />
              }
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              variant="underlined"
              fullWidth
              classNames={{
                label: "text-sm font-medium text-gray-700 dark:text-gray-300",
                input: "text-base",
                innerWrapper: "flex items-center gap-2", // garante alinhamento e espaçamento horizontal
              }}
            />

            <div className="flex justify-end pt-1">
              <Link
                href="#"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <Button
              type="submit"
              color="primary"
              size="lg"
              fullWidth
              radius="sm"
              isLoading={status === "loading"}
              className="mt-6 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 shadow-md hover:shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              {status === "loading" ? "Entrando..." : "Entrar na Plataforma"}
              <FiLogIn className="text-white" />
            </Button>
          </form>

          <Divider className="my-8" />

          {/* <div className="space-y-3">
            <Button
              variant="bordered"
              startContent={<FaGoogle className="text-red-500" />}
              fullWidth
              className="h-11 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition"
            >
              Entrar com Google
            </Button>
            <Button
              variant="bordered"
              startContent={
                <FaGithub className="text-gray-800 dark:text-gray-200" />
              }
              fullWidth
              className="h-11 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition"
            >
              Entrar com GitHub
            </Button>
          </div> */}
        </CardBody>

        <CardFooter className="flex justify-center pb-8 pt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Não tem conta?{" "}
            <Link
              href="/register"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Cadastre-se
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
