/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import MapaContentores from './MapaContentores';
import { Contentor } from '../janelas/GPSContentor';


interface FiltrosRastreamento {
  status: string;
  tipoCarga: string;
  naturezaCarga: string;
}

interface RastreamentoContentoresProps {
  filtros: FiltrosRastreamento;
  setFiltros: (filtros: FiltrosRastreamento) => void;
  carregarContentores: () => Promise<void>;
  loadingContentores: boolean;
  contentores: Contentor[];
  contentorSelecionado: Contentor | null;
  setContentorSelecionado: (contentor: Contentor | null) => void;
  buscarDetalhesCarga: (codigo: string) => Promise<any>;
}

// Função auxiliar para obter texto do status
const getStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    planeada: 'Planejada',
    aguardando_coleta: 'Aguardando Coleta',
    coletada: 'Coletada',
    em_transito: 'Em Trânsito',
    em_fronteira: 'Em Fronteira',
    aguardando_desembaraco: 'Aguardando Desembaraço',
    em_entrega: 'Em Entrega',
    entregue: 'Entregue',
    encerrada: 'Encerrada',
  };
  return statusMap[status] || status;
};

// Opções para os filtros
const opcoesStatus = [
  { value: 'todos', label: 'Todos os Status' },
  { value: 'planeada', label: 'Planejada' },
  { value: 'aguardando_coleta', label: 'Aguardando Coleta' },
  { value: 'coletada', label: 'Coletada' },
  { value: 'em_transito', label: 'Em Trânsito' },
  { value: 'em_fronteira', label: 'Em Fronteira' },
  { value: 'aguardando_desembaraco', label: 'Aguardando Desembaraço' },
  { value: 'em_entrega', label: 'Em Entrega' },
  { value: 'entregue', label: 'Entregue' },
  { value: 'encerrada', label: 'Encerrada' },
];

const opcoesTipoCarga = [
  { value: 'todos', label: 'Todos os Tipos' },
  { value: 'Contentorizada', label: 'Contentorizada' },
  { value: 'Solta', label: 'Solta' },
  { value: 'Granel', label: 'Granel' },
  { value: 'Frigorífica', label: 'Frigorífica' },
  { value: 'Perigosa', label: 'Perigosa' },
];

const opcoesNaturezaCarga = [
  { value: 'todos', label: 'Todas as Naturezas' },
  { value: 'perigosa', label: 'Perigosa' },
  { value: 'não perigosa', label: 'Não Perigosa' },
  { value: 'sensível', label: 'Sensível' },
  { value: 'fragil', label: 'Frágil' },
];

// Componente para a legenda de status
const LegendaStatus: React.FC = () => (
  <div className="flex items-center space-x-4">
    <div className="flex items-center">
      <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
      <span className="text-xs">Em Trânsito</span>
    </div>
    <div className="flex items-center">
      <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
      <span className="text-xs">Coletada</span>
    </div>
    <div className="flex items-center">
      <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
      <span className="text-xs">Entregue</span>
    </div>
    <div className="flex items-center">
      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
      <span className="text-xs">Planejada</span>
    </div>
  </div>
);

// Componente para o card de status
const CardStatus: React.FC<{
  title: string;
  count: number;
  color: string;
}> = ({ title, count, color }) => (
  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200 text-gray-950">
    <span className="text-sm font-medium">{title}</span>
    <span className={`px-2 py-1 rounded text-sm font-bold ${color}`}>
      {count}
    </span>
  </div>
);

