let companies = [
  { id: 1, name: "Empresa A", address: "Rua 1" },
  { id: 2, name: "Empresa B", address: "Rua 2" },
]

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(companies)
  } else if (req.method === "POST") {
    const newCompany = { id: Date.now(), ...req.body }
    companies.push(newCompany)
    res.status(201).json(newCompany)
  } else {
    res.status(405).json({ message: "Método não permitido" })
  }
}
