"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";

interface Proposta {
  id: number;
  transportador: string;
  valor: number;
  prazo: string;
  veiculo: string;
  rating: number;
  proposta: string;
  tempoResposta: string;
  experiencia: string;
  seguros: string[];
}

interface Carga {
  id: number;
  codigo: string;
  descricao: string;
  origem: string;
  destino: string;
  peso: number;
  volume: number;
  provinciaOrigem: string;
  provinciaDestino: string;
  tipoCarga: string;
  prioridade: string;
  dataLimite: string;
}

export default function ConfirmacaoDestino() {
  const router = useRouter();
  const [carga] = useState<Carga>({
    id: 1,
    codigo: "CARGA-MZ-2024001",
    descricao: "Cimento para construção civil - 1500 sacos",
    origem: "Maputo Cidade",
    destino: "Nampula Cidade",
    peso: 15000,
    volume: 45,
    provinciaOrigem: "Maputo",
    provinciaDestino: "Nampula",
    tipoCarga: "Cimento",
    prioridade: "alta",
    dataLimite: "2024-02-20",
  });

  const [propostas] = useState<Proposta[]>([
    {
      id: 1,
      transportador: "Transportes Moçambique SARL",
      valor: 285000,
      prazo: "3 dias",
      veiculo: "Caminhão Pesado - 30T",
      rating: 4.8,
      proposta:
        "Melhor custo-benefício para transporte de cimento com cobertura total de seguro",
      tempoResposta: "2 horas",
      experiencia: "15 anos",
      seguros: ["Roubo", "Acidentes", "Danos", "Intempéries"],
    },
    {
      id: 2,
      transportador: "Logística Norte Ltda",
      valor: 320000,
      prazo: "2 dias",
      veiculo: "Caminhão Truck - 25T",
      rating: 4.9,
      proposta:
        "Entrega expressa com monitoramento GPS 24/7 e equipe especializada",
      tempoResposta: "1 hora",
      experiencia: "12 anos",
      seguros: ["Roubo", "Acidentes", "Danos", "Responsabilidade Civil"],
    },
    {
      id: 3,
      transportador: "Expresso Zambézia",
      valor: 265000,
      prazo: "4 dias",
      veiculo: "Carreta - 35T",
      rating: 4.6,
      proposta:
        "Preço competitivo com qualidade garantida e rastreamento em tempo real",
      tempoResposta: "3 horas",
      experiencia: "8 anos",
      seguros: ["Roubo", "Acidentes", "Danos"],
    },
    {
      id: 4,
      transportador: "Transportes do Sul",
      valor: 300000,
      prazo: "3 dias",
      veiculo: "Caminhão Baú - 28T",
      rating: 4.7,
      proposta: "Serviço premium com documentação completa e suporte dedicado",
      tempoResposta: "45 minutos",
      experiencia: "10 anos",
      seguros: [
        "Roubo",
        "Acidentes",
        "Danos",
        "Intempéries",
        "Responsabilidade Civil",
      ],
    },
  ]);

  const [propostaSelecionada, setPropostaSelecionada] = useState<number | null>(
    null
  );
  const [isConfirmando, setIsConfirmando] = useState(false);
  const [filtroOrdenacao, setFiltroOrdenacao] = useState<
    "preco" | "prazo" | "rating"
  >("preco");

  const propostasOrdenadas = [...propostas].sort((a, b) => {
    switch (filtroOrdenacao) {
      case "preco":
        return a.valor - b.valor;
      case "prazo":
        return parseInt(a.prazo) - parseInt(b.prazo);
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleConfirmar = async () => {
    if (!propostaSelecionada) return;

    setIsConfirmando(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert(
      "Proposta confirmada com sucesso! A carga foi atribuída ao transportador."
    );
    setIsConfirmando(false);
    router.push("/client/status");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5)
      return "text-green-400 bg-green-500/20 border-green-500/30";
    if (rating >= 4.0)
      return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
    return "text-red-400 bg-red-500/20 border-red-500/30";
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

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900">
        <header className="bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-white truncate">
                  💰 Confirmação de Destino e Valor
                </h1>
                <p className="text-gray-400 truncate">
                  Confirme destino e valor do transporte em Moçambique
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Conteúdo Principal */}
            <div className="lg:col-span-3">
              {/* Informações da Carga */}
              <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 mb-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="mr-2">📦</span>
                  Detalhes da Carga - Moçambique
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-400">Código</p>
                    <p className="text-white font-medium">{carga.codigo}</p>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-400">Tipo</p>
                    <p className="text-white font-medium flex items-center">
                      <span className="mr-2">
                        {getTipoCargaIcon(carga.tipoCarga)}
                      </span>
                      {carga.tipoCarga}
                    </p>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-400">Rota</p>
                    <p className="text-white font-medium">
                      {carga.origem} → {carga.destino}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {carga.provinciaOrigem} → {carga.provinciaDestino}
                    </p>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-400">
                      Prioridade
                    </p>
                    <p
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadeColor(
                        carga.prioridade
                      )}`}
                    >
                      {carga.prioridade.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-400">
                      Peso/Volume
                    </p>
                    <p className="text-white font-medium">
                      {carga.peso}kg / {carga.volume}m³
                    </p>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-400">
                      Data Limite
                    </p>
                    <p className="text-white font-medium">{carga.dataLimite}</p>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-400">
                      Descrição
                    </p>
                    <p className="text-white font-medium text-sm truncate">
                      {carga.descricao}
                    </p>
                  </div>
                </div>
              </div>

              {/* Propostas Recebidas */}
              <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                <div className="p-6 border-b border-gray-700">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-white flex items-center">
                        <span className="mr-2">💰</span>
                        Propostas Recebidas ({propostas.length})
                      </h2>
                      <p className="text-gray-400 text-sm mt-1">
                        Selecione a melhor proposta para sua carga
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <select
                        value={filtroOrdenacao}
                        onChange={(e) =>
                          setFiltroOrdenacao(e.target.value as never)
                        }
                        className="bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                      >
                        <option value="preco">Ordenar por: Menor Preço</option>
                        <option value="prazo">Ordenar por: Menor Prazo</option>
                        <option value="rating">
                          Ordenar por: Melhor Avaliação
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    {propostasOrdenadas.map((proposta) => (
                      <div
                        key={proposta.id}
                        className={`border rounded-xl p-6 cursor-pointer transition-all shadow-sm ${
                          propostaSelecionada === proposta.id
                            ? "border-blue-500 bg-blue-500/10 shadow-lg"
                            : "border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:bg-gray-700/70"
                        }`}
                        onClick={() => setPropostaSelecionada(proposta.id)}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <h3 className="font-semibold text-white text-lg">
                                  {proposta.transportador}
                                </h3>
                                <div
                                  className={`flex items-center px-3 py-1 rounded-full text-sm border ${getRatingColor(
                                    proposta.rating
                                  )}`}
                                >
                                  ⭐ {proposta.rating}
                                </div>
                              </div>
                              <div className="mt-2 sm:mt-0 text-sm text-gray-400">
                                Resposta em: {proposta.tempoResposta} •
                                Experiência: {proposta.experiencia}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="bg-gray-600/30 p-4 rounded-lg">
                                <span className="font-medium text-gray-400 text-sm">
                                  Valor Proposto:
                                </span>
                                <p className="text-green-400 font-semibold text-xl">
                                  {formatCurrency(proposta.valor)}
                                </p>
                              </div>
                              <div className="bg-gray-600/30 p-4 rounded-lg">
                                <span className="font-medium text-gray-400 text-sm">
                                  Prazo de Entrega:
                                </span>
                                <p className="text-white font-medium text-lg">
                                  {proposta.prazo}
                                </p>
                              </div>
                              <div className="bg-gray-600/30 p-4 rounded-lg">
                                <span className="font-medium text-gray-400 text-sm">
                                  Veículo:
                                </span>
                                <p className="text-white font-medium">
                                  {proposta.veiculo}
                                </p>
                              </div>
                            </div>

                            <div className="mb-4">
                              <p className="text-gray-300 text-sm bg-gray-600/20 p-4 rounded-lg">
                                {proposta.proposta}
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {proposta.seguros.map((seguro, index) => (
                                <span
                                  key={index}
                                  className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs"
                                >
                                  🛡️ {seguro}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mt-4 lg:mt-0 lg:ml-6 flex items-center justify-center">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                propostaSelecionada === proposta.id
                                  ? "border-blue-400 bg-blue-400 shadow-lg"
                                  : "border-gray-400"
                              }`}
                            >
                              {propostaSelecionada === proposta.id && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Botão de Confirmação */}
                  <div className="mt-8 pt-6 border-t border-gray-700">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                      <div>
                        {propostaSelecionada && (
                          <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                            <p className="text-green-400 text-sm font-medium">
                              Proposta Selecionada
                            </p>
                            <p className="text-green-400 font-bold text-xl">
                              {formatCurrency(
                                propostas.find(
                                  (p) => p.id === propostaSelecionada
                                )?.valor || 0
                              )}
                            </p>
                            <p className="text-green-400 text-sm">
                              {
                                propostas.find(
                                  (p) => p.id === propostaSelecionada
                                )?.transportador
                              }
                            </p>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={handleConfirmar}
                        disabled={!propostaSelecionada || isConfirmando}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all shadow-sm flex items-center justify-center min-w-[200px]"
                      >
                        {isConfirmando ? (
                          <>
                            <div className="w-4 h-4 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                            Confirmando...
                          </>
                        ) : (
                          <>
                            <span className="mr-2">✅</span>
                            Confirmar Proposta
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informações Adicionais */}
              <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
                <h3 className="font-semibold text-yellow-400 mb-3 flex items-center">
                  <span className="mr-2">⚠️</span>
                  Antes de Confirmar
                </h3>
                <ul className="text-yellow-300 text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>
                      Verifique se todos os dados da carga estão corretos
                      conforme legislação moçambicana
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>
                      Confirme o valor, prazo de entrega e cobertura de seguros
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>
                      Após a confirmação, a carga será atribuída ao
                      transportador selecionado
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>
                      Você poderá acompanhar o status na página Estado da Carga
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>
                      Em caso de dúvidas, contacte o suporte: +258 84 500 700
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Painel Lateral */}
            <div className="lg:col-span-1 space-y-6">
              {/* Resumo da Seleção */}
              <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-lg font-semibold text-white">
                    📋 Resumo
                  </h2>
                </div>
                <div className="p-4 space-y-4">
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Carga</p>
                    <p className="text-white font-medium">{carga.codigo}</p>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Rota</p>
                    <p className="text-white font-medium">
                      {carga.origem} → {carga.destino}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {carga.provinciaOrigem} → {carga.provinciaDestino}
                    </p>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Propostas</p>
                    <p className="text-white font-medium">
                      {propostas.length} recebidas
                    </p>
                  </div>
                  {propostaSelecionada && (
                    <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                      <p className="text-green-400 text-sm">
                        Transportador Selecionado
                      </p>
                      <p className="text-green-400 font-bold text-sm">
                        {
                          propostas.find((p) => p.id === propostaSelecionada)
                            ?.transportador
                        }
                      </p>
                      <p className="text-green-400 font-semibold mt-1">
                        {formatCurrency(
                          propostas.find((p) => p.id === propostaSelecionada)
                            ?.valor || 0
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Dicas de Seleção */}
              <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-lg font-semibold text-white">
                    💡 Dicas de Seleção
                  </h2>
                </div>
                <div className="p-4">
                  <ul className="text-gray-300 text-sm space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>Compare preço, prazo e avaliação</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      <span>Verifique a experiência do transportador</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>Considere a cobertura de seguros oferecida</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">•</span>
                      <span>Analise o tempo de resposta da proposta</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <span>Confirme se atende sua data limite</span>
                    </li>
                  </ul>
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
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium transition-all shadow-sm flex items-center justify-center">
                    <span className="mr-2">📞</span>
                    <span className="truncate">Suporte</span>
                  </button>
                  <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium transition-all shadow-sm flex items-center justify-center">
                    <span className="mr-2">📊</span>
                    <span className="truncate">Comparar Propostas</span>
                  </button>
                  <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 font-medium transition-all shadow-sm flex items-center justify-center">
                    <span className="mr-2">💬</span>
                    <span className="truncate">Negociar</span>
                  </button>
                  <button className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 font-medium transition-all shadow-sm flex items-center justify-center">
                    <span className="mr-2">📋</span>
                    <span className="truncate">Histórico</span>
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
                    <span>Propostas válidas por 24h</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Pagamento após confirmação</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Suporte: +258 84 500 700</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Email: propostas@transmz.co.mz</span>
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