const RastreamentoContentores: React.FC<RastreamentoContentoresProps> = ({
  filtros,
  setFiltros,
  carregarContentores,
  loadingContentores,
  contentores,
  contentorSelecionado,
  setContentorSelecionado,
  buscarDetalhesCarga,
}) => {
  // Estatísticas dos status
  const estatisticasStatus = {
    em_transito: contentores.filter((c) => c.status === 'em_transito').length,
    coletada: contentores.filter((c) => c.status === 'coletada').length,
    entregue: contentores.filter((c) => c.status === 'entregue').length,
    planeada: contentores.filter((c) => c.status === 'planeada').length,
  };

  const coresStatus: Record<string, string> = {
    em_transito: 'bg-green-500 text-white',
    coletada: 'bg-blue-500 text-white',
    entregue: 'bg-purple-500 text-white',
    planeada: 'bg-gray-500 text-white',
  };

  const textosStatus: Record<string, string> = {
    em_transito: 'Em Trânsito',
    coletada: 'Coletada',
    entregue: 'Entregue',
    planeada: 'Planejada',
  };

  // Função para obter cor do status na tabela
  const getStatusColorClass = (status: string): string => {
    switch (status) {
      case 'em_transito':
        return 'bg-green-100 text-green-800';
      case 'coletada':
        return 'bg-blue-100 text-blue-800';
      case 'entregue':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Painel de Filtros */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-cyan-50">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <span className="bg-cyan-500 text-white p-2 rounded-lg mr-2">
              🔍
            </span>
            Filtros de Rastreamento
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-950"
                value={filtros.status}
                onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
              >
                {opcoesStatus.map((opcao) => (
                  <option key={opcao.value} value={opcao.value}>
                    {opcao.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Carga
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-950"
                value={filtros.tipoCarga}
                onChange={(e) => setFiltros({ ...filtros, tipoCarga: e.target.value })}
              >
                {opcoesTipoCarga.map((opcao) => (
                  <option key={opcao.value} value={opcao.value}>
                    {opcao.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Natureza da Carga
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-950"
                value={filtros.naturezaCarga}
                onChange={(e) =>
                  setFiltros({
                    ...filtros,
                    naturezaCarga: e.target.value,
                  })
                }
              >
                {opcoesNaturezaCarga.map((opcao) => (
                  <option key={opcao.value} value={opcao.value}>
                    {opcao.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={carregarContentores}
                disabled={loadingContentores}
                className="w-full px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 font-medium disabled:opacity-50 transition-colors"
              >
                {loadingContentores ? 'Carregando...' : 'Aplicar Filtros'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mapa Google Maps */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm text-gray-900">
        <div className="p-4 border-b border-gray-200 bg-blue-50">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                🗺️
              </span>
              Mapa de Rastreamento - {contentores.length} Contentores
            </h3>
            <LegendaStatus />
          </div>
        </div>
        <div className="p-4">
          {loadingContentores ? (
            <div className="h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Carregando contentores...</p>
              </div>
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden border border-gray-300">
              <MapaContentores
                contentores={contentores}
                contentorSelecionado={contentorSelecionado}
                setContentorSelecionado={setContentorSelecionado}
              />
            </div>
          )}
        </div>
      </div>

      {/* Painel de Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h4 className="font-semibold text-gray-900 mb-4">
            Status dos Contentores
          </h4>
          <div className="space-y-3">
            {Object.entries(estatisticasStatus).map(([status, count]) => (
              <CardStatus
                key={status}
                title={textosStatus[status]}
                count={count}
                color={coresStatus[status]}
              />
            ))}
          </div>
        </div>

        <div className="md:col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h4 className="font-semibold text-gray-900 mb-4">
            Contentores em Tempo Real
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Número
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Localização
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Peso (kg)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contentores.slice(0, 10).map((contentor) => (
                  <tr key={contentor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {contentor.numero}
                      </div>
                      <div className="text-xs text-gray-500">
                        {contentor.codigo}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {contentor.tipo}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColorClass(
                          contentor.status
                        )}`}
                      >
                        {getStatusText(contentor.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {contentor.localizacao}
                      </div>
                      <div className="text-xs text-gray-500">
                        {contentor.ultimaAtualizacao}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {contentor.pesoBruto?.toLocaleString() || '0'} kg
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setContentorSelecionado(contentor)}
                        className="text-cyan-600 hover:text-cyan-900 mr-3 transition-colors"
                      >
                        Ver no Mapa
                      </button>
                      <button
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        onClick={async () => {
                          const detalhes = await buscarDetalhesCarga(contentor.codigo);
                          if (detalhes) {
                            console.log('Detalhes da carga:', detalhes);
                            alert(`Detalhes carregados para ${contentor.codigo}`);
                          }
                        }}
                      >
                        Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {contentores.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Nenhum contentor encontrado com os filtros atuais.
              </div>
            )}
            {contentores.length > 10 && (
              <div className="text-center py-4 text-sm text-gray-600 border-t border-gray-200">
                Mostrando 10 de {contentores.length} contentores
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RastreamentoContentores;
export type { Contentor, FiltrosRastreamento };