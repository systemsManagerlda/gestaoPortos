import React, { useState, useEffect } from 'react';

// Definição dos enums para validação
const ENUMS = {
  moeda: ['MZN', 'USD', 'EUR', 'ZAR', 'GBP', 'CNY'],
  natureza: ['debito', 'credito'],
  tipoLancamento: [
    'receita_operacional',
    'receita_nao_operacional', 
    'despesa_operacional',
    'despesa_financeira',
    'ativo_circulante',
    'passivo_circulante',
    'patrimonio_liquido'
  ],
  categoriaContabil: [
    'vendas', 'servicos', 'custos', 'despesas_adm', 
    'despesas_financeiras', 'estoques', 'fornecedores', 
    'capital', 'fiscal', 'outro'
  ]
};

// Função para mapear tipo de lançamento para categoria
const getCategoriaByTipo = (tipoLancamento) => {
  const categorias = {
    'receita_operacional': 'vendas',
    'receita_nao_operacional': 'servicos',
    'despesa_operacional': 'despesas_adm',
    'despesa_financeira': 'despesas_financeiras',
    'ativo_circulante': 'estoques',
    'passivo_circulante': 'fornecedores',
    'patrimonio_liquido': 'capital'
  };
  return categorias[tipoLancamento] || 'outro';
};

// Função para determinar tipo da conta pelo código
const getContaTipo = (codigo) => {
  if (!codigo) return "ativo";
  const firstDigit = codigo.charAt(0);
  switch(firstDigit) {
    case '1': return "ativo";      // Ativo
    case '2': return "ativo";      // Ativo não circulante
    case '3': return "passivo";    // Passivo
    case '4': return "receita";    // Receitas
    case '5': return "resultado";  // Custos
    case '6': return "despesa";    // Despesas
    case '7': return "despesa";    // Outras despesas
    case '8': return "resultado";  // Outros resultados
    case '9': return "patrimonio"; // Patrimônio líquido
    default: return "ativo";
  }
};

