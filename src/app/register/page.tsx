"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardBody,
//   CardFooter,
  Input,
  Button,
  Link,
  Divider,
  Image
} from "@nextui-org/react";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
// import { FaGoogle, FaGithub } from "react-icons/fa";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  const onSubmit = (data: FormData) => {
    alert(`Registro demo não implementado. Email: ${data.email}`);
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 p-4">
      <Card className="w-full max-w-md border-none bg-background/60 dark:bg-default-100/50 backdrop-blur-sm shadow-xl">
        <CardHeader className="flex flex-col items-center pt-10 px-10 pb-0">
           <Image
            src="/image/megaCentroLogistica.png"
            alt="Logotipo"
            width={64}
            height={64}
            className="mb-3"
          />
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Criar Conta
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            Junte-se à nossa plataforma de gestão portuária
          </p>
        </CardHeader>

        <CardBody className="px-10 py-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              {...register("name", {
                required: "Nome completo é obrigatório",
                minLength: {
                  value: 3,
                  message: "Nome deve ter pelo menos 3 caracteres",
                },
              })}
              type="text"
              label="" // sem label visível
              placeholder="Seu nome completo"
              labelPlacement="outside"
              startContent={<FiUser className="text-xl text-default-400" />}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
              variant="bordered"
              classNames={{
                label: "text-sm font-medium text-gray-700 dark:text-gray-300",
                input: "text-base",
                innerWrapper: "flex items-center gap-2", // alinhar horizontalmente e espaçar
              }}
              fullWidth
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
              label="" // sem label visível
              placeholder="seu@email.com"
              labelPlacement="outside"
              startContent={<FiMail className="text-xl text-default-400" />}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              variant="bordered"
              classNames={{
                label: "text-sm font-medium text-gray-700 dark:text-gray-300",
                input: "text-base",
                innerWrapper: "flex items-center gap-2", // alinhamento horizontal e espaçamento
              }}
              fullWidth
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
              label=""
              placeholder="••••••••"
              labelPlacement="outside"
              startContent={<FiLock className="text-xl text-default-400" />}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              variant="bordered"
              classNames={{
                label: "text-sm font-medium text-gray-700 dark:text-gray-300",
                input: "text-base",
                innerWrapper: "flex items-center gap-2", // alinhamento horizontal e espaçamento
              }}
              fullWidth
            />

            <Button
              type="submit"
              color="primary"
              size="lg"
              radius="sm"
              fullWidth
              className="mt-6 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              endContent={<FiArrowRight className="text-white" />}
            >
              Criar Conta
            </Button>
          </form>

          <Divider className="my-6 bg-gray-200 dark:bg-gray-700" />

          <div className="flex justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Já possui uma conta?{" "}
              <Link
                href="/login"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Faça login
              </Link>
            </p>
          </div>
        </CardBody>

        {/* <CardFooter className="flex flex-col items-center pb-8 pt-0">
          <Divider className="mb-6 bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-3 w-full">
            <Button
              variant="bordered"
              startContent={<FaGoogle className="text-red-500" />}
              fullWidth
              className="text-gray-700 dark:text-gray-300 h-11 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              Registrar com Google
            </Button>
            <Button
              variant="bordered"
              startContent={
                <FaGithub className="text-gray-800 dark:text-gray-300" />
              }
              fullWidth
              className="text-gray-700 dark:text-gray-300 h-11 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              Registrar com GitHub
            </Button>
          </div>
        </CardFooter> */}
      </Card>
    </div>
  );
}
