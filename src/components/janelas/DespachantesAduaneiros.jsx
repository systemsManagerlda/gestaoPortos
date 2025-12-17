import React, { useState, useEffect, useCallback, useMemo } from "react";
import CriarDespachanteModal from "../../context/CriarDespachanteModal";
import EditarDespachanteModal from "../../context/EditarDespachanteModal";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Alert,
  Snackbar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import {
  PersonAdd,
  FilterList,
  Refresh,
  Edit,
  Delete,
  Visibility,
  CheckCircle,
  Warning,
  Error as ErrorIcon,
  Business,
  Work,
  Assessment,
  TrendingUp,
  People,
  OnlinePrediction,
  DocumentScanner,
  NotificationsActive,
  BarChart,
  TableChart,
  Download,
  Mail,
  Phone,
  WhatsApp,
  PersonPin,
  Description,
  Speed,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { pt } from "date-fns/locale";

const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

function DespachantesAduaneiros() {
  // Estados principais
  const [despachantes, setDespachantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [selectedDespachante, setSelectedDespachante] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDespachanteForEdit, setSelectedDespachanteForEdit] =
    useState(null);

  // Estados para filtros e paginação
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    tipoUsuario: "",
    departamento: "",
    statusAtual: "",
    disponivel: "",
    online: "",
    dataAdmissaoInicio: null,
    dataAdmissaoFim: null,
  });
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  // Estados para criação/edição
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    dadosPessoais: {
      nomeCompleto: "",
      numeroIdentificacao: "",
      dataNascimento: null,
    },
    contatos: {
      emailPrincipal: "",
      telefonePrincipal: "",
    },
    carreira: {
      dataAdmissao: null,
      cargoAtual: "",
      departamento: "",
    },
    tipoUsuario: "despachante",
  });

  // Buscar dados dos despachantes
  const fetchDespachantes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Preparar corpo da requisição - formato correto para o backend
      const requestBody = {
        curPage: page + 1,
        pageSize: rowsPerPage,
      };

      // Adicionar filtro de nome apenas se não estiver vazio
      if (searchTerm && searchTerm.trim() !== "") {
        requestBody.nome = searchTerm.trim();
      }

      // Adicionar outros filtros se existirem
      if (filters.tipoUsuario && filters.tipoUsuario !== "") {
        requestBody.tipoUsuario = filters.tipoUsuario;
      }
      if (filters.departamento && filters.departamento !== "") {
        requestBody.departamento = filters.departamento;
      }
      if (filters.statusAtual && filters.statusAtual !== "") {
        requestBody.statusAtual = filters.statusAtual;
      }
      if (filters.disponivel && filters.disponivel !== "") {
        requestBody.disponivel = filters.disponivel;
      }
      if (filters.online && filters.online !== "") {
        requestBody.online = filters.online;
      }

      console.log("Enviando requisição para /getDespachanteList:", requestBody);

      const response = await fetch(`${API_BASE_URL}/getDespachanteList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // Verificar se a resposta é OK
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Resposta recebida:", data);

      if (data.returnCode === 200) {
        // Verificar se a estrutura de dados está correta
        if (data.data && Array.isArray(data.data.list)) {
          console.log(`Recebidos ${data.data.list.length} despachantes`);
          setDespachantes(data.data.list);
        } else {
          console.warn("Estrutura de dados inesperada:", data);
          setDespachantes([]);
        }
      } else {
        throw new Error(data.returnMsg || "Código de retorno diferente de 200");
      }
    } catch (err) {
      console.error("Erro na função fetchDespachantes:", err);
      setError(err.message);
      showSnackbar(`Erro ao carregar despachantes: ${err.message}`, "error");
      setDespachantes([]);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, searchTerm, filters]);
  // Buscar estatísticas
  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getDespachanteStats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (data.returnCode === 200) {
        setStats(data.data);
      }
    } catch (err) {
      console.error("Erro ao carregar estatísticas:", err);
    }
  }, []);

  // Efeito para carregar dados iniciais
  useEffect(() => {
    fetchDespachantes();
    fetchStats();

    // Atualizar online status periodicamente
    const interval = setInterval(() => {
      fetchDespachantes();
    }, 30000); // Atualiza a cada 30 segundos

    return () => clearInterval(interval);
  }, [fetchDespachantes, fetchStats]);

  // Funções auxiliares
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      tipoUsuario: "",
      departamento: "",
      statusAtual: "",
      disponivel: "",
      online: "",
      dataAdmissaoInicio: null,
      dataAdmissaoFim: null,
    });
    setSearchTerm("");
  };

  // Funções para operações CRUD
  const handleViewDetails = async (codigoDespachante) => {
    try {
      const response = await fetch(`${API_BASE_URL}/getDespachanteDetail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigoDespachante }),
      });

      const data = await response.json();

      if (data.returnCode === 200) {
        setSelectedDespachante(data.data);
        setDialogOpen(true);
      } else {
        throw new Error(data.returnMsg);
      }
    } catch (err) {
      showSnackbar("Erro ao carregar detalhes", "error");
    }
  };

  const handleDeleteDespachante = async (codigoDespachante) => {
    if (!window.confirm("Tem certeza que deseja excluir este despachante?"))
      return;

    try {
      const response = await fetch(`${API_BASE_URL}/deleteDespachante`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigoDespachante }),
      });

      const data = await response.json();

      if (data.returnCode === 200) {
        showSnackbar("Despachante excluído com sucesso!", "success");
        fetchDespachantes();
        fetchStats();
      } else {
        throw new Error(data.returnMsg);
      }
    } catch (err) {
      showSnackbar(`Erro ao excluir despachante: ${err.message}`, "error");
    }
  };

  const handleUpdateStatus = async (
    codigoDespachante,
    statusAtual,
    disponivel
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/updateDespachanteStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigoDespachante,
          statusAtual,
          disponivel,
        }),
      });

      const data = await response.json();

      if (data.returnCode === 200) {
        showSnackbar("Status atualizado com sucesso!", "success");
        fetchDespachantes();
      } else {
        throw new Error(data.returnMsg);
      }
    } catch (err) {
      showSnackbar(`Erro ao atualizar status: ${err.message}`, "error");
    }
  };

  const handleCreateSuccess = () => {
    fetchDespachantes();
    fetchStats();
    showSnackbar("Despachante criado com sucesso!", "success");
    setCreateModalOpen(false); // Adicione esta linha para fechar o modal
  };

  const handleEditDespachante = (despachante) => {
    setSelectedDespachanteForEdit(despachante);
    setEditModalOpen(true);
  };

  // Funções para renderização condicional
  const getStatusColor = (status) => {
    switch (status) {
      case "ativo":
        return "success";
      case "inativo":
        return "error";
      case "ferias":
        return "warning";
      case "licenca":
        return "info";
      case "afastado":
        return "secondary";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "ativo":
        return <span>✓</span>; // Temporário
      case "inativo":
        return <span>✗</span>; // Temporário
      case "ferias":
        return <span>⚠</span>; // Temporário
      case "licenca":
        return <span>⚠</span>; // Temporário
      case "afastado":
        return <span>⚠</span>; // Temporário
      default:
        return <span>✗</span>; // Temporário
    }
  };

  const handleEditSuccess = () => {
    fetchDespachantes();
    fetchStats();
    showSnackbar("Despachante atualizado com sucesso!", "success");
  };

  const getCargaTrabalhoColor = (carga) => {
    switch (carga) {
      case "baixa":
        return "success";
      case "normal":
        return "info";
      case "moderada":
        return "warning";
      case "alta":
        return "error";
      default:
        return "default";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-PT");
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("pt-PT");
  };

  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return null;
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();
    const mesNascimento = nascimento.getMonth();
    const diaNascimento = nascimento.getDate();

    if (
      mesAtual < mesNascimento ||
      (mesAtual === mesNascimento && diaAtual < diaNascimento)
    ) {
      idade--;
    }

    return idade;
  };

  // Estatísticas calculadas
  const estatisticasCalculadas = useMemo(() => {
    if (!despachantes.length) return null;

    const ativos = despachantes.filter(
      (d) => d.status?.statusAtual === "ativo"
    ).length;
    const online = despachantes.filter((d) => d.status?.online).length;
    const disponiveis = despachantes.filter((d) => d.status?.disponivel).length;
    const mediaAvaliacao =
      despachantes.reduce(
        (sum, d) => sum + (d.desempenho?.avaliacaoMedia || 0),
        0
      ) / despachantes.length;
    const mediaExperiencia =
      despachantes.reduce((sum, d) => sum + (d.tempoEmpresaMeses || 0), 0) /
      despachantes.length;

    return {
      total: despachantes.length,
      ativos,
      online,
      disponiveis,
      mediaAvaliacao: mediaAvaliacao.toFixed(2),
      mediaExperiencia: Math.round(mediaExperiencia),
      taxaDisponibilidade: Math.round((disponiveis / ativos) * 100) || 0,
    };
  }, [despachantes]);

  // Filtro de despachantes
  const filteredDespachantes = useMemo(() => {
    return despachantes.filter((despachante) => {
      // Filtro de busca
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          despachante.dadosPessoais?.nomeCompleto
            ?.toLowerCase()
            .includes(searchLower) ||
          despachante.codigoDespachante?.toLowerCase().includes(searchLower) ||
          despachante.contatos?.emailPrincipal
            ?.toLowerCase()
            .includes(searchLower);

        if (!matchesSearch) return false;
      }

      // Filtros adicionais
      if (
        filters.tipoUsuario &&
        despachante.tipoUsuario !== filters.tipoUsuario
      )
        return false;
      if (
        filters.departamento &&
        despachante.carreira?.departamento !== filters.departamento
      )
        return false;
      if (
        filters.statusAtual &&
        despachante.status?.statusAtual !== filters.statusAtual
      )
        return false;
      if (
        filters.disponivel !== "" &&
        despachante.status?.disponivel !== (filters.disponivel === "true")
      )
        return false;
      if (
        filters.online !== "" &&
        despachante.status?.online !== (filters.online === "true")
      )
        return false;

      // Filtro por data de admissão
      if (filters.dataAdmissaoInicio || filters.dataAdmissaoFim) {
        const dataAdmissao = new Date(despachante.carreira?.dataAdmissao);
        if (
          filters.dataAdmissaoInicio &&
          dataAdmissao < new Date(filters.dataAdmissaoInicio)
        )
          return false;
        if (
          filters.dataAdmissaoFim &&
          dataAdmissao > new Date(filters.dataAdmissaoFim)
        )
          return false;
      }

      return true;
    });
  }, [despachantes, searchTerm, filters]);

  // Componentes do dashboard
