import React from 'react';

// Interface para o Contentor
interface Contentor {
  id: string;
  codigo: string;
  numero: string;
  tipo: string;
  status: string;
  cliente: string;
  localizacao: string;
  ultimaAtualizacao: string;
  pesoBruto?: number;
}

// Props do componente
interface GraficosEstatisticasProps {
  contentores: Contentor[];
}

const GraficosEstatisticas: React.FC<GraficosEstatisticasProps> = ({ contentores }) => {
  // Cálculos das métricas
  const totalContentores = contentores.length;
  const emTransito = contentores.filter((c) => c.status === "em_transito").length;
  const entregues = contentores.filter((c) => c.status === "entregue").length;
  const pesoTotal = contentores.reduce((sum, c) => sum + (c.pesoBruto || 0), 0);

  // Status disponíveis
  const statusLabels = {
    em_transito: "Em Trânsito",
    coletada: "Coletada",
    entregue: "Entregue",
    planeada: "Planejada",
  };

  // Cores para os status
  const statusColors: Record<string, string> = {
    em_transito: "bg-green-500",
    coletada: "bg-blue-500",
    entregue: "bg-purple-500",
    planeada: "bg-gray-500",
  };

  // Tipos únicos de carga
  const tiposCarga = Array.from(new Set(contentores.map((c) => c.tipo)));

  return (
    <div className="space-y-6 text-gray-950">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-cyan-50">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <span className="bg-cyan-500 text-white p-2 rounded-lg mr-2">
              📈
            </span>
            Dashboard de Contentores - Métricas e Estatísticas
          </h3>
        </div>
        <div className="p-6">
          {/* Métricas Rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
              <p className="text-sm text-cyan-600 font-medium">
                Contentores Ativos
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {totalContentores}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-600 font-medium">
                Em Trânsito
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {emTransito}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-green-600 font-medium">
                Entregues
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {entregues}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-600 font-medium">
                Peso Total (kg)
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {pesoTotal.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Gráfico de Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-cyan-500 mr-2">📊</span>
                Status dos Contentores
              </h4>
              <div className="h-64 flex items-center justify-center">
                <div className="text-center w-full">
                  {/* Gráfico simples de pizza */}
                  <div className="flex justify-center mb-4">
                    <div className="relative w-32 h-32">
                      {/* Implementação de gráfico simplificada */}
                      <div className="w-full h-full rounded-full border-8 border-gray-300 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold">
                            {totalContentores}
                          </div>
                          <div className="text-sm text-gray-600">
                            Total
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(statusLabels).map(([status, label]) => {
                      const count = contentores.filter(
                        (c) => c.status === status
                      ).length;
                      const percentage =
                        totalContentores > 0
                          ? Math.round((count / totalContentores) * 100)
                          : 0;

                      return (
                        <div key={status} className="flex items-center">
                          <div
                            className={`w-3 h-3 rounded mr-2 ${statusColors[status] || "bg-gray-500"}`}
                          ></div>
                          <span>
                            {label} ({percentage}%)
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-blue-500 mr-2">🚢</span>
                Tipos de Carga
              </h4>
              <div className="h-64 overflow-y-auto">
                <div className="space-y-4 pr-2">
                  {tiposCarga.length > 0 ? (
                    tiposCarga.map((tipo) => {
                      const count = contentores.filter(
                        (c) => c.tipo === tipo
                      ).length;
                      const percentage =
                        totalContentores > 0
                          ? Math.round((count / totalContentores) * 100)
                          : 0;

                      return (
                        <div
                          key={tipo}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-3 h-3 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-sm font-medium text-gray-900 break-words">
                                {tipo}
                              </span>
                              <span className="text-sm text-gray-600 ml-2 whitespace-nowrap flex-shrink-0">
                                {count}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {percentage}%
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">📊</div>
                      <p className="text-gray-600 font-medium">Nenhum dado disponível</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Não há contentores cadastrados para mostrar estatísticas
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraficosEstatisticas;
export type { Contentor };