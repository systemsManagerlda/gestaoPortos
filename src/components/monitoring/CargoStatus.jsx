export default function CargoStatus({ cargo }) {
  const statusColors = {
    "Em trânsito": "bg-yellow-300",
    Entregue: "bg-green-300",
    "Aguardando coleta": "bg-gray-600",
  }

  return (
    <div
      className={`p-4 mb-3 rounded shadow ${statusColors[cargo.status] || "bg-gray-900"}`}
    >
      <h2 className="font-semibold">{cargo.description}</h2>
      <p>Status: {cargo.status}</p>
    </div>
  )
}
