"use client";
import { AuthGuard } from "@/components/auth/AuthGuard";
import PerformanceChart from "@/components/reports/PerformanceChart";
import Layout from "@/components/layout/Layout";

export default function PerformanceReportPage() {
  return (
    <Layout>
      <AuthGuard>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Relatório de Performance</h1>
          <PerformanceChart />
        </div>
      </AuthGuard>
    </Layout>
  );
}
