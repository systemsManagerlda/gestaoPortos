import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  change: string;
  loading?: boolean;
}

export function MetricCard({ title, value, icon, change, loading = false }: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
          {icon}
        </div>
      </div>
      <div className="mt-4">
        {loading ? (
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        ) : (
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
        )}
        {loading ? (
          <div className="h-4 mt-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{change}</p>
        )}
      </div>
    </div>
  );
}