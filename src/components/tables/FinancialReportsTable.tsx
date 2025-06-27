import { Table } from "@/components/ui";

export interface FinancialReport {
 id: number;
  type: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
}

interface FinancialReportsTableProps {
  data: FinancialReport[];
  loading?: boolean;
}

export function FinancialReportsTable({ data, loading }: FinancialReportsTableProps) {
  const statusClasses = {
    paid: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    overdue: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
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
          <Table.Head>Tipo</Table.Head>
          <Table.Head>Valor</Table.Head>
          <Table.Head>Vencimento</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head>Ações</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((report) => (
          <Table.Row key={report.id}>
            <Table.Cell>{report.type}</Table.Cell>
            <Table.Cell>{report.amount.toLocaleString()} MZN</Table.Cell>
            <Table.Cell>{new Date(report.dueDate).toLocaleDateString()}</Table.Cell>
            <Table.Cell>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[report.status]}`}>
                {report.status === "paid" ? "Pago" : 
                 report.status === "pending" ? "Pendente" : "Atrasado"}
              </span>
            </Table.Cell>
            <Table.Cell>
              <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                Detalhes
              </button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}