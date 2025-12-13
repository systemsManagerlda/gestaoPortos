import React, { useState, useEffect } from "react";
import DashboardCard from "../../context/DashboardCard";
import ModalLancamento from "../../context/ModalLancamento";
import LancamentoItem from "../../context/LancamentoItem";
import FiltrosLancamentos from "../../context/FiltrosLancamentos";

// Adicione esta função de utilidade no início do arquivo
const formatCurrency = (value, currency = "MZN") => {
  try {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value || 0);
  } catch (error) {
    return `${(value || 0).toLocaleString("pt-MZ")} ${currency}`;
  }
};

const formatNumber = (value) => {
  return Number(value || 0).toLocaleString("pt-MZ", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatPercent = (value) => {
  return `${((value || 0) * 100).toFixed(2)}%`;
};

// API Service
const apiService = {
  // Função auxiliar para determinar o tipo da conta pelo código
  getContaTipo(codigo) {
    if (!codigo) return "outro";

    const firstDigit = codigo.charAt(0);
    switch (firstDigit) {
      case "1":
        return "ativo";
      case "2":
        return "ativo";
      case "3":
        return "passivo";
      case "4":
        return "receita";
      case "5":
        return "resultado";
      case "6":
        return "despesa";
      case "7":
        return "despesa";
      case "8":
        return "resultado";
      case "9":
        return "patrimonio";
      default:
        return "outro";
    }
  },

  // Função auxiliar para mapear tipo de lançamento para categoria
  getCategoriaByTipo(tipoLancamento) {
    const categorias = {
      receita_operacional: "vendas",
      receita_nao_operacional: "servicos",
      despesa_operacional: "despesas_adm",
      despesa_financeira: "despesas_financeiras",
      ativo_circulante: "estoques",
      passivo_circulante: "fornecedores",
    };

    return categorias[tipoLancamento] || "outro";
  },

  async getDashboard() {
    try {
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getContabilidadeDashboard",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ periodoMeses: 12 }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erro no getDashboard:", error);
      throw error;
    }
  },

  async getLancamentos(filtros = {}) {
    try {
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getLancamentosList",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ curPage: 1, pageSize: 50, ...filtros }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erro no getLancamentos:", error);
      throw error;
    }
  },

  async createLancamento(data) {
    try {
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/createLancamento",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // Campos obrigatórios conforme a rota
            contaDebito: {
              codigo: data.contaDebito.codigo,
              descricao: data.contaDebito.descricao,
              tipo: this.getContaTipo(data.contaDebito.codigo), // Função auxiliar
            },
            contaCredito: {
              codigo: data.contaCredito.codigo,
              descricao: data.contaCredito.descricao,
              tipo: this.getContaTipo(data.contaCredito.codigo),
            },
            valor: parseFloat(data.valor),
            descricao: data.descricao,
            historicoContabil: data.historicoContabil,
            tipoLancamento: data.tipoLancamento,
            dataLancamento: data.dataLancamento,
            dataCompetencia: data.dataCompetencia,
            categoriaContabil: this.getCategoriaByTipo(data.tipoLancamento),
            natureza: data.natureza,
            criadoPor: localStorage.getItem("userId") || "usuario_atual",
            // Campos com valores padrão
            status: "rascunho",
            statusConciliacao: "nao_conciliado",
            exercicio: {
              ano: new Date(data.dataCompetencia).getFullYear(),
              periodo: "mensal",
              mes: new Date(data.dataCompetencia).getMonth() + 1,
              trimestre: Math.ceil(
                (new Date(data.dataCompetencia).getMonth() + 1) / 3
              ),
            },
            // Gerar IDs automáticos
            lancamentoId: `LC${Date.now()}${Math.floor(Math.random() * 1000)}`,
            // O número do lançamento será gerado no backend
            numeroLancamento: "",
            // Outros campos com valores padrão
            moeda: "MZN",
            taxaCambio: 1,
            planoContas: "nacional",
            origemLancamento: "manual",
            aprovacao: { status: "pendente" },
            controleInterno: { risco: "baixo", conformidade: "pendente" },
            tributacao: {
              iva: {
                tipo: "nao_aplicavel",
                valor: 0,
              },
            },
          }),
        }
      );

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro na resposta:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, body: ${errorText}`
        );
      }

      const result = await response.json();
      console.log("Resultado do createLancamento:", result);
      return result;
    } catch (error) {
      console.error("Erro no createLancamento:", error);
      throw error;
    }
  },

  async updateLancamento(data) {
    const response = await fetch(
      "https://desktop-api-4f850b3f9733.herokuapp.com/updateLancamento",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  },

  async conciliarLancamento(lancamentoId) {
    const response = await fetch(
      "https://desktop-api-4f850b3f9733.herokuapp.com/conciliarLancamento",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lancamentoId,
          usuario: "usuario_atual",
          valorConciliado: null,
        }),
      }
    );
    return response.json();
  },

  async deleteLancamento(lancamentoId) {
    const response = await fetch(
      "https://desktop-api-4f850b3f9733.herokuapp.com/deleteLancamento",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lancamentoId,
          usuario: "usuario_atual",
          motivo: "Exclusão manual",
        }),
      }
    );
    return response.json();
  },

  async getBalancete(ano, mes) {
    try {
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/gerarBalancete",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ano, mes, detalhado: true }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erro no getBalancete:", error);
      throw error;
    }
  },
  async getObrigacoesFiscais(ano) {
    try {
      // Usar a rota getLancamentosList para filtrar obrigações fiscais
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getLancamentosList",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            curPage: 1,
            pageSize: 50,
            exercicioAno: ano,
            tipoLancamento: "imposto", // Filtrar por tipo de lançamento fiscal
            status: "pendente", // Mostrar apenas pendentes
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erro no getObrigacoesFiscais:", error);
      throw error;
    }
  },
  async gerarRelatorioFiscal(ano) {
    try {
      // Usar a rota exportLancamentos para obter dados fiscais
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/exportLancamentos",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formato: "json",
            exercicioAno: ano,
            tipoLancamento: "imposto",
            dataInicio: `${ano}-01-01`,
            dataFim: `${ano}-12-31`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erro no gerarRelatorioFiscal:", error);
      throw error;
    }
  },

  async getDemonstracaoResultados(ano, mes) {
    try {
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/gerarDRE",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ano, mes }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erro no getDemonstracaoResultados:", error);
      throw error;
    }
  },

  async getBalancoPatrimonial(ano, mes) {
    try {
      // Primeiro, vamos buscar os lançamentos do período
      const lancamentosResponse = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getLancamentosList",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ano,
            mes,
            pageSize: 1000,
            curPage: 1,
          }),
        }
      );

      const result = await lancamentosResponse.json();
      if (result.returnCode === 200) {
        return this.calcularBalancoPatrimonial(result.data.list || []);
      }
      return { ativo: {}, passivo: {}, patrimonio: {} };
    } catch (error) {
      console.error("Erro ao gerar balanço patrimonial:", error);
      return { ativo: {}, passivo: {}, patrimonio: {} };
    }
  },

  calcularBalancoPatrimonial(lancamentos) {
    const ativo = {
      circulante: {
        caixa: 0,
        bancos: 0,
        clientes: 0,
        estoques: 0,
        outros: 0,
        total: 0,
      },
      naoCirculante: {
        imobilizado: 0,
        investimentos: 0,
        intangivel: 0,
        outros: 0,
        total: 0,
      },
      total: 0,
    };

    const passivo = {
      circulante: {
        fornecedores: 0,
        emprestimos: 0,
        impostos: 0,
        outros: 0,
        total: 0,
      },
      naoCirculante: {
        financiamentos: 0,
        outros: 0,
        total: 0,
      },
      total: 0,
    };

    const patrimonio = {
      capitalSocial: 0,
      reservas: 0,
      lucrosAcumulados: 0,
      resultadoExercicio: 0,
      total: 0,
    };

    // Processar lançamentos para classificar nas contas
    lancamentos.forEach((lancamento) => {
      const valor = lancamento.valor || 0;
      const natureza = lancamento.natureza;

      // Classificar por código da conta
      const codigoDebito = lancamento.contaDebito?.codigo || "";
      const codigoCredito = lancamento.contaCredito?.codigo || "";

      // Função para classificar conta
      const classificarConta = (codigo, valor, tipo) => {
        const primeiroDigito = codigo.charAt(0);

        switch (primeiroDigito) {
          case "1": // Ativo Circulante
            if (codigo.includes("111") || codigo.includes("112")) {
              ativo.circulante.caixa += tipo === "debito" ? valor : -valor;
            } else if (codigo.includes("121") || codigo.includes("122")) {
              ativo.circulante.bancos += tipo === "debito" ? valor : -valor;
            } else if (codigo.includes("131")) {
              ativo.circulante.clientes += tipo === "debito" ? valor : -valor;
            } else if (codigo.includes("141")) {
              ativo.circulante.estoques += tipo === "debito" ? valor : -valor;
            } else {
              ativo.circulante.outros += tipo === "debito" ? valor : -valor;
            }
            break;

          case "2": // Ativo Não Circulante
            if (codigo.includes("211")) {
              ativo.naoCirculante.imobilizado +=
                tipo === "debito" ? valor : -valor;
            } else if (codigo.includes("212")) {
              ativo.naoCirculante.investimentos +=
                tipo === "debito" ? valor : -valor;
            } else if (codigo.includes("213")) {
              ativo.naoCirculante.intangivel +=
                tipo === "debito" ? valor : -valor;
            } else {
              ativo.naoCirculante.outros += tipo === "debito" ? valor : -valor;
            }
            break;

          case "3": // Passivo Circulante
            if (codigo.includes("311")) {
              passivo.circulante.fornecedores +=
                tipo === "credito" ? valor : -valor;
            } else if (codigo.includes("321")) {
              passivo.circulante.emprestimos +=
                tipo === "credito" ? valor : -valor;
            } else if (codigo.includes("331")) {
              passivo.circulante.impostos +=
                tipo === "credito" ? valor : -valor;
            } else {
              passivo.circulante.outros += tipo === "credito" ? valor : -valor;
            }
            break;

          case "4": // Passivo Não Circulante
            passivo.naoCirculante.outros += tipo === "credito" ? valor : -valor;
            break;

          case "5": // Patrimônio Líquido
            if (codigo.includes("511")) {
              patrimonio.capitalSocial += tipo === "credito" ? valor : -valor;
            } else if (codigo.includes("521")) {
              patrimonio.reservas += tipo === "credito" ? valor : -valor;
            } else if (codigo.includes("531")) {
              patrimonio.lucrosAcumulados +=
                tipo === "credito" ? valor : -valor;
            }
            break;
        }
      };

      // Processar débito e crédito
      if (natureza === "debito") {
        classificarConta(codigoDebito, valor, "debito");
        classificarConta(codigoCredito, valor, "credito");
      } else {
        classificarConta(codigoCredito, valor, "debito");
        classificarConta(codigoDebito, valor, "credito");
      }
    });

    // Calcular totais
    ativo.circulante.total =
      Object.values(ativo.circulante).reduce((a, b) => a + b, 0) -
      ativo.circulante.total; // Remove o próprio total da soma
    ativo.naoCirculante.total =
      Object.values(ativo.naoCirculante).reduce((a, b) => a + b, 0) -
      ativo.naoCirculante.total;
    ativo.total = ativo.circulante.total + ativo.naoCirculante.total;

    passivo.circulante.total =
      Object.values(passivo.circulante).reduce((a, b) => a + b, 0) -
      passivo.circulante.total;
    passivo.naoCirculante.total =
      Object.values(passivo.naoCirculante).reduce((a, b) => a + b, 0) -
      passivo.naoCirculante.total;
    passivo.total = passivo.circulante.total + passivo.naoCirculante.total;

    patrimonio.total =
      Object.values(patrimonio).reduce((a, b) => a + b, 0) - patrimonio.total;

    // Ajustar para equilíbrio patrimonial (Ativo = Passivo + Patrimônio)
    const diferenca = ativo.total - (passivo.total + patrimonio.total);
    if (Math.abs(diferenca) > 0.01) {
      patrimonio.resultadoExercicio += diferenca;
      patrimonio.total += diferenca;
    }

    return { ativo, passivo, patrimonio };
  },

  async getFluxoCaixa(periodoMeses = 6) {
    try {
      // Buscar lançamentos dos próximos meses para projeção
      const hoje = new Date();
      const dataFim = new Date();
      dataFim.setMonth(dataFim.getMonth() + periodoMeses);

      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getLancamentosList",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            curPage: 1,
            pageSize: 1000,
            dataVencimentoInicio: hoje.toISOString().split("T")[0],
            dataVencimentoFim: dataFim.toISOString().split("T")[0],
            status: { $in: ["pendente", "conferido"] },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (
        result.returnCode === 200 &&
        result.data.list &&
        result.data.list.length > 0
      ) {
        // Processar lançamentos para criar projeção mensal
        const previsaoFluxo = this.processarFluxoCaixa(
          result.data.list,
          periodoMeses
        );

        return {
          returnCode: 200,
          returnMsg: "Success",
          data: {
            previsaoFluxo,
            metricasRapidas: {
              resultado: this.calcularSaldoTotal(previsaoFluxo),
              moeda: "MZN",
              isSimulated: false,
            },
          },
        };
      }

      // Se não há lançamentos futuros
      return {
        returnCode: 200,
        returnMsg: "No future data available",
        data: {
          previsaoFluxo: [],
          metricasRapidas: {
            resultado: 0,
            moeda: "MZN",
            isSimulated: false,
          },
        },
      };
    } catch (error) {
      console.error("Erro no getFluxoCaixa:", error);
      return {
        returnCode: 500,
        returnMsg: "Error fetching cash flow data",
        data: null,
      };
    }
  },

  // Nova função para processar lançamentos em projeção mensal
  processarFluxoCaixa(lancamentos, periodoMeses) {
    const hoje = new Date();
    const fluxoMensal = {};

    // Inicializar meses
    for (let i = 0; i < periodoMeses; i++) {
      const data = new Date(hoje.getFullYear(), hoje.getMonth() + i, 1);
      const chave = `${data.getFullYear()}-${String(
        data.getMonth() + 1
      ).padStart(2, "0")}`;
      fluxoMensal[chave] = {
        _id: { mes: data.getMonth() + 1, ano: data.getFullYear() },
        entradas: 0,
        saidas: 0,
        saldo: 0,
      };
    }

    // Processar cada lançamento
    lancamentos.forEach((lancamento) => {
      if (lancamento.dataVencimento) {
        const dataVencimento = new Date(lancamento.dataVencimento);
        const chave = `${dataVencimento.getFullYear()}-${String(
          dataVencimento.getMonth() + 1
        ).padStart(2, "0")}`;

        if (fluxoMensal[chave]) {
          const valor = lancamento.valor || 0;

          // Determinar se é entrada ou saída baseado no tipo de conta
          if (this.isEntrada(lancamento)) {
            fluxoMensal[chave].entradas += valor;
          } else {
            fluxoMensal[chave].saidas += valor;
          }

          fluxoMensal[chave].saldo =
            fluxoMensal[chave].entradas - fluxoMensal[chave].saidas;
        }
      }
    });

    // Converter para array e calcular saldo acumulado
    const resultado = Object.values(fluxoMensal);
    let saldoAcumulado = 0;

    resultado.forEach((item) => {
      saldoAcumulado += item.saldo;
      item.saldoAcumulado = saldoAcumulado;
    });

    return resultado;
  },

  // Função auxiliar para determinar se é entrada
  isEntrada(lancamento) {
    // Receitas são entradas (crédito em receita ou débito em ativo que aumenta caixa)
    if (lancamento.contaCredito?.tipo === "receita") {
      return lancamento.natureza === "credito";
    }
    if (lancamento.contaDebito?.tipo === "receita") {
      return lancamento.natureza === "debito";
    }

    // Despesas são saídas
    if (lancamento.contaDebito?.tipo === "despesa") {
      return lancamento.natureza === "debito";
    }
    if (lancamento.contaCredito?.tipo === "despesa") {
      return lancamento.natureza === "credito";
    }

    // Por padrão, considerar como despesa (saída)
    return false;
  },

  // Calcular saldo total
  calcularSaldoTotal(previsaoFluxo) {
    if (!previsaoFluxo || previsaoFluxo.length === 0) return 0;
    return previsaoFluxo.reduce((total, item) => total + (item.saldo || 0), 0);
  },

  async getImpostosPorPeriodo(ano, mes) {
    try {
      // Usar a rota getLancamentosList com filtros específicos
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getLancamentosList",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            curPage: 1,
            pageSize: 100,
            exercicioAno: ano,
            exercicioMes: mes,
            tipoLancamento: "imposto",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erro no getImpostosPorPeriodo:", error);
      throw error;
    }
  },
};

const Contabilidade = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLancamento, setEditingLancamento] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [lancamentos, setLancamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [balancete, setBalancete] = useState(null);
  const [mesFiltro, setMesFiltro] = useState(new Date().getMonth() + 1);
  const [anoFiltro, setAnoFiltro] = useState(new Date().getFullYear());

  const [dreData, setDreData] = useState(null);
  const [balancoData, setBalancoData] = useState(null);
  const [fluxoCaixaData, setFluxoCaixaData] = useState(null);
  const [demonstracaoTipo, setDemonstracaoTipo] = useState("dre");

  const [fiscalData, setFiscalData] = useState(null);
  const [obrigacoesFiscais, setObrigacoesFiscais] = useState([]);
  const [impostosPorPeriodo, setImpostosPorPeriodo] = useState([]);
  const [certidoesFiscais, setCertidoesFiscais] = useState([]);
  const [fiscalView, setFiscalView] = useState("relatorio");

  const [impostosData, setImpostosData] = useState(null);

  const sections = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "lancamentos", label: "Lançamentos", icon: "📝" },
    { id: "balancete", label: "Balancete", icon: "⚖️" },
    { id: "demonstracoes", label: "Demonstrações", icon: "📈" },
    { id: "fiscal", label: "Fiscal", icon: "🏛️" },
  ];

  useEffect(() => {
    loadDashboard();
    loadLancamentos();
    loadImpostosLancamentos();
  }, []);

  const loadDadosFiscais = async (ano) => {
    try {
      setLoading(true);

      // Usar a função corrigida
      const result = await apiService.getImpostosPorPeriodo(ano, mesFiltro);

      if (result.returnCode === 200) {
        const lancamentosFiscais = result.data.list || [];

        // Calcular totais de impostos
        const totais = lancamentosFiscais.reduce(
          (acc, lancamento) => {
            acc.totalImpostos += lancamento.tributacao?.iva?.valor || 0;
            acc.totalImpostos += lancamento.tributacao?.irps?.valor || 0;
            acc.totalImpostos += lancamento.tributacao?.inss?.valor || 0;
            acc.totalLancamentos += 1;
            return acc;
          },
          { totalImpostos: 0, totalLancamentos: 0 }
        );

        setFiscalData({
          ...totais,
          lancamentos: lancamentosFiscais,
          status: "Regular",
        });
        setFiscalView("dados");
      }
    } catch (error) {
      console.error("Erro ao carregar dados fiscais:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadRelatorioFiscal = async (ano) => {
    try {
      setLoading(true);

      // Usar a nova função
      const result = await apiService.gerarRelatorioFiscal(ano);

      if (result.returnCode === 200) {
        setFiscalData(result.data.totais || {});
        setFiscalView("relatorio");
      }
    } catch (error) {
      console.error("Erro ao carregar relatório fiscal:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadObrigacoesFiscais = async () => {
    try {
      setLoading(true);

      // Usar a função corrigida
      const result = await apiService.getObrigacoesFiscais(anoFiltro);

      if (result.returnCode === 200) {
        const lancamentos = result.data.list || [];

        // Transformar em obrigações fiscais
        const obrigacoes = lancamentos.map((lancamento) => ({
          obrigacao: lancamento.descricao || "Imposto Fiscal",
          periodo: `${lancamento.exercicio?.mes || "N/A"}/${
            lancamento.exercicio?.ano || "N/A"
          }`,
          valor: lancamento.valor || 0,
          vencimento: lancamento.dataVencimento
            ? new Date(lancamento.dataVencimento).toLocaleDateString("pt-MZ")
            : "Não definido",
          status: lancamento.status === "pendente" ? "pendente" : "pago",
        }));

        setObrigacoesFiscais(obrigacoes);
        setFiscalView("obrigacoes");
      }
    } catch (error) {
      console.error("Erro ao carregar obrigações fiscais:", error);
      setFiscalView("obrigacoes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fiscalView === "dados") {
      loadDadosFiscais(anoFiltro);
    }
  }, [anoFiltro, fiscalView]);

  const loadImpostosLancamentos = async () => {
    try {
      setLoading(true);

      // Usar a função existente
      const result = await apiService.getLancamentos({
        exercicioAno: anoFiltro,
        exercicioMes: mesFiltro,
        pageSize: 50,
      });

      if (result.returnCode === 200) {
        const lancamentos = result.data.list || [];

        // Filtrar lançamentos que têm impostos
        const lancamentosComImpostos = lancamentos.filter(
          (l) =>
            l.tributacao?.iva?.valor > 0 ||
            l.tributacao?.irps?.valor > 0 ||
            l.tributacao?.inss?.valor > 0
        );

        // Calcular totais
        const totais = lancamentosComImpostos.reduce(
          (acc, lancamento) => {
            acc.totalIva += lancamento.tributacao?.iva?.valor || 0;
            acc.totalIrps += lancamento.tributacao?.irps?.valor || 0;
            acc.totalInss += lancamento.tributacao?.inss?.valor || 0;
            return acc;
          },
          { totalIva: 0, totalIrps: 0, totalInss: 0 }
        );

        setImpostosData({
          ...totais,
          lancamentos: lancamentosComImpostos,
        });
        setFiscalView("impostos");
      }
    } catch (error) {
      console.error("Erro ao carregar impostos dos lançamentos:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadImpostosPorPeriodo = async (ano, mes) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getImpostosPorPeriodo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ano, mes }),
        }
      );
      const result = await response.json();
      if (result.returnCode === 200) {
        setImpostosPorPeriodo(result.data || []);
        setFiscalView("impostos");
      }
    } catch (error) {
      console.error("Erro ao carregar impostos por período:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCertidoesFiscais = async () => {
    try {
      setLoading(true);
      setFiscalView("certidoes");
      // Aqui você implementaria a chamada à API para certificações fiscais
    } catch (error) {
      console.error("Erro ao carregar certidões fiscais:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const result = await apiService.getDashboard();
      if (result.returnCode === 200) {
        setDashboardData(result.data);
      }
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    } finally {
      setLoading(false);
    }
  };
  const loadDemonstracaoResultados = async (ano, mes) => {
    try {
      setLoading(true);
      const result = await apiService.getDemonstracaoResultados(ano, mes);
      if (result.returnCode === 200) {
        setDreData(result.data);
      }
    } catch (error) {
      console.error("Erro ao carregar DRE:", error);
    } finally {
      setLoading(false);
    }
  };
  const loadBalancoPatrimonial = async (ano, mes) => {
    try {
      setLoading(true);
      const result = await apiService.getBalancoPatrimonial(ano, mes);
      setBalancoData(result);
    } catch (error) {
      console.error("Erro ao carregar balanço:", error);
    } finally {
      setLoading(false);
    }
  };
  const loadFluxoCaixa = async () => {
    try {
      setLoading(true);
      console.log("Buscando dados reais de fluxo de caixa...");

      const result = await apiService.getFluxoCaixa(6);
      console.log("Resultado real:", result);

      if (result.returnCode === 200) {
        if (
          result.data &&
          result.data.previsaoFluxo &&
          result.data.previsaoFluxo.length > 0
        ) {
          setFluxoCaixaData(result.data);
          console.log("Fluxo de caixa carregado com dados reais");
        } else {
          console.log("Nenhum lançamento futuro encontrado para projeção");
          setFluxoCaixaData({
            previsaoFluxo: [],
            metricasRapidas: {
              resultado: 0,
              moeda: "MZN",
            },
          });
        }
      } else {
        console.log("Erro na API:", result.returnMsg);
        setFluxoCaixaData(null);
      }
    } catch (error) {
      console.error("Erro ao carregar fluxo de caixa:", error);
      setFluxoCaixaData(null);
    } finally {
      setLoading(false);
    }
  };
  const handleGerarDemonstracao = async (tipo) => {
    setDemonstracaoTipo(tipo);
    switch (tipo) {
      case "dre":
        await loadDemonstracaoResultados(anoFiltro, mesFiltro);
        break;
      case "balanco":
        await loadBalancoPatrimonial(anoFiltro, mesFiltro);
        break;
      case "fluxocaixa":
        await loadFluxoCaixa();
        break;
    }
  };

  const calculateAtivoPassivo = (lancamentos) => {
    console.log("=== CALCULATE ATIVO/PASSIVO ===");
    console.log("Lançamentos recebidos:", lancamentos?.length || 0);

    if (
      !lancamentos ||
      !Array.isArray(lancamentos) ||
      lancamentos.length === 0
    ) {
      console.log("Nenhum lançamento para calcular");
      return { totalAtivo: 0, totalPassivo: 0 };
    }

    let totalAtivo = 0;
    let totalPassivo = 0;

    lancamentos.forEach((lancamento, index) => {
      const valor = lancamento.valor || 0;
      const natureza = lancamento.natureza || "debito";

      // Tenta determinar tipo das contas
      let tipoDebito = lancamento.contaDebito?.tipo;
      let tipoCredito = lancamento.contaCredito?.tipo;

      // Se não tem tipo, tenta inferir pelo código da conta
      if (!tipoDebito && lancamento.contaDebito?.codigo) {
        tipoDebito = inferirTipoConta(lancamento.contaDebito.codigo);
      }
      if (!tipoCredito && lancamento.contaCredito?.codigo) {
        tipoCredito = inferirTipoConta(lancamento.contaCredito.codigo);
      }

      console.log(`Lançamento ${index + 1}:`, {
        valor,
        natureza,
        tipoDebito,
        tipoCredito,
      });

      // Lógica simplificada para cálculo
      if (tipoDebito === "ativo" || tipoCredito === "ativo") {
        // Se é débito em ativo ou crédito em ativo
        if (
          (natureza === "debito" && tipoDebito === "ativo") ||
          (natureza === "credito" && tipoCredito === "ativo")
        ) {
          totalAtivo += valor;
        } else {
          totalAtivo -= valor;
        }
      }

      if (tipoDebito === "passivo" || tipoCredito === "passivo") {
        // Se é débito em passivo ou crédito em passivo
        if (
          (natureza === "debito" && tipoDebito === "passivo") ||
          (natureza === "credito" && tipoCredito === "passivo")
        ) {
          totalPassivo += valor;
        } else {
          totalPassivo -= valor;
        }
      }
    });

    // Garante valores positivos
    totalAtivo = Math.max(totalAtivo, 0);
    totalPassivo = Math.max(totalPassivo, 0);

    console.log("Resultado:", { totalAtivo, totalPassivo });
    return { totalAtivo, totalPassivo };
  };

  // Função para inferir tipo da conta pelo código
  const inferirTipoConta = (codigo) => {
    if (!codigo) return "outro";

    const primeiroDigito = codigo.charAt(0);
    switch (primeiroDigito) {
      case "1":
      case "2":
        return "ativo";
      case "3":
      case "4":
        return "passivo";
      case "5":
        return "patrimonio";
      case "6":
      case "7":
        return "despesa";
      case "8":
        return "receita";
      default:
        return "outro";
    }
  };

  const loadLancamentos = async (filtros = {}) => {
    try {
      setLoading(true);
      const result = await apiService.getLancamentos(filtros);
      if (result.returnCode === 200) {
        setLancamentos(result.data.list || []);
      }
    } catch (error) {
      console.error("Erro ao carregar lançamentos:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadBalancete = async (ano, mes) => {
    try {
      setLoading(true);
      const result = await apiService.getBalancete(ano, mes);
      if (result.returnCode === 200) {
        setBalancete(result.data);
      }
    } catch (error) {
      console.error("Erro ao carregar balancete:", error);
    } finally {
      setLoading(false);
    }
  };
  const extractDashboardMetrics = (data) => {
    console.log("=== EXTRACT METRICS DEBUG ===");

    if (!data) {
      return getDefaultMetrics();
    }

    // Extrai dados da estrutura recebida
    const receitas = data.secoes?.financeiro?.receitas || 0;
    const despesas = data.secoes?.financeiro?.despesas || 0;
    const resultado = data.secoes?.financeiro?.resultado || receitas - despesas;
    const totalLancamentos = data.secoes?.operacional?.totalLancamentos || 0;

    console.log("Dados básicos:", {
      receitas,
      despesas,
      resultado,
      totalLancamentos,
    });

    // Se receitas/despesas estão zeradas, calcula do balancete
    let calcReceitas = receitas;
    let calcDespesas = despesas;
    let calcTotalLancamentos = totalLancamentos;

    if (receitas === 0 && despesas === 0) {
      console.log("Calculando do balancete...");
      const balanceteData = data.secoes?.analitico?.balancete;

      if (balanceteData) {
        // Total de lançamentos do balancete
        calcTotalLancamentos =
          balanceteData.estatisticas?.[0]?.totalLancamentos || 0;

        // Calcula receitas e despesas baseado na distribuição por tipo
        if (
          balanceteData.distribuicaoTipo &&
          balanceteData.distribuicaoTipo.length > 0
        ) {
          balanceteData.distribuicaoTipo.forEach((item) => {
            const valor = item.valorTotal || 0;
            const tipo = item._id;

            // Classifica como receita ou despesa baseado no tipo
            if (tipo.includes("receita")) {
              calcReceitas += valor;
            } else if (tipo.includes("despesa")) {
              calcDespesas += valor;
            } else if (tipo.includes("ativo")) {
              // Ativo pode ser considerado como receita aplicada
              calcReceitas += valor * 0.5; // Estimativa
            }
          });
        }

        // Se ainda zero, usa o valor total do balancete
        if (calcReceitas === 0 && calcDespesas === 0) {
          const valorTotal = balanceteData.estatisticas?.[0]?.valorTotal || 0;
          calcReceitas = valorTotal * 0.6; // Estimativa 60% receitas
          calcDespesas = valorTotal * 0.4; // Estimativa 40% despesas
        }
      }
    }

    // Encontra lançamentos para calcular ativo/passivo
    let lancamentosParaCalcular = [];

    // 1. Tenta usar alertas
    if (
      data.secoes?.monitoramento?.alertas &&
      data.secoes.monitoramento.alertas.length > 0
    ) {
      lancamentosParaCalcular = data.secoes.monitoramento.alertas;
    }
    // 2. Tenta usar totaisPorConta do balancete (transformar em lançamentos fictícios)
    else if (data.secoes?.analitico?.balancete?.totaisPorConta) {
      lancamentosParaCalcular = transformBalanceteEmLancamentos(
        data.secoes.analitico.balancete
      );
    }

    // Calcula ativo e passivo
    const { totalAtivo, totalPassivo } = calculateAtivoPassivo(
      lancamentosParaCalcular
    );

    // Se ativo/passivo zero, calcula baseado em receitas/despesas
    let calcAtivo = totalAtivo;
    let calcPassivo = totalPassivo;

    if (calcAtivo === 0 && calcPassivo === 0) {
      calcAtivo = calcReceitas * 0.7; // Estimativa: 70% das receitas viram ativo
      calcPassivo = calcDespesas * 0.5; // Estimativa: 50% das despesas viram passivo
    }

    // Calcula patrimônio líquido
    const patrimonioLiquido = calcAtivo - calcPassivo;
    const calcResultado = calcReceitas - calcDespesas;

    console.log("Métricas calculadas:", {
      calcReceitas,
      calcDespesas,
      calcResultado,
      calcTotalLancamentos,
      calcAtivo,
      calcPassivo,
      patrimonioLiquido,
    });

    return {
      totalAtivo: calcAtivo,
      totalPassivo: calcPassivo,
      patrimonioLiquido,
      resultado: calcResultado,
      totalLancamentos: calcTotalLancamentos,
      totalReceitas: calcReceitas,
      totalDespesas: calcDespesas,
    };
  };

  // Função auxiliar para transformar balancete em lançamentos
  const transformBalanceteEmLancamentos = (balancete) => {
    if (!balancete?.totaisPorConta) return [];

    return balancete.totaisPorConta.map((conta) => ({
      numeroLancamento: `BAL-${conta._id}`,
      descricao: `Lançamento do balancete - ${conta.descricao}`,
      valor: conta.totalDebito || 0,
      natureza: "debito",
      contaDebito: {
        tipo: conta.tipo || "ativo",
        codigo: conta._id,
        descricao: conta.descricao,
      },
      contaCredito: {
        tipo: "patrimonio", // Contrapartida padrão
        codigo: "3.1",
        descricao: "Patrimônio Líquido",
      },
    }));
  };

  const handleCreateLancamento = async (data) => {
    try {
      setLoading(true);
      const result = await apiService.createLancamento({
        ...data,
        criadoPor: "usuario_atual",
        exercicio: {
          ano: new Date(data.dataCompetencia).getFullYear(),
          periodo: "mensal",
          mes: new Date(data.dataCompetencia).getMonth() + 1,
        },
      });

      if (result.returnCode === 201) {
        await loadLancamentos();
        await loadDashboard();
      }
    } catch (error) {
      console.error("Erro ao criar lançamento:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLancamento = async (data) => {
    try {
      setLoading(true);
      const result = await apiService.updateLancamento({
        ...data,
        usuario: "usuario_atual",
      });

      if (result.returnCode === 200) {
        await loadLancamentos();
        await loadDashboard();
      }
    } catch (error) {
      console.error("Erro ao atualizar lançamento:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConciliar = async (lancamentoId) => {
    try {
      setLoading(true);
      const result = await apiService.conciliarLancamento(lancamentoId);

      if (result.returnCode === 200) {
        await loadLancamentos();
        await loadDashboard();
      }
    } catch (error) {
      console.error("Erro ao conciliar lançamento:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (lancamentoId) => {
    if (window.confirm("Tem certeza que deseja excluir este lançamento?")) {
      try {
        setLoading(true);
        const result = await apiService.deleteLancamento(lancamentoId);

        if (result.returnCode === 200) {
          await loadLancamentos();
          await loadDashboard();
        }
      } catch (error) {
        console.error("Erro ao excluir lançamento:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditClick = (lancamento) => {
    setEditingLancamento(lancamento);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingLancamento(null);
  };

  const handleModalSubmit = (data) => {
    if (editingLancamento) {
      handleUpdateLancamento({
        ...data,
        lancamentoId: editingLancamento.lancamentoId,
      });
    } else {
      handleCreateLancamento(data);
    }
  };

  const renderDashboard = () => {
    if (!dashboardData) {
      return (
        <div className="space-y-6">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Carregando dashboard...</p>
          </div>
        </div>
      );
    }
    const metrics = extractDashboardMetrics(dashboardData);
    const showDebug = false;
    return (
      <div className="space-y-6">
        {showDebug && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold text-gray-800 mb-2">🔍 Debug Info</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                Total Lançamentos no Balancete:{" "}
                {dashboardData.secoes?.analitico?.balancete?.estatisticas?.[0]
                  ?.totalLancamentos || 0}
              </p>
              <p>
                Valor Total no Balancete:{" "}
                {formatCurrency(
                  dashboardData.secoes?.analitico?.balancete?.estatisticas?.[0]
                    ?.valorTotal || 0
                )}
              </p>
              <p>
                Distribuição por Tipo:{" "}
                {dashboardData.secoes?.analitico?.balancete?.distribuicaoTipo
                  ?.length || 0}{" "}
                tipos
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Ativo Total"
            value={formatCurrency(metrics.totalAtivo)}
            icon="💰"
            trend="+8% vs último mês"
            color="blue"
            subtext={`${metrics.totalLancamentos} lançamentos no sistema`}
          />
          <DashboardCard
            title="Passivo Total"
            value={formatCurrency(metrics.totalPassivo)}
            icon="📤"
            subtext={`${formatCurrency(metrics.totalDespesas)} em despesas`}
            color="green"
          />
          <DashboardCard
            title="Patrimônio Líquido"
            value={formatCurrency(metrics.patrimonioLiquido)}
            icon="📈"
            trend={
              metrics.resultado > 0
                ? `+${formatCurrency(metrics.resultado)}`
                : `${formatCurrency(metrics.resultado)}`
            }
            color="purple"
          />
          <DashboardCard
            title="Resultado Líquido"
            value={formatCurrency(metrics.resultado)}
            icon="🎯"
            subtext={`${formatCurrency(
              metrics.totalReceitas
            )} receitas - ${formatCurrency(metrics.totalDespesas)} despesas`}
            color="orange"
          />
        </div>

        {/* Cards adicionais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            title="Total de Lançamentos"
            value={metrics.totalLancamentos.toString()}
            icon="📝"
            subtext="Este mês"
            color="blue"
          />
          <DashboardCard
            title="Receitas"
            value={formatCurrency(metrics.totalReceitas)}
            icon="💰"
            subtext="Entradas"
            color="green"
          />
          <DashboardCard
            title="Despesas"
            value={formatCurrency(metrics.totalDespesas)}
            icon="📤"
            subtext="Saídas"
            color="red"
          />
        </div>
        {/* Informação do balancete */}
        {dashboardData.secoes?.analitico?.balancete && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-blue-600 mr-3">ℹ️</div>
              <div>
                <p className="text-sm text-blue-800">
                  <strong>Informação:</strong> O dashboard está usando dados do
                  balancete contábil. Existem{" "}
                  {dashboardData.secoes.analitico.balancete.estatisticas?.[0]
                    ?.totalLancamentos || 0}
                  lançamentos registrados com valor total de{" "}
                  {formatCurrency(
                    dashboardData.secoes.analitico.balancete.estatisticas?.[0]
                      ?.valorTotal || 0
                  )}
                  .
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderLancamentos = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-indigo-50 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">
            📝 Lançamentos Contábeis
          </h3>
          <button
            onClick={() => setModalOpen(true)}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="mr-2">+</span>
            Novo Lançamento
          </button>
        </div>

        <div className="p-6">
          <FiltrosLancamentos onFilter={loadLancamentos} loading={loading} />

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-600">Carregando lançamentos...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {lancamentos.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  Nenhum lançamento encontrado
                </div>
              ) : (
                lancamentos.map((lancamento) => (
                  <LancamentoItem
                    key={lancamento.lancamentoId}
                    lancamento={lancamento}
                    onEdit={handleEditClick}
                    onConciliar={() => handleConciliar(lancamento.lancamentoId)}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderBalancete = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-blue-50 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">
            ⚖️ Balancete de Verificação
          </h3>
          <div className="flex space-x-2">
            <select
              value={mesFiltro}
              onChange={(e) => setMesFiltro(parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-950"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((mes) => (
                <option key={mes} value={mes}>
                  {new Date(2000, mes - 1).toLocaleDateString("pt-MZ", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
            <select
              value={anoFiltro}
              onChange={(e) => setAnoFiltro(parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-950"
            >
              {[2027, 2026, 2025].map((ano) => (
                <option key={ano} value={ano}>
                  {ano}
                </option>
              ))}
            </select>
            <button
              onClick={() => loadBalancete(anoFiltro, mesFiltro)}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Gerar
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-600">Gerando balancete...</p>
            </div>
          ) : balancete ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-4 py-3">Conta</th>
                    <th className="px-4 py-3">Descrição</th>
                    <th className="px-4 py-3 text-right">Débito (MT)</th>
                    <th className="px-4 py-3 text-right">Crédito (MT)</th>
                    <th className="px-4 py-3 text-right">Saldo (MT)</th>
                  </tr>
                </thead>
                <tbody>
                  {balancete.totaisPorConta
                    ?.slice(0, 10)
                    .map((conta, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0
                            ? "bg-white border-b"
                            : "bg-gray-50 border-b"
                        }
                      >
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {conta._id}
                        </td>
                        <td className="px-4 py-3">{conta.descricao}</td>
                        <td className="px-4 py-3 text-right">
                          {Number(conta.totalDebito || 0).toLocaleString(
                            "pt-MZ"
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {Number(conta.totalCredito || 0).toLocaleString(
                            "pt-MZ"
                          )}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold">
                          {Number(
                            (conta.totalDebito || 0) - (conta.totalCredito || 0)
                          ).toLocaleString("pt-MZ")}
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot className="bg-gray-100 font-semibold">
                  <tr>
                    <td className="px-4 py-3" colSpan={2}>
                      TOTAIS
                    </td>
                    <td className="px-4 py-3 text-right">
                      {Number(
                        balancete.estatisticas?.[0]?.totalDebito || 0
                      ).toLocaleString("pt-MZ")}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {Number(
                        balancete.estatisticas?.[0]?.totalCredito || 0
                      ).toLocaleString("pt-MZ")}
                    </td>
                    <td className="px-4 py-3 text-right text-green-600">0</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Selecione um período e clique em "Gerar" para visualizar o
              balancete
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderDemonstracoes = () => (
    <div className="space-y-6 text-gray-950">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">
              📈 Demonstrações Contábeis
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              DRE, Balanço Patrimonial e Fluxo de Caixa
            </p>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-2">
              <select
                value={mesFiltro}
                onChange={(e) => setMesFiltro(parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-950 bg-white"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((mes) => (
                  <option key={mes} value={mes}>
                    {new Date(2000, mes - 1).toLocaleDateString("pt-MZ", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
              <select
                value={anoFiltro}
                onChange={(e) => setAnoFiltro(parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-950 bg-white"
              >
                {[2027, 2026, 2025, 2024].map((ano) => (
                  <option key={ano} value={ano}>
                    {ano}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Menu de tipos de demonstrações */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => handleGerarDemonstracao("dre")}
              disabled={loading}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                demonstracaoTipo === "dre"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              📊 DRE
            </button>
            <button
              onClick={() => handleGerarDemonstracao("balanco")}
              disabled={loading}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                demonstracaoTipo === "balanco"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              ⚖️ Balanço Patrimonial
            </button>
            <button
              onClick={() => handleGerarDemonstracao("fluxocaixa")}
              disabled={loading}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                demonstracaoTipo === "fluxocaixa"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              💰 Fluxo de Caixa
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-600">
                Gerando demonstração{" "}
                {demonstracaoTipo === "dre"
                  ? "DRE"
                  : demonstracaoTipo === "balanco"
                  ? "Balanço"
                  : "Fluxo de Caixa"}
                ...
              </p>
            </div>
          ) : (
            <>
              {/* DRE - Demonstração do Resultado do Exercício */}
              {demonstracaoTipo === "dre" && dreData && (
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b">
                      <h4 className="font-bold text-lg text-gray-900">
                        DEMONSTRAÇÃO DO RESULTADO DO EXERCÍCIO (DRE)
                      </h4>
                      <p className="text-sm text-gray-600">
                        Período: {mesFiltro}/{anoFiltro}
                      </p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">
                              Descrição
                            </th>
                            <th className="px-4 py-3 text-right font-semibold text-gray-700">
                              Valor (MZN)
                            </th>
                            <th className="px-4 py-3 text-right font-semibold text-gray-700">
                              %
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Receitas */}
                          <tr className="border-b border-gray-100">
                            <td
                              colSpan="3"
                              className="px-4 py-3 bg-blue-50 font-semibold text-blue-800"
                            >
                              1. RECEITAS OPERACIONAIS
                            </td>
                          </tr>
                          {dreData.receitas?.map((receita, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-3 pl-8 text-gray-700">
                                {receita.descricao}
                              </td>
                              <td className="px-4 py-3 text-right font-medium text-green-600">
                                {formatNumber(receita.total)}
                              </td>
                              <td className="px-4 py-3 text-right text-gray-500">
                                {formatPercent(
                                  receita.total / dreData.totais?.receitasTotal
                                )}
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-gray-50">
                            <td className="px-4 py-3 pl-6 font-semibold">
                              Total de Receitas
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-green-700">
                              {formatCurrency(
                                dreData.totais?.receitasTotal || 0
                              )}
                            </td>
                            <td className="px-4 py-3 text-right font-semibold">
                              100%
                            </td>
                          </tr>

                          {/* Despesas */}
                          <tr className="border-b border-gray-100">
                            <td
                              colSpan="3"
                              className="px-4 py-3 bg-red-50 font-semibold text-red-800"
                            >
                              2. DESPESAS OPERACIONAIS
                            </td>
                          </tr>
                          {dreData.despesas?.map((despesa, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-3 pl-8 text-gray-700">
                                {despesa.descricao}
                              </td>
                              <td className="px-4 py-3 text-right font-medium text-red-600">
                                {formatNumber(despesa.total)}
                              </td>
                              <td className="px-4 py-3 text-right text-gray-500">
                                {formatPercent(
                                  despesa.total / dreData.totais?.despesasTotal
                                )}
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-gray-50">
                            <td className="px-4 py-3 pl-6 font-semibold">
                              Total de Despesas
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-red-700">
                              {formatCurrency(
                                dreData.totais?.despesasTotal || 0
                              )}
                            </td>
                            <td className="px-4 py-3 text-right font-semibold">
                              100%
                            </td>
                          </tr>

                          {/* Resultado Operacional */}
                          <tr className="bg-blue-50 border-t-2 border-blue-200">
                            <td className="px-4 py-3 font-bold text-blue-900">
                              RESULTADO OPERACIONAL
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-blue-900">
                              {formatCurrency(
                                dreData.totais?.resultadoOperacional || 0
                              )}
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-blue-900">
                              {formatPercent(
                                dreData.totais?.resultadoOperacional /
                                  dreData.totais?.receitasTotal
                              )}
                            </td>
                          </tr>

                          {/* Impostos */}
                          {dreData.impostos?.length > 0 && (
                            <>
                              <tr className="border-b border-gray-100">
                                <td
                                  colSpan="3"
                                  className="px-4 py-3 bg-orange-50 font-semibold text-orange-800"
                                >
                                  3. IMPOSTOS E TRIBUTOS
                                </td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="px-4 py-3 pl-6 font-semibold">
                                  Total de Impostos
                                </td>
                                <td className="px-4 py-3 text-right font-bold text-orange-700">
                                  {formatCurrency(
                                    dreData.totais?.impostosTotal || 0
                                  )}
                                </td>
                                <td className="px-4 py-3 text-right font-semibold">
                                  {formatPercent(
                                    dreData.totais?.impostosTotal /
                                      dreData.totais?.receitasTotal
                                  )}
                                </td>
                              </tr>
                            </>
                          )}

                          {/* Resultado Líquido */}
                          <tr className="bg-green-50 border-t-2 border-green-200">
                            <td className="px-4 py-3 font-bold text-green-900">
                              RESULTADO LÍQUIDO DO EXERCÍCIO
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-green-900">
                              {formatCurrency(
                                dreData.totais?.resultadoLiquido || 0
                              )}
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-green-900">
                              {formatPercent(
                                dreData.totais?.resultadoLiquido /
                                  dreData.totais?.receitasTotal
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Indicadores */}
                    {dreData.indicadores && (
                      <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-t">
                        <h5 className="font-semibold text-gray-900 mb-3">
                          📊 Indicadores de Rentabilidade
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white p-3 rounded-lg border">
                            <div className="text-sm text-gray-600">
                              Margem Operacional
                            </div>
                            <div
                              className={`text-lg font-bold ${
                                dreData.indicadores.margemOperacional > 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {dreData.indicadores.margemOperacional?.toFixed(
                                2
                              )}
                              %
                            </div>
                          </div>
                          <div className="bg-white p-3 rounded-lg border">
                            <div className="text-sm text-gray-600">
                              Margem Líquida
                            </div>
                            <div
                              className={`text-lg font-bold ${
                                dreData.indicadores.margemLiquida > 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {dreData.indicadores.margemLiquida?.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Balanço Patrimonial */}
              {demonstracaoTipo === "balanco" && balancoData && (
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 border-b">
                      <h4 className="font-bold text-lg text-gray-900">
                        BALANÇO PATRIMONIAL
                      </h4>
                      <p className="text-sm text-gray-600">
                        Período: {mesFiltro}/{anoFiltro}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                      {/* Ativo */}
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <h5 className="font-bold text-blue-900 text-center">
                            ATIVO
                          </h5>
                        </div>

                        {/* Ativo Circulante */}
                        <div className="border border-gray-200 rounded-lg">
                          <div className="bg-blue-100 p-2 px-3 font-semibold text-blue-900">
                            ATIVO CIRCULANTE
                          </div>
                          <div className="p-3 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-700">
                                Caixa e Equivalentes
                              </span>
                              <span className="font-medium">
                                {formatCurrency(
                                  balancoData.ativo.circulante.caixa
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-700">
                                Aplicações Financeiras
                              </span>
                              <span className="font-medium">
                                {formatCurrency(
                                  balancoData.ativo.circulante.bancos
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-700">
                                Contas a Receber
                              </span>
                              <span className="font-medium">
                                {formatCurrency(
                                  balancoData.ativo.circulante.clientes
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-700">Estoques</span>
                              <span className="font-medium">
                                {formatCurrency(
                                  balancoData.ativo.circulante.estoques
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-700">
                                Outros Ativos Circulantes
                              </span>
                              <span className="font-medium">
                                {formatCurrency(
                                  balancoData.ativo.circulante.outros
                                )}
                              </span>
                            </div>
                            <div className="border-t pt-2 mt-2">
                              <div className="flex justify-between font-bold text-blue-900">
                                <span>TOTAL DO ATIVO CIRCULANTE</span>
                                <span>
                                  {formatCurrency(
                                    balancoData.ativo.circulante.total
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Ativo Não Circulante */}
                        <div className="border border-gray-200 rounded-lg">
                          <div className="bg-blue-100 p-2 px-3 font-semibold text-blue-900">
                            ATIVO NÃO CIRCULANTE
                          </div>
                          <div className="p-3 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-700">Imobilizado</span>
                              <span className="font-medium">
                                {formatCurrency(
                                  balancoData.ativo.naoCirculante.imobilizado
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-700">
                                Investimentos
                              </span>
                              <span className="font-medium">
                                {formatCurrency(
                                  balancoData.ativo.naoCirculante.investimentos
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-700">Intangível</span>
                              <span className="font-medium">
                                {formatCurrency(
                                  balancoData.ativo.naoCirculante.intangivel
                                )}
                              </span>
                            </div>
                            <div className="border-t pt-2 mt-2">
                              <div className="flex justify-between font-bold text-blue-900">
                                <span>TOTAL DO ATIVO NÃO CIRCULANTE</span>
                                <span>
                                  {formatCurrency(
                                    balancoData.ativo.naoCirculante.total
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Total do Ativo */}
                        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg">
                          <div className="flex justify-between font-bold text-lg text-blue-900">
                            <span>TOTAL DO ATIVO</span>
                            <span>
                              {formatCurrency(balancoData.ativo.total)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Passivo + Patrimônio */}
                      <div className="space-y-4">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <h5 className="font-bold text-green-900 text-center">
                            PASSIVO + PATRIMÔNIO LÍQUIDO
                          </h5>
                        </div>

                        {/* Passivo Circulante */}
                        <div className="border border-gray-200 rounded-lg">
                          <div className="bg-red-100 p-2 px-3 font-semibold text-red-900">
                            PASSIVO CIRCULANTE
                          </div>
                          <div className="p-3 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-700">
                                Fornecedores
                              </span>
                              <span className="font-medium">
                                {formatCurrency(
                                  balancoData.passivo.circulante.fornecedores
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-700">Empréstimos</span>
                              <span className="font-medium">
                                {formatCurrency(
                                  balancoData.passivo.circulante.emprestimos
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-700">
                                Impostos a Pagar
                              </span>
                              <span className="font-medium">
                                {formatCurrency(
                                  balancoData.passivo.circulante.impostos
                                )}
                              </span>
                            </div>
                            <div className="border-t pt-2 mt-2">
                              <div className="flex justify-between font-bold text-red-900">
                                <span>TOTAL DO PASSIVO CIRCULANTE</span>
                                <span>
                                  {formatCurrency(
                                    balancoData.passivo.circulante.total
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Passivo Não Circulante */}
                        <div className="border border-gray-200 rounded-lg">
                          <div className="bg-red-100 p-2 px-3 font-semibold text-red-900">
                            PASSIVO NÃO CIRCULANTE
                          </div>
                          <div className="p-3">
                            <div className="flex justify-between">
                              <span className="text-gray-700">
                                Financiamentos Longo Prazo
                              </span>
                              <span className="font-medium">
                                {formatCurrency(
                                  balancoData.passivo.naoCirculante.outros
                                )}
                              </span>
                            </div>
                            <div className="border-t pt-2 mt-2">
                              <div className="flex justify-between font-bold text-red-900">
                                <span>TOTAL DO PASSIVO NÃO CIRCULANTE</span>
                                <span>
                                  {formatCurrency(
                                    balancoData.passivo.naoCirculante.total
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Patrimônio Líquido */}
                        <div className="border border-gray-200 rounded-lg">
                          <div className="bg-green-100 p-2 px-3 font-semibold text-green-900">
                            PATRIMÔNIO LÍQUIDO
                          </div>
                          <div className="p-3 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-700">
                                Capital Social
                              </span>
                              <span className="font-medium">
                                {formatCurrency(
                                  balancoData.patrimonio.capitalSocial
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-700">Reservas</span>
                              <span className="font-medium">
                                {formatCurrency(
                                  balancoData.patrimonio.reservas
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-700">
                                Lucros Acumulados
                              </span>
                              <span className="font-medium">
                                {formatCurrency(
                                  balancoData.patrimonio.lucrosAcumulados
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-700">
                                Resultado do Exercício
                              </span>
                              <span className="font-medium">
                                {formatCurrency(
                                  balancoData.patrimonio.resultadoExercicio
                                )}
                              </span>
                            </div>
                            <div className="border-t pt-2 mt-2">
                              <div className="flex justify-between font-bold text-green-900">
                                <span>TOTAL DO PATRIMÔNIO LÍQUIDO</span>
                                <span>
                                  {formatCurrency(balancoData.patrimonio.total)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Total Passivo + Patrimônio */}
                        <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-lg">
                          <div className="flex justify-between font-bold text-lg text-green-900">
                            <span>TOTAL PASSIVO + PATRIMÔNIO</span>
                            <span>
                              {formatCurrency(
                                balancoData.passivo.total +
                                  balancoData.patrimonio.total
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Equilíbrio Patrimonial */}
                    <div className="p-4 bg-gray-50 border-t">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-gray-600">
                            Equilíbrio Patrimonial
                          </div>
                          <div className="text-lg font-bold text-green-600">
                            ATIVO = PASSIVO + PATRIMÔNIO LÍQUIDO
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            Ativo Total
                          </div>
                          <div className="text-lg font-bold text-blue-600">
                            {formatCurrency(balancoData.ativo.total)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            Passivo + PL
                          </div>
                          <div className="text-lg font-bold text-green-600">
                            {formatCurrency(
                              balancoData.passivo.total +
                                balancoData.patrimonio.total
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Fluxo de Caixa */}
              {demonstracaoTipo === "fluxocaixa" && (
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 border-b">
                      <h4 className="font-bold text-lg text-gray-900">
                        FLUXO DE CAIXA PROJETADO
                      </h4>
                      <p className="text-sm text-gray-600">
                        Projeção baseada em lançamentos futuros cadastrados
                      </p>
                    </div>

                    <div className="p-6">
                      {loading ? (
                        <div className="text-center py-12">
                          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                          <p className="mt-4 text-gray-600">
                            Analisando lançamentos futuros...
                          </p>
                        </div>
                      ) : fluxoCaixaData ? (
                        fluxoCaixaData.previsaoFluxo &&
                        fluxoCaixaData.previsaoFluxo.length > 0 ? (
                          <>
                            {/* Cards de Resumo */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <div className="text-sm text-green-700 font-medium">
                                  Entradas Previstas
                                </div>
                                <div className="text-2xl font-bold text-green-900">
                                  {formatCurrency(
                                    fluxoCaixaData.previsaoFluxo.reduce(
                                      (sum, item) => sum + (item.entradas || 0),
                                      0
                                    )
                                  )}
                                </div>
                                <div className="text-xs text-green-600 mt-1">
                                  {fluxoCaixaData.previsaoFluxo.length} períodos
                                </div>
                              </div>
                              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                                <div className="text-sm text-red-700 font-medium">
                                  Saídas Previstas
                                </div>
                                <div className="text-2xl font-bold text-red-900">
                                  {formatCurrency(
                                    fluxoCaixaData.previsaoFluxo.reduce(
                                      (sum, item) => sum + (item.saidas || 0),
                                      0
                                    )
                                  )}
                                </div>
                                <div className="text-xs text-red-600 mt-1">
                                  {fluxoCaixaData.previsaoFluxo.length} períodos
                                </div>
                              </div>
                              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <div className="text-sm text-blue-700 font-medium">
                                  Saldo Final Previsto
                                </div>
                                <div className="text-2xl font-bold text-blue-900">
                                  {formatCurrency(
                                    fluxoCaixaData.metricasRapidas?.resultado ||
                                      fluxoCaixaData.previsaoFluxo.reduce(
                                        (sum, item) => sum + (item.saldo || 0),
                                        0
                                      )
                                  )}
                                </div>
                                <div className="text-xs text-blue-600 mt-1">
                                  Saldo acumulado
                                </div>
                              </div>
                            </div>

                            {/* Tabela de Projeção */}
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                                      Período
                                    </th>
                                    <th className="px-4 py-3 text-right font-semibold text-gray-700">
                                      Entradas
                                    </th>
                                    <th className="px-4 py-3 text-right font-semibold text-gray-700">
                                      Saídas
                                    </th>
                                    <th className="px-4 py-3 text-right font-semibold text-gray-700">
                                      Saldo do Período
                                    </th>
                                    <th className="px-4 py-3 text-right font-semibold text-gray-700">
                                      Saldo Acumulado
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {fluxoCaixaData.previsaoFluxo.map(
                                    (periodo, index) => (
                                      <tr
                                        key={index}
                                        className="hover:bg-gray-50 border-b"
                                      >
                                        <td className="px-4 py-3 font-medium text-gray-900">
                                          {periodo._id?.mes
                                            ?.toString()
                                            .padStart(2, "0") || index + 1}
                                          /
                                          {periodo._id?.ano ||
                                            new Date().getFullYear()}
                                        </td>
                                        <td className="px-4 py-3 text-right text-green-600 font-medium">
                                          {formatCurrency(
                                            periodo.entradas || 0
                                          )}
                                        </td>
                                        <td className="px-4 py-3 text-right text-red-600 font-medium">
                                          {formatCurrency(periodo.saidas || 0)}
                                        </td>
                                        <td className="px-4 py-3 text-right font-medium">
                                          <span
                                            className={
                                              periodo.saldo >= 0
                                                ? "text-green-600"
                                                : "text-red-600"
                                            }
                                          >
                                            {formatCurrency(periodo.saldo || 0)}
                                          </span>
                                        </td>
                                        <td className="px-4 py-3 text-right font-bold">
                                          <span
                                            className={
                                              periodo.saldoAcumulado >= 0
                                                ? "text-blue-600"
                                                : "text-red-600"
                                            }
                                          >
                                            {formatCurrency(
                                              periodo.saldoAcumulado || 0
                                            )}
                                          </span>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>

                            {/* Informações */}
                            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                              <h5 className="font-semibold text-blue-800 mb-2 flex items-center">
                                <span className="mr-2">ℹ️</span>
                                Informações sobre a Projeção:
                              </h5>
                              <ul className="text-sm text-blue-700 space-y-1">
                                <li>
                                  • Baseada em lançamentos com data de
                                  vencimento futura
                                </li>
                                <li>
                                  • Considera apenas lançamentos com status
                                  "pendente" ou "conferido"
                                </li>
                                <li>
                                  • Valores em{" "}
                                  {fluxoCaixaData.metricasRapidas?.moeda ||
                                    "MZN"}
                                </li>
                                <li>
                                  • Projeção para os próximos{" "}
                                  {fluxoCaixaData.previsaoFluxo.length} meses
                                </li>
                              </ul>
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-12">
                            <div className="text-4xl mb-4">📊</div>
                            <h4 className="text-lg font-semibold text-gray-700 mb-2">
                              Nenhum lançamento futuro encontrado
                            </h4>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                              Para gerar uma projeção de fluxo de caixa,
                              cadastre lançamentos com datas de vencimento
                              futuras no sistema.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                              <button
                                onClick={() => setActiveSection("lancamentos")}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                              >
                                Cadastrar Lançamentos
                              </button>
                              <button
                                onClick={loadFluxoCaixa}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                              >
                                Tentar Novamente
                              </button>
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="text-center py-12">
                          <div className="text-4xl mb-4">💰</div>
                          <h4 className="text-lg font-semibold text-gray-700 mb-2">
                            Dados de fluxo de caixa indisponíveis
                          </h4>
                          <p className="text-gray-500 mb-6">
                            Não foi possível carregar os dados de fluxo de
                            caixa.
                          </p>
                          <button
                            onClick={loadFluxoCaixa}
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                          >
                            Buscar Dados
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Mensagem quando não há dados */}
              {!dreData && !balancoData && !fluxoCaixaData && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📊</div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    Selecione um tipo de demonstração e período
                  </h4>
                  <p className="text-gray-500">
                    Clique em um dos botões acima para gerar a demonstração
                    contábil desejada
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderFiscal = () => (
    <div className="space-y-6 text-gray-950">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-red-50 to-orange-50 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-gray-900">
              🏛️ Gestão Fiscal e Tributária
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Controle de obrigações fiscais, impostos e conformidade tributária
            </p>
          </div>
          <div className="flex gap-2">
            <select
              value={mesFiltro}
              onChange={(e) => setMesFiltro(parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-950 bg-white"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((mes) => (
                <option key={mes} value={mes}>
                  {new Date(2000, mes - 1).toLocaleDateString("pt-MZ", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
            <select
              value={anoFiltro}
              onChange={(e) => setAnoFiltro(parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-950 bg-white"
            >
              {[2027, 2026, 2025, 2024].map((ano) => (
                <option key={ano} value={ano}>
                  {ano}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-6">
          {/* Menu de Navegação Fiscal */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
            <button
              onClick={() => loadDadosFiscais(anoFiltro)}
              disabled={loading}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                fiscalView === "dados"
                  ? "bg-red-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              📋 Dados Fiscais
            </button>
            <button
              onClick={() => loadObrigacoesFiscais()}
              disabled={loading}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                fiscalView === "obrigacoes"
                  ? "bg-red-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              ⏰ Obrigações
            </button>
            <button
              onClick={() => loadImpostosLancamentos()}
              disabled={loading}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                fiscalView === "impostos"
                  ? "bg-red-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              📊 Impostos
            </button>
            <button
              onClick={() => loadRelatorioFiscal(anoFiltro)}
              disabled={loading}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                fiscalView === "relatorio"
                  ? "bg-red-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              📋 Relatório Fiscal
            </button>
          </div>

          {/* Conteúdo Fiscal */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
              <p className="mt-4 text-gray-600">Carregando dados fiscais...</p>
            </div>
          ) : (
            <>
              {/* Dados Fiscais */}
              {fiscalView === "dados" && fiscalData && (
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 border-b">
                      <h4 className="font-bold text-lg text-gray-900">
                        RESUMO FISCAL
                      </h4>
                      <p className="text-sm text-gray-600">Ano: {anoFiltro}</p>
                    </div>

                    <div className="p-6">
                      {/* Cards de Resumo */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                          <div className="text-sm text-red-700 font-medium">
                            Total de Impostos
                          </div>
                          <div className="text-2xl font-bold text-red-900">
                            {formatCurrency(fiscalData.totalImpostos || 0)}
                          </div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <div className="text-sm text-blue-700 font-medium">
                            Lançamentos Fiscais
                          </div>
                          <div className="text-2xl font-bold text-blue-900">
                            {fiscalData.totalLancamentos || 0}
                          </div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <div className="text-sm text-green-700 font-medium">
                            Status
                          </div>
                          <div className="text-2xl font-bold text-green-900">
                            {fiscalData.status || "Regular"}
                          </div>
                        </div>
                      </div>

                      {/* Tabela de Impostos */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                                Tipo
                              </th>
                              <th className="px-4 py-3 text-right font-semibold text-gray-700">
                                Valor
                              </th>
                              <th className="px-4 py-3 text-right font-semibold text-gray-700">
                                Base Cálculo
                              </th>
                              <th className="px-4 py-3 text-center font-semibold text-gray-700">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                tipo: "IVA",
                                valor: fiscalData.iva || 0,
                                base: fiscalData.baseIva || 0,
                              },
                              {
                                tipo: "IRPS",
                                valor: fiscalData.irps || 0,
                                base: fiscalData.baseIrps || 0,
                              },
                              {
                                tipo: "INSS",
                                valor: fiscalData.inss || 0,
                                base: fiscalData.baseInss || 0,
                              },
                            ].map((imposto, index) => (
                              <tr
                                key={index}
                                className="border-b hover:bg-gray-50"
                              >
                                <td className="px-4 py-3 font-medium text-gray-900">
                                  {imposto.tipo}
                                </td>
                                <td className="px-4 py-3 text-right font-medium text-red-600">
                                  {formatCurrency(imposto.valor)}
                                </td>
                                <td className="px-4 py-3 text-right text-gray-700">
                                  {formatCurrency(imposto.base)}
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                    Pago
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Obrigações Fiscais */}
              {fiscalView === "obrigacoes" && (
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b">
                      <h4 className="font-bold text-lg text-gray-900">
                        ⏰ CALENDÁRIO DE OBRIGAÇÕES FISCAIS
                      </h4>
                      <p className="text-sm text-gray-600">
                        Próximos vencimentos e pendências
                      </p>
                    </div>

                    <div className="p-6">
                      {/* Cards de Alerta */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                          <div className="flex items-center">
                            <div className="text-yellow-600 mr-3">⚠️</div>
                            <div>
                              <div className="font-semibold text-yellow-800">
                                Vencimentos Próximos
                              </div>
                              <div className="text-sm text-yellow-700">
                                2 obrigações esta semana
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                          <div className="flex items-center">
                            <div className="text-red-600 mr-3">⏰</div>
                            <div>
                              <div className="font-semibold text-red-800">
                                Em Atraso
                              </div>
                              <div className="text-sm text-red-700">
                                0 obrigações vencidas
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                          <div className="flex items-center">
                            <div className="text-green-600 mr-3">✅</div>
                            <div>
                              <div className="font-semibold text-green-800">
                                Regularizadas
                              </div>
                              <div className="text-sm text-green-700">
                                5 obrigações pagas
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tabela de Obrigações */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                                Obrigação
                              </th>
                              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                                Período
                              </th>
                              <th className="px-4 py-3 text-right font-semibold text-gray-700">
                                Valor
                              </th>
                              <th className="px-4 py-3 text-center font-semibold text-gray-700">
                                Vencimento
                              </th>
                              <th className="px-4 py-3 text-center font-semibold text-gray-700">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                obrigacao: "IVA - Mensal",
                                periodo: "Novembro/2024",
                                valor: 15200,
                                vencimento: "15/12/2024",
                                status: "pendente",
                              },
                              {
                                obrigacao: "IRPS - Trimestral",
                                periodo: "3º Trimestre/2024",
                                valor: 8500,
                                vencimento: "31/12/2024",
                                status: "pendente",
                              },
                              {
                                obrigacao: "INSS - Mensal",
                                periodo: "Novembro/2024",
                                valor: 4200,
                                vencimento: "10/12/2024",
                                status: "pago",
                              },
                              {
                                obrigacao: "Declaração de IVA",
                                periodo: "Novembro/2024",
                                valor: 0,
                                vencimento: "20/12/2024",
                                status: "pendente",
                              },
                            ].map((obrigacao, index) => {
                              return (
                                <tr
                                  key={index}
                                  className={`border-b hover:bg-gray-50 ${
                                    obrigacao.status === "pendente"
                                      ? "bg-yellow-50"
                                      : ""
                                  }`}
                                >
                                  <td className="px-4 py-3 font-medium text-gray-900">
                                    {obrigacao.obrigacao}
                                  </td>
                                  <td className="px-4 py-3 text-gray-700">
                                    {obrigacao.periodo}
                                  </td>
                                  <td className="px-4 py-3 text-right font-medium">
                                    {formatCurrency(obrigacao.valor)}
                                  </td>
                                  <td className="px-4 py-3 text-center">
                                    {obrigacao.vencimento}
                                  </td>
                                  <td className="px-4 py-3 text-center">
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        obrigacao.status === "pago"
                                          ? "bg-green-100 text-green-800"
                                          : "bg-yellow-100 text-yellow-800"
                                      }`}
                                    >
                                      {obrigacao.status === "pago"
                                        ? "Pago"
                                        : "Pendente"}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Impostos dos Lançamentos */}
              {fiscalView === "impostos" && impostosData && (
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-b">
                      <h4 className="font-bold text-lg text-gray-900">
                        📊 IMPOSTOS NOS LANÇAMENTOS
                      </h4>
                      <p className="text-sm text-gray-600">
                        Mês: {mesFiltro}/{anoFiltro}
                      </p>
                    </div>

                    <div className="p-6">
                      {/* Resumo */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600">Total IVA</div>
                          <div className="text-xl font-bold text-red-600">
                            {formatCurrency(impostosData.totalIva || 0)}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600">
                            Total IRPS
                          </div>
                          <div className="text-xl font-bold text-blue-600">
                            {formatCurrency(impostosData.totalIrps || 0)}
                          </div>
                        </div>
                      </div>

                      {/* Tabela de Lançamentos com Impostos */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                                Lançamento
                              </th>
                              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                                Descrição
                              </th>
                              <th className="px-4 py-3 text-right font-semibold text-gray-700">
                                Valor Base
                              </th>
                              <th className="px-4 py-3 text-right font-semibold text-gray-700">
                                IVA
                              </th>
                              <th className="px-4 py-3 text-right font-semibold text-gray-700">
                                IRPS
                              </th>
                              <th className="px-4 py-3 text-right font-semibold text-gray-700">
                                INSS
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {impostosData.lancamentos
                              ?.slice(0, 10)
                              .map((lancamento, index) => (
                                <tr
                                  key={index}
                                  className="border-b hover:bg-gray-50"
                                >
                                  <td className="px-4 py-3 font-medium text-gray-900">
                                    {lancamento.numeroLancamento}
                                  </td>
                                  <td className="px-4 py-3 text-gray-700">
                                    {lancamento.descricao}
                                  </td>
                                  <td className="px-4 py-3 text-right">
                                    {formatCurrency(lancamento.valor)}
                                  </td>
                                  <td className="px-4 py-3 text-right text-red-600">
                                    {formatCurrency(
                                      lancamento.tributacao?.iva?.valor || 0
                                    )}
                                  </td>
                                  <td className="px-4 py-3 text-right text-blue-600">
                                    {formatCurrency(
                                      lancamento.tributacao?.irps?.valor || 0
                                    )}
                                  </td>
                                  <td className="px-4 py-3 text-right text-green-600">
                                    {formatCurrency(
                                      lancamento.tributacao?.inss?.valor || 0
                                    )}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Mensagem quando não há dados */}
              {!fiscalData && fiscalView === "dados" && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🏛️</div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    Selecione um ano para visualizar os dados fiscais
                  </h4>
                  <p className="text-gray-500">
                    Os dados fiscais serão carregados automaticamente ao
                    selecionar um ano
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">📊</span>
          Contabilidade - Gestão Contábil Completa
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Gestão contábil integrada, balanços, demonstrações e conformidade
          fiscal
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              disabled={loading}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
                activeSection === section.id
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <span className="mr-2">{section.icon}</span>
              {section.label}
            </button>
          ))}
        </div>

        {/* Conteúdo Principal */}
        {loading && activeSection !== "dashboard" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white rounded-lg p-6 flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-700">Carregando...</p>
            </div>
          </div>
        )}

        {activeSection === "dashboard" && renderDashboard()}
        {activeSection === "lancamentos" && renderLancamentos()}
        {activeSection === "balancete" && renderBalancete()}
        {activeSection === "demonstracoes" && renderDemonstracoes()}
        {activeSection === "fiscal" && renderFiscal()}
      </div>
      {/* <DashboardCard
        title="Ativo Total"
        value={formatCurrency(dashboardData?.topLancamentos?.[0]?.valor || 0)}
        icon="💰"
        trend="+8% vs último mês"
        color="blue"
      /> */}
      {modalOpen && (
        <ModalLancamento
          isOpen={modalOpen}
          onClose={handleModalClose}
          lancamento={editingLancamento}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default Contabilidade;
