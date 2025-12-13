import React, { useState } from "react";
import { formatCurrency, getValidCurrencyCode } from "../context/currencyUtils";
import  ModalEditarLancamento  from "../context/ModalEditarLancamento";
import ModalDetalhesLancamento from "../context/ModalDetalhesLancamento";
import ModalConciliarLancamento from "../context/ModalConciliarLancamento";

const LancamentoItem = ({ lancamento, onEdit, onConciliar, onDelete }) => {
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false);
  const [modalConciliarAberto, setModalConciliarAberto] = useState(false);

  // Função para lidar com a edição
  const handleEdit = async (dadosAtualizados) => {
    try {
      // Chamar API para atualizar o lançamento
      const response = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/updateLancamento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosAtualizados),
      });

      const result = await response.json();

      if (result.returnCode === 200) {
        // Atualizar a lista de lançamentos
        onEdit(result.data);
      } else {
        throw new Error(result.returnMsg);
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      throw error;
    }
  };

   // Função para lidar com a conciliação
  const handleConciliar = async (dadosConciliacao) => {
    try {
      // Chamar API para conciliar o lançamento
      const response = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/conciliarLancamento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosConciliacao),
      });

      const result = await response.json();

      if (result.returnCode === 200) {
        // Atualizar a lista de lançamentos
        onConciliar(result.data);
      } else {
        throw new Error(result.returnMsg);
      }
    } catch (error) {
      console.error("Erro ao conciliar:", error);
      throw error;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "conciliado":
        return "bg-green-100 text-green-800";
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      case "conferido":
        return "bg-blue-100 text-blue-800";
      case "cancelado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getNaturezaColor = (natureza) => {
    return natureza === "debito" ? "bg-green-500" : "bg-red-500";
  };

  const valor = lancamento.valor || 0;
  const moeda = getValidCurrencyCode(lancamento.moeda);
  const valorFormatado = formatCurrency(
    lancamento.valor,
    getValidCurrencyCode(lancamento.moeda)
  );

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
        <div 
          className="flex items-center space-x-4 flex-1 cursor-pointer" 
          onClick={() => setModalDetalhesAberto(true)}
        >
          <div
            className={`w-2 h-12 ${getNaturezaColor(
              lancamento.natureza
            )} rounded-full`}
          ></div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <p className="font-medium text-gray-900">
                {lancamento.numeroLancamento}
              </p>
              <span
                className={`px-2 py-1 ${getStatusColor(
                  lancamento.status
                )} rounded-full text-xs`}
              >
                {lancamento.status}
              </span>
              {lancamento.statusConciliacao && lancamento.statusConciliacao !== "nao_conciliado" && (
                <span className={`px-2 py-1 ${
                  lancamento.statusConciliacao === "totalmente" 
                    ? "bg-green-100 text-green-800" 
                    : lancamento.statusConciliacao === "parcial"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                } rounded-full text-xs`}>
                  {lancamento.statusConciliacao === "totalmente" ? "Conciliado" : 
                   lancamento.statusConciliacao === "parcial" ? "Parcial" : 
                   "Discrepante"}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">{lancamento.descricao}</p>
            <p className="text-xs text-gray-500">
              {lancamento.dataLancamento
                ? new Date(lancamento.dataLancamento).toLocaleDateString("pt-MZ")
                : "Sem data"}{" "}
              • Débito: {lancamento.contaDebito?.codigo} • Crédito:{" "}
              {lancamento.contaCredito?.codigo}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">Valor</p>
            <p className="font-bold text-gray-900">{valorFormatado}</p>
            <p className="text-xs text-gray-500">
              {lancamento.natureza === "debito" ? "Débito" : "Crédito"}
            </p>
          </div>
          <div className="flex space-x-2">
            {/* Botão de Visualizar */}
            <button
              onClick={() => setModalDetalhesAberto(true)}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors duration-200"
              title="Visualizar detalhes"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>

            {/* Botão de Editar */}
            <button
              onClick={() => setModalEditarAberto(true)}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors duration-200"
            >
              Editar
            </button>

            {/* Botão de Conciliar */}
            {lancamento.status !== "conciliado" && lancamento.status !== "cancelado" && (
              <button
                onClick={() => setModalConciliarAberto(true)}
                className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
                  lancamento.statusConciliacao === "parcial" 
                    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                    : lancamento.statusConciliacao === "discrepante"
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {lancamento.statusConciliacao === "parcial" 
                  ? "Completar Conciliação"
                  : lancamento.statusConciliacao === "discrepante"
                  ? "Corrigir Discrepância"
                  : "Conciliar"
                }
              </button>
            )}

            {/* Botão de Excluir */}
            {lancamento.status === "pendente" && (
              <button
                onClick={() => onDelete(lancamento.lancamentoId)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors duration-200"
              >
                Excluir
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Edição */}
      <ModalEditarLancamento
        isOpen={modalEditarAberto}
        onClose={() => setModalEditarAberto(false)}
        lancamento={lancamento}
        onSave={handleEdit}
      />

      {/* Modal de Detalhes */}
      <ModalDetalhesLancamento
        isOpen={modalDetalhesAberto}
        onClose={() => setModalDetalhesAberto(false)}
        lancamento={lancamento}
      />

      {/* Modal de Conciliação */}
      <ModalConciliarLancamento
        isOpen={modalConciliarAberto}
        onClose={() => setModalConciliarAberto(false)}
        lancamento={lancamento}
        onConciliar={handleConciliar}
      />
    </>
  );
};

export default LancamentoItem;
