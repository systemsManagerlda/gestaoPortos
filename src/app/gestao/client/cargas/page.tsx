"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";

interface CargaForm {
  tipo: string;
  descricao: string;
  peso: string;
  volume: string;
  origem: string;
  destino: string;
  valor: string;
  observacoes: string;
  provinciaOrigem: string;
  provinciaDestino: string;
  prioridade: "baixa" | "media" | "alta";
  dataLimite: string;
  tipoEmbalagem: string;
  seguro: string;
}

export default function DisponibilizarCarga() {
  const router = useRouter();
  const [formData, setFormData] = useState<CargaForm>({
    tipo: "",
    descricao: "",
    peso: "",
    volume: "",
    origem: "",
    destino: "",
    valor: "",
    observacoes: "",
    provinciaOrigem: "",
    provinciaDestino: "",
    prioridade: "media",
    dataLimite: "",
    tipoEmbalagem: "",
    seguro: "nao",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const provinciasMocambicanas = [
    "Maputo",
    "Maputo Cidade",
    "Gaza",
    "Inhambane",
    "Sofala",
    "Manica",
    "Tete",
    "Zambézia",
    "Nampula",
    "Cabo Delgado",
    "Niassa",
  ];

  const tiposCarga = [
    "Cimento",
    "Bebidas",
    "Produtos Alimentares",
    "Têxteis",
    "Produtos do Mar",
    "Minérios",
    "Combustível",
    "Materiais Construção",
    "Produtos Químicos",
    "Veículos",
    "Eletrónicos",
    "Móveis",
    "Outros",
  ];

  const tiposEmbalagem = [
    "Saca",
    "Caixa",
    "Palete",
    "Container",
    "Granel",
    "Big Bag",
    "Tambor",
    "Fardo",
    "A Granel",
    "Unitizada",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulação de envio
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Dados da carga:", formData);
    alert("Carga disponibilizada com sucesso!");
    setIsSubmitting(false);
    // router.push('/client/status'); // Redirecionar para acompanhamento
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      case "Eletrónicos":
        return "💻";
      case "Móveis":
        return "🪑";
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

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900">
        <header className="bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-white truncate">
                  📦 Disponibilizar Carga
                </h1>
                <p className="text-gray-400 truncate">
                  Cadastre novas cargas para transporte em Moçambique
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Formulário Principal */}
            <div className="lg:col-span-3">
              <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                <div className="p-6 border-b border-gray-700">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <span className="mr-2">📝</span>
                    Nova Carga - Moçambique
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    Preencha os dados da carga para disponibilizar aos
                    transportadores cadastrados
                  </p>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Informações Básicas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Tipo de Carga *
                        </label>
                        <select
                          name="tipo"
                          value={formData.tipo}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        >
                          <option value="">Selecione o tipo de carga...</option>
                          {tiposCarga.map((tipo) => (
                            <option key={tipo} value={tipo}>
                              {tipo}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Peso (kg) *
                        </label>
                        <input
                          type="number"
                          name="peso"
                          value={formData.peso}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                          placeholder="Ex: 15000"
                          min="0"
                        />
                      </div>
                    </div>

                    {/* Localização */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Província de Origem *
                        </label>
                        <select
                          name="provinciaOrigem"
                          value={formData.provinciaOrigem}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        >
                          <option value="">Selecione a província...</option>
                          {provinciasMocambicanas.map((provincia) => (
                            <option key={provincia} value={provincia}>
                              {provincia}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Local de Origem *
                        </label>
                        <input
                          type="text"
                          name="origem"
                          value={formData.origem}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                          placeholder="Ex: Maputo Cidade"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Província de Destino *
                        </label>
                        <select
                          name="provinciaDestino"
                          value={formData.provinciaDestino}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        >
                          <option value="">Selecione a província...</option>
                          {provinciasMocambicanas.map((provincia) => (
                            <option key={provincia} value={provincia}>
                              {provincia}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Local de Destino *
                        </label>
                        <input
                          type="text"
                          name="destino"
                          value={formData.destino}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                          placeholder="Ex: Nampula Cidade"
                        />
                      </div>
                    </div>

                    {/* Especificações Técnicas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Volume (m³)
                        </label>
                        <input
                          type="number"
                          name="volume"
                          value={formData.volume}
                          onChange={handleChange}
                          className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                          placeholder="Ex: 45.5"
                          min="0"
                          step="0.1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Valor Estimado (MZN)
                        </label>
                        <input
                          type="number"
                          name="valor"
                          value={formData.valor}
                          onChange={handleChange}
                          className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                          placeholder="Ex: 285000"
                          min="0"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Tipo de Embalagem
                        </label>
                        <select
                          name="tipoEmbalagem"
                          value={formData.tipoEmbalagem}
                          onChange={handleChange}
                          className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        >
                          <option value="">Selecione...</option>
                          {tiposEmbalagem.map((tipo) => (
                            <option key={tipo} value={tipo}>
                              {tipo}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Configurações Adicionais */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Prioridade *
                        </label>
                        <select
                          name="prioridade"
                          value={formData.prioridade}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        >
                          <option value="baixa">Baixa</option>
                          <option value="media">Média</option>
                          <option value="alta">Alta</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Data Limite de Entrega *
                        </label>
                        <input
                          type="date"
                          name="dataLimite"
                          value={formData.dataLimite}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Seguro de Carga
                        </label>
                        <select
                          name="seguro"
                          value={formData.seguro}
                          onChange={handleChange}
                          className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        >
                          <option value="nao">Não</option>
                          <option value="sim">Sim</option>
                        </select>
                      </div>
                    </div>

                    {/* Descrições */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Descrição da Carga *
                      </label>
                      <textarea
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        placeholder="Descreva detalhadamente os itens da carga, características especiais, etc..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Observações Adicionais
                      </label>
                      <textarea
                        name="observacoes"
                        value={formData.observacoes}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        placeholder="Informações adicionais, requisitos especiais, instruções de manuseio..."
                      />
                    </div>

                    {/* Botões */}
                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
                      <button
                        type="button"
                        onClick={() => router.push("/dashboard")}
                        className="px-6 py-3 text-gray-300 hover:text-white border border-gray-600 rounded-lg hover:bg-gray-700 font-medium transition-all"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all shadow-sm flex items-center"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                            Disponibilizando...
                          </>
                        ) : (
                          <>
                            <span className="mr-2">📦</span>
                            Disponibilizar Carga
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Painel Lateral */}
            <div className="lg:col-span-1 space-y-6">
              {/* Informações do Sistema */}
              <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">
                  💡 Informações - MZ
                </h3>
                <ul className="text-blue-300 text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Carga disponível para transportadores em 24h</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Receba propostas em até 48h úteis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Acompanhe o status na página Minhas Cargas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Contacte: +258 84 500 700</span>
                  </li>
                </ul>
              </div>

              {/* Resumo da Carga */}
              <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-lg font-semibold text-white">
                    📋 Resumo da Carga
                  </h2>
                </div>
                <div className="p-4 space-y-3">
                  {formData.tipo && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Tipo:</span>
                      <span className="text-white text-sm flex items-center">
                        <span className="mr-2">
                          {getTipoCargaIcon(formData.tipo)}
                        </span>
                        {formData.tipo}
                      </span>
                    </div>
                  )}
                  {formData.peso && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Peso:</span>
                      <span className="text-white text-sm">
                        {formData.peso} kg
                      </span>
                    </div>
                  )}
                  {formData.volume && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Volume:</span>
                      <span className="text-white text-sm">
                        {formData.volume} m³
                      </span>
                    </div>
                  )}
                  {formData.origem && formData.destino && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Rota:</span>
                      <span className="text-white text-sm">
                        {formData.origem} → {formData.destino}
                      </span>
                    </div>
                  )}
                  {formData.prioridade && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Prioridade:</span>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${getPrioridadeColor(
                          formData.prioridade
                        )}`}
                      >
                        <span className="mr-1">
                          {getPrioridadeIcon(formData.prioridade)}
                        </span>
                        {formData.prioridade.toUpperCase()}
                      </span>
                    </div>
                  )}
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
                    <span className="mr-2">📋</span>
                    <span className="truncate">Minhas Cargas</span>
                  </button>
                  <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium transition-all shadow-sm flex items-center justify-center">
                    <span className="mr-2">📊</span>
                    <span className="truncate">Histórico</span>
                  </button>
                  <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 font-medium transition-all shadow-sm flex items-center justify-center">
                    <span className="mr-2">💰</span>
                    <span className="truncate">Propostas</span>
                  </button>
                  <button className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 font-medium transition-all shadow-sm flex items-center justify-center">
                    <span className="mr-2">📞</span>
                    <span className="truncate">Suporte</span>
                  </button>
                </div>
              </div>

              {/* Dicas Importantes */}
              <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-lg font-semibold text-white">
                    💎 Dicas Importantes
                  </h2>
                </div>
                <div className="p-4">
                  <ul className="text-gray-300 text-sm space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      <span>Preencha todos os campos obrigatórios (*)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">•</span>
                      <span>Descreva detalhadamente a carga</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>Defina prioridade realista</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>Informe data limite realista</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