const renderEstatisticasCards = () => {
  // Função auxiliar para formatar a avaliação
  const formatarAvaliacao = (valor) => {
    if (valor === null || valor === undefined) return "0.00";
    const num = Number(valor);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  // Função auxiliar para calcular porcentagem
  const calcularPorcentagem = (valor, total) => {
    if (!total || total === 0) return 0;
    const num = Number(valor || 0);
    return Math.round((num / total) * 100);
  };

  // Valores com fallback seguro
  const total = estatisticasCalculadas?.total || 0;
  const ativos = estatisticasCalculadas?.ativos || 0;
  const online = estatisticasCalculadas?.online || 0;
  const mediaAvaliacao = estatisticasCalculadas?.mediaAvaliacao || 0;
  const avaliacoesCount = despachantes.length || 0;
  
  // Calcula crescimento (exemplo: 15% do total)
  const crescimento = Math.round((total / 100) * 15);

  return (
    <Grid container spacing={3}>
      {/* Total de Despachantes */}
      <Grid item xs={12} sm={6} md={3}>
        <Card className="stat-card" sx={{ height: '100%' }}>
          <CardContent>
            <Box display="flex" alignItems="flex-start" justifyContent="space-between">
              <Box>
                <Typography 
                  color="text.secondary" 
                  gutterBottom 
                  variant="subtitle2"
                  fontWeight={500}
                >
                  TOTAL DESPACHANTES
                </Typography>
                <Typography variant="h4" fontWeight={700} color="primary.main">
                  {total.toLocaleString()}
                </Typography>
              </Box>
              <Avatar 
                className="stat-avatar total"
                sx={{ 
                  bgcolor: 'primary.light', 
                  width: 56, 
                  height: 56 
                }}
              >
                <People fontSize="medium" />
              </Avatar>
            </Box>
            <Box mt={3} display="flex" alignItems="center">
              <TrendingUp 
                fontSize="small" 
                sx={{ 
                  color: 'success.main', 
                  mr: 0.5 
                }} 
              />
              <Typography variant="caption" color="text.secondary">
                <Typography 
                  component="span" 
                  variant="caption" 
                  color="success.main"
                  fontWeight={600}
                >
                  {crescimento}%
                </Typography>
                {' '}crescimento mensal
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Despachantes Ativos */}
      <Grid item xs={12} sm={6} md={3}>
        <Card className="stat-card" sx={{ height: '100%' }}>
          <CardContent>
            <Box display="flex" alignItems="flex-start" justifyContent="space-between">
              <Box>
                <Typography 
                  color="text.secondary" 
                  gutterBottom 
                  variant="subtitle2"
                  fontWeight={500}
                >
                  ATIVOS
                </Typography>
                <Typography variant="h4" fontWeight={700} color="success.main">
                  {ativos.toLocaleString()}
                </Typography>
              </Box>
              <Avatar 
                className="stat-avatar active"
                sx={{ 
                  bgcolor: 'success.light', 
                  width: 56, 
                  height: 56 
                }}
              >
                <CheckCircle fontSize="medium" />
              </Avatar>
            </Box>
            <Box mt={3}>
              <Typography variant="caption" color="text.secondary">
                <Typography 
                  component="span" 
                  variant="caption" 
                  fontWeight={600}
                >
                  {calcularPorcentagem(ativos, total)}%
                </Typography>
                {' '}do total
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Online Now */}
      <Grid item xs={12} sm={6} md={3}>
        <Card className="stat-card" sx={{ height: '100%' }}>
          <CardContent>
            <Box display="flex" alignItems="flex-start" justifyContent="space-between">
              <Box>
                <Typography 
                  color="text.secondary" 
                  gutterBottom 
                  variant="subtitle2"
                  fontWeight={500}
                >
                  ONLINE AGORA
                </Typography>
                <Typography variant="h4" fontWeight={700} color="info.main">
                  {online.toLocaleString()}
                </Typography>
              </Box>
              <Avatar 
                className="stat-avatar online"
                sx={{ 
                  bgcolor: 'info.light', 
                  width: 56, 
                  height: 56 
                }}
              >
                <OnlinePrediction fontSize="medium" />
              </Avatar>
            </Box>
            <Box mt={3} display="flex" alignItems="center">
              <Speed 
                fontSize="small" 
                sx={{ 
                  color: 'info.main', 
                  mr: 0.5 
                }} 
              />
              <Typography variant="caption" color="text.secondary">
                Em tempo real
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Média de Avaliação */}
      <Grid item xs={12} sm={6} md={3}>
        <Card className="stat-card" sx={{ height: '100%' }}>
          <CardContent>
            <Box display="flex" alignItems="flex-start" justifyContent="space-between">
              <Box>
                <Typography 
                  color="text.secondary" 
                  gutterBottom 
                  variant="subtitle2"
                  fontWeight={500}
                >
                  AVALIAÇÃO MÉDIA
                </Typography>
                <Typography variant="h4" fontWeight={700} color="warning.main">
                  {formatarAvaliacao(mediaAvaliacao)}
                </Typography>
              </Box>
              <Avatar 
                className="stat-avatar rating"
                sx={{ 
                  bgcolor: 'warning.light', 
                  width: 56, 
                  height: 56 
                }}
              >
                <Assessment fontSize="medium" />
              </Avatar>
            </Box>
            <Box mt={2}>
              <Box display="flex" alignItems="center" mb={0.5}>
                <LinearProgress
                  variant="determinate"
                  value={((Number(mediaAvaliacao) || 0) / 5) * 100}
                  sx={{
                    flexGrow: 1,
                    mr: 1,
                    height: 6,
                    borderRadius: 3,
                    bgcolor: 'action.disabledBackground',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: 'warning.main',
                      borderRadius: 3,
                    }
                  }}
                />
                <Typography variant="caption" color="text.secondary" fontWeight={500}>
                  {(((Number(mediaAvaliacao) || 0) / 5) * 100).toFixed(0)}%
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Baseado em {avaliacoesCount} {avaliacoesCount === 1 ? 'avaliação' : 'avaliações'}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

  const renderTable = () => (
    <Card>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h6">Lista de Despachantes</Typography>
            <Button
              startIcon={<Refresh />}
              onClick={() => {
                console.log("Refresh manual clicado");
                fetchDespachantes();
                fetchStats();
              }}
              variant="outlined"
              size="small"
            >
              Atualizar Lista
            </Button>
          </Box>
          <Box>
            <Button
              startIcon={<PersonAdd />}
              variant="contained"
              onClick={() => {
                console.log("Abrindo modal de criação");
                setCreateModalOpen(true);
              }}
              className="action-button"
            >
              Novo Despachante
            </Button>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Código</TableCell>
                <TableCell>Cargo</TableCell>
                <TableCell>Departamento</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Online</TableCell>
                <TableCell>Avaliação</TableCell>
                <TableCell>Carga</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <CircularProgress />
                    <Typography variant="body2" mt={2}>
                      Carregando despachantes...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : filteredDespachantes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <Typography variant="body2" color="textSecondary">
                      Nenhum despachante encontrado
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredDespachantes
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((despachante) => (
                    <TableRow key={despachante.codigoDespachante} hover>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar className="table-avatar">
                            {despachante.dadosPessoais?.nomeCompleto?.charAt(
                              0
                            ) || "D"}
                          </Avatar>
                          <Box ml={2}>
                            <Typography variant="body2" fontWeight="medium">
                              {despachante.dadosPessoais?.nomeCompleto}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {despachante.contatos?.emailPrincipal}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={despachante.codigoDespachante}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{despachante.carreira?.cargoAtual}</TableCell>
                      <TableCell>
                        <Chip
                          label={
                            despachante.carreira?.departamento || "Não definido"
                          }
                          size="small"
                          icon={<Business fontSize="small" />}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getStatusIcon(despachante.status?.statusAtual)}
                          label={despachante.status?.statusAtual}
                          size="small"
                          color={getStatusColor(
                            despachante.status?.statusAtual
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        {despachante.status?.online ? (
                          <Chip
                            icon={<CheckCircle fontSize="small" />}
                            label="Online"
                            size="small"
                            color="success"
                            variant="outlined"
                          />
                        ) : (
                          <Chip
                            icon={<ErrorIcon fontSize="small" />}
                            label="Offline"
                            size="small"
                            color="default"
                            variant="outlined"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Assessment fontSize="small" color="action" />
                          <Typography variant="body2" ml={1}>
                            {despachante.desempenho?.avaliacaoMedia?.toFixed(
                              1
                            ) || "0.0"}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="textSecondary"
                            ml={1}
                          >
                            /5.0
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={despachante.cargaTrabalhoAtual}
                          size="small"
                          color={getCargaTrabalhoColor(
                            despachante.cargaTrabalhoAtual
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <Tooltip title="Ver detalhes">
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleViewDetails(despachante.codigoDespachante)
                              }
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Editar">
                            <IconButton
                              size="small"
                              onClick={() => handleEditDespachante(despachante)}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Excluir">
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleDeleteDespachante(
                                  despachante.codigoDespachante
                                )
                              }
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredDespachantes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
          }
        />
      </CardContent>
    </Card>
  );

  const renderDetalhesDialog = () => (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      maxWidth="md"
      fullWidth
    >
      {selectedDespachante && (
        <>
          <DialogTitle>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6">Detalhes do Despachante</Typography>
              <Box display="flex" gap={1}>
                <Chip
                  icon={getStatusIcon(selectedDespachante.status?.statusAtual)}
                  label={selectedDespachante.status?.statusAtual}
                  color={getStatusColor(
                    selectedDespachante.status?.statusAtual
                  )}
                />
                {selectedDespachante.status?.online && (
                  <Chip
                    icon={<OnlinePrediction />}
                    label="Online"
                    color="success"
                    variant="outlined"
                  />
                )}
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={3}>
              {/* Informações Pessoais */}
              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  className="section-title"
                >
                  <PersonPin style={{ marginRight: 8 }} />
                  Informações Pessoais
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Nome Completo"
                      secondary={
                        selectedDespachante.dadosPessoais?.nomeCompleto ||
                        "Não informado"
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Idade"
                      secondary={`${
                        calcularIdade(
                          selectedDespachante.dadosPessoais?.dataNascimento
                        ) || "Não informada"
                      } anos`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Documento"
                      secondary={`${
                        selectedDespachante.dadosPessoais?.tipoIdentificacao ||
                        "Não informado"
                      }: ${
                        selectedDespachante.dadosPessoais
                          ?.numeroIdentificacao || "Não informado"
                      }`}
                    />
                  </ListItem>
                </List>
              </Grid>

              {/* Contatos */}
              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  className="section-title"
                >
                  <Mail style={{ marginRight: 8 }} />
                  Contatos
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Mail />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Email Principal"
                      secondary={
                        selectedDespachante.contatos?.emailPrincipal ||
                        "Não informado"
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Phone />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Telefone"
                      secondary={
                        selectedDespachante.contatos?.telefonePrincipal ||
                        "Não informado"
                      }
                    />
                  </ListItem>
                  {selectedDespachante.contatos?.whatsapp?.numero && (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar className="whatsapp-avatar">
                          <WhatsApp />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="WhatsApp"
                        secondary={selectedDespachante.contatos.whatsapp.numero}
                      />
                    </ListItem>
                  )}
                </List>
              </Grid>

              {/* Carreira */}
              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  className="section-title"
                >
                  <Work style={{ marginRight: 8 }} />
                  Carreira
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Cargo Atual"
                      secondary={
                        selectedDespachante.carreira?.cargoAtual ||
                        "Não informado"
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Departamento"
                      secondary={
                        selectedDespachante.carreira?.departamento ||
                        "Não informado"
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Data de Admissão"
                      secondary={formatDate(
                        selectedDespachante.carreira?.dataAdmissao
                      )}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Tempo de Empresa"
                      secondary={`${
                        selectedDespachante.tempoEmpresaMeses || 0
                      } meses`}
                    />
                  </ListItem>
                </List>
              </Grid>

              {/* Desempenho */}
              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  className="section-title"
                >
                  <Assessment style={{ marginRight: 8 }} />
                  Desempenho
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Avaliação Média"
                      secondary={
                        <Box display="flex" alignItems="center">
                          <Typography variant="body1" fontWeight="medium">
                            {selectedDespachante.desempenho?.avaliacaoMedia?.toFixed(
                              1
                            ) || "0.0"}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            ml={1}
                          >
                            /5.0
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Taxa de Sucesso"
                      secondary={`${
                        selectedDespachante.desempenho?.taxaSucesso || 0
                      }%`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Processos Ativos"
                      secondary={
                        selectedDespachante.desempenho?.processosAtribuidos
                          ?.ativos || 0
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Carga de Trabalho"
                      secondary={
                        <Chip
                          label={selectedDespachante.cargaTrabalhoAtual}
                          size="small"
                          color={getCargaTrabalhoColor(
                            selectedDespachante.cargaTrabalhoAtual
                          )}
                        />
                      }
                    />
                  </ListItem>
                </List>
              </Grid>

              {/* Documentação */}
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  className="section-title"
                >
                  <Description style={{ marginRight: 8 }} />
                  Documentação
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" gutterBottom>
                          Registro Profissional
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Número:{" "}
                          {selectedDespachante.documentacao
                            ?.registroProfissional?.numero || "Não informado"}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Validade:{" "}
                          {formatDate(
                            selectedDespachante.documentacao
                              ?.registroProfissional?.dataValidade
                          )}
                        </Typography>
                        <Box mt={1}>
                          <Chip
                            label={
                              selectedDespachante.diasAteExpiracaoRegistro > 30
                                ? "Válido"
                                : selectedDespachante.diasAteExpiracaoRegistro >
                                  0
                                ? "Expira em breve"
                                : "Expirado"
                            }
                            size="small"
                            color={
                              selectedDespachante.diasAteExpiracaoRegistro > 30
                                ? "success"
                                : selectedDespachante.diasAteExpiracaoRegistro >
                                  0
                                ? "warning"
                                : "error"
                            }
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" gutterBottom>
                          Autorização Alfândega
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Número:{" "}
                          {selectedDespachante.documentacao
                            ?.autorizacaoAlfandega?.numero || "Não informado"}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Validade:{" "}
                          {formatDate(
                            selectedDespachante.documentacao
                              ?.autorizacaoAlfandega?.dataValidade
                          )}
                        </Typography>
                        <Box mt={1}>
                          <Chip
                            label="Documentação"
                            size="small"
                            color={
                              selectedDespachante.documentacao
                                ?.documentacaoCompleta
                                ? "success"
                                : "error"
                            }
                            icon={
                              selectedDespachante.documentacao
                                ?.documentacaoCompleta ? (
                                <CheckCircle />
                              ) : (
                                <ErrorIcon />
                              )
                            }
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Fechar</Button>
            <Button
              variant="contained"
              onClick={() => {
                // Implementar função de edição
                setDialogOpen(false);
              }}
            >
              Editar
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );

  const renderFilterDialog = () => (
    <Dialog open={filterDialogOpen} onClose={() => setFilterDialogOpen(false)}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <FilterList style={{ marginRight: 8 }} />
          Filtros Avançados
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <FormControl size="small" fullWidth>
            <InputLabel>Tipo de Usuário</InputLabel>
            <Select
              value={filters.tipoUsuario}
              label="Tipo de Usuário"
              onChange={(e) =>
                handleFilterChange("tipoUsuario", e.target.value)
              }
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="despachante">Despachante</MenuItem>
              <MenuItem value="analista">Analista</MenuItem>
              <MenuItem value="supervisor">Supervisor</MenuItem>
              <MenuItem value="gerente">Gerente</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" fullWidth>
            <InputLabel>Status Atual</InputLabel>
            <Select
              value={filters.statusAtual}
              label="Status Atual"
              onChange={(e) =>
                handleFilterChange("statusAtual", e.target.value)
              }
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="ativo">Ativo</MenuItem>
              <MenuItem value="inativo">Inativo</MenuItem>
              <MenuItem value="ferias">Férias</MenuItem>
              <MenuItem value="licenca">Licença</MenuItem>
              <MenuItem value="afastado">Afastado</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" fullWidth>
            <InputLabel>Disponível</InputLabel>
            <Select
              value={filters.disponivel}
              label="Disponível"
              onChange={(e) => handleFilterChange("disponivel", e.target.value)}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="true">Sim</MenuItem>
              <MenuItem value="false">Não</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" fullWidth>
            <InputLabel>Online</InputLabel>
            <Select
              value={filters.online}
              label="Online"
              onChange={(e) => handleFilterChange("online", e.target.value)}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="true">Sim</MenuItem>
              <MenuItem value="false">Não</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pt}>
            <DatePicker
              label="Data Admissão Início"
              value={filters.dataAdmissaoInicio}
              onChange={(date) =>
                handleFilterChange("dataAdmissaoInicio", date)
              }
              slotProps={{ textField: { size: "small", fullWidth: true } }}
            />
            <DatePicker
              label="Data Admissão Fim"
              value={filters.dataAdmissaoFim}
              onChange={(date) => handleFilterChange("dataAdmissaoFim", date)}
              slotProps={{ textField: { size: "small", fullWidth: true } }}
            />
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={clearFilters}>Limpar Filtros</Button>
        <Button onClick={() => setFilterDialogOpen(false)}>Cancelar</Button>
        <Button
          variant="contained"
          onClick={() => {
            setFilterDialogOpen(false);
            setPage(0);
          }}
        >
          Aplicar Filtros
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderCreateDialog = () => (
    <Dialog
      open={createDialogOpen}
      onClose={() => setCreateDialogOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <PersonAdd style={{ marginRight: 8, verticalAlign: "middle" }} />
        Novo Despachante
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <TextField
            label="Nome Completo"
            value={formData.dadosPessoais.nomeCompleto}
            onChange={(e) =>
              setFormData({
                ...formData,
                dadosPessoais: {
                  ...formData.dadosPessoais,
                  nomeCompleto: e.target.value,
                },
              })
            }
            fullWidth
            size="small"
            required
          />

          <TextField
            label="Número de Identificação"
            value={formData.dadosPessoais.numeroIdentificacao}
            onChange={(e) =>
              setFormData({
                ...formData,
                dadosPessoais: {
                  ...formData.dadosPessoais,
                  numeroIdentificacao: e.target.value,
                },
              })
            }
            fullWidth
            size="small"
            required
          />

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pt}>
            <DatePicker
              label="Data de Nascimento"
              value={formData.dadosPessoais.dataNascimento}
              onChange={(date) =>
                setFormData({
                  ...formData,
                  dadosPessoais: {
                    ...formData.dadosPessoais,
                    dataNascimento: date,
                  },
                })
              }
              slotProps={{ textField: { size: "small", fullWidth: true } }}
            />
          </LocalizationProvider>

          <TextField
            label="Email Principal"
            type="email"
            value={formData.contatos.emailPrincipal}
            onChange={(e) =>
              setFormData({
                ...formData,
                contatos: {
                  ...formData.contatos,
                  emailPrincipal: e.target.value,
                },
              })
            }
            fullWidth
            size="small"
            required
          />

          <TextField
            label="Telefone Principal"
            value={formData.contatos.telefonePrincipal}
            onChange={(e) =>
              setFormData({
                ...formData,
                contatos: {
                  ...formData.contatos,
                  telefonePrincipal: e.target.value,
                },
              })
            }
            fullWidth
            size="small"
            required
          />

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pt}>
            <DatePicker
              label="Data de Admissão"
              value={formData.carreira.dataAdmissao}
              onChange={(date) =>
                setFormData({
                  ...formData,
                  carreira: { ...formData.carreira, dataAdmissao: date },
                })
              }
              slotProps={{ textField: { size: "small", fullWidth: true } }}
              required
            />
          </LocalizationProvider>

          <TextField
            label="Cargo Atual"
            value={formData.carreira.cargoAtual}
            onChange={(e) =>
              setFormData({
                ...formData,
                carreira: { ...formData.carreira, cargoAtual: e.target.value },
              })
            }
            fullWidth
            size="small"
            required
          />

          <TextField
            label="Departamento"
            value={formData.carreira.departamento}
            onChange={(e) =>
              setFormData({
                ...formData,
                carreira: {
                  ...formData.carreira,
                  departamento: e.target.value,
                },
              })
            }
            fullWidth
            size="small"
          />

          <FormControl size="small" fullWidth>
            <InputLabel>Tipo de Usuário</InputLabel>
            <Select
              value={formData.tipoUsuario}
              label="Tipo de Usuário"
              onChange={(e) =>
                setFormData({ ...formData, tipoUsuario: e.target.value })
              }
            >
              <MenuItem value="despachante">Despachante</MenuItem>
              <MenuItem value="analista">Analista</MenuItem>
              <MenuItem value="supervisor">Supervisor</MenuItem>
              <MenuItem value="gerente">Gerente</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setCreateDialogOpen(false)}>Cancelar</Button>
        <Button
          variant="contained"
          onClick={handleCreateDespachante}
          disabled={
            !formData.dadosPessoais.nomeCompleto ||
            !formData.dadosPessoais.numeroIdentificacao ||
            !formData.contatos.emailPrincipal ||
            !formData.contatos.telefonePrincipal ||
            !formData.carreira.dataAdmissao ||
            !formData.carreira.cargoAtual
          }
        >
          Criar Despachante
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pt}>
      <Container maxWidth="xl" className="dashboard-container">
        {/* Cabeçalho */}
        <Box mb={4}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography variant="h4" className="page-title">
              <DashboardIcon
                style={{ marginRight: 16, verticalAlign: "middle" }}
              />
              Dashboard de Despachantes Aduaneiros
            </Typography>
            <Box>
              <Button
                startIcon={<Download />}
                variant="outlined"
                onClick={() => {
                  // Implementar exportação de dados
                  showSnackbar("Exportação iniciada", "info");
                }}
              >
                Exportar
              </Button>
            </Box>
          </Box>

          <Typography variant="body1" color="textSecondary">
            Gerencie todos os despachantes aduaneiros, monitore desempenho e
            visualize estatísticas em tempo real.
          </Typography>
        </Box>

        {/* Cards de Estatísticas */}
        {renderEstatisticasCards()}

        {/* Tabs */}
        <Box mt={4}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            className="dashboard-tabs"
          >
            <Tab icon={<TableChart />} label="Lista de Despachantes" />
            <Tab icon={<BarChart />} label="Estatísticas" />
            <Tab icon={<NotificationsActive />} label="Alertas" />
            <Tab icon={<DocumentScanner />} label="Documentação" />
          </Tabs>
        </Box>

        {/* Conteúdo da Tab */}
        <Box mt={3}>
          {tabValue === 0 && renderTable()}
          {tabValue === 1 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Estatísticas Detalhadas
                </Typography>
                {stats ? (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>
                        Por Tipo de Usuário
                      </Typography>
                      <List dense>
                        {stats.porTipo?.map((stat) => (
                          <ListItem key={stat._id}>
                            <ListItemText
                              primary={stat._id || "Não definido"}
                              secondary={`${stat.count} despachantes`}
                            />
                            <Typography variant="body2" color="textSecondary">
                              Avaliação:{" "}
                              {stat.mediaAvaliacao?.toFixed(1) || "0.0"}
                            </Typography>
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>
                        Por Departamento
                      </Typography>
                      <List dense>
                        {stats.porDepartamento?.map((stat) => (
                          <ListItem key={stat._id}>
                            <ListItemText
                              primary={stat._id || "Não definido"}
                              secondary={`${stat.count} despachantes`}
                            />
                            <Typography variant="body2" color="textSecondary">
                              {stat.disponiveis} disponíveis
                            </Typography>
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                ) : (
                  <Box textAlign="center" py={4}>
                    <CircularProgress />
                    <Typography variant="body2" mt={2}>
                      Carregando estatísticas...
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          )}
          {tabValue === 2 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Alertas e Notificações
                </Typography>
                <Alert severity="warning" icon={<Warning />}>
                  <Typography variant="subtitle2">
                    Documentação Expirando
                  </Typography>
                  <Typography variant="body2">
                    3 despachantes têm documentação que expira nos próximos 30
                    dias.
                  </Typography>
                </Alert>
                <Box mt={2}>
                  <Alert severity="info" icon={<NotificationsActive />}>
                    <Typography variant="subtitle2">
                      Treinamentos Pendentes
                    </Typography>
                    <Typography variant="body2">
                      5 despachantes têm treinamentos obrigatórios pendentes.
                    </Typography>
                  </Alert>
                </Box>
              </CardContent>
            </Card>
          )}
          {tabValue === 3 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Status da Documentação
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  Monitoramento da validade dos documentos profissionais
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Paper className="doc-status-paper" elevation={0}>
                      <Box p={2} textAlign="center">
                        <CheckCircle className="doc-icon valid" />
                        <Typography variant="h6" mt={1}>
                          {
                            despachantes.filter(
                              (d) => d.documentacao?.documentacaoCompleta
                            ).length
                          }
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Documentação Completa
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper className="doc-status-paper" elevation={0}>
                      <Box p={2} textAlign="center">
                        <Warning className="doc-icon warning" />
                        <Typography variant="h6" mt={1}>
                          {
                            despachantes.filter(
                              (d) =>
                                d.diasAteExpiracaoRegistro > 0 &&
                                d.diasAteExpiracaoRegistro <= 30
                            ).length
                          }
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Expirando em 30 dias
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper className="doc-status-paper" elevation={0}>
                      <Box p={2} textAlign="center">
                        <ErrorIcon className="doc-icon expired" />
                        <Typography variant="h6" mt={1}>
                          {
                            despachantes.filter(
                              (d) => d.diasAteExpiracaoRegistro === 0
                            ).length
                          }
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Documentação Expirada
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </Box>

        {/* Diálogos e Modal */}
        {renderDetalhesDialog()}
        {renderFilterDialog()}

        {/* Modal de Criação */}
        <CriarDespachanteModal
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSuccess={handleCreateSuccess}
        />
        <EditarDespachanteModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          despachanteData={selectedDespachanteForEdit}
          onSuccess={handleEditSuccess}
        />

        {/* Snackbar para notificações */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </LocalizationProvider>
  );
}

export default DespachantesAduaneiros;
