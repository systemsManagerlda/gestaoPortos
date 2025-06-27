export const mockPortData = {
  vesselsDocked: 15,
  cargoMoved: 245000,
  totalRevenue: 8500000,
  portOccupancy: 78,
  occupancyChange: 5,
  avgDockingTime: 18.5,
  avgDockingTimeChange: -2.3,
  berthUtilization: 82,
  berthUtilizationChange: 3.1,
  reportedIncidents: 3,
  incidentsChange: -25,
  recentActivities: [
    {
      id: "1",
      vessel: "MV Ocean King",
      type: "Descarga",
      startTime: "2023-06-15 08:00",
      endTime: "2023-06-15 16:30",
      status: "completed"
    },
    {
      id: "2",
      vessel: "MV Star Light",
      type: "Carga",
      startTime: "2023-06-16 10:00",
      endTime: "2023-06-17 04:00",
      status: "in-progress"
    },
    {
      id: "3",
      vessel: "MV Blue Horizon",
      type: "Descarga",
      startTime: "2023-06-18 14:00",
      endTime: "",
      status: "pending"
    },
    {
      id: "4",
      vessel: "MV Golden Sun",
      type: "Manutenção",
      startTime: "2023-06-14 07:00",
      endTime: "2023-06-14 19:00",
      status: "completed"
    },
    {
      id: "5",
      vessel: "MV Silver Wave",
      type: "Carga",
      startTime: "2023-06-17 22:00",
      endTime: "2023-06-18 10:00",
      status: "completed"
    }
  ],
  salaryData: [
    {
      id: "1",
      employee: "João Mário",
      position: "Operador de Cais",
      baseSalary: 15000,
      commissions: 2500,
      absences: 1,
      deductions: 1200,
      netSalary: 16300
    },
    {
      id: "2",
      employee: "Carlos Silva",
      position: "Motorista",
      baseSalary: 18000,
      commissions: 3800,
      absences: 0,
      deductions: 1500,
      netSalary: 20300
    },
    {
      id: "3",
      employee: "Miguel Santos",
      position: "Supervisor",
      baseSalary: 25000,
      commissions: 5000,
      absences: 2,
      deductions: 2000,
      netSalary: 28000
    },
    {
      id: "4",
      employee: "António Fernandes",
      position: "Motorista",
      baseSalary: 18000,
      commissions: 3200,
      absences: 1,
      deductions: 1500,
      netSalary: 19700
    },
    {
      id: "5",
      employee: "Francisco Pereira",
      position: "Gerente de Logística",
      baseSalary: 35000,
      commissions: 7500,
      absences: 0,
      deductions: 3000,
      netSalary: 39500
    }
  ],
  truckEfficiency: [
    { truckId: "TRK-001", trips: 5, utilization: 85 },
    { truckId: "TRK-002", trips: 3, utilization: 60 },
    { truckId: "TRK-003", trips: 7, utilization: 92 },
    { truckId: "TRK-004", trips: 2, utilization: 45 },
    { truckId: "TRK-005", trips: 6, utilization: 88 }
  ],
  driverScores: [
    { driver: "João", score: 85 },
    { driver: "Carlos", score: 92 },
    { driver: "Miguel", score: 78 },
    { driver: "António", score: 88 },
    { driver: "Francisco", score: 95 }
  ]
};