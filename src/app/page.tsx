"use client";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { FiTruck, FiLogIn, FiUserPlus, FiBarChart2, FiSettings } from "react-icons/fi";
import { FaWarehouse } from "react-icons/fa";
import { GiCargoShip } from "react-icons/gi";

export default function Home() {
  const features = [
    { icon: <GiCargoShip className="text-3xl" />, text: "Controle de Navios", color: "text-blue-500" },
    { icon: <FaWarehouse className="text-3xl" />, text: "Gestão de Armazéns", color: "text-cyan-500" },
    { icon: <FiTruck className="text-3xl" />, text: "Rastreio de Cargas", color: "text-emerald-500" },
    { icon: <FiBarChart2 className="text-3xl" />, text: "Relatórios em Tempo Real", color: "text-purple-500" },
    { icon: <FiSettings className="text-3xl" />, text: "Sistema Integrado", color: "text-amber-500" },
    { icon: <FiUserPlus className="text-3xl" />, text: "Gestão de Clientes", color: "text-pink-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/80 via-white to-cyan-50/80 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/80 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-30 dark:opacity-20"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-200 rounded-full filter blur-3xl opacity-30 dark:opacity-20"></div>
      
      <Card className="w-full max-w-4xl shadow-xl border-none bg-background/70 dark:bg-default-100/50 backdrop-blur-sm z-10">
        <CardBody className="flex flex-col items-center px-10 py-12 gap-6">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 mb-2">
              <GiCargoShip className="text-5xl text-blue-600 dark:text-blue-400" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                PortChain
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl">
              Plataforma inteligente para gestão portuária integrada e operações logísticas
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 my-8 w-full">
            {features.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className={`${item.color} mb-3 p-3 rounded-full bg-opacity-10 dark:bg-opacity-20`}>
                  {item.icon}
                </div>
                <span className="text-sm font-semibold text-center text-gray-700 dark:text-gray-300">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </CardBody>

        <CardFooter className="flex flex-col md:flex-row justify-center gap-4 p-8 pt-0 bg-transparent">
          <Button
            as={Link}
            href="/login"
            color="primary"
            startContent={<FiLogIn className="text-white text-lg" />}
            className="font-medium w-full md:w-auto text-white flex items-center gap-2 h-14 px-8"
            size="lg"
            radius="sm"
          >
            Acessar Plataforma
          </Button>
          <Button
            as={Link}
            href="/register"
            variant="flat"
            startContent={
              <FiUserPlus className="text-blue-600 dark:text-blue-400 text-lg" />
            }
            className="font-medium w-full md:w-auto text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700/50 flex items-center gap-2 h-14 px-8"
            size="lg"
            radius="sm"
          >
            Solicitar Acesso
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-10 text-sm text-gray-500 dark:text-gray-400 text-center z-10">
        <p>
          © {new Date().getFullYear()} PortChain - Todos os direitos reservados
        </p>
        <p className="mt-1 flex items-center justify-center gap-2">
          <span>v2.0.0</span>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
            Termos de Serviço
          </Link>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
            Política de Privacidade
          </Link>
        </p>
      </div>
    </div>
  );
}