const ModalLancamento = ({ isOpen, onClose, lancamento, onSubmit }) => {
  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    dataLancamento: new Date().toISOString().split('T')[0],
    dataCompetencia: new Date().toISOString().split('T')[0],
    natureza: 'debito',
    tipoLancamento: '',
    contaDebito: { codigo: '', descricao: '' },
    contaCredito: { codigo: '', descricao: '' },
    historicoContabil: '',
    moeda: 'MZN',
    categoriaContabil: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (lancamento) {
      setFormData({
        ...lancamento,
        dataLancamento: lancamento.dataLancamento ? 
          new Date(lancamento.dataLancamento).toISOString().split('T')[0] : 
          new Date().toISOString().split('T')[0],
        dataCompetencia: lancamento.dataCompetencia ? 
          new Date(lancamento.dataCompetencia).toISOString().split('T')[0] : 
          new Date().toISOString().split('T')[0],
        valor: lancamento.valor || '',
        moeda: lancamento.moeda || 'MZN',
        categoriaContabil: lancamento.categoriaContabil || getCategoriaByTipo(lancamento.tipoLancamento)
      });
    } else {
      // Reset para valores padrão quando criar novo
      setFormData({
        descricao: '',
        valor: '',
        dataLancamento: new Date().toISOString().split('T')[0],
        dataCompetencia: new Date().toISOString().split('T')[0],
        natureza: 'debito',
        tipoLancamento: '',
        contaDebito: { codigo: '', descricao: '' },
        contaCredito: { codigo: '', descricao: '' },
        historicoContabil: '',
        moeda: 'MZN',
        categoriaContabil: ''
      });
    }
    setErrors({});
  }, [lancamento, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    // Validações obrigatórias
    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    }
    
    if (!formData.valor || parseFloat(formData.valor) <= 0) {
      newErrors.valor = 'Valor deve ser maior que zero';
    }
    
    if (!formData.historicoContabil.trim()) {
      newErrors.historicoContabil = 'Histórico contábil é obrigatório';
    }
    
    if (!formData.tipoLancamento) {
      newErrors.tipoLancamento = 'Tipo de lançamento é obrigatório';
    }
    
    if (!formData.contaDebito.codigo.trim() || !formData.contaDebito.descricao.trim()) {
      newErrors.contaDebito = 'Conta débito é obrigatória';
    }
    
    if (!formData.contaCredito.codigo.trim() || !formData.contaCredito.descricao.trim()) {
      newErrors.contaCredito = 'Conta crédito é obrigatória';
    }
    
    if (formData.contaDebito.codigo === formData.contaCredito.codigo) {
      newErrors.contas = 'Conta débito e crédito não podem ser iguais';
    }
    
    // Validação de datas
    const dataLancamento = new Date(formData.dataLancamento);
    const dataCompetencia = new Date(formData.dataCompetencia);
    
    if (isNaN(dataLancamento.getTime())) {
      newErrors.dataLancamento = 'Data de lançamento inválida';
    } else if (dataLancamento > new Date()) {
      newErrors.dataLancamento = 'Data de lançamento não pode ser futura';
    }
    
    if (isNaN(dataCompetencia.getTime())) {
      newErrors.dataCompetencia = 'Data de competência inválida';
    } else if (dataCompetencia > new Date()) {
      newErrors.dataCompetencia = 'Data de competência não pode ser futura';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Limpar erros antes de enviar
      setErrors({});
      
      // Preparar dados para envio
      const dadosEnviar = {
        ...formData,
        valor: parseFloat(formData.valor),
        contaDebito: {
          ...formData.contaDebito,
          tipo: getContaTipo(formData.contaDebito.codigo)
        },
        contaCredito: {
          ...formData.contaCredito,
          tipo: getContaTipo(formData.contaCredito.codigo)
        },
        categoriaContabil: formData.categoriaContabil || getCategoriaByTipo(formData.tipoLancamento),
        moeda: ENUMS.moeda.includes(formData.moeda) ? formData.moeda : 'MZN',
        // Campos adicionais necessários para a API
        criadoPor: localStorage.getItem('userId') || 'usuario_atual',
        status: 'rascunho',
        statusConciliacao: 'nao_conciliado',
        sequenciaAutomatica: true,
        tipoSequencia: 'anual',
        planoContas: 'nacional',
        origemLancamento: 'manual',
        aprovacao: { status: 'pendente' },
        controleInterno: { risco: 'baixo', conformidade: 'pendente' },
        tributacao: {
          iva: {
            tipo: 'nao_aplicavel',
            valor: 0
          }
        },
        exercicio: {
          ano: new Date(formData.dataCompetencia).getFullYear(),
          periodo: 'mensal',
          mes: new Date(formData.dataCompetencia).getMonth() + 1,
          trimestre: Math.ceil((new Date(formData.dataCompetencia).getMonth() + 1) / 3)
        }
      };

      // Se for edição, incluir o ID
      if (lancamento?.lancamentoId) {
        dadosEnviar.lancamentoId = lancamento.lancamentoId;
      }
      
      console.log('Dados a serem enviados:', dadosEnviar);
      await onSubmit(dadosEnviar);
      onClose();
    } catch (error) {
      console.error('Erro no submit:', error);
      setErrors({ 
        submit: error.message || 'Erro ao salvar lançamento. Verifique os dados e tente novamente.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Atualizar categoria automaticamente quando mudar tipo de lançamento
    if (field === 'tipoLancamento') {
      setFormData(prev => ({
        ...prev,
        tipoLancamento: value,
        categoriaContabil: getCategoriaByTipo(value)
      }));
    }
    
    // Limpar erro do campo quando alterado
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleContaChange = (conta, field, value) => {
    setFormData(prev => ({
      ...prev,
      [conta]: {
        ...prev[conta],
        [field]: value
      }
    }));
    
    // Limpar erro das contas
    if (errors[conta] || errors.contas) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[conta];
        delete newErrors.contas;
        return newErrors;
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 bg-blue-50 sticky top-0">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-900 text-lg">
              {lancamento ? 'Editar Lançamento' : 'Novo Lançamento Contábil'}
            </h3>
            <button
              onClick={onClose}
              disabled={submitting}
              className="text-gray-500 hover:text-gray-700 text-xl disabled:opacity-50"
            >
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {errors.submit}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data do Lançamento *
              </label>
              <input
                type="date"
                required
                value={formData.dataLancamento}
                onChange={(e) => handleChange('dataLancamento', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950 ${
                  errors.dataLancamento ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.dataLancamento && (
                <p className="mt-1 text-sm text-red-600">{errors.dataLancamento}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Competência *
              </label>
              <input
                type="date"
                required
                value={formData.dataCompetencia}
                onChange={(e) => handleChange('dataCompetencia', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950 ${
                  errors.dataCompetencia ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.dataCompetencia && (
                <p className="mt-1 text-sm text-red-600">{errors.dataCompetencia}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Natureza *
              </label>
              <select
                required
                value={formData.natureza}
                onChange={(e) => handleChange('natureza', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
              >
                <option value="debito">Débito</option>
                <option value="credito">Crédito</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Lançamento *
              </label>
              <select
                required
                value={formData.tipoLancamento}
                onChange={(e) => handleChange('tipoLancamento', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950 ${
                  errors.tipoLancamento ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione o tipo</option>
                <option value="receita_operacional">Receita Operacional</option>
                <option value="receita_nao_operacional">Receita Não Operacional</option>
                <option value="despesa_operacional">Despesa Operacional</option>
                <option value="despesa_financeira">Despesa Financeira</option>
                <option value="ativo_circulante">Ativo Circulante</option>
                <option value="passivo_circulante">Passivo Circulante</option>
                <option value="patrimonio_liquido">Patrimônio Líquido</option>
              </select>
              {errors.tipoLancamento && (
                <p className="mt-1 text-sm text-red-600">{errors.tipoLancamento}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Moeda *
              </label>
              <select
                value={formData.moeda}
                onChange={(e) => handleChange('moeda', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
              >
                <option value="MZN">MZN (Metical)</option>
                <option value="USD">USD (Dólar)</option>
                <option value="EUR">EUR (Euro)</option>
                <option value="ZAR">ZAR (Rand)</option>
                <option value="GBP">GBP (Libra)</option>
                <option value="CNY">CNY (Yuan)</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conta Débito *
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="Código (ex: 1.1.1.01)"
                    value={formData.contaDebito.codigo}
                    onChange={(e) => handleContaChange('contaDebito', 'codigo', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950 ${
                      errors.contaDebito ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <input
                    type="text"
                    required
                    placeholder="Descrição (ex: Caixa)"
                    value={formData.contaDebito.descricao}
                    onChange={(e) => handleContaChange('contaDebito', 'descricao', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950 ${
                      errors.contaDebito ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.contaDebito && (
                  <p className="mt-1 text-sm text-red-600">{errors.contaDebito}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conta Crédito *
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="Código (ex: 4.1.1.01)"
                    value={formData.contaCredito.codigo}
                    onChange={(e) => handleContaChange('contaCredito', 'codigo', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950 ${
                      errors.contaCredito ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <input
                    type="text"
                    required
                    placeholder="Descrição (ex: Receita)"
                    value={formData.contaCredito.descricao}
                    onChange={(e) => handleContaChange('contaCredito', 'descricao', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950 ${
                      errors.contaCredito ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.contaCredito && (
                  <p className="mt-1 text-sm text-red-600">{errors.contaCredito}</p>
                )}
                {errors.contas && (
                  <p className="mt-1 text-sm text-red-600">{errors.contas}</p>
                )}
              </div>
            </div>

            <div className="text-sm text-gray-500">
              <p>Dica: Use códigos como 1.1.1.01 (Ativo), 4.1.1.01 (Receita), 6.2.1.01 (Despesa)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.valor}
                onChange={(e) => handleChange('valor', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950 ${
                  errors.valor ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0,00"
              />
              {errors.valor && (
                <p className="mt-1 text-sm text-red-600">{errors.valor}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria Contábil
              </label>
              <input
                type="text"
                value={formData.categoriaContabil || getCategoriaByTipo(formData.tipoLancamento)}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
              <p className="text-xs text-gray-500 mt-1">
                Definida automaticamente pelo tipo de lançamento
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição do Lançamento *
            </label>
            <input
              type="text"
              required
              value={formData.descricao}
              onChange={(e) => handleChange('descricao', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950 ${
                errors.descricao ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ex: Recebimento transporte para Cimentos MZ"
            />
            {errors.descricao && (
              <p className="mt-1 text-sm text-red-600">{errors.descricao}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Histórico Contábil *
            </label>
            <textarea
              required
              value={formData.historicoContabil}
              onChange={(e) => handleChange('historicoContabil', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950 ${
                errors.historicoContabil ? 'border-red-500' : 'border-gray-300'
              }`}
              rows="3"
              placeholder="Digite o histórico contábil completo..."
            />
            {errors.historicoContabil && (
              <p className="mt-1 text-sm text-red-600">{errors.historicoContabil}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors duration-200 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {submitting && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {submitting ? 'Salvando...' : (lancamento ? 'Atualizar' : 'Registrar Lançamento')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalLancamento;