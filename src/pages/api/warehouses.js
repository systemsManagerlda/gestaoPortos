let warehouses = [
  { id: 1, name: "Armazém Central", location: "Porto 1" },
]

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(warehouses)
  } else if (req.method === "POST") {
    const newWarehouse = { id: Date.now(), ...req.body }
    warehouses.push(newWarehouse)
    res.status(201).json(newWarehouse)
  } else {
    res.status(405).json({ message: "Método não permitido" })
  }
}
