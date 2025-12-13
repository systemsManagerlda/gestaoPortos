import React from 'react';

const DashboardCard = ({ title, value, icon, subtext, trend, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600'
  };

  // Se o valor já estiver formatado como string, usa como está
  // Se for número, formata
  const displayValue = typeof value === 'number' 
    ? new Intl.NumberFormat('pt-MZ', {
        style: 'currency',
        currency: 'MZN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value)
    : value;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{displayValue}</p>
        </div>
        <div className={`${colorClasses[color]} p-3 rounded-lg`}>
          <span className="text-xl">{icon}</span>
        </div>
      </div>
      {subtext && (
        <div className="mt-3">
          {trend && (
            <span className={`text-sm font-medium ${trend?.includes('+') ? 'text-green-600' : 'text-blue-600'}`}>
              {trend}
            </span>
          )}
          <p className="text-xs text-gray-500 mt-1">{subtext}</p>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;