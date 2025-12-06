/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// MotoristasList.tsx
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
  Truck,
  Shield,
  Car,
  Phone,
  Mail,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Motorista {
  motoristaId: number;
  nomeCompleto: string;
  dataNascimento?: string;
  nacionalidade: string;
  empresaMotorista: string;
  empresaMotoristaId: number;
  cargo: string;
  statusContratual: "ativo" | "inativo" | "ferias" | "licenca" | "suspenso";
  numeroBI: string;
  validadeBI: string;
  passaporte?: {
    numero?: string;
    paisEmissor?: string;
    dataEmissao?: string;
    validade?: string;
    localEmissao?: string;
  };
  cartaConducao: {
    numero: string;
    categoria: string;
    dataEmissao?: string;
    validade: string;
    localEmissao?: string;
  };
  contactos: {
    telefonePrincipal: string;
    telefoneAlternativo?: string;
    email?: string;
  };
  avaliacaoGeral: number;
  status: "disponivel" | "em_viagem" | "ferias" | "licenca" | "indisponivel";
  veiculosHabilitados: Array<{
    tipo: string;
    marca: string;
    modelo: string;
    matricula: string;
    nivelInspecao: {
      categoria: "A" | "B" | "C";
      descricao: string;
      dataUltimaInspecao: string;
      dataProximaInspecao: string;
      resultadoUltimaInspecao: "aprovado" | "aprovado_com_ressalvas" | "reprovado";
    };
  }>;
  infoTransportador: {
    totalCamioes: number;
    qualificadoTransito: boolean;
    restricoes?: {
      podeFazerNacional: boolean;
      podeFazerTransito: boolean;
      motivo?: string;
    };
  };
  totalViagensRealizadas: number;
  totalKmPercorridos: number;
  indiceAcidentes: number;
  indiceMultas: number;
  dataCriacao: string;
  dataAtualizacao: string;
  cartaValida?: boolean;
  passaporteValido?: boolean;
  veiculosAptos?: Array<any>;
}

