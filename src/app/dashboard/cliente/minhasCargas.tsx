/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useMemo } from "react";
import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiDownload,
  FiPrinter,
  FiShare2,
  FiPackage,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiEye,
  FiAlertTriangle,
  FiAlertCircle,
  FiTruck,
  FiDollarSign,
  FiShield,
} from "react-icons/fi";

// Importações das novas funções
import { useCargaHook } from "./useCargaHook";
import { PaginationComponent } from "./PaginationComponent";
import { NovaCargaModal } from "./NovaCargaModal";
import {
  formatarData,
  formatarMoeda,
  getStatusColor,
  getStatusText,
  getPrioridadeColor,
} from "./cargaUtils";
import { VisualizarCargaModal } from "./VisualizarCargaModal";
import { RastreamentoModal } from "./RastreamentoModal";
import { Carga } from "./cargaService";


const CargasComponent = () => {
  const [showVisualizarModal, setShowVisualizarModal] = useState(false);
  const [cargaSelecionada, setCargaSelecionada] = useState<Carga | null>(null);
  const [showRastreamentoModal, setShowRastreamentoModal] = useState(false);

  // Usando o hook personalizado para gerenciar o estado das cargas
  const {
    // Estados
    filteredCargas,
    isDataLoading,
    pagination,
    searchTerm,
    statusFilter,
    tipoFilter,
    naturezaFilter,
    filtrosAvancados,
    showNovaCargaModal,
    novaCarga,
    isSubmitting,

    // Setters
    setSearchTerm,
    setStatusFilter,
    setTipoFilter,
    setNaturezaFilter,
    setFiltrosAvancados,
    setShowNovaCargaModal,
    setNovaCarga,

    // Funções
    fetchCargas,
    criarNovaCarga,
    exportarDados,
  } = useCargaHook();

  const handleCriarCarga = async (): Promise<void> => {
    try {
      const sucesso = await criarNovaCarga();
      if (sucesso) {
        console.log("Carga criada com sucesso!");
        // Recarregar a lista de cargas
        fetchCargas(1, pagination.pageSize);
      }
    } catch (error) {
      console.error("Erro ao criar carga:", error);
    }
  };

  // Função para verificar se a carga tem transporte aceite
  const cargaTemTransporteAceite = useCallback((carga: Carga): boolean => {
    return !!(
      carga.motorista &&
      carga.motorista.id &&
      carga.motorista.nome &&
      carga.status !== "planeada" &&
      carga.status !== "aguardando_coleta"
    );
  }, []);

  // Função para mudar de página
  const handlePageChange = useCallback(
    (newPage: number | undefined) => {
      fetchCargas(newPage, pagination.pageSize);
    },
    [fetchCargas, pagination.pageSize]
  );

  // Função para abrir modal de rastreamento
  const abrirRastreamentoModal = useCallback(
    (carga: Carga) => {
      console.log("Abrir modal de rastreamento para:", carga);

      if (!cargaTemTransporteAceite(carga)) {
        console.warn("Esta carga não tem transporte aceite ainda.");
        alert(
          "Esta carga ainda não foi aceite por nenhum motorista. O rastreamento estará disponível após a associação do transporte."
        );
        return;
      }

      setCargaSelecionada(carga);
      setShowRastreamentoModal(true);
    },
    [cargaTemTransporteAceite]
  );

  // Função para visualizar carga
  const visualizarCarga = useCallback((carga: Carga) => {
    console.log("Visualizar carga:", carga);
    setCargaSelecionada(carga);
    setShowVisualizarModal(true);
  }, []);

  const visualizarOcorrencias = useCallback((carga: Carga) => {
    console.log("Visualizar ocorrências:", carga.ocorrencias);
    // Implementar visualização de ocorrências
  }, []);

  // Função para exportar dados
  const handleExportarDados = async (tipo: string) => {
    try {
      console.log(tipo);
      await exportarDados();
    } catch (error) {
      console.error("Erro ao exportar dados:", error);
    }
  };

  // Função para limpar filtros
  const handleLimparFiltros = useCallback(() => {
    setSearchTerm("");
    setStatusFilter("todos");
    setTipoFilter("todos");
    setNaturezaFilter("todos");
    setFiltrosAvancados({
      prioridade: "todos",
      valorMin: "",
      valorMax: "",
      dataInicio: "",
      dataFim: "",
      categoriaSeguro: "todos",
      abrangenciaSeguro: "todos",
      tipoPercurso: "todos",
    });
  }, [
    setSearchTerm,
    setStatusFilter,
    setTipoFilter,
    setNaturezaFilter,
    setFiltrosAvancados,
  ]);

  // Estatísticas calculadas
 const estatisticas = useMemo(() => {
  const total = filteredCargas.length;
  const emTransito = filteredCargas.filter(
    c => c.status === "em_transito"
  ).length;
  const entregues = filteredCargas.filter(
    c => c.status === "entregue"
  ).length;
  const atrasadas = filteredCargas.filter(c => c.atrasada).length;
  
  // Correção para o filtro de seguro - usando verificação segura
  const comSeguroAtivo = filteredCargas.filter(
    c => c.seguro?.statusSeguro === "ativo"
  ).length;

  const valorTotalCargas = filteredCargas.reduce(
    (sum, c) => sum + (c.valorTotal || 0),
    0
  );
  const comissaoTotal = filteredCargas.reduce(
    (sum, c) => sum + (c.comissaoCalculada || 0),
    0
  );

  return {
    total,
    emTransito,
    entregues,
    atrasadas,
    comSeguroAtivo,
    valorTotalCargas,
    comissaoTotal,
  };
}, [filteredCargas]);
  // Componente Spinner
  const Spinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
    const sizes: Record<"sm" | "md" | "lg", string> = {
      sm: "w-4 h-4",
      md: "w-8 h-8",
      lg: "w-12 h-12",
    };

    return (
      <div
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizes[size]}`}
      ></div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {estatisticas.total}
              </p>
            </div>
            <FiPackage className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Em Trânsito
              </p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {estatisticas.emTransito}
              </p>
            </div>
            <FiTruck className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Entregues
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {estatisticas.entregues}
              </p>
            </div>
            <FiPackage className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Atrasadas
              </p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {estatisticas.atrasadas}
              </p>
            </div>
            <FiAlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Com Seguro
              </p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {estatisticas.comSeguroAtivo}
              </p>
            </div>
            <FiShield className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Valor Total
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {formatarMoeda(estatisticas.valorTotalCargas)}
              </p>
            </div>
            <FiDollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="flex flex-col lg:flex-row gap-4 flex-1 w-full">
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por código, cliente, tipo ou motorista..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="todos">Todos os Status</option>
                <option value="planeada">Planeada</option>
                <option value="aguardando_coleta">Aguardando Coleta</option>
                <option value="coletada">Coletada</option>
                <option value="em_transito">Em Trânsito</option>
                <option value="em_fronteira">Em Fronteira</option>
                <option value="aguardando_desembaraco">
                  Aguardando Desembaraço
                </option>
                <option value="em_entrega">Em Entrega</option>
                <option value="entregue">Entregue</option>
                <option value="encerrada">Encerrada</option>
                <option value="armazenada">Armazenada</option>
              </select>

              <select
                value={tipoFilter}
                onChange={(e) => setTipoFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="todos">Todos os Tipos</option>
                <option value="Contentorizada">Contentorizada</option>
                <option value="Solta">Solta</option>
                <option value="Granel">Granel</option>
                <option value="Frigorífica">Frigorífica</option>
                <option value="Perigosa">Perigosa</option>
              </select>

              <select
                value={naturezaFilter}
                onChange={(e) => setNaturezaFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="todos">Todas as Naturezas</option>
                <option value="perigosa">Perigosa</option>
                <option value="não perigosa">Não Perigosa</option>
                <option value="sensível">Sensível</option>
                <option value="fragil">Frágil</option>
              </select>

              <button
                onClick={handleLimparFiltros}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FiFilter className="w-4 h-4" />
                <span>Limpar Filtros</span>
              </button>
            </div>
          </div>

          <div className="flex gap-2 w-full lg:w-auto">
            <button
              onClick={() => setShowNovaCargaModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-1 lg:flex-none justify-center"
            >
              <FiPlus className="w-4 h-4" />
              <span>Nova Carga</span>
            </button>

            <button
              onClick={() => handleExportarDados("cargos")}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FiDownload className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>
        </div>

        {/* Filtros Avançados */}
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900 dark:text-white">
              Filtros Avançados
            </h4>
            <FiFilter className="text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Prioridade
              </label>
              <select
                value={filtrosAvancados.prioridade}
                onChange={(e) =>
                  setFiltrosAvancados({
                    ...filtrosAvancados,
                    prioridade: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="todos">Todas</option>
                <option value="alta">Alta</option>
                <option value="media">Média</option>
                <option value="baixa">Baixa</option>
                <option value="urgente">Urgente</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Categoria Seguro
              </label>
              <select
  value={filtrosAvancados.categoriaSeguro}
  onChange={(e) =>
    setFiltrosAvancados({
      ...filtrosAvancados,
      categoriaSeguro: e.target.value,
    })
  }
  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
>
                <option value="todos">Todas</option>
                <option value="Produtos Alimentares">
                  Produtos Alimentares
                </option>
                <option value="Eletrónicos">Eletrónicos</option>
                <option value="Materiais Perigosos">Materiais Perigosos</option>
                <option value="Carga Geral">Carga Geral</option>
                <option value="Carga Consolidada">Carga Consolidada</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Abrangência
              </label>
              <select
  value={filtrosAvancados.abrangenciaSeguro}
  onChange={(e) =>
    setFiltrosAvancados({
      ...filtrosAvancados,
      abrangenciaSeguro: e.target.value,
    })
  }
  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
>
                <option value="todos">Todas</option>
                <option value="Nacional">Nacional</option>
                <option value="Regional SADC">Regional SADC</option>
                <option value="Internacional">Internacional</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tipo Percurso
              </label>
             <select
  value={filtrosAvancados.tipoPercurso}
  onChange={(e) =>
    setFiltrosAvancados({
      ...filtrosAvancados,
      tipoPercurso: e.target.value,
    })
  }
  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
>
                <option value="todos">Todos</option>
                <option value="Beira-Interland">Beira-Interland</option>
                <option value="Local">Local</option>
                <option value="Nacional">Nacional</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Valor Mínimo (MZN)
              </label>
              <input
  type="number"
  placeholder="0"
  value={filtrosAvancados.valorMin}
  onChange={(e) =>
    setFiltrosAvancados({
      ...filtrosAvancados,
      valorMin: e.target.value,
    })
  }
  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
/>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Valor Máximo (MZN)
              </label>
              <input
  type="number"
  placeholder="1000000"
  value={filtrosAvancados.valorMax}
  onChange={(e) =>
    setFiltrosAvancados({
      ...filtrosAvancados,
      valorMax: e.target.value,
    })
  }
  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
/>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Data Início
              </label>
             <input
  type="date"
  value={filtrosAvancados.dataInicio}
  onChange={(e) =>
    setFiltrosAvancados({
      ...filtrosAvancados,
      dataInicio: e.target.value,
    })
  }
  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
/>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Data Fim
              </label>
              <input
  type="date"
  value={filtrosAvancados.dataFim}
  onChange={(e) =>
    setFiltrosAvancados({
      ...filtrosAvancados,
      dataFim: e.target.value,
    })
  }
  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
/>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Cargas */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Minhas Cargas ({filteredCargas.length})
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {estatisticas.emTransito} em trânsito • {estatisticas.atrasadas}{" "}
                atrasadas • {estatisticas.comSeguroAtivo} com seguro ativo
              </p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center space-x-2 px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <FiPrinter className="w-4 h-4" />
                <span>Imprimir</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <FiShare2 className="w-4 h-4" />
                <span>Compartilhar</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Carga
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tipo/Natureza
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rota/Percurso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Motorista/Veículo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Prioridade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Valor/Seguro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {isDataLoading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center">
                    <div className="flex justify-center">
                      <Spinner size="md" />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Carregando cargas...
                    </p>
                  </td>
                </tr>
              ) : filteredCargas.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center">
                    <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Nenhuma carga encontrada
                    </p>
                    <button
                      onClick={() => setShowNovaCargaModal(true)}
                      className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Cadastrar primeira carga
                    </button>
                  </td>
                </tr>
              ) : (
                filteredCargas.map((cargo: Carga) => (
                  <tr
                    key={cargo.codigo}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {cargo.codigo}
                        </div>
                        <div className="text-xs text-gray-500">
                          {cargo.cliente}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center space-x-1">
                          <FiCalendar className="w-3 h-3" />
                          <span>{formatarData(cargo.dataCriacao)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {cargo.tipoCarga}
                      </div>
                      <div className="text-xs text-gray-500">
                        {cargo.naturezaCarga}
                      </div>
                      <div className="text-xs text-gray-500">
                        {cargo.pesoBruto} kg
                        {cargo.volume && ` • ${cargo.volume}m³`}
                      </div>
                      {cargo.categoriaSeguro && (
                        <div className="text-xs text-purple-600">
                          {cargo.categoriaSeguro}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {cargo.origem.cidade} → {cargo.destino.cidade}
                      </div>
                      <div className="text-xs text-gray-500">
                        {cargo.origem.pais} → {cargo.destino.pais}
                      </div>
                      {cargo.tipoPercurso && (
                        <div className="text-xs text-blue-600">
                          {cargo.tipoPercurso} • {cargo.distanciaKm}km
                        </div>
                      )}
                      {cargo.pontoAtual && (
                        <div className="text-xs text-green-500 flex items-center space-x-1">
                          <FiMapPin className="w-3 h-3" />
                          <span>{cargo.pontoAtual.descricao || "Em rota"}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-1">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            cargo.status
                          )}`}
                        >
                          {getStatusText(cargo.status)}
                        </span>
                        {cargo.dataEntregaPrevista && (
                          <div className="text-xs text-gray-500 flex items-center space-x-1">
                            <FiClock className="w-3 h-3" />
                            <span>
                              Prev: {formatarData(cargo.dataEntregaPrevista)}
                            </span>
                          </div>
                        )}
                        {cargo.atrasada && (
                          <div className="text-xs text-red-500 flex items-center space-x-1">
                            <FiAlertTriangle className="w-3 h-3" />
                            <span>Atrasada</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {cargo.motorista ? (
                        <div className="flex flex-col space-y-1">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {cargo.motorista.nome}
                          </div>
                          <div className="text-xs text-gray-500">
                            {cargo.veiculo?.matricula}
                          </div>
                          <div className="text-xs text-gray-500">
                            {cargo.motorista.empresaMotorista}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">
                          Não associado
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPrioridadeColor(
                          cargo.prioridade
                        )}`}
                      >
                        {cargo.prioridade.charAt(0).toUpperCase() +
                          cargo.prioridade.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatarMoeda(cargo.valorTotal)}
                      </div>
                      {cargo.valorMercadoria && (
                        <div className="text-xs text-gray-500">
                          Merc: {formatarMoeda(cargo.valorMercadoria)}
                        </div>
                      )}
                      {cargo.seguro?.premioFinal && (
                        <div className="text-xs text-purple-600 flex items-center space-x-1">
                          <FiShield className="w-3 h-3" />
                          <span>
                            Seguro: {formatarMoeda(cargo.seguro.premioFinal)}
                          </span>
                        </div>
                      )}
                      {cargo.comissaoCalculada && (
                        <div className="text-xs text-green-600">
                          Comissão: {formatarMoeda(cargo.comissaoCalculada)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => visualizarCarga(cargo)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                        >
                          <FiEye className="w-4 h-4 mr-1" />
                          Ver
                        </button>

                        {/* Botão de Rastreamento - Só aparece se tiver transporte */}
                        {cargaTemTransporteAceite(cargo) && (
                          <button
                            onClick={() => abrirRastreamentoModal(cargo)}
                            className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
                          >
                            <FiMapPin className="w-4 h-4 mr-1" />
                            Rastrear
                          </button>
                        )}

                        {/* Botão desabilitado se não tiver transporte */}
                        {!cargaTemTransporteAceite(cargo) &&
                          cargo.status !== "entregue" &&
                          cargo.status !== "encerrada" && (
                            <button
                              onClick={() => abrirRastreamentoModal(cargo)}
                              className="text-gray-400 cursor-not-allowed text-sm font-medium flex items-center"
                              title="Aguardando associação de transporte"
                              disabled
                            >
                              <FiMapPin className="w-4 h-4 mr-1" />
                              Rastrear
                            </button>
                          )}

                        {cargo.ocorrencias && cargo.ocorrencias.length > 0 && (
                          <button
                            onClick={() => visualizarOcorrencias(cargo)}
                            className="text-orange-600 hover:text-orange-800 text-sm font-medium flex items-center"
                          >
                            <FiAlertCircle className="w-4 h-4 mr-1" />
                            {cargo.ocorrencias.length}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <PaginationComponent
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Modal Nova Carga */}
      <NovaCargaModal
        show={showNovaCargaModal}
        onClose={() => setShowNovaCargaModal(false)}
        novaCarga={novaCarga}
        setNovaCarga={setNovaCarga}
        onSubmit={handleCriarCarga}
        isSubmitting={isSubmitting}
      />

      {/* Modal Visualizar Carga */}
      <VisualizarCargaModal
        show={showVisualizarModal}
        onClose={() => setShowVisualizarModal(false)}
        carga={cargaSelecionada}
      />

      {/* Modal Rastreamento */}
      <RastreamentoModal
        show={showRastreamentoModal}
        onClose={() => setShowRastreamentoModal(false)}
        carga={cargaSelecionada}
      />
    </div>
  );
};

export default CargasComponent;
