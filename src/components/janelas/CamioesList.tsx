/* eslint-disable @typescript-eslint/no-unused-vars */
// CamioesList.tsx
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
  MapPin,
  Shield,
  Gauge,
  AlertCircle,
  Camera,
  Satellite,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

interface Camiao {
  camiaoId: number;
  matricula: string;
  marca: string;
  modelo: string;
  anoFabricacao: number;
  cor?: string;
  transportadoraId: number;
  motoristaId: number;
  codigoGPS: string;
  tipoGPS: {
    tipo: "normal" | "vip";
    descricao: string;
    valorRegistro: number;
    dataAtivacao: string;
    dataExpiracao?: string;
    status: "ativo" | "inativo" | "pendente" | "expirado";
  };
  especificacoes: {
    tipo: string;
    pesoBruto: number;
    tara: number;
    cargaUtil: number;
    comprimento?: number;
    largura?: number;
    altura?: number;
    volumeUtil?: number;
    numEixos: number;
  };
  nivelInspecao: {
    categoria: "A" | "B" | "C";
    descricao: string;
    dataUltimaInspecao: string;
    dataProximaInspecao: string;
    resultadoUltimaInspecao: "aprovado" | "aprovado_com_ressalvas" | "reprovado";
    centroInspecao?: string;
  };
  viabilidade: {
    podeChante: boolean;
    podeNacional: boolean;
    podeTransito: boolean;
    podeGPSVip: boolean;
    motivos?: string[];
  };
  manutencao: {
    proximaManutencao?: string;
    ultimaManutencao?: string;
    kmUltimaManutencao?: number;
    periodicidadeManutencao: number;
  };
  estado: {
    tipo: "novo" | "seminovo" | "usado" | "recondicionado";
    observacoes?: string;
  };
  historicoUtilizacao: {
    totalKmPercorridos: number;
    totalViagens: number;
    dataPrimeiraUtilizacao?: string;
    dataUltimaUtilizacao?: string;
    consumoMedio?: number;
    viagensComGPSVip: number;
    totalHorasMonitoradas: number;
  };
  status: "disponivel" | "em_viagem" | "manutencao" | "inativo" | "reservado";
  dataCriacao: string;
  dataAtualizacao: string;
  idade?: number;
  inspecaoValida?: boolean;
  gpsVipAtivo?: boolean;
  diasExpiracaoGPS?: number;
}

