/* eslint-disable @typescript-eslint/no-unused-vars */
// ClientesList.tsx
import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  UserPlus,
  Edit,
  Eye,
  Trash2,
  Download,
  MoreVertical,
  Users,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Cliente {
  codigo: string;
  nome: string;
  categoria: string;
  nuit: string;
  tipoPessoa: string;
  classificacao: string;
  status: string;
  segmento: string;
  dataCadastro: string;
  contatos: Array<{
    email: string;
    telefone: string;
  }>;
}

const ClientesList = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtros, setFiltros] = useState({
    nome: "",
    codigo: "",
    nuit: "",
    categoria: "",
    tipoPessoa: "",
    classificacao: "",
    status: "",
    segmento: "",
  });
  const [paginacao, setPaginacao] = useState({
    curPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPage: 0,
  });
  const [carregando, setCarregando] = useState(false);

  const carregarClientes = async (pagina = 1) => {
    setCarregando(true);
    try {
      const response = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/getClienteList", {
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
        setClientes(data.data.list || []);
        setPaginacao((prev) => ({
          ...prev,
          curPage: pagina,
          totalCount: data.data.totalCount,
          totalPage: data.data.totalPage,
        }));
      }
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarClientes();
  }, [filtros.categoria, filtros.status]);

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleLimparFiltros = () => {
    setFiltros({
      nome: "",
      codigo: "",
      nuit: "",
      categoria: "",
      tipoPessoa: "",
      classificacao: "",
      status: "",
      segmento: "",
    });
  };

  const handleExcluirCliente = async (codigo: string) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      try {
        const response = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/deleteCliente", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ codigo }),
        });

        const data = await response.json();
        if (data.returnCode === 200) {
          carregarClientes(paginacao.curPage);
        }
      } catch (error) {
        console.error("Erro ao excluir cliente:", error);
      }
    }
  };

  const classificacaoCores: Record<string, string> = {
  VIP: "bg-yellow-100 text-yellow-800",
  A: "bg-green-100 text-green-800",
  B: "bg-blue-100 text-blue-800",
  C: "bg-purple-100 text-purple-800",
  Novo: "bg-gray-100 text-gray-800",
};


  const statusCores: Record<string, string> = {
  ativo: "bg-green-100 text-green-800",
  inativo: "bg-gray-100 text-gray-800",
  suspenso: "bg-yellow-100 text-yellow-800",
  potencial: "bg-blue-100 text-blue-800",
};


  const categoriaCores: Record<string, string> = {
  Gestor: "bg-blue-100 text-blue-800",
  Cliente: "bg-green-100 text-green-800",
  Motorista: "bg-yellow-100 text-yellow-800",
};

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gestão de Clientes
              </h1>
              <p className="text-gray-600 mt-2">
                Gerencie clientes, gestores e motoristas do sistema
              </p>
            </div>
            {/* <a
              href="/clientes/novo"
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Novo Cadastro
            </a> */}
          </div>

          {/* Cards Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Clientes</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {paginacao.totalCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {clientes.filter((c) => c.status === "ativo").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">VIP</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {clientes.filter((c) => c.classificacao === "VIP").length}
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-amber-100 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Motoristas</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {clientes.filter((c) => c.categoria === "Motorista").length}
                  </p>
                </div>
              </div>
            </div> */}
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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  value={filtros.nome}
                  onChange={(e) => handleFiltroChange("nome", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Buscar por nome..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <select
                  value={filtros.categoria}
                  onChange={(e) =>
                    handleFiltroChange("categoria", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todas</option>
                  <option value="Gestor">Gestor</option>
                  <option value="Cliente">Cliente</option>
                  <option value="Motorista">Motorista</option>
                </select>
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
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                  <option value="suspenso">Suspenso</option>
                  <option value="potencial">Potencial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Classificação
                </label>
                <select
                  value={filtros.classificacao}
                  onChange={(e) =>
                    handleFiltroChange("classificacao", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todas</option>
                  <option value="VIP">VIP</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="Novo">Novo</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NUIT
                </label>
                <input
                  type="text"
                  value={filtros.nuit}
                  onChange={(e) => handleFiltroChange("nuit", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Número do NUIT"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código
                </label>
                <input
                  type="text"
                  value={filtros.codigo}
                  onChange={(e) => handleFiltroChange("codigo", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Código do cliente"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Segmento
                </label>
                <input
                  type="text"
                  value={filtros.segmento}
                  onChange={(e) =>
                    handleFiltroChange("segmento", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Segmento de atuação"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => carregarClientes(1)}
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
              Lista de Clientes ({paginacao.totalCount})
            </h2>
            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </button>
          </div>

          {carregando ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Carregando clientes...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Código
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nome / Empresa
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Classificação
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contato
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
                    {clientes.map((cliente) => (
                      <tr key={cliente.codigo} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-blue-600">
                            {cliente.codigo}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {cliente.nome}
                            </div>
                            <div className="text-sm text-gray-500">
                              NUIT: {cliente.nuit}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              categoriaCores[cliente.categoria] ||
                              "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {cliente.categoria}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              classificacaoCores[cliente.classificacao]
                            }`}
                          >
                            {cliente.classificacao}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              statusCores[cliente.status]
                            }`}
                          >
                            {cliente.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {cliente.contatos?.[0]?.email || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {cliente.contatos?.[0]?.telefone || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(cliente.dataCadastro).toLocaleDateString(
                            "pt-MZ"
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            {/* <a
                              href={`/clientes/${cliente.codigo}`}
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="Visualizar"
                            >
                              <Eye className="h-4 w-4" />
                            </a>
                            <a
                              href={`/clientes/editar/${cliente.codigo}`}
                              className="text-green-600 hover:text-green-900 p-1"
                              title="Editar"
                            >
                              <Edit className="h-4 w-4" />
                            </a> */}
                            <button
                              onClick={() =>
                                handleExcluirCliente(cliente.codigo)
                              }
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
                    Mostrando {clientes.length} de {paginacao.totalCount}{" "}
                    clientes
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => carregarClientes(paginacao.curPage - 1)}
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
                            onClick={() => carregarClientes(pageNum)}
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
                      onClick={() => carregarClientes(paginacao.curPage + 1)}
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

export default ClientesList;