const MotoristasList = () => {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [filtros, setFiltros] = useState({
    nomeCompleto: "",
    motoristaId: "",
    numeroBI: "",
    passaporte: "",
    empresaMotorista: "",
    status: "",
    statusContratual: "",
    nivelInspecao: "",
    qualificadoTransito: "",
  });
  const [paginacao, setPaginacao] = useState({
    curPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPage: 0,
  });
  const [carregando, setCarregando] = useState(false);

  const carregarMotoristas = async (pagina = 1) => {
    setCarregando(true);
    try {
      const response = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/getMotoristaList", {
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
        setMotoristas(data.data.list || []);
        setPaginacao((prev) => ({
          ...prev,
          curPage: pagina,
          totalCount: data.data.totalCount,
          totalPage: data.data.totalPage,
        }));
      }
    } catch (error) {
      console.error("Erro ao carregar motoristas:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarMotoristas();
  }, [filtros.status, filtros.statusContratual]);

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleLimparFiltros = () => {
    setFiltros({
      nomeCompleto: "",
      motoristaId: "",
      numeroBI: "",
      passaporte: "",
      empresaMotorista: "",
      status: "",
      statusContratual: "",
      nivelInspecao: "",
      qualificadoTransito: "",
    });
  };

  const handleExcluirMotorista = async (motoristaId: number) => {
    if (window.confirm("Tem certeza que deseja excluir este motorista?")) {
      try {
        const response = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/deleteMotorista", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ motoristaId }),
        });

        const data = await response.json();
        if (data.returnCode === 200) {
          carregarMotoristas(paginacao.curPage);
        }
      } catch (error) {
        console.error("Erro ao excluir motorista:", error);
      }
    }
  };

  const statusContratualCores: Record<string, string> = {
    ativo: "bg-green-100 text-green-800",
    inativo: "bg-gray-100 text-gray-800",
    ferias: "bg-blue-100 text-blue-800",
    licenca: "bg-yellow-100 text-yellow-800",
    suspenso: "bg-red-100 text-red-800",
  };

  const statusCores: Record<string, string> = {
    disponivel: "bg-green-100 text-green-800",
    em_viagem: "bg-blue-100 text-blue-800",
    ferias: "bg-purple-100 text-purple-800",
    licenca: "bg-yellow-100 text-yellow-800",
    indisponivel: "bg-red-100 text-red-800",
  };

  const nivelInspecaoCores: Record<string, string> = {
    A: "bg-red-100 text-red-800",
    B: "bg-yellow-100 text-yellow-800",
    C: "bg-green-100 text-green-800",
  };

  const formatarData = (dataString: string) => {
    return new Date(dataString).toLocaleDateString("pt-MZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const calcularIdade = (dataNascimento?: string) => {
    if (!dataNascimento) return null;
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const verificarDocumentosVencidos = (motorista: Motorista) => {
    const hoje = new Date();
    const vencidos = [];

    // Verificar BI
    if (motorista.validadeBI && new Date(motorista.validadeBI) < hoje) {
      vencidos.push("BI");
    }

    // Verificar carta condução
    if (motorista.cartaConducao.validade && new Date(motorista.cartaConducao.validade) < hoje) {
      vencidos.push("Carta Condução");
    }

    // Verificar passaporte
    if (motorista.passaporte?.validade && new Date(motorista.passaporte.validade) < hoje) {
      vencidos.push("Passaporte");
    }

    return vencidos;
  };

  const renderizarEstrelas = (avaliacao: number) => {
    const estrelas = [];
    for (let i = 1; i <= 5; i++) {
      estrelas.push(
        <span
          key={i}
          className={`text-sm ${
            i <= Math.round(avaliacao) ? "text-yellow-400" : "text-gray-300"
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
                Gestão de Motoristas
              </h1>
              <p className="text-gray-600 mt-2">
                Gerencie motoristas profissionais e suas qualificações
              </p>
            </div>
            {/* <a
              href="/motoristas/novo"
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Novo Motorista
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
                  <p className="text-sm text-gray-600">Total Motoristas</p>
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
                  <p className="text-sm text-gray-600">Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {motoristas.filter((m) => m.statusContratual === "ativo").length}
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
                  <p className="text-sm text-gray-600">Qualificados Trânsito</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {motoristas.filter((m) => m.infoTransportador?.qualificadoTransito).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-red-100 p-3 rounded-lg mr-4">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Documentos Vencidos</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {motoristas.filter((m) => verificarDocumentosVencidos(m).length > 0).length}
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
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={filtros.nomeCompleto}
                  onChange={(e) => handleFiltroChange("nomeCompleto", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Buscar por nome..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número BI
                </label>
                <input
                  type="text"
                  value={filtros.numeroBI}
                  onChange={(e) => handleFiltroChange("numeroBI", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Número do BI"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passaporte
                </label>
                <input
                  type="text"
                  value={filtros.passaporte}
                  onChange={(e) => handleFiltroChange("passaporte", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Número do passaporte"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status Contratual
                </label>
                <select
                  value={filtros.statusContratual}
                  onChange={(e) => handleFiltroChange("statusContratual", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todos</option>
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                  <option value="ferias">Férias</option>
                  <option value="licenca">Licença</option>
                  <option value="suspenso">Suspenso</option>
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
                  <option value="disponivel">Disponível</option>
                  <option value="em_viagem">Em Viagem</option>
                  <option value="ferias">Férias</option>
                  <option value="licenca">Licença</option>
                  <option value="indisponivel">Indisponível</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  value={filtros.empresaMotorista}
                  onChange={(e) => handleFiltroChange("empresaMotorista", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Empresa do motorista"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nível Inspeção Veículo
                </label>
                <select
                  value={filtros.nivelInspecao}
                  onChange={(e) => handleFiltroChange("nivelInspecao", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todos</option>
                  <option value="A">A - Chanté</option>
                  <option value="B">B - Nacional</option>
                  <option value="C">C - Trânsito</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qualificado Trânsito
                </label>
                <select
                  value={filtros.qualificadoTransito}
                  onChange={(e) => handleFiltroChange("qualificadoTransito", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todos</option>
                  <option value="true">Sim</option>
                  <option value="false">Não</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Motorista
                </label>
                <input
                  type="text"
                  value={filtros.motoristaId}
                  onChange={(e) => handleFiltroChange("motoristaId", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ID do motorista"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => carregarMotoristas(1)}
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
              Lista de Motoristas ({paginacao.totalCount})
            </h2>
            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </button>
          </div>

          {carregando ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Carregando motoristas...</p>
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
                        Motorista
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Documentos
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Empresa & Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Veículos & Inspeção
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avaliação
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estatísticas
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {motoristas.map((motorista) => {
                      const documentosVencidos = verificarDocumentosVencidos(motorista);
                      const idade = calcularIdade(motorista.dataNascimento);
                      
                      return (
                        <tr key={motorista.motoristaId} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-blue-600">
                              #{motorista.motoristaId}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {motorista.nomeCompleto}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                {motorista.contactos.telefonePrincipal}
                              </div>
                              <div className="text-sm text-gray-500">
                                BI: {motorista.numeroBI}
                                {motorista.passaporte?.numero && (
                                  <span className="ml-2">| Pass: {motorista.passaporte.numero}</span>
                                )}
                              </div>
                              {idade && (
                                <div className="text-xs text-gray-500">
                                  {idade} anos | {motorista.nacionalidade}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="text-sm">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  new Date(motorista.cartaConducao.validade) > new Date()
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}>
                                  Carta: {motorista.cartaConducao.categoria}
                                </span>
                              </div>
                              <div className="text-xs text-gray-600">
                                Válido até: {formatarData(motorista.cartaConducao.validade)}
                              </div>
                              {documentosVencidos.length > 0 && (
                                <div className="flex items-center text-xs text-red-600">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  {documentosVencidos.length} vencido(s)
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <div className="text-sm font-medium text-gray-900">
                                {motorista.empresaMotorista}
                              </div>
                              <div className="flex flex-wrap gap-1">
                                <span
                                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    statusContratualCores[motorista.statusContratual]
                                  }`}
                                >
                                  {motorista.statusContratual}
                                </span>
                                <span
                                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    statusCores[motorista.status]
                                  }`}
                                >
                                  {motorista.status}
                                </span>
                              </div>
                              {motorista.infoTransportador?.qualificadoTransito && (
                                <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                                  <Truck className="h-3 w-3 mr-1" />
                                  Qualificado Trânsito
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="text-sm font-medium text-gray-900">
                                {motorista.veiculosHabilitados?.length || 0} veículo(s)
                              </div>
                              {motorista.veiculosHabilitados?.[0] && (
                                <>
                                  <div className="text-xs text-gray-600">
                                    {motorista.veiculosHabilitados[0].matricula}
                                  </div>
                                  <span
                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                      nivelInspecaoCores[motorista.veiculosHabilitados[0].nivelInspecao?.categoria] || "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {motorista.veiculosHabilitados[0].nivelInspecao?.categoria}
                                  </span>
                                  <div className="text-xs text-gray-500">
                                    Próx. inspeção: {formatarData(motorista.veiculosHabilitados[0].nivelInspecao.dataProximaInspecao)}
                                  </div>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center">
                                {renderizarEstrelas(motorista.avaliacaoGeral)}
                                <span className="ml-2 text-sm text-gray-700">
                                  ({motorista.avaliacaoGeral.toFixed(1)})
                                </span>
                              </div>
                              <div className="text-xs text-gray-600">
                                {motorista.totalViagensRealizadas} viagens
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="text-sm">
                                <div className="font-medium text-gray-900">
                                  {motorista.totalKmPercorridos.toLocaleString()} km
                                </div>
                                <div className="text-xs text-gray-500">
                                  Acidentes: {motorista.indiceAcidentes}% | Multas: {motorista.indiceMultas}%
                                </div>
                              </div>
                              {motorista.infoTransportador && (
                                <div className="text-xs text-gray-600">
                                  Camionista: {motorista.infoTransportador.totalCamioes} camiões
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              {/* <a
                                href={`/motoristas/${motorista.motoristaId}`}
                                className="text-blue-600 hover:text-blue-900 p-1"
                                title="Visualizar"
                              >
                                <Eye className="h-4 w-4" />
                              </a>
                              <a
                                href={`/motoristas/editar/${motorista.motoristaId}`}
                                className="text-green-600 hover:text-green-900 p-1"
                                title="Editar"
                              >
                                <Edit className="h-4 w-4" />
                              </a> */}
                              <button
                                onClick={() => handleExcluirMotorista(motorista.motoristaId)}
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
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Paginação */}
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Mostrando {motoristas.length} de {paginacao.totalCount} motoristas
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => carregarMotoristas(paginacao.curPage - 1)}
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
                            onClick={() => carregarMotoristas(pageNum)}
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
                      onClick={() => carregarMotoristas(paginacao.curPage + 1)}
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

export default MotoristasList;