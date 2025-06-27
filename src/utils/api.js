import axios from "axios"

const api = axios.create({
  baseURL: "/api",
  timeout: 5000,
})

// Exemplo: buscar empresas
export async function getCompanies() {
  const response = await api.get("/companies")
  return response.data
}

// Exemplo: criar empresa
export async function createCompany(data) {
  const response = await api.post("/companies", data)
  return response.data
}

export default api
export async function getDrivers() {
  const response = await api.get("/drivers")
  return response.data
}

export async function createDriver(data) {
  const response = await api.post("/drivers", data)
  return response.data
}
export async function getWarehouses() {
  const response = await api.get("/warehouses")
  return response.data
}

export async function createWarehouse(data) {
  const response = await api.post("/warehouses", data)
  return response.data
}


