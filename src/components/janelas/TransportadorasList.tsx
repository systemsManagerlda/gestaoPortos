/* eslint-disable @typescript-eslint/no-unused-vars */
// TransportadorasList.tsx
import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Truck,
  Edit,
  Eye,
  Trash2,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Shield,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

interface Transportadora {
  transportadoraId: number;
  nomeEmpresa: string;
  nif: string;
  email: string;
  website?: string;
  contactos: {
    telefonePrincipal: string;
    telefoneAlternativo?: string;
    emailComercial?: string;
  };
  endereco: {
    provincia: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero?: string;
  };
  documentos?: {
    alvara?: {
      numero?: string;
      dataEmissao?: string;
      dataValidade?: string;
    };
    registoComercial?: {
      numero?: string;
      dataRegisto?: string;
    };
    certificadoRegisto?: {
      numero?: string;
      dataEmissao?: string;
    };
  };
  tipoServicos: string[];
  capacidadeTotal: {
    totalCamioes: number;
    totalMotoristas: number;
    tonelagemMaxima?: number;
  };
  avaliacaoGeral: number;
  status: "ativa" | "inativa" | "suspensa" | "pendente";
  dataCriacao: string;
  dataAtualizacao: string;
  qualificadaTransito?: boolean;
  servicosPermitidos?: string[];
}

