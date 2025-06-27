"use client";
import Layout from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import {
  FiAnchor,
  FiPackage,
  FiDollarSign,
  FiFileText,
  FiUsers,
  FiTruck,
  FiBarChart2,
  FiFilter,
} from "react-icons/fi";
import { Bar, Line, Pie, Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTheme } from "next-themes";
import { mockPortData } from "@/data/mockPortData";
import { FinancialReportsTable } from "@/components/tables/FinancialReportsTable";
import { PortActivityTable } from "@/components/tables/PortActivityTable";
import { SalaryTable } from "@/components/tables/SalaryTable";
import { FaShip } from "react-icons/fa6";
import { Alert, Card, MetricCard, Tab, Tabs } from "@/components/ui";

// Tipos para os dados do dashboard
type AlertType = {
  id: number;
  type: "success" | "error" | "warning" | "info";
  message: string;
};

type FinancialReport = {
  id: number;
  type: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
};

type VesselStatus = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
};

type CargoData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
};

type TruckUtilizationPoint = {
  x: number;
  y: number;
};

type TruckUtilizationData = {
  datasets: {
    label: string;
    data: TruckUtilizationPoint[];
    backgroundColor: string;
  }[];
};

// Registrar componentes do ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function PortManagementDashboard() {
  const { theme } = useTheme();
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [portData, setPortData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [alerts, setAlerts] = useState<AlertType[]>([
    { id: 1, type: "warning", message: "Navio MV Horizon atrasado em 2 dias" },
    {
      id: 2,
      type: "info",
      message: "Manutenção programada para o cais 3 amanhã",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setPortData(mockPortData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  // Dados para os gráficos com tipagem
  const vesselsData: VesselStatus = {
    labels: ["Atracados", "Em Espera", "Em Operação"],
    datasets: [
      {
        label: "Navios",
        data: [12, 3, 8],
        backgroundColor: [
          theme === "dark"
            ? "rgba(74, 222, 128, 0.7)"
            : "rgba(16, 185, 129, 0.7)",
          theme === "dark"
            ? "rgba(250, 204, 21, 0.7)"
            : "rgba(234, 179, 8, 0.7)",
          theme === "dark"
            ? "rgba(96, 165, 250, 0.7)"
            : "rgba(59, 130, 246, 0.7)",
        ],
        borderColor: [
          theme === "dark" ? "rgb(74, 222, 128)" : "rgb(16, 185, 129)",
          theme === "dark" ? "rgb(250, 204, 21)" : "rgb(234, 179, 8)",
          theme === "dark" ? "rgb(96, 165, 250)" : "rgb(59, 130, 246)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const cargoData: CargoData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Carga (toneladas)",
        data: [45000, 52000, 48000, 61000, 65000, 72000],
        backgroundColor:
          theme === "dark"
            ? "rgba(59, 130, 246, 0.5)"
            : "rgba(59, 130, 246, 0.7)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 2,
      },
    ],
  };

  const monthlyCostsData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Combustível",
        data: [85000, 92000, 88000, 95000, 102000, 110000],
        backgroundColor:
          theme === "dark"
            ? "rgba(239, 68, 68, 0.7)"
            : "rgba(239, 68, 68, 0.7)",
      },
      {
        label: "Manutenção",
        data: [45000, 38000, 52000, 48000, 55000, 60000],
        backgroundColor:
          theme === "dark"
            ? "rgba(234, 179, 8, 0.7)"
            : "rgba(234, 179, 8, 0.7)",
      },
      {
        label: "Salários",
        data: [120000, 120000, 125000, 125000, 130000, 130000],
        backgroundColor:
          theme === "dark"
            ? "rgba(59, 130, 246, 0.7)"
            : "rgba(59, 130, 246, 0.7)",
      },
    ],
  };

  const driverScoresData = {
    labels: ["João", "Carlos", "Miguel", "António", "Francisco"],
    datasets: [
      {
        label: "Pontuação",
        data: [85, 92, 78, 88, 95],
        backgroundColor:
          theme === "dark"
            ? "rgba(16, 185, 129, 0.7)"
            : "rgba(16, 185, 129, 0.7)",
      },
    ],
  };

  const truckUtilizationData: TruckUtilizationData = {
    datasets: [
      {
        label: "Camiões",
        data: [
          { x: 5, y: 85 },
          { x: 3, y: 60 },
          { x: 7, y: 92 },
          { x: 2, y: 45 },
          { x: 6, y: 88 },
        ],
        backgroundColor:
          theme === "dark"
            ? "rgba(59, 130, 246, 0.7)"
            : "rgba(59, 130, 246, 0.7)",
      },
    ],
  };

  const profitData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Lucro (USD)",
        data: [350000, 420000, 380000, 450000, 500000, 550000],
        backgroundColor: "transparent",
        borderColor:
          theme === "dark" ? "rgb(16, 185, 129)" : "rgb(5, 150, 105)",
        borderWidth: 3,
        tension: 0.1,
      },
    ],
  };

  const financialReportsData: FinancialReport[] = [
    {
      id: 1,
      type: "IRPS",
      amount: 125000,
      dueDate: "2023-06-30",
      status: "pending",
    },
    {
      id: 2,
      type: "INSS",
      amount: 85000,
      dueDate: "2023-06-15",
      status: "paid",
    },
    {
      id: 3,
      type: "Salários",
      amount: 130000,
      dueDate: "2023-06-05",
      status: "paid",
    },
    {
      id: 4,
      type: "Imposto Portuário",
      amount: 45000,
      dueDate: "2023-06-20",
      status: "pending",
    },
  ];

  const handleGenerateReport = (type: string): void => {
    alert(`Relatório de ${type} gerado com sucesso!`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Cabeçalho e Filtros */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
              Dashboard de Gestão Portuária
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Monitoramento completo das operações portuárias
            </p>
          </div>

       <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-xs border border-gray-200 dark:border-gray-700">
              <FiFilter className="text-gray-500 flex-shrink-0" />
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex items-center gap-2">
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date | null) => date && setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    className="bg-transparent text-sm w-28 md:w-32 focus:outline-none"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
                <span className="hidden sm:inline text-gray-400">—</span>
                <div className="flex items-center gap-2">
                  <DatePicker
                    selected={endDate}
                    onChange={(date: Date | null) => date && setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="bg-transparent text-sm w-28 md:w-32 focus:outline-none"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alertas */}
        {alerts.length > 0 && (
          <div className="mb-6 space-y-2">
            {alerts.map((alert) => (
              <Alert key={alert.id} type={alert.type} message={alert.message} />
            ))}
          </div>
        )}

        {/* Tabs de Navegação */}
        <Tabs className="mb-6">
          <Tab
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          >
            <FiBarChart2 className="mr-2" /> Visão Geral
          </Tab>
          <Tab
            active={activeTab === "reports"}
            onClick={() => setActiveTab("reports")}
          >
            <FiFileText className="mr-2" /> Relatórios
          </Tab>
          <Tab
            active={activeTab === "financial"}
            onClick={() => setActiveTab("financial")}
          >
            <FiDollarSign className="mr-2" /> Financeiro
          </Tab>
          <Tab
            active={activeTab === "operations"}
            onClick={() => setActiveTab("operations")}
          >
            <FiTruck className="mr-2" /> Operações
          </Tab>
          <Tab active={activeTab === "hr"} onClick={() => setActiveTab("hr")}>
            <FiUsers className="mr-2" /> RH e Salários
          </Tab>
        </Tabs>

        {/* Conteúdo baseado na tab ativa */}
        {activeTab === "overview" && (
          <>
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Navios Atracados"
                value={portData?.vesselsDocked || "..."}
                icon={<FaShip className="w-6 h-6" />}
                change="+2 em relação à semana passada"
                loading={isLoading}
              />
              <MetricCard
                title="Carga Movimentada"
                value={
                  portData
                    ? `${(portData.cargoMoved / 1000).toFixed(1)}k ton`
                    : "..."
                }
                icon={<FiPackage className="w-6 h-6" />}
                change="+5% em relação ao mês passado"
                loading={isLoading}
              />
              <MetricCard
                title="Receita Total"
                value={
                  portData
                    ? `$${(portData.totalRevenue / 1000000).toFixed(1)}M`
                    : "..."
                }
                icon={<FiDollarSign className="w-6 h-6" />}
                change="+12% em relação ao trimestre passado"
                loading={isLoading}
              />
              <MetricCard
                title="Ocupação do Porto"
                value={portData ? `${portData.portOccupancy}%` : "..."}
                icon={<FiAnchor className="w-6 h-6" />}
                change={
                  portData?.occupancyChange
                    ? `${portData.occupancyChange > 0 ? "+" : ""}${
                        portData.occupancyChange
                      }%`
                    : ""
                }
                loading={isLoading}
              />
            </div>

            {/* Gráficos e Tabelas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="lg:col-span-1">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Status dos Navios
                </h3>
                <div className="h-64">
                  <Pie
                    data={vesselsData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "bottom",
                          labels: {
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </Card>

              <Card className="lg:col-span-2">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Movimentação de Carga
                </h3>
                <div className="h-64">
                  <Bar
                    data={cargoData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                          },
                          grid: {
                            color:
                              theme === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.05)",
                          },
                        },
                        x: {
                          ticks: {
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                          },
                          grid: {
                            color:
                              theme === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.05)",
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          labels: {
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Lucro Mensal
                </h3>
                <div className="h-64">
                  <Line
                    data={profitData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: false,
                          ticks: {
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                            callback: (value) =>
                              `$${(Number(value) / 1000).toFixed(0)}k`,
                          },
                          grid: {
                            color:
                              theme === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.05)",
                          },
                        },
                        x: {
                          ticks: {
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                          },
                          grid: {
                            color:
                              theme === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.05)",
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          labels: {
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                          },
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => {
                              const value = context.raw as number;
                              return `$${value.toLocaleString()}`;
                            },
                          },
                        },
                      },
                    }}
                  />
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Atividades Recentes
                </h3>
                <div className="overflow-x-auto">
                  <PortActivityTable
                    data={portData?.recentActivities || []}
                    loading={isLoading}
                  />
                </div>
              </Card>
            </div>
          </>
        )}

        {activeTab === "reports" && (
          <div className="space-y-6">
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Relatórios de Atividades
                </h3>
                <button
                  onClick={() => handleGenerateReport("atividades")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Gerar Relatório Completo
                </button>
              </div>
              <PortActivityTable
                data={portData?.recentActivities || []}
                loading={isLoading}
                showExport
              />
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Pontuação de Motoristas
                </h3>
                <div className="h-64">
                  <Bar
                    data={driverScoresData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100,
                          ticks: {
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                          },
                          grid: {
                            color:
                              theme === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.05)",
                          },
                        },
                        x: {
                          ticks: {
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                          },
                          grid: {
                            color:
                              theme === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.05)",
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() =>
                      handleGenerateReport("pontuação de motoristas")
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Exportar Dados
                  </button>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Avaliação de Camiões
                </h3>
                <div className="h-64">
                  <Scatter
                    data={truckUtilizationData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          title: {
                            display: true,
                            text: "% de Utilização",
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                          },
                          beginAtZero: true,
                          max: 100,
                          ticks: {
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                          },
                          grid: {
                            color:
                              theme === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.05)",
                          },
                        },
                        x: {
                          title: {
                            display: true,
                            text: "Viagens/Mês",
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                          },
                          ticks: {
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                          },
                          grid: {
                            color:
                              theme === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.05)",
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => {
                              const data = context.raw as {
                                x: number;
                                y: number;
                              };
                              return `Viagens: ${data.x}, Utilização: ${data.y}%`;
                            },
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleGenerateReport("avaliação de camiões")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Exportar Dados
                  </button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "financial" && (
          <div className="space-y-6">
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Relatório Financeiro
                </h3>
                <button
                  onClick={() => handleGenerateReport("financeiro")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Gerar Relatório Fiscal
                </button>
              </div>
              <FinancialReportsTable
                data={financialReportsData}
                loading={isLoading}
              />
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Custos Mensais
                </h3>
                <div className="h-64">
                  <Bar
                    data={monthlyCostsData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                            callback: (value) =>
                              `$${(Number(value) / 1000).toFixed(0)}k`,
                          },
                          grid: {
                            color:
                              theme === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.05)",
                          },
                        },
                        x: {
                          stacked: false,
                          ticks: {
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                          },
                          grid: {
                            color:
                              theme === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.05)",
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          position: "bottom",
                          labels: {
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Balanço Financeiro
                </h3>
                <div className="h-64">
                  <Line
                    data={profitData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: false,
                          ticks: {
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                            callback: (value: string | number) => {
                              const numericValue =
                                typeof value === "number"
                                  ? value
                                  : Number(value);
                              return `$${(numericValue / 1000).toFixed(0)}k`;
                            },
                          },
                          grid: {
                            color:
                              theme === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.05)",
                          },
                        },
                        x: {
                          ticks: {
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                          },
                          grid: {
                            color:
                              theme === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.05)",
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          labels: {
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                          },
                        },
                        tooltip: {
                          callbacks: {
                            label: (tooltipItem: TooltipItem<"line">) => {
                              if (typeof tooltipItem.raw === "number") {
                                return `$${tooltipItem.raw.toLocaleString()}`;
                              }
                              return "";
                            },
                          },
                        },
                      },
                    }}
                  />
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "operations" && (
          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Avaliação de Operações
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Camiões Carregados vs Vazios
                  </h4>
                  <div className="h-64">
                    <Pie
                      data={{
                        labels: ["Carregados", "Vazios"],
                        datasets: [
                          {
                            data: [75, 25],
                            backgroundColor: [
                              theme === "dark"
                                ? "rgba(16, 185, 129, 0.7)"
                                : "rgba(16, 185, 129, 0.7)",
                              theme === "dark"
                                ? "rgba(239, 68, 68, 0.7)"
                                : "rgba(239, 68, 68, 0.7)",
                            ],
                            borderColor: [
                              theme === "dark"
                                ? "rgb(16, 185, 129)"
                                : "rgb(16, 185, 129)",
                              theme === "dark"
                                ? "rgb(239, 68, 68)"
                                : "rgb(239, 68, 68)",
                            ],
                            borderWidth: 1,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "bottom",
                            labels: {
                              color: theme === "dark" ? "#E5E7EB" : "#374151",
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Eficiência por Tipo de Carga
                  </h4>
                  <div className="h-64">
                    <Bar
                      data={{
                        labels: [
                          "Contentores",
                          "Granel",
                          "Líquidos",
                          "Carga Geral",
                        ],
                        datasets: [
                          {
                            label: "Tempo Médio (horas)",
                            data: [4.5, 6.2, 5.8, 7.3],
                            backgroundColor:
                              theme === "dark"
                                ? "rgba(59, 130, 246, 0.7)"
                                : "rgba(59, 130, 246, 0.7)",
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: {
                              color: theme === "dark" ? "#E5E7EB" : "#374151",
                            },
                            grid: {
                              color:
                                theme === "dark"
                                  ? "rgba(255, 255, 255, 0.1)"
                                  : "rgba(0, 0, 0, 0.05)",
                            },
                          },
                          x: {
                            ticks: {
                              color: theme === "dark" ? "#E5E7EB" : "#374151",
                            },
                            grid: {
                              color:
                                theme === "dark"
                                  ? "rgba(255, 255, 255, 0.1)"
                                  : "rgba(0, 0, 0, 0.05)",
                            },
                          },
                        },
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleGenerateReport("eficiência operacional")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Gerar Relatório de Operações
                </button>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Atividades Recentes
              </h3>
              <PortActivityTable
                data={portData?.recentActivities || []}
                loading={isLoading}
                showExport
              />
            </Card>
          </div>
        )}

        {activeTab === "hr" && (
          <div className="space-y-6">
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Gestão de Salários
                </h3>
                <button
                  onClick={() => handleGenerateReport("folha de pagamento")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Gerar Relatório de RH
                </button>
              </div>
              <SalaryTable
                data={portData?.salaryData || []}
                loading={isLoading}
              />
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Distribuição Salarial
                </h3>
                <div className="h-64">
                  <Bar
                    data={{
                      labels: ["< 15k", "15k-25k", "25k-35k", "> 35k"],
                      datasets: [
                        {
                          label: "Funcionários",
                          data: [8, 12, 6, 3],
                          backgroundColor:
                            theme === "dark"
                              ? "rgba(59, 130, 246, 0.7)"
                              : "rgba(59, 130, 246, 0.7)",
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                            stepSize: 2,
                          },
                          grid: {
                            color:
                              theme === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.05)",
                          },
                        },
                        x: {
                          ticks: {
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                          },
                          grid: {
                            color:
                              theme === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.05)",
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Faltas e Comissões
                </h3>
                <div className="h-64">
                  <Line
                    data={{
                      labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
                      datasets: [
                        {
                          label: "Faltas",
                          data: [3, 5, 2, 4, 1, 2],
                          borderColor:
                            theme === "dark"
                              ? "rgb(239, 68, 68)"
                              : "rgb(239, 68, 68)",
                          backgroundColor: "transparent",
                          tension: 0.1,
                        },
                        {
                          label: "Comissões (k MZN)",
                          data: [12, 15, 18, 14, 20, 22],
                          borderColor:
                            theme === "dark"
                              ? "rgb(16, 185, 129)"
                              : "rgb(16, 185, 129)",
                          backgroundColor: "transparent",
                          tension: 0.1,
                          yAxisID: "y1",
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          type: "linear",
                          display: true,
                          position: "left",
                          title: {
                            display: true,
                            text: "Faltas",
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                          },
                          ticks: {
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                          },
                          grid: {
                            color:
                              theme === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.05)",
                          },
                        },
                        y1: {
                          type: "linear",
                          display: true,
                          position: "right",
                          title: {
                            display: true,
                            text: "Comissões",
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                          },
                          ticks: {
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                            callback: (value) => `${value}k MZN`,
                          },
                          grid: {
                            drawOnChartArea: false,
                          },
                        },
                        x: {
                          ticks: {
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                          },
                          grid: {
                            color:
                              theme === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.05)",
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          position: "bottom",
                          labels: {
                            color: theme === "dark" ? "#E5E7EB" : "#374151",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
