"use client"
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
  Button
} from "@nextui-org/react";
import { FiTruck, FiPlus, FiEdit2, FiTrash2, FiList, FiUserPlus } from "react-icons/fi";
import Layout from "@/components/layout/Layout"
import NavbarPortuario from "@/components/navBar/NavbarPortuario";
import { useState } from "react";

// Dados mockados - substituir por chamada à API
const mockDrivers = [
  {
    id: 1,
    name: "João Silva",
    license: "12345678901",
    licenseType: "D",
    phone: "(11) 98765-4321",
    status: "Ativo",
    createdAt: "2023-10-15"
  },
  {
    id: 2,
    name: "Maria Souza",
    license: "98765432109",
    licenseType: "AB",
    phone: "(21) 99876-5432",
    status: "Ativo",
    createdAt: "2023-09-20"
  },
  {
    id: 3,
    name: "Carlos Oliveira",
    license: "45678912345",
    licenseType: "B",
    phone: "(31) 98765-1234",
    status: "Inativo",
    createdAt: "2023-08-10"
  }
];

export default function DriverPage() {
  const [showForm, setShowForm] = useState(false);
  return (
     <Layout>
      <NavbarPortuario activeTab="drivers" />
      
      <div className="space-y-6 mt-4">
        {/* Botão de alternância */}
        <div className="flex justify-end max-w-4xl mx-auto">
          <Button
            color="primary"
            startContent={showForm ? <FiList /> : <FiUserPlus />}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Ver Lista" : "Novo Motorista"}
          </Button>
        </div>

        {/* Exibe o formulário OU a tabela */}
        {showForm ? (
          <DriverForm onCancel={() => setShowForm(false)} />
        ) : (
          <DriversTable 
            drivers={mockDrivers} 
            onAddNew={() => setShowForm(true)} 
          />
        )}
      </div>
    </Layout>
  );
}
// Componente de Tabela separado

// Componente de Tabela separado
function DriversTable({ drivers, onAddNew }: { drivers: typeof mockDrivers, onAddNew: () => void }) {
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-md">
      <CardHeader className="flex justify-between items-center p-6 bg-gray-900 rounded-t-lg">
        <div className="flex items-center gap-3">
          <FiTruck className="text-blue-600 text-2xl" />
          <h2 className="text-xl font-bold text-gray-800">
            Motoristas Cadastrados
          </h2>
        </div>
        <Button 
          color="primary"
          startContent={<FiPlus />}
          onClick={onAddNew}
        >
          Adicionar Novo
        </Button>
      </CardHeader>

      <Divider className="bg-gray-200" />

      <CardBody className="p-0">
        <Table aria-label="Lista de motoristas">
          <TableHeader>
            <TableColumn>NOME</TableColumn>
            <TableColumn>CNH</TableColumn>
            <TableColumn>CATEGORIA</TableColumn>
            <TableColumn>CONTATO</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>AÇÕES</TableColumn>
          </TableHeader>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell className="font-medium">{driver.name}</TableCell>
                <TableCell>{driver.license}</TableCell>
                <TableCell>{driver.licenseType}</TableCell>
                <TableCell>{driver.phone}</TableCell>
                <TableCell>
                  <StatusBadge status={driver.status} />
                </TableCell>
                <TableCell>
                  <ActionButtons />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}

// Componente de Formulário com prop de cancelamento
function DriverForm({ onCancel }: { onCancel: () => void }) {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="flex items-center gap-3 p-6 bg-gray-900 rounded-t-lg">
        <FiTruck className="text-blue-600 text-2xl" />
        <h2 className="text-xl font-bold text-gray-800">Cadastrar Novo Motorista</h2>
      </CardHeader>
      
      <Divider className="bg-gray-200" />
      
    <CardBody className="p-6 space-y-4">
        <p className="text-gray-600 mb-4">
          Preencha os dados abaixo para cadastrar um novo motorista.
        </p>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo *
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite o nome completo"
                required
              />
            </div>
            <div>
              <label htmlFor="license" className="block text-sm font-medium text-gray-700 mb-1">
                CNH *
              </label>
              <input
                type="text"
                id="license"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Número da carteira de motorista"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="licenseType" className="block text-sm font-medium text-gray-700 mb-1">
                Categoria CNH *
              </label>
              <select
                id="licenseType"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Selecione</option>
                <option value="A">A - Motocicleta</option>
                <option value="B">B - Automóvel</option>
                <option value="AB">AB - Motocicleta e Automóvel</option>
                <option value="C">C - Veículo pesado</option>
                <option value="D">D - Ônibus</option>
                <option value="E">E - Reboque</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefone *
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="(00) 00000-0000"
                required
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                id="status"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
                <option value="Férias">Férias</option>
                <option value="Afastado">Afastado</option>
              </select>
            </div>
          </div>
        </div>
      </CardBody>
      
      <Divider className="bg-gray-200" />
      
      <CardFooter className="flex justify-end p-6 bg-gray-900 rounded-b-lg space-x-3">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Cadastrar Motorista
        </button>
      </CardFooter>
    </Card>
  );
}

// Componentes auxiliares
function StatusBadge({ status }: { status: string }) {
  const statusClasses = {
    Ativo: "bg-green-100 text-green-800",
    Inativo: "bg-red-100 text-red-800",
    Férias: "bg-yellow-100 text-yellow-800",
    Afastado: "bg-gray-100 text-gray-800"
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[status as keyof typeof statusClasses]}`}>
      {status}
    </span>
  );
}

function ActionButtons() {
  return (
    <div className="flex gap-2">
      <Button isIconOnly size="sm" variant="light">
        <FiEdit2 className="text-blue-500" />
      </Button>
      <Button isIconOnly size="sm" variant="light">
        <FiTrash2 className="text-red-500" />
      </Button>
    </div>
  );
}