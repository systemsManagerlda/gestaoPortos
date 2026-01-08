/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';

// Interfaces
interface Contentor {
  id: string;
  codigo: string;
  numero: string;
  tipo: string;
  status: string;
  cliente: string;
  localizacao: string;
  ultimaAtualizacao: string;
}

interface Movimentacao {
  id: string;
  contentorId: string;
  tipo: string;
  descricao: string;
  local: string;
  dataHora: string;
  status: 'concluido' | 'em_andamento' | 'parado' | 'pendente';
  latitude?: number;
  longitude?: number;
}

interface MovimentacaoContentoresProps {
  contentores: Contentor[];
}

// Tipos de movimentação disponíveis
const tiposMovimentacao = [
  { value: '', label: 'Selecione' },
  { value: 'carregamento', label: 'Carregamento' },
  { value: 'descarga', label: 'Descarga' },
  { value: 'transferencia', label: 'Transferência' },
  { value: 'inspecao', label: 'Inspeção' },
  { value: 'coleta', label: 'Coleta' },
  { value: 'entrega', label: 'Entrega' },
  { value: 'parada', label: 'Parada Programada' },
  { value: 'fiscalizacao', label: 'Fiscalização' },
  { value: 'manutencao', label: 'Manutenção' },
];

// Opções de período
const periodos = [
  { value: '7dias', label: 'Últimos 7 dias' },
  { value: '30dias', label: 'Últimos 30 dias' },
  { value: '3meses', label: 'Últimos 3 meses' },
  { value: '6meses', label: 'Últimos 6 meses' },
  { value: '1ano', label: 'Último ano' },
  { value: 'personalizado', label: 'Período Personalizado' },
];

// Status de movimentação
const statusMovimentacao = {
  concluido: { text: 'Concluído', color: 'bg-green-500 text-white' },
  em_andamento: { text: 'Em Andamento', color: 'bg-blue-500 text-white' },
  parado: { text: 'Parado', color: 'bg-yellow-500 text-white' },
  pendente: { text: 'Pendente', color: 'bg-gray-500 text-white' },
};

// Dados de exemplo para movimentações (substituir por dados reais da API)
const movimentacoesExemplo: Movimentacao[] = [
  {
    id: '1',
    contentorId: 'CONT-001',
    tipo: 'coleta',
    descricao: 'Carga Coletada',
    local: 'Porto Maputo',
    dataHora: 'Hoje 08:30',
    status: 'concluido',
    latitude: -25.969248,
    longitude: 32.573174,
  },
  {
    id: '2',
    contentorId: 'CONT-001',
    tipo: 'transporte',
    descricao: 'Em Trânsito',
    local: 'EN1 - Aproximando de Xai-Xai',
    dataHora: 'Hoje 11:45',
    status: 'em_andamento',
    latitude: -25.051944,
    longitude: 33.644167,
  },
  {
    id: '3',
    contentorId: 'CONT-001',
    tipo: 'parada',
    descricao: 'Parada Programada',
    local: 'Posto Combustível - Xai-Xai',
    dataHora: 'Hoje 12:15',
    status: 'parado',
    latitude: -25.058056,
    longitude: 33.652222,
  },
  {
    id: '4',
    contentorId: 'CONT-001',
    tipo: 'descarga',
    descricao: 'Descarga no Cliente',
    local: 'Empresa A - Matola',
    dataHora: 'Ontem 16:20',
    status: 'concluido',
    latitude: -25.962222,
    longitude: 32.458889,
  },
];

// Ícones para tipos de movimentação
const getIconePorTipo = (tipo: string): string => {
  const icones: Record<string, string> = {
    carregamento: '📦',
    descarga: '🏭',
    transferencia: '🔄',
    inspecao: '🔍',
    coleta: '📦',
    transporte: '🚛',
    entrega: '📬',
    parada: '⏸️',
    fiscalizacao: '👮',
    manutencao: '🔧',
    default: '📍',
  };
  return icones[tipo] || icones.default;
};

// Componente para card de movimentação
const CardMovimentacao: React.FC<{ movimentacao: Movimentacao }> = ({ movimentacao }) => {
  const status = statusMovimentacao[movimentacao.status];

  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="bg-blue-500 text-white p-2 rounded-lg">
            {getIconePorTipo(movimentacao.tipo)}
          </span>
          <div>
            <p className="font-medium text-gray-900">{movimentacao.descricao}</p>
            <p className="text-sm text-gray-600">
              {movimentacao.local} • {movimentacao.dataHora}
            </p>
            {movimentacao.contentorId && (
              <p className="text-xs text-blue-600 font-medium mt-1">
                Contentor: {movimentacao.contentorId}
              </p>
            )}
          </div>
        </div>
        <span className={`px-2 py-1 rounded text-sm font-medium ${status.color}`}>
          {status.text}
        </span>
      </div>
      
      {/* Botões de ação */}
      {(movimentacao.latitude && movimentacao.longitude) && (
        <div className="mt-3 pt-3 border-t border-blue-200">
          <button
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            onClick={() => {
              window.open(
                `https://www.google.com/maps?q=${movimentacao.latitude},${movimentacao.longitude}`,
                '_blank'
              );
            }}
          >
            📍 Ver no Mapa
          </button>
        </div>
      )}
    </div>
  );
};

// Componente para o formulário de nova movimentação
const FormularioNovaMovimentacao: React.FC<{
  onSubmit: (dados: any) => void;
  loading: boolean;
  contentores: Contentor[];
}> = ({ onSubmit, loading, contentores }) => {
  const [formData, setFormData] = useState({
    contentorId: '',
    tipo: '',
    local: '',
    observacoes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contentor *
          </label>
          <select
            name="contentorId"
            value={formData.contentorId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
            required
            disabled={loading}
          >
            <option value="">Selecione o contentor</option>
            {contentores.map((contentor) => (
              <option key={contentor.id} value={contentor.codigo}>
                {contentor.numero} - {contentor.codigo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Movimentação *
          </label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
            required
            disabled={loading}
          >
            {tiposMovimentacao.map((tipo) => (
              <option key={tipo.value} value={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Local *
        </label>
        <input
          type="text"
          name="local"
          value={formData.local}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
          placeholder="Ex: Porto de Maputo, Armazém 3, Rua Principal 123"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Observações
        </label>
        <textarea
          name="observacoes"
          value={formData.observacoes}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
          placeholder="Descreva detalhes da movimentação..."
          disabled={loading}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
          onClick={() => setFormData({ contentorId: '', tipo: '', local: '', observacoes: '' })}
          disabled={loading}
        >
          Limpar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium flex items-center transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="animate-spin mr-2">⟳</span>
              Registrando...
            </>
          ) : (
            <>
              <span className="mr-2">📝</span>
              Registrar Movimentação
            </>
          )}
        </button>
      </div>
    </form>
  );
};

const MovimentacaoContentores: React.FC<MovimentacaoContentoresProps> = ({ contentores }) => {
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>(movimentacoesExemplo);
  const [filtroContentor, setFiltroContentor] = useState<string>('');
  const [filtroPeriodo, setFiltroPeriodo] = useState<string>('7dias');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string>('');
  const [sucesso, setSucesso] = useState<string>('');

  // Filtrar movimentações
  const movimentacoesFiltradas = movimentacoes.filter((mov) => {
    if (filtroContentor && mov.contentorId !== filtroContentor) return false;
    // Aqui adicionar lógica de filtro por período quando implementado
    return true;
  });

  // Carregar histórico da API (exemplo)
  const carregarHistorico = async () => {
    try {
      setLoading(true);
      // Substituir por chamada real à API
      // const response = await fetch('/api/movimentacoes', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ contentorId: filtroContentor, periodo: filtroPeriodo }),
      // });
      // const data = await response.json();
      // setMovimentacoes(data.movimentacoes);
      
      // Simulando carregamento
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
      setErro('Erro ao carregar histórico de movimentações');
      setLoading(false);
    }
  };

  // Registrar nova movimentação
  const registrarMovimentacao = async (dados: any) => {
    try {
      setLoading(true);
      setErro('');
      setSucesso('');

      // Validação
      if (!dados.contentorId || !dados.tipo || !dados.local) {
        throw new Error('Por favor, preencha todos os campos obrigatórios');
      }

      // Aqui a chamada real à API
      // const response = await fetch('/api/movimentacoes', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...dados,
      //     dataHora: new Date().toISOString(),
      //     status: 'pendente',
      //   }),
      // });
      // const result = await response.json();

      // Simulação de sucesso
      const novaMovimentacao: Movimentacao = {
        id: Date.now().toString(),
        contentorId: dados.contentorId,
        tipo: dados.tipo,
        descricao: `${dados.tipo.charAt(0).toUpperCase() + dados.tipo.slice(1)} - ${dados.local}`,
        local: dados.local,
        dataHora: 'Agora',
        status: 'pendente',
      };

      setMovimentacoes([novaMovimentacao, ...movimentacoes]);
      setSucesso('Movimentação registrada com sucesso!');
      
      // Limpar após 3 segundos
      setTimeout(() => {
        setSucesso('');
      }, 3000);

    } catch (error: any) {
      console.error('Erro ao registrar movimentação:', error);
      setErro(error.message || 'Erro ao registrar movimentação');
    } finally {
      setLoading(false);
    }
  };

  // Efeito para carregar histórico quando filtros mudarem
  useEffect(() => {
    carregarHistorico();
  }, [filtroContentor, filtroPeriodo]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Cabeçalho */}
      <div className="p-4 border-b border-gray-200 bg-green-50">
        <h3 className="font-semibold text-gray-900 flex items-center">
          <span className="bg-green-500 text-white p-2 rounded-lg mr-2">
            🚢
          </span>
          Movimentação e Histórico de Contentores
        </h3>
      </div>

      <div className="p-6">
        {/* Mensagens de status */}
        {sucesso && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              <p className="text-green-800">{sucesso}</p>
            </div>
          </div>
        )}

        {erro && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <span className="text-red-600 mr-2">✗</span>
              <p className="text-red-800">{erro}</p>
            </div>
          </div>
        )}

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contentor
            </label>
            <select
              value={filtroContentor}
              onChange={(e) => setFiltroContentor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
              disabled={loading}
            >
              <option value="">Todos os contentores</option>
              {contentores.map((contentor) => (
                <option key={contentor.id} value={contentor.codigo}>
                  {contentor.numero} - {contentor.codigo}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Período
            </label>
            <select
              value={filtroPeriodo}
              onChange={(e) => setFiltroPeriodo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950"
              disabled={loading}
            >
              {periodos.map((periodo) => (
                <option key={periodo.value} value={periodo.value}>
                  {periodo.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Histórico de Movimentação */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-gray-900">Histórico de Movimentações</h4>
            <span className="text-sm text-gray-600">
              {movimentacoesFiltradas.length} registros
            </span>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando histórico...</p>
            </div>
          ) : movimentacoesFiltradas.length > 0 ? (
            <div className="space-y-4">
              {movimentacoesFiltradas.map((movimentacao) => (
                <CardMovimentacao key={movimentacao.id} movimentacao={movimentacao} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-4xl mb-4">📭</div>
              <p className="text-gray-600 font-medium">Nenhuma movimentação encontrada</p>
              <p className="text-sm text-gray-500 mt-2">
                {filtroContentor 
                  ? `Nenhuma movimentação registrada para este contentor no período selecionado`
                  : 'Nenhuma movimentação registrada no período selecionado'}
              </p>
            </div>
          )}
        </div>

        {/* Nova Movimentação */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-semibold text-gray-900 mb-4">
            Registrar Nova Movimentação
          </h4>
          <FormularioNovaMovimentacao
            onSubmit={registrarMovimentacao}
            loading={loading}
            contentores={contentores}
          />
        </div>

        {/* Estatísticas Rápidas */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600">Total Movimentações</p>
            <p className="text-2xl font-bold text-gray-900">{movimentacoes.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-gray-600">Concluídas</p>
            <p className="text-2xl font-bold text-gray-900">
              {movimentacoes.filter(m => m.status === 'concluido').length}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-sm text-gray-600">Em Andamento</p>
            <p className="text-2xl font-bold text-gray-900">
              {movimentacoes.filter(m => m.status === 'em_andamento').length}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Última 24h</p>
            <p className="text-2xl font-bold text-gray-900">
              {movimentacoes.filter(m => m.dataHora.includes('Hoje') || m.dataHora.includes('Agora')).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovimentacaoContentores;
export type { Contentor, Movimentacao };