/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from "react";
import {
  StatusConta,
  CategoriaConta,
  PrioridadeConta,
  TipoConta,
  TipoFornecedor,
  FormaPagamentoTipo,
  CreateContaPagarModel,
  FilterContasPagarModel,
  RegistrarPagamentoModel,
} from "../../context/ContasPagarModels";
import { useContasPagar } from "@/context/useContasPagar";
import {
  FiFilter,
  FiPlus,
  FiEye,
  FiCalendar,
  FiDollarSign,
  FiTrendingUp,
  FiAlertTriangle,
  FiCheckCircle,
  FiX,
  FiSave,
  FiRefreshCw,
  FiTool,
} from "react-icons/fi";
import {
  MdOutlinePayments,
  MdOutlineReceipt,
  MdOutlineBusiness,
} from "react-icons/md";

// ================================================================
// UTILITÁRIOS ATUALIZADOS
// ================================================================

// Componente para formatar valores
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-MZ", {
    style: "currency",
    currency: "MZN",
    minimumFractionDigits: 2,
  }).format(value);
};

// Componente para calcular dias até vencimento
const calcularDiasAteVencimento = (dataVencimento: string) => {
  const hoje = new Date();
  const vencimento = new Date(dataVencimento);
  const diffTime = vencimento.getTime() - hoje.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Componente para verificar se está vencido (ATUALIZADO)
const estaVencido = (
  dataVencimento: string,
  status: StatusConta,
  valorPendente: number = 0
) => {
  if (status === StatusConta.PAGO || valorPendente <= 0) return false;
  const hoje = new Date();
  const vencimento = new Date(dataVencimento);
  return vencimento < hoje;
};

// Função para corrigir status da conta (ATUALIZADA)
const corrigirStatusConta = (
  conta: CreateContaPagarModel
): CreateContaPagarModel => {
  // Calcular valor pendente correto
  const valorOriginal = conta.valorOriginal || 0;
  const valorPago = conta.valorPago || 0;
  const valorPendente = Math.max(0, valorOriginal - valorPago);

  // Determinar status correto
  let statusCorreto = conta.status || StatusConta.PENDENTE;

  if (valorPendente <= 0 && valorOriginal > 0) {
    statusCorreto = StatusConta.PAGO;
  } else if (valorPago > 0 && valorPendente > 0) {
    statusCorreto = StatusConta.PAGO_PARCIAL;
  } else if (valorPendente > 0 && conta.dataVencimento) {
    const hoje = new Date();
    const vencimento = new Date(conta.dataVencimento);
    if (vencimento < hoje) {
      statusCorreto = StatusConta.VENCIDO;
    } else {
      statusCorreto = StatusConta.PENDENTE;
    }
  }

  return {
    ...conta,
    valorPendente,
    status: statusCorreto,
  };
};

// ================================================================
// COMPONENTES REUTILIZÁVEIS
// ================================================================

// Componente de Badge de Status (ATUALIZADO para mostrar informações de valor pendente)
const StatusBadge = ({
  status,
  valorPendente = 0,
}: {
  status: StatusConta;
  valorPendente?: number;
}) => {
  const config = {
    [StatusConta.PENDENTE]: {
      color: "bg-yellow-100 text-yellow-800",
      label: "Pendente",
      icon: "⏳",
    },
    [StatusConta.VENCIDO]: {
      color: "bg-red-100 text-red-800",
      label: "Vencido",
      icon: "⚠️",
    },
    [StatusConta.PAGO_PARCIAL]: {
      color: "bg-blue-100 text-blue-800",
      label: "Pago Parcial",
      icon: "↪️",
    },
    [StatusConta.PAGO]: {
      color: "bg-green-100 text-green-800",
      label: "Pago",
      icon: "✅",
    },
    [StatusConta.CANCELADO]: {
      color: "bg-gray-100 text-gray-800",
      label: "Cancelado",
      icon: "❌",
    },
    [StatusConta.CONTESTADO]: {
      color: "bg-purple-100 text-purple-800",
      label: "Contestado",
      icon: "⚖️",
    },
  };

  const { color, label, icon } = config[status];

  return (
    <div className="flex flex-col items-end">
      <span
        className={`px-3 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-1 ${color}`}
      >
        <span>{icon}</span>
        {label}
      </span>
      {valorPendente > 0 && status !== StatusConta.PAGO && (
        <p className="text-xs text-gray-600 mt-1">
          Pendente: {formatCurrency(valorPendente)}
        </p>
      )}
    </div>
  );
};

// Componente de Badge de Prioridade
const PrioridadeBadge = ({ prioridade }: { prioridade: PrioridadeConta }) => {
  const config = {
    [PrioridadeConta.BAIXA]: {
      color: "bg-green-100 text-green-800",
      label: "Baixa",
      icon: "⬇️",
    },
    [PrioridadeConta.MEDIA]: {
      color: "bg-blue-100 text-blue-800",
      label: "Média",
      icon: "↔️",
    },
    [PrioridadeConta.ALTA]: {
      color: "bg-orange-100 text-orange-800",
      label: "Alta",
      icon: "⬆️",
    },
    [PrioridadeConta.URGENTE]: {
      color: "bg-red-100 text-red-800",
      label: "Urgente",
      icon: "🚨",
    },
  };

  const { color, label, icon } = config[prioridade];

  return (
    <span
      className={`px-3 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-1 ${color}`}
    >
      <span>{icon}</span>
      {label}
    </span>
  );
};

// Componente de Card de Métrica (ATUALIZADO para mostrar métricas corretas)
const MetricCard = ({
  title,
  value,
  subtitle,
  icon,
  color = "blue",
  trend,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color?: "blue" | "red" | "green" | "orange" | "purple";
  trend?: { value: number; label: string };
}) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-100 text-blue-600",
    red: "bg-red-50 border-red-100 text-red-600",
    green: "bg-green-50 border-green-100 text-green-600",
    orange: "bg-orange-50 border-orange-100 text-orange-600",
    purple: "bg-purple-50 border-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
          <p className="text-sm text-gray-600">{subtitle}</p>
          {trend && (
            <div className="mt-2">
              <span
                className={`text-xs font-medium ${
                  trend.value >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.value >= 0 ? "↑" : "↓"} {trend.label}
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>{icon}</div>
      </div>
    </div>
  );
};

// Componente de Card de Conta (ATUALIZADO com validação de status)
const ContaCard = ({
  conta,
  onDetalhes,
  onPagar,
}: {
  conta: CreateContaPagarModel;
  onDetalhes: (id: string) => void;
  onPagar: (conta: CreateContaPagarModel) => void;
}) => {
  // Corrigir status da conta antes de usar
  const contaCorrigida = corrigirStatusConta(conta);

  const dias = calcularDiasAteVencimento(contaCorrigida.dataVencimento);
  const isVencida = estaVencido(
    contaCorrigida.dataVencimento,
    contaCorrigida.status!,
    contaCorrigida.valorPendente || 0
  );

  const valorPendente = contaCorrigida.valorPendente || 0;
  const podePagar =
    valorPendente > 0 && contaCorrigida.status !== StatusConta.PAGO;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-gray-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-3 h-3 rounded-full ${
                isVencida
                  ? "bg-red-500"
                  : contaCorrigida.status === StatusConta.PAGO
                  ? "bg-green-500"
                  : contaCorrigida.status === StatusConta.PAGO_PARCIAL
                  ? "bg-blue-500"
                  : "bg-yellow-500"
              }`}
            />
            <div>
              <h4 className="font-semibold text-gray-900">
                {contaCorrigida.numeroConta}
              </h4>
              <p className="text-sm text-gray-600">
                {contaCorrigida.fornecedor.nome}
              </p>
            </div>
          </div>

          <p className="text-gray-700 mb-3 line-clamp-2">
            {contaCorrigida.descricao}
          </p>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-gray-600">
              <FiCalendar className="w-4 h-4" />
              <span>
                {new Date(contaCorrigida.dataVencimento).toLocaleDateString(
                  "pt-MZ"
                )}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FiDollarSign className="w-4 h-4 text-gray-600" />
              <span className="font-semibold text-gray-900">
                {formatCurrency(contaCorrigida.valorOriginal)}
              </span>
            </div>
            {(contaCorrigida.valorPago ?? 0) > 0 && (
              <div className="flex items-center gap-1 text-green-600">
                <FiCheckCircle className="w-4 h-4" />
                <span className="font-medium">
                  {formatCurrency(contaCorrigida.valorPago ?? 0)} pago
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 ml-4">
          <StatusBadge
            status={contaCorrigida.status!}
            valorPendente={valorPendente}
          />

          {isVencida && (
            <p className="text-xs text-red-600 font-medium">
              {Math.abs(dias)} dias atrasado
            </p>
          )}
          {dias >= 0 && dias <= 7 && podePagar && (
            <p className="text-xs text-orange-600 font-medium">
              Vence em {dias} dias
            </p>
          )}

          <div className="flex gap-2">
            {podePagar && (
              <button
                onClick={() => onPagar(contaCorrigida)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <MdOutlinePayments className="w-4 h-4" />
                Pagar
              </button>
            )}
            <button
              onClick={() => onDetalhes(contaCorrigida.contaId!)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <FiEye className="w-4 h-4" />
              Detalhes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de Tabs de Navegação (ADICIONADA nova aba de ferramentas)
const NavigationTabs = ({
  active,
  onChange,
}: {
  active: string;
  onChange: (tab: string) => void;
}) => {
  const tabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <FiTrendingUp className="w-5 h-5" />,
    },
    {
      id: "faturas",
      label: "Contas",
      icon: <MdOutlineReceipt className="w-5 h-5" />,
    },
    {
      id: "pagamentos",
      label: "Pagamentos",
      icon: <MdOutlinePayments className="w-5 h-5" />,
    },
    {
      id: "fornecedores",
      label: "Fornecedores",
      icon: <MdOutlineBusiness className="w-5 h-5" />,
    },
    {
      id: "ferramentas",
      label: "Ferramentas",
      icon: <FiTool className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-xl">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 flex-1 justify-center ${
            active === tab.id
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

// ================================================================
// COMPONENTE PRINCIPAL
// ================================================================

const ContasPagar = () => {
  const [selectedFornecedor, setSelectedFornecedor] = useState<any>(null);
  const [showFornecedorDetalhes, setShowFornecedorDetalhes] = useState(false);
  const [fornecedoresList, setFornecedoresList] = useState<any[]>([]);
  const [loadingFornecedores, setLoadingFornecedores] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userId] = useState("user123");

  // Estados para dados
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [contasList, setContasList] = useState<CreateContaPagarModel[]>([]);
  const [totalContas, setTotalContas] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedConta, setSelectedConta] =
    useState<CreateContaPagarModel | null>(null);

  // Estados para formulários
  const [showNovaContaModal, setShowNovaContaModal] = useState(false);
  const [showPagamentoModal, setShowPagamentoModal] = useState(false);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showCorrecaoStatus, setShowCorrecaoStatus] = useState(false);
  const [correcaoLoading, setCorrecaoLoading] = useState(false);
  const [correcaoResultado, setCorrecaoResultado] = useState<any>(null);

  // Filtros (ATUALIZADO com novos parâmetros)
  const [filters, setFilters] = useState<FilterContasPagarModel>({
    curPage: 1,
    pageSize: 10,
    exibirVencidas: true,
    exibirPagas: false,
    apenasPendentes: false,
    // Adicione campos para os novos filtros
    categoria: undefined,
    prioridade: undefined,
    valorMin: undefined,
    valorMax: undefined,
    dataVencimentoInicio: undefined,
    dataVencimentoFim: undefined,
    status: undefined,
    fornecedorNome: undefined,
  });

  // Formulários
  const [novaContaForm, setNovaContaForm] = useState<CreateContaPagarModel>({
    fornecedorId: "",
    fornecedor: {
      nome: "",
      nuit: "",
      email: "",
      telefone: "",
      endereco: "",
      contacto: "",
      empresa: "",
      tipoFornecedor: TipoFornecedor.OUTRO,
    },
    tipoConta: TipoConta.FATURA,
    categoria: CategoriaConta.OUTRO,
    descricao: "",
    valorOriginal: 0,
    dataEmissao: new Date().toISOString().split("T")[0],
    dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    criadoPor: userId,
    status: StatusConta.PENDENTE,
    prioridade: PrioridadeConta.MEDIA,
  });

  // Formulário de pagamento
  const [pagamentoForm, setPagamentoForm] = useState<RegistrarPagamentoModel>({
    contaId: "",
    valor: 0,
    dataPagamento: new Date().toISOString().split("T")[0],
    formaPagamento: "",
    numeroComprovante: "",
    observacoes: "",
    usuario: userId,
  });

  const {
    loading,
    error,
    getDashboard,
    getContasPagarList,
    createContaPagar,
    registrarPagamento,
    getContaPagarDetail,
    // Adicione esta nova função ao seu hook
    corrigirStatusContas: apiCorrigirStatusContas,
  } = useContasPagar();

  // Carregar dados iniciais
  useEffect(() => {
    loadDashboard();
    loadContasList();
  }, []);

  // Carregar dashboard
  const loadDashboard = async () => {
    try {
      const data = await getDashboard(3);
      setDashboardData(data);
    } catch (err) {
      console.error("Erro ao carregar dashboard:", err);
    }
  };

  const formatarDataParaExibicao = (dataString?: string) => {
    if (!dataString) return "Selecione uma data";

    const data = new Date(dataString);
    return data.toLocaleDateString("pt-MZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Carregar lista de contas (ATUALIZADO com correção de status)
  const loadContasList = useCallback(async () => {
    try {
      const data = await getContasPagarList(filters);

      // Corrigir status de todas as contas
      const contasCorrigidas = data.list.map((conta) =>
        corrigirStatusConta(conta)
      );

      setContasList(contasCorrigidas);
      setTotalContas(data.totalCount);
      setTotalPages(data.totalPage);
      setCurrentPage(data.curPage);
    } catch (err) {
      console.error("Erro ao carregar lista:", err);
    }
  }, [filters, getContasPagarList]);

  // Aplicar filtros
  const handleFilterChange = useCallback(
    (key: keyof FilterContasPagarModel, value: any) => {
      setFilters((prev) => {
        const newFilters = { ...prev, [key]: value };

        // Resetar página quando mudar filtros
        if (key !== "curPage") {
          newFilters.curPage = 1;
        }

        // Lógica para datas: se tem data fim, deve ter data início
        if (
          key === "dataVencimentoFim" &&
          value &&
          !newFilters.dataVencimentoInicio
        ) {
          // Não fazer nada - deixar o usuário escolher a data início primeiro
        }

        return newFilters;
      });

      // Usar debounce para evitar muitas requisições
      const timeoutId = setTimeout(() => {
        loadContasList();
      }, 300);

      return () => clearTimeout(timeoutId);
    },
    [loadContasList]
  );

  // Criar nova conta
  const handleCreateConta = async () => {
    try {
      // Validar campos obrigatórios
      if (!novaContaForm.fornecedor.nome.trim()) {
        alert("Nome do fornecedor é obrigatório");
        return;
      }

      if (!novaContaForm.fornecedor.nuit.trim()) {
        alert("NUIT do fornecedor é obrigatório");
        return;
      }

      if (!novaContaForm.descricao.trim()) {
        alert("Descrição é obrigatória");
        return;
      }

      if (!novaContaForm.valorOriginal || novaContaForm.valorOriginal <= 0) {
        alert("Valor deve ser maior que zero");
        return;
      }

      // Validar data de vencimento
      const dataVencimento = new Date(novaContaForm.dataVencimento);
      const hoje = new Date();
      if (dataVencimento < hoje) {
        if (
          !confirm(
            "A data de vencimento é anterior à data atual. Deseja continuar?"
          )
        ) {
          return;
        }
      }

      // Preparar dados no formato correto
      const contaData = {
        fornecedorId:
          novaContaForm.fornecedorId ||
          `FORN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        fornecedor: {
          nome: novaContaForm.fornecedor.nome.trim(),
          nuit: novaContaForm.fornecedor.nuit.trim(),
          ...(novaContaForm.fornecedor.email && {
            email: novaContaForm.fornecedor.email.trim(),
          }),
          ...(novaContaForm.fornecedor.telefone && {
            telefone: novaContaForm.fornecedor.telefone.trim(),
          }),
          ...(novaContaForm.fornecedor.endereco && {
            endereco: novaContaForm.fornecedor.endereco.trim(),
          }),
          ...(novaContaForm.fornecedor.empresa && {
            empresa: novaContaForm.fornecedor.empresa.trim(),
          }),
          ...(novaContaForm.fornecedor.contacto && {
            contacto: novaContaForm.fornecedor.contacto.trim(),
          }),
          tipoFornecedor:
            novaContaForm.fornecedor.tipoFornecedor || TipoFornecedor.OUTRO,
        },
        tipoConta: novaContaForm.tipoConta,
        categoria: novaContaForm.categoria,
        descricao: novaContaForm.descricao.trim(),
        valorOriginal: Number(novaContaForm.valorOriginal),
        dataEmissao: novaContaForm.dataEmissao,
        dataVencimento: novaContaForm.dataVencimento,
        criadoPor: novaContaForm.criadoPor,
        status: novaContaForm.status,
        prioridade: novaContaForm.prioridade,
      };

      await createContaPagar(contaData);
      setShowNovaContaModal(false);
      loadContasList();
      loadDashboard();
      resetNovaContaForm();
    } catch (err: any) {
      console.error("Erro completo:", err);
      if (err.response?.data?.returnMsg) {
        alert(`Erro: ${err.response.data.returnMsg}`);
      } else {
        alert("Erro ao criar conta. Verifique os dados e tente novamente.");
      }
    }
  };

  // Registrar pagamento (ATUALIZADO com validações)
  const handleRegistrarPagamento = async () => {
    try {
      if (!pagamentoForm.contaId) {
        alert("Selecione uma conta para pagar");
        return;
      }

      // Encontrar a conta selecionada
      const conta = contasList.find((c) => c.contaId === pagamentoForm.contaId);
      if (!conta) {
        alert("Conta não encontrada");
        return;
      }

      // Corrigir status da conta para verificar valores corretos
      const contaCorrigida = corrigirStatusConta(conta);

      // Validar valor do pagamento
      const valorPendente = contaCorrigida.valorPendente || 0;
      if (pagamentoForm.valor <= 0) {
        alert("Valor do pagamento deve ser maior que zero");
        return;
      }

      if (pagamentoForm.valor > valorPendente) {
        alert(
          `Valor do pagamento (${formatCurrency(
            pagamentoForm.valor
          )}) excede o valor pendente (${formatCurrency(valorPendente)})`
        );
        return;
      }

      if (valorPendente <= 0) {
        alert("Esta conta já foi totalmente paga");
        return;
      }

      await registrarPagamento(pagamentoForm);
      setShowPagamentoModal(false);
      loadContasList();
      loadDashboard();
      resetPagamentoForm();
      alert("Pagamento registrado com sucesso!");
    } catch (err: any) {
      console.error("Erro ao registrar pagamento:", err);
      if (err.response?.data?.returnMsg) {
        alert(`Erro: ${err.response.data.returnMsg}`);
      } else {
        alert(
          "Erro ao registrar pagamento. Verifique os dados e tente novamente."
        );
      }
    }
  };

  // Carregar detalhes da conta
  const handleLoadDetalhes = async (contaId: string) => {
    try {
      const response = await getContaPagarDetail(contaId);
      if (response.data) {
        // Corrigir status ao carregar detalhes
        const contaCorrigida = corrigirStatusConta(response.data);
        setSelectedConta(contaCorrigida);
        setShowDetalhesModal(true);
      }
    } catch (err) {
      console.error("Erro ao carregar detalhes:", err);
    }
  };

  const handlePagarConta = (conta: CreateContaPagarModel) => {
    // Corrigir status da conta antes de processar pagamento
    const contaCorrigida = corrigirStatusConta(conta);
    const valorPendente = contaCorrigida.valorPendente || 0;

    if (valorPendente <= 0) {
      alert("Esta conta já foi totalmente paga");
      return;
    }

    setPagamentoForm({
      ...pagamentoForm,
      contaId: contaCorrigida.contaId!,
      valor: valorPendente,
    });
    setShowPagamentoModal(true);
    setActiveTab("pagamentos");
  };

  const resetPagamentoForm = () => {
    setPagamentoForm({
      contaId: "",
      valor: 0,
      dataPagamento: new Date().toISOString().split("T")[0],
      formaPagamento: "",
      numeroComprovante: "",
      observacoes: "",
      usuario: userId,
    });
  };

  const resetNovaContaForm = () => {
    setNovaContaForm({
      fornecedorId: "",
      fornecedor: {
        nome: "",
        nuit: "",
        email: "",
        telefone: "",
        endereco: "",
        contacto: "",
        empresa: "",
        tipoFornecedor: TipoFornecedor.OUTRO,
      },
      tipoConta: TipoConta.FATURA,
      categoria: CategoriaConta.OUTRO,
      descricao: "",
      valorOriginal: 0,
      dataEmissao: new Date().toISOString().split("T")[0],
      dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      criadoPor: userId,
      status: StatusConta.PENDENTE,
      prioridade: PrioridadeConta.MEDIA,
    });
  };

  // Mudar página
  const handlePageChange = (page: number) => {
    handleFilterChange("curPage", page);
  };

  // Função para executar correção de status
  const executarCorrecaoStatus = async () => {
    try {
      setCorrecaoLoading(true);
      const resultado = await apiCorrigirStatusContas({
        usuario: userId,
        limite: 1000,
      });

      alert(
        `Correção concluída! ${resultado.correcoesAplicadas} contas foram corrigidas.`
      );

      // Recarregar dados após correção
      loadContasList();
      loadDashboard();
    } catch (err) {
      console.error("Erro ao corrigir status:", err);
      alert("Erro ao corrigir status. Verifique o console.");
    } finally {
      setCorrecaoLoading(false);
    }
  };

  // Função para carregar fornecedores (ATUALIZADA)
  const loadFornecedores = async () => {
    try {
      setLoadingFornecedores(true);

      // Buscar contas com status corrigido
      const data = await getContasPagarList({
        curPage: 1,
        pageSize: 1000,
        exibirVencidas: true,
        exibirPagas: true,
        apenasPendentes: false, // adicionar aqui
      });

      // Agrupar fornecedores das contas
      const fornecedoresMap = new Map();

      data.list.forEach((conta: CreateContaPagarModel) => {
        const fornecedorNome = conta.fornecedor?.nome;
        const fornecedorNuit = conta.fornecedor?.nuit;

        if (fornecedorNome) {
          const key = `${fornecedorNome}-${fornecedorNuit}`;

          if (!fornecedoresMap.has(key)) {
            fornecedoresMap.set(key, {
              nome: fornecedorNome,
              nuit: fornecedorNuit || "N/A",
              email: conta.fornecedor?.email || "",
              telefone: conta.fornecedor?.telefone || "",
              endereco: conta.fornecedor?.endereco || "",
              tipoFornecedor:
                conta.fornecedor?.tipoFornecedor || TipoFornecedor.OUTRO,
              totalContas: 0,
              valorTotal: 0,
              valorPendente: 0,
              valorPago: 0,
              contas: [],
            });
          }

          const fornecedor = fornecedoresMap.get(key);
          fornecedor.totalContas += 1;
          fornecedor.valorTotal += conta.valorOriginal || 0;

          // Usar valor pendente corrigido
          const contaCorrigida = corrigirStatusConta(conta);
          fornecedor.valorPendente += contaCorrigida.valorPendente || 0;
          fornecedor.valorPago += conta.valorPago || 0;
          fornecedor.contas.push({
            contaId: conta.contaId,
            numeroConta: conta.numeroConta,
            descricao: conta.descricao,
            valor: conta.valorOriginal,
            status: contaCorrigida.status,
            dataVencimento: conta.dataVencimento,
            valorPendente: contaCorrigida.valorPendente,
          });
        }
      });

      // Converter map para array e ordenar
      const fornecedoresArray = Array.from(fornecedoresMap.values()).sort(
        (a, b) => b.valorPendente - a.valorPendente
      );

      setFornecedoresList(fornecedoresArray);
    } catch (error) {
      console.error("Erro ao carregar fornecedores:", error);
    } finally {
      setLoadingFornecedores(false);
    }
  };

  useEffect(() => {
    if (activeTab === "fornecedores") {
      loadFornecedores();
    }
  }, [activeTab]);

  // ================================================================
  // RENDERIZAÇÃO
  // ================================================================

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-2.5 rounded-xl">
                  <MdOutlinePayments className="w-6 h-6" />
                </div>
                Contas a Pagar
              </h1>
              <p className="text-gray-600 mt-1">
                Gerencie pagamentos e despesas da sua empresa
              </p>
            </div>
            <button
              onClick={() => setShowNovaContaModal(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <FiPlus className="w-5 h-5" />
              Nova Conta
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <NavigationTabs active={activeTab} onChange={setActiveTab} />

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Carregando dados...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="text-red-600">
                <FiAlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-red-800">
                  Erro ao carregar dados
                </p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard */}
        {activeTab === "dashboard" && dashboardData && (
          <div className="space-y-8">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total a Pagar"
                value={formatCurrency(
                  dashboardData.estatisticas?.totalPendente || 0
                )}
                subtitle={`${
                  dashboardData.estatisticas?.contasPendentes || 0
                } contas pendentes`}
                icon={<MdOutlinePayments className="w-6 h-6" />}
                color="blue"
              />

              <MetricCard
                title="Vencidos"
                value={formatCurrency(
                  dashboardData.estatisticas?.valorVencido || 0
                )}
                subtitle={`${
                  dashboardData.estatisticas?.contasVencidas || 0
                } contas atrasadas`}
                icon={<FiAlertTriangle className="w-6 h-6" />}
                color="red"
              />

              <MetricCard
                title="A Vencer (7 dias)"
                value={formatCurrency(
                  dashboardData.vencimentosEstaSemana?.reduce(
                    (sum: number, conta: any) =>
                      sum + (conta.valorPendente || 0),
                    0
                  ) || 0
                )}
                subtitle={`${
                  dashboardData.vencimentosEstaSemana?.length || 0
                } contas`}
                icon={<FiCalendar className="w-6 h-6" />}
                color="orange"
              />

              <MetricCard
                title="Pago Este Mês"
                value={formatCurrency(
                  dashboardData.estatisticas?.totalPago || 0
                )}
                subtitle={`${
                  dashboardData.estatisticas?.contasPagas || 0
                } contas pagas`}
                icon={<FiCheckCircle className="w-6 h-6" />}
                color="green"
              />
            </div>

            {/* Seção de Alertas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Próximos Vencimentos */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <FiCalendar className="w-5 h-5 text-orange-500" />
                    Próximos Vencimentos (7 dias)
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {dashboardData.proximosVencimentos
                      ?.slice(0, 5)
                      .map((conta: any) => (
                        <div
                          key={conta.contaId}
                          className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200"
                        >
                          <div className="flex items-start gap-3">
                            <div className="bg-orange-100 p-2 rounded-lg">
                              <FiCalendar className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {conta.fornecedor?.nome}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                {conta.descricao}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">
                              {formatCurrency(conta.valorPendente)}
                            </p>
                            <p className="text-sm text-orange-600 font-medium">
                              Vence em{" "}
                              {calcularDiasAteVencimento(conta.dataVencimento)}{" "}
                              dias
                            </p>
                          </div>
                        </div>
                      ))}
                    {(!dashboardData.proximosVencimentos ||
                      dashboardData.proximosVencimentos.length === 0) && (
                      <p className="text-gray-500 text-center py-4">
                        Nenhum vencimento próximo
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contas Vencidas */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <FiAlertTriangle className="w-5 h-5 text-red-500" />
                    Contas Vencidas
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {dashboardData.contasVencidas
                      ?.slice(0, 5)
                      .map((conta: any) => (
                        <div
                          key={conta.contaId}
                          className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200"
                        >
                          <div className="flex items-start gap-3">
                            <div className="bg-red-100 p-2 rounded-lg">
                              <FiAlertTriangle className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {conta.fornecedor?.nome}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                {conta.descricao}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">
                              {formatCurrency(conta.valorPendente)}
                            </p>
                            <p className="text-sm text-red-600 font-medium">
                              {Math.abs(
                                calcularDiasAteVencimento(conta.dataVencimento)
                              )}{" "}
                              dias atrasado
                            </p>
                          </div>
                        </div>
                      ))}
                    {(!dashboardData.contasVencidas ||
                      dashboardData.contasVencidas.length === 0) && (
                      <p className="text-green-500 text-center py-4">
                        Todas as contas estão em dia! ✅
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Fornecedores Principais */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <MdOutlineBusiness className="w-5 h-5 text-blue-500" />
                  Principais Fornecedores
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {dashboardData.topFornecedoresPendente
                    ?.slice(0, 4)
                    .map((fornecedor: any) => (
                      <div
                        key={fornecedor._id}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <MdOutlineBusiness className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 truncate">
                              {fornecedor._id}
                            </p>
                            <p className="text-xs text-gray-600">
                              {fornecedor.quantidade} contas
                            </p>
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatCurrency(fornecedor.valorPendente)}
                        </p>
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{
                                width: `${Math.min(
                                  (fornecedor.valorPendente /
                                    (dashboardData.estatisticas
                                      ?.totalPendente || 1)) *
                                    100,
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gestão de Contas */}
        {activeTab === "faturas" && (
          <div className="space-y-6">
            {/* Filtros */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900 text-lg">
                  Contas a Pagar
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    <FiFilter className="w-4 h-4" />
                    Filtros
                  </button>
                  <button
                    onClick={() => setShowNovaContaModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                  >
                    <FiPlus className="w-4 h-4" />
                    Nova Conta
                  </button>
                </div>
              </div>

              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  {/* Filtro por Status */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      onChange={(e) =>
                        handleFilterChange(
                          "status",
                          e.target.value || undefined
                        )
                      }
                      value={filters.status || ""}
                    >
                      <option value="">Todos os status</option>
                      {Object.values(StatusConta).map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() +
                            status.slice(1).replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Filtro por Fornecedor */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fornecedor
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      placeholder="Digite o nome..."
                      value={filters.fornecedorNome || ""}
                      onChange={(e) =>
                        handleFilterChange(
                          "fornecedorNome",
                          e.target.value || undefined
                        )
                      }
                    />
                  </div>

                  {/* Filtro por Data de Vencimento - De */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vencimento (De)
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        value={filters.dataVencimentoInicio || ""}
                        onChange={(e) =>
                          handleFilterChange(
                            "dataVencimentoInicio",
                            e.target.value || undefined
                          )
                        }
                      />
                      {!filters.dataVencimentoInicio && (
                        <div className="absolute inset-0 flex items-center px-4 pointer-events-none">
                          <span className="text-gray-500">Data inicial</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Filtro por Data de Vencimento - Até */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vencimento (Até)
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        value={filters.dataVencimentoFim || ""}
                        onChange={(e) =>
                          handleFilterChange(
                            "dataVencimentoFim",
                            e.target.value || undefined
                          )
                        }
                      />
                      {!filters.dataVencimentoFim && (
                        <div className="absolute inset-0 flex items-center px-4 pointer-events-none">
                          <span className="text-gray-500">Data final</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Filtro por Categoria */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoria
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      onChange={(e) =>
                        handleFilterChange(
                          "categoria",
                          e.target.value || undefined
                        )
                      }
                      value={filters.categoria || ""}
                    >
                      <option value="">Todas categorias</option>
                      {Object.values(CategoriaConta).map((categoria) => (
                        <option key={categoria} value={categoria}>
                          {categoria.charAt(0).toUpperCase() +
                            categoria.slice(1).replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Filtro por Prioridade */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prioridade
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      onChange={(e) =>
                        handleFilterChange(
                          "prioridade",
                          e.target.value || undefined
                        )
                      }
                      value={filters.prioridade || ""}
                    >
                      <option value="">Todas prioridades</option>
                      {Object.values(PrioridadeConta).map((prioridade) => (
                        <option key={prioridade} value={prioridade}>
                          {prioridade.charAt(0).toUpperCase() +
                            prioridade.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Filtro por Valor Mínimo */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Valor Mínimo (MT)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      placeholder="0,00"
                      value={filters.valorMin || ""}
                      onChange={(e) =>
                        handleFilterChange(
                          "valorMin",
                          e.target.value
                            ? parseFloat(e.target.value)
                            : undefined
                        )
                      }
                      min="0"
                      step="0.01"
                    />
                  </div>

                  {/* Filtro por Valor Máximo */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Valor Máximo (MT)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      placeholder="Qualquer valor"
                      value={filters.valorMax || ""}
                      onChange={(e) =>
                        handleFilterChange(
                          "valorMax",
                          e.target.value
                            ? parseFloat(e.target.value)
                            : undefined
                        )
                      }
                      min="0"
                      step="0.01"
                    />
                  </div>

                  {/* Botões de Ação dos Filtros */}
                  <div className="lg:col-span-4 flex justify-between items-center pt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="exibirPagas"
                          checked={filters.exibirPagas || false}
                          onChange={(e) =>
                            handleFilterChange("exibirPagas", e.target.checked)
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="exibirPagas"
                          className="ml-2 text-sm text-gray-700"
                        >
                          Exibir contas pagas
                        </label>
                      </div>

                      <div className="flex items-center ml-4">
                        <input
                          type="checkbox"
                          id="exibirVencidas"
                          checked={filters.exibirVencidas || true}
                          onChange={(e) =>
                            handleFilterChange(
                              "exibirVencidas",
                              e.target.checked
                            )
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="exibirVencidas"
                          className="ml-2 text-sm text-gray-700"
                        >
                          Exibir vencidas
                        </label>
                      </div>

                      <div className="flex items-center ml-4">
                        <input
                          type="checkbox"
                          id="apenasPendentes"
                          checked={filters.apenasPendentes || false}
                          onChange={(e) =>
                            handleFilterChange(
                              "apenasPendentes",
                              e.target.checked
                            )
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="apenasPendentes"
                          className="ml-2 text-sm text-gray-700"
                        >
                          Apenas pendentes
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          // Resetar todos os filtros
                          setFilters({
                            curPage: 1,
                            pageSize: 10,
                            exibirVencidas: true,
                            exibirPagas: false,
                            apenasPendentes: false,
                          });
                          loadContasList();
                        }}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center gap-2"
                      >
                        <FiRefreshCw className="w-4 h-4" />
                        Limpar Filtros
                      </button>

                      <button
                        onClick={() => setShowFilters(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm"
                      >
                        Ocultar Filtros
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Lista de Contas */}
              <div className="space-y-3">
                {contasList.map((conta) => (
                  <ContaCard
                    key={conta.contaId}
                    conta={conta}
                    onDetalhes={handleLoadDetalhes}
                    onPagar={handlePagarConta}
                  />
                ))}
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
                  <div className="text-sm text-gray-600">
                    Mostrando {contasList.length} de {totalContas} contas
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleFilterChange("curPage", currentPage - 1)
                      }
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </button>
                    <div className="flex items-center gap-1">
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() =>
                                handleFilterChange("curPage", pageNum)
                              }
                              className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                                currentPage === pageNum
                                  ? "bg-blue-500 text-white"
                                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}
                    </div>
                    <button
                      onClick={() =>
                        handleFilterChange("curPage", currentPage + 1)
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Próxima
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Registro de Pagamentos */}
        {activeTab === "pagamentos" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Formulário de Pagamento */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <MdOutlinePayments className="w-5 h-5 text-blue-500" />
                    Registro de Pagamento
                  </h3>
                </div>
                <div className="p-6">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleRegistrarPagamento();
                    }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Conta a Pagar *
                        </label>
                        <select
                          value={pagamentoForm.contaId}
                          onChange={(e) =>
                            setPagamentoForm({
                              ...pagamentoForm,
                              contaId: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          required
                        >
                          <option value="">Selecione a conta</option>
                          {contasList
                            .filter((c) => {
                              const contaCorrigida = corrigirStatusConta(c);
                              return (
                                (contaCorrigida.valorPendente ?? 0) > 0 &&
                                contaCorrigida.status !== StatusConta.PAGO
                              );
                            })
                            .map((conta) => {
                              const contaCorrigida = corrigirStatusConta(conta);
                              return (
                                <option
                                  key={conta.contaId}
                                  value={conta.contaId}
                                >
                                  {conta.numeroConta} - {conta.fornecedor.nome}{" "}
                                  (
                                  {formatCurrency(
                                    contaCorrigida.valorPendente ?? 0
                                  )}
                                  )
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Valor Pago (MT) *
                        </label>
                        <input
                          type="number"
                          value={pagamentoForm.valor}
                          onChange={(e) =>
                            setPagamentoForm({
                              ...pagamentoForm,
                              valor: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          placeholder="0,00"
                          required
                          min="0.01"
                          step="0.01"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data do Pagamento *
                        </label>
                        <input
                          type="date"
                          value={pagamentoForm.dataPagamento}
                          onChange={(e) =>
                            setPagamentoForm({
                              ...pagamentoForm,
                              dataPagamento: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Forma de Pagamento *
                        </label>
                        <select
                          value={pagamentoForm.formaPagamento}
                          onChange={(e) =>
                            setPagamentoForm({
                              ...pagamentoForm,
                              formaPagamento: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          required
                        >
                          <option value="">Selecione</option>
                          {Object.values(FormaPagamentoTipo).map((tipo) => (
                            <option key={tipo} value={tipo}>
                              {tipo.replace("_", " ").toUpperCase()}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nº do Comprovante
                        </label>
                        <input
                          type="text"
                          value={pagamentoForm.numeroComprovante}
                          onChange={(e) =>
                            setPagamentoForm({
                              ...pagamentoForm,
                              numeroComprovante: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          placeholder="Nº do comprovante bancário"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Observações
                      </label>
                      <textarea
                        value={pagamentoForm.observacoes}
                        onChange={(e) =>
                          setPagamentoForm({
                            ...pagamentoForm,
                            observacoes: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        placeholder="Observações sobre o pagamento..."
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={resetPagamentoForm}
                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                      >
                        Limpar
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {loading ? "Processando..." : "Registrar Pagamento"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Informações da Conta */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Informações da Conta Selecionada
                </h4>
                {pagamentoForm.contaId ? (
                  <div className="space-y-4">
                    {(() => {
                      const conta = contasList.find(
                        (c) => c.contaId === pagamentoForm.contaId
                      );
                      if (!conta) {
                        return (
                          <p className="text-gray-500">Conta não encontrada</p>
                        );
                      }

                      const contaCorrigida = corrigirStatusConta(conta);
                      const valorPendente = contaCorrigida.valorPendente || 0;

                      return (
                        <>
                          <div>
                            <span className="text-gray-600 block text-sm mb-1">
                              Nº Conta:
                            </span>
                            <p className="font-medium text-gray-900">
                              {conta.numeroConta}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600 block text-sm mb-1">
                              Fornecedor:
                            </span>
                            <p className="font-medium text-gray-900">
                              {conta.fornecedor.nome}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600 block text-sm mb-1">
                              Valor Total:
                            </span>
                            <p className="font-medium text-gray-900">
                              {formatCurrency(conta.valorOriginal)}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600 block text-sm mb-1">
                              Valor Pago:
                            </span>
                            <p className="font-medium text-green-600">
                              {formatCurrency(conta.valorPago || 0)}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600 block text-sm mb-1">
                              Valor Pendente:
                            </span>
                            <p
                              className={`font-medium ${
                                valorPendente > 0
                                  ? "text-red-600"
                                  : "text-green-600"
                              }`}
                            >
                              {formatCurrency(valorPendente)}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600 block text-sm mb-1">
                              Vencimento:
                            </span>
                            <p className="font-medium text-gray-900">
                              {new Date(
                                conta.dataVencimento
                              ).toLocaleDateString("pt-MZ")}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600 block text-sm mb-1">
                              Status:
                            </span>
                            <div className="mt-1">
                              <StatusBadge
                                status={contaCorrigida.status!}
                                valorPendente={valorPendente}
                              />
                            </div>
                          </div>

                          {valorPendente > 0 && (
                            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <p className="text-sm text-blue-700">
                                <strong>Valor máximo permitido:</strong>{" "}
                                {formatCurrency(valorPendente)}
                              </p>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Selecione uma conta para ver os detalhes
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Gestão de Fornecedores */}
        {activeTab === "fornecedores" && (
          <div className="space-y-6">
            {/* Header da aba */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-2.5 rounded-xl">
                        <MdOutlineBusiness className="w-6 h-6" />
                      </div>
                      Gestão de Fornecedores
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Gerencie todos os fornecedores e suas contas pendentes
                    </p>
                  </div>
                  <button
                    onClick={() => loadFornecedores()}
                    className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2"
                  >
                    <FiRefreshCw className="w-4 h-4" />
                    Atualizar
                  </button>
                </div>
              </div>

              {/* Loading State */}
              {loadingFornecedores && (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto"></div>
                  <p className="mt-4 text-gray-600">
                    Carregando fornecedores...
                  </p>
                </div>
              )}

              {/* Lista de Fornecedores */}
              {!loadingFornecedores && fornecedoresList.length > 0 && (
                <div className="p-6">
                  {/* Métricas */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5">
                      <p className="text-sm font-medium text-blue-800 mb-2">
                        Total de Fornecedores
                      </p>
                      <p className="text-3xl font-bold text-blue-900">
                        {fornecedoresList.length}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-5">
                      <p className="text-sm font-medium text-orange-800 mb-2">
                        Valor Total Pendente
                      </p>
                      <p className="text-3xl font-bold text-orange-900">
                        {formatCurrency(
                          fornecedoresList.reduce(
                            (sum, f) => sum + f.valorPendente,
                            0
                          )
                        )}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-5">
                      <p className="text-sm font-medium text-green-800 mb-2">
                        Valor Total Pago
                      </p>
                      <p className="text-3xl font-bold text-green-900">
                        {formatCurrency(
                          fornecedoresList.reduce(
                            (sum, f) => sum + f.valorPago,
                            0
                          )
                        )}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-5">
                      <p className="text-sm font-medium text-purple-800 mb-2">
                        Total de Contas
                      </p>
                      <p className="text-3xl font-bold text-purple-900">
                        {fornecedoresList.reduce(
                          (sum, f) => sum + f.totalContas,
                          0
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Tabela de Fornecedores */}
                  <div className="overflow-hidden border border-gray-200 rounded-xl">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Fornecedor
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            NUIT
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Contas
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Valor Total
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Pendente
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {fornecedoresList.map((fornecedor, index) => (
                          <tr
                            key={`${fornecedor.nome}-${fornecedor.nuit}`}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mr-3">
                                  <span className="text-purple-600 font-bold">
                                    {fornecedor.nome.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {fornecedor.nome}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {fornecedor.tipoFornecedor
                                      .replace("_", " ")
                                      .toLowerCase()}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <code className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm font-mono">
                                {fornecedor.nuit}
                              </code>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <span className="font-medium text-gray-900 mr-2">
                                  {fornecedor.totalContas}
                                </span>
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-blue-500 h-2 rounded-full"
                                    style={{
                                      width: `${Math.min(
                                        (fornecedor.totalContas /
                                          Math.max(
                                            ...fornecedoresList.map(
                                              (f) => f.totalContas
                                            )
                                          )) *
                                          100,
                                        100
                                      )}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <p className="font-bold text-gray-900">
                                {formatCurrency(fornecedor.valorTotal)}
                              </p>
                            </td>
                            <td className="px-6 py-4">
                              <div
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                  fornecedor.valorPendente > 0
                                    ? "bg-red-100 text-red-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {fornecedor.valorPendente > 0 ? "⚠️ " : "✅ "}
                                {formatCurrency(fornecedor.valorPendente)}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                  fornecedor.valorPendente > 0
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {fornecedor.valorPendente > 0
                                  ? "Com Pendências"
                                  : "Regularizado"}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => {
                                    setSelectedFornecedor(fornecedor);
                                    setShowFornecedorDetalhes(true);
                                  }}
                                  className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-1"
                                >
                                  <FiEye className="w-3.5 h-3.5" />
                                  Ver
                                </button>
                                <button
                                  onClick={() => {
                                    handleFilterChange(
                                      "fornecedorNome",
                                      fornecedor.nome
                                    );
                                    setActiveTab("faturas");
                                  }}
                                  className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-1"
                                >
                                  <FiFilter className="w-3.5 h-3.5" />
                                  Contas
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mensagem vazia */}
                  {fornecedoresList.length === 0 && !loadingFornecedores && (
                    <div className="text-center py-12">
                      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <MdOutlineBusiness className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Nenhum fornecedor encontrado
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Crie sua primeira conta a pagar para ver os fornecedores
                        listados aqui.
                      </p>
                      <button
                        onClick={() => setShowNovaContaModal(true)}
                        className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 mx-auto"
                      >
                        <FiPlus className="w-4 h-4" />
                        Nova Conta
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Ferramentas */}
        {activeTab === "ferramentas" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-2.5 rounded-xl">
                    <FiTool className="w-6 h-6" />
                  </div>
                  Ferramentas de Manutenção
                </h2>
                <p className="text-gray-600 mt-1">
                  Ferramentas para corrigir e otimizar o sistema
                </p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Correção de Status */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-500 text-white p-3 rounded-lg">
                        <FiTool className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg mb-2">
                          Correção de Status
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Corrige automaticamente o status das contas baseado
                          nos valores pagos e pendentes. Útil para resolver
                          inconsistências onde contas pagas aparecem como
                          pendentes.
                        </p>

                        <div className="space-y-4">
                          <div className="bg-white border border-blue-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-2">
                              O que será corrigido:
                            </h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>
                                • Contas com valor pendente ≤ 0 marcadas como
                                &quot;PAGO&quot;
                              </li>
                              <li>
                                • Contas com pagamentos parciais marcadas como
                                &quot;PAGO_PARCIAL&quot;
                              </li>
                              <li>
                                • Contas vencidas com valor pendente &gt; 0
                              </li>
                              <li>
                                • Valores pendentes negativos ajustados para 0
                              </li>
                            </ul>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600">
                                <strong>Importante:</strong> Faça backup antes
                                de executar.
                              </p>
                            </div>
                            <button
                              onClick={() => setShowCorrecaoStatus(true)}
                              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
                              disabled={correcaoLoading}
                            >
                              {correcaoLoading ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                  Processando...
                                </>
                              ) : (
                                <>
                                  <FiTool className="w-4 h-4" />
                                  Executar Correção
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Estatísticas de Sistema */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-gray-500 text-white p-3 rounded-lg">
                        <FiTrendingUp className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg mb-2">
                          Estatísticas do Sistema
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Visualize métricas e estatísticas do sistema para
                          monitorar a saúde dos dados.
                        </p>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <span className="text-gray-600">
                              Total de Contas:
                            </span>
                            <span className="font-bold text-gray-900">
                              {totalContas}
                            </span>
                          </div>
                          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <span className="text-gray-600">
                              Contas com Status Correto:
                            </span>
                            <span className="font-bold text-green-600">
                              {
                                contasList.filter((c) => {
                                  const corrigida = corrigirStatusConta(c);
                                  return corrigida.status === c.status;
                                }).length
                              }{" "}
                              / {contasList.length}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">
                              Última Atualização:
                            </span>
                            <span className="font-medium text-gray-900">
                              {new Date().toLocaleDateString("pt-MZ")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: Nova Conta a Pagar */}
        {showNovaContaModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 border-b border-gray-200 bg-blue-50 flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">
                  📄 Nova Conta a Pagar
                </h3>
                <button
                  onClick={() => setShowNovaContaModal(false)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium">
                    Campos marcados com * são obrigatórios
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateConta();
                  }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nome do Fornecedor - OBRIGATÓRIO */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome do Fornecedor *
                      </label>
                      <input
                        type="text"
                        value={novaContaForm.fornecedor.nome}
                        onChange={(e) =>
                          setNovaContaForm({
                            ...novaContaForm,
                            fornecedor: {
                              ...novaContaForm.fornecedor,
                              nome: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        required
                        placeholder="Ex: Empresa XYZ Lda"
                      />
                    </div>

                    {/* NUIT do Fornecedor - OBRIGATÓRIO */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        NUIT do Fornecedor *
                      </label>
                      <input
                        type="text"
                        value={novaContaForm.fornecedor.nuit}
                        onChange={(e) =>
                          setNovaContaForm({
                            ...novaContaForm,
                            fornecedor: {
                              ...novaContaForm.fornecedor,
                              nuit: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        required
                        placeholder="Ex: 123456789"
                        pattern="[0-9]{9}"
                        title="NUIT deve ter 9 dígitos"
                      />
                    </div>

                    {/* Descrição - OBRIGATÓRIO (em coluna única) */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição da Conta *
                      </label>
                      <textarea
                        value={novaContaForm.descricao}
                        onChange={(e) =>
                          setNovaContaForm({
                            ...novaContaForm,
                            descricao: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        required
                        placeholder="Descreva detalhadamente a conta..."
                      />
                    </div>

                    {/* Valor - OBRIGATÓRIO */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Valor (MT) *
                      </label>
                      <input
                        type="number"
                        value={novaContaForm.valorOriginal || ""}
                        onChange={(e) =>
                          setNovaContaForm({
                            ...novaContaForm,
                            valorOriginal: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        required
                        min="0.01"
                        step="0.01"
                        placeholder="0,00"
                      />
                    </div>

                    {/* Categoria - OBRIGATÓRIO */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categoria *
                      </label>
                      <select
                        value={novaContaForm.categoria}
                        onChange={(e) =>
                          setNovaContaForm({
                            ...novaContaForm,
                            categoria: e.target.value as CategoriaConta,
                          })
                        }
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        required
                      >
                        <option value="">Selecione uma categoria</option>
                        {Object.values(CategoriaConta).map((cat) => (
                          <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() +
                              cat.slice(1).replace("_", " ")}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Data de Vencimento - OBRIGATÓRIO */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data de Vencimento *
                      </label>
                      <input
                        type="date"
                        value={novaContaForm.dataVencimento}
                        onChange={(e) =>
                          setNovaContaForm({
                            ...novaContaForm,
                            dataVencimento: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        required
                      />
                    </div>

                    {/* Data de Emissão - OBRIGATÓRIO */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data de Emissão *
                      </label>
                      <input
                        type="date"
                        value={novaContaForm.dataEmissao}
                        onChange={(e) =>
                          setNovaContaForm({
                            ...novaContaForm,
                            dataEmissao: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        required
                      />
                    </div>

                    {/* Tipo de Conta */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Conta
                      </label>
                      <select
                        value={novaContaForm.tipoConta}
                        onChange={(e) =>
                          setNovaContaForm({
                            ...novaContaForm,
                            tipoConta: e.target.value as TipoConta,
                          })
                        }
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      >
                        {Object.values(TipoConta).map((tipo) => (
                          <option key={tipo} value={tipo}>
                            {tipo.replace("_", " ").toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Prioridade */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prioridade
                      </label>
                      <select
                        value={novaContaForm.prioridade}
                        onChange={(e) =>
                          setNovaContaForm({
                            ...novaContaForm,
                            prioridade: e.target.value as PrioridadeConta,
                          })
                        }
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      >
                        {Object.values(PrioridadeConta).map((pri) => (
                          <option key={pri} value={pri}>
                            {pri.charAt(0).toUpperCase() + pri.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setShowNovaContaModal(false)}
                      className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          Salvando...
                        </>
                      ) : (
                        <>
                          <FiSave className="w-4 h-4" />
                          Salvar Conta
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: Detalhes da Conta */}
        {showDetalhesModal && selectedConta && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900">
                  📋 Detalhes da Conta
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {/* Informações Básicas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número da Conta
                      </label>
                      <p className="text-gray-900 font-medium">
                        {selectedConta.numeroConta}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <div className="mt-1">
                        <StatusBadge
                          status={selectedConta.status!}
                          valorPendente={selectedConta.valorPendente || 0}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fornecedor
                      </label>
                      <p className="text-gray-900 font-medium">
                        {selectedConta.fornecedor.nome}
                      </p>
                      <p className="text-sm text-gray-600">
                        NUIT: {selectedConta.fornecedor.nuit}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categoria
                      </label>
                      <p className="text-gray-900 font-medium">
                        {selectedConta.categoria}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Valor Original
                      </label>
                      <p className="text-gray-900 font-medium">
                        {formatCurrency(selectedConta.valorOriginal)}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Valor Pago
                      </label>
                      <p className="text-gray-900 font-medium text-green-600">
                        {formatCurrency(selectedConta.valorPago || 0)}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Valor Pendente
                      </label>
                      <p
                        className={`text-gray-900 font-medium ${
                          (selectedConta.valorPendente || 0) > 0
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {formatCurrency(selectedConta.valorPendente || 0)}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data de Emissão
                      </label>
                      <p className="text-gray-900 font-medium">
                        {new Date(selectedConta.dataEmissao).toLocaleDateString(
                          "pt-MZ"
                        )}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data de Vencimento
                      </label>
                      <p className="text-gray-900 font-medium">
                        {new Date(
                          selectedConta.dataVencimento
                        ).toLocaleDateString("pt-MZ")}
                      </p>
                    </div>
                  </div>

                  {/* Descrição */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição
                    </label>
                    <p className="text-gray-900">{selectedConta.descricao}</p>
                  </div>

                  {/* Observações */}
                  {selectedConta.observacoes && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Observações
                      </label>
                      <p className="text-gray-900">
                        {selectedConta.observacoes}
                      </p>
                    </div>
                  )}

                  {/* Botões de Ação */}
                  <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setShowDetalhesModal(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                    >
                      Fechar
                    </button>
                    {(selectedConta.valorPendente || 0) > 0 &&
                      selectedConta.status !== StatusConta.PAGO && (
                        <button
                          onClick={() => {
                            setPagamentoForm({
                              ...pagamentoForm,
                              contaId: selectedConta.contaId!,
                              valor:
                                selectedConta.valorPendente ||
                                selectedConta.valorOriginal,
                            });
                            setShowDetalhesModal(false);
                            setShowPagamentoModal(true);
                            setActiveTab("pagamentos");
                          }}
                          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                        >
                          Registrar Pagamento
                        </button>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: Correção de Status */}
        {showCorrecaoStatus && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full">
              <div className="p-4 border-b border-gray-200 bg-orange-50">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <FiTool className="w-5 h-5 text-orange-600" />
                  Correção de Status
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800 font-medium mb-2">
                      ⚠️ Atenção
                    </p>
                    <p className="text-sm text-yellow-700">
                      Esta ação corrigirá o status de todas as contas baseado
                      nos valores pagos e pendentes. Recomenda-se fazer backup
                      dos dados antes de prosseguir.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Usuário responsável:</strong> {userId}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Limite de contas:</strong> 1000
                    </p>
                  </div>

                  {correcaoResultado && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 font-medium mb-2">
                        ✅ Correção Concluída
                      </p>
                      <div className="text-sm text-green-700 space-y-1">
                        <p>
                          • Contas processadas:{" "}
                          {correcaoResultado.totalProcessadas}
                        </p>
                        <p>
                          • Correções aplicadas:{" "}
                          {correcaoResultado.correcoesAplicadas}
                        </p>
                        {correcaoResultado.erros && (
                          <p>• Erros: {correcaoResultado.erros.length}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
                  <button
                    onClick={() => {
                      setShowCorrecaoStatus(false);
                      setCorrecaoResultado(null);
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                    disabled={correcaoLoading}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={executarCorrecaoStatus}
                    disabled={correcaoLoading}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium disabled:opacity-50 flex items-center gap-2"
                  >
                    {correcaoLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Processando...
                      </>
                    ) : (
                      <>
                        <FiTool className="w-4 h-4" />
                        Executar Correção
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: Detalhes do Fornecedor */}
        {showFornecedorDetalhes && selectedFornecedor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-500 to-purple-600">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                    <MdOutlineBusiness className="w-5 h-5" />
                    Detalhes do Fornecedor
                  </h3>
                  <button
                    onClick={() => setShowFornecedorDetalhes(false)}
                    className="text-white hover:text-gray-200 p-1 rounded-full hover:bg-purple-600"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Informações do Fornecedor */}
                  <div className="lg:col-span-2">
                    <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 mb-6">
                      <h4 className="font-bold text-gray-900 text-lg mb-4">
                        Informações
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">
                            Nome do Fornecedor
                          </p>
                          <p className="font-medium text-gray-900">
                            {selectedFornecedor.nome}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">NUIT</p>
                          <p className="font-medium text-gray-900 font-mono">
                            {selectedFornecedor.nuit}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">
                            Tipo de Fornecedor
                          </p>
                          <p className="font-medium text-gray-900 capitalize">
                            {selectedFornecedor.tipoFornecedor?.replace(
                              "_",
                              " "
                            ) || "Não especificado"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Contato</p>
                          <p className="font-medium text-gray-900">
                            {selectedFornecedor.telefone || "Não informado"}
                          </p>
                        </div>
                        {selectedFornecedor.email && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Email</p>
                            <p className="font-medium text-gray-900">
                              {selectedFornecedor.email}
                            </p>
                          </div>
                        )}
                        {selectedFornecedor.endereco && (
                          <div className="md:col-span-2">
                            <p className="text-sm text-gray-600 mb-1">
                              Endereço
                            </p>
                            <p className="font-medium text-gray-900">
                              {selectedFornecedor.endereco}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Estatísticas */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">
                          Total de Contas
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {selectedFornecedor.totalContas}
                        </p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">
                          Valor Total
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatCurrency(selectedFornecedor.valorTotal)}
                        </p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Valor Pago</p>
                        <p className="text-2xl font-bold text-green-600">
                          {formatCurrency(selectedFornecedor.valorPago)}
                        </p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">
                          Valor Pendente
                        </p>
                        <p className="text-2xl font-bold text-red-600">
                          {formatCurrency(selectedFornecedor.valorPendente)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status e Ações */}
                  <div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 text-lg mb-4">
                        Status
                      </h4>

                      <div
                        className={`mb-6 p-4 rounded-lg ${
                          selectedFornecedor.valorPendente > 0
                            ? "bg-red-50 border border-red-200"
                            : "bg-green-50 border border-green-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              selectedFornecedor.valorPendente > 0
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {selectedFornecedor.valorPendente > 0 ? (
                              <FiAlertTriangle className="w-5 h-5" />
                            ) : (
                              <FiCheckCircle className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {selectedFornecedor.valorPendente > 0
                                ? "Possui contas pendentes"
                                : "Todas contas regularizadas"}
                            </p>
                            <p className="text-sm text-gray-600">
                              {selectedFornecedor.valorPendente > 0
                                ? `${formatCurrency(
                                    selectedFornecedor.valorPendente
                                  )} em pendências`
                                : "Fornecedor em dia"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <button
                          onClick={() => {
                            handleFilterChange(
                              "fornecedorNome",
                              selectedFornecedor.nome
                            );
                            setShowFornecedorDetalhes(false);
                            setActiveTab("faturas");
                          }}
                          className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <FiEye className="w-4 h-4" />
                          Ver Todas as Contas
                        </button>

                        <button
                          onClick={() => {
                            // Filtrar apenas contas pendentes
                            handleFilterChange(
                              "fornecedorNome",
                              selectedFornecedor.nome
                            );
                            handleFilterChange("status", StatusConta.PENDENTE);
                            setShowFornecedorDetalhes(false);
                            setActiveTab("faturas");
                          }}
                          className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <FiAlertTriangle className="w-4 h-4" />
                          Ver Contas Pendentes
                        </button>

                        <button
                          onClick={() => {
                            setShowNovaContaModal(true);
                            setNovaContaForm((prev) => ({
                              ...prev,
                              fornecedor: {
                                ...prev.fornecedor,
                                nome: selectedFornecedor.nome,
                                nuit: selectedFornecedor.nuit,
                                email: selectedFornecedor.email || "",
                                telefone: selectedFornecedor.telefone || "",
                                endereco: selectedFornecedor.endereco || "",
                                tipoFornecedor:
                                  selectedFornecedor.tipoFornecedor,
                              },
                            }));
                            setShowFornecedorDetalhes(false);
                          }}
                          className="w-full px-4 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <FiPlus className="w-4 h-4" />
                          Nova Conta para este Fornecedor
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contas do Fornecedor */}
                {selectedFornecedor.contas &&
                  selectedFornecedor.contas.length > 0 && (
                    <div className="mt-8">
                      <h4 className="font-bold text-gray-900 text-lg mb-4">
                        Últimas Contas
                      </h4>
                      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                  Conta
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                  Descrição
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                  Valor
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                  Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                  Vencimento
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                  Pendente
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {selectedFornecedor.contas
                                .slice(0, 5)
                                .map((conta: any) => {
                                  // Calcular valor pendente baseado no status
                                  const valorPendente =
                                    conta.status === StatusConta.PAGO
                                      ? 0
                                      : conta.valorPendente || conta.valor;

                                  return (
                                    <tr
                                      key={conta.contaId}
                                      className="hover:bg-gray-50"
                                    >
                                      <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900">
                                          {conta.numeroConta}
                                        </p>
                                      </td>
                                      <td className="px-6 py-4">
                                        <p className="text-gray-700 truncate max-w-xs">
                                          {conta.descricao}
                                        </p>
                                      </td>
                                      <td className="px-6 py-4">
                                        <p className="font-bold text-gray-900">
                                          {formatCurrency(conta.valor)}
                                        </p>
                                      </td>
                                      <td className="px-6 py-4">
                                        <StatusBadge status={conta.status} />
                                      </td>
                                      <td className="px-6 py-4">
                                        <p className="text-gray-700">
                                          {new Date(
                                            conta.dataVencimento
                                          ).toLocaleDateString("pt-MZ")}
                                        </p>
                                      </td>
                                      <td className="px-6 py-4">
                                        <p
                                          className={`font-medium ${
                                            valorPendente > 0
                                              ? "text-red-600"
                                              : "text-green-600"
                                          }`}
                                        >
                                          {formatCurrency(valorPendente)}
                                        </p>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContasPagar;
