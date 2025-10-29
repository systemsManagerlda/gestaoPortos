// app/registration-system/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface DashboardCard {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

export default function RegistrationSystem() {
  const [user, setUser] = useState({
    name: "Usuário",
    role: "Administrador",
    email: "usuario@porto.com",
  });
  const router = useRouter();

  // Módulos por perfil - MANTIDOS TODOS OS CLIENTES
  const modules: Record<string, DashboardCard[]> = {
    Clientes: [
      {
        title: "Disponibilizar Carga",
        description: "Cadastre novas cargas para transporte",
        icon: "📤",
        href: "/gestao/client/cargas",
        color: "bg-blue-500",
      },
      {
        title: "Estado da Carga",
        description: "Acompanhe o status das suas cargas",
        icon: "📊",
        href: "/gestao/client/status",
        color: "bg-blue-500",
      },
      {
        title: "Confirmação de Destino",
        description: "Confirme destino e valor do transporte",
        icon: "📍",
        href: "/gestao/client/confirmacao",
        color: "bg-blue-500",
      },
      {
        title: "Relatório Final",
        description: "Consulte relatórios finais das cargas",
        icon: "📋",
        href: "/gestao/client/relatorios",
        color: "bg-blue-500",
      },
    ],
    Outro: [
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
  );
}
