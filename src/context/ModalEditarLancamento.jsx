import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";

const ModalEditarLancamento = ({ isOpen, onClose, lancamento, onSave }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [abaAtiva, setAbaAtiva] = useState("dados-basicos");

  // Referência para dados originais
  const dadosOriginaisRef = useRef({});

  const validateMoeda = (moeda) => {
    const moedasValidas = ["MZN", "USD", "EUR", "ZAR", "GBP", "CNY"];
    return moedasValidas.includes(moeda);
  };

  // Opções para selects
  const tiposLancamento = [
    { value: "receita_operacional", label: "Receita Operacional" },
    { value: "receita_nao_operacional", label: "Receita Não Operacional" },
    { value: "despesa_operacional", label: "Despesa Operacional" },
    { value: "despesa_nao_operacional", label: "Despesa Não Operacional" },
    { value: "despesa_financeira", label: "Despesa Financeira" },
    { value: "ativo_circulante", label: "Ativo Circulante" },
    { value: "ativo_nao_circulante", label: "Ativo Não Circulante" },
    { value: "passivo_circulante", label: "Passivo Circulante" },
    { value: "passivo_nao_circulante", label: "Passivo Não Operacional" },
    { value: "patrimonio_liquido", label: "Patrimônio Líquido" },
    { value: "ajuste", label: "Ajuste" },
    { value: "transferencia", label: "Transferência" },
    { value: "depreciacao", label: "Depreciação" },
    { value: "amortizacao", label: "Amortização" },
    { value: "provisao", label: "Provisão" },
    { value: "imposto", label: "Imposto" },
    { value: "outro", label: "Outro" },
  ];

  const categoriasContabeis = [
    { value: "vendas", label: "Vendas" },
    { value: "servicos", label: "Serviços" },
    { value: "custos", label: "Custos" },
    { value: "despesas_adm", label: "Despesas Administrativas" },
    { value: "despesas_vendas", label: "Despesas de Vendas" },
    { value: "despesas_financeiras", label: "Despesas Financeiras" },
    { value: "investimentos", label: "Investimentos" },
    { value: "imobilizado", label: "Imobilizado" },
    { value: "estoques", label: "Estoques" },
    { value: "clientes", label: "Clientes" },
    { value: "fornecedores", label: "Fornecedores" },
    { value: "emprestimos", label: "Empréstimos" },
    { value: "capital", label: "Capital" },
    { value: "reservas", label: "Reservas" },
    { value: "lucros", label: "Lucros" },
    { value: "fiscal", label: "Fiscal" },
    { value: "pessoal", label: "Pessoal" },
    { value: "operacional", label: "Operacional" },
    { value: "outro", label: "Outro" },
  ];

  const statusOptions = [
    { value: "rascunho", label: "Rascunho" },
    { value: "pendente", label: "Pendente" },
    { value: "conferido", label: "Conferido" },
    { value: "aprovado", label: "Aprovado" },
    { value: "conciliado", label: "Conciliado" },
    { value: "contabilizado", label: "Contabilizado" },
    { value: "revisado", label: "Revisado" },
    { value: "auditado", label: "Auditado" },
    { value: "encerrado", label: "Encerrado" },
    { value: "cancelado", label: "Cancelado" },
    { value: "estornado", label: "Estornado" },
  ];

  const statusConciliacaoOptions = [
    { value: "nao_conciliado", label: "Não Conciliado" },
    { value: "parcial", label: "Parcial" },
    { value: "totalmente", label: "Totalmente" },
    { value: "discrepante", label: "Discrepante" },
    { value: "ajustado", label: "Ajustado" },
  ];

  // Função para remover campos vazios/undefined de um objeto
  const cleanObject = (obj) => {
    if (!obj || typeof obj !== "object") return obj;

    const cleaned = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      if (value !== undefined && value !== null) {
        if (typeof value === "object" && !Array.isArray(value)) {
          const cleanedNested = cleanObject(value);
          if (Object.keys(cleanedNested).length > 0) {
            cleaned[key] = cleanedNested;
          }
        } else if (Array.isArray(value)) {
          // Manter arrays apenas se não estiverem vazios
          if (value.length > 0) {
            cleaned[key] = value;
          }
        } else {
          cleaned[key] = value;
        }
      }
    });

    return cleaned;
  };

  // Função para pegar apenas campos modificados
  const getCamposModificados = () => {
    const dadosAtuais = formData;
    const dadosOriginais = dadosOriginaisRef.current;

    if (!dadosAtuais || !dadosOriginais) return {};

    const modificados = {};

    // Comparar apenas os campos essenciais
    const camposParaComparar = [
      "descricao",
      "historicoContabil",
      "valor",
      "moeda",
      "natureza",
      "tipoLancamento",
      "categoriaContabil",
      "status",
      "statusConciliacao",
      "dataLancamento",
      "dataCompetencia",
      "dataVencimento",
      "contaDebito",
      "contaCredito",
      "observacoes",
    ];

    camposParaComparar.forEach((key) => {
      const valorAtual = dadosAtuais[key];
      const valorOriginal = dadosOriginais[key];

      // Converter para string para comparação
      const strAtual = JSON.stringify(valorAtual);
      const strOriginal = JSON.stringify(valorOriginal);

      if (strAtual !== strOriginal) {
        modificados[key] = valorAtual;
      }
    });

    return modificados;
  };

  // Inicializar formulário quando o lançamento mudar
  useEffect(() => {
    if (lancamento) {
      // Salvar dados originais
      dadosOriginaisRef.current = {
        descricao: lancamento.descricao,
        historicoContabil: lancamento.historicoContabil,
        valor: lancamento.valor,
        moeda: lancamento.moeda,
        natureza: lancamento.natureza,
        tipoLancamento: lancamento.tipoLancamento,
        categoriaContabil: lancamento.categoriaContabil,
        status: lancamento.status,
        statusConciliacao: lancamento.statusConciliacao,
        dataLancamento: lancamento.dataLancamento,
        dataCompetencia: lancamento.dataCompetencia,
        dataVencimento: lancamento.dataVencimento,
        contaDebito: lancamento.contaDebito,
        contaCredito: lancamento.contaCredito,
        observacoes: lancamento.observacoes,
      };

      // Converter datas para formato de input
      const dataLancamento = lancamento.dataLancamento
        ? format(new Date(lancamento.dataLancamento), "yyyy-MM-dd")
        : "";

      const dataCompetencia = lancamento.dataCompetencia
        ? format(new Date(lancamento.dataCompetencia), "yyyy-MM-dd")
        : "";

      const dataVencimento = lancamento.dataVencimento
        ? format(new Date(lancamento.dataVencimento), "yyyy-MM-dd")
        : "";

      // Inicializar apenas campos essenciais para evitar payload grande
      setFormData({
        numeroLancamento: lancamento.numeroLancamento || "",
        tipoLancamento: lancamento.tipoLancamento || "",
        categoriaContabil: lancamento.categoriaContabil || "",
        natureza: lancamento.natureza || "",
        descricao: lancamento.descricao || "",
        historicoContabil: lancamento.historicoContabil || "",
        valor: lancamento.valor || 0,
        moeda: lancamento.moeda || "MZN",
        taxaCambio: lancamento.taxaCambio || 1,
        contaDebito: lancamento.contaDebito || {
          codigo: "",
          descricao: "",
          tipo: "",
        },
        contaCredito: lancamento.contaCredito || {
          codigo: "",
          descricao: "",
          tipo: "",
        },
        dataLancamento,
        dataCompetencia,
        dataVencimento,
        status: lancamento.status || "rascunho",
        statusConciliacao: lancamento.statusConciliacao || "nao_conciliado",
        workflow: lancamento.workflow || { etapaAtual: "criacao" },
        exercicio: lancamento.exercicio || {
          ano: new Date().getFullYear(),
          mes: new Date().getMonth() + 1,
        },
        // Campos opcionais (só se existirem)
        ...(lancamento.observacoes && { observacoes: lancamento.observacoes }),
        ...(lancamento.tributacao && {
          tributacao: {
            iva: lancamento.tributacao.iva || {
              tipo: "incluso",
              regime: "geral",
              percentual: 16,
            },
          },
        }),
        // Arrays apenas se não estiverem vazios
        ...(lancamento.rateio &&
          lancamento.rateio.length > 0 && { rateio: lancamento.rateio }),
        ...(lancamento.tags &&
          lancamento.tags.length > 0 && { tags: lancamento.tags }),
        ...(lancamento.anexos &&
          lancamento.anexos.length > 0 && { anexos: lancamento.anexos }),
      });
    }
  }, [lancamento]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      // Handle nested fields
      if (name.includes(".")) {
        const parts = name.split(".");
        setFormData((prev) => {
          const newData = { ...prev };
          let current = newData;

          // Navigate to the nested property
          for (let i = 0; i < parts.length - 1; i++) {
            if (!current[parts[i]]) {
              current[parts[i]] = {};
            }
            current = current[parts[i]];
          }

          // Set the value
          current[parts[parts.length - 1]] = value;
          return newData;
        });
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => {
      const newArray = [...(prev[field] || [])];
      newArray[index] = { ...newArray[index], ...value };
      return {
        ...prev,
        [field]: newArray,
      };
    });
  };

  const handleAddToArray = (field, defaultValue) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), defaultValue],
    }));
  };

  const handleRemoveFromArray = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validações básicas
    if (!formData.descricao?.trim()) {
      newErrors.descricao = "Descrição é obrigatória";
    }

    if (!formData.historicoContabil?.trim()) {
      newErrors.historicoContabil = "Histórico contábil é obrigatório";
    }

    if (!formData.valor || formData.valor <= 0) {
      newErrors.valor = "Valor deve ser maior que zero";
    }

    if (!formData.contaDebito?.codigo) {
      newErrors["contaDebito.codigo"] = "Código da conta débito é obrigatório";
    }

    if (!formData.contaCredito?.codigo) {
      newErrors["contaCredito.codigo"] =
        "Código da conta crédito é obrigatório";
    }

    if (!formData.dataLancamento) {
      newErrors.dataLancamento = "Data de lançamento é obrigatória";
    }

    if (!formData.dataCompetencia) {
      newErrors.dataCompetencia = "Data de competência é obrigatória";
    }

    // Validar se contas são diferentes
    if (
      formData.contaDebito?.codigo &&
      formData.contaCredito?.codigo &&
      formData.contaDebito.codigo === formData.contaCredito.codigo
    ) {
      newErrors["contaDebito.codigo"] =
        "Conta débito e crédito não podem ser iguais";
      newErrors["contaCredito.codigo"] =
        "Conta débito e crédito não podem ser iguais";
    }

    // Validar rateio
    if (formData.rateio && formData.rateio.length > 0) {
      const totalRateio = formData.rateio.reduce(
        (sum, item) => sum + (item.percentual || 0),
        0
      );
      if (Math.abs(totalRateio - 100) > 0.01) {
        newErrors.rateio = `Soma dos percentuais deve ser 100% (atual: ${totalRateio.toFixed(
          2
        )}%)`;
      }
    }

    // Validação da moeda
    if (formData.moeda && !validateMoeda(formData.moeda)) {
      newErrors.moeda = `Moeda inválida. Valores permitidos: ${[
        "MZN",
        "USD",
        "EUR",
        "ZAR",
        "GBP",
        "CNY",
      ].join(", ")}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Pegar apenas campos modificados
      const camposModificados = getCamposModificados();

      // Se não há modificações, enviar apenas o ID
      const payloadBasico = {
        lancamentoId: lancamento.lancamentoId,
        usuario: "usuario_atual",
        ...camposModificados,
      };

      // Adicionar campos de arrays apenas se houver modificações
      if (formData.rateio && formData.rateio.length > 0) {
        const rateioOriginal = lancamento.rateio || [];
        if (
          JSON.stringify(formData.rateio) !== JSON.stringify(rateioOriginal)
        ) {
          payloadBasico.rateio = formData.rateio;
        }
      }

      if (formData.tags && formData.tags.length > 0) {
        const tagsOriginal = lancamento.tags || [];
        if (JSON.stringify(formData.tags) !== JSON.stringify(tagsOriginal)) {
          payloadBasico.tags = formData.tags;
        }
      }

      // Preparar dados para envio (apenas os essenciais)
      const dadosParaEnvio = cleanObject({
        ...payloadBasico,
        valor: formData.valor ? parseFloat(formData.valor) : undefined,
        taxaCambio: formData.taxaCambio
          ? parseFloat(formData.taxaCambio)
          : undefined,
        moeda:
          formData.moeda &&
          ["MZN", "USD", "EUR", "ZAR", "GBP", "CNY"].includes(formData.moeda)
            ? formData.moeda
            : "MZN",
        // Converter datas para formato ISO
        ...(formData.dataLancamento && {
          dataLancamento: new Date(formData.dataLancamento).toISOString(),
        }),
        ...(formData.dataCompetencia && {
          dataCompetencia: new Date(formData.dataCompetencia).toISOString(),
        }),
        ...(formData.dataVencimento && {
          dataVencimento: new Date(formData.dataVencimento).toISOString(),
        }),
        // Processar tributos apenas se existirem
        ...(formData.tributacao && {
          tributacao: cleanObject({
            ...(formData.tributacao.iva && {
              iva: cleanObject({
                ...formData.tributacao.iva,
                ...(formData.tributacao.iva.percentual && {
                  percentual: parseFloat(formData.tributacao.iva.percentual),
                }),
                ...(formData.tributacao.iva.valor && {
                  valor: parseFloat(formData.tributacao.iva.valor),
                }),
              }),
            }),
          }),
        }),
      });

      // Log do tamanho do payload para debug
      console.log(
        "Payload size:",
        JSON.stringify(dadosParaEnvio).length,
        "bytes"
      );
      console.log("Payload data:", dadosParaEnvio);

      // Chamar API de atualização
      await onSave(dadosParaEnvio);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar lançamento:", error);
      setErrors({
        submit: error.message || "Erro ao salvar. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Renderizar conteúdo com base na aba ativa
  const renderConteudoAba = () => {
    switch (abaAtiva) {
      case "tributacao":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Tributação
            </h3>

            {/* IVA */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">IVA</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de IVA
                  </label>
                  <select
                    name="tributacao.iva.tipo"
                    value={formData.tributacao?.iva?.tipo || "incluso"}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="incluso">Incluso</option>
                    <option value="exento">Exento</option>
                    <option value="nao_aplicavel">Não Aplicável</option>
                    <option value="isento">Isento</option>
                    <option value="regime_transicao">Regime Transição</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Regime
                  </label>
                  <select
                    name="tributacao.iva.regime"
                    value={formData.tributacao?.iva?.regime || "geral"}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="geral">Geral</option>
                    <option value="simplificado">Simplificado</option>
                    <option value="isenção">Isenção</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Percentual (%)
                  </label>
                  <input
                    type="number"
                    name="tributacao.iva.percentual"
                    value={formData.tributacao?.iva?.percentual || 16}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valor
                  </label>
                  <input
                    type="number"
                    name="tributacao.iva.valor"
                    value={formData.tributacao?.iva?.valor || 0}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Base de Cálculo
                  </label>
                  <input
                    type="number"
                    name="tributacao.iva.baseCalculo"
                    value={formData.tributacao?.iva?.baseCalculo || 0}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="tributacao.iva.retencaoNaFonte"
                    checked={formData.tributacao?.iva?.retencaoNaFonte || false}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        tributacao: {
                          ...prev.tributacao,
                          iva: {
                            ...prev.tributacao?.iva,
                            retencaoNaFonte: e.target.checked,
                          },
                        },
                      }));
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    Retenção na Fonte
                  </span>
                </label>
              </div>
            </div>
            {/* IRPS */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">IRPS</h4>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.tributacao?.irps?.aplicavel || false}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        tributacao: {
                          ...prev.tributacao,
                          irps: {
                            ...prev.tributacao?.irps,
                            aplicavel: e.target.checked,
                          },
                        },
                      }));
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Aplicável</span>
                </label>
              </div>

              {formData.tributacao?.irps?.aplicavel && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Regime
                      </label>
                      <select
                        name="tributacao.irps.regime"
                        value={formData.tributacao?.irps?.regime || "singular"}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="coletivo">Coletivo</option>
                        <option value="singular">Singular</option>
                        <option value="isenção">Isenção</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Percentual (%)
                      </label>
                      <input
                        type="number"
                        name="tributacao.irps.percentual"
                        value={formData.tributacao?.irps?.percentual || 0}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Valor
                      </label>
                      <input
                        type="number"
                        name="tributacao.irps.valor"
                        value={formData.tributacao?.irps?.valor || 0}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* INSS */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">INSS</h4>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.tributacao?.inss?.aplicavel || false}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        tributacao: {
                          ...prev.tributacao,
                          inss: {
                            ...prev.tributacao?.inss,
                            aplicavel: e.target.checked,
                          },
                        },
                      }));
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Aplicável</span>
                </label>
              </div>

              {formData.tributacao?.inss?.aplicavel && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo de Contribuição
                      </label>
                      <select
                        name="tributacao.inss.tipoContribuicao"
                        value={
                          formData.tributacao?.inss?.tipoContribuicao ||
                          "empregador"
                        }
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="empregador">Empregador</option>
                        <option value="trabalhador">Trabalhador</option>
                        <option value="ambos">Ambos</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Percentual (%)
                      </label>
                      <input
                        type="number"
                        name="tributacao.inss.percentual"
                        value={formData.tributacao?.inss?.percentual || 0}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Valor
                      </label>
                      <input
                        type="number"
                        name="tributacao.inss.valor"
                        value={formData.tributacao?.inss?.valor || 0}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case "rateio":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Rateio</h3>

            {errors.rateio && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {errors.rateio}
              </div>
            )}

            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600">
                Adicione os centros de custo para rateio do valor total
              </p>
              <button
                type="button"
                onClick={() =>
                  handleAddToArray("rateio", {
                    centroCusto: { codigo: "", descricao: "", tipo: "" },
                    percentual: 0,
                    valor: 0,
                    baseCalculo: "valor",
                  })
                }
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                + Adicionar Rateio
              </button>
            </div>

            <div className="space-y-4">
              {(formData.rateio || []).map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-gray-900">
                      Item de Rateio #{index + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleRemoveFromArray("rateio", index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remover
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Código do Centro de Custo
                      </label>
                      <input
                        type="text"
                        value={item.centroCusto?.codigo || ""}
                        onChange={(e) =>
                          handleArrayChange("rateio", index, {
                            centroCusto: {
                              ...item.centroCusto,
                              codigo: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ex: CC-001"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descrição
                      </label>
                      <input
                        type="text"
                        value={item.centroCusto?.descricao || ""}
                        onChange={(e) =>
                          handleArrayChange("rateio", index, {
                            centroCusto: {
                              ...item.centroCusto,
                              descricao: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ex: Departamento de Vendas"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Percentual (%)
                      </label>
                      <input
                        type="number"
                        value={item.percentual || 0}
                        onChange={(e) =>
                          handleArrayChange("rateio", index, {
                            percentual: parseFloat(e.target.value) || 0,
                          })
                        }
                        step="0.01"
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Valor
                      </label>
                      <input
                        type="number"
                        value={item.valor || 0}
                        onChange={(e) =>
                          handleArrayChange("rateio", index, {
                            valor: parseFloat(e.target.value) || 0,
                          })
                        }
                        step="0.01"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Base de Cálculo
                      </label>
                      <select
                        value={item.baseCalculo || "valor"}
                        onChange={(e) =>
                          handleArrayChange("rateio", index, {
                            baseCalculo: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="valor">Valor Total</option>
                        <option value="percentual">Percentual Fixo</option>
                        <option value="especifico">Valor Específico</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumo do Rateio */}
            {(formData.rateio || []).length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">
                  Resumo do Rateio
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-blue-700">Total de Itens:</p>
                    <p className="font-medium">
                      {(formData.rateio || []).length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-700">
                      Soma dos Percentuais:
                    </p>
                    <p
                      className={`font-medium ${
                        Math.abs(
                          (formData.rateio || []).reduce(
                            (sum, item) => sum + (item.percentual || 0),
                            0
                          ) - 100
                        ) > 0.01
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {(formData.rateio || [])
                        .reduce((sum, item) => sum + (item.percentual || 0), 0)
                        .toFixed(2)}
                      %
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-700">Soma dos Valores:</p>
                    <p className="font-medium">
                      {new Intl.NumberFormat("pt-MZ", {
                        style: "currency",
                        currency: formData.moeda || "MZN",
                      }).format(
                        (formData.rateio || []).reduce(
                          (sum, item) => sum + (item.valor || 0),
                          0
                        )
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "documentos":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Documentos
            </h3>

            {/* Documento Principal */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">
                Documento Principal
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Documento
                  </label>
                  <select
                    name="documento.tipo"
                    value={formData.documento?.tipo || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione...</option>
                    <option value="fatura">Fatura</option>
                    <option value="recibo">Recibo</option>
                    <option value="nota_credito">Nota de Crédito</option>
                    <option value="nota_debito">Nota de Débito</option>
                    <option value="extrato">Extrato</option>
                    <option value="comprovante">Comprovante</option>
                    <option value="duplicata">Duplicata</option>
                    <option value="cheque">Cheque</option>
                    <option value="transferencia">Transferência</option>
                    <option value="boleto">Boleto</option>
                    <option value="contrato">Contrato</option>
                    <option value="folha_pagamento">Folha de Pagamento</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número
                  </label>
                  <input
                    type="text"
                    name="documento.numero"
                    value={formData.documento?.numero || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 001/2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Série
                  </label>
                  <input
                    type="text"
                    name="documento.serie"
                    value={formData.documento?.serie || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: A"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Emissão
                  </label>
                  <input
                    type="date"
                    name="documento.dataEmissao"
                    value={formData.documento?.dataEmissao || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Emissor
                  </label>
                  <input
                    type="text"
                    name="documento.emissor"
                    value={formData.documento?.emissor || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nome do emissor"
                  />
                </div>
              </div>
            </div>

            {/* Anexos */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-900">Anexos</h4>
                <button
                  type="button"
                  onClick={() =>
                    handleAddToArray("anexos", {
                      nome: "",
                      tipo: "pdf",
                      url: "",
                      descricao: "",
                    })
                  }
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  + Adicionar Anexo
                </button>
              </div>

              <div className="space-y-3">
                {(formData.anexos || []).map((anexo, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-3"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="font-medium text-gray-900">
                        Anexo #{index + 1}
                      </h5>
                      <button
                        type="button"
                        onClick={() => handleRemoveFromArray("anexos", index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remover
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nome do Arquivo
                        </label>
                        <input
                          type="text"
                          value={anexo.nome || ""}
                          onChange={(e) =>
                            handleArrayChange("anexos", index, {
                              nome: e.target.value,
                            })
                          }
                          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Ex: fatura_001.pdf"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tipo
                        </label>
                        <select
                          value={anexo.tipo || "pdf"}
                          onChange={(e) =>
                            handleArrayChange("anexos", index, {
                              tipo: e.target.value,
                            })
                          }
                          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="pdf">PDF</option>
                          <option value="imagem">Imagem</option>
                          <option value="excel">Excel</option>
                          <option value="word">Word</option>
                          <option value="xml">XML</option>
                          <option value="notafiscal">Nota Fiscal</option>
                          <option value="outro">Outro</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        URL/Link
                      </label>
                      <input
                        type="text"
                        value={anexo.url || ""}
                        onChange={(e) =>
                          handleArrayChange("anexos", index, {
                            url: e.target.value,
                          })
                        }
                        className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://exemplo.com/arquivo.pdf"
                      />
                    </div>

                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descrição
                      </label>
                      <input
                        type="text"
                        value={anexo.descricao || ""}
                        onChange={(e) =>
                          handleArrayChange("anexos", index, {
                            descricao: e.target.value,
                          })
                        }
                        className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Descrição do anexo"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default: // dados-basicos
        return (
          <div className="space-y-6">
            {/* Conteúdo original da aba Dados Básicos */}
            {/* Seção 1: Identificação */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número do Lançamento *
                </label>
                <input
                  type="text"
                  name="numeroLancamento"
                  value={formData.numeroLancamento || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Lançamento *
                </label>
                <select
                  name="tipoLancamento"
                  value={formData.tipoLancamento || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="receita_operacional">
                    Receita Operacional
                  </option>
                  <option value="despesa_operacional">
                    Despesa Operacional
                  </option>
                  <option value="ativo_circulante">Ativo Circulante</option>
                  <option value="passivo_circulante">Passivo Circulante</option>
                  <option value="imposto">Imposto</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria Contábil *
                </label>
                <select
                  name="categoriaContabil"
                  value={formData.categoriaContabil || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="vendas">Vendas</option>
                  <option value="servicos">Serviços</option>
                  <option value="despesas_adm">Despesas Administrativas</option>
                  <option value="despesas_financeiras">
                    Despesas Financeiras
                  </option>
                  <option value="imobilizado">Imobilizado</option>
                </select>
              </div>
            </div>

            {/* Seção 2: Descrição */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição *
                </label>
                <input
                  type="text"
                  name="descricao"
                  value={formData.descricao || ""}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.descricao ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                {errors.descricao && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.descricao}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Histórico Contábil *
                </label>
                <textarea
                  name="historicoContabil"
                  value={formData.historicoContabil || ""}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.historicoContabil
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  required
                />
                {errors.historicoContabil && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.historicoContabil}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observações
                </label>
                <textarea
                  name="observacoes.conteudo"
                  value={formData.observacoes?.conteudo || ""}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Seção 3: Contas Contábeis */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Contas Contábeis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Conta Débito */}
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-3">
                      Conta Débito
                    </h4>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Código da Conta *
                        </label>
                        <input
                          type="text"
                          name="contaDebito.codigo"
                          value={formData.contaDebito?.codigo || ""}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors["contaDebito.codigo"]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          required
                        />
                        {errors["contaDebito.codigo"] && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors["contaDebito.codigo"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Descrição da Conta *
                        </label>
                        <input
                          type="text"
                          name="contaDebito.descricao"
                          value={formData.contaDebito?.descricao || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tipo de Conta
                        </label>
                        <select
                          name="contaDebito.tipo"
                          value={formData.contaDebito?.tipo || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Selecione...</option>
                          <option value="ativo">Ativo</option>
                          <option value="passivo">Passivo</option>
                          <option value="receita">Receita</option>
                          <option value="despesa">Despesa</option>
                          <option value="patrimonio">Patrimônio</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conta Crédito */}
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-3">
                      Conta Crédito
                    </h4>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Código da Conta *
                        </label>
                        <input
                          type="text"
                          name="contaCredito.codigo"
                          value={formData.contaCredito?.codigo || ""}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors["contaCredito.codigo"]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          required
                        />
                        {errors["contaCredito.codigo"] && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors["contaCredito.codigo"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Descrição da Conta *
                        </label>
                        <input
                          type="text"
                          name="contaCredito.descricao"
                          value={formData.contaCredito?.descricao || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tipo de Conta
                        </label>
                        <select
                          name="contaCredito.tipo"
                          value={formData.contaCredito?.tipo || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Selecione...</option>
                          <option value="ativo">Ativo</option>
                          <option value="passivo">Passivo</option>
                          <option value="receita">Receita</option>
                          <option value="despesa">Despesa</option>
                          <option value="patrimonio">Patrimônio</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seção 4: Valores e Moeda */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Valores
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valor *
                  </label>
                  <input
                    type="number"
                    name="valor"
                    value={formData.valor || ""}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.valor ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.valor && (
                    <p className="mt-1 text-sm text-red-600">{errors.valor}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Moeda
                  </label>
                  <select
                    name="moeda"
                    value={formData.moeda || "MZN"}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.moeda ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="MZN">MZN</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="ZAR">ZAR</option>
                    <option value="GBP">GBP</option>
                    <option value="CNY">CNY</option>
                  </select>
                  {errors.moeda && (
                    <p className="mt-1 text-sm text-red-600">{errors.moeda}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Taxa de Câmbio
                  </label>
                  <input
                    type="number"
                    name="taxaCambio"
                    value={formData.taxaCambio || 1}
                    onChange={handleChange}
                    step="0.0001"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Natureza *
                  </label>
                  <select
                    name="natureza"
                    value={formData.natureza || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="debito">Débito</option>
                    <option value="credito">Crédito</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Seção 5: Datas */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Datas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Lançamento *
                  </label>
                  <input
                    type="date"
                    name="dataLancamento"
                    value={formData.dataLancamento || ""}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.dataLancamento
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.dataLancamento && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.dataLancamento}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Competência *
                  </label>
                  <input
                    type="date"
                    name="dataCompetencia"
                    value={formData.dataCompetencia || ""}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.dataCompetencia
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.dataCompetencia && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.dataCompetencia}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Vencimento
                  </label>
                  <input
                    type="date"
                    name="dataVencimento"
                    value={formData.dataVencimento || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Seção 6: Status e Workflow */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Status e Workflow
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status || "rascunho"}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="rascunho">Rascunho</option>
                    <option value="pendente">Pendente</option>
                    <option value="conferido">Conferido</option>
                    <option value="aprovado">Aprovado</option>
                    <option value="conciliado">Conciliado</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status de Conciliação
                  </label>
                  <select
                    name="statusConciliacao"
                    value={formData.statusConciliacao || "nao_conciliado"}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="nao_conciliado">Não Conciliado</option>
                    <option value="parcial">Parcial</option>
                    <option value="totalmente">Totalmente</option>
                    <option value="discrepante">Discrepante</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Etapa do Workflow
                  </label>
                  <select
                    name="workflow.etapaAtual"
                    value={formData.workflow?.etapaAtual || "criacao"}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="criacao">Criação</option>
                    <option value="analise">Análise</option>
                    <option value="aprovacao">Aprovação</option>
                    <option value="contabilizacao">Contabilização</option>
                    <option value="conciliacao">Conciliação</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Seção 7: Tributação */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Tributação
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    IVA (%)
                  </label>
                  <input
                    type="number"
                    name="tributacao.iva.percentual"
                    value={formData.tributacao?.iva?.percentual || 16}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Regime IVA
                  </label>
                  <select
                    name="tributacao.iva.regime"
                    value={formData.tributacao?.iva?.regime || "geral"}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="geral">Geral</option>
                    <option value="simplificado">Simplificado</option>
                    <option value="isenção">Isenção</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Retenção na Fonte
                  </label>
                  <select
                    name="tributacao.iva.retencaoNaFonte"
                    value={formData.tributacao?.iva?.retencaoNaFonte || false}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="false">Não</option>
                    <option value="true">Sim</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Seção 8: Rateio (simplificado) */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Rateio</h3>
                <button
                  type="button"
                  onClick={() =>
                    handleAddToArray("rateio", {
                      centroCusto: { codigo: "", descricao: "" },
                      percentual: 0,
                      valor: 0,
                    })
                  }
                  className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                >
                  + Adicionar Rateio
                </button>
              </div>

              {errors.rateio && (
                <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                  {errors.rateio}
                </div>
              )}

              <div className="space-y-3">
                {(formData.rateio || []).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Centro de Custo
                      </label>
                      <input
                        type="text"
                        value={item.centroCusto?.codigo || ""}
                        onChange={(e) =>
                          handleArrayChange("rateio", index, {
                            ...item,
                            centroCusto: {
                              ...item.centroCusto,
                              codigo: e.target.value,
                            },
                          })
                        }
                        placeholder="Código"
                        className="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>

                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Percentual (%)
                      </label>
                      <input
                        type="number"
                        value={item.percentual || 0}
                        onChange={(e) =>
                          handleArrayChange("rateio", index, {
                            ...item,
                            percentual: parseFloat(e.target.value) || 0,
                          })
                        }
                        step="0.01"
                        min="0"
                        max="100"
                        className="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>

                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Valor
                      </label>
                      <input
                        type="number"
                        value={item.valor || 0}
                        onChange={(e) =>
                          handleArrayChange("rateio", index, {
                            ...item,
                            valor: parseFloat(e.target.value) || 0,
                          })
                        }
                        step="0.01"
                        min="0"
                        className="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveFromArray("rateio", index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Seção 9: Exercício Contábil */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Exercício Contábil
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ano
                  </label>
                  <input
                    type="number"
                    name="exercicio.ano"
                    value={formData.exercicio?.ano || new Date().getFullYear()}
                    onChange={handleChange}
                    min="2000"
                    max="2100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mês
                  </label>
                  <input
                    type="number"
                    name="exercicio.mes"
                    value={formData.exercicio?.mes || new Date().getMonth() + 1}
                    onChange={handleChange}
                    min="1"
                    max="12"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trimestre
                  </label>
                  <input
                    type="number"
                    name="exercicio.trimestre"
                    value={
                      formData.exercicio?.trimestre ||
                      Math.ceil((new Date().getMonth() + 1) / 3)
                    }
                    onChange={handleChange}
                    min="1"
                    max="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fechado
                  </label>
                  <select
                    name="exercicio.fechado"
                    value={formData.exercicio?.fechado || false}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="false">Não</option>
                    <option value="true">Sim</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Seção 10: Tags */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Tags</h3>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const newTag = prompt("Digite a tag:");
                      if (newTag) {
                        handleAddToArray("tags", newTag);
                      }
                    }}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                  >
                    + Adicionar Tag
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {(formData.tags || []).map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"
                  >
                    <span className="text-sm">{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFromArray("tags", index)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  if (!isOpen || !lancamento) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 text-gray-950">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Editar Lançamento Contábil</h2>
            <p className="text-sm text-gray-300">
              {lancamento.numeroLancamento} - {lancamento.descricao}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Abas de navegação */}
        <div className="border-b border-gray-200">
          <nav className="flex flex-wrap -mb-px">
            <button
              type="button"
              onClick={() => setAbaAtiva("dados-basicos")}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                abaAtiva === "dados-basicos"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Dados Básicos
            </button>
            <button
              type="button"
              onClick={() => setAbaAtiva("tributacao")}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                abaAtiva === "tributacao"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Tributação
            </button>
            <button
              type="button"
              onClick={() => setAbaAtiva("rateio")}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                abaAtiva === "rateio"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Rateio
            </button>
            <button
              type="button"
              onClick={() => setAbaAtiva("documentos")}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                abaAtiva === "documentos"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Documentos
            </button>
          </nav>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-[calc(90vh-8rem)]"
        >
          <div className="p-6 space-y-6">
            {errors.submit && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {errors.submit}
              </div>
            )}
            {renderConteudoAba()}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="animate-spin inline-block mr-2">⟳</span>
                  Salvando...
                </>
              ) : (
                "Salvar Alterações"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarLancamento;
