let drivers = [
  { id: 1, name: "João Silva", license: "ABC1234" },
  { id: 2, name: "Maria Souza", license: "XYZ5678" },
]

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(drivers)
  } else if (req.method === "POST") {
    const newDriver = { id: Date.now(), ...req.body }
    drivers.push(newDriver)
    res.status(201).json(newDriver)
  } else {
    res.status(405).json({ message: "Método não permitido" })
  }
}
