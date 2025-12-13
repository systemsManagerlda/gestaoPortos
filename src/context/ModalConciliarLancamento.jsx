import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const ModalConciliarLancamento = ({ isOpen, onClose, lancamento, onConciliar }) => {
  const [formData, setFormData] = useState({
    banco: '',
    agencia: '',
    conta: '',
    numeroDocumento: '',
    valorConciliado: lancamento?.valor || 0,
    observacoes: '',
    tipoConciliacao: 'manual',
    status: 'totalmente'
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Inicializar formData quando o modal abrir
  useEffect(() => {
    if (lancamento) {
      setFormData(prev => ({
        ...prev,
        valorConciliado: lancamento.valor || 0,
        numeroDocumento: lancamento.documento?.numero || '',
        // Preencher com dados existentes se houver
        ...(lancamento.historicoConciliacao && lancamento.historicoConciliacao.length > 0 ? {
          banco: lancamento.historicoConciliacao[0].banco || '',
          agencia: lancamento.historicoConciliacao[0].agencia || '',
          conta: lancamento.historicoConciliacao[0].conta || '',
          observacoes: lancamento.historicoConciliacao[0].observacoes || ''
        } : {})
      }));
    }
  }, [lancamento]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Limpar erro do campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.valorConciliado || formData.valorConciliado <= 0) {
      newErrors.valorConciliado = 'Valor conciliado deve ser maior que zero';
    }

    if (formData.valorConciliado && lancamento?.valor) {
      const diferenca = Math.abs(lancamento.valor - formData.valorConciliado);
      if (diferenca > 0.01) { // Tolerância de 0.01
        newErrors.valorConciliado = `Diferença detectada: ${diferenca.toFixed(2)}`;
      }
    }

    if (!formData.banco.trim()) {
      newErrors.banco = 'Nome do banco é obrigatório';
    }

    if (!formData.conta.trim()) {
      newErrors.conta = 'Número da conta é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Preparar dados para conciliação
      const dadosConciliacao = {
        lancamentoId: lancamento.lancamentoId,
        usuario: 'usuario_atual', // Substituir pelo usuário logado
        dataConciliacao: new Date().toISOString(),
        banco: formData.banco,
        agencia: formData.agencia,
        conta: formData.conta,
        numeroDocumento: formData.numeroDocumento || lancamento.documento?.numero || '',
        valorConciliado: parseFloat(formData.valorConciliado),
        observacoes: formData.observacoes,
        tipoConciliacao: formData.tipoConciliacao,
        statusConciliacao: formData.status
      };

      // Chamar função de conciliação
      await onConciliar(dadosConciliacao);
      onClose();
    } catch (error) {
      console.error('Erro ao conciliar lançamento:', error);
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Calcular diferença se houver
  const diferenca = lancamento?.valor ? lancamento.valor - formData.valorConciliado : 0;
  const temDiferenca = Math.abs(diferenca) > 0.01;

  if (!isOpen || !lancamento) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 text-gray-950">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-green-800 text-white px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Conciliar Lançamento</h2>
            <p className="text-sm text-green-300">
              {lancamento.numeroLancamento} - {lancamento.descricao}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-green-300 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-8rem)]">
          <div className="p-6 space-y-6">
            {errors.submit && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {errors.submit}
              </div>
            )}

            {/* Informações do Lançamento */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">Informações do Lançamento</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-gray-500">Valor Original</p>
                  <p className="text-lg font-bold text-gray-900">
                    {new Intl.NumberFormat('pt-MZ', {
                      style: 'currency',
                      currency: lancamento.moeda || 'MZN'
                    }).format(lancamento.valor || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Natureza</p>
                  <p className={`text-lg font-bold ${lancamento.natureza === 'debito' ? 'text-green-600' : 'text-red-600'}`}>
                    {lancamento.natureza === 'debito' ? 'Débito' : 'Crédito'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Conta Débito</p>
                  <p className="text-sm font-medium text-gray-900">{lancamento.contaDebito?.codigo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Conta Crédito</p>
                  <p className="text-sm font-medium text-gray-900">{lancamento.contaCredito?.codigo}</p>
                </div>
              </div>
            </div>

            {/* Dados da Conciliação */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Dados da Conciliação</h3>

              {/* Dados Bancários */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Banco *
                  </label>
                  <input
                    type="text"
                    name="banco"
                    value={formData.banco}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.banco ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ex: BCI, Standard Bank"
                    required
                  />
                  {errors.banco && (
                    <p className="mt-1 text-sm text-red-600">{errors.banco}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Agência
                  </label>
                  <input
                    type="text"
                    name="agencia"
                    value={formData.agencia}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Número da agência"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Conta *
                  </label>
                  <input
                    type="text"
                    name="conta"
                    value={formData.conta}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.conta ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Número da conta"
                    required
                  />
                  {errors.conta && (
                    <p className="mt-1 text-sm text-red-600">{errors.conta}</p>
                  )}
                </div>
              </div>

              {/* Valor e Documento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valor Conciliado *
                  </label>
                  <input
                    type="number"
                    name="valorConciliado"
                    value={formData.valorConciliado}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.valorConciliado ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.valorConciliado && (
                    <p className="mt-1 text-sm text-red-600">{errors.valorConciliado}</p>
                  )}
                  {temDiferenca && (
                    <p className={`mt-1 text-sm ${diferenca > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                      Diferença: {diferenca > 0 ? '+' : ''}{diferenca.toFixed(2)} 
                      {diferenca > 0 ? ' (a mais)' : ' (a menos)'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número do Documento
                  </label>
                  <input
                    type="text"
                    name="numeroDocumento"
                    value={formData.numeroDocumento}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Número do extrato/comprovante"
                  />
                </div>
              </div>

              {/* Configurações da Conciliação */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Conciliação
                  </label>
                  <select
                    name="tipoConciliacao"
                    value={formData.tipoConciliacao}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="manual">Manual</option>
                    <option value="automatica">Automática</option>
                    <option value="semiautomatica">Semi-automática</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status da Conciliação
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="totalmente">Totalmente Conciliado</option>
                    <option value="parcial">Parcialmente Conciliado</option>
                    <option value="discrepante">Com Discrepância</option>
                  </select>
                </div>
              </div>

              {/* Observações */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observações
                </label>
                <textarea
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Observações sobre a conciliação..."
                />
                <p className="mt-1 text-sm text-gray-500">
                  Descreva qualquer observação relevante sobre a conciliação.
                </p>
              </div>

              {/* Resumo */}
              {temDiferenca && (
                <div className={`p-4 rounded-lg ${diferenca > 0 ? 'bg-orange-50 border border-orange-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${diferenca > 0 ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'}`}>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-gray-900">
                        {diferenca > 0 ? 'Valor conciliado maior que o original' : 'Valor conciliado menor que o original'}
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        Diferença de {Math.abs(diferenca).toFixed(2)} ({lancamento.moeda || 'MZN'})
                        {diferenca > 0 
                          ? '. O valor no extrato é maior que o lançado.'
                          : '. O valor no extrato é menor que o lançado.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!temDiferenca && formData.valorConciliado > 0 && (
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-green-900">Valores coincidem</h4>
                      <p className="mt-1 text-sm text-green-700">
                        O valor conciliado corresponde ao valor original do lançamento.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              disabled={loading}
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                temDiferenca 
                  ? 'bg-orange-600 hover:bg-orange-700' 
                  : 'bg-green-600 hover:bg-green-700'
              } disabled:opacity-50`}
            >
              {loading ? (
                <>
                  <span className="animate-spin inline-block mr-2">⟳</span>
                  Conciliando...
                </>
              ) : temDiferenca ? (
                'Conciliar com Discrepância'
              ) : (
                'Conciliar Lançamento'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalConciliarLancamento;