import { Table } from "../ui/Table";


interface SalaryData {
  id: string;
  employee: string;
  position: string;
  baseSalary: number;
  commissions: number;
  absences: number;
  deductions: number;
  netSalary: number;
}

interface SalaryTableProps {
  data: SalaryData[];
  loading?: boolean;
}

export function SalaryTable({ data, loading }: SalaryTableProps) {
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
          <Table.Head>Funcionário</Table.Head>
          <Table.Head>Cargo</Table.Head>
          <Table.Head>Salário Base</Table.Head>
          <Table.Head>Comissões</Table.Head>
          <Table.Head>Faltas</Table.Head>
          <Table.Head>Descontos</Table.Head>
          <Table.Head>Salário Líquido</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.employee}</Table.Cell>
            <Table.Cell>{item.position}</Table.Cell>
            <Table.Cell>{item.baseSalary.toLocaleString()} MZN</Table.Cell>
            <Table.Cell>{item.commissions.toLocaleString()} MZN</Table.Cell>
            <Table.Cell>{item.absences}</Table.Cell>
            <Table.Cell>{item.deductions.toLocaleString()} MZN</Table.Cell>
            <Table.Cell className="font-medium">{item.netSalary.toLocaleString()} MZN</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}