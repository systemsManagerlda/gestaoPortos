// app/dashboard/page.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
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
          if (user.role === "client") {
            router.push("/dashboard/cliente");
          } else if (user.role === "transportador") {
            router.push("/dashboard/transportador");
          } else {
            router.push("/dashboard/admin");
          }
        }, 100);
      }
    }
  }, [user, isLoading, router, isRedirecting]);

  if (isLoading || isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">
            {isLoading ? "Verificando autenticação..." : "Redirecionando..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner size="lg" label="Carregando dashboard..." />
    </div>
  );
}