"use client"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

// Registra os componentes necessários do ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

// Tipos para os dados do gráfico
type FinancialData = {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string
    borderColor?: string
    borderWidth?: number
  }[]
}

// Cores base para os temas
const COLORS = {
  light: {
    revenue: "rgba(37, 99, 235, 0.7)",
    expense: "rgba(239, 68, 68, 0.7)",
    text: "#374151"
  },
  dark: {
    revenue: "rgba(96, 165, 250, 0.7)",
    expense: "rgba(248, 113, 113, 0.7)",
    text: "#E5E7EB"
  }
}

export default function FinancialReport() { 
  const { theme } = useTheme()
  const [data, setData] = useState<FinancialData>({
    labels: [],
    datasets: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        
        // Simulando uma chamada de API com timeout
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Dados simulados - substitua por uma chamada API real
        const mockData = {
          labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
          datasets: [
            {
              label: "Receita (MZN)",
              data: [12000, 15000, 13000, 17000, 19000, 22000],
              backgroundColor: theme === "dark" ? COLORS.dark.revenue : COLORS.light.revenue,
              borderColor: theme === "dark" ? "rgb(96, 165, 250)" : "rgb(37, 99, 235)",
              borderWidth: 1
            },
            {
              label: "Despesas (MZN)",
              data: [8000, 9000, 8500, 11000, 10500, 13000],
              backgroundColor: theme === "dark" ? COLORS.dark.expense : COLORS.light.expense,
              borderColor: theme === "dark" ? "rgb(248, 113, 113)" : "rgb(239, 68, 68)",
              borderWidth: 1
            },
          ],
        }
        
        setData(mockData)
        setError(null)
      } catch (err) {
        console.error("Erro ao carregar dados:", err)
        setError("Falha ao carregar os dados financeiros. Tente novamente mais tarde.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [theme])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Bar
        options={{
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: "top",
              labels: {
                color: theme === "dark" ? COLORS.dark.text : COLORS.light.text,
                font: {
                  weight: "bold"
                }
              }
            },
            title: {
              display: true,
              text: "Relatório Financeiro Semestral",
              color: theme === "dark" ? COLORS.dark.text : COLORS.light.text,
              font: {
                size: 16,
                weight: "bold"
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: theme === "dark" ? "#1F2937" : "#FFFFFF",
              titleColor: theme === "dark" ? COLORS.dark.text : COLORS.light.text,
              bodyColor: theme === "dark" ? COLORS.dark.text : COLORS.light.text,
              borderColor: theme === "dark" ? "#4B5563" : "#E5E7EB",
              borderWidth: 1
            }
          },
          scales: {
            x: {
              grid: {
                color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
              },
              ticks: {
                color: theme === "dark" ? COLORS.dark.text : COLORS.light.text
              }
            },
            y: {
              grid: {
                color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
              },
              ticks: {
                color: theme === "dark" ? COLORS.dark.text : COLORS.light.text,
                callback: (value) => `MZN ${value}`
              }
            }
          }
        }}
        data={data}
      />
    </div>
  )
}