const TransportadorasList = () => {
  const [transportadoras, setTransportadoras] = useState<Transportadora[]>([]);
  const [filtros, setFiltros] = useState({
    nomeEmpresa: "",
    transportadoraId: "",
    nif: "",
    status: "",
    provincia: "",
    email: "",
  });
  const [paginacao, setPaginacao] = useState({
    curPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPage: 0,
  });
  const [carregando, setCarregando] = useState(false);

  const carregarTransportadoras = async (pagina = 1) => {
    setCarregando(true);
    try {
      const response = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/getTransportadoraList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          curPage: pagina,
          pageSize: paginacao.pageSize,
          ...filtros,
        }),
      });

      const data = await response.json();

      if (data.returnCode === 200) {
        setTransportadoras(data.data.list || []);
        setPaginacao((prev) => ({
          ...prev,
          curPage: pagina,
          totalCount: data.data.totalCount,
          totalPage: data.data.totalPage,
        }));
      }
    } catch (error) {
      console.error("Erro ao carregar transportadoras:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarTransportadoras();
  }, [filtros.status]);

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleLimparFiltros = () => {
    setFiltros({
      nomeEmpresa: "",
      transportadoraId: "",
      nif: "",
      status: "",
      provincia: "",
      email: "",
    });
  };

  const handleExcluirTransportadora = async (transportadoraId: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta transportadora?")) {
      try {
        // NOTA: Você precisará criar uma rota deleteTransportadora no backend
        const response = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/deleteTransportadora", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transportadoraId }),
        });

        const data = await response.json();
        if (data.returnCode === 200) {
          carregarTransportadoras(paginacao.curPage);
        }
      } catch (error) {
        console.error("Erro ao excluir transportadora:", error);
      }
    }
  };

  const statusCores: Record<string, string> = {
    ativa: "bg-green-100 text-green-800",
    inativa: "bg-gray-100 text-gray-800",
    suspensa: "bg-yellow-100 text-yellow-800",
    pendente: "bg-blue-100 text-blue-800",
  };

  const tipoServicoCores: Record<string, string> = {
    chante: "bg-purple-100 text-purple-800",
    nacional: "bg-blue-100 text-blue-800",
    transito: "bg-orange-100 text-orange-800",
  };

  const formatarData = (dataString: string) => {
    return new Date(dataString).toLocaleDateString("pt-MZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const renderizarEstrelas = (avaliacao: number) => {
    const estrelas = [];
    for (let i = 1; i <= 5; i++) {
      estrelas.push(
        <span
          key={i}
          className={`text-lg ${
            i <= Math.round(avaliacao)
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
        >
          ★
        </span>
      );
    }
    return estrelas;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gestão de Transportadoras
              </h1>
              <p className="text-gray-600 mt-2">
                Gerencie transportadoras cadastradas no sistema
              </p>
            </div>
            {/* <a
              href="/transportadoras/nova"
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              <Truck className="h-5 w-5 mr-2" />
              Nova Transportadora
            </a> */}
          </div>

          {/* Cards Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Transportadoras</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {paginacao.totalCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ativas</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {transportadoras.filter((t) => t.status === "ativa").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <Truck className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Qualificadas Trânsito</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {transportadoras.filter((t) => t.capacidadeTotal.totalCamioes >= 3).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Províncias Únicas</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Array.from(new Set(transportadoras.map((t) => t.endereco.provincia))).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                <Filter className="h-5 w-5 inline mr-2" />
                Filtros
              </h2>
              <button
                onClick={handleLimparFiltros}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Limpar filtros
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Empresa
                </label>
                <input
                  type="text"
                  value={filtros.nomeEmpresa}
                  onChange={(e) => handleFiltroChange("nomeEmpresa", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Buscar por nome..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NUIT
                </label>
                <input
                  type="text"
                  value={filtros.nif}
                  onChange={(e) => handleFiltroChange("nif", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Número do NUIT"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={filtros.status}
                  onChange={(e) => handleFiltroChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todos</option>
                  <option value="ativa">Ativa</option>
                  <option value="inativa">Inativa</option>
                  <option value="suspensa">Suspensa</option>
                  <option value="pendente">Pendente</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Transportadora
                </label>
                <input
                  type="text"
                  value={filtros.transportadoraId}
                  onChange={(e) => handleFiltroChange("transportadoraId", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ID da transportadora"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Província
                </label>
                <input
                  type="text"
                  value={filtros.provincia}
                  onChange={(e) => handleFiltroChange("provincia", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Província"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={filtros.email}
                  onChange={(e) => handleFiltroChange("email", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => carregarTransportadoras(1)}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                <Search className="h-4 w-4 mr-2" />
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Lista de Transportadoras ({paginacao.totalCount})
            </h2>
            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </button>
          </div>

          {carregando ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Carregando transportadoras...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Empresa
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Localização
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Serviços
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Capacidade
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avaliação
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cadastro
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transportadoras.map((transportadora) => (
                      <tr key={transportadora.transportadoraId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-blue-600">
                            #{transportadora.transportadoraId}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {transportadora.nomeEmpresa}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {transportadora.email}
                            </div>
                            <div className="text-sm text-gray-500">
                              NUIT: {transportadora.nif}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {transportadora.endereco.provincia}
                          </div>
                          <div className="text-sm text-gray-500">
                            {transportadora.endereco.cidade}, {transportadora.endereco.bairro}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {transportadora.tipoServicos.map((servico) => (
                              <span
                                key={servico}
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  tipoServicoCores[servico] || "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {servico}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">
                              {transportadora.capacidadeTotal.totalCamioes} camiões
                            </div>
                            <div className="text-gray-500">
                              {transportadora.capacidadeTotal.totalMotoristas} motoristas
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex mr-2">
                              {renderizarEstrelas(transportadora.avaliacaoGeral)}
                            </div>
                            <span className="text-sm text-gray-700">
                              ({transportadora.avaliacaoGeral.toFixed(1)})
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              statusCores[transportadora.status]
                            }`}
                          >
                            {transportadora.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatarData(transportadora.dataCriacao)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            {/* <a
                              href={`/transportadoras/${transportadora.transportadoraId}`}
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="Visualizar"
                            >
                              <Eye className="h-4 w-4" />
                            </a>
                            <a
                              href={`/transportadoras/editar/${transportadora.transportadoraId}`}
                              className="text-green-600 hover:text-green-900 p-1"
                              title="Editar"
                            >
                              <Edit className="h-4 w-4" />
                            </a> */}
                            <button
                              onClick={() => handleExcluirTransportadora(transportadora.transportadoraId)}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Excluir"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900 p-1">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginação */}
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Mostrando {transportadoras.length} de {paginacao.totalCount} transportadoras
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => carregarTransportadoras(paginacao.curPage - 1)}
                      disabled={paginacao.curPage === 1}
                      className={`p-2 rounded-lg ${
                        paginacao.curPage === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    {[...Array(Math.min(5, paginacao.totalPage)).keys()].map(
                      (page) => {
                        const pageNum = page + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => carregarTransportadoras(pageNum)}
                            className={`w-10 h-10 rounded-lg font-medium ${
                              paginacao.curPage === pageNum
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                    )}

                    <button
                      onClick={() => carregarTransportadoras(paginacao.curPage + 1)}
                      disabled={paginacao.curPage === paginacao.totalPage}
                      className={`p-2 rounded-lg ${
                        paginacao.curPage === paginacao.totalPage
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransportadorasList;