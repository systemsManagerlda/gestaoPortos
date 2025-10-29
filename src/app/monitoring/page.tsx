"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";



interface DashboardCard {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState({
    name: "Usuário",
    role: "Administrador",
    email: "usuario@porto.com",
  });
  const router = useRouter();

  // Módulos por perfil
  const modules: Record<string, DashboardCard[]> = {
    "GPS/Combustível": [
      {
        title: "Controlo de Diesel",
        description: "Controle e confirmação de combustível",
        icon: "⛽",
        href: "/monitoring/gps/diesel",
        color: "bg-blue-500",
      },
      {
        title: "GPS Simples",
        description: "Controle de dispositivos GPS básicos",
        icon: "📡",
        href: "/monitoring/gps/simples",
        color: "bg-blue-500",
      },
      {
        title: "Conteúdo GPS",
        description: "Controle de conteúdo dos GPS",
        icon: "🗺️",
        href: "/monitoring/gps/conteudo",
        color: "bg-blue-500",
      },
      {
        title: "Monitoramento GPS",
        description: "Monitoramento em tempo real",
        icon: "👁️",
        href: "/monitoring/gps/monitoramento",
        color: "bg-blue-500",
      },
      {
        title: "Sistema GPS",
        description: "Gestão do sistema de monitoramento",
        icon: "⚙️",
        href: "/monitoring/gps/sistema",
        color: "bg-blue-500",
      },
    ],
    Transportador: [
      {
        title: "Cargas Disponíveis",
        description: "Visualize cargas disponíveis para transporte",
        icon: "📦",
        href: "/monitoring/transportador/cargas",
        color: "bg-blue-500",
      },
      {
        title: "Escolha da Carga",
        description: "Selecione cargas para transportar",
        icon: "✅",
        href: "/monitoring/transportador/escolha",
        color: "bg-blue-500",
      },
      {
        title: "Visualizar Relatórios",
        description: "Acesse relatórios de transportes",
        icon: "📊",
        href: "/monitoring/transportador/relatorios",
        color: "bg-blue-500",
      },
      {
        title: "Visualizar Pagamentos",
        description: "Consulte seus pagamentos",
        icon: "💰",
        href: "/monitoring/transportador/pagamentos",
        color: "bg-blue-500",
      },
      {
        title: "Reponte Final",
        description: "Registro final de reponte",
        icon: "🏁",
        href: "/monitoring/transportador/reponte",
        color: "bg-blue-500",
      },
    ],
  };

  const currentModules = modules[user.role] || [];

  useEffect(() => {
    // Recupera o role do localStorage ou define um padrão
    const savedRole = localStorage.getItem("userRole") || "Administrador";
    setUser((prev) => ({
      ...prev,
      role: savedRole,
      name:
        savedRole === "Administrador"
          ? "Administrador"
          : `Usuário ${savedRole}`,
    }));
  }, []);

  return (
    <Layout>
      {/* Fundo azul marinho com gradiente */}
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="px-4 py-6 sm:px-0">
            {/* Module Selection */}
            <div className="mb-6">
              <select
                id="role"
                value={user.role}
                onChange={(e) => {
                  setUser({ ...user, role: e.target.value });
                  localStorage.setItem("userRole", e.target.value);
                }}
                className="block w-64 px-3 py-2 bg-blue-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              >
                {Object.keys(modules).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentModules.map((module, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-white/20"
                  onClick={() => router.push(module.href)}
                >
                  <div
                    className={`p-4 ${module.color} rounded-t-xl text-white shadow-md`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{module.icon}</span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-medium">
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {module.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {module.description}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(module.href);
                      }}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm font-medium transition-colors shadow-sm"
                    >
                      Acessar Módulo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

      </div>

    </Layout>
  );
}
