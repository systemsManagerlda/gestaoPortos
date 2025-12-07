import React, { useState, useEffect } from 'react';
export const SeguroCargasPanel = ({ activeSeguroForm, setActiveSeguroForm, cargasData = [], camioesData = [] }) => {
  const [formData, setFormData] = useState({
    apolices: {},
    sinistros: {},
    coberturas: {},
    seguradoras: {},
    cargas: [],
    camioes: [],
    seguradorasList: []
  });
  
  const [loading, setLoading] = useState(false);
  const [selectedCarga, setSelectedCarga] = useState(null);
  const [selectedCamiao, setSelectedCamiao] = useState(null);
  
  // Inicializar dados
  useEffect(() => {
    carregarDados();
  }, []);
  
  const carregarDados = async () => {
    setLoading(true);
    try {
      // Carregar cargas
      const cargasResponse = await fetch('https://desktop-api-4f850b3f9733.herokuapp.com/getCargaList', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ curPage: 1, pageSize: 100 })
      });
      
      const cargasData = await cargasResponse.json();
      
      // Carregar camiões
      const camioesResponse = await fetch('https://desktop-api-4f850b3f9733.herokuapp.com/getCamiaoList', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ curPage: 1, pageSize: 100 })
      });
      
      const camioesData = await camioesResponse.json();
      
      setFormData(prev => ({
        ...prev,
        cargas: cargasData.data?.list || [],
        camioes: camioesData.data?.list || [],
        seguradorasList: [
          { id: 1, nome: 'Hollard Moçambique' },
          { id: 2, nome: 'Global Alliance' },
          { id: 3, nome: 'EMOSE' },
          { id: 4, nome: 'Milmoc' }
        ]
      }));
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Calcular prêmio do seguro automaticamente
  const calcularPremioSeguro = (cargaId) => {
    const carga = formData.cargas.find(c => c.codigo === cargaId);
    if (!carga) return 0;
    
    // Usar o virtual do schema para cálculo
    const valorMercadoria = carga.valorMercadoria || 0;
    const categoria = carga.categoriaSeguro || 'Carga Geral';
    const abrangencia = carga.abrangenciaSeguro || 'Nacional';
    
    // Tabela de taxas simplificada
    const taxas = {
      'Nacional': {
        'Produtos Alimentares': 0.35,
        'Eletrónicos': 0.50,
        'Materiais Perigosos': 1.50,
        'Carga Geral': 0.45,
        'Carga Consolidada': 0.45
      },
      'Regional SADC': {
        'Carga Geral': 0.75
      },
      'Internacional': {
        'Carga Consolidada': 1.25
      }
    };
    
    const taxa = taxas[abrangencia]?.[categoria] || 0.45;
    const premio = valorMercadoria * taxa / 100;
    return Math.max(5000, premio); // Valor base mínimo
  };
  
  // Calcular seguro do veículo
  const calcularSeguroVeiculo = (camiaoId) => {
    const camiao = formData.camioes.find(c => c.camiaoId === camiaoId);
    if (!camiao) return 0;
    
    const TAXAS_VEICULO = {
      'Terceiros': 3.0,
      'Contra todos os riscos': 5.5,
      'Roubo + Furto': 2.2,
      'Danos Próprios': 4.8,
      'Responsabilidade Civil': 1.5
    };
    
    const TAXAS_BASE = {
      'Terceiros': 10000,
      'Contra todos os riscos': 12500,
      'Roubo + Furto': 10000,
      'Danos Próprios': 11200,
      'Responsabilidade Civil': 10000
    };
    
    const tipo = camiao.veiculo?.seguroVeiculo?.tipo || 'Terceiros';
    const valorVeiculo = camiao.veiculo?.seguroVeiculo?.valorVeiculo || 0;
    const taxa = TAXAS_VEICULO[tipo] || 3.0;
    const base = TAXAS_BASE[tipo] || 10000;
    
    const premio = valorVeiculo * taxa / 100;
    return Math.max(base, premio);
  };
  
  // Handler para mudanças nos formulários
  const handleInputChange = (formType, field, value) => {
    setFormData(prev => ({
      ...prev,
      [formType]: {
        ...prev[formType],
        [field]: value
      }
    }));
  };
  
  // Handler para salvar apólice
  const salvarApolice = async () => {
    if (!formData.apolices.cargaId || !formData.apolices.seguradora) {
      alert('Por favor, selecione uma carga e uma seguradora');
      return;
    }
    
    setLoading(true);
    try {
      const carga = formData.cargas.find(c => c.codigo === formData.apolices.cargaId);
      
      const apoliceData = {
        codigoCarga: formData.apolices.cargaId,
        numeroApolice: formData.apolices.numeroApolice || `APOL-${Date.now()}`,
        seguradora: formData.apolices.seguradora,
        valorSegurado: carga?.valorMercadoria || 0,
        premioCalculado: calcularPremioSeguro(formData.apolices.cargaId),
        dataInicio: formData.apolices.dataInicio || new Date().toISOString().split('T')[0],
        dataFim: formData.apolices.dataFim,
        cobertura: formData.apolices.cobertura || ['Roubo e Furto', 'Acidentes'],
        statusSeguro: 'ativo'
      };
      
      // Atualizar carga com dados do seguro
      const response = await fetch('https://desktop-api-4f850b3f9733.herokuapp.com/updateCarga', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codigo: formData.apolices.cargaId,
          seguro: apoliceData
        })
      });
      
      if (response.ok) {
        alert('Apólice salva com sucesso!');
        setFormData(prev => ({ ...prev, apolices: {} }));
        carregarDados(); // Recarregar dados
      }
    } catch (error) {
      console.error('Erro ao salvar apólice:', error);
      alert('Erro ao salvar apólice');
    } finally {
      setLoading(false);
    }
  };
  
  // Handler para registrar sinistro
  const registrarSinistro = async () => {
    if (!formData.sinistros.cargaId || !formData.sinistros.tipo) {
      alert('Por favor, selecione uma carga e o tipo de sinistro');
      return;
    }
    
    setLoading(true);
    try {
      const sinistroData = {
        codigo: formData.sinistros.cargaId,
        ocorrenciaData: {
          tipo: formData.sinistros.tipo,
          descricao: formData.sinistros.descricao,
          severidade: formData.sinistros.severidade || 'média',
          dataRegistro: new Date(),
          custo: formData.sinistros.valorEstimado || 0,
          status: 'pendente',
          afetaSeguro: true
        }
      };
      
      const response = await fetch('https://desktop-api-4f850b3f9733.herokuapp.com/addOcorrenciaCarga', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sinistroData)
      });
      
      if (response.ok) {
        alert('Sinistro registrado com sucesso!');
        setFormData(prev => ({ ...prev, sinistros: {} }));
        carregarDados();
      }
    } catch (error) {
      console.error('Erro ao registrar sinistro:', error);
      alert('Erro ao registrar sinistro');
    } finally {
      setLoading(false);
    }
  };
  
  // Estatísticas para gráficos
  const estatisticasSeguro = {
    totalCargasComSeguro: formData.cargas.filter(c => c.seguro?.statusSeguro === 'ativo').length,
    totalCargasSemSeguro: formData.cargas.filter(c => !c.seguro?.statusSeguro || c.seguro.statusSeguro !== 'ativo').length,
    totalSinistros: formData.cargas.reduce((total, carga) => total + (carga.seguro?.sinistros?.length || 0), 0),
    totalValorSegurado: formData.cargas.reduce((total, carga) => total + (carga.seguro?.valorSegurado || 0), 0),
    totalPremios: formData.cargas.reduce((total, carga) => total + (carga.seguro?.premioFinal || 0), 0)
  };
  
  // Componente de Loading
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col text-gray-900">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-indigo-500 text-white p-2 rounded-lg mr-3">
            🛡️
          </span>
          Seguro de Cargas - Gestão de Seguros e Apólices
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          {formData.cargas.length} cargas cadastradas | {estatisticasSeguro.totalCargasComSeguro} com seguro ativo
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação entre Formulários */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4 overflow-x-auto">
          {['apolices', 'sinistros', 'coberturas', 'seguradoras', 'graficos'].map((form) => (
            <button
              key={form}
              onClick={() => setActiveSeguroForm(form)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                activeSeguroForm === form
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {form === 'apolices' && '📄 Apólices'}
              {form === 'sinistros' && '🚨 Sinistros'}
              {form === 'coberturas' && '🛡️ Coberturas'}
              {form === 'seguradoras' && '🏢 Seguradoras'}
              {form === 'graficos' && '📈 Gráficos'}
            </button>
          ))}
        </div>

        {/* Formulário de Apólices */}
        {activeSeguroForm === "apolices" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-indigo-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-indigo-500 text-white p-2 rounded-lg mr-2">
                  📄
                </span>
                Cadastro de Apólices de Seguro
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selecione a Carga *
                    </label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-950"
                      value={formData.apolices.cargaId || ''}
                      onChange={(e) => handleInputChange('apolices', 'cargaId', e.target.value)}
                    >
                      <option value="">Selecione uma carga</option>
                      {formData.cargas.map(carga => (
                        <option key={carga.codigo} value={carga.codigo}>
                          {carga.codigo} - {carga.descricao} (MT {carga.valorMercadoria?.toLocaleString() || 0})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seguradora *
                    </label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-950"
                      value={formData.apolices.seguradora || ''}
                      onChange={(e) => handleInputChange('apolices', 'seguradora', e.target.value)}
                    >
                      <option value="">Selecione</option>
                      {formData.seguradorasList.map(seg => (
                        <option key={seg.id} value={seg.nome}>{seg.nome}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {formData.apolices.cargaId && (
                  <>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Detalhes da Carga Selecionada</h4>
                      {(() => {
                        const carga = formData.cargas.find(c => c.codigo === formData.apolices.cargaId);
                        if (!carga) return null;
                        
                        return (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Valor da Mercadoria:</span>
                              <p className="font-semibold">MT {carga.valorMercadoria?.toLocaleString() || 0}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Categoria:</span>
                              <p className="font-semibold">{carga.categoriaSeguro}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Abrangência:</span>
                              <p className="font-semibold">{carga.abrangenciaSeguro}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Prêmio Estimado:</span>
                              <p className="font-semibold text-green-600">
                                MT {calcularPremioSeguro(formData.apolices.cargaId)?.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Número da Apólice *
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Número da apólice"
                          value={formData.apolices.numeroApolice || ''}
                          onChange={(e) => handleInputChange('apolices', 'numeroApolice', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Cobertura *
                        </label>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-950"
                          value={formData.apolices.cobertura || ''}
                          onChange={(e) => handleInputChange('apolices', 'cobertura', e.target.value)}
                        >
                          <option value="">Selecione</option>
                          <option value="completa">Cobertura Completa</option>
                          <option value="roubo">Roubo e Furto</option>
                          <option value="acidentes">Acidentes</option>
                          <option value="natural">Desastres Naturais</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data de Início *
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-950"
                          value={formData.apolices.dataInicio || ''}
                          onChange={(e) => handleInputChange('apolices', 'dataInicio', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data de Término *
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-950"
                          value={formData.apolices.dataFim || ''}
                          onChange={(e) => handleInputChange('apolices', 'dataFim', e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                    onClick={() => setFormData(prev => ({ ...prev, apolices: {} }))}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-indigo-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={salvarApolice}
                    disabled={!formData.apolices.cargaId || !formData.apolices.seguradora}
                  >
                    Salvar Apólice
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Formulário de Sinistros */}
        {activeSeguroForm === "sinistros" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-red-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-red-500 text-white p-2 rounded-lg mr-2">
                  🚨
                </span>
                Registro de Sinistros
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selecione a Carga *
                    </label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                      value={formData.sinistros.cargaId || ''}
                      onChange={(e) => handleInputChange('sinistros', 'cargaId', e.target.value)}
                    >
                      <option value="">Selecione uma carga</option>
                      {formData.cargas
                        .filter(c => c.seguro?.statusSeguro === 'ativo')
                        .map(carga => (
                          <option key={carga.codigo} value={carga.codigo}>
                            {carga.codigo} - Apólice: {carga.seguro?.apolice}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data do Sinistro *
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                      value={formData.sinistros.dataSinistro || ''}
                      onChange={(e) => handleInputChange('sinistros', 'dataSinistro', e.target.value)}
                    />
                  </div>
                </div>

                {formData.sinistros.cargaId && (
                  <>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Informações do Seguro</h4>
                      {(() => {
                        const carga = formData.cargas.find(c => c.codigo === formData.sinistros.cargaId);
                        if (!carga?.seguro) return null;
                        
                        return (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Apólice:</span>
                              <p className="font-semibold">{carga.seguro.apolice}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Seguradora:</span>
                              <p className="font-semibold">{carga.seguro.seguradora}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Valor Segurado:</span>
                              <p className="font-semibold">MT {carga.seguro.valorSegurado?.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Prêmio Pago:</span>
                              <p className="font-semibold">MT {carga.seguro.premioFinal?.toLocaleString()}</p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Sinistro *
                        </label>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-950"
                          value={formData.sinistros.tipo || ''}
                          onChange={(e) => handleInputChange('sinistros', 'tipo', e.target.value)}
                        >
                          <option value="">Selecione</option>
                          <option value="acidente">Acidente</option>
                          <option value="roubo">Roubo</option>
                          <option value="avaria">Avaria</option>
                          <option value="incendio">Incêndio</option>
                          <option value="furto">Furto</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Valor Estimado (MT) *
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="MT 0,00"
                          value={formData.sinistros.valorEstimado || ''}
                          onChange={(e) => handleInputChange('sinistros', 'valorEstimado', e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição do Sinistro *
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Descreva detalhadamente o ocorrido..."
                        value={formData.sinistros.descricao || ''}
                        onChange={(e) => handleInputChange('sinistros', 'descricao', e.target.value)}
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Local do Sinistro *
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Endereço completo do local"
                        value={formData.sinistros.local || ''}
                        onChange={(e) => handleInputChange('sinistros', 'local', e.target.value)}
                      />
                    </div>
                  </>
                )}

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                    onClick={() => setFormData(prev => ({ ...prev, sinistros: {} }))}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={registrarSinistro}
                    disabled={!formData.sinistros.cargaId || !formData.sinistros.tipo}
                  >
                    Registrar Sinistro
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Formulário de Coberturas (mantido similar) */}
        {activeSeguroForm === "coberturas" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-green-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-green-500 text-white p-2 rounded-lg mr-2">
                  🛡️
                </span>
                Gestão de Coberturas
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Coberturas aplicáveis baseadas nas categorias de carga
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Categorias de Carga e Taxas</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded border">
                      <h5 className="font-semibold text-gray-900">Nacional</h5>
                      <div className="text-sm mt-2 space-y-1">
                        <div className="flex justify-between">
                          <span>Produtos Alimentares</span>
                          <span className="font-semibold">0.35%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Eletrónicos</span>
                          <span className="font-semibold">0.50%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Materiais Perigosos</span>
                          <span className="font-semibold">1.50%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded border">
                      <h5 className="font-semibold text-gray-900">Regional SADC</h5>
                      <div className="text-sm mt-2">
                        <div className="flex justify-between">
                          <span>Carga Geral</span>
                          <span className="font-semibold">0.75%</span>
                        </div>
                        <p className="text-gray-500 text-xs mt-2">Valor base: MT 5.000</p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded border">
                      <h5 className="font-semibold text-gray-900">Internacional</h5>
                      <div className="text-sm mt-2">
                        <div className="flex justify-between">
                          <span>Carga Consolidada</span>
                          <span className="font-semibold">1.25%</span>
                        </div>
                        <p className="text-gray-500 text-xs mt-2">Valor base: MT 5.000</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Formulário de cobertura específica (simplificado) */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome da Cobertura *
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Ex: Cobertura Completa"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categoria Aplicável
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-950">
                        <option value="">Todas as categorias</option>
                        <option value="alimentar">Produtos Alimentares</option>
                        <option value="eletronicos">Eletrónicos</option>
                        <option value="perigosos">Materiais Perigosos</option>
                        <option value="geral">Carga Geral</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
                    >
                      Salvar Cobertura
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gráficos e Estatísticas */}
        {activeSeguroForm === "graficos" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-indigo-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-indigo-500 text-white p-2 rounded-lg mr-2">
                    📈
                  </span>
                  Dashboard de Seguros - Métricas e Estatísticas
                </h3>
              </div>
              <div className="p-6">
                {/* Métricas Rápidas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                    <p className="text-sm text-indigo-600 font-medium">Cargas com Seguro</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {estatisticasSeguro.totalCargasComSeguro}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600 font-medium">Valor Total Segurado</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {estatisticasSeguro.totalValorSegurado.toLocaleString()} MT
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">Total Sinistros</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {estatisticasSeguro.totalSinistros}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-600 font-medium">Prêmios Arrecadados</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {estatisticasSeguro.totalPremios.toLocaleString()} MT
                    </p>
                  </div>
                </div>

                {/* Grid de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Gráfico de Cargas por Status de Seguro */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Status dos Seguros</h4>
                    <div className="h-48 flex items-center justify-center">
                      <div className="text-center w-full">
                        <div className="flex justify-center mb-4">
                          <div className="relative w-32 h-32">
                            <div
                              className="w-full h-full rounded-full"
                              style={{
                                background: `conic-gradient(
                                  #10b981 0% ${(estatisticasSeguro.totalCargasComSeguro / formData.cargas.length) * 100}%,
                                  #ef4444 ${(estatisticasSeguro.totalCargasComSeguro / formData.cargas.length) * 100}% 100%
                                )`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                            <span>Com Seguro ({estatisticasSeguro.totalCargasComSeguro})</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                            <span>Sem Seguro ({estatisticasSeguro.totalCargasSemSeguro})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Sinistros por Tipo */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Sinistros por Tipo</h4>
                    <div className="h-48 space-y-3">
                      {['Acidente', 'Roubo', 'Avaria', 'Incêndio', 'Furto'].map((tipo, index) => {
                        const count = formData.cargas.reduce((total, carga) => {
                          return total + (carga.seguro?.sinistros?.filter(s => s.descricao?.includes(tipo)).length || 0);
                        }, 0);
                        
                        return (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{tipo}</span>
                              <span className="font-medium">{count}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="h-2 rounded-full bg-red-500"
                                style={{ width: `${(count / Math.max(estatisticasSeguro.totalSinistros, 1)) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Lista de Cargas com Seguro Recente */}
                <div className="mt-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Cargas Recentes com Seguro</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Código
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Descrição
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Seguradora
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Prêmio
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {formData.cargas
                          .filter(c => c.seguro?.statusSeguro === 'ativo')
                          .slice(0, 5)
                          .map(carga => (
                            <tr key={carga.codigo}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {carga.codigo}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {carga.descricao?.substring(0, 30)}...
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {carga.seguro?.seguradora}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                MT {carga.seguro?.premioFinal?.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  carga.seguro?.statusSeguro === 'ativo' 
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {carga.seguro?.statusSeguro}
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};