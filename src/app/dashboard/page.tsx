// app/dashboard/page.tsx
"use client";

import { useAuth, useUserType } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isTransportadora, isUsuario, userType } = useUserType();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
        return;
      }

      if (!isRedirecting) {
        setIsRedirecting(true);
        
        setTimeout(() => {
          // REDIRECIONAMENTO PARA TRANSPORTADORAS
          if (isTransportadora) {
            router.push("/dashboard/transportador");
            return;
          }

          // REDIRECIONAMENTO PARA USUÁRIOS REGULARES (compatibilidade com sistema existente)
          if (isUsuario && 'categoria' in user) {
            if (user.categoria === "Cliente") {
              router.push("/dashboard/cliente");
            } else if (user.categoria === "Motorista") {
              router.push("/dashboard/driver");
            } else if (user.categoria === "Gestor") {
              router.push("/dashboard/admin");
            } else {
              // Fallback para caso a categoria não seja reconhecida
              router.push("/dashboard/cliente");
            }
            return;
          }

          // Fallback geral caso não seja reconhecido
          console.warn("Tipo de usuário não reconhecido, redirecionando para login");
          router.push("/login");
        }, 100);
      }
    }
  }, [user, isLoading, router, isRedirecting, isTransportadora, isUsuario]);

  // Função para obter o nome de exibição baseado no tipo de usuário
  const getDisplayName = () => {
    if (!user) return "";
    
    if (isTransportadora && 'nomeEmpresa' in user) {
      return user.nomeEmpresa || "Transportadora";
    } else if (isUsuario && 'nome' in user) {
      return user.nome || "Usuário";
    }
    return "Usuário";
  };

  // Função para obter o tipo de exibição
  const getDisplayType = () => {
    if (!user) return "";
    
    if (isTransportadora) {
      return "Transportadora";
    } else if (isUsuario && 'categoria' in user) {
      return user.categoria || "Usuário";
    }
    return "Usuário";
  };

  // Função para obter a categoria específica (apenas para usuários regulares)
  const getUserCategoria = () => {
  if (isUsuario && user && "categoria" in user) {
    return user.categoria;
  }
  return null;
};

  if (isLoading || isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <Spinner size="lg" className="mb-4" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            {isLoading ? "Verificando autenticação..." : "Redirecionando..."}
          </p>
          {user && (
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Bem-vindo, <span className="font-semibold">{getDisplayName()}</span>
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-600">
                Tipo: {getDisplayType()}
              </p>
              {isTransportadora && (
                <p className="text-xs text-orange-500 dark:text-orange-400">
                  🚛 Acessando portal de transportadoras
                </p>
              )}
              {isUsuario && getUserCategoria() === "Gestor" && (
                <p className="text-xs text-blue-500 dark:text-blue-400">
                  ⚙️ Acessando painel administrativo
                </p>
              )}
              {isUsuario && getUserCategoria() === "Cliente" && (
                <p className="text-xs text-green-500 dark:text-green-400">
                  📦 Acessando portal do cliente
                </p>
              )}
              {isUsuario && getUserCategoria() === "Motorista" && (
                <p className="text-xs text-purple-500 dark:text-purple-400">
                  🚚 Acessando aplicativo do motorista
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <Spinner size="lg" className="mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Carregando dashboard...</p>
        {user && (
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Preparando ambiente para {getDisplayName()}
          </p>
        )}
      </div>
    </div>
  );
}