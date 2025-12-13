import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ModalDetalhesLancamento = ({ isOpen, onClose, lancamento }) => {
  if (!isOpen || !lancamento) return null;

  // Função para formatar valores monetários
  const formatCurrency = (value, currency = 'MZN') => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value || 0);
  };

  // Função para formatar datas
  const formatDate = (dateString) => {
    if (!dateString) return 'Não informado';
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch (error) {
      return 'Data inválida';
    }
  };

  // Função para renderizar status com cores
  const getStatusBadge = (status) => {
    const colors = {
      'rascunho': 'bg-gray-100 text-gray-800',
      'pendente': 'bg-yellow-100 text-yellow-800',
      'conferido': 'bg-blue-100 text-blue-800',
      'aprovado': 'bg-purple-100 text-purple-800',
      'conciliado': 'bg-green-100 text-green-800',
      'contabilizado': 'bg-indigo-100 text-indigo-800',
      'cancelado': 'bg-red-100 text-red-800',
      'estornado': 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  // Função para renderizar natureza
  const getNaturezaBadge = (natureza) => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        natureza === 'debito' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {natureza === 'debito' ? 'Débito' : 'Crédito'}
      </span>
    );
  };

  // Seção de informações básicas
  const renderInformacoesBasicas = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Básicas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Número do Lançamento</p>
          <p className="text-base text-gray-900">{lancamento.numeroLancamento}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">ID do Lançamento</p>
          <p className="text-base text-gray-900 font-mono">{lancamento.lancamentoId}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Descrição</p>
          <p className="text-base text-gray-900">{lancamento.descricao}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Histórico Contábil</p>
          <p className="text-base text-gray-900">{lancamento.historicoContabil}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Status</p>
          <div className="mt-1">{getStatusBadge(lancamento.status)}</div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Natureza</p>
          <div className="mt-1">{getNaturezaBadge(lancamento.natureza)}</div>
        </div>
      </div>
    </div>
  );

  // Seção de valores
  const renderValores = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Valores</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm font-medium text-blue-700">Valor Principal</p>
          <p className="text-xl font-bold text-blue-900">
            {formatCurrency(lancamento.valor, lancamento.moeda)}
          </p>
          <p className="text-xs text-blue-600 mt-1">Moeda: {lancamento.moeda || 'MZN'}</p>
        </div>
        
        {lancamento.taxaCambio && lancamento.taxaCambio !== 1 && (
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-green-700">Taxa de Câmbio</p>
            <p className="text-xl font-bold text-green-900">
              {lancamento.taxaCambio.toFixed(4)}
            </p>
            {lancamento.valorConvertido && (
              <p className="text-xs text-green-600 mt-1">
                Convertido: {formatCurrency(lancamento.valorConvertido, lancamento.moeda)}
              </p>
            )}
          </div>
        )}

        <div className="bg-purple-50 p-3 rounded-lg">
          <p className="text-sm font-medium text-purple-700">Tipo de Lançamento</p>
          <p className="text-lg font-semibold text-purple-900 capitalize">
            {lancamento.tipoLancamento?.replace(/_/g, ' ') || 'Não especificado'}
          </p>
          <p className="text-xs text-purple-600 mt-1">
            Categoria: {lancamento.categoriaContabil?.replace(/_/g, ' ') || 'Não especificada'}
          </p>
        </div>
      </div>
    </div>
  );

  // Seção de contas contábeis
  const renderContas = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Contas Contábeis</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Conta Débito */}
        <div className="border-l-4 border-blue-500 pl-4">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <h4 className="font-medium text-blue-900">Conta Débito</h4>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium text-gray-500">Código</p>
              <p className="text-base text-gray-900">{lancamento.contaDebito?.codigo || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Descrição</p>
              <p className="text-base text-gray-900">{lancamento.contaDebito?.descricao || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Tipo</p>
              <p className="text-base text-gray-900 capitalize">{lancamento.contaDebito?.tipo || 'Não informado'}</p>
            </div>
          </div>
        </div>

        {/* Conta Crédito */}
        <div className="border-l-4 border-green-500 pl-4">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <h4 className="font-medium text-green-900">Conta Crédito</h4>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium text-gray-500">Código</p>
              <p className="text-base text-gray-900">{lancamento.contaCredito?.codigo || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Descrição</p>
              <p className="text-base text-gray-900">{lancamento.contaCredito?.descricao || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Tipo</p>
              <p className="text-base text-gray-900 capitalize">{lancamento.contaCredito?.tipo || 'Não informado'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Seção de datas
  const renderDatas = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Datas</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm font-medium text-gray-500">Data de Lançamento</p>
          <p className="text-base font-medium text-gray-900">{formatDate(lancamento.dataLancamento)}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm font-medium text-gray-500">Data de Competência</p>
          <p className="text-base font-medium text-gray-900">{formatDate(lancamento.dataCompetencia)}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm font-medium text-gray-500">Data de Vencimento</p>
          <p className="text-base font-medium text-gray-900">{formatDate(lancamento.dataVencimento) || 'Não informado'}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm font-medium text-gray-500">Exercício</p>
          <p className="text-base font-medium text-gray-900">
            {lancamento.exercicio?.ano || new Date().getFullYear()}
            {lancamento.exercicio?.mes ? ` - Mês ${lancamento.exercicio.mes}` : ''}
          </p>
        </div>
      </div>
    </div>
  );

  // Seção de tributação
  const renderTributacao = () => {
    if (!lancamento.tributacao) return null;

    const iva = lancamento.tributacao.iva;
    const irps = lancamento.tributacao.irps;
    const inss = lancamento.tributacao.inss;

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tributação</h3>
        
        <div className="space-y-4">
          {/* IVA */}
          {iva && (
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-medium text-gray-900 mb-2">IVA</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div>
                  <p className="text-xs font-medium text-gray-500">Tipo</p>
                  <p className="text-sm text-gray-900">{iva.tipo || 'Não informado'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Regime</p>
                  <p className="text-sm text-gray-900">{iva.regime || 'Não informado'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Percentual</p>
                  <p className="text-sm text-gray-900">{iva.percentual ? `${iva.percentual}%` : '0%'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Valor</p>
                  <p className="text-sm text-gray-900">{formatCurrency(iva.valor, lancamento.moeda)}</p>
                </div>
              </div>
            </div>
          )}

          {/* IRPS */}
          {irps && irps.aplicavel && (
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-medium text-gray-900 mb-2">IRPS</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div>
                  <p className="text-xs font-medium text-gray-500">Regime</p>
                  <p className="text-sm text-gray-900">{irps.regime || 'Não informado'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Percentual</p>
                  <p className="text-sm text-gray-900">{irps.percentual ? `${irps.percentual}%` : '0%'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Valor</p>
                  <p className="text-sm text-gray-900">{formatCurrency(irps.valor, lancamento.moeda)}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Base de Cálculo</p>
                  <p className="text-sm text-gray-900">{formatCurrency(irps.baseCalculo, lancamento.moeda)}</p>
                </div>
              </div>
            </div>
          )}

          {/* INSS */}
          {inss && inss.aplicavel && (
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-medium text-gray-900 mb-2">INSS</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div>
                  <p className="text-xs font-medium text-gray-500">Tipo</p>
                  <p className="text-sm text-gray-900">{inss.tipoContribuicao || 'Não informado'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Percentual</p>
                  <p className="text-sm text-gray-900">{inss.percentual ? `${inss.percentual}%` : '0%'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Valor</p>
                  <p className="text-sm text-gray-900">{formatCurrency(inss.valor, lancamento.moeda)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Seção de rateio
  const renderRateio = () => {
    if (!lancamento.rateio || lancamento.rateio.length === 0) return null;

    const totalRateado = lancamento.rateio.reduce((sum, item) => sum + (item.valor || 0), 0);
    const totalPercentual = lancamento.rateio.reduce((sum, item) => sum + (item.percentual || 0), 0);

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rateio</h3>
        
        <div className="space-y-3">
          {lancamento.rateio.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">{item.centroCusto?.descricao || `Centro de Custo ${index + 1}`}</p>
                    <p className="text-sm text-gray-500">{item.centroCusto?.codigo || 'Sem código'}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500">Percentual</p>
                  <p className="text-lg font-semibold text-blue-600">{item.percentual || 0}%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500">Valor</p>
                  <p className="text-lg font-semibold text-green-600">
                    {formatCurrency(item.valor, lancamento.moeda)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Resumo do rateio */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Rateado</p>
                <p className="text-xs text-blue-600">{lancamento.rateio.length} centro(s) de custo</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-900">
                  {formatCurrency(totalRateado, lancamento.moeda)}
                </p>
                <p className="text-sm text-blue-700">({totalPercentual.toFixed(2)}% do total)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Seção de documentos
  const renderDocumentos = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Documentos</h3>
      
      <div className="space-y-4">
        {/* Documento principal */}
        {lancamento.documento && (
          <div className="border-l-4 border-gray-300 pl-4">
            <h4 className="font-medium text-gray-900 mb-2">Documento Principal</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {lancamento.documento.tipo && (
                <div>
                  <p className="text-xs font-medium text-gray-500">Tipo</p>
                  <p className="text-sm text-gray-900 capitalize">{lancamento.documento.tipo.replace(/_/g, ' ')}</p>
                </div>
              )}
              {lancamento.documento.numero && (
                <div>
                  <p className="text-xs font-medium text-gray-500">Número</p>
                  <p className="text-sm text-gray-900">{lancamento.documento.numero}</p>
                </div>
              )}
              {lancamento.documento.dataEmissao && (
                <div>
                  <p className="text-xs font-medium text-gray-500">Data de Emissão</p>
                  <p className="text-sm text-gray-900">{formatDate(lancamento.documento.dataEmissao)}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Anexos */}
        {lancamento.anexos && lancamento.anexos.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Anexos ({lancamento.anexos.length})</h4>
            <div className="space-y-2">
              {lancamento.anexos.map((anexo, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded mr-3">
                      <span className="text-xs font-medium text-gray-600">
                        {anexo.tipo === 'pdf' ? 'PDF' : 
                         anexo.tipo === 'imagem' ? 'IMG' : 
                         anexo.tipo === 'excel' ? 'XLS' : 
                         anexo.tipo === 'word' ? 'DOC' : 'DOC'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{anexo.nome}</p>
                      <p className="text-xs text-gray-500">
                        {anexo.descricao && `${anexo.descricao} • `}
                        {anexo.dataUpload && `Enviado em ${formatDate(anexo.dataUpload)}`}
                      </p>
                    </div>
                  </div>
                  {anexo.url && (
                    <a 
                      href={anexo.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Visualizar
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Detalhes do Lançamento Contábil</h2>
            <p className="text-sm text-gray-300">
              {lancamento.numeroLancamento} • {lancamento.descricao}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Conteúdo */}
        <div className="overflow-y-auto max-h-[calc(90vh-8rem)] p-6 space-y-6">
          {/* Informações básicas */}
          {renderInformacoesBasicas()}

          {/* Valores */}
          {renderValores()}

          {/* Contas */}
          {renderContas()}

          {/* Datas */}
          {renderDatas()}

          {/* Tributação */}
          {renderTributacao()}

          {/* Rateio */}
          {renderRateio()}

          {/* Documentos */}
          {renderDocumentos()}

          {/* Informações adicionais */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Adicionais</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Origem do Lançamento</p>
                <p className="text-base text-gray-900 capitalize">{lancamento.origemLancamento || 'manual'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Criado por</p>
                <p className="text-base text-gray-900">{lancamento.criadoPor || 'Não informado'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Data de Criação</p>
                <p className="text-base text-gray-900">{formatDate(lancamento.dataCriacao)}</p>
              </div>
              {lancamento.atualizadoPor && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Última Atualização</p>
                  <p className="text-base text-gray-900">Por {lancamento.atualizadoPor} em {formatDate(lancamento.dataAtualizacao)}</p>
                </div>
              )}
              {lancamento.observacoes?.conteudo && (
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Observações</p>
                  <p className="text-base text-gray-900">{lancamento.observacoes.conteudo}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetalhesLancamento;