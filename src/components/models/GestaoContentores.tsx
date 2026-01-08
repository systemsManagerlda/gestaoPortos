/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, FormEvent } from 'react';

// Interfaces
interface Contentor {
  id: string;
  codigo: string;
  numero: string;
  tipo: string;
  status: string;
  cliente: string;
  pesoBruto?: number;
  valorMercadoria?: number;
  pontoAtual?: {
    lat: number;
    lng: number;
  };
  origem?: {
    coordenadas?: {
      lat: number;
      lng: number;
    };
  };
  localizacao: string;
  ultimaAtualizacao: string;
}

interface FormDataCarga {
  tipoCarga: string;
  subtipo: string;
  descricao: string;
  naturezaCarga: string;
  categoriaSeguro: string;
  abrangenciaSeguro: string;
  tipoPercurso: string;
  destinoFrete: string;
  pesoBruto: number;
  valorMercadoria: number;
  clienteId: string;
  cliente: string;
  origem: string;
  destino: string;
  numeroContentor?: string;
  tipoContentor?: string;
  camiaoId?: string;
  codigoGPS?: string;
}

interface GestaoContentoresProps {
  contentores: Contentor[];
  carregarContentores: () => Promise<void>;
  API_BASE_URL: string;
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

// Opções para os selects
const opcoesTipoCarga = [
  { value: '', label: 'Selecione' },
  { value: 'Contentorizada', label: 'Contentorizada' },
  { value: 'Solta', label: 'Solta' },
  { value: 'Granel', label: 'Granel' },
  { value: 'Frigorífica', label: 'Frigorífica' },
  { value: 'Perigosa', label: 'Perigosa' },
];

const opcoesTipoContentor = [
  { value: '', label: 'Selecione' },
  { value: '20ft', label: '20ft Standard' },
  { value: '40ft', label: '40ft Standard' },
  { value: '40hc', label: '40ft High Cube' },
  { value: 'reefer', label: 'Reefer' },
  { value: 'tanque', label: 'Tanque' },
];

const opcoesCategoriaSeguro = [
  { value: '', label: 'Selecione' },
  { value: 'Produtos Alimentares', label: 'Produtos Alimentares' },
  { value: 'Eletrónicos', label: 'Eletrónicos' },
  { value: 'Materiais Perigosos', label: 'Materiais Perigosos' },
  { value: 'Carga Geral', label: 'Carga Geral' },
  { value: 'Carga Consolidada', label: 'Carga Consolidada' },
];

const opcoesAbrangenciaSeguro = [
  { value: '', label: 'Selecione' },
  { value: 'Nacional', label: 'Nacional' },
  { value: 'Regional SADC', label: 'Regional SADC' },
  { value: 'Internacional', label: 'Internacional' },
];

const opcoesTipoPercurso = [
  { value: '', label: 'Selecione' },
  { value: 'Beira-Interland', label: 'Beira-Interland' },
  { value: 'Local', label: 'Local' },
  { value: 'Nacional', label: 'Nacional' },
];

const opcoesNaturezaCarga = [
  { value: 'não perigosa', label: 'Não Perigosa' },
  { value: 'perigosa', label: 'Perigosa' },
  { value: 'sensível', label: 'Sensível' },
  { value: 'fragil', label: 'Frágil' },
];

// Componente para o card de contentor recente
const CardContentorRecente: React.FC<{ contentor: Contentor }> = ({ contentor }) => (
  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
    <p className="text-sm font-medium text-gray-950">{contentor.numero}</p>
    <p className="text-xs text-gray-600">
      {contentor.tipo} • {getStatusText(contentor.status)}
    </p>
    <p className="text-xs text-blue-600 font-medium">{contentor.localizacao}</p>
  </div>
);

// Componente para o card de estatísticas
const CardEstatistica: React.FC<{
  label: string;
  value: number;
  color?: string;
}> = ({ label, value, color = 'text-gray-950' }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-sm text-gray-600">{label}</span>
    <span className={`font-semibold ${color}`}>{value}</span>
  </div>
);

// Componente para o card de informações
const CardInformacao: React.FC<{
  titulo: string;
  descricao: string;
  icone: string;
  corFundo: string;
  corTexto: string;
  corBorda: string;
}> = ({ titulo, descricao, icone, corFundo, corTexto, corBorda }) => (
  <div className={`p-3 ${corFundo} rounded border ${corBorda}`}>
    <p className={`font-medium ${corTexto} flex items-center`}>
      <span className="mr-2">{icone}</span>
      {titulo}
    </p>
    <p className="text-xs text-gray-600 mt-1">{descricao}</p>
  </div>
);

const GestaoContentores: React.FC<GestaoContentoresProps> = ({
  contentores,
  carregarContentores,
  API_BASE_URL,
}) => {
  const [loading, setLoading] = useState(false);
  const [mensagemErro, setMensagemErro] = useState<string>('');
  const [mensagemSucesso, setMensagemSucesso] = useState<string>('');

  // Estatísticas
  const estatisticas = {
    total: contentores.length,
    emTransito: contentores.filter((c) => c.status === 'em_transito').length,
    entregues: contentores.filter((c) => c.status === 'entregue').length,
    comContentor: contentores.filter((c) => c.numero?.includes('CONT-')).length,
  };

  const contentoresRecentes = contentores.slice(0, 3);

  // Função para enviar o formulário
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensagemErro('');
    setMensagemSucesso('');
    setLoading(true);

    try {
      // Coletar dados do formulário
      const formData = new FormData(e.currentTarget);
      const formObject: Record<string, string> = {};

      // Converter FormData para objeto
      for (const [key, value] of formData.entries()) {
        formObject[key] = value.toString();
      }

      // Validações
      const camposObrigatorios = [
        'tipoCarga',
        'descricao',
        'pesoBruto',
        'valorMercadoria',
        'cliente',
        'origem',
        'destino',
        'categoriaSeguro',
        'abrangenciaSeguro',
        'tipoPercurso',
        'naturezaCarga',
      ];

      const camposFaltando = camposObrigatorios.filter(
        (campo) => !formObject[campo] || formObject[campo].trim() === ''
      );

      if (camposFaltando.length > 0) {
        throw new Error(`Por favor, preencha todos os campos obrigatórios (*)`);
      }

      const pesoBruto = parseFloat(formObject.pesoBruto);
      const valorMercadoria = parseFloat(formObject.valorMercadoria);

      if (isNaN(pesoBruto) || pesoBruto <= 0) {
        throw new Error('Peso bruto deve ser um número positivo');
      }

      if (isNaN(valorMercadoria) || valorMercadoria <= 0) {
        throw new Error('Valor da mercadoria deve ser um número positivo');
      }

      // Preparar dados para a API
      const cargaData = {
        // Identificação da Carga
        tipoCarga: formObject.tipoCarga,
        subtipo: formObject.subtipo || '',
        descricao: formObject.descricao,
        naturezaCarga: formObject.naturezaCarga,

        // Cálculo de seguro
        categoriaSeguro: formObject.categoriaSeguro,
        abrangenciaSeguro: formObject.abrangenciaSeguro,

        // Cálculo de frete e comissão
        tipoPercurso: formObject.tipoPercurso,
        destinoFrete: formObject.destino,

        // Informações básicas
        pesoBruto,
        valorMercadoria,

        // Cliente
        clienteId: `CLI-${Date.now()}`,
        cliente: formObject.cliente,

        // Localização
        origem: {
          pais: 'Moçambique',
          cidade: formObject.origem,
          local: formObject.origem,
        },
        destino: {
          pais: 'Moçambique',
          cidade: formObject.destino,
          local: formObject.destino,
        },

        // Contentor (se fornecido)
        ...(formObject.numeroContentor && {
          contentor: {
            numero: formObject.numeroContentor,
            tipo: formObject.tipoContentor || '',
          },
        }),

        // Status inicial
        status: 'planeada',

        // Documentação
        documentos: {
          numeroCotacao: `COT-${Date.now()}`,
        },

        // Financeiro (será calculado automaticamente pelo middleware)
        taxasPortuarias: 0,
        despesasOperacionais: 0,
        custoCarga: 0,

        // Prioridade
        prioridade: 'média',

        // Veículo (opcional)
        ...(formObject.camiaoId && {
          veiculo: {
            id: parseInt(formObject.camiaoId),
            codigoGPS: formObject.codigoGPS || '',
          },
        }),
      };

      console.log('Enviando dados:', cargaData);

      // Enviar para a API
      const response = await fetch(`${API_BASE_URL}/createCarga`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cargaData),
      });

      const data = await response.json();

      if (data.returnCode === 201) {
        setMensagemSucesso('Carga criada com sucesso!');
        console.log('Carga criada:', data.data);

        // Recarregar a lista de contentores
        await carregarContentores();

        // Limpar formulário
        e.currentTarget.reset();
      } else {
        throw new Error(data.returnMsg || 'Erro ao criar carga');
      }
    } catch (error: any) {
      console.error('Erro:', error);
      setMensagemErro(error.message || 'Erro ao criar carga');
    } finally {
      setLoading(false);
    }
  };

  // Função para limpar formulário
  const handleLimparFormulario = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest('form');
    if (form) {
      form.reset();
      setMensagemErro('');
      setMensagemSucesso('');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-200 bg-blue-50">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                📋
              </span>
              Cadastro e Gestão de Cargas/Contentores
            </h3>
          </div>
          <div className="p-6">
            {/* Mensagens de status */}
            {mensagemSucesso && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <p className="text-green-800">{mensagemSucesso}</p>
                </div>
              </div>
            )}

            {mensagemErro && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <span className="text-red-600 mr-2">✗</span>
                  <p className="text-red-800">{mensagemErro}</p>
                </div>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Campos do formulário */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Carga *
                  </label>
                  <select
                    name="tipoCarga"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                    required
                    disabled={loading}
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
                    Subtipo
                  </label>
                  <input
                    name="subtipo"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                    placeholder="Ex: Container Dry, Granel Líquido"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número do Contentor (opcional)
                  </label>
                  <input
                    name="numeroContentor"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                    placeholder="CONT-001"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo do Contentor
                  </label>
                  <select
                    name="tipoContentor"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                    disabled={loading}
                  >
                    {opcoesTipoContentor.map((opcao) => (
                      <option key={opcao.value} value={opcao.value}>
                        {opcao.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Peso Bruto (kg) *
                  </label>
                  <input
                    name="pesoBruto"
                    type="number"
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                    placeholder="10000"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor da Mercadoria (MZN) *
                  </label>
                  <input
                    name="valorMercadoria"
                    type="number"
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                    placeholder="500000"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cliente *
                  </label>
                  <input
                    name="cliente"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                    placeholder="Nome do Cliente"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria de Seguro *
                  </label>
                  <select
                    name="categoriaSeguro"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                    required
                    disabled={loading}
                  >
                    {opcoesCategoriaSeguro.map((opcao) => (
                      <option key={opcao.value} value={opcao.value}>
                        {opcao.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Abrangência do Seguro *
                  </label>
                  <select
                    name="abrangenciaSeguro"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                    required
                    disabled={loading}
                  >
                    {opcoesAbrangenciaSeguro.map((opcao) => (
                      <option key={opcao.value} value={opcao.value}>
                        {opcao.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Percurso *
                  </label>
                  <select
                    name="tipoPercurso"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                    required
                    disabled={loading}
                  >
                    {opcoesTipoPercurso.map((opcao) => (
                      <option key={opcao.value} value={opcao.value}>
                        {opcao.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Origem (Cidade) *
                  </label>
                  <input
                    name="origem"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                    placeholder="Cidade de Origem"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destino (Cidade) *
                  </label>
                  <input
                    name="destino"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                    placeholder="Cidade de Destino"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição da Carga *
                </label>
                <textarea
                  name="descricao"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                  placeholder="Descreva a carga, mercadoria, instruções especiais..."
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Natureza da Carga *
                </label>
                <select
                  name="naturezaCarga"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                  required
                  disabled={loading}
                >
                  {opcoesNaturezaCarga.map((opcao) => (
                    <option key={opcao.value} value={opcao.value}>
                      {opcao.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Seção para associar camião e GPS */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-500 text-white p-1 rounded-lg mr-2 text-sm">
                    🚚
                  </span>
                  Associar a Veículo (Opcional)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Camião (ID)
                    </label>
                    <input
                      name="camiaoId"
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                      placeholder="ID do camião"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Código GPS
                    </label>
                    <input
                      name="codigoGPS"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                      placeholder="Código do GPS"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
                  onClick={handleLimparFormulario}
                  disabled={loading}
                >
                  Limpar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium flex items-center transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">💾</span>
                      Salvar Carga
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Painel Lateral */}
      <div className="space-y-6">
        {/* Contentores Recentes */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h4 className="font-semibold text-gray-900 mb-4">
            Contentores Recentes
          </h4>
          <div className="space-y-3">
            {contentoresRecentes.length > 0 ? (
              contentoresRecentes.map((contentor) => (
                <CardContentorRecente key={contentor.id} contentor={contentor} />
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                Nenhum contentor registrado
              </p>
            )}
          </div>
        </div>

        {/* Estatísticas */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Estatísticas</h4>
          <div className="space-y-1">
            <CardEstatistica label="Total Cargas:" value={estatisticas.total} />
            <CardEstatistica
              label="Em Trânsito:"
              value={estatisticas.emTransito}
              color="text-green-600"
            />
            <CardEstatistica
              label="Entregues:"
              value={estatisticas.entregues}
              color="text-purple-600"
            />
            <CardEstatistica
              label="Com Contentor:"
              value={estatisticas.comContentor}
              color="text-blue-600"
            />
          </div>
        </div>

        {/* Cálculos Automáticos */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-green-500 mr-2">💰</span>
            Cálculos Automáticos
          </h4>
          <div className="space-y-3">
            <CardInformacao
              titulo="Frete e Comissão"
              descricao="Calculados automaticamente baseados no tipo de percurso e destino"
              icone="🚚"
              corFundo="bg-green-50"
              corTexto="text-green-700"
              corBorda="border-green-200"
            />
            <CardInformacao
              titulo="Seguro"
              descricao="Prêmio calculado com base na categoria, abrangência e valor da mercadoria"
              icone="🛡️"
              corFundo="bg-blue-50"
              corTexto="text-blue-700"
              corBorda="border-blue-200"
            />
            <CardInformacao
              titulo="Valor Total"
              descricao="Soma automática de fretes, taxas, seguro e comissões"
              icone="💵"
              corFundo="bg-purple-50"
              corTexto="text-purple-700"
              corBorda="border-purple-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestaoContentores;
export type { Contentor, FormDataCarga };