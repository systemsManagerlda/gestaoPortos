import React, { useState } from 'react';

const FiltrosLancamentos = ({ onFilter, loading }) => {
  const [filtros, setFiltros] = useState({
    status: '',
    tipoLancamento: '',
    dataInicio: '',
    dataFim: '',
    contaCodigo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filtros);
  };

  const handleClear = () => {
    setFiltros({
      status: '',
      tipoLancamento: '',
      dataInicio: '',
      dataFim: '',
      contaCodigo: ''
    });
    onFilter({});
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={filtros.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-950"
          >
            <option value="">Todos</option>
            <option value="pendente">Pendente</option>
            <option value="conferido">Conferido</option>
            <option value="conciliado">Conciliado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Tipo</label>
          <select
            name="tipoLancamento"
            value={filtros.tipoLancamento}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-950"
          >
            <option value="">Todos</option>
            <option value="receita_operacional">Receita Operacional</option>
            <option value="despesa_operacional">Despesa Operacional</option>
            <option value="ativo_circulante">Ativo Circulante</option>
            <option value="passivo_circulante">Passivo Circulante</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Data Início</label>
          <input
            type="date"
            name="dataInicio"
            value={filtros.dataInicio}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-950"
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Data Fim</label>
          <input
            type="date"
            name="dataFim"
            value={filtros.dataFim}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-950"
          />
        </div>
        
        <div className="flex items-end space-x-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Carregando...' : 'Filtrar'}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium"
          >
            Limpar
          </button>
        </div>
      </div>
    </form>
  );
};

export default FiltrosLancamentos;