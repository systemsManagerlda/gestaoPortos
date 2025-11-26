// components/PaginationComponent.tsx
import React from 'react';

interface PaginationProps {
  pagination: {
    curPage: number;
    pageSize: number;
    totalCount: number;
    totalPage: number;
  };
  onPageChange: (page: number) => void;
}

export const PaginationComponent: React.FC<PaginationProps> = ({ 
  pagination, 
  onPageChange 
}) => {
  const { curPage, pageSize, totalCount, totalPage } = pagination;

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
      <div className="text-sm text-gray-700 dark:text-gray-300">
        Mostrando {((curPage - 1) * pageSize) + 1} a{' '}
        {Math.min(curPage * pageSize, totalCount)} de{' '}
        {totalCount} resultados
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onPageChange(curPage - 1)}
          disabled={curPage === 1}
          className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <span className="px-3 py-1 text-sm text-gray-700 dark:text-gray-300">
          Página {curPage} de {totalPage}
        </span>
        <button
          onClick={() => onPageChange(curPage + 1)}
          disabled={curPage === totalPage}
          className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próxima
        </button>
      </div>
    </div>
  );
};