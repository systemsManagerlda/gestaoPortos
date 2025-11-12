// app/dashboard/admin/page.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@nextui-org/react";

export default function DashboardAdmin() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
        return;
      }
      
      if (user.role !== "admin") {
        router.push("/dashboard");
        return;
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Área Administrativa
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Mega Centro de Logística
              </p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Dashboard Administrativo
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Painel de administração do sistema Mega Logística
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Logado como: {user.name} ({user.email})
          </p>
        </div>
      </main>
    </div>
  );
}