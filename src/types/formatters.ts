// models/formatters.ts

import { StatusFatura } from "./apiTypes";
import { StatusInfo } from "./componentTypes";

export const formatarMoeda = (valor: number): string => {
  return new Intl.NumberFormat('pt-MZ', {
    style: 'currency',
    currency: 'MZN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(valor || 0);
};

export const calcularDiasVencimento = (dataVencimento: string): number => {
  if (!dataVencimento) return 0;
  const hoje = new Date();
  const vencimento = new Date(dataVencimento);
  const diffTime = vencimento.getTime() - hoje.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const obterStatusFatura = (fatura: { status: StatusFatura }): StatusInfo => {
  switch (fatura.status) {
    case StatusFatura.PAGA:
      return { texto: "Paga", cor: "bg-green-100 text-green-800" };
    case StatusFatura.VENCIDA:
      return { texto: "Vencida", cor: "bg-red-100 text-red-800" };
    case StatusFatura.PARCIAL:
      return { texto: "Parcial", cor: "bg-yellow-100 text-yellow-800" };
    default:
      return { texto: "Pendente", cor: "bg-gray-100 text-gray-800" };
  }
};

// Formatação de data
export const formatarData = (data: string): string => {
  return new Date(data).toLocaleDateString('pt-MZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};