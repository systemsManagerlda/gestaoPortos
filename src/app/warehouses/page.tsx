"use client";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import NavbarPortuario from "@/components/navBar/NavbarPortuario";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { FiPackage, FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";

// Mock de dados (substituir por dados reais de API futuramente)
const mockWarehouses = [
  {
    id: 1,
    name: "Armazém Central",
    address: "Rua Principal, 123",
    city: "Lisboa",
    district: "Lisboa",
    number: "123",
    capacity: 1500.5,
    created_at: "2023-10-15",
  },
  {
    id: 2,
    name: "Depósito Norte",
    address: "Avenida Secundária, 456",
    city: "Porto",
    district: "Porto",
    number: "456",
    capacity: 800.75,
    created_at: "2023-09-20",
  },
];

export default function WarehousePage() {
  const [showForm, setShowForm] = useState(true);

  return (
    <Layout>
      <NavbarPortuario activeTab="warehouses" />

      <div className="p-6 space-y-6">
        {/* Botão de Alternância */}
        <div className="flex justify-end">
          <Button
            color="primary"
            variant="flat"
            onPress={() => setShowForm(!showForm)}
            startContent={showForm ? <FiEyeOff /> : <FiEye />}
          >
            {showForm ? "Ver Lista" : "Ver Formulário"}
          </Button>
        </div>

        {/* Renderização condicional */}
        {showForm ? <WarehouseForm /> : <WarehouseTable />}
      </div>
    </Layout>
  );
}

// --- Formulário de Armazém ---
function WarehouseForm() {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-md">
      <CardHeader className="flex items-center gap-3 p-6 bg-gray-900 rounded-t-lg">
        <FiPackage className="text-blue-600 text-2xl" aria-hidden="true" />
        <h2 className="text-xl font-bold text-gray-800">
          Cadastrar Novo Armazém
        </h2>
      </CardHeader>

      <Divider className="bg-gray-200" />

      <CardBody className="p-6 space-y-6">
        <p className="text-gray-600">
          Preencha os dados abaixo para cadastrar um novo armazém.
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="warehouseName" className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Armazém *
            </label>
            <input
              type="text"
              id="warehouseName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Armazém Central"
              required
            />
          </div>

          <div>
            <label htmlFor="warehouseAddress" className="block text-sm font-medium text-gray-700 mb-1">
              Endereço Completo *
            </label>
            <input
              type="text"
              id="warehouseAddress"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Rua, número, complemento"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                Cidade *
              </label>
              <input
                type="text"
                id="city"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                Distrito *
              </label>
              <select
                id="state"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Selecione</option>
              </select>
            </div>
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                Número *
              </label>
              <input
                type="text"
                id="zipCode"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
              Capacidade (m²)
            </label>
            <input
              type="number"
              id="capacity"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </CardBody>

      <Divider className="bg-gray-200" />

      <CardFooter className="flex justify-end p-6 bg-gray-900 rounded-b-lg space-x-3">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Cadastrar Armazém
        </button>
      </CardFooter>
    </Card>
  );
}

// --- Tabela de Armazéns ---
function WarehouseTable() {
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-md">
      <CardHeader className="flex justify-between items-center p-6 bg-gray-900 rounded-t-lg">
        <div className="flex items-center gap-3">
          <FiPackage className="text-blue-600 text-2xl" aria-hidden="true" />
          <h2 className="text-xl font-bold text-gray-800">
            Armazéns Cadastrados
          </h2>
        </div>
        <Button
          color="primary"
          startContent={<FiPlus />}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Adicionar Novo
        </Button>
      </CardHeader>

      <Divider className="bg-gray-200" />

      <CardBody className="p-0">
        <Table aria-label="Lista de armazéns cadastrados">
          <TableHeader>
            <TableColumn>NOME</TableColumn>
            <TableColumn>LOCALIZAÇÃO</TableColumn>
            <TableColumn>CAPACIDADE</TableColumn>
            <TableColumn>CADASTRO</TableColumn>
            <TableColumn>AÇÕES</TableColumn>
          </TableHeader>
          <TableBody>
            {mockWarehouses.map((warehouse) => (
              <TableRow key={warehouse.id}>
                <TableCell className="font-medium">{warehouse.name}</TableCell>
                <TableCell>
                  <div>
                    <div>{warehouse.address}</div>
                    <div className="text-sm text-gray-500">
                      {warehouse.city} - {warehouse.district}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{warehouse.capacity} m²</TableCell>
                <TableCell>{new Date(warehouse.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button isIconOnly size="sm" variant="light">
                      <FiEdit2 className="text-blue-500" />
                    </Button>
                    <Button isIconOnly size="sm" variant="light">
                      <FiTrash2 className="text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
