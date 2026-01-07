"use client";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Button,
} from "@nextui-org/react";
import { FiTruck, FiUser, FiPackage } from "react-icons/fi";
import { useState } from "react";
import RegisterForm from "./RegisterPage";
import RegisterFormTransportadora from "./RegisterFormTransportadora";

export default function RegisterPage() {
  const [selectedForm, setSelectedForm] = useState<"cliente" | "transportadora">("cliente");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 px-4 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-20 dark:opacity-10"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-200 rounded-full filter blur-3xl opacity-20 dark:opacity-10"></div>

      <Card className="w-full max-w-4xl border border-gray-200/70 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/60 backdrop-blur-xl shadow-2xl z-10">
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
            Solicitar Cadastro
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            Preencha os dados para solicitar acesso à plataforma
          </p>
        </CardHeader>

        {/* Seletor de Tipo de Cadastro */}
        <div className="px-8 pt-4">
          <div className="flex gap-4 justify-center">
            <Button
              className={`flex-1 max-w-xs ${
                selectedForm === "cliente"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
              startContent={<FiUser className="text-lg" />}
              onPress={() => setSelectedForm("cliente")}
              radius="lg"
            >
              Cliente
            </Button>
            <Button
              className={`flex-1 max-w-xs ${
                selectedForm === "transportadora"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
              startContent={<FiPackage className="text-lg" />}
              onPress={() => setSelectedForm("transportadora")}
              radius="lg"
            >
              Transportadora
            </Button>
          </div>
        </div>

        <CardBody className="px-8 py-6 max-h-[80vh] overflow-y-auto">
          {selectedForm === "cliente" ? (
            <RegisterForm 
              onSuccess={() => console.log("Sucesso!")}
              onCancel={() => console.log("Cancelado")}
              showLoginLink={true}
            />
          ) : (
            <RegisterFormTransportadora
              onSuccess={() => console.log("Sucesso Transportadora!")}
              onCancel={() => console.log("Cancelado")}
              showLoginLink={true}
            />
          )}
          <Divider className="my-8" />
        </CardBody>

        <CardFooter className="flex justify-center pb-8 pt-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-b-lg">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              © {new Date().getFullYear()} Mega Centro de Logística - Porto da
              Beira
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
              Seu cadastro será analisado pela nossa equipe
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}