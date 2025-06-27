import { Table } from "../ui/Table";


interface Activity {
  id: string;
  vessel: string;
  type: string;
  startTime: string;
  endTime: string;
  status: "completed" | "in-progress" | "pending";
}

interface PortActivityTableProps {
  data: Activity[];
  loading?: boolean;
  showExport?: boolean;
}

export function PortActivityTable({ data, loading }: PortActivityTableProps) {
  const statusClasses = {
    completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>Navio</Table.Head>
          <Table.Head>Tipo</Table.Head>
          <Table.Head>Início</Table.Head>
          <Table.Head>Término</Table.Head>
          <Table.Head>Status</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((activity) => (
          <Table.Row key={activity.id}>
            <Table.Cell>{activity.vessel}</Table.Cell>
            <Table.Cell>{activity.type}</Table.Cell>
            <Table.Cell>{activity.startTime}</Table.Cell>
            <Table.Cell>{activity.endTime}</Table.Cell>
            <Table.Cell>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[activity.status]}`}>
                {activity.status === "completed" ? "Concluído" : 
                 activity.status === "in-progress" ? "Em Progresso" : "Pendente"}
              </span>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}