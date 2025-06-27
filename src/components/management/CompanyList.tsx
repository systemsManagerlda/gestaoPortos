"use client";
import { useEffect, useState } from "react";
import { getCompanies } from "../../utils/api";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
  Button,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import {
  FiSearch,
  FiPlus,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiRefreshCw,
} from "react-icons/fi";

type Company = {
  id: string;
  name: string;
  address: string;
  status: "active" | "inactive";
};

export default function CompanyList() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const data = await getCompanies();
      setCompanies(data);
    } catch (err) {
      setError("Erro ao carregar empresas. Tente novamente.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedCompanies = filteredCompanies.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner label="Carregando empresas..." color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p>{error}</p>
        <Button
          onClick={fetchCompanies}
          color="danger"
          variant="flat"
          className="mt-3"
          startContent={<FiRefreshCw />}
        >
          Tentar novamente
        </Button>
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 mb-4">Nenhuma empresa cadastrada.</p>
        <Button color="primary" startContent={<FiPlus />}>
          Adicionar Empresa
        </Button>
      </div>
    );
  }

  return (
    <Card shadow="sm" className="w-full overflow-hidden">
      <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-800">Empresas Cadastradas</h2>

        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <Input
            placeholder="Buscar empresas..."
            startContent={<FiSearch className="text-gray-400" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:w-64"
          />
          <Button color="primary" startContent={<FiPlus />}>
            Nova Empresa
          </Button>
        </div>
      </CardHeader>

      <CardBody className="p-0">
        <Table
          aria-label="Lista de empresas"
          isStriped
          removeWrapper
          classNames={{
            wrapper: "rounded-none",
            th: "bg-blue-50 text-blue-800 text-xs uppercase font-semibold tracking-wide",
          }}
          bottomContent={
            <div className="flex w-full justify-center py-4">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={Math.ceil(filteredCompanies.length / rowsPerPage)}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
        >
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>NOME</TableColumn>
            <TableColumn>ENDEREÇO</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>AÇÕES</TableColumn>
          </TableHeader>
          <TableBody>
            {paginatedCompanies.map(({ id, name, address, status }) => (
              <TableRow key={id}>
                <TableCell className="text-xs text-gray-500">{id}</TableCell>
                <TableCell className="font-semibold text-gray-800">{name}</TableCell>
                <TableCell>{address}</TableCell>
                <TableCell>
                  <Chip
                    size="sm"
                    color={status === "active" ? "success" : "danger"}
                    variant="flat"
                    className="capitalize"
                  >
                    {status === "active" ? "Ativo" : "Inativo"}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly size="sm" variant="light">
                        <FiMoreVertical className="text-gray-600" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Ações">
                      <DropdownItem key="edit" startContent={<FiEdit2 />}>
                        Editar
                      </DropdownItem>
                      <DropdownItem
                        key="delete"
                        startContent={<FiTrash2 />}
                        className="text-danger"
                        color="danger"
                      >
                        Remover
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>

      <div className="p-4 text-sm text-gray-500">
        Mostrando {paginatedCompanies.length} de {filteredCompanies.length} empresas
      </div>
    </Card>
  );
}