const CamioesList = () => {
  const [camioes, setCamioes] = useState<Camiao[]>([]);
  const [filtros, setFiltros] = useState({
    matricula: "",
    camiaoId: "",
    transportadoraId: "",
    motoristaId: "",
    status: "",
    categoriaInspecao: "",
    tipoGPS: "",
    gpsStatus: "",
  });
  const [paginacao, setPaginacao] = useState({
    curPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPage: 0,
  });
  const [carregando, setCarregando] = useState(false);

  const carregarCamioes = async (pagina = 1) => {
    setCarregando(true);
    try {
      const response = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/getCamiaoList", {
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
        setCamioes(data.data.list || []);
        setPaginacao((prev) => ({
          ...prev,
          curPage: pagina,
          totalCount: data.data.totalCount,
          totalPage: data.data.totalPage,
        }));
      }
    } catch (error) {
      console.error("Erro ao carregar camiões:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarCamioes();
  }, [filtros.status, filtros.tipoGPS]);

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleLimparFiltros = () => {
    setFiltros({
      matricula: "",
      camiaoId: "",
      transportadoraId: "",
      motoristaId: "",
      status: "",
      categoriaInspecao: "",
      tipoGPS: "",
      gpsStatus: "",
    });
  };

  const handleExcluirCamiao = async (camiaoId: number) => {
    if (window.confirm("Tem certeza que deseja excluir este camião?")) {
      try {
        // NOTA: Você precisará criar uma rota deleteCamiao no backend
        const response = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/deleteCamiao", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ camiaoId }),
        });

        const data = await response.json();
        if (data.returnCode === 200) {
          carregarCamioes(paginacao.curPage);
        }
      } catch (error) {
        console.error("Erro ao excluir camião:", error);
      }
    }
  };

  const statusCores: Record<string, string> = {
    disponivel: "bg-green-100 text-green-800",
    em_viagem: "bg-blue-100 text-blue-800",
    manutencao: "bg-yellow-100 text-yellow-800",
    inativo: "bg-gray-100 text-gray-800",
    reservado: "bg-purple-100 text-purple-800",
  };

  const categoriaInspecaoCores: Record<string, string> = {
    A: "bg-red-100 text-red-800",
    B: "bg-yellow-100 text-yellow-800",
    C: "bg-green-100 text-green-800",
  };

  const tipoGPSCores: Record<string, string> = {
    normal: "bg-gray-100 text-gray-800",
    vip: "bg-purple-100 text-purple-800",
  };

  const estadoCores: Record<string, string> = {
    novo: "bg-green-100 text-green-800",
    seminovo: "bg-blue-100 text-blue-800",
    usado: "bg-yellow-100 text-yellow-800",
    recondicionado: "bg-orange-100 text-orange-800",
  };

  const resultadoInspecaoCores: Record<string, string> = {
    aprovado: "bg-green-100 text-green-800",
    aprovado_com_ressalvas: "bg-yellow-100 text-yellow-800",
    reprovado: "bg-red-100 text-red-800",
  };

  const formatarData = (dataString: string) => {
    return new Date(dataString).toLocaleDateString("pt-MZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatarNumero = (numero: number) => {
    return numero.toLocaleString("pt-MZ");
  };

  const verificarGPSExpirado = (camiao: Camiao) => {
    if (!camiao.tipoGPS?.dataExpiracao) return false;
    return new Date(camiao.tipoGPS.dataExpiracao) < new Date();
  };

  const verificarManutencaoProxima = (camiao: Camiao) => {
    if (!camiao.manutencao?.proximaManutencao) return false;
    const hoje = new Date();
    const proxima = new Date(camiao.manutencao.proximaManutencao);
    const diffDias = Math.ceil((proxima.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
    return diffDias <= 7; // Próxima manutenção em 7 dias ou menos
  };

  const calcularIdade = (anoFabricacao: number) => {
    const anoAtual = new Date().getFullYear();
    return anoAtual - anoFabricacao;
  };

  const obterDescricaoCategoria = (categoria: string) => {
    const descricoes: Record<string, string> = {
      A: "Chanté - Inspeção 6 meses",
      B: "Nacional - Inspeção 1 ano",
      C: "Transito - Inspeção 2 anos",
    };
    return descricoes[categoria] || categoria;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gestão de Camiões
              </h1>
              <p className="text-gray-600 mt-2">
                Gerencie a frota de camiões, GPS e inspeções
              </p>
            </div>
            {/* <a
              href="/camioes/novo"
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              <Truck className="h-5 w-5 mr-2" />
              Novo Camião
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
                  <p className="text-sm text-gray-600">Total Camiões</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {paginacao.totalCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Satellite className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">GPS VIP Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {camioes.filter((c) => c.tipoGPS?.tipo === "vip" && c.gpsVipAtivo).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                  <Shield className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Inspeções Vencidas</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {camioes.filter((c) => !c.inspecaoValida).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Camera className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Categoria C (Trânsito)</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {camioes.filter((c) => c.nivelInspecao?.categoria === "C").length}
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
                  Matrícula
                </label>
                <input
                  type="text"
                  value={filtros.matricula}
                  onChange={(e) => handleFiltroChange("matricula", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Matrícula do camião..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria Inspeção
                </label>
                <select
                  value={filtros.categoriaInspecao}
                  onChange={(e) => handleFiltroChange("categoriaInspecao", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todas</option>
                  <option value="A">A - Chanté</option>
                  <option value="B">B - Nacional</option>
                  <option value="C">C - Trânsito</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo GPS
                </label>
                <select
                  value={filtros.tipoGPS}
                  onChange={(e) => handleFiltroChange("tipoGPS", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todos</option>
                  <option value="normal">Normal</option>
                  <option value="vip">VIP</option>
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
                  <option value="manutencao">Manutenção</option>
                  <option value="inativo">Inativo</option>
                  <option value="reservado">Reservado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status GPS
                </label>
                <select
                  value={filtros.gpsStatus}
                  onChange={(e) => handleFiltroChange("gpsStatus", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todos</option>
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                  <option value="pendente">Pendente</option>
                  <option value="expirado">Expirado</option>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Camião
                </label>
                <input
                  type="text"
                  value={filtros.camiaoId}
                  onChange={(e) => handleFiltroChange("camiaoId", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ID do camião"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => carregarCamioes(1)}
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
              Lista de Camiões ({paginacao.totalCount})
            </h2>
            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </button>
          </div>

          {carregando ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Carregando camiões...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Matrícula
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Especificações
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        GPS & Inspeção
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado & Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Viabilidade
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Utilização
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {camioes.map((camiao) => {
                      const gpsExpirado = verificarGPSExpirado(camiao);
                      const manutencaoProxima = verificarManutencaoProxima(camiao);
                      const idade = calcularIdade(camiao.anoFabricacao);
                      
                      return (
                        <tr key={camiao.camiaoId} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {camiao.matricula}
                              </div>
                              <div className="text-sm text-gray-500">
                                {camiao.marca} {camiao.modelo}
                              </div>
                              <div className="text-xs text-gray-500">
                                Ano: {camiao.anoFabricacao} ({idade} anos)
                              </div>
                              <div className="text-xs text-gray-500">
                                ID: #{camiao.camiaoId}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="text-sm">
                                <span className="font-medium">Tipo:</span> {camiao.especificacoes.tipo}
                              </div>
                              <div className="text-xs text-gray-600">
                                <span className="font-medium">Carga:</span> {formatarNumero(camiao.especificacoes.cargaUtil)} kg
                              </div>
                              <div className="text-xs text-gray-600">
                                <span className="font-medium">Peso:</span> {formatarNumero(camiao.especificacoes.pesoBruto)} kg
                              </div>
                              <div className="text-xs text-gray-600">
                                <span className="font-medium">Eixos:</span> {camiao.especificacoes.numEixos}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <span
                                  className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                                    tipoGPSCores[camiao.tipoGPS?.tipo || "normal"]
                                  }`}
                                >
                                  {camiao.tipoGPS?.tipo === "vip" ? (
                                    <Satellite className="h-3 w-3 mr-1" />
                                  ) : (
                                    <MapPin className="h-3 w-3 mr-1" />
                                  )}
                                  GPS {camiao.tipoGPS?.tipo?.toUpperCase()}
                                </span>
                                {gpsExpirado && (
                                  <AlertCircle className="h-4 w-4 text-red-500 ml-1" />
                                )}
                              </div>
                              <div className="text-xs">
                                <span
                                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    categoriaInspecaoCores[camiao.nivelInspecao?.categoria]
                                  }`}
                                >
                                  {camiao.nivelInspecao?.categoria}
                                </span>
                                <div className="text-xs text-gray-600 mt-1">
                                  Próx. inspeção: {formatarData(camiao.nivelInspecao.dataProximaInspecao)}
                                </div>
                                <div className="flex items-center mt-1">
                                  {camiao.inspecaoValida ? (
                                    <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                                  ) : (
                                    <XCircle className="h-3 w-3 text-red-500 mr-1" />
                                  )}
                                  <span
                                    className={`text-xs ${
                                      resultadoInspecaoCores[camiao.nivelInspecao.resultadoUltimaInspecao]
                                    }`}
                                  >
                                    {camiao.nivelInspecao.resultadoUltimaInspecao.replace("_", " ")}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  statusCores[camiao.status]
                                }`}
                              >
                                {camiao.status}
                              </span>
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  estadoCores[camiao.estado?.tipo]
                                }`}
                              >
                                {camiao.estado?.tipo}
                              </span>
                              {manutencaoProxima && (
                                <div className="flex items-center text-xs text-yellow-600">
                                  <Clock className="h-3 w-3 mr-1" />
                                  Manutenção próxima
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex flex-wrap gap-1">
                                {camiao.viabilidade?.podeChante && (
                                  <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                    <Truck className="h-3 w-3 mr-1" />
                                    Chanté
                                  </span>
                                )}
                                {camiao.viabilidade?.podeNacional && (
                                  <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    Nacional
                                  </span>
                                )}
                                {camiao.viabilidade?.podeTransito && (
                                  <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                    <Shield className="h-3 w-3 mr-1" />
                                    Trânsito
                                  </span>
                                )}
                              </div>
                              {camiao.viabilidade?.podeGPSVip && (
                                <div className="flex items-center text-xs text-purple-600 mt-1">
                                  <Camera className="h-3 w-3 mr-1" />
                                  Elegível GPS VIP
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="text-sm">
                                <div className="font-medium text-gray-900">
                                  {formatarNumero(camiao.historicoUtilizacao.totalKmPercorridos)} km
                                </div>
                                <div className="text-xs text-gray-500">
                                  {camiao.historicoUtilizacao.totalViagens} viagens
                                </div>
                              </div>
                              {camiao.tipoGPS?.tipo === "vip" && (
                                <div className="text-xs text-gray-600">
                                  <div>VIP: {camiao.historicoUtilizacao.viagensComGPSVip}</div>
                                  <div>Horas: {camiao.historicoUtilizacao.totalHorasMonitoradas}h</div>
                                </div>
                              )}
                              {camiao.historicoUtilizacao.dataUltimaUtilizacao && (
                                <div className="text-xs text-gray-500">
                                  Última: {formatarData(camiao.historicoUtilizacao.dataUltimaUtilizacao)}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              {/* <a
                                href={`/camioes/${camiao.camiaoId}`}
                                className="text-blue-600 hover:text-blue-900 p-1"
                                title="Visualizar"
                              >
                                <Eye className="h-4 w-4" />
                              </a>
                              <a
                                href={`/camioes/editar/${camiao.camiaoId}`}
                                className="text-green-600 hover:text-green-900 p-1"
                                title="Editar"
                              >
                                <Edit className="h-4 w-4" />
                              </a> */}
                              <button
                                onClick={() => handleExcluirCamiao(camiao.camiaoId)}
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
                    Mostrando {camioes.length} de {paginacao.totalCount} camiões
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => carregarCamioes(paginacao.curPage - 1)}
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
                            onClick={() => carregarCamioes(pageNum)}
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
                      onClick={() => carregarCamioes(paginacao.curPage + 1)}
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

export default CamioesList;