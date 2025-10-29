"use client";
import Layout from '@/components/layout/Layout';
import React, { useState } from 'react';

interface CargaReponte {
  id: number;
  codigo: string;
  cliente: string;
  origem: string;
  destino: string;
  dataColeta: string;
  dataEntregaPrevista: string;
  status: 'em_transito' | 'entregue' | 'pendente';
  tipoCarga: string;
  valorFrete: number;
}

interface DadosReponte {
  cargaId: number;
  dataEntregaReal: string;
  horaEntrega: string;
  observacoes: string;
  problemas: string;
  assinaturaCliente: boolean;
  comprovantes: File[];
  nomeRecebedor: string;
  contactoRecebedor: string;
  documentoRecebedor: string;
}

export default function ReponteFinal() {
  const [dadosReponte, setDadosReponte] = useState<DadosReponte>({
    cargaId: 0,
    dataEntregaReal: '',
    horaEntrega: '',
    observacoes: '',
    problemas: '',
    assinaturaCliente: false,
    comprovantes: [],
    nomeRecebedor: '',
    contactoRecebedor: '',
    documentoRecebedor: ''
  });

  // Dados moçambicanos realistas
  const cargasParaReponte: CargaReponte[] = [
    {
      id: 1,
      codigo: 'CT-2024-015-MPM',
      cliente: 'Cimentos de Moçambique',
      origem: 'Maputo',
      destino: 'Matola',
      dataColeta: '2024-02-18',
      dataEntregaPrevista: '2024-02-20',
      status: 'em_transito',
      tipoCarga: 'Cimento',
      valorFrete: 45000
    },
    {
      id: 2,
      codigo: 'CT-2024-016-BEW',
      cliente: 'Cervejas de Moçambique',
      origem: 'Beira',
      destino: 'Chimoio',
      dataColeta: '2024-02-19',
      dataEntregaPrevista: '2024-02-22',
      status: 'em_transito',
      tipoCarga: 'Bebidas',
      valorFrete: 38000
    },
    {
      id: 3,
      codigo: 'CT-2024-017-NAP',
      cliente: 'Supermercados Shoprite',
      origem: 'Nampula',
      destino: 'Nacala',
      dataColeta: '2024-02-20',
      dataEntregaPrevista: '2024-02-23',
      status: 'em_transito',
      tipoCarga: 'Produtos Alimentares',
      valorFrete: 52000
    },
    {
      id: 4,
      codigo: 'CT-2024-018-TET',
      cliente: 'Joma Têxteis',
      origem: 'Tete',
      destino: 'Zóbuè',
      dataColeta: '2024-02-21',
      dataEntregaPrevista: '2024-02-24',
      status: 'em_transito',
      tipoCarga: 'Têxteis',
      valorFrete: 29000
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setDadosReponte({
        ...dadosReponte,
        comprovantes: [...dadosReponte.comprovantes, ...files]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dadosReponte.cargaId) {
      alert('Selecione uma carga para registrar o reponte final.');
      return;
    }

    if (!dadosReponte.dataEntregaReal || !dadosReponte.horaEntrega) {
      alert('Preencha a data e hora da entrega.');
      return;
    }

    if (!dadosReponte.nomeRecebedor || !dadosReponte.contactoRecebedor) {
      alert('Preencha os dados do recebedor.');
      return;
    }

    // Simulação de envio do reponte
    alert('Reponte final registrado com sucesso! O pagamento será processado em 5 dias úteis.');
    
    // Reset do formulário
    setDadosReponte({
      cargaId: 0,
      dataEntregaReal: '',
      horaEntrega: '',
      observacoes: '',
      problemas: '',
      assinaturaCliente: false,
      comprovantes: [],
      nomeRecebedor: '',
      contactoRecebedor: '',
      documentoRecebedor: ''
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-MZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const cargaSelecionada = cargasParaReponte.find(c => c.id === dadosReponte.cargaId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'em_transito': return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      case 'entregue': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'pendente': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'em_transito': return '🚛 Em Trânsito';
      case 'entregue': return '✅ Entregue';
      case 'pendente': return '⏱️ Pendente';
      default: return status;
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...dadosReponte.comprovantes];
    newFiles.splice(index, 1);
    setDadosReponte({
      ...dadosReponte,
      comprovantes: newFiles
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-white truncate">📦 Reponte Final</h1>
              <p className="text-gray-400 truncate">Registro final de entrega - Moçambique</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-3 space-y-6">
            {/* Formulário de Reponte */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white flex items-center">
                  <span className="mr-2">📝</span>
                  Registro de Reponte Final - Moçambique
                </h2>
                <p className="text-gray-400 text-sm">
                  Preencha as informações da entrega final da carga
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Seleção da Carga */}
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Selecione a Carga *
                  </label>
                  <select
                    value={dadosReponte.cargaId}
                    onChange={(e) => setDadosReponte({...dadosReponte, cargaId: parseInt(e.target.value)})}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value={0}>Selecione uma carga</option>
                    {cargasParaReponte.map((carga) => (
                      <option key={carga.id} value={carga.id}>
                        {carga.codigo} - {carga.cliente} ({carga.origem} → {carga.destino})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Informações da Carga Selecionada */}
                {cargaSelecionada && (
                  <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 min-w-0">
                    <h4 className="font-semibold text-blue-400 mb-3 flex items-center">
                      <span className="mr-2">📋</span>
                      Informações da Carga Selecionada
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="min-w-0">
                        <span className="text-blue-300">Cliente:</span>
                        <p className="font-medium text-blue-400 truncate">{cargaSelecionada.cliente}</p>
                      </div>
                      <div className="min-w-0">
                        <span className="text-blue-300">Rota:</span>
                        <p className="font-medium text-blue-400 truncate">{cargaSelecionada.origem} → {cargaSelecionada.destino}</p>
                      </div>
                      <div className="min-w-0">
                        <span className="text-blue-300">Tipo de Carga:</span>
                        <p className="font-medium text-blue-400 truncate">{cargaSelecionada.tipoCarga}</p>
                      </div>
                      <div className="min-w-0">
                        <span className="text-blue-300">Data de Coleta:</span>
                        <p className="font-medium text-blue-400 truncate">
                          {formatDate(cargaSelecionada.dataColeta)}
                        </p>
                      </div>
                      <div className="min-w-0">
                        <span className="text-blue-300">Entrega Prevista:</span>
                        <p className="font-medium text-blue-400 truncate">
                          {formatDate(cargaSelecionada.dataEntregaPrevista)}
                        </p>
                      </div>
                      <div className="min-w-0">
                        <span className="text-blue-300">Valor do Frete:</span>
                        <p className="font-medium text-green-400 truncate">
                          {formatCurrency(cargaSelecionada.valorFrete)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Data e Hora da Entrega */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="min-w-0">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Data da Entrega Real *
                    </label>
                    <input
                      type="date"
                      value={dadosReponte.dataEntregaReal}
                      onChange={(e) => setDadosReponte({...dadosReponte, dataEntregaReal: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="min-w-0">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Hora da Entrega *
                    </label>
                    <input
                      type="time"
                      value={dadosReponte.horaEntrega}
                      onChange={(e) => setDadosReponte({...dadosReponte, horaEntrega: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Dados do Recebedor */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="min-w-0">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nome do Recebedor *
                    </label>
                    <input
                      type="text"
                      value={dadosReponte.nomeRecebedor}
                      onChange={(e) => setDadosReponte({...dadosReponte, nomeRecebedor: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nome completo"
                      required
                    />
                  </div>
                  <div className="min-w-0">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Contacto *
                    </label>
                    <input
                      type="tel"
                      value={dadosReponte.contactoRecebedor}
                      onChange={(e) => setDadosReponte({...dadosReponte, contactoRecebedor: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+258 8X XXX XXXX"
                      required
                    />
                  </div>
                  <div className="min-w-0">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nº do Documento
                    </label>
                    <input
                      type="text"
                      value={dadosReponte.documentoRecebedor}
                      onChange={(e) => setDadosReponte({...dadosReponte, documentoRecebedor: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="BI/Passaporte"
                    />
                  </div>
                </div>

                {/* Observações */}
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Observações da Entrega
                  </label>
                  <textarea
                    value={dadosReponte.observacoes}
                    onChange={(e) => setDadosReponte({...dadosReponte, observacoes: e.target.value})}
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Descreva como foi o processo de entrega, condições da mercadoria, etc..."
                  />
                </div>

                {/* Problemas Encontrados */}
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Problemas ou Ocorrências
                  </label>
                  <textarea
                    value={dadosReponte.problemas}
                    onChange={(e) => setDadosReponte({...dadosReponte, problemas: e.target.value})}
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Relate qualquer problema ocorrido durante o transporte, avarias, atrasos..."
                  />
                </div>

                {/* Comprovantes */}
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Comprovantes de Entrega
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center bg-gray-700/50">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      accept="image/*,.pdf,.doc,.docx"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium transition-all shadow-sm flex items-center justify-center mx-auto w-fit"
                    >
                      <span className="mr-2">📎</span>
                      Adicionar Comprovantes
                    </label>
                    <p className="text-gray-400 text-sm mt-2">
                      Fotos, documentos, assinaturas ou outros comprovantes da entrega
                    </p>
                    
                    {/* Lista de arquivos */}
                    {dadosReponte.comprovantes.length > 0 && (
                      <div className="mt-4 min-w-0">
                        <p className="text-sm font-medium text-gray-300 mb-2">Arquivos selecionados:</p>
                        <ul className="space-y-2">
                          {dadosReponte.comprovantes.map((file, index) => (
                            <li key={index} className="text-sm text-gray-400 flex items-center justify-between bg-gray-600/50 p-2 rounded">
                              <div className="flex items-center min-w-0">
                                <span className="mr-2">📄</span>
                                <span className="truncate max-w-[200px]">{file.name}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="text-red-400 hover:text-red-300 ml-2"
                              >
                                ✕
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Confirmação */}
                <div className="flex items-center bg-gray-700/50 p-4 rounded-xl border border-gray-600 min-w-0">
                  <input
                    type="checkbox"
                    checked={dadosReponte.assinaturaCliente}
                    onChange={(e) => setDadosReponte({...dadosReponte, assinaturaCliente: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                  />
                  <label className="ml-2 block text-sm text-white">
                    Confirmo que a carga foi entregue e recebida pelo cliente conforme especificado
                  </label>
                </div>

                {/* Botão de Envio */}
                <div className="flex justify-end pt-6 border-t border-gray-700">
                  <button
                    type="submit"
                    className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 font-medium text-lg transition-all shadow-sm flex items-center"
                  >
                    <span className="mr-2">✅</span>
                    Registrar Reponte Final
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Painel Lateral */}
          <div className="lg:col-span-1 space-y-6">
            {/* Cargas Pendentes de Reponte */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white truncate">🚛 Cargas em Andamento</h3>
                  <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full border border-gray-600 whitespace-nowrap">
                    {cargasParaReponte.length} pendentes
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-1">Cargas que aguardam registro de reponte final</p>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  {cargasParaReponte.map((carga) => (
                    <div 
                      key={carga.id} 
                      className={`border border-gray-600 rounded-xl p-3 bg-gray-700/50 hover:bg-gray-700/70 transition-all min-w-0 cursor-pointer ${
                        dadosReponte.cargaId === carga.id ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => setDadosReponte({...dadosReponte, cargaId: carga.id})}
                    >
                      <div className="flex items-center mb-2">
                        <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                          <span className="text-white text-sm">📦</span>
                        </div>
                        <div className="ml-3 min-w-0 flex-1">
                          <h4 className="font-semibold text-white text-sm truncate">{carga.codigo}</h4>
                          <p className="text-gray-400 text-xs truncate">{carga.cliente}</p>
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="text-gray-300 text-xs truncate">
                          {carga.origem} → {carga.destino}
                        </p>
                        <p className="text-gray-400 text-xs truncate">
                          Entrega: {formatDate(carga.dataEntregaPrevista)}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(carga.status)}`}>
                            {getStatusText(carga.status)}
                          </span>
                          <span className="text-green-400 text-xs font-medium">
                            {formatCurrency(carga.valorFrete)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mensagem quando não há cargas */}
                {cargasParaReponte.length === 0 && (
                  <div className="text-center py-6">
                    <div className="text-gray-400 text-4xl mb-2">✅</div>
                    <h3 className="text-sm font-medium text-white mb-1">
                      Todas as cargas finalizadas
                    </h3>
                    <p className="text-gray-400 text-xs">
                      Não há cargas pendentes de reponte final.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Estatísticas Rápidas */}
            <div className="bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white truncate">📊 Estatísticas</h2>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg">
                  <span className="text-blue-400 truncate text-sm">Cargas Hoje</span>
                  <span className="text-blue-400 font-bold whitespace-nowrap">2</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                  <span className="text-green-400 truncate text-sm">Valor Total</span>
                  <span className="text-green-400 font-bold whitespace-nowrap">
                    {formatCurrency(cargasParaReponte.reduce((sum, c) => sum + c.valorFrete, 0))}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg">
                  <span className="text-yellow-400 truncate text-sm">Em Atraso</span>
                  <span className="text-yellow-400 font-bold whitespace-nowrap">0</span>
                </div>
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white truncate">⚡ Ações Rápidas</h2>
              </div>
              <div className="p-4 space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm flex items-center justify-center transition-all">
                  <span className="mr-2">📷</span>
                  <span className="truncate">Tirar Foto Agora</span>
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 text-sm flex items-center justify-center transition-all">
                  <span className="mr-2">📋</span>
                  <span className="truncate">Modelo de Relatório</span>
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 text-sm flex items-center justify-center transition-all">
                  <span className="mr-2">📞</span>
                  <span className="truncate">Suporte (+258)</span>
                </button>
              </div>
            </div>

            {/* Informações Importantes - Moçambique */}
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <h3 className="text-lg font-semibold text-blue-400 mb-2 truncate">💡 Informações - MZ</h3>
              <ul className="text-blue-300 text-sm space-y-1">
                <li className="truncate">• Registre imediatamente após entrega</li>
                <li className="truncate">• Documento do recebedor obrigatório</li>
                <li className="truncate">• Fotos comprovativas necessárias</li>
                <li className="truncate">• Pagamento em 5 dias úteis</li>
                <li className="truncate">• Contacte +258 84 123 4567</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
    </Layout>
    
  );
}