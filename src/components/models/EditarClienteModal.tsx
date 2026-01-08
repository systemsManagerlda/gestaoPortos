/* eslint-disable @typescript-eslint/no-explicit-any */
// components/EditarClienteModal.tsx
import React, { useState, useEffect } from 'react';

// Tipos (reutilize os mesmos tipos do VisualizarClienteModal)
interface Contato {
  nome?: string;
  cargo?: string;
  email?: string;
  telefone?: string;
  departamento?: string;
  observacoes?: string;
  principal?: boolean;
}

interface Endereco {
  rua?: string;
  bairro?: string;
  cidade?: string;
  provincia?: string;
  codigoPostal?: string;
  pais?: string;
  pontoReferencia?: string;
}

interface Cliente {
  codigo: string;
  nome: string;
  categoria: string;
  nuit: string;
  tipoPessoa: string;
  classificacao: string;
  status: string;
  segmento?: string;
  limiteCredito?: number;
  formaPagamento?: string;
  prazoPagamento?: number;
  observacoes?: string;
  avaliacao?: number;
  canalCaptacao?: string;
  vendedorResponsavel?: string;
  enderecoCobranca?: Endereco;
  contatos?: Contato[];
  dataCadastro?: string;
}

// Ícones (reutilize os mesmos do VisualizarClienteModal ou importe de uma biblioteca)
const User = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Phone = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MapPin = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CreditCard = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const Save = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

