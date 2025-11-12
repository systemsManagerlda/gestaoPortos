"use client";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { 
  FiTruck, 
  FiLogIn, 
  FiUserPlus, 
  FiSettings, 
  FiMapPin, 
  FiDollarSign, 
  FiShield,
  FiPackage,
  FiClipboard,
  FiNavigation
} from "react-icons/fi";
import { FaWarehouse, FaShippingFast, FaPassport } from "react-icons/fa";
import { GiCargoShip } from "react-icons/gi";
import { MdOutlineSupportAgent, MdLocalShipping } from "react-icons/md";

export default function Home() {
  const features = [
    { icon: <GiCargoShip className="text-3xl" />, text: "Operações Portuárias", color: "text-blue-500", desc: "Gestão integrada do Porto da Beira" },
    { icon: <GiCargoShip className="text-3xl" />, text: "Despacho Aduaneiro", color: "text-cyan-500", desc: "Processos ágeis e transparentes" },
    { icon: <FiTruck className="text-3xl" />, text: "Transporte Multimodal", color: "text-emerald-500", desc: "Local, nacional e em trânsito" },
    { icon: <FiNavigation className="text-3xl" />, text: "Rastreio GPS", color: "text-purple-500", desc: "Monitoramento em tempo real" },
    { icon: <FiShield className="text-3xl" />, text: "Cargas Seguras", color: "text-amber-500", desc: "Seguro e monitoramento 24/7" },
    { icon: <MdOutlineSupportAgent className="text-3xl" />, text: "Serviços Integrados", color: "text-pink-500", desc: "Solução completa em logística" },
  ];

  const stats = [
    { value: "1.194", label: "Movimentações Diárias" },
    { value: "60", label: "Meta de Cargas/Dia" },
    { value: "70%", label: "Market Share Porto" },
    { value: "12", label: "Cais Operacionais" },
  ];

  const services = [
    { name: "Agenciamento", icon: <FiClipboard /> },
    { name: "Carga Local", icon: <MdLocalShipping /> },
    { name: "Carga Nacional", icon: <FiTruck /> },
    { name: "Carga em Trânsito", icon: <FaShippingFast /> },
    { name: "Carga de Retorno", icon: <FiPackage /> },
    { name: "Abastecimento", icon: <FiDollarSign /> },
    { name: "GPS", icon: <FiNavigation /> },
    { name: "Despacho", icon: <FaPassport /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/80 via-white to-cyan-50/80 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/80 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-30 dark:opacity-20"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-200 rounded-full filter blur-3xl opacity-30 dark:opacity-20"></div>
      
      <Card className="w-full max-w-6xl shadow-2xl border-none bg-background/70 dark:bg-default-100/50 backdrop-blur-sm z-10">
        <CardBody className="flex flex-col items-center px-8 py-12 gap-8">
          {/* Cabeçalho */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <GiCargoShip className="text-6xl text-blue-600 dark:text-blue-400" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Mega Logística
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Porto da Beira • Corredor da Beira
                </p>
              </div>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
              Líder em operações logísticas integradas no Porto da Beira, conectando 
              <span className="font-semibold text-blue-600 dark:text-blue-400"> Moçambique, Zimbabwe, Malawi, Zâmbia e RDC</span>
            </p>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 bg-white/50 dark:bg-gray-800/30 rounded-lg border border-gray-200/50 dark:border-gray-700/50"
              >
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Serviços Principais */}
          <div className="w-full">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
              Serviços Integrados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-2 group"
                >
                  <div className={`${item.color} mb-4 p-3 rounded-xl bg-opacity-10 dark:bg-opacity-20 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                      {item.text}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Todos os Serviços */}
          <div className="w-full max-w-4xl">
            <h3 className="text-xl font-bold text-center mb-6 text-gray-800 dark:text-white">
              Todos os Nossos Serviços
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 bg-white/50 dark:bg-gray-800/30 rounded-lg border border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="text-blue-600 dark:text-blue-400 text-xl mb-2">
                    {service.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                    {service.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Destaques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl text-white">
              <FiMapPin className="text-2xl mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Corredor da Beira</h4>
              <p className="text-sm opacity-90">Conexão estratégica para países interland</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl text-white">
              <FiDollarSign className="text-2xl mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Pagamento 30 Dias</h4>
              <p className="text-sm opacity-90">Flexibilidade financeira para clientes</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">
              <FaWarehouse className="text-2xl mx-auto mb-3" />
              <h4 className="font-semibold mb-2">+20 Parceiros</h4>
              <p className="text-sm opacity-90">Rede extensa de fábricas e armazéns</p>
            </div>
          </div>
        </CardBody>

        <CardFooter className="flex flex-col md:flex-row justify-center gap-4 p-8 pt-4 bg-transparent">
          <Button
            as={Link}
            href="/login"
            color="primary"
            startContent={<FiLogIn className="text-white text-lg" />}
            className="font-semibold w-full md:w-auto text-white flex items-center gap-2 h-14 px-8 bg-gradient-to-r from-blue-600 to-cyan-600"
            size="lg"
            radius="lg"
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
            className="font-semibold w-full md:w-auto text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700/50 flex items-center gap-2 h-14 px-8 border-2 border-blue-200 dark:border-gray-600"
            size="lg"
            radius="lg"
          >
            Cadastrar Empresa
          </Button>
        </CardFooter>
      </Card>

      {/* Informações de contato */}
      <div className="mt-8 text-center z-10">
        <div className="bg-white/70 dark:bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
            Mega Centro de Logística, Limitada
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center justify-center gap-2">
              <FiMapPin className="text-blue-500" />
              <span>Rua General Vieira da Costa, Edifício SPAR – VIP, 1° andar, Beira</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FiSettings className="text-cyan-500" />
              <span>+258 872424567 • Megacentrodelogistica@gmail.com</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p>
            © {new Date().getFullYear()} Mega Centro de Logística - Todos os direitos reservados
          </p>
          <p className="mt-2 flex items-center justify-center gap-2 flex-wrap">
            <span>v2.1.0</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
              Termos de Serviço
            </Link>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
              Política de Privacidade
            </Link>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
              Contato
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}