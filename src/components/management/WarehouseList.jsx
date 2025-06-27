// === DriverForm.jsx ===
import { useForm } from "react-hook-form"
import { useState } from "react"

export default function DriverForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [drivers, setDrivers] = useState([])

  const onSubmit = (data) => {
    const newDriver = { id: Date.now(), ...data }
    setDrivers([...drivers, newDriver])
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Cadastrar Motorista</h2>
      <input {...register("name", { required: true })} placeholder="Nome" className="border p-2 w-full mb-2" />
      <input {...register("license", { required: true })} placeholder="Número da carta" className="border p-2 w-full mb-2" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Salvar</button>
    </form>
  )
}

// === WarehouseForm.jsx ===
import { useForm } from "react-hook-form"
import { useState } from "react"

export default function WarehouseForm() {
  const { register, handleSubmit, reset } = useForm()
  const [warehouses, setWarehouses] = useState([])

  const onSubmit = (data) => {
    const newWarehouse = { id: Date.now(), ...data }
    setWarehouses([...warehouses, newWarehouse])
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Cadastrar Armazém</h2>
      <input {...register("name", { required: true })} placeholder="Nome do Armazém" className="border p-2 w-full mb-2" />
      <input {...register("location", { required: true })} placeholder="Localização" className="border p-2 w-full mb-2" />
      <button type="submit" className="bg-green-500 text-white px-4 py-2">Salvar</button>
    </form>
  )
}

// === LiveTracking.jsx ===
import { useEffect, useState } from "react"

export default function LiveTracking() {
  const [location, setLocation] = useState({ lat: 0, lng: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setLocation(prev => ({ lat: prev.lat + 0.01, lng: prev.lng + 0.01 }))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Monitoramento em Tempo Real</h2>
      <p>Latitude: {location.lat.toFixed(4)} | Longitude: {location.lng.toFixed(4)}</p>
    </div>
  )
}

// === CargoStatus.jsx ===
export default function CargoStatus() {
  const cargos = [
    { id: 1, status: "Em trânsito" },
    { id: 2, status: "Entregue" },
    { id: 3, status: "Aguardando retirada" }
  ]

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Status da Carga</h2>
      <ul className="space-y-2">
        {cargos.map(c => (
          <li key={c.id} className="border p-2 rounded">
            Carga #{c.id}: {c.status}
          </li>
        ))}
      </ul>
    </div>
  )
}

// === FinancialReport.jsx ===
export default function FinancialReport() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Relatório Financeiro</h2>
      <p>Faturamento Total: R$ 120.000,00</p>
      <p>Despesas: R$ 45.000,00</p>
      <p>Lucro: R$ 75.000,00</p>
    </div>
  )
}

// === PerformanceChart.jsx ===
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function PerformanceChart() {
  const data = {
    labels: ["Janeiro", "Fevereiro", "Março"],
    datasets: [
      {
        label: "Entregas",
        data: [65, 59, 80],
        backgroundColor: "#2563eb",
      },
    ],
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Desempenho</h2>
      <Bar data={data} />
    </div>
  )
}