// Componente Principal
const EditarClienteModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  cliente: Cliente | null;
  onSuccess: () => void;
}> = ({ isOpen, onClose, cliente, onSuccess }) => {
  const [formData, setFormData] = useState<Partial<Cliente>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [activeTab, setActiveTab] = useState("basico");

  useEffect(() => {
    if (cliente && isOpen) {
      fetchClienteDetails();
    }
  }, [cliente, isOpen]);

  const fetchClienteDetails = async () => {
    if (!cliente?.codigo) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getClienteDetail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ codigo: cliente.codigo }),
        }
      );

      const data = await response.json();

      if (data.returnCode === 200) {
        const clienteDetalhado = data.data;
        setFormData({
          nome: clienteDetalhado.nome,
          categoria: clienteDetalhado.categoria,
          nuit: clienteDetalhado.nuit,
          tipoPessoa: clienteDetalhado.tipoPessoa,
          classificacao: clienteDetalhado.classificacao,
          status: clienteDetalhado.status,
          segmento: clienteDetalhado.segmento,
          limiteCredito: clienteDetalhado.limiteCredito,
          formaPagamento: clienteDetalhado.formaPagamento,
          prazoPagamento: clienteDetalhado.prazoPagamento,
          observacoes: clienteDetalhado.observacoes,
          avaliacao: clienteDetalhado.avaliacao,
          canalCaptacao: clienteDetalhado.canalCaptacao,
          vendedorResponsavel: clienteDetalhado.vendedorResponsavel,
        });

        if (clienteDetalhado.enderecoCobranca) {
          setFormData((prev) => ({
            ...prev,
            enderecoCobranca: { ...clienteDetalhado.enderecoCobranca },
          }));
        }

        setContatos(clienteDetalhado.contatos || []);
      } else {
        setError("Erro ao carregar detalhes do cliente");
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
      setError("Erro ao carregar dados do cliente");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEnderecoChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      enderecoCobranca: {
        ...prev.enderecoCobranca,
        [field]: value,
      } as Cliente["enderecoCobranca"],
    }));
  };

  const handleContatoChange = (index: number, field: string, value: string) => {
    const updatedContatos = [...contatos];
    updatedContatos[index] = {
      ...updatedContatos[index],
      [field]: value,
    };
    setContatos(updatedContatos);
  };

  const handleAddContato = () => {
    setContatos([
      ...contatos,
      { nome: "", email: "", telefone: "", cargo: "", principal: false },
    ]);
  };

  const handleRemoveContato = (index: number) => {
    const updatedContatos = contatos.filter((_, i) => i !== index);
    setContatos(updatedContatos);
  };

  const handleSetPrincipal = (index: number) => {
    const updatedContatos = contatos.map((contato, i) => ({
      ...contato,
      principal: i === index,
    }));
    setContatos(updatedContatos);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliente?.codigo) return;

    setSaving(true);
    setError(null);

    try {
      const updateData = {
        codigo: cliente.codigo,
        ...formData,
        contatos: contatos,
        dataUltimaAtualizacao: new Date().toISOString(),
      };

      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/updateCliente",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        }
      );

      const data = await response.json();

      if (data.returnCode === 200) {
        onSuccess();
        onClose();
      } else {
        setError(data.returnMsg || "Erro ao atualizar cliente");
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      setError("Erro ao atualizar cliente");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>

        {/* Modal Container */}
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-xl shadow-2xl">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Editar Cliente
                  </h3>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {cliente?.codigo}
                    </span>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm text-gray-600">
                      {cliente?.nome}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 rounded-lg hover:text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs de Navegação */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("basico")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "basico"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <User className="inline-block w-4 h-4 mr-2" />
                Informações Básicas
              </button>
              <button
                onClick={() => setActiveTab("contatos")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "contatos"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Phone className="inline-block w-4 h-4 mr-2" />
                Contatos
              </button>
              <button
                onClick={() => setActiveTab("endereco")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "endereco"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <MapPin className="inline-block w-4 h-4 mr-2" />
                Endereço
              </button>
              <button
                onClick={() => setActiveTab("financeiro")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "financeiro"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <CreditCard className="inline-block w-4 h-4 mr-2" />
                Financeiro
              </button>
              <button
                onClick={() => setActiveTab("outros")}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "outros"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FileText className="inline-block w-4 h-4 mr-2" />
                Outros
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            {loading ? (
              <div className="py-12 text-center">
                <Loader2 className="inline-block w-8 h-8 text-blue-600 animate-spin" />
                <p className="mt-2 text-gray-600">
                  Carregando dados do cliente...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <X className="w-5 h-5 text-red-400" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">Erro ao processar</p>
                        <p className="mt-1">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Informações Básicas */}
                {activeTab === "basico" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          value={formData.nome || ""}
                          onChange={(e) =>
                            handleInputChange("nome", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Categoria *
                        </label>
                        <select
                          value={formData.categoria || ""}
                          onChange={(e) =>
                            handleInputChange("categoria", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        >
                          <option value="">Selecione uma categoria</option>
                          <option value="Gestor">Gestor</option>
                          <option value="Cliente">Cliente</option>
                          <option value="Motorista">Motorista</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          NUIT *
                        </label>
                        <input
                          type="text"
                          value={formData.nuit || ""}
                          onChange={(e) =>
                            handleInputChange("nuit", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Tipo de Pessoa *
                        </label>
                        <select
                          value={formData.tipoPessoa || ""}
                          onChange={(e) =>
                            handleInputChange("tipoPessoa", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        >
                          <option value="">Selecione o tipo</option>
                          <option value="Física">Pessoa Física</option>
                          <option value="Jurídica">Pessoa Jurídica</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Classificação
                        </label>
                        <select
                          value={formData.classificacao || ""}
                          onChange={(e) =>
                            handleInputChange("classificacao", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          <option value="Novo">Novo</option>
                          <option value="VIP">VIP</option>
                          <option value="A">Classe A</option>
                          <option value="B">Classe B</option>
                          <option value="C">Classe C</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Status
                        </label>
                        <select
                          value={formData.status || ""}
                          onChange={(e) =>
                            handleInputChange("status", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          <option value="ativo">Ativo</option>
                          <option value="inativo">Inativo</option>
                          <option value="suspenso">Suspenso</option>
                          <option value="potencial">Potencial</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Segmento de Atuação
                      </label>
                      <input
                        type="text"
                        value={formData.segmento || ""}
                        onChange={(e) =>
                          handleInputChange("segmento", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Ex: Logística, Construção Civil, Comércio..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Avaliação
                      </label>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleInputChange("avaliacao", star)}
                            className={`text-2xl ${
                              star <= (formData.avaliacao || 0)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            } hover:text-yellow-400 transition-colors`}
                          >
                            ★
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {formData.avaliacao || 0}/5
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Contatos */}
                {activeTab === "contatos" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Contatos do Cliente
                      </h4>
                      <button
                        type="button"
                        onClick={handleAddContato}
                        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Adicionar Contato
                      </button>
                    </div>

                    {contatos.length === 0 ? (
                      <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                        <User className="w-12 h-12 mx-auto text-gray-400" />
                        <p className="mt-2 text-gray-600">
                          Nenhum contato cadastrado
                        </p>
                        <button
                          type="button"
                          onClick={handleAddContato}
                          className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Adicionar primeiro contato
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {contatos.map((contato, index) => (
                          <div
                            key={index}
                            className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  onClick={() => handleSetPrincipal(index)}
                                  className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 ${
                                    contato.principal
                                      ? "bg-blue-100 text-blue-600"
                                      : "bg-gray-200 text-gray-400"
                                  }`}
                                >
                                  {contato.principal ? "✓" : ""}
                                </button>
                                <span className="font-medium text-gray-900">
                                  Contato {index + 1}
                                  {contato.principal && (
                                    <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                      Principal
                                    </span>
                                  )}
                                </span>
                              </div>
                              {contatos.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveContato(index)}
                                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                                >
                                  Remover
                                </button>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Nome
                                </label>
                                <input
                                  type="text"
                                  value={contato.nome || ""}
                                  onChange={(e) =>
                                    handleContatoChange(
                                      index,
                                      "nome",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Nome completo"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Cargo
                                </label>
                                <input
                                  type="text"
                                  value={contato.cargo || ""}
                                  onChange={(e) =>
                                    handleContatoChange(
                                      index,
                                      "cargo",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Ex: Gerente, Diretor..."
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Email
                                </label>
                                <input
                                  type="email"
                                  value={contato.email || ""}
                                  onChange={(e) =>
                                    handleContatoChange(
                                      index,
                                      "email",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="email@empresa.com"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Telefone
                                </label>
                                <input
                                  type="tel"
                                  value={contato.telefone || ""}
                                  onChange={(e) =>
                                    handleContatoChange(
                                      index,
                                      "telefone",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="+258 XX XXX XXXX"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Endereço */}
                {activeTab === "endereco" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Endereço de Cobrança
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Rua/Avenida
                        </label>
                        <input
                          type="text"
                          value={formData.enderecoCobranca?.rua || ""}
                          onChange={(e) =>
                            handleEnderecoChange("rua", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Nome da rua ou avenida"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bairro
                        </label>
                        <input
                          type="text"
                          value={formData.enderecoCobranca?.bairro || ""}
                          onChange={(e) =>
                            handleEnderecoChange("bairro", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Nome do bairro"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cidade
                        </label>
                        <input
                          type="text"
                          value={formData.enderecoCobranca?.cidade || ""}
                          onChange={(e) =>
                            handleEnderecoChange("cidade", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Nome da cidade"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Província
                        </label>
                        <input
                          type="text"
                          value={formData.enderecoCobranca?.provincia || ""}
                          onChange={(e) =>
                            handleEnderecoChange("provincia", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Nome da província"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Código Postal
                        </label>
                        <input
                          type="text"
                          value={formData.enderecoCobranca?.codigoPostal || ""}
                          onChange={(e) =>
                            handleEnderecoChange("codigoPostal", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="XXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          País
                        </label>
                        <input
                          type="text"
                          value={formData.enderecoCobranca?.pais || ""}
                          onChange={(e) =>
                            handleEnderecoChange("pais", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Moçambique"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Financeiro */}
                {activeTab === "financeiro" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Informações Financeiras
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Limite de Crédito (MZN)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            MZN
                          </span>
                          <input
                            type="number"
                            value={formData.limiteCredito || ""}
                            onChange={(e) =>
                              handleInputChange(
                                "limiteCredito",
                                parseFloat(e.target.value)
                              )
                            }
                            className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0,00"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Forma de Pagamento Preferida
                        </label>
                        <input
                          type="text"
                          value={formData.formaPagamento || ""}
                          onChange={(e) =>
                            handleInputChange("formaPagamento", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Ex: Transferência bancária"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Prazo de Pagamento (dias)
                        </label>
                        <input
                          type="number"
                          value={formData.prazoPagamento || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "prazoPagamento",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="30"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Outros */}
                {activeTab === "outros" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Canal de Captação
                        </label>
                        <select
                          value={formData.canalCaptacao || ""}
                          onChange={(e) =>
                            handleInputChange("canalCaptacao", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Selecione...</option>
                          <option value="indicacao">Indicação</option>
                          <option value="site">Site/Internet</option>
                          <option value="visita">Visita Comercial</option>
                          <option value="telefone">Telefone</option>
                          <option value="outro">Outro</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Vendedor Responsável
                        </label>
                        <input
                          type="text"
                          value={formData.vendedorResponsavel || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "vendedorResponsavel",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Nome do vendedor"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Observações Gerais
                      </label>
                      <textarea
                        value={formData.observacoes || ""}
                        onChange={(e) =>
                          handleInputChange("observacoes", e.target.value)
                        }
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Observações importantes sobre o cliente..."
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Use este espaço para notas internas sobre o cliente.
                      </p>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {cliente?.dataCadastro && (
                  <span>
                    Cadastrado em:{" "}
                    {new Date(cliente.dataCadastro).toLocaleDateString("pt-MZ")}
                  </span>
                )}
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  disabled={saving}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={saving || loading}
                  className="flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Salvando Alterações...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Salvar Alterações
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarClienteModal;