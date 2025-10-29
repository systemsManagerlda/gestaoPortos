"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";

interface CargaStatus {
  id: number;
  codigo: string;
  descricao: string;
  origem: string;
  destino: string;
  status: "pendente" | "coletada" | "transito" | "entregue" | "atrasada";
  dataCriacao: string;
  previsaoEntrega: string;
  transportador?: string;
  ultimaAtualizacao: string;
  provinciaOrigem: string;
  provinciaDestino: string;
  tipoCarga: string;
  valor: number;
  prioridade: "baixa" | "media" | "alta";
}

export default function EstadoCarga() {
  const router = useRouter();
  const [cargas] = useState<CargaStatus[]>([
    {
      id: 1,
      codigo: "CARGA-MZ-2024001",
      descricao: "Cimento para construção civil - 1500 sacos",
      origem: "Maputo Cidade",
      destino: "Nampula Cidade",
      status: "transito",
      dataCriacao: "2024-02-15",
      previsaoEntrega: "2024-02-20",
      transportador: "Transportes Moçambique SARL",
      ultimaAtualizacao: "2024-02-16 14:30",
      provinciaOrigem: "Maputo",
      provinciaDestino: "Nampula",
      tipoCarga: "Cimento",
      valor: 285000,
      prioridade: "alta",
    },
    {
      id: 2,
      codigo: "CARGA-MZ-2024002",
      descricao: "Bebidas e refrigerantes - Cervejas de Moçambique",
      origem: "Beira",
      destino: "Chimoio",
      status: "coletada",
      dataCriacao: "2024-02-16",
      previsaoEntrega: "2024-02-19",
      transportador: "Logística Norte Ltda",
      ultimaAtualizacao: "2024-02-16 09:15",
      provinciaOrigem: "Sofala",
      provinciaDestino: "Manica",
      tipoCarga: "Bebidas",
      valor: 145000,
      prioridade: "media",
    },
    {
      id: 3,
      codigo: "CARGA-MZ-2024003",
      descricao: "Produtos alimentícios - Supermercados Shoprite",
      origem: "Nampula",
      destino: "Pemba",
      status: "pendente",
      dataCriacao: "2024-02-17",
      previsaoEntrega: "2024-02-22",
      ultimaAtualizacao: "2024-02-17 10:00",
      provinciaOrigem: "Nampula",
      provinciaDestino: "Cabo Delgado",
      tipoCarga: "Produtos Alimentares",
      valor: 220000,
      prioridade: "alta",
    },
    {
      id: 4,
      codigo: "CARGA-MZ-2024004",
      descricao: "Têxteis e vestuário - Joma Têxteis",
      origem: "Tete",
      destino: "Beira",
      status: "entregue",
      dataCriacao: "2024-02-10",
      previsaoEntrega: "2024-02-15",
      transportador: "Expresso Zambézia",
      ultimaAtualizacao: "2024-02-15 16:45",
      provinciaOrigem: "Tete",
      provinciaDestino: "Sofala",
      tipoCarga: "Têxteis",
      valor: 95000,
      prioridade: "baixa",
    },
    {
      id: 5,
      codigo: "CARGA-MZ-2024005",
      descricao: "Produtos do mar congelados - Mariscos de Inhambane",
      origem: "Inhambane",
      destino: "Maputo",
      status: "atrasada",
      dataCriacao: "2024-02-12",
      previsaoEntrega: "2024-02-16",
      transportador: "Transportes do Sul",
      ultimaAtualizacao: "2024-02-17 11:20",
      provinciaOrigem: "Inhambane",
      provinciaDestino: "Maputo",
      tipoCarga: "Produtos do Mar",
      valor: 175000,
      prioridade: "alta",
    },
  ]);

  const [filtro, setFiltro] = useState("todas");

  const cargasFiltradas = cargas.filter((carga) => {
    if (filtro === "todas") return true;
    return carga.status === filtro;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
      case "coletada":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
      case "transito":
        return "bg-orange-500/20 text-orange-400 border border-orange-500/30";
      case "entregue":
        return "bg-green-500/20 text-green-400 border border-green-500/30";
      case "atrasada":
        return "bg-red-500/20 text-red-400 border border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pendente":
        return "Aguardando Coleta";
      case "coletada":
        return "Coletada";
      case "transito":
        return "Em Trânsito";
      case "entregue":
        return "Entregue";
      case "atrasada":
        return "Atrasada";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pendente":
        return "⏳";
      case "coletada":
        return "📦";
      case "transito":
        return "🚚";
      case "entregue":
        return "✅";
      case "atrasada":
        return "⚠️";
      default:
        return "📋";
    }
  };

  const getTipoCargaIcon = (tipo: string) => {
    switch (tipo) {
      case "Cimento":
        return "🏗️";
      case "Bebidas":
        return "🍺";
      case "Produtos Alimentares":
        return "🍎";
      case "Têxteis":
        return "👕";
      case "Produtos do Mar":
        return "🐟";
      case "Minérios":
        return "⛏️";
      case "Combustível":
        return "⛽";
      case "Materiais Construção":
        return "🏠";
      case "Produtos Químicos":
        return "🧪";
      case "Veículos":
        return "🚗";
      default:
        return "📦";
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return "bg-red-500/20 text-red-400 border border-red-500/30";
      case "media":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
      case "baixa":
        return "bg-green-500/20 text-green-400 border border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30";
    }
  };

  const getPrioridadeIcon = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return "🔴";
      case "media":
        return "🟡";
      case "baixa":
        return "🟢";
      default:
        return "⚪";
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-MZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getProgresso = (status: string) => {
    switch (status) {
      case "pendente":
        return 25;
      case "coletada":
        return 50;
      case "transito":
        return 75;
      case "entregue":
        return 100;
      case "atrasada":
        return 75;
      default:
        return 0;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900">
        <header className="bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-white truncate">
                  📊 Estado da Carga
                </h1>
                <p className="text-gray-400 truncate">
                  Acompanhe o status das suas cargas em Moçambique
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Conteúdo Principal */}
            <div className="lg:col-span-3">
              {/* Filtros */}
              <div className="mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setFiltro("todas")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm ${
                        filtro === "todas"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-800 text-gray-300 border border-gray-600 hover:border-gray-500"
                      }`}
                    >
                      Todas
                    </button>
                    <button
                      onClick={() => setFiltro("pendente")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm ${
                        filtro === "pendente"
                          ? "bg-yellow-600 text-white"
                          : "bg-gray-800 text-gray-300 border border-gray-600 hover:border-gray-500"
                      }`}
                    >
                      Pendentes
                    </button>
                    <button
                      onClick={() => setFiltro("transito")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm ${
                        filtro === "transito"
                          ? "bg-orange-600 text-white"
                          : "bg-gray-800 text-gray-300 border border-gray-600 hover:border-gray-500"
                      }`}
                    >
                      Em Trânsito
                    </button>
                    <button
                      onClick={() => setFiltro("entregue")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm ${
                        filtro === "entregue"
                          ? "bg-green-600 text-white"
                          : "bg-gray-800 text-gray-300 border border-gray-600 hover:border-gray-500"
                      }`}
                    >
                      Entregues
                    </button>
                    <button
                      onClick={() => setFiltro("atrasada")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm ${
                        filtro === "atrasada"
                          ? "bg-red-600 text-white"
                          : "bg-gray-800 text-gray-300 border border-gray-600 hover:border-gray-500"
                      }`}
                    >
                      Atrasadas
                    </button>
                  </div>

                  <div className="text-sm text-gray-400 bg-gray-800 px-3 py-2 rounded-lg border border-gray-600">
                    Mostrando{" "}
                    <span className="text-white font-semibold">
                      {cargasFiltradas.length}
                    </span>{" "}
                    de{" "}
                    <span className="text-white font-semibold">
                      {cargas.length}
                    </span>{" "}
                    cargas
                  </div>
                </div>
              </div>

              {/* Lista de Cargas */}
              <div className="space-y-6">
                {cargasFiltradas.map((carga) => (
                  <div
                    key={carga.id}
                    className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:border-gray-600 transition-all"
                  >
                    {/* Header da Carga */}
                    <div className="p-6 border-b border-gray-700">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="text-2xl mt-1">
                            {getTipoCargaIcon(carga.tipoCarga)}
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-lg font-semibold text-white truncate">
                              {carga.codigo}
                            </h3>
                            <p className="text-gray-400 truncate">
                              {carga.descricao}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0 text-right">
                          <div className="flex items-center space-x-2 justify-end mb-2">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getPrioridadeColor(
                                carga.prioridade
                              )}`}
                            >
                              <span className="mr-1">
                                {getPrioridadeIcon(carga.prioridade)}
                              </span>
                              {carga.prioridade.toUpperCase()}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                carga.status
                              )}`}
                            >
                              <span className="mr-1">
                                {getStatusIcon(carga.status)}
                              </span>
                              {getStatusText(carga.status)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            Criada em: {formatDate(carga.dataCriacao)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Detalhes da Carga */}
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-gray-400 mb-1">
                            Rota
                          </p>
                          <p className="text-white font-medium truncate">
                            {carga.origem} → {carga.destino}
                          </p>
                          <p className="text-gray-400 text-xs mt-1">
                            {carga.provinciaOrigem} → {carga.provinciaDestino}
                          </p>
                        </div>
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-gray-400 mb-1">
                            Previsão de Entrega
                          </p>
                          <p
                            className={`font-medium ${
                              carga.status === "atrasada"
                                ? "text-red-400"
                                : "text-white"
                            }`}
                          >
                            {formatDate(carga.previsaoEntrega)}
                          </p>
                          {carga.status === "atrasada" && (
                            <p className="text-red-400 text-xs mt-1">
                              Entrega atrasada
                            </p>
                          )}
                        </div>
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-gray-400 mb-1">
                            Transportador
                          </p>
                          <p className="text-white font-medium truncate">
                            {carga.transportador || "Aguardando atribuição"}
                          </p>
                        </div>
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-gray-400 mb-1">
                            Valor
                          </p>
                          <p className="text-green-400 font-medium">
                            {formatCurrency(carga.valor)}
                          </p>
                        </div>
                      </div>

                      {/* Barra de Progresso */}
                      <div className="mb-6">
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                          <span
                            className={
                              getProgresso(carga.status) >= 25
                                ? "text-blue-400 font-medium"
                                : ""
                            }
                          >
                            Solicitada
                          </span>
                          <span
                            className={
                              getProgresso(carga.status) >= 50
                                ? "text-blue-400 font-medium"
                                : ""
                            }
                          >
                            Coletada
                          </span>
                          <span
                            className={
                              getProgresso(carga.status) >= 75
                                ? "text-blue-400 font-medium"
                                : ""
                            }
                          >
                            Em Trânsito
                          </span>
                          <span
                            className={
                              getProgresso(carga.status) >= 100
                                ? "text-blue-400 font-medium"
                                : ""
                            }
                          >
                            Entregue
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 shadow-inner">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 shadow-lg ${
                              carga.status === "atrasada"
                                ? "bg-red-500"
                                : "bg-blue-500"
                            }`}
                            style={{ width: `${getProgresso(carga.status)}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="flex flex-wrap justify-end gap-3">
                        <button className="border border-blue-500 text-blue-400 hover:text-blue-300 text-sm font-medium bg-blue-500/10 hover:bg-blue-500/20 px-4 py-2 rounded-lg transition-all shadow-sm">
                          <span className="mr-2">👁️</span>
                          Ver Detalhes
                        </button>
                        {carga.transportador && (
                          <button className="border border-green-500 text-green-400 hover:text-green-300 text-sm font-medium bg-green-500/10 hover:bg-green-500/20 px-4 py-2 rounded-lg transition-all shadow-sm">
                            <span className="mr-2">📞</span>
                            Contatar Transportador
                          </button>
                        )}
                        {carga.status === "entregue" && (
                          <button className="border border-purple-500 text-purple-400 hover:text-purple-300 text-sm font-medium bg-purple-500/10 hover:bg-purple-500/20 px-4 py-2 rounded-lg transition-all shadow-sm">
                            <span className="mr-2">📄</span>
                            Emitir Relatório
                          </button>
                        )}
                        {carga.status === "atrasada" && (
                          <button className="border border-red-500 text-red-400 hover:text-red-300 text-sm font-medium bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded-lg transition-all shadow-sm">
                            <span className="mr-2">⚠️</span>
                            Reportar Problema
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mensagem quando não há cargas */}
              {cargasFiltradas.length === 0 && (
                <div className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700">
                  <div className="text-gray-400 text-6xl mb-4">📦</div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Nenhuma carga encontrada
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {filtro === "todas"
                      ? "Você ainda não possui cargas cadastradas."
                      : `Não há cargas com status "${getStatusText(filtro)}".`}
                  </p>
                  {filtro === "todas" && (
                    <button
                      onClick={() => router.push("/client/cargas")}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm"
                    >
                      <span className="mr-2">📦</span>
                      Disponibilizar Primeira Carga
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Painel Lateral */}
            <div className="lg:col-span-1 space-y-6">
              {/* Estatísticas Rápidas */}
              <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-lg font-semibold text-white">
                    📈 Resumo
                  </h2>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span className="text-gray-400">Total Cargas</span>
                    <span className="text-white font-bold">
                      {cargas.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg">
                    <span className="text-yellow-400">Pendentes</span>
                    <span className="text-yellow-400 font-bold">
                      {cargas.filter((c) => c.status === "pendente").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg">
                    <span className="text-blue-400">Coletadas</span>
                    <span className="text-blue-400 font-bold">
                      {cargas.filter((c) => c.status === "coletada").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg">
                    <span className="text-orange-400">Em Trânsito</span>
                    <span className="text-orange-400 font-bold">
                      {cargas.filter((c) => c.status === "transito").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                    <span className="text-green-400">Entregues</span>
                    <span className="text-green-400 font-bold">
                      {cargas.filter((c) => c.status === "entregue").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg">
                    <span className="text-red-400">Atrasadas</span>
                    <span className="text-red-400 font-bold">
                      {cargas.filter((c) => c.status === "atrasada").length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Ações Rápidas */}
              <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-lg font-semibold text-white">
                    ⚡ Ações Rápidas
                  </h2>
                </div>
                <div className="p-4 space-y-3">
                  <button
                    onClick={() => router.push("/client/cargas")}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium transition-all shadow-sm flex items-center justify-center"
                  >
                    <span className="mr-2">📦</span>
                    <span className="truncate">Nova Carga</span>
                  </button>
                  <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium transition-all shadow-sm flex items-center justify-center">
                    <span className="mr-2">📊</span>
                    <span className="truncate">Relatórios</span>
                  </button>
                  <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 font-medium transition-all shadow-sm flex items-center justify-center">
                    <span className="mr-2">💰</span>
                    <span className="truncate">Pagamentos</span>
                  </button>
                  <button className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 font-medium transition-all shadow-sm flex items-center justify-center">
                    <span className="mr-2">📞</span>
                    <span className="truncate">Suporte</span>
                  </button>
                </div>
              </div>

              {/* Informações do Sistema */}
              <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">
                  💡 Informações - MZ
                </h3>
                <ul className="text-blue-300 text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Acompanhe o status em tempo real</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Contate o transportador se necessário</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Relatórios disponíveis após entrega</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Contacte: +258 84 500 800</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
