import { useEffect, useState } from "react"
import { getDrivers } from "../../utils/api"

export default function DriverList() {
  const [drivers, setDrivers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchDrivers() {
      try {
        const data = await getDrivers()
        setDrivers(data)
      } catch {
        setError("Erro ao carregar motoristas.")
      } finally {
        setLoading(false)
      }
    }
    fetchDrivers()
  }, [])

  if (loading) return <p>Carregando motoristas...</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (drivers.length === 0) return <p>Nenhum motorista cadastrado.</p>

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 p-2 text-left">ID</th>
          <th className="border border-gray-300 p-2 text-left">Nome</th>
          <th className="border border-gray-300 p-2 text-left">Carteira</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map(({ id, name, license }) => (
          <tr key={id} className="hover:bg-gray-100">
            <td className="border border-gray-300 p-2">{id}</td>
            <td className="border border-gray-300 p-2">{name}</td>
            <td className="border border-gray-300 p-2">{license}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
