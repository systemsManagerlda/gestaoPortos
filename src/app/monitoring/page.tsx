"use client";

import { useRouter } from "next/navigation";
import { AuthGuard } from "@/components/auth/AuthGuard";
import Layout from "@/components/layout/Layout";
import LiveTracking from "@/components/monitoring/LiveTracking";
import { Button } from "@nextui-org/react";
import { FiTruck } from "react-icons/fi";

export default function TrackingPage() {
  const router = useRouter();

  const goToCargas = () => {
    router.push("/cargas"); // ajuste a rota conforme o nome correto da página
  };

  return (
    <Layout>
      <AuthGuard>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Rastreamento ao Vivo</h1>
            <Button
              color="primary"
              startContent={<FiTruck />}
              onClick={goToCargas}
              className="font-medium"
            >
              Ver Cargas
            </Button>
          </div>

          <LiveTracking />
        </div>
      </AuthGuard>
    </Layout>
  );
}
