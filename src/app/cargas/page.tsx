"use client";
import { useState, useEffect } from "react";
import { AuthGuard } from "../../components/auth/AuthGuard";
import CargoStatus from "../../components/monitoring/CargoStatus";
import Layout from "@/components/layout/Layout";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Input,
  Select,
  SelectItem,
  Button,
  Spinner,
} from "@nextui-org/react";
import { FiRefreshCw, FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation"; // Adicione essa importação
import { FiMap } from "react-icons/fi"; // Ícone de mapa

// Define tipos para melhor organização
type CargoStatus =
  | "Aguardando coleta"
  | "Em trânsito"
  | "Entregue"
  | "Cancelada"
  | "Atrasada";

interface Cargo {
  id: string;
  description: string;
  status: CargoStatus;
  origin: string;
  destination: string;
  estimatedDelivery: string;
  lastUpdate: string;
}

// Simula chamada API com delay
const fetchCargos = async (): Promise<Cargo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          description: "Eletrônicos - Samsung",
          status: "Em trânsito",
          origin: "São Paulo/SP",
          destination: "Rio de Janeiro/RJ",
          estimatedDelivery: "2023-11-15",
          lastUpdate: "2023-11-10T14:30:00",
        },
        {
          id: "2",
          description: "Móveis - Sofá 3 lugares",
          status: "Entregue",
          origin: "Curitiba/PR",
          destination: "Belo Horizonte/MG",
          estimatedDelivery: "2023-11-05",
          lastUpdate: "2023-11-05T09:15:00",
        },
        {
          id: "3",
          description: "Alimentos - Café em grãos",
          status: "Aguardando coleta",
          origin: "Santos/SP",
          destination: "Porto Alegre/RS",
          estimatedDelivery: "2023-11-20",
          lastUpdate: "2023-11-08T16:45:00",
        },
        {
          id: "4",
          description: "Químicos - Produtos de limpeza",
          status: "Atrasada",
          origin: "Campinas/SP",
          destination: "Salvador/BA",
          estimatedDelivery: "2023-11-08",
          lastUpdate: "2023-11-09T11:20:00",
        },
        {
          id: "5",
          description: "Vestuário - Camisetas",
          status: "Cancelada",
          origin: "Fortaleza/CE",
          destination: "Recife/PE",
          estimatedDelivery: "2023-11-12",
          lastUpdate: "2023-11-10T08:00:00",
        },
      ]);
    }, 1000);
  });
};

export default function CargoPage() {
  const [cargoList, setCargoList] = useState<Cargo[]>([]);
  const [filteredCargoList, setFilteredCargoList] = useState<Cargo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<CargoStatus | "all">("all");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Busca dados das cargas
  const loadCargos = async () => {
    try {
      setIsLoading(true);
      const data = await fetchCargos();
      setCargoList(data);
      setFilteredCargoList(data);
      setError(null);
    } catch (err) {
      setError("Falha ao carregar dados das cargas. Tente novamente.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filtra cargas baseado nos critérios
  const applyFilters = () => {
    let result = cargoList;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (cargo) =>
          cargo.description.toLowerCase().includes(term) ||
          cargo.origin.toLowerCase().includes(term) ||
          cargo.destination.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((cargo) => cargo.status === statusFilter);
    }

    setFilteredCargoList(result);
  };

  // Carrega dados iniciais
  useEffect(() => {
    loadCargos();
  }, []);

  // Aplica filtros quando mudam
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, statusFilter, cargoList]);

  return (
    <Layout>
      <AuthGuard>
        <Card className="mx-4 my-6">
          <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6">
            <div>
              <h1 className="text-2xl font-bold">Monitoramento de Cargas</h1>
              <p className="text-sm text-gray-500">
                Acompanhe o status de todas as cargas
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                color="primary"
                startContent={<FiMap />}
                onPress={() => router.push("/monitoring")} // ajuste a rota conforme necessário
                className="flex items-center gap-2"
                variant="bordered"
              >
                Ver Mapa
              </Button>

              <Button
                color="primary"
                startContent={<FiPlus />}
                onPress={() => console.log("Adicionar nova carga")}
                className="flex items-center gap-2"
              >
                Nova Carga
              </Button>
            </div>
          </CardHeader>

          <Divider />

          <CardBody className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 items-end">
              <Input
                label=""
                placeholder="Descrição, origem ou destino..."
                value={searchTerm}
                onValueChange={setSearchTerm}
                isClearable
                className="w-full"
                variant="bordered"
              />

              <Select
                label=""
                placeholder="Filtrar por status"
                selectedKeys={statusFilter !== "all" ? [statusFilter] : []}
                onChange={(e) =>
                  setStatusFilter(e.target.value as CargoStatus | "all")
                }
                className="w-full"
                classNames={{
                  trigger:
                    "bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
                  listbox:
                    "bg-white dark:bg-gray-900 text-black dark:text-white",
                }}
                variant="bordered"
              >
                {[
                  "all",
                  "Aguardando coleta",
                  "Em trânsito",
                  "Entregue",
                  "Cancelada",
                  "Atrasada",
                ].map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === "all" ? "Todos" : status}
                  </SelectItem>
                ))}
              </Select>

              <Button
                variant="solid"
                color="primary"
                startContent={<FiRefreshCw />}
                onPress={loadCargos}
                className="w-full"
              >
                Atualizar
              </Button>
            </div>

            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                <p>{error}</p>
                <Button
                  size="sm"
                  color="danger"
                  variant="light"
                  onPress={loadCargos}
                  className="mt-2"
                >
                  Tentar novamente
                </Button>
              </div>
            )}

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Spinner size="lg" />
              </div>
            ) : filteredCargoList.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Nenhuma carga encontrada com os filtros atuais
                </p>
                <Button
                  variant="light"
                  onPress={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                  className="mt-4"
                >
                  Limpar filtros
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCargoList.map((cargo) => (
                  <CargoStatus key={cargo.id} cargo={cargo} />
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </AuthGuard>
    </Layout>
  );
}
