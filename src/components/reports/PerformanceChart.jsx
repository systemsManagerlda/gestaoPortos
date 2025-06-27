"use client"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { useState, useEffect } from "react"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function PerformanceChart() {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    // Dados simulados
    setData({
      labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
      datasets: [
        {
          label: "Entrega no Prazo (%)",
          data: [95, 97, 93, 98],
          borderColor: "rgba(16, 185, 129, 0.8)",
          backgroundColor: "rgba(16, 185, 129, 0.3)",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Satisfação do Cliente (%)",
          data: [90, 92, 89, 94],
          borderColor: "rgba(37, 99, 235, 0.8)",
          backgroundColor: "rgba(37, 99, 235, 0.3)",
          fill: true,
          tension: 0.4,
        },
      ],
    })
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <Line
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: "Relatório de Performance Mensal",
            },
          },
        }}
        data={data}
      />
    </div>
  )
}
