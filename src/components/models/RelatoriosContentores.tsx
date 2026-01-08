import React, { useState } from 'react';

// Remova a interface vazia ou adicione props específicas
// interface RelatoriosContentoresProps {} // ❌ REMOVA ESTA LINHA

// Se não precisa de props, remova completamente ou use apenas React.FC
const RelatoriosContentores: React.FC = () => {
  const [tipoRelatorio, setTipoRelatorio] = useState('Relatório de Utilização');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGerarRelatorio = () => {
    setLoading(true);
    // Simula o carregamento do relatório
    setTimeout(() => {
      setLoading(false);
      // Aqui você implementaria a lógica para gerar o relatório
      console.log('Relatório gerado:', { tipoRelatorio, dataInicial, dataFinal });
      // Poderia ser uma chamada API, download de arquivo, etc.
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-4 border-b border-gray-200 bg-purple-50">
        <h3 className="font-semibold text-gray-900 flex items-center">
          <span className="bg-purple-500 text-white p-2 rounded-lg mr-2">
            📊
          </span>
          Relatórios de Contentores
        </h3>
      </div>
      <div className="p-6">
        {/* Cards de tipos de relatório */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer">
            <div className="text-blue-600 text-lg mb-2">📦</div>
            <p className="font-medium text-gray-900">Inventário</p>
            <p className="text-sm text-gray-600">Contentores activos</p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors cursor-pointer">
            <div className="text-green-600 text-lg mb-2">🚢</div>
            <p className="font-medium text-gray-900">Movimentação</p>
            <p className="text-sm text-gray-600">Histórico de viagens</p>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-colors cursor-pointer">
            <div className="text-yellow-600 text-lg mb-2">⏱️</div>
            <p className="font-medium text-gray-900">Tempos</p>
            <p className="text-sm text-gray-600">Estatísticas de uso</p>
          </div>
          
          <div className="p-4 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors cursor-pointer">
            <div className="text-red-600 text-lg mb-2">⚠️</div>
            <p className="font-medium text-gray-900">Alertas</p>
            <p className="text-sm text-gray-600">Notificações do sistema</p>
          </div>
        </div>

        {/* Formulário para gerar relatório personalizado */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">
            Gerar Relatório Personalizado
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Relatório
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={tipoRelatorio}
                onChange={(e) => setTipoRelatorio(e.target.value)}
              >
                <option value="Relatório de Utilização">Relatório de Utilização</option>
                <option value="Contentores por Status">Contentores por Status</option>
                <option value="Movimentação por Período">Movimentação por Período</option>
                <option value="Alertas e Incidentes">Alertas e Incidentes</option>
                <option value="Inventário Completo">Inventário Completo</option>
                <option value="Estatísticas de Tempo">Estatísticas de Tempo</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Inicial
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={dataInicial}
                onChange={(e) => setDataInicial(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Final
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={dataFinal}
                onChange={(e) => setDataFinal(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={handleGerarRelatorio}
              disabled={loading}
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  Gerando...
                </>
              ) : (
                <>
                  <span className="mr-2">📄</span>
                  Gerar Relatório
                </>
              )}
            </button>
            
            <button
              onClick={() => {
                setTipoRelatorio('Relatório de Utilização');
                setDataInicial('');
                setDataFinal('');
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Limpar
            </button>
            
            <div className="flex-1"></div>
            
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition-colors flex items-center">
              <span className="mr-2">📥</span>
              Exportar PDF
            </button>
            
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium transition-colors flex items-center">
              <span className="mr-2">📊</span>
              Exportar Excel
            </button>
          </div>
          
          {/* Mensagem informativa */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Dica:</span> Selecione o tipo de relatório e o período desejado para gerar um relatório personalizado. 
              Os relatórios podem ser exportados em PDF ou Excel.
            </p>
          </div>
        </div>
        
        {/* Relatórios pré-formatados rápidos */}
        <div className="mt-8">
          <h4 className="font-medium text-gray-900 mb-4">
            Relatórios Rápidos
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Relatório Diário</p>
                  <p className="text-sm text-gray-600">Sumário das atividades do dia</p>
                </div>
                <span className="text-blue-500">📈</span>
              </div>
            </button>
            
            <button className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Relatório Semanal</p>
                  <p className="text-sm text-gray-600">Análise da semana em curso</p>
                </div>
                <span className="text-green-500">📅</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatoriosContentores;