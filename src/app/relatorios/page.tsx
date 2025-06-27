"use client";
import { useState } from "react";
import PerformanceChart from "@/components/reports/PerformanceChart";
import { AuthGuard } from "../../components/auth/AuthGuard";
import FinancialReport from "../../components/reports/FinancialReport";
import Layout from "@/components/layout/Layout";

export default function FinancialReportPage() {
  const [showReport, setShowReport] = useState<"financial" | "performance">("financial");

  return (
    <Layout>
      <AuthGuard>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Relatórios</h1>

          <div className="mb-6 flex gap-4">
            <button
              onClick={() => setShowReport("financial")}
              className={`px-4 py-2 rounded font-semibold ${
                showReport === "financial"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Relatório Financeiro
            </button>
            <button
              onClick={() => setShowReport("performance")}
              className={`px-4 py-2 rounded font-semibold ${
                showReport === "performance"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Gráfico de Performance
            </button>
          </div>

          <div>
            {showReport === "financial" && <FinancialReport />}
            {showReport === "performance" && <PerformanceChart />}
          </div>
        </div>
      </AuthGuard>
    </Layout>
  );
}
